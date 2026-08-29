"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { insights } from "@/content/insights";
import { cn } from "@/lib/utils";

/**
 * INSIGHTS THINKING
 * ---------------------------------------------------------------------------
 * Section 2 of the Insights page: a heading, a filter bar, and a grid of
 * article cards.
 *
 * THE FILTERS ARE REAL, not decoration. Each tab narrows the grid to articles
 * whose `category` matches it; "All" is the resting state. They are <button>s
 * in a tablist rather than links: this filters a list in place, it does not
 * navigate, and rendering them as links would promise a URL that does not
 * exist.
 *
 * The active tab is marked with `aria-selected` and an underline that SLIDES
 * between tabs via a shared `layoutId`, so the indicator reads as one object
 * moving rather than three separate rules blinking on and off.
 *
 * THE CARD COLOUR
 * `tone` comes from the content and tracks each card's ARTWORK rather than
 * its category — see the note on `thinking` in content/insights.ts for why
 * the two do not line up.
 *
 * THE ILLUSTRATIONS
 * Transparent line art at differing aspects (1.5 to 2.8), so they are placed
 * in a fixed-height box with `object-contain` rather than being cropped to a
 * common ratio: cropping would cut the ends off the wider diagrams, which are
 * the part that carries their meaning.
 */

const { thinking } = insights;

/** Motion's string easings are not typed, so the cubic curve is spelled out. */
const easeOut = [0.16, 1, 0.3, 1] as const;

/**
 * Category label colours, sampled from the design.
 *
 * Keyed by `tone` rather than by category name — see the content note.
 */
const toneStyles = {
  terracotta: "text-[#d4694a]",
  olive: "text-[#6a7c4e]",
  violet: "text-[#7e4987]",
} as const;

export function InsightsThinking() {
  const reduce = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState<string>(thinking.filters[0]);

  /** The resting filter shows everything; any other narrows by category. */
  const visible =
    activeFilter === thinking.filters[0]
      ? thinking.articles
      : thinking.articles.filter(
          (article) => article.category === activeFilter,
        );

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
      // The hero's two CTAs point here.
      id="latest"
      className="bg-[#fbf9f3] py-section-lg text-neutral-900"
    >
      <Container width="hero">
        {/* ============================ Heading ======================= */}
        <motion.p
          {...rise(0)}
          className={cn(
            "text-[0.6875rem] font-bold tracking-[0.18em] uppercase",
            "text-[#7e4987] sm:text-xs",
          )}
        >
          {thinking.eyebrow}
        </motion.p>

        <motion.h2
          {...rise(0.08)}
          className={cn(
            "mt-4 font-display font-medium tracking-[-0.03em]",
            "leading-[1.1] text-balance",
            // Measured from the design at ~44px on a 1440 frame.
            "text-[1.875rem] sm:text-[2.25rem] xl:text-[2.75rem]",
          )}
        >
          {thinking.headline}
        </motion.h2>

        <motion.p
          {...rise(0.16)}
          className={cn(
            "mt-4 max-w-[38rem] leading-relaxed text-pretty",
            "text-[0.9375rem] text-neutral-600",
          )}
        >
          {thinking.description}
        </motion.p>

        {/* ============================ Filters ======================= */}
        <motion.div
          {...rise(0.22)}
          role="tablist"
          aria-label="Filter insights by topic"
          className={cn(
            "mt-10 flex gap-8 border-b border-neutral-300/70",
            // Scrolls rather than wrapping below lg: five tabs wrapped to two
            // rows push the grid down and read as a broken bar.
            "[scrollbar-width:none] overflow-x-auto pb-0",
            "[&::-webkit-scrollbar]:hidden",
          )}
        >
          {thinking.filters.map((filter) => {
            const isActive = filter === activeFilter;

            return (
              <button
                key={filter}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "relative shrink-0 cursor-pointer pb-3 text-[0.875rem]",
                  "duration-normal transition-colors ease-out",
                  "focus-visible:rounded-sm focus-visible:ring-2",
                  "focus-visible:ring-brand-500/40 focus-visible:outline-none",
                  isActive
                    ? "font-semibold text-[#5c2a70]"
                    : "font-medium text-neutral-500 hover:text-neutral-800",
                )}
              >
                {filter}

                {/* One indicator shared across the tabs, so it slides between
                    them rather than blinking on and off. */}
                {isActive && (
                  <motion.span
                    layoutId="insights-filter-underline"
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-[#5c2a70]"
                    transition={
                      reduce
                        ? { duration: 0 }
                        : { duration: 0.35, ease: easeOut }
                    }
                  />
                )}
              </button>
            );
          })}
        </motion.div>

        {/* ============================= Grid ========================= */}
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {/*
            `popLayout` so a card leaving the filtered set is taken out of the
            flow as it fades, and the remaining cards slide up to close the
            gap rather than jumping.
          */}
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((article, index) => (
              <motion.li
                key={article.href}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.97 }}
                transition={{
                  // Staggered by column, so a row lands together rather than
                  // rippling across three cards.
                  duration: 0.45,
                  delay: reduce ? 0 : (index % 3) * 0.06,
                  ease: easeOut,
                }}
              >
                <Link
                  href={article.href}
                  className={cn(
                    "group flex h-full flex-col rounded-2xl bg-white",
                    "p-5 ring-1 ring-neutral-200/80",
                    // `translate`, not `transform`: Tailwind v4 compiles the
                    // translate utilities to the standalone property.
                    "duration-normal transition-[box-shadow,translate,--tw-ring-color] ease-out",
                    "will-change-[translate]",
                    "hover:-translate-y-1 hover:ring-neutral-300",
                    "hover:shadow-[0_22px_44px_-28px_rgb(45_35_25/0.35)]",
                    "focus-visible:ring-2 focus-visible:ring-brand-500/40",
                    "focus-visible:outline-none",
                  )}
                >
                  {/* --------------------- Artwork ------------------ */}
                  {/* A fixed-height box with `object-contain`: the six
                      diagrams differ in aspect, and cropping them to a
                      common ratio would cut the ends off the wider ones. */}
                  <span className="flex h-36 items-center justify-center sm:h-40">
                    <Image
                      src={article.image.src}
                      alt={article.image.alt}
                      width={article.image.width}
                      height={article.image.height}
                      sizes="(min-width: 1024px) 22rem, (min-width: 640px) 44vw, 88vw"
                      className={cn(
                        "max-h-full w-auto object-contain",
                        // `scale`, not `transform` — see the note above.
                        "duration-slow transition-[scale] ease-out",
                        "group-hover:scale-[1.03]",
                      )}
                    />
                  </span>

                  {/* ---------------------- Copy -------------------- */}
                  <p
                    className={cn(
                      "mt-5 text-[0.625rem] font-bold tracking-[0.12em] uppercase",
                      toneStyles[article.tone],
                    )}
                  >
                    {article.category}
                  </p>

                  <h3
                    className={cn(
                      "mt-2.5 text-[1.0625rem] leading-snug font-medium",
                      "tracking-[-0.01em] text-pretty sm:text-[1.125rem]",
                    )}
                  >
                    {article.title}
                  </h3>

                  {/* Pushed to the bottom so every card's footer shares a
                      baseline however long its title runs. */}
                  <span className="mt-auto flex items-center justify-between pt-4">
                    <span className="text-[0.8125rem] text-neutral-500">
                      {article.readTime}
                    </span>

                    <span
                      aria-hidden="true"
                      className={cn(
                        "text-neutral-700",
                        "duration-normal transition-transform ease-out",
                        "group-hover:translate-x-1",
                      )}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="size-5"
                      >
                        <path d="M4.5 12h15M13.5 6l6 6-6 6" />
                      </svg>
                    </span>
                  </span>
                </Link>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </Container>
    </section>
  );
}
