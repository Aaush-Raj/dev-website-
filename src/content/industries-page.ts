/**
 * INDUSTRIES PAGE CONTENT
 * ---------------------------------------------------------------------------
 * Copy for the Industries page at /industries.
 *
 * Distinct from content/industries.ts, which is the HOMEPAGE's industry
 * accordion — same subject, different section, different shape. This file is
 * the standalone page; sections are added here as their designs land.
 */

export const industriesPage = {
  /** Page-level metadata, consumed by the route's `metadata` export. */
  meta: {
    title: "Industries",
    description:
      "Every industry has different roles, workflows, customer moments and performance expectations. Lurny connects knowledge, capability and real-world execution around the way your people actually work.",
    path: "/industries",
  },

  /**
   * SECTION 1 — the hero.
   *
   * Copy on the left, a six-card mosaic on the right over an orbital-ring
   * background.
   */
  hero: {
    eyebrow: "Industries",

    /**
     * Split so the lines break where the design breaks them on lg+.
     *
     * The final line ends with a full stop the design sets in amber. It is
     * kept out of the string so it can be coloured without splitting the
     * word — see the `.` span in IndustriesHero.
     */
    headline: ["Built for the realities", "of your industry"] as const,

    description:
      "Every industry has different roles, workflows, customer moments and performance expectations. Lurny connects knowledge, capability and real-world execution around the way your people actually work.",

    actions: {
      /* Both are in-page or existing routes — see the note in the hero. */
      primary: { label: "Explore industries", href: "#industries" },
      secondary: { label: "Book a demo", href: "/demo" },
    },

    /**
     * THE MOSAIC
     *
     * Six industries in a 3x2 grid. `tone` is the colour of the rule beside
     * each label, sampled from the design — one per industry, so a card is
     * identifiable at a glance before its label is read.
     *
     * `offset` lifts or drops a card off the row's baseline, which is what
     * gives the grid its staggered, floating look rather than a plain table.
     * Expressed in rem and applied only from lg, where the three columns
     * actually sit side by side.
     */
    cards: [
      {
        label: "BFSI",
        tone: "#e4d300",
        offset: 0.75,
        image: {
          src: "/assets/images/industries/bfsi.webp",
          /**
           * Decorative: the six photos are a mood strip behind the labels,
           * and the label already names the industry. Describing each stock
           * photo would only add noise for a screen-reader user.
           */
          alt: "",
        },
      },
      {
        label: "Telecom",
        tone: "#8637c3",
        offset: 0,
        image: {
          src: "/assets/images/industries/telecom.webp",
          alt: "",
        },
      },
      {
        label: "Healthcare",
        tone: "#5891f1",
        offset: 0.35,
        image: {
          src: "/assets/images/industries/healthcare.webp",
          alt: "",
        },
      },
      {
        label: "Manufacturing",
        tone: "#e1931d",
        offset: 0,
        image: {
          src: "/assets/images/industries/manufacturing.webp",
          alt: "",
        },
      },
      {
        label: "Professional Services",
        tone: "#c04ae0",
        offset: 0.55,
        image: {
          src: "/assets/images/industries/professional-services.webp",
          alt: "",
        },
      },
      {
        label: "Retail",
        tone: "#5891f1",
        offset: 0.9,
        image: {
          src: "/assets/images/industries/retail.webp",
          alt: "",
        },
      },
    ],
  },

  /**
   * SECTION 2 — the industries we serve.
   *
   * A split heading — headline left, description right — over a 3x2 grid of
   * industry cards.
   *
   * `icon` keys the glyph in IndustryIcons. Each is a violet line drawing
   * with ONE amber element, which is how the design distinguishes them from
   * the flat icon sets used elsewhere on the site.
   *
   * The numbers are content rather than a CSS counter: the design shows them
   * zero-padded, and a counter would force the padding into a pseudo-element
   * where it could not be read or translated.
   */
  serve: {
    eyebrow: "Industries we serve",

    /**
     * Split so the lines break where the design breaks them on lg+.
     *
     * The second line ends with a full stop the design sets in amber. It is
     * kept out of the string so it can be coloured without splitting the
     * word — see the `.` span in IndustriesServe.
     */
    headline: [
      "Different operating realities.",
      "One connected capability platform",
    ] as const,

    description:
      "From customer-facing teams and field engineers to healthcare professionals and shop-floor employees, Lurny adapts to the roles, knowledge and performance expectations that define each industry.",

    items: [
      {
        number: "01",
        icon: "bank",
        title: "Banking & Financial Services",
        description:
          "Customer conversations, product knowledge, compliance and branch performance.",
      },
      {
        number: "02",
        icon: "tower",
        title: "Telecom",
        description:
          "Technical readiness, field execution, customer support and rapidly changing product knowledge.",
      },
      {
        number: "03",
        icon: "heartbeat",
        title: "Healthcare",
        description:
          "Process adherence, continuous knowledge, patient experience and role readiness.",
      },
      {
        number: "04",
        icon: "factory",
        title: "Manufacturing",
        description:
          "SOP adoption, safety, operational capability and accessible shop-floor learning.",
      },
      {
        number: "05",
        icon: "briefcase",
        title: "Professional Services",
        description:
          "Client readiness, expertise development, institutional knowledge and consistent delivery.",
      },
      {
        number: "06",
        icon: "storefront",
        title: "Retail",
        description:
          "Product knowledge, customer service, frontline consistency and sales performance.",
      },
    ],
  },
} as const;
