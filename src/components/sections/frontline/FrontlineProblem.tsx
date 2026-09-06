"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { Uncopyable } from "@/components/ui/Uncopyable";
import { frontline } from "@/content/frontline";
import { cn } from "@/lib/utils";

import { problemIcons } from "./FrontlineIcons";

/**
 * FRONTLINE — THE FRONTLINE REALITY
 * ---------------------------------------------------------------------------
 * Section 2: the problem statement. Dark ground, the argument on the left, the
 * branch-counter scene bleeding off the right edge with three "signal" cards
 * floating over it.
 *
 * WHY THE SCENE IS FULL-BLEED RATHER THAN A ROUNDED CARD
 * The supplied illustration is 1672x941 whose left ~40% is near-black empty
 * room. That emptiness is the point: the design runs the scene to the right
 * edge of the viewport and lets its dark side dissolve into the section
 * ground, so there is no frame and no visible seam. Cropping it into a card
 * would throw that away and reintroduce the edge the asset was drawn to avoid.
 * The fade on the left is belt-and-braces for viewports whose aspect ratio
 * doesn't match the source's.
 *
 * WHY THE CARDS ARE MARKUP OVER THE IMAGE
 * The illustration is the scene ALONE — no cards, no dashed leaders. That is
 * the right split: the pictorial part ships as a raster, and the cards, which
 * are UI carrying readable text, are built here. Sharp at any density,
 * translatable, and they animate in.
 *
 * THE CARDS ARE DELIBERATELY TRANSLUCENT
 * A dark fill at ~72% with a backdrop blur, so the scene reads through them.
 * They should look like readouts hovering over the moment they describe, not
 * opaque panels pasted on top of it.
 *
 * The three do not connect to each other — the dashed leaders trail off, which
 * is the section's argument made visually: each system sees a fragment.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { problem } = frontline;

/** Accent per tone, sampled from the design. */
const TONES = {
  teal: { text: "text-[#92e5e4]", border: "border-[#92e5e4]/55" },
  amber: { text: "text-[#fed682]", border: "border-[#fed682]/55" },
  coral: { text: "text-[#fc958a]", border: "border-[#fc958a]/60" },
  violet: { text: "text-[#c5a0f6]", border: "border-[#c5a0f6]/55" },
} as const;

/**
 * Where each signal card sits over the scene, and the dashed leader that
 * trails away from it. Both are percentages of the scene box, measured off the
 * design, so the arrangement holds at every width.
 *
 * The leaders are drawn on a 100x100 viewBox with `preserveAspectRatio="none"`,
 * so the numbers read directly as those same percentages.
 */
const SIGNAL_SLOTS = [
  {
    card: "left-[2%] top-[1%] w-[33%]",
    leader: "M 35 12 H 41 V 28",
  },
  {
    card: "left-[53%] top-[1.5%] w-[34%]",
    leader: "M 53 14 H 47 V 30 H 41",
  },
  {
    card: "left-[63%] top-[19.5%] w-[37%]",
    leader: "M 63 28 H 56 V 42",
  },
] as const;

export function FrontlineProblem() {
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
    <section className="relative isolate overflow-hidden bg-[#131721] py-section-lg">
      {/* The dark wash. Sits under everything, including the scene. */}
      <Image
        src={problem.backdrop.src}
        alt={problem.backdrop.alt}
        width={problem.backdrop.width}
        height={problem.backdrop.height}
        aria-hidden="true"
        sizes="100vw"
        className="pointer-events-none absolute inset-0 -z-10 size-full object-cover"
      />

      {/* ============================== Scene ========================= */}
      {/* Full-bleed on the right from lg up, where the two-column layout
          exists. Below that the copy owns the full width and the scene runs
          under it as an atmospheric band — see the mobile block further down. */}
      <Uncopyable
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-y-0 right-0 -z-10 hidden",
          "w-[66%] select-none lg:block xl:w-[62%]",
        )}
      >
        <Image
          src={problem.scene.src}
          alt={problem.scene.alt}
          width={problem.scene.width}
          height={problem.scene.height}
          sizes="58vw"
          className="size-full object-cover object-right"
        />

        {/* Dissolve the scene's left edge into the section ground, so it
            bleeds in rather than butting against the copy column. */}
        <span
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, #131721 0%, #131721 12%, rgb(19 23 33 / 0.72) 26%, rgb(19 23 33 / 0.22) 42%, transparent 62%)",
          }}
        />

        {/* A softer top scrim, so the cards keep their contrast wherever the
            scene happens to be bright behind them. */}
        <span
          className="absolute inset-x-0 top-0 h-[46%]"
          style={{
            background:
              "linear-gradient(180deg, rgb(13 16 24 / 0.62) 0%, rgb(13 16 24 / 0.18) 55%, transparent 100%)",
          }}
        />
      </Uncopyable>

      <Container width="wide">
        <div
          className={cn(
            "grid items-center gap-12",
            "lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1fr)] lg:gap-10",
            "xl:gap-14",
          )}
        >
          {/* =========================== Statement ==================== */}
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "font-mono text-[0.6875rem] font-medium uppercase",
                "tracking-[0.2em] text-white/70 sm:text-xs",
              )}
            >
              {problem.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.08)}
              className={cn(
                "mt-5 font-display font-bold tracking-[-0.03em]",
                "leading-[1.12] text-white",
                "text-[1.875rem] sm:text-[2.375rem] xl:text-[2.875rem]",
              )}
            >
              {problem.headline.map((line) => (
                <span key={line} className="inline lg:block">
                  {line}{" "}
                </span>
              ))}
            </motion.h2>

            {problem.body.map((paragraph, index) => (
              <motion.p
                key={paragraph}
                {...rise(0.16 + index * 0.06)}
                className={cn(
                  "mt-5 max-w-[38rem] leading-relaxed text-pretty",
                  "text-[1rem] text-white/72 sm:text-[1.0625rem]",
                )}
              >
                {paragraph}
              </motion.p>
            ))}

            {/* ---------------------- Failure grid ------------------ */}
            <motion.ul
              {...rise(0.3)}
              className="mt-8 grid max-w-[38rem] gap-3.5 sm:grid-cols-2"
            >
              {problem.failures.map((item) => {
                const Icon = problemIcons[item.icon];
                const tone = TONES[item.tone];

                return (
                  <li
                    key={item.label}
                    className={cn(
                      "flex items-center gap-4 rounded-xl p-4",
                      // Translucent, so the section ground shows through.
                      "border border-white/12 bg-white/4 backdrop-blur-sm",
                    )}
                  >
                    <Icon className={cn("size-7 shrink-0", tone.text)} />
                    <span className="text-[0.9375rem] leading-snug text-white/90">
                      {item.label}
                    </span>
                  </li>
                );
              })}
            </motion.ul>

            {/* ------------------------- Quote ---------------------- */}
            <motion.blockquote
              {...rise(0.38)}
              className={cn(
                "mt-9 max-w-[38rem] border-l-2 border-[#a87ff7] pl-5",
                "text-[1rem] leading-relaxed text-pretty text-white/80 italic",
                "sm:text-[1.0625rem]",
              )}
            >
              {problem.quote}
            </motion.blockquote>
          </div>

          {/* ======================= Signals + caption ================= */}
          {/* The column that overlays the full-bleed scene. On mobile it
              carries its own copy of the scene, since the bleed only exists
              from lg up. */}
          <div className="relative lg:self-stretch lg:pb-2">
            <Uncopyable
              aria-hidden
              className={cn(
                // Below lg this IS the scene box: the cards sit inside it, so
                // their percentage slots resolve against the illustration and
                // not against the taller column that also holds the caption.
                // From lg the full-bleed scene behind takes over, and this
                // becomes an invisible box of the same proportion that the
                // cards are placed within.
                "relative isolate @container",
                "aspect-[4/3] overflow-hidden rounded-2xl sm:aspect-[16/10]",
                "lg:aspect-[16/11] lg:overflow-visible lg:rounded-none",
              )}
            >
              {/* Mobile-only scene. From lg the bleed above takes over. */}
              <div className="absolute inset-0 -z-10 lg:hidden">
                <Image
                  src={problem.scene.src}
                  alt={problem.scene.alt}
                  width={problem.scene.width}
                  height={problem.scene.height}
                  sizes="100vw"
                  className="size-full object-cover object-right"
                />
                <span
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgb(13 16 24 / 0.68) 0%, rgb(13 16 24 / 0.18) 52%, transparent 78%)",
                  }}
                />
              </div>

              {/* The card layer, filling the box above. */}
              <div className="pointer-events-none absolute inset-0">
                {/* Dashed leaders, drawn under the cards. They trail off
                    rather than joining up — see the note at the top. */}
                <svg
                  viewBox="0 0 100 100"
                  fill="none"
                  preserveAspectRatio="none"
                  className="absolute inset-0 size-full"
                >
                  {SIGNAL_SLOTS.map((slot, index) => (
                    <motion.path
                      key={slot.leader}
                      d={slot.leader}
                      stroke="rgb(255 255 255 / 0.3)"
                      strokeWidth="0.3"
                      strokeDasharray="1.6 1.6"
                      vectorEffect="non-scaling-stroke"
                      initial={reduce ? { opacity: 1 } : { opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true, amount: "some" }}
                      transition={{
                        duration: 0.5,
                        delay: 0.75 + index * 0.12,
                        ease: easeOut,
                      }}
                    />
                  ))}
                </svg>

                {/* ------------------- Signal cards ------------------ */}
                {problem.signals.map((signal, index) => {
                  const Icon = problemIcons[signal.icon];
                  const tone = TONES[signal.tone];

                  return (
                    <motion.div
                      key={signal.source}
                      initial={
                        reduce
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0, y: 10, scale: 0.97 }
                      }
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, amount: "some" }}
                      transition={{
                        duration: 0.55,
                        delay: 0.45 + index * 0.14,
                        ease: easeOut,
                      }}
                      className={cn(
                        "absolute",
                        SIGNAL_SLOTS[index].card,
                        "flex items-center gap-[0.7em] rounded-[0.6em]",
                        "px-[0.85em] py-[0.7em]",
                        // Translucent on purpose: the scene reads through, so
                        // these look like readouts over the moment itself.
                        "border bg-[#0d1018]/72 backdrop-blur-md",
                        tone.border,
                      )}
                      // Scales with the card layer, so the cards hold their
                      // designed proportion at every width instead of swamping
                      // the scene on narrow screens.
                      style={{ fontSize: "clamp(0.6rem, 2.5cqw, 0.95rem)" }}
                    >
                      <Icon className={cn("size-[1.9em] shrink-0", tone.text)} />

                      <span className="min-w-0">
                        <span
                          className={cn(
                            "block text-[0.72em] font-bold tracking-[0.1em] uppercase",
                            tone.text,
                          )}
                        >
                          {signal.source}
                        </span>
                        <span className="mt-[0.2em] block text-[0.85em] text-white/90">
                          {signal.reading}
                        </span>
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </Uncopyable>

            {/* ------------------------ Caption --------------------- */}
            <motion.p
              {...rise(0.5)}
              className={cn(
                "mt-6 flex items-center gap-4 text-center",
                // From lg it pins to the bottom of the column, clear of the
                // counter — the design puts it on the section's lower edge
                // rather than trailing the cards.
                "lg:absolute lg:inset-x-0 lg:bottom-0 lg:mt-0",
              )}
            >
              <span aria-hidden="true" className="h-px flex-1 bg-white/18" />
              <span className="text-[0.8125rem] text-white/70 sm:text-sm">
                {problem.caption}
              </span>
              <span aria-hidden="true" className="h-px flex-1 bg-white/18" />
            </motion.p>
          </div>
        </div>
      </Container>
    </section>
  );
}
