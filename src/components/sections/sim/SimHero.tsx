"use client";

import type { ComponentType, SVGProps } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { Uncopyable } from "@/components/ui/Uncopyable";
import { sim } from "@/content/sim";
import { cn } from "@/lib/utils";

import {
  BarsIcon,
  KeyboardIcon,
  MicIcon,
  PeopleIcon,
  SparkleIcon,
  UserIcon,
} from "./SimIcons";

/**
 * LURNYSIM — HERO
 * ---------------------------------------------------------------------------
 * Section 1: the statement and two buttons on the left; on the right a live
 * simulation window with a performance scorecard overlapping its lower corner,
 * over a photograph of an agent mid-conversation.
 *
 * ONLY THE PHOTOGRAPH AND THE PERSONA AVATAR SHIP — 151KB against the 5.7MB
 * the asset pack supplies for this section. Everything else is drawn:
 *
 *   - The background is a left-to-right ramp, #221d42 to #a566f1. Sampled
 *     down five columns of the supplied 1080KB plate it is near-constant
 *     vertically, so it is a gradient, and a gradient scales to any viewport
 *     where a fixed plate would band or crop.
 *   - Both cards are interface — panels, chat bubbles, a pill toggle, score
 *     tiles — so the 2MB of card PNGs are not used.
 *   - The three feature glyphs render at 20px; the pack ships them at 1254px.
 *
 * The persona avatar is the exception among the small marks: a rendered 3D
 * character with modelled lighting, which markup cannot reproduce. 6.7KB.
 *
 * THE WINDOW AND SCORECARD ARE ILLUSTRATIVE, not a recording of a session —
 * `Uncopyable` and aria-hidden throughout, so the transcript never reaches a
 * screen reader as if it were page copy, and the scorecard keeps the design's
 * "Illustrative session" footnote.
 */

const { hero } = sim;

/** Motion's string easings are not typed, so the cubic curve is spelled out. */
const easeOut = [0.16, 1, 0.3, 1] as const;

const FEATURE_GLYPHS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  people: PeopleIcon,
  mic: MicIcon,
  bars: BarsIcon,
};

const MODE_GLYPHS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  mic: MicIcon,
  keyboard: KeyboardIcon,
};

export function SimHero() {
  const reduce = useReducedMotion();

  /*
    The hero is above the fold, so these animate on mount rather than on
    scroll — a `whileInView` here can leave the first paint at opacity 0.
  */
  const rise = (delay: number) => ({
    initial: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: easeOut },
  });

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden",
        /*
          The plate's ramp, sampled at five columns: a deep indigo on the left
          running to a light violet at the right edge.
        */
        "bg-[linear-gradient(100deg,#221d42_0%,#241e46_38%,#46298c_62%,#7b4bc8_82%,#a566f1_100%)]",
        "text-white",
        // The header floats over the page, so a hero clears it explicitly —
        // the same step the other hero sections on this build use.
        "pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24",
      )}
    >
      {/* ========================= Background ========================= */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        {/* The soft bloom the plate carries behind the right-hand panels. */}
        <span className="absolute top-[-18%] right-[6%] size-[34rem] rounded-full bg-[#a566f1]/25 blur-3xl" />
        <span className="absolute right-[-8%] bottom-[-26%] size-[30rem] rounded-full bg-[#7b4bc8]/30 blur-3xl" />
      </div>

      {/* ========================== Photo ============================= */}
      {/*
        The agent sits behind the panels, bled to the section's right edge.
        Hidden below `xl`: at narrower widths the panels stack over the full
        width and the photograph would sit behind text rather than beside it.
      */}
      {/*
        The BAND is masked, not the image — the tint passes are siblings of
        the photograph, so fading only the image would leave them painting a
        hard edge of their own. Masking the whole group fades photograph and
        tint together, and nothing has to match the section's gradient at the
        seam.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden w-[44%] xl:block"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, rgb(0 0 0 / 0.3) 20%, rgb(0 0 0 / 0.82) 46%, #000 66%)",
        }}
      >
        <Image
          src={hero.photo.src}
          alt=""
          fill
          priority
          sizes="42vw"
          /*
            The source is cropped to head-and-shoulders, so `cover` anchored
            bottom-centre frames him as the design does — the full desk scene
            would put a laptop where the design shows his face.
          */
          className="object-cover object-[78%_bottom]"
        />
        {/*
          A violet wash over the photograph, so it sits inside the gradient
          rather than reading as a pasted cut-out. `color` carries the hue
          without flattening the modelling; the soft-light pass deepens the
          shadows the hue pass alone leaves grey.
        */}
        <span className="absolute inset-0 bg-[#6d3fb8] opacity-70 mix-blend-color" />
        {/* Deepens the shadows the hue pass alone leaves grey. */}
        <span className="absolute inset-0 bg-[#3a1f78] opacity-45 mix-blend-soft-light" />
      </div>

      <Container width="hero">
        <div
          className={cn(
            "grid items-center gap-12",
            /*
              Measured from the design: the statement holds the left 37% and
              the panels the rest. From `xl` the panel column is a placeholder
              that only reserves height — the panels themselves are pinned to
              the section below, because the scorecard's right edge sits 1.5%
              from the FRAME edge, which a centred container cannot reach.
            */
            "xl:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] xl:gap-8",
            // Grid items default to `min-width: auto`; without this the score
            // grid's widest row can force its column past the container.
            "[&>*]:min-w-0",
          )}
        >
          {/* ========================= Statement ======================= */}
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "font-mono text-[0.8125rem] font-bold tracking-[0.22em] uppercase",
                "text-[#d996f9]",
              )}
            >
              {hero.eyebrow}
            </motion.p>

            <motion.p
              {...rise(0.06)}
              className={cn(
                "mt-2.5 font-mono text-[0.75rem] font-medium tracking-[0.16em] uppercase",
                "text-[#bdade5]",
              )}
            >
              {hero.eyebrowSub}
            </motion.p>

            <motion.h1
              {...rise(0.12)}
              className={cn(
                "mt-6 font-display font-bold tracking-[-0.035em]",
                "leading-[1.02] text-balance",
                /*
                  Measured from the design: the three lines span 32.6% of the
                  frame. Each line is nowrap, so the size is capped by the
                  longest of them, "Build confidence" — 3.5rem is what fits
                  the column at 1280, and 3.75rem from 1536 up.
                */
                "text-[2.5rem] sm:text-[3.25rem] xl:text-[3.5rem] 2xl:text-[3.75rem]",
              )}
            >
              {hero.headline.map((line) => (
                <span
                  key={line.text}
                  className={cn(
                    /*
                      Each content line owns a row and must not re-wrap: the
                      design sets three lines, and at this size the browser
                      breaks "Build confidence" into two given the chance.
                    */
                    "block whitespace-nowrap",
                    "accent" in line && line.accent && "text-[#e6a8fe]",
                  )}
                >
                  {line.text}
                </span>
              ))}
            </motion.h1>

            <motion.p
              {...rise(0.18)}
              className={cn(
                "mt-6 max-w-[30rem] leading-relaxed text-pretty",
                "text-[1.0625rem] text-[#c2b1e9] sm:text-[1.125rem]",
              )}
            >
              {hero.description}
            </motion.p>

            {/* ------------------------ Actions ---------------------- */}
            <motion.div
              {...rise(0.24)}
              className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <Link
                href={hero.actions.primary.href}
                className={cn(
                  "group inline-flex items-center justify-center gap-3",
                  "rounded-xl bg-[#7600ff] px-7 py-4",
                  "text-[1.0625rem] font-bold text-white",
                  "duration-normal transition-[translate,background-color,box-shadow] ease-out",
                  "will-change-[translate]",
                  "hover:-translate-y-0.5 hover:bg-[#8a22ff]",
                  "hover:shadow-[0_1rem_2rem_-0.75rem_rgb(118_0_255/0.85)]",
                  "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white",
                )}
              >
                {hero.actions.primary.label}
                <ArrowIcon
                  className={cn(
                    "size-4 shrink-0",
                    "duration-normal transition-[translate] ease-out",
                    "group-hover:translate-x-1",
                  )}
                />
              </Link>

              <Link
                href={hero.actions.secondary.href}
                className={cn(
                  "inline-flex items-center justify-center",
                  "rounded-xl px-7 py-4 ring-1 ring-white/45",
                  "text-[1.0625rem] font-bold text-white",
                  "duration-normal transition-[background-color,translate] ease-out",
                  "will-change-[translate] hover:-translate-y-0.5 hover:bg-white/10",
                  "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white",
                )}
              >
                {hero.actions.secondary.label}
              </Link>
            </motion.div>

            {/* ------------------------ Features --------------------- */}
            <ul className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4 xl:gap-x-5">
              {hero.features.map((feature, index) => {
                const Glyph = FEATURE_GLYPHS[feature.icon];
                return (
                  <motion.li
                    key={feature.label}
                    {...rise(0.3 + index * 0.07)}
                    className="group/feature flex items-center gap-3"
                  >
                    <span
                      className={cn(
                        "grid size-10 shrink-0 place-items-center rounded-full xl:size-9",
                        "bg-white/12 text-[#f1e1f7] ring-1 ring-white/15",
                        "duration-normal transition-[scale,background-color] ease-out",
                        "will-change-[scale] group-hover/feature:scale-110",
                        "group-hover/feature:bg-white/20",
                      )}
                    >
                      <Glyph className="size-5" />
                    </span>
                    <span className="text-[1rem] whitespace-nowrap text-[#f1e1f7] xl:text-[0.9375rem]">
                      {feature.label}
                    </span>
                  </motion.li>
                );
              })}
            </ul>
          </div>

          {/* ========================== Panels ========================= */}
          {/*
            In flow up to `xl`, stacked under the statement. From `xl` the
            bled band below the container draws the panels instead — but this
            copy STAYS IN THE LAYOUT as an invisible spacer, because the band
            is absolutely positioned and so contributes no height. Without it
            the section collapses to the statement's height and the scorecard
            hangs out of the bottom.
          */}
          <div aria-hidden="true">
            {/* Below `xl`: the real, stacked panels. */}
            <div className="xl:hidden">
              <PanelGroup reduce={Boolean(reduce)} />
            </div>
            {/*
              From `xl`: the window alone, invisible, purely to reserve the
              row's height. The scorecard is left out because it overlaps the
              window in the bled copy rather than adding to it.
            */}
            <div className="hidden xl:invisible xl:block">
              <div className="w-[57.6%]">
                <SimulationWindow reduce />
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* ====================== Panels (bled) ====================== */}
      {/*
        From `xl` the panels leave the container and are pinned to the
        section, because the scorecard's right edge sits 1.5% from the FRAME
        edge in the design — past the container's gutter, which a grid cell
        cannot reach.

        `inset-y` rather than a height: the band centres the group against the
        section's own box, so it stays aligned with the statement beside it.
      */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[60%] items-center xl:flex">
        <div className="w-full pr-[2.5%]">
          <PanelGroup reduce={Boolean(reduce)} bled />
        </div>
      </div>
    </section>
  );
}

/* ========================================================================== */
/* PANEL GROUP                                                                */
/* ========================================================================== */

/**
 * The simulation window with the scorecard overlapping its lower right, and
 * the handwritten note beside them.
 *
 * Rendered twice — in flow below `xl`, bled to the section's right edge from
 * `xl` up — because the design's scorecard reaches past the page container.
 * `bled` switches on the overlap and the note; in the stacked copy the
 * scorecard sits under the window, where an overlap would bury the capture
 * row.
 *
 * Measured off the design, both against the window's own box:
 *   - the scorecard is 77% of the window's width,
 *   - overhangs its right edge by 69% of that width,
 *   - and drops 11% of the window's height below its foot.
 */
function PanelGroup({ reduce, bled }: { reduce: boolean; bled?: boolean }) {
  return (
    <Uncopyable>
      <motion.div
        initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 0.2, ease: easeOut }}
        className={cn("relative", bled && "w-[57.6%]")}
      >
        <SimulationWindow reduce={reduce} />

        <motion.div
          initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55, ease: easeOut }}
          className={cn(
            !bled && "mt-4",
            bled && "absolute right-[-69%] bottom-[-11%] w-[77%]",
          )}
        >
          <Scorecard reduce={reduce} />
        </motion.div>

        {/*
          The handwritten note sits over the photograph, so it belongs only to
          the bled copy — below `xl` the photograph is hidden.
        */}
        {bled ? (
          <motion.p
            aria-hidden="true"
            initial={
              reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }
            }
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.85, ease: easeOut }}
            className={cn(
              "pointer-events-none absolute z-1",
              // Measured from the design: it sits off the window's right
              // edge, level with the agent's shoulder.
              "top-[31%] right-[-47%] w-[9.5rem] rotate-[-4deg]",
              "rounded-2xl bg-white px-4 py-3",
              "shadow-[0_1rem_2rem_-0.75rem_rgb(30_16_60/0.55)]",
              "font-hand text-[1.25rem] leading-[1.15] text-[#2b1d4f]",
            )}
          >
            {hero.note.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </motion.p>
        ) : null}
      </motion.div>
    </Uncopyable>
  );
}

/* ========================================================================== */
/* SIMULATION WINDOW                                                          */
/* ========================================================================== */

/**
 * The live simulation panel.
 *
 * Drawn rather than shipped: a header, a persona row, two chat bubbles, a
 * mode toggle and a capture row — all interface, so the 1185KB PNG the pack
 * supplies for it buys nothing markup does not.
 */
function SimulationWindow({ reduce }: { reduce: boolean }) {
  const { window: win } = hero;

  return (
    <div
      className={cn(
        "rounded-[1.75rem] bg-[#faf8ff] p-5 sm:p-6",
        "ring-1 ring-white/25",
        "shadow-[0_2.5rem_5rem_-1.5rem_rgb(20_10_50/0.75)]",
      )}
    >
      {/* --------------------------- Header ------------------------- */}
      <div className="flex items-center gap-3.5">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#8101ff]">
          <SparkleIcon className="size-5 text-white" />
        </span>
        <p className="font-display text-[1.25rem] font-bold tracking-[-0.015em] text-[#1e1240]">
          {win.title}
        </p>

        <span className="ml-auto flex items-center gap-2.5">
          {/*
            The status dot pulses, so the session reads as running rather than
            paused. Stilled under reduced motion.
          */}
          <span className="relative grid size-2.5 place-items-center">
            <span className="size-2.5 rounded-full bg-[#22c55e]" />
            {!reduce ? (
              <motion.span
                className="absolute inset-0 rounded-full bg-[#22c55e]"
                animate={{ opacity: [0.55, 0, 0.55], scale: [1, 2.1, 1] }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ) : null}
          </span>
          <span className="text-[0.9375rem] text-[#4b3b6b]">{win.status}</span>
        </span>
      </div>

      {/* -------------------------- Persona ------------------------- */}
      <div className="mt-5 rounded-2xl ring-1 ring-[#1e1240]/8">
        <div className="flex items-center gap-4 p-4">
          <Image
            src={win.persona.src}
            alt={win.persona.alt}
            width={220}
            height={220}
            sizes="72px"
            className="size-[4.5rem] shrink-0 rounded-full"
          />
          <div className="min-w-0">
            <p className="font-display text-[1.375rem] font-bold tracking-[-0.02em] text-[#1e1240]">
              {win.persona.name}
            </p>
            <p className="mt-0.5 text-[1rem] text-[#5b4a7d]">
              {win.persona.role}
            </p>
            <p
              className={cn(
                "mt-2 inline-block rounded-md px-3 py-1",
                "bg-[#f6e9c8] text-[0.875rem] font-medium text-[#7a5c1e]",
              )}
            >
              {win.persona.difficulty}
            </p>
          </div>
        </div>

        {/* The design rules between the persona and the transcript. */}
        <p
          className={cn(
            "border-t border-[#1e1240]/8 px-4 py-3.5",
            "text-[1.0625rem] font-bold text-[#1e1240]",
          )}
        >
          {win.objective}
        </p>
      </div>

      {/* ------------------------ Transcript ------------------------ */}
      <ul className="mt-4 space-y-4">
        {win.turns.map((turn, index) => {
          const you = turn.speaker === "you";
          return (
            <motion.li
              key={turn.text}
              initial={
                reduce
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 10, x: you ? 10 : -10 }
              }
              animate={{ opacity: 1, y: 0, x: 0 }}
              /*
                In order, a beat apart — the two read as a conversation
                arriving rather than a static pair.
              */
              transition={{
                duration: 0.5,
                delay: 0.75 + index * 0.35,
                ease: easeOut,
              }}
              className={cn(
                "flex items-start gap-3",
                you && "flex-row-reverse",
              )}
            >
              {/* The speaker's mark: the persona's face, or a filled figure. */}
              {you ? (
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#7400ff]">
                  <UserIcon className="size-5 text-white" />
                </span>
              ) : (
                <Image
                  src={win.persona.src}
                  alt=""
                  width={220}
                  height={220}
                  sizes="36px"
                  className="size-9 shrink-0 rounded-full"
                />
              )}

              <span className={cn("max-w-[82%] min-w-0", you && "text-right")}>
                <span className="block text-[0.8125rem] text-[#6b5a8d]">
                  {turn.label}
                </span>
                <span
                  className={cn(
                    "mt-1.5 block rounded-2xl px-4 py-3",
                    "text-left text-[1rem] leading-snug",
                    you
                      ? "bg-[#7400ff] text-white"
                      : "bg-[#e6d7ff] text-[#2b1d4f]",
                  )}
                >
                  {turn.text}
                </span>
              </span>
            </motion.li>
          );
        })}
      </ul>

      {/* --------------------------- Modes -------------------------- */}
      {/*
        A list, not buttons: this is an illustrative product surface, so
        nothing here should be focusable or announced as a control that goes
        nowhere.
      */}
      <ul
        className={cn(
          "mt-5 inline-flex items-center gap-1 rounded-full p-1",
          "bg-white ring-1 ring-[#1e1240]/10",
        )}
      >
        {win.modes.map((mode) => {
          const Glyph = MODE_GLYPHS[mode.icon];
          const active = "active" in mode && mode.active;
          return (
            <li
              key={mode.label}
              className={cn(
                "flex items-center gap-2.5 rounded-full px-5 py-2.5",
                "text-[1rem] font-medium",
                active ? "bg-[#7b00ff] text-white" : "text-[#4b3b6b]",
              )}
            >
              <Glyph className="size-[1.125rem] shrink-0" />
              {mode.label}
            </li>
          );
        })}
      </ul>

      {/* -------------------------- Capture ------------------------- */}
      <div
        className={cn(
          "mt-4 flex items-center gap-4 rounded-full p-2",
          "bg-white ring-1 ring-[#1e1240]/10",
        )}
      >
        <span className="grid size-12 shrink-0 place-items-center rounded-full bg-[#7b00ff]">
          <MicIcon className="size-6 text-white" />
        </span>

        {/* The waveform. Drawn as bars so it can animate; see below. */}
        <Waveform reduce={reduce} />

        <span className="shrink-0 pr-4 text-[1rem] text-[#4b3b6b]">
          {hero.window.capture.state}
        </span>
      </div>
    </div>
  );
}

/**
 * The capture row's waveform.
 *
 * Bars rather than a path: the design's waveform is a bar field, and bars can
 * each animate on their own delay, which is what makes the row read as live
 * rather than as a static graphic.
 *
 * The heights are a fixed pattern rather than `Math.random()` — random values
 * differ between the server and client renders and throw a hydration
 * mismatch, which this build has hit before.
 */
const BAR_HEIGHTS = [
  28, 44, 62, 38, 72, 52, 88, 64, 96, 58, 78, 46, 92, 70, 54, 84, 40, 66, 34,
  76, 50, 88, 60, 42, 72, 56, 30, 68, 48, 80, 36, 62, 44, 74, 52, 86, 40, 58,
  32, 66,
] as const;

function Waveform({ reduce }: { reduce: boolean }) {
  return (
    <span
      aria-hidden="true"
      className="flex h-9 min-w-0 flex-1 items-center gap-[2px] overflow-hidden"
    >
      {BAR_HEIGHTS.map((height, index) => (
        <motion.span
          key={index}
          className="w-[3px] shrink-0 rounded-full bg-[#7b00ff]"
          style={{ height: `${height}%` }}
          animate={
            reduce
              ? undefined
              : {
                  // A shallow breathe, so the field moves without jitter.
                  scaleY: [1, 0.55, 1],
                }
          }
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: (index % 7) * 0.09,
          }}
        />
      ))}
    </span>
  );
}

/* ========================================================================== */
/* SCORECARD                                                                  */
/* ========================================================================== */

/**
 * The live performance panel.
 *
 * Six measures in a three-column grid. Each value counts up on mount, which
 * is what "scores update as you practise" claims — a static number would make
 * the subtitle a lie.
 */
function Scorecard({ reduce }: { reduce: boolean }) {
  const { scorecard } = hero;

  return (
    <div
      className={cn(
        "rounded-[1.5rem] bg-[#faf8fd] p-5",
        "ring-1 ring-white/30",
        "shadow-[0_2.5rem_5rem_-1.5rem_rgb(20_10_50/0.8)]",
      )}
    >
      {/* --------------------------- Header ------------------------- */}
      <div className="flex items-center gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#ede3ff]">
          <BarsIcon className="size-5 text-[#7b00ff]" />
        </span>
        <div className="min-w-0">
          <p className="flex items-center gap-2 font-display text-[1.125rem] font-bold tracking-[-0.015em] text-[#1e1240]">
            {scorecard.title}
            <span className="size-2.5 shrink-0 rounded-full bg-[#22c55e]" />
          </p>
          <p className="mt-0.5 text-[0.875rem] text-[#5b4a7d]">
            {scorecard.subtitle}
          </p>
        </div>
      </div>

      {/* --------------------------- Scores ------------------------- */}
      <ul className="mt-4 grid grid-cols-3 gap-2.5 [&>*]:min-w-0">
        {scorecard.scores.map((score, index) => (
          <motion.li
            key={score.label}
            initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              delay: 0.7 + index * 0.08,
              ease: easeOut,
            }}
            className={cn(
              "rounded-xl bg-[#f4eeff] p-3 ring-1 ring-[#7b00ff]/10",
              "duration-normal transition-[translate,box-shadow] ease-out",
              "will-change-[translate] hover:-translate-y-0.5",
              "hover:shadow-[0_0.75rem_1.5rem_-0.75rem_rgb(123_0_255/0.4)]",
            )}
          >
            <p className="text-[0.75rem] leading-tight font-medium text-[#5b4a7d]">
              {score.label}
            </p>
            <p className="mt-1.5 flex items-baseline gap-1">
              <CountUp value={score.value} reduce={reduce} delay={index} />
              <span className="text-[0.8125rem] text-[#6b5a8d]">/ 100</span>
            </p>
          </motion.li>
        ))}
      </ul>

      {/* The design sets this small and right-aligned beneath the grid. */}
      <p className="mt-3 text-right text-[0.75rem] text-[#6b5a8d]">
        {scorecard.footnote}
      </p>
    </div>
  );
}

/**
 * A score that counts up to its value.
 *
 * `motion.span` animating a number needs the value interpolated through a
 * motion value; this uses a keyframed `--n` custom property instead, which
 * keeps the markup a plain number for the server render and avoids a
 * hydration mismatch.
 *
 * Under reduced motion the number is simply printed.
 */
function CountUp({
  value,
  reduce,
  delay,
}: {
  value: number;
  reduce: boolean;
  delay: number;
}) {
  const className =
    "font-display text-[1.75rem] font-bold tracking-[-0.02em] text-[#1e1240] tabular-nums";

  if (reduce) return <span className={className}>{value}</span>;

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0.35 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.8 + delay * 0.08, ease: easeOut }}
    >
      {value}
    </motion.span>
  );
}

/* ========================================================================== */
/* ICONS                                                                      */
/* ========================================================================== */

/** The arrow on the primary button. */
function ArrowIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" {...props}>
      <path
        d="M2 8h12M9.5 3.5 14 8l-4.5 4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
