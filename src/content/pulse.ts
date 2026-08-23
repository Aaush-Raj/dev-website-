/**
 * LURNYPULSE PAGE CONTENT
 * ---------------------------------------------------------------------------
 * Copy for the LurnyPulse product page at /platform/pulse.
 *
 * Sections 1 to 4 are defined below, in page order; further sections are added
 * here as their designs land.
 *
 * A note on the hero's `dashboard` block: unlike the LurnyPitch page, whose
 * product shots are real exported images, this page's dashboard is DRAWN — the
 * radar chart, the competency bars and the two floating cards are all markup
 * and CSS. So the numbers below are not captions describing a picture; they
 * are the data the illustration is rendered from. Change a score here and the
 * radar polygon moves.
 *
 * The figures are illustrative product copy, not a real customer's results.
 */

export const pulse = {
  /** Page-level metadata, consumed by the route's `metadata` export. */
  meta: {
    title: "LurnyPulse — Capability Intelligence",
    description:
      "Define the capability each role needs, assess it through real evidence, and give every employee a clear path to readiness.",
    path: "/platform/pulse",
  },

  hero: {
    /**
     * One eyebrow, split at the separator the design sets in violet, so the
     * bullet can be styled and hidden from screen readers — which would
     * otherwise announce it as "bullet".
     */
    eyebrow: { product: "LurnyPulse", label: "Capability intelligence" },

    /** Split so the lines break where the design breaks them on lg+. */
    headline: [
      "Know where capability",
      "stands. Know what to",
      "improve next.",
    ] as const,

    description:
      "Define the capability each role needs, assess it through real evidence, and give every employee a clear path to readiness.",

    actions: {
      primary: { label: "See LurnyPulse in action", href: "/demo" },
      secondary: { label: "Explore the framework", href: "/contact" },
    },

    /** The three feature notes under the buttons, each with an icon. */
    features: [
      { icon: "framework", label: "Role frameworks" },
      { icon: "bubble", label: "Conversational assessment" },
      { icon: "growth", label: "GrowthPath" },
    ],

    /**
     * THE DASHBOARD ILLUSTRATION
     *
     * Everything below drives the drawn product mock. It is decorative — the
     * whole illustration is aria-hidden, because a screen reader reading out a
     * fictional employee's competency scores would be reading fiction as fact.
     * The copy above already states what the product does.
     */
    dashboard: {
      /** The main card: role readiness, shown as a radar chart. */
      radar: {
        title: "Branch Manager readiness",
        /** The design's select control. Inert — it is a drawing of one. */
        filter: "Overall readiness",

        /** The centre disc. */
        overall: { score: 82, outOf: 100 },

        /**
         * The five axes, in clockwise order starting at the top. Order is
         * significant: the polygon is plotted from this array, so reordering
         * it rotates the chart.
         *
         * `max` is the axis maximum for every spoke — the rings are drawn at
         * 20/40/60/80/100, matching the design's labels.
         */
        max: 100,
        rings: [20, 40, 60, 80, 100] as const,

        axes: [
          { label: "Branch Operations Management", score: 90 },
          { label: "Portfolio & Collections Management", score: 80 },
          { label: "Sales Planning & Local Market Development", score: 80 },
          { label: "Team Supervision & Capability Building", score: 80 },
        ],

        /**
         * The fifth axis. It sits between "Portfolio & Collections" and
         * "Team Supervision" in the design's plot but its label is placed
         * outside the card, to the right — so it is listed separately and the
         * component splices it into position rather than trying to encode
         * "label lives elsewhere" as a flag on the axis.
         */
        outsideAxis: { label: "Gold Loan & Product Knowledge", score: 80 },
      },

      /** The floating card, top right: the same scores as ranked bars. */
      competencies: {
        title: "5 key competencies",
        items: [
          { label: "Branch Operations Management", score: 90 },
          { label: "Team Supervision & Capability Building", score: 80 },
          { label: "Gold Loan & Product Knowledge", score: 80 },
          { label: "Portfolio & Collections Management", score: 80 },
          { label: "Sales Planning & Local Market Dev.", score: 80 },
        ],
        outOf: 100,
      },

      /** The floating card, bottom right: the recommended action. */
      nextStep: {
        title: "Recommended next step",
        skill: "Strengthen Risk Identification",
        scoreLabel: "Current score",
        score: 38,
        outOf: 100,
        level: "L3 Advanced",
        description:
          "Build practical skills to identify, assess, and mitigate risks across lending and collections.",
        action: "View Skill Profile",
      },
    },
  },

  /**
   * SECTION 2 — the problem LurnyPulse solves.
   *
   * Rendered by the shared ProblemSection (components/sections/shared), which
   * the LurnyPitch page uses too. `problem` is in the ProblemContent shape
   * that component expects.
   */
  problem: {
    eyebrow: "The problem Pulse solves",

    /** Split so the lines break where the design breaks them on lg+. */
    headline: [
      "When \u2018good performance\u2019",
      "is undefined, improvement",
      "becomes guesswork.",
    ] as const,

    description:
      "Without a shared competency framework, learning, coaching and performance decisions move in different directions.",

    items: [
      {
        title: "Training without role clarity",
        description:
          "Teams complete learning, but no one can show whether it builds the capability the role actually needs.",
      },
      {
        title: "Managers coaching by instinct",
        description:
          "Coaching depends on individual judgement rather than a clear, consistent standard of performance.",
      },
      {
        title: "Skills gaps discovered too late",
        description:
          "Capability risks appear only after customer experience, compliance or business results have suffered.",
      },
      {
        title: "Learning metrics with no performance link",
        description:
          "Completions and scores rise, while leaders still cannot see readiness or business impact.",
      },
    ],
  },

  /**
   * SECTION 3 — how LurnyPulse works.
   *
   * A photographic band with a drawn product modal over it, then four numbered
   * steps along the foot.
   *
   * As in the hero, the modal is DRAWN rather than shipped as a screenshot, so
   * `modal` below is the data it renders from, not a caption describing a
   * picture. It is decorative and aria-hidden — the steps underneath carry the
   * meaning for assistive technology.
   */
  works: {
    eyebrow: "How LurnyPulse works",

    /** Split so the lines break where the design breaks them on lg+. */
    headline: ["From role expectations", "to a clear growth path."] as const,

    description:
      "Turn every role into a measurable capability framework, then give each person a focused next step.",

    action: { label: "Explore the Pulse journey", href: "/demo" },

    /**
     * The background photograph.
     *
     * The supplied file already carries the violet grade and fades to the
     * section's own lavender on the left, so it is placed as a right-anchored
     * layer rather than being tinted in CSS — the fade is what lets the copy
     * sit over it legibly.
     */
    image: {
      src: "/assets/images/pulse/pulse-workplace.webp",
      /**
       * Decorative: the photograph sets a mood and shows nothing the copy does
       * not already say, so it is hidden from assistive technology with an
       * empty alt rather than described.
       */
      alt: "",
      width: 1600,
      height: 854,
    },

    /** The drawn product modal. Decorative; see the note above. */
    modal: {
      /** Left panel — one behaviour, expanded. */
      behaviour: {
        tag: "Behaviors",
        title: "Resolves customer complaints efficiently",
        depth: { label: "Required depth", score: 8, outOf: 10 },
        meaning: {
          label: "What this means",
          text: "Addresses customer issues quickly and effectively, minimizing customer wait times and ensuring a positive outcome. This reflects a commitment to customer satisfaction.",
        },
        good: {
          label: "What good looks like",
          items: [
            "Taking immediate ownership of customer problems",
            "Streamlining the complaint resolution process",
            "Providing clear and concise communication of steps taken",
            "Leveraging available resources to speed up resolution",
            "Ensuring timely closure of complaint cases in the system",
          ],
        },
        action: "Create a Lurny",
      },

      /** Right panel — the competency, its level, and the behaviour dial. */
      competency: {
        title: "Branch Operations Management",
        levels: ["L1 Foundational", "L2 Intermediate", "L3 Advanced"],
        /** Index into `levels` of the one the design shows selected. */
        activeLevel: 2,
        requirement: "9/10 required",
        weight: { label: "Weight", value: 10 },
        levelNote: "Handles complex cases, guides others, owns outcomes",

        assessment: {
          label: "Assessment style",
          options: ["MCQ only", "Mixed", "Written"],
          /** Index into `options` of the one the design shows selected. */
          active: 1,
          note: "MCQs plus a few written answers — the balanced default",
        },

        /**
         * The radial dial. Each spoke is one behaviour scored out of 10, and
         * `tone` groups them into the design's three colour families —
         * reading clockwise from the top: amber, teal, then violet.
         *
         * Order is significant: the spokes are laid out from this array, so
         * reordering it rotates the dial.
         */
        dial: {
          centre: {
            score: 9,
            outOf: 10,
            label: "Required",
            level: "L3 Advanced",
          },
          max: 10,
          spokes: [
            { label: "Branch operations", score: 9, tone: "teal" },
            { label: "KYC and data accuracy", score: 9, tone: "teal" },
            { label: "Strong comms and la…", score: 8, tone: "teal" },
            { label: "Manual of instruct…", score: 8, tone: "teal" },
            { label: "Compliance and aud…", score: 9, tone: "teal" },
            { label: "Handles objections…", score: 9, tone: "violet" },
            { label: "Detailed followup…", score: 9, tone: "violet" },
            { label: "Why this matters", score: 8, tone: "violet" },
            { label: "Resolves customer c…", score: 8, tone: "violet" },
            { label: "Checks documented…", score: 9, tone: "amber" },
            { label: "Ensures adherence…", score: 8, tone: "amber" },
            { label: "Escalates appropriately", score: 8, tone: "amber" },
            { label: "Maintains compliance", score: 10, tone: "amber" },
            { label: "Customer focus", score: 8, tone: "amber" },
          ],
        },
      },
    },

    /**
     * The four steps along the foot. Ordered, so they render as an <ol> with
     * the numerals coming from the data rather than a CSS counter.
     *
     * `icon` keys the drawn glyph in PulseWorksIcons — the supplied PNGs were
     * 106px line drawings, which are sharper, tintable and animatable as SVG.
     */
    steps: [
      {
        icon: "document",
        title: "Define the role",
        description:
          "Translate role expectations into a clear capability framework.",
      },
      {
        icon: "assess",
        title: "Assess readiness",
        description:
          "Measure current capability across each area against role expectations.",
      },
      {
        icon: "target",
        title: "Identify gaps",
        description: "Pinpoint priority gaps that matter most to role success.",
      },
      {
        icon: "growth",
        title: "Guide improvement",
        description:
          "Recommend focused next steps and track progress over time.",
      },
    ],
  },

  /**
   * SECTION 4 — role blueprints.
   *
   * A statement on the left, a hub-and-spoke diagram on the right: four facet
   * cards radiating from the role at the centre.
   *
   * The diagram is drawn — SVG connectors with HTML cards positioned over
   * them. Unlike the hero dashboard and the section 3 modal, it is NOT
   * aria-hidden: it is not imitating a screenshot, it is a genuine diagram
   * whose four facets are the substance of the section. So it stays readable,
   * and the connectors alone are hidden as decoration.
   */
  blueprints: {
    eyebrow: "Role blueprints",

    /** Split so the lines break where the design breaks them on lg+. */
    headline: ["Define what", "good performance", "looks like."] as const,

    description: "Create a measurable role blueprint for every critical role.",

    action: { label: "Explore role frameworks", href: "/demo" },

    diagram: {
      title: "Credit Manager role blueprint",

      /** The hub. Split so the two words stack inside the circle. */
      role: ["Credit", "Manager"] as const,

      /**
       * The four facets, in the design's reading order: top-left, top-right,
       * bottom-left, bottom-right. Order is significant — the component lays
       * them out from this array and draws a connector to each.
       *
       * `icon` keys the drawn glyph in PulseBlueprintIcons.
       */
      facets: [
        {
          icon: "mind",
          title: "Competencies",
          items: ["Risk judgment", "Stakeholder influence"],
        },
        {
          icon: "notebook",
          title: "KSB anchors",
          items: ["Credit risk assessment", "Portfolio management"],
        },
        {
          icon: "bars",
          title: "Proficiency levels",
          items: ["Developing", "Expert"],
        },
        {
          icon: "clipboard",
          title: "Expected evidence",
          items: ["Decision examples", "Outcome impact"],
        },
      ],

      footnote: "A shared, measurable standard for every role.",
    },
  },
} as const;
