"use client";

import { motion, useReducedMotion } from "motion/react";

import { campus } from "@/content/campus";
import { cn } from "@/lib/utils";

import {
  BriefcaseSmallIcon,
  ClockIcon,
  NextStepIcon,
  PersonIcon,
  SourceIcon,
  StarSmallIcon,
  trendIcons,
} from "./CampusIcons";
import { CampusRadar } from "./CampusRadar";

/**
 * THE CAPABILITY PASSPORT
 * ---------------------------------------------------------------------------
 * Section 6's mockup: the passport card, the role it currently opens, and the
 * next step it recommends.
 *
 * Rebuilt in markup like the page's other product mockups — sharp at every
 * density, reflowing at every width, type left as type. Decorative for the same
 * reason: it pictures one student's record rather than presenting data the
 * reader must parse, so it is hidden from assistive tech.
 *
 * LAYOUT
 * The design floats the opportunity card off the passport's right edge and
 * hangs the next-step card below it, joined by dashed connectors. That
 * arrangement needs width, so on lg+ the two sit in their own column and the
 * connectors are drawn; below lg everything stacks and the connectors go.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { card, opportunity, nextStep } = campus.passport;

/** The two tile tones the design uses, keyed by the skill's `tone`. */
const tileTone = {
  amber: {
    shell: "border-[#e8c98a] bg-[#fdfcf4]",
    level: "text-[#8a6a1e]",
    trend: "text-[#c98a12]",
  },
  red: {
    shell: "border-[#f0bcb0] bg-[#fef4f0]",
    level: "text-[#a83a2c]",
    trend: "text-[#c32a21]",
  },
} as const;

/** The trend arrow's own colour, which is about direction, not the tile. */
const trendTone = {
  up: "text-[#1c8a4b]",
  down: "text-[#c32a21]",
  flat: "text-[#d08a1a]",
} as const;

/** The evidence chips' icons. */
const evidenceIcons = {
  document: SourceIcon,
  person: PersonIcon,
  clock: ClockIcon,
} as const;

export function CampusPassportCard() {
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduce ? "shown" : "hidden",
    whileInView: "shown",
    viewport: { once: true, amount: "some" } as const,
    variants: {
      hidden: { opacity: 0, y: 16 },
      shown: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, delay, ease: easeOut },
      },
    },
  });

  return (
    <div
      // Decorative: see the note at the top of this file.
      aria-hidden="true"
      className={cn(
        "relative grid grid-cols-1 gap-6",
        "lg:grid-cols-[minmax(0,1fr)_minmax(0,0.46fr)] lg:items-start lg:gap-4",
      )}
    >
      {/* ======================== The passport ======================== */}
      <motion.div
        {...rise(0.1)}
        className={cn(
          "relative z-10 rounded-2xl bg-white p-5 sm:p-6",
          "ring-1 ring-black/6",
          "shadow-[0_30px_70px_-32px_rgb(11_47_51/0.4)]",
        )}
      >
        <p className="text-[0.6875rem] font-bold tracking-[0.12em] text-[#4a5b5f] uppercase">
          {card.eyebrow}
        </p>

        {/* ------------------------ The student ------------------- */}
        <div className="mt-4 flex items-center gap-4">
          <span className="grid size-14 shrink-0 place-items-center rounded-full bg-[#e6dcfa] font-display text-[1.0625rem] font-bold text-[#6b3cb4]">
            {card.student.initials}
          </span>

          <span className="min-w-0">
            <span className="block font-display text-[1.375rem] font-bold text-[#0b1a22]">
              {card.student.name}
            </span>
            <span className="mt-0.5 block text-[0.875rem] text-[#4a5a60]">
              {card.student.course}
            </span>
          </span>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-[#025b52] px-4 py-2 text-[0.875rem] font-semibold text-white">
            {card.role}
          </span>
          <span className="rounded-full bg-[#ece1fb] px-4 py-2 text-[0.875rem] font-semibold text-[#6a3eb4]">
            {card.readiness}
          </span>
        </div>

        <span className="mt-5 block border-t border-[#eeebe7]" />

        {/* -------------------------- The skills ------------------ */}
        <ul className="mt-5 grid grid-cols-2 gap-3 xl:grid-cols-4">
          {card.skills.map((skill, index) => {
            const tone = tileTone[skill.tone];
            const Trend = trendIcons[skill.trend];
            const starred = "starred" in skill && skill.starred;

            return (
              <motion.li
                key={skill.name}
                {...rise(0.24 + index * 0.08)}
                className={cn(
                  "rounded-xl border-2 p-3 text-center",
                  tone.shell,
                  "duration-normal transition-[translate,box-shadow] ease-out",
                  "will-change-[translate] hover:-translate-y-0.5",
                  "hover:shadow-[0_12px_24px_-14px_rgb(11_47_51/0.4)]",
                )}
              >
                <span className="flex items-start justify-center gap-1">
                  <span className="block text-[0.6875rem] leading-tight font-bold tracking-[0.04em] text-[#3f5158] uppercase">
                    {skill.name}
                  </span>
                  {starred && (
                    <StarSmallIcon className="mt-px size-3 shrink-0 text-[#e0483a]" />
                  )}
                </span>

                <span className="mt-2.5 flex items-center justify-center gap-1.5">
                  <span
                    className={cn(
                      "font-display text-[1.375rem] font-bold",
                      tone.level,
                    )}
                  >
                    {skill.level}
                  </span>
                  <Trend className={cn("size-3.5", trendTone[skill.trend])} />
                </span>

                <span className="mt-2 block text-[0.75rem] text-[#5d6f73]">
                  {skill.target}
                </span>
                <span className="mt-0.5 block text-[0.6875rem] text-[#7c8a8e]">
                  {skill.confidence}
                </span>
              </motion.li>
            );
          })}
        </ul>

        {/* ------------------------ The evidence ------------------ */}
        <p className="mt-6 flex items-center gap-4">
          <span className="shrink-0 text-[0.75rem] font-bold tracking-[0.1em] text-[#016551] uppercase">
            {card.evidenceTitle}
          </span>
          <span className="h-px min-w-0 flex-1 bg-[#e4e9e6]" />
        </p>

        <ul className="mt-4 flex flex-wrap gap-3">
          {card.evidence.map((item, index) => {
            const Icon = evidenceIcons[item.icon];

            return (
              <motion.li
                key={item.label.join(" ")}
                {...rise(0.5 + index * 0.08)}
                className={cn(
                  "flex items-center gap-2.5 rounded-xl px-3.5 py-2.5",
                  "border border-[#dfe6e2] bg-[#fbfcfb]",
                )}
              >
                <Icon className="size-4 shrink-0 text-[#4a5b5f]" />
                <span className="text-[0.8125rem] leading-tight font-medium text-[#0b1a22]">
                  {item.label.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </motion.li>
            );
          })}
        </ul>
      </motion.div>

      {/* ====================== The opportunity ====================== */}
      {/* Pulled left over the passport's edge on lg+, as the design overlaps
          them; below lg it simply follows in the stack. */}
      <motion.div
        {...rise(0.35)}
        className={cn(
          "relative z-20 rounded-2xl bg-white p-5",
          "ring-1 ring-black/6",
          "shadow-[0_24px_50px_-28px_rgb(11_47_51/0.45)]",
          "lg:mt-6 lg:-ml-5",
        )}
      >
        <p className="text-[0.6875rem] font-bold tracking-[0.1em] text-[#0a534c] uppercase">
          {opportunity.eyebrow}
        </p>

        <div className="mt-4 flex items-start gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#e2f1ec] text-[#0d5451]">
            <BriefcaseSmallIcon className="size-5" />
          </span>

          <span className="min-w-0">
            <span className="block font-display text-[1.125rem] leading-snug font-bold text-[#0b1a22]">
              {opportunity.role.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </span>
            <span className="mt-1 block text-[0.9375rem] font-semibold text-[#066153]">
              {opportunity.match}
            </span>
          </span>
        </div>

        {/* The radar. */}
        <div className="mt-4">
          <CampusRadar />
        </div>

        {/* Its legend. */}
        <p className="mt-3 flex flex-wrap items-center justify-center gap-4">
          <span className="flex items-center gap-2 text-[0.75rem] text-[#3f5158]">
            <span className="block size-3 rounded-[2px] bg-[#025a50]" />
            {opportunity.legend.you}
          </span>
          <span className="flex items-center gap-2 text-[0.75rem] text-[#3f5158]">
            <span className="block size-3 rounded-[2px] border-2 border-dashed border-[#235ef6]" />
            {opportunity.legend.required}
          </span>
        </p>
      </motion.div>

      {/* ======================= The next step ======================= */}
      {/* Hangs below the passport, centred under it on lg+ where the design
          drops a dashed connector into it. */}
      <motion.div
        {...rise(0.6)}
        className={cn(
          "relative z-10 rounded-2xl p-5",
          "border border-[#f8cdc2] bg-[linear-gradient(150deg,#fef3ef_0%,#fdece6_100%)]",
          "lg:col-start-1 lg:mt-8 lg:mr-24 lg:ml-20",
        )}
      >
        <div className="flex items-center gap-4">
          <span className="grid size-14 shrink-0 place-items-center rounded-full bg-[#fd5d4f] text-white">
            <NextStepIcon className="size-7" />
          </span>

          <span className="min-w-0">
            <span className="block text-[0.75rem] font-bold tracking-[0.1em] text-[#fc5042] uppercase">
              {nextStep.eyebrow}
            </span>
            <span className="mt-1.5 block font-display text-[1.125rem] leading-snug font-bold text-[#0b1a22]">
              {nextStep.title.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </span>
            <span className="mt-1.5 block text-[0.875rem] text-[#5d6f73]">
              {nextStep.meta}
            </span>
          </span>
        </div>
      </motion.div>
    </div>
  );
}
