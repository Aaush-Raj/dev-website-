"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { frontline } from "@/content/frontline";
import { cn } from "@/lib/utils";

import { proofIcons } from "./FrontlineIcons";
import { FrontlineLoop } from "./FrontlineLoop";

/**
 * FRONTLINE HERO
 * ---------------------------------------------------------------------------
 * Section 1 of /solutions/frontline: the statement on the left, the performance
 * loop diagram on the right, over a near-white wash.
 *
 * THE BACKDROP
 * Ships as the supplied render — it is a soft, textless gradient with faint
 * concentric rings and an office window at the right edge, which is exactly
 * what a background raster should be. It is anchored right, where its rings
 * sit behind the loop as the design intends.
 *
 * The violet wave in the bottom-left corner is part of that render, so the
 * script footnote is positioned over it rather than drawn separately.
 *
 * The loop itself is NOT part of that image; see FrontlineLoop for why it is
 * rebuilt in markup.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { hero } = frontline;

export function FrontlineHero() {
  const reduce = useReducedMotion();

  /**
   * The statement animates on mount rather than in view: it is above the fold,
   * so a scroll trigger would either fire instantly or, worse, not at all.
   */
  const rise = (delay: number) => ({
    initial: reduce ? "shown" : "hidden",
    animate: "shown",
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
        "relative isolate overflow-hidden bg-[#fcfcfd]",
        // Extra top padding: first section under the floating nav pill.
        "pt-28 pb-16 sm:pt-32 lg:pt-36 lg:pb-28",
      )}
    >
      {/* ========================= The backdrop ====================== */}
      <Image
        src={hero.backdrop.src}
        alt={hero.backdrop.alt}
        width={hero.backdrop.width}
        height={hero.backdrop.height}
        aria-hidden="true"
        priority
        sizes="100vw"
        className={cn(
          "pointer-events-none absolute inset-0 -z-10 size-full",
          "object-cover object-right",
        )}
      />

      <Container width="hero">
        <div
          className={cn(
            "grid items-center gap-12",
            // The statement takes the narrower share: the diagram needs a
            // near-square box to keep its ring circular.
            "lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1fr)] lg:gap-10",
            "xl:gap-14",
          )}
        >
          {/* =========================== Statement ==================== */}
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "text-[0.75rem] font-bold uppercase",
                "tracking-[0.12em] text-[#5946cb] sm:text-[0.8125rem]",
              )}
            >
              {hero.eyebrow}
            </motion.p>

            <motion.h1
              {...rise(0.08)}
              className={cn(
                "mt-5 font-display font-bold tracking-[-0.035em]",
                "leading-[1.05] text-[#0b0a14]",
                // Measured from the design at ~62px on a 1362 frame.
                "text-[2.25rem] sm:text-[3rem] xl:text-[3.75rem]",
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
                "mt-6 max-w-[34rem] leading-relaxed text-pretty",
                "text-[1.0625rem] text-[#42486a] sm:text-lg",
              )}
            >
              {hero.description}
            </motion.p>

            {/* ---------------------- Actions ---------------------- */}
            <motion.div
              {...rise(0.24)}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <Button href={hero.actions.primary.href} size="lg">
                {hero.actions.primary.label}
              </Button>
              <Button
                href={hero.actions.secondary.href}
                size="lg"
                variant="outline"
              >
                {hero.actions.secondary.label}
              </Button>
            </motion.div>

            <motion.p
              {...rise(0.3)}
              className="mt-6 text-[0.9375rem] text-[#42486a]"
            >
              {hero.poweredBy}
            </motion.p>

            {/* ----------------------- Proof ----------------------- */}
            <motion.ul
              {...rise(0.36)}
              className={cn(
                "mt-8 flex flex-wrap items-center",
                // The design separates these with hairline rules rather than
                // gaps, so the dividers are drawn per item below.
                "gap-y-4",
              )}
            >
              {hero.proof.map((item, index) => {
                const Icon = proofIcons[item.icon];

                return (
                  <li
                    key={item.label.join(" ")}
                    className={cn(
                      "flex items-center gap-3 pr-6",
                      // The rule only makes sense between items on ONE line.
                      // Stacked, it lands to the left of a row and reads as a
                      // stray mark, so it is a sm+ treatment.
                      index > 0 &&
                        "sm:border-l sm:border-neutral-300/80 sm:pl-7",
                    )}
                  >
                    <Icon className="size-7 shrink-0 text-[#1d2033]" />
                    <span className="text-[0.8125rem] leading-tight text-[#42486a]">
                      {item.label.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </span>
                  </li>
                );
              })}
            </motion.ul>
          </div>

          {/* ============================ Loop ======================== */}
          <FrontlineLoop />
        </div>
      </Container>

      {/* The script mark over the violet wave in the corner. Hidden below lg,
          where the wave in the backdrop has been cropped out of frame. */}
      <p
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute bottom-7 left-6 hidden lg:block",
          // Sits over the violet wave baked into the backdrop. Kept clear of
          // the proof row above it by the section's own bottom padding.
          "font-hand text-[1.35rem] leading-[1.2] text-[#4a3fa8]/85",
        )}
      >
        {hero.footnote.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </p>
    </section>
  );
}
