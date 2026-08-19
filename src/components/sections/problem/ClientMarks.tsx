/**
 * CLIENT MARKS — PLACEHOLDER LOGOS
 * ---------------------------------------------------------------------------
 * Abstract geometric marks standing in for real client logos until those
 * assets arrive. Each is drawn on a 48x48 viewBox and inherits currentColor,
 * so the strip's colour and hover treatment are controlled in one place.
 *
 * They are deliberately non-representational — they read as "a logo" at a
 * glance without implying any specific company. Weight and silhouette are
 * matched to the design so the strip's rhythm is right; only the identity is
 * standing in.
 *
 * TODO(assets): replace with the real logos. Each will most likely become an
 * imported SVG rather than a component here, at which point this file and the
 * `mark` key in content/problem.ts can be deleted.
 *
 * Decorative: the parent renders an accessible name from the client's `name`,
 * so these carry aria-hidden.
 */

type MarkProps = { className?: string };

const base = {
  viewBox: "0 0 48 48",
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": true,
  focusable: false,
} as const;

/** Circle cut by a flowing Z. */
function OrbitMark({ className }: MarkProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="24" cy="24" r="17" fill="currentColor" opacity="0.92" />
      {/* Three bands knocked out of the disc. */}
      <g fill="var(--color-surface-subtle)">
        <rect x="11" y="17.5" width="26" height="3.6" rx="1.8" />
        <rect x="11" y="26.9" width="26" height="3.6" rx="1.8" />
      </g>
    </svg>
  );
}

/** Two overlapping diamond outlines. */
function LatticeMark({ className }: MarkProps) {
  return (
    <svg {...base} className={className} fill="none" stroke="currentColor">
      <rect
        x="6.5"
        y="14.5"
        width="19"
        height="19"
        rx="1.5"
        transform="rotate(-45 16 24)"
        strokeWidth="3"
      />
      <rect
        x="22.5"
        y="14.5"
        width="19"
        height="19"
        rx="1.5"
        transform="rotate(-45 32 24)"
        strokeWidth="3"
      />
    </svg>
  );
}

/** Rounded square with a folded corner lifted out of it. */
function FoldMark({ className }: MarkProps) {
  return (
    <svg {...base} className={className}>
      {/* Body with the top-right corner mitred off. */}
      <path
        d="M11 9h19l9 9v21a2 2 0 0 1-2 2H11a2 2 0 0 1-2-2V11a2 2 0 0 1 2-2Z"
        fill="currentColor"
        opacity="0.92"
      />
      {/* The lifted corner, knocked out in the page colour. */}
      <path d="M30 9l9 9h-9V9Z" fill="var(--color-surface-subtle)" />
    </svg>
  );
}

/**
 * Nested chevrons rising to a peak.
 *
 * Deliberately NOT a solid triangle with a centred bar and dot — that
 * silhouette reads as a hazard-warning sign, which is the wrong connotation
 * for a client logo.
 */
function ApexMark({ className }: MarkProps) {
  return (
    <svg {...base} className={className} fill="none" stroke="currentColor">
      <path
        d="M7 34 24 11l17 23"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 39 24 26l9 13"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.55"
      />
    </svg>
  );
}

/** Hexagon containing an interior loop. */
function HexLoopMark({ className }: MarkProps) {
  return (
    <svg {...base} className={className} fill="none" stroke="currentColor">
      <path
        d="M24 5.5 40 15v18l-16 9.5L8 33V15L24 5.5Z"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M18 30c-3-6 1-12 7-12s7 5 5 9"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Dot-matrix grid with a connecting bar. */
function MatrixMark({ className }: MarkProps) {
  const cells: Array<[number, number, number]> = [
    [8, 8, 1],
    [18, 8, 0.55],
    [28, 8, 1],
    [8, 20, 1],
    [28, 20, 0.55],
    [38, 20, 1],
    [8, 32, 0.55],
    [18, 32, 1],
    [28, 32, 1],
  ];
  return (
    <svg {...base} className={className}>
      {cells.map(([x, y, o]) => (
        <rect
          key={`${x}-${y}`}
          x={x}
          y={y}
          width="8"
          height="8"
          rx="1"
          fill="currentColor"
          opacity={o}
        />
      ))}
      <rect x="16" y="22" width="20" height="4" rx="2" fill="currentColor" />
    </svg>
  );
}

/** Radiating burst of tapered spokes. */
function BurstMark({ className }: MarkProps) {
  return (
    <svg {...base} className={className}>
      <g fill="currentColor">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <rect
            key={deg}
            x="22"
            y="5"
            width="4"
            height="16"
            rx="2"
            transform={`rotate(${deg} 24 24)`}
          />
        ))}
      </g>
      <circle cx="24" cy="24" r="4.5" fill="currentColor" />
    </svg>
  );
}

/** Two stacked downward chevrons, drawn as strokes so they stay distinct. */
function ChevronMark({ className }: MarkProps) {
  return (
    <svg {...base} className={className} fill="none" stroke="currentColor">
      <path
        d="M10 13 24 25l14-12"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 26 24 38l14-12"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.55"
      />
    </svg>
  );
}

/** Lookup used by the strip; keys match `mark` in content/problem.ts. */
export const clientMarks = {
  orbit: OrbitMark,
  lattice: LatticeMark,
  fold: FoldMark,
  apex: ApexMark,
  hexloop: HexLoopMark,
  matrix: MatrixMark,
  burst: BurstMark,
  chevron: ChevronMark,
} as const;

export type ClientMarkName = keyof typeof clientMarks;
