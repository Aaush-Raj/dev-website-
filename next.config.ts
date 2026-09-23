import type { NextConfig } from "next";

/**
 * NEXT.JS CONFIGURATION
 * ---------------------------------------------------------------------------
 * Server-rendered (standalone) so the Trust Centre can authenticate. Tuned
 * for maximum crawlability on the marketing pages and strong security headers
 * on every response.
 */

const nextConfig: NextConfig = {
  /**
   * SERVER-RENDERED, NOT A STATIC EXPORT.
   *
   * This site used `output: "export"` while it was purely marketing pages.
   * The Trust Centre (/trust-centre) ended that: a real credential check needs
   * httpOnly cookies, Proxy and Route Handlers, and Next's static export
   * supports none of them — anything built under it would ship the credential
   * and the documents to the browser, which for due-diligence material is
   * worse than having no portal.
   *
   * `standalone` traces only the files the server actually needs into
   * .next/standalone, so the runtime image stays small (see Dockerfile).
   *
   * Consequence worth knowing: security headers are live again via
   * `headers()` below, and the previously inert /api/lead route now serves.
   */
  output: "standalone",

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

  // Emit /about/ rather than /about — one canonical form, so a trailing-slash
  // variant never competes with itself in the index.
  trailingSlash: false,

  images: {
    // Assets under public/assets are already hand-optimised WebP, and the
    // optimiser would only re-encode them at runtime cost. Left on so this
    // stays true regardless of the now-available optimisation server.
    unoptimized: true,
    // AVIF first (smallest), WebP fallback. Next negotiates per request.
    formats: ["image/avif", "image/webp"],
    // Widths generated for responsive srcset. Trimmed to realistic breakpoints
    // to keep build time and cache size down.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Long cache — filenames are content-hashed, so this is safe.
    minimumCacheTTL: 31_536_000,
  },

  // Strip the framework fingerprint.
  poweredByHeader: false,

  // Gzip/brotli at the edge in production; harmless locally.
  compress: true,

  /**
   * SECURITY HEADERS
   *
   * These were unreachable under `output: "export"` and lived only in
   * nginx.conf. Now that Next serves the traffic they are declared here, at
   * the application, so they hold wherever it runs — including `next start`
   * locally, where there is no nginx at all. nginx keeps its own copy as
   * defence in depth for the static files it serves directly.
   */
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
      {
        /*
         * The Trust Centre is credentialed and must never be cached by a
         * proxy, a CDN or the browser's back/forward cache: a signed-out
         * person pressing Back must not be shown the document library from
         * cache. `no-store` is the only directive that guarantees that.
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
