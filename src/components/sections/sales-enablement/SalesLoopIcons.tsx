/**
 * SALES LOOP ICONS
 * ---------------------------------------------------------------------------
 * The marks used by the loop section's four engine samples. Separated from the
 * section itself only to keep that file about layout and motion.
 *
 * All are drawn rather than shipped: the pack offers them as ~50px crops with
 * their own light backgrounds baked in, which would neither scale nor take the
 * section's colours.
 */

interface IconProps {
  className?: string;
}

/** LurnyMagic. */
export function MagicIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path
        d="M8 1.4 9.4 5.9 14 7.3 9.4 8.7 8 13.2 6.6 8.7 2 7.3l4.6-1.4L8 1.4Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** LurnyChat. */
export function ChatIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path
        d="M8 2.6c3.1 0 5.7 1.9 5.7 4.3S11.1 11.2 8 11.2c-.6 0-1.2-.1-1.8-.2l-2.9 1.4.8-2.4C3 9.3 2.3 8.2 2.3 6.9 2.3 4.5 4.9 2.6 8 2.6Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** LurnyPitch — the waveform mark. */
export function PitchIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path
        d="M2.5 6.6v2.8M5.5 4.2v7.6M8.5 2.2v11.6M11.5 5v6M14 7v2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** LurnyBiz — the bar mark. */
export function BizIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path
        d="M3 13.5V9M8 13.5V3M13 13.5V6.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** The book on the Magic sample's first row. */
export function BookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path
        d="M2.4 3.2h4.1c.8 0 1.5.7 1.5 1.5v8c0-.7-.7-1.3-1.5-1.3H2.4V3.2ZM13.6 3.2H9.5c-.8 0-1.5.7-1.5 1.5v8c0-.7.7-1.3 1.5-1.3h4.1V3.2Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** The chart on the Magic sample's third row. */
export function ChartIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path
        d="M3 13V9.5M8 13V4M13 13V7"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** The seller's avatar on the Chat sample. */
export function PersonIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <circle cx="8" cy="5.6" r="2.5" fill="currentColor" />
      <path d="M3 13.6c0-2.6 2.2-4.2 5-4.2s5 1.6 5 4.2" fill="currentColor" />
    </svg>
  );
}

/** The play control on the Pitch sample. */
export function PlayIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path d="M5.6 3.5 12 8l-6.4 4.5V3.5Z" fill="currentColor" />
    </svg>
  );
}

/** The insight lamp on the Pitch sample. */
export function LampIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path
        d="M8 1.8a4.2 4.2 0 0 0-2.4 7.6c.4.3.6.7.6 1.2h3.6c0-.5.2-.9.6-1.2A4.2 4.2 0 0 0 8 1.8Z"
        fill="currentColor"
      />
      <path
        d="M6.4 12.4h3.2M7 14h2"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** The account mark on the Biz sample. */
export function BuildingIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <rect
        x="2.6"
        y="2.4"
        width="10.8"
        height="11.2"
        rx="1.4"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path
        d="M5.4 5.4h1.6M9 5.4h1.6M5.4 8h1.6M9 8h1.6M5.4 10.6h5.2"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** The clock on the Biz sample's rows. */
export function ClockIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <circle cx="8" cy="8" r="5.8" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M8 4.8V8l2.2 1.4"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** The calendar on the Biz sample's deal-stage row. */
export function CalendarIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <rect
        x="2.4"
        y="3.4"
        width="11.2"
        height="10.2"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path
        d="M2.4 6.6h11.2M5.6 2.2v2.4M10.4 2.2v2.4"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** The tick on the Biz sample's recommendation. */
export function CheckIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <circle cx="8" cy="8" r="7" fill="currentColor" />
      <path
        d="m4.8 8.2 2.2 2.2 4.2-4.6"
        stroke="#fff"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** The disclosure arrow on the samples' action rows. */
export function ChevronIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path
        d="m6 3.5 5 4.5-5 4.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** The recycle mark on the closing footnote. */
export function LoopIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <path
        d="M3.4 8.4a6.7 6.7 0 0 1 11.2-2.8l1.8 1.8M16.6 11.6a6.7 6.7 0 0 1-11.2 2.8l-1.8-1.8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.6 3.4v4.2h-4.2M3.4 16.6v-4.2h4.2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
