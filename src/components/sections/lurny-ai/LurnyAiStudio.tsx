"use client";

import type { ComponentType, SVGProps } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { Uncopyable } from "@/components/ui/Uncopyable";
import { lurnyAi } from "@/content/lurny-ai";
import { cn } from "@/lib/utils";

import {
  ArrowIcon,
  BulbIcon,
  DeckIcon,
  DotsIcon,
  LessonIcon,
  PdfIcon,
  PersonSmallIcon,
  PersonaIcon,
  PlusIcon,
  QuizIcon,
  UploadIcon,
  VideoIcon,
  WandIcon,
} from "./LurnyAiIcons";

/**
 * LURNY.AI KNOWLEDGE STUDIO
 * ---------------------------------------------------------------------------
 * Section 2: the Studio window on the left with the AI-persona card
 * overlapping its foot, and copy with three features on the right.
 *
 * THE WINDOW IS DRAWN, not shipped. The design pack supplies it as a 783KB
 * transparent PNG; it is pure interface — a file list, three tabs, a lesson
 * preview, two buttons — so as an image it would blur on high-density screens,
 * stay untranslatable and be invisible to screen readers. Only the lesson
 * artwork ships (3KB), because it is an illustration rather than interface.
 *
 * THE ARROW IS THE SECTION'S ONE GESTURE. It runs from "Add material" into the
 * preview pane — the claim the whole window is making, that raw material
 * becomes a lesson — so it draws itself on view rather than simply appearing.
 * Its viewBox keeps a fixed aspect: stretching it flattens the curve and skews
 * the head, the failure this build has hit on every connector drawn that way.
 */

const { studio } = lurnyAi;

/** Motion's string easings are not typed, so the cubic curve is spelled out. */
const easeOut = [0.16, 1, 0.3, 1] as const;

const FEATURE_GLYPHS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  upload: UploadIcon,
  wand: WandIcon,
  persona: PersonaIcon,
};

/** File-row badges, keyed by the kind of material. */
const KIND_GLYPHS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  pdf: PdfIcon,
  ppt: DeckIcon,
  idea: BulbIcon,
};

/** Badge tints, sampled from the design. */
const KIND_TONES = {
  pdf: "bg-[#fde8e4] text-[#e04b3c]",
  ppt: "bg-[#fdecdf] text-[#e07a2c]",
  idea: "bg-[#f3f3f6] text-[#6b7280]",
} as const;

const TAB_GLYPHS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  lesson: LessonIcon,
  video: VideoIcon,
  quiz: QuizIcon,
};

export function LurnyAiStudio() {
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduce ? "shown" : "hidden",
    whileInView: "shown",
    /*
      A generous bottom margin. On a phone the whole right column — eyebrow,
      description, all three features and the CTA — sits far below the Studio
      window, well past the fold; at a 20% margin every one of them stayed at
      opacity 0 and the section rendered as a window and nothing else.
    */
    viewport: {
      once: true,
      amount: "some",
      margin: "0px 0px 90% 0px",
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
        // Sampled from the supplied plate: a warm cream.
        "bg-[#fdf6ec] text-[#1c1a19]",
        "py-16 sm:py-20 lg:py-24",
      )}
    >
      {/* ========================= Background ========================= */}
      {/*
        The plate's two blush blobs. Blurred ellipses cropped by the section —
        which is how the plate draws them, and costs nothing at any size.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <span className="absolute -top-[18%] -left-[14%] size-[40rem] rounded-full bg-[#fbd9cd]/55 blur-3xl" />
        <span className="absolute -bottom-[26%] -left-[6%] size-[34rem] rounded-full bg-[#f9c9b8]/45 blur-3xl" />
      </div>

      <Container width="hero">
        <div
          className={cn(
            "grid items-center gap-12",
            // Measured from the design: the window takes the left ~58% and the
            // copy the right.
            "xl:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] xl:gap-14",
            // Grid items default to `min-width: auto`; without this the
            // window's widest row can force its column past the container.
            "[&>*]:min-w-0",
          )}
        >
          {/* ========================== Window ========================= */}
          <Uncopyable>
            <motion.div
              initial={reduce ? "shown" : "hidden"}
              whileInView="shown"
              viewport={{ once: true, amount: 0.15, margin: "0px 0px 90% 0px" }}
              variants={{
                hidden: { opacity: 0, y: 24 },
                shown: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.75, ease: easeOut },
                },
              }}
              className="relative"
            >
              <StudioWindow reduce={Boolean(reduce)} />

              {/*
                The persona card overlaps the window's lower right, as the
                design has it. Only from `sm`: stacked below that, it sits in
                flow instead, where an overlap would bury the Publish row.
              */}
              <motion.div
                initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px 90% 0px" }}
                transition={{ duration: 0.6, delay: 0.45, ease: easeOut }}
                className={cn(
                  "mt-4 sm:mt-0",
                  /*
                    An ABSOLUTE width, not a share of the window.

                    The design's card is 294px on its 1590 frame, and it hangs
                    off the window's lower-right corner — overlapping only the
                    last fifth of it. Expressed as a percentage of my window,
                    which is wider than the design's frame share, it came out
                    far too narrow and its title wrapped to three lines.
                  */
                  "sm:absolute sm:-right-12 sm:-bottom-10 sm:w-[18.5rem]",
                )}
              >
                <PersonaCard />
              </motion.div>
            </motion.div>
          </Uncopyable>

          {/* =========================== Copy ========================== */}
          <div className="sm:pt-14 xl:pt-0">
            <motion.p
              {...rise(0)}
              className={cn(
                "font-mono text-[0.75rem] font-bold tracking-[0.16em] uppercase",
                "text-[#f8524f]",
              )}
            >
              {studio.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.06)}
              className={cn(
                "mt-6 font-display font-bold tracking-[-0.035em]",
                "leading-[1.06] text-balance text-[#17161f]",
                // Measured from the design at ~52px on a 1440 frame.
                "text-[2rem] sm:text-[2.5rem] xl:text-[3rem]",
              )}
            >
              {/*
                Three content lines. The last carries a `tail` — the accented
                phrase runs on from the same line rather than owning its own,
                which is why it is a second field rather than a third entry.
              */}
              {studio.headline.map((line) => (
                <span key={line.text} className="block">
                  {line.text}
                  {"tail" in line && line.tail ? (
                    <span className="text-[#f8524f]">{line.tail}</span>
                  ) : null}
                </span>
              ))}
            </motion.h2>

            <motion.p
              {...rise(0.12)}
              className={cn(
                "mt-6 max-w-[34rem] leading-relaxed text-pretty",
                "text-[1rem] text-[#4b4a56] sm:text-[1.0625rem]",
              )}
            >
              {studio.description}
            </motion.p>

            {/* ------------------------ Features --------------------- */}
            <ul className="mt-10 space-y-7">
              {studio.features.map((feature, index) => {
                const Glyph = FEATURE_GLYPHS[feature.icon];
                return (
                  <motion.li
                    key={feature.title}
                    {...rise(0.18 + index * 0.07)}
                    className="group/feature flex gap-5"
                  >
                    <Glyph
                      className={cn(
                        "mt-0.5 size-8 shrink-0 text-[#f8524f]",
                        "duration-normal transition-[scale] ease-out",
                        "will-change-[scale] group-hover/feature:scale-110",
                      )}
                    />
                    <div className="min-w-0">
                      <p className="text-[1.0625rem] leading-tight font-bold text-[#17161f]">
                        {feature.title}
                      </p>
                      <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-[#4b4a56]">
                        {feature.body}
                      </p>
                    </div>
                  </motion.li>
                );
              })}
            </ul>

            <motion.div {...rise(0.42)} className="mt-10">
              <Link
                href={studio.action.href}
                className={cn(
                  "group inline-flex items-center gap-3 rounded-xl px-8 py-4",
                  // The design's coral gradient, left to right.
                  "bg-[linear-gradient(to_right,#f8524f,#fb7a52)]",
                  "text-[1.0625rem] font-bold text-white",
                  "duration-normal transition-[translate,box-shadow] ease-out",
                  "will-change-[translate]",
                  "hover:-translate-y-0.5",
                  "hover:shadow-[0_1rem_2rem_-0.75rem_rgb(248_82_79/0.7)]",
                  "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#f8524f]",
                )}
              >
                {studio.action.label}
                <ArrowIcon
                  className={cn(
                    "size-4.5 shrink-0",
                    "duration-normal transition-[translate] ease-out",
                    "group-hover:translate-x-1",
                  )}
                />
              </Link>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ========================================================================== */
/* STUDIO WINDOW                                                              */
/* ========================================================================== */

function StudioWindow({ reduce }: { reduce: boolean }) {
  const { window: win } = studio;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-3xl bg-[#fdfdf9]",
        "ring-1 ring-[#1c1a19]/6",
        "shadow-[0_2rem_4rem_-1.5rem_rgb(28,26,25,0.25)]",
      )}
    >
      {/* ------------------------- Title bar ----------------------- */}
      <div className="flex items-center gap-4 border-b border-[#1c1a19]/7 px-5 py-4">
        <span className="flex items-center gap-2.5">
          {/* The mark: a coral disc with the brand's initial. */}
          <span className="grid size-7 place-items-center rounded-full bg-[linear-gradient(135deg,#f8a15f,#f8524f)] text-[0.8125rem] font-bold text-white">
            L
          </span>
          <span className="font-display text-[1.0625rem] font-bold tracking-[-0.01em] text-[#e0563f]">
            {win.brand}
          </span>
        </span>

        <span aria-hidden="true" className="h-5 w-px bg-[#1c1a19]/12" />

        <span className="text-[0.9375rem] font-medium text-[#3b3a45]">
          {win.title}
        </span>

        <span className="ml-auto flex items-center gap-3">
          <span
            className={cn(
              "flex items-center gap-2 rounded-full px-3 py-1.5",
              "bg-[#f4f4f2] text-[0.8125rem] text-[#4b4a56]",
            )}
          >
            <span className="size-1.5 rounded-full bg-[#9a9aa4]" />
            {win.status}
          </span>
          <DotsIcon className="size-4 rotate-90 text-[#9a9aa4]" />
        </span>
      </div>

      {/* --------------------------- Panes ------------------------- */}
      <div className="grid gap-4 p-4 sm:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]">
        {/* Left: the expert's own material. */}
        <div className="relative rounded-2xl bg-[#faf9f5] p-4 ring-1 ring-[#1c1a19]/6">
          <p className="flex items-center justify-between gap-3">
            <span className="text-[0.9375rem] font-bold text-[#17161f]">
              {win.knowledge.title}
            </span>
            <PlusIcon className="size-4 text-[#6b7280]" />
          </p>

          <ul className="mt-3.5 space-y-2.5">
            {win.knowledge.items.map((item) => {
              const Glyph = KIND_GLYPHS[item.kind];
              return (
                <li
                  key={item.name}
                  className={cn(
                    "flex items-center gap-3 rounded-xl bg-white p-3",
                    "ring-1 ring-[#1c1a19]/6",
                  )}
                >
                  <span
                    className={cn(
                      "grid size-9 shrink-0 place-items-center rounded-lg",
                      KIND_TONES[item.kind],
                    )}
                  >
                    <Glyph className="size-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    {/*
                      NOT truncated: these name the expert's own material, and
                      "Leadership note…" loses the file type that tells you what
                      it is. They wrap instead.
                    */}
                    <span className="block text-[0.8125rem] leading-snug font-semibold text-[#17161f]">
                      {item.name}
                    </span>
                    <span className="mt-0.5 block text-[0.6875rem] leading-snug text-[#7b7a85]">
                      {item.meta}
                    </span>
                  </span>
                  <DotsIcon className="size-3.5 shrink-0 text-[#b0afb8]" />
                </li>
              );
            })}
          </ul>

          {/* The dashed add row the arrow points away from. */}
          <p
            className={cn(
              "mt-3 flex items-center gap-3 rounded-xl px-3 py-3",
              "border border-dashed border-[#1c1a19]/18",
              "text-[0.8125rem] font-medium text-[#3b3a45]",
            )}
          >
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-[#f1f0ec]">
              <PlusIcon className="size-3.5 text-[#4b4a56]" />
            </span>
            {win.knowledge.add}
          </p>

          {/*
            The gesture. It runs from the add row into the preview pane, so it
            sits at the pane's edge and points across the gutter.
          */}
          <StudioArrow reduce={reduce} />
        </div>

        {/* Right: what the material becomes. */}
        <div className="rounded-2xl bg-white p-4 ring-1 ring-[#1c1a19]/6">
          <p className="text-[0.9375rem] font-bold text-[#17161f]">
            {win.preview.title}
          </p>

          {/* The three output tabs. */}
          <ul className="mt-3 flex flex-wrap gap-2">
            {win.preview.tabs.map((tab) => {
              const Glyph = TAB_GLYPHS[tab.icon];
              const active = "active" in tab && tab.active;
              return (
                <li
                  key={tab.label}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3.5 py-2",
                    "text-[0.8125rem] font-medium",
                    active
                      ? "bg-[#fdeae6] text-[#e04b3c] ring-1 ring-[#f8524f]/35"
                      : "bg-[#f6f5f2] text-[#4b4a56]",
                  )}
                >
                  <Glyph className="size-4" />
                  {tab.label}
                </li>
              );
            })}
          </ul>

          <Image
            src={win.preview.image.src}
            alt={win.preview.image.alt}
            width={504}
            height={183}
            sizes="(min-width: 1280px) 30vw, 80vw"
            className="mt-3.5 h-auto w-full rounded-xl object-cover"
          />

          <p className="mt-3.5 text-[0.6875rem] text-[#7b7a85]">
            {win.preview.meta}
          </p>
          <p className="mt-1.5 font-display text-[1.25rem] leading-tight font-bold tracking-[-0.02em] text-[#17161f]">
            {win.preview.lessonTitle}
          </p>

          {win.preview.body.map((paragraph) => (
            <p
              key={paragraph}
              className="mt-2.5 text-[0.8125rem] leading-relaxed text-[#4b4a56]"
            >
              {paragraph}
            </p>
          ))}

          {/*
            Styled as the design's buttons but rendered as spans: this is an
            illustrative product surface, so nothing here should be reachable
            by keyboard or announced as an action that goes nowhere.
          */}
          <p
            aria-hidden="true"
            className="mt-4 flex flex-wrap gap-3 border-t border-[#1c1a19]/8 pt-4"
          >
            <span className="rounded-lg px-4 py-2.5 text-[0.8125rem] font-semibold text-[#17161f] ring-1 ring-[#1c1a19]/14">
              {win.preview.actions.secondary}
            </span>
            <span className="rounded-lg bg-[#f8756a] px-5 py-2.5 text-[0.8125rem] font-semibold text-white">
              {win.preview.actions.primary}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ========================================================================== */
/* PERSONA CARD                                                               */
/* ========================================================================== */

function PersonaCard() {
  const { persona } = studio.window;

  return (
    <div
      className={cn(
        "rounded-2xl bg-[#181921] p-5",
        "shadow-[0_1.75rem_3.5rem_-1.25rem_rgb(0,0,0,0.5)]",
        "duration-normal transition-[translate,box-shadow] ease-out",
        "will-change-[translate] hover:-translate-y-1",
        "hover:shadow-[0_2.25rem_4rem_-1.25rem_rgb(0,0,0,0.6)]",
      )}
    >
      <p className="flex items-center gap-3">
        <PersonSmallIcon className="size-5 shrink-0 text-[#f8756a]" />
        <span className="text-[0.9375rem] font-medium text-white">
          {persona.title}
        </span>
        <span
          className={cn(
            "ml-auto shrink-0 rounded-full px-3 py-1",
            "bg-white/10 text-[0.75rem] text-[#d7d7de]",
          )}
        >
          {persona.chip}
        </span>
      </p>

      <p className="mt-3.5 text-[0.9375rem] leading-relaxed text-[#b9b9c4]">
        {persona.body}
      </p>

      <p className="mt-4 flex items-center gap-3 border-t border-white/10 pt-4">
        <span className="grid size-7 shrink-0 place-items-center rounded-full bg-white/10">
          <PlusIcon className="size-3.5 text-white" />
        </span>
        <span className="text-[0.9375rem] text-[#d7d7de]">{persona.add}</span>
      </p>
    </div>
  );
}

/* ========================================================================== */
/* ARROW                                                                      */
/* ========================================================================== */

/**
 * The hand-drawn arrow from "Add material" into the preview pane.
 *
 * It draws itself on view rather than fading in: the curve is the section's
 * one gesture — raw material becoming a lesson — so watching it travel says
 * something a static line does not.
 *
 * Hidden below `sm`, where the two panes stack and the arrow would point down
 * a gutter that no longer exists.
 */
function StudioArrow({ reduce }: { reduce: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute hidden sm:block",
        /*
          Sits at the pane's lower-right, pointing across the gutter — and
          above the persona card in the stack, which overlaps this corner and
          would otherwise hide the gesture entirely.
        */
        "-right-10 bottom-8 z-1 w-16",
      )}
    >
      <svg
        viewBox="0 0 70 48"
        preserveAspectRatio="xMidYMid meet"
        className="w-full overflow-visible"
      >
        <motion.path
          d="M4 6C30 4 48 16 62 34"
          fill="none"
          stroke="#f8524f"
          strokeWidth={2.4}
          strokeLinecap="round"
          initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "0px 0px 90% 0px" }}
          transition={{ duration: 0.75, delay: 0.7, ease: easeOut }}
        />
        <motion.path
          d="m48 32 15 3-4 -14"
          fill="none"
          stroke="#f8524f"
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduce ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "0px 0px 90% 0px" }}
          transition={{ duration: 0.28, delay: 1.35 }}
        />
      </svg>
    </span>
  );
}
