#!/usr/bin/env node
import { randomBytes, scrypt as scryptCb } from "node:crypto";
import { stdin, stdout } from "node:process";
import { MongoClient } from "mongodb";

/**
 * TRUST CENTRE — CHANGE THE PORTAL PASSWORD
 * ---------------------------------------------------------------------------
 *     npm run trust-centre:password
 *
 * Updates the reviewer account's password in MongoDB. The account itself is
 * created automatically on first server boot (see src/instrumentation.ts), so
 * this is only for CHANGING the password afterwards — which is also why
 * changing TRUST_CENTRE_PASSWORD in the environment does nothing once the
 * account exists.
 *
 * Reads the same MONGODB_URI / MONGODB_DB the app uses, so run it with the
 * same environment (locally: `node --env-file=.env.local scripts/...`).
 *
 * THESE PARAMETERS MUST MATCH src/lib/trust-centre/password.ts.
 * A hash derived with different N/r/p will never verify, and the failure looks
 * exactly like a wrong password.
 */

const SCRYPT_OPTIONS = { N: 32_768, r: 8, p: 1, maxmem: 128 * 1024 * 1024 };
const SCRYPT_KEYLEN = 64;
const COLLECTION = "trust_centre_accounts";

function scrypt(password, salt) {
  return new Promise((resolve, reject) => {
    scryptCb(
      password.normalize("NFKC"),
      salt,
      SCRYPT_KEYLEN,
      SCRYPT_OPTIONS,
      (error, key) => (error ? reject(error) : resolve(key)),
    );
  });
}

/*
 * Read stdin line by line rather than through `readline`: a readline interface
 * buffers greedily, so on a PIPE it swallows every line on the first question
 * and the second never resolves. This behaves the same on a terminal and a
 * pipe, which keeps the script testable.
 */
async function* lines(stream) {
  let buffer = "";
  for await (const chunk of stream) {
    buffer += chunk;
    let index;
    while ((index = buffer.indexOf("\n")) !== -1) {
      yield buffer.slice(0, index).replace(/\r$/, "");
      buffer = buffer.slice(index + 1);
    }
  }
  if (buffer) yield buffer.replace(/\r$/, "");
}

stdin.setEncoding("utf8");
const input = lines(stdin);

async function ask(prompt, { mask = false } = {}) {
  stdout.write(prompt);

  // Suppress echo so the password is not left in terminal scrollback.
  const hide = mask && stdin.isTTY;
  if (hide) stdin.setRawMode?.(true);

  const { value, done } = await input.next();

  if (hide) {
    stdin.setRawMode?.(false);
    stdout.write("\n");
  }

  if (done) {
    console.error("\nInput ended before all values were provided.");
    process.exit(1);
  }

  return value;
}

const uri = process.env.MONGODB_URI?.trim();

if (!uri) {
  console.error(
    "MONGODB_URI is not set. Run with the app's environment, e.g.\n" +
      "  node --env-file=.env.local scripts/trust-centre-password.mjs",
  );
  process.exit(1);
}

const email = (
  (
    await ask(
      `Account email [${process.env.TRUST_CENTRE_EMAIL || "ayush@lurny.ai"}]: `,
    )
  ).trim() ||
  process.env.TRUST_CENTRE_EMAIL ||
  "ayush@lurny.ai"
).toLowerCase();

const password = await ask("New password: ", { mask: true });
const confirm = await ask("Confirm password: ", { mask: true });

if (password !== confirm) {
  console.error("\nPasswords do not match. Nothing was changed.");
  process.exit(1);
}

if (password.length < 12) {
  console.error(
    "\nRefusing: shorter than 12 characters.\n" +
      "One shared credential protects every document in the portal and it is a\n" +
      "fixed target. Use a long passphrase from a password manager.",
  );
  process.exit(1);
}

const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5_000 });

try {
  await client.connect();

  const accounts = client
    .db(process.env.MONGODB_DB?.trim() || "elurny")
    .collection(COLLECTION);

  const salt = randomBytes(16).toString("hex");
  const derived = await scrypt(password, Buffer.from(salt, "hex"));

  const result = await accounts.updateOne(
    { email },
    {
      $set: {
        passwordHash: `scrypt$${salt}$${derived.toString("hex")}`,
        passwordUpdatedAt: new Date(),
      },
    },
  );

  if (result.matchedCount === 0) {
    console.error(
      `\nNo account found for ${email}. It is created automatically the first\n` +
        "time the server boots — start the app once, then run this again.",
    );
    process.exitCode = 1;
  } else {
    console.log(`\nPassword updated for ${email}.`);
    console.log(
      "Existing sessions stay valid. To sign everyone out as well, change\n" +
        "TRUST_CENTRE_SECRET and redeploy.",
    );
  }
} catch (error) {
  console.error("\nCould not update the password:", error.message);
  process.exitCode = 1;
} finally {
  await client.close();
}
