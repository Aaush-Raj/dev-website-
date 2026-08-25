"use client";

import { motion, useReducedMotion } from "motion/react";

import { Uncopyable } from "@/components/ui/Uncopyable";
import { saathi } from "@/content/saathi";
import { cn } from "@/lib/utils";

import { contextIcons } from "./SaathiIcons";

/**
 * SAATHI CONTEXT PANEL
 * ---------------------------------------------------------------------------
 * The product illustration in the "every employee sees a different Saathi"
 * section: Ananya's record, the six signals Saathi holds about her, and the
 * three actions it recommends from them.
 *
 * The panel's shape IS the argument — context on the left, actions on the
 * right, and a coral arrow between them reading "Context becomes action". So
 * the two halves are a real two-column grid with a divider, not a stack that
 * happens to sit side by side.
 *
 * DRAWN, NOT SHIPPED
 * Rebuilt in markup so it stays sharp at every density and animates in. Like
 * the other mockups it is wrapped in <Uncopyable>, and its links and button are
 * drawn spans rather than real controls — nothing here is focusable, because
 * none of it does anything.
 *
 * THE SEQUENCE
 * Same shared-time-base approach as the two sections before it: the record
 * lands, the signals arrive one by one, the hinge arrow draws across, and the
 * recommendations follow it — so the panel plays out the left-to-right
 * argument rather than appearing all at once.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { panel } = saathi.context;

/** The shared beat. */
const HEAD_AT = 0.15;
const FIRST_SIGNAL_AT = 0.4;
const SIGNAL_STEP = 0.11;

const signalAt = (i: number) => FIRST_SIGNAL_AT + i * SIGNAL_STEP;

/** The hinge draws once the signals are in; the actions follow it. */
const HINGE_AT = signalAt(panel.understands.items.length - 1) + 0.2;
const FIRST_ACTION_AT = HINGE_AT + 0.35;
const ACTION_STEP = 0.16;

const actionAt = (i: number) => FIRST_ACTION_AT + i * ACTION_STEP;
const CTA_AT = actionAt(panel.recommended.items.length - 1) + 0.3;

export function SaathiContextPanel({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  /** Fade-and-rise on a given beat. */
  const at = (delay: number, distance = 12) => ({
    initial: reduce ? "shown" : "hidden",
    whileInView: "shown",
    viewport: { once: true, amount: 0.1 } as const,
    variants: {
      hidden: { opacity: 0, y: distance },
      shown: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay, ease: easeOut },
      },
    },
  });

  return (
    <Uncopyable
      className={cn(
        "rounded-3xl p-5 sm:p-7",
        // A translucent dark panel over the photograph, so the scene stays
        // faintly readable behind it rather than being blocked out.
        "border border-white/10 bg-[#14181e]/92 backdrop-blur-sm",
        "shadow-[0_40px_100px_-40px_rgb(0_0_0/0.9)]",
        className,
      )}
    >
      <motion.p {...at(0)} className="text-lg font-semibold text-white">
        {panel.title}
      </motion.p>

      {/* ====================== The employee record ==================== */}
      <motion.div {...at(HEAD_AT)} className="mt-5 flex items-center gap-4">
        {/* A drawn stand-in, not a photo — see the note on the journey
            panel's avatar. */}
        <span className="grid size-14 shrink-0 place-items-center rounded-full bg-[#6475ad] text-white">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className="size-7"
          >
            <circle
              cx="12"
              cy="8.6"
              r="3.4"
              stroke="currentColor"
              strokeWidth="1.7"
            />
            <path
              d="M5.6 19.2a6.4 6.4 0 0 1 12.8 0"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
          </svg>
        </span>

        <span className="min-w-0">
          <span className="block text-[1.0625rem] font-semibold text-white">
            {panel.employee.name}
          </span>
          <span className="mt-0.5 block text-[0.9375rem] text-neutral-400">
            {panel.employee.role}
          </span>
          <span className="block text-[0.9375rem] text-neutral-400">
            {panel.employee.languages}
          </span>
        </span>
      </motion.div>

      <span aria-hidden="true" className="mt-5 block h-px w-full bg-white/10" />

      {/* ===================== The two halves ========================== */}
      <div
        className={cn(
          "mt-6 grid gap-8",
          // The hinge column only exists once there is room for it; below xl
          // the two halves stack and the arrow would point at nothing.
          "xl:grid-cols-[minmax(0,1fr)_auto_minmax(0,0.92fr)] xl:items-start xl:gap-6",
        )}
      >
        {/* ------------------- What Saathi understands ---------------- */}
        <div>
          <motion.p
            {...at(FIRST_SIGNAL_AT - 0.1)}
            className="text-[1.0625rem] font-medium text-white"
          >
            {panel.understands.title}
          </motion.p>

          <ul className="mt-3">
            {panel.understands.items.map((item, index) => {
              const Icon = contextIcons[item.icon];
              const isLast = index === panel.understands.items.length - 1;

              return (
                <motion.li
                  key={item.label}
                  {...at(signalAt(index), 10)}
                  className={cn(
                    "flex items-center gap-3.5 py-3",
                    !isLast && "border-b border-white/8",
                  )}
                >
                  <span
                    className={cn(
                      "grid size-10 shrink-0 place-items-center rounded-full",
                      "border border-white/20 text-neutral-200",
                    )}
                  >
                    <Icon className="size-5" />
                  </span>

                  <span className="flex min-w-0 flex-1 items-start justify-between gap-3">
                    <span className="min-w-0">
                      <span className="block text-[0.9375rem] font-semibold text-white">
                        {item.label}
                      </span>
                      <span className="mt-0.5 block text-[0.875rem] text-pretty text-neutral-400">
                        {item.value}
                      </span>
                    </span>

                    {/* The engine tag, on the signals that come from one. */}
                    {"engine" in item && item.engine ? (
                      <span className="shrink-0 text-[0.75rem] font-semibold tracking-[0.08em] text-[#7f8fc4] uppercase">
                        {item.engine}
                      </span>
                    ) : null}
                  </span>
                </motion.li>
              );
            })}
          </ul>
        </div>

        {/* -------------------------- The hinge ----------------------- */}
        {/*
          "Context becomes action" — the panel's whole claim, so the arrow
          draws across rather than fading, and the label follows it.

          Its own column on xl. Below that it turns into a horizontal rule
          with the label centred, because a sideways arrow between two stacked
          halves would point the wrong way.
        */}
        <div
          className={cn(
            "flex items-center gap-4",
            "xl:h-full xl:flex-col xl:justify-center xl:gap-3 xl:px-2",
          )}
        >
          <motion.svg
            viewBox="0 0 44 16"
            fill="none"
            aria-hidden="true"
            className="h-4 w-11 shrink-0 rotate-90 text-[#f1574a] xl:rotate-0"
            initial={reduce ? "shown" : "hidden"}
            whileInView="shown"
            viewport={{ once: true, amount: 0.1 }}
          >
            {/* The shaft sweeps, then the head lands — the same hand-off the
                loop section's arrows use. Safe to use `pathLength` here: this
                box keeps its default preserveAspectRatio. */}
            <motion.path
              d="M1 8h37"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              variants={{
                hidden: { pathLength: 0 },
                shown: {
                  pathLength: 1,
                  transition: {
                    duration: 0.5,
                    delay: HINGE_AT,
                    ease: "easeInOut",
                  },
                },
              }}
            />
            <motion.path
              d="m33 2.6 5.4 5.4-5.4 5.4"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={{
                hidden: { opacity: 0 },
                shown: {
                  opacity: 1,
                  transition: { duration: 0.25, delay: HINGE_AT + 0.4 },
                },
              }}
            />
          </motion.svg>

          <motion.p
            {...at(HINGE_AT + 0.3, 8)}
            className={cn(
              "text-[0.875rem] leading-tight text-[#f1574a]",
              "xl:text-center",
            )}
          >
            {panel.hinge.map((line) => (
              <span key={line} className="inline xl:block">
                {line}{" "}
              </span>
            ))}
          </motion.p>
        </div>

        {/* ------------------ Recommended for Ananya ------------------ */}
        <div className="xl:border-l xl:border-white/10 xl:pl-6">
          <motion.p
            {...at(FIRST_ACTION_AT - 0.1)}
            className="text-[1.0625rem] font-medium text-white"
          >
            {panel.recommended.title}
          </motion.p>

          <ol className="mt-3 space-y-3">
            {panel.recommended.items.map((item, index) => (
              <motion.li
                key={item.title}
                {...at(actionAt(index), 10)}
                className={cn(
                  "flex items-center gap-4 rounded-xl px-4 py-4",
                  "border border-white/12 bg-white/2",
                )}
              >
                {/* The numeral is content — it is the action's rank in
                    today's plan, not decoration. */}
                <span
                  className={cn(
                    "grid size-11 shrink-0 place-items-center rounded-full",
                    "border border-white/20 text-[0.9375rem] font-semibold",
                    "text-[#f1574a] tabular-nums",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="min-w-0">
                  <span className="block leading-snug font-semibold text-pretty text-white">
                    {item.title}
                  </span>
                  {/* A flex row rather than inline text: at narrow widths the
                      inline version broke mid-link, leaving "Start" on one
                      line and "recording" underlined on the next. */}
                  <span className="mt-1 flex flex-wrap items-baseline gap-x-2 text-[0.875rem] text-neutral-400">
                    <span className="whitespace-nowrap">{item.meta}</span>
                    <span aria-hidden="true">·</span>
                    {/* Drawn as a link, but not one — see the note above. */}
                    <span className="whitespace-nowrap text-[#8f9dcf] underline underline-offset-2">
                      {item.action}
                    </span>
                  </span>
                </span>
              </motion.li>
            ))}
          </ol>

          {/* Drawn as a button, but not focusable — this is a picture of the
              product. */}
          <motion.span
            {...at(CTA_AT)}
            className={cn(
              "mt-4 block rounded-lg py-3.5 text-center",
              "bg-[#f1574a] font-semibold text-white",
            )}
          >
            {panel.recommended.cta}
          </motion.span>
        </div>
      </div>
    </Uncopyable>
  );
}
