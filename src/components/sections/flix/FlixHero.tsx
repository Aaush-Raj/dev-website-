"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { Uncopyable } from "@/components/ui/Uncopyable";
import { flix } from "@/content/flix";
import { cn } from "@/lib/utils";

/**
 * LURNYFLIX HERO
 * ---------------------------------------------------------------------------
 * Section 1: the statement on the left over the scene's dark ground, the
 * Studio window to the right, with three cards floating over and around it,
 * and a rail of three capabilities closing the section.
 *
 * THE SCENE IS THE SECTION'S GROUND, NOT AN INSET PICTURE
 * The supplied plate is the full-bleed background: its left third is the dark
 * field the copy sits on, and its right two-thirds carry the Studio window. So
 * it fills the section rather than occupying a column.
 *
 * WHAT SHIPS AS A RASTER, AND WHAT DOES NOT
 * The scene ships because the Studio contains a PHOTOGRAPH of the presenter
 * plus four photographic thumbnails — not something markup can rebuild. The
 * comic card's PICTURE ships for the same reason, but its frame and caption
 * are markup here.
 *
 * The source-formats bar and the knowledge-check card do NOT ship: both are
 * flat interface supplied as OPAQUE PNGs on the hero's near-black ground, so
 * layering either over the scene would seam a dark rectangle onto it. Rebuilt
 * below — no seam, crisp at any density, text selectable and translatable.
 * See scripts/build-flix-hero.cjs.
 *
 * THE ENTRANCE
 * The copy cascades line by line, then the scene's three cards arrive in the
 * order the product works in: the sources bar first, then the comic output it
 * produces, then the knowledge check laid over the finished video. The
 * capability rail follows. All of it is gated on `useReducedMotion`.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { hero } = flix;

/** The mark on each source-format tile. */
const formatIcons = {
  ppt: PptIcon,
  pdf: PdfIcon,
  web: WebIcon,
  recording: MicIcon,
} as const;

/** The mark beside each capability in the foot rail. */
const capabilityIcons = {
  document: DocumentIcon,
  sparkle: SparkleIcon,
  cursor: CursorIcon,
} as const;

export function FlixHero() {
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

  /** The lift the three floating cards share. */
  const lift = (delay: number) => ({
    initial: reduce
      ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
      : { opacity: 0, y: 26, scale: 0.94, filter: "blur(8px)" },
    whileInView: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
    viewport: { once: true, amount: "some" } as const,
    transition: { duration: 0.9, delay, ease: easeOut },
  });

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden",
        // The plate's own ground, so the section continues it wherever the
        // scene does not reach.
        "bg-[#1b1426] text-white",
        // Below lg the copy leads and the scene follows it; from lg up the
        // copy overlays the scene instead.
        "flex flex-col lg:block",
      )}
    >
      {/* ============================== Scene ======================== */}
      {/* In flow, at its own aspect: it IS the section's ground, and the copy
          sits on the dark field at its left. */}
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
          stack under the copy — at phone width they would cover the Studio
          and each other.

          They sit inside the SAME Container as the copy, not against the
          viewport: positioned against the viewport they would drift as the
          screen grew, since the copy is held by the container's max width
          while the cards were not. */}
      <Uncopyable className="pointer-events-none absolute inset-0 hidden lg:block">
        <Container width="hero" className="@container relative h-full">
          <div
            className="relative h-full"
            // Scales the cards with the container, so they hold their designed
            // proportion at every width.
            style={{ fontSize: "max(9px, 0.92cqw)" }}
          >
            {/*
              The sources feeding the Studio, above its top-left corner.

              Sits LOWER than the design's own 2%: the live header is a
              floating pill overlaying the top of the scene, and at that offset
              the bar rendered underneath it. 12% clears the pill and still
              reads as feeding the Studio from above.
            */}
            <motion.div
              {...lift(0.6)}
              className="absolute left-[41%] top-[12%] w-[22%]"
            >
              <SourceFormats />
            </motion.div>

            {/*
              The comic-style output, over the Studio's lower-left.

              Held right of 41%: the description's measure ends at 41% of the
              container, and at the design's own x the card sat on that copy.
            */}
            <motion.div
              {...lift(0.78)}
              className="absolute left-[41.5%] top-[52%] w-[20%]"
            >
              <ComicCard />
            </motion.div>

            {/* The knowledge check, over the Studio's bottom-right corner. */}
            <motion.div
              {...lift(0.96)}
              className="absolute left-[70%] top-[70%] w-[25%]"
            >
              <KnowledgeCheck />
            </motion.div>
          </div>
        </Container>
      </Uncopyable>

      {/* =============================== Copy ======================== */}
      {/* Overlays the scene from lg up, where the plate's left third is the
          empty dark field the design puts it on. Below that it is in flow
          above the scene — see the wrapper's ordering. */}
      <div className="order-1 lg:absolute lg:inset-0 lg:order-none">
        <Container width="hero" className="flex h-full flex-col justify-center">
          <div
            className={cn(
              // Held to the dark field's own width, so the copy never runs
              // onto the Studio behind it.
              "max-w-[34rem] pt-28 pb-14 sm:pt-32 sm:pb-16",
              "lg:max-w-[40%] lg:pt-0 lg:pb-[7rem]",
            )}
          >
            {/* The wordmark and the positioning line, stacked as the design
                sets them. */}
            <motion.p
              {...rise(0.05)}
              className={cn(
                "text-[0.8125rem] font-bold uppercase",
                "tracking-[0.24em] text-[#b98cff]",
              )}
            >
              {hero.wordmark}
            </motion.p>

            <motion.p
              {...rise(0.12)}
              className={cn(
                "mt-2.5 text-[0.6875rem] font-semibold uppercase sm:text-xs",
                "tracking-[0.2em] text-[#cdc4dd]",
              )}
            >
              {hero.eyebrow}
            </motion.p>

            <motion.h1
              {...rise(0.22)}
              className={cn(
                "mt-6 font-display font-bold tracking-[-0.035em]",
                "leading-[1.02] text-white",
                "text-[2.125rem] sm:text-[2.75rem] lg:text-[3rem] xl:text-[3.875rem]",
              )}
            >
              {hero.headline.map((line) => (
                <span key={line} className="inline lg:block">
                  {line}{" "}
                </span>
              ))}
            </motion.h1>

            <motion.p
              {...rise(0.34)}
              className={cn(
                "mt-6 max-w-[30rem] leading-relaxed text-pretty",
                "text-[0.9375rem] text-[#c6bdd6] sm:text-[1rem]",
                "xl:text-[1.0625rem]",
              )}
            >
              {hero.description}
            </motion.p>

            {/* -------------------------- Actions ------------------- */}
            <motion.div
              {...rise(0.46)}
              className="mt-9 flex flex-wrap items-center gap-3.5"
            >
              <Link
                href={hero.actions.primary.href}
                className={cn(
                  "group/cta inline-flex h-13 items-center justify-center gap-2.5 rounded-xl px-7",
                  "bg-[#7b16e8] text-[0.9375rem] font-semibold text-white",
                  // `translate`, not `transform`: Tailwind v4 compiles the
                  // translate utilities to the standalone property.
                  "duration-normal transition-[background-color,box-shadow,translate] ease-out",
                  "will-change-[translate]",
                  "hover:-translate-y-0.5 hover:bg-[#8f2bfb]",
                  "hover:shadow-[0_16px_36px_-12px_rgb(123_22_232/0.65)]",
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
                  "text-[0.9375rem] font-semibold text-white",
                  "ring-1 ring-white/35 ring-inset",
                  "duration-normal transition-[background-color,box-shadow,translate] ease-out",
                  "will-change-[translate]",
                  "hover:-translate-y-0.5 hover:bg-white/10",
                  "active:translate-y-0",
                )}
              >
                {hero.actions.secondary.label}
              </Link>
            </motion.div>
          </div>
        </Container>
      </div>

      {/* --------------------- The cards, stacked ------------------ */}
      {/* The small-screen home for the same three cards. They cannot overlay
          the scene at this width without covering the Studio. */}
      <Uncopyable className="order-3 lg:hidden">
        <Container width="hero" className="pb-12">
          <div className="grid gap-4 text-[12px] sm:grid-cols-2">
            <div className="sm:col-span-2">
              <SourceFormats />
            </div>
            <ComicCard />
            <KnowledgeCheck />
          </div>
        </Container>
      </Uncopyable>

      {/* ====================== Capability rail ====================== */}
      {/* Closes the section, as the design's footer ribbon does. Supplied as a
          2170x725 PNG of three labels on a rule; drawn here instead. */}
      <div className="order-4 relative border-t border-white/12 lg:order-none">
        <Container width="hero">
          <ul
            className={cn(
              "grid gap-y-6 py-7",
              "sm:grid-cols-3",
              // The design rules between the three items, not around them.
              "sm:divide-x sm:divide-white/12",
            )}
          >
            {hero.capabilities.map((item, index) => {
              const Icon = capabilityIcons[item.icon];

              return (
                <motion.li
                  key={item.label}
                  {...rise(0.6 + index * 0.1)}
                  className={cn(
                    "group/item flex items-center gap-4",
                    "sm:justify-center sm:px-6",
                  )}
                >
                  <Icon
                    className={cn(
                      "size-6 shrink-0 text-[#a970ff]",
                      "duration-normal transition-[scale] ease-out",
                      "will-change-[scale] group-hover/item:scale-110",
                    )}
                  />
                  <span className="text-[0.9375rem] text-[#ddd6e8]">
                    {item.label}
                  </span>
                </motion.li>
              );
            })}
          </ul>
        </Container>
      </div>
    </section>
  );
}

/* ========================================================================== */
/*  The three floating cards                                                  */
/* ========================================================================== */

/**
 * THE SOURCE FORMATS — what a video can be made from.
 *
 * Four tiles on a pale bar, tilted as the design draws it, with an arrow
 * curving out of its right edge down toward the Studio. Sized in `em` so it
 * scales with whichever context sets the font size.
 */
function SourceFormats() {
  return (
    <div className="relative">
      <div
        className={cn(
          "flex items-center gap-[0.55em] rounded-[1.25em] p-[0.7em]",
          "bg-[#e9e4f6]",
          "shadow-[0_20px_44px_-18px_rgb(0_0_0/0.55)]",
          // Tipped as the design sets it — the bar reads as an object over the
          // scene rather than a panel pinned to the grid.
          "-rotate-[5deg]",
        )}
      >
        {hero.formats.items.map((item) => {
          const Icon = formatIcons[item.icon];

          return (
            <span
              key={item.label}
              className={cn(
                // `basis-0 grow` rather than a plain `flex-1`: "Recording" is
                // three times the width of "PPT", and equal-basis tiles let it
                // overflow its own tile while the short labels sat in dead space.
                "flex min-w-0 shrink grow basis-0 flex-col items-center",
                "justify-center gap-[0.3em]",
                "rounded-[0.8em] bg-white px-[0.35em] py-[0.7em]",
              )}
            >
              <Icon className="size-[1.9em]" />
              <span
                className={cn(
                  "text-[0.72em] font-semibold text-[#241a33]",
                  // One line always: a wrapped "Recording" would make its tile
                  // taller than the three beside it.
                  "whitespace-nowrap",
                )}
              >
                {item.label}
              </span>
            </span>
          );
        })}
      </div>

      {/*
        The arrow out of the bar's right edge, curving down to the Studio.

        On its own box beside the bar rather than inside it: the bar is tilted,
        and a child of a rotated element inherits that rotation, which would
        swing the arrow off its target.
      */}
      <svg
        viewBox="0 0 60 70"
        fill="none"
        aria-hidden="true"
        className={cn(
          "absolute left-full top-[38%] h-[3.6em] w-[3em] -translate-y-1/2",
          // Only where the Studio is actually beside the bar. In the stacked
          // layout below lg the cards sit under the scene, so the arrow would
          // point at nothing.
          "hidden lg:block",
        )}
      >
        <path
          d="M2 8 C 30 8, 44 14, 44 46"
          stroke="#9b5cf6"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path d="M35 40 L44 54 L53 40 Z" fill="#9b5cf6" />
      </svg>
    </div>
  );
}

/**
 * THE COMIC-STYLE OUTPUT — one of the video styles LurnyFlix can produce.
 *
 * Only the picture is a raster; the frame, the caption and the tilt are drawn
 * here. See scripts/build-flix-hero.cjs for why.
 */
function ComicCard() {
  const { comic } = hero;

  return (
    <div
      className={cn(
        "rounded-[1.1em] bg-white p-[0.85em]",
        "shadow-[0_22px_50px_-18px_rgb(0_0_0/0.6)]",
        // Tipped the opposite way to the sources bar, as the design sets it.
        "rotate-[3deg]",
      )}
    >
      <p className="px-[0.2em] pb-[0.55em] text-[1.05em] font-bold tracking-[-0.01em] text-[#171326]">
        {comic.caption}
      </p>

      <Image
        src={comic.still.src}
        alt={comic.still.alt}
        width={comic.still.width}
        height={comic.still.height}
        sizes="(min-width: 1024px) 22vw, 45vw"
        className="h-auto w-full rounded-[0.6em]"
      />
    </div>
  );
}

/**
 * THE KNOWLEDGE CHECK — the interaction laid over a finished video.
 */
function KnowledgeCheck() {
  const { check } = hero;

  return (
    <div
      className={cn(
        "rounded-[1.1em] bg-white p-[1.15em]",
        "shadow-[0_22px_50px_-18px_rgb(0_0_0/0.6)]",
      )}
    >
      <div className="flex items-center gap-[0.75em]">
        <span
          className={cn(
            "flex size-[2.1em] shrink-0 items-center justify-center rounded-full",
            "bg-[#7b16e8] text-[1.15em] font-bold text-white",
          )}
        >
          ?
        </span>

        <span className="text-[1.05em] font-bold tracking-[-0.01em] text-[#171326]">
          {check.title}
        </span>
      </div>

      <div className="mt-[0.9em] grid grid-cols-2 gap-[0.6em]">
        {check.options.map((option) => (
          <span
            key={option}
            className={cn(
              "rounded-[0.6em] px-[0.7em] py-[0.6em] text-center",
              "text-[0.95em] text-[#2f2740]",
              "bg-[#faf9fd] ring-1 ring-[#e4dff0] ring-inset",
            )}
          >
            {option}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ========================================================================== */
/*  Icons                                                                     */
/* ========================================================================== */

/**
 * The four source formats carry their real brand marks, drawn rather than
 * shipped: the supplied crop is one opaque raster of the whole bar, so the
 * individual tiles were never available as assets.
 */

/** PowerPoint — the orange disc on its document. */
function PptIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <path d="M4 5.2A1.2 1.2 0 0 1 5.2 4h11.3L26 12.4v14.4a1.2 1.2 0 0 1-1.2 1.2H5.2A1.2 1.2 0 0 1 4 26.8V5.2Z" fill="#c43e1c"/>
      <path d="M16.5 4 26 12.4h-8.3a1.2 1.2 0 0 1-1.2-1.2V4Z" fill="#f0724b"/>
      <circle cx="17" cy="18" r="8" fill="#ed6c47"/>
      <path d="M17 10a8 8 0 0 1 8 8h-8v-8Z" fill="#ff8f6b"/>
      <rect x="6" y="14" width="12" height="12" rx="1.6" fill="#fff"/>
      <path
        d="M9.4 24v-8h2.9a2.6 2.6 0 0 1 0 5.2H9.4"
        stroke="#c43e1c"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

/** PDF — the red document with its curl. */
function PdfIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <path d="M5 5.2A1.2 1.2 0 0 1 6.2 4h12.4L27 12.4v14.4a1.2 1.2 0 0 1-1.2 1.2H6.2A1.2 1.2 0 0 1 5 26.8V5.2Z" fill="#e2231a"/>
      <path d="M18.6 4 27 12.4h-7.2a1.2 1.2 0 0 1-1.2-1.2V4Z" fill="#ff6a60"/>
      {/* The "A" of Acrobat, as the mark sets it. */}
      <path
        d="M12 22.5c3.6-6.4 5-8.6 6.2-8.6.9 0 1.2.7.9 1.6-.6 2-3.4 4.3-7.4 5.6-1.6.5-2.6.4-2.9-.2-.3-.7.4-1.2 1.6-1.4"
        stroke="#fff"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

/** Web — the blue globe. */
function WebIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="12" stroke="#1a73e8" strokeWidth="2.2" />
      <ellipse cx="16" cy="16" rx="5" ry="12" stroke="#1a73e8" strokeWidth="2.2" />
      <path d="M4.6 12h22.8M4.6 20h22.8" stroke="#1a73e8" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

/** Recording — the violet microphone. */
function MicIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <rect x="12" y="3.5" width="8" height="15" rx="4" fill="#7b16e8" />
      <path
        d="M7.2 15.2a8.8 8.8 0 0 0 17.6 0M16 24v4.5"
        stroke="#7b16e8"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Transform existing content — a document. */
function DocumentIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M14 3v5h5" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M8.5 12.5h7M8.5 16h4.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Create with AI — the four-point spark with its companions. */
function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M13.6 3.4c.7 4.2 2.1 5.6 6.3 6.3-4.2.7-5.6 2.1-6.3 6.3-.7-4.2-2.1-5.6-6.3-6.3 4.2-.7 5.6-2.1 6.3-6.3Z"
        fill="currentColor"
      />
      <path
        d="M6 14.6c.35 2 1 2.7 3 3-2 .35-2.65 1-3 3-.35-2-1-2.65-3-3 2-.3 2.65-1 3-3Z"
        fill="currentColor"
        opacity=".6"
      />
    </svg>
  );
}

/** Make videos interactive — the pointer. */
function CursorIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M5.5 3.4 19 11.2l-5.9 1.5-2.4 5.7L5.5 3.4Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** The arrow on the primary action. */
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
