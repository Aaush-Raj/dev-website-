"use client";

import { useEffect, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

import { Uncopyable } from "@/components/ui/Uncopyable";
import { saathi } from "@/content/saathi";
import { cn } from "@/lib/utils";

import { ClockIcon, MenuIcon } from "./SaathiIcons";

/**
 * SAATHI LOOP PHONE
 * ---------------------------------------------------------------------------
 * The handset in the middle of the capability-loop section: a greeting, the
 * "next best action" card, and a capability-progress readout with a ring.
 *
 * Deliberately a DIFFERENT mockup from the hero's SaathiPhone — this one has
 * its own chrome (a hairline outlined frame rather than the hero's titanium
 * rail), its own accent (periwinkle rather than violet) and completely
 * different content. Sharing one component between them would mean a prop for
 * nearly every element, so they stay separate.
 *
 * As with the hero, it is wrapped in <Uncopyable> so it behaves like the
 * screenshot it imitates, and it scales as one unit from a single `em` base.
 *
 * THE PROGRESS RING
 * Both the arc and the percentage count up when the phone scrolls into view.
 * The arc is a stroked circle animated through `strokeDashoffset`; the number
 * is animated with Motion's `animate()` into local state. Reduced-motion users
 * get the final value immediately, with no sweep and no count.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { phone } = saathi.loop;

/** The ring's geometry, in its own 100-unit viewBox. */
const RING = { cx: 50, cy: 50, r: 38 };
const CIRCUMFERENCE = 2 * Math.PI * RING.r;

/**
 * The screen builds in order — chrome, greeting, the action card, then the
 * progress readout — so the phone reads as filling in rather than arriving
 * finished. `staggerChildren` on the screen drives it; each child just
 * declares the same two states.
 */
const screen = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.13, delayChildren: 0.35 } },
} as const;

const part = {
  hidden: { opacity: 0, y: 10 },
  shown: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
} as const;

/** When the ring begins, measured to land after the parts above it. */
const RING_DELAY = 1.15;

export function SaathiLoopPhone({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  // `once` so the count runs a single time — a number that re-counts every
  // time it scrolls past reads as a glitch rather than as an entrance.
  const inView = useInView(ref, { once: true, amount: 0.4 });

  const [shown, setShown] = useState(reduce ? phone.progress.percent : 0);

  useEffect(() => {
    // Reduced motion never animates: `shown` is already seeded with the final
    // value, so there is nothing for the effect to do.
    if (!inView || reduce) return;

    const controls = animate(0, phone.progress.percent, {
      duration: 1.5,
      delay: RING_DELAY,
      ease: easeOut,
      onUpdate: (v) => setShown(Math.round(v)),
    });

    return () => controls.stop();
  }, [inView, reduce]);

  return (
    <Uncopyable innerRef={ref} className={cn("relative", className)}>
      <div
        className={cn(
          "relative mx-auto w-64 rounded-[2.6em] p-[0.28em] lg:w-60 xl:w-64",
          // The frame: a hairline outline over the section ground, as the
          // design draws it — no metal, unlike the hero's handset.
          "border border-white/14 bg-[#0d0f14]",
          "shadow-[0_40px_90px_-40px_rgb(0_0_0/0.9)]",
          // Scales the whole mockup as one unit.
          "text-[0.6rem] lg:text-[0.56rem] xl:text-[0.6rem]",
        )}
      >
        <motion.div
          variants={screen}
          initial={reduce ? "shown" : "hidden"}
          animate={inView ? "shown" : undefined}
          className={cn(
            "relative overflow-hidden rounded-[2.35em]",
            "border border-white/8 bg-[#0d0f14]",
            "px-[1.6em] pt-[1.5em] pb-[1.8em]",
          )}
        >
          {/* The speaker slot and lens, drawn as the design shows them —
              a pill and a dot rather than a Dynamic Island. */}
          <span
            aria-hidden="true"
            className="absolute top-[0.85em] left-1/2 flex -translate-x-1/2 items-center gap-[0.5em]"
          >
            <span className="h-[0.3em] w-[3.2em] rounded-full bg-white/20" />
            <span className="size-[0.42em] rounded-full border border-white/25" />
          </span>

          {/* ------------------------- Top bar ------------------------- */}
          <motion.div
            variants={part}
            className="mt-[1.6em] flex items-start justify-between"
          >
            <span
              className={cn(
                "grid size-[3.2em] place-items-center rounded-full",
                "bg-[#7f8ac4] text-white",
              )}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="size-[1.8em]"
              >
                <circle
                  cx="12"
                  cy="8.6"
                  r="3.3"
                  stroke="currentColor"
                  strokeWidth="1.7"
                />
                <path
                  d="M5.8 19a6.2 6.2 0 0 1 12.4 0"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </svg>
            </span>

            <MenuIcon className="mt-[0.5em] size-[1.7em] text-[#7f8ac4]" />
          </motion.div>

          {/* ------------------------ Greeting ------------------------- */}
          <motion.p
            variants={part}
            className={cn(
              "mt-[1.5em] text-[1.9em] leading-[1.24] font-bold",
              "tracking-[-0.02em] text-white",
            )}
          >
            {phone.greeting.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </motion.p>

          <motion.span
            variants={part}
            aria-hidden="true"
            className="mt-[1.5em] block h-px w-[60%] bg-white/10"
          />

          {/* -------------------- Next best action --------------------- */}
          <motion.p
            variants={part}
            className="mt-[1.3em] text-[1.15em] text-white/55"
          >
            {phone.actionLabel}
          </motion.p>

          <motion.div
            variants={part}
            className={cn(
              "mt-[0.9em] rounded-[1.1em] p-[1.2em]",
              "border border-white/10 bg-white/4",
            )}
          >
            <p className="text-[1.55em] leading-[1.28] font-semibold text-white">
              {phone.action.title.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>

            <p className="mt-[0.9em] flex items-center gap-[0.5em] text-[1.15em] text-[#8f99cf]">
              <ClockIcon className="size-[1.15em] shrink-0" />
              {phone.action.duration}
            </p>

            {/* Drawn as a button, but not a real one — this is a picture of
                the app, so it must not be focusable or clickable. */}
            <span
              className={cn(
                "mt-[1.1em] block rounded-[0.65em] py-[0.85em] text-center",
                "bg-[#7f8ac4] text-[1.2em] font-semibold text-white",
              )}
            >
              {phone.action.cta}
            </span>
          </motion.div>

          <motion.span
            variants={part}
            aria-hidden="true"
            className="mt-[1.4em] block h-px w-full bg-white/10"
          />

          {/* ---------------------- Progress ring ---------------------- */}
          <motion.div
            variants={part}
            className="mt-[1.3em] flex items-center justify-between"
          >
            <div>
              <p className="text-[1.15em] text-white/55">
                {phone.progress.label}
              </p>
              <p className="mt-[0.35em] text-[2.6em] font-bold text-[#7f8ac4]">
                {shown}
                <span className="text-[0.55em] font-semibold">%</span>
              </p>
            </div>

            <svg
              viewBox="0 0 100 100"
              className="size-[4.6em] shrink-0 -rotate-90"
              aria-hidden="true"
            >
              {/* The unfilled track. */}
              <circle
                cx={RING.cx}
                cy={RING.cy}
                r={RING.r}
                fill="none"
                stroke="rgb(255 255 255 / 0.12)"
                strokeWidth="11"
              />
              {/* The filled arc, swept on entrance. */}
              <motion.circle
                cx={RING.cx}
                cy={RING.cy}
                r={RING.r}
                fill="none"
                stroke="#7f8ac4"
                strokeWidth="11"
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                initial={{
                  strokeDashoffset:
                    CIRCUMFERENCE *
                    (reduce ? 1 - phone.progress.percent / 100 : 1),
                }}
                animate={
                  inView
                    ? {
                        strokeDashoffset:
                          CIRCUMFERENCE * (1 - phone.progress.percent / 100),
                      }
                    : undefined
                }
                transition={{
                  duration: 1.5,
                  delay: RING_DELAY,
                  ease: easeOut,
                }}
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </Uncopyable>
  );
}
