import type { NextConfig } from "next";

/**
 * NEXT.JS CONFIGURATION
 * ---------------------------------------------------------------------------
 * Tuned for a marketing site with a backend: maximum crawlability on the
 * public pages, strong default security headers, and a credentialed document
 * portal at /trust-centre that must never be cached (see `headers()`).
 *
 * The site runs as a Node server (`next start`, port 3000 — see Dockerfile).
 * It used to be a static export (`output: "export"`) served by nginx; that
 * was removed on 2026-09-23 so API routes are emitted and the lead forms can
 * store submissions in MongoDB and send notifications.
 */

// Long-lived cache for immutable, content-hashed or hand-optimised assets.
const ONE_YEAR = 31_536_000;
const ONE_WEEK = 604_800;

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  // Pin the workspace root. Without this, Turbopack walks up the directory
  // tree and can latch onto an unrelated lockfile in a parent folder.
  turbopack: {
    root: __dirname,
  },

  // Fail the production build on type errors rather than shipping them.
  // (Next 16 no longer runs ESLint during `next build` — `npm run check` does.)
  typescript: {
    ignoreBuildErrors: false,
  },

  /**
   * Hosts allowed to reach the DEV server's internal assets.
   *
   * Next 16 rejects requests for /_next/* with a 403 when the forwarded host
   * is not the one the dev server is bound to. Tunnelling `next dev` through
   * ngrok, Cloudflare Tunnel or a LAN IP therefore serves the HTML but blocks
   * every JS chunk, so React never hydrates and the page renders blank.
   *
   * Wildcards cover the ephemeral subdomain these services hand out on each
   * restart. Add your own tunnel host here if it is not listed.
   *
   * DEV ONLY — this has no effect on `next build` / `next start`, where the
   * assets are served without an origin check.
   */
  allowedDevOrigins: [
    "*.ngrok-free.app",
    "*.ngrok.io",
    "*.ngrok.app",
    "*.trycloudflare.com",
    "*.loca.lt",
    // Local network testing, e.g. a phone on the same Wi-Fi.
    "192.168.0.0/16",
    "10.0.0.0/8",
  ],

  // Emit /about rather than /about/ — one canonical form, so a trailing-slash
  // variant never competes with itself in the index. `next start` 308s the
  // other form to this one.
  trailingSlash: false,

  images: {
    // Assets are already hand-optimised WebP under public/assets, so serve
    // them as-is rather than running the optimisation server (which would
    // also need `sharp` in the runtime image).
    unoptimized: true,
    // AVIF first (smallest), WebP fallback. Next negotiates per request.
    formats: ["image/avif", "image/webp"],
    // Widths generated for responsive srcset. Trimmed to realistic breakpoints
    // to keep build time and cache size down.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Long cache — filenames are content-hashed, so this is safe.
    minimumCacheTTL: ONE_YEAR,
  },

  // Strip the framework fingerprint.
  poweredByHeader: false,

  // Gzip at the edge in production; harmless locally.
  compress: true,

  /**
   * Response headers. These replace what nginx.conf used to add when the site
   * was a static export. /_next/static/* is already served immutable by Next.
   */
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        // Hand-optimised images and fonts under public/. Not content-hashed,
        // so a week rather than a year.
        source: "/:path*.(avif|webp|png|jpg|jpeg|gif|svg|ico|woff|woff2)",
        headers: [
          { key: "Cache-Control", value: `public, max-age=${ONE_WEEK}` },
        ],
      },
      {
        /*
         * The Trust Centre is credentialed and must never be cached — not by
         * a CDN, a proxy, or the browser's back/forward cache. A signed-out
         * person pressing Back must not be shown the document library from
         * cache, and a shared cache must never hand one reviewer's page to
         * the next visitor. `no-store` is the only directive that guarantees
         * both.
         */
        source: "/trust-centre/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate, max-age=0",
          },
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
        ],
      },
    ];
  },
};

export default nextConfig;
