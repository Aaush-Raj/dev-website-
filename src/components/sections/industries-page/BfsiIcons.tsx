/**
 * BFSI ICONS
 * ---------------------------------------------------------------------------
 * Glyphs for the banking section: the three point icons down the left, and
 * the small marks inside the drawn LurnyPitch overlay.
 *
 * The three point icons are REDRAWN rather than shipped as the supplied
 * 74x76 PNGs. At that size a raster is soft on a 2x display, cannot pick up
 * a hover tint, and needs three network requests; as SVG they are crisp at
 * any size and inherit `currentColor`.
 *
 * Drawn on a 24x24 grid at a 1.5 stroke, matching the design's line weight.
 */

interface IconProps {
  className?: string;
}

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/* ========================================================================== */
/*  POINT ICONS                                                               */
/* ========================================================================== */

/** A presenter at a board bearing a tick. Build frontline readiness. */
export function ReadinessIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      {/* The board, its stand, and the tick inside it. */}
      <path d="M11.4 4.4h9.4v9.2h-9.4" />
      <path d="M16.1 13.6v3.2M13.9 19.6l2.2-2.8 2.2 2.8" />
      <path d="m13.8 8.9 1.9 2 3.2-3.6" />
      {/* The presenter: head, body, and an arm reaching to the board. */}
      <circle cx="6.2" cy="6.4" r="2.2" />
      <path d="M3.4 19.8v-8.2a2.4 2.4 0 0 1 2.4-2.4h.8a2.4 2.4 0 0 1 2.4 2.4v1.2" />
      <path d="M4.6 19.8v-4.2M7.6 19.8v-4.2" />
      <path d="m8.6 12.2 2.8 1.4" />
    </svg>
  );
}

/** Two overlapping speech bubbles. Understand every conversation. */
export function ConversationIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M3.4 5.4h9.8v6.9H7.1L3.4 15.1z" />
      <path d="M20.6 9.6v6.9h-3.7l-3.6 2.8v-2.8h-2.2V9.6z" />
      {/* The three dots the design puts in the second bubble. */}
      <path d="M14.4 13h.01M17 13h.01M19.6 13h.01" strokeWidth="1.9" />
    </svg>
  );
}

/** A target struck by an arrow. Turn insight into action. */
export function TargetIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      {/*
        The rings are broken where the arrow crosses them, as the design
        draws it — a full circle would read as the arrow sitting on top
        rather than passing through.
      */}
      <path d="M17.6 6.6a8 8 0 1 0 1.7 3.1" />
      <path d="M15.2 9a4.6 4.6 0 1 0 1.4 2.1" />
      <circle cx="11.6" cy="12.4" r="1" fill="currentColor" stroke="none" />
      {/* The arrow: shaft and fletching. */}
      <path d="m11.6 12.4 8.2-8.2" />
      <path d="M16.9 4.6h4.5v4.5" />
    </svg>
  );
}

/* ========================================================================== */
/*  OVERLAY GLYPHS                                                            */
/* ========================================================================== */

/** Concentric rings — the customer-intent row. */
export function IntentIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="8.4" />
      <circle cx="12" cy="12" r="4.4" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** A warning triangle — the objection alert. */
export function AlertIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M12 3.9 21.4 20H2.6z" />
      <path d="M12 10.2v4.1M12 17.2h.01" strokeWidth="1.9" />
    </svg>
  );
}

/** A shield bearing a tick — compliance, and the renewal signal. */
export function ShieldIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M12 2.9 20 6v6.4c0 4.4-3.2 7.4-8 8.7-4.8-1.3-8-4.3-8-8.7V6z" />
      <path d="m8.8 12 2.3 2.3 4.1-4.4" />
    </svg>
  );
}

/** A rising line with an arrowhead — the missed-opportunity row. */
export function TrendIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="m3.4 16.6 5-5.2 3.4 3.2 6-6.4" />
      <path d="M14.4 8.2h3.8V12" />
    </svg>
  );
}

/** A calendar page — follow-ups and the next-action signal. */
export function CalendarIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <rect x="3.4" y="5.2" width="17.2" height="15.4" rx="2.4" />
      <path d="M3.4 10h17.2M8.2 3.4v3.4M15.8 3.4v3.4" />
      <path
        d="M7.6 13.6h.01M12 13.6h.01M16.4 13.6h.01M7.6 17h.01M12 17h.01"
        strokeWidth="1.9"
      />
    </svg>
  );
}

/** A headset figure — the coaching signal. */
export function CoachIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <circle cx="12" cy="8.6" r="3.9" />
      <path d="M5.2 20.6a6.8 6.8 0 0 1 13.6 0" />
      {/* The headset band and its cups. */}
      <path d="M6.6 9.2a5.4 5.4 0 0 1 10.8 0" />
      <path d="M5.6 9v2.2M18.4 9v2.2" strokeWidth="2.1" />
    </svg>
  );
}

/** The three point icons, keyed by the `icon` strings in the content file. */
export const bfsiPointIcons = {
  readiness: ReadinessIcon,
  conversation: ConversationIcon,
  target: TargetIcon,
} as const;

/** The glyphs used inside the drawn overlay. */
export const bfsiOverlayIcons = {
  intent: IntentIcon,
  alert: AlertIcon,
  shield: ShieldIcon,
  trend: TrendIcon,
  calendar: CalendarIcon,
  coach: CoachIcon,
} as const;
