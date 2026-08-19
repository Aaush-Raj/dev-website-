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
}

export interface NavGroup {
  title: string;
  links: NavLink[];
}

/**
 * Primary header navigation.
 * TODO(routes): point these at real pages as they are built.
 */
export const mainNav: NavLink[] = [
  { label: "Platform", href: "/platform" },
  { label: "Solutions", href: "/solutions" },
  { label: "Industries", href: "/industries" },
  { label: "Customers", href: "/customers" },
  { label: "Resources", href: "/resources" },
  { label: "Company", href: "/company" },
];

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
