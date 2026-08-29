/**
 * WEBINARS & EVENTS PAGE CONTENT
 * ---------------------------------------------------------------------------
 * Copy for the Webinars and Events page at /resources/events.
 *
 * Distinct from content/resources.ts (the Resources LANDING page) and
 * content/insights.ts (Insights) — same section of the site, different pages.
 *
 * Section 1 is defined below; further sections are added here as their designs
 * land.
 */

export const events = {
  /** Page-level metadata, consumed by the route's `metadata` export. */
  meta: {
    title: "Webinars and Events",
    description:
      "Recorded conversations with practical ideas for building capability and improving performance.",
    path: "/resources/events",
  },

  /**
   * SECTION 1 — the hero.
   *
   * A short statement, then a single featured recording presented as one wide
   * panel: the artwork fills the left half, the details sit on the right.
   */
  hero: {
    eyebrow: "Webinars & Events",

    /**
     * One sentence per line, as the design breaks them. Kept as two strings
     * rather than one with a <br>, so the break can be dropped below lg where
     * the measure is too narrow to honour it.
     */
    headline: ["Catch up.", "Take something forward."],

    description:
      "Recorded conversations with practical ideas for building capability and improving performance.",

    /** The single featured recording — the panel below the statement. */
    featured: {
      /** The pill above the title, drawn with a star. */
      badge: "Featured recording",

      eyebrow: "Capability frameworks",

      /** Split so the lines break where the design breaks them on lg+. */
      title: ["From roles", "to readiness"],

      description: "Build a capability framework around the work that matters.",

      speaker: "Lurny team",
      duration: "48 min",

      action: { label: "Watch recording", href: "#recordings" },

      /**
       * The artwork. It ships as an image rather than being drawn: it is a
       * rendered photographic scene — a printed guide, a microphone and three
       * embossed notebooks — not a diagram.
       *
       * Opaque, unlike the Resources covers: the whole frame is the artwork,
       * so it fills the panel's left half rather than being cut out and
       * positioned. See scripts/build-event-images.cjs.
       */
      image: {
        src: "/assets/images/events/featured-roles-to-readiness.webp",
        /**
         * Decorative: the title, speaker and duration beside it already say
         * everything the picture carries, so announcing it again would only
         * be noise for a screen reader.
         */
        alt: "",
        width: 1350,
        height: 1165,
      },
    },
  },

  /**
   * SECTION 2 — the recordings grid.
   *
   * A three-up grid of recording cards on a light ground: thumbnail with a
   * play affordance and running time, then topic, title, speaker and a link.
   *
   * PLACEHOLDER COPY. The design itself carries the note reproduced in
   * `disclaimer` below — the titles, speakers and durations here are the
   * design's own stand-ins, not real sessions, and the thumbnails are
   * illustrative renders. Replace all of it with the real catalogue before
   * launch, and drop `disclaimer` at the same time.
   */
  recordings: {
    title: "More recordings",

    /**
     * Rendered rather than hardcoded as "7 sessions", so it cannot drift out
     * of step with the list when entries are added or removed.
     */
    countLabel: (n: number) => `${n} session${n === 1 ? "" : "s"}`,

    /** The design's own note. See the block comment above. */
    disclaimer:
      "Illustrative recordings for design only. Titles, speakers and durations are placeholders.",

    /**
     * Topic tones, keyed by the eyebrow each card carries. Sampled from the
     * design, which colours the eyebrow by subject rather than per card.
     */
    tones: {
      learning: "#2f8f86",
      conversation: "#e07b1f",
      frontline: "#e07b1f",
      capability: "#7a55e0",
    },

    /**
     * Every card links to the same placeholder for now: there are no
     * recording pages yet, and pointing seven cards at seven URLs that all
     * 404 would be worse than one honest anchor.
     */
    action: { label: "Watch recording", href: "#recordings" },

    items: [
      {
        topic: "AI & Learning",
        tone: "learning",
        title: "AI-native learning beyond the LMS",
        speaker: "Lurny team",
        duration: "28 min",
        image: "/assets/images/events/card-1.webp",
      },
      {
        topic: "Conversation Intelligence",
        tone: "conversation",
        title: "What frontline conversations reveal",
        speaker: "Lurny team",
        duration: "42 min",
        image: "/assets/images/events/card-2.webp",
      },
      {
        topic: "AI & Learning",
        tone: "learning",
        title: "From source content to useful learning",
        speaker: "Lurny team",
        duration: "36 min",
        image: "/assets/images/events/card-3.webp",
      },
      {
        topic: "Frontline Performance",
        tone: "frontline",
        title: "Practice before performance",
        speaker: "Lurny team",
        duration: "32 min",
        image: "/assets/images/events/card-4.webp",
      },
      {
        topic: "Frontline Performance",
        tone: "frontline",
        title: "Coaching in the flow of work",
        speaker: "Lurny team",
        duration: "30 min",
        image: "/assets/images/events/card-5.webp",
      },
      {
        topic: "Capability Frameworks",
        tone: "capability",
        title: "Measuring what learning changes",
        speaker: "Lurny team",
        duration: "40 min",
        image: "/assets/images/events/card-6.webp",
      },
      {
        topic: "AI & Learning",
        tone: "learning",
        title: "Making learning accessible to everyone",
        speaker: "Lurny team",
        duration: "35 min",
        image: "/assets/images/events/card-7.webp",
      },
    ],
  },
} as const;
