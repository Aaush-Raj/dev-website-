/**
 * INSIGHT ARTICLE — "What does 'ready' actually mean at work?"
 * ---------------------------------------------------------------------------
 * Card 1 of the Insights "Ideas worth exploring" grid, at
 * /resources/insights/ready-at-work.
 *
 * Copy is VERBATIM from the supplied HTML export, punctuation included: the
 * em dashes are unspaced, the quotes are curly, and "L&D" keeps its ampersand.
 * Anything the article states as prose lives here; anything it draws lives in
 * the section components as markup.
 *
 * The prose is stored as arrays of paragraphs rather than one blob so the
 * article component can space them the way the design does without parsing
 * newlines, and so a translator sees one sentence-group at a time.
 */

export const readyAtWork = {
  meta: {
    title: "What does 'ready' actually mean at work?",
    description:
      "Why learning completion, assessment scores and experience still cannot tell us whether someone can perform when it matters.",
    path: "/resources/insights/ready-at-work",
  },

  /** The crumb above the title. */
  breadcrumb: ["Resources", "Insights"],

  /** The rule-and-label pair under the crumb. */
  category: "Capability & Readiness",

  title: "What does ‘ready’ actually mean at work?",

  standfirst:
    "Why learning completion, assessment scores and experience still cannot tell us whether someone can perform when it matters.",

  /** The two facts on the rule beneath the standfirst. */
  facts: ["6 min read", "Audio available"],

  /** The link that jumps past the player to the prose. */
  beginReading: "Begin reading",

  /**
   * THE AUDIO EDITION.
   *
   * The export ships no audio file: its player is a simulation, a counter
   * running to `duration` at the chosen speed. It is rebuilt the same way,
   * so the section is ready for a real file to be dropped in later without
   * the UI changing.
   */
  audio: {
    eyebrow: "Listen to this insight",
    title: "What does ‘ready’ actually mean at work?",
    description: "A conversational audio version of this article.",

    /** Seconds. 492 = the 08:12 the export displays. */
    duration: 492,
    durationLabel: "08:12",

    transcriptLabel: "View transcript",
    footnote: "Lurny Insights · Audio edition",

    /** The transcript, opened by the button above it. */
    transcript: [
      {
        time: "00:00",
        text: "Most organisations can tell you who has completed the training.",
      },
      {
        time: "00:41",
        text: "But ask a more direct question: can this person perform what the role requires, when it matters?",
      },
      {
        time: "02:06",
        text: "The signals we commonly mistake for readiness.",
      },
      {
        time: "04:18",
        text: "Four questions that make readiness measurable.",
      },
      { time: "06:52", text: "Readiness is a profile, not a label." },
    ],
  },

  /**
   * The sticky rail. `id` is the section the link scrolls to and the anchor
   * the scroll-spy highlights; the export gives the rail its own shorter
   * labels rather than reusing the headings.
   */
  rail: {
    title: "In this insight",
    items: [
      { id: "s1", label: "The readiness problem" },
      { id: "s2", label: "Ready for what?" },
      { id: "s3", label: "Mistaken signals" },
      { id: "s4", label: "Defining readiness" },
      { id: "s5", label: "Four questions" },
      { id: "s6", label: "A profile, not a label" },
      { id: "s7", label: "A worked example" },
      { id: "s8", label: "What changes" },
      { id: "s9", label: "Never completed" },
      { id: "s10", label: "A better question" },
    ],
    tools: {
      share: "Share",
      /** Both states, so the button can swap without new strings. */
      copy: { idle: "Copy link", done: "Link copied" },
      save: { idle: "Save", done: "Saved" },
      print: "Print",
    },
  },

  /* =========================== The article ============================ */

  /** s1 — the opening. Its first paragraph takes the drop cap. */
  intro: {
    lead: "Most organisations can tell you who has completed the training.",
    body: [
      "They can tell you who passed the assessment, how many years of experience someone has, and whether a manager believes the person is competent.",
      "But ask a more direct question—",
    ],
    pullQuote:
      "Can this person perform what the role requires, when it matters?",
    after: [
      "—and the answer often becomes less certain.",
      "That is the workplace readiness problem.",
      "Organisations have accumulated job descriptions, competency frameworks, learning records, assessment scores and performance data. Yet these signals rarely come together to show whether someone is genuinely ready to handle a responsibility.",
      "Readiness is often assumed. Sometimes it is inferred. Rarely is it clearly defined and demonstrated.",
    ],
  },

  /** s2 — readiness needs a context. */
  readyForWhat: {
    heading: "Ready for what?",
    intro: "Readiness is meaningless without a specific performance context.",

    /** Sits beside the four-rings figure. */
    aside:
      "An employee may be ready to explain a product but not ready to recommend it to a customer. A manager may be ready to run a familiar project but not one involving multiple countries, vendors and regulatory constraints. A technician may follow a standard operating procedure correctly but struggle when the situation falls outside the documented sequence.",

    figureCaption:
      "One person, four responsibilities — readiness rarely sits at the same level across all of them.",

    body: [
      "This is why asking whether someone is “ready for the role” is often too broad.",
      "A role is made up of different responsibilities, decisions and moments of performance. People are rarely equally capable across all of them.",
      "The better question is:",
    ],

    /** Set apart from the paragraphs around it in the design. */
    question:
      "What should this person be trusted to do, to what standard, and under what conditions?",

    close:
      "That moves readiness from a vague judgement to something that can be described, observed and developed.",
  },

  /** s3 — the five signals. */
  signals: {
    heading: "The signals we commonly mistake for readiness",
    intro:
      "Many of the measures organisations use are useful. The difficulty begins when they are treated as proof of performance.",

    items: [
      {
        index: "Signal 01",
        title: "Training completion",
        text: "Completion tells us that someone accessed or finished a learning activity. It does not tell us whether the learning can be applied at work.",
      },
      {
        index: "Signal 02",
        title: "Assessment scores",
        text: "A quiz may demonstrate recall or understanding. It rarely shows how a person will respond when the situation is ambiguous, time is limited or another person reacts unexpectedly.",
      },
      {
        index: "Signal 03",
        title: "Experience",
        text: "Experience provides exposure, but years in a role do not automatically translate into proficiency. The same year of experience can be repeated many times without the individual encountering greater complexity or improving their judgement.",
      },
      {
        index: "Signal 04",
        title: "Self-assessment",
        text: "Self-perception is valuable, especially for reflection and development. But confidence and capability are not always aligned. Some capable people underestimate themselves, while others may not yet recognise the gaps in their performance.",
      },
      {
        index: "Signal 05",
        title: "Manager ratings",
        text: "Managers see aspects of performance that formal assessments cannot. However, their ratings may be affected by limited observation, inconsistent standards or recent events.",
      },
    ],

    close:
      "None of these signals should be discarded. They simply should not be expected to answer a question they were never designed to answer on their own.",
  },

  /**
   * s4 and s4b — the definition, which breaks the article's column to run
   * full width, then the glossary of the words in it.
   */
  definition: {
    heading: "A more useful definition of readiness",
    intro: "Workplace readiness can be understood as:",

    eyebrow: "Definition",

    /**
     * The definition itself, split so the two italicised phrases can be
     * emphasised without markup in the copy.
     */
    statement: {
      before: "The ",
      emphasisA: "demonstrated ability",
      middle:
        " to apply the required knowledge, skills and behaviours to produce an expected outcome in a defined work context—with sufficient ",
      emphasisB: "consistency and judgement",
      after: " to be trusted with the responsibility.",
    },

    lead: "Several words in this definition matter.",

    terms: [
      {
        term: "Demonstrated",
        text: "means readiness requires evidence, not assumption.",
      },
      {
        term: "Apply",
        text: "distinguishes knowing something from being able to use it.",
      },
      {
        term: "Expected outcome",
        text: "connects capability to the work the organisation needs performed.",
      },
      {
        term: "Defined context",
        text: "recognises that performance changes with complexity, risk, available support and working conditions.",
      },
      {
        term: "Consistency and judgement",
        text: "distinguish an isolated success from dependable capability.",
      },
    ],

    close:
      "This does not mean every task must be observed continuously. It means the organisation should know what evidence would reasonably justify a readiness decision.",
  },

  /** s5 — the four questions, each with its own line-art panel. */
  questions: {
    heading: "Four questions that make readiness measurable",
    intro:
      "Before declaring someone ready, an organisation should be able to answer four questions.",

    /** `icon` names the drawing in ReadyAtWorkIcons.tsx. */
    items: [
      {
        number: "01",
        icon: "requirement",
        title: "What must the person be able to do?",
        body: [
          "Begin with a meaningful responsibility, decision or work outcome—not a broad competency label.",
          "“Customer orientation” is difficult to observe.",
          "“Identify the customer’s underlying requirement and recommend an appropriate solution” is considerably clearer.",
        ],
      },
      {
        number: "02",
        icon: "standard",
        title: "What does good performance look like?",
        body: [
          "Readiness requires observable standards.",
          "What would a beginner do? What would someone working independently do differently? What distinguishes acceptable performance from strong performance?",
          "These distinctions turn abstract competencies into practical proficiency expectations.",
        ],
      },
      {
        number: "03",
        icon: "conditions",
        title: "Under what conditions must the person perform?",
        body: [
          "Capability demonstrated in a familiar, supported situation may not transfer immediately to a more demanding one.",
          "Relevant conditions may include:",
        ],
        list: [
          "The complexity of the task",
          "The level of supervision available",
          "The degree of ambiguity",
          "Time or operational pressure",
          "The consequences of error",
          "The need to adapt when circumstances change",
        ],
        after: [
          "A person can therefore be ready at one level of complexity while still developing towards another.",
        ],
      },
      {
        number: "04",
        icon: "evidence",
        title: "What evidence would justify the decision?",
        body: [
          "No single signal is sufficient for every responsibility.",
          "Evidence might include:",
        ],
        list: [
          "Knowledge and scenario-based assessments",
          "Simulations or structured practice",
          "Observation by a manager or qualified reviewer",
          "Work samples and completed outputs",
          "Customer or stakeholder interactions",
          "Repeated performance over time",
          "Business or operational outcomes",
        ],
        after: [
          "The appropriate mix depends on the nature and risk of the work.",
        ],
      },
    ],
  },

  /** s6 — readiness as a profile. */
  profile: {
    heading: "Readiness is a profile, not a label",
    intro: [
      "Organisations often classify employees as either ready or not ready. Real capability is rarely that binary.",
      "Someone may:",
    ],
    list: [
      "Understand the required concepts",
      "Apply them successfully in a simulation",
      "Perform with guidance in the workplace",
      "Work independently in familiar situations",
      "Adapt their judgement to unfamiliar or complex situations",
    ],

    /** The four-stage diagram's own labels. */
    stages: {
      start: "evidence begins",
      end: "evidence accumulates",
      labels: ["UNDERSTAND", "APPLY", "PERFORM", "ADAPT"],
    },

    figureCaption:
      "A developing readiness profile: each state carries more evidence than the last, and a person can sit at different points for different responsibilities. It is not a pass/fail ladder.",

    body: [
      "These are different levels of readiness.",
      "Representing them as a profile gives the employee and the organisation a more honest view of current capability. It shows where the person can already be trusted to perform, where support is still needed and what development should come next.",
      "It also changes the tone of assessment.",
      "Instead of assessment being a verdict on the individual, it becomes a way to locate the next useful step in their growth.",
    ],
  },

  /** s7 — the worked example, set on its own tinted card. */
  example: {
    heading: "Consider a customer-facing employee",
    eyebrow: "Worked example",

    intro: [
      "Imagine an employee who has completed a product course and scored 88% in the final assessment.",
      "Is the employee ready?",
      "The score tells us that the employee probably understands the product. It does not tell us whether they can:",
    ],

    list: [
      "Recognise a relevant customer need",
      "Ask appropriate questions",
      "Explain the product accurately and simply",
      "Respond to hesitation or objections",
      "Avoid making an unsuitable recommendation",
      "Agree and document the next action",
    ],

    close: [
      "A realistic scenario could provide evidence of applied capability. Actual customer conversations could show whether that capability transfers to work. Repeated observations could establish whether the performance is consistent.",
      "Together, these signals provide a much stronger basis for a readiness decision than completion or test scores alone.",
    ],
  },

  /** s8 — who it changes things for. */
  changes: {
    heading: "What changes when readiness becomes visible?",
    rows: [
      {
        who: "Employees",
        text: "Expectations become clearer. They can see what capable performance looks like and what they need to improve next.",
      },
      {
        who: "Managers",
        text: "Coaching becomes more focused. Instead of offering general feedback, they can address specific gaps in behaviour, judgement or execution.",
      },
      {
        who: "L&D teams",
        text: "Learning can be connected to identified performance needs rather than assigned as a default response to every problem.",
      },
      {
        who: "Business leaders",
        text: "Capability becomes useful operational information. They can make better decisions about deployment, supervision, succession, risk and investment in development.",
      },
    ],
    close:
      "Most importantly, the organisation can begin connecting learning with what happens after learning.",
  },

  /** s9 — readiness expires. */
  ongoing: {
    heading: "Readiness is never permanently completed",
    body: [
      "Roles evolve. Products change. Technology introduces new ways of working. Employees encounter situations that no framework anticipated.",
      "Readiness is therefore not a certificate that remains valid indefinitely. It is a current judgement supported by relevant evidence.",
      "That evidence must be refreshed as expectations and working conditions change.",
      "The objective is not to subject employees to constant testing. It is to create a reasonable, continuous understanding of where capability exists, where it is developing and where the organisation may be exposed.",
    ],
  },

  /** s10 — the closing ask, which again breaks to full width. */
  closing: {
    heading: "A better question for leaders",
    intro: [
      "The next time a dashboard reports that 96% of employees have completed a programme, resist the temptation to interpret that as readiness.",
      "Ask instead:",
    ],

    eyebrow: "In closing",
    question:
      "What can people now be trusted to do that they could not reliably do before?",
    after: [
      "If the organisation cannot answer that question, it may have measured learning activity without yet measuring capability.",
      "And that is the difference between having trained people and having people who are ready to perform.",
    ],
  },

  /* ============================ The foot ============================== */

  /** The tags under the article. The first is the article's own category. */
  tags: [
    "Capability & Readiness",
    "Workplace readiness",
    "Capability measurement",
    "Evidence of performance",
    "L&D measurement",
  ],

  /** The share bar and byline closing the article. */
  footer: {
    shareLabel: "Share this insight",
    listen: "Listen to the insight · 08:12",
    byline: {
      title: "Lurny Insights",
      meta: "Editorial team · Capability & Readiness",
    },
  },

  /** "Continue exploring" — three further articles. */
  related: {
    heading: "Continue exploring",
    link: { label: "All insights", href: "/resources/insights" },
    items: [
      {
        category: "Capability",
        title: "Why competency frameworks fail to influence daily performance",
        readTime: "5 min read",
        href: "/resources/insights/living-baselines",
      },
      {
        category: "Performance data",
        title: "What frontline activity tells us that learning data cannot",
        readTime: "7 min read",
        href: "/resources/insights/frontline-conversations",
      },
      {
        category: "Measurement",
        title: "From learning completion to evidence of capability",
        readTime: "6 min read",
        href: "/resources/insights/context-advantage",
      },
    ],
  },

  /** The subscribe strip closing the page. */
  subscribe: {
    heading: "Ideas for building an AI-ready enterprise",
    description:
      "Occasional insights on capability, learning and workplace performance. No noise.",
    placeholder: "Work email",
    label: "Work email",
    submit: { idle: "Subscribe to insights", done: "Subscribed" },
  },

  /** The mini player that appears once the reader is past the hero. */
  mini: {
    title: "What does ‘ready’ actually mean at work?",
    dismiss: "Dismiss mini player",
  },
} as const;
