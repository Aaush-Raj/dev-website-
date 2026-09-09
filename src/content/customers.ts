/**
 * CUSTOMER STORIES CONTENT
 * ---------------------------------------------------------------------------
 * Copy for the customer stories index at /customers.
 *
 * This is the LANDING page for stories across sectors. The individual stories
 * live on their own routes — the BFSI one at /resources/case-studies — and
 * this page is what links out to them.
 *
 * Copy is transcribed from Customer_Stories_Text_By_Section.txt as supplied,
 * including its British spellings ("organisations"), which match the rest of
 * the site.
 */

export const customers = {
  /** Page-level metadata, consumed by the route's `metadata` export. */
  meta: {
    title: "Customer stories",
    description:
      "How organisations across industries are using Lurny to build capability, make learning accessible and support people in their everyday work.",
    path: "/customers",
  },

  hero: {
    eyebrow: "Customer stories",
    headline: "Learning that shows up in the real world.",
    description:
      "How organisations across industries are using Lurny to build capability, make learning accessible and support people in their everyday work.",

    /**
     * The CTA scrolls to the stories section rather than navigating away —
     * "Explore the stories" means the ones further down this page.
     */
    cta: { label: "Explore the stories", href: "#stories" },

    /**
     * The sector rail along the foot of the hero. These are the four sectors
     * section 2 covers, so each one jumps to its card rather than to a route
     * of its own — the individual stories are reached from those cards.
     *
     * The four hrefs match the `id` on each entry in `stories.items` below;
     * that pairing is what makes the rail work, so the two lists move together.
     */
    sectors: [
      { label: "BFSI / Financial Services", href: "#story-bfsi" },
      { label: "NGO / Social Sector", href: "#story-ngo" },
      { label: "ICT / Telecom Services", href: "#story-ict" },
      { label: "Professional Services", href: "#story-professional" },
    ],

    /**
     * The paper sculpture. It ships as a photograph because it is a rendered
     * physical object — the one class of art markup cannot reproduce.
     *
     * Its charcoal field is baked in rather than transparent (the supplied
     * asset notes flag that a transparency pass failed), so the section ground
     * is matched to it and the crop is tight enough that the seam does not
     * read. `alt` is empty: the sculpture is decorative, and the headline
     * beside it already carries the meaning.
     */
    image: {
      src: "/assets/images/customers/hero-quotation.webp",
      alt: "",
    },
  },

  /**
   * Section 2: the four story cards.
   *
   * TWO SHAPES OF CHIP, deliberately. The BFSI card's chips are FIGURES —
   * "25 branches", "9,328 conversations" — and the other three are plain
   * phrases. A chip therefore carries an optional `value`, and the card renders
   * the number in the display face when one is present. Flattening the figures
   * into strings would lose that distinction and, worse, would let scope numbers
   * read as ordinary feature labels.
   *
   * The BFSI card is the only one whose `href` points at a real page today; the
   * other three are marked below.
   */
  stories: {
    eyebrow: "In practice",
    headline: "Stories from the workplace",
    description:
      "Explore how organisations are connecting learning with the realities of everyday work.",

    items: [
      {
        /** Anchor target for the hero's sector rail. */
        id: "story-bfsi",
        category: "BFSI / Financial Services",
        headline:
          "From customer conversations to missed-opportunity intelligence",
        description:
          "Conversation analysis brings customer needs, missed opportunities and coaching priorities into clearer view.",
        chips: [
          { value: "25", label: "branches" },
          { value: "9,328", label: "conversations" },
        ],
        cta: { label: "Read the story", href: "/resources/case-studies" },
        image: {
          src: "/assets/images/customers/story-bfsi.webp",
          alt: "A bank employee talking with a customer across a desk in a branch office.",
        },
      },
      {
        id: "story-ngo",
        category: "NGO / Social Sector",
        headline: "Turning a kitchen television into a learning kiosk",
        description:
          "Short visual and voice-led SOP learning for kitchen teams, using a familiar screen in their workplace.",
        chips: [
          { label: "Existing TV screen" },
          { label: "No smartphones required" },
        ],
        /** TODO(routes): this story has no page yet. */
        cta: { label: "Read the story", href: "/customers" },
        image: {
          src: "/assets/images/customers/story-ngo.webp",
          alt: "Three kitchen workers in hairnets watching a handwashing demonstration on a wall-mounted television.",
        },
      },
      {
        id: "story-ict",
        category: "ICT / Telecom Services",
        headline:
          "Connecting learning to technical roles and professional growth",
        description:
          "From integrated learning access to development pathways shaped around the work technical teams do.",
        chips: [
          { label: "Intranet access" },
          { label: "Role-based development" },
        ],
        /** TODO(routes): this story has no page yet. */
        cta: { label: "Read the story", href: "/customers" },
        image: {
          src: "/assets/images/customers/story-ict.webp",
          alt: "Two engineers reviewing a diagram together in a server room.",
        },
      },
      {
        id: "story-professional",
        category: "Professional Services",
        headline: "Giving existing training content a useful second life",
        description:
          "A practical approach to turning existing training videos and documents into focused microlessons and microcourses.",
        chips: [
          { label: "Existing videos & documents" },
          { label: "Microlessons & microcourses" },
        ],
        /** TODO(routes): this story has no page yet. */
        cta: { label: "Read the story", href: "/customers" },
        image: {
          src: "/assets/images/customers/story-professional.webp",
          alt: "Two colleagues at a desk reviewing a training video on a laptop.",
        },
      },
    ],
  },

  /**
   * Section 3: the closing call to action.
   *
   * The page opens and closes on the same near-black ground, with the paper
   * sculptures and corner filaments bracketing the four story cards between
   * them. This is the last thing on the page before the site-wide footer CTA.
   */
  cta: {
    headline: "What could this look like in your organisation?",
    description:
      "Every workplace has its own challenges. Let’s explore where learning and capability could make a practical difference in yours.",

    /**
     * TODO(routes): /demo does not exist yet — but the nav's "Book a Demo"
     * button and the site-wide footer CTA both already point there, so this
     * matches them rather than inventing a third destination to fix later.
     */
    action: { label: "Let’s talk about your challenge", href: "/demo" },

    /**
     * The paper speech bubbles. Unlike the hero sculpture this asset arrived
     * with genuine RGBA transparency, so it needs no ground matching — but its
     * ground shadow was dropped in the cutout, and the design has one, so the
     * component draws that back in CSS.
     */
    image: {
      src: "/assets/images/customers/cta-bubbles.webp",
      alt: "",
    },
  },
} as const;
