/**
 * TRUST CENTRE — SIGN-IN RATE LIMIT
 * ---------------------------------------------------------------------------
 * Throttles repeated failed sign-ins from one IP.
 *
 * WHY THIS MATTERS MORE THAN USUAL HERE
 * There is ONE password and it never changes on its own. That makes the
 * sign-in endpoint a single fixed target worth grinding against — the exact
 * case where unlimited attempts turn a good password into a matter of time.
 * scrypt already makes each guess expensive; this makes the sequence
 * impossible.
 *
 * DELIBERATELY IN-MEMORY, AND THAT IS A REAL LIMIT
 * State lives in this process, so it resets on deploy and is not shared across
 * replicas: with N pods an attacker gets N times the budget. For a portal with
 * one credential and a handful of legitimate users that is an acceptable floor
 * rather than a ceiling, and it costs no new infrastructure. If the deployment
 * scales out or this is ever abused in earnest, back it with the Mongo
 * instance already configured (`src/lib/server/mongo.ts`) and keep this shape.
 *
 * COUNTS FAILURES ONLY
 * A successful sign-in clears the record, so a legitimate person who mistypes
 * twice and then succeeds is never penalised.
 */

interface Attempt {
  failures: number;
  /** When the current window expires, epoch ms. */
  resetAt: number;
  /** Set once locked out, epoch ms. */
  lockedUntil?: number;
}

const WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILURES = 8;
const LOCKOUT_MS = 15 * 60 * 1000;

/** Bounded so a spray of forged IPs cannot grow this map without limit. */
const MAX_TRACKED = 10_000;

const attempts = new Map<string, Attempt>();

/** Drops expired records; called on write, so there is no timer to leak. */
function prune(now: number): void {
  for (const [key, record] of attempts) {
    const done = (record.lockedUntil ?? record.resetAt) <= now;
    if (done) attempts.delete(key);
  }

  // Still too many (an active flood): evict oldest-first to stay bounded.
  if (attempts.size > MAX_TRACKED) {
    const excess = attempts.size - MAX_TRACKED;
    let removed = 0;
    for (const key of attempts.keys()) {
      attempts.delete(key);
      if (++removed >= excess) break;
    }
  }
}

export interface RateLimitVerdict {
  allowed: boolean;
  /** Seconds until the caller may retry, when blocked. */
  retryAfterSeconds?: number;
}

export function checkSignInRateLimit(key: string): RateLimitVerdict {
  const now = Date.now();
  const record = attempts.get(key);

  if (!record) return { allowed: true };

  if (record.lockedUntil && record.lockedUntil > now) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((record.lockedUntil - now) / 1000),
    };
  }

  // Lockout served, or window elapsed: start clean.
  if (record.lockedUntil || record.resetAt <= now) {
    attempts.delete(key);
    return { allowed: true };
  }

  return { allowed: true };
}

export function recordSignInFailure(key: string): void {
  const now = Date.now();
  prune(now);

  const record = attempts.get(key);

  if (!record || record.resetAt <= now) {
    attempts.set(key, { failures: 1, resetAt: now + WINDOW_MS });
    return;
  }

  record.failures += 1;

  if (record.failures >= MAX_FAILURES) {
    record.lockedUntil = now + LOCKOUT_MS;
  }
}

export function clearSignInFailures(key: string): void {
  attempts.delete(key);
}

/**
 * Identifies the caller for rate-limiting.
 *
 * TRUSTS `x-forwarded-for` ONLY BECAUSE NGINX SETS IT.
 * The app is never exposed directly; nginx (see nginx.conf) overwrites this
 * header on every proxied request, so a client-supplied value cannot survive.
 * Were the app ever exposed without that proxy, this would become spoofable
 * and the limiter would need the real socket address instead.
 *
 * The LEFTMOST entry is the original client; taking the last would read the
 * proxy itself and rate-limit everyone as one.
 */
export function clientKey(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return headers.get("x-real-ip")?.trim() || "unknown";
}
