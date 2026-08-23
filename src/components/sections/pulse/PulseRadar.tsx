"use client";

import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

/**
 * PULSE RADAR
 * ---------------------------------------------------------------------------
 * The radar (spider) chart at the heart of the drawn LurnyPulse dashboard.
 *
 * WHY SVG HERE, WHEN THE OUTCOMES CHART IS CSS GRID
 * The outcomes bar chart is a grid because its geometry is rectangular and its
 * labels needed to stay on the page type scale. A radar is the opposite case:
 * the geometry is polar, so every ring, spoke and vertex is trigonometry. SVG
 * expresses that directly. The axis LABELS are still HTML, positioned around
 * the plot — inside the SVG they would scale with the viewBox and drift off
 * the page's type scale, which is the problem the outcomes chart avoided.
 *
 * COORDINATES
 * The viewBox is a square with the origin at its centre, so a point at radius
 * r and angle theta is just (r·sin, -r·cos). Angles start at 12 o'clock and
 * run clockwise, matching the reading order of the axes in the content file.
 *
 * ANIMATION
 * One observer for the whole plot, with children driven by variants. Several
 * independent `whileInView` observers on sibling SVG nodes race each other and
 * some lose — that is what left bars stuck at scale 0 in the outcomes chart.
 *
 * The polygon grows from the centre via `scale`, and its vertices fade in
 * after it settles. `amount: "some"` because the fraction in `amount` is a
 * fraction of the ELEMENT, not the viewport, and never resolves for elements
 * taller than the screen.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

/** Half-width of the square viewBox. The plot is drawn in -50..50. */
const EXTENT = 50;

/** Outermost ring radius, leaving room for the ring value labels. */
const RADIUS = 40;

export interface RadarAxis {
  label: string;
  score: number;
}

interface PulseRadarProps {
  /** Axis scores in plot order, starting at 12 o'clock and running clockwise. */
  axes: readonly RadarAxis[];
  /** Axis maximum — every spoke shares it. */
  max: number;
  /** Ring values to draw, in ascending order. */
  rings: readonly number[];
  className?: string;
}

/**
 * Polar to cartesian, 0deg at 12 o'clock, running clockwise.
 *
 * Rounded to three decimals at the source, not just where the coordinates are
 * formatted into a `points` string. These numbers also reach the DOM as bare
 * `cx`/`cy` attributes, and a raw float serialises differently on the server
 * than in the browser — which React reports as a hydration mismatch. Rounding
 * here makes the two agree, and 1/1000 of a 100-unit viewBox is far below a
 * device pixel.
 */
function point(radius: number, index: number, count: number) {
  const angle = (index / count) * 2 * Math.PI;
  const round = (value: number) => Number(value.toFixed(3));

  return {
    x: round(radius * Math.sin(angle)),
    y: round(-radius * Math.cos(angle)),
  };
}

/** The closed polygon through every axis at a shared fraction of the radius. */
function ringPath(fraction: number, count: number) {
  return Array.from({ length: count }, (_, index) => {
    const { x, y } = point(RADIUS * fraction, index, count);
    return `${x},${y}`;
  }).join(" ");
}

export function PulseRadar({ axes, max, rings, className }: PulseRadarProps) {
  const reduce = useReducedMotion();
  const count = axes.length;

  /** The score polygon — one vertex per axis, at its own radius. */
  const vertices = axes.map((axis, index) =>
    point(RADIUS * (axis.score / max), index, count),
  );

  const scorePath = vertices.map(({ x, y }) => `${x},${y}`).join(" ");

  return (
    <motion.svg
      // Decorative: the surrounding illustration is aria-hidden, and the real
      // numbers are read from the labels beside the chart.
      aria-hidden="true"
      focusable="false"
      viewBox={`${-EXTENT} ${-EXTENT} ${EXTENT * 2} ${EXTENT * 2}`}
      className={cn("h-full w-full overflow-visible", className)}
      initial={reduce ? "shown" : "hidden"}
      whileInView="shown"
      viewport={{ once: true, amount: "some" }}
    >
      <defs>
        {/* The violet wash inside the score polygon — brighter at the top,
            where the design's glow falls. */}
        <linearGradient id="pulse-radar-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9b7ae8" stopOpacity="0.34" />
          <stop offset="100%" stopColor="#7f52dc" stopOpacity="0.14" />
        </linearGradient>
      </defs>

      {/* ============================== Grid ========================== */}
      {/* Concentric rings. Drawn faintest-first so the outer ring, which
          carries the plot's edge, stays the most legible. */}
      <g>
        {rings.map((ring) => (
          <motion.polygon
            key={ring}
            points={ringPath(ring / max, count)}
            fill="none"
            stroke="#ffffff"
            strokeOpacity={ring === max ? 0.14 : 0.075}
            strokeWidth={0.35}
            variants={{
              hidden: { opacity: 0 },
              shown: {
                opacity: 1,
                transition: {
                  duration: 0.5,
                  delay: 0.1 + (ring / max) * 0.22,
                  ease: easeOut,
                },
              },
            }}
          />
        ))}

        {/* Spokes, centre to each vertex of the outer ring. */}
        {axes.map((axis, index) => {
          const { x, y } = point(RADIUS, index, count);

          return (
            <motion.line
              key={axis.label}
              x1={0}
              y1={0}
              x2={x}
              y2={y}
              stroke="#ffffff"
              strokeOpacity={0.075}
              strokeWidth={0.35}
              variants={{
                hidden: { opacity: 0 },
                shown: {
                  opacity: 1,
                  transition: {
                    duration: 0.5,
                    delay: 0.18 + index * 0.04,
                    ease: easeOut,
                  },
                },
              }}
            />
          );
        })}
      </g>

      {/* ========================== Score polygon ===================== */}
      {/* Scaled from the centre rather than path-morphed: a scale is a cheap
          compositor transform, where animating `points` is not. */}
      <motion.g
        style={{ transformOrigin: "center", transformBox: "fill-box" }}
        variants={{
          hidden: { scale: 0.15, opacity: 0 },
          shown: {
            scale: 1,
            opacity: 1,
            transition: { duration: 0.9, delay: 0.3, ease: easeOut },
          },
        }}
      >
        <polygon points={scorePath} fill="url(#pulse-radar-fill)" />
        <polygon
          points={scorePath}
          fill="none"
          stroke="#a982f5"
          strokeWidth={0.9}
          strokeLinejoin="round"
        />
      </motion.g>

      {/* ============================ Vertices ======================== */}
      {/* The amber dots, arriving after the polygon has settled. */}
      {vertices.map(({ x, y }, index) => (
        <motion.circle
          key={axes[index].label}
          cx={x}
          cy={y}
          r={1.5}
          fill="#fccb46"
          stroke="#1a1410"
          strokeWidth={0.4}
          variants={{
            hidden: { opacity: 0, scale: 0 },
            shown: {
              opacity: 1,
              scale: 1,
              transition: {
                duration: 0.4,
                delay: 0.95 + index * 0.07,
                ease: easeOut,
              },
            },
          }}
          style={{ transformOrigin: `${x}px ${y}px` }}
        />
      ))}
    </motion.svg>
  );
}
