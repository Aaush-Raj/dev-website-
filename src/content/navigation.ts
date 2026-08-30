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
  /**
   * Opens a mega-menu on hover and focus. The value names which panel — see
   * `megaMenus` below. Absent means the item is a plain link.
   */
  mega?: MegaMenuKey;
}

/** The mega-menus the header can open, keyed by nav item. */
export type MegaMenuKey = "platform" | "resources";

export interface NavGroup {
  title: string;
  links: NavLink[];
}

/** One entry in a mega-menu column. */
export interface MegaMenuItem {
  name: string;
  description: string;
  href: string;
  /**
   * For the Platform menu, a file in public/assets/icons/engines. For the
   * Resources menu, a key into the drawn icon set in ResourcesMenuIcons —
   * those are line glyphs rather than the engines' painted discs, so they are
   * SVG in the bundle rather than another nine PNG downloads.
   */
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
  /** `mega` names the panel this item opens; see megaMenus below. */
  { label: "Platform", href: "/platform", mega: "platform" },
  { label: "Solutions", href: "/solutions" },
  { label: "Industries", href: "/industries" },
  { label: "Customers", href: "/customers" },
  { label: "Resources", href: "/resources", mega: "resources" },
  { label: "Company", href: "/company" },
];

/**
 * PLATFORM MEGA-MENU
 * ---------------------------------------------------------------------------
 * Three columns of engines, grouped by what they are for, plus a footer band.
 * Opens from the "Platform" item in mainNav. The columns are not all the same
 * length — "Work in the flow" carries four — so the panel's grid sizes each
 * column to its own content rather than assuming a fixed count.
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
        {
          name: "LurnyNotes",
          description: "Capture and act on what matters",
          href: "/platform/notes",
          /**
           * TODO(assets): `notes.png` is a PLACEHOLDER — a copy of the Lurny
           * KxP icon, so the menu renders while the real artwork is prepared.
           * Replace the file at public/assets/icons/engines/notes.png; nothing
           * here needs to change when it lands.
           */
          icon: "notes",
        },
      ],
    },
  ],

  footer: {
    /**
     * Two lines, as the design sets them. The count tracks the engines listed
     * above — it read "Nine" until LurnyNotes was added.
     */
    title: ["One capability model.", "Ten connected engines."],
    action: { label: "Explore the full platform", href: "/platform" },
  },
};

/**
 * RESOURCES MEGA-MENU
 * ---------------------------------------------------------------------------
 * The five resource types, in two columns, plus a footer band pointing at the
 * featured guide. Opens from the "Resources" item in mainNav.
 *
 * Deliberately the SAME panel shape as the Platform menu — two-line entries
 * with an icon, column headings, a closing band — so the header behaves
 * consistently whichever item you open. It is narrower only because five items
 * do not need three columns.
 *
 * Icons are drawn line glyphs rather than the engines' painted PNG discs; see
 * the note on MegaMenuItem.icon.
 *
 * TODO(routes): these hrefs follow the /resources/* pattern. Only /resources
 * exists today; the rest 404 until built.
 */
export const resourcesMenu: {
  columns: MegaMenuColumn[];
  footer: { title: string[]; action: NavLink };
} = {
  columns: [
    {
      title: "Read",
      items: [
        {
          name: "Insights",
          description: "Research and points of view on capability",
          href: "/resources/insights",
          icon: "insights",
        },
        {
          name: "Guides and Playbooks",
          description: "Practical frameworks you can put to work",
          href: "/resources/guides",
          icon: "guides",
        },
        {
          name: "Case Studies",
          description: "How teams turned capability into performance",
          href: "/resources/case-studies",
          icon: "cases",
        },
      ],
    },
    {
      title: "Watch and attend",
      items: [
        {
          name: "Webinars and Events",
          description: "Live sessions with practitioners and leaders",
          href: "/resources/events",
          icon: "events",
        },
        {
          name: "Videos",
          description: "Short explainers, demos and customer stories",
          href: "/resources/videos",
          icon: "videos",
        },
      ],
    },
  ],

  footer: {
    /** Two lines, matching the Platform menu's footer treatment. */
    title: ["From roles to readiness.", "The AI-era competency guide."],
    action: { label: "Download the guide", href: "/resources#download" },
  },
};

/** Every mega-menu the header can open, addressed by a nav item's `mega`. */
export const megaMenus = {
  platform: platformMenu,
  resources: resourcesMenu,
} as const;

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
