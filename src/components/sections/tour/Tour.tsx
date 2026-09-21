"use client";

import { motion, useReducedMotion } from "motion/react";

import { ClockGlyph } from "@/components/sections/tour/TourIcons";
import { TourVideo } from "@/components/sections/tour/TourVideo";
import { Container } from "@/components/ui/Container";
import { tour } from "@/content/tour";
import { cn } from "@/lib/utils";

/**
 * TOUR
 * ---------------------------------------------------------------------------
 * The product-tour section: heading, a video player, and a numbered step rail.
 *
 * THE VIDEO
 * The player is TourVideo, a click-to-load facade around the YouTube embed —
 * see that file for why the iframe is not mounted until someone asks for it.
 *
 * It replaced an illustrated capability-loop poster (TourPoster) and its own
 * play control, which stood in while no video existed. That markup is in git
 * history if it is ever wanted back; TourPoster itself is still in the tree.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

export function Tour() {
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: {
      duration: reduce ? 0 : 0.6,
      delay: reduce ? 0 : delay,
      ease: easeOut,
    },
  });

  return (
    <section id="tour" className="bg-ink-900 py-section-lg text-white">
      <Container width="hero">
        {/* ============================== Header ======================== */}
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-12">
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "font-mono text-[0.625rem] font-medium uppercase",
                "tracking-[0.16em] text-brand-300 sm:text-[0.6875rem]",
              )}
            >
              {tour.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.08)}
              className={cn(
                "mt-5 font-display font-bold tracking-[-0.025em]",
                "leading-[1.08] text-white",
                // Measured from the design at ~42px on a 1440 frame.
                "text-[1.875rem] sm:text-[2.25rem] xl:text-[2.625rem]",
              )}
            >
              {/* `inline lg:block` puts the break where the design has it
                  without forcing two fixed lines onto a narrow screen. */}
              {tour.headline.map((line, index) => (
                <span key={line} className="inline lg:block">
                  {line}
                  {index === 0 ? " " : null}
                </span>
              ))}
            </motion.h2>

            <motion.p
              {...rise(0.16)}
              className="mt-5 max-w-[34rem] text-sm leading-relaxed text-pretty text-neutral-300 sm:text-base"
            >
              {tour.description}
            </motion.p>
          </div>

          {/* Duration badge */}
          <motion.div
            {...rise(0.24)}
            className="flex items-start gap-3.5 lg:pb-1"
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-full border border-brand-500/40 text-brand-300">
              <ClockGlyph className="size-5" />
            </span>
            <div>
              <p className="text-[0.9375rem] font-semibold text-white">
                {tour.meta.title}
              </p>
              <p className="mt-1 text-[0.8125rem] text-neutral-400">
                {tour.meta.description}
              </p>
            </div>
          </motion.div>
        </div>

        {/* ============================== Player ======================== */}
        <motion.div
          {...rise(0.1)}
          className={cn(
            "relative mt-12 overflow-hidden rounded-3xl",
            "border border-white/8 bg-[#060917]",
            "px-4 pt-6 pb-6 sm:px-7 sm:pt-8 sm:pb-8 lg:px-10 lg:pb-10",
          )}
        >
          {/* Soft violet bloom, bottom-right, matching the design. */}
          <div
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute -right-1/4 -bottom-1/3",
              "size-[36rem] rounded-full opacity-30 blur-[110px]",
              "bg-[radial-gradient(circle,var(--brand-700)_0%,transparent_70%)]",
            )}
          />

          {/* ========================= The video ======================== */}
          {/*
            Replaced the illustrated poster that stood in before the video
            existed — see the note at the top of this file.
          */}
          <TourVideo className="relative" />

          {/* ------------------------ Caption bar -------------------- */}
          <div className="relative mt-6 flex flex-wrap items-center gap-3 lg:mt-4">
            <span
              className={cn(
                "rounded-lg bg-white/6 px-3 py-1.5",
                "font-mono text-[0.8125rem] font-medium text-white",
              )}
            >
              {tour.player.duration}
            </span>
            <p className="text-[0.8125rem] text-neutral-400">
              {tour.player.caption}
            </p>
          </div>
        </motion.div>

        {/* ============================ Step rail ======================= */}
        <ol className="mt-14 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {tour.steps.map((step, index) => (
            <motion.li key={step.title} {...rise(0.08 * index)}>
              {/* Number and its connector rule. The rule is hidden on the
                  last item, and on the wrapped rows below lg. */}
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="font-mono text-sm font-semibold text-brand-400"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                {index < tour.steps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="hidden flex-1 items-center gap-0 lg:flex"
                  >
                    <span className="h-px flex-1 bg-white/15" />
                    <span className="size-1.5 rounded-full border border-white/30" />
                  </span>
                )}
              </div>

              <h3 className="mt-4 text-[0.9375rem] font-semibold text-white">
                {step.title}
              </h3>
              <p className="mt-2 text-[0.8125rem] leading-relaxed text-pretty text-neutral-400">
                {step.description}
              </p>
            </motion.li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
