"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { Uncopyable } from "@/components/ui/Uncopyable";
import { biz } from "@/content/biz";
import { cn } from "@/lib/utils";

import {
  ArrowUpIcon,
  bizActionIcons,
  CarIcon,
  ClockIcon,
  PersonIcon,
  TargetArrowIcon,
} from "./BizIcons";

/**
 * BIZ ACTION
 * ---------------------------------------------------------------------------
 * Section 5 of the LurnyBiz page: copy and three points on the left, a
 * "Recommended next action" panel on the right with a small "Why now" card
 * overlapping its lower-left corner.
 *
 * BOTH PANELS ARE DRAWN, not the two flat PNGs supplied with the design —
 * the same choice sections 1, 3 and 4 make. The three point icons DO ship,
 * as they did in section 4: they arrive as finished circular artwork rather
 * than line glyphs, so redrawing them would mean reproducing that treatment
 * by hand for no gain.
 *
 * A COPY FIX: the design reads "Follow-up commtment due today" — a typo for
 * "commitment", corrected in the content file. Shipping it would put the
 * misspelling in front of customers and into search results.
 *
 * The panels are wrapped in <Uncopyable> and aria-hidden: they imitate
 * product UI, and their two buttons are DRAWINGS of controls, not controls.
 * The heading, description and three points are real copy and sit outside.
 */

const { action } = biz;

/** Motion's string easings are not typed, so the cubic curve is spelled out. */
const easeOut = [0.16, 1, 0.3, 1] as const;

/** Chip and glyph colours, sampled from the design. */
const tones = {
  amber: {
    text: "text-[#e5b04f]",
    chip: "bg-[#e5b04f]/12 text-[#e5b04f] ring-[#e5b04f]/40",
    tile: "bg-[#e5b04f]/10 text-[#e5b04f] ring-[#e5b04f]/30",
  },
  violet: {
    text: "text-[#9e70db]",
    chip: "bg-[#9e70db]/12 text-[#9e70db] ring-[#9e70db]/40",
    tile: "bg-[#9e70db]/10 text-[#9e70db] ring-[#9e70db]/30",
  },
  green: {
    text: "text-[#7bbd52]",
    chip: "bg-[#7bbd52]/12 text-[#7bbd52] ring-[#7bbd52]/40",
    tile: "bg-[#7bbd52]/10 text-[#7bbd52] ring-[#7bbd52]/30",
  },
} as const;

export function BizAction() {
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

  const { panel } = action;

  return (
    <section className="relative isolate overflow-hidden bg-[#05070f] py-section-lg text-white">
      {/* A faint amber bloom behind the panel, so it sits in light rather
          than on flat black. */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -z-10",
          "top-1/2 right-[8%] h-[34rem] w-[38rem] -translate-y-1/2",
          "rounded-full bg-[#e5b04f]/6 blur-3xl",
        )}
      />

      <Container width="hero" className="relative">
        <div
          className={cn(
            "grid items-center gap-14",
            "lg:grid-cols-[minmax(0,0.84fr)_minmax(0,1.16fr)] lg:gap-12",
            "xl:gap-16",
          )}
        >
          {/* ============================ Copy ======================== */}
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "text-[0.6875rem] font-bold tracking-[0.16em] uppercase",
                "text-[#e5b04f] sm:text-xs",
              )}
            >
              {action.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.08)}
              className={cn(
                "mt-6 font-display font-bold tracking-[-0.03em]",
                "leading-[1.12] text-balance",
                // Measured from the design at ~50px on a 1440 frame.
                "text-[1.875rem] sm:text-[2.25rem] xl:text-[2.75rem]",
              )}
            >
              {action.headline.map((line) => (
                <span key={line} className="inline lg:block">
                  {line}{" "}
                </span>
              ))}
            </motion.h2>

            <motion.p
              {...rise(0.16)}
              className={cn(
                "mt-6 max-w-[30rem] leading-relaxed text-pretty",
                "text-[0.9375rem] text-neutral-400 sm:text-base",
              )}
            >
              {action.description}
            </motion.p>

            {/* -------------------------- Points --------------------- */}
            <ul className="mt-10 space-y-7">
              {action.points.map((point, index) => (
                <motion.li
                  key={point.label}
                  {...rise(0.24 + index * 0.08)}
                  className={cn(
                    "group flex items-center gap-5",
                    // Capped so the longest label wraps before it reaches the
                    // "Why now" card that hangs in the gap beside this column.
                    "lg:max-w-[23rem] xl:max-w-[26rem]",
                  )}
                >
                  <Image
                    src={point.icon}
                    alt=""
                    aria-hidden="true"
                    width={128}
                    height={128}
                    className={cn(
                      "size-11 shrink-0 object-contain",
                      // `scale`, not `transform`: Tailwind v4 compiles the
                      // scale utilities to the standalone property.
                      "duration-normal transition-[scale] ease-out",
                      "group-hover:scale-110",
                    )}
                  />
                  <span className="text-[0.9375rem] text-pretty text-neutral-200 sm:text-base">
                    {point.label}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* ========================== Panels ======================== */}
          <motion.div
            initial={reduce ? "shown" : "hidden"}
            whileInView="shown"
            viewport={{ once: true, amount: "some" }}
            variants={{
              hidden: { opacity: 0, scale: 0.97 },
              shown: {
                opacity: 1,
                scale: 1,
                transition: { duration: 0.8, delay: 0.2, ease: easeOut },
              },
            }}
            className="relative"
          >
            <Uncopyable
              className={cn(
                "group rounded-2xl bg-[#0b0f18]/95 p-5 sm:p-6",
                "ring-1 ring-white/10",
                "shadow-[0_24px_60px_-28px_rgb(0_0_0/0.9)]",
                "duration-normal transition-[box-shadow,--tw-ring-color] ease-out",
                "hover:ring-[#e5b04f]/30",
                "hover:shadow-[0_28px_66px_-28px_rgb(229_176_79/0.25)]",
              )}
            >
              {/* --------------------- Header ------------------- */}
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <TargetArrowIcon className="size-6 shrink-0 text-[#e5b04f]" />
                <p className="text-[0.9375rem] font-medium sm:text-base">
                  {panel.title}
                </p>
              </div>

              {/* --------------------- Person ------------------- */}
              <div className="flex items-center gap-3.5 border-b border-white/10 py-4">
                <span
                  className={cn(
                    "grid size-10 shrink-0 place-items-center rounded-full",
                    "text-[#e5b04f] ring-1 ring-[#e5b04f]/40",
                  )}
                >
                  <PersonIcon className="size-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-[0.9375rem] font-medium">
                    {panel.person.name}
                  </p>
                  <p className="mt-0.5 text-[0.8125rem] text-neutral-500">
                    {panel.person.role}
                  </p>
                </div>
              </div>

              {/* ------------------ Recommendation -------------- */}
              <div className="flex items-start gap-4 border-b border-white/10 py-5">
                <span
                  className={cn(
                    "grid size-14 shrink-0 place-items-center rounded-xl",
                    "text-[#9e70db] ring-1 ring-[#9e70db]/35",
                  )}
                >
                  <CarIcon className="size-7" />
                </span>

                <div className="min-w-0">
                  <p className="text-[1.0625rem] leading-snug font-semibold text-balance sm:text-[1.125rem]">
                    {panel.recommendation.title}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {panel.recommendation.badges.map((badge) => (
                      <span
                        key={badge.label}
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-md ring-1",
                          "px-2.5 py-1 text-[0.6875rem] font-semibold uppercase",
                          tones[badge.tone].chip,
                        )}
                      >
                        {badge.arrow && <ArrowUpIcon className="size-3" />}
                        {badge.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* -------------------- Why this ------------------ */}
              <div className="border-b border-white/10 py-5">
                <p className="text-[0.9375rem] font-medium">
                  {panel.why.title}
                </p>

                <ul className="mt-3.5 space-y-3">
                  {panel.why.reasons.map((reason) => {
                    const Icon =
                      bizActionIcons[
                        reason.icon as keyof typeof bizActionIcons
                      ];

                    return (
                      <li
                        key={reason.label}
                        className="flex items-center gap-3.5"
                      >
                        <span
                          className={cn(
                            "grid size-8 shrink-0 place-items-center rounded-lg ring-1",
                            tones[reason.tone].tile,
                          )}
                        >
                          <Icon className="size-4" />
                        </span>
                        <span className="text-[0.875rem] text-neutral-200">
                          {reason.label}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* -------------------- Approach ------------------ */}
              <div className="py-5">
                <p className="text-[0.9375rem] font-medium">
                  {panel.approach.title}
                </p>
                <p className="mt-2 text-[0.875rem] leading-relaxed text-pretty text-neutral-400">
                  {panel.approach.body}
                </p>
              </div>

              {/* --------------------- Actions ------------------ */}
              {/* DRAWINGS of controls, not controls — the whole panel is
                  aria-hidden, so a real button here would be unreachable. */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <span
                  className={cn(
                    "flex flex-1 items-center justify-center gap-2.5",
                    "rounded-lg px-4 py-3 ring-1 ring-white/15",
                    "text-[0.875rem] font-medium",
                    "duration-normal transition-colors ease-out",
                    "group-hover:ring-white/25",
                  )}
                >
                  <PersonIcon className="size-4 text-neutral-300" />
                  {panel.actions.secondary.label}
                </span>

                <span
                  className={cn(
                    "flex flex-1 items-center justify-center gap-2.5",
                    "rounded-lg bg-[#e5b04f] px-4 py-3",
                    "text-[0.875rem] font-semibold text-neutral-900",
                    "duration-normal transition-colors ease-out",
                    "group-hover:bg-[#f0c26a]",
                  )}
                >
                  <bizActionIcons.chat className="size-4" />
                  {panel.actions.primary.label}
                </span>
              </div>
            </Uncopyable>

            {/* -------------------- Why now card -------------- */}
            {/*
              Overlaps the panel's lower-left corner from lg, as the design
              lays it out. Below that it sits beneath the panel in flow,
              where an overlap would cover the panel's own controls.
            */}
            <Uncopyable
              className={cn(
                "mt-4 rounded-xl bg-[#0d1119] p-4",
                "ring-1 ring-white/10",
                "shadow-[0_18px_40px_-20px_rgb(0_0_0/0.9)]",
                /*
                  Sits ENTIRELY LEFT of the panel, clear of it.

                  Measured off the design: the card's right edge (53.3% of the
                  frame) stops just short of the panel's left edge (54.1%) —
                  they do not overlap. An earlier `-left-16` pushed it over the
                  panel, covering "Suggested approach" and one of the two
                  controls.

                  `right-full` anchors it to the panel's left edge and the
                  margin opens the design's small gap.
                */
                /*
                  Hangs BELOW the copy's points, in the clear space beside the
                  panel's lower half — which is where the design puts it.

                  Level with the points it clipped their labels, however wide
                  the gap between the columns was made. `-bottom-*` drops it
                  past them instead.
                */
                "lg:absolute lg:right-full lg:-bottom-6 lg:mt-0 lg:mr-5 lg:w-44",
                "xl:mr-6 xl:w-48",
              )}
            >
              <ClockIcon className="size-6 text-[#9e70db]" />

              <p className="mt-3 border-b border-white/10 pb-3 text-[1.0625rem] font-medium">
                {action.whyNow.title}
              </p>

              <p className="mt-3 text-[0.8125rem] leading-relaxed text-neutral-400">
                {action.whyNow.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </Uncopyable>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
