"use client";

import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

/**
 * PULSE DIAL
 * ---------------------------------------------------------------------------
 * The radial behaviour dial in the drawn modal of section 3: one rounded spoke
 * per behaviour, radiating from a centre disc, grouped into three colour
 * families.
 *
 * GEOMETRY
 * Like PulseRadar this is polar, so SVG rather than CSS grid. Each spoke runs
 * from an inner radius outward to a length set by its score, drawn as a thick
 * round-capped line so it reads as the design's rounded bar.
 *
 * Angles start at 12 o'clock and run clockwise, matching the reading order of
 * the spokes in the content file.
 *
 * Coordinates are rounded at the source: they reach the DOM as bare `x1`/`y1`
 * attributes, and a raw float serialises differently on the server than in the
 * browser, which React reports as a hydration mismatch.
 *
 * ANIMATION
 * One observer for the whole dial, with the spokes driven by variants — many
 * independent `whileInView` observers on sibling SVG nodes race each other and
 * some lose. Each spoke grows outward from the hub in sequence, which reads as
 * the dial filling rather than as eighteen separate things appearing.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

/** Half-width of the square viewBox. The dial is drawn in -50..50. */
const EXTENT = 50;

/** Where the spokes begin, just outside the centre disc. */
const INNER = 20;

/** How far the longest spoke reaches. */
const OUTER = 45;

/** The design's three colour families. */
const toneColors = {
  amber: "#e8b04b",
  teal: "#3fa8bd",
  violet: "#7c4ddb",
} as const;

export type DialTone = keyof typeof toneColors;

export interface DialSpoke {
  label: string;
  score: number;
  tone: string;
}

interface PulseDialProps {
  spokes: readonly DialSpoke[];
  /** Score that reaches the full spoke length. */
  max: number;
  className?: string;
}

/** Polar to cartesian, 0deg at 12 o'clock, running clockwise. */
function point(radius: number, index: number, count: number) {
  const angle = (index / count) * 2 * Math.PI;
  const round = (value: number) => Number(value.toFixed(3));

  return {
    x: round(radius * Math.sin(angle)),
    y: round(-radius * Math.cos(angle)),
  };
}

export function PulseDial({ spokes, max, className }: PulseDialProps) {
  const reduce = useReducedMotion();
  const count = spokes.length;

  return (
    <motion.svg
      // Decorative: the modal it sits in is aria-hidden in full.
      aria-hidden="true"
      focusable="false"
      viewBox={`${-EXTENT} ${-EXTENT} ${EXTENT * 2} ${EXTENT * 2}`}
      className={cn("h-full w-full overflow-visible", className)}
      initial={reduce ? "shown" : "hidden"}
      whileInView="shown"
      viewport={{ once: true, amount: "some" }}
    >
      {/* The faint guide ring the spokes sit within. */}
      <motion.circle
        cx={0}
        cy={0}
        r={OUTER}
        fill="none"
        stroke="#ffffff"
        strokeOpacity={0.07}
        strokeWidth={0.4}
        variants={{
          hidden: { opacity: 0 },
          shown: {
            opacity: 1,
            transition: { duration: 0.6, delay: 0.15, ease: easeOut },
          },
        }}
      />

      {spokes.map((spoke, index) => {
        const reach = INNER + (OUTER - INNER) * (spoke.score / max);
        const start = point(INNER, index, count);
        const end = point(reach, index, count);
        const color = toneColors[spoke.tone as DialTone] ?? toneColors.violet;

        return (
          <motion.line
            key={spoke.label}
            x1={start.x}
            y1={start.y}
            x2={end.x}
            y2={end.y}
            stroke={color}
            strokeWidth={4.2}
            strokeLinecap="round"
            // Grows outward from the hub: the line is drawn as a dash the
            // length of its own path, then the offset is animated to zero.
            pathLength={1}
            strokeDasharray={1}
            variants={{
              hidden: { strokeDashoffset: 1, opacity: 0 },
              shown: {
                strokeDashoffset: 0,
                opacity: 1,
                transition: {
                  duration: 0.5,
                  delay: 0.25 + index * 0.045,
                  ease: easeOut,
                },
              },
            }}
          />
        );
      })}
    </motion.svg>
  );
}
