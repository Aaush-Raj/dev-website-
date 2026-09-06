"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { kxp } from "@/content/kxp";
import { cn } from "@/lib/utils";

/**
 * KXP HERO
 * ---------------------------------------------------------------------------
 * Section 1 of the LurnyKxP page: the statement on the left, the product
 * composition on the right.
 *
 * THE COMPOSITION
 * One image rather than six positioned cards — the design draws connector
 * lines BETWEEN the cards, so assembling them from the individual exports
 * would mean redrawing every connector for no gain.
 *
 * It overflows its column to the right, as the design frames it.
 *
 * THE LEFT EDGE MASK
 * The export carries two fragments of the neighbouring copy column at its far
 * left — "...ey" and "One learner record". They cannot be cropped: both sit in
 * the same band as the Achievement card, one beside it and one below it, so
 * any crop that clears them takes the card too. They are masked instead, with
 * a short fade over the leftmost few percent. On this near-black ground the
 * fade is invisible as an effect and simply reads as the cluster receding.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { hero } = kxp;

/** The glyphs beside the three proof points. */
const featureIcons = {
  person: PersonIcon,
  chart: ChartIcon,
  record: RecordIcon,
} as const;

export function KxpHero() {
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
        "bg-[#050507]",
        // Extra top padding: this is the first section under the floating nav
        // pill, so it needs clearance the mid-page sections do not.
        "pt-28 pb-section-lg sm:pt-32 lg:pt-36",
      )}
    >
      {/* The violet bloom behind the composition, lifting it off the flat
          ground without competing with the card artwork. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: [
            "radial-gradient(52rem 40rem at 72% 46%, rgb(140 60 230 / 0.20), transparent 68%)",
            "radial-gradient(30rem 26rem at 14% 22%, rgb(140 60 230 / 0.08), transparent 72%)",
          ].join(","),
        }}
      />

      <Container width="wide" className="relative">
        <div
          className={cn(
            "grid items-center gap-14",
            // Measured from the design: the statement runs to roughly 42% of
            // the frame, the composition takes the rest.
            "lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1fr)] lg:gap-10",
          )}
        >
          {/* =========================== Statement ==================== */}
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "flex flex-wrap items-center gap-x-3 gap-y-1",
                "text-[0.6875rem] font-bold uppercase",
                "tracking-[0.16em] text-[#af54f5] sm:text-xs",
              )}
            >
              {hero.eyebrow.map((part, index) => (
                <span key={part} className="flex items-center gap-3">
                  {part}
                  {index < hero.eyebrow.length - 1 && (
                    <span aria-hidden="true" className="text-[#6b3a9c]">
                      &middot;
                    </span>
                  )}
                </span>
              ))}
            </motion.p>

            <motion.h1
              {...rise(0.08)}
              className={cn(
                "mt-7 font-display font-bold tracking-[-0.035em]",
                "leading-[1.06] text-white",
                // Measured from the design at ~64px on a 1551 frame.
                "text-[2.5rem] sm:text-[3.25rem] xl:text-[4rem]",
              )}
            >
              {hero.headline.map((line, index) => (
                <span key={line} className="inline lg:block">
                  {line}
                  {/* The amber full stop closing the last line. Decorative
                      punctuation on a heading, so it is hidden rather than
                      read out as a stray character. */}
                  {index === hero.headline.length - 1 && (
                    <span aria-hidden="true" className="text-[#fec04b]">
                      .
                    </span>
                  )}{" "}
                </span>
              ))}
            </motion.h1>

            <motion.p
              {...rise(0.16)}
              className={cn(
                "mt-7 max-w-108 leading-relaxed text-pretty",
                "text-[1.0625rem] text-[#a8b0bd] sm:text-lg",
              )}
            >
              {hero.description}
            </motion.p>

            {/* --------------------------- Actions -------------------- */}
            <motion.div
              {...rise(0.24)}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <Link
                href={hero.actions.primary.href}
                className={cn(
                  "group/cta inline-flex h-14 items-center justify-center gap-3 rounded-xl px-8",
                  // Amber on near-black, as the design has it — the only
                  // warm element in the section, which is what makes it the
                  // obvious next step.
                  "bg-[#fec04b] text-[0.9375rem] font-semibold text-[#1a1206]",
                  // `translate`, not `transform`: Tailwind v4 compiles the
                  // translate utilities to the standalone property.
                  "duration-normal transition-[background-color,box-shadow,translate] ease-out",
                  "will-change-[translate]",
                  "hover:-translate-y-0.5 hover:bg-[#ffcd6a]",
                  "hover:shadow-[0_16px_36px_-12px_rgb(254_192_75/0.5)]",
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

              {/* Secondary action — an outlined button, as the design draws
                  it, rather than a second filled one competing with the
                  primary. */}
              <Link
                href={hero.actions.secondary.href}
                className={cn(
                  "inline-flex h-14 items-center justify-center rounded-xl px-8",
                  "ring-1 ring-[#6e4394]",
                  "text-[0.9375rem] font-semibold text-white",
                  "duration-normal transition-[background-color,box-shadow,translate] ease-out",
                  "will-change-[translate]",
                  "hover:-translate-y-0.5 hover:bg-white/6 hover:ring-[#9060c4]",
                  "active:translate-y-0",
                )}
              >
                {hero.actions.secondary.label}
              </Link>
            </motion.div>

            {/* -------------------------- Features -------------------- */}
            <motion.ul
              {...rise(0.32)}
              className="mt-11 flex flex-wrap items-center gap-x-4 gap-y-3"
            >
              {hero.features.map((feature, index) => {
                const Icon = featureIcons[feature.icon];

                return (
                  <li key={feature.label} className="flex items-center gap-4">
                    <span className="flex items-center gap-2.5">
                      <Icon className="size-4 shrink-0 text-[#ad55ea]" />
                      <span className="text-[0.875rem] text-[#c2c8d2]">
                        {feature.label}
                      </span>
                    </span>

                    {/* The separator trails its item, so a wrapped row never
                        starts with a stray dot. */}
                    {index < hero.features.length - 1 && (
                      <span aria-hidden="true" className="text-[#3d4250]">
                        &middot;
                      </span>
                    )}
                  </li>
                );
              })}
            </motion.ul>
          </div>

          {/* ========================= Composition ==================== */}
          <motion.div
            initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: "some" }}
            transition={{ duration: 0.85, delay: 0.2, ease: easeOut }}
            className={cn(
              "relative",
              // Runs past its column to the right, as the design frames it.
              // The section clips the overflow, which is also what removes the
              // export's stray left-edge fragments — see the note at the top.
              "lg:-mr-[8vw] xl:-mr-[6vw]",
            )}
          >
            <Image
              src={hero.composition.src}
              alt={hero.composition.alt}
              width={hero.composition.width}
              height={hero.composition.height}
              // Above the fold and the visual subject, so it must not
              // lazy-load — this is the LCP candidate on the page.
              priority
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="h-auto w-full"
              // The left-edge fade — see the note at the top of this file.
              style={{
                maskImage:
                  "linear-gradient(90deg, transparent 0%, transparent 4%, black 13%)",
                WebkitMaskImage:
                  "linear-gradient(90deg, transparent 0%, transparent 4%, black 13%)",
              }}
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

/** Personalised learning. */
function PersonIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="8" cy="5" r="2.6" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M2.8 13.6c0-2.6 2.3-4.2 5.2-4.2s5.2 1.6 5.2 4.2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Capability growth. */
function ChartIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M3 13V8.4M8 13V3.6M13 13v-6.2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** One learner record. */
function RecordIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="3"
        y="2.2"
        width="10"
        height="11.6"
        rx="1.6"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M5.8 6h4.4M5.8 8.6h4.4M5.8 11.2h2.6"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** The arrow on the primary action. */
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
