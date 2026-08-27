/**
 * INDUSTRIES PAGE CONTENT
 * ---------------------------------------------------------------------------
 * Copy for the Industries page at /industries.
 *
 * Distinct from content/industries.ts, which is the HOMEPAGE's industry
 * accordion — same subject, different section, different shape. This file is
 * the standalone page; sections are added here as their designs land.
 */

export const industriesPage = {
  /** Page-level metadata, consumed by the route's `metadata` export. */
  meta: {
    title: "Industries",
    description:
      "Every industry has different roles, workflows, customer moments and performance expectations. Lurny connects knowledge, capability and real-world execution around the way your people actually work.",
    path: "/industries",
  },

  /**
   * SECTION 1 — the hero.
   *
   * Copy on the left, a six-card mosaic on the right over an orbital-ring
   * background.
   */
  hero: {
    eyebrow: "Industries",

    /**
     * Split so the lines break where the design breaks them on lg+.
     *
     * The final line ends with a full stop the design sets in amber. It is
     * kept out of the string so it can be coloured without splitting the
     * word — see the `.` span in IndustriesHero.
     */
    headline: ["Built for the realities", "of your industry"] as const,

    description:
      "Every industry has different roles, workflows, customer moments and performance expectations. Lurny connects knowledge, capability and real-world execution around the way your people actually work.",

    actions: {
      /* Both are in-page or existing routes — see the note in the hero. */
      primary: { label: "Explore industries", href: "#industries" },
      secondary: { label: "Book a demo", href: "/demo" },
    },

    /**
     * THE MOSAIC
     *
     * Six industries in a 3x2 grid. `tone` is the colour of the rule beside
     * each label, sampled from the design — one per industry, so a card is
     * identifiable at a glance before its label is read.
     *
     * `offset` lifts or drops a card off the row's baseline, which is what
     * gives the grid its staggered, floating look rather than a plain table.
     * Expressed in rem and applied only from lg, where the three columns
     * actually sit side by side.
     */
    cards: [
      {
        label: "BFSI",
        tone: "#e4d300",
        offset: 0.75,
        image: {
          src: "/assets/images/industries/bfsi.webp",
          /**
           * Decorative: the six photos are a mood strip behind the labels,
           * and the label already names the industry. Describing each stock
           * photo would only add noise for a screen-reader user.
           */
          alt: "",
        },
      },
      {
        label: "Telecom",
        tone: "#8637c3",
        offset: 0,
        image: {
          src: "/assets/images/industries/telecom.webp",
          alt: "",
        },
      },
      {
        label: "Healthcare",
        tone: "#5891f1",
        offset: 0.35,
        image: {
          src: "/assets/images/industries/healthcare.webp",
          alt: "",
        },
      },
      {
        label: "Manufacturing",
        tone: "#e1931d",
        offset: 0,
        image: {
          src: "/assets/images/industries/manufacturing.webp",
          alt: "",
        },
      },
      {
        label: "Professional Services",
        tone: "#c04ae0",
        offset: 0.55,
        image: {
          src: "/assets/images/industries/professional-services.webp",
          alt: "",
        },
      },
      {
        label: "Retail",
        tone: "#5891f1",
        offset: 0.9,
        image: {
          src: "/assets/images/industries/retail.webp",
          alt: "",
        },
      },
    ],
  },

  /**
   * SECTION 2 — the industries we serve.
   *
   * A split heading — headline left, description right — over a 3x2 grid of
   * industry cards.
   *
   * `icon` keys the glyph in IndustryIcons. Each is a violet line drawing
   * with ONE amber element, which is how the design distinguishes them from
   * the flat icon sets used elsewhere on the site.
   *
   * The numbers are content rather than a CSS counter: the design shows them
   * zero-padded, and a counter would force the padding into a pseudo-element
   * where it could not be read or translated.
   */
  serve: {
    eyebrow: "Industries we serve",

    /**
     * Split so the lines break where the design breaks them on lg+.
     *
     * The second line ends with a full stop the design sets in amber. It is
     * kept out of the string so it can be coloured without splitting the
     * word — see the `.` span in IndustriesServe.
     */
    headline: [
      "Different operating realities.",
      "One connected capability platform",
    ] as const,

    description:
      "From customer-facing teams and field engineers to healthcare professionals and shop-floor employees, Lurny adapts to the roles, knowledge and performance expectations that define each industry.",

    items: [
      {
        number: "01",
        icon: "bank",
        title: "Banking & Financial Services",
        description:
          "Customer conversations, product knowledge, compliance and branch performance.",
      },
      {
        number: "02",
        icon: "tower",
        title: "Telecom",
        description:
          "Technical readiness, field execution, customer support and rapidly changing product knowledge.",
      },
      {
        number: "03",
        icon: "heartbeat",
        title: "Healthcare",
        description:
          "Process adherence, continuous knowledge, patient experience and role readiness.",
      },
      {
        number: "04",
        icon: "factory",
        title: "Manufacturing",
        description:
          "SOP adoption, safety, operational capability and accessible shop-floor learning.",
      },
      {
        number: "05",
        icon: "briefcase",
        title: "Professional Services",
        description:
          "Client readiness, expertise development, institutional knowledge and consistent delivery.",
      },
      {
        number: "06",
        icon: "storefront",
        title: "Retail",
        description:
          "Product knowledge, customer service, frontline consistency and sales performance.",
      },
    ],
  },

  /**
   * SECTION 3 — banking, financial services & insurance.
   *
   * Copy and three icon points on the left; on the right a photo with a
   * LurnyPitch overlay — a live-conversation panel and three signal cards.
   *
   * THE OVERLAY IS DRAWN from the values below, not shipped as the flat PNG
   * supplied with the design. That export bakes every label into pixels: it
   * cannot re-flow, its text is invisible to search and unreadable when
   * scaled into a narrow column. The same choice the LurnyMagic page makes
   * for its product panels.
   */
  bfsi: {
    eyebrow: "Banking, Financial Services & Insurance",

    /** Split so the lines break where the design breaks them on lg+. */
    headline: [
      "Turn every customer",
      "conversation into",
      "timely, compliant action.",
    ] as const,

    description:
      "Help distributed banking and insurance teams stay current, understand customer needs, communicate products clearly and follow through consistently—across branches, contact centres and field teams.",

    /** The three points under the description. `icon` keys BfsiIcons. */
    points: [
      {
        icon: "readiness",
        title: "Build frontline readiness",
        description:
          "Keep teams current on products, processes, suitability and compliance expectations.",
      },
      {
        icon: "conversation",
        title: "Understand every conversation",
        description:
          "Identify customer intent, objections, missed opportunities and important compliance gaps.",
      },
      {
        icon: "target",
        title: "Turn insight into action",
        description:
          "Trigger follow-ups, manager coaching and targeted learning based on what happened.",
      },
    ],

    /** The photograph the overlay sits on. */
    photo: {
      src: "/assets/images/industries/bfsi-conversation.webp",
      /**
       * Decorative: it is scene-setting behind a drawn product overlay, and
       * the section's copy already says what the scene is.
       */
      alt: "",
      width: 1200,
      height: 750,
    },

    /**
     * THE LIVE-CONVERSATION PANEL
     *
     * `tone` keys the value's colour in IndustriesBfsi: "blue" for a neutral
     * reading, "amber" for something needing attention. A row with no value
     * is a full-width alert, which the design sets entirely in amber.
     */
    panel: {
      product: "LurnyPitch",
      state: "Live conversation",
      rows: [
        {
          icon: "intent",
          label: "Customer intent",
          value: "Vehicle Loan",
          tone: "blue",
        },
        { icon: "alert", label: "Rate objection detected", tone: "amber" },
        {
          icon: "shield",
          label: "Compliance coverage",
          value: "86%",
          tone: "blue",
        },
        {
          icon: "trend",
          label: "Missed opportunity",
          value: "Motor Insurance",
          tone: "amber",
        },
        {
          icon: "calendar",
          label: "Follow-up commitment",
          value: "Tomorrow · 11:00 AM",
          tone: "blue",
        },
      ],
    },

    /**
     * The three signal cards beneath the panel. `tone` sets the leading rule
     * and the label colour — the design marks the last one amber, as the
     * commercial opportunity rather than a coaching note.
     */
    signals: [
      {
        icon: "calendar",
        tone: "blue",
        label: "Next action",
        text: "Share repayment illustration and reconnect tomorrow.",
      },
      {
        icon: "coach",
        tone: "blue",
        label: "Coaching signal",
        text: "Handling rate objections",
      },
      {
        icon: "shield",
        tone: "amber",
        label: "Motor insurance renewal",
        text: "Coverage needs identified · Follow-up due",
      },
    ],
  },

  /**
   * SECTION 4 — healthcare.
   *
   * The inverse of the BFSI section: a light ground, copy and three points on
   * the left, and a full-bleed photograph carrying five cards down the right,
   * strung on a vertical rail.
   *
   * The icons here SHIP AS IMAGES, unlike the BFSI section's. These arrive as
   * 184-260px artwork with their tinted tiles already drawn in — blue for the
   * knowledge cards, green for the approved/readiness ones — so redrawing
   * them would mean reproducing the tile treatment by hand for no gain. They
   * are ~2KB each as WebP.
   *
   * The background is likewise the supplied asset: its left fade into cream
   * is baked in, which is what lets the copy sit over the photograph with no
   * scrim of our own.
   */
  healthcare: {
    eyebrow: "Healthcare",

    /** Split so the lines break where the design breaks them on lg+. */
    headline: [
      "Turn changing protocols",
      "into consistent everyday",
      "practice.",
    ] as const,

    description:
      "Help clinical and non-clinical teams stay current on approved protocols, processes and patient-service expectations—without taking them away from the flow of work.",

    /** The photograph behind the whole section. */
    scene: {
      src: "/assets/images/industries/healthcare-scene.webp",
      /**
       * Decorative: scene-setting behind the copy and a drawn card stack,
       * and the section's own text already says what the scene is.
       */
      alt: "",
      width: 1600,
      height: 900,
    },

    /** The three points under the description. */
    points: [
      {
        icon: "/assets/images/industries/healthcare/keep-knowledge-current.webp",
        title: "Keep knowledge current",
        description:
          "Turn updated protocols, SOPs and policies into accessible guidance.",
      },
      {
        icon: "/assets/images/industries/healthcare/point-of-work-support.webp",
        title: "Support people at the point of work",
        description:
          "Give employees approved, role-relevant answers when they need them.",
      },
      {
        icon: "/assets/images/industries/healthcare/measurable-readiness.webp",
        title: "Build measurable readiness",
        description:
          "Reinforce critical practices and identify teams needing support.",
      },
    ],

    /**
     * THE CARD STACK
     *
     * Five cards down the right, joined by a vertical rail with a node at
     * each. `kind` selects what sits under the title:
     *
     *   "meta"   -> `meta`, a two-part caption; the first half takes the
     *               design's blue.
     *   "prompt" -> `prompt`, a question. The design tints this whole card.
     *   "lines"  -> `lines`, N placeholder rules standing in for a body of
     *               guidance that has not been written yet.
     *   "meter"  -> `meter`, a filled progress track.
     */
    cards: [
      {
        kind: "meta",
        icon: "/assets/images/industries/healthcare/protocol-update.webp",
        title: "Protocol update",
        meta: { lead: "Infection Prevention", tail: "Updated today" },
      },
      {
        kind: "prompt",
        icon: "/assets/images/industries/healthcare/ask-lurny.webp",
        title: "Ask Lurny",
        prompt: "What is the approved discharge handover process?",
      },
      {
        kind: "lines",
        icon: "/assets/images/industries/healthcare/approved-guidance.webp",
        title: "Approved guidance",
        /** Widths as percentages, so the stack of rules is not uniform. */
        lines: [100, 88, 62],
      },
      {
        kind: "lines",
        icon: "/assets/images/industries/healthcare/refresher-assigned.webp",
        title: "5-minute refresher assigned",
        lines: [100, 74],
      },
      {
        kind: "meter",
        icon: "/assets/images/industries/healthcare/readiness-on-track.webp",
        /** Split so the status can take the design's lighter weight. */
        title: { lead: "Readiness", tail: "On track" },
        /** Fraction of the track filled. */
        meter: 0.68,
      },
    ],
  },
} as const;
