import { cookies } from "next/headers";

import { auditContext, recordTrustCentreEvent } from "@/lib/trust-centre/audit";
import { getTrustCentreSession } from "@/lib/trust-centre/guard";
import {
  trustCentreCookieName,
  trustCentreCookieOptions,
} from "@/lib/trust-centre/session";

/**
 * POST /api/trust-centre/signout
 * ---------------------------------------------------------------------------
 * Ends the session.
 *
 * POST, NOT GET, ON PURPOSE
 * A GET sign-out can be triggered by any <img src> on any page, logging people
 * out unexpectedly, and browsers may prefetch it. A POST cannot be fired that
 * way, and SameSite=Lax blocks cross-site form posts.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const session = await getTrustCentreSession();
  const store = await cookies();

  /*
   * Overwritten with an empty, immediately-expiring cookie rather than only
   * `delete()`, and through the SAME options used to set it. A clear whose
   * path or security attributes differ is silently ignored by the browser,
   * leaving the session cookie alive — the one bug that makes a logout button
   * a lie.
   */
  store.set(trustCentreCookieName(), "", trustCentreCookieOptions(0));

  if (session) {
    void recordTrustCentreEvent({
      event: "signout",
      at: new Date(),
      account: session.account,
      ...auditContext(request.headers),
    });
  }

  return Response.json({ ok: true });
}
