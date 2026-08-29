"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { resources } from "@/content/resources";
import { cn } from "@/lib/utils";

/**
 * RESOURCES TYPES
 * ---------------------------------------------------------------------------
 * Section 3 of the Resources page: the five resource types as a row of cards
 * on the near-black ground.
 *
 * THE CARDS
 * Each is a whole-card link, not a card with a link inside it. The design gives
 * every one an arrow in its lower left, which reads as the affordance — making
 * only that arrow clickable would leave most of the target inert.
 *
 * The violet bar on each card's RIGHT edge is the design's signature here, and
 * it is drawn as a positioned span rather than a border so it can grow on hover
 * without shifting the card's box.
 *
 * THE BACKGROUND
 * A dot grid at the left and faint rings at the upper right, both drawn rather
 * than shipped — flat geometry that costs nothing and stays sharp. The supplied
 * background PNG carries the same two motifs baked into a 1672x941 raster,
 * which would letterbox at any other aspect.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { types } = resources;

export function ResourcesTypes() {
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
        "relative isolate overflow-hidden py-section-lg",
        // The ground, sampled from the design.
        "bg-[#0c0b13] text-white",
      )}
    >
      <TypesBackdrop />

      <Container width="wide" className="relative">
        {/* =========================== Statement ===================== */}
        <motion.div {...rise(0)}>
          <p
            className={cn(
              "text-[0.6875rem] font-bold uppercase",
              "tracking-[0.18em] text-[#9666ea] sm:text-xs",
            )}
          >
            {types.eyebrow}
          </p>
          {/* The short rule under the eyebrow, as the design draws it. */}
          <span
            aria-hidden="true"
            className="mt-3 block h-0.5 w-8 bg-[#7c3ad9]"
          />
        </motion.div>

        <motion.h2
          {...rise(0.08)}
          className={cn(
            "mt-7 font-display font-bold tracking-[-0.035em]",
            "leading-[1.08] text-white",
            // Measured from the design at ~54px on a 1440 frame.
            "text-[2rem] sm:text-[2.5rem] xl:text-[3.25rem]",
          )}
        >
          {types.headline}
        </motion.h2>

        <motion.p
          {...rise(0.16)}
          className={cn(
            "mt-5 max-w-116 leading-relaxed text-pretty",
            "text-[1.0625rem] text-neutral-400 sm:text-lg",
          )}
        >
          {types.description.map((line) => (
            // The authored breaks hold once there is room for them; below lg
            // the lines wrap naturally, which is what a narrow column needs.
            <span key={line} className="inline lg:block">
              {line}{" "}
            </span>
          ))}
        </motion.p>

        {/* ============================ Cards ======================== */}
        <ol
          className={cn(
            "mt-14 grid gap-4",
            // Five across on xl, as the design shows. Below that they step
            // down rather than shrinking to unreadable slivers.
            "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
          )}
        >
          {types.items.map((item, index) => (
            <motion.li
              key={item.name}
              initial={reduce ? "shown" : "hidden"}
              whileInView="shown"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: { opacity: 0, y: 22 },
                shown: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.55,
                    delay: 0.24 + index * 0.08,
                    ease: easeOut,
                  },
                },
              }}
            >
              <Link
                href={item.href}
                className={cn(
                  "group relative flex h-full flex-col overflow-hidden",
                  "rounded-2xl border border-white/10 bg-[#15151d] p-6",
                  "duration-normal transition-[background-color,border-color,translate] ease-out",
                  "will-change-[translate]",
                  "hover:-translate-y-1 hover:border-white/20 hover:bg-[#1a1a24]",
                  "focus-visible:ring-2 focus-visible:ring-[#9666ea]/60 focus-visible:outline-none",
                )}
              >
                {/* The violet bar on the right edge — the design's signature
                    detail. A span rather than a border, so it can widen on
                    hover without changing the card's box. */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-y-0 right-0 w-0.5 bg-[#9575d1]",
                    "duration-normal transition-[width,background-color] ease-out",
                    "group-hover:w-1 group-hover:bg-[#a98ae4]",
                  )}
                />

                <Image
                  src={item.icon.src}
                  alt=""
                  width={item.icon.width}
                  height={item.icon.height}
                  // Decorative: the type's name below it is the label.
                  aria-hidden="true"
                  className={cn(
                    "size-20 shrink-0",
                    // `scale`, not `transform` — Tailwind v4 compiles the
                    // scale utilities to the standalone property.
                    "transition-[scale] duration-300 ease-out",
                    "group-hover:scale-105",
                  )}
                />

                {/* The numeral is content — it is the type's position in the
                    library, and the design sets it as a label. */}
                <p className="mt-7 text-[0.8125rem] font-semibold text-[#935fd7] tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </p>

                <p className="mt-2 text-[1.0625rem] font-semibold text-pretty text-white">
                  {item.name}
                </p>

                <p className="mt-2.5 text-[0.875rem] leading-relaxed text-pretty text-neutral-400">
                  {item.description}
                </p>

                {/* The arrow sits at the card's foot whatever the description
                    height, so the row's arrows line up. */}
                <span
                  aria-hidden="true"
                  className="mt-auto flex items-center pt-7"
                >
                  <ArrowIcon
                    className={cn(
                      "size-5 text-[#8656db]",
                      "duration-normal transition-[translate,color] ease-out",
                      "group-hover:translate-x-1 group-hover:text-[#a98ae4]",
                    )}
                  />
                </span>
              </Link>
            </motion.li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

/**
 * The section's two background motifs: a dot grid down the left and faint
 * concentric rings at the upper right.
 *
 * Both drawn rather than shipped. The supplied background PNG bakes them into
 * a fixed 1672x941 raster, which would letterbox or crop at any other aspect;
 * these reflow with the section instead and cost nothing to fetch.
 */
function TypesBackdrop() {
  return (
    <>
      {/* The dot grid. A tiled radial-gradient rather than hundreds of
          elements, masked so it fades before reaching the copy. */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute top-0 left-0 -z-10",
          "hidden h-[30rem] w-[22rem] sm:block",
        )}
        style={{
          backgroundImage:
            "radial-gradient(circle, rgb(150 102 234 / 0.45) 1.2px, transparent 1.2px)",
          backgroundSize: "22px 22px",
          maskImage:
            "radial-gradient(circle at 0% 18%, black, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(circle at 0% 18%, black, transparent 78%)",
        }}
      />

      {/* The rings at the upper right. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 400 400"
        fill="none"
        className={cn(
          "pointer-events-none absolute -top-24 -right-16 -z-10",
          "hidden h-[34rem] w-[34rem] lg:block",
        )}
        style={{
          maskImage:
            "radial-gradient(circle at 62% 42%, black, transparent 74%)",
          WebkitMaskImage:
            "radial-gradient(circle at 62% 42%, black, transparent 74%)",
        }}
      >
        <g stroke="rgb(150 102 234 / 0.22)" strokeWidth="1">
          <circle cx="230" cy="160" r="96" />
          <circle cx="230" cy="160" r="140" />
          <circle cx="230" cy="160" r="186" />
          <circle cx="150" cy="210" r="118" />
        </g>
      </svg>
    </>
  );
}

/** The arrow at the foot of each card. */
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
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
