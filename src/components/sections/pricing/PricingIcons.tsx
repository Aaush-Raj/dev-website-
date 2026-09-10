import type { SVGProps } from "react";

/**
 * PRICING — ICONS
 * ---------------------------------------------------------------------------
 * The small stroked glyphs on the pricing page, transcribed from the supplied
 * handoff package.
 *
 * Every one is `aria-hidden`: each sits inside a button, link or badge that
 * already carries its own text, so an announced icon would only repeat the
 * label beside it. They take `currentColor`, so hover and focus states are set
 * once on the control rather than on the icon.
 */

type IconProps = SVGProps<SVGSVGElement>;

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** Down arrow — the hero's "Explore the engines" anchor. */
export function ArrowDownIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke} {...props}>
      <path d="M12 5v14M19 12l-7 7-7-7" />
    </svg>
  );
}

/** Right arrow — the per-engine detail links. */
export function ArrowRightIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/** Chevron — rotated by the accordion when its panel opens. */
export function ChevronDownIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke} {...props}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

/** A clock — the "Pilot available" badge. */
export function ClockIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  );
}

/** A wrench — "In development". */
export function WrenchIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke} {...props}>
      <path d="M15 6a4 4 0 1 0 3.6 5.7L21 14l-3 3-2.3-2.4A4 4 0 0 0 15 6z" />
      <path d="M13 11L4 20" />
    </svg>
  );
}

/** A flag — "Register interest". */
export function FlagIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke} {...props}>
      <path d="M5 21V4M5 4h11l-2 4 2 4H5" />
    </svg>
  );
}

/** A cross — removes a chip from the selection bar. */
export function CloseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke} {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

/** A tick — the "Added" state on a selected engine. */
export function CheckIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke} {...props}>
      <path d="M4 12l5 5L20 6" />
    </svg>
  );
}

/** Keyed by the badge tone in the content file. */
export const badgeIcons = {
  pilot: ClockIcon,
  dev: WrenchIcon,
  concept: FlagIcon,
} as const;

/* ---------------------------------------------------------------- */
/*  The Fabric diagram's engine glyphs                              */
/* ---------------------------------------------------------------- */

/** A pulse trace. */
export function PulseGlyph(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}

/** A spark. */
export function SparkGlyph(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18" />
    </svg>
  );
}
