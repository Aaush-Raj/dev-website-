import { cookies } from "next/headers";

import { auditContext, recordTrustCentreEvent } from "@/lib/trust-centre/audit";
import { verifyTrustCentreCredentials } from "@/lib/trust-centre/credentials";
import {
  checkSignInRateLimit,
  clearSignInFailures,
  clientKey,
  recordSignInFailure,
} from "@/lib/trust-centre/rate-limit";
import {
  createTrustCentreToken,
  trustCentreCookieName,
  trustCentreCookieOptions,
  TRUST_CENTRE_MAX_AGE_SECONDS,
} from "@/lib/trust-centre/session";

/**
 * POST /api/trust-centre/signin
 * ---------------------------------------------------------------------------
 * Exchanges the shared credential for a session cookie.
 *
 * Node runtime: scrypt and HMAC come from node:crypto, which Edge lacks.
 */
export const runtime = "nodejs";

/** Never cached, never prerendered — it sets a cookie per request. */
export const dynamic = "force-dynamic";

/** One error string for every failure mode. See below. */
const GENERIC_ERROR = "Email or password is incorrect.";

export async function POST(request: Request) {
  const headers = request.headers;
  const key = clientKey(headers);
  const context = auditContext(headers);

  /* ------------------------- Rate limit first -------------------------- */
  // Before parsing or hashing: a locked-out caller must cost us nothing.
  const verdict = checkSignInRateLimit(key);

  if (!verdict.allowed) {
    void recordTrustCentreEvent({
      event: "signin.rate_limited",
      at: new Date(),
      ...context,
    });

    return Response.json(
      { ok: false, error: "Too many attempts. Please try again later." },
      {
        status: 429,
        headers: { "Retry-After": String(verdict.retryAfterSeconds ?? 900) },
      },
    );
  }

  let body: { email?: unknown; password?: unknown };

  try {
    body = await request.json();
  } catch {
    return Response.json(
      { ok: false, error: "Malformed request." },
      { status: 400 },
    );
  }

  const email = typeof body.email === "string" ? body.email : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!email || !password) {
    // Counted as a failure: an empty-field spray is still a spray.
    recordSignInFailure(key);
    return Response.json({ ok: false, error: GENERIC_ERROR }, { status: 401 });
  }

  const result = await verifyTrustCentreCredentials(email, password);

  if (!result.ok) {
    recordSignInFailure(key);

    void recordTrustCentreEvent({
      event: "signin.failure",
      at: new Date(),
      detail: "bad_credentials",
      ...context,
    });

    /*
     * ONE MESSAGE FOR EVERY FAILURE.
     * Not "no such account" or "wrong password": either would confirm whether
     * an address is the real one, which is half of a shared credential. The
     * credential check also spends the same time on both paths, so the
     * response body and its timing agree.
     */
    return Response.json({ ok: false, error: GENERIC_ERROR }, { status: 401 });
  }

  /* ------------------------------ Success ------------------------------ */
  clearSignInFailures(key);

  const account = result.account ?? "reviewer";
  const store = await cookies();

  store.set(
    trustCentreCookieName(),
    createTrustCentreToken(account),
    trustCentreCookieOptions(TRUST_CENTRE_MAX_AGE_SECONDS),
  );

  void recordTrustCentreEvent({
    event: "signin.success",
    at: new Date(),
    account,
    ...context,
  });

  return Response.json({ ok: true });
}
