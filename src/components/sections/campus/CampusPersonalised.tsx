"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { campus } from "@/content/campus";
import { cn } from "@/lib/utils";

import { CampusHome } from "./CampusHome";
import { pointIcons } from "./CampusIcons";

/**
 * CAMPUS — THE PERSONALISED JOURNEY
 * ---------------------------------------------------------------------------
 * Section 3: the claim on the left, the student's own Campus home on the right.
 *
 * The dark teal ground is the section's own, not the page's — it sits between
 * two cream sections, so it needs to carry its own contour texture and its own
 * light-on-dark type scale.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { journey } = campus;

export function CampusPersonalised() {
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
        // The deep teal ground, sampled from the design.
        "bg-[#013335]",
        "py-20 lg:py-28",
      )}
    >
      {/* ===================== The contour texture ==================== */}
      {/*
        Shipped as an image rather than drawn: it is a photographic topographic
        wash with no type in it, and it compresses to 7KB. Decorative, so it is
        hidden from assistive tech.
      */}
      <Image
        src={journey.backdrop.src}
        alt={journey.backdrop.alt}
        width={journey.backdrop.width}
        height={journey.backdrop.height}
        aria-hidden="true"
        sizes="100vw"
        className="pointer-events-none absolute inset-0 -z-10 size-full object-cover opacity-90"
      />

      <Container width="wide" className="relative">
        <div
          className={cn(
            "grid grid-cols-1 items-center gap-14",
            // Measured from the design: the copy runs to roughly 36% of the
            // frame, the mockup takes the rest.
            "lg:grid-cols-[minmax(0,0.62fr)_minmax(0,1fr)] lg:gap-12",
            "xl:gap-16",
          )}
        >
          {/* ========================== The claim ====================== */}
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "text-[0.75rem] font-bold tracking-[0.16em] uppercase",
                "text-[#fa643f] sm:text-[0.8125rem]",
              )}
            >
              {journey.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.08)}
              className={cn(
                "mt-6 font-display font-bold tracking-[-0.03em]",
                "leading-[1.1] text-white",
                // Measured from the design at ~46px on a 1440 frame.
                "text-[1.875rem] sm:text-[2.25rem] xl:text-[2.875rem]",
              )}
            >
              {journey.headline.map((line, index) => (
                <span key={line} className="inline lg:block">
                  {line}
                  {/* The coral full stop closes the last line. Decorative, so
                      hidden rather than announced as a stray glyph. */}
                  {index === journey.headline.length - 1 && (
                    <span aria-hidden="true" className="text-[#fa643f]">
                      .
                    </span>
                  )}{" "}
                </span>
              ))}
            </motion.h2>

            <motion.p
              {...rise(0.16)}
              className={cn(
                "mt-6 max-w-[34rem] leading-relaxed text-pretty",
                "text-[1rem] text-[#bed2d2] sm:text-[1.0625rem]",
              )}
            >
              {journey.description}
            </motion.p>

            {/* ------------------------ The points -------------------- */}
            <ul className="mt-10 space-y-7 lg:mt-12">
              {journey.points.map((point, index) => {
                const Icon = pointIcons[point.icon];

                return (
                  <motion.li
                    key={point.title}
                    {...rise(0.24 + index * 0.1)}
                    className="group/pt flex items-start gap-5"
                  >
                    <span
                      className={cn(
                        "shrink-0 text-[#f4603c]",
                        "duration-normal transition-[scale] ease-out",
                        "will-change-[scale] group-hover/pt:scale-108",
                      )}
                    >
                      <Icon className="size-13" />
                    </span>

                    <span className="min-w-0 pt-1">
                      <span className="block text-[1.0625rem] font-bold text-pretty text-white">
                        {point.title}
                      </span>
                      <span className="mt-1 block text-[0.9375rem] leading-relaxed text-pretty text-[#a8bfc0]">
                        {point.description}
                      </span>
                    </span>
                  </motion.li>
                );
              })}
            </ul>
          </div>

          {/* ========================= The mockup ====================== */}
          <CampusHome />
        </div>
      </Container>
    </section>
  );
}
