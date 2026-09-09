"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { customers } from "@/content/customers";
import { cn } from "@/lib/utils";

/**
 * STORIES FROM THE WORKPLACE
 * ---------------------------------------------------------------------------
 * Section 2: a 2x2 grid of story cards, each a photograph over a category, a
 * headline, a standfirst, two chips and a link.
 *
 * THE WHOLE CARD IS THE LINK, not just the "Read the story" text. A card with a
 * single destination should have a single target — making only the last line
 * clickable leaves a large, obviously-interactive rectangle that does nothing.
 * The visible link is kept as the affordance and marked `aria-hidden`, so the
 * accessible name comes from the card's own heading rather than four identical
 * "Read the story" links.
 *
 * CHIPS COME IN TWO SHAPES. The BFSI card's carry figures ("25 branches"), the
 * rest carry phrases. See the note in content/customers.ts — the number gets
 * the display face, and the label sits beside it.
 *
 * Measured off the design: cards are 45.4% of the frame with a ~2rem gutter,
 * and the photographs are cropped to 2.18:1.
 */

const { stories } = customers;

/** Motion's string easings are not typed, so the cubic curve is spelled out. */
const easeOut = [0.16, 1, 0.3, 1] as const;

export function CustomersStories() {
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
      id="stories"
      // Sampled from the design: a warm off-white, a shade warmer than the cards.
      className="bg-[#f9f7f4] py-section-lg text-neutral-900"
    >
      <Container width="hero">
        {/* =========================== Heading ========================== */}
        <motion.p
          {...rise(0)}
          className={cn(
            "text-[0.75rem] font-semibold tracking-[0.14em] uppercase",
            "text-brand-500",
          )}
        >
          {stories.eyebrow}
        </motion.p>

        <motion.h2
          {...rise(0.06)}
          className={cn(
            "mt-4 font-serif font-normal tracking-[-0.015em]",
            "leading-[1.08] text-balance",
            // Measured from the design at ~54px on a 1440 frame.
            "text-[2.125rem] sm:text-[2.75rem] xl:text-[3.375rem]",
          )}
        >
          {stories.headline}
        </motion.h2>

        <motion.p
          {...rise(0.12)}
          className={cn(
            "mt-5 max-w-[30rem] leading-relaxed text-pretty",
            "text-[1rem] text-neutral-600",
          )}
        >
          {stories.description}
        </motion.p>

        {/* ============================ Cards =========================== */}
        <ul className="mt-12 grid gap-8 lg:grid-cols-2">
          {stories.items.map((story, index) => (
            <motion.li
              key={story.id}
              id={story.id}
              // Stagger down the grid rather than across it, so a card and the
              // one beside it do not arrive in lockstep.
              {...rise(0.06 * index)}
              // Anchored from the hero's sector rail, which lands under the
              // floating nav pill without this.
              className="scroll-mt-32"
            >
              <Link
                href={story.cta.href}
                className={cn(
                  "group flex h-full flex-col overflow-hidden rounded-xl bg-white",
                  "ring-1 ring-neutral-900/6",
                  "duration-normal transition-[box-shadow,translate,--tw-ring-color] ease-out",
                  "will-change-[translate]",
                  "hover:-translate-y-1 hover:ring-brand-500/25",
                  "hover:shadow-[0_1.5rem_2.75rem_-1.25rem_rgb(23_23_23/0.18)]",
                  "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand-500",
                )}
              >
                {/* -------------------------- Photo ------------------------ */}
                <div className="relative aspect-[2.18/1] w-full overflow-hidden">
                  <Image
                    src={story.image.src}
                    alt={story.image.alt}
                    fill
                    sizes="(min-width: 1024px) 45vw, 92vw"
                    className={cn(
                      "object-cover",
                      // A slow push-in on hover. `scale` is a standalone
                      // property in Tailwind v4, not a transform utility.
                      "duration-slow transition-[scale] ease-out",
                      "will-change-[scale] group-hover:scale-[1.03]",
                    )}
                  />
                </div>

                {/* -------------------------- Body ------------------------- */}
                <div className="flex flex-1 flex-col p-7 lg:p-8">
                  <p
                    className={cn(
                      "text-[0.6875rem] font-semibold tracking-[0.1em] uppercase",
                      "text-brand-500",
                    )}
                  >
                    {story.category}
                  </p>

                  <h3
                    className={cn(
                      "mt-4 font-serif font-normal tracking-[-0.01em]",
                      "leading-[1.16] text-balance",
                      "text-[1.4375rem] sm:text-[1.625rem]",
                    )}
                  >
                    {story.headline}
                  </h3>

                  <p
                    className={cn(
                      "mt-4 leading-relaxed text-pretty",
                      "text-[0.9375rem] text-neutral-600",
                    )}
                  >
                    {story.description}
                  </p>

                  {/* ------------------------ Chips ---------------------- */}
                  {/*
                    `mt-auto` on the chip row, so the link below it sits on a
                    common baseline across all four cards however tall their
                    headlines and standfirsts run.
                  */}
                  <ul
                    className={cn(
                      "mt-auto grid gap-3 pt-7",
                      // One column on the narrowest phones. At 360px a
                      // half-width chip cannot hold "9,328 conversations" on
                      // one line, and the figure chips cannot wrap — the number
                      // and its label share a baseline row.
                      "grid-cols-1 min-[26rem]:grid-cols-2",
                    )}
                  >
                    {story.chips.map((chip) => (
                      <li
                        key={chip.label}
                        className={cn(
                          "flex flex-wrap items-baseline gap-x-2.5 gap-y-1 rounded-lg bg-[#f7f4f1] px-4 py-3.5",
                          "duration-normal transition-colors ease-out",
                          "group-hover:bg-[#f4efe9]",
                        )}
                      >
                        {/*
                          Figures get the display face; phrases do not. The
                          optional `value` is what separates the two.
                        */}
                        {"value" in chip && chip.value ? (
                          <>
                            {/*
                              Sans and semibold, not the display serif. The
                              design sets these as lining figures — Playfair's
                              old-style numerals drop "9,328" below the baseline
                              and read as prose rather than as a measurement.
                            */}
                            <span className="text-[1.1875rem] leading-none font-semibold text-neutral-900 tabular-nums">
                              {chip.value}
                            </span>
                            <span className="text-[0.875rem] text-neutral-600">
                              {chip.label}
                            </span>
                          </>
                        ) : (
                          <span className="text-[0.875rem] text-neutral-700">
                            {chip.label}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>

                  {/* ------------------------- Link ---------------------- */}
                  {/*
                    The affordance, not the control: the whole card is already
                    the link. Hidden from assistive tech so the card is not
                    announced twice, and so four cards do not present four
                    identically-named "Read the story" links.
                  */}
                  <p
                    aria-hidden="true"
                    className={cn(
                      "mt-7 inline-flex items-center gap-2.5",
                      "text-[0.9375rem] font-medium text-brand-600",
                    )}
                  >
                    {story.cta.label}
                    <svg
                      viewBox="0 0 16 16"
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
                  </p>
                </div>
              </Link>
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
