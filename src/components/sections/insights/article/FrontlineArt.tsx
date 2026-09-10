import type { SVGProps } from "react";

import { accent, ink } from "./tokens";

/**
 * FRONTLINE-CONVERSATIONS — THE LINE ART
 * ---------------------------------------------------------------------------
 * The drawings in "What 9,328 frontline conversations revealed", transcribed
 * from the supplied export path for path.
 *
 * The hero carries meaning, so it keeps the export's `role="img"` and its
 * `aria-label`; the legend beneath it repeats the three findings as real text.
 * The seven workflow glyphs sit beside their own labels, so they are
 * `aria-hidden` — the export marks them the same way.
 *
 * The workflow glyphs take their colour from the caller rather than fixing it,
 * because the export shifts hue along the chain (plum, then mauve, then
 * terracotta, back to plum, closing on olive) to show the work changing hands.
 */

type ArtProps = Omit<SVGProps<SVGSVGElement>, "viewBox" | "children">;

const LABEL_FONT = "var(--font-article)";

/* ======================================================================== */
/*  HERO — many conversations into one evidence sheet, then three findings  */
/* ======================================================================== */

export function ConversationsToEvidence({
  label,
  ...props
}: ArtProps & { label: string }) {
  return (
    <svg
      viewBox="0 0 560 300"
      role="img"
      aria-label="Many frontline conversation paths converge into an evidence sheet and three findings about knowledge gaps, missed opportunities and performance variation."
      className="block h-auto w-full"
      {...props}
    >
      <defs>
        <pattern
          id="fl-hgrid"
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

      <rect x="12" y="10" width="536" height="280" rx="16" fill="#FCFAF6" />
      <rect
        x="12"
        y="10"
        width="536"
        height="280"
        rx="16"
        fill="url(#fl-hgrid)"
      />
      <rect
        x="12"
        y="10"
        width="536"
        height="280"
        rx="16"
        fill="none"
        stroke={ink.line}
      />

      {/* Six conversation threads converging from the left. */}
      <g
        fill="none"
        stroke={accent.mauve}
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.8"
      >
        <path d="M28 60c40 4 60 20 90 26" />
        <path d="M28 90c44 -2 62 14 90 34" />
        <path d="M28 120c40 8 58 8 90 40" />
        <path d="M28 150c42 -6 60 4 90 44" />
        <path d="M28 180c40 10 56 2 90 46" />
        <path d="M28 210c44 -8 62 -2 90 42" />
      </g>

      {/* The pinch where they meet. */}
      <g fill="none" stroke={accent.plum} strokeWidth="1.3" opacity="0.55">
        <path d="M118 86q6 8 0 16M124 100q6 8 0 16M130 114q6 8 0 16" />
      </g>

      {/* The evidence sheet they become. */}
      <rect
        x="228"
        y="90"
        width="100"
        height="120"
        rx="10"
        fill="none"
        stroke={accent.plum}
        strokeWidth="1.5"
      />
      <path
        d="M244 112h68M244 128h68M244 144h48M244 160h68M244 176h40"
        stroke={ink.black}
        strokeWidth="1.1"
        opacity="0.4"
        strokeLinecap="round"
      />
      <text
        x="278"
        y="222"
        fontFamily={LABEL_FONT}
        fontSize="9.5"
        fontWeight="700"
        fill={ink.subtle}
        textAnchor="middle"
        letterSpacing="0.08em"
      >
        {label}
      </text>

      {/* Three arrows out to the three findings. */}
      <g
        fill="none"
        stroke={accent.terracotta}
        strokeWidth="1.4"
        strokeLinecap="round"
      >
        <path d="M328 130h40" />
        <path
          d="M356 124l12 6-12 6"
          fill={accent.terracotta}
          strokeLinejoin="round"
        />
        <path d="M328 150h40" />
        <path
          d="M356 144l12 6-12 6"
          fill={accent.terracotta}
          strokeLinejoin="round"
        />
        <path d="M328 170h40" />
        <path
          d="M356 164l12 6-12 6"
          fill={accent.terracotta}
          strokeLinejoin="round"
        />
      </g>

      {/* The three finding tiles: a gap, a tick, a spread. */}
      <g fill="none" stroke={accent.terracotta} strokeWidth="1.4">
        <rect x="386" y="112" width="70" height="34" rx="7" />
        <path d="M398 124h28M398 134h20" />

        <rect x="386" y="152" width="70" height="34" rx="7" />
        <path d="M398 164l8 8 16-18" strokeWidth="1.7" />

        <rect x="386" y="192" width="70" height="34" rx="7" />
        <path d="M398 200c8 6 8 14 0 20M414 200c8 6 8 14 0 20M430 200c8 6 8 14 0 20" />
      </g>
    </svg>
  );
}

/* ======================================================================== */
/*  s6 — the seven workflow glyphs                                          */
/* ======================================================================== */

/** The shared stroke setup — the flow icons all use 1.7 on a 24 grid. */
const flowStroke = {
  fill: "none",
  strokeWidth: 1.7,
  strokeLinecap: "round",
} as const;

/** A tick inside a circle — captured with consent. */
function ConsentIcon(props: ArtProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...flowStroke} {...props}>
      <path d="M9 12l2 2 4-4" />
      <circle cx="12" cy="12" r="8.5" />
    </svg>
  );
}

/** Lines of text — transcription and translation. */
function TranscribeIcon(props: ArtProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...flowStroke} {...props}>
      <path d="M5 6h14M5 11h9M5 16h14" />
    </svg>
  );
}

/** Bars of differing height — the agreed indicators. */
function IndicatorsIcon(props: ArtProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...flowStroke} {...props}>
      <path d="M4 20V10M10 20V4M16 20v-8M22 20v-4" />
    </svg>
  );
}

/** A magnifier — reviewing the patterns. */
function ReviewIcon(props: ArtProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...flowStroke} {...props}>
      <circle cx="11" cy="11" r="6" />
      <path d="M20 20l-4.5-4.5" />
    </svg>
  );
}

/** A person — validation with people and context. */
function ValidateIcon(props: ArtProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...flowStroke} {...props}>
      <circle cx="12" cy="8" r="3.4" />
      <path d="M6 20c1-4 4-6 6-6s5 2 6 6" />
    </svg>
  );
}

/** A bolt — choosing the response. */
function RespondIcon(props: ArtProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...flowStroke} {...props}>
      <path d="M13 4l-9 10h6l-2 6 9-10h-6z" />
    </svg>
  );
}

/** A loop back round — observing again. */
function ObserveIcon(props: ArtProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...flowStroke} {...props}>
      <path d="M4 12a8 8 0 1 1 3 6.2" />
      <path d="M4 20v-5h5" />
    </svg>
  );
}

/** Keyed by the `icon` name in the content file. */
export const flowIcons = {
  consent: ConsentIcon,
  transcribe: TranscribeIcon,
  indicators: IndicatorsIcon,
  review: ReviewIcon,
  validate: ValidateIcon,
  respond: RespondIcon,
  observe: ObserveIcon,
} as const;

/**
 * The connector between two flow steps. The last one in the chain is dashed,
 * because the return to observation is a loop rather than a hard next step.
 */
export function FlowArrow({
  tone,
  dashed = false,
  ...props
}: ArtProps & { tone: string; dashed?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 12"
      aria-hidden="true"
      className="h-3 w-6 shrink-0"
      {...props}
    >
      <path
        d="M0 6h18M16 3l4 3-4 3"
        fill="none"
        stroke={tone}
        strokeWidth="1.2"
        strokeDasharray={dashed ? "2 5" : undefined}
      />
    </svg>
  );
}
