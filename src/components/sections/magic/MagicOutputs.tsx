"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import { Uncopyable } from "@/components/ui/Uncopyable";
import { magic } from "@/content/magic";
import { cn } from "@/lib/utils";

/**
 * MAGIC OUTPUTS
 * ---------------------------------------------------------------------------
 * The three cards down the right of the LurnyMagic hero: what one source
 * becomes — a storybook, a video, a practice challenge.
 *
 * DRAWN, NOT SHIPPED
 * Same reasoning as the LurnyPulse illustrations: sharp at every density, the
 * content lives in content/magic.ts, and each card can animate in on its own.
 * All three are wrapped in <Uncopyable> so they behave like the product
 * screenshots they imitate, and are aria-hidden — the hero copy beside them
 * already says what the product does.
 *
 * THE VIDEO
 * The one genuinely interactive thing in the illustration. It does NOT
 * autoplay: an autoplaying video in a hero competes with the copy for
 * attention and burns data for anyone who never looks at it. Instead the
 * poster shows until the play control is used, which is also why the play
 * button is a real <button> when every other control here is a drawn span.
 *
 * That button is the one part of the card that must NOT be aria-hidden, so the
 * card exposes it while hiding the decorative chrome around it.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { outputs } = magic.hero;

/** Chip colours for the practice steps, keyed by the tone in the content. */
const stepTones = {
  violet: "bg-brand-500",
  blue: "bg-[#3b6fe0]",
  green: "bg-[#2f9e5f]",
  amber: "bg-accent-500",
} as const;

/** Shared card chrome: near-black glass panel with a violet hairline, plus a
 *  smooth ring/shadow bloom on hover (the lift itself is the motion gesture). */
const cardChrome = cn(
  "rounded-2xl bg-[#140f22]/85 ring-1 ring-brand-400/20 backdrop-blur-sm",
  "shadow-[0_30px_70px_-30px_rgb(0_0_0/0.9)]",
  "transition duration-400 ease-out",
  "hover:shadow-[0_40px_90px_-28px_rgb(88_40_180/0.6)] hover:ring-brand-300/45",
);

/** The floating label above each card, as in the design. */
function CardTag({ children }: { children: string }) {
  return (
    <span
      className={cn(
        "absolute -top-2.5 left-3.5 z-10 rounded-md px-2.5 py-1",
        "bg-[#1b1430] ring-1 ring-brand-400/25",
        "text-[0.5625rem] font-bold tracking-[0.08em] text-accent-300 uppercase",
      )}
    >
      {children}
    </span>
  );
}

/**
 * The video card.
 *
 * Kept as its own component because it owns state — everything else in the
 * illustration is static markup.
 */
function VideoCard() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { video } = outputs;

  return (
    <div className={cn(cardChrome, "relative p-2")}>
      <CardTag>{video.tag}</CardTag>

      <div className="relative aspect-video overflow-hidden rounded-xl bg-black">
        <video
          ref={videoRef}
          src={video.media.src}
          poster={video.media.poster}
          width={video.media.width}
          height={video.media.height}
          playsInline
          // Muted and looping: this is an illustrative clip, not something
          // anyone came here to listen to.
          muted
          loop
          preload="none"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className="size-full object-cover"
        />

        {/* The play control. A real button — see the note at the top. It
            hides once playing so it stops covering the picture. */}
        {!isPlaying && (
          <button
            type="button"
            onClick={() => void videoRef.current?.play()}
            className={cn(
              "group absolute inset-0 grid place-items-center",
              "focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:outline-none",
            )}
          >
            <span className="sr-only">Play the LurnyFlix sample video</span>
            <span
              className={cn(
                "grid size-12 place-items-center rounded-full",
                "bg-brand-500/90 text-white backdrop-blur-sm",
                // `scale`, not `transform`: Tailwind v4 compiles the scale
                // utilities to the standalone property.
                "duration-normal transition-[scale,background-color] ease-out",
                "group-hover:scale-110 group-hover:bg-brand-500",
              )}
            >
              <svg viewBox="0 0 24 24" className="size-6" fill="currentColor">
                <path d="M9 6.5v11l9-5.5z" />
              </svg>
            </span>
          </button>
        )}
      </div>

      {/* The scrubber. A drawing — the real control is the play button
          above; a fake track is friendlier than a broken slider. */}
      <div aria-hidden="true" className="px-1 pt-2.5 pb-1">
        <span className="block h-1 w-full overflow-hidden rounded-full bg-white/15">
          <span
            className="block h-full rounded-full bg-brand-400"
            style={{ width: `${video.progress * 100}%` }}
          />
        </span>

        <div className="mt-2 flex items-center justify-between">
          <span className="flex items-center gap-2.5">
            <span className="grid size-7 place-items-center rounded-md bg-brand-500/80">
              <svg viewBox="0 0 24 24" className="size-3.5" fill="white">
                <path d="M9 6.5v11l9-5.5z" />
              </svg>
            </span>
            <span className="text-[0.6875rem] text-neutral-400 tabular-nums">
              {video.elapsed} / {video.duration}
            </span>
          </span>

          <span className="grid size-7 place-items-center rounded-md bg-white/8">
            <svg
              viewBox="0 0 16 16"
              className="size-3.5 text-neutral-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <path d="M2 5.5V2.5h3M14 5.5V2.5h-3M2 10.5v3h3M14 10.5v3h-3" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}

export function MagicOutputs({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  const arrive = (delay: number) => ({
    initial: reduce ? "shown" : "hidden",
    whileInView: "shown",
    viewport: { once: true, amount: "some" } as const,
    variants: {
      hidden: { opacity: 0, x: 28, scale: 0.97 },
      shown: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: { duration: 0.75, delay, ease: easeOut },
      },
    },
  });

  // A gentle lift toward the pointer — a soft spring, reduced-motion opt-out.
  // The spring lives on the hover target so it shapes only the hover, leaving
  // the `arrive` entrance easing untouched.
  const hover = reduce
    ? {}
    : {
        whileHover: {
          y: -6,
          scale: 1.015,
          transition: { type: "spring", stiffness: 280, damping: 20 } as const,
        },
      };

  return (
    <div className={cn("space-y-6", className)}>
      {/* ========================= Storybook ========================== */}
      <Uncopyable
        as={motion.div}
        {...arrive(0.15)}
        {...hover}
        className="relative"
      >
        <div className={cn(cardChrome, "relative p-2")}>
          <CardTag>{outputs.storybook.tag}</CardTag>

          <div className="overflow-hidden rounded-xl">
            <Image
              src={outputs.storybook.image.src}
              alt={outputs.storybook.image.alt}
              width={outputs.storybook.image.width}
              height={outputs.storybook.image.height}
              sizes="(min-width: 1024px) 24rem, 90vw"
              className="aspect-[16/9] w-full object-cover"
            />
          </div>

          <div className="px-1.5 pt-3 pb-1">
            <p className="font-display text-base font-semibold text-white">
              {outputs.storybook.title}
            </p>

            <div className="mt-2 flex items-center justify-between">
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full",
                  "bg-accent-300/12 px-2.5 py-1 ring-1 ring-accent-300/25",
                  "text-[0.625rem] font-semibold text-accent-300",
                )}
              >
                <svg viewBox="0 0 16 16" className="size-3" fill="currentColor">
                  <path d="M9 1.5 3.5 9H7l-.6 5.5L12.5 7H9z" />
                </svg>
                {outputs.storybook.xp}
              </span>

              <span className="flex items-center gap-1.5 text-[0.6875rem] text-neutral-400">
                <svg
                  viewBox="0 0 16 16"
                  className="size-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                >
                  <circle cx="6.5" cy="5" r="2.6" />
                  <path d="M2 13.2a4.5 4.5 0 0 1 9 0" />
                </svg>
                {outputs.storybook.learners}
              </span>
            </div>
          </div>
        </div>
      </Uncopyable>

      {/* =========================== Video ============================ */}
      {/*
        Not wrapped in Uncopyable: it contains the one real control in the
        illustration, and hiding it from assistive technology would leave a
        play button no screen reader could find.
      */}
      <motion.div {...arrive(0.28)} {...hover} className="relative select-none">
        <VideoCard />
      </motion.div>

      {/* ========================== Practice ========================== */}
      <Uncopyable
        as={motion.div}
        {...arrive(0.41)}
        {...hover}
        className="relative"
      >
        <div className={cn(cardChrome, "relative px-3.5 pt-4 pb-3.5")}>
          <CardTag>{outputs.practice.tag}</CardTag>

          <div className="flex items-start gap-3">
            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-accent-500/15 text-base">
              📦
            </span>
            <div className="min-w-0">
              <p className="text-[0.875rem] font-semibold text-white">
                {outputs.practice.title}
              </p>
              <p className="text-[0.6875rem] text-neutral-400">
                {outputs.practice.meta}
              </p>
            </div>
          </div>

          <p className="mt-3 text-[0.6875rem] leading-relaxed text-neutral-300">
            {outputs.practice.instruction}
          </p>

          {/* The five steps. The design lays the first four out two-up and
              gives the last the full width. */}
          <ol className="mt-3 grid grid-cols-2 gap-2">
            {outputs.practice.steps.map((step, index) => (
              <li
                key={step.label}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-2 py-1.5",
                  "ring-1 ring-white/10",
                  // The fifth step spans both columns, as in the design.
                  index === outputs.practice.steps.length - 1 &&
                    "col-span-2 justify-center",
                )}
              >
                <span
                  className={cn(
                    "grid size-5 shrink-0 place-items-center rounded-md",
                    "text-[0.625rem] font-bold text-white",
                    stepTones[step.tone],
                  )}
                >
                  {index + 1}
                </span>
                <span className="truncate text-[0.6875rem] text-neutral-200">
                  {step.label}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </Uncopyable>
    </div>
  );
}
