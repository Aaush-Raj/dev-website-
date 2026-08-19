/**
 * MODEL ICONS
 * ---------------------------------------------------------------------------
 * Glyphs for the capability-model diagram, drawn to match the design's set:
 * a pulse trace, a sparkle, a chat bubble, a bar chart, plus the role
 * dimension and status icons.
 *
 * All inherit currentColor so the calling component controls tone. Decorative
 * — the adjacent labels carry the meaning — so each is aria-hidden.
 */

type IconProps = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.9,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
} as const;

/* -------------------------------------------------------------- engines -- */

/** LurnyPulse — an ECG trace. */
export function PulseIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M2.5 12.5h4l2-6.5 3.5 13 2.5-8 1.8 3.5h5.2" />
    </svg>
  );
}

/** LurnyMagic — a four-point sparkle. */
export function SparkleIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 2.5c.6 5.1 2.4 7 8.5 8.2-6.1 1.2-7.9 3.1-8.5 8.3-.6-5.2-2.4-7.1-8.5-8.3C9.6 9.5 11.4 7.6 12 2.5Z" />
    </svg>
  );
}

/** LurnyPitch — a speech bubble with a tail. */
export function BubbleIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M20.5 10.8c0 4-3.7 7.2-8.2 7.2-.8 0-1.6-.1-2.3-.3l-4.5 2.3 1.3-3.7a6.9 6.9 0 0 1-2.5-5.5c0-4 3.7-7.3 8.2-7.3s8 3.3 8 7.3Z" />
    </svg>
  );
}

/** LurnySense — an ascending bar chart. */
export function BarsIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="3" y="14" width="4.6" height="7" rx="1" />
      <rect x="9.7" y="9.5" width="4.6" height="11.5" rx="1" />
      <rect x="16.4" y="4" width="4.6" height="17" rx="1" />
    </svg>
  );
}

/* ----------------------------------------------------- role dimensions -- */

/** Knowledge — an open book. */
export function BookIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 7c-1.6-1.2-3.5-1.8-5.5-1.8H3.5v13.6H7c2 0 3.9.6 5 1.8 1.1-1.2 3-1.8 5-1.8h3.5V5.2H17c-2 0-3.9.6-5 1.8Z" />
      <path d="M12 7v13.6" />
    </svg>
  );
}

/** Skills — crossed spanner and screwdriver. */
export function ToolsIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M5.5 3.5a3.6 3.6 0 0 0 3.8 5.9L20 20.1l-1.9 1.9-10.7-10.8A3.6 3.6 0 0 1 1.6 7.4l2.6 2.6 2.4-.6.6-2.4L4.6 4.4l.9-.9Z" />
      <path d="M15.5 9 21 3.5M18 3h3v3" />
    </svg>
  );
}

/** Behaviours — two people. */
export function PeopleIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.4 19.5a5.6 5.6 0 0 1 11.2 0" />
      <path d="M16 5.4a3.2 3.2 0 0 1 0 5.9" />
      <path d="M17.8 19.5a5.4 5.4 0 0 0-1.7-3.9" />
    </svg>
  );
}

/* ---------------------------------------------------------- statuses --- */

/** Submitted — a document with a play marker. */
export function DocumentIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M6.5 3h7L18 7.5V20a1 1 0 0 1-1 1H6.5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
      <path d="M13.5 3v4.5H18" />
      <path d="M10 12.5v4l3.2-2-3.2-2Z" />
    </svg>
  );
}

/** Reviewed — a circled check. */
export function CheckCircleIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="8.6" />
      <path d="m8.3 12.3 2.6 2.6 4.8-5.2" />
    </svg>
  );
}

/** Pending — a clock. */
export function ClockIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M12 7.2V12l3.2 1.9" />
    </svg>
  );
}

/* ------------------------------------------------------- next actions --- */

/** A single person, for a coaching action. */
export function PersonIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="8.4" r="3.4" />
      <path d="M5.6 19.6a6.4 6.4 0 0 1 12.8 0" />
    </svg>
  );
}

/** A shield, for a compliance action. */
export function ShieldIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 2.8 4.6 5.9v5.6c0 4.4 3 8.4 7.4 9.7 4.4-1.3 7.4-5.3 7.4-9.7V5.9L12 2.8Z" />
    </svg>
  );
}

/** A target, for a practice action. */
export function TargetIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="8.6" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="12" cy="12" r="0.9" fill="currentColor" />
    </svg>
  );
}

/** Row affordance — a right chevron. */
export function ChevronRightIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="m9.5 5.5 7 6.5-7 6.5" />
    </svg>
  );
}

/** Footer — one node branching to two. */
export function HierarchyIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="4.6" r="2.6" />
      <circle cx="5.4" cy="19.4" r="2.6" />
      <circle cx="18.6" cy="19.4" r="2.6" />
      <path d="M12 7.2v3.4M5.4 16.8v-2.2a2 2 0 0 1 2-2h9.2a2 2 0 0 1 2 2v2.2" />
    </svg>
  );
}

/** Keys match the `icon` fields in content/model.ts. */
export const engineIcons = {
  pulse: PulseIcon,
  sparkle: SparkleIcon,
  bubble: BubbleIcon,
  bars: BarsIcon,
} as const;

export const dimensionIcons = {
  book: BookIcon,
  tools: ToolsIcon,
  people: PeopleIcon,
} as const;

export const statusIcons = {
  document: DocumentIcon,
  approved: CheckCircleIcon,
  pending: ClockIcon,
} as const;

export const actionIcons = {
  person: PersonIcon,
  shield: ShieldIcon,
  target: TargetIcon,
} as const;
