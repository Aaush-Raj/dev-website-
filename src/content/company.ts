/**
 * COMPANY / ABOUT PAGE CONTENT
 * ---------------------------------------------------------------------------
 * Copy for the About page at /company.
 *
 * Section 1 is defined below; further sections are added here as their designs
 * land. Copy is verbatim from "About_Lurny_Hero_Text.txt".
 */

export const company = {
  /** Page-level metadata, consumed by the route's `metadata` export. */
  meta: {
    title: "About Lurny",
    description:
      "We're building a more connected way to learn, practise and improve—through conversations and experiences that matter at work.",
    path: "/company",
  },

  hero: {
    eyebrow: "About Lurny",

    /**
     * Three lines. The design sets the last in violet, so the headline is
     * split rather than carrying markup in the copy — `accent` marks which
     * lines take the brand colour.
     */
    headline: [
      { text: "Helping people turn" },
      { text: "what they know into" },
      { text: "what they can do.", accent: true },
    ],

    description:
      "We’re building a more connected way to learn, practise and improve—through conversations and experiences that matter at work.",

    /** The underlined link with the down arrow. */
    action: { label: "Discover our story", href: "#story" },

    /**
     * THE SCENE.
     *
     * Two rasters, layered: the office backdrop, then the subject cut out of
     * it. Shipping them separately is what lets the copy sit between them —
     * the backdrop runs full-bleed behind everything, while the subject stays
     * anchored to the right edge at her own scale.
     *
     * Both are decorative. The backdrop's wall text ("PEOPLE PRACTICE
     * PROGRESS TOGETHER" and the rest) is set dressing inside the photograph
     * rather than content, and the hero's own copy already carries the
     * message, so describing it again would only add noise.
     */
    room: {
      src: "/assets/images/company/hero-room.webp",
      alt: "",
      width: 1536,
      height: 1024,
    },

    subject: {
      src: "/assets/images/company/hero-subject.webp",
      alt: "",
      width: 1536,
      height: 1024,
    },

    /**
     * The two cards over the speech bubble. Their text is REBUILT IN MARKUP
     * rather than shipped inside the supplied overlay: the words stay
     * selectable, translatable and legible at any size, and a screen reader
     * reads them rather than skipping a wordless picture.
     *
     * `icon` names the glyph in CompanyIcons.
     */
    bubble: {
      cards: [
        { icon: "conversation", text: "Why does this approach work?" },
        { icon: "idea", text: "Let’s explore it together." },
      ],
    },
  },

  /**
   * SECTION 2 — our story.
   *
   * The 3D still life on the left, the copy on the right, over one full-bleed
   * render. Copy is verbatim from "Our_Story_Right_Text.txt".
   *
   * THE SCENE IS THE SUPPLIED RENDER, unmodified. Unlike the hero's speech
   * bubble, nothing here needs rebuilding: the objects carry no UI text that a
   * reader must act on, and the words that ARE in it — the notebook's
   * "Questions / Ideas / Practice", the three blocks' "Ask / Practise /
   * Apply", the script footnote — are labels on photographed objects rather
   * than interface. The render also leaves its right half deliberately empty
   * for the copy, which is why it can be used whole.
   */
  story: {
    eyebrow: "Our story",

    /** Split so the lines break where the design breaks them on lg+. */
    headline: ["Every learner deserves", "a different next step."],

    /**
     * Three paragraphs, then a closing line the design sets in bold white.
     * It is kept separate rather than as a fourth paragraph because its
     * weight is the point — it is the section's conclusion, not more body.
     */
    body: [
      "People bring different experience, knowledge and challenges to work. Their learning should reflect those differences.",
      "We\u2019re building Lurny around the individual: their role, what they already know, where they need support and what they need to do next.",
      "With AI, that journey can evolve through conversation, relevant learning, realistic practice and feedback\u2014adapting as each person grows.",
    ],

    close: "One enterprise. Thousands of individual learning journeys.",

    /**
     * The render. Decorative: everything it depicts is said in the copy
     * beside it, so describing the objects again would only repeat what is
     * already read.
     */
    scene: {
      src: "/assets/images/company/story-scene.webp",
      alt: "",
      width: 1536,
      height: 1024,
    },
  },

  /**
   * SECTION 3 — let's talk.
   *
   * Copy on the left over a soft lilac backdrop, the contact form on a white
   * card to the right. Copy is verbatim from "About_Contact_Section_Text.txt".
   *
   * THE FORM IS NOT THE SHARED LeadForm. That component is a demo-booking
   * form: it takes two selects, a consent checkbox and a footnote, and has no
   * phone field. This one asks for a phone number, offers a single "I'm
   * interested in" select, and closes on a privacy line rather than a consent
   * tick — so it is built for this section rather than bent out of a
   * component whose shape it does not share.
   *
   * THE SELECT'S OPTIONS ARE NOT IN THE SOURCE, which supplies only the
   * placeholder ("Select an option"). They are written from the section's own
   * copy, which names exactly two audiences — organisations exploring Lurny,
   * and prospective partners — plus a fallback.
   */
  contact: {
    eyebrow: "Let\u2019s talk",

    /** Split so the lines break where the design breaks them on lg+. */
    headline: ["Better learning", "starts with a", "conversation."],

    description:
      "Tell us what you\u2019re working towards. Whether you\u2019re exploring Lurny for your organisation or interested in partnering with us, we\u2019d love to hear from you.",

    /** The registered entity and its offices, under the stairs. */
    company: {
      name: "Lurny Innovative Labs Pvt. Ltd.",
      offices: "Bengaluru \u00b7 Kochi",
    },

    /**
     * The cursive note pointing at the sphere.
     *
     * The source render bakes it into the backdrop, and the source text says
     * so — but a baked annotation CANNOT stay beside the stairs. The backdrop
     * is a full-viewport `object-cover` image, so it scales and crops with the
     * window, while the stairs are sized to their grid column. Two coordinate
     * systems: they can only line up at one width, and drift apart at every
     * other. So it was painted out of the backdrop and is drawn here instead,
     * inside the stairs' own box, where it tracks them at any size.
     */
    annotation: ["Your next step", "starts here"],

    /**
     * The backdrop and the stairs, shipped separately so the stairs can
     * animate on their own. The backdrop now carries only the wash and the
     * flowing lines — see `annotation` above.
     */
    backdrop: {
      src: "/assets/images/company/contact-bg.webp",
      alt: "",
      width: 1536,
      height: 1024,
    },

    stairs: {
      src: "/assets/images/company/contact-stairs.webp",
      alt: "",
      width: 1536,
      height: 1024,
    },

    form: {
      heading: "How can we help?",

      name: {
        name: "fullName",
        label: "Full name",
        required: true,
        autoComplete: "name",
      },
      email: {
        name: "workEmail",
        label: "Work email",
        required: true,
        autoComplete: "email",
      },
      organisation: {
        name: "organisation",
        label: "Organisation",
        autoComplete: "organization",
      },
      phone: {
        name: "phone",
        label: "Phone",
        optional: "(optional)",
        autoComplete: "tel",
      },

      interest: {
        name: "interest",
        label: "I\u2019m interested in",
        options: [
          "Select an option",
          "Exploring Lurny for my organisation",
          "Partnering with Lurny",
          "Something else",
        ],
      },

      message: {
        name: "message",
        label: "Your message",
        required: true,
        placeholder: "Tell us a little about what you have in mind\u2026",
      },

      /** {0} is replaced by the link. */
      privacy: {
        text: "We\u2019ll use your details to respond to your enquiry. {0}.",
        link: { label: "Privacy Policy", href: "/privacy" },
      },

      submit: "Send message",

      errors: {
        name: "Please enter your name.",
        email: "Please enter your work email.",
        emailFormat: "Please enter a valid email address.",
        message: "Please tell us a little about what you have in mind.",
      },

      /**
       * Shown after a valid submit. The form is not wired to a destination
       * yet — the same site-wide TODO every other form carries — so this
       * says what happened rather than claiming a message was sent.
       */
      notice: "Message not sent \u2014 this form is not yet connected.",
    },
  },
} as const;
