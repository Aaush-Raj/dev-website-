"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { sop } from "@/content/sop";
import { cn } from "@/lib/utils";

import { challengeIcons, type ChallengeIconKey } from "./SopIcons";

/**
 * SOP PROBLEM
 * ---------------------------------------------------------------------------
 * Section 2 of the LurnySOP page: the statement on the left, four challenge
 * cards in a 2x2 grid on the right.
 *
 * GEOMETRY IS MEASURED FROM THE COMP. In section2.png the card grid columns
 * run x=485-806 and x=825-1151, the rows y=57-317 and y=339-599 — so the cards
 * are 321x260 with a 19px column gutter and a 22px row gutter. That is where
 * the grid's near-square cards and its gap come from.
 *
 * COLOURS ARE MEASURED TOO. Each card carries a vertical gradient in the
 * design, not a flat fill: card 01 runs #f6f0ff to #f1e7ff, and the others
 * likewise. They are reproduced as real gradients rather than averaged to one
 * colour, because at this card size the falloff is visible.
 *
 * THIS SECTION IS REAL CONTENT, NOT DECORATION. Unlike the hero's panel it is
 * not wrapped in `Uncopyable` and not hidden: these four challenges are the
 * argument the page is making, so they belong in the accessibility tree and in
 * anything a reader copies. The cards are a `ul` for that reason.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { problem } = sop;

/**
 * Per-card colour, sampled from section2.png: the gradient's two stops, the
 * hairline ring, the number chip and the shared accent the chip's digits and
 * the icon both take.
 */
const tones: Record<
  ChallengeIconKey,
  { from: string; to: string; ring: string; chip: string; accent: string }
> = {
  translate: {
    from: "#f6f0ff",
    to: "#f1e7ff",
    ring: "#e6dbfd",
    chip: "#e6d3ff",
    accent: "#6300cc",
  },
  responsibilities: {
    from: "#eef5fd",
    to: "#e2efff",
    ring: "#d8e5ff",
    chip: "#c8dcff",
    accent: "#433ee7",
  },
  evidence: {
    from: "#fdf5f1",
    to: "#fef3eb",
    ring: "#fbebe0",
    chip: "#fbe3ce",
    accent: "#ef7331",
  },
  readiness: {
    from: "#edfbef",
    to: "#e5fde8",
    ring: "#dbf5e1",
    chip: "#c9f6d4",
    accent: "#02944f",
  },
};

export function SopProblem() {
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

  /*
   * ONE SHARED TRIGGER FOR THE GRID, not one per card.
   *
   * With a `whileInView` on each card, whichever crosses the threshold first
   * starts the sequence — so on a tall viewport the bottom row can animate
   * before the top. The list owns the trigger and the cards inherit it, which
   * keeps 01-04 in order.
   */
  const grid = reduce
    ? { hidden: {}, shown: {} }
    : {
        hidden: {},
        shown: { transition: { delayChildren: 0.12, staggerChildren: 0.11 } },
      };

  /* Both states are always declared — see the note in SopReadinessPanel about
     empty variants leaving elements stuck at opacity 0. */
  const shownNow = { opacity: 1, y: 0, transition: { duration: 0 } };

  const card = reduce
    ? { hidden: shownNow, shown: shownNow }
    : {
        hidden: { opacity: 0, y: 20 },
        shown: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: easeOut },
        },
      };

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-[#fdfdfd]",
        "py-16 sm:py-20 lg:py-24",
      )}
    >
      {/* The pack's gradient. Decorative, so it carries an empty alt and is
          hidden; `-z-10` keeps it behind without anything else managing
          stacking. It is below the fold, so it loads lazily by default. */}
      <Image
        src="/assets/images/sop/problem-backdrop.webp"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="-z-10 object-cover"
      />

      <Container width="hero" className="relative">
        <div
          className={cn(
            "grid grid-cols-1 items-center gap-12",
            /*
              Measured from the comp: the statement's column runs x=48-445 and
              the card grid x=485-1151 on a 1196 frame — so the text takes
              roughly 0.6 of the grid's width. Given here as a slightly wider
              ratio because the comp's headline keeps "You know the" on one
              line, which a narrower column breaks after "You know".
            */
            "lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1fr)] lg:gap-10",
            "xl:gap-14",
          )}
        >
          {/* =========================== Statement ===================== */}
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "text-[0.75rem] font-semibold tracking-[0.18em] uppercase",
                "text-[#7914ed] sm:text-[0.8125rem]",
              )}
            >
              {problem.eyebrow}
            </motion.p>

            {/*
              Two colours, one heading. The purple half is a `span` inside the
              same h2 rather than a second heading — it is one sentence pair in
              the design, and two headings would put a phantom level in the
              document outline.
            */}
            <motion.h2
              {...rise(0.08)}
              className={cn(
                "mt-5 font-display font-bold tracking-[-0.035em]",
                /*
                  NO `text-balance` HERE. It evens the line lengths, which on
                  this heading breaks "You know / the frameworks." where the
                  comp sets "You know the / frameworks." The column is wide
                  enough for the comp's break — balancing was what moved it.
                */
                "leading-[1.08]",
                "text-[2rem] sm:text-[2.5rem] xl:text-[3rem]",
              )}
            >
              {/*
                Each line is its own block, and each carries a trailing space
                so the accessible name and any copied text read as sentences
                rather than running the words together across the breaks.
              */}
              <span className="text-[#110738]">
                {problem.headline.lead.map((line, index) => (
                  <span key={line} className="block">
                    {line}
                    {index < problem.headline.lead.length - 1 && " "}
                  </span>
                ))}
              </span>
              <span className="text-[#5700b2]">
                {problem.headline.accent.map((line, index) => (
                  <span key={line} className="block">
                    {line}
                    {index < problem.headline.accent.length - 1 && " "}
                  </span>
                ))}
              </span>
            </motion.h2>

            <motion.p
              {...rise(0.16)}
              className={cn(
                "mt-6 max-w-[27rem] leading-relaxed text-pretty",
                "text-[1rem] text-[#3f3b62] sm:text-[1.0625rem]",
              )}
            >
              {problem.description}
            </motion.p>
          </div>

          {/* ========================= Challenge grid =================== */}
          <motion.ul
            initial={reduce ? "shown" : "hidden"}
            whileInView="shown"
            viewport={{ once: true, amount: 0.2 }}
            variants={grid}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5"
          >
            {problem.challenges.map((challenge) => {
              const tone = tones[challenge.id as ChallengeIconKey];
              const Glyph = challengeIcons[challenge.id as ChallengeIconKey];

              return (
                <motion.li
                  key={challenge.id}
                  variants={card}
                  style={{
                    backgroundImage: `linear-gradient(to bottom, ${tone.from}, ${tone.to})`,
                    borderColor: tone.ring,
                  }}
                  className={cn(
                    "group/card relative overflow-hidden rounded-2xl border",
                    "p-5 sm:p-6",
                    // A quiet lift, matching the tiles in section 1.
                    "transition-[translate,box-shadow] duration-300 ease-out",
                    "hover:-translate-y-1 hover:shadow-[0_18px_36px_-20px_rgb(40_20_90/0.4)]",
                    "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
                  )}
                >
                  {/* Chip and glyph share the card's top line. */}
                  <div className="flex items-start justify-between gap-4">
                    <span
                      style={{ backgroundColor: tone.chip, color: tone.accent }}
                      className={cn(
                        "inline-flex items-center justify-center rounded-xl",
                        // Comp: a 58x50 chip, so near-square rather than a
                        // tight pill around the digits.
                        "min-w-12 px-3 py-2 font-display text-[1.0625rem]",
                        "font-bold tabular-nums sm:min-w-14 sm:text-[1.25rem]",
                      )}
                    >
                      {challenge.number}
                    </span>

                    <span
                      style={{ color: tone.accent }}
                      className={cn(
                        "shrink-0",
                        "transition-transform duration-300 ease-out",
                        "group-hover/card:scale-110",
                        "motion-reduce:transition-none motion-reduce:group-hover/card:scale-100",
                      )}
                    >
                      {/* Measured: in the comp the glyph stands ~55px on a
                          260px card, a little over a fifth of its height. An
                          earlier pass had it at 36px, visibly slighter than
                          the design. */}
                      <Glyph className="size-10 sm:size-12" />
                    </span>
                  </div>

                  <h3
                    className={cn(
                      "mt-4 font-display font-bold tracking-[-0.02em]",
                      "leading-[1.22] text-[#130739] text-balance",
                      "text-[1.0625rem] sm:text-[1.1875rem]",
                    )}
                  >
                    {challenge.title}
                  </h3>

                  <p
                    className={cn(
                      "mt-2.5 leading-relaxed text-pretty text-[#443f6a]",
                      "text-[0.875rem] sm:text-[0.9375rem]",
                    )}
                  >
                    {challenge.body}
                  </p>
                </motion.li>
              );
            })}
          </motion.ul>
        </div>
      </Container>
    </section>
  );
}
