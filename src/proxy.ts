import { NextResponse, type NextRequest } from "next/server";

import {
  trustCentreCookieName,
  verifyTrustCentreToken,
} from "@/lib/trust-centre/session";

/**
 * PROXY — TRUST CENTRE GATE
 * ---------------------------------------------------------------------------
 * Blocks unauthenticated access to /trust-centre before any page renders.
 *
 * NOTE ON THE FILENAME: this is Next 16's Middleware. It was renamed to
 * `proxy.ts` in 16 — a `middleware.ts` here would simply never run.
 *
 * THIS IS A GATE, NOT THE LOCK
 * The Next docs are explicit that Proxy is for optimistic checks, not the
 * authorization boundary: it runs before the request reaches the route, on
 * every navigation, and is the wrong place for anything slow or decisive. So
 * it verifies the cookie's SIGNATURE and expiry — cheap, no I/O — and redirects
 * if that fails.
 *
 * The real enforcement is at each protected route, which re-reads the session
 * itself (`requireTrustCentreSession`). That belt-and-braces matters: if a
 * matcher is ever edited carelessly, a route that checks its own session stays
 * shut, whereas one that trusted this file alone would silently open.
 *
 * SIGN-IN SUBMISSION IS EXCLUDED
 * /api/trust-centre/signin must be reachable WITHOUT a session — it is how you
 * get one. Gating it would deadlock the portal.
 */

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const token = request.cookies.get(trustCentreCookieName())?.value;
  const session = verifyTrustCentreToken(token);

  // Already signed in and heading for the sign-in page: send them onward
  // rather than showing a login form they do not need.
  if (pathname === "/trust-centre/signin") {
    if (session) {
      return NextResponse.redirect(new URL("/trust-centre", request.url));
    }
    return NextResponse.next();
  }

  if (session) return NextResponse.next();

  /*
   * An expired or absent session on an API call gets JSON, not a redirect: a
   * fetch() following a 307 to an HTML login page produces a confusing parse
   * error in the client instead of a clear "signed out".
   */
  if (pathname.startsWith("/api/trust-centre/")) {
    return NextResponse.json(
      { ok: false, error: "Not signed in." },
      { status: 401 },
    );
  }

  const signIn = new URL("/trust-centre/signin", request.url);

  /*
   * Remember where they were going, so the sign-in can return them there.
   * Only the path and query are kept — never an absolute URL, which would let
   * a crafted link turn this into an open redirect to another origin.
   */
  if (pathname !== "/trust-centre") {
    signIn.searchParams.set("next", `${pathname}${search}`);
  }

  return NextResponse.redirect(signIn);
}

export const config = {
  /*
   * Scoped to the portal and its API. Without a matcher this would run on
   * every request including static assets, per the Next docs — needless work,
   * and a redirect bug there would take down the marketing site too.
   *
   * The signin ROUTE HANDLER is excluded here (not just special-cased above)
   * so a session check can never stand between someone and signing in.
   */
  matcher: ["/trust-centre/:path*", "/api/trust-centre/((?!signin).*)"],
};
