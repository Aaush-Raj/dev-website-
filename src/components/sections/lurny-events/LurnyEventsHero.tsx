"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { Uncopyable } from "@/components/ui/Uncopyable";
import { lurnyEvents } from "@/content/lurny-events";
import { cn } from "@/lib/utils";

import { ArrowIcon, BadgeIcon, PlusIcon } from "./LurnyEventsIcons";

/**
 * LURNYEVENTS HERO
 * ---------------------------------------------------------------------------
 * Section 1 of the LurnyEvents PRODUCT page: the statement on the left, the
 * console on the right with the learning-record card overlapping its corner.
 *
 * Not to be confused with sections/events/EventsHero, which is the Webinars &
 * Events page at /resources/events. Same word, different page — hence the
 * lurny-events directory and the LurnyEvents prefix on both files here.
 *
 * WHY THE CONSOLE IS MARKUP AND NOT THE SUPPLIED CARDS
 * The pack ships the console as 03_large_grey_card.png and the record as
 * 02_small_white_card.png — both flat bitmaps with every label, figure and
 * agenda row painted in. Shipping them would bake product copy into rasters:
 * unselectable, unsearchable, blurry when scaled, impossible to translate and
 * unable to animate. The large card even carries a notch cut out of its
 * lower-right corner where the small one overlaps, which only lines up at
 * exactly one size. So both are rebuilt here.
 *
 * WHY THE BACKGROUND IS CSS, NOT ITS PNG
 * 01_blue_purple_background.png is 2048x1152 of pure radial gradient — sampled
 * across the file it is smooth violet with no texture, grain or line work
 * anywhere. A gradient that large is what WebP bands worst, and CSS reproduces
 * it exactly at any viewport size for no bytes. So the raster is not converted:
 * the bloom below is measured off it (centre 68% / 38%, lifting to #2f1a5c and
 * falling to #110b29) and drawn.
 *
 * THE CONSOLE SCALES AS ONE OBJECT
 * Its type is sized in `em` off a container query, so the dashboard holds its
 * designed proportion as the column narrows rather than the panels swamping
 * it. Below @3xl the record card drops beneath the console instead of
 * overlapping it, where there is no room beside it.
 *
 * IT IS UNCOPYABLE AND ARIA-HIDDEN
 * Asked for directly, and right anyway: it is imitation UI, so the copy on the
 * left carries the meaning and a screen reader should not have to read out a
 * dashboard of invented figures to reach it.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { hero } = lurnyEvents;
const { console: ui } = hero;

/** Sampled from the design. Needed where a value reaches an inline style. */
const AMBER = "#f5c518";
const VIOLET = "#8b5cf6";

/** The journey rail's dot colour per stage state. */
const DOT = {
  done: VIOLET,
  current: AMBER,
  todo: "#4b4560",
} as const;

export function LurnyEventsHero() {
  const reduce = useReducedMotion() ?? false;

  /** The staggered entrance shared by the left column. */
  const rise = (delay: number) => ({
    initial: reduce ? "shown" : "hidden",
    animate: "shown",
    variants: {
      hidden: { opacity: 0, y: 20 },
      shown: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay, ease: easeOut },
      },
    },
  });

  const meterFill =
    (ui.glance.registered.value / ui.glance.capacity.value) * 100;

  return (
    <section className="relative isolate overflow-hidden bg-[#110b29]">
      {/* The violet bloom. Drawn rather than shipped — see the note above. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(78% 62% at 68% 38%, #2f1a5c 0%, #241444 38%, #170e33 68%, #110b29 100%)",
        }}
      />

      <Container
        width="wide"
        /* Extra top padding: this sits under the floating nav pill, so it
           needs clearance the mid-page sections do not. */
        className="pt-28 pb-section-lg sm:pt-32 lg:pt-36"
      >
        <div
          className={cn(
            "grid items-center gap-14",
            "lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1fr)] lg:gap-12",
            "xl:gap-16",
          )}
        >
          {/* =========================== Statement ==================== */}
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "font-mono text-[0.6875rem] font-medium uppercase",
                "tracking-[0.2em] text-[#f5c518] sm:text-xs",
              )}
            >
              {hero.eyebrow.lead}
              <span className="mx-2 text-[#f5c518]/50">&middot;</span>
              {hero.eyebrow.trail}
            </motion.p>

            <motion.h1
              {...rise(0.08)}
              className={cn(
                "mt-6 font-display font-bold tracking-[-0.03em]",
                "leading-[1.08] text-white",
                "text-[2.25rem] sm:text-[2.875rem] xl:text-[3.5rem]",
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
                "mt-6 max-w-[34rem] leading-relaxed text-pretty",
                "text-[1rem] text-white/68 sm:text-[1.0625rem]",
              )}
            >
              {hero.description}
            </motion.p>

            {/* -------------------------- CTAs ---------------------- */}
            <motion.div
              {...rise(0.24)}
              className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
            >
              <Link
                href={hero.actions.primary.href}
                className={cn(
                  "rounded-[0.4rem] bg-[#f5c518] px-7 py-3.5",
                  "text-[0.9375rem] font-semibold text-[#1a1035]",
                  "transition-[background-color,transform,box-shadow] duration-200",
                  "hover:-translate-y-0.5 hover:bg-[#ffd42e]",
                  "hover:shadow-[0_10px_30px_-10px_rgb(245_197_24/0.6)]",
                  "active:translate-y-0",
                )}
              >
                {hero.actions.primary.label}
              </Link>

              <Link
                href={hero.actions.secondary.href}
                className={cn(
                  "group inline-flex items-center gap-2",
                  "text-[0.9375rem] font-medium text-white/88",
                  "transition-colors hover:text-white",
                )}
              >
                {hero.actions.secondary.label}
                <ArrowIcon className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </motion.div>

            {/* ------------------------- Marks ---------------------- */}
            <motion.ul
              {...rise(0.34)}
              className={cn(
                "mt-12 flex flex-wrap items-center gap-x-8 gap-y-3",
                "border-t border-white/12 pt-6",
              )}
            >
              {hero.marks.map((mark, index) => (
                <li
                  key={mark}
                  className="flex items-center gap-3 text-[0.8125rem] text-white/62"
                >
                  {/* The design dots every mark but the first. */}
                  {index > 0 ? (
                    <span
                      aria-hidden="true"
                      className="size-1.5 rounded-full bg-[#f5c518]"
                    />
                  ) : null}
                  {mark}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* ============================ Console ===================== */}
          {/* Uncopyable, as asked, and aria-hidden: imitation UI. */}
          <Uncopyable aria-hidden className="relative @container">
            <motion.div
              initial={
                reduce
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 26, scale: 0.985 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.85, delay: 0.18, ease: easeOut }}
              className={cn(
                "rounded-[1em] border border-white/10 bg-[#1a1730]",
                "text-[length:var(--ui)]",
                "shadow-[0_40px_100px_-40px_rgb(0_0_0/0.85)]",
              )}
              style={{ ["--ui" as string]: "clamp(0.62rem, 1.32cqw, 0.85rem)" }}
            >
              {/* ---------------------- Console bar ---------------- */}
              <div className="flex items-center gap-[1.5em] border-b border-white/8 px-[1.5em] py-[1.1em]">
                <span className="flex items-center gap-[0.7em]">
                  <span className="grid size-[1.9em] shrink-0 place-items-center rounded-full bg-[#f5c518] text-[#1a1035]">
                    <PlusIcon className="size-[1.15em]" />
                  </span>
                  <span className="font-display text-[1.25em] font-bold tracking-[-0.01em] text-white">
                    {ui.brand}
                  </span>
                </span>

                <nav className="hidden flex-1 items-center gap-[1.7em] @xl:flex">
                  {ui.nav.map((item) => (
                    <span key={item} className="text-[1em] text-white/55">
                      {item}
                    </span>
                  ))}
                </nav>

                <span
                  className={cn(
                    "ml-auto shrink-0 rounded-[0.4em] bg-[#f5c518]",
                    "px-[1.1em] py-[0.55em] text-[0.95em] font-semibold text-[#1a1035]",
                  )}
                >
                  {ui.action}
                </span>
              </div>

              <div className="p-[1.5em]">
                {/* --------------------- Event head -------------- */}
                <div className="flex flex-wrap items-start justify-between gap-[1em]">
                  <span>
                    <span className="block font-display text-[1.75em] font-bold tracking-[-0.02em] text-white">
                      {ui.event.title}
                    </span>
                    <span className="mt-[0.3em] block text-[1em] text-white/50">
                      {ui.event.meta}
                    </span>
                  </span>

                  <span
                    className={cn(
                      "flex shrink-0 items-center gap-[0.55em] rounded-full",
                      "bg-[#14432f] px-[1em] py-[0.5em] text-[0.95em] text-[#4ade80]",
                    )}
                  >
                    {/* A slow pulse, so "open" reads as live. */}
                    <motion.span
                      className="size-[0.55em] rounded-full bg-[#4ade80]"
                      animate={reduce ? undefined : { opacity: [1, 0.35, 1] }}
                      transition={{
                        duration: 2.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    {ui.event.status}
                  </span>
                </div>

                {/* ============ Journey + at a glance ============ */}
                <div className="mt-[1.3em] grid gap-[1em] @xl:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
                  {/* ------------------ Journey ---------------- */}
                  <Panel>
                    <PanelTitle>{ui.journey.title}</PanelTitle>

                    <div className="relative mt-[1.6em]">
                      {/* The rail, drawn behind the dots. It wipes in from the
                          left so the journey reads as a sequence. */}
                      <span className="absolute top-[0.85em] right-[12%] left-[12%] h-[2px] -translate-y-1/2 overflow-hidden rounded-full bg-white/12">
                        <motion.span
                          className="block h-full origin-left bg-white/25"
                          initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{
                            duration: 0.9,
                            delay: 0.7,
                            ease: easeOut,
                          }}
                        />
                      </span>

                      <div className="relative grid grid-cols-4">
                        {ui.journey.stages.map((stage, index) => (
                          <span
                            key={stage.label}
                            className="flex flex-col items-center text-center"
                          >
                            <motion.span
                              className="size-[1.7em] rounded-full"
                              style={{ background: DOT[stage.state] }}
                              initial={
                                reduce
                                  ? { scale: 1, opacity: 1 }
                                  : { scale: 0.4, opacity: 0 }
                              }
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{
                                duration: 0.5,
                                delay: 0.85 + index * 0.12,
                                ease: easeOut,
                              }}
                            />
                            <span className="mt-[0.7em] block text-[1em] font-semibold text-white">
                              {stage.label}
                            </span>
                            <span
                              className={cn(
                                "mt-[0.15em] block text-[0.92em]",
                                stage.state === "current"
                                  ? "text-[#f5c518]"
                                  : "text-white/45",
                              )}
                            >
                              {stage.note}
                            </span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Nudge banner */}
                    <div
                      className={cn(
                        "mt-[1.5em] flex items-start gap-[0.8em] rounded-[0.5em]",
                        "bg-white/5 px-[1em] py-[0.85em]",
                      )}
                    >
                      <span className="mt-[0.35em] size-[0.6em] shrink-0 rounded-full bg-[#f5c518]" />
                      <span className="min-w-0">
                        <span className="block text-[0.98em] font-semibold text-white">
                          {ui.journey.nudge.title}
                        </span>
                        <span className="mt-[0.15em] block text-[0.9em] text-white/45">
                          {ui.journey.nudge.note}
                        </span>
                      </span>
                    </div>
                  </Panel>

                  {/* ----------------- At a glance ------------- */}
                  <Panel>
                    <PanelTitle>{ui.glance.title}</PanelTitle>

                    <div className="mt-[1.2em] grid grid-cols-2 gap-[0.8em]">
                      {[ui.glance.registered, ui.glance.capacity].map(
                        (stat) => (
                          <span key={stat.label}>
                            <span className="block font-mono text-[0.78em] tracking-[0.12em] text-white/45 uppercase">
                              {stat.label}
                            </span>
                            <span className="mt-[0.25em] block font-display text-[1.9em] leading-none font-bold text-white">
                              {stat.value}
                            </span>
                          </span>
                        ),
                      )}
                    </div>

                    {/* Capacity meter — fills to the registered share. */}
                    <span className="mt-[1em] block h-[0.45em] w-full overflow-hidden rounded-full bg-white/10">
                      <motion.span
                        className="block h-full rounded-full bg-[#a855f7]"
                        initial={
                          reduce ? { width: `${meterFill}%` } : { width: 0 }
                        }
                        animate={{ width: `${meterFill}%` }}
                        transition={{ duration: 1, delay: 0.95, ease: easeOut }}
                      />
                    </span>

                    <span className="mt-[1.4em] block border-t border-white/8 pt-[1.1em]">
                      <span className="block font-mono text-[0.78em] tracking-[0.12em] text-white/45 uppercase">
                        {ui.glance.format.label}
                      </span>
                      <span className="mt-[0.3em] block text-[1.05em] font-semibold text-white">
                        {ui.glance.format.value}
                      </span>
                    </span>

                    <span className="mt-[0.9em] flex items-center gap-[0.5em] text-[0.95em] text-[#4ade80]">
                      <span className="size-[0.5em] rounded-full bg-[#4ade80]" />
                      {ui.glance.cpd}
                    </span>
                  </Panel>
                </div>

                {/* -------------------- Agenda ---------------- */}
                <Panel className="mt-[1em]">
                  <PanelTitle>{ui.agenda.title}</PanelTitle>

                  <div className="mt-[1em] grid gap-[0.9em]">
                    {ui.agenda.rows.map((row) => (
                      <span
                        key={row.time}
                        className="flex items-baseline gap-[1.5em]"
                      >
                        <span className="shrink-0 font-mono text-[0.92em] text-white/45">
                          {row.time}
                        </span>
                        <span className="min-w-0 text-[1em] font-medium text-white/90">
                          {row.label}
                        </span>
                      </span>
                    ))}
                  </div>

                  <span
                    className={cn(
                      "mt-[1.2em] inline-flex items-center gap-[0.5em] rounded-[0.45em]",
                      "border border-[#a855f7]/40 bg-[#a855f7]/16",
                      "px-[1em] py-[0.55em] text-[0.95em] text-white/90",
                    )}
                  >
                    {ui.agenda.action}
                    <ArrowIcon className="size-[1.05em]" />
                  </span>
                </Panel>
              </div>
            </motion.div>

            {/* ---------------- Learning-record card ------------- */}
            {/* Overlaps the console's lower-right corner, as drawn. Below @3xl
                it drops beneath the console, where there is no room beside. */}
            <motion.div
              initial={
                reduce
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 18, scale: 0.96 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 1.05, ease: easeOut }}
              className={cn(
                "mt-[1em] rounded-[0.7em] bg-[#fdf6e3] p-[1.1em]",
                "text-[length:var(--ui)]",
                "shadow-[0_26px_60px_-24px_rgb(0_0_0/0.7)]",
                "@xl:absolute @xl:right-[-3%] @xl:bottom-[-6%] @xl:mt-0 @xl:w-[40%]",
              )}
              style={{ ["--ui" as string]: "clamp(0.62rem, 1.32cqw, 0.85rem)" }}
            >
              <span className="flex items-center gap-[0.8em]">
                <span className="grid size-[2.4em] shrink-0 place-items-center rounded-[0.5em] bg-[#f5c518] text-[#1a1035]">
                  <BadgeIcon className="size-[1.35em]" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[1em] font-semibold text-[#1a1035]">
                    {ui.record.title}
                  </span>
                  <span className="mt-[0.1em] block text-[0.92em] text-[#1a1035]/60">
                    {ui.record.note}
                  </span>
                </span>
              </span>

              <span className="mt-[0.9em] block border-t border-[#1a1035]/12 pt-[0.9em]">
                <span className="block font-display text-[1.2em] font-bold tracking-[-0.01em] text-[#1a1035]">
                  {ui.record.headline}
                </span>
                <span className="mt-[0.15em] block text-[0.92em] text-[#1a1035]/60">
                  {ui.record.subject}
                </span>
              </span>
            </motion.div>
          </Uncopyable>
        </div>
      </Container>
    </section>
  );
}

/* ========================================================================== */
/* CONSOLE PARTS                                                              */
/* ========================================================================== */

/** One bordered panel inside the console. */
function Panel({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-[0.6em] border border-white/8 bg-white/[0.03] p-[1.2em]",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** A panel's heading. */
function PanelTitle({ children }: { children: ReactNode }) {
  return (
    <span className="block text-[1.05em] font-semibold text-white">
      {children}
    </span>
  );
}
