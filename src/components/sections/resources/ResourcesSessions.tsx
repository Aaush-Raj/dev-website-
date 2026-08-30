"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { resources } from "@/content/resources";
import { cn } from "@/lib/utils";

/**
 * RESOURCES SESSIONS
 * ---------------------------------------------------------------------------
 * Section 7 of the Resources page: one upcoming live session beside two
 * on-demand recordings, on the near-black ground.
 *
 * THE LIVE CARD IS THE SUBJECT
 * It takes ~1.7x the stacked pair — the ratio the design measures — and carries
 * the date, the presenter and a filled Register button. The recordings carry
 * only a runtime and a Watch button. That difference in weight is the point of
 * the layout, so the two kinds are separate markup rather than one card
 * component with everything made optional.
 *
 * THE ARTWORK
 * All three images are opaque and sit BEHIND their copy rather than in a band
 * above it: the live card's still fills the card's right half, and each
 * recording's fills its own right side. Both are masked so the near-black
 * gradient carries the text — which is why the images need no separate scrim
 * element.
 *
 * They arrive at different aspects (1.60 and 1.78), so each is sized by its own
 * box with `object-cover` rather than being forced to a shared ratio.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { sessions } = resources;

/**
 * The two recordings' accents, keyed by the entry's `accent`. Sampled from the
 * design; each matches the dominant colour of its own artwork.
 */
const recordingTone = {
  mint: {
    badge: "border-[#75d7bc]/50 text-[#75d7bc]",
    button: "bg-[#70d0b4] text-[#08221c]",
    glow: "rgb(117 215 188 / 0.10)",
  },
  amber: {
    badge: "border-[#eeac4c]/50 text-[#eeac4c]",
    button: "bg-[#f0a346] text-[#2b1705]",
    glow: "rgb(238 172 76 / 0.10)",
  },
} as const;

export function ResourcesSessions() {
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduce ? "shown" : "hidden",
    whileInView: "shown",
    viewport: { once: true, amount: "some" } as const,
    variants: {
      hidden: { opacity: 0, y: 18 },
      shown: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay, ease: easeOut },
      },
    },
  });

  const card = (delay: number) => ({
    initial: reduce ? "shown" : "hidden",
    whileInView: "shown",
    viewport: { once: true, amount: 0.15 } as const,
    variants: {
      hidden: { opacity: 0, y: 26 },
      shown: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.65, delay, ease: easeOut },
      },
    },
  });

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden py-section-lg",
        // The ground, sampled from the design.
        "bg-[#0d0d0d] text-white",
      )}
    >
      <Container width="wide">
        {/* =========================== Statement ===================== */}
        {/*
          The heading and the "View all sessions" action share a row on lg, as
          the design sets them.
        */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "text-[0.6875rem] font-bold uppercase",
                "tracking-[0.16em] text-[#a166ee] sm:text-xs",
              )}
            >
              {sessions.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.08)}
              className={cn(
                "mt-5 font-display font-bold tracking-[-0.03em]",
                "leading-[1.06] text-white",
                // Measured from the design at ~58px on a 1440 frame.
                "text-[2rem] sm:text-[2.625rem] xl:text-[3.5rem]",
              )}
            >
              {sessions.headline}
            </motion.h2>

            <motion.p
              {...rise(0.16)}
              className={cn(
                "mt-5 max-w-none leading-relaxed text-pretty",
                "text-[1rem] text-neutral-300 sm:text-lg",
              )}
            >
              {sessions.description}
            </motion.p>
          </div>

          <motion.div {...rise(0.22)} className="shrink-0 lg:pt-4">
            <Link
              href={sessions.action.href}
              className={cn(
                "group/all inline-flex items-center gap-3 rounded-lg",
                "border border-[#9766ec] px-6 py-3.5",
                "text-[0.9375rem] font-semibold text-[#c8a8f7]",
                "duration-normal transition-[background-color,translate] ease-out",
                "will-change-[translate]",
                "hover:-translate-y-0.5 hover:bg-[#9766ec]/12",
                "active:translate-y-0",
              )}
            >
              {sessions.action.label}
              <ArrowIcon
                className={cn(
                  "size-4",
                  "duration-normal transition-[translate] ease-out",
                  "group-hover/all:translate-x-1",
                )}
              />
            </Link>
          </motion.div>
        </div>

        {/* ============================ Cards ======================== */}
        <div
          className={cn(
            "mt-12 grid gap-5",
            // The live card takes ~1.7x the stacked pair, per the design.
            "lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]",
          )}
        >
          {/* ------------------------ Live session ------------------ */}
          <motion.article {...card(0.28)}>
            <Link
              href={sessions.live.action.href}
              className={cn(
                "group relative flex h-full flex-col overflow-hidden rounded-2xl",
                "border border-white/10 bg-[#0f0e0e] p-7 sm:p-9",
                "duration-normal transition-[border-color,translate] ease-out",
                "will-change-[translate]",
                "hover:-translate-y-1 hover:border-white/20",
                "focus-visible:ring-2 focus-visible:ring-[#a166ee]/60 focus-visible:outline-none",
              )}
            >
              {/* The still, filling the card's right half and masked so the
                  copy's side stays near-black. No separate scrim needed. */}
              <Image
                src={sessions.live.art.src}
                alt={sessions.live.art.alt}
                width={sessions.live.art.width}
                height={sessions.live.art.height}
                aria-hidden="true"
                sizes="(min-width: 1024px) 55vw, 100vw"
                className={cn(
                  "pointer-events-none absolute inset-y-0 right-0 -z-10",
                  "hidden h-full w-[62%] object-cover sm:block",
                  // `scale`, not `transform` — Tailwind v4 compiles the scale
                  // utilities to the standalone property.
                  "transition-[scale] duration-700 ease-out",
                  "group-hover:scale-[1.03]",
                )}
                style={{
                  maskImage:
                    "linear-gradient(90deg, transparent, black 42%, black)",
                  WebkitMaskImage:
                    "linear-gradient(90deg, transparent, black 42%, black)",
                }}
              />

              <span className="relative max-w-100">
                <Badge className="border-[#f06782]/50 text-[#f06782]">
                  {sessions.live.badge}
                </Badge>

                {/* The date and time. */}
                <span className="mt-7 block space-y-3">
                  <MetaRow icon={<CalendarIcon className="size-5" />}>
                    {sessions.live.date}
                  </MetaRow>
                  <MetaRow icon={<ClockIcon className="size-5" />}>
                    {sessions.live.time}
                  </MetaRow>
                </span>

                <span
                  aria-hidden="true"
                  className="mt-7 block h-px w-full max-w-88 bg-white/12"
                />

                <span
                  className={cn(
                    "mt-7 block font-display font-bold tracking-[-0.025em]",
                    "text-[1.75rem] leading-[1.12] text-pretty text-white",
                    "sm:text-[2.125rem]",
                  )}
                >
                  {sessions.live.title}
                </span>

                <span className="mt-4 block text-[1rem] leading-relaxed text-pretty text-neutral-300">
                  {sessions.live.description}
                </span>

                {/* The presenter. */}
                <span className="mt-8 flex items-center gap-4">
                  <SessionAvatar initials={sessions.live.presenter.initials} />
                  <span className="text-[0.9375rem] text-neutral-200">
                    <span className="font-semibold text-white">
                      {sessions.live.presenter.name}
                    </span>
                    {/* Decorative separator — a screen reader would otherwise
                        announce "bullet" between the two halves. */}
                    <span aria-hidden="true" className="mx-2 text-neutral-500">
                      ·
                    </span>
                    {sessions.live.presenter.role}
                  </span>
                </span>

                {/* Drawn as a button, but the card is the anchor — see the
                    note on the recordings below. Pushed to the card's foot. */}
                <span
                  className={cn(
                    "mt-10 inline-flex items-center gap-3 rounded-lg",
                    "bg-[#5f35ce] px-7 py-4",
                    "text-[1rem] font-semibold text-white",
                    "duration-normal transition-[background-color] ease-out",
                    "group-hover:bg-[#7044e0]",
                  )}
                >
                  {sessions.live.action.label}
                  <ArrowIcon
                    className={cn(
                      "size-4",
                      "duration-normal transition-[translate] ease-out",
                      "group-hover:translate-x-1",
                    )}
                  />
                </span>
              </span>
            </Link>
          </motion.article>

          {/* ------------------------ Recordings -------------------- */}
          <div className="grid content-start gap-5 lg:grid-rows-[auto_auto]">
            {sessions.recordings.map((item, index) => {
              const tone = recordingTone[item.accent];

              return (
                <motion.article key={item.title} {...card(0.38 + index * 0.1)}>
                  <Link
                    href={item.href}
                    className={cn(
                      "group relative flex h-full flex-col overflow-hidden rounded-2xl",
                      "border border-white/10 bg-[#0f0e0e] p-6",
                      "duration-normal transition-[border-color,translate] ease-out",
                      "will-change-[translate]",
                      "hover:-translate-y-1 hover:border-white/20",
                      "focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none",
                    )}
                  >
                    {/* This card's own tint, picked up from its artwork. */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 -z-10"
                      style={{
                        background: `radial-gradient(28rem 20rem at 88% 40%, ${tone.glow}, transparent 70%)`,
                      }}
                    />

                    <Image
                      src={item.art.src}
                      alt={item.art.alt}
                      width={item.art.width}
                      height={item.art.height}
                      aria-hidden="true"
                      sizes="(min-width: 1024px) 34vw, 100vw"
                      className={cn(
                        "pointer-events-none absolute inset-y-0 right-0 -z-10",
                        "hidden h-full w-[58%] object-cover sm:block",
                        "transition-[scale] duration-700 ease-out",
                        "group-hover:scale-[1.04]",
                      )}
                      style={{
                        maskImage:
                          "linear-gradient(90deg, transparent, black 46%, black)",
                        WebkitMaskImage:
                          "linear-gradient(90deg, transparent, black 46%, black)",
                      }}
                    />

                    <span className="relative max-w-64">
                      <Badge className={tone.badge}>
                        {sessions.onDemandBadge}
                      </Badge>

                      <span
                        className={cn(
                          "mt-5 block font-display font-bold tracking-[-0.02em]",
                          "text-[1.375rem] leading-[1.16] text-pretty text-white",
                        )}
                      >
                        {item.title}
                      </span>

                      <span className="mt-4 block">
                        <MetaRow icon={<ClockIcon className="size-4" />}>
                          {item.runtime}
                        </MetaRow>
                      </span>

                      {/*
                        Drawn as a button, not a real one — the whole card is
                        already the anchor, and nesting interactive elements is
                        invalid.
                      */}
                      <span
                        className={cn(
                          "mt-5 inline-flex items-center gap-2.5 rounded-md",
                          "px-4 py-2.5 text-[0.875rem] font-semibold",
                          tone.button,
                          "duration-normal transition-[filter] ease-out",
                          "group-hover:brightness-110",
                        )}
                      >
                        {sessions.watchLabel}
                        <ArrowIcon
                          className={cn(
                            "size-3.5",
                            "duration-normal transition-[translate] ease-out",
                            "group-hover:translate-x-1",
                          )}
                        />
                      </span>
                    </span>
                  </Link>
                </motion.article>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

/** The outlined pill above each card's title. */
function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-4 py-1.5",
        "text-[0.625rem] font-bold tracking-[0.14em] uppercase",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** An icon-and-text row — the date, time and runtime lines. */
function MetaRow({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <span className="flex items-center gap-3 text-[0.9375rem] text-neutral-200">
      <span aria-hidden="true" className="shrink-0 text-neutral-400">
        {icon}
      </span>
      {children}
    </span>
  );
}

/**
 * The presenter's avatar.
 *
 * A monogram disc in the violet ring the design draws, standing in for the
 * photograph — no avatar was supplied in the section's asset folder. See the
 * TODO in content/resources.ts; swapping in a real image later means replacing
 * the inner span with an <Image>, leaving the ring untouched.
 */
function SessionAvatar({ initials }: { initials: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid size-13 shrink-0 place-items-center rounded-full p-0.5",
        "bg-linear-to-br from-[#c86fd8] via-[#8b5cf6] to-[#5f35ce]",
      )}
    >
      <span
        className={cn(
          "grid size-full place-items-center rounded-full bg-[#1b1a20]",
          "text-[0.875rem] font-semibold tracking-wide text-neutral-200",
        )}
      >
        {initials}
      </span>
    </span>
  );
}

/** A calendar — the live session's date. */
function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="3.4"
        y="5.2"
        width="17.2"
        height="15.4"
        rx="2.4"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M3.4 10h17.2M8.2 3.4v3.6M15.8 3.4v3.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** A clock — the times and runtimes. */
function ClockIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="8.4" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 7.2V12l3.2 2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** The arrow on the section action and every card button. */
function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M3.5 10h12m0 0-4.4-4.4M15.5 10l-4.4 4.4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
