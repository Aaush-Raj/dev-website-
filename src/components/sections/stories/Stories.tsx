"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { ArrowRightIcon } from "@/components/sections/hero/DashboardIcons";
import { Container } from "@/components/ui/Container";
import { stories } from "@/content/stories";
import { cn } from "@/lib/utils";

/**
 * STORIES
 * ---------------------------------------------------------------------------
 * Three customer case-study cards on a lavender ground, closed by a pull quote
 * on a dark bar.
 *
 * CARD ANATOMY
 * Each card is one link: a coloured top rule, a photo with the sector label
 * and title laid over its foot, then a white panel carrying the story's
 * standfirst and its two chips. The overlay sits on a bottom-up scrim rather
 * than a solid band, so the photo stays visible behind the text.
 *
 * WHERE THE CONTENT COMES FROM
 * The three cards are the customer stories index's own entries — same photo,
 * headline, standfirst and chips as the page each card opens. See the note in
 * content/stories.ts. That is also why there is no "Powered by …" badge and no
 * client descriptor in the label: neither is stated on the story pages, and
 * the versions this card used to carry were invented.
 *
 * TWO SHAPES OF CHIP, as on the index: the BFSI story's chips are FIGURES
 * ("25 branches") and render the number in the display face; the others are
 * phrases and render as plain text. The chip row sits on `mt-auto`, which
 * keeps it aligned across a row of cards whose standfirsts wrap to different
 * heights.
 *
 * BACKGROUND
 * The section ground is a soft lavender wash with two decorative layers — a
 * dotted field bleeding in from the left and a light sweep top-right. Both are
 * pure CSS (a radial-gradient dot grid and a blurred ellipse) rather than
 * images: they are large, soft shapes that would cost far more as assets than
 * they do as gradients, and they stay crisp at any viewport.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

/**
 * Per-card tone. The design runs two violet cards and one amber, so the row
 * has a single point of emphasis.
 */
const toneStyles = {
  brand: {
    rule: "bg-brand-600",
    industry: "text-brand-400",
    metric: "text-brand-700",
  },
  accent: {
    rule: "bg-accent-500",
    industry: "text-accent-400",
    metric: "text-accent-600",
  },
} as const;

export function Stories() {
  const reduce = useReducedMotion();

  /**
   * Shared entrance, as named variants.
   *
   * `amount: "some"` rather than a fraction: the threshold is a proportion of
   * the ELEMENT, so anything taller than the viewport would never reach a
   * fractional threshold and would stay stuck at its initial state.
   */
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
      id="stories"
      className="relative overflow-hidden bg-[#efe9fb] py-section-lg"
    >
      {/* ========================= Background ========================== */}
      {/*
        Dotted field, bleeding in from the left edge. The mask fades it out
        before it reaches the cards, so the texture reads at the margin
        without ever competing with the content.
      */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-[38%]"
        style={{
          backgroundImage:
            "radial-gradient(var(--brand-500) 1.4px, transparent 1.4px)",
          backgroundSize: "13px 13px",
          maskImage:
            "radial-gradient(110% 85% at 0% 50%, rgb(0 0 0 / 0.55) 0%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(110% 85% at 0% 50%, rgb(0 0 0 / 0.55) 0%, transparent 70%)",
        }}
      />

      {/* Light sweep, top-right — a soft blurred ellipse, as in the design. */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -top-24 -right-16 h-104 w-152",
          "rounded-full bg-white/60 blur-3xl",
        )}
      />

      <Container width="hero" className="relative">
        {/* ============================ Header ========================== */}
        {/* `items-end` would drop the link to the foot of a three-line
            heading block. The design sits it against the description instead,
            so the column is bottom-aligned only from the description down —
            achieved by letting the link column grow and pinning it with
            `mt-auto` inside its own flex column. */}
        <div className="flex flex-col gap-6 lg:flex-row lg:justify-between lg:gap-12">
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "font-mono text-[0.625rem] font-semibold uppercase",
                "tracking-[0.16em] text-brand-700 sm:text-[0.6875rem]",
              )}
            >
              {stories.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.08)}
              className={cn(
                "mt-5 font-display font-bold tracking-[-0.03em]",
                "leading-[1.06] text-neutral-900",
                // Measured from the design at ~46px on a 1440 frame.
                "text-[1.875rem] sm:text-[2.375rem] xl:text-[2.875rem]",
              )}
            >
              {stories.headline.map((line, index) => (
                <span key={line} className="inline lg:block">
                  {line}
                  {index === 0 ? " " : null}
                </span>
              ))}
            </motion.h2>

            <motion.p
              {...rise(0.16)}
              className={cn(
                // Narrow measure: the design wraps this to two short lines
                // under the heading rather than letting it run the full
                // column width.
                "mt-5 max-w-104 text-sm leading-relaxed",
                "text-pretty text-neutral-700 sm:text-[0.9375rem]",
              )}
            >
              {stories.description}
            </motion.p>
          </div>

          <motion.div
            {...rise(0.24)}
            className="shrink-0 lg:flex lg:flex-col lg:justify-end lg:pb-1"
          >
            <Link
              href={stories.link.href}
              className={cn(
                "group inline-flex items-center gap-2 rounded-md",
                "text-[0.9375rem] font-medium text-brand-700",
                "duration-fast transition-colors hover:text-brand-600",
              )}
            >
              {stories.link.label}
              <ArrowRightIcon
                className={cn(
                  "duration-normal size-4 transition-transform ease-out",
                  "group-hover:translate-x-1",
                )}
              />
            </Link>
          </motion.div>
        </div>

        {/* ============================= Cards ========================== */}
        <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:mt-12 lg:grid-cols-3">
          {stories.items.map((item, index) => {
            const tone = toneStyles[item.tone];

            return (
              <motion.li
                key={item.id}
                initial={reduce ? "shown" : "hidden"}
                whileInView="shown"
                viewport={{ once: true, amount: "some" }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  shown: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.55,
                      delay: 0.14 + index * 0.09,
                      ease: easeOut,
                    },
                  },
                }}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "group flex h-full flex-col overflow-hidden rounded-xl bg-white",
                    "shadow-[0_10px_30px_-18px_rgb(45_25_90/0.28)]",
                    // `translate`, not `transform`: Tailwind v4 compiles the
                    // translate utilities to the standalone property, so
                    // naming `transform` here would leave the lift unanimated.
                    "transition-[translate,box-shadow] duration-380 ease-out",
                    "will-change-[translate]",
                    "hover:-translate-y-1 hover:duration-520",
                    "hover:shadow-[0_22px_48px_-20px_rgb(45_25_90/0.42)]",
                  )}
                >
                  {/* Coloured top rule */}
                  <span
                    aria-hidden="true"
                    className={cn("h-0.75 w-full shrink-0", tone.rule)}
                  />

                  {/* ---------------------- Photo --------------------- */}
                  <div className="relative aspect-4/3 overflow-hidden bg-neutral-800">
                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className={cn(
                        // `scale`, not `transform` — same Tailwind v4 note as
                        // the card lift above.
                        "object-cover transition-[scale] duration-700 ease-out",
                        "group-hover:scale-[1.04]",
                      )}
                    />

                    {/*
                      Legibility scrim behind the overlaid text. Two layers:
                      a light overall wash to settle the photo, and a strong
                      bottom-up fade under the label and title. A single
                      gradient dark enough at the foot would grey out the top
                      of the photo.
                    */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 bg-black/25"
                    />
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-x-0 bottom-0 h-2/3",
                        "bg-linear-to-t from-black via-black/75 to-transparent",
                      )}
                    />

                    {/* Sector label and title, over the photo foot. */}
                    <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                      <p
                        className={cn(
                          "font-mono text-[0.625rem] font-semibold uppercase",
                          "tracking-[0.12em]",
                          tone.industry,
                        )}
                      >
                        {item.industry}
                      </p>

                      <h3
                        className={cn(
                          "mt-2.5 font-semibold tracking-[-0.01em] text-white",
                          "text-[1.0625rem] leading-snug text-pretty sm:text-lg",
                        )}
                      >
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  {/* ---------------------- Panel --------------------- */}
                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    <p className="text-[0.875rem] leading-relaxed text-pretty text-neutral-600">
                      {item.description}
                    </p>

                    {/* The two chips, divided by a hairline as in the design.
                        `mt-auto` pins them to the card foot so the row aligns
                        across uneven standfirsts. */}
                    <ul className="mt-auto grid grid-cols-2 gap-x-4 pt-5">
                      {item.chips.map((chip, chipIndex) => (
                        <li
                          key={chip.label}
                          className={cn(
                            chipIndex === 1 && "border-l border-neutral-200 pl-4",
                          )}
                        >
                          {"value" in chip && chip.value ? (
                            <>
                              <span
                                className={cn(
                                  "block font-display text-[1.375rem] font-bold",
                                  "leading-none tracking-[-0.02em] tabular-nums",
                                  tone.metric,
                                )}
                              >
                                {chip.value}
                              </span>
                              <span className="mt-2 block text-[0.8125rem] leading-snug text-pretty text-neutral-600">
                                {chip.label}
                              </span>
                            </>
                          ) : (
                            <span className="block text-[0.875rem] leading-snug font-medium text-pretty text-neutral-800">
                              {chip.label}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Link>
              </motion.li>
            );
          })}
        </ul>

        {/* ============================= Quote ========================== */}
        <motion.figure
          {...rise(0.3)}
          className={cn(
            "mt-6 flex flex-col gap-6 rounded-xl bg-[#141026] p-6",
            "sm:p-8 lg:flex-row lg:items-center lg:gap-10 lg:p-9",
          )}
        >
          <blockquote className="flex flex-1 gap-4">
            {/* Opening quote mark, purely decorative — the <blockquote> is
                what carries the semantics. */}
            <span
              aria-hidden="true"
              className={cn(
                "shrink-0 font-display text-3xl leading-none",
                "text-brand-400 select-none",
              )}
            >
              &ldquo;
            </span>
            <p
              className={cn(
                "text-[1.0625rem] leading-relaxed text-pretty text-white/95",
                "sm:text-lg",
              )}
            >
              {stories.quote.text}
            </p>
          </blockquote>

          {/* Attribution. The rule is a left border on lg, where the
              attribution sits beside the quote, and disappears below that,
              where it stacks underneath instead. */}
          <figcaption
            className={cn(
              "shrink-0 text-[0.9375rem] leading-relaxed text-white/70",
              "lg:border-l lg:border-white/15 lg:pl-10",
            )}
          >
            {stories.quote.attribution.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </figcaption>
        </motion.figure>
      </Container>
    </section>
  );
}
