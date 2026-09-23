"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { solutionsPage } from "@/content/solutions-page";
import { cn } from "@/lib/utils";

import { SolutionNeedCard } from "@/components/ui/SolutionNeedCard";

import { ArrowRightIcon } from "./SolutionsNeedIcons";

/**
 * SOLUTIONS — BY BUSINESS NEED
 * ---------------------------------------------------------------------------
 * Section 2 of the solutions page: nine business needs in a 3x3 grid.
 *
 * THE CARD ITSELF IS SolutionNeedCard, shared with the homepage's section 6 so
 * the two are the same card by construction rather than by two copies kept in
 * step by hand. This file owns the heading, the grid and the stagger.
 *
 * The grid is 3 columns on lg, 2 on sm and 1 below that; the cards stretch to
 * equal height per row.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { needs } = solutionsPage;

export function SolutionsNeeds() {
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
    <section id="solutions" className="relative bg-white py-20 lg:py-24">
      <Container width="wide">
        {/* ========================= The heading ====================== */}
        {/*
          The link sits on the heading's baseline at the far right on lg+, and
          drops beneath the heading below that, where there is no room beside
          it.
        */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "font-mono text-[0.75rem] font-bold tracking-[0.14em] uppercase",
                "text-[#4B20C8] sm:text-[0.8125rem]",
              )}
            >
              {needs.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.08)}
              className={cn(
                "mt-5 font-display font-bold tracking-[-0.035em]",
                "leading-[1.1] text-[#0b0b16]",
                // Measured from the design at ~52px on a 1440 frame.
                "text-[1.875rem] sm:text-[2.5rem] xl:text-[3.25rem]",
              )}
            >
              {needs.headline.map((line, index) => (
                <span key={line} className="inline lg:block">
                  {line}
                  {/* The full stop closes the last line. Decorative, so it is
                      hidden rather than announced as a stray character. */}
                  {index === needs.headline.length - 1 && (
                    <span aria-hidden="true">.</span>
                  )}{" "}
                </span>
              ))}
            </motion.h2>
          </div>

          <motion.div {...rise(0.16)} className="shrink-0 lg:pb-3">
            <Link
              href={needs.link.href}
              className={cn(
                "group/link inline-flex items-center gap-2.5",
                "text-[1rem] font-medium text-[#4B20C8]",
                "duration-normal transition-[color] ease-out",
                "hover:text-[#3a15a3]",
              )}
            >
              {needs.link.label}
              <ArrowRightIcon
                className={cn(
                  "size-4.5",
                  "duration-normal transition-[translate] ease-out",
                  "will-change-[translate] group-hover/link:translate-x-1",
                )}
              />
            </Link>
          </motion.div>
        </div>

        {/* ========================== The grid ======================== */}
        <ul
          className={cn(
            "mt-12 grid grid-cols-1 gap-6",
            "sm:grid-cols-2 lg:mt-14 lg:grid-cols-3",
          )}
        >
          {needs.items.map((item, index) => {
            return (
              <motion.li
                key={item.number}
                // A short per-card stagger. Capped so the ninth card does not
                // wait on eight predecessors before it appears.
                {...rise(0.2 + Math.min(index, 5) * 0.07)}
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
