"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { events } from "@/content/events";
import { cn } from "@/lib/utils";

/**
 * EVENTS HERO
 * ---------------------------------------------------------------------------
 * Section 1 of the Webinars & Events page: a short statement, then one
 * featured recording presented as a wide panel — artwork filling the left
 * half, details on the right.
 *
 * THE PANEL
 * A two-column grid rather than the image being a background: the artwork has
 * a real aspect ratio worth preserving, and a background would crop it to
 * whatever shape the copy happened to leave. Measured off the design, the
 * artwork takes ~62% of the panel and the details the rest; below lg the
 * columns stack, since a 62%-width image is too small to read on a phone.
 *
 * The hairline between the halves is the panel's own border colour, drawn only
 * from lg up: once the columns stack it would sit across the middle of the
 * card rather than between two things.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { hero } = events;
const { featured } = hero;

export function EventsHero() {
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
      className={cn(
        "relative isolate overflow-hidden text-white",
        // The near-black ground, sampled from the design.
        "bg-[#070707]",
        // Extra top padding: this is the first section under the floating nav
        // pill, so it needs clearance the mid-page sections do not.
        "pt-28 pb-section-lg sm:pt-32 lg:pt-36",
      )}
    >
      {/* A faint violet bloom behind the panel, lifting it off the flat ground
          without competing with the artwork. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: [
            "radial-gradient(46rem 34rem at 68% 62%, rgb(124 58 217 / 0.12), transparent 68%)",
            "radial-gradient(28rem 24rem at 12% 12%, rgb(124 58 217 / 0.06), transparent 72%)",
          ].join(","),
        }}
      />

      <Container width="wide" className="relative">
        {/* ========================== Statement ======================= */}
        <motion.p
          {...rise(0)}
          className={cn(
            "text-[0.6875rem] font-bold uppercase",
            "tracking-[0.18em] text-[#a86ce0] sm:text-xs",
          )}
        >
          {hero.eyebrow}
        </motion.p>

        <motion.h1
          {...rise(0.08)}
          className={cn(
            "mt-6 font-display font-bold tracking-[-0.035em]",
            "leading-[1.06] text-white",
            // Measured from the design at ~64px on a 1440 frame.
            "text-[2.25rem] sm:text-[3rem] xl:text-[3.75rem]",
          )}
        >
          {hero.headline.map((line) => (
            // Inline below lg so the two sentences flow as one paragraph at
            // narrow measures; broken onto their own lines from lg, as the
            // design sets them.
            <span key={line} className="inline lg:block">
              {line}{" "}
            </span>
          ))}
        </motion.h1>

        <motion.p
          {...rise(0.16)}
          className={cn(
            "mt-6 max-w-124 leading-relaxed text-pretty",
            "text-[1.0625rem] text-neutral-400 sm:text-lg",
          )}
        >
          {hero.description}
        </motion.p>

        {/* ====================== Featured recording ================== */}
        <motion.div
          initial={reduce ? "shown" : "hidden"}
          whileInView="shown"
          viewport={{ once: true, amount: "some" }}
          variants={{
            hidden: { opacity: 0, y: 28 },
            shown: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, delay: 0.24, ease: easeOut },
            },
          }}
          className={cn(
            "mt-12 overflow-hidden rounded-3xl sm:mt-14",
            // A touch lighter than the page ground, with a hairline edge —
            // both sampled from the design.
            "bg-[#0a0a0a] ring-1 ring-[#282119]",
            /*
              No height constraint on the panel itself.

              The design draws it 892x552, but our container is 1440 wide where
              the design frame is 983 — holding that ratio scales the panel to
              ~840 tall, pushing the CTA off a laptop screen. Capping the panel
              instead only CLIPS it, since max-height truncates overflow rather
              than scaling what is inside: the artwork loses its notebooks and
              the button gets sliced. So the panel is left to size to its
              content, and the artwork is bounded on its own (below) to keep
              the row near the design's height.
            */
          )}
        >
          <div
            className={cn(
              "grid items-stretch",
              // Measured off the design: the artwork takes ~62% of the panel,
              // the details the rest. Below lg the columns stack, so the
              // artwork keeps a readable size.
              "lg:grid-cols-[minmax(0,0.623fr)_minmax(0,0.377fr)]",
              // The hairline between the halves. Drawn as a left border on
              // the details column so it spans the full row height whatever
              // the artwork's aspect turns out to be, and only from lg where
              // there are in fact two columns.
              "[&>*+*]:lg:border-l [&>*+*]:lg:border-[#282119]",
            )}
          >
            {/*
              --------------------------- Artwork -------------------
              `object-contain`, not `cover`: the composition is a standing book
              with a microphone behind it and three notebooks laid out in
              front, and cover crops the notebooks off the bottom. Contain
              keeps the whole arrangement, and because the artwork's ground is
              the same near-black as the panel, the letterboxing it leaves is
              invisible — the image simply reads as inset.
            */}
            <div className="relative">
              <Image
                src={featured.image.src}
                alt={featured.image.alt}
                width={featured.image.width}
                height={featured.image.height}
                // Above the fold, so this must not lazy-load — it is the LCP
                // candidate on this page.
                priority
                sizes="(min-width: 1024px) 62vw, 100vw"
                className={cn(
                  "h-full w-full object-contain object-center",
                  // Bounds the row from lg, which is what keeps the panel near
                  // the design's height without clipping either column.
                  "lg:max-h-136",
                )}
              />
            </div>

            {/* --------------------------- Details ------------------- */}
            <div
              className={cn(
                "flex flex-col items-start justify-center",
                "px-6 py-10 sm:px-10 sm:py-12 lg:px-12 xl:px-14",
              )}
            >
              {/* The pill. Its star is decorative — the words beside it
                  already carry the meaning. */}
              <p
                className={cn(
                  "inline-flex items-center gap-2 rounded-lg px-3.5 py-2",
                  "ring-1 ring-[#3a2f52]",
                  "text-[0.6875rem] font-bold tracking-[0.14em] uppercase",
                  "text-[#ceb6f2]",
                )}
              >
                <StarIcon className="size-3.5" />
                {featured.badge}
              </p>

              <p
                className={cn(
                  "mt-7 text-[0.6875rem] font-bold uppercase",
                  "tracking-[0.16em] text-[#a58cd1] sm:text-xs",
                )}
              >
                {featured.eyebrow}
              </p>

              <h2
                className={cn(
                  "mt-4 font-display font-bold tracking-[-0.03em]",
                  "leading-[1.1] text-white",
                  "text-[1.875rem] sm:text-[2.25rem] xl:text-[2.625rem]",
                )}
              >
                {featured.title.map((line) => (
                  <span key={line} className="inline lg:block">
                    {line}{" "}
                  </span>
                ))}
              </h2>

              <p
                className={cn(
                  "mt-5 max-w-88 leading-relaxed text-pretty",
                  "text-[0.9375rem] text-neutral-400 sm:text-base",
                )}
              >
                {featured.description}
              </p>

              {/* ------------------------- Meta ---------------------- */}
              <p className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-2 text-[0.9375rem] text-neutral-300">
                <span>Speaker: {featured.speaker}</span>
                <span className="inline-flex items-center gap-2">
                  <ClockIcon className="size-4 text-neutral-500" />
                  {featured.duration}
                </span>
              </p>

              {/* ------------------------ Action --------------------- */}
              <Link
                href={featured.action.href}
                className={cn(
                  "group/cta mt-8 inline-flex h-14 items-center justify-center gap-3 rounded-xl px-8",
                  "bg-[#7c3ad9] text-[0.9375rem] font-semibold text-white",
                  // `translate`, not `transform`: Tailwind v4 compiles the
                  // translate utilities to the standalone property.
                  "duration-normal transition-[background-color,box-shadow,translate] ease-out",
                  "will-change-[translate]",
                  "hover:-translate-y-0.5 hover:bg-[#8b4ae8]",
                  "hover:shadow-[0_16px_36px_-12px_rgb(124_58_217/0.7)]",
                  "active:translate-y-0",
                )}
              >
                {featured.action.label}
                <ArrowIcon
                  className={cn(
                    "size-4",
                    "duration-normal transition-[translate] ease-out",
                    "group-hover/cta:translate-x-1",
                  )}
                />
              </Link>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

/** The star on the featured pill. */
function StarIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M8 1.8l1.85 3.75 4.15.6-3 2.93.71 4.12L8 11.25 4.29 13.2 5 9.08l-3-2.93 4.15-.6z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** The clock beside the running time. */
function ClockIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="6.2" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M8 4.6V8l2.3 1.6"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** The arrow on the action. */
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
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
