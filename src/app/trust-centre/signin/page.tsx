import type { Metadata } from "next";

import { Logo } from "@/components/layout/Logo";
import { SignInForm } from "@/components/trust-centre/SignInForm";

/**
 * TRUST CENTRE — SIGN-IN PAGE
 * ---------------------------------------------------------------------------
 * The portal's front door. Deliberately says as little as possible: it names
 * the service and asks for a credential. No document titles, no client names,
 * no hint about what is inside.
 */

export const metadata: Metadata = {
  title: "Sign in · Lurny Trust Centre",
  description: "Secure access to Lurny's policies and due-diligence materials.",
  /* Keeps the portal out of search results entirely. The gate already stops a
     crawler reading anything, but an indexed sign-in page is an invitation. */
  robots: { index: false, follow: false, nocache: true },
};

/** Reads searchParams, so it must render per request. */
export const dynamic = "force-dynamic";

export default async function TrustCentreSignInPage({
  searchParams,
}: {
  // Next 16: searchParams is a Promise.
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  /*
   * OPEN REDIRECT GUARD.
   *
   * `next` comes from the query string, so it is attacker-controlled: a link
   * to /trust-centre/signin?next=https://evil.example would otherwise bounce
   * someone to another site immediately after they authenticate — a credible
   * phishing hop, because the sign-in itself was genuine.
   *
   * Only a same-site absolute path survives. "//evil.example" is rejected
   * explicitly: browsers read a protocol-relative URL as another origin, so
   * checking only for a leading "/" would let it through.
   */
  const safeNext =
    next && next.startsWith("/") && !next.startsWith("//") ? next : undefined;

  return (
    <main className="flex min-h-screen items-center justify-center bg-surface-brand-subtle px-6 py-12">
      <div className="w-full max-w-md rounded-2xl bg-surface-raised p-8 shadow-lg sm:p-9">
        {/* The real brand lockup, not a text stand-in. `asStatic` renders the
            image without its link wrapper: a signed-out visitor here has no
            session, and a logo that navigates away from the only way back in
            is a dead end rather than a convenience. */}
        <Logo variant="wordmark" asStatic priority className="h-7" />

        <h1 className="mt-5 font-display text-2xl font-bold text-text-primary">
          Trust Centre
        </h1>

        <p className="mt-2 text-sm text-text-secondary">
          Secure access to Lurny&rsquo;s policies, security documents and
          due-diligence materials.
        </p>

        <p className="mt-5 rounded-lg bg-surface-subtle px-3 py-2.5 text-xs text-text-secondary">
          Access is restricted to authorised people. Sign in using your approved
          account and password.
        </p>

        <div className="mt-6">
          <SignInForm next={safeNext} />
        </div>

        <p className="mt-6 text-xs text-text-tertiary">
          Need access? Contact your Lurny representative. Access to this portal
          is logged.
        </p>
      </div>
    </main>
  );
}
