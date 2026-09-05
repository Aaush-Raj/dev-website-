"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { solutionsPage } from "@/content/solutions-page";
import { cn } from "@/lib/utils";

import { inclusiveIcons } from "./SolutionsInclusiveIcons";
import { ArrowRightIcon } from "./SolutionsNeedIcons";

/**
 * SOLUTIONS — INCLUSIVE LEARNING IN ACTION
 * ---------------------------------------------------------------------------
 * Section 6: the page's second case study. A photograph of a kitchen team
 * learning from a shared screen fills the card; three frosted capability cards
 * sit over its lower left, and a panel of copy over its right.
 *
 * SHAPED LIKE SECTION 4 ON PURPOSE
 * Same eyebrow, headline, meta chips, challenge/response blocks and closing
 * link as SolutionsCaseStudy — the two sections tell the same kind of story,
 * and a reader moving between them should find the same furniture in the same
 * places. What differs is the overlay: three capability cards rather than a
 * statistics read-out, because this story is about HOW people learn rather
 * than what the numbers showed.
 *
 * They are deliberately NOT one shared component. The overlays differ
 * completely, and folding both into one would mean a prop for nearly every
 * element — the shared thing here is the design language, not the markup.
 *
 * LAYOUT
 * Above lg the cards and panel overlay the photograph, as the design shows.
 * Below lg that stops working — the photograph has no room to read behind two
 * columns of content — so the card becomes a stack: photo, then cards, then
 * panel, each on its own ground. Same behaviour as section 4.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { inclusive } = solutionsPage;

export function SolutionsInclusive() {
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
    <section className="bg-[#f6f2ec] py-section-lg">
      <Container width="wide">
        {/* =========================== Statement ===================== */}
        <motion.p
          {...rise(0)}
          className={cn(
            "text-[0.75rem] font-bold uppercase",
            "tracking-[0.14em] text-[#402982] sm:text-sm",
          )}
        >
          {inclusive.eyebrow}
        </motion.p>

        {/* Set in the serif, as the design does for both case studies. */}
        <motion.h2
          {...rise(0.08)}
          className={cn(
            "mt-5 font-serif font-bold tracking-[-0.02em]",
            "leading-[1.1] text-neutral-950",
            // Measured from the design at ~60px on a 1440 frame.
            "text-[2rem] sm:text-[2.75rem] xl:text-[3.5rem]",
          )}
        >
          {inclusive.headline.map((line) => (
            <span key={line} className="inline lg:block">
              {line}{" "}
            </span>
          ))}
        </motion.h2>

        {/* ---------------------------- Chips ---------------------- */}
        <motion.ul
          {...rise(0.16)}
          className="mt-7 flex flex-wrap items-center gap-3"
        >
          {inclusive.meta.map((item, index) => {
            const Icon = inclusiveIcons[item.icon];

            return (
              <li
                key={item.label}
                className={cn(
                  "inline-flex items-center gap-3 rounded-xl px-4 py-3",
                  "border border-neutral-300/70 bg-[#f2eee9]",
                )}
              >
                {/* The first chip's glyph carries the violet; the second is
                    the neutral partner mark, as the design sets them. */}
                <Icon
                  className={cn(
                    "size-5 shrink-0",
                    index === 0 ? "text-[#4f318b]" : "text-neutral-700",
                  )}
                />
                <span
                  className={cn(
                    "text-[0.8125rem] font-bold tracking-[0.06em] uppercase sm:text-sm",
                    index === 0 ? "text-[#4f318b]" : "text-neutral-900",
                  )}
                >
                  {item.label}
                </span>
              </li>
            );
          })}
        </motion.ul>

        {/* ============================ Card ========================= */}
        <motion.div
          {...rise(0.24)}
          className={cn(
            "relative mt-9 overflow-hidden rounded-3xl",
            // The ground the stack sits on below lg, where the photograph is
            // no longer behind the content.
            "bg-[#f3f1ee]",
          )}
        >
          {/* ------------------------ Photograph ------------------- */}
          <div
            className={cn(
              "relative aspect-[16/10] w-full sm:aspect-[16/8]",
              "lg:absolute lg:inset-0 lg:aspect-auto lg:h-full",
            )}
          >
            <Image
              src={inclusive.photo.src}
              alt={inclusive.photo.alt}
              width={inclusive.photo.width}
              height={inclusive.photo.height}
              sizes="(min-width: 1024px) 100vw, 100vw"
              className="size-full object-cover"
            />

            {/* A scrim under the right-hand panel, so the copy holds its
                contrast wherever the photograph happens to be bright. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 hidden lg:block"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, transparent 52%, rgb(20 14 30 / 0.28) 100%)",
              }}
            />
          </div>

          {/* The content grid. On lg it sits over the photograph; below that
              it follows underneath it. */}
          <div
            className={cn(
              "relative grid gap-6 p-5 sm:p-7",
              "lg:min-h-[34rem] lg:grid-cols-[minmax(0,1fr)_minmax(0,0.62fr)]",
              "lg:items-end lg:gap-8 lg:p-8 xl:min-h-[38rem]",
            )}
          >
            {/* --------------------- Capability cards ------------- */}
            <ul className={cn("grid gap-3.5", "sm:grid-cols-3 lg:self-end")}>
              {inclusive.cards.map((card) => {
                const Icon = inclusiveIcons[card.icon];

                return (
                  <li
                    key={card.title}
                    className={cn(
                      "rounded-2xl p-4",
                      // The frosted treatment section 4 established.
                      "border border-white/25 bg-white/18 backdrop-blur-md",
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#4a2b91] text-white">
                        <Icon className="size-[1.15rem]" />
                      </span>
                      {/* `text-balance` rather than a nowrap: "Shared kitchen
                          kiosk" genuinely needs two lines in a narrow card, and
                          forcing one would overflow. Balancing keeps the break
                          even instead of orphaning "kiosk". */}
                      <span className="text-[0.8125rem] font-bold tracking-[0.04em] text-balance text-[#36216c] uppercase">
                        {card.title}
                      </span>
                    </span>

                    <span
                      aria-hidden="true"
                      className="mt-3 block h-px w-full bg-neutral-900/15"
                    />

                    <span className="mt-3 block text-[0.875rem] leading-snug text-pretty text-neutral-900">
                      {card.description}
                    </span>
                  </li>
                );
              })}
            </ul>

            {/* ------------------------- Panel -------------------- */}
            <div
              className={cn(
                "rounded-2xl p-6 sm:p-7",
                "border border-white/40 bg-[#f3f1ee]/95 backdrop-blur-md",
                "lg:self-stretch",
              )}
            >
              {inclusive.blocks.map((block, index) => {
                const Icon = inclusiveIcons[block.icon];

                return (
                  <div
                    key={block.title}
                    className={cn(
                      index > 0 && "mt-6 border-t border-neutral-400/40 pt-6",
                    )}
                  >
                    <p className="flex items-center gap-3">
                      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#4a2b91] text-white">
                        <Icon className="size-4" />
                      </span>
                      <span className="text-[1.0625rem] font-bold text-neutral-950 sm:text-lg">
                        {block.title}
                      </span>
                    </p>

                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-pretty text-neutral-700">
                      {block.body}
                    </p>
                  </div>
                );
              })}

              <div className="mt-6 border-t border-neutral-400/40 pt-6">
                <Link
                  href={inclusive.link.href}
                  className={cn(
                    "group/link inline-flex items-center gap-2.5",
                    "text-[0.9375rem] font-semibold text-[#4e3187] sm:text-base",
                    "duration-normal transition-colors hover:text-[#6a44b5]",
                  )}
                >
                  {inclusive.link.label}
                  <ArrowRightIcon
                    className={cn(
                      "size-4",
                      "duration-normal transition-[translate] ease-out",
                      "group-hover/link:translate-x-1",
                    )}
                  />
                </Link>
              </div>
            </div>
          </div>

          {/* The illustrative-view label, as section 4 also ships. Sits over
              the photograph on lg; below that the photo is above the content
              so it would float over the panel, hence lg-only. */}
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute right-5 bottom-4 hidden lg:block",
              "text-[0.6875rem] font-semibold tracking-[0.12em] text-white/70 uppercase",
            )}
          >
            {inclusive.illustrativeLabel}
          </span>
        </motion.div>
      </Container>
    </section>
  );
}
