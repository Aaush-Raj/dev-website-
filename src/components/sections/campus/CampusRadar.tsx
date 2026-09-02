"use client";

import { motion, useReducedMotion } from "motion/react";

import { campus } from "@/content/campus";

/**
 * THE READINESS RADAR
 * ---------------------------------------------------------------------------
 * The five-axis plot in section 6: the student's current level against the
 * level the role requires.
 *
 * The geometry is computed, not hand-drawn. Each axis sits at an equal share of
 * the circle starting from twelve o'clock, and a value is a proportion along
 * its spoke — so adding a sixth axis in content/campus.ts re-spaces the whole
 * chart correctly with no path editing.
 *
 * Decorative: it is a picture of one student's readiness, not data the reader
 * is asked to read off. The card's own heading and "75% match" carry the point,
 * so the plot is hidden from assistive tech rather than announcing ten numbers.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { axes } = campus.passport.opportunity;

/* A 200-box with the plot centred; 78 leaves room for the outer ring's stroke. */
const C = 100;
const R = 78;

/** The point at `value` (0-1) along axis `index`, as "x,y". */
function point(index: number, value: number) {
  // -90° starts the first axis at twelve o'clock rather than three.
  const angle = (index / axes.length) * 2 * Math.PI - Math.PI / 2;
  const x = C + Math.cos(angle) * R * value;
  const y = C + Math.sin(angle) * R * value;
  return `${x.toFixed(2)},${y.toFixed(2)}`;
}

/** The closed polygon through one series. */
function polygon(pick: (axis: (typeof axes)[number]) => number) {
  return axes.map((axis, index) => point(index, pick(axis))).join(" ");
}

/** The web rings behind the series. */
const RINGS = [0.25, 0.5, 0.75, 1];

export function CampusRadar() {
  const reduce = useReducedMotion();

  /*
    Variants rather than a bare `initial`/`whileInView` pair: with reduced
    motion the shape must START shown, since no transition will run to reveal
    it. Setting `initial: false` alone would leave the polygon at opacity 0
    forever — the chart would simply never appear.
  */
  const grow = (delay: number) => ({
    initial: reduce ? "shown" : "hidden",
    whileInView: "shown",
    viewport: { once: true, amount: "some" } as const,
    variants: {
      hidden: { scale: 0.6, opacity: 0 },
      shown: {
        scale: 1,
        opacity: 1,
        transition: { duration: 0.8, delay, ease: easeOut },
      },
    },
    style: { transformOrigin: `${C}px ${C}px` },
  });

  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" className="w-full">
      {/* The web: concentric rings plus a spoke per axis. */}
      {RINGS.map((ring) => (
        <polygon
          key={ring}
          points={polygon(() => ring)}
          fill="none"
          stroke="#d9e2de"
          strokeWidth="1"
        />
      ))}

      {axes.map((axis, index) => (
        <line
          key={axis.label}
          x1={C}
          y1={C}
          x2={point(index, 1).split(",")[0]}
          y2={point(index, 1).split(",")[1]}
          stroke="#d9e2de"
          strokeWidth="1"
        />
      ))}

      {/* What the role requires — a dashed blue outline, no fill. */}
      <motion.polygon
        {...grow(0.45)}
        points={polygon((axis) => axis.required)}
        fill="rgb(35 94 246 / 0.06)"
        stroke="#235ef6"
        strokeWidth="1.75"
        strokeDasharray="5 3"
        strokeLinejoin="round"
      />

      {/* What the student has — a solid teal shape. */}
      <motion.polygon
        {...grow(0.6)}
        points={polygon((axis) => axis.you)}
        fill="rgb(2 90 80 / 0.5)"
        stroke="#025a50"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
