"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { platform } from "@/content/platform";
import { cn } from "@/lib/utils";

import { LinkIcon, problemIcons } from "./PlatformChallengeIcons";
import { ArrowRightIcon } from "./PlatformIcons";

/**
 * PLATFORM CHALLENGE
 * ---------------------------------------------------------------------------
 * Section 2 of /platform: the photograph on the left, the problem on the
 * right, and a band across the foot.
 *
 * THE PHOTOGRAPH BLEEDS off the section's left edge rather than sitting inside
 * the container — the design runs it to the viewport edge, which is what makes
 * the section read as one scene with copy laid into it rather than a two-up
 * of a picture and a panel. It is a square source cropped to a tall panel, so
 * `object-cover` with a left-of-centre focal point keeps both faces in frame
 * as the column narrows.
 *
 * THE BAND IS REBUILT IN MARKUP. The design ships it as a 2077x227 raster with
 * its link disc and arrow circle baked in; at a fixed aspect it cannot stretch
 * to another viewport without squashing both. Rebuilt it is a rounded
 * rectangle, a gradient disc and a ringed arrow — a few lines of CSS that hold
 * at any width, and the arrow can answer a pointer.
 *
 * THE BAND IS ALSO A REAL LINK, not a picture of one. It points at the section
 * that answers the question it asks, so it carries an accessible label of its
 * own: the arrow is decoration, and "Connect what people need to learn with
 * what they need to do" is a statement rather than a description of where the
 * link goes.
 *
 * BELOW LG the photograph moves above the copy rather than beside it, and the
 * band's two lines stack. The section keeps its dark ground throughout, since
 * the wash is flat enough to crop anywhere.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { challenge } = platform;

export function PlatformChallenge() {
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
        transition: {
          duration: 0.6,
          delay: reduce ? 0 : delay,
          ease: easeOut,
        },
      },
    },
  });

  return (
    <section className="relative overflow-hidden bg-[#261b34]">
      {/* ---------------------------- Backdrop --------------------------- */}
      <div aria-hidden="true" className="absolute inset-0">
        <Image
          src={challenge.backdrop.src}
          alt={challenge.backdrop.alt}
          fill
          sizes="100vw"
          className="object-cover object-right"
        />
      </div>

      <Container width="hero" className="relative">
        <div
          className={cn(
            "grid items-center gap-10",
            "pt-14 pb-12 sm:pt-16 lg:pt-20 lg:pb-16",
            "lg:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)] lg:gap-14",
          )}
        >
          {/* ========================= Photograph ====================== */}
          {/*
            Bled to the viewport's LEFT edge only on lg+, as the design runs
            it. The site's `.full-bleed` utility breaks out of both sides, so
            it cannot be used here — this pulls the element left by exactly
            the distance back to the window (half the slack outside the
            container, plus the container's own gutter) and grows its width
            by the same amount, leaving the right edge where the grid put it.
          */}
          <motion.div
            {...rise(0)}
            style={{
              // Named once so the margin and the width cannot drift apart.
              ["--bleed" as string]:
                "calc((100vw - min(100vw, var(--container-hero))) / 2 + var(--gutter))",
            }}
            className={cn(
              "relative overflow-hidden rounded-3xl",
              "aspect-[4/3] lg:aspect-[7/8]",
              "lg:-ml-(--bleed) lg:w-[calc(100%+var(--bleed))]",
              "lg:rounded-l-none",
            )}
          >
            <Image
              src={challenge.people.src}
              alt={challenge.people.alt}
              fill
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="object-cover object-[38%_center]"
            />
          </motion.div>

          {/* =========================== Problem ======================= */}
          <div>
            <motion.p
              {...rise(0.06)}
              className={cn(
                "text-[0.6875rem] font-semibold tracking-[0.18em] uppercase",
                "text-[#c181f4] sm:text-xs",
              )}
            >
              {challenge.eyebrow}
            </motion.p>

            <h2
              className={cn(
                "mt-5 font-display font-bold tracking-[-0.03em]",
                "leading-[1.04] text-white",
                // Measured from the design at ~62px on a 1440 frame.
                "text-[2rem] sm:text-[2.5rem] xl:text-[3.5rem]",
              )}
            >
              {challenge.headline.map((line, index) => (
                <motion.span
                  key={line.text}
                  {...rise(0.12 + index * 0.07)}
                  className={cn(
                    "block",
                    "accent" in line && line.accent && "text-[#c778fd]",
                  )}
                >
                  {line.text}
                </motion.span>
              ))}
            </h2>

            <motion.p
              {...rise(0.34)}
              className={cn(
                "mt-6 max-w-[38rem] leading-relaxed text-pretty",
                "text-[1rem] text-[#cdc3f4] sm:text-[1.0625rem]",
              )}
            >
              {challenge.description}
            </motion.p>

            {/* The three problems, hairline-separated as the design sets
                them. */}
            <ul className="mt-8">
              {challenge.problems.map((problem, index) => {
                const Icon = problemIcons[problem.icon];

                return (
                  <motion.li
                    key={problem.title}
                    {...rise(0.42 + index * 0.08)}
                    className={cn(
                      "group/row flex items-center gap-5 py-5",
                      index > 0 && "border-t border-white/12",
                    )}
                  >
                    <Icon
                      className={cn(
                        "size-14 shrink-0",
                        // The mark lifts slightly with its row.
                        "transition-transform duration-300",
                        "ease-[cubic-bezier(0.16,1,0.3,1)]",
                        "group-hover/row:scale-105",
                        "motion-reduce:transition-none",
                        "motion-reduce:group-hover/row:scale-100",
                      )}
                    />
                    <div className="min-w-0">
                      <p className="font-display text-[1.0625rem] font-bold text-white sm:text-[1.125rem]">
                        {problem.title}
                      </p>
                      <p className="mt-1 text-[0.9375rem] leading-relaxed text-pretty text-[#d6d3e9]">
                        {problem.description}
                      </p>
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* ============================= Band ========================== */}
        <motion.div {...rise(0.2)} className="pb-14 lg:pb-20">
          <Link
            href={challenge.band.href}
            aria-label={challenge.band.label}
            className={cn(
              "group/band flex items-center gap-5 sm:gap-8",
              "rounded-[1.75rem] px-6 py-6 sm:px-9 sm:py-7",
              "bg-[linear-gradient(100deg,#3b2a55_0%,#443a67_45%,#3c3762_100%)]",
              "ring-1 ring-white/14",
              "transition-[box-shadow,transform] duration-300",
              "ease-[cubic-bezier(0.16,1,0.3,1)]",
              "hover:-translate-y-0.5",
              "hover:shadow-[0_24px_60px_-30px_rgb(10_0_30/0.9)]",
              "focus-visible:outline-2 focus-visible:outline-offset-4",
              "focus-visible:outline-[#c181f4]",
              "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                "grid size-14 shrink-0 place-items-center rounded-full sm:size-16",
                "bg-[linear-gradient(150deg,#4b1ba0_0%,#2e057f_100%)]",
                "text-white shadow-[0_10px_26px_-12px_rgb(46_5_127/0.9)]",
                "transition-transform duration-300",
                "ease-[cubic-bezier(0.16,1,0.3,1)]",
                "group-hover/band:scale-105",
                "motion-reduce:transition-none",
                "motion-reduce:group-hover/band:scale-100",
              )}
            >
              <LinkIcon className="size-6 sm:size-7" />
            </span>

            <p
              className={cn(
                "min-w-0 flex-auto font-display font-bold text-white",
                "text-[1.125rem] leading-snug sm:text-[1.5rem]",
              )}
            >
              {challenge.band.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>

            <span
              aria-hidden="true"
              className={cn(
                "grid size-12 shrink-0 place-items-center rounded-full sm:size-14",
                "border border-[#a06bef] text-[#d9c2fb]",
                "transition-[background-color,color,transform] duration-300",
                "ease-[cubic-bezier(0.16,1,0.3,1)]",
                "group-hover/band:bg-[#a06bef] group-hover/band:text-white",
                "motion-reduce:transition-none",
              )}
            >
              <ArrowRightIcon
                className={cn(
                  "size-5 transition-transform duration-300",
                  "ease-[cubic-bezier(0.16,1,0.3,1)]",
                  "group-hover/band:translate-x-0.5",
                  "motion-reduce:transition-none",
                  "motion-reduce:group-hover/band:translate-x-0",
                )}
              />
            </span>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
