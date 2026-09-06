/**
 * FRONTLINE PERFORMANCE PAGE CONTENT
 * ---------------------------------------------------------------------------
 * Copy for /solutions/frontline — the first of the "solutions by business
 * need" detail pages.
 *
 * Section 1 is defined below; further sections are added here as their designs
 * land, following the pattern established by content/solutions-page.ts.
 */

export const frontline = {
  /** Page-level metadata, consumed by the route's `metadata` export. */
  meta: {
    title: "Frontline Performance — Turn Capability into Consistent Results",
    description:
      "Give every branch, sales, service and field employee a clearer path to performing well—by identifying readiness gaps, guiding improvement and learning from real customer interactions.",
    path: "/solutions/frontline",
  },

  hero: {
    eyebrow: "Solutions · Frontline performance",

    /** Split so the lines break where the design breaks them on lg+. */
    headline: ["Turn frontline capability", "into consistent", "performance."],

    description:
      "Give every branch, sales, service and field employee a clearer path to performing well—by identifying readiness gaps, guiding improvement and learning from what happens in real customer interactions.",

    actions: {
      primary: {
        label: "Explore the performance loop",
        href: "#performance-loop",
      },
      secondary: { label: "Talk to us", href: "/contact" },
    },

    /** The line under the buttons, naming the three engines. */
    poweredBy: "Powered by Pulse, Saathi and Pitch",

    /** The three proof points along the bottom of the statement. */
    proof: [
      { icon: "teams", label: ["Stronger", "frontline teams"] },
      { icon: "chart", label: ["Better", "customer experiences"] },
      { icon: "star", label: ["A more capable", "tomorrow"] },
    ],

    /**
     * THE LOOP DIAGRAM
     * ---------------------------------------------------------------------
     * Ananya at the centre, with the three engines around her. Everything
     * except the portrait is drawn in markup rather than shipped as the
     * supplied composite — see scripts/build-frontline-hero-assets.cjs for why.
     */
    loop: {
      /** The portrait, keyed out of the supplied overlay. */
      portrait: {
        src: "/images/solutions/frontline/ananya.webp",
        /** Decorative: the name card beside it carries the meaning. */
        alt: "",
        width: 396,
        height: 396,
      },

      /** The name card under the portrait. */
      person: {
        name: "Ananya",
        role: "Customer Service Executive",
        status: "Readiness improving",
      },

      /**
       * The three engine cards. `tone` keys the palette in the component;
       * `note` is the handwritten annotation that sits beside each one.
       */
      cards: [
        {
          tone: "pulse",
          engine: "Pulse",
          title: "Readiness",
          body: "Needs support in objection handling",
          note: ["Identify", "gaps from", "real work"],
        },
        {
          tone: "saathi",
          engine: "Saathi",
          title: "Guidance",
          body: "Complete a 6-minute practice challenge",
          note: ["Guidance", "to build", "confidence"],
        },
        {
          tone: "pitch",
          engine: "Pitch",
          title: "Performance evidence",
          body: "Missed cross-sell opportunity detected",
          note: ["Learn from", "what happens", "in the field"],
        },
      ],

      /** The annotation on the left of the ring, closing the loop. */
      closingNote: ["Real conversations.", "Real progress."],
    },

    /** The backdrop wash. Decorative, hence the empty alt. */
    backdrop: {
      src: "/images/solutions/frontline/hero-backdrop.webp",
      alt: "",
      width: 1679,
      height: 945,
    },

    /** The script mark in the bottom-left corner of the design. */
    footnote: ["Real people.", "Real progress."],
  },

  /**
   * SECTION 2 — THE FRONTLINE REALITY
   * -------------------------------------------------------------------------
   * The dark problem section: the argument on the left, the branch scene on the
   * right with three "signal" cards floating over it.
   */
  problem: {
    eyebrow: "The frontline reality",

    headline: [
      "The people closest to the",
      "customer often receive the",
      "least contextual support.",
    ],

    body: [
      "Frontline performance is shaped in thousands of everyday moments—a customer question, a sales opportunity, a service concern or a decision made in the field.",
      "Yet the systems intended to support employees rarely see these moments.",
    ],

    /** The four failure states, in the 2x2 grid under the copy. */
    failures: [
      { icon: "readiness", tone: "teal", label: "Readiness is assumed" },
      { icon: "late", tone: "amber", label: "Support arrives too late" },
      {
        icon: "invisible",
        tone: "coral",
        label: "Real work remains invisible",
      },
      {
        icon: "manager",
        tone: "violet",
        label: "Managers lack a clear next action",
      },
    ],

    /** The pulled quote that closes the column. */
    quote:
      "The problem is not a lack of training. It is the disconnect between what the role requires, what the employee can do and what actually happens at work.",

    /**
     * The three signal cards over the scene. Each system reports its own
     * fragment — which is the section's whole point, so the cards are
     * deliberately disconnected from one another by dashed leaders.
     */
    signals: [
      {
        tone: "teal",
        icon: "readiness",
        source: "Learning system",
        reading: "Course completed",
      },
      {
        tone: "amber",
        icon: "late",
        source: "Manager report",
        reading: "Target below plan",
      },
      {
        tone: "coral",
        icon: "interaction",
        source: "Customer interaction",
        reading: "Objection not resolved",
      },
    ],

    /** The caption under the scene, between two hairlines. */
    caption:
      "Each system sees a fragment. No one sees the whole performance picture.",

    /** The branch scene. Decorative: the copy carries the meaning. */
    scene: {
      src: "/images/solutions/frontline/problem-scene.webp",
      alt: "",
      width: 1672,
      height: 941,
    },

    /** The dark wash behind the whole section. */
    backdrop: {
      src: "/images/solutions/frontline/problem-bg.webp",
      alt: "",
      width: 1672,
      height: 941,
    },
  },

  /**
   * SECTION 3 — FROM READINESS TO RESULTS
   *
   * A centred header over the connected-path composite. Only the header is
   * markup; the path itself is the supplied composite, shipped whole — see
   * FrontlinePath for why.
   */
  path: {
    eyebrow: "From readiness to results",

    /** Split so the lines break where the design breaks them on lg+. */
    headline: [
      "One connected path from knowing the gap",
      "to improving the outcome.",
    ],

    description:
      "Frontline capability improves when every signal leads to a useful next action—and every action creates new evidence.",

    /**
     * The four-stage path: cards, portraits, connector and handwritten notes,
     * all in one raster.
     */
    composite: {
      src: "/images/solutions/frontline/path.webp",
      /**
       * NOT decorative, unlike the other rasters on this page: this one is the
       * whole argument of the section, and its four stages appear nowhere in
       * the surrounding copy. So it carries a real description.
       */
      alt: "The four stages of the path: 1 Know — Pulse establishes role readiness by comparing current capability with what the role requires; 2 Guide — Saathi turns the gap into action, bringing learning, practice and coaching into the flow of work; 3 Observe — Pitch learns from real performance, capturing evidence from actual sales and service conversations; 4 Improve — capability is connected to results, giving employees and managers a clearer view of progress and priorities.",
      width: 1600,
      height: 660,
    },

    /** The rail under the composite, marking the four stages. */
    stages: ["From insight", "To action", "To evidence", "To a stronger tomorrow"],
  },

  /**
   * SECTION 4 — PULSE, CAPABILITY INTELLIGENCE
   *
   * The argument on the left, the Pulse console on the right. Everything on
   * the right is imitation product UI built in markup — see FrontlinePulse for
   * why none of the supplied composite crops ship as rasters.
   */
  pulse: {
    eyebrow: "Pulse · Capability intelligence",

    /** Split so the lines break where the design breaks them on lg+. */
    headline: ["Know who is ready\u2014", "and where support will", "make the greatest", "difference."],

    description:
      "Pulse turns role expectations into living capability baselines. It helps every employee understand where they stand, while giving managers a clearer view of the gaps that matter.",

    /** The three capabilities, each with a blush-circled icon. */
    points: [
      { icon: "target", label: "Define what good looks like for every role" },
      { icon: "bars", label: "Diagnose capability through realistic challenges" },
      { icon: "people", label: "Prioritise the gaps most likely to affect performance" },
    ],

    /** The closing line and link under the rule. */
    kicker: "Not another course score. A clearer picture of role readiness.",
    cta: { label: "Explore LurnyPulse", href: "/platform/pulse" },

    /**
     * THE CONSOLE. Imitation UI, so it is aria-hidden and Uncopyable: the copy
     * on the left carries the section's meaning, and a screen reader should not
     * have to wade through a fake dashboard to reach it.
     */
    console: {
      brand: "Lurny.ai",
      context: "Frontline Performance",

      /** The left rail. `active` marks the highlighted item. */
      nav: [
        { icon: "pulse", label: "Pulse", active: true },
        { icon: "people", label: "People", active: false },
        { icon: "roles", label: "Roles", active: false },
        { icon: "bars", label: "Insights", active: false },
        { icon: "settings", label: "Settings", active: false },
      ],

      title: "Role readiness",
      subtitle: "Capability view",
      updated: "Last updated 12 Mar 2025",

      /** The employee the console is showing. */
      person: {
        name: "Ananya Menon",
        role: "Customer Service Executive",
        status: "Developing",
        statusNote: "Building capability across key areas",
        avatar: {
          src: "/images/solutions/frontline/ananya-avatar.webp",
          width: 80,
          height: 80,
        },
      },

      /**
       * The capability radar. Five axes, each scored 0-1 on two series, in the
       * order they are drawn clockwise from the top.
       */
      radar: {
        title: "Capability profile",
        axes: [
          "Product knowledge",
          "Customer focus",
          "Communication",
          "Objection handling",
          "Value selling",
        ],
        series: [
          { key: "current", label: "Current", values: [0.72, 0.6, 0.52, 0.4, 0.58] },
          { key: "baseline", label: "Role baseline", values: [0.92, 0.84, 0.8, 0.78, 0.86] },
        ],
      },

      /** The floating card, top right. */
      priority: {
        title: "Priority capability",
        capability: "Objection handling",
        rows: [
          { label: "Current", value: "2 of 5", fill: 0.4, tone: "coral" },
          { label: "Role baseline", value: "4 of 5", fill: 0.8, tone: "green" },
        ],
      },

      /** The floating card below it. Each row scores 3 of 5. */
      evidence: {
        title: "Evidence",
        rows: [
          { icon: "doc", label: "Pulse assessment", filled: 3 },
          { icon: "check", label: "Scenario challenge", filled: 3 },
          { icon: "people", label: "Manager observation", filled: 3 },
        ],
        total: 5,
      },

      /** The challenge dialog, bottom left. */
      challenge: {
        title: "Check your Pulse",
        step: "1 of 3",
        prompt:
          "A customer is upset because their order has arrived late and they\u2019re threatening to cancel. How would you respond?",
        options: [
          "Apologise, take ownership and offer a solution",
          "Explain the delay was out of your control",
          "Suggest they wait a few more days",
          "Transfer them to a manager",
        ],
        action: "Continue",
      },
    },

    /** The two handwritten notes set beside the console. */
    notes: ["Real people.\nStronger performance.", "From insight\nto impact."],

    /** The blush wash behind the section. */
    backdrop: {
      src: "/images/solutions/frontline/pulse-bg.webp",
      alt: "",
      width: 1672,
      height: 941,
    },
  },

  /**
   * SECTION 7 — MANAGERS AND LEADERS
   *
   * The argument on the left, a leadership dashboard on the right. Everything
   * in the dashboard is imitation product UI built in markup — see
   * FrontlineVisibility for why none of the supplied crops ship as rasters.
   * The figures below drive the heatmap, the bars and the trend line directly.
   */
  visibility: {
    eyebrow: "Visibility that leads to action",

    /** Split so the lines break where the design breaks them on lg+. */
    headline: [
      "See where performance",
      "is changing\u2014and where",
      "support is needed next.",
    ],

    description:
      "Connected readiness, learning and conversation evidence gives managers a more useful view of their teams, while helping leaders see patterns across roles, branches and regions.",

    /** The four capabilities, each with a coloured glyph. */
    points: [
      { icon: "pin", tone: "violet", label: "Readiness by employee, role and location" },
      { icon: "bars", tone: "coral", label: "Capability gaps affecting performance" },
      { icon: "speech", tone: "teal", label: "Conversation quality and missed opportunities" },
      { icon: "trend", tone: "green", label: "Coaching priorities and progress over time" },
    ],

    quote: "Move from reporting what happened to deciding what should happen next.\u201d",

    cta: { label: "See the connected platform", href: "/platform" },

    /**
     * THE DASHBOARD. Imitation UI, so it is aria-hidden and Uncopyable: the
     * copy on the left carries the meaning, and a screen reader should not have
     * to wade through a fake console to reach it.
     */
    board: {
      title: "Frontline performance",
      subtitle: "People. Conversations. Better outcomes.",

      /** The view toggle. `active` marks the selected one. */
      views: [
        { label: "Manager view", active: false },
        { label: "Leadership view", active: true },
      ],
      range: "Last 12 weeks",

      /**
       * The KPI strip. `spark` is a 0-1 series drawn as a mini chart, and
       * `shape` picks how — a line for the three trends, bars for the gaps.
       */
      kpis: [
        {
          icon: "people",
          tone: "teal",
          label: "Overall readiness",
          value: "68%",
          delta: "+6 pts",
          direction: "up",
          shape: "line",
          spark: [0.28, 0.24, 0.38, 0.34, 0.52, 0.62, 0.58, 0.78, 0.86],
        },
        {
          icon: "speech",
          tone: "amber",
          label: "Conversation quality",
          value: "74",
          delta: "+8",
          direction: "up",
          shape: "line",
          spark: [0.2, 0.32, 0.26, 0.44, 0.4, 0.58, 0.7, 0.66, 0.82],
        },
        {
          icon: "trend",
          tone: "blue",
          label: "Employees improving",
          value: "63%",
          delta: null,
          direction: "up",
          shape: "line",
          spark: [0.24, 0.34, 0.3, 0.46, 0.56, 0.5, 0.68, 0.76, 0.88],
        },
        {
          icon: "alert",
          tone: "coral",
          label: "Priority gaps",
          value: "4",
          delta: null,
          direction: "up",
          shape: "bars",
          spark: [0.18, 0.3, 0.26, 0.44, 0.56, 0.7, 0.84, 1],
        },
      ],

      /**
       * The readiness heatmap. Each cell is a 0-5 step on the scale beneath
       * it, running "needs support" to "ready".
       */
      heatmap: {
        title: "Readiness across locations",
        columns: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        rows: [
          { label: "South", cells: [4, 3, 5, 4, 4, 2] },
          { label: "West", cells: [4, 1, 2, 4, 4, 5] },
          { label: "North", cells: [2, 4, 1, 4, 2, 2] },
          { label: "East", cells: [0, 2, 4, 3, 4, 4] },
        ],
        legend: { low: "Needs support", high: "Ready" },
      },

      /** The capability bars. `fill` is 0-1; the label shows the percentage. */
      capabilities: {
        title: "Capabilities affecting performance",
        rows: [
          { label: "Objection handling", fill: 0.72, tone: "coral" },
          { label: "Closing conversations", fill: 0.58, tone: "coral" },
          { label: "Product knowledge", fill: 0.46, tone: "amber" },
          { label: "Customer discovery", fill: 0.38, tone: "amber" },
        ],
      },

      /** The 12-week trend. Two series, each 0-100 against the same weeks. */
      trend: {
        title: "Progress over 12 weeks",
        ticks: ["W1", "W3", "W5", "W7", "W9", "W11", "W12"],
        axis: [0, 25, 50, 75, 100],
        series: [
          {
            key: "readiness",
            label: "Readiness",
            values: [32, 46, 49, 53, 58, 62, 66, 71, 74, 78, 80, 85],
          },
          {
            key: "quality",
            label: "Conversation quality",
            values: [27, 33, 36, 44, 47, 50, 56, 61, 64, 67, 69, 74],
          },
        ],
      },

      /** The coaching panel, overlapping the two charts below it. */
      coaching: {
        title: "This week\u2019s coaching priorities",
        people: [
          {
            name: "Ananya Menon",
            focus: "Objection handling",
            avatar: "/images/solutions/frontline/coach-ananya.webp",
          },
          {
            name: "Rahul Das",
            focus: "Customer discovery",
            avatar: "/images/solutions/frontline/coach-rahul.webp",
          },
          {
            name: "Maya Shah",
            focus: "Closing conversations",
            avatar: "/images/solutions/frontline/coach-maya.webp",
          },
        ],
        action: "View team actions",
      },

      /** The missed-opportunity panel. Bars fall left to right, which is good. */
      missed: {
        title: "Missed opportunity trend",
        bars: [1, 0.86, 0.72, 0.72, 0.55, 0.46, 0.33, 0.29, 0.19],
        delta: "Down 18% this month",
        note: "Fewer missed opportunities across all locations compared to last month.",
      },

      footer: { note: "Turning frontline potential into performance.", brand: "Lurny.ai" },
    },

    /** The dark ground behind the section. */
    backdrop: {
      src: "/images/solutions/frontline/visibility-bg.webp",
      alt: "",
      width: 1672,
      height: 941,
    },
  },
} as const;
