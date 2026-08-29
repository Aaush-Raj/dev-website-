"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { resources } from "@/content/resources";
import { cn } from "@/lib/utils";

/**
 * RESOURCES INSIGHTS
 * ---------------------------------------------------------------------------
 * Section 4 of the Resources page: one featured article beside two smaller
 * ones, on the warm off-white ground.
 *
 * THE CARDS
 * Each is a whole-card link rather than a card with a "Read insight" link
 * inside it — that label is the affordance the design shows, but making only
 * those few words clickable would leave most of the target inert.
 *
 * The featured card splits down the middle: copy on the left, artwork filling
 * the right half. That artwork is opaque and brings its own near-black panel,
 * so it runs full-bleed to the card's edges rather than sitting inset like the
 * two transparent illustrations below it. See the note in content/resources.ts.
 *
 * LAYOUT
 * On lg the featured card takes roughly 1.47x the stacked pair, which is what
 * the design measures. Below that everything becomes one column and the
 * featured card's two halves stack, since a 50/50 split at phone width leaves
 * neither half readable.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { insights } = resources;

export function ResourcesInsights() {
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

  /** The entrance each card shares, staggered by position. */
  const card = (delay: number) => ({
    initial: reduce ? "shown" : "hidden",
    whileInView: "shown",
    viewport: { once: true, amount: 0.15 } as const,
    variants: {
      hidden: { opacity: 0, y: 24 },
      shown: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.65, delay, ease: easeOut },
      },
    },
  });

  return (
    <section className="relative isolate overflow-hidden bg-[#fbf9f7] py-section-lg">
      <InsightsBackdrop />

      <Container width="wide" className="relative">
        {/* =========================== Statement ===================== */}
        <motion.div {...rise(0)}>
          <p
            className={cn(
              "text-[0.6875rem] font-bold uppercase",
              "tracking-[0.18em] text-[#7c53f1] sm:text-xs",
            )}
          >
            {insights.eyebrow}
          </p>
          {/* The short rule under the eyebrow, as the design draws it. */}
          <span
            aria-hidden="true"
            className="mt-3 block h-0.5 w-8 bg-[#7c53f1]"
          />
        </motion.div>

        <motion.h2
          {...rise(0.08)}
          className={cn(
            "mt-6 font-display font-bold tracking-[-0.035em]",
            "leading-[1.08] text-neutral-900",
            // Measured from the design at ~52px on a 1440 frame.
            "text-[2rem] sm:text-[2.5rem] xl:text-[3.25rem]",
          )}
        >
          {insights.headline}
        </motion.h2>

        <motion.p
          {...rise(0.16)}
          className={cn(
            "mt-4 max-w-140 leading-relaxed text-pretty",
            "text-[1.0625rem] text-neutral-600 sm:text-lg",
          )}
        >
          {insights.description}
        </motion.p>

        {/* ============================ Cards ======================== */}
        <div
          className={cn(
            "mt-12 grid gap-5",
            // The featured card takes ~1.47x the stacked pair, per the design.
            "lg:grid-cols-[minmax(0,1.47fr)_minmax(0,1fr)]",
          )}
        >
          {/* ------------------------ Featured ---------------------- */}
          <motion.article {...card(0.24)}>
            <Link
              href={insights.featured.href}
              className={cn(
                "group flex h-full flex-col overflow-hidden rounded-2xl",
                "border border-neutral-200/70 bg-white",
                "duration-normal transition-[border-color,box-shadow,translate] ease-out",
                "will-change-[translate]",
                "hover:-translate-y-1 hover:border-neutral-300",
                "hover:shadow-[0_24px_50px_-24px_rgb(31_20_60/0.28)]",
                "focus-visible:ring-2 focus-visible:ring-[#7c53f1]/50 focus-visible:outline-none",
                // The two halves sit side by side once there is room.
                "sm:grid sm:grid-cols-2 sm:items-stretch",
              )}
            >
              {/* The copy half. */}
              <div className="flex flex-col p-6 lg:p-7">
                <CardMeta
                  topic={insights.featured.topic}
                  readingTime={insights.featured.readingTime}
                />

                <h3
                  className={cn(
                    "mt-4 font-display font-bold tracking-[-0.02em]",
                    "text-[1.375rem] leading-[1.22] text-pretty text-neutral-900",
                    "lg:text-[1.5rem]",
                  )}
                >
                  {insights.featured.title}
                </h3>

                <p className="mt-3.5 text-[0.9375rem] leading-relaxed text-pretty text-neutral-600">
                  {insights.featured.excerpt}
                </p>

                {/* Pushed to the card's foot whatever the copy height. */}
                <span className="mt-auto pt-6">
                  <ReadLink label={insights.readLabel} />
                </span>
              </div>

              {/* The artwork half. Opaque and full-bleed — its dark panel is
                  part of the illustration, so it runs to the card's edges
                  rather than sitting inset on the white. */}
              <div className="relative min-h-56 bg-[#252525] sm:min-h-full">
                <Image
                  src={insights.featured.art.src}
                  alt=""
                  width={insights.featured.art.width}
                  height={insights.featured.art.height}
                  // Decorative: the headline beside it carries the meaning.
                  aria-hidden="true"
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                  className={cn(
                    "size-full object-cover",
                    // `scale`, not `transform` — Tailwind v4 compiles the
                    // scale utilities to the standalone property.
                    "transition-[scale] duration-500 ease-out",
                    "group-hover:scale-[1.03]",
                  )}
                />
              </div>
            </Link>
          </motion.article>

          {/* ------------------------- Stacked ---------------------- */}
          <div className="grid content-start gap-5 lg:grid-rows-[auto_auto]">
            {insights.items.map((item, index) => (
              <motion.article key={item.title} {...card(0.34 + index * 0.1)}>
                <Link
                  href={item.href}
                  className={cn(
                    "group flex h-full items-start gap-5 rounded-2xl p-6",
                    "border border-neutral-200/70 bg-white",
                    "duration-normal transition-[border-color,box-shadow,translate] ease-out",
                    "will-change-[translate]",
                    "hover:-translate-y-1 hover:border-neutral-300",
                    "hover:shadow-[0_24px_50px_-24px_rgb(31_20_60/0.28)]",
                    "focus-visible:ring-2 focus-visible:ring-[#7c53f1]/50 focus-visible:outline-none",
                  )}
                >
                  <span className="flex min-w-0 flex-1 flex-col">
                    <CardMeta
                      topic={item.topic}
                      readingTime={item.readingTime}
                    />

                    <span
                      className={cn(
                        "mt-3.5 block font-display font-bold tracking-[-0.015em]",
                        "text-[1.125rem] leading-[1.26] text-pretty text-neutral-900",
                      )}
                    >
                      {item.title}
                    </span>

                    {/* Follows the title rather than being pushed to the
                        card's floor: the two share a fixed-height grid row, so
                        `mt-auto` stranded the link with dead space above it. */}
                    <span className="mt-5 block">
                      <ReadLink label={insights.readLabel} />
                    </span>
                  </span>

                  {/* Transparent line art, sitting on the card's white —
                      unlike the featured card's opaque panel. Hidden on the
                      narrowest screens, where the title needs the full width. */}
                  <Image
                    src={item.art.src}
                    alt=""
                    width={item.art.width}
                    height={item.art.height}
                    aria-hidden="true"
                    sizes="(min-width: 640px) 15vw, 0px"
                    className={cn(
                      "hidden h-auto w-32 shrink-0 sm:block lg:w-36",
                      "transition-[scale] duration-500 ease-out",
                      "group-hover:scale-105",
                    )}
                  />
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/** The topic and reading time above every card's title. */
function CardMeta({
  topic,
  readingTime,
}: {
  topic: string;
  readingTime: string;
}) {
  return (
    <p className="flex flex-wrap items-center gap-x-2 text-[0.6875rem] font-bold tracking-[0.1em] uppercase">
      <span className="text-[#7c53f1]">{topic}</span>
      {/* Decorative separator — a screen reader would otherwise announce
          "bullet" between the two halves. */}
      <span aria-hidden="true" className="text-neutral-300">
        •
      </span>
      <span className="text-neutral-400">{readingTime}</span>
    </p>
  );
}

/**
 * The "Read insight" affordance. A span, not a link — the whole card is
 * already the link, and nesting one inside another is invalid.
 */
function ReadLink({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2.5 text-[0.9375rem] font-semibold text-[#5645c9]">
      {label}
      <svg
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
        className={cn(
          "size-4",
          "duration-normal transition-[translate] ease-out",
          "group-hover:translate-x-1",
        )}
      >
        <path
          d="M3.5 10h12m0 0-4.4-4.4M15.5 10l-4.4 4.4"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/**
 * The section's background motifs: a faint dot grid at the left and rings at
 * the upper right, echoing section 3's dark treatment in a lighter key.
 *
 * Drawn rather than shipped — flat geometry that reflows with the section
 * instead of letterboxing the way a fixed raster would.
 */
function InsightsBackdrop() {
  return (
    <>
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute top-0 left-0 -z-10",
          "hidden h-[24rem] w-[16rem] sm:block",
        )}
        style={{
          backgroundImage:
            "radial-gradient(circle, rgb(124 83 241 / 0.22) 1.2px, transparent 1.2px)",
          backgroundSize: "22px 22px",
          maskImage:
            "radial-gradient(circle at 0% 18%, black, transparent 76%)",
          WebkitMaskImage:
            "radial-gradient(circle at 0% 18%, black, transparent 76%)",
        }}
      />

      <svg
        aria-hidden="true"
        viewBox="0 0 400 400"
        fill="none"
        className={cn(
          "pointer-events-none absolute -top-28 -right-20 -z-10",
          "hidden h-[32rem] w-[32rem] lg:block",
        )}
        style={{
          maskImage:
            "radial-gradient(circle at 60% 44%, black, transparent 72%)",
          WebkitMaskImage:
            "radial-gradient(circle at 60% 44%, black, transparent 72%)",
        }}
      >
        <g stroke="rgb(124 83 241 / 0.16)" strokeWidth="1">
          <circle cx="235" cy="165" r="92" />
          <circle cx="235" cy="165" r="138" />
          <circle cx="235" cy="165" r="184" />
          <circle cx="152" cy="212" r="114" />
        </g>
      </svg>
    </>
  );
}
