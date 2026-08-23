"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { Uncopyable } from "@/components/ui/Uncopyable";
import { chat } from "@/content/chat";
import { cn } from "@/lib/utils";

/**
 * CHAT DASHBOARD
 * ---------------------------------------------------------------------------
 * The drawn product illustration in the LurnyChat hero: the LurnyDesk chat
 * window (nav rail · answer column · sources rail), with three product cards
 * overlapping its bottom edge.
 *
 * DRAWN, NOT SHIPPED
 * The design supplies this as a large PNG. It is rebuilt in markup instead so
 * it stays sharp at every density, animates in, and reads its copy from
 * content/chat.ts. Only the card THUMBNAILS are real images — placeholders,
 * standing in for the visual-story and dialogue artwork the product generates.
 *
 * The whole thing is wrapped in <Uncopyable>, so it behaves like the screenshot
 * it imitates — the text cannot be selected or dragged out, and it is
 * aria-hidden. See components/ui/Uncopyable.tsx: this is presentation, not
 * protection.
 *
 * LAYOUT
 * Above lg the three cards float, overlapping the chat window's lower edge as
 * in the design. Below lg they would collide into illegibility, so they stop
 * floating and stack underneath. The internal type is a touch small — this is a
 * shrunk product shot, not a live UI — which is why it is aria-hidden.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { dashboard } = chat.hero;
const { user, nav, answer, composer, sources, cards } = dashboard;

/** A small circled index, matching the design's numbered citation chips. */
function Cite({ n }: { n: number }) {
  return (
    <span
      className={cn(
        "ml-1 inline-flex size-3.5 items-center justify-center rounded-full",
        "border border-brand-400/50 text-[8px] font-semibold text-brand-200/90",
        "align-middle",
      )}
    >
      {n}
    </span>
  );
}

export function ChatDashboard({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduce ? "shown" : "hidden",
    whileInView: "shown",
    viewport: { once: true, amount: "some" } as const,
    variants: {
      hidden: { opacity: 0, y: 22 },
      shown: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay, ease: easeOut },
      },
    },
  });

  // A gentle lift on hover — reduced-motion users get nothing. The spring lives
  // ON the hover target (not as a top-level `transition`) so it shapes only the
  // hover, leaving the `rise` entrance easing untouched. A soft spring gives it
  // the settled, professional feel rather than a linear slide.
  const hover = reduce
    ? {}
    : {
        whileHover: {
          y: -6,
          transition: { type: "spring", stiffness: 260, damping: 22 } as const,
        },
      };

  // Per-card hover: a slightly larger lift than the window, plus a small scale,
  // so a card reads as "coming forward" over the shot. whileHover composes with
  // the `rise` variants — Motion merges the gesture with the variant animation.
  const cardHover = reduce
    ? {}
    : {
        whileHover: {
          y: -8,
          scale: 1.02,
          transition: { type: "spring", stiffness: 300, damping: 20 } as const,
        },
      };

  return (
    <Uncopyable className={cn("group/dash relative", className)}>
      {/* ===================== The LurnyDesk window ===================== */}
      <motion.div
        {...rise(0.15)}
        {...hover}
        className={cn(
          "relative overflow-hidden rounded-2xl",
          "border border-ink-border/50 bg-[#0d0d13]",
          "shadow-[0_40px_90px_-40px_rgb(0_0_0/0.9)]",
          // Smooth border/shadow bloom on hover, independent of the lift.
          "transition-[border-color,box-shadow] duration-500 ease-out",
          "hover:border-brand-400/40 hover:shadow-[0_50px_120px_-40px_rgb(88_40_180/0.55)]",
        )}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
          <span className="text-[11px] font-semibold tracking-wide text-neutral-200">
            {dashboard.appName}
          </span>
          <span className="flex items-center gap-2">
            <span className="hidden text-[10px] text-neutral-400 sm:inline">
              {dashboard.prompt}
            </span>
            <span className="size-5 rounded-full bg-brand-500" />
          </span>
        </div>

        <div className="grid grid-cols-[8.5rem_1fr] sm:grid-cols-[11rem_1fr_9.5rem]">
          {/* ------------------------- Nav rail ------------------------ */}
          <div className="border-r border-white/5 p-3">
            {/* User */}
            <div className="mb-4 flex items-center gap-2">
              <span className="size-7 shrink-0 rounded-full bg-gradient-to-br from-brand-400 to-brand-700" />
              <span className="min-w-0">
                <span className="block truncate text-[10px] font-semibold text-neutral-100">
                  {user.name}
                </span>
                <span className="block truncate text-[8px] text-neutral-500">
                  {user.email}
                </span>
              </span>
            </div>
            <span className="mb-3 block text-[9px] font-bold text-accent-300">
              {user.xp}
            </span>

            {/* Grouped nav */}
            <span className="mb-1.5 flex items-center justify-between rounded-md bg-white/5 px-2 py-1 text-[9px] text-neutral-300">
              {nav.group}
              <span className="text-neutral-600">▾</span>
            </span>
            <ul className="space-y-0.5">
              {nav.items.map((item) => (
                <li
                  key={item.label}
                  className={cn(
                    "truncate rounded-md px-2 py-1 text-[9px]",
                    item.active
                      ? "bg-accent-300/15 font-medium text-accent-200"
                      : "text-neutral-400",
                  )}
                >
                  {item.label}
                </li>
              ))}
            </ul>
            <ul className="mt-3 space-y-1.5">
              {nav.sections.map((label) => (
                <li
                  key={label}
                  className="flex items-center justify-between text-[9px] text-neutral-400"
                >
                  {label}
                  <span className="text-neutral-600">›</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ------------------------- Answer column ------------------- */}
          <div className="min-w-0 p-5">
            {/* Greeting */}
            <div className="mb-3.5 flex gap-2.5">
              <span className="mt-0.5 size-5 shrink-0 rounded-full bg-accent-300/90" />
              <p className="text-[11px] leading-relaxed text-neutral-300">
                {answer.greeting}
                <Cite n={1} />
              </p>
            </div>

            <p className="mb-3.5 text-[11px] leading-relaxed text-neutral-400">
              {answer.intro}
              <Cite n={3} />
            </p>

            <p className="mb-2.5 text-[11px] font-medium text-neutral-200">
              {answer.listTitle}
            </p>
            <ul className="space-y-2">
              {answer.points.map((point, i) => (
                <li
                  key={point.term}
                  className="flex gap-2 text-[10.5px] leading-relaxed text-neutral-400"
                >
                  <span className="mt-1 size-1 shrink-0 rounded-full bg-brand-400" />
                  <span>
                    <span className="font-semibold text-neutral-200">
                      {point.term}:
                    </span>{" "}
                    {point.body}
                    <Cite n={i + 4} />
                  </span>
                </li>
              ))}
            </ul>

            {/* Composer */}
            <div className="mt-4 rounded-lg border border-white/8 bg-white/[0.03] p-2.5">
              <span className="block text-[9px] text-neutral-500">
                {composer.placeholder}
              </span>
              <span className="mt-2 flex items-center justify-between border-t border-white/5 pt-2">
                <span>
                  <span className="block text-[9px] font-medium text-neutral-300">
                    {composer.scope}
                  </span>
                  <span className="block text-[8px] text-neutral-500">
                    {composer.scopeSub}
                  </span>
                </span>
                <span className="text-neutral-600">⇅</span>
              </span>
            </div>
          </div>

          {/* ------------------------- Sources rail ------------------- */}
          <div className="hidden border-l border-white/5 p-3.5 sm:block">
            <span className="mb-2.5 block text-[11px] font-semibold text-neutral-200">
              {sources.title}
            </span>
            <ul className="space-y-2">
              {sources.items.map((item, i) => (
                <li
                  key={item}
                  className={cn(
                    "rounded-md border border-white/6 bg-white/[0.02] px-2 py-2",
                    // Individual source rows lift toward the pointer too.
                    "transition-colors duration-300 hover:border-brand-400/40 hover:bg-brand-500/8",
                  )}
                >
                  <span className="flex items-start gap-1.5">
                    <span className="mt-0.5 text-[9px] text-brand-300">◈</span>
                    <span>
                      <span className="block text-[9.5px] leading-tight text-neutral-300">
                        {item}
                      </span>
                      <span className="text-[7.5px] text-neutral-600">PDF</span>
                    </span>
                    <span className="ml-auto text-[7.5px] text-neutral-600">
                      {i + 1}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
            <span className="mt-2.5 flex items-center justify-center gap-1 rounded-md border border-brand-400/30 py-1.5 text-[9.5px] font-medium text-brand-200 transition-colors duration-300 hover:border-brand-300 hover:bg-brand-500/10">
              {sources.viewAll} →
            </span>
          </div>
        </div>
      </motion.div>

      {/* ========================= Floating cards ====================== */}
      {/*
        Above lg the cards overlap the window's lower edge (negative top
        margin) and sit in a 3-up row; below lg they stack normally.
      */}
      <div
        className={cn(
          "relative z-10 mt-4 grid gap-3",
          "sm:grid-cols-2 lg:-mt-16 lg:grid-cols-3",
        )}
      >
        <SahiyogCard {...rise(0.3)} {...cardHover} />
        <MindsCard {...rise(0.4)} {...cardHover} />
        <SimulationCard {...rise(0.5)} {...cardHover} />
      </div>
    </Uncopyable>
  );
}

/* ---------------------------------------------------------------------------
   The three cards. Each is a motion.div so it can accept the shared `rise`
   variants (and the hover gesture) spread from the parent.
   ------------------------------------------------------------------------- */

/** The subset of motion props the parent spreads onto each card. */
type CardMotion = Record<string, unknown>;

const cardShell = cn(
  "overflow-hidden rounded-xl border border-ink-border/50",
  "bg-[#101018] p-3 shadow-[0_24px_60px_-30px_rgb(0_0_0/0.9)]",
  // Border/shadow bloom on hover — the lift itself is the motion gesture.
  "transition-[border-color,box-shadow] duration-400 ease-out",
  "hover:border-brand-400/50 hover:shadow-[0_36px_80px_-28px_rgb(88_40_180/0.6)]",
  "cursor-default",
);

function SahiyogCard(motionProps: CardMotion) {
  const { sahiyog } = cards;
  return (
    <motion.div {...motionProps} className={cardShell}>
      <span className="block text-[11px] font-semibold text-accent-200">
        {sahiyog.title}
      </span>
      <span className="mt-0.5 block text-[8.5px] text-neutral-500">
        {sahiyog.subtitle}
      </span>
      <span className="mt-2 inline-flex items-center gap-1 rounded-md bg-white/5 px-2 py-1 text-[8px] text-neutral-400">
        🌐 {sahiyog.filter} ▾
      </span>
      <div className="mt-2.5 grid grid-cols-2 gap-2">
        {sahiyog.items.map((item) => (
          <div key={item.title} className="min-w-0">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image
                src={item.image}
                alt=""
                fill
                sizes="120px"
                className="object-cover"
              />
              <span className="absolute top-1 right-1 rounded bg-black/60 px-1 py-0.5 text-[6.5px] text-neutral-200">
                {item.badge}
              </span>
            </div>
            <span className="mt-1 block text-[8px] leading-tight text-neutral-300">
              {item.title}
            </span>
            <span className="mt-0.5 inline-block rounded bg-white/5 px-1.5 py-0.5 text-[7px] text-neutral-500">
              {item.questions}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function MindsCard(motionProps: CardMotion) {
  const { minds } = cards;
  return (
    <motion.div {...motionProps} className={cardShell}>
      <span className="flex items-center gap-1.5">
        <span className="size-4 rounded-full bg-brand-500" />
        <span className="text-[11px] font-semibold text-neutral-100">
          {minds.title}
        </span>
      </span>
      <span className="mt-0.5 block text-[8.5px] text-neutral-500">
        {minds.subtitle}
      </span>
      <span className="mt-2 inline-flex items-center gap-1 rounded-md bg-white/5 px-2 py-1 text-[8px] text-neutral-400">
        {minds.filter} ▾
      </span>

      <div className="relative mt-2.5 overflow-hidden rounded-lg">
        <div className="relative aspect-[16/9]">
          <Image
            src={minds.image}
            alt=""
            fill
            sizes="200px"
            className="object-cover"
          />
        </div>
        <span className="bg-success-500/90 absolute top-1.5 left-1.5 rounded px-1.5 py-0.5 text-[6.5px] font-bold tracking-wide text-white">
          {minds.badge}
        </span>
        <span className="absolute top-1.5 right-1.5 rounded bg-black/60 px-1.5 py-0.5 text-[6.5px] text-neutral-200">
          ⏱ {minds.duration}
        </span>
        <span className="absolute bottom-1.5 left-1.5 text-[7px] text-neutral-300">
          ● {minds.learners}
        </span>
      </div>

      <span className="mt-2 block text-[10px] font-semibold text-neutral-100">
        {minds.topic}
      </span>
      <span className="mt-0.5 block text-[8px] leading-tight text-neutral-500">
        {minds.body}
      </span>
      <span className="mt-2 flex items-center justify-between">
        <span className="bg-success-500/10 text-success-500 inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[7.5px]">
          ◆ {minds.topicsPill}
        </span>
        <span className="text-[8px] font-medium text-brand-200">
          ✦ {minds.cta}
        </span>
      </span>
    </motion.div>
  );
}

function SimulationCard(motionProps: CardMotion) {
  const { simulation } = cards;
  return (
    <motion.div {...motionProps} className={cardShell}>
      <span className="block text-[11px] leading-tight font-semibold text-neutral-100">
        {simulation.title}
      </span>
      <span className="mt-1 block text-[8px] text-neutral-500">
        ← {simulation.back}
      </span>

      <div className="mt-2.5 flex items-center gap-2 rounded-lg border border-white/6 bg-white/[0.02] p-2">
        <span className="from-danger-500 size-6 rounded-full bg-gradient-to-br to-brand-700" />
        <span>
          <span className="block text-[9px] font-semibold text-neutral-200">
            {simulation.persona.name}
          </span>
          <span className="text-danger-500 block text-[8px]">
            {simulation.persona.role}
          </span>
        </span>
      </div>

      <div className="mt-2 flex gap-3 text-[8px] text-neutral-400">
        {simulation.stats.map((stat) => (
          <span key={stat.label}>
            {stat.label}:{" "}
            <span className="font-semibold text-neutral-200">{stat.value}</span>
          </span>
        ))}
      </div>

      <div className="mt-2.5 flex items-center justify-between">
        <span className="flex items-center gap-2">
          <span className="border-danger-500 flex size-9 items-center justify-center rounded-full border-2 text-[13px] font-bold text-neutral-100">
            {simulation.score.value}
          </span>
          <span>
            <span className="block text-[7px] tracking-wide text-neutral-500">
              {simulation.score.caption}
            </span>
            <span className="text-danger-500 block text-[8px] font-bold">
              {simulation.score.label}
            </span>
          </span>
        </span>
        <span className="rounded bg-accent-300/15 px-1.5 py-0.5 text-[7.5px] font-medium text-accent-200">
          ✦ {simulation.xp}
        </span>
      </div>

      <div className="mt-2.5 grid grid-cols-2 gap-1.5">
        <span className="bg-success-500/15 text-success-500 rounded-md py-1 text-center text-[7.5px] font-medium">
          {simulation.actions[0]}
        </span>
        <span className="rounded-md bg-brand-500 py-1 text-center text-[7.5px] font-medium text-white">
          {simulation.actions[1]}
        </span>
      </div>
    </motion.div>
  );
}
