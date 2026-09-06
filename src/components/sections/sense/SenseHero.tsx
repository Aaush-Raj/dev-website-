"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { sense } from "@/content/sense";
import { cn } from "@/lib/utils";

import { SenseConversation } from "./SenseConversation";
import { SenseDashboard } from "./SenseDashboard";
import { ArrowRightIcon } from "./SenseIcons";

/**
 * SENSE HERO
 * ---------------------------------------------------------------------------
 * Section 1 of the LurnySense page: the statement on the left, and on the right
 * a dashboard with a conversation overlaid on its edge.
 *
 * THE OVERLAP
 * The design floats the conversation over the dashboard's right side, so the
 * two read as one product rather than two panels. That needs width: above lg
 * they overlap in a two-column track, below lg they stack in order — dashboard,
 * then conversation — each at full width.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { hero } = sense;

export function SenseHero() {
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
        // The near-black ground, sampled from the design.
        "bg-[#0f1517]",
        // Extra top padding: this is the first section under the floating nav
        // pill, so it needs clearance the mid-page sections do not.
        "pt-28 pb-16 sm:pt-32 lg:pt-36 lg:pb-20",
      )}
    >
      <Container width="wide" className="relative">
        <div
          className={cn(
            "grid grid-cols-1 items-center gap-14",
            // Measured from the design: the statement runs to roughly 34% of
            // the frame, the product visual takes the rest.
            "lg:grid-cols-[minmax(0,0.5fr)_minmax(0,1fr)] lg:gap-8",
            "xl:gap-14",
          )}
        >
          {/* =========================== Statement ===================== */}
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "text-[0.75rem] font-medium tracking-[0.16em] uppercase",
                "text-[#a3a9ae] sm:text-[0.8125rem]",
              )}
            >
              {hero.eyebrow}
            </motion.p>

            <motion.h1
              {...rise(0.08)}
              className={cn(
                "mt-7 font-display font-bold tracking-[-0.035em]",
                "leading-[1.06] text-white",
                // Measured from the design at ~60px on a 1440 frame.
                "text-[2.25rem] sm:text-[3rem] xl:text-[3.75rem]",
              )}
            >
              {hero.headline.map((line) => (
                <span key={line} className="block">
                  {line}
                  {/* Each line closes with an amber stop. Decorative
                      punctuation, so it is hidden from screen readers rather
                      than announced as a stray character. */}
                  <span aria-hidden="true" className="text-[#fdd386]">
                    .
                  </span>
                </span>
              ))}
            </motion.h1>

            <motion.p
              {...rise(0.16)}
              className={cn(
                "mt-7 max-w-[30rem] leading-relaxed text-pretty",
                "text-[1rem] text-[#c9d1d3] sm:text-[1.0625rem]",
              )}
            >
              {hero.description}
            </motion.p>

            {/* --------------------------- Actions -------------------- */}
            <motion.div
              {...rise(0.24)}
              className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4"
            >
              <Link
                href={hero.actions.primary.href}
                className={cn(
                  "group/cta inline-flex h-14 items-center justify-center gap-3 rounded-lg px-7",
                  "border-2 border-[#fdd386] text-[1rem] font-semibold text-[#fdd386]",
                  // `translate`, not `transform`: Tailwind v4 compiles the
                  // translate utilities to the standalone property.
                  "duration-normal transition-[background-color,color,translate] ease-out",
                  "will-change-[translate] hover:-translate-y-0.5",
                  "hover:bg-[#fdd386] hover:text-[#0f1517]",
                  "active:translate-y-0",
                )}
              >
                {hero.actions.primary.label}
                <ArrowRightIcon
                  className={cn(
                    "size-4.5",
                    "duration-normal transition-[translate] ease-out",
                    "group-hover/cta:translate-x-1",
                  )}
                />
              </Link>

              {/* The design underlines this one rather than boxing it. */}
              <Link
                href={hero.actions.secondary.href}
                className={cn(
                  "inline-flex items-center border-b pb-1.5",
                  "border-white/35 text-[1rem] font-medium text-white",
                  "duration-normal transition-[border-color] ease-out",
                  "hover:border-white",
                )}
              >
                {hero.actions.secondary.label}
              </Link>
            </motion.div>

            {/* The three capabilities, divided by middots. */}
            <motion.ul
              {...rise(0.32)}
              className="mt-10 flex flex-wrap items-center gap-x-2.5 gap-y-2"
            >
              {hero.meta.map((item, index) => (
                <li
                  key={item}
                  className="flex items-center gap-2.5 text-[0.9375rem] text-[#8b9499]"
                >
                  {item}
                  {index < hero.meta.length - 1 && (
                    <span aria-hidden="true" className="text-[#4c5457]">
                      ·
                    </span>
                  )}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* ======================= The product ======================= */}
          <motion.div {...rise(0.2)} className="relative">
            {/*
              A two-column track on lg: the dashboard takes the left, the
              conversation the right, and the conversation is pulled left so it
              sits over the dashboard's edge, as the design shows.
            */}
            <div
              className={cn(
                "grid grid-cols-1 gap-6",
                "lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:items-center lg:gap-0",
              )}
            >
              <SenseDashboard />

              <div className="relative z-10 lg:-ml-3 xl:-ml-4">
                <SenseConversation />
              </div>
            </div>

            {/* The note marking the whole visual as a mockup. It is content,
                not decoration: it tells the reader this is not live data. */}
            <p className="mt-5 text-center text-[0.75rem] text-[#6f797d]">
              {hero.disclaimer}
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
