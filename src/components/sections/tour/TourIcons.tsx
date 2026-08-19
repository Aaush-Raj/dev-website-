/**
 * TOUR ICONS
 * ---------------------------------------------------------------------------
 * Small glyphs used inside the product-tour poster. All decorative — the
 * surrounding text carries the meaning — so each is aria-hidden.
 */

type IconProps = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
} as const;

/** Learning item — open book. */
export function BookGlyph({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 7.2c-1.5-1.1-3.3-1.7-5.2-1.7H4v13h2.8c1.9 0 3.7.6 5.2 1.7 1.5-1.1 3.3-1.7 5.2-1.7H20v-13h-2.8c-1.9 0-3.7.6-5.2 1.7Z" />
      <path d="M12 7.2v13" />
    </svg>
  );
}

/** Practice item — two people. */
export function PeopleGlyph({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="9" cy="9" r="2.8" />
      <path d="M3.8 19a5.2 5.2 0 0 1 10.4 0" />
      <path d="M16 6.5a2.8 2.8 0 0 1 0 5.2" />
      <path d="M17.5 19a5 5 0 0 0-1.6-3.6" />
    </svg>
  );
}

/** Real-work signal — speech bubble. */
export function BubbleGlyph({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M20 11.4c0 3.8-3.6 6.9-8 6.9-1 0-2-.2-2.9-.5L4 19.5l1.3-3.2A6.5 6.5 0 0 1 4 11.4c0-3.8 3.6-6.9 8-6.9s8 3.1 8 6.9Z" />
    </svg>
  );
}

/** Manager action — star. */
export function StarGlyph({ className }: IconProps) {
  return (
    <svg {...base} className={className} fill="currentColor" stroke="none">
      <path d="m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1 5.9-5.2-2.8-5.2 2.8 1-5.9L3.5 9.7l5.9-.8L12 3.5Z" />
    </svg>
  );
}

/** Suggested step — circled check. */
export function CheckGlyph({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m8.4 12.2 2.5 2.5 4.7-5" />
    </svg>
  );
}

/** Section meta — clock. */
export function ClockGlyph({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.2V12l3.2 1.9" />
    </svg>
  );
}

/** Rising trend arrow, for the readiness delta. */
export function TrendUpGlyph({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 19.5v-15M6.5 10 12 4.5 17.5 10" />
    </svg>
  );
}

/** Play triangle for the video control. */
export function PlayGlyph({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M8.5 5.4a1 1 0 0 1 1.52-.85l8.1 5.6a1 1 0 0 1 0 1.7l-8.1 5.6a1 1 0 0 1-1.52-.85V5.4Z" />
    </svg>
  );
}
