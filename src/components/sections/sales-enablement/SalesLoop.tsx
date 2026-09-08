"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { salesEnablement } from "@/content/sales-enablement";
import { cn } from "@/lib/utils";

import {
  BizIcon,
  BookIcon,
  BuildingIcon,
  CalendarIcon,
  ChartIcon,
  ChatIcon,
  CheckIcon,
  ChevronIcon,
  ClockIcon,
  LampIcon,
  LoopIcon,
  MagicIcon,
  PersonIcon,
  PitchIcon,
  PlayIcon,
} from "./SalesLoopIcons";

/**
 * SALES ENABLEMENT — THE LOOP
 * ---------------------------------------------------------------------------
 * Four stages around the seller: Prepare, Apply, Understand, Act. Each names
 * its engine and carries a sample of that engine's UI.
 *
 * ONLY THE SELLER IS A RASTER
 * The pack's bg.png is nearly the whole finished section — seller, arrows,
 * cards, handwriting and labels all painted in — so laying coded cards over it
 * would show two of everything. It also ships the seller ALONE, and that is
 * what this section uses; everything else is markup, so it is sharp,
 * translatable, animatable and readable by a screen reader. She is keyed out
 * of her white plate in scripts/build-sales-loop-assets.cjs.
 *
 * THE FOUR SAMPLES ARE FOUR SHAPES
 * Magic is a document feeding three lesson rows; Chat is a question and an
 * answer; Pitch is a waveform over an insight; Biz is an account record.
 * Forcing one component to express all four would take more props than it
 * saved, so each is its own small component.
 *
 * THE MOTION
 * The section's argument is that the four stages form a CYCLE, so the arrows
 * draw one after another, clockwise, each stage's card arriving just before the
 * arrow that leaves it. The ring is drawn as four separate arcs rather than one
 * circle precisely so they can be timed that way.
 *
 * Everything is gated on `useReducedMotion`: with it set, all of it is simply
 * present, with no drawing and no travel.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { loop } = salesEnablement;

/** Accent per engine, sampled from the design. */
const TONES = {
  violet: {
    text: "text-[#5711c9]",
    chipBg: "bg-[#ece4fb]",
    chipText: "text-[#4b0fb0]",
    soft: "bg-[#f3ecfd]",
    stroke: "#a78bfa",
  },
  teal: {
    text: "text-[#248773]",
    chipBg: "bg-[#dcf0eb]",
    chipText: "text-[#1c7060]",
    soft: "bg-[#e8f6f2]",
    stroke: "#5eccb4",
  },
  amber: {
    text: "text-[#ec8001]",
    chipBg: "bg-[#fdeecf]",
    chipText: "text-[#a55e04]",
    soft: "bg-[#fdf4e3]",
    stroke: "#f2b34d",
  },
  blue: {
    text: "text-[#2c5b9e]",
    chipBg: "bg-[#e2ecf9]",
    chipText: "text-[#24518f]",
    soft: "bg-[#eef4fc]",
    stroke: "#7aa5dd",
  },
} as const;

/** The engine mark beside each stage's name. */
const engineIcons = {
  LurnyMagic: MagicIcon,
  LurnyChat: ChatIcon,
  LurnyPitch: PitchIcon,
  LurnyBiz: BizIcon,
} as const;

/**
 * The four arcs of the ring, clockwise from top-left, on a 100x100 viewBox.
 * Separate paths rather than one circle so each can draw in turn — see the
 * note on motion above.
 */
const R = 40;

/** A point on the ring, in viewBox units. Angles run clockwise from 12 o'clock. */
function point(angle: number) {
  const radians = ((angle - 90) * Math.PI) / 180;
  return [50 + R * Math.cos(radians), 50 + R * Math.sin(radians)];
}

/** One clockwise arc between two angles on the ring. */
function arc(from: number, to: number) {
  const [x1, y1] = point(from);
  const [x2, y2] = point(to);
  return `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${R} ${R} 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`;
}

const ARCS = [
  // Prepare -> Apply, over the top.
  { d: arc(280, 352), tone: "violet" },
  // Apply -> Understand, down the right.
  { d: arc(8, 82), tone: "teal" },
  // Understand -> Act, along the bottom.
  { d: arc(98, 172), tone: "amber" },
  // Act -> Prepare, up the left.
  { d: arc(188, 262), tone: "blue" },
] as const;

export function SalesLoop() {
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

  return (
    <section
      // The page's own "explore the loop" CTA points here.
      id="loop"
      className="relative isolate overflow-hidden bg-[#fefefa] py-section-lg"
    >
      <Container width="hero">
        {/* ============================ Header ====================== */}
        <motion.p
          {...rise(0)}
          className={cn(
            "text-[0.6875rem] font-bold uppercase",
            "tracking-[0.16em] text-[#6e0ba8] sm:text-xs",
          )}
        >
          {loop.eyebrow}
        </motion.p>

        <motion.h2
          {...rise(0.08)}
          className={cn(
            // Serif, as the design sets it.
            "mt-4 font-serif font-bold tracking-[-0.01em]",
            "leading-[1.1] text-[#07060c]",
            "text-[1.875rem] sm:text-[2.375rem] xl:text-[2.875rem]",
          )}
        >
          {loop.headline.map((line) => (
            <span key={line} className="inline lg:block">
              {line}{" "}
            </span>
          ))}
        </motion.h2>

        <motion.p
          {...rise(0.16)}
          className={cn(
            "mt-4 max-w-[52rem] leading-relaxed text-pretty",
            "text-[1rem] text-[#44425c] sm:text-[1.0625rem]",
          )}
        >
          {loop.description}
        </motion.p>

        {/* ============================= Loop ======================= */}
        {/* From lg up the four stages sit around the seller in a 2x2 grid with
            the ring drawn between them. Below that they stack in order and the
            ring is dropped: at phone width it would connect nothing. */}
        <div
          className={cn(
            "relative mt-12 lg:mt-16",
            "grid gap-x-10 gap-y-10",
            "lg:grid-cols-[minmax(0,1fr)_minmax(0,0.86fr)_minmax(0,1fr)]",
            "lg:gap-x-8 lg:gap-y-16 xl:gap-x-12",
          )}
        >
          {/* ------------------------- The ring ------------------- */}
          {/* Spans the centre column only, behind the seller. */}
          <div
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute hidden lg:block",
              // A SQUARE box centred on the seller. The ring is a circle, so
              // its box must stay square: `preserveAspectRatio="none"` on a
              // non-square box scales x and y independently and renders each
              // arc as a mismatched sliver rather than part of one circle.
              "top-1/2 left-1/2 aspect-square w-[52%]",
              "-translate-x-1/2 -translate-y-1/2",
            )}
          >
            <svg viewBox="0 0 100 100" fill="none" className="size-full">
              <defs>
                {/* One marker per tone, so each arc's head matches its arc. */}
                {Object.entries(TONES).map(([tone, value]) => (
                  <marker
                    key={tone}
                    id={`loop-head-${tone}`}
                    viewBox="0 0 10 10"
                    refX="7"
                    refY="5"
                    markerWidth="5"
                    markerHeight="5"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 1 L 8 5 L 0 9 z" fill={value.stroke} />
                  </marker>
                ))}
              </defs>

              {ARCS.map((arc, index) => (
                <motion.path
                  key={arc.d}
                  d={arc.d}
                  stroke={TONES[arc.tone].stroke}
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  markerEnd={`url(#loop-head-${arc.tone})`}
                  initial={
                    reduce
                      ? { pathLength: 1, opacity: 1 }
                      : { pathLength: 0, opacity: 0 }
                  }
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true, amount: "some" }}
                  transition={{
                    duration: 0.8,
                    // Each arc follows its own stage's card, so the eye is led
                    // round the cycle rather than shown it all at once.
                    delay: 0.75 + index * 0.42,
                    ease: easeOut,
                  }}
                />
              ))}
            </svg>
          </div>

          {/* -------------------------- Stages -------------------- */}
          {/* Grid placement puts 01 and 04 in the left column and 02 and 03 in
              the right, with the seller spanning the centre — the design's
              clockwise reading order. */}
          {loop.stages.map((stage, index) => (
            <Stage
              key={stage.title}
              stage={stage}
              index={index}
              reduce={reduce ?? false}
              className={
                [
                  "lg:col-start-1 lg:row-start-1",
                  "lg:col-start-3 lg:row-start-1",
                  "lg:col-start-3 lg:row-start-2",
                  "lg:col-start-1 lg:row-start-2",
                ][index]
              }
            />
          ))}

          {/* -------------------------- Seller -------------------- */}
          <motion.div
            initial={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: "some" }}
            transition={{ duration: 0.8, delay: 0.25, ease: easeOut }}
            className={cn(
              "relative flex flex-col items-center justify-center",
              "order-first lg:order-none",
              "lg:col-start-2 lg:row-span-2 lg:row-start-1",
            )}
          >
            {/* The soft shape behind her, as the design has it. */}
            <span
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute top-1/2 left-1/2 -z-10",
                // Square, so it reads as the design's circle rather than the
                // arch a wide box gives.
                "aspect-square w-[86%] -translate-x-1/2 -translate-y-1/2",
                "rounded-full bg-gradient-to-b from-[#eae3f8] to-[#e4f1ee]",
              )}
            />

            <Image
              src={loop.seller.src}
              alt={loop.seller.alt}
              width={loop.seller.width}
              height={loop.seller.height}
              sizes="(min-width: 1024px) 30vw, 60vw"
              className="h-auto w-[64%] max-w-72 lg:w-full lg:max-w-none"
            />

            {/* The caption pill, overlapping her lower edge. */}
            <motion.p
              {...rise(0.55)}
              className={cn(
                "-mt-5 rounded-full px-6 py-2.5 lg:-mt-7",
                "bg-[#ece4fb] text-[0.9375rem] font-medium text-[#2f1065]",
                "shadow-[0_10px_28px_-14px_rgb(60_20_120/0.5)]",
              )}
            >
              {loop.caption}
            </motion.p>
          </motion.div>
        </div>

        {/* =========================== Footnote ===================== */}
        <motion.p
          {...rise(0.3)}
          className={cn(
            "mt-14 flex items-center justify-center gap-3 border-t border-[#e6e3ee] pt-7",
            "text-center font-serif text-[0.9375rem] text-pretty",
            "text-[#3d3a52] italic sm:text-[1.0625rem]",
          )}
        >
          <LoopIcon className="size-5 shrink-0 text-[#7c3aed] not-italic" />
          {loop.footnote}
        </motion.p>
      </Container>
    </section>
  );
}

/* ========================================================================== */
/*  A stage                                                                   */
/* ========================================================================== */

function Stage({
  stage,
  index,
  reduce,
  className,
}: {
  stage: (typeof loop.stages)[number];
  index: number;
  reduce: boolean;
  className?: string;
}) {
  const tone = TONES[stage.tone];
  const EngineIcon = engineIcons[stage.engine];

  return (
    <motion.div
      initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: "some" }}
      transition={{
        duration: 0.6,
        // Ahead of the arc that leaves this stage, so each card lands and then
        // its arrow travels on — see the note on motion at the top.
        delay: 0.5 + index * 0.42,
        ease: easeOut,
      }}
      className={cn("relative", className)}
    >
      <div className="flex items-start gap-4">
        {/* The ordinal. Drawn from the stage's position rather than stored, so
            the two cannot drift apart. */}
        <span
          className={cn(
            "flex size-11 shrink-0 items-center justify-center rounded-full",
            "text-[0.8125rem] font-semibold",
            tone.chipBg,
            tone.chipText,
          )}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="min-w-0">
          <h3
            className={cn(
              "font-serif text-[1.375rem] font-bold tracking-[-0.01em]",
              "text-[#0b0912] sm:text-[1.5rem]",
            )}
          >
            {stage.title}
          </h3>

          <p
            className={cn(
              "mt-1 flex items-center gap-2 text-[1rem] font-bold",
              tone.text,
            )}
          >
            <EngineIcon className="size-4 shrink-0" />
            {stage.engine}
          </p>

          <p className="mt-2 text-[0.9375rem] leading-relaxed text-pretty text-[#4a4763]">
            {stage.body}
          </p>
        </div>
      </div>

      {/* The engine sample. Inset to line up under the copy, not the ordinal. */}
      <div className="mt-5 sm:ml-15">
        <Sample sample={stage.sample} />
      </div>
    </motion.div>
  );
}

/** Routes a stage to its engine's panel. */
function Sample({ sample }: { sample: (typeof loop.stages)[number]["sample"] }) {
  if (sample === "magic") return <MagicSample />;
  if (sample === "chat") return <ChatSample />;
  if (sample === "pitch") return <PitchSample />;
  return <BizSample />;
}

/* ========================================================================== */
/*  The four engine samples                                                   */
/* ========================================================================== */

/** Shared card chrome. */
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
        "rounded-xl bg-white p-3.5",
        "ring-1 ring-[#e9e6f0]",
        "shadow-[0_14px_34px_-20px_rgb(30_20_60/0.3)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Magic — a source document feeding three lesson rows. */
function MagicSample() {
  const { magic } = loop.samples;

  const rowIcons = { book: BookIcon, chat: ChatIcon, chart: ChartIcon } as const;

  return (
    <div className="flex items-center gap-3">
      {/* The source document. Its body is skeleton lines, as the design draws
          it — a stand-in for the document rather than real copy. */}
      <div
        className={cn(
          "hidden w-28 shrink-0 rotate-[-4deg] rounded-lg bg-white p-2.5 sm:block",
          "ring-1 ring-[#e9e6f0]",
          "shadow-[0_10px_24px_-16px_rgb(30_20_60/0.35)]",
        )}
      >
        <p className="text-[0.625rem] leading-tight font-semibold text-[#2b2740]">
          {magic.source}
        </p>

        <span aria-hidden="true" className="mt-2 block space-y-1">
          {[100, 86, 94, 72].map((width) => (
            <span
              key={width}
              className="block h-1 rounded-full bg-[#e9e6f0]"
              style={{ width: `${width}%` }}
            />
          ))}
        </span>

        <span
          aria-hidden="true"
          className={cn(
            "mt-2 flex size-5 items-center justify-center rounded",
            "bg-[#e8342a] text-[0.4375rem] font-bold text-white",
          )}
        >
          PDF
        </span>
      </div>

      <ArrowStub className="hidden shrink-0 text-[#c9bce6] sm:block" />

      <ul className="min-w-0 flex-1 space-y-1.5">
        {magic.rows.map((row) => {
          const Icon = rowIcons[row.icon];
          const tone = TONES[row.tone];

          return (
            <li key={row.label}>
              <Panel className="flex items-center gap-2.5 !p-2.5">
                <span
                  className={cn(
                    "flex size-6 shrink-0 items-center justify-center rounded-md",
                    tone.soft,
                  )}
                >
                  <Icon className={cn("size-3.5", tone.text)} />
                </span>
                <span className="truncate text-[0.8125rem] font-medium text-[#2b2740]">
                  {row.label}
                </span>
              </Panel>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** Chat — a question and the assistant's answer. */
function ChatSample() {
  const { chat } = loop.samples;

  return (
    <div>
      <div className="flex items-center gap-2.5">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#ece4fb]">
          <PersonIcon className="size-4 text-[#6d28d9]" />
        </span>
        <p
          className={cn(
            "rounded-lg bg-[#f2f0f8] px-3.5 py-2",
            "text-[0.8125rem] text-[#2b2740]",
          )}
        >
          {chat.question}
        </p>
      </div>

      <Panel className="mt-2.5 ml-10 flex items-start gap-2.5">
        <MagicIcon className="mt-0.5 size-4 shrink-0 text-[#7c3aed]" />

        <span className="min-w-0">
          <span className="block text-[0.8125rem] leading-relaxed text-[#2b2740]">
            {chat.answer}
          </span>

          {/* Skeleton lines closing the answer, as the design draws them. */}
          <span aria-hidden="true" className="mt-2 block space-y-1.5">
            <span className="block h-1.5 w-full rounded-full bg-[#eeecf4]" />
            <span className="block h-1.5 w-3/5 rounded-full bg-[#eeecf4]" />
          </span>
        </span>
      </Panel>
    </div>
  );
}

/** Pitch — a recording with the insight it surfaced. */
function PitchSample() {
  const { pitch } = loop.samples;

  return (
    <Panel>
      <div className="flex items-center gap-2.5">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#7c3aed]">
          <PlayIcon className="size-3 text-white" />
        </span>

        {/* The waveform. Heights are fixed rather than random so the panel
            renders identically on the server and the client. */}
        <span aria-hidden="true" className="flex h-6 flex-1 items-center gap-[2px]">
          {WAVEFORM.map((height, index) => (
            <span
              key={index}
              className="w-[2px] flex-1 rounded-full bg-[#a78bfa]"
              style={{ height: `${height}%` }}
            />
          ))}
        </span>

        <span className="shrink-0 text-[0.6875rem] text-[#6b6785] tabular-nums">
          {pitch.duration}
        </span>
      </div>

      <p
        className={cn(
          "mt-2.5 flex items-center gap-2 rounded-lg bg-[#fdf4e3] px-3 py-2",
        )}
      >
        <LampIcon className="size-4 shrink-0 text-[#ec8001]" />
        <span className="min-w-0 flex-1 truncate text-[0.8125rem] font-medium text-[#6d4506]">
          {pitch.insight}
        </span>
        <ChevronIcon className="size-3.5 shrink-0 text-[#b79a63]" />
      </p>

      <span aria-hidden="true" className="mt-2.5 block space-y-1.5">
        <span className="block h-1.5 w-full rounded-full bg-[#eeecf4]" />
        <span className="block h-1.5 w-2/3 rounded-full bg-[#eeecf4]" />
      </span>
    </Panel>
  );
}

/** Biz — an account record with the recommended next step. */
function BizSample() {
  const { biz } = loop.samples;

  const rowIcons = { clock: ClockIcon, calendar: CalendarIcon } as const;

  return (
    <Panel className="!p-0">
      <div className="flex items-center gap-2.5 p-3.5 pb-2.5">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#e2ecf9]">
          <BuildingIcon className="size-4 text-[#2c5b9e]" />
        </span>

        <span className="min-w-0 flex-1 truncate text-[0.9375rem] font-semibold text-[#1b1830]">
          {biz.account}
        </span>

        <span
          className={cn(
            "shrink-0 rounded-full bg-[#dcf0eb] px-2.5 py-1",
            "text-[0.6875rem] font-medium text-[#1c7060]",
          )}
        >
          {biz.badge}
        </span>
      </div>

      <dl className="space-y-2 px-3.5 pb-3">
        {biz.rows.map((row) => {
          const Icon = rowIcons[row.icon];

          return (
            <div key={row.label} className="flex items-center gap-2.5">
              <Icon className="size-3.5 shrink-0 text-[#8a86a3]" />
              <dt className="flex-1 text-[0.8125rem] text-[#5c5876]">
                {row.label}
              </dt>
              <dd className="text-[0.8125rem] font-medium text-[#2b2740]">
                {row.value}
              </dd>
            </div>
          );
        })}
      </dl>

      <p className="flex items-center gap-2.5 rounded-b-xl bg-[#e9f6ef] px-3.5 py-2.5">
        <CheckIcon className="size-4 shrink-0 text-[#2f9160]" />
        <span className="min-w-0 flex-1 truncate text-[0.8125rem] font-medium text-[#1f5c3f]">
          {biz.action}
        </span>
        <ChevronIcon className="size-3.5 shrink-0 text-[#7fae95]" />
      </p>
    </Panel>
  );
}

/**
 * The Pitch waveform's bar heights, as percentages.
 *
 * Fixed rather than generated: a random pattern would differ between the
 * server render and the client hydration.
 */
const WAVEFORM = [
  28, 46, 34, 62, 40, 78, 52, 36, 68, 44, 86, 56, 32, 74, 46, 60, 38, 82, 54,
  30, 66, 42, 58, 34, 84, 50, 40, 70, 32, 56, 44, 76, 36, 52, 30, 64, 42, 28,
] as const;

/** The short arrow between the Magic sample's document and its lesson rows. */
function ArrowStub({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 12"
      fill="none"
      className={cn("h-3 w-6", className)}
      aria-hidden="true"
    >
      <path
        d="M1 6h20m0 0-5-4.5M21 6l-5 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
