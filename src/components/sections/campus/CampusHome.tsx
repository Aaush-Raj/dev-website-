"use client";

import { motion, useReducedMotion } from "motion/react";

import { campus } from "@/content/campus";
import { cn } from "@/lib/utils";

import {
  BookmarkIcon,
  CalendarIcon,
  ChartIcon,
  ChevronIcon,
  DatabaseIcon,
  InfoIcon,
  PeopleIcon,
  SchemaIcon,
  SearchIcon,
  SparkIcon,
} from "./CampusIcons";

/**
 * LURNYCAMPUS — THE PERSONALISED HOME
 * ---------------------------------------------------------------------------
 * The product mockup in section 3: a Campus home screen with a personalised
 * feed on the left and a readiness rail on the right.
 *
 * WHY IT IS NOT THE SUPPLIED SCREENSHOT
 * The design ships this as one 960x718 PNG. Rebuilt in markup it stays sharp
 * at every density, its ~40 strings stay real text, and it reflows: the two
 * columns stack below lg, where a fixed-width screenshot would either overflow
 * or shrink to illegibility.
 *
 * It is a MOCKUP, not a live view — nothing here is interactive, and the
 * controls are deliberately inert. It is decorative in the accessibility sense:
 * the section's argument is carried by the copy beside it, and a screen reader
 * announcing forty fragments of fake UI would bury that. So the whole panel is
 * hidden from assistive tech, exactly as the flattened screenshot would be.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { app } = campus.journey;

/** The three feed thumbnails, keyed by the item's `tone`. */
const thumbTone = {
  teal: {
    surface: "bg-[linear-gradient(145deg,#0f4f4a_0%,#0a3b39_100%)]",
    motif: "text-[#5fd6c0]/45",
  },
  violet: {
    surface: "bg-[linear-gradient(145deg,#4a1d8f_0%,#2a0f5c_100%)]",
    motif: "text-[#c9a6ff]/40",
  },
  deep: {
    surface: "bg-[linear-gradient(145deg,#0c4340_0%,#06282b_100%)]",
    motif: "text-[#5fd6c0]/40",
  },
} as const;

/** The line-art motif drawn on each thumbnail, keyed by tone. */
const thumbMotif = {
  teal: SchemaIcon,
  violet: ChartIcon,
  deep: DatabaseIcon,
} as const;

/*
  The readiness dial. Same dasharray technique as the hero's, but drawn as a
  three-quarter arc rather than a full ring: the design leaves a gap at the
  foot, so the track is rotated 135° and spans 270°.
*/
const DIAL_R = 46;
const DIAL_SWEEP = 0.75;
const DIAL_C = 2 * Math.PI * DIAL_R;
const TRACK = DIAL_C * DIAL_SWEEP;

function ReadinessGauge({ value }: { value: number }) {
  const reduce = useReducedMotion();
  const filled = TRACK * (value / 100);

  return (
    <div className="relative">
      <svg viewBox="0 0 120 120" className="size-30" aria-hidden="true">
        <g transform="rotate(135 60 60)">
          <circle
            cx="60"
            cy="60"
            r={DIAL_R}
            fill="none"
            stroke="#dcdad6"
            strokeWidth="9"
            strokeLinecap="round"
            strokeDasharray={`${TRACK} ${DIAL_C}`}
          />
          <motion.circle
            cx="60"
            cy="60"
            r={DIAL_R}
            fill="none"
            stroke="#0d5451"
            strokeWidth="9"
            strokeLinecap="round"
            strokeDasharray={`${filled} ${DIAL_C}`}
            initial={reduce ? "shown" : "hidden"}
            whileInView="shown"
            viewport={{ once: true, amount: "some" }}
            variants={{
              hidden: { strokeDashoffset: filled },
              shown: {
                strokeDashoffset: 0,
                transition: { duration: 1.4, delay: 0.6, ease: easeOut },
              },
            }}
          />
        </g>
      </svg>

      <span className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-[1.75rem] leading-none font-bold text-[#0b2f33]">
          {value}
          <span className="text-[1.125rem]">%</span>
        </span>
        <span className="mt-1 text-[0.8125rem] text-[#4d6266]">
          {app.readiness.stage}
        </span>
      </span>
    </div>
  );
}

export function CampusHome() {
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduce ? "shown" : "hidden",
    whileInView: "shown",
    viewport: { once: true, amount: "some" } as const,
    variants: {
      hidden: { opacity: 0, y: 16 },
      shown: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, delay, ease: easeOut },
      },
    },
  });

  return (
    <motion.div
      {...rise(0.1)}
      // Decorative: see the note at the top of this file.
      aria-hidden="true"
      className={cn(
        "rounded-3xl bg-[#f6f4f1] p-3.5 sm:p-5",
        "shadow-[0_40px_90px_-30px_rgb(0_15_18/0.7)]",
        "ring-1 ring-white/10",
      )}
    >
      {/* =========================== App bar =========================== */}
      <div className="flex items-center gap-3 px-1.5 pt-1 pb-5 sm:gap-5">
        {/* The wordmark. */}
        <span className="flex shrink-0 items-center gap-2">
          <span className="grid size-9 place-items-center rounded-xl bg-[#ef5b34] font-display text-[1.125rem] font-bold text-white">
            L
          </span>
          <span className="font-display text-[1.25rem] font-bold tracking-[-0.02em] text-[#0d5451]">
            {app.brand}
          </span>
        </span>

        {/* The search field. Inert — this is a picture of a UI. */}
        <span
          className={cn(
            "hidden min-w-0 flex-1 items-center gap-2.5 rounded-full sm:flex",
            "border border-[#e0ddd8] bg-white px-4 py-2.5",
          )}
        >
          <SearchIcon className="size-4 shrink-0 text-[#8a9599]" />
          <span className="truncate text-[0.8125rem] text-[#8a9599]">
            {app.searchPlaceholder}
          </span>
        </span>

        {/* The account. */}
        <span className="ml-auto flex shrink-0 items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-full bg-[#cfe3df] text-[0.75rem] font-bold text-[#0b2f33]">
            {app.user.initials}
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="block text-[0.8125rem] font-semibold text-[#0b2f33]">
              {app.user.name}
            </span>
            <span className="block text-[0.75rem] text-[#6b7c80]">
              {app.user.role}
            </span>
          </span>
          <ChevronIcon className="size-4 rotate-90 text-[#8a9599]" />
        </span>
      </div>

      {/* ============================ Body ============================= */}
      <div className="grid grid-cols-1 items-start gap-3.5 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
        {/* ========================== The feed ======================== */}
        <div className="rounded-2xl bg-white p-4 sm:p-5">
          <p className="flex items-center gap-2.5 font-display text-[1rem] font-bold text-[#0b2f33]">
            <PeopleIcon className="size-5 text-[#0d5451]" />
            {app.feed.title}
          </p>
          <p className="mt-1 text-[0.8125rem] text-[#7c8a8e]">
            {app.feed.subtitle}
          </p>

          <ul className="mt-4 space-y-3">
            {app.feed.items.map((item, index) => {
              const tone = thumbTone[item.tone];
              const Motif = thumbMotif[item.tone];

              return (
                <motion.li
                  key={item.title}
                  {...rise(0.3 + index * 0.12)}
                  className={cn(
                    "flex items-center gap-3.5 rounded-xl p-2.5",
                    "border border-[#eceae6] bg-[#fcfbfa]",
                    "duration-normal transition-[border-color,box-shadow] ease-out",
                    "hover:border-[#cfd9d8]",
                    "hover:shadow-[0_10px_24px_-16px_rgb(11_47_51/0.5)]",
                  )}
                >
                  {/* ------------------- The thumbnail ---------------- */}
                  {/*
                    Rebuilt rather than shipped: the supplied tiles are 174px
                    with their titles baked in, which would blur here.
                  */}
                  <span
                    className={cn(
                      "relative grid h-19 w-30 shrink-0 overflow-hidden rounded-lg",
                      "content-center px-3",
                      tone.surface,
                    )}
                  >
                    <Motif
                      className={cn(
                        "absolute -right-1 bottom-1 size-13",
                        tone.motif,
                      )}
                    />
                    {item.thumbTitle.map((line, lineIndex) => (
                      <span
                        key={line}
                        className={cn(
                          "relative block leading-tight text-white",
                          lineIndex === 0
                            ? "text-[0.75rem] font-bold"
                            : "text-[0.5625rem] font-medium tracking-[0.04em] uppercase",
                        )}
                      >
                        {line}
                      </span>
                    ))}
                  </span>

                  {/* ---------------------- The detail ---------------- */}
                  <span className="min-w-0 flex-1">
                    <span className="flex items-start justify-between gap-3">
                      <span className="min-w-0">
                        <span className="block truncate text-[0.875rem] font-semibold text-[#0b2f33]">
                          {item.title}
                        </span>
                        <span className="mt-0.5 block truncate text-[0.75rem] text-[#7c8a8e]">
                          {item.author}
                        </span>
                      </span>
                      <BookmarkIcon className="size-4 shrink-0 text-[#9aa5a8]" />
                    </span>

                    {/* Progress. `0%` still shows the track, as in the
                        design — an unstarted item, not a missing bar. */}
                    <span className="mt-3 block text-[0.6875rem] text-[#7c8a8e]">
                      {item.progress}% complete
                    </span>
                    <span className="mt-1.5 flex items-center gap-3">
                      <span className="h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-[#e8e5e0]">
                        <motion.span
                          className="block h-full rounded-full bg-[#0d5451]"
                          initial={reduce ? "shown" : "hidden"}
                          whileInView="shown"
                          viewport={{ once: true, amount: "some" }}
                          variants={{
                            hidden: { scaleX: 0 },
                            shown: {
                              scaleX: item.progress / 100,
                              transition: {
                                duration: 0.85,
                                delay: 0.7 + index * 0.12,
                                ease: easeOut,
                              },
                            },
                          }}
                          // Scaled, not width-animated: transforms composite,
                          // so three bars animate without relayout.
                          style={{
                            transformOrigin: "left",
                            scaleX: item.progress / 100,
                          }}
                        />
                      </span>
                      <span className="shrink-0 text-[0.6875rem] text-[#7c8a8e]">
                        {item.meta}
                      </span>
                    </span>
                  </span>
                </motion.li>
              );
            })}
          </ul>
        </div>

        {/* ========================= The rail ========================= */}
        <div className="space-y-3.5">
          {/* ------------------------ Readiness ------------------------ */}
          <motion.div {...rise(0.35)} className="rounded-2xl bg-white p-5">
            <p className="flex items-center justify-between gap-3">
              <span className="font-display text-[1rem] font-bold text-[#0b2f33]">
                {app.readiness.title}
              </span>
              <InfoIcon className="size-4 shrink-0 text-[#9aa5a8]" />
            </p>

            <span className="mt-3 flex flex-col items-center">
              <ReadinessGauge value={app.readiness.value} />
              <span className="mt-2 text-[0.8125rem] font-semibold text-[#0d5451]">
                {app.readiness.delta}
              </span>
            </span>
          </motion.div>

          {/* --------------------- Next best action -------------------- */}
          <motion.div
            {...rise(0.45)}
            className={cn(
              "rounded-2xl p-5",
              "border border-[#f8c4b4] bg-[linear-gradient(160deg,#fef1ec_0%,#fde7df_100%)]",
            )}
          >
            <p className="flex items-center gap-2.5">
              <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-[#ef5b34] text-white">
                <SparkIcon className="size-4" />
              </span>
              <span className="text-[0.6875rem] font-bold tracking-[0.1em] text-[#d8451f] uppercase">
                {app.nextAction.eyebrow}
              </span>
            </p>

            <p className="mt-3 font-display text-[1.0625rem] leading-snug font-bold text-[#0b2f33]">
              {app.nextAction.title.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>

            <p className="mt-2 text-[0.8125rem] leading-snug text-[#5d6f73]">
              {app.nextAction.reason}
            </p>

            {/* Inert: a picture of a button, not a control. */}
            <span
              className={cn(
                "mt-4 flex h-11 items-center justify-center rounded-lg",
                "bg-[#ef5b34] text-[0.9375rem] font-semibold text-white",
              )}
            >
              {app.nextAction.action}
            </span>
          </motion.div>

          {/* ------------------------- Mentor -------------------------- */}
          <motion.div
            {...rise(0.55)}
            className="flex items-center gap-3 rounded-2xl bg-[#dceae4] p-4"
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#0d5451] text-white">
              <CalendarIcon className="size-5" />
            </span>

            <span className="min-w-0 flex-1 leading-tight">
              <span className="block text-[0.875rem] font-semibold text-[#0b2f33]">
                {app.mentor.title}
              </span>
              <span className="mt-0.5 block truncate text-[0.8125rem] text-[#4d6266]">
                {app.mentor.name}
              </span>
              <span className="mt-0.5 block text-[0.8125rem] text-[#4d6266]">
                {app.mentor.when}
              </span>
            </span>

            <ChevronIcon className="size-4 shrink-0 text-[#5d7a78]" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
