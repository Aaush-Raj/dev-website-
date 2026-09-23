import "server-only";

import { randomBytes, timingSafeEqual } from "node:crypto";
import type { Collection } from "mongodb";

import { getDb } from "@/lib/server/mongo";
import {
  hashPassword,
  parseStoredHash,
  scrypt,
} from "@/lib/trust-centre/password";

/**
 * TRUST CENTRE — ACCOUNT STORE AND SEEDING
 * ---------------------------------------------------------------------------
 * The portal's reviewer account lives in MongoDB, created automatically on
 * first use if it does not already exist.
 *
 * SEEDING IS "CREATE IF ABSENT", NEVER "RESET"
 * If an account with this email exists, seeding leaves it completely alone —
 * password included. That is the whole point: once you change the password in
 * the database, a deploy must not silently put the old one back. A seeder that
 * overwrote on every boot would make the default password permanent no matter
 * what you did afterwards.
 *
 * WHY A DATABASE ROW RATHER THAN ONLY ENV VARS
 * The password can then be rotated without a redeploy, and there is one place
 * that says when it last changed. Mongo is already a dependency for leads and
 * the audit log, so this costs no new infrastructure.
 *
 * THE PASSWORD IS STORED ONLY AS AN SCRYPT HASH — see credentials.ts. Nothing
 * here ever persists, logs or returns a plaintext password.
 */

export const TRUST_CENTRE_ACCOUNTS_COLLECTION = "trust_centre_accounts";

/** The one reviewer account. Hardcoded because there is exactly one, and it
 *  identifies rather than authenticates — see DEFAULT_PASSWORD below. */
export const TRUST_CENTRE_DEFAULT_EMAIL = "ayush@lurny.ai";

/**
 * The development default password.
 *
 * DELIBERATELY NOT A SECRET, AND NOT USABLE BY DEFAULT.
 * It is in the repository, so it is readable by anyone with git access and it
 * cannot be removed from history later. It exists so a developer can clone,
 * run `npm run dev` and sign in without any setup — which is what it is worth
 * and no more.
 */
export const TRUST_CENTRE_DEV_PASSWORD = "lurny-trust-dev-2026-local-only";

export interface TrustCentreAccount {
  /** Lowercased. The lookup key, and unique. */
  email: string;
  /** `scrypt$<salt>$<hash>`. Never a plaintext password. */
  passwordHash: string;
  /** Shown in the portal header and written to the audit log. */
  label: string;
  createdAt: Date;
  passwordUpdatedAt: Date;
  /** Set false to disable sign-in without deleting the record. */
  active: boolean;
}

export async function trustCentreAccounts(): Promise<
  Collection<TrustCentreAccount>
> {
  const db = await getDb();
  return db.collection<TrustCentreAccount>(TRUST_CENTRE_ACCOUNTS_COLLECTION);
}

/**
 * Decides which password a NEWLY created account gets.
 *
 * `TRUST_CENTRE_PASSWORD` wins whenever it is set. Otherwise the public
 * development password is used ONLY if `TRUST_CENTRE_ALLOW_DEV_PASSWORD` is
 * explicitly "true".
 *
 * WHY AN EXPLICIT FLAG RATHER THAN `NODE_ENV !== "production"`
 * NODE_ENV cannot express this. `next build` bakes NODE_ENV=production into
 * the standalone server, so a developer running a production build locally
 * would be locked out, while `next dev` would happily seed a public password
 * on any machine that happened to run it. Requiring someone to type the flag
 * makes using the committed password a deliberate act rather than a
 * consequence of how the app was started.
 *
 * Returning null rather than throwing lets the caller log one clear message
 * and carry on with the portal closed, instead of crashing the server on boot
 * — the marketing site must keep serving.
 */
function resolveSeedPassword(): string | null {
  const supplied = process.env.TRUST_CENTRE_PASSWORD?.trim();
  if (supplied) return supplied;

  if (process.env.TRUST_CENTRE_ALLOW_DEV_PASSWORD?.trim() === "true") {
    return TRUST_CENTRE_DEV_PASSWORD;
  }

  console.error(
    "[trust-centre] no account exists and TRUST_CENTRE_PASSWORD is not set, " +
      "so none was created and nobody can sign in.\n" +
      "  Production: set TRUST_CENTRE_PASSWORD to a value that has never been " +
      "committed, then restart.\n" +
      "  Local development: set TRUST_CENTRE_ALLOW_DEV_PASSWORD=true to use " +
      "the public default password from the repository.",
  );

  return null;
}

/**
 * Reconciles the reviewer account with the environment on every boot.
 *
 * THE ENVIRONMENT IS THE SOURCE OF TRUTH.
 * `TRUST_CENTRE_EMAIL` and `TRUST_CENTRE_PASSWORD` decide what the credential
 * is. On each start this:
 *
 *   - creates the account when it does not exist;
 *   - rewrites the stored hash when the configured password no longer matches
 *     it;
 *   - renames the account when the configured email changes;
 *   - does nothing at all when both already agree.
 *
 * So changing the Kubernetes secret and restarting changes the password, which
 * is the behaviour an operator expects from a variable called
 * TRUST_CENTRE_PASSWORD. The database row is a cache of that decision, not a
 * second place where the truth might live.
 *
 * THE COST OF THIS CHOICE, STATED PLAINLY
 * `npm run trust-centre:password` still edits the database and takes effect
 * immediately — but the next restart will reset it to whatever the environment
 * says. That script is therefore only for a deployment where
 * TRUST_CENTRE_PASSWORD is unset. The startup log says which mode is in force,
 * so this is visible rather than surprising.
 *
 * VERIFYING COSTS ONE SCRYPT (~150ms) PER BOOT
 * The stored hash cannot be compared to a plaintext password without deriving
 * it, salt and all. That runs once per server start, not per request.
 *
 * CONCURRENCY: several pods boot at once. A unique index on `email` makes the
 * database the arbitrator for the insert; the rewrite below is idempotent, so
 * pods racing to write the same hash is harmless.
 */
export async function ensureTrustCentreAccount(): Promise<void> {
  const email =
    process.env.TRUST_CENTRE_EMAIL?.trim().toLowerCase() ||
    TRUST_CENTRE_DEFAULT_EMAIL;

  const label = process.env.TRUST_CENTRE_ACCOUNT_LABEL?.trim() || "Lurny";

  let accounts: Collection<TrustCentreAccount>;

  try {
    accounts = await trustCentreAccounts();
    await accounts.createIndex({ email: 1 }, { unique: true });
  } catch (error) {
    console.error(
      "[trust-centre] could not reach the database to seed the account:",
      error,
    );
    return;
  }

  const configured = process.env.TRUST_CENTRE_PASSWORD?.trim();
  const existing = await accounts.findOne({ email });

  /* ------------------------------------------------------------------ *
   * No password configured.
   * ------------------------------------------------------------------ */
  if (!configured) {
    if (existing) {
      // Managed by `npm run trust-centre:password`. Leave it alone, and say
      // so, because "why didn't my env var apply?" is the obvious next
      // question.
      console.log(
        "[trust-centre] account %s exists and TRUST_CENTRE_PASSWORD is not " +
          "set; its password is managed in the database.",
        email,
      );
      return;
    }

    const fallback = resolveSeedPassword();
    if (!fallback) return;

    await createAccount(accounts, email, fallback, label);
    return;
  }

  /* ------------------------------------------------------------------ *
   * A password IS configured: the environment wins.
   * ------------------------------------------------------------------ */
  if (!existing) {
    /*
     * Before creating, check whether this is a RENAME rather than a new
     * account: TRUST_CENTRE_EMAIL changed and the old row is still there.
     * Renaming preserves createdAt and the account's history, where creating
     * a second row would leave the old address able to sign in.
     */
    const others = await accounts.find({}).toArray();

    if (others.length === 1 && others[0].email !== email) {
      await accounts.updateOne(
        { email: others[0].email },
        {
          $set: {
            email,
            label,
            passwordHash: await hashPassword(
              configured,
              randomBytes(16).toString("hex"),
            ),
            passwordUpdatedAt: new Date(),
          },
        },
      );

      console.log(
        "[trust-centre] reviewer account renamed from %s to %s",
        others[0].email,
        email,
      );
      return;
    }

    await createAccount(accounts, email, configured, label);
    return;
  }

  // The account exists. Does the stored hash still match the configured
  // password?
  const parsed = parseStoredHash(existing.passwordHash);
  let matches = false;

  if (parsed) {
    const derived = await scrypt(
      configured,
      Buffer.from(parsed.saltHex, "hex"),
    );
    const expected = Buffer.from(parsed.expectedHex, "hex");
    matches =
      derived.length === expected.length && timingSafeEqual(derived, expected);
  }

  if (matches && existing.label === label) return;

  await accounts.updateOne(
    { email },
    {
      $set: {
        label,
        ...(matches
          ? {}
          : {
              passwordHash: await hashPassword(
                configured,
                randomBytes(16).toString("hex"),
              ),
              passwordUpdatedAt: new Date(),
            }),
      },
    },
  );

  if (!matches) {
    console.log(
      "[trust-centre] password for %s updated from TRUST_CENTRE_PASSWORD.",
      email,
    );
  }
}

/** Inserts a new account. Duplicate-key means another pod won the race. */
async function createAccount(
  accounts: Collection<TrustCentreAccount>,
  email: string,
  password: string,
  label: string,
): Promise<void> {
  const now = new Date();

  try {
    await accounts.insertOne({
      email,
      passwordHash: await hashPassword(
        password,
        randomBytes(16).toString("hex"),
      ),
      label,
      createdAt: now,
      passwordUpdatedAt: now,
      active: true,
    });

    console.log("[trust-centre] created reviewer account for %s", email);

    if (password === TRUST_CENTRE_DEV_PASSWORD) {
      console.warn(
        "[trust-centre] this account uses the PUBLIC development password " +
          "from the repository. Never use it outside local development.",
      );
    }
  } catch (error) {
    // 11000 = duplicate key: another pod created it first, which is success.
    if ((error as { code?: number }).code === 11000) return;
    console.error("[trust-centre] could not create the account:", error);
  }
}

/** Looks up an active account. Returns null when absent or disabled. */
export async function findTrustCentreAccount(
  email: string,
): Promise<TrustCentreAccount | null> {
  const accounts = await trustCentreAccounts();
  return accounts.findOne({ email: email.trim().toLowerCase(), active: true });
}
