"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { Uncopyable } from "@/components/ui/Uncopyable";
import { frontline } from "@/content/frontline";
import { cn } from "@/lib/utils";

import { engineMarks, TrendUpIcon } from "./FrontlineIcons";

/**
 * FRONTLINE HERO — THE PERFORMANCE LOOP
 * ---------------------------------------------------------------------------
 * Ananya at the centre, Pulse / Saathi / Pitch around her, curved arrows
 * running clockwise between them, and handwritten annotations outside the ring.
 *
 * WHY THIS IS MARKUP AND NOT THE SUPPLIED IMAGE
 * The design ships this as one flat 1402x1122 composite over a PAINTED
 * checkerboard (no alpha channel at all). Dropping it in would put a grey
 * checkerboard in the hero and bake every card's text into a raster —
 * unselectable, unsearchable, blurry when scaled, impossible to translate.
 * So only the portrait is extracted (see the build script) and the rest is
 * rebuilt here, where it stays sharp, animates, and reflows.
 *
 * HOW IT HOLDS TOGETHER
 * Cards and arrows must stay locked to each other, so both are positioned in
 * ONE proportional coordinate space: a 100x100 box that the arrows draw into
 * via an SVG viewBox, and the cards sit on via percentage insets. Change a
 * card's position and its arrow follows, because both read the same numbers
 * from the tables below.
 *
 * The whole diagram is an aria-hidden illustration — the statement beside it
 * carries the meaning — and Uncopyable, so its imitation UI text does not
 * behave like real copy sitting next to real copy.
 *
 * BELOW LG
 * The ring cannot survive a narrow column: at phone widths the cards would
 * overlap the portrait. So the arrows are dropped and the pieces stack into a
 * plain column — portrait, then the three cards in reading order, which is the
 * same clockwise order the ring shows.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { loop } = frontline.hero;

/**
 * THE DIAGRAM BOX
 * ---------------------------------------------------------------------------
 * Everything below is expressed in ONE coordinate space so the cards and the
 * arrows cannot drift apart: a box of aspect 722x610, matching the region the
 * design gives the diagram. The SVG draws into it via a 0-100 x 0-100 viewBox
 * with `preserveAspectRatio="none"`, and the cards sit on it via percentage
 * insets — so both read the same numbers and stay locked together.
 *
 * Every number here was measured off designs/FrontlinePerformancePage/
 * section1.png: card bounds by walking outward from a card interior until the
 * shadow breaks the white, arcs by tracing the violet ink row by row.
 *
 * NOTE ON `preserveAspectRatio="none"`: the box is NOT square, so the viewBox
 * is deliberately stretched. That is why the arrow heads carry an explicit
 * `scale` — a rotated triangle would otherwise shear with the box. It is also
 * why the arcs are drawn as measured points rather than as circle segments:
 * there is no single radius that survives the stretch.
 */
const BOX = { width: 722, height: 610 } as const;

/** Per-card palette, keyed by tone. Sampled from the design. */
const TONES = {
  pulse: {
    disc: "bg-[#f8b3a6]",
    mark: "text-[#c0392b]",
    engine: "text-[#a6221d]",
  },
  saathi: {
    disc: "bg-[#b3dfda]",
    mark: "text-[#0a5f5d]",
    engine: "text-[#0a5f5d]",
  },
  pitch: {
    disc: "bg-[#fbd99f]",
    mark: "text-[#a45414]",
    engine: "text-[#a45414]",
  },
} as const;

/**
 * The three engine cards and their annotations, in ring order.
 *
 * `card` places the card; `note` places the handwritten aside; `leader` is the
 * short curve from the note down to `dot`, which is the little coloured bead
 * the design springs each note from.
 */
const SLOTS = [
  {
    // Pulse — top left of the ring.
    card: "left-[24.8%] top-[3.1%] w-[32.8%]",
    note: "left-[66%] top-[3%] w-[26%]",
    leader: "M 65.2 9.5 C 63.4 8.4 62.6 7.4 62.4 5.6",
    dot: { x: 65.6, y: 9.8 },
    ink: "#b03a2e",
  },
  {
    // Saathi — right.
    card: "left-[61.9%] top-[35.2%] w-[32.8%]",
    note: "left-[75%] top-[57%] w-[25%]",
    leader: "M 73.2 54.2 C 74.2 55.6 75 56.6 76.4 57.4",
    dot: { x: 72.9, y: 53.9 },
    ink: "#2f52c9",
  },
  {
    // Pitch — bottom.
    card: "left-[23.4%] top-[73%] w-[35.3%]",
    note: "left-[62%] top-[84%] w-[26%]",
    leader: "M 59.8 89.4 C 61.6 90 62.6 90.2 64 89.8",
    dot: { x: 59.5, y: 89.3 },
    ink: "#a45414",
  },
] as const;

/**
 * The three arcs, traced from the design. Each ends where its arrow head sits,
 * so the head and the curve cannot separate.
 *
 * `head` carries the tangent angle at that end, in degrees.
 */
const ARCS = [
  {
    // Pulse -> Saathi, down the right.
    d: "M 60.5 14.5 C 65.5 17.5 69.2 24 70.4 33.5",
    head: { x: 70.6, y: 35.4, angle: 84 },
  },
  {
    // Saathi -> Pitch, across the bottom right.
    d: "M 70.2 56 C 69.4 62 65.5 67.2 60.5 71",
    head: { x: 59.2, y: 71.8, angle: 145 },
  },
  {
    // Pitch -> Pulse, the long climb up the left. This is the arc that closes
    // the loop, which is why it is the longest of the three.
    d: "M 19.5 71 C 13.5 66 9.2 56 9.4 44 C 9.6 34 12.6 25.5 18 19.5",
    head: { x: 19.3, y: 18.4, angle: -42 },
  },
] as const;

/** The closing annotation on the left, and the bead it springs from. */
const CLOSING = {
  note: "left-[0%] top-[30%] w-[24%] text-right",
  leader: "M 12.2 44.6 C 10.4 43.6 9.4 42.6 9 41",
  dot: { x: 12.5, y: 44.9 },
  ink: "#2f52c9",
} as const;

export function FrontlineLoop({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  /** Cards fade up in ring order. */
  const card = (index: number) => ({
    initial: reduce ? "shown" : "hidden",
    animate: "shown",
    variants: {
      hidden: { opacity: 0, y: 14, scale: 0.97 },
      shown: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.55,
          delay: 0.35 + index * 0.16,
          ease: easeOut,
        },
      },
    },
  });

  return (
    <Uncopyable
      className={cn("relative w-full", className)}
      // The whole diagram is decorative: the statement carries the meaning.
      aria-hidden
    >
      {/*
        The ring, lg and up. Below that the arrows have nowhere to go, so the
        diagram becomes the plain stack further down.

        EVERY SIZE INSIDE THE RING IS IN `em`, driven by the cqw font size two
        lines down, so one declaration scales the whole diagram with its column
        — the same trick MagicExperiences uses. Without it the cards keep the
        section's 16px base while the box shrinks, so the copy wraps to three
        lines where the design has two and the cards grow until they overlap.

        The `@container` sits on the OUTER element and the `cqw` on the inner
        one. That split is required, not stylistic: an element cannot query its
        own size, so a `cqw` value alongside its own `@container` silently
        resolves against the viewport instead — which reads as "the text got
        BIGGER when I asked it to scale down".

        2.05cqw is ~14.8px across the design's own 722px-wide box, the size the
        design sets its card body text at.
      */}
      <div className="@container hidden lg:block">
        <div
          className="relative w-full"
          // The measured aspect of the design's diagram region. Holding it means
          // the percentage-placed cards land exactly where the arcs expect them.
          style={{
            aspectRatio: `${BOX.width} / ${BOX.height}`,
            fontSize: "2.05cqw",
          }}
        >
          {/* ------------------------- The arrows --------------------- */}
          <svg
            viewBox="0 0 100 100"
            fill="none"
            // Stretched to the box on purpose — see the note on BOX above.
            preserveAspectRatio="none"
            className="absolute inset-0 size-full"
          >
            {/* The faint guide ring the cards sit on, as the design draws it.
              An ellipse rather than a circle: the viewBox is stretched, so a
              circle would come out as an ellipse anyway — this way the shape
              is stated rather than accidental. */}
            <ellipse
              cx="40.4"
              cy="44.4"
              rx="38"
              ry="42"
              stroke="#cfc7ee"
              strokeWidth="0.22"
              opacity="0.5"
            />

            {ARCS.map((arc, index) => (
              <motion.g
                key={arc.d}
                initial={reduce ? { opacity: 0.9 } : { opacity: 0 }}
                animate={{ opacity: 0.9 }}
                transition={{
                  duration: 0.5,
                  delay: 0.55 + index * 0.16,
                  ease: easeOut,
                }}
              >
                <path
                  d={arc.d}
                  stroke="#7b6cf0"
                  strokeWidth="0.6"
                  strokeLinecap="round"
                />

                {/* The head is drawn as a triangle rather than a marker: a
                  marker scales with strokeWidth and would end up hairline.
                  The counter-scale undoes the viewBox stretch, so the head
                  stays a clean triangle instead of shearing. */}
                <path
                  d="M 0 0 L -2.4 -1.35 L -2.4 1.35 Z"
                  fill="#7b6cf0"
                  transform={[
                    `translate(${arc.head.x} ${arc.head.y})`,
                    `scale(1 ${BOX.width / BOX.height})`,
                    `rotate(${arc.head.angle})`,
                  ].join(" ")}
                />
              </motion.g>
            ))}

            {/* The annotation leader lines and the beads they spring from. */}
            {[...SLOTS, CLOSING].map((slot) => (
              <motion.g
                key={slot.leader}
                initial={reduce ? { opacity: 1 } : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.1, ease: easeOut }}
              >
                <path
                  d={slot.leader}
                  stroke={slot.ink}
                  strokeWidth="0.45"
                  strokeLinecap="round"
                />
                <ellipse
                  cx={slot.dot.x}
                  cy={slot.dot.y}
                  // Counter-stretched, so the bead reads as a dot not an oval.
                  rx="0.62"
                  ry={0.62 * (BOX.width / BOX.height)}
                  fill={slot.ink}
                />
              </motion.g>
            ))}
          </svg>

          {/* ------------------------ The portrait -------------------- */}
          <motion.div
            initial={
              reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 }
            }
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: easeOut }}
            className="absolute top-[26.5%] left-[25.3%] w-[30.3%]"
          >
            <Image
              src={loop.portrait.src}
              alt={loop.portrait.alt}
              width={loop.portrait.width}
              height={loop.portrait.height}
              // Above the fold: must not lazy-load.
              priority
              sizes="(min-width: 1024px) 22vw, 40vw"
              className="w-full"
            />
          </motion.div>

          {/* The name card, overlapping the foot of the portrait as the design
            has it. */}
          <motion.div
            {...card(0)}
            className={cn(
              "absolute top-[53.4%] left-[25.2%] w-[30.9%]",
              "rounded-[1.1em] bg-white px-[1.1em] py-[0.85em] text-center",
              "shadow-[0_14px_34px_-16px_rgb(30_20_70/0.32)]",
            )}
          >
            <p className="text-[1.05em] font-bold text-[#101433]">
              {loop.person.name}
            </p>
            <p className="mt-0.5 text-[0.78em] text-[#42486b]">
              {loop.person.role}
            </p>
            <p className="mt-2 flex items-center justify-center gap-1.5">
              <span className="grid size-[1.5em] shrink-0 place-items-center rounded-full bg-[#d7f2e2] text-[#147346]">
                <TrendUpIcon className="size-[1em]" />
              </span>
              <span className="text-[0.82em] font-semibold text-[#147346]">
                {loop.person.status}
              </span>
            </p>
          </motion.div>

          {/* ------------------------ Engine cards -------------------- */}
          {loop.cards.map((entry, index) => {
            const slot = SLOTS[index];
            const tone = TONES[entry.tone];
            const Mark = engineMarks[entry.tone];

            return (
              <motion.div
                key={entry.engine}
                {...card(index + 1)}
                className={cn(
                  "absolute",
                  slot.card,
                  "flex items-start gap-[0.9em] rounded-[1.1em] bg-white p-[1.05em]",
                  "shadow-[0_16px_38px_-18px_rgb(30_20_70/0.34)]",
                )}
              >
                <span
                  className={cn(
                    "grid size-[2.9em] shrink-0 place-items-center rounded-full",
                    tone.disc,
                    tone.mark,
                  )}
                >
                  <Mark className="size-[1.55em]" />
                </span>

                <span className="min-w-0">
                  <span
                    className={cn(
                      "block text-[0.82em] font-bold tracking-[0.06em] uppercase",
                      tone.engine,
                    )}
                  >
                    {entry.engine}
                  </span>
                  <span className="mt-0.5 block text-[0.92em] font-bold text-[#101433]">
                    {entry.title}
                  </span>
                  <span className="mt-1 block text-[0.82em] leading-snug text-[#42486b]">
                    {entry.body}
                  </span>
                </span>
              </motion.div>
            );
          })}

          {/* ---------------------- Annotations ----------------------- */}
          {loop.cards.map((entry, index) => (
            <motion.p
              key={`note-${entry.engine}`}
              initial={reduce ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2, ease: easeOut }}
              className={cn(
                "absolute",
                SLOTS[index].note,
                "-rotate-3 font-hand text-[0.95em] leading-[1.25]",
              )}
              style={{ color: SLOTS[index].ink }}
            >
              {entry.note.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </motion.p>
          ))}

          {/* The closing annotation, left of the ring. */}
          <motion.p
            initial={reduce ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2, ease: easeOut }}
            className={cn(
              "absolute",
              CLOSING.note,
              "-rotate-3 font-hand text-[0.95em] leading-[1.25]",
            )}
            style={{ color: CLOSING.ink }}
          >
            {loop.closingNote.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </motion.p>
        </div>
      </div>

      {/* ===================== The stack, below lg ==================== */}
      <div className="lg:hidden">
        <div className="flex flex-col items-center">
          <Image
            src={loop.portrait.src}
            alt={loop.portrait.alt}
            width={loop.portrait.width}
            height={loop.portrait.height}
            priority
            sizes="40vw"
            className="w-40 max-w-full sm:w-48"
          />

          <div
            className={cn(
              "-mt-8 w-full max-w-72 rounded-2xl bg-white px-4 py-3 text-center",
              "shadow-[0_14px_34px_-16px_rgb(30_20_70/0.32)]",
            )}
          >
            <p className="font-bold text-[#101433]">{loop.person.name}</p>
            <p className="mt-0.5 text-sm text-[#42486b]">{loop.person.role}</p>
            <p className="mt-2 flex items-center justify-center gap-1.5">
              <span className="grid size-5 shrink-0 place-items-center rounded-full bg-[#d7f2e2] text-[#147346]">
                <TrendUpIcon className="size-3.5" />
              </span>
              <span className="text-sm font-semibold text-[#147346]">
                {loop.person.status}
              </span>
            </p>
          </div>
        </div>

        {/* The three engines, in the same clockwise order the ring reads. */}
        <ul className="mt-5 grid gap-3.5 sm:grid-cols-3">
          {loop.cards.map((entry) => {
            const tone = TONES[entry.tone];
            const Mark = engineMarks[entry.tone];

            return (
              <li
                key={entry.engine}
                className={cn(
                  "flex items-start gap-3 rounded-2xl bg-white p-4",
                  "shadow-[0_16px_38px_-18px_rgb(30_20_70/0.34)]",
                )}
              >
                <span
                  className={cn(
                    "grid size-11 shrink-0 place-items-center rounded-full",
                    tone.disc,
                    tone.mark,
                  )}
                >
                  <Mark className="size-6" />
                </span>

                <span className="min-w-0">
                  <span
                    className={cn(
                      "block text-xs font-bold tracking-[0.06em] uppercase",
                      tone.engine,
                    )}
                  >
                    {entry.engine}
                  </span>
                  <span className="mt-0.5 block text-[0.9375rem] font-bold text-[#101433]">
                    {entry.title}
                  </span>
                  <span className="mt-1 block text-[0.8125rem] leading-snug text-[#42486b]">
                    {entry.body}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </Uncopyable>
  );
}
