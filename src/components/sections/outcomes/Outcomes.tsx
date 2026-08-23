"use client";

import { motion, useReducedMotion } from "motion/react";

import { OutcomesChart } from "@/components/sections/outcomes/OutcomesChart";
import { Container } from "@/components/ui/Container";
import { outcomes } from "@/content/outcomes";
import { cn } from "@/lib/utils";

/**
 * OUTCOMES
 * ---------------------------------------------------------------------------
 * Four headline metrics beside a grouped bar chart — the section that puts
 * numbers behind the claims the rest of the page makes.
 *
 * LAYOUT
 * On lg the stats and the chart sit side by side, the stats taking slightly
 * more of the row (the design measures roughly 5:4). Below lg the chart drops
 * beneath the stats, which fall to two columns and then one.
 *
 * Each stat is a block with a coloured left rule rather than a card. The
 * design deliberately avoids boxes here — after eight sections of cards, the
 * bare figures on the page ground read as evidence rather than as more
 * marketing furniture.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

/** Left-rule colour per stat, keyed by the tone in the content file. */
const toneRules = {
  brand: "bg-brand-600",
  accent: "bg-accent-400",
} as const;

export function Outcomes() {
  const reduce = useReducedMotion();

  /**
   * The section's shared entrance.
   *
   * Expressed as named variants rather than inline `whileInView` objects so
   * that a parent can drive its children by name — the stat blocks need this,
   * because their left rule animates as part of the same gesture and must not
   * own a second, independently-racing observer.
   *
   * Under reduced motion the element mounts already in `shown`, so nothing
   * moves and nothing depends on an observer firing at all.
   */
  const rise = (delay: number) => ({
    initial: reduce ? "shown" : "hidden",
    whileInView: "shown",
    // `as const` keeps "some" from widening to string, which would not match
    // motion's ViewportOptions union.
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
    <section id="outcomes" className="bg-surface-raised py-section-lg">
      <Container width="hero">
        {/* ============================== Header ======================== */}
        <motion.p
          {...rise(0)}
          className={cn(
            "font-mono text-[0.625rem] font-medium uppercase",
            "tracking-[0.16em] text-brand-600 sm:text-[0.6875rem]",
          )}
        >
          {outcomes.eyebrow}
        </motion.p>

        <motion.h2
          {...rise(0.08)}
          className={cn(
            "mt-5 font-display font-extrabold tracking-[-0.03em]",
            // Design: ~44px type on a ~50px line box.
            "leading-[1.12] text-neutral-900",
            "text-[2rem] sm:text-[2.5rem] xl:text-[2.75rem]",
            // Keeps the two-line break of the design without a hard <br>,
            // which would still break at that point on a phone.
            "max-w-[20ch]",
          )}
        >
          {/* Lines break where the design breaks them on lg+, and wrap
              naturally below that. */}
          {outcomes.headline.map((line) => (
            <span key={line} className="inline lg:block">
              {line}{" "}
            </span>
          ))}
        </motion.h2>

        {/* ======================= Stats and chart ====================== */}
        <div
          className={cn(
            "mt-12 grid gap-x-10 gap-y-12",
            "lg:mt-16 lg:grid-cols-[minmax(0,1.06fr)_minmax(0,1fr)] lg:gap-x-16",
          )}
        >
          {/* ----------------------- Stat grid ------------------------- */}
          <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 sm:gap-y-14">
            {outcomes.stats.map((stat, index) => (
              <motion.li
                key={stat.label}
                {...rise(0.16 + index * 0.08)}
                className="group relative pl-5"
              >
                {/*
                  The rule draws downward on entry. It rides the parent's
                  `rise` variant rather than carrying its own `whileInView`:
                  with `once: true`, separate observers on four tall blocks
                  raced and some rules stayed stuck at `scaleY(0)`. One
                  trigger per stat, propagated by variant name, is reliable.
                */}
                <motion.span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-y-0 left-0 w-[2px] origin-top rounded-full",
                    toneRules[stat.tone],
                    // A restrained widen on hover, matching the hover
                    // language established in sections 7 and 8.
                    "transition-[width] duration-[380ms] ease-out",
                    "group-hover:w-[3px] group-hover:duration-[520ms]",
                  )}
                  variants={{
                    hidden: { scaleY: 0 },
                    shown: {
                      scaleY: 1,
                      transition: {
                        duration: 0.7,
                        delay: 0.24 + index * 0.08,
                        ease: easeOut,
                      },
                    },
                  }}
                />

                {/* The figure. `items-baseline` sits the suffix on the
                    numeral's baseline, as the design does, rather than
                    centring it against the cap height. */}
                <p className="flex items-baseline gap-[0.06em]">
                  <span
                    className={cn(
                      "font-display font-bold tracking-[-0.035em]",
                      "leading-none text-neutral-900 tabular-nums",
                      // Design: ~40px on a 1440 frame.
                      "text-[2.125rem] sm:text-[2.5rem]",
                    )}
                  >
                    {stat.value}
                  </span>
                  {stat.suffix && (
                    <span
                      className={cn(
                        "font-display font-medium tracking-[-0.01em]",
                        "leading-none text-neutral-900",
                        // Roughly half the numeral, as measured.
                        "text-[1.0625rem] sm:text-[1.1875rem]",
                      )}
                    >
                      {stat.suffix}
                    </span>
                  )}
                </p>

                <p className="mt-3.5 text-[0.9375rem] leading-snug text-pretty text-neutral-800">
                  {stat.label}
                </p>

                <p
                  className={cn(
                    "mt-3 font-mono text-[0.6875rem] leading-relaxed",
                    "text-pretty text-neutral-500",
                  )}
                >
                  {stat.footnote}
                </p>
              </motion.li>
            ))}
          </ul>

          {/* ------------------------- Chart --------------------------- */}
          <motion.div {...rise(0.2)}>
            <OutcomesChart />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
