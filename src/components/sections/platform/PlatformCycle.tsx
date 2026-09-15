"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { Uncopyable } from "@/components/ui/Uncopyable";
import { platform } from "@/content/platform";
import { cn } from "@/lib/utils";

import { PlatformCycleArrows } from "./PlatformCycleArrows";
import { CycleGlyph, TargetIcon, stepIcons } from "./PlatformIcons";

/**
 * PLATFORM CYCLE
 * ---------------------------------------------------------------------------
 * Section 3 of /platform: the copy on the left, six stages in a ring on the
 * right, joined by curved arrows, with a statement at the centre.
 *
 * THE RING PLAYS AS A TIMELAPSE. The cycle is a sequence — each stage feeds
 * the next — so it is shown as one: a card lands, the arrow out of it draws
 * itself, its head arrives, and the next card lands as that arrow finishes.
 * Six of those in a chain, closing back on the first. Fading in a finished
 * diagram would show the same picture and say none of it.
 *
 * ONE CLOCK RUNS ALL OF IT. `beats` below is the single timeline: every card
 * reads its own arrival from it, and the arrows component is handed the same
 * object so a connector draws exactly when the card it leaves has settled.
 * Two timelines would drift the moment either was edited.
 *
 * THE ARROW HEADS ARE DERIVED, NOT PLACED — see PlatformCycleArrows for how
 * and why. That is the part of this section most easily got subtly wrong.
 *
 * THE GEOMETRY IS MEASURED. The ring spans 810x701 of the comp and each card
 * sits where the comp puts it, expressed as percentages of one aspect-locked
 * box so the cards and the arrows between them cannot drift apart.
 *
 * THE SIX CARDS ARE REBUILT IN MARKUP, as the hero's are: the design ships
 * them as PNGs with their text baked in (~810KB), and rebuilt they stay sharp,
 * cost a fraction of that, and can arrive one at a time. They are decorative,
 * so the whole ring is `Uncopyable` — hidden from assistive technology, its
 * text unselectable. The stages are also written out as a plain ordered list
 * for screen readers, since the sequence IS the content here.
 *
 * BELOW LG the ring is dropped and the stages become that list, visible. Six
 * cards and six connectors at phone width would be illegible.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { cycle } = platform;

/**
 * Where each card sits, measured from the comp as percentages of the ring's
 * 810x701 box.
 */
const placement = {
  define: "left-[33.1%] top-0 w-[29.9%]",
  identify: "left-[68.9%] top-[16.3%] w-[30.5%]",
  create: "left-[68.5%] top-[53.2%] w-[31.5%]",
  deliver: "left-[34.0%] top-[74.0%] w-[30.4%]",
  practise: "left-0 top-[53.1%] w-[30.7%]",
  measure: "left-[0.6%] top-[16.3%] w-[29.1%]",
} as const;

/**
 * THE TIMELINE.
 *
 * Each stage's card lands on its beat; the arrow leaving that stage draws
 * immediately after, and the next card lands as the arrow's head arrives. The
 * 0.62s step is the card's settle plus the arrow's draw, so the chain reads as
 * continuous rather than as six separate events.
 */
const STEP = 0.62;
const beats = {
  define: 0.15,
  identify: 0.15 + STEP,
  create: 0.15 + STEP * 2,
  deliver: 0.15 + STEP * 3,
  practise: 0.15 + STEP * 4,
  measure: 0.15 + STEP * 5,
} as const;

/** The arrow out of a stage draws once that stage's card has settled. */
const arrowBeats = Object.fromEntries(
  Object.entries(beats).map(([id, at]) => [id, at + 0.34]),
);

export function PlatformCycle() {
  const reduce = useReducedMotion();

  /**
   * ONE TRIGGER FOR THE WHOLE RING.
   *
   * Every card and arrow waits on this single flag rather than watching the
   * viewport for itself. Two earlier bugs came from not doing that:
   *
   *   • the arrows used `animate`, which fires on MOUNT — so they had drawn
   *     themselves before the reader ever scrolled to the section;
   *   • each card used its own `whileInView`, so a card's timer began when
   *     THAT card crossed the threshold. Scrolling in, the lower cards
   *     qualified first and the sequence played out of order.
   *
   * With one flag the six delays below are measured from the same instant, so
   * the chain runs 01, its arrow, 02, its arrow, and so on regardless of how
   * the section comes into view.
   */
  const [started, setStarted] = useState(false);

  const rise = (delay: number) => ({
    initial: reduce ? "shown" : "hidden",
    whileInView: "shown",
    viewport: { once: true, amount: "some" } as const,
    variants: {
      hidden: { opacity: 0, y: 18 },
      shown: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          delay: reduce ? 0 : delay,
          ease: easeOut,
        },
      },
    },
  });

  return (
    <section
      // The challenge band's arrow points here.
      id="cycle"
      className="relative scroll-mt-24 overflow-hidden bg-[#fbf8fe]"
    >
      <div aria-hidden="true" className="absolute inset-0">
        <Image
          src={cycle.backdrop.src}
          alt={cycle.backdrop.alt}
          fill
          sizes="100vw"
          className="object-cover object-right"
        />
      </div>

      <Container width="hero" className="relative">
        <div
          className={cn(
            "grid items-center gap-12",
            "py-20 sm:py-24 lg:py-24 xl:py-28",
            "lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-10",
          )}
        >
          {/* =========================== Statement ===================== */}
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "text-[0.6875rem] font-semibold tracking-[0.18em] uppercase",
                "text-brand-600 sm:text-xs",
              )}
            >
              {cycle.eyebrow}
            </motion.p>

            <h2
              className={cn(
                "mt-5 font-display font-bold tracking-[-0.03em]",
                "leading-[1.05] text-neutral-900",
                "text-[1.875rem] sm:text-[2.25rem] xl:text-[3rem]",
              )}
            >
              {cycle.headline.map((line, index) => (
                <motion.span
                  key={line.text}
                  {...rise(0.08 + index * 0.07)}
                  className={cn(
                    "block",
                    "accent" in line && line.accent && "text-brand-600",
                  )}
                >
                  {line.text}
                </motion.span>
              ))}
            </h2>

            <motion.p
              {...rise(0.3)}
              className={cn(
                "mt-6 max-w-[30rem] leading-relaxed text-pretty",
                "text-[1rem] text-neutral-600 sm:text-[1.0625rem]",
              )}
            >
              {cycle.description}
            </motion.p>

            {/* The note on its own tinted panel. */}
            <motion.div
              {...rise(0.38)}
              className={cn(
                "mt-8 flex max-w-[30rem] items-center gap-4",
                "rounded-2xl bg-[#ece4fb]/70 px-5 py-4",
              )}
            >
              <TargetIcon
                className="size-9 shrink-0 text-brand-600"
                aria-hidden="true"
              />
              <p className="text-[0.875rem] leading-relaxed text-neutral-700">
                {cycle.note.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </motion.div>
          </div>

          {/* ============================= Ring ======================== */}
          <Uncopyable
            className={cn(
              "relative hidden lg:block",
              // The comp's own proportions, so every percentage above means
              // the same thing at any width.
              "aspect-[810/701] w-full",
            )}
          >
            {/*
              The whole ring's trigger. `amount: 0.25` fires once a quarter of
              the graphic is showing, which is early enough that the first card
              lands as the reader arrives rather than after they have stopped.
            */}
            <motion.div
              aria-hidden="true"
              className="absolute inset-0"
              initial={false}
              whileInView="seen"
              viewport={{ once: true, amount: 0.25 }}
              onViewportEnter={() => setStarted(true)}
            />

            {/* The six connectors, on the same clock as the cards. */}
            <PlatformCycleArrows
              beats={arrowBeats}
              reduce={reduce ?? false}
              started={started}
            />

            {/* --------------------- The centre ------------------- */}
            <motion.div
              initial={reduce ? "shown" : "hidden"}
              animate={reduce || started ? "shown" : "hidden"}
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                shown: {
                  opacity: 1,
                  scale: 1,
                  transition: {
                    duration: 0.6,
                    delay: reduce ? 0 : 0.05,
                    ease: easeOut,
                  },
                },
              }}
              className={cn(
                "absolute top-1/2 left-1/2 z-10 w-[30%]",
                "-translate-x-1/2 -translate-y-1/2 text-center",
              )}
            >
              <CycleGlyph className="mx-auto size-11 text-brand-600" />
              <p className="mt-4 font-display text-[1.125rem] leading-tight font-bold text-neutral-900 xl:text-[1.3125rem]">
                {cycle.centre.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
              <p
                className={cn(
                  "mt-4 inline-block rounded-full bg-[#e9dcfb]",
                  "px-4 py-2 text-[0.8125rem] font-medium text-brand-700",
                )}
              >
                {cycle.centre.pill}
              </p>
            </motion.div>

            {/* ---------------------- The stages ------------------ */}
            {cycle.steps.map((step) => {
              const Icon = stepIcons[step.icon];

              return (
                <motion.div
                  key={step.id}
                  initial={reduce ? "shown" : "hidden"}
                  animate={reduce || started ? "shown" : "hidden"}
                  variants={{
                    hidden: { opacity: 0, y: 16, scale: 0.94 },
                    shown: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: {
                        duration: 0.5,
                        delay: reduce ? 0 : beats[step.id],
                        ease: easeOut,
                      },
                    },
                  }}
                  className={cn("absolute", placement[step.id])}
                >
                  <div
                    className={cn(
                      "group/step h-full rounded-[1.125rem] bg-white p-4",
                      "ring-1 ring-neutral-200/70",
                      "shadow-[0_16px_38px_-24px_rgb(60_30_120/0.3)]",
                      // The design tops the first card with a gold rule,
                      // where the cycle begins.
                      "accent" in step &&
                        step.accent &&
                        "border-t-[3px] border-t-[#f0b429]",
                      "transition-[transform,box-shadow] duration-300",
                      "ease-[cubic-bezier(0.16,1,0.3,1)]",
                      "hover:-translate-y-1",
                      "hover:shadow-[0_24px_52px_-24px_rgb(60_30_120/0.42)]",
                      "motion-reduce:transition-none",
                      "motion-reduce:hover:translate-y-0",
                    )}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className={cn(
                          "grid size-8 shrink-0 place-items-center rounded-full",
                          "text-[0.75rem] font-bold",
                          "accent" in step && step.accent
                            ? "bg-[#fdf1d8] text-[#9a6510]"
                            : "bg-brand-50 text-brand-700",
                        )}
                      >
                        {step.number}
                      </span>
                      <Icon
                        className={cn(
                          "size-6 text-brand-600",
                          "transition-transform duration-300",
                          "ease-[cubic-bezier(0.16,1,0.3,1)]",
                          "group-hover/step:scale-110",
                          "motion-reduce:transition-none",
                          "motion-reduce:group-hover/step:scale-100",
                        )}
                      />
                    </div>

                    <p className="mt-3 font-display text-[0.9375rem] leading-tight font-bold text-neutral-900">
                      {step.title}
                    </p>
                    <p className="mt-1.5 text-[0.75rem] leading-relaxed text-neutral-600">
                      {step.description}
                    </p>

                    <p
                      className={cn(
                        "mt-3 border-t border-neutral-200/80 pt-2.5",
                        "text-center text-[0.75rem] font-semibold text-brand-600",
                      )}
                    >
                      {step.engines.join(" · ")}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </Uncopyable>

          {/*
            The same six stages as a plain list, below lg. The ring is
            decorative and hidden from assistive tech, so this is where the
            sequence actually lives for a screen reader and at phone width.
          */}
          <ol className="flex flex-col gap-4 lg:hidden">
            {cycle.steps.map((step, index) => {
              const Icon = stepIcons[step.icon];

              return (
                <motion.li
                  key={step.id}
                  {...rise(0.06 * index)}
                  className={cn(
                    "rounded-2xl bg-white p-5",
                    "ring-1 ring-neutral-200/70",
                    "shadow-[0_16px_38px_-26px_rgb(60_30_120/0.3)]",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "grid size-8 shrink-0 place-items-center rounded-full",
                        "bg-brand-50 text-[0.75rem] font-bold text-brand-700",
                      )}
                    >
                      {step.number}
                    </span>
                    <Icon
                      className="size-5 shrink-0 text-brand-600"
                      aria-hidden="true"
                    />
                    <p className="font-display text-[1rem] font-bold text-neutral-900">
                      {step.title}
                    </p>
                  </div>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-neutral-600">
                    {step.description}
                  </p>
                  <p className="mt-2 text-[0.8125rem] font-semibold text-brand-600">
                    {step.engines.join(" · ")}
                  </p>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
