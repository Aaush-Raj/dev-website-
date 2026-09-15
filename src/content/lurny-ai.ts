/**
 * LURNY.AI PAGE CONTENT
 * ---------------------------------------------------------------------------
 * Copy for /lurny-ai — the independent platform for experts and knowledge
 * creators, reached from the header's Coming Soon panel.
 *
 * Copy is verbatim from the supplied "07-left-text.txt" and the card text in
 * the section design. Section 1 is defined below; the remaining sections are
 * added here as their designs are built.
 */

export const lurnyAi = {
  /** Page-level metadata, consumed by the route's `metadata` export. */
  meta: {
    title: "Lurny.ai — Teach What You Know. Earn From Your Expertise.",
    description:
      "Create learning content and an AI persona from your knowledge. Bring learners together, offer paid experiences and grow your reputation as an expert.",
    path: "/lurny-ai",
  },

  /**
   * SECTION 1 — the hero.
   *
   * The statement on the left over the plate's own dark panel, with four glass
   * cards floating across the photograph on the right and a three-item rail
   * along the foot.
   */
  hero: {
    eyebrow: "For experts & knowledge creators",

    /**
     * Three lines, the last of them accented. An array so the component can
     * colour that one line without parsing a string or hard-coding it in
     * markup.
     */
    headline: [
      { text: "Teach what you know." },
      { text: "Build a name." },
      { text: "Earn from your expertise.", accent: true },
    ],

    description:
      "Create learning content and an AI persona from your knowledge. Bring learners together, offer paid experiences and grow your reputation as an expert.",

    actions: {
      primary: { label: "Become an Expert", href: "/demo" },
      /** TODO(routes): no explainer page yet; anchors to the section below. */
      secondary: { label: "See How It Works", href: "#how-it-works" },
    },

    /**
     * The photograph. It ships because it is a photograph — and because the
     * dark angled panel behind the copy is part of the plate rather than
     * something drawn over it.
     *
     * `alt` is empty: the image is atmosphere, and every word in the scene is
     * rendered as real text by the cards.
     */
    scene: {
      src: "/assets/images/lurny-ai/hero-scene.webp",
      alt: "",
    },

    /**
     * The four cards floating over the photograph.
     *
     * DRAWN FROM THIS CONTENT, not shipped as the four transparent PNGs the
     * design pack supplies. They are pure interface — labels, rows, a button,
     * a row of avatars — so as images they would add ~4.5MB, blur on
     * high-density screens, stay untranslatable and be invisible to screen
     * readers.
     *
     * `position` is measured from the design as a share of the scene box, so
     * the four hold their arrangement as it scales.
     */
    cards: {
      /** Top left: what you can create from. */
      create: {
        title: "Create from what you know",
        rows: [
          { icon: "document", label: "Documents" },
          { icon: "video", label: "Videos" },
          { icon: "pen", label: "Your ideas" },
        ],
        action: "Create learning content",
        /** Measured off the design: L43.8% R59% T7.6% B37.4% of the band. */
        position: "left-[43.8%] top-[7.6%] w-[15.4%]",
      },

      /** Top right: the expert's own space. */
      expert: {
        eyebrow: "Your expert space",
        chip: "Preview",
        name: "Ananya Rao",
        field: "Leadership & Communication",
        /** Measured off the design: L78% R96.5% T7.5% B20% of the band. */
        position: "left-[78%] top-[7.5%] w-[18.5%]",
      },

      /** Lower middle: the learners around the expert. */
      community: {
        title: "Your learning community",
        /**
         * Four avatars, cut from the supplied card art. These ship because
         * they are photographs of people — the only part of these four cards
         * that is not interface.
         */
        avatars: [
          { src: "/assets/images/lurny-ai/avatars/1.webp", alt: "" },
          { src: "/assets/images/lurny-ai/avatars/2.webp", alt: "" },
          { src: "/assets/images/lurny-ai/avatars/3.webp", alt: "" },
          { src: "/assets/images/lurny-ai/avatars/4.webp", alt: "" },
        ],
        rows: [
          { icon: "chat", label: "Ask your AI persona" },
          { icon: "people", label: "Join your live workshop" },
        ],
        /** Measured off the design: L43.8% R61% T54.1% B79.3% of the band. */
        position: "left-[43.8%] top-[54.1%] w-[17.2%]",
      },

      /** Lower right: the three revenue routes. */
      earn: {
        title: "Ways to earn",
        items: [
          { icon: "calendar", label: "Paid sessions" },
          { icon: "people", label: "Cohorts" },
          { icon: "crown", label: "Memberships" },
        ],
        /** Measured off the design: L78.5% R96% T56.9% B76% of the band. */
        position: "left-[78.5%] top-[56.9%] w-[17.5%]",
      },
    },

    /** The rail along the foot of the band. */
    proof: [
      { icon: "bolt", label: "Create with ease" },
      { icon: "people", label: "Build your community" },
      { icon: "bars", label: "Grow your reputation" },
    ],
  },

  /**
   * SECTION 2 — the Knowledge Studio.
   *
   * A warm cream band: the Studio window on the left with the AI-persona card
   * overlapping its foot, and copy with three features on the right.
   *
   * THE STUDIO WINDOW IS DRAWN, not shipped. The design pack supplies it as a
   * 783KB transparent PNG; it is pure interface — a file list, tabs, a lesson
   * preview, two buttons — so as an image it would blur on high-density
   * screens, stay untranslatable and be invisible to screen readers. Only the
   * lesson artwork ships, because it is an illustration.
   */
  studio: {
    eyebrow: "From expertise to experience",

    /** Three lines, with "into learning." accented. */
    headline: [
      { text: "Bring your expertise." },
      { text: "We\u2019ll help you turn" },
      { text: "it ", tail: "into learning.", accent: true },
    ],

    description:
      "Start with your documents, presentations, videos\u2014or simply explain what you know. Create engaging learning experiences with AI assistance.",

    features: [
      {
        icon: "upload",
        title: "Start with what you have.",
        body: "Bring your material, ideas and experience.",
      },
      {
        icon: "wand",
        title: "Create with AI assistance.",
        body: "Build lessons, videos and quizzes. Review and refine.",
      },
      {
        icon: "persona",
        title: "Teach your AI persona.",
        body: "Add your frameworks, examples and teaching approach.",
      },
    ],

    /** TODO(routes): no signup flow yet; points at the demo request. */
    action: { label: "Start Creating", href: "/demo" },

    /** The Studio window itself. */
    window: {
      brand: "Lurny",
      title: "Knowledge Studio",
      status: "Draft",

      /** The left pane: the expert's own source material. */
      knowledge: {
        title: "Your knowledge",
        items: [
          {
            kind: "pdf",
            name: "Leadership notes.pdf",
            meta: "12 pages \u00b7 Added 2 days ago",
          },
          {
            kind: "ppt",
            name: "Workshop slides.pptx",
            meta: "28 slides \u00b7 Added 3 days ago",
          },
          {
            kind: "idea",
            name: "Add your idea",
            meta: "Turn a thought into a lesson",
          },
        ],
        add: "Add material",
      },

      /** The right pane: what the material becomes. */
      preview: {
        title: "Lesson preview",
        /** `active` marks the selected tab — exactly one carries it. */
        tabs: [
          { icon: "lesson", label: "Lesson", active: true },
          { icon: "video", label: "Video" },
          { icon: "quiz", label: "Quiz" },
        ],
        /**
         * The lesson artwork. It ships because it is an illustration rather
         * than interface — the one part of this window that is.
         */
        image: {
          src: "/assets/images/lurny-ai/lesson-thumb.webp",
          alt: "",
        },
        /*
          `lessonTitle`, not `title` — the pane's own heading above already
          claims that key, and the two name different things: one labels the
          preview pane, the other is the lesson being previewed.
        */
        meta: "5 min \u00b7 Microlesson",
        lessonTitle: "Giving feedback that helps",
        body: [
          "Learn a practical, people-first approach to giving feedback that builds trust, drives growth and creates lasting change.",
          "In this lesson, you\u2019ll explore a simple framework, see real examples and get practical tips you can use right away.",
        ],
        actions: { secondary: "Review & refine", primary: "Publish" },
      },

      /** The dark card overlapping the window's foot. */
      persona: {
        title: "Teach my AI persona",
        chip: "AI persona",
        body: "Use my frameworks, examples and teaching style.",
        add: "Add knowledge",
      },
    },
  },

  /**
   * SECTION 3 — create for companies.
   *
   * A dark band: copy with three benefits on the left, two stacked cards on the
   * right joined by a curved arrow, and a rail of eight formats along the foot.
   *
   * THE ARROW IS THE ARGUMENT. It runs from the brief down into the collection
   * — a company states a need, and learning comes back — so it draws itself
   * rather than appearing, and the two cards arrive in that order.
   */
  companies: {
    eyebrow: "Expertise that earns",

    /** Three lines, the last two accented as one coral block. */
    headline: [
      { text: "Create for companies." },
      { text: "Earn from", accent: true },
      { text: "your expertise.", accent: true },
    ],

    description: "Turn your knowledge into learning that helps teams perform.",

    benefits: [
      { icon: "briefcase", label: "Meet real business needs." },
      { icon: "formats", label: "Create in any format." },
      { icon: "wallet", label: "Earn from your expertise." },
    ],

    /** TODO(routes): no company flow yet; points at the demo request. */
    action: { label: "Create for Companies", href: "/demo" },

    /** The upper card: what a company asks for. */
    brief: {
      brand: "Lurny",
      chip: "Example project",
      eyebrow: "Company learning brief",
      title: "Customer conversations that build trust",
      audience: "Audience: Frontline teams",
      goal: "Build confidence in everyday customer interactions.",
      /** The notebook photograph. It ships because it is a photograph. */
      image: {
        src: "/assets/images/lurny-ai/companies/notebook.webp",
        alt: "",
      },
    },

    /** The lower card: what comes back. */
    collection: {
      title: "Your learning collection",
      note: "From brief to impact \u2014 together",
      /**
       * Three tiles. `video` marks the one that carries a play affordance —
       * drawn rather than baked in, so it can respond on hover.
       */
      tiles: [
        {
          kind: "Video",
          title: "Lead with empathy",
          video: true,
          image: {
            src: "/assets/images/lurny-ai/companies/tile-video.webp",
            alt: "",
          },
        },
        {
          kind: "Microlesson",
          title: "Ask better questions",
          image: {
            src: "/assets/images/lurny-ai/companies/tile-lesson.webp",
            alt: "",
          },
        },
        {
          kind: "Challenge",
          title: "Handle a difficult moment",
          image: {
            src: "/assets/images/lurny-ai/companies/tile-challenge.webp",
            alt: "",
          },
        },
      ],
    },

    /** The format rail along the foot. */
    formats: [
      { icon: "video", label: "Videos" },
      { icon: "mic", label: "Podcasts" },
      { icon: "card", label: "Microlessons" },
      { icon: "stack", label: "Courses" },
      { icon: "quiz", label: "Quizzes" },
      { icon: "tap", label: "Interactions" },
      { icon: "target", label: "Challenges" },
      { icon: "gamepad", label: "Games" },
    ],
  },

  /**
   * SECTION 4 — expert-issued credentials.
   *
   * A cream band: the credential card on the left with a light requirements
   * panel overlapping it, and copy with three benefits on the right.
   *
   * THIS IS A PLANNED CAPABILITY, and the design says so twice — a "Coming
   * next" pill above the copy and a note beneath it. Both are kept: a section
   * that reads as shipped when it is not would be the wrong kind of accurate.
   */
  credentials: {
    status: "Coming next",
    eyebrow: "Your name. Their achievement.",

    /** Three lines, the middle one accented. */
    headline: [
      { text: "Give learning" },
      { text: "your stamp", accent: true },
      { text: "of expertise." },
    ],

    description:
      "Recognise demonstrated learning with credentials carrying your name.",

    benefits: [
      { icon: "clipboard", label: "Set clear requirements." },
      { icon: "check", label: "Assess real understanding." },
      { icon: "rosette", label: "Award under your name." },
    ],

    /** The note beneath the rule, restating the status. */
    note: "Expert-issued credentials \u2022 Planned capability",

    /**
     * The credential card.
     *
     * IT SHIPS, unlike the interface panels elsewhere on this page. It is a
     * RENDERED OBJECT — an embossed gold seal with a raised rim, a bevelled
     * frame and a corner arc with real depth — and markup cannot reproduce
     * that metallic shading. Its text is baked in, so the card's own wording
     * is repeated in `transcript` below for assistive technology.
     */
    card: {
      src: "/assets/images/lurny-ai/credentials/credential.webp",
      alt: "",
    },

    /**
     * What the credential card says, as text. It exists because the card is an
     * image: without this the whole credential is invisible to screen readers.
     */
    transcript:
      "Sample credential. Expert-issued credential: Customer Communication. Awarded to Aditi Menon, issued by Ananya Rao. Leadership & Communication.",

    /** The light panel overlapping the card's lower right. */
    requirements: {
      title: "Requirements met",
      items: ["Learning completed", "Challenge reviewed", "Assessment passed"],
    },
  },

  /**
   * SECTION 5 — build your learning community.
   *
   * A dark band with gold arcs: copy and three benefits on the left, the
   * community window on the right with a small paid-experiences panel
   * overlapping its lower corner.
   *
   * THE WINDOW IS DRAWN, its photographs ship. The pack supplies the whole
   * card as an 888KB PNG; the chrome around the pictures — tabs, the caption
   * bar, the discussion row — is interface, so only the six images are cut out
   * of it.
   */
  community: {
    eyebrow: "Your people. Your learning space.",

    /** Three lines, the last accented. */
    headline: [
      { text: "Build your" },
      { text: "learning" },
      { text: "community.", accent: true },
    ],

    description:
      "Bring learners together through live sessions, guided cohorts and ongoing memberships.",

    benefits: [
      { icon: "people", label: "Connect your learners." },
      { icon: "calendarPlay", label: "Host paid sessions and cohorts." },
      { icon: "star", label: "Offer ongoing memberships." },
    ],

    /** TODO(routes): no community flow yet; points at the demo request. */
    action: { label: "Build Your Community", href: "/demo" },

    /** The community window. */
    window: {
      brand: "Lurny",
      title: "Ananya\u2019s Learning Circle",
      subtitle: "Example community",
      /** `active` marks the selected tab — exactly one carries it. */
      tabs: [
        { label: "Community", active: true },
        { label: "Sessions" },
        { label: "Membership" },
      ],

      /** The main video. Its label and play head are drawn over the still. */
      stage: {
        image: {
          src: "/assets/images/lurny-ai/community/stage.webp",
          alt: "",
        },
        kind: "Live workshop",
        title: "Conversations that build trust",
      },

      /**
       * The four participants. These ship because they are photographs of
       * people — the same call as the hero's avatars.
       */
      participants: [
        { src: "/assets/images/lurny-ai/community/p1.webp", alt: "" },
        { src: "/assets/images/lurny-ai/community/p2.webp", alt: "" },
        { src: "/assets/images/lurny-ai/community/p3.webp", alt: "" },
        { src: "/assets/images/lurny-ai/community/p4.webp", alt: "" },
      ],

      /** The row along the window's foot. */
      discussion: {
        avatar: {
          src: "/assets/images/lurny-ai/community/asker.webp",
          alt: "",
        },
        question: "How do you start a difficult conversation?",
        action: "Join the discussion",
      },
    },

    /** The panel overlapping the window's lower right. */
    paid: {
      title: "Paid learning experiences",
      items: [
        { icon: "camera", label: "Live workshops" },
        { icon: "people", label: "Guided cohorts" },
        { icon: "star", label: "Member access" },
      ],
    },
  },

  /* ======================================================================== */
  /* SECTION 6 — BETA SIGNUP                                                  */
  /* ======================================================================== */

  /**
   * The closing band: a launch badge and headline on the left, one email
   * capture on the right.
   *
   * The copy deliberately mirrors the LurnyCampus beta band — the same offer,
   * the same wording — differing only in the product named. Keeping the two in
   * step is the point: a visitor who sees both should read one promise.
   */
  beta: {
    badge: "Launching by October 2026",
    headline: "Get an early look.",
    description:
      "Join the beta list for a sneak preview of Lurny before launch.",

    form: {
      label: "Your email address",
      placeholder: "you@example.com",
      submit: "Join the Beta",
      /** Sits beneath the field, explaining what submitting does. */
      note: "Register your interest for an early preview.",

      /** Shown in place of the form once an address is accepted. */
      success: {
        title: "You are on the list.",
        body: "We will be in touch before launch with your early preview.",
      },

      /** Validation copy, kept out of the component so wording can change. */
      errors: {
        empty: "Enter your email address.",
        format: "Enter a valid email address.",
      },
    },
  },
} as const;
