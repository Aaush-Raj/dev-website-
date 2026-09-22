/**
 * LURNYSIM PAGE CONTENT
 * ---------------------------------------------------------------------------
 * Copy for /platform/sim — AI role-play with real-time scoring.
 *
 * Section 1's copy is verbatim from the supplied
 * "05-text/lurnysim-hero-left-text.txt". Later sections are added here as
 * their designs are built.
 *
 * THE SIMULATION AND SCORECARD ARE ILLUSTRATIVE. The transcript, the persona
 * and the six scores are an example of a session, not a recording of one —
 * the design labels the scorecard "Illustrative session" and that label is
 * kept. Nothing here should read as a customer's real numbers.
 */

export const sim = {
  /** Page-level metadata, consumed by the route's `metadata` export. */
  meta: {
    title: "LurnySim — AI Role-Play With Real-Time Scoring",
    description:
      "Practise realistic conversations with AI customers. Speak or type, see your scores update in real time, and build confidence for the conversations that matter.",
    path: "/platform/sim",
  },

  /**
   * SECTION 1 — the hero.
   *
   * Statement on the left; on the right a live-simulation window with a
   * scorecard overlapping its lower corner, over a photograph of an agent
   * mid-conversation.
   */
  hero: {
    eyebrow: "LurnySim",
    eyebrowSub: "AI role-play with real-time scoring",

    /* Three lines, the last accented — each owns its own row in the design. */
    headline: [
      { text: "Build confidence" },
      { text: "before the" },
      { text: "real moment.", accent: true },
    ],

    description:
      "Practise realistic conversations with AI customers. Speak or type, see your scores update in real time, and build confidence for the conversations that matter.",

    actions: {
      primary: { label: "Book a Demo", href: "/contact" },
      secondary: { label: "Explore Scenarios", href: "#scenarios" },
    },

    /** The three marks beneath the buttons. */
    features: [
      { icon: "people", label: "AI role-play" },
      { icon: "mic", label: "Voice or text" },
      { icon: "bars", label: "Live scoring" },
    ],

    /** The handwritten note beside the agent. */
    note: ["Real conversations.", "Real growth."],

    /** The simulation window. */
    window: {
      title: "Live simulation",
      status: "In progress",

      persona: {
        src: "/assets/images/platform/sim/persona.webp",
        /*
          The avatar is decorative: the name, role and difficulty beside it
          say everything the picture does, so describing it again would only
          repeat them to a screen reader.
        */
        alt: "",
        name: "Rajiv Mehta",
        role: "Concerned customer",
        difficulty: "Medium",
      },

      objective: "Responding to customer concerns",

      /** The transcript. `speaker` picks the side and the bubble's tone. */
      turns: [
        {
          speaker: "ai",
          label: "AI customer",
          text: "I'm worried about my investment. Can you help me understand what's changed?",
        },
        {
          speaker: "you",
          label: "You",
          text: "I understand your concern. What worries you most about the recent changes?",
        },
      ],

      /** The input mode toggle. The design shows Voice selected. */
      modes: [
        { icon: "mic", label: "Voice", active: true },
        { icon: "keyboard", label: "Text" },
      ],

      /** The recording row beneath it. */
      capture: { state: "Listening..." },
    },

    /** The scorecard overlapping the window's lower right. */
    scorecard: {
      title: "Live performance",
      subtitle: "Scores update as you practise",

      /*
        Six measures on a 100-point scale. The values are an example, which is
        what the footnote below them says.
      */
      scores: [
        { label: "Empathy", value: 78 },
        { label: "Active Listening", value: 72 },
        { label: "Resolution Clarity", value: 65 },
        { label: "Tone", value: 82 },
        { label: "Success Criteria", value: 60 },
        { label: "Fact Integrity", value: 85 },
      ],

      /** Kept from the design: these numbers are not a real session's. */
      footnote: "Illustrative session",
    },

    /** The photograph behind the panels. */
    photo: {
      src: "/assets/images/platform/sim/agent.webp",
      alt: "An agent wearing a headset speaking with a customer at their desk.",
    },
  },

  /**
   * SECTION 2 — the problem LurnySim solves.
   *
   * A statement on the left with three marks beneath it; on the right four
   * numbered problems, each closing with the thing LurnySim does about it.
   *
   * Copy is verbatim from the supplied
   * "lurnysim-problem-solution-text.txt".
   */
  problem: {
    eyebrow: "The problem LurnySim solves",

    /*
      Four lines. The design sets the first two in near-black and the last
      two in violet, so the accent lands on "being ready to say it" — the
      half of the sentence the section is arguing for.
    */
    headline: [
      { text: "Knowing what to say" },
      { text: "isn’t the same as" },
      { text: "being ready", accent: true },
      { text: "to say it.", accent: true },
    ],

    description:
      "Courses explain the product and the process. Real conversations add objections, emotion and pressure—with little time to think.",

    /** The second statement, under its own eyebrow. */
    solution: {
      eyebrow: "Turn knowledge into practice",
      description:
        "LurnySim gives your people a safe space to practise with AI customers, see their scores update in real time and try again.",
    },

    /** The three marks along the foot of the left column. */
    features: [
      { icon: "bubbles", label: "AI customers" },
      { icon: "bars", label: "Live scoring" },
      { icon: "repeat", label: "Repeat practice" },
    ],

    /**
     * The four problems.
     *
     * `solution` is the line the design sets in violet behind an arrow — the
     * answer to the problem stated above it, which is why each row reads as a
     * pair rather than as a list of complaints.
     */
    rows: [
      {
        number: "01",
        title: "Real customers become the first rehearsal",
        body: "People face difficult conversations before they have practised them.",
        solution: "Rehearse with AI customers before going live.",
      },
      {
        number: "02",
        title: "Role-play depends on someone else’s time",
        body: "Managers and peers cannot join every practice session.",
        solution: "Practise independently through voice or text.",
      },
      {
        number: "03",
        title: "Feedback comes after the moment has passed",
        body: "A final score can hide where a conversation went off track.",
        solution: "See six performance scores update as you practise.",
      },
      {
        number: "04",
        title: "Course completion leaves readiness unclear",
        body: "Finishing a course says little about handling objections or concerns.",
        solution: "Review simulation scores and previous attempts.",
      },
    ],
  },

  /**
   * SECTION 3 — customer service and de-escalation.
   *
   * The hero's arrangement mirrored: the photograph and panels take the left,
   * the copy the right. Copy is verbatim from the supplied
   * "05-text/customer-service-right-text.txt".
   */
  service: {
    eyebrow: "Customer service & de-escalation",

    /* Three lines, each its own sentence and its own row in the design. */
    headline: ["Stay calm.", "Build trust.", "Resolve the issue."],

    description:
      "Help frontline teams practise difficult customer conversations before they face them on the job.",

    /** The three marks down the right column. */
    benefits: [
      {
        icon: "ear",
        title: "Show empathy under pressure",
        body: "Practise listening and acknowledging frustration.",
      },
      {
        icon: "signpost",
        title: "Explain the next step clearly",
        body: "Set expectations without making promises you cannot keep.",
      },
      {
        icon: "repeat",
        title: "Improve with every attempt",
        body: "Use live feedback to refine your response and try again.",
      },
    ],

    action: { label: "Book a demo", href: "/contact" },

    /** The practice panel over the photograph. */
    panel: {
      title: "Customer service practice",
      mode: "Voice",

      /** The transcript. `speaker` picks the side and the bubble's tone. */
      turns: [
        {
          speaker: "ai",
          label: "AI customer",
          text: "I've called twice. My appliance still isn't fixed.",
          avatar: {
            src: "/assets/images/platform/sim/caller.webp",
            /*
              Decorative: the label "AI customer" beside it already says who
              is speaking, so describing the picture would only repeat it.
            */
            alt: "",
          },
        },
        {
          speaker: "you",
          label: "Your response",
          text: "I understand why you're frustrated. Let me check the repair status and explain the next step.",
        },
      ],
    },

    /** The feedback card overlapping the panel's lower right. */
    feedback: {
      title: "Live feedback",

      /*
        Three measures on a ten-point scale. The design draws each as a bar
        that is part filled — the filled part is the score, the pale
        remainder the headroom.
      */
      scores: [
        { label: "Empathy", value: 8 },
        { label: "Tone", value: 8 },
        { label: "Resolution Clarity", value: 7 },
      ],

      /** Kept from the design: these numbers are not a real session's. */
      footnote: "Illustrative practice scores",
    },

    /** The photograph behind the panels. */
    photo: {
      src: "/assets/images/platform/sim/agent-desk.webp",
      alt: "A support agent wearing a headset working at a laptop in an office.",
    },
  },

  /**
   * SECTION 4 — manager feedback and coaching.
   *
   * A statement with three marks on the left; two numbered photo cards on the
   * right showing the same manager rehearsing, then holding the real
   * conversation.
   *
   * Copy is verbatim from the supplied
   * "04-text/lurnysim-manager-coaching-left-text.txt"; the two card titles
   * and captions are read from the design, which the text file omits.
   */
  coaching: {
    eyebrow: "Manager feedback & coaching",
    headline: "Change how the conversation unfolds.",
    description:
      "Help managers rehearse difficult feedback and coaching conversations with AI—before the real moment.",

    /** The three marks down the left column. */
    benefits: [
      {
        icon: "heart",
        title: "Lead with empathy",
        body: "Address the issue while respecting the person.",
      },
      {
        icon: "bubble",
        title: "Listen through resistance",
        body: "Respond constructively to difficult reactions.",
      },
      {
        icon: "bars",
        title: "Agree on a way forward",
        body: "Turn feedback into clear next steps.",
      },
    ],

    /**
     * The two cards. The first carries the coaching panel over its
     * photograph; the second is the photograph alone, which is the point of
     * the pair — rehearsal, then the real thing.
     */
    cards: [
      {
        number: "01",
        /*
          The title breaks around the product name so it can carry the accent
          colour the design gives it.
        */
        title: "Practise with ",
        titleAccent: "LurnySim",
        caption: "Rehearse your approach.",
        photo: {
          src: "/assets/images/platform/sim/coach-practice.webp",
          alt: "A manager wearing a headset practising a conversation at a laptop.",
        },
        /** The panel over the photograph. */
        panel: {
          brand: "LurnySim",
          title: "Coaching practice",
          feedbackLabel: "Live feedback",
          chips: ["Empathy", "Active Listening", "Tone"],
        },
      },
      {
        number: "02",
        title: "Lead the real conversation",
        caption: "Bring clarity and empathy to work.",
        photo: {
          src: "/assets/images/platform/sim/coach-real.webp",
          alt: "Two colleagues talking across a desk in an office.",
        },
      },
    ],
  },

  /**
   * SECTION 5 — the demo request.
   *
   * The pitch on the left, the booking form on a card to the right. Copy is
   * verbatim from the supplied "01-text/lurnysim-demo-form-text.txt"; the
   * select vocabularies are this page's own, since the text file gives only
   * each select's resting label.
   */
  demo: {
    eyebrow: "See LurnySim in action",

    /** Split so the lines break where the design breaks them. */
    headline: ["Turn practice", "into confident", "conversations."],

    description:
      "Tell us which conversations your people need to handle better. We’ll show you how LurnySim brings realistic AI role-play, live feedback and repeat practice into their learning journey.",

    /** The two lines under the rule, each with an icon. */
    points: [
      {
        icon: "clock",
        text: "30 minutes · tailored to your organisation",
      },
      {
        icon: "scenarios",
        text: "Explore practice scenarios for your teams and roles",
      },
    ],

    /**
     * Consumed by the shared LeadForm — same validation, focus management and
     * success state as every other page's booking form.
     *
     * This design asks for SEVEN fields: the two texts, an organisation, two
     * selects, a third select and the free-text detail. All of those are
     * options the form already carries, so nothing here needed a new prop.
     */
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
        name: "practiceAreas",
        label: "Practice areas",
        options: [
          "Select practice areas",
          "Customer service and de-escalation",
          "Sales and objection handling",
          "Manager feedback and coaching",
          "Onboarding and product knowledge",
          "Compliance conversations",
          "Something else",
        ],
        /* Marked required in the design, so it is validated too — see the
           note on `required` in LeadFormContent. */
        required: true,
        error: "Please select a practice area.",
      },
      selectC: {
        name: "primaryAudience",
        label: "Primary audience",
        options: [
          "Select team or role",
          "Frontline and contact centre",
          "Sales teams",
          "People managers",
          "New joiners",
          "Field and retail teams",
          "Mixed audience",
        ],
      },

      detail: {
        name: "currentChallenge",
        label: "Current challenge (optional)",
        placeholder:
          "e.g. difficult customer calls, manager feedback or product objections",
      },

      consent: {
        name: "overview",
        label: "Send me the LurnySim overview.",
      },

      submit: "Book a LurnySim Demo",

      success: {
        title: "Thanks — your demo request is in.",
        description:
          "A LurnySim specialist will be in touch to arrange a time that suits your team.",
      },

      errors: {
        name: "Please enter your full name.",
        email: "Please enter your work email.",
        emailFormat: "Please enter a valid email address.",
        organisation: "Please enter your organisation.",
      },

      /** The line under the button; {0} is spliced with the link. */
      footnote: {
        text: "Want to explore the wider Lurny platform? {0}",
        links: [{ label: "Talk to a Lurny Specialist.", href: "/contact" }],
      },
    },
  },
} as const;
