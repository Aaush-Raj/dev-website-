/**
 * INSIGHT ARTICLE — "Context is the enterprise AI advantage"
 * ---------------------------------------------------------------------------
 * Card 5 of the Insights "Ideas worth exploring" grid, at
 * /resources/insights/context-advantage.
 *
 * Copy is VERBATIM from the supplied HTML export, punctuation included.
 *
 * ITS ACCENT IS SAGE (#68775A) with two lighter steps. Note this is NOT the
 * second article's olive (#68796B) — a cooler, greener hue, sampled from this
 * export rather than assumed from the earlier one.
 *
 * IT CITES FOUR SOURCES, the most of any article in the series: two NIST
 * frameworks, the original RAG paper and "Lost in the Middle". Each is listed
 * at the foot with both its USE and its QUALIFICATION, and the two research
 * papers are also hedged inline — the export is careful that RAG's results
 * were on specific benchmarks and that the long-context finding concerns the
 * models tested rather than being a universal limit. Those hedges are copy,
 * so they travel with the claims they qualify.
 */

export const contextAdvantage = {
  meta: {
    title: "Context is the enterprise AI advantage",
    description:
      "The model brings general capability. Enterprise value appears when it can work with the right knowledge, role, history and situation—without losing provenance, permission or human judgement.",
    path: "/resources/insights/context-advantage",
  },

  breadcrumb: ["Resources", "Insights"],

  category: "Enterprise AI & field lessons",

  title: "Context is the enterprise AI advantage",

  standfirst:
    "The model brings general capability. Enterprise value appears when it can work with the right knowledge, role, history and situation—without losing provenance, permission or human judgement.",

  facts: ["6 min read", "Lurny Insights"],

  actions: {
    read: { label: "Read article", href: "#s1" },
    listen: { label: "Audio version", href: "#listen" },
  },

  /** The hero diagram's embedded labels: the six signals, and the surface. */
  heroLabels: {
    signals: ["ROLE", "POLICY", "CASE", "WORKFLOW", "HISTORY", "SIGNAL"],
    surface: "CONTEXT SURFACE",
  },

  /** THE AUDIO EDITION — enabled, running the simulated clock to 06:24. */
  audio: {
    eyebrow: "Listen to this insight",
    title: "Context is the enterprise AI advantage",
    description: "A conversational audio version of this article.",

    /** Seconds. 384 = the 06:24 the export displays. */
    duration: 384,
    durationLabel: "06:24",

    transcriptLabel: "View transcript",
    footnote: "Lurny Insights · Audio edition",

    transcript: [
      {
        time: "00:00",
        text: "The same model can look brilliant in a demonstration and ordinary in a workflow.",
      },
      {
        time: "01:20",
        text: "Context is more than company data — the five layers that matter.",
      },
      {
        time: "03:05",
        text: "Why retrieval helps but does not finish the job.",
      },
      { time: "04:35", text: "Making context operational, step by step." },
      { time: "05:50", text: "Context needs boundaries." },
    ],
  },

  rail: {
    title: "In this insight",
    mobileLabel: "Contents",
    items: [
      { id: "s1", label: "A different result" },
      { id: "s2", label: "More than company data" },
      { id: "s3", label: "Retrieval helps" },
      { id: "s4", label: "More is not better" },
      { id: "s5", label: "A service-team example" },
      { id: "s6", label: "Make context operational" },
      { id: "s7", label: "Context needs boundaries" },
      { id: "s8", label: "The advantage is organisational" },
    ],
    tools: {
      share: "Share",
      copy: { idle: "Copy link", done: "Link copied" },
      print: "Print",
    },
  },

  /* =========================== The article ============================ */

  /** s1 — the same model, two very different results. */
  result: {
    heading: "The same model, a different result",
    body: [
      "The same model can look brilliant in a demonstration and ordinary in a workflow.",
      "Ask it to summarise a public document and it may respond fluently. Ask it to help an employee resolve a live customer issue and the real questions begin.",
      "Which customer? Which product? What has already happened? Which policy applies today? What is the employee authorised to do? Which promise was made in the previous interaction? When should the system stop and involve a person?",
      "The model may be capable. Without that context, it is still guessing at the work.",
      "This is why enterprise AI advantage is unlikely to come from access to a model alone. Capable models are increasingly available to many organisations. The difference appears in how well an organisation can connect that capability to its own knowledge, responsibilities, workflows and evidence.",
      "Context turns a general answer into a relevant one. Governance determines whether that answer can be trusted and used.",
    ],
  },

  /** s2 — the five layers. */
  layers: {
    heading: "Context is more than company data",
    intro: [
      "It is tempting to define enterprise context as a collection of documents: policies, manuals, product notes and process guides.",
      "Approved knowledge is essential, but it is only one layer.",
      "Useful context normally includes five things.",
    ],

    /**
     * The figure. `tone` names the ring colour and the bars widen down the
     * list — the export shows the layers accumulating rather than ranking.
     */
    figure: {
      title: "Five layers of useful context",
      items: [
        {
          title: "Purpose",
          text: "The task, decision or outcome required",
          tone: "violet",
          width: 46,
        },
        {
          title: "Role",
          text: "Who is asking, their responsibility and authority",
          tone: "sage",
          width: 54,
        },
        {
          title: "Knowledge",
          text: "Approved policies, products, processes and expertise",
          tone: "sage",
          width: 62,
        },
        {
          title: "Situation",
          text: "The current customer, case, workflow and constraints",
          tone: "sageMid",
          width: 70,
        },
        {
          title: "History",
          text: "Relevant prior actions, commitments and outcomes",
          tone: "sageMid",
          width: 78,
        },
      ],
      caption:
        "Purpose, role, approved knowledge, current situation and relevant history form five distinct layers of enterprise context.",
    },

    /** The five layers again, each explained under its own sub-heading. */
    detail: [
      {
        heading: "1. Purpose",
        text: "What task, decision or outcome is required? “Help with this account” is vague. “Prepare the employee to explain the delay, confirm the unresolved need and agree the next authorised action” is much clearer.",
      },
      {
        heading: "2. Role",
        text: "Who is asking? Their role affects the language, detail, responsibility and authority of the response. A frontline employee, manager, compliance reviewer and customer should not receive the same assistance.",
      },
      {
        heading: "3. Approved knowledge",
        text: "Which policies, products, procedures and expert sources are authoritative? Are they current? Who owns them? Can the system show where its answer came from?",
      },
      {
        heading: "4. Situation",
        text: "What is happening now? The customer, case, location, workflow stage, channel, available time and consequence of error all shape what a useful response looks like.",
      },
      {
        heading: "5. History",
        text: "Which prior actions, commitments and outcomes are relevant? History prevents the system from treating every interaction as if it were the first.",
      },
    ],

    /** Set on a dark panel. */
    pullQuote:
      "Context is not the amount of information available. It is the relevance of the information assembled for the work.",
  },

  /** s3 — retrieval is not the same as context. */
  retrieval: {
    heading: "Retrieval helps. It does not finish the job.",

    /** The RAG citation, with its scope stated inline. `{0}` is the link. */
    cited: {
      text: "Retrieval-augmented generation, commonly called RAG, established an important technical pattern: combine a model’s learned parameters with information retrieved from an external source. In the original 2020 paper, the researchers evaluated this approach on knowledge-intensive language tasks and reported stronger results than the parametric-only baseline they tested. {0}.",
      links: [
        {
          label: "Read the NeurIPS paper",
          href: "https://proceedings.neurips.cc/paper/2020/hash/6b493230205f780e1bc26945df7481e5-Abstract.html",
        },
      ],
    },

    body: [
      "For an enterprise, retrieval can help bring current, approved material into the response. It can also make source references possible.",
      "But retrieval is not the same as context.",
      "A system may retrieve an outdated document, a policy for the wrong jurisdiction or a paragraph the user is not permitted to see. It may retrieve something relevant to the topic but irrelevant to the decision. It may fail to retrieve the exception that changes the answer.",
      "The work therefore includes source ownership, metadata, access control, freshness, ranking, evaluation and a clear response when evidence is insufficient.",
      "The AI does not become enterprise-ready because it can search a folder.",
    ],
  },

  /** s4 — more context is not automatically better. */
  more: {
    heading: "More context is not automatically better",
    body: [
      "Another tempting response is to give the model everything: every document, message, meeting, transaction and conversation.",
      "That creates noise, privacy risk and conflicting instructions. It may also fail technically.",
    ],

    /**
     * The "Lost in the Middle" citation. Its qualification — that the finding
     * concerns the models and tasks studied rather than being a universal
     * limit — is part of the sentence, not a footnote.
     */
    cited: {
      text: "In “Lost in the Middle”, researchers tested language models on multi-document question answering and key-value retrieval. Performance often changed depending on where the relevant information appeared, with weaker results when it sat in the middle of a long context. The finding concerns the models and tasks studied; it is not a universal limit. It does challenge the assumption that a larger context window automatically means robust use of everything inside it. {0}.",
      links: [
        {
          label: "Read the TACL paper",
          href: "https://aclanthology.org/2024.tacl-1.9/",
        },
      ],
    },

    close: [
      "Good context is selective.",
      "It brings forward the information that matters, keeps provenance visible and leaves out material that is irrelevant or unauthorised.",
    ],
  },

  /** s5 — the worked scenario, on its own tinted card. */
  example: {
    heading: "Consider a service team handling a repeat request",
    eyebrow: "Illustrative scenario",
    body: [
      "Imagine a customer contacts a service team because an issue marked as resolved has returned.",
      "A generic assistant can produce a courteous apology and a list of troubleshooting steps.",
      "A context-aware assistant could work from the customer’s authorised case history, the product involved, the last commitment made, the current service policy, the employee’s permission level and the next available workflow action.",
      "It might help the employee recognise that the customer has already repeated the standard steps. It could surface the relevant exception, suggest a clarifying question and identify when escalation is required.",
      "This is an illustrative scenario, not a reported client result.",
      "The value is not simply a better paragraph. It is a better-supported moment of work.",
      "The boundaries matter equally. The assistant should not reveal another customer’s information, infer an entitlement that policy does not support or make a decision outside the employee’s authority. If the evidence conflicts, the correct response may be to pause and request human review.",
    ],
  },

  /** s6 — the seven steps, and the governed-context flow. */
  operational: {
    heading: "Make context operational",
    intro:
      "Context becomes an enterprise capability when it is designed as part of the workflow rather than added to a prompt at the end.",

    steps: [
      {
        number: "1",
        title: "Start with a specific moment",
        text: "Choose a recurring task or decision where relevant assistance could improve quality, speed or consistency. Avoid beginning with “give everyone an AI assistant”.",
      },
      {
        number: "2",
        title: "Identify the minimum useful context",
        text: "Map what the system needs to know about purpose, role, knowledge, situation and history. Separate essential signals from information that is merely available.",
      },
      {
        number: "3",
        title: "Establish source ownership",
        text: "Every important source needs an owner, a freshness expectation and a way to handle conflict. An elegant answer built on an obsolete rule remains wrong.",
      },
      {
        number: "4",
        title: "Enforce permissions before retrieval",
        text: "Access should follow the person, purpose and task. The system should not retrieve sensitive material and hope the final response hides it.",
      },
      {
        number: "5",
        title: "Ground the response",
        text: "Show the source or basis for consequential claims. Make uncertainty visible. Define what the system should do when evidence is missing, contradictory or below the required confidence.",
      },
      {
        number: "6",
        title: "Preserve human responsibility",
        /** This step's citation sits mid-paragraph, so it uses the splice. */
        cited: {
          text: "Clarify which actions the AI may support, which require confirmation and which remain prohibited. NIST’s AI Risk Management Framework describes AI systems as socio-technical: their risks and benefits depend not only on technical components, but also on how they are used, who operates them and the context in which they are deployed. {0}.",
          links: [
            {
              label: "See the NIST AI RMF",
              href: "https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf",
            },
          ],
        },
      },
      {
        number: "7",
        title: "Evaluate the whole interaction",
        text: "Test realistic cases, including exceptions and failure conditions. Review whether the right source was retrieved, whether the response was appropriate for the role and whether the resulting action was correct.",
      },
    ],

    close:
      "This creates a learning loop. Outcomes can improve source curation, retrieval rules, workflow design and evaluation. It should not mean automatically using every interaction to retrain a model.",

    /**
     * The seven-step flow. `tone` colours each glyph, and `connectors` the
     * arrow after it — the export dashes only the last, because feeding what
     * was learned back in is a loop rather than a hard next step.
     */
    flow: {
      title: "Governed context to action",
      steps: [
        { icon: "select", label: "Select", tone: "sage" },
        { icon: "retrieve", label: "Retrieve", tone: "sage" },
        { icon: "permission", label: "Check permission", tone: "terracotta" },
        { icon: "ground", label: "Ground & cite", tone: "sage" },
        { icon: "human", label: "Human judgement", tone: "violet" },
        { icon: "act", label: "Act", tone: "sage" },
        { icon: "learn", label: "Learn", tone: "sageMid" },
      ],
      connectors: [
        { tone: "sage" },
        { tone: "terracotta" },
        { tone: "sage" },
        { tone: "violet" },
        { tone: "sage" },
        { tone: "sageMid", dashed: true },
      ],
      caption:
        "Selected information passes through retrieval, permission, grounding, human judgement and action before feedback informs future improvement.",
    },
  },

  /** s7 — the boundaries around what context may include. */
  boundaries: {
    heading: "Context needs boundaries",
    intro:
      "Enterprise context can include personal, confidential and commercially sensitive information. “The model needs context” is not permission to collect or expose everything.",

    cited: {
      text: "Define acceptable use, data boundaries, retention, access, oversight and routes for correction. NIST’s Generative AI Profile similarly frames risk management around specific settings, requirements and organisational priorities, with attention to governance, provenance and testing. {0}.",
      links: [
        {
          label: "Read the NIST GenAI Profile",
          href: "https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf",
        },
      ],
    },

    close:
      "Context also decays. Products change. Policies are superseded. Customers make new decisions. Roles acquire different permissions. A reliable context layer needs ownership and maintenance, not only an initial upload.",
  },

  /** s8 — the close, ending on four questions rather than one. */
  advantage: {
    heading: "The advantage is organisational",
    body: [
      "The model matters. So do retrieval, integration and interface design.",
      "But the durable enterprise capability sits around them: knowing which work matters, organising trusted knowledge, connecting authorised signals, defining decision rights and learning from outcomes.",
      "That capability is difficult to copy because it reflects how the organisation actually operates.",
    ],

    /**
     * Unlike the other articles' single replacement question, this one closes
     * on FOUR — so the shape here is a list rather than a pair.
     */
    shift: {
      wasLabel:
        "The next enterprise AI conversation should therefore move beyond",
      was: "Which model are we using?",
      isLabel: "And ask",
      questions: [
        "What work is it supporting?",
        "What relevant context can it use?",
        "What is it permitted to do?",
        "How will we know the resulting action was sound?",
      ],
      close:
        "The model provides potential. Context makes that potential specific. Governance makes it usable.",
    },
  },

  /**
   * Four sources — the most in the series. Each states both its USE and its
   * QUALIFICATION.
   */
  sources: {
    heading: "Sources and reading",
    items: [
      {
        number: "01",
        citation: {
          before:
            "National Institute of Standards and Technology. “Artificial Intelligence Risk Management Framework (AI RMF 1.0).”",
          italic: "",
          after: "",
        },
        link: {
          label: "Read the framework",
          href: "https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf",
        },
        note: "Use: the socio-technical framing of AI systems and the importance of intended use, operators, social context, governance and lifecycle risk management. Qualification: a voluntary, use-case-agnostic framework; it does not endorse this article’s specific enterprise-context architecture.",
      },
      {
        number: "02",
        citation: {
          before:
            "National Institute of Standards and Technology. “Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile.” NIST AI 600-1.",
          italic: "",
          after: "",
        },
        link: {
          label: "Read the profile",
          href: "https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf",
        },
        note: "Use: the need to manage generative-AI risk in relation to specific settings, requirements, risk tolerance and organisational priorities, with attention to governance, content provenance and testing. Qualification: suggested risk-management actions, not evidence that a particular implementation is safe or effective.",
      },
      {
        number: "03",
        citation: {
          before:
            "Lewis, P., et al. (2020). “Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks.” ",
          italic: "NeurIPS",
          after: ".",
        },
        link: {
          label: "Read the paper",
          href: "https://proceedings.neurips.cc/paper/2020/hash/6b493230205f780e1bc26945df7481e5-Abstract.html",
        },
        note: "Use: the original RAG pattern combining a pretrained model’s parametric memory with retrieved non-parametric memory, and its reported results on evaluated knowledge-intensive tasks. Qualification: used Wikipedia-based retrieval and specific benchmarks; not evidence that every enterprise RAG deployment will be accurate, secure or effective.",
      },
      {
        number: "04",
        citation: {
          before:
            "Liu, N. F., et al. (2024). “Lost in the Middle: How Language Models Use Long Contexts.” ",
          italic: "TACL",
          after: ".",
        },
        link: {
          label: "Read the paper",
          href: "https://aclanthology.org/2024.tacl-1.9/",
        },
        note: "Use: the finding that model performance in the evaluated tasks changed with the position of relevant information in long input contexts. Qualification: tested particular models and tasks; use to challenge the assumption that more context is automatically better, not to claim every model always fails on long contexts.",
      },
    ],
  },

  footer: {
    shareLabel: "Share this insight",
    byline: "Lurny Insights · Enterprise AI & Field Lessons",
  },

  related: {
    heading: "Related insights",
    link: { label: "Explore all insights", href: "/resources/insights" },
    items: [
      {
        category: "Capability & readiness",
        title: "From competency documents to living baselines",
        readTime: "5 min read",
        href: "/resources/insights/living-baselines",
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
    title: "Context is the enterprise AI advantage",
    dismiss: "Dismiss mini player",
  },
} as const;
