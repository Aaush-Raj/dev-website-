/**
 * HERO CONTENT
 * ---------------------------------------------------------------------------
 * Copy for the homepage hero, kept out of the component so wording can change
 * without touching markup.
 *
 * `headline` is split into lines because the design sets a deliberate three-
 * line break with the final word underlined. Rendering it as one string and
 * letting it wrap would lose that composition at most viewport widths.
 */

export const hero = {
  eyebrow: "AI-native capability-to-performance platform",

  /** Rendered as separate lines on desktop; joins naturally on small screens. */
  headline: ["Capability that", "shows up in", "performance."] as const,

  /**
   * Index of the line that carries the amber underline. In the design this is
   * the last line, "performance.".
   */
  underlinedLineIndex: 2,

  description:
    "Lurny connects role expectations, learning, practice, real-work evidence and action intelligence—so leaders can see where capability stands and what to improve next.",

  actions: {
    primary: { label: "Book a Demo", href: "/demo" },
    secondary: { label: "Explore the platform", href: "/platform" },
  },
} as const;
