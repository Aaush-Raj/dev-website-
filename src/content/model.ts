/**
 * SECTION 8 CONTENT — one connected capability model
 * ---------------------------------------------------------------------------
 * A hub-and-spoke diagram: a central role card surrounded by the four engines
 * that read from and write back to it.
 *
 * The sample figures are illustrative marketing content, not live data.
 */

export const model = {
  eyebrow: "One connected capability model",

  /** Split so the final phrase can carry the amber underline. */
  /**
   * Split so the closing phrase carries the amber rule on its own line, as in
   * the design. Rendered with the two parts as separate blocks on xl+.
   */
  headline: ["One definition of", "capability. Every", "engine works"] as const,
  underlined: "from it.",

  description:
    "Lurny starts with the role: the knowledge, skills and behaviours that define great performance. Every learning experience, practice signal and insight then connects back to that same standard.",

  /** The central role card. */
  role: {
    title: "Relationship Manager",
    chip: "Role capability model",
    dimensions: [
      {
        label: "Knowledge",
        description: "Understand client needs, products, regulation and risk.",
        icon: "book",
        /** Filled pips out of 5. */
        level: 4,
      },
      {
        label: "Skills",
        description:
          "Build relationships, uncover needs, advise and negotiate.",
        icon: "tools",
        level: 4,
      },
      {
        label: "Behaviours",
        description: "Act with integrity, show empathy, take ownership.",
        icon: "people",
        level: 4,
      },
    ],
    score: { label: "Readiness score", value: 78, outOf: 100 },
  },

  /**
   * The four engines. `position` places each on the desktop grid and sets the
   * direction of its connecting arrow relative to the hub.
   */
  engines: [
    {
      name: "LurnyPulse",
      tagline: "assesses proficiency",
      icon: "pulse",
      position: "top-left",
      panelLabel: "Proficiency overview",
      kind: "bars",
      bars: [
        { label: "Product knowledge", value: 78 },
        { label: "Objection handling", value: 64 },
        { label: "Compliance", value: 72 },
      ],
      cta: "View assessment",
    },
    {
      name: "LurnyMagic",
      tagline: "creates targeted learning",
      icon: "sparkle",
      position: "top-right",
      panelLabel: "Recommended for you",
      kind: "lessons",
      lessons: [
        {
          title: "Advanced needs discovery",
          meta: "Microlesson • 6 min",
          tone: "plum",
        },
        {
          title: "Regulatory updates",
          meta: "Microlesson • 4 min",
          tone: "blue",
        },
        {
          title: "Client conversation skills",
          meta: "Practice • Scenario",
          tone: "ink",
        },
      ],
      cta: "Assign learning",
    },
    {
      name: "LurnyPitch",
      tagline: "captures real-work evidence",
      icon: "bubble",
      position: "bottom-left",
      panelLabel: "Recent submissions",
      kind: "submissions",
      submissions: [
        {
          title: "Client call: new account",
          meta: "Submitted • 2h ago",
          status: "document",
        },
        {
          title: "Proposal walkthrough",
          meta: "Reviewed • 1d ago",
          status: "approved",
        },
        {
          title: "Objection handling clip",
          meta: "Submitted • 2d ago",
          status: "pending",
        },
      ],
      cta: "Submit evidence",
    },
    {
      name: "LurnySense",
      tagline: "turns signals into next actions",
      icon: "bars",
      position: "bottom-right",
      panelLabel: "Next best actions",
      kind: "actions",
      actions: [
        {
          title: "Strengthen objection handling",
          priority: "High",
          tone: "high",
          icon: "person",
        },
        {
          title: "Reinforce compliance",
          priority: "Medium",
          tone: "medium",
          icon: "shield",
        },
        {
          title: "Practice discovery skills",
          priority: "Medium",
          tone: "medium",
          icon: "target",
        },
      ],
      cta: "View actions",
    },
  ],

  footer: {
    title: "One role standard.",
    description: "Connected learning, practice and performance intelligence.",
  },
} as const;
