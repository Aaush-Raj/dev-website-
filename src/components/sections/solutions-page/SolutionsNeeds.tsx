"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { solutionsPage } from "@/content/solutions-page";
import { cn } from "@/lib/utils";

import {
  ArrowRightIcon,
  cornerGraphics,
  needIcons,
} from "./SolutionsNeedIcons";

/**
 * SOLUTIONS — BY BUSINESS NEED
 * ---------------------------------------------------------------------------
 * Section 2 of the solutions page: nine business needs in a 3x3 grid.
 *
 * THE CARD
 * Each card is a single link, not a box with a link inside it: the whole
 * surface is the target, so the arrow in the corner is decoration rather than a
 * second control. The corner ornament is clipped by the card's own rounded
 * rectangle — it is absolutely positioned at the top-right and the card carries
 * `overflow-hidden`, which is what gives the design its flush corner fills.
 *
 * The grid is 3 columns on lg, 2 on sm and 1 below that; the cards stretch to
 * equal height per row, and each card's tag row is pushed to its foot so the
 * arrows line up across a row regardless of how long a title wraps.
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
            const Icon = needIcons[item.icon];
            const Corner = cornerGraphics[item.corner];

            return (
              <motion.li
                key={item.number}
                // A short per-card stagger. Capped so the ninth card does not
                // wait on eight predecessors before it appears.
                {...rise(0.2 + Math.min(index, 5) * 0.07)}
                className="h-full"
              >
                <Link
                  href={item.href}
                  className={cn(
                    "group/card relative flex h-full flex-col overflow-hidden",
                    "rounded-2xl border border-[#eae7f2] bg-white p-5 lg:p-6",
                    "duration-normal transition-[border-color,box-shadow,translate] ease-out",
                    "will-change-[translate] hover:-translate-y-1",
                    "hover:border-[#c9b8f5]",
                    "hover:shadow-[0_24px_48px_-24px_rgb(75_32_200/0.3)]",
                    // The focus ring must clear the card's own rounding.
                    "focus-visible:ring-2 focus-visible:ring-[#4B20C8]/60",
                    "focus-visible:ring-offset-2 focus-visible:outline-none",
                  )}
                >
                  {/* The corner ornament, clipped by the card's radius. */}
                  <Corner
                    className={cn(
                      "pointer-events-none absolute -top-px -right-px",
                      "size-28 lg:size-30",
                    )}
                  />

                  {/* ------------------ Tile and number ---------------- */}
                  <span className="relative flex items-center gap-4">
                    <Icon className="size-14 shrink-0" />
                    <span className="font-mono text-[1rem] font-medium text-[#4B20C8]">
                      {item.number}
                    </span>
                  </span>

                  {/* ---------------------- The copy ------------------- */}
                  <span className="relative mt-6 block text-[1.25rem] leading-snug font-bold text-pretty text-[#0b0b16]">
                    {item.title}
                  </span>

                  <span className="relative mt-2.5 block text-[0.9375rem] leading-relaxed text-pretty text-[#4b4d5b]">
                    {item.description}
                  </span>

                  {/* ------------------ Tags and arrow ----------------- */}
                  {/* `mt-auto` pins this row to the card's foot, so the arrows
                      align across a row however the titles wrap. */}
                  <span className="relative mt-auto flex items-end justify-between gap-4 pt-6">
                    <span className="flex flex-wrap items-center gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className={cn(
                            "rounded-md border border-[#dcd2f7] px-2.5 py-1.5",
                            "font-mono text-[0.6875rem] font-medium tracking-[0.08em] uppercase",
                            "text-[#4B20C8]",
                          )}
                        >
                          {tag}
                        </span>
                      ))}
                    </span>

                    <ArrowRightIcon
                      className={cn(
                        "size-5 shrink-0 text-[#4B20C8]",
                        "duration-normal transition-[translate] ease-out",
                        "will-change-[translate] group-hover/card:translate-x-1",
                      )}
                    />
                  </span>
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
