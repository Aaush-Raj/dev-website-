import type { LeadDocument } from "@/lib/server/mongo";

/**
 * TEAM NOTIFICATION EMAIL
 * ---------------------------------------------------------------------------
 * Sends one message to the internal team when a lead arrives.
 *
 * PROVIDER-AGNOSTIC BY DESIGN
 * The transport is chosen at runtime from the environment, so the provider can
 * be decided (or changed) without touching this file's callers:
 *
 *   - `RESEND_API_KEY` set -> Resend's HTTP API.
 *   - neither set          -> logs the message and reports `skipped`.
 *
 * Resend is called over plain `fetch` rather than its SDK: it is one POST, and
 * a dependency for one request is not worth the install. An SMTP transport can
 * be added here the same way when those credentials are chosen.
 *
 * FAILURE IS NON-FATAL, BY CONTRACT
 * This never throws. The lead is already in the database by the time it runs,
 * and a mail outage must not turn a captured lead into an error page. It
 * returns a result the caller records on the document, so an unsent
 * notification is visible in the data rather than lost.
 */

export type EmailResult =
  | { status: "sent"; id?: string }
  | { status: "skipped"; reason: string }
  | { status: "failed"; reason: string };

/** Escapes text interpolated into the HTML body. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** A readable subject line, so the inbox is scannable without opening. */
function subjectFor(lead: LeadDocument): string {
  const what = lead.kind === "demo" ? "Demo request" : "Contact enquiry";
  const who = lead.organisation
    ? `${lead.name} (${lead.organisation})`
    : lead.name;
  return `${what}: ${who}`;
}

function bodyFor(lead: LeadDocument): { text: string; html: string } {
  const rows: [string, string][] = [
    ["Name", lead.name],
    ["Email", lead.email],
  ];

  if (lead.organisation) rows.push(["Organisation", lead.organisation]);

  for (const [key, value] of Object.entries(lead.selections ?? {})) {
    rows.push([key, value]);
  }

  if (lead.message) rows.push(["Message", lead.message]);

  rows.push(["Source page", lead.source]);
  rows.push(["Submitted", lead.createdAt.toISOString()]);
  if (lead.consent) rows.push(["Wants the overview", "Yes"]);

  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");

  const html = `<table cellpadding="6" style="border-collapse:collapse;font:14px system-ui,sans-serif">
${rows
  .map(
    ([k, v]) =>
      `<tr><td style="color:#666;vertical-align:top">${escapeHtml(k)}</td><td><strong>${escapeHtml(v)}</strong></td></tr>`,
  )
  .join("\n")}
</table>`;

  return { text, html };
}

export async function sendLeadNotification(
  lead: LeadDocument,
): Promise<EmailResult> {
  const to = process.env.LEADS_NOTIFY_TO?.trim();
  const from = process.env.LEADS_NOTIFY_FROM?.trim();

  if (!to || !from) {
    return {
      status: "skipped",
      reason: "LEADS_NOTIFY_TO / LEADS_NOTIFY_FROM are not set",
    };
  }

  const { text, html } = bodyFor(lead);
  const subject = subjectFor(lead);

  const resendKey = process.env.RESEND_API_KEY?.trim();

  if (!resendKey) {
    // No provider configured. Log it so a local run still shows the payload,
    // and report `skipped` so the document records that nobody was told.
    console.info("[lead] notification not sent (no provider)\n%s", text);
    return { status: "skipped", reason: "no email provider configured" };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: to.split(",").map((address) => address.trim()),
        // So hitting reply in the inbox writes to the lead, not to us.
        reply_to: lead.email,
        subject,
        text,
        html,
      }),
      // A slow mail API must not hold the request open.
      signal: AbortSignal.timeout(8_000),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      return {
        status: "failed",
        reason: `resend responded ${response.status} ${detail}`.trim(),
      };
    }

    const payload = (await response.json().catch(() => ({}))) as {
      id?: string;
    };
    return { status: "sent", id: payload.id };
  } catch (error) {
    return {
      status: "failed",
      reason: error instanceof Error ? error.message : String(error),
    };
  }
}
