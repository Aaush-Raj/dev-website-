import type { NextConfig } from "next";

/**
 * NEXT.JS CONFIGURATION
 * ---------------------------------------------------------------------------
 * Tuned for a static marketing site: no backend, maximum crawlability,
 * strong default security headers.
 */

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

  // Emit /about/ rather than /about — one canonical form, so a trailing-slash
  // variant never competes with itself in the index.
  trailingSlash: false,

  images: {
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
   * Security headers.
   *
   * NOTE: these apply to `next start` and Vercel. A pure static export
   * (`output: "export"` behind a plain CDN) ignores them — configure the
   * equivalents at the CDN if you go that route.
   */
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Block MIME-type sniffing.
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Disallow framing — clickjacking protection.
          { key: "X-Frame-Options", value: "DENY" },
          // Send the origin only on cross-origin requests.
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // Deny powerful APIs this site has no use for.
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          // Force HTTPS for two years, subdomains included.
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
