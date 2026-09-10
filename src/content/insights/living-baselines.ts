/**
 * INSIGHT ARTICLE — "From competency documents to living baselines"
 * ---------------------------------------------------------------------------
 * Card 4 of the Insights "Ideas worth exploring" grid, at
 * /resources/insights/living-baselines.
 *
 * Copy is VERBATIM from the supplied HTML export, punctuation included.
 *
 * ITS ACCENT IS TERRACOTTA (#E46C5A) — the category rule, the rail's active
 * marker, the callout borders and every step number. It shares the first
 * article's category ("Capability & readiness") but not its violet: violet
 * appears here only inside the diagrams.
 *
 * IT CITES THREE SOURCES (WEF, NIST NICE, ILO), each listed at the foot with
 * both its USE and its QUALIFICATION — the export is careful to say what each
 * source is being borrowed for and where it stops applying. Both halves are
 * copy, not commentary, so both are kept.
 *
 * Emphasis and inline citations are modelled as splices rather than markup in
 * the strings, so a bolded phrase or a link stays attached to its sentence.
 */

export const livingBaselines = {
  meta: {
    title: "From competency documents to living baselines",
    description:
      "Competency frameworks create value only when they reflect the work people are doing now, the evidence available today and the capability the organisation needs next.",
    path: "/resources/insights/living-baselines",
  },

  breadcrumb: ["Resources", "Insights"],

  category: "Capability & readiness",

  title: "From competency documents to living baselines",

  standfirst:
    "Competency frameworks create value only when they reflect the work people are doing now, the evidence available today and the capability the organisation needs next.",

  facts: ["5 min read", "Lurny Insights"],

  actions: {
    read: { label: "Read article", href: "#s1" },
    listen: { label: "Audio version", href: "#listen" },
  },

  /**
   * THE AUDIO EDITION — enabled, like the first and third articles'. Runs the
   * same simulated clock, to 05:40.
   */
  audio: {
    eyebrow: "Listen to this insight",
    title: "From competency documents to living baselines",
    description: "A conversational audio version of this article.",

    /** Seconds. 340 = the 05:40 the export displays. */
    duration: 340,
    durationLabel: "05:40",

    transcriptLabel: "View transcript",
    footnote: "Lurny Insights · Audio edition",

    transcript: [
      {
        time: "00:00",
        text: "A competency framework often arrives as the end of a substantial project. Then the work changes.",
      },
      {
        time: "01:12",
        text: "What a baseline changes, and why it starts with the work, not the label.",
      },
      {
        time: "02:40",
        text: "The four elements that make a baseline living.",
      },
      {
        time: "03:55",
        text: "A practical operating rhythm for keeping it current.",
      },
      { time: "05:05", text: "Living does not mean limitless." },
    ],
  },

  rail: {
    title: "In this insight",
    mobileLabel: "Contents",
    items: [
      { id: "s1", label: "The role keeps moving" },
      { id: "s2", label: "What a baseline changes" },
      { id: "s3", label: "Begin with the work" },
      { id: "s4", label: "What makes it living?" },
      { id: "s5", label: "A relationship-manager example" },
      { id: "s6", label: "An operating rhythm" },
      { id: "s7", label: "Living, not limitless" },
      { id: "s8", label: "A framework that works" },
    ],
    tools: {
      share: "Share",
      copy: { idle: "Copy link", done: "Link copied" },
      print: "Print",
    },
  },

  /* =========================== The article ============================ */

  /** s1 — the document finishes; the role does not. */
  moving: {
    heading: "The document is finished. The role is not.",
    body: [
      "A competency framework often arrives as the end of a substantial project. Roles have been mapped, proficiency levels approved and a common language published.",
      "Then the work changes.",
      "A new system alters decisions. A regulation adds a different standard of care. An AI assistant removes one routine task while making verification and judgement more important.",
      "The document remains accurate to the moment in which it was completed. The role keeps moving.",
    ],

    /**
     * The WEF statistic, on its own card. The figure is emphasised and the
     * qualification travels with it — the export is careful that 39% is a
     * forecast rather than a measured expiry rate.
     */
    stat: {
      before: "In the World Economic Forum’s 2025 survey, employers expected ",
      strong: "39% of workers’ core skills",
      after:
        " to change by 2030. This is a forecast, not an expiry date for every skill or role. It does show the scale of change organisations are preparing for.",
      link: {
        label: "Read the skills outlook",
        href: "https://www.weforum.org/publications/the-future-of-jobs-report-2025/in-full/3-skills-outlook/",
      },
    },

    close:
      "The answer is not to rewrite every framework every month. It is to stop treating publication as completion.",
  },

  /** s2 — what a baseline is, and what it is not. */
  baseline: {
    heading: "What a baseline changes",
    intro: [
      "A competency document describes an intended model. A capability baseline creates a current point of comparison.",
      "It answers three practical questions:",
    ],

    questions: [
      "What does this role or responsibility require now?",
      "What relevant evidence do we have about current capability?",
      "What action follows from the difference?",
    ],

    /** Two emphasised terms in one sentence. */
    definition: {
      parts: [
        "A ",
        "baseline",
        " is not a permanent judgement about a person. It is a dated, contextual view. A ",
        "living",
        " baseline can be revised when responsibilities, standards or credible evidence change.",
      ],
      strong: [1, 3],
    },

    close:
      "This makes the framework useful beyond taxonomy. It can inform a manager conversation, a development priority, a deployment decision, a hiring brief or a career step.",
  },

  /** s3 — start from the work rather than the label. */
  work: {
    heading: "Begin with the work, not the label",

    /** Three competency labels the export sets in italics. */
    labels: {
      parts: [
        "Many competency frameworks rely on broad terms such as ",
        "customer focus",
        ", ",
        "digital fluency",
        " or ",
        "strategic thinking",
        ".",
      ],
      italic: [1, 3, 5],
    },

    body: [
      "These labels create shared vocabulary, but two managers may interpret them differently. An employee may know the definition without knowing what capable performance looks like in a specific responsibility.",
      "A stronger baseline starts closer to the work.",
    ],

    lead: {
      before: "Instead of ",
      strong: "demonstrates digital fluency",
      after: ", it might describe a current responsibility such as:",
    },

    /** The concrete replacement, set apart behind a rule. */
    example:
      "Uses approved AI-assisted analysis to identify relevant patterns, checks the supporting evidence and records the judgement behind a recommendation.",

    after:
      "That statement creates something the organisation can discuss and observe. It also reveals the knowledge and skills beneath the work.",

    /** The NICE citation. `{0}` is replaced by the link. */
    cited: {
      text: "The NIST NICE Workforce Framework offers a useful domain-specific example. In cybersecurity, it separates task, knowledge and skill statements and maintains components separately for more agile updating. It is not a universal template, but it demonstrates that role architecture can be modular rather than locked inside one document. {0}.",
      links: [
        {
          label: "Explore the NICE Framework",
          href: "https://www.nist.gov/itl/applied-cybersecurity/nice/nice-framework-resource-center/getting-started",
        },
      ],
    },
  },

  /** s4 — the four connected elements. */
  living: {
    heading: "What makes a baseline living?",
    intro: "Four elements need to remain connected.",

    elements: [
      {
        number: "1",
        title: "Current work",
        text: "Define the responsibility, decision or outcome that matters now—not only a role title or an isolated skill.",
      },
      {
        number: "2",
        title: "Observable standards",
        text: "Describe what capable performance looks like. Include the context: complexity, independence, risk, available support and the consequences of error.",
      },
      {
        number: "3",
        title: "Relevant evidence",
        text: "Use evidence that fits the responsibility: perhaps a scenario, work sample, structured observation, manager review or performance pattern. The strength comes from using proportionate signals and understanding what each can—and cannot—show.",
      },
      {
        number: "4",
        title: "A next action",
        text: "A gap should lead somewhere: focused practice, expert feedback, supervised experience, a changed assignment or readiness for broader responsibility.",
      },
    ],

    close:
      "Without a next action, the baseline becomes another reporting layer.",

    /** Set on a dark panel, as in the third article. */
    pullQuote:
      "A living baseline does not merely describe capability. It helps the organisation decide what to do next.",

    /** The four-part figure beneath the quote. `icon` names the drawing. */
    anatomy: {
      title: "Anatomy of a living baseline",
      items: [
        {
          icon: "work",
          title: "Work",
          text: "The responsibility or outcome that matters now",
        },
        {
          icon: "standard",
          title: "Standard",
          text: "Observable indicators of capable performance",
        },
        {
          icon: "evidence",
          title: "Evidence",
          text: "Relevant signals showing current capability",
        },
        {
          icon: "action",
          title: "Action",
          text: "The next development, deployment or support decision",
        },
      ],
      caption:
        "Current work, observable standards, relevant evidence and next actions form one connected capability baseline.",
    },
  },

  /** s5 — the worked scenario, on its own tinted card. */
  example: {
    heading: "Consider a relationship manager using an AI assistant",
    eyebrow: "Illustrative scenario",

    intro: [
      "Imagine a relationship manager who now uses an approved AI assistant to prepare for client conversations.",
      "The existing framework says the role requires commercial awareness, customer focus and digital capability. All three remain relevant, but they do not show how the work has changed.",
      "A current baseline could make the new expectation more concrete:",
    ],

    list: [
      "Identify which generated insights are relevant to the client’s situation.",
      "Verify important claims against approved sources.",
      "Recognise when the available evidence is insufficient.",
      "Use the analysis to form better questions, not to replace the conversation.",
      "Record the reasoning behind a recommendation where required.",
    ],

    close: [
      "This is an illustrative scenario, not a reported client implementation.",
      "The manager and employee can now discuss evidence at the level of the work. Can the employee distinguish a useful pattern from a weak inference? Do preparation notes show appropriate verification and judgement?",
      "The response may be narrower than a new course: several reviewed cases, expert feedback and a clear escalation guide.",
      "The baseline has turned a general competency into a visible development path.",
    ],
  },

  /** s6 — the five-step rhythm and the refresh loop. */
  rhythm: {
    heading: "A practical operating rhythm",
    intro: "A living baseline needs governance, not constant activity.",

    steps: [
      {
        number: "1",
        title: "Sense meaningful change",
        text: "Use signals from strategy, technology, regulation, performance patterns and frontline experience. Skills-needs anticipation connects workforce development to current and future demand, not only to an inherited catalogue.",
        link: {
          label: "See the ILO overview",
          href: "https://www.ilo.org/topics-and-sectors/skills-and-lifelong-learning/skills-needs-anticipation",
        },
      },
      {
        number: "2",
        title: "Review the relevant baseline",
        text: "Ask a role owner, experienced practitioner and appropriate business stakeholders what has actually changed. Do not reopen the entire framework when only one responsibility has moved.",
      },
      {
        number: "3",
        title: "Gather proportionate evidence",
        text: "Choose evidence according to risk. A low-risk procedure may need a short check; a high-stakes judgement may require simulation, observation and repeated performance.",
      },
      {
        number: "4",
        title: "Agree the gap",
        text: "Separate missing knowledge from limited practice, weak judgement, unclear process or lack of opportunity. Not every performance gap is a training gap.",
      },
      {
        number: "5",
        title: "Act, then refresh",
        text: "Connect the gap to development, support, staffing or work design. Record what changed and who owns the next review.",
      },
    ],

    close:
      "The rhythm can be event-led rather than continuous. A changed system, new regulation, repeated performance issue or strategic shift may trigger review. Stable responsibilities may need little intervention.",

    /**
     * The refresh loop diagram. Its labels come from here rather than being
     * fixed in the drawing, so they stay translatable; `PAUSE` marks the
     * deliberate human decision point before review.
     */
    loop: {
      title: "The refresh loop",
      pause: "PAUSE",
      stages: [
        "SENSE CHANGE",
        "REVIEW THE BASELINE",
        "GATHER EVIDENCE",
        "AGREE THE GAP",
        "ACT AND REFRESH",
      ],
      caption:
        "Changes in work trigger review, evidence gathering, gap agreement, action and a refreshed baseline. A brief pause before review reflects human ownership of the decision, not automated tracking.",
    },
  },

  /** s7 — the limits on what may be treated as evidence. */
  limits: {
    heading: "Living does not mean limitless",
    panel: [
      "A capability system can become intrusive or misleading if every digital trace is treated as evidence.",
      "Employees should know what information is used, why it matters, who can see it and how a judgement can be challenged or corrected. Evidence should be proportionate to the decision.",
    ],

    /** The honesty point, with its emphasised phrase. */
    uncertainty: {
      before: "A baseline should also make uncertainty visible. ",
      strong: "Insufficient evidence",
      after: " is more honest than an artificially precise score.",
    },

    close:
      "The aim is not to monitor everything people do. It is to create a fairer, more useful shared view of where capability stands and what support comes next.",
  },

  /** s8 — the close, ending on the two questions. */
  close: {
    heading: "A framework that can do some work",
    body: [
      "Competency documents create valuable language, structure and consistency.",
      "The problem is asking a document to remain current without an operating rhythm around it.",
      "When expectations are connected to observable work, relevant evidence and explicit actions, the framework becomes more than a reference file. It becomes a baseline the organisation can use—and revise.",
      "The leadership question therefore changes.",
    ],

    shift: {
      wasLabel: "Not simply",
      was: "Do we have a competency framework?",
      isLabel: "But",
      is: "Do we have a current, shared view of what good performance requires, where capability stands and what needs to change next?",
      close:
        "That is the difference between documenting capability and actively developing it.",
    },
  },

  /**
   * The citation list. Each entry states both its USE and its QUALIFICATION —
   * what the source is borrowed for, and where it stops applying.
   */
  sources: {
    heading: "Sources and reading",
    items: [
      {
        number: "01",
        title:
          "World Economic Forum. “Future of Jobs Report 2025 — Skills Outlook.”",
        link: {
          label: "Read the report",
          href: "https://www.weforum.org/publications/the-future-of-jobs-report-2025/in-full/3-skills-outlook/",
        },
        note: "Use: the attributed finding that surveyed employers expect 39% of workers’ core skills to change by 2030. Qualification: this is an employer-expectation survey covering 2025–2030. It is not a measured rate of expiry for every skill, occupation, geography or organisation.",
      },
      {
        number: "02",
        title:
          "National Institute of Standards and Technology. “Getting Started with the NICE Framework.”",
        link: {
          label: "Read the resource",
          href: "https://www.nist.gov/itl/applied-cybersecurity/nice/nice-framework-resource-center/getting-started",
        },
        note: "Use: the example of a framework organised around task, knowledge and skill statements, with separately maintained components intended to support agile updating. Qualification: NICE is a cybersecurity workforce framework, used here as a domain-specific example, not a universal competency model.",
      },
      {
        number: "03",
        title:
          "International Labour Organization. “Skills needs anticipation.”",
        link: {
          label: "Read the overview",
          href: "https://www.ilo.org/topics-and-sectors/skills-and-lifelong-learning/skills-needs-anticipation",
        },
        note: "Use: the broader principle of identifying current and future workforce demand so that skills development can respond to changes in work. Qualification: this source addresses skills anticipation at labour-market and system levels; the article applies the principle cautiously to enterprise capability baselines.",
      },
    ],
  },

  footer: {
    shareLabel: "Share this insight",
    byline: "Lurny Insights · Capability & Readiness",
  },

  /** Two related articles here, not three. */
  related: {
    heading: "Related insights",
    link: { label: "Explore all insights", href: "/resources/insights" },
    items: [
      {
        category: "AI-native learning",
        title: "Why content creation is no longer the bottleneck",
        readTime: "7 min read",
        href: "/resources/insights/content-creation",
      },
      {
        category: "Capability & readiness",
        title: "What does ‘ready’ actually mean at work?",
        readTime: "6 min read",
        href: "/resources/insights/ready-at-work",
      },
    ],
  },

  subscribe: {
    heading: "Ideas for building an AI-ready enterprise",
    description:
      "Occasional insights on capability, learning and workplace performance. No noise.",
    label: "Work email",
    placeholder: "Work email",
    submit: "Subscribe to insights",
    notice:
      "Subscription is not connected in this prototype — no email was sent.",
  },

  mini: {
    title: "From competency documents to living baselines",
    dismiss: "Dismiss mini player",
  },
} as const;
