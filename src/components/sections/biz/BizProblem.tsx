"use client";

import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { biz } from "@/content/biz";
import { cn } from "@/lib/utils";

/**
 * BIZ PROBLEM
 * ---------------------------------------------------------------------------
 * Section 2 of the LurnyBiz page: the statement on the left, four numbered
 * items down the right.
 *
 * THE LEFT COLUMN STICKS on lg+. The right column is much taller than the
 * left, and the design pairs the statement with the whole list rather than
 * with its first item — so the statement holds while the items scroll past
 * it. Below lg the columns stack and stickiness would pin the heading over
 * the very content it introduces, so it is dropped.
 *
 * THE HAIRLINES sit as top borders on the items rather than as a border per
 * card, so a rule falls between items and above the first — which is what
 * the design draws — and never as a stray edge below the last.
 *
 * The eyebrow and the numbers use the monospace face, which is how the design
 * separates this section's furniture from its prose.
 */

const { problem } = biz;

/** Motion's string easings are not typed, so the cubic curve is spelled out. */
const easeOut = [0.16, 1, 0.3, 1] as const;

export function BizProblem() {
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
      // The hero's "See how it works" CTA points here.
      id="problem"
      className="bg-[#f9f5f3] py-section-lg text-neutral-900"
    >
      <Container width="hero">
        <div
          className={cn(
            "grid gap-14",
            "lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-16",
            "lg:items-start xl:gap-24",
          )}
        >
          {/* ========================= Statement ====================== */}
          {/*
            Sticky on lg+, offset by the header's own height so the heading
            never slides under the floating nav pill.
          */}
          <div className="lg:sticky lg:top-[calc(var(--header-height)+3rem)]">
            <motion.p
              {...rise(0)}
              className={cn(
                "font-mono text-[0.75rem] font-medium tracking-[0.14em]",
                "text-[#3524bf] uppercase",
              )}
            >
              {problem.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.08)}
              className={cn(
                "mt-8 font-display font-bold tracking-[-0.03em]",
                "leading-[1.14] text-balance",
                // Measured from the design at ~52px on a 1440 frame.
                "text-[1.875rem] sm:text-[2.25rem] xl:text-[2.875rem]",
              )}
            >
              {problem.headline.map((line, index) => (
                <span key={line} className="inline lg:block">
                  {line}
                  {/* The design sets the closing stop in amber. It is kept
                      out of the string so it can be coloured without
                      splitting the word before it. */}
                  {index === problem.headline.length - 1 && (
                    <span className="text-[#f3b942]">.</span>
                  )}{" "}
                </span>
              ))}
            </motion.h2>

            <motion.p
              {...rise(0.16)}
              className={cn(
                "mt-8 max-w-[30rem] leading-relaxed text-pretty",
                "text-[0.9375rem] text-neutral-600 sm:text-base",
              )}
            >
              {problem.description}
            </motion.p>
          </div>

          {/* =========================== Items ======================== */}
          <ul>
            {problem.items.map((item, index) => (
              <motion.li
                key={item.number}
                {...rise(0.1 + index * 0.08)}
                className={cn(
                  // A rule above EVERY item, the first included — which is
                  // what the design draws — and none below the last, since
                  // these are top borders rather than a box per item.
                  "group border-t border-neutral-300/70",
                  "py-8 sm:py-9",
                )}
              >
                <p
                  className={cn(
                    "font-mono text-[0.875rem] font-medium",
                    "text-[#3524bf]",
                    // `translate`, not `transform`: Tailwind v4 compiles the
                    // translate utilities to the standalone property.
                    "duration-normal transition-[translate] ease-out",
                    "group-hover:translate-x-1",
                  )}
                >
                  {item.number}
                </p>

                <h3
                  className={cn(
                    "mt-3.5 font-display font-semibold tracking-[-0.015em]",
                    "text-[1.125rem] text-balance sm:text-[1.3125rem]",
                    "duration-normal transition-colors ease-out",
                    "group-hover:text-[#3524bf]",
                  )}
                >
                  {item.title}
                </h3>

                <p
                  className={cn(
                    "mt-3 max-w-[34rem] leading-relaxed text-pretty",
                    "text-[0.9375rem] text-neutral-600",
                  )}
                >
                  {item.description}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
