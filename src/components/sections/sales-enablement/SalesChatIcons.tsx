import type { SVGProps } from "react";

/**
 * SALES ENABLEMENT — LURNYCHAT ICONS (section 4)
 * ---------------------------------------------------------------------------
 * Every glyph the "Apply with LurnyChat" section needs, drawn inline.
 *
 * WHY NONE OF THE PACK'S ICONS ARE USED
 * The asset pack's README says it outright: "Icons are not transparent." Each
 * one is an opaque crop, so dropping it onto the panel would land a small slate
 * rectangle instead of a glyph — visible against the panel's translucent fill
 * and against the tinted circles in the capability list. They also render at
 * 14-26px here, where a path is sharper than a raster at any density and can
 * inherit currentColor, which the section needs: the same bubble glyph is drawn
 * teal in the list and white-dimmed inside the panel.
 *
 * Kept in their own file rather than inline in SalesChat, so the section's
 * markup stays readable — the panel is long enough already.
 */

type IconProps = SVGProps<SVGSVGElement>;

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** A speech bubble — "understand the customer's concern", and the brand mark. */
export function BubbleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M20.5 11.4c0 3.9-3.8 7-8.5 7a10 10 0 0 1-2.7-.4l-5 1.7 1.7-4a6.5 6.5 0 0 1-1.7-4.3c0-3.9 3.8-7 8.5-7s7.7 3.1 7.7 7Z"
        {...stroke}
      />
    </svg>
  );
}

/** Concentric rings with a centre dot — "connect benefits to their needs". */
export function TargetIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="8.4" {...stroke} />
      <circle cx="12" cy="12" r="4.2" {...stroke} />
      <circle cx="12" cy="12" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** A framed bar chart — "prepare a useful next question". */
export function ChartIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect x="3.6" y="3.6" width="16.8" height="16.8" rx="2.6" {...stroke} />
      <path d="M8.4 16.2v-3.6M12 16.2V8.4M15.6 16.2v-5.4" {...stroke} />
    </svg>
  );
}

/** An open book — the grounding chip and the cited source. */
export function BookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M12 6.6C10.4 5.3 8.4 4.8 4.5 4.8v12.6c3.9 0 5.9.5 7.5 1.8 1.6-1.3 3.6-1.8 7.5-1.8V4.8c-3.9 0-5.9.5-7.5 1.8Z"
        {...stroke}
      />
      <path d="M12 6.6v12.6" {...stroke} />
    </svg>
  );
}

/** A four-point sparkle — the assistant's avatar mark. */
export function SparkleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M13.2 2.4 15 8.1l5.7 1.8-5.7 1.8-1.8 5.7-1.8-5.7-5.7-1.8 5.7-1.8 1.8-5.7Z"
        fill="currentColor"
      />
      <path
        d="M6.3 15.3l.85 2.55 2.55.85-2.55.85-.85 2.55-.85-2.55L2.9 18.7l2.55-.85.85-2.55Z"
        fill="currentColor"
        opacity="0.7"
      />
    </svg>
  );
}

/** A document with lines — the "make it shorter" chip. */
export function DocumentIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M14.4 3H7.2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9.6a2 2 0 0 0 2-2V7.8Z"
        {...stroke}
      />
      <path d="M14.4 3v4.8h4.8M9 13.2h6M9 16.8h3.6" {...stroke} />
    </svg>
  );
}

/** A single figure — the "help me practise" chip. */
export function PersonIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="12" cy="8.1" r="3.5" {...stroke} />
      <path d="M5.4 20.4a6.6 6.6 0 0 1 13.2 0" {...stroke} />
    </svg>
  );
}

/** A paper plane — the composer's send button. */
export function SendIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M3 11.4 21 4l-7.2 17-2.7-6.9L3 11.4Z" {...stroke} />
    </svg>
  );
}

/** A right arrow — the CTA. */
export function ArrowIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M4.5 12h15M13.5 6l6 6-6 6" {...stroke} />
    </svg>
  );
}

/** Keyed by the `icon` fields on the chat section's content. */
export const chatIcons = {
  bubble: BubbleIcon,
  target: TargetIcon,
  chart: ChartIcon,
  book: BookIcon,
  sparkle: SparkleIcon,
  document: DocumentIcon,
  person: PersonIcon,
  send: SendIcon,
  arrow: ArrowIcon,
} as const;
