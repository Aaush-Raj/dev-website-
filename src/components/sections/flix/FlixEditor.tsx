"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { Uncopyable } from "@/components/ui/Uncopyable";
import { flix } from "@/content/flix";
import { cn } from "@/lib/utils";

/**
 * LURNYFLIX — THE VIDEO EDITOR
 * ---------------------------------------------------------------------------
 * Section 6: the editor panel on the left, with a portrait preview over its
 * lower-left corner and a Voice & music card over its lower-right; the
 * statement and six capabilities on the right.
 *
 * THE ASSET SPLIT IS DIFFERENT HERE
 * Everywhere else on this page the rule has been: crop the photographs, draw
 * the chrome. The editor breaks that rule deliberately. It is not chrome
 * wrapped around a picture — it is ELEVEN photographs (the preview, six media
 * thumbnails, four scene thumbnails) woven through a dense two-column layout.
 * Cropping eleven stills and reassembling that grid would risk the pieces
 * drifting out of the arrangement they were rendered in, and every string in
 * it renders below 11px at the size this section draws it, which is too small
 * for the selectability a rebuild would buy.
 *
 * So the editor ships whole, and the portrait card with it — one photograph
 * under a caption, overlapping the editor's own corner.
 *
 * The Voice & music card DOES get rebuilt: it carries no photograph at all,
 * just two labelled rows and a waveform. See scripts/build-flix-editor.cjs.
 *
 * All three supplied cards carry alpha, so the two that ship layer over the
 * gradient without seaming.
 *
 * BELOW LG the two floating cards leave the editor and sit beside it in a
 * plain row — at phone width they would cover the editor's own controls.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { editor } = flix;

/** The mark beside each capability. */
const capabilityIcons = {
  formats: FormatsIcon,
  library: LibraryIcon,
  type: TypeIcon,
  globe: GlobeIcon,
  upload: UploadIcon,
  music: MusicIcon,
} as const;

/** The mark on each Voice & music row. */
const voiceIcons = {
  mic: MicIcon,
  note: NoteIcon,
} as const;

export function FlixEditor() {
  const reduce = useReducedMotion();

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

  /** The lift the editor and its two cards share. */
  const lift = (delay: number) => ({
    initial: reduce
      ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
      : { opacity: 0, y: 28, scale: 0.96, filter: "blur(8px)" },
    whileInView: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
    viewport: { once: true, amount: "some" } as const,
    transition: { duration: 0.9, delay, ease: easeOut },
  });

  return (
    <section className="relative isolate overflow-hidden bg-[#f3effb] py-section-lg">
      {/* The gradient. Covers the section, so everything sits on it. */}
      <Image
        src={editor.backdrop.src}
        alt={editor.backdrop.alt}
        width={editor.backdrop.width}
        height={editor.backdrop.height}
        aria-hidden="true"
        sizes="100vw"
        className="pointer-events-none absolute inset-0 -z-10 size-full object-cover"
      />

      <Container width="hero">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.62fr)] lg:gap-10 xl:gap-14">
          {/* ========================== The stage ===================== */}
          {/* The editor leads on lg; below that the copy comes first, since a
              screenshot this dense should not open the section unexplained. */}
          <Uncopyable className="order-2 lg:order-none">
            <motion.div {...lift(0.25)} className="relative @container">
              {/* The editor. Ships whole — see the note at the top. */}
              <Image
                src={editor.panel.src}
                alt={editor.panel.alt}
                width={editor.panel.width}
                height={editor.panel.height}
                sizes="(min-width: 1024px) 58vw, 94vw"
                className="h-auto w-full"
              />

              {/* ------------------- The portrait card ------------- */}
              {/* Over the editor's lower-left corner from lg up, as the design
                  overlaps it. Below that it drops into the row underneath. */}
              <motion.div
                {...lift(0.7)}
                className={cn(
                  /*
                   * Hangs off the editor's LEFT edge, only its right sliver
                   * overlapping. At -4% it sat over the video preview and the
                   * "Text animation" controls instead of beside them.
                   *
                   * The overhang is SMALLER at lg than at xl: the container's
                   * gutter is narrow there, and -9% pushed the card off the
                   * viewport's left edge and clipped it.
                   */
                  "hidden lg:absolute lg:bottom-[2%] lg:left-[-3%] lg:block",
                  "xl:left-[-9%]",
                  "lg:w-[17%]",
                )}
              >
                <Image
                  src={editor.portrait.src}
                  alt={editor.portrait.alt}
                  width={editor.portrait.width}
                  height={editor.portrait.height}
                  sizes="12vw"
                  className="h-auto w-full drop-shadow-[0_18px_36px_rgb(40_20_90/0.35)]"
                />
              </motion.div>

              {/* ------------------ The Voice & music card --------- */}
              {/* Over the editor's lower-right. Built in markup. */}
              <motion.div
                {...lift(0.95)}
                className={cn(
                  /*
                   * Over the media library's foot, hanging past the editor's
                   * right edge. Lower and further right it covered the scene
                   * thumbnails the editor is showing off.
                   */
                  "hidden lg:absolute lg:right-[-6%] lg:bottom-[-4%] lg:block",
                  "lg:w-[33%]",
                  // Scales the card with the stage, so it holds its designed
                  // proportion at every width.
                  "lg:text-[max(8px,1.05cqw)]",
                )}
              >
                <VoiceCard reduce={Boolean(reduce)} />
              </motion.div>
            </motion.div>

            {/* ------------------ The cards, in a row ------------- */}
            {/* The small-screen home for the same two cards. They cannot
                overlay the editor at this width without covering its own
                controls. */}
            <div className="mt-5 flex items-start gap-4 text-[12px] lg:hidden">
              <Image
                src={editor.portrait.src}
                alt={editor.portrait.alt}
                width={editor.portrait.width}
                height={editor.portrait.height}
                sizes="28vw"
                className="h-auto w-[30%] max-w-[9rem] shrink-0"
              />

              <div className="min-w-0 flex-1">
                <VoiceCard reduce={Boolean(reduce)} />
              </div>
            </div>
          </Uncopyable>

          {/* ========================= Right column =================== */}
          <div className="order-1 lg:order-none">
            <motion.p
              {...rise(0.05)}
              className={cn(
                "text-[0.6875rem] font-semibold uppercase sm:text-xs",
                "tracking-[0.2em] text-[#8b3ae6]",
              )}
            >
              {editor.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.16)}
              className={cn(
                "mt-6 font-display font-bold tracking-[-0.035em]",
                "leading-[1.06] text-[#171326]",
                "text-[1.875rem] sm:text-[2.25rem] xl:text-[2.625rem]",
              )}
            >
              {editor.headline.map((line) => (
                <span key={line} className="inline lg:block">
                  {line}{" "}
                </span>
              ))}
            </motion.h2>

            <motion.p
              {...rise(0.28)}
              className={cn(
                "mt-6 max-w-[30rem] leading-relaxed text-pretty",
                "text-[0.9375rem] text-[#3f3a52] sm:text-[1rem]",
              )}
            >
              {editor.description}
            </motion.p>

            {/* ---------------------- Capabilities ------------------ */}
            <ul className="mt-9 space-y-5">
              {editor.capabilities.map((capability, index) => {
                const Icon = capabilityIcons[capability.icon];

                return (
                  <motion.li
                    key={capability.label}
                    {...rise(0.38 + index * 0.08)}
                    className="flex items-center gap-4"
                  >
                    <Icon className="size-7 shrink-0 text-[#7b16e8]" />
                    <span className="text-[0.9375rem] text-[#241a33] sm:text-[1rem]">
                      {capability.label}
                    </span>
                  </motion.li>
                );
              })}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ========================================================================== */
/*  The Voice & music card                                                    */
/* ========================================================================== */

/**
 * Two labelled rows and a waveform.
 *
 * Rebuilt rather than shipped: it carries no photograph, so every part of it
 * is markup that stays selectable and crisp. Sized in `em` so it scales with
 * whichever context sets the font size.
 */
function VoiceCard({ reduce }: { reduce: boolean }) {
  const { voice } = editor;

  return (
    <div
      className={cn(
        "rounded-[1.1em] bg-white p-[1.1em]",
        "shadow-[0_22px_50px_-18px_rgb(40_20_90/0.35)]",
        "ring-1 ring-[#ece7f8]",
      )}
    >
      <p className="text-[1.15em] font-bold tracking-[-0.015em] text-[#1d0f3d]">
        {voice.title}
      </p>

      <ul className="mt-[0.9em] space-y-[0.65em]">
        {voice.rows.map((row) => {
          const Icon = voiceIcons[row.icon];

          return (
            <li key={row.label} className="flex items-center gap-[0.7em]">
              <span
                className={cn(
                  "flex size-[2.1em] shrink-0 items-center justify-center",
                  "rounded-[0.55em] bg-[#f0eafc]",
                )}
              >
                <Icon className="size-[1.1em] text-[#7b16e8]" />
              </span>

              <span className="min-w-0 flex-1 truncate text-[0.95em] text-[#2f2740]">
                {row.label}
              </span>

              {/* The select. Drawn as the design draws it — a control, not a
                  real one; this whole block is an illustration. */}
              <span
                className={cn(
                  "flex shrink-0 items-center gap-[0.5em] rounded-[0.5em]",
                  "px-[0.7em] py-[0.45em]",
                  "text-[0.88em] text-[#3f3a52]",
                  "ring-1 ring-[#e2dcf2] ring-inset",
                )}
              >
                {row.value}
                <ChevronIcon className="size-[0.8em] text-[#8b84a8]" />
              </span>
            </li>
          );
        })}
      </ul>

      {/* ---------------------------- Waveform -------------------- */}
      {/* Bar heights are a fixed table rather than random, so the card renders
          identically on the server and the client — a random waveform is a
          hydration mismatch. */}
      <div
        aria-hidden="true"
        className="mt-[1em] flex h-[2.4em] items-center justify-between gap-[0.07em]"
      >
        {WAVEFORM.map((height, index) => (
          <motion.span
            key={index}
            initial={reduce ? { scaleY: 1 } : { scaleY: 0.15 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: "some" }}
            transition={{
              duration: 0.45,
              // Runs left to right, so the waveform reads as playing.
              delay: 1.1 + index * 0.012,
              ease: easeOut,
            }}
            className="w-[0.14em] shrink-0 rounded-full bg-[#a970ff]"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * The waveform, as percentages of the strip's height.
 *
 * Fixed rather than `Math.random()`: a random waveform would differ between
 * the server render and the client's, which React reports as a hydration
 * mismatch.
 */
const WAVEFORM = [
  22, 34, 18, 44, 28, 56, 38, 70, 46, 30, 62, 40, 24, 52, 84, 58, 36, 68, 44,
  26, 48, 92, 60, 34, 72, 42, 28, 54, 38, 66, 46, 24, 58, 80, 50, 32, 64, 40,
  22, 46, 74, 52, 30, 60, 36, 26, 44, 68, 38, 24,
] as const;

/* ========================================================================== */
/*  Icons                                                                     */
/* ========================================================================== */

/**
 * The six capability marks, drawn inline rather than shipped: the pack
 * supplies them around 80x80, which is line art at the size this section
 * renders them, and inline stays crisp while inheriting currentColor.
 */

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** Portrait and landscape formats — a tall frame beside a wide one. */
function FormatsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" aria-hidden="true" className={className}>
      <rect x="2.5" y="5" width="9" height="18" rx="2.4" {...stroke} />
      <rect x="14.5" y="9" width="11" height="10" rx="2.4" {...stroke} />
    </svg>
  );
}

/** 1M+ stock videos and images — a picture frame. */
function LibraryIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" aria-hidden="true" className={className}>
      <rect x="3" y="4.5" width="22" height="19" rx="3" {...stroke} />
      <circle cx="10" cy="11" r="2.2" {...stroke} />
      <path d="M4.5 19.5 10.5 14l4.5 4 3.5-3 5 4.5" {...stroke} />
    </svg>
  );
}

/** Text animations and transitions — two T's, large and small. */
function TypeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" aria-hidden="true" className={className}>
      <path d="M2.5 6.5h12M8.5 6.5V22" {...stroke} />
      <path d="M16.5 12.5h9M21 12.5V22" {...stroke} />
    </svg>
  );
}

/** Multilingual text and audio — a globe. */
function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" aria-hidden="true" className={className}>
      <circle cx="14" cy="14" r="11" {...stroke} />
      <ellipse cx="14" cy="14" rx="4.6" ry="11" {...stroke} />
      <path d="M3.4 10.5h21.2M3.4 17.5h21.2" {...stroke} />
    </svg>
  );
}

/** Your logo and video uploads — a cloud with an arrow. */
function UploadIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" aria-hidden="true" className={className}>
      <path
        d="M8 20.5a5 5 0 0 1-.5-10 6.6 6.6 0 0 1 12.7 1.6A4.4 4.4 0 0 1 20.5 20.5"
        {...stroke}
      />
      <path d="M14 22.5V12M10.6 15.2 14 11.8l3.4 3.4" {...stroke} />
    </svg>
  );
}

/** Background music and voiceover — a pair of notes. */
function MusicIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" aria-hidden="true" className={className}>
      <path d="M10.5 20V6.5l12-2.2V17" {...stroke} />
      <ellipse cx="7.6" cy="20.4" rx="3" ry="2.5" {...stroke} />
      <ellipse cx="19.6" cy="17.4" rx="3" ry="2.5" {...stroke} />
    </svg>
  );
}

/** The Voiceover row's microphone. */
function MicIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="9" y="2.6" width="6" height="11" rx="3" fill="currentColor" />
      <path
        d="M5.4 11.4a6.6 6.6 0 0 0 13.2 0M12 18v3.4"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** The Background music row's note. */
function NoteIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M9 18V5.4l10-2v12"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <ellipse cx="6.6" cy="18" rx="2.6" ry="2.2" fill="currentColor" />
      <ellipse cx="16.6" cy="15.4" rx="2.6" ry="2.2" fill="currentColor" />
    </svg>
  );
}

/** The chevron on each select. */
function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path
        d="m4 6 4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
