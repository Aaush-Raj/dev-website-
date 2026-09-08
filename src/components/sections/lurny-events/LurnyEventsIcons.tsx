import type { SVGProps } from "react";

/**
 * LURNYEVENTS ICONS
 * ---------------------------------------------------------------------------
 * The glyphs the LurnyEvents hero needs, drawn inline.
 *
 * The asset pack ships the console as one flat bitmap, so there are no icon
 * files to use even if a raster were preferable — and it would not be. These
 * render at 14-22px, where a path stays sharp at any density and inherits
 * currentColor, which this hero needs: the same mark is drawn amber on the
 * console's plus button and near-black inside the certificate card.
 */

type IconProps = SVGProps<SVGSVGElement>;

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** A plus — the console's brand mark and its "create event" affordance. */
export function PlusIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M12 5.5v13M5.5 12h13" {...stroke} />
    </svg>
  );
}

/**
 * A hexagon badge — the certificate mark on the learning-record card. Drawn
 * as an outline so the amber tile behind it reads through the centre, the way
 * the design has it.
 */
export function BadgeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M12 2.8 20 7.4v9.2L12 21.2 4 16.6V7.4L12 2.8Z"
        {...stroke}
        strokeWidth={1.9}
      />
    </svg>
  );
}

/** A right arrow — the secondary CTA and the console's agenda link. */
export function ArrowIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M4.5 12h15M13.5 6l6 6-6 6" {...stroke} strokeWidth={1.8} />
    </svg>
  );
}

/** A clock — the demo section's "30 minutes" point. */
export function ClockIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="8.6" {...stroke} strokeWidth={1.8} />
      <path d="M12 7.2V12l3.2 2" {...stroke} strokeWidth={1.8} />
    </svg>
  );
}

/** A speech bubble — the demo section's second point. */
export function BubbleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M20.4 11.4c0 3.9-3.8 7-8.4 7a10 10 0 0 1-2.7-.4l-5 1.7 1.7-4a6.5 6.5 0 0 1-1.7-4.3c0-3.9 3.8-7 8.4-7s7.7 3.1 7.7 7Z"
        {...stroke}
        strokeWidth={1.8}
      />
    </svg>
  );
}
