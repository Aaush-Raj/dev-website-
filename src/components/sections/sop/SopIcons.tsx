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
