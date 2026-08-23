"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { Uncopyable } from "@/components/ui/Uncopyable";
import { magic } from "@/content/magic";
import { cn } from "@/lib/utils";

import {
  BoxIcon,
  GemIcon,
  LockIcon,
  MicIcon,
  PlayIcon,
  ResetIcon,
  SkipIcon,
  SparkIcon,
  StarIcon,
  TrophyIcon,
} from "./MagicExperienceIcons";

/**
 * MAGIC EXPERIENCES
 * ---------------------------------------------------------------------------
 * Section 4 of the LurnyMagic page: six experience types in a 3x2 grid.
 *
 * A light section between two dark ones, as the design has it — the cream
 * ground of section 2 rather than section 3's near-black.
 *
 * THE CARDS
 * Every card is the same envelope: a 16:9 preview panel, then title,
 * description and an Explore link, with the link pinned to the bottom so the
 * six baselines align however long a description runs. `preview` in the
 * content selects what goes in the panel.
 *
 * FOUR OF THE PREVIEWS ARE DRAWN, not shipped as stills — the same choice
 * sections 1 and 3 make. A flat export of the challenge board or the quiz
 * would be a picture of text: unreadable when scaled into a third-width card,
 * and invisible to search. Drawn, they re-flow and stay crisp.
 *
 * They are scaled by `cqw` off a container query on the panel rather than by
 * breakpoint. The panel's width does not track the viewport's — three across
 * at xl is narrower than one across on a phone — so type sized in rem would
 * be too big in the grid and too small stacked. Sized in `cqw` the whole
 * drawing shrinks and grows with its own card, which is what a screenshot
 * would do.
 *
 * All four are wrapped in <Uncopyable> and aria-hidden: they imitate product
 * screenshots, and their text is not real page copy. The card TITLES and
 * descriptions are, and sit outside the wrapper.
 *
 * The video preview is the exception — it owns a real control, so it is not
 * aria-hidden. See the note at the card.
 */

const { experiences } = magic;

/** Motion's string easings are not typed, so the cubic curve is spelled out. */
const easeOut = [0.16, 1, 0.3, 1] as const;

/** Step-chip colours on the challenge board. Matches section 3's tones. */
const chipTones = {
  violet: "bg-brand-500",
  blue: "bg-[#3b6fe0]",
  green: "bg-[#2f9e5f]",
  amber: "bg-accent-500",
} as const;

/** Stat-chip colours on the quest header. */
const statTones = {
  violet: "bg-brand-500/25 text-brand-100 ring-brand-300/35",
  amber: "bg-accent-500/20 text-accent-200 ring-accent-400/35",
} as const;

/** The dark ground shared by the challenge, quiz and quest previews. */
const previewFrame = "relative aspect-video w-full overflow-hidden @container";

/* ========================================================================== */
/*  PREVIEWS                                                                  */
/* ========================================================================== */

/**
 * The LurnyFlix clip.
 *
 * Owns play state, so it is its own component. Identical in behaviour to
 * section 3's: poster until asked, never autoplaying.
 */
function VideoPreview({
  media,
  title,
}: {
  media: { src: string; poster: string; width: number; height: number };
  title: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative aspect-video w-full overflow-hidden bg-black">
      <video
        ref={videoRef}
        src={media.src}
        poster={media.poster}
        width={media.width}
        height={media.height}
        playsInline
        muted
        loop
        // Never autoplays — the poster stands in until someone asks.
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
            "group/play absolute inset-0 grid place-items-center",
            "focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:outline-none",
            "focus-visible:-outline-offset-2",
          )}
        >
          <span className="sr-only">Play the {title} sample</span>
          <span
            className={cn(
              "grid size-11 place-items-center rounded-full",
              "bg-brand-600/90 text-white backdrop-blur-sm",
              // `scale`, not `transform`: Tailwind v4 compiles the scale
              // utilities to the standalone property.
              "duration-normal transition-[scale,background-color] ease-out",
              "group-hover/play:scale-110 group-hover/play:bg-brand-600",
            )}
          >
            <PlayIcon className="size-5 translate-x-px" />
          </span>
        </button>
      )}
    </div>
  );
}

/** Shapes for the drawn previews, mirroring the content's `as const` arrays. */
type ChallengeData = (typeof experiences.items)[number] extends infer Item
  ? Item extends { challenge: infer C }
    ? C
    : never
  : never;

type QuizData = (typeof experiences.items)[number] extends infer Item
  ? Item extends { quiz: infer Q }
    ? Q
    : never
  : never;

type QuestData = (typeof experiences.items)[number] extends infer Item
  ? Item extends { quest: infer Q }
    ? Q
    : never
  : never;

type PodcastData = (typeof experiences.items)[number] extends infer Item
  ? Item extends { podcast: infer P }
    ? P
    : never
  : never;

/**
 * The drag-drop board.
 *
 * Three columns: the item pool, steps 1 to 3, then steps 4 and 5 offset down
 * — which is how the design staggers them rather than a plain 2x3.
 */
function ChallengePreview({ challenge }: { challenge: ChallengeData }) {
  const [first, second] = [
    challenge.steps.slice(0, 3),
    challenge.steps.slice(3),
  ];

  const dropTarget = cn(
    "rounded-[1.4cqw] bg-white/4 p-[1.6cqw] ring-1 ring-white/8",
    "duration-normal transition-colors ease-out group-hover:bg-white/6",
  );

  return (
    <div className={cn(previewFrame, "bg-[#0a0713] text-white")}>
      <div className="flex size-full flex-col p-[2.4cqw]">
        {/* -------------------------- Header ------------------------- */}
        <div className="flex items-start gap-[1.6cqw]">
          <span
            className={cn(
              "grid size-[5cqw] shrink-0 place-items-center rounded-[1.2cqw]",
              "bg-accent-500/15 text-accent-400",
            )}
          >
            <BoxIcon className="size-[3.2cqw]" />
          </span>

          <div className="min-w-0 flex-1">
            <p className="truncate text-[2.6cqw] font-semibold">
              {challenge.title}
            </p>
            <p className="truncate text-[2cqw] text-neutral-400">
              {challenge.meta}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-[1.2cqw]">
            <span className="text-[1.9cqw] text-neutral-400">
              {challenge.best}
            </span>
            <span className="rounded-[0.8cqw] bg-white/8 px-[1.2cqw] py-[0.4cqw] text-[1.8cqw] text-neutral-300">
              {challenge.xp}
            </span>
          </div>
        </div>

        <p className="mt-[1.6cqw] text-center text-[2cqw] text-neutral-400">
          {challenge.instruction}
        </p>

        {/* -------------------------- Board -------------------------- */}
        <div className="mt-[1.6cqw] grid min-h-0 flex-1 grid-cols-[1.05fr_1.2fr_1.2fr] gap-[1.6cqw]">
          {/* The pool. */}
          <div className="rounded-[1.6cqw] bg-white/4 p-[1.6cqw] ring-1 ring-white/8">
            <div className="flex items-start gap-[1.2cqw]">
              <span className="grid size-[3.6cqw] shrink-0 place-items-center rounded-[0.9cqw] bg-brand-500 text-white">
                <SparkIcon className="size-[2.2cqw]" />
              </span>
              <div className="min-w-0">
                <p className="text-[2cqw] font-semibold">
                  {challenge.pool.title}
                </p>
                <p className="text-[1.6cqw] text-neutral-500">
                  {challenge.pool.hint}
                </p>
              </div>
            </div>

            <ul className="mt-[1.2cqw] space-y-[1cqw]">
              {challenge.pool.items.map((item) => (
                <li
                  key={item}
                  className={cn(
                    "rounded-[1cqw] bg-white/6 px-[1.2cqw] py-[0.9cqw]",
                    "text-[1.65cqw] leading-snug text-neutral-300 ring-1 ring-white/8",
                  )}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Steps 1 to 3. */}
          <ol className="flex flex-col gap-[1.4cqw]">
            {first.map((step, index) => (
              <li key={step.label} className={cn(dropTarget, "flex-1")}>
                <div className="flex items-center gap-[1.4cqw]">
                  <span
                    className={cn(
                      "grid size-[3.8cqw] shrink-0 place-items-center rounded-[0.9cqw]",
                      "text-[2cqw] font-bold text-white",
                      chipTones[step.tone],
                    )}
                  >
                    {index + 1}
                  </span>
                  <span className="truncate text-[2cqw] font-medium">
                    {step.label}
                  </span>
                </div>
                <p className="mt-[1cqw] text-center text-[1.6cqw] text-neutral-600">
                  {challenge.dropHint}
                </p>
              </li>
            ))}
          </ol>

          {/* Steps 4 and 5, dropped a row as the design offsets them, with
              the reset control tucked above. */}
          <div className="flex flex-col gap-[1.4cqw]">
            <div className="flex justify-end">
              <span
                className={cn(
                  "grid size-[4.4cqw] place-items-center rounded-[1.2cqw]",
                  "bg-white/6 text-neutral-300 ring-1 ring-white/10",
                )}
              >
                <ResetIcon className="size-[2.4cqw]" />
              </span>
            </div>

            <ol className="flex min-h-0 flex-1 flex-col gap-[1.4cqw]">
              {second.map((step, index) => (
                <li key={step.label} className={cn(dropTarget, "flex-1")}>
                  <div className="flex items-center gap-[1.4cqw]">
                    <span
                      className={cn(
                        "grid size-[3.8cqw] shrink-0 place-items-center rounded-[0.9cqw]",
                        "text-[2cqw] font-bold text-white",
                        chipTones[step.tone],
                      )}
                    >
                      {first.length + index + 1}
                    </span>
                    <span className="truncate text-[2cqw] font-medium">
                      {step.label}
                    </span>
                  </div>
                  <p className="mt-[1cqw] text-center text-[1.6cqw] text-neutral-600">
                    {challenge.dropHint}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

/** The question card: a progress bar, the stem, four options, a verdict. */
function QuizPreview({ quiz }: { quiz: QuizData }) {
  return (
    <div
      className={cn(
        previewFrame,
        // The violet-to-indigo wash the design puts behind this one.
        "bg-[linear-gradient(135deg,#2a1352_0%,#1b0f38_55%,#160c2c_100%)]",
        "text-white",
      )}
    >
      <div className="flex size-full flex-col p-[3cqw]">
        {/* ------------------------- Progress ------------------------ */}
        <div className="flex items-center gap-[2cqw]">
          <span className="shrink-0 text-[2cqw] text-neutral-300">
            {quiz.progress.label}
          </span>
          <span className="h-[0.5cqw] flex-1 overflow-hidden rounded-full bg-white/15">
            <span
              className="block h-full rounded-full bg-brand-400"
              style={{
                width: `${(quiz.progress.value / quiz.progress.total) * 100}%`,
              }}
            />
          </span>
        </div>

        {/* ------------------------- Question ------------------------ */}
        <p className="mt-[2.6cqw] max-w-[62%] text-[2.9cqw] leading-snug font-semibold text-balance">
          {quiz.question}
        </p>

        {/* ------------------- Options and feedback ------------------ */}
        <div className="mt-[2.4cqw] grid min-h-0 flex-1 grid-cols-[1.1fr_0.9fr] gap-[2.4cqw]">
          <ol className="flex flex-col gap-[1.4cqw]">
            {quiz.options.map((option) => (
              <li
                key={option.label}
                className={cn(
                  "flex flex-1 items-center gap-[1.8cqw] rounded-[1.4cqw]",
                  "px-[1.8cqw] text-[2.1cqw] ring-1",
                  option.selected
                    ? "bg-brand-600 font-medium text-white ring-brand-400/60"
                    : "bg-white/5 text-neutral-300 ring-white/10",
                )}
              >
                {/* The radio. Drawn, not an <input> — nothing here is a
                    control. */}
                <span
                  className={cn(
                    "grid size-[2.6cqw] shrink-0 place-items-center rounded-full",
                    "ring-[0.3cqw]",
                    option.selected ? "ring-white/80" : "ring-white/30",
                  )}
                >
                  {option.selected && (
                    <span className="size-[1.1cqw] rounded-full bg-white" />
                  )}
                </span>
                <span className="truncate">{option.label}</span>
              </li>
            ))}
          </ol>

          <div
            className={cn(
              "grid place-content-center gap-[1.2cqw] rounded-[1.6cqw]",
              "bg-brand-950/60 px-[2cqw] text-center ring-1 ring-brand-400/30",
            )}
          >
            <span className="mx-auto grid size-[8cqw] place-items-center rounded-full bg-accent-500/15 text-accent-300">
              <TrophyIcon className="size-[5cqw]" />
            </span>
            <p className="text-[2.6cqw] font-semibold">{quiz.feedback.title}</p>
            <p className="text-[2cqw] leading-snug text-balance text-neutral-300">
              {quiz.feedback.body}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * The quest path.
 *
 * Five hexagons on a dashed trail, alternating high and low so the path reads
 * as a route rather than a row. The hexes are clipped with `clip-path`; the
 * trail is one SVG behind them.
 */
function QuestPreview({ quest }: { quest: QuestData }) {
  const hexClip =
    "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";

  /**
   * Vertical offset per node, in container-width percent.
   *
   * The design dips the path in the middle and lifts it at both ends, so the
   * five hexes read as a route rather than a row. Node 1 is the shallowest
   * because it is the lit one and sits proudest.
   */
  const offsets = [0, 3.4, 6.4, 3.4, 0];

  return (
    <div
      className={cn(
        previewFrame,
        "bg-[radial-gradient(120%_100%_at_50%_0%,#3a1d63_0%,#241141_45%,#16092c_100%)]",
        "text-white",
      )}
    >
      <div className="flex size-full flex-col p-[3cqw]">
        {/* -------------------------- Header ------------------------- */}
        <p className="text-center text-[3.4cqw] font-bold text-[#f3a8e0]">
          {quest.title}
        </p>

        <ul className="mt-[1.4cqw] flex justify-center gap-[1.6cqw]">
          {quest.stats.map((stat) => (
            <li
              key={stat.label}
              className={cn(
                "flex items-center gap-[1cqw] rounded-full ring-1",
                "px-[1.8cqw] py-[0.6cqw] text-[1.9cqw] font-medium",
                statTones[stat.tone],
              )}
            >
              {stat.tone === "violet" ? (
                <StarIcon className="size-[2.2cqw]" />
              ) : (
                <GemIcon className="size-[2.2cqw]" />
              )}
              {stat.label}
            </li>
          ))}
        </ul>

        {/* --------------------------- Path -------------------------- */}
        <div className="relative mt-[1.8cqw] flex-1">
          {/*
            The dashed trail, behind the hexes.

            Its vertices follow the same dip as `offsets` above, so the line
            meets each hex at its own height. It runs the full width and is
            covered where a hex sits on it, which is what gives the design's
            look of segments strung BETWEEN the nodes.
          */}
          <svg
            viewBox="0 0 100 20"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
            className="absolute inset-x-0 top-[3.4cqw] -z-0 h-[13cqw] w-full"
          >
            <path
              d="M9.3 5 L29.6 10.4 L50 15.2 L70.4 10.4 L90.7 5"
              fill="none"
              stroke="rgb(255 255 255 / 0.5)"
              strokeWidth="1.6"
              strokeDasharray="5 5"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <ol className="relative flex items-start justify-between">
            {quest.nodes.map((node, index) => (
              <li
                key={index}
                className="flex w-[18.5%] flex-col items-center"
                style={{ marginTop: `${offsets[index] ?? 0}cqw` }}
              >
                <span
                  className={cn(
                    "grid aspect-square w-full content-center justify-items-center",
                    "gap-[0.5cqw]",
                    node.state === "current"
                      ? "bg-brand-500 shadow-[0_0_6cqw_rgb(127_82_220/0.9)]"
                      : "bg-[#3b2b5e]",
                  )}
                  style={{ clipPath: hexClip }}
                >
                  <span
                    className={cn(
                      "text-[4cqw] leading-none font-bold",
                      node.state === "current"
                        ? "text-white"
                        : "text-neutral-300",
                    )}
                  >
                    {index + 1}
                  </span>

                  {node.state === "locked" ? (
                    <LockIcon className="size-[2.4cqw] text-neutral-400" />
                  ) : (
                    <span className="flex gap-[0.4cqw]">
                      {Array.from({ length: node.stars }, (_, star) => (
                        <StarIcon
                          key={star}
                          className={cn(
                            "size-[1.9cqw]",
                            node.state === "current"
                              ? "text-accent-400"
                              : "text-white/35",
                          )}
                        />
                      ))}
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ol>

          {/* The guide's speech bubble, bottom-left as the design places it. */}
          <p
            className={cn(
              "absolute bottom-0 left-[4%] max-w-[58%] rounded-[1.4cqw]",
              "bg-[#fdf6e4] px-[2cqw] py-[1.4cqw] text-[2cqw] leading-snug",
              "font-medium text-neutral-800 shadow-[0_1cqw_3cqw_rgb(0_0_0/0.35)]",
            )}
          >
            {quest.tip}
          </p>
        </div>
      </div>
    </div>
  );
}

/** The episode player: cover art on the left, transport on the right. */
function PodcastPreview({ podcast }: { podcast: PodcastData }) {
  /**
   * The waveform.
   *
   * Bar heights come from a fixed sine mix rather than random values, so the
   * server and client render the same markup — `Math.random()` here would
   * hydrate mismatched.
   */
  const bars = Array.from({ length: 46 }, (_, index) => {
    const wave =
      Math.sin(index * 0.9) * 0.3 +
      Math.sin(index * 2.3 + 1.1) * 0.24 +
      Math.sin(index * 0.42) * 0.2;

    // Rounded, and not merely for tidiness: React serialises the full float
    // into the server HTML but the client writes a 6-significant-digit form
    // into the style property, so an unrounded height hydrates mismatched.
    return Math.round((30 + Math.abs(wave) * 110) * 100) / 100;
  });

  const playedBars = Math.round(bars.length * podcast.episode.progress);

  return (
    <div
      className={cn(
        previewFrame,
        "bg-[linear-gradient(135deg,#fdf1e6_0%,#fbe6dc_60%,#f6dcd2_100%)]",
        "text-neutral-900",
      )}
    >
      <div className="flex size-full items-center gap-[3.5cqw] p-[3.5cqw]">
        {/* -------------------------- Cover -------------------------- */}
        <div
          className={cn(
            "grid aspect-[3/4] h-full shrink-0 place-content-center gap-[1.2cqw]",
            "rounded-[2cqw] px-[2cqw] text-center text-white",
            "bg-[linear-gradient(150deg,#e2603f_0%,#d0503f_55%,#c2454a_100%)]",
            "shadow-[0_1.5cqw_4cqw_rgb(194_69_74/0.35)]",
          )}
        >
          <MicIcon className="mx-auto size-[10cqw] text-white" />
          <p className="mt-[1cqw] leading-[1.15] uppercase">
            <span className="block text-[3.6cqw] font-bold tracking-[0.14em]">
              {podcast.cover.title.lead}
            </span>
            <span className="block text-[2.9cqw] font-semibold tracking-[0.1em]">
              {podcast.cover.title.tail}
            </span>
          </p>
          <p className="mt-[0.6cqw] text-[1.9cqw] text-white/85">
            {podcast.cover.show}
          </p>
        </div>

        {/* -------------------------- Episode ------------------------ */}
        <div className="flex min-w-0 flex-1 flex-col">
          <p className="text-[3.2cqw] leading-snug font-bold text-balance">
            {podcast.episode.title}
          </p>
          <p className="mt-[1cqw] text-[2.1cqw] text-neutral-600">
            {podcast.episode.meta}
          </p>

          {/* Waveform. */}
          <div className="mt-[2.4cqw] flex h-[7cqw] items-center gap-[0.5cqw]">
            {bars.map((height, index) => (
              <span
                key={index}
                className={cn(
                  "w-[0.55cqw] rounded-full",
                  index < playedBars ? "bg-[#d1503f]" : "bg-[#e07f63]",
                )}
                style={{ height: `${height}%` }}
              />
            ))}
          </div>

          {/* Scrubber. */}
          <div className="mt-[2cqw]">
            <span className="relative block h-[0.55cqw] rounded-full bg-neutral-900/12">
              <span
                className="absolute inset-y-0 left-0 rounded-full bg-[#d1503f]"
                style={{ width: `${podcast.episode.progress * 100}%` }}
              />
              <span
                className="absolute top-1/2 size-[1.8cqw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d1503f]"
                style={{ left: `${podcast.episode.progress * 100}%` }}
              />
            </span>

            <div className="mt-[1cqw] flex justify-between text-[1.9cqw] text-neutral-600">
              <span>{podcast.episode.elapsed}</span>
              <span>{podcast.episode.duration}</span>
            </div>
          </div>

          {/* Transport. */}
          <div className="mt-[1.6cqw] flex items-center justify-center gap-[3cqw]">
            <SkipIcon
              seconds={podcast.episode.skip}
              direction="back"
              className="size-[4cqw] text-neutral-700"
            />
            <span className="grid size-[7cqw] place-items-center rounded-full bg-[#e2543f] text-white shadow-[0_1cqw_2.5cqw_rgb(226_84_63/0.45)]">
              <PlayIcon className="size-[3.4cqw] translate-x-[0.2cqw]" />
            </span>
            <SkipIcon
              seconds={podcast.episode.skip}
              direction="forward"
              className="size-[4cqw] text-neutral-700"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========================================================================== */
/*  SECTION                                                                   */
/* ========================================================================== */

export function MagicExperiences() {
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
    <section className="bg-neutral-50 py-section-lg text-neutral-900">
      <Container width="hero">
        {/* ============================ Heading ======================= */}
        <div className="max-w-[46rem]">
          <motion.p
            {...rise(0)}
            className={cn(
              "text-[0.6875rem] font-bold tracking-[0.14em] uppercase",
              "text-brand-600 sm:text-xs",
            )}
          >
            {experiences.eyebrow}
          </motion.p>

          <motion.h2
            {...rise(0.08)}
            className={cn(
              // The serif, as the design sets it — the same editorial voice
              // section 3 and the problem section use.
              "mt-4 font-serif font-normal tracking-[-0.01em]",
              "leading-[1.08] text-balance",
              // Measured from the design at ~54px on a 1440 frame.
              "text-[2rem] sm:text-[2.5rem] lg:text-[3.125rem]",
            )}
          >
            {experiences.headline}
          </motion.h2>

          <motion.p
            {...rise(0.16)}
            className={cn(
              "mt-5 max-w-[38rem] leading-relaxed text-pretty",
              "text-[0.9375rem] text-neutral-600 sm:text-base",
            )}
          >
            {experiences.description}
          </motion.p>
        </div>

        {/* ============================= Grid ========================= */}
        <ul
          className={cn(
            "mt-12 grid gap-5 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3",
          )}
        >
          {experiences.items.map((item, index) => (
            <motion.li
              key={item.title}
              // Staggered by column, so a row lands together rather than
              // rippling across three cards.
              {...rise(0.06 * (index % 3))}
              className={cn(
                "group flex flex-col overflow-hidden rounded-2xl",
                "bg-white ring-1 ring-neutral-200",
                // `translate`, not `transform`: Tailwind v4 compiles the
                // translate utilities to the standalone property.
                "duration-normal transition-[box-shadow,translate,--tw-ring-color] ease-out",
                "will-change-[translate]",
                "hover:-translate-y-1 hover:ring-brand-200",
                "hover:shadow-[0_22px_48px_-28px_rgb(17_19_35/0.35)]",
              )}
            >
              {/* --------------------- Preview -------------------- */}
              {item.preview === "image" && (
                <Uncopyable>
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    width={item.image.width}
                    height={item.image.height}
                    sizes="(min-width: 1024px) 26rem, (min-width: 640px) 45vw, 92vw"
                    className="aspect-video w-full object-cover"
                  />
                </Uncopyable>
              )}

              {/*
                NOT wrapped in Uncopyable: it owns the section's one real
                control, and Uncopyable sets aria-hidden — which would take
                the play button out of the accessibility tree and leave a
                control no screen reader could reach. `select-none` gives it
                the copy behaviour without the hiding.
              */}
              {item.preview === "video" && (
                <div className="select-none">
                  <VideoPreview media={item.media} title={item.title} />
                </div>
              )}

              {item.preview === "challenge" && (
                <Uncopyable>
                  <ChallengePreview challenge={item.challenge} />
                </Uncopyable>
              )}

              {item.preview === "quiz" && (
                <Uncopyable>
                  <QuizPreview quiz={item.quiz} />
                </Uncopyable>
              )}

              {item.preview === "quest" && (
                <Uncopyable>
                  <QuestPreview quest={item.quest} />
                </Uncopyable>
              )}

              {item.preview === "podcast" && (
                <Uncopyable>
                  <PodcastPreview podcast={item.podcast} />
                </Uncopyable>
              )}

              {/* ----------------------- Body --------------------- */}
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-[1.0625rem] font-semibold sm:text-[1.125rem]">
                  {item.title}
                </h3>

                <p className="mt-2 text-[0.875rem] leading-relaxed text-pretty text-neutral-600">
                  {item.description}
                </p>

                {/* Pushed to the bottom so all six links share a baseline
                    however long the description runs. */}
                <Link
                  href={experiences.action.href}
                  className={cn(
                    "mt-5 inline-flex items-center gap-1.5 self-start",
                    "text-[0.875rem] font-medium text-brand-600",
                    "duration-normal transition-colors ease-out",
                    "hover:text-brand-700",
                    "focus-visible:ring-2 focus-visible:ring-brand-500",
                    "focus-visible:rounded-sm focus-visible:outline-none",
                  )}
                >
                  {/* The card title, for screen readers: six links all
                      reading "Explore" is useless out of context. */}
                  <span>
                    {experiences.action.label}
                    <span className="sr-only"> {item.title}</span>
                  </span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "duration-normal transition-[translate] ease-out",
                      "group-hover:translate-x-1",
                    )}
                  >
                    →
                  </span>
                </Link>
              </div>
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
