"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { ArrowRightIcon } from "@/components/sections/hero/DashboardIcons";
import { Container } from "@/components/ui/Container";
import { SolutionNeedCard } from "@/components/ui/SolutionNeedCard";
import { solutions } from "@/content/solutions";
import { cn } from "@/lib/utils";

/**
 * SOLUTIONS
 * ---------------------------------------------------------------------------
 * The homepage's row of solution cards.
 *
 * THE CARD IS SolutionNeedCard, shared with the solutions page's own "by
 * business need" grid, so the two are the same card by construction. This
 * file owns the heading, the grid and the diagonal stagger.
 *
 * It previously rendered a different card — a coloured top rule over a photo —
 * whose photo was one placeholder repeated across every entry. See the note in
 * content/solutions.ts.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

export function Solutions() {
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
    <section id="solutions" className="bg-surface-subtle py-section-lg">
      <Container width="hero">
        {/* ============================== Header ======================== */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "font-mono text-[0.625rem] font-semibold uppercase",
                "tracking-[0.16em] text-brand-700 sm:text-[0.6875rem]",
              )}
            >
              {solutions.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.08)}
              className={cn(
                "mt-5 font-display font-bold tracking-[-0.025em]",
                "leading-[1.08] text-neutral-900",
                // Measured from the design at ~39px on a 1440 frame.
                "text-[1.75rem] sm:text-[2.125rem] xl:text-[2.4375rem]",
              )}
            >
              {/* `inline lg:block` puts the break where the design has it
                  without forcing two fixed lines onto a narrow screen. */}
              {solutions.headline.map((line, index) => (
                <span key={line} className="inline lg:block">
                  {line}
                  {index === 0 ? " " : null}
                </span>
              ))}
            </motion.h2>
          </div>

          <motion.div {...rise(0.16)} className="lg:pb-2">
            <Link
              href={solutions.link.href}
              className={cn(
                "group inline-flex items-center gap-2 rounded-md",
                "text-[0.9375rem] font-semibold text-brand-700",
                "duration-fast transition-colors hover:text-brand-800",
              )}
            >
              {solutions.link.label}
              <ArrowRightIcon
                className={cn(
                  "duration-normal size-4 transition-transform ease-out",
                  "group-hover:translate-x-1",
                )}
              />
            </Link>
          </motion.div>
        </div>

        {/* =============================== Grid ======================== */}
        {/* Gap and rhythm match the solutions page's grid, so a reader
            meeting both sees one treatment. */}
        <ul
          className={cn(
            "mt-12 grid grid-cols-1 gap-6",
            "sm:grid-cols-2 lg:mt-14 lg:grid-cols-3",
          )}
        >
          {solutions.items.map((item, index) => {
            // Diagonal stagger: cards further from the top-left start later.
            const column = index % 3;
            const row = Math.floor(index / 3);

            return (
              <motion.li
                key={item.title}
                initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: reduce ? 0 : 0.55,
                  delay: reduce ? 0 : 0.06 * (column + row),
                  ease: easeOut,
                }}
                className="h-full"
              >
                <SolutionNeedCard item={item} />
              </motion.li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
