import type { Metadata } from "next";

import { absoluteUrl, siteConfig } from "@/lib/site";

/**
 * SEO HELPERS
 * ---------------------------------------------------------------------------
 * Wraps Next's Metadata API so every page gets correct canonical, Open Graph
 * and Twitter tags without repeating the boilerplate.
 *
 * Usage in a page:
 *
 *   export const metadata = buildMetadata({
 *     title: "Pricing",
 *     description: "Simple plans that scale with your team.",
 *     path: "/pricing",
 *   });
 */

interface BuildMetadataOptions {
  /** Page title WITHOUT the brand suffix — the template appends it. */
  title?: string;
  /** Page-specific description. Falls back to the site default. */
  description?: string;
  /** Site-relative path, used for the canonical URL. e.g. "/pricing" */
  path?: string;
  /** Site-relative OG image path. Falls back to the site default. */
  image?: string;
  /** Set true on pages that should stay out of the index (thank-you pages…). */
  noIndex?: boolean;
  /** Extra keywords appended to the defaults. */
  keywords?: string[];
}

export function buildMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  image = siteConfig.ogImage,
  noIndex = false,
  keywords = [],
}: BuildMetadataOptions = {}): Metadata {
  const url = absoluteUrl(path);
  const ogImageUrl = absoluteUrl(image);

  // The homepage uses the brand + tagline; sub-pages get "Page | eLurny"
  // via the template declared in the root layout.
  const resolvedTitle = title ?? `${siteConfig.name} — ${siteConfig.tagline}`;

  return {
    title: resolvedTitle,
    description,
    keywords: keywords.length ? keywords : undefined,

    // Canonical prevents duplicate-content dilution across query-string and
    // trailing-slash variants of the same page.
    alternates: {
      canonical: url,
    },

    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      url,
      title: resolvedTitle,
      description,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} — ${siteConfig.tagline}`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      site: siteConfig.twitterHandle,
      creator: siteConfig.twitterHandle,
      title: resolvedTitle,
      description,
      images: [ogImageUrl],
    },

    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}
