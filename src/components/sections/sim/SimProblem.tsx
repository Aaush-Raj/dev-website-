"use client";

import type { ComponentType, SVGProps } from "react";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { sim } from "@/content/sim";
import { cn } from "@/lib/utils";

import { BarsOutlineIcon, BubblesIcon, RepeatIcon } from "./SimIcons";

/**
 * LURNYSIM — THE PROBLEM
 * ---------------------------------------------------------------------------
 * Section 2: a statement on the left with three marks beneath it; on the right
 * four numbered problems, each closing with what LurnySim does about it.
 *
 * NOTHING SHIPS. The design supplies a 1051KB background plate and a 380KB
 * icon set, and neither is used:
 *
 *   - The plate is a near-white lavender ground with broad angled washes at
 *     the corners. Sampled across the frame it is #faf7fe almost everywhere,
 *     so it costs a few gradients instead and scales to any width.
 *   - The three marks are line glyphs rendering at 34px.
 *
 * THIS IS REAL PAGE COPY, not an illustrative surface — no `Uncopyable` and
 * no aria-hidden here, unlike the hero's panels above it. The four rows are a
 * list, and are marked up as one.
 */

const { problem } = sim;

/** Motion's string easings are not typed, so the cubic curve is spelled out. */
const easeOut = [0.16, 1, 0.3, 1] as const;

const GLYPHS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  bubbles: BubblesIcon,
  bars: BarsOutlineIcon,
  repeat: RepeatIcon,
};

export function SimProblem() {
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduce ? "shown" : "hidden",
    whileInView: "shown",
    /*
      A generous bottom margin. The right column runs well below the fold on
      a phone, and at a smaller margin its lower rows stayed at opacity 0 —
      the failure every long section on this build has hit.
    */
    viewport: {
      once: true,
      amount: "some",
      margin: "0px 0px 200% 0px",
    } as const,
    variants: {
      hidden: { opacity: 0, y: 18 },
      shown: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay, ease: easeOut },
      },
    },
  });

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden",
        // Sampled from the supplied plate: a near-white lavender.
        "bg-[#faf7fe] text-[#12001f]",
        "py-16 sm:py-20 lg:py-24",
      )}
    >
      {/* ========================= Background ========================= */}
      {/*
        The plate's washes. Amplified, it carries angled lavender bands across
        the top-left and bottom-right corners and a warm pink low on the left
        — all broad and soft, so they are gradients rather than an image.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        {/* The top-left band, running off the corner at an angle. */}
        <span className="absolute -top-[30%] -left-[12%] h-[38rem] w-[34rem] -rotate-[28deg] rounded-[40%] bg-[linear-gradient(140deg,#e7d8fb,transparent_70%)] opacity-70 blur-2xl" />
        {/* The warm pink, low and left. */}
        <span className="absolute -bottom-[26%] -left-[16%] size-[30rem] rounded-full bg-[#fde3e4] opacity-75 blur-3xl" />
        {/* The deeper violet sweeping the bottom-right corner. */}
        <span className="absolute -right-[14%] -bottom-[34%] h-[36rem] w-[40rem] rotate-[18deg] rounded-[45%] bg-[linear-gradient(300deg,#d9c6fa,transparent_72%)] opacity-80 blur-2xl" />
      </div>

      <Container width="hero">
        <div
          className={cn(
            "grid gap-14",
            // Measured from the design: two near-equal columns, left 6.7-46%
            // and right 53.6-90.5% of the frame.
            "lg:grid-cols-2 lg:gap-16 xl:gap-20",
            // Grid items default to `min-width: auto`; without this a long
            // row title can force its column past the container.
            "[&>*]:min-w-0",
          )}
        >
          {/* ========================= Statement ======================= */}
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "font-display text-[0.9375rem] font-bold tracking-[0.16em] uppercase",
                "text-[#7700fe]",
              )}
            >
              {problem.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.06)}
              className={cn(
                "mt-5 font-display font-bold tracking-[-0.035em]",
                "leading-[1.06] text-balance",
                // Measured from the design at ~56px on a 1440 frame.
                "text-[2.125rem] sm:text-[2.75rem] xl:text-[3.25rem]",
              )}
            >
              {/*
                Four lines, the last two accented — the design puts the colour
                on "being ready to say it", which is the half of the sentence
                the section argues for.
              */}
              {problem.headline.map((line) => (
                <span
                  key={line.text}
                  className={cn(
                    "block",
                    "accent" in line && line.accent && "text-[#7600ec]",
                  )}
                >
                  {line.text}
                </span>
              ))}
            </motion.h2>

            <motion.p
              {...rise(0.12)}
              className={cn(
                "mt-6 max-w-[30rem] leading-relaxed text-pretty",
                "text-[1.0625rem] text-[#423c75] sm:text-[1.125rem]",
              )}
            >
              {problem.description}
            </motion.p>

            {/* ----------------------- Solution ---------------------- */}
            <motion.p
              {...rise(0.18)}
              className={cn(
                "mt-9 font-display text-[0.9375rem] font-bold tracking-[0.16em] uppercase",
                "text-[#6e00ff]",
              )}
            >
              {problem.solution.eyebrow}
            </motion.p>

            <motion.p
              {...rise(0.22)}
              className={cn(
                "mt-4 max-w-[30rem] leading-relaxed text-pretty",
                "text-[1.0625rem] text-[#443d76] sm:text-[1.125rem]",
              )}
            >
              {problem.solution.description}
            </motion.p>

            {/* ------------------------ Features --------------------- */}
            {/*
              Measured from the design: the three marks are ~55px and sit at
              11%, 24% and 38% of the frame — an even rhythm across the
              column's width rather than a tight cluster.
            */}
            <ul className="mt-11 flex flex-wrap items-start gap-x-14 gap-y-8 sm:gap-x-[4.5rem]">
              {problem.features.map((feature, index) => {
                const Glyph = GLYPHS[feature.icon];
                return (
                  <motion.li
                    key={feature.label}
                    {...rise(0.28 + index * 0.07)}
                    className="group/feature flex flex-col items-center gap-3.5"
                  >
                    <Glyph
                      className={cn(
                        "size-[3.25rem] shrink-0 text-[#7600ec]",
                        "duration-normal transition-[scale] ease-out",
                        "will-change-[scale] group-hover/feature:scale-110",
                      )}
                    />
                    <span className="text-[1rem] whitespace-nowrap text-[#544886]">
                      {feature.label}
                    </span>
                  </motion.li>
                );
              })}
            </ul>
          </div>

          {/* =========================== Rows ========================== */}
          <ul>
            {problem.rows.map((row, index) => (
              <motion.li
                key={row.number}
                {...rise(0.1 + index * 0.1)}
                className={cn(
                  "group/row border-t border-[#d8d2e8] py-7 first:pt-0 lg:first:pt-7",
                  // The design rules above each row and closes the list with
                  // nothing beneath the last, so only top borders are drawn.
                  "duration-normal transition-[border-color] ease-out",
                  "hover:border-[#7300ff]/35",
                )}
              >
                <p className="font-display text-[1.0625rem] font-bold tracking-[0.02em] text-[#6500ff]">
                  {row.number}
                </p>

                <h3
                  className={cn(
                    "mt-2.5 font-display font-bold tracking-[-0.02em]",
                    "text-[1.25rem] leading-snug text-[#130025] sm:text-[1.375rem]",
                  )}
                >
                  {row.title}
                </h3>

                <p className="mt-2 text-[1rem] leading-relaxed text-pretty text-[#59518b]">
                  {row.body}
                </p>

                {/* ---------------------- Solution --------------------- */}
                {/*
                  The answer to the problem above it. The arrow slides on
                  hover, which is the only motion in the row — enough to tie
                  the mark to the line it points at.
                */}
                <p className="mt-3 flex items-start gap-3 text-[1rem] text-[#7300ff]">
                  <ArrowIcon
                    className={cn(
                      "mt-[0.3rem] size-4 shrink-0",
                      "duration-normal transition-[translate] ease-out",
                      "group-hover/row:translate-x-1",
                    )}
                  />
                  {row.solution}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

/* ========================================================================== */
/* ICONS                                                                      */
/* ========================================================================== */

/** The arrow before each solution line. */
function ArrowIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" {...props}>
      <path
        d="M2 8h12M9.5 3.5 14 8l-4.5 4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
