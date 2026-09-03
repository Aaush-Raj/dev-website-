/**
 * LURNYBIZ PAGE CONTENT
 * ---------------------------------------------------------------------------
 * Copy for the LurnyBiz product page at /platform/biz.
 *
 * All six sections are defined below, in page order. Copy is verbatim from the supplied "LURNYBIZ.txt".
 */

export const biz = {
  /** Page-level metadata, consumed by the route's `metadata` export. */
  meta: {
    title: "LurnyBiz — CRM-led next-best action",
    description:
      "Connect CRM signals, business dashboards, customer conversations and field knowledge—so every employee, manager and branch knows what to do next.",
    path: "/platform/biz",
  },

  /**
   * SECTION 1 — the hero.
   *
   * Copy on the left, three product panels on the right, and a strip of three
   * feature points along the bottom, over a topographic background.
   *
   * THE PANELS ARE DRAWN from the values below, not the flat PNG supplied
   * with the design. That export bakes every label into pixels: it cannot
   * re-flow, its text is invisible to search and it turns soft the moment it
   * is scaled. The same choice the LurnyMagic and LurnyPitch pages make for
   * their product panels.
   */
  hero: {
    eyebrow: "LurnyBiz",

    /**
     * Split so the lines break where the design breaks them on lg+.
     *
     * The final line ends with a full stop the design sets in amber. It is
     * kept out of the string so it can be coloured without splitting the
     * word — see the `.` span in BizHero.
     */
    headline: ["Turn business context", "into better action"] as const,

    description:
      "Connect CRM signals, business dashboards, customer conversations and field knowledge—so every employee, manager and branch knows what to do next.",

    actions: {
      /*
        Points at section 6's form on this page.

        It used to point at `/demo`, which is a 404 — that route does not
        exist anywhere on the site. Now that the booking form is on this page
        there is a real destination, and an in-page anchor is the honest one.

        TODO(routes): revisit if a standalone /demo page is ever built.
      */
      primary: { label: "Book a demo", href: "#demo" },
      secondary: { label: "See how it works", href: "#problem" },
    },

    /**
     * THE PRIORITIES PANEL — the large one on the left of the cluster.
     *
     * `tone` keys each row's rank badge and its leading rule: the design runs
     * red, amber then green down the three, which is the priority order
     * rather than a status.
     */
    priorities: {
      title: "Today's Action Priorities",
      items: [
        {
          rank: "1",
          tone: "red",
          icon: "alert",
          title: "Call Anil Kumar before 3 PM",
          meta: "Balance-transfer risk · Follow-up overdue",
        },
        {
          rank: "2",
          tone: "amber",
          icon: "person",
          title: "Coach Priya on rate-objection handling",
          meta: "Conversation pattern detected",
        },
        {
          rank: "3",
          tone: "green",
          icon: "trend",
          title: "Focus today's huddle on Vehicle Loan referrals",
          meta: "7 follow-ups need attention",
        },
      ],

      /** The footer band: three source chips and the call to action. */
      why: {
        title: "Why this matters",
        sources: [
          { icon: "person", label: "CRM" },
          { icon: "chat", label: "Conversations" },
          { icon: "branch", label: "Branch data" },
        ],
        action: "View suggested action",
      },
    },

    /** THE BRANCH ACTION PLAN — top right. */
    plan: {
      title: "Branch Action Plan",
      stats: [
        { label: "Target gap", value: "₹8.6L", note: "vs target" },
        { label: "Top priority", value: "Vehicle Loan", trend: true },
      ],
      actions: {
        title: "Priority actions",
        items: [
          {
            rank: "1",
            tone: "red",
            label: "Reactivate high-value inactive customers",
            level: "High",
          },
          {
            rank: "2",
            tone: "amber",
            label: "Drive Vehicle Loan pre-approvals",
            level: "Medium",
          },
          {
            rank: "3",
            tone: "green",
            label: "Improve follow-up within 24 hrs",
            level: "Medium",
          },
        ],
      },
      /**
       * The sparkline. `points` are percentages of the chart box — 0 is the
       * bottom — so the line is drawn rather than shipped as an image.
       * `target` is where the dashed rule sits.
       */
      chart: {
        title: "Branch performance",
        note: "vs target",
        value: "92%",
        days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        points: [22, 34, 30, 52, 44, 66, 88],
        /** Index of the day the design marks with a ring. */
        marker: 6,
        target: 46,
      },
    },

    /** THE MANAGER COACHING CARD — bottom right. */
    coaching: {
      title: "Manager Coaching",
      person: {
        initials: "SK",
        name: "Suresh K.",
        role: "Relationship Manager",
      },
      gap: {
        label: "Observed gap",
        value: "Rate objection handling",
        status: "Needs improvement",
      },
      suggestion: {
        label: "Suggested simulation",
        value: "Handle rate objections with confidence",
      },
      followUp: { label: "Follow-up", value: "24 May 2025" },
    },

    /** The strip of three points along the bottom of the section. */
    points: [
      {
        icon: "detect",
        title: "Detect opportunity & risk",
        description: "Surface signals that matter across systems.",
      },
      {
        icon: "guide",
        title: "Guide next-best action",
        description: "Recommend the right action for the right person.",
      },
      {
        icon: "connect",
        title: "Connect capability to outcomes",
        description: "Track execution and drive measurable impact.",
      },
    ],
  },

  /**
   * SECTION 2 — the problem LurnyBiz solves.
   *
   * A two-column layout: the statement on the left, four numbered items down
   * the right separated by hairlines.
   *
   * The eyebrow and the item numbers are set in the MONOSPACE face, which is
   * how the design distinguishes this section's furniture from its prose.
   * JetBrains Mono is already loaded as the theme's `font-mono`.
   *
   * The numbers are content rather than a CSS counter: the design shows them
   * zero-padded, and a counter would force the padding into a pseudo-element
   * where it could not be read or translated.
   */
  problem: {
    eyebrow: "The problem LurnyBiz solves",

    /**
     * Split so the lines break where the design breaks them on lg+.
     *
     * The last line ends with a full stop the design sets in amber, kept out
     * of the string so it can be coloured without splitting the word — see
     * the `.` span in BizProblem.
     */
    headline: [
      "Businesses have more",
      "data than ever. Yet the",
      "next action is still unclear",
    ] as const,

    description:
      "CRM records, dashboards, customer conversations and field experience each reveal part of the story. But when these signals remain disconnected, teams react late, managers rely on instinct and valuable execution knowledge stays trapped with a few people.",

    items: [
      {
        number: "01",
        title: "Signals are scattered across systems",
        description:
          "CRM, BI and conversation data show fragments of performance. LurnyBiz connects them into one operational context.",
      },
      {
        number: "02",
        title: "Dashboards stop at \u201cwhat happened\u201d",
        description:
          "Leaders can see the gap, but not the action that will close it. LurnyBiz turns signals into explainable next-best actions.",
      },
      {
        number: "03",
        title: "Execution knowledge stays tribal",
        description:
          "The judgement of top managers and performers is difficult to scale. LurnyBiz captures these patterns and makes them available across teams.",
      },
      {
        number: "04",
        title: "Interventions arrive too late",
        description:
          "Coaching and learning are often disconnected from live business needs. LurnyBiz triggers targeted support at the moment of need.",
      },
    ],
  },

  /**
   * SECTION 3 — CRM & business-data integration.
   *
   * Copy and three points on the left; on the right a flow diagram — four
   * source systems feeding the LurnyBiz context layer, which feeds three
   * outputs.
   *
   * THE DIAGRAM IS DRAWN from the values below, not the flat PNG supplied
   * with the design. That export bakes every label into pixels: it cannot
   * re-flow, its text is invisible to search and it turns soft when scaled.
   * The same choice sections 1 makes for its panels.
   *
   * `tone` on a source keys BOTH its icon and the connector that runs from
   * it to the hub, so a route is traceable by colour — which is how the
   * design distinguishes the three streams.
   */
  integration: {
    eyebrow: "CRM & business-data integration",

    /** Split so the lines break where the design breaks them on lg+. */
    headline: [
      "Bring every business",
      "signal into one",
      "intelligence layer.",
    ] as const,

    description:
      "Connect the systems that already hold your customer, performance and operational data. LurnyBiz brings these signals into a shared context—without replacing the tools your teams already use.",

    /** The three points beneath the description. */
    points: [
      { icon: "link", tone: "amber", label: "Connect, don't replace" },
      {
        icon: "pulse",
        tone: "violet",
        label: "Unify customer and performance signals",
      },
      { icon: "shield", tone: "green", label: "Secure, governed data access" },
    ],

    /** The four source systems down the left of the diagram. */
    sources: [
      {
        icon: "person",
        tone: "amber",
        title: "CRM",
        meta: "Accounts · Leads · Activities",
      },
      {
        icon: "bars",
        tone: "violet",
        title: "BI & Dashboards",
        meta: "Targets · Trends · Branch KPIs",
      },
      {
        icon: "chat",
        tone: "amber",
        title: "Customer Conversations",
        meta: "Intent · Objections · Commitments",
      },
      {
        icon: "gear",
        tone: "green",
        title: "Operational Systems",
        meta: "Transactions · Service · Workflow",
      },
    ],

    /** The hub in the middle. */
    hub: {
      title: "LurnyBiz",
      subtitle: "Business context layer",
      rows: [
        {
          icon: "people",
          tone: "amber",
          label: "Identity & relationship context",
        },
        {
          icon: "trend",
          tone: "violet",
          label: "Performance & opportunity signals",
        },
        {
          icon: "sliders",
          tone: "green",
          label: "Execution patterns & business rules",
        },
      ],
    },

    /** The three outputs down the right. */
    outputs: [
      { icon: "person", tone: "amber", label: "Single Customer View" },
      { icon: "target", tone: "violet", label: "Action Priorities" },
      { icon: "bars", tone: "green", label: "Manager Insights" },
    ],

    footnote:
      "Existing systems stay in place. LurnyBiz connects the context between them.",
  },

  /**
   * SECTION 4 — single customer view.
   *
   * Copy and three points on the left; on the right a photograph of a
   * relationship manager with a "Customer 360" panel laid over it.
   *
   * THE PANEL IS DRAWN from the values below, not the flat PNG supplied with
   * the design. That export bakes every label into pixels — the same reason
   * sections 1 and 3 draw their panels.
   *
   * The avatar IS shipped: it is a photograph, so it was extracted from that
   * export rather than redrawn.
   *
   * NOTE: the design labels the last card "Opportumitens", which is a typo
   * for "Opportunities". Corrected here — see the note in BizCustomer.
   */
  customer: {
    eyebrow: "Single customer view",

    /** Split so the lines break where the design breaks them on lg+. */
    headline: ["See the customer", "behind every", "transaction."] as const,

    description:
      "Bring products, interactions, commitments, risks and opportunities into one connected view—so employees understand the full relationship before they act.",

    /** The three points beneath the description. */
    points: [
      {
        icon: "/assets/images/biz/customer/one-view.webp",
        label: "One customer. One relationship view.",
      },
      {
        icon: "/assets/images/biz/customer/in-context.webp",
        label: "Every conversation and commitment in context.",
      },
      {
        icon: "/assets/images/biz/customer/risks.webp",
        label: "Risks and opportunities surfaced together.",
      },
    ],

    /** The photograph the panel sits over. */
    scene: {
      src: "/assets/images/biz/customer-scene.webp",
      /**
       * Decorative: scene-setting behind a drawn product panel, and the
       * section's copy already says what the scene is.
       */
      alt: "",
      width: 1400,
      height: 788,
    },

    /** THE CUSTOMER 360 PANEL. */
    panel: {
      title: "Customer 360",

      person: {
        avatar: {
          src: "/assets/images/biz/customer/avatar.webp",
          /** Decorative: a stand-in portrait inside a drawn product panel. */
          alt: "",
        },
        name: "Anita Sharma",
        since: "Customer since Jun 2019",
        status: "Active",
      },

      /** The two stat cards in the first row. */
      relationship: {
        icon: "person",
        title: "Relationship",
        rows: [
          { label: "Tier", value: "Gold" },
          { label: "RM", value: "Neha Kapoor" },
          { label: "Segment", value: "Affluent" },
          { label: "Household", value: "2 Members" },
        ],
      },
      products: {
        icon: "branch",
        title: "Products",
        rows: [
          { label: "Savings Account", value: "4587" },
          { label: "Credit Card", value: "8967" },
          { label: "Home Loan", value: "2145" },
        ],
      },

      /** The two cards in the second row. */
      interactions: {
        icon: "chat",
        title: "Recent interactions",
        items: [
          {
            date: "20 May 2025",
            title: "Discussed balance transfer options",
            channel: "Branch visit",
          },
          {
            date: "12 May 2025",
            title: "Quarterly relationship review",
            channel: "Phone call",
          },
        ],
        action: "View all interactions",
      },
      commitments: {
        icon: "clipboard",
        title: "Open commitments",
        items: [
          {
            title: "Income document update",
            due: "Due 28 May 2025",
            status: "In progress",
          },
          {
            title: "Home loan rate review",
            due: "Due 05 Jun 2025",
            status: "In progress",
          },
        ],
        action: "View all commitments",
      },

      /** The wide card across the foot. */
      opportunity: {
        icon: "bars",
        /* The design reads "Opportumitens" — a typo. */
        title: "Opportunities",
        name: "Vehicle Loan",
        meta: "High intent · Existing customer",
        action: "Follow up today",
      },
    },
  },

  /**
   * SECTION 5 — next-best-action recommendations.
   *
   * Copy and three points on the left; on the right a "Recommended next
   * action" panel with a small "Why now" card overlapping its lower-left.
   *
   * BOTH PANELS ARE DRAWN from the values below, not the two flat PNGs
   * supplied with the design — the same choice sections 1, 3 and 4 make.
   * The three point icons DO ship, as they did in section 4.
   *
   * NOTE: the design reads "Follow-up commtment due today", a typo for
   * "commitment". Corrected here — see the note in BizAction.
   */
  action: {
    eyebrow: "Next-best-action recommendations",

    /** Split so the lines break where the design breaks them on lg+. */
    headline: ["Move from insight to", "the action that matters now."] as const,

    description:
      "LurnyBiz weighs customer history, business signals, commitments and conversation context to recommend the most relevant action—along with the reason, urgency and guidance to act.",

    /** The three points beneath the description. */
    points: [
      {
        icon: "/assets/images/biz/action/explainable.webp",
        label: "Explainable, not a black box.",
      },
      {
        icon: "/assets/images/biz/action/prioritised.webp",
        label: "Prioritised by urgency and potential value.",
      },
      {
        icon: "/assets/images/biz/action/connected.webp",
        label: "Connected to the right conversation or intervention.",
      },
    ],

    /** THE RECOMMENDED NEXT ACTION PANEL. */
    panel: {
      title: "Recommended next action",

      person: { name: "Anita Sharma", role: "Customer" },

      recommendation: {
        title: "Discuss the pre-approved Vehicle Loan offer",
        /** The two chips beneath it; `tone` keys their colour. */
        badges: [
          { label: "High priority", tone: "amber", arrow: true },
          { label: "82% confidence", tone: "green", arrow: false },
        ],
      },

      /** The reasons the action was surfaced. `tone` keys each glyph. */
      why: {
        title: "Why this action",
        reasons: [
          {
            icon: "search",
            tone: "violet",
            label: "Vehicle Loan enquiry recorded",
          },
          {
            icon: "calendar",
            tone: "amber",
            /* The design reads "commtment" — a typo. */
            label: "Follow-up commitment due today",
          },
          {
            icon: "handshake",
            tone: "green",
            label: "Strong existing customer relationship",
          },
        ],
      },

      approach: {
        title: "Suggested approach",
        body: "Begin with her recent enquiry, confirm the vehicle and purchase timeline, then explain the pre-approved offer and repayment options.",
      },

      /** The two controls across the foot. Drawn, not real controls. */
      actions: {
        secondary: { icon: "person", label: "Open customer view" },
        primary: { icon: "chat", label: "Start guided conversation" },
      },
    },

    /** The small card overlapping the panel's lower-left. */
    whyNow: {
      title: "Why now",
      lines: ["Customer intent is active ·", "Follow-up due today"],
    },
  },

  /**
   * SECTION 6 — see LurnyBiz in action.
   *
   * Copy and two points on the left, the booking form on a card to the right.
   * `form` is in the LeadFormContent shape the shared LeadForm expects.
   *
   * Like the Industries page, this design asks for SIX fields where most of
   * the site uses four, so it supplies the optional `organisation` and
   * `selectC` the form already accepts. Every other caller omits them and is
   * unchanged.
   *
   * NOTE: the form does not send anywhere yet. See the TODO at the top of
   * components/ui/LeadForm.tsx — one fix for the whole site rather than one
   * per page.
   */
  demo: {
    eyebrow: "See LurnyBiz in action",

    /** Split so the lines break where the design breaks them on lg+. */
    headline: [
      "Turn every",
      "business signal",
      "into a clearer",
      "next step.",
    ] as const,

    description:
      "Tell us about your systems, business priorities and operating model. We'll show you how LurnyBiz connects CRM, dashboards, customer conversations and field context to recommend timely, explainable actions.",

    /** The two lines under the rule, each with an icon. */
    points: [
      {
        icon: "clock",
        text: "30 minutes \u00b7 tailored to your systems and business priorities",
      },
      {
        icon: "target",
        text: "See how LurnyBiz turns customer and performance signals into next-best actions",
      },
    ],

    form: {
      name: {
        name: "fullName",
        label: "Full name",
        placeholder: "Your name",
        autoComplete: "name",
      },
      email: {
        name: "workEmail",
        label: "Work email",
        placeholder: "name@company.com",
        autoComplete: "email",
      },

      /** The optional second text field — see the note above. */
      organisation: {
        name: "organisation",
        label: "Organisation",
        placeholder: "Company name",
        autoComplete: "organization",
      },

      selectA: {
        name: "workforceSize",
        label: "Your workforce size",
        options: [
          "Select workforce size",
          "Under 500",
          "500 \u2013 2,000",
          "2,000 \u2013 10,000",
          "10,000 \u2013 50,000",
          "50,000+",
        ],
      },
      selectB: {
        name: "businessPriority",
        label: "Primary business priority",
        options: [
          "Select a business priority",
          "Revenue growth and cross-sell",
          "Frontline performance and coaching",
          "Customer retention and risk",
          "Operational efficiency",
          "Something else",
        ],
        /* Marked required in the design, so it is validated too — see the
           note on `required` in LeadFormContent. */
        required: true,
        error: "Please select a business priority.",
      },
      /** The optional third select — see the note above. */
      selectC: {
        name: "industry",
        label: "Industry",
        options: [
          "Select your industry",
          "Banking & Financial Services",
          "Telecom",
          "Healthcare",
          "Manufacturing",
          "Professional Services",
          "Retail",
          "Something else",
        ],
      },

      detail: {
        name: "systems",
        label: "Which systems should LurnyBiz connect? (optional)",
        placeholder:
          "e.g. CRM, BI dashboards, conversation data or operational systems",
        autoComplete: "off",
      },

      consent: {
        name: "sendOverview",
        label: "Send me the LurnyBiz overview.",
      },

      submit: "Book a LurnyBiz Demo",

      success: {
        title: "Request received.",
        description:
          "We will be in touch within one business day to arrange a time.",
      },

      errors: {
        name: "Please enter your name.",
        email: "Please enter your work email.",
        emailFormat: "Please enter a valid email address.",
        organisation: "Please enter your organisation.",
      },

      /** {0} is replaced by the link below. */
      footnote: {
        text: "Want to explore the wider Lurny platform? {0}",
        links: [{ label: "Talk to a Lurny Specialist.", href: "/platform" }],
      },
    },
  },
} as const;
