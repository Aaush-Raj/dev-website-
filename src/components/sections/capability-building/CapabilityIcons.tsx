import type { SVGProps } from "react";

/**
 * CAPABILITY BUILDING ICONS
 * ---------------------------------------------------------------------------
 * The two engine marks that sit on the hero panels' tinted discs, plus the
 * tick used by the checklist and the completed GrowthPath step.
 *
 * Drawn inline rather than shipped, for the same reason as the other solutions
 * icon sets (see FrontlineIcons.tsx): these render at 16-28px, so a raster
 * buys nothing a path does not, and inline stays crisp at any density.
 *
 * The engine marks are transparent and inherit currentColor — the tinted disc
 * behind them belongs to the panel, so the caller draws it.
 */

type IconProps = SVGProps<SVGSVGElement>;

/** The shared stroke setup for the outlined glyphs, as the design draws them. */
const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** LurnyPulse — the heartbeat trace, as the design draws it. */
export function PulseGlyph(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M2 12h3.4l2-6.2 3.1 12.4 2.6-8.1 1.7 1.9H22"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.9}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** KxP — the sprouting seedling. */
export function GrowthGlyph(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      {/* The stem, running the full height so the leaves have something to sit on. */}
      <path
        d="M12 21.5V10"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
      {/*
        Two leaves, filled rather than stroked — they are solid shapes in the
        design, and at 22px a stroked outline would close up into a blob.
        Each is a teardrop meeting the stem, the right one higher than the left.
      */}
      <path
        d="M12 11.4c0-4.3 3-7.2 8-7.4.3 4.8-2.9 7.6-8 7.4Z"
        fill="currentColor"
      />
      <path
        d="M11.7 15.1C11.4 11.5 8.9 9.1 4 9c-.2 3.8 2.3 6.4 7.7 6.1Z"
        fill="currentColor"
      />
    </svg>
  );
}

/**
 * The tick. Used both in the role checklist and on the completed GrowthPath
 * step, so it lives here rather than being repeated in the hero.
 */
export function CheckGlyph(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="m6 12.4 4 4L18 8"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** The arrow on the primary action. */
export function ArrowGlyph(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" {...props}>
      <path
        d="M2 8h12M9.5 3.5 14 8l-4.5 4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ========================================================================== */
/* REALITY SECTION                                                            */
/* ========================================================================== */

/**
 * The three stage marks and the trend glyph, all outlined rather than filled —
 * on the dark band they read as line art, matching the cards' own strokes.
 */

/** Role expectations — a document with a folded corner. */
export function DocumentGlyph(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z"
        {...stroke}
      />
      {/* The fold, which is what makes it read as paper rather than a card. */}
      <path d="M14 3v5h5" {...stroke} />
      <path d="M8.5 12.5h7M8.5 16h4.5" {...stroke} />
    </svg>
  );
}

/** Proficiency assessment — a bar chart, ascending. */
export function BarsGlyph(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect x="3.5" y="14" width="4.4" height="6.5" rx="1.2" {...stroke} />
      <rect x="9.8" y="9.5" width="4.4" height="11" rx="1.2" {...stroke} />
      <rect x="16.1" y="4.5" width="4.4" height="16" rx="1.2" {...stroke} />
    </svg>
  );
}

/** Learning and development — a graduation cap with its tassel. */
export function CapGlyph(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      {/*
        The board is FILLED, not stroked. As an outline it read as a flat
        diamond at 24px — the shape only says "graduation cap" once the board
        is solid and the crown sits under it.
      */}
      <path d="M2 8.6 12 4l10 4.6-10 4.6L2 8.6Z" fill="currentColor" />
      {/* The crown beneath the board, which gives the cap its depth. */}
      <path
        d="M6.6 10.7v3.6c0 1.8 2.4 3.2 5.4 3.2s5.4-1.4 5.4-3.2v-3.6"
        {...stroke}
      />
      {/* The tassel, hanging off the right corner. */}
      <path d="M20.6 9.2v4.4" {...stroke} />
      <circle cx="20.6" cy="14.6" r="1.1" fill="currentColor" />
    </svg>
  );
}

/** Progress — a rising line with an arrowhead. */
export function TrendGlyph(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M3 17.5 9 11l4 3.6 7.2-7.6" {...stroke} />
      <path d="M15.6 6.7h4.9v4.9" {...stroke} />
    </svg>
  );
}

/* ========================================================================== */
/* JOURNEY CARDS                                                              */
/* ========================================================================== */

/** Two figures — the people/collaboration mark on the role and path cards. */
export function PeopleGlyph(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="9.2" cy="8.4" r="3.2" {...stroke} />
      <path d="M3.4 19.4c.5-3 2.9-4.9 5.8-4.9s5.3 1.9 5.8 4.9" {...stroke} />
      <path
        d="M16.2 6.1a3.1 3.1 0 0 1 0 5.9M17.6 14.9c1.7.7 2.8 2.3 3.1 4.5"
        {...stroke}
      />
    </svg>
  );
}

/** A cog — execution and delivery. */
export function GearGlyph(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      {/*
        The teeth are SHORT and the body is large. A first pass used long
        spokes off a small circle, which read as a sun rather than a cog at
        18px — the silhouette only says "gear" when the teeth barely clear
        the body.
      */}
      <circle cx="12" cy="12" r="3.3" {...stroke} />
      <circle cx="12" cy="12" r="7.2" {...stroke} />
      <path
        d="M12 4.8V2.9M12 21.1v-1.9M19.2 12h1.9M2.9 12h1.9M17.1 6.9l1.35-1.35M5.55 18.45 6.9 17.1M17.1 17.1l1.35 1.35M5.55 5.55 6.9 6.9"
        {...stroke}
      />
    </svg>
  );
}

/** A target — the first GrowthPath step. */
export function TargetGlyph(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="8.4" {...stroke} />
      <circle cx="12" cy="12" r="4.2" {...stroke} />
      <circle cx="12" cy="12" r="1.3" fill="currentColor" />
    </svg>
  );
}

/** The chevron on the practice-task row. */
export function ChevronGlyph(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="m9.5 5.5 7 6.5-7 6.5" {...stroke} />
    </svg>
  );
}

/**
 * The overflow dots each journey card carries in its header.
 *
 * Purely decorative — they are part of the card's chrome in the design, not a
 * control, so they carry no affordance and no accessible name.
 */
export function DotsGlyph(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="5" cy="12" r="1.6" fill="currentColor" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" />
      <circle cx="19" cy="12" r="1.6" fill="currentColor" />
    </svg>
  );
}

/* ========================================================================== */
/* ROLE SECTION                                                               */
/* ========================================================================== */

/** A speech bubble — customer communication. */
export function ChatGlyph(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M20.5 12.3c0 4-3.8 7.2-8.5 7.2a9.8 9.8 0 0 1-2.6-.35L4.2 20.8l1.3-3.5A6.9 6.9 0 0 1 3.5 12.3c0-4 3.8-7.2 8.5-7.2s8.5 3.2 8.5 7.2Z"
        {...stroke}
      />
    </svg>
  );
}

/** An open book — product knowledge. */
export function BookGlyph(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      {/* Two leaves meeting at the spine, which is what reads as "open". */}
      <path
        d="M12 6.6C10.4 5.3 8.3 4.7 5.6 4.7H3v13h2.6c2.7 0 4.8.6 6.4 1.9"
        {...stroke}
      />
      <path
        d="M12 6.6c1.6-1.3 3.7-1.9 6.4-1.9H21v13h-2.6c-2.7 0-4.8.6-6.4 1.9"
        {...stroke}
      />
      <path d="M12 6.6v12.9" {...stroke} />
    </svg>
  );
}
