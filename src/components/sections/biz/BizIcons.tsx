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

/* ========================================================================== */
/*  INTEGRATION GLYPHS                                                        */
/* ========================================================================== */

/** Two interlocking links. "Connect, don't replace". */
export function LinkIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M9.8 14.2a3.9 3.9 0 0 0 5.6 0l3.4-3.4a3.9 3.9 0 1 0-5.6-5.6l-1.4 1.4" />
      <path d="M14.2 9.8a3.9 3.9 0 0 0-5.6 0l-3.4 3.4a3.9 3.9 0 1 0 5.6 5.6l1.4-1.4" />
    </svg>
  );
}

/** A heartbeat trace. "Unify customer and performance signals". */
export function PulseIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M2.8 12.6h3.6l2.4-6.2 4.2 11.4 2.4-5.2h5.8" />
    </svg>
  );
}

/** A shield bearing a tick. "Secure, governed data access". */
export function ShieldCheckIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M12 2.9 20 6v6.4c0 4.4-3.2 7.4-8 8.7-4.8-1.3-8-4.3-8-8.7V6z" />
      <path d="m8.8 12 2.3 2.3 4.1-4.4" />
    </svg>
  );
}

/** A bar chart. BI dashboards, and the manager-insights output. */
export function BarsIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M4.6 20.4V13M10.2 20.4V8.2M15.8 20.4v-5.6M21.4 20.4V4.6" />
    </svg>
  );
}

/** A cog. Operational systems. */
export function GearIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 2.6v2.6M12 18.8v2.6M2.6 12h2.6M18.8 12h2.6M5.4 5.4l1.9 1.9M16.7 16.7l1.9 1.9M18.6 5.4l-1.9 1.9M7.3 16.7l-1.9 1.9" />
    </svg>
  );
}

/** Two figures. The hub's identity row. */
export function PeopleIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <circle cx="9" cy="8.4" r="3.2" />
      <path d="M3.2 19.8a5.8 5.8 0 0 1 11.6 0" />
      <path d="M16.4 5.6a3.2 3.2 0 0 1 0 5.6M17.4 14.6a5.8 5.8 0 0 1 3.4 5.2" />
    </svg>
  );
}

/** Three slider tracks. The hub's execution-patterns row. */
export function SlidersIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M3.4 7.2h17.2M3.4 12h17.2M3.4 16.8h17.2" />
      <circle cx="8.6" cy="7.2" r="1.9" fill="currentColor" />
      <circle cx="15.4" cy="12" r="1.9" fill="currentColor" />
      <circle cx="10.2" cy="16.8" r="1.9" fill="currentColor" />
    </svg>
  );
}

/** A target struck by an arrow. The action-priorities output. */
export function TargetArrowIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M17.6 6.6a8 8 0 1 0 1.7 3.1" />
      <path d="M15.2 9a4.6 4.6 0 1 0 1.4 2.1" />
      <circle cx="11.6" cy="12.4" r="1" fill="currentColor" stroke="none" />
      <path d="m11.6 12.4 8.2-8.2" />
      <path d="M16.9 4.6h4.5v4.5" />
    </svg>
  );
}

/** Glyphs used by the integration diagram, keyed by the content's `icon`. */
export const bizIntegrationIcons = {
  link: LinkIcon,
  pulse: PulseIcon,
  shield: ShieldCheckIcon,
  person: PersonIcon,
  bars: BarsIcon,
  chat: ChatIcon,
  gear: GearIcon,
  people: PeopleIcon,
  trend: TrendIcon,
  sliders: SlidersIcon,
  target: TargetArrowIcon,
} as const;

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
