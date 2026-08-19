/**
 * CYCLE ICONS
 * ---------------------------------------------------------------------------
 * The four stage icons in the cycle diagram. Two-tone by design: violet line
 * work carrying an amber highlight, drawn on a 40x40 viewBox.
 *
 * Colours are hard-referenced to the palette tokens rather than currentColor,
 * because each icon is genuinely two-colour — a single inherited colour cannot
 * express it. They only ever appear on the dark ink surface.
 *
 * Decorative: each stage's title and description carry the meaning, so these
 * are aria-hidden.
 */

type IconProps = { className?: string };

const base = {
  viewBox: "0 0 40 40",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "aria-hidden": true,
  focusable: false,
} as const;

const VIOLET = "var(--brand-300)";
const AMBER = "var(--accent-300)";

/** Define — concentric target struck by an arrow. */
export function TargetIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <g stroke={VIOLET} strokeWidth="2.2">
        <circle cx="18" cy="22" r="11" />
        <circle cx="18" cy="22" r="6.5" />
        <circle cx="18" cy="22" r="2" />
      </g>
      {/* Arrow, struck through to the bullseye. */}
      <path
        d="M18 22 32 8"
        stroke={AMBER}
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M26.5 8H32v5.5"
        stroke={AMBER}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Build — an open book with amber page lines. */
export function BookIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path
        d="M20 11.5c-2.6-2-5.6-3-9-3H7v22h4c3.4 0 6.4 1 9 3 2.6-2 5.6-3 9-3h4v-22h-4c-3.4 0-6.4 1-9 3Z"
        stroke={VIOLET}
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path d="M20 11.5v22" stroke={VIOLET} strokeWidth="2.2" />
      <g stroke={AMBER} strokeWidth="2" strokeLinecap="round">
        <path d="M24 17h6M24 21.5h6M24 26h4" />
      </g>
    </svg>
  );
}

/** Enable — a person with an amber approval check. */
export function PersonIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="17" cy="13" r="5.5" stroke={VIOLET} strokeWidth="2.2" />
      <path
        d="M6 33c0-6.1 4.9-11 11-11 2.4 0 4.6.8 6.4 2.1"
        stroke={VIOLET}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="m24 29 3.2 3.2L34 25"
        stroke={AMBER}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Improve — bar chart under a rising amber trend arrow. */
export function GrowthIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <g stroke={VIOLET} strokeWidth="2.2" strokeLinecap="round">
        <path d="M8 33V24M16 33v-6M24 33V19M32 33v-11" />
      </g>
      <path
        d="M8 17.5 16 12l6 4.5L32 7"
        stroke={AMBER}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26.5 7H32v5.5"
        stroke={AMBER}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Keys match the `icon` field in content/system.ts. */
export const cycleIcons = {
  target: TargetIcon,
  book: BookIcon,
  person: PersonIcon,
  growth: GrowthIcon,
} as const;
