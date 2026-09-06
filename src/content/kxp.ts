/**
 * LURNYKXP PAGE CONTENT
 * ---------------------------------------------------------------------------
 * Copy for the LurnyKxP product page at /platform/kxp.
 *
 * Copy is verbatim from the supplied "LurnyKxP_Six_Sections_Text.txt".
 * Section 1 is defined below; the remaining sections are specified in that
 * file and are added here as their designs are built.
 */

export const kxp = {
  /** Page-level metadata, consumed by the route's `metadata` export. */
  meta: {
    title: "LurnyKxP — Knowledge Experience Platform",
    description:
      "Bring learning, capability, practice, events and progress together in one personalised experience for every employee.",
    path: "/platform/kxp",
  },

  /**
   * SECTION 1 — the hero.
   *
   * Copy on the left, the product composition on the right.
   */
  hero: {
    /** Split so the dot separator can be drawn rather than typed. */
    eyebrow: ["LurnyKxP", "Knowledge Experience Platform"],

    /**
     * Split so the lines break where the design breaks them on lg+. The design
     * sets an amber full stop after the last word, so the headline is split
     * from its terminal period rather than carrying it inline.
     */
    headline: [
      "Everything your",
      "people need to",
      "learn, grow and",
      "perform",
    ],

    description:
      "Bring learning, capability, practice, events and progress together in one personalised experience for every employee.",

    actions: {
      primary: { label: "Experience LurnyKxP", href: "/demo" },
      /* Points at a section further down this page, which is specified in the
         supplied copy but not yet built. */
      secondary: { label: "Explore the learner journey", href: "#journey" },
    },

    /**
     * The three proof points under the actions, each behind its own icon.
     * `icon` selects a mark from the component's own set — they are three
     * simple glyphs, so they are drawn rather than shipped as images.
     */
    features: [
      { label: "Personalised learning", icon: "person" },
      { label: "Capability growth", icon: "chart" },
      { label: "One learner record", icon: "record" },
    ],

    /**
     * The product composition: six cards with connector lines drawn between
     * them, shipped as ONE image rather than assembled from the individual
     * card exports — the connectors run between the cards, so rebuilding them
     * in CSS would be work for no gain.
     *
     * It carries two stray fragments of the copy column at its far left. They
     * cannot be cropped — both share a band with the Achievement card — so the
     * hero masks the image's left edge instead. See KxpHero.
     */
    composition: {
      src: "/assets/images/kxp/hero-composition.webp",
      /**
       * Decorative: it is a rendering of the product UI, and every claim it
       * makes is already set in the copy beside it.
       */
      alt: "",
      width: 1010,
      height: 714,
    },
  },

  /**
   * SECTION 2 — the problem LurnyKxP solves.
   *
   * The statement on the left, a numbered list of the four failures on the
   * right, each separated by a hairline rule.
   */
  problem: {
    eyebrow: "The problem LurnyKxP solves",

    /** Split so the lines break where the design breaks them on lg+. */
    headline: [
      "When learning is",
      "scattered, people lose",
      "sight of what matters",
      "next.",
    ],

    body: "Courses live in one place, assessments in another, events arrive by email and progress is recorded somewhere else. The learner is left to connect it all.",

    /**
     * The four failures. The ordinal is not stored — it is the item's position
     * in this list, so the two can never drift apart. See KxpProblem.
     */
    failures: [
      {
        title: "Too many places to go",
        body: "Learners move between platforms, inboxes, links and apps just to complete a single development journey.",
      },
      {
        title: "Everyone gets the same experience",
        body: "Generic catalogues and assignments ignore each person’s role, readiness, performance signals and goals.",
      },
      {
        title: "Learning stops at completion",
        body: "A completed course rarely leads into practice, application, coaching or evidence of capability.",
      },
      {
        title: "Progress never becomes a complete picture",
        body: "Scores, attendance, badges, conversations and certifications remain disconnected—leaving no reliable learner record.",
      },
    ],
  },

  /**
   * SECTION 3 — the connected learner experience.
   *
   * A header over the violet room scene, closing on a single line. The scene
   * itself is one composite — see scripts/build-kxp-connected.cjs for why.
   */
  connected: {
    eyebrow: "The connected learner experience",

    /** Split so the lines break where the design breaks them on lg+. */
    headline: [
      "Many engines behind the scenes.",
      "One experience for every learner.",
    ],

    description:
      "Your teams create, diagnose, analyse and organise. LurnyKxP brings it all together as each employee’s next meaningful action.",

    /** The line closing the section, under the scene. */
    closing: "One destination. Personalised next steps. A connected learner record.",

    /**
     * The room, with the engine panel and the learner workspace composited
     * onto it at build time.
     */
    scene: {
      src: "/images/platform/kxp/connected.webp",
      /**
       * NOT decorative: the engine panel names the five products that feed
       * LurnyKxP, and they appear nowhere in the surrounding copy. So the
       * scene carries a real description rather than an empty alt.
       */
      alt: "A learner workspace headed “Your next steps”, showing a GrowthPath in progress, a readiness check, a practice session, an upcoming event and a progress strip. Beside it, a panel headed “Powered by your teams” lists the five engines feeding it: LurnyMagic for learning creation, LurnyPulse for capability intelligence, LurnyPitch for conversation insights, LurnyEvents for learning programmes and LurnyChat for knowledge and coaching.",
      width: 1672,
      height: 941,
    },
  },

  /**
   * SECTION 4 — built around the learner.
   *
   * The argument on the left, the learner's scene on the right with his
   * personalised home over it. The dashboard is markup, not pixels — see
   * KxpLearner and scripts/build-kxp-learner.cjs.
   */
  learner: {
    eyebrow: "Built around the learner",

    /** Split so the lines break where the design breaks them on lg+. */
    headline: ["His day is busy.", "His next step", "is clear."],

    description:
      "A personalised home brings together what’s assigned, what’s in progress and what needs attention—so every learner knows where to begin.",

    /**
     * The four points. The ordinal comes from the item's position rather than
     * being stored, so the two cannot drift apart.
     */
    points: [
      {
        title: "Know what matters today",
        body: "Assignments, deadlines and upcoming sessions.",
      },
      {
        title: "Pick up where you left off",
        body: "Resume a lesson, journey or practice activity.",
      },
      {
        title: "Take the next growth step",
        body: "Turn capability gaps and feedback into action.",
      },
      {
        title: "Make room to explore",
        body: "Discover learning and knowledge beyond assignments.",
      },
    ],

    /** The learner at his desk. Decorative: the copy carries the meaning. */
    scene: {
      src: "/images/platform/kxp/learner-scene.webp",
      alt: "",
      width: 1672,
      height: 941,
    },

    /**
     * THE DASHBOARD
     * ---------------------------------------------------------------------
     * Rahul's personalised home, built in markup over the scene. The supplied
     * pack ships the background deliberately free of it and asks for interface
     * elements to be rendered as HTML/CSS, so only the four photographic
     * thumbnails inside the cards are rasters.
     */
    dashboard: {
      brand: "LurnyKxP",
      greeting: "Good morning, Rahul",
      subtitle: "Here’s what matters today.",
      /** The avatar initial in the top-right. */
      initial: "R",

      priorities: {
        title: "Your priorities",
        items: [
          { label: "Product update", badge: "Due today" },
          { label: "Customer masterclass", meta: "3:00 PM" },
        ],
      },

      continue: {
        title: "Continue learning",
        lesson: "Understanding customer needs",
        progress: 60,
        action: "Resume",
        thumb: {
          src: "/images/platform/kxp/thumb-customer-needs.webp",
          alt: "",
          width: 99,
          height: 79,
        },
      },

      recommended: {
        title: "Recommended next step",
        lesson: "Practise handling objections",
        meta: "10 min practice",
        thumb: {
          src: "/images/platform/kxp/thumb-handling-objections.webp",
          alt: "",
          width: 105,
          height: 74,
        },
      },

      explore: {
        title: "Explore for you",
        items: [
          {
            label: "Build customer trust",
            thumb: {
              src: "/images/platform/kxp/thumb-customer-trust.webp",
              alt: "",
              width: 176,
              height: 64,
            },
          },
          {
            label: "Know your products",
            thumb: {
              src: "/images/platform/kxp/thumb-know-products.webp",
              alt: "",
              width: 176,
              height: 64,
            },
          },
        ],
      },
    },
  },

  /**
   * SECTION 5 — learning that builds momentum.
   *
   * The header over the learner's scene, with a three-column panel across the
   * lower half. The panel is markup — see KxpMomentum.
   */
  momentum: {
    eyebrow: "Learning that builds momentum",

    /** Split so the lines break where the design breaks them on lg+. */
    headline: ["Discover more. Grow", "with purpose. Keep going."],

    description:
      "Curated learning, guided practice and recognition come together—helping every learner build capability and stay motivated.",

    /** The line closing the section, under the panel. */
    closing: "Learning to explore. Capability to build. Progress to celebrate.",

    /** The learner with headphones. Decorative: the copy carries the meaning. */
    scene: {
      src: "/images/platform/kxp/momentum-scene.webp",
      alt: "",
      width: 1672,
      height: 941,
    },

    /** COLUMN 1 — curated learning. */
    discovery: {
      title: "Find your next discovery",
      /** The filter chips. The first is the active one. */
      filters: ["For you", "Explore", "Saved"],
      cards: [
        {
          title: "Customer conversations",
          meta: "Video · 6 min",
          /** Selects the mark drawn over the thumbnail. */
          badge: "play",
          thumb: {
            src: "/images/platform/kxp/thumb-customer-conversations.webp",
            alt: "",
            width: 215,
            height: 168,
          },
        },
        {
          title: "The art of listening",
          meta: "Podcast · 12 min",
          badge: "waveform",
          thumb: {
            src: "/images/platform/kxp/thumb-art-of-listening.webp",
            alt: "",
            width: 215,
            height: 168,
          },
        },
        {
          title: "Make the right call",
          meta: "Interactive story",
          badge: "open",
          thumb: {
            src: "/images/platform/kxp/thumb-right-call.webp",
            alt: "",
            width: 215,
            height: 168,
          },
        },
      ],
    },

    /** COLUMN 2 — capability growth. */
    capability: {
      title: "Build capability with purpose",
      pathLabel: "Your GrowthPath",
      pathTitle: "Handling objections",
      /**
       * The three steps. `state` drives the marker: one done, one in progress,
       * one still to come.
       */
      steps: [
        { label: "Learn the approach", state: "done" },
        { label: "Practise a conversation", state: "current" },
        { label: "Check your readiness", state: "todo" },
      ],
      footnote: "Feedback guides your next step",
    },

    /** COLUMN 3 — recognition. */
    rewards: {
      title: "Make progress feel rewarding",
      award: "Consistent Learner",
      streak: "5-day streak",
      xp: "+120 XP",
      badge: {
        src: "/images/platform/kxp/badge-consistent-learner.webp",
        /** Decorative: the award is named beside it. */
        alt: "",
        width: 116,
        height: 98,
      },
      leaderboard: {
        title: "Team leaderboard",
        /** The learner's own row is the highlighted one. */
        rows: [
          { rank: "7" },
          { rank: "8", label: "Rahul · #8", self: true },
          { rank: "9" },
        ],
      },
      footnote: "Recognition for participation and progress",
    },
  },

  /**
   * SECTION 6 — the closing demo form.
   *
   * The pitch on the left, the booking form on a card to the right. The form
   * is the shared LeadForm — see KxpDemo.
   */
  demo: {
    eyebrow: "Book a LurnyKxP demo",

    /** Split so the lines break where the design breaks them on lg+. */
    headline: ["One place to learn.", "Every reason to grow."],

    description:
      "See how LurnyKxP brings learning, capability, practice, events and recognition into one personalised experience for your people.",

    /** The two lines under the rule, each behind its own icon. */
    points: [
      {
        icon: "clock",
        text: "30 minutes · tailored to your workforce",
      },
      {
        icon: "chart",
        text: "Explore the learner journey, from first assignment to visible progress.",
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

      organisation: {
        name: "organisation",
        label: "Organisation",
        placeholder: "Company name",
        autoComplete: "organization",
      },

      selectA: {
        name: "workforceSize",
        label: "Workforce size",
        options: [
          "Select workforce size",
          "Under 500",
          "500 – 2,000",
          "2,000 – 10,000",
          "10,000 – 50,000",
          "50,000+",
        ],
      },
      /* The design sets this select full width, under the pair above it. */
      wideSelectB: true,

      selectB: {
        name: "areaOfInterest",
        label: "What would you like to explore?",
        options: [
          "Select your area of interest",
          "A personalised learner home",
          "Capability and readiness",
          "Practice and coaching",
          "Learning programmes and events",
          "Recognition and engagement",
          "One connected learner record",
        ],
      },

      detail: {
        name: "priorities",
        label: "Your learning priorities (optional)",
        placeholder: "Tell us what you would like to improve.",
        autoComplete: "off",
      },

      consent: {
        name: "sendOverview",
        label: "Send me the LurnyKxP overview.",
      },

      submit: "Book a LurnyKxP Demo",

      success: {
        title: "Request received.",
        description:
          "We will be in touch within one business day to arrange a time.",
      },

      errors: {
        name: "Please enter your name.",
        email: "Please enter your work email.",
        emailFormat: "Please enter a valid email address.",
        organisation: "Please enter your organisation.",
      },

      footnote: {
        text: "We’ll use these details to respond to your enquiry. {0} Prefer to talk first? {1}",
        links: [
          { label: "Privacy Policy.", href: "/privacy" },
          { label: "Contact Sales.", href: "/contact" },
        ],
      },
    },
  },
} as const;
