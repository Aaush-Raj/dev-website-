"use client";

import type { ComponentType, SVGProps } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { Uncopyable } from "@/components/ui/Uncopyable";
import { capabilityBuilding } from "@/content/capability-building";
import { cn } from "@/lib/utils";

import {
  BarsGlyph,
  CapGlyph,
  DocumentGlyph,
  TrendGlyph,
} from "./CapabilityIcons";

/**
 * THE CAPABILITY BUILDING REALITY
 * ---------------------------------------------------------------------------
 * Section 2: the problem. A dark full-bleed band with the photograph behind it,
 * three stage cards floating over the scene, and a rail of four consequences
 * along the foot.
 *
 * ONLY THE PHOTOGRAPH SHIPS. The design pack also supplies the cards, icons and
 * connectors as one 2.1MB transparent PNG; that layer is pure interface, so it
 * is drawn here instead — the text stays selectable, translatable and legible
 * to screen readers, and the strokes stay crisp at any density.
 *
 * THE CONNECTORS ARE CSS, NOT SVG. They are axis-aligned elbows, and every
 * previous attempt on this build at drawing that shape in a stretched viewBox
 * came out wrong — `preserveAspectRatio="none"` turns arrowheads into skewed
 * triangles and flattens the corners. Positioned rules with a border-image
 * dash pattern have no coordinate space to distort.
 *
 * THE ARROWS POINT BACKWARDS, deliberately. Each one aims at the PREVIOUS
 * stage: learning back at the assessment, the assessment back at the
 * expectations. That is the argument — three stages that never feed forward —
 * so the direction carries the meaning and must not be "corrected".
 */

const { reality } = capabilityBuilding;

/** Motion's string easings are not typed, so the cubic curve is spelled out. */
const easeOut = [0.16, 1, 0.3, 1] as const;

/** Sampled from the supplied overlay: the three stage hues plus the violet. */
const TONES = {
  teal: {
    stroke: "ring-[#46ffff]/55",
    text: "text-[#46ffff]",
    glow: "shadow-[0_0_2.5rem_-0.75rem_rgb(70_255_255/0.45)]",
  },
  red: {
    stroke: "ring-[#ff807e]/55",
    text: "text-[#ff807e]",
    glow: "shadow-[0_0_2.5rem_-0.75rem_rgb(255_128_126/0.45)]",
  },
  amber: {
    stroke: "ring-[#fff061]/55",
    text: "text-[#fff061]",
    glow: "shadow-[0_0_2.5rem_-0.75rem_rgb(255_240_97/0.4)]",
  },
  violet: {
    stroke: "ring-[#bc86fd]/55",
    text: "text-[#bc86fd]",
    glow: "shadow-[0_0_2.5rem_-0.75rem_rgb(188_134_253/0.4)]",
  },
} as const;

const GLYPHS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  document: DocumentGlyph,
  bars: BarsGlyph,
  cap: CapGlyph,
  trend: TrendGlyph,
};

export function CapabilityReality() {
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduce ? "shown" : "hidden",
    whileInView: "shown",
    viewport: {
      once: true,
      amount: "some",
      margin: "0px 0px 15% 0px",
    } as const,
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
        "relative isolate overflow-hidden",
        // Sampled from the design's own ground, behind and below the photo.
        "bg-[#121421] text-white",
      )}
    >
      {/* ========================= The photograph ======================= */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Image
          src={reality.scene.src}
          alt={reality.scene.alt}
          fill
          sizes="100vw"
          className="object-cover object-center"
        />

        {/*
          Two washes over the photograph. The first darkens the left half so
          the headline holds contrast against a scene that is brightest exactly
          there; the second sinks the foot into the section ground so the
          consequence rail sits on flat colour rather than on the desk.
        */}
        <div
          className={cn(
            "absolute inset-0",
            "bg-[linear-gradient(to_right,rgb(18_20_33/0.94)_0%,rgb(18_20_33/0.72)_38%,rgb(18_20_33/0.34)_62%,rgb(18_20_33/0.5)_100%)]",
          )}
        />
        <div
          className={cn(
            "absolute inset-x-0 bottom-0 h-[42%]",
            "bg-[linear-gradient(to_bottom,transparent,rgb(18_20_33/0.96)_78%,#121421_100%)]",
          )}
        />
      </div>

      <Container width="hero">
        <div className="pt-16 pb-10 sm:pt-20 lg:pt-24 lg:pb-14 xl:pb-[26rem]">
          {/* =========================== Copy ========================== */}
          <motion.p
            {...rise(0)}
            className={cn(
              "font-mono text-[0.75rem] font-medium tracking-[0.16em] uppercase",
              "text-[#bc86fd]",
            )}
          >
            {reality.eyebrow}
          </motion.p>

          <motion.h2
            {...rise(0.06)}
            className={cn(
              "mt-5 max-w-[42rem] font-display font-bold tracking-[-0.03em]",
              "leading-[1.08] text-balance",
              // Measured from the design at ~52px on a 1440 frame.
              "text-[1.875rem] sm:text-[2.375rem] xl:text-[3.25rem]",
            )}
          >
            {reality.headline}
          </motion.h2>

          <motion.p
            {...rise(0.12)}
            className={cn(
              "mt-6 max-w-[36rem] leading-relaxed text-pretty",
              "text-[1rem] text-[#b9bcd4] sm:text-[1.0625rem]",
            )}
          >
            {reality.description}
          </motion.p>

          {/*
            The stacked fallback. NOT scroll-animated: the cards sit well below
            the fold on a narrow screen, and under `whileInView` they would
            render at opacity 0 with an empty band where they belong.
          */}
          <Uncopyable className="mt-10 grid gap-4 sm:grid-cols-2 xl:hidden">
            {reality.stages.map((stage, index) => (
              <div
                key={stage.id}
                className={index === 2 ? "sm:col-span-2" : undefined}
              >
                <StageCard stage={stage} />
              </div>
            ))}
          </Uncopyable>
        </div>
      </Container>

      {/* ========================== Stages ========================= */}
      {/*
        Pinned across the WHOLE section, not stacked below the copy. In the
        design the learning card sits BESIDE the headline rather than under it —
        laying the three out in a block after the copy pushed them all into the
        bottom third and computed a negative offset for that card. So the box
        spans the band and the measured percentages are used directly.

        `xl` only: below that the cards stack, since three floating over a scene
        this size would overlap and the elbows would be too short to follow.
      */}
      <Uncopyable
        className={cn(
          "pointer-events-none absolute inset-x-0 hidden xl:block",
          /*
            The band starts BELOW the copy. Measured on the render, the
            description ends at 43.9% of the section — with the band opening at
            16% the role-expectations card covered it outright. Only the
            learning card sits level with the headline in the design, and it
            clears the copy on the right-hand side, so it gets a negative offset
            of its own rather than the whole band being raised.
          */
          "top-[44%] bottom-[13%]",
        )}
      >
        <Container width="hero" className="relative h-full">
          {reality.stages.map((stage, index) => (
            <motion.div
              key={stage.id}
              {...rise(0.2 + index * 0.12)}
              className={cn("absolute", stage.position)}
            >
              <StageCard stage={stage} />
            </motion.div>
          ))}

          <Connectors reduce={Boolean(reduce)} />
        </Container>
      </Uncopyable>

      {/* ====================== Consequence rail ====================== */}
      <div className="relative border-t border-white/10 bg-[#121421]">
        <Container width="hero">
          <ul
            className={cn(
              "grid gap-y-6 py-7",
              "sm:grid-cols-2 lg:grid-cols-4",
              // The design rules between the four items, not around them.
              "lg:divide-x lg:divide-white/12",
            )}
          >
            {reality.consequences.map((item, index) => {
              const Glyph = GLYPHS[item.icon];
              const tone = TONES[item.tone];
              return (
                <motion.li
                  key={item.label}
                  {...rise(0.05 * index)}
                  className={cn(
                    "flex items-center gap-4",
                    "lg:justify-center lg:px-6",
                  )}
                >
                  <Glyph className={cn("size-6 shrink-0", tone.text)} />
                  <span className="text-[0.9375rem] text-[#d6d8e8]">
                    {item.label}
                  </span>
                </motion.li>
              );
            })}
          </ul>
        </Container>
      </div>
    </section>
  );
}

/* ========================================================================== */
/* STAGE CARD                                                                 */
/* ========================================================================== */

type Stage = (typeof reality.stages)[number];

function StageCard({ stage }: { stage: Stage }) {
  const tone = TONES[stage.tone];
  const Glyph = GLYPHS[stage.icon];

  return (
    <div
      className={cn(
        "flex items-start gap-4 rounded-2xl p-5",
        // A translucent dark fill, so the photograph shows faintly through the
        // card as it does in the design rather than being blocked out.
        "bg-[#0d1020]/88 backdrop-blur-sm",
        "ring-1",
        tone.stroke,
        tone.glow,
      )}
    >
      <Glyph className={cn("size-8 shrink-0", tone.text)} />

      <div className="min-w-0">
        <p
          className={cn(
            "text-[0.6875rem] font-bold tracking-[0.12em] uppercase",
            tone.text,
          )}
        >
          {stage.label}
        </p>
        <p className="mt-1.5 text-[1.0625rem] leading-tight font-semibold text-white">
          {stage.title}
        </p>
        <p className="mt-1 text-[0.875rem] leading-snug text-[#a9adc8]">
          {stage.note}
        </p>
      </div>
    </div>
  );
}

/* ========================================================================== */
/* CONNECTORS                                                                 */
/* ========================================================================== */

/**
 * The two dashed elbows joining the three cards.
 *
 * DRAWN AS POSITIONED RULES, not as SVG paths. Each elbow is axis-aligned, so
 * it decomposes into two dashed segments plus an arrowhead — and unlike a path
 * in a stretched viewBox, none of those can skew when the box changes shape.
 *
 * Percentages are of the stage box, measured from the design's own overlay
 * layer. Each run starts at one card's edge and ends at the next card's.
 */
function Connectors({ reduce }: { reduce: boolean }) {
  const draw = (delay: number) => ({
    initial: reduce ? { opacity: 0.62 } : { opacity: 0 },
    whileInView: { opacity: 0.62 },
    viewport: { once: true } as const,
    transition: { duration: 0.5, delay, ease: easeOut },
  });

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {/* ---- Assessment → expectations: up out of the red card, then left --- */}
      <motion.span
        {...draw(0.55)}
        className="absolute w-px"
        style={{
          left: "44.5%",
          top: "5.5rem",
          height: "4rem",
          backgroundImage:
            "repeating-linear-gradient(to bottom,white 0 6px,transparent 6px 12px)",
        }}
      />
      <motion.span
        {...draw(0.62)}
        className="absolute h-px"
        style={{
          left: "34.5%",
          top: "5.5rem",
          width: "10%",
          backgroundImage:
            "repeating-linear-gradient(to right,white 0 6px,transparent 6px 12px)",
        }}
      />
      {/* The arrowhead, pointing back at the expectations card. */}
      <motion.span
        {...draw(0.7)}
        className="absolute size-2 border-t border-l border-white"
        style={{
          left: "34.2%",
          top: "30%",
          translate: "0 -50%",
          rotate: "-45deg",
        }}
      />
      {/* The dot where the run leaves the assessment card. */}
      <motion.span
        {...draw(0.5)}
        className="absolute size-2.5 rounded-full bg-[#ff807e]"
        style={{ left: "44.5%", top: "9.5rem", translate: "-50% -50%" }}
      />

      {/* ---- Learning → assessment: left out of the amber card, then down --- */}
      <motion.span
        {...draw(0.75)}
        className="absolute h-px"
        style={{
          left: "60%",
          top: "-13.5rem",
          width: "6.5%",
          backgroundImage:
            "repeating-linear-gradient(to right,white 0 6px,transparent 6px 12px)",
        }}
      />
      <motion.span
        {...draw(0.82)}
        className="absolute w-px"
        style={{
          left: "60%",
          top: "-13.5rem",
          height: "4.5rem",
          backgroundImage:
            "repeating-linear-gradient(to bottom,white 0 6px,transparent 6px 12px)",
        }}
      />
      <motion.span
        {...draw(0.88)}
        className="absolute h-px"
        style={{
          left: "54.5%",
          top: "-9rem",
          width: "5.5%",
          backgroundImage:
            "repeating-linear-gradient(to right,white 0 6px,transparent 6px 12px)",
        }}
      />
      {/* The arrowhead, pointing back at the assessment card. */}
      <motion.span
        {...draw(0.94)}
        className="absolute size-2 border-t border-l border-white"
        style={{
          left: "54.2%",
          top: "40%",
          translate: "0 -50%",
          rotate: "-45deg",
        }}
      />
      {/* The dot where the run leaves the learning card. */}
      <motion.span
        {...draw(0.7)}
        className="absolute size-2.5 rounded-full bg-[#fff061]"
        style={{ left: "66.5%", top: "-13.5rem", translate: "-50% -50%" }}
      />
    </div>
  );
}
