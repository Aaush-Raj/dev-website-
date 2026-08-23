/**
 * LURNYMAGIC PAGE CONTENT
 * ---------------------------------------------------------------------------
 * Copy for the LurnyMagic product page at /platform/magic.
 *
 * Sections 1 to 5 are defined below, in page order; further sections are added
 * here as their designs land.
 *
 * As on the LurnyPulse page, the hero's product cards are DRAWN rather than
 * shipped as a flat screenshot, so the values below are the data the
 * illustration renders from — not captions describing a picture.
 */

export const magic = {
  /** Page-level metadata, consumed by the route's `metadata` export. */
  meta: {
    title: "LurnyMagic — AI Content Creation",
    description:
      "Transform a document, webpage, video or prompt into multilingual microlessons, storybooks, videos, quizzes and interactive practice—in minutes.",
    path: "/platform/magic",
  },

  hero: {
    /**
     * One eyebrow, split at the separator the design sets in amber, so the
     * bullet can be styled and hidden from screen readers — which would
     * otherwise announce it as "bullet".
     */
    eyebrow: { product: "LurnyMagic", label: "AI content creation" },

    /**
     * Split so the lines break where the design breaks them on lg+.
     *
     * The final line ends with a full stop the design sets in amber. It is
     * kept out of the string so it can be coloured without splitting the word
     * — see the `.` span in MagicHero.
     */
    headline: [
      "Turn knowledge",
      "into learning people",
      "actually use",
    ] as const,

    description:
      "Transform a document, webpage, video or prompt into multilingual microlessons, storybooks, videos, quizzes and interactive practice—in minutes.",

    actions: {
      primary: { label: "Book a demo", href: "/demo" },
      secondary: { label: "See Magic in action", href: "/demo" },
    },

    /**
     * THE CREATE PANEL
     *
     * The violet card in the middle of the illustration. Its input and button
     * are DRAWINGS of controls, not controls — see MagicCreatePanel for why.
     */
    panel: {
      /** Split so the source type can be set in amber, as the design does. */
      title: { lead: "Create a microlesson from", source: "web page" },
      description:
        "Easily convert any Webpage into a Microlesson by copying and pasting its URL into the box below and click on 'CREATE' to unleash the magic",
      placeholder: "Paste your URL here",
      action: "Create",
    },

    /**
     * THE THREE OUTPUT CARDS
     *
     * What one source becomes. Each is drawn, and the connectors from the
     * panel to each card are drawn too — see MagicOutputs.
     */
    outputs: {
      storybook: {
        tag: "AI Storybook",
        title: "Reverse Mortgage",
        xp: "20 XP",
        learners: "0",
        /**
         * Placeholder artwork supplied with the design.
         *
         * TODO(assets): swap for a real storybook panel before launch — this
         * is a stock illustration standing in for generated content, and it
         * shows a child's homework scene rather than the financial topic the
         * card is titled with.
         */
        image: {
          src: "/assets/images/magic/storybook-cover.webp",
          /**
           * Decorative: it is placeholder art inside a drawn product card,
           * and describing stand-in imagery would tell a screen-reader user
           * about the placeholder rather than the product.
           */
          alt: "",
          width: 900,
          height: 600,
        },
      },

      video: {
        tag: "LurnyFlix Video",
        /** The design shows the scrubber part-way through a short clip. */
        elapsed: "0:27",
        duration: "1:23",
        /** Fraction of the track filled, matching the times above. */
        progress: 0.33,
        /**
         * Placeholder clip supplied with the design.
         *
         * TODO(assets): swap for a real LurnyFlix sample before launch.
         *
         * Re-encoded from the 5MB source to 286KB at 960px — see the note in
         * MagicVideoCard for how it is played.
         */
        media: {
          src: "/assets/video/magic-demo.mp4",
          poster: "/assets/images/magic/video-poster.webp",
          width: 960,
          height: 540,
        },
      },

      practice: {
        tag: "Interactive Practice",
        title: "Fire Safety Steps Challenge",
        meta: "Drag Drop · Beginner",
        instruction:
          "Drag each action to the correct step in the fire safety approach.",
        /**
         * The five draggable steps. `tone` keys the chip colour in
         * MagicOutputs — the design gives each a different one.
         */
        steps: [
          { label: "Identify Hazards", tone: "violet" },
          { label: "People in Danger", tone: "blue" },
          { label: "Evaluate Risks", tone: "green" },
          { label: "Record Findings", tone: "amber" },
          { label: "Review & Revise", tone: "violet" },
        ],
      },
    },
  },

  /**
   * SECTION 2 — the problem LurnyMagic solves.
   *
   * Rendered by the shared ProblemSection (components/sections/shared), which
   * the LurnyPitch and LurnyPulse pages use too. `problem` is in the
   * ProblemContent shape that component expects.
   */
  problem: {
    eyebrow: "The problem Magic solves",

    /** Split so the lines break where the design breaks them on lg+. */
    headline: [
      "When knowledge is",
      "trapped in files, learning",
      "cannot move at the",
      "speed of work.",
    ] as const,

    description:
      "Teams have expertise, policies and updates everywhere—but turning them into useful, engaging learning is slow, expensive and difficult to scale.",

    items: [
      {
        title: "Content creation takes too long",
        description:
          "Subject-matter experts and L&D teams spend weeks converting source material into publishable learning.",
      },
      {
        title: "One source creates one format",
        description:
          "A document becomes a PDF course—rather than a video, story, quiz or practice experience for different learners.",
      },
      {
        title: "Knowledge becomes stale before it reaches people",
        description:
          "Product, policy and process updates move faster than traditional content-production cycles.",
      },
      {
        title: "Engagement is designed in after the fact",
        description:
          "Teams are left choosing between fast, basic content and rich experiences that people actually complete.",
      },
    ],
  },

  /**
   * SECTION 3 — one source, many ways to learn.
   *
   * A flow diagram: four input types on the left, LurnyMagic in the middle,
   * five output formats on the right, joined by curved connectors.
   *
   * The output cards are drawn, as elsewhere on this page, so these values are
   * the data they render from. The two placeholder images and the clip are
   * shared with the hero rather than duplicated — see the notes on each.
   */
  formats: {
    eyebrow: "One source. Many ways to learn.",
    headline: "Create once. Give every learner a way in.",
    description:
      "LurnyMagic turns trusted knowledge into the formats people are most likely to use, understand and remember.",
    footnote:
      "Publish in multiple languages. Adapt for every role. Update when knowledge changes.",

    /** The left column. `icon` keys the glyph in MagicFlowIcons. */
    inputs: {
      label: "Start with what you have",
      items: [
        { icon: "document", label: "Document" },
        { icon: "webpage", label: "Webpage" },
        { icon: "video", label: "Video" },
        { icon: "prompt", label: "Prompt" },
      ],
    },

    /** The centre node. */
    hub: { label: "LurnyMagic" },

    /**
     * The right column.
     *
     * The first four sit in a 2x2; SCORM spans the full width beneath them, as
     * the design lays it out — so it is described separately rather than as a
     * fifth grid item with a span flag.
     */
    outputs: {
      label: "Deliver in the formats learners love",

      /**
       * `kind` selects how MagicFormats renders the card's preview:
       * "image" draws a still, "video" the shared clip, "practice" the chip
       * row. Everything else about a card comes from the fields below.
       */
      items: [
        {
          kind: "image",
          label: "Microlesson",
          /**
           * Placeholder artwork.
           *
           * TODO(assets): swap for a real microlesson screenshot before
           * launch — the design shows the LurnyMagic editor here, not a stock
           * photograph.
           */
          image: {
            src: "/assets/images/magic/format-microlesson.webp",
            /** Decorative: placeholder art inside a drawn product card. */
            alt: "",
            width: 560,
            height: 315,
          },
        },
        {
          kind: "video",
          label: "AI Video",
          /** The same clip and poster as the hero — one download serves both. */
          media: {
            src: "/assets/video/magic-demo.mp4",
            poster: "/assets/images/magic/video-poster.webp",
            width: 960,
            height: 540,
          },
        },
        {
          kind: "image",
          label: "Storybook",
          /**
           * Placeholder artwork.
           *
           * TODO(assets): swap for a real storybook panel. The hero carries
           * the same note about its own placeholder.
           */
          image: {
            src: "/assets/images/magic/format-storybook.webp",
            alt: "",
            width: 560,
            height: 315,
          },
        },
        {
          kind: "practice",
          label: "Interactive practice",
          /** The drawn challenge inside the card. */
          preview: {
            title: "Fire Safety Steps Challenge",
            meta: "Drag Drop · Beginner",
            best: "Best 3m 38",
            instruction: "Drag each action to the correct approach.",
            /** `tone` keys the chip colour in MagicFormats. */
            steps: [
              { label: "Identify Hazards", tone: "violet" },
              { label: "People in Danger", tone: "blue" },
              { label: "Evaluate Risks", tone: "green" },
              { label: "Record Findings", tone: "amber" },
              { label: "Review & Revise", tone: "violet" },
            ],
          },
        },
      ],

      /** The wide card beneath the grid. */
      scorm: {
        label: "SCORM",
        title: "Safety Compliance Essentials",
        badge: "SCORM 1.2",
        meta: "Version 1.0 · Published",
        note: "Reusable. Trackable. LMS-ready.",
      },
    },
  },

  /**
   * SECTION 4 — more than content.
   *
   * Six experience types in a 3x2 grid. Every card is the same shape: a
   * preview panel on top, then title, description and an Explore link.
   *
   * `preview` selects WHAT MagicExperiences draws in that panel, and each
   * kind reads a different field below:
   *
   *   "image"     -> `image`, a still. Reused from the hero and section 3
   *                  rather than duplicated, so the page ships one copy.
   *   "video"     -> `media`, the shared clip.
   *   "challenge" -> `challenge`, the drag-drop board.
   *   "quiz"      -> `quiz`, the question card and its feedback panel.
   *   "quest"     -> `quest`, the hex path.
   *   "podcast"   -> `podcast`, the cover and player.
   *
   * The drawn kinds are DRAWINGS of the product, not screenshots — the same
   * choice sections 1 and 3 make, and for the same reason: a flat export
   * cannot re-flow, and its text would be an image at every zoom level.
   *
   * The Explore links all point at /demo for now. There are no per-format
   * pages yet, and a dead href is worse than an honest one.
   *
   * TODO(routes): point each at its own format page once those exist.
   */
  experiences: {
    eyebrow: "More than content",
    headline: "Make learning something people want to explore.",
    description:
      "Create rich, interactive experiences from the knowledge your business already trusts.",

    /** The per-card call to action, shared by all six. */
    action: { label: "Explore", href: "/demo" },

    items: [
      {
        preview: "image",
        title: "AI Storybooks",
        description: "Turn complex topics into memorable, visual narratives.",
        /**
         * The hero's storybook artwork, reused.
         *
         * TODO(assets): swap for a real storybook panel before launch — the
         * hero and section 3 carry the same note about this placeholder.
         */
        image: {
          src: "/assets/images/magic/format-storybook.webp",
          /** Decorative: placeholder art inside a drawn product card. */
          alt: "",
          width: 560,
          height: 315,
        },
      },

      {
        preview: "video",
        title: "LurnyFlix Video",
        description: "Create polished, role-relevant video learning at speed.",
        /** The same clip and poster as the hero — one download serves all. */
        media: {
          src: "/assets/video/magic-demo.mp4",
          poster: "/assets/images/magic/video-poster.webp",
          width: 960,
          height: 540,
        },
      },

      {
        preview: "challenge",
        title: "Interactive Challenges",
        description:
          "Let learners apply knowledge through meaningful practice.",
        /**
         * The drag-drop board. The same Fire Safety scenario section 3 shows
         * in miniature, drawn at full size here: an item pool on the left and
         * five numbered drop targets across two columns.
         */
        challenge: {
          title: "Fire Safety Steps Challenge",
          meta: "Drag Drop · Beginner",
          best: "Best: 3m 31s",
          xp: "+12 XP",
          instruction:
            "Drag each action to the correct step in the fire safety approach.",
          pool: {
            title: "Item Pool",
            hint: "Drag items to categories",
            items: [
              "Locate potential fire sources like flammable liquids.",
              "Check if exits are accessible and adequate.",
              "Keep the fire safety assessment under continuous review.",
              "Find out who could be in danger if a fire starts.",
            ],
          },
          /** `tone` keys the chip colour in MagicExperiences. */
          steps: [
            { label: "Step 1: Identify Hazards", tone: "violet" },
            { label: "Step 2: People in Danger", tone: "blue" },
            { label: "Step 3: Evaluate Risks", tone: "green" },
            { label: "Step 4: Record Findings", tone: "amber" },
            { label: "Step 5: Review & Revise", tone: "violet" },
          ],
          /** Repeated under every drop target. */
          dropHint: "Drop items here...",
        },
      },

      {
        preview: "quiz",
        title: "Quizzes & Assessments",
        description:
          "Check understanding with intelligent, adaptive questions.",
        quiz: {
          progress: { label: "Question 2 of 5", value: 2, total: 5 },
          question:
            "Which of the following is the first step in a fire safety assessment?",
          /** Exactly one option is `selected`, as the design shows. */
          options: [
            { label: "Evaluate risks", selected: false },
            { label: "Identify hazards", selected: true },
            { label: "Record findings", selected: false },
            { label: "Review and revise", selected: false },
          ],
          feedback: {
            title: "Great choice!",
            body: "You've selected the correct answer.",
          },
        },
      },

      {
        preview: "quest",
        title: "Quests & Gamified Paths",
        description: "Make progress visible, rewarding and worth returning to.",
        quest: {
          title: "Choose Your Path",
          stats: [
            { label: "0 / 5 Completed", tone: "violet" },
            { label: "25 XP Earned", tone: "amber" },
          ],
          /**
           * The five nodes on the path. `state` drives the hex's appearance:
           * "current" is the lit violet one, "open" is unlocked but not
           * started, "locked" draws a padlock instead of stars.
           */
          nodes: [
            { state: "current", stars: 3 },
            { state: "open", stars: 3 },
            { state: "locked", stars: 0 },
            { state: "open", stars: 3 },
            { state: "locked", stars: 0 },
          ],
          tip: "Keep going! Each step brings you closer to mastery.",
        },
      },

      {
        preview: "podcast",
        title: "Podcasts & Voice Learning",
        description: "Make knowledge easy to absorb wherever work happens.",
        podcast: {
          /**
           * The cover art. The title is SPLIT because the design sets the two
           * lines differently — "VOICES" larger and heavier than "THAT TEACH"
           * — which one string could not express.
           */
          cover: {
            title: { lead: "Voices", tail: "That Teach" },
            show: "LurnyMagic Podcast",
          },
          episode: {
            title: "Leading with Clarity in Uncertain Times",
            meta: "Episode 12 · 18 min",
            elapsed: "06:42",
            duration: "18:00",
            /** Fraction of the track filled, matching the times above. */
            progress: 0.37,
            skip: "15",
          },
        },
      },
    ],
  },

  /**
   * SECTION 5 — from one moment to a complete path.
   *
   * Four levels of structure, drawn as product cards that STEP UPWARD from
   * left to right, joined by a rising amber line: a microcourse, a playlist,
   * a course library, then a full role-based journey.
   *
   * `lift` is how far up the card sits, as a fraction of the tallest card's
   * rise — it drives both the card's offset and where the connector's node
   * dot lands, so the two can never drift apart.
   *
   * Every card's inner panel is DRAWN from the fields below, as everywhere
   * else on this page. The thumbnails are the shared placeholder still;
   * `card-placeholder.jpg` already ships for exactly this purpose.
   *
   * TODO(assets): swap the thumbnails for real course artwork before launch.
   */
  journeys: {
    eyebrow: "From one moment to a complete path",

    /**
     * Split at the emphasised word, which the design sets in italic — one
     * string could not carry that.
     */
    headline: {
      lead: "Build learning around how people",
      emphasis: "actually",
      tail: "grow.",
    },

    description:
      "Create a quick microcourse, curate a playlist, build a structured course or map an end-to-end learning journey—all from the same trusted knowledge.",

    footnote:
      "Create the right level of structure—without recreating the content.",

    /** The shared placeholder thumbnail, used by every drawn row and tile. */
    thumbnail: {
      src: "/assets/images/card-placeholder.jpg",
      /** Decorative: placeholder art inside a drawn product card. */
      alt: "",
      width: 320,
      height: 320,
    },

    /**
     * The four cards, in ascending order.
     *
     * `kind` selects the panel MagicJourneys draws:
     *   "list"    -> `tabs` + `rows`, the microcourse list
     *   "queue"   -> `tabs` + `rows`, the playlist queue
     *   "grid"    -> `tabs` + `tiles`, the 2x2 course library
     *   "journey" -> `journey`, the role header and skill radar
     */
    items: [
      {
        kind: "list",
        icon: "spark",
        title: "Microcourses",
        description: "A focused moment of learning",
        /** Sits on the ground line; the others climb from here. */
        lift: 0,
        tabs: [
          { label: "Microlessons", count: "1.7k", icon: "book" },
          { label: "Quizzes", count: "195", icon: "quiz" },
        ],
        rows: [
          {
            title: "Introduction to Static Equipment Design",
            modules: "1 module",
            status: "Incomplete",
          },
          {
            title: "Nura GRE Foundation Certification Course",
            modules: "1 module",
            status: "Incomplete",
          },
          {
            title: "Foundations of Trade Finance: Concepts and…",
            modules: "10 modules",
            status: "Incomplete",
          },
        ],
      },

      {
        kind: "queue",
        icon: "list",
        title: "Playlists",
        description: "Curated learning for a need",
        lift: 0.33,
        tabs: [{ label: "Playlists", count: "17", icon: "queue" }],
        rows: [
          { title: "Project Management Essentials", modules: "8 modules" },
          { title: "Communication Mastery", modules: "6 modules" },
          { title: "Data & Analytics Fundamentals", modules: "7 modules" },
        ],
      },

      {
        kind: "grid",
        icon: "book",
        title: "Courses",
        description: "Structured, modular development",
        lift: 0.66,
        tabs: [
          { label: "Courses", count: "43", icon: "layers" },
          { label: "Modules", count: "25", icon: "layers" },
        ],
        tiles: [
          {
            title: "Foundations of Project Management in Construction",
            modules: "10 modules",
            status: "Incomplete",
          },
          {
            title: "Mastering ISA Compliance and Auditing Excellence",
            modules: "10 modules",
            status: "Incomplete",
          },
          {
            title: "Client Communication Simplified",
            modules: "10 modules",
            status: "Incomplete",
          },
          {
            title: "Kia Experience Consultant Mastery Program",
            modules: "2 modules",
            status: "Incomplete",
          },
        ],
      },

      {
        kind: "journey",
        icon: "map",
        title: "Learning Journeys",
        description: "Role-based growth over time",
        /** The tallest card, and the one the connector line ends above. */
        lift: 1,
        journey: {
          back: "Back to Journeys",
          /** Split so the role half can take the design's violet-pink wash. */
          role: { lead: "Project Coordinator -", tail: "Junior Role" },
          objective:
            "Journey Objective To build a junior project coordinator into a structured, dependable, and delivery-oriented professional who can support planning, coordinate tasks, communicate with stakeholders, and contribute to successful project outcomes.",
          progress: { label: "Overall Progress", value: "0%", fraction: 0 },
          xp: "XP: 0 / 500",
          /** `icon` keys the glyph in MagicJourneyIcons. */
          facts: [
            { icon: "goal", label: "Goal: Upskill" },
            { icon: "role", label: "Role: Project Coordinator - Junior Role" },
            { icon: "department", label: "Department: General" },
            { icon: "time", label: "Estimated Time: 10 hours" },
          ],
          skillMap: {
            title: "Skill Map",
            updated: "Updated May 4",
            action: "Refresh",
            /** The centre score, and the unit beneath it. */
            score: { value: "6.8", unit: "avg" },
            /**
             * The eight radar axes, clockwise from the top. `value` is out of
             * `max` and drives both the label and the polygon's vertex.
             */
            axes: [
              { label: "Project Coordination", value: 8 },
              { label: "Communication", value: 8 },
              { label: "Scope Definition", value: 7 },
              { label: "Risk Management", value: 7 },
              { label: "Resource Allocation", value: 6 },
              { label: "Resource Allocation", value: 6 },
              { label: "Quality Control", value: 6 },
              { label: "Meeting Facilitation", value: 8 },
            ],
            max: 10,
          },
        },
      },
    ],
  },
} as const;
