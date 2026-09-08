/**
 * LURNYEVENTS PAGE CONTENT
 * ---------------------------------------------------------------------------
 * Copy for the LurnyEvents PRODUCT page at /platform/events.
 *
 * Distinct from content/events.ts, which is the Webinars & Events page at
 * /resources/events — same word, different pages. This file is named
 * lurny-events to keep that boundary obvious at the import site.
 *
 * Section 1 is defined below; further sections are added here as their designs
 * land.
 *
 * A note on the hero's `console` block: like the LurnyPulse page, and unlike
 * LurnyPitch's real exported screenshots, this product shot is DRAWN — the
 * journey rail, the capacity meter, the agenda and the record card are all
 * markup and CSS. So the values below are not captions describing a picture;
 * they are the data the illustration renders from. Change `registered` and the
 * capacity meter moves with it.
 *
 * The figures are illustrative product copy, not a real customer's event.
 */

export const lurnyEvents = {
  /** Page-level metadata, consumed by the route's `metadata` export. */
  meta: {
    title: "LurnyEvents — Instructor-Led and Blended Learning, End to End",
    description:
      "Bring workshops, virtual sessions and blended programmes into one connected experience—from registration and reminders to attendance, recognition and learning that continues.",
    path: "/platform/events",
  },

  /**
   * SECTION 1 — the hero.
   *
   * The statement on the left, the LurnyEvents console on the right with the
   * learning-record card overlapping its lower corner.
   */
  hero: {
    /** Split at the separator the design sets between the two runs. */
    eyebrow: { lead: "LurnyEvents", trail: "Events & blended learning" },

    /** Split so the lines break where the design breaks them on lg+. */
    headline: [
      "Make every learning",
      "event count—before,",
      "during and after.",
    ],

    description:
      "Bring workshops, virtual sessions and blended programmes into one connected experience—from registration and reminders to attendance, recognition and learning that continues.",

    actions: {
      primary: { label: "See it in action", href: "/contact" },
      /* Points at a section further down this page, which is specified in the
         supplied copy but not yet built. */
      secondary: { label: "Explore the lifecycle", href: "#lifecycle" },
    },

    /** The three capability marks along the foot of the column. */
    marks: ["ILT & VILT", "Attendance & reminders", "Certificates & CPD"],

    /**
     * THE CONSOLE. Imitation product UI, so it is aria-hidden and Uncopyable:
     * the copy on the left carries the section's meaning, and a screen reader
     * should not have to wade through a fake dashboard to reach it.
     */
    console: {
      brand: "LurnyEvents",
      nav: ["My events", "Calendar", "Attendance", "Insights"],
      action: "+ Create event",

      /** The event the console is showing. */
      event: {
        title: "Customer Service Excellence",
        meta: "Facilitated workshop · Aug 26, 2026 · Bengaluru & Online",
        status: "Registration open",
      },

      /**
       * The four-stage journey rail. `state` drives the dot's colour: done
       * stages are violet, the current one amber, the last one still grey.
       */
      journey: {
        title: "Event journey",
        stages: [
          { label: "Invite", note: "Sent", state: "done" },
          { label: "Register", note: "86 learners", state: "done" },
          { label: "Attend", note: "Next Tuesday", state: "current" },
          { label: "Continue", note: "Follow-through", state: "todo" },
        ],
        /** The nudge banner under the rail. */
        nudge: {
          title: "1 pre-work activity due before the session",
          note: "Nudge sent to 14 learners",
        },
      },

      /** The stats panel beside the journey. */
      glance: {
        title: "At a glance",
        registered: { label: "Registered", value: 86 },
        capacity: { label: "Capacity", value: 100 },
        format: { label: "Session format", value: "In-person + virtual" },
        cpd: "2 CPD hours available",
      },

      /** The agenda strip along the foot of the console. */
      agenda: {
        title: "Session agenda",
        rows: [
          { time: "09:30", label: "Opening and customer context" },
          {
            time: "10:15",
            label: "Practise: handling challenging conversations",
          },
        ],
        action: "View participants",
      },

      /** The card that overlaps the console's lower-right corner. */
      record: {
        title: "Learning record updated",
        note: "Attendance + CPD hours",
        headline: "Certificate ready to issue",
        subject: "Customer Service Excellence",
      },
    },
  },

  /**
   * SECTION 2 — the problem LurnyEvents solves.
   *
   * Rendered by the shared ProblemSection, the same layout the LurnyPitch,
   * LurnyPulse, LurnyChat, LurnyMagic and LurnySaathi pages use — this design
   * is identical to theirs apart from the copy, so there is no second copy of
   * the markup. Everything specific to this page is the text below, taken
   * verbatim from the supplied 2_lurnyevents_problem_section_text.txt.
   */
  problem: {
    eyebrow: "The problem LurnyEvents solves",

    /** One entry per line, as the design breaks them on lg+. */
    headline: [
      "When events are disconnected,",
      "learning cannot prove",
      "its impact.",
    ],

    description:
      "Workshops and webinars may be scheduled and delivered\u2014but when planning, targeting, attendance and follow-through live apart, L&D cannot reliably show who needed the intervention, who truly participated or what it changed.",

    items: [
      {
        title: "The right people are not always in the room",
        description:
          "Invitations are often sent by hierarchy, availability or manual nomination. Without connecting an event to role requirements and capability gaps, the people who would benefit most can be missed.",
      },
      {
        title: "Registration creates a list\u2014not a ready audience",
        description:
          "Calendar invites and meeting links manage logistics, but they do not connect pre-work, reminders, capacity, approvals and learner context into one purposeful journey.",
      },
      {
        title: "Attendance is too weak to be trusted as evidence",
        description:
          "A manual register can say someone was present. It cannot reliably capture actual participation, partial attendance or audit-trailed exceptions\u2014especially in virtual sessions.",
      },
      {
        title: "The value of the session disappears after it ends",
        description:
          "Feedback, CPD credit, certificates, learning records and capability evidence are usually handled separately, if at all. The organisation is left with an event completed\u2014but little proof of learning carried forward.",
      },
    ],
  },

  /**
   * SECTION 3 — the LurnyEvents lifecycle.
   *
   * A header, then three stage cards joined by dashed connectors. Each card
   * carries a small product vignette under its copy, and each vignette is a
   * different shape — a dark event-setup panel, a live check-in with a dial,
   * a learning record — so they are typed per stage rather than forced into
   * one generic slot. See LurnyEventsLifecycle for why none of the supplied
   * card PNGs ship.
   */
  lifecycle: {
    eyebrow: "The LurnyEvents lifecycle",

    /** Split so the lines break where the design breaks them on lg+. */
    headline: ["One event. A complete", "learning loop."],

    description:
      "LurnyEvents keeps the experience connected at every stage\u2014so administration is simpler, participation is stronger and the outcome is visible long after the session ends.",

    cta: { label: "Explore the workflow in detail", href: "#workflow" },

    /**
     * The three stages. `vignette.kind` selects which panel is drawn under the
     * copy; the fields beside it are that panel's data.
     */
    stages: [
      {
        number: "01",
        tone: "violet",
        title: "Prepare",
        description:
          "Build the event, set the audience and make every learner ready to participate.",
        vignette: {
          kind: "setup",
          label: "Event setup",
          title: "Customer Service Excellence",
          chips: ["Aug 26 · 9:30", "100 seats"],
          /** Drives the bar's width, and the count beside it. */
          registered: 86,
          capacity: 100,
          note: "86 registered",
        },
      },
      {
        number: "02",
        tone: "amber",
        title: "Deliver",
        description:
          "Bring the room, the facilitator and every moment of participation into one flow.",
        vignette: {
          kind: "live",
          label: "Live session · in progress",
          title: "Quick check-in",
          note: "78 of 86 learners present",
          present: 78,
          total: 86,
        },
      },
      {
        number: "03",
        tone: "green",
        title: "Continue",
        description:
          "Turn attendance into recognition, follow-up learning and evidence of progress.",
        vignette: {
          kind: "record",
          title: "Learning record updated",
          note: "Attendance + 2 CPD hours",
          footer: "Certificate ready to issue",
        },
      },
    ],
  },

  /**
   * SECTION 4 — book a LurnyEvents demo.
   *
   * The pitch on the left, the booking form on a card to the right. The form
   * is the shared LeadForm — same fields, validation and success state as every
   * other page's — so only the copy below differs. Its submit is still not
   * wired to any destination; that TODO is one fix for the whole site rather
   * than one per page. See components/ui/LeadForm.tsx.
   */
  demo: {
    eyebrow: "Book a LurnyEvents demo",

    /** Split so the lines break where the design breaks them on lg+. */
    headline: [
      "Make every learning",
      "event count\u2014before,",
      "during and after.",
    ],

    description:
      "See how LurnyEvents connects event setup, targeted invitations, attendance, feedback and recognition into one continuous learning experience.",

    /** The two lines under the rule, each with a ringed icon. */
    points: [
      {
        icon: "clock",
        text: "30 minutes \u00b7 tailored to your learning operations",
      },
      {
        icon: "bubble",
        text: "See event setup, gap-based targeting and verified attendance in one session",
      },
    ],

    form: {
      name: {
        name: "fullName",
        label: "Full name",
        placeholder: "Your name",
        autoComplete: "name",
      },
      email: {
        name: "workEmail",
        label: "Work email",
        placeholder: "name@company.com",
        autoComplete: "email",
      },

      selectA: {
        name: "workforceSize",
        label: "Your workforce size",
        options: [
          "Select workforce size",
          "Under 500",
          "500 \u2013 2,000",
          "2,000 \u2013 10,000",
          "10,000 \u2013 50,000",
          "50,000+",
        ],
      },
      selectB: {
        name: "explore",
        label: "What would you like to explore?",
        options: [
          "ILT, VILT & blended learning",
          "Event setup and targeting",
          "Attendance and verification",
          "Certificates, CPD and records",
          "Something else",
        ],
      },

      detail: {
        name: "eventPriority",
        label: "Tell us about your event priority (optional)",
        placeholder:
          "e.g. Improve event readiness, attendance and follow-through",
        autoComplete: "off",
      },

      consent: {
        name: "sendGuide",
        label: "Send me a short guide to connected learning events.",
      },

      submit: "Book a LurnyEvents Demo",

      success: {
        title: "Request received.",
        description:
          "We will be in touch within one business day to arrange a time.",
      },

      errors: {
        name: "Please enter your name.",
        email: "Please enter your work email.",
        emailFormat: "Please enter a valid email address.",
      },

      /** {0} is replaced by the link below. */
      footnote: {
        text: "Prefer to talk first? {0}",
        links: [{ label: "Contact Sales.", href: "/contact" }],
      },
    },
  },
} as const;
