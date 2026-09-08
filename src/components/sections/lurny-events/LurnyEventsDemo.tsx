"use client";

import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { LeadForm } from "@/components/ui/LeadForm";
import { lurnyEvents } from "@/content/lurny-events";
import { cn } from "@/lib/utils";

import { BubbleIcon, ClockIcon } from "./LurnyEventsIcons";

/**
 * LURNYEVENTS — BOOK A DEMO
 * ---------------------------------------------------------------------------
 * Section 4: the pitch on the left, the booking form on a card to the right.
 *
 * THE FORM IS THE SHARED LeadForm, not a copy of one — same fields, validation,
 * focus management and success state as every other page's booking form. This
 * design asks for the standard five: two text fields, two selects and a
 * free-text detail, so it needs none of the optional slots that the Industries,
 * LurnyKxP and LurnySense designs grew. Only the copy differs, and that lives
 * in content/lurny-events.ts.
 *
 * Its submit is still not wired to any destination; that TODO is one fix for
 * the whole site rather than one per page. See components/ui/LeadForm.tsx.
 *
 * THE LILAC SHAPES ARE CSS, NOT IMAGES
 * The design puts a soft blob in the top-right and another in the bottom-left.
 * They are large, soft and flat — blurred gradients cost nothing, stay crisp
 * at any viewport, and avoid shipping two more rasters for what is a colour
 * and a radius. Their violet is sampled from the design.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { demo } = lurnyEvents;

/** Point icons, keyed by the name in the content file. */
const pointIcons = {
  clock: ClockIcon,
  bubble: BubbleIcon,
} as const;

export function LurnyEventsDemo() {
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
      // The hero's "See it in action" CTA can point here.
      id="demo"
      className="relative overflow-hidden bg-[#faf7f2] py-20 text-neutral-900 lg:py-24"
    >
      {/* The soft lilac shapes, top-right and bottom-left, as in the design. */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -top-40 -right-32",
          "h-[26rem] w-[34rem] rounded-full bg-[#d9c8f5]/70 blur-3xl",
        )}
      />
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -bottom-44 -left-36",
          "h-[24rem] w-[32rem] rounded-full bg-[#e3d6f7]/70 blur-3xl",
        )}
      />

      <Container width="hero" className="relative">
        <div
          className={cn(
            "grid items-center gap-12",
            // The form needs the greater share: five fields and a textarea
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
                "text-[#7c3aed] sm:text-xs",
              )}
            >
              {demo.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.08)}
              className={cn(
                "mt-6 font-display font-bold tracking-[-0.03em]",
                "leading-[1.1] text-neutral-900",
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
              className="mt-9 max-w-120 border-t border-[#d8cbe8] pt-8"
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
                    {/* The design rings each icon rather than setting it
                        bare, as the LurnySense booking form does. */}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "grid size-9 shrink-0 place-items-center rounded-full",
                        "border border-[#d3c2ee] text-[#7c3aed]",
                      )}
                    >
                      <Icon className="size-4.5" />
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
              "ring-1 ring-[#e4dcf0]",
              "shadow-[0_20px_50px_-24px_rgb(45_30_70/0.22)]",
            )}
          >
            {/* `gold` is the amber this design's CTA uses — the same tone the
                LurnyBiz, LurnySense and Industries booking forms take. */}
            <LeadForm content={demo.form} tone="gold" />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
