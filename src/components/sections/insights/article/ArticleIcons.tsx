import type { SVGProps } from "react";

/**
 * INSIGHT ARTICLE — UI ICONS
 * ---------------------------------------------------------------------------
 * The small stroked icons around the article: the rail's tools, the player's
 * controls, the scroll cue. All transcribed from the supplied export.
 *
 * Every one is `aria-hidden`: each sits inside a button or link that already
 * carries its own text or `aria-label`, so an announced icon would only
 * repeat the label beside it.
 *
 * They take `currentColor`, so hover and focus states are set once on the
 * control rather than on the icon.
 */

type IconProps = SVGProps<SVGSVGElement>;

/** The shared stroke setup — the export uses 1.75 throughout. */
const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** Down arrow — "Begin reading". */
export function ArrowDownIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke} {...props}>
      <path d="M12 5v14M6 13l6 6 6-6" />
    </svg>
  );
}

/** The three-node share glyph. */
export function ShareIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke} {...props}>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
    </svg>
  );
}

/** Two chain links — copy link. */
export function LinkIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke} {...props}>
      <path d="M10 13a5 5 0 0 0 7.1 0l2-2A5 5 0 0 0 12 4l-1 1" />
      <path d="M14 11a5 5 0 0 0-7.1 0l-2 2A5 5 0 0 0 12 20l1-1" />
    </svg>
  );
}

/**
 * The bookmark. Its `fill` is driven from outside rather than fixed, because
 * the saved state fills the same shape instead of swapping the icon.
 */
export function BookmarkIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      {...stroke}
      fill="none"
      {...props}
    >
      <path d="M6 4h12v16l-6-4.5L6 20V4z" />
    </svg>
  );
}

export function PrintIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke} {...props}>
      <path d="M7 9V4h10v5" />
      <rect x="4" y="9" width="16" height="7" rx="2" />
      <path d="M7 16h10v4H7z" />
    </svg>
  );
}

/** Three lines — the transcript toggle. */
export function TranscriptIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      {...props}
    >
      <path d="M5 6h14M5 11h14M5 16h9" />
    </svg>
  );
}

export function SpeakerIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke} {...props}>
      <path d="M11 5 6 9H3v6h3l5 4V5z" />
      <path d="M16 9.5a4 4 0 0 1 0 5" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      {...props}
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

/* ----------------------------- Transport ----------------------------- */
/* Filled rather than stroked, as the export draws them. */

export function PlayIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
      <path d="M7 4.6c0-1 1-1.6 1.9-1.1l10.4 6.4c.9.5.9 1.7 0 2.2L8.9 20.5c-.9.5-1.9-.1-1.9-1.1V4.6z" />
    </svg>
  );
}

export function PauseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
      <rect x="6" y="4" width="4.4" height="16" rx="1.4" />
      <rect x="13.6" y="4" width="4.4" height="16" rx="1.4" />
    </svg>
  );
}

/**
 * Headphones — the "Audio version" jump link in the second article's hero.
 */
export function HeadphonesIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke} {...props}>
      <path d="M4 14v-3a8 8 0 0 1 16 0v3" />
      <path d="M4 14a2 2 0 0 1 4 0v3a2 2 0 0 1-4 0z" />
      <path d="M20 14a2 2 0 0 0-4 0v3a2 2 0 0 0 4 0z" />
    </svg>
  );
}

/** Right arrow — "Read the insight" on the previous-article card. */
export function ArrowRightIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
