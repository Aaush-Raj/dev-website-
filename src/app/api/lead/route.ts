import { ObjectId } from "mongodb";

import { sendLeadNotification } from "@/lib/server/email";
import { leads, type LeadDocument } from "@/lib/server/mongo";

/**
 * POST /api/lead
 * ---------------------------------------------------------------------------
 * Receives a demo request or contact enquiry: validates it, stores it, then
 * notifies the team.
 *
 * ORDER MATTERS — STORE FIRST, THEN EMAIL
 * The database write is what must not fail; the email is a convenience. So the
 * lead is persisted first and the notification attempted after, with its
 * outcome recorded on the document. A mail outage therefore costs us a
 * notification, never a lead, and `notified: false` is a queryable list of
 * people nobody has been told about.
 *
 * VALIDATION IS REPEATED HERE ON PURPOSE
 * The form validates too, but that is for the person filling it in. Anything
 * can POST to this endpoint, so the server re-checks independently and never
 * trusts the client's word.
 *
 * NOTE: THIS ROUTE IS INERT UNDER `output: "export"`
 * The site currently builds to static HTML (see next.config.ts), where API
 * routes are not emitted — the build skips this file rather than failing. It
 * starts serving the moment that option is removed and the container runs
 * `next start`. Until then the forms fall back to their own error state.
 */

/** Node, not Edge: the Mongo driver uses TCP sockets Edge does not provide. */
export const runtime = "nodejs";

/*
 * `export const dynamic = "force-dynamic"` is deliberately NOT set here.
 *
 * It is what a POST route would normally carry, but Next refuses to BUILD when
 * it appears alongside `output: "export"` — the whole site build fails, not
 * just this route. Since the site is still a static export until the server
 * switch lands, that would block every deploy.
 *
 * Nothing is lost: a POST handler is never prerendered or cached regardless,
 * so the directive is redundant. Leaving it out keeps this file inert-but-
 * harmless today and correct the moment the export option is removed.
 */

/** Caps, so a malicious payload cannot fill the database. */
const MAX_FIELD = 500;
const MAX_MESSAGE = 5_000;

interface Payload {
  kind?: unknown;
  source?: unknown;
  name?: unknown;
  email?: unknown;
  organisation?: unknown;
  selections?: unknown;
  message?: unknown;
  consent?: unknown;
  /** Honeypot — see the note in `validate`. */
  company_website?: unknown;
}

/** Trims and caps a string field, returning undefined when empty. */
function text(value: unknown, max = MAX_FIELD): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, max) : undefined;
}

/**
 * Deliberately permissive: the only thing worth rejecting is an address that
 * cannot be one. Clever patterns reject valid addresses far more often than
 * they catch typos, and a bounced email is recoverable where a refused lead
 * is not.
 */
function looksLikeEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let body: Payload;

  try {
    body = (await request.json()) as Payload;
  } catch {
    return Response.json(
      { ok: false, error: "Malformed request." },
      { status: 400 },
    );
  }

  /*
   * HONEYPOT
   * The form renders a field no human sees; a bot that fills every input trips
   * it. We answer 200 rather than an error so the bot records success and does
   * not retry with a different shape — but nothing is stored.
   */
  if (text(body.company_website)) {
    return Response.json({ ok: true });
  }

  const name = text(body.name);
  const email = text(body.email);

  const problems: Record<string, string> = {};
  if (!name) problems.name = "Please enter your name.";
  if (!email) problems.email = "Please enter your work email.";
  else if (!looksLikeEmail(email))
    problems.email = "Please enter a valid email address.";

  if (Object.keys(problems).length > 0) {
    return Response.json({ ok: false, errors: problems }, { status: 422 });
  }

  /* Only string values survive, so an object cannot be smuggled in. */
  const selections: Record<string, string> = {};
  if (body.selections && typeof body.selections === "object") {
    for (const [key, value] of Object.entries(
      body.selections as Record<string, unknown>,
    )) {
      const clean = text(value);
      if (clean) selections[text(key) ?? "field"] = clean;
    }
  }

  const lead: LeadDocument = {
    kind: body.kind === "contact" ? "contact" : "demo",
    source: text(body.source) ?? "unknown",
    name: name as string,
    email: email as string,
    organisation: text(body.organisation),
    selections: Object.keys(selections).length > 0 ? selections : undefined,
    message: text(body.message, MAX_MESSAGE),
    consent: body.consent === true,
    createdAt: new Date(),
    notified: false,
    meta: {
      userAgent: request.headers.get("user-agent")?.slice(0, MAX_FIELD),
      referer: request.headers.get("referer")?.slice(0, MAX_FIELD),
    },
  };

  /* ---------------------------- Store ---------------------------------- */
  let id: string;

  try {
    const collection = await leads();
    const result = await collection.insertOne(lead);
    id = result.insertedId.toString();
  } catch (error) {
    // The lead is NOT captured, so this is a real failure and the form must
    // say so rather than thanking someone whose details went nowhere.
    console.error("[lead] database write failed", error);
    return Response.json(
      { ok: false, error: "We could not save your request. Please try again." },
      { status: 503 },
    );
  }

  /* --------------------------- Notify ---------------------------------- */
  // Past this point the lead is safe, so nothing below may fail the request.
  const notification = await sendLeadNotification(lead);

  if (notification.status === "sent") {
    try {
      const collection = await leads();
      await collection.updateOne(
        { _id: ObjectId.createFromHexString(id) },
        { $set: { notified: true } },
      );
    } catch (error) {
      // Cosmetic only: the lead and the email both exist.
      console.warn("[lead] could not mark as notified", error);
    }
  } else if (notification.status === "failed") {
    console.error("[lead] notification failed: %s", notification.reason);
  }

  return Response.json({ ok: true, id });
}
