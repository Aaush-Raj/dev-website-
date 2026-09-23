/**
 * INSTRUMENTATION — SERVER STARTUP
 * ---------------------------------------------------------------------------
 * `register()` runs once per server instance, before any request is handled.
 *
 * It seeds the Trust Centre reviewer account: if an account with the
 * configured email already exists it is left completely alone, and if none
 * exists one is created. See src/lib/trust-centre/account.ts.
 *
 * THE GUARD EXCLUDES EDGE, IT DOES NOT REQUIRE "nodejs"
 * Next calls `register` in every runtime, including Edge, where the MongoDB
 * driver's TCP sockets do not exist and importing it throws at boot. So Edge
 * must be skipped.
 *
 * It is written as `=== "edge"` rather than `!== "nodejs"` deliberately.
 * NEXT_RUNTIME is not always set under `next start` — it is populated for the
 * standalone server but can be undefined otherwise — and a `!== "nodejs"`
 * test therefore skipped seeding entirely on a plain `next start`, leaving
 * the portal with a stale password and no log line to say why. Excluding the
 * one runtime that cannot work is correct; requiring a variable that may be
 * absent is not.
 *
 * SEEDING MUST NEVER BLOCK STARTUP
 * `ensureTrustCentreAccount` handles its own failures and does not throw, but
 * this catches anyway: an unreachable database should close the portal, not
 * stop the marketing site from serving.
 */

export async function register() {
  if (process.env.NEXT_RUNTIME === "edge") return;

  try {
    const { ensureTrustCentreAccount } =
      await import("@/lib/trust-centre/account");
    await ensureTrustCentreAccount();
  } catch (error) {
    console.error("[trust-centre] account seeding skipped:", error);
  }
}
