"use client";

import { motion, useReducedMotion } from "motion/react";

import { Uncopyable } from "@/components/ui/Uncopyable";
import { pulse } from "@/content/pulse";
import { cn } from "@/lib/utils";

import { PulseDial } from "./PulseDial";

/**
 * PULSE WORKS MODAL
 * ---------------------------------------------------------------------------
 * The drawn product modal in section 3: a behaviour expanded on the left, the
 * competency and its behaviour dial on the right.
 *
 * DRAWN, NOT SHIPPED
 * Same reasoning as the hero dashboard — sharp at every density with nothing
 * to download, the dial animates as it enters, and the content lives in
 * content/pulse.ts. See PulseDashboard for the longer note.
 *
 * Every control in here is a DRAWING of a control: the level pills, the
 * segmented assessment picker and the primary button are spans, not buttons.
 * They are inert on purpose. Making them real controls would put them in the
 * tab order and promise behaviour the illustration cannot deliver.
 *
 * Wrapped in <Uncopyable>, so it behaves like the screenshot it imitates and
 * its text cannot be selected, dragged or copied out. It is aria-hidden in
 * full; the numbered steps below the modal carry the meaning.
 *
 * LAYOUT
 * Two panels side by side on lg. Below that the right panel would be too
 * cramped for the dial to read, so only the left panel shows — the modal is
 * atmosphere at that size, and half of it legible beats all of it squashed.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { modal } = pulse.works;
const { behaviour, competency } = modal;

/** Shared pill chrome for the drawn segmented controls. */
const pill = "rounded-full px-3 py-1.5 text-[0.6875rem] whitespace-nowrap";

export function PulseWorksModal({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduce ? "shown" : "hidden",
    whileInView: "shown",
    viewport: { once: true, amount: "some" } as const,
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
        "overflow-hidden rounded-2xl bg-[#161822]",
        "ring-1 ring-white/12",
        "shadow-[0_40px_90px_-30px_rgb(20_10_50/0.65)]",
        className,
      )}
    >
      <div className="grid lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1fr)]">
        {/* ========================= Left panel ====================== */}
        <div className="border-white/8 p-5 sm:p-6 lg:border-r">
          <motion.span
            {...rise(0.05)}
            className={cn(
              "inline-flex items-center gap-2 rounded-full",
              "bg-accent-300/12 px-3 py-1.5",
              "text-[0.6875rem] font-medium text-accent-300",
            )}
          >
            <span className="size-1.5 rounded-full bg-accent-300" />
            {behaviour.tag}
          </motion.span>

          <motion.p
            {...rise(0.1)}
            className="mt-5 text-[0.9375rem] font-semibold text-white"
          >
            {behaviour.title}
          </motion.p>

          {/* ------------------- Required depth ------------------- */}
          <motion.div {...rise(0.15)} className="mt-5">
            <div className="flex items-baseline justify-between gap-3">
              <span
                className={cn(
                  "text-[0.625rem] font-semibold tracking-[0.1em] uppercase",
                  "text-neutral-400",
                )}
              >
                {behaviour.depth.label}
              </span>
              <span className="text-[0.75rem] font-semibold text-accent-300 tabular-nums">
                {behaviour.depth.score}/{behaviour.depth.outOf}
              </span>
            </div>

            <span className="mt-2 block h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <motion.span
                initial={reduce ? "shown" : "hidden"}
                whileInView="shown"
                viewport={{ once: true, amount: "some" }}
                variants={{
                  hidden: { scaleX: 0 },
                  shown: {
                    scaleX: behaviour.depth.score / behaviour.depth.outOf,
                    transition: { duration: 0.9, delay: 0.35, ease: easeOut },
                  },
                }}
                style={{ transformOrigin: "left" }}
                className="block h-full w-full rounded-full bg-accent-300"
              />
            </span>
          </motion.div>

          {/* --------------------- What this means ---------------- */}
          <motion.div {...rise(0.2)} className="mt-5">
            <p
              className={cn(
                "text-[0.625rem] font-semibold tracking-[0.1em] uppercase",
                "text-neutral-400",
              )}
            >
              {behaviour.meaning.label}
            </p>
            <p className="mt-2 text-[0.75rem] leading-relaxed text-neutral-300">
              {behaviour.meaning.text}
            </p>
          </motion.div>

          {/* ------------------- What good looks like ------------- */}
          <motion.div {...rise(0.25)} className="mt-5">
            <p
              className={cn(
                "text-[0.625rem] font-semibold tracking-[0.1em] uppercase",
                "text-neutral-400",
              )}
            >
              {behaviour.good.label}
            </p>

            <ul className="mt-2.5 space-y-2">
              {behaviour.good.items.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent-300" />
                  <span className="text-[0.75rem] leading-relaxed text-neutral-300">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* A drawing of a button, not a button. */}
          <motion.span
            {...rise(0.3)}
            className={cn(
              "mt-6 flex items-center justify-center gap-2 rounded-lg",
              "bg-brand-500 py-2.5",
              "text-[0.8125rem] font-semibold text-white",
            )}
          >
            <svg viewBox="0 0 16 16" className="size-3.5" fill="currentColor">
              <path d="M8 1.5 9.4 5.6 13.5 7 9.4 8.4 8 12.5 6.6 8.4 2.5 7l4.1-1.4z" />
            </svg>
            {behaviour.action}
          </motion.span>
        </div>

        {/* ========================= Right panel ===================== */}
        {/* Hidden below lg: the dial needs width to stay legible, and a
            squashed one reads as a rendering fault. */}
        <div className="hidden p-5 sm:p-6 lg:block">
          <motion.p
            {...rise(0.1)}
            className="text-[0.9375rem] font-semibold text-white"
          >
            {competency.title}
          </motion.p>

          {/* ---------------------- Level pills ------------------- */}
          <motion.div
            {...rise(0.15)}
            className="mt-4 flex flex-wrap items-center gap-2"
          >
            <span className="flex items-center gap-1 rounded-full p-1 ring-1 ring-white/10">
              {competency.levels.map((level, index) => (
                <span
                  key={level}
                  className={cn(
                    pill,
                    index === competency.activeLevel
                      ? "bg-accent-300/15 font-semibold text-accent-300 ring-1 ring-accent-300/40"
                      : "text-neutral-400",
                  )}
                >
                  {level}
                </span>
              ))}
            </span>

            <span
              className={cn(
                pill,
                "flex items-center gap-1.5 font-semibold",
                "text-accent-300 ring-1 ring-accent-300/40",
              )}
            >
              <svg viewBox="0 0 16 16" className="size-3" fill="none">
                <circle
                  cx="8"
                  cy="8"
                  r="6"
                  stroke="currentColor"
                  strokeWidth="1.4"
                />
                <path
                  d="M8 4.8V8l2.2 1.6"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
              {competency.requirement}
            </span>
          </motion.div>

          {/* ------------------------ Weight ---------------------- */}
          <motion.div
            {...rise(0.2)}
            className="mt-4 flex items-center justify-end gap-3"
          >
            <span className="text-[0.75rem] text-neutral-400">
              {competency.weight.label}
            </span>
            <span
              className={cn(
                "rounded-md px-3 py-1.5 ring-1 ring-white/12",
                "text-[0.75rem] font-semibold text-white tabular-nums",
              )}
            >
              {competency.weight.value}
            </span>
          </motion.div>

          <motion.p
            {...rise(0.22)}
            className="mt-1 text-[0.6875rem] text-neutral-500"
          >
            {competency.levelNote}
          </motion.p>

          {/* -------------------- Assessment style ---------------- */}
          <motion.div
            {...rise(0.25)}
            className="mt-4 flex flex-wrap items-center gap-3"
          >
            <span className="text-[0.75rem] text-neutral-300">
              {competency.assessment.label}
            </span>

            <span className="flex items-center gap-1 rounded-full p-1 ring-1 ring-white/10">
              {competency.assessment.options.map((option, index) => (
                <span
                  key={option}
                  className={cn(
                    pill,
                    index === competency.assessment.active
                      ? "bg-brand-500/20 font-semibold text-brand-200 ring-1 ring-brand-400/40"
                      : "text-neutral-400",
                  )}
                >
                  {option}
                </span>
              ))}
            </span>
          </motion.div>

          <motion.p
            {...rise(0.28)}
            className="mt-2 text-[0.6875rem] text-neutral-500"
          >
            {competency.assessment.note}
          </motion.p>

          <hr className="mt-5 border-white/8" />

          {/* ------------------------- Dial ----------------------- */}
          <div className="relative mx-auto mt-6 aspect-square w-full max-w-64">
            <PulseDial
              spokes={competency.dial.spokes}
              max={competency.dial.max}
              className="absolute inset-0"
            />

            {/* Centre disc: the required score for this competency. */}
            <motion.div
              initial={reduce ? "shown" : "hidden"}
              whileInView="shown"
              viewport={{ once: true, amount: "some" }}
              variants={{
                hidden: { opacity: 0, scale: 0.6 },
                shown: {
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.6, delay: 0.5, ease: easeOut },
                },
              }}
              className={cn(
                "absolute top-1/2 left-1/2 grid",
                "size-[38%] -translate-x-1/2 -translate-y-1/2",
                "place-items-center rounded-full",
                "bg-[#12131c] ring-1 ring-brand-400/35",
              )}
            >
              <span className="font-display text-lg font-bold text-white tabular-nums">
                {competency.dial.centre.score}
                <span className="text-[0.625rem] font-medium text-neutral-500">
                  /{competency.dial.centre.outOf}
                </span>
              </span>
              <span
                className={cn(
                  "text-[0.5rem] tracking-[0.1em] uppercase",
                  "text-neutral-500",
                )}
              >
                {competency.dial.centre.label}
              </span>
              <span
                className={cn(
                  "mt-1 rounded-full bg-accent-300/15 px-2 py-0.5",
                  "text-[0.5rem] font-semibold text-accent-300",
                )}
              >
                {competency.dial.centre.level}
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </Uncopyable>
  );
}
