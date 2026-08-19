"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

import {
  BranchTrendLine,
  CapabilityRadar,
  CompetencyHeatmap,
  ReadinessDonut,
} from "@/components/sections/hero/DashboardCharts";
import {
  ArrowRightIcon,
  ArrowUpIcon,
  BellIcon,
  ChevronDownIcon,
  InfoIcon,
  ScanIcon,
  sidebarIcons,
} from "@/components/sections/hero/DashboardIcons";
import { dashboard } from "@/content/dashboard";
import { cn } from "@/lib/utils";

/**
 * DASHBOARD MOCKUP
 * ---------------------------------------------------------------------------
 * The product visual on the right of the hero: an application window shown in
 * perspective, with two cards floating above it.
 *
 * Built as real DOM rather than a screenshot for three reasons:
 *   - it stays sharp at every density and viewport width
 *   - text inside it scales with the user's font settings
 *   - individual pieces can animate independently, which a flat image cannot
 *
 * The perspective tilt is a CSS 3D transform on a wrapper, so the internals
 * are laid out in plain 2D and stay easy to edit.
 *
 * Entirely decorative: the whole block is aria-hidden, and the hero's heading
 * and copy carry the meaning for assistive technology.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

export function DashboardMockup({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  /** Straightens the panel to face the viewer while the pointer is over it. */
  const [isHovered, setIsHovered] = useState(false);

  /**
   * Tracks whether the entrance animation has finished. The entrance is long
   * and eased; reusing that timing for the hover response would make the
   * panel feel like it is lagging the pointer, so the two use different
   * durations.
   */
  const [hasEntered, setHasEntered] = useState(false);

  const rise = (delay: number) => ({
    initial: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 28 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reduce ? 0 : 0.7,
      delay: reduce ? 0 : delay,
      ease: easeOut,
    },
  });

  return (
    <div
      className={cn(
        "relative",
        /*
         * The mockup reads as a product screenshot, so it behaves like one:
         * text inside it cannot be selected or dragged out.
         *
         * `select-none` blocks selection, and the onCopy/onDragStart handlers
         * below stop a keyboard select-all or an image-drag from lifting the
         * markup out. This is presentation, not protection — anyone can read
         * the DOM — but it keeps the block feeling like a single image.
         *
         * It is already aria-hidden, so nothing here affects assistive tech:
         * screen readers never reach this content in the first place.
         */
        "select-none",
        className,
      )}
      aria-hidden="true"
      role="presentation"
      onCopy={(event) => event.preventDefault()}
      onCut={(event) => event.preventDefault()}
      onDragStart={(event) => event.preventDefault()}
      onContextMenu={(event) => event.preventDefault()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/*
        Below lg the panel is laid out at a fixed desktop width and scaled
        down as a unit, rather than reflowed. A dashboard reflowed to 390px
        stops looking like the product; scaled, it still reads as one.
        The wrapper below re-establishes the scaled height so surrounding
        layout does not gain a gap.
      */}
      {/* ----------------------------------------------------------------
          Decorative wireframe globe behind the panel.
          ---------------------------------------------------------------- */}
      <GlobeDecoration className="absolute top-[-8%] -right-[12%] w-[62%] max-w-[540px] text-brand-300/45" />

      {/* ----------------------------------------------------------------
          The application window.
          `perspective` on the parent + rotateY on the child produces the
          slight left-facing tilt seen in the design.
          ---------------------------------------------------------------- */}
      <div className="[perspective:2200px]">
        <motion.div
          className={cn(
            "relative overflow-hidden rounded-l-2xl bg-white",
            "shadow-[0_28px_70px_-24px_rgb(17_19_35/0.28)]",
            "origin-left [transform-style:preserve-3d]",
          )}
          initial={{
            opacity: reduce ? 1 : 0,
            rotateY: reduce ? -7 : -14,
            y: reduce ? 0 : 36,
          }}
          animate={{
            opacity: 1,
            // Straighten to face the viewer while hovered, then settle back
            // to the design's resting tilt.
            rotateY: reduce ? -7 : isHovered ? 0 : -7,
            y: 0,
            scale: !reduce && isHovered ? 1.015 : 1,
          }}
          transition={{
            // The entrance runs long and eased; the hover response has to be
            // quick or the panel feels like it is lagging the pointer.
            duration: reduce ? 0 : hasEntered ? 0.55 : 1.1,
            delay: reduce || hasEntered ? 0 : 0.15,
            ease: easeOut,
          }}
          onAnimationComplete={() => setHasEntered(true)}
        >
          <div className="flex min-h-[30rem] text-[0.6875rem] sm:min-h-[34rem]">
            {/* ------------------------------ Sidebar ------------------ */}
            <aside className="w-[8.5rem] shrink-0 border-r border-neutral-200/70 py-5 sm:w-[9.5rem]">
              {/* Hamburger mark */}
              <div className="mb-6 flex flex-col gap-[3px] pl-6">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="h-[3px] w-[18px] rounded-full bg-accent-400"
                  />
                ))}
              </div>

              <nav className="flex flex-col">
                {dashboard.sidebar.map((item, index) => {
                  const Icon = sidebarIcons[item.icon];
                  const isActive = index === 0;

                  return (
                    <span
                      key={item.label}
                      className={cn(
                        "flex items-center gap-2.5 py-[0.6rem] pr-3 pl-6",
                        isActive
                          ? "border-r-2 border-brand-600 bg-brand-50 font-semibold text-brand-600"
                          : "font-medium text-neutral-600",
                      )}
                    >
                      <Icon className="size-[15px] shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </span>
                  );
                })}
              </nav>
            </aside>

            {/* ------------------------------ Main ---------------------- */}
            <div className="flex-1 p-5 sm:p-6">
              {/* Topbar */}
              <div className="mb-5 flex items-center justify-between gap-4">
                {/* Rendered as a <p>, not a heading: this is chrome inside a
                    decorative mockup and must not enter the document outline. */}
                <p className="text-[1.05rem] font-semibold tracking-tight text-neutral-900">
                  {dashboard.title}
                </p>

                <div className="flex items-center gap-2.5">
                  {dashboard.filters.map((filter) => (
                    <span
                      key={filter}
                      className={cn(
                        "hidden items-center gap-2 rounded-lg border border-neutral-200",
                        "px-2.5 py-1.5 font-medium text-neutral-700 md:flex",
                      )}
                    >
                      {filter}
                      <ChevronDownIcon className="size-3 text-neutral-400" />
                    </span>
                  ))}
                  <BellIcon className="size-4 shrink-0 text-neutral-500" />
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-brand-600 text-[0.5625rem] font-bold text-white">
                    AV
                  </span>
                </div>
              </div>

              {/* Row 1 — donut + radar */}
              <div className="mb-3.5 grid gap-3.5 lg:grid-cols-2">
                {/* Overall readiness */}
                <motion.div
                  {...rise(0.45)}
                  className="rounded-xl border border-neutral-200/80 p-4"
                >
                  <p className="mb-3 flex items-center gap-1.5 font-medium text-neutral-700">
                    {dashboard.readiness.label}
                    <InfoIcon className="size-3 text-neutral-400" />
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="relative size-[6.5rem] shrink-0">
                      <ReadinessDonut />
                      <div className="absolute inset-0 grid place-items-center">
                        <div className="text-center leading-none">
                          <p className="text-[1.4rem] font-bold tracking-tight text-neutral-900">
                            {dashboard.readiness.value}%
                          </p>
                          <p className="mt-1 font-medium text-neutral-600">
                            {dashboard.readiness.caption}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <div>
                        <p className="whitespace-nowrap text-neutral-500">
                          {dashboard.readiness.deltaLabel}
                        </p>
                        <p className="mt-0.5 flex items-center gap-1 font-semibold text-[#3f9e63]">
                          <ArrowUpIcon className="size-3" />
                          {dashboard.readiness.delta}
                        </p>
                      </div>
                      <div>
                        <p className="text-neutral-500">
                          {dashboard.readiness.targetLabel}
                        </p>
                        <p className="mt-0.5 font-semibold text-neutral-900">
                          {dashboard.readiness.target}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Readiness by capability */}
                <motion.div
                  {...rise(0.6)}
                  className="rounded-xl border border-neutral-200/80 p-4"
                >
                  <p className="mb-1 font-medium text-neutral-700">
                    {dashboard.radar.label}
                  </p>

                  {/* The radar sits inside a padded box so the axis labels
                      around it have room without shrinking the plot itself. */}
                  <div className="relative mx-auto aspect-square w-full max-w-[13rem] px-9 py-6">
                    <CapabilityRadar />

                    {/* Axis labels, positioned around the pentagon. */}
                    <span className="absolute top-0 left-1/2 -translate-x-1/2 text-center text-[0.5rem] leading-tight text-neutral-600">
                      Customer
                      <br />
                      Engagement
                    </span>
                    <span className="absolute top-[38%] right-0 text-center text-[0.5rem] leading-tight text-neutral-600">
                      Risk
                      <br />
                      Management
                    </span>
                    <span className="absolute right-[12%] bottom-1 text-center text-[0.5rem] leading-tight text-neutral-600">
                      Operational
                      <br />
                      Excellence
                    </span>
                    <span className="absolute top-[38%] left-0 text-center text-[0.5rem] leading-tight text-neutral-600">
                      Compliance
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Row 2 — heatmap */}
              <motion.div
                {...rise(0.75)}
                className="rounded-xl border border-neutral-200/80 p-4"
              >
                <p className="mb-3 font-medium text-neutral-700">
                  {dashboard.heatmap.label}
                </p>

                <div className="flex gap-3">
                  <div className="flex w-[6.25rem] shrink-0 flex-col gap-[3px] pt-[18px]">
                    {dashboard.heatmap.rows.map((row) => (
                      <p
                        key={row.label}
                        className="h-[13px] truncate leading-[13px] text-neutral-600"
                      >
                        {row.label}
                      </p>
                    ))}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="mb-1.5 grid grid-cols-6 gap-[3px]">
                      {dashboard.heatmap.columns.map((col) => (
                        <p
                          key={col}
                          className="text-center font-semibold text-neutral-600"
                        >
                          {col}
                        </p>
                      ))}
                    </div>
                    <CompetencyHeatmap />
                  </div>
                </div>

                {/* Legend */}
                <div className="mt-3.5 flex flex-wrap items-center gap-x-4 gap-y-1.5">
                  {dashboard.heatmap.legend.map((label, i) => (
                    <span
                      key={label}
                      className="flex items-center gap-1.5 text-neutral-600"
                    >
                      <span
                        className="size-2.5 rounded-[2px]"
                        style={{
                          backgroundColor: [
                            "var(--brand-500)",
                            "var(--brand-300)",
                            "var(--brand-100)",
                            "var(--accent-400)",
                          ][i],
                        }}
                      />
                      {label}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ----------------------------------------------------------------
          Floating card 1 — branch readiness (dark)
          ---------------------------------------------------------------- */}
      <motion.div
        className={cn(
          "absolute top-[46%] -right-1 w-[44%] max-w-[15rem] rounded-2xl sm:right-0",
          "bg-[#181921] p-4 text-white",
          "shadow-[0_24px_50px_-18px_rgb(17_19_35/0.55)]",
        )}
        initial={{
          opacity: reduce ? 1 : 0,
          y: reduce ? 0 : 30,
          scale: reduce ? 1 : 0.94,
        }}
        animate={{
          opacity: 1,
          // Lift with the panel on hover so the group reads as one object.
          y: !reduce && isHovered ? -6 : 0,
          scale: 1,
        }}
        transition={{
          duration: reduce ? 0 : hasEntered ? 0.45 : 0.75,
          delay: reduce || hasEntered ? 0 : 0.85,
          ease: easeOut,
        }}
      >
        <p className="text-[0.8rem] font-semibold text-accent-400">
          {dashboard.branchCard.title}
        </p>
        <p className="mt-1.5 text-[1.75rem] leading-none font-bold tracking-tight">
          {dashboard.branchCard.value}
        </p>
        <div className="mt-2 space-y-0.5 text-[0.75rem] text-neutral-300">
          {dashboard.branchCard.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        {/* Trend chart with y-axis labels */}
        <div className="mt-3.5 flex gap-2">
          <div className="flex flex-col justify-between py-px text-[0.5rem] text-neutral-500">
            {dashboard.branchCard.chart.yLabels.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
          <div className="relative h-14 flex-1">
            {/* Gridlines */}
            <div className="absolute inset-0 flex flex-col justify-between">
              {dashboard.branchCard.chart.yLabels.map((label) => (
                <span key={label} className="h-px w-full bg-white/8" />
              ))}
            </div>
            <BranchTrendLine className="relative" />
          </div>
        </div>

        <div className="mt-1.5 flex justify-between pl-7 text-[0.5rem] text-neutral-400">
          {dashboard.branchCard.chart.labels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
      </motion.div>

      {/* ----------------------------------------------------------------
          Floating card 2 — recommended action (light)
          ---------------------------------------------------------------- */}
      <motion.div
        className={cn(
          "absolute right-[6%] -bottom-[6%] w-[50%] max-w-[17rem] rounded-2xl",
          "bg-white p-4",
          "shadow-[0_24px_50px_-18px_rgb(17_19_35/0.3)]",
        )}
        initial={{
          opacity: reduce ? 1 : 0,
          y: reduce ? 0 : 30,
          scale: reduce ? 1 : 0.94,
        }}
        animate={{
          opacity: 1,
          // Lift with the panel on hover so the group reads as one object.
          y: !reduce && isHovered ? -6 : 0,
          scale: 1,
        }}
        transition={{
          duration: reduce ? 0 : hasEntered ? 0.45 : 0.75,
          delay: reduce || hasEntered ? 0 : 1.0,
          ease: easeOut,
        }}
      >
        <div className="flex items-start gap-2.5">
          <span className="mt-px grid size-7 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600">
            <ScanIcon className="size-4" />
          </span>
          <div className="min-w-0">
            <p className="text-[0.7rem] text-neutral-500">
              {dashboard.actionCard.label}
            </p>
            <p className="mt-1 text-[0.8125rem] leading-snug font-semibold text-neutral-900">
              {dashboard.actionCard.title}
            </p>
            <p className="mt-0.5 text-[0.7rem] text-neutral-500">
              {dashboard.actionCard.detail}
            </p>
            <span className="mt-2 flex items-center gap-1.5 text-[0.75rem] font-semibold text-brand-600">
              {dashboard.actionCard.link}
              <ArrowRightIcon className="size-3" />
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ========================================================================== */
/* Decorative wireframe globe                                                 */
/* ========================================================================== */

function GlobeDecoration({ className }: { className?: string }) {
  // Longitude ellipses at varying x-radius fake a rotating sphere cheaply —
  // far lighter than a real 3D render for a purely decorative element.
  const longitudes = [10, 24, 38, 50];
  const latitudes = [
    { cy: 32, rx: 47, ry: 12 },
    { cy: 50, rx: 50, ry: 14 },
    { cy: 68, rx: 47, ry: 12 },
  ];

  return (
    <svg
      viewBox="0 0 100 100"
      className={cn("aspect-square", className)}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.4"
    >
      <circle cx="50" cy="50" r="50" />
      {longitudes.map((rx) => (
        <ellipse key={rx} cx="50" cy="50" rx={rx} ry="50" />
      ))}
      {latitudes.map((lat) => (
        <ellipse key={lat.cy} cx="50" cy={lat.cy} rx={lat.rx} ry={lat.ry} />
      ))}
      {/* Node dots along the sphere */}
      {[
        [50, 0],
        [96, 32],
        [88, 68],
        [50, 100],
        [12, 68],
        [4, 32],
      ].map(([cx, cy]) => (
        <circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          r="1.4"
          fill="currentColor"
          stroke="none"
        />
      ))}
    </svg>
  );
}
