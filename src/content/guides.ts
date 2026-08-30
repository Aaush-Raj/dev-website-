/**
 * GUIDES & PLAYBOOKS PAGE CONTENT
 * ---------------------------------------------------------------------------
 * Copy for the Guides and Playbooks page at /resources/guides.
 *
 * Distinct from content/resources.ts (the Resources LANDING page),
 * content/insights.ts and content/events.ts — same section of the site,
 * different pages.
 *
 * Copy is verbatim from the supplied "guides-playbooks-page-text.txt".
 * Section 1 is defined below; sections 2-4 are specified in that file and are
 * added here as their designs are built.
 */

export const guides = {
  /** Page-level metadata, consumed by the route's `metadata` export. */
  meta: {
    title: "Guides and Playbooks",
    description:
      "Downloadable field guides, diagnostics, checklists and action plans for teams building capability and improving performance.",
    path: "/resources/guides",
  },

  /**
   * SECTION 1 — the hero.
   *
   * Copy on the left over a dark backdrop, with the printed collection —
   * playbook, diagnostic, checklist, action plan — arranged on the right.
   */
  hero: {
    eyebrow: "Guides & Playbooks",

    /** Split so the lines break where the design breaks them on lg+. */
    headline: ["Practical guidance for", "moving from ideas to action."],

    description:
      "Downloadable field guides, diagnostics, checklists and action plans for teams building capability and improving performance.",

    actions: {
      /* Both point at sections further down this page, which are specified in
         the supplied copy but not yet built. */
      primary: { label: "Explore the library", href: "#library" },
      secondary: { label: "View featured guide", href: "#library" },
    },

    /** The four formats under the actions, separated by dots in the design. */
    categories: ["Diagnostics", "Checklists", "Pilot Guides", "Action Plans"],

    /**
     * The backdrop: dark ground, a lit cream disc behind the collection, and
     * faint concentric line art at the corners.
     *
     * Shipped as an image rather than drawn: the disc is a photographic
     * paper texture with an uneven lit edge, not a flat circle CSS could
     * reproduce.
     */
    backdrop: {
      src: "/assets/images/guides/hero-backdrop.webp",
      /** Decorative: pure atmosphere behind the copy and the collection. */
      alt: "",
      width: 1672,
      height: 941,
    },

    /**
     * The printed collection, keyed out of its checkerboard and trimmed to
     * its content — see scripts/build-guides-hero.cjs.
     *
     * `alt` is empty: the covers repeat titles the surrounding copy and the
     * library section already set, so announcing them again would be noise.
     */
    cluster: {
      src: "/assets/images/guides/hero-cluster.webp",
      alt: "",
      width: 1289,
      height: 941,
    },
  },

  /**
   * SECTION 2 — the task-led resource navigator.
   *
   * Four tasks on the left; selecting one swaps the recommended resource on
   * the right. Task 01 is selected on load, as the design shows it.
   *
   * ARTWORK. Only three clipboard renders were supplied for the four tasks.
   * section2img.png — the clipboard the design shows in the middle of this
   * section — is task 01's, the state the section loads with. Note its printed
   * sheet reads "30-Day Capability Framework Action Plan" while task 01's
   * panel is the Competency Framework Quality Test: the artwork and the copy
   * disagree, which is how the asset was supplied.
   *
   * That leaves task 04 with no render, so its panel runs full width instead.
   * Give it an `image` and it picks up the shared frame like the others.
   */
  navigator: {
    eyebrow: "Find your starting point",

    /** Split so the lines break where the design breaks them on lg+. */
    headline: ["Start with the work", "in front of you."],

    description:
      "Choose the challenge you're solving. We'll point you to the most useful guide, diagnostic or action plan.",

    /** Shown under the panel, as the design sets it. */
    helper: "Select another task to change the recommendation.",

    /**
     * Each task and the resource it recommends. `tone` colours the number and
     * arrow, sampled from the design — one per task rather than a single
     * accent, which is what makes the list read as four distinct routes.
     */
    tasks: [
      {
        id: "framework",
        number: "01",
        tone: "#9656d1",
        title: "Define a capability framework",
        description: "Build roles, competencies and observable proficiency.",
        resource: {
          kind: "Diagnostic",
          title: "Competency Framework Quality Test",
          description:
            "12 questions to assess whether your framework is clear, observable and ready to use.",
          meta: ["10 minutes", "PDF", "No sign-up"],
          primary: "Download the diagnostic",
          secondary: "Preview the questions",
          image: {
            src: "/assets/images/guides/clipboard-action-plan.webp",
            alt: "",
            width: 883,
            height: 1202,
          },
        },
      },
      {
        id: "readiness",
        number: "02",
        tone: "#9e2c0e",
        title: "Check organisational readiness",
        description: "Identify gaps before investing in new learning.",
        resource: {
          kind: "Checklist",
          title: "AI-Era Learning Readiness Checklist",
          description:
            "18 essential checks to identify gaps before investing in new learning.",
          meta: ["18 checks", "10 minutes", "PDF"],
          primary: "Download the checklist",
          secondary: "Preview the 18 checks",
          image: {
            src: "/assets/images/guides/task-checklist.webp",
            /* Decorative: the panel beside it states the title, format and
               length, so announcing the cover again would only be noise. */
            alt: "",
            width: 860,
            height: 1267,
          },
        },
      },
      {
        id: "pilot",
        number: "03",
        tone: "#4f6b4a",
        title: "Launch a conversation intelligence pilot",
        description: "Plan, test and measure in the field.",
        resource: {
          kind: "Pilot guide",
          title: "Conversation Intelligence Pilot Guide",
          description:
            "A practical guide to scope, launch and measure a controlled frontline pilot.",
          meta: ["15 min read", "PDF", "Field guide"],
          primary: "Download the pilot guide",
          secondary: "Preview the pilot stages",
          image: {
            src: "/assets/images/guides/task-pilot-guide.webp",
            alt: "",
            width: 880,
            height: 1115,
          },
        },
      },
      {
        id: "plan",
        number: "04",
        tone: "#b36a08",
        title: "Turn the framework into a 30-day plan",
        description: "Move from design into disciplined action.",
        resource: {
          kind: "Action plan",
          title: "30-Day Capability Framework Action Plan",
          description:
            "A week-by-week roadmap for moving from framework design into disciplined action.",
          meta: ["4 weeks", "PDF", "Roadmap"],
          primary: "Download the action plan",
          secondary: "Preview the 30-day roadmap",
          /* No render of its own: only three clipboard images were supplied
             for four tasks, and the one whose sheet reads "30-Day Action Plan"
             is used as task 01's per the design's middle image. */
          image: null,
        },
      },
    ],
  },
  /**
   * SECTION 3 — the complete resource library.
   *
   * A search box and format filters on the left, the resource rows on the
   * right. Filtering and search run client-side over the list below: there are
   * five resources and no backend, so shipping them all and narrowing in the
   * browser is both simpler and faster than a request per keystroke.
   *
   * The format counts in the sidebar are DERIVED from `items`, not written out,
   * so they cannot drift as resources are added.
   */
  library: {
    eyebrow: "The full library",

    /** Split so the lines break where the design breaks them on lg+. */
    headline: ["Browse every guide,", "checklist and playbook."],

    description:
      "Practical resources for capability, learning and frontline performance—free to download and ready to use.",

    /** Shown top-right, beside the headline. */
    freeLabel: "Free to download",

    searchPlaceholder: "Search the library",
    filterLabel: "Filter by format",
    allLabel: "All resources",
    sortLabel: "Show newest first",

    /** Shown under the rows. */
    note: "More field-tested resources are being developed.",

    /** Empty state, when a search or filter matches nothing. */
    emptyLabel: "No resources match that search.",

    /**
     * Format tones, keyed by each resource's `format`. Sampled from the
     * design, which colours the category tag by format rather than per row.
     */
    tones: {
      playbook: "#ab4eee",
      diagnostic: "#f86438",
      checklist: "#819b78",
      "pilot-guide": "#a371d5",
      "action-plan": "#eda53a",
    },

    /** Plural labels for the sidebar filters, keyed by format. */
    formatLabels: {
      playbook: "Playbooks",
      diagnostic: "Diagnostics",
      checklist: "Checklists",
      "pilot-guide": "Pilot guides",
      "action-plan": "Action plans",
    },

    /**
     * The resources, in the design's order. `format` drives both the sidebar
     * filters and the tag colour; `tag` is the singular label on the row.
     *
     * Every row points at the same placeholder for now — the PDFs are not in
     * the repo yet, and five links that all 404 would be worse than one honest
     * anchor. Swap `href` per item once the files land.
     */
    items: [
      {
        id: "roles-to-readiness",
        format: "playbook",
        tag: "Playbook",
        title: "From Roles to Readiness",
        description:
          "Build an AI-era competency framework in 10 practical steps.",
        meta: ["42 pages", "PDF", "Templates included"],
        image: {
          src: "/assets/images/guides/library-playbook.webp",
          alt: "",
          width: 204,
          height: 125,
        },
        href: "#library",
      },
      {
        id: "quality-test",
        format: "diagnostic",
        tag: "Diagnostic",
        title: "Competency Framework Quality Test",
        description:
          "Assess whether your framework is clear, observable and ready to use.",
        meta: ["12 questions", "10 min", "PDF"],
        image: {
          src: "/assets/images/guides/library-diagnostic.webp",
          alt: "",
          width: 204,
          height: 106,
        },
        href: "#library",
      },
      {
        id: "readiness-checklist",
        format: "checklist",
        tag: "Checklist",
        title: "AI-Era Learning Readiness Checklist",
        description:
          "Identify organisational gaps before investing in new learning.",
        meta: ["18 checks", "10 min", "PDF"],
        image: {
          src: "/assets/images/guides/library-checklist.webp",
          alt: "",
          width: 204,
          height: 106,
        },
        href: "#library",
      },
      {
        id: "pilot-guide",
        format: "pilot-guide",
        tag: "Pilot guide",
        title: "Conversation Intelligence Pilot Guide",
        description: "Plan, launch and measure a controlled frontline pilot.",
        meta: ["15 min read", "PDF", "Field guide"],
        image: {
          src: "/assets/images/guides/library-pilot-guide.webp",
          alt: "",
          width: 204,
          height: 106,
        },
        href: "#library",
      },
      {
        id: "action-plan",
        format: "action-plan",
        tag: "Action plan",
        title: "30-Day Capability Framework Action Plan",
        description: "Move from framework design into disciplined action.",
        meta: ["4 weeks", "PDF", "Roadmap"],
        image: {
          src: "/assets/images/guides/library-action-plan.webp",
          alt: "",
          width: 204,
          height: 104,
        },
        href: "#library",
      },
    ],
  },
} as const;
