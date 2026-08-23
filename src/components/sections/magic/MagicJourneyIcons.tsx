/**
 * MAGIC JOURNEY ICONS
 * ---------------------------------------------------------------------------
 * Glyphs for section 5: the four card badges, the panel tab marks, and the
 * small fact icons inside the journey card.
 *
 * Drawn on a 24x24 grid at a 1.6 stroke, matching the design's line weight,
 * and inheriting `currentColor` so each card tints its own.
 *
 * `journeyBadgeIcons` and `journeyTabIcons` are lookup tables keyed by the
 * `icon` strings in content/magic.ts, so the content picks a glyph by name
 * without importing anything.
 */

interface IconProps {
  className?: string;
}

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** A four-pointed sparkle. The Microcourses badge. */
export function SparkBadgeIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M12 3.4 13.9 10.1 20.6 12 13.9 13.9 12 20.6 10.1 13.9 3.4 12l6.7-1.9z" />
    </svg>
  );
}

/** A bulleted list. The Playlists badge. */
export function ListBadgeIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M9.4 6.6h10.2M9.4 12h10.2M9.4 17.4h10.2" />
      <path d="M4.6 6.6h.01M4.6 12h.01M4.6 17.4h.01" strokeWidth="2.6" />
    </svg>
  );
}

/** An open book. The Courses badge, and the microlessons tab. */
export function BookIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M12 6.4C10.4 5 8.2 4.4 4.6 4.4v13.4c3.6 0 5.8.6 7.4 2 1.6-1.4 3.8-2 7.4-2V4.4c-3.6 0-5.8.6-7.4 2Z" />
      <path d="M12 6.4v13.4" />
    </svg>
  );
}

/** A folded map. The Learning Journeys badge. */
export function MapIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M3.4 6.6 9 4.4l6 2.2 5.6-2.2v13L15 19.6l-6-2.2-5.6 2.2z" />
      <path d="M9 4.4v13M15 6.6v13" />
    </svg>
  );
}

/** Stacked sheets. The courses and modules tabs. */
export function LayersIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="m12 3.4 8.6 4.3-8.6 4.3-8.6-4.3z" />
      <path d="m3.4 12 8.6 4.3 8.6-4.3M3.4 16.3l8.6 4.3 8.6-4.3" />
    </svg>
  );
}

/** A circled letter mark. The quizzes tab. */
export function QuizIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="8.6" />
      <path d="M9.8 9.6a2.3 2.3 0 1 1 2.9 2.2v1.5" />
      <path d="M12.7 16.4h.01" strokeWidth="2.2" />
    </svg>
  );
}

/** A play-queue mark: list rows with a triangle. The playlists tab. */
export function QueueIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M3.6 6.6h8.8M3.6 12h6.2M3.6 17.4h6.2" />
      <path d="M14.4 9.8v8l6.4-4z" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** A left arrow. The journey card's back link. */
export function ArrowLeftIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M19.4 12H4.6M10.4 6.2 4.6 12l5.8 5.8" />
    </svg>
  );
}

/** A vertical ellipsis. The row overflow control. */
export function MoreDotsIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="5.4" r="1.7" />
      <circle cx="12" cy="12" r="1.7" />
      <circle cx="12" cy="18.6" r="1.7" />
    </svg>
  );
}

/** A chevron pointing down. The panel's "More" control. */
export function ChevronDownIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="m5.6 9 6.4 6.4L18.4 9" />
    </svg>
  );
}

/** A circular arrow. The skill map's refresh control. */
export function RefreshIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M19.6 12a7.6 7.6 0 1 1-2.7-5.8" />
      <path d="M19.9 4.4v4.3h-4.3" />
    </svg>
  );
}

/** A stylised brain. The skill map's header mark. */
export function BrainIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="8.6" />
      <path d="M12 3.6v16.8M6.4 7.2c2 1.4 2 3.4 0 4.8s-2 3.4 0 4.8M17.6 7.2c-2 1.4-2 3.4 0 4.8s2 3.4 0 4.8" />
    </svg>
  );
}

/** A graduation cap. The journey's goal fact. */
export function GoalIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M12 4.4 21.4 9 12 13.6 2.6 9z" />
      <path d="M6.6 11v4.6c0 1.6 2.4 2.8 5.4 2.8s5.4-1.2 5.4-2.8V11" />
    </svg>
  );
}

/** A person. The journey's role fact. */
export function RoleIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <circle cx="12" cy="8.2" r="3.6" />
      <path d="M4.8 20c0-3.6 3.2-5.8 7.2-5.8s7.2 2.2 7.2 5.8" />
    </svg>
  );
}

/** A clipboard. The journey's department fact. */
export function DepartmentIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <rect x="4.8" y="4.6" width="14.4" height="15.2" rx="2.4" />
      <path d="M9.2 3.4h5.6v3.2H9.2z" fill="currentColor" stroke="none" />
      <path d="M8.6 11.4h6.8M8.6 15.2h4.6" />
    </svg>
  );
}

/** A clock face. The journey's time fact. */
export function TimeIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="8.6" />
      <path d="M12 7.2V12l3.2 2" />
    </svg>
  );
}

/** A rosette. The journey's XP line. */
export function MedalIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <circle cx="12" cy="9" r="5.2" />
      <path d="m8.6 13.6-1.4 7 4.8-2.6 4.8 2.6-1.4-7" />
    </svg>
  );
}

/** The badge glyph for each of the four cards, keyed by the content's `icon`. */
export const journeyBadgeIcons = {
  spark: SparkBadgeIcon,
  list: ListBadgeIcon,
  book: BookIcon,
  map: MapIcon,
} as const;

/** The tab glyph inside a card's panel, keyed by the content's `icon`. */
export const journeyTabIcons = {
  book: BookIcon,
  quiz: QuizIcon,
  queue: QueueIcon,
  layers: LayersIcon,
} as const;

/** The small glyph beside each journey fact, keyed by the content's `icon`. */
export const journeyFactIcons = {
  goal: GoalIcon,
  role: RoleIcon,
  department: DepartmentIcon,
  time: TimeIcon,
} as const;
