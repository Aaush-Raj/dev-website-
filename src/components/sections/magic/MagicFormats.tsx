"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { Uncopyable } from "@/components/ui/Uncopyable";
import { magic } from "@/content/magic";
import { cn } from "@/lib/utils";

import { flowInputIcons, PackageIcon, WandIcon } from "./MagicFlowIcons";

/**
 * MAGIC FORMATS
 * ---------------------------------------------------------------------------
 * Section 3 of the LurnyMagic page: the flow from one source to many formats.
 * Four inputs on the left, the LurnyMagic node in the middle, five output
 * formats on the right.
 *
 * THE CONNECTORS
 * ONE SVG stretched behind the whole diagram, not one per gap. The curves fan
 * from four inputs into the hub and back out to five outputs, so they need to
 * span the full width to have anywhere to fan across — drawn inside the narrow
 * column gaps they collapse into vertical bunches.
 *
 * It uses a 0..100 percentage viewBox with `preserveAspectRatio="none"` so the
 * curve endpoints track the cards at any width, and `vectorEffect` keeps the
 * stroke an even weight despite that distortion. Violet on the left, amber on
 * the right, as the design colours them.
 *
 * Only on xl, where the three columns actually sit side by side. Below that
 * they stack and a horizontal connector would point at nothing, so the layer
 * is dropped and the diagram degrades to three labelled groups — which is what
 * it honestly is at that width.
 *
 * THE PREVIEW CARDS
 * `kind` in the content selects the preview: a still, the shared clip, or the
 * drawn practice chips. They are wrapped in <Uncopyable> and aria-hidden for
 * the same reason as the hero's cards — they imitate product screenshots. The
 * format NAMES are not: those are real content and sit outside the wrapper.
 *
 * The clip and its poster are the hero's, reused rather than duplicated, so
 * the page ships one video.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { formats } = magic;

/** Chip colours for the practice preview, keyed by the tone in the content. */
const chipTones = {
  violet: "bg-brand-500",
  blue: "bg-[#3b6fe0]",
  green: "bg-[#2f9e5f]",
  amber: "bg-accent-500",
} as const;

/** Shared card chrome for the diagram's nodes. */
const nodeChrome = "rounded-xl bg-[#0e0a1c]/90 ring-1 ring-brand-400/20";

/**
 * Connector geometry, in percentages of the diagram box.
 *
 * The anchors are MEASURED from the rendered grid, not estimated: inputs end
 * at x=29, the hub spans x=34.1 to x=46.6, and the output cards begin at
 * x=51.7. The four input rows sit at y=38/48/58/68; the output rows at
 * y=23 (top pair), y=59 (second pair) and y=89 (SCORM), with the remaining
 * two fanned between them so all five read as distinct paths.
 *
 * Drawn as S-curves rather than elbows, matching the design. Both control
 * points sit on the horizontal mid-line of each run, which is what keeps the
 * curve flat where it meets a card instead of arriving at an angle.
 */
const inputCurves = [
  "M 29 38 C 31.5 38 31.5 50 34.1 50",
  "M 29 48 C 31.5 48 31.5 50 34.1 50",
  "M 29 58 C 31.5 58 31.5 50 34.1 50",
  "M 29 68 C 31.5 68 31.5 50 34.1 50",
] as const;

const outputCurves = [
  "M 46.6 50 C 49.1 50 49.1 23 51.7 23",
  "M 46.6 50 C 49.1 50 49.1 41 51.7 41",
  "M 46.6 50 C 49.1 50 49.1 59 51.7 59",
  "M 46.6 50 C 49.1 50 49.1 74 51.7 74",
  "M 46.6 50 C 49.1 50 49.1 89 51.7 89",
] as const;

/** The AI Video preview. Owns state, so it is its own component. */
function VideoPreview({
  media,
}: {
  media: { src: string; poster: string; width: number; height: number };
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative aspect-video overflow-hidden rounded-lg bg-black">
      <video
        ref={videoRef}
        src={media.src}
        poster={media.poster}
        width={media.width}
        height={media.height}
        playsInline
        muted
        loop
        // Never autoplays: see the note in MagicOutputs. The poster stands in
        // until someone asks for the clip.
        preload="none"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        className="size-full object-cover"
      />

      {!isPlaying && (
        <button
          type="button"
          onClick={() => void videoRef.current?.play()}
          className={cn(
            "group absolute inset-0 grid place-items-center",
            "focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:outline-none",
          )}
        >
          <span className="sr-only">Play the AI Video sample</span>
          <span
            className={cn(
              "grid size-9 place-items-center rounded-full",
              "bg-white/85 text-neutral-900 backdrop-blur-sm",
              // `scale`, not `transform`: Tailwind v4 compiles the scale
              // utilities to the standalone property.
              "duration-normal transition-[scale,background-color] ease-out",
              "group-hover:scale-110 group-hover:bg-white",
            )}
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="currentColor">
              <path d="M9 6.5v11l9-5.5z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}

/**
 * The shape of the practice preview.
 *
 * Declared rather than indexed off the content union: `as const` makes each
 * output item a distinct literal type, and only the practice one carries
 * `preview`, so `items[number]["preview"]` does not resolve. Readonly because
 * the content file is `as const` and its arrays are frozen.
 */
interface PracticePreviewData {
  readonly title: string;
  readonly meta: string;
  readonly best: string;
  readonly instruction: string;
  readonly steps: readonly {
    readonly label: string;
    readonly tone: keyof typeof chipTones;
  }[];
}

/** The interactive-practice preview: a title row and a chip strip. */
function PracticePreview({ preview }: { preview: PracticePreviewData }) {
  return (
    <div className="rounded-lg bg-[#08060f] p-2.5 ring-1 ring-white/8">
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 items-start gap-1.5">
          <span className="mt-0.5 text-[0.625rem]">📦</span>
          <div className="min-w-0">
            <p className="truncate text-[0.625rem] font-semibold text-white">
              {preview.title}
            </p>
            <p className="truncate text-[0.5rem] text-neutral-500">
              {preview.meta}
            </p>
          </div>
        </div>
        <span className="shrink-0 rounded bg-white/8 px-1.5 py-0.5 text-[0.5rem] text-neutral-400">
          {preview.best}
        </span>
      </div>

      <p className="mt-2 text-center text-[0.5rem] text-neutral-400">
        {preview.instruction}
      </p>

      {/* The five steps, in one row as the design lays them out here — the
          hero's version of this card uses a 2x2 instead. */}
      <ol className="mt-2 grid grid-cols-5 gap-1">
        {preview.steps.map((step, index) => (
          <li
            key={step.label}
            className={cn(
              "flex flex-col items-center gap-1 rounded-md px-1 py-1.5",
              "bg-white/4 ring-1 ring-white/8",
            )}
          >
            <span
              className={cn(
                "grid size-4 place-items-center rounded",
                "text-[0.5rem] font-bold text-white",
                chipTones[step.tone],
              )}
            >
              {index + 1}
            </span>
            <span className="text-center text-[0.4375rem] leading-tight text-neutral-300">
              {step.label}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function MagicFormats() {
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

  /** Shared entrance for a diagram node. */
  const node = (delay: number, from: number) => ({
    initial: reduce ? "shown" : "hidden",
    whileInView: "shown",
    viewport: { once: true, amount: "some" } as const,
    variants: {
      hidden: { opacity: 0, x: from },
      shown: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, delay, ease: easeOut },
      },
    },
  });

  /** The label above each of the outer columns. */
  const columnLabel = cn(
    "text-[0.625rem] font-bold tracking-[0.14em] uppercase",
    "text-brand-300 sm:text-[0.6875rem]",
  );

  return (
    <section className="relative overflow-hidden bg-[#0a0715] py-section-lg text-white">
      {/* A soft violet bloom behind the hub, so the centre of the diagram
          sits in light rather than on flat black. */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute top-1/2 left-1/2 -z-0",
          "h-[30rem] w-[40rem] -translate-x-1/2 -translate-y-1/2",
          "rounded-full bg-brand-600/12 blur-3xl",
        )}
      />

      <Container width="hero" className="relative">
        {/* ============================ Heading ======================= */}
        <div className="mx-auto max-w-[52rem] text-center">
          <motion.p {...rise(0)} className={columnLabel}>
            {formats.eyebrow}
          </motion.p>

          <motion.h2
            {...rise(0.08)}
            className={cn(
              // The serif, as the design sets it — the same editorial voice
              // the LurnyPulse blueprints section uses.
              "mt-5 font-serif font-normal tracking-[-0.005em]",
              "leading-[1.1] text-white",
              // Measured from the design at ~46px on a 1440 frame. Held on
              // one line at xl, as the design sets it — it wraps to two if
              // any larger.
              "text-[1.75rem] sm:text-[2.125rem] xl:text-[2.625rem]",
              "xl:whitespace-nowrap",
            )}
          >
            {formats.headline}
          </motion.h2>

          <motion.p
            {...rise(0.16)}
            className={cn(
              "mx-auto mt-5 max-w-[34rem] leading-relaxed text-pretty",
              "text-[0.9375rem] text-neutral-300 sm:text-base",
            )}
          >
            {formats.description}
          </motion.p>
        </div>

        {/* ============================ Diagram ======================= */}
        <div
          className={cn(
            "relative mx-auto mt-12 grid items-center gap-10",
            // Three columns on xl: inputs, hub, outputs. The hub column is
            // narrow — it holds one node plus the two connector gaps.
            // The outputs column is the widest — it holds a 2x2 plus the
            // SCORM bar — but capped so the preview cards stay small, which
            // is what the design shows.
            "xl:grid-cols-[minmax(0,0.66fr)_minmax(0,0.34fr)_minmax(0,1.1fr)]",
            // A wide gap on purpose: it is the only space the connector fan
            // has to spread across, and a narrow one collapses the curves
            // into near-vertical nicks.
            "xl:max-w-[64rem] xl:gap-x-10",
          )}
        >
          {/* ------------------------ Connectors -------------------- */}
          {/* One layer behind the three columns. See the note at the top of
              this file for why it spans the whole diagram rather than
              sitting in the gaps. */}
          <motion.svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            // Behind the columns, so a curve is hidden the moment it crosses
            // a card. The geometry above therefore stops just shy of each
            // card edge rather than running under it.
            className="pointer-events-none absolute inset-0 -z-0 hidden size-full xl:block"
            initial={reduce ? "shown" : "hidden"}
            whileInView="shown"
            viewport={{ once: true, amount: "some" }}
          >
            {[...inputCurves, ...outputCurves].map((d, index) => (
              <motion.path
                key={d}
                d={d}
                fill="none"
                // The first four are the violet inputs; the rest are the
                // amber outputs.
                stroke={
                  index < inputCurves.length
                    ? "var(--brand-400)"
                    : "var(--accent-400)"
                }
                strokeOpacity={0.55}
                strokeWidth={1}
                // The viewBox is distorted by preserveAspectRatio="none", so
                // without this the strokes would stretch unevenly too.
                vectorEffect="non-scaling-stroke"
                variants={{
                  hidden: { pathLength: 0, opacity: 0 },
                  shown: {
                    pathLength: 1,
                    opacity: 1,
                    transition: {
                      duration: 0.6,
                      delay: 0.3 + index * 0.06,
                      ease: easeOut,
                    },
                  },
                }}
              />
            ))}
          </motion.svg>

          {/* -------------------------- Inputs ---------------------- */}
          <div className="relative">
            <p className={cn(columnLabel, "mb-4")}>{formats.inputs.label}</p>

            <ul className="space-y-2.5">
              {formats.inputs.items.map((input, index) => {
                const Icon = flowInputIcons[input.icon];

                return (
                  <motion.li
                    key={input.label}
                    {...node(0.1 + index * 0.08, -20)}
                    className={cn(
                      nodeChrome,
                      "group flex items-center gap-3 px-3.5 py-2.5",
                      // `translate`, not `transform`: Tailwind v4 compiles
                      // the translate utilities to the standalone property.
                      "duration-normal transition-[background-color,box-shadow,translate] ease-out",
                      "will-change-[translate]",
                      "hover:-translate-y-0.5 hover:bg-[#141029]",
                      "hover:shadow-[0_12px_28px_-16px_rgb(127_82_220/0.7)]",
                    )}
                  >
                    <Icon
                      className={cn(
                        "size-5 shrink-0 text-neutral-300",
                        "duration-normal transition-colors ease-out",
                        "group-hover:text-brand-200",
                      )}
                    />
                    <span className="text-[0.875rem] font-medium">
                      {input.label}
                    </span>
                  </motion.li>
                );
              })}
            </ul>
          </div>

          {/* --------------------------- Hub ------------------------ */}
          <motion.div
            initial={reduce ? "shown" : "hidden"}
            whileInView="shown"
            viewport={{ once: true, amount: "some" }}
            variants={{
              hidden: { opacity: 0, scale: 0.85 },
              shown: {
                opacity: 1,
                scale: 1,
                transition: { duration: 0.7, delay: 0.25, ease: easeOut },
              },
            }}
            className="relative mx-auto"
          >
            <div
              className={cn(
                "grid w-32 place-items-center gap-1.5 rounded-2xl px-4 py-5",
                "bg-[#0b0818] ring-1 ring-brand-400/45",
                "shadow-[0_0_50px_-8px_rgb(127_82_220/0.55)]",
              )}
            >
              <WandIcon className="size-10" />
              <p className="text-[0.8125rem] font-semibold">
                {formats.hub.label}
              </p>
            </div>
          </motion.div>

          {/* -------------------------- Outputs --------------------- */}
          <div>
            <p className={cn(columnLabel, "mb-4 xl:text-right")}>
              {formats.outputs.label}
            </p>

            <ul className="grid gap-2.5 sm:grid-cols-2">
              {formats.outputs.items.map((item, index) => (
                <motion.li
                  key={item.label}
                  {...node(0.35 + index * 0.08, 20)}
                  className={cn(
                    nodeChrome,
                    "group p-1.5",
                    "duration-normal transition-[background-color,box-shadow,translate] ease-out",
                    "will-change-[translate]",
                    "hover:-translate-y-0.5 hover:bg-[#141029]",
                    "hover:shadow-[0_14px_32px_-18px_rgb(252_197_50/0.5)]",
                  )}
                >
                  {/*
                    The still and practice previews are Uncopyable and
                    aria-hidden: they imitate product screenshots.

                    The VIDEO preview is NOT, because it owns the section's
                    one real control. Uncopyable sets aria-hidden, which would
                    take the play button out of the accessibility tree and
                    leave a control no screen reader could reach. It gets
                    `select-none` instead — the copy behaviour without the
                    hiding. The hero's video card is unwrapped for the same
                    reason.
                  */}
                  {item.kind === "image" && item.image && (
                    <Uncopyable>
                      <Image
                        src={item.image.src}
                        alt={item.image.alt}
                        width={item.image.width}
                        height={item.image.height}
                        sizes="(min-width: 1280px) 15rem, (min-width: 640px) 40vw, 90vw"
                        className="aspect-video w-full rounded-lg object-cover"
                      />
                    </Uncopyable>
                  )}

                  {item.kind === "video" && item.media && (
                    <div className="select-none">
                      <VideoPreview media={item.media} />
                    </div>
                  )}

                  {item.kind === "practice" && "preview" in item && (
                    <Uncopyable>
                      <PracticePreview preview={item.preview} />
                    </Uncopyable>
                  )}

                  <p className="py-1.5 text-center text-[0.75rem] font-medium">
                    {item.label}
                  </p>
                </motion.li>
              ))}
            </ul>

            {/* ---------------------- SCORM card ------------------- */}
            <motion.div
              {...node(0.67, 20)}
              className={cn(
                nodeChrome,
                "group mt-2.5",
                "duration-normal transition-[background-color,box-shadow,translate] ease-out",
                "will-change-[translate]",
                "hover:-translate-y-0.5 hover:bg-[#141029]",
                "hover:shadow-[0_14px_32px_-18px_rgb(252_197_50/0.5)]",
              )}
            >
              <Uncopyable className="flex items-center gap-3.5 px-3.5 py-3">
                <PackageIcon className="size-9 shrink-0" />

                <div className="min-w-0">
                  <p className="flex flex-wrap items-center gap-2">
                    <span className="text-[0.875rem] font-semibold">
                      {formats.outputs.scorm.title}
                    </span>
                    <span className="rounded bg-brand-500/25 px-1.5 py-0.5 text-[0.625rem] font-medium text-brand-100">
                      {formats.outputs.scorm.badge}
                    </span>
                  </p>
                  <p className="mt-0.5 text-[0.6875rem] text-neutral-400">
                    {formats.outputs.scorm.meta}
                  </p>
                  <p className="text-[0.6875rem] text-neutral-400">
                    {formats.outputs.scorm.note}
                  </p>
                </div>
              </Uncopyable>

              <p
                className={cn(
                  "border-t border-white/8 py-1.5",
                  "text-center text-[0.75rem] font-medium",
                )}
              >
                {formats.outputs.scorm.label}
              </p>
            </motion.div>
          </div>
        </div>

        {/* =========================== Footnote ======================= */}
        <motion.p
          {...rise(0.2)}
          className={cn(
            "mt-12 text-center text-[0.875rem] text-pretty",
            "text-neutral-400",
          )}
        >
          {formats.footnote}
        </motion.p>
      </Container>
    </section>
  );
}
