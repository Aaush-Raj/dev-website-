"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { platform } from "@/content/platform";
import { cn } from "@/lib/utils";

import { PlatformCluster } from "./PlatformCluster";
import { ArrowRightIcon, metaIcons } from "./PlatformIcons";

/**
 * PLATFORM HERO
 * ---------------------------------------------------------------------------
 * Section 1 of /platform: the statement on the left, the product cluster on
 * the right, over a lavender wash.
 *
 * THE BACKDROP SHIPS AS THE SUPPLIED RENDER. It is a textless gradient with a
 * soft ring — exactly what a background raster should be — so unlike the five
 * card PNGs beside it there is nothing in it to rebuild. Anchored right, where
 * its ring sits behind the cluster as the design intends.
 *
 * THE CLUSTER IS REBUILT IN MARKUP; see PlatformCluster for why, and for the
 * decorative treatment that follows from it.
 *
 * THE COPY ANIMATES ON MOUNT rather than in view: it is above the fold, so a
 * scroll trigger would either fire instantly or never. Its lines stagger so
 * the eye is led down to the actions rather than everything landing flat, and
 * the cluster's own beats pick up where the copy's leave off.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { hero } = platform;

export function PlatformHero() {
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduce ? "shown" : "hidden",
    animate: "shown",
    variants: {
      hidden: { opacity: 0, y: 18 },
      shown: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.7,
          delay: reduce ? 0 : delay,
          ease: easeOut,
        },
      },
    },
  });

  return (
    <section className="relative overflow-hidden bg-[#fbf8fe]">
      {/* ---------------------------- Backdrop --------------------------- */}
      <div aria-hidden="true" className="absolute inset-0">
        <Image
          src={hero.backdrop.src}
          alt={hero.backdrop.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-right"
        />
        {/* A scrim over the left so the headline holds its contrast wherever
            the wash crops. */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#fbf8fe] via-[#fbf8fe]/80 to-transparent" />
      </div>

      <Container width="hero" className="relative">
        <div
          className={cn(
            "grid items-center gap-14",
            "py-20 sm:py-24 lg:py-24 xl:py-28",
            "lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-10",
            "xl:gap-14",
          )}
        >
          {/* =========================== Statement ===================== */}
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "text-[0.6875rem] font-semibold tracking-[0.18em] uppercase",
                "text-brand-600 sm:text-xs",
              )}
            >
              {hero.eyebrow}
            </motion.p>

            <h1
              className={cn(
                "mt-6 font-display font-bold tracking-[-0.03em]",
                "leading-[1.05] text-neutral-900",
                // Measured from the design at ~54px on a 1440 frame.
                "text-[2rem] sm:text-[2.5rem] xl:text-[3.375rem]",
              )}
            >
              {hero.headline.map((line, index) => (
                <motion.span
                  key={line.text}
                  {...rise(0.08 + index * 0.08)}
                  className={cn(
                    "block",
                    // The design sets the closing line in violet.
                    "accent" in line && line.accent && "text-brand-600",
                  )}
                >
                  {line.text}
                </motion.span>
              ))}
            </h1>

            <motion.p
              {...rise(0.34)}
              className={cn(
                "mt-7 max-w-[34rem] leading-relaxed text-pretty",
                "text-[1rem] text-neutral-600 sm:text-[1.0625rem]",
              )}
            >
              {hero.description.before}
              <strong className="font-semibold text-neutral-900">
                {hero.description.strong}
              </strong>
              {hero.description.after}
            </motion.p>

            <motion.div
              {...rise(0.42)}
              className="mt-9 flex flex-wrap items-center gap-3.5"
            >
              <Button href={hero.actions.primary.href} size="lg">
                {hero.actions.primary.label}
              </Button>

              <Button
                href={hero.actions.secondary.href}
                variant="outline"
                size="lg"
                className="group/cta bg-white"
              >
                {hero.actions.secondary.label}
                <ArrowRightIcon
                  className={cn(
                    "ml-2 size-4 transition-transform duration-300",
                    "ease-[cubic-bezier(0.16,1,0.3,1)]",
                    "group-hover/cta:translate-x-1",
                    "motion-reduce:transition-none",
                    "motion-reduce:group-hover/cta:translate-x-0",
                  )}
                />
              </Button>
            </motion.div>

            {/* The three capabilities, separated by hairlines as the design
                sets them. */}
            <motion.ul
              {...rise(0.5)}
              className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3"
            >
              {hero.meta.map((item, index) => {
                const Icon = metaIcons[item.icon];

                return (
                  <li
                    key={item.label}
                    className={cn(
                      "flex items-center gap-x-5",
                      index > 0 &&
                        "before:h-5 before:w-px before:bg-neutral-300",
                    )}
                  >
                    <span className="flex items-center gap-2.5">
                      <Icon className="size-5 text-brand-600" />
                      <span className="text-[0.9375rem] font-medium text-neutral-800">
                        {item.label}
                      </span>
                    </span>
                  </li>
                );
              })}
            </motion.ul>
          </div>

          {/* ============================ Cluster ====================== */}
          <PlatformCluster />
        </div>
      </Container>
    </section>
  );
}
