/**
 * PULSE BLUEPRINT ICONS
 * ---------------------------------------------------------------------------
 * The four facet glyphs in section 4 of the LurnyPulse page.
 *
 * Drawn from the design's line art on a 24x24 grid at a 1.5 stroke, matching
 * the weight of the surrounding diagram. They inherit `currentColor`, so a
 * card can tint its glyph and its border together on hover.
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

/** Competencies — a head in profile with a star, for judgement. */
export function MindIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      {/* The skull in profile, open at the neck. */}
      <path d="M12.6 2.6A7.6 7.6 0 0 0 5 10.2a7.4 7.4 0 0 0 .9 3.5l-1.5 2.6a.8.8 0 0 0 .7 1.2h1.7v1.9a2.2 2.2 0 0 0 2.2 2.2h2.3" />
      <path d="M12.6 2.6a7.6 7.6 0 0 1 4.7 13.6" />
      {/* The star. */}
      <path d="m12.2 6.6 1.4 2.9 3.2.4-2.3 2.2.6 3.1-2.9-1.5-2.8 1.5.5-3.1-2.3-2.2 3.2-.4z" />
    </svg>
  );
}

/** KSB anchors — a bound notebook with ruled lines. */
export function NotebookIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M7.4 3.6h11a1 1 0 0 1 1 1v14.8a1 1 0 0 1-1 1h-11a2 2 0 0 1-2-2V5.6a2 2 0 0 1 2-2Z" />
      {/* The spine rings. */}
      <path d="M4.6 7.2h2M4.6 11.2h2M4.6 15.2h2" />
      {/* Ruled lines. */}
      <path d="M9.6 8.4h6.6M9.6 11.6h6.6M9.6 14.8h4.4" />
    </svg>
  );
}

/** Proficiency levels — ascending bars. */
export function BarsIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <rect x="3.4" y="14.2" width="4.2" height="6.4" rx="1" />
      <rect x="9.9" y="9.4" width="4.2" height="11.2" rx="1" />
      <rect x="16.4" y="3.4" width="4.2" height="17.2" rx="1" />
    </svg>
  );
}

/** Expected evidence — a clipboard with a check. */
export function ClipboardIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M9 4.6H7a1.6 1.6 0 0 0-1.6 1.6v13a1.6 1.6 0 0 0 1.6 1.6h10a1.6 1.6 0 0 0 1.6-1.6v-13A1.6 1.6 0 0 0 17 4.6h-2" />
      <rect x="9" y="2.6" width="6" height="4" rx="1.2" />
      <path d="m9.4 13.4 1.9 1.9 3.9-4.2" />
    </svg>
  );
}

/** Keys match the `icon` fields in `blueprints.diagram.facets` of content/pulse.ts. */
export const blueprintIcons = {
  mind: MindIcon,
  notebook: NotebookIcon,
  bars: BarsIcon,
  clipboard: ClipboardIcon,
} as const;
