"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { Uncopyable } from "@/components/ui/Uncopyable";
import { lurnyEvents } from "@/content/lurny-events";
import { cn } from "@/lib/utils";

import { ArrowIcon, BadgeIcon, PlusIcon } from "./LurnyEventsIcons";

/**
 * LURNYEVENTS LIFECYCLE
 * ---------------------------------------------------------------------------
 * Section 3: a header, then three stage cards — Prepare, Deliver, Continue —
 * joined by dashed connectors.
 *
 * NOTHING FROM THE ASSET PACK SHIPS HERE
 * Three separate reasons, one per asset:
 *
 *   03/04/05_*_card.png are the three cards as flat 500x423 bitmaps with every
 *   label, chip and figure painted in. Shipping them would bake product copy
 *   into rasters — unselectable, unsearchable, blurry when scaled, impossible
 *   to translate and unable to animate. Rebuilt in markup below.
 *
 *   01_background_without_purple_circle.png is 2000x975 of near-white wash:
 *   sampled corner to corner it moves only from #f8f6f6 to #f2eff4, with no
 *   texture or line work. A gradient that large is what WebP bands worst, and
 *   CSS reproduces it exactly for no bytes.
 *
 *   02_full_purple_circle.png is a single flat #ba9df6 at ~25% alpha with a
 *   soft falloff — a radial gradient wearing a PNG costume. Also drawn.
 *
 * THE VIGNETTES ARE THREE SHAPES, NOT ONE
 * Prepare is a dark setup panel with chips and a capacity bar; Deliver is a
 * live check-in with a dial; Continue is a learning record. Forcing one
 * component to express all three would take more props than it saved, so each
 * is its own small component and the stage card only places them.
 *
 * MOTION
 * The cards rise and settle in sequence, the dashed connectors draw themselves
 * between them once the cards have landed, and each vignette's meter fills
 * last — so the eye is walked left to right through the lifecycle rather than
 * shown three finished cards at once. Hovering a card lifts it slightly. All
 * of it collapses to a plain fade under prefers-reduced-motion.
 *
 * THE CARDS ARE UNCOPYABLE
 * Asked for directly, and right anyway: the vignettes are imitation product UI
 * carrying invented figures. The stage copy above each one is real content and
 * stays selectable — only the vignette panels are wrapped.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { lifecycle } = lurnyEvents;

/** Accent per stage, sampled from the design. */
const TONES = {
  violet: { chip: "bg-[#ede4fd] text-[#6d4bc4]" },
  amber: { chip: "bg-[#fdf0d5] text-[#9a7018]" },
  green: { chip: "bg-[#d9f2e5] text-[#2c7a5a]" },
} as const;

type Stage = (typeof lifecycle.stages)[number];

export function LurnyEventsLifecycle() {
  const reduce = useReducedMotion() ?? false;

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
    <section className="relative isolate overflow-hidden bg-[#f7f5f6] py-section-lg">
      {/* The pale wash and the lilac bloom in the lower right. Both drawn —
          see the note above. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: [
            "radial-gradient(38rem 38rem at 88% 92%, rgb(186 157 246 / 0.30), transparent 70%)",
            "linear-gradient(135deg, #f9f7f4 0%, #f5f3f6 55%, #f2eff4 100%)",
          ].join(","),
        }}
      />

      <Container width="wide">
        {/* ============================ Header ======================== */}
        <motion.p
          {...rise(0)}
          className={cn(
            "font-mono text-[0.6875rem] font-bold uppercase",
            "tracking-[0.18em] text-[#7c3aed] sm:text-xs",
          )}
        >
          {lifecycle.eyebrow}
        </motion.p>

        <div
          className={cn(
            "mt-5 grid gap-8",
            "lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-start lg:gap-16",
          )}
        >
          <motion.h2
            {...rise(0.08)}
            className={cn(
              "font-display font-bold tracking-[-0.03em]",
              "leading-[1.1] text-[#1b1630]",
              "text-[2rem] sm:text-[2.5rem] xl:text-[2.875rem]",
            )}
          >
            {lifecycle.headline.map((line) => (
              <span key={line} className="inline lg:block">
                {line}{" "}
              </span>
            ))}
          </motion.h2>

          <motion.p
            {...rise(0.16)}
            className={cn(
              "max-w-[34rem] leading-relaxed text-pretty",
              "text-[1rem] text-[#4a4a5c] lg:pt-2",
            )}
          >
            {lifecycle.description}
          </motion.p>
        </div>

        {/* ============================ Stages ======================== */}
        {/* `relative` so the connectors can be drawn across the row. */}
        <div className="relative mt-14 sm:mt-16">
          {/* The dashed connectors, one per gutter. Each is its own small SVG
              placed in the gap rather than one wide overlay: a single
              stretched viewBox would skew the arcs into steep hooks, since the
              row is far wider than it is tall. Drawn only on lg — below that
              the cards stack and a horizontal connector points at nothing. */}
          {[
            { left: "left-[calc(33.33%-2.5rem)]", d: "M 2 30 C 14 6, 34 6, 46 26" },
            { left: "left-[calc(66.66%-2.5rem)]", d: "M 2 26 C 14 46, 34 46, 46 22" },
          ].map((arc, index) => (
            <svg
              key={arc.d}
              aria-hidden="true"
              viewBox="0 0 48 52"
              fill="none"
              className={cn(
                "pointer-events-none absolute top-[18%] z-10 hidden",
                "h-14 w-20 lg:block",
                arc.left,
              )}
            >
              {/* The dash pattern is set directly rather than via
                  `pathLength`: Motion animates that by driving
                  strokeDasharray itself, which overwrites the dashes and
                  leaves a solid arc. Animating opacity plus the dash offset
                  keeps the dashes and still reads as the line drawing in. */}
              <motion.path
                d={arc.d}
                stroke="#b79bf0"
                strokeWidth="1.6"
                strokeDasharray="4 5"
                strokeLinecap="round"
                initial={
                  reduce
                    ? { opacity: 1, strokeDashoffset: 0 }
                    : { opacity: 0, strokeDashoffset: 54 }
                }
                whileInView={{ opacity: 1, strokeDashoffset: 0 }}
                viewport={{ once: true, amount: "some" }}
                transition={{
                  duration: 0.9,
                  delay: 0.85 + index * 0.18,
                  ease: easeOut,
                }}
              />
            </svg>
          ))}

          <ul className="grid gap-6 lg:grid-cols-3 lg:gap-7">
            {lifecycle.stages.map((stage, index) => (
              <motion.li
                key={stage.number}
                initial={
                  reduce
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 26, scale: 0.985 }
                }
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: "some" }}
                transition={{
                  duration: 0.65,
                  delay: 0.25 + index * 0.14,
                  ease: easeOut,
                }}
                /* A small lift on hover, so the row feels responsive without
                   the cards moving far enough to disturb the connectors. */
                whileHover={reduce ? undefined : { y: -6 }}
                className={cn(
                  "rounded-2xl bg-white p-7",
                  "shadow-[0_18px_50px_-28px_rgb(27_22_48/0.4)]",
                  "transition-shadow duration-300",
                  "hover:shadow-[0_28px_70px_-30px_rgb(27_22_48/0.5)]",
                )}
              >
                {/* ------------------ Stage copy ----------------- */}
                {/* Real content, so it stays selectable. */}
                <span
                  className={cn(
                    "inline-flex items-center justify-center rounded-full",
                    "px-3 py-1 font-mono text-[0.6875rem] font-bold",
                    TONES[stage.tone].chip,
                  )}
                >
                  {stage.number}
                </span>

                <h3 className="mt-5 font-display text-[1.25rem] font-bold tracking-[-0.01em] text-[#1b1630]">
                  {stage.title}
                </h3>

                <p className="mt-2 text-[0.9375rem] leading-relaxed text-[#5a5a6e]">
                  {stage.description}
                </p>

                {/* -------------------- Vignette ----------------- */}
                {/* Imitation UI with invented figures: uncopyable, and
                    aria-hidden so it is not read out as fact. */}
                <Uncopyable aria-hidden className="mt-6 block @container">
                  <Vignette stage={stage} reduce={reduce} index={index} />
                </Uncopyable>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* ============================= CTA ========================== */}
        <motion.div {...rise(0.45)}>
          <Link
            href={lifecycle.cta.href}
            className={cn(
              "group mt-12 inline-flex items-center gap-4",
              "text-[0.9375rem] font-semibold text-[#1b1630]",
              "transition-colors hover:text-[#7c3aed]",
            )}
          >
            {lifecycle.cta.label}
            <span
              aria-hidden="true"
              className={cn(
                "block h-px w-10 bg-[#7c3aed]",
                "transition-[width] duration-300 group-hover:w-14",
              )}
            />
            <ArrowIcon className="-ml-6 size-4 text-[#7c3aed] transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}

/* ========================================================================== */
/* VIGNETTES                                                                  */
/* ========================================================================== */

/** Dispatches to the panel this stage's design calls for. */
function Vignette({
  stage,
  reduce,
  index,
}: {
  stage: Stage;
  reduce: boolean;
  index: number;
}) {
  const delay = 0.55 + index * 0.14;
  const { vignette } = stage;

  if (vignette.kind === "setup") {
    return <SetupPanel data={vignette} reduce={reduce} delay={delay} />;
  }

  if (vignette.kind === "live") {
    return <LivePanel data={vignette} reduce={reduce} delay={delay} />;
  }

  return <RecordPanel data={vignette} />;
}

/** Prepare — a dark event-setup panel with chips and a capacity bar. */
function SetupPanel({
  data,
  reduce,
  delay,
}: {
  data: Extract<Stage["vignette"], { kind: "setup" }>;
  reduce: boolean;
  delay: number;
}) {
  const fill = (data.registered / data.capacity) * 100;

  return (
    <div className="rounded-xl bg-[#221d33] p-5">
      <span className="block font-mono text-[0.625rem] tracking-[0.14em] text-white/45 uppercase">
        {data.label}
      </span>

      <span className="mt-2 block text-[0.9375rem] font-bold text-white">
        {data.title}
      </span>

      <span className="mt-3 flex flex-wrap gap-2">
        {data.chips.map((chip) => (
          <span
            key={chip}
            className="rounded-md bg-white/8 px-2.5 py-1.5 text-[0.75rem] text-white/80"
          >
            {chip}
          </span>
        ))}
      </span>

      <span className="mt-4 flex items-center gap-3">
        <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/12">
          <motion.span
            className="block h-full rounded-full bg-[#a855f7]"
            initial={reduce ? { width: `${fill}%` } : { width: 0 }}
            whileInView={{ width: `${fill}%` }}
            viewport={{ once: true, amount: "some" }}
            transition={{ duration: 0.9, delay, ease: easeOut }}
          />
        </span>
        <span className="shrink-0 text-[0.6875rem] text-white/55">
          {data.note}
        </span>
      </span>
    </div>
  );
}

/** Deliver — a live check-in, the dial counting up as it comes into view. */
function LivePanel({
  data,
  reduce,
  delay,
}: {
  data: Extract<Stage["vignette"], { kind: "live" }>;
  reduce: boolean;
  delay: number;
}) {
  const fill = (data.present / data.total) * 100;

  return (
    <div className="rounded-xl bg-[#fdf4dd] p-5">
      <span className="block font-mono text-[0.625rem] tracking-[0.14em] text-[#9a7018] uppercase">
        {data.label}
      </span>

      <span className="mt-3 flex items-center gap-4">
        {/* The check-in dial. It breathes slowly, so the panel reads as a
            session actually in progress rather than a still. */}
        <motion.span
          className={cn(
            "grid size-14 shrink-0 place-items-center rounded-full",
            "bg-[#f5c518] text-[#1a1035]",
          )}
          animate={
            reduce
              ? undefined
              : { scale: [1, 1.06, 1], boxShadow: [
                  "0 0 0 0 rgb(245 197 24 / 0.45)",
                  "0 0 0 10px rgb(245 197 24 / 0)",
                  "0 0 0 0 rgb(245 197 24 / 0)",
                ] }
          }
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <PlusIcon className="size-6" />
        </motion.span>

        <span className="min-w-0 flex-1">
          <span className="block text-[0.9375rem] font-bold text-[#1b1630]">
            {data.title}
          </span>
          <span className="mt-0.5 block text-[0.75rem] text-[#6b5a30]">
            {data.note}
          </span>

          <span className="mt-2.5 block h-1.5 w-full overflow-hidden rounded-full bg-[#e8d9a8]">
            <motion.span
              className="block h-full rounded-full bg-[#f0b429]"
              initial={reduce ? { width: `${fill}%` } : { width: 0 }}
              whileInView={{ width: `${fill}%` }}
              viewport={{ once: true, amount: "some" }}
              transition={{ duration: 0.9, delay, ease: easeOut }}
            />
          </span>
        </span>
      </span>
    </div>
  );
}

/** Continue — the learning record, with the certificate line under a rule. */
function RecordPanel({
  data,
}: {
  data: Extract<Stage["vignette"], { kind: "record" }>;
}) {
  return (
    <div className="rounded-xl bg-[#e6f4ec] p-5">
      <span className="flex items-center gap-3.5">
        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#2fae7e] text-white">
          <BadgeIcon className="size-5" />
        </span>
        <span className="min-w-0">
          <span className="block text-[0.9375rem] font-bold text-[#1b1630]">
            {data.title}
          </span>
          <span className="mt-0.5 block text-[0.75rem] text-[#3f6b57]">
            {data.note}
          </span>
        </span>
      </span>

      <span className="mt-4 block border-t border-[#1b1630]/10 pt-4 text-[0.875rem] font-bold text-[#1b1630]">
        {data.footer}
      </span>
    </div>
  );
}
