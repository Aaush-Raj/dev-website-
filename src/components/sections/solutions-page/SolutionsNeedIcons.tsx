import type { SVGProps } from "react";

/**
 * SOLUTIONS — BUSINESS-NEED ICONS AND CARD CORNERS
 * ---------------------------------------------------------------------------
 * Two sets, both transcribed VERBATIM from the SVG sources supplied with the
 * section-2 design (lurny-business-need-icons and lurny-card-corner-graphics).
 *
 * They are inlined rather than loaded as files so they carry no extra request
 * and can inherit theme colours if the brand ramp ever changes; the geometry
 * itself is unaltered, so what renders is the designer's artwork.
 *
 *   ICONS   — the glyph in each card's rounded tile. Drawn on the supplied
 *             128-box, tile border included, so the tile is part of the asset
 *             rather than something the card re-creates around it.
 *   CORNERS — the ornament in each card's top-right. Drawn on a 256-box and
 *             positioned by the card; the design pairs a DIFFERENT one with
 *             each of the nine cards rather than repeating a single motif.
 */

type IconProps = SVGProps<SVGSVGElement>;

/** The brand violet and its two tints, from the supplied artwork. */
const VIOLET = "#4B20C8";
const TINT_LIGHT = "#F6F2FF";
const TINT = "#EAE2FF";

/* ========================================================================== */
/* BUSINESS-NEED ICONS                                                        */
/* ========================================================================== */

/** The rounded tile every icon sits in. */
function Tile() {
  return (
    <rect
      x="8"
      y="8"
      width="112"
      height="112"
      rx="22"
      fill="#FFFFFF"
      fillOpacity="0.01"
      stroke={TINT}
      strokeWidth="4"
    />
  );
}

/** Shared stroke setup for the glyphs. */
const glyph = {
  fill: "none",
  stroke: VIOLET,
  strokeWidth: 4,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** 01 — two figures: frontline performance. */
function FrontlineIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 128 128" aria-hidden="true" {...props}>
      <Tile />
      <circle {...glyph} cx="47" cy="47" r="10" />
      <circle {...glyph} cx="76" cy="50" r="8" />
      <path
        {...glyph}
        d="M28 88c2-16 10-25 19-25s18 9 20 25M65 68c13 0 22 8 23 20"
      />
    </svg>
  );
}

/** 02 — rising bars under an arrow: sales enablement. */
function SalesIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 128 128" aria-hidden="true" {...props}>
      <Tile />
      <path {...glyph} d="M32 88V70M51 88V58M70 88V44" />
      <path {...glyph} d="M31 57l19-14 16 7 26-23" />
      <path {...glyph} d="M74 27h18v18" />
    </svg>
  );
}

/** 03 — a star: capability building. */
function CapabilityIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 128 128" aria-hidden="true" {...props}>
      <Tile />
      <path
        {...glyph}
        d="M64 30l10 21 23 3-17 16 4 23-20-11-20 11 4-23-17-16 23-3z"
      />
    </svg>
  );
}

/** 04 — an open book: knowledge management. */
function KnowledgeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 128 128" aria-hidden="true" {...props}>
      <Tile />
      <path {...glyph} d="M31 37c13-4 25-1 33 8v48c-8-9-20-12-33-8z" />
      <path {...glyph} d="M97 37c-13-4-25-1-33 8v48c8-9 20-12 33-8z" />
    </svg>
  );
}

/** 05 — a shield with a tick: compliance readiness. */
function ComplianceIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 128 128" aria-hidden="true" {...props}>
      <Tile />
      <path
        {...glyph}
        d="M64 27l31 12v22c0 23-13 37-31 43-18-6-31-20-31-43V39z"
      />
      <path {...glyph} d="M49 63l10 10 20-22" />
    </svg>
  );
}

/** 06 — a single figure: employee onboarding. */
function OnboardingIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 128 128" aria-hidden="true" {...props}>
      <Tile />
      <circle {...glyph} cx="64" cy="48" r="14" />
      <path {...glyph} d="M34 94c3-18 14-28 30-28s27 10 30 28" />
    </svg>
  );
}

/** 07 — a heart: customer service excellence. */
function ServiceIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 128 128" aria-hidden="true" {...props}>
      <Tile />
      <path
        {...glyph}
        d="M64 96S29 76 29 50c0-12 9-21 21-21 7 0 12 3 14 9 3-6 8-9 15-9 12 0 21 9 21 21 0 26-36 46-36 46z"
      />
    </svg>
  );
}

/** 08 — a group: leadership and manager effectiveness. */
function LeadershipIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 128 128" aria-hidden="true" {...props}>
      <Tile />
      <circle {...glyph} cx="64" cy="42" r="11" />
      <circle {...glyph} cx="39" cy="50" r="8" />
      <circle {...glyph} cx="89" cy="50" r="8" />
      <path
        {...glyph}
        d="M43 91c2-17 10-27 21-27s19 10 21 27M22 88c2-13 8-21 17-21M106 88c-2-13-8-21-17-21"
      />
    </svg>
  );
}

/** 09 — a lightning bolt: change and digital adoption. */
function ChangeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 128 128" aria-hidden="true" {...props}>
      <Tile />
      <path {...glyph} d="M70 24L42 69h20l-6 35 30-50H66z" />
    </svg>
  );
}

export const needIcons = {
  frontline: FrontlineIcon,
  sales: SalesIcon,
  capability: CapabilityIcon,
  knowledge: KnowledgeIcon,
  compliance: ComplianceIcon,
  onboarding: OnboardingIcon,
  service: ServiceIcon,
  leadership: LeadershipIcon,
  change: ChangeIcon,
} as const;

export type NeedIconName = keyof typeof needIcons;

/* ========================================================================== */
/* CARD CORNER ORNAMENTS                                                      */
/* ========================================================================== */

/*
  Each is drawn on a 256-box anchored to the card's top-right corner. The
  gradient-filled ones declare their own gradient with a UNIQUE id: two SVGs
  sharing an id on one page would have the second silently adopt the first's
  definition, and nine cards render together here.
*/

/** 01 — a soft quarter circle, filled with the tint gradient. */
function SoftQuarterCorner(props: IconProps) {
  return (
    <svg viewBox="0 0 256 256" aria-hidden="true" {...props}>
      <defs>
        <linearGradient
          id="sol-corner-soft-quarter"
          x1="0"
          y1="1"
          x2="1"
          y2="0"
        >
          <stop offset="0" stopColor={TINT_LIGHT} />
          <stop offset="1" stopColor={TINT} />
        </linearGradient>
      </defs>
      <path
        d="M256 0H80c0 97 79 176 176 176z"
        fill="url(#sol-corner-soft-quarter)"
      />
    </svg>
  );
}

/** 02 — two nested rounded panels. */
function RoundedPanelCorner(props: IconProps) {
  return (
    <svg viewBox="0 0 256 256" aria-hidden="true" {...props}>
      <path d="M256 0H104v116c0 77 63 140 140 140h12z" fill={TINT_LIGHT} />
      <path
        d="M256 0H124v110c0 67 54 121 121 121h11z"
        fill={TINT}
        fillOpacity=".72"
      />
    </svg>
  );
}

/** 03 — a dot matrix over a tinted panel. */
function DotMatrixPanelCorner(props: IconProps) {
  return (
    <svg viewBox="0 0 256 256" aria-hidden="true" {...props}>
      <path d="M256 0H80c0 84 68 152 152 152h24z" fill={TINT_LIGHT} />
      <g fill={VIOLET} fillOpacity=".22">
        {[34, 58, 82, 106].map((cy) =>
          [154, 178, 202, 226].map((cx) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3" />
          )),
        )}
      </g>
    </svg>
  );
}

/** 04 — two nested arcs. */
function NestedArcsCorner(props: IconProps) {
  return (
    <svg viewBox="0 0 256 256" aria-hidden="true" {...props}>
      <path
        d="M256 12A116 116 0 0 0 140 128"
        fill="none"
        stroke={TINT}
        strokeWidth="8"
      />
      <path
        d="M256 50A78 78 0 0 0 178 128"
        fill="none"
        stroke={VIOLET}
        strokeOpacity=".23"
        strokeWidth="3"
      />
    </svg>
  );
}

/** 05 — diagonal hatching. */
function HatchingCorner(props: IconProps) {
  return (
    <svg viewBox="0 0 256 256" aria-hidden="true" {...props}>
      <g
        stroke={VIOLET}
        strokeOpacity=".22"
        strokeWidth="4"
        strokeLinecap="round"
      >
        <path d="M132 20L72 80" />
        <path d="M162 20L72 110" />
        <path d="M192 20L72 140" />
        <path d="M222 20L72 170" />
        <path d="M252 20L72 200" />
        <path d="M252 50L102 200" />
      </g>
    </svg>
  );
}

/** 06 — a filled quarter circle with an outlined arc inside it. */
function PartialQuarterCorner(props: IconProps) {
  return (
    <svg viewBox="0 0 256 256" aria-hidden="true" {...props}>
      <path d="M256 0H116c0 77 63 140 140 140z" fill={TINT_LIGHT} />
      <path
        d="M256 0H134c0 67 55 122 122 122"
        fill="none"
        stroke={VIOLET}
        strokeOpacity=".25"
        strokeWidth="3"
      />
    </svg>
  );
}

/** 07 — a bare dot matrix. */
function DotMatrixCorner(props: IconProps) {
  return (
    <svg viewBox="0 0 256 256" aria-hidden="true" {...props}>
      <g fill={VIOLET} fillOpacity=".27">
        {[32, 56, 80, 104, 128].map((cy) =>
          [128, 152, 176, 200, 224].map((cx) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3" />
          )),
        )}
      </g>
    </svg>
  );
}

/** 08 — a soft corner circle, filled with the tint gradient. */
function SoftCornerCorner(props: IconProps) {
  return (
    <svg viewBox="0 0 256 256" aria-hidden="true" {...props}>
      <defs>
        <linearGradient id="sol-corner-soft-circle" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor={TINT_LIGHT} />
          <stop offset="1" stopColor={TINT} />
        </linearGradient>
      </defs>
      <path
        d="M256 0H104c0 84 68 152 152 152z"
        fill="url(#sol-corner-soft-circle)"
      />
    </svg>
  );
}

/** 09 — stacked wave lines. */
function WaveLinesCorner(props: IconProps) {
  return (
    <svg viewBox="0 0 256 256" aria-hidden="true" {...props}>
      <g
        fill="none"
        stroke={VIOLET}
        strokeOpacity=".24"
        strokeWidth="4"
        strokeLinecap="round"
      >
        {[46, 74, 102, 130].map((y) => (
          <path key={y} d={`M92 ${y}c18-18 36 18 54 0s36 18 54 0 36 18 54 0`} />
        ))}
      </g>
    </svg>
  );
}

export const cornerGraphics = {
  softQuarter: SoftQuarterCorner,
  roundedPanel: RoundedPanelCorner,
  dotMatrixPanel: DotMatrixPanelCorner,
  nestedArcs: NestedArcsCorner,
  hatching: HatchingCorner,
  partialQuarter: PartialQuarterCorner,
  dotMatrix: DotMatrixCorner,
  softCorner: SoftCornerCorner,
  waveLines: WaveLinesCorner,
} as const;

export type CornerGraphicName = keyof typeof cornerGraphics;

/** The arrow in each card's lower-right, and beside the section's link. */
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
