/**
 * PRICING PAGE CONTENT
 * ---------------------------------------------------------------------------
 * Copy for the pricing page at /pricing, transcribed VERBATIM from the
 * supplied `lurny-pricing` handoff package (index.html + its README).
 *
 * WHAT THE PACKAGE'S README ASKS US NOT TO INVENT, and which this file
 * therefore does not contain:
 *
 *   - NO PLAN-TO-ENGINE ENTITLEMENTS. The three plan cards carry learner and
 *     admin scale only. Which engines a plan includes is a commercial
 *     decision that has not been made, so no card claims one.
 *   - NO USAGE ALLOWANCES. No generation, rendering, conversation or storage
 *     numbers appear, and the word "unlimited" is never used.
 *   - NO "AVAILABLE NOW" BADGES. Only the four pilot engines, LurnyEvents
 *     ("In development") and LurnyBiz ("Register interest") carry a badge.
 *     The rest deliberately carry none, because availability has not been
 *     confirmed for them — do not add one without sign-off.
 *   - NO PARITY CLAIM ACROSS FLIX TOOLS. The "Editing options vary by
 *     creation tool" helper is load-bearing, not filler.
 *
 * The 126 feature and tool rows below are machine-extracted from the
 * package's markup rather than retyped, so no wording drifted in transit.
 *
 * TWO THINGS DIFFER FROM THE PACKAGE, both at the user's direction:
 *   - Its per-engine links pointed at placeholder `/products/*` paths that do
 *     not exist. Each engine that has a real route now links to it; the two
 *     that do not (Flix, Fabric) simply have no link rather than a dead one.
 *   - Its footer's ISO 27001 / SOC 2 / GDPR / DPDP text badges are omitted.
 *     The README calls them placeholders "not certification artwork", so they
 *     stay out until certification status is confirmed.
 */

/**
 * The shape of one engine in the catalogue.
 *
 * SEVERAL FIELDS ARE OPTIONAL BY DESIGN, and the optionality is meaningful
 * rather than incidental:
 *
 *   - `badge` is absent on the six engines whose availability has not been
 *     confirmed. Absent means "no claim made", not "available now".
 *   - `href` is absent for the two engines with no page of their own yet
 *     (Flix, Fabric) — better no link than a dead one.
 *   - `tools` and its headings appear only on LurnyFlix, the one engine whose
 *     panel opens with a grid of creation tools above its feature list.
 *
 * Declaring the type here rather than letting `as const` infer twelve
 * separate shapes is what lets a component read `engine.badge` at all: on a
 * bare `as const` union, a key missing from any one member is missing from
 * the union.
 */
export interface PricingEngine {
  id: string;
  name: string;
  /** Two-letter monogram. The package ships no per-engine icon set. */
  mark: string;
  group: string;
  descriptor: string;
  summary: string;
  /** Only where the source inventory confirms a status. */
  badge?: { tone: "pilot" | "dev" | "concept"; label: string };
  addLabel: string;
  toggleLabel: string;
  /** Only where a real product route exists today. */
  href?: string;
  /** LurnyFlix only. */
  toolsHeading?: string;
  tools?: readonly {
    name: string;
    /** The current application name, where the label differs from it. */
    note?: string;
    description: string;
  }[];
  featuresHeading?: string;
  helper?: string;
  features: readonly { name: string; description: string }[];
}

/**
 * The twelve catalogue engines, in the package's own order.
 *
 * Declared separately and typed as `PricingEngine[]` rather than being
 * inlined under the page's `as const`: that would infer twelve distinct
 * shapes, and a key absent from any one of them — `badge`, `href`, `tools` —
 * would then be absent from the union a component reads.
 *
 * Every row below is machine-extracted from the handoff package's markup, so
 * no wording drifted in transit.
 */
const pricingEngines: readonly PricingEngine[] = [
  {
    id: "pulse",
    name: "LurnyPulse",
    mark: "PU",
    group: "build-capability",
    descriptor: "Capability intelligence engine",
    summary:
      "Define what each role requires, understand individual strengths and gaps, and guide focused development.",
    badge: { tone: "pilot", label: "Pilot available" },
    addLabel: "Add to enquiry",
    toggleLabel: "View features",
    href: "/platform/pulse",
    features: [
      {
        name: "Role-based competency frameworks",
        description: "Define the capabilities required for each role.",
      },
      {
        name: "Knowledge, skills and behaviour anchors",
        description:
          "Describe what people need to know, demonstrate and apply at work.",
      },
      {
        name: "Proficiency levels",
        description:
          "Set clear progression levels and expectations for each role.",
      },
      {
        name: "Baseline assessments",
        description:
          "Establish an employee's starting point against role requirements.",
      },
      {
        name: "Check your Pulse",
        description: "Revisit capability through focused assessments.",
      },
      {
        name: "Scenario challenges",
        description:
          "Explore how employees apply knowledge and judgement in realistic situations.",
      },
      {
        name: "Competency gap analysis",
        description:
          "Identify the difference between assessed proficiency and role expectations.",
      },
      {
        name: "Capability profiles and radar charts",
        description:
          "See strengths, development gaps and progress at a glance.",
      },
      {
        name: "Personalised GrowthPaths",
        description:
          "Connect identified gaps with relevant learning and practice.",
      },
      {
        name: "Progress tracking",
        description: "Compare assessed capability over time.",
      },
      {
        name: "Team capability views",
        description:
          "Help managers identify team strengths and development priorities.",
      },
    ],
  },
  {
    id: "magic",
    name: "LurnyMagic",
    mark: "MA",
    group: "build-capability",
    descriptor: "AI learning creation engine",
    summary:
      "Create, adapt and organise learning experiences from your existing knowledge and source material.",
    addLabel: "Add to enquiry",
    toggleLabel: "View features",
    href: "/platform/magic",
    features: [
      {
        name: "Create from a prompt",
        description:
          "Start a learning draft by describing the topic and intended outcome.",
      },
      {
        name: "Create from source material",
        description:
          "Use supported PDFs, documents, web pages, YouTube links, images and audio as source material.",
      },
      {
        name: "Microlesson creation",
        description: "Turn a topic into concise, focused learning.",
      },
      {
        name: "Quizzes",
        description: "Create knowledge checks that reinforce learning.",
      },
      {
        name: "Assessments",
        description:
          "Build structured assessments around the knowledge being developed.",
      },
      {
        name: "Interactive learning",
        description:
          "Create activities that ask learners to explore, respond and participate.",
      },
      {
        name: "Storybooks",
        description:
          "Explain concepts through illustrated, sequential learning stories.",
      },
      {
        name: "Quests",
        description:
          "Organise learning activities into a purposeful sequence of challenges.",
      },
      {
        name: "Audio and podcast transformation",
        description:
          "Adapt learning material into supported audio experiences.",
      },
      {
        name: "Voice-over",
        description: "Add supported narration to learning content.",
      },
      {
        name: "Multilingual authoring",
        description: "Create or adapt learning in supported languages.",
      },
      {
        name: "Review and editing",
        description:
          "Refine generated drafts before making them available to learners.",
      },
      {
        name: "Microcourse and course assembly",
        description:
          "Bring individual learning artefacts together into structured learning.",
      },
      {
        name: "Playlists and journeys",
        description:
          "Organise learning around a topic, role or development objective.",
      },
      {
        name: "SCORM export",
        description:
          "Export supported learning packages for use in a compatible LMS.",
      },
    ],
  },
  {
    id: "flix",
    name: "LurnyFlix",
    mark: "FL",
    group: "build-capability",
    descriptor: "Video creation engine",
    summary:
      "Create videos from prompts, documents, presentations and links. Build character-led and comic-book-style content, or turn recordings into tutorials.",
    addLabel: "Add to enquiry",
    toggleLabel: "View features",
    toolsHeading: "Video creation tools",
    tools: [
      {
        name: "Create from Prompt",
        description:
          "Describe what you want and let AI prepare the script and video.",
      },
      {
        name: "Create Manually",
        description: "Build a template-based video from your own outline.",
      },
      {
        name: "From File Uploads",
        description: "Create videos using PDF, DOCX or PPTX documents.",
      },
      {
        name: "From PPT Only",
        description: "Turn PPTX or PPTM presentations into narrated videos.",
      },
      {
        name: "From Web / YouTube",
        description: "Turn a web page or YouTube link into a video.",
      },
      {
        name: "Character-led video creation",
        note: "Currently: LurnyFlix",
        description:
          "Create AI-generated videos with styled characters and training content.",
      },
      {
        name: "Comic Book Style",
        description: "Generate comic-book-style videos with narration.",
      },
      {
        name: "LurnyCam",
        description:
          "Turn screen recordings or raw videos into professional tutorials.",
      },
    ],
    featuresHeading: "Editing and production features",
    helper: "Editing options vary by creation tool.",
    features: [
      {
        name: "Script and scene drafts",
        description:
          "Generate a starting script and scene structure for review.",
      },
      {
        name: "Scene editing",
        description:
          "Refine scenes, on-screen text and narration using supported editing controls.",
      },
      {
        name: "Scene organisation",
        description:
          "Add, duplicate, delete and reorder scenes in the manual workflow.",
      },
      {
        name: "Layouts and templates",
        description: "Choose supported scene layouts and visual treatments.",
      },
      {
        name: "Stock and uploaded media",
        description:
          "Use supported stock visuals, uploaded images, video clips and logos.",
      },
      {
        name: "Presenter and avatar scenes",
        description:
          "Add a presenter to supported scenes and choose its placement.",
      },
      {
        name: "Project characters",
        description: "Create or select characters for the video project.",
      },
      {
        name: "Voice and music selection",
        description: "Choose supported narration voices and background music.",
      },
      {
        name: "Language selection",
        description:
          "Prepare content in supported languages for your audience.",
      },
      {
        name: "Landscape and portrait formats",
        description: "Create videos in 16:9 or 9:16 formats.",
      },
      {
        name: "Save and revise projects",
        description: "Save project changes and return to refine the video.",
      },
      {
        name: "Render and regenerate",
        description:
          "Turn the approved scene draft into the final video output.",
      },
      {
        name: "Playback and download",
        description: "Review and download completed videos where supported.",
      },
    ],
  },
  {
    id: "kxp",
    name: "LurnyKxP",
    mark: "KX",
    group: "build-capability",
    descriptor: "Knowledge experience engine",
    summary:
      "Bring learning discovery, structured programmes, assignments and progress into one learner experience.",
    addLabel: "Add to enquiry",
    toggleLabel: "View features",
    href: "/platform/kxp",
    features: [
      {
        name: "Learning discovery",
        description:
          "Help learners find relevant content and learning opportunities.",
      },
      {
        name: "Playlists",
        description: "Curate learning around a topic or need.",
      },
      {
        name: "Courses and microcourses",
        description: "Deliver structured learning in manageable stages.",
      },
      {
        name: "Learning journeys",
        description: "Guide people through a sequence of learning experiences.",
      },
      {
        name: "Learning assignments",
        description:
          "Assign relevant learning to selected users and audiences.",
      },
      {
        name: "Continue learning",
        description: "Help learners return to work already in progress.",
      },
      {
        name: "Quizzes and assessments",
        description: "Deliver knowledge checks and capture assessment results.",
      },
      {
        name: "XP and badges",
        description: "Recognise participation and achievement.",
      },
      {
        name: "Leaderboards and streaks",
        description:
          "Encourage continued participation through visible progress.",
      },
      {
        name: "Learner progress tracking",
        description:
          "Track participation and completion across learning activities.",
      },
      {
        name: "Learning analytics",
        description:
          "Give administrators visibility into engagement and learning progress.",
      },
      {
        name: "User, role and audience management",
        description: "Organise access and assignments for the right people.",
      },
      {
        name: "SSO and HRMS connection",
        description:
          "Align learner access and user records with supported enterprise systems.",
      },
    ],
  },
  {
    id: "chat",
    name: "LurnyChat",
    mark: "CH",
    group: "enable-performance",
    descriptor: "Conversational learning and knowledge engine",
    summary:
      "Help people find approved knowledge, explore ideas and practise through conversation.",
    addLabel: "Add to enquiry",
    toggleLabel: "View features",
    href: "/platform/chat",
    features: [
      {
        name: "LurnyDesk knowledge assistance",
        description:
          "Ask questions about approved SOPs, products and workplace knowledge.",
      },
      {
        name: "Source-grounded answers",
        description:
          "Generate responses using the connected knowledge provided for the assistant.",
      },
      {
        name: "LurnyTalk voice and text",
        description: "Interact through supported voice and text conversations.",
      },
      {
        name: "Sahiyog picture and voice support",
        description:
          "Use supported images and voice to explain a question or situation.",
      },
      {
        name: "LurnyMinds guided learning",
        description:
          "Explore topics through questions that encourage deeper thinking.",
      },
      {
        name: "LurnyCoach",
        description: "Receive guided conversational support for development.",
      },
      {
        name: "LurnySim practice",
        description:
          "Rehearse realistic situations through simulated conversations.",
      },
      {
        name: "Practice feedback",
        description: "Review feedback from supported practice activities.",
      },
      {
        name: "Multilingual conversations",
        description:
          "Support conversations in the languages available for the selected assistant.",
      },
    ],
  },
  {
    id: "pitch",
    name: "LurnyPitch",
    mark: "PI",
    group: "enable-performance",
    descriptor: "Conversation intelligence engine",
    summary:
      "Review sales and service conversations to understand what happened, identify opportunities and guide improvement.",
    badge: { tone: "pilot", label: "Pilot available" },
    addLabel: "Add to enquiry",
    toggleLabel: "View features",
    href: "/platform/pitch",
    features: [
      {
        name: "Mobile conversation capture",
        description:
          "Record supported workplace conversations through the mobile workflow.",
      },
      {
        name: "Multilingual transcription",
        description:
          "Turn supported recorded conversations into readable transcripts.",
      },
      {
        name: "Translation",
        description: "Review conversations in a supported translated language.",
      },
      {
        name: "Conversation scoring",
        description: "Assess conversations against configured review criteria.",
      },
      {
        name: "Individual feedback",
        description: "Highlight strengths and areas for improvement.",
      },
      {
        name: "Missed opportunity detection",
        description:
          "Surface relevant opportunities that may have been missed in the conversation.",
      },
      {
        name: "Cross-sell insights",
        description:
          "Identify relevant additional product or service opportunities.",
      },
      {
        name: "Manager reports",
        description:
          "Give managers visibility into conversation patterns and coaching priorities.",
      },
      {
        name: "Activity reporting",
        description: "Review participation and conversation-analysis activity.",
      },
    ],
  },
  {
    id: "events",
    name: "LurnyEvents",
    mark: "EV",
    group: "enable-performance",
    descriptor: "Learning events engine",
    summary:
      "Bring the intended learning-event lifecycle into one coordinated experience.",
    badge: { tone: "dev", label: "In development" },
    addLabel: "Register interest",
    toggleLabel: "View features",
    href: "/platform/events",
    features: [
      {
        name: "Multiple event formats",
        description:
          "Plan classroom, virtual, webinar, workshop, conference and blended experiences.",
      },
      {
        name: "Event setup",
        description:
          "Define event details, learning objectives and participation requirements.",
      },
      {
        name: "Registration",
        description: "Manage participant registration for learning events.",
      },
      {
        name: "Scheduling",
        description: "Organise sessions and participant schedules.",
      },
      {
        name: "Trainer and participant roles",
        description:
          "Support the people involved in delivering and attending events.",
      },
      {
        name: "Attendance",
        description: "Capture attendance within the supported event workflow.",
      },
      {
        name: "Feedback",
        description: "Gather participant feedback after the event.",
      },
      {
        name: "Certificates and recognition",
        description:
          "Connect supported completion evidence with learner recognition.",
      },
      {
        name: "CPD records",
        description: "Record relevant continuing-development participation.",
      },
      {
        name: "Meeting and calendar connections",
        description:
          "Connect supported event workflows with meeting and calendar tools.",
      },
    ],
  },
  {
    id: "saathi",
    name: "LurnySaathi",
    mark: "SA",
    group: "work-in-the-flow",
    descriptor: "Mobile learning and performance companion",
    summary:
      "Bring relevant learning, practice, knowledge assistance and performance activities into a mobile experience.",
    addLabel: "Add to enquiry",
    toggleLabel: "View features",
    href: "/platform/saathi",
    features: [
      {
        name: "Personal task view",
        description: "Bring the learner's next activities into view.",
      },
      {
        name: "Check your Pulse access",
        description: "Start relevant capability checks from the companion.",
      },
      {
        name: "Continue learning",
        description: "Return to assigned or ongoing learning.",
      },
      {
        name: "Practice access",
        description: "Open relevant conversation or scenario practice.",
      },
      {
        name: "Ask Saathi",
        description:
          "Access supported knowledge assistance from the mobile experience.",
      },
      {
        name: "Record a pitch",
        description: "Start the supported Pitch recording workflow.",
      },
      {
        name: "Growth and improvement activities",
        description: "Find development activities relevant to the individual.",
      },
      {
        name: "Streaks and leaderboards",
        description: "See supported participation and recognition features.",
      },
    ],
  },
  {
    id: "biz",
    name: "LurnyBiz",
    mark: "BI",
    group: "work-in-the-flow",
    descriptor: "Business action intelligence engine",
    summary:
      "A planned capability for connecting customer and business information with practical action guidance.",
    badge: { tone: "concept", label: "Register interest" },
    addLabel: "Register interest",
    toggleLabel: "View features",
    href: "/platform/biz",
    features: [
      {
        name: "CRM-connected context",
        description:
          "Bring relevant customer and business information into the workflow.",
      },
      {
        name: "Single customer view",
        description:
          "Bring supported customer information together for a fuller view.",
      },
      {
        name: "Next-best-action guidance",
        description:
          "Suggest relevant next actions using the available business context.",
      },
      {
        name: "Follow-up support",
        description: "Help teams identify and progress customer follow-ups.",
      },
      {
        name: "Manager visibility",
        description: "Surface team priorities and business-action patterns.",
      },
      {
        name: "Connected business insights",
        description:
          "Use supported business data to inform decisions and actions.",
      },
    ],
  },
  {
    id: "sense",
    name: "LurnySense",
    mark: "SE",
    group: "work-in-the-flow",
    descriptor: "Conversational BI engine",
    summary:
      "Explore connected analytics in everyday language, alongside dashboards and saved reports.",
    badge: { tone: "pilot", label: "Pilot available" },
    addLabel: "Add to enquiry",
    toggleLabel: "View features",
    href: "/platform/sense",
    features: [
      {
        name: "Natural-language analytics",
        description:
          "Ask questions about supported connected data in ordinary language.",
      },
      {
        name: "Follow-up exploration",
        description:
          "Refine a question and explore the answer through conversation.",
      },
      {
        name: "Charts and visual answers",
        description: "Present supported findings in useful visual formats.",
      },
      {
        name: "Standard analytics",
        description: "Continue using normal analytics and dashboard views.",
      },
      {
        name: "Admin-saved reports",
        description: "Save useful reports for future use.",
      },
      {
        name: "Connected data sources",
        description:
          "Analyse data made available through the agreed integrations.",
      },
    ],
  },
  {
    id: "notes",
    name: "LurnyNotes",
    mark: "NO",
    group: "work-in-the-flow",
    descriptor: "Meeting and follow-up assistance engine",
    summary:
      "Turn conversations into useful summaries, decisions, action items and editable follow-up drafts.",
    badge: { tone: "pilot", label: "Pilot available" },
    addLabel: "Add to enquiry",
    toggleLabel: "View features",
    href: "/platform/notes",
    features: [
      {
        name: "Meeting and conversation capture",
        description: "Capture supported conversations for later review.",
      },
      {
        name: "Summaries and key points",
        description: "Create a concise record of the discussion.",
      },
      {
        name: "Decision capture",
        description: "Identify the decisions made in the conversation.",
      },
      {
        name: "Action items",
        description: "Bring agreed actions into a reviewable list.",
      },
      {
        name: "Next steps and follow-ups",
        description: "Highlight commitments and what needs to happen next.",
      },
      {
        name: "Email and message drafting",
        description:
          "Prepare editable drafts from conversation history and approved knowledge.",
      },
      {
        name: "Outlook workflow",
        description:
          "Access supported drafting assistance through the Outlook plugin.",
      },
      {
        name: "Teams workflow",
        description:
          "Connect supported meeting and follow-up activities with the agreed Teams integration.",
      },
    ],
  },
];

export const pricing = {
  meta: {
    title: "Pricing",
    description:
      "Choose your engines and find a plan for your scale. Start with the capabilities you need today, connect them to your existing systems and expand as your organisation grows.",
    path: "/pricing",
  },

  hero: {
    eyebrow: "Flexible pricing",
    /** Split so the line breaks where the design breaks them. */
    headline: ["Choose your engines.", "Find a plan for your scale."],
    body: "Start with the capabilities you need today. Connect them to your existing systems and expand as your organisation grows.",
    anchor: { label: "Explore the engines", href: "#engines" },
  },

  /**
   * The three plans. `price` is deliberately the same on all three: the
   * package publishes no figures.
   */
  plans: {
    items: [
      {
        name: "Team",
        support: "For focused teams and growing organisations.",
        facts: [
          { term: "Learners", value: "Fewer than 1,000 learners" },
          { term: "Admins", value: "5 admin licences" },
        ],
        price: "Contact us for pricing",
        action: "Discuss Team",
        /** Prefills the form's learner band when this plan is chosen. */
        learnerBand: "Fewer than 1,000",
      },
      {
        name: "Business",
        support: "For learning and capability across teams and locations.",
        facts: [
          { term: "Learners", value: "1,000–10,000 learners" },
          { term: "Admins", value: "10 admin licences" },
        ],
        price: "Contact us for pricing",
        action: "Discuss Business",
        learnerBand: "1,000–10,000",
      },
      {
        name: "Enterprise",
        support: "For capability and performance at enterprise scale.",
        facts: [
          { term: "Learners", value: "More than 10,000 learners" },
          { term: "Admins", value: "Admin licences based on requirements" },
        ],
        price: "Contact us for pricing",
        action: "Discuss Enterprise",
        learnerBand: "More than 10,000",
      },
    ],

    note: "Your proposal will specify selected engines, feature scope, usage allowances and implementation.",

    /** {0} is replaced by the link. */
    creator: {
      text: "Only need a creation engine? {0}",
      link: { label: "Tell us what you want to create.", href: "#enquiry" },
    },
  },

  /** The engine catalogue. */
  catalogue: {
    eyebrow: "Explore the engines",
    headline: "Find the capabilities your organisation needs.",
    body: "Explore what each engine does and tell us which capabilities you would like to discuss.",

    /** The in-page jump links above the groups. */
    groupNav: [
      { label: "Build capability", href: "#build-capability" },
      { label: "Enable performance", href: "#enable-performance" },
      { label: "Work in the flow", href: "#work-in-the-flow" },
      { label: "LurnyFabric", href: "#fabric", fabric: true },
    ],

    expandAll: "Expand all features",
    collapseAll: "Collapse all features",

    /** Group ids match the `group` on each engine below. */
    groups: [
      { id: "build-capability", label: "Build capability" },
      { id: "enable-performance", label: "Enable performance" },
      { id: "work-in-the-flow", label: "Work in the flow" },
    ],

    /** The detail link's label pattern — {0} is the engine name. */
    detailLabel: "View full {0} page",

    /** Label a selected engine's button switches to. */
    addedLabel: "Added",

    engines: pricingEngines,
  },

  /**
   * LURNYFABRIC — its own dark section, because the package gives it one.
   * It is an engine like the others (same card, same selection behaviour) but
   * framed as the foundation the rest sit on.
   */
  fabric: {
    eyebrow: "LurnyFabric · The connected performance system",
    headline:
      "Start with the engine you need. Build on the foundation you have.",
    body: "Deploy the Lurny engine you need today, connect it securely to the systems you already use, and add further capabilities without rebuilding your enterprise foundation.",

    steps: [
      {
        title: "Deploy what you need today",
        text: "Begin with the engine that addresses your priority.",
      },
      {
        title: "Connect securely",
        text: "Bring it into your existing enterprise environment through an agreed integration scope.",
      },
      {
        title: "Expand on the same foundation",
        text: "Add capabilities as your needs grow.",
      },
    ],

    pills: [
      "Identity and access",
      "Integration",
      "Orchestration",
      "Governance",
    ],

    action: "Discuss your connected system",

    /** The engine card inside the section. */
    engine: {
      mark: "FB",
      name: "LurnyFabric",
      descriptor: "The connected performance system",
      summary:
        "Deploy the Lurny engine you need today, connect it securely to the systems you already use, and add further capabilities without rebuilding your enterprise foundation.",
      addLabel: "Add to enquiry",
      toggleLabel: "Explore Fabric capabilities",
      features: [
        {
          name: "Modular deployment",
          description:
            "Start with the Lurny capability that addresses your immediate need.",
        },
        {
          name: "Secure enterprise connections",
          description:
            "Connect selected Lurny engines with supported systems in your existing environment.",
        },
        {
          name: "Shared identity and access",
          description:
            "Reuse agreed identity and access foundations across connected engines.",
        },
        {
          name: "Shared organisational context",
          description:
            "Carry relevant people, roles, teams and organisational structures across the connected experience.",
        },
        {
          name: "Orchestration",
          description:
            "Coordinate agreed workflows, triggers and hand-offs between engines.",
        },
        {
          name: "Context and evidence exchange",
          description:
            "Share authorised learning and performance context between connected capabilities.",
        },
        {
          name: "Common governance",
          description:
            "Apply agreed access, data-handling and audit controls across the deployment.",
        },
        {
          name: "APIs and connector patterns",
          description: "Support agreed system connections and data exchange.",
        },
        {
          name: "Integration operations",
          description:
            "Define how supported connections are monitored, maintained and updated.",
        },
        {
          name: "Expansion on a shared foundation",
          description:
            "Add further capabilities while reusing established foundations where supported.",
        },
      ],
    },

    /**
     * The diagram. Decorative — every engine it names is listed in the
     * catalogue above and every system in the copy beside it — so the whole
     * figure is aria-hidden, as the package marks it.
     */
    diagram: {
      caption: "Capability to performance",
      engineTier: "Composable engines",
      systemTier: "Your existing systems",
      engines: [
        { name: "LurnyPulse", tint: "purple" },
        { name: "LurnyMagic", tint: "amber" },
        { name: "LurnyFlix", tint: "rose" },
        { name: "LurnyKxP", tint: "purple" },
        { name: "LurnyChat", tint: "info" },
        { name: "LurnyPitch", tint: "rose" },
        { name: "LurnyEvents", tint: "amber" },
        { name: "LurnySaathi", tint: "purple" },
        { name: "LurnyBiz", tint: "info" },
        { name: "LurnySense", tint: "rose" },
        { name: "LurnyNotes", tint: "amber" },
      ],
      systems: ["HRMS / HCM", "CRM", "LMS / LXP", "Microsoft 365", "Knowledge"],
    },
  },

  /** What shapes a proposal. */
  proposal: {
    headline: "A proposal built around your requirements.",
    items: [
      {
        title: "People and access",
        text: "Your learner population and the people who create, administer and support the experience.",
      },
      {
        title: "Selected capabilities",
        text: "The engines and features that address your priorities.",
      },
      {
        title: "AI and media usage",
        text: "The content, conversations and video production your teams expect to use.",
      },
      {
        title: "Integration and implementation",
        text: "The systems, deployment and onboarding needed for your organisation.",
      },
    ],
  },

  faq: {
    headline: "Common questions.",
    items: [
      {
        question: "Can we start with one engine?",
        answer:
          "Yes. Tell us which capability you need first. We will scope that engine and the connections needed for your environment.",
      },
      {
        question: "Can we use LurnyMagic or LurnyFlix separately?",
        answer:
          "You can discuss Magic for learning creation, Flix for video creation, or both. We will confirm the relevant creator access, outputs and usage in your proposal.",
      },
      {
        question: "Do we have to replace our existing LMS or other systems?",
        answer:
          "Lurny is designed to work alongside existing enterprise systems. We will review the connections needed for your chosen engines.",
      },
      {
        question: "Are all engines included in each plan?",
        answer:
          "Your proposal will specify the engines and features included. The plan cards show learner scale and admin allowances.",
      },
      {
        question: "Can we add capabilities later?",
        answer:
          "Yes. LurnyFabric is designed to support expansion on a shared foundation. We will review the access, usage and integration scope for each addition.",
      },
      {
        question: "How is AI and video usage handled?",
        answer:
          "We will define the relevant allowances and any additional-usage terms in your proposal, including content generation, conversational AI, recording analysis and video rendering where applicable.",
      },
      {
        question: "What does implementation include?",
        answer:
          "We will agree the configuration, integrations, migration, knowledge preparation and training required for your deployment.",
      },
      {
        question: "Can we discuss private or customer-controlled deployment?",
        answer:
          "Yes. Share your hosting and security requirements so we can assess a suitable deployment approach.",
      },
      {
        question: "Can we explore products in pilot or development?",
        answer:
          "Yes. Products are labelled where pilots or future capabilities apply. Contact us to discuss pilot scope or register interest.",
      },
    ],
  },

  /**
   * THE ENQUIRY FORM.
   *
   * Not the site's shared LeadForm: this one carries twelve engine
   * checkboxes wired to the page's selection state, which that component has
   * no concept of. Its submit is not connected to anything — the package ran
   * in explicit demo mode and said so, and this rebuild is equally plain
   * about it rather than claiming an enquiry was sent.
   */
  enquiry: {
    eyebrow: "Let's shape your Lurny",
    headline: "Tell us what you want to achieve.",
    body: "Share your priorities and we will help shape the right combination of engines, access and implementation.",

    fields: {
      name: { label: "Name", name: "name", autoComplete: "name" },
      email: { label: "Work email", name: "email", autoComplete: "email" },
      organisation: {
        label: "Organisation",
        name: "organisation",
        autoComplete: "organization",
      },
      plan: {
        label: "Plan of interest",
        name: "plan",
        options: ["Not sure", "Team", "Business", "Enterprise"],
      },
      learners: {
        label: "Approximate learner population",
        optional: "(optional)",
        name: "learners",
        /** The empty value is the resting choice, as in the package. */
        options: [
          { value: "", label: "Prefer not to say" },
          { value: "Fewer than 1,000", label: "Fewer than 1,000" },
          { value: "1,000–10,000", label: "1,000–10,000" },
          { value: "More than 10,000", label: "More than 10,000" },
          { value: "Not sure", label: "Not sure" },
        ],
      },
      engines: {
        legend: "Engines of interest",
        optional: "(optional — select any that apply)",
      },
      message: {
        label: "What would you like to achieve?",
        optional: "(optional)",
        name: "message",
      },
    },

    errors: {
      name: "Please enter your name.",
      email: "Please enter your work email.",
      emailFormat: "Please enter a valid email address.",
      organisation: "Please enter your organisation.",
    },

    /** {0} is replaced by the privacy link. */
    helper: {
      text: "We'll use these details to respond to your enquiry. Read our {0}.",
      link: { label: "Privacy Policy", href: "/privacy" },
    },

    submit: "Request pricing",

    /**
     * Shown after a valid submit. The package's own wording, kept because it
     * is honest: nothing is sent anywhere yet.
     */
    demoNotice: "Demo complete — no enquiry has been sent.",
  },

  /** The bar that appears once at least one engine is selected. */
  selectionBar: {
    /** {0} is the count; `one` is used when it is exactly 1. */
    summary: "{0} engines selected",
    summaryOne: "1 engine selected",
    view: "View selection",
    hide: "Hide selection",
    continue: "Continue to enquiry",
    /** Screen-reader label on each chip's remove button; {0} is the name. */
    remove: "Remove {0}",
  },
} as const;
