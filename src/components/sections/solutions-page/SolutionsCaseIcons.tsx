import type { SVGProps } from "react";

/**
 * SOLUTIONS — CASE-STUDY ICONS
 * ---------------------------------------------------------------------------
 * The glyphs on section 4's card: two beside the panel's meta rows, four in the
 * signal chips.
 *
 * The supplied set is PNG only, at 512px. They are redrawn here rather than
 * shipped because they render at ~20px: seven extra requests for artwork that
 * is a single stroked glyph each, when the same shapes cost nothing inline and
 * stay crisp at any density.
 *
 * The supplied icons sit on a lavender disc. That disc belongs to the CHIP, not
 * the glyph, so it is drawn by the caller — the icons here are transparent and
 * inherit currentColor.
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
/* PANEL META ICONS                                                           */
/* ========================================================================== */

/** A classical bank front: financial services. */
function FinancialIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path {...stroke} d="M3 9.5 12 4.5l9 5" />
      <path {...stroke} d="M5 9.5v9M9.5 9.5v9M14.5 9.5v9M19 9.5v9" />
      <path {...stroke} d="M3 18.5h18M4.5 21h15" />
    </svg>
  );
}

/** Two figures: the organisation. */
function OrganisationIcon(props: IconProps) {
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

/* ========================================================================== */
/* SIGNAL CHIP ICONS                                                          */
/* ========================================================================== */

/** A speech bubble: conversation quality. */
function QualityIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        {...stroke}
        d="M20.5 11.5c0 4.4-3.8 8-8.5 8-1 0-2-.2-2.9-.5L4 21l1.6-4.3a7.7 7.7 0 0 1-2.1-5.2c0-4.4 3.8-8 8.5-8s8.5 3.6 8.5 8Z"
      />
    </svg>
  );
}

/** A cube: product coverage. */
function CoverageIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path {...stroke} d="M12 3 20.5 7.75v8.5L12 21l-8.5-4.75v-8.5z" />
      <path {...stroke} d="m3.5 7.75 8.5 4.75 8.5-4.75M12 12.5V21" />
    </svg>
  );
}

/** A warning triangle: missed opportunity. */
function MissedIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path {...stroke} d="M12 3.75 21.5 20H2.5z" />
      <path {...stroke} d="M12 10v4.25" />
      <circle cx="12" cy="17.25" r="1.1" fill="currentColor" />
    </svg>
  );
}

/** A single figure: coaching signal. */
function CoachingIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle {...stroke} cx="12" cy="8" r="3.5" />
      <path {...stroke} d="M5 20a7 7 0 0 1 14 0" />
    </svg>
  );
}

export const caseIcons = {
  financial: FinancialIcon,
  organisation: OrganisationIcon,
  quality: QualityIcon,
  coverage: CoverageIcon,
  missed: MissedIcon,
  coaching: CoachingIcon,
} as const;

export type CaseIconName = keyof typeof caseIcons;
