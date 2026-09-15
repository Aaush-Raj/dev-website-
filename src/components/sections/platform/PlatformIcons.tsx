/**
 * PLATFORM ICONS
 * ---------------------------------------------------------------------------
 * The glyphs on the platform hero: three under the actions (Learn, Apply,
 * Improve), and the marks inside the product cards.
 *
 * All are drawn rather than shipped. The design supplies the three action
 * icons as ~80KB PNGs each; as SVG they are a few hundred bytes, stay sharp at
 * any density and take their colour from the caller.
 *
 * Everything inside a card is `aria-hidden` by way of the cluster above it —
 * see PlatformCluster — so none of these announce themselves.
 */

type IconProps = { className?: string };

/* ======================= Under the hero's actions ====================== */

/** An open book — "Learn". */
export function LearnIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 6.4C10.4 5.1 8.3 4.5 5.6 4.6a.9.9 0 0 0-.9.9v11a.9.9 0 0 0 .95.9c2.5-.1 4.5.4 6.35 1.6M12 6.4c1.6-1.3 3.7-1.9 6.4-1.8a.9.9 0 0 1 .9.9v11a.9.9 0 0 1-.95.9c-2.5-.1-4.5.4-6.35 1.6M12 6.4V19"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** A lightning bolt — "Apply". */
export function ApplyIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M13.4 2.8 4.9 13.3a.6.6 0 0 0 .47.98h5.06l-.83 6.92a.6.6 0 0 0 1.07.44l8.5-10.5a.6.6 0 0 0-.47-.98h-5.06l.83-6.92a.6.6 0 0 0-1.07-.44Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Three rising bars — "Improve", and the mark on the two measurement cards.
 * The design uses the same glyph in both places, so it is one component.
 */
export function ChartIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M5.2 14.6v4.6M12 9.4v9.8M18.8 4.8v14.4"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ========================== Inside the cards =========================== */

/** A mortarboard — the learning card's mark. */
export function CapIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 4.2 2.8 8.6 12 13l9.2-4.4L12 4.2Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M6.6 10.8v4.4c0 1.5 2.4 2.8 5.4 2.8s5.4-1.3 5.4-2.8v-4.4M20.6 9v5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** A speech bubble — the Ask card's mark, and its footer chip. */
export function MessageIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M20.2 12.1c0 3.9-3.7 7-8.2 7a9.4 9.4 0 0 1-2.6-.36L4.6 20.2l1.3-3.7a6.6 6.6 0 0 1-2.1-4.4c0-3.9 3.7-7 8.2-7s8.2 3.1 8.2 7Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** A head and shoulders — the question turn in the Ask card. */
export function PersonIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="3.9" />
      <path d="M4.6 20.4c.7-4 3.7-6.4 7.4-6.4s6.7 2.4 7.4 6.4a.8.8 0 0 1-.8.95H5.4a.8.8 0 0 1-.8-.95Z" />
    </svg>
  );
}

/** A four-point sparkle — the assistant's reply. */
export function SparkleIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M11 3.2c.3-.9 1.6-.9 1.9 0l1.25 3.6a1 1 0 0 0 .62.62l3.6 1.25c.9.3.9 1.6 0 1.9l-3.6 1.25a1 1 0 0 0-.62.62l-1.25 3.6c-.3.9-1.6.9-1.9 0l-1.25-3.6a1 1 0 0 0-.62-.62l-3.6-1.25c-.9-.3-.9-1.6 0-1.9l3.6-1.25a1 1 0 0 0 .62-.62L11 3.2Z" />
      <path d="M18.4 16.1c.18-.53.93-.53 1.1 0l.5 1.45a.6.6 0 0 0 .37.37l1.45.5c.53.18.53.93 0 1.1l-1.45.5a.6.6 0 0 0-.37.37l-.5 1.45c-.18.53-.93.53-1.1 0l-.5-1.45a.6.6 0 0 0-.37-.37l-1.45-.5c-.53-.18-.53-.93 0-1.1l1.45-.5a.6.6 0 0 0 .37-.37l.5-1.45Z" />
    </svg>
  );
}

/** A document — the Ask card's source chip. */
export function DocumentIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M13.4 3.2H7.2a1.8 1.8 0 0 0-1.8 1.8v14a1.8 1.8 0 0 0 1.8 1.8h9.6a1.8 1.8 0 0 0 1.8-1.8V8.2l-5.2-5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M13.2 3.4v4.6h4.9M8.6 13h6.8M8.6 16.4h4.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** A filled star — the "Recommended for you" chip. */
export function StarIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2.9l2.6 5.5 5.9.85-4.3 4.3 1.02 6.05L12 16.8l-5.22 2.8L7.8 13.55 3.5 9.25l5.9-.85L12 2.9Z" />
    </svg>
  );
}

/** A tick in a filled disc — a passed feedback row. */
export function CheckDiscIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" fill="currentColor" />
      <path
        d="m7.6 12.3 3 3 5.8-6.4"
        stroke="#fff"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** An exclamation in a filled disc — a row needing attention. */
export function AlertDiscIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" fill="currentColor" />
      <path
        d="M12 7.1v6.1"
        stroke="#fff"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      <circle cx="12" cy="16.6" r="1.25" fill="#fff" />
    </svg>
  );
}

/** A leaf — the profile's growth chip. */
export function LeafIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M19.8 4.4c.12-.7-.5-1.3-1.2-1.2C12.9 4.06 5 5.3 5 12.4c0 1.9.62 3.4 1.5 4.5L4.3 19.1a1 1 0 0 0 1.42 1.42l2.2-2.2c1.1.88 2.6 1.5 4.5 1.5 7.1 0 8.34-7.9 9.38-13.6l-2 .02c-.9 4.9-2.3 10.5-6.6 11.4l4.3-4.3a1 1 0 0 0-1.42-1.42l-4.3 4.3C12.6 11.9 18.2 10.5 23.1 9.6l.02-2c-1.2.2-2.3.4-3.32.6Z" />
    </svg>
  );
}

/** A right arrow — on the "View next step" link and the secondary action. */
export function ArrowRightIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M4.6 12h14.2M13 6.2l5.8 5.8-5.8 5.8"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** A play triangle — inside the learning card's media tile. */
export function PlayIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M8.4 5.3c0-.9.98-1.45 1.74-.98l9 5.7a1.16 1.16 0 0 1 0 1.96l-9 5.7A1.16 1.16 0 0 1 8.4 16.7V5.3Z" />
    </svg>
  );
}

/** The three glyphs under the hero's actions, keyed by the content's name. */
export const metaIcons = {
  learn: LearnIcon,
  apply: ApplyIcon,
  improve: ChartIcon,
} as const;

/** The marks that sit in a card's header disc. */
export const cardIcons = {
  chart: ChartIcon,
  cap: CapIcon,
  message: MessageIcon,
} as const;

/** The small glyphs used on chips and rows inside the cards. */
export const chipIcons = {
  message: MessageIcon,
  document: DocumentIcon,
  person: PersonIcon,
  sparkle: SparkleIcon,
  star: StarIcon,
} as const;

/* ======================= Section 3 — the cycle ========================= */

/** A dartboard with an arrow — "Define expectations", and the left note. */
export function TargetIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="11" cy="13" r="8.4" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="11" cy="13" r="4.6" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="11" cy="13" r="1.2" fill="currentColor" />
      {/* The arrow, entering from the upper right. */}
      <path
        d="M11 13 19.6 4.4M16.6 4.2h3.6v3.6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** A magnifier over a tick — "Identify gaps". */
export function SearchIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle
        cx="10.6"
        cy="10.6"
        r="7.2"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="m15.9 15.9 4.4 4.4"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
      <path
        d="m7.4 10.7 2.3 2.3 4.2-4.7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** A sparkle beside a play disc — "Create targeted learning". */
export function CreateIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M6.4 3.2 7.5 6.3l3.1 1.1-3.1 1.1-1.1 3.1-1.1-3.1L2.2 7.4l3.1-1.1 1.1-3.1Z"
        fill="currentColor"
      />
      <path
        d="M10.6 12.4l.65 1.85 1.85.65-1.85.65-.65 1.85-.65-1.85-1.85-.65 1.85-.65.65-1.85Z"
        fill="currentColor"
      />
      <circle
        cx="17"
        cy="14.6"
        r="5.6"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path d="M15.4 12.2v4.8l4-2.4-4-2.4Z" fill="currentColor" />
    </svg>
  );
}

/** A route with a flag — "Deliver and reinforce". */
export function JourneyIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M4.6 18.4h5.2a3.6 3.6 0 0 0 0-7.2h-1a3.6 3.6 0 0 1 0-7.2h4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="4.6" cy="18.4" r="2" fill="currentColor" />
      <circle
        cx="9"
        cy="11.2"
        r="1.8"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      {/* The flag at the journey's end. */}
      <path
        d="M17.4 4v7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path d="M17.4 4h4.2l-1.4 2 1.4 2h-4.2V4Z" fill="currentColor" />
    </svg>
  );
}

/** Two speech bubbles — "Practise and apply". */
export function PractiseIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M14.8 4.2H5.4a2.2 2.2 0 0 0-2.2 2.2v5.4a2.2 2.2 0 0 0 2.2 2.2h.9v3.1l3.4-3.1h5.1a2.2 2.2 0 0 0 2.2-2.2V6.4a2.2 2.2 0 0 0-2.2-2.2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="7.4" cy="9.1" r="1" fill="currentColor" />
      <circle cx="10.4" cy="9.1" r="1" fill="currentColor" />
      <circle cx="13.4" cy="9.1" r="1" fill="currentColor" />
      <path
        d="M18.4 9.4h.6a1.8 1.8 0 0 1 1.8 1.8v4a1.8 1.8 0 0 1-1.8 1.8h-.5v2.6l-2.9-2.6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Rising bars — "Measure and improve". */
export function MeasureIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M4.6 19.4v-5.2M10.2 19.4V9.4M15.8 19.4v-7.4M21.4 19.4V4.6"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** The two arrows chasing each other at the ring's centre. */
export function CycleGlyph({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M9.6 22.4a14.4 14.4 0 0 1 24-9"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path d="M35.6 5.6l1.4 9.4-9.4-1.4 8-8Z" fill="currentColor" />
      <path
        d="M38.4 25.6a14.4 14.4 0 0 1-24 9"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path d="M12.4 42.4L11 33l9.4 1.4-8 8Z" fill="currentColor" />
    </svg>
  );
}

/** Keyed by the `icon` name on each cycle step. */
export const stepIcons = {
  target: TargetIcon,
  search: SearchIcon,
  create: CreateIcon,
  journey: JourneyIcon,
  practise: PractiseIcon,
  measure: MeasureIcon,
} as const;
