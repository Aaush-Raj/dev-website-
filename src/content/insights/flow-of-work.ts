/**
 * INSIGHT ARTICLE — "Learning in the flow of work needs more than
 * recommendations"
 * ---------------------------------------------------------------------------
 * Card 6 of the Insights "Ideas worth exploring" grid, at
 * /resources/insights/flow-of-work.
 *
 * Copy is VERBATIM from the supplied HTML export, punctuation included.
 *
 * ITS ACCENT IS TERRACOTTA (#E46C5A), the same as the living-baselines
 * article, with AUBERGINE (#6A4869) carrying the return half of every loop —
 * the dotted path that brings evidence back to the next decision. Terracotta
 * goes forward; aubergine comes back.
 *
 * IT CITES THREE SOURCES (Blume et al. on transfer, Hattie & Timperley on
 * feedback, How People Learn II), and every one is hedged INLINE as well as in
 * the source list: the transfer meta-analysis "reported variability", the
 * feedback review "focuses largely on education, so it is not an enterprise
 * formula", and How People Learn II "does not prescribe an enterprise
 * workflow". Those hedges are copy, not commentary — the article is
 * deliberately modest about what education research proves about work.
 */

export const flowOfWork = {
  meta: {
    title: "Learning in the flow of work needs more than recommendations",
    description:
      "Putting relevant content beside the work can reduce search. Learning begins when support changes what a person understands, practises or does—and the result informs what should happen next.",
    path: "/resources/insights/flow-of-work",
  },

  breadcrumb: ["Resources", "Insights"],

  category: "AI-native learning",

  title: "Learning in the flow of work needs more than recommendations",

  standfirst:
    "Putting relevant content beside the work can reduce search. Learning begins when support changes what a person understands, practises or does—and the result informs what should happen next.",

  facts: ["7 min read", "Lurny Insights"],

  actions: {
    read: { label: "Read article", href: "#s1" },
    listen: { label: "Audio version", href: "#listen" },
  },

  /** The hero diagram's embedded labels. */
  heroLabels: {
    stages: ["SOURCE", "PERSON DECIDES", "WORKPLACE OUTCOME"],
    /** The dotted return path's own caption. */
    returns: "EVIDENCE RETURNS TO THE NEXT SUPPORT DECISION",
  },

  /** THE AUDIO EDITION — enabled, running the simulated clock to 07:05. */
  audio: {
    eyebrow: "Listen to this insight",
    title: "Learning in the flow of work needs more than recommendations",
    description: "A conversational audio version of this article.",

    /** Seconds. 425 = the 07:05 the export displays. */
    duration: 425,
    durationLabel: "07:05",

    transcriptLabel: "View transcript",
    footnote: "Lurny Insights · Audio edition",

    transcript: [
      {
        time: "00:00",
        text: "The feed looks intelligent. The work remains unchanged.",
      },
      {
        time: "01:35",
        text: "A recommendation solves discovery, not learning.",
      },
      {
        time: "03:10",
        text: "What flow-of-work learning actually requires — six connected elements.",
      },
      {
        time: "05:00",
        text: "A service-team example, and where flow becomes interruption.",
      },
      { time: "06:20", text: "Measuring the loop, not the feed." },
    ],
  },

  rail: {
    title: "In this insight",
    mobileLabel: "Contents",
    items: [
      { id: "s1", label: "The feed looks intelligent" },
      { id: "s2", label: "Recommendation solves discovery" },
      { id: "s3", label: "Flow is a system" },
      { id: "s4", label: "What it actually requires" },
      { id: "s5", label: "A service-team example" },
      { id: "s6", label: "A current state" },
      { id: "s7", label: "Managers and experts" },
      { id: "s8", label: "Flow can become interruption" },
      { id: "s9", label: "Measure the loop" },
      { id: "s10", label: "A beginning" },
    ],
    tools: {
      share: "Share",
      copy: { idle: "Copy link", done: "Link copied" },
      print: "Print",
    },
  },

  /* =========================== The article ============================ */

  /** s1 — the personalised feed that changes nothing. */
  feed: {
    heading: "The feed looks intelligent. The work remains unchanged.",
    body: [
      "An employee opens a learning platform and sees a neat row of recommendations.",
      "Based on their role and recent activity, the system suggests a short video, two articles and a course. The experience feels personalised.",
      "Then the employee returns to work and handles the difficult moment exactly as before.",
      "The recommendation may have been accurate. But it did not establish what the employee needed to do differently, create practice or show whether anything changed afterwards.",
      "As AI makes discovery more sophisticated, learning in the flow of work is often described as delivering the right content to the right person at the right time. That is useful—but incomplete.",
      "The stronger question is:",
    ],
    pullQuote:
      "What should happen between recognising a need and improving performance?",
  },

  /** s2 — discovery is not learning. */
  discovery: {
    heading: "A recommendation solves discovery",
    intro:
      "Recommendations address a real problem. Large libraries are difficult to navigate, and employees may not know the name of what they need. A relevant suggestion reduces search.",

    /** The export italicises the distribution decision itself. */
    distribution: {
      before: "But recommendation is a distribution decision: ",
      italic: "show this person this resource",
      after: ".",
    },

    body: [
      "Learning requires a change in knowledge, skill, judgement or behaviour. Workplace performance requires that change to appear in a real task under real conditions.",
      "Those are related outcomes, but they are not the same as a click, a view or a completion.",
      "A recommender can infer that a manager may benefit from a lesson on feedback. It cannot show whether the manager can diagnose an issue, hold a difficult conversation or agree a useful next step.",
      "The content may be relevant to the role while remaining distant from the moment that matters.",
    ],

    /** Set on a dark panel. */
    pullQuote: "Proximity to work is useful. Connection to action is decisive.",

    /**
     * The comparison figure. The first three steps are the recommendation
     * path and take the accent; the remaining four are the rest of a real
     * learning loop and are greyed, because a recommendation stops at the
     * click. `ends` marks where that path terminates.
     */
    compare: {
      title: "Recommendation versus learning loop",
      steps: [
        { label: "Profile", tone: "accent" },
        { label: "Recommended content", tone: "accent" },
        { label: "Click — recommendation ends", tone: "accent", ends: true },
        { label: "Action or practice", tone: "muted" },
        { label: "Feedback", tone: "muted" },
        { label: "Evidence", tone: "muted" },
        { label: "Next step", tone: "muted" },
      ],
      caption:
        "A recommendation path ends at a click, while a complete learning path continues through action, feedback, evidence and a next step.",
    },
  },

  /** s3 — flow is a loop, not a widget's location. */
  system: {
    heading: "Flow is a system, not a location",
    intro: [
      "Placing a learning widget inside a work application can reduce friction. It does not automatically create learning in the flow of work.",
      "The phrase should describe a connected operating loop:",
    ],

    /** The loop itself, set apart behind a rule. */
    loop: "A work signal reveals a need. The person receives focused support. They practise or act. Feedback helps them adjust. Evidence shows what happened. The next intervention responds to that evidence.",

    after:
      "If the loop ends at “recommended for you”, the organisation has improved content access. It has not yet connected learning with performance.",

    /** The transfer meta-analysis, with its variability stated inline. */
    cited: {
      text: "Research on training transfer reinforces the need to look beyond the learning event. A meta-analysis by Brian Blume and colleagues examined 89 studies and found that transfer related to factors across the learner, intervention and work environment. Results and measurement varied. The practical implication is modest: workplace application cannot be explained by content alone. {0}.",
      links: [
        {
          label: "Read the meta-analysis",
          href: "https://journals.sagepub.com/doi/10.1177/0149206309352880",
        },
      ],
    },
  },

  /** s4 — the six connected elements. */
  requires: {
    heading: "What flow-of-work learning actually requires",
    intro: "Six elements need to remain connected.",

    elements: [
      {
        number: "1",
        title: "A meaningful signal",
        body: [
          "The trigger might be a changed process, missed step, difficult decision, customer friction, manager observation or request for help.",
          "Not every signal proves a learning need. The process or tool may be failing, or the employee may lack authority. Diagnosis comes before recommendation.",
        ],
      },
      {
        number: "2",
        title: "Enough context",
        body: [
          "The system needs the role, responsibility, current task, relevant standard and available evidence. Personalisation should respond to current state—not simply department, seniority or previous clicks.",
        ],
      },
      {
        number: "3",
        title: "The smallest useful intervention",
        body: [
          "The response may be a worked example, explanation, checklist, scenario or access to an expert. It should fit the gap and available time without pretending every complex capability can be taught in two minutes.",
        ],
      },
      {
        number: "4",
        title: "Action or practice",
        body: [
          "The employee needs to do something: make a choice, rehearse a conversation, identify an exception or use the guidance in live work.",
          "Without activity, the organisation knows what was presented, not what the employee can do.",
        ],
      },
      {
        number: "5",
        title: "Feedback that changes the next attempt",
        body: [
          "Feedback should help the person understand the goal, their current response and what to do next.",
        ],
        /** The Hattie & Timperley citation, hedged in the same sentence. */
        cited: {
          text: "John Hattie and Helen Timperley’s review describes feedback as potentially powerful but variable in effect. Their synthesis focuses largely on education, so it is not an enterprise formula. It supports a broader principle: feedback must do more than announce right or wrong. {0}.",
          links: [
            {
              label: "Read the review",
              href: "https://journals.sagepub.com/doi/full/10.3102/003465430298487",
            },
          ],
        },
      },
      {
        number: "6",
        title: "Evidence and a next step",
        body: [
          "The result should inform what follows. Does the person need another attempt, manager coaching, supervised experience, a job aid, an updated source or no further intervention?",
          "Evidence may come from practice, work output, observation or an operational pattern. It should be authorised and interpreted in context.",
          "This closes the loop. The learner is not trapped in a sequence chosen entirely by past consumption.",
        ],
      },
    ],
  },

  /** s5 — the worked scenario, on its own tinted card. */
  example: {
    heading: "Consider a service team that closes too early",
    eyebrow: "Illustrative scenario",

    intro: [
      "Imagine a service team whose customers repeatedly return after cases have been marked resolved.",
      "A recommendation engine notices the pattern and assigns content on active listening.",
      "A review of appropriately authorised, anonymised interactions suggests a narrower issue: employees explain the policy correctly, then close without confirming the underlying need or next action.",
      "This is an illustrative scenario, not a reported client result.",
      "A more useful learning loop could be:",
    ],

    /** The seven-step loop, numbered in the design. */
    steps: [
      "Select one observable behaviour: confirm the unresolved need before closure.",
      "Show a short example contrasting premature closure with a better response.",
      "Ask the employee to choose or voice the next question in a brief scenario.",
      "Provide feedback on why the question helps or misses the need.",
      "Offer a quiet prompt before the next relevant conversation.",
      "Ask a manager to observe a small sample and coach from the same standard.",
      "Use the resulting evidence to decide whether support should continue, change or stop.",
    ],

    close:
      "The learning remains compact. Its value comes from connecting a diagnosed gap, practice, work and follow-through.",

    /**
     * The five-step strip beneath. `icon` names the drawing, `tone` its
     * colour, and the connector after each step — the last is dashed and
     * aubergine, because manager feedback is the loop closing rather than
     * another forward step.
     */
    strip: {
      steps: [
        { icon: "pattern", label: "Pattern noticed", tone: "olive" },
        { icon: "behaviour", label: "One behaviour selected", tone: "accent" },
        { icon: "scenario", label: "Short scenario", tone: "accent" },
        { icon: "prompt", label: "Prompt in next conversation", tone: "olive" },
        {
          icon: "observation",
          label: "Manager observation & feedback",
          tone: "aubergine",
        },
      ],
      connectors: [
        { tone: "olive" },
        { tone: "accent" },
        { tone: "accent" },
        { tone: "aubergine", dashed: true },
      ],
      caption:
        "A service pattern leads to one selected behaviour, a short scenario, a prompt in the next conversation and manager feedback.",
    },
  },

  /** s6 — personalisation needs a current state, not stable attributes. */
  currentState: {
    heading: "Personalisation needs a current state",
    body: [
      "Many systems personalise from stable attributes: job family, grade, interests, completions or what similar users consumed. Those signals improve discovery but do not describe readiness.",
      "Two employees in the same role may need different support. One struggles with an exception, another with explanation, and a third with ambiguity.",
      "Useful personalisation therefore needs a current state:",
    ],

    questions: [
      "What responsibility is involved?",
      "What does capable performance look like?",
      "What has the person already demonstrated?",
      "Where is the evidence weak or missing?",
      "What support is appropriate now?",
      "What would justify moving on?",
    ],

    /**
     * The How People Learn II citation. Its title is italicised mid-sentence,
     * so the paragraph splits around both the italic and the link.
     */
    cited: {
      before:
        "This is not a demand for constant testing. The National Academies’ ",
      italic: "How People Learn II",
      after:
        " synthesises research on learner, contextual and cultural influences across the lifespan. It does not prescribe an enterprise workflow, but reinforces that learning cannot be reduced to content selection. ",
      link: {
        label: "Explore the report",
        href: "https://www.nationalacademies.org/projects/DBASSE-BBCSS-13-06/publication/24783",
      },
      end: ".",
    },
  },

  /** s7 — the people who stay in the loop. */
  people: {
    heading: "Managers and experts remain part of the flow",
    body: [
      "AI can help identify patterns, retrieve knowledge, generate practice and provide immediate feedback.",
      "It should not remove the people who understand the work.",
      "Managers see workload, opportunity, team norms and consequences that a system may miss. Experts understand exceptions, trade-offs and judgement.",
      "Their role can become more focused: a manager reviews one observable behaviour; an expert examines unusual cases and improves source guidance.",
      "The flow becomes a combination of digital support, human judgement and workplace opportunity.",
    ],
  },

  /** s8 — the warning, set apart behind a rule. */
  interruption: {
    heading: "Flow can become interruption",
    panel: [
      "Poorly designed flow-of-work learning becomes a stream of nudges competing with the task itself.",
      "Every signal does not require content. The best response may be a job aid, a system permission or no interruption at all.",
      "Use clear rules for relevance, frequency, urgency and dismissal. Allow employees to ask for support, postpone it or explain that it was not useful. Protect personal and customer information. Do not turn every work trace into an assessment event.",
      "The aim is to reduce friction in performance—not create another layer of digital demand.",
    ],
  },

  /** s9 — measure the loop rather than the feed. */
  measure: {
    heading: "Measure the loop, not the feed",
    intro: [
      "Recommendation systems produce impressions, clicks, views and completions. These show reach, not whether the intervention addressed the gap or affected work.",
      "A stronger view connects several forms of evidence:",
    ],
    questions: [
      "Was the need correctly identified?",
      "Did the employee engage in relevant action or practice?",
      "Did feedback improve the next attempt?",
      "Did the behaviour appear in the workplace?",
      "Was support still required over time?",
      "Did an operational indicator move, and what other factors may have contributed?",
    ],
    close:
      "No single measure answers every question. The point is to follow the journey far enough to distinguish content activity from capability development.",
  },

  /** s10 — the close. */
  beginning: {
    heading: "The recommendation is a beginning",
    body: [
      "Recommendations remain valuable. But the enterprise opportunity is larger than a better feed.",
      "It is a learning system that can recognise a meaningful need, provide focused support, create practice, connect feedback to evidence and choose an appropriate next step.",
    ],

    shift: {
      wasLabel: "The leadership question should therefore move beyond",
      was: "What content should we recommend?",
      isLabel: "And ask",
      is: "What should this person be able to do next—and how will the work itself help us understand whether they can?",
      close:
        "That is when learning enters the flow of work rather than merely appearing beside it.",
    },
  },

  /** Three sources, each with its USE and its QUALIFICATION. */
  sources: {
    heading: "Sources and reading",
    items: [
      {
        number: "01",
        citation: {
          before:
            "Blume, B. D., Ford, J. K., Baldwin, T. T., and Huang, J. L. (2010). “Transfer of Training: A Meta-Analytic Review.” ",
          italic: "Journal of Management",
          after: ".",
        },
        link: {
          label: "Read the meta-analysis",
          href: "https://journals.sagepub.com/doi/10.1177/0149206309352880",
        },
        note: "Use: the meta-analysis of 89 empirical studies examining relationships between training transfer and factors involving learners, training interventions and the work environment. Qualification: the authors report variability in findings and transfer measurement; not a validation of one universal transfer model or this article’s specific six-element loop.",
      },
      {
        number: "02",
        citation: {
          before:
            "Hattie, J., and Timperley, H. (2007). “The Power of Feedback.” ",
          italic: "Review of Educational Research",
          after: ".",
        },
        link: {
          label: "Read the review",
          href: "https://journals.sagepub.com/doi/full/10.3102/003465430298487",
        },
        note: "Use: the review’s central point that feedback can influence learning but varies in effectiveness depending on its type and how it is provided. Qualification: draws primarily on educational research; the article applies only a broad feedback-design principle to workplace learning.",
      },
      {
        number: "03",
        citation: {
          before: "National Academies of Sciences, Engineering, and Medicine. ",
          italic: "How People Learn II",
          after: ".",
        },
        link: {
          label: "Explore the report",
          href: "https://www.nationalacademies.org/projects/DBASSE-BBCSS-13-06/publication/24783",
        },
        note: "Use: broad research synthesis on learning across the lifespan and the constellation of learner, contextual and cultural influences on learning. Qualification: does not prescribe a learning-in-the-flow-of-work platform, recommendation system or enterprise implementation architecture.",
      },
    ],
  },

  footer: {
    shareLabel: "Share this insight",
    byline: "Lurny Insights · AI-native learning",
  },

  related: {
    heading: "Related insights",
    link: { label: "Explore all insights", href: "/resources/insights" },
    items: [
      {
        category: "Enterprise AI & field lessons",
        title: "Context is the enterprise AI advantage",
        readTime: "6 min read",
        href: "/resources/insights/context-advantage",
      },
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
    title: "Learning in the flow of work needs more than recommendations",
    dismiss: "Dismiss mini player",
  },
} as const;
