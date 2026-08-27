"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { Uncopyable } from "@/components/ui/Uncopyable";
import { industriesPage } from "@/content/industries-page";
import { cn } from "@/lib/utils";

/**
 * INDUSTRIES HEALTHCARE
 * ---------------------------------------------------------------------------
 * Section 4 of the Industries page, and the inverse of the BFSI section: a
 * light ground, copy and three points on the left, and a photograph carrying
 * five cards down the right.
 *
 * THE PHOTOGRAPH IS THE SECTION'S BACKGROUND, not a framed image beside the
 * copy. The supplied asset has its left fade into cream baked in, which is
 * what lets the headline sit over it with no scrim of our own — so it is
 * placed full-bleed and the copy simply sits on top.
 *
 * THE RAIL
 * A vertical line down the left of the card stack with a node at each card,
 * as the design draws it. It is one absolutely-positioned element behind the
 * cards rather than a border per card, so the segments between cards join up
 * into a continuous run.
 *
 * The nodes are positioned by flex rather than measured: each card owns its
 * own node, centred on its first line, so the dot cannot drift from the card
 * it belongs to however the text reflows.
 *
 * THE CARDS ARE DRAWN from content — `kind` selects what sits under each
 * title. They are <Uncopyable> and aria-hidden: they imitate product UI, and
 * their text is not real page copy. The section's heading and its three
 * points are, and sit outside the wrapper.
 *
 * Everything is sized in `cqw` against a container query on the stack, so the
 * cards scale with their own column rather than with the viewport — the same
 * reasoning as the BFSI overlay.
 */

const { healthcare } = industriesPage;

/** Motion's string easings are not typed, so the cubic curve is spelled out. */
const easeOut = [0.16, 1, 0.3, 1] as const;

/** One placeholder rule inside a "lines" card. */
function PlaceholderLine({ width }: { width: number }) {
  return (
    <span
      className="block h-[0.7cqw] rounded-full bg-neutral-200"
      style={{ width: `${width}%` }}
    />
  );
}

export function IndustriesHealthcare() {
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
    <section className="relative isolate overflow-hidden bg-[#f7f3ee] py-section-lg text-neutral-900">
      {/* ===================== Background layers ====================== */}
      {/*
        The photograph, full-bleed. Its left fade into cream is part of the
        asset, so no gradient of our own is needed over the copy.

        Hidden below lg: at narrower widths the copy would sit on the busy
        middle of the frame rather than on the faded edge, and the cards
        stack beneath rather than over it.
      */}
      {/*
        Anchored to the RIGHT ~72% rather than full-bleed.

        Full-bleed `object-cover` crops the asset's own faded left edge out of
        frame, which put the nurse directly under the headline and made the
        copy unreadable. Sized this way the fade lands over the empty middle
        column, which is what the design uses to hand the eye from copy to
        photograph.
      */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-y-0 right-0 -z-10 select-none",
          "hidden w-[72%] lg:block",
        )}
      >
        <Image
          src={healthcare.scene.src}
          alt={healthcare.scene.alt}
          fill
          sizes="(min-width: 1024px) 72vw, 0px"
          className="object-cover object-right"
        />
      </div>

      {/*
        A short scrim over the fade's inner edge. The asset fades to its own
        cream, which is a touch lighter than this section's ground — without
        this the seam between the two reads as a visible vertical band.
      */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 -z-10 hidden lg:block",
          "bg-[linear-gradient(90deg,#f7f3ee_26%,rgb(247_243_238/0.72)_36%,transparent_48%)]",
        )}
      />

      {/* Below lg the ground is flat cream, so the section still reads as
          the design's warm panel rather than plain white. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[#f7f3ee] lg:hidden"
      />

      <Container width="hero" className="relative">
        <div
          className={cn(
            "grid items-center gap-12",
            // The middle column is empty on purpose: it is the part of the
            // photograph the design leaves clear, between the copy and the
            // card stack.
            "lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.28fr)_minmax(0,0.8fr)]",
            "lg:gap-8",
          )}
        >
          {/* ============================ Copy ======================== */}
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "text-[0.6875rem] font-bold tracking-[0.18em] uppercase",
                // The design sets this eyebrow in a warm terracotta, unlike
                // the blue and violet used elsewhere on the page.
                "text-[#d4552f] sm:text-xs",
              )}
            >
              {healthcare.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.08)}
              className={cn(
                // The serif, as the design sets it — the same editorial voice
                // the LurnyMagic formats section uses.
                "mt-5 font-serif font-normal tracking-[-0.01em]",
                "leading-[1.14] text-balance",
                // Capped so no line runs past the photograph's fade — the
                // column is wider than the text needs, to give the serif
                // room to break where the design breaks it.
                "max-w-[15ch] lg:max-w-[19ch]",
                // Measured from the design at ~54px on a 1440 frame.
                "text-[2rem] sm:text-[2.375rem] xl:text-[2.875rem]",
              )}
            >
              {healthcare.headline.map((line) => (
                <span key={line} className="inline lg:block">
                  {line}{" "}
                </span>
              ))}
            </motion.h2>

            <motion.p
              {...rise(0.16)}
              className={cn(
                "mt-6 max-w-[27rem] leading-relaxed text-pretty",
                "text-[0.9375rem] text-neutral-600 sm:text-base",
              )}
            >
              {healthcare.description}
            </motion.p>

            {/* -------------------------- Points --------------------- */}
            <ul className="mt-11 space-y-8">
              {healthcare.points.map((point, index) => (
                <motion.li
                  key={point.title}
                  {...rise(0.24 + index * 0.08)}
                  className="group flex max-w-[27rem] items-start gap-5"
                >
                  <span
                    className={cn(
                      "grid size-16 shrink-0 place-items-center rounded-2xl",
                      "bg-white/70 ring-1 ring-neutral-200/80",
                      // `scale`, not `transform`: Tailwind v4 compiles the
                      // scale utilities to the standalone property.
                      "duration-normal transition-[scale,background-color] ease-out",
                      "group-hover:scale-105 group-hover:bg-white",
                    )}
                  >
                    <Image
                      src={point.icon}
                      alt=""
                      aria-hidden="true"
                      width={128}
                      height={128}
                      className="size-9 object-contain"
                    />
                  </span>

                  <div className="min-w-0">
                    <h3 className="text-[1.0625rem] font-semibold sm:text-[1.125rem]">
                      {point.title}
                    </h3>
                    <p
                      className={cn(
                        "mt-1.5 leading-relaxed text-pretty",
                        "text-[0.875rem] text-neutral-600 sm:text-[0.9375rem]",
                      )}
                    >
                      {point.description}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* The clear middle of the photograph. Purely spatial, so it is
              dropped from the flow entirely below lg. */}
          <div aria-hidden="true" className="hidden lg:block" />

          {/* ======================== Card stack ====================== */}
          <Uncopyable className="@container relative">
            {/*
              The rail: one continuous line behind the cards, so the runs
              between them join up rather than reading as five separate
              borders. It stops short at both ends, as the design draws it.
            */}
            <span
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute top-[6cqw] bottom-[6cqw]",
                "left-[1.6cqw] w-px bg-neutral-300",
              )}
            />

            <ul className="relative space-y-[3cqw]">
              {healthcare.cards.map((card, index) => (
                <motion.li
                  key={
                    typeof card.title === "string"
                      ? card.title
                      : card.title.lead
                  }
                  initial={reduce ? "shown" : "hidden"}
                  whileInView="shown"
                  viewport={{ once: true, amount: "some" }}
                  variants={{
                    // The cards arrive top to bottom, so the stack builds
                    // down the rail as if the events were landing in turn.
                    hidden: { opacity: 0, x: 22 },
                    shown: {
                      opacity: 1,
                      x: 0,
                      transition: {
                        duration: 0.6,
                        delay: 0.3 + index * 0.12,
                        ease: easeOut,
                      },
                    },
                  }}
                  className="flex items-start gap-[3.4cqw]"
                >
                  {/* The node. Owned by the card and centred on its first
                      line, so it cannot drift from the card it marks. */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "mt-[5.2cqw] size-[1.5cqw] shrink-0 rounded-full",
                      "bg-white ring-[0.35cqw] ring-neutral-400",
                    )}
                  />

                  <div
                    className={cn(
                      "min-w-0 flex-1 rounded-[2cqw] p-[3.4cqw]",
                      // The prompt card takes the design's blue tint; the
                      // rest are white.
                      card.kind === "prompt"
                        ? "bg-[#e8eefc] ring-1 ring-[#c9d8f5]"
                        : "bg-white ring-1 ring-black/5",
                      "shadow-[0_1.4cqw_3.4cqw_-1.6cqw_rgb(23_31_51/0.18)]",
                    )}
                  >
                    <div className="flex items-start gap-[2.6cqw]">
                      <Image
                        src={card.icon}
                        alt=""
                        aria-hidden="true"
                        width={128}
                        height={128}
                        className="size-[8cqw] shrink-0 object-contain"
                      />

                      <div className="min-w-0 flex-1">
                        {/* ------------------- Title ----------------- */}
                        <p className="text-[3.1cqw] leading-snug font-semibold">
                          {typeof card.title === "string" ? (
                            card.title
                          ) : (
                            <>
                              {card.title.lead}
                              <span
                                aria-hidden="true"
                                className="text-neutral-400"
                              >
                                {" · "}
                              </span>
                              <span className="font-normal text-neutral-600">
                                {card.title.tail}
                              </span>
                            </>
                          )}
                        </p>

                        {/* ------------------- Body ------------------ */}
                        {card.kind === "meta" && (
                          <p className="mt-[1.4cqw] text-[2.5cqw] text-neutral-500">
                            <span className="text-[#3563d6]">
                              {card.meta.lead}
                            </span>
                            {" · "}
                            {card.meta.tail}
                          </p>
                        )}

                        {card.kind === "prompt" && (
                          <p className="mt-[1.4cqw] text-[2.5cqw] leading-relaxed text-neutral-700">
                            {card.prompt}
                          </p>
                        )}

                        {card.kind === "lines" && (
                          <span className="mt-[2.4cqw] flex flex-col gap-[1.6cqw]">
                            {card.lines.map((width, lineIndex) => (
                              <PlaceholderLine key={lineIndex} width={width} />
                            ))}
                          </span>
                        )}

                        {card.kind === "meter" && (
                          <span className="mt-[2.4cqw] block h-[1.5cqw] overflow-hidden rounded-full bg-neutral-200">
                            {/*
                              Fills from empty on scroll, so the track reads
                              as a measure being taken rather than a static
                              rule.
                            */}
                            <motion.span
                              className="block h-full rounded-full bg-[#2f9e5f]"
                              initial={reduce ? "shown" : "hidden"}
                              whileInView="shown"
                              viewport={{ once: true, amount: "some" }}
                              variants={{
                                hidden: { scaleX: 0 },
                                shown: {
                                  scaleX: 1,
                                  transition: {
                                    duration: 0.9,
                                    delay: 0.9,
                                    ease: easeOut,
                                  },
                                },
                              }}
                              style={{
                                width: `${card.meter * 100}%`,
                                transformOrigin: "left",
                              }}
                            />
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </Uncopyable>
        </div>
      </Container>
    </section>
  );
}
