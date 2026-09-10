import type { SVGProps } from "react";

import { accent, ink } from "./tokens";

/**
 * LIVING-BASELINES — THE LINE ART
 * ---------------------------------------------------------------------------
 * The drawings in "From competency documents to living baselines", transcribed
 * from the supplied export path for path.
 *
 * The hero and the refresh loop carry meaning, so both keep the export's
 * `role="img"` and its `aria-label`. The four anatomy glyphs sit beside their
 * own titles ("Work", "Standard"), so they are `aria-hidden` — the export
 * marks them the same way.
 *
 * The loop's stage names come in as props rather than being fixed in the path
 * data, so they stay translatable with the rest of the copy. The export sets
 * some of them on two lines; the labels arrive here as single strings and are
 * split on the space, so a translated label of any length still wraps.
 */

type ArtProps = Omit<SVGProps<SVGSVGElement>, "viewBox" | "children">;

const LABEL_FONT = "var(--font-article)";

/* ======================================================================== */
/*  HERO — a fixed table feeding a multi-dimensional profile                */
/* ======================================================================== */

export function TableToProfile(props: ArtProps) {
  return (
    <svg
      viewBox="0 0 560 430"
      role="img"
      aria-label="A fixed competency table feeds evidence into a multi-dimensional capability profile that can be updated over time."
      className="block h-auto w-full"
      {...props}
    >
      <defs>
        <pattern
          id="lb-hgrid"
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
        fill="url(#lb-hgrid)"
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

      {/* The competency table: five rows, two columns. */}
      <g fill="none" stroke={accent.violet} strokeWidth="1.3">
        <rect x="52" y="72" width="176" height="256" rx="10" />
        <path
          d="M52 116h176M52 160h176M52 204h176M52 248h176M52 292h176"
          opacity="0.7"
        />
        <path d="M120 72v256" opacity="0.7" />
      </g>
      <g
        stroke={ink.black}
        opacity="0.42"
        strokeWidth="1.1"
        strokeLinecap="round"
      >
        <path d="M64 94h44M138 94h56M64 138h40M138 138h48M64 182h50M138 182h40M64 226h36M138 226h58M64 270h48M138 270h44" />
      </g>

      {/* Two rows highlighted — the responsibilities that have moved. */}
      <g fill={accent.terracotta}>
        <rect x="132" y="128" width="82" height="20" rx="4" opacity="0.16" />
        <rect x="132" y="216" width="82" height="20" rx="4" opacity="0.16" />
      </g>

      {/* Their evidence feeding across into the profile. */}
      <g
        fill="none"
        stroke={accent.olive}
        strokeWidth="1.25"
        strokeDasharray="2 7"
        strokeLinecap="round"
      >
        <path d="M214 138c56 4 60-24 116-24" />
        <path d="M214 226c56 6 62 40 116 40" />
      </g>
      <circle cx="330" cy="114" r="4.5" fill={accent.olive} />
      <circle cx="330" cy="266" r="4.5" fill={accent.olive} />

      {/* The profile: three nested hexagons and their axes. */}
      <g>
        <polygon
          points="400,124 456,160 456,232 400,268 344,232 344,160"
          fill="none"
          stroke={ink.black}
          strokeWidth="0.9"
          opacity="0.18"
        />
        <polygon
          points="400,148 438,172 438,220 400,244 362,220 362,172"
          fill="none"
          stroke={accent.terracotta}
          strokeWidth="1.5"
        />
        <polygon
          points="400,166 424,182 424,210 400,226 376,210 376,182"
          fill="none"
          stroke={accent.violet}
          strokeWidth="1.6"
        />
        <g stroke={ink.black} strokeWidth="0.8" opacity="0.3">
          <path d="M400,124L400,268M344,160L456,232M456,160L344,232" />
        </g>
        <circle
          cx="424"
          cy="182"
          r="4"
          fill={accent.olive}
          stroke="#FCFAF6"
          strokeWidth="1.4"
        />
      </g>

      {/* The refresh arrow curling over the profile. */}
      <path
        d="M392 100a10 10 0 1 1 -3 19"
        fill="none"
        stroke={accent.brass}
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path d="M391 96l-3 6 7 1z" fill={accent.brass} />
    </svg>
  );
}

/* ======================================================================== */
/*  s4 — the four anatomy glyphs                                            */
/* ======================================================================== */

/** A document — the responsibility itself. */
function WorkIcon(props: ArtProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" {...props}>
      <g
        fill="none"
        stroke={accent.violet}
        strokeWidth="1.6"
        strokeLinecap="round"
      >
        <rect x="14" y="12" width="36" height="40" rx="6" />
        <path d="M22 26h20M22 34h20M22 42h12" />
      </g>
    </svg>
  );
}

/** A dial — the observable standard. */
function StandardIcon(props: ArtProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" {...props}>
      <g
        fill="none"
        stroke={accent.terracotta}
        strokeWidth="1.6"
        strokeLinecap="round"
      >
        <circle cx="32" cy="32" r="20" />
        <path d="M32 20v12l9 9" />
      </g>
    </svg>
  );
}

/** A rising trace to a marked point — the evidence. */
function EvidenceIcon(props: ArtProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" {...props}>
      <g
        fill="none"
        stroke={accent.olive}
        strokeWidth="1.6"
        strokeLinecap="round"
      >
        <path d="M20 46l0-10 8-14 8 8 8-16" />
        <circle cx="44" cy="14" r="3.4" fill={accent.olive} stroke="none" />
      </g>
    </svg>
  );
}

/** A downward arrow onto a line — the next action. */
function ActionIcon(props: ArtProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" {...props}>
      <g
        fill="none"
        stroke={ink.black}
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.75"
      >
        <path d="M32 14v28M20 32l12 12 12-12" />
        <path d="M18 50h28" />
      </g>
    </svg>
  );
}

/** Keyed by the `icon` name in the content file. */
export const anatomyIcons = {
  work: WorkIcon,
  standard: StandardIcon,
  evidence: EvidenceIcon,
  action: ActionIcon,
} as const;

/* ======================================================================== */
/*  s6 — the refresh loop                                                   */
/* ======================================================================== */

/**
 * Five stages across, with a dashed return curving back underneath. A small
 * dashed square marks the PAUSE before review — the export's way of showing
 * that a person decides to reopen a baseline, rather than a tracker doing it.
 */
export function RefreshLoop({
  stages,
  pause,
  ...props
}: ArtProps & { stages: readonly string[]; pause: string }) {
  /**
   * The export sets the longer stage names on two lines. Splitting on the
   * space keeps that without hard-coding which ones wrap, so a translated
   * label of a different length still breaks sensibly.
   */
  const lines = (label: string) => {
    const words = label.split(" ");
    if (words.length < 3) return [label];
    return [words.slice(0, -1).join(" "), words.at(-1) as string];
  };

  const marks = [
    { x: 80, label: stages[0] },
    { x: 215, label: stages[1] },
    { x: 365, label: stages[2] },
    { x: 530, label: stages[3] },
    { x: 620, label: stages[4] },
  ];

  return (
    <svg
      viewBox="0 0 700 300"
      role="img"
      aria-label="Changes in work trigger review, evidence gathering, gap agreement, action and a refreshed baseline."
      className="block h-auto w-full"
      {...props}
    >
      {/* The dashed hops between the first four stages. */}
      <g
        fill="none"
        stroke={accent.olive}
        strokeWidth="1.2"
        strokeDasharray="2 7"
        strokeLinecap="round"
      >
        <path d="M110 90h60" />
        <path d="M290 90h50" />
        <path d="M480 90h50" />
      </g>

      {/* 1 — sense change. */}
      <g
        fill="none"
        stroke={ink.black}
        strokeWidth="1.3"
        opacity="0.5"
        strokeLinecap="round"
      >
        <circle cx="80" cy="90" r="20" />
        <path d="M72 90h16M80 82v16" opacity="0.8" />
      </g>

      {/* 2 — the deliberate pause before reopening a baseline. */}
      <g
        fill="none"
        stroke={accent.terracotta}
        strokeWidth="1.8"
        strokeDasharray="4 4"
      >
        <rect x="195" y="70" width="40" height="40" rx="10" />
      </g>
      <text
        x="215"
        y="55"
        fontFamily={LABEL_FONT}
        fontSize="10"
        fontWeight="700"
        fill={accent.terracotta}
        textAnchor="middle"
        letterSpacing="0.08em"
      >
        {pause}
      </text>

      {/* 3 — gather evidence. */}
      <circle
        cx="365"
        cy="90"
        r="20"
        fill="none"
        stroke={accent.violet}
        strokeWidth="1.3"
      />
      <path
        d="M357 90l6 6 10-13"
        fill="none"
        stroke={accent.violet}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 4 — agree the gap. */}
      <circle
        cx="530"
        cy="90"
        r="20"
        fill="none"
        stroke={accent.olive}
        strokeWidth="1.3"
      />
      <path
        d="M521 96l9-14 5 7 6-9"
        fill="none"
        stroke={accent.olive}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* The return curve, back round to the start. */}
      <path
        d="M600 90c30 0 30 90 -140 90-170 0-170-90 -280 -90"
        fill="none"
        stroke={accent.olive}
        strokeWidth="1.2"
        strokeDasharray="2 7"
        strokeLinecap="round"
      />

      {/* 5 — act and refresh. */}
      <circle
        cx="620"
        cy="90"
        r="20"
        fill="none"
        stroke={ink.black}
        strokeWidth="1.3"
        opacity="0.65"
      />
      <path
        d="M612 90h16M620 82v16"
        stroke={ink.black}
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.65"
      />

      {/* The marker where the return curve re-enters the loop. */}
      <circle cx="180" cy="180" r="4.5" fill={accent.terracotta} />

      <g
        fontFamily={LABEL_FONT}
        fontSize="11.5"
        fontWeight="700"
        fill={ink.black}
        textAnchor="middle"
      >
        {marks.map((mark) => {
          const rows = lines(mark.label);

          return rows.map((row, index) => (
            <text key={`${mark.x}-${row}`} x={mark.x} y={132 + index * 14}>
              {row}
            </text>
          ));
        })}
      </g>
    </svg>
  );
}
