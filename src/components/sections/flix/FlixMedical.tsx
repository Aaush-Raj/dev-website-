"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { Uncopyable } from "@/components/ui/Uncopyable";

import { FlixArrow } from "./FlixArrow";
import { flix } from "@/content/flix";
import { cn } from "@/lib/utils";

/**
 * LURNYFLIX — THE MEDICAL USE CASE
 * ---------------------------------------------------------------------------
 * Section 3: the story on the left; on the right a three-card flow — the
 * original PPT, the finished video, the Vimeo upload — joined by two curved
 * arrows.
 *
 * ONLY THE PHOTOGRAPHS ARE RASTERS
 * The pack supplies each card as a whole flattened PNG and each arrow as a
 * full 1672x941 frame. Every one is OPAQUE on the section's dark ground, so
 * layering any would seam a dark rectangle onto the gradient. All of that
 * chrome is drawn here instead — card frames, the PowerPoint header, the teal
 * slide band, the bullet rows, the player transport, the track chips, the
 * "Video ready" pill and the Vimeo card — which keeps every string selectable
 * and lets the pieces animate independently.
 *
 * The exception is the three PHOTOGRAPHS inside those cards, which markup
 * cannot draw. See scripts/build-flix-medical.cjs.
 *
 * THE SLIDE IS DECLARED ONCE
 * Both cards render the same `medical.slide` — the source PPT alone, and the
 * finished video beside the presenter. That is the section's own claim ("every
 * slide design and image intact"), so the two must not be able to drift apart.
 *
 * THE ARROWS FOLLOW THE CARDS
 * Card slots are percentages of one stage, and each arrow's path is written in
 * that same percentage space, leaving one card's edge and landing on the next.
 * Change a slot and the arrow's endpoints are re-derived from it rather than
 * silently pointing at where the card used to be.
 *
 * BELOW LG the three cards stack in flow and the arrows are dropped — a curve
 * between stacked cards has nothing to span. The section reads as three steps
 * in order either way.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { medical } = flix;

/** The mark beside each point on the slide. */
const pointIcons = {
  ear: EarIcon,
  speech: SpeechIcon,
  people: PeopleIcon,
} as const;

/** The mark on each track chip under the player. */
const trackIcons = {
  mic: MicIcon,
  note: NoteIcon,
} as const;

/**
 * WHERE THE CARDS SIT, as percentages of the stage.
 *
 * The design overlaps them: the video card's top-left tucks under the PPT
 * card's bottom-right, and the Vimeo chip sits off the video card's foot. The
 * arrows below are written against these numbers.
 */
const SLOTS = {
  source: "left-[0%] top-[0%] w-[60%]",
  /*
   * The video card starts BELOW the PPT card's foot rather than a third of the
   * way up it. Overlapping further (the design's own look at its widest) clips
   * the PPT card's third bullet at lg, where the stage is narrowest — the
   * cards keep their designed proportion but the stage does not.
   */
  video: "left-[22%] top-[38%] w-[78%]",
  upload: "left-[52%] top-[90%] w-[48%]",
} as const;

/**
 * THE TWO ARROWS.
 *
 * Drawn by FlixArrow in its "solid" variant — the design's own style here: a
 * single filled path whose shaft tapers into a swept-back barb, with no stroke
 * on it anywhere. See the note at the top of FlixArrow for why the previous
 * stroke-plus-triangle was wrong.
 *
 * Endpoints are percentages of the stage, measured off the rendered layout
 * AFTER its entrance animations have settled — read cold, every lifted card
 * sits 28px low and 4% small, and targets derived from that land beneath
 * their cards:
 *
 *   PPT card    x  0..60,  y  0..38
 *   video card  x 22..100, y 38..83
 *   Vimeo card  x 52..100, y 90..97.9
 *
 * `bow` is how far the curve bends, as a fraction of the run — positive bows
 * left of the direction of travel. One number rather than two control points,
 * so these can be tuned against the design without re-deriving a cubic.
 */
const ARROWS = [
  {
    id: "ppt-to-video",
    /* Starts INSIDE the PPT card (x 0..60, y 0..38) so the tail is hidden and
       the arrow emerges from its right edge; arcs out and down to land on the
       video card's top edge (y=38) two-thirds of the way across it, as the
       design places the head. The tip stops a hair above the edge so the
       card never swallows it. */
    from: { x: 57, y: 10 },
    to: { x: 72, y: 37.3 },
    bow: -0.3,
    weight: 4.2,
    head: 13,
    delay: 0.95,
  },
  {
    id: "to-vimeo",
    /* Starts INSIDE the video card (foot at y=83), directly beneath the
       "Background music" chip — the card hides the tail, so nothing crosses
       the chip — emerges from the foot heading down, then sweeps right onto
       the Vimeo card's left edge (x=52) at its mid-height (y 90..97.9). */
    from: { x: 40, y: 79 },
    to: { x: 51.5, y: 94 },
    bow: 0.3,
    weight: 3.6,
    head: 11,
    delay: 1.5,
  },
] as const;

export function FlixMedical() {
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduce ? "shown" : "hidden",
    whileInView: "shown",
    viewport: { once: true, amount: "some" } as const,
    variants: {
      hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
      shown: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.85, delay, ease: easeOut },
      },
    },
  });

  /** The lift the three cards share. */
  const lift = (delay: number) => ({
    initial: reduce
      ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
      : { opacity: 0, y: 28, scale: 0.95, filter: "blur(8px)" },
    whileInView: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
    viewport: { once: true, amount: "some" } as const,
    transition: { duration: 0.9, delay, ease: easeOut },
  });

  return (
    <section className="relative isolate overflow-hidden bg-[#2b1b4d] py-section-lg text-white">
      {/* The gradient. Covers the section, so everything sits on it. */}
      <Image
        src={medical.backdrop.src}
        alt={medical.backdrop.alt}
        width={medical.backdrop.width}
        height={medical.backdrop.height}
        aria-hidden="true"
        sizes="100vw"
        className="pointer-events-none absolute inset-0 -z-10 size-full object-cover"
      />

      <Container width="hero">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1fr)] lg:gap-12 xl:gap-16">
          {/* ========================= Left column ==================== */}
          <div>
            <motion.p
              {...rise(0.05)}
              className={cn(
                "text-[0.6875rem] font-bold uppercase sm:text-xs",
                "tracking-[0.18em] text-[#b98cff]",
              )}
            >
              {medical.eyebrow}
            </motion.p>

            <motion.p
              {...rise(0.12)}
              className={cn(
                "mt-2.5 text-[0.6875rem] font-semibold uppercase sm:text-xs",
                "tracking-[0.16em] text-[#cdc4dd]",
              )}
            >
              {medical.sector}
            </motion.p>

            <motion.h2
              {...rise(0.22)}
              className={cn(
                "mt-6 font-display font-bold tracking-[-0.035em]",
                "leading-[1.06] text-white",
                "text-[1.875rem] sm:text-[2.25rem] xl:text-[2.75rem]",
              )}
            >
              {medical.headline.map((line) => (
                <span key={line} className="inline lg:block">
                  {line}{" "}
                </span>
              ))}
            </motion.h2>

            {/* --------------------- The story ---------------------- */}
            <div className="mt-7 space-y-5">
              {medical.story.map((paragraph, index) => (
                <motion.p
                  key={paragraph}
                  {...rise(0.34 + index * 0.1)}
                  className={cn(
                    "max-w-[30rem] leading-relaxed text-pretty",
                    "text-[0.9375rem] text-[#cabfdd] sm:text-[1rem]",
                  )}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* ---------------------- The note ---------------------- */}
            <motion.p
              {...rise(0.7)}
              className="mt-9 flex items-center gap-4 text-[0.9375rem] text-[#e2dcef]"
            >
              <TickIcon className="size-9 shrink-0 text-[#a970ff]" />
              {medical.note}
            </motion.p>
          </div>

          {/* ========================== The stage ===================== */}
          {/* The three cards and the two arrows between them. Percentage-
              positioned from lg up so the arrows keep meeting the cards; below
              that everything stacks in flow and the arrows are dropped. */}
          <Uncopyable className="relative">
            <div className="relative lg:aspect-[1.26] @container">
              {/* ------------------------ Arrows ------------------- */}
              {/* No z-index: the cards are positioned later in the DOM (and
                  two carry z-10), so they paint OVER the arrows, hiding the
                  tails that start inside them. */}
              <FlixArrow
                arrows={ARROWS}
                variant="solid"
                colour="#a970ff"
                reduce={Boolean(reduce)}
                className="hidden lg:block"
              />

              {/* The first arrow's label, beside its curve. Positioned in the
                  same percentage space as the arrow it names. */}
              <motion.p
                {...rise(1.15)}
                className={cn(
                  "absolute left-[82%] top-[18%] z-20 hidden lg:block",
                  "text-[0.8125rem] font-medium text-[#c4a6ff]",
                )}
              >
                {medical.arrows.pptToVideo}
              </motion.p>

              {/* ------------------------- Cards ------------------- */}
              {/* Absolute from lg up, an ordinary stack below it. */}
              <div
                className={cn(
                  "flex flex-col gap-5 lg:block",
                  /*
                   * The stacked cards need their OWN base size. Without one
                   * they inherited the section's 16px, at which the slide's
                   * `em` sizing overflowed a phone and clipped every bullet
                   * label ("Listen with attentio…"). It grows with the
                   * viewport so the cards stay legible up to the lg switch.
                   */
                  "text-[max(7px,2.1vw)] sm:text-[max(8px,1.5vw)]",
                  // Above lg the stage drives the scale instead.
                  "lg:text-[max(8px,0.85cqw)]",
                )}
              >
                <motion.div
                  {...lift(0.5)}
                  className={cn("lg:absolute", SLOTS.source)}
                >
                  <SourceCard />
                </motion.div>

                <motion.div
                  {...lift(1.05)}
                  className={cn("z-10 lg:absolute", SLOTS.video)}
                >
                  <VideoCard />
                </motion.div>

                <motion.div
                  {...lift(1.7)}
                  className={cn("z-10 lg:absolute", SLOTS.upload)}
                >
                  <UploadCard />
                </motion.div>
              </div>
            </div>
          </Uncopyable>
        </div>
      </Container>
    </section>
  );
}

/* ========================================================================== */
/*  The three cards                                                           */
/* ========================================================================== */

/**
 * CARD 1 — the original teaching PPT.
 *
 * Sized in `em` so it scales with whichever context sets the font size.
 */
function SourceCard() {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[1.1em] bg-white p-[1em]",
        "shadow-[0_26px_58px_-20px_rgb(0_0_0/0.6)]",
      )}
    >
      {/* The PowerPoint header. */}
      <div className="flex items-center gap-[0.7em] pb-[0.85em]">
        <PowerPointIcon className="size-[2em] shrink-0" />
        <span className="text-[1.15em] font-bold tracking-[-0.01em] text-[#16265c]">
          {medical.source.title}
        </span>
      </div>

      <Slide />
    </div>
  );
}

/**
 * CARD 2 — the finished video.
 *
 * The same slide, now beside the presenter, under a transport bar and the two
 * track chips.
 */
function VideoCard() {
  const { video } = medical;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-[1.1em] p-[1em]",
        "bg-[#f4f1fd]",
        "shadow-[0_30px_66px_-22px_rgb(0_0_0/0.68)]",
      )}
    >
      {/* --------------------------- Header ------------------------ */}
      <div className="flex items-center justify-between gap-[1em] pb-[0.85em]">
        <span className="flex items-center gap-[0.65em]">
          <span
            className={cn(
              "flex size-[2em] shrink-0 items-center justify-center",
              "rounded-[0.5em] bg-[#7b16e8]",
            )}
          >
            <PlayIcon className="size-[0.9em] text-white" />
          </span>
          <span className="text-[1.15em] font-bold tracking-[-0.015em] text-[#1a1030]">
            {video.engine}
          </span>
        </span>

        <span
          className={cn(
            "flex shrink-0 items-center gap-[0.45em] rounded-full",
            "bg-[#e7dcfb] px-[0.85em] py-[0.4em]",
            "text-[0.82em] font-medium text-[#4c1d95]",
          )}
        >
          <CheckIcon className="size-[1.05em]" />
          {video.status}
        </span>
      </div>

      {/* ------------------- The slide and presenter --------------- */}
      {/* The slide keeps its own aspect while the presenter fills the
          remaining column, as the design frames them. */}
      <div className="flex overflow-hidden rounded-[0.5em]">
        <div className="min-w-0 flex-[2.4]">
          <Slide rounded={false} />
        </div>

        <div className="relative min-w-0 flex-1">
          <Image
            src={video.avatar.src}
            alt={video.avatar.alt}
            width={video.avatar.width}
            height={video.avatar.height}
            sizes="(min-width: 1024px) 14vw, 30vw"
            className="absolute inset-0 size-full object-cover"
          />
        </div>
      </div>

      {/* ------------------------- Transport ----------------------- */}
      <div
        className={cn(
          "flex items-center gap-[0.9em] rounded-b-[0.5em] bg-[#1c1830]",
          "px-[1em] py-[0.75em]",
        )}
      >
        <PlayIcon className="size-[1.1em] shrink-0 text-white" />

        {/* The scrubber, filled to roughly a fifth — where the design sets
            the head. */}
        <span className="relative flex h-[0.35em] flex-1 items-center">
          <span className="absolute inset-0 rounded-full bg-white/25" />
          <span className="absolute left-0 h-full w-[20%] rounded-full bg-[#8b5cf6]" />
          <span className="absolute left-[20%] size-[0.85em] -translate-x-1/2 rounded-full bg-[#8b5cf6]" />
        </span>

        <VolumeIcon className="size-[1.15em] shrink-0 text-white" />
        <ExpandIcon className="size-[1.05em] shrink-0 text-white" />
      </div>

      {/* ------------------------ Track chips ---------------------- */}
      <div className="mt-[0.9em] flex flex-wrap gap-[0.6em]">
        {video.tracks.map((track) => {
          const Icon = trackIcons[track.icon];

          return (
            <span
              key={track.label}
              className={cn(
                "flex items-center gap-[0.5em] rounded-full",
                "bg-[#e9e2fb] px-[0.9em] py-[0.5em]",
                "text-[0.88em] font-medium text-[#2f2352]",
              )}
            >
              <Icon className="size-[1.05em] shrink-0 text-[#5b21b6]" />
              {track.label}
            </span>
          );
        })}
      </div>
    </div>
  );
}

/** CARD 3 — where the finished video goes. */
function UploadCard() {
  const { upload } = medical;

  return (
    <div
      className={cn(
        "flex items-center gap-[0.9em] rounded-[1em] bg-white",
        "px-[1.1em] py-[0.95em]",
        "shadow-[0_24px_52px_-20px_rgb(0_0_0/0.6)]",
      )}
    >
      <VimeoIcon className="size-[2.6em] shrink-0" />

      <span className="min-w-0">
        <span className="block text-[1.1em] font-bold tracking-[-0.015em] text-[#16265c]">
          {upload.title}
        </span>
        <span className="mt-[0.15em] block text-[1em] text-[#3f3a52]">
          {upload.subtitle}
        </span>
      </span>
    </div>
  );
}

/**
 * THE SLIDE — the teaching content itself.
 *
 * Drawn once and used by both cards, so the section's claim that the slide is
 * preserved is true by construction rather than by two matching copies.
 */
function Slide({ rounded = true }: { rounded?: boolean }) {
  const { slide } = medical;

  return (
    <div
      className={cn(
        "overflow-hidden bg-white",
        rounded && "rounded-[0.5em]",
      )}
    >
      {/* The teal band across the slide's head. */}
      <div className="h-[0.7em] bg-[#1f8a8c]" />

      <div className="p-[0.9em]">
        <p className="text-[1.15em] font-bold tracking-[-0.015em] text-[#16265c]">
          {slide.title}
        </p>

        <div className="mt-[0.8em] flex gap-[0.9em]">
          {/* The photograph — the one thing here that is not drawn. */}
          <Image
            src={slide.photo.src}
            alt={slide.photo.alt}
            width={slide.photo.width}
            height={slide.photo.height}
            sizes="(min-width: 1024px) 18vw, 40vw"
            className="h-auto w-[46%] shrink-0 self-start rounded-[0.35em]"
          />

          {/* The three points beside it. */}
          <ul className="flex min-w-0 flex-1 flex-col justify-center gap-[0.75em]">
            {slide.points.map((point) => {
              const Icon = pointIcons[point.icon];

              return (
                <li
                  key={point.label}
                  className="flex items-center gap-[0.6em]"
                >
                  <span
                    className={cn(
                      "flex size-[2em] shrink-0 items-center justify-center",
                      "rounded-full bg-[#1f8a8c]",
                    )}
                  >
                    <Icon className="size-[1.1em] text-white" />
                  </span>
                  <span className="text-[0.92em] leading-tight text-[#16265c]">
                    {point.label}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ========================================================================== */
/*  Icons                                                                     */
/* ========================================================================== */

/** PowerPoint — the orange disc on its document, as the source card marks it. */
function PowerPointIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="13" fill="#c43e1c" />
      <path d="M16 3a13 13 0 0 1 13 13H16V3Z" fill="#ed6c47" />
      <rect x="6" y="10" width="14" height="14" rx="2" fill="#fff" />
      <path
        d="M10 21v-8h3.4a2.7 2.7 0 0 1 0 5.4H10"
        stroke="#c43e1c"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

/** Vimeo — the wordmark's "v" on its blue tile. */
function VimeoIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="7" fill="#1ab7ea" />
      <path
        d="M25 11.6c-.1 2.5-1.8 5.9-5.2 10.2-3.5 4.5-6.5 6.8-8.9 6.8-1.5 0-2.8-1.4-3.8-4.2l-2.1-7.7c-.8-2.8-1.6-4.2-2.5-4.2-.2 0-.9.4-2 1.2l-1.2-1.6c1.3-1.1 2.5-2.2 3.7-3.3 1.7-1.4 2.9-2.2 3.7-2.3 2-.2 3.2 1.2 3.7 4.1.5 3.2.8 5.1 1 5.8.6 2.6 1.2 3.9 1.9 3.9.5 0 1.3-.9 2.4-2.6 1-1.7 1.6-3 1.7-3.9.1-1.3-.4-1.9-1.7-1.9-.6 0-1.2.1-1.8.4 1.2-3.9 3.5-5.8 6.9-5.7 2.5.1 3.7 1.7 3.5 5z"
        fill="#fff"
        transform="translate(4 2) scale(0.72)"
      />
    </svg>
  );
}

/** The slide's first point — listening. */
function EarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M8 9a4.5 4.5 0 0 1 9 0c0 2.6-2.4 3.6-3.3 5.4-.5 1-.3 2.3-1.5 3-1.2.7-2.6.1-3-.9"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.4 9.2a1.5 1.5 0 0 1 2.3 1.3c0 1-1.2 1.4-1.5 2.2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** The slide's second point — explaining. */
function SpeechIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 6.5A1.5 1.5 0 0 1 5.5 5h13A1.5 1.5 0 0 1 20 6.5v8a1.5 1.5 0 0 1-1.5 1.5H10l-4.2 3.2a.5.5 0 0 1-.8-.4V16h-.5A1.5 1.5 0 0 1 4 14.5v-8Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** The slide's third point — confirming, as a small group. */
function PeopleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="8.2" r="2.8" fill="currentColor" />
      <circle cx="5.4" cy="10" r="2.2" fill="currentColor" />
      <circle cx="18.6" cy="10" r="2.2" fill="currentColor" />
      <path
        d="M7 18.4c0-2.6 2.2-4.2 5-4.2s5 1.6 5 4.2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M2.4 17.6c0-1.9 1.3-3 3.2-3M21.6 17.6c0-1.9-1.3-3-3.2-3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** The claim's tick, under the story. */
function TickIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 36" fill="none" className={className} aria-hidden="true">
      <circle cx="18" cy="18" r="16" stroke="currentColor" strokeWidth="2" />
      <path
        d="m11.6 18.4 4.4 4.4 8.4-9"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** The "Video ready" pill's tick. */
function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <circle cx="8" cy="8" r="7" fill="currentColor" />
      <path
        d="m5 8.2 2.2 2.2L11 6.2"
        stroke="#e7dcfb"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** The play triangle, in the header mark and the transport. */
function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden="true">
      <path d="M5 3.2 12.4 8 5 12.8V3.2Z" />
    </svg>
  );
}

/** The transport's volume control. */
function VolumeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4 9.5h3.5L12 5.8v12.4L7.5 14.5H4V9.5Z" fill="currentColor" />
      <path
        d="M15.5 9.2a4 4 0 0 1 0 5.6M18.2 6.6a7.7 7.7 0 0 1 0 10.8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** The transport's fullscreen control. */
function ExpandIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path
        d="M6.2 2.4H2.4v3.8M9.8 2.4h3.8v3.8M6.2 13.6H2.4V9.8M9.8 13.6h3.8V9.8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** The voiceover chip's microphone. */
function MicIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="9" y="2.6" width="6" height="11" rx="3" fill="currentColor" />
      <path
        d="M5.4 11.4a6.6 6.6 0 0 0 13.2 0M12 18v3.4"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** The music chip's note. */
function NoteIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M9 18V5.4l10-2v12"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <ellipse cx="6.6" cy="18" rx="2.6" ry="2.2" fill="currentColor" />
      <ellipse cx="16.6" cy="15.4" rx="2.6" ry="2.2" fill="currentColor" />
    </svg>
  );
}
