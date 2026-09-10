/**
 * COMPLIANCE READINESS PAGE CONTENT
 * ---------------------------------------------------------------------------
 * Copy for /solutions/compliance — one of the "solutions by business need"
 * detail pages, alongside /solutions/frontline, /solutions/sales-enablement
 * and /solutions/onboarding.
 *
 * Copy is verbatim from the supplied "05_Hero_Text.txt" and the card text in
 * the section design. Section 1 is defined below; the remaining sections are
 * added here as their designs are built.
 */

export const compliance = {
  /** Page-level metadata, consumed by the route's `metadata` export. */
  meta: {
    title: "Compliance Readiness — Policies Understood, People Prepared",
    description:
      "Turn SOPs, policies and regulatory requirements into accessible learning. Assess understanding, identify knowledge gaps and build the proficiency roles require.",
    path: "/solutions/compliance",
  },

  /**
   * SECTION 1 — the hero.
   *
   * The statement on the left over the scene's lavender wash, three engine
   * cards along the foot of the office to the right.
   */
  hero: {
    eyebrow: "Compliance readiness",

    /**
     * THREE lines rather than two sentences, because the design breaks
     * mid-sentence: "Policies / understood. / People prepared." Written out so
     * the break is drawn rather than left to the browser to find. The design
     * sets all of it in near-black — unlike the onboarding hero, there is no
     * colour change here.
     *
     * On small screens the lines run together into normal wrapped prose; see
     * ComplianceHero.
     */
    headline: ["Policies", "understood.", "People prepared."],

    description:
      "Turn SOPs, policies and regulatory requirements into accessible learning. Assess understanding, identify knowledge gaps and help your people build the proficiency their roles require.",

    actions: {
      primary: {
        label: "Explore compliance readiness",
        /* Points at a section further down this page, which is specified in
           the supplied copy but not yet built. */
        href: "#approach",
      },
      secondary: { label: "Talk to us", href: "/demo" },
    },

    /** The engine attribution under the actions. */
    poweredBy: {
      label: "Powered by",
      engines: ["LurnyMagic", "LurnyKxP", "LurnyPulse"],
    },

    /** The decorative footer text at the plate's bottom-left. */
    footnote: ["People ready", "for a brighter tomorrow"],

    /**
     * The glass-wall scene. It already carries the office, the woman, every
     * sticky note, the handwritten note and arrows, and the outcomes list —
     * only the three cards sit over it.
     */
    scene: {
      src: "/images/solutions/compliance/hero-scene.webp",
      /**
       * Decorative: it is a photograph of a manager mapping policies onto a
       * glass wall, and every claim the section makes is set in the copy and
       * the cards beside it.
       */
      alt: "",
      width: 1672,
      height: 941,
    },

    /**
     * THE THREE ENGINE CARDS
     * ---------------------------------------------------------------------
     * Built in markup rather than shipped as the supplied crops — see
     * scripts/build-compliance-hero.cjs for why.
     *
     * Each names one engine and shows what it does with a policy: LurnyMagic
     * turns it into a lesson, LurnyKxP checks it was understood, LurnyPulse
     * says where the gap still is. `body` selects which of the three panels
     * below the header the card draws.
     */
    cards: [
      {
        engine: "LurnyMagic",
        icon: "magic",
        action: "Learn",
        title: "Policy to microlesson",
        body: "transform",
        caption: "Turn your policies into engaging microlessons — in minutes.",
      },
      {
        engine: "LurnyKxP",
        icon: "kxp",
        action: "Check understanding",
        title: "What should you do next?",
        body: "question",
        /** The first is the approved answer, and the design marks it. */
        options: [
          "Follow the approved procedure",
          "Handle it informally",
          "Escalate to a colleague",
        ],
      },
      {
        engine: "LurnyPulse",
        icon: "pulse",
        action: "Identify gaps",
        body: "levels",
        /** Where this person is, and where the role requires them to be. */
        levels: { currentLabel: "Current", current: "L1", requiredLabel: "Required", required: "L2" },
        /** The three stops on the track; `current` marks the filled one. */
        track: { steps: 3, at: 0 },
        focus: { label: "Focus", value: "Escalation procedure" },
      },
    ],
  },
} as const;
