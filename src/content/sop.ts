/**
 * LURNYSOP PAGE CONTENT
 * ---------------------------------------------------------------------------
 * Copy for the LurnySOP product page at /platform/sop.
 *
 * Sections 1 to 3 are defined below; further sections are added here as their
 * designs land. Copy is verbatim from the design pack — section 1 from
 * "1 LurnySOP_Framework_Readiness_Hero_Assets/04_Left_Side_Text.txt", section 2
 * from "2 LurnySOP_Problem_Section_Assets/06_All_Section_Text.txt", section 3
 * from "3 LurnySOP_Organisation_Context_Assets/08_Left_Side_Text.txt", section 4
 * from "4 LurnySOP_Flow_Of_Work_Assets/09_Left_Side_And_Footer_Text.txt".
 *
 * SECTION 5 HAS NO TEXT FILE AND NO ASSET FOLDER. The pack ships five text
 * files for six sections, and none of them carries this section's copy — it is
 * transcribed from `section5.png`, read at full size, which is its only
 * source. Worth a second pair of eyes before launch for that reason.
 *
 * (The pack's `LurnySOP_Inquiry_Form_Assets` folder belongs to the FORM, which
 * is `section6.png` — not to section 5. Section 6's copy IS from that folder's
 * `04_All_Section_Text.txt`.)
 *
 * As in section 1, section 3's workflow cards have NO text file — they are
 * transcribed from the comp and the pack's three card PNGs, read at full size.
 * They are illustrative product UI, which the comp labels "Illustrative
 * workflow" on screen.
 *
 * THE PANEL COPY IS NOT IN THAT FILE. The text file covers the left column
 * only — eyebrow, headline, supporting copy, buttons and the framework strip.
 * Everything under `panel` below is transcribed from the supplied comp
 * (`section1.png` and `02_..._Card_Transparent.png`, read at full size), which
 * is the only source for it. It is illustrative product UI, not a claim about
 * a live workspace, which is what the panel's own "Illustrative workspace"
 * chip says on screen.
 */

/** One framework tile in the readiness panel. */
export interface SopFramework {
  /** Stable key — also selects the glyph in SopFrameworkIcons. */
  id: string;
  name: string;
  /** The two status lines under the name, top to bottom. */
  status: readonly [string, string];
  /**
   * Which dot colour the two status lines take. "active" is the amber used
   * for work in progress, "idle" the slate used for untouched frameworks.
   */
  tone: "active" | "idle";
}

/** One card in the problem grid. */
export interface SopChallenge {
  /** Stable key — also selects the glyph in SopIcons. */
  id: string;
  /** The chip's digits, as the design sets them: "01" through "04". */
  number: string;
  title: string;
  body: string;
}

/** One step in the context section's list. */
export interface SopStep {
  /** Stable key — also selects the glyph in SopIcons. */
  id: string;
  title: string;
  body: string;
}

/** One item in the flow-of-work list. */
export interface SopBenefit {
  /** Stable key — also selects the glyph in SopIcons. */
  id: string;
  title: string;
  body: string;
}

/** One item in the shared-processes list. */
export interface SopSharedPoint {
  /** Stable key — also selects the glyph in SopIcons. */
  id: string;
  title: string;
  body: string;
}

export const sop = {
  /** Page-level metadata, consumed by the route's `metadata` export. */
  meta: {
    title: "LurnySOP — Build towards ISO, GDPR and more, from day one",
    description:
      "Turn framework requirements into policies, clear responsibilities and everyday actions tailored to your organisation. LurnySOP guides implementation, tracks gaps and keeps evidence ready for review.",
    path: "/platform/sop",
  },

  hero: {
    eyebrow: "LurnySOP · Framework readiness",

    /**
     * Split at the design's line breaks so they are the content's decision,
     * not a wrapping accident. The em dash closes line 2 exactly as the comp
     * sets it — "and more—from day one."
     */
    headline: ["Build towards ISO,", "GDPR and more—", "from day one."],

    description:
      "Turn framework requirements into policies, clear responsibilities and everyday actions tailored to your organisation. LurnySOP guides implementation, tracks gaps and keeps evidence ready for review.",

    actions: {
      /*
       * The arrow on the secondary button is drawn as an SVG, so the label
       * here is the text alone — the design's trailing "→" is presentation.
       */
      primary: { label: "Book a demo", href: "/demo" },
      secondary: { label: "Explore frameworks", href: "#frameworks" },
    },

    /** The strip beneath the buttons, rendered middot-separated. */
    frameworks: [
      "ISO 27001",
      "ISO 27701",
      "ISO 42001",
      "SOC 2",
      "GDPR",
      "DPDP",
    ],

    /**
     * The readiness panel on the right. Rebuilt in markup rather than shipped
     * as the supplied crops — see SopReadinessPanel.tsx for why.
     */
    panel: {
      brand: { lead: "Lurny", accent: "SOP" },
      workspace: "Illustrative workspace",
      heading: "Framework readiness",
      subheading: "Requirements, actions and evidence in one place.",

      /** The first is the one the design shows selected. */
      tabs: ["Frameworks", "My tasks", "Evidence"],

      /**
       * Six tiles, in the comp's reading order: left column top to bottom,
       * then right. The grid lays them out two per row, so this order is
       * ISO 27001, GDPR, SOC 2, DPDP, ISO 27701, ISO 42001.
       */
      frameworks: [
        {
          id: "iso27001",
          name: "ISO 27001",
          status: ["Implementation in progress", "Evidence pending"],
          tone: "active",
        },
        {
          id: "gdpr",
          name: "GDPR",
          status: ["Implementation in progress", "Evidence pending"],
          tone: "active",
        },
        {
          id: "soc2",
          name: "SOC 2",
          status: ["Implementation in progress", "Evidence pending"],
          tone: "active",
        },
        {
          id: "dpdp",
          name: "DPDP",
          status: ["Implementation in progress", "Evidence pending"],
          tone: "active",
        },
        {
          id: "iso27701",
          name: "ISO 27701",
          status: ["Planned", "Not yet reviewed"],
          tone: "idle",
        },
        {
          id: "iso42001",
          name: "ISO 42001",
          status: ["Planned", "Not yet reviewed"],
          tone: "idle",
        },
      ] as const satisfies readonly SopFramework[],

      /** The card overlapping the panel's bottom edge. */
      nextStep: {
        eyebrow: "Your next step",
        title: "Review Access Control Procedure",
        owner: "Owner: IT lead",
        action: "Open review",
      },
    },
  },

  /**
   * SECTION 2 — THE PROBLEM
   * -------------------------------------------------------------------------
   * The statement on the left, four challenge cards in a 2x2 grid on the
   * right. All copy verbatim from 06_All_Section_Text.txt, including the
   * typographic apostrophe in "don't" — that file uses U+2019, and so does
   * this, rather than silently normalising the author's punctuation.
   */
  problem: {
    eyebrow: "The problem LurnySOP solves",

    /**
     * The design sets this in two colours: the first sentence near-black, the
     * question in purple. Split so that styling is the content's structure
     * rather than a substring match in the component.
     *
     * Each half is split again at the comp's own line breaks. The design's
     * face is more condensed than the one this site renders in, so at the same
     * column width the browser breaks "You know / the frameworks." where the
     * comp sets "You know the / frameworks." Setting the breaks here makes
     * them the design's decision rather than a wrapping accident — the same
     * reason the hero's headline is a list of lines.
     */
    headline: {
      lead: ["You know the", "frameworks."],
      accent: ["What does your", "team do next?"],
    },

    description:
      "ISO, GDPR and other frameworks set expectations. Turning them into policies, daily responsibilities and reliable evidence is where companies need help.",

    /** Reading order is the comp's: across the top row, then the bottom. */
    challenges: [
      {
        id: "translate",
        number: "01",
        title: "Requirements are hard to translate into action",
        body: "Teams need to understand what applies to their organisation and what they must put in place.",
      },
      {
        id: "responsibilities",
        number: "02",
        title: "Policies don’t tell everyone their next step",
        body: "People need clear instructions: who does what, when, how often and what records to keep.",
      },
      {
        id: "evidence",
        number: "03",
        title: "Evidence is scattered",
        body: "Approvals, checks and supporting records sit across emails, spreadsheets and systems, making reviews difficult.",
      },
      {
        id: "readiness",
        number: "04",
        title: "Readiness is unclear",
        body: "Leaders need to see what is implemented, what has been verified and what still needs attention before an assessment.",
      },
    ] as const satisfies readonly SopChallenge[],
  },

  /**
   * SECTION 3 — BUILT AROUND YOUR ORGANISATION
   * -------------------------------------------------------------------------
   * The statement and three steps on the right; on the left a stack of three
   * workflow cards joined by curved threads.
   *
   * The comp mirrors section 2: there the copy is on the left, here on the
   * right. That alternation is the design's, and the component follows it
   * with an `order` on the two columns rather than by duplicating markup.
   */
  context: {
    /** The label above the card stack, marking it as illustrative. */
    illustrationLabel: "Illustrative workflow",

    eyebrow: "Built around your organisation",

    /**
     * Three lines, the last in mint. Split at the comp's line breaks, and
     * tagged so the component colours the third without matching substrings.
     */
    headline: [
      { text: "Your frameworks.", accent: false },
      { text: "Your business.", accent: false },
      { text: "A clear plan of action.", accent: true },
    ],

    description:
      "LurnySOP draws on your business, departments, people and systems through LurnyFabric. It helps identify relevant requirements, review existing policies and prepare the procedures and actions your teams need.",

    /** The three steps beneath the copy, in the comp's order. */
    steps: [
      {
        id: "company",
        title: "Start with your company context",
        body: "Use existing documents and organisational knowledge connected through Fabric.",
      },
      {
        id: "applies",
        title: "Identify what applies",
        body: "Review relevant framework requirements and uncover gaps in current policies and processes.",
      },
      {
        id: "plan",
        title: "Build your implementation plan",
        body: "Prepare policy drafts, assign owners and define the tasks and evidence needed\u2014with review and approval.",
      },
    ] as const satisfies readonly SopStep[],

    /**
     * The three stacked cards. Transcribed from the comp — see the note at
     * the top of this file.
     */
    cards: {
      fabric: {
        title: "LurnyFabric",
        subtitle: "Your company context",
        /** The 2x2 grid of sources inside the card. */
        sources: [
          { id: "business", label: "Business" },
          { id: "departments", label: "Departments" },
          { id: "people", label: "People" },
          { id: "systems", label: "Systems" },
        ],
        footer: "Documents & connected knowledge",
      },

      review: {
        title: "Framework review",
        /** The three framework pills. */
        pills: [
          { id: "iso27001", label: "ISO 27001" },
          { id: "gdpr", label: "GDPR" },
          { id: "soc2", label: "SOC 2" },
        ],
        /** Two labelled rows, each closing with a status chip. */
        rows: [
          { label: "Relevant requirements", status: "Review", tone: "violet" },
          { label: "Policy & process gaps", status: "To address", tone: "mint" },
        ],
      },

      plan: {
        title: "Implementation plan",
        badge: "Draft for approval",
        /** Four rows: an icon, a label and its value. */
        rows: [
          { id: "policy", label: "Policy draft", value: "Access Control Procedure" },
          { id: "owner", label: "Proposed owner", value: "IT lead" },
          { id: "tasks", label: "Tasks", value: "Define steps and frequency" },
          { id: "evidence", label: "Evidence", value: "Set required records" },
        ],
        footer: "Review & approval before publishing",
      },
    },
  },

  /**
   * SECTION 4 — FROM POLICY TO DAILY PRACTICE
   * -------------------------------------------------------------------------
   * Copy and four benefits on the left; on the right a photograph masked by an
   * S-curve, with three workflow cards floating over it.
   *
   * The card copy has no text file and is transcribed from the comp, as in
   * sections 1 and 3. The main card labels itself "ISO 27001 · EXAMPLE
   * WORKFLOW" on screen, which is the design saying plainly that it is
   * illustrative rather than a real workspace.
   */
  flow: {
    eyebrow: "From policy to daily practice",

    /**
     * Three lines, the last two in purple. Split at the comp's own line
     * breaks, and tagged so the component colours them without matching
     * substrings — the same shape section 3's headline uses.
     */
    headline: [
      { text: "Best practices.", accent: false },
      { text: "Built into the", accent: true },
      { text: "flow of work.", accent: true },
    ],

    description:
      "LurnySOP turns approved policies into guided daily work, with clear responsibilities, timely approvals and connected evidence.",

    /** The four items beneath the copy, in the comp's order. */
    benefits: [
      {
        id: "process",
        title: "Follow the approved process",
        body: "Clear steps, responsibilities and checks.",
      },
      {
        id: "evidence",
        title: "Capture evidence as you work",
        body: "Keep actions, decisions and approvals connected.",
      },
      {
        id: "gaps",
        title: "Address gaps promptly",
        body: "Flag missed steps, overdue actions and exceptions.",
      },
      {
        id: "reviews",
        title: "Make reviews and audits easier",
        body: "Give authorised reviewers access to relevant records.",
      },
    ] as const satisfies readonly SopBenefit[],

    /** The line under the rule that closes the column. */
    footnote: "A living record of how work gets done, every day.",

    /** The photograph behind the cards. */
    photo: {
      src: "/assets/images/sop/flow-office.webp",
      /*
       * A genuine description rather than an empty alt: the photograph carries
       * meaning here — it is what puts the workflow "in the flow of work" —
       * so a reader who cannot see it should still learn what it shows.
       */
      alt: "A woman working at an office desk, smiling, with a notebook and pen in front of her.",
    },

    /** The three cards floating over the photograph. */
    cards: {
      review: {
        eyebrow: "ISO 27001 · Example workflow",
        title: "Access Control review",
        rows: [
          { label: "Check user accounts", status: "Done", tone: "done" },
          { label: "Review permissions", status: "In progress", tone: "progress" },
        ],
        owner: "Owner: IT team",
      },

      approval: {
        title: "Manager approval",
        body: "Permission changes",
        status: "Awaiting review",
      },

      evidence: {
        title: "Evidence linked",
        /** Two plain lines, as the comp sets them. */
        items: ["Access register", "Review notes"],
      },
    },
  },

  /**
   * SECTION 5 — CONNECTED FRAMEWORKS
   * -------------------------------------------------------------------------
   * A dark section: one process card on the left feeding two framework cards,
   * with the statement and four points on the right.
   *
   * ALL COPY HERE IS TRANSCRIBED FROM THE COMP — see the note at the top of
   * this file. There is no text file for this section.
   */
  shared: {
    eyebrow: "Connected frameworks. Less audit effort.",

    /** Two lines, the second in lilac, split at the comp's line breaks. */
    headline: [
      { text: "Shared processes.", accent: false },
      { text: "Simpler audits across frameworks.", accent: true },
    ],

    description:
      "Many frameworks share requirements. LurnySOP connects your processes, evidence and audit findings to those requirements\u2014helping you reuse completed work and focus on what each framework still needs.",

    /** The four points, in the comp's order. */
    points: [
      {
        id: "coverage",
        title: "Shared processes, broader coverage",
        body: "Connect the same approved procedures and controls to relevant requirements across frameworks.",
      },
      {
        id: "once",
        title: "Evidence captured once, used where relevant",
        body: "Link records from everyday work to multiple requirements, wherever their scope and timing apply.",
      },
      {
        id: "next",
        title: "Each audit supports the next",
        body: "Carry relevant evidence and findings into subsequent audits, with additional checks where needed.",
      },
      {
        id: "gaps",
        title: "Clear gaps for every framework",
        body: "See what is covered and what needs further action, evidence or review.",
      },
    ] as const satisfies readonly SopSharedPoint[],

    /** The lilac line that closes the column. */
    footnote: "Keep work connected. Reduce duplication. Make every review count.",

    /** The illustration: one process card feeding two framework cards. */
    diagram: {
      process: {
        title: "Access Control Review",
        rows: ["Access list", "Approval", "Verification"],
      },
      /** Both framework cards carry the same two rows, as the comp shows. */
      frameworks: [
        { id: "iso27001", name: "ISO 27001" },
        { id: "soc2", name: "SOC 2" },
      ],
      sharedLabel: "Shared requirements",
      additionalLabel: "Additional checks",
    },
  },

  /**
   * SECTION 6 — INQUIRY FORM
   * -------------------------------------------------------------------------
   * The pitch on the left, the booking form on a white card to the right.
   * Copy verbatim from
   * "LurnySOP_Inquiry_Form_Assets/04_All_Section_Text.txt".
   *
   * THE FORM IS THE SHARED LeadForm, not a copy of one, so it inherits the
   * same validation, focus management, honeypot and success state as every
   * other page's. This design asks for seven fields: the three text inputs,
   * three selects and a free-text challenge, which map onto `organisation`,
   * `selectA`/`selectB`/`selectC` and `detail`.
   *
   * THE SELECT OPTIONS ARE NOT IN THE TEXT FILE. It supplies each select's
   * resting label ("Select workforce size" and so on) but no list to choose
   * from, so the options below are drafted — the frameworks match the ones
   * section 1 names, and the other two follow the patterns the rest of the
   * site uses. They need sign-off before launch.
   */
  demo: {
    eyebrow: "See LurnySOP in action",

    /** Three lines, split at the comp's own line breaks. */
    headline: ["Start your journey", "to framework", "readiness."],

    description:
      "Tell us which frameworks matter to your organisation. We\u2019ll show you how LurnySOP connects policies, daily actions and evidence to help you prepare for reviews and audits.",

    /** The two lines under the rule, each with its own icon. */
    points: [
      { icon: "clock", text: "30 minutes · tailored to your organisation" },
      {
        icon: "documents",
        text: "Explore your requirements, gaps and next steps",
      },
    ],

    /** Consumed by the shared LeadForm — see the note above. */
    form: {
      name: {
        name: "full-name",
        label: "Full name",
        placeholder: "Your name",
        autoComplete: "name",
      },
      email: {
        name: "work-email",
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
        name: "workforce-size",
        label: "Your workforce size",
        /* TODO(copy): drafted — see the note above. The first entry is the
           resting label, which the text file does supply. */
        options: [
          "Select workforce size",
          "1–50",
          "51–250",
          "251–1,000",
          "1,001–5,000",
          "More than 5,000",
        ],
      },
      selectB: {
        name: "frameworks",
        label: "Frameworks of interest",
        required: true,
        error: "Please choose the frameworks you are interested in.",
        /* The six frameworks section 1 names, plus a catch-all. */
        options: [
          "Select frameworks",
          "ISO 27001",
          "ISO 27701",
          "ISO 42001",
          "SOC 2",
          "GDPR",
          "DPDP",
          "Several of these",
          "Not sure yet",
        ],
      },
      selectC: {
        name: "current-stage",
        label: "Current stage",
        /* TODO(copy): drafted — see the note above. */
        options: [
          "Select your current stage",
          "Just exploring",
          "Preparing for a first audit",
          "Already certified, maintaining",
          "Adding another framework",
        ],
      },
      detail: {
        name: "current-challenge",
        label: "Current challenge (optional)",
        placeholder:
          "e.g. policy gaps, scattered evidence or an upcoming audit",
      },
      consent: {
        name: "overview",
        label: "Send me the LurnySOP overview.",
      },
      submit: "Book a LurnySOP Demo",
      success: {
        title: "Thanks — we have your request.",
        description:
          "A specialist will be in touch shortly to arrange your LurnySOP demo.",
      },
      errors: {
        name: "Please enter your name.",
        email: "Please enter your work email.",
        emailFormat: "Please enter a valid email address.",
        organisation: "Please enter your organisation.",
      },
      footnote: {
        text: "Want to explore the wider Lurny platform? {0}",
        links: [{ label: "Talk to a Lurny Specialist.", href: "/demo" }],
      },
    },
  },
} as const;
