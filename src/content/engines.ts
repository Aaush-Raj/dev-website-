/**
 * SECTION 4 CONTENT — the nine engines
 * ---------------------------------------------------------------------------
 * Product cards. `icon` selects a component from
 * components/sections/engines/EngineIcons.tsx.
 */

export const engines = {
  eyebrow: "Platform",

  /**
   * Split across two lines to match the design, which breaks after "one".
   * Rendered with a <br> on lg+ and allowed to wrap naturally below that.
   */
  headline: ["Nine engines on one", "platform"] as const,

  description:
    "Each engine is useful alone. Deployed together they share one capability model, one content pipeline and one analytics layer.",

  items: [
    {
      name: "LurnyPulse",
      category: "Capability intelligence",
      description:
        "Role frameworks, conversational assessments, proficiency baselines and GrowthPath.",
      icon: "radar",
    },
    {
      name: "LurnyMagic",
      category: "AI content creation",
      description:
        "Microlessons, assessments, video, podcasts, simulations, SCORM and multilingual transformation.",
      icon: "document",
    },
    {
      name: "Lurny KxP",
      category: "Learning & distribution",
      description:
        "Journeys, playlists, gamification, nudges, certifications, analytics and mobile learning.",
      icon: "graph",
    },
    {
      name: "LurnyChat",
      category: "Knowledge & support",
      description:
        "Desk, Talk, Coach, Minds and Guru — voice, text and image assistance on enterprise knowledge.",
      icon: "chat",
    },
    {
      name: "LurnyPitch",
      category: "Conversation intelligence",
      description:
        "Capture, transcribe and score customer conversations. Missed opportunities and AI coaching.",
      icon: "waveform",
    },
    {
      name: "LurnyEvents",
      category: "Instructor-led training",
      description:
        "Classroom, virtual and blended programmes: nominations, attendance, feedback, CPD credits.",
      icon: "calendar",
    },
    {
      name: "LurnySaathi",
      category: "Mobile companion",
      description:
        "Voice-first, multilingual assistant for frontline and field teams: learn, ask, practise, perform.",
      icon: "mobile",
    },
    {
      name: "LurnyBiz",
      category: "Action intelligence",
      description:
        "CRM and business data, single customer view, next-best actions and manager dashboards.",
      icon: "path",
    },
    {
      name: "LurnySense",
      category: "Conversational analytics",
      description:
        "Ask questions of your workforce data. Surface trends, capability gaps, engagement signals and actions to take next.",
      icon: "insight",
    },
  ] as const,
} as const;
