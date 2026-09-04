import type { MetadataRoute } from "next";

// Required for `output: "export"` — metadata routes must opt in to static.
export const dynamic = "force-static";

import { absoluteUrl, siteConfig } from "@/lib/site";

/**
 * ROBOTS.TXT
 * ---------------------------------------------------------------------------
 * Generates /robots.txt at build time.
 *
 * AI crawlers are explicitly allowed. For a product site, being cited by
 * ChatGPT / Claude / Perplexity is a distribution channel, not a threat —
 * blocking them removes the site from answers people actually read. Flip the
 * `disallow` on individual agents below if that position ever changes.
 */

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Next internals and any future API routes carry no SEO value.
        disallow: ["/api/", "/_next/static/chunks/"],
      },
      // Named AI crawlers — listed explicitly so the intent is unambiguous
      // and easy to reverse.
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-Web", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteConfig.url,
  };
}
