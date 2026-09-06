"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { frontline } from "@/content/frontline";
import { cn } from "@/lib/utils";

/**
 * FRONTLINE — FROM READINESS TO RESULTS
 * ---------------------------------------------------------------------------
 * Section 3: a centred header over the four-stage connected path.
 *
 * WHY THE PATH SHIPS AS ONE RASTER
 * Unlike the hero and the problem scene — where the supplied composite was
 * split, because the cards there are UI carrying readable text — this one is
 * shipped whole, as supplied. The stages are joined by a hand-drawn connector
 * that threads BETWEEN and BEHIND the cards, and each card is annotated with a
 * handwritten note trailing off it. Rebuilding that in markup would mean
 * redrawing the connector and the annotations for a section whose four stages
 * are already named in the alt text and in the rail beneath it.
 *
 * So only the header is markup. That is also the part that has to be
 * selectable, translatable and responsive — the raster is a diagram.
 *
 * BECAUSE IT IS A RASTER, IT CARRIES A REAL ALT
 * The other images on this page are decorative and take `alt=""`, since the
 * copy beside them already makes their point. This one does not: its four
 * stages appear nowhere else in the section, so the whole argument would be
 * lost to a screen reader. The description lives in content/frontline.ts.
 *
 * THE COMPOSITE'S OWN GROUND
 * The export is opaque RGB on the same warm off-white as the section, so it
 * sits on the ground seamlessly with no cut-out or blend needed. The section
 * ground is sampled from the design to match it.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { path } = frontline;

export function FrontlinePath() {
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
      id="performance-loop"
      // The warm off-white, sampled from the design — the same ground the
      // composite is exported on, so the two meet without a seam.
      className="relative isolate overflow-hidden bg-[#fcfcf8] py-section-lg"
    >
      <Container width="hero">
        {/* ============================ Header ====================== */}
        <div className="mx-auto max-w-[64rem] text-center">
          <motion.p
            {...rise(0)}
            className={cn(
              "font-mono text-[0.6875rem] font-medium uppercase",
              "tracking-[0.2em] text-[#5703b5] sm:text-xs",
            )}
          >
            {path.eyebrow}
          </motion.p>

          <motion.h2
            {...rise(0.08)}
            className={cn(
              // Serif, as the design sets it — this section's header is the
              // page's editorial pause between the product sections.
              "mt-5 font-serif font-bold tracking-[-0.01em]",
              "leading-[1.16] text-balance text-[#08080a]",
              "text-[1.875rem] sm:text-[2.375rem] xl:text-[2.875rem]",
            )}
          >
            {path.headline.map((line) => (
              <span key={line} className="inline lg:block">
                {line}{" "}
              </span>
            ))}
          </motion.h2>

          <motion.p
            {...rise(0.16)}
            className={cn(
              "mx-auto mt-6 max-w-[58rem] leading-relaxed text-pretty",
              "text-[1rem] text-[#393c52]/90 sm:text-[1.0625rem]",
            )}
          >
            {path.description}
          </motion.p>
        </div>

        {/* ============================= Path ======================= */}
        <motion.div
          initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: "some" }}
          transition={{ duration: 0.8, delay: 0.24, ease: easeOut }}
          className="mt-12 sm:mt-14"
        >
          {/* Below lg the four stages would each be a few hundred pixels wide
              and illegible, so the diagram scrolls at its designed width
              instead of shrinking. From lg up it fits and does not scroll. */}
          <div
            className={cn(
              "-mx-gutter overflow-x-auto px-gutter",
              "lg:mx-0 lg:overflow-visible lg:px-0",
            )}
          >
            <Image
              src={path.composite.src}
              alt={path.composite.alt}
              width={path.composite.width}
              height={path.composite.height}
              sizes="(min-width: 1024px) 1320px, 900px"
              className={cn(
                "h-auto max-w-none",
                // The designed width on small screens (scrolled), the column
                // width from lg up (fitted).
                "w-[56rem] lg:w-full",
              )}
            />
          </div>
        </motion.div>

        {/* ============================= Rail ======================= */}
        {/* The four stage markers under the diagram, each trailing a hairline
            that runs to the next. The last has no rule after it, so the rail
            ends with the label rather than a line into empty space. */}
        <motion.ol
          {...rise(0.36)}
          className={cn(
            "mt-8 hidden items-center gap-4 sm:mt-10 lg:flex",
            "font-mono text-[0.625rem] font-medium uppercase",
            "tracking-[0.18em] text-[#5c6076] xl:text-[0.6875rem]",
          )}
        >
          {path.stages.map((stage, index) => (
            <li
              key={stage}
              className={cn(
                "flex items-center gap-4",
                // Each stage takes an equal share of the rail, so the markers
                // land under their own quarter of the diagram.
                index < path.stages.length - 1 && "flex-1",
              )}
            >
              <span className="whitespace-nowrap">{stage}</span>

              {index < path.stages.length - 1 && (
                <span aria-hidden="true" className="h-px flex-1 bg-[#d6d3cc]" />
              )}
            </li>
          ))}
        </motion.ol>
      </Container>
    </section>
  );
}
