"use client";

import { motion, useReducedMotion } from "motion/react";

import { sense } from "@/content/sense";
import { cn } from "@/lib/utils";

import {
  ArrowRightIcon,
  BarsIcon,
  CheckIcon,
  ReportDocIcon,
  SaveIcon,
  SearchIcon,
  SendIcon,
  SparkleIcon,
} from "./SenseIcons";

/**
 * LURNYSENSE — THE CONVERSATION
 * ---------------------------------------------------------------------------
 * The overlay in front of section 1's dashboard: a question, the assistant's
 * answer with its chart, a follow-up, the composer, and the report the exchange
 * was saved as.
 *
 * Rebuilt in markup like the dashboard, and decorative for the same reason —
 * it pictures an exchange rather than being one, so it is hidden from assistive
 * tech and every control in it is inert.
 *
 * The design overlaps this onto the dashboard's right edge. That needs width,
 * so the overlap is lg-only; below that the two stack.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { conversation } = sense.hero;
const { chart } = conversation.answer;

/** The tallest bar sets the scale, so the chart fills its box. */
const CHART_MAX = Math.max(...chart.bars.map((bar) => bar.value));

export function SenseConversation() {
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduce ? "shown" : "hidden",
    whileInView: "shown",
    viewport: { once: true, amount: "some" } as const,
    variants: {
      hidden: { opacity: 0, y: 14 },
      shown: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay, ease: easeOut },
      },
    },
  });

  return (
    <div aria-hidden="true" className="space-y-3">
      {/* ======================== The question ======================= */}
      {/* An amber outlined bubble with a tail, as the design draws it. */}
      <motion.div {...rise(0.35)} className="relative">
        <div
          className={cn(
            "rounded-xl border-2 border-[#e0b464] bg-[#0f1517] px-5 py-3.5",
            "text-[1rem] font-medium text-white",
          )}
        >
          {conversation.question}
        </div>
        {/* The tail, pointing down-left toward the answer. */}
        <span
          className={cn(
            "absolute -bottom-[9px] left-10 size-4 rotate-45",
            "border-r-2 border-b-2 border-[#e0b464] bg-[#0f1517]",
          )}
        />
      </motion.div>

      {/* ========================= The answer ======================== */}
      <motion.div
        {...rise(0.5)}
        className={cn(
          "rounded-xl border-2 border-[#7fae80] bg-[#0f1517] p-4",
          "shadow-[0_24px_60px_-30px_rgb(0_0_0/0.9)]",
        )}
      >
        <div className="flex gap-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#182022] text-[#8ac08b]">
            <SparkleIcon className="size-5" />
          </span>

          <p className="text-[0.9375rem] leading-relaxed text-pretty text-white">
            {conversation.answer.before}
            <span className="font-bold">{conversation.answer.figure}</span>
            {conversation.answer.after}
          </p>
        </div>

        {/* ------------------- Score distribution --------------- */}
        <div className="mt-4 rounded-lg border border-white/8 bg-[#182022] p-3.5">
          <p className="flex items-center gap-2 text-[0.8125rem] font-semibold text-white">
            <BarsIcon className="size-4 text-[#8ac08b]" />
            {chart.title}
          </p>

          <div className="mt-3 flex gap-2.5">
            {/* The y axis. */}
            <ul className="flex flex-col justify-between text-[0.5625rem] text-[#6f797d]">
              {chart.axis.map((tick) => (
                <li key={tick}>{tick}</li>
              ))}
            </ul>

            {/* The bars. Each is labelled with its own value above it, which
                is what the design shows. */}
            <ul className="flex min-w-0 flex-1 items-end gap-2.5">
              {chart.bars.map((bar, index) => (
                <li
                  key={bar.label}
                  className="flex min-w-0 flex-1 flex-col items-center"
                >
                  <span className="text-[0.5625rem] text-[#c9d1d3]">
                    {bar.value}
                  </span>

                  <span className="mt-1 flex h-16 w-full items-end">
                    <motion.span
                      className="block w-full rounded-t-[2px] bg-[#8ac08b]"
                      style={{
                        height: `${(bar.value / CHART_MAX) * 100}%`,
                        transformOrigin: "bottom",
                      }}
                      initial={reduce ? "shown" : "hidden"}
                      whileInView="shown"
                      viewport={{ once: true, amount: "some" }}
                      variants={{
                        hidden: { scaleY: 0 },
                        shown: {
                          scaleY: 1,
                          transition: {
                            duration: 0.5,
                            delay: 0.75 + index * 0.07,
                            ease: easeOut,
                          },
                        },
                      }}
                    />
                  </span>

                  <span className="mt-1.5 truncate text-[0.5625rem] text-[#6f797d]">
                    {bar.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>

      {/* ======================== The follow-up ====================== */}
      <motion.div
        {...rise(0.65)}
        className={cn(
          "rounded-xl border-2 border-[#e0b464] bg-[#0f1517] px-5 py-3.5",
          "text-[1rem] font-medium text-white",
        )}
      >
        {conversation.followUp}
      </motion.div>

      {/* ======================== The composer ======================= */}
      <motion.div {...rise(0.75)} className="flex items-center gap-4">
        {/* Inert: a picture of an input. */}
        <span
          className={cn(
            "flex min-w-0 flex-1 items-center gap-2.5 rounded-full",
            "border border-white/12 bg-[#182022] px-4 py-2.5",
          )}
        >
          <SearchIcon className="size-4 shrink-0 text-[#6f797d]" />
          <span className="min-w-0 flex-1 truncate text-[0.8125rem] text-[#6f797d]">
            {conversation.composer.placeholder}
          </span>
          <span className="grid size-7 shrink-0 place-items-center rounded-md bg-[#8ac08b] text-[#0f1517]">
            <SendIcon className="size-3.5" />
          </span>
        </span>

        <span className="flex shrink-0 items-center gap-2 text-[0.75rem] text-[#c9d1d3]">
          <SaveIcon className="size-4" />
          {conversation.composer.save}
        </span>
      </motion.div>

      {/* ======================== Team reports ======================= */}
      <motion.div
        {...rise(0.85)}
        className="rounded-xl border border-white/10 bg-[#182022] p-4"
      >
        <p className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-2.5 text-[0.875rem] font-semibold text-white">
            <ReportDocIcon className="size-4 text-[#c9d1d3]" />
            {conversation.reports.title}
          </span>
          <span className="flex items-center gap-1.5 text-[0.75rem] text-[#8b9499]">
            {conversation.reports.link}
            <ArrowRightIcon className="size-3.5" />
          </span>
        </p>

        <div className="mt-3 flex items-center gap-3 border-t border-white/8 pt-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#fdd386] text-[#0f1517]">
            <BarsIcon className="size-4.5" />
          </span>

          <span className="min-w-0 flex-1">
            <span className="block truncate text-[0.8125rem] font-medium text-white">
              {conversation.reports.item.title}
            </span>
            <span className="mt-0.5 block truncate text-[0.6875rem] text-[#8b9499]">
              {conversation.reports.item.meta}
            </span>
          </span>

          <span className="flex shrink-0 items-center gap-1.5 text-[0.6875rem] text-[#8b9499]">
            <CheckIcon className="size-4 text-[#8ac08b]" />
            {conversation.reports.item.status}
          </span>
        </div>
      </motion.div>
    </div>
  );
}
