import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * BADGE
 * ---------------------------------------------------------------------------
 * Small label — eyebrow text above a heading, "New" pills, status chips.
 */

const variantStyles = {
  brand: "bg-surface-brand-subtle text-text-brand",
  accent: "bg-surface-accent-subtle text-text-accent",
  neutral: "bg-surface-muted text-text-secondary",
  outline: "border border-border-default text-text-secondary",
  success: "bg-surface-muted text-status-success",
} as const;

const sizeStyles = {
  sm: "h-6 px-2.5 text-xs",
  md: "h-7 px-3 text-sm",
} as const;

interface BadgeProps {
  children: ReactNode;
  variant?: keyof typeof variantStyles;
  size?: keyof typeof sizeStyles;
  className?: string;
}

export function Badge({
  children,
  variant = "brand",
  size = "md",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full leading-none font-medium whitespace-nowrap",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
    >
      {children}
    </span>
  );
}
