"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { Uncopyable } from "@/components/ui/Uncopyable";
import { compliance } from "@/content/compliance";
import { cn } from "@/lib/utils";

/**
 * COMPLIANCE — LURNYPULSE
 * ---------------------------------------------------------------------------
 * Section 4: the statement and three benefits on the left; on the right a
 * radar chart comparing assessed knowledge against the role's baseline, with
 * two gap cards below it joined by curved arrows.
 *
 * ONLY THE GRADIENT IS A RASTER
 * The supplied plate is a clean blue gradient — no panel, radar, cards or
 * arrows on it. The pack's "01_Three_Boxes_And_Arrows.png" flattens all of
 * that into one 542KB raster with its copy baked in as pixels; it is
 * deliberately unused. See scripts/build-compliance-hero.cjs.
 *
 * THE RADAR IS COMPUTED, NOT DRAWN
 * Every point — ring, spoke, polygon vertex, dot, axis label and gap pill —
 * comes from `polar()` over the content file's axis list. So the chart cannot
 * drift from the numbers it claims to plot: change `current` from 2 to 1 and
 * the polygon, the dot and the pill all move together. Hand-written path data
 * would let the picture and the data disagree silently.
 *
 * THE ENTRANCE
 * The copy cascades, the panel rises, then the chart builds in the order you
 * would read it: rings and spokes fade in, the baseline pentagon draws itself,
 * the current polygon sweeps in behind it, its dots pop, the gap pills appear,
 * and finally the two arrows draw down to the cards that rise to meet them.
 * All of it is gated on `useReducedMotion`.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { pulse } = compliance;

/** The mark beside each benefit, and the tone it carries. */
const benefitIcons = {
  target: TargetIcon,
  bars: BarsIcon,
  arrow: ArrowUpIcon,
} as const;

const BENEFIT_TONES = {
  teal: "text-[#19b6a6]",
  violet: "text-[#a78bfa]",
  amber: "text-[#f0b429]",
} as const;

/** The two gap tones: the pill, the card's stroke, and its arrow. */
const GAP_TONES = {
  red: {
    stroke: "#f2686c",
    pill: "bg-[#f2686c]",
    ring: "ring-[#f2686c]/70",
    text: "text-[#f2686c]",
  },
  amber: {
    stroke: "#dfa021",
    pill: "bg-[#dfa021]",
    ring: "ring-[#dfa021]/70",
    text: "text-[#f0b429]",
  },
} as const;

/* -------------------------------------------------------------------------- */
/*  Radar geometry                                                            */
/* -------------------------------------------------------------------------- */

/** The chart's own square box. Every number below is in these units. */
const BOX = 420;
const CENTRE = { x: BOX / 2, y: BOX / 2 - 8 };
/** The rim — ring L4 — leaving room for the axis labels outside it. */
const RADIUS = 132;
const RINGS = pulse.panel.rings.length;
const AXES = pulse.panel.axes.length;

/**
 * One point on the chart.
 *
 * `index` is the axis, counted CLOCKWISE FROM THE TOP — hence `-90deg` to put
 * axis 0 at twelve o'clock rather than at three. `level` is in ring units, so
 * 0 is the centre and `RINGS` the rim.
 */
function polar(index: number, level: number) {
  const angle = ((Math.PI * 2) / AXES) * index - Math.PI / 2;
  const r = (level / RINGS) * RADIUS;

  return {
    x: CENTRE.x + Math.cos(angle) * r,
    y: CENTRE.y + Math.sin(angle) * r,
  };
}

/** A closed polygon through one level on every axis, or through given levels. */
function polygon(levels: number[] | number) {
  const at = (i: number) =>
    typeof levels === "number" ? levels : (levels[i] ?? 0);

  return (
    pulse.panel.axes
      .map((_, i) => {
        const p = polar(i, at(i));
        return `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
      })
      .join(" ") + " Z"
  );
}

/**
 * One axis, and the gap id it may carry.
 *
 * The content file declares the five axes `as const`, so their union is a
 * union of five DIFFERENT shapes and `gap` is not readable off the union as a
 * whole — only three of them have it. Widening to a common shape here is
 * honest about that: `gap` is genuinely optional, not a discriminant, so there
 * is nothing to narrow on.
 */
type Axis = {
  label: readonly string[];
  baseline: number;
  current: number;
  gap?: string;
};

const AXIS_LIST: readonly Axis[] = pulse.panel.axes;

const BASELINE = pulse.panel.axes.map((a) => a.baseline);
const CURRENT = pulse.panel.axes.map((a) => a.current);

/**
 * Where each axis label sits, just outside the rim.
 *
 * `anchor` keeps a label from running back over the chart: the one at the top
 * centres, those on the right read left-to-right off the rim, and those on the
 * left are right-aligned so they end at it.
 */
const AXIS_LABELS = AXIS_LIST.map((axis, i) => {
  const p = polar(i, RINGS + 0.78);
  const dx = p.x - CENTRE.x;

  return {
    axis,
    x: p.x,
    y: p.y,
    anchor: Math.abs(dx) < 12 ? "middle" : dx > 0 ? "start" : "end",
  } as const;
});

/**
 * The gap pills on the chart, and the arrows that run from each down to its
 * card.
 *
 * The pill sits on the axis it marks, pushed a little outside the CURRENT
 * vertex so it does not cover the dot. The arrow's path is written in the
 * panel's own percentage space rather than the chart's box, since it has to
 * leave the panel and reach a card below it.
 */
const GAP_PILLS = pulse.gaps.map((gap, order) => {
  const index = AXIS_LIST.findIndex((a) => a.gap === gap.id);
  const axis = AXIS_LIST[index];
  const at = polar(index, axis.current);
  /*
   * The pill sits beside the gap it marks — on the midpoint between the
   * current dot and the baseline vertex, pushed clear of the axis on the
   * outward normal.
   *
   * Pushing it OUT along the axis instead (the obvious first try) walked it
   * straight onto the axis label beyond the rim, whichever offset was used:
   * the label and the rim are on the same ray. Offsetting perpendicular to the
   * axis keeps it in open space between the two polygons.
   */
  const mid = polar(index, (axis.current + axis.baseline) / 2);
  const angle = ((Math.PI * 2) / AXES) * index - Math.PI / 2;
  const out = {
    x: mid.x + Math.cos(angle - Math.PI / 2) * 32,
    y: mid.y + Math.sin(angle - Math.PI / 2) * 32,
  };

  return {
    gap,
    number: String(order + 1).padStart(2, "0"),
    /** The dot the pill belongs to, and where the pill itself sits. */
    dot: at,
    pill: out,
  };
});

export function CompliancePulse() {
  const reduce = useReducedMotion();

  /** The left column's cascade. */
  const rise = (delay: number) => ({
    initial: reduce ? "shown" : "hidden",
    whileInView: "shown",
    viewport: { once: true, amount: "some" } as const,
    variants: {
      hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
      shown: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.85, delay, ease: easeOut },
      },
    },
  });

  /** The lift the panel and the two gap cards share. */
  const lift = (delay: number) => ({
    initial: reduce
      ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
      : { opacity: 0, y: 30, scale: 0.96, filter: "blur(8px)" },
    whileInView: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
    viewport: { once: true, amount: "some" } as const,
    transition: { duration: 0.9, delay, ease: easeOut },
  });

  /** A stroke that draws itself along its own length. */
  const drawPath = (delay: number, duration = 0.9) => ({
    initial: reduce
      ? { pathLength: 1, opacity: 1 }
      : { pathLength: 0, opacity: 0 },
    whileInView: { pathLength: 1, opacity: 1 },
    viewport: { once: true, amount: "some" } as const,
    transition: { duration, delay, ease: easeOut },
  });

  return (
    <section className="relative isolate overflow-hidden bg-[#2f4d91] py-section-lg text-white">
      {/* The gradient. Covers the section, so everything sits on it. */}
      <Image
        src={pulse.backdrop.src}
        alt={pulse.backdrop.alt}
        width={pulse.backdrop.width}
        height={pulse.backdrop.height}
        aria-hidden="true"
        sizes="100vw"
        className="pointer-events-none absolute inset-0 -z-10 size-full object-cover"
      />

      <Container width="hero">
        <div className="grid items-start gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:gap-14 xl:gap-18">
          {/* ========================= Left column ==================== */}
          <div className="lg:pt-6">
            <motion.p
              {...rise(0.05)}
              className={cn(
                "text-[0.6875rem] font-bold uppercase",
                "tracking-[0.18em] text-[#b9a4f5] sm:text-xs",
              )}
            >
              {pulse.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.16)}
              className={cn(
                "mt-5 font-display font-bold tracking-[-0.035em]",
                "leading-[1.06] text-white",
                "text-[1.875rem] sm:text-[2.25rem] xl:text-[2.875rem]",
              )}
            >
              {pulse.headline.map((line) => (
                <span key={line} className="inline lg:block">
                  {line}{" "}
                </span>
              ))}
            </motion.h2>

            <motion.p
              {...rise(0.28)}
              className={cn(
                "mt-6 max-w-[32rem] leading-relaxed text-pretty",
                "text-[0.9375rem] text-[#cfd8f2] sm:text-[1rem]",
              )}
            >
              {pulse.description}
            </motion.p>

            {/* ------------------------ Benefits -------------------- */}
            <ul className="mt-10 space-y-7">
              {pulse.benefits.map((benefit, index) => {
                const Icon = benefitIcons[benefit.icon];

                return (
                  <motion.li
                    key={benefit.title}
                    {...rise(0.4 + index * 0.12)}
                    className="flex gap-5"
                  >
                    <Icon
                      className={cn(
                        "mt-0.5 size-9 shrink-0",
                        BENEFIT_TONES[benefit.tone],
                      )}
                    />

                    <span className="min-w-0">
                      <span className="block text-[1.0625rem] font-bold tracking-[-0.01em] text-white">
                        {benefit.title}
                      </span>
                      <span className="mt-1.5 block max-w-[27rem] text-[0.9375rem] leading-relaxed text-[#c3cdea]">
                        {benefit.body}
                      </span>
                    </span>
                  </motion.li>
                );
              })}
            </ul>

            <motion.p
              {...rise(0.78)}
              className="mt-10 text-[0.875rem] text-[#9fadd4]"
            >
              {pulse.poweredBy}
            </motion.p>
          </div>

          {/* ========================== The stage ===================== */}
          {/* The panel, the two arrows and the two gap cards. The arrows are
              drawn on one overlay spanning the whole stage, so a single
              coordinate space carries them from the chart down to the cards. */}
          <Uncopyable className="relative">
            <motion.div {...lift(0.25)}>
              <RadarPanel reduce={Boolean(reduce)} drawPath={drawPath} />
            </motion.div>

            {/* --------------------- The handwritten note ---------- */}
            {/* Between the panel and the cards, where the design sets it.
                Only from sm up — at phone width the gap between them is one
                line of card, with no room beside the arrows. */}
            <motion.p
              {...rise(1.5)}
              className={cn(
                "mt-5 hidden text-right sm:block",
                "font-hand text-[1.0625rem] leading-none text-[#c9b6fb]",
                "xl:text-[1.1875rem]",
                // The amber arrow drops down the stage's far right edge on
                // its way to card 02, so the note stops short of that edge
                // rather than being struck through.
                "xl:pr-[16%]",
              )}
            >
              {pulse.note}
            </motion.p>

            {/* ----------------------- The gap cards -------------- */}
            <ul className="mt-6 grid gap-5 sm:mt-4 sm:grid-cols-2">
              {pulse.gaps.map((gap, index) => (
                <motion.li key={gap.id} {...lift(1.65 + index * 0.12)}>
                  <GapCard gap={gap} number={index + 1} />
                </motion.li>
              ))}
            </ul>

            {/* ------------------------- The arrows ---------------- */}
            {/* Overlaid on the whole stage so each can run from its pill on
                the chart down to the card it belongs to. `xl` only: below
                that the panel and cards are too close for a curve to read,
                and it would cross the note. */}
            <GapArrows reduce={Boolean(reduce)} />
          </Uncopyable>
        </div>
      </Container>
    </section>
  );
}

/* ========================================================================== */
/*  The radar panel                                                           */
/* ========================================================================== */

/**
 * The white panel: its header, the chart's key, and the radar itself.
 */
function RadarPanel({
  reduce,
  drawPath,
}: {
  reduce: boolean;
  drawPath: (
    delay: number,
    duration?: number,
  ) => Record<string, unknown>;
}) {
  const { panel } = pulse;

  /** A fade for the chart's furniture — rings, spokes, ring labels. */
  const fade = (delay: number) => ({
    initial: reduce ? { opacity: 1 } : { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true, amount: "some" } as const,
    transition: { duration: 0.6, delay, ease: easeOut },
  });

  return (
    <div
      className={cn(
        "rounded-[1.35rem] bg-white p-6 sm:p-7",
        "shadow-[0_30px_70px_-30px_rgb(8_16_48/0.6)]",
      )}
    >
      {/* ----------------------------- Header ---------------------- */}
      <div className="flex items-start justify-between gap-4">
        <span className="flex items-center gap-2">
          <PulseMarkIcon className="size-5 shrink-0 text-[#7c1ed1]" />
          <span className="text-[1.0625rem] font-bold tracking-[-0.015em] text-[#2b1170]">
            {panel.engine}
          </span>
        </span>

        <span className="shrink-0 text-[0.8125rem] text-[#6b7192]">
          {panel.tag}
        </span>
      </div>

      <p className="mt-2 text-[1.25rem] font-bold tracking-[-0.02em] text-[#111132] sm:text-[1.375rem]">
        {panel.title}
      </p>

      {/* -------------------- The key and the chart ---------------- */}
      {/* The key sits beside the chart from sm up, as the design sets it, and
          above it below that where there is no room for a column. */}
      <div className="mt-4 gap-4 sm:flex sm:items-start">
        <div className="shrink-0 sm:w-[10.5rem] sm:pt-6">
          <ul className="space-y-2">
            <li className="flex items-center gap-2.5">
              {/* The baseline's dash, drawn rather than typed so it matches
                  the chart's own stroke. */}
              <svg
                viewBox="0 0 26 6"
                className="h-1.5 w-6 shrink-0"
                aria-hidden="true"
              >
                <path
                  d="M1 3h24"
                  stroke="#8b5cf6"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeDasharray="6 5"
                />
              </svg>
              <span className="text-[0.8125rem] text-[#2f3358]">
                {panel.legend.baseline}
              </span>
            </li>

            <li className="flex items-center gap-2.5">
              <svg
                viewBox="0 0 26 6"
                className="h-1.5 w-6 shrink-0"
                aria-hidden="true"
              >
                <path
                  d="M1 3h24"
                  stroke="#0f9b8e"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
              </svg>
              <span className="text-[0.8125rem] text-[#2f3358]">
                {panel.legend.current}
              </span>
            </li>
          </ul>

          <p className="mt-3 text-[0.75rem] leading-[1.6] text-nowrap text-[#7a80a0]">
            {panel.legend.notes.map((note) => (
              <span key={note} className="block">
                {note}
              </span>
            ))}
          </p>
        </div>

        {/* --------------------------- The radar ------------------- */}
        <div className="mt-4 min-w-0 flex-1 sm:mt-0">
          <svg
            viewBox={`0 0 ${BOX} ${BOX}`}
            className="-mb-6 mx-auto h-auto w-full max-w-[26rem] sm:-mb-10"
            role="img"
            aria-label={`${panel.title}. ${panel.axes
              .map(
                (a) =>
                  `${a.label.join(" ")}: current level ${a.current} of ${RINGS}, role baseline ${a.baseline}.`,
              )
              .join(" ")}`}
          >
            {/* ------------------------ Rings ---------------------- */}
            {/* Pentagons rather than circles, as the design draws them. */}
            {Array.from({ length: RINGS }).map((_, ring) => (
              <motion.path
                key={ring}
                {...fade(0.35 + ring * 0.06)}
                d={polygon(ring + 1)}
                fill="none"
                stroke="#d9dcee"
                strokeWidth={ring === RINGS - 1 ? 1.4 : 1}
                strokeLinejoin="round"
              />
            ))}

            {/* ------------------------ Spokes --------------------- */}
            {panel.axes.map((axis, i) => {
              const p = polar(i, RINGS);
              return (
                <motion.line
                  key={axis.label.join(" ")}
                  {...fade(0.4 + i * 0.04)}
                  x1={CENTRE.x}
                  y1={CENTRE.y}
                  x2={p.x}
                  y2={p.y}
                  stroke="#e2e5f3"
                  strokeWidth="1"
                />
              );
            })}

            {/* --------------------- Ring labels ------------------- */}
            {/* Up the top axis, as the design sets them. */}
            {panel.rings.map((label, ring) => {
              const p = polar(0, ring + 1);
              return (
                <motion.text
                  key={label}
                  {...fade(0.5 + ring * 0.05)}
                  x={p.x + 9}
                  y={p.y + 4}
                  fill="#9aa0bd"
                  fontSize="11"
                  fontWeight="500"
                >
                  {label}
                </motion.text>
              );
            })}

            {/* -------------------- Baseline polygon --------------- */}
            {/* The role's expectation: a dashed violet pentagon, drawn before
                the current level so the comparison reads as "here is the bar,
                and here is where they are". */}
            {/*
              NOT `pathLength`: Motion animates a draw by driving
              `strokeDasharray` itself, which overwrites the dashes the design
              calls for and renders this as a solid violet pentagon. So the
              baseline sweeps out from the centre instead — the dashes survive,
              and it still reads as arriving before the current level.
            */}
            <motion.path
              d={polygon(BASELINE)}
              fill="#8b5cf6"
              fillOpacity={0.07}
              stroke="#8b5cf6"
              strokeWidth="2.4"
              strokeDasharray="7 6"
              strokeLinejoin="round"
              initial={
                reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.3 }
              }
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: "some" }}
              transition={{ duration: 0.95, delay: 0.75, ease: easeOut }}
              style={{ transformOrigin: `${CENTRE.x}px ${CENTRE.y}px` }}
            />

            {/* --------------------- Current polygon --------------- */}
            {/* Sweeps up from the centre rather than drawing edge by edge:
                the shape growing out to its assessed levels is the reading. */}
            <motion.path
              d={polygon(CURRENT)}
              fill="#1aa294"
              fillOpacity={0.22}
              stroke="#0f9b8e"
              strokeWidth="3"
              strokeLinejoin="round"
              initial={
                reduce
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.25 }
              }
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: "some" }}
              transition={{ duration: 0.95, delay: 1.05, ease: easeOut }}
              style={{ transformOrigin: `${CENTRE.x}px ${CENTRE.y}px` }}
            />

            {/* ----------------------- The dots -------------------- */}
            {/* One per axis on the current polygon. A gap axis gets a hollow
                dot in its own colour; the rest are solid teal. */}
            {AXIS_LIST.map((axis, i) => {
              const p = polar(i, axis.current);
              const marked = GAP_PILLS.find(
                (g) => g.gap.id === axis.gap,
              );
              const tone = marked
                ? GAP_TONES[marked.gap.tone].stroke
                : "#0f9b8e";

              return (
                <motion.circle
                  key={axis.label.join(" ")}
                  cx={p.x}
                  cy={p.y}
                  r={marked ? 5.5 : 4.5}
                  fill={marked ? "#fff" : tone}
                  stroke={tone}
                  strokeWidth={marked ? 3 : 0}
                  initial={
                    reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }
                  }
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: "some" }}
                  transition={{
                    duration: 0.45,
                    delay: 1.5 + i * 0.07,
                    ease: easeOut,
                  }}
                  style={{ transformOrigin: `${p.x}px ${p.y}px` }}
                />
              );
            })}

            {/* ------------------ The gap connectors --------------- */}
            {/* A short stem from each marked dot down to its baseline vertex,
                which is the gap the card below then names. */}
            {GAP_PILLS.map(({ gap, dot }) => {
              const index = AXIS_LIST.findIndex((a) => a.gap === gap.id);
              const base = polar(index, AXIS_LIST[index].baseline);
              const tone = GAP_TONES[gap.tone];

              return (
                <g key={gap.id}>
                  <motion.line
                    {...drawPath(1.75, 0.5)}
                    x1={dot.x}
                    y1={dot.y}
                    x2={base.x}
                    y2={base.y}
                    stroke={tone.stroke}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    opacity={0.75}
                  />
                  <motion.circle
                    cx={base.x}
                    cy={base.y}
                    r="4.5"
                    fill="#fff"
                    stroke={tone.stroke}
                    strokeWidth="2.6"
                    initial={
                      reduce
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0 }
                    }
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: "some" }}
                    transition={{ duration: 0.4, delay: 2, ease: easeOut }}
                    style={{ transformOrigin: `${base.x}px ${base.y}px` }}
                  />
                </g>
              );
            })}

            {/* --------------------- Axis labels ------------------- */}
            {AXIS_LABELS.map(({ axis, x, y, anchor }, i) => (
              <motion.text
                key={axis.label.join(" ")}
                {...fade(0.55 + i * 0.05)}
                x={x}
                y={y}
                textAnchor={anchor}
                fill="#2c3055"
                fontSize="13"
                fontWeight="500"
              >
                {axis.label.map((line, li) => (
                  <tspan
                    key={line}
                    x={x}
                    // The first line sits on the anchor; the rest stack under
                    // it. A multi-line label is centred on its own block.
                    dy={li === 0 ? (axis.label.length > 1 ? -6 : 0) : 16}
                  >
                    {line}
                  </tspan>
                ))}
              </motion.text>
            ))}

            {/* ---------------------- Gap pills -------------------- */}
            {GAP_PILLS.map(({ gap, number, pill }) => {
              const tone = GAP_TONES[gap.tone];

              return (
                <motion.g
                  key={gap.id}
                  initial={
                    reduce
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.5 }
                  }
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: "some" }}
                  transition={{ duration: 0.5, delay: 2.05, ease: easeOut }}
                  style={{ transformOrigin: `${pill.x}px ${pill.y}px` }}
                >
                  <rect
                    x={pill.x - 17}
                    y={pill.y - 12}
                    width="34"
                    height="24"
                    rx="7"
                    fill={tone.stroke}
                  />
                  <text
                    x={pill.x}
                    y={pill.y + 5}
                    textAnchor="middle"
                    fill="#fff"
                    fontSize="13"
                    fontWeight="700"
                  >
                    {number}
                  </text>
                </motion.g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ========================================================================== */
/*  The gap cards and their arrows                                            */
/* ========================================================================== */

type Gap = (typeof pulse.gaps)[number];

/** One gap: its number, the two levels, the distance between them, and why. */
function GapCard({ gap, number }: { gap: Gap; number: number }) {
  const tone = GAP_TONES[gap.tone];

  return (
    <div
      className={cn(
        "h-full rounded-[1.1rem] p-5",
        // A translucent dark fill, so the gradient shows through as it does in
        // the design rather than being blocked out.
        "bg-[#1d2f63]/55 backdrop-blur-sm",
        "ring-1 ring-inset",
        tone.ring,
        "duration-normal transition-[translate,box-shadow] ease-out",
        "will-change-[translate] hover:-translate-y-1",
      )}
    >
      <div className="flex items-center gap-3">
        <span
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-[0.6rem]",
            "text-[0.9375rem] font-bold text-white",
            tone.pill,
          )}
        >
          {String(number).padStart(2, "0")}
        </span>

        <span className="text-[1.0625rem] font-bold tracking-[-0.015em] text-white">
          {gap.title}
        </span>
      </div>

      {/* The two levels, as the design chips them. */}
      <div className="mt-4 flex flex-wrap gap-2.5">
        {[gap.baseline, gap.current].map((level) => (
          <span
            key={level}
            className={cn(
              "rounded-[0.55rem] px-3 py-1.5",
              "text-[0.8125rem] text-[#d7deef]",
              "ring-1 ring-white/18 ring-inset",
            )}
          >
            {level}
          </span>
        ))}
      </div>

      <p
        className={cn(
          "mt-4 text-[1.1875rem] font-bold tracking-[-0.015em]",
          tone.text,
        )}
      >
        {gap.gap}
      </p>

      <p className="mt-2 text-[0.875rem] leading-relaxed text-[#c2cbe6]">
        {gap.body}
      </p>
    </div>
  );
}

/**
 * THE TWO ARROWS
 * ---------------------------------------------------------------------------
 * Each runs from its gap pill on the chart down to the card that names it.
 *
 * Drawn on ONE overlay spanning the whole stage — panel, note and cards — so a
 * single coordinate space carries a curve across all three. Split across two
 * boxes, the halves would not meet.
 *
 * `preserveAspectRatio="none"` is correct HERE, unlike the section 3 arrows:
 * these are long, lazy curves with no arrowhead of their own to smear and no
 * round cap whose roundness could distort. Stretching them to the stage is
 * what keeps each one landing on its card at every width.
 *
 * The coordinates are percentages of the stage: the chart's two pills sit at
 * roughly (46%, 40%) and (72%, 43%), and the cards' top edges at y=72%.
 */
const GAP_ARROWS = [
  {
    id: "escalation",
    tone: "red",
    /* Left pill, sweeping out and down to the left card's top edge. */
    d: "M 40 48 C 27 57, 20 62, 21 70",
    delay: 2.2,
  },
  {
    id: "documentation",
    tone: "amber",
    /*
     * Right pill, bowing out right and back down to the right card. It clears
     * the handwritten note by staying wide of it: run straight down and the
     * curve crosses the note's line instead.
     */
    d: "M 62 47 C 92 52, 97 62, 90 70",
    delay: 2.35,
  },
] as const;

function GapArrows({ reduce }: { reduce: boolean }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 hidden size-full xl:block"
    >
      <defs>
        {pulse.gaps.map((gap) => (
          <marker
            key={gap.id}
            id={`pulse-head-${gap.id}`}
            viewBox="0 0 10 10"
            refX="7"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 8 5 L 0 9 z" fill={GAP_TONES[gap.tone].stroke} />
          </marker>
        ))}
      </defs>

      {GAP_ARROWS.map((arrow) => (
        <motion.path
          key={arrow.id}
          d={arrow.d}
          stroke={GAP_TONES[arrow.tone].stroke}
          strokeWidth="0.42"
          strokeLinecap="round"
          markerEnd={`url(#pulse-head-${arrow.id})`}
          initial={
            reduce
              ? { pathLength: 1, opacity: 1 }
              : { pathLength: 0, opacity: 0 }
          }
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: "some" }}
          transition={{ duration: 0.8, delay: arrow.delay, ease: easeOut }}
        />
      ))}
    </svg>
  );
}

/* ========================================================================== */
/*  Icons                                                                     */
/* ========================================================================== */

/** LurnyPulse — the rising bars, in the panel's header. */
function PulseMarkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="13.5" width="4.6" height="7.5" rx="1.4" fill="currentColor" />
      <rect x="9.7" y="8" width="4.6" height="13" rx="1.4" fill="currentColor" />
      <rect x="16.4" y="3" width="4.6" height="18" rx="1.4" fill="currentColor" />
    </svg>
  );
}

/** Benefit 1 — a target with an arrow through it. */
function TargetIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <circle cx="15" cy="17" r="11" stroke="currentColor" strokeWidth="2" />
      <circle cx="15" cy="17" r="6" stroke="currentColor" strokeWidth="2" />
      <circle cx="15" cy="17" r="1.9" fill="currentColor" />
      {/* The arrow, entering from the top right. */}
      <path
        d="M15 17 26 6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M21.6 4.6 27.4 3l-1.6 5.8-4.2-4.2Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Benefit 2 — the bar chart, matching the engine's own mark. */
function BarsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <rect x="3.5" y="18" width="6.4" height="10.5" rx="1.8" stroke="currentColor" strokeWidth="2" />
      <rect x="12.8" y="11" width="6.4" height="17.5" rx="1.8" stroke="currentColor" strokeWidth="2" />
      <rect x="22.1" y="4" width="6.4" height="24.5" rx="1.8" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

/** Benefit 3 — the next step, as an arrow curving up. */
function ArrowUpIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <path
        d="M7 27c0-9 3.5-14 10.5-14"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M13.4 7.6 20 13l-6.2 5.4"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
