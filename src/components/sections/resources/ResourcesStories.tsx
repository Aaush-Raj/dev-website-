"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { resources } from "@/content/resources";
import { cn } from "@/lib/utils";

/**
 * RESOURCES STORIES
 * ---------------------------------------------------------------------------
 * Section 6 of the Resources page: two customer stories side by side, each a
 * photograph over copy with a stat panel beside it.
 *
 * THE CARDS
 * Each is a whole-card link. "Read the story" is the affordance the design
 * shows, but making only those words clickable would leave the photograph and
 * headline inert — so it renders as a span and the card itself is the anchor.
 *
 * THE STAT PANELS
 * The two are different in KIND, not just in content: the first reports figures
 * (25 branches, 9,328 conversations), the second reports qualities with no
 * number at all. `StatRow` therefore treats `value` as optional and lays each
 * row out accordingly, rather than forcing an empty numeral onto the second
 * story. See the note in content/resources.ts.
 *
 * THE PHOTOGRAPHS
 * Real workplaces, so their alt text describes the scene rather than being
 * empty the way the page's decorative artwork is. They arrive at the same
 * aspect the design gives them, so they sit in a fixed-ratio box with no
 * cropping.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { stories } = resources;

export function ResourcesStories() {
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
    <section className="bg-[#fbf9f5] py-section-lg">
      <Container width="wide">
        {/* =========================== Statement ===================== */}
        {/*
          The heading and the "View all stories" action share a row on lg, as
          the design sets them — the action sitting against the heading's
          baseline rather than below the copy.
        */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "text-[0.6875rem] font-bold uppercase",
                "tracking-[0.16em] text-[#6655f4] sm:text-xs",
              )}
            >
              {stories.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.08)}
              className={cn(
                "mt-5 font-display font-bold tracking-[-0.035em]",
                "leading-[1.06] text-neutral-950",
                // Measured from the design at ~56px on a 1440 frame.
                "text-[2rem] sm:text-[2.625rem] xl:text-[3.375rem]",
              )}
            >
              {stories.headline.map((line) => (
                <span key={line} className="inline lg:block">
                  {line}{" "}
                </span>
              ))}
            </motion.h2>

            <motion.p
              {...rise(0.16)}
              className={cn(
                "mt-6 max-w-124 leading-relaxed text-pretty",
                "text-[0.9375rem] text-neutral-600 sm:text-base",
              )}
            >
              {stories.description.map((line) => (
                <span key={line} className="inline lg:block">
                  {line}{" "}
                </span>
              ))}
            </motion.p>
          </div>

          <motion.div {...rise(0.22)} className="shrink-0 lg:pt-8">
            <Link
              href={stories.action.href}
              className={cn(
                "group/all inline-flex items-center gap-3 rounded-lg",
                "border border-[#5d56f4] px-6 py-3.5",
                "text-[0.9375rem] font-semibold text-[#5d56f4]",
                "duration-normal transition-[background-color,translate] ease-out",
                "will-change-[translate]",
                "hover:-translate-y-0.5 hover:bg-[#5d56f4]/8",
                "active:translate-y-0",
              )}
            >
              {stories.action.label}
              <ArrowIcon
                className={cn(
                  "size-4",
                  "duration-normal transition-[translate] ease-out",
                  "group-hover/all:translate-x-1",
                )}
              />
            </Link>
          </motion.div>
        </div>

        {/* ============================ Cards ======================== */}
        <ul className="mt-12 grid gap-5 lg:grid-cols-2">
          {stories.items.map((item, index) => (
            <motion.li
              key={item.title}
              initial={reduce ? "shown" : "hidden"}
              whileInView="shown"
              viewport={{ once: true, amount: 0.15 }}
              variants={{
                hidden: { opacity: 0, y: 26 },
                shown: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.65,
                    delay: 0.28 + index * 0.1,
                    ease: easeOut,
                  },
                },
              }}
            >
              <Link
                href={item.href}
                className={cn(
                  "group flex h-full flex-col overflow-hidden rounded-2xl",
                  "border border-neutral-200/70 bg-white",
                  "duration-normal transition-[border-color,box-shadow,translate] ease-out",
                  "will-change-[translate]",
                  "hover:-translate-y-1 hover:border-neutral-300",
                  "hover:shadow-[0_24px_50px_-24px_rgb(31_20_60/0.24)]",
                  "focus-visible:ring-2 focus-visible:ring-[#5d56f4]/50 focus-visible:outline-none",
                )}
              >
                {/* The photograph. A fixed ratio matching the source files, so
                    the band is the same height on both cards. */}
                <span className="relative block aspect-[774/301] overflow-hidden">
                  <Image
                    src={item.photo.src}
                    alt={item.photo.alt}
                    width={item.photo.width}
                    height={item.photo.height}
                    sizes="(min-width: 1024px) 46vw, 100vw"
                    className={cn(
                      "size-full object-cover",
                      // `scale`, not `transform` — Tailwind v4 compiles the
                      // scale utilities to the standalone property.
                      "transition-[scale] duration-500 ease-out",
                      "group-hover:scale-[1.03]",
                    )}
                  />
                </span>

                {/* The copy and stat panel. */}
                <span
                  className={cn(
                    "flex flex-1 flex-col gap-6 p-6",
                    // The panel sits beside the copy once there is room; below
                    // that it drops underneath rather than squeezing both.
                    // `items-stretch` so the panel matches the copy's height
                    // instead of hugging its own rows — the two cards' copy
                    // runs to different lengths, and hugging left the shorter
                    // card's panel visibly out of step with its neighbour.
                    "md:flex-row md:items-stretch md:gap-6",
                  )}
                >
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span
                      className={cn(
                        "block text-[0.625rem] font-bold tracking-[0.14em] uppercase",
                        "text-[#7656f5]",
                      )}
                    >
                      {item.kicker}
                    </span>

                    <span
                      className={cn(
                        "mt-3 block font-display font-bold tracking-[-0.02em]",
                        "text-[1.25rem] leading-[1.24] text-pretty text-neutral-950",
                      )}
                    >
                      {item.title}
                    </span>

                    <span className="mt-3 block text-[0.875rem] leading-relaxed text-pretty text-neutral-600">
                      {item.excerpt}
                    </span>

                    {/* Pushed to the card's foot so both cards' links align
                        whatever the excerpt height. */}
                    <span className="mt-auto block pt-6">
                      <span className="inline-flex items-center gap-2.5 text-[0.9375rem] font-semibold text-[#6b56f6]">
                        {stories.readLabel}
                        <ArrowIcon
                          className={cn(
                            "size-4",
                            "duration-normal transition-[translate] ease-out",
                            "group-hover:translate-x-1",
                          )}
                        />
                      </span>
                    </span>
                  </span>

                  {/* The stat panel. */}
                  <span
                    className={cn(
                      "flex shrink-0 flex-col justify-center rounded-xl",
                      "bg-[#f8f1ee] p-5",
                      "md:w-[38%] lg:w-[40%]",
                    )}
                  >
                    {item.stats.map((stat, statIndex) => (
                      <StatRow
                        key={stat.label}
                        stat={stat}
                        // A rule between rows, not under the last one.
                        divided={statIndex < item.stats.length - 1}
                      />
                    ))}
                  </span>
                </span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/**
 * One row in a stat panel.
 *
 * `value` is optional by design: the first story reports figures, the second
 * reports qualities. With a value the row sets the numeral large over its
 * label; without one the label carries the row on its own, wrapping to two
 * lines as the design shows.
 */
function StatRow({
  stat,
  divided,
}: {
  stat: { value?: string; label: string; icon: string };
  divided: boolean;
}) {
  return (
    <span
      className={cn(
        "flex items-center gap-3.5 py-3",
        divided && "border-b border-neutral-300/60",
      )}
    >
      <Image
        src={stat.icon}
        alt=""
        width={96}
        height={96}
        // Decorative: the label beside it carries the meaning.
        aria-hidden="true"
        className="size-8 shrink-0"
      />

      <span className="min-w-0">
        {stat.value ? (
          <>
            <span className="block text-[1.375rem] leading-none font-bold text-neutral-950 tabular-nums">
              {stat.value}
            </span>
            <span className="mt-1 block text-[0.8125rem] text-neutral-600">
              {stat.label}
            </span>
          </>
        ) : (
          <span className="block text-[0.875rem] leading-snug font-semibold text-pretty text-neutral-900">
            {stat.label}
          </span>
        )}
      </span>
    </span>
  );
}

/** The arrow on the section action and each card's link. */
function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M3.5 10h12m0 0-4.4-4.4M15.5 10l-4.4 4.4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
