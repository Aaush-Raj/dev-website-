"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { compliance } from "@/content/compliance";
import { cn } from "@/lib/utils";

/**
 * COMPLIANCE HERO
 * ---------------------------------------------------------------------------
 * Section 1: the statement on the left over the scene's lavender wash, three
 * engine cards along the foot of the office to the right.
 *
 * THE SCENE IS THE SECTION'S GROUND, NOT AN INSET PICTURE
 * The supplied plate is the full-bleed background: its left third is a lavender
 * wash the copy sits on, and its right two-thirds are the office. So it fills
 * the section rather than occupying a column, and the copy overlays it.
 *
 * WHY THE CARDS ARE MARKUP
 * The pack ships them alpha-cut, so they COULD be layered without seaming —
 * but each is ~330x230 with its copy baked in as pixels, soft at this size and
 * unreadable to a screen reader. Only the scene ships as a raster; see
 * scripts/build-compliance-hero.cjs.
 *
 * The scene already carries every sticky note, the handwritten "Understand it.
 * Apply it." note with its arrows and the outcomes list, so nothing else is
 * drawn here.
 *
 * THE ENTRANCE
 * The copy cascades line by line, resolving out of a slight blur, and the three
 * cards then rise left to right — so the row reads as a sequence arriving
 * rather than one block appearing. All of it is gated on `useReducedMotion`.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { hero } = compliance;

/**
 * One card, discriminated on `body`.
 *
 * The content file declares the three `as const`, which makes their union a
 * union of three DIFFERENT object shapes — so `card.options` is not readable
 * off the union as a whole. Narrowing on `body` is what gives each panel below
 * exactly the fields it draws, checked rather than asserted.
 */
type Card = (typeof hero.cards)[number];
type CardOf<B extends Card["body"]> = Extract<Card, { body: B }>;

/** The glyph in each card's header. */
const cardIcons = {
  magic: MagicIcon,
  kxp: KxpIcon,
  pulse: PulseIcon,
} as const;

/**
 * Where each card sits over the scene, as percentages of it, and when it
 * arrives. Measured from the design: the row runs along the office floor, the
 * cards bleeding past the container's right edge as the design draws them.
 */
const CARD_SLOTS = [
  { slot: "left-[41.5%] top-[70.5%] w-[20.5%]", delay: 0.7 },
  { slot: "left-[63.5%] top-[70.5%] w-[20.5%]", delay: 0.85 },
  { slot: "left-[85.5%] top-[70.5%] w-[20.5%]", delay: 1 },
] as const;

export function ComplianceHero() {
  const reduce = useReducedMotion();

  /**
   * The statement's lines, each a little after the last. Blur is part of it —
   * a few pixels resolving as the line arrives is what makes the entrance read
   * as smooth rather than merely delayed.
   */
  const rise = (delay: number) => ({
    initial: reduce ? "shown" : "hidden",
    whileInView: "shown",
    viewport: { once: true, amount: "some" } as const,
    variants: {
      hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
      shown: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.85, delay, ease: easeOut },
      },
    },
  });

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden",
        // The wash at the plate's left edge, so the section continues it
        // wherever the scene does not reach.
        "bg-[#f6f3fd]",
        // Below lg the copy leads and the scene follows it; from lg up the
        // copy overlays the scene instead.
        "flex flex-col lg:block",
      )}
    >
      {/* ============================== Scene ======================== */}
      {/* In flow, at its own aspect: it IS the section's ground, and the copy
          sits in the lavender wash on its left. */}
      <Image
        src={hero.scene.src}
        alt={hero.scene.alt}
        width={hero.scene.width}
        height={hero.scene.height}
        // Above the fold and the visual subject, so it must not lazy-load —
        // this is the LCP candidate on the page.
        priority
        sizes="100vw"
        className="order-2 h-auto w-full lg:order-none"
      />

      {/* ------------------------ The three cards ------------------- */}
      {/* Positioned over the scene from lg up. Below that they leave it and
          stack under the copy — at phone width they would cover the subject
          and each other.

          They sit inside the SAME Container as the copy, not against the
          viewport: positioned against the viewport they would drift as the
          screen grew, since the copy is held by the container's max width
          while the cards were not. Sharing it keeps the row aligned to the
          headline at every size. */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        <Container width="hero" className="relative h-full @container">
          <div
            className="relative h-full"
            // Scales the cards with the container, so they hold their designed
            // proportion at every width.
            style={{ fontSize: "max(9px, 1.02cqw)" }}
          >
            {hero.cards.map((card, index) => (
              <motion.div
                key={card.engine}
                initial={
                  reduce
                    ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
                    : { opacity: 0, y: 26, scale: 0.94, filter: "blur(8px)" }
                }
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                viewport={{ once: true, amount: "some" }}
                transition={{
                  duration: 0.9,
                  delay: CARD_SLOTS[index].delay,
                  ease: easeOut,
                }}
                className={cn("absolute", CARD_SLOTS[index].slot)}
              >
                <EngineCard card={card} />
              </motion.div>
            ))}
          </div>
        </Container>
      </div>

      {/* =============================== Copy ======================== */}
      {/* Overlays the scene from lg up, where the plate's left third is the
          empty wash the design puts it on. Below that it is in flow above the
          scene — see the wrapper's ordering. */}
      <div className="order-1 lg:absolute lg:inset-0 lg:order-none">
        <Container width="hero" className="flex h-full flex-col justify-center">
          <div
            className={cn(
              // Held to the wash's own width, so the copy never runs onto the
              // office behind it.
              "max-w-[34rem] pt-28 pb-14 sm:pt-32 sm:pb-16 lg:max-w-[38%] lg:py-0",
            )}
          >
            <motion.p
              {...rise(0.05)}
              className={cn(
                "text-[0.6875rem] font-bold uppercase",
                "tracking-[0.18em] text-[#8b1fd6] sm:text-xs",
              )}
            >
              {hero.eyebrow}
            </motion.p>

            <motion.h1
              {...rise(0.16)}
              className={cn(
                "mt-5 font-display font-bold tracking-[-0.038em]",
                "leading-[1.02] text-[#0b0b18]",
                "text-[2rem] sm:text-[2.5rem] lg:text-[2.875rem] xl:text-[3.75rem]",
              )}
            >
              {hero.headline.map((line) => (
                <span key={line} className="inline lg:block">
                  {line}{" "}
                </span>
              ))}
            </motion.h1>

            <motion.p
              {...rise(0.3)}
              className={cn(
                "mt-6 max-w-[30rem] leading-relaxed text-pretty",
                "text-[0.9375rem] text-[#101030]/80 sm:text-[1rem]",
                "xl:text-[1.0625rem]",
              )}
            >
              {hero.description}
            </motion.p>

            {/* -------------------------- Actions ------------------- */}
            {/* The design draws BOTH as buttons — filled and outlined — unlike
                the onboarding hero, whose second action is a plain link. */}
            <motion.div
              {...rise(0.42)}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Link
                href={hero.actions.primary.href}
                className={cn(
                  "group/cta inline-flex h-13 items-center justify-center gap-2.5 rounded-xl px-7",
                  "bg-[#8b1fd6] text-[0.9375rem] font-semibold text-white",
                  // `translate`, not `transform`: Tailwind v4 compiles the
                  // translate utilities to the standalone property.
                  "duration-normal transition-[background-color,box-shadow,translate] ease-out",
                  "will-change-[translate]",
                  "hover:-translate-y-0.5 hover:bg-[#7616ba]",
                  "hover:shadow-[0_16px_36px_-12px_rgb(139_31_214/0.5)]",
                  "active:translate-y-0",
                )}
              >
                {hero.actions.primary.label}
                <ArrowIcon
                  className={cn(
                    "size-4",
                    "duration-normal transition-[translate] ease-out",
                    "group-hover/cta:translate-x-1",
                  )}
                />
              </Link>

              <Link
                href={hero.actions.secondary.href}
                className={cn(
                  "inline-flex h-13 items-center justify-center rounded-xl px-7",
                  "text-[0.9375rem] font-semibold text-[#7d17c9]",
                  "ring-1 ring-[#8b1fd6] ring-inset",
                  "duration-normal transition-[background-color,color,box-shadow,translate] ease-out",
                  "will-change-[translate]",
                  "hover:-translate-y-0.5 hover:bg-[#8b1fd6] hover:text-white",
                  "hover:shadow-[0_16px_36px_-14px_rgb(139_31_214/0.45)]",
                  "active:translate-y-0",
                )}
              >
                {hero.actions.secondary.label}
              </Link>
            </motion.div>

            {/* ------------------------ Powered by ------------------ */}
            {/* One line, as the design sets it: the label and the engines run
                together rather than stacking. */}
            <motion.p
              {...rise(0.54)}
              className="mt-6 text-[0.8125rem] text-[#565278]"
            >
              {hero.poweredBy.label}{" "}
              {hero.poweredBy.engines.map((engine, index) => (
                <span key={engine}>
                  {index > 0 && (
                    <span aria-hidden="true" className="text-[#a29fbb]">
                      {" · "}
                    </span>
                  )}
                  {engine}
                </span>
              ))}
            </motion.p>
          </div>
        </Container>
      </div>

      {/* ---------------------- Decorative footer ------------------- */}
      {/* Pinned to the plate's bottom-left, where the design sets it. It is
          atmosphere rather than content — hidden from the reading order and
          only drawn where there is room for it under the copy. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-8 hidden xl:block"
      >
        <Container width="hero">
          <motion.div
            {...rise(0.7)}
            className="flex items-center gap-4 text-[#a6a0c4]"
          >
            <span className="h-px w-8 bg-current" />
            <span className="text-[0.6875rem] font-medium uppercase tracking-[0.22em] leading-[1.7]">
              {hero.footnote.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </span>
          </motion.div>
        </Container>
      </div>

      {/* --------------------- The cards, stacked ------------------ */}
      {/* The small-screen home for the same three cards. They cannot overlay
          the scene at this width without covering the subject. */}
      <Container width="hero" className="order-3 pb-14 lg:hidden">
        <ul className="grid gap-4 text-[13px] sm:grid-cols-2 lg:grid-cols-3">
          {hero.cards.map((card) => (
            <li key={card.engine}>
              <EngineCard card={card} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/**
 * One engine card. Shared by the overlaid and the stacked layouts, so the two
 * cannot drift apart.
 *
 * Sized in `em` so it scales with whichever context sets the font size. The
 * three share a header — engine name, then the action at the right — and * differ only in the panel beneath, selected by `card.body`.
 */
function EngineCard({ card }: { card: Card }) {
  const Icon = cardIcons[card.icon];

  return (
    <div
      className={cn(
        "rounded-[1.15em] bg-white p-[1.35em]",
        "shadow-[0_22px_50px_-20px_rgb(30_15_60/0.35)]",
        "ring-1 ring-[#efebf9]",
      )}
    >
      {/* ----------------------------- Header --------------------- */}
      <div className="flex items-center justify-between gap-[1em]">
        <span className="flex items-center gap-[0.55em]">
          <Icon className="size-[1.35em] shrink-0 text-[#7c1ed1]" />
          <span className="text-[1.05em] font-bold tracking-[-0.01em] text-[#3d0b8f]">
            {card.engine}
          </span>
        </span>

        <span className="shrink-0 text-[0.9em] text-[#6b6889]">
          {card.action}
        </span>
      </div>

      {/* The heading the first two cards carry above their panel. LurnyPulse
          has none — its levels row reads as its own heading. */}
      {card.body !== "levels" && (
        <p className="mt-[0.9em] text-[1.05em] font-bold tracking-[-0.01em] text-[#0a0a18]">
          {card.title}
        </p>
      )}

      {card.body === "transform" && <TransformPanel card={card} />}
      {card.body === "question" && <QuestionPanel card={card} />}
      {card.body === "levels" && <LevelsPanel card={card} />}
    </div>
  );
}

/**
 * LURNYMAGIC — a document becoming a lesson.
 *
 * The document, an arrow, then the two outputs it turns into: a video and an
 * audio track. Drawn rather than shipped so it stays sharp at any width.
 */
function TransformPanel({ card }: { card: CardOf<"transform"> }) {
  return (
    <>
      <div className="mt-[1em] flex items-center gap-[0.7em]">
        <DocumentGlyph className="h-[3.3em] w-[2.7em] shrink-0" />

        <ArrowIcon className="size-[1.3em] shrink-0 text-[#8b1fd6]" />

        {/* The video tile, filled — it is the primary output the design
            emphasises. */}
        <span
          className={cn(
            "flex h-[3.3em] flex-1 items-center justify-center",
            "rounded-[0.65em] bg-[#efe7fd] ring-1 ring-[#ddd0f8] ring-inset",
          )}
        >
          <span
            className={cn(
              "flex h-[1.9em] w-[2.6em] items-center justify-center",
              "rounded-[0.4em] bg-[#7c1ed1]",
            )}
          >
            <PlayIcon className="size-[0.95em] text-white" />
          </span>
        </span>

        {/* The audio tile. */}
        <span
          className={cn(
            "flex h-[3.3em] w-[2.9em] shrink-0 items-center justify-center",
            "rounded-[0.65em] bg-[#f4f2fb] ring-1 ring-[#e6e2f4] ring-inset",
          )}
        >
          <WaveIcon className="size-[1.4em] text-[#7c1ed1]" />
        </span>
      </div>

      <p className="mt-[1.05em] text-[0.98em] leading-[1.45] text-[#3a3a5c]">
        {card.caption}
      </p>
    </>
  );
}

/**
 * LURNYKXP — a check the learner answers.
 *
 * Three options, the first of them the approved one: the design fills its
 * radio and lays a tinted row behind it.
 */
function QuestionPanel({ card }: { card: CardOf<"question"> }) {
  return (
    <ul className="mt-[0.9em] space-y-[0.15em]">
      {card.options.map((option, index) => {
        const approved = index === 0;

        return (
          <li
            key={option}
            className={cn(
              "flex items-center gap-[0.75em] rounded-[0.5em] py-[0.5em]",
              approved && "-mx-[0.55em] bg-[#f1ecfc] px-[0.55em]",
            )}
          >
            <span
              className={cn(
                "flex size-[1.15em] shrink-0 items-center justify-center rounded-full",
                approved
                  ? "bg-[#6a12c4] ring-[0.16em] ring-[#6a12c4]"
                  : "ring-[0.13em] ring-[#c9c4dd] ring-inset",
              )}
            />
            <span
              className={cn(
                "text-[0.98em] leading-[1.35]",
                approved ? "text-[#161634]" : "text-[#4d4c6b]",
              )}
            >
              {option}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

/**
 * LURNYPULSE — where this person is against where the role requires them.
 *
 * The two levels, the track between them with the current stop filled, and the
 * focus the gap points at.
 */
function LevelsPanel({ card }: { card: CardOf<"levels"> }) {
  const { levels, track } = card;

  return (
    <>
      <div className="mt-[1.1em] flex items-center justify-between gap-[1em] text-[0.98em]">
        <span className="text-[#4d4c6b]">
          {levels.currentLabel}: <b className="text-[#0a0a18]">{levels.current}</b>
        </span>
        <span className="text-[#4d4c6b]">
          {levels.requiredLabel}:{" "}
          <b className="text-[#0a0a18]">{levels.required}</b>
        </span>
      </div>

      {/* The rail, with the stops sitting on it. `justify-between` puts the
          first and last flush to the ends, as the design draws them. */}
      <div className="relative mt-[0.9em] flex items-center justify-between">
        <span className="absolute inset-x-0 h-[0.28em] rounded-full bg-[#e2dcf5]" />

        {Array.from({ length: track.steps }).map((_, index) => (
          <span
            key={index}
            className={cn(
              "relative rounded-full",
              index === track.at
                ? "size-[0.95em] bg-[#6a12c4]"
                : "size-[0.8em] bg-[#cfc6ea]",
            )}
          />
        ))}
      </div>

      <p className="mt-[1.15em] text-[0.98em] leading-[1.4] text-[#3a3a5c]">
        <b className="font-bold text-[#0a0a18]">{card.focus.label}:</b>{" "}
        {card.focus.value}
      </p>
    </>
  );
}

/* ========================================================================== */
/*  Icons                                                                     */
/* ========================================================================== */

/** LurnyMagic — the four-point spark. */
function MagicIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 2.4c.7 4.6 2.3 6.2 6.9 6.9-4.6.7-6.2 2.3-6.9 6.9-.7-4.6-2.3-6.2-6.9-6.9 4.6-.7 6.2-2.3 6.9-6.9Z"
        fill="currentColor"
      />
      <path
        d="M18.4 15.2c.35 2.2 1.1 3 3.3 3.3-2.2.35-2.95 1.1-3.3 3.3-.35-2.2-1.1-2.95-3.3-3.3 2.2-.35 2.95-1.1 3.3-3.3Z"
        fill="currentColor"
        opacity=".55"
      />
    </svg>
  );
}

/** LurnyKxP — the knowledge cube. */
function KxpIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 2.9 20.4 7v10L12 21.1 3.6 17V7L12 2.9Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M3.9 7.2 12 11.4l8.1-4.2M12 11.4v9.4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** LurnyPulse — the rising bars. */
function PulseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="13.5" width="4.6" height="7.5" rx="1.4" fill="currentColor" />
      <rect x="9.7" y="8" width="4.6" height="13" rx="1.4" fill="currentColor" />
      <rect x="16.4" y="3" width="4.6" height="18" rx="1.4" fill="currentColor" />
    </svg>
  );
}

/** The source policy, as a page of ruled lines with a folded corner. */
function DocumentGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 34 42" fill="none" className={className} aria-hidden="true">
      <path
        d="M1 3.5A2.5 2.5 0 0 1 3.5 1h18.6L33 11.9v26.6a2.5 2.5 0 0 1-2.5 2.5h-27A2.5 2.5 0 0 1 1 38.5v-35Z"
        fill="#f4f2fb"
        stroke="#e0dbf1"
        strokeWidth="1.4"
      />
      <path d="M22 1.6v10.5h10.4" stroke="#e0dbf1" strokeWidth="1.4" />
      <path
        d="M7.5 18h13M7.5 23h13M7.5 28h13M7.5 33h8"
        stroke="#b9b2d6"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** The video output's play mark. */
function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden="true">
      <path d="M5.6 3.6 12 8l-6.4 4.4V3.6Z" />
    </svg>
  );
}

/** The audio output's waveform. */
function WaveIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 10v4M8.5 6.5v11M13 4v16M17.5 8v8M21 10.5v3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** The arrow on the primary action and in the transform panel. */
function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path
        d="M3 8h9m0 0-3.4-3.4M12 8l-3.4 3.4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
