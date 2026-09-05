"use client";

import { motion, useReducedMotion } from "motion/react";

import { BubbleIcon, ClockIcon } from "@/components/sections/model/ModelIcons";
import { Container } from "@/components/ui/Container";
import { LeadForm } from "@/components/ui/LeadForm";
import { solutionsPage } from "@/content/solutions-page";
import { cn } from "@/lib/utils";

/**
 * SOLUTIONS — TALK TO A CAPABILITY SPECIALIST
 * ---------------------------------------------------------------------------
 * Section 7: the pitch on the left, the enquiry form on a raised white card to
 * the right — the arrangement every product page closes with.
 *
 * The form is the shared LeadForm: same fields, validation, success state and
 * accessibility work as everywhere else, with this page's own copy and the
 * design's amber button. It opts into the optional organisation field and
 * third select, since this design asks for six fields where most ask for four.
 *
 * Its submit is not wired to any destination yet; see the note at the top of
 * components/ui/LeadForm.tsx.
 *
 * The lavender blobs behind the section are the design's, drawn in CSS rather
 * than shipped as images — they cost nothing and reflow with the section
 * instead of letterboxing.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { specialist } = solutionsPage;

/** Point icons, keyed by the name in the content file. */
const pointIcons = {
  clock: ClockIcon,
  bubble: BubbleIcon,
} as const;

export function SolutionsSpecialist() {
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
      id="talk-to-a-specialist"
      className="relative overflow-hidden bg-[#fbf6f5] py-section-lg"
    >
      {/* The lavender blobs, top-right and bottom-left, as the design places
          them. */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -top-40 -right-28",
          "h-[26rem] w-[34rem] rounded-full bg-[#d6c4ea]/60 blur-3xl",
        )}
      />
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -bottom-44 -left-32",
          "h-[26rem] w-[34rem] rounded-full bg-[#ebdbf3]/70 blur-3xl",
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
                "tracking-[0.12em] text-[#8952ed] sm:text-sm",
              )}
            >
              {specialist.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.08)}
              className={cn(
                "mt-6 font-display font-bold tracking-[-0.035em]",
                "leading-[1.06] text-[#0f1339]",
                // Measured from the design at ~62px on a 1440 frame.
                "text-[2.25rem] sm:text-[2.875rem] xl:text-[3.5rem]",
              )}
            >
              {specialist.headline.map((line) => (
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
              {specialist.description}
            </motion.p>

            {/* The rule, then the two points — each behind an outlined violet
                glyph, as the design draws them. */}
            <motion.ul
              {...rise(0.24)}
              className="mt-9 max-w-112 border-t border-neutral-300/80 pt-8"
            >
              {specialist.points.map((point, index) => {
                const Icon = pointIcons[point.icon];

                return (
                  <li
                    key={point.text}
                    className={cn(
                      "flex items-start gap-4",
                      index > 0 && "mt-6",
                    )}
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-full border border-[#7a4de0]/45 text-[#7a4de0]">
                      <Icon className="size-[1.15rem]" aria-hidden="true" />
                    </span>
                    <span className="pt-1 text-[0.9375rem] leading-relaxed text-pretty text-neutral-700 sm:text-base">
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
            <LeadForm content={specialist.form} tone="accent" />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
