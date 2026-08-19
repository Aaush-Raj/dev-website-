import type { Metadata, Viewport } from "next";
import { Inter_Tight, JetBrains_Mono } from "next/font/google";
import type { ReactNode } from "react";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import {
  organizationSchema,
  softwareApplicationSchema,
  webSiteSchema,
} from "@/lib/structured-data";
import "@/styles/globals.css";

/**
 * ROOT LAYOUT
 * ---------------------------------------------------------------------------
 * The site shell: fonts, default metadata, site-wide JSON-LD, header, footer.
 *
 * TODO(design): replace Inter/Sora with the real brand typefaces once the
 * Figma designs land. next/font self-hosts them at build time — no runtime
 * request to Google, and no layout shift.
 */

/**
 * Inter Tight — the closest freely-available match to the display face in the
 * hero design: a grotesque with tight default tracking and near-circular
 * bowls. Used for both body and headings, which is what the design does.
 */
const fontSans = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-sans-src",
  display: "swap",
});

const fontDisplay = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-display-src",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

/** Eyebrow labels — the design sets them in a wide-tracked monospace. */
const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-src",
  display: "swap",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  // metadataBase resolves every relative URL in metadata to an absolute one,
  // which Open Graph and Twitter cards require.
  metadataBase: new URL(siteConfig.url),

  // "%s" is replaced by each page's own title; the homepage overrides this
  // with `absolute` so it does not get the suffix twice.
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },

  ...buildMetadata(),

  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,

  // Stops iOS Safari turning numbers in copy into phone links.
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Do NOT set maximumScale or userScalable: false — blocking pinch-zoom is
  // an accessibility failure (WCAG 1.4.4).
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang={siteConfig.lang}
      className={`${fontSans.variable} ${fontDisplay.variable} ${fontMono.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-dvh flex-col">
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
      </body>
    </html>
  );
}
