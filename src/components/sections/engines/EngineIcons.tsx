/**
 * ENGINE ICONS
 * ---------------------------------------------------------------------------
 * The nine product icons, drawn on a 44x44 viewBox.
 *
 * Two-tone by design: violet line work with an amber accent. Colours are
 * hard-referenced to the palette tokens rather than currentColor, because
 * each icon is genuinely two-colour and a single inherited colour cannot
 * express that.
 *
 * PLACEHOLDER: these approximate the design's icon set closely enough to read
 * correctly at card size, but they are not the final artwork.
 * TODO(assets): replace with the real icon SVGs when they arrive — the
 * `icon` key in content/engines.ts is the only thing that needs to change.
 *
 * Decorative: the card's product name and description carry the meaning, so
 * these are aria-hidden.
 */

type IconProps = { className?: string };

const base = {
  viewBox: "0 0 44 44",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "aria-hidden": true,
  focusable: false,
} as const;

const V = "var(--brand-600)";
const A = "var(--accent-500)";

const stroke = {
  stroke: V,
  strokeWidth: 1.9,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** A four-point sparkle, reused across several icons as the amber accent. */
function Sparkle({
  x,
  y,
  r = 6,
  width = 1.9,
}: {
  x: number;
  y: number;
  r?: number;
  width?: number;
}) {
  return (
    <path
      d={`M ${x} ${y - r} Q ${x + r * 0.18} ${y - r * 0.18} ${x + r} ${y}
          Q ${x + r * 0.18} ${y + r * 0.18} ${x} ${y + r}
          Q ${x - r * 0.18} ${y + r * 0.18} ${x - r} ${y}
          Q ${x - r * 0.18} ${y - r * 0.18} ${x} ${y - r} Z`}
      stroke={A}
      strokeWidth={width}
      strokeLinejoin="round"
      fill="none"
    />
  );
}

/**
 * LurnyPulse — concentric radar rings with a sweep needle.
 *
 * The inner ring is a full circle rather than a partial arc: an arc drawn at
 * a similar radius to the outer ring collided with it and read as a blob at
 * card size.
 */
export function RadarIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="22" cy="22" r="14.5" {...stroke} />
      <circle cx="22" cy="22" r="8" {...stroke} />
      {/* Sweep needle, from centre to the rim. */}
      <path
        d="M22 22 31.5 12.5"
        stroke={V}
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      <circle cx="32.5" cy="11.5" r="2.4" fill={V} />
      {/* Detected target. */}
      <circle cx="16.5" cy="26.5" r="2.8" fill={A} />
    </svg>
  );
}

/** LurnyMagic — document with generative sparkles. */
export function DocumentIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path
        d="M20 9h9l7 7v17a2 2 0 0 1-2 2H20a2 2 0 0 1-2-2V11a2 2 0 0 1 2-2Z"
        {...stroke}
      />
      <path d="M29 9v7h7" {...stroke} />
      <path d="M23 24h9M23 29h6" {...stroke} />
      <Sparkle x={12} y={17} r={6.5} />
      <Sparkle x={9} y={26} r={3.6} width={1.6} />
    </svg>
  );
}

/** Lurny KxP — connected node graph. */
export function GraphIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="m12 30 8-6 5 3 8-11" {...stroke} />
      <circle cx="20" cy="24" r="3.2" {...stroke} />
      <circle cx="33" cy="16" r="3.6" {...stroke} />
      <circle cx="11" cy="31" r="3" {...stroke} />
      <circle cx="32" cy="30" r="3.4" stroke={A} strokeWidth="1.9" />
    </svg>
  );
}

/** LurnyChat — overlapping conversation bubbles. */
export function ChatIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path
        d="M27 20.5c0 5-4.7 9-10.5 9-1.4 0-2.7-.2-3.9-.6L8 31l1.4-4.2A8.4 8.4 0 0 1 6 20.5c0-5 4.7-9 10.5-9s10.5 4 10.5 9Z"
        {...stroke}
      />
      <path
        d="M23.5 30.5c1.3 3 4.6 5.2 8.5 5.2 1.2 0 2.3-.2 3.3-.5l4.2 1.6-1.2-3.6a7.2 7.2 0 0 0 2.7-5.4c0-3.5-2.9-6.5-6.8-7.1"
        {...stroke}
      />
      <Sparkle x={30} y={28} r={6} />
    </svg>
  );
}

/** LurnyPitch — speech bubble containing an audio waveform. */
export function WaveformIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path
        d="M38 21c0 6.4-6 11.5-13.5 11.5-1.7 0-3.4-.3-4.9-.8L11 35l2.2-5.4A10.9 10.9 0 0 1 11 21C11 14.6 17 9.5 24.5 9.5S38 14.6 38 21Z"
        {...stroke}
      />
      <g stroke={A} strokeWidth="1.9" strokeLinecap="round">
        <path d="M17 19v4M20.5 16.5v9M24 13.5v15M27.5 17v8M31 19.5v3" />
      </g>
    </svg>
  );
}

/** LurnyEvents — calendar with an attendee badge. */
export function CalendarIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="7" y="11" width="27" height="24" rx="3" {...stroke} />
      <path d="M7 18h27M14 7v6M27 7v6" {...stroke} />
      <circle
        cx="32"
        cy="31"
        r="7.5"
        stroke={A}
        strokeWidth="1.9"
        fill="var(--color-surface-base)"
      />
      <circle cx="32" cy="28.8" r="2.2" stroke={A} strokeWidth="1.7" />
      <path
        d="M28.4 35a4.2 4.2 0 0 1 7.2 0"
        stroke={A}
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** LurnySaathi — phone with a friendly face. */
export function MobileIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="11" y="6" width="19" height="32" rx="4" {...stroke} />
      <path d="M18 10h5" {...stroke} />
      <circle cx="17" cy="20" r="1.4" fill={V} />
      <circle cx="24" cy="20" r="1.4" fill={V} />
      <path d="M17 25.5a4.6 4.6 0 0 0 7 0" {...stroke} />
      <Sparkle x={36} y={26} r={5.5} />
    </svg>
  );
}

/** LurnyBiz — branching path ending in flags. */
export function PathIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M13 13c6 0 6 9 12 9s6-9 12-9" {...stroke} />
      <path d="M13 33c6 0 6-11 12-11" {...stroke} />
      <circle cx="11" cy="13" r="3.2" {...stroke} />
      <circle cx="11" cy="33" r="3.2" {...stroke} />
      <path
        d="M33 11v10M33 11h6l-1.6 2.6L39 16h-6"
        stroke={A}
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M27 26v10M27 26h6l-1.6 2.6L33 31h-6"
        stroke={A}
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** LurnySense — bubble containing a trend line. */
export function InsightIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path
        d="M38 20c0 6.3-6 11.4-13.4 11.4-1.7 0-3.4-.3-4.9-.8L11 34l2.2-5.3A10.8 10.8 0 0 1 11 20C11 13.7 17 8.6 24.4 8.6S38 13.7 38 20Z"
        {...stroke}
      />
      <path d="m16 23 5-5 4 3.5 7-7.5" {...stroke} />
      <circle cx="32" cy="14" r="1.9" fill={A} />
      <Sparkle x={34} y={31} r={5.5} />
    </svg>
  );
}

/** Keys match the `icon` field in content/engines.ts. */
export const engineIcons = {
  radar: RadarIcon,
  document: DocumentIcon,
  graph: GraphIcon,
  chat: ChatIcon,
  waveform: WaveformIcon,
  calendar: CalendarIcon,
  mobile: MobileIcon,
  path: PathIcon,
  insight: InsightIcon,
} as const;
