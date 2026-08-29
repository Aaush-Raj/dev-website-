"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { ArrowRightIcon } from "@/components/sections/hero/DashboardIcons";
import { Container } from "@/components/ui/Container";
import { insights } from "@/content/insights";
import { cn } from "@/lib/utils";

/**
 * INSIGHTS HERO
 * ---------------------------------------------------------------------------
 * Section 1 of the Insights page: copy on the left over a full-bleed
 * illustration of a staircase climbing to a star.
 *
 * THE ILLUSTRATION
 * Shipped as an image rather than drawn: it is a rendered scene with figures
 * and hand-drawn glyphs, not a diagram that markup could reproduce. It is
 * `priority` because it is this page's LCP background.
 *
 * Its left third is already near-black, so the copy needs only a light scrim
 * rather than the heavy gradient a bright photograph would demand.
 *
 * Anchored RIGHT and sized to the section's height. The staircase and the two
 * figures all sit in the right two-thirds of the artwork, so cropping from
 * the left keeps the whole subject in frame at any width — centring it would
 * push the star off the top corner on narrow screens.
 *
 * Below lg the copy sits on a flat ground with the scene faded well back:
 * stacked over the illustration the headline would land on the figures, and
 * at that width the staircase is too small to read as anything anyway.
 */

const { hero } = insights;

/** Motion's string easings are not typed, so the cubic curve is spelled out. */
const easeOut = [0.16, 1, 0.3, 1] as const;

export function InsightsHero() {
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
        "relative isolate overflow-hidden bg-[#08070c] text-white",
        // Clearance for the floating nav pill, which overlays the page.
        "pt-28 pb-20 sm:pt-32 lg:pt-44 lg:pb-28",
        /*
          A minimum height on lg+, set from the artwork's own aspect.

          The illustration is 1672x941 (~1.78) and `object-cover` crops
          whatever the section does not give it. At the copy's natural height
          that crop took the star off the top of the staircase — which is the
          composition's focal point and the thing the figures are looking at.
        */
        "lg:min-h-[42rem] xl:min-h-[46rem]",
        // The copy sits vertically centred once the section is taller than
        // the text needs.
        "lg:grid lg:items-center",
      )}
    >
      {/* ===================== Background layers ====================== */}
      <Image
        src={hero.scene.src}
        alt={hero.scene.alt}
        aria-hidden="true"
        fill
        // This page's LCP background, so it must not lazy-load.
        priority
        sizes="100vw"
        className={cn(
          "pointer-events-none -z-10 select-none",
          /*
            TOP-right, not centre-right.

            `object-right` centres the crop vertically, which cut the star off
            the top of the staircase — the composition's focal point, and the
            thing the two figures are looking at. Anchoring to the top keeps
            it in frame at every height the section takes.
          */
          "object-cover object-[right_top]",
          // Faded well back below lg, where the copy stacks over it.
          "opacity-35 lg:opacity-100",
        )}
      />

      {/*
        Deepens the left so the copy always has ground beneath it.

        Lighter than this site's other hero scrims: the artwork's own left
        third is already near-black, so a heavy gradient here would flatten
        the staircase's glow rather than protect the text.
      */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 -z-10",
          "bg-[linear-gradient(100deg,#08070c_20%,rgb(8_7_12/0.86)_36%,rgb(8_7_12/0.35)_52%,transparent_66%)]",
        )}
      />

      <Container width="hero" className="relative">
        {/* The copy occupies the left column only; the right is left clear
            for the staircase, which is the design's whole composition. */}
        <div className="max-w-[34rem] lg:max-w-[38rem]">
          <motion.p
            {...rise(0)}
            className={cn(
              "text-[0.6875rem] font-bold tracking-[0.22em] uppercase",
              // Sampled from the design — a muted violet, lighter than the
              // CTA's fill.
              "text-[#a97fd0] sm:text-xs",
            )}
          >
            {hero.eyebrow}
          </motion.p>

          <motion.h1
            {...rise(0.08)}
            className={cn(
              "mt-6 font-display font-medium tracking-[-0.03em]",
              "leading-[1.06] text-balance",
              // Measured from the design at ~60px on a 1440 frame.
              "text-[2.25rem] sm:text-[2.875rem] xl:text-[3.75rem]",
            )}
          >
            {hero.headline.map((line) => (
              <span key={line} className="inline lg:block">
                {line}{" "}
              </span>
            ))}
          </motion.h1>

          <motion.p
            {...rise(0.16)}
            className={cn(
              "mt-7 max-w-[28rem] leading-relaxed text-pretty",
              "text-[0.9375rem] text-neutral-400 sm:text-base",
            )}
          >
            {hero.description}
          </motion.p>

          {/* --------------------------- CTAs ---------------------- */}
          <motion.div
            {...rise(0.24)}
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
          >
            <a
              href={hero.actions.primary.href}
              className={cn(
                "group inline-flex h-12 items-center gap-2.5 rounded-lg px-6",
                // Sampled from the design at #5800b1, which sits on the
                // brand ramp between 600 and 700.
                "bg-[#5800b1] text-[0.9375rem] font-semibold text-white",
                // `translate`, not `transform`: Tailwind v4 compiles the
                // translate utilities to the standalone property.
                "duration-normal transition-[background-color,box-shadow,translate] ease-out",
                "will-change-[translate]",
                "hover:-translate-y-0.5 hover:bg-[#6a12c8]",
                "hover:shadow-[0_16px_34px_-12px_rgb(88_0_177/0.85)]",
                "focus-visible:ring-2 focus-visible:ring-brand-300",
                "focus-visible:ring-offset-2 focus-visible:ring-offset-[#08070c]",
                "focus-visible:outline-none",
              )}
            >
              {hero.actions.primary.label}
              <ArrowRightIcon
                className={cn(
                  "duration-normal size-4 transition-transform ease-out",
                  "group-hover:translate-x-1",
                )}
              />
            </a>

            {/* The design sets this one as a plain underlined link rather
                than a second button. */}
            <a
              href={hero.actions.secondary.href}
              className={cn(
                "text-[0.9375rem] font-medium text-neutral-300",
                "underline decoration-neutral-600 underline-offset-[6px]",
                "duration-normal transition-colors ease-out",
                "hover:text-white hover:decoration-neutral-300",
                "focus-visible:rounded-sm focus-visible:ring-2",
                "focus-visible:ring-brand-300 focus-visible:outline-none",
              )}
            >
              {hero.actions.secondary.label}
            </a>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
