import type { SVGProps } from "react";

import { accent, ink } from "./tokens";

/**
 * CONTEXT-ADVANTAGE — THE LINE ART
 * ---------------------------------------------------------------------------
 * The drawings in "Context is the enterprise AI advantage", transcribed from
 * the supplied export path for path.
 *
 * The hero carries meaning, so it keeps the export's `role="img"` and its
 * `aria-label`. The seven workflow glyphs sit beside their own labels, so they
 * are `aria-hidden` — the export marks them the same way.
 *
 * The hero's seven embedded captions come in as props rather than being fixed
 * in the path data, so they stay translatable with the rest of the copy.
 *
 * The workflow glyphs take their colour from the caller, because the export
 * shifts hue along the chain to show where responsibility changes hands —
 * terracotta at the permission check, violet at human judgement.
 */

type ArtProps = Omit<SVGProps<SVGSVGElement>, "viewBox" | "children">;

const LABEL_FONT = "var(--font-article)";

/* ======================================================================== */
/*  HERO — six signals converging on a layered context surface              */
/* ======================================================================== */

export function SignalsToSurface({
  labels,
  ...props
}: ArtProps & { labels: { signals: readonly string[]; surface: string } }) {
  /** The y position of each signal's caption, in the export's order. */
  const captions = [112, 176, 230, 284, 358, 400];

  return (
    <svg
      viewBox="0 0 560 430"
      role="img"
      aria-label="Enterprise knowledge, role, case, workflow, permission and history signals converge into a layered context surface with a human review point."
      className="block h-auto w-full"
      {...props}
    >
      <defs>
        <pattern
          id="cx-hgrid"
          width="26"
          height="26"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M26 0H0v26"
            fill="none"
            stroke={ink.black}
            strokeWidth="0.4"
            opacity="0.08"
          />
        </pattern>
      </defs>

      <rect x="20" y="16" width="520" height="398" rx="16" fill="#FCFAF6" />
      <rect
        x="20"
        y="16"
        width="520"
        height="398"
        rx="16"
        fill="url(#cx-hgrid)"
      />
      <rect
        x="20"
        y="16"
        width="520"
        height="398"
        rx="16"
        fill="none"
        stroke={ink.line}
      />

      {/* The six signal glyphs down the left: a person, a document, a rule,
          a funnel, a tag and a trace. */}
      <g fill="none" stroke={accent.violet} strokeWidth="1.3">
        <circle cx="80" cy="70" r="15" />
        <path d="M64 96c5-14 10-20 16-20s11 6 16 20" />

        <rect x="58" y="128" width="44" height="34" rx="6" />
        <path d="M66 140h28M66 148h20" strokeWidth="1.1" />

        <rect x="58" y="182" width="44" height="34" rx="6" />
        <path d="M80 191v16M72 199h16" strokeWidth="1.1" />

        <path d="M60 258h40l-8 30h-24z" />

        <rect x="58" y="316" width="44" height="30" rx="14" />
        <path d="M66 331h28" strokeWidth="1.1" />

        <path d="M60 372c8-10 16-14 20-14s12 4 20 14" strokeWidth="1.2" />
        <ellipse cx="80" cy="372" rx="20" ry="7" />
      </g>

      <g
        fontFamily={LABEL_FONT}
        fontSize="9"
        fontWeight="700"
        fill={ink.subtle}
        textAnchor="middle"
        letterSpacing="0.06em"
      >
        {captions.map((y, index) => (
          <text key={y} x="80" y={y}>
            {labels.signals[index]}
          </text>
        ))}
      </g>

      {/* Their dotted routes into the surface. */}
      <g
        fill="none"
        stroke={accent.sage}
        strokeWidth="1.15"
        strokeDasharray="2 7"
        strokeLinecap="round"
      >
        <path d="M104 70c60 8 60 30 120 40" />
        <path d="M104 145c58 4 58 18 118 30" />
        <path d="M104 199c56 2 56 8 116 10" />
        <path d="M104 273c56 -6 56 -14 116 -22" />
        <path d="M104 331c58 -14 58 -34 118 -50" />
        <path d="M104 372c60 -30 60 -70 118 -102" />
      </g>

      {/* The surface: five stacked plates narrowing towards the top, with
          the assembled context at the peak and a review tick beside it. */}
      <g>
        <rect
          x="300"
          y="330"
          width="180"
          height="26"
          rx="6"
          fill="none"
          stroke={ink.black}
          strokeWidth="1"
          opacity="0.16"
        />
        <rect
          x="308"
          y="292"
          width="164"
          height="30"
          rx="6"
          fill="none"
          stroke={accent.sage}
          strokeWidth="1.2"
          opacity="0.5"
        />
        <rect
          x="316"
          y="252"
          width="148"
          height="34"
          rx="6"
          fill="none"
          stroke={accent.sage}
          strokeWidth="1.3"
          opacity="0.75"
        />
        <rect
          x="326"
          y="206"
          width="128"
          height="40"
          rx="7"
          fill="none"
          stroke={accent.sageMid}
          strokeWidth="1.4"
        />
        <rect
          x="336"
          y="156"
          width="108"
          height="44"
          rx="8"
          fill="#FCFAF6"
          stroke={accent.violet}
          strokeWidth="1.6"
        />
        <circle
          cx="390"
          cy="178"
          r="7"
          fill="none"
          stroke={accent.violet}
          strokeWidth="1.6"
        />
        <circle cx="390" cy="178" r="2" fill={accent.violet} />

        {/* The human review point. */}
        <g transform="translate(414,164)">
          <circle
            r="9"
            fill={ink.paper}
            stroke={accent.terracotta}
            strokeWidth="1.6"
          />
          <path
            d="M-3 0l2 3 4-6"
            fill="none"
            stroke={accent.terracotta}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>

      <text
        x="390"
        y="140"
        fontFamily={LABEL_FONT}
        fontSize="9.5"
        fontWeight="700"
        fill={ink.subtle}
        textAnchor="middle"
        letterSpacing="0.1em"
      >
        {labels.surface}
      </text>
    </svg>
  );
}

/* ======================================================================== */
/*  s6 — the seven governed-context glyphs                                  */
/* ======================================================================== */

/** The shared stroke setup — the flow icons use 1.7 on a 24 grid. */
const flowStroke = {
  fill: "none",
  strokeWidth: 1.7,
  strokeLinecap: "round",
} as const;

/** Uneven lines — selecting what matters from what is available. */
function SelectIcon(props: ArtProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...flowStroke} {...props}>
      <path d="M4 12h16M4 6h10M4 18h13" />
    </svg>
  );
}

/** A magnifier — retrieval. */
function RetrieveIcon(props: ArtProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...flowStroke} {...props}>
      <circle cx="11" cy="11" r="6" />
      <path d="M20 20l-4.5-4.5" />
    </svg>
  );
}

/** A padlock — the permission check, before anything is fetched. */
function PermissionIcon(props: ArtProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      strokeWidth={1.8}
      strokeLinecap="round"
      {...props}
    >
      <rect x="6" y="10" width="12" height="9" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

/** A tick in a circle — grounding the answer and citing it. */
function GroundIcon(props: ArtProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...flowStroke} {...props}>
      <path d="M9 12l2 2 4-4" />
      <circle cx="12" cy="12" r="8.5" />
    </svg>
  );
}

/** A person — where judgement stays. */
function HumanIcon(props: ArtProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...flowStroke} {...props}>
      <circle cx="12" cy="8" r="3.4" />
      <path d="M6 20c1-4 4-6 6-6s5 2 6 6" />
    </svg>
  );
}

/** A bolt — the action taken. */
function ActIcon(props: ArtProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...flowStroke} {...props}>
      <path d="M13 4l-9 10h6l-2 6 9-10h-6z" />
    </svg>
  );
}

/** A loop — what the outcome teaches the next pass. */
function LearnIcon(props: ArtProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...flowStroke} {...props}>
      <path d="M4 12a8 8 0 1 1 3 6.2" />
      <path d="M4 20v-5h5" />
    </svg>
  );
}

/** Keyed by the `icon` name in the content file. */
export const contextFlowIcons = {
  select: SelectIcon,
  retrieve: RetrieveIcon,
  permission: PermissionIcon,
  ground: GroundIcon,
  human: HumanIcon,
  act: ActIcon,
  learn: LearnIcon,
} as const;

/**
 * The connector between two flow steps. The final one is dashed, because
 * feeding what was learned back in is a loop rather than a hard next step.
 */
export function ContextArrow({
  tone,
  dashed = false,
  ...props
}: ArtProps & { tone: string; dashed?: boolean }) {
  return (
    <svg
      viewBox="0 0 30 14"
      aria-hidden="true"
      className="h-3.5 w-[1.875rem] shrink-0"
      {...props}
    >
      <path
        d="M0 7h30"
        stroke={tone}
        strokeWidth="1.2"
        strokeDasharray={dashed ? "2 5" : undefined}
      />
      <path
        d="M22 7h6M24 4l4 3-4 3"
        fill="none"
        stroke={tone}
        strokeWidth="1.2"
      />
    </svg>
  );
}
