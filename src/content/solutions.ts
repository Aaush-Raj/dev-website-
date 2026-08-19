/**
 * SECTION 6 CONTENT — solutions by business need
 * ---------------------------------------------------------------------------
 * Six solution cards, each with a photo, a short description and the product
 * tags that power it.
 */

/**
 * PLACEHOLDER image, shared by every card.
 *
 * TODO(assets): replace with a distinct photo per solution. Each entry's
 * `image` and `imageAlt` are already per-card, so only the values change —
 * and `imageAlt` must describe the real photo before launch, since it is what
 * screen-reader and no-image users get.
 */
const PLACEHOLDER_IMAGE = "/assets/images/card-placeholder.jpg";
const PLACEHOLDER_ALT = "";

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
      /** "amber" tints the card's top rule; everything else uses brand violet. */
      accent: "brand",
      image: PLACEHOLDER_IMAGE,
      imageAlt: PLACEHOLDER_ALT,
    },
    {
      title: "Sales Enablement",
      description:
        "Product knowledge, simulation practice, customer-conversation analysis, coaching and cross-sell.",
      tags: ["Magic", "Pitch", "Biz"],
      accent: "amber",
      image: PLACEHOLDER_IMAGE,
      imageAlt: PLACEHOLDER_ALT,
    },
    {
      title: "Capability Building",
      description:
        "Define role expectations, assess proficiency, identify gaps and create individual GrowthPaths.",
      tags: ["Pulse", "KxP"],
      accent: "brand",
      image: PLACEHOLDER_IMAGE,
      imageAlt: PLACEHOLDER_ALT,
    },
    {
      title: "Knowledge Management",
      description:
        "Make SOPs, policies and product knowledge conversational at the moment of need.",
      tags: ["Chat", "Magic"],
      accent: "brand",
      image: PLACEHOLDER_IMAGE,
      imageAlt: PLACEHOLDER_ALT,
    },
    {
      title: "Compliance Readiness",
      description:
        "Policy distribution, declarations, assessments, evidence and audit-ready reporting.",
      tags: ["KxP", "Pulse"],
      accent: "brand",
      image: PLACEHOLDER_IMAGE,
      imageAlt: PLACEHOLDER_ALT,
    },
    {
      title: "Employee Onboarding",
      description:
        "Role-specific journeys, knowledge support, practice, assessment and readiness measurement.",
      tags: ["KxP", "Chat", "Events"],
      accent: "brand",
      image: PLACEHOLDER_IMAGE,
      imageAlt: PLACEHOLDER_ALT,
    },
  ],
} as const;
