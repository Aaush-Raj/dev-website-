"use client";

import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { LeadForm } from "@/components/ui/LeadForm";
import { biz } from "@/content/biz";
import { cn } from "@/lib/utils";

import { ClockIcon, TargetArrowIcon } from "./BizIcons";

/**
 * BIZ DEMO
 * ---------------------------------------------------------------------------
 * Section 6 of the LurnyBiz page: the pitch on the left, the booking form on
 * a card to the right.
 *
 * THE FORM IS THE SHARED LeadForm, not a copy of one — same validation, focus
 * management and success state as every other page's. This design asks for
 * SIX fields, so it supplies the optional `organisation` and `selectC` the
 * form already grew for the Industries page. Every other caller omits them
 * and is unchanged.
 *
 * Its submit is still not wired to any destination; that TODO is one fix for
 * the whole site rather than one per page.
 *
 * The two blobs are the design's, drawn in CSS rather than shipped as images:
 * they are large, heavily blurred shapes that cost nothing as gradients and
 * stay crisp at any viewport. Their colours are sampled from the design — a
 * warm amber top-right and a lavender bottom-left.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { demo } = biz;

/** Point icons, keyed by the name in the content file. */
const pointIcons = {
  clock: ClockIcon,
  target: TargetArrowIcon,
} as const;

export function BizDemo() {
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
      // The hero's "Book a demo" CTA can point here.
      id="demo"
      className="relative overflow-hidden bg-[#f9f7f6] py-section-lg text-neutral-900"
    >
      {/* The two blobs, top-right and bottom-left, as in the design. */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -top-40 -right-32",
          "h-[26rem] w-[34rem] rounded-full bg-[#f8e9d1]/85 blur-3xl",
        )}
      />
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -bottom-44 -left-36",
          "h-[24rem] w-[32rem] rounded-full bg-[#e6e2f3]/85 blur-3xl",
        )}
      />

      <Container width="hero" className="relative">
        <div
          className={cn(
            "grid items-center gap-12",
            "lg:grid-cols-[minmax(0,0.68fr)_minmax(0,1.32fr)] lg:gap-12",
            "xl:gap-16",
          )}
        >
          {/* =========================== Statement ===================== */}
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "text-[0.6875rem] font-bold tracking-[0.14em] uppercase",
                "text-[#d58536] sm:text-xs",
              )}
            >
              {demo.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.08)}
              className={cn(
                "mt-6 font-display font-bold tracking-[-0.03em]",
                "leading-[1.1] text-neutral-900",
                // Measured from the design at ~50px on a 1440 frame.
                "text-[1.875rem] sm:text-[2.25rem] xl:text-[2.75rem]",
              )}
            >
              {demo.headline.map((line) => (
                <span key={line} className="inline lg:block">
                  {line}{" "}
                </span>
              ))}
            </motion.h2>

            <motion.p
              {...rise(0.16)}
              className={cn(
                "mt-6 max-w-120 leading-relaxed text-pretty",
                "text-[0.9375rem] text-neutral-600 sm:text-base",
              )}
            >
              {demo.description}
            </motion.p>

            {/* Rule, then the two icon points. */}
            <motion.ul
              {...rise(0.24)}
              className="mt-9 max-w-120 border-t border-neutral-300/80 pt-8"
            >
              {demo.points.map((point, index) => {
                const Icon = pointIcons[point.icon];

                return (
                  <li
                    key={point.text}
                    className={cn(
                      "flex items-start gap-3.5",
                      index > 0 && "mt-5",
                    )}
                  >
                    <Icon
                      className="mt-0.5 size-5 shrink-0 text-[#6b5bb8]"
                      aria-hidden="true"
                    />
                    <span className="text-[0.9375rem] leading-relaxed text-pretty text-neutral-700">
                      {point.text}
                    </span>
                  </li>
                );
              })}
            </motion.ul>
          </div>

          {/* ============================= Form ======================== */}
          {/* A white card with a hairline, per the design — the form's own
              panel sits inside it. */}
          <motion.div
            {...rise(0.2)}
            className={cn(
              "rounded-2xl bg-white p-2 sm:p-2.5",
              "ring-1 ring-neutral-200/80",
              "shadow-[0_20px_50px_-24px_rgb(45_35_25/0.22)]",
            )}
          >
            {/* `gold` is the softer amber this design's CTA uses — the same
                tone the LurnyMagic and Industries booking forms take. */}
            <LeadForm content={demo.form} tone="gold" />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
