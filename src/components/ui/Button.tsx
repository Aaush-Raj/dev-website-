import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * BUTTON
 * ---------------------------------------------------------------------------
 * Renders as <button>, or as a Next <Link> when `href` is supplied — the
 * variant styling is identical either way, so a CTA looks the same whether it
 * submits a form or navigates.
 *
 * Colours come exclusively from the interactive-* semantic tokens, so a brand
 * change requires no edit here.
 */

const baseStyles = cn(
  // layout
  "inline-flex items-center justify-center gap-2 whitespace-nowrap",
  // type
  "leading-none font-semibold",
  // interaction
  "cursor-pointer select-none",
  "duration-normal transition-[background-color,color,box-shadow,transform] ease-out",
  "active:translate-y-px",
  // disabled
  "disabled:pointer-events-none disabled:opacity-55",
);

const variantStyles = {
  /** Primary CTA. One per view, ideally. */
  primary: cn(
    "bg-interactive-primary text-text-on-brand shadow-sm",
    "hover:bg-interactive-primary-hover hover:shadow-brand",
    "active:bg-interactive-primary-active",
  ),
  /** Secondary CTA — the accent ramp. */
  accent: cn(
    "bg-interactive-accent text-text-on-accent shadow-sm",
    "hover:bg-interactive-accent-hover hover:shadow-accent",
    "active:bg-interactive-accent-active",
  ),
  /** Neutral filled — lower emphasis than primary. */
  secondary: cn(
    "bg-interactive-neutral text-text-primary",
    "hover:bg-interactive-neutral-hover",
    "active:bg-interactive-neutral-active",
  ),
  /** Outlined — pairs with primary as the "learn more" action. */
  outline: cn(
    "border border-border-default bg-transparent text-text-primary",
    "hover:border-border-strong hover:bg-interactive-neutral",
    "active:bg-interactive-neutral-active",
  ),
  /** Text-only — tertiary actions, nav items. */
  ghost: cn(
    "bg-transparent text-text-primary",
    "hover:bg-interactive-neutral",
    "active:bg-interactive-neutral-active",
  ),
  /** For use on dark or brand-coloured surfaces. */
  inverse: cn(
    "bg-surface-base text-text-primary shadow-sm",
    "hover:bg-surface-subtle",
    "active:bg-surface-muted",
  ),
} as const;

const sizeStyles = {
  sm: "h-9  rounded-md px-3.5 text-sm",
  md: "h-11 rounded-lg px-5   text-base",
  lg: "h-13 rounded-lg px-7   text-lg",
  xl: "h-15 rounded-xl px-9   text-lg",
} as const;

export type ButtonVariant = keyof typeof variantStyles;
export type ButtonSize = keyof typeof sizeStyles;

interface BaseProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Stretch to the full width of the parent — useful on mobile. */
  fullWidth?: boolean;
  className?: string;
}

type ButtonAsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: never;
  };

type ButtonAsLink = BaseProps & {
  /** Supplying href renders a Next <Link> instead of a <button>. */
  href: string;
  /** Set for outbound links — adds target and rel automatically. */
  external?: boolean;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const {
    children,
    variant = "primary",
    size = "md",
    fullWidth = false,
    className,
    ...rest
  } = props;

  const classes = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    fullWidth && "w-full",
    className,
  );

  // `rest` is narrowed by the discriminant below, so each branch receives only
  // the props valid for the element it renders.
  if ("href" in rest && rest.href !== undefined) {
    const { href, external, ...linkProps } = rest as Omit<
      ButtonAsLink,
      keyof BaseProps
    >;
    return (
      <Link
        href={href}
        className={classes}
        {...(external && {
          target: "_blank",
          rel: "noopener noreferrer",
        })}
        {...linkProps}
      >
        {children}
      </Link>
    );
  }

  const buttonProps = rest as Omit<ButtonAsButton, keyof BaseProps | "href">;

  return (
    <button type="button" className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
