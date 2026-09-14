"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { heroEngines } from "@/content/hero";
import { cn } from "@/lib/utils";

/**
 * HERO — THE ENGINE CONSTELLATION (slide 3's visual)
 * ---------------------------------------------------------------------------
 * Five engine panels over an office desk, threaded by a connector, with an
 * integrations bar closing the composition.
 *
 * ONLY THE PHOTOGRAPH AND THE THUMBNAILS ARE RASTERS
 * The pack ships all six panels as PNG crops with their copy baked in; all are
 * deliberately unused, since that text would be soft at hero size and invisible
 * to a screen reader. The background is supplied reconstructed WITHOUT them,
 * which is what makes rebuilding possible.
 *
 * THE CONNECTOR
 * One path threading all six, drawn because the clean plate has none. It draws
 * along its length as the panels land, so the composition assembles rather than
 * appearing — the same beat as the other two slides.
 *
 * THE PANELS SCALE AS ONE OBJECT
 * Positioned in percentages of the scene and sized in `em` off a `cqw` root, so
 * the arrangement holds at every width. Below lg they leave the photograph and
 * become a plain grid — six overlapping panels at phone width are unreadable.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

/**
 * Where each panel sits over the scene, and when it arrives. Measured from the
 * design reference against the SCENE's own box, not the whole page frame.
 */
const SLOTS = {
  magic: { slot: "left-[8%] top-[15.5%] w-[38%]", delay: 0.4 },
  pitch: { slot: "left-[50%] top-[15.5%] w-[32%]", delay: 0.55 },
  kxp: { slot: "left-[12%] top-[42.5%] w-[36%]", delay: 0.7 },
  chat: { slot: "left-[54%] top-[38.5%] w-[32%]", delay: 0.85 },
  biz: { slot: "left-[54%] top-[59%] w-[29%]", delay: 1.0 },
  integrations: { slot: "left-[16.5%] top-[75%] w-[63%]", delay: 1.15 },
} as const;

export function HeroEngines({
  className,
  active = true,
}: {
  className?: string;
  /** Whether the owning slide is showing. Off-screen slides do not animate. */
  active?: boolean;
}) {
  const reduce = useReducedMotion();
  const still = reduce || !active;

  /** Shared arrival for the six panels. */
  const arrive = (delay: number) => ({
    initial: still
      ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
      : { opacity: 0, y: 20, scale: 0.96, filter: "blur(7px)" },
    animate: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
    transition: {
      duration: still ? 0 : 0.8,
      delay: still ? 0 : delay,
      ease: easeOut,
    },
  });

  return (
    <div className={cn("@container relative", className)}>
      {/* The photograph is NOT rendered here: it is the whole section's
          background, drawn by Hero from the slide's `backdrop`. This box only
          holds the panels, and keeps the scene's aspect so their percentage
          positions still land where the design puts them. */}
      <div className="relative aspect-[1.45] lg:aspect-[1.14]">


        {/* ------------------------- Connector ------------------- */}
        {/* A viewBox matching the scene's own ratio so it scales uniformly —
            stretching one renders the animated stroke as broken dashes. */}
        <svg
          viewBox="0 0 114 100"
          fill="none"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden size-full lg:block"
        >
          <motion.path
            d="M 30 40 C 26 22, 40 12, 56 14 C 76 16, 96 20, 100 36 C 103 52, 86 62, 68 66 C 50 70, 34 58, 30 46"
            stroke="var(--brand-400)"
            strokeWidth="0.5"
            strokeLinecap="round"
            opacity="0.8"
            initial={{ pathLength: still ? 1 : 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: still ? 0 : 1.8,
              delay: still ? 0 : 0.5,
              ease: easeOut,
            }}
          />

          {/* The nodes the line runs between. */}
          {[
            [56, 14],
            [100, 36],
            [68, 66],
            [30, 43],
          ].map(([x, y], index) => (
            <motion.circle
              key={`${x}-${y}`}
              cx={x}
              cy={y}
              r="1.1"
              fill="var(--brand-400)"
              initial={{ opacity: still ? 1 : 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: still ? 0 : 0.35,
                delay: still ? 0 : 0.9 + index * 0.16,
              }}
            />
          ))}
        </svg>

        {/* -------------------------- Panels --------------------- */}
        <div
          className="pointer-events-none absolute inset-0 hidden lg:block"
          // Scales the panels with the scene, so they hold their designed
          // proportion at every width.
          style={{ fontSize: "max(9px, 1.26cqw)" }}
        >
          <motion.div {...arrive(SLOTS.magic.delay)} className={cn("absolute", SLOTS.magic.slot)}>
            <MagicPanel />
          </motion.div>

          <motion.div {...arrive(SLOTS.pitch.delay)} className={cn("absolute", SLOTS.pitch.slot)}>
            <PitchPanel />
          </motion.div>

          <motion.div {...arrive(SLOTS.kxp.delay)} className={cn("absolute", SLOTS.kxp.slot)}>
            <KxpPanel />
          </motion.div>

          <motion.div {...arrive(SLOTS.chat.delay)} className={cn("absolute", SLOTS.chat.slot)}>
            <ChatPanel />
          </motion.div>

          <motion.div {...arrive(SLOTS.biz.delay)} className={cn("absolute", SLOTS.biz.slot)}>
            <BizPanel />
          </motion.div>

          <motion.div
            {...arrive(SLOTS.integrations.delay)}
            className={cn("absolute", SLOTS.integrations.slot)}
          >
            <IntegrationsBar />
          </motion.div>
        </div>
      </div>

      {/* --------------------- Panels, stacked ------------------- */}
      <div className="mt-4 grid gap-3 text-[11px] sm:grid-cols-2 sm:items-start lg:hidden">
        <MagicPanel />
        <PitchPanel />
        <KxpPanel />
        <ChatPanel />
        <BizPanel />
        <div className="sm:col-span-2">
          <IntegrationsBar />
        </div>
      </div>
    </div>
  );
}

/* ========================================================================== */
/*  Panel chrome                                                              */
/* ========================================================================== */

function Panel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[1.1em] bg-white/97 p-[1em] backdrop-blur-sm",
        "shadow-[0_18px_42px_-16px_rgb(25_20_60/0.32)]",
        "ring-1 ring-white/70",
        className,
      )}
    >
      {children}
    </div>
  );
}

/**
 * Each panel's header: the engine mark, its two-tone name, the tagline, and
 * the overflow dots the design puts on every card.
 */
function PanelHead({
  name,
  tagline,
  children,
}: {
  name: readonly string[];
  tagline: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-[0.8em]">
      <span className="grid size-[2.6em] shrink-0 place-items-center rounded-[0.7em] bg-brand-100">
        {children}
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-[1.15em] leading-tight font-bold tracking-[-0.01em] text-neutral-900">
          {/* Two tones, as the design sets it: the product prefix in neutral,
              the engine name in brand. */}
          {name[0]}
          <span className="text-brand-600">{name[1]}</span>
        </span>
        <span className="mt-[0.1em] block text-[0.9em] text-neutral-500">
          {tagline}
        </span>
      </span>

      <span aria-hidden="true" className="mt-[0.5em] flex shrink-0 gap-[0.22em]">
        {[0, 1, 2].map((dot) => (
          <span key={dot} className="block size-[0.26em] rounded-full bg-neutral-400" />
        ))}
      </span>
    </div>
  );
}

/* ========================================================================== */
/*  The six panels                                                            */
/* ========================================================================== */

/** LurnyMagic — a lesson being created. */
function MagicPanel() {
  const { magic } = heroEngines;

  return (
    <Panel>
      <PanelHead name={magic.name} tagline={magic.tagline}>
        <SparkIcon className="size-[1.4em] text-brand-600" />
      </PanelHead>

      <div className="mt-[0.9em] flex items-start gap-[0.9em]">
        <span className="relative block w-[45%] shrink-0 overflow-hidden rounded-[0.6em]">
          <Image
            src={magic.thumb.src}
            alt={magic.thumb.alt}
            width={magic.thumb.width}
            height={magic.thumb.height}
            sizes="240px"
            className="h-[4.4em] w-full object-cover"
          />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex size-[2em] items-center justify-center rounded-full bg-white/95 shadow-sm">
              <PlayIcon className="size-[0.9em] text-brand-600" />
            </span>
          </span>
        </span>

        <span className="min-w-0 flex-1">
          <span className="block text-[0.95em] font-semibold text-neutral-900">
            {magic.subject}
          </span>

          {/* Skeleton lines, as the design draws them — a stand-in for the
              lesson body rather than invented copy. */}
          <span aria-hidden="true" className="mt-[0.6em] block space-y-[0.35em]">
            <span className="block h-[0.34em] w-full rounded-full bg-neutral-200" />
            <span className="block h-[0.34em] w-[72%] rounded-full bg-neutral-200" />
          </span>

          <span
            className={cn(
              "mt-[0.7em] flex w-fit items-center gap-[0.4em] rounded-full",
              "bg-emerald-50 px-[0.7em] py-[0.3em]",
            )}
          >
            <CheckIcon className="size-[0.95em] shrink-0 text-emerald-600" />
            <span className="text-[0.82em] font-medium text-emerald-700">
              {magic.status}
            </span>
          </span>
        </span>
      </div>
    </Panel>
  );
}

/** LurnyPitch — a conversation being analysed. */
function PitchPanel() {
  const { pitch } = heroEngines;

  return (
    <Panel>
      <PanelHead name={pitch.name} tagline={pitch.tagline}>
        <WaveIcon className="size-[1.4em] text-brand-600" />
      </PanelHead>

      <div className="mt-[0.9em] flex items-center gap-[0.7em]">
        {/* The waveform is drawn rather than shipped: the supplied crop is a
            237x35 raster that would blur. Heights are fixed, not random, so the
            panel renders identically on the server and the client. */}
        <span aria-hidden="true" className="flex h-[1.8em] flex-1 items-center gap-[0.1em]">
          {WAVEFORM.map((height, index) => (
            <span
              key={index}
              className="w-[0.14em] flex-1 rounded-full bg-brand-400"
              style={{ height: `${height}%` }}
            />
          ))}
        </span>

        <span className="shrink-0 text-[0.85em] text-neutral-500 tabular-nums">
          {pitch.duration}
        </span>
      </div>

      <p className={cn("mt-[0.8em] flex items-center gap-[0.6em] rounded-[0.6em]", "bg-neutral-100 px-[0.8em] py-[0.6em]")}>
        <BulbIcon className="size-[1.1em] shrink-0 text-brand-600" />
        <span className="min-w-0 flex-1 truncate text-[0.9em] text-neutral-800">
          {pitch.insight}
        </span>
        <ChevronIcon className="size-[0.8em] shrink-0 text-neutral-400" />
      </p>
    </Panel>
  );
}

/** LurnyKxP — the learner's recommended courses. */
function KxpPanel() {
  const { kxp } = heroEngines;

  return (
    <Panel>
      <PanelHead name={kxp.name} tagline={kxp.tagline}>
        <BookIcon className="size-[1.4em] text-brand-600" />
      </PanelHead>

      <p className="mt-[0.9em] text-[0.9em] text-neutral-500">{kxp.label}</p>

      <ul className="mt-[0.6em] grid grid-cols-3 gap-[0.6em]">
        {kxp.courses.map((course) => (
          <li key={course.title.join(" ")}>
            <Image
              src={course.thumb.src}
              alt={course.thumb.alt}
              width={course.thumb.width}
              height={course.thumb.height}
              sizes="160px"
              className="h-[3.4em] w-full rounded-[0.5em] object-cover"
            />
            <span className="mt-[0.45em] block text-[0.82em] leading-tight text-neutral-700">
              {course.title.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </span>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

/** LurnyChat — guidance in the moment. */
function ChatPanel() {
  const { chat } = heroEngines;

  return (
    <Panel>
      <PanelHead name={chat.name} tagline={chat.tagline}>
        <ChatIcon className="size-[1.4em] text-brand-600" />
      </PanelHead>

      <div className="mt-[0.9em] flex items-start gap-[0.7em]">
        <span className="grid size-[2.4em] shrink-0 place-items-center rounded-full bg-brand-100">
          <BotIcon className="size-[1.3em] text-brand-600" />
        </span>

        <span className="min-w-0 flex-1 space-y-[0.5em]">
          <span className="block w-fit rounded-[0.6em] bg-neutral-100 px-[0.8em] py-[0.5em] text-[0.9em] text-neutral-800">
            {chat.prompt}
          </span>
          <span className="block w-fit rounded-[0.6em] bg-brand-50 px-[0.8em] py-[0.5em] text-[0.9em] font-medium text-brand-700">
            {chat.reply}
          </span>
        </span>
      </div>
    </Panel>
  );
}

/** LurnyBiz — insight turned into a next step. */
function BizPanel() {
  const { biz } = heroEngines;

  return (
    <Panel>
      <PanelHead name={biz.name} tagline={biz.tagline}>
        <ChartIcon className="size-[1.4em] text-brand-600" />
      </PanelHead>

      <div className="mt-[0.9em] flex items-end gap-[0.9em]">
        {/* The bar chart, drawn rather than shipped — see the content file for
            why the heights are fixed. */}
        <span aria-hidden="true" className="flex h-[2.6em] shrink-0 items-end gap-[0.25em]">
          {biz.bars.map((height, index) => (
            <span
              key={index}
              className={cn(
                "w-[0.5em] rounded-[0.15em]",
                // The tallest bar is the one the recommendation points at.
                index === 3 ? "bg-accent-400" : "bg-brand-300",
              )}
              style={{ height: `${height}%` }}
            />
          ))}
        </span>

        <span className="flex min-w-0 flex-1 items-center gap-[0.5em] border-l border-neutral-200 pl-[0.8em]">
          <span className="min-w-0 flex-1 text-[0.88em] leading-tight text-neutral-800">
            {biz.action.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </span>
          <ChevronIcon className="size-[0.8em] shrink-0 text-neutral-400" />
        </span>
      </div>
    </Panel>
  );
}

/** The bar closing the composition. */
function IntegrationsBar() {
  const { integrations } = heroEngines;

  return (
    <Panel className="flex items-center gap-[1em] !py-[0.8em]">
      <span className="grid size-[2.4em] shrink-0 place-items-center rounded-[0.6em] bg-brand-100">
        <LinkIcon className="size-[1.2em] text-brand-600" />
      </span>

      <span className="min-w-0 flex-1 truncate text-[0.95em] font-medium text-neutral-800">
        {integrations.label}
      </span>

      <span className="flex shrink-0 items-center gap-[0.5em] border-l border-neutral-200 pl-[1em]">
        {integrations.systems.map((system) => (
          <span
            key={system}
            className={cn(
              "rounded-[0.4em] bg-brand-50 px-[0.7em] py-[0.3em]",
              "font-mono text-[0.78em] font-medium tracking-[0.06em] text-brand-700",
            )}
          >
            {system}
          </span>
        ))}
      </span>
    </Panel>
  );
}

/**
 * The Pitch waveform's bar heights, as percentages.
 *
 * Fixed rather than generated: a random pattern would differ between the server
 * render and the client hydration.
 */
const WAVEFORM = [
  30, 52, 38, 70, 46, 84, 58, 40, 74, 50, 92, 62, 36, 78, 52, 68, 44, 88, 60,
  34, 72, 48, 64, 40, 86, 56, 46, 76, 38, 58, 50, 80, 42, 60, 32, 70, 48, 30,
] as const;

/* ========================================================================== */
/*  Icons                                                                     */
/* ========================================================================== */

function SparkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path d="M8 1.4 9.4 5.9 14 7.3 9.4 8.7 8 13.2 6.6 8.7 2 7.3l4.6-1.4L8 1.4Z" fill="currentColor" />
    </svg>
  );
}

function WaveIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path
        d="M2.5 6.6v2.8M5.5 4.2v7.6M8.5 2.2v11.6M11.5 5v6M14 7v2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path
        d="M2.4 3.2h4.1c.8 0 1.5.7 1.5 1.5v8c0-.7-.7-1.3-1.5-1.3H2.4V3.2ZM13.6 3.2H9.5c-.8 0-1.5.7-1.5 1.5v8c0-.7.7-1.3 1.5-1.3h4.1V3.2Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChatIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path
        d="M8 2.6c3.1 0 5.7 1.9 5.7 4.3S11.1 11.2 8 11.2c-.6 0-1.2-.1-1.8-.2l-2.9 1.4.8-2.4C3 9.3 2.3 8.2 2.3 6.9 2.3 4.5 4.9 2.6 8 2.6Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ChartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path d="M3 13.5V9M8 13.5V3M13 13.5V6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function BotIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <rect x="2.6" y="4.6" width="10.8" height="8.2" rx="2.2" stroke="currentColor" strokeWidth="1.3" />
      <path d="M8 2.2v2.4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="6" cy="8.4" r="0.9" fill="currentColor" />
      <circle cx="10" cy="8.4" r="0.9" fill="currentColor" />
      <path d="M6.2 10.8h3.6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function LinkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path
        d="M6.6 9.4a2.8 2.8 0 0 0 4 0l2-2a2.8 2.8 0 1 0-4-4l-1 1M9.4 6.6a2.8 2.8 0 0 0-4 0l-2 2a2.8 2.8 0 1 0 4 4l1-1"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BulbIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path
        d="M8 1.8a4.2 4.2 0 0 0-2.4 7.6c.4.3.6.7.6 1.2h3.6c0-.5.2-.9.6-1.2A4.2 4.2 0 0 0 8 1.8Z"
        fill="currentColor"
      />
      <path d="M6.4 12.4h3.2M7 14h2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path d="M5.5 3.4 12 8l-6.5 4.6V3.4Z" fill="currentColor" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <circle cx="8" cy="8" r="7" fill="currentColor" />
      <path d="m4.8 8.2 2.2 2.2 4.2-4.6" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path d="m6 3.5 5 4.5-5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
