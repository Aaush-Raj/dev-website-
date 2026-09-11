/**
 * COMPLIANCE READINESS PAGE CONTENT
 * ---------------------------------------------------------------------------
 * Copy for /solutions/compliance — one of the "solutions by business need"
 * detail pages, alongside /solutions/frontline, /solutions/sales-enablement
 * and /solutions/onboarding.
 *
 * Copy is verbatim from the supplied "05_Hero_Text.txt" and the card text in
 * the section design. Section 1 is defined below; the remaining sections are
 * added here as their designs are built.
 */

export const compliance = {
  /** Page-level metadata, consumed by the route's `metadata` export. */
  meta: {
    title: "Compliance Readiness — Policies Understood, People Prepared",
    description:
      "Turn SOPs, policies and regulatory requirements into accessible learning. Assess understanding, identify knowledge gaps and build the proficiency roles require.",
    path: "/solutions/compliance",
  },

  /**
   * SECTION 1 — the hero.
   *
   * The statement on the left over the scene's lavender wash, three engine
   * cards along the foot of the office to the right.
   */
  hero: {
    eyebrow: "Compliance readiness",

    /**
     * THREE lines rather than two sentences, because the design breaks
     * mid-sentence: "Policies / understood. / People prepared." Written out so
     * the break is drawn rather than left to the browser to find. The design
     * sets all of it in near-black — unlike the onboarding hero, there is no
     * colour change here.
     *
     * On small screens the lines run together into normal wrapped prose; see
     * ComplianceHero.
     */
    headline: ["Policies", "understood.", "People prepared."],

    description:
      "Turn SOPs, policies and regulatory requirements into accessible learning. Assess understanding, identify knowledge gaps and help your people build the proficiency their roles require.",

    actions: {
      primary: {
        label: "Explore compliance readiness",
        /* Points at a section further down this page, which is specified in
           the supplied copy but not yet built. */
        href: "#approach",
      },
      secondary: { label: "Talk to us", href: "/demo" },
    },

    /** The engine attribution under the actions. */
    poweredBy: {
      label: "Powered by",
      engines: ["LurnyMagic", "LurnyKxP", "LurnyPulse"],
    },

    /** The decorative footer text at the plate's bottom-left. */
    footnote: ["People ready", "for a brighter tomorrow"],

    /**
     * The glass-wall scene. It already carries the office, the woman, every
     * sticky note, the handwritten note and arrows, and the outcomes list —
     * only the three cards sit over it.
     */
    scene: {
      src: "/images/solutions/compliance/hero-scene.webp",
      /**
       * Decorative: it is a photograph of a manager mapping policies onto a
       * glass wall, and every claim the section makes is set in the copy and
       * the cards beside it.
       */
      alt: "",
      width: 1672,
      height: 941,
    },

    /**
     * THE THREE ENGINE CARDS
     * ---------------------------------------------------------------------
     * Built in markup rather than shipped as the supplied crops — see
     * scripts/build-compliance-hero.cjs for why.
     *
     * Each names one engine and shows what it does with a policy: LurnyMagic
     * turns it into a lesson, LurnyKxP checks it was understood, LurnyPulse
     * says where the gap still is. `body` selects which of the three panels
     * below the header the card draws.
     */
    cards: [
      {
        engine: "LurnyMagic",
        icon: "magic",
        action: "Learn",
        title: "Policy to microlesson",
        body: "transform",
        caption: "Turn your policies into engaging microlessons — in minutes.",
      },
      {
        engine: "LurnyKxP",
        icon: "kxp",
        action: "Check understanding",
        title: "What should you do next?",
        body: "question",
        /** The first is the approved answer, and the design marks it. */
        options: [
          "Follow the approved procedure",
          "Handle it informally",
          "Escalate to a colleague",
        ],
      },
      {
        engine: "LurnyPulse",
        icon: "pulse",
        action: "Identify gaps",
        body: "levels",
        /** Where this person is, and where the role requires them to be. */
        levels: { currentLabel: "Current", current: "L1", requiredLabel: "Required", required: "L2" },
        /** The three stops on the track; `current` marks the filled one. */
        track: { steps: 3, at: 0 },
        focus: { label: "Focus", value: "Escalation procedure" },
      },
    ],
  },

  /**
   * SECTION 2 — THE COMPLIANCE REALITY.
   *
   * A dark full-bleed band: the photograph fills it, three cards float over
   * the scene joined by dashed connectors, and a rail of four consequences
   * closes it off along the foot.
   *
   * ONLY THE PHOTOGRAPH SHIPS. The design pack also supplies the cards with
   * their dotted arrows as one 364KB PNG and the foot ribbon as another 163KB;
   * both are pure interface with their copy baked in as pixels, so they are
   * drawn in markup — the text stays selectable and translatable, and the
   * strokes stay crisp at any density.
   */
  reality: {
    eyebrow: "The compliance reality",

    /** Three lines, each owning its own row as the design sets them. */
    headline: ["Policies are shared.", "But is everyone", "ready to act?"],

    description:
      "Keeping people informed is only part of compliance readiness. Lengthy documents, routine assessments and unclear knowledge gaps can leave employees uncertain when a requirement meets a real situation.",

    /**
     * THE THREE GAPS
     * ---------------------------------------------------------------------
     * `tone` keys the card's stroke, icon and label colour; `position` is
     * measured from the design as a share of the band.
     *
     * READING ORDER IS THE CONNECTOR ORDER, not the visual top-to-bottom: the
     * chain runs bottom-left → centre → top-right, which is how the dashes
     * join them. Sorting these by position would break that sequence.
     */
    gaps: [
      {
        id: "policies",
        tone: "cyan",
        icon: "document",
        label: "Policies & SOPs",
        title: ["Updates keep arriving."],
        note: "Turning detailed requirements into clear, accessible learning takes time.",
        /**
         * Measured: L4.0%, width 23.5% of the band. The top is 61% rather
         * than the design's 50.5%: the description's foot measures 57.4% of
         * the band at this width, and at 50.5% this card sat ON that copy.
         */
        position: "left-[4%] top-[61%] w-[23.5%]",
      },
      {
        id: "assessments",
        tone: "red",
        icon: "checklist",
        label: "Assessments",
        title: ["A pass score tells part", "of the story."],
        note: "Recall questions may miss whether someone knows how to apply a requirement.",
        /** Measured: L32.5%, width 24.5%; dropped with the card beside it. */
        position: "left-[32.5%] top-[64.5%] w-[24.5%]",
      },
      {
        id: "readiness",
        tone: "amber",
        icon: "bars",
        label: "Role readiness",
        title: ["The next learning", "need stays unclear."],
        note: "Gaps between current knowledge and the proficiency a role requires remain difficult to pinpoint.",
        /** Measured: L75.5% T2.0%, width 24.5% of the band. */
        position: "left-[75.5%] top-[2%] w-[24.5%]",
      },
    ],

    /**
     * The consequences along the foot. Each reuses a card's icon and tone so
     * the rail reads as a summary of what floats above it — the fourth takes
     * the remaining violet, since it names a consequence the three cards imply
     * rather than state.
     */
    consequences: [
      { icon: "document", tone: "cyan", label: "Dense content" },
      { icon: "checklist", tone: "red", label: "Understanding unverified" },
      { icon: "bars", tone: "violet", label: "Knowledge gaps hidden" },
      { icon: "stack", tone: "amber", label: "Evidence scattered" },
    ],

    /**
     * The photograph. Decorative: it is a man walking out of an office at dusk
     * reading his phone with a revised SOP under his arm, and every claim the
     * section makes is set in the copy and the cards over it.
     */
    scene: {
      src: "/images/solutions/compliance/reality-scene.webp",
      alt: "",
    },
  },

  /**
   * SECTION 3 — LURNYMAGIC.
   *
   * The statement and three benefits on the left; on the right a policy
   * document feeding the LurnyMagic workspace, which in turn fans out into the
   * four formats it can produce. Everything except the gradient is markup —
   * see ComplianceMagic.
   */
  magic: {
    eyebrow: "Make compliance easier to learn",

    /** Split so the lines break where the design breaks them on lg+. */
    headline: ["Complex requirements.", "Clear learning", "experiences."],

    description:
      "Turn SOPs, policies and regulatory content into courses, microlessons, videos and podcasts with LurnyMagic. Help your people understand what matters through formats that fit their working day.",

    /** The three steps under the description. `icon` selects each mark. */
    benefits: [
      {
        title: "Start with your content",
        body: "Bring in the policies, SOPs and source documents your organisation uses.",
        icon: "document",
      },
      {
        title: "Choose the learning format",
        body: "Build structured courses, focused microlessons, videos or podcasts.",
        icon: "formats",
      },
      {
        title: "Review and publish",
        body: "Check the content against your requirements, refine it and make it available to your people.",
        icon: "review",
      },
    ],

    /** The engine attribution closing the left column. */
    poweredBy: "Powered by LurnyMagic",

    /** The gradient the section sits on. */
    backdrop: {
      src: "/images/solutions/compliance/magic-backdrop.webp",
      alt: "",
      width: 1672,
      height: 941,
    },

    /** The source document the flow starts from. */
    document: {
      badge: "PDF",
      title: ["Customer Data", "Handling Policy"],
    },

    /**
     * The LurnyMagic workspace the document feeds into: the draft it is
     * becoming, its four sections, and the action that closes it.
     */
    workspace: {
      engine: "LurnyMagic",
      tag: "Creation workspace",
      title: "Handling customer data",
      status: "Draft",
      /* The ordinal is each item's position rather than stored copy, so the
         two cannot drift apart. */
      sections: [
        "Why data handling matters",
        "Everyday responsibilities",
        "Recognising an exception",
        "Check your understanding",
      ],
      action: "Review content",
    },

    /**
     * THE FOUR FORMATS
     * ---------------------------------------------------------------------
     * What the one policy becomes. `body` selects which preview each card
     * draws beneath its shared header; `tone` is the header's colour, which
     * the design varies — mint for the microlesson, violet for the rest.
     */
    formats: [
      {
        label: "Course",
        icon: "course",
        tone: "violet",
        title: "Customer data essentials",
        body: "lessons",
        lessons: [
          "Understanding customer data",
          "Your responsibilities",
          "Putting it into practice",
        ],
      },
      {
        label: "Microlesson",
        icon: "microlesson",
        tone: "mint",
        title: "Sharing information responsibly",
        body: "excerpt",
      },
      {
        label: "Video",
        icon: "video",
        tone: "violet",
        body: "player",
        /** The title sits UNDER the frame on this card, unlike the others. */
        caption: "Policy in practice",
        duration: "02:36",
      },
      {
        label: "Podcast",
        icon: "podcast",
        tone: "violet",
        title: "Compliance, explained",
        body: "audio",
        elapsed: "0:00",
        duration: "12:48",
        speed: "1x",
      },
    ],

    /** The handwritten note at the section's right edge. */
    note: ["One policy.", "More ways to learn."],
  },

  /**
   * SECTION 4 — LURNYPULSE.
   *
   * The statement and three benefits on the left; on the right a radar chart
   * comparing assessed knowledge against the role's baseline, with two gap
   * cards below it joined by curved arrows. Everything except the gradient is
   * markup — see CompliancePulse.
   */
  pulse: {
    eyebrow: "Make knowledge gaps visible",

    /** Split so the lines break where the design breaks them on lg+. */
    headline: ["Know where they are.", "See what they", "need next."],

    description:
      "Use LurnyPulse to identify gaps between an employee\u2019s current compliance knowledge and the proficiency their role requires. Make the learning priorities for progression from L1 to L2 or L3 clear.",

    /** The three steps under the description. `icon` selects each mark. */
    benefits: [
      {
        title: "Establish the starting point",
        body: "Assess current knowledge against the expectations defined for the role.",
        icon: "target",
        tone: "teal",
      },
      {
        title: "Identify the specific gaps",
        body: "See which topics need strengthening to reach the required proficiency level.",
        icon: "bars",
        tone: "violet",
      },
      {
        title: "Guide the next learning step",
        body: "Use the identified gaps to focus development and reassess progress.",
        icon: "arrow",
        tone: "amber",
      },
    ],

    /** The engine attribution closing the left column. */
    poweredBy: "Powered by LurnyPulse",

    /** The gradient the section sits on. */
    backdrop: {
      src: "/images/solutions/compliance/pulse-backdrop.webp",
      alt: "",
      width: 1671,
      height: 941,
    },

    /**
     * THE RADAR PANEL
     * ---------------------------------------------------------------------
     * Five axes on four rings (L1 at the centre out to L4 at the rim).
     *
     * `baseline` is what the role requires and `current` what was assessed —
     * the two polygons the chart draws. Axes are listed CLOCKWISE FROM THE
     * TOP, which is the order the chart plots them in, so the array order is
     * the geometry rather than a reading order.
     *
     * `gap` marks an axis the design calls out with a numbered pill; the
     * number is the pill's position in `gaps` below rather than stored twice.
     */
    panel: {
      engine: "LurnyPulse",
      tag: "Example profile",
      title: "Compliance knowledge profile",

      /** The chart's key, and the note under it. */
      legend: {
        baseline: "Role baseline",
        current: "Current level",
        notes: ["Baseline = role expectation", "Current = assessed level"],
      },

      /** The rings, innermost first — the labels up the top axis. */
      rings: ["L1", "L2", "L3", "L4"],

      axes: [
        { label: ["Policy knowledge"], baseline: 3, current: 2 },
        { label: ["Incident", "reporting"], baseline: 3, current: 2 },
        {
          label: ["Documentation", "requirements"],
          baseline: 3,
          current: 2,
          gap: "documentation",
        },
        {
          label: ["Escalation", "procedures"],
          baseline: 3,
          current: 1,
          gap: "escalation",
        },
        { label: ["Data", "handling"], baseline: 3, current: 2 },
      ],
    },

    /**
     * The two gap cards below the panel.
     *
     * `id` ties each to the axis it marks, so the pill on the chart and the
     * card below it cannot drift apart. `tone` keys the card's stroke, pill
     * and gap colour, and the colour of the arrow that runs down to it.
     */
    gaps: [
      {
        id: "escalation",
        tone: "red",
        title: "Escalation procedures",
        baseline: "Baseline: L3",
        current: "Current: L1",
        gap: "Gap: 2 levels",
        body: "Strengthen knowledge of when to escalate, whom to involve and what information to provide.",
      },
      {
        id: "documentation",
        tone: "amber",
        title: "Documentation requirements",
        baseline: "Baseline: L3",
        current: "Current: L2",
        gap: "Gap: 1 level",
        body: "Strengthen understanding of required evidence and recording standards.",
      },
    ],

    /** The handwritten note between the panel and the cards. */
    note: "See the gap. Know what comes next.",
  },
} as const;
