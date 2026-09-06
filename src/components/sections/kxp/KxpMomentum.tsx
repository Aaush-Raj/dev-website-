"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { kxp } from "@/content/kxp";
import { cn } from "@/lib/utils";

/**
 * KXP — LEARNING THAT BUILDS MOMENTUM
 * ---------------------------------------------------------------------------
 * Section 5: the header over the learner's scene, a three-column panel across
 * the lower half, and a line closing the section.
 *
 * WHAT IS MARKUP AND WHAT IS PIXELS
 * The pack's README asks for "page headings, descriptions and basic
 * buttons/controls as HTML/CSS where practical" and ships the background
 * reconstructed free of the panel, so the panel is built here. Only the
 * genuinely pictorial parts are rasters — the scene, the three card thumbnails
 * and the gold medal — see scripts/build-kxp-momentum.cjs.
 *
 * Every other mark the pack offers as a crop (play button, step dots, target,
 * leaf, chips, waveform) is drawn as SVG below. They are a few dozen pixels
 * each at source and the README warns against upscaling them; as vectors they
 * stay sharp at any size and take the section's own colours.
 *
 * THE PANEL SCALES WITH ITS CONTAINER
 * Sizes inside it are in `em` off a `cqw` root, so the three columns shrink as
 * one object rather than each reflowing at its own arbitrary width. Below lg
 * they stack, because three columns of this density cannot survive a phone.
 *
 * THE AMBER CONNECTOR
 * The line threading the three column headings is in the design, drawn over
 * the panel's top edge. It is the section's argument — discovery leads to
 * capability leads to recognition — so it draws along its length rather than
 * just appearing. Hidden below lg, where the columns stack and it would
 * connect nothing.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { momentum } = kxp;

/** The mark drawn over each discovery thumbnail. */
const cardBadges = {
  play: PlayIcon,
  waveform: WaveformIcon,
  open: OpenIcon,
} as const;

export function KxpMomentum() {
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
        "relative isolate overflow-hidden",
        // The warm stone ground the scene sits on, sampled from the design.
        "bg-[#e1dace]",
        "flex flex-col pb-12 lg:block lg:pb-0",
      )}
    >
      {/* ============================== Scene ======================== */}
      {/* Fills the section's upper half from lg up, with the panel laid over
          its lower edge. Below lg it follows the copy in flow. */}
      <div
        className={cn(
          "order-2 lg:order-none",
          "lg:pointer-events-none lg:absolute lg:inset-x-0 lg:top-0 lg:h-[62%]",
        )}
      >
        <Image
          src={momentum.scene.src}
          alt={momentum.scene.alt}
          width={momentum.scene.width}
          height={momentum.scene.height}
          sizes="100vw"
          className="h-auto w-full lg:size-full lg:object-cover lg:object-[center_28%]"
        />

        {/* A wash over the top, so the header keeps its contrast against
            whatever the room does behind it. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden lg:block"
          style={{
            background:
              "linear-gradient(115deg, rgb(225 218 206 / 0.97) 0%, rgb(225 218 206 / 0.9) 26%, rgb(225 218 206 / 0.45) 44%, rgb(225 218 206 / 0.06) 62%, transparent 76%)",
          }}
        />
      </div>

      <Container
        width="hero"
        className="relative order-1 pt-14 lg:order-none lg:pt-16 lg:pb-14"
      >
        {/* ============================ Header ====================== */}
        <div className="max-w-[36rem]">
          <motion.p
            {...rise(0)}
            className={cn(
              "font-mono text-[0.6875rem] font-medium uppercase",
              "tracking-[0.2em] text-[#2d3032] sm:text-xs",
            )}
          >
            {momentum.eyebrow}
          </motion.p>

          <motion.h2
            {...rise(0.08)}
            className={cn(
              "mt-4 font-display font-bold tracking-[-0.03em]",
              "leading-[1.08] text-[#08070d]",
              "text-[1.875rem] sm:text-[2.375rem] xl:text-[2.875rem]",
            )}
          >
            {momentum.headline.map((line) => (
              <span key={line} className="inline lg:block">
                {line}{" "}
              </span>
            ))}
          </motion.h2>

          <motion.p
            {...rise(0.16)}
            className={cn(
              "mt-4 leading-relaxed text-pretty",
              "text-[0.9375rem] text-[#343235] sm:text-[1rem]",
            )}
          >
            {momentum.description}
          </motion.p>
        </div>

        {/* Holds the panel down to the design's position, where it crosses the
            scene's lower edge. Only from lg up, where the scene is behind. */}
        <div aria-hidden="true" className="hidden lg:block lg:h-[16vw]" />

        {/* ============================= Panel ====================== */}
        <motion.div
          initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: "some" }}
          transition={{ duration: 0.75, delay: 0.28, ease: easeOut }}
          className="relative mt-10 @container lg:mt-0"
        >
          <div
            className={cn(
              "relative rounded-[1.5em] bg-[#f4f3ee]/97 p-[1.5em] lg:pt-[2.8em]",
              "shadow-[0_30px_80px_-36px_rgb(40_32_20/0.45)] backdrop-blur-sm",
            )}
            // Scales with the panel; floored so it stays legible once the
            // columns stack and the container is the full page width.
            style={{ fontSize: "max(12px, 1.15cqw)" }}
          >
            {/* ------------------- Amber connector ----------------- */}
            {/* Threads the three column headings — see the note at the top.
                The viewBox is WIDE and scaled normally rather than stretched
                with `preserveAspectRatio="none"`: under extreme x-scaling the
                animated stroke renders as broken dashes instead of one line. */}
            <svg
              viewBox="0 0 1200 22"
              fill="none"
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute top-[0.9em] hidden lg:block",
                // Percentages, not `em`: an `em` inset here resolves against
                // the svg's own font-size rather than the panel's.
                "inset-x-0 h-[1.4em] w-full",
              )}
            >
              <motion.path
                d="M 216 11 C 350 2, 480 20, 641 11 C 800 2, 920 20, 1025 11"
                stroke="#eaa003"
                strokeWidth="3"
                strokeLinecap="round"
                initial={
                  reduce ? { pathLength: 1 } : { pathLength: 0, opacity: 0 }
                }
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, amount: "some" }}
                transition={{ duration: 1.1, delay: 0.55, ease: easeOut }}
              />

              {/* The three nodes the line runs between. */}
              {[216, 641, 1025].map((cx, index) => (
                <motion.circle
                  key={cx}
                  cx={cx}
                  cy="11"
                  r="5.5"
                  fill="#eaa003"
                  initial={reduce ? { opacity: 1 } : { opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: "some" }}
                  transition={{
                    duration: 0.4,
                    delay: 0.7 + index * 0.18,
                    ease: easeOut,
                  }}
                />
              ))}
            </svg>

            <div
              className={cn(
                "grid gap-[1.5em]",
                // Divided by hairlines, as the design draws them — there are
                // no card edges between the columns.
                "lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)_minmax(0,0.92fr)]",
                "lg:gap-[2em] lg:divide-x lg:divide-[#ddd9cf]",
              )}
            >
              <Discovery />
              <Capability />
              <Rewards />
            </div>
          </div>
        </motion.div>

        {/* ============================ Closing ====================== */}
        <motion.p
          {...rise(0.4)}
          className={cn(
            "mt-7 text-center font-mono text-balance",
            "text-[0.75rem] tracking-[0.08em] text-[#524f50] sm:text-[0.8125rem]",
          )}
        >
          {momentum.closing}
        </motion.p>
      </Container>
    </section>
  );
}

/* ========================================================================== */
/*  COLUMN 1 — curated learning                                               */
/* ========================================================================== */

function Discovery() {
  const { discovery } = momentum;

  return (
    <div className="lg:pr-[1.6em]">
      <ColumnTitle>{discovery.title}</ColumnTitle>

      {/* The filter chips. Static in the design, so they are rendered as a
          list rather than as buttons that would promise interaction. */}
      <ul className="mt-[0.9em] flex items-center gap-[0.5em]">
        {discovery.filters.map((filter, index) => (
          <li
            key={filter}
            className={cn(
              "rounded-full px-[0.85em] py-[0.3em] text-[0.82em]",
              index === 0
                ? "bg-[#ecd9ff] font-semibold text-[#5403ec]"
                : "text-[#5d5b5e]",
            )}
          >
            {filter}
          </li>
        ))}
      </ul>

      <ul className="mt-[0.9em] grid grid-cols-3 gap-[0.7em]">
        {discovery.cards.map((card) => {
          const Badge = cardBadges[card.badge];

          return (
            <li key={card.title}>
              <span className="relative block overflow-hidden rounded-[0.6em]">
                <Image
                  src={card.thumb.src}
                  alt={card.thumb.alt}
                  width={card.thumb.width}
                  height={card.thumb.height}
                  sizes="220px"
                  className="h-[5.2em] w-full object-cover"
                />
              </span>

              <span className="mt-[0.55em] block truncate text-[0.85em] font-medium text-[#1c1a1e]">
                {card.title}
              </span>

              {/* The format chip under each card, carrying its own mark. */}
              <span
                className={cn(
                  "mt-[0.4em] flex items-center gap-[0.4em] rounded-[0.4em]",
                  "bg-[#e9e7e0] px-[0.55em] py-[0.28em]",
                )}
              >
                <Badge className="size-[0.85em] shrink-0 text-[#5d5b5e]" />
                <span className="truncate text-[0.68em] font-medium tracking-[0.06em] text-[#4c4a4d] uppercase">
                  {card.meta}
                </span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ========================================================================== */
/*  COLUMN 2 — capability growth                                              */
/* ========================================================================== */

function Capability() {
  const { capability } = momentum;

  return (
    <div className="lg:px-[1.6em]">
      <ColumnTitle>{capability.title}</ColumnTitle>

      <div className="mt-[0.9em] rounded-[0.8em] border border-[#e4e1d8] bg-white p-[1em]">
        <div className="flex items-start justify-between gap-[1em]">
          <span className="min-w-0">
            <span className="block text-[0.82em] text-[#5d5b5e]">
              {capability.pathLabel}
            </span>
            <span className="mt-[0.15em] block text-[1.05em] font-bold tracking-[-0.01em] text-[#12101a]">
              {capability.pathTitle}
            </span>
          </span>

          <TargetIcon className="size-[2.2em] shrink-0" />
        </div>

        {/* The three steps. `state` drives the marker, so a step's appearance
            follows from the data rather than its position. */}
        <ol className="mt-[0.9em] space-y-[0.5em]">
          {capability.steps.map((step) => (
            <li
              key={step.label}
              className={cn(
                "flex items-center gap-[0.7em] rounded-[0.45em] py-[0.3em]",
                // Only the step in progress is filled, as the design has it.
                step.state === "current" && "bg-[#f0e3ff] px-[0.5em]",
              )}
            >
              <StepMarker state={step.state} />

              <span
                className={cn(
                  "text-[0.88em]",
                  step.state === "current"
                    ? "font-semibold text-[#2c1a4d]"
                    : "text-[#3d3b40]",
                )}
              >
                {step.label}
              </span>
            </li>
          ))}
        </ol>

        <p
          className={cn(
            "mt-[0.9em] flex items-center gap-[0.6em] rounded-[0.5em]",
            "bg-[#eef4ec] px-[0.8em] py-[0.6em]",
          )}
        >
          <LeafIcon className="size-[1.1em] shrink-0 text-[#4b7c52]" />
          <span className="text-[0.85em] text-[#2f4433]">
            {capability.footnote}
          </span>
        </p>
      </div>
    </div>
  );
}

/* ========================================================================== */
/*  COLUMN 3 — recognition                                                    */
/* ========================================================================== */

function Rewards() {
  const { rewards } = momentum;

  return (
    <div className="lg:pl-[1.6em]">
      <ColumnTitle>{rewards.title}</ColumnTitle>

      <div className="mt-[0.9em] rounded-[0.8em] border border-[#e4e1d8] bg-white p-[1em]">
        {/* --------------------------- Award --------------------- */}
        <div className="flex items-center gap-[0.9em]">
          <Image
            src={rewards.badge.src}
            alt={rewards.badge.alt}
            width={rewards.badge.width}
            height={rewards.badge.height}
            sizes="140px"
            className="w-[4.2em] shrink-0"
          />

          <span className="min-w-0">
            <span className="block text-[1em] font-bold tracking-[-0.01em] text-[#12101a]">
              {rewards.award}
            </span>

            <span className="mt-[0.45em] flex flex-wrap items-center gap-[0.4em]">
              <span
                className={cn(
                  "flex items-center gap-[0.3em] rounded-full",
                  "bg-[#fdeacd] px-[0.6em] py-[0.2em]",
                  "text-[0.75em] font-medium text-[#8a5100]",
                )}
              >
                <FlameIcon className="size-[0.9em] shrink-0 text-[#f27d00]" />
                {rewards.streak}
              </span>

              <span
                className={cn(
                  "rounded-full bg-[#fdf1cf] px-[0.6em] py-[0.2em]",
                  "text-[0.75em] font-semibold text-[#7a5b00]",
                )}
              >
                {rewards.xp}
              </span>
            </span>
          </span>
        </div>

        {/* ------------------------ Leaderboard ------------------ */}
        <p className="mt-[1em] flex items-center gap-[0.5em] border-t border-[#ece9e1] pt-[0.9em]">
          <TeamIcon className="size-[1.1em] shrink-0 text-[#6c6a6e]" />
          <span className="text-[0.85em] text-[#3d3b40]">
            {rewards.leaderboard.title}
          </span>
        </p>

        <ol className="mt-[0.6em] space-y-[0.35em]">
          {rewards.leaderboard.rows.map((row) => (
            <li
              key={row.rank}
              className={cn(
                "flex items-center gap-[0.6em] rounded-[0.4em] px-[0.4em] py-[0.25em]",
                "self" in row && row.self && "bg-[#f0e3ff]",
              )}
            >
              <span
                className={cn(
                  "w-[1.1em] shrink-0 text-[0.78em]",
                  "self" in row && row.self
                    ? "font-bold text-[#5403ec]"
                    : "text-[#7a787c]",
                )}
              >
                {row.rank}
              </span>

              {/* The other players are anonymous in the design — an avatar and
                  a blank bar where a name would be. */}
              <span
                aria-hidden="true"
                className="size-[1.5em] shrink-0 rounded-full bg-[#e4e2e6]"
              />

              {"label" in row && row.label ? (
                <span className="truncate text-[0.82em] font-semibold text-[#3b2168]">
                  {row.label}
                </span>
              ) : (
                <span
                  aria-hidden="true"
                  className="h-[0.5em] w-[62%] rounded-full bg-[#e9e7ea]"
                />
              )}
            </li>
          ))}
        </ol>

        <p className="mt-[0.9em] text-[0.8em] text-[#5d5b5e]">
          {rewards.footnote}
        </p>
      </div>
    </div>
  );
}

/* ========================================================================== */
/*  Shared                                                                    */
/* ========================================================================== */

/** The heading over each of the three columns. */
function ColumnTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className={cn(
        "font-display text-[1.15em] font-bold tracking-[-0.015em]",
        "text-[#060607]",
      )}
    >
      {children}
    </h3>
  );
}

/** The marker beside a GrowthPath step. */
function StepMarker({ state }: { state: "done" | "current" | "todo" }) {
  if (state === "done") {
    return (
      <svg
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
        className="size-[1.25em] shrink-0"
      >
        <circle cx="10" cy="10" r="9" fill="#2f7d52" />
        <path
          d="m6 10.3 2.7 2.7L14 7.7"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (state === "current") {
    return (
      <svg
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
        className="size-[1.25em] shrink-0"
      >
        <circle cx="10" cy="10" r="9" fill="#fff" stroke="#5403ec" strokeWidth="2" />
        <circle cx="10" cy="10" r="4.2" fill="#5403ec" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="size-[1.25em] shrink-0"
    >
      <circle cx="10" cy="10" r="9" fill="#fff" stroke="#c9c6cc" strokeWidth="2" />
    </svg>
  );
}

/** The capability target beside the GrowthPath. */
function TargetIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <circle cx="15" cy="17" r="10.5" stroke="#2f7d52" strokeWidth="1.8" />
      <circle cx="15" cy="17" r="6" stroke="#2f7d52" strokeWidth="1.8" />
      <circle cx="15" cy="17" r="1.9" fill="#2f7d52" />
      <path
        d="M15 17 27 5"
        stroke="#2f7d52"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path d="M23.5 4.2 28.2 3.6l-.6 4.7-4.1-4.1Z" fill="#7cc08d" />
    </svg>
  );
}

/** The growth leaf on the capability footnote. */
function LeafIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path
        d="M13.5 2.5c0 6-3.4 9.2-7.6 9.2-1.4 0-2.6-.4-3.4-1 1-4.9 4.6-8.2 11-8.2Z"
        fill="currentColor"
      />
      <path
        d="M2.5 14c1.2-3.4 3.6-6.2 6.8-8"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** The video card's play mark. */
function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.4" />
      <path d="M6.6 5.4 11 8l-4.4 2.6V5.4Z" fill="currentColor" />
    </svg>
  );
}

/** The podcast card's waveform mark. */
function WaveformIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path
        d="M2 7v2M5 4.5v7M8 2.5v11M11 5.5v5M14 7v2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** The interactive story card's open-out mark. */
function OpenIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path
        d="M12.5 8.8v3.4a1.3 1.3 0 0 1-1.3 1.3H3.8a1.3 1.3 0 0 1-1.3-1.3V4.8a1.3 1.3 0 0 1 1.3-1.3h3.4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M10 2.5h3.5V6M13.5 2.5 7.8 8.2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** The streak chip's flame. */
function FlameIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path
        d="M8 1.5s.8 2.3-.9 4C5.2 7.4 4 8.6 4 10.3a4 4 0 0 0 8 0c0-2.2-1.6-3.3-2.3-5.1-.3.8-.9 1.3-1.5 1.6.5-1.7-.2-4-.2-5.3Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** The leaderboard's team mark. */
function TeamIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <circle cx="6" cy="6" r="2.4" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M1.8 13.2c0-2.1 1.9-3.4 4.2-3.4s4.2 1.3 4.2 3.4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M11.2 4.1a2.4 2.4 0 0 1 0 4.5M12.2 9.9c1.4.4 2.4 1.4 2.4 3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
