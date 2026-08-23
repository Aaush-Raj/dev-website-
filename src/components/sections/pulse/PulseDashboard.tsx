"use client";

import { motion, useReducedMotion } from "motion/react";

import {
  BarsIcon,
  BookIcon,
  ChevronRightIcon,
  HierarchyIcon,
  PeopleIcon,
  ShieldIcon,
  TargetIcon,
  ToolsIcon,
} from "@/components/sections/model/ModelIcons";
import { Uncopyable } from "@/components/ui/Uncopyable";
import { pulse } from "@/content/pulse";
import { cn } from "@/lib/utils";

import { PulseRadar } from "./PulseRadar";

/**
 * PULSE DASHBOARD
 * ---------------------------------------------------------------------------
 * The drawn product illustration in the LurnyPulse hero: a radar card with two
 * cards floating over its corners.
 *
 * DRAWN, NOT SHIPPED
 * The design supplies this as a flat PNG. It is rebuilt in markup instead, for
 * three reasons: it stays sharp at every density with nothing to download, the
 * radar animates as it enters, and the scores live in content/pulse.ts where
 * they can be changed without a round trip to design.
 *
 * The whole thing is wrapped in <Uncopyable>, so it behaves like the
 * screenshot it imitates — the text cannot be selected, dragged or copied out,
 * and it is aria-hidden. See components/ui/Uncopyable.tsx: this is
 * presentation, not protection.
 *
 * LAYOUT
 * Below lg the floating cards would overlap the radar into illegibility, so
 * they stop floating and stack underneath it. The whole illustration is scoped
 * to a fixed aspect ratio and scaled with a CSS custom property, which keeps
 * the internal proportions from drifting between breakpoints.
 *
 * AXIS LABELS
 * The radar's own labels are HTML positioned around the SVG, not <text> inside
 * it — inside, they would scale with the viewBox and fall off the page's type
 * scale. Each label is placed by percentage against the plot box.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { dashboard } = pulse.hero;
const { radar, competencies, nextStep } = dashboard;

/**
 * The five plotted axes, in clockwise order from 12 o'clock. `outsideAxis`
 * is spliced in at index 1 — the design plots it second but places its label
 * outside the card, so the content file keeps it separate. See content/pulse.ts.
 */
const plotAxes = [radar.axes[0], radar.outsideAxis, ...radar.axes.slice(1)];

/**
 * Where each axis label sits, as a percentage of the plot box, plus the
 * translation that centres it on that point. Derived from the pentagon's
 * geometry rather than computed at runtime: the labels need nudging away from
 * the plot by different amounts depending on which way they face, and a
 * formula that captured that would be longer than the table.
 *
 * Index order matches `plotAxes`. Index 1 is the outside label, which the
 * design puts beyond the card's right edge.
 */
const labelPositions = [
  // 12 o'clock — above the plot.
  { left: "50%", top: "-6%", translate: "-50%, -100%", align: "text-center" },
  // 2 o'clock — clear of the plot's upper-right vertex. Kept tighter to the
  // plot than the others: it is the label nearest the floating cards, and
  // its right edge has the least room before it disappears behind them.
  { left: "102%", top: "28%", translate: "0, -50%", align: "text-left" },
  // 5 o'clock — below the lower-right vertex.
  { left: "94%", top: "100%", translate: "0, 0", align: "text-left" },
  // 7 o'clock — below the lower-left vertex.
  { left: "6%", top: "100%", translate: "-100%, 0", align: "text-right" },
  // 10 o'clock — clear of the plot's upper-left vertex.
  { left: "-12%", top: "28%", translate: "-100%, -50%", align: "text-right" },
] as const;

/**
 * A glyph per competency row, in list order.
 *
 * The design draws five variations on one abstract mark. Reproducing that
 * would mean five near-identical icons; using ONE icon five times instead
 * reads as a rendering bug rather than a set. So each row gets a distinct
 * glyph loosely matched to its subject — which is also the more useful
 * arrangement, since the icon then carries information.
 */
const competencyIcons = [
  HierarchyIcon, // Branch Operations Management
  PeopleIcon, // Team Supervision & Capability Building
  BookIcon, // Gold Loan & Product Knowledge
  BarsIcon, // Portfolio & Collections Management
  ToolsIcon, // Sales Planning & Local Market Dev.
] as const;

/** Shared card chrome: near-black panel, hairline ring, soft lift. */
const cardChrome = cn(
  "rounded-2xl bg-[#0c0e12]/95 ring-1 ring-white/10 backdrop-blur-sm",
  "shadow-[0_24px_60px_-20px_rgb(0_0_0/0.85)]",
);

/** A score rendered as amber value + muted denominator, as in the design. */
function Score({
  value,
  outOf,
  className,
}: {
  value: number;
  outOf: number;
  className?: string;
}) {
  return (
    <span className={cn("whitespace-nowrap tabular-nums", className)}>
      <span className="font-semibold text-accent-300">{value}</span>
      <span className="text-neutral-500"> / {outOf}</span>
    </span>
  );
}

export function PulseDashboard({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  /** Entrance for a floating card. */
  const float = (delay: number) => ({
    initial: reduce ? "shown" : "hidden",
    whileInView: "shown",
    viewport: { once: true, amount: "some" } as const,
    variants: {
      hidden: { opacity: 0, y: 20, scale: 0.97 },
      shown: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.7, delay, ease: easeOut },
      },
    },
  });

  return (
    <Uncopyable className={cn("relative", className)}>
      {/* ======================== Radar card ========================== */}
      <motion.div
        {...float(0.1)}
        className={cn(cardChrome, "relative px-5 py-5 sm:px-7 sm:py-6")}
      >
        {/* ----------------------- Card header ----------------------- */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span
              className={cn(
                "grid size-7 shrink-0 place-items-center rounded-lg",
                "bg-brand-500/15 text-brand-300 ring-1 ring-brand-400/25",
              )}
            >
              <HierarchyIcon className="size-4" />
            </span>
            <p className="text-[0.9375rem] font-semibold text-white">
              {radar.title}
            </p>
          </div>

          {/* A drawing of a select control, not a control. */}
          <span
            className={cn(
              "hidden items-center gap-1.5 rounded-full sm:inline-flex",
              "border border-white/12 px-3 py-1.5",
              "text-[0.6875rem] text-neutral-400",
            )}
          >
            {radar.filter}
            <svg viewBox="0 0 12 12" className="size-3" fill="none">
              <path
                d="M3 4.5 6 7.5 9 4.5"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>

        <hr className="mt-4 border-white/8" />

        {/* -------------------------- Plot --------------------------- */}
        {/*
          Generous inline padding: the axis labels are positioned outside the
          plot box, so the padding is the room they sit in.
        */}
        {/*
          The plot is pushed to the LEFT of its card, not centred in it. The
          two cards float over this card's right edge and cover roughly its
          last 210px, so a centred plot would have its right-hand axis labels
          permanently hidden behind them — the labels are the point of the
          chart, so the plot yields the space instead.

          Hence the lopsided padding: the right value is the overhang the
          cards claim, the left is ordinary breathing room.
        */}
        {/*
          The right padding always exceeds the left, because the 2 o'clock axis
          label sits outside the plot on that side.

          The much larger lg value is doing a second job: that is the width the
          two cards float over, and the plot has to finish before them or its
          right-hand labels would be hidden behind them. Below lg the cards
          stack instead of floating, so the plot only needs room for the label
          and would otherwise sit oddly far left in an empty card.
        */}
        <div
          className={cn(
            "pt-12 pr-24 pb-14 pl-4",
            "sm:pt-14 sm:pr-32 sm:pb-16 sm:pl-8",
            "lg:pt-16 lg:pr-64 lg:pb-20 lg:pl-2",
          )}
        >
          <div className="relative mx-auto aspect-square w-full max-w-68">
            <PulseRadar
              axes={plotAxes}
              max={radar.max}
              rings={radar.rings}
              className="absolute inset-0"
            />

            {/* Ring value labels, up the vertical axis. Rendered here rather
                than in the SVG so they keep the page's type scale. */}
            {radar.rings.map((ring) => (
              <span
                key={ring}
                style={{
                  // The outer ring sits at 40/50 of the half-extent, i.e. 80%
                  // of the radius, which is 40% of the box from the centre.
                  top: `${50 - (ring / radar.max) * 40}%`,
                  left: "50%",
                }}
                className={cn(
                  "absolute translate-x-1.5 -translate-y-1/2",
                  "text-[0.5rem] text-neutral-600 tabular-nums",
                )}
              >
                {ring}
              </span>
            ))}

            {/* Axis labels. */}
            {plotAxes.map((axis, index) => {
              const position = labelPositions[index];

              return (
                <div
                  key={axis.label}
                  style={{
                    left: position.left,
                    top: position.top,
                    translate: position.translate,
                  }}
                  className={cn(
                    "absolute w-24",
                    position.align,
                    "text-[0.625rem] leading-snug text-neutral-300",
                  )}
                >
                  {axis.label}
                  <span className="mt-1 block text-[0.6875rem]">
                    <Score value={axis.score} outOf={radar.max} />
                  </span>
                </div>
              );
            })}

            {/* Centre disc: the overall readiness score. */}
            <motion.div
              initial={reduce ? "shown" : "hidden"}
              whileInView="shown"
              viewport={{ once: true, amount: "some" }}
              variants={{
                hidden: { opacity: 0, scale: 0.6 },
                shown: {
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.6, delay: 0.7, ease: easeOut },
                },
              }}
              className={cn(
                "absolute top-1/2 left-1/2 grid",
                "size-[24%] -translate-x-1/2 -translate-y-1/2",
                "place-items-center rounded-full",
                "bg-[#0a0a0f] ring-1 ring-brand-400/40",
                "shadow-[0_0_28px_-4px_rgb(127_82_220/0.55)]",
              )}
            >
              <span className="font-display text-lg font-bold text-white tabular-nums sm:text-xl">
                {radar.overall.score}
              </span>
              <span className="-mt-0.5 text-[0.5rem] text-neutral-500">
                / {radar.overall.outOf}
              </span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* ===================== Competencies card ====================== */}
      {/*
        Floats over the radar card's top-right corner on lg, where the design
        puts it. Below lg it stacks, because overlapping it at phone width
        would bury the plot.
      */}
      <motion.div
        {...float(0.3)}
        className={cn(
          cardChrome,
          "mt-5 px-5 py-5",
          "lg:absolute lg:-top-14 lg:-right-32 lg:mt-0 lg:w-72 lg:px-4 lg:py-4",
          "xl:-right-36 xl:w-76",
        )}
      >
        <div className="flex items-center gap-2.5">
          <HierarchyIcon className="size-4 shrink-0 text-brand-300" />
          <p className="text-[0.875rem] font-semibold text-white">
            {competencies.title}
          </p>
        </div>

        <ul className="mt-4 space-y-3">
          {competencies.items.map((item, index) => {
            const Icon = competencyIcons[index] ?? HierarchyIcon;

            return (
              <li key={item.label} className="flex items-start gap-2.5">
                <span
                  className={cn(
                    "mt-0.5 grid size-6 shrink-0 place-items-center rounded-full",
                    "text-brand-300 ring-1 ring-brand-400/25",
                  )}
                >
                  <Icon className="size-3" />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline justify-between gap-3">
                    <span className="truncate text-[0.75rem] text-neutral-200">
                      {item.label}
                    </span>
                    <Score
                      value={item.score}
                      outOf={competencies.outOf}
                      className="text-[0.6875rem]"
                    />
                  </span>

                  {/* The progress track. The fill grows from the left on
                    entry, staggered down the list. */}
                  <span className="mt-1.5 block h-1.5 w-full overflow-hidden rounded-full bg-white/8">
                    <motion.span
                      initial={reduce ? "shown" : "hidden"}
                      whileInView="shown"
                      viewport={{ once: true, amount: "some" }}
                      variants={{
                        hidden: { scaleX: 0 },
                        shown: {
                          scaleX: item.score / competencies.outOf,
                          transition: {
                            duration: 0.85,
                            delay: 0.55 + index * 0.08,
                            ease: easeOut,
                          },
                        },
                      }}
                      style={{ transformOrigin: "left" }}
                      className={cn(
                        "block h-full w-full rounded-full",
                        "bg-linear-to-r from-brand-400 via-brand-300 to-accent-300",
                      )}
                    />
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      </motion.div>

      {/* ======================= Next step card ======================= */}
      <motion.div
        {...float(0.45)}
        className={cn(
          cardChrome,
          "mt-5 px-5 py-5",
          "lg:absolute lg:-right-32 lg:-bottom-16 lg:mt-0 lg:w-72 lg:px-4 lg:py-4",
          "xl:-right-36 xl:w-76",
        )}
      >
        <div className="flex items-center gap-2.5">
          <TargetIcon className="size-4 shrink-0 text-brand-300" />
          <p className="text-[0.875rem] font-semibold text-white">
            {nextStep.title}
          </p>
        </div>

        {/* The inner panel, ringed as in the design. */}
        <div className="mt-4 rounded-xl p-4 ring-1 ring-white/8">
          <div className="flex items-start gap-3">
            {/* Shield in a ring that runs violet into amber — the design's
                progress arc around the skill glyph. */}
            <span className="relative grid size-9 shrink-0 place-items-center">
              <span
                className={cn(
                  "absolute inset-0 rounded-full",
                  "bg-[conic-gradient(from_220deg,#fccb46,#a982f5_45%,#3a2a5e_75%,#fccb46)]",
                )}
              />
              <span className="absolute inset-[1.5px] rounded-full bg-[#0c0e12]" />
              <ShieldIcon className="relative size-4 text-white" />
            </span>

            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <p className="text-[0.8125rem] font-semibold text-white">
                  {nextStep.skill}
                </p>
                <ChevronRightIcon className="mt-0.5 size-3.5 shrink-0 text-neutral-600" />
              </div>

              <p className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[0.6875rem] text-neutral-400">
                {nextStep.scoreLabel}{" "}
                <Score value={nextStep.score} outOf={nextStep.outOf} />
                <span className="text-neutral-700">·</span>
                <span className="font-medium text-accent-300">
                  {nextStep.level}
                </span>
                <ChevronRightIcon className="size-3 text-neutral-600" />
              </p>
            </div>
          </div>

          <p className="mt-3 text-[0.6875rem] leading-relaxed text-neutral-400">
            {nextStep.description}
          </p>

          {/* A drawing of a button, not a button — the whole illustration is
              inert and aria-hidden. */}
          <span
            className={cn(
              "mt-4 inline-flex items-center gap-2 rounded-lg",
              "bg-brand-500/12 px-3 py-2 ring-1 ring-brand-400/25",
              "text-[0.75rem] font-medium text-brand-200",
            )}
          >
            {nextStep.action}
            <svg viewBox="0 0 16 16" className="size-3.5" fill="none">
              <path
                d="M3 8h9m0 0-3.2-3.2M12 8l-3.2 3.2"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </motion.div>
    </Uncopyable>
  );
}
