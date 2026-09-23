/**
 * INSTRUMENTATION — SERVER STARTUP
 * ---------------------------------------------------------------------------
 * `register()` runs once per server instance, before any request is handled.
 *
 * It seeds the Trust Centre reviewer account: if an account with the
 * configured email already exists it is left completely alone, and if none
 * exists one is created. See src/lib/trust-centre/account.ts.
 *
 * THE NODE RUNTIME GUARD IS NOT OPTIONAL
 * Next calls `register` in every runtime, including Edge. The MongoDB driver
 * needs TCP sockets that Edge does not provide, so importing it there throws
 * at boot. The dynamic import inside the guard means the module is only
 * evaluated where it can work.
 *
 * SEEDING MUST NEVER BLOCK STARTUP
 * `ensureTrustCentreAccount` handles its own failures and does not throw, but
 * this catches anyway: an unreachable database should close the portal, not
 * stop the marketing site from serving.
 */

export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;

  try {
    const { ensureTrustCentreAccount } =
      await import("@/lib/trust-centre/account");
    await ensureTrustCentreAccount();
  } catch (error) {
    console.error("[trust-centre] account seeding skipped:", error);
  }
}
