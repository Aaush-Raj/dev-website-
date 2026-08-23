/**
 * MAGIC EXPERIENCE ICONS
 * ---------------------------------------------------------------------------
 * Glyphs for the drawn previews in section 4: the challenge board, the quiz,
 * the quest path and the podcast player.
 *
 * Drawn on a 24x24 grid like MagicFlowIcons, but these are mostly FILLED
 * rather than stroked — at the size the previews use them, a 1.5 stroke on a
 * 12px glyph reads as grey mush, and the design draws solid marks there.
 *
 * Every one inherits `currentColor` so the card that owns it sets the tint.
 */

interface IconProps {
  className?: string;
}

/** A four-pointed sparkle. The item pool's badge. */
export function SparkIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2.5 14 9.4l6.9 2.1-6.9 2.1L12 20.5l-2-6.9L3.1 11.5 10 9.4z" />
    </svg>
  );
}

/** A parcel. The challenge board's header mark. */
export function BoxIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 2.8 20.5 7v10L12 21.2 3.5 17V7z"
        fill="currentColor"
        fillOpacity="0.85"
      />
      <path
        d="M3.5 7 12 11.3 20.5 7M12 11.3v9.9"
        stroke="rgb(255 255 255 / 0.55)"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** A circular arrow. The board's reset control. */
export function ResetIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M19.5 12a7.5 7.5 0 1 1-2.6-5.7" />
      <path d="M19.8 4.6v4.2h-4.2" />
    </svg>
  );
}

/** A five-pointed star. Quest node ratings and the completion chip. */
export function StarIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="m12 3.4 2.7 5.5 6.1.9-4.4 4.3 1 6-5.4-2.8-5.4 2.8 1-6-4.4-4.3 6.1-.9z" />
    </svg>
  );
}

/** A closed padlock. Quest nodes that are not unlocked yet. */
export function LockIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2.6a4.4 4.4 0 0 0-4.4 4.4v2.4h2.6V7a1.8 1.8 0 0 1 3.6 0v2.4h2.6V7A4.4 4.4 0 0 0 12 2.6Z" />
      <rect x="5.4" y="9.4" width="13.2" height="11.4" rx="2.4" />
    </svg>
  );
}

/** A cut gem. The XP chip's mark. */
export function GemIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M7.4 3.2h9.2L21.4 9 12 20.8 2.6 9z" />
    </svg>
  );
}

/** A trophy. The quiz's correct-answer panel. */
export function TrophyIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M7 3.2h10v5.4a5 5 0 0 1-10 0z" />
      <path d="M17 4.4h2.8a3.6 3.6 0 0 1-3.4 4.9V7.6h.6zM7 4.4H4.2a3.6 3.6 0 0 0 3.4 4.9V7.6H7z" />
      <path d="M10.9 13.2h2.2v3.4h-2.2z" />
      <rect x="7.6" y="16.4" width="8.8" height="1.9" rx="0.9" />
      <rect x="6.4" y="18.9" width="11.2" height="2" rx="1" />
    </svg>
  );
}

/** A studio microphone in a broadcast arc. The podcast cover art. */
export function MicIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* The arc behind the mic, open at the bottom. */}
      <path
        d="M3.8 13.6a8.2 8.2 0 0 1 16.4 0"
        stroke="currentColor"
        strokeOpacity="0.5"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <rect
        x="9.2"
        y="5.4"
        width="5.6"
        height="9.4"
        rx="2.8"
        fill="currentColor"
      />
      <path
        d="M6.6 12.6a5.4 5.4 0 0 0 10.8 0M12 18v3.2M8.8 21.2h6.4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** A solid play triangle. The podcast's transport button. */
export function PlayIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M8.4 5.4v13.2L19 12z" />
    </svg>
  );
}

/**
 * A skip control: a circular arrow with the interval written inside it.
 *
 * `direction` flips the arrow, so one component draws both the back-15 and
 * forward-15 buttons the design places either side of play.
 */
export function SkipIcon({
  seconds,
  direction,
  className,
}: IconProps & { seconds: string; direction: "back" | "forward" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        // Mirrored about the centre for the forward variant.
        transform={
          direction === "back" ? undefined : "scale(-1,1) translate(-24,0)"
        }
      >
        <path d="M4.6 12a7.4 7.4 0 1 0 2.6-5.6" />
        <path d="M4.3 3.4v4.2h4.2" />
      </g>
      <text
        x="12"
        y="15.4"
        textAnchor="middle"
        fontSize="8"
        fontWeight="700"
        fill="currentColor"
        stroke="none"
      >
        {seconds}
      </text>
    </svg>
  );
}
