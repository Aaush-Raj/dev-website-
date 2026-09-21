"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { sop } from "@/content/sop";
import { cn } from "@/lib/utils";

import { ArrowRightIcon } from "./SopIcons";
import { SopReadinessPanel } from "./SopReadinessPanel";

/**
 * SOP HERO
 * ---------------------------------------------------------------------------
 * Section 1 of the LurnySOP page: the statement on the left, the framework
 * readiness panel on the right, over the pack's gradient backdrop.
 *
 * THE BACKDROP IS AN IMAGE, NOT A CSS GRADIENT. It is a painted piece with
 * several overlapping colour fields, not something a linear-gradient
 * approximates. It is `fill` + `object-cover` so it always covers the section
 * whatever the copy's height, and `-z-10` so nothing in the section has to
 * manage stacking against it.
 *
 * It uses `preload`, not `priority`: this is the page's LCP element, and
 * `priority` is deprecated as of Next.js 16 in favour of `preload`
 * (node_modules/next/dist/docs/01-app/03-api-reference/02-components/image.md).
 *
 * `bg-[#17224f]` under it is the backdrop's own darkest navy, sampled from the
 * file. It is what the white copy sits on for the moment before the image
 * paints, so the text is never white-on-white.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { hero } = sop;

export function SopHero() {
  const reduce = useReducedMotion();

  /*
   * Each element gets its own beat rather than the column sharing one, so the
   * eyebrow, headline, copy, buttons and strip arrive in reading order instead
   * of appearing together.
   */
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
        "relative isolate overflow-hidden bg-[#17224f] text-white",
        // Extra top padding: this is the first section under the floating nav
        // pill, so it needs clearance the mid-page sections do not.
        "pt-28 pb-20 sm:pt-32 lg:pt-36 lg:pb-28",
      )}
    >
      <Image
        src="/assets/images/sop/hero-backdrop.webp"
        alt=""
        aria-hidden="true"
        fill
        preload
        sizes="100vw"
        className="-z-10 object-cover"
      />

      <Container width="hero" className="relative">
        <div
          className={cn(
            "grid grid-cols-1 items-center gap-14",
            // Measured from the comp: the statement runs to roughly 44% of the
            // frame, the panel takes the rest.
            "lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1fr)] lg:gap-10",
            "xl:gap-16",
          )}
        >
          {/* =========================== Statement ===================== */}
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "text-[0.75rem] font-semibold tracking-[0.22em] uppercase",
                "text-[#c3b6ff] sm:text-[0.8125rem]",
              )}
            >
              {hero.eyebrow}
            </motion.p>

            <motion.h1
              {...rise(0.09)}
              className={cn(
                "mt-6 font-display font-bold tracking-[-0.035em]",
                "leading-[1.05] text-white text-balance",
                // Measured from the comp at ~58px on a 1193 frame.
                "text-[2.25rem] sm:text-[3rem] xl:text-[3.5rem]",
              )}
            >
              {hero.headline.map((line, index) => (
                <span key={line} className="block">
                  {line}
                  {/*
                    The lines are `block`, so this space is invisible — but
                    without it the accessible name and any copied text read
                    "ISO,GDPR and more—from day one." with the words run
                    together. The design's line break is a break, not a join.
                  */}
                  {index < hero.headline.length - 1 && " "}
                </span>
              ))}
            </motion.h1>

            <motion.p
              {...rise(0.18)}
              className={cn(
                "mt-6 max-w-[30rem] leading-relaxed text-pretty",
                "text-[1rem] text-[#cfd4ee] sm:text-[1.0625rem]",
              )}
            >
              {hero.description}
            </motion.p>

            {/* --------------------------- Actions -------------------- */}
            <motion.div
              {...rise(0.27)}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <Link
                href={hero.actions.primary.href}
                className={cn(
                  "inline-flex h-14 items-center justify-center rounded-full px-8",
                  "bg-[#7c15f5] text-[1rem] font-semibold text-white",
                  // `translate`, not `transform`: Tailwind v4 compiles the
                  // translate utilities to the standalone property.
                  "duration-normal transition-[background-color,box-shadow,translate] ease-out",
                  "will-change-[translate] hover:-translate-y-0.5 hover:bg-[#8c2ffb]",
                  "hover:shadow-[0_18px_38px_-14px_rgb(124_21_245/0.75)]",
                  "active:translate-y-0",
                  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white",
                  "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
                )}
              >
                {hero.actions.primary.label}
              </Link>

              <Link
                href={hero.actions.secondary.href}
                className={cn(
                  "group/cta inline-flex h-14 items-center justify-center gap-3 rounded-full px-8",
                  "border border-white/45 text-[1rem] font-semibold text-white",
                  "duration-normal transition-[background-color,border-color,translate] ease-out",
                  "will-change-[translate] hover:-translate-y-0.5",
                  "hover:border-white/80 hover:bg-white/10",
                  "active:translate-y-0",
                  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white",
                  "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
                )}
              >
                {hero.actions.secondary.label}
                <ArrowRightIcon
                  className={cn(
                    "size-4.5",
                    "duration-normal transition-[translate] ease-out",
                    "group-hover/cta:translate-x-1",
                    "motion-reduce:transition-none motion-reduce:group-hover/cta:translate-x-0",
                  )}
                />
              </Link>
            </motion.div>

            {/* The frameworks strip, divided by middots. */}
            <motion.ul
              {...rise(0.36)}
              className="mt-9 flex flex-wrap items-center gap-x-2.5 gap-y-2"
            >
              {hero.frameworks.map((name, index) => (
                <li
                  key={name}
                  className="flex items-center gap-2.5 text-[0.875rem] font-medium text-[#b6bee6] sm:text-[0.9375rem]"
                >
                  {name}
                  {index < hero.frameworks.length - 1 && (
                    <span aria-hidden="true" className="text-[#6e79ab]">
                      ·
                    </span>
                  )}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* ======================= The product ======================= */}
          {/*
            A wrapper beat of its own, so the panel arrives as one object and
            its tiles then stagger inside it — rather than the panel's own
            entrance racing the column's.
          */}
          <motion.div {...rise(0.22)} className="relative lg:pb-6">
            <SopReadinessPanel />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
