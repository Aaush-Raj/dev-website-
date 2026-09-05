"use client";

import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { solutionsPage } from "@/content/solutions-page";
import { cn } from "@/lib/utils";

import { engineIcons, SparkStarIcon } from "./SolutionsEngineIcons";

/**
 * SOLUTIONS — HOW LURNY SOLVES THE PROBLEM
 * ---------------------------------------------------------------------------
 * Section 3: five stages on a glowing rail, then a banded statement.
 *
 * THE RAIL
 * The design runs a violet line across the stage row with an amber node in each
 * gap between cards. Both are drawn INSIDE the card track rather than as an
 * overlay: each card after the first carries the rail segment and node on its
 * own left edge, so they stay attached to the gap they belong to at any width
 * and never need coordinates that could drift from the layout.
 *
 * Below lg the cards stack and the rail is dropped — a horizontal connector has
 * nothing to connect once the row becomes a column.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { engines } = solutionsPage;

export function SolutionsEngines() {
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduce ? "shown" : "hidden",
    whileInView: "shown",
    viewport: { once: true, amount: "some" } as const,
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
        "relative isolate overflow-hidden text-white",
        // The near-black violet ground, sampled from the design.
        "bg-[#010520]",
        "py-20 lg:py-24",
      )}
    >
      {/* A faint violet bloom in the lower right, as the design has. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(70% 60% at 100% 100%, rgb(88 40 190 / 0.35) 0%, transparent 60%)",
        }}
      />

      <Container width="wide" className="relative">
        {/* ========================= The heading ====================== */}
        <motion.p
          {...rise(0)}
          className={cn(
            "text-[0.75rem] font-bold tracking-[0.18em] uppercase",
            "text-[#feca40] sm:text-[0.8125rem]",
          )}
        >
          {engines.eyebrow}
        </motion.p>

        <motion.h2
          {...rise(0.08)}
          className={cn(
            "mt-5 max-w-[62rem] font-display font-bold tracking-[-0.03em]",
            "leading-[1.14] text-balance text-white",
            // Measured from the design at ~50px on a 1440 frame.
            "text-[1.75rem] sm:text-[2.25rem] xl:text-[3.125rem]",
          )}
        >
          {engines.headline.join(" ")}
        </motion.h2>

        <motion.p
          {...rise(0.16)}
          className={cn(
            "mt-6 max-w-[58rem] leading-relaxed text-pretty",
            "text-[1rem] text-[#c9bade] sm:text-[1.0625rem]",
          )}
        >
          {engines.description}
        </motion.p>

        {/* ========================== The rail ======================== */}
        <ul
          className={cn(
            "mt-12 grid grid-cols-1 gap-6",
            "sm:grid-cols-2 lg:mt-14 lg:grid-cols-5 lg:gap-0",
          )}
        >
          {engines.stages.map((stage, index) => {
            const Icon = engineIcons[stage.icon];
            const first = index === 0;

            return (
              <motion.li
                key={stage.number}
                {...rise(0.22 + index * 0.08)}
                // The gap between cards is the rail's home, so on lg the cards
                // carry their own horizontal padding instead of a grid gap.
                className={cn("relative h-full", !first && "lg:pl-8")}
              >
                {/* ------------------- The connector ----------------- */}
                {/*
                  Drawn on every card but the first, spanning the gap to its
                  left. Decorative, and lg-only: stacked cards have no gap.
                */}
                {!first && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute top-[5.25rem] -left-px hidden w-[calc(2rem+2px)] lg:block"
                  >
                    <span className="block h-0.5 w-full rounded-full bg-[linear-gradient(90deg,#7a3fd0,#a955f5_50%,#7a3fd0)] shadow-[0_0_8px_1px_rgb(169_85_245/0.55)]" />

                    {/* The amber node, centred on the segment. */}
                    <span
                      className={cn(
                        "absolute top-1/2 left-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2",
                        "rounded-full bg-[#feca40]",
                        "shadow-[0_0_0_3px_rgb(254_202_64/0.18),0_0_12px_2px_rgb(254_202_64/0.5)]",
                      )}
                    />
                  </span>
                )}

                {/* --------------------- The card ------------------- */}
                <div
                  className={cn(
                    "flex h-full flex-col rounded-xl p-5",
                    "border border-[#3a3560] bg-[#070726]/80",
                    "duration-normal transition-[border-color,box-shadow,translate] ease-out",
                    "will-change-[translate] hover:-translate-y-1",
                    "hover:border-[#7a53c8]",
                    "hover:shadow-[0_20px_44px_-22px_rgb(169_85_245/0.55)]",
                  )}
                >
                  <span className="font-display text-[2.25rem] leading-none font-bold text-[#a955f5]">
                    {stage.number}
                  </span>

                  <Icon className="mt-3 size-12 text-[#a955f5]" />

                  <span className="mt-5 block text-[1.25rem] font-bold text-pretty text-white">
                    {stage.title}
                  </span>

                  <span className="mt-2 block text-[0.9375rem] leading-relaxed text-pretty text-[#c9bade]">
                    {stage.description}
                  </span>

                  {/* `mt-auto` pins the tags to the card's foot, so they align
                      across the row however the titles wrap. */}
                  <span className="mt-auto flex flex-wrap items-center gap-2 pt-6">
                    {stage.tags.map((tag) => (
                      <span
                        key={tag}
                        className={cn(
                          "rounded-md border border-[#7b45c9] px-2.5 py-1.5",
                          "font-mono text-[0.6875rem] font-medium tracking-[0.08em] uppercase",
                          "text-[#c79bfb]",
                        )}
                      >
                        {tag}
                      </span>
                    ))}
                  </span>
                </div>
              </motion.li>
            );
          })}
        </ul>

        {/* ======================= The difference ===================== */}
        <motion.div
          {...rise(0.62)}
          className={cn(
            "relative mt-8 overflow-hidden rounded-xl lg:mt-10",
            "border border-[#6b3fb8] bg-[#0a0730]/80",
            "px-6 py-7 sm:px-8 lg:px-10 lg:py-8",
          )}
        >
          {/* The soft violet wash the design sets in the band's right end. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(60% 140% at 100% 60%, rgb(122 60 220 / 0.35) 0%, transparent 65%)",
            }}
          />

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-7">
            <span
              className={cn(
                "grid size-16 shrink-0 place-items-center rounded-full",
                "bg-[#140a3a] text-[#feca40]",
                "shadow-[0_0_28px_4px_rgb(254_202_64/0.18)]",
              )}
            >
              <SparkStarIcon className="size-9" />
            </span>

            <div className="min-w-0">
              <p className="text-[0.8125rem] font-bold tracking-[0.16em] text-[#feca40] uppercase">
                {engines.difference.eyebrow}
              </p>
              <p className="mt-2.5 max-w-[52rem] text-[1.0625rem] leading-relaxed text-pretty text-white sm:text-[1.125rem]">
                {engines.difference.body}
              </p>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
