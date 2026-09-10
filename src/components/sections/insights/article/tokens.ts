/**
 * INSIGHT ARTICLE — SHARED TOKENS
 * ---------------------------------------------------------------------------
 * The article designs use their own palette, warmer and more editorial than
 * the site's. Every colour below is sampled from the supplied export, so the
 * hex values are the design's own rather than approximations.
 *
 * They are collected here because the same six colours recur across the hero,
 * the player, the rail, the diagrams and the foot — and because the SVG
 * diagrams need them as literal strings for `stroke`, where a Tailwind class
 * cannot reach.
 */

export const ink = {
  /** Body ground: the warm paper the whole page sits on. */
  paper: "#F8F2E8",
  /** The panel tint one step up from the paper — cards, figure grounds. */
  panel: "#FBF7F0",
  /** Darkest ink: headings, the player's ground. */
  black: "#191522",
  /** Body prose — a touch lighter than headings. */
  body: "#2A2434",
  /** Secondary prose and the standfirst. */
  muted: "#4B4458",
  /** Labels, meta and the resting rail item. */
  subtle: "#8C8299",
  /** Hairlines and rules. */
  line: "#DDD2C2",
  /** The heavier hairline used inside diagrams and on nav borders. */
  lineStrong: "#E7DFD1",
  /** The ring ground in the diagrams. */
  ringTrack: "#EAE1D2",
} as const;

/**
 * The four accents. The article uses them consistently: violet for the
 * primary/brand mark, terracotta for emphasis, olive for the "further along"
 * state, and brass for connectors and quieter labels.
 */
export const accent = {
  violet: "#5B2A9D",
  terracotta: "#E46C5A",
  olive: "#68796B",
  brass: "#A9824C",
  /** Only on the dark player card. */
  amber: "#FFC35E",
  /** The second stop of the player's progress gradient. */
  lilac: "#A276E0",
  /**
   * Plum, and its lighter partner. The performance-intelligence article takes
   * these as its primary pair where the first takes violet and the second
   * olive — same role, different hue.
   */
  plum: "#755078",
  mauve: "#9A6F91",
  /**
   * Sage, and its two lighter steps. The enterprise-AI article takes these as
   * its primary set. It is NOT the second article's olive (#68796B) — a
   * cooler, greener hue sampled separately from its own export.
   */
  sage: "#68775A",
  sageMid: "#8B9874",
  sageLight: "#A7B98E",
  /**
   * Aubergine. The flow-of-work article uses it for the RETURN half of its
   * loops — the dotted path carrying evidence back to the next decision —
   * against a terracotta forward path. It is the colour of feedback, not of
   * that article's category.
   */
  aubergine: "#6A4869",
} as const;

/**
 * The plum article's own tints: a near-white panel, its hairline, and the
 * slightly stronger border its hero badge takes. Sampled from that export.
 */
export const plumTint = {
  panel: "#FBF6FB",
  line: "#E3D3E4",
  lineStrong: "#D8C7D9",
} as const;

/** The page's max content width, from the export's `max-width: 1180px`. */
export const FRAME = "mx-auto w-full max-w-[1180px] px-6";

/**
 * Prose paragraph styling, shared by every section so the rhythm cannot
 * drift between them. Matches the export's 20.5px / 1.68 Newsreader.
 */
export const PROSE =
  "font-reading text-[1.28125rem] leading-[1.68] text-[#2A2434] text-pretty";

/** Section headings — the export's clamp(30px, 3.6vw, 42px). */
export const HEADING =
  "font-reading font-normal text-[clamp(1.875rem,3.6vw,2.625rem)] leading-[1.14] tracking-[-0.022em] text-[#191522]";

/** The uppercase label used for eyebrows throughout the article. */
export const EYEBROW =
  "text-[0.71875rem] font-bold tracking-[0.16em] uppercase";
