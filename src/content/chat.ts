/**
 * LURNYCHAT PAGE CONTENT
 * ---------------------------------------------------------------------------
 * Copy for the LurnyChat product page at /platform/chat.
 *
 * Section 1 (the hero) is defined below; further sections are added here as
 * their designs land.
 *
 * A note on the hero's `dashboard` block: like the LurnyPulse page, the product
 * shot is DRAWN — the LurnyDesk chat panel, the sources rail and the three
 * cards below it are markup and CSS, not an exported screenshot. So the strings
 * below are the data the illustration renders from, not captions describing a
 * picture. The card thumbnails use placeholder imagery (see ChatDashboard).
 *
 * The figures and names are illustrative product copy, not a real customer's.
 */

export const chat = {
  /** Page-level metadata, consumed by the route's `metadata` export. */
  meta: {
    title: "LurnyChat — Knowledge & Performance Support",
    description:
      "Give every employee conversational access to the knowledge, coaching and practice they need — through text, voice and images, right in the flow of work.",
    path: "/platform/chat",
  },

  hero: {
    /**
     * One eyebrow, split at the separator the design sets in violet, so the
     * bullet can be styled and hidden from screen readers — which would
     * otherwise announce it as "bullet".
     */
    eyebrow: { product: "LurnyChat", label: "Knowledge & performance support" },

    /** Split so the lines break where the design breaks them on lg+. */
    headline: [
      "Trusted answers.",
      "Real-time guidance.",
      "Better performance.",
    ] as const,

    description:
      "Give every employee conversational access to the knowledge, coaching and practice they need — through text, voice and images, right in the flow of work.",

    actions: {
      primary: { label: "Experience LurnyChat", href: "/demo" },
      secondary: { label: "Explore the suite", href: "/platform" },
    },

    /** The three feature notes under the buttons, each with an icon. */
    features: [
      { icon: "shield", label: "Trusted knowledge" },
      { icon: "globe", label: "Multilingual support" },
      { icon: "sparkle", label: "Guided practice" },
    ],

    /**
     * THE DASHBOARD ILLUSTRATION
     *
     * Everything below drives the drawn product mock. It is decorative — the
     * whole illustration is aria-hidden, because a screen reader reading out a
     * fictional assistant conversation would be reading fiction as fact. The
     * copy above already states what the product does.
     */
    dashboard: {
      /** Top bar of the LurnyDesk window. */
      appName: "LurnyDesk",
      prompt: "tell me about the code of conduct",

      /** The signed-in user shown in the left rail. */
      user: {
        name: "Krishnesh Nair",
        email: "krish@lurny.ai",
        xp: "1587 XPs",
      },

      /** Left navigation rail. `active` styles the current item. */
      nav: {
        group: "LurnyChats",
        items: [
          { label: "Lurny Desk", active: true },
          { label: "Lurny Talk", active: false },
          { label: "Conversation History", active: false },
          { label: "Manage Knowledgebase", active: false },
          { label: "Chat Configurations", active: false },
        ],
        sections: ["Sahiyog", "LurnyMinds"],
      },

      /** The assistant's answer, rendered as a chat turn. */
      answer: {
        greeting:
          "Hey there, Krishnesh! I'm your live company assistant. I can help you with company-related queries today.",
        intro:
          "The Emircom Code of Conduct (Version 4.0) is a fundamental guide for all employees, including management, that outlines the ethical standards and principles for behavior and business practices. It focuses on integrity, honesty, and respect to foster a positive work environment.",
        listTitle: "Key areas covered in the Code of Conduct include:",
        points: [
          {
            term: "Workplace Conduct",
            body: "Maintaining professionalism, respect, and accountability while avoiding discrimination, harassment, and bullying.",
          },
          {
            term: "Confidentiality",
            body: "Protecting sensitive company and customer information.",
          },
          {
            term: "Conflict of Interest",
            body: "Avoiding situations that could compromise objectivity or create conflicts between personal and company interests.",
          },
          {
            term: "Anti-Corruption",
            body: "Prohibiting bribery and corrupt practices and adhering to anti-corruption laws.",
          },
          {
            term: "Compliance with Laws and Regulations",
            body: "Adhering to all applicable laws.",
          },
        ],
      },

      /** The ask-a-question composer at the bottom of the chat column. */
      composer: {
        placeholder: "Ask your question and click on ENTER",
        scope: "Company",
        scopeSub: "Knowledgebase",
      },

      /** The right-hand "Sources" rail. */
      sources: {
        title: "Sources",
        items: [
          "Welcome to the Code of Conduct",
          "Our Commitment to Integrity",
          "Core Values and Principles",
          "Workplace Conduct Standards",
          "Conflicts of Interest Policy",
        ],
        viewAll: "View all sources",
      },

      /**
       * The three cards below the chat window. Each `image` is a placeholder
       * thumbnail; the copy is the card's real text.
       */
      cards: {
        /** Left card: visual, interactive learning sessions. */
        sahiyog: {
          title: "Sahiyog Sessions",
          subtitle: "Learn through visual stories and interactive quizzes",
          filter: "All Languages",
          items: [
            {
              title: "Fire Safety and Security Policy at Akshaya Patra",
              badge: "Acdle",
              questions: "15 Questions",
              image: "/assets/images/chat/dummy-2.jpg",
            },
            {
              title: "Understanding Foreign Exchange",
              badge: "Acxle",
              questions: "13 Questions",
              image: "/assets/images/chat/dummy-3.jpg",
            },
          ],
        },

        /** Middle card: Socratic-dialogue knowledge exploration. */
        minds: {
          title: "Lurny Minds",
          subtitle: "Discover knowledge through Socratic dialogue",
          filter: "All Difficulties",
          badge: "BEGINNER",
          duration: "15 min",
          learners: "2 learners",
          topic: "MFL's Co-Lending Policy",
          body: "This document outlines Muthoot Fincorp Limited's (MFL) Co-Lending Policy, detailing…",
          topicsPill: "Topics",
          cta: "Start Learning",
          image: "/assets/images/chat/dummy-1.jpg",
        },

        /** Right card: a completed practice simulation and its score. */
        simulation: {
          title: "Navigating Objections in Client Relationships",
          back: "Back to Simulations",
          persona: { name: "Khaled Al-Mansoor", role: "Angry Customer" },
          stats: [
            { label: "Messages", value: "211" },
            { label: "Duration", value: "2m 29s" },
          ],
          score: { value: "39", label: "POOR", caption: "OVERALL PERFORMANCE" },
          xp: "XP +5",
          actions: ["Suggested Responses", "Run Again"],
        },
      },
    },
  },

  /**
   * SECTION 2 — the problem LurnyChat solves.
   *
   * Consumed by <ProblemSection> (shared layout: statement on the left, four
   * numbered problems on the right, warm off-white ground). Shape must match
   * the `ProblemContent` interface in shared/ProblemSection.tsx.
   */
  problem: {
    eyebrow: "The problem LurnyChat solves",

    /** Split where the design breaks the lines on lg+. */
    headline: [
      "When answers are hard",
      "to find, people make",
      "their best guess.",
    ],

    description:
      "Policies, product knowledge and expert guidance are scattered across systems and people. At the moment of need, employees need a clear answer — not another place to search.",

    items: [
      {
        title: "Knowledge lives in too many places",
        description:
          "Policies, SOPs, product documents and expertise are spread across folders, portals and inboxes.",
      },
      {
        title: "The answer arrives too late",
        description:
          "When a customer or frontline moment is live, employees cannot wait for a ticket, a call-back or a course.",
      },
      {
        title: "People cannot tell what to trust",
        description:
          "Search results may be outdated, incomplete or disconnected from approved company knowledge.",
      },
      {
        title: "Practice happens after the moment has passed",
        description:
          "Without guided coaching and safe rehearsal, the same questions and mistakes return to the workplace.",
      },
    ],
  },

  /**
   * SECTION 3 — one conversational layer.
   *
   * The statement on the left; a DRAWN simulation-results dashboard on the
   * right, over a near-black ground. Like the hero dashboard, everything in
   * `dashboard` is the data the illustration renders from, not captions — the
   * whole thing is aria-hidden and uncopyable. Card thumbnails use placeholders.
   */
  connected: {
    eyebrow: "One conversational layer",

    /**
     * Split into words so the design's violet-highlighted words can be styled
     * without breaking the phrase. `accent: true` marks the violet words.
     */
    headline: [
      { text: "Support", accent: false },
      { text: "every", accent: true },
      { text: "moment", accent: false },
      { text: "of need.", accent: true },
    ],

    description:
      "LurnyChat brings trusted knowledge, voice-led support, guided thinking and safe practice into one connected experience.",

    dashboard: {
      back: "Back to Simulations",
      title: "Navigating Objections in Client Relationships",

      /** The meta bar under the title. */
      meta: [
        { label: "Persona", value: "Khaled Al-Mansoor", sub: "Angry Customer" },
        { label: "Difficulty", value: "Easy", pill: true },
        { label: "Date", value: "6/18/2026" },
        { label: "Duration", value: "2 minutes 29 seconds" },
      ],
      messages: "211",
      actions: ["Suggested Responses", "Run Simulation Again"],

      /** The big radial score. */
      score: {
        value: "39",
        label: "POOR",
        caption: "OVERALL PERFORMANCE",
        xp: "XP +5",
      },

      /**
       * The six metric cards. `tone` drives the ring colour and the rating
       * label's dot: poor (red) · fair (amber) · excellent (cyan/green).
       */
      metrics: [
        { name: "Empathy", value: 40, rating: "POOR", tone: "poor" },
        { name: "Active Listening", value: 20, rating: "POOR", tone: "poor" },
        { name: "Resolution Clarity", value: 10, rating: "POOR", tone: "poor" },
        { name: "Tone", value: 60, rating: "FAIR", tone: "fair" },
        { name: "Success Criteria", value: 5, rating: "POOR", tone: "poor" },
        {
          name: "Fact Integrity",
          value: 100,
          rating: "EXCELLENT",
          tone: "excellent",
        },
      ],

      /** The conversation-playback panel. */
      playback: {
        title: "Conversation Playback",
        userMessage: "Hello sir how are you?",
        reply: {
          name: "Khaled Al-Mansoor",
          text: "Not good. I've been waiting for a solution and nothing has changed.",
          time: "00:08",
        },
      },

      /** The detailed-feedback panel. */
      feedback: {
        title: "Detailed Feedback",
        strengths: {
          title: "Key Strengths",
          items: [
            "Maintained a respectful tone",
            "Shared accurate information",
          ],
        },
        improve: {
          title: "Areas to Improve",
          items: ["Show more empathy early in the conversation"],
        },
      },

      /** The three feature cards below the dashboard. */
      cards: {
        talk: {
          title: "LurnyTalk",
          subtitle: "Voice-first help, in the language people use",
          languages: ["English", "हिंदी", "العربية"],
        },
        sahiyog: {
          title: "Sahiyog",
          subtitle: "Visual & voice-led frontline support",
          badge: "ENGLISH",
          image: "/assets/images/chat/dummy-2.jpg",
        },
        minds: {
          title: "LurnyMinds",
          subtitle: "Guided dialogue for deeper understanding",
          badge: "BEGINNER",
          image: "/assets/images/chat/dummy-1.jpg",
        },
      },
    },
  },

  /**
   * SECTION 4 — trusted answers, not generic AI.
   *
   * A light section: statement on the left, a DRAWN light-themed LurnyDesk chat
   * card on the right (a grounded answer with cited sources), plus a floating
   * "approved knowledge only" badge. Everything in `desk` is the data the
   * illustration renders from — it is aria-hidden and uncopyable.
   */
  trusted: {
    eyebrow: "Trusted knowledge, in the flow of work",

    /** Rendered in the serif display face; split where the design breaks. */
    headline: ["Trusted answers,", "not generic AI."],

    description:
      "Give people guidance they can act on — grounded in your approved policies, SOPs and product knowledge.",

    /** The three feature notes with circular icons, keyed by `icon`. */
    features: [
      { icon: "cited", label: "Cited, source-grounded guidance" },
      { icon: "boundary", label: "Role-specific knowledge boundaries" },
      { icon: "coach", label: "Clear follow-up coaching" },
    ],

    action: { label: "Explore LurnyDesk", href: "/demo" },

    /** The drawn light chat card. */
    desk: {
      appName: "LurnyDesk",
      avatar: "SV",
      question: "What documents are required for a gold-loan renewal?",

      answer: {
        intro:
          "For a gold-loan renewal, please ensure the following documents are submitted and are valid as per policy.",
        cite: "[1]",
        points: [
          {
            term: "Application Form",
            body: "Duly filled and signed Gold Loan Renewal Form.",
          },
          {
            term: "Identity Proof",
            body: "Government-issued photo ID (e.g., Aadhaar, PAN, Passport).",
          },
          {
            term: "Address Proof",
            body: "Recent utility bill, bank statement or government letter.",
          },
          {
            term: "Loan Account Details",
            body: "Loan account number for reference.",
          },
          {
            term: "Gold Ornaments Details",
            body: "Current weight and description of pledged gold.",
          },
        ],
      },

      sources: {
        title: "Sources used",
        items: [
          {
            type: "PDF",
            name: "Gold Loan Policy v3.2",
            meta: "Policy · Approved",
            ref: "Page 14, Section 4.2",
            score: "98%",
          },
          {
            type: "DOC",
            name: "Gold Loan SOP",
            meta: "SOP · Approved",
            ref: "Page 7, Section 2.1",
            score: "95%",
          },
          {
            type: "XLS",
            name: "Document Checklist – Retail Loans",
            meta: "Job Aid · Approved",
            ref: "Page 1, Section 1",
            score: "92%",
          },
        ],
      },

      composer: "Ask a follow-up question…",

      /** The floating badge card overhanging the right edge. */
      badge: {
        title: "Approved knowledge only",
        body: "Answers come only from your approved knowledge.",
      },
    },
  },

  /**
   * SECTION 5 — learning at the speed of need.
   *
   * A dark section: statement on the left, a DRAWN phone mockup on the right
   * (an in-the-moment voice chat), with two supporting cards below it. The
   * `phone` and `cards` data drive the illustration — it is aria-hidden and
   * uncopyable.
   */
  moment: {
    eyebrow: "The last mile of learning",

    headline: ["Learning at the", "speed of need."],

    description:
      "When a question arrives in the middle of work, LurnyChat brings trusted guidance, coaching and practice to the moment it matters.",

    /** Three feature bars with circular icons, keyed by `icon`. */
    features: [
      { icon: "globe", label: "Ask in your language" },
      { icon: "flow", label: "Learn in the flow of work" },
      { icon: "shield", label: "Practise with confidence" },
    ],

    action: { label: "See LurnyChat in action", href: "/demo" },

    /** The drawn phone screen. */
    phone: {
      statusTime: "9:41",
      pill: "In the moment support",

      /** The user's voice message. */
      you: {
        label: "You",
        text: "How do I handle a customer who wants to close their loan early?",
        time: "9:41 AM",
      },

      /** LurnyChat's reply. */
      reply: {
        name: "LurnyChat",
        intro: "Here's how to handle early loan closure requests:",
        steps: [
          "Thank the customer and appreciate their financial discipline.",
          "Explain applicable closure charges and the redemption process.",
          "Confirm the payout amount and expected closure timeline.",
          "Share next steps and required documents.",
        ],
      },

      speakLabel: "Tap to speak",
    },

    /** The two cards below the phone. */
    cards: {
      refresher: {
        title: ["Turn a question into", "a 2-minute refresher"],
        clip: { name: "Early Loan Closure Process", duration: "02:00" },
        percent: 100,
      },
      practise: {
        title: ["Practise before", "the conversation"],
        sim: {
          name: "Early Closure – Customer Call",
          meta: "Role-play · LurnySim",
        },
        score: "86",
        praise: {
          title: "Great job!",
          body: "You handled objections confidently.",
        },
      },
    },
  },

  /**
   * SECTION 6 — book a demo.
   *
   * A light CTA section: the pitch on the left, the shared LeadForm on a white
   * card to the right. `form` matches the LeadFormContent contract in
   * components/ui/LeadForm.tsx.
   */
  demo: {
    eyebrow: "Book a LurnyChat demo",

    headline: ["Bring expert help", "to every moment", "of work."],

    description:
      "See how LurnyChat gives your people trusted answers, voice-led support and safe practice — right when they need it.",

    /** The two lines under the rule, each with an icon. */
    points: [
      { icon: "clock", text: "30 minutes · tailored to your frontline" },
      {
        icon: "bubble",
        text: "See LurnyDesk, Talk, Sahiyog, Minds and Sim in one session",
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
        name: "interest",
        label: "What would you like to explore?",
        options: [
          "Trusted answers, frontline support & practice",
          "In-the-moment knowledge & guidance",
          "Voice-led and multilingual support",
          "Guided practice and coaching",
          "Something else",
        ],
      },

      detail: {
        name: "priority",
        label: "Tell us about your performance priority (optional)",
        placeholder: "e.g. Give branch teams faster, trusted product guidance",
        autoComplete: "off",
      },

      consent: {
        name: "sendGuide",
        label:
          "Send me a short guide to performance support in the flow of work.",
      },

      submit: "Book a LurnyChat Demo",

      success: {
        title: "Request received.",
        description:
          "We will be in touch within one business day to arrange a time.",
      },

      errors: {
        name: "Please enter your name.",
        email: "Please enter your work email.",
        emailFormat: "Please enter a valid email address.",
      },

      footnote: {
        text: "Prefer to talk first? {0}",
        links: [{ label: "Contact Sales", href: "/contact" }],
      },
    },
  },
} as const;
