import type { SVGProps } from "react";

/**
 * FABRIC HERO ICONS
 * ---------------------------------------------------------------------------
 * The eight node marks in the hero diagram: three capabilities above the core
 * and five systems below it.
 *
 * Drawn inline rather than shipped, like the other icon sets on this build:
 * they render at 22-26px, so a raster buys nothing a path does not, and inline
 * stays crisp at any density while inheriting currentColor.
 *
 * The Microsoft mark is the one exception in KIND — it is a four-pane square
 * rather than line art, because that is the shape the product is recognised by
 * and an outlined version of it reads as a generic window.
 */

type IconProps = SVGProps<SVGSVGElement>;

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/* ========================================================================== */
/* CAPABILITIES                                                               */
/* ========================================================================== */

/** Learn — an open book. */
export function BookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M12 6.8C10.4 5.5 8.4 4.9 5.8 4.9H3.2v12.6h2.6c2.6 0 4.6.6 6.2 1.8"
        {...stroke}
      />
      <path
        d="M12 6.8c1.6-1.3 3.6-1.9 6.2-1.9h2.6v12.6h-2.6c-2.6 0-4.6.6-6.2 1.8"
        {...stroke}
      />
      <path d="M12 6.8v12.5" {...stroke} />
    </svg>
  );
}

/** Practice — a lightning bolt, filled as the design draws it. */
export function BoltIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M13.6 2.5 4.9 13.4h5.6l-.9 8.1 8.9-11.1h-5.7l.8-7.9Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Perform — a bar chart, ascending. */
export function BarsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      {/* Filled bars, matching the solid treatment in the design. */}
      <rect
        x="3.6"
        y="13.5"
        width="3.6"
        height="7"
        rx="1.1"
        fill="currentColor"
      />
      <rect
        x="10.2"
        y="8.5"
        width="3.6"
        height="12"
        rx="1.1"
        fill="currentColor"
      />
      <rect
        x="16.8"
        y="3.5"
        width="3.6"
        height="17"
        rx="1.1"
        fill="currentColor"
      />
    </svg>
  );
}

/* ========================================================================== */
/* SYSTEMS                                                                    */
/* ========================================================================== */

/** LMS — a graduation cap. */
export function CapIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M2.2 8.6 12 4.1l9.8 4.5-9.8 4.5-9.8-4.5Z" {...stroke} />
      <path
        d="M6.3 10.5v4.2c0 1.7 2.6 3.1 5.7 3.1s5.7-1.4 5.7-3.1v-4.2"
        {...stroke}
      />
      <path d="M21.4 8.8v4.6" {...stroke} />
    </svg>
  );
}

/** HRIS — a group of people. */
export function PeopleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="12" cy="8.4" r="3" {...stroke} />
      <path d="M6.6 19.2c.6-2.8 2.8-4.6 5.4-4.6s4.8 1.8 5.4 4.6" {...stroke} />
      {/* Two smaller figures behind, which is what makes it read as a group. */}
      <path
        d="M5.4 11.6a2.1 2.1 0 1 0-1.6-3.5M3 17.4c.2-1.7.9-2.9 2-3.6"
        {...stroke}
      />
      <path
        d="M18.6 11.6a2.1 2.1 0 1 1 1.6-3.5M21 17.4c-.2-1.7-.9-2.9-2-3.6"
        {...stroke}
      />
    </svg>
  );
}

/**
 * Microsoft 365 — the four-pane mark.
 *
 * Filled squares with a gap between them, not an outlined window: this shape
 * is how the product is recognised, and stroking it loses that instantly.
 */
export function WindowsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect x="3" y="3" width="8.2" height="8.2" fill="currentColor" />
      <rect x="12.8" y="3" width="8.2" height="8.2" fill="currentColor" />
      <rect x="3" y="12.8" width="8.2" height="8.2" fill="currentColor" />
      <rect x="12.8" y="12.8" width="8.2" height="8.2" fill="currentColor" />
    </svg>
  );
}

/** CRM — two figures, the contact-record mark. */
export function ContactsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="9.4" cy="8.6" r="3.2" {...stroke} />
      <path d="M3.4 19.4c.6-3 2.9-4.9 6-4.9s5.4 1.9 6 4.9" {...stroke} />
      <path
        d="M16.4 6.2a3.1 3.1 0 0 1 0 5.9M17.8 15c1.7.7 2.8 2.3 3.1 4.4"
        {...stroke}
      />
    </svg>
  );
}

/** Knowledge — a stack of discs, the datastore mark. */
export function StackIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <ellipse cx="12" cy="6" rx="7.5" ry="3" {...stroke} />
      <path d="M4.5 6v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V6" {...stroke} />
      <path d="M4.5 12v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-6" {...stroke} />
    </svg>
  );
}

/** The arrow on the primary action. */
export function ArrowIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" {...props}>
      <path
        d="M2 8h12M9.5 3.5 14 8l-4.5 4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
