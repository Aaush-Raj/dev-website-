"use client";

import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { Uncopyable } from "@/components/ui/Uncopyable";
import { sop } from "@/content/sop";
import { cn } from "@/lib/utils";

import {
  DiagramDocIcon,
  DiagramPlusIcon,
  sharedIcons,
  type SharedIconKey,
} from "./SopIcons";

/**
 * SOP SHARED
 * ---------------------------------------------------------------------------
 * Section 5 of the LurnySOP page: on the left one process card feeding two
 * framework cards through curved threads, on the right the statement and four
 * points.
 *
 * ALL COPY IS TRANSCRIBED FROM THE COMP. The pack ships no text file and no
 * asset folder for this section — see the note in src/content/sop.ts.
 *
 * GEOMETRY IS MEASURED FROM THE COMP (section5.png, 1358x762):
 *   process card    x= 41-310  y=239-526   (269x287)
 *   ISO 27001 card  x=405-629  y=175-349   (224x174)
 *   SOC 2 card      x=405-629  y=421-596   (224x175)
 *   purple thread   (306,348) -> (406,251)
 *   mint thread     (306,426) -> (406,502)
 * Expressed below against one aspect-locked box — the cards' own bounding
 * box, 588x421 — so the arrangement holds at any width. See the note on the
 * wrapper for why that is the cards' span rather than the comp's left half.
 *
 * The diagram is decoration, so it is Uncopyable and aria-hidden; the section's
 * real content is the copy and the four points beside it.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { shared } = sop;

/**
 * The coordinate space for the diagram: the cards' own bounding box in the
 * comp (x 41-629, y 175-596), not the full left half. See the note on the
 * diagram's wrapper for why the comp's outer margin is cropped away.
 *
 * Every coordinate below is therefore the comp's own, less 41 in x and 175
 * in y.
 */
const BOX = { w: 588, h: 421 } as const;

const pct = (n: number, total: number) => `${(n / total) * 100}%`;

function box(p: { left: number; top: number; width: number; height: number }) {
  return {
    left: pct(p.left, BOX.w),
    top: pct(p.top, BOX.h),
    width: pct(p.width, BOX.w),
    height: pct(p.height, BOX.h),
  };
}

/** Card boxes, measured from the comp and shifted onto BOX. */
const placement = {
  /* comp x=41-310  y=239-526 */
  process: { left: 0, top: 64, width: 269, height: 287 },
  /* comp x=405-629 y=175-349 */
  iso27001: { left: 364, top: 0, width: 224, height: 174 },
  /* comp x=405-629 y=421-596 */
  soc2: { left: 364, top: 246, width: 224, height: 175 },
} as const;

/** Per-framework colour, sampled from the comp. */
const frameworkTones = {
  iso27001: { header: "#f4edff", lower: "#fbeee3", thread: "#b07cfe" },
  soc2: { header: "#e7f5f8", lower: "#fbeee1", thread: "#41e7da" },
} as const;

export function SopShared() {
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

  /* Both states always declared — empty variants would strand elements at
     opacity 0 under reduced motion. */
  const shownNow = { opacity: 1, y: 0, x: 0, transition: { duration: 0 } };

  const list = reduce
    ? { hidden: {}, shown: {} }
    : {
        hidden: {},
        shown: { transition: { delayChildren: 0.28, staggerChildren: 0.1 } },
      };

  const point = reduce
    ? { hidden: shownNow, shown: shownNow }
    : {
        hidden: { opacity: 0, y: 16 },
        shown: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: easeOut },
        },
      };

  /* One shared trigger for the diagram, so the cards and their threads play
     in order rather than racing each other. */
  const diagram = reduce
    ? { hidden: {}, shown: {} }
    : {
        hidden: {},
        shown: { transition: { delayChildren: 0.12, staggerChildren: 0.18 } },
      };

  const card = reduce
    ? { hidden: shownNow, shown: shownNow }
    : {
        hidden: { opacity: 0, x: -18 },
        shown: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.55, ease: easeOut },
        },
      };

  const thread = reduce
    ? {
        hidden: { pathLength: 1, opacity: 1 },
        shown: { pathLength: 1, opacity: 1 },
      }
    : {
        hidden: { pathLength: 0, opacity: 0 },
        shown: {
          pathLength: 1,
          opacity: 1,
          transition: { duration: 0.6, ease: easeOut },
        },
      };

  const dot = reduce
    ? { hidden: { scale: 1, opacity: 1 }, shown: { scale: 1, opacity: 1 } }
    : {
        hidden: { scale: 0, opacity: 0 },
        shown: {
          scale: 1,
          opacity: 1,
          transition: { duration: 0.3, ease: easeOut },
        },
      };

  return (
    <section
      className={cn(
        // The comp's ground: near-black slate warming to purple on the right.
        "relative isolate overflow-hidden text-white",
        "bg-[#1d1e2f]",
        "py-16 sm:py-20 lg:py-24",
      )}
    >
      {/*
        The comp's purple cast on the right. A CSS gradient rather than an
        image: it is a single soft wash, which a radial-gradient reproduces
        exactly and at no download cost. (The pack's gradient asset belongs to
        the FORM section, not this one.)
      */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 -z-10",
          "bg-[radial-gradient(120%_90%_at_100%_50%,#2e2150_0%,rgba(46,33,80,0.45)_38%,transparent_70%)]",
        )}
      />

      <Container width="hero" className="relative">
        <div
          className={cn(
            "grid grid-cols-1 items-center gap-12",
            // Measured: the diagram takes the comp's left half, the copy the
            // right.
            "lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1fr)] lg:gap-12",
            "xl:gap-16",
          )}
        >
          {/* ========================= The diagram ===================== */}
          {/* Second in source order so the copy leads when the two stack
              below lg; restored to the comp's arrangement above it. */}
          <div className="order-2 lg:order-first">
            <Uncopyable>
              <motion.div
                initial={reduce ? "shown" : "hidden"}
                whileInView="shown"
                viewport={{ once: true, amount: 0.25 }}
                variants={diagram}
                /*
                  The box is the CARDS' OWN bounding box, not the comp's full
                  left half. In the comp the cards span x=41-629 y=175-596
                  inside a 679x762 field, so a tenth of the width and a fifth
                  of the height either side is empty margin. Carrying that
                  margin shrank the cards on a phone until their labels were
                  barely legible, with a dead band beneath them.

                  Cropping to 588x421 and re-expressing every placement
                  against that (below) keeps the comp's arrangement exactly
                  while letting the cards fill whatever column they are given.
                  A little vertical padding replaces the margin the shadows
                  and thread dots need.
                */
                className="relative aspect-[588/421] w-full py-[2%]"
              >
                {/* ------------------- The threads ------------------- */}
                <svg
                  viewBox={`0 0 ${BOX.w} ${BOX.h}`}
                  fill="none"
                  aria-hidden="true"
                  className="absolute inset-0 size-full"
                >
                  {/* Process -> ISO 27001. Measured (306,348) to (406,251). */}
                  <motion.path
                    variants={thread}
                    d="M265 173 C 303 173, 311 87, 365 76"
                    stroke={frameworkTones.iso27001.thread}
                    strokeWidth={3}
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                  />
                  {/* Process -> SOC 2. Measured (306,426) to (406,502). */}
                  <motion.path
                    variants={thread}
                    d="M265 251 C 303 251, 311 319, 365 327"
                    stroke={frameworkTones.soc2.thread}
                    strokeWidth={3}
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                  />
                  {(
                    [
                      [265, 173, frameworkTones.iso27001.thread],
                      [365, 76, frameworkTones.iso27001.thread],
                      [265, 251, frameworkTones.soc2.thread],
                      [365, 327, frameworkTones.soc2.thread],
                    ] as const
                  ).map(([cx, cy, fill]) => (
                    <motion.circle
                      key={`${cx}-${cy}`}
                      variants={dot}
                      cx={cx}
                      cy={cy}
                      r={7}
                      fill={fill}
                      style={{ transformOrigin: `${cx}px ${cy}px` }}
                    />
                  ))}
                </svg>

                {/* ------------------ The process card --------------- */}
                <motion.div
                  variants={card}
                  style={box(placement.process)}
                  className={cn(
                    "absolute flex flex-col overflow-hidden rounded-2xl",
                    "bg-[#f5f5ff] @container",
                    "shadow-[0_24px_50px_-24px_rgb(0_0_0/0.6)]",
                  )}
                >
                  {/* Comp: the title occupies the card's top 21%. */}
                  <p
                    className={cn(
                      "flex h-[21%] items-center px-[8cqw]",
                      "font-display text-[7.4cqw] font-bold tracking-[-0.015em]",
                      "text-[#150d31]",
                    )}
                  >
                    {shared.diagram.process.title}
                  </p>

                  <div className="flex flex-1 flex-col px-[8cqw] pb-[6cqw]">
                    {shared.diagram.process.rows.map((row) => (
                      <div
                        key={row}
                        className={cn(
                          "flex flex-1 items-center gap-[5cqw]",
                          "border-t border-[#e2e0ef]",
                        )}
                      >
                        <DiagramDocIcon className="size-[8.5cqw] shrink-0 text-[#4a3f7a]" />
                        <span className="truncate text-[5.6cqw] text-[#3a3459]">
                          {row}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* ---------------- The framework cards -------------- */}
                {shared.diagram.frameworks.map((framework) => {
                  const tone =
                    frameworkTones[
                      framework.id as keyof typeof frameworkTones
                    ];
                  const place =
                    placement[framework.id as keyof typeof placement];

                  return (
                    <motion.div
                      key={framework.id}
                      variants={card}
                      style={box(place)}
                      className={cn(
                        "absolute flex flex-col overflow-hidden rounded-2xl",
                        "@container",
                        "shadow-[0_24px_50px_-24px_rgb(0_0_0/0.6)]",
                      )}
                    >
                      {/* Comp: the header band runs to 66% of the card. */}
                      <div
                        style={{ backgroundColor: tone.header }}
                        className="flex h-[66%] flex-col justify-center gap-[4cqw] px-[8cqw]"
                      >
                        <p className="font-display text-[8.5cqw] font-bold tracking-[-0.015em] text-[#140a32]">
                          {framework.name}
                        </p>
                        <div className="flex items-center gap-[5cqw]">
                          <DiagramDocIcon className="size-[9cqw] shrink-0 text-[#5b4692]" />
                          <span className="truncate text-[6cqw] text-[#3a3459]">
                            {shared.diagram.sharedLabel}
                          </span>
                        </div>
                      </div>

                      <div
                        style={{ backgroundColor: tone.lower }}
                        className="flex flex-1 items-center gap-[5cqw] px-[8cqw]"
                      >
                        <DiagramPlusIcon className="size-[9cqw] shrink-0 text-[#482597]" />
                        <span className="truncate text-[6cqw] text-[#3a3459]">
                          {shared.diagram.additionalLabel}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </Uncopyable>
          </div>

          {/* ========================== Statement ====================== */}
          <div className="order-1 lg:order-last">
            <motion.p
              {...rise(0)}
              className={cn(
                "text-[0.75rem] font-semibold tracking-[0.2em] uppercase",
                "text-[#b59bdb] sm:text-[0.8125rem]",
              )}
            >
              {shared.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.08)}
              className={cn(
                "mt-5 font-display font-bold tracking-[-0.035em]",
                /*
                  The comp sets this as TWO lines, the second running
                  "Simpler audits across frameworks." full width. The design's
                  face is more condensed than the one rendering here, so at the
                  same size that line wraps to three. Sizing down a little at
                  xl keeps the comp's two-line shape rather than letting the
                  browser choose a third break — the same trade already made in
                  section 2's headline.
                */
                "leading-[1.08]",
                "text-[1.75rem] sm:text-[2.125rem] xl:text-[2.375rem]",
              )}
            >
              {shared.headline.map((line, index) => (
                <span
                  key={line.text}
                  className={cn(
                    "block",
                    line.accent ? "text-[#c9a8fd]" : "text-white",
                  )}
                >
                  {line.text}
                  {index < shared.headline.length - 1 && " "}
                </span>
              ))}
            </motion.h2>

            <motion.p
              {...rise(0.16)}
              className={cn(
                "mt-5 max-w-[36rem] leading-relaxed text-pretty",
                "text-[1rem] text-[#d4d5da]",
              )}
            >
              {shared.description}
            </motion.p>

            {/* -------------------- The four points ------------------ */}
            <motion.ul
              initial={reduce ? "shown" : "hidden"}
              whileInView="shown"
              viewport={{ once: true, amount: 0.2 }}
              variants={list}
              className="mt-8 space-y-5"
            >
              {shared.points.map((item) => {
                const Glyph = sharedIcons[item.id as SharedIconKey];
                return (
                  <motion.li
                    key={item.id}
                    variants={point}
                    className="group/point flex items-start gap-4"
                  >
                    <span
                      className={cn(
                        "mt-0.5 shrink-0 text-[#c29ef7]",
                        "transition-transform duration-300 ease-out",
                        "group-hover/point:scale-110",
                        "motion-reduce:transition-none motion-reduce:group-hover/point:scale-100",
                      )}
                    >
                      <Glyph className="size-7 sm:size-8" />
                    </span>

                    <div className="min-w-0">
                      <h3 className="font-display text-[1rem] font-bold tracking-[-0.015em] text-[#f6f6f8] sm:text-[1.0625rem]">
                        {item.title}
                      </h3>
                      <p className="mt-0.5 max-w-[32rem] text-[0.9375rem] leading-relaxed text-pretty text-[#b9bbcc]">
                        {item.body}
                      </p>
                    </div>
                  </motion.li>
                );
              })}
            </motion.ul>

            <motion.p
              {...rise(0.32)}
              className="mt-8 text-[0.9375rem] text-[#b3a1dd]"
            >
              {shared.footnote}
            </motion.p>
          </div>
        </div>
      </Container>
    </section>
  );
}
