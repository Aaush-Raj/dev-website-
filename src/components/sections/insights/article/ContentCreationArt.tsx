import type { SVGProps } from "react";

import { accent, ink } from "./tokens";

/**
 * CONTENT-CREATION — THE LINE ART
 * ---------------------------------------------------------------------------
 * The drawings in "Why content creation is no longer the bottleneck",
 * transcribed from the supplied export path for path.
 *
 * They are drawn rather than shipped as images for the same reason the export
 * drew them: flat line work in four colours stays exact at any size, costs a
 * fraction of a raster, and takes its palette from one place.
 *
 * The hero and the conversation carry meaning, so both keep the export's
 * `role="img"` and its `aria-label`. The four format icons sit beside their own
 * titles ("Podcast", "Job aid"), so they are `aria-hidden` — the export marks
 * them the same way.
 *
 * The hero's three embedded captions come in as props rather than being fixed
 * in the path data, so they stay translatable along with the rest of the copy.
 */

type ArtProps = Omit<SVGProps<SVGSVGElement>, "viewBox" | "children">;

/** The label face inside the drawings, matching the article's UI font. */
const LABEL_FONT = "var(--font-article)";

/* ======================================================================== */
/*  HERO — sources, a review lens, four output formats                      */
/* ======================================================================== */

export function SourcesToFormats({
  labels,
  ...props
}: ArtProps & {
  labels: { sources: string; review: string; outputs: string };
}) {
  return (
    <svg
      viewBox="0 0 560 430"
      role="img"
      aria-label="Line illustration: a stack of source documents and a media tile on the left, connected by dotted paths to four output formats on the right — a lesson, an audio episode, a scenario and a job aid — with a review lens on the central path"
      className="block h-auto w-full"
      {...props}
    >
      <defs>
        <pattern
          id="cc-hgrid"
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
        fill="url(#cc-hgrid)"
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

      {/* The source stack — three offset sheets, front one solid. */}
      <g fill="#FCFAF6" stroke={accent.violet} strokeWidth="1.3">
        <rect x="66" y="98" width="104" height="132" rx="8" opacity="0.55" />
        <rect x="56" y="110" width="104" height="132" rx="8" opacity="0.75" />
        <rect x="46" y="122" width="104" height="132" rx="8" />
      </g>
      <g
        stroke={ink.black}
        opacity="0.42"
        strokeWidth="1.1"
        strokeLinecap="round"
      >
        <path d="M62 148h72M62 164h72M62 180h52M62 196h72M62 212h44" />
      </g>

      {/* A media tile beneath the stack. */}
      <g fill="none" stroke={accent.olive} strokeWidth="1.3">
        <rect x="46" y="278" width="104" height="66" rx="8" />
        <path d="M88 298l24 13-24 13z" strokeLinejoin="round" />
      </g>

      <text
        x="98"
        y="366"
        fontFamily={LABEL_FONT}
        fontSize="10.5"
        fontWeight="700"
        letterSpacing="0.14em"
        fill={ink.subtle}
        textAnchor="middle"
      >
        {labels.sources}
      </text>

      {/* Four dotted routes fanning out through the lens. */}
      <g
        fill="none"
        stroke={accent.olive}
        strokeWidth="1.25"
        strokeDasharray="2 7"
        strokeLinecap="round"
      >
        <path d="M150 188c60 0 52-96 116-96" />
        <path d="M150 196h116" />
        <path d="M150 204c62 0 50 92 116 92" />
        <path d="M150 300c56 0 60 76 116 76" />
      </g>

      {/* The review lens on the central path — a magnifier with a tick. */}
      <g>
        <circle
          cx="240"
          cy="196"
          r="30"
          fill={ink.paper}
          stroke={accent.terracotta}
          strokeWidth="1.7"
        />
        <circle
          cx="240"
          cy="196"
          r="30"
          fill="none"
          stroke={accent.terracotta}
          strokeWidth="1.7"
          opacity="0.35"
          transform="scale(1.28) translate(-54 -44)"
        />
        <path
          d="M262 218l16 16"
          stroke={accent.terracotta}
          strokeWidth="1.9"
          strokeLinecap="round"
        />
        <path
          d="M228 196l8 9 16-18"
          fill="none"
          stroke={accent.terracotta}
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      <text
        x="240"
        y="252"
        fontFamily={LABEL_FONT}
        fontSize="10"
        fontWeight="700"
        letterSpacing="0.13em"
        fill={accent.terracotta}
        textAnchor="middle"
      >
        {labels.review}
      </text>

      {/* The four output cards, each with its own glyph. */}
      <g fill="none" strokeWidth="1.3">
        {/* A lesson. */}
        <rect
          x="330"
          y="62"
          width="168"
          height="62"
          rx="10"
          stroke={accent.violet}
        />
        <rect
          x="348"
          y="80"
          width="26"
          height="26"
          rx="5"
          stroke={accent.violet}
        />
        <path
          d="M354 88h14M354 96h10"
          stroke={accent.violet}
          strokeLinecap="round"
        />
        <path
          d="M390 84h84M390 96h56"
          stroke={ink.black}
          opacity="0.35"
          strokeLinecap="round"
        />

        {/* An audio episode. */}
        <rect
          x="330"
          y="166"
          width="168"
          height="62"
          rx="10"
          stroke={accent.olive}
        />
        <circle cx="361" cy="197" r="13" stroke={accent.olive} />
        <path
          d="M357 197v-4M361 197v-7M365 197v-3"
          stroke={accent.olive}
          strokeLinecap="round"
        />
        <path
          d="M390 189h84M390 201h48"
          stroke={ink.black}
          opacity="0.35"
          strokeLinecap="round"
        />

        {/* A scenario — a branching path. */}
        <rect
          x="330"
          y="266"
          width="168"
          height="62"
          rx="10"
          stroke={accent.terracotta}
        />
        <path
          d="M350 310l0-24 20 8 -8 8 12 8"
          stroke={accent.terracotta}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <path
          d="M390 289h84M390 301h60"
          stroke={ink.black}
          opacity="0.35"
          strokeLinecap="round"
        />

        {/* A job aid. */}
        <rect
          x="330"
          y="348"
          width="168"
          height="52"
          rx="10"
          stroke={accent.brass}
        />
        <path
          d="M350 366h16M350 376h16M350 386h10"
          stroke={accent.brass}
          strokeLinecap="round"
        />
        <path
          d="M390 368h84M390 380h44"
          stroke={ink.black}
          opacity="0.35"
          strokeLinecap="round"
        />
      </g>

      <text
        x="330"
        y="52"
        fontFamily={LABEL_FONT}
        fontSize="10.5"
        fontWeight="700"
        letterSpacing="0.13em"
        fill={ink.subtle}
      >
        {labels.outputs}
      </text>
    </svg>
  );
}

/* ======================================================================== */
/*  s3 — the four format icons                                              */
/* ======================================================================== */

/** A microphone on a stand. */
function PodcastIcon(props: ArtProps) {
  return (
    <svg viewBox="0 0 72 60" aria-hidden="true" {...props}>
      <g
        fill="none"
        stroke={accent.olive}
        strokeWidth="1.5"
        strokeLinecap="round"
      >
        <circle cx="36" cy="26" r="13" />
        <path d="M32 26v-5M36 26v-9M40 26v-4" />
        <path
          d="M20 30a16 16 0 0 0 32 0M36 46v6M28 52h16"
          stroke={ink.black}
          opacity="0.5"
        />
      </g>
    </svg>
  );
}

/** A screen with a play triangle. */
function DemonstrationIcon(props: ArtProps) {
  return (
    <svg viewBox="0 0 72 60" aria-hidden="true" {...props}>
      <g
        fill="none"
        stroke={accent.violet}
        strokeWidth="1.5"
        strokeLinecap="round"
      >
        <rect x="12" y="12" width="48" height="32" rx="5" />
        <path d="M31 22l14 6-14 6z" strokeLinejoin="round" />
        <path d="M26 52h20" stroke={ink.black} opacity="0.5" />
      </g>
    </svg>
  );
}

/** A branching path with two outcomes. */
function ScenarioIcon(props: ArtProps) {
  return (
    <svg viewBox="0 0 72 60" aria-hidden="true" {...props}>
      <g
        fill="none"
        stroke={accent.terracotta}
        strokeWidth="1.5"
        strokeLinecap="round"
      >
        <path d="M18 48V14l22 9-9 8 13 8" strokeLinejoin="round" />
        <circle cx="53" cy="20" r="6" />
        <circle cx="55" cy="43" r="6" />
        <path d="M40 26h7M40 34h9" stroke={ink.black} opacity="0.45" />
      </g>
    </svg>
  );
}

/** A card with a pointer beneath it. */
function JobAidIcon(props: ArtProps) {
  return (
    <svg viewBox="0 0 72 60" aria-hidden="true" {...props}>
      <g
        fill="none"
        stroke={accent.brass}
        strokeWidth="1.5"
        strokeLinecap="round"
      >
        <rect x="16" y="10" width="40" height="40" rx="5" />
        <path d="M24 22h20M24 30h20M24 38h12" />
        <path d="M50 46l4 8 4-8" stroke={ink.black} opacity="0.45" />
      </g>
    </svg>
  );
}

/** Keyed by the `icon` name in the content file. */
export const formatIcons = {
  podcast: PodcastIcon,
  demonstration: DemonstrationIcon,
  scenario: ScenarioIcon,
  jobAid: JobAidIcon,
} as const;

/* ======================================================================== */
/*  s5 — the service conversation                                           */
/* ======================================================================== */

/**
 * Two people either side of a dotted exchange, with three marked moments
 * along it. The three stems drop towards the labels printed beneath the
 * figure in markup — they are real text there rather than SVG, so they stay
 * selectable and wrap on a narrow screen.
 */
export function ServiceConversation(props: ArtProps) {
  const moments = [
    { cx: 196, cy: 122, stroke: accent.olive, stem: "M196 132v34" },
    { cx: 352, cy: 174, stroke: accent.terracotta, stem: "M352 184v22" },
    { cx: 498, cy: 132, stroke: accent.violet, stem: "M498 142v24" },
  ];

  return (
    <svg
      viewBox="0 0 620 250"
      role="img"
      aria-label="Line illustration: two people in a service conversation, with three observable moments marked along the exchange — policy explained, need confirmed, next action agreed"
      className="block h-auto w-full"
      {...props}
    >
      {/* The two figures. */}
      <g
        fill="none"
        stroke={ink.black}
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.62"
      >
        <circle cx="60" cy="72" r="17" />
        <path d="M34 122c6-18 14-26 26-26s20 8 26 26" />
        <circle cx="560" cy="72" r="17" />
        <path d="M534 122c6-18 14-26 26-26s20 8 26 26" />
      </g>

      {/* The exchange between them. */}
      <path
        d="M96 108c58 22 82 -4 132 22 52 26 60 44 122 44 60 0 92-40 142-52 22-5 42-6 32-6"
        fill="none"
        stroke={accent.olive}
        strokeWidth="1.3"
        strokeDasharray="2 7"
        strokeLinecap="round"
      />

      <g fill="#F1EFE4" strokeWidth="2">
        {moments.map((moment) => (
          <circle
            key={moment.cx}
            cx={moment.cx}
            cy={moment.cy}
            r="10"
            stroke={moment.stroke}
          />
        ))}
      </g>

      {/* The stems reaching down to the labels below the figure. */}
      <g strokeWidth="1.1" strokeLinecap="round" fill="none">
        {moments.map((moment) => (
          <path
            key={moment.cx}
            d={moment.stem}
            stroke={moment.stroke}
            opacity="0.6"
          />
        ))}
      </g>

      {/* The suggestion of speech beside each figure. */}
      <g stroke={ink.black} opacity="0.3" strokeWidth="1" strokeLinecap="round">
        <path d="M30 148h60M30 162h40M530 148h60M530 162h44" />
      </g>
    </svg>
  );
}
