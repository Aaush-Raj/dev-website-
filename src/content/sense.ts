/**
 * LURNYSENSE PAGE CONTENT
 * ---------------------------------------------------------------------------
 * Copy for the LurnySense product page at /platform/sense.
 *
 * Section 1 is defined below; further sections are added here as their designs
 * land. Copy is verbatim from "LurnySense_Text_Content.txt".
 */

export const sense = {
  /** Page-level metadata, consumed by the route's `metadata` export. */
  meta: {
    title: "LurnySense — Your Data, Your Questions, Clear Answers",
    description:
      "Explore dashboards, ask deeper questions and build reports through simple conversations. Reuse insights saved by your team, all in one place.",
    path: "/platform/sense",
  },

  hero: {
    eyebrow: "LurnySense / Business intelligence",

    /**
     * Three lines, each closing with an amber full stop. Split so the design's
     * line breaks are the content's, not a wrapping accident.
     */
    headline: ["Your data", "Your questions", "Clear answers"],

    description:
      "Explore dashboards, ask deeper questions and build reports through simple conversations. Reuse insights saved by your team—all in one place.",

    actions: {
      primary: { label: "Explore LurnySense", href: "#how-it-works" },
      secondary: { label: "Book a demo", href: "/demo" },
    },

    /** The three capabilities under the actions. */
    meta: ["Dashboards", "Conversational analytics", "Saved reports"],

    /**
     * The dashboard mockup. Rebuilt in markup rather than shipped as the
     * supplied crops — see SenseDashboard.tsx.
     */
    dashboard: {
      brand: "LurnySense",
      subtitle: "Business intelligence for your organisation",
      period: "This month",

      /** The left rail. The first is the one the design shows selected. */
      nav: [
        { icon: "overview", label: "Overview", active: true },
        { icon: "engagement", label: "Engagement" },
        { icon: "content", label: "Content" },
        { icon: "skills", label: "Skills" },
      ],

      /** The three figures across the top. */
      stats: [
        { icon: "report", value: "437", label: "Assignments" },
        { icon: "people", value: "85", label: "Completed" },
        { icon: "chart", value: "59.2%", label: "Avg quiz score" },
      ],

      /** The completion-trend line chart. `values` are percentages. */
      trend: {
        title: "Completion trend",
        axis: [100, 75, 50, 25, 0],
        points: [
          { label: "Week 1", value: 68 },
          { label: "Week 2", value: 22 },
          { label: "Week 3", value: 38 },
          { label: "Week 4", value: 40 },
          { label: "Week 5", value: 24 },
        ],
      },

      /** The content-performance bars. */
      performance: {
        title: "Content performance",
        rows: [
          { label: "Lurny", value: 78 },
          { label: "Quiz", value: 62 },
          { label: "Playlist", value: 49 },
          { label: "Course", value: 37 },
        ],
      },
    },

    /**
     * The conversation overlay: a question, the answer with its chart, a
     * follow-up, the composer, and what the exchange was saved as.
     */
    conversation: {
      question: "What's our average quiz score?",

      answer: {
        /** Split so the figure can be emphasised without markup in the copy. */
        before: "The average quiz score is ",
        figure: "59.2%",
        after: " across 43 scored attempts.",

        chart: {
          title: "Score distribution",
          axis: [12, 9, 6, 3, 0],
          bars: [
            { label: "0-20", value: 9 },
            { label: "21-40", value: 4 },
            { label: "41-60", value: 8 },
            { label: "61-80", value: 11 },
            { label: "81-100", value: 11 },
          ],
        },
      },

      followUp: "Break that down by department.",

      composer: {
        placeholder: "Ask a follow-up question…",
        save: "Save report",
      },

      reports: {
        title: "Team reports",
        link: "View all",
        item: {
          title: "Quiz performance overview",
          meta: "Created through conversation · Saved by an admin",
          status: "Available to your team",
        },
      },
    },

    /** The note marking the whole visual as a mockup. */
    disclaimer: "Illustrative view",
  },

  /**
   * SECTION 2 — the insight gap, and what LurnySense opens up.
   *
   * The problem is stated on the left as three symptoms; the right shows the
   * same journey working — a dashboard, a question about it, and the report the
   * answer became — joined by a connector path.
   */
  gap: {
    problem: {
      eyebrow: "The insight gap",

      /** Split so the lines break where the design breaks them on lg+. */
      headline: [
        "Your next question",
        "shouldn't have to wait",
        "for the next report",
      ],

      description:
        "Dashboards help you monitor the business. But new questions often mean more filters, spreadsheet exports or a request for another report.",

      /** The three symptoms, each behind an outlined tile. */
      items: [
        {
          icon: "dashboardQuestion",
          title: "Questions beyond the dashboard",
          description:
            "Standard views don't always answer the question you need to ask.",
        },
        {
          icon: "reportWait",
          title: "Follow-ups become reporting requests",
          description:
            "A simple comparison can turn into another export or a wait for support.",
        },
        {
          icon: "findAnalysis",
          title: "Useful analysis is hard to reuse",
          description:
            "One-off findings get buried in files instead of becoming shared reports.",
        },
      ],
    },

    solution: {
      eyebrow: "LurnySense opens up the answers",

      headline: "See the picture. Ask more. Keep the insight.",

      /** Card 1: the dashboard you start from. */
      dashboard: {
        title: "Monitor your dashboards",
        /** Bar heights as proportions, read off the design's chart. */
        bars: [0.62, 0.44, 0.78, 0.52, 0.86, 0.58, 0.7, 0.48, 0.82, 0.66],
      },

      /** Card 2: the question, and the answer it returns. */
      question: {
        text: "Which departments have the lowest completion rates?",
        chartTitle: "Completion by department",
        rows: [
          { label: "Operations", value: 0.55 },
          { label: "Sales", value: 0.72 },
          { label: "Support", value: 0.86 },
        ],
        disclaimer: "Illustrative view",
        followUp: "Compare them with last month.",
      },

      /** Card 3: what the exchange was saved as. */
      saved: {
        title: "Save it for the team",
        reportTitle: "Department completion comparison",
        meta: "Created through conversation · Saved by an admin",
        action: "Open report",
      },

      /** The three capabilities along the section's foot. */
      capabilities: [
        { icon: "analytics", label: "Standard analytics" },
        { icon: "conversation", label: "Conversational exploration" },
        { icon: "reusable", label: "Reusable team reports" },
      ],

      footnote:
        "Start with a dashboard or a question. Turn the answer into a report your team can use.",
    },
  },

  /**
   * SECTION 3 — one question opening onto the next.
   *
   * The left is the claim over a photograph; the right is the exchange it
   * describes, threaded as a transcript: three questions, each answered with
   * its own chart, closing on the report the thread was saved as.
   */
  flow: {
    eyebrow: "Intelligence, in conversation",

    headline: "One question opens up the next.",

    description:
      "Ask in everyday language. Explore the answer, follow your curiosity and save the report for your team.",

    /** The photograph under the copy, and the caption beneath it. */
    image: {
      src: "/assets/images/sense/woman-at-laptop.webp",
      alt: "A woman working at a laptop in a bright office.",
      width: 792,
      height: 619,
    },

    caption: "A natural way to explore your data.",

    /** The avatar beside each question in the transcript. */
    avatar: {
      src: "/assets/images/sense/woman-avatar.webp",
      width: 48,
      height: 48,
    },

    /** The panel's title bar. */
    brand: "LurnySense",
    subtitle: "Your analytics conversation",

    /**
     * The transcript. Each turn is a question and the answer it returns; the
     * answer's `chart` names which shape to draw, and the shapes are built in
     * markup rather than shipped as images.
     */
    turns: [
      {
        question: "How are learning completions looking this month?",
        answer: "Here's your completion overview.",
        chart: {
          kind: "line",
          title: "Completion trend",
          /** Read off the design, as proportions of the plot height. */
          points: [
            0.18, 0.22, 0.2, 0.3, 0.34, 0.31, 0.42, 0.46, 0.52, 0.5, 0.62, 0.68,
            0.66, 0.78, 0.86,
          ],
        },
      },
      {
        question: "Which departments are falling behind?",
        answer: "Let's compare completion rates by department.",
        chart: {
          kind: "bars",
          rows: [
            { label: "Operations", value: 0.86 },
            { label: "Sales", value: 0.62 },
            { label: "Support", value: 0.38 },
          ],
        },
      },
      {
        question: "Compare those with last month.",
        answer: "Here's this month compared with last month.",
        chart: {
          kind: "grouped",
          /** Paired bars per department: this month, then last. */
          groups: [
            { label: "Operations", current: 0.92, previous: 0.7 },
            { label: "Sales", current: 0.66, previous: 0.5 },
            { label: "Support", current: 0.44, previous: 0.34 },
          ],
          legend: [
            { label: "This month", tone: "current" },
            { label: "Last month", tone: "previous" },
          ],
        },
      },
    ],

    /** The save row closing the transcript. */
    save: {
      action: "Save report",
      report: {
        title: "Department completion report",
        meta: "Saved for your team",
      },
    },

    composer: {
      placeholder: "Ask your next question…",
    },

    disclaimer: "Illustrative conversation",
  },

  /**
   * SECTION 4 — the demo booking.
   *
   * The pitch on the left, the shared LeadForm on a card to the right. The
   * design asks for six fields where most pages ask for four; the sixth is a
   * free-text "current analytics tool", so the form's optional `textC` field
   * carries it.
   */
  demo: {
    eyebrow: "See LurnySense in action",

    /** Split so the lines break where the design breaks them on lg+. */
    headline: ["Better questions.", "Clearer insights.", "Smarter decisions."],

    description:
      "Tell us what your team needs to understand. We'll show you how LurnySense brings dashboards, conversational analytics and saved reports together.",

    /** The two lines under the rule, each with an icon. */
    points: [
      {
        icon: "clock",
        text: "30 minutes · tailored to your analytics needs",
      },
      {
        icon: "chartBubble",
        text: "Explore your questions. See how answers become useful reports.",
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
          "500 – 2,000",
          "2,000 – 10,000",
          "10,000 – 50,000",
          "50,000+",
        ],
      },
      selectB: {
        name: "useCase",
        label: "Primary use case",
        options: [
          "Select a use case",
          "Learning and completion reporting",
          "Skills and capability insight",
          "Engagement and adoption",
          "Compliance and audit readiness",
          "Something else",
        ],
        /* Marked required in the design, so it is validated too — see the
           note on `required` in LeadFormContent. */
        required: true,
        error: "Please select a use case.",
      },

      /** The free-text sixth field — see the note on `textC`. */
      textC: {
        name: "analyticsTool",
        label: "Current analytics tool",
        placeholder: "e.g. Excel, Power BI or other",
        autoComplete: "off",
      },

      detail: {
        name: "understand",
        label: "What would you like to understand? (optional)",
        placeholder:
          "Tell us about the questions or reporting challenges your team faces",
        autoComplete: "off",
      },

      consent: {
        name: "sendOverview",
        label: "Send me the LurnySense overview.",
      },

      submit: "Book a LurnySense Demo",

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
