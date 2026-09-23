/**
 * HERO CONTENT
 * ---------------------------------------------------------------------------
 * Copy for the homepage hero, kept out of the component so wording can change
 * without touching markup.
 *
 * THE HERO IS A CAROUSEL
 * `heroSlides` holds one entry per slide, in order. Slide 1 is the original
 * dashboard hero and stays the default; slide 2 is the photographic "moments
 * that matter" slide. A third is specified and will be appended here — the
 * carousel reads the array's length, so adding it is a content change alone.
 *
 * `visual` names which composition the slide renders. The two are genuinely
 * different scenes rather than variations on one, so each has its own
 * component and the slide only says which to use.
 *
 * `headline` is split into lines because each design sets a deliberate break
 * with one word underlined. Rendering it as one string and letting it wrap
 * would lose that composition at most viewport widths.
 */

export interface HeroSlide {
  /** Stable key, also used for the carousel's slide labels. */
  id: string;
  eyebrow: string;
  /** Rendered as separate lines on desktop; joins naturally on small screens. */
  headline: readonly string[];
  /** Index of the line carrying the amber underline. */
  underlinedLineIndex: number;
  /**
   * OPTIONAL: underline just this phrase, rather than the whole line.
   *
   * Slides 2 and 3 underline their closing line, which is a short phrase in
   * its own right. Slide 1 is one long sentence whose emphasis belongs on the
   * product category inside it, so the rule has to fit a substring.
   *
   * The phrase must appear verbatim in the line at `underlinedLineIndex`,
   * including its non-breaking hyphens — the component splits on it, and a
   * mismatch would silently fall back to underlining the whole line.
   */
  underlinedPhrase?: string;
  description: string;
  actions: {
    primary: { label: string; href: string };
    secondary: { label: string; href: string };
  };
  /** OPTIONAL line under the actions. Slide 2's design has one; slide 1 does not. */
  footnote?: string;
  /**
   * Sets the headline a step smaller than the shared `text-hero`.
   *
   * Opt-in, for a headline materially longer than the three-or-four short
   * lines the size assumes. Slide 1 names a long product category in full, and
   * at the shared size it ran to six lines on a wide screen and NINE at
   * 1024px, where the copy column narrows but the font does not — which pushed
   * the buttons off the fold and, because every slide is mounted at once and
   * the carousel holds the tallest, stretched the other two slides with it.
   *
   * A flag rather than a change to the token: the token is shared with slides
   * 2 and 3, whose headlines are the length it was chosen for.
   */
  longHeadline?: boolean;
  /** Which composition to render on the right. */
  visual: "dashboard" | "moments" | "engines";
  /**
   * OPTIONAL photograph filling the WHOLE section behind the slide.
   *
   * Slides 2 and 3 are built on a photographed room: in both designs the image
   * runs edge to edge and the copy sits on top of it, rather than the photo
   * occupying a card in the right column. Slide 1 has no photograph — its
   * ground is the page's own gradient — so this is optional.
   */
  backdrop?: {
    src: string;
    alt: string;
    width: number;
    height: number;
    /** `object-position`, so each room's subject stays in frame as it crops. */
    focus: string;
  };
}

export const heroSlides: readonly HeroSlide[] = [
  {
    id: "capability",
    eyebrow: "AI-native capability-to-performance platform",
    /*
     * ONE ENTRY: the headline is a single sentence, so it wraps rather than
     * being hand-broken. The other slides break theirs into short lines by
     * hand, because each is a phrase whose breaks the design chose; this one
     * names a long product category in full, and forced breaks stranded
     * orphans once the column narrowed.
     *
     * ONE NON-BREAKING HYPHEN (U+2011), in "AI-Native" only. With an ordinary
     * hyphen the browser treats it as a wrap opportunity and sets "AI-" /
     * "Native" across two lines, which reads as two words rather than one
     * compound. It renders identically and simply does not break.
     *
     * "Capability-to-Performance" IS ALSO UNBREAKABLE, for the same reason.
     * Sizing the type so the term fits (see the clamp in HeroSlide) is not
     * enough on its own: it fits the column, but it does not START at a line
     * beginning, so the browser still broke it mid-term after "first
     * AI-Native". Non-breaking hyphens keep it whole, and the clamp
     * guarantees the whole thing has room.
     *
     * This was the wrong call while the type was 56px — the term was wider
     * than the column and overflowed under the dashboard. It is only safe
     * because the clamp now sizes to fit.
     */
    headline: [
      "The world's first AI\u2011Native Capability\u2011to\u2011Performance Platform.",
    ],
    /*
     * The rule goes under the product category rather than the whole
     * sentence — that is the phrase the slide is there to land.
     * Non-breaking hyphens, so it matches the headline exactly.
     */
    underlinedLineIndex: 0,
    underlinedPhrase: "Capability\u2011to\u2011Performance",
    /*
     * Still needed after the headline was shortened. Measured without it: at
     * 1024px, where the copy column narrows but `text-hero` stays at 72px,
     * the sentence ran to seven lines, overflowed its own box by 10px and put
     * the buttons at 973px. See the flag's own note above.
     */
    longHeadline: true,
    description:
      "Lurny connects role expectations, learning, practice, real-work evidence and action intelligence—so leaders can see where capability stands and what to improve next.",
    actions: {
      primary: { label: "Book a Demo", href: "/demo" },
      secondary: { label: "Explore the platform", href: "/platform" },
    },
    visual: "dashboard",
  },
  {
    id: "moments",
    eyebrow: "AI-native capability-to-performance platform",
    headline: ["Help your people", "thrive in the", "moments that", "matter."],
    underlinedLineIndex: 3,
    description:
      "Bring learning, practical guidance and personalised coaching into the flow of work—so your people can put what they know into action.",
    actions: {
      primary: { label: "Book a Demo", href: "/demo" },
      secondary: { label: "Explore the platform", href: "/platform" },
    },
    footnote: "Start with the engines you need. Grow with one connected platform.",
    visual: "moments",
    backdrop: {
      src: "/images/home/hero/slide-2-scene.webp",
      /* Decorative: a photograph of someone working, and every claim the slide
         makes is set in the copy and the panels over it. */
      alt: "",
      width: 1729,
      height: 910,
      focus: "72% center",
    },
  },
  {
    id: "engines",
    eyebrow: "AI-native capability-to-performance platform",
    headline: ["Start with what", "you need. Connect", "what comes", "next."],
    underlinedLineIndex: 3,
    description:
      "Connect the Lurny engines your organisation needs—from content creation and learning to conversation intelligence and business insights—within your existing systems.",
    actions: {
      primary: { label: "Book a Demo", href: "/demo" },
      secondary: { label: "Explore the platform", href: "/platform" },
    },
    footnote: "Start with the engines you need. Grow with one connected platform.",
    visual: "engines",
    backdrop: {
      src: "/images/home/hero/slide-3-scene.webp",
      /* Decorative: an empty desk; the panels over it carry the meaning. */
      alt: "",
      width: 1729,
      height: 910,
      focus: "64% center",
    },
  },
] as const;

/**
 * SLIDE 2's THREE PANELS
 * ---------------------------------------------------------------------------
 * Built in markup rather than shipped as the supplied crops — see
 * scripts/build-hero-slide-assets.cjs for why.
 *
 * Each is a different shape: Learn is a lesson with a progress bar, Apply is a
 * two-turn exchange, Improve is a coaching focus with a chart. So each is its
 * own small component and this only carries the copy.
 */
export const heroMoments = {
  learn: {
    badge: "Learn",
    title: "Better customer conversations",
    meta: "Microlearning • 5 min",
    /** Percent complete on the progress bar. */
    progress: 42,
    thumb: {
      src: "/images/home/hero/slide-2-lesson.webp",
      /** Decorative: the lesson title sits directly beneath it. */
      alt: "",
      width: 216,
      height: 98,
    },
  },

  apply: {
    badge: "Apply",
    question: "How do I uncover what the customer needs?",
    answer:
      "Start with an open question. Ask what matters most, then explore why.",
  },

  improve: {
    badge: "Improve",
    title: "Turn insight into action",
    meta: "Next coaching focus",
    action: "Ask deeper discovery questions",
    link: "View coaching plan",
    chart: {
      src: "/images/home/hero/slide-2-chart.webp",
      /** Decorative: it is a small rising bar chart beside the title. */
      alt: "",
      width: 89,
      height: 69,
    },
  },
} as const;

/**
 * SLIDE 3's ENGINE CONSTELLATION
 * ---------------------------------------------------------------------------
 * Five engine panels plus an integrations bar, threaded by a connector.
 *
 * Built in markup rather than shipped as the supplied crops — see
 * scripts/build-hero-slide-assets.cjs. Each panel is a different shape, so each
 * is its own small component and this only carries the copy.
 */
export const heroEngines = {
  magic: {
    name: ["Lurny", "Magic"],
    tagline: "Create learning",
    subject: "Product knowledge",
    status: "Ready to publish",
    thumb: {
      src: "/images/home/hero/slide-3-magic.webp",
      /** Decorative: the subject is named beside it. */
      alt: "",
      width: 182,
      height: 111,
    },
  },

  pitch: {
    name: ["Lurny", "Pitch"],
    tagline: "Learn from conversations",
    duration: "00:24",
    insight: "Coaching opportunities",
  },

  kxp: {
    name: ["Lurny", "KxP"],
    tagline: "Deliver learning",
    label: "Recommended for you",
    courses: [
      {
        title: ["Customer", "Excellence"],
        thumb: {
          src: "/images/home/hero/slide-3-customer.webp",
          alt: "",
          width: 106,
          height: 69,
        },
      },
      {
        title: ["Product", "Enablement"],
        thumb: {
          src: "/images/home/hero/slide-3-product.webp",
          alt: "",
          width: 107,
          height: 69,
        },
      },
      {
        title: ["Leadership", "Essentials"],
        thumb: {
          src: "/images/home/hero/slide-3-leadership.webp",
          alt: "",
          width: 105,
          height: 69,
        },
      },
    ],
  },

  chat: {
    name: ["Lurny", "Chat"],
    tagline: "Guide in the moment",
    prompt: "How can I help?",
    reply: "Prepare for a customer meeting",
  },

  biz: {
    name: ["Lurny", "Biz"],
    tagline: "Turn insight into action",
    action: ["Recommended", "next steps"],
    /** The bar chart's heights, as percentages. Fixed so the server and the
        client render identically. */
    bars: [34, 48, 62, 88, 54],
  },

  integrations: {
    label: "Connected to your organisation",
    systems: ["SSO", "HRMS", "CRM"],
  },
} as const;
