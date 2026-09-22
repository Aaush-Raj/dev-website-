"use client";

import type { ComponentType, SVGProps } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { Uncopyable } from "@/components/ui/Uncopyable";
import { sim } from "@/content/sim";
import { cn } from "@/lib/utils";

import { BarsIcon, BubbleRoundIcon, HeartIcon } from "./SimIcons";

/**
 * LURNYSIM — MANAGER FEEDBACK AND COACHING
 * ---------------------------------------------------------------------------
 * Section 4: a statement with three marks on the left; two numbered photo
 * cards on the right showing the same manager rehearsing, then holding the
 * real conversation.
 *
 * ONLY THE TWO PHOTOGRAPHS SHIP — 81KB against the 4.6MB the pack supplies:
 *
 *   - The pack's cards are 1.5MB each and bake in the header, the caption and
 *     (on the first) the coaching panel. Only the photograph inside each is
 *     kept; the chrome around it is drawn, so the copy stays selectable and
 *     the panel can animate.
 *   - The 1093KB plate is a near-flat #efeafe with broad angled facets, so it
 *     costs a few gradients instead.
 *   - The three benefit marks render at 24px; the pack ships them at 1254px.
 *
 * THE CARDS' PANEL IS ILLUSTRATIVE — `Uncopyable` and aria-hidden — but the
 * card TITLES AND CAPTIONS ARE REAL COPY: they carry the section's argument
 * (rehearse, then lead), so they stay selectable and reach a screen reader.
 */

const { coaching } = sim;

/** Motion's string easings are not typed, so the cubic curve is spelled out. */
const easeOut = [0.16, 1, 0.3, 1] as const;

const GLYPHS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  heart: HeartIcon,
  bubble: BubbleRoundIcon,
  bars: BarsIcon,
};

export function SimCoaching() {
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduce ? "shown" : "hidden",
    whileInView: "shown",
    /*
      A generous bottom margin. This section sits well below the fold, and at
      a smaller margin its lower rows stayed at opacity 0 — the failure every
      long section on this build has hit.
    */
    viewport: {
      once: true,
      amount: "some",
      margin: "0px 0px 200% 0px",
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
        // Sampled from the supplied plate: a pale lavender.
        "bg-[#efeafe] text-[#15002e]",
        "py-16 sm:py-20 lg:py-24",
      )}
    >
      {/* ========================= Background ========================= */}
      {/*
        The plate's facets: broad angled planes a shade lighter and darker
        than the ground, strongest at the corners. Gradients rather than an
        image — they are flat planes, and they scale to any width.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <span className="absolute -top-[26%] -left-[14%] h-[34rem] w-[40rem] -rotate-[24deg] bg-[linear-gradient(120deg,#e2d8fb,transparent_72%)] opacity-80 blur-2xl" />
        <span className="absolute -right-[12%] -bottom-[30%] h-[32rem] w-[38rem] rotate-[16deg] bg-[linear-gradient(300deg,#ded2fb,transparent_74%)] opacity-75 blur-2xl" />
        {/* A faint warm lift low on the left, as the plate carries. */}
        <span className="absolute -bottom-[24%] left-[6%] size-[24rem] rounded-full bg-[#f6ecfb] opacity-70 blur-3xl" />
      </div>

      <Container width="hero">
        <div
          className={cn(
            "grid gap-12",
            // Measured from the design: the copy holds the left ~35% and the
            // two cards run 37.3-97.8% of the frame.
            "xl:grid-cols-[minmax(0,0.62fr)_minmax(0,1.38fr)] xl:items-center xl:gap-12",
            // Grid items default to `min-width: auto`; without this a long
            // card title can force its column past the container.
            "[&>*]:min-w-0",
          )}
        >
          {/* ========================= Statement ======================= */}
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "font-display text-[0.9375rem] font-bold tracking-[0.16em] uppercase",
                "text-[#6201ff]",
              )}
            >
              {coaching.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.06)}
              className={cn(
                "mt-5 font-display font-bold tracking-[-0.035em]",
                "leading-[1.05] text-balance text-[#15002e]",
                // Measured from the design at ~54px on a 1440 frame.
                "text-[2.125rem] sm:text-[2.625rem] xl:text-[3.25rem]",
              )}
            >
              {coaching.headline}
            </motion.h2>

            <motion.p
              {...rise(0.12)}
              className={cn(
                "mt-5 max-w-[26rem] leading-relaxed text-pretty",
                "text-[1.0625rem] text-[#562d95] sm:text-[1.125rem]",
              )}
            >
              {coaching.description}
            </motion.p>

            {/* ------------------------ Benefits --------------------- */}
            <ul className="mt-10 space-y-6">
              {coaching.benefits.map((benefit, index) => {
                const Glyph = GLYPHS[benefit.icon];
                return (
                  <motion.li
                    key={benefit.title}
                    {...rise(0.18 + index * 0.08)}
                    className="group/benefit flex items-start gap-5"
                  >
                    {/* The design sets each mark on a pale lavender disc. */}
                    <span
                      className={cn(
                        "grid size-12 shrink-0 place-items-center rounded-full",
                        "bg-[#e7dfff] text-[#4b1fb5]",
                        "duration-normal transition-[scale,background-color] ease-out",
                        "will-change-[scale] group-hover/benefit:scale-105",
                        "group-hover/benefit:bg-[#dcd0ff]",
                      )}
                    >
                      <Glyph className="size-6" />
                    </span>
                    <div className="min-w-0 pt-1.5">
                      <p className="font-display text-[1.0625rem] font-bold tracking-[-0.01em] text-[#260170]">
                        {benefit.title}
                      </p>
                      <p className="mt-1 text-[1rem] leading-relaxed text-pretty text-[#573095]">
                        {benefit.body}
                      </p>
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          </div>

          {/* =========================== Cards ========================= */}
          <ul
            className={cn(
              "grid gap-5 sm:grid-cols-2",
              // Grid items default to `min-width: auto`.
              "[&>*]:min-w-0",
            )}
          >
            {coaching.cards.map((card, index) => (
              <motion.li
                key={card.number}
                initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{
                  once: true,
                  amount: 0.1,
                  margin: "0px 0px 200% 0px",
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.1 + index * 0.14,
                  ease: easeOut,
                }}
                className={cn(
                  "group/card flex flex-col rounded-[1.5rem] p-4",
                  "bg-[#f4f2fe] ring-1 ring-white/70",
                  "shadow-[0_1.5rem_3rem_-1.5rem_rgb(40,10,90,0.35)]",
                  "duration-normal transition-[translate,box-shadow] ease-out",
                  "will-change-[translate] hover:-translate-y-1",
                  "hover:shadow-[0_2.25rem_4rem_-1.5rem_rgb(40,10,90,0.45)]",
                )}
              >
                {/* --------------------- Header -------------------- */}
                <p className="flex items-baseline gap-3 px-1 pt-1 pb-3.5">
                  <span className="font-display text-[1.125rem] font-bold text-[#a46cff]">
                    {card.number}
                  </span>
                  <span className="font-display text-[1.1875rem] font-bold tracking-[-0.015em] text-[#1b0051]">
                    {card.title}
                    {/*
                      The product name carries the accent the design gives it,
                      on the first card only.
                    */}
                    {"titleAccent" in card && card.titleAccent ? (
                      <span className="text-[#6201ff]">{card.titleAccent}</span>
                    ) : null}
                  </span>
                </p>

                {/* ---------------------- Photo -------------------- */}
                <div className="relative overflow-hidden rounded-[1.125rem]">
                  <Image
                    src={card.photo.src}
                    alt={card.photo.alt}
                    width={760}
                    height={899}
                    sizes="(min-width: 1280px) 30vw, (min-width: 640px) 44vw, 90vw"
                    className={cn(
                      "h-full w-full object-cover",
                      /*
                        The design crops both photographs to one tall window.
                        4/5 sits between the two sources' own ratios (0.77 and
                        0.85), so neither loses much: a taller window would
                        throw away the sides of the first.
                      */
                      "aspect-[4/5]",
                      // Card 1's subject sits left of centre in its source.
                      index === 0 ? "object-[50%_top]" : "object-center",
                      "duration-slow transition-[scale] ease-out",
                      "will-change-[scale] group-hover/card:scale-[1.03]",
                    )}
                  />

                  {/*
                    The coaching panel, on the first card only. Drawn over the
                    photograph rather than baked into it, so the waveform can
                    animate and the crop stays free of chrome.
                  */}
                  {"panel" in card && card.panel ? (
                    <Uncopyable>
                      <motion.div
                        initial={
                          reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }
                        }
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "0px 0px 200% 0px" }}
                        transition={{
                          duration: 0.6,
                          delay: 0.5,
                          ease: easeOut,
                        }}
                        /*
                          Flush to the photograph's lower edge and full width:
                          the source's own panel is baked into that region, so
                          the drawn one must COVER it, not float inside it.
                          Anything less and the baked panel shows through.
                        */
                        className="absolute inset-x-0 top-[60%] -bottom-px"
                      >
                        <CoachingPanel
                          panel={card.panel}
                          reduce={Boolean(reduce)}
                        />
                      </motion.div>
                    </Uncopyable>
                  ) : null}
                </div>

                {/* --------------------- Caption ------------------- */}
                <p
                  className={cn(
                    "mt-auto px-2 pt-4 pb-1 text-center",
                    "text-[1.0625rem] font-medium text-[#36068e]",
                  )}
                >
                  {card.caption}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

/* ========================================================================== */
/* COACHING PANEL                                                             */
/* ========================================================================== */

/**
 * The panel over the first card's photograph.
 *
 * Drawn rather than left baked into the image: the waveform animates, which
 * is what makes the card read as a session in progress, and keeping it out of
 * the crop means the photograph carries no text of its own.
 */
function CoachingPanel({
  panel,
  reduce,
}: {
  panel: {
    readonly brand: string;
    readonly title: string;
    readonly feedbackLabel: string;
    readonly chips: readonly string[];
  };
  reduce: boolean;
}) {
  return (
    <div
      className={cn(
        "h-full rounded-t-[1rem] bg-white p-3.5",
        "shadow-[0_-0.5rem_1.5rem_-0.5rem_rgb(30,10,70,0.35)]",
      )}
    >
      {/* --------------------------- Header ------------------------- */}
      <p className="flex items-center gap-2 text-[0.8125rem]">
        <span className="font-bold text-[#6201ff]">{panel.brand}</span>
        <span aria-hidden="true" className="text-[#a08fc4]">
          ·
        </span>
        <span className="text-[#3b2d5e]">{panel.title}</span>
      </p>

      {/* ------------------------ Avatar + wave --------------------- */}
      <div className="mt-2.5 flex items-center gap-3">
        {/*
          The design's small illustrated face. Drawn: it is a flat cartoon
          mark on a lavender disc, not a photograph.
        */}
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#ddd0ff]">
          <FaceIcon className="size-7" />
        </span>
        <PanelWave reduce={reduce} />
      </div>

      <p className="mt-2.5 text-[0.75rem] font-medium text-[#3b2d5e]">
        {panel.feedbackLabel}
      </p>

      {/* --------------------------- Chips -------------------------- */}
      <ul className="mt-1.5 flex flex-wrap gap-1.5">
        {panel.chips.map((chip) => (
          <li
            key={chip}
            className={cn(
              "rounded-full bg-[#ece4ff] px-2.5 py-1",
              "text-[0.6875rem] font-medium text-[#4b1fb5]",
            )}
          >
            {chip}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * The panel's waveform.
 *
 * A fixed pattern rather than `Math.random()` — random values differ between
 * the server and client renders and throw a hydration mismatch, which this
 * build has hit before.
 */
const WAVE = [
  30, 52, 38, 70, 46, 88, 58, 96, 64, 80, 44, 92, 54, 74, 40, 62, 34, 56, 28,
  48, 36, 68, 42, 84, 50, 72, 32, 58, 26, 44,
] as const;

function PanelWave({ reduce }: { reduce: boolean }) {
  return (
    <span
      aria-hidden="true"
      className="flex h-8 min-w-0 flex-1 items-center gap-[2px] overflow-hidden"
    >
      {WAVE.map((height, index) => (
        <motion.span
          key={index}
          className="w-[2.5px] shrink-0 rounded-full bg-[#7b00ff]"
          style={{ height: `${height}%` }}
          animate={reduce ? undefined : { scaleY: [1, 0.5, 1] }}
          transition={{
            duration: 1.1,
            repeat: Infinity,
            ease: "easeInOut",
            delay: (index % 6) * 0.1,
          }}
        />
      ))}
    </span>
  );
}

/* ========================================================================== */
/* ICONS                                                                      */
/* ========================================================================== */

/**
 * The panel's small illustrated face.
 *
 * Flat shapes rather than line art: the design's mark is a filled cartoon
 * avatar, and an outlined face at 28px reads as a generic user glyph.
 */
function FaceIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      {/* Face, drawn first so the hair sits on top of its crown. */}
      <path
        d="M6.4 10.4a5.6 5.6 0 0 1 11.2 0v3a5.6 5.6 0 0 1-11.2 0Z"
        fill="#f7cda2"
      />
      {/*
        Hair as a shallow cap, not a helmet: it must clear the brow or the
        mark reads as a hat rather than a face.
      */}
      <path
        d="M6.3 10.5a5.7 5.7 0 0 1 11.4 0c-1.5-1.1-3.2-1.7-5.7-1.7s-4.2.6-5.7 1.7Z"
        fill="#2f1b6b"
      />
      {/* Shoulders. */}
      <path d="M5 21.8a7 7 0 0 1 14 0Z" fill="#4b1fb5" />
      {/* Eyes and smile. */}
      <g fill="#2f1b6b">
        <circle cx="9.9" cy="12.6" r="0.8" />
        <circle cx="14.1" cy="12.6" r="0.8" />
      </g>
      <path
        d="M10.4 15.4a2.3 2.3 0 0 0 3.2 0"
        fill="none"
        stroke="#2f1b6b"
        strokeWidth={1.1}
        strokeLinecap="round"
      />
    </svg>
  );
}
