import type { SVGProps } from "react";

import { accent, ink } from "./tokens";

/**
 * FLOW-OF-WORK — THE LINE ART
 * ---------------------------------------------------------------------------
 * The drawings in "Learning in the flow of work needs more than
 * recommendations", transcribed from the supplied export path for path.
 *
 * The hero carries meaning, so it keeps the export's `role="img"` and its
 * `aria-label`. The five strip glyphs sit beside their own labels, so they are
 * `aria-hidden` — the export marks them the same way.
 *
 * THE TWO DIRECTIONS ARE COLOURED DIFFERENTLY, deliberately: terracotta runs
 * forward through the work, aubergine returns underneath carrying evidence
 * back to the next decision. The return path is dashed in both the hero and
 * the strip, because feeding evidence back is a loop rather than another step.
 *
 * The hero's four embedded captions come in as props, so they stay
 * translatable with the rest of the copy.
 */

type ArtProps = Omit<SVGProps<SVGSVGElement>, "viewBox" | "children">;

const LABEL_FONT = "var(--font-article)";

/* ======================================================================== */
/*  HERO — need, decision, outcome, and the evidence returning              */
/* ======================================================================== */

export function NeedToOutcome({
  labels,
  ...props
}: ArtProps & { labels: { stages: readonly string[]; returns: string } }) {
  /** The x centre of each ringed stage, in the export's order. */
  const stages = [112, 280, 448];

  return (
    <svg
      viewBox="0 0 560 300"
      role="img"
      aria-label="A work need leads to focused support, practice and workplace action, while evidence returns to guide the next learning step."
      className="block h-auto w-full"
      {...props}
    >
      <defs>
        <pattern
          id="fw-hgrid"
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
        fill="url(#fw-hgrid)"
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

      {/* Three rings, one per stage. */}
      {stages.map((cx) => (
        <circle
          key={cx}
          cx={cx}
          cy="118"
          r="58"
          fill="none"
          stroke={accent.terracotta}
          strokeWidth="1.6"
        />
      ))}

      {/* 1 — the source: an open book. */}
      <g
        fill="none"
        stroke={ink.black}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.72"
      >
        <path d="M112 92v46" />
        <path d="M112 96c-8-6-20-8-30-6v40c10-2 22 0 30 6" />
        <path d="M112 96c8-6 20-8 30-6v40c-10-2-22 0-30 6" />
      </g>

      {/* 2 — the person deciding: a lightbulb with a filament. */}
      <g
        fill="none"
        stroke={ink.black}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.72"
      >
        <path d="M266 146v-8c-8-6-13-15-13-25 0-16 13-29 29-29s29 13 29 29c0 10-5 19-13 25v8z" />
        <path d="M267 146h26M270 138h20" />
        <circle cx="282" cy="108" r="9" />
        <path d="M282 99v-4M282 121v4M291 108h4M269 108h4M288 101l3-3M273 115l-3 3M288 115l3 3M273 101l-3-3" />
      </g>

      {/* 3 — the workplace outcome: a screen with a rising trace. */}
      <g
        fill="none"
        stroke={ink.black}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.72"
      >
        <rect x="418" y="96" width="60" height="40" rx="4" />
        <path d="M406 144h84l-8-8h-68z" />
        <path d="M430 128l10-14 8 8 14-20" stroke={accent.olive} />
      </g>

      {/* The forward arrows between stages. */}
      <g
        fill="none"
        stroke={accent.terracotta}
        strokeWidth="1.6"
        strokeLinecap="round"
      >
        <path d="M172 118h48" />
        <path
          d="M210 110l12 8-12 8"
          fill={accent.terracotta}
          strokeLinejoin="round"
        />
        <path d="M340 118h48" />
        <path
          d="M378 110l12 8-12 8"
          fill={accent.terracotta}
          strokeLinejoin="round"
        />
      </g>

      {/* The return path, sweeping back underneath. */}
      <path
        d="M448 178c0 40-224 40-336 4"
        fill="none"
        stroke={accent.aubergine}
        strokeWidth="1.4"
        strokeDasharray="1 9"
        strokeLinecap="round"
      />
      <path d="M118 178l-6 12-10-9z" fill={accent.aubergine} />
      <circle
        cx="256"
        cy="196"
        r="4"
        fill="none"
        stroke={accent.aubergine}
        strokeWidth="1.5"
      />
      <circle
        cx="284"
        cy="194"
        r="4"
        fill="none"
        stroke={accent.aubergine}
        strokeWidth="1.5"
      />

      <g
        fontFamily={LABEL_FONT}
        fontSize="10"
        fontWeight="700"
        fill={ink.subtle}
        textAnchor="middle"
        letterSpacing="0.08em"
      >
        {stages.map((cx, index) => (
          <text key={cx} x={cx} y="204">
            {labels.stages[index]}
          </text>
        ))}
      </g>

      <text
        x="270"
        y="234"
        fontFamily={LABEL_FONT}
        fontSize="10"
        fontWeight="700"
        fill={accent.aubergine}
        textAnchor="middle"
        letterSpacing="0.1em"
      >
        {labels.returns}
      </text>
    </svg>
  );
}

/* ======================================================================== */
/*  s5 — the five strip glyphs                                              */
/* ======================================================================== */

/** The shared stroke setup — the strip icons use 1.7 on a 24 grid. */
const stripStroke = {
  fill: "none",
  strokeWidth: 1.7,
  strokeLinecap: "round",
} as const;

/** A person — the pattern showing up across a team. */
function PatternIcon(props: ArtProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stripStroke} {...props}>
      <path d="M4 20c1-5 4-8 8-8s7 3 8 8" />
      <circle cx="12" cy="8" r="4" />
    </svg>
  );
}

/** A tick in a circle — the single behaviour picked out. */
function BehaviourIcon(props: ArtProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stripStroke} {...props}>
      <path d="M9 12l2 2 4-4" />
      <circle cx="12" cy="12" r="8.5" />
    </svg>
  );
}

/** A play triangle — the short scenario. */
function ScenarioIcon(props: ArtProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stripStroke} {...props}>
      <path d="M6 4l14 8-14 8z" />
    </svg>
  );
}

/** A person with a spark — the quiet prompt before the next conversation. */
function PromptIcon(props: ArtProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stripStroke} {...props}>
      <path d="M4 20c1-5 4-8 8-8s7 3 8 8" />
      <circle cx="12" cy="8" r="4" />
      <path d="M18 6l2 2" strokeWidth="1.4" />
    </svg>
  );
}

/** A ruled sheet — the manager's observation notes. */
function ObservationIcon(props: ArtProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stripStroke} {...props}>
      <rect x="5" y="4" width="14" height="16" rx="2" />
      <path d="M9 9h6M9 13h6M9 17h3" />
    </svg>
  );
}

/** Keyed by the `icon` name in the content file. */
export const stripIcons = {
  pattern: PatternIcon,
  behaviour: BehaviourIcon,
  scenario: ScenarioIcon,
  prompt: PromptIcon,
  observation: ObservationIcon,
} as const;

/**
 * The connector between two strip steps. The last is dashed and aubergine,
 * because manager feedback closes the loop rather than continuing forward.
 */
export function StripArrow({
  tone,
  dashed = false,
  ...props
}: ArtProps & { tone: string; dashed?: boolean }) {
  return (
    <svg
      viewBox="0 0 26 12"
      aria-hidden="true"
      className="h-3 w-[1.625rem] shrink-0"
      {...props}
    >
      <path
        d="M0 6h20M18 3l4 3-4 3"
        fill="none"
        stroke={tone}
        strokeWidth="1.2"
        strokeDasharray={dashed ? "2 5" : undefined}
      />
    </svg>
  );
}

/**
 * s2's comparison connector: the dotted path that peels away from the
 * recommendation's end-point and loops back to the start of the real cycle.
 * Drawn as one wide band beneath the step list so it reads as a single
 * gesture rather than as arrows between pairs.
 */
export function LoopBack(props: ArtProps) {
  return (
    <svg
      viewBox="0 0 600 60"
      aria-hidden="true"
      className="block h-auto w-full"
      {...props}
    >
      <path
        d="M400 10c60 0 60 30 120 30M580 40c10 0 15-4 15-10"
        fill="none"
        stroke={accent.aubergine}
        strokeWidth="1.4"
        strokeDasharray="2 8"
        strokeLinecap="round"
      />
      <path
        d="M400 10c0 0 -120 -6 -240 4"
        fill="none"
        stroke={accent.aubergine}
        strokeWidth="1.4"
        strokeDasharray="2 8"
        strokeLinecap="round"
      />
      <path d="M160 14l-6 12-10-9z" fill={accent.aubergine} />
    </svg>
  );
}
