import type { SVGProps } from "react";

/**
 * SOLUTIONS — ENGINE STAGE ICONS
 * ---------------------------------------------------------------------------
 * The five glyphs on section 3's rail. No asset set was supplied for this
 * section, so these are drawn from the design: violet line-work on a 48-box,
 * inheriting currentColor so the stage tones them.
 */

type IconProps = SVGProps<SVGSVGElement>;

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** 01 — a magnifier over a bar chart: diagnose. */
function DiagnoseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <circle {...stroke} cx="21" cy="20" r="13" />
      <path {...stroke} d="M16.5 24.5v-4M21 24.5v-9M25.5 24.5v-6.5" />
      <path {...stroke} d="m30.5 29.5 8 8" />
    </svg>
  );
}

/** 02 — stacked cubes: build. */
function BuildIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <rect {...stroke} x="18" y="7" width="12" height="12" rx="1.5" />
      <rect {...stroke} x="8" y="26" width="12" height="12" rx="1.5" />
      <rect {...stroke} x="28" y="26" width="12" height="12" rx="1.5" />
    </svg>
  );
}

/** 03 — a target with an arrow in it: practise. */
function PractiseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <circle {...stroke} cx="22" cy="26" r="14" />
      <circle {...stroke} cx="22" cy="26" r="8" />
      <circle {...stroke} cx="22" cy="26" r="2.5" />
      <path {...stroke} d="m22 26 16-16" />
      <path {...stroke} d="M31 8h9v9" />
    </svg>
  );
}

/** 04 — a speech bubble with an ellipsis: support. */
function SupportIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <path
        {...stroke}
        d="M40 22c0 8.3-7.2 15-16 15-1.9 0-3.8-.3-5.5-.9L8 40l3.4-8.1A14.4 14.4 0 0 1 8 22C8 13.7 15.2 7 24 7s16 6.7 16 15Z"
      />
      <circle cx="17" cy="22" r="2" fill="currentColor" />
      <circle cx="24" cy="22" r="2" fill="currentColor" />
      <circle cx="31" cy="22" r="2" fill="currentColor" />
    </svg>
  );
}

/** 05 — bars under a rising arrow: measure and improve. */
function MeasureIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <path {...stroke} d="M8 40h32" />
      <path {...stroke} d="M13 40v-9M21 40v-14M29 40v-10M37 40v-18" />
      <path {...stroke} d="m12 24 9-9 8 6 11-13" />
      <path {...stroke} d="M32 8h8v8" />
    </svg>
  );
}

export const engineIcons = {
  diagnose: DiagnoseIcon,
  build: BuildIcon,
  practise: PractiseIcon,
  support: SupportIcon,
  measure: MeasureIcon,
} as const;

export type EngineIconName = keyof typeof engineIcons;

/** The four-point star in the "difference" band. */
export function SparkStarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <path
        d="M24 3c1.5 12.6 7.9 19 20.5 20.5C31.9 25 25.5 31.4 24 44c-1.5-12.6-7.9-19-20.5-20.5C16.1 22 22.5 15.6 24 3Z"
        fill="currentColor"
      />
    </svg>
  );
}
