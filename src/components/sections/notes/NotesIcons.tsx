/**
 * NOTES ICONS
 * ---------------------------------------------------------------------------
 * The glyphs used across the LurnyNotes page: three for the hero's feature
 * row, plus the small marks inside the product panel.
 *
 * All are stroked with `currentColor` so the caller sets colour and size,
 * matching the design's per-feature tints (violet, amber, green).
 */

type IconProps = { className?: string };

/* ========================== Hero features ============================== */

/** A speech bubble — "Capture what matters". */
function CaptureIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M4.6 5h14.8a1.4 1.4 0 0 1 1.4 1.4v8a1.4 1.4 0 0 1-1.4 1.4H10l-4.6 3.6v-3.6h-.8A1.4 1.4 0 0 1 3.2 14.4v-8A1.4 1.4 0 0 1 4.6 5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M7.6 9.2h8.8M7.6 12.2h5.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** A calendar with a tick — "Turn decisions into action". */
function ActionIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="3.4"
        y="5.2"
        width="17.2"
        height="15.4"
        rx="2.4"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M3.4 10h17.2M8.2 3.4v3.6M15.8 3.4v3.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="m8.8 14.6 2.2 2.2 4-4.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** A paper plane — "Follow up with confidence". */
function SendIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M20.8 3.2 2.9 10.4c-.8.3-.8 1.5.03 1.75l6.5 2 2 6.5c.25.83 1.45.83 1.75.03L20.8 3.2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M20.8 3.2 9.43 14.15"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Keyed by the `icon` field on each hero feature in content/notes.ts. */
export const featureIcons = {
  capture: CaptureIcon,
  action: ActionIcon,
  send: SendIcon,
} as const;

export type FeatureIconName = keyof typeof featureIcons;

/* =========================== Panel marks =============================== */

/** A magnifier in a disc — the conversation-summary row. */
export function SummaryIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="6.4" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="m15.8 15.8 3.4 3.4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** A ticked circle — the key-decisions row. */
export function DecisionsIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="8.6" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="m8.4 12.2 2.4 2.4 4.8-5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** A checklist — the action-items row. */
export function ChecklistIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="3.4"
        y="4.4"
        width="17.2"
        height="15.2"
        rx="2.2"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M7.4 9h2M7.4 12.6h2M7.4 16.2h2M12 9h4.6M12 12.6h4.6M12 16.2h4.6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** An envelope — the follow-up draft's header. */
export function MailIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="2.8"
        y="5"
        width="18.4"
        height="14"
        rx="2.4"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="m3.6 7 8.4 6 8.4-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** A small calendar — each action item's due date. */
export function DueIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="3.6"
        y="5.4"
        width="16.8"
        height="15"
        rx="2.4"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M3.6 10h16.8M8.4 3.6v3.6M15.6 3.6v3.6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** A four-point spark — the "Generate follow-up" button. */
export function SparkIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2.6c.55 3.9 1.75 7.25 6.1 8.2-4.35.95-5.55 4.3-6.1 8.2-.55-3.9-1.75-7.25-6.1-8.2 4.35-.95 5.55-4.3 6.1-8.2Z" />
      <path d="M19.4 15.2c.25 1.75.8 3.25 2.75 3.7-1.95.45-2.5 1.95-2.75 3.7-.25-1.75-.8-3.25-2.75-3.7 1.95-.45 2.5-1.95 2.75-3.7Z" />
    </svg>
  );
}

/** A chevron — the collapsible rows in the panel. */
export function ChevronIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="m4 6 4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** A magnifier — the panel's title bar. */
export function SearchIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="9" cy="9" r="5.4" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="m13 13 3 3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** A vertical ellipsis — the overflow marks. */
export function MoreIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <circle cx="10" cy="4.4" r="1.4" />
      <circle cx="10" cy="10" r="1.4" />
      <circle cx="10" cy="15.6" r="1.4" />
    </svg>
  );
}

/**
 * The Microsoft Teams mark on the sync pill.
 *
 * A simplified stand-in rather than the official logo — a recognisable
 * silhouette in the brand's violet, without reproducing a trademark asset the
 * project does not carry a licence for.
 */
export function TeamsMark({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect x="2.6" y="6" width="11" height="12" rx="2.2" fill="currentColor" />
      <path
        d="M5.4 9.4h5.4M8.1 9.4v5.6"
        stroke="#0c131b"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="18" cy="7.4" r="2.6" fill="currentColor" opacity="0.85" />
      <path
        d="M15.6 11.4h4.2a1.6 1.6 0 0 1 1.6 1.6v2.6a3.4 3.4 0 0 1-3.4 3.4h-.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        opacity="0.85"
      />
    </svg>
  );
}

/** The arrow on both hero actions. */
export function ArrowIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M3.5 10h12m0 0-4.4-4.4M15.5 10l-4.4 4.4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
