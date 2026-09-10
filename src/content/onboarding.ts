/**
 * EMPLOYEE ONBOARDING PAGE CONTENT
 * ---------------------------------------------------------------------------
 * Copy for /solutions/onboarding — the third of the "solutions by business
 * need" detail pages, after /solutions/frontline and
 * /solutions/sales-enablement.
 *
 * Copy is verbatim from the supplied "04_Hero_Text.txt" and the card text in
 * the section design. Section 1 is defined below; the remaining sections are
 * added here as their designs are built.
 */

export const onboarding = {
  /** Page-level metadata, consumed by the route's `metadata` export. */
  meta: {
    title: "Employee Onboarding — Onboarding That Fits Every Starting Point",
    description:
      "Build onboarding around each employee's role, existing knowledge and learning needs, so every new joiner contributes with confidence.",
    path: "/solutions/onboarding",
  },

  /**
   * SECTION 1 — the hero.
   *
   * The statement on the left over the scene's lavender wash, the two starting
   * points on cards over the office to the right.
   */
  hero: {
    eyebrow: "Employee onboarding",

    /**
     * Split into two runs so the design's colour change can be drawn rather
     * than typed: the first sentence is near-black, the second violet.
     */
    headline: {
      lead: ["Different starting", "points."],
      accent: ["Onboarding that fits."],
    },

    description:
      "Build onboarding around each employee’s role, existing knowledge and learning needs. Combine relevant learning, everyday knowledge support and readiness checks to help every new joiner contribute with confidence.",

    actions: {
      primary: { label: "Book a demo", href: "/demo" },
      /* Points at a section further down this page, which is specified in the
         supplied copy but not yet built. */
      secondary: { label: "Explore the onboarding journey", href: "#journey" },
    },

    /** The engine attribution under the actions. */
    poweredBy: {
      label: "Powered by",
      engines: ["LurnyPulse", "LurnyMagic", "LurnyKxP", "LurnyChat"],
    },

    /**
     * The office scene. It already carries the colleagues, the wall text, the
     * handwritten note, the desk props and the dashed connectors — only the
     * two cards sit over it.
     */
    scene: {
      src: "/images/solutions/onboarding/hero-scene.webp",
      /**
       * Decorative: it is a photograph of two colleagues talking, and every
       * claim the section makes is set in the copy and the cards beside it.
       */
      alt: "",
      width: 1672,
      height: 941,
    },

    /**
     * THE TWO STARTING POINTS
     * ---------------------------------------------------------------------
     * Built in markup rather than shipped as the supplied crops — see
     * scripts/build-onboarding-hero.cjs for why.
     *
     * Both are the same role, which is the section's point: the same job can
     * begin from two different places, so the paths differ while the role does
     * not.
     */
    cards: [
      {
        title: "New to the role",
        role: "Customer Service Executive",
        icon: "person",
        items: [
          "Product foundations",
          "Process walkthroughs",
          "Conversation practice",
        ],
      },
      {
        title: "Bringing prior experience",
        role: "Customer Service Executive",
        icon: "people",
        items: [
          "Company-specific products",
          "Internal systems",
          "Targeted gap checks",
        ],
      },
    ],
  },

  /**
   * THE CONNECTED APPROACH.
   *
   * The statement on the left, five steps on cards to the right with arrows
   * threading them. Everything except the gradient is markup — see
   * OnboardingApproach.
   */
  approach: {
    eyebrow: "The connected approach",

    /** Split so the lines break where the design breaks them on lg+. */
    headline: [
      "An onboarding",
      "journey built",
      "around the role.",
      "And the person.",
    ],

    description:
      "Understand what each employee needs to do, recognise their starting point, and connect relevant learning with everyday support to help them contribute.",

    /** The note under the description, behind its own icon. */
    shared: {
      title: "Shared essentials for everyone.",
      body: "Additional learning shaped by individual needs.",
    },

    /** The gradient the section sits on. */
    backdrop: {
      src: "/images/solutions/onboarding/approach-backdrop.webp",
      alt: "",
      width: 1672,
      height: 941,
    },

    /** The handwritten note closing the section. */
    note: ["Different starting points.", "Relevant next steps."],

    /**
     * The five steps. The ordinal is the item's position rather than stored
     * copy, so the two cannot drift apart.
     *
     * `engine` is the chip at the card's foot; `icon` selects its mark.
     */
    steps: [
      {
        title: "Define the role",
        body: "Set clear expectations for knowledge and capability.",
        engine: "LurnyPulse",
        icon: "target",
      },
      {
        title: "Understand the starting point",
        body: "Identify existing strengths and learning gaps.",
        engine: "LurnyPulse",
        icon: "sliders",
      },
      {
        title: "Build the relevant journey",
        body: "Create and deliver focused learning from approved materials.",
        engine: "LurnyMagic + LurnyKxP",
        icon: "book",
      },
      {
        title: "Support everyday work",
        body: "Answer questions about policies, products and procedures.",
        engine: "LurnyChat",
        icon: "chat",
      },
      {
        title: "Review readiness",
        body: "Review assessment evidence and remaining gaps.",
        engine: "LurnyPulse",
        icon: "check",
      },
    ],
  },
} as const;
