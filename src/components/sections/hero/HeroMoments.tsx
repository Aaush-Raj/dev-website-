"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { heroMoments } from "@/content/hero";
import { cn } from "@/lib/utils";

/**
 * HERO — MOMENTS THAT MATTER (slide 2's visual)
 * ---------------------------------------------------------------------------
 * The office photograph with three panels — Learn, Apply, Improve — threaded
 * by a connector arc.
 *
 * ONLY THE PHOTOGRAPH IS A RASTER
 * The pack ships the three panels as PNG crops and the whole thing as one
 * flattened composite; both are deliberately unused, since their copy would be
 * baked in as pixels. The background is supplied reconstructed WITHOUT the
 * panels or the connector, which is what makes rebuilding them possible. Only
 * the two small in-panel graphics ship as images, being pictorial.
 *
 * THE CONNECTOR
 * A single arc threading the three panels, drawn because the clean plate has
 * none. It draws along its length after the panels land, which is the moment
 * the composition resolves — the same beat the dashboard slide uses.
 *
 * THE PANELS SCALE AS ONE OBJECT
 * Positioned in percentages of the scene and sized in `em` off a `cqw` root,
 * so the arrangement holds at every width. Below lg they leave the photograph
 * and stack beneath it — at phone width three overlapping panels would cover
 * the subject and each other.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

/**
 * Where each panel sits over the scene, and when it arrives. Measured from the
 * design reference.
 */
const SLOTS = {
  learn: { slot: "left-[4%] top-[6%] w-[26%]", delay: 0.45 },
  apply: { slot: "left-[66%] top-[28%] w-[30%]", delay: 0.65 },
  improve: { slot: "left-[1%] top-[56%] w-[40%]", delay: 0.85 },
} as const;

export function HeroMoments({
  className,
  active = true,
}: {
  className?: string;
  /** Whether the owning slide is showing. Off-screen slides do not animate. */
  active?: boolean;
}) {
  const reduce = useReducedMotion();
  const still = reduce || !active;

  /** Shared arrival for the three panels. */
  const arrive = (delay: number) => ({
    initial: still
      ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
      : { opacity: 0, y: 22, scale: 0.95, filter: "blur(8px)" },
    animate: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
    transition: { duration: still ? 0 : 0.85, delay: still ? 0 : delay, ease: easeOut },
  });

  return (
    <div className={cn("@container relative", className)}>
      {/* ============================== Scene ======================== */}
      {/* The photograph is NOT rendered here: it is the whole section's
          background, drawn by Hero from the slide's `backdrop`. This box only
          holds the panels, and keeps the scene's aspect so their percentage
          positions still land where the design puts them. */}
      <div className="relative aspect-[1.45] lg:aspect-[1.14]">


        {/* ------------------------- Connector ------------------- */}
        {/* Threads the three panels. A viewBox matching the scene's own ratio
            so it scales uniformly — stretching one renders the animated
            stroke as broken dashes. */}
        <svg
          viewBox="0 0 114 100"
          fill="none"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden size-full lg:block"
        >
          <motion.path
            d="M 34 16 C 62 8, 88 18, 96 38 C 102 56, 66 70, 44 66"
            stroke="var(--brand-400)"
            strokeWidth="0.55"
            strokeLinecap="round"
            opacity="0.85"
            initial={{ pathLength: still ? 1 : 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: still ? 0 : 1.4,
              delay: still ? 0 : 0.55,
              ease: easeOut,
            }}
          />

          {/* The nodes the line runs between. */}
          {[
            [34, 16],
            [96, 38],
            [44, 66],
          ].map(([x, y], index) => (
            <motion.circle
              key={`${x}-${y}`}
              cx={x}
              cy={y}
              r="1.2"
              fill="var(--brand-400)"
              initial={{ opacity: still ? 1 : 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: still ? 0 : 0.35,
                delay: still ? 0 : 0.9 + index * 0.18,
              }}
            />
          ))}
        </svg>

        {/* ------------------------- Panels ---------------------- */}
        {/* Over the photograph from lg up; below that they stack beneath it. */}
        <div
          className="pointer-events-none absolute inset-0 hidden lg:block"
          // Scales the panels with the scene, so they hold their designed
          // proportion at every width.
          style={{ fontSize: "max(10px, 1.45cqw)" }}
        >
          <motion.div {...arrive(SLOTS.learn.delay)} className={cn("absolute", SLOTS.learn.slot)}>
            <LearnPanel />
          </motion.div>

          <motion.div {...arrive(SLOTS.apply.delay)} className={cn("absolute", SLOTS.apply.slot)}>
            <ApplyPanel />
          </motion.div>

          <motion.div {...arrive(SLOTS.improve.delay)} className={cn("absolute", SLOTS.improve.slot)}>
            <ImprovePanel />
          </motion.div>
        </div>
      </div>

      {/* --------------------- Panels, stacked ------------------- */}
      <div className="mt-4 grid gap-3 text-[12px] sm:grid-cols-3 sm:items-start lg:hidden">
        <LearnPanel />
        <ApplyPanel />
        <ImprovePanel />
      </div>
    </div>
  );
}

/* ========================================================================== */
/*  Panel chrome                                                              */
/* ========================================================================== */

function Panel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[1.1em] bg-white/97 p-[1em] backdrop-blur-sm",
        "shadow-[0_20px_46px_-18px_rgb(25_20_60/0.35)]",
        "ring-1 ring-white/70",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** The small caps chip at the head of each panel. */
function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full bg-brand-100 px-[0.85em] py-[0.3em]",
        "text-[0.72em] font-bold tracking-[0.1em] text-brand-700 uppercase",
      )}
    >
      {children}
    </span>
  );
}

/* ========================================================================== */
/*  The three panels                                                          */
/* ========================================================================== */

/** Learn — a lesson with its progress. */
function LearnPanel() {
  const { learn } = heroMoments;

  return (
    <Panel>
      <Badge>{learn.badge}</Badge>

      <span className="relative mt-[0.8em] block overflow-hidden rounded-[0.6em]">
        <Image
          src={learn.thumb.src}
          alt={learn.thumb.alt}
          width={learn.thumb.width}
          height={learn.thumb.height}
          sizes="260px"
          className="h-[4.6em] w-full object-cover"
        />

        {/* The play mark over the still. */}
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex size-[2.2em] items-center justify-center rounded-full bg-white/95 shadow-sm">
            <PlayIcon className="size-[0.95em] text-brand-600" />
          </span>
        </span>
      </span>

      <p className="mt-[0.7em] text-[1em] leading-snug font-bold text-neutral-900">
        {learn.title}
      </p>
      <p className="mt-[0.3em] text-[0.85em] text-neutral-500">{learn.meta}</p>

      {/* The progress bar. `role="img"` with a label, so the reading is
          announced rather than the bar being silent decoration. */}
      <span
        role="img"
        aria-label={`${learn.progress}% complete`}
        className="mt-[0.7em] block h-[0.42em] overflow-hidden rounded-full bg-neutral-200"
      >
        <span
          className="block h-full rounded-full bg-brand-600"
          style={{ width: `${learn.progress}%` }}
        />
      </span>
    </Panel>
  );
}

/** Apply — the seller's question and the assistant's answer. */
function ApplyPanel() {
  const { apply } = heroMoments;

  return (
    <Panel>
      <span className="flex items-start justify-between gap-[1em]">
        <Badge>{apply.badge}</Badge>
        <span aria-hidden="true" className="mt-[0.5em] flex shrink-0 gap-[0.25em]">
          {[0, 1, 2].map((dot) => (
            <span key={dot} className="block size-[0.28em] rounded-full bg-neutral-400" />
          ))}
        </span>
      </span>

      <span className="mt-[0.9em] flex items-start gap-[0.7em]">
        <span className="grid size-[2.2em] shrink-0 place-items-center rounded-full bg-neutral-200">
          <PersonIcon className="size-[1.2em] text-neutral-500" />
        </span>
        <span className="rounded-[0.7em] bg-neutral-100 px-[0.85em] py-[0.6em] text-[0.92em] leading-snug text-neutral-800">
          {apply.question}
        </span>
      </span>

      <span className="mt-[0.7em] flex items-start gap-[0.7em]">
        <span className="grid size-[2.2em] shrink-0 place-items-center rounded-full bg-brand-100">
          <SparkIcon className="size-[1.2em] text-brand-600" />
        </span>
        <span className="rounded-[0.7em] bg-brand-50 px-[0.85em] py-[0.6em] text-[0.92em] leading-snug text-neutral-800">
          {apply.answer}
        </span>
      </span>
    </Panel>
  );
}

/** Improve — the next coaching focus. */
function ImprovePanel() {
  const { improve } = heroMoments;

  return (
    <Panel>
      <Badge>{improve.badge}</Badge>

      <span className="mt-[0.8em] flex items-start justify-between gap-[1em]">
        <span className="min-w-0">
          <span className="block text-[1.05em] leading-snug font-bold text-neutral-900">
            {improve.title}
          </span>
          <span className="mt-[0.2em] block text-[0.85em] text-neutral-500">
            {improve.meta}
          </span>
        </span>

        <Image
          src={improve.chart.src}
          alt={improve.chart.alt}
          width={improve.chart.width}
          height={improve.chart.height}
          sizes="110px"
          className="w-[3.6em] shrink-0"
        />
      </span>

      <span
        className={cn(
          "mt-[0.8em] flex items-center gap-[0.7em] rounded-[0.6em]",
          "bg-neutral-100 px-[0.85em] py-[0.7em]",
        )}
      >
        <TargetIcon className="size-[1.2em] shrink-0 text-brand-600" />
        <span className="min-w-0 flex-1 truncate text-[0.9em] text-neutral-800">
          {improve.action}
        </span>
        <ChevronIcon className="size-[0.85em] shrink-0 text-neutral-400" />
      </span>

      <span className="mt-[0.7em] flex items-center gap-[0.4em] text-[0.9em] font-semibold text-brand-700">
        {improve.link}
        <ArrowIcon className="size-[0.9em]" />
      </span>
    </Panel>
  );
}

/* ========================================================================== */
/*  Icons                                                                     */
/* ========================================================================== */

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path d="M5.5 3.4 12 8l-6.5 4.6V3.4Z" fill="currentColor" />
    </svg>
  );
}

function PersonIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <circle cx="8" cy="5.4" r="2.6" fill="currentColor" />
      <path d="M2.8 13.8c0-2.7 2.3-4.3 5.2-4.3s5.2 1.6 5.2 4.3" fill="currentColor" />
    </svg>
  );
}

function SparkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path
        d="M8 1.4 9.4 5.9 14 7.3 9.4 8.7 8 13.2 6.6 8.7 2 7.3l4.6-1.4L8 1.4Z"
        fill="currentColor"
      />
    </svg>
  );
}

function TargetIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <circle cx="8" cy="8" r="6.2" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="8" cy="8" r="1" fill="currentColor" />
    </svg>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path
        d="m6 3.5 5 4.5-5 4.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path
        d="M3 8h9m0 0-3.4-3.4M12 8l-3.4 3.4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
