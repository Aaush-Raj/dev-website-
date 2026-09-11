"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { compliance } from "@/content/compliance";
import { cn } from "@/lib/utils";

/**
 * COMPLIANCE — LURNYMAGIC
 * ---------------------------------------------------------------------------
 * Section 3: the statement and three benefits on the left; on the right a
 * policy document feeding the LurnyMagic workspace, which fans out into the
 * four formats one policy can become.
 *
 * ONLY THE GRADIENT IS A RASTER
 * The supplied plate is a clean gradient — no document, workspace, cards,
 * arrows or handwriting on it. So every one of those is markup here: sharp at
 * any width, translatable, animatable, and readable by a screen reader. The
 * pack ships each piece as its own crop with copy baked in as pixels; those
 * files are deliberately unused. See scripts/build-compliance-hero.cjs.
 *
 * THE ENTRANCE
 * The section plays as the flow it depicts, left to right: the copy cascades,
 * then the document arrives, then the workspace, then its four rows tick in
 * one after another, and only then do the four formats rise while the arrows
 * draw themselves from source to destination. Each arrow fires just after the
 * card it leaves, so a line is never drawn to a card that is not yet there.
 * All of it is gated on `useReducedMotion`.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { magic } = compliance;

/** The mark beside each benefit. */
const benefitIcons = {
  document: BenefitDocumentIcon,
  formats: BenefitFormatsIcon,
  review: BenefitReviewIcon,
} as const;

/** The mark in each format card's header. */
const formatIcons = {
  course: CourseIcon,
  microlesson: MicrolessonIcon,
  video: VideoIcon,
  podcast: PodcastIcon,
} as const;

/**
 * Where each format card sits in the 2x2 grid below the workspace, as
 * percentages of the stage, and when it arrives.
 */
/*
 * Both cards in a row are given the same MINIMUM height, not left purely to
 * their content: the microlesson's preview is shorter than the course's list,
 * and without a floor the right column ended ragged where the design has the
 * two level.
 *
 * A minimum rather than a fixed height, because a fixed one cropped: at lg,
 * where the stage is shortest, it cut the course's third lesson and the
 * video's transport off entirely. The card can now grow past its slot.
 */
const FORMAT_SLOTS = [
  { slot: "left-[0%] top-[50.5%] min-h-[23.5%] w-[47.5%]", delay: 1.15 },
  { slot: "left-[52.5%] top-[50.5%] min-h-[23.5%] w-[47.5%]", delay: 1.25 },
  { slot: "left-[0%] top-[76%] min-h-[24%] w-[47.5%]", delay: 1.35 },
  { slot: "left-[52.5%] top-[76%] min-h-[24%] w-[47.5%]", delay: 1.45 },
] as const;

/**
 * THE ARROWS
 * ---------------------------------------------------------------------------
 * On a 1000x1000 viewBox over the stage — NOT `preserveAspectRatio="none"`.
 * Stretching a viewBox scales x and y independently, which renders a curve as
 * mismatched fragments and turns a round cap into a smear. The stage is very
 * nearly square (its `lg:aspect-[1.02]`), so a uniformly-scaled square box
 * maps onto it almost exactly.
 *
 * COORDINATES ARE MEASURED, NOT GUESSED
 * Each is a thousandth of the stage, read off the rendered layout rather than
 * eyeballed, so every arrow LEAVES one edge and LANDS on another:
 *
 *   document    x -10..250, y  15..219   (right edge x=250)
 *   workspace   x 245..1000, y   0..406  (foot y=406)
 *   Course      x   0..475, y 505..730   (top edge y=505)
 *   Microlesson x 525..1000, y 505..686  (top edge y=505)
 *
 * So the first arrow ends at x=245 — the workspace's actual left edge — and
 * the other two end at y=505, the format cards' actual tops. Re-derive these
 * whenever a slot moves; an arrow that stops short of its card, or buries its
 * head inside one, is the symptom. `scripts/` has no helper for this: the
 * numbers above came from measuring the DOM.
 *
 * `delay` fires each just after the card it leaves has arrived.
 */
const ARROWS = [
  /* Out of the document's right edge, arcing up and over into the workspace's
     left edge at the height of its first row. */
  {
    d: "M 228 150 C 258 116, 282 120, 294 150",
    delay: 0.62,
  },
  /* Down out of the workspace's foot, curving left into the Course card's top
     edge. Lands at x=300, comfortably inside that card's 0..475 span. */
  {
    d: "M 470 420 C 452 472, 372 470, 318 505",
    delay: 1.1,
  },
  /* The mirror of it: down and right into the Microlesson card's top edge at
     x=700, inside its 525..1000 span. */
  {
    d: "M 640 420 C 660 472, 730 470, 690 505",
    delay: 1.2,
  },
] as const;

/**
 * The handwritten note's own two arrows, drawn on the strip to the stage's
 * right on their own 200x440 box.
 *
 * They are the design's flourish rather than part of the flow: the first
 * sweeps in from the top right down to the note, the second leaves the note
 * and points back down-left toward the formats. Keeping them on a separate box
 * means their curvature does not have to survive the stage's aspect.
 */
const NOTE_ARROWS = [
  { d: "M 40 24 C 132 60, 156 132, 118 186", delay: 1.0 },
  { d: "M 112 286 C 96 348, 58 388, 16 412", delay: 1.55 },
] as const;

export function ComplianceMagic() {
  const reduce = useReducedMotion();

  /**
   * One rise, reused by everything in the left column. Blur is part of it — a
   * few pixels resolving as the line arrives is what makes the entrance read
   * as smooth rather than merely delayed.
   */
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

  /** The lift the document, workspace and format cards share. */
  const lift = (delay: number) => ({
    initial: reduce
      ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
      : { opacity: 0, y: 30, scale: 0.95, filter: "blur(8px)" },
    whileInView: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
    viewport: { once: true, amount: "some" } as const,
    transition: { duration: 0.9, delay, ease: easeOut },
  });

  return (
    <section className="relative isolate overflow-hidden bg-[#eef3fd] py-section-lg">
      {/* The gradient. Covers the section, so everything sits on it. */}
      <Image
        src={magic.backdrop.src}
        alt={magic.backdrop.alt}
        width={magic.backdrop.width}
        height={magic.backdrop.height}
        aria-hidden="true"
        sizes="100vw"
        className="pointer-events-none absolute inset-0 -z-10 size-full object-cover"
      />

      <Container width="hero">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1fr)] lg:gap-16 xl:gap-20">
          {/* ========================= Left column ==================== */}
          <div>
            <motion.p
              {...rise(0.05)}
              className={cn(
                "text-[0.6875rem] font-bold uppercase",
                "tracking-[0.18em] text-[#8b1fd6] sm:text-xs",
              )}
            >
              {magic.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.16)}
              className={cn(
                "mt-5 font-display font-bold tracking-[-0.035em]",
                "leading-[1.06] text-[#0b0b18]",
                "text-[1.875rem] sm:text-[2.25rem] xl:text-[2.75rem]",
              )}
            >
              {magic.headline.map((line) => (
                <span key={line} className="inline lg:block">
                  {line}{" "}
                </span>
              ))}
            </motion.h2>

            <motion.p
              {...rise(0.28)}
              className={cn(
                "mt-6 max-w-[32rem] leading-relaxed text-pretty",
                "text-[0.9375rem] text-[#101030]/80 sm:text-[1rem]",
              )}
            >
              {magic.description}
            </motion.p>

            {/* ------------------------ Benefits -------------------- */}
            <ul className="mt-10 space-y-7">
              {magic.benefits.map((benefit, index) => {
                const Icon = benefitIcons[benefit.icon];

                return (
                  <motion.li
                    key={benefit.title}
                    {...rise(0.4 + index * 0.12)}
                    className="flex gap-5"
                  >
                    <span
                      className={cn(
                        "flex size-12 shrink-0 items-center justify-center",
                        "rounded-2xl bg-white/70 ring-1 ring-[#e2dbf5]",
                      )}
                    >
                      <Icon className="size-6 text-[#7c1ed1]" />
                    </span>

                    <span className="min-w-0">
                      <span className="block text-[1.0625rem] font-bold tracking-[-0.01em] text-[#0a0a18]">
                        {benefit.title}
                      </span>
                      <span className="mt-1.5 block max-w-[27rem] text-[0.9375rem] leading-relaxed text-[#3a3a5c]">
                        {benefit.body}
                      </span>
                    </span>
                  </motion.li>
                );
              })}
            </ul>

            <motion.p
              {...rise(0.78)}
              className="mt-10 text-[0.875rem] text-[#6b6889]"
            >
              {magic.poweredBy}
            </motion.p>
          </div>

          {/* ========================== The stage ===================== */}
          {/* The document, the workspace, the arrows and the four formats.
              Percentage-positioned from lg up, so the arrows keep meeting the
              cards they point at; below that everything stacks in flow and the
              arrows are dropped, since there is nothing left for them to
              connect. */}
          <div className="relative">
            <div className="relative lg:aspect-[0.86] xl:aspect-[1.02] @container">
              {/* ------------------------ Arrows ------------------- */}
              <svg
                viewBox="0 0 1000 1000"
                fill="none"
                aria-hidden="true"
                preserveAspectRatio="xMidYMid slice"
                className="pointer-events-none absolute inset-0 z-20 hidden size-full lg:block"
              >
                <defs>
                  <marker
                    id="magic-head"
                    viewBox="0 0 10 10"
                    refX="7"
                    refY="5"
                    markerWidth="5.5"
                    markerHeight="5.5"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 1 L 8 5 L 0 9 z" fill="#8b1fd6" />
                  </marker>
                </defs>

                {ARROWS.map((arrow) => (
                  <motion.path
                    key={arrow.d}
                    d={arrow.d}
                    stroke="#8b1fd6"
                    strokeWidth="4"
                    strokeLinecap="round"
                    markerEnd="url(#magic-head)"
                    initial={
                      reduce
                        ? { pathLength: 1, opacity: 1 }
                        : { pathLength: 0, opacity: 0 }
                    }
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true, amount: "some" }}
                    transition={{
                      duration: 0.6,
                      delay: arrow.delay,
                      ease: easeOut,
                    }}
                  />
                ))}
              </svg>

              {/* ---------------------- The document --------------- */}
              {/* Overlaps the workspace's left edge, as the design draws it,
                  and is tipped a few degrees so it reads as a sheet of paper
                  rather than a panel. */}
              <motion.div
                {...lift(0.3)}
                className={cn(
                  "z-10 lg:absolute lg:left-[-1%] lg:top-[1.5%] lg:w-[26%]",
                  "lg:text-[max(9px,0.86cqw)]",
                )}
              >
                <PolicyDocument />
              </motion.div>

              {/* ---------------------- The workspace -------------- */}
              <motion.div
                {...lift(0.5)}
                className={cn(
                  "mt-6 lg:absolute lg:left-[24.5%] lg:top-[0%] lg:mt-0 lg:w-[75.5%]",
                  "lg:text-[max(9px,0.92cqw)]",
                )}
              >
                <Workspace reduce={reduce} />
              </motion.div>

              {/* ----------------------- The formats --------------- */}
              {/* A plain 2x2 grid below lg; the measured slots above it. */}
              <ul
                className={cn(
                  "mt-6 grid gap-4 sm:grid-cols-2 lg:mt-0 lg:block",
                  "lg:text-[max(9px,0.9cqw)]",
                )}
              >
                {magic.formats.map((format, index) => (
                  <motion.li
                    key={format.label}
                    {...lift(FORMAT_SLOTS[index].delay)}
                    className={cn("lg:absolute", FORMAT_SLOTS[index].slot)}
                  >
                    <FormatCard format={format} />
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* --------------------- The handwritten note ---------- */}
            {/* Sits off the stage's right edge, where the design puts it.
                Only drawn from xl up — below that there is no margin beside
                the stage to hold it without overlapping the cards. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-full hidden w-[16%] xl:block"
            >
              <div className="relative h-full">
                <svg
                  viewBox="0 0 200 440"
                  fill="none"
                  preserveAspectRatio="xMidYMid meet"
                  className="absolute inset-0 size-full"
                >
                  <defs>
                    <marker
                      id="magic-note-head"
                      viewBox="0 0 10 10"
                      refX="7"
                      refY="5"
                      markerWidth="5"
                      markerHeight="5"
                      orient="auto-start-reverse"
                    >
                      <path d="M 0 1 L 8 5 L 0 9 z" fill="#8b1fd6" />
                    </marker>
                  </defs>

                  {NOTE_ARROWS.map((arrow) => (
                    <motion.path
                      key={arrow.d}
                      d={arrow.d}
                      stroke="#8b1fd6"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      markerEnd="url(#magic-note-head)"
                      initial={
                        reduce
                          ? { pathLength: 1, opacity: 1 }
                          : { pathLength: 0, opacity: 0 }
                      }
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      viewport={{ once: true, amount: "some" }}
                      transition={{
                        duration: 0.7,
                        delay: arrow.delay,
                        ease: easeOut,
                      }}
                    />
                  ))}
                </svg>

                {/* The note itself, between its two arrows. */}
                <motion.p
                  {...rise(1.25)}
                  className={cn(
                    "absolute top-[50%] -translate-y-1/2",
                    "font-hand leading-[1.3] text-[#8b1fd6]",
                    "text-[1.25rem] xl:text-[1.4rem]",
                    "-rotate-[6deg]",
                  )}
                >
                  {magic.note.map((line) => (
                    <span key={line} className="block whitespace-nowrap">
                      {line}
                    </span>
                  ))}
                </motion.p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ========================================================================== */
/*  The stage's pieces                                                        */
/* ========================================================================== */

/**
 * The source policy: a tipped sheet with its title, a PDF badge, and ruled
 * lines standing in for its body — two of them highlighted, as the design
 * marks the passages the lesson will draw on.
 *
 * Sized in `em` so it scales with whichever context sets the font size.
 */
function PolicyDocument() {
  const { document: doc } = magic;

  return (
    <div
      className={cn(
        "relative rounded-[0.9em] bg-white p-[1.5em] pt-[1.7em]",
        "shadow-[0_26px_54px_-22px_rgb(30_15_60/0.35)]",
        "ring-1 ring-[#eceaf6]",
        // Tipped as the design draws it — a sheet of paper, not a panel.
        "rotate-[-4deg]",
      )}
    >
      {/* The PDF badge, straddling the sheet's top-right corner. */}
      <span
        className={cn(
          "absolute -top-[0.7em] right-[0.9em]",
          "flex size-[2.5em] flex-col items-center justify-center",
          "rounded-[0.45em] bg-[#7c1ed1] text-[0.62em] font-bold text-white",
        )}
      >
        PDF
      </span>

      <p className="text-[1.05em] font-bold leading-[1.3] tracking-[-0.01em] text-[#111132]">
        {doc.title.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </p>

      {/* The body, as ruled lines. Two carry a highlight — the passages the
          lesson is drawn from. `key` is the index because these are identical
          decorative bars with no content of their own. */}
      <div aria-hidden="true" className="mt-[1.1em] space-y-[0.5em]">
        {DOCUMENT_LINES.map((line, index) => (
          <span
            key={index}
            className={cn(
              "block h-[0.42em] rounded-full",
              line.tone === "lilac"
                ? "bg-[#cbb8f5]"
                : line.tone === "mint"
                  ? "bg-[#9fe2cd]"
                  : "bg-[#e8e8f0]",
            )}
            style={{ width: line.width }}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * The document's body lines: how wide each runs, and which two are
 * highlighted. Fixed rather than random so the sheet renders identically on
 * the server and the client.
 */
const DOCUMENT_LINES = [
  { width: "100%", tone: "plain" },
  { width: "92%", tone: "plain" },
  { width: "78%", tone: "lilac" },
  { width: "96%", tone: "plain" },
  { width: "88%", tone: "plain" },
  { width: "70%", tone: "mint" },
  { width: "94%", tone: "plain" },
  { width: "82%", tone: "plain" },
] as const;

/**
 * The LurnyMagic creation workspace: the draft, its four sections, and the
 * action that closes it.
 *
 * The four rows tick in one after another rather than arriving as a block —
 * it is the one place in the section where the sequence is the point, since
 * this is the draft being assembled out of the policy.
 */
function Workspace({ reduce }: { reduce: boolean | null }) {
  const { workspace } = magic;

  return (
    <div
      className={cn(
        "rounded-[1.1em] bg-white p-[1.15em]",
        "shadow-[0_28px_60px_-24px_rgb(30_15_60/0.32)]",
        "ring-1 ring-[#eceaf6]",
      )}
    >
      {/* ----------------------------- Header ---------------------- */}
      <div className="flex items-center justify-between gap-[1em] px-[0.35em] pb-[1em]">
        <span className="flex items-center gap-[0.55em]">
          <SparkIcon className="size-[1.6em] shrink-0 text-[#7c1ed1]" />
          <span className="text-[1.35em] font-bold tracking-[-0.02em] text-[#1a1040]">
            Lurny<span className="text-[#8b1fd6]">Magic</span>
          </span>
        </span>

        <span
          className={cn(
            "shrink-0 rounded-full bg-[#f0eafc] px-[0.9em] py-[0.4em]",
            "text-[0.82em] font-medium text-[#5b3aa8]",
          )}
        >
          {workspace.tag}
        </span>
      </div>

      {/* ------------------------- The draft ----------------------- */}
      <div className="rounded-[0.85em] bg-[#fbfaff] p-[1.1em] ring-1 ring-[#f0eef8]">
        <div className="flex items-center gap-[0.7em]">
          <span className="text-[1.15em] font-bold tracking-[-0.015em] text-[#111132]">
            {workspace.title}
          </span>
          <span
            className={cn(
              "rounded-full bg-[#e4edfb] px-[0.75em] py-[0.25em]",
              "text-[0.78em] font-semibold text-[#38599c]",
            )}
          >
            {workspace.status}
          </span>
        </div>

        {/* The four sections. The ordinal is the item's position rather than
            stored copy, so the two cannot drift apart. */}
        <ol className="mt-[0.9em] space-y-[0.55em]">
          {workspace.sections.map((section, index) => (
            <motion.li
              key={section}
              initial={
                reduce
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: -14, filter: "blur(4px)" }
              }
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: "some" }}
              transition={{
                duration: 0.55,
                delay: 0.72 + index * 0.09,
                ease: easeOut,
              }}
              className={cn(
                "flex items-center gap-[0.85em] rounded-[0.6em] bg-white",
                "px-[0.85em] py-[0.7em] ring-1 ring-[#eeecf7]",
              )}
            >
              <span
                className={cn(
                  "flex size-[1.9em] shrink-0 items-center justify-center",
                  "rounded-full bg-[#eff2fa] text-[0.82em] font-semibold text-[#3a3a5c]",
                )}
              >
                {index + 1}
              </span>

              <span className="min-w-0 flex-1 text-[0.95em] text-[#20203f]">
                {section}
              </span>

              {/* The row's drag handle and overflow menu — the workspace's
                  own affordances, drawn as the design shows them. */}
              <GripIcon className="size-[1em] shrink-0 text-[#c3c0d6]" />
              <DotsIcon className="size-[1em] shrink-0 text-[#8b88ab]" />
            </motion.li>
          ))}
        </ol>

        {/* ---------------------- The action ------------------- */}
        <div className="mt-[1.1em] flex justify-center">
          <span
            className={cn(
              "inline-flex items-center gap-[0.6em] rounded-[0.55em]",
              "bg-gradient-to-r from-[#7c1ed1] to-[#9b3ae6]",
              "px-[1.8em] py-[0.75em] text-[0.95em] font-semibold text-white",
            )}
          >
            {workspace.action}
            <ArrowIcon className="size-[1em]" />
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * One format card. The header — mark, label, chevron — is shared; the preview
 * beneath it is selected by `format.body`.
 */
function FormatCard({ format }: { format: Format }) {
  const Icon = formatIcons[format.icon];
  const mint = format.tone === "mint";

  return (
    <div
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-[0.9em] bg-white",
        "shadow-[0_22px_48px_-20px_rgb(30_15_60/0.3)]",
        "ring-1 ring-[#eceaf6]",
      )}
    >
      {/* ----------------------------- Header ---------------------- */}
      <div
        className={cn(
          "flex items-center gap-[0.7em] px-[0.9em] py-[0.75em]",
          mint ? "bg-[#e6f7f1]" : "bg-[#f2ecfd]",
        )}
      >
        <span
          className={cn(
            "flex size-[1.9em] shrink-0 items-center justify-center rounded-[0.45em]",
            mint ? "bg-[#1fb894]" : "bg-[#7c1ed1]",
          )}
        >
          <Icon className="size-[1.1em] text-white" />
        </span>

        <span
          className={cn(
            "flex-1 text-[1em] font-semibold",
            mint ? "text-[#118066]" : "text-[#5b18a8]",
          )}
        >
          {format.label}
        </span>

        <ChevronIcon
          className={cn(
            "size-[1em] shrink-0",
            mint ? "text-[#1fb894]" : "text-[#7c1ed1]",
          )}
        />
      </div>

      {/* ---------------------------- Preview ---------------------- */}
      <div className="flex flex-1 flex-col justify-center p-[0.95em]">
        {format.body === "lessons" && <LessonsPreview format={format} />}
        {format.body === "excerpt" && <ExcerptPreview format={format} />}
        {format.body === "player" && <PlayerPreview format={format} />}
        {format.body === "audio" && <AudioPreview format={format} />}
      </div>
    </div>
  );
}

/**
 * One format, discriminated on `body`.
 *
 * The content file declares the four `as const`, which makes their union a
 * union of four DIFFERENT object shapes — so `format.lessons` is not readable
 * off the union as a whole. Narrowing on `body` gives each preview exactly the
 * fields it draws, checked rather than asserted.
 */
type Format = (typeof magic.formats)[number];
type FormatOf<B extends Format["body"]> = Extract<Format, { body: B }>;

/** COURSE — the lessons it contains, numbered. */
function LessonsPreview({ format }: { format: FormatOf<"lessons"> }) {
  return (
    <>
      <p className="text-[1.05em] font-bold tracking-[-0.01em] text-[#0a0a18]">
        {format.title}
      </p>

      <ol className="mt-[0.6em]">
        {format.lessons.map((lesson, index) => (
          <li
            key={lesson}
            className={cn(
              "flex items-center gap-[0.8em] py-[0.55em]",
              // A rule between the lessons, but not under the last.
              index > 0 && "border-t border-[#f0eef8]",
            )}
          >
            <span
              className={cn(
                "flex size-[1.7em] shrink-0 items-center justify-center",
                "rounded-full bg-[#f3f2fa] text-[0.8em] font-semibold text-[#3a3a5c]",
              )}
            >
              {index + 1}
            </span>
            <span className="text-[0.95em] text-[#2a2a4d]">{lesson}</span>
          </li>
        ))}
      </ol>
    </>
  );
}

/** MICROLESSON — a page thumbnail beside the text it condenses. */
function ExcerptPreview({ format }: { format: FormatOf<"excerpt"> }) {
  return (
    <>
      <p className="text-[1.05em] font-bold tracking-[-0.01em] text-[#0a0a18]">
        {format.title}
      </p>

      <div aria-hidden="true" className="mt-[0.85em] flex gap-[0.9em]">
        {/* The thumbnail: a sheet with a "go" mark over its corner. */}
        <span
          className={cn(
            "relative flex h-[4.6em] w-[6.4em] shrink-0 items-center justify-center",
            "rounded-[0.5em] bg-[#e6f7f1]",
          )}
        >
          <SheetGlyph className="h-[3.4em] w-[2.7em]" />
          <span
            className={cn(
              "absolute right-[0.55em] top-1/2 -translate-y-1/2",
              "flex size-[1.75em] items-center justify-center",
              "rounded-full bg-[#1fb894]",
            )}
          >
            <ArrowIcon className="size-[0.9em] text-white" />
          </span>
        </span>

        {/* The condensed text, as ruled lines. */}
        <span className="flex min-w-0 flex-1 flex-col justify-center gap-[0.5em]">
          {["100%", "86%", "94%", "62%"].map((width) => (
            <span
              key={width}
              className="block h-[0.55em] rounded-full bg-[#eceaf4]"
              style={{ width }}
            />
          ))}
        </span>
      </div>
    </>
  );
}

/** VIDEO — the frame, then the title and transport beneath it. */
function PlayerPreview({ format }: { format: FormatOf<"player"> }) {
  return (
    <>
      {/* The frame. The document behind the play button is the policy this
          video was made from. */}
      <div
        aria-hidden="true"
        className={cn(
          "relative flex h-[6.2em] items-center justify-center overflow-hidden",
          "rounded-[0.55em] bg-gradient-to-br from-[#e9e1fa] to-[#d6c9f4]",
        )}
      >
        <VideoSheetGlyph className="h-[4.1em] w-[5.6em]" />

        <span
          className={cn(
            "absolute flex size-[2.5em] items-center justify-center",
            "rounded-full bg-[#7c1ed1] shadow-[0_6px_16px_-4px_rgb(60_10_120/0.5)]",
          )}
        >
          <PlayIcon className="ml-[0.12em] size-[1.1em] text-white" />
        </span>
      </div>

      <p className="mt-[0.85em] text-[1.05em] font-bold tracking-[-0.01em] text-[#0a0a18]">
        {format.caption}
      </p>

      {/* The transport. */}
      <div
        aria-hidden="true"
        className="mt-[0.6em] flex items-center gap-[0.7em]"
      >
        <PlayIcon className="size-[1.1em] shrink-0 text-[#7c1ed1]" />

        {/* The scrubber, filled to roughly a third — where the design sets
            the head. */}
        <span className="relative flex h-[0.35em] flex-1 items-center">
          <span className="absolute inset-0 rounded-full bg-[#e6e2f2]" />
          <span className="absolute left-0 h-full w-[32%] rounded-full bg-[#7c1ed1]" />
          <span className="absolute left-[32%] size-[0.8em] -translate-x-1/2 rounded-full bg-[#7c1ed1]" />
        </span>

        <span className="shrink-0 text-[0.82em] text-[#5b5878]">
          {format.duration}
        </span>
        <ExpandIcon className="size-[0.95em] shrink-0 text-[#7c1ed1]" />
      </div>
    </>
  );
}

/** PODCAST — the waveform, then the transport beneath it. */
function AudioPreview({ format }: { format: FormatOf<"audio"> }) {
  return (
    <>
      <p className="text-[1.05em] font-bold tracking-[-0.01em] text-[#0a0a18]">
        {format.title}
      </p>

      {/* The waveform. Bar heights are a fixed table rather than random, so
          the card renders identically on the server and the client. */}
      <div
        aria-hidden="true"
        className="mt-[0.9em] flex h-[2.8em] items-center justify-between gap-[0.09em]"
      >
        {WAVEFORM.map((height, index) => (
          <span
            key={index}
            className={cn(
              "w-[0.16em] shrink-0 rounded-full",
              // The louder bars carry the accent, the quiet ones recede.
              height > 55 ? "bg-[#7c1ed1]" : "bg-[#c9c2e4]",
            )}
            style={{ height: `${height}%` }}
          />
        ))}
      </div>

      {/* The transport. */}
      <div
        aria-hidden="true"
        className="mt-[0.85em] flex items-center gap-[0.7em]"
      >
        <span
          className={cn(
            "flex size-[2.1em] shrink-0 items-center justify-center",
            "rounded-full bg-[#7c1ed1]",
          )}
        >
          <PlayIcon className="ml-[0.1em] size-[0.9em] text-white" />
        </span>

        <span className="shrink-0 text-[0.82em] text-[#5b5878]">
          {format.elapsed}
        </span>

        <span className="relative flex h-[0.35em] flex-1 items-center">
          <span className="absolute inset-0 rounded-full bg-[#e6e2f2]" />
          <span className="absolute left-0 h-full w-[22%] rounded-full bg-[#7c1ed1]" />
          <span className="absolute left-[22%] size-[0.8em] -translate-x-1/2 rounded-full bg-[#7c1ed1]" />
        </span>

        <span className="shrink-0 text-[0.82em] text-[#5b5878]">
          {format.duration}
        </span>

        <span
          className={cn(
            "shrink-0 rounded-[0.3em] bg-[#f2eefb] px-[0.5em] py-[0.2em]",
            "text-[0.78em] font-semibold text-[#5b18a8]",
          )}
        >
          {format.speed}
        </span>
      </div>
    </>
  );
}

/**
 * The podcast waveform, as percentages of the strip's height.
 *
 * A fixed table rather than `Math.random()`: a random waveform would differ
 * between the server render and the client's, which React reports as a
 * hydration mismatch.
 */
const WAVEFORM = [
  18, 26, 14, 32, 22, 44, 70, 52, 88, 64, 40, 74, 30, 20, 36, 58, 96, 68, 46,
  82, 38, 24, 50, 34, 62, 90, 56, 28, 42, 72, 48, 20, 33, 60, 26, 16, 45, 78,
  54, 30, 22, 38, 66, 42, 18, 28, 50, 24, 36, 20,
] as const;

/* ========================================================================== */
/*  Icons                                                                     */
/* ========================================================================== */

/** LurnyMagic — the four-point spark, with its smaller companion. */
function SparkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M13.4 3.2c.7 4.6 2.3 6.2 6.9 6.9-4.6.7-6.2 2.3-6.9 6.9-.7-4.6-2.3-6.2-6.9-6.9 4.6-.7 6.2-2.3 6.9-6.9Z"
        fill="currentColor"
      />
      <path
        d="M5.4 15.4c.3 2 1 2.7 3 3-2 .3-2.7 1-3 3-.3-2-1-2.7-3-3 2-.3 2.7-1 3-3Z"
        fill="currentColor"
        opacity=".6"
      />
    </svg>
  );
}

/** Benefit 1 — the source document. */
function BenefitDocumentIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M6 3.2h7.4L19 8.8v12a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4.2a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M13.2 3.4v5.6h5.5" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M8.4 13h7.2M8.4 16.6h4.8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Benefit 2 — the four formats to choose between. */
function BenefitFormatsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="3" width="7.6" height="7.6" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <rect x="13.4" y="3" width="7.6" height="7.6" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <rect x="3" y="13.4" width="7.6" height="7.6" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <rect x="13.4" y="13.4" width="7.6" height="7.6" rx="2" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

/** Benefit 3 — the check that closes the loop. */
function BenefitReviewIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="m7.8 12.3 2.9 2.9 5.5-5.9"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Course — the mortarboard. */
function CourseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 4.2 21.5 9 12 13.8 2.5 9 12 4.2Z"
        fill="currentColor"
      />
      <path
        d="M6.6 11.2v4.5c0 1.6 2.4 2.9 5.4 2.9s5.4-1.3 5.4-2.9v-4.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Microlesson — a page with a marked column. */
function MicrolessonIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect
        x="3.6"
        y="3.2"
        width="16.8"
        height="17.6"
        rx="2.4"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M8.4 8h7.2M8.4 12h7.2M8.4 16h4.2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Video — the play triangle. */
function VideoIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect
        x="2.6"
        y="4.4"
        width="18.8"
        height="15.2"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path d="M10 8.8 16.2 12 10 15.2V8.8Z" fill="currentColor" />
    </svg>
  );
}

/** Podcast — the microphone. */
function PodcastIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="9" y="2.6" width="6" height="11" rx="3" fill="currentColor" />
      <path
        d="M5.4 11.4a6.6 6.6 0 0 0 13.2 0M12 18v3.4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** The sheet standing in for the policy in the two thumbnails. */
function SheetGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 34 42" fill="none" className={className} aria-hidden="true">
      <rect
        x="1"
        y="1"
        width="32"
        height="40"
        rx="3"
        fill="#fff"
        stroke="#c9bef0"
        strokeWidth="1.6"
      />
      <path
        d="M7.5 11h19M7.5 17h19M7.5 23h19M7.5 29h12"
        stroke="#a99ae0"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * The policy behind the video's play button.
 *
 * A landscape sheet rather than the portrait `SheetGlyph`: that one's 34x42
 * viewBox letterboxes inside the frame's wide box, which shrank it to a
 * fraction of the height and left the frame reading as empty.
 */
function VideoSheetGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 56 42" fill="none" className={className} aria-hidden="true">
      {/* The sheet behind, offset — the design layers two. */}
      <rect
        x="12"
        y="1.2"
        width="43"
        height="33"
        rx="2.6"
        fill="#fff"
        opacity=".55"
      />
      <rect
        x="1"
        y="7"
        width="43"
        height="34"
        rx="2.6"
        fill="#fff"
        stroke="#b7a7e8"
        strokeWidth="1.4"
      />
      <path
        d="M7.5 15h30M7.5 21h30M7.5 27h30M7.5 33h18"
        stroke="#a294dd"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** The row's drag handle in the workspace. */
function GripIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden="true">
      <circle cx="6" cy="3.5" r="1.3" />
      <circle cx="10" cy="3.5" r="1.3" />
      <circle cx="6" cy="8" r="1.3" />
      <circle cx="10" cy="8" r="1.3" />
      <circle cx="6" cy="12.5" r="1.3" />
      <circle cx="10" cy="12.5" r="1.3" />
    </svg>
  );
}

/** The row's overflow menu in the workspace. */
function DotsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden="true">
      <circle cx="3" cy="8" r="1.4" />
      <circle cx="8" cy="8" r="1.4" />
      <circle cx="13" cy="8" r="1.4" />
    </svg>
  );
}

/** The chevron closing each format card's header. */
function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path
        d="m6 3.5 5 4.5-5 4.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** The play triangle, in both players and the microlesson thumbnail. */
function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden="true">
      <path d="M5 3.2 12.4 8 5 12.8V3.2Z" />
    </svg>
  );
}

/** The video's fullscreen affordance. */
function ExpandIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path
        d="M6.4 2.6H2.6v3.8M9.6 2.6h3.8v3.8M6.4 13.4H2.6V9.6M9.6 13.4h3.8V9.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** The arrow on the workspace action and the microlesson thumbnail. */
function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path
        d="M3 8h9m0 0-3.4-3.4M12 8l-3.4 3.4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
