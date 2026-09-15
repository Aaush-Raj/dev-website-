import type { SVGProps } from "react";

/**
 * LURNY.AI HERO ICONS
 * ---------------------------------------------------------------------------
 * The marks used inside the hero's four cards and its foot rail.
 *
 * Drawn inline rather than shipped, like the rest of this build's icon sets:
 * they render at 16-24px, so a raster buys nothing a path does not, and inline
 * stays crisp at any density while inheriting currentColor.
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
/* CREATE CARD                                                                */
/* ========================================================================== */

/** Documents — a page with a folded corner. */
export function DocumentIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z"
        {...stroke}
      />
      <path d="M14 3v5h5" {...stroke} />
      <path d="M8.4 13h7M8.4 16.4h4.6" {...stroke} />
    </svg>
  );
}

/** Videos — a frame with a play head. */
export function VideoIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect x="3.2" y="5" width="17.6" height="14" rx="2.6" {...stroke} />
      {/* Filled head: an outlined triangle closes up at this size. */}
      <path d="M10.4 9.4 15.6 12l-5.2 2.6V9.4Z" fill="currentColor" />
    </svg>
  );
}

/** Your ideas — a pen drawing a spark. */
export function PenIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="m4.6 19.4 2.2-5.4L16.4 4.4a1.9 1.9 0 0 1 2.7 0l.5.5a1.9 1.9 0 0 1 0 2.7L10 17.2l-5.4 2.2Z"
        {...stroke}
      />
      <path d="m14.8 6 3.2 3.2" {...stroke} />
    </svg>
  );
}

/* ========================================================================== */
/* COMMUNITY CARD                                                             */
/* ========================================================================== */

/** Ask your AI persona — a speech bubble with a dot row. */
export function ChatIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M20.6 11.6c0 3.9-3.8 7.1-8.5 7.1a10 10 0 0 1-2.6-.33L4.3 20.4l1.3-3.4a6.8 6.8 0 0 1-2.2-5.4c0-3.9 3.8-7.1 8.5-7.1s8.7 3.2 8.7 7.1Z"
        {...stroke}
      />
      <g fill="currentColor">
        <circle cx="8.6" cy="11.6" r="0.95" />
        <circle cx="12" cy="11.6" r="0.95" />
        <circle cx="15.4" cy="11.6" r="0.95" />
      </g>
    </svg>
  );
}

/** A pair of people — the community and cohort mark. */
export function PeopleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="9.2" cy="8.4" r="3.1" {...stroke} />
      <path d="M3.4 19.2c.6-2.9 2.9-4.8 5.8-4.8s5.2 1.9 5.8 4.8" {...stroke} />
      <path
        d="M16.2 6.1a3 3 0 0 1 0 5.8M17.6 14.8c1.7.7 2.8 2.3 3.1 4.4"
        {...stroke}
      />
    </svg>
  );
}

/* ========================================================================== */
/* EARN CARD                                                                  */
/* ========================================================================== */

/** Paid sessions — a calendar. */
export function CalendarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect x="3.4" y="5.2" width="17.2" height="15.4" rx="2.4" {...stroke} />
      <path d="M3.4 10h17.2M8.6 3.2v4M15.4 3.2v4" {...stroke} />
    </svg>
  );
}

/** Memberships — a crown. */
export function CrownIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M3.4 7.6 7 12l5-6.6 5 6.6 3.6-4.4-1.5 11H4.9L3.4 7.6Z"
        {...stroke}
      />
      <path d="M4.9 20.2h14.2" {...stroke} />
    </svg>
  );
}

/* ========================================================================== */
/* FOOT RAIL                                                                  */
/* ========================================================================== */

/** Create with ease — a lightning bolt, filled as the design draws it. */
export function BoltIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M13.6 2.4 4.8 13.4h5.6l-.9 8.2 9-11.2h-5.7l.8-8Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Grow your reputation — an ascending bar chart. */
export function BarsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect
        x="3.6"
        y="13.6"
        width="3.6"
        height="7"
        rx="1.1"
        fill="currentColor"
      />
      <rect
        x="10.2"
        y="8.6"
        width="3.6"
        height="12"
        rx="1.1"
        fill="currentColor"
      />
      <rect
        x="16.8"
        y="3.6"
        width="3.6"
        height="17"
        rx="1.1"
        fill="currentColor"
      />
    </svg>
  );
}

/* ========================================================================== */
/* SHARED                                                                     */
/* ========================================================================== */

/** The arrow on the primary action and the create button. */
export function ArrowIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" {...props}>
      <path
        d="M2 8h12M9.5 3.5 14 8l-4.5 4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** The play head on the secondary action. */
export function PlayIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="9.4" {...stroke} />
      <path d="M10 8.6 16 12l-6 3.4V8.6Z" fill="currentColor" />
    </svg>
  );
}

/* ========================================================================== */
/* SECTION 2 — KNOWLEDGE STUDIO                                               */
/* ========================================================================== */

/** Start with what you have — a folder with an upload arrow. */
export function UploadIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M3 7.4a2 2 0 0 1 2-2h3.8l2 2.4H19a2 2 0 0 1 2 2v8.8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7.4Z"
        {...stroke}
      />
      <path d="M12 16.8v-6M9.2 13.2 12 10.4l2.8 2.8" {...stroke} />
    </svg>
  );
}

/** Create with AI assistance — a wand with sparkles. */
export function WandIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="m4.4 19.6 9.6-9.6" {...stroke} />
      <path
        d="m12.8 11.2 3.6-3.6a1.6 1.6 0 0 0 0-2.3l-.7-.7a1.6 1.6 0 0 0-2.3 0L9.8 8.2"
        {...stroke}
      />
      {/* Sparkles, filled — they read as points of light, not outlines. */}
      <path
        d="M18.6 12 19.2 14l2 .6-2 .6-.6 2-.6-2-2-.6 2-.6.6-2Z"
        fill="currentColor"
      />
      <path
        d="M5.4 2.8 5.9 4.4l1.6.5-1.6.5-.5 1.6-.5-1.6L3.3 4.9l1.6-.5.5-1.6Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Teach your AI persona — a figure beside a speech bubble. */
export function PersonaIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="7.4" cy="7.6" r="2.9" {...stroke} />
      <path d="M2.4 19.4c.5-3 2.5-4.9 5-4.9s4.5 1.9 5 4.9" {...stroke} />
      <path
        d="M13.4 6.6h6.2a1.8 1.8 0 0 1 1.8 1.8v4.2a1.8 1.8 0 0 1-1.8 1.8h-.9v2.6l-3-2.6h-2.3"
        {...stroke}
      />
      <path d="M15.4 10.4h3.4" {...stroke} />
    </svg>
  );
}

/* ---------------------------- Studio window ---------------------------- */

/** A PDF file badge. */
export function PdfIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M14 2.6H7.4a2.2 2.2 0 0 0-2.2 2.2v14.4a2.2 2.2 0 0 0 2.2 2.2h9.2a2.2 2.2 0 0 0 2.2-2.2V7.6L14 2.6Z"
        fill="currentColor"
      />
      <path d="M14 2.6v5h4.8" fill="none" stroke="white" strokeWidth={1.5} />
    </svg>
  );
}

/** A slide-deck badge. */
export function DeckIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect
        x="3.2"
        y="4.4"
        width="17.6"
        height="12.4"
        rx="2"
        fill="currentColor"
      />
      <path d="M12 16.8v3.4M8.6 20.2h6.8" {...stroke} />
    </svg>
  );
}

/** A lightbulb — the "add your idea" row. */
export function BulbIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M12 2.8a6.4 6.4 0 0 0-3.8 11.5c.6.5 1 1.2 1 2v.3h5.6v-.3c0-.8.4-1.5 1-2A6.4 6.4 0 0 0 12 2.8Z"
        {...stroke}
      />
      <path d="M9.6 19.2h4.8M10.4 21.4h3.2" {...stroke} />
    </svg>
  );
}

/** The plus on the add rows. */
export function PlusIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M12 5.4v13.2M5.4 12h13.2" {...stroke} />
    </svg>
  );
}

/** The overflow dots on a file row. */
export function DotsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <g fill="currentColor">
        <circle cx="12" cy="5.4" r="1.5" />
        <circle cx="12" cy="12" r="1.5" />
        <circle cx="12" cy="18.6" r="1.5" />
      </g>
    </svg>
  );
}

/** The lesson tab's document mark. */
export function LessonIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect x="4.4" y="3.2" width="15.2" height="17.6" rx="2.2" {...stroke} />
      <path d="M8 8h8M8 12h8M8 16h4.8" {...stroke} />
    </svg>
  );
}

/** The quiz tab's bar mark. */
export function QuizIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect
        x="3.6"
        y="13.6"
        width="3.6"
        height="7"
        rx="1.1"
        fill="currentColor"
      />
      <rect
        x="10.2"
        y="8.6"
        width="3.6"
        height="12"
        rx="1.1"
        fill="currentColor"
      />
      <rect
        x="16.8"
        y="3.6"
        width="3.6"
        height="17"
        rx="1.1"
        fill="currentColor"
      />
    </svg>
  );
}

/** The persona card's own figure mark. */
export function PersonSmallIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="12" cy="8" r="3.4" {...stroke} />
      <path d="M5.2 20c.7-3.4 3.4-5.6 6.8-5.6s6.1 2.2 6.8 5.6" {...stroke} />
    </svg>
  );
}

/* ========================================================================== */
/* SECTION 3 — CREATE FOR COMPANIES                                           */
/* ========================================================================== */

/** Meet real business needs — a briefcase. */
export function BriefcaseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect x="2.8" y="7" width="18.4" height="13.4" rx="2.2" {...stroke} />
      <path
        d="M8.6 7V5.2a1.8 1.8 0 0 1 1.8-1.8h3.2a1.8 1.8 0 0 1 1.8 1.8V7"
        {...stroke}
      />
      <path d="M2.8 12.6h18.4M10.4 12.6v2.2h3.2v-2.2" {...stroke} />
    </svg>
  );
}

/** Create in any format — stacked media frames. */
export function FormatsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect x="7.4" y="3.4" width="13.2" height="11" rx="2" {...stroke} />
      <path d="M12.4 6.8 16.6 9l-4.2 2.2V6.8Z" fill="currentColor" />
      <path d="M16.6 17.6H5.4a2 2 0 0 1-2-2V7.4" {...stroke} />
    </svg>
  );
}

/** Earn from your expertise — a wallet. */
export function WalletIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect x="2.8" y="5.6" width="18.4" height="13.4" rx="2.6" {...stroke} />
      <path d="M2.8 10.4h12.6a2 2 0 0 1 0 4H2.8" {...stroke} />
      <circle cx="16.8" cy="12.4" r="0.95" fill="currentColor" />
    </svg>
  );
}

/* -------------------------- Format rail -------------------------- */

/** Podcasts — a microphone. */
export function MicIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect x="9" y="2.6" width="6" height="11.4" rx="3" {...stroke} />
      <path
        d="M5.4 11.6a6.6 6.6 0 0 0 13.2 0M12 18.2v3.2M8.8 21.4h6.4"
        {...stroke}
      />
    </svg>
  );
}

/** Microlessons — a card with rules. */
export function CardIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect x="2.8" y="5" width="18.4" height="14" rx="2.4" {...stroke} />
      <path d="M6.6 9.4h6M6.6 12.6h10.8M6.6 15.8h8" {...stroke} />
    </svg>
  );
}

/** Courses — stacked layers. */
export function StackIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="m12 3 8.6 4.3L12 11.6 3.4 7.3 12 3Z" {...stroke} />
      <path d="m3.4 12 8.6 4.3 8.6-4.3" {...stroke} />
      <path d="m3.4 16.7 8.6 4.3 8.6-4.3" {...stroke} />
    </svg>
  );
}

/** Interactions — a tapping hand. */
export function TapIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M9.4 11.4V5.6a2 2 0 1 1 4 0v8.2l2.6-1.4a2 2 0 0 1 2.7 2.6l-2.6 5a3.4 3.4 0 0 1-3 1.8h-3.4a3.4 3.4 0 0 1-2.8-1.5l-2.4-3.6a2 2 0 0 1 2.9-2.6l2 1.7"
        {...stroke}
      />
    </svg>
  );
}

/** Challenges — a target. */
export function TargetIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="8.6" {...stroke} />
      <circle cx="12" cy="12" r="4.6" {...stroke} />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" />
    </svg>
  );
}

/** Games — a gamepad. */
export function GamepadIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M7.4 7.4h9.2a4.6 4.6 0 0 1 4.5 3.7l.8 4.2a2.6 2.6 0 0 1-4.6 2.1l-1.4-1.8H8.1l-1.4 1.8a2.6 2.6 0 0 1-4.6-2.1l.8-4.2a4.6 4.6 0 0 1 4.5-3.7Z"
        {...stroke}
      />
      <path d="M7.6 11v2.6M6.3 12.3h2.6" {...stroke} />
      <circle cx="16" cy="12" r="0.95" fill="currentColor" />
      <circle cx="18" cy="14" r="0.95" fill="currentColor" />
    </svg>
  );
}

/* ========================================================================== */
/* SECTION 4 — EXPERT CREDENTIALS                                             */
/* ========================================================================== */

/** Set clear requirements — a clipboard with a checklist. */
export function ClipboardIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect x="4.2" y="4.4" width="15.6" height="16.4" rx="2.4" {...stroke} />
      <path
        d="M9 4.4V3.6a1.4 1.4 0 0 1 1.4-1.4h3.2A1.4 1.4 0 0 1 15 3.6v.8"
        {...stroke}
      />
      <path d="M8.4 10h7.2M8.4 13.6h7.2M8.4 17.2h4.4" {...stroke} />
    </svg>
  );
}

/** Assess real understanding — a tick in a circle. */
export function CheckCircleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="9.2" {...stroke} />
      <path d="m7.8 12.4 2.9 2.9 5.5-6" {...stroke} />
    </svg>
  );
}

/**
 * Award under your name — a rosette.
 *
 * Drawn in the design's gold rather than its coral, which is why the caller
 * gives this one its own colour: the award mark carries the credential's
 * metal, not the section's accent.
 */
export function RosetteIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="12" cy="8.8" r="5.8" {...stroke} />
      <circle cx="12" cy="8.8" r="2.6" {...stroke} />
      {/* The two ribbon tails. */}
      <path d="M8.4 13.6 6.6 21.4l5.4-2.8 5.4 2.8-1.8-7.8" {...stroke} />
    </svg>
  );
}

/** The tick inside each requirement row's coral disc. */
export function TickIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="m6.4 12.4 3.6 3.6 7.6-8"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ========================================================================== */
/* SECTION 5 — LEARNER COMMUNITY                                              */
/* ========================================================================== */

/** Host paid sessions — a calendar with a play head. */
export function CalendarPlayIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect x="3" y="5" width="18" height="15.6" rx="2.4" {...stroke} />
      <path d="M3 10h18M8.2 3v4M15.8 3v4" {...stroke} />
      {/* Filled head: an outlined triangle closes up at this size. */}
      <path d="M10.4 13.2 14.6 15.4l-4.2 2.2v-4.4Z" fill="currentColor" />
    </svg>
  );
}

/** Offer memberships / member access — a star. */
export function StarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="m12 2.8 2.9 5.9 6.5.95-4.7 4.6 1.1 6.5L12 17.7l-5.8 3.05 1.1-6.5-4.7-4.6 6.5-.95L12 2.8Z"
        {...stroke}
      />
    </svg>
  );
}

/** Live workshops — a video camera. */
export function CameraIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect x="2.6" y="6.4" width="13" height="11.2" rx="2.4" {...stroke} />
      <path d="m15.6 11 5.8-3.2v8.4L15.6 13" {...stroke} />
    </svg>
  );
}

/** The discussion row's speech bubble. */
export function BubbleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M20.6 11.6c0 3.9-3.8 7.1-8.5 7.1a10 10 0 0 1-2.6-.33L4.3 20.4l1.3-3.4a6.8 6.8 0 0 1-2.2-5.4c0-3.9 3.8-7.1 8.5-7.1s8.7 3.2 8.7 7.1Z"
        {...stroke}
      />
    </svg>
  );
}

/** The overflow dots in the window header. */
export function MoreIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <g fill="currentColor">
        <circle cx="5.4" cy="12" r="1.5" />
        <circle cx="12" cy="12" r="1.5" />
        <circle cx="18.6" cy="12" r="1.5" />
      </g>
    </svg>
  );
}
