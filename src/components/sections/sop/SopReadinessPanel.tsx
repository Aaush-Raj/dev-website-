"use client";

import { motion, useReducedMotion } from "motion/react";

import { Uncopyable } from "@/components/ui/Uncopyable";
import { sop } from "@/content/sop";
import { cn } from "@/lib/utils";

import {
  ArrowRightIcon,
  ChevronDownIcon,
  TaskCheckIcon,
  frameworkIcons,
  type FrameworkIconKey,
} from "./SopIcons";

/**
 * SOP READINESS PANEL
 * ---------------------------------------------------------------------------
 * The product mockup on the right of section 1: a workspace panel listing six
 * frameworks, with the "your next step" card overlapping its bottom edge.
 *
 * REBUILT IN MARKUP, NOT SHIPPED AS THE SUPPLIED CROPS. The pack provides it as
 * two transparent PNGs (1433x1098 and 2172x724, ~2.6MB together). Drawing it
 * costs no image bytes, stays sharp on every display, lets the tiles animate
 * and hover individually, and keeps its text in the DOM at real sizes rather
 * than as pixels that blur when the column narrows. This follows the
 * convention already set by SenseDashboard, ChatDashboard and PulseDashboard.
 *
 * IT IS DECORATION, SO IT IS HIDDEN AND UNCOPYABLE. `Uncopyable` defaults to
 * `aria-hidden`, which is right here: every word inside is illustrative, and a
 * screen reader announcing six framework names as if they were this
 * organisation's real compliance status would be actively misleading. The
 * hero's own heading and copy carry the meaning.
 *
 * COLOURS ARE MEASURED, NOT EYEBALLED. Every hex below was sampled from
 * `02_Framework_Readiness_Card_Transparent.png` — the tile fills as the modal
 * colour over a band of pure fill, the icon discs from the circle centres, and
 * the text from the darkest decile of each detected text band.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { panel } = sop.hero;

/**
 * Per-framework colour, sampled from the comp. `tile` is the card's ground,
 * `disc` the circle behind the glyph, `glyph` the stroke itself.
 *
 * Keyed by the same ids as the content file, and typed so a framework added
 * there without an entry here fails the build rather than rendering untinted.
 */
const tones: Record<
  FrameworkIconKey,
  { tile: string; disc: string; glyph: string }
> = {
  iso27001: { tile: "#eeecfc", disc: "#d7cafc", glyph: "#4c1fd6" },
  gdpr: { tile: "#e6faf4", disc: "#bfefde", glyph: "#0f7a54" },
  soc2: { tile: "#e5f3fd", disc: "#bce4fc", glyph: "#1667a8" },
  dpdp: { tile: "#fdede6", disc: "#fdd2c1", glyph: "#e0521c" },
  iso27701: { tile: "#fdf7e2", disc: "#fdecae", glyph: "#8a6a08" },
  iso42001: { tile: "#fdeaf9", disc: "#fdcdee", glyph: "#a41a8c" },
};

/** The two status-dot colours, likewise sampled. */
const dotColour = { active: "#fdb402", idle: "#8599ba" } as const;

export function SopReadinessPanel() {
  const reduce = useReducedMotion();

  /*
   * ONE SHARED TRIGGER, NOT ONE PER TILE.
   *
   * Each tile having its own `whileInView` would let whichever tile crossed
   * the threshold first start the sequence, so on a tall viewport the lower
   * tiles can qualify before the upper ones and the stagger plays out of
   * order. The parent owns the trigger and the children inherit it through
   * variants, so the order below is the order on screen.
   */
  const container = reduce
    ? { hidden: {}, shown: {} }
    : {
        hidden: {},
        shown: { transition: { delayChildren: 0.18, staggerChildren: 0.075 } },
      };

  /*
   * REDUCED MOTION STILL NEEDS A REAL `shown` STATE.
   *
   * An earlier pass gave these `{ hidden: {}, shown: {} }` when `reduce` was
   * set, on the assumption that empty variants mean "no animation". They do
   * not: with nothing to apply, the elements keep the resting styles they
   * were mounted with and every one of them stayed at opacity 0 — the whole
   * panel was invisible to anyone browsing with reduced motion on.
   *
   * So both states are always declared. What `reduce` changes is the
   * TRANSITION, not the destination: the element still ends up opaque and in
   * place, it just arrives there instantly.
   */
  const shownNow = { opacity: 1, y: 0, scale: 1, transition: { duration: 0 } };

  const tile = reduce
    ? { hidden: shownNow, shown: shownNow }
    : {
        hidden: { opacity: 0, y: 14, scale: 0.97 },
        shown: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.5, ease: easeOut },
        },
      };

  const fade = reduce
    ? { hidden: shownNow, shown: shownNow }
    : {
        hidden: { opacity: 0, y: 10 },
        shown: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: easeOut },
        },
      };

  return (
    <Uncopyable className="relative">
      <motion.div
        initial={reduce ? "shown" : "hidden"}
        whileInView="shown"
        viewport={{ once: true, amount: 0.25 }}
        variants={container}
        className={cn(
          "relative overflow-hidden rounded-[1.25rem] bg-[#fafbfd]",
          "shadow-[0_40px_90px_-45px_rgb(8_14_45/0.55)]",
          "ring-1 ring-white/60",
          /*
            MEASURED FROM THE COMP. In section1.png the panel runs y=54-583 and
            the next-step card y=530-613 at x=715-1131 — so the card clears the
            last tile row completely (its "Not yet reviewed" line reads in
            full), sits on an empty band at the panel's foot, and hangs about
            30px of the panel's 530px height past its bottom edge.

            That band is what this padding reserves: ~14% of the panel height,
            which at the sizes this renders is a little over four rem. An
            earlier pass had the card overlapping the tiles and clipping that
            second status line.

            Below sm the card drops into flow instead, so no band is needed
            and the padding stays tight.
          */
          "pb-4 sm:pb-24",
        )}
      >
        {/* ============================ Top bar ========================= */}
        <motion.div
          variants={fade}
          className={cn(
            "flex items-center justify-between gap-3",
            "border-b border-[#eef1f7] px-5 py-3.5 sm:px-6 sm:py-4",
          )}
        >
          <p className="font-display text-[1.0625rem] font-bold tracking-[-0.01em] sm:text-[1.1875rem]">
            <span className="text-[#00001a]">{panel.brand.lead}</span>
            <span className="text-[#4601fb]">{panel.brand.accent}</span>
          </p>

          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full bg-[#e2eefd]",
              "px-3 py-1.5 text-[0.6875rem] font-medium text-[#263b8e]",
              "sm:text-[0.75rem]",
            )}
          >
            {panel.workspace}
            <ChevronDownIcon className="size-3.5 text-[#5b6da8]" />
          </span>
        </motion.div>

        <div className="px-5 pt-4 sm:px-6 sm:pt-5">
          {/* ========================== Heading ========================= */}
          <motion.h3
            variants={fade}
            className={cn(
              "font-display font-bold tracking-[-0.025em] text-[#00001f]",
              "text-[1.25rem] sm:text-[1.5rem]",
            )}
          >
            {panel.heading}
          </motion.h3>
          <motion.p
            variants={fade}
            className="mt-1 text-[0.8125rem] text-[#475491] sm:text-[0.875rem]"
          >
            {panel.subheading}
          </motion.p>

          {/* ============================ Tabs ========================== */}
          {/*
            Rendered as plain spans, not buttons. The whole panel is
            aria-hidden decoration and nothing here is operable — buttons would
            put six unreachable stops in the tab order and promise an
            interaction that does not exist.
          */}
          <motion.div
            variants={fade}
            className="mt-4 flex items-end gap-1 border-b border-[#e8ecf5]"
          >
            {panel.tabs.map((label, index) => (
              <span
                key={label}
                className={cn(
                  "rounded-t-lg px-3.5 py-2 text-[0.8125rem] sm:px-4 sm:text-[0.875rem]",
                  index === 0
                    ? "bg-[#ebe8fc] font-semibold text-[#2f00f7]"
                    : "font-medium text-[#455394]",
                )}
              >
                {label}
              </span>
            ))}
          </motion.div>

          {/* ========================= Framework grid =================== */}
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3.5">
            {panel.frameworks.map((framework) => {
              const tone = tones[framework.id as FrameworkIconKey];
              const Glyph = frameworkIcons[framework.id as FrameworkIconKey];

              return (
                <motion.div
                  key={framework.id}
                  variants={tile}
                  style={{ backgroundColor: tone.tile }}
                  className={cn(
                    "group/tile flex items-center gap-3 rounded-2xl p-3 sm:gap-3.5 sm:p-3.5",
                    // A quiet lift on hover, so the tiles feel like the live
                    // cards they imitate. Transform only — no layout cost.
                    "transition-[translate,box-shadow] duration-300 ease-out",
                    "hover:-translate-y-0.5 hover:shadow-[0_12px_24px_-14px_rgb(8_14_45/0.45)]",
                    "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
                  )}
                >
                  <span
                    style={{ backgroundColor: tone.disc, color: tone.glyph }}
                    className={cn(
                      "grid size-10 shrink-0 place-items-center rounded-full sm:size-11",
                      "transition-transform duration-300 ease-out",
                      "group-hover/tile:scale-105",
                      "motion-reduce:transition-none motion-reduce:group-hover/tile:scale-100",
                    )}
                  >
                    <Glyph className="size-5 sm:size-5.5" />
                  </span>

                  <div className="min-w-0">
                    <p className="font-display text-[0.9375rem] font-bold tracking-[-0.01em] text-[#00002e] sm:text-[1rem]">
                      {framework.name}
                    </p>

                    <ul className="mt-1 space-y-0.5">
                      {framework.status.map((line) => (
                        <li
                          key={line}
                          className="flex items-center gap-1.5 text-[0.75rem] text-[#2f418c] sm:text-[0.8125rem]"
                        >
                          <span
                            style={{ backgroundColor: dotColour[framework.tone] }}
                            className="size-1.5 shrink-0 rounded-full sm:size-2"
                          />
                          {line}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* ========================= Next-step card ====================== */}
      {/*
        Overlaps the panel's bottom-right corner above sm, as the design sets
        it. Below that it sits in flow beneath the panel — at phone width an
        overlapping card would cover two framework tiles.
      */}
      <motion.div
        initial={reduce ? "shown" : "hidden"}
        whileInView="shown"
        viewport={{ once: true, amount: 0.4 }}
        variants={
          reduce
            ? { hidden: shownNow, shown: shownNow }
            : {
                hidden: { opacity: 0, y: 16 },
                shown: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.55, delay: 0.75, ease: easeOut },
                },
              }
        }
        className={cn(
          /* -bottom-6: the overhang measured above. right-4/right-5 keeps the
             card's right edge inside the panel's, as the comp does. */
          "mt-3 sm:absolute sm:right-4 sm:-bottom-6 sm:mt-0 sm:w-[86%] lg:right-5 lg:w-[80%]",
          "flex items-center gap-3 rounded-2xl bg-white p-3.5 sm:gap-4 sm:p-4",
          "shadow-[0_22px_50px_-24px_rgb(8_14_45/0.45)]",
          "ring-1 ring-[#e4e0fb]",
        )}
      >
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#e6e0fc] text-[#4601fb] sm:size-12">
          <TaskCheckIcon className="size-6" />
        </span>

        <div className="min-w-0 flex-1">
          <p className="text-[0.625rem] font-semibold tracking-[0.12em] text-[#7b86ad] uppercase sm:text-[0.6875rem]">
            {panel.nextStep.eyebrow}
          </p>
          <p className="mt-0.5 font-display text-[0.9375rem] font-bold tracking-[-0.01em] text-[#00001f] sm:text-[1.0625rem]">
            {panel.nextStep.title}
          </p>
          <p className="mt-0.5 text-[0.75rem] text-[#5b6795] sm:text-[0.8125rem]">
            {panel.nextStep.owner}
          </p>
        </div>

        {/* A span, not a link: see the note on the tabs above. */}
        <span className="hidden shrink-0 items-center gap-2 text-[0.8125rem] font-semibold text-[#4601fb] sm:inline-flex sm:text-[0.875rem]">
          {panel.nextStep.action}
          <ArrowRightIcon className="size-4" />
        </span>
      </motion.div>
    </Uncopyable>
  );
}
