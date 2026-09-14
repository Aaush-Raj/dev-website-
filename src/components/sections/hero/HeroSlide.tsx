"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { ArrowRightIcon } from "@/components/sections/hero/DashboardIcons";
import { DashboardMockup } from "@/components/sections/hero/DashboardMockup";
import { HeroEngines } from "@/components/sections/hero/HeroEngines";
import { HeroMoments } from "@/components/sections/hero/HeroMoments";
import { Container } from "@/components/ui/Container";
import type { HeroSlide as HeroSlideContent } from "@/content/hero";
import { cn } from "@/lib/utils";

/**
 * HERO SLIDE
 * ---------------------------------------------------------------------------
 * One slide of the hero carousel: copy on the left, a composition on the right.
 *
 * Every slide shares this layout and this entrance — eyebrow, heading lines,
 * body, then buttons, each offset slightly, with the heading underline drawing
 * afterwards. Only the RIGHT-HAND COMPOSITION differs, and `visual` names which
 * one to render: the two are genuinely different scenes rather than variations
 * on a theme, so each is its own component.
 *
 * All slides are mounted at once so the carousel's container holds the tallest
 * (see Hero). `active` says whether this one is showing: its entrance animates
 * only then, keyed on that flag so it REPLAYS on every activation, which is
 * what makes the rotation feel authored rather than a crossfade of stills. An
 * off-screen slide simply rests in its final state.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

export function HeroSlide({
  slide,
  active = true,
}: {
  slide: HeroSlideContent;
  /** Whether this slide is the one showing. Off-screen slides do not animate. */
  active?: boolean;
}) {
  const reduce = useReducedMotion();

  const still = reduce || !active;

  /** Staggered rise used by every text element in the left column. */
  const rise = (delay: number) => ({
    initial: { opacity: still ? 1 : 0, y: still ? 0 : 20 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: still ? 0 : 0.7,
      delay: still ? 0 : delay,
      ease: easeOut,
    },
  });

  return (
    <Container key={active ? "on" : "off"} width="hero" className="lg:pr-0">
      <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.05fr)] lg:gap-8">
        {/* ============================= Copy ========================= */}
        <div className="max-w-xl min-w-0 lg:max-w-none lg:pr-6">
          <motion.p
            {...rise(0.05)}
            className={cn(
              "font-mono text-[0.6875rem] font-medium text-brand-600 uppercase",
              "tracking-[0.14em] break-words sm:text-xs sm:tracking-[0.16em]",
            )}
          >
            {slide.eyebrow}
          </motion.p>

          {/* Headline — each line animates in turn. */}
          <h1
            className={cn(
              "mt-6 font-display text-hero leading-hero font-extrabold tracking-[-0.035em]",
              "text-neutral-900",
            )}
          >
            {slide.headline.map((line, index) => (
              <motion.span
                key={line}
                {...rise(0.15 + index * 0.09)}
                className="block"
              >
                {index === slide.underlinedLineIndex ? (
                  <span className="relative inline-block">
                    {/* The amber rule sits behind the text baseline, so
                        descenders cross it exactly as in the design. */}
                    <motion.span
                      aria-hidden="true"
                      className={cn(
                        "absolute bottom-[0.02em] left-0 -z-10 h-[0.21em] w-full",
                        "origin-left rounded-[1px] bg-accent-400",
                      )}
                      initial={{ scaleX: still ? 1 : 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{
                        duration: still ? 0 : 0.85,
                        // Tracks the last headline line, so the rule still
                        // lands after the words on a slide of any length.
                        delay: still ? 0 : 0.35 + slide.headline.length * 0.09,
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

          <motion.p
            {...rise(0.45)}
            className="mt-7 max-w-[30rem] text-base leading-relaxed text-pretty text-neutral-600 sm:text-[1.0625rem]"
          >
            {slide.description}
          </motion.p>

          {/* ---------------------------- Actions ------------------- */}
          <motion.div
            {...rise(0.56)}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
          >
            <Link
              href={slide.actions.primary.href}
              className={cn(
                "group inline-flex h-12 items-center justify-center gap-2.5 rounded-lg px-7",
                "bg-brand-600 text-[0.9375rem] font-semibold text-white",
                "duration-normal transition-[background-color,box-shadow,transform] ease-out",
                "hover:bg-brand-700 hover:shadow-brand active:translate-y-px",
              )}
            >
              {slide.actions.primary.label}
              <ArrowRightIcon
                className={cn(
                  "duration-normal size-4 transition-transform ease-out",
                  "group-hover:translate-x-1",
                )}
              />
            </Link>

            <Link
              href={slide.actions.secondary.href}
              className={cn(
                "inline-flex h-12 items-center justify-center rounded-lg px-7",
                "border border-brand-600/45 text-[0.9375rem] font-semibold text-brand-600",
                "duration-normal transition-[background-color,border-color,transform] ease-out",
                "hover:border-brand-600 hover:bg-brand-50 active:translate-y-px",
              )}
            >
              {slide.actions.secondary.label}
            </Link>
          </motion.div>

          {/* The line under the actions, where a slide supplies one. */}
          {slide.footnote && (
            <motion.p
              {...rise(0.66)}
              className="mt-7 text-[0.875rem] text-neutral-500"
            >
              {slide.footnote}
            </motion.p>
          )}
        </div>

        {/* =========================== Visual ========================= */}
        {slide.visual === "dashboard" ? (
          /* A modest negative right margin lets the app window run past the
             container edge, as it does in the design, while the floating cards
             stay inside the viewport. */
          <div className="relative min-w-0 pr-4 sm:pr-10 lg:-mr-[4%] lg:pr-20 xl:-mr-[6%]">
            {/* Below lg the mockup is rendered at a fixed width and scaled to
                fit, so the whole dashboard stays visible and in proportion
                instead of cropping to an unreadable sliver on a phone. */}
            <div className="[margin-bottom:-60%] w-[900px] origin-top-left scale-[0.40] sm:[margin-bottom:-42%] sm:scale-[0.58] md:[margin-bottom:-26%] md:scale-[0.74] lg:[margin-bottom:-30%] lg:scale-[0.70] xl:[margin-bottom:-20%] xl:scale-[0.80]">
              <DashboardMockup />
            </div>
          </div>
        ) : (
          <div className="relative min-w-0 lg:-mr-[4%] xl:-mr-[6%]">
            {slide.visual === "moments" ? (
              <HeroMoments active={active} />
            ) : (
              <HeroEngines active={active} />
            )}
          </div>
        )}
      </div>
    </Container>
  );
}
