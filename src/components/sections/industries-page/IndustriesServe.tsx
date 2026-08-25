"use client";

import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { industriesPage } from "@/content/industries-page";
import { cn } from "@/lib/utils";

import { industryIcons } from "./IndustryIcons";

/**
 * INDUSTRIES SERVE
 * ---------------------------------------------------------------------------
 * Section 2 of the Industries page: a split heading over a 3x2 grid of
 * industry cards.
 *
 * THE HEADING
 * Headline left, description right, sharing a baseline rather than stacked.
 * They collapse to one column below lg, where two columns would leave both
 * halves too narrow to read.
 *
 * THE DECORATIONS
 * The design scatters four faint violet shapes behind the grid — a quarter
 * disc, a dot lattice, a pair of arcs and a diagonal hatch. They are drawn
 * here rather than shipped as images: at this opacity they are a few
 * primitives, and as markup they stay crisp and re-colour with the tokens.
 *
 * Each is pinned to a specific card so it lands where the design puts it, and
 * every one is `aria-hidden` and `pointer-events-none` — they sit behind the
 * card content and must never intercept a click or reach a screen reader.
 *
 * They are hidden below lg. At narrower widths the cards stack and the shapes
 * would crowd the copy rather than decorate the margins.
 */

const { serve } = industriesPage;

/** Motion's string easings are not typed, so the cubic curve is spelled out. */
const easeOut = [0.16, 1, 0.3, 1] as const;

/** A quarter disc, bleeding out of the card's top-right corner. */
function DiscDecoration() {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute -top-px -right-px hidden lg:block",
        "size-40 overflow-hidden rounded-tr-2xl",
      )}
    >
      <span className="absolute -top-16 -right-16 size-40 rounded-full bg-brand-200/35" />
    </span>
  );
}

/** A lattice of dots, top-right. */
function DotsDecoration() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 100 70"
      className={cn(
        "pointer-events-none absolute top-7 right-7 hidden lg:block",
        "h-[4.5rem] w-[6.5rem] text-brand-300/60",
      )}
    >
      {Array.from({ length: 5 }, (_, row) =>
        Array.from({ length: 6 }, (_, column) => (
          <circle
            key={`${row}-${column}`}
            cx={6 + column * 18}
            cy={6 + row * 15}
            r="2.6"
            fill="currentColor"
          />
        )),
      )}
    </svg>
  );
}

/** Two concentric arcs sweeping out of the card's top-right. */
function ArcsDecoration() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 120 120"
      className={cn(
        "pointer-events-none absolute -top-2 right-0 hidden lg:block",
        "size-48 text-brand-300/45",
      )}
    >
      <path
        d="M120 8A100 100 0 0 0 20 108"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M120 30A78 78 0 0 0 42 108"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}

/** A block of diagonal hatching, top-right. */
function HatchDecoration() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 100 100"
      className={cn(
        "pointer-events-none absolute top-0 right-0 hidden lg:block",
        "size-36 text-brand-300/45",
      )}
    >
      {Array.from({ length: 9 }, (_, index) => (
        <line
          key={index}
          x1={index * 13 - 4}
          y1="100"
          x2={index * 13 + 44}
          y2="0"
          stroke="currentColor"
          strokeWidth="1.3"
        />
      ))}
    </svg>
  );
}

/**
 * Which decoration sits on which card, by index.
 *
 * Placed to match the design: the discs bracket the grid's outer corners,
 * with the lattice and the hatch inside them.
 */
const decorations = [
  DiscDecoration,
  null,
  DotsDecoration,
  ArcsDecoration,
  HatchDecoration,
  DiscDecoration,
] as const;

export function IndustriesServe() {
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
      /*
        The hero's "Explore industries" CTA points here.

        No scroll-margin needed: globals.css already gives every `[id]` the
        header's height plus a rem, so the anchor clears the floating nav.
      */
      id="industries"
      className="bg-[#fcf9fc] py-section-lg text-neutral-900"
    >
      <Container width="hero">
        {/* ============================ Heading ======================= */}
        <motion.p
          {...rise(0)}
          className={cn(
            "text-[0.6875rem] font-bold tracking-[0.16em] uppercase",
            "text-brand-600 sm:text-xs",
          )}
        >
          {serve.eyebrow}
        </motion.p>

        <div
          className={cn(
            "mt-6 grid gap-8",
            // Headline and description share a baseline rather than stacking.
            "lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:gap-16",
          )}
        >
          <motion.h2
            {...rise(0.08)}
            className={cn(
              "font-display font-bold tracking-[-0.03em]",
              "leading-[1.12] text-balance",
              // Measured from the design at ~46px on a 1440 frame.
              "text-[1.75rem] sm:text-[2.125rem] xl:text-[2.75rem]",
            )}
          >
            {serve.headline.map((line, index) => (
              <span key={line} className="inline lg:block">
                {line}
                {/* The design sets the closing stop in amber. It is kept out
                    of the string so it can be coloured without splitting the
                    word before it. */}
                {index === serve.headline.length - 1 && (
                  <span className="text-accent-500">.</span>
                )}{" "}
              </span>
            ))}
          </motion.h2>

          <motion.p
            {...rise(0.16)}
            className={cn(
              "leading-relaxed text-pretty",
              "text-[0.9375rem] text-neutral-600 sm:text-base",
              "lg:pb-1.5",
            )}
          >
            {serve.description}
          </motion.p>
        </div>

        {/* ============================= Grid ========================= */}
        <ul
          className={cn(
            "mt-12 grid gap-5 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6",
          )}
        >
          {serve.items.map((item, index) => {
            const Icon = industryIcons[item.icon];
            const Decoration = decorations[index];

            return (
              <motion.li
                key={item.title}
                initial={reduce ? "shown" : "hidden"}
                whileInView="shown"
                viewport={{ once: true, amount: "some" }}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  shown: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      // Staggered by column, so a row lands together rather
                      // than rippling across three cards.
                      duration: 0.6,
                      delay: 0.1 + (index % 3) * 0.08,
                      ease: easeOut,
                    },
                  },
                }}
                className={cn(
                  "group relative overflow-hidden rounded-2xl bg-white",
                  "p-7 ring-1 ring-brand-200/70 sm:p-8",
                  // `translate`, not `transform`: Tailwind v4 compiles the
                  // translate utilities to the standalone property.
                  "duration-normal transition-[box-shadow,translate,--tw-ring-color] ease-out",
                  "will-change-[translate]",
                  "hover:-translate-y-1 hover:ring-brand-300",
                  "hover:shadow-[0_24px_50px_-30px_rgb(45_25_90/0.35)]",
                )}
              >
                {Decoration && <Decoration />}

                {/* ------------------- Icon and number ---------------- */}
                {/* `relative` so the card's content sits above whichever
                    decoration is pinned behind it. */}
                <div className="relative flex items-center gap-5">
                  <span
                    className={cn(
                      "grid size-16 shrink-0 place-items-center rounded-xl",
                      "bg-white ring-1 ring-brand-200",
                      "duration-normal transition-[scale,--tw-ring-color] ease-out",
                      "group-hover:scale-105 group-hover:ring-brand-300",
                    )}
                  >
                    <Icon className="size-11" />
                  </span>

                  <span
                    className={cn(
                      "text-[1.375rem] font-bold text-brand-600 sm:text-2xl",
                    )}
                  >
                    {item.number}
                  </span>
                </div>

                {/* ------------------------ Copy --------------------- */}
                <h3 className="relative mt-7 text-[1.0625rem] font-semibold sm:text-[1.1875rem]">
                  {item.title}
                </h3>

                <p
                  className={cn(
                    "relative mt-2.5 leading-relaxed text-pretty",
                    "text-[0.875rem] text-neutral-600 sm:text-[0.9375rem]",
                  )}
                >
                  {item.description}
                </p>
              </motion.li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
