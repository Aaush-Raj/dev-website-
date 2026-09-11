"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { knowledgeManagement } from "@/content/knowledge-management";
import { cn } from "@/lib/utils";

/**
 * KNOWLEDGE MANAGEMENT — EXPLAINED
 * ---------------------------------------------------------------------------
 * Section 2: the statement on the left over a night office, the three RAG
 * steps stepping down its right, and a strip of three principles closing it.
 *
 * ONLY THE SCENE IS A RASTER
 * The plate carries the room, the man and the handwritten "Knowledge, put to
 * work." note — but not the cards or the strip. The pack ships those as one
 * flattened 691x415 PNG, deliberately unused: its copy would be baked in as
 * pixels, soft at section size and invisible to a screen reader.
 *
 * THE DASHED LEADERS
 * Each card hands off to the next with a dashed elbow and a dot at either end,
 * as the design draws them. They are the section's argument — knowledge is
 * retrieved, then generated from — so they draw in sequence, each just after
 * the card it leaves.
 *
 * THE CARDS STEP DOWN AND RIGHT
 * Slots are percentages of the scene, measured from the design, so the stair
 * holds at every width. Below lg they leave the scene and stack, where three
 * overlapping cards would be unreadable.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { explained } = knowledgeManagement;

/** Accent per tone, sampled from the design. */
const TONES = {
  cyan: {
    text: "text-[#77f6fd]",
    ring: "ring-[#77f6fd]/70",
    dot: "#77f6fd",
    glow: "shadow-[0_0_34px_-10px_rgb(119_246_253/0.55)]",
  },
  coral: {
    text: "text-[#ee7a66]",
    ring: "ring-[#ee7a66]/70",
    dot: "#ee7a66",
    glow: "shadow-[0_0_34px_-10px_rgb(238_122_102/0.55)]",
  },
  amber: {
    text: "text-[#f8d257]",
    ring: "ring-[#f8d257]/70",
    dot: "#f8d257",
    glow: "shadow-[0_0_34px_-10px_rgb(248_210_87/0.55)]",
  },
} as const;

/**
 * Where each card sits over the scene, as percentages of it. Measured from the
 * design, in the order the content file lists them.
 */
const CARD_SLOTS = [
  "left-[58.3%] top-[10%] w-[19%]",
  "left-[71.2%] top-[22.4%] w-[17%]",
  "left-[80%] top-[37.8%] w-[16.5%]",
] as const;

/**
 * The two dashed leaders, on a 1000x1000 viewBox over the scene.
 *
 * NOT `preserveAspectRatio="none"`: stretching a viewBox scales x and y
 * independently, which renders an elbow's corner as a smear and its dots as
 * ellipses. A uniformly-scaled square box keeps both true.
 *
 * Each runs from one card's edge to the next, with `from` and `to` marking
 * where the dots sit.
 */
const LEADERS = [
  {
    d: "M 792 168 H 840 V 268",
    from: [792, 168],
    to: [840, 268],
    tone: "cyan",
    delay: 0.85,
  },
  {
    d: "M 900 300 H 940 V 400",
    from: [900, 300],
    to: [940, 400],
    tone: "coral",
    delay: 1.15,
  },
] as const;

/** The glyphs used by the cards and the strip. */
const icons = {
  document: DocumentIcon,
  search: SearchIcon,
  chat: ChatIcon,
  refresh: RefreshIcon,
  chart: ChartIcon,
} as const;

export function KnowledgeExplained() {
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
      // The hero's "Explore knowledge management" CTA points here.
      id="explained"
      className={cn(
        "relative isolate overflow-hidden text-white",
        // The night the scene sits on, so the section continues it wherever
        // the plate does not reach.
        "bg-[#0e1524]",
        // Below lg the copy leads and the scene follows; from lg up the copy
        // overlays it.
        "flex flex-col lg:block",
      )}
    >
      {/* ============================== Scene ======================== */}
      <Image
        src={explained.scene.src}
        alt={explained.scene.alt}
        width={explained.scene.width}
        height={explained.scene.height}
        sizes="100vw"
        className="order-2 h-auto w-full lg:order-none"
      />

      {/* A wash over the left, so the copy keeps its contrast against the
          lit part of the room. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden lg:block"
        style={{
          background:
            "linear-gradient(100deg, rgb(10 16 30 / 0.95) 0%, rgb(10 16 30 / 0.82) 28%, rgb(10 16 30 / 0.35) 46%, transparent 62%)",
        }}
      />

      {/* -------------------- Cards and their leaders --------------- */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        {/* The leaders, under the cards. */}
        <svg
          viewBox="0 0 1000 1000"
          fill="none"
          aria-hidden="true"
          className="absolute inset-0 size-full"
        >
          {LEADERS.map((leader) => {
            const tone = TONES[leader.tone];

            return (
              <motion.g
                key={leader.d}
                initial={reduce ? { opacity: 1 } : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: "some" }}
                transition={{
                  duration: 0.5,
                  delay: leader.delay,
                  ease: easeOut,
                }}
              >
                <path
                  d={leader.d}
                  stroke="rgb(255 255 255 / 0.55)"
                  strokeWidth="3"
                  strokeDasharray="10 10"
                  strokeLinecap="round"
                />
                <circle cx={leader.from[0]} cy={leader.from[1]} r="7" fill={tone.dot} />
                <circle cx={leader.to[0]} cy={leader.to[1]} r="7" fill={tone.dot} />
              </motion.g>
            );
          })}
        </svg>

        {/* The three cards. */}
        <div style={{ fontSize: "max(9px, 0.78vw)" }}>
          {explained.steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={
                reduce
                  ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
                  : { opacity: 0, y: 20, scale: 0.95, filter: "blur(7px)" }
              }
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true, amount: "some" }}
              transition={{
                duration: 0.75,
                // Each card lands, then the leader leaving it appears.
                delay: 0.6 + index * 0.3,
                ease: easeOut,
              }}
              className={cn("absolute", CARD_SLOTS[index])}
            >
              <StepCard step={step} index={index} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* =============================== Copy ======================== */}
      <div className="order-1 lg:absolute lg:inset-0 lg:order-none">
        <Container width="hero" className="flex h-full flex-col justify-center">
          <div
            className={cn(
              "max-w-[34rem] pt-16 pb-12 sm:pt-20",
              "lg:max-w-[46%] lg:py-0",
            )}
          >
            <motion.p
              {...rise(0.05)}
              className={cn(
                "text-[0.6875rem] font-bold uppercase",
                "tracking-[0.18em] text-[#a876e9] sm:text-xs",
              )}
            >
              {explained.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.16)}
              className={cn(
                "mt-5 font-display font-bold tracking-[-0.035em]",
                "leading-[1.06] text-[#f9f8fa]",
                "text-[1.875rem] sm:text-[2.25rem] lg:text-[2.5rem] xl:text-[3rem]",
              )}
            >
              {explained.headline.map((line) => (
                <span key={line} className="inline lg:block">
                  {line}{" "}
                </span>
              ))}
            </motion.h2>

            <motion.p
              {...rise(0.3)}
              className={cn(
                "mt-6 max-w-[30rem] leading-relaxed text-pretty",
                "text-[0.9375rem] text-white/80 sm:text-[1rem]",
                "xl:text-[1.0625rem]",
              )}
            >
              {explained.description}
            </motion.p>

            {/* ---------------------- Where RAG comes in ------------ */}
            <motion.div {...rise(0.42)} className="mt-8">
              <h3 className="text-[1.0625rem] font-bold text-white sm:text-[1.125rem]">
                {explained.rag.title}
              </h3>
              <p
                className={cn(
                  "mt-2 max-w-[30rem] leading-relaxed text-pretty",
                  "text-[0.9375rem] text-white/80 sm:text-[1rem]",
                )}
              >
                {explained.rag.body}
              </p>
            </motion.div>
          </div>
        </Container>
      </div>

      {/* ------------------------ Cards, stacked ------------------- */}
      {/* The small-screen home for the same three cards. */}
      <Container width="hero" className="order-3 pt-8 pb-10 lg:hidden">
        <ol className="grid gap-3 text-[13px] sm:grid-cols-3">
          {explained.steps.map((step, index) => (
            <li key={step.title}>
              <StepCard step={step} index={index} />
            </li>
          ))}
        </ol>
      </Container>

      {/* ============================= Strip ======================== */}
      <div
        className={cn(
          "order-4 border-t border-white/10 bg-[#101827] lg:order-none",
          // On the scene's foot from lg up, as the design places it — in flow
          // it left a band of empty night between the two.
          "relative lg:absolute lg:inset-x-0 lg:bottom-0",
        )}
      >
        <Container width="hero">
          <motion.ul
            {...rise(0.2)}
            className={cn(
              "grid gap-x-6 gap-y-5 py-7",
              "sm:grid-cols-3 sm:divide-x sm:divide-white/10",
            )}
          >
            {explained.principles.map((principle) => {
              const Icon = icons[principle.icon];
              const tone = TONES[principle.tone];

              return (
                <li
                  key={principle.label}
                  className="flex items-center gap-4 sm:justify-center sm:px-4"
                >
                  <Icon className={cn("size-7 shrink-0", tone.text)} />
                  <span className="text-[1rem] text-white/90 sm:text-[1.0625rem]">
                    {principle.label}
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

/* ========================================================================== */
/*  A step                                                                    */
/* ========================================================================== */

function StepCard({
  step,
  index,
}: {
  step: (typeof explained.steps)[number];
  index: number;
}) {
  const tone = TONES[step.tone];
  const Icon = icons[step.icon];

  return (
    <div
      className={cn(
        "flex items-start gap-[0.9em] rounded-[0.8em] p-[1em]",
        // Translucent on purpose: the room reads through, so the cards look
        // like readouts over the scene rather than panels pasted on it.
        "bg-[#0b1220]/85 ring-1 backdrop-blur-md",
        tone.ring,
        tone.glow,
      )}
    >
      <Icon className={cn("size-[2.2em] shrink-0", tone.text)} />

      <span className="min-w-0">
        {/* The ordinal is drawn from the step's position rather than typed
            into the copy, so the two cannot drift apart. */}
        <span
          className={cn(
            "block text-[0.85em] font-bold tracking-[0.1em] uppercase",
            tone.text,
          )}
        >
          {index + 1}. {step.title}
        </span>
        <span className="mt-[0.3em] block text-[0.95em] leading-snug text-white/90">
          {step.body}
        </span>
      </span>
    </div>
  );
}

/* ========================================================================== */
/*  Icons                                                                     */
/* ========================================================================== */

/** Your knowledge / organise knowledge. */
function DocumentIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M6 3h7l5 5v13H6V3Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M12.8 3.3v5.2h5.2M9 12.6h6M9 16.2h4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Retrieve. */
function SearchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="10.6" cy="10.6" r="6.4" stroke="currentColor" strokeWidth="1.9" />
      <path
        d="m15.4 15.4 4.4 4.4"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Generate. */
function ChatIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 4c4.6 0 8.3 2.9 8.3 6.5S16.6 17 12 17c-.9 0-1.8-.1-2.6-.3l-4.2 2 1.2-3.5C4.6 14 3.7 12.4 3.7 10.5 3.7 6.9 7.4 4 12 4Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M8.6 9.4h6.8M8.6 12.4h4.4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Keep content current. */
function RefreshIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M4.4 10a7.8 7.8 0 0 1 13-3.2l2 2M19.6 14a7.8 7.8 0 0 1-13 3.2l-2-2"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.4 4.2v4.6h-4.6M4.6 19.8v-4.6h4.6"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Make it useful. */
function ChartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M5 20v-6M12 20V7M19 20v-9"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
