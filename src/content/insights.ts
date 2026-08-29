/**
 * INSIGHTS PAGE CONTENT
 * ---------------------------------------------------------------------------
 * Copy for the Insights page at /resources/insights.
 *
 * Distinct from content/resources.ts, which is the Resources LANDING page —
 * same section of the site, different page. Copy is verbatim from the supplied
 * "insights_page_text_content.txt".
 *
 * Section 1 is defined below; further sections are added here as their designs
 * land.
 */

export const insights = {
  /** Page-level metadata, consumed by the route's `metadata` export. */
  meta: {
    title: "Insights",
    description:
      "Original thinking, field evidence and practical perspectives on how organisations build capability, enable learning and improve performance.",
    path: "/resources/insights",
  },

  /**
   * SECTION 1 — the hero.
   *
   * Copy on the left over a full-bleed illustration: a staircase of icon-lit
   * steps climbing to a star, with two figures looking up at it.
   */
  hero: {
    eyebrow: "Insights",

    /** Split so the lines break where the design breaks them on lg+. */
    headline: ["Ideas shaping", "the AI-ready", "enterprise"] as const,

    description:
      "Original thinking, field evidence and practical perspectives on how organisations build capability, enable learning and improve performance.",

    /**
     * The illustration. It ships as an image rather than being drawn: it is a
     * rendered scene with figures and hand-drawn glyphs, not a diagram.
     *
     * Its left third is already near-black, which is what lets the copy sit
     * over it with only a light scrim of our own.
     */
    scene: {
      src: "/assets/images/insights/hero-staircase.webp",
      /**
       * Decorative: it is atmosphere behind the copy, and the headline beside
       * it already says what the page is about.
       */
      alt: "",
      width: 1672,
      height: 941,
    },

    actions: {
      /* Both point at sections further down this page — see the note on the
         hero's CTAs in InsightsHero. */
      primary: { label: "Explore the latest insights", href: "#latest" },
      secondary: { label: "Browse by topic", href: "#latest" },
    },
  },

  /**
   * SECTION 2 — latest thinking.
   *
   * A heading, a filter bar, and a 3x2 grid of article cards.
   *
   * `tone` is the colour of the card's category label. It tracks the ARTWORK,
   * not the category: sampled from the design, cards 1/4/6 are terracotta,
   * 2/5 olive and 3 violet, while "Capability & Readiness" appears on both a
   * terracotta card and another terracotta one but "AI-native Learning"
   * appears on both an olive and a terracotta. So the colour belongs to the
   * article beside its illustration, not to the taxonomy.
   *
   * The filter tabs are real: `category` on each article is matched against
   * the tab labels in InsightsThinking. `filters[0]` is the resting "All".
   *
   * TODO(routes): `href` on each article points at a post that does not exist
   * yet. They are listed so the cards are ready the moment the posts land.
   */
  thinking: {
    eyebrow: "Latest thinking",
    headline: "Ideas worth exploring",
    description:
      "Perspectives on capability, learning and performance in the AI-ready enterprise.",

    /** First entry is the resting filter and shows everything. */
    filters: [
      "All",
      "Capability & Readiness",
      "AI-native Learning",
      "Performance Intelligence",
      "Enterprise AI & Field Lessons",
    ] as const,

    articles: [
      {
        category: "Capability & Readiness",
        tone: "terracotta",
        title: "What does \u2018ready\u2019 actually mean at work?",
        readTime: "6 min read",
        href: "/resources/insights/ready-at-work",
        image: {
          src: "/assets/images/insights/thinking/ready-at-work.webp",
          /** Decorative: abstract line art, and the title beside it is the
              label. Describing the diagram would only add noise. */
          alt: "",
          width: 560,
          height: 253,
        },
      },
      {
        category: "AI-native Learning",
        tone: "olive",
        title: "Why content creation is no longer the bottleneck",
        readTime: "7 min read",
        href: "/resources/insights/content-creation",
        image: {
          src: "/assets/images/insights/thinking/content-creation.webp",
          alt: "",
          width: 560,
          height: 305,
        },
      },
      {
        category: "Performance Intelligence",
        tone: "violet",
        title: "What 9,328 frontline conversations revealed",
        readTime: "8 min read",
        href: "/resources/insights/frontline-conversations",
        image: {
          src: "/assets/images/insights/thinking/conversations.webp",
          alt: "",
          width: 560,
          height: 197,
        },
      },
      {
        category: "Capability & Readiness",
        tone: "terracotta",
        title: "From competency documents to living baselines",
        readTime: "5 min read",
        href: "/resources/insights/living-baselines",
        image: {
          src: "/assets/images/insights/thinking/living-baselines.webp",
          alt: "",
          width: 560,
          height: 249,
        },
      },
      {
        category: "Enterprise AI & Field Lessons",
        tone: "olive",
        title: "Context is the enterprise AI advantage",
        readTime: "6 min read",
        href: "/resources/insights/context-advantage",
        image: {
          src: "/assets/images/insights/thinking/context-advantage.webp",
          alt: "",
          width: 560,
          height: 267,
        },
      },
      {
        category: "AI-native Learning",
        tone: "terracotta",
        title: "Learning in the flow of work needs more than recommendations",
        readTime: "7 min read",
        href: "/resources/insights/flow-of-work",
        image: {
          src: "/assets/images/insights/thinking/flow-of-work.webp",
          alt: "",
          width: 560,
          height: 211,
        },
      },
    ],
  },

  /**
   * SECTION 3 — from the field.
   *
   * Copy and an evidence block on the left; on the right a network diagram —
   * branches funnelling into a conversation hub, then out to three findings.
   *
   * THE DIAGRAM IS THE SUPPLIED ARTWORK, and deliberately so: the export is
   * named "no_text" because it ships the picture WITHOUT any labels. The
   * numbers, the central metric and the three findings are laid over it as
   * real text, so they stay selectable, translatable and legible at any size
   * — the drawing is a drawing, and the words are words.
   *
   * `branchLabels` are positioned as percentages of the artwork's own height,
   * MEASURED from it rather than estimated, so a label always sits beside the
   * node it names. The design labels nine of the eleven drawn nodes — the
   * numbering skips (01-05, then 10, 15, 20, 25) to imply twenty-five
   * branches without drawing all of them.
   */
  field: {
    eyebrow: "From the field",

    /** Split so the lines break where the design breaks them on lg+. */
    headline: [
      "What frontline",
      "activity tells us that",
      "learning data cannot",
    ] as const,

    description:
      "Learning platforms show what people completed. Real conversations reveal what they understood, applied\u2014and missed.",

    /** The evidence block beneath the rule. */
    evidence: {
      icon: {
        src: "/assets/images/insights/field-implementation.webp",
        /** Decorative: the label beside it says what it stands for. */
        alt: "",
      },
      label: "Anonymised field implementation",
      metrics: [
        { value: "9,328", unit: "frontline conversations" },
        { value: "25", unit: "branches" },
      ],
    },

    action: { label: "Read the field note", href: "#latest" },

    /** The network diagram the labels are laid over. */
    diagram: {
      src: "/assets/images/insights/field-network.webp",
      /**
       * Decorative: every fact the drawing carries is also written out in
       * the labels laid over it and in the copy beside it, so describing the
       * picture again would only repeat what a screen reader already reads.
       */
      alt: "",
      width: 1030,
      height: 836,
    },

    /**
     * The branch numbers down the left of the diagram.
     *
     * `top` is the percentage of the artwork's height at which that node's
     * centre sits, measured from the export itself.
     */
    branchLabels: [
      { label: "01", top: 4.85 },
      { label: "02", top: 14.07 },
      { label: "03", top: 22.87 },
      { label: "04", top: 31.56 },
      { label: "05", top: 40.24 },
      { label: "10", top: 50.36 },
      { label: "15", top: 59.7 },
      { label: "20", top: 69.7 },
      { label: "25", top: 95.21 },
    ],

    /** The metric written inside the hub. */
    hub: { value: "9,328", label: "Frontline conversations" },

    /**
     * The three findings on the right. `top` places each beside the finding
     * icon the artwork already draws for it.
     */
    findings: [
      {
        number: "1",
        text: "Knowledge gaps surfaced in real customer interactions",
        top: 18.5,
      },
      {
        number: "2",
        text: "Missed cross-sell and follow-up opportunities became visible",
        top: 50,
      },
      {
        number: "3",
        text: "Performance patterns varied across branches and individuals",
        top: 81.5,
      },
    ],
  },

  /**
   * SECTION 4 — the closing subscribe band.
   *
   * A subscribe form on the left, an illustration on the right.
   *
   * The form is REAL — a labelled email input with validation, not a drawing
   * of one. It is the only interactive control on this page, so unlike the
   * product panels elsewhere on the site nothing here is Uncopyable or
   * aria-hidden.
   *
   * NOTE: submit does not send anywhere yet. See the TODO in
   * InsightsSubscribe — the destination is unchosen, and a form that silently
   * dropped real addresses would be worse than one that visibly does nothing.
   */
  subscribe: {
    eyebrow: "Stay in the loop",

    /** Split so the lines break where the design breaks them on lg+. */
    headline: ["Keep up with ideas", "shaping workplace capability"] as const,

    description:
      "Occasional perspectives on capability, AI-native learning and performance\u2014grounded in what enterprises are learning in the field.",

    form: {
      /** The label is visually hidden: the design shows only a placeholder,
          but a control with no label at all is unusable by screen reader. */
      label: "Your work email",
      placeholder: "Your work email",
      submit: "Subscribe",
      errors: {
        empty: "Please enter your work email.",
        format: "Please enter a valid email address.",
      },
      success: {
        title: "You\u2019re subscribed.",
        description: "Look out for the next set of perspectives in your inbox.",
      },
    },

    /** The line under the form. Split so the lead can take the design's
        heavier weight. */
    note: {
      lead: "No noise.",
      tail: "Just considered ideas, shared occasionally.",
    },

    /**
     * The two links beneath. `external` renders the design's diagonal arrow
     * and opens in a new tab; the internal one gets a straight arrow.
     */
    links: [
      {
        label: "Follow Lurny on LinkedIn",
        href: "https://www.linkedin.com/company/lurny",
        external: true,
      },
      {
        label: "Explore the Resources Library",
        href: "/resources",
        external: false,
      },
    ],

    illustration: {
      src: "/assets/images/insights/subscribe-illustration.webp",
      /**
       * Decorative: an abstract scene of ideas fanning out of a book, and
       * the headline beside it already says what the section is for.
       */
      alt: "",
      width: 1000,
      height: 667,
    },
  },
} as const;
