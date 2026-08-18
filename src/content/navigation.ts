/**
 * NAVIGATION
 * ---------------------------------------------------------------------------
 * Single source of truth for header and footer links. Both components read
 * from here, so a route change is a one-line edit.
 *
 * TODO(content): replace placeholders once the page inventory is confirmed.
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

/** Primary header navigation. Keep to 5 or fewer — beyond that it crowds. */
export const mainNav: NavLink[] = [
  { label: "Features", href: "/#features" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
];

/** Header call-to-action buttons. */
export const headerActions = {
  secondary: { label: "Sign in", href: "/signin" } satisfies NavLink,
  primary: { label: "Get started", href: "/signup" } satisfies NavLink,
};

/** Footer link columns. */
export const footerNav: NavGroup[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "How it works", href: "/#how-it-works" },
      { label: "Pricing", href: "/#pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
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
