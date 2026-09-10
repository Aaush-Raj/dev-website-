/**
 * INSIGHT ARTICLE — "Why content creation is no longer the bottleneck"
 * ---------------------------------------------------------------------------
 * Card 2 of the Insights "Ideas worth exploring" grid, at
 * /resources/insights/content-creation.
 *
 * Copy is VERBATIM from the supplied HTML export, punctuation included.
 *
 * THIS ARTICLE CITES REAL RESEARCH, which is the main way it differs from the
 * first. Three studies are referenced inline and listed again in full at the
 * foot, each with its scope stated — the export is careful to say what each
 * source does NOT establish, and that hedging is part of the copy rather than
 * a note about it. The `links` on a paragraph are spliced into `{0}`, so a
 * citation cannot drift away from the sentence that earns it.
 *
 * ITS ACCENT IS OLIVE, not the violet of "ready at work": the category rule,
 * the rail's active marker, the pull-quote's border and the progress bar all
 * take #68796B. The palette is otherwise the same.
 */

export const contentCreation = {
  meta: {
    title: "Why content creation is no longer the bottleneck",
    description:
      "AI makes it easier to produce learning content. The harder work is deciding what deserves to be created, making it trustworthy, and connecting it to what people need to do.",
    path: "/resources/insights/content-creation",
  },

  breadcrumb: ["Resources", "Insights"],

  category: "AI-native learning",

  title: "Why content creation is no longer the bottleneck",

  standfirst:
    "AI makes it easier to produce learning content. The harder work is deciding what deserves to be created, making it trustworthy, and connecting it to what people need to do.",

  /** The two facts on the rule beneath the standfirst. */
  facts: ["7 min read", "Lurny Insights"],

  /** The two buttons under the facts. */
  actions: {
    read: { label: "Read article", href: "#s1" },
    listen: { label: "Audio version", href: "#listen" },
  },

  /** The hero diagram's own embedded labels. */
  heroLabels: {
    sources: "SOURCES",
    review: "REVIEW",
    outputs: "OUTPUT FORMATS",
  },

  /**
   * THE AUDIO CARD.
   *
   * Unlike the first article's, this one is DISABLED in the export: its play
   * button carries `disabled`, its times read "--:--" and its label says the
   * audio version is coming. It is rebuilt that way rather than given the
   * first article's simulated clock — the design states plainly that there is
   * nothing to play yet, and inventing a fake timer here would contradict it.
   */
  audio: {
    eyebrow: "Listen to this insight",
    title: "Why content creation is no longer the bottleneck",
    description: "A conversational audio version of this article.",
    status: "Audio version coming soon",
    /** Both clocks show this while there is no file. */
    placeholderTime: "--:--",
    speed: "1×",
    playLabel: "Play audio — audio version coming soon",
    progressLabel: "Playback progress — unavailable",
  },

  rail: {
    title: "In this insight",
    /** The mobile disclosure that replaces the rail below lg. */
    mobileLabel: "Contents",
    items: [
      { id: "s1", label: "The queue has changed" },
      { id: "s2", label: "A faster draft" },
      { id: "s3", label: "One document, five formats" },
      { id: "s4", label: "The bottleneck has moved" },
      { id: "s5", label: "A service team example" },
      { id: "s6", label: "Expertise becomes more valuable" },
      { id: "s7", label: "Start with a brief" },
      { id: "s8", label: "Measure the whole journey" },
      { id: "s9", label: "What happens next" },
    ],
    tools: {
      share: "Share",
      copy: { idle: "Copy link", done: "Link copied" },
      print: "Print",
    },
  },

  /* =========================== The article ============================ */

  /** s1 — production used to be the constraint. */
  queue: {
    heading: "The queue has changed",
    body: [
      "Picture a familiar request: “We need a learning programme on the new process.”",
      "A document arrives. Someone extracts the important points, writes a script, builds slides, records a voice-over, adds questions and sends everything for review. By the time the programme is published, an updated document may already be waiting.",
      "When production takes this much effort, the backlog naturally becomes the problem everyone can see.",
      "Generative AI changes that calculation. A source document can become the starting point for a lesson draft, a scenario, a quiz, an audio script or a visual explanation. Much of the first-pass work can happen faster.",
    ],

    /**
     * The export bolds "first-pass work" mid-sentence, so the paragraph is
     * split around it rather than carrying markup in the string.
     */
    qualification: {
      before: "The important qualification is ",
      strong: "first-pass work",
      after:
        ". Complex simulations, specialist material, accessibility and careful validation still require time.",
    },

    close:
      "The headline is not a claim that every content-production problem has disappeared. It is a challenge to an operating model: when drafting becomes easier, producing more material cannot remain the central definition of progress.",
  },

  /** s2 — the Noy & Zhang study, and what it does not say. */
  draft: {
    heading: "A faster draft is not a finished learning experience",

    /** `{0}` is replaced by the link that follows it. */
    cited: {
      text: "In a controlled study of professional writing tasks, Shakked Noy and Whitney Zhang found that access to a generative AI assistant reduced task time and improved average assessed output quality. The experiment concerned writing—not the effectiveness of enterprise learning programmes. Its relevance here is narrower: parts of content production can become substantially less time-consuming. {0}.",
      links: [
        {
          label: "Read the study",
          href: "https://pubmed.ncbi.nlm.nih.gov/37440646/",
        },
      ],
    },

    body: [
      "The implication for L&D is worth considering.",
      "When a draft takes less effort, the constraint may move to deciding what to teach, resolving contradictory sources, reviewing accuracy or getting employees to use the result.",
      "A team can therefore become faster at authoring without becoming faster at improving performance.",
      "There is little benefit in clearing the production queue only to create a larger approval queue—or a library that employees find harder to navigate.",
    ],
  },

  /** s3 — five formats are not five learning experiences. */
  formats: {
    heading: "One document, five formats. How much learning?",

    figureTitle: "Format follows purpose",

    /** `icon` names the drawing in ContentCreationArt.tsx. */
    items: [
      { icon: "podcast", title: "Podcast", purpose: "Introduce an idea" },
      {
        icon: "demonstration",
        title: "Demonstration",
        purpose: "Make a process visible",
      },
      { icon: "scenario", title: "Scenario", purpose: "Require a decision" },
      {
        icon: "jobAid",
        title: "Job aid",
        purpose: "Support work in the moment",
      },
    ],

    body: [
      "Turning a policy into a video, podcast, infographic, quiz and microcourse creates five assets.",
      "It does not necessarily create five useful learning experiences.",
      "The formats may all repeat the same explanation. None may ask the employee to recognise a relevant situation, make a decision or practise a difficult response.",
      "Format variety has value: people need different ways to access information. But access and learning design are different questions.",
      "A podcast can introduce an idea. A demonstration can make a process visible. A scenario can require a decision. Feedback can explain why that decision matters. A job aid can support the employee during work.",
      "The format should follow the purpose.",
    ],

    pullQuote:
      "The same information in another format is not automatically another opportunity to learn.",
  },

  /** s4 — the four parts of the work that now matter more. */
  moved: {
    heading: "The bottleneck has moved",
    intro:
      "For many routine assets, the next improvement will come from strengthening four parts of the work around creation.",

    items: [
      {
        number: "01",
        title: "Choosing the right performance problem",
        body: [
          "“Create a course on customer service” is a production request, not a diagnosis.",
          "What is happening in customer interactions? Are employees missing important questions, giving incomplete explanations, mishandling exceptions or failing to agree the next step?",
          "Different gaps require different responses. Some may need learning. Others may involve unclear ownership, missing information, poor tools or unrealistic incentives.",
          "AI can help generate material from a brief. It cannot make an undefined performance problem precise by simply producing more content.",
        ],
      },
      {
        number: "02",
        title: "Establishing what can be trusted",
        body: [
          "An attractive lesson can still contain an outdated instruction, an omitted exception or a confident invention.",
        ],
        /** The NIST citation sits mid-item, so it is kept as its own field. */
        cited: {
          text: "NIST’s Generative AI Profile identifies confidently incorrect output as a risk and describes measures for evaluation and risk management. Fluency is not a sufficient basis for trust. {0}.",
          links: [
            {
              label: "See the NIST profile",
              href: "https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf",
            },
          ],
        },
        after: [
          "For enterprise learning, the practical questions are straightforward: Which source is authoritative? Who owns it? Is it current? Who approves the interpretation?",
          "Grounding generation in approved material helps, but does not remove the need to check the result. Sensitive material also needs an approved environment and appropriate access controls.",
        ],
      },
      {
        number: "03",
        title: "Designing what the learner must do",
        body: [
          "A well-written explanation is only one part of learning.",
          "The designer still needs to decide what the learner should recall, distinguish, practise and apply—and what feedback will help.",
        ],
        cited: {
          text: "Research by Henry Roediger and Jeffrey Karpicke found that retrieval testing improved delayed retention compared with repeated study in experiments using prose passages. That finding does not prove workplace transfer, but it illustrates why learner activity matters beyond presentation. {0}.",
          links: [
            {
              label: "Read the research",
              href: "https://pubmed.ncbi.nlm.nih.gov/16507066/",
            },
          ],
        },
        after: [
          "For a judgement-heavy task, a short scenario with meaningful consequences may be more useful than another polished explanation.",
        ],
      },
      {
        number: "04",
        title: "Connecting the experience to work",
        body: [
          "Even accurate, well-designed content can arrive at the wrong time or remain disconnected from an employee’s responsibilities.",
          "Who needs it? What should they do afterwards? Will they have an opportunity to practise? What will their manager observe? Where can they find support during the task?",
          "These questions turn publishing into a learning intervention.",
          "Without them, the organisation has improved distribution, not necessarily capability.",
        ],
      },
    ],
  },

  /** s5 — the worked scenario, on its own tinted card. */
  example: {
    heading: "Consider a service team with repeat complaints",
    eyebrow: "Illustrative scenario",

    /** The three moments marked along the conversation diagram. */
    moments: ["Policy explained", "Need confirmed", "Next action agreed"],

    intro: [
      "Imagine a service team whose customers keep returning about supposedly resolved issues.",
      "The immediate request is to update the service-training course.",
      "But a review of appropriately authorised, anonymised interaction samples suggests something more specific: employees explain the policy correctly, yet close conversations without confirming the unresolved need or agreeing a clear next action.",
      "This is an illustrative scenario, not a reported client result.",
      "A large new course might be unnecessary. A focused response could combine:",
    ],

    list: [
      "A short lesson on recognising incomplete resolution.",
      "A branching scenario in which the employee chooses a follow-up question.",
      "Feedback showing how each response changes the conversation.",
      "A compact job aid available during service interactions.",
      "A manager observation guide for subsequent coaching.",
    ],

    close: [
      "AI can assist with producing these materials. Their usefulness depends on the diagnosis, the quality of the examples and the connection to real work.",
      "The follow-up question is not simply whether employees completed the lesson. It is whether conversations now include clearer confirmation and next steps.",
      "Repeat-contact patterns could provide additional evidence, interpreted alongside changes in systems, staffing and the issues customers bring.",
    ],
  },

  /** s6 — what experts should spend the freed time on. */
  expertise: {
    heading: "Expertise becomes more valuable, not less",
    body: [
      "Reducing the effort of drafting should change how subject-matter experts spend their time.",
      "Instead of repeatedly explaining the same process to a production team, an expert can focus on the distinctions that matter: common misconceptions, unusual cases, risky shortcuts and the judgement behind a good decision.",
      "Instructional designers can spend more time shaping practice and feedback. Managers can contribute examples of what is actually happening at work.",
      "This requires a deliberate workflow. Otherwise, faster generation may simply flood the same experts with more material to approve.",
      "Create reusable, approved source material. Assign review responsibility. Match the depth of review to the consequences of error. Keep a route for corrections and updates.",
    ],
  },

  /** s7 — the five-question brief. */
  brief: {
    heading: "Start with a brief, not a file upload",
    intro:
      "Before generating the next asset, write a short brief that answers five questions:",

    items: [
      {
        number: "1",
        question: "Who is this for?",
        note: "Name the role and relevant starting capability.",
      },
      {
        number: "2",
        question: "What must they do differently?",
        note: "Describe an observable action or decision.",
      },
      {
        number: "3",
        question: "Which sources and boundaries govern the answer?",
        note: "Include important exceptions.",
      },
      {
        number: "4",
        question: "What experience will help?",
        note: "Choose explanation, practice, feedback or in-work support deliberately.",
      },
      {
        number: "5",
        question: "What evidence will show whether it helped?",
        note: "Decide what to observe after release.",
      },
    ],

    close: [
      "A source document is an input to this brief, not a substitute for it.",
      "These questions also make “do not create anything new” a legitimate answer. The right intervention may be to improve an existing guide, remove a confusing instruction or make approved information easier to find.",
    ],
  },

  /** s8 — separate production measures from learning measures. */
  measure: {
    heading: "Measure the whole journey",
    body: [
      "Authoring speed matters. Time saved can free scarce capacity for better work.",
      "But keep production measures separate from learning and performance measures.",
      "Track the time from an identified need to an approved, usable intervention—not only the time to generate a draft. Watch review effort, rework, maintenance and whether outdated versions are retired.",
      "Then examine whether employees can make the relevant decisions in practice and apply them in the workplace.",
      "Business outcomes add another perspective, but a change in results cannot automatically be attributed to content. Tools, processes, manager support and working conditions also matter.",
      "The useful cycle is: identify a gap, create a targeted experience, support application, examine evidence and revise.",
      "Content is one part of that cycle, not its final destination.",
    ],
  },

  /** s9 — the close, ending on the two questions. */
  next: {
    heading: "The advantage is what happens next",
    body: [
      "For organisations where production was the main constraint, faster creation is a genuine opportunity.",
      "The mistake would be to spend all that new capacity generating more of what was already difficult to use.",
      "The better opportunity is to make learning more specific, more timely and more connected to performance.",
    ],

    /** The old question and the better one, set apart above the rule. */
    shift: {
      wasLabel: "The question used to be",
      was: "How quickly can we create this content?",
      isLabel: "The more useful question now is",
      is: "What should this content help someone do—and how will we know it did?",
      close: "That is where the next bottleneck needs our attention.",
    },
  },

  /**
   * The full citation list. Each entry states its SCOPE — what the source
   * does and does not establish — which the export is deliberate about, so
   * the field is required rather than optional.
   */
  sources: {
    heading: "Sources and reading",
    items: [
      {
        number: "01",
        /** Split so the journal name can be italicised without markup. */
        citation: {
          before:
            "Noy, S., and Zhang, W. (2023). “Experimental evidence on the productivity effects of generative artificial intelligence.” ",
          italic: "Science",
          after: ", 381(6654), 187–192.",
        },
        links: [
          {
            label: "Study abstract",
            href: "https://pubmed.ncbi.nlm.nih.gov/37440646/",
          },
          { label: "DOI", href: "https://doi.org/10.1126/science.adh2586" },
        ],
        scope:
          "Scope: a controlled experiment on professional writing tasks. It does not establish learning effectiveness, universal productivity improvements or enterprise-wide bottleneck shifts.",
      },
      {
        number: "02",
        citation: {
          before:
            "National Institute of Standards and Technology (2024). “Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile.” NIST AI 600-1.",
          italic: "",
          after: "",
        },
        links: [
          {
            label: "Official publication",
            href: "https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence",
          },
          {
            label: "Official PDF",
            href: "https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf",
          },
        ],
        scope:
          "Scope: generative-AI risks and suggested management measures, including confidently incorrect output. The article’s recommended review workflow is an editorial application, not a claim of certification or legal compliance.",
      },
      {
        number: "03",
        citation: {
          before:
            "Roediger, H. L., and Karpicke, J. D. (2006). “Test-enhanced learning: Taking memory tests improves long-term retention.” ",
          italic: "Psychological Science",
          after: ", 17(3), 249–255.",
        },
        links: [
          {
            label: "Study abstract",
            href: "https://pubmed.ncbi.nlm.nih.gov/16507066/",
          },
          {
            label: "DOI",
            href: "https://doi.org/10.1111/j.1467-9280.2006.01693.x",
          },
        ],
        scope:
          "Scope: experiments on retention of prose passages. Not presented as proof that a particular enterprise intervention changes workplace performance.",
      },
    ],
  },

  /** The share row and byline closing the article column. */
  footer: {
    shareLabel: "Share this insight",
    byline: "Lurny Insights · AI-native learning",
  },

  /**
   * "Previous in this series" — this article points back at the first one,
   * which is why it is a single card rather than the three-up grid the first
   * article closes with.
   */
  previous: {
    heading: "Previous in this series",
    link: { label: "Explore all insights", href: "/resources/insights" },
    article: {
      category: "Capability & readiness",
      title: "What does ‘ready’ actually mean at work?",
      description:
        "Why learning completion, assessment scores and experience still cannot tell us whether someone can perform when it matters.",
      action: "Read the insight",
      href: "/resources/insights/ready-at-work",
    },
  },

  subscribe: {
    heading: "Ideas for building an AI-ready enterprise",
    description:
      "Occasional insights on capability, learning and workplace performance. No noise.",
    label: "Work email",
    placeholder: "Work email",
    submit: "Subscribe to insights",
    /** Shown after submitting — the export is explicit that nothing is sent. */
    notice:
      "Subscription is not connected in this prototype — no email was sent.",
  },
} as const;
