"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { Uncopyable } from "@/components/ui/Uncopyable";
import { sop } from "@/content/sop";
import { cn } from "@/lib/utils";

import { benefitIcons, type BenefitIconKey } from "./SopIcons";

/**
 * SOP FLOW
 * ---------------------------------------------------------------------------
 * Section 4 of the LurnySOP page: the copy and four benefits on the left, and
 * on the right a photograph whose left edge is an S-curve, with three workflow
 * cards floating over it.
 *
 * THE CURVE IS A CLIP PATH, NOT A CROPPED IMAGE. The design does not show the
 * whole photograph — its left edge sweeps in an S so the pale page flows into
 * the picture. Baking that edge into the asset would fix it to one aspect
 * ratio and one background colour; clipping in the browser keeps the photo a
 * plain rectangle that `object-cover` can crop at any size, and lets the curve
 * scale with the panel.
 *
 * `clipPathUnits="objectBoundingBox"` means the path is written in 0-1
 * fractions of the element it clips, so it stretches with the panel instead of
 * needing pixel coordinates.
 *
 * THE CURVE'S SHAPE IS TRACED FROM THE COMP (section4.png, 1582x886). Walking
 * the photo's left edge gives, as fractions of the comp's full width and
 * height:
 *     (0.477, 0.00) (0.465, 0.08) (0.506, 0.23) (0.534, 0.37)
 *     (0.530, 0.49) (0.506, 0.63) (0.499, 0.79) (0.556, 0.94) (0.619, 1.00)
 * Those are fractions of the WHOLE comp; the panel they clip is the right-hand
 * half, so they are re-expressed below against the panel's own box.
 *
 * A first trace followed the soft halo outside the photo rather than the photo
 * itself and ran ~50px light the whole way down; the numbers above are the
 * corrected pass, checked by drawing them back over the comp.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { flow } = sop;

/**
 * The S-curve, in objectBoundingBox units (0-1 of the clipped element).
 *
 * The comp's curve spans x 0.465-0.619 of the full frame. The photo panel
 * starts at roughly x=0.40 of the frame and runs to its right edge, so those
 * readings map onto the panel as the values below — the curve occupies the
 * left ~0.36 of the panel and the rest is solid photo.
 */
const CURVE =
  "M0.13,0 C0.09,0.10 0.20,0.18 0.24,0.30 C0.28,0.42 0.26,0.52 0.20,0.63 C0.15,0.73 0.16,0.84 0.27,0.93 C0.33,0.98 0.38,0.99 0.42,1 L1,1 L1,0 Z";

/** The two status chips on the main card, sampled from the comp. */
const chipTones = {
  done: { bg: "#def5ed", fg: "#2a956e" },
  progress: { bg: "#fbf3d8", fg: "#cf801a" },
} as const;

export function SopFlow() {
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

  /* Both states always declared — empty variants would leave elements stuck
     at opacity 0 under reduced motion. */
  const shownNow = { opacity: 1, y: 0, scale: 1, transition: { duration: 0 } };

  const list = reduce
    ? { hidden: {}, shown: {} }
    : {
        hidden: {},
        shown: { transition: { delayChildren: 0.26, staggerChildren: 0.1 } },
      };

  const item = reduce
    ? { hidden: shownNow, shown: shownNow }
    : {
        hidden: { opacity: 0, y: 16 },
        shown: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: easeOut },
        },
      };

  /* The cards arrive over the photo once it is in place. */
  const cardGroup = reduce
    ? { hidden: {}, shown: {} }
    : {
        hidden: {},
        shown: { transition: { delayChildren: 0.45, staggerChildren: 0.14 } },
      };

  const card = reduce
    ? { hidden: shownNow, shown: shownNow }
    : {
        hidden: { opacity: 0, y: 18, scale: 0.97 },
        shown: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.55, ease: easeOut },
        },
      };

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-[#fefdfe]",
        "flex flex-col lg:block",
        "py-16 sm:py-20 lg:py-0",
      )}
    >
      <Image
        src="/assets/images/sop/flow-backdrop.webp"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="-z-10 object-cover"
      />

      {/*
        THE PHOTO PANEL. Above lg it is pinned to the section's right half and
        bleeds to the top, bottom and right edges, as the comp has it; the
        copy then sits in a normal container over the left half.

        Below lg it returns to the flow beneath the copy, because at phone
        width a half-width photo would leave the text in a column too narrow to
        read — and the curve, which is a left edge, has nothing to flow into.
      */}
      <div
        className={cn(
          /*
            ORDER: below lg the copy comes first and this panel follows, which
            is how sections 2 and 3 stack too — the argument should arrive
            before its illustration. `order-2` does that without moving the
            markup, and `lg:order-none` hands it back to the absolute
            positioning above lg.

            An earlier pass left this first in the flow, so a phone opened the
            section on a photograph with no heading above it.
          */
          "relative order-2 mt-12 h-[30rem] w-full sm:h-[34rem]",
          "lg:absolute lg:inset-y-0 lg:right-0 lg:order-none lg:mt-0 lg:h-full lg:w-[60%]",
        )}
      >
        <svg
          aria-hidden="true"
          className="absolute size-0"
          focusable="false"
        >
          <defs>
            {/* The traced S-curve. See the note at the top of this file. */}
            <clipPath id="sop-flow-curve" clipPathUnits="objectBoundingBox">
              <path d={CURVE} />
            </clipPath>
          </defs>
        </svg>

        <motion.div
          initial={reduce ? "shown" : "hidden"}
          whileInView="shown"
          viewport={{ once: true, amount: 0.2 }}
          variants={
            reduce
              ? { hidden: shownNow, shown: shownNow }
              : {
                  hidden: { opacity: 0, scale: 1.04 },
                  shown: {
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.8, ease: easeOut },
                  },
                }
          }
          className="absolute inset-0"
        >
          {/*
            The curve is applied only from lg up. Below that the panel is full
            width with nothing to its left, so clipping would simply eat the
            photograph's edge for no reason.
          */}
          <div className="relative size-full lg:[clip-path:url(#sop-flow-curve)]">
            <Image
              src={flow.photo.src}
              alt={flow.photo.alt}
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              /*
                The comp shows the woman from the waist up with her hands and
                the desk visible. The source is square (1254x1254) and the
                panel is tall, so `object-top` keeps the head in frame and
                lets the crop fall off the bottom of the desk rather than
                cutting the hands, which centring did.
              */
              className="object-cover object-[58%_top] lg:object-[58%_top]"
            />
          </div>
        </motion.div>

        {/* ==================== The floating cards ==================== */}
        {/*
          Decoration: an illustrative workflow, not this reader's data — so the
          group is Uncopyable and hidden, exactly as the hero's panel is. The
          photo above keeps its own alt text, which is real content.
        */}
        <Uncopyable className="absolute inset-0">
          <motion.div
            initial={reduce ? "shown" : "hidden"}
            whileInView="shown"
            viewport={{ once: true, amount: 0.25 }}
            variants={cardGroup}
            className="absolute inset-0"
          >
            {/* Main card: measured to the comp's right-hand area. */}
            <motion.div
              variants={card}
              className={cn(
                "absolute rounded-2xl bg-white p-4 sm:p-5",
                "shadow-[0_24px_50px_-26px_rgb(28_10_60/0.45)]",
                /* Comp: 41% of the panel wide, 2.5% in from its right edge,
                   its foot 31% up from the bottom. */
                /* Below lg the panel is short and wide, so the cards sit
                   along its foot rather than over the subject's face. */
                "right-[3%] bottom-[30%] w-[58%] sm:w-[46%]",
                "lg:right-[2.5%] lg:bottom-[31%] lg:w-[41%]",
              )}
            >
              <p className="text-[0.625rem] font-semibold tracking-[0.1em] text-[#8e6ad7] uppercase sm:text-[0.6875rem]">
                {flow.cards.review.eyebrow}
              </p>
              <p className="mt-1.5 font-display text-[1rem] font-bold tracking-[-0.015em] text-[#150240] sm:text-[1.125rem]">
                {flow.cards.review.title}
              </p>

              <div className="mt-3">
                {flow.cards.review.rows.map((row, index) => {
                  const tone = chipTones[row.tone as keyof typeof chipTones];
                  return (
                    <div
                      key={row.label}
                      className={cn(
                        "flex items-center justify-between gap-3 py-2",
                        index > 0 && "border-t border-[#efedf6]",
                      )}
                    >
                      <span className="truncate text-[0.75rem] text-[#524f87] sm:text-[0.8125rem]">
                        {row.label}
                      </span>
                      <span
                        style={{ backgroundColor: tone.bg, color: tone.fg }}
                        className="shrink-0 rounded-full px-2.5 py-1 text-[0.6875rem] font-medium sm:text-[0.75rem]"
                      >
                        {row.status}
                      </span>
                    </div>
                  );
                })}
              </div>

              <p className="mt-2 border-t border-[#efedf6] pt-2.5 text-[0.75rem] text-[#7d73b2] sm:text-[0.8125rem]">
                {flow.cards.review.owner}
              </p>
            </motion.div>

            {/* The two smaller cards, side by side beneath it. */}
            <motion.div
              variants={card}
              className={cn(
                "absolute rounded-2xl bg-white p-3.5 sm:p-4",
                "shadow-[0_20px_44px_-26px_rgb(28_10_60/0.45)]",
                /* Comp: 30% wide, its left edge 30% into the panel. */
                "bottom-[5%] left-[4%] w-[44%] sm:w-[34%]",
                "lg:bottom-[13%] lg:left-[30%] lg:w-[30%]",
              )}
            >
              <p className="font-display text-[0.875rem] font-bold tracking-[-0.01em] text-[#170443] sm:text-[1rem]">
                {flow.cards.approval.title}
              </p>
              <p className="mt-1 text-[0.75rem] text-[#524f83] sm:text-[0.8125rem]">
                {flow.cards.approval.body}
              </p>
              <span className="mt-2.5 inline-block rounded-full bg-[#fcf3da] px-2.5 py-1 text-[0.6875rem] font-medium text-[#cf7515] sm:text-[0.75rem]">
                {flow.cards.approval.status}
              </span>
            </motion.div>

            <motion.div
              variants={card}
              className={cn(
                "absolute rounded-2xl bg-white p-3.5 sm:p-4",
                "shadow-[0_20px_44px_-26px_rgb(28_10_60/0.45)]",
                /* Comp: 35% wide, 2.5% in from the right, level with the
                   manager card. */
                "right-[3%] bottom-[5%] w-[44%] sm:w-[34%]",
                "lg:right-[2.5%] lg:bottom-[13%] lg:w-[35%]",
              )}
            >
              <p className="font-display text-[0.875rem] font-bold tracking-[-0.01em] text-[#17073f] sm:text-[1rem]">
                {flow.cards.evidence.title}
              </p>
              {flow.cards.evidence.items.map((line) => (
                <p
                  key={line}
                  className="mt-1 text-[0.75rem] text-[#57558a] sm:text-[0.8125rem]"
                >
                  {line}
                </p>
              ))}
            </motion.div>
          </motion.div>
        </Uncopyable>
      </div>

      {/* =========================== The copy ======================== */}
      <Container width="hero" className="relative order-1 lg:order-none">
        <div className="lg:grid lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1fr)]">
          <div className="lg:py-24">
            <motion.p
              {...rise(0)}
              className={cn(
                "text-[0.75rem] font-semibold tracking-[0.2em] uppercase",
                "text-[#8412ff] sm:text-[0.8125rem]",
              )}
            >
              {flow.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.08)}
              className={cn(
                "mt-5 font-display font-bold tracking-[-0.035em]",
                "leading-[1.06]",
                "text-[2rem] sm:text-[2.5rem] xl:text-[3.25rem]",
              )}
            >
              {flow.headline.map((line, index) => (
                <span
                  key={line.text}
                  className={cn(
                    "block",
                    line.accent ? "text-[#7400ff]" : "text-[#12003b]",
                  )}
                >
                  {line.text}
                  {index < flow.headline.length - 1 && " "}
                </span>
              ))}
            </motion.h2>

            <motion.p
              {...rise(0.16)}
              className={cn(
                "mt-6 max-w-[32rem] leading-relaxed text-pretty",
                "text-[1rem] text-[#3a346d] sm:text-[1.0625rem]",
              )}
            >
              {flow.description}
            </motion.p>

            {/* ------------------------ The benefits ------------------ */}
            <motion.ul
              initial={reduce ? "shown" : "hidden"}
              whileInView="shown"
              viewport={{ once: true, amount: 0.2 }}
              variants={list}
              className="mt-8 space-y-5"
            >
              {flow.benefits.map((benefit) => {
                const Glyph = benefitIcons[benefit.id as BenefitIconKey];
                return (
                  <motion.li
                    key={benefit.id}
                    variants={item}
                    className="group/benefit flex items-start gap-4 sm:gap-5"
                  >
                    <span
                      className={cn(
                        "mt-0.5 shrink-0 text-[#6b5bb5]",
                        "transition-transform duration-300 ease-out",
                        "group-hover/benefit:scale-110",
                        "motion-reduce:transition-none motion-reduce:group-hover/benefit:scale-100",
                      )}
                    >
                      <Glyph className="size-7 sm:size-8" />
                    </span>

                    <div className="min-w-0">
                      <h3 className="font-display text-[1rem] font-bold tracking-[-0.015em] text-[#14013e] sm:text-[1.0625rem]">
                        {benefit.title}
                      </h3>
                      <p className="mt-0.5 text-[0.9375rem] leading-relaxed text-pretty text-[#443f78]">
                        {benefit.body}
                      </p>
                    </div>
                  </motion.li>
                );
              })}
            </motion.ul>

            <motion.p
              {...rise(0.3)}
              className={cn(
                "mt-8 border-t border-[#e7e2f2] pt-5",
                "text-[0.9375rem] text-[#7c6baf]",
              )}
            >
              {flow.footnote}
            </motion.p>
          </div>
        </div>
      </Container>
    </section>
  );
}
