/**
 * LURNYBIZ PAGE CONTENT
 * ---------------------------------------------------------------------------
 * Copy for the LurnyBiz product page at /platform/biz.
 *
 * Section 1 is defined below; further sections are added here as their designs
 * land. Copy is verbatim from the supplied "LURNYBIZ.txt".
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
} as const;
