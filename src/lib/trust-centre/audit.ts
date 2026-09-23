import "server-only";

import { getDb } from "@/lib/server/mongo";

/**
 * TRUST CENTRE — AUDIT LOG
 * ---------------------------------------------------------------------------
 * Records who signed in and which documents were downloaded.
 *
 * WHY A PORTAL LIKE THIS NEEDS ONE
 * The documents here are the evidence of Lurny's security posture. When a
 * client asks "who has seen our BCP?" — or when you need to answer that about
 * yourselves during an audit — the answer has to exist. A shared credential
 * makes this MORE important, not less: the log is the only record that
 * distinguishes one reviewer's session from another's.
 *
 * NEVER FAILS THE REQUEST
 * Writing the log must not be able to stop a legitimate download or sign-in.
 * Every call is fire-and-forget with its own catch: a Mongo outage degrades
 * the audit trail, it does not take the portal down. The console.error is the
 * fallback record when the database is unreachable.
 *
 * WHAT IS DELIBERATELY NOT STORED
 * No password, no session token, no full user-agent fingerprinting beyond what
 * helps identify a session. The IP is kept because "which network downloaded
 * this" is the question an audit actually asks.
 */

export const TRUST_CENTRE_AUDIT_COLLECTION = "trust_centre_audit";

export type TrustCentreEvent =
  | "signin.success"
  | "signin.failure"
  | "signin.rate_limited"
  | "signout"
  | "document.download"
  | "document.denied";

export interface TrustCentreAuditEntry {
  event: TrustCentreEvent;
  at: Date;
  /** Session account label, when signed in. */
  account?: string;
  /** Catalogue id for document events. */
  documentId?: string;
  ip?: string;
  userAgent?: string;
  /** Only ever a category ("bad_credentials"), never the attempted secret. */
  detail?: string;
}

export async function recordTrustCentreEvent(
  entry: TrustCentreAuditEntry,
): Promise<void> {
  try {
    const db = await getDb();
    await db
      .collection<TrustCentreAuditEntry>(TRUST_CENTRE_AUDIT_COLLECTION)
      .insertOne(entry);
  } catch (error) {
    console.error(
      "[trust-centre] audit write failed (%s%s)",
      entry.event,
      entry.documentId ? ` ${entry.documentId}` : "",
      error,
    );
  }
}

/** Shapes the request metadata every event carries. */
export function auditContext(headers: Headers): {
  ip?: string;
  userAgent?: string;
} {
  return {
    ip:
      headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      headers.get("x-real-ip")?.trim() ||
      undefined,
    userAgent: headers.get("user-agent")?.slice(0, 300) ?? undefined,
  };
}
