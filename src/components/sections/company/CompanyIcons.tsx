/**
 * COMPANY ICONS
 * ---------------------------------------------------------------------------
 * The two glyphs on the hero's speech-bubble cards, drawn to match the
 * supplied overlay: light strokes at a consistent weight, sized by the caller.
 *
 * Both are `aria-hidden` — each sits beside its own card text, so an announced
 * icon would only repeat the words next to it. They take `currentColor`, so
 * the card sets the violet once rather than each path carrying it.
 */

type IconProps = { className?: string };

/** Two overlapping speech bubbles — the "why does this work?" card. */
export function ConversationIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* The back bubble, peeking out to the upper left. */}
      <path
        d="M7.6 13.4H6.2A2.7 2.7 0 0 1 3.5 10.7V6.4a2.7 2.7 0 0 1 2.7-2.7h7.3a2.7 2.7 0 0 1 2.7 2.7v.6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* The front bubble, with its tail. */}
      <path
        d="M10.4 8.1h7.4a2.7 2.7 0 0 1 2.7 2.7v4.4a2.7 2.7 0 0 1-2.7 2.7h-4.3l-3.4 2.6v-2.6h-.4a2.7 2.7 0 0 1-2.7-2.7v-4.4a2.7 2.7 0 0 1 2.7-2.7Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Three dots — the conversation in progress. */}
      <circle cx="11.9" cy="13" r="0.95" fill="currentColor" />
      <circle cx="14.9" cy="13" r="0.95" fill="currentColor" />
      <circle cx="17.9" cy="13" r="0.95" fill="currentColor" />
    </svg>
  );
}

/** A lightbulb with rays — the "let's explore it together" card. */
export function IdeaIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* The glass, sitting on its base. */}
      <path
        d="M12 5.2a4.7 4.7 0 0 1 2.8 8.5c-.5.4-.8 1-.8 1.6v.5h-4v-.5c0-.6-.3-1.2-.8-1.6A4.7 4.7 0 0 1 12 5.2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M10.3 18.1h3.4M10.9 20h2.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* The rays. */}
      <path
        d="M12 1.9v1.4M4.9 4.9l1 1M19.1 4.9l-1 1M2.6 11.6H4M20 11.6h1.4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** The arrow on the "Discover our story" link. */
export function ArrowDownIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M8 2.8v10.4M3.6 9.2 8 13.6l4.4-4.4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Keyed by the `icon` name in the content file. */
export const cardIcons = {
  conversation: ConversationIcon,
  idea: IdeaIcon,
} as const;
