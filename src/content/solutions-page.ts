/**
 * SOLUTIONS PAGE CONTENT
 * ---------------------------------------------------------------------------
 * Copy for the solutions page at /solutions.
 *
 * Distinct from content/solutions.ts, which holds the SECTION of the same name
 * on the home page. That file drives a six-card grid; this one drives the
 * standalone page. Section 1 is defined below; further sections are added here
 * as their designs land.
 *
 * Copy is verbatim from "elurny.com Solutions page text.txt".
 */

export const solutionsPage = {
  /** Page-level metadata, consumed by the route's `metadata` export. */
  meta: {
    title: "Solutions — Capability Built Around the Work That Matters",
    description:
      "Bring learning, practice, knowledge support and performance intelligence together, around the outcomes your teams are expected to deliver.",
    path: "/solutions",
  },

  hero: {
    eyebrow: "Solutions by business need",

    /** Split so the lines break where the design breaks them on lg+. */
    headline: ["Capability solutions built", "around the work that matters"],

    description:
      "Bring learning, practice, knowledge support and performance intelligence together—around the outcomes your teams are expected to deliver.",

    actions: {
      primary: { label: "Explore all solutions", href: "#solutions" },
      secondary: { label: "Talk to a capability specialist", href: "/contact" },
    },

    /**
     * The particle burst on the right. Decorative, so `alt` is empty: it is
     * atmosphere behind the statement, and the copy carries the meaning.
     */
    backdrop: {
      src: "/assets/images/solutions/hero-burst.webp",
      alt: "",
      width: 1662,
      height: 946,
    },
  },

  /**
   * SECTION 2 — the nine business needs, as a 3x3 grid of cards.
   *
   * `icon` and `corner` both key into the maps in SolutionsNeedIcons: the icon
   * is the tile glyph, the corner is the ornament in the card's top-right. Both
   * come from the supplied SVG sets, and the design pairs a different corner
   * with each card rather than repeating one.
   */
  needs: {
    eyebrow: "Solutions by business need",

    /** Split so the lines break where the design breaks them on lg+. */
    headline: ["Start with the business", "outcome you need"],

    link: { label: "Explore all solutions", href: "#solutions" },

    items: [
      {
        number: "01",
        icon: "frontline",
        corner: "softQuarter",
        title: "Frontline Performance",
        description:
          "Branch, sales, service and field teams delivering outcomes.",
        tags: ["Pulse", "Saathi", "Pitch"],
        href: "/solutions/frontline",
      },
      {
        number: "02",
        icon: "sales",
        corner: "roundedPanel",
        title: "Sales Enablement",
        description:
          "Product knowledge, simulation practice and customer conversations.",
        tags: ["Magic", "Pitch", "Biz"],
        href: "/solutions/sales-enablement",
      },
      {
        number: "03",
        icon: "capability",
        corner: "dotMatrixPanel",
        title: "Capability Building",
        description:
          "Define role expectations, assess proficiency and build GrowthPaths.",
        tags: ["Pulse", "KXP"],
        href: "/solutions/capability-building",
      },
      {
        number: "04",
        icon: "knowledge",
        corner: "nestedArcs",
        title: "Knowledge Management",
        description:
          "Make SOPs, policies and product knowledge available at need.",
        tags: ["Chat", "Magic"],
        href: "/solutions/knowledge-management",
      },
      {
        number: "05",
        icon: "compliance",
        corner: "hatching",
        title: "Compliance Readiness",
        description:
          "Policy distribution, declarations, assessments and audit-ready reporting.",
        tags: ["KXP", "Pulse"],
        href: "/solutions/compliance",
      },
      {
        number: "06",
        icon: "onboarding",
        corner: "partialQuarter",
        title: "Employee Onboarding",
        description:
          "Role-specific journeys, knowledge support and readiness measurement.",
        tags: ["KXP", "Chat", "Events"],
        href: "/solutions/onboarding",
      },
      {
        number: "07",
        icon: "service",
        corner: "dotMatrix",
        title: "Customer Service Excellence",
        description:
          "Build product, process and empathy skills that delight customers.",
        tags: ["Pulse", "Saathi", "Pitch"],
        href: "/solutions/customer-service",
      },
      {
        number: "08",
        icon: "leadership",
        corner: "softCorner",
        title: "Leadership & Manager Effectiveness",
        description:
          "Develop coaching, feedback and people leadership capabilities.",
        tags: ["Pulse", "KXP", "Biz"],
        href: "/solutions/leadership",
      },
      {
        number: "09",
        icon: "change",
        corner: "waveLines",
        title: "Change & Digital Adoption",
        description:
          "Drive awareness, build skills and sustain adoption at scale.",
        tags: ["KXP", "Chat", "Magic"],
        href: "/solutions/change-adoption",
      },
    ],
  },

  /**
   * SECTION 3 — the five connected engines.
   *
   * The stages sit on a glowing rail with a node between each pair, so the
   * order here IS the order on screen. `icon` keys into the map in
   * SolutionsEngineIcons.
   */
  engines: {
    eyebrow: "How Lurny solves the problem",

    /** Split so the lines break where the design breaks them on lg+. */
    headline: [
      "One business need. Multiple",
      "connected engines. One measurable outcome.",
    ],

    description:
      "Lurny connects the capabilities needed to diagnose gaps, build knowledge, practise critical skills, support people at work and continuously improve performance.",

    stages: [
      {
        number: "01",
        icon: "diagnose",
        title: "Diagnose",
        description: "Define role expectations and identify capability gaps.",
        tags: ["Pulse"],
      },
      {
        number: "02",
        icon: "build",
        title: "Build",
        description: "Create and deliver relevant learning and knowledge.",
        tags: ["Magic", "KXP", "Events"],
      },
      {
        number: "03",
        icon: "practise",
        title: "Practise",
        description: "Rehearse skills and customer situations safely.",
        tags: ["SIM", "Minds"],
      },
      {
        number: "04",
        icon: "support",
        title: "Support",
        description: "Provide answers and guidance in the flow of work.",
        tags: ["Chat", "Saathi"],
      },
      {
        number: "05",
        icon: "measure",
        title: "Measure & improve",
        description:
          "Observe performance and identify the next-best intervention.",
        tags: ["Pitch", "Sense", "Biz"],
      },
    ],

    /** The banded statement below the rail. */
    difference: {
      eyebrow: "The difference",
      body: "Lurny does not stop at learning completion. It connects capability-building with evidence of how people actually perform.",
    },
  },

  /**
   * SECTION 4 — the frontline case study.
   *
   * One card: a photograph of a branch conversation, with a glass panel of copy
   * over its left and the product's own read-out — stats, waveform and signal
   * chips — over its right.
   */
  caseStudy: {
    eyebrow: "Capability in action",

    /** Split so the lines break where the design breaks them on lg+. */
    headline: [
      "When frontline performance becomes visible,",
      "better coaching becomes possible",
    ],

    /** The two rows above the panel's rule. */
    meta: [
      {
        icon: "financial",
        label: "Frontline Performance · Financial Services",
      },
      {
        icon: "organisation",
        label: "A leading Indian financial-services organisation",
      },
    ],

    /** The challenge and the response, each behind an accent bar. */
    blocks: [
      {
        title: "The challenge",
        body: "Senior leaders needed greater visibility into how branch teams engaged customers, followed the preferred sales approach and identified relevant cross-sell opportunities.",
      },
      {
        title: "How Lurny helped",
        body: "LurnyPitch captured and analysed multilingual frontline conversations, giving managers evidence of conversation quality, product coverage, adherence and missed opportunities.",
      },
    ],

    link: {
      label: "Read the frontline performance story",
      href: "/resources/case-studies",
    },

    /** The three stat tiles over the photograph. */
    stats: [
      { value: "25", label: "Branches live" },
      { value: "9,328", label: "Conversations analysed" },
      { value: "Multilingual", label: "Frontline conversations" },
    ],

    /** The four signal chips below the waveform. */
    signals: [
      { icon: "quality", label: ["Conversation", "quality"] },
      { icon: "coverage", label: ["Product", "coverage"] },
      { icon: "missed", label: ["Missed", "opportunity"] },
      { icon: "coaching", label: ["Coaching", "signal"] },
    ],

    /** The note in the card's lower-right, marking the read-out as a mockup. */
    disclaimer: "Illustrative view",

    /**
     * The photograph behind the card. `alt` describes the scene rather than
     * being empty: it is the case study's subject, not atmosphere.
     */
    photo: {
      src: "/assets/images/solutions/case-study-branch.webp",
      alt: "A bank employee talking with a customer across a branch desk.",
      width: 1672,
      height: 941,
    },

    /** The waveform overlay. Decorative, so `alt` is empty. */
    wave: {
      src: "/assets/images/solutions/conversation-wave.webp",
      alt: "",
      width: 1949,
      height: 249,
    },
  },

  /**
   * SECTION 5 — one platform, different realities.
   *
   * A sine wave runs from a customer conversation on the left to a shared
   * kitchen kiosk on the right, with three labelled nodes along it. The order
   * here IS the order on the curve.
   */
  realities: {
    eyebrow: "One platform. Different realities.",

    /** Split so the lines break where the design breaks them on lg+. */
    headline: [
      "From customer conversations to kitchen floors,",
      "capability must meet people where work happens",
    ],

    description:
      "Lurny adapts to the language, device and moment available—whether it is analysing a branch interaction or turning a shared television into a voice-led learning kiosk.",

    /** The two ends of the curve, each behind its own icon. */
    start: { icon: "waveform", label: "Customer conversation" },
    end: { icon: "kiosk", label: "Shared kitchen kiosk" },

    /**
     * The three nodes along the curve. `at` is the node's position as a
     * percentage of the curve's width, measured from the design — the same
     * value places the dot and its label, so the two cannot drift apart.
     */
    nodes: [
      { at: 22, label: "At the point of work" },
      { at: 48, label: "In the language people use" },
      { at: 74, label: "Through devices already there" },
    ],

    footnote: "Lurny adapts to the workplace—not the other way around.",
  },

  /**
   * SECTION 6 — inclusive learning in action.
   *
   * The second case study on this page. Deliberately shaped like `caseStudy`
   * above — same eyebrow / headline / meta / blocks / link — because the two
   * sections are the same argument told twice, and a reader moving between
   * them should find the same furniture in the same places.
   *
   * Where it differs: the photograph carries three frosted capability cards
   * rather than the statistics read-out, since this story is about HOW people
   * learn rather than what the numbers showed.
   */
  inclusive: {
    eyebrow: "Inclusive learning in action",

    /** Split so the lines break where the design breaks them on lg+. */
    headline: [
      "Essential learning should not depend on",
      "literacy or smartphone ownership.",
    ],

    /** The two chips under the headline. */
    meta: [
      {
        icon: "sahiyog",
        label: "Sahiyog · Frontline accessibility",
      },
      {
        icon: "foundation",
        label: "The Akshaya Patra Foundation",
      },
    ],

    /**
     * The three frosted cards over the photograph. `icon` keys into the map in
     * SolutionsInclusive.
     */
    cards: [
      {
        icon: "voice",
        title: "Voice-first",
        description: "Listen and learn naturally",
      },
      {
        icon: "image",
        title: "Image-led",
        description: "See each process clearly",
      },
      {
        icon: "kiosk",
        title: "Shared kitchen kiosk",
        description: "No personal smartphone required",
      },
    ],

    /** The challenge and the response, each behind its own icon. */
    blocks: [
      {
        icon: "challenge",
        title: "The challenge",
        body: "Essential kitchen-process, hygiene and safety training had to reach frontline kitchen employees with limited literacy and without individual smartphones. Text-heavy courses and conventional LMS navigation were not suitable for this environment.",
      },
      {
        icon: "helped",
        title: "How Lurny helped",
        body: "A simple television screen already used for quality messages became a shared kitchen learning kiosk. LurnySahiyog delivered visual, voice-led guidance that teams could access together without reading, typing or personal devices.",
      },
    ],

    link: {
      label: "Read the inclusive learning story",
      href: "/resources/case-studies",
    },

    /**
     * The photograph. Its `alt` describes the SCENE — this is a real workplace
     * and what it shows is the argument: a group learning together from one
     * shared screen, no personal devices in sight.
     */
    photo: {
      src: "/assets/images/solutions/inclusive-kitchen.webp",
      alt: "Kitchen staff in hairnets and aprons sitting together on the floor, watching a hand-washing lesson on a wall-mounted television.",
      width: 1672,
      height: 941,
    },

    /**
     * The design labels the composed view "Illustrative view", as section 4
     * does — the television's on-screen lesson is a mockup rather than a
     * screenshot. That label ships with it.
     */
    illustrativeLabel: "Illustrative view",
  },

  /**
   * SECTION 7 — talk to a capability specialist.
   *
   * The pitch on the left, the shared LeadForm on a raised card to the right —
   * the same arrangement every product page closes with.
   *
   * This design asks for six fields rather than four, so it supplies the
   * optional `organisation` text field and `selectC`; see the notes on those
   * in components/ui/LeadForm.tsx.
   */
  specialist: {
    eyebrow: "Talk to a capability specialist",

    /** Split so the lines break where the design breaks them on lg+. */
    headline: ["Start with the", "outcome your", "teams need to deliver."],

    description:
      "Tell us where capability, knowledge or performance needs to improve. We'll map the most relevant combination of Lurny engines around your teams, workflows and outcomes.",

    /** The two lines under the rule, each with an icon. */
    points: [
      {
        icon: "clock",
        text: "30 minutes · tailored to your business priorities",
      },
      {
        icon: "bubble",
        text: "See how Lurny connects learning, practice, support and performance intelligence",
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
      /**
       * Required, per the asterisk in the design — which means the resting
       * option is treated as unanswered. See the note on `required` in
       * LeadForm's SelectFieldContent for why the flag and the error go
       * together.
       *
       * The options mirror the nine needs in the `needs` section above, word
       * for word: someone who picked a card there and scrolled to here should
       * find the same name waiting, not a paraphrase of it.
       */
      selectB: {
        name: "businessNeed",
        label: "Primary business need",
        options: [
          "Select a business need",
          "Frontline Performance",
          "Sales Enablement",
          "Capability Building",
          "Knowledge Management",
          "Compliance Readiness",
          "Employee Onboarding",
          "Customer Service Excellence",
          "Leadership & Manager Effectiveness",
          "Change & Digital Adoption",
        ],
        required: true,
        error: "Please select a primary business need.",
      },
      /** The same vocabulary the Industries page uses, deliberately. */
      selectC: {
        name: "industry",
        label: "Industry",
        options: [
          "Select your industry",
          "Banking & Financial Services",
          "Telecom",
          "Healthcare",
          "Manufacturing",
          "Professional Services",
          "Retail",
          "Something else",
        ],
      },

      detail: {
        name: "outcome",
        label: "What would you like your teams to do better? (optional)",
        placeholder:
          "e.g. Improve sales conversations, speed up onboarding or strengthen compliance readiness",
        autoComplete: "off",
      },

      consent: {
        name: "sendOverview",
        label: "Send me the Lurny solutions overview.",
      },

      submit: "Talk to a Capability Specialist",

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
        text: "Prefer a product walkthrough? {0}",
        links: [{ label: "Book a Demo.", href: "/demo" }],
      },
    },
  },
} as const;
