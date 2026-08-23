"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { pitch } from "@/content/pitch";
import { cn } from "@/lib/utils";

/**
 * PITCH COACHING
 * ---------------------------------------------------------------------------
 * Section 4 of the LurnyPitch page: the copy and a three-step list on the
 * left, the composed product image on the right.
 *
 * LAYOUT
 * On lg the image sits in its own column and bleeds past the container's right
 * edge, as in the design — the screen runs off the viewport rather than being
 * fitted inside the gutter. Below lg it drops under the copy and sits fully
 * inside it.
 *
 * THE IMAGE
 * See the provenance note in content/pitch.ts — the supplied file had no real
 * transparency and was re-keyed. Nothing here compensates for that any more;
 * the fix lives in the asset itself.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { coaching } = pitch;

export function PitchCoaching() {
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
    <section className="overflow-hidden bg-[#faf7f2] py-section-lg">
      <Container width="hero">
        <div
          className={cn(
            "grid items-center gap-12",
            "lg:grid-cols-[minmax(0,1fr)_minmax(0,1.02fr)] lg:gap-12",
          )}
        >
          {/* ============================= Copy ======================== */}
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "text-[0.6875rem] font-bold uppercase",
                "tracking-[0.12em] text-brand-600 sm:text-xs",
              )}
            >
              {coaching.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.08)}
              className={cn(
                "mt-6 font-display font-bold tracking-[-0.03em]",
                "leading-[1.1] text-neutral-900",
                // Measured from the design at ~46px on a 1440 frame.
                "text-[1.875rem] sm:text-[2.25rem] xl:text-[2.875rem]",
              )}
            >
              {coaching.headline.map((line) => (
                <span key={line} className="inline lg:block">
                  {line}{" "}
                </span>
              ))}
            </motion.h2>

            <motion.p
              {...rise(0.16)}
              className={cn(
                "mt-7 max-w-136 leading-relaxed text-pretty",
                "text-[0.9375rem] text-neutral-600 sm:text-base",
              )}
            >
              {coaching.description}
            </motion.p>

            {/* ---------------------------- Steps ---------------------- */}
            {/* An <ol>: the order is meaningful, and the numerals come from
                the data rather than a CSS counter so they are real text. */}
            <ol className="mt-10 flex flex-col gap-7">
              {coaching.steps.map((step, index) => (
                <motion.li
                  key={step.title}
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
                        delay: 0.22 + index * 0.09,
                        ease: easeOut,
                      },
                    },
                  }}
                  // The numeral sits in its own fixed column so the titles and
                  // body copy align down the list regardless of numeral width.
                  className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-x-2"
                >
                  <span
                    className={cn(
                      "font-mono text-[0.9375rem] font-medium",
                      "text-brand-600 tabular-nums",
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <h3 className="font-semibold text-neutral-900">
                      {step.title}
                    </h3>
                    <p
                      className={cn(
                        "mt-1.5 max-w-md leading-relaxed text-pretty",
                        "text-[0.9375rem] text-neutral-600",
                      )}
                    >
                      {step.description}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>

          {/* ============================= Image ======================= */}
          <motion.div
            initial={reduce ? "shown" : "hidden"}
            whileInView="shown"
            viewport={{ once: true, amount: "some" }}
            variants={{
              hidden: { opacity: 0, y: 24 },
              shown: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, delay: 0.15, ease: easeOut },
              },
            }}
            className={cn(
              // Bleeds past the container's right edge on lg+, as the design
              // does; fully inside the gutter below that.
              "lg:-mr-[max(2rem,calc((100vw-var(--width-hero))/2+2rem))]",
            )}
          >
            <Image
              src={coaching.image.src}
              alt={coaching.image.alt}
              width={coaching.image.width}
              height={coaching.image.height}
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="h-auto w-full"
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
