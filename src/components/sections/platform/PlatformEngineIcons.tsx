/**
 * PLATFORM ENGINE ICONS
 * ---------------------------------------------------------------------------
 * The twelve marks on the engine cards in section 4.
 *
 * DRAWN, NOT SHIPPED. The design bakes each into a ~190KB card PNG — ~2.3MB
 * for the set. As SVG the twelve together are a few KB, stay sharp at any
 * density, and let the disc behind them answer a pointer.
 *
 * THE TWO COLOURS ARE STRUCTURAL, not decoration. Every glyph is the engine's
 * subject in violet with one amber accent marking what it adds: the play badge
 * on Flix and Sim, the sparkle on Chat and Saathi, the loose node on KxP and
 * Notes. They are named rather than inherited so that pairing cannot drift.
 *
 * All are `aria-hidden`: each sits beside its own engine name, so an announced
 * icon would only repeat the words next to it.
 */

type IconProps = { className?: string };

/** The engine's own subject. */
const SUBJECT = "#6d28d9";
/** What it adds — the amber accent the design gives every glyph. */
const ACCENT = "#f0a418";

const stroke = {
  fill: "none",
  strokeWidth: 1.9,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/* ------------------------- Build capability -------------------------- */

/** A dartboard with an arrow — LurnyPulse. */
function PulseIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <g {...stroke} stroke={SUBJECT}>
        <circle cx="18.5" cy="21.5" r="12.5" />
        <circle cx="18.5" cy="21.5" r="7" />
      </g>
      <circle cx="18.5" cy="21.5" r="2.4" fill={SUBJECT} />
      <path d="M18.5 21.5 31 9" {...stroke} stroke={ACCENT} strokeWidth="2.2" />
      <path d="M26.4 7.6h6v6" {...stroke} stroke={ACCENT} strokeWidth="2.2" />
    </svg>
  );
}

/** A document with a sparkle — LurnyMagic. */
function MagicIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <g {...stroke} stroke={SUBJECT}>
        <path d="M14 9.5h10l6 6v15a2.5 2.5 0 0 1-2.5 2.5H14a2.5 2.5 0 0 1-2.5-2.5v-18A2.5 2.5 0 0 1 14 9.5Z" />
        <path d="M23.6 9.8v6.2h6" />
        <path d="M16.5 22h11M16.5 27h7" />
      </g>
      <path
        d="M10.5 5.2 11.9 9l3.8 1.4-3.8 1.4-1.4 3.8-1.4-3.8L5.3 10.4 9.1 9l1.4-3.8Z"
        fill={ACCENT}
      />
    </svg>
  );
}

/** A video frame with a play badge — LurnyFlix. */
function FlixIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <g {...stroke} stroke={SUBJECT}>
        <rect x="6" y="11" width="22" height="16" rx="3.5" />
        <path d="M11 11v16" />
      </g>
      <circle
        cx="28"
        cy="26"
        r="7"
        fill="none"
        stroke={ACCENT}
        strokeWidth="2.2"
      />
      <path d="M26 22.8v6.4l5.2-3.2-5.2-3.2Z" fill={ACCENT} />
    </svg>
  );
}

/** A branching path with a loose node — Lurny KxP. */
function KxpIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <g {...stroke} stroke={SUBJECT}>
        <path d="M11 26.5 18 21l7.5-6" />
        <path d="M18 21h-.1" />
        <circle cx="9" cy="28" r="3.4" />
        <circle cx="18.6" cy="20.6" r="3" />
        <circle cx="28.4" cy="13.4" r="3.4" />
      </g>
      <circle
        cx="27"
        cy="27.4"
        r="3.4"
        fill="none"
        stroke={ACCENT}
        strokeWidth="2.2"
      />
    </svg>
  );
}

/* ------------------------ Enable performance ------------------------- */

/** Two bubbles with a play badge — LurnySim. */
function SimIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <g {...stroke} stroke={SUBJECT}>
        <path d="M8 13.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v4.5a3 3 0 0 1-3 3h-5.4L10 25v-4h-2a0 0 0 0 1 0 0Z" />
        <path d="M22.5 13.8a8.5 8.5 0 0 1 3.6 4" />
      </g>
      <circle
        cx="26.5"
        cy="25"
        r="7"
        fill="none"
        stroke={ACCENT}
        strokeWidth="2.2"
      />
      <path d="M24.5 21.8v6.4l5.2-3.2-5.2-3.2Z" fill={ACCENT} />
    </svg>
  );
}

/** A bubble with a waveform — LurnyPitch. */
function PitchIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <path
        d="M33 18.5c0 6.2-5.8 11.2-13 11.2a15 15 0 0 1-3.4-.4L9 33l2.1-5.4A10.4 10.4 0 0 1 7 18.5C7 12.3 12.8 7.3 20 7.3s13 5 13 11.2Z"
        {...stroke}
        stroke={SUBJECT}
      />
      <path
        d="M14 18.4v2.6M17.2 15.6v8.2M20.4 13.4v12.6M23.6 16.4v6.6M26.8 18.8v1.8"
        {...stroke}
        stroke={ACCENT}
        strokeWidth="2.2"
      />
    </svg>
  );
}

/** A bubble with a sparkle — LurnyChat. */
function ChatIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <path
        d="M31 17.6c0 5.8-5.4 10.5-12 10.5a14 14 0 0 1-3.2-.36L9 31l2-5.1A9.7 9.7 0 0 1 7 17.6C7 11.8 12.4 7.1 19 7.1s12 4.7 12 10.5Z"
        {...stroke}
        stroke={SUBJECT}
      />
      <path
        d="M29.4 21.4 31 26l4.6 1.6L31 29.2l-1.6 4.6-1.6-4.6-4.6-1.6 4.6-1.6 1.6-4.6Z"
        fill={ACCENT}
      />
    </svg>
  );
}

/** A calendar with a person badge — LurnyEvents. */
function EventsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <g {...stroke} stroke={SUBJECT}>
        <rect x="6.5" y="10" width="21" height="20" rx="3" />
        <path d="M6.5 16.4h21M12 7v5.4M22 7v5.4" />
      </g>
      <circle
        cx="28"
        cy="26"
        r="7"
        fill="none"
        stroke={ACCENT}
        strokeWidth="2.2"
      />
      <circle cx="28" cy="23.8" r="2" fill={ACCENT} />
      <path
        d="M24.6 30.2c.5-2 1.8-3 3.4-3s2.9 1 3.4 3"
        fill="none"
        stroke={ACCENT}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ------------------------- Work in the flow -------------------------- */

/** A phone with a smile and a sparkle — LurnySaathi. */
function SaathiIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <g {...stroke} stroke={SUBJECT}>
        <rect x="9" y="6" width="17" height="28" rx="3.6" />
        <path d="M15 9.4h5" />
      </g>
      <circle cx="14.6" cy="18" r="1.5" fill={ACCENT} />
      <circle cx="20.4" cy="18" r="1.5" fill={ACCENT} />
      <path
        d="M14.2 22.6c1.1 1.6 2.6 2.4 4.3 2.4s3.2-.8 4.3-2.4"
        fill="none"
        stroke={ACCENT}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M31.4 14.6 32.6 18l3.4 1.2-3.4 1.2-1.2 3.4-1.2-3.4L26.8 19.2l3.4-1.2 1.2-3.4Z"
        fill={ACCENT}
      />
    </svg>
  );
}

/** A route with two flags — LurnyBiz. */
function BizIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <g {...stroke} stroke={SUBJECT}>
        <path d="M10 28.6h5.4a5 5 0 0 0 5-5V13" />
        <circle cx="9" cy="14.6" r="3.2" />
        <circle cx="9" cy="28.8" r="3.2" />
        <path d="M20.6 12.4v-4h6.2l-1.6 2 1.6 2h-6.2Z" fill={SUBJECT} />
      </g>
      <path
        d="M26 30V19.6h6.2l-1.6 2 1.6 2H26"
        {...stroke}
        stroke={ACCENT}
        strokeWidth="2.2"
      />
    </svg>
  );
}

/** A bubble with a trend line and a sparkle — LurnySense. */
function SenseIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <path
        d="M31 17.6c0 5.8-5.4 10.5-12 10.5a14 14 0 0 1-3.2-.36L9 31l2-5.1A9.7 9.7 0 0 1 7 17.6C7 11.8 12.4 7.1 19 7.1s12 4.7 12 10.5Z"
        {...stroke}
        stroke={SUBJECT}
      />
      <path
        d="m12.6 20.4 3.4-4.4 3 3.2 4.4-5.8"
        {...stroke}
        stroke={SUBJECT}
        strokeWidth="2.1"
      />
      <path
        d="M29.6 22.4 31 26.2l3.8 1.4-3.8 1.4-1.4 3.8-1.4-3.8L24.4 27.6l3.8-1.4 1.4-3.8Z"
        fill={ACCENT}
      />
    </svg>
  );
}

/** A rising node chain with one loose node — LurnyNotes. */
function NotesIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <g {...stroke} stroke={SUBJECT}>
        <path d="M11 24.6 17 21l9-7.4" />
        <circle cx="8.6" cy="26.4" r="3.4" />
        <circle cx="17.4" cy="20.6" r="3" />
        <circle cx="27.6" cy="12.6" r="3.4" />
      </g>
      <circle
        cx="25.6"
        cy="27"
        r="3.4"
        fill="none"
        stroke={ACCENT}
        strokeWidth="2.2"
      />
    </svg>
  );
}

/** A grid — the Fabric band's mark. */
export function FabricIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M4.4 4.4h15.2v15.2H4.4V4.4Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 4.4v15.2M14.5 4.4v15.2M4.4 9.5h15.2M4.4 14.5h15.2"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

/** Keyed by the `icon` name on each engine card. */
export const engineIcons = {
  pulse: PulseIcon,
  magic: MagicIcon,
  flix: FlixIcon,
  kxp: KxpIcon,
  sim: SimIcon,
  pitch: PitchIcon,
  chat: ChatIcon,
  events: EventsIcon,
  saathi: SaathiIcon,
  biz: BizIcon,
  sense: SenseIcon,
  notes: NotesIcon,
} as const;

/* ===================== Section 5 — the challenges ===================== */

/** Two people with a star — "Improve frontline performance". */
function PeopleIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <g {...stroke} stroke={SUBJECT} strokeWidth="2.4">
        <circle cx="16.4" cy="14.6" r="5.4" />
        <circle cx="26.6" cy="15.6" r="3.9" />
        <path d="M8.6 28.6c1.4-4.8 4.4-7.4 7.8-7.4s6.4 2.6 7.8 7.4" />
        <path d="M24.8 20.4c1.6-.6 3.4-.5 5 .6" />
      </g>
      <path
        d="m29.4 22.6 2 4 4.4.6-3.2 3.1.8 4.4-4-2.1-3.9 2.1.7-4.4-3.2-3.1 4.4-.6 2-4Z"
        fill={ACCENT}
      />
    </svg>
  );
}

/** A mortarboard with a badge — "Help new hires become productive". */
function CapBadgeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <g {...stroke} stroke={SUBJECT} strokeWidth="2.4">
        <path d="M20 8 6.6 14.4 20 20.8l13.4-6.4L20 8Z" />
        <path d="M11.6 17.4v6.4c0 2.3 3.8 4.2 8.4 4.2s8.4-1.9 8.4-4.2v-6.4" />
      </g>
      <path d="M31.6 15.6v7.2" {...stroke} stroke={ACCENT} strokeWidth="2.4" />
      <circle cx="31.6" cy="26.4" r="3.2" fill={ACCENT} />
    </svg>
  );
}

/** A document under a magnifier — "Make knowledge easier to find". */
function FindIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <g {...stroke} stroke={SUBJECT} strokeWidth="2.4">
        <path d="M23.4 7.4H12a2.6 2.6 0 0 0-2.6 2.6v20a2.6 2.6 0 0 0 2.6 2.6h9" />
        <path d="M23.4 7.4 29.6 13v6" />
        <path d="M14.6 16.6h8M14.6 21.4h8M14.6 26.2h4.4" />
      </g>
      <circle
        cx="27.6"
        cy="26"
        r="6.2"
        fill="none"
        stroke={ACCENT}
        strokeWidth="2.6"
      />
      <path
        d="m32.4 30.6 3.4 3.4"
        {...stroke}
        stroke={ACCENT}
        strokeWidth="2.8"
      />
    </svg>
  );
}

/** A bubble with a sparkle — the panel's own mark and the assistant's avatar. */
export function AssistantIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M20.4 11.2c0 3.9-3.7 7-8.2 7a9.6 9.6 0 0 1-2.4-.3L5 19.6l1.3-3.5a6.5 6.5 0 0 1-2.3-4.9c0-3.9 3.7-7 8.2-7s8.2 3.1 8.2 7Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="m14.6 7.6.85 2.3 2.3.85-2.3.85-.85 2.3-.85-2.3-2.3-.85 2.3-.85.85-2.3Z"
        fill="#f0a418"
      />
    </svg>
  );
}

/** A circular arrow — "Start again". */
export function ResetIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M20 12a8 8 0 1 1-2.4-5.7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M20.4 4.4v4.4H16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** A paper plane — the composer's send button. */
export function SendIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M3.6 11.1 19.8 4.3c.9-.4 1.8.5 1.4 1.4l-6.8 16.2c-.4.9-1.7.9-2-.1l-1.9-5.6a1 1 0 0 0-.63-.63l-5.6-1.9c-1-.33-1-1.6-.07-2Z" />
    </svg>
  );
}

/** Keyed by the `icon` name on each challenge row. */
export const challengeIcons = {
  people: PeopleIcon,
  cap: CapBadgeIcon,
  find: FindIcon,
} as const;
