"use client";

import { motion, useReducedMotion } from "motion/react";

import { BubbleIcon, ClockIcon } from "@/components/sections/model/ModelIcons";
import { Container } from "@/components/ui/Container";
import { LeadForm } from "@/components/ui/LeadForm";
import { chat } from "@/content/chat";
import { cn } from "@/lib/utils";

/**
 * CHAT DEMO
 * ---------------------------------------------------------------------------
 * Section 6 of the LurnyChat page: the pitch on the left, the booking form on a
 * raised white card to the right.
 *
 * The form is the shared LeadForm — same fields, validation and success state
 * as every other product page, with this page's own copy and an amber button
 * per the design. Its submit is not wired to any destination yet; see the note
 * at the top of components/ui/LeadForm.tsx.
 *
 * The soft lavender blobs behind the section are the design's, drawn in CSS
 * rather than shipped as images.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { demo } = chat;

/** Point icons, keyed by the name in the content file. */
const pointIcons = {
  clock: ClockIcon,
  bubble: BubbleIcon,
} as const;

export function ChatDemo() {
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
      id="demo"
      className="relative overflow-hidden bg-[#f7f3ee] py-section-lg"
    >
      {/* Lavender blobs, top-right and bottom-left, as in the design. */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -top-32 -right-24",
          "h-[26rem] w-[34rem] rounded-full bg-brand-200/45 blur-3xl",
        )}
      />
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -bottom-40 -left-32",
          "h-[24rem] w-[32rem] rounded-full bg-brand-200/40 blur-3xl",
        )}
      />

      <Container width="hero" className="relative">
        <div
          className={cn(
            "grid items-center gap-12",
            "lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1fr)] lg:gap-16",
          )}
        >
          {/* =========================== Statement ===================== */}
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "text-[0.6875rem] font-bold uppercase",
                "tracking-[0.12em] text-brand-600 sm:text-xs",
              )}
            >
              {demo.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.08)}
              className={cn(
                "mt-6 font-display font-bold tracking-[-0.03em]",
                "leading-[1.08] text-neutral-900",
                "text-[2.25rem] sm:text-[2.875rem] xl:text-[3.375rem]",
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
                "mt-6 max-w-108 leading-relaxed text-pretty",
                "text-[1.0625rem] text-neutral-600 sm:text-lg",
              )}
            >
              {demo.description}
            </motion.p>

            {/* Rule, then the two icon points — each in a circular violet chip. */}
            <motion.ul
              {...rise(0.24)}
              className="mt-8 max-w-108 border-t border-neutral-300/80 pt-7"
            >
              {demo.points.map((point, index) => {
                const Icon = pointIcons[point.icon];

                return (
                  <li
                    key={point.text}
                    className={cn(
                      "flex items-center gap-3.5",
                      index > 0 && "mt-5",
                    )}
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-600">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="text-[0.9375rem] leading-relaxed text-pretty text-neutral-700 sm:text-base">
                      {point.text}
                    </span>
                  </li>
                );
              })}
            </motion.ul>
          </div>

          {/* ============================= Form ======================== */}
          {/* A white frame with a violet hairline, per the design — the form's
              own panel sits inside it. */}
          <motion.div
            {...rise(0.2)}
            className={cn(
              "rounded-2xl bg-white p-2 sm:p-2.5",
              "ring-1 ring-brand-200/70",
              "shadow-[0_20px_50px_-24px_rgb(45_25_90/0.24)]",
            )}
          >
            <LeadForm content={demo.form} tone="gold" />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
