/**
 * SITE CONFIGURATION
 * ---------------------------------------------------------------------------
 * Single source of truth for site-wide constants: identity, URLs, social
 * handles, navigation. Consumed by metadata, JSON-LD, sitemap, robots, header
 * and footer — so a change here propagates everywhere.
 *
 * TODO(content): replace the placeholder copy once the real positioning and
 * page inventory are confirmed.
 */

/**
 * Resolve the canonical origin from the environment, falling back to the
 * production domain.
 *
 * Deliberately stricter than `??`: an env var that is present but empty (a
 * Vercel variable saved with no value) is not `undefined`, so `??` passes the
 * empty string straight through and `new URL("")` throws at module evaluation
 * — which fails the build during page-data collection rather than at runtime.
 * A malformed value is rejected the same way, since a bad origin would
 * silently poison every canonical URL, OG tag and sitemap entry.
 */
function resolveSiteUrl(): string {
  const fallback = "https://elurny.com";
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return fallback;

  // Vercel exposes VERCEL_URL without a scheme; tolerate that shape generally.
  const candidate = /^https?:\/\//.test(raw) ? raw : `https://${raw}`;

  try {
    return new URL(candidate).origin;
  } catch {
    return fallback;
  }
}

export const siteConfig = {
  /** Legal / brand name, used in JSON-LD and the <title> suffix. */
  name: "eLurny",

  /** Short tagline. Keep under ~60 chars — it appears in the homepage title. */
  tagline: "Capability that shows up in performance",

  /**
   * Default meta description. 150-160 characters is the sweet spot: long
   * enough to be informative, short enough that Google will not truncate it.
   */
  description:
    "Lurny connects role expectations, learning, practice, real-work evidence and action intelligence—so leaders can see where capability stands and what to improve next.",

  /**
   * Canonical origin, no trailing slash. Every absolute URL in metadata,
   * sitemap and JSON-LD is derived from this.
   *
   * Set NEXT_PUBLIC_SITE_URL in the deployment environment. The fallback keeps
   * local development and preview builds working.
   */
  url: resolveSiteUrl(),

  /** Default Open Graph image, relative to /public. 1200x630. */
  ogImage: "/assets/images/og-default.png",

  /** BCP 47 locale. */
  locale: "en_US",
  lang: "en",

  /**
   * Social profiles — also emitted as `sameAs` in Organization JSON-LD.
   * `icon` selects a mark from components/layout/SocialIcons.tsx.
   *
   * TODO(content): confirm each handle before launch.
   */
  socials: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/lurny",
      icon: "linkedin",
    },
    { label: "X", href: "https://x.com/lurny", icon: "x" },
    {
      label: "YouTube",
      href: "https://www.youtube.com/@lurny",
      icon: "youtube",
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/lurny",
      icon: "instagram",
    },
  ],

  /** Twitter handle for the twitter:site card tag. Include the @. */
  twitterHandle: "@elurny",

  /** Contact address surfaced in the footer and in JSON-LD. */
  email: "hello@lurny.ai",
} as const;

export type SiteConfig = typeof siteConfig;

/**
 * Build an absolute URL from a site-relative path.
 * Required for OG tags, canonicals and sitemap entries — relative URLs are
 * not valid in any of those contexts.
 */
export function absoluteUrl(path = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalized}`;
}
