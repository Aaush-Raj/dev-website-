"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { resources } from "@/content/resources";
import { cn } from "@/lib/utils";

/**
 * RESOURCES HERO
 * ---------------------------------------------------------------------------
 * Section 1 of the Resources page: the statement on the left, and on the right
 * three book covers fanned in depth — the featured guide front and centre with
 * two more stepping back behind its right edge.
 *
 * THE COVERS
 * Three transparent PNGs, trimmed and converted by
 * scripts/build-resource-books.cjs. They are positioned as percentages of a
 * shared box whose aspect matches the design's (607x448, ~1.355), so the whole
 * arrangement scales as one unit and the overlaps hold at any width rather than
 * drifting apart the way three independently-sized images would.
 *
 * `z-index` runs BACK to FRONT in the opposite order to the DOM: the rearmost
 * cover is first in source so it paints first, and the featured guide last so
 * it sits over both. Their entrance is staggered the same way — back, middle,
 * front — so the group assembles into depth rather than appearing flat.
 *
 * On hover the fan opens slightly: the two behind step further out and up while
 * the featured cover lifts, which is what reads as three separate objects
 * rather than one flat picture.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { hero } = resources;

/**
 * Each cover's box, as percentages of the shared cluster.
 *
 * Anchored from the BOTTOM, not the top. Measured off the design, the three
 * covers sit on very nearly a common baseline (100%, 96.4%, 95.8% of the
 * cluster height) with their TOPS staggered — they are standing on a surface,
 * and their different heights are what steps the tops back. Positioning from
 * `top` instead leaves them floating at unrelated heights with a gap beneath.
 *
 * Sized by HEIGHT, not width. In the design the two rear covers are partly
 * hidden behind the featured one, so their VISIBLE widths (aspect 0.38, 0.37)
 * are much narrower than the full artwork (0.61, 0.54). Sizing them to the
 * visible width would squash them; sizing by height and letting the featured
 * cover overlap reproduces the design's fan correctly.
 */
const COVERS = [
  {
    key: "back",
    image: hero.books.back,
    // Furthest back, so it paints first and enters first.
    className: "right-0 h-[75.2%] bottom-[4.2%] z-10",
    // Opens up and to the right on hover — the largest travel of the three,
    // since it is furthest away.
    hover:
      "group-hover/books:lg:-translate-y-2.5 group-hover/books:lg:translate-x-2",
    delay: 0.15,
  },
  {
    key: "middle",
    image: hero.books.middle,
    className: "right-[22.6%] h-[84.4%] bottom-[3.6%] z-20",
    hover:
      "group-hover/books:lg:-translate-y-1.5 group-hover/books:lg:translate-x-1",
    delay: 0.28,
  },
  {
    key: "featured",
    image: hero.books.featured,
    // The subject: tallest, frontmost, and the one that sets the baseline.
    className: "left-[1%] h-full bottom-0 z-30",
    hover: "group-hover/books:lg:-translate-y-1",
    delay: 0.41,
  },
] as const;

export function ResourcesHero() {
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
        // The near-black ground, sampled from the design.
        "bg-[#0a0b12]",
        // Extra top padding: this is the first section under the floating nav
        // pill, so it needs clearance the mid-page sections do not.
        "pt-28 pb-section-lg sm:pt-32 lg:pt-36",
      )}
    >
      {/* A faint violet bloom behind the covers, lifting them off the flat
          ground without competing with the artwork. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: [
            "radial-gradient(48rem 40rem at 74% 44%, rgb(124 58 217 / 0.16), transparent 66%)",
            "radial-gradient(30rem 26rem at 20% 30%, rgb(124 58 217 / 0.07), transparent 70%)",
          ].join(","),
        }}
      />

      <Container width="wide" className="relative">
        <div
          className={cn(
            "grid items-center gap-14",
            // Measured from the design: the statement runs to roughly 40% of
            // the frame, the covers take the rest.
            "lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1fr)] lg:gap-10",
            "xl:gap-14",
          )}
        >
          {/* =========================== Statement ===================== */}
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "text-[0.6875rem] font-bold uppercase",
                "tracking-[0.18em] text-[#a86ce0] sm:text-xs",
              )}
            >
              {hero.eyebrow}
            </motion.p>

            <motion.h1
              {...rise(0.08)}
              className={cn(
                "mt-7 font-display font-bold tracking-[-0.035em]",
                "leading-[1.06] text-white",
                // Measured from the design at ~72px on a 1440 frame.
                "text-[2.5rem] sm:text-[3.25rem] xl:text-[4.25rem]",
              )}
            >
              {hero.headline.map((line, index) => (
                <span key={line} className="inline lg:block">
                  {line}
                  {/* The violet full stop closes the last line. It is
                      decorative punctuation on a heading, so it is marked
                      aria-hidden rather than read out as a stray character. */}
                  {index === hero.headline.length - 1 && (
                    <span aria-hidden="true" className="text-[#8b4ad9]">
                      .
                    </span>
                  )}{" "}
                </span>
              ))}
            </motion.h1>

            <motion.p
              {...rise(0.16)}
              className={cn(
                "mt-7 max-w-100 leading-relaxed text-pretty",
                "text-[1.0625rem] text-neutral-400 sm:text-lg",
              )}
            >
              {hero.description}
            </motion.p>

            {/* --------------------------- Actions -------------------- */}
            <motion.div
              {...rise(0.24)}
              className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4"
            >
              <Link
                href={hero.actions.primary.href}
                className={cn(
                  "group/cta inline-flex h-14 items-center justify-center gap-3 rounded-xl px-8",
                  "bg-[#7c3ad9] text-[0.9375rem] font-semibold text-white",
                  // `translate`, not `transform`: Tailwind v4 compiles the
                  // translate utilities to the standalone property.
                  "duration-normal transition-[background-color,box-shadow,translate] ease-out",
                  "will-change-[translate]",
                  "hover:-translate-y-0.5 hover:bg-[#8b4ae8]",
                  "hover:shadow-[0_16px_36px_-12px_rgb(124_58_217/0.7)]",
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

              {/* Secondary action — an underlined text link, as in the design,
                  not a second button competing with the primary. */}
              <Link
                href={hero.actions.secondary.href}
                className={cn(
                  "group/link inline-flex flex-col items-start",
                  "text-[0.9375rem] font-semibold text-white",
                )}
              >
                <span className="inline-flex items-center gap-2.5">
                  {hero.actions.secondary.label}
                  <ArrowIcon
                    className={cn(
                      "size-4 text-[#a86ce0]",
                      "duration-normal transition-[translate] ease-out",
                      "group-hover/link:translate-x-1",
                    )}
                  />
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-1.5 block h-px w-full origin-left bg-[#8b4ad9]",
                    "duration-normal transition-transform ease-out",
                    "group-hover/link:scale-x-0",
                  )}
                />
              </Link>
            </motion.div>

            {/* -------------------------- Categories ------------------ */}
            <motion.ul
              {...rise(0.32)}
              className="mt-12 flex flex-wrap items-center gap-x-4 gap-y-3"
            >
              {hero.categories.map((category, index) => (
                <li key={category} className="flex items-center gap-4">
                  <span className="flex items-center gap-2.5">
                    <span
                      aria-hidden="true"
                      className="size-1.5 shrink-0 rounded-full bg-[#8b4ad9]"
                    />
                    <span className="text-[0.875rem] text-neutral-400">
                      {category}
                    </span>
                  </span>

                  {/* The separator trails its item, so a wrapped row never
                      starts with a stray dot. */}
                  {index < hero.categories.length - 1 && (
                    <span aria-hidden="true" className="text-neutral-700">
                      ·
                    </span>
                  )}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* ============================ Covers ======================= */}
          {/*
            The shared box. Its aspect matches the design's cluster (607x448),
            so the three covers keep their overlaps at every width — see the
            note at the top of this file.

            `group/books` makes the whole arrangement one hover target: the
            covers behind cannot be hovered individually where the front one
            overlaps them, and moving only the hovered cover would break the
            group apart rather than opening it.
          */}
          <div className="group/books relative aspect-[607/448] w-full lg:-mt-6">
            {COVERS.map((cover) => (
              <motion.div
                key={cover.key}
                initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: "some" }}
                transition={{
                  duration: 0.75,
                  delay: cover.delay,
                  ease: easeOut,
                }}
                className={cn("absolute", cover.className)}
              >
                <Image
                  src={cover.image.src}
                  alt={cover.image.alt}
                  width={cover.image.width}
                  height={cover.image.height}
                  // Above the fold, so these must not lazy-load — the featured
                  // cover is the LCP candidate.
                  priority
                  sizes="(min-width: 1024px) 30vw, 50vw"
                  className={cn(
                    "h-full w-auto",
                    "drop-shadow-[0_30px_50px_rgb(0_0_0/0.55)]",
                    // The fan opening on hover. Each cover travels a different
                    // distance, which is what separates them in depth.
                    "transition-[translate] duration-500 ease-out",
                    "will-change-[translate]",
                    cover.hover,
                    // Ambient movement is what reduced-motion asks us to drop.
                    "motion-reduce:transition-none",
                  )}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/** The arrow on both hero actions. */
function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M3 8h9m0 0-3.4-3.4M12 8l-3.4 3.4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
