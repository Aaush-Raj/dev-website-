/**
 * LURNYMAGIC PAGE CONTENT
 * ---------------------------------------------------------------------------
 * Copy for the LurnyMagic product page at /platform/magic.
 *
 * Section 1 is defined below; further sections are added here as their designs
 * land.
 *
 * As on the LurnyPulse page, the hero's product cards are DRAWN rather than
 * shipped as a flat screenshot, so the values below are the data the
 * illustration renders from — not captions describing a picture.
 */

export const magic = {
  /** Page-level metadata, consumed by the route's `metadata` export. */
  meta: {
    title: "LurnyMagic — AI Content Creation",
    description:
      "Transform a document, webpage, video or prompt into multilingual microlessons, storybooks, videos, quizzes and interactive practice—in minutes.",
    path: "/platform/magic",
  },

  hero: {
    /**
     * One eyebrow, split at the separator the design sets in amber, so the
     * bullet can be styled and hidden from screen readers — which would
     * otherwise announce it as "bullet".
     */
    eyebrow: { product: "LurnyMagic", label: "AI content creation" },

    /**
     * Split so the lines break where the design breaks them on lg+.
     *
     * The final line ends with a full stop the design sets in amber. It is
     * kept out of the string so it can be coloured without splitting the word
     * — see the `.` span in MagicHero.
     */
    headline: [
      "Turn knowledge",
      "into learning people",
      "actually use",
    ] as const,

    description:
      "Transform a document, webpage, video or prompt into multilingual microlessons, storybooks, videos, quizzes and interactive practice—in minutes.",

    actions: {
      primary: { label: "Book a demo", href: "/demo" },
      secondary: { label: "See Magic in action", href: "/demo" },
    },

    /**
     * THE CREATE PANEL
     *
     * The violet card in the middle of the illustration. Its input and button
     * are DRAWINGS of controls, not controls — see MagicCreatePanel for why.
     */
    panel: {
      /** Split so the source type can be set in amber, as the design does. */
      title: { lead: "Create a microlesson from", source: "web page" },
      description:
        "Easily convert any Webpage into a Microlesson by copying and pasting its URL into the box below and click on 'CREATE' to unleash the magic",
      placeholder: "Paste your URL here",
      action: "Create",
    },

    /**
     * THE THREE OUTPUT CARDS
     *
     * What one source becomes. Each is drawn, and the connectors from the
     * panel to each card are drawn too — see MagicOutputs.
     */
    outputs: {
      storybook: {
        tag: "AI Storybook",
        title: "Reverse Mortgage",
        xp: "20 XP",
        learners: "0",
        /**
         * Placeholder artwork supplied with the design.
         *
         * TODO(assets): swap for a real storybook panel before launch — this
         * is a stock illustration standing in for generated content, and it
         * shows a child's homework scene rather than the financial topic the
         * card is titled with.
         */
        image: {
          src: "/assets/images/magic/storybook-cover.webp",
          /**
           * Decorative: it is placeholder art inside a drawn product card,
           * and describing stand-in imagery would tell a screen-reader user
           * about the placeholder rather than the product.
           */
          alt: "",
          width: 900,
          height: 600,
        },
      },

      video: {
        tag: "LurnyFlix Video",
        /** The design shows the scrubber part-way through a short clip. */
        elapsed: "0:27",
        duration: "1:23",
        /** Fraction of the track filled, matching the times above. */
        progress: 0.33,
        /**
         * Placeholder clip supplied with the design.
         *
         * TODO(assets): swap for a real LurnyFlix sample before launch.
         *
         * Re-encoded from the 5MB source to 286KB at 960px — see the note in
         * MagicVideoCard for how it is played.
         */
        media: {
          src: "/assets/video/magic-demo.mp4",
          poster: "/assets/images/magic/video-poster.webp",
          width: 960,
          height: 540,
        },
      },

      practice: {
        tag: "Interactive Practice",
        title: "Fire Safety Steps Challenge",
        meta: "Drag Drop · Beginner",
        instruction:
          "Drag each action to the correct step in the fire safety approach.",
        /**
         * The five draggable steps. `tone` keys the chip colour in
         * MagicOutputs — the design gives each a different one.
         */
        steps: [
          { label: "Identify Hazards", tone: "violet" },
          { label: "People in Danger", tone: "blue" },
          { label: "Evaluate Risks", tone: "green" },
          { label: "Record Findings", tone: "amber" },
          { label: "Review & Revise", tone: "violet" },
        ],
      },
    },
  },
} as const;
