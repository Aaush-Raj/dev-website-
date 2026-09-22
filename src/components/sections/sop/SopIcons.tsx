import type { SVGProps } from "react";

/**
 * LURNYSOP ICONS
 * ---------------------------------------------------------------------------
 * The glyphs inside section 1's readiness panel — one per framework tile, plus
 * the marks the panel's chrome needs.
 *
 * Redrawn as transparent SVG inheriting `currentColor` rather than cropped out
 * of the supplied PNG. The comp bakes each glyph onto its own tinted disc, so
 * a crop would carry that disc as a square edge against the tile; drawing them
 * lets the tile own the disc and lets each glyph take its framework's colour.
 *
 * They render at 18-22px, so the geometry is kept simple and the strokes stay
 * on a 24-unit grid for even weight.
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
/* FRAMEWORK GLYPHS                                                           */
/* ========================================================================== */

/** A document with a folded corner: ISO 27001, the information-security set. */
function DocumentIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path {...stroke} d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path {...stroke} d="M14 3v5h5" />
      <path {...stroke} d="M9 13h6M9 17h4" />
    </svg>
  );
}

/** A closed padlock: GDPR, personal-data protection. */
function LockIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect {...stroke} x="4.5" y="10.5" width="15" height="10" rx="2.5" />
      <path {...stroke} d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
      <path {...stroke} d="M12 14.5v2" />
    </svg>
  );
}

/** A shield: SOC 2, the trust-services criteria. */
function ShieldIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        {...stroke}
        d="M12 3.2 5 6v6.2c0 4.2 2.9 7.2 7 8.6 4.1-1.4 7-4.4 7-8.6V6z"
      />
    </svg>
  );
}

/** A document with a pen stroke: DPDP, the data-protection notices. */
function PolicyIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        {...stroke}
        d="M13.5 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-8.5"
      />
      <path {...stroke} d="M9 12h4M9 16h3" />
      <path {...stroke} d="m16.5 3.6 3.9 3.9-4.3 4.3-3.9-.1.1-3.8z" />
    </svg>
  );
}

/** Three figures: ISO 27701, privacy information management. */
function PeopleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle {...stroke} cx="12" cy="7.5" r="2.8" />
      <path {...stroke} d="M7.5 19.5a4.5 4.5 0 0 1 9 0" />
      <circle {...stroke} cx="5" cy="10.5" r="2.1" />
      <circle {...stroke} cx="19" cy="10.5" r="2.1" />
      <path {...stroke} d="M2 18.5a3.2 3.2 0 0 1 3.6-3.1M22 18.5a3.2 3.2 0 0 0-3.6-3.1" />
    </svg>
  );
}

/** A processor die: ISO 42001, the AI management system. */
function ChipIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect {...stroke} x="6.5" y="6.5" width="11" height="11" rx="2.4" />
      <path {...stroke} d="m10 10 4 4M14 10l-4 4" />
      <path
        {...stroke}
        d="M10 6.5V4M14 6.5V4M10 20v-2.5M14 20v-2.5M6.5 10H4M6.5 14H4M20 10h-2.5M20 14h-2.5"
      />
    </svg>
  );
}

/**
 * The glyph for each framework tile, keyed by the `id` in the content file.
 * Adding a framework there without adding its glyph here is a type error, not
 * a silently missing icon — see the lookup's typing in SopReadinessPanel.
 */
export const frameworkIcons = {
  iso27001: DocumentIcon,
  gdpr: LockIcon,
  soc2: ShieldIcon,
  dpdp: PolicyIcon,
  iso27701: PeopleIcon,
  iso42001: ChipIcon,
} as const;

export type FrameworkIconKey = keyof typeof frameworkIcons;

/* ========================================================================== */
/* SECTION 2 — CHALLENGE GLYPHS                                               */
/* ========================================================================== */

/*
 * These four render at ~34px, larger and lighter than the framework marks
 * above, so they carry their own stroke weight rather than sharing `stroke`.
 */
const outline = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** A document with arrows leaving it: requirements turning into action. */
function TranslateIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <path
        {...outline}
        d="M18 3.5H7.5a2 2 0 0 0-2 2v17a2 2 0 0 0 2 2H13"
      />
      <path {...outline} d="M18 3.5 23.5 9v4" />
      <path {...outline} d="M9.5 9.5h5M9.5 14h8M9.5 18.5h4" />
      {/* The two arrows peeling off to the right. */}
      <path {...outline} d="M17.5 17h7.5M22 14l3 3-3 3" />
      <path {...outline} d="M15 25.5h7.5M19.5 22.5l3 3-3 3" />
    </svg>
  );
}

/** A person beside a checklist: who is responsible for what. */
function ResponsibilityIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <circle {...outline} cx="10" cy="9" r="4.2" />
      <path {...outline} d="M3 24.5a7 7 0 0 1 14 0" />
      <rect {...outline} x="18.5" y="6.5" width="11" height="19" rx="2.2" />
      <circle {...outline} cx="22" cy="12" r="0.9" />
      <circle {...outline} cx="22" cy="16" r="0.9" />
      <circle {...outline} cx="22" cy="20" r="0.9" />
      <path {...outline} d="M25 12h2.5M25 16h2.5M25 20h2.5" />
    </svg>
  );
}

/** Two folders joined by a link: evidence scattered across systems. */
function EvidenceIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <path
        {...outline}
        d="M16.5 22.5H6a1.8 1.8 0 0 1-1.8-1.8V7.3A1.8 1.8 0 0 1 6 5.5h4.4l2 2.6h5.4a1.8 1.8 0 0 1 1.8 1.8v2.6"
      />
      <path
        {...outline}
        d="M15.5 26.5h10a1.8 1.8 0 0 0 1.8-1.8v-9.4a1.8 1.8 0 0 0-1.8-1.8h-9"
      />
      {/* The chain link across the two. */}
      <path {...outline} d="M14.2 16.8a2.8 2.8 0 0 1 4 0l.6.6" />
      <path {...outline} d="M17.8 20.4a2.8 2.8 0 0 1-4 0l-.6-.6" />
    </svg>
  );
}

/** A magnifier beside a status list: reviewing what is ready. */
function ReadinessIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <circle {...outline} cx="11" cy="12.5" r="7.5" />
      <path {...outline} d="m16.6 18.2 5.4 6" />
      <circle {...outline} cx="24" cy="8" r="1.8" />
      <circle {...outline} cx="24" cy="15" r="1.8" />
      <circle {...outline} cx="24" cy="22" r="1.8" />
      <path {...outline} d="M28 8h1.5M28 15h1.5M28 22h1.5" />
    </svg>
  );
}

/**
 * The glyph for each challenge card, keyed by the `id` in the content file.
 * Typed the same way as `frameworkIcons` — a card added there without a glyph
 * here is a type error, not a blank corner.
 */
export const challengeIcons = {
  translate: TranslateIcon,
  responsibilities: ResponsibilityIcon,
  evidence: EvidenceIcon,
  readiness: ReadinessIcon,
} as const;

export type ChallengeIconKey = keyof typeof challengeIcons;

/* ========================================================================== */
/* SECTION 3 — STEP AND WORKFLOW GLYPHS                                       */
/* ========================================================================== */

/** Office blocks: starting from the company's own context. */
function CompanyIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <path {...outline} d="M4.5 28.5V10.5l8-4v22" />
      <path {...outline} d="M12.5 13.5h9a2 2 0 0 1 2 2v13" />
      <path {...outline} d="M23.5 19.5h4v9" />
      <path {...outline} d="M2.5 28.5h27" />
      <path {...outline} d="M7.5 13.5v2M7.5 19.5v2M16.5 18.5v2M16.5 23.5v2" />
    </svg>
  );
}

/** A document under a magnifier: reviewing what applies. */
function AppliesIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <path
        {...outline}
        d="M17.5 3.5H7a2 2 0 0 0-2 2v21a2 2 0 0 0 2 2h6"
      />
      <path {...outline} d="M17.5 3.5 23 9v3.5" />
      <path {...outline} d="M9 10.5h6M9 15h8M9 19.5h4" />
      <circle {...outline} cx="21.5" cy="21.5" r="5.5" />
      <path {...outline} d="m25.6 25.6 3.9 3.9" />
    </svg>
  );
}

/** A ticked checklist: the implementation plan. */
function PlanIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <rect {...outline} x="5.5" y="4.5" width="21" height="23" rx="2.5" />
      <path {...outline} d="m9.5 11.5 2 2 3.5-3.5" />
      <path {...outline} d="m9.5 18.5 2 2 3.5-3.5" />
      <path {...outline} d="M18.5 12h5M18.5 19h5" />
    </svg>
  );
}

/**
 * The glyph for each step in the context section, keyed by the `id` in the
 * content file.
 */
export const stepIcons = {
  company: CompanyIcon,
  applies: AppliesIcon,
  plan: PlanIcon,
} as const;

export type StepIconKey = keyof typeof stepIcons;

/* -------------------------------------------------------------------------- */
/* The workflow cards' own marks                                              */
/* -------------------------------------------------------------------------- */

/** Stacked layers: the LurnyFabric mark on card 1. */
export function FabricMarkIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="m12 2.6 9 4.6-9 4.6-9-4.6z"
        opacity="0.55"
      />
      <path fill="currentColor" d="m12 9.1 9 4.6-9 4.6-9-4.6z" opacity="0.8" />
      <path fill="currentColor" d="m12 15.1 9 4.6-9 4.6-9-4.6z" />
    </svg>
  );
}

/** An office block: the "Business" source. */
function SourceBusinessIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path {...stroke} d="M4 21V5.5a1.5 1.5 0 0 1 1.5-1.5h7A1.5 1.5 0 0 1 14 5.5V21" />
      <path {...stroke} d="M14 10h4.5A1.5 1.5 0 0 1 20 11.5V21" />
      <path {...stroke} d="M3 21h18" />
      <path {...stroke} d="M7 8h3M7 12h3M7 16h3M17 14h0M17 17.5h0" />
    </svg>
  );
}

/** A group: the "Departments" source. */
function SourceDepartmentsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle {...stroke} cx="12" cy="7" r="2.6" />
      <path {...stroke} d="M8 18a4 4 0 0 1 8 0" />
      <circle {...stroke} cx="5" cy="10" r="2" />
      <circle {...stroke} cx="19" cy="10" r="2" />
      <path {...stroke} d="M1.5 18a3 3 0 0 1 3.4-2.9M22.5 18a3 3 0 0 0-3.4-2.9" />
    </svg>
  );
}

/** A single figure: the "People" source. */
function SourcePeopleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle {...stroke} cx="12" cy="8" r="3.4" />
      <path {...stroke} d="M5.5 20a6.5 6.5 0 0 1 13 0" />
    </svg>
  );
}

/** A database: the "Systems" source. */
function SourceSystemsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <ellipse {...stroke} cx="12" cy="6" rx="7" ry="2.8" />
      <path {...stroke} d="M5 6v12c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8V6" />
      <path {...stroke} d="M5 12c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8" />
    </svg>
  );
}

/** The glyph for each LurnyFabric source tile. */
export const sourceIcons = {
  business: SourceBusinessIcon,
  departments: SourceDepartmentsIcon,
  people: SourcePeopleIcon,
  systems: SourceSystemsIcon,
} as const;

export type SourceIconKey = keyof typeof sourceIcons;

/** A magnifier: the "Framework review" card's mark. */
export function SearchMarkIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle {...stroke} cx="10.5" cy="10.5" r="6.5" strokeWidth={2.1} />
      <path {...stroke} d="m15.4 15.4 4.6 4.6" strokeWidth={2.1} />
    </svg>
  );
}

/** A clipboard: the "Implementation plan" card's mark. */
export function ClipboardMarkIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect {...stroke} x="4.5" y="4" width="15" height="17" rx="2.4" strokeWidth={2} />
      <rect {...stroke} x="9" y="2" width="6" height="3.6" rx="1.2" strokeWidth={2} />
      <path {...stroke} d="M8.5 11h1M8.5 15h1M12 11h4M12 15h3" strokeWidth={2} />
    </svg>
  );
}

/** A page: the plan's "Policy draft" row. */
function RowPolicyIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path {...stroke} d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path {...stroke} d="M14 3v5h5" />
      <path {...stroke} d="M9 13h6M9 17h4" />
    </svg>
  );
}

/** A figure: the plan's "Proposed owner" row. */
function RowOwnerIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle {...stroke} cx="12" cy="8" r="3.4" />
      <path {...stroke} d="M5.5 20a6.5 6.5 0 0 1 13 0" />
    </svg>
  );
}

/** A bulleted list: the plan's "Tasks" row. */
function RowTasksIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="5" cy="7" r="1.5" fill="currentColor" />
      <circle cx="5" cy="12" r="1.5" fill="currentColor" />
      <circle cx="5" cy="17" r="1.5" fill="currentColor" />
      <path {...stroke} d="M10 7h9M10 12h9M10 17h9" />
    </svg>
  );
}

/** A folder: the plan's "Evidence" row. */
function RowEvidenceIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        {...stroke}
        d="M4 19.5a1.5 1.5 0 0 1-1.5-1.5V6.5A1.5 1.5 0 0 1 4 5h4.6l2 2.6H20a1.5 1.5 0 0 1 1.5 1.5V18a1.5 1.5 0 0 1-1.5 1.5z"
      />
    </svg>
  );
}

/** The glyph for each row of the implementation-plan card. */
export const planRowIcons = {
  policy: RowPolicyIcon,
  owner: RowOwnerIcon,
  tasks: RowTasksIcon,
  evidence: RowEvidenceIcon,
} as const;

export type PlanRowIconKey = keyof typeof planRowIcons;

/** A right chevron: the plan card's footer affordance. */
export function ChevronRightIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path {...stroke} d="m9.5 5.5 7 6.5-7 6.5" strokeWidth={2.2} />
    </svg>
  );
}

/* ========================================================================== */
/* SECTION 4 — FLOW-OF-WORK GLYPHS                                            */
/* ========================================================================== */

/** A document: following the approved process. */
function ProcessIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <path
        {...outline}
        d="M19 3.5H8a2.5 2.5 0 0 0-2.5 2.5v20A2.5 2.5 0 0 0 8 28.5h16a2.5 2.5 0 0 0 2.5-2.5V11z"
      />
      <path {...outline} d="M19 3.5V11h7.5" />
      <path {...outline} d="M10.5 10h4M10.5 16h11M10.5 21h11" />
    </svg>
  );
}

/** A chain link: evidence captured and connected. */
function LinkIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <path
        {...outline}
        d="M13 19a5.5 5.5 0 0 0 8 0l4-4a5.5 5.5 0 0 0-8-8l-2 2"
      />
      <path
        {...outline}
        d="M19 13a5.5 5.5 0 0 0-8 0l-4 4a5.5 5.5 0 0 0 8 8l2-2"
      />
    </svg>
  );
}

/** An exclamation in a circle: gaps that need attention. */
function GapIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <circle {...outline} cx="16" cy="16" r="12.5" />
      <path {...outline} d="M16 9.5v9" />
      <circle cx="16" cy="22.5" r="1.4" fill="currentColor" />
    </svg>
  );
}

/** A shield with a tick: reviews and audits. */
function AuditIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <path
        {...outline}
        d="M16 3.2 5.5 7.4v9.2c0 6.3 4.3 10.8 10.5 12.2 6.2-1.4 10.5-5.9 10.5-12.2V7.4z"
      />
      <path {...outline} d="m11.5 15.8 3.3 3.3 6-6.4" />
    </svg>
  );
}

/**
 * The glyph for each flow-of-work benefit, keyed by the `id` in the content
 * file.
 */
export const benefitIcons = {
  process: ProcessIcon,
  evidence: LinkIcon,
  gaps: GapIcon,
  reviews: AuditIcon,
} as const;

export type BenefitIconKey = keyof typeof benefitIcons;

/* ========================================================================== */
/* SECTION 5 — CONNECTED-FRAMEWORK GLYPHS                                     */
/* ========================================================================== */

/** Three linked nodes: one process reaching several frameworks. */
function CoverageIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <circle {...outline} cx="16" cy="6.5" r="3.4" />
      <circle {...outline} cx="6.5" cy="24" r="3.4" />
      <circle {...outline} cx="25.5" cy="24" r="3.4" />
      <path {...outline} d="m14.3 9.6-6 11.5M17.7 9.6l6 11.5M10 24h12" />
    </svg>
  );
}

/** A chain link: evidence captured once and reused. */
function ReuseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <path
        {...outline}
        d="M13 19a5.5 5.5 0 0 0 8 0l4-4a5.5 5.5 0 0 0-8-8l-2 2"
      />
      <path
        {...outline}
        d="M19 13a5.5 5.5 0 0 0-8 0l-4 4a5.5 5.5 0 0 0 8 8l2-2"
      />
    </svg>
  );
}

/** Two arrows in a cycle: each audit feeding the next. */
function CycleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <path {...outline} d="M5.5 16a10.5 10.5 0 0 1 17.9-7.4" />
      <path {...outline} d="M26.5 16a10.5 10.5 0 0 1-17.9 7.4" />
      <path {...outline} d="M23.5 3.5v5.4h-5.4" />
      <path {...outline} d="M8.5 28.5v-5.4h5.4" />
    </svg>
  );
}

/** A boxed checklist: what is covered and what still needs action. */
function CoveredIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <rect {...outline} x="4.5" y="4.5" width="23" height="23" rx="3" />
      <path {...outline} d="m9.5 12.5 2.2 2.2 3.8-4" />
      <path {...outline} d="m9.5 21.5 2.2 2.2 3.8-4" />
      <path {...outline} d="M19 13h4.5M19 22h4.5" />
    </svg>
  );
}

/**
 * The glyph for each point in the connected-frameworks section, keyed by the
 * `id` in the content file.
 */
export const sharedIcons = {
  coverage: CoverageIcon,
  once: ReuseIcon,
  next: CycleIcon,
  gaps: CoveredIcon,
} as const;

export type SharedIconKey = keyof typeof sharedIcons;

/** A page: the rows inside the diagram's cards. */
export function DiagramDocIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path {...stroke} d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path {...stroke} d="M14 3v5h5" />
      <path {...stroke} d="M8.5 13h7M8.5 16.5h4.5" />
    </svg>
  );
}

/** A plus in a circle: the "additional checks" row. */
export function DiagramPlusIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle {...stroke} cx="12" cy="12" r="8.5" />
      <path {...stroke} d="M12 8v8M8 12h8" />
    </svg>
  );
}

/* ========================================================================== */
/* SECTION 6 — FORM POINT GLYPHS                                              */
/* ========================================================================== */

/** A clock: how long the session takes. */
function FormClockIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <circle {...outline} cx="16" cy="16" r="12.5" />
      <path {...outline} d="M16 8.5V16l5 3" />
    </svg>
  );
}

/** Two linked pages: the requirements, gaps and next steps to explore. */
function FormDocumentsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <rect {...outline} x="4.5" y="4.5" width="16" height="16" rx="3" />
      <path
        {...outline}
        d="M11.5 27.5h13a3 3 0 0 0 3-3v-13"
      />
    </svg>
  );
}

/** The glyph for each point beside the form, keyed by the content file. */
export const formPointIcons = {
  clock: FormClockIcon,
  documents: FormDocumentsIcon,
} as const;

export type FormPointIconKey = keyof typeof formPointIcons;

/* ========================================================================== */
/* PANEL CHROME                                                               */
/* ========================================================================== */

/** A ticked box: the marker on the "your next step" card. */
export function TaskCheckIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect {...stroke} x="4" y="4" width="16" height="16" rx="3.5" />
      <path {...stroke} d="m8.5 12.2 2.6 2.6 4.6-5" />
    </svg>
  );
}

/** A chevron: the workspace selector's affordance. */
export function ChevronDownIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path {...stroke} d="m6 9.5 6 6 6-6" />
    </svg>
  );
}

/** The arrow used by the hero's secondary button and the panel's link. */
export function ArrowRightIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path {...stroke} d="M4.5 12h15M13 5.5l6.5 6.5-6.5 6.5" />
    </svg>
  );
}
