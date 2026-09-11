"use client";

import type { ComponentType } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { Uncopyable } from "@/components/ui/Uncopyable";
import { compliance } from "@/content/compliance";
import { cn } from "@/lib/utils";

/**
 * THE COMPLIANCE REALITY
 * ---------------------------------------------------------------------------
 * Section 2: the problem. A dark full-bleed band with the photograph behind
 * it, three cards floating over the scene, and a rail of four consequences
 * along the foot.
 *
 * ONLY THE PHOTOGRAPH SHIPS. The design pack also supplies the cards with
 * their dotted arrows as a 364KB PNG and the foot ribbon as a 163KB one; both
 * are pure interface, so they are drawn here instead — the text stays
 * selectable, translatable and legible to screen readers, and the strokes stay
 * crisp at any density.
 *
 * THE CONNECTORS ARE CSS, NOT SVG. They are short dashed runs between card
 * edges, and a stretched viewBox cannot carry that shape: `preserveAspect-
 * Ratio="none"` skews the dashes and flattens the curve. A positioned element
 * with a repeating-gradient dash has no coordinate space to distort.
 *
 * READING ORDER IS THE CONNECTOR ORDER. The cards are listed bottom-left, then
 * centre, then top-right, because that is how the chain runs — not how they
 * stack visually. Sorting them by position would break the sequence the
 * connectors draw.
 */

const { reality } = compliance;

/** Motion's string easings are not typed, so the cubic curve is spelled out. */
const easeOut = [0.16, 1, 0.3, 1] as const;

/** Sampled from the design: the three card hues plus the rail's violet. */
const TONES = {
  cyan: {
    ring: "ring-[#6bf5f8]/55",
    text: "text-[#6bf5f8]",
    glow: "shadow-[0_0_2.5rem_-0.75rem_rgb(107_245_248/0.45)]",
    hoverRing: "group-hover/card:ring-[#6bf5f8]/90",
  },
  red: {
    ring: "ring-[#f97477]/55",
    text: "text-[#f97477]",
    glow: "shadow-[0_0_2.5rem_-0.75rem_rgb(249_116_119/0.45)]",
    hoverRing: "group-hover/card:ring-[#f97477]/90",
  },
  amber: {
    ring: "ring-[#f4e195]/60",
    text: "text-[#f4e195]",
    glow: "shadow-[0_0_2.5rem_-0.75rem_rgb(244_225_149/0.4)]",
    hoverRing: "group-hover/card:ring-[#f4e195]/95",
  },
  violet: {
    ring: "ring-[#9f6afc]/55",
    text: "text-[#9f6afc]",
    glow: "shadow-[0_0_2.5rem_-0.75rem_rgb(159_106_252/0.4)]",
    hoverRing: "group-hover/card:ring-[#9f6afc]/90",
  },
} as const;

const GLYPHS: Record<string, ComponentType<{ className?: string }>> = {
  document: DocumentIcon,
  checklist: ChecklistIcon,
  bars: BarsIcon,
  stack: StackIcon,
};

export function ComplianceReality() {
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
        // Sampled from the design's own ground, below the photograph.
        "bg-[#101728] text-white",
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
          Two washes. The first darkens the left so the headline holds contrast
          against a scene whose brightest area — the lit building and the
          floodlit path — sits behind it; the second sinks the foot into the
          section ground so the consequence rail sits on flat colour rather
          than on paving.
        */}
        <div
          className={cn(
            "absolute inset-0",
            "bg-[linear-gradient(to_right,rgb(8_12_24/0.94)_0%,rgb(8_12_24/0.82)_34%,rgb(8_12_24/0.44)_58%,rgb(8_12_24/0.58)_100%)]",
          )}
        />
        <div
          className={cn(
            "absolute inset-x-0 bottom-0 h-[38%]",
            "bg-[linear-gradient(to_bottom,transparent,rgb(16_23_40/0.96)_76%,#101728_100%)]",
          )}
        />
      </div>

      <Container width="hero">
        <div className="pt-16 pb-10 sm:pt-20 lg:pt-24 lg:pb-14 xl:pb-[19rem]">
          {/* =========================== Copy ========================== */}
          <motion.p
            {...rise(0)}
            className={cn(
              "font-mono text-[0.75rem] font-medium tracking-[0.16em] uppercase",
              "text-[#9f6afc]",
            )}
          >
            {reality.eyebrow}
          </motion.p>

          <motion.h2
            {...rise(0.06)}
            className={cn(
              "mt-5 font-display font-bold tracking-[-0.035em]",
              "leading-[1.04] text-balance",
              // Measured from the design at ~58px on a 1440 frame.
              "text-[2rem] sm:text-[2.625rem] xl:text-[3.5rem]",
            )}
          >
            {/*
              Three content lines, each owning its own row as the design has
              them, rather than depending on where the text happens to wrap.
            */}
            {reality.headline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </motion.h2>

          <motion.p
            {...rise(0.12)}
            className={cn(
              "mt-6 max-w-[36rem] leading-relaxed text-pretty",
              "text-[1rem] text-[#b6bdd2] sm:text-[1.0625rem]",
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
            {reality.gaps.map((gap, index) => (
              <div
                key={gap.id}
                className={index === 2 ? "sm:col-span-2" : undefined}
              >
                <GapCard gap={gap} />
              </div>
            ))}
          </Uncopyable>
        </div>
      </Container>

      {/* ======================== Gap cards ======================== */}
      {/*
        Pinned across the WHOLE section, not stacked below the copy. In the
        design the role-readiness card sits level with the HEADLINE rather than
        under it, so the box the percentages are measured against has to span
        the same frame the design measured them on.

        `xl` only: below that the cards stack, since three floating over a
        scene this size would overlap and the dashes would be too short to
        follow.
      */}
      <Uncopyable
        className={cn(
          "pointer-events-none absolute inset-x-0 hidden xl:block",
          // Opens level with the eyebrow — the readiness card sits beside the
          // headline in the design — and closes above the foot rail.
          "top-[9%] bottom-[15%]",
        )}
      >
        <Container width="hero" className="relative h-full">
          {reality.gaps.map((gap, index) => (
            <motion.div
              key={gap.id}
              {...rise(0.2 + index * 0.12)}
              className={cn("pointer-events-auto absolute", gap.position)}
            >
              <GapCard gap={gap} />
            </motion.div>
          ))}

          <Connectors reduce={Boolean(reduce)} />
        </Container>
      </Uncopyable>

      {/* ====================== Consequence rail ====================== */}
      <div className="relative border-t border-white/10 bg-[#101728]">
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
                    "group/item flex items-center gap-4",
                    "lg:justify-center lg:px-6",
                  )}
                >
                  <Glyph
                    className={cn(
                      "size-6 shrink-0",
                      tone.text,
                      "duration-normal transition-[scale] ease-out",
                      "will-change-[scale] group-hover/item:scale-110",
                    )}
                  />
                  <span className="text-[0.9375rem] text-[#d2d7e6]">
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
/* GAP CARD                                                                   */
/* ========================================================================== */

type Gap = (typeof reality.gaps)[number];

function GapCard({ gap }: { gap: Gap }) {
  const tone = TONES[gap.tone];
  const Glyph = GLYPHS[gap.icon];

  return (
    <div
      className={cn(
        "group/card flex items-start gap-4 rounded-xl p-5",
        // A translucent dark fill, so the photograph shows faintly through the
        // card as it does in the design rather than being blocked out.
        "bg-[#0d1322]/90 backdrop-blur-sm",
        "ring-1",
        tone.ring,
        tone.glow,
        "duration-normal transition-[translate,--tw-ring-color,box-shadow] ease-out",
        "will-change-[translate] hover:-translate-y-1",
        tone.hoverRing,
      )}
    >
      <Glyph
        className={cn(
          "mt-0.5 size-7 shrink-0",
          tone.text,
          "duration-normal transition-[scale] ease-out",
          "will-change-[scale] group-hover/card:scale-110",
        )}
      />

      <div className="min-w-0">
        <p
          className={cn(
            "text-[0.6875rem] font-bold tracking-[0.12em] uppercase",
            tone.text,
          )}
        >
          {gap.label}
        </p>

        {/*
          The title breaks where the design breaks it, rather than wherever the
          measure happens to run out — each line is its own block.
        */}
        <p className="mt-2 text-[1.0625rem] leading-tight font-bold text-white">
          {gap.title.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>

        <p className="mt-2 text-[0.875rem] leading-snug text-[#a4abc2]">
          {gap.note}
        </p>
      </div>
    </div>
  );
}

/* ========================================================================== */
/* CONNECTORS                                                                 */
/* ========================================================================== */

/**
 * The two dashed runs joining the three cards.
 *
 * DRAWN AS POSITIONED ELEMENTS, not SVG paths. Each is a short run between two
 * card edges, so it decomposes into a single dashed rule — and unlike a path in
 * a stretched viewBox, a rule cannot skew when the box changes shape.
 *
 * Percentages are of the card box, and the angled run's length and rotation
 * are derived from the two corner points rather than guessed — an eyeballed
 * angle lands the dash across the subject instead of between the cards.
 */
function Connectors({ reduce }: { reduce: boolean }) {
  const draw = (delay: number) => ({
    initial: reduce ? { opacity: 0.5, scaleX: 1 } : { opacity: 0, scaleX: 0 },
    whileInView: { opacity: 0.5, scaleX: 1 },
    viewport: { once: true } as const,
    transition: { duration: 0.6, delay, ease: easeOut },
  });

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {/* ---- Policies card → assessments card: a short run rightward ---- */}
      <motion.span
        {...draw(0.62)}
        className="absolute h-px origin-left"
        style={{
          // The cyan card's right edge (27.5%) to the red card's left (32.5%).
          left: "27.5%",
          top: "67.5%",
          width: "5%",
          backgroundImage:
            "repeating-linear-gradient(to right,white 0 7px,transparent 7px 14px)",
        }}
      />

      {/* --- Assessments card → readiness card: up and to the right ----- */}
      <motion.span
        {...draw(0.74)}
        className="absolute h-px origin-left"
        style={{
          /*
            The red card's top-right corner to the amber card's bottom-left,
            both read off the rendered band: (57%, 64.5%) to (75.5%, 28.9%).

            The run is 18.5% of the width across and 35.6% of the height up. On
            a 1320x618 band that is 244px across and 220px up — 328px long at
            -42 degrees, which is 24.8% of the band's width. Deriving it from
            the two corners rather than guessing is what keeps it between the
            cards: an eyeballed angle ran it across the subject's chest.
          */
          left: "57%",
          top: "64.5%",
          width: "24.8%",
          rotate: "-42deg",
          backgroundImage:
            "repeating-linear-gradient(to right,white 0 7px,transparent 7px 14px)",
        }}
      />
    </div>
  );
}

/* ========================================================================== */
/* ICONS                                                                      */
/* ========================================================================== */

/**
 * Drawn inline rather than shipped, matching the rest of this page's sections.
 * These render at 24-28px, so a raster buys nothing a path does not, and inline
 * stays crisp at any density while inheriting currentColor.
 */

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** Policies & SOPs — a document with a folded corner. */
function DocumentIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z"
        {...stroke}
      />
      <path d="M14 3v5h5" {...stroke} />
      <path d="M8.5 12.5h7M8.5 16h4.5" {...stroke} />
    </svg>
  );
}

/**
 * Assessments — a checklist, its first two items ticked and the last not.
 *
 * The unticked row is the point the card makes: a pass score tells part of the
 * story, so the list is deliberately incomplete rather than all ticks.
 */
function ChecklistIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <rect x="3.2" y="2.8" width="17.6" height="18.4" rx="2.4" {...stroke} />
      {/* The two ticked rows. */}
      <path d="m6.6 8 1.5 1.5 2.6-2.8" {...stroke} />
      <path d="m6.6 13.2 1.5 1.5 2.6-2.8" {...stroke} />
      {/* The third, left open. */}
      <path d="M6.9 18h2.6" {...stroke} />
      <path d="M13.4 8.2h4.2M13.4 13.4h4.2M13.4 18h4.2" {...stroke} />
    </svg>
  );
}

/** Role readiness — a bar chart, ascending. */
function BarsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <rect x="3.5" y="14" width="4.4" height="6.5" rx="1.2" {...stroke} />
      <rect x="9.8" y="9.5" width="4.4" height="11" rx="1.2" {...stroke} />
      <rect x="16.1" y="4.5" width="4.4" height="16" rx="1.2" {...stroke} />
    </svg>
  );
}

/** Evidence scattered — stacked discs, as the design's rail draws them. */
function StackIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <ellipse cx="12" cy="6" rx="7.5" ry="3" {...stroke} />
      <path d="M4.5 6v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V6" {...stroke} />
      <path d="M4.5 12v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-6" {...stroke} />
    </svg>
  );
}
