"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { kxp } from "@/content/kxp";
import { cn } from "@/lib/utils";

/**
 * KXP — THE CONNECTED LEARNER EXPERIENCE
 * ---------------------------------------------------------------------------
 * Section 3: the engine panel on the left, the learner workspace on the right,
 * the header over the room and a single line closing the section.
 *
 * THE SCENE IS ONE COMPOSITE, BUILT AT BUILD TIME
 * The three supplied files are all opaque RGB with no alpha, and the two
 * panels have their share of the room baked into their edges. Layering them in
 * CSS would show a hard rectangular seam around each. They are composited and
 * feathered in scripts/build-kxp-connected.cjs instead — see that file.
 *
 * TWO LAYOUTS, NOT ONE
 * From lg up the copy is positioned OVER the room, in the empty upper-left
 * quadrant the design leaves for it. Below lg it is not: the scene shrinks to a
 * few hundred pixels wide, its empty quadrant shrinks with it, and overlaid
 * copy lands unreadably on the panels. So the small layout stacks instead —
 * copy first, scene under it — and only the large one overlays.
 *
 * That is why the copy appears once but is placed by a wrapper that is static
 * below lg and absolute from lg up.
 *
 * THE RIBBONS
 * The gold strands flowing from the engine panel into the workspace are in the
 * design but in none of the supplied assets, so they are drawn here. They are
 * the section's argument made visual — five engines converging into one
 * experience — so they draw along their length rather than just fading in.
 * They are hidden below lg, where the copy no longer overlays the scene and
 * the strands would be a few pixels wide.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { connected } = kxp;

/**
 * The five strands, as percentages of the scene box. Each leaves the engine
 * panel's right edge (19.2%) at its own card's height and converges on the
 * workspace's left edge (33.3%), matching the design's flow.
 */
const RIBBONS = [
  "M 19 36 C 27 36, 28 47, 34 48",
  "M 19 44 C 27 44, 28 48, 34 49",
  "M 19 52 C 27 52, 28 50, 34 50",
  "M 19 60 C 27 60, 28 51, 34 51",
  "M 19 69 C 27 69, 28 53, 34 52",
] as const;

export function KxpConnected() {
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
        "relative isolate flex flex-col overflow-hidden lg:block",
        // The room's own violet, so the stacked layout's copy band continues
        // the scene rather than sitting on a different ground.
        "bg-[#8b7ac8]",
        // Padding only where the copy is in flow; from lg up it overlays the
        // scene and the section is exactly as tall as the image.
        "pt-14 pb-10 lg:py-0",
      )}
    >
      {/* ============================== Scene ======================== */}
      {/* In flow, at its own aspect — not cover-cropped. The engine panel sits
          hard against the left edge and the header occupies the room's empty
          upper-left, so a cover-crop would cut the panel off and slide the
          copy onto the workspace. */}
      <Image
        src={connected.scene.src}
        alt={connected.scene.alt}
        width={connected.scene.width}
        height={connected.scene.height}
        sizes="100vw"
        className="order-2 h-auto w-full lg:order-none"
      />

      {/* ----------------------------- Ribbons --------------------- */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden size-full lg:block"
      >
        {RIBBONS.map((d, index) => (
          <motion.path
            key={d}
            d={d}
            stroke="rgb(253 224 150 / 0.75)"
            strokeWidth="0.28"
            strokeLinecap="round"
            initial={
              reduce
                ? { pathLength: 1, opacity: 1 }
                : { pathLength: 0, opacity: 0 }
            }
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, amount: "some" }}
            transition={{
              duration: 1.1,
              delay: 0.5 + index * 0.1,
              ease: easeOut,
            }}
          />
        ))}
      </svg>

      {/* A wash behind the header band, so the copy keeps its contrast
          wherever the room's light falls. From lg up it stops above the panels
          — running it over the whole scene dimmed the engine panel. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 hidden h-[30%] lg:block"
        style={{
          background:
            "linear-gradient(180deg, rgb(86 66 152 / 0.55) 0%, rgb(86 66 152 / 0.28) 55%, transparent 100%)",
        }}
      />

      {/* ============================== Copy ========================= */}
      {/* Static below lg (stacked above the scene), absolute from lg up
          (overlaid on it) — see the note at the top of this file. */}
      <div className="order-1 lg:absolute lg:inset-0 lg:order-none">
        <Container width="hero" className="flex h-full flex-col">
          {/* --------------------------- Header ------------------- */}
          {/* From lg up the band is height-capped at the fraction of the scene
              the panels leave clear (they begin at ~24.6% of its height), so
              the copy can never run onto them however it reflows. */}
          <div className="lg:h-[24.6%] lg:max-w-[38rem] lg:pt-[3%]">
            <motion.p
              {...rise(0)}
              className={cn(
                "font-mono text-[0.6875rem] font-medium uppercase",
                "tracking-[0.2em] text-white/80 sm:text-xs",
              )}
            >
              {connected.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.08)}
              className={cn(
                // Serif, as the design sets it.
                "mt-4 font-serif font-bold tracking-[-0.01em]",
                "leading-[1.14] text-white",
                "text-[1.5rem] sm:text-[1.875rem] xl:text-[2.375rem]",
              )}
            >
              {connected.headline.map((line) => (
                <span key={line} className="inline lg:block">
                  {line}{" "}
                </span>
              ))}
            </motion.h2>

            <motion.p
              {...rise(0.16)}
              className={cn(
                "mt-4 max-w-[34rem] leading-relaxed text-pretty",
                "text-[0.9375rem] text-white/85 sm:text-[1rem]",
              )}
            >
              {connected.description}
            </motion.p>
          </div>

          {/* Pushes the closing line to the foot of the scene, so the room
              between them stays clear for the two panels. Only from lg up,
              where this column is as tall as the image. */}
          <div aria-hidden="true" className="hidden flex-1 lg:block" />

          {/* -------------------------- Closing ------------------- */}
          {/* From lg up it sits at the foot of the room, as the design places
              it. Below lg it is rendered separately, AFTER the scene — see the
              copy of this line at the end of the section. */}
          <motion.p
            {...rise(0.3)}
            className={cn(
              "hidden font-serif text-balance lg:block lg:text-center",
              "text-[1.0625rem] text-white sm:text-[1.25rem] xl:text-[1.5rem]",
            )}
          >
            {connected.closing}
          </motion.p>

          {/* Clears the room's foot, so the closing line is not flush with the
              section's bottom edge. */}
          <div aria-hidden="true" className="hidden h-[5%] lg:block" />
        </Container>
      </div>

      {/* The closing line for the stacked layout, which must fall AFTER the
          scene. From lg up the overlaid copy carries it instead. */}
      <Container width="hero" className="order-3 mt-8 lg:hidden">
        <motion.p
          {...rise(0.3)}
          className={cn(
            "font-serif text-balance text-white",
            "text-[1.0625rem] sm:text-[1.25rem]",
          )}
        >
          {connected.closing}
        </motion.p>
      </Container>
    </section>
  );
}
