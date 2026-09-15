"use client";

import Link from "next/link";
import { useEffect, useId, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { Uncopyable } from "@/components/ui/Uncopyable";
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

/** How long the dots show before the message they precede. */
const TYPING = 0.34;

/**
 * The three-dot "typing" bubble that precedes each message.
 *
 * It is what makes the transcript read as a conversation happening rather
 * than a list appearing: each turn is announced by a beat of dots in the
 * speaker's own bubble, then replaced by the words. The dots bounce on a
 * stagger so the bubble looks alive rather than blinking.
 *
 * Purely presentational, so `aria-hidden` — the message itself is what the
 * live region announces, and "typing" repeated three times would be noise.
 */
function TypingDots({ tone }: { tone: "user" | "assistant" }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex items-center gap-1 rounded-2xl px-4 py-3.5",
        tone === "user"
          ? "bg-[#efe5ff]"
          : "bg-white ring-1 ring-neutral-200/80",
      )}
    >
      {[0, 1, 2].map((dot) => (
        <motion.span
          key={dot}
          className="size-1.5 rounded-full bg-neutral-400"
          animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
          transition={{
            duration: 0.9,
            repeat: Infinity,
            delay: dot * 0.14,
            ease: "easeInOut",
          }}
        />
      ))}
    </span>
  );
}

export function PlatformStarting() {
  const reduce = useReducedMotion();
  const panelId = useId();

  type ChallengeId = (typeof starting.challenges)[number]["id"];
  const [chosen, setChosen] = useState<ChallengeId>(starting.challenges[0].id);

  /**
   * WHETHER THE PANEL HAS BEEN SEEN YET.
   *
   * The turns must not start arriving until the panel is actually on screen.
   * Animating them on mount — which is what `animate` alone does — plays the
   * whole conversation out while the section is still below the fold, so a
   * reader scrolling down finds a finished transcript and never sees it
   * happen.
   *
   * Switching challenges afterwards replays from the first turn, because the
   * transcript is keyed on the challenge; this flag only governs the FIRST
   * arrival.
   */
  const [seen, setSeen] = useState(false);

  /**
   * Whether the animation has taken over from the server-rendered markup.
   *
   * The transcript renders COMPLETE on the server and stays complete until
   * this flips on mount. Without that, the served HTML contains an empty
   * panel: fine once JavaScript runs, but with scripting off — or before the
   * bundle arrives — the conversation would simply not exist. Now it is there
   * in full, and the staged playback is the enhancement on top.
   */
  const interactive = useSyncExternalStore(
    // Never changes after hydration, so it needs no subscription.
    () => () => {},
    () => true,
    () => false,
  );

  /**
   * How many turns have finished typing and are showing their words.
   *
   * The transcript plays as: turn 1's dots -> turn 1's text -> turn 2's dots
   * -> turn 2's text, and so on. One counter drives it, advanced by a timer
   * per turn, so every message is governed by the same clock rather than each
   * bubble running its own.
   *
   * Reset whenever the challenge changes, so switching replays from the top.
   */
  const [shown, setShown] = useState(0);

  /**
   * Which challenge `shown` is counting. Comparing against the current one is
   * how the transcript rewinds on a switch without the effect above having to
   * reset state synchronously — a stale count simply reads as zero.
   */
  const [playing, setPlaying] = useState<ChallengeId>(
    starting.challenges[0].id,
  );

  const challenge =
    starting.challenges.find((entry) => entry.id === chosen) ??
    starting.challenges[0];

  useEffect(() => {
    // Nothing plays until the panel is on screen. Reduced motion is handled
    // by `revealed` below rather than here — setting state synchronously in
    // an effect just to jump to the end would cascade a second render for no
    // benefit.
    if (!seen || reduce) return;

    // Each turn gets its own timer. No synchronous reset is needed: `shown`
    // is keyed to the challenge by `playKey` below, so switching challenges
    // starts a fresh counter rather than rewinding this one.
    const timers = challenge.conversation.map((_, index) =>
      window.setTimeout(
        () => {
          setPlaying(challenge.id);
          setShown(index + 1);
        },
        (index * TURN + TYPING) * 1000,
      ),
    );

    return () => timers.forEach(window.clearTimeout);
  }, [seen, reduce, challenge]);

  /**
   * How many turns are showing their words. Under reduced motion that is all
   * of them, immediately — derived rather than stored, so the effect above
   * never has to set state just to skip the animation.
   */
  const revealed =
    reduce || !interactive
      ? challenge.conversation.length
      : playing === challenge.id
        ? shown
        : 0;

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

  /** The suggestion appears once the last message has landed. */
  const conversationDone = revealed >= challenge.conversation.length;

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
          {/*
            The whole panel is Uncopyable: it is a demonstration of a product
            conversation, and its text should behave like the interface it
            imitates rather than like selectable page copy.

            `aria-hidden={false}` is the deliberate exception to that
            component's default. Everywhere else on this page Uncopyable wraps
            decoration that assistive tech should skip; here the transcript
            changes in response to the reader's own choice, so it must still be
            announced — see the live region below.
          */}
          <Uncopyable aria-hidden={false} className="contents">
            <motion.div
              {...rise(0.18)}
              onViewportEnter={() => setSeen(true)}
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
              {/*
              No reserved min-height: every child below holds its own space
              from the first render, so the panel's height is settled before
              anything animates. A guessed min-height only papers over reflow
              and breaks the moment a conversation runs a line longer.
            */}
              <div id={panelId} aria-live="polite" className="pt-6">
                <AnimatePresence mode="wait">
                  <div key={challenge.id}>
                    <ul className="flex flex-col gap-3.5">
                      {challenge.conversation.map((turn, index) => {
                        // A turn shows dots when its beat comes round, then its
                        // words. Before that it is INVISIBLE RATHER THAN ABSENT:
                        // every turn holds its own height from the start, so the
                        // panel never grows as messages land. Unmounting them —
                        // which is what returning null did — reflowed the page
                        // on every beat.
                        const arrived = revealed > index;
                        const typing = !reduce && seen && revealed === index;
                        const pending = !arrived && !typing;

                        return (
                          <motion.li
                            key={turn.text}
                            aria-hidden={pending || undefined}
                            initial={reduce ? false : { opacity: 0, y: 10 }}
                            animate={{
                              opacity: pending ? 0 : 1,
                              y: pending ? 10 : 0,
                            }}
                            transition={{
                              duration: reduce ? 0 : 0.32,
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

                            {typing ? (
                              <TypingDots tone={turn.from} />
                            ) : (
                              /* A pending turn renders its real words at zero
                               opacity: the dots are narrower than the message,
                               so reserving space with them would still jump. */
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
                            )}
                          </motion.li>
                        );
                      })}
                    </ul>

                    {/* ------------- The suggestion ------------- */}
                    <motion.div
                      /*
                      Present from the start, faded until the last message
                      lands. This is the block that used to make the page
                      jump: it is the tallest thing in the panel, and
                      mounting it at the end pushed everything below it down.
                      Fading in place costs nothing and holds the layout
                      still.
                    */
                      aria-hidden={conversationDone ? undefined : true}
                      initial={reduce ? false : { opacity: 0, y: 12 }}
                      animate={
                        conversationDone
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0, y: 12 }
                      }
                      transition={{
                        duration: reduce ? 0 : 0.5,
                        delay: reduce ? 0 : 0.25,
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
          </Uncopyable>
        </div>
      </Container>
    </section>
  );
}
