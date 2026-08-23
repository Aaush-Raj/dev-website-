/**
 * NAVIGATION
 * ---------------------------------------------------------------------------
 * Single source of truth for header and footer links. Both components read
 * from here, so a route change is a one-line edit.
 *
 * Labels match the hero design. Hrefs are placeholders until the page
 * inventory is confirmed — see TODO below.
 */

export interface NavLink {
  label: string;
  href: string;
  /** Outbound link — renders with target="_blank" and rel="noopener". */
  external?: boolean;
  /** Opens the Platform mega-menu on hover and focus. */
  hasMega?: boolean;
}

export interface NavGroup {
  title: string;
  links: NavLink[];
}

/** One engine in the Platform mega-menu. */
export interface MegaMenuItem {
  name: string;
  description: string;
  href: string;
  /** Icon in public/assets/icons/engines. */
  icon: string;
}

export interface MegaMenuColumn {
  title: string;
  items: MegaMenuItem[];
}

/**
 * Primary header navigation.
 * TODO(routes): point these at real pages as they are built.
 */
export const mainNav: NavLink[] = [
  /** `hasMega` opens the Platform mega-menu; see platformMenu below. */
  { label: "Platform", href: "/platform", hasMega: true },
  { label: "Solutions", href: "/solutions" },
  { label: "Industries", href: "/industries" },
  { label: "Customers", href: "/customers" },
  { label: "Resources", href: "/resources" },
  { label: "Company", href: "/company" },
];

/**
 * PLATFORM MEGA-MENU
 * ---------------------------------------------------------------------------
 * Three columns of three engines, grouped by what they are for, plus a footer
 * band. Opens from the "Platform" item in mainNav.
 *
 * Icons live in public/assets/icons/engines. Each already includes the
 * lavender disc behind the glyph, so nothing draws a circle around them.
 *
 * TODO(routes): these hrefs follow the /platform/* pattern already used by the
 * footer. Only /platform/pitch exists today; the rest 404 until built.
 */
export const platformMenu: {
  columns: MegaMenuColumn[];
  footer: { title: string[]; action: NavLink };
} = {
  columns: [
    {
      title: "Build capability",
      items: [
        {
          name: "LurnyPulse",
          description: "Role readiness and capability intelligence",
          href: "/platform/pulse",
          icon: "pulse",
        },
        {
          name: "LurnyMagic",
          description: "AI content creation and transformation",
          href: "/platform/magic",
          icon: "magic",
        },
        {
          name: "Lurny KxP",
          description: "Learning, journeys and distribution",
          href: "/platform/kxp",
          icon: "kxp",
        },
      ],
    },
    {
      title: "Enable performance",
      items: [
        {
          name: "LurnyChat",
          description: "Trusted knowledge in the flow of work",
          href: "/platform/chat",
          icon: "chat",
        },
        {
          name: "LurnyPitch",
          description: "Conversation intelligence and coaching",
          href: "/platform/pitch",
          icon: "pitch",
        },
        {
          name: "LurnyEvents",
          description: "Instructor-led learning, end to end",
          href: "/platform/events",
          icon: "events",
        },
      ],
    },
    {
      title: "Work in the flow",
      items: [
        {
          name: "LurnySaathi",
          description: "Voice-first mobile companion",
          href: "/platform/saathi",
          icon: "saathi",
        },
        {
          name: "LurnyBiz",
          description: "CRM-led next-best action",
          href: "/platform/biz",
          icon: "biz",
        },
        {
          name: "LurnySense",
          description: "Conversational analytics for leaders",
          href: "/platform/sense",
          icon: "sense",
        },
      ],
    },
  ],

  footer: {
    /** Two lines, as the design sets them. */
    title: ["One capability model.", "Nine connected engines."],
    action: { label: "Explore the full platform", href: "/platform" },
  },
};

/** Header call-to-action buttons. */
export const headerActions = {
  secondary: { label: "Sign in", href: "/signin" } satisfies NavLink,
  primary: { label: "Book a Demo", href: "/demo" } satisfies NavLink,
};

/** Footer link columns. */
export const footerNav: NavGroup[] = [
  {
    title: "Platform",
    links: [
      { label: "Lurny KxP", href: "/platform/kxp" },
      { label: "LurnyMagic", href: "/platform/magic" },
      { label: "LurnyPulse", href: "/platform/pulse" },
      { label: "LurnyPitch", href: "/platform/pitch" },
      { label: "LurnyChat", href: "/platform/chat" },
      { label: "LurnySense", href: "/platform/sense" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Sales Enablement", href: "/solutions/sales-enablement" },
      { label: "Frontline Capability", href: "/solutions/frontline" },
      { label: "Compliance", href: "/solutions/compliance" },
      { label: "Customer Service", href: "/solutions/customer-service" },
      { label: "Onboarding", href: "/solutions/onboarding" },
      { label: "Industries", href: "/industries" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Lurny", href: "/company" },
      { label: "Customers", href: "/customers" },
      { label: "Resources", href: "/resources" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

/** The band above the footer columns. */
export const footerCta = {
  text: "Ready to turn capability into performance?",
  action: { label: "Book a demo", href: "/demo" },
};

/** Brand block beside the link columns. */
export const footerBrand = {
  tagline: "AI-native capability-to-performance platform",
  location: "Bangalore, India",
};

/** Legal line. */
export const footerLegal = {
  company: "Lurny Innovative Labs Pvt Ltd",
  links: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Security", href: "/security" },
  ],
};
