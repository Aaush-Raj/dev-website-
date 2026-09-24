import { ComingSoon } from "@/components/sections/not-found/ComingSoon";
import { buildMetadata } from "@/lib/seo";

/**
 * 404 INSIDE THE MARKETING SITE
 * ---------------------------------------------------------------------------
 * Handles `notFound()` thrown from a route under the (site) group. The (site)
 * layout already wraps it in the header and footer, so only the body renders
 * here.
 *
 * THIS FILE DOES NOT CATCH UNKNOWN URLS. A not-found.tsx inside a route group
 * only serves `notFound()` calls beneath it; a URL that matches no route at
 * all is served by app/not-found.tsx at the ROOT, and nothing lower. That is
 * the whole reason the root file exists — see the note there.
 *
 * The HTTP status is 404 either way; only the wording is "coming soon", which
 * matters: search engines and link checkers still see the correct signal.
 * noIndex: a 404 must never enter the search index.
 */

export const metadata = buildMetadata({
  title: "Coming soon",
  path: "/404",
  noIndex: true,
});

export default function NotFound() {
  return <ComingSoon />;
}
