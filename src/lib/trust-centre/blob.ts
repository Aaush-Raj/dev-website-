import { createHmac } from "node:crypto";

/**
 * TRUST CENTRE — AZURE BLOB SAS
 * ---------------------------------------------------------------------------
 * Mints short-lived, read-only Service SAS URLs for documents held in a
 * PRIVATE Azure Blob container.
 *
 * THE SECURITY MODEL THIS IMPLEMENTS
 * The container has no public access. Nothing is downloadable by URL alone.
 * When a signed-in reviewer asks for a document, the server checks the session
 * and only then signs a URL that:
 *   - permits read only (`sp=r`) — no write, delete or list;
 *   - names ONE blob — it cannot be walked to another document;
 *   - expires in minutes, so a link pasted into a chat is dead on arrival;
 *   - carries a Content-Disposition so the browser downloads with the real
 *     filename rather than the storage key.
 *
 * The bytes never pass through our server, so a large document costs us no
 * bandwidth and no memory — Azure serves it directly.
 *
 * WHY HAND-ROLLED RATHER THAN @azure/storage-blob
 * Signing a Service SAS is one HMAC over a documented field order. The SDK
 * would add a large dependency tree to a repo whose entire runtime dependency
 * list is Next, React and the Mongo driver, to save the ~40 lines below. The
 * field order IS the contract and is fragile, so it is spelled out explicitly
 * against the published spec:
 * https://learn.microsoft.com/rest/api/storageservices/create-service-sas
 *
 * THE ACCOUNT KEY NEVER LEAVES THE SERVER
 * It signs the URL; it is never part of one. This module must therefore never
 * be imported by a Client Component — `server-only` enforces that at build
 * time rather than trusting review to catch it.
 */

import "server-only";

/** SAS spec version whose field order the string-to-sign below matches.
 *  Changing this without changing the field list produces 403s that look like
 *  a wrong key, so the two are pinned together deliberately. */
const SAS_VERSION = "2022-11-02";

/**
 * How long a download link lives.
 *
 * Long enough to click and for a browser to start a large download, short
 * enough that a forwarded or logged URL is worthless by the time anyone else
 * tries it.
 */
const SAS_TTL_SECONDS = 5 * 60;

/**
 * Clock skew allowance. Azure rejects a SAS whose start time is in ITS future,
 * and server clocks drift by seconds. Backdating the start avoids sporadic,
 * confusing 403s on otherwise valid links.
 */
const SAS_CLOCK_SKEW_SECONDS = 5 * 60;

interface BlobConfig {
  account: string;
  container: string;
  key: Buffer;
  /** Overridable for Azurite/private endpoints; defaults to public Azure. */
  endpoint: string;
}

function config(): BlobConfig {
  const account = process.env.AZURE_STORAGE_ACCOUNT?.trim();
  const container = process.env.TRUST_CENTRE_CONTAINER?.trim();
  const key = process.env.AZURE_STORAGE_KEY?.trim();

  if (!account || !container || !key) {
    throw new Error(
      "Azure storage is not configured. Set AZURE_STORAGE_ACCOUNT, " +
        "TRUST_CENTRE_CONTAINER and AZURE_STORAGE_KEY.",
    );
  }

  return {
    account,
    container,
    key: Buffer.from(key, "base64"),
    endpoint:
      process.env.AZURE_STORAGE_ENDPOINT?.trim().replace(/\/$/, "") ||
      `https://${account}.blob.core.windows.net`,
  };
}

/** Azure wants `YYYY-MM-DDThh:mm:ssZ` — ISO 8601 without milliseconds. */
function sasTime(date: Date): string {
  return `${date.toISOString().slice(0, 19)}Z`;
}

/**
 * Builds the Content-Disposition header value for a download.
 *
 * ASCII ONLY, AND DELIBERATELY SO.
 * The RFC 5987 `filename*=UTF-8''...` form exists for non-ASCII names, but it
 * carries a percent-encoded value — and this header is then passed through
 * URLSearchParams to build the SAS query string, which percent-encodes it
 * AGAIN. Azure receives `%2520` and the browser saves the file literally as
 * "TC-001%20Business Continuity Plan.docx". (Observed, not theorised.)
 *
 * Catalogue titles are ASCII, so the plain `filename="..."` form loses
 * nothing. Anything outside printable ASCII is transliterated to "_" rather
 * than encoded, which keeps exactly one encoding pass in the pipeline.
 *
 * Quotes and backslashes are stripped because they would terminate or escape
 * the quoted string and let a crafted title inject further header parameters.
 */
function contentDisposition(filename: string): string {
  const ascii = filename
    .replace(/[^\x20-\x7E]/g, "_")
    .replace(/["\\]/g, "")
    .trim();

  return `attachment; filename="${ascii}"`;
}

export interface SignedDownload {
  url: string;
  expiresAt: Date;
}

/**
 * Signs a read-only URL for one blob.
 *
 * `downloadName` is what the reviewer's browser will save the file as.
 */
export function signBlobDownloadUrl(
  blobName: string,
  downloadName: string,
): SignedDownload {
  const { account, container, key, endpoint } = config();

  const now = Date.now();
  const start = new Date(now - SAS_CLOCK_SKEW_SECONDS * 1000);
  const expiry = new Date(now + SAS_TTL_SECONDS * 1000);

  const permissions = "r"; // read, and nothing else
  const resource = "b"; // this signature covers a blob, not a container
  const canonical = `/blob/${account}/${container}/${blobName}`;
  const disposition = contentDisposition(downloadName);

  /*
   * THE STRING-TO-SIGN.
   *
   * Field ORDER and the number of newlines are part of the contract — an
   * omitted empty field shifts everything after it and yields a signature
   * Azure rejects. Every field is listed, including the empty ones, and
   * labelled, so this survives being read by someone who has never signed a
   * SAS before.
   */
  const stringToSign = [
    permissions, // sp
    sasTime(start), // st
    sasTime(expiry), // se
    canonical, // canonicalized resource
    "", // signed identifier (none: this is an ad-hoc SAS)
    "", // signed IP range (none)
    "https", // signed protocol
    SAS_VERSION, // sv
    resource, // sr
    "", // signed snapshot time
    "", // signed encryption scope
    "", // rscc  — Cache-Control
    disposition, // rscd  — Content-Disposition
    "", // rsce  — Content-Encoding
    "", // rscl  — Content-Language
    "", // rsct  — Content-Type
  ].join("\n");

  const signature = createHmac("sha256", key)
    .update(stringToSign, "utf8")
    .digest("base64");

  // Order here is cosmetic (Azure parses by name), but mirrors the signature
  // for readability when debugging a 403.
  const query = new URLSearchParams({
    sp: permissions,
    st: sasTime(start),
    se: sasTime(expiry),
    spr: "https",
    sv: SAS_VERSION,
    sr: resource,
    rscd: disposition,
    sig: signature,
  });

  // The blob name may contain slashes (virtual folders); each segment is
  // encoded separately so the path structure survives.
  const encodedBlob = blobName.split("/").map(encodeURIComponent).join("/");

  return {
    url: `${endpoint}/${container}/${encodedBlob}?${query.toString()}`,
    expiresAt: expiry,
  };
}

/** Whether storage is configured, without throwing. Lets a page degrade to
 *  "temporarily unavailable" instead of a 500. */
export function isBlobConfigured(): boolean {
  return Boolean(
    process.env.AZURE_STORAGE_ACCOUNT?.trim() &&
    process.env.TRUST_CENTRE_CONTAINER?.trim() &&
    process.env.AZURE_STORAGE_KEY?.trim(),
  );
}
