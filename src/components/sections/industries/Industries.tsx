"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

import { ArrowRightIcon } from "@/components/sections/hero/DashboardIcons";
import { Container } from "@/components/ui/Container";
import { industries } from "@/content/industries";
import { cn } from "@/lib/utils";

/**
 * INDUSTRIES
 * ---------------------------------------------------------------------------
 * Five industry cards as an expanding accordion. The active card widens to
 * roughly 1.4x its neighbours and swaps its violet top rule for amber.
 *
 * INTERACTION
 * Activation is driven by pointer hover AND keyboard focus, tracked in the
 * same piece of state. A hover-only accordion is unusable by keyboard and on
 * touch: the panel would never expand. Because each card's whole surface is a
 * link, focus follows tab order naturally and touch users get a plain tap
 * through to the industry page.
 *
 * The expansion is a flex-grow transition rather than a width animation, so
 * the five cards always exactly fill the row at any viewport width.
 *
 * Below lg the accordion collapses to a normal responsive grid — five columns
 * at phone width would be unreadable, expanded or not.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

export function Industries() {
  const reduce = useReducedMotion();

  /**
   * Which card is expanded. Defaults to 0 so the section has the design's
   * resting state before any interaction, and so touch users — who never
   * hover — still see one card open.
   */
  const [activeIndex, setActiveIndex] = useState(0);

  const rise = (delay: number) => ({
    initial: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: {
      duration: reduce ? 0 : 0.6,
      delay: reduce ? 0 : delay,
      ease: easeOut,
    },
  });

  return (
    <section id="industries" className="bg-[#020208] py-section-lg text-white">
      <Container width="hero">
        {/* ============================== Header ======================== */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "font-mono text-[0.625rem] font-medium uppercase",
                "tracking-[0.16em] text-brand-300 sm:text-[0.6875rem]",
              )}
            >
              {industries.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.08)}
              className={cn(
                "mt-5 font-display font-bold tracking-[-0.025em]",
                "leading-[1.08] text-white",
                // Measured from the design at ~41px on a 1440 frame.
                "text-[1.875rem] sm:text-[2.25rem] xl:text-[2.5625rem]",
              )}
            >
              {industries.headline}
            </motion.h2>

            <motion.p
              {...rise(0.16)}
              className="mt-5 max-w-[26rem] text-sm leading-relaxed text-pretty text-neutral-400 sm:text-base"
            >
              {industries.description}
            </motion.p>
          </div>

          <motion.div {...rise(0.24)} className="lg:pt-8">
            <Link
              href={industries.link.href}
              className={cn(
                "group inline-flex items-center gap-2 rounded-md",
                "text-[0.9375rem] font-medium text-brand-300",
                "duration-fast transition-colors hover:text-brand-200",
              )}
            >
              {industries.link.label}
              <ArrowRightIcon
                className={cn(
                  "duration-normal size-4 transition-transform ease-out",
                  "group-hover:translate-x-1",
                )}
              />
            </Link>
          </motion.div>
        </div>

        {/* ============================ Accordion ======================= */}
        <motion.ul
          {...rise(0.1)}
          className={cn(
            // Below lg: a plain responsive grid.
            "mt-10 grid gap-3 sm:grid-cols-2 lg:mt-12",
            // lg+: one flex row whose children grow and shrink.
            "lg:flex lg:h-[27rem] lg:gap-2.5",
          )}
        >
          {industries.items.map((item, index) => {
            const isActive = index === activeIndex;

            return (
              <li
                key={item.title}
                className={cn(
                  "min-w-0",
                  // The growth ratio: active takes ~1.4x an inactive card,
                  // matching the design's measured 279:195.
                  "lg:transition-[flex-grow] lg:duration-500 lg:ease-out",
                  isActive ? "lg:grow-[1.42]" : "lg:grow",
                )}
                // basis-0 makes grow the sole determinant of width.
                style={{ flexBasis: 0 }}
              >
                <Link
                  href={item.href}
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  className={cn(
                    "group relative block h-full overflow-hidden rounded-xl",
                    "aspect-[3/4] sm:aspect-[4/5] lg:aspect-auto",
                    // The active card lifts slightly out of the row.
                    "transition-transform duration-500 ease-out",
                    isActive && "lg:-translate-y-2",
                  )}
                >
                  {/* Top rule — amber when active, violet otherwise. */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-0 top-0 z-20 h-[2px] transition-colors duration-500",
                      isActive ? "bg-accent-400" : "bg-brand-400/70",
                    )}
                  />

                  {/* Photo */}
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 28vw, (min-width: 640px) 50vw, 100vw"
                    className={cn(
                      // `scale`, not `transform`: Tailwind v4 compiles scale-* to the
                      // standalone property, so naming transform leaves it unanimated.
                      "object-cover transition-[scale,filter] duration-700 ease-out",
                      isActive
                        ? "scale-100 saturate-100"
                        : "scale-[1.04] saturate-[0.7]",
                    )}
                  />

                  {/*
                    Legibility scrim.

                    Two stacked layers rather than one gradient: a flat wash
                    over the whole photo, plus a strong bottom-up fade behind
                    the text. Measured against the design, the text band needs
                    to sit near-black (luminance ~6) — a single gradient light
                    enough to keep the upper photo visible cannot also get the
                    foot dark enough.
                  */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-0 z-10 bg-black transition-opacity duration-500",
                      // Tuned against the design, whose photos are dark, moody
                      // industry shots. The current placeholder is a bright
                      // office scene, so it still reads lighter than the
                      // design here; with the real photography these values
                      // land correctly and should not need changing.
                      isActive ? "opacity-45" : "opacity-60",
                    )}
                  />
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-0 bottom-0 z-10 h-3/4",
                      "bg-gradient-to-t from-black via-black/90 to-transparent",
                    )}
                  />

                  {/* Content */}
                  <div className="absolute inset-x-0 bottom-0 z-20 p-4 sm:p-5">
                    <span
                      aria-hidden="true"
                      className={cn(
                        "font-mono text-[0.6875rem] font-medium transition-colors duration-500",
                        isActive ? "text-accent-400" : "text-brand-300",
                      )}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <h3
                      className={cn(
                        "mt-2 leading-tight font-semibold text-white",
                        "text-[1.0625rem] sm:text-xl",
                      )}
                    >
                      {item.title}
                    </h3>

                    <p className="mt-2 text-[0.8125rem] leading-relaxed text-pretty text-neutral-300">
                      {item.description}
                    </p>

                    <span
                      className={cn(
                        "mt-4 inline-flex items-center gap-1.5",
                        "text-[0.8125rem] font-medium text-brand-300",
                        "duration-fast transition-colors group-hover:text-brand-200",
                      )}
                    >
                      {industries.cardLink}
                      <ArrowRightIcon
                        className={cn(
                          "duration-normal size-3.5 transition-transform ease-out",
                          "group-hover:translate-x-1",
                        )}
                      />
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </motion.ul>
      </Container>
    </section>
  );
}
