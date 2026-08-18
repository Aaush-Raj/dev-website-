import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * HEADING
 * ---------------------------------------------------------------------------
 * Decouples the semantic level (h1…h6) from the visual size.
 *
 * This matters for SEO and accessibility: heading levels must form a correct
 * document outline (one h1, no skipped levels), but design frequently calls
 * for a visually small h2 or a large h3. Conflating the two produces either
 * broken outlines or hacked-up markup — this component avoids both.
 *
 *   <Heading as="h2" size="4xl">Section title</Heading>
 *   <Heading as="h3" size="lg">Card title</Heading>
 */

const sizeStyles = {
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
  "5xl": "text-5xl",
  "6xl": "text-6xl",
} as const;

const weightStyles = {
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
  extrabold: "font-extrabold",
} as const;

const alignStyles = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
} as const;

interface HeadingProps {
  children: ReactNode;
  /** Semantic level — pick from the document outline, not the visual size. */
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  /** Visual size — pick from the design. */
  size?: keyof typeof sizeStyles;
  weight?: keyof typeof weightStyles;
  align?: keyof typeof alignStyles;
  /** Anchor id, so in-page nav can link straight to this heading. */
  id?: string;
  className?: string;
}

export function Heading({
  children,
  as: Component = "h2",
  size = "3xl",
  weight = "bold",
  align = "left",
  id,
  className,
}: HeadingProps) {
  return (
    <Component
      id={id}
      className={cn(
        "font-display text-balance text-text-primary",
        sizeStyles[size],
        weightStyles[weight],
        alignStyles[align],
        className,
      )}
    >
      {children}
    </Component>
  );
}
