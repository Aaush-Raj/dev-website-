import Link from "next/link";

import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * LOGO
 * ---------------------------------------------------------------------------
 * Wordmark + link home.
 *
 * TODO(assets): swap the text wordmark for the real logo (next/image with an
 * SVG, or an inline SVG so it can inherit currentColor) once assets land.
 */

interface LogoProps {
  className?: string;
  /** Where the logo links to. Defaults to home. */
  href?: string;
}

export function Logo({ className, href = "/" }: LogoProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2 rounded-md",
        "font-display text-xl font-bold tracking-tight text-text-primary",
        "duration-fast transition-opacity hover:opacity-80",
        className,
      )}
      aria-label={`${siteConfig.name} — home`}
    >
      {siteConfig.name}
    </Link>
  );
}
