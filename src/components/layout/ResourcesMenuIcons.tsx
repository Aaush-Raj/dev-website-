import { cn } from "@/lib/utils";

/**
 * RESOURCES MENU ICONS
 * ---------------------------------------------------------------------------
 * The five glyphs in the Resources mega-menu.
 *
 * WHY DRAWN, NOT SHIPPED
 * The Platform menu's icons are painted PNGs with a lavender disc baked in —
 * nine bespoke illustrations that predate this menu. Matching that treatment
 * would mean commissioning five more and downloading them on every page load,
 * for a panel most visitors open once. These are stroked SVG instead: they
 * cost nothing to fetch, stay sharp at every density, and inherit their colour
 * from the surrounding link.
 *
 * The disc IS drawn here, since it is not part of the glyph — see
 * `ResourceIcon` below, which wraps each one so the menu keeps the Platform
 * panel's silhouette.
 *
 * All five are on a 24 grid with a 1.6 stroke, matching the weight used by the
 * icon sets elsewhere in the site.
 */

type GlyphProps = { className?: string };

/** A document with a rising line — research and points of view. */
function InsightsGlyph({ className }: GlyphProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M6.4 3.4h7.4l4.2 4.2v13a1.6 1.6 0 0 1-1.6 1.6H6.4a1.6 1.6 0 0 1-1.6-1.6V5a1.6 1.6 0 0 1 1.6-1.6Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M13.6 3.6v4.2h4.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="m8.2 17.2 2.6-3 2 1.8 3-3.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** An open book — guides and playbooks. */
function GuidesGlyph({ className }: GlyphProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 6.6C10.4 5.2 8.4 4.5 5.8 4.5A1.6 1.6 0 0 0 4.2 6.1v10.6a1.6 1.6 0 0 0 1.6 1.6c2.6 0 4.6.7 6.2 2.1 1.6-1.4 3.6-2.1 6.2-2.1a1.6 1.6 0 0 0 1.6-1.6V6.1a1.6 1.6 0 0 0-1.6-1.6c-2.6 0-4.6.7-6.2 2.1Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M12 6.6v13.8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** A ribboned award — case studies, i.e. proven results. */
function CasesGlyph({ className }: GlyphProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="9.4"
        r="5.6"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="m9 14.2-1.4 6.4 4.4-2.4 4.4 2.4-1.4-6.4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m10.4 9.3 1.1 1.2 2.3-2.4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** A calendar — webinars and events. */
function EventsGlyph({ className }: GlyphProps) {
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
        d="M11 13.4v4l3.4-2z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** A play button in a frame — videos. */
function VideosGlyph({ className }: GlyphProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="2.6"
        y="5"
        width="18.8"
        height="14"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M10.4 9.4v5.2l4.4-2.6z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Keyed by the `icon` field on each item in navigation.ts. */
const glyphs = {
  insights: InsightsGlyph,
  guides: GuidesGlyph,
  cases: CasesGlyph,
  events: EventsGlyph,
  videos: VideosGlyph,
} as const;

export type ResourceIconName = keyof typeof glyphs;

/**
 * One menu icon: the glyph inside the lavender disc.
 *
 * The disc matches the Platform menu's painted icons — same size, same
 * lavender — so opening either panel gives the same silhouette. There it is
 * baked into the PNG; here it has to be drawn, which is also what lets it
 * deepen on hover.
 */
export function ResourceIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Glyph = glyphs[name as ResourceIconName];

  // A missing key would otherwise crash the whole header. Rendering nothing
  // leaves the entry's name and description, which carry the meaning anyway.
  if (!Glyph) return null;

  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid size-14 shrink-0 place-items-center rounded-2xl",
        "bg-brand-50 text-brand-600",
        "transition-[background-color,scale] duration-300 ease-out",
        // `scale`, not `transform` — Tailwind v4 compiles the scale utilities
        // to the standalone property. Matches the Platform icons' hover.
        "group-hover:scale-105 group-hover:bg-brand-100",
        className,
      )}
    >
      <Glyph className="size-6" />
    </span>
  );
}
