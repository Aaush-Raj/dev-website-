import { createHash, timingSafeEqual } from "node:crypto";

import {
  findTrustCentreAccount,
  type TrustCentreAccount,
} from "@/lib/trust-centre/account";
import { parseStoredHash, scrypt } from "@/lib/trust-centre/password";

/**
 * TRUST CENTRE — CREDENTIAL CHECK
 * ---------------------------------------------------------------------------
 * Verifies the credential that opens the document portal, against the account
 * stored in MongoDB (see account.ts).
 *
 * THE PASSWORD IS NEVER STORED, ONLY ITS SCRYPT HASH
 * The account row holds `scrypt$<salt>$<hash>`. Anyone who reads the database,
 * a backup or a screenshot learns nothing they can sign in with, and cannot
 * try the password against your other systems.
 *
 * WHY EVERY ATTEMPT COSTS THE SAME TIME
 * A wrong email must take as long as a wrong password. Otherwise the endpoint
 * answers "is this address the real one?" through its response time, which
 * hands an attacker half the credential. This therefore always runs a full
 * scrypt derivation — even when no account was found at all.
 */

export interface CredentialResult {
  ok: boolean;
  /** The account label recorded in the session when `ok`. */
  account?: string;
}

/**
 * A stand-in salt used when there is no account to check against.
 *
 * Derived from the session secret so it is stable per deployment but
 * unguessable. It exists purely to burn the same CPU a real comparison would.
 */
function dummySaltHex(): string {
  return createHash("sha256")
    .update(process.env.TRUST_CENTRE_SECRET ?? "unconfigured")
    .digest("hex")
    .slice(0, 32);
}

/**
 * Checks a submitted email and password against the stored account.
 *
 * Returns only ok/not-ok: the caller must not be able to distinguish "unknown
 * email" from "wrong password", because the UI must not either.
 */
export async function verifyTrustCentreCredentials(
  email: string,
  password: string,
): Promise<CredentialResult> {
  const submittedEmail = email.trim().toLowerCase();

  let account: TrustCentreAccount | null = null;

  try {
    account = await findTrustCentreAccount(submittedEmail);
  } catch (error) {
    /*
     * A database outage fails CLOSED: nobody signs in until Mongo is back.
     * Note this returns BEFORE the scrypt work below, so an outage is
     * distinguishable by timing — acceptable, because it tells an attacker
     * only that the database is down, not whether an email exists.
     */
    console.error("[trust-centre] account lookup failed:", error);
    return { ok: false };
  }

  const parsed = account ? parseStoredHash(account.passwordHash) : null;

  if (account && !parsed) {
    console.error(
      "[trust-centre] stored passwordHash for %s is malformed; refusing.",
      submittedEmail,
    );
  }

  /*
   * ALWAYS DERIVE, even when there is no account — see the timing note above.
   * On a miss we hash against a throwaway salt so the work is real but the
   * result cannot match. Skipping it would make "no such account" measurably
   * faster than "wrong password" and leak which email is the real one.
   */
  const derived = await scrypt(
    password,
    Buffer.from(parsed?.saltHex ?? dummySaltHex(), "hex"),
  );

  if (!account || !parsed) return { ok: false };

  const expected = Buffer.from(parsed.expectedHex, "hex");

  /*
   * Constant-time comparison. A byte-by-byte `===` leaks, through its timing,
   * how much of a guess was correct. Lengths are checked first because
   * timingSafeEqual throws on a length mismatch.
   */
  const matches =
    derived.length === expected.length && timingSafeEqual(derived, expected);

  if (!matches) return { ok: false };

  return { ok: true, account: account.label || account.email };
}
