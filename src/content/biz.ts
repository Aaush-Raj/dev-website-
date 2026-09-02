/**
 * LURNYBIZ PAGE CONTENT
 * ---------------------------------------------------------------------------
 * Copy for the LurnyBiz product page at /platform/biz.
 *
 * Sections 1 to 3 are defined below; further sections are added here as their
 * designs land. Copy is verbatim from the supplied "LURNYBIZ.txt".
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
      primary: { label: "Book a demo", href: "/demo" },
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
} as const;
