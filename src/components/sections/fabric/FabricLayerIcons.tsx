import type { SVGProps } from "react";

/**
 * FABRIC LAYER ICONS
 * ---------------------------------------------------------------------------
 * The marks used inside section 2's three cards: six foundation capabilities,
 * five engine glyphs and three suite glyphs.
 *
 * Drawn inline rather than shipped, like the rest of this build's icon sets.
 * They render at 18-24px, so a raster buys nothing a path does not, and inline
 * stays crisp at any density while inheriting currentColor.
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
/* FOUNDATION                                                                 */
/* ========================================================================== */

/** Identity — a single figure. */
export function IdentityIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="12" cy="8" r="3.6" {...stroke} />
      <path d="M4.8 20.2c.8-3.6 3.6-5.9 7.2-5.9s6.4 2.3 7.2 5.9" {...stroke} />
    </svg>
  );
}

/** Integration — two links of a chain. */
export function LinkIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M10.2 13.8a4 4 0 0 0 5.7 0l3-3a4 4 0 1 0-5.7-5.7l-1.3 1.3"
        {...stroke}
      />
      <path
        d="M13.8 10.2a4 4 0 0 0-5.7 0l-3 3a4 4 0 1 0 5.7 5.7l1.3-1.3"
        {...stroke}
      />
    </svg>
  );
}

/** Context — a datastore. */
export function DatabaseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <ellipse cx="12" cy="6" rx="7.2" ry="2.9" {...stroke} />
      <path d="M4.8 6v6c0 1.6 3.2 2.9 7.2 2.9s7.2-1.3 7.2-2.9V6" {...stroke} />
      <path
        d="M4.8 12v6c0 1.6 3.2 2.9 7.2 2.9s7.2-1.3 7.2-2.9v-6"
        {...stroke}
      />
    </svg>
  );
}

/** Governance — a shield with a tick. */
export function ShieldIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M12 2.8 4.6 5.9v5.6c0 4.4 3 8.4 7.4 9.7 4.4-1.3 7.4-5.3 7.4-9.7V5.9L12 2.8Z"
        {...stroke}
      />
      <path d="m8.9 11.8 2.2 2.2 4-4.3" {...stroke} />
    </svg>
  );
}

/** Orchestration — a node graph. */
export function NodesIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="12" cy="5" r="2.4" {...stroke} />
      <circle cx="5.4" cy="18.4" r="2.4" {...stroke} />
      <circle cx="18.6" cy="18.4" r="2.4" {...stroke} />
      <path d="M10.8 7.2 6.6 16.2M13.2 7.2l4.2 9M7.8 18.4h8.4" {...stroke} />
    </svg>
  );
}

/** Shared Services — an isometric cube. */
export function CubeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M12 2.6 20.4 7v10L12 21.4 3.6 17V7L12 2.6Z" {...stroke} />
      <path d="M3.6 7 12 11.6 20.4 7M12 11.6v9.8" {...stroke} />
    </svg>
  );
}

/* ========================================================================== */
/* ENGINES                                                                    */
/* ========================================================================== */

/** Pulse — the heartbeat trace. */
export function PulseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M2.5 12h3.2l2-6.4 3.2 12.8 2.6-8.2 1.8 1.8h6.2"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.9}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Magic — a wand with sparkles. */
export function WandIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="m5 19 9.4-9.4" {...stroke} />
      <path
        d="m13 11 3.4-3.4a1.6 1.6 0 0 0 0-2.3l-.7-.7a1.6 1.6 0 0 0-2.3 0L10 8"
        {...stroke}
      />
      {/* The sparkles, filled — they read as points of light, not outlines. */}
      <path
        d="M18.4 12.2 19 14l1.8.6-1.8.6-.6 1.8-.6-1.8-1.8-.6 1.8-.6.6-1.8Z"
        fill="currentColor"
      />
      <path
        d="M6.6 3.4 7 4.8l1.4.4-1.4.4-.4 1.4-.4-1.4L4.8 5.2l1.4-.4.4-1.4Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** KxP — stacked layers. */
export function LayersIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="m12 3 8.6 4.3L12 11.6 3.4 7.3 12 3Z" {...stroke} />
      <path d="m3.4 12 8.6 4.3 8.6-4.3" {...stroke} />
      <path d="m3.4 16.7 8.6 4.3 8.6-4.3" {...stroke} />
    </svg>
  );
}

/** Chat — a speech bubble. */
export function ChatBubbleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M20.6 11.8c0 4-3.9 7.2-8.6 7.2a10 10 0 0 1-2.6-.34L4.2 20.6l1.3-3.5a6.9 6.9 0 0 1-2.1-5.3C3.4 7.8 7.3 4.6 12 4.6s8.6 3.2 8.6 7.2Z"
        {...stroke}
      />
    </svg>
  );
}

/** Pitch — a bar chart. */
export function BarsSolidIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect
        x="3.6"
        y="13.5"
        width="3.4"
        height="7"
        rx="1"
        fill="currentColor"
      />
      <rect
        x="10.3"
        y="8.5"
        width="3.4"
        height="12"
        rx="1"
        fill="currentColor"
      />
      <rect
        x="17"
        y="3.6"
        width="3.4"
        height="16.9"
        rx="1"
        fill="currentColor"
      />
    </svg>
  );
}

/* ========================================================================== */
/* SUITES                                                                     */
/* ========================================================================== */

/** Enterprise C2P — an office building. */
export function BuildingIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M4.6 20.8V5.4a1.6 1.6 0 0 1 1.6-1.6h7.6a1.6 1.6 0 0 1 1.6 1.6v15.4"
        {...stroke}
      />
      <path d="M15.4 9.8h2.4a1.6 1.6 0 0 1 1.6 1.6v9.4M3 20.8h18" {...stroke} />
      <path
        d="M7.8 7.8h1.2M11 7.8h1.2M7.8 11.4h1.2M11 11.4h1.2M7.8 15h1.2M11 15h1.2"
        {...stroke}
      />
    </svg>
  );
}

/** LurnyCampus — a graduation cap. */
export function CapSolidIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      {/* The board is filled: outlined, it reads as a flat diamond at this size. */}
      <path d="M2.2 8.6 12 4.2l9.8 4.4-9.8 4.4-9.8-4.4Z" fill="currentColor" />
      <path
        d="M6.6 10.7v3.6c0 1.8 2.4 3.2 5.4 3.2s5.4-1.4 5.4-3.2v-3.6"
        {...stroke}
      />
      <path d="M20.6 9.2v4.4" {...stroke} />
    </svg>
  );
}

/** Configurable industry suites — four panes. */
export function SquaresIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect x="3.4" y="3.4" width="7.4" height="7.4" rx="1.6" {...stroke} />
      <rect x="13.2" y="3.4" width="7.4" height="7.4" rx="1.6" {...stroke} />
      <rect x="3.4" y="13.2" width="7.4" height="7.4" rx="1.6" {...stroke} />
      <rect x="13.2" y="13.2" width="7.4" height="7.4" rx="1.6" {...stroke} />
    </svg>
  );
}

/** The chevron on each suite row. */
export function ChevronIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="m9.5 5.5 7 6.5-7 6.5" {...stroke} />
    </svg>
  );
}
