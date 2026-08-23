/**
 * LURNYPITCH PAGE CONTENT
 * ---------------------------------------------------------------------------
 * Copy for the LurnyPitch product page at /platform/pitch.
 *
 * Sections 1 through 5 are defined below, in page order; further sections are
 * added here as their designs land.
 */

export const pitch = {
  /** Page-level metadata, consumed by the route's `generateMetadata`. */
  meta: {
    title: "LurnyPitch — Conversation Intelligence",
    description:
      "LurnyPitch analyses real sales and service conversations to show what worked, what was missed, and where every frontline employee needs coaching.",
    path: "/platform/pitch",
  },

  hero: {
    /**
     * The eyebrow is one string with a separator the design sets in violet.
     * Split so the bullet can be styled and hidden from screen readers, which
     * would otherwise announce it as "bullet".
     */
    eyebrow: { product: "LurnyPitch", label: "Conversation intelligence" },

    /** Split so the line breaks land where the design puts them on lg+. */
    headline: [
      "Listen to every",
      "customer conversation.",
      "Improve the next one.",
    ] as const,

    description:
      "LurnyPitch analyses real sales and service conversations to show what worked, what was missed, and where every frontline employee needs coaching.",

    actions: {
      primary: { label: "Request a Pitch Pilot", href: "/demo" },
      secondary: { label: "Talk to Sales", href: "/contact" },
    },

    footnote: "Built for sales, service and frontline leadership teams.",

    /**
     * The product shot: one image containing BOTH the laptop dashboard and
     * the phone, already composed and overlapping as the design shows. It is
     * deliberately a single asset rather than two — the overlap and the
     * relative scale are baked in, and reproducing them with two positioned
     * images would drift at any viewport the design was not measured at.
     *
     * PROVENANCE: derived from designs/.../screenshot.png, which despite its
     * description had NO alpha channel — its "transparent" background was an
     * opaque checkerboard placeholder. It was re-keyed to real transparency
     * and cropped to the devices. The soft violet glow in the source could not
     * be preserved: it was blended over that checkerboard, so its pixels carry
     * the pattern and cannot be separated. The hero draws its own glow behind
     * this image instead, which is why one exists in PitchHero.
     *
     * TODO(assets): request a genuine transparent export at 2x. This file is
     * 1196px wide, sharp enough at the rendered size but with no retina
     * headroom, and a real export would restore the designed glow.
     */
    image: {
      src: "/assets/images/pitch/pitch-app.webp",
      /**
       * Describes what the shot SHOWS, not that it is a screenshot — the
       * surrounding copy already establishes that this is the product.
       */
      alt: "The LurnyPitch leadership dashboard on a laptop, showing organisation-wide pitch dimension scores, beside the mobile app listing recent conversations.",
      width: 1196,
      height: 867,
    },
  },

  /**
   * SECTION 2 — the problem.
   *
   * A statement on the left, four numbered problems on the right. The list is
   * ordered: the numerals are content, not decoration, so it renders as an
   * <ol> and the numbers come from the data rather than a CSS counter.
   */
  problem: {
    eyebrow: "The problem LurnyPitch solves",

    /** Split so the lines break where the design breaks them on lg+. */
    headline: [
      "When customer",
      "conversations stay invisible,",
      "frontline performance is",
      "left to chance.",
    ] as const,

    description:
      "Teams invest in product training and coaching, but without visibility into real conversations, leaders cannot see what customers hear, what employees miss or where intervention is needed.",

    items: [
      {
        title: "Managers cannot listen at scale",
        description:
          "Only a fraction of customer conversations are reviewed. The rest carry unseen experience, quality and revenue risk.",
      },
      {
        title: "Coaching arrives too late",
        description:
          "Feedback is based on recall, results or complaints, rather than on what actually happened in the conversation.",
      },
      {
        title: "Missed opportunities stay hidden",
        description:
          "Cross-sell cues, objections and compliance gaps are missed before leaders have a chance to intervene.",
      },
      {
        title: "Training has no proof of application",
        description:
          "Completion tells you who learnt. It does not show whether they applied it in live customer conversations.",
      },
    ],
  },

  /**
   * SECTION 3 — from conversation to action.
   *
   * A dark section: copy and the product shot up top, three numbered steps
   * across the foot, then a call to action.
   */
  missed: {
    eyebrow: "From conversation to action",

    /** Split so the lines break where the design breaks them on lg+. */
    headline: [
      "Every missed",
      "opportunity leaves",
      "a trail. LurnyPitch",
      "helps you act on it.",
    ] as const,

    description:
      "LurnyPitch detects the moments where a customer need, product cue or cross-sell opportunity was present—but not pursued. Leaders can see the value at risk, isolate the capability gap and turn insight into targeted coaching.",

    steps: [
      {
        title: "Spot the missed moment",
        description:
          "Identify when a customer cue, objection or product need was not explored.",
      },
      {
        title: "See what is at stake",
        description:
          "Track estimated revenue at risk by product, branch and representative.",
      },
      {
        title: "Close the loop",
        description:
          "Send the employee to the right product knowledge, simulation or coaching action—then measure improvement in the next conversations.",
      },
    ],

    action: { label: "Explore missed opportunities", href: "/demo" },

    /**
     * The dashboard shot showing missed cross-sell opportunities and the
     * revenue attributed to them.
     *
     * Unlike the other two images on this page, the supplied file had a REAL
     * alpha channel, so this one only needed cropping to its alpha bounds —
     * no keying, and nothing was lost.
     */
    image: {
      src: "/assets/images/pitch/pitch-missed.webp",
      alt: "The LurnyPitch leadership dashboard showing missed cross-sell opportunities, the estimated revenue left on the table, and breakdowns by branch, product and representative.",
      width: 1539,
      height: 865,
    },
  },

  /**
   * SECTION 4 — conversation intelligence for better coaching.
   *
   * Copy and a three-step list on the left, the composed product image on the
   * right. The steps are ordered, so they render as an <ol> with the numerals
   * coming from the data.
   */
  coaching: {
    eyebrow: "Conversation intelligence for better coaching",

    /** Split so the lines break where the design breaks them on lg+. */
    headline: [
      "See the strengths behind",
      "the score. Coach the gaps",
      "before they grow.",
    ] as const,

    description:
      "LurnyPitch gives team leaders a clear view of how every representative performs across the conversations that matter. They can recognise what is working, identify the specific skill that needs attention and create learning interventions that fit the individual and the team.",

    steps: [
      {
        title: "Understand the team",
        description:
          "See performance patterns by representative, branch, product and pitch dimension.",
      },
      {
        title: "Focus the intervention",
        description:
          "Turn a weak area such as discovery, product knowledge or objection handling into a targeted next action.",
      },
      {
        title: "Measure the change",
        description:
          "Track whether coaching improves the quality of the next customer conversations.",
      },
    ],

    /**
     * The composed shot: a team leader looking at the LurnyPitch leadership
     * dashboard on a large screen.
     *
     * PROVENANCE: same story as the hero image — the supplied file had NO
     * alpha channel, its "transparent" background being an opaque checkerboard
     * placeholder. It was re-keyed and cropped.
     *
     * The violet glow beneath the screen could not be kept: the checkerboard
     * sat UNDER it, so those pixels are a blend of pattern and glow that
     * cannot be separated, and the band was cleared rather than left showing.
     * The decorative arcs and the screen's own edge lighting survive.
     *
     * TODO(assets): request a genuine transparent export at 2x. That would
     * restore the glow and give retina headroom — this file is 1129px wide.
     */
    image: {
      src: "/assets/images/pitch/pitch-coaching.webp",
      alt: "A team leader considering the LurnyPitch leadership dashboard on a large display, showing pitch dimension scores and recommended coaching actions.",
      width: 1129,
      height: 872,
    },
  },

  /**
   * SECTION 5 — coach with evidence, not recall.
   *
   * A dark violet-black section: copy and three numbered steps on the left,
   * the mobile app screens on the right.
   */
  evidence: {
    eyebrow: "Coach with evidence, not recall",

    /** Split so the lines break where the design breaks them on lg+. */
    headline: ["Every conversation", "becomes a coaching", "moment."] as const,

    description:
      "LurnyPitch turns the call an employee had into a clear, constructive next step. Managers can see the conversation, recognise what worked and address the precise behaviour that needs to change.",

    /**
     * These are titles only — the design gives them no body copy, just a
     * numeral, a divider rule and the label.
     */
    steps: [
      "Review what happened",
      "Give feedback that is specific",
      "Build a better next conversation",
    ],

    footnote: "From conversation evidence to measurable improvement.",

    /**
     * The two mobile screens, already composed and overlapping.
     *
     * Unlike the other images on this page this one needed no keying: its
     * background is the section's own near-black with the violet glow and arc
     * flourishes baked in, so it is cropped and sits directly on the matching
     * ground. Stored as WebP rather than PNG — the soft gradient background
     * compresses terribly in PNG (1.15MB versus 86KB for the same pixels).
     */
    image: {
      src: "/assets/images/pitch/pitch-mobile.webp",
      alt: "Two LurnyPitch mobile screens: the home screen listing recent conversations, and a coaching summary giving a representative feedback and experience points.",
      width: 1120,
      height: 939,
    },
  },

  /**
   * SECTION 6 — book a demo.
   *
   * The closing conversion section. `form` is in the shape the shared LeadForm
   * expects (see LeadFormContent in components/ui/LeadForm.tsx), so this page
   * gets the same fields, validation and success state as the homepage while
   * speaking in LurnyPitch's own terms.
   */
  demo: {
    eyebrow: "Book a LurnyPitch demo",

    /** Split so the lines break where the design breaks them on lg+. */
    headline: [
      "Turn every customer",
      "conversation into a",
      "performance",
      "advantage.",
    ] as const,

    description:
      "See how LurnyPitch helps your teams capture conversations, uncover missed opportunities and coach every rep towards a better next conversation.",

    /** The two lines under the rule, each with an icon. */
    points: [
      { icon: "clock", text: "30 minutes · tailored to your frontline" },
      {
        icon: "bubble",
        text: "See conversation intelligence, missed opportunities and coaching actions in one session",
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
          "Conversation intelligence & coaching",
          "Missed opportunities & revenue at risk",
          "Frontline capability and readiness",
          "Something else",
        ],
      },

      detail: {
        name: "priority",
        label: "Tell us about your performance priority (optional)",
        placeholder: "e.g. Improve discovery, cross-sell and coaching quality",
        autoComplete: "off",
      },

      consent: {
        name: "sendGuide",
        label:
          "Send me a short guide to conversation intelligence for frontline teams.",
      },

      submit: "Book a LurnyPitch Demo",

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

      /** {0} is replaced by the link below. */
      footnote: {
        text: "Prefer to talk first? {0}.",
        links: [{ label: "Contact Sales", href: "/contact" }],
      },
    },
  },
} as const;
