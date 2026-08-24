"use client";

import { motion, useReducedMotion } from "motion/react";

import { Uncopyable } from "@/components/ui/Uncopyable";
import { chat } from "@/content/chat";
import { cn } from "@/lib/utils";

/**
 * CHAT TRUSTED DESK
 * ---------------------------------------------------------------------------
 * The drawn LIGHT-themed LurnyDesk chat card in section 4: a grounded answer
 * with a bulleted policy response and a "Sources used" list, plus a floating
 * "approved knowledge only" badge overhanging the right edge.
 *
 * DRAWN, NOT SHIPPED — copy lives in content/chat.ts; wrapped in <Uncopyable>
 * (aria-hidden, unselectable) so it behaves like the product screenshot it
 * imitates. Unlike the other dashboards on this page it is a LIGHT surface, to
 * match the design's off-white section.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { desk } = chat.trusted;
const { answer, sources, badge } = desk;

/** Tinted file-type chip for a source row. */
const fileTone = {
  PDF: "bg-[#fdecec] text-[#d64545]",
  DOC: "bg-[#e8eefc] text-[#3b6fe0]",
  XLS: "bg-[#e6f4ea] text-[#2f9e5f]",
} as const;

export function ChatTrustedDesk({ className }: { className?: string }) {
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

  const hover = reduce
    ? {}
    : {
        whileHover: {
          y: -6,
          transition: { type: "spring", stiffness: 280, damping: 22 } as const,
        },
      };

  return (
    <Uncopyable className={cn("relative", className)}>
      {/* ===================== The LurnyDesk card ===================== */}
      <motion.div
        {...rise(0.1)}
        {...hover}
        className={cn(
          "relative overflow-hidden rounded-2xl bg-white",
          "ring-1 ring-neutral-200/80",
          "shadow-[0_40px_90px_-40px_rgb(30_20_60/0.35)]",
          "transition-shadow duration-500 ease-out",
          "hover:shadow-[0_50px_110px_-40px_rgb(88_40_180/0.35)]",
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-3.5">
          <span className="font-display text-[15px] font-bold text-brand-600">
            {desk.appName}
          </span>
          <span className="flex items-center gap-2.5 text-neutral-400">
            <span className="text-sm">⌕</span>
            <span className="text-xs">↺</span>
            <span className="grid size-6 place-items-center rounded-full bg-brand-100 text-[9px] font-bold text-brand-600">
              {desk.avatar}
            </span>
          </span>
        </div>

        <div className="px-5 py-4">
          {/* Question */}
          <div className="flex items-start gap-2.5">
            <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-500">
              <svg
                viewBox="0 0 16 16"
                className="size-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
              >
                <circle cx="8" cy="5.5" r="2.4" />
                <path d="M3 13a5 5 0 0 1 10 0" />
              </svg>
            </span>
            <span className="rounded-xl bg-neutral-100 px-3.5 py-2.5 text-[12px] text-neutral-700">
              {desk.question}
            </span>
          </div>

          {/* Answer */}
          <div className="mt-4 flex items-start gap-2.5">
            <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-white">
              <svg viewBox="0 0 16 16" className="size-3.5" fill="currentColor">
                <path d="M8 1.5 9 6l4.5 1L9 8l-1 4.5L7 8 2.5 7 7 6z" />
              </svg>
            </span>
            <div className="min-w-0">
              <p className="text-[12px] leading-relaxed text-neutral-700">
                {answer.intro}{" "}
                <span className="text-brand-600">{answer.cite}</span>
              </p>
              <ul className="mt-2.5 space-y-2">
                {answer.points.map((point) => (
                  <li
                    key={point.term}
                    className="flex gap-2 text-[12px] leading-relaxed text-neutral-600"
                  >
                    <span className="mt-1.5 size-1 shrink-0 rounded-full bg-neutral-400" />
                    <span>
                      <span className="font-semibold text-neutral-900">
                        {point.term}
                      </span>{" "}
                      – {point.body}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sources */}
          <div className="mt-5 border-t border-neutral-100 pt-4">
            <p className="text-[13px] font-semibold text-neutral-900">
              {sources.title}
            </p>
            <ul className="mt-2.5 space-y-2.5">
              {sources.items.map((s) => (
                <li key={s.name} className="flex items-center gap-3">
                  <span
                    className={cn(
                      "grid size-7 shrink-0 place-items-center rounded-md text-[7px] font-bold",
                      fileTone[s.type as keyof typeof fileTone],
                    )}
                  >
                    {s.type}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[12px] font-medium text-neutral-800">
                      {s.name}
                    </span>
                    <span className="block text-[10px] text-neutral-500">
                      {s.meta}
                    </span>
                  </span>
                  <span className="hidden text-[10.5px] text-neutral-500 sm:block">
                    {s.ref}
                  </span>
                  <span className="rounded bg-[#e6f4ea] px-1.5 py-0.5 text-[10px] font-semibold text-[#2f9e5f]">
                    {s.score}
                  </span>
                  <span className="text-neutral-400">⌄</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Composer */}
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-neutral-200 px-3.5 py-2.5">
            <span className="flex-1 text-[12px] text-neutral-400">
              {desk.composer}
            </span>
            <span className="grid size-7 place-items-center rounded-lg bg-brand-600 text-white">
              <svg viewBox="0 0 16 16" className="size-3.5" fill="currentColor">
                <path d="M2 8 14 2l-4 12-2.2-4.4z" />
              </svg>
            </span>
          </div>
        </div>
      </motion.div>

      {/* ===================== Floating badge ======================= */}
      {/*
        Overhangs the card's lower-right corner on lg+, as in the design. Below
        lg it tucks under the card so nothing overflows on a phone.
      */}
      <motion.div
        {...rise(0.35)}
        className={cn(
          "mt-4 rounded-2xl bg-brand-50 p-4 ring-1 ring-brand-200/70",
          "shadow-[0_24px_50px_-24px_rgb(88_40_180/0.4)]",
          "lg:absolute lg:top-1/3 lg:-right-6 lg:mt-0 lg:w-52 xl:-right-10",
        )}
      >
        <span className="grid size-8 place-items-center rounded-lg bg-brand-600 text-white">
          <svg
            viewBox="0 0 20 20"
            className="size-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <path
              d="M10 2.5 4 5v4.2c0 3.2 2.4 5.6 6 7 3.6-1.4 6-3.8 6-7V5l-6-2.5Z"
              fill="currentColor"
              stroke="none"
            />
            <path
              d="m7.5 10 1.6 1.6 3-3.2"
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <p className="mt-2.5 text-[15px] leading-snug font-semibold text-brand-700">
          {badge.title}
        </p>
        <p className="mt-2 text-[11px] leading-relaxed text-neutral-500">
          {badge.body}
        </p>
      </motion.div>
    </Uncopyable>
  );
}
