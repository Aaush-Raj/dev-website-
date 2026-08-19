"use client";

import { motion, useReducedMotion } from "motion/react";

import {
  BookGlyph,
  BubbleGlyph,
  CheckGlyph,
  PeopleGlyph,
  StarGlyph,
  TrendUpGlyph,
} from "@/components/sections/tour/TourIcons";
import { Uncopyable } from "@/components/ui/Uncopyable";
import { tour } from "@/content/tour";
import { cn } from "@/lib/utils";

/**
 * TOUR POSTER
 * ---------------------------------------------------------------------------
 * The still illustration behind the play control: five cards showing one role
 * moving through the capability loop, joined by dashed connectors.
 *
 * On lg+ the cards are placed on a 12-column grid with vertical offsets, which
 * reproduces the design's descending stagger while keeping every card in
 * normal flow. Below lg the whole thing becomes a horizontal scroller — the
 * five-card chain is the point, and squashing it into a phone-width column
 * would lose the left-to-right progression it exists to show.
 *
 * Entirely decorative: the section heading and step rail carry the meaning, so
 * the whole poster is aria-hidden.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const card = cn(
  "rounded-2xl border border-white/8 bg-[#0f111c]/95 p-4 backdrop-blur-sm",
);

const cardLabel = cn(
  "font-mono text-[0.5625rem] font-medium tracking-[0.14em] text-neutral-400 uppercase",
);

export function TourPoster({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const { loop } = tour;

  const rise = (delay: number) => ({
    initial: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: {
      duration: reduce ? 0 : 0.55,
      delay: reduce ? 0 : delay,
      ease: easeOut,
    },
  });

  return (
    <Uncopyable className={cn("relative", className)}>
      {/* Dashed connectors, behind the cards. Hidden below lg where the
          layout becomes a scroller and the arcs would not line up. */}
      <ConnectorLayer className="pointer-events-none absolute inset-0 hidden lg:block" />

      {/*
        Below lg: horizontal scroller so the chain stays legible.
        On lg+: a 12-column grid with per-card vertical offsets.
      */}
      <div
        className={cn(
          "relative flex scrollbar-none gap-3 overflow-x-auto pb-4",
          "lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-3 lg:overflow-visible lg:pb-0",
        )}
      >
        {/* ---------------------------------------------- 1. Readiness */}
        <motion.div
          {...rise(0.05)}
          className={cn(card, "w-[13rem] shrink-0 lg:col-span-3 lg:w-auto")}
        >
          <p className={cardLabel}>{loop.readiness.label}</p>

          <div className="mt-4 flex justify-center">
            <ScoreGauge
              value={loop.readiness.score}
              outOf={loop.readiness.outOf}
            />
          </div>

          <p className="mt-4 text-[0.9375rem] font-medium text-white">
            {loop.readiness.role}
          </p>
          <p className="mt-1.5 flex items-center gap-1 text-[0.6875rem]">
            <TrendUpGlyph className="size-3 text-[#4ade80]" />
            <span className="font-semibold text-[#4ade80]">
              {loop.readiness.delta}
            </span>
            <span className="text-neutral-400">
              {loop.readiness.deltaCaption}
            </span>
          </p>
        </motion.div>

        {/* ------------------------------------------- 2. Competencies */}
        <motion.div
          {...rise(0.14)}
          className={cn(
            card,
            "w-[15rem] shrink-0 lg:col-span-3 lg:mt-6 lg:w-auto",
          )}
        >
          <p className={cardLabel}>{loop.competencies.label}</p>
          <CompetencyRadar className="mt-2" />

          <div className="mt-2 flex items-center justify-center gap-4 text-[0.5625rem] text-neutral-300">
            <span className="flex items-center gap-1.5">
              <span className="h-px w-4 bg-brand-400" />
              {loop.competencies.legend.you}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-px w-4 border-t border-dashed border-accent-400" />
              {loop.competencies.legend.benchmark}
            </span>
          </div>
        </motion.div>

        {/* ---------------------------------------------- 3. Learning */}
        <motion.div
          {...rise(0.23)}
          className={cn(
            card,
            "w-[13.5rem] shrink-0 lg:col-span-2 lg:mt-14 lg:w-auto",
          )}
        >
          <p className={cardLabel}>{loop.learning.label}</p>

          <div className="mt-3 flex flex-col gap-2.5">
            {loop.learning.items.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-white/8 bg-white/2 p-2.5"
              >
                <div className="flex items-start gap-2.5">
                  <span
                    className={cn(
                      "grid size-7 shrink-0 place-items-center rounded-lg text-white",
                      item.tone === "amber" ? "bg-[#c8892c]" : "bg-brand-600",
                    )}
                  >
                    {item.tone === "amber" ? (
                      <PeopleGlyph className="size-4" />
                    ) : (
                      <BookGlyph className="size-4" />
                    )}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[0.6875rem] leading-snug font-semibold text-white">
                      {item.title}
                    </p>
                    <p className="mt-1 text-[0.5625rem] text-neutral-400">
                      {item.meta}
                      {"action" in item && item.action ? (
                        <>
                          {" • "}
                          <span className="font-semibold text-accent-400">
                            {item.action}
                          </span>
                        </>
                      ) : null}
                    </p>
                  </div>
                </div>

                {"progress" in item && item.progress ? (
                  <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="h-full rounded-full bg-brand-500"
                      initial={{
                        width: reduce ? `${item.progress * 100}%` : 0,
                      }}
                      whileInView={{ width: `${item.progress * 100}%` }}
                      viewport={{ once: true }}
                      transition={{
                        duration: reduce ? 0 : 0.9,
                        delay: reduce ? 0 : 0.6,
                        ease: easeOut,
                      }}
                    />
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </motion.div>

        {/* ------------------------------------------------ 4. Signal */}
        <motion.div
          {...rise(0.32)}
          className={cn(
            card,
            "w-[13.5rem] shrink-0 lg:col-span-2 lg:mt-24 lg:w-auto",
          )}
        >
          <p className={cardLabel}>{loop.signal.label}</p>

          <div className="mt-3 flex items-start gap-2.5">
            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-brand-600 text-white">
              <BubbleGlyph className="size-4" />
            </span>
            <p className="text-[0.6875rem] leading-snug font-semibold text-white">
              {loop.signal.title}
            </p>
          </div>

          <span className="mt-2.5 inline-block rounded-md bg-[#1b3b28] px-2 py-1 text-[0.5625rem] font-medium text-[#6ee7a0]">
            {loop.signal.chip}
          </span>

          <dl className="mt-3 flex flex-col gap-1.5 text-[0.625rem]">
            {loop.signal.rows.map((row) => (
              <div key={row.label} className="flex justify-between gap-3">
                <dt className="text-neutral-400">{row.label}</dt>
                <dd
                  className={cn(
                    "font-semibold",
                    row.tone === "positive" ? "text-[#4ade80]" : "text-white",
                  )}
                >
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>

        {/* ------------------------------------------------ 5. Action */}
        <motion.div
          {...rise(0.41)}
          className={cn(
            card,
            "w-[14rem] shrink-0 lg:col-span-2 lg:mt-32 lg:w-auto",
          )}
        >
          <p className={cardLabel}>{loop.action.label}</p>

          <div className="mt-3 flex items-start gap-2.5">
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#c8892c] text-white">
              <StarGlyph className="size-4" />
            </span>
            <p className="text-[0.6875rem] leading-snug font-semibold text-white">
              {loop.action.title}
            </p>
          </div>

          <p className="mt-3 text-[0.625rem] text-neutral-300">
            {loop.action.subtitle}
          </p>

          <ul className="mt-2 flex flex-col gap-1.5">
            {loop.action.steps.map((step) => (
              <li
                key={step}
                className="flex items-center gap-2 text-[0.625rem] text-neutral-300"
              >
                <CheckGlyph className="size-3.5 shrink-0 text-neutral-500" />
                {step}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </Uncopyable>
  );
}

/* ========================================================================== */
/* Score gauge — a 270-degree arc                                             */
/* ========================================================================== */

function ScoreGauge({ value, outOf }: { value: number; outOf: number }) {
  const reduce = useReducedMotion();

  // 270-degree arc, opening at the bottom.
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const arcFraction = 0.75;
  const track = circumference * arcFraction;
  const filled = track * (value / outOf);

  return (
    <div className="relative size-[5.5rem]">
      <svg
        viewBox="0 0 100 100"
        className="size-full -rotate-[135deg]"
        aria-hidden="true"
      >
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="var(--brand-900)"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={`${track} ${circumference}`}
        />
        <motion.circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="var(--brand-500)"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={`${filled} ${circumference}`}
          initial={{ strokeDashoffset: reduce ? 0 : filled }}
          whileInView={{ strokeDashoffset: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: reduce ? 0 : 1.3,
            delay: reduce ? 0 : 0.35,
            ease: easeOut,
          }}
        />
      </svg>

      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center leading-none">
          <p className="text-xl font-bold text-white">{value}</p>
          <p className="mt-1 text-[0.625rem] text-neutral-400">of {outOf}</p>
        </div>
      </div>
    </div>
  );
}

/* ========================================================================== */
/* Competency radar — "you" against a dashed benchmark                        */
/* ========================================================================== */

function CompetencyRadar({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const { axes, you, benchmark } = tour.loop.competencies;

  const cx = 50;
  const cy = 52;
  const maxR = 24;
  // Labels sit outside the outermost ring, so they never overlap the plot.
  const labelR = maxR + 14;

  const pointAt = (index: number, scale: number) => {
    const angle = (Math.PI * 2 * index) / axes.length - Math.PI / 2;
    return [
      cx + Math.cos(angle) * maxR * scale,
      cy + Math.sin(angle) * maxR * scale,
    ] as const;
  };

  const toPath = (values: readonly number[]) =>
    values.map((v, i) => pointAt(i, v).join(",")).join(" ");

  return (
    <div className={cn("relative", className)}>
      <svg
        viewBox="0 0 100 100"
        className="w-full overflow-visible"
        aria-hidden="true"
      >
        {/* Grid rings */}
        {[0.35, 0.7, 1].map((ring) => (
          <polygon
            key={ring}
            points={axes.map((_, i) => pointAt(i, ring).join(",")).join(" ")}
            fill="none"
            stroke="rgb(255 255 255 / 0.10)"
            strokeWidth="0.5"
          />
        ))}
        {axes.map((_, i) => {
          const [x, y] = pointAt(i, 1);
          return (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={x}
              y2={y}
              stroke="rgb(255 255 255 / 0.10)"
              strokeWidth="0.5"
            />
          );
        })}

        {/* Benchmark — dashed amber outline */}
        <motion.polygon
          points={toPath(benchmark)}
          fill="none"
          stroke="var(--accent-400)"
          strokeWidth="1.1"
          strokeDasharray="3 2.2"
          strokeLinejoin="round"
          initial={{ opacity: reduce ? 1 : 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: reduce ? 0 : 0.75 }}
        />

        {/* You — filled violet */}
        <motion.polygon
          points={toPath(you)}
          fill="var(--brand-500)"
          fillOpacity="0.4"
          stroke="var(--brand-400)"
          strokeWidth="1.2"
          strokeLinejoin="round"
          initial={{ scale: reduce ? 1 : 0.3, opacity: reduce ? 1 : 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          style={{ transformOrigin: "50% 52%" }}
          transition={{
            duration: reduce ? 0 : 0.8,
            delay: reduce ? 0 : 0.5,
            ease: easeOut,
          }}
        />

        {you.map((v, i) => {
          const [x, y] = pointAt(i, v);
          return (
            <circle key={i} cx={x} cy={y} r="1.4" fill="var(--brand-300)" />
          );
        })}

        {/* Axis labels, placed just beyond the outer ring. Multi-line labels
            carry a \n in the content and are split into tspans here. */}
        {axes.map((label, i) => {
          const angle = (Math.PI * 2 * i) / axes.length - Math.PI / 2;
          const x = cx + Math.cos(angle) * labelR;
          const y = cy + Math.sin(angle) * labelR;
          const lines = label.split("\n");
          // Nudge the block up so multi-line labels stay centred on the axis.
          const dy = -((lines.length - 1) * 3.4) / 2;

          return (
            <text
              key={label}
              x={x}
              y={y + dy}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="rgb(255 255 255 / 0.72)"
              fontSize="4.2"
            >
              {lines.map((line, j) => (
                <tspan key={line} x={x} dy={j === 0 ? 0 : 4.4}>
                  {line}
                </tspan>
              ))}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

/* ========================================================================== */
/* Dashed connectors between the cards                                        */
/* ========================================================================== */

/**
 * The connectors are absolutely-positioned segments rather than one SVG
 * spanning the whole poster.
 *
 * A single stretched SVG cannot work here: the poster's aspect ratio changes
 * with the viewport and the cards' own heights, so any fixed viewBox either
 * distorts (preserveAspectRatio="none") or drifts out of alignment. Each
 * segment instead sits in percentage space between the two cards it joins, so
 * it tracks the grid at every width.
 */
function ConnectorLayer({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  // left/top are the segment's start point; each spans the gutter between two
  // adjacent cards, descending as the card stagger does.
  const segments = [
    { left: "24.2%", top: "30%", width: "3.0%", rise: 8 },
    { left: "49.2%", top: "45%", width: "2.6%", rise: 8 },
    { left: "66.0%", top: "60%", width: "2.6%", rise: 8 },
    { left: "82.6%", top: "72%", width: "2.6%", rise: 8 },
  ];

  return (
    <div className={className} aria-hidden="true">
      {segments.map((seg, i) => (
        <motion.span
          key={seg.left}
          className="absolute block"
          style={{
            left: seg.left,
            top: seg.top,
            width: seg.width,
            height: `${seg.rise}%`,
          }}
          initial={{ opacity: reduce ? 0.9 : 0 }}
          whileInView={{ opacity: 0.9 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{
            duration: reduce ? 0 : 0.5,
            delay: reduce ? 0 : 0.3 + i * 0.12,
            ease: easeOut,
          }}
        >
          {/* A dashed line drawn corner-to-corner of the span, plus the small
              glowing node the design places along it. */}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="size-full overflow-visible"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M 0 0 L 100 100"
              stroke="var(--brand-600)"
              strokeWidth="2"
              strokeDasharray="7 7"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <span
            className={cn(
              "absolute top-1/2 left-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2",
              "rounded-full bg-white shadow-[0_0_8px_2px_rgb(147_112_240/0.7)]",
            )}
          />
        </motion.span>
      ))}
    </div>
  );
}
