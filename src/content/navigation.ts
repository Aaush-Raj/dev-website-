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
      { label: "Overview", href: "/platform" },
      { label: "Capabilities", href: "/platform/capabilities" },
      { label: "Analytics", href: "/platform/analytics" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/company" },
      { label: "Customers", href: "/customers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];
