/**
 * SAATHI ICONS
 * ---------------------------------------------------------------------------
 * The line glyphs used by the LurnySaathi hero illustration: five for the
 * capability pills, three for the phone cards, plus the heart beside the
 * footnote and the small chrome marks on the phone.
 *
 * All are stroked with `currentColor` at a consistent weight so the caller
 * sets colour and size, matching the design's per-pill tints (rose for Learn
 * and Communicate, violet for Work, teal for Practise and Improve).
 */

type IconProps = { className?: string };

/* ========================= Capability pills ============================= */

/** A mortarboard — "Learn". */
function LearnIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 4 2.8 8.4 12 12.8l9.2-4.4L12 4Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M6.4 10.6v4.9c0 1.5 2.5 2.7 5.6 2.7s5.6-1.2 5.6-2.7v-4.9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.2 8.4v5.1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** A briefcase — "Work". */
function WorkIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="2.9"
        y="7.4"
        width="18.2"
        height="12"
        rx="2.4"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M8.6 7.4V6.1a1.8 1.8 0 0 1 1.8-1.8h3.2a1.8 1.8 0 0 1 1.8 1.8v1.3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M2.9 12.4h18.2M10.6 12.4v1.7h2.8v-1.7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** A speech bubble with an ellipsis — "Practise". */
function PractiseIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M4.2 5h15.6a1.4 1.4 0 0 1 1.4 1.4v8.4a1.4 1.4 0 0 1-1.4 1.4H9.6L5.2 19.8v-3.6H4.2a1.4 1.4 0 0 1-1.4-1.4V6.4A1.4 1.4 0 0 1 4.2 5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M8.4 10.6h.02M12 10.6h.02M15.6 10.6h.02"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** A megaphone — "Communicate". */
function CommunicateIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M16.6 4.8v14.4L7.4 15.6H4.9A1.9 1.9 0 0 1 3 13.7v-3.4a1.9 1.9 0 0 1 1.9-1.9h2.5l9.2-3.6Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M19.8 9.2a3.6 3.6 0 0 1 0 5.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M7.4 15.6v2.1a2 2 0 0 0 2 2h.4a1 1 0 0 0 1-1.2l-.5-2.4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** A rising trend over bars — "Improve". */
function ImproveIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M3.4 12.4c3.4 0 5.1-2 7.2-4.1s3.9-3.5 6.4-3.5h3.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.2 4.8h3.4v3.4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="5"
        cy="17.4"
        r="2.2"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <rect
        x="10.4"
        y="13.6"
        width="3.6"
        height="6"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <rect
        x="16.8"
        y="10.8"
        width="3.6"
        height="8.8"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

/** Keyed by the `icon` field on each entry in content/saathi.ts. */
export const capabilityIcons = {
  learn: LearnIcon,
  work: WorkIcon,
  practise: PractiseIcon,
  communicate: CommunicateIcon,
  improve: ImproveIcon,
} as const;

export type CapabilityIconName = keyof typeof capabilityIcons;

/* =========================== Phone cards ================================ */

/** A calendar — the "priorities today" card. */
function CalendarIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="3.4"
        y="5.4"
        width="17.2"
        height="15.2"
        rx="2.6"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M3.4 10h17.2M8.2 3.4v3.8M15.8 3.4v3.8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M7.6 13.6h.02M12 13.6h.02M16.4 13.6h.02M7.6 17h.02M12 17h.02"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** An open book — the "continue learning" card. */
function BookIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 6.6C10.4 5.2 8.3 4.5 5.6 4.5A1.6 1.6 0 0 0 4 6.1v10.5a1.6 1.6 0 0 0 1.6 1.6c2.7 0 4.8.7 6.4 2.1 1.6-1.4 3.7-2.1 6.4-2.1a1.6 1.6 0 0 0 1.6-1.6V6.1a1.6 1.6 0 0 0-1.6-1.6c-2.7 0-4.8.7-6.4 2.1Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M12 6.6v13.7"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Two figures — the "practise a conversation" card. */
function PeopleIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle
        cx="9.2"
        cy="7.8"
        r="3.4"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M3.2 19.6a6 6 0 0 1 12 0"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M16.2 5a3.4 3.4 0 0 1 0 6.6M17.6 14.5a6 6 0 0 1 3.4 5.1"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Keyed by the `icon` field on each phone card in content/saathi.ts. */
export const cardIcons = {
  calendar: CalendarIcon,
  book: BookIcon,
  people: PeopleIcon,
} as const;

export type CardIconName = keyof typeof cardIcons;

/* ============================== Chrome ================================== */

/** The outlined heart beside the hero footnote. */
export function HeartIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 20.4S3.2 15.3 3.2 9.5A4.7 4.7 0 0 1 12 7a4.7 4.7 0 0 1 8.8 2.5c0 5.8-8.8 10.9-8.8 10.9Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** The arrow on the "See Saathi in action" link. */
export function ArrowIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M3 8h9m0 0-3.4-3.4M12 8l-3.4 3.4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** A chevron — the affordance on each phone card. */
export function ChevronIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="m6 3.5 5 4.5-5 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** A microphone — the trailing control in the phone's composer. */
export function MicIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="9"
        y="2.6"
        width="6"
        height="11.4"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M5.4 11.2a6.6 6.6 0 0 0 13.2 0M12 17.8v3.6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * The Lurny mark in the phone's top bar — an eight-point burst, with the two
 * lower-left rays in the brand's coral and violet as the design shows.
 */
export function LurnyMark({ className }: IconProps) {
  const rays = [
    { angle: 0, color: "#f2547d" },
    { angle: 45, color: "#f2547d" },
    { angle: 90, color: "#e8536f" },
    { angle: 135, color: "#8b5cf6" },
    { angle: 180, color: "#f2547d" },
    { angle: 225, color: "#a855f7" },
    { angle: 270, color: "#f2547d" },
    { angle: 315, color: "#f2547d" },
  ];

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {rays.map(({ angle, color }) => (
        <path
          key={angle}
          d="M12 12 11.1 3.6a.9.9 0 0 1 1.8 0L12 12Z"
          fill={color}
          transform={`rotate(${angle} 12 12)`}
        />
      ))}
    </svg>
  );
}

/** The status-bar signal, wifi and battery cluster on the phone. */
export function StatusIcons({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 44 12"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Signal bars */}
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x={i * 3.4}
          y={7.4 - i * 2}
          width="2.2"
          height={4.4 + i * 2}
          rx="0.7"
          fill="currentColor"
        />
      ))}
      {/* Wifi */}
      <path
        d="M16.6 5.1a6.4 6.4 0 0 1 7.6 0M18.2 7.5a3.8 3.8 0 0 1 4.4 0"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="20.4" cy="10.2" r="1.1" fill="currentColor" />
      {/* Battery */}
      <rect
        x="28.4"
        y="2.6"
        width="13.4"
        height="7.4"
        rx="2.1"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <rect
        x="30"
        y="4.2"
        width="10.2"
        height="4.2"
        rx="1.2"
        fill="currentColor"
      />
      <path
        d="M43 5.2v2.2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ============================ Loop stages =============================== */
/*
 * The five glyphs in the capability-loop section. Drawn on a 24 grid like the
 * rest of this file, but stroked lighter: the design sets them inside a thin
 * outlined disc where a heavier weight would read as filled.
 */

/** A person — "Know where you stand". */
function PersonIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="8.2"
        r="3.6"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M5.2 19.4a6.8 6.8 0 0 1 13.6 0"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** An open book — "Learn what matters". */
function OpenBookIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 6.8C10.5 5.4 8.6 4.7 6.2 4.7a1.5 1.5 0 0 0-1.5 1.5v10a1.5 1.5 0 0 0 1.5 1.5c2.4 0 4.3.7 5.8 2.1 1.5-1.4 3.4-2.1 5.8-2.1a1.5 1.5 0 0 0 1.5-1.5v-10a1.5 1.5 0 0 0-1.5-1.5c-2.4 0-4.3.7-5.8 2.1Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M12 6.8v13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** A speech bubble — "Practise before it matters". */
function SpeechIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M5 5.4h14a1.4 1.4 0 0 1 1.4 1.4v7.8A1.4 1.4 0 0 1 19 16H10l-4.2 3.4V16H5a1.4 1.4 0 0 1-1.4-1.4V6.8A1.4 1.4 0 0 1 5 5.4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M8.6 10.7h.02M12 10.7h.02M15.4 10.7h.02"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** A microphone — "Perform in the real world". */
function MicrophoneIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="9.4"
        y="3"
        width="5.2"
        height="10.4"
        rx="2.6"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M6.2 11.4a5.8 5.8 0 0 0 11.6 0M12 17.2v3.4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** A rising bar chart — "Improve continuously". */
function ChartIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M4.6 19.4V15M9.6 19.4v-7M14.6 19.4v-4.6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M4.6 11.6 10 7l3.4 2.8L19.4 4.6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.6 4.6h3.8v3.8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.4 19.4V12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Keyed by the `icon` field on each stage in content/saathi.ts. */
export const loopIcons = {
  person: PersonIcon,
  book: OpenBookIcon,
  chat: SpeechIcon,
  mic: MicrophoneIcon,
  chart: ChartIcon,
} as const;

export type LoopIconName = keyof typeof loopIcons;

/** The hamburger in the loop phone's top bar. */
export function MenuIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** A clock — the duration on the next-best-action card. */
export function ClockIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="8.4" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 7.2V12l3.2 2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ========================== Journey panel =============================== */

/** A broadcast signal — the Pulse step in the improvement journey. */
function SignalIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="2.1" fill="currentColor" />
      <path
        d="M8.4 8.4a5.1 5.1 0 0 0 0 7.2M15.6 15.6a5.1 5.1 0 0 0 0-7.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M5.6 5.6a9 9 0 0 0 0 12.8M18.4 18.4a9 9 0 0 0 0-12.8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Keyed by the `icon` field on each journey step in content/saathi.ts. */
export const journeyIcons = {
  signal: SignalIcon,
  book: OpenBookIcon,
  chat: SpeechIcon,
  mic: MicrophoneIcon,
  chart: ChartIcon,
} as const;

export type JourneyIconName = keyof typeof journeyIcons;

/** A rising arrow — the progress figure in the journey panel's footer. */
export function TrendIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M4 16.4 9.4 10.6l3.6 3.2 6.4-7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.4 6.4h4.4v4.4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ========================== Context panel =============================== */

/** A target with an arrow — the "current priority" signal. */
function TargetIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M20.4 8.4a9 9 0 1 1-4.8-4.8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M16.6 11a4.7 4.7 0 1 1-3.6-3.6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="m12 12 6.4-6.4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M15.6 4.4h4v4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Keyed by the `icon` field on each context signal in content/saathi.ts.
 * Reuses the journey glyphs where the signal is the same one.
 */
export const contextIcons = {
  person: PersonIcon,
  signal: SignalIcon,
  book: OpenBookIcon,
  chat: SpeechIcon,
  mic: MicrophoneIcon,
  target: TargetIcon,
} as const;

export type ContextIconName = keyof typeof contextIcons;
