"use client";

import { motion, useReducedMotion } from "motion/react";

import { sense } from "@/content/sense";
import { cn } from "@/lib/utils";

import { CalendarIcon, ChevronIcon, railIcons, statIcons } from "./SenseIcons";

/**
 * LURNYSENSE — THE DASHBOARD
 * ---------------------------------------------------------------------------
 * The product panel behind section 1's conversation: a rail, three figures, a
 * completion-trend line and a content-performance bar list.
 *
 * WHY IT IS NOT THE SUPPLIED CROP
 * The design ships this as a 495x598 PNG whose right edge is already cut off —
 * the README notes the crops "contain only their visible portions" and that
 * overlapping elements "cannot be recovered as original layers". Rebuilt here
 * it is whole, sharp at any density, and its ~30 labels stay real text.
 *
 * It is DECORATIVE: a picture of the product, not a live view. The section's
 * argument is carried by the copy beside it, so the whole panel is hidden from
 * assistive tech rather than announcing thirty fragments of mock UI, and every
 * control in it is inert.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { dashboard } = sense.hero;

/* The trend chart's plot box, in viewBox units. */
const CHART_W = 300;
const CHART_H = 96;

/** A trend point's x, spread evenly across the plot. */
function pointX(index: number, count: number) {
  return (index / (count - 1)) * CHART_W;
}

/** A trend point's y — value is a percentage, so 100 sits at the top. */
function pointY(value: number) {
  return CHART_H - (value / 100) * CHART_H;
}

/** The polyline through every trend point. */
const TREND_POINTS = dashboard.trend.points
  .map(
    (point, index) =>
      `${pointX(index, dashboard.trend.points.length).toFixed(1)},${pointY(point.value).toFixed(1)}`,
  )
  .join(" ");

export function SenseDashboard() {
  const reduce = useReducedMotion();

  return (
    <div
      // Decorative: see the note at the top of this file.
      aria-hidden="true"
      className={cn(
        "overflow-hidden rounded-2xl border border-white/8",
        "bg-[#0f1517] shadow-[0_40px_90px_-40px_rgb(0_0_0/0.9)]",
      )}
    >
      {/* =========================== The head ========================= */}
      <div className="flex items-start justify-between gap-4 p-5">
        <div className="min-w-0">
          <p className="font-display text-[1.0625rem] font-bold text-white">
            {dashboard.brand}
          </p>
          <p className="mt-0.5 text-[0.6875rem] text-[#8b9499]">
            {dashboard.subtitle}
          </p>
        </div>

        {/* Inert: a picture of a control. */}
        <span
          className={cn(
            "flex shrink-0 items-center gap-2 rounded-lg px-3 py-2",
            "border border-white/12 text-[0.6875rem] text-[#c9d1d3]",
          )}
        >
          <CalendarIcon className="size-3.5" />
          {dashboard.period}
          <ChevronIcon className="size-3 rotate-90" />
        </span>
      </div>

      {/*
        Below sm the rail moves ABOVE the panels: side by side it leaves the
        charts about 55px of width on a phone, which is unreadable.
      */}
      <div className="grid grid-cols-1 sm:grid-cols-[auto_minmax(0,1fr)]">
        {/* ========================== The rail ======================= */}
        <ul className="flex gap-1 overflow-x-auto border-b border-white/8 p-2 sm:block sm:border-r sm:border-b-0">
          {dashboard.nav.map((item) => {
            const Icon = railIcons[item.icon];
            const active = "active" in item && item.active;

            return (
              <li key={item.label}>
                <span
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg px-3 py-2.5",
                    "text-[0.75rem] whitespace-nowrap",
                    // The rail scrolls horizontally when stacked, so each item
                    // must keep its own width rather than compressing.
                    "shrink-0",
                    active
                      ? // The active row carries the amber mark the design
                        // gives it, plus a subtle raised ground.
                        "bg-white/6 font-semibold text-white"
                      : "text-[#8b9499]",
                  )}
                >
                  <Icon
                    className={cn(
                      "size-4 shrink-0",
                      active ? "text-[#fdd386]" : "text-[#6f797d]",
                    )}
                  />
                  {item.label}
                </span>
              </li>
            );
          })}
        </ul>

        {/* ========================= The panels ====================== */}
        <div className="min-w-0 space-y-3 p-3">
          {/* The three figures. */}
          <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {dashboard.stats.map((stat, index) => {
              const Icon = statIcons[stat.icon];

              return (
                <motion.li
                  key={stat.label}
                  className="rounded-xl border border-white/8 bg-[#182022] p-3"
                  initial={reduce ? "shown" : "hidden"}
                  whileInView="shown"
                  viewport={{ once: true, amount: "some" }}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    shown: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.45,
                        delay: 0.3 + index * 0.08,
                        ease: easeOut,
                      },
                    },
                  }}
                >
                  <span className="flex items-center gap-2">
                    <Icon className="size-3.5 shrink-0 text-[#8b9499]" />
                    <span className="font-display text-[1.0625rem] font-bold text-white">
                      {stat.value}
                    </span>
                  </span>
                  <span className="mt-1 block text-[0.625rem] text-[#8b9499]">
                    {stat.label}
                  </span>
                </motion.li>
              );
            })}
          </ul>

          {/* -------------------- Completion trend ---------------- */}
          <div className="rounded-xl border border-white/8 bg-[#182022] p-3.5">
            <p className="text-[0.75rem] font-semibold text-white">
              {dashboard.trend.title}
            </p>

            <div className="mt-3 flex gap-2">
              {/* The y axis. */}
              <ul className="flex flex-col justify-between text-[0.5625rem] text-[#6f797d]">
                {dashboard.trend.axis.map((tick) => (
                  <li key={tick}>{tick}</li>
                ))}
              </ul>

              <div className="min-w-0 flex-1">
                <svg
                  viewBox={`0 0 ${CHART_W} ${CHART_H}`}
                  preserveAspectRatio="none"
                  className="h-20 w-full"
                >
                  {/* The line, drawn from the values in content/sense.ts. */}
                  <motion.polyline
                    points={TREND_POINTS}
                    fill="none"
                    stroke="#8ac08b"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                    initial={reduce ? "shown" : "hidden"}
                    whileInView="shown"
                    viewport={{ once: true, amount: "some" }}
                    variants={{
                      hidden: { opacity: 0 },
                      shown: {
                        opacity: 1,
                        transition: {
                          duration: 0.6,
                          delay: 0.55,
                          ease: easeOut,
                        },
                      },
                    }}
                  />

                  {/* A dot at each reading. */}
                  {dashboard.trend.points.map((point, index) => (
                    <motion.circle
                      key={point.label}
                      cx={pointX(index, dashboard.trend.points.length)}
                      cy={pointY(point.value)}
                      r="3"
                      fill="#8ac08b"
                      initial={reduce ? "shown" : "hidden"}
                      whileInView="shown"
                      viewport={{ once: true, amount: "some" }}
                      variants={{
                        hidden: { opacity: 0 },
                        shown: {
                          opacity: 1,
                          transition: {
                            duration: 0.3,
                            delay: 0.7 + index * 0.06,
                          },
                        },
                      }}
                    />
                  ))}
                </svg>

                {/* The x axis. The last reading has no label in the design, so
                    only the first four are shown. */}
                <ul className="mt-1.5 flex justify-between text-[0.5625rem] text-[#6f797d]">
                  {dashboard.trend.points.slice(0, 4).map((point) => (
                    <li key={point.label}>{point.label}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* ------------------ Content performance --------------- */}
          <div className="rounded-xl border border-white/8 bg-[#182022] p-3.5">
            <p className="text-[0.75rem] font-semibold text-white">
              {dashboard.performance.title}
            </p>

            <ul className="mt-3 space-y-2.5">
              {dashboard.performance.rows.map((row, index) => (
                <li key={row.label} className="flex items-center gap-3">
                  <span className="w-12 shrink-0 text-[0.625rem] text-[#8b9499]">
                    {row.label}
                  </span>

                  <span className="h-2 min-w-0 flex-1 overflow-hidden rounded-full bg-white/8">
                    <motion.span
                      className="block h-full rounded-full bg-[#8ac08b]"
                      /*
                        Animated on `width`, not `scaleX`.

                        A scaled bar starts at zero WIDTH, so it has no area for
                        an intersection observer to see — and `whileInView` then
                        never fires, leaving it collapsed forever. Growing the
                        width keeps the element measurable throughout.
                      */
                      initial={reduce ? "shown" : "hidden"}
                      whileInView="shown"
                      viewport={{ once: true, amount: "some" }}
                      variants={{
                        hidden: { width: "0%" },
                        shown: {
                          width: `${row.value}%`,
                          transition: {
                            duration: 0.7,
                            delay: 0.8 + index * 0.08,
                            ease: easeOut,
                          },
                        },
                      }}
                    />
                  </span>

                  <span className="w-8 shrink-0 text-right text-[0.625rem] text-[#c9d1d3]">
                    {row.value}%
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
