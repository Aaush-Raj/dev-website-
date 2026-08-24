"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { Uncopyable } from "@/components/ui/Uncopyable";
import { chat } from "@/content/chat";
import { cn } from "@/lib/utils";

import { ChatMomentPhone } from "./ChatMomentPhone";

/**
 * CHAT MOMENT
 * ---------------------------------------------------------------------------
 * Section 5 of the LurnyChat page: "learning at the speed of need". A dark
 * section — the statement on the left (headline, three feature bars, amber
 * button), a drawn phone mockup on the right with two supporting cards below.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { moment } = chat;

/** Feature-bar icons, keyed by the name in the content file. */
const featureIcons = {
  globe: GlobeIcon,
  flow: FlowIcon,
  shield: ShieldIcon,
} as const;

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="7.2" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M2.8 10h14.4M10 2.8c2 2 3 4.6 3 7.2s-1 5.2-3 7.2c-2-2-3-4.6-3-7.2s1-5.2 3-7.2Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FlowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M2.5 7.5c2.5-3 5-3 7.5 0s5 3 7.5 0M2.5 12.5c2.5-3 5-3 7.5 0s5 3 7.5 0"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M10 2.2 3.6 4.7v4.9c0 3.6 2.6 6.4 6.4 8.2 3.8-1.8 6.4-4.6 6.4-8.2V4.7L10 2.2Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="m7.4 10 1.8 1.8 3.4-3.6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChatMoment() {
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

  const hover = reduce
    ? {}
    : {
        whileHover: {
          y: -6,
          transition: { type: "spring", stiffness: 280, damping: 22 } as const,
        },
      };

  const { refresher, practise } = moment.cards;

  return (
    <section className="relative isolate overflow-hidden bg-[#0a0713] py-section-lg text-white">
      {/* Faint concentric arcs, top-left and right, as the design has them. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-40 -z-10 hidden size-[40rem] rounded-full border border-brand-300/10 lg:block"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 -right-52 -z-10 hidden size-[44rem] rounded-full border border-brand-300/10 lg:block"
      />
      {/* Soft violet glow behind the phone. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(38rem 34rem at 82% 40%, rgb(88 40 180 / 0.3), transparent 62%)",
        }}
      />

      <Container width="hero" className="relative">
        <div
          className={cn(
            "grid items-center gap-14",
            "lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:gap-16",
          )}
        >
          {/* =========================== Statement ===================== */}
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "text-[0.6875rem] font-bold uppercase",
                "tracking-[0.14em] text-brand-300 sm:text-xs",
              )}
            >
              {moment.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.08)}
              className={cn(
                "mt-6 font-display font-bold tracking-[-0.035em]",
                "leading-[1.06] text-white",
                "text-[2.5rem] sm:text-[3rem] xl:text-[3.5rem]",
              )}
            >
              {moment.headline.map((line) => (
                <span key={line} className="inline lg:block">
                  {line}{" "}
                </span>
              ))}
            </motion.h2>

            <motion.p
              {...rise(0.16)}
              className={cn(
                "mt-6 max-w-108 leading-relaxed text-pretty",
                "text-[1.0625rem] text-neutral-300 sm:text-lg",
              )}
            >
              {moment.description}
            </motion.p>

            {/* ------------------------- Feature bars ----------------- */}
            <motion.ul {...rise(0.24)} className="mt-9 max-w-100 space-y-3">
              {moment.features.map((feature) => {
                const Icon = featureIcons[feature.icon];
                return (
                  <li
                    key={feature.label}
                    className={cn(
                      "flex items-center gap-3.5 rounded-xl px-4 py-3",
                      "border border-white/8 bg-white/[0.03]",
                    )}
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-500/20 text-brand-200">
                      <Icon className="size-4.5" />
                    </span>
                    <span className="text-[0.9375rem] font-medium text-neutral-100">
                      {feature.label}
                    </span>
                  </li>
                );
              })}
            </motion.ul>

            {/* --------------------------- Action --------------------- */}
            <motion.div {...rise(0.32)} className="mt-8">
              <Link
                href={moment.action.href}
                className={cn(
                  "group inline-flex h-13 items-center justify-center gap-3 rounded-lg px-7",
                  "bg-accent-300 text-[0.9375rem] font-bold text-neutral-900",
                  "duration-normal transition-[background-color,box-shadow,translate] ease-out",
                  "will-change-[translate]",
                  "hover:-translate-y-0.5 hover:bg-accent-200",
                  "hover:shadow-[0_18px_40px_-14px_rgb(252_197_50/0.5)]",
                  "active:translate-y-0",
                )}
              >
                {moment.action.label}
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                  className={cn(
                    "size-4",
                    "duration-normal transition-[translate] ease-out",
                    "group-hover:translate-x-1",
                  )}
                >
                  <path
                    d="M2.5 8h11m0 0-4-4m4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </motion.div>
          </div>

          {/* ======================= Phone + cards ===================== */}
          <div className="relative">
            <motion.div
              initial={reduce ? "shown" : "hidden"}
              whileInView="shown"
              viewport={{ once: true, amount: "some" }}
              variants={{
                hidden: { opacity: 0, y: 24 },
                shown: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, delay: 0.1, ease: easeOut },
                },
              }}
            >
              <ChatMomentPhone />
            </motion.div>

            {/* The two supporting cards, sitting under the phone. */}
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {/* Refresher */}
              <Uncopyable
                as={motion.div}
                {...rise(0.4)}
                {...hover}
                className={cardShell}
              >
                <p className="text-[0.9375rem] leading-snug font-semibold text-white">
                  {refresher.title.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
                <div className="mt-3 flex items-center gap-2.5 rounded-lg border border-white/8 bg-white/[0.03] p-2.5">
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand-500 text-white">
                    ▶
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[0.75rem] font-medium text-neutral-100">
                      {refresher.clip.name}
                    </span>
                    <span className="block text-[0.6875rem] text-neutral-500">
                      {refresher.clip.duration}
                    </span>
                  </span>
                  <span className="space-y-1">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="block h-0.5 w-6 rounded-full bg-brand-400/50"
                      />
                    ))}
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <span className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
                    <span
                      className="block h-full rounded-full bg-brand-400"
                      style={{ width: `${refresher.percent}%` }}
                    />
                  </span>
                  <span className="text-[0.6875rem] text-neutral-400 tabular-nums">
                    {refresher.percent}%
                  </span>
                </div>
              </Uncopyable>

              {/* Practise */}
              <Uncopyable
                as={motion.div}
                {...rise(0.5)}
                {...hover}
                className={cardShell}
              >
                <p className="text-[0.9375rem] leading-snug font-semibold text-white">
                  {practise.title.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
                <div className="mt-3 rounded-lg border border-white/8 bg-white/[0.03] p-3">
                  <span className="block text-[0.75rem] font-semibold text-neutral-100">
                    {practise.sim.name}
                  </span>
                  <span className="block text-[0.6875rem] text-neutral-500">
                    {practise.sim.meta}
                  </span>
                  <div className="mt-2.5 flex items-center gap-3">
                    <span className="relative grid size-11 shrink-0 place-items-center">
                      <svg viewBox="0 0 44 44" className="size-11 -rotate-90">
                        <circle
                          cx="22"
                          cy="22"
                          r="18"
                          fill="none"
                          stroke="rgb(255 255 255 / 0.1)"
                          strokeWidth="4"
                        />
                        <circle
                          cx="22"
                          cy="22"
                          r="18"
                          fill="none"
                          stroke="#8b5cf6"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeDasharray={`${(Number(practise.score) / 100) * 2 * Math.PI * 18} 999`}
                        />
                      </svg>
                      <span className="absolute text-[0.8125rem] font-bold text-white tabular-nums">
                        {practise.score}
                      </span>
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[0.75rem] font-semibold text-brand-200">
                        {practise.praise.title}
                      </span>
                      <span className="block text-[0.6875rem] leading-tight text-neutral-400">
                        {practise.praise.body}
                      </span>
                    </span>
                  </div>
                </div>
              </Uncopyable>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/** Shared shell for the two supporting cards. */
const cardShell = cn(
  "rounded-2xl border border-ink-border/50 bg-[#12101c] p-4",
  "shadow-[0_24px_60px_-30px_rgb(0_0_0/0.9)]",
  "transition-[border-color,box-shadow] duration-400 ease-out",
  "hover:border-brand-400/50 hover:shadow-[0_36px_80px_-28px_rgb(88_40_180/0.6)]",
);
