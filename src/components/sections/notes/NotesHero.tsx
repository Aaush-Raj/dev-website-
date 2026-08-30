"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { notes } from "@/content/notes";
import { cn } from "@/lib/utils";

import { ArrowIcon, featureIcons } from "./NotesIcons";
import { NotesPanel } from "./NotesPanel";

/**
 * NOTES HERO
 * ---------------------------------------------------------------------------
 * Section 1 of the LurnyNotes page: the statement on the left, the product
 * panel on the right, over a photograph of someone working — with three
 * feature notes along the foot.
 *
 * THE BACKDROP
 * The photograph is a full-bleed layer behind everything, scrimmed so the copy
 * stays legible over it. The design's own image is a man at a laptop; the one
 * shipping here is a placeholder — see the note in content/notes.ts.
 *
 * The scrim is heaviest on the left, where the statement sits, and lifts across
 * the panel so the scene still reads behind it.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { hero } = notes;

/** The outlined disc behind each feature icon, keyed by its `accent`. */
const featureTone = {
  violet: "border-[#c56fd0]/60 text-[#e376d2]",
  amber: "border-[#f4922a]/60 text-[#f4922a]",
  green: "border-[#62e151]/55 text-[#62e151]",
} as const;

export function NotesHero() {
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
        "relative isolate overflow-hidden text-white",
        // The near-black ground, sampled from the design. It also shows
        // through wherever the backdrop is scrimmed out.
        "bg-[#00040f]",
        // Extra top padding: this is the first section under the floating nav
        // pill, so it needs clearance the mid-page sections do not.
        "pt-28 pb-16 sm:pt-32 lg:pt-36 lg:pb-20",
      )}
    >
      {/* ========================= The backdrop ====================== */}
      <Image
        src={hero.backdrop.src}
        alt={hero.backdrop.alt}
        width={hero.backdrop.width}
        height={hero.backdrop.height}
        aria-hidden="true"
        // Above the fold, so it must not lazy-load.
        priority
        sizes="100vw"
        className={cn(
          "pointer-events-none absolute inset-0 -z-20 size-full",
          // Anchored right: the subject sits on that side in both the design
          // and the placeholder, and the copy needs the left clear.
          "object-cover object-[72%_center]",
        )}
      />

      {/* The scrim — heaviest over the copy, lifting across the panel. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: [
            "linear-gradient(90deg, rgb(0 4 15 / 0.97) 0%, rgb(0 4 15 / 0.93) 34%, rgb(0 4 15 / 0.72) 62%, rgb(0 4 15 / 0.55) 100%)",
            "linear-gradient(180deg, rgb(0 4 15 / 0.85) 0%, transparent 26%, transparent 62%, rgb(0 4 15 / 0.92) 100%)",
          ].join(","),
        }}
      />

      <Container width="wide" className="relative">
        <div
          className={cn(
            "grid items-center gap-14",
            // Measured from the design: the statement runs to roughly 40% of
            // the frame, the panel takes the rest.
            "lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1fr)] lg:gap-8",
            "xl:gap-12",
          )}
        >
          {/* =========================== Statement ===================== */}
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "text-[0.75rem] font-bold uppercase",
                "tracking-[0.22em] text-[#f8c23d] sm:text-sm",
              )}
            >
              {hero.eyebrow}
            </motion.p>

            <motion.h1
              {...rise(0.08)}
              className={cn(
                "mt-7 font-display font-bold tracking-[-0.035em]",
                "leading-[1.08] text-white",
                // Measured from the design at ~62px on a 1440 frame.
                "text-[2.25rem] sm:text-[3rem] xl:text-[3.875rem]",
              )}
            >
              {hero.headline.map((line, index) => (
                <span key={line} className="inline lg:block">
                  {line}
                  {/* The amber full stop closes the last line. Decorative
                      punctuation on a heading, so it is hidden from screen
                      readers rather than announced as a stray character. */}
                  {index === hero.headline.length - 1 && (
                    <span aria-hidden="true" className="text-[#f8b337]">
                      .
                    </span>
                  )}{" "}
                </span>
              ))}
            </motion.h1>

            <motion.p
              {...rise(0.16)}
              className={cn(
                "mt-7 max-w-116 leading-relaxed text-pretty",
                "text-[1.0625rem] text-neutral-300 sm:text-lg",
              )}
            >
              {hero.description}
            </motion.p>

            {/* --------------------------- Actions -------------------- */}
            <motion.div
              {...rise(0.24)}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Link
                href={hero.actions.primary.href}
                className={cn(
                  "group/cta inline-flex h-14 items-center justify-center gap-4 rounded-lg px-8",
                  "bg-[#f8c23d] text-[1rem] font-semibold text-[#1a1206]",
                  // `translate`, not `transform`: Tailwind v4 compiles the
                  // translate utilities to the standalone property.
                  "duration-normal transition-[background-color,box-shadow,translate] ease-out",
                  "will-change-[translate]",
                  "hover:-translate-y-0.5 hover:bg-[#ffd15c]",
                  "hover:shadow-[0_16px_36px_-12px_rgb(248_194_61/0.55)]",
                  "active:translate-y-0",
                )}
              >
                {hero.actions.primary.label}
                <ArrowIcon
                  className={cn(
                    "size-4",
                    "duration-normal transition-[translate] ease-out",
                    "group-hover/cta:translate-x-1",
                  )}
                />
              </Link>

              <Link
                href={hero.actions.secondary.href}
                className={cn(
                  "group/alt inline-flex h-14 items-center justify-center gap-4 rounded-lg px-8",
                  "border border-white/30 text-[1rem] font-semibold text-white",
                  "duration-normal transition-[background-color,border-color,translate] ease-out",
                  "will-change-[translate]",
                  "hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/8",
                  "active:translate-y-0",
                )}
              >
                {hero.actions.secondary.label}
                <ArrowIcon
                  className={cn(
                    "size-4",
                    "duration-normal transition-[translate] ease-out",
                    "group-hover/alt:translate-x-1",
                  )}
                />
              </Link>
            </motion.div>
          </div>

          {/* ============================ Panel ======================== */}
          <NotesPanel />
        </div>

        {/* =========================== Features ====================== */}
        {/*
          The three notes along the section's foot, divided by hairlines. The
          rules are left borders on items 2 and 3 rather than a wrapper each,
          so a rule falls only BETWEEN them and never as a stray outer edge.
        */}
        <motion.ul
          {...rise(0.32)}
          className={cn(
            "relative mt-16 grid gap-8",
            "sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-0",
          )}
        >
          {hero.features.map((feature, index) => {
            const Icon = featureIcons[feature.icon];

            return (
              <li
                key={feature.title}
                className={cn(
                  "flex items-center gap-5",
                  index > 0 && "lg:border-l lg:border-white/12 lg:pl-10",
                  index < hero.features.length - 1 && "lg:pr-10",
                )}
              >
                <span
                  className={cn(
                    "grid size-14 shrink-0 place-items-center rounded-full",
                    "border-2",
                    featureTone[feature.accent],
                  )}
                >
                  <Icon className="size-6" />
                </span>

                <span className="min-w-0">
                  <span className="block text-[1.0625rem] font-semibold text-pretty text-white">
                    {feature.title}
                  </span>
                  <span className="mt-1 block text-[0.9375rem] text-pretty text-neutral-400">
                    {feature.description}
                  </span>
                </span>
              </li>
            );
          })}
        </motion.ul>
      </Container>
    </section>
  );
}
