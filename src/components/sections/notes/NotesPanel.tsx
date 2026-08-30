"use client";

import { motion, useReducedMotion } from "motion/react";

import { Uncopyable } from "@/components/ui/Uncopyable";
import { notes } from "@/content/notes";
import { cn } from "@/lib/utils";

import {
  ChecklistIcon,
  ChevronIcon,
  DecisionsIcon,
  DueIcon,
  MailIcon,
  MoreIcon,
  SearchIcon,
  SparkIcon,
  SummaryIcon,
  TeamsMark,
} from "./NotesIcons";

/**
 * NOTES PANEL
 * ---------------------------------------------------------------------------
 * The product illustration in the LurnyNotes hero: the meeting note — summary,
 * key decisions and action items — with the follow-up draft floating over its
 * right edge and a Teams sync pill beneath.
 *
 * DRAWN, NOT SHIPPED
 * The design supplies this inside a flattened PNG. It is rebuilt in markup so
 * it stays sharp at every density, animates in, and reads its copy from
 * content/notes.ts.
 *
 * Wrapped in <Uncopyable>, so it behaves like the screenshot it imitates — the
 * text cannot be selected or dragged out, and it is aria-hidden. See
 * components/ui/Uncopyable.tsx: this is presentation, not protection.
 *
 * SIZING
 * Everything inside is expressed in `em`, and the root sets a font-size that
 * scales with the viewport. The whole panel — type, padding, radii, icon sizes
 * — therefore scales as one unit rather than drifting apart at breakpoints the
 * design was never measured at. Same approach as the LurnySaathi phone.
 *
 * LAYOUT
 * Above lg the draft and sync pill float over the note's right edge, as the
 * design shows. Below that they would collide into illegibility, so they stop
 * floating and stack underneath.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { panel } = notes.hero;

/** Each action item's avatar colour, keyed by its `tone`. */
const avatarTone = {
  violet: "bg-[#7c4dd8]",
  amber: "bg-[#d9922c]",
  green: "bg-[#3f9a55]",
} as const;

export function NotesPanel({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduce ? "shown" : "hidden",
    whileInView: "shown",
    viewport: { once: true, amount: "some" } as const,
    variants: {
      hidden: { opacity: 0, y: 22 },
      shown: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay, ease: easeOut },
      },
    },
  });

  return (
    <Uncopyable
      className={cn(
        "relative",
        // Scales the whole illustration as one unit — see the note above.
        "text-[0.6rem] sm:text-[0.68rem] lg:text-[0.62rem] xl:text-[0.72rem]",
        className,
      )}
    >
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.62fr)] lg:items-start">
        {/* ====================== The meeting note ==================== */}
        <motion.div
          {...rise(0.1)}
          className={cn(
            "relative z-10 overflow-hidden rounded-[1.4em]",
            "border border-white/10 bg-[#0c131b]",
            "shadow-[0_40px_90px_-40px_rgb(0_0_0/0.9)]",
            // The note lifts least of the three: it is the largest and sits
            // furthest back, so a big move would read as the whole picture
            // sliding rather than the panels separating.
            "transition-[border-color,box-shadow,translate] duration-400 ease-out",
            "will-change-[translate]",
            "hover:-translate-y-1 hover:border-white/20",
            "hover:shadow-[0_48px_110px_-40px_rgb(0_0_0/0.95)]",
            "motion-reduce:transition-[border-color,box-shadow]",
            "motion-reduce:hover:translate-y-0",
          )}
        >
          {/* Title bar */}
          <div className="flex items-center gap-[0.9em] px-[1.4em] py-[1.15em]">
            <span
              className={cn(
                "grid size-[2.4em] shrink-0 place-items-center rounded-[0.6em]",
                "bg-[#7c4dd8] text-[1.15em] font-bold text-white",
              )}
            >
              {panel.appInitial}
            </span>
            <span className="flex-1 text-[1.25em] font-semibold text-white">
              {panel.title}
            </span>
            <SearchIcon className="size-[1.5em] shrink-0 text-white/70" />
            <MoreIcon className="size-[1.4em] shrink-0 text-white/70" />
          </div>

          {/* ---------------------- Summary ---------------------- */}
          <Section
            icon={<SummaryIcon className="size-[1.25em]" />}
            title={panel.summary.title}
            collapsible
          >
            <p className="mt-[0.9em] text-[1.05em] leading-[1.55] text-white/62">
              {panel.summary.body}
            </p>
          </Section>

          {/* --------------------- Decisions --------------------- */}
          <Section
            icon={<DecisionsIcon className="size-[1.25em]" />}
            title={panel.decisions.title}
            collapsible
          >
            <ul className="mt-[0.9em] space-y-[0.55em]">
              {panel.decisions.items.map((item) => (
                <li
                  key={item}
                  className="flex gap-[0.7em] text-[1.05em] leading-[1.5] text-white/62"
                >
                  <span aria-hidden="true" className="text-white/40">
                    •
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          {/* -------------------- Action items -------------------- */}
          <Section
            icon={<ChecklistIcon className="size-[1.25em]" />}
            title={panel.actions.title}
          >
            <ul className="mt-[0.9em] space-y-[0.5em]">
              {panel.actions.items.map((item) => (
                <li
                  key={item.label}
                  className={cn(
                    "flex items-center gap-[0.8em] rounded-[0.7em] px-[0.85em] py-[0.75em]",
                    "border border-white/8 bg-white/3",
                  )}
                >
                  {/* A drawn checkbox — the panel is a picture, so nothing
                      here is a real control. */}
                  <span
                    aria-hidden="true"
                    className="size-[1.15em] shrink-0 rounded-[0.25em] border border-white/30"
                  />

                  <span className="flex-1 text-[1.02em] text-white/85">
                    {item.label}
                  </span>

                  <span className="flex shrink-0 items-center gap-[0.5em]">
                    <span
                      className={cn(
                        "grid size-[1.7em] place-items-center rounded-full",
                        "text-[0.75em] font-bold text-white",
                        avatarTone[item.tone],
                      )}
                    >
                      {item.initials}
                    </span>
                    <span className="text-[0.95em] whitespace-nowrap text-white/70">
                      {item.owner}
                    </span>
                  </span>

                  <span className="flex shrink-0 items-center gap-[0.4em] text-[0.95em] whitespace-nowrap text-white/60">
                    <DueIcon className="size-[1.1em]" />
                    {item.due}
                  </span>
                </li>
              ))}
            </ul>

            {/* Drawn as a button, but not one — see the note above. */}
            <span
              className={cn(
                "mt-[1.1em] inline-flex items-center gap-[0.6em] rounded-[0.6em]",
                "bg-[#f8c23d] px-[1.2em] py-[0.7em]",
                "text-[1.02em] font-semibold text-[#1a1206]",
              )}
            >
              <SparkIcon className="size-[1.1em]" />
              {panel.actions.cta}
            </span>
          </Section>
        </motion.div>

        {/* ==================== The follow-up draft =================== */}
        {/*
          Sits BESIDE the note on lg, not over it. Measured from the design,
          the draft's left edge clears the note's right edge by a hair — they
          do not overlap. An earlier negative margin pulled the draft across
          the note and clipped the action items' due-date column.

          Below lg it drops underneath, where a two-up row would leave both
          panels too narrow to read.
        */}
        <div className="mt-[1.2em] lg:mt-[2.6em] lg:ml-[0.9em] lg:pt-0">
          <motion.div
            {...rise(0.28)}
            className={cn(
              "relative z-20 overflow-hidden rounded-[1.2em]",
              "border border-white/12 bg-[#0f1620]",
              "shadow-[0_30px_70px_-30px_rgb(0_0_0/0.95)]",
              // Lifts further than the note behind it — the difference in
              // travel is what reads as depth rather than one flat picture.
              "transition-[border-color,box-shadow,translate] duration-400 ease-out",
              "will-change-[translate]",
              "hover:-translate-y-2 hover:border-white/25",
              "hover:shadow-[0_40px_90px_-30px_rgb(0_0_0/1)]",
              "motion-reduce:transition-[border-color,box-shadow]",
              "motion-reduce:hover:translate-y-0",
            )}
          >
            <div className="flex items-center gap-[0.8em] px-[1.2em] py-[1em]">
              <span
                className={cn(
                  "grid size-[2.1em] shrink-0 place-items-center rounded-[0.55em]",
                  "bg-[#7c4dd8]/22 text-[#c3a6f5]",
                )}
              >
                <MailIcon className="size-[1.2em]" />
              </span>
              <span className="flex-1 text-[1.15em] font-semibold text-white">
                {panel.draft.title}
              </span>
              <MoreIcon className="size-[1.3em] shrink-0 text-white/60" />
            </div>

            <div className="px-[1.2em] pb-[1.2em]">
              <div
                className={cn(
                  "rounded-[0.8em] border border-white/8 bg-white/3",
                  "px-[1em] py-[0.9em]",
                )}
              >
                <p className="flex gap-[0.6em] text-[1em] text-white/80">
                  <span className="text-white/55">{panel.draft.to.label}</span>
                  {panel.draft.to.value}
                </p>
                <p className="mt-[0.4em] flex gap-[0.6em] text-[1em] text-white/80">
                  <span className="text-white/55">
                    {panel.draft.subject.label}
                  </span>
                  {panel.draft.subject.value}
                </p>

                <span
                  aria-hidden="true"
                  className="mt-[0.9em] block h-px w-full bg-white/10"
                />

                <div className="mt-[0.9em] space-y-[0.7em]">
                  {panel.draft.body.map((line) => (
                    <p
                      key={line}
                      className="text-[0.98em] leading-[1.5] text-white/70"
                    >
                      {line}
                    </p>
                  ))}

                  <p className="text-[0.98em] leading-[1.5] text-white/70">
                    {panel.draft.signOff.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </p>
                </div>
              </div>

              {/* Drawn as buttons, but neither is one. */}
              <div className="mt-[1em] flex gap-[0.7em]">
                <span
                  className={cn(
                    "flex-1 rounded-[0.55em] border border-white/25 py-[0.65em]",
                    "text-center text-[1em] font-medium text-white/90",
                  )}
                >
                  {panel.draft.actions.secondary}
                </span>
                <span
                  className={cn(
                    "flex-1 rounded-[0.55em] bg-[#f8c23d] py-[0.65em]",
                    "text-center text-[1em] font-semibold text-[#1a1206]",
                  )}
                >
                  {panel.draft.actions.primary}
                </span>
              </div>
            </div>
          </motion.div>

          {/* ====================== The sync pill ==================== */}
          <motion.div
            {...rise(0.42)}
            className={cn(
              "relative z-20 mt-[1em] inline-flex items-center gap-[0.8em]",
              "rounded-[0.9em] border border-white/12 bg-[#0f1620]",
              "px-[1em] py-[0.85em]",
              "shadow-[0_20px_50px_-24px_rgb(0_0_0/0.9)]",
              // The smallest panel lifts most: it is the nearest object in the
              // stack, so it travels furthest.
              "transition-[border-color,box-shadow,translate] duration-400 ease-out",
              "will-change-[translate]",
              "hover:-translate-y-2.5 hover:border-white/25",
              "hover:shadow-[0_28px_60px_-24px_rgb(0_0_0/0.95)]",
              "motion-reduce:transition-[border-color,box-shadow]",
              "motion-reduce:hover:translate-y-0",
            )}
          >
            <span
              className={cn(
                "grid size-[2.1em] shrink-0 place-items-center rounded-[0.55em]",
                "bg-[#7c4dd8]/22 text-[#9d7ce8]",
              )}
            >
              <TeamsMark className="size-[1.4em]" />
            </span>

            <span className="text-[1.02em] leading-[1.3] text-white/85">
              {panel.sync.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </span>

            {/* The online dot. */}
            <span
              aria-hidden="true"
              className="ml-[0.6em] size-[0.55em] shrink-0 rounded-full bg-[#4ade80]"
            />
          </motion.div>
        </div>
      </div>
    </Uncopyable>
  );
}

/**
 * One titled block inside the meeting note. `collapsible` draws the chevron
 * the design shows on the summary and decisions rows — decoration only, since
 * nothing in this picture actually collapses.
 */
function Section({
  icon,
  title,
  collapsible = false,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  collapsible?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-white/8 px-[1.4em] py-[1.15em]">
      <div className="flex items-center gap-[0.8em]">
        <span
          className={cn(
            "grid size-[2em] shrink-0 place-items-center rounded-full",
            "bg-[#7c4dd8]/22 text-[#c3a6f5]",
          )}
        >
          {icon}
        </span>
        <span className="flex-1 text-[1.15em] font-semibold text-white">
          {title}
        </span>
        {collapsible && (
          <ChevronIcon className="size-[1.2em] shrink-0 text-white/55" />
        )}
      </div>

      {children}
    </div>
  );
}
