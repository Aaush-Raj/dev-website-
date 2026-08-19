"use client";

import { motion, useReducedMotion } from "motion/react";

import {
  ChevronRightIcon,
  actionIcons,
  dimensionIcons,
  engineIcons,
  statusIcons,
} from "@/components/sections/model/ModelIcons";
import { model } from "@/content/model";
import { cn } from "@/lib/utils";

/**
 * MODEL CARDS
 * ---------------------------------------------------------------------------
 * The individual cards in the capability-model diagram: the central role card
 * and the four engine cards that surround it.
 *
 * These are marketing illustrations of the product, not live UI, so the whole
 * diagram is aria-hidden at the section level and the surrounding copy carries
 * the meaning.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

/**
 * Shared card surface, including its hover response.
 *
 * TIMING — why these particular values:
 *
 *  - The transition names `translate`, not `transform`. Tailwind v4 compiles
 *    `-translate-y-*` to the standalone `translate` property, so a list
 *    containing `transform` leaves the lift untransitioned and it snaps.
 *
 *  - Enter and exit are deliberately different. The card settles in 520ms on
 *    a decelerating curve, and returns in 380ms. Matching them makes a hover
 *    feel mechanical; letting the exit run slightly quicker is what reads as
 *    the surface relaxing rather than being dragged back.
 *
 *  - The curve is the `--ease-out` token (0.16, 1, 0.3, 1), the same one the
 *    section's entrance animations use, rather than Tailwind's default
 *    `ease-out`. A shared curve is most of what makes separate interactions
 *    feel like one piece of design.
 *
 * The movement itself stays small — 3px. Five cards are visible at once in a
 * dense diagram, and a larger lift makes the layout feel unstable as the
 * pointer crosses it. The border warming to brand violet does the signalling;
 * the lift only supplies depth.
 *
 * `group` lets the interior pieces respond too — see the CTA and icon tiles.
 */
const cardShell = cn(
  "group rounded-2xl border border-neutral-200/70 bg-white",
  "shadow-[0_10px_30px_-14px_rgb(17_19_35/0.12)]",
  // Exit: slightly quicker than the enter, on the shared token curve.
  "transition-[translate,box-shadow,border-color] duration-[380ms] ease-out",
  "will-change-[translate]",
  // Enter.
  "hover:-translate-y-[3px] hover:border-brand-200/90",
  "hover:shadow-[0_18px_40px_-16px_rgb(91_50_183/0.26)]",
  "hover:duration-[520ms]",
);

const panelShell = cn(
  "rounded-xl border border-neutral-200/70 p-3",
  "transition-colors duration-[380ms] ease-out",
  "group-hover:border-neutral-200 group-hover:duration-[520ms]",
);

const ctaButton = cn(
  "mt-3 w-full rounded-lg bg-brand-50 py-2 text-center",
  "text-[0.75rem] font-semibold text-brand-700",
  // Deepens with the card, so the card's primary affordance reads as the
  // thing you would click if this were live UI.
  "transition-colors duration-[380ms] ease-out",
  "group-hover:bg-brand-100/80 group-hover:duration-[520ms]",
);

/* ========================================================================== */
/* Central role card                                                          */
/* ========================================================================== */

export function RoleCard({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const { role } = model;

  return (
    <div className={cn(cardShell, "p-3.5 sm:p-4", className)}>
      <h3 className="text-center text-base font-semibold tracking-[-0.01em] text-neutral-900 sm:text-lg">
        {role.title}
      </h3>

      {/* Amber-outlined chip, per the design. */}
      <p className="mt-2.5 flex justify-center">
        <span
          className={cn(
            "rounded-md border border-accent-300 px-2 py-1",
            "font-mono text-[0.5625rem] font-medium tracking-[0.1em] uppercase",
            "text-neutral-800",
          )}
        >
          {role.chip}
        </span>
      </p>

      {/* Dimension rows */}
      <div className="mt-3 overflow-hidden rounded-xl border border-neutral-200/70">
        {role.dimensions.map((dimension, index) => {
          const Icon = dimensionIcons[dimension.icon];

          return (
            <div
              key={dimension.label}
              className={cn(
                "flex items-start gap-2.5 p-2.5",
                index > 0 && "border-t border-neutral-200/70",
              )}
            >
              <span
                className={cn(
                  "grid size-7 shrink-0 place-items-center rounded-lg",
                  "bg-brand-50 text-brand-600",
                  "transition-colors duration-[380ms] ease-out",
                  "group-hover:bg-brand-100/80 group-hover:duration-[520ms]",
                )}
              >
                <Icon className="size-4" />
              </span>

              <div className="min-w-0 flex-1">
                <p className="font-mono text-[0.625rem] font-bold tracking-[0.09em] text-neutral-900 uppercase">
                  {dimension.label}
                </p>
                <p className="mt-0.5 text-[0.625rem] leading-snug text-neutral-500">
                  {dimension.description}
                </p>
              </div>

              {/* Five pips, filled to the dimension's level. Aligned to the
                  label row rather than centred, matching the design. */}
              <span className="mt-0.5 flex shrink-0 gap-1">
                {Array.from({ length: 5 }, (_, pip) => (
                  <motion.span
                    key={pip}
                    className={cn(
                      "block h-2 w-3 rounded-[2px]",
                      pip < dimension.level ? "bg-brand-600" : "bg-brand-100",
                    )}
                    initial={{
                      opacity: reduce ? 1 : 0,
                      scaleX: reduce ? 1 : 0.2,
                    }}
                    whileInView={{ opacity: 1, scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: reduce ? 0 : 0.35,
                      delay: reduce ? 0 : 0.3 + index * 0.12 + pip * 0.05,
                      ease: easeOut,
                    }}
                  />
                ))}
              </span>
            </div>
          );
        })}
      </div>

      {/* Readiness score */}
      <div
        className={cn(
          "mt-3 flex items-center justify-between gap-3 rounded-xl",
          "border border-neutral-200/70 px-3 py-2.5",
          "transition-colors duration-[380ms] ease-out",
          "group-hover:border-brand-200/80 group-hover:duration-[520ms]",
        )}
      >
        <p className="font-mono text-[0.625rem] font-bold tracking-[0.09em] text-neutral-900 uppercase">
          {role.score.label}
        </p>
        <p className="flex items-baseline gap-1">
          <span className="text-xl font-bold text-accent-400">
            {role.score.value}
          </span>
          <span className="text-[0.625rem] text-neutral-400">
            / {role.score.outOf}
          </span>
        </p>
      </div>
    </div>
  );
}

/* ========================================================================== */
/* Engine card                                                                */
/* ========================================================================== */

type Engine = (typeof model.engines)[number];

/** Lesson thumbnail tints, matching the design's coloured tiles. */
const lessonTone = {
  plum: "bg-[#4a2340]",
  blue: "bg-[#3d6fd4]",
  ink: "bg-[#161b26]",
} as const;

/** Status icon colours for LurnyPitch. */
const statusTone = {
  document: "bg-neutral-100 text-neutral-500",
  approved: "bg-[#e7f5ea] text-[#3f9e63]",
  pending: "bg-accent-50 text-accent-500",
} as const;

/** Priority colours for LurnySense. */
const priorityTone = {
  high: "text-[#dc5b45]",
  medium: "text-accent-600",
} as const;

export function EngineCard({
  engine,
  className,
}: {
  engine: Engine;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const Icon = engineIcons[engine.icon];

  return (
    <div className={cn(cardShell, "p-3.5", className)}>
      {/* Header */}
      <div className="flex items-center gap-2.5">
        <span
          className={cn(
            "shrink-0 text-brand-600",
            "transition-[translate,color] duration-[380ms] ease-out",
            "group-hover:-translate-y-px group-hover:text-brand-700",
            "group-hover:duration-[520ms]",
          )}
        >
          <Icon className="size-5" />
        </span>
        <h3 className="text-[0.875rem] font-semibold text-neutral-900">
          {engine.name}
        </h3>
      </div>
      <p className="mt-0.5 pl-[1.875rem] text-[0.6875rem] text-neutral-500">
        {engine.tagline}
      </p>

      {/* Panel */}
      <div className={cn(panelShell, "mt-3")}>
        <p className="text-[0.6875rem] font-semibold text-neutral-800">
          {engine.panelLabel}
        </p>

        {/* ------------------------------------------------ bars (Pulse) */}
        {engine.kind === "bars" && (
          <div className="mt-2.5 flex flex-col gap-2.5">
            {engine.bars.map((bar, index) => (
              <div key={bar.label}>
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-[0.625rem] text-neutral-700">
                    {bar.label}
                  </p>
                  <p className="text-[0.625rem] font-medium text-neutral-500">
                    {bar.value}%
                  </p>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-neutral-100">
                  <motion.div
                    className="h-full rounded-full bg-brand-600"
                    initial={{ width: reduce ? `${bar.value}%` : 0 }}
                    whileInView={{ width: `${bar.value}%` }}
                    viewport={{ once: true }}
                    transition={{
                      duration: reduce ? 0 : 0.9,
                      delay: reduce ? 0 : 0.25 + index * 0.12,
                      ease: easeOut,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* -------------------------------------------- lessons (Magic) */}
        {engine.kind === "lessons" && (
          <ul className="mt-2.5 flex flex-col gap-2">
            {engine.lessons.map((lesson) => (
              <li key={lesson.title} className="flex items-center gap-2">
                {/* Thumbnail stand-in — a tinted tile, as in the design. */}
                <span
                  className={cn(
                    "size-7 shrink-0 rounded-md",
                    lessonTone[lesson.tone],
                  )}
                />
                <div className="min-w-0">
                  <p className="text-[0.6875rem] leading-snug font-medium text-neutral-800">
                    {lesson.title}
                  </p>
                  <p className="mt-0.5 text-[0.5625rem] text-neutral-500">
                    {lesson.meta}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* ---------------------------------------- submissions (Pitch) */}
        {engine.kind === "submissions" && (
          <ul className="mt-2.5 flex flex-col gap-2">
            {engine.submissions.map((submission) => {
              const StatusIcon = statusIcons[submission.status];
              return (
                <li key={submission.title} className="flex items-center gap-2">
                  <span
                    className={cn(
                      "grid size-7 shrink-0 place-items-center rounded-md",
                      statusTone[submission.status],
                    )}
                  >
                    <StatusIcon className="size-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[0.6875rem] leading-snug font-medium text-neutral-800">
                      {submission.title}
                    </p>
                    <p className="mt-0.5 text-[0.5625rem] text-neutral-500">
                      {submission.meta}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {/* --------------------------------------------- actions (Sense) */}
        {engine.kind === "actions" && (
          <ul className="mt-2.5 flex flex-col gap-2">
            {engine.actions.map((action) => {
              const ActionIcon = actionIcons[action.icon];
              return (
                <li key={action.title} className="flex items-center gap-2">
                  <span
                    className={cn(
                      "grid size-7 shrink-0 place-items-center rounded-md",
                      action.tone === "high"
                        ? "bg-brand-50 text-brand-600"
                        : "bg-accent-50 text-accent-500",
                    )}
                  >
                    <ActionIcon className="size-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[0.6875rem] leading-snug font-medium text-neutral-800">
                      {action.title}
                    </p>
                    <p className="mt-0.5 text-[0.5625rem] text-neutral-500">
                      Priority <span className="text-neutral-400">•</span>{" "}
                      <span
                        className={cn("font-medium", priorityTone[action.tone])}
                      >
                        {action.priority}
                      </span>
                    </p>
                  </div>
                  <ChevronRightIcon className="size-3.5 shrink-0 text-neutral-300" />
                </li>
              );
            })}
          </ul>
        )}

        <p className={ctaButton}>{engine.cta}</p>
      </div>
    </div>
  );
}
