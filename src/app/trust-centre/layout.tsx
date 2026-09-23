import type { ReactNode } from "react";

/**
 * TRUST CENTRE — LAYOUT
 * ---------------------------------------------------------------------------
 * The portal deliberately does NOT inherit the marketing site's header,
 * footer, mega-menu or cookie banner.
 *
 * Those are wrapped around the site in the root layout; this segment renders
 * its own shell instead. That is a product decision as much as a technical
 * one: someone here is reviewing compliance documents on behalf of a client,
 * and a nav bar full of pricing and demo CTAs is noise at best. It also keeps
 * the authenticated surface small — no marketing component, analytics tag or
 * third-party embed runs inside the credentialed area.
 *
 * NOTE: the root layout still wraps this (Next nests layouts, and the <html>
 * element lives there). The header and footer are rendered by the root layout,
 * so they are hidden for this segment via the `data-trust-centre` attribute
 * below — see globals.css.
 */

export default function TrustCentreLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div data-trust-centre="" className="min-h-screen bg-surface-base">
      {children}
    </div>
  );
}
