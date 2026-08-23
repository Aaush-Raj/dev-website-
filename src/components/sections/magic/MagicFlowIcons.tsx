/**
 * MAGIC FLOW ICONS
 * ---------------------------------------------------------------------------
 * Glyphs for the flow diagram in section 3: the four input types down the left,
 * and the wand at the centre node.
 *
 * Drawn on a 24x24 grid at a 1.5 stroke, matching the design's line weight.
 * They inherit `currentColor` so a card can tint its glyph on hover.
 */

interface IconProps {
  className?: string;
}

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** A page with ruled lines. */
export function DocumentInputIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M6 3.2h7.2L18 8v12.8H6z" />
      <path d="M13 3.4V8h4.6" />
      <path d="M9 12.2h6M9 15.4h6M9 18h3.4" />
    </svg>
  );
}

/** A globe. */
export function WebpageInputIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="8.6" />
      <path d="M3.6 12h16.8" />
      <path d="M12 3.4c2.2 2.4 3.3 5.4 3.3 8.6s-1.1 6.2-3.3 8.6c-2.2-2.4-3.3-5.4-3.3-8.6S9.8 5.8 12 3.4Z" />
    </svg>
  );
}

/** A play badge. */
export function VideoInputIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <rect x="3.4" y="4.6" width="17.2" height="14.8" rx="3" />
      <path d="M10.4 9.6v4.8l4.2-2.4z" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** A terminal prompt. */
export function PromptInputIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <rect x="3.4" y="4.6" width="17.2" height="14.8" rx="3" />
      <path d="m7.6 9.6 3 2.4-3 2.4M13 14.6h4" />
    </svg>
  );
}

/**
 * The wand at the centre node.
 *
 * Filled rather than stroked, and two-tone — violet wand with amber sparks, as
 * the design shows — so it does not take `currentColor`.
 */
export function WandIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* The wand, on a diagonal. */}
      <rect
        x="6.5"
        y="26.5"
        width="24"
        height="7"
        rx="3.5"
        transform="rotate(-45 6.5 26.5)"
        fill="var(--brand-400)"
      />
      <rect
        x="9"
        y="26.6"
        width="20"
        height="2.4"
        rx="1.2"
        transform="rotate(-45 9 26.6)"
        fill="var(--brand-200)"
        opacity="0.55"
      />

      {/* Sparks: one large violet, two amber, one small white. */}
      <path
        d="M33 10.5c.9 3.4 2.1 4.6 5.5 5.5-3.4.9-4.6 2.1-5.5 5.5-.9-3.4-2.1-4.6-5.5-5.5 3.4-.9 4.6-2.1 5.5-5.5Z"
        fill="var(--brand-300)"
      />
      <path
        d="M27.5 6c.5 1.9 1.2 2.6 3.1 3.1-1.9.5-2.6 1.2-3.1 3.1-.5-1.9-1.2-2.6-3.1-3.1 1.9-.5 2.6-1.2 3.1-3.1Z"
        fill="var(--accent-400)"
      />
      <path
        d="M36 25.5c.6 2.2 1.4 3 3.6 3.6-2.2.6-3 1.4-3.6 3.6-.6-2.2-1.4-3-3.6-3.6 2.2-.6 3-1.4 3.6-3.6Z"
        fill="var(--accent-400)"
      />
      <path
        d="M22.5 21c.3 1.1.7 1.5 1.8 1.8-1.1.3-1.5.7-1.8 1.8-.3-1.1-.7-1.5-1.8-1.8 1.1-.3 1.5-.7 1.8-1.8Z"
        fill="#ffffff"
      />
    </svg>
  );
}

/** A parcel, for the SCORM package card. */
export function PackageIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path d="M24 5 42 14.5v19L24 43 6 33.5v-19z" fill="var(--brand-500)" />
      <path d="M24 5 42 14.5 24 24 6 14.5z" fill="var(--brand-400)" />
      <path d="M24 24v19L6 33.5v-19z" fill="var(--brand-600)" />
      {/* The tape strips the design draws across the top face. */}
      <g stroke="var(--brand-100)" strokeWidth="1.4" opacity="0.75">
        <path d="M14 12.2 32 21.6M18.5 9.6 36.5 19" />
      </g>
    </svg>
  );
}

/** Keys match the `icon` fields in `formats.inputs.items` of content/magic.ts. */
export const flowInputIcons = {
  document: DocumentInputIcon,
  webpage: WebpageInputIcon,
  video: VideoInputIcon,
  prompt: PromptInputIcon,
} as const;
