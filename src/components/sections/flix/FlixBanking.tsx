"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { Uncopyable } from "@/components/ui/Uncopyable";

import { FlixArrow } from "./FlixArrow";
import { flix } from "@/content/flix";
import { cn } from "@/lib/utils";

/**
 * LURNYFLIX — THE BANKING USE CASE
 * ---------------------------------------------------------------------------
 * Section 4: mirrored against section 3 — the visual on the LEFT, the story on
 * the right. A scenario-script card feeds, through a "Generate with AI" pill,
 * the AI-generated video panel beneath it.
 *
 * ONLY THE RENDERED STILLS ARE RASTERS
 * Four generated illustrations ship — the main frame and three scene
 * thumbnails. Everything around them is drawn here: the panel frame, the
 * LurnyFlix header, the "AI-generated video" pill, the transport bar, the
 * scene captions, the whole script card, its pill and the arrow between them.
 *
 * The two supplied cards DO carry alpha this time (section 3's did not), so
 * they could have been layered without seaming. They are still rebuilt: their
 * copy is baked in as pixels at a size this section renders small, which is
 * soft on screen and unreadable to a screen reader.
 *
 * The one concession is the main frame's scene chip and subtitle, which are
 * burnt into the render with no clean plate underneath. Those two strings stay
 * pixels; redrawing them would print a second chip over the first.
 * See scripts/build-flix-banking.cjs.
 *
 * THE ARROW FOLLOWS THE CARDS
 * The script card and the panel are placed in one percentage stage, and the
 * arrow's path is written in that same space — leaving the card's right edge
 * and landing on the panel's top edge. Change a slot and the arrow's endpoints
 * are re-derived from it.
 *
 * BELOW LG the script card, the pill and the panel stack in flow and the arrow
 * is dropped: a curve between stacked cards has nothing to span.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { banking } = flix;

/**
 * WHERE THE PIECES SIT, as percentages of the stage.
 *
 * The design tucks the script card over the panel's top-left corner, with the
 * pill out to its right and the arrow curving between them.
 */
const SLOTS = {
  script: "left-[0%] top-[0%] w-[44%]",
  action: "left-[52%] top-[4%]",
  /*
   * The panel starts BELOW the script card's foot rather than tucked under it.
   * Overlapping further (the design's look at its widest) buried the panel's
   * "LurnyFlix" header behind the card at lg, where the stage is narrowest —
   * the pieces keep their designed proportion but the stage does not.
   */
  panel: "left-[12%] top-[27%] w-[88%]",
} as const;

/**
 * THE ARROW.
 *
 * Drawn by FlixArrow in its "chevron" variant — the design's own style here: a
 * round-capped stroke ending in a V of two more strokes at the same weight,
 * like one pen stroke rather than a stroke with a filled triangle stuck on the
 * end. See the note at the top of FlixArrow.
 *
 * DIRECTION MATTERS: the flow the design draws is script -> pill -> video, so
 * the arrow LEAVES the script card's right edge, passes under the pill, and
 * lands on the video panel's top-left corner.
 *
 * Endpoints are percentages of the stage, measured off the rendered layout
 * AFTER its entrance animations have settled — read cold, the lifted pieces
 * sit 28px low and the panel's top reads as 34% instead of 27%, which put the
 * head underneath it:
 *
 *   script card  x  0..44,   y  0..17.7
 *   pill         x 52..63.3, y  4..7.9
 *   panel        x 12..100,  y 27..
 */
const ARROWS = [
  {
    id: "script-to-video",
    /* Starts INSIDE the script card (x 0..44, y 0..17.7) at its mid-height,
       so the tail is hidden and the line emerges from the right edge. Bows up
       and right to pass just beneath the pill (y 4..7.9), then turns back
       down to land on the panel's top edge (y=27) under the pill's left end,
       as the design places the head. */
    from: { x: 41.5, y: 9 },
    to: { x: 53, y: 26.4 },
    bow: -0.36,
    weight: 2.2,
    head: 14,
    delay: 0.95,
  },
] as const;

export function FlixBanking() {
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

  /** The lift the script card and the panel share. */
  const lift = (delay: number) => ({
    initial: reduce
      ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
      : { opacity: 0, y: 28, scale: 0.95, filter: "blur(8px)" },
    whileInView: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
    viewport: { once: true, amount: "some" } as const,
    transition: { duration: 0.9, delay, ease: easeOut },
  });

  return (
    <section className="relative isolate overflow-hidden bg-[#e9e6fa] py-section-lg">
      {/* The lavender ground. Covers the section, so everything sits on it. */}
      <Image
        src={banking.backdrop.src}
        alt={banking.backdrop.alt}
        width={banking.backdrop.width}
        height={banking.backdrop.height}
        aria-hidden="true"
        sizes="100vw"
        className="pointer-events-none absolute inset-0 -z-10 size-full object-cover"
      />

      <Container width="hero">
        {/* The visual leads on lg; below that the copy comes first, since a
            story should not open with an unexplained screenshot. */}
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.72fr)] lg:gap-12 xl:gap-16">
          {/* ========================== The stage ===================== */}
          <Uncopyable className="relative order-2 lg:order-none">
            <div className="relative lg:aspect-[1.24] @container">
              {/* ------------------------- Arrow ------------------- */}
              {/* No z-index: the script card and pill carry z-10 and the panel
                  is positioned after this in the DOM, so all three paint OVER
                  the arrow — the tail starts inside the script card and is
                  hidden by it. */}
              <FlixArrow
                arrows={ARROWS}
                variant="chevron"
                colour="#7b16e8"
                reduce={Boolean(reduce)}
                className="hidden lg:block"
              />

              {/* ------------------------ The pieces --------------- */}
              {/* Absolute from lg up, an ordinary stack below it. */}
              <div
                className={cn(
                  "flex flex-col items-start gap-5 lg:block",
                  /*
                   * The stacked pieces need their OWN base size — without one
                   * they inherit the section's 16px and the `em` sizing below
                   * overflows a phone.
                   */
                  "text-[max(7px,2.2vw)] sm:text-[max(8px,1.5vw)]",
                  // Above lg the stage drives the scale instead.
                  "lg:text-[max(8px,0.92cqw)]",
                )}
              >
                <motion.div
                  {...lift(0.35)}
                  className={cn("z-10 lg:absolute", SLOTS.script)}
                >
                  <ScriptCard />
                </motion.div>

                {/* The action pill. Its own slot on lg, where the design sets
                    it out to the script card's right. */}
                <motion.div
                  {...lift(0.6)}
                  className={cn("z-10 lg:absolute", SLOTS.action)}
                >
                  <span
                    className={cn(
                      "inline-flex items-center rounded-[0.7em]",
                      "bg-gradient-to-r from-[#7b16e8] to-[#9b3ae6]",
                      "px-[1.1em] py-[0.6em]",
                      "text-[1em] font-semibold text-white",
                      "shadow-[0_10px_26px_-10px_rgb(84_14_160/0.7)]",
                    )}
                  >
                    {banking.script.action}
                  </span>
                </motion.div>

                <motion.div
                  {...lift(1.15)}
                  className={cn("w-full lg:absolute", SLOTS.panel)}
                >
                  <VideoPanel />
                </motion.div>
              </div>
            </div>
          </Uncopyable>

          {/* ========================= Right column =================== */}
          <div className="order-1 lg:order-none">
            <motion.p
              {...rise(0.05)}
              className={cn(
                "text-[0.6875rem] font-bold uppercase sm:text-xs",
                "tracking-[0.18em] text-[#6d28d9]",
              )}
            >
              {banking.eyebrow}
            </motion.p>

            <motion.p
              {...rise(0.12)}
              className={cn(
                "mt-2.5 text-[0.6875rem] font-semibold uppercase sm:text-xs",
                "tracking-[0.16em] text-[#5b5478]",
              )}
            >
              {banking.sector}
            </motion.p>

            <motion.h2
              {...rise(0.22)}
              className={cn(
                "mt-6 font-display font-bold tracking-[-0.035em]",
                "leading-[1.06] text-[#171326]",
                "text-[1.875rem] sm:text-[2.25rem] xl:text-[2.75rem]",
              )}
            >
              {banking.headline.map((line) => (
                <span key={line} className="inline lg:block">
                  {line}{" "}
                </span>
              ))}
            </motion.h2>

            <div className="mt-7 space-y-5">
              {banking.story.map((paragraph, index) => (
                <motion.p
                  key={paragraph}
                  {...rise(0.34 + index * 0.1)}
                  className={cn(
                    "max-w-[30rem] leading-relaxed text-pretty",
                    "text-[0.9375rem] text-[#3f3a52] sm:text-[1rem]",
                  )}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            <motion.p
              {...rise(0.6)}
              className="mt-9 flex items-center gap-4 text-[0.9375rem] text-[#2f2941]"
            >
              <TickIcon className="size-9 shrink-0 text-[#7b16e8]" />
              {banking.note}
            </motion.p>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ========================================================================== */
/*  The two pieces                                                            */
/* ========================================================================== */

/**
 * THE SOURCE SCRIPT — two turns of dialogue in a titled card.
 *
 * Sized in `em` so it scales with whichever context sets the font size.
 */
function ScriptCard() {
  const { script } = banking;

  return (
    <div
      className={cn(
        "rounded-[1.1em] bg-[#f4f2fc] p-[1.1em]",
        "shadow-[0_24px_54px_-22px_rgb(40_20_90/0.35)]",
      )}
    >
      <div className="flex items-center gap-[0.75em] pb-[0.9em]">
        <ScriptIcon className="size-[2.2em] shrink-0" />
        <span className="text-[1.15em] font-bold tracking-[-0.015em] text-[#1d0f3d]">
          {script.title}
        </span>
      </div>

      {/* The dialogue, ruled between the turns as the design sets it. */}
      <div className="rounded-[0.8em] bg-white p-[1em]">
        {script.lines.map((line, index) => (
          <p
            key={line.speaker}
            className={cn(
              "text-[1em] leading-[1.5] text-[#1d1530]",
              index > 0 && "mt-[0.9em] border-t border-[#eceaf6] pt-[0.9em]",
            )}
          >
            <span className="font-bold">{line.speaker}</span> {line.text}
          </p>
        ))}
      </div>
    </div>
  );
}

/**
 * THE GENERATED VIDEO — the player and its three scenes.
 *
 * The four stills are the only rasters; the frame, header, pill, transport and
 * captions are drawn.
 */
function VideoPanel() {
  const { video } = banking;

  return (
    <div
      className={cn(
        "rounded-[1.1em] bg-[#eeeafb] p-[0.9em]",
        "shadow-[0_30px_66px_-24px_rgb(40_20_90/0.45)]",
      )}
    >
      {/* --------------------------- Header ------------------------ */}
      <div className="flex items-center justify-between gap-[1em] pb-[0.85em]">
        <span className="flex items-center gap-[0.65em]">
          <span
            className={cn(
              "flex size-[2.1em] shrink-0 items-center justify-center",
              "rounded-[0.55em] bg-[#e2d6fb]",
            )}
          >
            <PlayIcon className="size-[1em] text-[#6d15d6]" />
          </span>
          <span className="text-[1.25em] font-bold tracking-[-0.02em] text-[#1d0f3d]">
            {video.engine}
          </span>
        </span>

        <span
          className={cn(
            "shrink-0 rounded-full bg-[#e2d6fb] px-[1em] py-[0.45em]",
            "text-[0.9em] font-medium text-[#5b21b6]",
          )}
        >
          {video.badge}
        </span>
      </div>

      {/* ----------------------- The main frame -------------------- */}
      {/* Its scene chip and subtitle are part of the render — see the note at
          the top of the file. */}
      <div className="overflow-hidden rounded-t-[0.6em]">
        <Image
          src={video.main.src}
          alt={video.main.alt}
          width={video.main.width}
          height={video.main.height}
          sizes="(min-width: 1024px) 46vw, 92vw"
          className="h-auto w-full"
        />
      </div>

      {/* ------------------------- Transport ----------------------- */}
      <div
        className={cn(
          "flex items-center gap-[1em] rounded-b-[0.6em] bg-[#2a1b4a]",
          "px-[1.1em] py-[0.8em]",
        )}
      >
        <PlayIcon className="size-[1.15em] shrink-0 text-white" />

        {/* The scrubber, filled to roughly a third — where the design sets
            the head. */}
        <span className="relative flex h-[0.35em] flex-1 items-center">
          <span className="absolute inset-0 rounded-full bg-white/30" />
          <span className="absolute left-0 h-full w-[32%] rounded-full bg-[#8b5cf6]" />
          <span className="absolute left-[32%] size-[0.95em] -translate-x-1/2 rounded-full bg-white" />
        </span>

        <VolumeIcon className="size-[1.2em] shrink-0 text-white" />
        <ExpandIcon className="size-[1.1em] shrink-0 text-white" />
      </div>

      {/* ------------------------ The scenes ----------------------- */}
      <ul className="mt-[0.9em] grid grid-cols-3 gap-[0.7em]">
        {video.scenes.map((scene) => (
          <li key={scene.label}>
            <Image
              src={scene.src}
              alt={scene.alt}
              width={scene.width}
              height={scene.height}
              sizes="(min-width: 1024px) 15vw, 30vw"
              className="h-auto w-full rounded-[0.5em]"
            />
            <p className="mt-[0.5em] text-[0.9em] text-[#3f3a52]">
              {scene.label}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ========================================================================== */
/*  Icons                                                                     */
/* ========================================================================== */

/** The script card's document mark. */
function ScriptIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <path
        d="M6 4.5A1.5 1.5 0 0 1 7.5 3h11L26 10.5v17a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 6 27.5v-23Z"
        fill="url(#flix-script-grad)"
      />
      <path d="M18.5 3 26 10.5h-6a1.5 1.5 0 0 1-1.5-1.5V3Z" fill="#c4b5fd" />
      <path
        d="M11 12.5h8M11 17h8M11 21.5h5"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient
          id="flix-script-grad"
          x1="6"
          y1="3"
          x2="26"
          y2="29"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8b5cf6" />
          <stop offset="1" stopColor="#6d28d9" />
        </linearGradient>
      </defs>
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
