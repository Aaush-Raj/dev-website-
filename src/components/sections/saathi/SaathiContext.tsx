"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { saathi } from "@/content/saathi";
import { cn } from "@/lib/utils";

import { SaathiContextPanel } from "./SaathiContextPanel";

/**
 * SAATHI CONTEXT
 * ---------------------------------------------------------------------------
 * Section 6 of the LurnySaathi page: "every employee sees a different Saathi".
 * The statement on the left, the context panel on the right, both over a
 * photographic ground.
 *
 * THE BACKGROUND
 * Unlike the hero's cut-out, this is the WHOLE scene — a relationship manager
 * at her desk — used as a bleed image. It needs no keying: the photograph's
 * left side is already dark enough to carry the copy, and the section adds a
 * gradient scrim over it so the contrast holds at every crop.
 *
 * `object-cover` with a right-hand focal point keeps her in frame as the
 * viewport narrows, since she is the right third of a 16:9 source. Below lg
 * the photo is dropped to a flat ground: at phone width the crop would show
 * either her or the copy, not both, and the panel is the content that matters.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { context } = saathi;

export function SaathiContext() {
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
        "relative isolate overflow-hidden py-section-lg",
        // The ground the photo sits on, and the fallback below lg where the
        // photo is not drawn.
        "bg-[#0c1015] text-white",
      )}
    >
      {/* ========================= The photograph ====================== */}
      <Image
        src={context.image.src}
        alt={context.image.alt}
        width={context.image.width}
        height={context.image.height}
        aria-hidden="true"
        sizes="(min-width: 1024px) 100vw, 0px"
        className={cn(
          "pointer-events-none absolute inset-0 -z-20 hidden size-full lg:block",
          "object-cover object-[62%_center]",
        )}
      />

      {/* The scrim. Heaviest on the left, where the statement sits, fading out
          across the panel so the desk and the light behind her stay visible. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: [
            "linear-gradient(90deg, rgb(12 16 21 / 0.96) 0%, rgb(12 16 21 / 0.88) 34%, rgb(12 16 21 / 0.42) 66%, rgb(12 16 21 / 0.12) 100%)",
            "linear-gradient(180deg, rgb(12 16 21 / 0.7) 0%, transparent 24%, transparent 80%, rgb(12 16 21 / 0.7) 100%)",
          ].join(","),
        }}
      />

      <Container width="wide" className="relative">
        <div
          className={cn(
            "grid gap-12",
            // The panel is the wider column: it carries two halves of content
            // beside the statement's three short lines.
            "lg:grid-cols-[minmax(0,0.55fr)_minmax(0,1fr)] lg:items-center lg:gap-10",
            "xl:gap-12",
            // The design ends the panel around 77% of the frame and gives the
            // right quarter to the photograph. This padding reserves her that
            // band — without it the panel runs to the container's edge and
            // covers exactly the part of the scene she occupies.
            "xl:pr-[13%] 2xl:pr-[17%]",
          )}
        >
          {/* =========================== Statement ===================== */}
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "text-[0.6875rem] font-bold uppercase",
                "tracking-[0.12em] text-[#f1574a] sm:text-xs",
              )}
            >
              {context.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.08)}
              className={cn(
                "mt-7 font-display font-bold tracking-[-0.035em]",
                "leading-[1.08] text-white",
                // Measured from the design at ~62px on a 1440 frame.
                "text-[2rem] sm:text-[2.5rem] xl:text-[3.5rem]",
              )}
            >
              {context.headline.map((line) => (
                <span key={line} className="inline lg:block">
                  {line}{" "}
                </span>
              ))}
            </motion.h2>

            <motion.p
              {...rise(0.16)}
              className={cn(
                "mt-7 max-w-116 leading-relaxed text-pretty",
                "text-[1.0625rem] text-neutral-300 sm:text-lg",
              )}
            >
              {context.description}
            </motion.p>

            {/* The pulled-out closing line, against the coral rule the design
                sets beside it. */}
            <motion.blockquote
              {...rise(0.24)}
              className={cn(
                "mt-10 max-w-116 border-l-2 border-[#f1574a] pl-6",
                "text-[1.0625rem] leading-relaxed text-pretty text-neutral-200",
                "sm:text-lg",
              )}
            >
              {context.pullquote}
            </motion.blockquote>
          </div>

          {/* ============================ Panel ======================== */}
          <SaathiContextPanel />
        </div>
      </Container>
    </section>
  );
}
