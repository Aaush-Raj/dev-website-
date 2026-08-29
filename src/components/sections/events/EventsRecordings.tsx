"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { events } from "@/content/events";
import { cn } from "@/lib/utils";

/**
 * EVENTS RECORDINGS
 * ---------------------------------------------------------------------------
 * Section 2 of the Webinars & Events page: the rest of the catalogue as a
 * three-up grid of cards on a light ground.
 *
 * THE CARD
 * A 4:3 thumbnail carrying a play affordance and the running time, then the
 * topic, title, speaker and a link. The whole card is one link target rather
 * than only the "Watch recording" text: the thumbnail and title are the
 * obvious things to click, and a card whose visible affordance is a small
 * text link at the bottom is needlessly precise to hit. The inner text is
 * marked `aria-hidden` on that basis — see the note where it is used.
 *
 * The thumbnails are cropped to a common 4:3 at build time, so the grid rows
 * line up whatever the source renders happened to be. See
 * scripts/build-event-images.cjs.
 *
 * PLACEHOLDER CONTENT — the design supplies stand-in titles and durations and
 * says so in a footnote, which is reproduced under the grid. See the note in
 * content/events.ts.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { recordings } = events;

export function EventsRecordings() {
  const reduce = useReducedMotion();

  return (
    <section id="recordings" className="bg-[#f7f6f4] py-section-lg">
      <Container width="wide">
        {/* ============================ Header ======================== */}
        <motion.div
          initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: "some" }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2"
        >
          <h2
            className={cn(
              "font-display font-bold tracking-[-0.02em]",
              "text-[1.75rem] text-[#101114] sm:text-[2rem]",
            )}
          >
            {recordings.title}
          </h2>

          <p className="text-[0.9375rem] text-[#747a7f]">
            {recordings.countLabel(recordings.items.length)}
          </p>
        </motion.div>

        {/* ============================= Grid ========================= */}
        <ul
          className={cn(
            "mt-8 grid gap-5",
            // Three up, as the design has them. The last row is left-aligned
            // and short rather than stretched, which is what `auto-rows` and a
            // plain grid give us for free.
            "sm:grid-cols-2 lg:grid-cols-3",
          )}
        >
          {recordings.items.map((item, index) => (
            <motion.li
              key={item.title}
              initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: "some" }}
              transition={{
                duration: 0.55,
                // Staggered by position, capped so the last card in a long
                // list does not sit invisible for most of a second.
                delay: Math.min(index * 0.07, 0.35),
                ease: easeOut,
              }}
            >
              <Link
                href={recordings.action.href}
                /*
                  The card's accessible name. Without it the link would be
                  announced from its inner text — seven identical "Watch
                  recording" links with nothing to tell them apart. The title
                  and duration are what actually distinguish one from another.
                */
                aria-label={`${recordings.action.label}: ${item.title} (${item.duration})`}
                className={cn(
                  "group/card flex h-full flex-col overflow-hidden rounded-xl",
                  "bg-white ring-1 ring-[#e9e7e3]",
                  "duration-normal transition-[box-shadow,translate] ease-out",
                  "will-change-[translate]",
                  "hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-20px_rgb(16_17_20/0.35)]",
                  // The card is the link target, so it takes the focus ring
                  // rather than the text inside it.
                  "focus-visible:ring-2 focus-visible:ring-[#7c3ad9] focus-visible:outline-none",
                )}
              >
                {/* -------------------- Thumbnail -------------------- */}
                <div className="relative aspect-4/3 overflow-hidden">
                  <Image
                    src={item.image}
                    /* Decorative: the title and topic directly below carry the
                       meaning, and these are illustrative renders rather than
                       pictures of the actual sessions. */
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                    className={cn(
                      "object-cover",
                      "duration-slow transition-[scale] ease-out",
                      "group-hover/card:scale-[1.03]",
                      "motion-reduce:transition-none",
                    )}
                  />

                  {/* The play affordance. Decorative — this is a link to a
                      recording page, not an inline player, so it is a visual
                      cue rather than a control. */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute bottom-3 left-3 grid size-9 place-items-center rounded-full",
                      "bg-black/55 text-white ring-1 ring-white/25 backdrop-blur-sm",
                      "duration-normal transition-[background-color] ease-out",
                      "group-hover/card:bg-black/75",
                    )}
                  >
                    <PlayIcon className="size-3.5 translate-x-px" />
                  </span>

                  {/* The running time. `aria-hidden` because the card's own
                      aria-label already states it — an accessible name
                      replaces the subtree, so leaving this exposed would only
                      duplicate it for anyone browsing by element. */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute right-3 bottom-3 rounded-md px-2 py-1",
                      "bg-black/70 text-[0.75rem] font-medium text-white",
                      "backdrop-blur-sm",
                    )}
                  >
                    {item.duration}
                  </span>
                </div>

                {/* ---------------------- Details -------------------- */}
                <div className="flex flex-1 flex-col p-5">
                  <p
                    className={cn(
                      "text-[0.6875rem] font-bold tracking-[0.1em] uppercase",
                    )}
                    style={{ color: recordings.tones[item.tone] }}
                  >
                    {item.topic}
                  </p>

                  <h3
                    className={cn(
                      "mt-2.5 font-display font-semibold text-pretty",
                      "text-[1.125rem] leading-snug text-[#101114]",
                    )}
                  >
                    {item.title}
                  </h3>

                  <p className="mt-2.5 text-[0.875rem] text-[#5c6166]">
                    Speaker: {item.speaker}
                  </p>

                  {/*
                    The affordance, pushed to the card's bottom edge so the
                    links line up across a row whatever the titles do.

                    `aria-hidden`: the whole card is already one link, so
                    without this a screen reader would meet the same
                    destination announced twice.
                  */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "mt-auto inline-flex items-center gap-2 pt-4",
                      "text-[0.875rem] font-semibold text-[#714ddb]",
                    )}
                  >
                    {recordings.action.label}
                    <ArrowIcon
                      className={cn(
                        "size-3.5",
                        "duration-normal transition-[translate] ease-out",
                        "group-hover/card:translate-x-1",
                      )}
                    />
                  </span>
                </div>
              </Link>
            </motion.li>
          ))}
        </ul>

        {/* The design's own note that this catalogue is illustrative. It is
            removed together with the placeholder copy — see content/events.ts. */}
        <p className="mt-10 text-[0.8125rem] text-[#8a8f94]">
          {recordings.disclaimer}
        </p>
      </Container>
    </section>
  );
}

/** The play mark on each thumbnail. */
function PlayIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 12 14"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M1 1.4v11.2a.6.6 0 0 0 .92.5l8.8-5.6a.6.6 0 0 0 0-1L1.92.9A.6.6 0 0 0 1 1.4Z" />
    </svg>
  );
}

/** The arrow on each card's affordance. */
function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M3 8h9m0 0-3.4-3.4M12 8l-3.4 3.4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
