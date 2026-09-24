import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ComingSoon } from "@/components/sections/not-found/ComingSoon";
import { buildMetadata } from "@/lib/seo";

/**
 * THE GLOBAL 404
 * ---------------------------------------------------------------------------
 * Served for every URL that matches no route. Next only looks for this file at
 * the ROOT of app/ — a not-found.tsx inside a route group handles `notFound()`
 * calls beneath it and nothing else.
 *
 * WHY IT WENT MISSING, so it is not lost again: this file used to be the only
 * one. When the Trust Centre arrived (2026-09-23) the marketing pages moved
 * into the `(site)` route group so the portal could opt out of their layout —
 * and not-found.tsx went with them. From that moment an unknown URL fell
 * through to Next's built-in "This page could not be found", with no site
 * header, while the coming-soon page sat one level too deep to be reached.
 *
 * THE CHROME IS DRAWN HERE BY HAND. The root layout is only the <html>/<body>
 * shell; the header, footer and skip link live in the (site) layout, which
 * this file sits outside of. So the same three pieces are composed here so
 * the page looks like the rest of the site. Site-wide JSON-LD is left out on
 * purpose — a noIndex 404 should not advertise structured data.
 *
 * The HTTP status is 404; only the wording is "coming soon". noIndex: a 404
 * must never enter the search index.
 */

export const metadata = buildMetadata({
  title: "Coming soon",
  path: "/404",
  noIndex: true,
});

export default function NotFound() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <Header />

      <main id="main" className="flex-1">
        <ComingSoon />
      </main>

      <Footer />
    </>
  );
}
