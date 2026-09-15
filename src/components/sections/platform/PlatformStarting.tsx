"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { platform } from "@/content/platform";
import { cn } from "@/lib/utils";

import {
  AssistantIcon,
  ResetIcon,
  SendIcon,
  challengeIcons,
  engineIcons,
} from "./PlatformEngineIcons";
import { ArrowRightIcon } from "./PlatformIcons";

/**
 * PLATFORM STARTING POINT
 * ---------------------------------------------------------------------------
 * Section 5 of /platform, and the last: three challenges on the left, and a
 * conversation panel on the right that plays the one you pick.
 *
 * IT IS A SCRIPTED DEMONSTRATION, and it says so. Choosing a challenge plays
 * that challenge's exchange into the panel a message at a time and ends on the
 * engines it suggests — which is what the comp depicts. Nothing here talks to
 * a model.
 *
 * SO THE COMPOSER IS DISABLED. The design draws a text box and a send button,
 * and they are drawn here too, but a box that accepts typing would promise a
 * reply this page cannot give. It carries the panel's own "Example
 * conversation" label and a note saying as much, rather than looking broken.
 *
 * THE MESSAGES ARE REAL TEXT IN A LIVE REGION. Unlike the product mockups
 * elsewhere on this page, this panel is not decorative: its content changes in
 * response to something the reader did, so it is announced. The turns arrive in
 * an `aria-live="polite"` log, and each is labelled as theirs or ours.
 *
 * BELOW LG the panel moves under the challenges rather than beside them, and
 * the rows stay full width.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { starting } = platform;

/** How long between one message landing and the next. */
const TURN = 0.55;

export function PlatformStarting() {
  const reduce = useReducedMotion();
  const panelId = useId();

  type ChallengeId = (typeof starting.challenges)[number]["id"];
  const [chosen, setChosen] = useState<ChallengeId>(starting.challenges[0].id);

  const challenge =
    starting.challenges.find((entry) => entry.id === chosen) ??
    starting.challenges[0];

  const rise = (delay: number) => ({
    initial: reduce ? "shown" : "hidden",
    whileInView: "shown",
    viewport: { once: true, amount: "some" } as const,
    variants: {
      hidden: { opacity: 0, y: 18 },
      shown: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          delay: reduce ? 0 : delay,
          ease: easeOut,
        },
      },
    },
  });

  /** The suggestion block lands after the last message. */
  const suggestionDelay = reduce
    ? 0
    : challenge.conversation.length * TURN + 0.2;

  return (
    <section className="relative overflow-hidden bg-[#f6f2fe]">
      {/* The wash's own soft shapes, drawn rather than shipped — the design's
          corners are flat gradients, which cost nothing in CSS. */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -top-40 -right-32",
          "h-[28rem] w-[34rem] rounded-full bg-[#e5daff]/60 blur-3xl",
        )}
      />
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -bottom-48 -left-40",
          "h-[26rem] w-[32rem] rounded-full bg-[#ece3ff]/70 blur-3xl",
        )}
      />

      <Container width="hero" className="relative">
        <div
          className={cn(
            "grid items-start gap-12",
            "py-20 sm:py-24 lg:py-24 xl:py-28",
            "lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-14",
          )}
        >
          {/* ========================= The challenges ================== */}
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "text-[0.6875rem] font-semibold tracking-[0.18em] uppercase",
                "text-brand-600 sm:text-xs",
              )}
            >
              {starting.eyebrow}
            </motion.p>

            <h2
              className={cn(
                "mt-5 font-display font-bold tracking-[-0.03em]",
                "leading-[1.05] text-neutral-900",
                "text-[2rem] sm:text-[2.5rem] xl:text-[3.25rem]",
              )}
            >
              {starting.headline.map((line, index) => (
                <motion.span
                  key={line.text}
                  {...rise(0.08 + index * 0.07)}
                  className={cn(
                    "block",
                    "accent" in line && line.accent && "text-brand-600",
                  )}
                >
                  {line.text}
                </motion.span>
              ))}
            </h2>

            <motion.p
              {...rise(0.26)}
              className={cn(
                "mt-6 max-w-[34rem] leading-relaxed text-pretty",
                "text-[1rem] text-neutral-600 sm:text-[1.0625rem]",
              )}
            >
              {starting.description}
            </motion.p>

            <motion.p
              {...rise(0.34)}
              className="mt-10 font-display text-[1.0625rem] font-bold text-neutral-900"
            >
              {starting.listLabel}
            </motion.p>

            {/*
              A radio group, not a list of buttons: exactly one challenge is
              chosen at a time, and that is what a radio group means. Arrow
              keys move between them for free.
            */}
            <div
              role="radiogroup"
              aria-label={starting.listLabel}
              className="mt-4 flex flex-col gap-3.5"
            >
              {starting.challenges.map((entry, index) => {
                const Icon = challengeIcons[entry.icon];
                const selected = entry.id === chosen;

                return (
                  <motion.button
                    key={entry.id}
                    {...rise(0.4 + index * 0.06)}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    aria-controls={panelId}
                    onClick={() => setChosen(entry.id)}
                    className={cn(
                      "group/row flex cursor-pointer items-center gap-4",
                      "rounded-2xl bg-white px-5 py-4 text-left",
                      "ring-1 transition-[box-shadow,transform,--tw-ring-color]",
                      "duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                      "hover:-translate-y-0.5",
                      "hover:shadow-[0_18px_40px_-26px_rgb(60_20_140/0.4)]",
                      "focus-visible:outline-2 focus-visible:outline-offset-2",
                      "focus-visible:outline-brand-500",
                      selected
                        ? "ring-2 ring-brand-500"
                        : "ring-neutral-200/80",
                      "motion-reduce:transition-none",
                      "motion-reduce:hover:translate-y-0",
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "grid size-12 shrink-0 place-items-center rounded-full",
                        "bg-[#f1e8fe]",
                        "transition-transform duration-300",
                        "ease-[cubic-bezier(0.16,1,0.3,1)]",
                        "group-hover/row:scale-105",
                        "motion-reduce:transition-none",
                        "motion-reduce:group-hover/row:scale-100",
                      )}
                    >
                      <Icon className="size-7" />
                    </span>

                    <span className="min-w-0 flex-auto font-display text-[1rem] font-bold text-neutral-900">
                      {entry.title}
                    </span>

                    <ArrowRightIcon
                      aria-hidden="true"
                      className={cn(
                        "size-5 shrink-0 text-brand-600",
                        "transition-transform duration-300",
                        "ease-[cubic-bezier(0.16,1,0.3,1)]",
                        "group-hover/row:translate-x-1",
                        "motion-reduce:transition-none",
                        "motion-reduce:group-hover/row:translate-x-0",
                      )}
                    />
                  </motion.button>
                );
              })}
            </div>

            <motion.p
              {...rise(0.6)}
              className="mt-6 text-[0.875rem] text-neutral-500"
            >
              {starting.note}
            </motion.p>
          </div>

          {/* =========================== The panel ===================== */}
          <motion.div
            {...rise(0.18)}
            className={cn(
              "rounded-[1.75rem] bg-[#faf8ff] p-5 sm:p-6",
              "ring-1 ring-neutral-200/70",
              "shadow-[0_28px_70px_-40px_rgb(60_20_140/0.35)]",
            )}
          >
            {/* --------------------- Header --------------------- */}
            <div className="flex items-center gap-4 border-b border-neutral-200/80 pb-5">
              <span
                aria-hidden="true"
                className="grid size-12 shrink-0 place-items-center rounded-full bg-[#f1e8fe] text-brand-600"
              >
                <AssistantIcon className="size-6" />
              </span>
              <div className="min-w-0 flex-auto">
                <p className="font-display text-[1.125rem] font-bold text-neutral-900">
                  {starting.panel.title}
                </p>
                <p className="mt-0.5 text-[0.875rem] text-neutral-500">
                  {starting.panel.subtitle}
                </p>
              </div>
              {/* Replays the current challenge from the start. */}
              <button
                type="button"
                onClick={() => setChosen(challenge.id)}
                aria-label={starting.panel.reset}
                className={cn(
                  "grid size-9 shrink-0 cursor-pointer place-items-center",
                  "rounded-full text-neutral-500",
                  "transition-colors hover:bg-white hover:text-brand-600",
                  "focus-visible:outline-2 focus-visible:outline-offset-2",
                  "focus-visible:outline-brand-500",
                )}
              >
                <ResetIcon className="size-5" />
              </button>
            </div>

            {/* --------------------- Transcript ------------------ */}
            {/*
              A live region: the content changes in response to the reader's
              own choice, so it is announced rather than hidden. Keyed on the
              challenge so switching replays from the first turn.
            */}
            <div id={panelId} aria-live="polite" className="min-h-[18rem] pt-6">
              <AnimatePresence mode="wait">
                <div key={challenge.id}>
                  <ul className="flex flex-col gap-3.5">
                    {challenge.conversation.map((turn, index) => (
                      <motion.li
                        key={turn.text}
                        initial={reduce ? false : { opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: reduce ? 0 : 0.4,
                          delay: reduce ? 0 : index * TURN,
                          ease: easeOut,
                        }}
                        className={cn(
                          "flex items-start gap-3",
                          turn.from === "user" && "justify-end",
                        )}
                      >
                        {turn.from === "assistant" && (
                          <span
                            aria-hidden="true"
                            className="grid size-9 shrink-0 place-items-center rounded-full bg-[#f1e8fe] text-brand-600"
                          >
                            <AssistantIcon className="size-5" />
                          </span>
                        )}

                        <p
                          className={cn(
                            "max-w-[80%] rounded-2xl px-4 py-3",
                            "text-[0.9375rem] leading-relaxed text-pretty",
                            turn.from === "user"
                              ? "bg-[#efe5ff] text-neutral-900"
                              : "bg-white text-neutral-800 ring-1 ring-neutral-200/80",
                          )}
                        >
                          {/* Names the speaker for a screen reader, which
                              cannot see which side the bubble sits on. */}
                          <span className="sr-only">
                            {turn.from === "user" ? "You: " : "Lurny: "}
                          </span>
                          {turn.text}
                        </p>
                      </motion.li>
                    ))}
                  </ul>

                  {/* ------------- The suggestion ------------- */}
                  <motion.div
                    initial={reduce ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: reduce ? 0 : 0.5,
                      delay: suggestionDelay,
                      ease: easeOut,
                    }}
                    className="mt-5 rounded-2xl bg-[#f7f5fe] p-5 ring-1 ring-[#e4d8fb]"
                  >
                    <p className="text-[0.6875rem] font-bold tracking-[0.14em] text-brand-600 uppercase">
                      {starting.suggestionLabel}
                    </p>

                    <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                      {challenge.suggestions.map((engine) => {
                        const Icon = engineIcons[engine.icon];

                        return (
                          <li
                            key={engine.name}
                            className="flex items-start gap-3 rounded-xl bg-white p-4 ring-1 ring-neutral-200/70"
                          >
                            <span
                              aria-hidden="true"
                              className="grid size-10 shrink-0 place-items-center rounded-full bg-[#f1e8fe]"
                            >
                              <Icon className="size-6" />
                            </span>
                            <span className="min-w-0">
                              <span className="block font-display text-[0.9375rem] font-bold text-neutral-900">
                                {engine.name}
                              </span>
                              <span className="mt-0.5 block text-[0.8125rem] leading-relaxed text-neutral-600">
                                {engine.description}
                              </span>
                            </span>
                          </li>
                        );
                      })}
                    </ul>

                    <p className="mt-4 text-center text-[0.8125rem] text-neutral-600">
                      {challenge.flow}
                    </p>

                    <p className="mt-4 text-center">
                      <Link
                        href={starting.action.href}
                        className={cn(
                          "group/cta inline-flex items-center gap-2.5 rounded-full",
                          "bg-brand-600 px-6 py-3",
                          "text-[0.9375rem] font-semibold text-white",
                          "transition-colors hover:bg-brand-700",
                          "focus-visible:outline-2 focus-visible:outline-offset-2",
                          "focus-visible:outline-brand-500",
                        )}
                      >
                        {starting.action.label}
                        <ArrowRightIcon
                          className={cn(
                            "size-4 transition-transform duration-300",
                            "ease-[cubic-bezier(0.16,1,0.3,1)]",
                            "group-hover/cta:translate-x-1",
                            "motion-reduce:transition-none",
                            "motion-reduce:group-hover/cta:translate-x-0",
                          )}
                        />
                      </Link>
                    </p>
                  </motion.div>
                </div>
              </AnimatePresence>
            </div>

            {/* --------------------- Composer -------------------- */}
            {/*
              Drawn because the design draws it, DISABLED because nothing here
              is wired to a model. A box that took typing would promise a reply
              this page cannot give.
            */}
            <div className="mt-6">
              <div
                className={cn(
                  "flex items-center gap-3 rounded-full bg-white",
                  "py-2 pr-2 pl-5 ring-1 ring-neutral-200/80",
                )}
              >
                <input
                  type="text"
                  disabled
                  aria-label={starting.panel.composer.placeholder}
                  placeholder={starting.panel.composer.placeholder}
                  className={cn(
                    "min-w-0 flex-auto bg-transparent py-2",
                    "text-[0.9375rem] text-neutral-900",
                    "placeholder:text-neutral-400",
                    "disabled:cursor-not-allowed",
                  )}
                />
                <span
                  aria-hidden="true"
                  className={cn(
                    "grid size-11 shrink-0 place-items-center rounded-full",
                    "bg-brand-600/50 text-white",
                  )}
                >
                  <SendIcon className="size-5" />
                </span>
              </div>
              <p className="mt-2.5 text-center text-[0.8125rem] text-neutral-500">
                {starting.panel.composer.note}
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
