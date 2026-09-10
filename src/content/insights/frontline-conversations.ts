/**
 * INSIGHT ARTICLE — "What 9,328 frontline conversations revealed"
 * ---------------------------------------------------------------------------
 * Card 3 of the Insights "Ideas worth exploring" grid, at
 * /resources/insights/frontline-conversations.
 *
 * Copy is VERBATIM from the supplied HTML export, punctuation included.
 *
 * THIS ONE IS A FIELD NOTE, and it is unusually careful about what it claims.
 * It reports an anonymised client implementation, so the export repeatedly
 * states the limits of the evidence: an "Evidence boundary" callout in the
 * first section, a whole section on what the evidence does NOT prove, and a
 * closing note qualifying its own workflow diagram as illustrative. Those
 * qualifications are the copy, not commentary about it — none of them may be
 * trimmed as boilerplate.
 *
 * ITS ACCENT IS PLUM (#755078) with a mauve partner (#9A6F91), where the first
 * article takes violet and the second olive.
 *
 * Emphasis inside prose is modelled as `{0}`-style splices rather than markup
 * in the strings, so a bolded phrase stays attached to its sentence.
 */

export const frontlineConversations = {
  meta: {
    title: "What 9,328 frontline conversations revealed",
    description:
      "Learning systems show what people completed. Frontline conversations show what they understood, applied and missed when knowledge met a real customer.",
    path: "/resources/insights/frontline-conversations",
  },

  breadcrumb: ["Resources", "Insights"],

  category: "Performance intelligence",

  title: "What 9,328 frontline conversations revealed",

  /** The badge under the title — this article is a field report. */
  badge: "Anonymised field implementation",

  standfirst:
    "Learning systems show what people completed. Frontline conversations show what they understood, applied and missed when knowledge met a real customer.",

  facts: ["8 min read", "Lurny Insights"],

  actions: {
    read: { label: "Read the field note", href: "#s1" },
    listen: { label: "Audio version", href: "#listen" },
  },

  /** The hero diagram's embedded label and the legend beneath it. */
  heroLabel: "EVIDENCE SHEET",

  heroLegend: ["Knowledge gap", "Missed opportunity", "Variation"],

  /** The two figures beside the hero diagram. */
  heroMetrics: [
    { value: "9,328", label: "Frontline conversations" },
    { value: "25", label: "Branches" },
  ],

  /**
   * THE AUDIO EDITION.
   *
   * Unlike the second article's, this player is ENABLED in the export — it
   * runs the same simulated clock as the first article's, to 08:30, and it
   * has the transcript and the sticky mini-player with it. The mini-player
   * here appears only WHILE PLAYING, which is a change from the first
   * article's (that one shows whenever the reader is far enough down).
   */
  audio: {
    eyebrow: "Listen to this insight",
    title: "What 9,328 frontline conversations revealed",
    description: "A conversational audio version of this field note.",

    /** Seconds. 510 = the 08:30 the export displays. */
    duration: 510,
    durationLabel: "08:30",

    transcriptLabel: "View transcript",
    footnote: "Lurny Insights · Audio edition",

    transcript: [
      { time: "00:00", text: "The work had been happening out of sight." },
      { time: "01:40", text: "Three findings changed the conversation." },
      {
        time: "04:10",
        text: "One conversation is an event. Thousands can reveal a pattern.",
      },
      { time: "06:00", text: "What the evidence does not prove." },
      { time: "07:20", text: "Insight is not yet action." },
    ],
  },

  rail: {
    /** "field note", not "insight" — this article names itself differently. */
    title: "In this field note",
    mobileLabel: "Contents",
    items: [
      { id: "s1", label: "Out of sight" },
      { id: "s2", label: "A different question" },
      { id: "s3", label: "Three findings" },
      { id: "s4", label: "Event vs pattern" },
      { id: "s5", label: "A score is not a diagnosis" },
      { id: "s6", label: "Insight is not yet action" },
      { id: "s7", label: "What it does not prove" },
      { id: "s8", label: "A new starting point" },
    ],
    tools: {
      share: "Share",
      copy: { idle: "Copy link", done: "Link copied" },
      print: "Print",
    },
  },

  /* =========================== The article ============================ */

  /** s1 — the evidence that used to vanish, and the boundary around it. */
  outOfSight: {
    heading: "The work had been happening out of sight",
    body: [
      "Every day, frontline employees hold conversations that shape customer understanding, trust and action.",
      "They ask questions, explain products, interpret policies, respond to hesitation and agree next steps. Some conversations reveal strong judgement. Others contain a missed question, an incomplete explanation or a follow-up that never becomes explicit.",
      "Most of this evidence disappears when the interaction ends.",
      "The organisation may know that an employee completed a product course and passed an assessment. It may know branch sales, service volumes and customer outcomes. What it often cannot see is the performance between those points: how the employee used knowledge in the conversation itself.",
    ],

    /** The scale of the implementation, with the figure emphasised. */
    scale: {
      before:
        "An anonymised financial-services implementation created a different view. Analysis covered ",
      strong: "9,328 multilingual frontline conversations across 25 branches",
      after:
        ". The available implementation record confirms three directional findings:",
    },

    findings: [
      "Knowledge gaps surfaced in real customer interactions.",
      "Missed cross-sell and follow-up opportunities became visible.",
      "Performance patterns varied across branches and individuals.",
    ],

    after: [
      "These findings matter because they move capability from assumption towards observable work.",
      "They also require restraint.",
    ],

    /**
     * The boundary callout. It states what the record does NOT contain, and
     * is the article's own framing rather than an editorial note — it must
     * travel with the section.
     */
    boundary: {
      title: "Evidence boundary",
      text: "The available record does not provide the analysis period, employee count, language mix, sampling method, frequency of each finding, transcription accuracy, comparative baseline or quantified business impact. This field note therefore reports what became visible and what leaders can learn from that visibility. It does not present a statistical study or claim that the analysis caused performance improvement.",
    },
  },

  /** s2 — learning data answers a different question. */
  differentQuestion: {
    heading: "Learning data answered a different question",
    body: [
      "Learning data is useful.",
      "Completion can show whether an assigned experience was accessed. Assessment can provide evidence of selected knowledge or decisions. Participation can reveal where engagement is strong or weak.",
      "But these signals answer questions about learning activity and designed assessment conditions.",
      "A customer conversation is different. It unfolds with incomplete information, time pressure, emotion, competing priorities and an unpredictable response from another person.",
      "An employee may know a product feature but fail to connect it to the customer’s need. They may explain a policy accurately but leave the next action unclear. They may recognise an opportunity but avoid the question that would establish whether it is relevant.",
      "The conversation does not replace learning or assessment data. It adds another kind of evidence: whether capability appears in a real moment of work.",
    ],

    /** Set on a dark panel here, unlike the other articles' ruled quotes. */
    pullQuote:
      "A conversation is not merely a record of activity. It is evidence of how capability appears under real conditions.",
  },

  /** s3 — the three findings, each with its own sub-heading. */
  findings: {
    heading: "Three findings changed the conversation",

    items: [
      {
        heading: "1. Knowledge gaps surfaced in real customer interactions",
        body: [
          "The implementation record reports that knowledge gaps became visible inside customer conversations.",
          "It does not publish a taxonomy or frequency for those gaps. The significance is where the evidence appeared.",
          "A quiz can show whether someone selects a correct answer. A conversation shows whether they can retrieve the relevant knowledge, explain it clearly, apply it to the customer’s situation and recognise when they need help.",
          "These are not identical problems.",
          "An incomplete explanation may point to missing product knowledge. It may also reflect uncertainty, poor language fit, weak structuring or a process that is difficult to explain. The conversation reveals the moment; diagnosis still requires context.",
        ],
        /** Two emphasised questions contrasted in one sentence. */
        close: {
          parts: [
            "This changes the development question from ",
            "Who failed the course?",
            " to ",
            "Where does understanding break down when the employee has to use it?",
          ],
          /** Which parts are set in bold, by index. */
          strong: [1, 3],
        },
      },
      {
        heading:
          "2. Missed cross-sell and follow-up opportunities became visible",
        body: [
          "The second confirmed finding concerns missed opportunities.",
          "An outcome report may show that an additional product was not taken up or that a follow-up did not convert. It cannot always show whether the opportunity was absent, unsuitable, overlooked or left unexplored.",
          "Conversation evidence can make some of those distinctions more visible.",
          "Was a relevant need discovered? Was an appropriate question asked? Was the product mentioned accurately? Was the customer’s hesitation explored? Was a next step agreed?",
          "These are observable conversation moments. Their absence does not prove that a sale should have occurred. Cross-sell must remain relevant and suitable, and a customer may reasonably decline.",
        ],
        close: {
          parts: [
            "The value lies in distinguishing ",
            "no opportunity",
            " from ",
            "an opportunity that was never properly explored",
            ", and distinguishing both from ",
            "a follow-up that was discussed but not made explicit",
            ".",
          ],
          strong: [1, 3, 5],
        },
        after: [
          "That gives managers a more specific basis for review than simply asking a team to “sell more”.",
        ],
      },
      {
        heading:
          "3. Performance patterns varied across branches and individuals",
        body: [
          "The third finding was variation.",
          "This matters because an organisation-wide average can conceal different causes.",
          "At the individual level, one employee may need product knowledge while another needs practice uncovering customer needs. A third may perform strongly enough to offer useful examples.",
          "At branch level, repeated patterns may suggest a shared coaching need, local operating condition or uneven adoption of an expected practice.",
          "Across the system, the same weakness appearing in multiple places may point beyond the employee—to unclear guidance, a difficult process, inconsistent expectations or a script that encourages the wrong behaviour.",
          "The evidence does not automatically decide which explanation is correct. It improves the quality of the question.",
          "Instead of treating every gap as an individual training problem, leaders can ask:",
        ],
        list: [
          "Is this one employee, one branch or a wider pattern?",
          "Is the issue knowledge, conversation skill, judgement, process or opportunity?",
          "Does the expected behaviour remain appropriate in the situations being observed?",
          "What evidence would distinguish among these explanations?",
        ],
      },
    ],
  },

  /** s4 — volume creates the chance of a pattern, not validity. */
  pattern: {
    heading: "One conversation is an event. Thousands can reveal a pattern.",
    body: [
      "A single conversation may be useful for coaching, but it can also be unusual.",
      "The customer may present an exceptional case. The employee may be handling unfamiliar work. The audio may be incomplete. A translated phrase may lose nuance. One interaction should not become a permanent verdict on the person.",
      "Larger volumes create the possibility of examining recurrence. Do similar omissions appear across several conversations? Do they cluster around a product, moment or branch? Does a pattern persist after guidance or practice?",
      "Volume alone does not create validity. Thousands of poorly selected, poorly transcribed or weakly interpreted interactions can produce confident noise.",
      "The quality of the evidence depends on the conditions around it:",
    ],
    list: [
      "Clear consent and authorised use.",
      "Reliable capture and appropriate data minimisation.",
      "Transcription and translation evaluated for the languages and conditions involved.",
      "Indicators grounded in approved product, process and performance expectations.",
      "Human review of ambiguous or consequential findings.",
      "Enough context to distinguish a capability gap from a process or system problem.",
      "Proportionate use of findings in coaching and people decisions.",
    ],
    close: {
      before: "The number ",
      strong: "9,328",
      after: " signals scale. It does not remove the need for judgement.",
    },
  },

  /** s5 — a score opens a review rather than closing it. */
  score: {
    heading: "A score is not a diagnosis",
    body: [
      "Conversation analysis can create scores or indicators. These can help organise attention, but they can also create false certainty.",
      "A low indicator for need discovery does not explain why the question was missed. The customer may have stated the need before recording began. The employee may have been following a branch instruction. The conversation may not have offered a relevant opportunity. The indicator itself may need refinement.",
      "Scores should therefore open a review, not close it.",
      "A useful review moves through three levels:",
    ],

    levels: [
      {
        number: "01",
        title: "The conversation",
        text: "What happened in this interaction? Which evidence supports the observation? What context may be missing?",
      },
      {
        number: "02",
        title: "The pattern",
        text: "Does the same behaviour appear across other relevant conversations, conditions or periods?",
      },
      {
        number: "03",
        title: "The response",
        text: "What would help: clearer knowledge, focused practice, manager coaching, a process change, better tools—or no intervention until stronger evidence exists?",
      },
    ],

    close:
      "This prevents conversation intelligence from becoming automated judgement detached from the work.",

    /** The three-layer figure beneath the close. */
    layers: {
      title: "Three layers of visibility",
      items: [
        {
          number: "1",
          title: "Conversation",
          text: "What was asked, explained, omitted or left unresolved",
        },
        {
          number: "2",
          title: "Pattern",
          text: "Recurring gaps and opportunities across interactions",
        },
        {
          number: "3",
          title: "Response",
          /** The export italicises the hedge at the end of this one. */
          text: "Where knowledge, practice, coaching or process review ",
          italic: "may be needed",
        },
      ],
      caption:
        "Conversation details form patterns that may guide learning, coaching or process responses.",
    },
  },

  /** s6 — the five-step response, and the workflow diagram. */
  action: {
    heading: "Insight is not yet action",
    body: [
      "Making a gap visible is only the first step.",
      "If leaders receive a dashboard full of findings but employees receive no useful support, the organisation has created observation without development.",
      "A responsible response can follow a simple sequence.",
    ],

    steps: [
      {
        number: "1",
        title: "Validate the pattern",
        text: "Review examples with appropriate business, quality and frontline context. Confirm that the expected behaviour is relevant and that the evidence supports the interpretation.",
      },
      {
        number: "2",
        title: "Identify the smallest meaningful gap",
        text: "Move from a broad label such as “poor conversation quality” to an observable moment such as “the unresolved need was not confirmed before closure”.",
      },
      {
        number: "3",
        title: "Choose the right response",
        text: "Missing knowledge may need a concise explanation or job aid. Weak application may need a scenario or coached practice. Inconsistent execution may need manager observation. A repeated system-wide pattern may require process review.",
      },
      {
        number: "4",
        title: "Support the next conversation",
        text: "Bring guidance or a prompt close to the relevant moment without interrupting every interaction. Make it clear, brief and connected to the agreed behaviour.",
      },
      {
        number: "5",
        title: "Observe again",
        text: "Look for the behaviour in later, appropriately authorised evidence. Avoid treating one improved conversation as permanent proof or one weak conversation as failure.",
      },
    ],

    close:
      "This is the bridge from performance intelligence to capability development.",

    /**
     * The seven-step flow. `icon` names the drawing, `tone` the colour it
     * takes, and `arrow` the colour of the connector AFTER it — the export
     * shifts hue along the chain and dashes the final connector, because the
     * loop back to observation is not a hard step.
     */
    flow: {
      title: "Illustrative analytical workflow",
      steps: [
        { icon: "consent", label: "Capture with consent", tone: "plum" },
        { icon: "transcribe", label: "Transcribe / translate", tone: "plum" },
        { icon: "indicators", label: "Apply agreed indicators", tone: "mauve" },
        { icon: "review", label: "Review patterns", tone: "mauve" },
        {
          icon: "validate",
          label: "Validate with people & context",
          tone: "terracotta",
        },
        { icon: "respond", label: "Choose a response", tone: "plum" },
        { icon: "observe", label: "Observe again", tone: "olive" },
      ],
      /** Connector colours between the steps, and whether each is dashed. */
      connectors: [
        { tone: "plum" },
        { tone: "mauve" },
        { tone: "mauve" },
        { tone: "terracotta" },
        { tone: "plum" },
        { tone: "olive", dashed: true },
      ],
      caption:
        "Consented conversations move through transcription, agreed indicators, pattern review, human validation and response before later observation. This illustrates a responsible pattern; it is not a representation of the exact implementation methodology.",
    },
  },

  /** s7 — the limits, stated plainly on their own panel. */
  limits: {
    heading: "What the evidence does not prove",
    panel: [
      "The confirmed implementation summary does not support a claim that the 9,328 conversations were representative of every employee, branch, language or customer situation.",
      "It does not provide prevalence rates for the three findings. It does not establish that one branch was better than another. It does not quantify conversion, revenue, compliance, customer satisfaction or learning impact.",
      "It also does not show that automated analysis should replace manager judgement, quality review or customer-context understanding.",
      "These are not small caveats to hide in a footnote. They define the responsible use of the evidence.",
    ],
    close:
      "The field lesson is not that conversation data answers every performance question. It is that work creates evidence learning systems have historically been unable to see—and that evidence can improve decisions when interpreted carefully.",
  },

  /** s8 — the shift in where a decision starts. */
  startingPoint: {
    heading: "Performance intelligence changes the starting point",
    intro: "Traditional learning decisions often begin with a catalogue:",
    oldQuestion: "Which course should we assign?",
    bridge: "Conversation evidence allows a different starting point:",
    newQuestion:
      "What is happening in the work, where is the pattern, and what response fits the cause?",
    body: [
      "Sometimes the answer will be learning. Sometimes it will be practice, coaching, clearer knowledge, workflow support or process redesign.",
      "The important shift is from assuming the intervention to examining the performance.",
      "For leaders, the value of 9,328 conversations is therefore not simply the volume analysed. It is the possibility of seeing what was previously anecdotal: where knowledge appears, where an opportunity disappears, where performance varies and where the organisation should look next.",
    ],

    shift: {
      wasLabel: "The closing question is not",
      was: "How many conversations did we analyse?",
      isLabel: "It is",
      is: "What can we now understand about performance—and what are we prepared to do responsibly with that understanding?",
      close:
        "That is when frontline activity becomes performance intelligence.",
    },
  },

  /**
   * The evidence notes. The first entry has no link — it is the anonymised
   * record itself, and the whole point is that it cannot be cited.
   */
  sources: {
    heading: "Evidence and reading notes",
    items: [
      {
        number: "01",
        title: "Anonymised implementation record.",
        links: [],
        note: "Confirmed public-facing facts: 9,328 frontline conversations; 25 branches; multilingual financial-services context; the three findings above. The client, employees, products and branches are not identified, and no transcript excerpts are reproduced. The currently available record does not contain a publishable methodology, time period, sampling statement, language distribution, accuracy evaluation, finding prevalence, comparative baseline or quantified business outcome.",
      },
      {
        number: "02",
        title:
          "National Institute of Standards and Technology. “Artificial Intelligence Risk Management Framework (AI RMF 1.0).”",
        links: [
          {
            label: "Read the framework",
            href: "https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf",
          },
        ],
        note: "Use: the general principle that AI systems are socio-technical and should be evaluated in relation to intended use, operators, context, governance, measurement and risk. Qualification: does not validate this implementation, its analysis or the three findings; supporting guidance for responsible interpretation and governance only.",
      },
    ],
  },

  footer: {
    /** "field note", matching how the article names itself. */
    shareLabel: "Share this field note",
    byline: "Lurny Insights · Performance intelligence",
  },

  /** Three related articles, unlike the second article's single card. */
  related: {
    heading: "Related insights",
    link: { label: "Explore all insights", href: "/resources/insights" },
    items: [
      {
        category: "AI-native learning",
        title: "Learning in the flow of work needs more than recommendations",
        readTime: "7 min read",
        href: "/resources/insights/flow-of-work",
      },
      {
        category: "Capability & readiness",
        title: "What does ‘ready’ actually mean at work?",
        readTime: "6 min read",
        href: "/resources/insights/ready-at-work",
      },
      {
        category: "Enterprise AI & field lessons",
        title: "Context is the enterprise AI advantage",
        readTime: "6 min read",
        href: "/resources/insights/context-advantage",
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
    title: "What 9,328 frontline conversations revealed",
    dismiss: "Dismiss mini player",
  },
} as const;
