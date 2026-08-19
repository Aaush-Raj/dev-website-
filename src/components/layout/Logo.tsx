import Link from "next/link";

import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * LOGO
 * ---------------------------------------------------------------------------
 * The eLurny wordmark, rebuilt as inline SVG from the design.
 *
 * It is drawn rather than set in a typeface because the letterforms are custom
 * geometry — every glyph is composed of squared-off rectangles with a uniform
 * 4-unit stroke, and the R/N are reduced to a bracket form with no leg or
 * diagonal. No font reproduces that.
 *
 * Inline SVG (rather than an <img>) buys three things:
 *   - it inherits currentColor, so the mark can be recoloured per surface
 *   - no extra network request, and no flash of missing logo
 *   - it stays crisp at any size and on any pixel density
 *
 * Geometry is on a 175x24 viewBox, matching the proportions measured from the
 * source PNG (amber bars 28x5 with 4 gaps; wordmark 147x23; stroke 4).
 */

interface LogoProps {
  className?: string;
  /** Where the logo links to. Defaults to home. */
  href?: string;
  /**
   * Render the mark only, without the link wrapper — for use inside another
   * anchor (e.g. the footer) where nesting links would be invalid HTML.
   */
  asStatic?: boolean;
}

function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 186 24"
      role="img"
      aria-label={`${siteConfig.name} logo`}
      className={cn("h-6 w-auto", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Three amber bars — the "e" of eLurny, reduced to a glyph. */}
      <g fill="var(--accent-400)">
        <rect x="0" y="0" width="28" height="5" rx="0.5" />
        <rect x="0" y="9.5" width="28" height="5" rx="0.5" />
        <rect x="0" y="19" width="28" height="5" rx="0.5" />
      </g>

      {/* LURNY — each glyph built from rectangles on a 4-unit stroke. */}
      <g fill="var(--brand-600)">
        {/* L — stem + foot */}
        <rect x="40" y="0" width="4" height="24" />
        <rect x="40" y="20" width="22" height="4" />

        {/* U — two stems joined by a foot */}
        <rect x="70" y="0" width="4" height="24" />
        <rect x="70" y="20" width="26" height="4" />
        <rect x="92" y="0" width="4" height="24" />

        {/* R — bracket form: head + stem, no leg */}
        <rect x="104" y="0" width="4" height="24" />
        <rect x="104" y="0" width="22" height="4" />
        <rect x="122" y="0" width="4" height="10" />

        {/* N — bracket form: head + two stems */}
        <rect x="134" y="0" width="4" height="24" />
        <rect x="134" y="0" width="22" height="4" />
        <rect x="152" y="0" width="4" height="24" />

        {/* Y — squared 'y': short left stem, full right stem, joined by a
            foot bar. Matches the design, where the left stroke stops at the
            crossbar rather than running the full height. */}
        <rect x="164" y="0" width="4" height="14" />
        <rect x="182" y="0" width="4" height="24" />
        <rect x="164" y="20" width="22" height="4" />
      </g>
    </svg>
  );
}

export function Logo({ className, href = "/", asStatic = false }: LogoProps) {
  if (asStatic) {
    return <LogoMark className={className} />;
  }

  return (
    <Link
      href={href}
      aria-label={`${siteConfig.name} — home`}
      className={cn(
        "inline-flex items-center rounded-md",
        "duration-fast transition-opacity hover:opacity-70",
        className,
      )}
    >
      <LogoMark />
    </Link>
  );
}
