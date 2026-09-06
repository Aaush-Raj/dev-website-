"use client";

import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { kxp } from "@/content/kxp";
import { cn } from "@/lib/utils";

/**
 * KXP — THE PROBLEM LURNYKXP SOLVES
 * ---------------------------------------------------------------------------
 * Section 2: the statement on the left, the four failures on the right as a
 * numbered list divided by hairline rules.
 *
 * WHY AN <ol> AND NOT A GRID OF CARDS
 * The design numbers the items 01–04 and separates them with rules alone —
 * there are no card edges. That is an ordered list, so it is marked up as one
 * and the ordinal comes from `list-style` rather than being typed into the
 * copy, which keeps the two from drifting apart if an item is ever added or
 * reordered. `counter()` renders it, so the number can carry the design's
 * monospaced violet treatment.
 *
 * The rules sit ABOVE each item and once more below the last, which is how the
 * design closes the column — hence the trailing border on the list itself
 * rather than a `divide-y`.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { problem } = kxp;

export function KxpProblem() {
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
      // The warm off-white ground, sampled from the design. It follows the
      // near-black hero, so the contrast between the two is the point.
      className="relative isolate bg-[#fdf8f9] py-section-lg"
    >
      <Container width="hero">
        <div
          className={cn(
            "grid gap-14",
            // Measured from the design: the statement takes a little under
            // half the frame, the list the rest, with a wide gutter between.
            "lg:grid-cols-2 lg:items-center lg:gap-20 xl:gap-28",
          )}
        >
          {/* =========================== Statement ==================== */}
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "font-mono text-[0.6875rem] font-medium uppercase",
                "tracking-[0.18em] text-[#5b00ed] sm:text-xs",
              )}
            >
              {problem.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.08)}
              className={cn(
                "mt-6 font-display font-bold tracking-[-0.035em]",
                "leading-[1.1] text-[#08080a]",
                "text-[2rem] sm:text-[2.5rem] xl:text-[3rem]",
              )}
            >
              {problem.headline.map((line) => (
                <span key={line} className="inline lg:block">
                  {line}{" "}
                </span>
              ))}
            </motion.h2>

            <motion.p
              {...rise(0.16)}
              className={cn(
                "mt-7 max-w-[32rem] leading-relaxed text-pretty",
                "text-[1.0625rem] text-[#2a314a]/85 sm:text-lg",
              )}
            >
              {problem.body}
            </motion.p>
          </div>

          {/* ============================ Failures ==================== */}
          <ol
            className={cn(
              // The rule that closes the column below the last item; every
              // other rule is the item's own top border.
              "border-b border-[#d4d1d7]",
            )}
          >
            {problem.failures.map((failure, index) => (
              <motion.li
                key={failure.title}
                {...rise(0.2 + index * 0.08)}
                className={cn(
                  "border-t border-[#d4d1d7] py-7",
                  // The ordinal is drawn from the list position rather than
                  // typed into the copy — see the note at the top.
                  "before:mb-3 before:block before:content-[counter(list-item,decimal-leading-zero)]",
                  "before:font-mono before:text-[0.8125rem] before:font-medium",
                  "before:tracking-[0.06em] before:text-[#5b00ed]",
                )}
              >
                <h3
                  className={cn(
                    "font-display font-bold tracking-[-0.02em]",
                    "text-[1.125rem] leading-snug text-[#08080a] sm:text-[1.25rem]",
                  )}
                >
                  {failure.title}
                </h3>

                <p
                  className={cn(
                    "mt-2.5 leading-relaxed text-pretty",
                    "text-[0.9375rem] text-[#31394e]/80 sm:text-base",
                  )}
                >
                  {failure.body}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
