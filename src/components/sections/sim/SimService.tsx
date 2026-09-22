"use client";

import type { ComponentType, SVGProps } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { Uncopyable } from "@/components/ui/Uncopyable";
import { sim } from "@/content/sim";
import { cn } from "@/lib/utils";

import { EarIcon, MicIcon, RepeatIcon, SignpostIcon } from "./SimIcons";

/**
 * LURNYSIM — CUSTOMER SERVICE AND DE-ESCALATION
 * ---------------------------------------------------------------------------
 * Section 3: the hero's arrangement mirrored — photograph and panels on the
 * left, copy on the right, on a faceted purple ground.
 *
 * ONLY THE PHOTOGRAPH AND THE CALLER'S AVATAR SHIP — 58KB against the 5.5MB
 * the pack supplies for this section. Everything else is drawn:
 *
 *   - The ground is a flat #2f2949 with broad diagonal facets. Brightening
 *     the plate shows them as soft angled bands, so they are gradients and
 *     the 1128KB plate is not used.
 *   - Both cards are interface — a header, chat bubbles, a waveform, three
 *     progress bars — so the 2.1MB of card PNGs buy nothing markup does not.
 *   - The three benefit marks render at 34px; the pack ships them at 1254px.
 *
 * THE PANELS ARE ILLUSTRATIVE, not a recording of a session: `Uncopyable` and
 * aria-hidden throughout, and the feedback card keeps the design's
 * "Illustrative practice scores" footnote.
 */

const { service } = sim;

/** Motion's string easings are not typed, so the cubic curve is spelled out. */
const easeOut = [0.16, 1, 0.3, 1] as const;

const GLYPHS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  ear: EarIcon,
  signpost: SignpostIcon,
  repeat: RepeatIcon,
};

export function SimService() {
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
        // Sampled from the design: a deep, slightly blue purple.
        "bg-[#2f2949] text-white",
        "py-16 sm:py-20 lg:py-24",
      )}
    >
      {/* ========================= Background ========================= */}
      {/*
        The design's faceted ground. Brightened, the plate resolves into broad
        diagonal bands running lower-left to upper-right, lighter towards the
        top-right corner — so they are angled gradients rather than an image.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <span className="absolute inset-0 bg-[linear-gradient(118deg,#241f3c_0%,#2f2949_42%,#3a3157_70%,#4a3c74_100%)]" />
        {/* The two brighter facets the plate throws across the corners. */}
        <span className="absolute -top-[18%] -right-[10%] h-[30rem] w-[38rem] -rotate-[26deg] bg-[linear-gradient(90deg,transparent,#6b4fa8/0.5)] opacity-45 blur-2xl" />
        <span className="absolute -bottom-[22%] -left-[8%] h-[26rem] w-[34rem] -rotate-[22deg] bg-[linear-gradient(90deg,#5b4494/0.45,transparent)] opacity-40 blur-2xl" />
      </div>

      {/* ========================== Photo ============================= */}
      {/*
        The photograph fills the left of the section, bled to its edge. Hidden
        below `xl`: at narrower widths the panels stack over the full width
        and the photograph would sit behind text rather than beside it.

        The BAND is masked, not the image — the tint passes are siblings of
        the photograph, so fading only the image would leave them painting a
        hard edge of their own.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 -z-10 hidden w-[58%] xl:block"
        style={{
          maskImage:
            "linear-gradient(to left, transparent 0%, rgb(0 0 0 / 0.3) 16%, rgb(0 0 0 / 0.85) 40%, #000 62%)",
        }}
      >
        <Image
          src={service.photo.src}
          alt=""
          fill
          sizes="58vw"
          /*
            Anchored left of centre and high: `cover` on a band this tall
            crops into her face if centred, where the design keeps her upper
            body and the office behind her in frame.
          */
          className="object-cover object-[34%_18%]"
        />
        {/*
          A violet wash, so the photograph sits inside the ground rather than
          reading as a pasted panel. `color` carries the hue without
          flattening the modelling; the soft-light pass deepens the shadows
          the hue pass alone leaves grey.
        */}
        <span className="absolute inset-0 bg-[#5b3fa8] opacity-55 mix-blend-color" />
        <span className="absolute inset-0 bg-[#2a1f52] opacity-40 mix-blend-soft-light" />
      </div>

      <Container width="hero">
        <div
          className={cn(
            "grid items-center gap-12",
            /*
              Measured from the design: the panels hold the left and the copy
              runs 57.9-95.8% of the frame. From `xl` the panel column is a
              spacer that only reserves height — the panels themselves are
              pinned to the section below, because the practice card starts at
              16.3% of the FRAME, outside the container's gutter.
            */
            "xl:grid-cols-[minmax(0,1.18fr)_minmax(0,0.82fr)] xl:gap-8",
            // Grid items default to `min-width: auto`; without this a long
            // benefit line can force its column past the container.
            "[&>*]:min-w-0",
          )}
        >
          {/* ========================== Panels ========================= */}
          {/*
            In flow up to `xl`, stacked above the copy. From `xl` the bled
            band below the container draws the panels instead — but this copy
            STAYS IN THE LAYOUT as an invisible spacer, because the band is
            absolutely positioned and so contributes no height.
          */}
          <div aria-hidden="true">
            <div className="xl:hidden">
              <PanelGroup reduce={Boolean(reduce)} />
            </div>
            <div className="hidden xl:invisible xl:block">
              <div className="w-[88.8%]">
                <PracticePanel reduce />
              </div>
            </div>
          </div>

          {/* =========================== Copy ========================== */}
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "font-display text-[0.9375rem] font-bold tracking-[0.16em] uppercase",
                "text-[#b77ffb]",
              )}
            >
              {service.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.06)}
              className={cn(
                "mt-5 font-display font-bold tracking-[-0.035em]",
                "leading-[1.04] text-balance text-white",
                // Measured from the design at ~62px on a 1440 frame.
                "text-[2.25rem] sm:text-[2.875rem] xl:text-[3.5rem]",
              )}
            >
              {service.headline.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </motion.h2>

            <motion.p
              {...rise(0.12)}
              className={cn(
                "mt-5 max-w-[30rem] leading-relaxed text-pretty",
                "text-[1.0625rem] text-[#c2c5e8] sm:text-[1.125rem]",
              )}
            >
              {service.description}
            </motion.p>

            {/* ------------------------ Benefits --------------------- */}
            <ul className="mt-9 space-y-7">
              {service.benefits.map((benefit, index) => {
                const Glyph = GLYPHS[benefit.icon];
                return (
                  <motion.li
                    key={benefit.title}
                    {...rise(0.18 + index * 0.08)}
                    className="group/benefit flex items-start gap-5"
                  >
                    <Glyph
                      className={cn(
                        "mt-0.5 size-9 shrink-0 text-[#c585fd]",
                        "duration-normal transition-[scale] ease-out",
                        "will-change-[scale] group-hover/benefit:scale-110",
                      )}
                    />
                    <div className="min-w-0">
                      <p className="font-display text-[1.125rem] font-bold tracking-[-0.01em] text-white">
                        {benefit.title}
                      </p>
                      <p className="mt-1 text-[1rem] leading-relaxed text-pretty text-[#b2b2d3]">
                        {benefit.body}
                      </p>
                    </div>
                  </motion.li>
                );
              })}
            </ul>

            {/* -------------------------- CTA ------------------------ */}
            <motion.div {...rise(0.44)} className="mt-10">
              <Link
                href={service.action.href}
                className={cn(
                  "group inline-flex items-center justify-center gap-3",
                  "rounded-xl bg-[#8e14ff] px-7 py-4",
                  "text-[1.0625rem] font-bold text-white",
                  "duration-normal transition-[translate,background-color,box-shadow] ease-out",
                  "will-change-[translate]",
                  "hover:-translate-y-0.5 hover:bg-[#9c31ff]",
                  "hover:shadow-[0_1rem_2rem_-0.75rem_rgb(142_20_255/0.85)]",
                  "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white",
                )}
              >
                {service.action.label}
                <ArrowIcon
                  className={cn(
                    "size-4 shrink-0",
                    "duration-normal transition-[translate] ease-out",
                    "group-hover:translate-x-1",
                  )}
                />
              </Link>
            </motion.div>
          </div>
        </div>
      </Container>

      {/* ====================== Panels (bled) ====================== */}
      {/*
        From `xl` the panels leave the container and are pinned to the
        section: the practice card starts at 16.3% of the FRAME, which is
        outside the container's gutter and so unreachable by a grid cell.
      */}
      <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-[58.5%] items-center xl:flex">
        <div className="w-full pl-[27.9%]">
          <PanelGroup reduce={Boolean(reduce)} bled />
        </div>
      </div>
    </section>
  );
}

/* ========================================================================== */
/* PANEL GROUP                                                                */
/* ========================================================================== */

/**
 * The practice panel with the feedback card overlapping its lower right.
 *
 * Rendered twice — in flow below `xl`, bled to the section's left edge from
 * `xl` up. `bled` switches on the overlap; in the stacked copy the feedback
 * card sits under the panel, where an overlap would bury the waveform.
 *
 * Measured off the design, both against the practice panel's own box:
 *   - the feedback card is 47% of its width,
 *   - overhangs its right edge by 13%,
 *   - and drops 19% of its height below the foot.
 */
function PanelGroup({ reduce, bled }: { reduce: boolean; bled?: boolean }) {
  return (
    <Uncopyable>
      <motion.div
        initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12, margin: "0px 0px 200% 0px" }}
        transition={{ duration: 0.75, ease: easeOut }}
        className={cn("relative", bled && "w-[88.8%]")}
      >
        <PracticePanel reduce={reduce} />

        <motion.div
          initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px 200% 0px" }}
          transition={{ duration: 0.6, delay: 0.35, ease: easeOut }}
          className={cn(
            !bled && "mt-4",
            /*
              Anchored from the TOP, not the bottom: the design puts the
              card's top 65% down the panel, and a bottom anchor lets a
              taller-than-design card ride up over the response bubble.
            */
            bled && "absolute top-[65%] right-[-13%] w-[47%]",
          )}
        >
          <FeedbackCard reduce={reduce} />
        </motion.div>
      </motion.div>
    </Uncopyable>
  );
}

/* ========================================================================== */
/* PRACTICE PANEL                                                             */
/* ========================================================================== */

/**
 * The customer service practice panel.
 *
 * Drawn rather than shipped: a header with a mode pill, two chat bubbles and
 * a capture row — all interface, so the 1384KB PNG the pack supplies buys
 * nothing markup does not.
 */
function PracticePanel({ reduce }: { reduce: boolean }) {
  const { panel } = service;

  return (
    <div
      className={cn(
        "rounded-[1.5rem] bg-[#f7f4fd] p-5 sm:p-6",
        "ring-1 ring-white/20",
        "shadow-[0_2.5rem_5rem_-1.5rem_rgb(15,8,40,0.8)]",
      )}
    >
      {/* --------------------------- Header ------------------------- */}
      <div className="flex flex-wrap items-center gap-4">
        <p className="font-display text-[1.25rem] font-bold tracking-[-0.015em] text-[#1e1240]">
          {panel.title}
        </p>

        {/* The mode pill: a small waveform mark and the label. */}
        <span
          className={cn(
            "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5",
            "bg-[#e9dcfd] text-[0.875rem] font-bold text-[#7300ff]",
          )}
        >
          <PillWaveIcon className="size-4 shrink-0" />
          {panel.mode}
        </span>
      </div>

      {/* ------------------------ Transcript ------------------------ */}
      <div className="mt-5 rounded-2xl bg-white p-4 ring-1 ring-[#1e1240]/6 sm:p-5">
        <ul className="space-y-5">
          {panel.turns.map((turn, index) => {
            const you = turn.speaker === "you";
            return (
              <motion.li
                key={turn.text}
                initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px 200% 0px" }}
                /*
                  In order, a beat apart — the two read as a conversation
                  arriving rather than a static pair.
                */
                transition={{
                  duration: 0.5,
                  delay: 0.35 + index * 0.35,
                  ease: easeOut,
                }}
                className="flex items-start gap-4"
              >
                {/*
                  The caller's face, where the design shows one. The response
                  turn has no avatar, so the bubble is indented to that same
                  gutter instead — which is what lines the two up.
                */}
                {"avatar" in turn && turn.avatar ? (
                  <Image
                    src={turn.avatar.src}
                    alt={turn.avatar.alt}
                    width={190}
                    height={190}
                    sizes="56px"
                    className="size-14 shrink-0 rounded-full"
                  />
                ) : (
                  <span aria-hidden="true" className="size-14 shrink-0" />
                )}

                <span className="min-w-0 flex-1">
                  <span className="block text-[0.875rem] text-[#6b5a8d]">
                    {turn.label}
                  </span>
                  <span
                    className={cn(
                      "mt-1.5 block rounded-2xl px-4 py-3",
                      "text-[1rem] leading-snug",
                      you
                        ? "bg-[#e3d4fb] text-[#231145]"
                        : "bg-[#f1ecfa] text-[#231145]",
                    )}
                  >
                    {turn.text}
                  </span>
                </span>
              </motion.li>
            );
          })}
        </ul>
      </div>

      {/* -------------------------- Capture ------------------------- */}
      <div className="mt-5 flex items-center gap-4">
        <span className="grid size-12 shrink-0 place-items-center rounded-full bg-[#7b00ff] shadow-[0_0.5rem_1rem_-0.35rem_rgb(123_0_255/0.7)]">
          <MicIcon className="size-6 text-white" />
        </span>
        <Waveform reduce={reduce} />
      </div>
    </div>
  );
}

/**
 * The capture row's waveform.
 *
 * Bars rather than a path: the design's waveform is a bar field, and bars can
 * each animate on their own delay, which is what makes the row read as live.
 *
 * The heights are a fixed pattern rather than `Math.random()` — random values
 * differ between the server and client renders and throw a hydration
 * mismatch, which this build has hit before.
 */
const BAR_HEIGHTS = [
  18, 26, 20, 34, 24, 44, 30, 58, 40, 72, 52, 88, 64, 96, 70, 84, 56, 92, 62,
  76, 48, 68, 38, 54, 30, 46, 26, 38, 22, 32, 18, 28, 16, 24, 14, 20, 12, 18,
  10, 16,
] as const;

function Waveform({ reduce }: { reduce: boolean }) {
  return (
    <span
      aria-hidden="true"
      className="flex h-10 min-w-0 flex-1 items-center gap-[2px] overflow-hidden"
    >
      {BAR_HEIGHTS.map((height, index) => (
        <motion.span
          key={index}
          className="w-[3px] shrink-0 rounded-full bg-[#9333ea]"
          style={{ height: `${height}%` }}
          animate={reduce ? undefined : { scaleY: [1, 0.55, 1] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: (index % 7) * 0.09,
          }}
        />
      ))}
    </span>
  );
}

/* ========================================================================== */
/* FEEDBACK CARD                                                              */
/* ========================================================================== */

/**
 * The live feedback card.
 *
 * Three measures, each a bar that is part filled: the violet run is the
 * score, the pale mint remainder the headroom. The bars grow on view, which
 * is what "live feedback" claims — a static bar would make the title a lie.
 */
function FeedbackCard({ reduce }: { reduce: boolean }) {
  const { feedback } = service;

  return (
    <div
      className={cn(
        "rounded-[1.25rem] bg-[#faf8fd] p-5",
        "ring-1 ring-white/25",
        "shadow-[0_2rem_4rem_-1.25rem_rgb(15,8,40,0.85)]",
      )}
    >
      <p className="font-display text-[1.125rem] font-bold tracking-[-0.015em] text-[#1e1240]">
        {feedback.title}
      </p>

      <ul className="mt-4 space-y-3.5">
        {feedback.scores.map((score, index) => (
          <li key={score.label}>
            <div className="flex items-baseline justify-between gap-3">
              <p className="text-[0.8125rem] font-bold text-[#3b2d5e]">
                {score.label}
              </p>
              <p className="shrink-0 text-[0.8125rem] text-[#4b3b6b] tabular-nums">
                {score.value}/10
              </p>
            </div>

            {/* The track is the headroom; the run over it is the score. */}
            <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-[#b8f0d2]">
              <motion.span
                className="block h-full rounded-full bg-[#7b00ff]"
                initial={
                  reduce ? { width: `${score.value * 10}%` } : { width: "0%" }
                }
                whileInView={{ width: `${score.value * 10}%` }}
                viewport={{ once: true, margin: "0px 0px 200% 0px" }}
                transition={{
                  duration: 0.9,
                  delay: 0.5 + index * 0.12,
                  ease: easeOut,
                }}
              />
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-[0.75rem] text-[#6b5a8d]">{feedback.footnote}</p>
    </div>
  );
}

/* ========================================================================== */
/* ICONS                                                                      */
/* ========================================================================== */

/** The small waveform inside the mode pill. */
function PillWaveIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" {...props}>
      <g fill="currentColor">
        <rect x="1" y="6.4" width="1.5" height="3.2" rx="0.75" />
        <rect x="4" y="4.4" width="1.5" height="7.2" rx="0.75" />
        <rect x="7" y="2.2" width="1.5" height="11.6" rx="0.75" />
        <rect x="10" y="4.9" width="1.5" height="6.2" rx="0.75" />
        <rect x="13" y="6.4" width="1.5" height="3.2" rx="0.75" />
      </g>
    </svg>
  );
}

/** The arrow on the CTA. */
function ArrowIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" {...props}>
      <path
        d="M2 8h12M9.5 3.5 14 8l-4.5 4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
