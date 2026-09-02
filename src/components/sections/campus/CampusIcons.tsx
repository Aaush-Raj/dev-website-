import type { SVGProps } from "react";

/**
 * LURNYCAMPUS ICONS
 * ---------------------------------------------------------------------------
 * Every glyph on the LurnyCampus page, drawn as SVG rather than shipped as
 * artwork: they render at a handful of sizes across the section and stay crisp
 * at every density this way, with no extra requests.
 *
 * Two families live here, and they are drawn to different rules:
 *
 *   PANEL icons  — currentColor strokes on a 24-box, sized by the caller.
 *                  Used inside the readiness panel's metric tiles.
 *   RAIL icons   — the four question marks along the section's foot. Each is a
 *                  teal ring around a mark with one coral accent, matching the
 *                  supplied icon artwork; the ring is part of the drawing, not
 *                  a border on the wrapper, so it scales with the glyph.
 */

type IconProps = SVGProps<SVGSVGElement>;

/** Shared stroke setup for the panel family. */
const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/* ========================================================================== */
/* PANEL ICONS — readiness metrics                                            */
/* ========================================================================== */

/** An open book. */
function KnowledgeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path {...stroke} d="M12 6.5v13" />
      <path
        {...stroke}
        d="M12 6.5C10.6 5.2 8.8 4.5 6.5 4.5H3.5v13h3c2.3 0 4.1.7 5.5 2"
      />
      <path
        {...stroke}
        d="M12 6.5c1.4-1.3 3.2-2 5.5-2h3v13h-3c-2.3 0-4.1.7-5.5 2"
      />
    </svg>
  );
}

/** Angle brackets around a slash — the practice/code mark. */
function PracticeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path {...stroke} d="m8 8-4 4 4 4" />
      <path {...stroke} d="m16 8 4 4-4 4" />
      <path {...stroke} d="M13.5 6.5 10.5 17.5" />
    </svg>
  );
}

/** A rising bar chart with an arrow over it. */
function DemonstrationIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path {...stroke} d="M4 20V10.5M9.33 20v-5M14.67 20v-8M20 20V6" />
      <path {...stroke} d="m4.5 9 5-4.5 3 2.5 6-4.5" />
      <path {...stroke} d="M15 2.5h3.5V6" />
    </svg>
  );
}

/** A shield with a tick — validation. */
function ValidationIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        {...stroke}
        d="M12 2.75 4.5 5.75v6c0 4.2 3 7.6 7.5 9.5 4.5-1.9 7.5-5.3 7.5-9.5v-6Z"
      />
      <path {...stroke} d="m9 11.75 2.25 2.25L15.5 9.75" />
    </svg>
  );
}

export const panelIcons = {
  knowledge: KnowledgeIcon,
  practice: PracticeIcon,
  demonstration: DemonstrationIcon,
  validation: ValidationIcon,
} as const;

export type PanelIconName = keyof typeof panelIcons;

/* ========================================================================== */
/* RAIL ICONS — the four questions                                            */
/* ========================================================================== */

/*
  Drawn on a 48-box. The outer ring is r=21 at stroke 3, leaving the mark room
  to sit inside it without crowding. `--rail-ring`, `--rail-mark` and
  `--rail-dot` are set by the rail so one declaration re-tones all four.
*/
const ring = {
  fill: "none",
  stroke: "var(--rail-ring, currentColor)",
  strokeWidth: 3,
} as const;

const mark = {
  fill: "none",
  stroke: "var(--rail-mark, #f5f1e8)",
  strokeWidth: 3,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** A map pin with a coral locator dot — "Where am I?" */
function WhereIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <circle {...ring} cx="24" cy="24" r="21" />
      <path
        {...mark}
        d="M24 15.5c-3.6 0-6.5 2.9-6.5 6.5 0 4.3 6.5 10.5 6.5 10.5s6.5-6.2 6.5-10.5c0-3.6-2.9-6.5-6.5-6.5Z"
      />
      <circle cx="31.5" cy="30.5" r="3.2" fill="var(--rail-dot, #f4603c)" />
    </svg>
  );
}

/** A coral arrow pointing forward — "What should I do next?" */
function NextIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <circle {...ring} cx="24" cy="24" r="21" />
      <path
        d="M15 24h13.5M26 17.5 33 24l-7 6.5"
        fill="none"
        stroke="var(--rail-dot, #f4603c)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Rising bars — "What am I becoming capable of?" */
function CapableIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <circle {...ring} cx="24" cy="24" r="21" />
      <path {...mark} d="M17 31.5V26M24 31.5V19M31 31.5v-9" />
      <circle cx="31" cy="17" r="3" fill="var(--rail-dot, #f4603c)" />
    </svg>
  );
}

/** Concentric rings around a coral centre — "How ready am I?" */
function ReadyIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <circle {...ring} cx="24" cy="24" r="21" />
      <circle {...ring} cx="24" cy="24" r="11.5" />
      <circle cx="24" cy="24" r="5" fill="var(--rail-dot, #f4603c)" />
      <circle cx="32.5" cy="16" r="3.2" fill="var(--rail-dot, #f4603c)" />
    </svg>
  );
}

export const railIcons = {
  where: WhereIcon,
  next: NextIcon,
  capable: CapableIcon,
  ready: ReadyIcon,
} as const;

export type RailIconName = keyof typeof railIcons;

/* ========================================================================== */
/* UTILITY                                                                    */
/* ========================================================================== */

/** The circled arrow on the "Next Best Action" panel. */
export function ArrowCircleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="11" fill="currentColor" />
      <path
        d="M9.5 12h5M12.5 9.5 15 12l-2.5 2.5"
        fill="none"
        stroke="#fff"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ========================================================================== */
/* SECTION 2 — PROBLEM ICONS                                                  */
/* ========================================================================== */

/*
  The three symptom glyphs. Each is teal line-work with one coral accent,
  matching the supplied tile artwork — but drawn rather than shipped: the
  supplied PNGs are ~114px and would soften at the size they render here.

  `--sym-line` and `--sym-accent` let the card re-tone a glyph without the icon
  knowing anything about its surroundings.
*/
const symLine = {
  fill: "none",
  stroke: "var(--sym-line, #0d4d4d)",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const symAccent = {
  fill: "none",
  stroke: "var(--sym-accent, #f4603c)",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** Scattered nodes joined by dotted links — activity that never connects. */
function DisconnectedIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      {/* The links are dashed: the point is that they do not really hold. */}
      <path
        {...symAccent}
        strokeDasharray="1.5 2.5"
        d="M16 14.5 8.5 21M16 14.5 23.5 21M16 14.5V9"
      />
      <circle {...symAccent} cx="16" cy="15.5" r="3" />
      <circle {...symAccent} cx="7.5" cy="22.5" r="2.75" />
      <circle {...symAccent} cx="24.5" cy="22.5" r="2.75" />
      <circle {...symAccent} cx="16" cy="7.5" r="2.75" />
    </svg>
  );
}

/** A clipboard carrying a tick — a score, not a capability. */
function ScoresIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <path
        {...symLine}
        d="M11 7.5H9a1.5 1.5 0 0 0-1.5 1.5v14A1.5 1.5 0 0 0 9 24.5h14a1.5 1.5 0 0 0 1.5-1.5V9A1.5 1.5 0 0 0 23 7.5h-2"
      />
      <rect {...symLine} x="12" y="5.5" width="8" height="4" rx="1.25" />
      <path {...symAccent} strokeWidth="2" d="m11.5 16.5 3 3 6.5-6.5" />
    </svg>
  );
}

/** A signpost whose arms point opposite ways — progress without direction. */
function DirectionIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <path {...symLine} d="M14.5 7v19M17.5 12.5V26" />
      <path {...symLine} d="M11 26h10" />
      {/* The upper arm points right, in coral; the lower points back left. */}
      <path {...symAccent} d="M17.5 9h7l2.5 2.5L24.5 14h-7" />
      <path {...symLine} d="M14.5 16.5h-7L5 19l2.5 2.5h7" />
    </svg>
  );
}

export const problemIcons = {
  disconnected: DisconnectedIcon,
  scores: ScoresIcon,
  direction: DirectionIcon,
} as const;

export type ProblemIconName = keyof typeof problemIcons;

/* ========================================================================== */
/* SECTION 2 — JOURNEY ICONS                                                  */
/* ========================================================================== */

/*
  The five rail stages plus the terminal star. Drawn on a 32-box and inheriting
  currentColor, so a node tones its glyph by setting text colour alone.
*/
const railStroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** An open book. */
function LearnIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <path {...railStroke} d="M16 9.5v14" />
      <path
        {...railStroke}
        d="M16 9.5c-1.7-1.5-3.9-2.25-6.6-2.25H6.5v14h2.9c2.7 0 4.9.75 6.6 2.25"
      />
      <path
        {...railStroke}
        d="M16 9.5c1.7-1.5 3.9-2.25 6.6-2.25h2.9v14h-2.9c-2.7 0-4.9.75-6.6 2.25"
      />
    </svg>
  );
}

/** A pencil on the diagonal. */
function PractiseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <path {...railStroke} d="M21.5 6.5 25.5 10.5 12 24H8v-4z" />
      <path {...railStroke} d="m18.5 9.5 4 4" />
    </svg>
  );
}

/** A lightbulb — the coral hinge of the rail. */
function ApplyIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <path
        {...railStroke}
        d="M16 6.5a7 7 0 0 0-4.2 12.6c.7.5 1.2 1.3 1.2 2.2v.2h6v-.2c0-.9.5-1.7 1.2-2.2A7 7 0 0 0 16 6.5Z"
      />
      <path {...railStroke} d="M13.5 24.5h5M14.5 27h3" />
    </svg>
  );
}

/** A document with lines — an outcome that exists. */
function DemonstrateIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <path
        {...railStroke}
        d="M18.5 5.5H10a1.5 1.5 0 0 0-1.5 1.5v18A1.5 1.5 0 0 0 10 26.5h12a1.5 1.5 0 0 0 1.5-1.5V10.5Z"
      />
      <path {...railStroke} d="M18.5 5.5v5h5" />
      <path {...railStroke} d="M12.5 16.5h7M12.5 20.5h7" />
    </svg>
  );
}

/** A shield with a tick — credible feedback. */
function ValidateIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <path
        {...railStroke}
        d="M16 5.5 7.5 9v6.8c0 4.8 3.4 8.7 8.5 10.7 5.1-2 8.5-5.9 8.5-10.7V9Z"
      />
      <path {...railStroke} d="m12.5 15.75 2.5 2.5 4.75-5" />
    </svg>
  );
}

export const journeyIcons = {
  learn: LearnIcon,
  practise: PractiseIcon,
  apply: ApplyIcon,
  demonstrate: DemonstrateIcon,
  validate: ValidateIcon,
} as const;

export type JourneyIconName = keyof typeof journeyIcons;

/** The star inside the terminal READY node. */
export function StarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <path
        {...railStroke}
        d="m16 6.5 3.1 6.3 6.9 1-5 4.9 1.2 6.9L16 22.3 9.8 25.6l1.2-6.9-5-4.9 6.9-1z"
      />
    </svg>
  );
}

/* ========================================================================== */
/* SECTION 2 — OUTCOME CHIP ICONS                                             */
/* ========================================================================== */

/** A compass — the next best action. */
function CompassIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle {...stroke} cx="12" cy="12" r="8.5" />
      <path {...stroke} d="m15 9-2 4.2-4 1.8 2-4.2z" />
    </svg>
  );
}

/** Rising bars — evidence accumulating. */
function BarsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path {...stroke} d="M5 19v-5M12 19V8M19 19v-8" />
    </svg>
  );
}

/** A circular arrow — readiness re-evaluating itself. */
function RefreshIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path {...stroke} d="M20 12a8 8 0 1 1-2.5-5.8" />
      <path {...stroke} d="M20.5 4v4.5H16" />
    </svg>
  );
}

export const outcomeIcons = {
  compass: CompassIcon,
  bars: BarsIcon,
  refresh: RefreshIcon,
} as const;

export type OutcomeIconName = keyof typeof outcomeIcons;

/* ========================================================================== */
/* SECTION 3 — POINT ICONS                                                    */
/* ========================================================================== */

/*
  The three claims beside the product mockup. Each is a coral ring around a
  mark, matching the supplied artwork — drawn rather than shipped, since those
  PNGs are 83px and render larger than that here.
*/
const pointRing = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
} as const;

const pointMark = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** A compass — discovering what matters. */
function PointCompassIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <circle {...pointRing} cx="24" cy="24" r="21" />
      <path {...pointMark} d="m31 17-4.4 9.2L17 30.6l4.4-9.2z" />
    </svg>
  );
}

/** A target with an arrow in it — moving with purpose. */
function PointTargetIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <circle {...pointRing} cx="24" cy="24" r="21" />
      <circle {...pointMark} cx="22.5" cy="25.5" r="8" />
      <circle {...pointMark} cx="22.5" cy="25.5" r="3" />
      {/* The arrow flies in from the upper right. */}
      <path {...pointMark} d="m22.5 25.5 11-11" />
      <path {...pointMark} d="M30.5 13.5h5v5" />
    </svg>
  );
}

/** A bar chart with a rising arrow — staying connected to the goal. */
function PointGrowthIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <circle {...pointRing} cx="24" cy="24" r="21" />
      <path {...pointMark} d="M15 32V26M21 32v-9M27 32V20M33 32v-5" />
      <path {...pointMark} d="m15 22 6-5 6 3 7-6" />
      <path {...pointMark} d="M30.5 13.5h4v4" />
    </svg>
  );
}

export const pointIcons = {
  compass: PointCompassIcon,
  target: PointTargetIcon,
  growth: PointGrowthIcon,
} as const;

export type PointIconName = keyof typeof pointIcons;

/* ========================================================================== */
/* SECTION 3 — PRODUCT-UI ICONS                                               */
/* ========================================================================== */

/*
  The small glyphs inside the mockup. They render at 14-20px, so they are drawn
  lighter than the display icons above — a 1.6 stroke on a 24-box reads as a
  hairline at that size without disappearing.
*/
const uiStroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** A magnifying glass — the search field. */
export function SearchIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle {...uiStroke} cx="11" cy="11" r="6.5" />
      <path {...uiStroke} d="m16 16 4.5 4.5" />
    </svg>
  );
}

/** Two figures — the "For you" feed heading. */
export function PeopleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle {...uiStroke} cx="9.5" cy="8" r="3.25" />
      <path {...uiStroke} d="M3.5 19.5a6 6 0 0 1 12 0" />
      <path
        {...uiStroke}
        d="M16 5.5a3.25 3.25 0 0 1 0 6M17.5 14.2a6 6 0 0 1 3 5.3"
      />
    </svg>
  );
}

/** A bookmark — saving a feed item. */
export function BookmarkIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path {...uiStroke} d="M6.5 4.5h11v15l-5.5-4-5.5 4z" />
    </svg>
  );
}

/** A chevron — the disclosure on the user menu and the mentor row. */
export function ChevronIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path {...uiStroke} d="m8 5 7 7-7 7" />
    </svg>
  );
}

/** A circled "i" — the readiness card's info affordance. */
export function InfoIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle {...uiStroke} cx="12" cy="12" r="9" />
      <path {...uiStroke} d="M12 11v5.5" />
      <circle cx="12" cy="7.75" r="1.1" fill="currentColor" />
    </svg>
  );
}

/** A four-point spark — the Next Best Action marker. */
export function SparkIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M12 2.5c.6 4.6 2.4 6.4 7 7-4.6.6-6.4 2.4-7 7-.6-4.6-2.4-6.4-7-7 4.6-.6 6.4-2.4 7-7Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** A calendar — the mentor session. */
export function CalendarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect {...uiStroke} x="3.5" y="5.5" width="17" height="15" rx="2.5" />
      <path {...uiStroke} d="M3.5 10h17M8.5 3.5v4M15.5 3.5v4" />
    </svg>
  );
}

/** A database cylinder with a lens — the challenge thumbnail's motif. */
export function DatabaseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <ellipse {...uiStroke} cx="11" cy="6" rx="6.5" ry="2.75" />
      <path {...uiStroke} d="M4.5 6v6c0 1.5 2.9 2.75 6.5 2.75" />
      <path {...uiStroke} d="M17.5 6v4.5" />
      <circle {...uiStroke} cx="16" cy="16" r="3.5" />
      <path {...uiStroke} d="m18.6 18.6 2.4 2.4" />
    </svg>
  );
}

/** A bar chart — the Power BI thumbnail's motif. */
export function ChartIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path {...uiStroke} d="M4 20h16" />
      <path {...uiStroke} d="M7 20v-6M12 20V8M17 20v-9" />
      <path {...uiStroke} d="m6 10 6-5 6 3" />
    </svg>
  );
}

/** A node graph — the SQL joins thumbnail's motif. */
export function SchemaIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect {...uiStroke} x="2.5" y="3" width="7" height="5.5" rx="1.25" />
      <rect {...uiStroke} x="14.5" y="8" width="7" height="5.5" rx="1.25" />
      <rect {...uiStroke} x="4.5" y="15" width="7" height="5.5" rx="1.25" />
      <path {...uiStroke} d="M9.5 5.75h2.75v5h2.25M8 13.5v1.5" />
    </svg>
  );
}

/* ========================================================================== */
/* SECTION 4 — POINT ICONS                                                    */
/* ========================================================================== */

/*
  Section 4 reuses the target and growth marks from section 3, but draws them
  in teal line-work on a light ground rather than inside a coral ring — so they
  are redrawn here at display weight instead of being re-toned. The shield is
  new to this section.
*/
const doingStroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const doingAccent = {
  fill: "none",
  stroke: "var(--doing-accent, #f24535)",
  strokeWidth: 2.2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** A target with a coral arrow through it — practise in context. */
function DoingTargetIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" {...props}>
      <circle {...doingStroke} cx="18" cy="22" r="13.5" />
      <circle {...doingStroke} cx="18" cy="22" r="8" />
      <circle {...doingStroke} cx="18" cy="22" r="2.75" />
      {/* The arrow flies in from the upper right. */}
      <path {...doingAccent} d="m18 22 14-14" />
      <path {...doingAccent} d="M26.5 6.5h7v7" />
    </svg>
  );
}

/** Bars under a rising coral arrow — build through projects. */
function DoingGrowthIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" {...props}>
      <path {...doingStroke} d="M5 34h30" />
      <path {...doingStroke} d="M10 34V22M18 34V15M26 34v-9M34 34V11" />
      <path {...doingAccent} d="m9 19 8-8 7 5 10-11" />
      <path {...doingAccent} d="M27 5h7v7" />
    </svg>
  );
}

/** A shield with a coral tick — create credible evidence. */
function DoingShieldIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" {...props}>
      <path
        {...doingStroke}
        d="M20 3.5 6.5 8.75v10.5c0 8 5.4 13.9 13.5 17.25 8.1-3.35 13.5-9.25 13.5-17.25V8.75Z"
      />
      <path {...doingAccent} d="m13.5 20 4.5 4.5 8.5-9" />
    </svg>
  );
}

export const doingIcons = {
  target: DoingTargetIcon,
  growth: DoingGrowthIcon,
  shield: DoingShieldIcon,
} as const;

export type DoingIconName = keyof typeof doingIcons;

/* ========================================================================== */
/* SECTION 4 — PROJECT-UI MARKS                                               */
/* ========================================================================== */

/** A filled disc carrying a tick — a completed milestone. */
export function MilestoneDoneIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="11" fill="currentColor" />
      <path
        d="m7.5 12.25 3 3 6-6.5"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** A ring around a solid centre — the milestone in progress. */
export function MilestoneCurrentIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle
        cx="12"
        cy="12"
        r="10.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="12" cy="12" r="4.5" fill="currentColor" />
    </svg>
  );
}

/** A circled tick — one line of the evidence list. */
export function CheckBadgeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="10" fill="currentColor" />
      <path
        d="m8 12.25 2.75 2.75L16 9.5"
        fill="none"
        stroke="#fff"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** A certificate page with a seal — the evidence card's marker. */
export function CertificateIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        {...uiStroke}
        d="M17 3.5H6.5A1.5 1.5 0 0 0 5 5v14a1.5 1.5 0 0 0 1.5 1.5H12"
      />
      <path {...uiStroke} d="M17 3.5V9h-5" />
      <path {...uiStroke} d="M8 11h5M8 14.5h3" />
      <circle {...uiStroke} cx="17" cy="16" r="3.5" />
      <path {...uiStroke} d="m15 19 .5 3 1.5-1 1.5 1 .5-3" />
    </svg>
  );
}

/* ========================================================================== */
/* SECTION 5 — POINT ICONS                                                    */
/* ========================================================================== */

/*
  The three claims, each a coral outline on the dark ground. Drawn on a 48-box
  with no enclosing ring of their own — unlike section 3's, the design here
  rings only the first and third, and the mark itself carries the meaning.
*/
const guideStroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** Two figures behind a magnifier — finding the right mentor. */
function MentorSearchIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <circle {...guideStroke} cx="24" cy="24" r="21" />
      <circle {...guideStroke} cx="19" cy="17.5" r="4.5" />
      <path {...guideStroke} d="M27.5 14.5a4.5 4.5 0 0 1 0 6" />
      <path {...guideStroke} d="M11.5 31.5a7.5 7.5 0 0 1 13.2-4.8" />
      <circle {...guideStroke} cx="27.5" cy="30" r="5" />
      <path {...guideStroke} d="m31.2 33.7 4.3 4.3" />
    </svg>
  );
}

/** A target with an arrow — turning conversations into progress. */
function GuideTargetIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <circle {...guideStroke} cx="24" cy="24" r="21" />
      <circle {...guideStroke} cx="22.5" cy="25.5" r="9" />
      <circle {...guideStroke} cx="22.5" cy="25.5" r="3.5" />
      <path {...guideStroke} d="m22.5 25.5 12-12" />
      <path {...guideStroke} d="M30.5 12.5h5.5V18" />
    </svg>
  );
}

/** A speech bubble with an ellipsis — getting unstuck. */
function GuideChatIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <circle {...guideStroke} cx="24" cy="24" r="21" />
      <path
        {...guideStroke}
        d="M34.5 23c0 5-4.7 9-10.5 9-1.3 0-2.6-.2-3.7-.6L13.5 34l2.2-5.3A8.6 8.6 0 0 1 13.5 23c0-5 4.7-9 10.5-9s10.5 4 10.5 9Z"
      />
      <circle cx="19.5" cy="23" r="1.5" fill="currentColor" />
      <circle cx="24" cy="23" r="1.5" fill="currentColor" />
      <circle cx="28.5" cy="23" r="1.5" fill="currentColor" />
    </svg>
  );
}

export const guidanceIcons = {
  mentorSearch: MentorSearchIcon,
  target: GuideTargetIcon,
  chat: GuideChatIcon,
} as const;

export type GuidanceIconName = keyof typeof guidanceIcons;

/* ========================================================================== */
/* SECTION 5 — WORKSPACE MARKS                                                */
/* ========================================================================== */

/** A single figure — the student asking the question. */
export function AvatarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="12" cy="8.5" r="3.75" fill="currentColor" />
      <path d="M4.75 20.5a7.25 7.25 0 0 1 14.5 0Z" fill="currentColor" />
    </svg>
  );
}

/** A document page — one of the AI answer's cited sources. */
export function SourceIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        {...uiStroke}
        d="M14 3.5H7A1.5 1.5 0 0 0 5.5 5v14A1.5 1.5 0 0 0 7 20.5h10a1.5 1.5 0 0 0 1.5-1.5V8Z"
      />
      <path {...uiStroke} d="M14 3.5V8h4.5" />
      <path {...uiStroke} d="M8.5 12.5h7M8.5 16h4.5" />
    </svg>
  );
}

/** An arrow in a disc — the composer's send control. */
export function SendIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="11" fill="currentColor" />
      <path
        d="M12 17V7.5M8 11.5 12 7.5l4 4"
        fill="none"
        stroke="#fff"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** A five-point star — the mentor's rating. */
export function StarFilledIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="m12 3 2.75 5.6 6.25.9-4.5 4.4 1.05 6.1L12 17.1 6.45 20l1.05-6.1L3 9.5l6.25-.9z"
        fill="currentColor"
      />
    </svg>
  );
}

/** A downward arrow — the pill pointing into the mentor-AI card. */
export function ArrowDownIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path {...uiStroke} d="M12 4.5v15M6.5 14 12 19.5 17.5 14" />
    </svg>
  );
}

/* ========================================================================== */
/* SECTION 6 — POINT ICONS                                                    */
/* ========================================================================== */

/*
  The three claims, drawn in teal line-work on the section's soft mint tiles.
  Heavier than the workspace glyphs because they render at ~32px.
*/
const passportStroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** A document carrying a tick — evidence, not a completion record. */
function PassportDocumentIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <path
        {...passportStroke}
        d="M19 4H9a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V10Z"
      />
      <path {...passportStroke} d="M19 4v6h6" />
      <path {...passportStroke} d="M11 15h6M11 19h4" />
      <circle {...passportStroke} cx="20.5" cy="21.5" r="4.5" />
      <path {...passportStroke} d="m18.5 21.5 1.5 1.5 2.5-3" />
    </svg>
  );
}

/** A bar chart under a rising arrow — readiness developing over time. */
function PassportGrowthIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <path {...passportStroke} d="M5 27h22" />
      <path {...passportStroke} d="M9 27v-8M15 27v-12M21 27v-7M27 27v-15" />
      <path {...passportStroke} d="m8 16 6-6 5 4 8-9" />
      <path {...passportStroke} d="M22 5h5v5" />
    </svg>
  );
}

/** A briefcase — showing employers more than a résumé. */
function PassportBriefcaseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <rect {...passportStroke} x="4" y="10" width="24" height="17" rx="2.5" />
      <path
        {...passportStroke}
        d="M11.5 10V7.5A2.5 2.5 0 0 1 14 5h4a2.5 2.5 0 0 1 2.5 2.5V10"
      />
      <path {...passportStroke} d="M4 17.5h24" />
      <path {...passportStroke} d="M14 17.5h4" />
    </svg>
  );
}

export const passportIcons = {
  document: PassportDocumentIcon,
  growth: PassportGrowthIcon,
  briefcase: PassportBriefcaseIcon,
} as const;

export type PassportIconName = keyof typeof passportIcons;

/* ========================================================================== */
/* SECTION 6 — PASSPORT MARKS                                                 */
/* ========================================================================== */

/*
  The trend arrows on the skill tiles. Solid triangles, as the design draws
  them: up is green, down is red, and flat is a right-pointing amber marker.
*/
export function TrendUpIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" {...props}>
      <path d="M8 3.5 14 12.5H2z" fill="currentColor" />
    </svg>
  );
}

export function TrendDownIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" {...props}>
      <path d="M8 12.5 2 3.5h12z" fill="currentColor" />
    </svg>
  );
}

export function TrendFlatIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" {...props}>
      <path d="M12.5 8 3.5 14V2z" fill="currentColor" />
    </svg>
  );
}

export const trendIcons = {
  up: TrendUpIcon,
  down: TrendDownIcon,
  flat: TrendFlatIcon,
} as const;

export type TrendName = keyof typeof trendIcons;

/** A small solid star — the skill the passport is focused on. */
export function StarSmallIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" {...props}>
      <path
        d="m8 1.5 1.85 3.75 4.15.6-3 2.93.71 4.12L8 10.95 4.29 12.9 5 8.78 2 5.85l4.15-.6z"
        fill="currentColor"
      />
    </svg>
  );
}

/** A clock — the CPD hours chip. */
export function ClockIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle {...uiStroke} cx="12" cy="12" r="9" />
      <path {...uiStroke} d="M12 7v5.25l3.25 2" />
    </svg>
  );
}

/** A single figure — the mentor-validation chip. */
export function PersonIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle {...uiStroke} cx="12" cy="8.5" r="3.75" />
      <path {...uiStroke} d="M5 20.5a7 7 0 0 1 14 0" />
    </svg>
  );
}

/** A briefcase at UI weight — the opportunity card's marker. */
export function BriefcaseSmallIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect {...uiStroke} x="3" y="7.5" width="18" height="13" rx="2" />
      <path {...uiStroke} d="M8.5 7.5V6A2 2 0 0 1 10.5 4h3a2 2 0 0 1 2 2v1.5" />
      <path {...uiStroke} d="M3 13h18" />
    </svg>
  );
}

/** A target with an arrow — the next-best-step marker. */
export function NextStepIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle
        cx="11"
        cy="13"
        r="7.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle
        cx="11"
        cy="13"
        r="3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="m11 13 8-8M15.5 4.5H20V9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
