"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { saathi } from "@/content/saathi";
import { cn } from "@/lib/utils";

import { SaathiCapabilities, SaathiThreads } from "./SaathiCapabilities";
import { SaathiStarfield } from "./SaathiStarfield";
import { SaathiPhone } from "./SaathiPhone";
import { ArrowIcon, HeartIcon } from "./SaathiIcons";

/**
 * SAATHI HERO
 * ---------------------------------------------------------------------------
 * Section 1 of the LurnySaathi page: the statement on the left, and on the
 * right an illustration of five capability pills whose light threads converge
 * into the phone, with the employee photographed behind it.
 *
 * THE BACKGROUND
 * The design ships this as a large PNG (`lurnysaathi -hero section - bg2.png`)
 * whose content is a deep indigo ground, a violet bloom behind the phone, and
 * a band of flowing light-streaks along the bottom edge. All of it is built in
 * CSS/SVG here rather than downloaded: nothing to fetch, it stays sharp at
 * every density, and it reflows with the viewport instead of being letterboxed
 * or cropped at sizes the design was never measured at.
 *
 * The one thing that genuinely must be an image is the photograph — see the
 * provenance note in content/saathi.ts for how its background was keyed out.
 *
 * LAYOUT
 * On lg the pills and phone share the right column, the threads run between
 * them, and the photo sits behind the phone bleeding off the right edge. Below
 * lg the threads and the photo are dropped and the pills become a plain
 * two-column grid under the phone — a converging-threads diagram at phone
 * width collapses into noise.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { hero } = saathi;

export function SaathiHero() {
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
    <section
      className={cn(
        "relative isolate overflow-hidden text-white",
        // The section ground: the deep indigo the design uses, sampled at
        // #090726 in the flat left margin.
        "bg-[#090726]",
        // Extra top padding: this is the first section under the floating nav
        // pill, so it needs clearance the mid-page sections do not.
        "pt-28 pb-section-lg sm:pt-32 lg:pt-36",
      )}
    >
      {/* ===================== Background effects ===================== */}
      {/* The violet bloom behind the phone. Two stacked radials give it a
          shaped falloff rather than a flat disc. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: [
            "radial-gradient(56rem 46rem at 72% 42%, rgb(76 40 158 / 0.55), transparent 64%)",
            "radial-gradient(26rem 24rem at 62% 46%, rgb(139 92 246 / 0.30), transparent 70%)",
            "radial-gradient(34rem 30rem at 100% 18%, rgb(60 34 128 / 0.45), transparent 68%)",
          ].join(","),
        }}
      />

      {/* The starfield, standing in for the bokeh in the photo's original
          backdrop so the keyed-out subject does not sit on a flat field.
          See SaathiStarfield for why these are elements rather than gradients
          or a canvas. */}
      <SaathiStarfield className="-z-10" />

      {/* --------------------- The wave band ------------------------- */}
      {/*
        The ribbon of flowing light along the bottom edge. Drawn as a stack of
        stroked sine-ish curves in one SVG: each is the same shape at a
        different vertical offset and opacity, which is what gives the band its
        sense of depth. `preserveAspectRatio="none"` lets it stretch to any
        width without the curves changing character.
      */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 240"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 w-full sm:h-52 lg:h-64"
      >
        <defs>
          <linearGradient id="saathi-wave" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#f2547d" stopOpacity="0" />
            <stop offset="18%" stopColor="#f2547d" stopOpacity="0.75" />
            <stop offset="48%" stopColor="#a855f7" stopOpacity="0.8" />
            <stop offset="78%" stopColor="#5b8def" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#5b8def" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Eleven strands, fanned across the band. The multiplier on each
            control point spreads them apart toward the middle of the sweep so
            they braid rather than run parallel. */}
        {Array.from({ length: 11 }, (_, i) => {
          const spread = i * 13;
          return (
            <path
              key={i}
              d={`M -40 ${188 + spread * 0.28}
                  C 300 ${96 + spread * 0.72}, 620 ${232 - spread * 0.16}, 900 ${140 - spread * 0.5}
                  S 1300 ${28 + spread * 0.34}, 1480 ${60 + spread * 0.2}`}
              fill="none"
              stroke="url(#saathi-wave)"
              strokeWidth={i % 3 === 0 ? 1.4 : 0.8}
              opacity={0.14 + (i % 4) * 0.07}
            />
          );
        })}
      </svg>

      {/* A soft violet floor under the wave band, so it sits in light rather
          than on flat ground. */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-56",
          "bg-linear-to-t from-[#1b0f45]/70 to-transparent",
        )}
      />

      <Container width="wide" className="relative">
        <div
          className={cn(
            "grid items-center gap-14",
            // Measured from the design: the statement column runs to roughly
            // 430/1440, the illustration takes the rest.
            "lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1fr)] lg:gap-8",
            "xl:gap-12",
          )}
        >
          {/* =========================== Statement ===================== */}
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "text-[0.6875rem] font-bold uppercase",
                "tracking-[0.14em] text-[#f2544f] sm:text-xs",
              )}
            >
              {hero.eyebrow.product}
              {/* Decorative separator — a screen reader would otherwise
                  announce "bullet" between the two halves. */}
              <span aria-hidden="true" className="mx-2 text-[#f2544f]/70">
                ·
              </span>
              {hero.eyebrow.label}
            </motion.p>

            <motion.h1
              {...rise(0.08)}
              className={cn(
                "mt-6 font-display font-bold tracking-[-0.035em]",
                "leading-[1.08] text-white",
                // Measured from the design at ~60px on a 1440 frame.
                "text-[2.25rem] sm:text-[3rem] xl:text-[3.75rem]",
              )}
            >
              {hero.headline.map((line) => (
                <span key={line} className="inline lg:block">
                  {line}{" "}
                </span>
              ))}
            </motion.h1>

            <motion.p
              {...rise(0.16)}
              className={cn(
                "mt-7 max-w-[28rem] leading-relaxed text-pretty",
                "text-[1.0625rem] text-neutral-300 sm:text-lg",
              )}
            >
              {hero.description}
            </motion.p>

            {/* --------------------------- Actions -------------------- */}
            <motion.div
              {...rise(0.24)}
              className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4"
            >
              <Link
                href={hero.actions.primary.href}
                className={cn(
                  "inline-flex h-14 items-center justify-center rounded-xl px-8",
                  // The design's coral fill — the one warm element on the
                  // section, which is what makes it read as the primary.
                  "bg-[#f2544f] text-[0.9375rem] font-semibold text-white",
                  // `translate`, not `transform`: Tailwind v4 compiles the
                  // translate utilities to the standalone property.
                  "duration-normal transition-[background-color,box-shadow,translate] ease-out",
                  "will-change-[translate]",
                  "hover:-translate-y-0.5 hover:bg-[#ff6560]",
                  "hover:shadow-[0_16px_36px_-12px_rgb(242_84_79/0.6)]",
                  "active:translate-y-0",
                )}
              >
                {hero.actions.primary.label}
              </Link>

              {/* Secondary action — an underlined coral text link, as in the
                  design, not a second button competing with the primary. */}
              <Link
                href={hero.actions.secondary.href}
                className={cn(
                  "group inline-flex flex-col items-start",
                  "text-[0.9375rem] font-semibold text-[#f2544f]",
                )}
              >
                <span className="inline-flex items-center gap-2.5">
                  {hero.actions.secondary.label}
                  <ArrowIcon
                    className={cn(
                      "size-4",
                      "duration-normal transition-[translate] ease-out",
                      "group-hover:translate-x-1",
                    )}
                  />
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-1.5 block h-px w-full origin-left bg-[#f2544f]/70",
                    "duration-normal transition-transform ease-out",
                    "group-hover:scale-x-0",
                  )}
                />
              </Link>
            </motion.div>

            {/* -------------------------- Footnote -------------------- */}
            <motion.p
              {...rise(0.32)}
              className="mt-10 flex items-center gap-3.5 text-[0.9375rem] text-neutral-400"
            >
              <HeartIcon className="size-5 shrink-0 text-[#f2544f]" />
              {hero.footnote}
            </motion.p>
          </div>

          {/* ======================= Illustration ====================== */}
          {/*
            `group/art` makes the whole illustration one hover target. The
            photo cannot be one itself — it is aria-hidden and
            pointer-events-none — and hovering the phone alone would move the
            phone against a static backdrop, which reads as a glitch rather
            than as depth. Hovering anywhere over the art moves both, at
            different rates.
          */}
          <div className="group/art relative">
            {/* ----------------------- The photo ---------------------- */}
            {/*
              Behind the phone and bleeding off the container's right edge, as
              in the design. Hidden below lg: at that width it would sit behind
              a full-width phone with nothing of it visible but a sliver.
            */}
            <motion.div
              aria-hidden="true"
              initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 1.04 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: "some" }}
              transition={{ duration: 1, delay: 0.1, ease: easeOut }}
              className={cn(
                "pointer-events-none absolute -z-10 hidden lg:block",
                // Anchored bottom-right: the design crops her at the section's
                // lower edge and lets her run past the container's right one,
                // with the phone overlapping her left side.
                "right-[-10%] bottom-[-20%] w-[46%] xl:right-[-6%] xl:w-[43%]",
              )}
            >
              <Image
                src={hero.photo.src}
                alt=""
                width={hero.photo.width}
                height={hero.photo.height}
                // Above the fold, so it must not lazy-load.
                priority
                sizes="(min-width: 1024px) 46vw, 0px"
                className={cn(
                  "h-auto w-full",
                  // The design keeps her softly lit and slightly recessed so
                  // the phone stays the subject.
                  "brightness-[0.92] contrast-[1.02] saturate-[0.95]",
                  // On hover she comes up out of the recession — a touch
                  // brighter and warmer, drifting a little toward the phone.
                  // Slow and small: this is a backdrop, and a backdrop that
                  // reacts sharply pulls focus from the product it frames.
                  "transition-[filter,translate,scale] duration-700 ease-out",
                  "will-change-[translate,scale]",
                  "group-hover/art:translate-x-[-0.6%]",
                  "group-hover/art:scale-[1.015]",
                  "group-hover/art:brightness-[1.02]",
                  "group-hover/art:saturate-[1.04]",
                  // Ambient motion is what reduced-motion asks us to drop; the
                  // brightness shift is not, so only the movement goes.
                  "motion-reduce:transition-[filter]",
                  "motion-reduce:group-hover/art:translate-x-0",
                  "motion-reduce:group-hover/art:scale-100",
                )}
                // Fades her lower edge into the section rather than ending on
                // a hard crop line.
                style={{
                  maskImage:
                    "linear-gradient(180deg, black 0%, black 86%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(180deg, black 0%, black 86%, transparent 100%)",
                }}
              />
            </motion.div>

            {/* ----------------- Pills, threads, phone ---------------- */}
            <div
              className={cn(
                "relative grid items-center gap-8",
                // On lg the pills sit left of the phone with the threads
                // running between them; below that they drop underneath.
                // The phone column is sized to its own content (the handset
                // sets its own width) so the pills take the remaining room.
                "lg:grid-cols-[minmax(0,1fr)_max-content] lg:gap-0",
                // The design ends the phone around 70% of the section and
                // gives the remaining third to the photograph. This padding is
                // what reserves her that band — without it the phone runs to
                // the container's right edge and she is pushed off-screen.
                "lg:pr-[22%] xl:pr-[24%]",
              )}
            >
              {/*
                The threads, overlaid across BOTH cells so they can span the
                gap — see the note in SaathiCapabilities.

                The two anchors are percentages of this row's width, and they
                have to agree with the layout below: the pill list is capped at
                `lg:w-52` and right-aligned inside its cell, so its dots land at
                its cell's right edge, and the phone's cell is `max-content`
                against a 1fr pill cell. Measured on a 1440 frame that puts the
                dots at ~27% and the phone's left edge at ~42.4%, which is the
                gap the curves sweep across.
              */}
              <SaathiThreads
                startX={27}
                nodeX={42.4}
                className="absolute inset-0 hidden size-full lg:block"
              />

              {/* Stretched to roughly the phone's height on lg, which is what
                  spaces the five pills to match the thread start points. The
                  width cap is what opens the gap the threads run through —
                  without it the pills fill the cell and butt against the
                  phone. */}
              <SaathiCapabilities
                className={cn(
                  // Above the thread overlay, so a curve never crosses a pill.
                  "z-10 order-2 lg:order-1",
                  // Below lg: a plain two-column list under the phone.
                  "grid-cols-2 gap-3",
                  "lg:h-120 lg:w-76 lg:grid-cols-none lg:grid-rows-5 lg:gap-0",
                  // Pushed right, then held off the phone by the padding: that
                  // clearance IS the gap the threads sweep across, and it is
                  // what puts the dots at the `startX` above.
                  "lg:ml-auto lg:pr-24 xl:h-132 xl:pr-28",
                )}
              />

              {/* Above the thread overlay, so the curves terminate at the
                  node on the frame's edge instead of crossing the screen. */}
              <div
                className={cn(
                  "relative z-10 order-1 lg:order-2",
                  // Lifts further than the photo behind it on hover. The
                  // difference between the two rates is what reads as depth —
                  // matching them would just slide the whole picture.
                  "transition-[translate] duration-700 ease-out",
                  "will-change-[translate]",
                  "group-hover/art:lg:-translate-y-1.5",
                  "motion-reduce:group-hover/art:lg:translate-y-0",
                )}
              >
                <SaathiPhone />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
