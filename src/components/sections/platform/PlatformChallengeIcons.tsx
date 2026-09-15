/**
 * PLATFORM CHALLENGE ICONS
 * ---------------------------------------------------------------------------
 * The three marks beside the problems in section 2.
 *
 * Each is one idea plus what has gone wrong with it: a book with a question
 * mark, a document behind a magnifier, a feedback bubble with a broken link.
 * The design keeps that split in colour — the subject in lavender, the fault
 * in amber — so the two colours are structural rather than decoration, and
 * they are named rather than inherited.
 *
 * DRAWN, NOT SHIPPED. The design supplies them as 571x566 PNGs, ~240KB each.
 * As SVG the three together are a few hundred bytes, stay sharp at any density
 * and let the disc respond to a pointer with the row around them.
 *
 * The disc and its ring are drawn here too, so the whole mark is one element
 * the caller can size. All are `aria-hidden`: each sits beside its own title,
 * so an announced icon would only repeat the words next to it.
 */

type IconProps = { className?: string };

/** The subject of each icon. */
const SUBJECT = "#c9b0fb";
/** What has gone wrong with it. */
const FAULT = "#f0a418";

/** The disc and ring every mark sits on. */
function Disc() {
  return (
    <>
      <circle cx="32" cy="32" r="31" fill="#2f2545" />
      <circle
        cx="32"
        cy="32"
        r="31"
        fill="none"
        stroke="#9b72e8"
        strokeWidth="1.6"
      />
    </>
  );
}

/** An open book with a question mark — learning without direction. */
export function DirectionIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <Disc />
      <path
        d="M32 24.6c-2.4-2-5.6-2.9-9.6-2.8a1 1 0 0 0-1 1v15.6a1 1 0 0 0 1.05 1c3.8-.15 6.8.6 9.55 2.6M32 24.6c2.4-2 5.6-2.9 9.6-2.8a1 1 0 0 1 1 1v9.4M32 24.6V42"
        stroke={SUBJECT}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* The question mark, sitting over the book's lower right. */}
      <path
        d="M38.8 33.4a3.5 3.5 0 1 1 4.9 3.2c-1.2.55-1.9 1.5-1.9 2.8v.6"
        stroke={FAULT}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="41.8" cy="44.4" r="1.9" fill={FAULT} />
    </svg>
  );
}

/** A document behind a magnifier — knowledge out of reach. */
export function KnowledgeIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <Disc />
      <path
        d="M36.4 19.4H23.6a1.9 1.9 0 0 0-1.9 1.9v21.4a1.9 1.9 0 0 0 1.9 1.9h11"
        stroke={SUBJECT}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M36.4 19.4 42.3 25v7.4"
        stroke={SUBJECT}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* The three rules on the page. */}
      <path
        d="M26.8 28.6h9.4M26.8 33.4h9.4M26.8 38.2h5.4"
        stroke={SUBJECT}
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      {/* The magnifier, over the page's lower right. */}
      <circle cx="41" cy="37.6" r="5.9" stroke={FAULT} strokeWidth="3" />
      <path
        d="m45.6 42.2 3.6 3.6"
        stroke={FAULT}
        strokeWidth="3.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** A feedback bubble with a broken link — performance without follow-through. */
export function FollowThroughIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <Disc />
      <path
        d="M42.6 30.2c0 5.4-5 9.7-11.2 9.7-.9 0-1.8-.1-2.6-.26l-5.2 2.06 1.5-4.3a9 9 0 0 1-3.5-7.2c0-5.4 5-9.7 11.2-9.7s11.2 4.3 11.2 9.7Z"
        stroke={SUBJECT}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* The bars inside it — the measurement that never travels. */}
      <path
        d="M27.6 33.4v-3.2M32 33.4v-6.4M36.4 33.4v-9"
        stroke={SUBJECT}
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      {/* The broken chain: two links, and the break between them. */}
      <path
        d="M41.6 44.6a3.4 3.4 0 0 1 0-4.8l1.9-1.9"
        stroke={FAULT}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M47.9 38.4a3.4 3.4 0 0 1 0 4.8l-1.9 1.9"
        stroke={FAULT}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M43.4 45.8l-1 1.8M46.6 45.8l1 1.8M44.9 47.6v2"
        stroke={FAULT}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** A chain link — the band's mark. Sits on its own violet disc, so no Disc. */
export function LinkIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M10.2 13.8a4.3 4.3 0 0 0 6.1 0l2.4-2.4a4.3 4.3 0 0 0-6.1-6.1l-1.3 1.3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.8 10.2a4.3 4.3 0 0 0-6.1 0l-2.4 2.4a4.3 4.3 0 0 0 6.1 6.1l1.3-1.3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Keyed by the `icon` name in the content file. */
export const problemIcons = {
  direction: DirectionIcon,
  knowledge: KnowledgeIcon,
  followThrough: FollowThroughIcon,
} as const;
