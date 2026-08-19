"use client";

import { motion, useReducedMotion } from "motion/react";

import { cycleIcons } from "@/components/sections/system/CycleIcons";
import { Uncopyable } from "@/components/ui/Uncopyable";
import { system } from "@/content/system";
import { cn } from "@/lib/utils";

/**
 * CYCLE DIAGRAM
 * ---------------------------------------------------------------------------
 * Four stage cards orbiting a centre label, joined by an arced ring.
 *
 * STRUCTURE — why it is built this way:
 *
 * The cards are laid out with CSS grid (3x3, cards at N/E/S/W, centre in the
 * middle) rather than absolute polar positioning. Grid keeps the cards in
 * normal flow, so they size to their own text and stay readable when the
 * font scales; absolute positioning would need every card to be a fixed
 * height and would break under user font settings.
 *
 * The ring, arrows and dotted inner circle sit in an SVG layer BEHIND the
 * grid, sized to the same box. It is purely decorative geometry, so it can be
 * absolutely positioned without affecting the cards.
 *
 * Below lg the ring is hidden and the cards stack vertically — an orbital
 * diagram at phone width is unreadable, and a stacked list still communicates
 * the four stages and their order.
 *
 * The whole diagram is a <ul>: it is a list of four stages. The visual
 * arrangement conveys "cycle" to sighted users; the surrounding copy carries
 * that meaning for everyone else.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

/** Grid placement per stage index, clockwise from the top. */
const cellPlacement = [
  "lg:col-start-2 lg:row-start-1", // Define — N
  "lg:col-start-3 lg:row-start-2", // Build  — E
  "lg:col-start-2 lg:row-start-3", // Enable — S
  "lg:col-start-1 lg:row-start-2", // Improve— W
];

export function CycleDiagram({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <Uncopyable className={cn("relative", className)}>
      {/* ------------------------------------------------------------------
          Decorative ring layer. Hidden below lg, where the cards stack.
          ------------------------------------------------------------------ */}
      <RingDecoration className="pointer-events-none absolute inset-0 hidden lg:block" />

      {/* ------------------------------------------------------------------
          Stage cards.
          ------------------------------------------------------------------ */}
      <ul
        className={cn(
          "relative grid gap-4",
          "lg:h-full lg:grid-cols-[1fr_0.9fr_1fr] lg:grid-rows-3 lg:items-center lg:gap-x-2 lg:gap-y-4",
        )}
      >
        {system.cycle.map((stage, index) => {
          const Icon = cycleIcons[stage.icon];

          return (
            <motion.li
              key={stage.title}
              className={cellPlacement[index]}
              initial={{ opacity: reduce ? 1 : 0, scale: reduce ? 1 : 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: reduce ? 0 : 0.55,
                delay: reduce ? 0 : 0.15 + index * 0.12,
                ease: easeOut,
              }}
            >
              <div
                className={cn(
                  "flex items-start gap-3.5 rounded-2xl border border-ink-border/70",
                  "bg-ink-800/90 p-3.5 backdrop-blur-sm",
                  "duration-normal transition-colors hover:border-ink-border",
                )}
              >
                <span
                  className={cn(
                    "grid size-11 shrink-0 place-items-center rounded-full",
                    "bg-ink-well/25",
                  )}
                >
                  <Icon className="size-6" />
                </span>

                <div className="min-w-0">
                  <h3 className="text-[0.9375rem] font-semibold text-white">
                    {stage.title}
                  </h3>
                  <p className="mt-1 text-[0.7rem] leading-snug text-neutral-300">
                    {stage.description}
                  </p>
                </div>
              </div>
            </motion.li>
          );
        })}

        {/* ----------------------------------------------------------------
            Centre label. Part of the grid on lg+, and rendered first in the
            stacked layout so the brand anchors the list.
            ---------------------------------------------------------------- */}
        <li className="order-first lg:order-none lg:col-start-2 lg:row-start-2">
          <motion.p
            className={cn(
              "text-center font-display text-2xl font-semibold tracking-tight",
              "text-brand-400 lg:text-[1.75rem]",
            )}
            initial={{ opacity: reduce ? 1 : 0, scale: reduce ? 1 : 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: reduce ? 0 : 0.6, ease: easeOut }}
          >
            {system.centre}
            <span className="align-super text-[0.5em]">™</span>
          </motion.p>
        </li>
      </ul>
    </Uncopyable>
  );
}

/* ========================================================================== */
/* Ring, arrows and inner dotted circle                                       */
/* ========================================================================== */

function RingDecoration({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  // 400x400 viewBox, stretched to the diagram box. preserveAspectRatio="none"
  // is deliberate: the ring should track the card layout's aspect ratio rather
  // than stay a perfect circle, exactly as it does in the design.
  const cx = 200;
  const cy = 200;
  const outer = 158;
  const inner = 62;

  /**
   * Four arcs, one between each pair of adjacent stage cards.
   *
   * The arrowheads run CLOCKWISE — Define, Build, Enable, Improve, and back.
   * The design's arrows radiate outward from the top rather than forming one
   * continuous loop; a single consistent direction reads more clearly as the
   * cycle the copy describes, and matches the order of the stage list.
   */
  const arcs = [
    { from: -60, to: -30 },
    { from: 30, to: 60 },
    { from: 120, to: 150 },
    { from: 210, to: 240 },
  ];

  const pointOn = (deg: number, r: number) => {
    const rad = (deg * Math.PI) / 180;
    return [cx + Math.cos(rad) * r, cy + Math.sin(rad) * r] as const;
  };

  return (
    <svg
      viewBox="0 0 400 400"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      {/* Outer ring — drawn in four arc segments with gaps where the cards sit. */}
      {[
        "M 200 50 A 150 150 0 0 1 350 200",
        "M 350 200 A 150 150 0 0 1 200 350",
        "M 200 350 A 150 150 0 0 1 50 200",
        "M 50 200 A 150 150 0 0 1 200 50",
      ].map((d, i) => (
        <motion.path
          key={d}
          d={d}
          stroke="var(--ink-border)"
          strokeWidth="1.6"
          strokeLinecap="round"
          initial={{ pathLength: reduce ? 1 : 0, opacity: reduce ? 1 : 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            duration: reduce ? 0 : 1.1,
            delay: reduce ? 0 : 0.2 + i * 0.12,
            ease: easeOut,
          }}
        />
      ))}

      {/*
        Directional arrowheads on the ring, showing the cycle runs clockwise.

        Drawn as FILLED triangles rather than stroked chevrons: this SVG uses
        preserveAspectRatio="none", and a non-uniform stretch distorts stroke
        width per-axis — stroked chevrons came out as broken corner marks. A
        filled polygon stretches cleanly.
      */}
      {arcs.map((arc, i) => {
        const mid = (arc.from + arc.to) / 2;
        const [x, y] = pointOn(mid, outer);
        return (
          <motion.polygon
            key={mid}
            points="-4,-5 5,0 -4,5"
            transform={`translate(${x} ${y}) rotate(${mid + 90})`}
            fill="var(--brand-400)"
            stroke="none"
            initial={{ opacity: reduce ? 1 : 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, delay: reduce ? 0 : 0.9 + i * 0.1 }}
          />
        );
      })}

      {/* Inner dotted circle around the centre label. */}
      <motion.circle
        cx={cx}
        cy={cy}
        r={inner}
        stroke="var(--brand-400)"
        strokeWidth="1.4"
        strokeDasharray="2 7"
        strokeLinecap="round"
        initial={{ opacity: reduce ? 1 : 0, rotate: reduce ? 0 : -25 }}
        whileInView={{ opacity: 0.75, rotate: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        style={{ transformOrigin: "50% 50%" }}
        transition={{
          duration: reduce ? 0 : 1,
          delay: reduce ? 0 : 0.5,
          ease: easeOut,
        }}
      />

      {/* Amber nodes at the four compass points, plus their spokes. */}
      {[-90, 0, 90, 180].map((deg, i) => {
        const [dx, dy] = pointOn(deg, inner);
        const [sx, sy] = pointOn(deg, inner + 30);
        return (
          <motion.g
            key={deg}
            initial={{ opacity: reduce ? 1 : 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, delay: reduce ? 0 : 0.8 + i * 0.08 }}
          >
            <path
              d={`M ${dx} ${dy} L ${sx} ${sy}`}
              stroke="var(--brand-400)"
              strokeWidth="1.4"
              strokeDasharray="2 6"
              strokeLinecap="round"
              opacity="0.8"
            />
            <circle cx={dx} cy={dy} r="5" fill="var(--accent-300)" />
          </motion.g>
        );
      })}
    </svg>
  );
}
