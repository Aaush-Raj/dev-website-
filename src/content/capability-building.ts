/**
 * CAPABILITY BUILDING CONTENT
 * ---------------------------------------------------------------------------
 * Copy for the solution page at /solutions/capability-building.
 *
 * The Solutions index has linked to this route since it was built — see the
 * `capability` card in content/solutions-page.ts — so this fills in a page that
 * was already being pointed at.
 *
 * Copy is transcribed from capability-building-hero-text.txt as supplied,
 * including its em dash and British spellings.
 */

export const capabilityBuilding = {
  /** Page-level metadata, consumed by the route's `metadata` export. */
  meta: {
    title: "Capability Building",
    description:
      "Define what each role requires, understand where your people stand, and turn capability gaps into personalised GrowthPaths — with LurnyPulse and KxP.",
    path: "/solutions/capability-building",
  },

  hero: {
    eyebrow: "Capability building",

    /**
     * The headline splits across three lines in the design, with the middle
     * word set in violet. It is an array so the component can colour that one
     * line without parsing a string or hard-coding the word in markup.
     */
    headline: [
      { text: "Build the" },
      { text: "capabilities", accent: true },
      { text: "your business needs." },
    ],

    description:
      "Define what each role requires, understand where your people stand, and turn capability gaps into personalised GrowthPaths—with LurnyPulse and KxP.",

    actions: {
      primary: { label: "Explore capability building", href: "#how-it-works" },
      /**
       * TODO(routes): /demo does not exist yet, but the nav's "Book a Demo"
       * and the site-wide footer CTA both already point there.
       */
      secondary: { label: "Talk to us", href: "/demo" },
    },

    /** The attribution line beneath the buttons. */
    footnote: "Powered by Pulse and KxP",

    /**
     * The photograph, with its leader lines and handwritten note.
     *
     * THE LINES AND THE NOTE SHIP WITH THE PHOTO rather than being drawn. They
     * are struck onto the image itself in the design — each one starts at a
     * panel edge and lands at a specific point in the scene, on the laptop or
     * beside the subject's head — so reproducing them in markup would mean
     * re-deriving three curves against a photograph that can crop differently
     * at every width. The panels are positioned to meet the line ends instead.
     *
     * `alt` is empty because the image is decorative: the headline and the
     * panels beside it already carry the meaning, and the handwritten note is
     * repeated as real text in `annotation` below.
     */
    scene: {
      src: "/assets/images/capability-building/hero-scene.webp",
      alt: "",
    },

    /**
     * The handwritten note, as text. It is baked into the photograph, so this
     * copy is what assistive technology reads instead — visually hidden rather
     * than rendered twice.
     */
    annotation: "A clearer path to growth.",

    /**
     * The three product panels floating over the photograph.
     *
     * DRAWN FROM THIS CONTENT, not shipped as the flat PNGs the design pack
     * supplies. Each is pure interface — labels, ticks, progress bars and
     * numbered steps — so as images they would ship three more files, blur on
     * high-density screens, stay untranslatable and unreadable to screen
     * readers, and pin the type at whatever size the export happened to use.
     *
     * `kind` selects the body layout: a checklist, a pair of comparison bars,
     * or a numbered path. Positions are measured from the design and given in
     * the scene box's own percentages, so they hold as it scales.
     */
    panels: [
      {
        id: "role",
        kind: "checks",
        brand: "Pulse",
        title: "Role expectations",
        subtitle: "Team Leader",
        items: ["Coaching", "Decision-making", "Team communication"],
        /** Measured: L41.4% T5.0%, width 17% of the frame. */
        position: "left-[-15%] top-[-3%] w-[38.5%]",
      },
      {
        id: "profile",
        kind: "bars",
        brand: "Pulse",
        title: "Your capability profile",
        /** The two series the bars compare. */
        legend: [
          { label: "Current", tone: "current" },
          { label: "Expected", tone: "expected" },
        ],
        /**
         * `current` and `expected` are percentages of the track. Expected is
         * always the longer of the two — the gap between them is the point of
         * the panel, so the numbers must never invert.
         */
        rows: [
          { label: "Coaching", current: 52, expected: 82 },
          { label: "Decisions", current: 44, expected: 74 },
          { label: "Communication", current: 66, expected: 88 },
        ],
        /** Measured: L78.3% T9.4%, width 19.4% of the frame. */
        position: "right-[-11%] top-[2%] w-[44%]",
      },
      {
        id: "growthpath",
        kind: "steps",
        brand: "KxP",
        title: "Your GrowthPath",
        /**
         * The first step is complete and shows a tick; the rest are numbered.
         * `done` is what the component keys that off.
         */
        steps: [
          { verb: "Learn", label: "Coaching essentials", done: true },
          { verb: "Apply", label: "Give useful feedback" },
          { verb: "Reflect", label: "Check your progress" },
        ],
        /** Measured: L77.3% T53.2%, width 20.4% of the frame. */
        position: "right-[-11%] bottom-[-2%] w-[46%]",
      },
    ],
  },

  /**
   * Section 2: the problem statement.
   *
   * A dark full-bleed band — the photograph fills it, three cards float over
   * the scene joined by dashed connectors, and a rail of four consequences
   * closes it off along the foot.
   *
   * THE CONNECTORS RUN BACKWARDS ON PURPOSE. Each dashed line carries an
   * arrowhead pointing at the PREVIOUS card, not the next: learning points back
   * at the assessment, the assessment back at the expectations. That is the
   * argument the section is making — the three stages exist but never feed
   * forward into one another — so the direction is the content, not decoration.
   */
  reality: {
    eyebrow: "The capability building reality",
    headline:
      "A competency framework is only useful when it helps people grow.",
    description:
      "Role expectations, assessments and learning often sit apart—leaving people without a clear path from gaps to growth.",

    /**
     * The three stages, in the order the eye reads them.
     *
     * `tone` keys the card's stroke, icon and label colour; `position` is
     * measured from the design as a share of the scene box. `icon` names a
     * glyph in CapabilityIcons.
     */
    stages: [
      {
        id: "expectations",
        tone: "teal",
        icon: "document",
        label: "Role expectations",
        title: "Defined in a document",
        note: "What good looks like stays on paper.",
        /** Measured: L3.7% T36.1%, width 30.1% of the frame. */
        position: "left-[3.7%] top-[1rem] w-[30%]",
      },
      {
        id: "assessment",
        tone: "red",
        icon: "bars",
        label: "Proficiency assessment",
        title: "Gaps are identified",
        note: "The next development step is unclear.",
        /** Measured: L30.9% T54.7%, width 31.6% of the frame. */
        position: "left-[31%] top-[9.5rem] w-[31.5%]",
      },
      {
        id: "learning",
        tone: "amber",
        icon: "cap",
        label: "Learning & development",
        title: "Courses are assigned",
        note: "Learning is not tied to individual gaps.",
        /** Measured: L67.4% T18.0%, width 29.3% of the frame. */
        position: "right-[3.3%] top-[-17rem] w-[29.5%]",
      },
    ],

    /**
     * The consequences along the foot. Each reuses one of the stage icons and
     * its tone, so the rail reads as a summary of the three cards above it
     * rather than as four unrelated points — the fourth is the compound result,
     * which is why it takes the violet that the section eyebrow uses.
     */
    consequences: [
      { icon: "document", tone: "teal", label: "Expectations stay static" },
      { icon: "bars", tone: "red", label: "Gaps lack follow-through" },
      { icon: "cap", tone: "violet", label: "Learning stays generic" },
      { icon: "trend", tone: "amber", label: "Progress is hard to see" },
    ],

    /**
     * The photograph behind it all. It ships because it is a photograph; the
     * cards and connectors over it are drawn, so the supplied overlay PNG is
     * not used.
     *
     * `alt` is empty: the image is atmosphere, and every word in the scene is
     * already rendered as real text by the cards.
     */
    scene: {
      src: "/assets/images/capability-building/reality-scene.webp",
      alt: "",
    },
  },

  /**
   * Section 3: the connected journey.
   *
   * Five steps across the band, each a numbered header over a product card, and
   * a long dashed arrow curving back from the last step to the first — the loop
   * is the point, so it carries the handwritten note that names it.
   *
   * EVERY CARD IS DRAWN FROM THIS DATA. The design pack supplies all five as
   * flat PNGs (~90KB each, and only ~310px wide, so they would blur on any
   * high-density screen). They are interface: dot ratings, a radar chart, a
   * checklist, a media tile and before/after bars. Only the video card's
   * photograph ships, because it is a photograph.
   *
   * `card.kind` selects the body layout. The kinds are deliberately specific
   * rather than one generic list — each step shows a different shape of
   * evidence, and flattening them would lose exactly what the section argues.
   */
  journey: {
    eyebrow: "A connected capability journey",
    headline: "Turn role expectations into measurable capability.",
    description:
      "Connect clear expectations, meaningful assessments and focused learning in one continuous development journey.",

    /** The note beneath the return arrow, set in the handwriting face. */
    loopNote: "Keep building. Keep improving.",

    /**
     * The attribution bar. Two claims, split so each engine's name can carry
     * its own weight rather than being buried in a sentence.
     */
    attribution: [
      { engine: "LurnyPulse", rest: "defines and assesses." },
      { engine: "KxP", rest: "powers the learning journey." },
    ],

    steps: [
      {
        id: "define",
        number: "01",
        title: "Define",
        note: "Set role expectations",
        card: {
          kind: "ratings",
          title: "Role profile",
          subtitle: "Product Manager",
          /**
           * `filled` of five dots. The level names are the design's own, and
           * they must track the dot count — three of five reads "Developing",
           * four reads "Proficient".
           */
          rows: [
            {
              icon: "people",
              label: "Strategic Thinking",
              filled: 4,
              level: "Proficient",
            },
            {
              icon: "bars",
              label: "Stakeholder Management",
              filled: 4,
              level: "Proficient",
            },
            {
              icon: "gear",
              label: "Execution & Delivery",
              filled: 2,
              level: "Developing",
            },
          ],
        },
      },
      {
        id: "assess",
        number: "02",
        title: "Assess",
        note: "Understand current proficiency",
        card: {
          kind: "radar",
          title: "Capability assessment",
          /**
           * Five axes, clockwise from the top as the design draws them. Each
           * value is a share of the axis: `expectation` is the outer pentagon,
           * `current` the filled shape inside it. Current never exceeds
           * expectation — the gap between them is what the chart is for.
           */
          axes: [
            { label: "Strategic Thinking", current: 62, expectation: 100 },
            { label: "Customer Focus", current: 58, expectation: 100 },
            { label: "Execution", current: 70, expectation: 100 },
            { label: "Collaboration", current: 74, expectation: 100 },
            { label: "Influence", current: 52, expectation: 100 },
          ],
          legend: [
            { label: "Current proficiency", tone: "solid" },
            { label: "Role expectation", tone: "muted" },
          ],
        },
      },
      {
        id: "growthpaths",
        number: "03",
        title: "Build GrowthPaths",
        note: "Prioritise the right development",
        card: {
          kind: "path",
          title: "Your GrowthPath",
          /** The first is active; the rest are still ahead. */
          items: [
            {
              icon: "target",
              title: "1. Strengthen foundations",
              note: "Build core knowledge",
              active: true,
            },
            {
              icon: "people",
              title: "2. Develop in context",
              note: "Apply through practice",
            },
            {
              icon: "bars",
              title: "3. Demonstrate impact",
              note: "Show what you can do",
            },
          ],
        },
      },
      {
        id: "learn",
        number: "04",
        title: "Learn and apply",
        note: "Build knowledge. Put it to work.",
        card: {
          kind: "media",
          title: "Learning experience",
          /**
           * The thumbnail is the one photograph in this section, so it ships.
           * `alt` is empty: the title and duration beneath it say what it is.
           */
          media: {
            src: "/assets/images/capability-building/journey-video.webp",
            alt: "",
            title: "From insight to impact",
            meta: "Video • 12 min",
          },
          task: {
            icon: "document",
            title: "Practice task",
            note: "Apply the framework to a real work scenario",
          },
        },
      },
      {
        id: "reassess",
        number: "05",
        title: "Reassess",
        note: "See progress against the role",
        card: {
          kind: "progress",
          title: "Capability progress",
          columns: ["Before", "After"],
          /**
           * `after` is always greater than `before` — the card exists to show
           * movement, so the pair must never invert.
           */
          rows: [
            { label: "Strategic Thinking", before: 48, after: 82 },
            { label: "Stakeholder Management", before: 44, after: 76 },
            { label: "Execution & Delivery", before: 30, after: 68 },
          ],
        },
      },
    ],
  },

  /**
   * Section 4: defining role expectations.
   *
   * A slate band. Copy and three feature rows on the left; on the right two
   * overlapping product cards — a role's competency list, and the detail panel
   * for the one that is selected.
   *
   * NOTHING IN THIS SECTION SHIPS AS AN IMAGE. The design pack supplies the
   * two cards (240KB and 335KB), three icons and a 933KB background plate. All
   * of it is interface or geometry: the cards are lists and chips, the icons
   * are line art, and the plate is three arcs plus a handwritten note on flat
   * slate. Drawn, the section costs nothing to download and the note can
   * animate, which a baked plate could not.
   */
  role: {
    eyebrow: "Define role expectations",
    headline: "Give every role a clear standard for success.",
    description:
      "Translate role responsibilities into meaningful competencies, supported by knowledge, skills and behaviours. Define the proficiency each role needs, so assessment and development begin with clear expectations.",

    /** The three feature rows beneath the copy. */
    features: [
      {
        icon: "target",
        title: "Role-specific competencies",
        note: "Grounded in the work people actually do.",
      },
      {
        icon: "document",
        title: "Knowledge, skills and behaviours",
        note: "Make each competency concrete and observable.",
      },
      {
        icon: "bars",
        title: "Expected proficiency levels",
        note: "Set a clear baseline for assessment and growth.",
      },
    ],

    footnote: { prefix: "Powered by", engine: "LurnyPulse" },

    /** The annotation pointing at the cards, in the handwriting face. */
    annotation: "Make expectations visible.",

    /** The upper card: a role and its competencies. */
    profile: {
      title: "Role capability profile",
      subtitle: "Customer Service Executive",
      badge: "Role expectations",
      listLabel: "Core competencies",
      /**
       * `selected` marks the row the detail card below is showing. Exactly one
       * row carries it — the two cards are a single interaction, so a second
       * selection would make the pairing meaningless.
       */
      competencies: [
        {
          icon: "chat",
          label: "Customer communication",
          level: "L3",
          selected: true,
        },
        { icon: "book", label: "Product knowledge", level: "L3" },
        { icon: "gear", label: "Issue resolution", level: "L2" },
      ],
    },

    /** The lower card: the selected competency, broken down. */
    detail: {
      title: "Customer communication",
      subtitle: "What good looks like",
      /** Knowledge, Skills, Behaviours — the initial is the design's own mark. */
      facets: [
        {
          initial: "K",
          title: "Knowledge",
          note: "Understand service standards and escalation routes.",
        },
        {
          initial: "S",
          title: "Skills",
          note: "Ask clear questions and explain next steps.",
        },
        {
          initial: "B",
          title: "Behaviours",
          note: "Listen patiently and confirm understanding.",
        },
      ],
      proficiency: {
        label: "Expected proficiency",
        targetLabel: "Role target:",
        /** The scale, with the role's target marked. */
        levels: ["L1", "L2", "L3", "L4"],
        target: "L3",
      },
    },
  },

  /**
   * Section 5: Check your Pulse.
   *
   * Copy and three feature rows on the left, a photograph filling the band, and
   * two product cards floating over its right side — a scenario question and
   * the capability profile it feeds.
   *
   * ONLY THE PHOTOGRAPH SHIPS. The pack also supplies both cards (~127KB each)
   * and three icons; those are interface and line art, so they are drawn. The
   * plate keeps its handwritten annotation and arrow, which are struck onto the
   * image itself and land in the gap between the two cards — redrawing them
   * would mean re-deriving that curve against a photograph that crops
   * differently at every width.
   */
  pulse: {
    eyebrow: "Check your Pulse",
    headline: ["Discover your strengths.", "Know where to grow."],
    description:
      "With Check your Pulse, employees explore role-based questions and realistic scenarios, understand their capability profile, and identify where to focus their development.",

    features: [
      {
        icon: "document",
        title: "Explore realistic scenarios",
        note: "Reflect on the decisions your role demands.",
      },
      {
        icon: "bars",
        title: "Understand your capability",
        note: "See current proficiency against role expectations.",
      },
      {
        icon: "growth",
        title: "Find your development priorities",
        note: "Know which strengths to build on and gaps to address.",
      },
    ],

    footnote: { prefix: "Powered by", engine: "LurnyPulse" },

    /**
     * The photograph. Its annotation — "Understand your strengths. Find your
     * next step." — is baked in, so it is repeated as `annotation` for
     * assistive technology and hidden visually.
     */
    scene: {
      src: "/assets/images/capability-building/pulse-scene.webp",
      alt: "",
    },
    annotation: "Understand your strengths. Find your next step.",

    /** The upper card: one scenario question. */
    scenario: {
      title: "Check your Pulse",
      badge: "Scenario challenge",
      competency: "Customer communication",
      question:
        "A customer is unsure about the next step. How would you respond?",
      /**
       * `chosen` marks the answer the card shows selected. Exactly one option
       * carries it — the card is a snapshot of a taken decision, and a second
       * would make the radio group meaningless.
       */
      options: [
        { label: "Repeat the standard instructions" },
        { label: "Ask what is unclear, then explain", chosen: true },
      ],
      action: "Continue",
    },

    /** The lower card: the profile that scenario feeds. */
    profile: {
      title: "Your capability profile",
      subtitle: "Customer Service Executive",
      columns: ["Competency", "Current", "Role target"],
      /**
       * `current` below `target` is the gap the focus banner names. Communication
       * is the widest gap, which is why it is the one flagged.
       */
      rows: [
        { label: "Communication", current: "L2", target: "L3" },
        { label: "Product knowledge", current: "L3", target: "L3" },
        { label: "Issue resolution", current: "L1", target: "L2" },
      ],
      focus: { prefix: "Focus next:", label: "Communication" },
    },
  },
} as const;
