import type { SVGProps } from "react";

import { accent, ink } from "./tokens";

/**
 * READY-AT-WORK — THE LINE ART
 * ---------------------------------------------------------------------------
 * Every drawing in the article, transcribed from the supplied export path for
 * path. They are drawings rather than images for the reason the export made
 * them so: they are pure line work in four flat colours, so as SVG they stay
 * exact at any size, cost a fraction of a raster, and pick up the palette
 * from one place.
 *
 * Two kinds live here:
 *
 *   - The FIGURES (hero, rings, stages, conversation) carry meaning, so each
 *     keeps the export's `role="img"` and its `aria-label`. A caption beneath
 *     repeats the point in prose, which is why the labels stay terse.
 *
 *   - The four QUESTION ICONS are decoration beside a heading that already
 *     says what they mean, so they are `aria-hidden` — the export marks them
 *     the same way.
 *
 * The two animated groups use the keyframes defined in globals.css. Both are
 * ambient drift, so both stop under prefers-reduced-motion; that rule lives
 * with the keyframes rather than here.
 */

type ArtProps = Omit<SVGProps<SVGSVGElement>, "viewBox" | "children">;

/* ======================================================================== */
/*  HERO — profile card, dotted paths, readiness rings                      */
/* ======================================================================== */

export function HeroDiagram(props: ArtProps) {
  return (
    <svg
      viewBox="0 0 520 440"
      role="img"
      aria-label="Line diagram: an employee profile card connected by a dotted path to concentric readiness rings with a checkmark at the centre"
      className="block h-auto w-full"
      {...props}
    >
      <defs>
        {/* The faint graph paper behind the whole frame. */}
        <pattern
          id="raw-hgrid"
          width="26"
          height="26"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M26 0H0v26"
            fill="none"
            stroke={ink.black}
            strokeWidth="0.4"
            opacity="0.09"
          />
        </pattern>
      </defs>

      <rect x="26" y="18" width="468" height="404" rx="16" fill={ink.panel} />
      <rect
        x="26"
        y="18"
        width="468"
        height="404"
        rx="16"
        fill="url(#raw-hgrid)"
      />
      <rect
        x="26"
        y="18"
        width="468"
        height="404"
        rx="16"
        fill="none"
        stroke={ink.line}
      />

      {/* The person: a card, a head, shoulders. */}
      <g stroke={accent.violet} fill="none" strokeWidth="1.4">
        <rect x="58" y="128" width="148" height="184" rx="12" />
        <circle cx="132" cy="182" r="24" />
        <path d="M110 226c6-13 12-19 22-19s16 6 22 19" strokeLinecap="round" />
      </g>
      <g
        stroke={ink.black}
        opacity="0.5"
        strokeWidth="1.2"
        strokeLinecap="round"
      >
        <path d="M84 258h96" />
        <path d="M84 276h72" />
        <path d="M84 294h54" />
      </g>

      {/* Three dotted routes from the person out to the rings. */}
      <path
        d="M206 220c58 0 44-96 104-96"
        fill="none"
        stroke={accent.brass}
        strokeWidth="1.3"
        strokeDasharray="2 8"
        strokeLinecap="round"
      />
      <path
        d="M206 230c74 0 56 96 118 96"
        fill="none"
        stroke={accent.olive}
        strokeWidth="1.3"
        strokeDasharray="2 8"
        strokeLinecap="round"
      />
      <path
        d="M206 225h74"
        fill="none"
        stroke={accent.terracotta}
        strokeWidth="1.3"
        strokeDasharray="2 8"
        strokeLinecap="round"
      />

      {/* The rings, drifting slowly about their own centre. */}
      <g className="raw-drift" style={{ transformOrigin: "372px 224px" }}>
        <circle
          cx="372"
          cy="224"
          r="102"
          fill="none"
          stroke={ink.black}
          strokeWidth="0.9"
          opacity="0.16"
        />
        <circle
          cx="372"
          cy="224"
          r="78"
          fill="none"
          stroke={accent.olive}
          strokeWidth="1.2"
          strokeDasharray="196 300"
          strokeLinecap="round"
          transform="rotate(-96 372 224)"
        />
        <circle
          cx="372"
          cy="224"
          r="56"
          fill="none"
          stroke={accent.terracotta}
          strokeWidth="1.6"
          strokeDasharray="250 110"
          strokeLinecap="round"
          transform="rotate(-96 372 224)"
        />
        <circle
          cx="372"
          cy="224"
          r="34"
          fill="none"
          stroke={accent.violet}
          strokeWidth="1.8"
        />
        <path
          d="M358 224l10 11 20-23"
          fill="none"
          stroke={accent.violet}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* Four small evidence tiles scattered around the rings. */}
      <g fill="none" strokeWidth="1.3" strokeLinecap="round">
        <rect
          x="292"
          y="108"
          width="32"
          height="32"
          rx="7"
          stroke={accent.brass}
        />
        <path d="M300 118h16M300 124h16M300 130h10" stroke={accent.brass} />

        <rect
          x="440"
          y="176"
          width="32"
          height="32"
          rx="7"
          stroke={accent.terracotta}
        />
        <path d="M448 192l6 6 10-12" stroke={accent.terracotta} />

        <rect
          x="308"
          y="310"
          width="32"
          height="32"
          rx="7"
          stroke={accent.olive}
        />
        <path d="M314 332l6-12 5 7 5-11 4 16" stroke={accent.olive} />

        <rect
          x="424"
          y="300"
          width="32"
          height="32"
          rx="7"
          stroke={ink.black}
          opacity="0.55"
        />
        <path d="M432 316h16M440 308v16" stroke={ink.black} opacity="0.55" />
      </g>
    </svg>
  );
}

/* ======================================================================== */
/*  s2 — four rings at four different levels                                */
/* ======================================================================== */

/**
 * A 2×2 of part-filled rings. The dash arrays are the export's: the ring
 * circumference is ~151, so "136 151" reads as roughly nine-tenths filled,
 * "30 151" as a fifth. Four responsibilities, four different levels.
 */
export function FourRings(props: ArtProps) {
  const rings = [
    { cx: 42, cy: 46, dash: 136, stroke: accent.violet },
    { cx: 112, cy: 46, dash: 68, stroke: accent.terracotta },
    { cx: 42, cy: 106, dash: 106, stroke: accent.olive },
    { cx: 112, cy: 106, dash: 30, stroke: accent.brass },
  ];

  return (
    <svg
      viewBox="0 0 200 152"
      role="img"
      aria-label="Diagram: four partially completed readiness rings, each filled to a different extent"
      className="block h-auto w-full"
      {...props}
    >
      <g fill="none" strokeWidth="4" strokeLinecap="round">
        {rings.map((ring) => (
          <g key={`${ring.cx}-${ring.cy}`}>
            <circle cx={ring.cx} cy={ring.cy} r="24" stroke={ink.ringTrack} />
            <circle
              cx={ring.cx}
              cy={ring.cy}
              r="24"
              stroke={ring.stroke}
              strokeDasharray={`${ring.dash} 151`}
              transform={`rotate(-90 ${ring.cx} ${ring.cy})`}
            />
          </g>
        ))}
      </g>
      {/* The suggestion of labels beside the top and bottom rows. */}
      <g
        stroke={ink.black}
        opacity="0.35"
        strokeWidth="1"
        strokeLinecap="round"
      >
        <path d="M150 40h34M150 52h22M150 100h34M150 112h18" />
      </g>
    </svg>
  );
}

/* ======================================================================== */
/*  s5 — the four question icons                                            */
/* ======================================================================== */

/** 01 — a requirement being singled out of a list. */
function RequirementIcon(props: ArtProps) {
  return (
    <svg viewBox="0 0 80 80" aria-hidden="true" {...props}>
      <g
        fill="none"
        stroke={accent.olive}
        strokeWidth="1.4"
        strokeLinecap="round"
      >
        <circle cx="40" cy="40" r="26" opacity="0.4" />
        <path d="M26 46h12M26 38h20M26 30h8" />
        <circle cx="54" cy="46" r="6" stroke={accent.terracotta} />
      </g>
    </svg>
  );
}

/** 02 — rising bars under a trend line: what "good" looks like. */
function StandardIcon(props: ArtProps) {
  return (
    <svg viewBox="0 0 80 80" aria-hidden="true" {...props}>
      <g
        fill="none"
        stroke={accent.brass}
        strokeWidth="1.4"
        strokeLinecap="round"
      >
        <path d="M18 58h44" opacity="0.5" />
        <path d="M26 58V44M38 58V34M50 58V24" />
        <path d="M22 30l10-6 10 4 12-10" stroke={accent.violet} />
      </g>
    </svg>
  );
}

/** 03 — a core squeezed between two conditions. */
function ConditionsIcon(props: ArtProps) {
  return (
    <svg viewBox="0 0 80 80" aria-hidden="true" {...props}>
      <g
        fill="none"
        stroke={accent.violet}
        strokeWidth="1.4"
        strokeLinecap="round"
      >
        <path d="M40 16v48" opacity="0.35" />
        <path
          d="M22 30c12 0 12 20 0 20M58 30c-12 0-12 20 0 20"
          stroke={accent.olive}
        />
        <circle cx="40" cy="40" r="7" stroke={accent.terracotta} />
      </g>
    </svg>
  );
}

/** 04 — a document with a verified mark. */
function EvidenceIcon(props: ArtProps) {
  return (
    <svg viewBox="0 0 80 80" aria-hidden="true" {...props}>
      <g
        fill="none"
        stroke={ink.black}
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.65"
      >
        <rect x="20" y="18" width="40" height="46" rx="6" />
        <path d="M28 32h24M28 42h24M28 52h14" />
        <circle cx="56" cy="56" r="9" stroke={accent.terracotta} opacity="1" />
        <path d="M52 56l3 3 6-7" stroke={accent.terracotta} opacity="1" />
      </g>
    </svg>
  );
}

/** Keyed by the `icon` name in the content file. */
export const questionIcons = {
  requirement: RequirementIcon,
  standard: StandardIcon,
  conditions: ConditionsIcon,
  evidence: EvidenceIcon,
} as const;

/* ======================================================================== */
/*  s6 — understand → apply → perform → adapt                               */
/* ======================================================================== */

/**
 * Four rings on a line, each carrying more evidence than the last. The dash
 * arrays run 47 / 94 / 141 / 177 against a ~189 circumference — a quarter,
 * a half, three-quarters, and nearly whole.
 *
 * The stage labels come from the content file rather than being hard-coded,
 * so they stay translatable even though they are inside the drawing.
 */
export function StageDiagram({
  labels,
  start,
  end,
  ...props
}: ArtProps & {
  labels: readonly string[];
  start: string;
  end: string;
}) {
  const stages = [
    { cx: 90, dash: 47, stroke: accent.violet },
    { cx: 266, dash: 94, stroke: accent.violet },
    { cx: 442, dash: 141, stroke: accent.terracotta },
    { cx: 618, dash: 177, stroke: accent.olive },
  ];

  return (
    <svg
      viewBox="0 0 708 210"
      role="img"
      aria-label="Diagram: capability developing through four overlapping states — understand, apply, perform, adapt — shown as progressively filled rings on a continuous line"
      className="block h-auto w-full"
      {...props}
    >
      <path d="M60 118h580" stroke={ink.line} strokeWidth="1" />

      <g fill="none" strokeWidth="3" strokeLinecap="round">
        {stages.map((stage) => (
          <g key={stage.cx}>
            <circle cx={stage.cx} cy="118" r="30" stroke={ink.ringTrack} />
            <circle
              cx={stage.cx}
              cy="118"
              r="30"
              stroke={stage.stroke}
              strokeDasharray={`${stage.dash} 189`}
              transform={`rotate(-90 ${stage.cx} 118)`}
            />
          </g>
        ))}
      </g>

      {/* The dotted joins between rings. */}
      <g
        fill="none"
        stroke={accent.brass}
        strokeWidth="1.2"
        strokeDasharray="2 7"
        strokeLinecap="round"
      >
        <path d="M124 118h108M300 118h108M476 118h108" />
      </g>

      <g
        fontFamily="var(--font-article)"
        fontSize="13"
        fontWeight="600"
        fill={ink.black}
        textAnchor="middle"
        letterSpacing="0.06em"
      >
        {stages.map((stage, index) => (
          <text key={stage.cx} x={stage.cx} y="184">
            {labels[index]}
          </text>
        ))}
      </g>

      <g
        fontFamily="var(--font-article)"
        fontSize="11"
        fill={ink.subtle}
        textAnchor="middle"
      >
        <text x="90" y="52">
          {start}
        </text>
        <text x="618" y="52">
          {end}
        </text>
      </g>
    </svg>
  );
}

/* ======================================================================== */
/*  s7 — the customer conversation                                          */
/* ======================================================================== */

/**
 * Two speech cards joined by a wandering dotted route, with six numbered
 * moments marked along it — the six observable behaviours listed beside it.
 * The numbers are drawn rather than listed because the list beneath the
 * figure names all six in order.
 */
export function ConversationDiagram(props: ArtProps) {
  const moments = [
    { cx: 118, cy: 122, stroke: accent.terracotta, label: "1" },
    { cx: 200, cy: 152, stroke: accent.terracotta, label: "2" },
    { cx: 262, cy: 196, stroke: accent.violet, label: "3" },
    { cx: 332, cy: 230, stroke: accent.violet, label: "4" },
    { cx: 420, cy: 238, stroke: accent.olive, label: "5" },
    { cx: 490, cy: 212, stroke: accent.olive, label: "6" },
  ];

  return (
    <svg
      viewBox="0 0 640 290"
      role="img"
      aria-label="Diagram: a customer conversation with six observable moments marked along its course"
      className="block h-auto w-full"
      {...props}
    >
      {/* The two speech bubbles, opening and closing the exchange. */}
      <g fill="none" stroke={ink.black} strokeWidth="1.3" opacity="0.55">
        <rect x="16" y="24" width="112" height="52" rx="12" />
        <path d="M40 76l4 14 14-14" />
        <rect x="512" y="212" width="112" height="52" rx="12" />
        <path d="M600 212l-4-14-14 14" />
      </g>
      <g stroke={ink.black} opacity="0.3" strokeWidth="1" strokeLinecap="round">
        <path d="M34 44h64M34 58h44M530 232h64M530 246h40" />
      </g>

      {/* The route the conversation takes. */}
      <path
        d="M72 96c0 60 120 40 160 76 44 40-20 62 40 82 52 18 180-4 226-46"
        fill="none"
        stroke={accent.brass}
        strokeWidth="1.2"
        strokeDasharray="2 7"
        strokeLinecap="round"
      />

      <g fill="none" strokeWidth="2" strokeLinecap="round">
        {moments.map((moment) => (
          <circle
            key={moment.label}
            cx={moment.cx}
            cy={moment.cy}
            r="11"
            stroke={moment.stroke}
          />
        ))}
      </g>

      <g
        fontFamily="var(--font-article)"
        fontSize="10"
        fontWeight="700"
        fill={ink.black}
        textAnchor="middle"
        opacity="0.7"
      >
        {moments.map((moment) => (
          <text key={moment.label} x={moment.cx} y={moment.cy + 4}>
            {moment.label}
          </text>
        ))}
      </g>

      <g
        stroke={accent.olive}
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      >
        <path d="M40 44h64M40 58h44M528 232h64M528 246h40" />
      </g>
    </svg>
  );
}
