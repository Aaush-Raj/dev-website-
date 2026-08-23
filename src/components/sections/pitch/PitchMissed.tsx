"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { ArrowRightIcon } from "@/components/sections/hero/DashboardIcons";
import { Container } from "@/components/ui/Container";
import { pitch } from "@/content/pitch";
import { cn } from "@/lib/utils";

/**
 * PITCH MISSED
 * ---------------------------------------------------------------------------
 * Section 3 of the LurnyPitch page, on the near-black ground: copy and the
 * product shot up top, three numbered steps across the foot, then a CTA.
 *
 * LAYOUT
 * The upper half is a two-column grid on lg — copy left, screenshot right.
 * The steps below run as three columns on lg, divided by vertical rules as in
 * the design, and stack to one column below that. The rules are left borders
 * on the second and third items rather than a wrapper per column, so they
 * appear only BETWEEN items and never as a stray edge.
 *
 * The screenshot's own violet border is part of the asset, so nothing here
 * frames it — a second border would double up.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { missed } = pitch;

export function PitchMissed() {
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
    <section className="overflow-hidden bg-[#0b0a0f] py-section-lg text-white">
      <Container width="hero">
        {/* ========================= Copy and shot ==================== */}
        <div
          className={cn(
            "grid items-start gap-10",
            "lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1fr)] lg:gap-12",
          )}
        >
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "text-[0.6875rem] font-bold uppercase",
                "tracking-[0.12em] text-brand-400 sm:text-xs",
              )}
            >
              {missed.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.08)}
              className={cn(
                "mt-6 font-display font-medium tracking-[-0.025em]",
                // The design sets this lighter and more open than the
                // light-ground headings — large white type on near-black
                // needs less weight to carry the same emphasis.
                "leading-[1.14] text-white",
                // Measured from the design at ~54px on a 1440 frame.
                "text-[1.875rem] sm:text-[2.375rem] xl:text-[3.375rem]",
              )}
            >
              {missed.headline.map((line) => (
                <span key={line} className="inline lg:block">
                  {line}{" "}
                </span>
              ))}
            </motion.h2>

            <motion.p
              {...rise(0.16)}
              className={cn(
                "mt-8 max-w-[29rem] leading-relaxed text-pretty",
                "text-[0.9375rem] text-neutral-400 sm:text-base",
              )}
            >
              {missed.description}
            </motion.p>
          </div>

          {/* The shot bleeds past the container's right edge on lg+, as in
              the design; fully inside the gutter below that. */}
          <motion.div
            initial={reduce ? "shown" : "hidden"}
            whileInView="shown"
            viewport={{ once: true, amount: "some" }}
            variants={{
              hidden: { opacity: 0, y: 24 },
              shown: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, delay: 0.18, ease: easeOut },
              },
            }}
            className="lg:-mr-[max(1.5rem,calc((100vw-var(--width-hero))/2+1.5rem))]"
          >
            <Image
              src={missed.image.src}
              alt={missed.image.alt}
              width={missed.image.width}
              height={missed.image.height}
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="h-auto w-full"
            />
          </motion.div>
        </div>

        {/* ============================ Steps ========================= */}
        {/* An <ol>: the order is meaningful, and the numerals come from the
            data rather than a CSS counter so they are real text. */}
        <ol
          className={cn(
            "mt-14 grid gap-10",
            "lg:mt-20 lg:grid-cols-3 lg:gap-0",
          )}
        >
          {missed.steps.map((step, index) => (
            <motion.li
              key={step.title}
              initial={reduce ? "shown" : "hidden"}
              whileInView="shown"
              viewport={{ once: true, amount: "some" }}
              variants={{
                hidden: { opacity: 0, y: 18 },
                shown: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.55,
                    delay: 0.1 + index * 0.09,
                    ease: easeOut,
                  },
                },
              }}
              className={cn(
                // The divider is a LEFT border on every item but the first,
                // so rules fall between columns and never at the outer edge.
                index > 0 && "lg:border-l lg:border-white/12 lg:pl-10",
                index < missed.steps.length - 1 && "lg:pr-10",
              )}
            >
              <div className="flex items-baseline gap-4">
                <span
                  className={cn(
                    "font-display text-[1.375rem] font-medium",
                    "text-brand-400 tabular-nums",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg font-medium text-pretty text-white sm:text-xl">
                  {step.title}
                </h3>
              </div>

              {/* Indented by the numeral's column width so the body copy
                  starts under the TITLE, not under the number. Measured to
                  match the numeral plus its gap at this size. */}
              <p
                className={cn(
                  "mt-3 leading-relaxed text-pretty text-neutral-400",
                  "pl-[2.6rem] text-[0.9375rem]",
                )}
              >
                {step.description}
              </p>
            </motion.li>
          ))}
        </ol>

        {/* ============================ Action ======================== */}
        <motion.div {...rise(0.3)} className="mt-12 lg:mt-14">
          <Link
            href={missed.action.href}
            className={cn(
              "group inline-flex items-center gap-3 rounded-lg",
              "border border-white/20 px-7 py-4",
              "text-[0.9375rem] font-medium text-white",
              // `translate`, not `transform`: Tailwind v4 compiles the
              // translate utilities to the standalone property.
              "duration-normal transition-[background-color,border-color,translate] ease-out",
              "will-change-[translate]",
              "hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/5",
              "active:translate-y-0",
            )}
          >
            {missed.action.label}
            <ArrowRightIcon
              className={cn(
                "duration-normal size-4 transition-transform ease-out",
                "group-hover:translate-x-1",
              )}
            />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
