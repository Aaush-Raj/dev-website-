"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { solutionsPage } from "@/content/solutions-page";
import { cn } from "@/lib/utils";

import { caseIcons } from "./SolutionsCaseIcons";
import { ArrowRightIcon } from "./SolutionsNeedIcons";

/**
 * SOLUTIONS — CAPABILITY IN ACTION
 * ---------------------------------------------------------------------------
 * Section 4: one case-study card. A photograph of a branch conversation fills
 * the card; a frosted panel of copy sits over its left, and the product's own
 * read-out — three stats, the conversation waveform and four signal chips —
 * over its right.
 *
 * THE READ-OUT IS A MOCKUP
 * The stats and chips picture what LurnyPitch surfaces; the design labels the
 * whole thing "Illustrative view" for exactly that reason. That label ships
 * with it, and the figures live in content/solutions-page.ts so they can be
 * replaced with real ones without touching this file.
 *
 * LAYOUT
 * Above lg the panel and read-out overlay the photograph, as the design shows.
 * Below lg that stops working — the photograph has no room to read behind two
 * columns of content — so the card becomes a stack: photo, then panel, then
 * read-out, each on its own ground.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { caseStudy } = solutionsPage;

export function SolutionsCaseStudy() {
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
    <section className="relative bg-[#f9f7f5] py-20 lg:py-24">
      <Container width="wide">
        {/* ========================= The heading ====================== */}
        <motion.p
          {...rise(0)}
          className={cn(
            "text-[0.75rem] font-bold tracking-[0.16em] uppercase",
            "text-[#6f2f93] sm:text-[0.8125rem]",
          )}
        >
          {caseStudy.eyebrow}
        </motion.p>

        {/* The design sets this heading in the serif face, unlike the rest of
            the page — it is the human story among the product sections. */}
        <motion.h2
          {...rise(0.08)}
          className={cn(
            "mt-4 max-w-[64rem] font-serif font-normal tracking-[-0.015em]",
            "leading-[1.14] text-balance text-[#12101a]",
            // Measured from the design at ~54px on a 1440 frame.
            "text-[1.875rem] sm:text-[2.5rem] xl:text-[3.375rem]",
          )}
        >
          {caseStudy.headline.join(" ")}
          {/* The design closes the sentence; the source copy omits the stop.
              Decorative punctuation, so it is hidden from screen readers. */}
          <span aria-hidden="true">.</span>
        </motion.h2>

        {/* ========================== The card ======================== */}
        <motion.div
          {...rise(0.16)}
          className="relative mt-10 overflow-hidden rounded-2xl lg:mt-12"
        >
          {/* ---------------------- The photograph ----------------- */}
          {/*
            Static on lg+, where the panel sits over it. Below lg it is the
            stack's first block, at a fixed aspect so it never collapses.
          */}
          <div className="relative aspect-[16/10] w-full sm:aspect-[16/8] lg:absolute lg:inset-0 lg:aspect-auto lg:h-full">
            <Image
              src={caseStudy.photo.src}
              alt={caseStudy.photo.alt}
              width={caseStudy.photo.width}
              height={caseStudy.photo.height}
              sizes="(min-width: 1024px) 90vw, 100vw"
              className="size-full object-cover object-[60%_center]"
            />

            {/* A violet wash, heaviest on the left where the panel sits. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background: [
                  "linear-gradient(90deg, rgb(60 24 82 / 0.72) 0%, rgb(60 24 82 / 0.42) 38%, rgb(60 24 82 / 0.12) 62%, rgb(60 24 82 / 0.28) 100%)",
                  "linear-gradient(180deg, rgb(40 16 58 / 0.3) 0%, transparent 30%, rgb(40 16 58 / 0.35) 100%)",
                ].join(","),
              }}
            />
          </div>

          {/* ------------------------ The content ------------------ */}
          <div
            className={cn(
              "relative grid grid-cols-1 gap-6 bg-[#3a1c52] p-5 sm:p-6",
              // On lg the card's own ground disappears: the photograph behind
              // is the ground, and the two columns sit on top of it.
              "lg:grid-cols-[minmax(0,0.46fr)_minmax(0,1fr)] lg:gap-10",
              "lg:bg-transparent lg:p-8 xl:p-10",
            )}
          >
            {/* ....................... The panel .................... */}
            <div
              className={cn(
                "rounded-xl p-5 sm:p-6",
                "border border-white/25 bg-[#4a2568]/55",
                "backdrop-blur-md",
              )}
            >
              {/* The two meta rows. */}
              <ul className="space-y-4">
                {caseStudy.meta.map((row) => {
                  const Icon = caseIcons[row.icon];

                  return (
                    <li key={row.label} className="flex items-center gap-3.5">
                      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white/22 text-white">
                        <Icon className="size-4.5" />
                      </span>
                      <span className="text-[0.75rem] font-bold tracking-[0.08em] text-white uppercase">
                        {row.label}
                      </span>
                    </li>
                  );
                })}
              </ul>

              <span className="mt-5 block border-t border-white/25" />

              {/* The challenge and the response. */}
              {caseStudy.blocks.map((block, index) => (
                <div
                  key={block.title}
                  className={cn(index === 0 ? "mt-5" : "mt-6")}
                >
                  {/* The accent bar is a left border on the title, so it sits
                      against the text rather than needing its own element. */}
                  <p className="border-l-[3px] border-[#f0b429] pl-3 text-[1.125rem] font-semibold text-white">
                    {block.title}
                  </p>
                  <p className="mt-2 pl-3 text-[0.9375rem] leading-relaxed text-pretty text-[#e6dced]">
                    {block.body}
                  </p>
                </div>
              ))}

              <Link
                href={caseStudy.link.href}
                className={cn(
                  "group/cta mt-6 inline-flex items-center gap-2.5 border-b pb-1.5",
                  "border-white/40 text-[0.9375rem] font-semibold text-white",
                  "duration-normal transition-[border-color,color] ease-out",
                  "hover:border-white hover:text-white",
                )}
              >
                {caseStudy.link.label}
                <ArrowRightIcon
                  className={cn(
                    "size-4",
                    "duration-normal transition-[translate] ease-out",
                    "will-change-[translate] group-hover/cta:translate-x-1",
                  )}
                />
              </Link>
            </div>

            {/* ...................... The read-out .................. */}
            {/* Pushed to the column's foot on lg, where the design floats it
                over the lower half of the photograph. */}
            <div className="flex flex-col justify-end gap-5">
              {/* The three stats. */}
              <ul className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
                {caseStudy.stats.map((stat, index) => (
                  <motion.li
                    key={stat.label}
                    {...rise(0.3 + index * 0.08)}
                    className={cn(
                      "rounded-xl px-4 py-4 text-center",
                      "border border-white/25 bg-white/18 backdrop-blur-md",
                    )}
                  >
                    <span
                      className={cn(
                        "block font-display font-bold text-white",
                        // "Multilingual" is a word, not a figure, so it sets a
                        // step smaller than the numerals to stay on one line.
                        stat.value.length > 6
                          ? "text-[1.375rem] tracking-[-0.01em]"
                          : "text-[2rem] leading-none",
                      )}
                    >
                      {stat.value}
                    </span>
                    <span className="mt-1.5 block text-[0.6875rem] font-semibold tracking-[0.08em] text-white/85 uppercase">
                      {stat.label}
                    </span>
                  </motion.li>
                ))}
              </ul>

              {/* The waveform. Decorative — it pictures a conversation being
                  analysed rather than plotting real audio. */}
              <motion.div
                {...rise(0.5)}
                className="relative h-14 w-full sm:h-16"
                aria-hidden="true"
              >
                <Image
                  src={caseStudy.wave.src}
                  alt={caseStudy.wave.alt}
                  width={caseStudy.wave.width}
                  height={caseStudy.wave.height}
                  sizes="(min-width: 1024px) 55vw, 90vw"
                  className="size-full object-contain"
                />
              </motion.div>

              {/* The four signal chips. */}
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {caseStudy.signals.map((signal, index) => {
                  const Icon = caseIcons[signal.icon];

                  return (
                    <motion.li
                      key={signal.label.join(" ")}
                      {...rise(0.58 + index * 0.06)}
                      className={cn(
                        "flex items-center gap-2.5 rounded-xl px-3 py-2.5",
                        "border border-white/25 bg-white/18 backdrop-blur-md",
                      )}
                    >
                      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white/25 text-white">
                        <Icon className="size-4" />
                      </span>
                      <span className="text-[0.8125rem] leading-tight text-white">
                        {signal.label.map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))}
                      </span>
                    </motion.li>
                  );
                })}
              </ul>

              {/* The disclaimer. It is content, not decoration: it tells the
                  reader the read-out above is a mockup. */}
              <p className="text-right text-[0.6875rem] font-semibold tracking-[0.1em] text-white/75 uppercase">
                {caseStudy.disclaimer}
              </p>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
