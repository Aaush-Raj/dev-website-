"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { resources } from "@/content/resources";
import { cn } from "@/lib/utils";

/**
 * RESOURCES GUIDES
 * ---------------------------------------------------------------------------
 * Section 5 of the Resources page: four downloadable guides as a row of cards
 * on the near-black ground.
 *
 * THE CARDS
 * Each is a whole-card link rather than a card with a "Download PDF" button
 * inside it. The button is the affordance the design shows, but making only it
 * clickable would leave the artwork and title inert — so it is rendered as a
 * styled span, and the card itself is the anchor.
 *
 * Every card carries its own accent, used for the short rule under the title.
 * They are sampled from the design and pick up the dominant tone of each card's
 * own artwork, which is what ties the rule to the image above it.
 *
 * THE ARTWORK
 * Opaque vintage textures, already matching the aspect of the band the design
 * gives them, so they sit in a fixed-ratio box at the card's top with no
 * cropping needed. See scripts/build-guide-cards.cjs.
 *
 * This section is warmer than the rest of the page — cream headings and tan
 * body over black rather than the violet-on-white used elsewhere — which is
 * what the design does to set the downloadables apart from the reading matter.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { guides } = resources;

/**
 * The rule under each card's title, keyed by the entry's `accent`. Sampled
 * from the design; see the note in content/resources.ts.
 */
const accentRule = {
  coral: "bg-[#d57050]",
  sage: "bg-[#738b71]",
  magenta: "bg-[#954b77]",
  gold: "bg-[#cd923d]",
} as const;

export function ResourcesGuides() {
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
        "bg-[#0c0c0c] text-white",
      )}
    >
      <GuidesBackdrop />

      <Container width="wide" className="relative">
        {/* =========================== Statement ===================== */}
        <motion.p
          {...rise(0)}
          className={cn(
            "flex items-center gap-4 text-[0.6875rem] font-bold uppercase",
            "tracking-[0.18em] text-[#a562eb] sm:text-xs",
          )}
        >
          {guides.eyebrow}
          {/* The long trailing arrow the design draws beside the eyebrow. */}
          <span
            aria-hidden="true"
            className="flex items-center gap-1 text-[#684c8f]"
          >
            <span className="h-px w-14 bg-current" />
            <svg viewBox="0 0 8 8" fill="none" className="size-2">
              <path
                d="m1 1 3 3-3 3"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </motion.p>

        <motion.h2
          {...rise(0.08)}
          className={cn(
            "mt-6 font-display font-bold tracking-[-0.03em]",
            // Cream rather than white — the design's warmer key for this
            // section.
            "leading-[1.08] text-[#f7f4e8]",
            // Measured from the design at ~56px on a 1440 frame.
            "text-[2rem] sm:text-[2.625rem] xl:text-[3.375rem]",
          )}
        >
          {guides.headline}
        </motion.h2>

        <motion.p
          {...rise(0.16)}
          className={cn(
            "mt-5 max-w-124 leading-relaxed text-pretty",
            "text-[1.0625rem] text-[#b59d85] sm:text-lg",
          )}
        >
          {guides.description.map((line) => (
            // The authored breaks hold once there is room; below lg the lines
            // wrap naturally, which is what a narrow column needs.
            <span key={line} className="inline lg:block">
              {line}{" "}
            </span>
          ))}
        </motion.p>

        {/* ============================ Cards ======================== */}
        <ul
          className={cn(
            "mt-14 grid gap-4",
            // Four across on xl, as the design shows; stepping down rather
            // than shrinking to unreadable slivers.
            "sm:grid-cols-2 xl:grid-cols-4",
          )}
        >
          {guides.items.map((item, index) => (
            <motion.li
              key={item.title}
              initial={reduce ? "shown" : "hidden"}
              whileInView="shown"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: { opacity: 0, y: 24 },
                shown: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    delay: 0.24 + index * 0.09,
                    ease: easeOut,
                  },
                },
              }}
            >
              <Link
                href={item.href}
                className={cn(
                  "group flex h-full flex-col overflow-hidden rounded-xl",
                  "border border-white/10 bg-[#151511]",
                  "duration-normal transition-[border-color,box-shadow,translate] ease-out",
                  "will-change-[translate]",
                  "hover:-translate-y-1 hover:border-white/20",
                  "hover:shadow-[0_24px_50px_-24px_rgb(0_0_0/0.9)]",
                  "focus-visible:ring-2 focus-visible:ring-[#a562eb]/60 focus-visible:outline-none",
                )}
              >
                {/* The artwork. A fixed ratio matching the source files, so
                    the band is the same height on every card however long the
                    titles below run. */}
                <span className="relative block aspect-[373/296] overflow-hidden">
                  <Image
                    src={item.art.src}
                    alt=""
                    width={item.art.width}
                    height={item.art.height}
                    // Decorative: the title below it is the label.
                    aria-hidden="true"
                    sizes="(min-width: 1280px) 22vw, (min-width: 640px) 45vw, 100vw"
                    className={cn(
                      "size-full object-cover",
                      // `scale`, not `transform` — Tailwind v4 compiles the
                      // scale utilities to the standalone property.
                      "transition-[scale] duration-500 ease-out",
                      "group-hover:scale-105",
                    )}
                  />
                </span>

                {/* The copy. */}
                <span className="flex flex-1 flex-col p-5">
                  <span
                    className={cn(
                      "block text-[0.625rem] font-bold tracking-[0.14em] uppercase",
                      "text-[#9872d2]",
                    )}
                  >
                    {item.kicker}
                  </span>

                  <span
                    className={cn(
                      "mt-3 block font-display font-semibold tracking-[-0.015em]",
                      "text-[1.1875rem] leading-[1.26] text-pretty text-[#f6f5ed]",
                    )}
                  >
                    {item.title}
                  </span>

                  {/* The accent rule — this card's own colour. */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "mt-4 block h-0.5 w-9",
                      accentRule[item.accent],
                      "duration-normal transition-[width] ease-out",
                      "group-hover:w-14",
                    )}
                  />

                  <span className="mt-4 block min-h-10 text-[0.875rem] text-[#b4997e]">
                    {item.meta}
                  </span>

                  {/*
                    The download affordance. A styled span, not a button or a
                    nested link — the whole card is already the anchor, and
                    nesting interactive elements is invalid.

                    Pushed to the card's foot so the row's buttons line up
                    whatever the title height.
                  */}
                  <span
                    className={cn(
                      "mt-auto flex items-center justify-center gap-3 pt-6",
                    )}
                  >
                    <span
                      className={cn(
                        "flex w-full items-center justify-center gap-3 rounded-lg",
                        "border border-[#6e4785] px-4 py-3",
                        "text-[0.875rem] font-medium text-[#eeede6]",
                        "duration-normal transition-[background-color,border-color] ease-out",
                        "group-hover:border-[#8f5fb0] group-hover:bg-[#a562eb]/12",
                      )}
                    >
                      <DownloadIcon
                        className={cn(
                          "size-4 shrink-0 text-[#a562eb]",
                          "duration-normal transition-[translate] ease-out",
                          "group-hover:translate-y-0.5",
                        )}
                      />
                      {guides.downloadLabel}
                    </span>
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
 * The section's background motifs: faint rings at the upper right and a small
 * dot grid beside them, plus a crosshair — the sparse technical marks the
 * design scatters over the black.
 *
 * Drawn rather than shipped: flat geometry that reflows with the section
 * instead of letterboxing the way a fixed raster would.
 */
function GuidesBackdrop() {
  return (
    <>
      <svg
        aria-hidden="true"
        viewBox="0 0 400 400"
        fill="none"
        className={cn(
          "pointer-events-none absolute -top-32 -right-24 -z-10",
          "hidden h-[34rem] w-[34rem] lg:block",
        )}
        style={{
          maskImage:
            "radial-gradient(circle at 55% 45%, black, transparent 74%)",
          WebkitMaskImage:
            "radial-gradient(circle at 55% 45%, black, transparent 74%)",
        }}
      >
        <g stroke="rgb(165 98 235 / 0.16)" strokeWidth="1">
          <circle cx="240" cy="170" r="96" />
          <circle cx="240" cy="170" r="146" />
          <circle cx="240" cy="170" r="196" />
          {/* The crosshair the design places among the rings. */}
          <path d="M120 92h26M133 79v26" strokeLinecap="round" />
        </g>
      </svg>

      {/* The dot grid at the upper right, tucked inside the rings. */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute top-4 right-8 -z-10",
          "hidden h-40 w-44 lg:block",
        )}
        style={{
          backgroundImage:
            "radial-gradient(circle, rgb(165 98 235 / 0.30) 1.1px, transparent 1.1px)",
          backgroundSize: "16px 16px",
          maskImage: "linear-gradient(200deg, black, transparent 78%)",
          WebkitMaskImage: "linear-gradient(200deg, black, transparent 78%)",
        }}
      />
    </>
  );
}

/** The downward arrow on each card's button. */
function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M10 3.5v11m0 0 4.2-4.2M10 14.5l-4.2-4.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
