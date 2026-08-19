"use client";

import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { problem } from "@/content/problem";
import { cn } from "@/lib/utils";

/**
 * PROBLEM
 * ---------------------------------------------------------------------------
 * Two-column section: the positioning statement on the left, a numbered list
 * of four problems on the right.
 *
 * The left column is sticky on xl+ so the statement stays in view while the
 * list scrolls past it — the list is the detail, the statement is the frame.
 * Below xl it stacks normally.
 *
 * Each list item is separated by a hairline rule, including one above the
 * first and below the last, matching the design's ledger-like rhythm.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

export function Problem() {
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
    <section id="problem" className="pt-section-sm pb-section-lg">
      <Container width="hero">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16 xl:gap-24">
          {/* ============================ Statement =================== */}
          <div className="xl:sticky xl:top-32 xl:self-start">
            <motion.p
              {...rise(0)}
              className={cn(
                "font-mono text-[0.625rem] font-medium uppercase",
                "tracking-[0.16em] text-brand-700 sm:text-[0.6875rem]",
              )}
            >
              {problem.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.08)}
              className={cn(
                "mt-6 font-display text-3xl font-bold tracking-[-0.025em]",
                "leading-[0.98] text-neutral-900 sm:text-4xl",
              )}
            >
              {problem.headline}
            </motion.h2>

            <motion.p
              {...rise(0.16)}
              className="mt-7 max-w-[30rem] leading-relaxed text-pretty text-neutral-600"
            >
              {problem.description}
            </motion.p>
          </div>

          {/* ============================== List ====================== */}
          {/* An ordered list: the numbering is part of the content, not
              decoration, and the order is meaningful. */}
          <ol className="border-t border-neutral-200">
            {problem.items.map((item, index) => (
              <motion.li
                key={item.title}
                className="border-b border-neutral-200 py-7 sm:py-8"
                {...rise(0.1 + index * 0.08)}
              >
                {/* Index is rendered decoratively — the <ol> already conveys
                    order to assistive tech, so announcing "01" would double up. */}
                <span
                  aria-hidden="true"
                  className="font-mono text-[0.6875rem] font-medium text-neutral-400"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="mt-3 text-lg font-medium tracking-[-0.01em] text-neutral-900 sm:text-xl">
                  {item.title}
                </h3>

                <p className="mt-2.5 max-w-[38rem] text-sm leading-relaxed text-pretty text-neutral-600 sm:text-base">
                  {item.description}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
