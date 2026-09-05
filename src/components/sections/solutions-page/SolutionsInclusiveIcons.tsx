import type { SVGProps } from "react";

/**
 * SOLUTIONS — INCLUSIVE-LEARNING ICONS
 * ---------------------------------------------------------------------------
 * The glyphs on section 6: two in the meta chips under the headline, three on
 * the frosted cards over the photograph, two beside the panel's blocks.
 *
 * Redrawn inline rather than shipped, for the same reason as section 4's set
 * (see SolutionsCaseIcons.tsx): the supplied artwork is 512px PNG and these
 * render at roughly 20-24px, so seven extra requests would buy nothing that a
 * stroked path does not already give — and inline stays crisp at any density.
 *
 * The supplied icons sit on a violet disc. That disc belongs to the CHIP or the
 * CARD, not the glyph, so it is drawn by the caller — the icons here are
 * transparent and inherit currentColor.
 */

type IconProps = SVGProps<SVGSVGElement>;

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/* ========================================================================== */
/* META CHIP ICONS                                                            */
/* ========================================================================== */

/** Two figures — the Sahiyog accessibility programme. */
function SahiyogIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="9.4" cy="8" r="3.2" {...stroke} />
      <path d="M3.6 19.4a5.8 5.8 0 0 1 11.6 0" {...stroke} />
      <path
        d="M16 5.2a3 3 0 0 1 0 5.7M17.4 13.6a5.2 5.2 0 0 1 3 4.6"
        {...stroke}
      />
    </svg>
  );
}

/** A classical portico — the foundation. */
function FoundationIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M2.8 8.6 12 4l9.2 4.6" {...stroke} />
      <path
        d="M5.4 10.4v7.2M10 10.4v7.2M14 10.4v7.2M18.6 10.4v7.2"
        {...stroke}
      />
      <path d="M3.4 19.8h17.2" {...stroke} />
    </svg>
  );
}

/* ========================================================================== */
/* CARD ICONS                                                                 */
/* ========================================================================== */

/** A speaker — voice-first learning. */
function VoiceIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M11.4 4.6 6.8 8.4H3.9a1 1 0 0 0-1 1v5.2a1 1 0 0 0 1 1h2.9l4.6 3.8Z"
        {...stroke}
      />
      <path
        d="M15.4 9.2a4 4 0 0 1 0 5.6M18.2 6.6a7.8 7.8 0 0 1 0 10.8"
        {...stroke}
      />
    </svg>
  );
}

/** A framed picture — image-led guidance. */
function ImageIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect x="3.2" y="4.8" width="17.6" height="14.4" rx="2.2" {...stroke} />
      <circle cx="8.6" cy="10" r="1.6" {...stroke} />
      <path d="m4.4 17.2 4.8-4.4 3.4 3 3-2.6 4 3.6" {...stroke} />
    </svg>
  );
}

/** A group — the shared kiosk, used together rather than alone. */
function KioskIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="8.6" cy="8.4" r="3" {...stroke} />
      <path d="M3.2 19.2a5.4 5.4 0 0 1 10.8 0" {...stroke} />
      <circle cx="16.8" cy="7.4" r="2.4" {...stroke} />
      <path d="M15.2 12.6a4.8 4.8 0 0 1 5.6 4.6" {...stroke} />
    </svg>
  );
}

/* ========================================================================== */
/* PANEL BLOCK ICONS                                                          */
/* ========================================================================== */

/** A figure against a rise — the challenge to be climbed. */
function ChallengeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="12" cy="7.4" r="2.8" {...stroke} />
      <path d="M4.4 19.6 9 13.4l2.6 3 2.4-2.2 5.6 5.4Z" {...stroke} />
    </svg>
  );
}

/** Two figures side by side — Lurny working alongside the team. */
function HelpedIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="7.8" cy="8.6" r="2.8" {...stroke} />
      <circle cx="16.2" cy="8.6" r="2.8" {...stroke} />
      <path d="M2.8 19a5 5 0 0 1 10 0M11.2 19a5 5 0 0 1 10 0" {...stroke} />
    </svg>
  );
}

/** Keyed by the `icon` fields in content/solutions-page.ts. */
export const inclusiveIcons = {
  sahiyog: SahiyogIcon,
  foundation: FoundationIcon,
  voice: VoiceIcon,
  image: ImageIcon,
  kiosk: KioskIcon,
  challenge: ChallengeIcon,
  helped: HelpedIcon,
} as const;

export type InclusiveIconName = keyof typeof inclusiveIcons;
