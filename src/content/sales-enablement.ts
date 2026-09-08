/**
 * SALES ENABLEMENT PAGE CONTENT
 * ---------------------------------------------------------------------------
 * Copy for /solutions/sales-enablement — the second of the "solutions by
 * business need" detail pages, after /solutions/frontline.
 *
 * Copy is verbatim from the supplied
 * "Lurny_Sales_Enablement_8_Sections_Text.txt". Section 1 is defined below;
 * the remaining sections are specified in that file and are added here as
 * their designs are built.
 */

export const salesEnablement = {
  /** Page-level metadata, consumed by the route's `metadata` export. */
  meta: {
    title: "Sales Enablement — Turn Sales Knowledge into Better Conversations",
    description:
      "Help every seller prepare faster, handle questions with confidence and act on opportunities—with connected learning, conversation intelligence and customer insights.",
    path: "/solutions/sales-enablement",
  },

  /**
   * SECTION 1 — the hero.
   *
   * The statement on the left, the conversation photo on the right with the
   * four engine cards floating around it.
   */
  hero: {
    eyebrow: "Sales enablement",

    /**
     * Split into two runs so the design's colour change can be drawn rather
     * than typed: the opening lines are near-black, the closing ones violet.
     */
    headline: {
      lead: ["Turn sales", "knowledge into"],
      accent: ["better customer", "conversations."],
    },

    description:
      "Help every seller prepare faster, handle questions with confidence and act on opportunities—with connected learning, conversation intelligence and customer insights.",

    actions: {
      /* Points at a section further down this page, which is specified in the
         supplied copy but not yet built. */
      primary: { label: "Explore the sales enablement loop", href: "#loop" },
      secondary: { label: "Talk to us", href: "/contact" },
    },

    /** The line under the buttons, naming the four engines. */
    poweredBy: "Powered by Magic, Pitch, Biz and Chat",

    /** The conversation. Decorative: the copy carries the meaning. */
    photo: {
      src: "/images/solutions/sales-enablement/conversation.webp",
      alt: "",
      width: 1254,
      height: 627,
    },

    /** The faint arcs behind the composition. */
    backdrop: {
      src: "/images/solutions/sales-enablement/hero-backdrop.webp",
      alt: "",
      width: 1672,
      height: 941,
    },

    /**
     * THE FOUR ENGINE CARDS
     * ---------------------------------------------------------------------
     * Built in markup rather than shipped as the supplied crops — see
     * scripts/build-sales-enablement-hero.cjs for why.
     *
     * `engine` selects the icon and accent; `slot` places the card around the
     * photo. Each card has a different body shape, so the component renders a
     * variant per engine rather than trying to make one shape serve all four.
     */
    cards: {
      magic: {
        engine: "Magic",
        title: "New product briefing",
        meta: "6 min learning",
        still: {
          src: "/images/solutions/sales-enablement/magic-still.webp",
          alt: "",
          width: 114,
          height: 80,
        },
      },
      chat: {
        engine: "Chat",
        title: "Handle an objection",
        /** The exchange, seller then assistant. */
        question: "How do I explain the value?",
        answer: "Start with the customer’s priority.",
      },
      pitch: {
        engine: "Pitch",
        title: "Conversation insight",
        insight: "Customer need worth exploring",
      },
      biz: {
        engine: "Biz",
        title: "Recommended follow-up",
        action: "Share a tailored product comparison",
        link: "View customer context",
      },
    },
  },

  /**
   * THE SALES ENABLEMENT REALITY — the dark section.
   *
   * The statement over an illustrated night office, three moment cards placed
   * around the seller and an insight strip closing the section.
   *
   * NOTE ON NUMBERING: the supplied copy file calls this "Section 3", because
   * it also specifies a light-UI problem section before it that has no design
   * yet. The designs are numbered one lower. Named by content here so neither
   * numbering can go stale.
   */
  reality: {
    eyebrow: "The sales enablement reality",

    /** Split so the lines break where the design breaks them on lg+. */
    headline: ["Sales knowledge is only useful", "when sellers can act on it."],

    description:
      "Training, customer conversations and CRM activity often sit apart—leaving sellers to connect the dots themselves.",

    /** The illustrated scene. Decorative: the copy carries the meaning. */
    scene: {
      src: "/images/solutions/sales-enablement/reality-scene.webp",
      alt: "",
      width: 1672,
      height: 941,
    },

    /**
     * The three moments, in the order the design places them around the
     * seller. `tone` selects the accent and `icon` the glyph.
     */
    moments: [
      {
        stage: "Before the call",
        title: "Product briefing completed",
        body: "Applying it is another challenge.",
        tone: "teal",
        icon: "document",
      },
      {
        stage: "In the conversation",
        title: "A new objection comes up",
        body: "The seller needs a relevant answer.",
        tone: "coral",
        icon: "bubble",
      },
      {
        stage: "After the call",
        title: "Next step remains unclear",
        body: "Customer context needs to become action.",
        tone: "amber",
        icon: "people",
      },
    ],

    /** The four insights along the foot of the section. */
    insights: [
      { label: "Knowledge goes stale", tone: "teal", icon: "clock" },
      { label: "Answers arrive late", tone: "coral", icon: "bubble" },
      { label: "Coaching lacks context", tone: "violet", icon: "person" },
      { label: "Follow-ups lose momentum", tone: "amber", icon: "chart" },
    ],
  },

  /**
   * SECTION 4 — APPLY WITH LURNYCHAT
   *
   * The argument on the left, a LurnyChat exchange on the right. Everything in
   * the panel is imitation product UI built in markup — the asset pack's own
   * README notes its graphics carry embedded interface text and its icons are
   * not transparent, so none of them ship. See SalesChat for the full reasoning.
   */
  chat: {
    eyebrow: "Apply with LurnyChat",

    /** Split so the lines break where the design breaks them on lg+. */
    headline: ["Help sellers find the", "words when it matters."],

    description:
      "Give sellers contextual guidance grounded in approved product knowledge—so they can clarify a benefit, work through an objection and prepare a relevant response.",

    /** The three capabilities, each in a ringed circle. */
    points: [
      { icon: "bubble", label: "Understand the customer’s concern" },
      { icon: "target", label: "Connect benefits to their needs" },
      { icon: "chart", label: "Prepare a useful next question" },
    ],

    cta: { label: "Explore LurnyChat", href: "/platform/chat" },

    /** The handwritten note and the word stack along the foot of the column. */
    note: "Confident\nconversations\ncreate momentum.",
    words: ["People", "Knowledge", "Progress"],

    /**
     * THE PANEL. Imitation UI, so it is aria-hidden and Uncopyable: the copy on
     * the left carries the section's meaning, and a screen reader should not
     * have to wade through a scripted conversation to reach it.
     */
    panel: {
      brand: "LurnyChat",
      context: "Sales support",
      grounding: "Using approved product knowledge",

      /** The seller's question. */
      question: {
        body: "The customer feels our product is too expensive. How can I explain the value?",
        time: "10:24 AM",
        avatar: {
          src: "/images/solutions/sales-enablement/seller-avatar.webp",
          width: 166,
          height: 166,
        },
      },

      /** LurnyChat's reply: a three-step answer over a cited source. */
      answer: {
        author: "LurnyChat",
        time: "10:25 AM",
        steps: [
          {
            title: "Understand the concern",
            body: "Ask whether the concern is the upfront price or the value they expect.",
          },
          {
            title: "Make the value relevant",
            body: "Connect a verified product benefit to the customer’s stated priority.",
          },
          {
            title: "Keep the conversation open",
            body: "Which outcome matters most to you when comparing the options?",
          },
        ],
        source: "Source: Approved sales playbook",
      },

      /** The two follow-up chips under the reply. */
      chips: [
        { icon: "document", label: "Make it shorter" },
        { icon: "person", label: "Help me practise" },
      ],

      /** The composer at the foot of the panel. */
      input: "Ask a follow-up question\u2026",
    },

    /** The slate room the panel sits in. */
    backdrop: {
      src: "/images/solutions/sales-enablement/chat-backdrop.webp",
      alt: "",
      width: 1536,
      height: 1024,
    },
  },

  /**
   * PREPARE WITH LURNYMAGIC.
   *
   * The statement on the left, the seller's lavender scene on the right with
   * four cards floating over it.
   *
   * NOTE ON NUMBERING: the supplied copy file calls this "Section 7" — it
   * specifies more sections than have designs yet. Named by content here so
   * neither numbering can go stale. See the note on `reality`.
   */
  magic: {
    eyebrow: "Prepare with LurnyMagic",

    /** Split so the lines break where the design breaks them on lg+. */
    headline: ["Turn product", "knowledge into", "sales readiness."],

    description:
      "Transform product documents, campaign updates and sales playbooks into focused learning that helps sellers explain value, handle objections and prepare for customer conversations.",

    /** The three points under the description, each behind its own icon. */
    points: [
      { icon: "document", tone: "violet", label: "Brief sellers on what matters" },
      { icon: "bubble", tone: "teal", label: "Build confidence with objections" },
      {
        icon: "check",
        tone: "amber",
        label: "Check understanding before the conversation",
      },
    ],

    action: { label: "Explore LurnyMagic", href: "/platform/magic" },

    /**
     * The scene. It already carries the seller, the handwritten notes and the
     * curved arrow, so only the four cards sit over it.
     */
    scene: {
      src: "/images/solutions/sales-enablement/magic-scene.webp",
      /**
       * Decorative: everything it says in handwriting is atmosphere, and the
       * four cards over it carry their own descriptions.
       */
      alt: "",
      width: 1536,
      height: 1024,
    },

    /**
     * THE FOUR CARDS
     * ---------------------------------------------------------------------
     * Shipped as images, unlike every other card on this site — they are
     * high-resolution, alpha-cut and drawn in 3D perspective. See
     * scripts/build-sales-enablement-hero.cjs for the full reasoning.
     *
     * Because the copy is baked into the pixels, each carries a real `alt`
     * rather than an empty one: it is the only way that content reaches a
     * screen reader.
     */
    cards: [
      {
        src: "/images/solutions/sales-enablement/magic-card-launch.webp",
        alt: "A PDF titled “New product launch”, labelled product guide and campaign brief.",
        width: 1402,
        height: 1122,
      },
      {
        src: "/images/solutions/sales-enablement/magic-card-briefing.webp",
        alt: "A product briefing lesson, “What’s new and why it matters” — a five-minute video.",
        width: 1536,
        height: 1024,
      },
      {
        src: "/images/solutions/sales-enablement/magic-card-objection.webp",
        alt: "An objection-handling exercise for responding to common concerns, opening with “Why should I choose this?”",
        width: 1536,
        height: 1024,
      },
      {
        src: "/images/solutions/sales-enablement/magic-card-readiness.webp",
        alt: "A readiness check to apply what you have learned, with one answer selected.",
        width: 1536,
        height: 1024,
      },
    ],
  },

  /**
   * THE SALES ENABLEMENT LOOP.
   *
   * Four stages around the seller at the centre, each naming its engine and
   * carrying a sample of that engine's UI. Everything except the seller is
   * built in markup — see SalesLoop.
   */
  loop: {
    eyebrow: "The sales enablement loop",

    /** Split so the lines break where the design breaks them on lg+. */
    headline: ["Every conversation makes", "the next one better."],

    description:
      "Connect learning, in-the-moment support, conversation insights and customer action in one continuous loop.",

    /** The seller at the centre, keyed out of her plate. */
    seller: {
      src: "/images/solutions/sales-enablement/loop-seller.webp",
      /** Decorative: the caption beneath her names what she represents. */
      alt: "",
      width: 690,
      height: 765,
    },

    /** The pill under the seller. */
    caption: "A better-supported seller",

    /** The handwritten note beside the loop. */
    note: "More confident conversations, brighter outcomes.",

    /** The line closing the section, under a rule. */
    footnote: "Feed conversation insights back into sharper learning and coaching.",

    /**
     * The four stages, clockwise from the top left. The ordinal is the item's
     * position rather than stored copy, so the two cannot drift apart.
     *
     * `sample` selects which engine panel the component renders beneath the
     * stage: each is a different shape, so each is its own small component.
     */
    stages: [
      {
        title: "Prepare",
        engine: "LurnyMagic",
        tone: "violet",
        body: "Turn product updates and sales playbooks into focused learning.",
        sample: "magic",
      },
      {
        title: "Apply",
        engine: "LurnyChat",
        tone: "teal",
        body: "Get contextual guidance to handle questions and objections.",
        sample: "chat",
      },
      {
        title: "Understand",
        engine: "LurnyPitch",
        tone: "amber",
        body: "Reveal customer needs, missed opportunities and coaching gaps from real conversations.",
        sample: "pitch",
      },
      {
        title: "Act",
        engine: "LurnyBiz",
        tone: "blue",
        body: "Use CRM and business context to prioritise opportunities and follow-ups.",
        sample: "biz",
      },
    ],

    /** The copy inside the four engine samples. */
    samples: {
      magic: {
        source: "Product Updates & Playbooks",
        rows: [
          { label: "Key Product Updates", icon: "book", tone: "violet" },
          { label: "Objection Handling", icon: "chat", tone: "teal" },
          { label: "Customer Success Stories", icon: "chart", tone: "amber" },
        ],
      },
      chat: {
        question: "How do I explain the value?",
        answer:
          "Focus on the outcomes that matter to them — lower costs, faster execution and measurable ROI.",
      },
      pitch: {
        duration: "00: / 14:28",
        insight: "Unexplored customer need",
      },
      biz: {
        account: "Acme Healthcare",
        badge: "High potential",
        rows: [
          { label: "Last conversation", value: "2 days ago", icon: "clock" },
          { label: "Next step", value: "Send proposal", icon: "clock" },
          { label: "Deal stage", value: "Evaluation", icon: "calendar" },
        ],
        action: "Follow-up recommended",
      },
    },
  },
} as const;
