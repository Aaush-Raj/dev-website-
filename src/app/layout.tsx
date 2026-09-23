import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";

import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import "@/styles/globals.css";

/**
 * ROOT LAYOUT
 * ---------------------------------------------------------------------------
 * ONLY the <html>/<body> shell, fonts and default metadata.
 *
 * The header, footer and site-wide JSON-LD deliberately live one level down,
 * in the (site) route group, NOT here. The Trust Centre is a credentialed
 * portal that must not render the marketing chrome, and a layout cannot be
 * opted out of — so the chrome belongs to the group that wants it rather than
 * to every route. See src/app/(site)/layout.tsx.
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
/*
 * FONTS ARE SELF-HOSTED (src/app/fonts/*.woff2) via next/font/local.
 * They are the exact latin-subset variable files Google Fonts serves, so the
 * rendered result is identical to next/font/google — but the build no longer
 * fetches fonts.googleapis.com, which failed intermittently in CI (Turbopack:
 * "next/font/google queries have exactly one entry"; webpack: "Cannot read
 * properties of null (reading '1')" in the google loader) on 2026-09-23.
 * To update a face, fetch the CSS from fonts.googleapis.com/css2 with a
 * woff2-capable User-Agent and download the `latin` src URL.
 */
const fontSans = localFont({
  src: "./fonts/inter-tight-latin.woff2",
  weight: "100 900",
  variable: "--font-sans-src",
  display: "swap",
});

const fontDisplay = localFont({
  src: "./fonts/inter-tight-latin.woff2",
  weight: "100 900",
  variable: "--font-display-src",
  display: "swap",
});

/**
 * Playfair Display — the high-contrast transitional serif used for the
 * dark-section headings. Sharp bracketed serifs and vertical stress, matching
 * the design's display face.
 */
const fontSerif = localFont({
  src: "./fonts/playfair-display-latin.woff2",
  weight: "400 900",
  variable: "--font-serif-src",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

/**
 * Caveat — the handwriting face used for the annotations that sit outside
 * product diagrams (the frontline hero's loop is the first to use it). The
 * designs draw these as marker-pen notes, and a slanted sans reads as emphasis
 * rather than as a hand-written aside.
 */
const fontHand = localFont({
  src: "./fonts/caveat-latin.woff2",
  weight: "400 700",
  variable: "--font-hand-src",
  display: "swap",
});

/**
 * Newsreader — the editorial serif the Insights articles are set in. Their
 * designs use it for headings AND for body prose, which is why it needs the
 * 400 weight at a reading size rather than only display sizes. Italic is
 * loaded because the closing definition sets phrases in it.
 */
const fontReading = localFont({
  src: [
    {
      path: "./fonts/newsreader-latin.woff2",
      weight: "200 800",
      style: "normal",
    },
    {
      path: "./fonts/newsreader-italic-latin.woff2",
      weight: "200 800",
      style: "italic",
    },
  ],
  variable: "--font-reading-src",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

/**
 * Plus Jakarta Sans — the UI face in the Insights article designs: the
 * eyebrows, the rail, the player controls and every label around the prose.
 * It sits beside Newsreader rather than replacing the site's Inter Tight,
 * which still sets the rest of the site.
 */
const fontArticle = localFont({
  src: "./fonts/plus-jakarta-sans-latin.woff2",
  weight: "200 800",
  variable: "--font-article-src",
  display: "swap",
});

/** Eyebrow labels — the design sets them in a wide-tracked monospace. */
const fontMono = localFont({
  src: "./fonts/jetbrains-mono-latin.woff2",
  weight: "100 800",
  variable: "--font-mono-src",
  display: "swap",
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
      className={`${fontSans.variable} ${fontDisplay.variable} ${fontSerif.variable} ${fontMono.variable} ${fontHand.variable} ${fontReading.variable} ${fontArticle.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-dvh flex-col">{children}</body>
    </html>
  );
}
