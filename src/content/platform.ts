/**
 * PLATFORM HOMEPAGE CONTENT
 * ---------------------------------------------------------------------------
 * Copy for the platform overview at /platform.
 *
 * Section 1 is defined below; further sections are added here as their designs
 * land. Copy is verbatim from "left-side-text.txt".
 */

export const platform = {
  /** Page-level metadata, consumed by the route's `metadata` export. */
  meta: {
    title: "The Lurny Platform",
    description:
      "Understand what your people need, create the right learning, support them in the moment and use performance insights to guide what comes next—all through one connected platform.",
    path: "/platform",
  },

  hero: {
    eyebrow: "The Lurny platform",

    /**
     * Three lines. The design sets the last in violet, so the headline is
     * split rather than carrying markup in the copy — `accent` marks which
     * line takes the brand colour.
     */
    headline: [
      { text: "Build capability." },
      { text: "Bring it to work." },
      { text: "Turn it into performance.", accent: true },
    ],

    /**
     * The design bolds "need" mid-sentence, so the description is split
     * around it rather than carrying markup in the string.
     */
    description: {
      before: "Understand what your people ",
      strong: "need",
      after:
        ", create the right learning, support them in the moment and use performance insights to guide what comes next—all through one connected platform.",
    },

    actions: {
      primary: { label: "Book a Demo", href: "/demo" },
      secondary: { label: "Explore the Engines", href: "#engines" },
    },

    /** The three capabilities under the actions, each with a drawn glyph. */
    meta: [
      { icon: "learn", label: "Learn" },
      { icon: "apply", label: "Apply" },
      { icon: "improve", label: "Improve" },
    ],

    /**
     * The backdrop. Ships as the supplied render: it is a textless lavender
     * wash with a soft ring, which is exactly what a background raster should
     * be, so there is nothing in it to rebuild.
     */
    backdrop: {
      src: "/assets/images/platform/hero-backdrop.webp",
      alt: "",
      width: 1672,
      height: 941,
    },

    /**
     * THE FIVE PRODUCT CARDS, and the profile they orbit.
     *
     * The design ships each as a PNG with its interface text baked in. They
     * are REBUILT IN MARKUP here, as every other product mockup on this site
     * is — see SenseDashboard, ChatDashboard, PulseDashboard. Rebuilt they
     * stay sharp at any density, cost a fraction of the 750KB the five
     * rasters weigh, and can arrive and respond to a pointer as individual
     * cards rather than one flat picture.
     *
     * They are DECORATIVE: pictures of the product, not live views. The
     * section's argument is carried by the copy beside them, so the whole
     * cluster is hidden from assistive tech rather than announcing forty
     * fragments of mock UI, and every control in it is inert.
     *
     * `position` places each card as a percentage of the cluster's own box,
     * so they hold their arrangement — and the threads between them stay
     * attached — at any width.
     */
    cluster: {
      /** The person at the centre, whom the four cards describe. */
      profile: {
        initials: "AM",
        name: "Ananya Menon",
        role: "Frontline advisor",
        chip: "My growth path",
      },

      cards: [
        {
          id: "readiness",
          eyebrow: "Know the gap",
          title: "Role readiness",
          icon: "chart",
          kind: "radar",
          /** The two rings' vertices, as proportions of the plot radius. */
          radar: {
            current: [0.62, 0.55, 0.7, 0.58, 0.5],
            target: [0.88, 0.82, 0.9, 0.86, 0.8],
            legend: [
              { label: "Current", tone: "violet" },
              { label: "Target", tone: "amber" },
            ],
          },
          footer: { icon: "message", label: "Customer conversations" },
        },
        {
          id: "learning",
          eyebrow: "Build readiness",
          title: "Your next learning step",
          icon: "cap",
          kind: "media",
          media: { caption: "Ask better questions" },
          chip: { icon: "star", label: "Recommended for you" },
        },
        {
          id: "ask",
          eyebrow: "Support the moment",
          title: "Ask Lurny",
          icon: "message",
          kind: "chat",
          turns: [
            {
              icon: "person",
              text: "Which option fits this customer?",
              tone: "ask",
            },
            {
              icon: "sparkle",
              text: "Here are the key points to explain.",
              tone: "reply",
            },
          ],
          footer: { icon: "document", label: "Product knowledge" },
        },
        {
          id: "feedback",
          eyebrow: "Improve performance",
          title: "Conversation feedback",
          icon: "chart",
          kind: "feedback",
          rows: [
            { tone: "pass", text: "Clear product explanation" },
            { tone: "warn", text: "Explore the customer’s needs" },
          ],
          action: "View next step",
        },
      ],
    },
  },

  /**
   * SECTION 2 — the challenge.
   *
   * A photograph on the left, the problem stated on the right, and a band
   * across the foot. Copy is verbatim from
   * "04-right-side-and-footer-text.txt".
   */
  challenge: {
    eyebrow: "The challenge",

    /**
     * Three lines, the last in violet. Split so the design's line breaks are
     * the content's rather than a wrapping accident.
     */
    headline: [
      { text: "Your people\u2019s growth" },
      { text: "shouldn\u2019t stop at" },
      { text: "the edge of a tool.", accent: true },
    ],

    description:
      "Learning, knowledge and performance often live in separate systems. Your people are left to connect the dots.",

    /**
     * The three problems, each behind a ringed disc. `icon` names the drawing
     * in PlatformChallengeIcons — the supplied PNGs are ~240KB each and carry
     * no text, so they are drawn rather than shipped.
     */
    problems: [
      {
        icon: "direction",
        title: "Learning without direction",
        description:
          "Content is assigned without a clear view of capability gaps.",
      },
      {
        icon: "knowledge",
        title: "Knowledge out of reach",
        description: "The right answer is hard to find when work demands it.",
      },
      {
        icon: "followThrough",
        title: "Performance without follow-through",
        description:
          "Feedback rarely becomes a focused learning or coaching action.",
      },
    ],

    /**
     * The band across the foot. Its two lines, and the link mark and arrow
     * that flank them.
     *
     * The design ships this as a 2077x227 raster with the disc and the arrow
     * baked in. It is rebuilt in markup: a band that wide at a fixed aspect
     * cannot stretch to another viewport without squashing both of them, and
     * rebuilt it also lets the arrow answer a pointer.
     */
    band: {
      lines: [
        "Connect what people need to learn",
        "with what they need to do.",
      ],
      /** Where the arrow goes. The cycle is the section that answers this. */
      href: "#cycle",
      /** Read by assistive tech in place of the drawn arrow. */
      label: "See how the platform connects them",
    },

    /**
     * The photograph. Decorative: two colleagues at a desk, which the copy
     * beside it already describes, so it announces nothing. The wall text in
     * the scene ("People Learn Perform Together") is set dressing inside the
     * photograph rather than content.
     */
    people: {
      src: "/assets/images/platform/challenge-people.webp",
      alt: "",
      width: 1254,
      height: 1254,
    },

    /** The dark violet wash behind the copy. Textless, so it ships as-is. */
    backdrop: {
      src: "/assets/images/platform/challenge-backdrop.webp",
      alt: "",
      width: 1672,
      height: 941,
    },
  },

  /**
   * SECTION 3 — how the platform works.
   *
   * Six stages in a ring, joined by curved arrows, with the copy on the left
   * and a statement at the centre. Copy is verbatim from
   * "left-and-centre-text.txt".
   *
   * THE SIX CARDS ARE REBUILT IN MARKUP, as the hero's are and for the same
   * reason: the design ships them as PNGs with their interface text baked in
   * (~810KB together), and rebuilt they stay sharp, cost a fraction of that,
   * and can arrive one at a time.
   */
  cycle: {
    eyebrow: "How the platform works",

    /** Three lines, the last two in violet as the design sets them. */
    headline: [
      { text: "Every step connects." },
      { text: "Every cycle builds", accent: true },
      { text: "capability.", accent: true },
    ],

    description:
      "Set clear role expectations, identify individual gaps and connect targeted learning with practice, workplace support and performance feedback.",

    /** The note on its own tinted panel, under the copy. */
    note: {
      lines: [
        "Role expectations stay the reference.",
        "Evidence reveals what to work on next.",
      ],
    },

    /** The statement at the centre of the ring. */
    centre: {
      lines: ["Evidence guides", "the next step."],
      pill: "Reassess capability",
    },

    /**
     * The six stages, clockwise from the top. `engines` names the products
     * each stage runs on, which the design prints at the card's foot.
     *
     * `accent` marks the one card the design tops with a gold rule — the
     * first, where the cycle begins.
     */
    steps: [
      {
        id: "define",
        number: "01",
        icon: "target",
        title: "Define expectations",
        description: "Set the standard for each role.",
        engines: ["LurnyPulse"],
        accent: true,
      },
      {
        id: "identify",
        number: "02",
        icon: "search",
        title: "Identify gaps",
        description: "Assess capability against role expectations.",
        engines: ["LurnyPulse"],
      },
      {
        id: "create",
        number: "03",
        icon: "create",
        title: "Create targeted learning",
        description: "Build content and video around the gaps.",
        engines: ["LurnyMagic", "LurnyFlix"],
      },
      {
        id: "deliver",
        number: "04",
        icon: "journey",
        title: "Deliver and reinforce",
        description: "Bring learning into personalised journeys.",
        engines: ["Lurny KxP"],
      },
      {
        id: "practise",
        number: "05",
        icon: "practise",
        title: "Practise and apply",
        description: "Rehearse situations. Get guidance at work.",
        engines: ["LurnySim", "LurnyChat"],
      },
      {
        id: "measure",
        number: "06",
        icon: "measure",
        title: "Measure and improve",
        description: "Use conversation evidence to guide progress.",
        engines: ["LurnyPitch", "LurnyPulse"],
      },
    ],

    /** The lavender wash, shared with the hero. Textless, so it ships as-is. */
    backdrop: {
      src: "/assets/images/platform/hero-backdrop.webp",
      alt: "",
      width: 1672,
      height: 941,
    },
  },

  /**
   * SECTION 4 — the engine explorer.
   *
   * Three tabs of four engines each, the copy on the right, and the Fabric
   * band across the foot. Copy is verbatim from
   * "screen-text-outside-engine-cards.txt" and from the twelve card renders.
   *
   * THE TWELVE CARDS ARE REBUILT IN MARKUP, as every other product mockup on
   * this site is: the design ships them as ~190KB PNGs each (~2.3MB together)
   * with their copy baked in. Rebuilt they stay sharp, cost a fraction of
   * that, and — unlike a raster — each becomes a real link to its own page.
   *
   * ELEVEN OF THE TWELVE HAVE A PAGE; LurnySim does not exist as a route yet,
   * so its card carries no link rather than a dead one. See `href`.
   */
  engines: {
    eyebrow: "Explore the engines",

    /** Four lines, the last two in lilac as the design sets them. */
    headline: [
      { text: "Start with" },
      { text: "what you need." },
      { text: "Connect what", accent: true },
      { text: "comes next.", accent: true },
    ],

    description:
      "Choose the capabilities that address your priorities today, and expand your platform as your organisation\u2019s needs grow.",

    /** The label pattern on each card's link. {0} is the engine's name. */
    exploreLabel: "Explore {0}",

    /**
     * The three groups. `id` is the tab's value; the cards under each are the
     * four the design puts on that tab, in its order.
     *
     * `icon` names the drawing in PlatformEngineIcons — each is the comp's own
     * two-colour glyph, violet for the subject and amber for the accent.
     */
    groups: [
      {
        id: "build",
        label: "Build capability",
        cards: [
          {
            name: "LurnyPulse",
            icon: "pulse",
            description:
              "Understand role readiness. Focus development where it matters.",
            href: "/platform/pulse",
          },
          {
            name: "LurnyMagic",
            icon: "magic",
            description: "Turn your knowledge into engaging learning content.",
            href: "/platform/magic",
          },
          {
            name: "LurnyFlix",
            icon: "flix",
            description:
              "Create AI videos and interactive learning experiences.",
            href: "/platform/flix",
          },
          {
            name: "Lurny KxP",
            icon: "kxp",
            description:
              "Deliver personalised learning journeys and track progress.",
            href: "/platform/kxp",
          },
        ],
      },
      {
        id: "perform",
        label: "Enable performance",
        cards: [
          {
            name: "LurnySim",
            icon: "sim",
            description:
              "Build confidence through realistic role-play and practice.",
            /* No route yet — the card carries no link rather than a dead one. */
          },
          {
            name: "LurnyPitch",
            icon: "pitch",
            description:
              "Turn customer conversations into feedback, coaching and improvement.",
            href: "/platform/pitch",
          },
          {
            name: "LurnyChat",
            icon: "chat",
            description:
              "Give people trusted answers and guidance in the flow of work.",
            href: "/platform/chat",
          },
          {
            name: "LurnyEvents",
            icon: "events",
            description:
              "Plan, deliver and track instructor-led learning in one place.",
            href: "/platform/events",
          },
        ],
      },
      {
        id: "flow",
        label: "Work in the flow",
        cards: [
          {
            name: "LurnySaathi",
            icon: "saathi",
            description:
              "Bring learning, practice and guidance into one mobile companion.",
            href: "/platform/saathi",
          },
          {
            name: "LurnyBiz",
            icon: "biz",
            description:
              "Turn CRM insights into clear next actions for your teams.",
            href: "/platform/biz",
          },
          {
            name: "LurnySense",
            icon: "sense",
            description:
              "Ask questions of your data. Get insights that guide decisions.",
            href: "/platform/sense",
          },
          {
            name: "LurnyNotes",
            icon: "notes",
            description:
              "Turn meetings into learning, shared knowledge and grounded email drafts.",
            href: "/platform/notes",
          },
        ],
      },
    ],

    /**
     * The band across the foot. The design ships it as a 1548x164 raster with
     * its disc baked in; it is rebuilt for the same reason section 2's band
     * was — a fixed-aspect strip cannot stretch to another viewport without
     * squashing what is inside it.
     */
    fabric: {
      title: "Connected by LurnyFabric",
      description:
        "Shared identity, integrations, context and governance across your enabled engines.",
      action: { label: "Explore LurnyFabric", href: "/platform/fabric" },
    },

    /** The slate-purple wash. Textless, so it ships as-is. */
    backdrop: {
      src: "/assets/images/platform/engines-backdrop.webp",
      alt: "",
      width: 1605,
      height: 980,
    },
  },

  /**
   * SECTION 5 — find your starting point.
   *
   * Three challenges on the left; picking one plays its conversation into the
   * panel on the right and ends on the engines it suggests.
   *
   * COPY PROVENANCE — READ BEFORE EDITING.
   *
   * The design supplies NO text file for this section, so everything here is
   * transcribed from the comp. The comp shows ONE challenge played out:
   * "Improve frontline performance", ending on LurnySim and LurnyPitch. Its
   * every line — the two user turns, the assistant's question, the flow note
   * and the CTA — is verbatim from the render.
   *
   * The other two challenges are `drafted: true`. Their rows and icons are the
   * comp's, but their conversations and suggested engines were WRITTEN to
   * match, because no source supplies them. They are written in the comp's
   * voice and point at engines that genuinely fit, but they are not approved
   * copy — they need sign-off before launch, and the flag is here so that is
   * not forgotten.
   */
  starting: {
    eyebrow: "Find your Lurny starting point",

    /** Two lines, the second in violet as the design sets it. */
    headline: [
      { text: "Your challenge." },
      { text: "Your starting point.", accent: true },
    ],

    description:
      "Tell us what your teams are struggling with. We\u2019ll help you find the right capabilities to move forward.",

    listLabel: "Start with a challenge",

    /** The reassurance under the three rows. */
    note: "Explore your options before sharing contact details.",

    /** The panel's own chrome. */
    panel: {
      title: "Let\u2019s find what fits.",
      subtitle: "Example conversation",
      reset: "Start again",
      /**
       * The composer is shown because the design shows it, but it is
       * DISABLED: nothing here is wired to a model, and a box that accepts
       * typing would promise a reply this page cannot give.
       */
      composer: {
        placeholder: "Tell us more about your challenge\u2026",
        note: "This is an example conversation.",
      },
    },

    suggestionLabel: "Your suggested starting point",

    /** The three challenges. `conversation` plays when the row is chosen. */
    challenges: [
      {
        id: "frontline",
        icon: "people",
        title: "Improve frontline performance",
        /* Verbatim from the comp. */
        conversation: [
          {
            from: "user",
            text: "Our salespeople finish training but struggle in customer conversations.",
          },
          {
            from: "assistant",
            text: "What would help most: product knowledge, practice, or feedback on actual calls?",
          },
          { from: "user", text: "Practice and feedback." },
        ],
        suggestions: [
          {
            name: "LurnySim",
            icon: "sim",
            description: "Practise realistic customer conversations.",
          },
          {
            name: "LurnyPitch",
            icon: "pitch",
            description: "Turn actual calls into focused coaching.",
          },
        ],
        flow: "Practise \u2192 Apply \u2192 Get feedback",
      },
      {
        id: "onboarding",
        icon: "cap",
        title: "Help new hires become productive",
        /* DRAFTED — see the note at the top of this block. */
        drafted: true,
        conversation: [
          {
            from: "user",
            text: "New hires take months to reach full productivity in their role.",
          },
          {
            from: "assistant",
            text: "Where does it slow down: knowing what is expected, finding the right learning, or applying it at work?",
          },
          { from: "user", text: "Knowing what is expected, then applying it." },
        ],
        suggestions: [
          {
            name: "Lurny KxP",
            icon: "kxp",
            description: "Deliver a personalised onboarding journey.",
          },
          {
            name: "LurnySaathi",
            icon: "saathi",
            description: "Guide new hires in the flow of work.",
          },
        ],
        flow: "Define \u2192 Learn \u2192 Apply",
      },
      {
        id: "knowledge",
        icon: "find",
        title: "Make knowledge easier to find",
        /* DRAFTED — see the note at the top of this block. */
        drafted: true,
        conversation: [
          {
            from: "user",
            text: "Our teams cannot find the right answer when a customer is waiting.",
          },
          {
            from: "assistant",
            text: "Is the answer missing, scattered across systems, or hard to trust when it is found?",
          },
          { from: "user", text: "Scattered, and hard to trust." },
        ],
        suggestions: [
          {
            name: "LurnyChat",
            icon: "chat",
            description: "Give trusted answers in the moment.",
          },
          {
            name: "LurnyNotes",
            icon: "notes",
            description: "Turn what teams know into shared knowledge.",
          },
        ],
        flow: "Ask \u2192 Answer \u2192 Reuse",
      },
    ],

    action: { label: "Discuss this with our team", href: "/demo" },
  },
} as const;
