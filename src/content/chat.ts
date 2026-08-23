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
} as const;
