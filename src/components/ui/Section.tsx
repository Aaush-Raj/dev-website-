import type { ElementType, ReactNode } from "react";

import { Container, type ContainerWidth } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

/**
 * SECTION
 * ---------------------------------------------------------------------------
 * A full-width horizontal band of the page: handles the vertical rhythm, the
 * background surface, and the inner Container in one place.
 *
 * Every landing-page section (Hero, Features, Pricing, CTA…) should be built
 * on this rather than hand-rolling padding — that is what keeps the vertical
 * spacing consistent as sections are added, removed and reordered.
 *
 *   <Section id="features" background="subtle">
 *     …
 *   </Section>
 */

const spacingStyles = {
  none: "",
  sm: "py-section-sm",
  md: "py-section",
  lg: "py-section-lg",
} as const;

const backgroundStyles = {
  none: "",
  base: "bg-surface-base",
  subtle: "bg-surface-subtle",
  muted: "bg-surface-muted",
  inverse: "bg-surface-inverse text-text-inverse",
  brand: "bg-surface-brand text-text-on-brand",
} as const;

interface SectionProps {
  children: ReactNode;
  /** Anchor id — also the scroll target for in-page nav links. */
  id?: string;
  /** Vertical padding. Defaults to "md". */
  spacing?: keyof typeof spacingStyles;
  /** Background surface. Defaults to "none" (inherits the page background). */
  background?: keyof typeof backgroundStyles;
  /** Inner container width. Defaults to "content". */
  width?: ContainerWidth;
  /**
   * Skip the inner Container — for sections that need full-bleed children
   * (edge-to-edge carousels, background media). You then own the layout.
   */
  bleed?: boolean;
  as?: ElementType;
  className?: string;
  /** Classes for the inner Container, when not bleeding. */
  containerClassName?: string;
}

export function Section({
  children,
  id,
  spacing = "md",
  background = "none",
  width = "content",
  bleed = false,
  as: Component = "section",
  className,
  containerClassName,
}: SectionProps) {
  return (
    <Component
      id={id}
      className={cn(
        "relative w-full",
        spacingStyles[spacing],
        backgroundStyles[background],
        className,
      )}
    >
      {bleed ? (
        children
      ) : (
        <Container width={width} className={containerClassName}>
          {children}
        </Container>
      )}
    </Component>
  );
}
