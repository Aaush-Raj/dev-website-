"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { customers } from "@/content/customers";
import { cn } from "@/lib/utils";

/**
 * CUSTOMER STORIES CTA
 * ---------------------------------------------------------------------------
 * Section 3: the closing call to action. A question, a line of context and one
 * action on the left; the paper speech bubbles on the right.
 *
 * IT BRACKETS THE PAGE. Same near-black ground, same paper grain and same
 * corner filaments as the hero, so the four story cards sit between two dark
 * bands rather than trailing off. Both backgrounds are reproduced the same way
 * they are up there — see CustomersHero for why the plate is not shipped whole.
 *
 * THE BUBBLES ARRIVED WITH REAL TRANSPARENCY, unlike the hero sculpture, so
 * there is no baked-in field to match and no edge fading to hide a seam. What
 * the cutout dropped is the ground shadow the design shows beneath them, and
 * that is drawn back as a blurred ellipse — cheaper than shipping a second
 * copy of the art with the shadow baked in, and it can sit at any ground
 * colour.
 */

const { cta } = customers;

/** Motion's string easings are not typed, so the cubic curve is spelled out. */
const easeOut = [0.16, 1, 0.3, 1] as const;

export function CustomersCta() {
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduce ? "shown" : "hidden",
    whileInView: "shown",
    viewport: {
      once: true,
      amount: "some",
      margin: "0px 0px 10% 0px",
    } as const,
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
      className={cn(
        "relative isolate overflow-hidden",
        // The same ground as the hero, so the page reads as one dark bracket.
        "bg-[#0a0a0a] text-white",
        "py-16 sm:py-20 lg:py-24",
      )}
    >
      {/* ===================== Background: paper grain ==================== */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 -z-10",
          // Masked away from the right, where the bubbles sit: the grain is
          // what made the hero's sculpture read as a rectangle, and although
          // these bubbles are genuinely transparent, keeping the treatment
          // consistent keeps the two dark bands matching.
          "[mask-image:linear-gradient(to_bottom,black_0%,black_40%,transparent_58%)]",
          "lg:[mask-image:linear-gradient(to_right,black_0%,black_38%,transparent_52%)]",
          "bg-[repeating-linear-gradient(27deg,rgb(255_255_255/0.014)_0px,rgb(255_255_255/0.014)_1px,transparent_1px,transparent_3px),repeating-linear-gradient(-53deg,rgb(255_255_255/0.01)_0px,rgb(255_255_255/0.01)_1px,transparent_1px,transparent_4px)]",
        )}
      />

      {/* ==================== Background: corner filaments ================ */}
      {/*
        The hero's extracted filament art, reused. The design places the same
        fan in this section's bottom-right corner, so the page carries one copy
        of it rather than two near-identical crops.
      */}
      <motion.div
        aria-hidden="true"
        initial={reduce ? { opacity: 1 } : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, delay: 0.3, ease: easeOut }}
        className={cn(
          // Dimmer and smaller than the hero's. The design keeps this fan in
          // the corner behind the bubbles rather than crossing them.
          "pointer-events-none absolute -z-10 opacity-30",
          // Hidden below lg for the same reason as the hero's: the stacked
          // layout leaves no empty corner, and the fan lands on the content.
          "hidden lg:block",
          "right-0 bottom-0 h-[46%] w-[26%]",
        )}
      >
        <Image
          src="/assets/images/customers/hero-filaments.webp"
          alt=""
          width={694}
          height={452}
          className="h-full w-full object-cover object-right-bottom"
        />
      </motion.div>

      <Container width="hero">
        <div
          className={cn(
            "grid items-center gap-12",
            // Measured from the design: the copy runs to ~45% of the frame and
            // the bubbles occupy 49.8%. Those overlap, because the design runs
            // the bubbles PAST the container's right edge — see the negative
            // margin below. Splitting the track evenly and letting them bleed
            // gives both the copy its two-line headline and the bubbles their
            // full width, which competing for one track could not.
            "lg:grid-cols-2 lg:gap-6",
          )}
        >
          {/* ============================ Copy ========================== */}
          <div>
            <motion.h2
              {...rise(0)}
              className={cn(
                "font-serif font-normal tracking-[-0.015em]",
                "leading-[1.1] text-balance",
                // Measured from the design at ~62px on a 1440 frame.
                "text-[2.125rem] sm:text-[2.75rem] xl:text-[3.25rem]",
              )}
            >
              {cta.headline}
            </motion.h2>

            <motion.p
              {...rise(0.08)}
              className={cn(
                "mt-6 max-w-[29rem] leading-relaxed text-pretty",
                "text-[1rem] text-neutral-400 sm:text-[1.0625rem]",
              )}
            >
              {cta.description}
            </motion.p>

            <motion.div {...rise(0.16)} className="mt-10">
              <Link
                href={cta.action.href}
                className={cn(
                  "group inline-flex items-center gap-4",
                  "bg-brand-600 px-8 py-4.5",
                  "text-[0.9375rem] font-medium text-white",
                  "duration-normal transition-[background-color,translate,box-shadow] ease-out",
                  "will-change-[translate]",
                  "hover:-translate-y-0.5 hover:bg-brand-500",
                  "hover:shadow-[0_1rem_2rem_-0.75rem_rgb(107_70_193/0.65)]",
                  "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand-300",
                )}
              >
                {cta.action.label}
                <svg
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                  className={cn(
                    "h-4 w-4 shrink-0",
                    "duration-normal transition-[translate] ease-out",
                    "group-hover:translate-x-1",
                  )}
                >
                  <path
                    d="M2 8h12M9.5 3.5 14 8l-4.5 4.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </motion.div>
          </div>

          {/* ========================== Bubbles ========================= */}
          <motion.div
            initial={reduce ? "shown" : "hidden"}
            whileInView="shown"
            viewport={{ once: true, amount: "some" }}
            variants={{
              hidden: { opacity: 0, scale: 0.94 },
              shown: {
                opacity: 1,
                scale: 1,
                transition: { duration: 0.9, delay: 0.12, ease: easeOut },
              },
            }}
            /*
              Measured from the design: the bubbles span 49.8% of the frame,
              which is 717px at 1440. Getting that number took three passes —
              a brightness threshold clipped the darker lilac bubble, and a
              looser one swept in the corner filaments. Isolating on saturation
              gives an aspect of 1.551 against the asset's own 1.508, which is
              what confirms the reading is of the bubbles alone.
            */
            className={cn(
              "relative mx-auto w-full max-w-[44.8125rem]",
              /*
                Runs out into the container's right gutter, as the design does,
                and takes an absolute width rather than the track's. 717px is
                the measured target at 1440. A percentage does NOT work here:
                it resolves against the grid track — half the container — not
                against the frame the measurement came from.

                The bleed is only as deep as the gutter. In the design the
                lilac bubble stops at 98.6% of the frame — right up to the edge
                but never clipped — and a larger negative margin runs its tail
                off the viewport.
              */
              /*
                The width is a min() so it can never outrun the viewport. At a
                fixed 44.8125rem the pair clipped at 1280 — its right edge
                landed at 105% of the frame — while sitting correctly at 1440.
                The vw term keeps it inside the gutter on the way down, and
                lands the pair at 650px on a 1440 frame against the design's
                measured 651.
              */
              "lg:mr-[-3.25rem] lg:ml-auto lg:w-[min(44.8125rem,48vw)] lg:max-w-none",
            )}
          >
            {/*
              The ground shadow the cutout dropped. A blurred ellipse under the
              bubbles' feet, sized and placed to match the design's — without
              it they float, because the asset carries no contact shadow of its
              own. Drawn rather than baked in so it costs nothing and works at
              any ground colour.
            */}
            <div
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute inset-x-[8%] bottom-[2%]",
                "h-[12%] rounded-[50%] blur-xl",
                "bg-[radial-gradient(ellipse_at_center,rgb(0_0_0/0.75),transparent_72%)]",
              )}
            />

            <Image
              src={cta.image.src}
              alt={cta.image.alt}
              width={582}
              height={386}
              sizes="(min-width: 1024px) 54vw, 92vw"
              className="relative h-auto w-full object-contain"
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
