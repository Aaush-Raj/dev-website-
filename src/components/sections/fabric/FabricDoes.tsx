"use client";

import type { ComponentType, SVGProps } from "react";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { Uncopyable } from "@/components/ui/Uncopyable";
import { fabric } from "@/content/fabric";
import { cn } from "@/lib/utils";

import {
  ChatBubbleIcon,
  DatabaseIcon,
  IdentityIcon,
  LayersIcon,
  NodesIcon,
  PulseIcon,
  ShieldIcon,
} from "./FabricLayerIcons";
import { BookIcon } from "./FabricIcons";

/**
 * WHAT LURNYFABRIC DOES
 * ---------------------------------------------------------------------------
 * Section 3: copy and a 2x3 feature grid on the left; on the right three engine
 * cards in a vertical chain, bracketed to a shared-context label, with the
 * Fabric band beneath them.
 *
 * NOTHING HERE SHIPS AS AN IMAGE. The pack supplies the ground (1.3MB), the
 * cards (1MB) and the icons (765KB). The ground is near-white with two soft
 * colour blooms; the rest is interface and line art. Drawn, the section
 * downloads nothing and its chain can animate in sequence.
 *
 * THE CHAIN IS A WORKED EXAMPLE, not a feature list — a gap is identified,
 * learning follows, support follows that. The arrows carry that sequence and
 * the bracket says what all three share, so the cards animate in ORDER rather
 * than together: the point is that one leads to the next.
 *
 * ICONS ARE REUSED from section 2's set where the mark is the same thing —
 * Identity, Integration, Orchestration, Governance and Shared services all
 * appear in both, and drawing a second near-identical glyph for each would let
 * them drift apart.
 */

const { does } = fabric;

/** Motion's string easings are not typed, so the cubic curve is spelled out. */
const easeOut = [0.16, 1, 0.3, 1] as const;

const GLYPHS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  identity: IdentityIcon,
  database: DatabaseIcon,
  doc: DocIcon,
  nodes: NodesIcon,
  shield: ShieldIcon,
  layers: LayersIcon,
  pulse: PulseIcon,
  book: BookIcon,
  chat: ChatBubbleIcon,
};

/** Disc and chip colours, sampled from the design. Keyed per engine. */
const TONES = {
  violet: {
    disc: "bg-[#e9e5fb] text-[#6d4fd0]",
    chip: "bg-[#eee9fc] text-[#5a3fae]",
  },
  blue: {
    disc: "bg-[#e2edfb] text-[#3f72c4]",
    chip: "bg-[#e6f0fc] text-[#2f5ea6]",
  },
  mint: {
    disc: "bg-[#ddf2ea] text-[#2f8f77]",
    chip: "bg-[#e3f4ee] text-[#237a63]",
  },
} as const;

export function FabricDoes() {
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduce ? "shown" : "hidden",
    whileInView: "shown",
    viewport: {
      once: true,
      amount: "some",
      margin: "0px 0px 20% 0px",
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
        // Sampled from the supplied plate: a warm near-white.
        "bg-[#fdfbf9] text-[#0b0a14]",
        "py-16 sm:py-20 lg:py-24",
      )}
    >
      {/* ========================= Background wash ====================== */}
      {/*
        The plate's two colour blooms — peach at the top right, lavender at the
        bottom right — as radial gradients. Flat colour on a flat ground, so
        there is nothing here a 1.3MB image would render better.
      */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 -z-10",
          "bg-[radial-gradient(ellipse_60%_55%_at_96%_6%,rgb(252_226_206/0.75),transparent_62%),radial-gradient(ellipse_70%_60%_at_86%_92%,rgb(226_219_252/0.85),transparent_64%),radial-gradient(ellipse_50%_45%_at_62%_52%,rgb(236_231_252/0.5),transparent_66%)]",
        )}
      />

      <Container width="hero">
        <div
          className={cn(
            "grid gap-12",
            /*
              `min-w-0` on the single-column case too. Grid items default to
              `min-width: auto`, so below `xl` — where the explicit
              `minmax(0,...)` tracks do not apply — the chain's widest card
              pushed its column to 531px inside a 348px container, dragging the
              copy out with it. The section's `overflow-hidden` masked it from
              `scrollWidth`, so it only showed as content running off-screen.
            */
            "[&>*]:min-w-0",
            // Measured from the design: the copy runs to ~50% of the frame and
            // the chain occupies the right half.
            "xl:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] xl:gap-10",
          )}
        >
          {/* ============================ Copy ========================== */}
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "font-mono text-[0.75rem] font-medium tracking-[0.18em] uppercase",
                "text-[#6d4fd0]",
              )}
            >
              {does.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.06)}
              className={cn(
                "mt-6 font-display font-bold tracking-[-0.035em]",
                "leading-[1.04] text-balance text-[#111536]",
                // Measured from the design at ~62px on a 1440 frame.
                "text-[2.125rem] sm:text-[2.75rem] xl:text-[3.375rem]",
              )}
            >
              {/*
                Three content lines, each owning its own row as the design has
                them, rather than depending on where the measure runs out.
              */}
              {does.headline.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </motion.h2>

            <motion.p
              {...rise(0.12)}
              className={cn(
                "mt-7 max-w-[34rem] leading-relaxed text-pretty",
                "text-[1rem] text-[#4b5375] sm:text-[1.0625rem]",
              )}
            >
              {does.description}
            </motion.p>

            {/* ------------------------ Features --------------------- */}
            {/*
              Two columns from `sm`. The design's reading order runs ACROSS the
              pair rather than down each one, which is the order the content
              array is in — so the grid fills row by row and needs no
              reordering here.
            */}
            <ul className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2">
              {does.features.map((feature, index) => {
                const Glyph = GLYPHS[feature.icon];
                return (
                  <motion.li
                    key={feature.title}
                    {...rise(0.18 + index * 0.06)}
                    className="group/feature flex gap-4"
                  >
                    <Glyph
                      className={cn(
                        "mt-0.5 size-7 shrink-0 text-[#6d4fd0]",
                        "duration-normal transition-[scale] ease-out",
                        "will-change-[scale] group-hover/feature:scale-110",
                      )}
                    />
                    <div className="min-w-0">
                      <p className="text-[1.0625rem] leading-tight font-bold text-[#111536]">
                        {feature.title}
                      </p>
                      <p className="mt-2 text-[0.9375rem] leading-relaxed text-[#4b5375]">
                        {feature.body}
                      </p>
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          </div>

          {/* =========================== Chain ========================== */}
          <Uncopyable>
            <ChainDiagram reduce={Boolean(reduce)} />
          </Uncopyable>
        </div>

        {/* ========================== Closing ========================== */}
        <motion.p
          {...rise(0.1)}
          className={cn(
            "mt-14 border-t border-[#0b0a14]/10 pt-9",
            "font-display font-bold tracking-[-0.02em] text-[#111536]",
            "text-[1.125rem] text-balance sm:text-[1.375rem]",
          )}
        >
          {does.closing}
        </motion.p>
      </Container>
    </section>
  );
}

/* ========================================================================== */
/* CHAIN                                                                      */
/* ========================================================================== */

/**
 * The three engine cards, their connecting arrows, the side bracket and the
 * Fabric band.
 *
 * THE BRACKET IS CSS, NOT SVG. It is three axis-aligned rules and two dots —
 * a shape that decomposes cleanly into positioned elements, and one that a
 * stretched viewBox would skew. It only appears from `xl`: below that the
 * cards go full width and there is no gutter beside them for it to occupy.
 */
function ChainDiagram({ reduce }: { reduce: boolean }) {
  return (
    <div className="relative">
      {/*
        The bracket's lane. The cards are inset from the right to leave room
        for it, so the lane and the cards cannot collide.
      */}
      <div className="xl:pr-[8.5rem]">
        <ul className="space-y-0">
          {does.chain.map((engine, index) => {
            const Glyph = GLYPHS[engine.icon];
            const tone = TONES[engine.tone];
            return (
              <li key={engine.id}>
                <motion.div
                  initial={
                    reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }
                  }
                  whileInView={{ opacity: 1, y: 0 }}
                  /*
                    A generous bottom margin. The three cards stack tall on a
                    phone, so the third sits well below the fold — at a smaller
                    margin it stayed at opacity 0 and the chain ended at two.
                  */
                  viewport={{
                    once: true,
                    amount: "some",
                    margin: "0px 0px 70% 0px",
                  }}
                  transition={{
                    duration: 0.6,
                    // In order: the chain is a sequence, so one card arrives
                    // after the last rather than all three together.
                    delay: 0.15 + index * 0.18,
                    ease: easeOut,
                  }}
                  className={cn(
                    "group/card flex items-center gap-5 rounded-2xl bg-white p-5",
                    "shadow-[0_1rem_2.5rem_-1.25rem_rgb(20_18_60/0.3)]",
                    "duration-normal transition-[translate,box-shadow] ease-out",
                    "will-change-[translate] hover:-translate-y-1",
                    "hover:shadow-[0_1.75rem_3.25rem_-1.25rem_rgb(20_18_60/0.38)]",
                  )}
                >
                  <span
                    className={cn(
                      "grid size-16 shrink-0 place-items-center rounded-full",
                      tone.disc,
                      "duration-normal transition-[scale] ease-out",
                      "will-change-[scale] group-hover/card:scale-105",
                    )}
                  >
                    <Glyph className="size-8" />
                  </span>

                  <div className="min-w-0">
                    <p className="font-display text-[1.375rem] leading-tight font-bold tracking-[-0.02em] text-[#111536]">
                      {engine.name}
                    </p>
                    <p className="mt-1 text-[0.9375rem] text-[#4b5375]">
                      {engine.step}
                    </p>
                    <p
                      className={cn(
                        "mt-3 inline-block rounded-lg px-3 py-1.5",
                        // Wraps rather than forcing the card wide: these chips
                        // carry the longest strings in the section.
                        "text-[0.8125rem] text-balance",
                        tone.chip,
                      )}
                    >
                      {engine.chip}
                    </p>
                  </div>
                </motion.div>

                {/* ------------------- Arrow ------------------- */}
                {/*
                  Between cards only, never after the last — the chain ends at
                  Chat, and an arrow there would point at nothing.
                */}
                {index < does.chain.length - 1 ? (
                  <ChainArrow reduce={reduce} delay={0.45 + index * 0.18} />
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>

      {/* --------------------------- Bracket -------------------------- */}
      <Bracket reduce={reduce} />

      {/* ------------------------ Fabric band ------------------------- */}
      <motion.div
        initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: "some", margin: "0px 0px 70% 0px" }}
        transition={{ duration: 0.6, delay: 0.72, ease: easeOut }}
        className={cn(
          "mt-6 flex items-center gap-5 rounded-2xl p-5",
          // A lavender band, as the design sets it — the foundation the three
          // cards above all rest on.
          "bg-[#e7e2fb]",
        )}
      >
        <LayersIcon className="size-10 shrink-0 text-[#5a3fae]" />
        <div className="min-w-0">
          <p className="font-display text-[1.375rem] leading-tight font-bold tracking-[-0.02em] text-[#221a52]">
            {does.band.name}
          </p>
          {/*
            `flex-wrap`, not an inline run. The six dot-separated items formed
            one unbreakable line 431px wide, which pushed the band — and with it
            the whole chain column — past a phone's viewport.
          */}
          <p className="mt-1.5 flex flex-wrap items-center text-[0.875rem] leading-relaxed text-[#4b4380]">
            {does.band.items.map((item, index) => (
              <span key={item} className="flex items-center">
                {index > 0 ? (
                  <span aria-hidden="true" className="px-1.5 text-[#8b83bd]">
                    ·
                  </span>
                ) : null}
                {item}
              </span>
            ))}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

/** The short down-arrow between two chain cards. */
function ChainArrow({ reduce, delay }: { reduce: boolean; delay: number }) {
  return (
    <div aria-hidden="true" className="flex justify-center py-3">
      <svg viewBox="0 0 12 34" className="h-8 w-3 overflow-visible">
        <motion.path
          d="M6 1v25"
          fill="none"
          stroke="#8b7ad8"
          strokeWidth={1.6}
          strokeLinecap="round"
          initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "0px 0px 70% 0px" }}
          transition={{ duration: 0.4, delay, ease: easeOut }}
        />
        <motion.path
          d="m1.5 21 4.5 5 4.5-5"
          fill="none"
          stroke="#8b7ad8"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduce ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "0px 0px 70% 0px" }}
          transition={{ duration: 0.25, delay: delay + 0.3 }}
        />
      </svg>
    </div>
  );
}

/**
 * The bracket joining all three cards to the shared-context label.
 *
 * Three stubs out of the cards, one spine down the gutter, and the label. Built
 * from positioned rules rather than a path: the shape is axis-aligned, and a
 * stretched viewBox would skew the stubs while leaving the spine alone.
 */
function Bracket({ reduce }: { reduce: boolean }) {
  /*
    The three stubs sit at each card's vertical centre. The cards are equal
    height and evenly spaced, so those centres are at a sixth, a half and five
    sixths of the chain's height — expressed against the chain block rather
    than the whole component, which also carries the band below it.
  */
  const stubs = ["16.5%", "50%", "83.5%"];

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute top-0 right-0 hidden h-[calc(100%-7.5rem)] w-[8.5rem] xl:block"
    >
      {/* The spine. */}
      <motion.span
        initial={reduce ? { scaleY: 1 } : { scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: "0px 0px 70% 0px" }}
        transition={{ duration: 0.6, delay: 0.7, ease: easeOut }}
        style={{ top: stubs[0], height: `calc(${stubs[2]} - ${stubs[0]})` }}
        className="absolute left-8 w-px origin-top bg-[#8b7ad8]/70"
      />

      {stubs.map((top, index) => (
        <span key={top}>
          {/* The run out of the card to the spine. */}
          <motion.span
            initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "0px 0px 70% 0px" }}
            transition={{
              duration: 0.35,
              delay: 0.55 + index * 0.08,
              ease: easeOut,
            }}
            style={{ top }}
            className="absolute left-0 h-px w-8 origin-left bg-[#8b7ad8]/70"
          />
          {/* The dot where it meets the spine. */}
          <motion.span
            initial={reduce ? { scale: 1 } : { scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "0px 0px 70% 0px" }}
            transition={{
              duration: 0.28,
              delay: 0.78 + index * 0.08,
              ease: easeOut,
            }}
            style={{ top }}
            className="absolute left-8 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6d4fd0]"
          />
        </span>
      ))}

      {/* The label. */}
      <motion.p
        initial={reduce ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "0px 0px 70% 0px" }}
        transition={{ duration: 0.5, delay: 0.95, ease: easeOut }}
        style={{ top: stubs[1] }}
        className={cn(
          "absolute left-11 -translate-y-1/2",
          "text-[0.8125rem] leading-snug text-[#6d4fd0]",
        )}
      >
        {does.bracket.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </motion.p>
    </div>
  );
}

/* ========================================================================== */
/* ICON                                                                       */
/* ========================================================================== */

/**
 * Context — a document with rules.
 *
 * The one mark this section needs that section 2 does not have: its Context
 * entry uses a datastore, while this design draws a document.
 */
function DocIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect
        x="4.2"
        y="3"
        width="15.6"
        height="18"
        rx="2.4"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.7}
      />
      <path
        d="M8 8.6h8M8 12h8M8 15.4h4.8"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="round"
      />
    </svg>
  );
}
