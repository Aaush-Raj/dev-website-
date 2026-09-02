"use client";

import { motion, useReducedMotion } from "motion/react";

import { campus } from "@/content/campus";
import { cn } from "@/lib/utils";

import { ArrowCircleIcon, panelIcons } from "./CampusIcons";

/**
 * LURNYCAMPUS HERO PANELS
 * ---------------------------------------------------------------------------
 * The three cards floating over the photograph: the readiness dial, the next
 * best action, and the current project.
 *
 * Built in markup rather than shipped as the supplied PNGs. The panels carry
 * real type at small sizes — a 68% dial, four metric labels, a mentor name —
 * and flattening that into an image would soften it on every display and put
 * the section's actual content out of reach of selection and screen readers.
 *
 * LAYOUT
 * The design overlaps the lower two cards slightly under the one above, and
 * insets them from the right edge in a staircase. That is a deliberate
 * arrangement, not a stack, so the offsets are explicit per card rather than
 * emerging from a gap. Below lg the overlap has nowhere to go, so the cards
 * fall into an ordinary column.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { panels } = campus.hero;

/* -------------------------------------------------------------------------- */
/* The dial                                                                   */
/* -------------------------------------------------------------------------- */

/*
  Geometry for the readiness ring. Drawn on a 120-box with r=52 at stroke 11,
  matching the design's proportions. The arc is a stroke-dasharray trick: the
  track is one full circumference, and the value arc is drawn as a dash of
  `value * circumference` followed by a gap large enough to never repeat.
*/
const DIAL_R = 52;
const DIAL_C = 2 * Math.PI * DIAL_R;

function ReadinessDial({ value }: { value: number }) {
  const reduce = useReducedMotion();
  const filled = (value / 100) * DIAL_C;

  return (
    <div className="relative shrink-0">
      <svg
        viewBox="0 0 120 120"
        className="size-27 sm:size-30"
        aria-hidden="true"
      >
        {/* The unfilled track. */}
        <circle
          cx="60"
          cy="60"
          r={DIAL_R}
          fill="none"
          stroke="#e3e1dd"
          strokeWidth="11"
        />

        {/* The value arc. Rotated -90° so it starts at twelve o'clock. */}
        <motion.circle
          cx="60"
          cy="60"
          r={DIAL_R}
          fill="none"
          stroke="#0d4d4d"
          strokeWidth="11"
          strokeLinecap="round"
          transform="rotate(-90 60 60)"
          strokeDasharray={`${filled} ${DIAL_C}`}
          initial={reduce ? "shown" : "hidden"}
          whileInView="shown"
          viewport={{ once: true, amount: "some" }}
          variants={{
            hidden: { strokeDashoffset: filled },
            shown: {
              strokeDashoffset: 0,
              transition: { duration: 1.5, delay: 0.5, ease: easeOut },
            },
          }}
        />
      </svg>

      {/* The percentage, centred in the ring. */}
      <span
        className={cn(
          "absolute inset-0 grid place-items-center",
          "font-display text-[1.6rem] font-bold tracking-[-0.02em]",
          "text-[#0f2b33] sm:text-[1.75rem]",
        )}
      >
        {value}%
      </span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* The cards                                                                  */
/* -------------------------------------------------------------------------- */

/** Shared card chrome: the near-white ground, hairline and lift. */
const card = cn(
  "rounded-2xl bg-[#faf9f7]",
  "shadow-[0_24px_60px_-20px_rgb(4_18_22/0.55)]",
  "ring-1 ring-black/5",
);

export function CampusPanels() {
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduce ? "shown" : "hidden",
    whileInView: "shown",
    viewport: { once: true, amount: "some" } as const,
    variants: {
      hidden: { opacity: 0, y: 22 },
      shown: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.65, delay, ease: easeOut },
      },
    },
  });

  return (
    <div className="relative">
      {/* ====================== Industry Readiness ===================== */}
      <motion.div {...rise(0.3)} className={cn(card, "p-6 sm:p-7")}>
        <h2 className="font-display text-[1.0625rem] font-bold text-[#0f2b33]">
          {panels.readiness.title}
        </h2>

        <div className="mt-5 flex items-center gap-6">
          <ReadinessDial value={panels.readiness.value} />

          {/* ------------------------ Metrics ------------------------ */}
          <ul className="min-w-0 flex-1 space-y-3.5">
            {panels.readiness.metrics.map((metric, index) => {
              const Icon = panelIcons[metric.icon];

              return (
                <li key={metric.label} className="flex items-center gap-3">
                  <span
                    className={cn(
                      "grid size-8 shrink-0 place-items-center rounded-[0.5rem]",
                      "bg-[#eceae6] text-[#0f2b33]",
                    )}
                  >
                    <Icon className="size-4" />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[0.8125rem] font-medium text-[#0f2b33]">
                      {metric.label}
                    </span>

                    {/* The progress track. */}
                    <span className="mt-1.5 block h-1.5 w-full overflow-hidden rounded-full bg-[#e3e1dd]">
                      <motion.span
                        className="block h-full rounded-full bg-[#0d4d4d]"
                        initial={reduce ? "shown" : "hidden"}
                        whileInView="shown"
                        viewport={{ once: true, amount: "some" }}
                        variants={{
                          hidden: { scaleX: 0 },
                          shown: {
                            scaleX: metric.fill,
                            transition: {
                              duration: 0.9,
                              delay: 0.65 + index * 0.1,
                              ease: easeOut,
                            },
                          },
                        }}
                        // Scaled rather than animated on width: transforms are
                        // composited, so the four bars animate without
                        // relayout. The origin keeps them growing rightward.
                        style={{ transformOrigin: "left", scaleX: metric.fill }}
                      />
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </motion.div>

      {/* ======================= Next Best Action ====================== */}
      <motion.div
        {...rise(0.42)}
        className={cn(
          card,
          "mt-4 p-5",
          // The staircase: each lower card is inset from the right and pulled
          // left, so the three read as a cascade rather than a stack.
          "lg:mt-5 lg:ml-10",
        )}
      >
        <p className="text-[0.6875rem] font-bold tracking-[0.12em] text-[#5c6b70] uppercase">
          {panels.nextAction.eyebrow}
        </p>

        <p className="mt-2 text-[0.9375rem] font-medium text-[#0f2b33]">
          {panels.nextAction.title}
        </p>

        <div className="mt-3 flex items-center justify-between gap-4">
          <span className="text-[0.875rem] font-semibold text-[#e04a2f]">
            {panels.nextAction.action}
          </span>

          <ArrowCircleIcon className="size-6 shrink-0 text-[#e04a2f]" />
        </div>
      </motion.div>

      {/* =========================== Project =========================== */}
      <motion.div
        {...rise(0.54)}
        className={cn(card, "mt-4 p-5", "lg:mt-5 lg:ml-10")}
      >
        <p className="text-[0.6875rem] font-bold tracking-[0.12em] text-[#5c6b70] uppercase">
          {panels.project.eyebrow}
        </p>

        <p className="mt-2 text-[0.9375rem] font-semibold text-[#0f2b33]">
          {panels.project.title}
        </p>

        <p className="mt-1 text-[0.8125rem] text-[#5c6b70]">
          {panels.project.meta}
        </p>

        {/* The mentor, below a hairline. */}
        <div className="mt-4 flex items-center gap-3 border-t border-black/8 pt-4">
          <span
            className={cn(
              "grid size-8 shrink-0 place-items-center rounded-full",
              "bg-[#d9cfc4] text-[0.6875rem] font-bold text-[#0f2b33]",
            )}
            aria-hidden="true"
          >
            {panels.project.mentor.initials}
          </span>

          <span className="truncate text-[0.8125rem] font-medium text-[#0f2b33]">
            {panels.project.mentor.name}
          </span>
        </div>
      </motion.div>
    </div>
  );
}
