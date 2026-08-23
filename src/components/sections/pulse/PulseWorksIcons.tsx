/**
 * PULSE WORKS ICONS
 * ---------------------------------------------------------------------------
 * The four step glyphs in section 3 of the LurnyPulse page.
 *
 * Redrawn from the supplied PNGs, which were 106px line drawings with real
 * transparency. As SVG they are sharp at any density, inherit `currentColor`
 * so the ring and glyph can be tinted together on hover, and cost about a
 * kilobyte in total rather than the 64KB the four PNGs weighed.
 *
 * Each is drawn on a 24x24 grid with a 1.6 stroke, matching the weight of the
 * originals. The surrounding ring is drawn by the component, not baked in
 * here, so it can animate independently of the glyph.
 */

interface IconProps {
  className?: string;
}

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** 01 — a document with a bulleted list. */
export function DefineRoleIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M6 3.2h7.4L18 7.8v13H6z" />
      <path d="M13.2 3.4v4.4h4.4" />
      {/* Bullets and their rules. */}
      <path d="M9.1 11.4h.01M9.1 14.2h.01M9.1 17h.01" />
      <path d="M11.2 11.4h3.9M11.2 14.2h3.9M11.2 17h3.9" />
    </svg>
  );
}

/** 02 — a person with a check, for readiness assessed. */
export function AssessReadinessIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <circle cx="10.4" cy="7.6" r="3.4" />
      <path d="M4.4 19.6a6 6 0 0 1 9.2-5.06" />
      <circle cx="16.6" cy="16.6" r="4" />
      <path d="m14.9 16.7 1.2 1.2 2.2-2.4" />
    </svg>
  );
}

/** 03 — a target, for the priority gap. */
export function IdentifyGapsIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="7.2" />
      <circle cx="12" cy="12" r="3" />
      {/* The crosshairs, breaking the two rings. */}
      <path d="M12 2.6v3.2M12 18.2v3.2M2.6 12h3.2M18.2 12h3.2" />
    </svg>
  );
}

/** 04 — a rising trend line, for improvement over time. */
export function GuideImprovementIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="m3.6 16.4 5-5.2 3.2 3.2 6.4-7.2" />
      <path d="M14.2 6.6h4.6v4.6" />
    </svg>
  );
}

/** Keys match the `icon` fields in the `works.steps` array of content/pulse.ts. */
export const worksIcons = {
  document: DefineRoleIcon,
  assess: AssessReadinessIcon,
  target: IdentifyGapsIcon,
  growth: GuideImprovementIcon,
} as const;
