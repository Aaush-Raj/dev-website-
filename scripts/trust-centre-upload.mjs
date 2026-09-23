#!/usr/bin/env node
import { createHmac } from "node:crypto";
import { readFile, readdir } from "node:fs/promises";
import { extname, join, resolve } from "node:path";

/**
 * TRUST CENTRE — DOCUMENT UPLOAD
 * ---------------------------------------------------------------------------
 * Uploads local policy documents into the PRIVATE Azure Blob container the
 * portal serves from.
 *
 *     npm run trust-centre:upload -- ./path/to/documents
 *     npm run trust-centre:upload -- ./documents --dry-run
 *
 * WHAT IT CHECKS BEFORE UPLOADING ANYTHING
 * Every local file is matched against `blobName` in the catalogue
 * (src/lib/trust-centre/catalogue.ts). A file the catalogue does not list is
 * REPORTED AND SKIPPED, never uploaded under a guessed name — an unlisted blob
 * would sit in the container unreachable and unaudited, which is how documents
 * quietly rot. Likewise it reports catalogue entries with no local file, so
 * you can see what is still missing.
 *
 * SHARED KEY AUTH, SIGNED PER REQUEST
 * Uses the same account key as the SAS signing in src/lib/trust-centre/blob.ts
 * but a different scheme (SharedKey, over the request itself). No SDK, for the
 * same reason given there.
 *
 * THE CONTAINER MUST BE PRIVATE.
 * This script never sets public access, and the portal depends on it being
 * off. Create it with:
 *   az storage container create -n <container> --account-name <account> \
 *     --public-access off
 */

const API_VERSION = "2022-11-02";

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const sourceDir = resolve(args.find((a) => !a.startsWith("--")) ?? "documents");

const account = process.env.AZURE_STORAGE_ACCOUNT?.trim();
const container = process.env.TRUST_CENTRE_CONTAINER?.trim();
const keyB64 = process.env.AZURE_STORAGE_KEY?.trim();

if (!account || !container || !keyB64) {
  const missing = [
    ["AZURE_STORAGE_ACCOUNT", account],
    ["TRUST_CENTRE_CONTAINER", container],
    ["AZURE_STORAGE_KEY", keyB64],
  ]
    .filter(([, value]) => !value)
    .map(([name]) => name);

  console.error(
    `Missing configuration: ${missing.join(", ")}\n\n` +
      "Run via the npm script, which loads .env.local:\n" +
      "  npm run trust-centre:upload -- <directory>\n\n" +
      "Running the file directly with `node scripts/...` does NOT load\n" +
      ".env.local, so the values look missing even when they are set.",
  );
  process.exit(1);
}

const key = Buffer.from(keyB64, "base64");
const endpoint =
  process.env.AZURE_STORAGE_ENDPOINT?.trim().replace(/\/$/, "") ||
  `https://${account}.blob.core.windows.net`;

/** Content types we expect. Azure serves whatever we declare, and a wrong
 *  value makes a browser try to render a .docx as text. */
const CONTENT_TYPES = {
  ".docx":
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".doc": "application/msword",
  ".pdf": "application/pdf",
  ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
};

/**
 * Reads the expected blob names straight out of the catalogue module.
 *
 * Parsed with a regex rather than imported: the catalogue is TypeScript and
 * this is a plain .mjs script, so importing it would mean adding a TS loader
 * to a script whose only job is to copy files.
 */
async function catalogueBlobNames() {
  const source = await readFile(
    new URL("../src/lib/trust-centre/catalogue.ts", import.meta.url),
    "utf8",
  );

  const entries = new Map();

  /*
   * Split on entry boundaries FIRST, then read each entry's own fields.
   *
   * A single regex spanning `id` ... `blobName` cannot work here: entries
   * without a blobName (a "prepared" document) let a lazy match run on into
   * the NEXT entry, pairing one document's id with another's filename. That
   * mislabelled TC-038's upload as TC-033 — harmless to the upload itself,
   * since the filename is what is used, but actively misleading in the log.
   */
  for (const chunk of source.split(/\n  \{\n/).slice(1)) {
    const entry = chunk.slice(0, chunk.indexOf("\n  },"));

    const id = entry.match(/id:\s*"(TC-\d+)"/)?.[1];
    const blobName = entry.match(/blobName:\s*"([^"]+)"/)?.[1];
    const title = entry.match(/title:\s*"((?:[^"\\]|\\.)*)"/)?.[1];

    if (id && blobName) entries.set(blobName, { id, title });
  }

  return entries;
}

/** Signs and sends one PUT. */
async function uploadBlob(blobName, body, contentType) {
  const date = new Date().toUTCString();
  const encodedBlob = blobName.split("/").map(encodeURIComponent).join("/");

  const headers = {
    "x-ms-blob-type": "BlockBlob",
    "x-ms-date": date,
    "x-ms-version": API_VERSION,
    "Content-Length": String(body.length),
    "Content-Type": contentType,
  };

  /*
   * CanonicalizedHeaders: every x-ms-* header, lowercased, sorted by name,
   * one per line. Order is part of the signature — a different order is a
   * different string and Azure answers 403.
   */
  const canonicalHeaders = Object.entries(headers)
    .filter(([name]) => name.toLowerCase().startsWith("x-ms-"))
    .map(([name, value]) => [name.toLowerCase(), value])
    .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
    .map(([name, value]) => `${name}:${value}`)
    .join("\n");

  const canonicalResource = `/${account}/${container}/${blobName}`;

  // Field order per the Shared Key spec; the empty lines are headers we do
  // not send and must still be accounted for.
  const stringToSign = [
    "PUT",
    "", // Content-Encoding
    "", // Content-Language
    String(body.length), // Content-Length
    "", // Content-MD5
    contentType, // Content-Type
    "", // Date (we use x-ms-date instead)
    "", // If-Modified-Since
    "", // If-Match
    "", // If-None-Match
    "", // If-Unmodified-Since
    "", // Range
    canonicalHeaders,
    canonicalResource,
  ].join("\n");

  const signature = createHmac("sha256", key)
    .update(stringToSign, "utf8")
    .digest("base64");

  const response = await fetch(`${endpoint}/${container}/${encodedBlob}`, {
    method: "PUT",
    headers: {
      ...headers,
      Authorization: `SharedKey ${account}:${signature}`,
    },
    body,
  });

  if (!response.ok) {
    throw new Error(
      `${response.status} ${response.statusText} — ${await response.text()}`,
    );
  }
}

/* ------------------------------- Run --------------------------------- */

const expected = await catalogueBlobNames();

let files;
try {
  files = await readdir(sourceDir);
} catch {
  console.error(`Cannot read directory: ${sourceDir}`);
  process.exit(1);
}

const uploaded = [];
const skipped = [];
const failed = [];

for (const file of files.sort()) {
  if (file.startsWith(".")) continue;

  const entry = expected.get(file);

  if (!entry) {
    skipped.push(file);
    continue;
  }

  const extension = extname(file).toLowerCase();
  const contentType = CONTENT_TYPES[extension] ?? "application/octet-stream";

  if (dryRun) {
    uploaded.push(`${entry.id}  ${file}`);
    continue;
  }

  try {
    const body = await readFile(join(sourceDir, file));
    await uploadBlob(file, body, contentType);
    uploaded.push(`${entry.id}  ${file}`);
    console.log(`  uploaded  ${entry.id}  ${file}`);
  } catch (error) {
    failed.push(`${file}: ${error.message}`);
    console.error(
      `  FAILED    ${entry.id}  ${file}\n            ${error.message}`,
    );
  }
}

const present = new Set(files);
const missing = [...expected.entries()].filter(([name]) => !present.has(name));

console.log(`
${dryRun ? "DRY RUN — nothing was uploaded" : "Upload complete"}
  uploaded: ${uploaded.length}
  skipped (not in catalogue): ${skipped.length}
  failed: ${failed.length}
  catalogue entries with no local file: ${missing.length}`);

if (skipped.length) {
  console.log(`
These files are not in the catalogue and were NOT uploaded. Add an entry to
src/lib/trust-centre/catalogue.ts (with this exact filename as blobName) for
each one that belongs in the portal:`);
  for (const file of skipped) console.log(`  ${file}`);
}

if (missing.length) {
  console.log(`
These catalogue entries have no matching local file, so they will show as
"In preparation" in the portal:`);
  for (const [name, entry] of missing) console.log(`  ${entry.id}  ${name}`);
}

if (failed.length) process.exit(1);
