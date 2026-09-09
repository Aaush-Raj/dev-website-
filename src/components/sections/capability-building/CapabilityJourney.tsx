"use client";

import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { Uncopyable } from "@/components/ui/Uncopyable";
import { capabilityBuilding } from "@/content/capability-building";
import { cn } from "@/lib/utils";

import { JourneyCard } from "./CapabilityJourneyCards";

/**
 * A CONNECTED CAPABILITY JOURNEY
 * ---------------------------------------------------------------------------
 * Section 3: five steps across the band, each a numbered header over a product
 * card, closed by a long dashed arrow curving back from step five to step one.
 *
 * THE BACKGROUND IS DRAWN. The design pack supplies it as a 935KB PNG carrying
 * two concentric quarter-arcs on near-white — pure geometry, so it costs a pair
 * of ring elements instead, scales to any viewport rather than pixelating past
 * 1672px, and does not have to be re-exported to change.
 *
 * THE RETURN ARROW IS THE POINT OF THE SECTION. Five steps in a row would read
 * as a finite sequence; the arrow curving back to step one is what makes it a
 * loop, which is why it gets a real draw-on animation rather than fading in,
 * and why the handwritten note sits on it rather than beneath the cards.
 *
 * It is one cubic curve in a viewBox with a FIXED aspect ratio. A stretched box
 * (`preserveAspectRatio="none"`) would flatten the curve at wide viewports and
 * skew the arrowhead into a wedge — the same failure this build has hit on
 * every connector drawn that way.
 *
 * The cards are wrapped in `<Uncopyable>`: they are illustrative product
 * surfaces, and their sample values should not be selectable as if they were
 * real figures.
 */

const { journey } = capabilityBuilding;

/** Motion's string easings are not typed, so the cubic curve is spelled out. */
const easeOut = [0.16, 1, 0.3, 1] as const;

export function CapabilityJourney() {
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduce ? "shown" : "hidden",
    whileInView: "shown",
    viewport: {
      once: true,
      amount: "some",
      margin: "0px 0px 15% 0px",
    } as const,
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
        // Sampled from the design's ground, which is a hair warm of white.
        "bg-[#fefefc] text-[#0b0a14]",
        "py-16 sm:py-20 lg:py-24",
      )}
    >
      {/* ====================== Background geometry ===================== */}
      {/*
        The supplied plate's two quarter-arcs, as rings. Each is a bordered
        circle far larger than its corner, cropped by the section — which is
        exactly how the plate draws them, and costs nothing at any size.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <span
          className={cn(
            "absolute rounded-full border-[6rem] border-[#ecebfb]",
            "-top-[38%] -right-[14%] size-[46rem]",
          )}
        />
        <span
          className={cn(
            "absolute rounded-full border-[3.5rem] border-[#f4f2fd]",
            "-top-[30%] -right-[6%] size-[38rem]",
          )}
        />
        <span
          className={cn(
            "absolute rounded-full border-[4rem] border-[#f0eefc]",
            "-bottom-[34%] -left-[16%] size-[34rem]",
          )}
        />
      </div>

      <Container width="hero">
        {/* ============================ Copy ============================ */}
        <motion.p
          {...rise(0)}
          className={cn(
            "font-mono text-[0.75rem] font-medium tracking-[0.16em] uppercase",
            "text-[#8500ff]",
          )}
        >
          {journey.eyebrow}
        </motion.p>

        <motion.h2
          {...rise(0.06)}
          className={cn(
            "mt-5 max-w-[38rem] font-display font-bold tracking-[-0.035em]",
            "leading-[1.05] text-balance",
            // Measured from the design at ~60px on a 1440 frame.
            "text-[2rem] sm:text-[2.5rem] xl:text-[3.5rem]",
          )}
        >
          {journey.headline}
        </motion.h2>

        <motion.p
          {...rise(0.12)}
          className={cn(
            "mt-6 max-w-[38rem] leading-relaxed text-pretty",
            "text-[1rem] text-[#42486a] sm:text-[1.0625rem]",
          )}
        >
          {journey.description}
        </motion.p>

        {/* =========================== Steps ============================ */}
        <Uncopyable
          className={cn(
            "mt-12 grid gap-6",
            // Five across from `xl`; two up, then one, on the way down. The
            // cards carry dense interface, so they need real width to stay
            // legible rather than being squeezed into five narrow columns.
            "sm:grid-cols-2 xl:grid-cols-5 xl:gap-4",
          )}
        >
          {journey.steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={reduce ? "shown" : "hidden"}
              whileInView="shown"
              viewport={{ once: true, amount: 0.15, margin: "0px 0px 15% 0px" }}
              variants={{
                hidden: { opacity: 0, y: 26 },
                shown: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.62,
                    // Left to right, so the eye is walked along the journey
                    // rather than shown five cards at once.
                    delay: 0.08 * index,
                    ease: easeOut,
                  },
                },
              }}
              className={cn(
                "group relative flex flex-col",
                "duration-normal transition-[translate] ease-out",
                "will-change-[translate] hover:-translate-y-1.5",
              )}
            >
              {/* ------------------- Numbered header ------------------ */}
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "grid size-11 shrink-0 place-items-center rounded-full",
                    "bg-[#f2ecff] text-[0.9375rem] font-bold text-[#7b3fe4]",
                    "duration-normal transition-colors ease-out",
                    "group-hover:bg-[#7b3fe4] group-hover:text-white",
                  )}
                >
                  {step.number}
                </span>
                {/*
                  The note is held clear of the gutter on the right, where the
                  hop arrow sits. Without the inset the arrow landed on top of
                  "Understand current proficiency" and "Build knowledge. Put it
                  to work." — the two longest notes in the row.
                */}
                <div className="min-w-0 xl:pr-6">
                  <p className="text-[1rem] leading-tight font-bold text-[#111536]">
                    {step.title}
                  </p>
                  <p className="mt-0.5 text-[0.8125rem] leading-snug text-[#5b6288]">
                    {step.note}
                  </p>
                </div>
              </div>

              {/*
                The small hop to the next step. Only between columns, and only
                while the row is actually five across — stacked, the arrow would
                point at a card sitting below rather than beside.
              */}
              {index < journey.steps.length - 1 ? (
                <StepHop reduce={Boolean(reduce)} delay={0.5 + index * 0.08} />
              ) : null}

              <div className="mt-5 flex-1">
                <JourneyCard card={step.card} />
              </div>
            </motion.div>
          ))}
        </Uncopyable>

        {/* ======================== Return arrow ======================== */}
        <ReturnArrow reduce={Boolean(reduce)} note={journey.loopNote} />

        {/* ========================= Attribution ======================== */}
        <motion.div
          {...rise(0.1)}
          className={cn(
            "mt-10 rounded-2xl bg-[#efe8fe] px-6 py-5",
            "flex flex-wrap items-center justify-center gap-x-8 gap-y-3",
          )}
        >
          {/* The two-tone mark the design sets before the first claim. */}
          <span aria-hidden="true" className="flex items-center -space-x-2">
            <span className="size-5 rounded-full bg-[#7b3fe4]" />
            <span className="size-5 rounded-full bg-[#c7b3f7]" />
          </span>

          {journey.attribution.map((claim, index) => (
            <p
              key={claim.engine}
              className={cn(
                "text-[0.9375rem] text-[#42486a]",
                // The design rules between the two claims, not around them.
                index > 0 && "sm:border-l sm:border-[#0b0a14]/12 sm:pl-8",
              )}
            >
              <span className="font-bold text-[#111536]">{claim.engine}</span>{" "}
              {claim.rest}
            </p>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

/* ========================================================================== */
/* STEP HOP                                                                   */
/* ========================================================================== */

/**
 * The short dashed arrow between two step headers.
 *
 * Sits in the gutter to the right of its own column, vertically centred on the
 * header row. Hidden below `xl`, where the steps stack and there is no gutter
 * for it to occupy.
 */
function StepHop({ reduce, delay }: { reduce: boolean; delay: number }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute hidden xl:block",
        // Centred on the 44px header badge, sitting IN the column gap rather
        // than straddling the card's edge.
        "top-[1.125rem] -right-4 w-7",
      )}
    >
      <svg viewBox="0 0 28 16" className="w-full overflow-visible">
        <motion.path
          d="M1 11C6 11 8 3 15 3h8"
          fill="none"
          stroke="#b6a4e8"
          strokeWidth={1.4}
          strokeLinecap="round"
          strokeDasharray="3 3"
          initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay, ease: easeOut }}
        />
        <motion.path
          d="m19.5 0 3.5 3-3.5 3"
          fill="none"
          stroke="#b6a4e8"
          strokeWidth={1.4}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduce ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.28, delay: delay + 0.4 }}
        />
      </svg>
    </span>
  );
}

/* ========================================================================== */
/* RETURN ARROW                                                               */
/* ========================================================================== */

/**
 * The long dashed curve running back from step five to step one, with the
 * handwritten note sitting on it.
 *
 * THE ASPECT RATIO IS FIXED, and the box is not stretched. Drawing this in a
 * `preserveAspectRatio="none"` box flattens the curve to a straight line at
 * wide viewports and skews the arrowhead into a wedge.
 *
 * The dash is animated by `pathLength`, so the line genuinely draws itself from
 * the right-hand end toward the arrowhead — the direction of the loop. Under
 * reduced motion it is simply present.
 */
function ReturnArrow({ reduce, note }: { reduce: boolean; note: string }) {
  return (
    <div className="relative mt-8 hidden xl:block">
      <svg
        viewBox="0 0 1200 86"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        className="w-full"
      >
        {/*
          Right to left: out of the last card, dipping through the middle of the
          band, and up into the arrowhead beneath the first.
        */}
        <motion.path
          d="M1168 6C1168 52 1010 74 600 74S64 50 40 12"
          fill="none"
          stroke="#a893e0"
          strokeWidth={2}
          strokeLinecap="round"
          strokeDasharray="7 8"
          initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.6, delay: 0.15, ease: easeOut }}
        />

        {/* The arrowhead, landing under step one. */}
        <motion.path
          d="m50 2-12 8 3 13"
          fill="none"
          stroke="#a893e0"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduce ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.3, delay: 1.6 }}
        />
      </svg>

      {/*
        The note, in the handwriting face the site uses for annotations. It sits
        on the curve rather than below the section, because it names what the
        curve is doing.
      */}
      <motion.p
        initial={reduce ? { opacity: 1 } : { opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, delay: 1.35, ease: easeOut }}
        className={cn(
          "absolute left-1/2 -translate-x-1/2",
          "top-[3.25rem] font-hand text-[1.375rem] text-[#7b3fe4]",
        )}
      >
        {note}
      </motion.p>
    </div>
  );
}
