"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { onboarding } from "@/content/onboarding";
import { cn } from "@/lib/utils";

/**
 * ONBOARDING — THE CONNECTED APPROACH
 * ---------------------------------------------------------------------------
 * The statement on the left, five steps on cards to the right with arrows
 * threading them in a zig-zag.
 *
 * ONLY THE GRADIENT IS A RASTER
 * The pack ships the five cards and their arrows as ONE flattened 877x867 PNG,
 * and that file is deliberately unused: its copy would be baked in as pixels,
 * soft at section size and unreadable to a screen reader. It also ships the
 * gradient CLEAN, with no cards on it, which is what makes building them
 * possible. See scripts/build-onboarding-hero.cjs.
 *
 * THE ARROWS
 * Four of them, each joining one card to the next, drawn here because the
 * clean plate has none. They are the section's argument — five steps that
 * follow from one another — so they draw along their length in sequence, each
 * just after the card it leaves. The zig-zag means each has its own shape:
 * across, down-and-back, across, and the closing curl to the note.
 *
 * They live in ONE svg spanning the card field, positioned in percentages of
 * it, so the whole arrangement holds at every width. Hidden below lg, where
 * the cards stack in a single column and the arrows would connect nothing.
 *
 * THE CARD FIELD KEEPS A FIXED ASPECT
 * The cards are absolutely positioned as percentages, so their container must
 * hold the design's proportions or they would overlap as it narrows. Below lg
 * that is dropped and they become an ordinary stack.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { approach } = onboarding;

/**
 * Where each card sits in the field, as percentages of it. Measured from the
 * design, in the order the content file lists them.
 */
const CARD_SLOTS = [
  "lg:left-[0%] lg:top-[0%] lg:w-[42%]",
  "lg:left-[54.5%] lg:top-[0%] lg:w-[45.5%]",
  "lg:left-[24.5%] lg:top-[33.5%] lg:w-[47%]",
  "lg:left-[0%] lg:top-[64.5%] lg:w-[45%]",
  "lg:left-[54.5%] lg:top-[64.5%] lg:w-[46.5%]",
] as const;

/**
 * The four arrows, on a 1000x1000 viewBox over the card field.
 *
 * NOT `preserveAspectRatio="none"`: stretching a viewBox scales x and y
 * independently, which renders a curve as mismatched fragments and turns a
 * round cap into a smear. The field is very nearly square (measured 673x686),
 * so a uniformly-scaled square box maps onto it almost exactly.
 *
 * Coordinates come from the cards' own measured edges, as thousandths of the
 * field: cards 1 and 2 span y 0-237, card 3 spans x 245-715 at y 335-572, and
 * cards 4 and 5 span y 645-882. Card 1 ends at x=420 and card 2 begins at
 * x=545; card 4 ends at x=450 and card 5 begins at x=545.
 *
 * Re-derive these whenever the field's aspect changes — the vertical numbers
 * move with it, and an arrow that no longer meets its card is the symptom.
 *
 * `delay` fires each arrow just after the card it leaves.
 */
const ARROWS = [
  // 01 -> 02, straight across the top.
  { d: "M 435 118 L 530 118", delay: 0.75 },
  // 02 -> 03, out of card 2's foot, curving down and back to card 3's right.
  { d: "M 850 250 C 900 320, 850 410, 730 450", delay: 1.0 },
  // 03 -> 04, out of card 3's left, curving down to card 4's top.
  { d: "M 240 500 C 150 545, 140 600, 195 632", delay: 1.25 },
  // 04 -> 05, straight across the bottom.
  { d: "M 465 763 L 530 763", delay: 1.5 },
] as const;

export function OnboardingApproach() {
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
    <section
      // The hero's "Explore the onboarding journey" CTA points here.
      id="journey"
      className="relative isolate overflow-hidden bg-[#dcd9f5] py-section-lg"
    >
      {/* The gradient. Covers the section, so the copy and cards sit on it. */}
      <Image
        src={approach.backdrop.src}
        alt={approach.backdrop.alt}
        width={approach.backdrop.width}
        height={approach.backdrop.height}
        aria-hidden="true"
        sizes="100vw"
        className="pointer-events-none absolute inset-0 -z-10 size-full object-cover"
      />

      <Container width="hero">
        <div
          className={cn(
            "grid items-center gap-14",
            // Measured from the design: the statement runs to roughly 40% of
            // the frame, the card field takes the rest.
            "lg:grid-cols-[minmax(0,0.76fr)_minmax(0,1fr)] lg:gap-10",
            "xl:gap-14",
          )}
        >
          {/* =========================== Statement ==================== */}
          <div>
            <motion.p
              {...rise(0.05)}
              className={cn(
                "text-[0.6875rem] font-bold uppercase",
                "tracking-[0.2em] text-[#7e00ff] sm:text-xs",
              )}
            >
              {approach.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.16)}
              className={cn(
                "mt-6 font-display font-bold tracking-[-0.035em]",
                "leading-[1.04] text-[#030904]",
                "text-[2rem] sm:text-[2.5rem] xl:text-[3.25rem]",
              )}
            >
              {approach.headline.map((line) => (
                <span key={line} className="inline lg:block">
                  {line}{" "}
                </span>
              ))}
            </motion.h2>

            <motion.p
              {...rise(0.3)}
              className={cn(
                "mt-6 max-w-[30rem] leading-relaxed text-pretty",
                "text-[1rem] text-[#0d0229]/85 sm:text-[1.0625rem]",
              )}
            >
              {approach.description}
            </motion.p>

            {/* --------------------- Shared essentials -------------- */}
            <motion.div
              {...rise(0.42)}
              className="mt-10 flex items-start gap-5"
            >
              <PeopleIcon className="mt-1 size-11 shrink-0 text-[#8301f4]" />

              <p>
                <span className="block text-[1rem] font-bold text-[#100132] sm:text-[1.0625rem]">
                  {approach.shared.title}
                </span>
                <span className="mt-1 block text-[0.9375rem] leading-relaxed text-[#1e044a]/80 sm:text-[1rem]">
                  {approach.shared.body}
                </span>
              </p>
            </motion.div>
          </div>

          {/* ========================== Card field ==================== */}
          <div>
            <div
              className={cn(
                "@container relative",
                // The cards are positioned as percentages, so the field must
                // hold the design's proportions or they would overlap as it
                // narrows. Below lg they stack instead — see the note above.
                "lg:aspect-[0.95]",
              )}
            >
              {/* ------------------------ Arrows ------------------- */}
              <svg
                viewBox="0 0 1000 1000"
                fill="none"
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 hidden size-full lg:block"
              >
                <defs>
                  <marker
                    id="approach-head"
                    viewBox="0 0 10 10"
                    refX="7"
                    refY="5"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 1 L 8 5 L 0 9 z" fill="#9600fd" />
                  </marker>
                </defs>

                {ARROWS.map((arrow) => (
                  <motion.path
                    key={arrow.d}
                    d={arrow.d}
                    stroke="#9600fd"
                    strokeWidth="5"
                    strokeLinecap="round"
                    markerEnd="url(#approach-head)"
                    initial={
                      reduce
                        ? { pathLength: 1, opacity: 1 }
                        : { pathLength: 0, opacity: 0 }
                    }
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true, amount: "some" }}
                    transition={{
                      duration: 0.55,
                      delay: arrow.delay,
                      ease: easeOut,
                    }}
                  />
                ))}
              </svg>

              {/* ------------------------- Cards ------------------- */}
              {/* Absolute from lg up, an ordinary stack below it. */}
              <ol
                className={cn(
                  "grid gap-4 sm:grid-cols-2 lg:block",
                  // Scales the cards with the field, so they hold their
                  // designed proportion at every width.
                  "lg:text-[max(11px,1.05cqw)]",
                )}
              >
                {approach.steps.map((step, index) => (
                  <motion.li
                    key={step.title}
                    initial={
                      reduce
                        ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
                        : {
                            opacity: 0,
                            y: 22,
                            scale: 0.95,
                            filter: "blur(7px)",
                          }
                    }
                    whileInView={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      filter: "blur(0px)",
                    }}
                    viewport={{ once: true, amount: "some" }}
                    transition={{
                      duration: 0.75,
                      // Each card lands, then the arrow leaving it draws on.
                      delay: 0.55 + index * 0.25,
                      ease: easeOut,
                    }}
                    className={cn("lg:absolute", CARD_SLOTS[index])}
                  >
                    <Step step={step} index={index} />
                  </motion.li>
                ))}
              </ol>

              {/* ------------------------- The note ----------------- */}
              {/* Anchored INSIDE the field, under card 04: in the design it
                  sits a hair (13px on a 999px frame) below that card's foot,
                  with the curl arcing back up to it.

                  It must live inside the field div — as a sibling after it, the
                  `absolute` resolved against the section instead and the note
                  landed off the field entirely, pointing at nothing. */}
              <motion.p
                {...rise(1.7)}
                className={cn(
                  "mt-6 flex items-start gap-3 lg:mt-0",
                  "font-hand leading-tight text-[#7e00ff]",
                  "text-[1.25rem] sm:text-[1.4rem] xl:text-[1.6rem]",
                  // Below lg it follows the stack, centred. From lg up it is
                  // positioned in the field, tucked under card 04.
                  "justify-center",
                  "lg:absolute lg:top-[88%] lg:left-[1%] lg:justify-start",
                )}
              >
                <NoteCurl className="mt-1.5 w-14 shrink-0 text-[#9600fd] sm:w-16 xl:w-[4.5rem]" />

                <span>
                  {approach.note.map((line) => (
                    <span key={line} className="block whitespace-nowrap">
                      {line}
                    </span>
                  ))}
                </span>
              </motion.p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ========================================================================== */
/*  A step                                                                    */
/* ========================================================================== */

/** The mark in each card's header. */
const stepIcons = {
  target: TargetIcon,
  sliders: SlidersIcon,
  book: BookIcon,
  chat: ChatIcon,
  check: CheckIcon,
} as const;

function Step({
  step,
  index,
}: {
  step: (typeof approach.steps)[number];
  index: number;
}) {
  const Icon = stepIcons[step.icon];

  return (
    <div
      className={cn(
        "h-full rounded-[1.1em] bg-[#f7f7fb]/95 p-[1.3em] backdrop-blur-sm",
        "shadow-[0_20px_46px_-20px_rgb(40_10_90/0.32)]",
        "ring-1 ring-white/70",
      )}
    >
      <div className="flex items-start justify-between gap-[1em]">
        {/* The ordinal, drawn from the step's position rather than stored. */}
        <span className="text-[1.35em] font-semibold text-[#9d5bfa]">
          {String(index + 1).padStart(2, "0")}
        </span>

        <Icon className="size-[3.6em] shrink-0 text-[#7e00ff]" />
      </div>

      <p className="mt-[0.9em] text-[1.1em] font-bold tracking-[-0.01em] text-[#080415]">
        {step.title}
      </p>

      <p className="mt-[0.35em] text-[0.95em] leading-relaxed text-[#190144]/80">
        {step.body}
      </p>

      <p
        className={cn(
          "mt-[1em] inline-flex rounded-full bg-[#e6d4fd] px-[1em] py-[0.4em]",
          "text-[0.9em] font-bold text-[#7500d6]",
        )}
      >
        {step.engine}
      </p>
    </div>
  );
}

/* ========================================================================== */
/*  Icons                                                                     */
/* ========================================================================== */

/** Shared essentials — a group. */
function PeopleIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 44 44"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="22" cy="11" r="5.4" stroke="currentColor" strokeWidth="2.2" />
      <circle
        cx="8.6"
        cy="15.4"
        r="4.2"
        stroke="currentColor"
        strokeWidth="2.2"
      />
      <circle
        cx="35.4"
        cy="15.4"
        r="4.2"
        stroke="currentColor"
        strokeWidth="2.2"
      />
      <path
        d="M13 29.4c0-4.6 4-7.2 9-7.2s9 2.6 9 7.2"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M2.6 30c0-3.5 2.6-5.6 6-5.6M41.4 30c0-3.5-2.6-5.6-6-5.6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M13.6 35.4h16.8"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** 01 — define the role. */
function TargetIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle
        cx="14.6"
        cy="17.4"
        r="10.4"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle
        cx="14.6"
        cy="17.4"
        r="5.8"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="14.6" cy="17.4" r="1.8" fill="currentColor" />
      <path
        d="m14.6 17.4 11-11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M22.6 4.4 27.6 3l-1.4 5-3.6-3.6Z" fill="currentColor" />
    </svg>
  );
}

/** 02 — understand the starting point. */
function SlidersIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M4 10h24M4 22h24"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle
        cx="21"
        cy="10"
        r="3.4"
        fill="#f7f7fb"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle
        cx="11"
        cy="22"
        r="3.4"
        fill="#f7f7fb"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

/** 03 — build the relevant journey. */
function BookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M3.6 6.4h8.2c2.3 0 4.2 1.9 4.2 4.2v15c0-1.9-1.9-3.4-4.2-3.4H3.6V6.4ZM28.4 6.4h-8.2c-2.3 0-4.2 1.9-4.2 4.2v15c0-1.9 1.9-3.4 4.2-3.4h8.2V6.4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** 04 — support everyday work. */
function ChatIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M13.4 4.6c5.2 0 9.4 3.2 9.4 7.2s-4.2 7.2-9.4 7.2c-1 0-2-.1-2.9-.3l-5 2.3 1.4-4C4.9 15.7 4 14 4 11.8c0-4 4.2-7.2 9.4-7.2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M22.4 13.6c3.2.6 5.6 2.9 5.6 5.7 0 1.6-.8 3-2 4l1 2.9-3.6-1.6c-.7.2-1.4.3-2.2.3-3 0-5.6-1.6-6.6-3.8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** 05 — review readiness. */
function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="16" cy="16" r="12.4" stroke="currentColor" strokeWidth="2" />
      <path
        d="m10 16.4 4.2 4.2L22.4 12"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** The curl leading into the closing note. */
/**
 * The mark leading from the note back up to card 04.
 *
 * Traced from the design: ONE shallow arc that leaves the text on the right,
 * sweeps left and lifts at its end, closed by a plain open V arrowhead — two
 * straight strokes meeting at the tip.
 *
 * An earlier version curled the tail and drew the head as curved strokes,
 * which read as a scribble rather than an arrow. The head is now built from
 * straight lines whose angles bisect the path's own direction at the tip, so
 * it looks aimed rather than decorative.
 */
function NoteCurl({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 34"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M62 24C48 32 26 33 13 23 9.6 20.4 7.4 16 6.4 10"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* The head: two straight strokes off the tip at (6.4, 10). */}
      <path
        d="M6.4 10 2.6 18.2M6.4 10l8.4 2.6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
