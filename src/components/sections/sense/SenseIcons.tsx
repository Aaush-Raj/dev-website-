import type { SVGProps } from "react";

/**
 * LURNYSENSE ICONS
 * ---------------------------------------------------------------------------
 * The glyphs inside section 1's dashboard and conversation.
 *
 * The supplied icon set is PNG with its own dark backing baked in, which would
 * show as a square against the panels these sit on. They are redrawn here as
 * transparent SVG inheriting currentColor, so a panel can tone them and they
 * stay crisp at the 14-20px they render at.
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
/* DASHBOARD RAIL                                                             */
/* ========================================================================== */

/** Bars of differing height: the overview. */
function OverviewIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path {...stroke} d="M5 20V11M12 20V4M19 20v-6" />
    </svg>
  );
}

/** A cursor over a card: engagement. */
function EngagementIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect {...stroke} x="3.5" y="4.5" width="17" height="15" rx="2.5" />
      <path {...stroke} d="m10 10 5.5 5.5M10 10v4.5M10 10h4.5" />
    </svg>
  );
}

/** A document: content. */
function ContentIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        {...stroke}
        d="M14.5 3.5H7A1.5 1.5 0 0 0 5.5 5v14A1.5 1.5 0 0 0 7 20.5h10a1.5 1.5 0 0 0 1.5-1.5V7.5Z"
      />
      <path {...stroke} d="M14.5 3.5V7.5h4" />
      <path {...stroke} d="M8.5 12h7M8.5 15.5h4.5" />
    </svg>
  );
}

/** A ribboned award: skills. */
function SkillsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle {...stroke} cx="12" cy="9" r="5.5" />
      <path {...stroke} d="m8.5 13.5-1 7 4.5-2.5 4.5 2.5-1-7" />
    </svg>
  );
}

export const railIcons = {
  overview: OverviewIcon,
  engagement: EngagementIcon,
  content: ContentIcon,
  skills: SkillsIcon,
} as const;

export type RailIconName = keyof typeof railIcons;

/* ========================================================================== */
/* STAT TILES                                                                 */
/* ========================================================================== */

/** A page: the assignments count. */
function ReportIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        {...stroke}
        d="M14.5 3.5H7A1.5 1.5 0 0 0 5.5 5v14A1.5 1.5 0 0 0 7 20.5h10a1.5 1.5 0 0 0 1.5-1.5V7.5Z"
      />
      <path {...stroke} d="M14.5 3.5V7.5h4" />
      <path {...stroke} d="M8.5 13h7M8.5 16.5h4.5" />
    </svg>
  );
}

/** Two figures: the completed count. */
function PeopleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle {...stroke} cx="9" cy="8.5" r="3.25" />
      <path {...stroke} d="M3.5 19.5a5.5 5.5 0 0 1 11 0" />
      <path
        {...stroke}
        d="M16 5.75a3.25 3.25 0 0 1 0 5.5M17 14.5a5.5 5.5 0 0 1 3.5 5"
      />
    </svg>
  );
}

/** A rising line: the average score. */
function ChartIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path {...stroke} d="M4 19h16" />
      <path {...stroke} d="m5 15 4.5-5 3.5 3L19 6" />
      <path {...stroke} d="M15.5 6H19v3.5" />
    </svg>
  );
}

export const statIcons = {
  report: ReportIcon,
  people: PeopleIcon,
  chart: ChartIcon,
} as const;

export type StatIconName = keyof typeof statIcons;

/* ========================================================================== */
/* CONVERSATION                                                               */
/* ========================================================================== */

/** A calendar: the period selector. */
export function CalendarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect {...stroke} x="3.5" y="5.5" width="17" height="15" rx="2.5" />
      <path {...stroke} d="M3.5 10h17M8.5 3.5v4M15.5 3.5v4" />
    </svg>
  );
}

/** A chevron: the period selector's disclosure, and the reports link. */
export function ChevronIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path {...stroke} d="m8 5 7 7-7 7" />
    </svg>
  );
}

/** A four-point sparkle: the assistant's answer. */
export function SparkleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M12 2.5c.55 4.4 2.35 6.2 6.75 6.75-4.4.55-6.2 2.35-6.75 6.75-.55-4.4-2.35-6.2-6.75-6.75 4.4-.55 6.2-2.35 6.75-6.75Z"
        fill="currentColor"
      />
      <path
        d="M18.5 15c.28 2.2 1.18 3.1 3.38 3.38-2.2.27-3.1 1.17-3.38 3.37-.27-2.2-1.17-3.1-3.37-3.37 2.2-.28 3.1-1.18 3.37-3.38Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Small bars: the score-distribution heading. */
export function BarsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path {...stroke} d="M5 20v-7M12 20V7M19 20v-4" />
    </svg>
  );
}

/** A magnifier: the composer. */
export function SearchIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle {...stroke} cx="11" cy="11" r="6.5" />
      <path {...stroke} d="m16 16 4.5 4.5" />
    </svg>
  );
}

/** A paper plane: the send control. */
export function SendIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path {...stroke} d="M21 3 10.5 13.5M21 3l-6.75 18-3.75-7.5L3 9.75Z" />
    </svg>
  );
}

/** A tray with an arrow: saving the report. */
export function SaveIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path {...stroke} d="M12 3.5v10M8 10l4 4 4-4" />
      <path {...stroke} d="M4.5 16.5v2a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-2" />
    </svg>
  );
}

/** A circled tick: the report's availability. */
export function CheckIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="9.5" fill="currentColor" />
      <path
        d="m8 12.25 2.75 2.75L16 9.5"
        fill="none"
        stroke="#0f1517"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** A document: the team-reports heading. */
export function ReportDocIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        {...stroke}
        d="M14.5 3.5H7A1.5 1.5 0 0 0 5.5 5v14A1.5 1.5 0 0 0 7 20.5h10a1.5 1.5 0 0 0 1.5-1.5V7.5Z"
      />
      <path {...stroke} d="M14.5 3.5V7.5h4" />
      <path {...stroke} d="M8.5 12.5h7M8.5 16h4.5" />
    </svg>
  );
}

/** An arrow: the "explore" button and the reports link. */
export function ArrowRightIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M4 12h15M13 6l6 6-6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ========================================================================== */
/* SECTION 2 — PROBLEM TILES                                                  */
/* ========================================================================== */

/*
  The three symptom glyphs. Each is green line-work with one gold accent,
  matching the supplied tiles — drawn rather than shipped, since those PNGs are
  ~96px and carry their own light backing that would show against this ground.

  The outlined tile is part of the CARD, not the glyph, so it is drawn by the
  caller and these stay transparent.
*/
const senseGreen = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const senseGold = {
  fill: "none",
  stroke: "var(--sense-accent, #b58730)",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** A chart with a question mark: questions beyond the dashboard. */
function DashboardQuestionIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <rect {...senseGreen} x="4" y="5" width="19" height="17" rx="2.5" />
      <path {...senseGreen} d="M9 17.5v-4M13.5 17.5v-7M18 17.5v-2.5" />
      {/* The gold query badge sits over the chart's lower-right. */}
      <circle {...senseGold} cx="23" cy="22" r="6" />
      <path
        {...senseGold}
        d="M21.4 20.4a1.7 1.7 0 0 1 3.2.8c0 1.1-1.6 1.2-1.6 2.2"
      />
      <circle cx="23" cy="25.2" r="0.85" fill="var(--sense-accent, #b58730)" />
    </svg>
  );
}

/** A document with a clock: follow-ups become reporting requests. */
function ReportWaitIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <path {...senseGreen} d="M18.5 4H8a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h9" />
      <path {...senseGreen} d="M18.5 4 24 9.5V14" />
      <path {...senseGreen} d="M10 12h8M10 16h5" />
      {/* The gold clock, marking the wait. */}
      <circle {...senseGold} cx="22.5" cy="22.5" r="6" />
      <path {...senseGold} d="M22.5 19.2v3.3l2.2 1.4" />
    </svg>
  );
}

/** A folder with a magnifier: useful analysis is hard to reuse. */
function FindAnalysisIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <path
        {...senseGreen}
        d="M4 9.5a2 2 0 0 1 2-2h5.5l2.5 3H26a2 2 0 0 1 2 2V24a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"
      />
      {/* The gold magnifier, searching the folder. */}
      <circle {...senseGold} cx="15" cy="18" r="4.5" />
      <path {...senseGold} d="m18.4 21.4 3.6 3.6" />
    </svg>
  );
}

export const problemIcons = {
  dashboardQuestion: DashboardQuestionIcon,
  reportWait: ReportWaitIcon,
  findAnalysis: FindAnalysisIcon,
} as const;

export type ProblemIconName = keyof typeof problemIcons;

/* ========================================================================== */
/* SECTION 2 — CAPABILITY MARKS                                               */
/* ========================================================================== */

/** Rising bars: standard analytics. */
function AnalyticsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect x="3.5" y="12" width="4" height="8" rx="1" fill="currentColor" />
      <rect x="10" y="8" width="4" height="12" rx="1" fill="currentColor" />
      <rect x="16.5" y="4" width="4" height="16" rx="1" fill="currentColor" />
    </svg>
  );
}

/** A speech bubble: conversational exploration. */
function ConversationIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        {...senseGreen}
        d="M20.5 11c0 4.1-3.8 7.5-8.5 7.5-1 0-2-.2-2.9-.5L4 20l1.5-3.8A7.2 7.2 0 0 1 3.5 11c0-4.1 3.8-7.5 8.5-7.5s8.5 3.4 8.5 7.5Z"
      />
    </svg>
  );
}

/** A document with lines: reusable team reports. */
function ReusableIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        {...senseGreen}
        d="M14.5 3.5H7A1.5 1.5 0 0 0 5.5 5v14A1.5 1.5 0 0 0 7 20.5h10a1.5 1.5 0 0 0 1.5-1.5V7.5Z"
      />
      <path {...senseGreen} d="M14.5 3.5V7.5h4" />
      <path {...senseGreen} d="M8.5 12h7M8.5 15.5h4.5" />
    </svg>
  );
}

export const capabilityIcons = {
  analytics: AnalyticsIcon,
  conversation: ConversationIcon,
  reusable: ReusableIcon,
} as const;

export type CapabilityIconName = keyof typeof capabilityIcons;

/** The gold quotation mark above the question card. */
export function QuoteMarkIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 24" aria-hidden="true" {...props}>
      <path
        d="M6.5 24C2.9 24 0 21.1 0 17.5 0 9.8 5.2 3 12.8 0l1.6 3.4C9.4 5.6 6.4 9 5.9 12.3c.2 0 .4-.1.6-.1 3.6 0 6.5 2.9 6.5 6.5S10.1 24 6.5 24Zm18.5 0c-3.6 0-6.5-2.9-6.5-6.5C18.5 9.8 23.7 3 31.3 0l1.6 3.4C27.9 5.6 24.9 9 24.4 12.3c.2 0 .4-.1.6-.1 3.6 0 6.5 2.9 6.5 6.5S28.6 24 25 24Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** A person: the follow-up bubble's avatar. */
export function UserIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle {...senseGreen} cx="12" cy="8.5" r="3.5" />
      <path {...senseGreen} d="M5 20a7 7 0 0 1 14 0" />
    </svg>
  );
}

/** A document with a tick: the saved report. */
export function SavedDocIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <path {...senseGreen} d="M18.5 4H8a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h9" />
      <path {...senseGreen} d="M18.5 4 24 9.5V13" />
      <path {...senseGreen} d="M10 12h8M10 16h5" />
      <circle {...senseGold} cx="22.5" cy="22.5" r="6" />
      <path {...senseGold} d="m20 22.6 1.9 1.9 3.4-3.9" />
    </svg>
  );
}

/** A horizontal ellipsis: a card's overflow control. */
export function MoreIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="5.5" cy="12" r="1.6" fill="currentColor" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" />
      <circle cx="18.5" cy="12" r="1.6" fill="currentColor" />
    </svg>
  );
}

/**
 * A leaf: the assistant's marker beside each answer in section 3's transcript.
 * Filled rather than stroked, so it reads at the 16px it renders at.
 */
export function LeafIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M20 4c-8.5 0-14 3.8-14 10a7.6 7.6 0 0 0 1.5 4.7l-2 2.6a1 1 0 0 0 1.6 1.2l2-2.6A8.6 8.6 0 0 0 12 21c6 0 8-5.6 8-17Z"
        opacity="0.92"
      />
    </svg>
  );
}

/* ========================================================================== */
/* SECTION 4 — THE DEMO POINTS                                                */
/* ========================================================================== */

/** A clock face: the "30 minutes" point. */
export function ClockIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle {...stroke} cx="12" cy="12" r="8.6" />
      <path {...stroke} d="M12 7.2V12l3.2 2" />
    </svg>
  );
}

/** Bars inside a speech bubble: questions becoming reports. */
export function ChartBubbleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        {...stroke}
        d="M20.5 12.4A7.9 7.9 0 0 1 12 20.3a8.7 8.7 0 0 1-3.3-.6L4 20.9l1.3-4.3a7.7 7.7 0 0 1-1.8-4.9A8 8 0 0 1 12 4a8 8 0 0 1 8.5 8.4Z"
      />
      <path {...stroke} d="M9 14.4v-2.2M12 14.4V9.8M15 14.4v-3.4" />
    </svg>
  );
}
