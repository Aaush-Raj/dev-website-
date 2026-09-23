import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

/**
 * TRUST CENTRE — SESSION
 * ---------------------------------------------------------------------------
 * Signed, stateless sessions for the document portal at /trust-centre.
 *
 * NAMING IS DELIBERATELY SEPARATE FROM "USER" AUTH
 * Everything here is prefixed `trustCentre` / `tc_`, and nothing in this
 * folder is imported by the rest of the site. When the real product login
 * arrives it will have its own cookie, its own secret and its own module, and
 * the two can never be confused for one another at a call site, in a cookie
 * jar, or in a log. That separation is the whole point: this credential is
 * shared by every reviewer and grants read access to internal documents, so it
 * must never be mistaken for, or upgraded into, a per-person account.
 *
 * WHY STATELESS (HMAC), NOT A SESSION TABLE
 * There is exactly one credential and no per-user state to store. A signed
 * cookie needs no database round-trip on each request, which matters because
 * the Proxy gate runs on every navigation. The trade-off — you cannot revoke
 * one session individually — costs nothing here: rotating TRUST_CENTRE_SECRET
 * invalidates every outstanding session at once, which is exactly the lever
 * you want when a shared password is involved.
 *
 * WHY NOT JWT
 * A JWT would add a dependency and an algorithm-confusion footgun (`alg:none`,
 * HS/RS mixups) to buy features we do not use. This format is a fixed shape
 * with one algorithm, verified in constant time.
 */

/** Cookie name. `__Host-` locks it to this exact origin, HTTPS-only, path=/.
 *  A subdomain cannot set or overwrite it, which rules out a whole class of
 *  session-fixation attacks from anything else on elurny.com. */
export const TRUST_CENTRE_COOKIE = "__Host-tc_session";

/** Dev fallback: `__Host-` requires Secure, which http://localhost cannot set. */
export const TRUST_CENTRE_COOKIE_DEV = "tc_session";

export function trustCentreCookieName(): string {
  return process.env.NODE_ENV === "production"
    ? TRUST_CENTRE_COOKIE
    : TRUST_CENTRE_COOKIE_DEV;
}

/**
 * Eight hours: comfortably longer than a due-diligence review sitting, short
 * enough that a laptop left open at a client site stops being an open door by
 * the next morning.
 */
export const TRUST_CENTRE_MAX_AGE_SECONDS = 8 * 60 * 60;

export interface TrustCentreSession {
  /** Who signed in. One shared account today, so this is a constant — but it
   *  is carried in the token so per-client credentials later need no format
   *  change. */
  account: string;
  /** Issued-at, epoch seconds. */
  iat: number;
  /** Expiry, epoch seconds. Checked on every verify. */
  exp: number;
}

/**
 * The signing secret, read lazily.
 *
 * Read at call time rather than module scope so that importing this file
 * cannot crash the build: `next build` evaluates modules while prerendering,
 * where the secret is legitimately absent.
 */
function secret(): Buffer {
  const raw = process.env.TRUST_CENTRE_SECRET?.trim();

  if (!raw || raw.length < 32) {
    throw new Error(
      "TRUST_CENTRE_SECRET is missing or too short (need >= 32 chars). " +
        "Generate one with: openssl rand -base64 48",
    );
  }

  return Buffer.from(raw, "utf8");
}

/** base64url, because a cookie value may not contain `+`, `/` or `=`. */
function b64url(input: Buffer | string): string {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function fromB64url(input: string): Buffer {
  return Buffer.from(input.replace(/-/g, "+").replace(/_/g, "/"), "base64");
}

function sign(payload: string): string {
  return b64url(createHmac("sha256", secret()).update(payload).digest());
}

/** Mints a token for a freshly authenticated session. */
export function createTrustCentreToken(account: string): string {
  const now = Math.floor(Date.now() / 1000);
  const session: TrustCentreSession = {
    account,
    iat: now,
    exp: now + TRUST_CENTRE_MAX_AGE_SECONDS,
  };

  const payload = b64url(JSON.stringify(session));
  return `${payload}.${sign(payload)}`;
}

/**
 * Verifies a token and returns its session, or null.
 *
 * NEVER THROWS AND NEVER EXPLAINS
 * Every failure — malformed, bad signature, expired — returns null. The caller
 * cannot tell which, and neither can an attacker probing the endpoint.
 */
export function verifyTrustCentreToken(
  token: string | undefined | null,
): TrustCentreSession | null {
  if (!token) return null;

  const parts = token.split(".");
  if (parts.length !== 2) return null;

  const [payload, signature] = parts;

  let expected: string;
  try {
    expected = sign(payload);
  } catch {
    // Secret missing/short. Treated as "no valid session" rather than a crash,
    // so a misconfigured deploy locks people OUT rather than letting them in.
    return null;
  }

  /*
   * Constant-time comparison. A byte-by-byte `===` leaks, through its timing,
   * how much of a forged signature was correct — enough to reconstruct a valid
   * one byte at a time. Lengths are compared first because timingSafeEqual
   * throws on a length mismatch.
   */
  const a = Buffer.from(signature, "utf8");
  const b = Buffer.from(expected, "utf8");
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  let session: TrustCentreSession;
  try {
    session = JSON.parse(fromB64url(payload).toString("utf8"));
  } catch {
    return null;
  }

  // Signature proves we minted it; expiry proves it is still ours to honour.
  if (typeof session.exp !== "number" || session.exp <= Date.now() / 1000) {
    return null;
  }

  return session;
}

/** Cookie attributes. Centralised so set and clear can never disagree — a
 *  mismatch in path or domain silently leaves the old cookie in place. */
export function trustCentreCookieOptions(maxAge: number) {
  return {
    httpOnly: true, // JS cannot read it, so XSS cannot exfiltrate the session.
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const, // Survives following a link in; blocks CSRF POSTs.
    path: "/",
    maxAge,
  };
}

/** A random, URL-safe value for CSRF tokens and request ids. */
export function randomToken(bytes = 32): string {
  return b64url(randomBytes(bytes));
}
