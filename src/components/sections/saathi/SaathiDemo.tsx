"use client";

import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { LeadForm } from "@/components/ui/LeadForm";
import { saathi } from "@/content/saathi";
import { cn } from "@/lib/utils";

import { ClockIcon, CompassIcon } from "./SaathiIcons";

/**
 * SAATHI DEMO
 * ---------------------------------------------------------------------------
 * Section 7, and the last on the LurnySaathi page: the pitch on the left, the
 * booking form on a card to the right.
 *
 * THE FORM IS THE SHARED LeadForm, not a copy of one — same validation, focus
 * management and success state as every other page's. This design asks for SIX
 * fields, so it supplies the form's optional `organisation` and `selectC`
 * alongside the two selects every caller gives it. Only "Primary employee
 * need" is validated beyond the three text fields, matching the asterisks in
 * the design: workforce size and industry carry none.
 *
 * Its submit is still not wired to any destination; that TODO is one fix for
 * the whole site rather than one per page.
 *
 * THE CORAL BUTTON is a tone added to LeadForm rather than an override here.
 * The page is built on #f76655 / #f2544f — the hero, the loop rail, the story
 * ground — and the CTA at its foot is the same colour, so it belongs with the
 * form's other tones rather than as a one-off class.
 *
 * THE TWO SHAPES bleeding in at the corners are the design's, drawn in CSS
 * rather than shipped as images: they are large, soft, flat-coloured forms
 * that cost nothing as blurred gradients and stay clean at any viewport.
 * Their blush and lilac are sampled from the design.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { demo } = saathi;

/** Point icons, keyed by the name in the content file. */
const pointIcons = {
  clock: ClockIcon,
  compass: CompassIcon,
} as const;

export function SaathiDemo() {
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
      className="relative overflow-hidden bg-[#fdf8f5] py-20 text-neutral-900 lg:py-24"
    >
      {/* The blush form top-right and the lilac one bottom-left, as in the
          design. Both are decorative. */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -top-32 -right-24",
          "h-[24rem] w-[30rem] rounded-full bg-[#f9dcd6]/70 blur-3xl",
        )}
      />
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -bottom-40 -left-32",
          "h-[26rem] w-[32rem] rounded-full bg-[#ded9f0]/70 blur-3xl",
        )}
      />

      <Container width="hero" className="relative">
        <div
          className={cn(
            "grid items-center gap-12",
            // The form needs the greater share: six fields and a textarea
            // against a claim and two points.
            "lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-12",
            "xl:gap-16",
          )}
        >
          {/* =========================== Statement ===================== */}
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "text-[0.6875rem] font-bold tracking-[0.14em] uppercase",
                "text-[#f2544f] sm:text-xs",
              )}
            >
              {demo.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.08)}
              className={cn(
                "mt-6 font-display font-bold tracking-[-0.03em]",
                "leading-[1.1] text-neutral-900",
                // Measured from the design at ~52px on a 1440 frame.
                "text-[1.875rem] sm:text-[2.25rem] xl:text-[2.875rem]",
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
              className="mt-9 max-w-120 border-t border-neutral-300/70 pt-8"
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
                    <span
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 text-[#6b6ea8]"
                    >
                      <Icon className="size-6" />
                    </span>
                    <span
                      className={cn(
                        "self-center text-[0.9375rem] leading-relaxed",
                        "text-pretty text-neutral-700",
                      )}
                    >
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
              "shadow-[0_20px_50px_-24px_rgb(45_30_35/0.22)]",
            )}
          >
            <LeadForm content={demo.form} tone="coral" />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
