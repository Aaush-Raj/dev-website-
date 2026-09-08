"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { salesEnablement } from "@/content/sales-enablement";
import { cn } from "@/lib/utils";

/**
 * SALES ENABLEMENT — THE REALITY
 * ---------------------------------------------------------------------------
 * The dark section: the statement over an illustrated night office, three
 * moment cards placed around the seller, and an insight strip closing it.
 *
 * WHY THE CARDS AND STRIP ARE MARKUP
 * The pack ships them as crops, and unlike the LurnyKxP panels they even carry
 * real alpha. They are still rebuilt here for the same reason as the hero's
 * engine cards: each is around 400x130 with its copy baked in as pixels, which
 * is soft at section size and cannot be selected, translated or read aloud.
 * The supplied background is reconstructed free of both, which is precisely
 * what makes building them possible.
 *
 * Only the scene ships as a raster — it is an illustration, and nothing else.
 *
 * THE DASHED LEADERS
 * Each card trails a dashed line to a dot on the scene, marking the moment it
 * describes. They are in the design but in none of the assets, so they are
 * drawn. Like the frontline problem section, they deliberately do NOT join up
 * to each other: three disconnected moments is the section's argument.
 *
 * THE COMPOSITION SCALES AS ONE OBJECT
 * Cards are positioned in percentages of the scene and sized in `em` off a
 * `cqw` root, so they hold their designed proportions as it narrows. Below lg
 * they leave the scene and stack under it as an ordinary list — at phone width
 * they would cover the seller and each other.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { reality } = salesEnablement;

/** Accent per tone, sampled from the design. */
const TONES = {
  teal: {
    text: "text-[#65e4c3]",
    ring: "ring-[#65e4c3]/45",
    dot: "#65e4c3",
  },
  coral: {
    text: "text-[#f2725d]",
    ring: "ring-[#f2725d]/45",
    dot: "#f2725d",
  },
  amber: {
    text: "text-[#e1b83a]",
    ring: "ring-[#e1b83a]/45",
    dot: "#e1b83a",
  },
  violet: {
    text: "text-[#a364f4]",
    ring: "ring-[#a364f4]/45",
    dot: "#a364f4",
  },
} as const;

/**
 * Where each moment card sits over the scene and where its leader runs, as
 * percentages of the scene box. Measured from the design.
 *
 * The leaders are drawn on a 100x100 viewBox with `preserveAspectRatio="none"`,
 * so the numbers read directly as those same percentages.
 */
const MOMENT_SLOTS = [
  {
    card: "left-[5%] top-[31%] w-[24%]",
    leader: "M 28 38 H 33 V 47",
    dot: [33, 47],
  },
  {
    card: "left-[24%] bottom-[18%] w-[26%]",
    leader: "M 50 62 H 56 V 54",
    dot: [56, 54],
  },
  {
    card: "right-[4%] top-[9%] w-[26%]",
    leader: "M 70 17 H 64 V 26",
    dot: [64, 26],
  },
] as const;

export function SalesReality() {
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
      // The near-black the scene sits on, sampled from the design.
      className="relative isolate overflow-hidden bg-[#161626] text-white"
    >
      {/* ============================== Scene ======================== */}
      {/* In flow, at its own aspect: the statement sits over its empty upper
          left and the cards hang off the seller, so a cover-crop would move
          both away from what they point at. */}
      <div className="@container relative">
        <Image
          src={reality.scene.src}
          alt={reality.scene.alt}
          width={reality.scene.width}
          height={reality.scene.height}
          sizes="100vw"
          className="h-auto w-full"
        />

        {/* A wash over the upper left, so the statement keeps its contrast
            against the lit part of the room. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden lg:block"
          style={{
            background:
              "linear-gradient(115deg, rgb(15 15 28 / 0.94) 0%, rgb(15 15 28 / 0.82) 30%, rgb(15 15 28 / 0.35) 52%, transparent 72%)",
          }}
        />

        {/* Below lg the copy spans the whole, much shorter scene, so the
            diagonal wash above would leave the description over a lit part of
            the room. A vertical scrim covers it there instead. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 lg:hidden"
          style={{
            background:
              "linear-gradient(180deg, rgb(15 15 28 / 0.93) 0%, rgb(15 15 28 / 0.86) 55%, rgb(15 15 28 / 0.55) 80%, rgb(15 15 28 / 0.3) 100%)",
          }}
        />

        {/* ------------------------- Leaders ---------------------- */}
        {/* Drawn under the cards. They trail off rather than joining up —
            see the note at the top. */}
        <svg
          viewBox="0 0 100 100"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden size-full lg:block"
        >
          {MOMENT_SLOTS.map((slot, index) => (
            <motion.path
              key={slot.leader}
              d={slot.leader}
              stroke="rgb(255 255 255 / 0.4)"
              strokeWidth="0.28"
              strokeDasharray="1.4 1.4"
              vectorEffect="non-scaling-stroke"
              initial={reduce ? { opacity: 1 } : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: "some" }}
              transition={{
                duration: 0.5,
                delay: 0.7 + index * 0.14,
                ease: easeOut,
              }}
            />
          ))}
        </svg>

        {/* The leader dots. Positioned rather than drawn in the svg above:
            that box is stretched with `preserveAspectRatio="none"`, which
            would squash a circle into an ellipse. */}
        <div className="pointer-events-none absolute inset-0 hidden lg:block">
          {MOMENT_SLOTS.map((slot, index) => {
            const tone = TONES[reality.moments[index].tone];

            return (
              <motion.span
                key={slot.leader}
                aria-hidden="true"
                initial={reduce ? { opacity: 1 } : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: "some" }}
                transition={{
                  duration: 0.5,
                  delay: 0.78 + index * 0.14,
                  ease: easeOut,
                }}
                className="absolute size-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  left: `${slot.dot[0]}%`,
                  top: `${slot.dot[1]}%`,
                  backgroundColor: tone.dot,
                }}
              />
            );
          })}
        </div>

        {/* ============================ Copy ======================== */}
        <div className="absolute inset-0">
          <Container width="hero" className="h-full pt-8 sm:pt-12 lg:pt-14">
            <div className="max-w-[26rem] lg:max-w-[36rem]">
              <motion.p
                {...rise(0)}
                className={cn(
                  "text-[0.625rem] font-bold uppercase",
                  "tracking-[0.16em] text-[#a364f4] sm:text-xs",
                )}
              >
                {reality.eyebrow}
              </motion.p>

              <motion.h2
                {...rise(0.08)}
                className={cn(
                  "mt-3 font-display font-bold tracking-[-0.03em]",
                  "leading-[1.1] text-white",
                  "text-[1.125rem] sm:text-[1.75rem] lg:text-[2.25rem] xl:text-[2.75rem]",
                )}
              >
                {reality.headline.map((line) => (
                  <span key={line} className="inline lg:block">
                    {line}{" "}
                  </span>
                ))}
              </motion.h2>

              <motion.p
                {...rise(0.16)}
                className={cn(
                  "mt-3 max-w-[32rem] leading-relaxed text-pretty",
                  "text-[0.8125rem] text-[#ccc9dd] sm:text-[0.9375rem] lg:mt-4",
                  "lg:text-[1rem]",
                )}
              >
                {reality.description}
              </motion.p>
            </div>
          </Container>
        </div>

        {/* =========================== Moments ====================== */}
        {/* Over the scene from lg up; below that they stack under it — see the
            list further down. */}
        <div
          className="pointer-events-none absolute inset-0 hidden lg:block"
          // Scales the cards with the scene, so they hold their designed
          // proportion at every width.
          style={{ fontSize: "max(9px, 0.92cqw)" }}
        >
          {reality.moments.map((moment, index) => (
            <motion.div
              key={moment.title}
              initial={
                reduce
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 10, scale: 0.97 }
              }
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: "some" }}
              transition={{
                duration: 0.55,
                delay: 0.4 + index * 0.14,
                ease: easeOut,
              }}
              className={cn("absolute", MOMENT_SLOTS[index].card)}
            >
              <MomentCard moment={moment} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* --------------------- Moments, stacked ------------------- */}
      {/* The small-screen home for the same three cards. They cannot overlay
          the scene at this width without covering the seller and each other. */}
      <Container width="hero" className="lg:hidden">
        <ul className="mt-8 grid gap-4 text-[13px] sm:grid-cols-2">
          {reality.moments.map((moment) => (
            <li key={moment.title}>
              <MomentCard moment={moment} />
            </li>
          ))}
        </ul>
      </Container>

      {/* =========================== Insights ====================== */}
      <div className="border-t border-white/10 bg-[#13151f]">
        <Container width="hero">
          <motion.ul
            {...rise(0.2)}
            className={cn(
              "grid gap-x-6 gap-y-5 py-7",
              "sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-white/10",
            )}
          >
            {reality.insights.map((insight) => {
              const Icon = insightIcons[insight.icon];
              const tone = TONES[insight.tone];

              return (
                <li
                  key={insight.label}
                  className="flex items-center gap-3.5 lg:justify-center lg:px-4"
                >
                  <Icon className={cn("size-5 shrink-0", tone.text)} />
                  <span className="text-[0.875rem] text-white/90 sm:text-[0.9375rem]">
                    {insight.label}
                  </span>
                </li>
              );
            })}
          </motion.ul>
        </Container>
      </div>
    </section>
  );
}

/**
 * One moment card. Shared by the overlaid and the stacked layouts, so the two
 * cannot drift apart.
 */
function MomentCard({
  moment,
}: {
  moment: (typeof reality.moments)[number];
}) {
  const tone = TONES[moment.tone];
  const Icon = momentIcons[moment.icon];

  return (
    <div
      className={cn(
        "flex items-start gap-[0.9em] rounded-[0.7em] p-[0.9em]",
        // Translucent on purpose: the room reads through, so the cards look
        // like readouts over the moment rather than panels pasted on it.
        "bg-[#0f1018]/80 ring-1 backdrop-blur-md",
        tone.ring,
      )}
    >
      <Icon className={cn("size-[2.1em] shrink-0", tone.text)} />

      <span className="min-w-0">
        <span
          className={cn(
            "block text-[0.72em] font-bold tracking-[0.12em] uppercase",
            tone.text,
          )}
        >
          {moment.stage}
        </span>
        <span className="mt-[0.35em] block text-[1em] font-semibold text-white">
          {moment.title}
        </span>
        <span className="mt-[0.15em] block text-[0.85em] text-white/65">
          {moment.body}
        </span>
      </span>
    </div>
  );
}

/* ========================================================================== */
/*  Icons                                                                     */
/* ========================================================================== */

/** The glyph on each moment card. */
const momentIcons = {
  document: DocumentIcon,
  bubble: BubbleIcon,
  people: PeopleIcon,
} as const;

/** The glyph beside each insight. */
const insightIcons = {
  clock: ClockIcon,
  bubble: BubbleIcon,
  person: PersonIcon,
  chart: ChartIcon,
} as const;

/** Before the call — the briefing. */
function DocumentIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M6 3h7l5 5v13H6V3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M12.8 3.3v5.2h5.2M9 12.5h6M9 16h4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** In the conversation — the objection. */
function BubbleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 4c4.6 0 8.3 2.9 8.3 6.5S16.6 17 12 17c-.9 0-1.8-.1-2.6-.3l-4.2 2 1.2-3.5C4.6 14 3.7 12.4 3.7 10.5 3.7 6.9 7.4 4 12 4Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** After the call — the customer context. */
function PeopleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="9" cy="8" r="3.4" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M2.8 20c0-3.4 2.9-5.4 6.2-5.4s6.2 2 6.2 5.4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M16.4 5.4a3.4 3.4 0 0 1 0 6.5M17.8 14.9c2 .6 3.4 2.1 3.4 4.4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Knowledge goes stale. */
function ClockIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="8.6" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M12 6.8V12l3.4 2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Coaching lacks context. */
function PersonIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="7.6" r="3.6" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M4.6 20c0-3.7 3.3-5.9 7.4-5.9s7.4 2.2 7.4 5.9"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Follow-ups lose momentum. */
function ChartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M5 19v-6M12 19V5M19 19v-9"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
