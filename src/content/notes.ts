/**
 * LURNYNOTES PAGE CONTENT
 * ---------------------------------------------------------------------------
 * Copy for the LurnyNotes product page at /platform/notes.
 *
 * Section 1 is defined below; further sections are added here as their designs
 * land. Copy is verbatim from the supplied "LurnyNotes text content.txt".
 */

export const notes = {
  /** Page-level metadata, consumed by the route's `generateMetadata`. */
  meta: {
    title: "LurnyNotes — Conversations to Next Steps",
    description:
      "Capture client meetings, distil what matters and move instantly from decisions to action items, follow-ups and ready-to-send emails.",
    path: "/platform/notes",
  },

  hero: {
    eyebrow: "LurnyNotes",

    /**
     * Split so the lines break where the design breaks them on lg+. The design
     * sets an amber full stop after the last word, so the headline is split
     * from its terminal period rather than carrying it inline.
     */
    headline: ["Turn every conversation", "into clear next steps"],

    description:
      "Capture client meetings, distil what matters and move instantly from decisions to action items, follow-ups and ready-to-send emails.",

    actions: {
      primary: { label: "Book a demo", href: "/demo" },
      secondary: { label: "See how it works", href: "#how-it-works" },
    },

    /**
     * The three notes under the hero, each behind its own outlined icon.
     * `accent` keys into the tone map in NotesHero.
     */
    features: [
      {
        icon: "capture",
        title: "Capture what matters",
        description: "Clear meeting and conversation summaries.",
        accent: "violet",
      },
      {
        icon: "action",
        title: "Turn decisions into action",
        description: "Owners, due dates and next steps.",
        accent: "amber",
      },
      {
        icon: "send",
        title: "Follow up with confidence",
        description: "Ready-to-edit messages and emails.",
        accent: "green",
      },
    ],

    /**
     * The photograph behind the product panel.
     *
     * PLACEHOLDER: the design shows a man at a laptop in a dark office; no
     * such photograph was supplied, so this reuses the LurnySaathi context
     * shot — see scripts/build-notes-assets.cjs. The `alt` is empty because
     * the image is decorative here: the panel in front of it carries the
     * meaning, and describing a stand-in would misdescribe what ships.
     */
    backdrop: {
      src: "/assets/images/notes/hero-backdrop.webp",
      alt: "",
      width: 1672,
      height: 941,
    },

    /**
     * The product panel. Drawn in markup rather than shipped as an image so it
     * stays sharp at every density — see NotesPanel.tsx.
     */
    panel: {
      appInitial: "N",
      title: "Client Meeting · Quarterly Review",

      summary: {
        title: "Conversation summary",
        body: "Discussed Q2 performance, budget realignment, and roadmap priorities. Agreed to focus on customer onboarding improvements and Q3 launch timeline.",
      },

      decisions: {
        title: "Key decisions",
        items: [
          "Reallocate 10% of budget to onboarding enhancements",
          "Delay mobile app launch to September",
          "Pilot new onboarding flow with Segment A customers",
        ],
      },

      actions: {
        title: "Action items",
        /** `tone` keys into the avatar colours in NotesPanel. */
        items: [
          {
            label: "Share updated onboarding plan",
            initials: "MK",
            owner: "Maya K.",
            due: "May 24",
            tone: "violet",
          },
          {
            label: "Prepare Q3 launch timeline",
            initials: "AC",
            owner: "Alex C.",
            due: "May 28",
            tone: "amber",
          },
          {
            label: "Set up pilot with Segment A",
            initials: "JR",
            owner: "Jordan R.",
            due: "May 30",
            tone: "green",
          },
        ],
        cta: "Generate follow-up",
      },

      /** The draft panel floating over the main one's right edge. */
      draft: {
        title: "Follow-up draft",
        to: { label: "To:", value: "Client Team" },
        subject: {
          label: "Subject:",
          value: "Follow-up from today's meeting",
        },
        body: [
          "Hi team,",
          "Thanks for the productive discussion today.",
          "Please find below a summary of key decisions and next steps.",
          "Let me know if anything needs adjusting.",
        ],
        signOff: ["Best regards,", "Your Name"],
        actions: { secondary: "Edit", primary: "Send" },
      },

      /** The sync pill beneath the draft. */
      sync: { lines: ["Synced with", "Microsoft Teams"] },
    },
  },

  /**
   * SECTION 2 — the problem.
   *
   * Rendered by the shared ProblemSection, as on the five other product pages.
   * LurnyNotes' design differs only in its accents — blue rather than the
   * brand violet, with an amber full stop closing the headline — both of which
   * are props on that component.
   */
  problem: {
    eyebrow: "The problem LurnyNotes solves",

    /** Split so the lines break where the design breaks them on lg+. */
    headline: [
      "Important conversations",
      "happen every day. Too",
      "much gets lost afterwards",
    ],

    description:
      "Client meetings create decisions, commitments and next steps. But when people rely on hurried notes and memory, summaries arrive late, actions scatter across inboxes and follow-ups lose context.",

    items: [
      {
        title: "The real meaning gets lost in manual notes",
        description:
          "People divide their attention between listening and typing. LurnyNotes turns the conversation into a concise, structured summary.",
      },
      {
        title: "Actions disappear across notes and inboxes",
        description:
          "Owners, commitments and deadlines are easy to miss. LurnyNotes identifies action items and organises them into a clear follow-through list.",
      },
      {
        title: "Follow-ups take too long to compose",
        description:
          "Employees reconstruct the discussion before they can respond. LurnyNotes drafts contextual messages and emails while the conversation is still fresh.",
      },
      {
        title: "Meeting context stays trapped in the meeting",
        description:
          "Decisions and customer insight rarely reach the tools where work continues. LurnyNotes connects with Microsoft Teams so notes and next steps stay within the workflow.",
      },
    ],
  },

  /**
   * SECTION 3 — context-aware email support.
   *
   * The statement on the left with three capability notes, and on the right a
   * flow diagram: incoming email → context check → drafted reply in Teams.
   */
  context: {
    eyebrow: "Context-aware email support",

    /** Split so the lines break where the design breaks them on lg+. */
    headline: ["Reply faster.", "With the full context."],

    description:
      "LurnyNotes studies the conversation history and your approved knowledge base to draft timely, relevant and more accurate replies—right inside Microsoft Teams.",

    /**
     * The three capability notes, each behind its own cyan line icon. The
     * icons are the supplied artwork, converted by
     * scripts/build-notes-context-assets.cjs.
     */
    features: [
      {
        label: "Understands the conversation",
        icon: {
          src: "/assets/images/notes/context-understands.webp",
          width: 62,
          height: 61,
        },
      },
      {
        label: "Uses approved organisational knowledge",
        icon: {
          src: "/assets/images/notes/context-knowledge.webp",
          width: 62,
          height: 58,
        },
      },
      {
        label: "Prepares a reply for review",
        icon: {
          src: "/assets/images/notes/context-review.webp",
          width: 62,
          height: 62,
        },
      },
    ],

    /**
     * The flow diagram.
     *
     * Shipped as ONE image rather than rebuilt in markup — see the note in
     * scripts/build-notes-context-assets.cjs for why. Its `alt` describes the
     * FLOW rather than transcribing the mockup's text: the three stages are
     * the point, and the drafted reply inside it is illustrative filler that
     * would only be noise read aloud.
     */
    diagram: {
      src: "/assets/images/notes/context-flow.webp",
      alt: "An incoming email is checked against approved sources, then a reply is drafted inside Microsoft Teams.",
      width: 1071,
      height: 668,
    },
  },

  /**
   * SECTION 4 — conversation to action.
   *
   * The statement on the left with three capability notes, and on the right a
   * workflow diagram: the meeting note, the actions it produces and the
   * follow-up it drafts.
   */
  action: {
    eyebrow: "Conversation to action",

    /** Split so the lines break where the design breaks them on lg+. */
    headline: ["Every meeting ends", "with clarity, ownership", "and momentum"],

    description:
      "LurnyNotes turns client conversations into structured summaries, clear action items and ready-to-send follow-ups—so important commitments do not disappear once the meeting ends.",

    /**
     * The three capability notes. Each carries a title AND a description here,
     * unlike section 3's single-line features — so this section renders them
     * as its own list rather than reusing that markup.
     *
     * The icons are the supplied artwork, converted by
     * scripts/build-notes-action-assets.cjs. They already include the rounded
     * square around the glyph, so nothing draws a box around them.
     */
    features: [
      {
        title: "Understand what mattered",
        description:
          "Capture the discussion, key decisions, concerns and customer expectations.",
        icon: {
          src: "/assets/images/notes/action-understand.webp",
          width: 70,
          height: 73,
        },
      },
      {
        title: "Turn decisions into ownership",
        description:
          "Identify action items, responsible people and agreed timelines.",
        icon: {
          src: "/assets/images/notes/action-ownership.webp",
          width: 70,
          height: 73,
        },
      },
      {
        title: "Keep the conversation moving",
        description:
          "Prepare an accurate follow-up while the discussion is still fresh.",
        icon: {
          src: "/assets/images/notes/action-moving.webp",
          width: 70,
          height: 73,
        },
      },
    ],

    /**
     * The workflow diagram.
     *
     * Shipped as ONE image — see the note in
     * scripts/build-notes-action-assets.cjs. Its `alt` describes what the
     * arrangement SHOWS rather than transcribing the mockup's sample text,
     * which is illustrative filler and would only be noise read aloud.
     */
    diagram: {
      src: "/assets/images/notes/action-flow.webp",
      alt: "A completed meeting note producing a list of actions with owners and due dates, and a drafted follow-up message ready for review.",
      width: 959,
      height: 716,
    },
  },
} as const;
