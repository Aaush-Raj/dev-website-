/**
 * RESOURCES PAGE CONTENT
 * ---------------------------------------------------------------------------
 * Copy for the Lurny Resources page at /resources.
 *
 * Section 1 is defined below; further sections are added here as their designs
 * land. Copy is verbatim from the supplied
 * "Lurny_Resources_Page_Text_Content.txt".
 */

export const resources = {
  /** Page-level metadata, consumed by the route's `generateMetadata`. */
  meta: {
    title: "Resources — Lurny",
    description:
      "Research, practical frameworks and real-world lessons for building an AI-ready workforce.",
    path: "/resources",
  },

  hero: {
    eyebrow: "Lurny Resources",

    /**
     * Split so the line breaks land where the design puts them on lg+. The
     * design sets a violet full stop after the last word, so the headline is
     * split from its terminal period rather than carrying it inline.
     */
    headline: ["Ideas that turn", "capability into", "performance"],

    description:
      "Research, practical frameworks and real-world lessons for building an AI-ready workforce.",

    actions: {
      primary: { label: "Explore Resources", href: "#resource-types" },
      secondary: { label: "View Case Studies", href: "#case-studies" },
    },

    /** The four categories under the actions, each behind a violet dot. */
    categories: ["Insights", "Playbooks", "Case Studies", "Webinars"],

    /**
     * The three covers in the arrangement the design shows: the featured guide
     * front and centre, with two more fanned behind its right edge.
     *
     * PROVENANCE: the supplied PNGs already carry real transparency — unlike
     * the LurnySaathi hero photo, no keying was needed. They were trimmed to
     * their content and converted to WebP; see scripts/build-resource-books.cjs.
     *
     * `alt` is empty on all three: the covers repeat the titles already set in
     * the surrounding copy and the sections below, so announcing them again
     * would only be noise. They are decorative here.
     */
    books: {
      featured: {
        src: "/assets/images/resources/book-readiness.webp",
        alt: "",
        width: 744,
        height: 1041,
      },
      middle: {
        src: "/assets/images/resources/book-quality-test.webp",
        alt: "",
        width: 465,
        height: 768,
      },
      back: {
        src: "/assets/images/resources/book-playbook.webp",
        alt: "",
        width: 521,
        height: 969,
      },
    },
  },

  /**
   * SECTION 2 — the featured resource.
   *
   * A cream panel carrying the guide's own cover treatment: the title set in
   * the book's two-tone display face, its subtitle, and the three things the
   * guide contains.
   */
  featured: {
    eyebrow: "Featured resource",

    /**
     * The title is split the way the cover sets it — the second half in red.
     * Kept as two fields rather than one string with markup so the colour is
     * the component's decision, not the content's.
     */
    title: { lead: "From roles", accent: "to readiness" },

    subtitle:
      "How to Build an AI-Era Competency Framework in 10 Practical Steps",

    description:
      "A practical guide for HR, L&D and business leaders who want to move beyond static competency documents and build measurable workforce readiness.",

    /** The three contents, each behind its own coloured dot in the design. */
    highlights: [
      { label: "10 practical steps", tone: "red" },
      { label: "Ready-to-use templates", tone: "violet" },
      { label: "AI prompt library", tone: "teal" },
    ],

    actions: {
      primary: { label: "Download the Guide", href: "#download" },
      secondary: { label: "Preview the Contents", href: "#preview" },
    },

    /**
     * The cover, shown here angled with its spine toward the viewer rather
     * than the straight-on view section 1 uses. Same source asset — the tilt
     * and spine are added in CSS, since the supplied render is face-on.
     */
    cover: {
      src: "/assets/images/resources/book-readiness.webp",
      /**
       * Named here, unlike the hero's decorative covers: this one IS the
       * subject of the section, and its title is the section's own heading, so
       * a screen reader reaching it should know what it is looking at.
       */
      alt: "The From Roles to Readiness guide.",
      width: 744,
      height: 1041,
    },
  },

  /**
   * SECTION 3 — browse by resource type.
   *
   * The five resource types as a row of cards on the dark ground. Same five
   * the header's Resources mega-menu lists, and the hrefs match — this section
   * is the in-page version of that menu.
   */
  types: {
    eyebrow: "Explore the library",
    headline: "Browse by resource type",

    /** Split so the lines break where the design breaks them on lg+. */
    description: [
      "Find the perspectives, practical tools and",
      "real-world examples most useful to you.",
    ],

    /**
     * The icons are the supplied line art, converted by
     * scripts/build-resource-type-icons.cjs. They are white with violet
     * accents, drawn for this dark section, so they ship as images rather
     * than being redrawn as `currentColor` glyphs like the menu's.
     */
    items: [
      {
        name: "Insights",
        description: "Perspectives on AI, learning and performance.",
        href: "/resources/insights",
        icon: {
          src: "/assets/images/resources/type-insights.webp",
          width: 160,
          height: 160,
        },
      },
      {
        name: "Guides & Playbooks",
        description: "Practical frameworks, checklists and tools.",
        href: "/resources/guides",
        icon: {
          src: "/assets/images/resources/type-guides.webp",
          width: 160,
          height: 160,
        },
      },
      {
        name: "Case Studies",
        description: "Real-world implementations and measurable outcomes.",
        href: "/resources/case-studies",
        icon: {
          src: "/assets/images/resources/type-case-studies.webp",
          width: 160,
          height: 160,
        },
      },
      {
        name: "Webinars & Events",
        description: "Live sessions, expert conversations and recordings.",
        href: "/resources/events",
        icon: {
          src: "/assets/images/resources/type-events.webp",
          width: 160,
          height: 160,
        },
      },
      {
        name: "Videos",
        description: "Short explainers, demonstrations and interviews.",
        href: "/resources/videos",
        icon: {
          src: "/assets/images/resources/type-videos.webp",
          width: 160,
          height: 160,
        },
      },
    ],
  },

  /**
   * SECTION 4 — latest insights.
   *
   * One featured article beside two smaller ones. Every entry carries its own
   * illustration, converted by scripts/build-insight-art.cjs.
   */
  insights: {
    eyebrow: "Latest insights",
    headline: "Ideas shaping the AI-ready enterprise",
    description:
      "Perspectives and field lessons on capability, learning and performance.",

    /** The shared label on every card's link. */
    readLabel: "Read insight",

    /**
     * The featured article. Its artwork is OPAQUE and brings its own near-black
     * panel, which the design runs full-bleed down the card's right half — so
     * unlike the two below it, this one is not line art on white.
     */
    featured: {
      topic: "Capability intelligence",
      readingTime: "8 min read",
      title:
        "Why capability intelligence is becoming the operating system for workforce readiness",
      excerpt:
        "Most organisations can measure learning activity. Far fewer can see whether people are ready to perform.",
      href: "/resources/insights/capability-intelligence",
      art: {
        src: "/assets/images/resources/insight-radar.webp",
        width: 427,
        height: 535,
      },
    },

    /**
     * The two stacked articles. Their artwork is transparent line work sitting
     * directly on the card's white.
     */
    items: [
      {
        topic: "AI-native learning",
        readingTime: "6 min read",
        title: "AI-native learning starts with the work—not the course",
        href: "/resources/insights/ai-native-learning",
        art: {
          src: "/assets/images/resources/insight-workflow.webp",
          width: 250,
          height: 185,
        },
      },
      {
        topic: "Conversation intelligence",
        readingTime: "7 min read",
        title: "What 9,328 conversations revealed about frontline performance",
        href: "/resources/insights/conversation-intelligence",
        art: {
          src: "/assets/images/resources/insight-waveform.webp",
          width: 250,
          height: 185,
        },
      },
    ],
  },

  /**
   * SECTION 5 — guides and playbooks.
   *
   * Four downloadable resources as a row of cards on the near-black ground.
   * Each carries its own vintage-textured artwork and its own accent colour,
   * which the design uses for the short rule under the title.
   */
  guides: {
    eyebrow: "Guides & Playbooks",
    headline: "Practical resources. Ready to use.",

    /** Split so the lines break where the design breaks them on lg+. */
    description: [
      "Downloadable tools, checklists and field guides",
      "designed to help teams move from ideas to action.",
    ],

    /** The shared label on every card's button. */
    downloadLabel: "Download PDF",

    /**
     * `accent` keys into the rule colours in ResourcesGuides — one per card,
     * sampled from the design: coral, sage, magenta, gold. They pick up the
     * dominant tone of each card's own artwork, which is what ties the rule to
     * the image above it.
     *
     * The artwork is opaque and already matches the aspect of the band the
     * design gives it; see scripts/build-guide-cards.cjs.
     */
    items: [
      {
        kicker: "Diagnostic",
        title: "Competency Framework Quality Test",
        meta: "12-point assessment",
        href: "/resources/guides/competency-framework-quality-test",
        accent: "coral",
        art: {
          src: "/assets/images/resources/guide-quality-test.webp",
          width: 373,
          height: 296,
        },
      },
      {
        kicker: "Checklist",
        title: "AI-Era Learning Readiness Checklist",
        meta: "18 essential checks",
        href: "/resources/guides/ai-era-learning-readiness-checklist",
        accent: "sage",
        art: {
          src: "/assets/images/resources/guide-readiness-checklist.webp",
          width: 378,
          height: 296,
        },
      },
      {
        kicker: "Pilot guide",
        title: "Conversation Intelligence Pilot Guide",
        meta: "Plan, launch and measure",
        href: "/resources/guides/conversation-intelligence-pilot",
        accent: "magenta",
        art: {
          src: "/assets/images/resources/guide-pilot.webp",
          width: 368,
          height: 296,
        },
      },
      {
        kicker: "Action plan",
        title: "30-Day Capability Framework Action Plan",
        meta: "Week-by-week roadmap",
        href: "/resources/guides/30-day-capability-action-plan",
        accent: "gold",
        art: {
          src: "/assets/images/resources/guide-action-plan.webp",
          width: 379,
          height: 296,
        },
      },
    ],
  },

  /**
   * SECTION 6 — customer stories.
   *
   * Two stories side by side, each a photograph over copy with a stat panel
   * beside it.
   *
   * The two panels are deliberately DIFFERENT in kind, as the design shows:
   * the first reports figures (25 branches, 9,328 conversations), the second
   * reports qualities with no number attached (kitchen-based learning, no
   * smartphones required). Each stat therefore carries an optional `value`
   * rather than forcing the second story into a shape it does not have.
   */
  stories: {
    eyebrow: "Customer stories",

    /** Split so the lines break where the design breaks them on lg+. */
    headline: ["Learning that shows up", "in the real world."],

    description: [
      "How organisations are using Lurny to turn everyday work",
      "into measurable learning and performance.",
    ],

    action: { label: "View all stories", href: "/customers" },

    /** The shared label on every card's link. */
    readLabel: "Read the story",

    items: [
      {
        kicker: "Financial services",
        title: "From customer conversations to missed-opportunity intelligence",
        excerpt:
          "Conversation intelligence gave leaders a clearer view of what teams were saying, what they were missing and where coaching was needed.",
        href: "/customers/conversation-intelligence",
        photo: {
          src: "/assets/images/resources/story-conversations.webp",
          /**
           * Described rather than left empty: these are photographs of real
           * workplaces, and the scene is part of what the story communicates.
           */
          alt: "A relationship manager talking with a customer across a desk in a branch office.",
          width: 774,
          height: 301,
        },
        stats: [
          {
            value: "25",
            label: "branches",
            icon: "/assets/images/resources/stat-branches.webp",
          },
          {
            value: "9,328",
            label: "conversations",
            icon: "/assets/images/resources/stat-conversations.webp",
          },
        ],
      },
      {
        kicker: "Frontline operations",
        title: "Turning a kitchen television into a learning kiosk",
        excerpt:
          "Short SOP-led learning reached kitchen teams without smartphones or conventional LMS access.",
        href: "/customers/kitchen-learning-kiosk",
        photo: {
          src: "/assets/images/resources/story-kitchen.webp",
          alt: "Kitchen staff in hairnets and aprons watching a hygiene lesson on a wall-mounted television.",
          width: 774,
          height: 301,
        },
        /** No figures on this story — see the note above. */
        stats: [
          {
            label: "Kitchen-based learning",
            icon: "/assets/images/resources/stat-kitchen.webp",
          },
          {
            label: "No smartphones required",
            icon: "/assets/images/resources/stat-no-smartphone.webp",
          },
        ],
      },
    ],
  },

  /**
   * SECTION 7 — webinars and demonstrations.
   *
   * One upcoming live session beside two on-demand recordings. The live card
   * is the subject: it takes ~1.7x the stacked pair and carries the date, the
   * presenter and a filled Register button, where the recordings carry only a
   * runtime and a Watch button.
   */
  sessions: {
    eyebrow: "Webinars & demonstrations",
    headline: "See the ideas in action.",
    description:
      "Join practical live sessions or watch selected recordings on demand.",

    action: { label: "View all sessions", href: "/resources/events" },

    /**
     * The upcoming live session.
     *
     * `date` and `time` are display strings rather than a real Date: they are
     * copy set by the design (including the IST timezone and the runtime), and
     * formatting them at render would mean picking a locale and timezone that
     * the design has already decided.
     */
    live: {
      badge: "Upcoming live session",
      date: "18 Sep 2026",
      time: "11:00 AM IST · 45 min",
      title: "From Roles to Readiness",
      description:
        "How to build an AI-era competency framework in 10 practical steps.",

      /**
       * TODO(assets): the design shows a photograph of the presenter, but no
       * avatar was supplied in the section's asset folder. Until one lands the
       * component draws a monogram disc in the same violet ring — see
       * SessionAvatar in ResourcesSessions.tsx.
       */
      presenter: {
        name: "Krishnesh Nair",
        role: "Founder & CEO, Lurny",
        initials: "KN",
      },

      action: {
        label: "Register",
        href: "/resources/events/roles-to-readiness",
      },

      art: {
        src: "/assets/images/resources/session-live.webp",
        alt: "",
        width: 1586,
        height: 992,
      },
    },

    /** The shared badge and button label on both recordings. */
    onDemandBadge: "On demand",
    watchLabel: "Watch Recording",

    /**
     * The two recordings. `accent` keys into the tone maps in
     * ResourcesSessions — mint for the first, amber for the second, matching
     * the dominant colour of each card's own artwork.
     */
    recordings: [
      {
        title: "AI-native learning beyond the LMS",
        runtime: "28 min",
        href: "/resources/events/ai-native-learning",
        accent: "mint",
        art: {
          src: "/assets/images/resources/session-ai-native.webp",
          alt: "",
          width: 1672,
          height: 941,
        },
      },
      {
        title:
          "Conversation intelligence: finding the opportunities teams miss",
        runtime: "32 min",
        href: "/resources/events/conversation-intelligence",
        accent: "amber",
        art: {
          src: "/assets/images/resources/session-conversation.webp",
          alt: "",
          width: 1672,
          height: 941,
        },
      },
    ],
  },

  /**
   * SECTION 8 — how-tos and help videos.
   *
   * One large video beside a mosaic of three. Each entry is a real <video>
   * with a poster, not a still with a decorative play triangle — the design
   * draws a play button, so it should actually play.
   *
   * PLACEHOLDER MEDIA
   * No thumbnails or clips were supplied for this section, so every entry
   * points at the existing LurnyMagic demo clip and reuses posters from
   * elsewhere in the site. The `alt` text describes the PLACEHOLDER rather
   * than the lesson each card claims to show, because that is what is actually
   * on screen — describing the intended content would misdescribe the image.
   *
   * TODO(assets): swap `video` and `poster` on each entry when the real
   * recordings land, and rewrite each `posterAlt` to match.
   */
  videos: {
    eyebrow: "How-tos & help videos",
    headline: "Learn Lurny, one step at a time.",
    description:
      "Quick, practical videos to help learners, creators, managers and administrators get more from Lurny.",

    actions: {
      primary: {
        label: "Explore Self-Help Library",
        href: "/resources/videos",
      },
      secondary: {
        label: "Visit YouTube Channel",
        href: "https://www.youtube.com/@lurny",
      },
    },

    viewAll: { label: "View all help videos", href: "/resources/videos" },

    /**
     * The featured video — the one the design gives the whole left column.
     * `accent` keys into the kicker tones in ResourcesVideos.
     */
    featured: {
      kicker: "Getting started",
      title: "Getting started with Lurny",
      duration: "4:32",
      href: "/resources/videos/getting-started",
      accent: "violet",
      video: "/assets/video/magic-demo.mp4",
      poster: "/assets/images/magic/video-poster.webp",
      posterAlt: "",
      width: 900,
      height: 506,
    },

    /** The three in the mosaic beside it. */
    items: [
      {
        kicker: "Content creation",
        title: "Create your first microlesson with LurnyMagic",
        duration: "6:18",
        href: "/resources/videos/create-a-microlesson",
        accent: "green",
        video: "/assets/video/magic-demo.mp4",
        poster: "/assets/images/magic/format-microlesson.webp",
        posterAlt: "",
        width: 560,
        height: 315,
      },
      {
        kicker: "Learner help",
        title: "Check your Pulse and follow your GrowthPath",
        duration: "5:04",
        href: "/resources/videos/pulse-and-growthpath",
        accent: "amber",
        video: "/assets/video/magic-demo.mp4",
        poster: "/assets/images/magic/format-storybook.webp",
        posterAlt: "",
        width: 560,
        height: 315,
      },
      {
        kicker: "Manager help",
        title: "Review conversations and coach with LurnyPitch",
        duration: "7:21",
        href: "/resources/videos/coach-with-lurnypitch",
        accent: "violet",
        video: "/assets/video/magic-demo.mp4",
        poster: "/assets/images/pulse/pulse-workplace.webp",
        posterAlt: "",
        width: 1600,
        height: 854,
      },
    ],
  },

  /**
   * SECTION 9 — the closing call to action.
   *
   * The statement on the left, the ecosystem sculpture on the right with its
   * four parts labelled.
   */
  closing: {
    eyebrow: "The connected Lurny ecosystem",

    /** Split so the lines break where the design breaks them on lg+. */
    headline: ["Ready to connect", "learning with", "performance?"],

    description: [
      "Explore how Lurny brings capability, learning,",
      "practice and workplace performance into",
      "one connected system.",
    ],

    action: { label: "Book a Demo", href: "/demo" },

    /**
     * The sculpture, trimmed and converted by
     * scripts/build-ecosystem-sculpture.cjs. Despite belonging here, the
     * source file ships in the section 8 asset folder — that is how it was
     * supplied.
     */
    sculpture: {
      src: "/assets/images/resources/ecosystem-sculpture.webp",
      /**
       * Described rather than left empty: the four labels below name the
       * pieces, but the arrangement — four parts interlocking into one form —
       * is the section's whole argument, and a screen reader gets that only
       * from here.
       */
      alt: "Four sculptural pieces interlocking into a single square form.",
      width: 861,
      height: 947,
    },

    /**
     * The labels overlaid on the sculpture. `x` and `y` are percentages of the
     * ARTWORK, measured off the design — which is why the asset is trimmed of
     * its transparent padding first; see the build script.
     *
     * `dot` is each piece's own colour, sampled from the design.
     */
    parts: [
      { label: "Capability", x: 17.3, y: 17.5, dot: "#632dc3" },
      { label: "Learning", x: 67.1, y: 19.5, dot: "#daa149" },
      { label: "Practice", x: 16.6, y: 73, dot: "#42a8a4" },
      { label: "Performance", x: 71, y: 73, dot: "#fd7357" },
    ],
  },
} as const;
