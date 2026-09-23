import { auditContext, recordTrustCentreEvent } from "@/lib/trust-centre/audit";
import { isBlobConfigured, signBlobDownloadUrl } from "@/lib/trust-centre/blob";
import { findTrustCentreDocument } from "@/lib/trust-centre/catalogue";
import { getTrustCentreSession } from "@/lib/trust-centre/guard";

/**
 * GET /api/trust-centre/download/[id]
 * ---------------------------------------------------------------------------
 * Releases one document to a signed-in reviewer.
 *
 * WHAT THIS DELIBERATELY DOES NOT DO
 * It does not accept a path, a filename or a URL. It accepts a CATALOGUE ID
 * and looks the storage key up in a fixed, server-side table. That is what
 * makes path traversal structurally impossible rather than merely filtered:
 * there is no user-controlled string anywhere near the blob name, so
 * "../../other-container/secrets" resolves to no catalogue entry and 404s.
 *
 * THE SESSION IS RE-CHECKED HERE
 * Proxy already gated this path. It is checked again because this is where the
 * documents actually leave — see `guard.ts`. If the matcher were ever changed,
 * this route still refuses.
 *
 * REDIRECT, NOT PROXY
 * We answer 302 to a 5-minute SAS URL instead of streaming the bytes. Azure
 * serves the file; our server holds no document in memory and spends no
 * bandwidth. The URL is useless to anyone it is forwarded to minutes later.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  // Next 16: dynamic route params arrive as a Promise and must be awaited.
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getTrustCentreSession();
  const context = auditContext(request.headers);

  if (!session) {
    return Response.json(
      { ok: false, error: "Not signed in." },
      { status: 401 },
    );
  }

  const { id } = await params;
  const document = findTrustCentreDocument(id);

  /*
   * Unknown id and not-yet-uploaded document answer identically. A distinct
   * "exists but has no file" would let a signed-in party enumerate which
   * documents are pending, which is not theirs to know.
   */
  if (!document?.blobName) {
    void recordTrustCentreEvent({
      event: "document.denied",
      at: new Date(),
      account: session.account,
      documentId: id.slice(0, 40),
      detail: document ? "no_file" : "unknown_id",
      ...context,
    });

    return Response.json(
      { ok: false, error: "Document not available." },
      { status: 404 },
    );
  }

  if (!isBlobConfigured()) {
    console.error("[trust-centre] storage not configured; cannot serve %s", id);
    return Response.json(
      { ok: false, error: "Document storage is temporarily unavailable." },
      { status: 503 },
    );
  }

  let signed: { url: string; expiresAt: Date };

  try {
    // Saved under the human-readable title, not the storage key, so a
    // reviewer's downloads folder reads as documents rather than filenames.
    const extension = document.blobName.split(".").pop() ?? "docx";
    signed = signBlobDownloadUrl(
      document.blobName,
      `${document.id} ${document.title}.${extension}`,
    );
  } catch (error) {
    console.error("[trust-centre] could not sign download for %s", id, error);
    return Response.json(
      { ok: false, error: "Document storage is temporarily unavailable." },
      { status: 503 },
    );
  }

  // Awaited, not fire-and-forget: for a document release the audit entry is
  // part of the transaction. A few ms is worth a complete trail.
  await recordTrustCentreEvent({
    event: "document.download",
    at: new Date(),
    account: session.account,
    documentId: document.id,
    ...context,
  });

  return Response.redirect(signed.url, 302);
}
