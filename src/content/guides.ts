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
   * ARTWORK. Three of the four tasks have a supplied clipboard render. Task
   * 01's was never delivered on its own, so it is cropped out of the
   * section-1 hero cluster, where the cover is visible apart from its right
   * margin — see TASK_ONE_CROP in scripts/build-guides-hero.cjs. Being a
   * narrow strip rather than a full clipboard, it is presented differently in
   * the component: cropped tall rather than fitted whole.
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
            src: "/assets/images/guides/task-quality-test.webp",
            alt: "",
            width: 240,
            height: 670,
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
          image: {
            src: "/assets/images/guides/task-action-plan.webp",
            alt: "",
            width: 883,
            height: 1202,
          },
        },
      },
    ],
  },
} as const;
