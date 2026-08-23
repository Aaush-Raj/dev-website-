"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { magic } from "@/content/magic";
import { cn } from "@/lib/utils";

import { MagicCreatePanel } from "./MagicCreatePanel";
import { MagicOutputs } from "./MagicOutputs";
import { MagicStarfield } from "./MagicStarfield";

/**
 * MAGIC HERO
 * ---------------------------------------------------------------------------
 * Section 1 of the LurnyMagic page: the statement on the left, the create
 * panel in the middle, and the three things one source becomes on the right —
 * all over the dark wave background.
 *
 * THE BACKGROUND
 * Three layers, cheapest first:
 *   1. A flat near-black ground, so the section has a colour before anything
 *      loads and no flash of white.
 *   2. The wave image — the flowing violet and amber streaks. This one IS
 *      shipped rather than drawn: it is a painted gradient field with dozens
 *      of overlapping strands, and reproducing it in CSS would be both
 *      heavier and worse. Re-encoded to 41KB.
 *   3. The starfield — slow drifting particles that make the still image feel
 *      alive. See MagicStarfield for why it is CSS and not canvas.
 *
 * THE CONNECTORS
 * The dotted paths from the panel to each card are one SVG in a percentage
 * viewBox behind the grid, so the endpoints track the cards at any width.
 * They only exist on xl, where panel and cards actually sit side by side —
 * below that the columns stack and a connector would point at nothing.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { hero } = magic;

/**
 * The three connector paths, in percentages of the connector box.
 *
 * Each leaves the panel's right edge and elbows to a card: up to the
 * storybook, straight across to the video, down to the practice card. Drawn
 * as rounded elbows rather than diagonals, which is what the design shows.
 */
const connectorPaths = [
  "M 2 50 H 26 Q 34 50 34 40 V 12 Q 34 6 42 6 H 98",
  "M 2 50 H 98",
  "M 2 50 H 26 Q 34 50 34 60 V 88 Q 34 94 42 94 H 98",
] as const;

export function MagicHero() {
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
      className={cn(
        "relative isolate overflow-hidden bg-[#050411] text-white",
        // Clearance for the floating nav pill, which overlays the page.
        // Deliberately tighter than py-section-lg: this is a hero, and the
        // three stacked cards already give the section plenty of height.
        "pt-28 pb-16 sm:pt-30 lg:pt-30 lg:pb-14",
      )}
    >
      {/* ===================== Background layers ====================== */}
      <Image
        src="/assets/images/magic/magic-waves.webp"
        alt=""
        aria-hidden="true"
        fill
        // The LCP background of this page, so it must not lazy-load.
        priority
        sizes="100vw"
        className="pointer-events-none -z-10 object-cover object-center select-none"
      />

      {/* Deepens the left side so the headline always has ground beneath
          it, whatever the image is doing behind. */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 -z-10",
          "bg-[linear-gradient(100deg,#050411_18%,rgb(5_4_17/0.72)_42%,transparent_72%)]",
        )}
      />

      <MagicStarfield className="-z-10" />

      <Container width="hero" className="relative">
        <div
          className={cn(
            /*
              Centre the columns below xl, where they stack and centring reads
              naturally. On xl the card stack is much taller than the copy, so
              centring would float the copy in the middle of a tall row and
              leave dead space above the headline — the columns start together
              at the top instead.
            */
            "grid items-center gap-10 xl:items-start",
            // Three columns on xl, as the design has them. On lg the cards
            // drop below the copy and panel, which share the row.
            "lg:grid-cols-2 lg:gap-8",
            /*
              Roughly the design's proportions, but the copy column gets a
              floor rather than a bare fraction: its two buttons need ~26rem
              side by side, and the panel and cards both have wide minimum
              content, so a pure fr split starves it and the buttons stack.
            */
            "xl:grid-cols-[minmax(26rem,1.05fr)_minmax(0,0.95fr)_minmax(0,0.9fr)]",
            "xl:gap-x-10",
          )}
        >
          {/* =========================== Statement ===================== */}
          <div className="xl:pt-6">
            <motion.p
              {...rise(0)}
              className={cn(
                "text-[0.6875rem] font-bold uppercase",
                "tracking-[0.16em] text-accent-300 sm:text-xs",
              )}
            >
              {hero.eyebrow.product}
              {/* Decorative separator — a screen reader would otherwise
                  announce "bullet" between the two halves. */}
              <span aria-hidden="true" className="mx-2 text-accent-500">
                ·
              </span>
              {hero.eyebrow.label}
            </motion.p>

            <motion.h1
              {...rise(0.08)}
              className={cn(
                "mt-5 font-display font-bold tracking-[-0.035em]",
                "leading-[1.08] text-white",
                // Measured from the design at ~52px on a 1440 frame.
                "text-[2rem] sm:text-[2.5rem] xl:text-[2.875rem]",
              )}
            >
              {hero.headline.map((line, index) => (
                <span
                  key={line}
                  className={cn(
                    "inline lg:block",
                    // Hold each authored line intact at xl. "into learning
                    // people" is long enough to wrap at this size, which
                    // would turn the design's three lines into four.
                    "xl:whitespace-nowrap",
                  )}
                >
                  {line}
                  {/* The design ends the headline with an amber full stop.
                      Kept out of the content string so it can be coloured
                      without splitting the last word. */}
                  {index === hero.headline.length - 1 ? (
                    <span className="text-accent-300">.</span>
                  ) : (
                    " "
                  )}
                </span>
              ))}
            </motion.h1>

            <motion.p
              {...rise(0.16)}
              className={cn(
                "mt-5 max-w-[32rem] leading-relaxed text-pretty",
                "text-[0.9375rem] text-neutral-300 sm:text-base",
                // Narrower at xl so it wraps to the design's four lines and
                // leaves the two buttons room to sit on one row beneath.
                "xl:max-w-[25rem]",
              )}
            >
              {hero.description}
            </motion.p>

            {/* --------------------------- Actions -------------------- */}
            <motion.div
              {...rise(0.24)}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Link
                href={hero.actions.primary.href}
                className={cn(
                  "group inline-flex h-12 items-center justify-center gap-2.5 rounded-lg px-6",
                  "bg-accent-300 text-[0.875rem] font-bold text-neutral-900",
                  // `translate`, not `transform`: Tailwind v4 compiles the
                  // translate utilities to the standalone property.
                  "duration-normal transition-[background-color,box-shadow,translate] ease-out",
                  "will-change-[translate]",
                  "hover:-translate-y-0.5 hover:bg-accent-200",
                  "hover:shadow-[0_18px_40px_-14px_rgb(252_197_50/0.5)]",
                  "active:translate-y-0",
                )}
              >
                {hero.actions.primary.label}
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                  className={cn(
                    "size-4",
                    "duration-normal transition-[translate] ease-out",
                    "group-hover:translate-x-1",
                  )}
                >
                  <path
                    d="M2.5 8h11m0 0-4-4m4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>

              <Link
                href={hero.actions.secondary.href}
                className={cn(
                  "group inline-flex h-12 items-center justify-center gap-2.5 rounded-lg px-5",
                  "border border-brand-400/50 text-[0.875rem] font-semibold text-white",
                  "duration-normal transition-[background-color,border-color,translate] ease-out",
                  "will-change-[translate]",
                  "hover:-translate-y-0.5 hover:border-brand-300 hover:bg-brand-500/15",
                  "active:translate-y-0",
                )}
              >
                {hero.actions.secondary.label}
                <span
                  aria-hidden="true"
                  className={cn(
                    "grid size-6 place-items-center rounded-full",
                    "border border-brand-400/60 text-brand-200",
                    "duration-normal transition-[background-color,scale] ease-out",
                    "group-hover:scale-110 group-hover:bg-brand-500/25",
                  )}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="size-3"
                    fill="currentColor"
                  >
                    <path d="M9 6.5v11l9-5.5z" />
                  </svg>
                </span>
              </Link>
            </motion.div>
          </div>

          {/* ========================= Create panel ==================== */}
          {/* `relative` so the connector layer can anchor to this column's
              right edge on xl. */}
          <motion.div
            initial={reduce ? "shown" : "hidden"}
            whileInView="shown"
            viewport={{ once: true, amount: "some" }}
            variants={{
              hidden: { opacity: 0, y: 24, scale: 0.97 },
              shown: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 0.8, delay: 0.1, ease: easeOut },
              },
            }}
            className="relative xl:pt-14"
          >
            <MagicCreatePanel />

            {/* ---------------------- Connectors ------------------- */}
            {/*
              Sits in the gap between this column and the cards. Only on xl,
              where the two are side by side; below that the columns stack and
              these would point at nothing.
            */}
            <motion.svg
              aria-hidden="true"
              focusable="false"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className={cn(
                "pointer-events-none absolute top-1/2 left-full hidden",
                // Spans the grid gap (xl:gap-x-10 = 2.5rem).
                "h-[21rem] w-10 -translate-y-1/2 xl:block",
              )}
              initial={reduce ? "shown" : "hidden"}
              whileInView="shown"
              viewport={{ once: true, amount: "some" }}
            >
              {connectorPaths.map((d, index) => (
                <motion.path
                  key={d}
                  d={d}
                  fill="none"
                  stroke="#9b7ae8"
                  strokeOpacity={0.55}
                  strokeWidth={0.8}
                  strokeDasharray="3 3"
                  vectorEffect="non-scaling-stroke"
                  variants={{
                    hidden: { pathLength: 0, opacity: 0 },
                    shown: {
                      pathLength: 1,
                      opacity: 1,
                      transition: {
                        duration: 0.7,
                        delay: 0.35 + index * 0.12,
                        ease: easeOut,
                      },
                    },
                  }}
                />
              ))}
            </motion.svg>
          </motion.div>

          {/* =========================== Outputs ======================= */}
          {/*
            Spans both columns on lg, where it sits under the copy and panel
            rather than beside them.

            Capped on xl: three stacked cards are what sets this section's
            height, so letting them take the full column would make the hero
            considerably taller than the copy beside it needs.
          */}
          <MagicOutputs className="lg:col-span-2 xl:col-span-1 xl:max-w-[19rem] xl:justify-self-end" />
        </div>
      </Container>
    </section>
  );
}
