"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { pitch } from "@/content/pitch";
import { cn } from "@/lib/utils";

/**
 * PITCH HERO
 * ---------------------------------------------------------------------------
 * Section 1 of the LurnyPitch page: the statement on the left, the product
 * shot bleeding off the right edge.
 *
 * LAYOUT
 * On lg the shot sits in its own column and extends past the container's right
 * edge, as in the design — the laptop is deliberately cropped by the viewport
 * rather than fitted inside the gutter, which is what gives the section its
 * sense of scale. Below lg it drops under the copy and sits fully inside the
 * gutter, because a cropped screenshot on a phone reads as a mistake.
 *
 * THE PRODUCT SHOT
 * One transparent PNG containing both the laptop and the phone, already
 * composed. See the note in content/pitch.ts for why it is a single asset and
 * how its transparency was recovered.
 *
 * The violet glow behind it is the sibling <span> below, not part of the
 * image. The design has a glow baked into the source file, but it was blended
 * over an opaque checkerboard there and could not be extracted, so it is
 * reproduced here in CSS. That is the better arrangement anyway: it blurs and
 * bleeds independently of the shot, and costs nothing to download.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { hero } = pitch;

export function PitchHero() {
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
        "relative overflow-hidden bg-[#f7f5fa]",
        // Extra top padding: this is the first section under the floating nav
        // pill, so it needs clearance the mid-page sections do not.
        "pt-28 pb-section-lg sm:pt-32 lg:pt-36",
      )}
    >
      {/* Soft violet glow behind the product shot. */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -top-20 right-0 hidden",
          "h-[38rem] w-[45rem] rounded-full bg-brand-300/25 blur-3xl",
          "lg:block",
        )}
      />

      <Container width="hero" className="relative">
        <div
          className={cn(
            "grid items-center gap-12",
            "lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1fr)] lg:gap-10",
          )}
        >
          {/* =========================== Statement ===================== */}
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "text-[0.6875rem] font-bold uppercase",
                "tracking-[0.14em] text-brand-600 sm:text-xs",
              )}
            >
              {hero.eyebrow.product}
              {/* Decorative separator — a screen reader would otherwise
                  announce "bullet" between the two halves. */}
              <span aria-hidden="true" className="mx-2 text-brand-400">
                ·
              </span>
              {hero.eyebrow.label}
            </motion.p>

            <motion.h1
              {...rise(0.08)}
              className={cn(
                "mt-6 font-display font-bold tracking-[-0.035em]",
                "leading-[1.08] text-neutral-900",
                // Measured from the design at ~62px on a 1440 frame.
                "text-[2.25rem] sm:text-[3rem] xl:text-[3.875rem]",
              )}
            >
              {hero.headline.map((line) => (
                <span key={line} className="inline lg:block">
                  {line}{" "}
                </span>
              ))}
            </motion.h1>

            <motion.p
              {...rise(0.16)}
              className={cn(
                "mt-7 max-w-[30rem] leading-relaxed text-pretty",
                "text-[1.0625rem] text-neutral-600 sm:text-lg",
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
                  "inline-flex h-14 items-center justify-center rounded-lg px-8",
                  "bg-neutral-900 text-[0.9375rem] font-semibold text-white",
                  // `translate`, not `transform`: Tailwind v4 compiles the
                  // translate utilities to the standalone property.
                  "duration-normal transition-[background-color,box-shadow,translate] ease-out",
                  "will-change-[translate]",
                  "hover:-translate-y-0.5 hover:bg-neutral-800",
                  "hover:shadow-[0_16px_32px_-14px_rgb(17_19_35/0.55)]",
                  "active:translate-y-0",
                )}
              >
                {hero.actions.primary.label}
              </Link>

              {/* Secondary action — an underlined text link, as in the
                  design, not a second button competing with the primary. */}
              <Link
                href={hero.actions.secondary.href}
                className={cn(
                  "group inline-flex flex-col items-start",
                  "text-[0.9375rem] font-semibold text-neutral-900",
                )}
              >
                {hero.actions.secondary.label}
                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-1 block h-px w-full origin-left bg-neutral-900",
                    "duration-normal transition-transform ease-out",
                    "group-hover:scale-x-0",
                  )}
                />
              </Link>
            </motion.div>

            <motion.p
              {...rise(0.32)}
              className="mt-10 text-[0.9375rem] text-pretty text-neutral-500"
            >
              {hero.footnote}
            </motion.p>
          </div>

          {/* ========================= Product shot ==================== */}
          {/*
            The negative right margin lets the laptop run past the container
            and off the viewport edge on lg+, matching the design. Below lg it
            is reset to 0 so the shot sits fully inside the gutter.
          */}
          <motion.div
            initial={reduce ? "shown" : "hidden"}
            whileInView="shown"
            viewport={{ once: true, amount: "some" }}
            variants={{
              hidden: { opacity: 0, y: 24 },
              shown: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, delay: 0.2, ease: easeOut },
              },
            }}
            className="lg:-mr-[max(4rem,calc((100vw-var(--width-hero))/2+4rem))]"
          >
            <Image
              src={hero.image.src}
              alt={hero.image.alt}
              width={hero.image.width}
              height={hero.image.height}
              // Above the fold on this page, so it must not lazy-load —
              // this is the LCP candidate.
              priority
              sizes="(min-width: 1024px) 62vw, 100vw"
              className="h-auto w-full"
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
