"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { solutionsPage } from "@/content/solutions-page";
import { cn } from "@/lib/utils";

/**
 * SOLUTIONS HERO
 * ---------------------------------------------------------------------------
 * Section 1 of the solutions page: the statement on the left over a particle
 * burst that fills the right of the frame.
 *
 * THE BACKDROP
 * The burst ships as the supplied render rather than being reproduced in
 * canvas — the artwork IS the design, and a generated approximation would only
 * be a different picture. It is anchored to the right, where the design puts
 * it, and scrimmed on the left so the copy keeps its contrast over the ground.
 *
 * The image is decorative: `alt` is empty and it is hidden from assistive tech,
 * since the statement beside it carries the section's meaning.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { hero } = solutionsPage;

export function SolutionsHero() {
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
        "relative isolate overflow-hidden text-white",
        // The near-black violet ground, sampled from the design. It also shows
        // through wherever the backdrop is scrimmed out.
        "bg-[#09092c]",
        // Extra top padding: this is the first section under the floating nav
        // pill, so it needs clearance the mid-page sections do not.
        "pt-28 pb-20 sm:pt-32 lg:pt-40 lg:pb-28",
      )}
    >
      {/* ========================= The backdrop ====================== */}
      {/*
        Anchored right and slightly oversized, so the burst's core sits where
        the design puts it at every width instead of drifting to the centre.
      */}
      <Image
        src={hero.backdrop.src}
        alt={hero.backdrop.alt}
        width={hero.backdrop.width}
        height={hero.backdrop.height}
        aria-hidden="true"
        // Above the fold, so it must not lazy-load.
        priority
        sizes="100vw"
        className={cn(
          "pointer-events-none absolute inset-0 -z-20 size-full",
          "object-cover object-[78%_center]",
        )}
      />

      {/* The scrim — heaviest over the copy, clearing across the burst. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: [
            "linear-gradient(90deg, rgb(9 9 44 / 0.97) 0%, rgb(9 9 44 / 0.92) 30%, rgb(9 9 44 / 0.55) 52%, rgb(9 9 44 / 0) 72%)",
            "linear-gradient(180deg, rgb(9 9 44 / 0.7) 0%, transparent 20%, transparent 74%, rgb(9 9 44 / 0.6) 100%)",
          ].join(","),
        }}
      />

      <Container width="wide" className="relative">
        {/*
          A single column: the design gives the copy the left half and lets the
          burst occupy the rest of the frame as background, so there is no
          second column to lay out.
        */}
        <div className="max-w-[52rem]">
          <motion.p
            {...rise(0)}
            className={cn(
              "text-[0.75rem] font-bold uppercase",
              "tracking-[0.2em] text-[#f3d94d] sm:text-[0.8125rem]",
            )}
          >
            {hero.eyebrow}
          </motion.p>

          <motion.h1
            {...rise(0.08)}
            className={cn(
              "mt-7 font-display font-bold tracking-[-0.035em]",
              "leading-[1.08] text-white",
              // Measured from the design at ~62px on a 1440 frame.
              "text-[2.25rem] sm:text-[3rem] xl:text-[3.875rem]",
            )}
          >
            {hero.headline.map((line, index) => (
              <span key={line} className="inline lg:block">
                {line}
                {/* The full stop closes the last line. Decorative punctuation
                    on a heading, so it is hidden from screen readers rather
                    than announced as a stray character. */}
                {index === hero.headline.length - 1 && (
                  <span aria-hidden="true">.</span>
                )}{" "}
              </span>
            ))}
          </motion.h1>

          <motion.p
            {...rise(0.16)}
            className={cn(
              "mt-7 max-w-[33rem] leading-relaxed text-pretty",
              "text-[1.0625rem] text-[#c9c4e7] sm:text-lg",
            )}
          >
            {hero.description}
          </motion.p>

          {/* --------------------------- Actions -------------------- */}
          <motion.div
            {...rise(0.24)}
            className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-5"
          >
            <Link
              href={hero.actions.primary.href}
              className={cn(
                "inline-flex h-14 items-center justify-center rounded-lg px-8",
                "bg-[#6f42c4] text-[1rem] font-semibold text-white",
                // `translate`, not `transform`: Tailwind v4 compiles the
                // translate utilities to the standalone property.
                "duration-normal transition-[background-color,box-shadow,translate] ease-out",
                "will-change-[translate]",
                "hover:-translate-y-0.5 hover:bg-[#7f4fd8]",
                "hover:shadow-[0_16px_36px_-12px_rgb(111_66_196/0.7)]",
                "active:translate-y-0",
              )}
            >
              {hero.actions.primary.label}
            </Link>

            {/* The design underlines this one rather than boxing it. The rule
                is a border on the link itself, so it tracks the text width. */}
            <Link
              href={hero.actions.secondary.href}
              className={cn(
                "inline-flex items-center border-b pb-1.5",
                "border-[#9757f3]/60 text-[1rem] font-medium text-[#9757f3]",
                "duration-normal transition-[color,border-color] ease-out",
                "hover:border-[#b98cff] hover:text-[#b98cff]",
              )}
            >
              {hero.actions.secondary.label}
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
