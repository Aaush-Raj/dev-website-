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
/**
 * The panels the header can open.
 *
 * "coming-soon" is one of these so it shares the header's open/close machinery
 * — the hover timers, Escape-to-close with focus return, and the route-change
 * guard — rather than duplicating that state. It renders through its OWN
 * component, though: `MegaMenu` lays out columns of links, and this panel is
 * two large cards.
 */
export type MegaMenuKey =
  "platform" | "solutions" | "resources" | "coming-soon";

/** The subset of panels that `MegaMenu` renders as columns of links. */
export type ColumnMenuKey = Exclude<MegaMenuKey, "coming-soon">;

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
   * Either a filename in the menu's `iconPath` directory, or — when the menu
   * has no `iconPath` — a key into the drawn set in ResourcesMenuIcons.
   *
   * Which of the two applies is a property of the MENU, not of this item: see
   * `iconPath` on MegaMenuPanel.
   */
  icon: string;
}

export interface MegaMenuColumn {
  title: string;
  items: MegaMenuItem[];
  /**
   * Lay this column's items two per row rather than in a single list.
   *
   * The Solutions panel needs it: eleven entries in two single-file columns
   * would run far taller than the viewport, so the design pairs them. Platform
   * and Resources have few enough to read as lists, and omit it.
   */
  paired?: boolean;
  /**
   * OPTIONAL link closing the column, as the Solutions panel has under its
   * business-need list.
   *
   * A separate field rather than one more `items` entry: it carries no icon
   * and no description, so squeezing it into that shape would mean an item
   * with two empty fields and a special case in the panel to hide them.
   */
  action?: NavLink;
}

export interface MegaMenuPanel {
  columns: MegaMenuColumn[];
  footer: { title: string[]; action: NavLink };
  /**
   * Public directory holding this menu's icon PNGs, WITHOUT a trailing slash.
   *
   * Its presence is what tells the panel which icon treatment to use. Menus
   * that set it ship painted marks with the lavender disc baked into the
   * asset, so nothing is drawn around them; menus that omit it use the stroked
   * glyphs in ResourcesMenuIcons, which draw their own disc.
   *
   * Declared here rather than inferred from the menu's key, because the split
   * is about how the ART was supplied — two menus now share the painted
   * treatment, and a third could arrive either way.
   */
  iconPath?: string;
}

/**
 * Primary header navigation.
 * TODO(routes): point these at real pages as they are built.
 */
export const mainNav: NavLink[] = [
  /** `mega` names the panel this item opens; see megaMenus below. */
  { label: "Platform", href: "/platform", mega: "platform" },
  /* Solutions carries BOTH the business-need pages and the industry ones —
     the two used to be separate nav items, and the mega-menu now presents
     them side by side. `/industries` is still a real page, reachable from
     this panel's industry column and from the footer. */
  { label: "Solutions", href: "/solutions", mega: "solutions" },
  { label: "Pricing", href: "/pricing" },
  { label: "Resources", href: "/resources", mega: "resources" },
  /*
     CAMPUS AND COMPANY ARE DELIBERATELY ABSENT.

     Company moved to the footer, where its column already led with "About
     Lurny" pointing at the same route — so nothing was added there, the
     header entry was simply redundant.

     Campus is UNLINKED ON PURPOSE. The header was /campus's only entry point
     anywhere on the site, so the page is now reachable by direct URL alone.
     That is intended; re-adding a link is a content decision, not an
     oversight to be tidied up.
  */
];

/**
 * PLATFORM MEGA-MENU
 * ---------------------------------------------------------------------------
 * Three columns of engines, grouped by what they are for, plus a footer band.
 * Opens from the "Platform" item in mainNav. The columns are not all the same
 * length, so the panel's grid sizes each column to its own content rather than
 * assuming a fixed count.
 *
 * The twelve engines match the platform page's grid, which is the source of
 * truth for that list. LurnyFabric leads the first column but is NOT one of
 * them — see the note on its entry.
 *
 * Icons live in public/assets/icons/engines. Each already includes the
 * lavender disc behind the glyph, so nothing draws a circle around them.
 *
 * TODO(routes): these hrefs follow the /platform/* pattern already used by the
 * footer. Any that have no page yet 404 until built.
 */
export const platformMenu: MegaMenuPanel = {
  /** Painted marks with the disc baked in — see `iconPath` on MegaMenuPanel. */
  iconPath: "/assets/icons/engines",
  columns: [
    {
      title: "Build capability",
      items: [
        /**
         * LurnyFabric leads this column but is NOT a twelfth engine — it is the
         * connective layer the others run on, which is why its description says
         * so and why the footer's engine count below does not include it.
         *
         * It sat in a fourth column of its own at first. The shared panel lays
         * out two or three columns, so a fourth wrapped to a second row and
         * orphaned "Work in the flow" beneath it. Leading the first column
         * keeps it prominent without touching the shared component for one
         * entry.
         */
        {
          name: "LurnyFabric",
          description: "Connect, orchestrate and govern every engine",
          href: "/platform/fabric",
          /**
           * TODO(assets): `fabric.png` is a drawn PLACEHOLDER — a woven lattice
           * on the set's lavender disc — until the painted mark is supplied.
           * Replace the file at public/assets/icons/engines/fabric.png;
           * nothing here needs to change when it lands.
           */
          icon: "fabric",
        },
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
          name: "LurnyFlix",
          description: "AI video creation for L&D",
          href: "/platform/flix",
          icon: "flix",
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
          name: "LurnySim",
          description: "Realistic role-play and practice",
          /* No route yet — /platform/sim is not built, so this 404s until it
             is. Listed anyway: it is one of the twelve engines, and the
             platform page already shows its card. */
          href: "/platform/sim",
          /**
           * TODO(assets): `sim.png` is a drawn PLACEHOLDER — two figures in
           * conversation on the set's lavender disc — until the painted mark is
           * supplied. Replace the file at
           * public/assets/icons/engines/sim.png; nothing here needs to change.
           */
          icon: "sim",
        },
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
     * above — it read "Nine" until LurnyNotes was added, and "Ten" until
     * LurnyFlix.
     */
    title: ["One capability model.", "Twelve connected engines."],
    action: { label: "Explore the full platform", href: "/platform" },
  },
};

/**
 * SOLUTIONS MEGA-MENU
 * ---------------------------------------------------------------------------
 * Two columns side by side: the business-need pages on the left, the industry
 * pages on the right, plus a footer band. Opens from the "Solutions" item in
 * mainNav.
 *
 * WHY IT IS ONE MENU AND NOT TWO NAV ITEMS
 * Solutions and Industries used to sit beside each other in the header. They
 * answer the same question from two directions — what you are trying to do,
 * and the sector you are doing it in — so the design folds them into a single
 * panel and frees a header slot.
 *
 * Icons live in public/assets/icons/solutions; each bakes in the lavender disc
 * exactly as the engine icons do, which is why this menu sets `iconPath`.
 *
 * TODO(routes): every business-need href exists except Compliance Readiness,
 * which points at /solutions/compliance. The six industry entries all point at
 * the industries page's sector grid — there are no per-sector routes yet, and
 * linking to pages that do not exist would 404 from the header.
 */
export const solutionsMenu: MegaMenuPanel = {
  /** Painted marks with the disc baked in — see `iconPath` on MegaMenuPanel. */
  iconPath: "/assets/icons/solutions",
  columns: [
    {
      title: "By business need",
      paired: true,
      items: [
        {
          name: "Capability Building",
          description: "Build skills for every role",
          href: "/solutions/capability-building",
          icon: "capability-building",
        },
        {
          name: "Frontline Performance",
          description: "Turn learning into better outcomes",
          href: "/solutions/frontline",
          icon: "frontline-performance",
        },
        {
          name: "Employee Onboarding",
          description: "Help new joiners get ready",
          href: "/solutions/onboarding",
          icon: "employee-onboarding",
        },
        {
          name: "Compliance Readiness",
          description: "Build confidence. Show evidence.",
          href: "/solutions/compliance",
          icon: "compliance-readiness",
        },
        {
          name: "Knowledge Management",
          description: "Make trusted answers accessible",
          href: "/solutions/knowledge-management",
          icon: "knowledge-management",
        },
      ],
      action: { label: "Explore all solutions", href: "/solutions" },
    },
    {
      title: "By industry",
      paired: true,
      items: [
        {
          name: "BFSI",
          description: "Banking, finance & insurance",
          href: "/industries#industries",
          icon: "bfsi",
        },
        {
          name: "Telecom",
          description: "Connected teams & service",
          href: "/industries#industries",
          icon: "telecom",
        },
        {
          name: "Healthcare",
          description: "Care quality & workforce readiness",
          href: "/industries#industries",
          icon: "healthcare",
        },
        {
          name: "Manufacturing",
          description: "Skills, safety & operations",
          href: "/industries#industries",
          icon: "manufacturing",
        },
        {
          name: "Professional Services",
          description: "Expertise & client delivery",
          href: "/industries#industries",
          icon: "professional-services",
        },
        {
          name: "Retail",
          description: "Store teams & customer experience",
          href: "/industries#industries",
          icon: "retail",
        },
      ],
    },
  ],

  footer: {
    /** Two lines, matching the other menus' footer treatment. */
    title: ["Your business goals.", "Your industry context."],
    /* The homepage demo form, not /contact: the design's label points at a
       conversation, and /contact does not exist yet — several content files
       already link to it, see the routes TODO. `/#demo` is the form that
       actually answers this CTA today. */
    action: { label: "Let’s talk about your challenge", href: "/#demo" },
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
/* No `iconPath`: this menu's marks are stroked glyphs drawn in
   ResourcesMenuIcons, which supply their own disc. */
export const resourcesMenu: MegaMenuPanel = {
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
          name: "Customer Stories",
          description: "How organisations put learning to work",
          href: "/customers",
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

/**
 * The COLUMN menus, addressed by a nav item's `mega`.
 *
 * Deliberately not `Record<MegaMenuKey, ...>`: "coming-soon" is a valid panel
 * key but is not column-shaped, so it has no entry here and renders through
 * its own component instead. Typing this as a full Record would demand a
 * columns/footer shape that panel does not have.
 */
export const megaMenus: Record<ColumnMenuKey, MegaMenuPanel> = {
  platform: platformMenu,
  solutions: solutionsMenu,
  resources: resourcesMenu,
};

/**
 * Header call-to-action buttons.
 *
 * There is no `secondary` any more: the "Sign in" button was removed, and its
 * /signin route never existed. Both header and mobile menu read `primary`
 * only, so adding a second action back means changing those two components as
 * well as this object.
 */
export const headerActions = {
  primary: { label: "Book a Demo", href: "/demo" } satisfies NavLink,
};

/**
 * THE COMING SOON PANEL
 * ---------------------------------------------------------------------------
 * Opens from the header's "Coming Soon" button, in the slot the Sign in button
 * used to occupy.
 *
 * These are INDEPENDENT PLATFORMS, not engines — they do not belong in the
 * Platform mega-menu, which is why they get a panel of their own. The heading
 * says so in as many words.
 *
 * LurnyCampus is a real page today; Lurny.ai is not built yet. Its href is
 * marked below rather than being quietly pointed somewhere plausible.
 */
export const comingSoonMenu = {
  /** The label above the two cards. */
  title: "Independent platforms from Lurny",

  items: [
    {
      id: "lurny-ai",
      name: "Lurny.ai",
      description:
        "Create learning, build your community and earn from your expertise.",
      /** TODO(routes): /lurny-ai does not exist yet. */
      href: "/lurny-ai",
      cta: "Explore Lurny.ai",
      /** `tone` keys the badge and link colour — coral for ai, green for campus. */
      tone: "coral",
      badge: "Launching by October 2026",
      image: {
        src: "/assets/images/coming-soon/lurny-ai.webp",
        /*
          `alt` is empty: the card's own name, description and link carry the
          meaning, and the photograph is atmosphere. The UI cards baked into it
          are illustrative rather than real interface.
        */
        alt: "",
      },
    },
    {
      id: "campus",
      name: "LurnyCampus",
      description:
        "Build capability, demonstrate your skills and prepare for the world of work.",
      href: "/campus",
      cta: "Explore LurnyCampus",
      tone: "green",
      badge: "Coming soon",
      image: {
        src: "/assets/images/coming-soon/campus.webp",
        alt: "",
      },
    },
  ],
} as const;

/** Footer link columns. */
export const footerNav: NavGroup[] = [
  {
    title: "Platform",
    links: [
      { label: "Lurny KxP", href: "/platform/kxp" },
      { label: "LurnyMagic", href: "/platform/magic" },
      { label: "LurnyFlix", href: "/platform/flix" },
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
      { label: "Pricing", href: "/pricing" },
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
