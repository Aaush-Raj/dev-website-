/**
 * SECTION 11 CONTENT — book a demo
 * ---------------------------------------------------------------------------
 * The closing conversion section: a statement on the left, a booking form on
 * a raised card to the right.
 *
 * Field definitions live here rather than in the component so the form's
 * shape — labels, placeholders, options, which fields are required — is
 * editable without touching markup.
 */

export const demo = {
  eyebrow: "Book a demo",

  /** Split so the lines break where the design breaks them on lg+. */
  headline: ["See the loop", "running on your", "roles."] as const,

  description:
    "Bring one role and one business problem. We will show the capability model, the content it generates and the analytics your leadership would see — on your own scenario.",

  /** The two mono notes under the rule. */
  notes: [
    "45 minutes · no preparation required",
    "Security and deployment questions answered in the same session",
  ],

  /**
   * Form copy, in the shape LeadForm expects — see LeadFormContent in
   * components/ui/LeadForm.tsx. The product pages supply their own object of
   * the same shape, so the markup and validation are shared and only the
   * wording differs.
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
      placeholder: "name@bank.com",
      autoComplete: "email",
    },

    /** The two selects. First option in each is the design's resting value. */
    selectA: {
      name: "industry",
      label: "Industry",
      options: [
        "Banking and Financial Services",
        "Telecom",
        "Healthcare",
        "Manufacturing",
        "Professional Services",
        "Other",
      ],
    },
    selectB: {
      name: "workforceSize",
      label: "Workforce size",
      options: [
        "500 – 2,000",
        "Under 500",
        "2,000 – 10,000",
        "10,000 – 50,000",
        "50,000+",
      ],
    },

    detail: {
      name: "challenge",
      label: "Primary challenge",
      placeholder: "e.g. branch readiness after a product launch",
      autoComplete: "off",
    },

    consent: {
      name: "sendOverview",
      label:
        "Send me the Lurny security and deployment overview. One email, unsubscribe any time.",
    },

    submit: "Book a Demo",

    /**
     * Shown after a successful submit. The form is replaced by this rather
     * than left on screen with a banner, so there is no ambiguity about
     * whether the details went through.
     */
    success: {
      title: "Request received.",
      description:
        "We will be in touch within one business day to arrange a time.",
    },

    /** Validation copy, kept beside the fields it describes. */
    errors: {
      name: "Please enter your name.",
      email: "Please enter your work email.",
      emailFormat: "Please enter a valid email address.",
    },

    /** {0} and {1} are replaced by the links below, in order. */
    footnote: {
      text: "Prefer to talk first? {0} or {1}.",
      links: [
        { label: "Contact Sales", href: "/contact" },
        { label: "request a pilot", href: "/pilot" },
      ],
    },
  },
} as const;
