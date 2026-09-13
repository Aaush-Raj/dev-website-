"use client";

import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

/**
 * FABRIC FILAMENTS
 * ---------------------------------------------------------------------------
 * The cosmic strand burst behind the hero diagram: a bundle of fine curves
 * that pinches to a bright waist beside the core pill and fans out wide toward
 * the frame edge, mirrored on both sides.
 *
 * DRAWN, NOT SHIPPED. The design pack supplies this as a 1.4MB plate whose own
 * README admits the extraction failed. It is also the part of the hero that
 * most needs to move, and a flat plate cannot.
 *
 * HOW IT IS BUILT, from studying the design: every strand runs from the waist
 * out to the edge, and they differ only in how far they sit from the centre
 * line at the far end. Because they all pass through the SAME waist point they
 * cross there, and the overlapping strokes bloom to white-cyan — which is why
 * the design's brightest pixel is the waist rather than any single strand. No
 * strand is individually bright; the glow is the crossing.
 *
 * The `spread` of each strand follows a SINE of its index rather than a linear
 * ramp. A linear fan renders as a flat wedge — evenly spaced lines with a hard
 * outer edge. Easing the spacing packs the strands densely near the centre line
 * and thins them toward the outside, which is what gives the bundle its soft
 * feathered silhouette.
 *
 * The viewBox keeps a FIXED aspect ratio. Stretching it (`preserveAspectRatio
 * ="none"`) flattens the curves toward straight lines at wide viewports, the
 * failure this build has hit on every connector drawn in a distorted box.
 */

/** Motion's string easings are not typed, so the cubic curve is spelled out. */
const easeOut = [0.16, 1, 0.3, 1] as const;

/** Strands per side. Enough to read as a bundle, few enough to stay cheap. */
const COUNT = 44;

/**
 * The drawing box.
 *
 * Its aspect MATCHES the element the fan is placed in, so `meet` has nothing
 * to letterbox. When it did not, the SVG was scaled to fit the shorter axis and
 * inset by ~240px on each side — which moved the waist from 18% of the element
 * to 37% of it, and no amount of adjusting the element's own offset could put
 * the bloom back on the core's edge.
 */
const BOX = { w: 760, h: 268 } as const;

/** Where the bundle pinches, as a fraction of the box width from the core. */
const WAIST_X = 0.18;

/**
 * One strand's path, mirrored by the caller for the other side.
 *
 * `t` runs 0..1 across the bundle. The strand leaves the waist and sweeps out
 * to `spread` at the far edge; the control points are placed so it leaves the
 * waist almost horizontally and only opens up in the outer half, which is the
 * profile the design shows.
 */
function strandPath(t: number) {
  const mid = BOX.h / 2;
  const waistX = BOX.w * WAIST_X;

  // Signed offset: the bundle is symmetric, so half the strands go each way.
  const side = t < 0.5 ? -1 : 1;
  const u = t < 0.5 ? 1 - t * 2 : (t - 0.5) * 2;

  // Eased spacing — see the note above on why this is not linear.
  const spread = Math.sin(u * (Math.PI / 2)) ** 0.82 * (BOX.h / 2) * 0.94;
  const endY = mid + side * spread;

  // A touch of vertical play at the waist so the crossing is a small bright
  // lens rather than a single mathematical point.
  const waistY = mid + side * spread * 0.045;

  /*
    The control points are fractions of the box, so they re-proportion with it.
    The first sits close to the waist and barely off the centre line, which is
    what makes each strand leave the crossing almost horizontally before it
    opens out — the profile the design shows.

    EVERY COORDINATE IS ROUNDED. Unrounded, these serialise to full float
    precision on the server ("136.79999999999998") but get truncated by the
    browser on the client, so React reports a hydration mismatch on every
    strand. Two decimals is far finer than a pixel at any render size.
  */
  const r = (value: number) => Math.round(value * 100) / 100;

  return [
    `M ${r(waistX)} ${r(waistY)}`,
    `C ${r(waistX + BOX.w * 0.16)} ${r(waistY + side * spread * 0.08)}`,
    `${r(BOX.w * 0.46)} ${r(endY - side * spread * 0.3)}`,
    `${BOX.w} ${r(endY)}`,
  ].join(" ");
}

/** Hue across the bundle: cyan through the middle, violet at the edges. */
function strandHue(t: number) {
  const u = Math.abs(t - 0.5) * 2;
  // 188deg (cyan) at the centre line to 264deg (violet) at the outside.
  // Rounded for the same reason as the path coordinates above: an unrounded
  // `hsl(227.72727272727275 ...)` differs between server and client.
  const hue = Math.round((188 + u * 76) * 100) / 100;
  const light = Math.round((72 - u * 14) * 100) / 100;
  const alpha = Math.round((0.72 - u * 0.42) * 1000) / 1000;
  return { stroke: `hsl(${hue} 92% ${light}%)`, alpha };
}

export function FabricFilaments({
  side,
  className,
}: {
  /** Which way the fan opens. "left" mirrors the drawing. */
  side: "left" | "right";
  className?: string;
}) {
  const reduce = useReducedMotion();

  const strands = Array.from({ length: COUNT }, (_, i) => {
    const t = (i + 0.5) / COUNT;
    return { t, d: strandPath(t), ...strandHue(t) };
  });

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute", className)}
    >
      <svg
        viewBox={`0 0 ${BOX.w} ${BOX.h}`}
        preserveAspectRatio="xMidYMid meet"
        className={cn("h-full w-full", side === "left" && "-scale-x-100")}
      >
        <defs>
          {/*
            The strands fade out toward the frame edge rather than stopping at
            it, so the bundle dissolves into the ground instead of ending on a
            hard vertical line.
          */}
          <linearGradient id={`fabric-fade-${side}`} x1="0" x2="1">
            {/*
              The outer end fades hard. In the design the bundle dissolves well
              before the copy column; at a gentler ramp the left fan's strands
              were still legible across the headline.
            */}
            <stop offset="0" stopColor="white" stopOpacity="1" />
            <stop offset="0.38" stopColor="white" stopOpacity="0.62" />
            <stop offset="0.72" stopColor="white" stopOpacity="0.16" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id={`fabric-mask-${side}`}>
            <rect
              width={BOX.w}
              height={BOX.h}
              fill={`url(#fabric-fade-${side})`}
            />
          </mask>
        </defs>

        <g mask={`url(#fabric-mask-${side})`}>
          {strands.map((strand) => (
            <motion.path
              key={strand.t}
              d={strand.d}
              fill="none"
              stroke={strand.stroke}
              strokeOpacity={strand.alpha}
              strokeWidth={0.7}
              vectorEffect="non-scaling-stroke"
              /*
                Each strand draws itself from the waist outward, staggered from
                the centre of the bundle to its edges — so the burst reads as
                energy leaving the core rather than as a picture fading in.
              */
              initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 1.1,
                delay: 0.3 + Math.abs(strand.t - 0.5) * 1.3,
                ease: easeOut,
              }}
            />
          ))}
        </g>

        {/*
          The waist bloom. The crossing strands already brighten here; this adds
          the soft lens the design shows on top of them.
        */}
        <motion.ellipse
          cx={BOX.w * WAIST_X}
          cy={BOX.h / 2}
          rx={BOX.w * 0.022}
          ry={BOX.h * 0.055}
          fill={`url(#fabric-bloom-${side})`}
          initial={reduce ? { opacity: 0.9 } : { opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ duration: 0.9, delay: 0.5, ease: easeOut }}
        />
        <defs>
          <radialGradient id={`fabric-bloom-${side}`}>
            <stop offset="0" stopColor="#dffaff" stopOpacity="0.95" />
            <stop offset="0.4" stopColor="#7cc4ff" stopOpacity="0.5" />
            <stop offset="1" stopColor="#7c5cff" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}
