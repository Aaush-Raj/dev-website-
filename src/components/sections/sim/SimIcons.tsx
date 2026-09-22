import type { SVGProps } from "react";

/**
 * LURNYSIM ICONS
 * ---------------------------------------------------------------------------
 * The marks used across the hero: the three feature glyphs beneath the
 * buttons, and the small marks inside the simulation window and scorecard.
 *
 * Drawn inline rather than shipped, like the other icon sets on this build.
 * The design supplies the three feature glyphs as 1254px PNGs (~890KB for the
 * set) but they render at 20px on a coloured disc — a raster buys nothing a
 * path does not, and inline stays crisp at any density while inheriting
 * currentColor.
 */

type IconProps = SVGProps<SVGSVGElement>;

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/* ========================================================================== */
/* FEATURE MARKS                                                              */
/* ========================================================================== */

/** AI role-play — two figures in conversation. */
export function PeopleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="9" cy="8.4" r="3.1" {...stroke} />
      <path d="M3.4 19.2a5.9 5.9 0 0 1 11.2 0" {...stroke} />
      {/* The second figure, set behind and to the right. */}
      <path d="M16.4 6.1a3 3 0 0 1 0 5.9" {...stroke} />
      <path d="M17.4 14a5.9 5.9 0 0 1 3.4 5.2" {...stroke} />
    </svg>
  );
}

/** Voice or text, and the capture button — a microphone. */
export function MicIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect x="9.1" y="2.9" width="5.8" height="11" rx="2.9" {...stroke} />
      <path d="M5.8 11.4a6.2 6.2 0 0 0 12.4 0" {...stroke} />
      <path d="M12 17.6v3.5" {...stroke} />
    </svg>
  );
}

/**
 * Live scoring — three rising bars.
 *
 * Filled rather than stroked: at 20px an outlined bar chart closes up into a
 * grey smudge, and the design's mark is solid.
 */
export function BarsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <g fill="currentColor">
        <rect x="3.6" y="13.4" width="4.2" height="7" rx="1.2" />
        <rect x="9.9" y="9.2" width="4.2" height="11.2" rx="1.2" />
        <rect x="16.2" y="4.4" width="4.2" height="16" rx="1.2" />
      </g>
    </svg>
  );
}

/* ========================================================================== */
/* WINDOW MARKS                                                               */
/* ========================================================================== */

/**
 * The simulation window's title mark — a four-point sparkle.
 *
 * The conventional mark for a generated response across this build, so the
 * window reads as AI-driven before the copy says so.
 */
export function SparkleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <g fill="currentColor">
        <path d="M13.4 2.6c.3 3.6 1.9 5.5 5.6 6.1-3.7.6-5.3 2.5-5.6 6.1-.3-3.6-1.9-5.5-5.6-6.1 3.7-.6 5.3-2.5 5.6-6.1Z" />
        {/* The smaller second star, low and to the left. */}
        <path d="M7.2 14.1c.2 2 1 2.9 3 3.3-2 .4-2.8 1.3-3 3.3-.2-2-1-2.9-3-3.3 2-.4 2.8-1.3 3-3.3Z" />
      </g>
    </svg>
  );
}

/** The Text mode's mark — a keyboard. */
export function KeyboardIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect x="2.4" y="5.6" width="19.2" height="12.8" rx="2.4" {...stroke} />
      {/* Two rows of keys and a space bar, filled so they read at 18px. */}
      <g fill="currentColor">
        <rect x="5.3" y="8.6" width="2" height="2" rx="0.6" />
        <rect x="8.7" y="8.6" width="2" height="2" rx="0.6" />
        <rect x="12.1" y="8.6" width="2" height="2" rx="0.6" />
        <rect x="15.5" y="8.6" width="3.2" height="2" rx="0.6" />
        <rect x="5.3" y="12" width="3.2" height="2" rx="0.6" />
        <rect x="9.9" y="12" width="2" height="2" rx="0.6" />
        <rect x="13.3" y="12" width="2" height="2" rx="0.6" />
        <rect x="16.7" y="12" width="2" height="2" rx="0.6" />
        <rect x="7.6" y="15" width="8.8" height="1.8" rx="0.7" />
      </g>
    </svg>
  );
}

/** The "You" turn's avatar — a single figure, filled on a solid disc. */
export function UserIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <g fill="currentColor">
        <circle cx="12" cy="8.6" r="3.7" />
        <path d="M4.6 20.2a7.4 7.4 0 0 1 14.8 0Z" />
      </g>
    </svg>
  );
}

/* ========================================================================== */
/* PROBLEM SECTION MARKS                                                      */
/* ========================================================================== */

/**
 * AI customers — two overlapping speech bubbles, the front one carrying three
 * dots.
 *
 * Outlined to match the design's set, which is line art throughout. The dots
 * are filled: at this stroke weight an outlined dot closes into a blob.
 *
 * The front bubble is drawn SECOND and carries a short cut-out stroke along
 * the overlap, so the back bubble's outline does not run through it — without
 * that the two read as one tangled shape rather than as two stacked bubbles.
 */
export function BubblesIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      {/* The back bubble, offset down and right, with its tail at the foot. */}
      <path
        d="M11.6 10.8h6.1A2.3 2.3 0 0 1 20 13.1v3.6a2.3 2.3 0 0 1-2.3 2.3h-1.2v2.6l-2.9-2.6h-2a2.3 2.3 0 0 1-2.3-2.3v-3.6a2.3 2.3 0 0 1 2.3-2.3Z"
        {...stroke}
      />
      {/* The front bubble, upper left, tail pointing down. */}
      <path
        d="M4.3 2.4h9.1a2.3 2.3 0 0 1 2.3 2.3v3.9a2.3 2.3 0 0 1-2.3 2.3H8.9l-3.2 2.5v-2.5h-1.4a2.3 2.3 0 0 1-2.3-2.3V4.7a2.3 2.3 0 0 1 2.3-2.3Z"
        fill="#fff"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g fill="currentColor">
        <circle cx="6.1" cy="6.7" r="0.95" />
        <circle cx="8.9" cy="6.7" r="0.95" />
        <circle cx="11.7" cy="6.7" r="0.95" />
      </g>
    </svg>
  );
}

/**
 * Live scoring — three rising bars, outlined.
 *
 * Distinct from `BarsIcon`, which is filled: that one renders at 20px inside
 * a disc where an outline would close up, while this sits at 34px on the
 * open ground and the design draws it as line art.
 */
export function BarsOutlineIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect x="2.8" y="14.2" width="4.8" height="7.2" rx="1.4" {...stroke} />
      <rect x="9.6" y="9.4" width="4.8" height="12" rx="1.4" {...stroke} />
      <rect x="16.4" y="3.4" width="4.8" height="18" rx="1.4" {...stroke} />
    </svg>
  );
}

/**
 * Repeat practice — two arcs chasing each other round a circle.
 *
 * Two three-quarter arcs with a gap at each end rather than a closed ring:
 * the gaps and the arrowheads are what make it read as "again" instead of as
 * a plain circle. The heads are drawn as two strokes meeting at the arc's
 * end point, so they sit ON the path rather than floating beside it.
 */
export function RepeatIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      {/* Upper arc, sweeping clockwise from the left round to the right. */}
      <path d="M2.9 12a9.1 9.1 0 0 1 15.5-6.4" {...stroke} />
      <path d="m18.7 1.6.1 4.2-4.2.1" {...stroke} />
      {/* Lower arc, sweeping back. */}
      <path d="M21.1 12a9.1 9.1 0 0 1-15.5 6.4" {...stroke} />
      <path d="m5.3 22.4-.1-4.2 4.2-.1" {...stroke} />
    </svg>
  );
}

/* ========================================================================== */
/* SERVICE SECTION MARKS                                                      */
/* ========================================================================== */

/**
 * Show empathy under pressure — an ear.
 *
 * The outer helix, the inner fold and the lobe, drawn as one open path plus
 * the inner curl. A closed blob at this size reads as a comma, so the gap at
 * the lobe is what keeps it an ear.
 */
export function EarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      {/* The outer helix, sweeping down from the top to the lobe. */}
      <path
        d="M5.6 9.4a6.4 6.4 0 1 1 12.8.2c0 3.1-2.1 4.6-3.4 5.8-1.1 1-1.7 1.8-1.9 3a2.7 2.7 0 0 1-5.3-.6"
        {...stroke}
      />
      {/* The inner fold: a smaller arc tucked inside the helix. */}
      <path
        d="M9 9.6a3.1 3.1 0 0 1 6.1.5c0 1.6-1.4 2.4-2.3 3.2-.7.6-1.1 1.2-1.2 2"
        {...stroke}
      />
      {/* The tragus notch. */}
      <circle cx="14.6" cy="16.9" r="0.55" fill="currentColor" />
    </svg>
  );
}

/**
 * Explain the next step clearly — a signpost.
 *
 * Two boards on one post, pointing opposite ways: the upper points right,
 * the lower left. That opposition is the point — a single board would read
 * as a direction rather than as a choice being explained.
 *
 * The boards are STACKED with a clear gap between them. Drawn overlapping,
 * their outlines cross and the mark reads as a crossed box rather than as a
 * signpost.
 */
export function SignpostIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      {/* The post, behind both boards. */}
      <path d="M12 1.8v20.4" {...stroke} />
      {/* Upper board, pointing right. */}
      <path d="M4.8 4.9h12.4l2.6 2.5-2.6 2.5H4.8V4.9Z" {...stroke} />
      {/* Lower board, pointing left, clear of the one above. */}
      <path d="M19.2 13.7H6.8l-2.6 2.5 2.6 2.5h12.4v-5Z" {...stroke} />
    </svg>
  );
}

/* ========================================================================== */
/* COACHING SECTION MARKS                                                     */
/* ========================================================================== */

/**
 * Lead with empathy — a heart.
 *
 * Outlined, as the design draws it: a filled heart at this size reads as a
 * "like" affordance rather than as a quality of the conversation.
 */
export function HeartIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M12 20.4 4.4 13a4.7 4.7 0 0 1 0-6.7 4.7 4.7 0 0 1 6.7 0l.9.9.9-.9a4.7 4.7 0 0 1 6.7 0 4.7 4.7 0 0 1 0 6.7Z"
        {...stroke}
      />
    </svg>
  );
}

/**
 * Listen through resistance — a round speech bubble.
 *
 * Distinct from `BubblesIcon`, which is a stacked pair on the light section:
 * this is the single round bubble the coaching design uses, with its tail at
 * the lower left.
 */
export function BubbleRoundIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M12 3.4a8.3 8.3 0 1 1-6.6 13.3l-1.5 3.9 4.1-1.4A8.3 8.3 0 0 1 12 3.4Z"
        {...stroke}
      />
    </svg>
  );
}

/* ========================================================================== */
/* DEMO SECTION MARKS                                                         */
/* ========================================================================== */

/** The session length — a clock reading roughly two o'clock, as the design draws it. */
export function ClockIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="9.2" {...stroke} />
      <path d="M12 6.6V12l3.6 2.6" {...stroke} />
    </svg>
  );
}

/**
 * Practice scenarios — two overlapping rounded squares.
 *
 * The front square carries a short cut-out along the overlap so the back
 * one's outline does not run through it; without that the pair reads as one
 * notched shape rather than as two stacked cards.
 */
export function ScenariosIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      {/* The back square, upper left. */}
      <rect x="2.9" y="2.9" width="12.2" height="12.2" rx="3.2" {...stroke} />
      {/* The front square, lower right, filled so it masks the one behind. */}
      <rect
        x="8.9"
        y="8.9"
        width="12.2"
        height="12.2"
        rx="3.2"
        fill="#fff"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
