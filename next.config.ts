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
