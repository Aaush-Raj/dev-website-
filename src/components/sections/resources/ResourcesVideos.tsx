"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { resources } from "@/content/resources";
import { cn } from "@/lib/utils";

/**
 * RESOURCES VIDEOS
 * ---------------------------------------------------------------------------
 * Section 8 of the Resources page: one featured help video beside a mosaic of
 * three, on the pale ground.
 *
 * THEY ACTUALLY PLAY
 * The design draws a play button on every thumbnail, so each card holds a real
 * <video> rather than a still with a decorative triangle. Nothing autoplays and
 * nothing preloads — the poster stands in until someone asks for the clip, the
 * same arrangement the LurnyMagic sections use.
 *
 * That makes each card TWO targets, not one: the play button starts the clip in
 * place, and the title beneath it navigates to the video's own page. A
 * whole-card link would have swallowed the play button, which is why this
 * section departs from the whole-card pattern the rest of the page uses.
 *
 * PLACEHOLDER MEDIA
 * No clips or thumbnails were supplied for this section. Every card currently
 * points at the existing LurnyMagic demo and reuses posters from elsewhere in
 * the site — see the TODO in content/resources.ts.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { videos } = resources;

/** The kicker above each title, keyed by the entry's `accent`. */
const kickerTone = {
  violet: "text-[#3f0e9f]",
  green: "text-[#038967]",
  amber: "text-[#e77808]",
} as const;

type VideoEntry = {
  kicker: string;
  title: string;
  duration: string;
  href: string;
  accent: keyof typeof kickerTone;
  video: string;
  poster: string;
  posterAlt: string;
  width: number;
  height: number;
};

export function ResourcesVideos() {
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

  const card = (delay: number) => ({
    initial: reduce ? "shown" : "hidden",
    whileInView: "shown",
    viewport: { once: true, amount: 0.15 } as const,
    variants: {
      hidden: { opacity: 0, y: 24 },
      shown: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay, ease: easeOut },
      },
    },
  });

  return (
    <section className="bg-[#f7f5f8] py-section-lg">
      <Container width="wide">
        {/* =========================== Statement ===================== */}
        <motion.p
          {...rise(0)}
          className={cn(
            "text-[0.6875rem] font-bold uppercase",
            "tracking-[0.16em] text-[#3f0e9f] sm:text-xs",
          )}
        >
          {videos.eyebrow}
        </motion.p>

        <motion.h2
          {...rise(0.08)}
          className={cn(
            "mt-5 font-display font-bold tracking-[-0.035em]",
            "leading-[1.06] text-neutral-950",
            // Measured from the design at ~54px on a 1440 frame.
            "text-[2rem] sm:text-[2.5rem] xl:text-[3.25rem]",
          )}
        >
          {videos.headline}
        </motion.h2>

        <motion.p
          {...rise(0.16)}
          className={cn(
            "mt-4 max-w-160 leading-relaxed text-pretty",
            "text-[1rem] text-neutral-700 sm:text-lg",
          )}
        >
          {videos.description}
        </motion.p>

        {/* --------------------------- Actions -------------------- */}
        <motion.div
          {...rise(0.22)}
          className="mt-8 flex flex-wrap items-center gap-4"
        >
          <Link
            href={videos.actions.primary.href}
            className={cn(
              "inline-flex h-14 items-center justify-center rounded-lg px-8",
              "bg-[#450c98] text-[0.9375rem] font-semibold text-white",
              // `translate`, not `transform`: Tailwind v4 compiles the
              // translate utilities to the standalone property.
              "duration-normal transition-[background-color,box-shadow,translate] ease-out",
              "will-change-[translate]",
              "hover:-translate-y-0.5 hover:bg-[#571ab4]",
              "hover:shadow-[0_16px_34px_-14px_rgb(69_12_152/0.65)]",
              "active:translate-y-0",
            )}
          >
            {videos.actions.primary.label}
          </Link>

          {/* Outbound, so it opens in a new tab and carries the rel. */}
          <Link
            href={videos.actions.secondary.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex h-14 items-center justify-center gap-3 rounded-lg px-7",
              "border border-neutral-300 bg-white",
              "text-[0.9375rem] font-semibold text-neutral-900",
              "duration-normal transition-[background-color,border-color,translate] ease-out",
              "will-change-[translate]",
              "hover:-translate-y-0.5 hover:border-neutral-400 hover:bg-neutral-50",
              "active:translate-y-0",
            )}
          >
            <YouTubeIcon className="h-5 w-7 shrink-0" />
            {videos.actions.secondary.label}
          </Link>
        </motion.div>

        {/* ============================ Mosaic ======================= */}
        {/*
          Measured off the design rather than assumed:

            - The two columns are EQUAL HEIGHT and end on the same line. The
              featured card's thumbnail is tall enough to fill its column
              beside the two stacked rows on the right.
            - Column split is roughly 47/53 — the left card is slightly the
              narrower of the two.
            - Every thumbnail has its OWN aspect. Only the top pair is near
              16:9; the featured is ~3:2 and the wide bottom card ~10:3.

          `items-stretch` (the grid default) is what holds the two columns
          level; an earlier `items-start` let the left card shrink to its
          content and opened a band of empty page beneath it.
        */}
        <div
          className={cn(
            "mt-12 grid gap-5",
            "lg:grid-cols-[minmax(0,0.94fr)_minmax(0,1fr)]",
          )}
        >
          <motion.div {...card(0.28)} className="flex">
            <VideoCard entry={videos.featured} featured />
          </motion.div>

          {/*
            The right block: two cards across the top, then one spanning the
            full width beneath. `auto_1fr` lets the wide card take whatever
            height is left once the top pair has settled, so the block's foot
            lines up with the featured card beside it.
          */}
          <div className="grid content-start gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              {videos.items.slice(0, 2).map((item, index) => (
                <motion.div
                  key={item.title}
                  {...card(0.36 + index * 0.08)}
                  className="flex"
                >
                  <VideoCard entry={item} />
                </motion.div>
              ))}
            </div>

            <motion.div {...card(0.52)} className="flex">
              <VideoCard entry={videos.items[2]} wide />
            </motion.div>
          </div>
        </div>

        {/* --------------------------- View all ------------------- */}
        <motion.div {...rise(0.3)} className="mt-8 flex justify-end">
          <Link
            href={videos.viewAll.href}
            className={cn(
              "group/all inline-flex items-center gap-2.5",
              "text-[0.9375rem] font-semibold text-[#4d109e]",
              "duration-normal transition-colors hover:text-[#6a1fd0]",
            )}
          >
            {videos.viewAll.label}
            <ArrowIcon
              className={cn(
                "size-4",
                "duration-normal transition-[translate] ease-out",
                "group-hover/all:translate-x-1",
              )}
            />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}

/**
 * One video card: the clip with its play button and duration, then the kicker
 * and title beneath.
 *
 * TWO TARGETS, DELIBERATELY. The play button starts the clip in place; the
 * title navigates to the video's own page. See the note at the top of this
 * file for why this section does not use the whole-card link the rest of the
 * page uses.
 */
function VideoCard({
  entry,
  featured = false,
  wide = false,
}: {
  entry: VideoEntry;
  featured?: boolean;
  /** The full-width card at the foot of the mosaic. */
  wide?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <article
      className={cn(
        "group relative grid h-full w-full overflow-hidden rounded-xl",
        // [thumbnail, copy] — the thumbnail row takes the slack so the card
        // fills its column, and the copy row sizes to its own content.
        "grid-rows-[auto_auto] lg:grid-rows-[1fr_auto]",
        "border border-neutral-200/80 bg-white",
        "duration-normal transition-[border-color,box-shadow,translate] ease-out",
        "will-change-[translate]",
        "hover:-translate-y-1 hover:border-neutral-300",
        "hover:shadow-[0_22px_44px_-24px_rgb(31_20_60/0.28)]",
      )}
    >
      {/*
        Each thumbnail keeps its OWN aspect, measured from the design: the
        featured card is ~3:2, the wide card ~10:3, the top pair near 16:9. A
        single `aspect-video` on all three squashed the wide card and left the
        featured one too short to fill its column.

        The RIGHT block sets the row height — two stacked cards, each with a
        real ratio. The featured card's thumbnail therefore drops its ratio on
        lg and lets its grid row stretch it to match, which is what holds the
        two columns level. Giving the featured card a ratio here instead made
        IT set the row and starved the wide card beneath it to nothing.
      */}
      <div
        className={cn(
          "relative overflow-hidden bg-neutral-900",
          featured && "aspect-3/2 lg:aspect-auto",
          wide && "aspect-video sm:aspect-10/3",
          !featured && !wide && "aspect-video",
        )}
      >
        <video
          ref={videoRef}
          src={entry.video}
          poster={entry.poster}
          width={entry.width}
          height={entry.height}
          playsInline
          muted
          loop
          // Never autoplays, and never fetches until asked: the poster stands
          // in until someone presses play. Same arrangement as the LurnyMagic
          // sections — four clips preloading here would cost far more than the
          // page is worth.
          preload="none"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className="absolute inset-0 size-full object-cover"
        />

        {/* The duration badge, as the design places it. Hidden once the clip
            is running, where it would only sit over the picture. */}
        {!isPlaying && (
          <span
            aria-hidden="true"
            className={cn(
              "absolute right-3 bottom-3 rounded-md px-2 py-1",
              "bg-[#1e1a18]/90 text-[0.75rem] font-semibold text-white tabular-nums",
            )}
          >
            {entry.duration}
          </span>
        )}

        {!isPlaying && (
          <button
            type="button"
            onClick={() => void videoRef.current?.play()}
            className={cn(
              "absolute inset-0 grid place-items-center",
              "focus-visible:ring-2 focus-visible:ring-[#450c98] focus-visible:outline-none focus-visible:ring-inset",
            )}
          >
            {/* The button's accessible name carries the title, so a screen
                reader user knows WHICH video this plays — "Play" alone would
                be ambiguous with four on the page. The duration goes here too
                rather than being announced from the badge above, which is
                decorative. */}
            <span className="sr-only">
              {`Play: ${entry.title} (${entry.duration})`}
            </span>

            <span
              aria-hidden="true"
              className={cn(
                "grid place-items-center rounded-full bg-white",
                "shadow-[0_8px_24px_-6px_rgb(0_0_0/0.45)]",
                featured ? "size-18" : "size-14",
                // `scale`, not `transform` — Tailwind v4 compiles the scale
                // utilities to the standalone property.
                "transition-[scale] duration-300 ease-out",
                "group-hover:scale-105",
              )}
            >
              <PlayIcon
                className={cn(
                  "text-[#2b1055]",
                  featured ? "ml-1 size-7" : "ml-0.5 size-5",
                )}
              />
            </span>
          </button>
        )}
      </div>

      {/* The copy. */}
      <div className={cn("flex flex-col", featured ? "p-7" : "p-5")}>
        <p
          className={cn(
            "text-[0.625rem] font-bold tracking-[0.14em] uppercase",
            kickerTone[entry.accent],
          )}
        >
          {entry.kicker}
        </p>

        <h3
          className={cn(
            "mt-2.5 font-display font-bold tracking-[-0.02em]",
            "leading-[1.24] text-pretty text-neutral-950",
            featured ? "text-[1.5rem]" : "text-[1.0625rem]",
          )}
        >
          {/*
            The title is the navigation target. `after:absolute inset-0` grows
            its hit area over the whole copy block WITHOUT covering the play
            button above — the two stay independently clickable.
          */}
          <Link
            href={entry.href}
            className={cn(
              "after:absolute after:inset-x-0 after:top-[56.25%] after:bottom-0",
              "duration-normal transition-colors hover:text-[#4d109e]",
              "focus-visible:underline focus-visible:outline-none",
            )}
          >
            {entry.title}
          </Link>
        </h3>
      </div>
    </article>
  );
}

/** The play triangle. */
function PlayIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M7.5 4.9v14.2a1 1 0 0 0 1.53.85l11.2-7.1a1 1 0 0 0 0-1.7L9.03 4.05A1 1 0 0 0 7.5 4.9Z" />
    </svg>
  );
}

/** The YouTube mark on the outbound action. */
function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 28 20"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect width="28" height="20" rx="5" fill="#ff0000" />
      <path d="M11.2 6.2v7.6l6.4-3.8-6.4-3.8Z" fill="#fff" />
    </svg>
  );
}

/** The arrow on the "View all" link. */
function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M3.5 10h12m0 0-4.4-4.4M15.5 10l-4.4 4.4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
