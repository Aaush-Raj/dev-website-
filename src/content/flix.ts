/**
 * LURNYFLIX PAGE CONTENT
 * ---------------------------------------------------------------------------
 * Copy for /platform/flix — the AI video creation engine.
 *
 * Copy is verbatim from the supplied "06-left-copy.txt" and the card text in
 * the section design. Section 1 is defined below; the remaining sections are
 * added here as their designs are built.
 */

export const flix = {
  /** Page-level metadata, consumed by the route's `metadata` export. */
  meta: {
    title: "LurnyFlix — Turn Your Content Into Learning Videos",
    description:
      "Transform presentations, documents, web links and recordings into engaging videos. Create with AI, add narration and make learning interactive.",
    path: "/platform/flix",
  },

  /**
   * SECTION 1 — the hero.
   *
   * The statement on the left over the scene's dark ground, the Studio window
   * to the right, with three cards floating over and around it.
   */
  hero: {
    /** The engine's own name, set above the positioning line. */
    wordmark: "LurnyFlix",
    eyebrow: "AI video creation for L&D",

    /** Three lines, each owning its own row as the design sets them. */
    headline: ["Turn your content", "into learning", "videos."],

    description:
      "Transform presentations, documents, web links and recordings into engaging videos. Create with AI, add narration and make learning interactive.",

    actions: {
      primary: { label: "Book a demo", href: "/demo" },
      /* Points at a section further down this page, which is specified in the
         supplied design but not yet built. */
      secondary: { label: "Explore video tools", href: "#tools" },
    },

    /**
     * The Studio scene. It already carries the whole editor window — the rail,
     * the player with its presenter PHOTOGRAPH, the four scene thumbnails and
     * the narration waveform — so only the three cards sit over it.
     */
    scene: {
      src: "/images/platform/flix/hero-scene.webp",
      /**
       * Decorative: it is a rendering of the product's own editor, and every
       * claim the section makes is set in the copy and the cards beside it.
       */
      alt: "",
      width: 1672,
      height: 941,
    },

    /**
     * THE SOURCE FORMATS
     * ---------------------------------------------------------------------
     * The bar above the Studio: what a video can be made from. Built in
     * markup — the supplied crop is an opaque PNG that would seam over the
     * scene. `icon` selects each mark.
     */
    formats: {
      items: [
        { label: "PPT", icon: "ppt" },
        { label: "PDF", icon: "pdf" },
        { label: "Web", icon: "web" },
        { label: "Recording", icon: "recording" },
      ],
    },

    /**
     * The comic-style output card. Only the PICTURE ships as a raster — it is
     * a generated illustration — while the frame, the caption and the tilt are
     * markup. See scripts/build-flix-hero.cjs.
     */
    comic: {
      caption: "Comic-style video",
      still: {
        src: "/images/platform/flix/comic-still.webp",
        alt: "",
        width: 858,
        height: 500,
      },
    },

    /**
     * The knowledge-check card at the foot of the Studio. Built in markup for
     * the same reason as the formats bar.
     */
    check: {
      title: "Add a knowledge check",
      options: ["Option A", "Option B"],
    },

    /** The three claims along the section's foot. `icon` selects each mark. */
    capabilities: [
      { label: "Transform existing content", icon: "document" },
      { label: "Create with AI", icon: "sparkle" },
      { label: "Make videos interactive", icon: "cursor" },
    ],
  },

  /**
   * SECTION 2 — THE PROBLEM.
   *
   * The statement on the left with the source-to-video curve under it, and
   * four numbered problems in a ruled list on the right.
   *
   * ONLY THE GRADIENT SHIPS. The pack also supplies the workflow curve as a
   * 2172x724 raster; it is pure line art, so it is drawn instead — the labels
   * stay selectable and the curve can draw itself on scroll.
   */
  problem: {
    eyebrow: "The problem LurnyFlix solves",

    /** Three lines, each owning its own row as the design sets them. */
    headline: [
      "Your team knows what to teach.",
      "Video production shouldn\u2019t",
      "stand in the way.",
    ],

    description:
      "L&D teams already have PDFs, presentations and useful web or YouTube links. But turning that knowledge into video often means learning unfamiliar tools and coordinating scripts, visuals and narration.",

    /**
     * The closing promise, split so the design's two violet runs can be drawn
     * rather than typed. Rendered as one paragraph; `accent` marks the phrases
     * the design sets in violet.
     */
    promise: [
      { text: "LurnyFlix " },
      { text: "transforms that content", accent: true },
      { text: " into learning videos. Or start with an idea and " },
      { text: "create with AI", accent: true },
      { text: "." },
    ],

    /**
     * THE SOURCE-TO-VIDEO CURVE
     * ---------------------------------------------------------------------
     * The five inputs a video can start from, threaded on one curve that ends
     * at a player. `icon` selects each mark; the node's position on the curve
     * is computed in FlixProblem rather than stored, so the labels and the
     * line cannot drift apart.
     */
    flow: {
      steps: [
        { label: "PDF", icon: "pdf" },
        { label: "PPT", icon: "ppt" },
        { label: "URL", icon: "link" },
        { label: "YouTube", icon: "youtube" },
        { label: "AI", icon: "spark" },
      ],
    },

    /**
     * The four problems. The ordinal is each item's position rather than
     * stored copy, so the two cannot drift apart.
     */
    problems: [
      {
        title: "Subject expertise is not video expertise",
        body: "Knowing what to teach does not mean knowing how to write a script, build scenes, record narration or edit a timeline.",
      },
      {
        title: "Existing content has to be built all over again",
        body: "PDFs, PPTs and web or YouTube links hold useful knowledge. Turning them into video often means rewriting and recreating it.",
      },
      {
        title: "Specialist support adds time and cost",
        body: "Depending on editors, agencies or busy internal teams adds coordination and waiting time to everyday training requests.",
      },
      {
        title: "AI tools can create another layer of complexity",
        body: "Separate tools for scripts, visuals and voiceovers still leave the team to assemble everything into a useful learning video.",
      },
    ],

    /** The gradient the section sits on. */
    backdrop: {
      src: "/images/platform/flix/problem-backdrop.webp",
      alt: "",
      width: 1672,
      height: 941,
    },
  },

  /**
   * SECTION 3 — THE MEDICAL USE CASE.
   *
   * The story on the left; on the right a three-card flow — the original PPT,
   * the finished video, the Vimeo upload — joined by two curved arrows.
   *
   * ONLY THE PHOTOGRAPHS SHIP. The pack supplies each card as a whole
   * flattened, opaque PNG, plus two full-frame arrows; all of it is rebuilt in
   * markup except the three photographs inside the cards, which markup cannot
   * draw. See scripts/build-flix-medical.cjs.
   */
  medical: {
    eyebrow: "LurnyFlix in action",
    /** The sector line under the eyebrow, quieter than it. */
    sector: "Medical education",

    /** Three lines, each owning its own row as the design sets them. */
    headline: ["From lecture slides", "to videos students", "can revisit."],

    /** Three paragraphs, as the design breaks them. */
    story: [
      "A medical college wanted to turn its teaching PPTs into videos while keeping every slide design and image intact.",
      "LurnyFlix added an avatar, voiceover and music in minutes.",
      "The college uploads the videos to Vimeo and shares them with students.",
    ],

    /** The claim under the story, behind a tick. */
    note: "Original slide designs and images preserved",

    /**
     * THE SLIDE
     * ---------------------------------------------------------------------
     * Shared by both cards: the original PPT shows it alone, and the finished
     * video shows the same slide beside the presenter. Declared once so the
     * two cannot drift apart — which is the section's whole point, that the
     * slide is preserved.
     */
    slide: {
      title: "Patient-centred communication",
      photo: {
        src: "/images/platform/flix/medical-slide-photo.webp",
        /** Decorative: the claim is made in the copy beside it. */
        alt: "",
        width: 610,
        height: 436,
      },
      /** The three points beside the photo. `icon` selects each mark. */
      points: [
        { label: "Listen with attention", icon: "ear" },
        { label: "Explain with clarity", icon: "speech" },
        { label: "Confirm understanding", icon: "people" },
      ],
    },

    /** Card 1 — the source. */
    source: { title: "Original teaching PPT" },

    /** Card 2 — what LurnyFlix produced. */
    video: {
      engine: "LurnyFlix",
      status: "Video ready",
      avatar: {
        src: "/images/platform/flix/medical-avatar.webp",
        alt: "",
        width: 411,
        height: 462,
      },
      /** The two chips under the player. `icon` selects each mark. */
      tracks: [
        { label: "Voiceover", icon: "mic" },
        { label: "Background music", icon: "note" },
      ],
    },

    /** Card 3 — where it goes. */
    upload: {
      title: "Uploaded to Vimeo",
      subtitle: "Shared with students",
    },

    /**
     * The two arrows. `label` is drawn beside the first only, as the design
     * sets it; the second runs unlabelled down to the Vimeo card.
     */
    arrows: { pptToVideo: "PPT to Video" },

    /** The gradient the section sits on. */
    backdrop: {
      src: "/images/platform/flix/medical-backdrop.webp",
      alt: "",
      width: 1672,
      height: 941,
    },
  },

  /**
   * SECTION 4 — THE BANKING USE CASE.
   *
   * Mirrored against section 3: the visual on the LEFT, the story on the
   * right. A scenario-script card feeds, via a "Generate with AI" pill, the
   * AI-generated video panel beneath it.
   *
   * ONLY THE RENDERED STILLS SHIP — the main frame and three scene
   * thumbnails. Every other piece is markup. See scripts/build-flix-banking.cjs.
   */
  banking: {
    eyebrow: "LurnyFlix in action",
    sector: "Banking",

    /** Three lines, each owning its own row as the design sets them. */
    headline: ["The script is ready.", "Bring the scenario", "to life with AI."],

    /** Two paragraphs, as the design breaks them. */
    story: [
      "A bank had a scenario and a script. Bringing it to life would usually mean outsourcing animation to a specialist studio.",
      "LurnyFlix gives the team a simpler way to turn that script into an AI-generated scenario video.",
    ],

    /** The claim under the story, behind a tick. */
    note: "No media or animation experience needed",

    /** The source script, and the action that turns it into video. */
    script: {
      title: "Your scenario script",
      /** Two turns of dialogue, ruled apart as the design sets them. */
      lines: [
        { speaker: "Customer:", text: "I\u2019ve been waiting for an update." },
        {
          speaker: "Employee:",
          text: "Let me check and explain the next steps.",
        },
      ],
      action: "Generate with AI",
    },

    /**
     * The generated video panel.
     *
     * `main` carries its own scene chip and subtitle burnt into the render —
     * there is no clean plate under them — so unlike every other string here
     * those two are pixels rather than markup. See the build script.
     */
    video: {
      engine: "LurnyFlix",
      badge: "AI-generated video",
      main: {
        src: "/images/platform/flix/banking-scene-main.webp",
        /**
         * Decorative: the frame's own chip and subtitle are burnt into it and
         * repeated in the copy beside the section.
         */
        alt: "",
        width: 1092,
        height: 522,
      },
      /** The three scenes along the panel's foot. */
      scenes: [
        {
          label: "Scene 1",
          src: "/images/platform/flix/banking-scene-1.webp",
          alt: "",
          width: 338,
          height: 148,
        },
        {
          label: "Scene 2",
          src: "/images/platform/flix/banking-scene-2.webp",
          alt: "",
          width: 338,
          height: 148,
        },
        {
          label: "Scene 3",
          src: "/images/platform/flix/banking-scene-3.webp",
          alt: "",
          width: 338,
          height: 148,
        },
      ],
    },

    /** The lavender ground the section sits on. */
    backdrop: {
      src: "/images/platform/flix/banking-backdrop.webp",
      alt: "",
      width: 1672,
      height: 941,
    },
  },

  /**
   * SECTION 5 — INTERACTIVE VIDEO.
   *
   * The statement and three features on the left; on the right a player whose
   * frame carries a quiz card, with a "?" marker on the transport at the
   * quiz's timestamp and a three-stop progress rail beneath it.
   *
   * ONLY THE RENDERED STILL SHIPS. The quiz, the transport and the rail are
   * markup. See scripts/build-flix-interactive.cjs.
   */
  interactive: {
    eyebrow: "Interactive video",

    /** Three lines, each owning its own row as the design sets them. */
    headline: ["Explain a concept.", "Then check", "understanding."],

    description:
      "Add quizzes within your videos, just after a concept has been explained. Learners can answer a question and assess their understanding as they watch.",

    /** The three claims under the description. `icon` selects each mark. */
    features: [
      { label: "Questions at the right moment", icon: "clock" },
      { label: "Quizzes linked to the concept", icon: "document" },
      { label: "Learning through participation", icon: "people" },
    ],

    /** The player panel. */
    panel: {
      engine: "LurnyFlix",
      badge: "Interactive video",
      still: {
        src: "/images/platform/flix/interactive-still.webp",
        /** Decorative: every claim is made in the copy and the quiz beside it. */
        alt: "",
        width: 576,
        height: 380,
      },

      /**
       * THE QUIZ
       * -------------------------------------------------------------------
       * Overlays the frame's right half. `answer` is the index of the option
       * the design marks as chosen — stored as a position rather than repeated
       * on the option itself, so the two cannot disagree.
       */
      quiz: {
        title: "Quick knowledge check",
        concept: "Concept: Active listening",
        question: "What should you do first when a customer raises a concern?",
        options: [
          "Listen and clarify the issue",
          "Explain every product feature",
          "Offer a solution immediately",
        ],
        answer: 0,
        action: "Check my answer",
      },

      /**
       * The three stops under the player. `at` is the index of the stop the
       * design highlights — the moment the quiz interrupts the video.
       */
      rail: {
        stops: ["Concept", "Knowledge check", "Continue watching"],
        at: 1,
      },
    },

    /** The gradient the section sits on. */
    backdrop: {
      src: "/images/platform/flix/interactive-backdrop.webp",
      alt: "",
      width: 1672,
      height: 941,
    },
  },

  /**
   * SECTION 6 — THE VIDEO EDITOR.
   *
   * The editor panel on the left with a portrait card over its lower-left
   * corner and a Voice & music card over its lower-right; the statement and
   * six capabilities on the right.
   *
   * THE ASSET SPLIT IS DIFFERENT HERE. The editor and the portrait card SHIP —
   * the editor is eleven photographs woven through a dense grid rather than
   * chrome around one picture. The Voice & music card is pure interface and is
   * rebuilt. See scripts/build-flix-editor.cjs.
   */
  editor: {
    eyebrow: "Video editing made simple",

    /** Three lines, each owning its own row as the design sets them. */
    headline: ["Create videos.", "No media experience", "required."],

    description:
      "An intuitive editor for L&D teams to shape scenes, add media and make every video their own.",

    /** The six capabilities beside the editor. `icon` selects each mark. */
    capabilities: [
      { label: "Portrait and landscape formats", icon: "formats" },
      { label: "1M+ stock videos and images", icon: "library" },
      { label: "Text animations and transitions", icon: "type" },
      { label: "Multilingual text and audio", icon: "globe" },
      { label: "Your logo and video uploads", icon: "upload" },
      { label: "Background music and voiceover", icon: "music" },
    ],

    /** The editor itself. */
    panel: {
      src: "/images/platform/flix/editor-panel.webp",
      /**
       * Decorative: it is a rendering of the product's own editor, and every
       * claim the section makes is listed in the capabilities beside it.
       */
      alt: "",
      width: 1048,
      height: 730,
    },

    /** The portrait preview over the editor's lower-left corner. */
    portrait: {
      src: "/images/platform/flix/editor-portrait.webp",
      alt: "",
      width: 197,
      height: 402,
    },

    /**
     * The Voice & music card over the editor's lower-right. Built in markup —
     * it carries no photograph, so nothing about it needs to be a raster.
     */
    voice: {
      title: "Voice & music",
      rows: [
        { label: "Voiceover", value: "Hindi", icon: "mic" },
        { label: "Background music", value: "Add music", icon: "note" },
      ],
    },

    /** The gradient the section sits on. */
    backdrop: {
      src: "/images/platform/flix/editor-backdrop.webp",
      alt: "",
      width: 1672,
      height: 941,
    },
  },

  /**
   * SECTION 7 — GUIDED CREATION.
   *
   * The statement and three steps on the left; the "Create a video" form in
   * the middle; three choice cards on the right, joined to the form by
   * connector arrows.
   *
   * ONLY THE SIX STYLE THUMBNAILS SHIP. The form, the palette card, the audio
   * card and the arrows are all markup. See scripts/build-flix-guided.cjs.
   */
  guided: {
    eyebrow: "Guided video creation",

    /** Three lines, each owning its own row as the design sets them. */
    headline: ["Great videos.", "Simple choices.", "No expert prompts."],

    description:
      "Create with guided forms, helpful dropdowns and AI assistance. Upload your documents, choose your look and sound, and let LurnyFlix bring it together.",

    /** The three steps under the description. `icon` selects each mark. */
    steps: [
      {
        title: "Start with your content",
        body: "PDFs, PowerPoint and Word documents",
        icon: "upload",
      },
      {
        title: "Choose your look",
        body: "Visual styles and colour palettes",
        icon: "palette",
      },
      {
        title: "Set your sound and format",
        body: "Languages, voiceover, subtitles and aspect ratios",
        icon: "sound",
      },
    ],

    /**
     * THE FORM
     * ---------------------------------------------------------------------
     * `step` is the index of the stepper tab the design shows active, stored
     * as a position rather than a flag on the tab itself.
     */
    form: {
      title: "Create a video",
      subtitle: "A few simple choices to get started",
      steps: ["Overview", "Style", "Audio"],
      step: 0,

      topic: {
        label: "Video topic",
        value: "Customer service essentials",
        assist: "Help me with AI",
      },
      language: { label: "Language", value: "English" },

      /** `ratio` is the index of the chosen aspect. */
      aspect: {
        label: "Aspect ratio",
        options: [
          { label: "16:9 Landscape", icon: "landscape" },
          { label: "9:16 Portrait", icon: "portrait" },
        ],
        ratio: 0,
      },

      upload: {
        title: "Upload your documents",
        hint: "PDF, PPTX, DOCX",
        file: "Customer service.pptx",
      },

      action: "Create project",
    },

    /**
     * THE VISUAL STYLE CARD.
     *
     * `selected` names the tile the design marks. Its TICK is burnt into that
     * thumbnail — see the build script — so FlixGuided draws the selection
     * ring around it but not a second badge.
     */
    style: {
      title: "Visual style",
      more: "See all",
      selected: "3d-animation",
      tiles: [
        { id: "live-action", label: "Live action" },
        { id: "3d-animation", label: "3D animation" },
        { id: "anime", label: "Anime" },
        { id: "comic-book", label: "Comic book" },
        { id: "watercolour", label: "Watercolour" },
        { id: "clay", label: "Clay" },
      ],
    },

    /**
     * THE COLOUR PALETTE CARD. `chosen` is the index of the marked palette;
     * each palette is its own list of swatches.
     */
    palette: {
      title: "Colour palette",
      more: "See all",
      chosen: 0,
      options: [
        ["#2b0f5e", "#7b2ff7", "#b16cf5", "#f2a8d8", "#fbe3f4"],
        ["#1f5c4a", "#6fbfa0", "#f2efe0", "#f5a97f", "#e8705a"],
        ["#8f1f1f", "#c2452c", "#e0713a", "#eda44a", "#f7e3a1"],
      ],
    },

    /** THE AUDIO & SUBTITLES CARD. */
    audio: {
      title: "Audio & subtitles",
      rows: [
        { label: "Voice", value: "English \u00b7 Female" },
        { label: "Music", value: "Soft ambient" },
      ],
      toggle: { label: "Subtitles", on: true },
    },

    /** The gradient the section sits on. */
    backdrop: {
      src: "/images/platform/flix/guided-backdrop.webp",
      alt: "",
      width: 1672,
      height: 941,
    },
  },

  /**
   * SECTION 8 — BOOK A DEMO.
   *
   * The closing conversion section: the pitch on the left, the booking form
   * on a raised card to the right.
   *
   * NOTHING SHIPS AS A RASTER. The design's soft corner blobs are drawn in
   * CSS, and the form is the shared LeadForm — real controls, not a drawing of
   * controls. See FlixDemo.
   */
  demo: {
    eyebrow: "See LurnyFlix in action",

    /** Three lines, each owning its own row as the design sets them. */
    headline: ["Turn your", "content into", "learning videos."],

    description:
      "Tell us what you want to create. We\u2019ll show you how LurnyFlix turns your documents, presentations, URLs and ideas into videos with AI, avatars and interactive quizzes.",

    /** The two notes under the rule. `icon` selects each mark. */
    points: [
      {
        text: "30 minutes \u00b7 tailored to your video creation needs",
        icon: "clock",
      },
      {
        text: "Explore PPT-to-video, AI video and interactive quizzes",
        icon: "video",
      },
    ],

    /**
     * Form copy, in the shape LeadForm expects — see LeadFormContent in
     * components/ui/LeadForm.tsx.
     *
     * The design asks for SEVEN fields: name, email, organisation, workforce
     * size, use case, content source and a free-text challenge. That maps onto
     * the contract's optional slots exactly — `organisation` plus `selectC` —
     * so this page needs no change to the shared component.
     */
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
      organisation: {
        name: "organisation",
        label: "Organisation",
        placeholder: "Company name",
        autoComplete: "organization",
      },

      /* Workforce size. Not required — the design marks only the first three
         fields and the use case with an asterisk. */
      selectA: {
        name: "workforceSize",
        label: "Your workforce size",
        options: [
          "Select workforce size",
          "Under 250",
          "250 to 1,000",
          "1,000 to 5,000",
          "5,000 to 20,000",
          "More than 20,000",
        ],
      },

      /* Primary use case. Required, and the design asterisks it. */
      selectB: {
        name: "primaryUseCase",
        label: "Primary use case",
        options: [
          "Select a use case",
          "Compliance and policy training",
          "Employee onboarding",
          "Product and sales enablement",
          "Customer service training",
          "Frontline and field training",
          "Something else",
        ],
        required: true,
        error: "Select a primary use case",
      },

      /* Content source. Optional, as the design leaves it. */
      selectC: {
        name: "contentSource",
        label: "Content source",
        options: [
          "Select your starting content",
          "Presentations (PPT)",
          "Documents (PDF, DOCX)",
          "Web or YouTube links",
          "Recordings",
          "Starting from an idea",
        ],
      },

      detail: {
        name: "currentChallenge",
        label: "Current challenge (optional)",
        placeholder:
          "e.g. slow production, costly outsourcing or no video creation experience",
      },

      consent: {
        name: "overview",
        label: "Send me the LurnyFlix overview.",
      },

      submit: "Book a LurnyFlix Demo",

      success: {
        title: "Thanks — we\u2019ll be in touch.",
        description:
          "We will confirm a time by email and tailor the session to the content you want to turn into video.",
      },

      errors: {
        name: "Enter your full name",
        email: "Enter your work email",
        emailFormat: "Enter a valid email address",
        organisation: "Enter your organisation",
      },

      /** The line under the button; {0} is spliced with the link below. */
      footnote: {
        text: "Want to explore the wider Lurny platform? {0}",
        links: [{ label: "Talk to a Lurny Specialist.", href: "/demo" }],
      },
    },
  },
} as const;
