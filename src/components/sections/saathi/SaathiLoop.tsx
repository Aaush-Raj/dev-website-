"use client";

import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { saathi } from "@/content/saathi";
import { cn } from "@/lib/utils";

import { loopIcons } from "./SaathiIcons";
import { SaathiLoopPhone } from "./SaathiLoopPhone";

/**
 * SAATHI LOOP
 * ---------------------------------------------------------------------------
 * Section 4 of the LurnySaathi page: the statement on the left, the app in the
 * middle, and the five ecosystem stages on the right — Pulse, KxP, Sim, Pitch,
 * then Pulse + KxP again — with a coral arrow running down them and looping
 * back to the top.
 *
 * THE LOOP IS THE POINT
 * The return path is what makes this a loop rather than a list, so it is drawn
 * rather than implied: an SVG rail down the left of the cards, out under the
 * last one, back up the outside and into an arrowhead at the first. It draws
 * itself on entrance — the one place in this page where a `pathLength` sweep
 * is right, because here the line's travel IS the content.
 *
 * (The hero's threads deliberately do NOT animate that way; see the note in
 * SaathiCapabilities about the dash artefact on very thin strokes. This rail
 * is thicker and reads cleanly.)
 *
 * LAYOUT
 * Three columns on xl. On lg the phone and the stages share a row under the
 * statement, since the stages need their full height beside the phone. Below
 * that everything stacks and the connector rail is dropped — at one column the
 * cards are already in reading order and a rail beside them adds nothing.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { loop } = saathi;

/**
 * THE TIMELINE
 * ---------------------------------------------------------------------------
 * The stage column plays as a sequence rather than an entrance: card 01 lands,
 * its arrow draws down into 02, 02 lands, and so on — then the return rail
 * sweeps back to the top and the arrowhead lands last.
 *
 * All of it is derived from these three numbers so the rhythm stays even and
 * one edit re-times the whole thing. `STEP` is the beat between stages; the
 * arrow starts partway through its card's own settle, which is what makes the
 * hand-off read as continuous rather than as two separate events.
 */
const START = 0.25; // before the first card moves
const STEP = 0.55; // between one stage landing and the next
const ARROW_OFFSET = 0.3; // into a card's beat before its arrow draws

/** When stage `i`'s card begins. */
const cardAt = (i: number) => START + i * STEP;

/** When the arrow leaving stage `i` begins. */
const arrowAt = (i: number) => cardAt(i) + ARROW_OFFSET;

/** When the return rail begins — after the last card has settled. */
const RAIL_AT = cardAt(loop.stages.length - 1) + 0.45;

/** The rail's own sweep, used to time the arrowhead onto its end. */
const RAIL_DURATION = 1.5;

export function SaathiLoop() {
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
        "relative isolate overflow-hidden py-section-lg",
        // Sampled from the design.
        "bg-[#0d0f14] text-white",
      )}
    >
      {/* A faint warm glow behind the stage column, so the near-black ground
          is not perfectly flat behind the coral rail. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: [
            "radial-gradient(42rem 34rem at 78% 42%, rgb(247 102 85 / 0.07), transparent 66%)",
            "radial-gradient(36rem 30rem at 46% 55%, rgb(127 138 196 / 0.08), transparent 68%)",
          ].join(","),
        }}
      />

      <Container width="wide">
        <div
          className={cn(
            "grid gap-14",
            // On lg the phone and stages sit side by side under the statement;
            // on xl all three columns share one row, as the design shows.
            "lg:grid-cols-2 lg:gap-12",
            "xl:grid-cols-[minmax(0,1fr)_minmax(0,0.68fr)_minmax(0,0.92fr)] xl:items-center xl:gap-14",
          )}
        >
          {/* =========================== Statement ===================== */}
          <div className="lg:col-span-2 xl:col-span-1">
            <motion.p
              {...rise(0)}
              className={cn(
                "text-[0.6875rem] font-bold uppercase",
                "tracking-[0.16em] text-[#f76655] sm:text-xs",
              )}
            >
              {loop.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.08)}
              className={cn(
                "mt-7 font-display font-bold tracking-[-0.03em]",
                "leading-[1.14] text-white",
                // Measured from the design at ~44px on a 1440 frame.
                "text-[1.875rem] sm:text-[2.25rem] xl:text-[2.5rem]",
              )}
            >
              {loop.headline.map((line) => (
                <span key={line} className="inline lg:block">
                  {line}{" "}
                </span>
              ))}
            </motion.h2>

            <motion.p
              {...rise(0.16)}
              className={cn(
                "mt-7 max-w-116 leading-relaxed text-pretty",
                "text-[1.0625rem] text-neutral-400 sm:text-lg",
              )}
            >
              {loop.description}
            </motion.p>

            <motion.div
              {...rise(0.24)}
              className="mt-10 space-y-1.5 text-[1.0625rem] sm:text-lg"
            >
              <p className="text-neutral-200">{loop.closing.first}</p>
              <p className="text-neutral-200">
                {loop.closing.lead}{" "}
                <span className="text-[#f76655]">{loop.closing.emphasis}</span>
              </p>
            </motion.div>
          </div>

          {/* ============================ Phone ======================== */}
          <motion.div
            initial={reduce ? "shown" : "hidden"}
            whileInView="shown"
            viewport={{ once: true, amount: "some" }}
            variants={{
              hidden: { opacity: 0, y: 30, scale: 0.97 },
              shown: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 0.85, delay: 0.1, ease: easeOut },
              },
            }}
          >
            <SaathiLoopPhone />
          </motion.div>

          {/* =========================== Stages ======================== */}
          {/*
            The left padding is the channel the return rail runs in. Without
            it the rail's SVG shares the cards' box and its outward leg draws
            over them instead of around them.
          */}
          <div className="relative lg:pb-8 lg:pl-9">
            {/*
              The connector rail — the last beat of the sequence: once every
              stage has landed, the loop closes by travelling back to the top.

              It DRAWS ON rather than fading, which is the whole point of the
              section: the line's travel is the argument.

              BUILT FROM FOUR PLAIN DIVS, NOT AN SVG PATH.
              A `pathLength` sweep needs an unstretched coordinate space —
              Motion implements it with strokeDasharray, whose lengths are
              computed before any `preserveAspectRatio="none"` scaling, so a
              path in a stretched box renders as broken segments. And the box
              here genuinely is a different aspect at every breakpoint (0.73 at
              1440, 0.64 at 1280, 0.82 at 1100), so no fixed viewBox works.

              Four positioned divs sidestep all of it: each leg scales from its
              own origin, the corners stay square at any aspect, and the legs
              run in sequence so the travel still reads as one continuous
              movement. The percentages are the same measured anchors the cards
              use — 18.3% for the icon column, 4% for the return channel, 9%
              for the first icon's row.

              lg-only: below that the cards are a single stacked column and the
              rail would run through open space beside them.
            */}
            {(() => {
              // The four legs, in travel order, each with the share of the
              // total sweep its length deserves so the line moves at a
              // constant speed rather than hurrying the short corners.
              const legs = [
                {
                  key: "down",
                  // Out of the bottom of the last card.
                  className: "bottom-0 left-[18.3%] w-px",
                  style: { height: "5.3%" },
                  origin: "top" as const,
                  share: 0.08,
                },
                {
                  key: "across-bottom",
                  className: "bottom-0 left-[4%] h-px",
                  style: { width: "14.3%" },
                  origin: "right" as const,
                  share: 0.12,
                },
                {
                  key: "up",
                  className: "bottom-0 left-[4%] w-px",
                  style: { height: "91%" },
                  origin: "bottom" as const,
                  share: 0.62,
                },
                {
                  key: "across-top",
                  className: "top-[9%] left-[4%] h-px",
                  style: { width: "2.5%" },
                  origin: "left" as const,
                  share: 0.18,
                },
              ];

              let elapsed = 0;

              return legs.map((leg) => {
                const delay = RAIL_AT + elapsed * RAIL_DURATION;
                const duration = leg.share * RAIL_DURATION;
                elapsed += leg.share;

                const axis = leg.origin === "top" || leg.origin === "bottom";

                return (
                  <motion.span
                    key={leg.key}
                    aria-hidden="true"
                    className={cn(
                      "absolute hidden bg-[#f76655] lg:block",
                      leg.className,
                    )}
                    style={{ ...leg.style, transformOrigin: leg.origin }}
                    initial={
                      reduce
                        ? { scaleX: 1, scaleY: 1 }
                        : axis
                          ? { scaleY: 0 }
                          : { scaleX: 0 }
                    }
                    whileInView={axis ? { scaleY: 1 } : { scaleX: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration, delay, ease: "linear" }}
                  />
                );
              });
            })()}

            {/*
              The arrowhead where the rail re-enters the first card. It is its
              own element rather than a `marker` on the path above, because a
              marker inherits that SVG's `preserveAspectRatio="none"` scaling
              and renders as a squashed sliver. Positioned in CSS against the
              same 9%/8.1% anchors the path uses.
            */}
            <motion.span
              aria-hidden="true"
              // Lands as the rail's final leg arrives, closing the loop.
              initial={
                reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.4 }
              }
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.35,
                delay: RAIL_AT + RAIL_DURATION * 0.94,
                ease: easeOut,
              }}
              className="absolute top-[9%] left-[6%] hidden -translate-y-1/2 lg:block"
            >
              <svg viewBox="0 0 10 10" className="size-2.5" aria-hidden="true">
                <path d="M 0 0.6 L 8.4 5 L 0 9.4 z" fill="#f76655" />
              </svg>
            </motion.span>

            <ol className="relative space-y-3.5">
              {loop.stages.map((stage, index) => {
                const Icon = loopIcons[stage.icon];

                return (
                  <motion.li
                    key={stage.title}
                    initial={reduce ? "shown" : "hidden"}
                    whileInView="shown"
                    // `amount: 0.1` and a single viewport trigger on the list
                    // would be better still, but each item needs its own so
                    // the sequence survives the stack being taller than the
                    // viewport on smaller screens.
                    viewport={{ once: true, amount: 0.2 }}
                    variants={{
                      // Each card settles up and in, slightly scaled, so it
                      // reads as arriving rather than sliding.
                      hidden: { opacity: 0, y: 18, scale: 0.97 },
                      shown: {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: {
                          duration: 0.6,
                          delay: cardAt(index),
                          ease: easeOut,
                        },
                      },
                    }}
                    className="relative"
                  >
                    {/* The down-arrow into the next card, drawn in the gap
                        between them. Skipped after the last, where the return
                        rail takes over. */}
                    {index < loop.stages.length - 1 && (
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute -bottom-3.5 left-14 hidden h-3.5 w-3 lg:block",
                        )}
                      >
                        {/*
                          This one CAN sweep with `pathLength`: the box is a
                          fixed 12x14 with the default preserveAspectRatio, so
                          the dash lengths match the rendered geometry. (The
                          return rail cannot — see the note above it.)

                          The stem draws down, then the head lands, so the
                          hand-off from one card to the next reads as travel.
                        */}
                        <motion.svg
                          viewBox="0 0 12 14"
                          fill="none"
                          className="size-full"
                          initial={reduce ? "shown" : "hidden"}
                          whileInView="shown"
                          viewport={{ once: true, amount: 0.2 }}
                        >
                          <motion.path
                            d="M6 0v9"
                            stroke="#f76655"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            variants={{
                              hidden: { pathLength: 0 },
                              shown: {
                                pathLength: 1,
                                transition: {
                                  duration: 0.28,
                                  delay: arrowAt(index),
                                  ease: "easeInOut",
                                },
                              },
                            }}
                          />
                          <motion.path
                            d="M2.4 8.4 6 12.6l3.6-4.2"
                            fill="none"
                            stroke="#f76655"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            variants={{
                              hidden: { opacity: 0 },
                              shown: {
                                opacity: 1,
                                transition: {
                                  duration: 0.2,
                                  delay: arrowAt(index) + 0.22,
                                },
                              },
                            }}
                          />
                        </motion.svg>
                      </span>
                    )}

                    <div
                      className={cn(
                        "flex items-center gap-4 rounded-2xl px-5 py-4",
                        "border border-white/10 bg-white/[0.035]",
                        "transition-[background-color,border-color] duration-500 ease-out",
                        "hover:border-white/20 hover:bg-white/6",
                      )}
                    >
                      <span
                        className={cn(
                          "grid size-12 shrink-0 place-items-center rounded-full",
                          "border border-white/25 text-white",
                        )}
                      >
                        <Icon className="size-6" />
                      </span>

                      <span className="min-w-0">
                        {/* The numeral is content, not decoration — it is the
                            stage's position in the loop. */}
                        <span className="block text-sm font-bold text-[#f76655] tabular-nums">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="mt-0.5 block font-semibold text-pretty text-white">
                          {stage.title}
                        </span>
                        <span className="mt-0.5 block text-[0.75rem] font-medium tracking-[0.08em] text-neutral-500 uppercase">
                          {stage.engine}
                        </span>
                      </span>
                    </div>
                  </motion.li>
                );
              })}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
