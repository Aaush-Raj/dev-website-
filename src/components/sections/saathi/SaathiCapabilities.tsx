"use client";

import { motion, useReducedMotion } from "motion/react";

import { Uncopyable } from "@/components/ui/Uncopyable";
import { saathi } from "@/content/saathi";
import { cn } from "@/lib/utils";

import { capabilityIcons } from "./SaathiIcons";

/**
 * SAATHI CAPABILITIES
 * ---------------------------------------------------------------------------
 * The five capability pills in the LurnySaathi hero, and the light threads
 * that run from each one into the glowing node on the phone's left edge.
 *
 * THE THREADS
 * `SaathiThreads` is a separate export because the curves have to span the gap
 * BETWEEN the pills and the phone — two different grid cells. It is positioned
 * by the hero as an overlay across that whole row, while the pill list below
 * stays a normal flow element. Keeping the two apart is what lets each curve
 * actually reach the phone instead of being clipped at the pill column's edge.
 *
 * The curves are drawn in a 0-100 viewBox with `preserveAspectRatio="none"`,
 * so they stay anchored to the same relative points however the row is
 * proportioned at a given viewport.
 *
 * Both are lg-only. Below that the pills become a plain two-column grid under
 * the phone, and threads would have nothing to converge on.
 *
 * The pills are wrapped in <Uncopyable> — they are part of the product
 * illustration, not page copy, so their labels should not be selectable. The
 * labels are still announced: the wrapper is given `aria-hidden={false}` and
 * the list carries a real accessible name, because these five words are the
 * substance of what the illustration communicates.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { capabilities } = saathi.hero;

/**
 * Per-pill tint, matching the design: rose for Learn and Communicate, violet
 * for Work, teal for Practise and Improve.
 */
const iconTints: Record<string, string> = {
  learn: "text-[#f4568a]",
  work: "text-[#9d8bf5]",
  practise: "text-[#5fd6d0]",
  communicate: "text-[#f4568a]",
  improve: "text-[#5aa9ea]",
};

/**
 * The vertical centre of each pill, as a percentage of the row. The five pills
 * are evenly distributed across the list, so these are the midpoints of five
 * equal rows.
 */
const PILL_CENTRES = [10, 30, 50, 70, 90];

/**
 * Where every thread ends. The hero passes the node's x as a percentage of the
 * overlay — it sits on the phone's LEFT edge, not the row's right edge, so it
 * has to be supplied rather than assumed to be 100.
 */
const NODE_Y = 50;

/**
 * The light threads. Rendered by the hero as an overlay spanning the pills and
 * the phone — see the note above for why it is not inside the pill list.
 *
 * `startX` is where the curves begin, as a percentage of the overlay's width:
 * the column the pills' trailing dots land in. The hero passes the value that
 * matches its own column split.
 */
export function SaathiThreads({
  startX,
  nodeX,
  className,
}: {
  startX: number;
  /** The node's x, as a percentage of the overlay: the phone's left edge. */
  nodeX: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className={cn("pointer-events-none", className)}
    >
      <defs>
        {/* The thread gradient: dim where it leaves the pill, bright as it
            reaches the phone's edge.

            `gradientUnits="userSpaceOnUse"`, spanning the run from the pill
            dots to the node, NOT the default objectBoundingBox. The middle
            thread goes straight across at the node's own height, so its
            bounding box is ZERO-HIGH — and an objectBoundingBox gradient is
            undefined on a degenerate box, so that one path renders as nothing
            at all while the other four paint fine. Anchoring the gradient to
            the viewBox instead makes it independent of each path's box, and
            has the side benefit that all five share one colour ramp across the
            same span rather than each restarting it. */}
        <linearGradient
          id="saathi-thread"
          gradientUnits="userSpaceOnUse"
          x1={startX}
          y1="0"
          x2={nodeX}
          y2="0"
        >
          <stop offset="0%" stopColor="#c084fc" stopOpacity="0.35" />
          <stop offset="45%" stopColor="#d8b4fe" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
        </linearGradient>

        {/* The bloom around each filament — the design's threads read as light
            rather than as drawn lines, which is this glow, not the stroke.

            `filterUnits="userSpaceOnUse"` with an explicit region, NOT the
            default objectBoundingBox percentages. The middle thread runs from
            its pill straight to the node at the same height, so its bounding
            box is zero-high; a percentage-based region collapses to nothing
            there and the filter drops that path entirely. A fixed region in
            viewBox units covers every thread regardless of its box. */}
        <filter
          id="saathi-thread-glow"
          filterUnits="userSpaceOnUse"
          x="0"
          y="-10"
          width="100"
          height="120"
        >
          <feGaussianBlur stdDeviation="0.35" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter="url(#saathi-thread-glow)">
        {PILL_CENTRES.map((y, i) => {
          // Each thread leaves its pill's dot horizontally, then curves in to
          // meet the node. The first control point holds it level with the pill
          // for a moment and the second sits close to the node, which gives the
          // flat-then-sweep shape the design draws.
          const run = nodeX - startX;
          const d = `M ${startX} ${y} C ${startX + run * 0.5} ${y}, ${nodeX - run * 0.12} ${y + (NODE_Y - y) * 0.82}, ${nodeX} ${NODE_Y}`;

          return (
            <motion.path
              key={y}
              d={d}
              fill="none"
              stroke="url(#saathi-thread)"
              strokeWidth="1.3"
              strokeLinecap="round"
              // Keeps the hairline weight constant despite the non-uniform
              // scaling that preserveAspectRatio="none" applies.
              vectorEffect="non-scaling-stroke"
              // Deliberately NOT a `pathLength` draw-on. Motion implements that
              // with strokeDasharray, and on a curve this thin the dash pattern
              // stays visible after the animation settles — the threads read as
              // dotted rather than as continuous filaments. Fading each one in
              // keeps the stroke solid at every frame.
              initial={reduce ? { opacity: 1 } : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: "some" }}
              transition={{
                duration: 0.8,
                delay: 0.35 + i * 0.09,
                ease: easeOut,
              }}
            />
          );
        })}
      </g>
    </svg>
  );
}

/** The five pills themselves. */
export function SaathiCapabilities({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <Uncopyable
      as="ul"
      aria-hidden={false}
      aria-label="What LurnySaathi helps every employee do"
      className={cn("relative grid", className)}
    >
      {capabilities.map((capability, i) => {
        const Icon = capabilityIcons[capability.icon];

        return (
          <li
            key={capability.label}
            // Right-aligned on lg so every pill's trailing dot lands in the
            // same column and the threads leave from one edge, as the design
            // draws them.
            className="flex items-center lg:justify-end"
          >
            <motion.span
              initial={reduce ? { opacity: 1, x: 0 } : { opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: "some" }}
              transition={{
                duration: 0.55,
                delay: 0.2 + i * 0.09,
                ease: easeOut,
              }}
              className={cn(
                "inline-flex items-center gap-3 rounded-2xl",
                "px-5 py-3.5",
                // One width for all five, sized to the longest label
                // ("Communicate"). Left to `inline-flex` they size to their own
                // text, and a column of pills ranging from "Work" to
                // "Communicate" reads as ragged rather than as a set.
                "w-full lg:w-44",
                // The pill: a translucent violet panel with a hairline border,
                // sitting over the section's own glow.
                "border border-white/12 bg-white/6 backdrop-blur-[2px]",
                "shadow-[inset_0_1px_0_rgb(255_255_255/0.07)]",
                "transition-[background-color,border-color] duration-500 ease-out",
                "hover:border-white/25 hover:bg-white/10",
              )}
            >
              <Icon
                className={cn("size-5 shrink-0", iconTints[capability.icon])}
              />
              <span className="text-[0.9375rem] font-medium text-white">
                {capability.label}
              </span>
            </motion.span>

            {/* The bright dot where this pill's thread begins. lg-only, to
                match the threads themselves. */}
            <motion.span
              aria-hidden="true"
              initial={reduce ? { opacity: 1 } : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: "some" }}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.09 }}
              className={cn(
                "ml-2 hidden size-1.5 shrink-0 rounded-full bg-white lg:block",
                "shadow-[0_0_6px_2px_rgb(216_180_254/0.7)]",
              )}
            />
          </li>
        );
      })}
    </Uncopyable>
  );
}
