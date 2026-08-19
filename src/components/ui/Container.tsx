import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * CONTAINER
 * ---------------------------------------------------------------------------
 * Constrains content width and applies the responsive page gutter. Every piece
 * of page content should sit inside one, so horizontal rhythm is identical
 * across all sections.
 *
 * Widths map to the layout tokens in styles/tokens/spacing.css.
 */

const widthStyles = {
  narrow: "max-w-narrow", //  768px — long-form prose
  content: "max-w-content", // 1200px — default
  nav: "max-w-nav", // 1080px — floating nav pill
  hero: "max-w-hero", // 1320px — hero grid, wider than the pill
  wide: "max-w-wide", // 1440px — feature layouts
  full: "max-w-none", // no constraint; gutter still applies
} as const;

export type ContainerWidth = keyof typeof widthStyles;

interface ContainerProps {
  children: ReactNode;
  /** Max content width. Defaults to "content". */
  width?: ContainerWidth;
  /** Render as a different element — e.g. "section", "header", "ul". */
  as?: ElementType;
  className?: string;
}

export function Container({
  children,
  width = "content",
  as: Component = "div",
  className,
}: ContainerProps) {
  return (
    <Component
      className={cn("mx-auto w-full px-gutter", widthStyles[width], className)}
    >
      {children}
    </Component>
  );
}
