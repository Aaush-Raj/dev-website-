"use client";

import { motion, useReducedMotion } from "motion/react";

import { CycleDiagram } from "@/components/sections/system/CycleDiagram";
import { Container } from "@/components/ui/Container";
import { system } from "@/content/system";
import { cn } from "@/lib/utils";

/**
 * SYSTEM
 * ---------------------------------------------------------------------------
 * The dark section: positioning statement beside the cycle diagram, with four
 * capability columns beneath.
 *
 * This is the page's first inverted section. Rather than flipping the semantic
 * surface tokens (which would also invert the header and every other section),
 * it paints the ink palette directly — the darkness is a property of THIS
 * section's design, not a theme change.
 *
 * The heading is set in the serif face, which appears nowhere else on the page.
 * That contrast is the point: it marks this as the narrative centre.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

export function System() {
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: {
      duration: reduce ? 0 : 0.65,
      delay: reduce ? 0 : delay,
      ease: easeOut,
    },
  });

  return (
    <section id="system" className="bg-ink-900 py-section-lg text-white">
      <Container width="hero">
        {/* ================= Statement + diagram ======================== */}
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-10 xl:gap-14">
          {/* -------------------------- Statement --------------------- */}
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "font-mono text-[0.625rem] font-medium uppercase",
                "tracking-[0.16em] text-brand-300 sm:text-[0.6875rem]",
              )}
            >
              {system.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.08)}
              className={cn(
                "mt-7 font-serif leading-[1.14] font-normal tracking-[-0.01em] text-white",
                // Measured from the design at ~55px on a 1440 frame.
                "text-[2rem] sm:text-[2.6rem] xl:text-[3.4rem]",
              )}
            >
              {system.headline}{" "}
              {/* The emphasised tail carries the amber rule, as in the hero. */}
              <span className="relative inline-block">
                <motion.span
                  aria-hidden="true"
                  className={cn(
                    "absolute -bottom-1 left-0 h-[0.09em] w-full",
                    "origin-left rounded-full bg-accent-300",
                  )}
                  initial={{ scaleX: reduce ? 1 : 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: reduce ? 0 : 0.8,
                    delay: reduce ? 0 : 0.5,
                    ease: easeOut,
                  }}
                />
                {system.underlined}
              </span>
            </motion.h2>

            <motion.p
              {...rise(0.18)}
              className="mt-8 max-w-[32rem] leading-relaxed text-pretty text-neutral-300"
            >
              {system.description}
            </motion.p>
          </div>

          {/* --------------------------- Diagram ---------------------- */}
          <div className="lg:aspect-square lg:max-h-[34rem] lg:w-full lg:justify-self-end">
            <CycleDiagram className="h-full" />
          </div>
        </div>

        {/* ================= Capability columns ========================= */}
        {/* Divider rule, then four columns separated by vertical hairlines —
            matching the design's ledger treatment. */}
        <ol
          className={cn(
            "mt-section grid gap-x-8 gap-y-10 border-t border-white/10 pt-12",
            "sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-0",
          )}
        >
          {system.capabilities.map((item, index) => (
            <motion.li
              key={item.title}
              className={cn(
                "lg:px-8 lg:first:pl-0 lg:last:pr-0",
                "lg:border-l lg:border-white/10 lg:first:border-l-0",
              )}
              {...rise(0.1 + index * 0.08)}
            >
              {/* The <ol> conveys order; this numeral is its visual echo. */}
              <span
                aria-hidden="true"
                className="font-mono text-sm font-medium text-brand-300"
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <h3 className="mt-4 text-[1.0625rem] font-semibold text-white">
                {item.title}
              </h3>

              <p className="mt-2.5 text-sm leading-relaxed text-pretty text-neutral-400">
                {item.description}
              </p>
            </motion.li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
