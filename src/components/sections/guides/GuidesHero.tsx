"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { guides } from "@/content/guides";
import { cn } from "@/lib/utils";

/**
 * GUIDES HERO
 * ---------------------------------------------------------------------------
 * Section 1 of the Guides & Playbooks page: the statement on the left, the
 * printed collection on the right over a dark, lit backdrop.
 *
 * TWO IMAGE LAYERS
 * The backdrop (bg1) is full-bleed behind the whole section — dark ground, a
 * lit cream disc, faint line art. The collection (bg2) sits over it, keyed out
 * of the checkerboard it was delivered on. They are separate layers rather than
 * one flattened picture because the disc has to run to the section's edges
 * while the collection stays a bounded object beside the copy: at wide
 * viewports a single image would either crop the collection or stretch the
 * disc.
 *
 * The backdrop is positioned right, not centred. Its lit disc sits in the
 * image's own right half, and centring it at wide viewports drags the glow
 * behind the copy where it washes out the text.
 *
 * TYPE
 * The headline is the serif, unlike the sans-serif heroes elsewhere in the
 * site — the design sets this page in the high-contrast display face, which is
 * already loaded as `font-serif` (Playfair Display) in the root layout.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { hero } = guides;

export function GuidesHero() {
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
        "relative isolate overflow-hidden",
        // The near-black ground, sampled from the design. It also backs the
        // areas the backdrop image does not reach at extreme aspect ratios.
        "bg-[#0e0e0c] text-white",
        // Extra top padding: this is the first section under the floating nav
        // pill, so it needs clearance the mid-page sections do not.
        "pt-28 pb-section-lg sm:pt-32 lg:pt-36",
      )}
    >
      {/* ========================== The backdrop ===================== */}
      {/*
        Anchored right — see the note at the top of this file. Below lg it is
        dimmed further: the copy stacks over the collection there, and the lit
        disc behind body text at phone widths costs more contrast than the
        atmosphere is worth.
      */}
      <Image
        src={hero.backdrop.src}
        alt={hero.backdrop.alt}
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-right opacity-45 lg:opacity-100"
      />

      {/* A scrim over the backdrop's left half, so the copy always has ground
          to sit on however the disc lands at a given viewport. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(90deg, #0e0e0c 8%, rgb(14 14 12 / 0.82) 34%, rgb(14 14 12 / 0.25) 56%, transparent 72%)",
        }}
      />

      <Container width="wide" className="relative">
        <div
          className={cn(
            "grid items-center gap-12",
            // Measured from the design: the statement runs to roughly 45% of
            // the frame, the collection takes the rest.
            "lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-8",
          )}
        >
          {/* =========================== Statement ==================== */}
          <div>
            {/* The eyebrow, with the long rule and arrow the design draws
                trailing it. */}
            <motion.div
              {...rise(0)}
              className="flex items-center gap-4 sm:gap-5"
            >
              <p
                className={cn(
                  "text-[0.6875rem] font-bold uppercase",
                  "tracking-[0.18em] text-[#ac82dd] sm:text-xs",
                )}
              >
                {hero.eyebrow}
              </p>
              <EyebrowRule className="h-2 w-20 text-[#6d4a9c] sm:w-28" />
            </motion.div>

            <motion.h1
              {...rise(0.08)}
              className={cn(
                "mt-7 font-serif font-normal tracking-[-0.015em]",
                // Warm cream, not white — sampled from the design.
                "leading-[1.14] text-[#faf1e5]",
                // Measured from the design at ~76px on a 1884 frame.
                "text-[2.25rem] sm:text-[3rem] xl:text-[4rem]",
              )}
            >
              {hero.headline.map((line) => (
                // Inline below lg so the sentence flows at narrow measures;
                // broken onto its own lines from lg, as the design sets it.
                <span key={line} className="inline lg:block">
                  {line}{" "}
                </span>
              ))}
            </motion.h1>

            <motion.p
              {...rise(0.16)}
              className={cn(
                "mt-7 max-w-124 leading-relaxed text-pretty",
                // The warm sand the design uses for body copy on this ground.
                "text-[1.0625rem] text-[#ab937a] sm:text-lg",
              )}
            >
              {hero.description}
            </motion.p>

            {/* --------------------------- Actions --------------------- */}
            <motion.div
              {...rise(0.24)}
              className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4"
            >
              <Link
                href={hero.actions.primary.href}
                className={cn(
                  // Squared, not pill-rounded — the design draws a rectangle
                  // here, unlike the rounded CTAs on the other Resources pages.
                  "group/cta inline-flex h-15 items-center justify-center gap-4 rounded-sm px-9",
                  "bg-[#6a34c4] text-[0.9375rem] font-semibold text-white",
                  // `translate`, not `transform`: Tailwind v4 compiles the
                  // translate utilities to the standalone property.
                  "duration-normal transition-[background-color,box-shadow,translate] ease-out",
                  "will-change-[translate]",
                  "hover:-translate-y-0.5 hover:bg-[#7b41dc]",
                  "hover:shadow-[0_18px_38px_-14px_rgb(106_52_196/0.75)]",
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
                  "text-[0.9375rem] font-semibold text-[#faf1e5]",
                )}
              >
                <span className="inline-flex items-center gap-3">
                  {hero.actions.secondary.label}
                  <ArrowIcon
                    className={cn(
                      "size-4",
                      "duration-normal transition-[translate] ease-out",
                      "group-hover/link:translate-x-1",
                    )}
                  />
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-2 block h-px w-full origin-left bg-[#8b6bc4]",
                    "duration-normal transition-transform ease-out",
                    "group-hover/link:scale-x-0",
                  )}
                />
              </Link>
            </motion.div>

            {/* -------------------------- Categories ------------------- */}
            <motion.ul
              {...rise(0.32)}
              className="mt-12 flex flex-wrap items-center gap-x-4 gap-y-3"
            >
              {hero.categories.map((category, index) => (
                <li key={category} className="flex items-center gap-4">
                  <span
                    className={cn(
                      "text-[0.6875rem] font-bold uppercase",
                      "tracking-[0.16em] text-[#a88252] sm:text-xs",
                    )}
                  >
                    {category}
                  </span>

                  {/* The separator trails its item, so a wrapped row never
                      starts with a stray dot. */}
                  {index < hero.categories.length - 1 && (
                    <span aria-hidden="true" className="text-[#5c4a34]">
                      &middot;
                    </span>
                  )}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* ========================== Collection ===================== */}
          <motion.div
            initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: "some" }}
            transition={{ duration: 0.85, delay: 0.2, ease: easeOut }}
            className="group/pile relative"
          >
            <Image
              src={hero.cluster.src}
              alt={hero.cluster.alt}
              width={hero.cluster.width}
              height={hero.cluster.height}
              // Above the fold and the visual subject, so it must not
              // lazy-load — this is the LCP candidate on the page.
              priority
              sizes="(min-width: 1024px) 52vw, 92vw"
              className={cn(
                "h-auto w-full",
                "drop-shadow-[0_36px_60px_rgb(0_0_0/0.55)]",
                // A slight lift on hover, so the collection reads as physical
                // objects on a surface rather than a flat picture.
                "duration-slow transition-[scale] ease-out",
                "will-change-[scale]",
                "group-hover/pile:lg:scale-[1.02]",
                "motion-reduce:transition-none",
              )}
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

/** The rule and arrow trailing the eyebrow. */
function EyebrowRule({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 8"
      fill="none"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M0 4h74m0 0-5-3.2M74 4l-5 3.2"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
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
