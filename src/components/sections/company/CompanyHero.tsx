"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { company } from "@/content/company";
import { cn } from "@/lib/utils";

import { ArrowDownIcon, cardIcons } from "./CompanyIcons";

/**
 * COMPANY HERO
 * ---------------------------------------------------------------------------
 * Section 1 of /company: the statement on the left, the seated subject on the
 * right, over a bright office backdrop.
 *
 * THE SCENE IS THREE LAYERS, not one flattened render, and the order matters:
 *
 *   1. The BACKDROP photograph, full-bleed, anchored right so its window and
 *      wall boards stay in frame as the viewport narrows.
 *   2. The SUBJECT, cut out of that same scene and shipped with alpha. She is
 *      a separate raster so she can sit at her own scale against the right
 *      edge while the backdrop behind her is free to crop.
 *   3. The SPEECH BUBBLE and its two cards, DRAWN rather than shipped.
 *
 * WHY THE BUBBLE IS DRAWN. The supplied overlay bakes the two cards' text into
 * the picture. Rebuilding it costs a rounded div and a short SVG arc — the
 * shape is a circle with a tail, and its fill is a two-stop gradient sampled
 * from the render (#D9D9FE to #BCBBFD) — and in return the words stay
 * selectable, translatable, crisp on a high-DPI screen and readable by a
 * screen reader. Cropping them out of the raster was not an option: the cards
 * overlap the bubble's edge and its glow, so removing them leaves scars no
 * interpolation can fill.
 *
 * BOTH PHOTOGRAPHS ARE DECORATIVE. The backdrop's wall text is set dressing
 * inside the photograph rather than UI, and the hero's own copy carries the
 * message, so neither image repeats it in alt text.
 *
 * BELOW LG the scene is dropped entirely. At phone width the subject and the
 * copy cannot both hold the frame, and the copy is what matters; the bubble
 * cards go with her, since they are her side of the conversation.
 *
 * THE SCENE ARRIVES IN ORDER, not all at once. A conversation is the thing
 * being depicted, so it plays as one: the bubble opens, she settles into it,
 * her question appears, the arc draws across to the answer, and the answer
 * lands. Bringing them up together — which is what one shared transition
 * does — reads as a flat illustration and loses the exchange.
 *
 * The timings below are cumulative and deliberately slow at the end: the gap
 * before the answer is the beat that makes it feel like a reply rather than a
 * second label. Under prefers-reduced-motion every step resolves at once, so
 * the sequence never delays the content for someone who opted out.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { hero } = company;

export function CompanyHero() {
  const reduce = useReducedMotion();

  /**
   * The statement animates on mount rather than in view: it is above the
   * fold, so a scroll trigger would either fire instantly or never.
   */
  const rise = (delay: number) => ({
    initial: reduce ? "shown" : "hidden",
    animate: "shown",
    variants: {
      hidden: { opacity: 0, y: 18 },
      shown: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay, ease: easeOut },
      },
    },
  });

  /**
   * The scene's beats, in the order the conversation happens. Under
   * prefers-reduced-motion every delay collapses to zero, so the whole scene
   * is simply present rather than arriving late.
   */
  const beat = reduce
    ? { bubble: 0, subject: 0, question: 0, arc: 0, answer: 0 }
    : { bubble: 0.25, subject: 0.45, question: 0.85, arc: 1.15, answer: 1.5 };

  /** The bubble and the cards scale up slightly as they fade in. */
  const pop = (delay: number) => ({
    initial: reduce ? "shown" : "hidden",
    animate: "shown",
    variants: {
      hidden: { opacity: 0, scale: 0.94, y: 10 },
      shown: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.55, delay, ease: easeOut },
      },
    },
  });

  return (
    <section className="relative overflow-hidden bg-white">
      {/* ---------------------------- Backdrop --------------------------- */}
      {/* Hidden below lg, where the section falls back to a soft wash. */}
      <div aria-hidden="true" className="absolute inset-0 hidden lg:block">
        <Image
          src={hero.room.src}
          alt={hero.room.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-right"
        />
        {/* A scrim over the left half so the headline holds its contrast
            wherever the photograph crops. */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent" />
      </div>

      {/* The phone/tablet ground: the backdrop's own lilac, flattened. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-[#f6f4fe] via-white to-[#f3f1fd] lg:hidden"
      />

      <Container width="hero" className="relative">
        <div
          className={cn(
            "grid items-center gap-12",
            "py-20 sm:py-24 lg:py-28 xl:py-32",
            "lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-8",
          )}
        >
          {/* =========================== Statement ===================== */}
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "text-[0.6875rem] font-semibold tracking-[0.2em] uppercase",
                "text-brand-600 sm:text-xs",
              )}
            >
              {hero.eyebrow}
            </motion.p>

            <motion.h1
              {...rise(0.08)}
              className={cn(
                "mt-6 font-display font-bold tracking-[-0.03em]",
                "leading-[1.06] text-neutral-900",
                // Measured from the design at ~68px on a 1440 frame.
                "text-[2.25rem] sm:text-[2.75rem] xl:text-[3.75rem]",
              )}
            >
              {hero.headline.map((line) => (
                <span
                  key={line.text}
                  className={cn(
                    "block",
                    // The design sets the closing line in violet.
                    "accent" in line && line.accent && "text-brand-600",
                  )}
                >
                  {line.text}
                </span>
              ))}
            </motion.h1>

            <motion.p
              {...rise(0.16)}
              className={cn(
                "mt-7 max-w-[34rem] leading-relaxed text-pretty",
                "text-[1rem] text-neutral-600 sm:text-[1.0625rem]",
              )}
            >
              {hero.description}
            </motion.p>

            <motion.p {...rise(0.24)} className="mt-9">
              <a
                href={hero.action.href}
                className={cn(
                  "group inline-flex items-center gap-2.5",
                  "border-b border-brand-500/40 pb-1.5",
                  "text-[0.9375rem] font-medium text-brand-600",
                  "transition-colors hover:border-brand-600 hover:text-brand-700",
                  "focus-visible:outline-2 focus-visible:outline-offset-4",
                  "focus-visible:outline-brand-500",
                )}
              >
                {hero.action.label}
                <ArrowDownIcon
                  className={cn(
                    "size-4 transition-transform duration-300",
                    "group-hover:translate-y-0.5",
                  )}
                />
              </a>
            </motion.p>
          </div>

          {/* ============================ Scene ======================== */}
          {/*
            The subject and her speech bubble. Hidden below lg — see the note
            at the top of the file.
          */}
          {/* The wrapper itself does not animate — each layer below arrives
              on its own beat, so animating the group too would fade the
              whole scene in first and flatten the sequence. */}
          <div
            className="relative hidden lg:block"
            // The aspect the two rasters share, so the bubble's percentage
            // positions track the subject at any width.
            style={{ aspectRatio: "1536 / 1024" }}
          >
            {/* 1 — the bubble opens. */}
            <motion.div
              {...pop(beat.bubble)}
              aria-hidden="true"
              className="absolute top-[2%] left-[8%] h-[62%] w-[52%] origin-bottom-left"
            >
              <div
                className={cn(
                  "size-full rounded-full",
                  "bg-gradient-to-b from-[#D9D9FE] to-[#BCBBFD]",
                  "shadow-[0_0_70px_18px_rgb(196_193_253/0.55)]",
                )}
              />
              {/* The tail, at the bubble's lower left. */}
              <span
                className={cn(
                  "absolute bottom-[3%] left-[6%] size-[18%]",
                  "bg-[#BFBEFD]",
                  "[clip-path:polygon(100%_0,100%_100%,0_100%)]",
                  "rotate-[18deg] rounded-bl-[18%]",
                )}
              />
            </motion.div>

            {/* 2 — she settles in, rising a little as she fades up. */}
            <motion.div
              initial={reduce ? "shown" : "hidden"}
              animate="shown"
              variants={{
                hidden: { opacity: 0, y: 26 },
                shown: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.8,
                    delay: beat.subject,
                    ease: easeOut,
                  },
                },
              }}
              className="absolute inset-0"
            >
              <Image
                src={hero.subject.src}
                alt={hero.subject.alt}
                fill
                priority
                sizes="(min-width: 1024px) 55vw, 0px"
                className="object-contain object-bottom"
              />
            </motion.div>

            {/*
              4 — the arc draws from the question across to the answer.

              `pathLength` is animated rather than a dash offset, so the
              stroke draws in the direction the path is written without
              needing its measured length hard-coded here.
            */}
            <svg
              aria-hidden="true"
              viewBox="0 0 1536 1024"
              className="absolute inset-0 size-full"
              fill="none"
            >
              <motion.path
                d="M800 252c92 8 158 62 178 152"
                stroke="#7436FB"
                strokeWidth="4"
                strokeLinecap="round"
                initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 0.6,
                  delay: beat.arc,
                  ease: easeOut,
                }}
              />
            </svg>

            {/*
              3 and 5 — the question, then the answer after the arc reaches
              it. Indexing the beat rather than staggering by a fixed step,
              because the gap between them is not even: the arc draws in
              between, and the pause before the reply is the point.
            */}
            {hero.bubble.cards.map((card, index) => {
              const Icon = cardIcons[card.icon];

              return (
                <motion.div
                  key={card.text}
                  {...pop(index === 0 ? beat.question : beat.answer)}
                  className={cn(
                    "absolute flex items-center gap-3 rounded-2xl",
                    "bg-white px-4 py-3",
                    "shadow-[0_10px_30px_-12px_rgb(60_45_120/0.28)]",
                    // Measured from the design: the question sits upper-left
                    // of the bubble, the answer lower-right across the arc.
                    index === 0
                      ? "top-[17%] left-[16%] max-w-[15rem]"
                      : "top-[38%] left-[56%] max-w-[14rem]",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "grid size-9 shrink-0 place-items-center rounded-full",
                      "bg-[#EFECFE] text-brand-600",
                    )}
                  >
                    <Icon className="size-5" />
                  </span>
                  <p className="text-[0.9375rem] leading-snug font-medium text-pretty text-neutral-900">
                    {card.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
