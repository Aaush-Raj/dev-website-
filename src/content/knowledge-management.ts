/**
 * KNOWLEDGE MANAGEMENT PAGE CONTENT
 * ---------------------------------------------------------------------------
 * Copy for /solutions/knowledge-management — the fourth of the "solutions by
 * business need" detail pages.
 *
 * Copy is verbatim from the supplied "04-hero-text.txt" and the card text in
 * the section design. Section 1 is defined below; the remaining sections are
 * added here as their designs are built.
 */

export const knowledgeManagement = {
  /** Page-level metadata, consumed by the route's `metadata` export. */
  meta: {
    title: "Knowledge Management — Put Your Workplace Knowledge to Work",
    description:
      "Help employees find and understand the SOPs, policies and product information they need, when they need it.",
    path: "/solutions/knowledge-management",
  },

  /**
   * SECTION 1 — the hero.
   *
   * The statement on the left, the room scene on the right with the LurnyChat
   * and LurnyMagic cards over it.
   */
  hero: {
    eyebrow: "Knowledge management",

    /** Split so the lines break where the design breaks them on lg+. */
    headline: [
      "Your people have",
      "questions.",
      "Put your knowledge",
      "to work.",
    ],

    description:
      "Help employees find and understand the SOPs, policies and product information they need, when they need it. Turn everyday questions into useful answers—and complex documents into focused learning.",

    actions: {
      /* Points at a section further down this page, which is specified in the
         supplied copy but not yet built. */
      primary: { label: "Explore knowledge management", href: "#explained" },
      secondary: { label: "Talk to us", href: "/contact" },
    },

    /** The engine attribution under the actions. */
    poweredBy: "Powered by LurnyChat + LurnyMagic",

    /**
     * The room scene. It already carries the man, the wall art, the desk
     * props, the pastel blobs AND the handwritten note with its arrow curving
     * down to where the LurnyChat card sits — so the cards are positioned to
     * land on the point that arrow indicates.
     */
    scene: {
      src: "/images/solutions/knowledge-management/hero-scene.webp",
      /**
       * Decorative: it is a photograph of someone at a laptop, and every claim
       * the section makes is set in the copy and the cards beside it.
       */
      alt: "",
      width: 1672,
      height: 941,
    },

    /**
     * THE LURNYCHAT CARD
     * ---------------------------------------------------------------------
     * An exchange: the employee's question, then the assistant's answer with
     * its checklist and the source it cites. Built in markup — see
     * scripts/build-knowledge-management-hero.cjs for why.
     */
    chat: {
      engine: "LurnyChat",
      tagline: "Ask your workplace knowledge",
      question: "What documents do I need for this application?",
      answer: {
        lead: "For a standard application:",
        items: [
          "Completed application form",
          "Identity and address proof",
          "Supporting documents for the product",
        ],
        note: "Check the product-specific requirements before submitting.",
      },
      source: "Source: Application SOP · Section 2",
    },

    /**
     * THE LURNYMAGIC CARD
     * ---------------------------------------------------------------------
     * Its centre illustration is genuinely pictorial and ships as a raster;
     * everything around it is markup.
     */
    magic: {
      engine: "LurnyMagic",
      badge: "Microlesson",
      caption: "Understand the application process",
      illustration: {
        src: "/images/solutions/knowledge-management/magic-illustration.webp",
        /** Decorative: the caption beneath it says what it depicts. */
        alt: "",
        width: 319,
        height: 124,
      },
    },
  },

  /**
   * SECTION 2 — knowledge management, explained.
   *
   * The statement on the left over the night-office scene, the three RAG steps
   * stepping down its right, and a strip of three principles closing it.
   */
  explained: {
    eyebrow: "Knowledge management, explained",

    /** Split so the lines break where the design breaks them on lg+. */
    headline: ["Turn company knowledge", "into everyday answers."],

    description:
      "Knowledge management means organising, maintaining and sharing what your business knows—so people can use it when they need it.",

    /** The sub-heading and its paragraph, under the description. */
    rag: {
      title: "Where RAG comes in",
      body: "Retrieval-augmented generation (RAG) finds relevant content and gives it to AI as context for an answer.",
    },

    /**
     * The night office. It already carries the man, the room and the
     * handwritten "Knowledge, put to work." note, so only the three cards and
     * the strip are built over it.
     */
    scene: {
      src: "/images/solutions/knowledge-management/explained-scene.webp",
      alt: "",
      width: 1672,
      height: 941,
    },

    /**
     * The three RAG steps. The ordinal is the item's position rather than
     * stored copy, so the two cannot drift apart.
     */
    steps: [
      {
        title: "Your knowledge",
        body: "SOPs, policies and product guides",
        tone: "cyan",
        icon: "document",
      },
      {
        title: "Retrieve",
        body: "Find passages relevant to the question",
        tone: "coral",
        icon: "search",
      },
      {
        title: "Generate",
        body: "Draft an answer using that context",
        tone: "amber",
        icon: "chat",
      },
    ],

    /** The strip of principles closing the section. */
    principles: [
      { label: "Organise knowledge", tone: "cyan", icon: "document" },
      { label: "Keep content current", tone: "coral", icon: "refresh" },
      { label: "Make it useful", tone: "amber", icon: "chart" },
    ],
  },

  /**
   * SECTION 3 — answers, when work needs them.
   *
   * The statement and three points on the left, a LurnyChat conversation on
   * the right with the source document it cites beside it.
   */
  chatSection: {
    eyebrow: "Answers, when work needs them",

    /** Split so the lines break where the design breaks them on lg+. */
    headline: ["Less searching.", "More getting", "things done."],

    description:
      "Give employees a conversational way to find the SOPs, policies and product information they need. Ask a question, clarify the answer and refer to the supporting source.",

    /** The three points under the description, each behind its own icon. */
    points: [
      {
        title: "Ask naturally",
        body: "Start with an everyday work question.",
        icon: "bubble",
      },
      {
        title: "Get specific",
        body: "Use follow-up questions to clarify what applies.",
        icon: "bubbles",
      },
      {
        title: "Check the source",
        body: "Refer to the document behind the answer.",
        icon: "document",
      },
    ],

    /**
     * The slate ground. It already carries the abstract shapes AND the
     * handwritten "An answer you can follow." note with its arrow pointing UP
     * at the source panel's foot — so that panel is positioned to land on the
     * point the arrow indicates.
     */
    scene: {
      src: "/images/solutions/knowledge-management/chat-scene.webp",
      alt: "",
      width: 1672,
      height: 941,
    },

    /** THE CONVERSATION PANEL. */
    panel: {
      engine: "LurnyChat",
      tagline: "Product knowledge",
      /** The disclaimer under the header — the examples are illustrative. */
      disclaimer: "All example product information is fictional demonstration.",

      /**
       * The exchange, in order. `from` is "user" or "assistant"; only an
       * assistant turn carries a `source`.
       */
      messages: [
        {
          from: "user",
          text: "Does the Pro plan include onboarding?",
          time: "10:24 AM",
        },
        {
          from: "assistant",
          text: "Yes. The Pro plan includes one guided onboarding session for your team.",
          source: "Source: Product guide · Section 4",
          time: "10:24 AM",
        },
        {
          from: "user",
          text: "What should we prepare?",
          time: "10:24 AM",
        },
        {
          from: "assistant",
          text: "Bring your team list, your main use case and any setup questions.",
          source: "Source: Onboarding checklist",
          time: "10:26 AM",
        },
      ],

      placeholder: "Ask a follow-up question…",
    },

    /** THE SOURCE PANEL — the document the first answer cites. */
    source: {
      title: "Product guide",
      subtitle: "Section 4 · Onboarding",
      label: "Source excerpt",
      /** The highlighted passage. Split so the lead can be set in bold. */
      excerpt: { lead: "Pro plan:", rest: "One guided onboarding session is included." },
      /**
       * The rest of the document is shown as skeleton lines rather than real
       * copy — the design draws it that way, and inventing a page of product
       * documentation would be worse than showing none.
       */
      skeleton: [96, 92, 88, 62, 95, 90, 93, 58, 91, 66, 94, 71],
    },
  },

  /**
   * SECTION 4 — one knowledge base, two ways to help.
   *
   * The statement on the left, the document stack in the middle, and the two
   * engine cards on the right that its arrows connect to.
   */
  twoWays: {
    eyebrow: "One knowledge base. Two ways to help.",

    /** Split so the lines break where the design breaks them on lg+. */
    headline: ["Answer the question.", "Build the", "understanding."],

    description:
      "Make SOPs, policies and product guides useful in everyday work. Help employees get answers through LurnyChat, and turn source documents into focused learning with LurnyMagic.",

    /** The two engines named under the description. */
    engines: [
      { name: "LurnyChat", role: "Ask and act", icon: "chat" },
      { name: "LurnyMagic", role: "Learn and retain", icon: "book" },
    ],

    /** The geometric ground. */
    scene: {
      src: "/images/solutions/knowledge-management/chatmagic-scene.webp",
      alt: "",
      width: 1672,
      height: 941,
    },

    /** The label above the document stack. */
    stackLabel: ["Your company", "knowledge"],

    /**
     * The document stack, shipped whole — it is a perspective drawing with a
     * handwritten note and the two connector arrows, none of it text. Its
     * arrows end in a teal dot and a coral dot, which is where the two cards
     * attach. See scripts/build-knowledge-management-hero.cjs.
     */
    stack: {
      src: "/images/solutions/knowledge-management/chatmagic-stack.webp",
      /**
       * NOT decorative: the three documents are labelled SOPs, Policies and
       * Product guides, and those names are the point of the section.
       */
      alt: "A stack of three documents labelled SOPs, Policies and Product guides, annotated “Knowledge, made useful.”",
      width: 376,
      height: 511,
    },

    /** THE LURNYCHAT CARD — the question answered. */
    chat: {
      engine: "LurnyChat",
      badge: "Ask and act",
      question: "How do I request annual leave?",
      answer:
        "Submit your dates in the HR portal, then send the request to your manager for approval.",
      source: "Source: Leave policy · Section 3",
    },

    /** THE LURNYMAGIC CARD — the same policy turned into a lesson. */
    magic: {
      engine: "LurnyMagic",
      badge: "Learn and retain",
      title: "Leave requests, made simple",
      steps: [
        "Check your leave balance",
        "Submit your dates",
        "Get manager approval",
      ],
      quiz: {
        label: "Quick check:",
        question: "What happens after you submit?",
        /** The first option is the selected one. */
        options: ["Manager approval", "Automatic approval"],
      },
    },
  },
} as const;
