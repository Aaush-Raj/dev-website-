/**
 * LURNYSAATHI PAGE CONTENT
 * ---------------------------------------------------------------------------
 * Copy for the LurnySaathi product page at /platform/saathi.
 *
 * Section 1 is defined below; further sections are added here as their designs
 * land. Copy is verbatim from the supplied
 * "LURNYSAATHI webpage text.txt" — including its en-dashes and the British
 * "Practise", which is the product's own spelling.
 */

export const saathi = {
  /** Page-level metadata, consumed by the route's `generateMetadata`. */
  meta: {
    title: "LurnySaathi — Personal AI Companion",
    description:
      "LurnySaathi brings learning, capability, conversation and business intelligence into one private, multilingual companion for every employee.",
    path: "/platform/saathi",
  },

  hero: {
    /**
     * The eyebrow is one string with a separator the design sets in coral.
     * Split so the bullet can be styled and hidden from screen readers, which
     * would otherwise announce it as "bullet".
     */
    eyebrow: { product: "LurnySaathi", label: "Personal AI companion" },

    /** Split so the line breaks land where the design puts them on lg+. */
    headline: ["An expert beside", "every employee.", "Every working day."],

    description:
      "LurnySaathi brings learning, capability, conversation and business intelligence into one private, multilingual companion—helping every employee know what to do, learn, say, practise and improve.",

    actions: {
      primary: { label: "Book a demo", href: "/demo" },
      secondary: { label: "See Saathi in action", href: "#saathi-in-action" },
    },

    /** The line beside the outlined heart under the actions. */
    footnote: "Friend. Philosopher. Guide.",

    /**
     * The five capability pills in the left of the illustration. Each one
     * draws a light thread to the glowing node on the phone's left edge —
     * the design's way of saying every capability converges on Saathi.
     *
     * `icon` keys into the map in SaathiCapabilityIcons.tsx.
     */
    capabilities: [
      { label: "Learn", icon: "learn" },
      { label: "Work", icon: "work" },
      { label: "Practise", icon: "practise" },
      { label: "Communicate", icon: "communicate" },
      { label: "Improve", icon: "improve" },
    ],

    /**
     * The photograph behind the phone.
     *
     * PROVENANCE: derived from designs/.../womeninbg.png, which despite its
     * name had NO alpha channel — its "transparent" background was an opaque
     * light checkerboard painted into the pixels. It was keyed to real
     * transparency by scripts/build-saathi-woman.cjs; see that file for the
     * thresholds and why the edge is treated the way it is.
     */
    photo: {
      src: "/assets/images/saathi/saathi-woman.webp",
      alt: "An employee reading her LurnySaathi companion on her phone.",
      width: 567,
      height: 925,
    },

    /**
     * The phone screen. Drawn in markup rather than shipped as an image so it
     * stays sharp at every density — see SaathiPhone.tsx.
     */
    phone: {
      statusTime: "9:41",
      greeting: ["Good morning,", "Ananya"],
      composer: "Ask Saathi anything",
      listLabel: "Today with Saathi",

      /**
       * The three cards. The middle one is the "active" card in the design —
       * a filled violet panel with a progress bar rather than an outline.
       */
      cards: [
        {
          icon: "calendar",
          title: "2 priorities today",
          lines: ["Review your top tasks", "and focus areas."],
        },
        {
          icon: "book",
          title: "Continue learning",
          lines: ["Leading with empathy", "in customer moments"],
          progress: { label: "60% complete", percent: 60 },
        },
        {
          icon: "people",
          title: "Practise a customer conversation",
          lines: ["Build confidence with", "real-life scenarios"],
        },
      ],
    },
  },

  /**
   * SECTION 2 — the problem.
   *
   * Rendered by the shared ProblemSection, as on the other four product pages.
   * LurnySaathi's design differs only in adding the pastel ground and the
   * journey diagram; both are opt-in props on that component.
   */
  problem: {
    eyebrow: "The problem LurnySaathi solves",

    /** Split so the lines break where the design breaks them on lg+. */
    headline: [
      "When every step lives separately,",
      "capability never becomes",
      "a continuous journey.",
    ],

    description:
      "Employees are assessed in one place, learn in another, practise somewhere else and perform in the real world—with little connection between these experiences. They complete activities, but rarely see where they stand, what to improve or what to do next.",

    /** The design sets the tail of this line in the brand violet. */
    kicker: {
      lead: "The employee is left to",
      emphasis: "connect the dots.",
    },

    /** The diagram under the statement — see SaathiJourney.tsx. */
    journey: {
      stages: ["Know", "Learn", "Practise", "Perform", "Improve"],
      /**
       * The diagram's accessible name. It carries the same point as the
       * surrounding copy, so this describes the shape rather than restating
       * the argument.
       */
      label:
        "The capability journey: Know, Learn, Practise, Perform and Improve, with improvement feeding back to the start.",
    },

    items: [
      {
        title: "Employees cannot clearly see where they stand",
        description:
          "Role expectations, competency baselines, assessment results and development priorities are often scattered—or never made visible to the employee.",
      },
      {
        title: "Learning is not connected to individual gaps",
        description:
          "Everyone receives similar content, even though each employee has different strengths, capability gaps and performance needs.",
      },
      {
        title: "Practice and real-world performance remain disconnected",
        description:
          "Simulations may build confidence, but what happens in actual customer conversations rarely feeds back into the employee's development journey.",
      },
      {
        title: "Performance evidence does not close the learning loop",
        description:
          "A missed opportunity or capability gap may be identified, but it does not automatically lead the employee back to the right lesson, practice activity or coaching intervention.",
      },
    ],
  },

  /**
   * SECTION 4 — the capability loop.
   *
   * A statement on the left, the Saathi app in the middle, and the five
   * ecosystem stages on the right with an arrow running down them and looping
   * back to the top. See SaathiLoop.tsx.
   */
  loop: {
    eyebrow: "One continuous capability loop",

    /** Split so the lines break where the design breaks them on lg+. */
    headline: [
      "Every experience becomes",
      "the starting point for",
      "what comes next.",
    ],

    description:
      "LurnySaathi brings assessment, learning, practice and workplace performance into one continuous experience—always helping the employee identify the next best action.",

    /**
     * The two closing lines. The design sets the tail of the second in coral,
     * so it is split the way the hero's kicker is.
     */
    closing: {
      first: "One employee experience.",
      lead: "The intelligence of the",
      emphasis: "entire Lurny ecosystem.",
    },

    /**
     * The phone in the middle column. Drawn in markup rather than shipped —
     * see SaathiLoopPhone.tsx.
     */
    phone: {
      greeting: ["Good morning,", "Ananya"],
      actionLabel: "Your next best action",
      action: {
        title: ["Practise handling", "a rate objection"],
        duration: "12 min",
        cta: "Start practice",
      },
      progress: { label: "Capability progress", percent: 72 },
    },

    /**
     * The five stages. `engine` is the Lurny product each one runs on, which
     * the design sets in a smaller grey caps line under the title.
     *
     * `icon` keys into the map in SaathiIcons.tsx.
     */
    stages: [
      { icon: "person", title: "Know where you stand", engine: "LurnyPulse" },
      { icon: "book", title: "Learn what matters", engine: "LurnyKxP" },
      { icon: "chat", title: "Practise before it matters", engine: "LurnySim" },
      { icon: "mic", title: "Perform in the real world", engine: "LurnyPitch" },
      { icon: "chart", title: "Improve continuously", engine: "Pulse + KxP" },
    ],
  },

  /**
   * SECTION 5 — the loop in action.
   *
   * The abstract loop of the previous section, played out as one employee's
   * story: Pulse finds Ananya's gap, Saathi routes her through learning and
   * practice, and evidence from a real conversation sets what comes next.
   *
   * The panel on the right is a product illustration, not live data — see
   * SaathiJourneyPanel.tsx.
   */
  story: {
    eyebrow: "The loop in action",

    /** Split so the lines break where the design breaks them on lg+. */
    headline: ["One gap.", "One guided journey", "to improvement."],

    description:
      "Ananya is a Relationship Manager. Pulse identifies a capability gap, Saathi guides her through the right learning and practice, and evidence from her real customer conversations determines what comes next.",

    /** The pulled-out closing line, set beside a coral rule in the design. */
    pullquote:
      "Saathi does not simply show employees content. It helps them move from where they are to where their role requires them to be.",

    panel: {
      title: "Ananya's improvement journey",

      employee: {
        name: "Ananya Menon",
        role: "Relationship Manager",
        capability: "Capability: Handling objections",
      },

      /**
       * The five steps. Each carries the engine that produced it and its own
       * shape of evidence:
       *
       * - `bars`   the two-bar gap readout on step 01
       * - `action` a button, which the design styles coral on 02 and near-black
       *            on 05 — the difference between "start this now" and "here is
       *            what comes next"
       *
       * `icon` keys into the map in SaathiIcons.tsx.
       */
      steps: [
        {
          icon: "signal",
          engine: "LurnyPulse",
          title: "Gap detected",
          meta: "Current Pulse 58%  ·  Role baseline 75%",
          bars: [
            { label: "Current Pulse", percent: 58, tone: "coral" },
            { label: "Role baseline", percent: 75, tone: "indigo" },
          ],
        },
        {
          icon: "book",
          engine: "LurnyKxP",
          title: "Recommended lurny",
          meta: "Handling rate objections  ·  7 min",
          action: { label: "Start lurny", tone: "coral" },
        },
        {
          icon: "chat",
          engine: "LurnySim",
          title: "Practice completed",
          meta: "Simulation score 72%  ·  +14 points",
        },
        {
          icon: "mic",
          engine: "LurnyPitch",
          title: "Conversation analysed",
          meta: "Live score 68%  ·  Gap: Value framing",
        },
        {
          icon: "chart",
          engine: "LurnySaathi",
          title: "Next best action",
          meta: "Practise value framing",
          action: { label: "Start practice", tone: "dark" },
        },
      ],

      /** The summary bar closing the panel. */
      footer: {
        label: "Progress",
        value: "+10%",
        note: "Evidence from learning, practice and performance",
      },
    },
  },
} as const;
