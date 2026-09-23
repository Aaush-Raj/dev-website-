import type { ReactNode } from "react";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  organizationSchema,
  softwareApplicationSchema,
  webSiteSchema,
} from "@/lib/structured-data";

/**
 * MARKETING SITE LAYOUT
 * ---------------------------------------------------------------------------
 * Header, footer, skip link and site-wide JSON-LD for every public page.
 *
 * This used to be the root layout. It was moved into the `(site)` route group
 * when the Trust Centre arrived: a layout applies to everything beneath it and
 * cannot be opted out of, so a credentialed portal nested under it would
 * always render the marketing nav, the mega-menu and the demo CTAs around the
 * document library.
 *
 * `(site)` is a ROUTE GROUP — the parentheses mean it does not appear in any
 * URL. /platform is still /platform. The only change is which layout wraps it.
 */

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Keyboard users can jump past the nav straight to the content. */}
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <Header />

      <main id="main" className="flex-1">
        {children}
      </main>

      <Footer />

      {/* Site-wide structured data, present in the initial HTML. */}
      <JsonLd
        schema={[
          organizationSchema(),
          webSiteSchema(),
          softwareApplicationSchema(),
        ]}
      />
    </>
  );
}
