/**
 * SECTION 6 CONTENT — solutions by business need
 * ---------------------------------------------------------------------------
 * The homepage's three lead solutions, rendered with the same
 * SolutionNeedCard the solutions page uses for its own "by business need"
 * grid.
 *
 * THE CARDS USED TO CARRY A PHOTO. They shared one placeholder image between
 * them, so the row showed the same stock photo three times; the card now
 * leads with a drawn icon tile and a corner ornament instead, which is the
 * treatment the solutions page already shipped. `image`/`imageAlt` and the
 * `accent` top-rule colour went with it.
 *
 * `icon`, `corner`, `number` and `href` below match this solution's entry in
 * content/solutions-page.ts — the same three solutions lead both grids, and
 * a reader arriving from either should meet the same card.
 */

export const solutions = {
  eyebrow: "Solutions by business need",

  /** Split to match the design, which breaks after "built". */
  headline: ["Capability solutions built", "around the work that matters."],

  link: { label: "Explore all solutions", href: "/solutions" },

  items: [
    {
      title: "Frontline Performance",
      description:
        "Branch, sales, service and field teams — capability, knowledge and conversation quality in one view.",
      tags: ["Pulse", "Saathi", "Pitch"],
      number: "01",
      icon: "frontline",
      corner: "softQuarter",
      href: "/solutions/frontline",
    },
    {
      title: "Sales Enablement",
      description:
        "Product knowledge, simulation practice, customer-conversation analysis, coaching and cross-sell.",
      tags: ["Magic", "Pitch", "Biz"],
      number: "02",
      icon: "sales",
      corner: "roundedPanel",
      href: "/solutions/sales-enablement",
    },
    {
      title: "Capability Building",
      description:
        "Define role expectations, assess proficiency, identify gaps and create individual GrowthPaths.",
      tags: ["Pulse", "KxP"],
      number: "03",
      icon: "capability",
      corner: "dotMatrixPanel",
      href: "/solutions/capability-building",
    },
    /*
     * THE SECOND ROW IS COMMENTED OUT — the section shows one row of three.
     *
     * The grid is three across on lg, so these were cards 4-6. They are kept
     * rather than deleted: restoring the full set is uncommenting this block,
     * and the copy is still the reviewed wording. "Explore all solutions"
     * below the grid still reaches every one of them on /solutions.
     *
     * Their fields were updated alongside the live three when the cards moved
     * to SolutionNeedCard, so this block still compiles if uncommented — it
     * referenced the deleted PLACEHOLDER_IMAGE until then.
     */
    // {
    //   title: "Knowledge Management",
    //   description:
    //     "Make SOPs, policies and product knowledge conversational at the moment of need.",
    //   tags: ["Chat", "Magic"],
    //   number: "04",
    //   icon: "knowledge",
    //   corner: "nestedArcs",
    //   href: "/solutions/knowledge-management",
    // },
    // {
    //   title: "Compliance Readiness",
    //   description:
    //     "Policy distribution, declarations, assessments, evidence and audit-ready reporting.",
    //   tags: ["KxP", "Pulse"],
    //   number: "05",
    //   icon: "compliance",
    //   corner: "hatching",
    //   href: "/solutions/compliance",
    // },
    // {
    //   title: "Employee Onboarding",
    //   description:
    //     "Role-specific journeys, knowledge support, practice, assessment and readiness measurement.",
    //   tags: ["KxP", "Chat", "Events"],
    //   number: "06",
    //   icon: "onboarding",
    //   corner: "partialQuarter",
    //   href: "/solutions/onboarding",
    // },
  ],
} as const;
