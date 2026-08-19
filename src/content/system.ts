/**
 * SECTION 3 CONTENT — the connected system
 * ---------------------------------------------------------------------------
 * The cycle diagram and the capability columns beneath it.
 */

export const system = {
  eyebrow: "From learning activity to business readiness",

  /**
   * Split so the final word can carry the amber underline, as in the design.
   * `headline` is the lead-in; `underlined` is the emphasised tail.
   */
  headline: "One connected system for building capability—and proving it in",
  underlined: "performance.",

  description:
    "Lurny connects role expectations, learning, practice, real-work evidence and action intelligence—so leaders can see where capability stands and what to improve next.",

  /** Centre label of the cycle diagram. */
  centre: "Lurny",

  /**
   * The four stages, in clockwise order starting at the top. Order matters —
   * the diagram positions them by index, and it reads as a cycle.
   */
  cycle: [
    {
      title: "Define",
      description:
        "Clarify role expectations and the capability required to succeed.",
      icon: "target",
    },
    {
      title: "Build",
      description:
        "Create learning, practice and support that build real capability.",
      icon: "book",
    },
    {
      title: "Enable",
      description: "Deliver trusted guidance and practice in the flow of work.",
      icon: "person",
    },
    {
      title: "Improve",
      description: "Capture evidence, measure performance and close gaps.",
      icon: "growth",
    },
  ] as const,

  /** The four capability columns below the diagram. */
  capabilities: [
    {
      title: "Define what good looks like",
      description:
        "Build measurable role, competency and proficiency frameworks.",
    },
    {
      title: "Create and deliver at speed",
      description:
        "Turn knowledge into learning, practice and support in every language.",
    },
    {
      title: "Support work as it happens",
      description:
        "Put trusted guidance, coaching and simulations in the flow of work.",
    },
    {
      title: "Turn evidence into action",
      description:
        "Connect performance signals to targeted coaching and capability decisions.",
    },
  ] as const,
} as const;
