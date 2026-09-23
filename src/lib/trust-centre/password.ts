import { scrypt as scryptCb, type ScryptOptions } from "node:crypto";

/**
 * TRUST CENTRE — PASSWORD HASHING PRIMITIVES
 * ---------------------------------------------------------------------------
 * scrypt derivation and the stored hash format. Pure functions, no I/O.
 *
 * WHY THIS IS ITS OWN MODULE
 * `account.ts` needs to hash a password when seeding; `credentials.ts` needs
 * to hash one when verifying, and needs to read the account to do it. Having
 * the two import each other created a real import cycle. The shared primitive
 * lives here instead, so both depend on this and neither depends on the other.
 *
 * WHY SCRYPT
 * Deliberately slow and memory-hard, so offline guessing against a leaked hash
 * is expensive. It ships in Node's standard library, so this costs no
 * dependency.
 *
 * THESE PARAMETERS ARE PART OF THE STORED HASH.
 * A hash derived with different N/r/p will never verify, and the failure looks
 * exactly like a wrong password. Changing them invalidates every existing
 * account, so they must stay in step with scripts/trust-centre-hash.mjs.
 */

/** N=2^15 with r=8,p=1 is ~150ms and 32MB per attempt — unnoticeable on a
 *  real sign-in, brutal at a million guesses. */
const SCRYPT_OPTIONS: ScryptOptions = {
  N: 32_768,
  r: 8,
  p: 1,
  maxmem: 128 * 1024 * 1024,
};

const SCRYPT_KEYLEN = 64;

/** Caps a pathological password used as a DoS lever: scrypt cost is fixed,
 *  but hashing a 10MB string still wastes the request. */
export const MAX_PASSWORD_LENGTH = 1_024;

/**
 * Promise wrapper over `crypto.scrypt`.
 *
 * Written out rather than `promisify`d: `scrypt` is overloaded, and
 * promisify's types resolve to the three-argument form, which drops the
 * options object carrying our cost parameters.
 */
export function scrypt(password: string, salt: Buffer): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    scryptCb(
      password.slice(0, MAX_PASSWORD_LENGTH).normalize("NFKC"),
      salt,
      SCRYPT_KEYLEN,
      SCRYPT_OPTIONS,
      (error, derivedKey) => (error ? reject(error) : resolve(derivedKey)),
    );
  });
}

/** Derives a hash in the stored format: `scrypt$<saltHex>$<hashHex>`. */
export async function hashPassword(
  password: string,
  saltHex: string,
): Promise<string> {
  const derived = await scrypt(password, Buffer.from(saltHex, "hex"));
  return `scrypt$${saltHex}$${derived.toString("hex")}`;
}

/** Splits a stored hash, or null when it is not the expected shape. */
export function parseStoredHash(
  stored: string,
): { saltHex: string; expectedHex: string } | null {
  const parts = stored.split("$");
  if (parts.length !== 3 || parts[0] !== "scrypt") return null;
  return { saltHex: parts[1], expectedHex: parts[2] };
}
