"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { campus } from "@/content/campus";
import { cn } from "@/lib/utils";

import {
  ArrowDownIcon,
  AvatarIcon,
  CalendarIcon,
  CheckBadgeIcon,
  SendIcon,
  SourceIcon,
  SparkIcon,
  StarFilledIcon,
} from "./CampusIcons";

/**
 * LURNYCAMPUS — THE SUPPORT WORKSPACE
 * ---------------------------------------------------------------------------
 * The mockup in section 5: a student's question, Campus AI's answer, a mentor
 * match, that mentor's own trained assistant, and the booked session.
 *
 * As with the other product mockups on this page it is rebuilt in markup
 * rather than shipped as the supplied 808x884 PNG — sharp at every density,
 * reflowing at every width, and with its type left as type.
 *
 * It is DECORATIVE: a picture of a conversation, not a live one. The section's
 * argument is carried by the copy beside it, so the whole panel is hidden from
 * assistive tech rather than announcing a fake dialogue as if it were real.
 * Every control here is inert for the same reason.
 *
 * The one exception is the mentor's portrait, which is a real illustration of
 * a named person and so is given a real alt — but it too sits inside the
 * hidden subtree, so it is never announced.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { workspace } = campus.guidance;

/** Shared chrome for the three stacked cards. */
const card = "rounded-2xl border border-[#e8e6e3] bg-[#fbfafa] p-4 sm:p-5";

export function CampusSupport() {
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
        "rounded-3xl bg-[#f6f5f5] p-4 sm:p-6",
        "shadow-[0_40px_90px_-30px_rgb(0_15_18/0.75)]",
        "ring-1 ring-white/10",
      )}
    >
      {/* =========================== Wordmark ========================== */}
      <span className="flex items-center gap-2.5">
        <span className="grid size-8 place-items-center rounded-lg bg-[#ef5b34] font-display text-[1rem] font-bold text-white">
          L
        </span>
        <span className="font-display text-[1.1875rem] font-bold tracking-[-0.02em] text-[#0d5451]">
          {workspace.brand}
        </span>
      </span>

      <p className="mt-5 font-display text-[1.375rem] leading-snug font-bold text-pretty text-[#0b1a22] sm:text-[1.625rem]">
        {workspace.title}
      </p>

      <p className="mt-3">
        <span className="inline-block rounded-lg bg-[#e2f1ec] px-3 py-1.5 text-[0.8125rem] font-medium text-[#0d5451]">
          {workspace.role}
        </span>
      </p>

      {/* ======================== The question ========================= */}
      <motion.div {...rise(0.24)} className="mt-5 flex items-start gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#e2eeeb] text-[#3f6b6b]">
          <AvatarIcon className="size-5" />
        </span>

        <span className="min-w-0 flex-1 rounded-2xl rounded-tl-md bg-[#e9f0ef] px-4 py-3">
          <span className="block text-[0.9375rem] leading-relaxed text-pretty text-[#12333a]">
            {workspace.question}
          </span>
        </span>
      </motion.div>

      {/* ========================= Campus AI =========================== */}
      <motion.div {...rise(0.34)} className={cn(card, "mt-4")}>
        <p className="flex items-center gap-2.5">
          <SparkIcon className="size-5 shrink-0 text-[#0d5451]" />
          <span className="font-display text-[1.0625rem] font-bold text-[#0b1a22]">
            {workspace.ai.name}
          </span>
        </p>

        <p className="mt-3 text-[0.9375rem] leading-relaxed text-pretty text-[#3f5158]">
          {workspace.ai.answer}
        </p>

        {/* The cited sources, and the (inert) send control. */}
        <div className="mt-4 flex items-end justify-between gap-4">
          <span className="flex min-w-0 flex-wrap items-center gap-2.5">
            {workspace.ai.sources.map((source) => (
              <span
                key={source}
                className={cn(
                  "inline-flex items-center gap-2 rounded-lg px-3 py-2",
                  "bg-[#eef2f1] text-[0.8125rem] font-medium text-[#12333a]",
                )}
              >
                <SourceIcon className="size-4 shrink-0 text-[#5c7b7b]" />
                {source}
              </span>
            ))}
          </span>

          <SendIcon className="size-9 shrink-0 text-[#04363d]" />
        </div>
      </motion.div>

      {/* ======================= The mentor match ====================== */}
      <motion.div {...rise(0.44)} className={cn(card, "mt-4")}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <span className="flex min-w-0 flex-1 items-center gap-4">
            <Image
              src={workspace.mentor.avatar.src}
              alt={workspace.mentor.avatar.alt}
              width={workspace.mentor.avatar.width}
              height={workspace.mentor.avatar.height}
              className="size-14 shrink-0 rounded-full bg-[#f3ece2] object-cover"
            />

            <span className="min-w-0 flex-1">
              <span className="block text-[1.0625rem] font-bold text-pretty text-[#0b1a22]">
                {workspace.mentor.name}
              </span>
              <span className="mt-0.5 block text-[0.875rem] text-[#4a5a60]">
                {workspace.mentor.role}
              </span>
              <span className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[0.875rem] text-[#3f5158]">
                <StarFilledIcon className="size-4 shrink-0 text-[#12333a]" />
                <span className="font-semibold">{workspace.mentor.rating}</span>
                <span aria-hidden="true" className="text-[#b9c4c6]">
                  ·
                </span>
                <span>{workspace.mentor.sessions}</span>
              </span>
            </span>
          </span>

          {/* Inert: a picture of a button. */}
          <span
            className={cn(
              "inline-flex h-11 shrink-0 items-center justify-center rounded-lg px-5",
              "bg-[#0d4a4a] text-[0.9375rem] font-semibold text-white",
              // Full width when the row is stacked, hugging once it is not.
              "w-full sm:w-auto",
            )}
          >
            {workspace.mentor.action}
          </span>
        </div>
      </motion.div>

      {/* ====================== The mentor's own AI ==================== */}
      {/* The pill sits between the two cards, pointing down into the one it
          labels — exactly as the design places it. */}
      <motion.div
        {...rise(0.54)}
        className="mt-4 flex flex-col items-center gap-1"
      >
        <span className="rounded-md bg-[#dcebe8] px-3 py-1.5 text-[0.8125rem] font-medium text-[#14454f]">
          {workspace.mentorAi.pill}
        </span>
        <ArrowDownIcon className="size-4 text-[#4d8080]" />
      </motion.div>

      <motion.div {...rise(0.6)} className={cn(card, "mt-1")}>
        <p className="font-display text-[1.0625rem] font-bold text-pretty text-[#0b1a22]">
          {workspace.mentorAi.title}
        </p>
        <p className="mt-1 text-[0.875rem] text-pretty text-[#4a5a60]">
          {workspace.mentorAi.subtitle}
        </p>

        <div className="mt-4 flex items-start gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#dcebe8] text-[#0d5451]">
            <SparkIcon className="size-5" />
          </span>

          <span className="min-w-0 flex-1 rounded-2xl rounded-tl-md bg-[#eef2f1] px-4 py-3">
            <span className="block text-[0.9375rem] leading-relaxed text-pretty text-[#12333a]">
              {workspace.mentorAi.message}
            </span>
          </span>
        </div>
      </motion.div>

      {/* ========================= The session ========================= */}
      <motion.div
        {...rise(0.7)}
        className={cn(
          card,
          "mt-4 flex flex-wrap items-center justify-between gap-3",
        )}
      >
        <span className="flex min-w-0 items-center gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#e2eeeb] text-[#0d5451]">
            <CalendarIcon className="size-5" />
          </span>
          <span className="text-[0.9375rem] font-bold text-pretty text-[#0b1a22]">
            {workspace.session.title}
          </span>
        </span>

        <span
          className={cn(
            "inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-2",
            "bg-[#eef2f1] text-[0.875rem] font-medium text-[#12333a]",
          )}
        >
          <CheckBadgeIcon className="size-4 shrink-0 text-[#0d5451]" />
          {workspace.session.badge}
        </span>
      </motion.div>
    </motion.div>
  );
}
