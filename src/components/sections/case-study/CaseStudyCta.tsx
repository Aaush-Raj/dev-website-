"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { ArrowRightIcon } from "@/components/sections/hero/DashboardIcons";
import { Container } from "@/components/ui/Container";
import { caseStudy } from "@/content/case-study";
import { cn } from "@/lib/utils";

/**
 * CASE STUDY CTA
 * ---------------------------------------------------------------------------
 * The dark close of the case study: a question, a line of context, and two
 * links — the primary action and a route back to the stories index.
 *
 * Narrow by design. This is the end of a long read, so the measure stays
 * short rather than opening out to the full container width.
 */

const { cta } = caseStudy;

const easeOut = [0.16, 1, 0.3, 1] as const;

export function CaseStudyCta() {
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
    <section className="bg-[#151515] py-section-lg text-white">
      <Container width="narrow">
        <motion.h2
          {...rise(0)}
          className={cn(
            "font-serif font-semibold tracking-[-0.01em]",
            "leading-[1.16] text-balance",
            "text-[1.75rem] sm:text-[2rem]",
          )}
        >
          {cta.headline}
        </motion.h2>

        <motion.p
          {...rise(0.08)}
          className={cn(
            "mt-5 max-w-[34rem] leading-relaxed text-pretty",
            "text-[1rem] text-neutral-300",
          )}
        >
          {cta.description}
        </motion.p>

        <motion.div
          {...rise(0.16)}
          className="mt-9 flex flex-col items-start gap-6"
        >
          <Link
            href={cta.primary.href}
            className={cn(
              "group inline-flex h-12 items-center gap-2.5 rounded-full px-7",
              "bg-brand-600 text-[0.9375rem] font-semibold text-white",
              // `translate`, not `transform`: Tailwind v4 compiles the
              // translate utilities to the standalone property.
              "duration-normal transition-[background-color,box-shadow,translate] ease-out",
              "will-change-[translate]",
              "hover:-translate-y-0.5 hover:bg-brand-500",
              "hover:shadow-[0_16px_34px_-14px_rgb(127_82_220/0.7)]",
              "focus-visible:ring-2 focus-visible:ring-brand-300",
              "focus-visible:ring-offset-2 focus-visible:ring-offset-[#151515]",
              "focus-visible:outline-none",
            )}
          >
            {cta.primary.label}
            <ArrowRightIcon
              className={cn(
                "duration-normal size-4 transition-transform ease-out",
                "group-hover:translate-x-1",
              )}
            />
          </Link>

          <Link
            href={cta.back.href}
            className={cn(
              "group inline-flex items-center gap-2 text-[0.875rem]",
              "text-neutral-400",
              "duration-normal transition-colors ease-out",
              "hover:text-white",
              "focus-visible:rounded-sm focus-visible:ring-2",
              "focus-visible:ring-brand-300 focus-visible:outline-none",
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                "duration-normal transition-transform ease-out",
                "group-hover:-translate-x-1",
              )}
            >
              ←
            </span>
            {cta.back.label}
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
