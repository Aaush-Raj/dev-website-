/**
 * LURNYCAMPUS PAGE CONTENT
 * ---------------------------------------------------------------------------
 * Copy for the LurnyCampus page at /campus.
 *
 * Section 1 is defined below; further sections are added here as their designs
 * land. Copy is verbatim from the section-1 design.
 */

export const campus = {
  /** Page-level metadata, consumed by the route's `metadata` export. */
  meta: {
    title: "LurnyCampus — Learning to Readiness",
    description:
      "Help every student discover what to do next, build capability through learning, practice, projects and mentorship, and create evidence of what they can actually do.",
    path: "/campus",
  },

  hero: {
    eyebrow: "LurnyCampus · Learning to Readiness",

    /**
     * Split so the lines break where the design breaks them on lg+. The design
     * sets an orange full stop after the last word, so the headline is split
     * from its terminal period rather than carrying it inline.
     */
    headline: [
      "Move from academic",
      "learning to demonstrated",
      "industry readiness",
    ],

    description:
      "Help every student discover what to do next, build capability through learning, practice, projects and mentorship, and create evidence of what they can actually do.",

    actions: {
      primary: { label: "Explore the Campus Experience", href: "#experience" },
      secondary: { label: "Talk to Us", href: "/contact" },
    },

    /**
     * The photograph behind the panels: a student working at a laptop in a
     * library. `alt` is empty because the image is decorative — the panels in
     * front of it carry the section's meaning.
     */
    backdrop: {
      src: "/assets/images/campus/hero-backdrop.webp",
      alt: "",
      width: 1672,
      height: 941,
    },

    /**
     * The three floating panels on the right. Drawn in markup rather than
     * shipped as images so they stay sharp at every density and their type
     * stays selectable — see CampusPanels.tsx.
     */
    panels: {
      /** The readiness dial. `value` drives both the ring and the label. */
      readiness: {
        title: "Industry Readiness",
        value: 68,
        /** `fill` is the track proportion, 0–1, measured from the design. */
        metrics: [
          { icon: "knowledge", label: "Knowledge", fill: 0.82 },
          { icon: "practice", label: "Practice", fill: 0.64 },
          { icon: "demonstration", label: "Demonstration", fill: 0.46 },
          { icon: "validation", label: "Validation", fill: 0.35 },
        ],
      },

      nextAction: {
        eyebrow: "Next Best Action",
        title: "Complete your SQL project brief",
        action: "Continue",
      },

      project: {
        eyebrow: "Project",
        title: "Retail Demand Analysis",
        meta: "Mentor review · Friday",
        mentor: { name: "Mentor: Asha Menon", initials: "AM" },
      },
    },

    /**
     * The four questions along the section's foot. Each is the question a
     * student asks at that stage of the journey.
     */
    questions: [
      { icon: "where", label: "Where am I?" },
      { icon: "next", label: "What should I do next?" },
      { icon: "capable", label: "What am I becoming capable of?" },
      { icon: "ready", label: "How ready am I?" },
    ],
  },

  /**
   * SECTION 2 — the readiness gap, and the journey that closes it.
   * The problem is stated on the left; the right shows LurnyCampus joining the
   * same activities into one connected path.
   */
  gap: {
    eyebrow: "The readiness gap",

    headline: [
      "Completing learning is not",
      "the same as becoming",
      "industry-ready",
    ],

    description:
      "Students may finish courses, pass assessments and collect certificates\u2014yet still struggle to understand what they can apply, what evidence they have built and what they should do next.",

    /** The three symptoms, each behind its own outlined tile. */
    problems: [
      {
        icon: "disconnected",
        title: "Activity without a connected journey",
        description:
          "Learning, assessments, projects and mentoring often remain disconnected.",
      },
      {
        icon: "scores",
        title: "Scores without demonstrated capability",
        description:
          "Marks may show understanding, but not whether a student can produce an authentic outcome.",
      },
      {
        icon: "direction",
        title: "Progress without direction",
        description:
          "Students see what they completed\u2014not the next action that will move them closer to their goal.",
      },
    ],

    /** The diagram on the right. */
    journey: {
      eyebrow: "LurnyCampus connects the journey",

      /**
       * The five rail stages. `accent: true` marks APPLY, which the design
       * picks out in coral because it is the hinge the three outcomes hang off.
       */
      stages: [
        { icon: "learn", label: "Learn", caption: ["Build", "understanding"] },
        {
          icon: "practise",
          label: "Practise",
          caption: ["Use the", "knowledge"],
        },
        {
          icon: "apply",
          label: "Apply",
          caption: ["Solve real", "problems"],
          accent: true,
        },
        {
          icon: "demonstrate",
          label: "Demonstrate",
          caption: ["Create an", "outcome"],
        },
        {
          icon: "validate",
          label: "Validate",
          caption: ["Gain credible", "feedback"],
        },
      ],

      /** The terminal node the rail curves down into. */
      ready: {
        label: "Ready",
        caption: ["Show what", "you can do"],
      },

      /** The three chips that hang below the rail. */
      outcomes: [
        { icon: "compass", label: "Next Best Action" },
        { icon: "bars", label: "Evidence grows" },
        { icon: "refresh", label: "Readiness evolves" },
      ],

      footnote:
        "Every meaningful activity strengthens capability, creates evidence or identifies the next step.",
    },
  },

  /**
   * SECTION 3 — the personalised journey.
   * The claim on the left; a mockup of the student's own Campus home on the
   * right, standing as the evidence for it.
   */
  journey: {
    eyebrow: "A journey built around each student",

    headline: ["Always know what to", "explore\u2014and what to", "do next"],

    description:
      "LurnyCampus brings learning, projects, mentors, events and opportunities into one personalised experience. It recommends the next meaningful action based on each student's goals, progress and evolving readiness.",

    /** The three claims under the copy, each behind a coral ring. */
    points: [
      {
        icon: "compass",
        title: "Discover what matters",
        description: "Relevant learning, experts, projects and events.",
      },
      {
        icon: "target",
        title: "Move forward with purpose",
        description: "A clear Next Best Action for every stage.",
      },
      {
        icon: "growth",
        title: "Stay connected to the goal",
        description: "See how each activity strengthens readiness.",
      },
    ],

    /**
     * The product mockup. Every string below is real text in the markup rather
     * than pixels in a screenshot — see CampusHome.tsx.
     */
    app: {
      brand: "Campus",
      searchPlaceholder: "Search topics, skills, creators, content...",
      user: { name: "Ananya Rao", role: "Data Analyst", initials: "AR" },

      feed: {
        title: "For you",
        subtitle: "Your personalised feed",

        /**
         * `tone` picks the thumbnail's gradient in CampusHome; the design
         * gives each course its own: teal, violet and deep teal.
         */
        items: [
          {
            tone: "teal",
            thumbTitle: ["SQL", "Joins", "Explained"],
            title: "SQL Joins Explained",
            author: "Dr. Arvind Rao",
            progress: 60,
            meta: "12:48",
          },
          {
            tone: "violet",
            thumbTitle: ["Power BI", "Dashboards"],
            title: "Power BI Dashboards",
            author: "Karthik Iyer",
            progress: 25,
            meta: "18:35",
          },
          {
            tone: "deep",
            thumbTitle: ["Customer Churn", "SQL Challenge"],
            title: "Customer Churn SQL Challenge",
            author: "LurnyCampus",
            progress: 0,
            meta: "25 min",
          },
        ],
      },

      readiness: {
        title: "Your Readiness",
        value: 54,
        stage: "Developing",
        delta: "+8% this week",
      },

      nextAction: {
        eyebrow: "Next Best Action",
        title: ["Complete the Customer", "Churn SQL Challenge"],
        reason: "Why now: Builds evidence in Practice + Demonstration",
        action: "Start challenge",
      },

      mentor: {
        title: "Mentor session",
        name: "Priya Menon",
        when: "Tomorrow, 5:00 PM",
      },
    },

    /**
     * The contour texture behind the section. Decorative, so `alt` is empty.
     */
    backdrop: {
      src: "/assets/images/campus/journey-contours.webp",
      alt: "",
      width: 1672,
      height: 941,
    },
  },

  /**
   * SECTION 4 — learn by doing.
   * The claim on the left; a project workspace on the right, with the mentor's
   * verdict and the evidence it produced floating off it.
   */
  doing: {
    eyebrow: "Learn by doing",

    headline: ["Turn knowledge into", "work students can show"],

    description:
      "Courses are only the starting point. LurnyCampus connects practice, real projects, submissions and expert feedback\u2014helping students demonstrate what they can do and build evidence that strengthens their readiness.",

    /** The three claims under the copy. */
    points: [
      {
        icon: "target",
        title: "Practise in context",
        description:
          "Apply knowledge through challenges and realistic problem-solving.",
      },
      {
        icon: "growth",
        title: "Build through projects",
        description: "Work against structured briefs, milestones and outcomes.",
      },
      {
        icon: "shield",
        title: "Create credible evidence",
        description: "Capture completed work, mentor feedback and validation.",
      },
    ],

    /**
     * The project workspace mockup. As in section 3, every string here is real
     * text in the markup rather than pixels — see CampusProject.tsx.
     */
    project: {
      brand: "Campus",
      role: "Junior Financial Analyst",
      term: "Year 2 \u00b7 Sem 1",
      here: "You are here",

      title: "Quarterly Expense Variance Analysis",
      status: "In progress",
      skills: ["Financial Statement Analysis", "Analytical Problem Solving"],

      progressTitle: "Project progress",
      /** `state` drives the milestone's mark: done, or the current step. */
      milestones: [
        { label: "Brief reviewed", note: "Complete", state: "done" },
        {
          label: "Variance analysis submitted",
          note: "Complete",
          state: "done",
        },
        { label: "Mentor review", note: "In progress", state: "current" },
      ],

      /**
       * The artefact preview. Its chart is drawn from these numbers rather
       * than shipped flat, so it stays sharp — see CampusArtefact.tsx.
       */
      artefact: {
        eyebrow: "Latest artefact",
        title: "Expense Variance Dashboard",
        /** Paired actual/budget bars, as proportions of the plot height. */
        bars: [
          { actual: 0.52, budget: 0.34 },
          { actual: 0.74, budget: 0.46 },
          { actual: 0.61, budget: 0.83 },
          { actual: 0.88, budget: 0.55 },
          { actual: 0.47, budget: 0.68 },
          { actual: 0.7, budget: 0.42 },
        ],
        /** The donut's single overspend slice, as a proportion. */
        donut: 0.18,
        /** The variance table beneath the charts. */
        rows: [
          {
            label: "Payroll",
            budget: "5,200",
            actual: "5,010",
            variance: "-3.7%",
          },
          {
            label: "Software",
            budget: "1,800",
            actual: "1,935",
            variance: "+7.5%",
          },
          {
            label: "Travel",
            budget: "2,400",
            actual: "2,180",
            variance: "-9.2%",
          },
          {
            label: "Facilities",
            budget: "3,100",
            actual: "3,240",
            variance: "+4.5%",
          },
        ],
      },
    },

    /** The mentor's verdict, floating off the project card. */
    mentor: {
      name: "Kavita Menon",
      role: "Industry mentor",
      quote: "Clear analysis with actionable recommendations.",
      badge: "Validated",
      avatar: {
        src: "/assets/images/campus/mentor-kavita-menon.webp",
        /** A named person, so the portrait is described rather than hidden. */
        alt: "Kavita Menon",
        width: 87,
        height: 87,
      },
    },

    /** What the completed work added to the student's record. */
    evidence: {
      title: "Evidence added",
      items: ["Demonstration", "Validation", "Passport updated"],
    },
  },

  /**
   * SECTION 5 — guidance at every step.
   * The claim on the left; a support workspace on the right where a student's
   * question runs through Campus AI, a mentor match and that mentor's own AI.
   */
  guidance: {
    eyebrow: "Guidance at every step",

    headline: [
      "Human mentorship",
      "when it matters. AI",
      "support whenever it\u2019s",
      "needed",
    ],

    description:
      "LurnyCampus connects students with faculty and industry mentors for meaningful guidance, while Campus AI provides contextual support across learning, projects, goals and career decisions.",

    /**
     * The three claims. Each is joined to the workspace by a dashed connector
     * on lg+ — see CampusGuidance.
     */
    points: [
      {
        icon: "mentorSearch",
        title: "Find the right mentor",
        description:
          "Match expertise to the student's goals and capability needs.",
      },
      {
        icon: "target",
        title: "Turn conversations into progress",
        description:
          "Connect guidance and feedback to active projects and goals.",
      },
      {
        icon: "chat",
        title: "Get unstuck at any time",
        description:
          "Ask for explanations, resources and the next meaningful action.",
      },
    ],

    /**
     * The support workspace. As with the other product mockups, every string
     * here is real text in the markup — see CampusSupport.tsx.
     */
    workspace: {
      brand: "Campus",
      title: "Support for your journey",
      role: "Junior Financial Analyst",

      question:
        "I\u2019m preparing the Quarterly Expense Variance Analysis. What should I focus on before mentor review?",

      ai: {
        name: "Campus AI",
        answer:
          "Review your variance narrative and make sure every recommendation is supported by evidence.",
        /** The two sources the answer cites. */
        sources: ["FP&A fundamentals", "Reading the 3 statements"],
      },

      mentor: {
        name: "Kavita Menon",
        role: "Industry Mentor \u00b7 FP&A",
        rating: "4.8",
        sessions: "22 mentoring sessions",
        action: "Request mentorship",
        avatar: {
          src: "/assets/images/campus/mentor-kavita-menon-vector.webp",
          /** A named person, so the portrait is described rather than hidden. */
          alt: "Kavita Menon",
          width: 107,
          height: 107,
        },
      },

      /** The mentor's own trained assistant, below the match. */
      mentorAi: {
        pill: "AI preparation",
        title: "Chat with Kavita Menon\u2019s AI",
        subtitle:
          "Trained on her guidance\u2014available between live sessions.",
        message:
          "Bring your three largest variances, root-cause evidence and one actionable recommendation.",
      },

      session: {
        title: "Mentor session \u00b7 Tuesday, 4:00 PM",
        badge: "Topics prepared",
      },
    },
  },

  /**
   * SECTION 6 — the capability passport.
   * The claim on the left; the student's passport, the roles it opens and the
   * next step it recommends on the right.
   */
  passport: {
    eyebrow: "Capability passport",

    headline: ["Graduate with proof", "of what you can do"],

    description:
      "LurnyCampus brings learning, practice, projects, assessments, mentorship and industry exposure into one evolving record of capability.",

    /** The three claims, each behind a soft mint tile. */
    points: [
      {
        icon: "document",
        title: "Build evidence\u2014not just completion records",
        description:
          "Projects, practice and mentor validation demonstrate applied capability.",
      },
      {
        icon: "growth",
        title: "See readiness develop over time",
        description:
          "Track capability levels, close gaps and know what to work on next.",
      },
      {
        icon: "briefcase",
        title: "Show employers more than a r\u00e9sum\u00e9",
        description:
          "Present validated skills, completed work and role readiness.",
      },
    ],

    /** The passport card itself. */
    card: {
      eyebrow: "Industry Readiness Passport",
      student: {
        name: "Priya Nair",
        course: "B.Com \u00b7 Finance & Accounting",
        initials: "PN",
      },
      role: "Junior Financial Analyst",
      readiness: "54% \u00b7 Developing",

      /**
       * The four skill tiles. `tone` picks the tile's colour — amber for
       * on-track, red for behind — and `trend` its arrow: up, flat or down.
       */
      skills: [
        {
          name: "Accounting Fundamentals",
          level: "L2",
          trend: "up",
          target: "Target L3",
          confidence: "Medium confidence",
          tone: "amber",
        },
        {
          name: "Financial Statement Analysis",
          level: "L2",
          trend: "flat",
          target: "Target L3",
          confidence: "Medium confidence",
          tone: "amber",
          /** The design stars this one as the skill in focus. */
          starred: true,
        },
        {
          name: "Ratio & Trend Analysis",
          level: "L1",
          trend: "down",
          target: "Target L2",
          confidence: "Low confidence",
          tone: "red",
        },
        {
          name: "Business Communication",
          level: "L1",
          trend: "flat",
          target: "Target L2",
          confidence: "Low confidence",
          tone: "red",
        },
      ],

      evidenceTitle: "Evidence added",
      evidence: [
        {
          icon: "document",
          label: ["Project \u00b7", "Quarterly Expense", "Variance Analysis"],
        },
        { icon: "person", label: ["Mentor", "validation"] },
        { icon: "clock", label: ["4 CPD", "hours"] },
      ],
    },

    /** The role the passport currently opens, with its radar. */
    opportunity: {
      eyebrow: "Ready for opportunities",
      role: ["Junior Financial", "Analyst"],
      match: "75% match",

      /**
       * The radar chart. Five axes; `you` and `required` are proportions of
       * each axis, measured from the design's plot.
       */
      axes: [
        { label: "Accounting", you: 0.58, required: 0.88 },
        { label: "Analysis", you: 0.44, required: 0.92 },
        { label: "Reporting", you: 0.66, required: 0.8 },
        { label: "Communication", you: 0.36, required: 0.76 },
        { label: "Tools", you: 0.5, required: 0.84 },
      ],
      legend: { you: "Your level", required: "Required" },
    },

    /** The recommendation hanging below the passport. */
    nextStep: {
      eyebrow: "Your next best step",
      title: ["Accrual Adjustments", "Practice Challenge"],
      meta: "14 min \u00b7 Applied practice",
    },
  },
} as const;
