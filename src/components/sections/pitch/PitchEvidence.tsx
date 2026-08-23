"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { pitch } from "@/content/pitch";
import { cn } from "@/lib/utils";

/**
 * PITCH EVIDENCE
 * ---------------------------------------------------------------------------
 * Section 5 of the LurnyPitch page: copy and three numbered steps on the left,
 * the mobile app screens on the right, on a deep violet-black ground.
 *
 * THE IMAGE
 * The screens come as one composed asset whose background is this section's
 * own near-black, with the violet glow and arc flourishes already in it. So
 * the section ground is set to match the asset rather than the other way
 * round — that is why the background colour here is sampled from the file's
 * own corners (#030308) instead of reusing an ink token. Change one without
 * the other and a visible seam appears around the image.
 *
 * The steps are titles only: the design gives them a numeral, a divider rule
 * and a label, with no body copy.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { evidence } = pitch;

export function PitchEvidence() {
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
    <section className="overflow-hidden bg-[#030308] py-section-lg text-white">
      <Container width="hero">
        <div
          className={cn(
            "grid items-center gap-12",
            // The screens take slightly more of the row than the copy, which
            // is the balance the design strikes — the phones are the subject
            // here, not an accompaniment.
            "lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1fr)] lg:gap-8",
          )}
        >
          {/* ============================= Copy ======================== */}
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "text-[0.6875rem] font-bold uppercase",
                "tracking-[0.14em] text-brand-400 sm:text-xs",
              )}
            >
              {evidence.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.08)}
              className={cn(
                "mt-7 font-display font-bold tracking-[-0.03em]",
                "leading-[1.08] text-white",
                // Measured from the design at ~58px on a 1440 frame.
                "text-[2rem] sm:text-[2.5rem] xl:text-[3.625rem]",
              )}
            >
              {evidence.headline.map((line) => (
                <span key={line} className="inline lg:block">
                  {line}{" "}
                </span>
              ))}
            </motion.h2>

            <motion.p
              {...rise(0.16)}
              className={cn(
                "mt-7 max-w-136 leading-relaxed text-pretty",
                "text-[0.9375rem] text-neutral-300 sm:text-base",
              )}
            >
              {evidence.description}
            </motion.p>

            {/* ---------------------------- Steps ---------------------- */}
            {/* An <ol>: the order is meaningful, and the numerals come from
                the data rather than a CSS counter so they are real text. */}
            <ol className="mt-10 flex flex-col gap-5">
              {evidence.steps.map((step, index) => (
                <motion.li
                  key={step}
                  initial={reduce ? "shown" : "hidden"}
                  whileInView="shown"
                  viewport={{ once: true, amount: "some" }}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    shown: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.55,
                        delay: 0.24 + index * 0.09,
                        ease: easeOut,
                      },
                    },
                  }}
                  className="flex items-center gap-6"
                >
                  <span
                    className={cn(
                      "font-display text-[1.75rem] font-bold tracking-[-0.02em]",
                      "w-10 shrink-0 text-brand-400 tabular-nums",
                      "sm:text-[2rem]",
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Divider between the numeral and the label, per the
                      design — a short vertical rule, not a full-width one. */}
                  <span
                    aria-hidden="true"
                    className="h-8 w-px shrink-0 bg-white/20"
                  />

                  <span className="text-pretty text-white sm:text-lg">
                    {step}
                  </span>
                </motion.li>
              ))}
            </ol>

            <motion.p
              {...rise(0.5)}
              className="mt-10 text-[0.9375rem] text-pretty text-neutral-400"
            >
              {evidence.footnote}
            </motion.p>
          </div>

          {/* ============================ Screens ====================== */}
          <motion.div
            initial={reduce ? "shown" : "hidden"}
            whileInView="shown"
            viewport={{ once: true, amount: "some" }}
            variants={{
              hidden: { opacity: 0, y: 24 },
              shown: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, delay: 0.2, ease: easeOut },
              },
            }}
            // Bleeds slightly past the container on lg+, as the design does.
            className="lg:-mr-[max(1rem,calc((100vw-var(--width-hero))/2))]"
          >
            <Image
              src={evidence.image.src}
              alt={evidence.image.alt}
              width={evidence.image.width}
              height={evidence.image.height}
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="h-auto w-full"
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
