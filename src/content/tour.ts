/**
 * SECTION 5 CONTENT — the product tour
 * ---------------------------------------------------------------------------
 * The video player and the step rail beneath it.
 *
 * The player's poster is a static illustration of the capability loop, built
 * from the `loop` data below. When the real video exists, `videoUrl` gets a
 * value and the poster becomes the thumbnail behind the play control.
 */

export const tour = {
  eyebrow: "Product tour",

  /** Split to match the design, which breaks after "turns". */
  headline: ["See how Lurny turns", "capability into performance."] as const,

  description:
    "Follow one role from competency definition and learning to practice, real-work evidence and the actions a manager can take next.",

  meta: {
    title: "4-minute guided tour",
    description: "See the complete capability loop in action.",
  },

  player: {
    /**
     * TODO(assets): set this to the tour video URL. While it is null the
     * play control renders disabled with an explanatory label, rather than
     * pretending to be a working button.
     */
    videoUrl: null as string | null,
    label: "Watch the product tour",
    duration: "04:00",
    caption: "A guided walk-through of the Lurny platform",
  },

  /** The five poster cards, left to right. */
  loop: {
    readiness: {
      label: "Role readiness",
      score: 78,
      outOf: 100,
      role: "Sales Manager",
      delta: "12 pts",
      deltaCaption: "vs last month",
    },
    competencies: {
      label: "Core competencies",
      axes: [
        "People\nLeadership",
        "Coaching",
        "Strategic\nThinking",
        "Execution\nExcellence",
        "Commercial\nAcumen",
      ],
      you: [0.78, 0.83, 0.68, 0.72, 0.75],
      benchmark: [0.94, 0.96, 0.88, 0.9, 0.92],
      legend: { you: "You", benchmark: "Role Benchmark" },
    },
    learning: {
      label: "Learning & practice",
      items: [
        {
          title: "Leading effective 1:1s",
          meta: "20 min • In progress",
          progress: 0.55,
          tone: "violet",
        },
        {
          title: "Practice: Coaching conversation",
          meta: "Role play",
          action: "Try it",
          tone: "amber",
        },
      ],
    },
    signal: {
      label: "Real-work signal",
      title: "Coaching conversation with Priya",
      chip: "Evidence captured",
      rows: [
        { label: "Impact", value: "High", tone: "positive" },
        { label: "Confidence", value: "Strong", tone: "positive" },
        { label: "Date", value: "May 12, 2024", tone: "neutral" },
      ],
    },
    action: {
      label: "Manager action",
      title: "Reinforce strengths and broaden scope",
      subtitle: "Suggested next steps",
      steps: ["Stretch assignment", "Peer coaching", "Review in 4 weeks"],
    },
  },

  /** The numbered rail beneath the player. */
  steps: [
    {
      title: "Define role capability",
      description: "Align on what great looks like for every role.",
    },
    {
      title: "Build & deliver learning",
      description: "Curate learning and experiences that build capability.",
    },
    {
      title: "Enable practice in the flow of work",
      description: "Make practice easy and relevant in the flow of work.",
    },
    {
      title: "Turn evidence into action",
      description: "Capture real-work evidence and act with confidence.",
    },
  ] as const,
} as const;
