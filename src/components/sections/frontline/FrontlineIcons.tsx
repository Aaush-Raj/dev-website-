import type { SVGProps } from "react";

/**
 * FRONTLINE HERO ICONS
 * ---------------------------------------------------------------------------
 * Two sets: the three proof-row glyphs under the statement, and the three
 * engine marks inside the loop cards.
 *
 * Drawn inline rather than shipped, for the same reason as the other solutions
 * icon sets (see SolutionsInclusiveIcons.tsx): these render at 20-28px, so a
 * raster buys nothing a path does not, and inline stays crisp at any density.
 *
 * The engine marks are FILLED, not stroked — in the design they sit on a
 * tinted disc and read as solid shapes. That disc belongs to the card, so it
 * is drawn by the caller; the glyphs here are transparent and inherit
 * currentColor.
 */

type IconProps = SVGProps<SVGSVGElement>;

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/* ========================================================================== */
/* PROOF ROW                                                                  */
/* ========================================================================== */

/** Three figures — stronger frontline teams. */
function TeamsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="9" cy="8.4" r="3" {...stroke} />
      <path d="M3.4 19.2a5.6 5.6 0 0 1 11.2 0" {...stroke} />
      <circle cx="17.4" cy="7.6" r="2.3" {...stroke} />
      <path d="M15.9 12.6a4.7 4.7 0 0 1 4.7 4.6" {...stroke} />
    </svg>
  );
}

/** A rising bar chart — better customer experiences. */
function ChartIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M4.6 19.4V13M11.2 19.4V8.2M17.8 19.4V4.6" {...stroke} />
    </svg>
  );
}

/** A star — a more capable tomorrow. */
function StarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="m12 3.6 2.7 5.5 6 .9-4.3 4.2 1 6-5.4-2.8-5.4 2.8 1-6L3.3 10l6-.9Z"
        {...stroke}
      />
    </svg>
  );
}

/* ========================================================================== */
/* ENGINE MARKS                                                               */
/* ========================================================================== */

/** A heartbeat trace — Pulse. */
function PulseMark(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M2.6 12.4h3.1l1.8-4.9 2.9 9.3 2.4-11.2 2.2 8.1 1.4-1.3h5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** An open book — Saathi. */
function SaathiMark(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M12 6.6C10.2 5.2 7.9 4.6 5 4.8a1 1 0 0 0-.9 1v11.3a1 1 0 0 0 1.1 1c2.5-.2 4.7.3 6.3 1.5.3.2.7.2 1 0 1.6-1.2 3.8-1.7 6.3-1.5a1 1 0 0 0 1.1-1V5.8a1 1 0 0 0-.9-1c-2.9-.2-5.2.4-7 1.8Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinejoin="round"
      />
      <path
        d="M12 6.6v12.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Three solid bars — Pitch. */
function PitchMark(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M5.2 14.4h2.6a.6.6 0 0 1 .6.6v4.2a.6.6 0 0 1-.6.6H5.2a.6.6 0 0 1-.6-.6V15a.6.6 0 0 1 .6-.6Zm5.5-4.6h2.6a.6.6 0 0 1 .6.6v8.8a.6.6 0 0 1-.6.6h-2.6a.6.6 0 0 1-.6-.6v-8.8a.6.6 0 0 1 .6-.6Zm5.5-5.4h2.6a.6.6 0 0 1 .6.6v14.2a.6.6 0 0 1-.6.6h-2.6a.6.6 0 0 1-.6-.6V5a.6.6 0 0 1 .6-.6Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** An arrow rising out of a ring — the "readiness improving" status. */
export function TrendUpIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M12 18V6.8M12 6.8 7.6 11.2M12 6.8l4.4 4.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ========================================================================== */
/* PROBLEM SECTION                                                            */
/* ========================================================================== */

/** A checked document — readiness assumed from a completion record. */
function ReadinessIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M6.2 3.4h7.4l4.2 4.2v13a1 1 0 0 1-1 1H6.2a1 1 0 0 1-1-1V4.4a1 1 0 0 1 1-1Z"
        {...stroke}
      />
      <path d="M13.4 3.6v4.2h4.2" {...stroke} />
      <path d="m8.8 13.6 2.2 2.2 4-4.2" {...stroke} />
    </svg>
  );
}

/** A falling bar chart — the manager's report, and support arriving late. */
function LateIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M4.6 5.2v14.2M9.8 8.6v10.8M15 12v7.4M20.2 15.4v4" {...stroke} />
    </svg>
  );
}

/** A struck-through eye — real work nobody can see. */
function InvisibleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M3 12s3.6-5.8 9-5.8 9 5.8 9 5.8-3.6 5.8-9 5.8S3 12 3 12Z"
        {...stroke}
      />
      <circle cx="12" cy="12" r="2.6" {...stroke} />
      <path d="M4 20 20 4" {...stroke} />
    </svg>
  );
}

/** A figure with a query — the manager without a next action. */
function ManagerIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="9" cy="8.4" r="3" {...stroke} />
      <path d="M3.4 19.4a5.6 5.6 0 0 1 11.2 0" {...stroke} />
      <path d="M16.6 8.2a2 2 0 1 1 2 2v1.4" {...stroke} />
      <circle cx="18.6" cy="14.4" r="0.85" fill="currentColor" />
    </svg>
  );
}

/** A speech bubble — the customer interaction itself. */
function InteractionIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M20.6 12.2c0 3.9-3.8 7-8.5 7a9.9 9.9 0 0 1-2.7-.4l-5 1.7 1.7-4a6.5 6.5 0 0 1-1.7-4.3c0-3.9 3.8-7 8.5-7s7.7 3.1 7.7 7Z"
        {...stroke}
      />
    </svg>
  );
}

/** Keyed by the `icon` fields on the problem section's content. */
export const problemIcons = {
  readiness: ReadinessIcon,
  late: LateIcon,
  invisible: InvisibleIcon,
  manager: ManagerIcon,
  interaction: InteractionIcon,
} as const;

/** Keyed by the `icon` fields in content/frontline.ts. */
export const proofIcons = {
  teams: TeamsIcon,
  chart: ChartIcon,
  star: StarIcon,
} as const;

/** Keyed by each loop card's `tone`. */
export const engineMarks = {
  pulse: PulseMark,
  saathi: SaathiMark,
  pitch: PitchMark,
} as const;

export type ProofIconName = keyof typeof proofIcons;

/* ========================================================================== */
/* PULSE SECTION                                                              */
/* -------------------------------------------------------------------------- */
/* The section-4 set: three for the capability list beside the copy, and the   */
/* rest for the imitation console's rail and cards. All redrawn here rather    */
/* than shipped as the supplied PNGs — at 16-22px a path is sharper than a     */
/* raster at any density, and these inherit currentColor so one glyph serves   */
/* every tint the section uses.                                               */
/* ========================================================================== */

/** A target with an arrow through it — "define what good looks like". */
function TargetIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="11" cy="13" r="8" {...stroke} />
      <circle cx="11" cy="13" r="4" {...stroke} />
      <path d="M11 13 20.5 3.5M16.5 3.5h4v4" {...stroke} />
    </svg>
  );
}

/** A three-bar chart, ascending. */
function BarsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M5 20v-5M12 20V8M19 20V4" {...stroke} strokeWidth={2.4} />
    </svg>
  );
}

/** Two figures — a group. */
function PeopleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="9" cy="8" r="3.2" {...stroke} />
      <path d="M3.5 20a5.5 5.5 0 0 1 11 0" {...stroke} />
      <path d="M16 5.6a3.2 3.2 0 0 1 0 6.1M17.5 14.6A5.5 5.5 0 0 1 20.5 20" {...stroke} />
    </svg>
  );
}

/** A heartbeat trace — the Pulse rail item. */
function PulseTraceIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M2.5 12h4l2-5.5L12 18l2.5-6 1.5 3h5.5" {...stroke} />
    </svg>
  );
}

/** A briefcase — the Roles rail item. */
function RolesIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect x="3" y="7.5" width="18" height="12.5" rx="2.2" {...stroke} />
      <path d="M9 7.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5" {...stroke} />
    </svg>
  );
}

/** A gear — the Settings rail item. */
function SettingsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="3.2" {...stroke} />
      <path
        d="M12 2.6v2.6M12 18.8v2.6M21.4 12h-2.6M5.2 12H2.6M18.6 5.4l-1.8 1.8M7.2 16.8l-1.8 1.8M18.6 18.6l-1.8-1.8M7.2 7.2 5.4 5.4"
        {...stroke}
      />
    </svg>
  );
}

/** A document with lines — the evidence rows and the Priority card mark. */
function DocIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" {...stroke} />
      <path d="M14 3v5h5M9 13h6M9 17h4" {...stroke} />
    </svg>
  );
}

/** A ticked box — the scenario-challenge evidence row. */
function CheckBoxIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect x="4" y="4" width="16" height="16" rx="3" {...stroke} />
      <path d="m8.5 12.2 2.6 2.6 4.6-5.2" {...stroke} />
    </svg>
  );
}

/** A lightning bolt — the challenge dialog's mark. */
function BoltIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M13.5 2 4 13.4h6.2L9.8 22 20 10.4h-6.4Z" fill="currentColor" />
    </svg>
  );
}

/** A right chevron — the "open this" affordance on the console's rows. */
function ChevronRightIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="m9.5 5.5 7 6.5-7 6.5" {...stroke} />
    </svg>
  );
}

/** Keyed by the `icon` fields on the pulse section's content. */
export const pulseIcons = {
  target: TargetIcon,
  bars: BarsIcon,
  people: PeopleIcon,
  pulse: PulseTraceIcon,
  roles: RolesIcon,
  settings: SettingsIcon,
  doc: DocIcon,
  check: CheckBoxIcon,
  bolt: BoltIcon,
  chevron: ChevronRightIcon,
} as const;

/* ========================================================================== */
/* VISIBILITY SECTION                                                         */
/* -------------------------------------------------------------------------- */
/* The section-7 set: four for the capability list beside the copy, plus the   */
/* marks the leadership dashboard needs. Redrawn rather than shipped, for the  */
/* same reason as the rest — these render at 14-22px, where a path beats a     */
/* raster at any density, and they inherit currentColor so one glyph serves    */
/* every tone the dashboard tints it.                                         */
/* ========================================================================== */

/** A map pin — readiness by location. */
function PinIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11Z" {...stroke} />
      <circle cx="12" cy="10" r="2.6" {...stroke} />
    </svg>
  );
}

/** A speech bubble — conversation quality. */
function SpeechIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M20.5 11.6c0 3.9-3.8 7-8.5 7a10 10 0 0 1-2.7-.4l-5 1.7 1.7-4a6.5 6.5 0 0 1-1.7-4.3c0-3.9 3.8-7 8.5-7s7.7 3.1 7.7 7Z"
        {...stroke}
      />
    </svg>
  );
}

/** A rising trend arrow — progress over time. */
function TrendIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M3 17.5 9 11l4 4 8-8.5" {...stroke} />
      <path d="M16.5 6.5H21v4.5" {...stroke} />
    </svg>
  );
}

/** A warning triangle — priority gaps. */
function AlertIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M12 3.6 21.2 19.5H2.8L12 3.6Z"
        {...stroke}
        strokeLinejoin="round"
      />
      <path d="M12 9.5v4.2M12 16.6v.1" {...stroke} />
    </svg>
  );
}

/** A calendar — the dashboard's date-range control. */
function CalendarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.4" {...stroke} />
      <path d="M3.5 9.8h17M8.5 3v4M15.5 3v4" {...stroke} />
    </svg>
  );
}

/** A down chevron — the date-range control's caret. */
function ChevronDownIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="m5.5 9.5 6.5 7 6.5-7" {...stroke} />
    </svg>
  );
}

/** Keyed by the `icon` fields on the visibility section's content. */
export const visibilityIcons = {
  pin: PinIcon,
  bars: BarsIcon,
  speech: SpeechIcon,
  trend: TrendIcon,
  alert: AlertIcon,
  people: PeopleIcon,
  calendar: CalendarIcon,
  chevronDown: ChevronDownIcon,
  chevron: ChevronRightIcon,
} as const;
