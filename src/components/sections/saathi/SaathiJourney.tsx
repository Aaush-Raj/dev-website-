"use client";

import { motion, useReducedMotion } from "motion/react";

import { saathi } from "@/content/saathi";
import { cn } from "@/lib/utils";

/**
 * SAATHI JOURNEY
 * ---------------------------------------------------------------------------
 * The small diagram under the LurnySaathi problem statement: five stages —
 * Know, Learn, Practise, Perform, Improve — strung along a wave, with a loop
 * running back from Improve to the start.
 *
 * It is the visual argument the section makes in words: the stages exist and
 * they connect, but the employee is the one left walking the line.
 *
 * DRAWN AS ONE SVG
 * Nodes, wave and loop share a single 0-100 coordinate space, so the dots stay
 * welded to the curve at any width — positioning HTML dots over an SVG path
 * would drift the moment the box is not the aspect the design was measured at.
 * The labels are `<text>` for the same reason.
 *
 * `preserveAspectRatio` is deliberately left at its default here, unlike the
 * hero's threads: this diagram has type in it, and stretching a viewBox with
 * `none` would distort the lettering.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { journey } = saathi.problem;

/**
 * The five stages, as points on the wave. `y` alternates between the crests
 * and troughs of the curve; `above` puts the label on whichever side has room
 * — over the crests, under the troughs, as the design sets them.
 */
const STAGES = [
  { x: 8, y: 30, above: false },
  { x: 30, y: 17, above: true },
  { x: 52, y: 31, above: false },
  { x: 74, y: 17, above: true },
  { x: 94, y: 30, above: false },
] as const;

/**
 * The wave itself: a flat lead-in, then a smooth S through each stage. The
 * control points sit midway between neighbouring stages, which is what keeps
 * the curve passing exactly through every node rather than near it.
 */
const WAVE = [
  "M 0 30",
  "L 8 30",
  "C 19 30, 19 17, 30 17",
  "C 41 17, 41 31, 52 31",
  "C 63 31, 63 17, 74 17",
  "C 84 17, 84 30, 94 30",
].join(" ");

/**
 * The return loop: out past the last stage, down the right side, then back
 * along the bottom into an arrowhead pointing left — improvement feeding the
 * next cycle.
 *
 * It bows out to x=107 so it passes clear of the "Improve" label sitting under
 * the final node, rather than cutting through the lettering.
 */
const LOOP = "M 94 30 C 107 30, 107 55, 94 55 L 44 55";

export function SaathiJourney({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <div className={cn("w-full max-w-104", className)}>
      <svg
        // Cropped to the band the diagram actually occupies — the labels reach
        // to about y=62 and the loop to y=57, so a full 100-high box would be a
        // third empty and shrink everything to compensate.
        viewBox="0 4 109 60"
        fill="none"
        className="h-auto w-full overflow-visible"
        role="img"
        aria-label={journey.label}
      >
        {/* ------------------------- The wave --------------------------- */}
        <motion.path
          d={WAVE}
          stroke="#c4b5d8"
          strokeWidth="0.55"
          strokeLinecap="round"
          initial={reduce ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: "some" }}
          transition={{ duration: 0.7, ease: easeOut }}
        />

        {/* ------------------------ The loop back ----------------------- */}
        <motion.g
          initial={reduce ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: "some" }}
          transition={{ duration: 0.7, delay: 0.45, ease: easeOut }}
        >
          <path
            d={LOOP}
            stroke="#c4b5d8"
            strokeWidth="0.55"
            strokeLinecap="round"
          />
          {/* The arrowhead — two strokes rather than a marker, so its size is
              set in the same units as everything else here. */}
          <path
            d="M 47.5 52.6 L 43.6 55 L 47.5 57.4"
            stroke="#c4b5d8"
            strokeWidth="0.55"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.g>

        {/* -------------------------- The stages ------------------------ */}
        {STAGES.map((stage, i) => (
          <motion.g
            key={journey.stages[i]}
            initial={reduce ? { opacity: 1 } : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: "some" }}
            transition={{
              duration: 0.45,
              delay: 0.15 + i * 0.08,
              ease: easeOut,
            }}
          >
            {/* The ring, filled with the section ground so the wave does not
                show through behind the dot. */}
            <circle
              cx={stage.x}
              cy={stage.y}
              r="2.9"
              fill="#fbf6f5"
              stroke="#c4b5d8"
              strokeWidth="0.55"
            />
            <circle cx={stage.x} cy={stage.y} r="1.5" fill="#9d8bc4" />

            <text
              x={stage.x}
              y={stage.above ? stage.y - 5.6 : stage.y + 8.4}
              textAnchor="middle"
              fill="#6b6480"
              // Set in viewBox units so it scales with the diagram.
              style={{ font: "500 4.4px var(--font-sans, system-ui)" }}
            >
              {journey.stages[i]}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}
