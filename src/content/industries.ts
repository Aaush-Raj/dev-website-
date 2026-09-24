/**
 * SECTION 7 CONTENT — solutions by industry
 * ---------------------------------------------------------------------------
 * Five industry cards presented as an expanding accordion: the active card is
 * roughly 1.4x the width of the others and carries an amber rule rather than
 * violet.
 *
 * THE PHOTOGRAPHS live in public/assets/images/industries/home, built by
 * scripts/build-industries-images.cjs from the same six sector shots the
 * /industries hero uses — shipped uncropped here because the accordion's
 * panels change shape as they expand; see the script for why.
 *
 * `imageAlt` is empty on purpose. Each photo is a mood shot behind a scrim
 * whose card already names the industry in its heading; describing the stock
 * scene ("a nurse talking to a patient") adds nothing a screen-reader user
 * can act on. The /industries hero makes the same call for the same six.
 */

const IMAGES = "/assets/images/industries/home";

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
      image: `${IMAGES}/bfsi.webp`,
      imageAlt: "",
    },
    {
      title: "Telecom",
      description: "Build technical readiness. Improve performance at scale.",
      href: "/industries/telecom",
      image: `${IMAGES}/telecom.webp`,
      imageAlt: "",
    },
    {
      title: "Healthcare",
      description: "Elevate clinical capability. Drive quality and compliance.",
      href: "/industries/healthcare",
      image: `${IMAGES}/healthcare.webp`,
      imageAlt: "",
    },
    {
      title: "Manufacturing",
      description: "Enable safe operations. Build skills that scale.",
      href: "/industries/manufacturing",
      image: `${IMAGES}/manufacturing.webp`,
      imageAlt: "",
    },
    {
      title: "Professional Services",
      description: "Build advisory excellence. Deliver client impact.",
      href: "/industries/professional-services",
      image: `${IMAGES}/professional-services.webp`,
      imageAlt: "",
    },
  ],
} as const;
