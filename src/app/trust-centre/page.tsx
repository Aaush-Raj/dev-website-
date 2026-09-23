import type { Metadata } from "next";

import { Logo } from "@/components/layout/Logo";
import { DocumentLibrary } from "@/components/trust-centre/DocumentLibrary";
import { SignOutButton } from "@/components/trust-centre/SignOutButton";
import { trustCentreListing } from "@/lib/trust-centre/catalogue";
import { requireTrustCentreSession } from "@/lib/trust-centre/guard";

/**
 * TRUST CENTRE — DOCUMENT LIBRARY
 * ---------------------------------------------------------------------------
 * The authenticated view: the catalogue, searchable and filterable.
 *
 * A SERVER COMPONENT THAT CHECKS ITS OWN SESSION
 * Proxy already redirected unauthenticated traffic, but this calls
 * `requireTrustCentreSession()` as its first statement regardless. That is the
 * real boundary — see guard.ts. `redirect()` throws, so nothing below it can
 * run for a signed-out visitor, and no catalogue data is ever assembled for
 * one.
 */

export const metadata: Metadata = {
  title: "Lurny Trust Centre",
  robots: { index: false, follow: false, nocache: true },
};

/** Reads cookies, so it can never be prerendered or cached. */
export const dynamic = "force-dynamic";

export default async function TrustCentrePage() {
  const session = await requireTrustCentreSession();

  // Metadata only — `trustCentreListing()` strips every storage key before
  // this crosses to the client.
  const documents = trustCentreListing();

  const expires = new Date(session.exp * 1000).toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border-subtle bg-surface-raised">
        <div className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-4 px-6 py-3.5">
          <div className="flex items-center gap-3">
            {/* Static: inside the portal the logo is identity, not a way out
                to the marketing site. */}
            <Logo variant="wordmark" asStatic priority className="h-6" />
            <span className="text-sm font-semibold text-text-secondary">
              Trust Centre
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <span className="text-xs text-text-tertiary">
              Signed in as{" "}
              <strong className="text-text-primary">{session.account}</strong>{" "}
              &middot; session expires {expires}
            </span>
            <SignOutButton />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1320px] px-6 pt-7 pb-16">
        <div className="mb-6 rounded-xl bg-surface-brand-subtle px-5 py-4">
          <h1 className="font-display text-lg font-bold text-text-primary">
            Policies and due-diligence documents
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            These documents are approved by Lurny management. They are provided
            for your review under the terms of your agreement with Lurny and
            should not be redistributed. Downloads are logged.
          </p>
        </div>

        <DocumentLibrary documents={documents} />
      </main>
    </>
  );
}
