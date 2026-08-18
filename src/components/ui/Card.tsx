import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * CARD
 * ---------------------------------------------------------------------------
 * Generic surface container for feature tiles, testimonials, pricing plans.
 * Variants cover the common elevation treatments; anything more specific
 * should compose this rather than restyle it.
 */

const variantStyles = {
  /** Border only — flat, works well in dense grids. */
  outlined: "border border-border-subtle bg-surface-raised",
  /** Shadowed — lifts off the page, use on subtle/muted backgrounds. */
  elevated: "bg-surface-raised shadow-md",
  /** Filled — no border or shadow, reads as a tinted block. */
  filled: "bg-surface-muted",
  /** Brand-tinted — for the highlighted plan or featured item. */
  brand: "border border-border-brand bg-surface-brand-subtle",
  /** Unstyled — you supply the surface. */
  plain: "",
} as const;

const paddingStyles = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
} as const;

interface CardProps {
  children: ReactNode;
  variant?: keyof typeof variantStyles;
  padding?: keyof typeof paddingStyles;
  /** Add a hover lift. Only for cards that are themselves clickable. */
  interactive?: boolean;
  as?: ElementType;
  className?: string;
}

export function Card({
  children,
  variant = "outlined",
  padding = "md",
  interactive = false,
  as: Component = "div",
  className,
}: CardProps) {
  return (
    <Component
      className={cn(
        "rounded-xl",
        variantStyles[variant],
        paddingStyles[padding],
        interactive &&
          cn(
            "duration-normal transition-[transform,box-shadow,border-color] ease-out",
            "hover:-translate-y-1 hover:border-border-default hover:shadow-lg",
          ),
        className,
      )}
    >
      {children}
    </Component>
  );
}
