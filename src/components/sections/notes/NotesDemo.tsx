"use client";

import { motion, useReducedMotion } from "motion/react";

import {
  CheckCircleIcon,
  ClockIcon,
} from "@/components/sections/model/ModelIcons";
import { Container } from "@/components/ui/Container";
import { LeadForm } from "@/components/ui/LeadForm";
import { notes } from "@/content/notes";
import { cn } from "@/lib/utils";

/**
 * NOTES DEMO
 * ---------------------------------------------------------------------------
 * Section 5 of the LurnyNotes page: the pitch on the left, the booking form on
 * a raised white card to the right.
 *
 * The form is the shared LeadForm — same fields, validation and success state
 * as every other product page, with this page's own copy and the design's
 * amber button. It opts into the optional organisation field and third select,
 * since this design asks for six fields where most ask for four.
 *
 * Its submit is not wired to any destination yet; see the note at the top of
 * components/ui/LeadForm.tsx.
 *
 * The lavender and peach blobs behind the section are the design's, drawn in
 * CSS rather than shipped as images — they cost nothing and reflow with the
 * section instead of letterboxing.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { demo } = notes;

/** Point icons, keyed by the name in the content file. */
const pointIcons = {
  clock: ClockIcon,
  check: CheckCircleIcon,
} as const;

export function NotesDemo() {
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
      className="relative overflow-hidden bg-[#f9f6f7] py-section-lg"
    >
      {/* The peach blob top-right and the lavender one bottom-left, as the
          design places them. */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -top-40 -right-32",
          "h-[26rem] w-[34rem] rounded-full bg-[#fbe6cf]/70 blur-3xl",
        )}
      />
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -bottom-44 -left-36",
          "h-[26rem] w-[34rem] rounded-full bg-[#e4e0f3]/75 blur-3xl",
        )}
      />

      <Container width="hero" className="relative">
        <div
          className={cn(
            "grid items-center gap-12",
            // The form takes the wider share of the row: it carries six fields
            // in two columns where the pitch is a single measure of copy.
            "lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1fr)] lg:gap-14",
            "xl:gap-16",
          )}
        >
          {/* =========================== Statement ===================== */}
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "text-[0.75rem] font-bold uppercase",
                "tracking-[0.12em] text-[#fc6314] sm:text-sm",
              )}
            >
              {demo.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.08)}
              className={cn(
                "mt-6 font-display font-bold tracking-[-0.035em]",
                "leading-[1.06] text-neutral-950",
                // Measured from the design at ~62px on a 1440 frame.
                "text-[2.25rem] sm:text-[2.875rem] xl:text-[3.5rem]",
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
                "mt-6 max-w-112 leading-relaxed text-pretty",
                "text-[1.0625rem] text-neutral-600 sm:text-lg",
              )}
            >
              {demo.description}
            </motion.p>

            {/* The rule, then the two points — each in a circular violet
                chip, matching the design. */}
            <motion.ul
              {...rise(0.24)}
              className="mt-9 max-w-112 border-t border-neutral-300/80 pt-8"
            >
              {demo.points.map((point, index) => {
                const Icon = pointIcons[point.icon];

                return (
                  <li
                    key={point.text}
                    className={cn(
                      "flex items-start gap-4",
                      index > 0 && "mt-6",
                    )}
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-full border border-brand-300/70 text-brand-600">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="pt-1.5 text-[0.9375rem] leading-relaxed text-pretty text-neutral-700 sm:text-base">
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
              "shadow-[0_20px_50px_-24px_rgb(45_25_90/0.22)]",
            )}
          >
            <LeadForm content={demo.form} tone="accent" />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
