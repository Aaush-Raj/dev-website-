"use client";

import { motion, useReducedMotion } from "motion/react";

import { Uncopyable } from "@/components/ui/Uncopyable";
import { saathi } from "@/content/saathi";
import { cn } from "@/lib/utils";

import { journeyIcons, TrendIcon } from "./SaathiIcons";

/**
 * SAATHI JOURNEY PANEL
 * ---------------------------------------------------------------------------
 * The product illustration in the "loop in action" section: Ananya's record,
 * the five steps of her improvement journey down a timeline, and a progress
 * summary closing the panel.
 *
 * DRAWN, NOT SHIPPED
 * Rebuilt in markup so it stays sharp at every density, animates in step by
 * step, and reads its copy from content/saathi.ts.
 *
 * Wrapped in <Uncopyable>: this is a picture of the product, so its text is
 * not selectable and its buttons are drawn spans rather than real controls —
 * nothing here is focusable, because none of it does anything.
 *
 * THE SEQUENCE
 * Same approach as the capability loop before it: one shared time base, and
 * each step lands on its own beat rather than everything arriving together.
 * The timeline rail grows downward as the steps land, and the gap bars sweep
 * out once their step is in place.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { panel } = saathi.story;

/** The shared beat — see the note above. */
const HEAD_AT = 0.1; // the employee record
const FIRST_STEP_AT = 0.4; // step 01
const STEP = 0.42; // between one step and the next

const stepAt = (i: number) => FIRST_STEP_AT + i * STEP;

/** The rail finishes as the last step lands; the footer follows it. */
const RAIL_DURATION = (panel.steps.length - 1) * STEP + 0.5;
const FOOTER_AT = stepAt(panel.steps.length - 1) + 0.35;

/** The two bar tones on step 01. */
const barTone = {
  coral: "bg-[#f1574a]",
  indigo: "bg-[#646da8]",
} as const;

/** The two button tones — coral for "do this now", near-black for "next". */
const actionTone = {
  coral: "bg-[#f1574a] text-white",
  dark: "bg-[#161a20] text-white",
} as const;

export function SaathiJourneyPanel({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  /** Fade-and-rise on a given beat. */
  const at = (delay: number) => ({
    initial: reduce ? "shown" : "hidden",
    whileInView: "shown",
    viewport: { once: true, amount: 0.15 } as const,
    variants: {
      hidden: { opacity: 0, y: 14 },
      shown: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, delay, ease: easeOut },
      },
    },
  });

  return (
    <Uncopyable
      className={cn(
        "rounded-3xl border border-neutral-200/80 bg-white/70 p-5 sm:p-7",
        "shadow-[0_30px_70px_-40px_rgb(31_20_16/0.25)]",
        className,
      )}
    >
      <motion.p
        {...at(0)}
        className="text-lg font-semibold tracking-[-0.015em] text-neutral-900"
      >
        {panel.title}
      </motion.p>

      {/* ====================== The employee record ==================== */}
      <motion.div
        {...at(HEAD_AT)}
        className={cn(
          "mt-5 flex items-center gap-4 rounded-2xl p-4",
          "border border-neutral-200/80 bg-white",
        )}
      >
        {/* A drawn stand-in rather than a photo — this is an illustration of
            a record, not a real person's profile. */}
        <span className="grid size-14 shrink-0 place-items-center rounded-full bg-[#646da8] text-white">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className="size-7"
          >
            <circle
              cx="12"
              cy="8.6"
              r="3.4"
              stroke="currentColor"
              strokeWidth="1.7"
            />
            <path
              d="M5.6 19.2a6.4 6.4 0 0 1 12.8 0"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
          </svg>
        </span>

        <span className="min-w-0">
          <span className="block text-[1.0625rem] font-semibold text-neutral-900">
            {panel.employee.name}
          </span>
          <span className="mt-0.5 block text-[0.9375rem] text-neutral-600">
            {panel.employee.role}
          </span>
          <span className="block text-[0.9375rem] text-neutral-600">
            {panel.employee.capability}
          </span>
        </span>
      </motion.div>

      {/* =========================== The steps ========================= */}
      {/*
        `relative` anchors the timeline rail, which is absolutely positioned
        against this list rather than drawn per-item — one growing line reads
        as a single journey, five stacked segments would not.
      */}
      <ol className="relative mt-6">
        {/* The rail's track, and the coral line growing down it. Both sit in
            the gutter the list's left padding opens up.

            The rail runs between the first and last NODES, not the full height
            of the list — the last step's copy continues below its node, and a
            line running past it reads as an unfinished sixth step. `top-8` is
            the node's own offset; the bottom inset is that plus the last
            step's remaining height. */}
        <span
          aria-hidden="true"
          className="absolute top-8 bottom-26 left-1.75 hidden w-px bg-neutral-200 sm:block"
        />
        <motion.span
          aria-hidden="true"
          className="absolute top-8 bottom-26 left-1.75 hidden w-px origin-top bg-[#f1574a] sm:block"
          initial={reduce ? { scaleY: 1 } : { scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: RAIL_DURATION,
            delay: FIRST_STEP_AT,
            ease: "linear",
          }}
        />

        {panel.steps.map((step, index) => {
          const Icon = journeyIcons[step.icon];
          const isLast = index === panel.steps.length - 1;

          return (
            <motion.li
              key={step.title}
              {...at(stepAt(index))}
              className={cn(
                "relative flex items-start gap-4 py-5 sm:gap-5 sm:pl-10",
                // A rule between steps, not under the last one.
                !isLast && "border-b border-neutral-200/70",
              )}
            >
              {/* The node on the rail. */}
              <motion.span
                aria-hidden="true"
                className={cn(
                  "absolute top-8 left-0 hidden size-[15px] rounded-full sm:block",
                  "border-2 border-[#f1574a] bg-white",
                )}
                // Driven by the parent step's variants, for the same reason
                // as the bars below.
                variants={{
                  hidden: { scale: 0 },
                  shown: {
                    scale: 1,
                    transition: { duration: 0.4, delay: 0.1, ease: easeOut },
                  },
                }}
              />

              {/* The glyph disc. */}
              <span
                className={cn(
                  "grid size-12 shrink-0 place-items-center rounded-full",
                  "border border-neutral-300 text-neutral-800",
                )}
              >
                <Icon className="size-6" />
              </span>

              {/* The step's copy and, on the right, its evidence. */}
              <div
                className={cn(
                  "flex min-w-0 flex-1 flex-col gap-4",
                  // The bars and buttons sit beside the copy once there is
                  // room; below that they drop under it.
                  "lg:flex-row lg:items-center lg:justify-between lg:gap-6",
                )}
              >
                <div className="min-w-0">
                  <p className="flex flex-wrap items-baseline gap-x-3">
                    <span className="text-[0.9375rem] font-bold text-[#f1574a] tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-[0.8125rem] tracking-[0.06em] text-[#646da8] uppercase">
                      {step.engine}
                    </span>
                  </p>

                  <p className="mt-1 text-[1.0625rem] font-semibold text-pretty text-neutral-900">
                    {step.title}
                  </p>
                  <p className="mt-1 text-[0.9375rem] text-pretty text-neutral-600">
                    {step.meta}
                  </p>
                </div>

                {/* ------------------ The gap bars ------------------- */}
                {"bars" in step && step.bars ? (
                  <div className="w-full shrink-0 space-y-2.5 lg:w-64">
                    {step.bars.map((bar, barIndex) => (
                      <div key={bar.label}>
                        <p className="flex items-baseline justify-between gap-3">
                          <span className="text-[0.875rem] text-neutral-600">
                            {bar.label}
                          </span>
                          <span className="text-[0.875rem] font-medium text-neutral-900 tabular-nums">
                            {bar.percent}%
                          </span>
                        </p>
                        <span className="mt-1.5 block h-1.5 w-full overflow-hidden rounded-full bg-neutral-200">
                          {/* Sweeps out once its step has landed — the gap
                              between the two is the point of this step, so
                              showing them fill makes it legible. */}
                          {/*
                            Driven by the parent step's variants rather than
                            its own `whileInView`. A 6px-tall bar nested inside
                            an element that is itself animating never reliably
                            satisfies its own viewport threshold, so on its own
                            it sat at scaleX(0) and never swept.
                          */}
                          <motion.span
                            className={cn(
                              "block h-full origin-left rounded-full",
                              barTone[bar.tone],
                            )}
                            style={{ width: `${bar.percent}%` }}
                            variants={{
                              hidden: { scaleX: 0 },
                              shown: {
                                scaleX: 1,
                                transition: {
                                  duration: 0.8,
                                  delay: 0.25 + barIndex * 0.12,
                                  ease: easeOut,
                                },
                              },
                            }}
                          />
                        </span>
                      </div>
                    ))}
                  </div>
                ) : null}

                {/* ------------------- The buttons ------------------- */}
                {/* Drawn, not real: the panel is a picture of the product, so
                    these must not be focusable or clickable. */}
                {"action" in step && step.action ? (
                  <span
                    className={cn(
                      "inline-flex shrink-0 items-center justify-center rounded-lg",
                      "px-6 py-3 text-[0.9375rem] font-semibold",
                      actionTone[step.action.tone],
                    )}
                  >
                    {step.action.label}
                  </span>
                ) : null}
              </div>
            </motion.li>
          );
        })}
      </ol>

      {/* ========================== The footer ========================= */}
      <motion.div
        {...at(FOOTER_AT)}
        className={cn(
          "mt-5 flex flex-wrap items-center gap-x-6 gap-y-4 rounded-2xl p-4",
          "border border-neutral-200/80 bg-neutral-50/80",
        )}
      >
        <span className="flex items-center gap-4">
          <span className="grid size-12 shrink-0 place-items-center rounded-full border border-neutral-300 text-[#f1574a]">
            <TrendIcon className="size-6" />
          </span>
          <span>
            <span className="block text-[0.9375rem] text-neutral-600">
              {panel.footer.label}
            </span>
            <span className="block text-2xl font-bold text-[#f1574a]">
              {panel.footer.value}
            </span>
          </span>
        </span>

        <span
          aria-hidden="true"
          className="hidden h-10 w-px bg-neutral-200 sm:block"
        />

        <span className="text-[0.9375rem] text-pretty text-neutral-700">
          {panel.footer.note}
        </span>
      </motion.div>
    </Uncopyable>
  );
}
