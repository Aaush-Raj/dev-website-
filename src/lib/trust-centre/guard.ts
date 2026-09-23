import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  trustCentreCookieName,
  verifyTrustCentreToken,
  type TrustCentreSession,
} from "@/lib/trust-centre/session";

/**
 * TRUST CENTRE — SERVER-SIDE SESSION GUARD
 * ---------------------------------------------------------------------------
 * The authorization boundary. Proxy (src/proxy.ts) redirects unauthenticated
 * traffic early for a clean user experience; THIS is what actually decides
 * whether a page renders or a document is released.
 *
 * WHY BOTH
 * Per the Next docs, Proxy is an optimistic check and explicitly not a
 * substitute for verification at the point of use. Data access should be
 * authorized where the data is read, so that a routing mistake — a matcher
 * typo, a new route added under a different path — cannot expose anything.
 * Calling this in every protected page and route means the default is closed.
 */

/** Reads and verifies the session, or null. Never redirects. */
export async function getTrustCentreSession(): Promise<TrustCentreSession | null> {
  const store = await cookies();
  return verifyTrustCentreToken(store.get(trustCentreCookieName())?.value);
}

/**
 * Requires a session, redirecting to sign-in when absent.
 *
 * For Server Components. `redirect()` throws, so nothing after the call runs —
 * which is what makes this safe to use as the first line of a page.
 */
export async function requireTrustCentreSession(): Promise<TrustCentreSession> {
  const session = await getTrustCentreSession();
  if (!session) redirect("/trust-centre/signin");
  return session;
}
