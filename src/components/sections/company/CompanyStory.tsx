"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { company } from "@/content/company";
import { cn } from "@/lib/utils";

/**
 * COMPANY STORY
 * ---------------------------------------------------------------------------
 * Section 2 of /company: the 3D still life on the left, the copy on the right,
 * over one full-bleed render.
 *
 * THE RENDER SHIPS WHOLE, which is the opposite of what the hero needed. There
 * the overlay baked UI text into the picture, so the cards were rebuilt; here
 * the words in the image — the notebook's mind map, the three blocks' Ask /
 * Practise / Apply, the script footnote — are labels on photographed objects
 * rather than interface. Nothing in it has to be selectable, and the render
 * already leaves its right half empty for the copy.
 *
 * THE GROUND BEHIND IT is the render's own deep violet, set as a flat colour
 * so the section never shows white where the image has not loaded or where it
 * stops short of a very wide viewport. It is sampled from the render's right
 * edge (#30325166 area), so the seam is invisible.
 *
 * BELOW LG the scene drops out. The still life is the left two-thirds of a
 * 3:2 frame, so at phone width a crop shows either the objects or nothing
 * useful, and the copy is what the section is for. The ground and a soft
 * violet wash carry it instead.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { story } = company;

export function CompanyStory() {
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
      // The hero's "Discover our story" link points here.
      id="story"
      className="relative scroll-mt-24 overflow-hidden bg-[#2e3050]"
    >
      {/* ----------------------------- Scene ---------------------------- */}
      <div aria-hidden="true" className="absolute inset-0 hidden lg:block">
        <Image
          src={story.scene.src}
          alt={story.scene.alt}
          fill
          sizes="100vw"
          className="object-cover object-left"
        />
        {/* A scrim from the right so the copy holds its contrast wherever
            the render crops — the image's own right side is already dark,
            so this only deepens it rather than tinting it. */}
        <div className="absolute inset-0 bg-gradient-to-l from-[#2e3050] via-[#2e3050]/85 to-transparent" />
      </div>

      {/* The phone/tablet ground: the render's violet, with a soft wash
          where its lit corner would be. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(120%_90%_at_0%_0%,#4a4570_0%,#2e3050_55%)] lg:hidden"
      />

      <Container width="hero" className="relative">
        <div
          className={cn(
            "grid",
            "py-20 sm:py-24 lg:py-28 xl:py-32",
            // The copy takes the right column on lg+, where the render
            // leaves its half of the frame empty for it.
            "lg:grid-cols-2 lg:gap-8",
          )}
        >
          <div className="lg:col-start-2">
            <motion.p
              {...rise(0)}
              className={cn(
                "text-[0.6875rem] font-semibold tracking-[0.2em] uppercase",
                "text-[#bfa8eb] sm:text-xs",
              )}
            >
              {story.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.08)}
              className={cn(
                "mt-6 font-display font-bold tracking-[-0.03em]",
                "leading-[1.08] text-white",
                // Measured from the design at ~56px on a 1440 frame.
                "text-[1.875rem] sm:text-[2.25rem] xl:text-[3rem]",
              )}
            >
              {story.headline.map((line) => (
                <span key={line} className="inline lg:block">
                  {line}{" "}
                </span>
              ))}
            </motion.h2>

            <div className="mt-8 flex flex-col gap-5">
              {story.body.map((paragraph, index) => (
                <motion.p
                  key={paragraph}
                  {...rise(0.16 + index * 0.06)}
                  className={cn(
                    "max-w-[36rem] leading-relaxed text-pretty",
                    "text-[0.9375rem] text-white/80 sm:text-base",
                  )}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* The conclusion, in bold white — its weight is the point. */}
            <motion.p
              {...rise(0.36)}
              className={cn(
                "mt-8 max-w-[32rem] font-semibold text-pretty text-white",
                "text-[1.0625rem] leading-snug sm:text-[1.1875rem]",
              )}
            >
              {story.close}
            </motion.p>
          </div>
        </div>
      </Container>
    </section>
  );
}
