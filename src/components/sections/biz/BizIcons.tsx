/**
 * BIZ ICONS
 * ---------------------------------------------------------------------------
 * Glyphs for the LurnyBiz hero: the marks inside the drawn panels, and the
 * three larger icons in the strip along the bottom.
 *
 * Drawn on a 24x24 grid at a 1.5 stroke, matching the design's line weight,
 * and inheriting `currentColor` so each panel tints its own.
 *
 * The lookup tables at the foot are keyed by the `icon` strings in
 * content/biz.ts, so the content picks a glyph by name without importing
 * anything.
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
/*  PANEL GLYPHS                                                              */
/* ========================================================================== */

/** A crosshair. The priorities panel's header mark. */
export function CrosshairIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="7.4" />
      <circle cx="12" cy="12" r="2.6" />
      <path d="M12 1.8v3.2M12 19v3.2M1.8 12h3.2M19 12h3.2" />
    </svg>
  );
}

/** A warning triangle. The overdue follow-up. */
export function AlertIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M12 3.9 21.4 20H2.6z" />
      <path d="M12 10.2v4.1M12 17.2h.01" strokeWidth="1.9" />
    </svg>
  );
}

/** A person. Coaching rows and the CRM source chip. */
export function PersonIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <circle cx="12" cy="8.2" r="3.6" />
      <path d="M5 20.4a7 7 0 0 1 14 0" />
    </svg>
  );
}

/** A rising line with an arrowhead. Referral focus and the trend marks. */
export function TrendIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="m3.4 16.6 5-5.2 3.4 3.2 6-6.4" />
      <path d="M14.4 8.2h3.8V12" />
    </svg>
  );
}

/** A speech bubble. The conversations source chip. */
export function ChatIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M20.4 15.2a2.4 2.4 0 0 1-2.4 2.4H8.4L4 21.2V6.2a2.4 2.4 0 0 1 2.4-2.4h11.6a2.4 2.4 0 0 1 2.4 2.4z" />
    </svg>
  );
}

/** A branch building. The branch-data chip, and the plan's header mark. */
export function BranchIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M4.6 20.6V6.4l7-2.8v17M11.6 9.8h7.8v10.8" />
      <path d="M3.4 20.6h17.2" />
      <path d="M7.2 8.8h1.2M7.2 12h1.2M7.2 15.2h1.2M14.6 13h1.4M14.6 16.4h1.4" />
    </svg>
  );
}

/** A vertical ellipsis. Each panel's overflow control. */
export function MoreIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="5.4" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="12" cy="18.6" r="1.5" />
    </svg>
  );
}

/** A chevron pointing right. Row affordances. */
export function ChevronIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="m9 5.6 6.4 6.4L9 18.4" />
    </svg>
  );
}

/** A calendar page. The follow-up date. */
export function CalendarIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <rect x="3.4" y="5.2" width="17.2" height="15.4" rx="2.4" />
      <path d="M3.4 10h17.2M8.2 3.4v3.4M15.8 3.4v3.4" />
    </svg>
  );
}

/* ========================================================================== */
/*  POINT ICONS                                                               */
/* ========================================================================== */

/**
 * Concentric rings around a dot — a signal being picked up. Detect
 * opportunity & risk.
 */
export function DetectIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9.2" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** A target with a centre dot and tick marks. Guide next-best action. */
export function GuideIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="7.2" />
      <circle cx="12" cy="12" r="3.2" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
      <path d="M12 1.6v3M12 19.4v3M1.6 12h3M19.4 12h3" />
    </svg>
  );
}

/** Rising bars with an arrow over them. Connect capability to outcomes. */
export function ConnectIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M4.4 20.4V14M9.6 20.4v-9.2M14.8 20.4V8.4M20 20.4V5" />
      <path d="m4.8 10.4 5.2-4.2 4 2.4 5.4-5" />
      <path d="M16.2 3.2h3.6v3.6" />
    </svg>
  );
}

/** The glyphs used inside the drawn panels. */
export const bizPanelIcons = {
  alert: AlertIcon,
  person: PersonIcon,
  trend: TrendIcon,
  chat: ChatIcon,
  branch: BranchIcon,
} as const;

/** The three icons in the strip along the bottom of the hero. */
export const bizPointIcons = {
  detect: DetectIcon,
  guide: GuideIcon,
  connect: ConnectIcon,
} as const;
