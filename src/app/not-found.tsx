import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

/**
 * 404 PAGE
 * ---------------------------------------------------------------------------
 * Framed as "we're building this" rather than "not found", because that is the
 * truth while the site is in progress: roughly twenty routes are linked from
 * the header and footer but not yet built, so almost every 404 a visitor hits
 * today is an unwritten page rather than a broken link or a typo.
 *
 * The suggestion list below is therefore the useful part — it points at pages
 * that DO exist, so someone who lands here has somewhere to go.
 *
 * TODO(copy): revert to plain not-found language once the page inventory is
 * complete. The wording here would be actively misleading on a finished site,
 * where a 404 really would mean a bad link. Keep the `suggestions` list in
 * step with the routes as they land.
 *
 * The HTTP status is still 404 — this is Next's not-found page and the status
 * comes from the framework. Only the wording changes, which matters: search
 * engines and link checkers still see the correct signal.
 *
 * noIndex: a 404 must never enter the search index.
 */

export const metadata = buildMetadata({
  title: "Coming soon",
  path: "/404",
  noIndex: true,
});

/**
 * Pages that exist today. Kept short and hand-picked rather than generated —
 * a visitor who lands here needs three or four good options, not a sitemap.
 */
const suggestions = [
  { label: "Platform", href: "/platform/pulse" },
  { label: "Solutions", href: "/solutions" },
  { label: "Industries", href: "/industries" },
  { label: "Campus", href: "/campus" },
  { label: "Resources", href: "/resources" },
] as const;

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden bg-surface-base">
      {/* A soft violet bloom, matching the quiet treatment the other utility
          surfaces use. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(42rem 32rem at 50% 0%, rgb(124 58 217 / 0.10), transparent 68%)",
        }}
      />

      <Container width="narrow" className="py-section-lg text-center">
        <p
          className={cn(
            "font-mono text-[0.6875rem] font-medium uppercase",
            "tracking-[0.16em] text-brand-600 sm:text-xs",
          )}
        >
          {/* Deliberately NOT "Coming soon" — the headline below says that,
              and an eyebrow echoing it word for word reads as a stutter. This
              labels the state instead. */}
          In progress
        </p>

        <h1
          className={cn(
            "mt-6 font-display font-bold tracking-[-0.03em]",
            "leading-[1.1] text-text-primary",
            "text-[2rem] sm:text-[2.5rem] xl:text-[3rem]",
          )}
        >
          This page is coming soon
        </h1>

        <p
          className={cn(
            "mx-auto mt-6 max-w-124 leading-relaxed text-pretty",
            "text-[1.0625rem] text-text-secondary sm:text-lg",
          )}
        >
          We&rsquo;re building it now. In the meantime, here is what is ready to
          explore — or tell us what you were looking for and we will point you
          to it.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button href="/" size="lg">
            Back to home
          </Button>
          <Button href="/demo" size="lg" variant="outline">
            Book a demo
          </Button>
        </div>

        {/* ------------------------- Suggestions ------------------------- */}
        <div className="mt-14 border-t border-border-subtle pt-10">
          <p className="text-[0.875rem] font-semibold text-text-primary">
            Available now
          </p>

          <ul className="mt-5 flex flex-wrap items-center justify-center gap-3">
            {suggestions.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "inline-flex items-center rounded-full px-5 py-2.5",
                    "border border-border-default bg-surface-raised",
                    "text-[0.9375rem] font-medium text-text-primary",
                    "duration-normal transition-[background-color,border-color,translate] ease-out",
                    "will-change-[translate]",
                    "hover:-translate-y-0.5 hover:border-border-strong",
                    "hover:bg-interactive-neutral",
                    "focus-visible:ring-2 focus-visible:ring-focus-ring/50 focus-visible:outline-none",
                    "active:translate-y-0",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
