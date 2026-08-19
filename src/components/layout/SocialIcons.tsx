/**
 * SOCIAL ICONS
 * ---------------------------------------------------------------------------
 * Brand marks for the footer's social links, drawn on a 24x24 viewBox as
 * filled paths so they read correctly at small sizes on a dark ground.
 *
 * These are trademarks, so the glyphs are the official silhouettes rather
 * than stylised approximations. Each inherits currentColor.
 *
 * Decorative: the anchor around them supplies the accessible name, so they
 * are aria-hidden.
 */

type IconProps = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  "aria-hidden": true,
  focusable: false,
} as const;

export function LinkedInIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M6.94 5.5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0ZM3.3 8.93h3.4V20H3.3V8.93Zm5.44 0h3.26v1.51h.05c.45-.86 1.56-1.77 3.22-1.77 3.44 0 4.08 2.27 4.08 5.21V20h-3.4v-4.87c0-1.16-.02-2.65-1.61-2.65-1.62 0-1.87 1.26-1.87 2.57V20h-3.4V8.93Z" />
    </svg>
  );
}

export function XIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M17.53 3h3.06l-6.69 7.64L21.75 21h-6.16l-4.83-6.3L5.24 21H2.18l7.15-8.17L2.5 3h6.32l4.36 5.77L17.53 3Zm-1.07 16.17h1.69L7.6 4.74H5.79l10.67 14.43Z" />
    </svg>
  );
}

export function YouTubeIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M21.58 7.19a2.5 2.5 0 0 0-1.76-1.77C18.25 5 12 5 12 5s-6.25 0-7.82.42A2.5 2.5 0 0 0 2.42 7.2 26.1 26.1 0 0 0 2 12a26.1 26.1 0 0 0 .42 4.81 2.5 2.5 0 0 0 1.76 1.77C5.75 19 12 19 12 19s6.25 0 7.82-.42a2.5 2.5 0 0 0 1.76-1.77A26.1 26.1 0 0 0 22 12a26.1 26.1 0 0 0-.42-4.81ZM10 15.02V8.98L15.2 12 10 15.02Z" />
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 4.62c2.4 0 2.68.01 3.63.05.88.04 1.35.19 1.67.31.42.16.72.36 1.03.67.31.31.51.61.67 1.03.12.32.27.79.31 1.67.04.95.05 1.23.05 3.63s-.01 2.68-.05 3.63c-.4.88-.19 1.35-.31 1.67-.16.42-.36.72-.67 1.03-.31.31-.61.51-1.03.67-.32.12-.79.27-1.67.31-.95.04-1.23.05-3.63.05s-2.68-.01-3.63-.05c-.88-.04-1.35-.19-1.67-.31a2.78 2.78 0 0 1-1.03-.67 2.78 2.78 0 0 1-.67-1.03c-.12-.32-.27-.79-.31-1.67-.04-.95-.05-1.23-.05-3.63s.01-2.68.05-3.63c.04-.88.19-1.35.31-1.67.16-.42.36-.72.67-1.03a2.78 2.78 0 0 1 1.03-.67c.32-.12.79-.27 1.67-.31.95-.04 1.23-.05 3.63-.05ZM12 3c-2.44 0-2.75.01-3.71.05-.96.05-1.61.2-2.19.42-.6.23-1.1.54-1.61 1.05-.5.5-.82 1.01-1.05 1.61-.22.58-.37 1.23-.42 2.19C3.01 9.25 3 9.56 3 12s.01 2.75.05 3.71c.5.96.2 1.61.42 2.19.23.6.54 1.1 1.05 1.61.5.5 1.01.82 1.61 1.05.58.22 1.23.37 2.19.42.96.04 1.27.05 3.71.05s2.75-.01 3.71-.05c.96-.05 1.61-.2 2.19-.42.6-.23 1.1-.54 1.61-1.05.5-.5.82-1.01 1.05-1.61.22-.58.37-1.23.42-2.19.04-.96.05-1.27.05-3.71s-.01-2.75-.05-3.71c-.05-.96-.2-1.61-.42-2.19a4.4 4.4 0 0 0-1.05-1.61 4.4 4.4 0 0 0-1.61-1.05c-.58-.22-1.23-.37-2.19-.42C14.75 3.01 14.44 3 12 3Zm0 4.38a4.62 4.62 0 1 0 0 9.24 4.62 4.62 0 0 0 0-9.24ZM12 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm5.88-7.8a1.08 1.08 0 1 1-2.16 0 1.08 1.08 0 0 1 2.16 0Z" />
    </svg>
  );
}

/** Keys match the `icon` field in siteConfig.socials. */
export const socialIcons = {
  linkedin: LinkedInIcon,
  x: XIcon,
  youtube: YouTubeIcon,
  instagram: InstagramIcon,
} as const;

export type SocialIconName = keyof typeof socialIcons;
