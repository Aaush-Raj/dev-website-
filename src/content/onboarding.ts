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

  /**
   * Section 2: the onboarding reality.
   *
   * A dark full-bleed band — the photograph fills it, three cards float over
   * the scene joined by dashed connectors, and a rail of four consequences
   * closes it off along the foot.
   *
   * ONLY THE PHOTOGRAPH SHIPS. The design pack also supplies the cards and
   * connectors as one 363KB PNG and the foot rail as another 164KB; both are
   * pure interface, so they are drawn — the text stays selectable and
   * translatable, and the strokes stay crisp at any density.
   */
  reality: {
    eyebrow: "The onboarding reality",
    headline: ["The induction ends.", "The questions don\u2019t."],
    description:
      "A common induction can overlook different roles, experience and learning needs. New joiners complete the content, yet still struggle to find answers, apply what they have learned and feel ready for everyday work.",

    /**
     * The three failure modes.
     *
     * `tone` keys the card's stroke, icon and label colour; `position` is
     * measured from the design as a share of the scene box. Reading order runs
     * top-right, then bottom-left, then centre — which is how the connectors
     * chain them, so the array order is the connector order rather than the
     * visual top-to-bottom.
     */
    gaps: [
      {
        id: "readiness",
        tone: "amber",
        icon: "bars",
        label: "Role readiness",
        title: ["Completion leaves", "gaps unseen."],
        note: "Finishing a course reveals little about readiness for everyday tasks.",
        /** Measured: L70.0% T5.0%, width 29.5% of the frame. */
        position: "right-[0.5%] top-[-2.5rem] w-[29.5%]",
      },
      {
        id: "generic",
        tone: "cyan",
        icon: "document",
        label: "One size fits all",
        title: ["Same content.", "Different needs."],
        note: "Role, experience and existing knowledge rarely shape the learning journey.",
        /** Measured: L3.8% T49.0%, width 23.0% of the frame. */
        position: "left-[3.8%] top-[48%] w-[23%]",
      },
      {
        id: "questions",
        tone: "red",
        icon: "question",
        label: "Knowledge support",
        title: ["Questions start after", "induction."],
        note: "New joiners hunt for answers or depend on busy colleagues.",
        /** Measured: L32.4% T55.3%, width 23.7% of the frame. */
        position: "left-[32.4%] top-[55%] w-[23.7%]",
      },
    ],

    /**
     * The consequences along the foot. Each reuses a stage icon and tone, so
     * the rail reads as a summary of the cards above rather than four
     * unrelated points — the second and fourth take the remaining tones, since
     * they name consequences the three cards imply rather than state.
     */
    consequences: [
      { icon: "document", tone: "cyan", label: "Generic content" },
      { icon: "question", tone: "red", label: "Too much at once" },
      { icon: "bars", tone: "violet", label: "Questions unanswered" },
      { icon: "stack", tone: "amber", label: "Readiness unclear" },
    ],

    /**
     * The photograph behind it all. It ships because it is a photograph; the
     * cards and connectors over it are drawn, so the supplied overlay PNGs are
     * not used.
     *
     * `alt` is empty: the image is atmosphere, and every word in the scene is
     * already rendered as real text by the cards.
     */
    scene: {
      src: "/assets/images/onboarding/reality-scene.webp",
      alt: "",
    },
  },
} as const;
