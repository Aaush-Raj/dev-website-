/**
 * LURNYFABRIC PAGE CONTENT
 * ---------------------------------------------------------------------------
 * Copy for /platform/fabric — the connective layer the engines run on.
 *
 * Copy is verbatim from the supplied "04_left_text.txt". Section 1 is defined
 * below; the remaining sections are added here as their designs are built.
 *
 * FABRIC IS NOT AN ENGINE. It is what the engines plug into, which is why the
 * hero diagram puts it at the centre with the capabilities above and the
 * customer's existing systems below — see the note on the nav entry in
 * content/navigation.ts.
 */

export const fabric = {
  /** Page-level metadata, consumed by the route's `metadata` export. */
  meta: {
    title: "LurnyFabric — One Connected Performance System",
    description:
      "Deploy the Lurny engine you need today, connect it securely to the systems you already use, and add further capabilities without rebuilding your enterprise foundation.",
    path: "/platform/fabric",
  },

  /**
   * SECTION 1 — the hero.
   *
   * Statement on the left; on the right a diagram with LurnyFabric at its
   * centre, three capability nodes above and five system nodes below, all
   * joined by curved connectors.
   */
  hero: {
    eyebrow: "The Lurny platform",
    headline: [
      "Start with one capability.",
      "Build a connected",
      "performance system.",
    ],
    description:
      "Deploy the Lurny engine you need today, connect it securely to the systems you already use, and add further capabilities without rebuilding your enterprise foundation.",

    actions: {
      primary: { label: "Explore the Platform", href: "/platform" },
      secondary: { label: "View the Engines", href: "/platform#engines" },
    },

    /** The three-part line beneath the buttons. */
    footnote: ["One Fabric", "Multiple Engines", "Purpose-built Suites"],

    /** The caption under the diagram. */
    caption: "Your systems. One connected experience.",

    /** The centre pill. */
    core: {
      name: "LurnyFabric",
      /** The three verbs, set as one spaced line in the design. */
      verbs: ["Connect", "Orchestrate", "Govern"],
    },

    /**
     * The nodes around the core.
     *
     * `row` says which side of the core a node sits on — "capability" above,
     * "system" below — and the component uses that to decide which way its
     * connector curves. `x` is the node's centre as a percentage of the
     * diagram box, measured from the design; the rows have different counts so
     * they cannot share one even distribution.
     *
     * MEASURED FROM THE DESIGN, not spaced by eye: the lower row's five nodes
     * sit at a ~10.7% pitch while the upper row's three sit at ~15.4%, so the
     * two rows are deliberately not aligned to each other.
     */
    nodes: [
      { id: "learn", row: "capability", label: "Learn", icon: "book", x: 21 },
      {
        id: "practice",
        row: "capability",
        label: "Practice",
        icon: "bolt",
        x: 50,
      },
      {
        id: "perform",
        row: "capability",
        label: "Perform",
        icon: "bars",
        x: 79,
      },

      { id: "lms", row: "system", label: "LMS", icon: "cap", x: 8 },
      { id: "hris", row: "system", label: "HRIS", icon: "people", x: 29 },
      {
        id: "m365",
        row: "system",
        label: "Microsoft 365",
        icon: "windows",
        x: 50,
      },
      { id: "crm", row: "system", label: "CRM", icon: "contacts", x: 71 },
      {
        id: "knowledge",
        row: "system",
        label: "Knowledge",
        icon: "stack",
        x: 92,
      },
    ],
  },

  /**
   * SECTION 2 — the three layers.
   *
   * Three light cards on the slate ground, each showing a different layer of
   * the platform: the foundation, the engines that run on it, and the suites
   * those engines compose into.
   *
   * EACH CARD'S INTERIOR IS A DIFFERENT SHAPE, deliberately — a feature grid,
   * an engine tree with connectors, and a list of suites. That is the section's
   * argument: the three layers are not three of the same thing. Flattening them
   * into one repeated card layout would lose it.
   */
  layers: {
    eyebrow: "The platform, explained",
    headline: [
      "One foundation. The capabilities you need.",
      "An experience built around your business.",
    ],
    description:
      "Lurny separates the shared enterprise foundation, the capabilities you deploy, and the experience your people use—so you can start focused and expand as your needs evolve.",

    /** The vertical note in the top-right corner of the ground. */
    aside: ["Simple", "today.", "Greater", "tomorrow."],

    /** The line above the foot rule. */
    closing: "Start with one engine. Add more on the same foundation.",

    /** The handwritten annotation beside it, with its curving arrow. */
    annotation: ["Built to grow", "with you"],

    /** The foot rail: the page's own name on the left, the values on the right. */
    footLeft: "LurnyFabric",
    footRight: ["People", "Possibility", "Progress"],

    cards: [
      {
        id: "foundation",
        number: "01",
        kind: "grid",
        label: "Foundation",
        title: "LurnyFabric",
        note: "Configure the foundation once.",
        /**
         * Six capabilities in a 2x2-per-row grid. `icon` names a glyph in
         * FabricLayerIcons.
         */
        items: [
          { icon: "identity", label: "Identity" },
          { icon: "link", label: "Integration" },
          { icon: "database", label: "Context" },
          { icon: "shield", label: "Governance" },
          { icon: "nodes", label: "Orchestration" },
          { icon: "cube", label: "Shared Services" },
        ],
      },
      {
        id: "capabilities",
        number: "02",
        kind: "tree",
        label: "Capabilities",
        title: "Composable Engines",
        note: "Activate the capabilities you need.",
        /**
         * Five engines: three on the top row, two below, joined by a small
         * bus that drops from the top row and splits to the lower pair.
         *
         * `tone` keys each tile's fill and glyph colour, sampled from the
         * design. They are per-ENGINE rather than per-position — the same
         * engine carries the same colour wherever it appears on this site.
         */
        top: [
          { icon: "pulse", label: "Pulse", tone: "violet" },
          { icon: "wand", label: "Magic", tone: "mint" },
          { icon: "layers", label: "KxP", tone: "peach" },
        ],
        bottom: [
          { icon: "chat", label: "Chat", tone: "blue" },
          { icon: "bars", label: "Pitch", tone: "cream" },
        ],
      },
      {
        id: "experiences",
        number: "03",
        kind: "list",
        label: "Experiences",
        title: "Purpose-built Suites",
        note: "Bring the right capabilities into one experience.",
        /**
         * Three suites. Only the first carries a subtitle in the design, so
         * `sub` is optional rather than blank on the other two.
         */
        items: [
          {
            icon: "building",
            tone: "violet",
            label: "Enterprise C2P",
            sub: "Capability to performance",
          },
          { icon: "cap", tone: "blue", label: "LurnyCampus" },
          {
            icon: "squares",
            tone: "cream",
            label: "Configurable industry suites",
          },
        ],
      },
    ],
  },

  /**
   * SECTION 3 — what LurnyFabric does.
   *
   * Copy and a 2x3 feature grid on the left; on the right three engine cards in
   * a vertical chain, bracketed to a shared-context label, with the Fabric band
   * beneath them.
   *
   * THE CHAIN IS A WORKED EXAMPLE, not a feature list — a gap is identified,
   * learning follows, support follows that. The arrows between the cards carry
   * that sequence, and the bracket down the right says what all three share.
   * Reordering the cards would break the story.
   */
  does: {
    eyebrow: "What LurnyFabric does",
    headline: ["Connect once. Carry", "context across every", "capability."],
    description:
      "LurnyFabric brings identity, enterprise connections, organisational context and orchestration into a shared foundation\u2014so each engine can work within the same business environment.",

    /** The closing line beneath the rule. */
    closing:
      "The engines share context, so the employee\u2019s journey stays connected.",

    /**
     * The six foundation capabilities, in the design's reading order — which
     * runs across the two columns, not down them.
     */
    features: [
      {
        icon: "identity",
        title: "Identity",
        body: "Consistent access tied to people, roles and permissions.",
      },
      {
        icon: "database",
        title: "Integration",
        body: "Connect Lurny with existing enterprise systems and knowledge sources.",
      },
      {
        icon: "doc",
        title: "Context",
        body: "Bring role, knowledge and relevant activity into each experience.",
      },
      {
        icon: "nodes",
        title: "Orchestration",
        body: "Coordinate actions and handoffs between enabled engines.",
      },
      {
        icon: "shield",
        title: "Governance",
        body: "Apply common controls across connected capabilities.",
      },
      {
        icon: "layers",
        title: "Shared services",
        body: "Reuse common platform services as you add engines.",
      },
    ],

    /**
     * The chain. `tone` keys each card's disc and chip, sampled from the
     * design — per ENGINE, matching the rest of this site.
     */
    chain: [
      {
        id: "pulse",
        icon: "pulse",
        tone: "violet",
        name: "LurnyPulse",
        step: "Identify a capability gap",
        chip: "Product knowledge · Needs development",
      },
      {
        id: "kxp",
        icon: "book",
        tone: "blue",
        name: "LurnyKxP",
        step: "Continue with relevant learning",
        chip: "Recommended product microcourse",
      },
      {
        id: "chat",
        icon: "chat",
        tone: "mint",
        name: "LurnyChat",
        step: "Get contextual support",
        chip: "Ask a question in the flow of work",
      },
    ],

    /** The label the side bracket points at. */
    bracket: ["Shared role,", "knowledge &", "activity"],

    /** The band beneath the chain. */
    band: {
      name: "LurnyFabric",
      items: [
        "Identity",
        "Integration",
        "Context",
        "Orchestration",
        "Governance",
        "Shared services",
      ],
    },
  },
} as const;
