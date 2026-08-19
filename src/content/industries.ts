/**
 * SECTION 7 CONTENT — solutions by industry
 * ---------------------------------------------------------------------------
 * Five industry cards presented as an expanding accordion: the active card is
 * roughly 1.4x the width of the others and carries an amber rule rather than
 * violet.
 */

/**
 * PLACEHOLDER image, shared by every card.
 *
 * TODO(assets): replace with a distinct photo per industry. Each entry already
 * has its own `image` and `imageAlt`, so only the values change — and
 * `imageAlt` must describe the real photo before launch.
 */
const PLACEHOLDER_IMAGE = "/assets/images/industry-placeholder.jpg";
const PLACEHOLDER_ALT = "";

export const industries = {
  eyebrow: "Solutions by industry",

  headline: "Built for the realities of your industry.",

  description:
    "From regulated frontline teams to distributed technical workforces, Lurny connects capability to the moments that matter.",

  link: { label: "Explore all industries", href: "/industries" },

  /** Per-card call to action. */
  cardLink: "Explore",

  items: [
    {
      title: "Banking & Financial Services",
      description:
        "Strengthen capability. Ensure compliance. Deliver trusted outcomes.",
      href: "/industries/banking",
      image: PLACEHOLDER_IMAGE,
      imageAlt: PLACEHOLDER_ALT,
    },
    {
      title: "Telecom",
      description: "Build technical readiness. Improve performance at scale.",
      href: "/industries/telecom",
      image: PLACEHOLDER_IMAGE,
      imageAlt: PLACEHOLDER_ALT,
    },
    {
      title: "Healthcare",
      description: "Elevate clinical capability. Drive quality and compliance.",
      href: "/industries/healthcare",
      image: PLACEHOLDER_IMAGE,
      imageAlt: PLACEHOLDER_ALT,
    },
    {
      title: "Manufacturing",
      description: "Enable safe operations. Build skills that scale.",
      href: "/industries/manufacturing",
      image: PLACEHOLDER_IMAGE,
      imageAlt: PLACEHOLDER_ALT,
    },
    {
      title: "Professional Services",
      description: "Build advisory excellence. Deliver client impact.",
      href: "/industries/professional-services",
      image: PLACEHOLDER_IMAGE,
      imageAlt: PLACEHOLDER_ALT,
    },
  ],
} as const;
