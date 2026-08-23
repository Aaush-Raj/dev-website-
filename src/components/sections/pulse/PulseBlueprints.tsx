"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { pulse } from "@/content/pulse";
import { cn } from "@/lib/utils";

import { PulseBlueprint } from "./PulseBlueprint";

/**
 * PULSE BLUEPRINTS
 * ---------------------------------------------------------------------------
 * Section 4 of the LurnyPulse page: the statement on the left, the role
 * blueprint diagram on the right.
 *
 * The section is deliberately quiet — near-white ground, line-art diagram, one
 * outlined button. It follows section 3, which is photographic and carries a
 * dark modal, so the contrast between them is the point: this one reads as a
 * specification rather than a product shot.
 *
 * The headline is set in Playfair, the site's serif, at a large size — as the
 * design shows. It is the only place on this page the serif appears at that
 * scale, and that is what gives the section its editorial feel.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { blueprints } = pulse;

export function PulseBlueprints() {
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
    <section className="bg-[#fdfdfd] py-section-lg">
      <Container width="hero">
        <div
          className={cn(
            "grid items-center gap-14",
            "lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1fr)] lg:gap-16",
            "xl:gap-20",
          )}
        >
          {/* =========================== Statement ===================== */}
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "text-[0.6875rem] font-bold uppercase",
                "tracking-[0.18em] text-neutral-500 sm:text-xs",
              )}
            >
              {blueprints.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.08)}
              className={cn(
                // The serif, not the page's usual display sans. This is the
                // one place on the page it appears at size, and it is what
                // gives the section its editorial, specification-like feel —
                // deliberately unlike the product-shot sections around it.
                "mt-8 font-serif font-normal tracking-[-0.005em]",
                "leading-[1.06] text-neutral-900",
                // Measured from the design at ~64px on a 1440 frame.
                "text-[2.25rem] sm:text-[2.875rem] xl:text-[3.875rem]",
              )}
            >
              {blueprints.headline.map((line) => (
                <span key={line} className="inline lg:block">
                  {line}{" "}
                </span>
              ))}
            </motion.h2>

            <motion.p
              {...rise(0.16)}
              className={cn(
                "mt-8 max-w-88 leading-relaxed text-pretty",
                "text-[1.0625rem] text-neutral-600 sm:text-lg",
              )}
            >
              {blueprints.description}
            </motion.p>

            <motion.div {...rise(0.24)} className="mt-9">
              <Link
                href={blueprints.action.href}
                className={cn(
                  "group inline-flex items-center gap-6 rounded-md",
                  "border border-neutral-900 px-7 py-4",
                  "text-[0.9375rem] font-medium text-neutral-900",
                  // `translate`, not `transform`: Tailwind v4 compiles the
                  // translate utilities to the standalone property.
                  "duration-normal transition-[background-color,color,translate] ease-out",
                  "will-change-[translate]",
                  "hover:-translate-y-0.5 hover:bg-neutral-900 hover:text-white",
                  "active:translate-y-0",
                )}
              >
                {blueprints.action.label}
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                  className={cn(
                    "size-4",
                    "duration-normal transition-[translate] ease-out",
                    "group-hover:translate-x-1",
                  )}
                >
                  <path
                    d="M2.5 8h11m0 0-4-4m4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </motion.div>
          </div>

          {/* ============================ Diagram ====================== */}
          <PulseBlueprint />
        </div>
      </Container>
    </section>
  );
}
