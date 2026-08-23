/**
 * SECTION 10 CONTENT — customer stories
 * ---------------------------------------------------------------------------
 * Three case-study cards, each with a photo, an industry label, two headline
 * metrics and the engines that powered the programme — closed by a pull quote
 * on a dark bar.
 *
 * The figures and the quote are illustrative marketing content, not live data.
 *
 * TODO(legal): named-customer claims and the attributed quote need sign-off
 * before launch, and the attribution should carry a real name and company
 * once one is cleared.
 */

/**
 * PLACEHOLDER images.
 *
 * These are the two dummy photos supplied with the design, which already live
 * in public/assets/images for the solutions and industries sections — the
 * files are byte-identical, so they are reused rather than duplicated.
 *
 * TODO(assets): replace with the real per-story photography. Each card has
 * its own `image` and `imageAlt`, so only the values change — and `imageAlt`
 * must describe the actual photo before launch.
 */
const PLACEHOLDER_A = "/assets/images/card-placeholder.jpg";
const PLACEHOLDER_B = "/assets/images/industry-placeholder.jpg";
const PLACEHOLDER_ALT = "";

export const stories = {
  eyebrow: "Customer stories",

  /** Split so the line breaks where the design breaks it on lg+. */
  headline: ["Capability programmes", "that show up in the work."] as const,

  description:
    "How enterprises across frontline, technical and regulated workforces turn learning into measurable readiness.",

  link: { label: "Explore all customer stories", href: "/customers" },

  /**
   * The three cards.
   *
   * `tone` drives the top rule, the industry label and the metric figures.
   * The design runs two violet cards and one amber, so the row has a single
   * point of emphasis rather than three competing ones.
   *
   * `engine` is the badge in the card foot: the engine that powered the
   * programme, plus the products alongside it.
   */
  items: [
    {
      industry: "Banking",
      client: "Multi-branch lender",
      title: "Building stronger branch capability at scale",
      href: "/customers/banking",
      image: PLACEHOLDER_A,
      imageAlt: PLACEHOLDER_ALT,
      tone: "brand",
      metrics: [
        { value: "38%", label: "Faster readiness" },
        { value: "2.1×", label: "Cross-sell rate" },
      ],
      engine: {
        icon: "pulse",
        name: "Powered by Pulse",
        tags: ["KxP", "Pitch"],
      },
    },
    {
      industry: "Telecom",
      client: "National operator",
      title: "Certifying field engineers on new network standards",
      href: "/customers/telecom",
      image: PLACEHOLDER_B,
      imageAlt: PLACEHOLDER_ALT,
      tone: "brand",
      metrics: [
        { value: "9,400", label: "Engineers certified" },
        { value: "6 wks", label: "End to end" },
      ],
      engine: {
        icon: "sparkle",
        name: "Powered by Magic",
        tags: ["KxP", "Saathi"],
      },
    },
    {
      industry: "Manufacturing",
      client: "Auto components",
      title: "Making critical SOPs usable on the shop floor",
      href: "/customers/manufacturing",
      image: PLACEHOLDER_A,
      imageAlt: PLACEHOLDER_ALT,
      tone: "accent",
      metrics: [
        { value: "31%", label: "Fewer safety incidents" },
        { value: "18", label: "Plants live" },
      ],
      engine: {
        icon: "sparkle",
        name: "Powered by Magic",
        tags: ["Saathi", "Chat"],
      },
    },
  ],

  /** The pull quote on the dark bar that closes the section. */
  quote: {
    text: "We stopped measuring course completion and started measuring whether capability was visible in the work.",
    attribution: ["— Learning Leader,", "Enterprise Customer"] as const,
  },
} as const;
