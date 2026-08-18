import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * TEXT
 * ---------------------------------------------------------------------------
 * Body copy with consistent size, colour and measure.
 *
 * `measure` caps line length in characters. Lines longer than roughly 75
 * characters measurably hurt readability — the eye loses its place on the
 * return sweep — so section intros and prose should almost always set it.
 */

const sizeStyles = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
} as const;

const toneStyles = {
  primary: "text-text-primary",
  secondary: "text-text-secondary",
  tertiary: "text-text-tertiary",
  muted: "text-text-muted",
  inverse: "text-text-inverse",
  brand: "text-text-brand",
  accent: "text-text-accent",
  /** Inherit the parent's colour — for text on a coloured Section. */
  inherit: "",
} as const;

const weightStyles = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
} as const;

const alignStyles = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
} as const;

const measureStyles = {
  /** ~45ch — tight columns, captions. */
  narrow: "max-w-[45ch]",
  /** ~65ch — the readability sweet spot for body copy. */
  default: "max-w-[65ch]",
  /** ~80ch — wide intros. */
  wide: "max-w-[80ch]",
  /** No cap — the parent controls width. */
  none: "",
} as const;

interface TextProps {
  children: ReactNode;
  as?: ElementType;
  size?: keyof typeof sizeStyles;
  tone?: keyof typeof toneStyles;
  weight?: keyof typeof weightStyles;
  align?: keyof typeof alignStyles;
  /** Line-length cap. Defaults to "none" — set it for prose. */
  measure?: keyof typeof measureStyles;
  className?: string;
}

export function Text({
  children,
  as: Component = "p",
  size = "base",
  tone = "secondary",
  weight = "normal",
  align = "left",
  measure = "none",
  className,
}: TextProps) {
  return (
    <Component
      className={cn(
        "leading-relaxed text-pretty",
        sizeStyles[size],
        toneStyles[tone],
        weightStyles[weight],
        alignStyles[align],
        measureStyles[measure],
        // Centre the measure box too, otherwise centred text sits left.
        align === "center" && measure !== "none" && "mx-auto",
        className,
      )}
    >
      {children}
    </Component>
  );
}
