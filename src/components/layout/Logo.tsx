import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * LOGO
 * ---------------------------------------------------------------------------
 * The eLurny brand marks, in the two forms the brand supplies.
 *
 *   "wordmark" — the full horizontal lockup: amber bars plus LURNY. Used in
 *                the header.
 *   "mark"     — the stacked square mark: amber bars over a squared L. Used in
 *                the footer.
 *
 * These are the supplied PNGs rather than the redrawn SVG this file used to
 * hold. The SVG approximated the letterforms; these are the real artwork, so
 * the brand owns its own shapes and a future logo revision is a file swap
 * rather than an edit to hand-authored path data.
 *
 * Both were cropped to their alpha bounds — the sources carried a lot of empty
 * canvas, the mark especially (272x461 of art inside 732x971) — and converted
 * to WebP with alpha preserved. Together they are under 5KB.
 *
 * The trade-off versus inline SVG: these cannot inherit `currentColor`, so a
 * surface cannot recolour them. That matters in the footer — see the note on
 * `variant="mark"` in Footer.tsx.
 */

/** The two supplied lockups, with their cropped intrinsic sizes. */
const variants = {
  wordmark: {
    src: "/assets/images/logo-wordmark.webp",
    width: 600,
    height: 71,
    className: "h-6 w-auto",
  },
  mark: {
    src: "/assets/images/logo-mark.webp",
    width: 280,
    height: 475,
    className: "h-11 w-auto",
  },
} as const;

export type LogoVariant = keyof typeof variants;

interface LogoProps {
  className?: string;
  /** Which lockup to render. Defaults to the horizontal wordmark. */
  variant?: LogoVariant;
  /** Where the logo links to. Defaults to home. */
  href?: string;
  /**
   * Render the mark only, without the link wrapper — for use inside another
   * anchor where nesting links would be invalid HTML.
   */
  asStatic?: boolean;
  /**
   * Load eagerly. The header logo is in the initial viewport on every page,
   * so it should not lazy-load; the footer's should.
   */
  priority?: boolean;
}

function LogoImage({
  variant,
  className,
  priority,
}: {
  variant: LogoVariant;
  className?: string;
  priority?: boolean;
}) {
  const lockup = variants[variant];

  return (
    <Image
      src={lockup.src}
      // The link wrapper carries the accessible name, so the image itself is
      // decorative there. When rendered static it is the only thing present,
      // so it names itself.
      alt={`${siteConfig.name} logo`}
      width={lockup.width}
      height={lockup.height}
      priority={priority}
      className={cn(lockup.className, "select-none", className)}
    />
  );
}

export function Logo({
  className,
  variant = "wordmark",
  href = "/",
  asStatic = false,
  priority = false,
}: LogoProps) {
  if (asStatic) {
    return (
      <LogoImage variant={variant} className={className} priority={priority} />
    );
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
      <LogoImage variant={variant} priority={priority} />
    </Link>
  );
}
