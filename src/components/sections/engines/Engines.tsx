"use client";

import { motion, useReducedMotion } from "motion/react";

import { engineIcons } from "@/components/sections/engines/EngineIcons";
import { Container } from "@/components/ui/Container";
import { engines } from "@/content/engines";
import { cn } from "@/lib/utils";

/**
 * ENGINES
 * ---------------------------------------------------------------------------
 * The product grid: a split header (heading left, supporting copy right) over
 * a 3x3 grid of engine cards.
 *
 * Each card carries a circular icon well, a category label, the product name
 * and a short description. Cards animate in on scroll with a diagonal
 * stagger, so the grid resolves from the top-left rather than all at once.
 *
 * The grid is a <ul>: nine sibling products with no inherent order.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

export function Engines() {
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
    <section id="platform" className="bg-surface-subtle py-section-lg">
      <Container width="hero">
        {/* ============================== Header ======================== */}
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-start lg:gap-16">
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "font-mono text-[0.625rem] font-semibold uppercase",
                "tracking-[0.16em] text-brand-700 sm:text-[0.6875rem]",
              )}
            >
              {engines.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.08)}
              className={cn(
                "mt-5 font-display font-extrabold tracking-[-0.03em]",
                "leading-[1.02] text-neutral-900",
                // Measured from the design at ~59px on a 1440 frame.
                "text-[2.25rem] sm:text-[2.9rem] xl:text-[3.5rem]",
              )}
            >
              {/*
                The design breaks after "one". `inline lg:block` applies that
                break only where there is room for it — below lg the phrase
                wraps naturally instead of being forced onto two fixed lines,
                which would overflow a narrow screen.
              */}
              {engines.headline.map((line, index) => (
                <span key={line} className="inline lg:block">
                  {line}
                  {index === 0 ? " " : null}
                </span>
              ))}
            </motion.h2>
          </div>

          {/* Supporting copy sits beside the heading on lg+, level with its
              first line rather than its baseline — as in the design. */}
          <motion.p
            {...rise(0.16)}
            className="max-w-[30rem] leading-relaxed text-pretty text-neutral-600 lg:mt-3"
          >
            {engines.description}
          </motion.p>
        </div>

        {/* =============================== Grid ======================== */}
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {engines.items.map((engine, index) => {
            const Icon = engineIcons[engine.icon];

            // Diagonal stagger: cards further from the top-left start later.
            const column = index % 3;
            const row = Math.floor(index / 3);

            return (
              <motion.li
                key={engine.name}
                initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: reduce ? 0 : 0.55,
                  delay: reduce ? 0 : 0.06 * (column + row),
                  ease: easeOut,
                }}
              >
                <article
                  className={cn(
                    "flex h-full flex-col rounded-2xl border border-neutral-200/70",
                    "bg-white p-6",
                    "duration-normal transition-[border-color,box-shadow,transform] ease-out",
                    "hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md",
                  )}
                >
                  {/* Icon well and category share a row, pushed apart. */}
                  <div className="flex items-start justify-between gap-4">
                    <span
                      className={cn(
                        "grid size-14 shrink-0 place-items-center rounded-full",
                        "bg-brand-50",
                      )}
                    >
                      <Icon className="size-8" />
                    </span>

                    <span
                      className={cn(
                        "pt-1.5 text-right font-mono text-[0.5625rem] font-medium uppercase",
                        "tracking-[0.1em] text-brand-600",
                      )}
                    >
                      {engine.category}
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl font-bold tracking-[-0.015em] text-neutral-900">
                    {engine.name}
                  </h3>

                  <p className="mt-2.5 text-sm leading-relaxed text-pretty text-neutral-600">
                    {engine.description}
                  </p>
                </article>
              </motion.li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
