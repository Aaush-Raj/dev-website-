/**
 * BFSI CASE STUDY CONTENT
 * ---------------------------------------------------------------------------
 * Copy for the case study at /resources/case-studies.
 *
 * Long-form editorial rather than a marketing section: a dark hero, an
 * article with a sticky table of contents, and a closing call to action.
 *
 * THE PROSE LIVES HERE AS STRUCTURED DATA, not as a blob of HTML. Each block
 * declares its `kind`, so the article component renders it with the site's
 * own type scale and tokens rather than the inline styles the supplied design
 * file carries. That is what lets the page inherit our fonts and palette
 * instead of importing a second set.
 *
 * The disclaimers throughout are deliberate and must not be trimmed: this
 * story reports IMPLEMENTATION SCOPE, not measured business improvement, and
 * several passages exist specifically to keep that distinction clear.
 */

export const caseStudy = {
  /** Page-level metadata, consumed by the route's `metadata` export. */
  meta: {
    title: "What customer conversations reveal that dashboards cannot",
    description:
      "How a multi-branch financial-services organisation began using frontline conversations to explore missed opportunities and inform more focused coaching.",
    path: "/resources/case-studies",
  },

  /** The breadcrumb above the hero. */
  breadcrumb: {
    parent: { label: "Customer Stories", href: "/customers" },
    current: "BFSI",
  },

  hero: {
    eyebrow: "BFSI / Financial Services · Customer story",
    headline: "What customer conversations reveal that dashboards cannot",
    description:
      "How a multi-branch financial-services organisation began using frontline conversations to explore missed opportunities and inform more focused coaching.",

    /** The two scope figures. */
    stats: [
      { value: "25", label: "branches" },
      { value: "9,328", label: "conversations" },
    ],

    /**
     * The qualifier under the figures. Load-bearing: it is what stops the
     * two numbers reading as a performance claim.
     */
    disclaimer:
      "Implementation scope reported by Lurny. These figures describe the work covered, not a measured improvement in sales or employee performance.",

    image: {
      src: "/assets/images/industries/bfsi-conversation.webp",
      /**
       * Described rather than decorative: this is editorial imagery in an
       * article, not chrome inside a drawn product panel, so a screen-reader
       * user should get the same scene-setting a sighted reader does.
       */
      alt: "A branch employee in conversation with a customer across a desk.",
      caption:
        "Illustrative scene. Not a photograph of the organisation or its customers.",
    },
  },

  /** The sticky table of contents. `id` matches each section's anchor. */
  tocTitle: "In this story",

  /**
   * THE ARTICLE.
   *
   * `kind` selects how CaseStudyArticle renders a block:
   *   "heading"  -> a section heading; `id` is its anchor
   *   "text"     -> a paragraph; `emphasis` marks a run set in bold
   *   "figure"   -> an image with a caption
   *   "flow"     -> the tinted "review approach" strip
   *   "numbered" -> one of the three numbered questions
   *   "example"  -> the illustrative-example panel
   *   "quote"    -> the closing pull-quote
   */
  article: [
    {
      kind: "heading",
      id: "numbers-story",
      text: "The numbers were only part of the story",
    },
    {
      kind: "text",
      text: "A transaction tells you that something happened. It rarely tells you everything that happened around it.",
    },
    {
      kind: "text",
      text: "Was the customer's need fully understood? Did the employee explain the relevant options clearly? Was there a question that deserved a follow-up? And if the interaction ended without a next step, what might have helped?",
    },
    {
      kind: "text",
      text: "For a multi-branch financial-services organisation working with Lurny, these were the questions behind an exploration of frontline conversation intelligence.",
    },
    {
      kind: "text",
      text: "The organisation already had business reporting and customer-management systems. The opportunity was not to replace them. It was to add context: a closer understanding of the customer interactions behind branch activity and business results.",
    },
    {
      kind: "text",
      text: "That distinction matters. Knowing which branch needs attention is useful. Understanding what kind of support its people might need is a different challenge.",
    },

    {
      kind: "heading",
      id: "start-interaction",
      text: "Start with the interaction, not another training programme",
    },
    {
      kind: "text",
      text: "The work began with branch discovery and an examination of everyday customer conversations. The central question was practical: could these interactions provide a more useful basis for identifying potential missed opportunities and focusing employee support?",
    },
    {
      kind: "text",
      text: "Rather than assume that every performance gap called for the same course, the approach looked closer to the work itself.",
    },
    {
      kind: "text",
      text: "A conversation can raise several different questions. Perhaps the employee needs stronger product knowledge. Perhaps the knowledge is there, but a customer's need was not explored. Perhaps an explanation was clear, but the next step was left uncertain. These are different possibilities—not interchangeable training requirements.",
    },
    {
      kind: "text",
      text: "The purpose of reviewing conversations is to investigate those possibilities, rather than jump from a business result straight to a conclusion about an employee's capability.",
    },

    {
      kind: "heading",
      id: "bringing-conversations",
      text: "Bringing frontline conversations into view",
    },
    {
      kind: "text",
      text: "LurnyPitch was used in the pilot to capture and analyse customer conversations. The implementation scope reported for this story covers ",
      emphasis: "25 branches and 9,328 conversations",
      tail: ".",
    },
    {
      kind: "text",
      text: "The approach brought recorded interactions into a review process through transcription and analysis, with attention to the quality of the conversation and potential opportunities that merited closer examination.",
    },
    {
      kind: "text",
      text: "This created a way to ask more specific questions about the interaction—not simply whether an employee was active, but what happened when the employee and customer spoke.",
    },
    {
      kind: "text",
      text: "The counts show the scale of the work. They do not, on their own, establish an increase in conversion, revenue or productivity. Nor should a flagged conversation be treated as a final judgement about an employee or a confirmed lost sale.",
    },
    {
      kind: "text",
      text: "The useful next step is review: understand the context, examine the relevant interaction and decide whether action is warranted.",
    },

    {
      kind: "figure",
      src: "/assets/images/biz/customer-scene.webp",
      alt: "A branch employee reviewing customer information at her desk.",
      caption: "Looking more closely at everyday conversations.",
    },
    {
      kind: "flow",
      label: "Illustrative review approach",
      steps: ["Conversation", "Analysis", "Human review", "Possible support"],
    },

    {
      kind: "heading",
      id: "three-questions",
      text: "Three questions worth asking",
    },
    {
      kind: "numbered",
      number: "01",
      title: "Was the customer's need explored?",
      body: [
        "A customer may arrive with one immediate request while also describing a broader situation. A useful review asks whether the employee gave that situation enough attention and asked appropriate follow-up questions.",
        "The aim is not to turn every interaction into an additional sale. It is to understand whether the conversation addressed what the customer needed.",
      ],
    },
    {
      kind: "numbered",
      number: "02",
      title: "Were relevant options explained clearly?",
      body: [
        "Mentioning a product is not the same as helping someone understand it. A review can examine how an option was introduced, whether its relevance was explained and whether the customer's questions were addressed.",
        "Any potential opportunity still needs context and human judgement. An AI-generated flag is a prompt to investigate, not proof that an offer should have been made.",
      ],
    },
    {
      kind: "numbered",
      number: "03",
      title: "Was there a clear next step?",
      body: [
        "Some conversations need a further explanation, an agreed follow-up or a handover. Examining how an interaction closes can help identify where that next step was clear—and where it may need attention.",
        "These are review questions, not a published list of verified findings from the pilot. Their value is in making the analysis more specific and the follow-up more purposeful.",
      ],
    },

    {
      kind: "heading",
      id: "coaching-conversation",
      text: "From an observation to a useful coaching conversation",
    },
    {
      kind: "text",
      text: "The practical promise of conversation intelligence is not the production of more scores. It is the possibility of a better response.",
    },
    {
      kind: "text",
      text: 'Consider the difference between asking an employee to "improve customer engagement" and helping them practise one well-chosen follow-up question. The second gives the employee something concrete to work on.',
    },

    {
      kind: "example",
      title: "An illustrative example—not a reported pilot incident",
      intro:
        "Imagine a customer mentioning a recurring financial need while discussing an immediate request. The employee answers that request, but does not explore the broader need.",
      rows: [
        {
          label: "Possible signal",
          text: "The conversation may contain an unexplored customer need.",
        },
        {
          label: "Human review",
          text: "Check the complete exchange, the employee's role and the circumstances before deciding that an opportunity was missed.",
        },
        {
          label: "Possible support",
          text: "Help the employee practise an appropriate needs-discovery question and revisit the relevant product knowledge if needed.",
        },
        {
          label: "What to examine later",
          text: "Whether similar conversations show clearer exploration of customer needs—not just whether a lesson was completed.",
        },
      ],
      footnote:
        "This example illustrates a possible use of the approach. It is not a customer transcript, a verified finding or evidence that this coaching sequence was implemented in the pilot.",
    },

    {
      kind: "figure",
      src: "/assets/images/industries/bfsi.webp",
      alt: "A manager reviewing work alongside two colleagues at a desk.",
      caption:
        "Illustrative scene. It does not document a coaching session from the pilot.",
    },

    {
      kind: "heading",
      id: "evidence-questions",
      text: "Evidence should lead to questions before conclusions",
    },
    {
      kind: "text",
      text: "Conversation analysis needs to be interpreted with care. An incomplete recording, an unclear transcript or missing context can change what an interaction appears to show.",
    },
    {
      kind: "text",
      text: "One conversation should not become a complete assessment of a person. A potential missed opportunity is not automatically a lost sale. And an employee's need for support should not be inferred from a score alone.",
    },
    {
      kind: "text",
      text: "The approach is most useful when it supports a constructive review: what happened, what remains uncertain and what would help next?",
    },
    {
      kind: "text",
      text: "That also keeps the business and learning questions connected. Instead of treating learning completion as the final destination, a team can ask whether the support it provides is relevant to the work people are actually doing.",
    },

    {
      kind: "heading",
      id: "complete-view",
      text: "A more complete view of frontline performance",
    },
    {
      kind: "text",
      text: "This story is about adding conversation context to an existing view of branch activity. It is not a claim that conversation analysis alone improved business results.",
    },
    {
      kind: "text",
      text: "The implementation brought frontline interactions into the discussion. The next question is how well that evidence can inform decisions, support employees and help teams evaluate what changes in subsequent interactions.",
    },
    {
      kind: "text",
      text: "Business reporting remains important. So does learning data. Conversation evidence adds another perspective: a closer view of the moments in which employees apply their knowledge with customers.",
    },

    {
      kind: "quote",
      text: "The opportunity is not simply to know more about performance. It is to make the next coaching conversation more useful.",
    },
  ],

  /** The closing call to action. */
  cta: {
    headline: "What could this look like in your organisation?",
    description:
      "Every workplace has its own challenges. Let's explore where learning and capability could make a practical difference in yours.",
    primary: { label: "Let's talk about your challenge", href: "/contact" },
    back: { label: "Back to customer stories", href: "/customers" },
  },
} as const;
