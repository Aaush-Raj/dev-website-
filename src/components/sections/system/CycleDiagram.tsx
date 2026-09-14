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
      {/* The four cards sit in a 3x3 grid with the centre label in the middle.
          The side columns are held to a fixed share of the width so all four
          cards come out the SAME size — sized to their own text they ran wider
          than the ring, which is what made Build and Improve overhang it. */}
      <ul
        className={cn(
          "relative grid gap-4",
          "lg:h-full lg:grid-cols-[minmax(0,1fr)_minmax(0,0.72fr)_minmax(0,1fr)]",
          "lg:grid-rows-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]",
          "lg:items-center lg:justify-items-center lg:gap-x-3 lg:gap-y-3",
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
              {/* A fixed width on lg+, so the four cards match each other and
                  sit clear of the ring. The card is opaque rather than
                  translucent: the ring passes behind it, and a see-through
                  panel let the line show through the text. */}
              <div
                className={cn(
                  "flex items-start gap-3 rounded-2xl border border-ink-border/70",
                  "bg-ink-800 p-4 shadow-[0_18px_40px_-18px_rgb(0_0_0/0.8)]",
                  "duration-normal transition-colors hover:border-brand-400/50",
                  "lg:h-full lg:w-[13.5rem]",
                )}
              >
                <span
                  className={cn(
                    "grid size-10 shrink-0 place-items-center rounded-xl",
                    "bg-brand-400/12 ring-1 ring-brand-400/25",
                  )}
                >
                  <Icon className="size-5" />
                </span>

                <div className="min-w-0">
                  <h3 className="text-[0.9375rem] font-semibold text-white">
                    {stage.title}
                  </h3>
                  <p className="mt-1 text-[0.75rem] leading-relaxed text-neutral-400">
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

  /**
   * GEOMETRY
   *
   * One 400x400 viewBox, scaled UNIFORMLY. The previous version used
   * `preserveAspectRatio="none"`, which was never needed — the diagram box is
   * square (measured 592x592) — and actively harmful: it stretches a circle
   * into an ellipse while the arrowheads are still placed by circular
   * trigonometry, so the heads drift off the ring as the box changes shape.
   *
   * Every number below is derived from R, so the ring, the arrowheads and the
   * gaps cannot fall out of step with each other.
   */
  const cx = 200;
  const cy = 200;
  /** The ring the cards orbit. */
  const R = 150;

  /**
   * The dotted ring around the centre label.
   *
   * Sized from the label rather than guessed: measured in this viewBox, the
   * label's own corner radius is 29, so 46 clears it on every side with room
   * to breathe. It is centred on the LABEL's optical centre (y 184), not the
   * geometric centre — the label sits slightly high in its grid cell, and a
   * ring on 200 would look off-centre against it.
   */
  const INNER_R = 42;
  /**
   * Nudged two units below the label's measured box centre (183.8). The box
   * includes the raised TM superscript, which pulls the measured centre above
   * where the WORD optically sits — matching the box exactly left the ring
   * looking low against the text.
   */
  const INNER_CY = 186;

  /**
   * The four cards sit at the compass points (0, 90, 180, 270 clockwise from
   * 12 o'clock) and each is wide enough to cover roughly 40deg either side. So
   * the visible connectors live in the four DIAGONALS, centred on 45, 135, 225
   * and 315, where the diagram has clear space.
   *
   * Drawing them as short, centred arcs — rather than long arcs trimmed by a
   * guessed gap — is what stops them from either running under a card or
   * shrinking to slivers.
   */
  const DIAGONALS = [45, 135, 225, 315];

  /**
   * How far each connector runs either side of its diagonal, in degrees.
   *
   * `HEAD_SPAN` is slightly shorter than the tail so the arrowhead stops clear
   * of the next card — at the full span two of the four heads finished behind
   * the wide Improve and Build cards and were invisible.
   */
  const SPAN = 26;
  const HEAD_SPAN = 14;

  /** A point on the ring. 0deg is 12 o'clock, increasing clockwise. */
  const point = (deg: number, r = R) => {
    const rad = ((deg - 90) * Math.PI) / 180;
    return [cx + Math.cos(rad) * r, cy + Math.sin(rad) * r] as const;
  };

  /** One clockwise arc between two angles on the ring. */
  const arc = (from: number, to: number) => {
    const [x1, y1] = point(from);
    const [x2, y2] = point(to);
    return `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${R} ${R} 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`;
  };

  /**
   * Each connector, with the arrowhead that closes it.
   *
   * THE HEAD IS PART OF THE STROKE, NOT A SHAPE ON TOP OF IT
   * Earlier versions drew a filled <polygon> at the arc's end. However exactly
   * it was placed, it always read as pasted on: a flat triangle base butting
   * against a round stroke cap is a visible seam, and the base was wider than
   * the line it was meant to finish.
   *
   * Instead the head is two short strokes drawn BACK from the tip, in the same
   * colour, width and round cap as the arc. They continue the line rather than
   * sitting on it, so the join is invisible and the tip tapers the way a drawn
   * arrow does.
   *
   * `barb` is built in a local frame where the tip is at the origin and the
   * travel direction is +x; the <g> then rotates that frame onto the ring's
   * tangent.
   */
  const BARB = 11;
  const BARB_SPREAD = 34;

  const barb = (() => {
    const rad = (BARB_SPREAD * Math.PI) / 180;
    const bx = -Math.cos(rad) * BARB;
    const by = Math.sin(rad) * BARB;
    return `M ${bx.toFixed(2)} ${(-by).toFixed(2)} L 0 0 L ${bx.toFixed(2)} ${by.toFixed(2)}`;
  })();

  const segments = DIAGONALS.map((mid) => ({
    d: arc(mid - SPAN, mid + HEAD_SPAN),
    head: mid + HEAD_SPAN,
  }));

  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <defs>
        {/* The ring fades at both ends of each arc, so a segment emerges from
            behind one card and recedes behind the next rather than stopping
            dead in mid-air. */}
        <linearGradient id="cycle-arc" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--brand-400)" stopOpacity="0.15" />
          <stop offset="45%" stopColor="var(--brand-400)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="var(--brand-400)" stopOpacity="0.85" />
        </linearGradient>
      </defs>

      {/* A faint guide circle under the segments, so the cycle still reads as
          one continuous orbit rather than four disconnected strokes.

          It is DASHED away behind each arrowhead: drawn as a full circle the
          line ran straight through the tip and out the other side, which is
          half of why the heads looked stuck on rather than terminal. */}
      <circle
        cx={cx}
        cy={cy}
        r={R}
        stroke="var(--ink-border)"
        strokeWidth="1"
        opacity="0.45"
        strokeDasharray="2 5"
      />

      {/*
        The dotted ring around the centre label — the hub the four stages
        orbit. An earlier pass removed it along with some stray marker dots;
        without it the centre reads as an empty hole rather than the middle of
        a system.

        Drawn as a dotted circle (round caps on a zero-length dash), which is a
        cleaner mark than the previous dash-and-gap: at this radius a dashed
        line shows its segment ends as tiny flat edges, whereas true dots stay
        circular however the diagram scales.

        It rotates slowly and forever, which is what makes the hub feel alive
        rather than static — paused entirely under reduced motion.
      */}
      <motion.circle
        cx={cx}
        cy={INNER_CY}
        r={INNER_R}
        stroke="var(--brand-400)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeDasharray="0 7"
        opacity="0.55"
        style={{ transformOrigin: `${cx}px ${INNER_CY}px` }}
        initial={{ opacity: reduce ? 0.55 : 0, scale: reduce ? 1 : 0.86 }}
        whileInView={
          reduce
            ? { opacity: 0.55, scale: 1 }
            : { opacity: 0.55, scale: 1, rotate: 360 }
        }
        viewport={{ once: true, margin: "-80px" }}
        transition={{
          opacity: { duration: reduce ? 0 : 0.6, delay: reduce ? 0 : 0.35 },
          scale: {
            duration: reduce ? 0 : 0.7,
            delay: reduce ? 0 : 0.35,
            ease: easeOut,
          },
          rotate: { duration: 48, ease: "linear", repeat: Infinity },
        }}
      />

      {segments.map((segment, i) => {
        const [hx, hy] = point(segment.head);

        return (
          <motion.g
            key={segment.d}
            initial={{ opacity: reduce ? 1 : 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: reduce ? 0 : 0.5,
              delay: reduce ? 0 : 0.3 + i * 0.18,
            }}
          >
            <motion.path
              d={segment.d}
              stroke="url(#cycle-arc)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: reduce ? 1 : 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: reduce ? 0 : 0.9,
                delay: reduce ? 0 : 0.3 + i * 0.18,
                ease: easeOut,
              }}
            />

            {/* The head, ON the ring and rotated to its tangent.

                The rotation is `head`, NOT `head + 90`. Derived rather than
                guessed: with point(d) = (cx + cos(d-90)R, cy + sin(d-90)R),
                the travel direction is (-sin(d-90), cos(d-90)), whose angle is
                exactly d. An earlier `+90` turned every head a quarter turn
                off its arc, so the barb pointed across the line rather than
                along it.

                Placement lives on a plain <g> and only OPACITY is animated on
                the path inside it. Animating the path's own transform needs
                `transformBox: fill-box`, which overrides the transform
                attribute — that collapsed all four heads onto the svg's origin
                and left a stray mark in the corner. */}
            <g
              transform={`translate(${hx.toFixed(2)} ${hy.toFixed(2)}) rotate(${segment.head})`}
            >
              <motion.path
                d={barb}
                stroke="var(--brand-400)"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ opacity: reduce ? 1 : 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: reduce ? 0 : 0.35,
                  delay: reduce ? 0 : 1.0 + i * 0.18,
                  ease: easeOut,
                }}
              />
            </g>
          </motion.g>
        );
      })}
    </svg>
  );
}
