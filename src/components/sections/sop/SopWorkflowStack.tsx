"use client";

import { motion, useReducedMotion } from "motion/react";

import { Uncopyable } from "@/components/ui/Uncopyable";
import { sop } from "@/content/sop";
import { cn } from "@/lib/utils";

import {
  ChevronRightIcon,
  ClipboardMarkIcon,
  FabricMarkIcon,
  SearchMarkIcon,
  planRowIcons,
  sourceIcons,
  type PlanRowIconKey,
  type SourceIconKey,
} from "./SopIcons";

/**
 * SOP WORKFLOW STACK
 * ---------------------------------------------------------------------------
 * The left half of section 3: three cascading workflow cards joined by two
 * curved threads.
 *
 * REBUILT IN MARKUP, like the hero's panel. The pack ships the three cards as
 * PNGs totalling ~4MB; drawing them costs no image bytes, keeps the text sharp
 * and lets each card animate on its own beat.
 *
 * GEOMETRY IS MEASURED FROM THE COMP (section3.png, 1383x769):
 *   card 1  x=136-552  y= 54-261   (416x207)
 *   card 2  x= 96-578  y=277-467   (482x190)
 *   card 3  x= 51-667  y=481-734   (616x253)
 * Each card is wider than the one above and starts further left, so the stack
 * fans down and to the left. Those numbers are expressed below as percentages
 * of one aspect-locked box (683x769 -> the comp's left half), which is what
 * keeps the cascade intact at any width instead of drifting.
 *
 * THE CARDS DO NOT OVERLAP. The comp leaves a 16px gap between cards 1 and 2
 * and a 14px gap between 2 and 3. An earlier pass let each card take its
 * content's natural height, which overran those boxes: card 2 covered card 1's
 * footer, card 3 covered card 2's last row, and both threads disappeared
 * behind the card below them. Each card is therefore given its MEASURED
 * height, and its content sized to fit inside — the height is the design's,
 * not an accident of how long the strings are.
 *
 * THE THREADS were measured the same way: the purple arc runs from (555,165)
 * to (553,410) bulging right to x=609, the mint from (584,369) to (624,482)
 * bulging to x=635. They are drawn as SVG paths in that same coordinate box,
 * so they stay pinned to the cards' edges.
 *
 * IT IS DECORATION, so the whole stack is Uncopyable and aria-hidden — the
 * section's real content is the copy and steps on the right. The comp labels
 * it "Illustrative workflow", and that label IS exposed, because it is a
 * caption about the image rather than part of it.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { cards } = sop.context;

/** The comp's left half, used as the coordinate space for everything below. */
const BOX = { w: 683, h: 769 } as const;

/** Card boxes, measured from the comp and expressed against BOX. */
const placement = {
  fabric: { left: 136, top: 54, width: 416, height: 207 },
  review: { left: 96, top: 277, width: 482, height: 190 },
  plan: { left: 51, top: 481, width: 616, height: 253 },
} as const;

const pct = (n: number, total: number) => `${(n / total) * 100}%`;

function box(p: {
  left: number;
  top: number;
  width: number;
  height: number;
}) {
  return {
    left: pct(p.left, BOX.w),
    top: pct(p.top, BOX.h),
    width: pct(p.width, BOX.w),
    height: pct(p.height, BOX.h),
  };
}

/*
 * The cards are sized by the box above, so their contents scale with it rather
 * than with the root font size — otherwise the text would overflow a card that
 * has a fixed height. `cqw` units resolve against each card's own width, which
 * `@container` establishes below.
 */

/** Per-source tile colour inside the LurnyFabric card, sampled from the comp. */
const sourceTones: Record<SourceIconKey, { bg: string; fg: string }> = {
  business: { bg: "#ece9fb", fg: "#3b1f9e" },
  departments: { bg: "#dcf5ec", fg: "#0f7a5e" },
  people: { bg: "#e3effb", fg: "#1d4e86" },
  systems: { bg: "#fbe8db", fg: "#9a4a12" },
};

/** The three framework pills on the review card. */
const pillTones: Record<string, { bg: string; fg: string; ring: string }> = {
  iso27001: { bg: "#eee6fc", fg: "#4c1d95", ring: "#ddd0f8" },
  gdpr: { bg: "#ddf6e7", fg: "#11633f", ring: "#c6edd6" },
  soc2: { bg: "#fce6d3", fg: "#8a4512", ring: "#f7d5ba" },
};

/** The two status chips on the review card. */
const statusTones: Record<string, { bg: string; fg: string }> = {
  violet: { bg: "#e6ddfb", fg: "#4c1d95" },
  mint: { bg: "#c9f1d9", fg: "#0f6b42" },
};

export function SopWorkflowStack() {
  const reduce = useReducedMotion();

  /*
   * ONE SHARED TRIGGER for the whole stack — the pattern the rest of this
   * page uses. Per-card `whileInView` would let the tallest card qualify
   * first and play the cascade out of order.
   */
  const shownNow = { opacity: 1, y: 0, x: 0, transition: { duration: 0 } };

  const container = reduce
    ? { hidden: {}, shown: {} }
    : {
        hidden: {},
        shown: { transition: { delayChildren: 0.1, staggerChildren: 0.22 } },
      };

  const card = reduce
    ? { hidden: shownNow, shown: shownNow }
    : {
        hidden: { opacity: 0, y: 26 },
        shown: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: easeOut },
        },
      };

  /* The threads draw themselves on, after the card they lead away from. */
  const thread = reduce
    ? { hidden: { pathLength: 1, opacity: 1 }, shown: { pathLength: 1, opacity: 1 } }
    : {
        hidden: { pathLength: 0, opacity: 0 },
        shown: {
          pathLength: 1,
          opacity: 1,
          transition: { duration: 0.7, ease: easeOut },
        },
      };

  const dot = reduce
    ? { hidden: { scale: 1, opacity: 1 }, shown: { scale: 1, opacity: 1 } }
    : {
        hidden: { scale: 0, opacity: 0 },
        shown: {
          scale: 1,
          opacity: 1,
          transition: { duration: 0.35, ease: easeOut },
        },
      };

  return (
    <Uncopyable className="relative">
      <motion.div
        initial={reduce ? "shown" : "hidden"}
        whileInView="shown"
        viewport={{ once: true, amount: 0.2 }}
        variants={container}
        /* Aspect-locked to the comp's left half, so the measured percentages
           above describe the same shape at every width. */
        className="relative aspect-[683/769] w-full"
      >
        {/* ===================== Connector threads ===================== */}
        {/*
          Behind the cards (`-z-10` would escape the stacking context, so the
          cards simply come later in source order and sit above).
          `vector-effect` keeps the stroke an even weight as the box scales.
        */}
        <svg
          viewBox={`0 0 ${BOX.w} ${BOX.h}`}
          fill="none"
          aria-hidden="true"
          className="absolute inset-0 size-full"
        >
          {/* Card 1 -> card 2. Measured: (555,165) to (553,410), apex x=609. */}
          <motion.path
            variants={thread}
            d="M555 165 C 605 200, 612 330, 553 410"
            stroke="#cba5fe"
            strokeWidth={3}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          {/* Card 2 -> card 3. Measured: (584,369) to (624,482), apex x=635. */}
          <motion.path
            variants={thread}
            d="M584 369 C 632 396, 638 446, 624 482"
            stroke="#9dfbe6"
            strokeWidth={3}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />

          {/* The dot at each thread end, as the comp draws them. */}
          {(
            [
              [555, 165, "#cba5fe"],
              [553, 410, "#cba5fe"],
              [584, 369, "#9dfbe6"],
              [624, 482, "#9dfbe6"],
            ] as const
          ).map(([cx, cy, fill]) => (
            <motion.circle
              key={`${cx}-${cy}`}
              variants={dot}
              cx={cx}
              cy={cy}
              r={9}
              fill={fill}
              style={{ transformOrigin: `${cx}px ${cy}px` }}
            />
          ))}
        </svg>

        {/* ======================= Card 1 — Fabric ===================== */}
        <motion.div
          variants={card}
          style={box(placement.fabric)}
          className={cn(
            "absolute flex flex-col overflow-hidden rounded-2xl bg-white",
            "shadow-[0_24px_50px_-24px_rgb(2_20_35/0.65)]",
            "@container",
          )}
        >
          {/* Comp: header 0-65 of 207 = 31% of the card's height. */}
          <div className="flex h-[31%] items-center gap-[2.9cqw] bg-[#eae7fb] px-[3.8cqw]">
            <FabricMarkIcon className="size-[7.7cqw] shrink-0 text-[#6d4cf0]" />
            <div className="min-w-0">
              <p className="font-display text-[3.9cqw] leading-tight font-bold tracking-[-0.01em] text-[#101a35]">
                {cards.fabric.title}
              </p>
              <p className="text-[3.1cqw] leading-tight text-[#3f4a6b]">
                {cards.fabric.subtitle}
              </p>
            </div>
          </div>

          {/* Comp: the 2x2 grid spans 65-168 = 50%. */}
          <div className="grid h-[50%] grid-cols-2 grid-rows-2 gap-[1.9cqw] px-[2.9cqw] py-[1.9cqw]">
            {cards.fabric.sources.map((source) => {
              const tone = sourceTones[source.id as SourceIconKey];
              const Glyph = sourceIcons[source.id as SourceIconKey];
              return (
                <div
                  key={source.id}
                  style={{ backgroundColor: tone.bg, color: tone.fg }}
                  className="flex items-center gap-[1.9cqw] rounded-[1.9cqw] px-[2.4cqw]"
                >
                  <Glyph className="size-[4.3cqw] shrink-0" />
                  <span className="truncate text-[3.1cqw] font-medium text-[#16203c]">
                    {source.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Comp: the footer rule sits at 168, leaving 19% below it. */}
          <p className="flex flex-1 items-center border-t border-[#e8ecf4] px-[3.8cqw] text-[3.1cqw] text-[#3f4a6b]">
            {cards.fabric.footer}
          </p>
        </motion.div>

        {/* ======================= Card 2 — Review ===================== */}
        <motion.div
          variants={card}
          style={box(placement.review)}
          className={cn(
            "absolute flex flex-col overflow-hidden rounded-2xl bg-white",
            "shadow-[0_24px_50px_-24px_rgb(2_20_35/0.65)]",
            "@container",
          )}
        >
          {/* Comp: header 0-45 of 190 = 24%. */}
          <div className="flex h-[24%] items-center gap-[2.5cqw] bg-[#dceff1] px-[3.3cqw]">
            <SearchMarkIcon className="size-[5.4cqw] shrink-0 text-[#12a06a]" />
            <p className="font-display text-[3.7cqw] font-bold tracking-[-0.015em] text-[#101a35]">
              {cards.review.title}
            </p>
          </div>

          {/* Comp: the pill row spans 45-100 = 29%. */}
          <div className="grid h-[29%] grid-cols-3 items-center gap-[1.7cqw] px-[2.5cqw]">
            {cards.review.pills.map((pill) => {
              const tone = pillTones[pill.id];
              return (
                <span
                  key={pill.id}
                  style={{
                    backgroundColor: tone.bg,
                    color: tone.fg,
                    borderColor: tone.ring,
                  }}
                  className="truncate rounded-full border px-[1.7cqw] py-[1.2cqw] text-center text-[2.9cqw] font-medium"
                >
                  {pill.label}
                </span>
              );
            })}
          </div>

          {/* Comp: the two status rows share the remaining 47%. */}
          <div className="flex flex-1 flex-col">
            {cards.review.rows.map((row) => {
              const tone = statusTones[row.tone];
              return (
                <div
                  key={row.label}
                  className={cn(
                    "flex flex-1 items-center justify-between gap-3",
                    "border-t border-[#eef1f6] px-[3.3cqw]",
                  )}
                >
                  <span className="truncate text-[3.1cqw] text-[#16203c]">
                    {row.label}
                  </span>
                  <span
                    style={{ backgroundColor: tone.bg, color: tone.fg }}
                    className="shrink-0 rounded-full px-[2.5cqw] py-[0.9cqw] text-[2.9cqw] font-medium"
                  >
                    {row.status}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* ======================== Card 3 — Plan ====================== */}
        <motion.div
          variants={card}
          style={box(placement.plan)}
          className={cn(
            "absolute flex flex-col overflow-hidden rounded-2xl bg-white",
            "shadow-[0_26px_54px_-24px_rgb(2_20_35/0.7)]",
            "@container",
          )}
        >
          {/* Comp: header 0-61 of 253 = 24%. */}
          <div className="flex h-[24%] items-center gap-[2cqw] bg-[#fbe9df] px-[2.6cqw]">
            <ClipboardMarkIcon className="size-[4.2cqw] shrink-0 text-[#c8501f]" />
            <p className="min-w-0 flex-1 truncate font-display text-[2.9cqw] font-bold tracking-[-0.015em] text-[#101a35]">
              {cards.plan.title}
            </p>
            <span className="shrink-0 rounded-[1.5cqw] bg-[#e6ddfb] px-[2.3cqw] py-[1.2cqw] text-[2.3cqw] font-medium text-[#4c1d95]">
              {cards.plan.badge}
            </span>
          </div>

          {/* Comp: the four rows span 61-209 = 59%, one quarter each. */}
          <div className="flex flex-1 flex-col">
            {cards.plan.rows.map((row, index) => {
              const Glyph = planRowIcons[row.id as PlanRowIconKey];
              return (
                <div
                  key={row.id}
                  className={cn(
                    "grid flex-1 grid-cols-[3.4cqw_minmax(0,0.85fr)_minmax(0,1fr)]",
                    "items-center gap-[2.3cqw] px-[2.6cqw]",
                    index > 0 && "border-t border-[#eef1f6]",
                  )}
                >
                  <Glyph className="size-[3.4cqw] text-[#46557a]" />
                  <span className="truncate text-[2.6cqw] font-medium text-[#16203c]">
                    {row.label}
                  </span>
                  <span className="truncate text-[2.6cqw] text-[#46557a]">
                    {row.value}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Comp: the footer band is the last 17%. */}
          <div className="flex h-[17%] items-center justify-between gap-[2.3cqw] bg-[#e9e2fb] px-[2.6cqw]">
            <span className="truncate text-[2.6cqw] text-[#3b2a7a]">
              {cards.plan.footer}
            </span>
            <ChevronRightIcon className="size-[3.4cqw] shrink-0 text-[#4c1d95]" />
          </div>
        </motion.div>
      </motion.div>
    </Uncopyable>
  );
}
