"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { DashboardMockup } from "@/components/sections/hero/DashboardMockup";
import { ArrowRightIcon } from "@/components/sections/hero/DashboardIcons";
import { Container } from "@/components/ui/Container";
import { hero } from "@/content/hero";
import { cn } from "@/lib/utils";

/**
 * HERO
 * ---------------------------------------------------------------------------
 * The homepage's opening section.
 *
 * Layout is a two-column grid on lg+: copy on the left, product mockup on the
 * right bleeding past the container edge (the design lets the app window run
 * off the right of the page). Below lg it stacks, and the mockup is scaled
 * down rather than hidden — it is the clearest signal of what the product is.
 *
 * Animation is a single orchestrated entrance: eyebrow, heading lines, body,
 * then buttons, each offset slightly. The heading underline draws afterwards,
 * left to right, which is the moment the composition resolves.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();

  /** Staggered rise used by every text element in the left column. */
  const rise = (delay: number) => ({
    initial: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 20 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reduce ? 0 : 0.7,
      delay: reduce ? 0 : delay,
      ease: easeOut,
    },
  });

  return (
    <section
      className={cn(
        "relative overflow-hidden",
        /*
          Padding clear of the floating nav pill, which overlays the page
          rather than sitting above it — the header cancels its own flow space
          (see Header.tsx), so this section starts at y=0 and this padding is
          the only thing keeping content out from under the pill.

          The pill ends at 88px (top-5 inset + its h-[4.25rem]), so anything
          below ~5.5rem clears it. These values keep the spacing the page had
          before the header stopped reserving flow: the old rule paired a
          -5.5rem margin with 8.5rem padding, which rendered as 8.5rem from the
          top of the viewport once the header's own 68px was counted.
        */
        "pt-[8.5rem] lg:pt-[10rem]",
        "pb-section",
      )}
    >
      {/* ----------------------------------------------------------------
          Warm amber glow, bottom-left. Sampled from the design, where the
          page background lifts to a soft peach in that corner.
          ---------------------------------------------------------------- */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -bottom-1/4 -left-[15%] -z-10",
          "size-[52rem] rounded-full opacity-90 blur-[100px]",
          "bg-[radial-gradient(circle,var(--accent-200)_0%,var(--accent-100)_38%,transparent_72%)]",
        )}
      />

      {/* Faint violet wash on the right, behind the mockup. */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute top-0 -right-[10%] -z-10",
          "size-[40rem] rounded-full opacity-45 blur-[120px]",
          "bg-[radial-gradient(circle,var(--brand-200)_0%,transparent_70%)]",
        )}
      />

      <Container width="hero" className="lg:pr-0">
        <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.05fr)] lg:gap-8">
          {/* ============================ Copy ======================== */}
          <div className="max-w-xl min-w-0 lg:max-w-none lg:pr-6">
            {/* Eyebrow */}
            <motion.p
              {...rise(0.05)}
              className={cn(
                "font-mono text-[0.6875rem] font-medium text-brand-600 uppercase",
                "tracking-[0.14em] break-words sm:text-xs sm:tracking-[0.16em]",
              )}
            >
              {hero.eyebrow}
            </motion.p>

            {/* Headline — each line animates in turn. */}
            <h1
              className={cn(
                "mt-6 font-display text-hero leading-hero font-extrabold tracking-[-0.035em]",
                "text-neutral-900",
              )}
            >
              {hero.headline.map((line, index) => (
                <motion.span
                  key={line}
                  {...rise(0.15 + index * 0.09)}
                  className="block"
                >
                  {index === hero.underlinedLineIndex ? (
                    <span className="relative inline-block">
                      {/* The amber rule sits behind the text baseline, so
                          descenders in "performance." overlap it exactly as
                          they do in the design. */}
                      <motion.span
                        aria-hidden="true"
                        className={cn(
                          // Measured from the design: the rule is 0.21em tall
                          // and sits just above the line-box floor, so glyph
                          // descenders in "performance." cross it.
                          "absolute bottom-[0.02em] left-0 -z-10 h-[0.21em] w-full",
                          "origin-left rounded-[1px] bg-accent-400",
                        )}
                        initial={{ scaleX: reduce ? 1 : 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{
                          duration: reduce ? 0 : 0.85,
                          delay: reduce ? 0 : 0.75,
                          ease: easeOut,
                        }}
                      />
                      {line}
                    </span>
                  ) : (
                    line
                  )}
                </motion.span>
              ))}
            </h1>

            {/* Description */}
            <motion.p
              {...rise(0.45)}
              className="mt-7 max-w-[30rem] text-base leading-relaxed text-pretty text-neutral-600 sm:text-[1.0625rem]"
            >
              {hero.description}
            </motion.p>

            {/* Actions */}
            <motion.div
              {...rise(0.56)}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
            >
              <Link
                href={hero.actions.primary.href}
                className={cn(
                  "group inline-flex h-12 items-center justify-center gap-2.5 rounded-lg px-7",
                  "bg-brand-600 text-[0.9375rem] font-semibold text-white",
                  "duration-normal transition-[background-color,box-shadow,transform] ease-out",
                  "hover:bg-brand-700 hover:shadow-brand active:translate-y-px",
                )}
              >
                {hero.actions.primary.label}
                <ArrowRightIcon
                  className={cn(
                    "duration-normal size-4 transition-transform ease-out",
                    "group-hover:translate-x-1",
                  )}
                />
              </Link>

              <Link
                href={hero.actions.secondary.href}
                className={cn(
                  "inline-flex h-12 items-center justify-center rounded-lg px-7",
                  "border border-brand-600/45 text-[0.9375rem] font-semibold text-brand-600",
                  "duration-normal transition-[background-color,border-color,transform] ease-out",
                  "hover:border-brand-600 hover:bg-brand-50 active:translate-y-px",
                )}
              >
                {hero.actions.secondary.label}
              </Link>
            </motion.div>
          </div>

          {/* ========================== Mockup ======================== */}
          {/* A modest negative right margin lets the app window run past the
              container edge, as it does in the design, while the floating
              cards stay inside the viewport. Padding on the right reserves
              room for the cards, which are positioned relative to this box. */}
          <div className="relative min-w-0 pr-4 sm:pr-10 lg:-mr-[4%] lg:pr-20 xl:-mr-[6%]">
            {/*
              Below lg the mockup is rendered at a fixed 860px and scaled to
              fit, so the whole dashboard stays visible and in proportion
              instead of cropping to an unreadable sliver on a phone.
              origin-top-left + a negative margin-bottom reclaim the empty
              space the transform leaves behind.
            */}
            <div className="[margin-bottom:-60%] w-[900px] origin-top-left scale-[0.40] sm:[margin-bottom:-42%] sm:scale-[0.58] md:[margin-bottom:-26%] md:scale-[0.74] lg:[margin-bottom:-30%] lg:scale-[0.70] xl:[margin-bottom:-20%] xl:scale-[0.80]">
              <DashboardMockup />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
