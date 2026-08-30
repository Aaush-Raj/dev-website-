"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { ArrowRightIcon } from "@/components/sections/hero/DashboardIcons";
import { Container } from "@/components/ui/Container";
import { Uncopyable } from "@/components/ui/Uncopyable";
import { biz } from "@/content/biz";
import { cn } from "@/lib/utils";

import {
  bizPanelIcons,
  bizPointIcons,
  BranchIcon,
  CalendarIcon,
  ChevronIcon,
  CrosshairIcon,
  MoreIcon,
  PersonIcon,
  TrendIcon,
} from "./BizIcons";

/**
 * BIZ HERO
 * ---------------------------------------------------------------------------
 * Section 1 of the LurnyBiz page: copy on the left, three product panels on
 * the right, and a strip of three points along the bottom.
 *
 * THE PANELS ARE DRAWN, not the flat PNG supplied with the design. That
 * export bakes every label into pixels — a picture of text, which cannot
 * re-flow, is invisible to search, and turns soft the moment it is scaled.
 * The LurnyMagic and LurnyPitch pages make the same choice for the same
 * reasons.
 *
 * They are wrapped in <Uncopyable> and aria-hidden: they imitate product
 * screenshots, and their text is not real page copy. The headline, the
 * description, the CTAs and the three points ARE, and sit outside the
 * wrapper.
 *
 * SIZING
 * Plain responsive sizes, NOT container queries. The two panels differ in
 * width by roughly 40%, so a single `cqw` scale could not serve both — every
 * value tuned for the wide priorities panel came out too small in the narrow
 * right-hand stack, and vice versa. Fixed sizes let each panel's own grid
 * column do the shrinking, which is predictable at every width.
 *
 * THE BACKGROUND
 * A topographic field with glowing nodes, shipped as an image: it is a dense
 * generative pattern, and reproducing it in markup would be hundreds of paths
 * for a decorative layer. It is `priority` because it is this page's LCP
 * background.
 */

const { hero } = biz;

/** Motion's string easings are not typed, so the cubic curve is spelled out. */
const easeOut = [0.16, 1, 0.3, 1] as const;

/**
 * Priority tones, sampled from the design.
 *
 * `rule` is the leading bar on a priorities row, `badge` the rank chip, and
 * `text` the level label in the action plan.
 */
const tones = {
  red: {
    rule: "bg-[#e2564a]",
    badge: "bg-[#7f2a25] text-[#ffb4ac] ring-[#c0483e]",
    text: "text-[#e2564a]",
  },
  amber: {
    rule: "bg-[#e0a63c]",
    badge: "bg-[#7a5417] text-[#ffd88f] ring-[#c2882b]",
    text: "text-[#e0a63c]",
  },
  green: {
    rule: "bg-[#3fa669]",
    badge: "bg-[#1e5236] text-[#9ee6bd] ring-[#358157]",
    text: "text-[#4fb87a]",
  },
} as const;

/** Shared chrome for a panel and for the wells inside one. */
const panelChrome = cn(
  "rounded-[0.66rem] bg-[#12141d]/95 backdrop-blur-sm",
  "ring-1 ring-white/10",
  "shadow-[0_0.6rem_1.5rem_-0.6rem_rgb(0_0_0/0.8)]",
);

/**
 * Hover treatment for a panel.
 *
 * A lift, a brightened hairline and an amber-tinted glow — the accent the
 * hero already uses for its primary CTA, so the panels feel part of the same
 * surface rather than picking up a new colour.
 *
 * `group/panel` rather than a bare `group`: the rows inside the priorities
 * panel are their own `group`s for their chevrons, and an unnamed parent
 * would have them all react to each other's hover.
 */
const panelHover = cn(
  "group/panel",
  // `translate`, not `transform`: Tailwind v4 compiles the translate
  // utilities to the standalone property.
  "duration-normal transition-[box-shadow,translate,--tw-ring-color] ease-out",
  "will-change-[translate]",
  "hover:-translate-y-1 hover:ring-[#e5b04f]/35",
  "hover:shadow-[0_1.2rem_2.4rem_-0.9rem_rgb(229_176_79/0.28)]",
);
const wellChrome = "rounded-[0.48rem] bg-white/3 ring-1 ring-white/8";

/**
 * The branch-performance sparkline.
 *
 * Drawn from the content's percentages rather than shipped as an image, so it
 * stays crisp and the values live in one place. The line fades in and the
 * day-dots pop in after it — see the note on the path for why it does not
 * draw itself.
 */
function Sparkline({
  chart,
  reduce,
}: {
  chart: (typeof hero.plan)["chart"];
  reduce: boolean | null;
}) {
  const { points, marker, target } = chart;

  /*
    The box is WIDE, and its aspect is real rather than distorted.

    An earlier version used a square viewBox with `preserveAspectRatio="none"`
    to stretch it. That broke the line: motion animates `pathLength` by
    setting `stroke-dasharray`/`stroke-dashoffset`, and the browser measures
    path length in the DISTORTED coordinate space — so the dash offsets landed
    in the wrong places and the stroke rendered as disconnected segments.

    With a true aspect the geometry scales uniformly, the dash maths is
    correct, and the line draws as one continuous run.
  */
  const BOX = { width: 240, height: 72 };
  /** Inset so the end dots and the marker ring are not clipped at the edges. */
  const PAD = 5;

  const toX = (index: number) =>
    PAD + (index / (points.length - 1)) * (BOX.width - PAD * 2);
  /** y is inverted so 0 in the content is the bottom of the chart. */
  const toY = (value: number) =>
    PAD + (1 - value / 100) * (BOX.height - PAD * 2);

  const path = points
    .map(
      (value, index) =>
        `${index === 0 ? "M" : "L"} ${toX(index).toFixed(2)} ${toY(value).toFixed(2)}`,
    )
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${BOX.width} ${BOX.height}`}
      // No `preserveAspectRatio="none"` — see the note above.
      className="h-[3.9rem] w-full overflow-visible"
      aria-hidden="true"
      focusable="false"
    >
      {/* The target rule the design dashes across the chart. */}
      <line
        x1={PAD}
        y1={toY(target)}
        x2={BOX.width - PAD}
        y2={toY(target)}
        stroke="rgb(255 255 255 / 0.22)"
        strokeWidth="1"
        strokeDasharray="3 3"
        vectorEffect="non-scaling-stroke"
      />

      <motion.path
        d={path}
        fill="none"
        stroke="#b98ff5"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        /*
          The draw-on, animated as a real dash rather than motion's
          `pathLength`.

          `pathLength` normalises the path to 1 unit and leaves
          `stroke-dasharray: 0px, 1px` on the settled element — which renders
          the line as a hairline fragment if the animation is ever
          interrupted or replayed. Animating the offset over the path's own
          measured length has no such resting state: when it finishes the
          dash is exactly the line.
        */
        /*
          A plain fade-in, NOT a dash-based draw-on.

          Two earlier attempts animated the stroke: motion's `pathLength`,
          and then a hand-computed `strokeDashoffset`. Both left the settled
          element carrying a dash whose offset did not reliably return to
          zero, which renders the line as fragments or hides it entirely —
          the exact breakage this was meant to fix.

          A sparkline is seven points on a small chart; it does not need to
          draw itself. Fading the finished line in is honest about that and
          leaves no resting state that can go wrong.
        */
        initial={reduce ? { opacity: 1 } : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: "some" }}
        transition={{ duration: 0.5, delay: reduce ? 0 : 0.6, ease: easeOut }}
      />

      {/* A dot per day, with the marked one drawn as a ring. */}
      {points.map((value, index) => (
        <motion.circle
          key={index}
          cx={toX(index)}
          cy={toY(value)}
          r={index === marker ? 3.2 : 1.9}
          fill={index === marker ? "#12141d" : "#b98ff5"}
          stroke={index === marker ? "#d5b8ff" : "none"}
          strokeWidth={index === marker ? 1.8 : 0}
          initial={reduce ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: "some" }}
          transition={{
            duration: 0.3,
            delay: reduce ? 0 : 0.8 + index * 0.09,
          }}
        />
      ))}
    </svg>
  );
}

export function BizHero() {
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

  /** Shared entrance for a panel, arriving from the right. */
  const panel = (delay: number) => ({
    initial: reduce ? "shown" : "hidden",
    whileInView: "shown",
    viewport: { once: true, amount: "some" } as const,
    variants: {
      hidden: { opacity: 0, x: 26, scale: 0.98 },
      shown: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: { duration: 0.7, delay, ease: easeOut },
      },
    },
  });

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-[#050714] text-white",
        // Clearance for the floating nav pill, which overlays the page.
        "pt-28 pb-16 sm:pt-32 lg:pt-32 lg:pb-20",
      )}
    >
      {/* ===================== Background layers ====================== */}
      <Image
        src="/assets/images/biz/hero-topography.webp"
        alt=""
        aria-hidden="true"
        fill
        // This page's LCP background, so it must not lazy-load.
        priority
        sizes="100vw"
        className="pointer-events-none -z-10 object-cover object-center select-none"
      />

      {/* Deepens the left so the headline always has ground beneath it,
          whatever the topography is doing behind. */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 -z-10",
          "bg-[linear-gradient(100deg,#050714_18%,rgb(5_7_20/0.82)_38%,rgb(5_7_20/0.25)_60%,transparent_74%)]",
        )}
      />

      <Container width="hero" className="relative">
        <div
          className={cn(
            "grid items-center gap-12",
            "lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:gap-8",
            "xl:gap-10",
          )}
        >
          {/* ============================ Copy ======================== */}
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "text-[0.6875rem] font-bold tracking-[0.22em] uppercase",
                "text-[#d7d049] sm:text-xs",
              )}
            >
              {hero.eyebrow}
            </motion.p>

            <motion.h1
              {...rise(0.08)}
              className={cn(
                "mt-6 font-display font-bold tracking-[-0.03em]",
                "leading-[1.08] text-balance",
                // Measured from the design at ~58px on a 1440 frame.
                "text-[2.125rem] sm:text-[2.75rem] xl:text-[3.5rem]",
              )}
            >
              {hero.headline.map((line, index) => (
                <span key={line} className="inline lg:block">
                  {line}
                  {/* The design sets the closing stop in amber. It is kept
                      out of the string so it can be coloured without
                      splitting the word before it. */}
                  {index === hero.headline.length - 1 && (
                    <span className="text-[#e5b04f]">.</span>
                  )}{" "}
                </span>
              ))}
            </motion.h1>

            <motion.p
              {...rise(0.16)}
              className={cn(
                "mt-7 max-w-[30rem] leading-relaxed text-pretty",
                "text-[0.9375rem] text-neutral-400 sm:text-base",
              )}
            >
              {hero.description}
            </motion.p>

            {/* --------------------------- CTAs ---------------------- */}
            <motion.div {...rise(0.24)} className="mt-9 flex flex-wrap gap-4">
              <Link
                href={hero.actions.primary.href}
                className={cn(
                  "group inline-flex h-13 items-center gap-2.5 rounded-lg px-7",
                  "bg-[#e5b04f] text-[0.9375rem] font-bold text-neutral-900",
                  // `translate`, not `transform`: Tailwind v4 compiles the
                  // translate utilities to the standalone property.
                  "duration-normal transition-[background-color,box-shadow,translate] ease-out",
                  "will-change-[translate]",
                  "hover:-translate-y-0.5 hover:bg-[#f0c26a]",
                  "hover:shadow-[0_16px_34px_-12px_rgb(229_176_79/0.6)]",
                  "focus-visible:ring-2 focus-visible:ring-[#e5b04f]",
                  "focus-visible:ring-offset-2 focus-visible:ring-offset-[#050714]",
                  "focus-visible:outline-none",
                )}
              >
                {hero.actions.primary.label}
                <ArrowRightIcon
                  className={cn(
                    "duration-normal size-4 transition-transform ease-out",
                    "group-hover:translate-x-1",
                  )}
                />
              </Link>

              <a
                href={hero.actions.secondary.href}
                className={cn(
                  "group inline-flex h-13 items-center gap-2.5 rounded-lg px-7",
                  "text-[0.9375rem] font-semibold text-white",
                  "ring-1 ring-[#e5b04f]/45",
                  "duration-normal transition-[background-color,box-shadow,translate] ease-out",
                  "will-change-[translate]",
                  "hover:-translate-y-0.5 hover:bg-[#e5b04f]/10",
                  "hover:ring-[#e5b04f]/80",
                  "focus-visible:ring-2 focus-visible:ring-[#e5b04f]",
                  "focus-visible:outline-none",
                )}
              >
                {hero.actions.secondary.label}
                <ArrowRightIcon
                  className={cn(
                    "duration-normal size-4 transition-transform ease-out",
                    "group-hover:translate-x-1",
                  )}
                />
              </a>
            </motion.div>
          </div>

          {/* ========================== Panels ======================== */}
          <Uncopyable
            className={cn(
              /*
                `min-w-0` matters here: a grid item defaults to
                `min-width: auto`, so a cluster whose panels are
                intrinsically wider than their track grows past it — which
                pushed the two right-hand panels off the container's edge.
                With it, the track governs.
              */
              "min-w-0",
              "grid gap-4 sm:grid-cols-[minmax(0,1.32fr)_minmax(0,1fr)]",
              "sm:items-start",
            )}
          >
            {/* -------------------- Priorities ------------------- */}
            <motion.div
              {...panel(0.3)}
              className={cn(
                panelChrome,
                panelHover,
                "flex min-w-0 flex-col p-4 sm:p-5",
              )}
            >
              {/* Header. */}
              <div className="flex items-center gap-[0.6rem]">
                <CrosshairIcon
                  className={cn(
                    "size-[1.02rem] shrink-0 text-[#e5b04f]",
                    // `rotate`, not `transform`: Tailwind v4 compiles the
                    // rotate utilities to the standalone property.
                    "duration-slow transition-[rotate] ease-out",
                    "group-hover/panel:rotate-90",
                  )}
                />
                <p className="flex-1 text-[0.81rem] font-semibold">
                  {hero.priorities.title}
                </p>
                <MoreIcon className="size-[0.84rem] shrink-0 text-neutral-500" />
              </div>

              {/* Rows. */}
              <ul className="mt-4 space-y-2.5">
                {hero.priorities.items.map((item) => {
                  const Icon =
                    bizPanelIcons[item.icon as keyof typeof bizPanelIcons];
                  const tone = tones[item.tone];

                  return (
                    <li
                      key={item.rank}
                      className={cn(
                        wellChrome,
                        "relative flex items-center gap-[0.66rem] overflow-hidden",
                        "py-[0.72rem] pr-[0.6rem] pl-[1.02rem]",
                        // Every row lifts a little with its panel, so the
                        // list reads as one surface rather than a stack of
                        // separate cards.
                        "duration-normal transition-colors ease-out",
                        "group-hover/panel:bg-white/6",
                      )}
                    >
                      {/* The leading rule the design colours per priority. */}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute inset-y-0 left-0 w-[0.21rem]",
                          "duration-normal transition-[width] ease-out",
                          "group-hover/panel:w-[0.3rem]",
                          tone.rule,
                        )}
                      />

                      <span
                        className={cn(
                          "grid size-[1.32rem] shrink-0 place-items-center rounded-full",
                          "text-[0.66rem] font-bold ring-1",
                          tone.badge,
                        )}
                      >
                        {item.rank}
                      </span>

                      <Icon
                        className={cn(
                          "size-[0.9rem] shrink-0",
                          item.tone === "red"
                            ? tone.text
                            : item.tone === "green"
                              ? tone.text
                              : "text-[#e0a63c]",
                        )}
                      />

                      <span className="min-w-0 flex-1">
                        <span className="block text-[0.75rem] leading-snug font-medium">
                          {item.title}
                        </span>
                        <span className="mt-[0.18rem] block text-[0.63rem] text-neutral-500">
                          {item.meta}
                        </span>
                      </span>

                      <ChevronIcon className="size-[0.78rem] shrink-0 text-neutral-600" />
                    </li>
                  );
                })}
              </ul>

              {/* Why this matters. */}
              <div className={cn(wellChrome, "mt-[0.72rem] p-[0.78rem]")}>
                <p className="text-[0.72rem] font-medium">
                  {hero.priorities.why.title}
                </p>

                <div className="mt-[0.6rem] flex items-center gap-[0.48rem]">
                  {hero.priorities.why.sources.map((source) => {
                    const Icon =
                      bizPanelIcons[source.icon as keyof typeof bizPanelIcons];

                    return (
                      <span
                        key={source.label}
                        className={cn(
                          "flex flex-1 flex-col items-center gap-[0.24rem]",
                          "rounded-[0.36rem] px-[0.3rem] py-[0.48rem]",
                          "bg-white/4 ring-1 ring-white/8",
                        )}
                      >
                        <Icon className="size-[0.84rem] text-neutral-400" />
                        <span className="text-[0.57rem] text-neutral-400">
                          {source.label}
                        </span>
                      </span>
                    );
                  })}

                  {/* The call to action. Drawn, not a control — see the note
                      at the top of this file. */}
                  <span
                    className={cn(
                      "flex-[1.6] rounded-[0.36rem] px-[0.6rem] py-[0.66rem]",
                      "bg-[#e5b04f] text-center text-[0.66rem] font-semibold",
                      "text-neutral-900",
                      "duration-normal transition-[background-color] ease-out",
                      "group-hover/panel:bg-[#f0c26a]",
                    )}
                  >
                    {hero.priorities.why.action}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* ------------------ Plan and coaching -------------- */}
            <div className="flex min-w-0 flex-col gap-4">
              {/* Branch Action Plan. */}
              <motion.div
                {...panel(0.42)}
                className={cn(panelChrome, panelHover, "p-[0.78rem]")}
              >
                <div className="flex items-center gap-[0.54rem]">
                  <span className="grid size-[1.2rem] shrink-0 place-items-center rounded-[0.36rem] bg-[#4c3a86]/50">
                    <BranchIcon className="size-[0.78rem] text-[#b98ff5]" />
                  </span>
                  <p className="flex-1 text-[0.75rem] font-semibold">
                    {hero.plan.title}
                  </p>
                  <MoreIcon className="size-[0.78rem] shrink-0 text-neutral-500" />
                </div>

                {/* The two stats, split by a hairline. */}
                <div
                  className={cn(wellChrome, "mt-[0.661rem] flex p-[0.661rem]")}
                >
                  {hero.plan.stats.map((stat, index) => (
                    <div
                      key={stat.label}
                      className={cn(
                        "min-w-0 flex-1",
                        index > 0 && "border-l border-white/10 pl-[0.661rem]",
                      )}
                    >
                      <p className="text-[0.6rem] text-neutral-400">
                        {stat.label}
                      </p>
                      <p className="mt-[0.24rem] flex items-center gap-[0.36rem]">
                        <span className="text-[0.84rem] font-semibold">
                          {stat.value}
                        </span>
                        {"note" in stat && (
                          <span className="text-[0.569rem] text-neutral-500">
                            {stat.note}
                          </span>
                        )}
                        {"trend" in stat && stat.trend && (
                          <TrendIcon className="size-[0.72rem] text-[#4fb87a]" />
                        )}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Priority actions. */}
                <div className={cn(wellChrome, "mt-[0.54rem] p-[0.661rem]")}>
                  <p className="text-[0.63rem] text-neutral-300">
                    {hero.plan.actions.title}
                  </p>

                  <ul className="mt-[0.48rem] space-y-[0.419rem]">
                    {hero.plan.actions.items.map((item) => {
                      const tone = tones[item.tone];

                      return (
                        <li
                          key={item.rank}
                          className="flex items-center gap-[0.419rem]"
                        >
                          <span
                            className={cn(
                              "grid size-[0.9rem] shrink-0 place-items-center rounded-[0.21rem]",
                              "text-[0.54rem] font-bold ring-1",
                              tone.badge,
                            )}
                          >
                            {item.rank}
                          </span>
                          <span className="min-w-0 flex-1 truncate text-[0.6rem] text-neutral-200">
                            {item.label}
                          </span>
                          <span
                            className={cn(
                              "shrink-0 text-[0.569rem] font-medium",
                              tone.text,
                            )}
                          >
                            {item.level}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Branch performance. */}
                <div className={cn(wellChrome, "mt-[0.54rem] p-[0.661rem]")}>
                  <div className="flex items-start justify-between gap-[0.48rem]">
                    <p className="text-[0.63rem] text-neutral-300">
                      {hero.plan.chart.title}
                    </p>
                    <p className="shrink-0 text-right">
                      <span className="block text-[0.54rem] text-neutral-500">
                        {hero.plan.chart.note}
                      </span>
                      <span className="block text-[0.72rem] font-semibold text-[#c8e06a]">
                        {hero.plan.chart.value}
                      </span>
                    </p>
                  </div>

                  <div className="mt-[0.419rem]">
                    <Sparkline chart={hero.plan.chart} reduce={reduce} />
                  </div>

                  <div className="mt-[0.3rem] flex justify-between">
                    {hero.plan.chart.days.map((day) => (
                      <span
                        key={day}
                        className="text-[0.51rem] text-neutral-600"
                      >
                        {day}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Manager Coaching. */}
              <motion.div
                {...panel(0.54)}
                className={cn(panelChrome, panelHover, "p-[0.78rem]")}
              >
                <div className="flex items-center gap-[0.54rem]">
                  <span className="grid size-[1.2rem] shrink-0 place-items-center rounded-[0.36rem] bg-[#4c3a86]/50">
                    <PersonIcon className="size-[0.78rem] text-[#b98ff5]" />
                  </span>
                  <p className="flex-1 text-[0.75rem] font-semibold">
                    {hero.coaching.title}
                  </p>
                  <MoreIcon className="size-[0.78rem] shrink-0 text-neutral-500" />
                </div>

                <div className={cn(wellChrome, "mt-[0.661rem] p-[0.661rem]")}>
                  {/* Person and observed gap, split by a hairline. */}
                  <div className="flex items-start gap-[0.661rem]">
                    <span
                      className={cn(
                        "grid size-[1.799rem] shrink-0 place-items-center rounded-full",
                        "bg-[#6b4fb0] text-[0.661rem] font-semibold",
                      )}
                    >
                      {hero.coaching.person.initials}
                    </span>

                    <div className="min-w-0 flex-1">
                      <p className="text-[0.72rem] font-medium">
                        {hero.coaching.person.name}
                      </p>
                      <p className="mt-[0.15rem] text-[0.569rem] text-neutral-500">
                        {hero.coaching.person.role}
                      </p>
                    </div>

                    <div className="min-w-0 flex-1 border-l border-white/10 pl-[0.661rem]">
                      <p className="text-[0.569rem] text-neutral-400">
                        {hero.coaching.gap.label}
                      </p>
                      <p className="mt-[0.15rem] text-[0.63rem]">
                        {hero.coaching.gap.value}
                      </p>
                      <p className="mt-[0.24rem] flex items-center gap-[0.24rem] text-[0.54rem] text-[#e0a63c]">
                        <span aria-hidden="true">⚠</span>
                        {hero.coaching.gap.status}
                      </p>
                    </div>
                  </div>

                  {/* Suggested simulation. */}
                  <div className="mt-[0.6rem] flex items-center gap-[0.48rem] border-t border-white/8 pt-[0.6rem]">
                    <div className="min-w-0 flex-1">
                      <p className="text-[0.569rem] text-neutral-400">
                        {hero.coaching.suggestion.label}
                      </p>
                      <p className="mt-[0.15rem] text-[0.63rem]">
                        {hero.coaching.suggestion.value}
                      </p>
                    </div>
                    <ChevronIcon className="size-[0.72rem] shrink-0 text-neutral-600" />
                  </div>

                  {/* Follow-up. */}
                  <div className="mt-[0.6rem] flex items-center justify-between border-t border-white/8 pt-[0.6rem]">
                    <span className="text-[0.6rem] text-neutral-400">
                      {hero.coaching.followUp.label}
                    </span>
                    <span className="flex items-center gap-[0.36rem] text-[0.6rem] text-neutral-300">
                      <CalendarIcon className="size-[0.72rem] text-neutral-500" />
                      {hero.coaching.followUp.value}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </Uncopyable>
        </div>

        {/* =========================== Points ======================== */}
        <ul
          className={cn(
            "mt-14 grid gap-8 border-t border-white/10 pt-10",
            "sm:grid-cols-3 sm:gap-6 lg:mt-16",
          )}
        >
          {hero.points.map((point, index) => {
            const Icon = bizPointIcons[point.icon];

            return (
              <motion.li
                key={point.title}
                {...rise(0.36 + index * 0.08)}
                className={cn(
                  "group flex items-start gap-4",
                  // The design divides the three with hairlines rather than
                  // gaps, so the rule sits on the two later items only.
                  index > 0 && "sm:border-l sm:border-white/10 sm:pl-6",
                )}
              >
                <Icon
                  className={cn(
                    "size-8 shrink-0",
                    // Each point takes its own accent, as the design does:
                    // violet, amber, then green.
                    index === 0
                      ? "text-[#b98ff5]"
                      : index === 1
                        ? "text-[#e5b04f]"
                        : "text-[#4fb87a]",
                    "duration-normal transition-[scale] ease-out",
                    "group-hover:scale-110",
                  )}
                />

                <div className="min-w-0">
                  <h2 className="text-[1rem] font-semibold sm:text-[1.0625rem]">
                    {point.title}
                  </h2>
                  <p className="mt-1 text-[0.8125rem] leading-relaxed text-neutral-400 sm:text-[0.875rem]">
                    {point.description}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
