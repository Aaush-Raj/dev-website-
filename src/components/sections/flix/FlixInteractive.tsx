"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { Uncopyable } from "@/components/ui/Uncopyable";
import { flix } from "@/content/flix";
import { cn } from "@/lib/utils";

/**
 * LURNYFLIX — INTERACTIVE VIDEO
 * ---------------------------------------------------------------------------
 * Section 5: the statement and three features on the left; on the right a
 * player whose frame carries a quiz card, a "?" marker on the transport at the
 * quiz's timestamp, and a three-stop progress rail beneath it.
 *
 * ONLY THE RENDERED STILL IS A RASTER
 * The supplied panel bakes the quiz card over the picture's right half. Taking
 * the full frame would have shipped that card as pixels only to draw a second
 * one over it — so the still is cropped to the SCENE ALONE and the markup card
 * floats over it at the design's own position. Everything else here is drawn:
 * the panel frame, the header, the "Interactive video" pill, the quiz, the
 * transport with its "?" marker, and the rail.
 *
 * That matters more in this section than the others: the quiz is the product
 * feature being described, so its options have to be selectable text rather
 * than a picture of options.
 *
 * See scripts/build-flix-interactive.cjs.
 *
 * THE ENTRANCE
 * The copy cascades, the panel rises, the quiz card slides in over the frame
 * as it would in the product, its options tick in one after another, and the
 * rail's middle stop lights last — which is the moment the section is about.
 * All of it is gated on `useReducedMotion`.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { interactive } = flix;

/** The mark beside each feature. */
const featureIcons = {
  clock: ClockIcon,
  document: DocumentIcon,
  people: PeopleIcon,
} as const;

export function FlixInteractive() {
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

  return (
    <section className="relative isolate overflow-hidden bg-[#2a1b52] py-section-lg text-white">
      {/* The gradient. Covers the section, so everything sits on it. */}
      <Image
        src={interactive.backdrop.src}
        alt={interactive.backdrop.alt}
        width={interactive.backdrop.width}
        height={interactive.backdrop.height}
        aria-hidden="true"
        sizes="100vw"
        className="pointer-events-none absolute inset-0 -z-10 size-full object-cover"
      />

      <Container width="hero">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1fr)] lg:gap-12 xl:gap-16">
          {/* ========================= Left column ==================== */}
          <div>
            <motion.p
              {...rise(0.05)}
              className={cn(
                "text-[0.6875rem] font-semibold uppercase sm:text-xs",
                "tracking-[0.22em] text-[#c4a6ff]",
              )}
            >
              {interactive.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.16)}
              className={cn(
                "mt-6 font-display font-bold tracking-[-0.035em]",
                "leading-[1.04] text-white",
                "text-[2rem] sm:text-[2.375rem] xl:text-[2.875rem]",
              )}
            >
              {interactive.headline.map((line) => (
                <span key={line} className="inline lg:block">
                  {line}{" "}
                </span>
              ))}
            </motion.h2>

            <motion.p
              {...rise(0.28)}
              className={cn(
                "mt-6 max-w-[30rem] leading-relaxed text-pretty",
                "text-[0.9375rem] text-[#cdc2e6] sm:text-[1rem]",
              )}
            >
              {interactive.description}
            </motion.p>

            {/* ------------------------ Features -------------------- */}
            <ul className="mt-10 space-y-6">
              {interactive.features.map((feature, index) => {
                const Icon = featureIcons[feature.icon];

                return (
                  <motion.li
                    key={feature.label}
                    {...rise(0.4 + index * 0.12)}
                    className="flex items-center gap-4"
                  >
                    <Icon className="size-9 shrink-0 text-[#b98cff]" />
                    <span className="text-[0.9375rem] text-[#e6dff5] sm:text-[1rem]">
                      {feature.label}
                    </span>
                  </motion.li>
                );
              })}
            </ul>
          </div>

          {/* ========================== The panel ===================== */}
          <Uncopyable>
            <motion.div
              initial={
                reduce
                  ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
                  : { opacity: 0, y: 30, scale: 0.96, filter: "blur(8px)" }
              }
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true, amount: "some" }}
              transition={{ duration: 0.9, delay: 0.3, ease: easeOut }}
              // Scales the panel's parts with its own width, so they hold
              // their designed proportion at every size.
              className="@container"
            >
              <Panel reduce={Boolean(reduce)} />
            </motion.div>
          </Uncopyable>
        </div>
      </Container>
    </section>
  );
}

/* ========================================================================== */
/*  The player panel                                                          */
/* ========================================================================== */

/**
 * The whole player: header, the frame with its quiz, the transport, the rail.
 *
 * Sized in `em` against the container's own width, so every part scales
 * together rather than each picking its own breakpoint.
 */
function Panel({ reduce }: { reduce: boolean }) {
  const { panel } = interactive;

  return (
    <div
      className={cn(
        "rounded-[1.4em] bg-[#f2eefc] p-[1.1em]",
        "shadow-[0_34px_70px_-26px_rgb(10_4_30/0.7)]",
        "text-[max(9px,1.55cqw)]",
      )}
    >
      {/* ----------------------------- Header ---------------------- */}
      <div className="flex items-center gap-[0.8em] pb-[0.9em]">
        <span
          className={cn(
            "flex size-[2.1em] shrink-0 items-center justify-center",
            "rounded-[0.55em] bg-[#e2d6fb]",
          )}
        >
          <PlayIcon className="size-[1em] text-[#6d15d6]" />
        </span>

        <span className="text-[1.35em] font-bold tracking-[-0.02em] text-[#1d0f3d]">
          {panel.engine}
        </span>

        <span
          className={cn(
            "rounded-full bg-[#e2d6fb] px-[0.95em] py-[0.4em]",
            "text-[0.85em] font-medium text-[#5b21b6]",
          )}
        >
          {panel.badge}
        </span>
      </div>

      {/* ------------------------- The frame ----------------------- */}
      {/* The still fills it; the quiz floats over its right half, as the
          design lays it out. */}
      {/*
        The frame holds the design's 16:9 player shape. The still is nearly
        square (it is the left slice of the supplied panel), so it COVERS that
        box rather than setting it — sized by `h-auto w-full` it stretched the
        scene to the frame's width and pulled the subject out of shape.
      */}
      <div className="relative aspect-[16/9] overflow-hidden rounded-t-[0.7em] bg-[#1d1530]">
        <Image
          src={panel.still.src}
          alt={panel.still.alt}
          width={panel.still.width}
          height={panel.still.height}
          sizes="(min-width: 1024px) 46vw, 92vw"
          className="absolute inset-0 size-full object-cover object-left"
        />

        {/* The quiz. Slides in from the right as it would in the product. */}
        <motion.div
          initial={
            reduce
              ? { opacity: 1, x: 0 }
              : { opacity: 0, x: 24, filter: "blur(6px)" }
          }
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: "some" }}
          transition={{ duration: 0.7, delay: 0.85, ease: easeOut }}
          /*
            `top` + `-translate-y-1/2`, NOT `inset-y`: pinning both edges
            stretched the card to the frame's full height and left a tall white
            void under "Check my answer". The design's card hugs its content.
          */
          className="absolute top-1/2 right-[2.5%] w-[52%] -translate-y-1/2"
        >
          <Quiz reduce={reduce} />
        </motion.div>
      </div>

      {/* ------------------------- Transport ----------------------- */}
      <Transport reduce={reduce} />

      {/* --------------------------- The rail ---------------------- */}
      <Rail reduce={reduce} />
    </div>
  );
}

/**
 * THE QUIZ — the feature this section describes.
 *
 * Its options are real text rather than a picture of options: they are the
 * product's own interface, and a screenshot could not be read aloud.
 */
function Quiz({ reduce }: { reduce: boolean }) {
  const { quiz } = interactive.panel;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-[0.8em] bg-white p-[1em]",
        "shadow-[0_18px_40px_-14px_rgb(10_4_30/0.45)]",
      )}
    >
      <div className="flex items-center gap-[0.6em]">
        <span
          className={cn(
            "flex size-[1.9em] shrink-0 items-center justify-center rounded-full",
            "bg-[#7b16e8] text-[1em] font-bold text-white",
          )}
        >
          ?
        </span>
        <span className="text-[1.05em] font-bold tracking-[-0.015em] text-[#1d0f3d]">
          {quiz.title}
        </span>
      </div>

      <p className="mt-[0.55em] text-[0.9em] text-[#5b5478]">{quiz.concept}</p>

      <p className="mt-[0.7em] text-[0.98em] font-bold leading-snug text-[#1d1530]">
        {quiz.question}
      </p>

      {/* The options. Each ticks in after the last, so the list reads as
          arriving rather than appearing. */}
      <ul className="mt-[0.75em] space-y-[0.45em]">
        {quiz.options.map((option, index) => {
          const chosen = index === quiz.answer;

          return (
            <motion.li
              key={option}
              initial={
                reduce ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }
              }
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: "some" }}
              transition={{
                duration: 0.4,
                delay: 1.15 + index * 0.1,
                ease: easeOut,
              }}
              className={cn(
                "flex items-center gap-[0.65em] rounded-[0.5em]",
                "px-[0.7em] py-[0.55em]",
                chosen
                  ? "bg-[#efe9fd] ring-1 ring-[#d7c9f8] ring-inset"
                  : "ring-1 ring-[#e7e3f2] ring-inset",
              )}
            >
              <span
                className={cn(
                  "flex size-[1.15em] shrink-0 items-center justify-center rounded-full",
                  chosen
                    ? "bg-white ring-[0.16em] ring-[#7b16e8]"
                    : "ring-[0.13em] ring-[#c9c4dd] ring-inset",
                )}
              >
                {chosen && (
                  <span className="size-[0.55em] rounded-full bg-[#7b16e8]" />
                )}
              </span>

              <span className="text-[0.92em] leading-tight text-[#2f2740]">
                {option}
              </span>
            </motion.li>
          );
        })}
      </ul>

      <motion.p
        initial={reduce ? { opacity: 1 } : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: "some" }}
        transition={{ duration: 0.4, delay: 1.5, ease: easeOut }}
        className={cn(
          "mt-[0.8em] rounded-[0.5em] py-[0.65em] text-center",
          "bg-gradient-to-r from-[#7b16e8] to-[#9b3ae6]",
          "text-[0.95em] font-semibold text-white",
        )}
      >
        {quiz.action}
      </motion.p>
    </div>
  );
}

/**
 * THE TRANSPORT — with the quiz's own marker on the scrubber.
 *
 * The "?" sits at the point the video stops to ask, which is what ties the
 * quiz above to the rail below.
 */
function Transport({ reduce }: { reduce: boolean }) {
  /** Where the quiz interrupts, as a share of the track. */
  const at = "38%";

  return (
    <div
      className={cn(
        "flex items-center gap-[1em] rounded-b-[0.7em] bg-[#241a3f]",
        "px-[1.1em] py-[0.85em]",
      )}
    >
      <PlayIcon className="size-[1.15em] shrink-0 text-white" />

      <span className="relative flex h-[0.35em] flex-1 items-center">
        <span className="absolute inset-0 rounded-full bg-white/25" />

        {/* Played up to the quiz, then a lighter run just past it — the design
            shows the marker sitting between the two. */}
        <motion.span
          initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: "some" }}
          transition={{ duration: 0.8, delay: 0.5, ease: easeOut }}
          style={{ width: at }}
          className="absolute left-0 h-full origin-left rounded-full bg-[#8b5cf6]"
        />
        <span className="absolute left-[40%] h-full w-[6%] rounded-full bg-white/45" />

        {/* The marker. Pops once the played run reaches it. */}
        <motion.span
          initial={
            reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.4 }
          }
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: "some" }}
          transition={{ duration: 0.45, delay: 1.3, ease: easeOut }}
          style={{ left: at }}
          className={cn(
            "absolute flex size-[1.9em] -translate-x-1/2 items-center justify-center",
            "rounded-full bg-[#7b16e8] text-[0.85em] font-bold text-white",
            "ring-[0.18em] ring-[#241a3f]",
          )}
        >
          ?
        </motion.span>
      </span>

      <VolumeIcon className="size-[1.2em] shrink-0 text-white" />
      <ExpandIcon className="size-[1.1em] shrink-0 text-white" />
    </div>
  );
}

/**
 * THE RAIL — the three stops the learner passes through.
 *
 * The middle one is lit: it is the moment the section describes.
 */
function Rail({ reduce }: { reduce: boolean }) {
  const { rail } = interactive.panel;

  return (
    <div className="px-[1em] pt-[1.2em] pb-[0.4em]">
      {/* The line, with the stops sitting on it. `justify-between` puts the
          first and last flush to the ends, as the design draws them. */}
      <div className="relative flex items-center justify-between">
        <span className="absolute inset-x-0 h-px bg-[#cfc6e6]" />

        {rail.stops.map((stop, index) => {
          const here = index === rail.at;

          return (
            <motion.span
              key={stop}
              initial={
                reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.4 }
              }
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: "some" }}
              transition={{
                duration: 0.4,
                // The lit stop lands last, after the quiz has played.
                delay: here ? 1.7 : 0.9 + index * 0.12,
                ease: easeOut,
              }}
              className={cn(
                "relative rounded-full",
                here ? "size-[0.85em] bg-[#6d15d6]" : "size-[0.6em] bg-[#b7abd6]",
              )}
            />
          );
        })}
      </div>

      <div className="mt-[0.7em] flex items-start justify-between">
        {rail.stops.map((stop, index) => {
          const here = index === rail.at;

          return (
            <span
              key={stop}
              className={cn(
                "text-[0.88em]",
                // The end labels hug their own edge so neither overhangs the
                // panel; the middle one centres under its stop.
                index === 0 && "text-left",
                index === rail.stops.length - 1 && "text-right",
                here
                  ? "font-bold text-[#6d15d6]"
                  : "text-[#4a4166]",
              )}
            >
              {stop}
            </span>
          );
        })}
      </div>
    </div>
  );
}

/* ========================================================================== */
/*  Icons                                                                     */
/* ========================================================================== */

/**
 * The three feature marks, drawn inline rather than shipped: the pack supplies
 * them at 80x80, which is line art at the size this section renders them.
 */

/** Questions at the right moment — a clock. */
function ClockIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 36" fill="none" className={className} aria-hidden="true">
      <circle cx="18" cy="18" r="14" stroke="currentColor" strokeWidth="2" />
      <path
        d="M18 10v8.6l5.6 3.4"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Quizzes linked to the concept — a document with a marked column. */
function DocumentIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 36" fill="none" className={className} aria-hidden="true">
      <rect
        x="7"
        y="4"
        width="22"
        height="28"
        rx="3"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M13 12h10M13 18h10M13 24h6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Learning through participation — a small group. */
function PeopleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 36" fill="none" className={className} aria-hidden="true">
      <circle cx="18" cy="12" r="4.6" stroke="currentColor" strokeWidth="2" />
      <circle cx="7.6" cy="15" r="3.4" stroke="currentColor" strokeWidth="2" />
      <circle cx="28.4" cy="15" r="3.4" stroke="currentColor" strokeWidth="2" />
      <path
        d="M10.6 28c0-4.2 3.3-6.8 7.4-6.8s7.4 2.6 7.4 6.8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M2.6 26.4c0-3 2.1-4.8 5-4.8M33.4 26.4c0-3-2.1-4.8-5-4.8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
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
