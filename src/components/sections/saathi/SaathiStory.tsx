"use client";

import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { saathi } from "@/content/saathi";
import { cn } from "@/lib/utils";

import { SaathiJourneyPanel } from "./SaathiJourneyPanel";

/**
 * SAATHI STORY
 * ---------------------------------------------------------------------------
 * Section 5 of the LurnySaathi page: "the loop in action". The statement on
 * the left, and on the right the journey panel that plays the previous
 * section's abstract loop out as one employee's record.
 *
 * LAYOUT
 * On lg the statement is sticky beside the panel — the panel is much the
 * taller column, and without it the framing would scroll away from the story
 * it frames. Same reasoning as the shared ProblemSection.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { story } = saathi;

export function SaathiStory() {
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
    <section className="relative isolate bg-[#fdf8f5] py-section-lg">
      {/* A soft warm wash, so the panel sits in light rather than on a flat
          field — the design's ground lifts slightly toward the corners. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: [
            "radial-gradient(44rem 32rem at 100% 0%, rgb(241 87 74 / 0.05), transparent 64%)",
            "radial-gradient(40rem 30rem at 0% 100%, rgb(100 109 168 / 0.05), transparent 64%)",
          ].join(","),
        }}
      />

      <Container width="wide">
        <div
          className={cn(
            "grid gap-12",
            // The panel is the wider column: it carries five rows of evidence
            // beside the statement's three short lines.
            "lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1fr)] lg:gap-14 xl:gap-20",
          )}
        >
          {/* =========================== Statement ===================== */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <motion.p
              {...rise(0)}
              className={cn(
                "font-mono text-[0.6875rem] font-medium uppercase",
                "tracking-[0.14em] text-[#f1574a] sm:text-xs",
              )}
            >
              {story.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.08)}
              className={cn(
                "mt-8 font-display font-bold tracking-[-0.035em]",
                "leading-[1.1] text-neutral-900",
                // Measured from the design at ~58px on a 1440 frame.
                "text-[2rem] sm:text-[2.5rem] xl:text-[3.375rem]",
              )}
            >
              {story.headline.map((line) => (
                <span key={line} className="inline lg:block">
                  {line}{" "}
                </span>
              ))}
            </motion.h2>

            <motion.p
              {...rise(0.16)}
              className={cn(
                "mt-8 max-w-124 leading-relaxed text-pretty",
                "text-[1.0625rem] text-neutral-600 sm:text-lg",
              )}
            >
              {story.description}
            </motion.p>

            {/* The pulled-out closing line, against the coral rule the design
                sets beside it. */}
            <motion.blockquote
              {...rise(0.24)}
              className={cn(
                "mt-10 max-w-124 border-l-2 border-[#f1574a] pl-6",
                "text-[1.0625rem] leading-relaxed text-pretty text-neutral-700",
                "sm:text-lg",
              )}
            >
              {story.pullquote}
            </motion.blockquote>
          </div>

          {/* ============================ Panel ======================== */}
          <SaathiJourneyPanel />
        </div>
      </Container>
    </section>
  );
}
