/**
 * SECTION 4 CONTENT — the twelve engines
 * ---------------------------------------------------------------------------
 * Product cards. `icon` selects a component from
 * components/sections/engines/EngineIcons.tsx.
 *
 * `href` is OPTIONAL. Eleven of the twelve have a page; LurnySim does not
 * exist as a route yet, so its card carries no link rather than a dead one —
 * the same treatment the platform page's grid already gives it. Add the href
 * here when /platform/sim is built and the card becomes clickable.
 */

export const engines = {
  eyebrow: "Platform",

  /**
   * Split across two lines to match the design, which breaks after "one".
   * Rendered with a <br> on lg+ and allowed to wrap naturally below that.
   */
  headline: ["Twelve engines on one", "platform"] as const,

  description:
    "Each engine is useful alone. Deployed together they share one capability model, one content pipeline and one analytics layer.",

  items: [
    {
      name: "LurnyPulse",
      category: "Capability intelligence",
      description:
        "Role frameworks, conversational assessments, proficiency baselines and GrowthPath.",
      icon: "radar",
      href: "/platform/pulse",
    },
    {
      name: "LurnyMagic",
      category: "AI content creation",
      description:
        "Microlessons, assessments, video, podcasts, simulations, SCORM and multilingual transformation.",
      icon: "document",
      href: "/platform/magic",
    },
    {
      name: "Lurny KxP",
      category: "Learning & distribution",
      description:
        "Journeys, playlists, gamification, nudges, certifications, analytics and mobile learning.",
      icon: "graph",
      href: "/platform/kxp",
    },
    {
      name: "LurnyFlix",
      category: "AI video creation",
      description:
        "Create AI videos and interactive learning experiences, without a studio or a production team.",
      icon: "flix",
      href: "/platform/flix",
    },
    {
      name: "LurnySim",
      category: "Role-play & practice",
      description:
        "Build confidence through realistic role-play: practise the conversation before it happens.",
      icon: "sim",
      /* No href: /platform/sim does not exist yet, so the card renders
         unlinked rather than pointing at a 404. */
    },
    {
      name: "LurnyChat",
      category: "Knowledge & support",
      description:
        "Desk, Talk, Coach, Minds and Guru — voice, text and image assistance on enterprise knowledge.",
      icon: "chat",
      href: "/platform/chat",
    },
    {
      name: "LurnyPitch",
      category: "Conversation intelligence",
      description:
        "Capture, transcribe and score customer conversations. Missed opportunities and AI coaching.",
      icon: "waveform",
      href: "/platform/pitch",
    },
    {
      name: "LurnyEvents",
      category: "Instructor-led training",
      description:
        "Classroom, virtual and blended programmes: nominations, attendance, feedback, CPD credits.",
      icon: "calendar",
      href: "/platform/events",
    },
    {
      name: "LurnySaathi",
      category: "Mobile companion",
      description:
        "Voice-first, multilingual assistant for frontline and field teams: learn, ask, practise, perform.",
      icon: "mobile",
      href: "/platform/saathi",
    },
    {
      name: "LurnyBiz",
      category: "Action intelligence",
      description:
        "CRM and business data, single customer view, next-best actions and manager dashboards.",
      icon: "path",
      href: "/platform/biz",
    },
    {
      name: "LurnySense",
      category: "Conversational analytics",
      description:
        "Ask questions of your workforce data. Surface trends, capability gaps, engagement signals and actions to take next.",
      icon: "insight",
      href: "/platform/sense",
    },
    {
      name: "LurnyNotes",
      category: "Meeting intelligence",
      description:
        "Turn meetings into learning, shared knowledge and grounded email drafts.",
      icon: "notes",
      href: "/platform/notes",
    },
  ] as const,
} as const;
