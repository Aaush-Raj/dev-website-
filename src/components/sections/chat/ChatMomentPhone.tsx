"use client";

import { Uncopyable } from "@/components/ui/Uncopyable";
import { chat } from "@/content/chat";
import { cn } from "@/lib/utils";

import { LurnyMark, MicIcon, StatusIcons } from "../saathi/SaathiIcons";

/**
 * CHAT MOMENT PHONE
 * ---------------------------------------------------------------------------
 * The handset in section 5: a titanium frame holding an in-the-moment voice
 * chat — the user's spoken question, LurnyChat's numbered reply, and a
 * tap-to-speak control.
 *
 * DRAWN, NOT SHIPPED — the frame chrome follows the same approach as
 * SaathiPhone: everything inside is expressed in `em` and the root sets a
 * viewport-scaled font-size, so the whole mockup scales as one unit. Wrapped in
 * <Uncopyable> (aria-hidden, unselectable) so it behaves like a screenshot.
 */

const { phone } = chat.moment;

/** A drawn waveform — a fixed, organic bar pattern. Heights in %. */
const YOU_WAVE = [
  40, 62, 48, 78, 90, 56, 44, 70, 96, 60, 46, 72, 84, 50, 38, 66, 88, 52, 74,
  58, 42, 68,
] as const;

const SPEAK_WAVE = [
  20, 34, 26, 46, 60, 40, 30, 52, 72, 44, 32, 58, 80, 50, 36, 64, 90, 54, 68,
  46, 30, 56, 74, 42, 28, 50, 66, 38, 24, 48, 70, 40, 30, 54, 62, 36,
] as const;

export function ChatMomentPhone({ className }: { className?: string }) {
  return (
    <Uncopyable className={cn("relative", className)}>
      {/* ======================= The titanium frame ====================== */}
      <div
        className={cn(
          "relative rounded-[2.4em] p-[0.34em]",
          "bg-linear-160 from-[#6f6f79] via-[#20202a] to-[#5d5d68]",
          "shadow-[0_50px_110px_-30px_rgb(0_0_0/0.85)]",
          "mx-auto w-64 lg:w-60 xl:w-64",
          // Scales the entire mockup as one unit.
          "text-[0.6rem] lg:text-[0.56rem] xl:text-[0.6rem]",
        )}
      >
        {/* Inner bezel */}
        <div className="relative overflow-hidden rounded-[2.1em] bg-black p-[0.22em]">
          {/* ========================= The screen ======================== */}
          <div
            className={cn(
              "relative overflow-hidden rounded-[1.95em] bg-[#0d0a1c]",
              "aspect-393/800",
            )}
          >
            {/* Screen lighting — a violet bloom top and a soft floor. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background: [
                  "radial-gradient(120% 55% at 80% 42%, rgb(88 52 190 / 0.4), transparent 62%)",
                  "linear-gradient(180deg, transparent 60%, rgb(9 6 32 / 0.7) 100%)",
                ].join(","),
              }}
            />

            {/* --------------------- Status bar ----------------------- */}
            <div className="relative flex items-center justify-between px-[1.7em] pt-[0.9em]">
              <span className="text-[1.05em] font-semibold text-white">
                {phone.statusTime}
              </span>
              <StatusIcons className="h-[0.85em] w-[3.1em] text-white" />
            </div>

            {/* Dynamic Island */}
            <span
              aria-hidden="true"
              className={cn(
                "absolute top-[0.62em] left-1/2 -translate-x-1/2",
                "flex h-[1.9em] w-[6.4em] items-center justify-end rounded-full",
                "bg-black pr-[0.55em]",
              )}
            >
              <span className="size-[0.62em] rounded-full bg-[#15151d]" />
            </span>

            {/* ---------------------- "In the moment" pill ------------- */}
            <div className="relative mt-[1.6em] flex justify-center">
              <span className="inline-flex items-center gap-[0.5em] rounded-full bg-brand-500/25 px-[1em] py-[0.5em] text-[0.95em] text-brand-100 ring-[0.08em] ring-brand-400/30">
                <span className="size-[0.5em] rounded-full bg-brand-300" />
                {phone.pill}
              </span>
            </div>

            {/* ------------------------ You (voice) ------------------- */}
            <div className="relative mt-[1.3em] px-[1.3em]">
              <span className="block text-right text-[0.9em] text-white/50">
                {phone.you.label}
              </span>
              <div className="mt-[0.4em] flex items-center gap-[0.6em] rounded-[1.1em] rounded-tr-[0.3em] bg-brand-600/40 p-[0.7em] ring-[0.08em] ring-brand-400/25">
                <span className="grid size-[2.1em] shrink-0 place-items-center rounded-full bg-brand-500">
                  <MicIcon className="size-[1em] text-white" />
                </span>
                <span className="flex-1">
                  <span className="flex h-[1.4em] items-center gap-[1.5px]">
                    {YOU_WAVE.map((h, i) => (
                      <span
                        key={i}
                        className="w-[1.5px] rounded-full bg-brand-200"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </span>
                </span>
              </div>
              <p className="mt-[0.5em] text-[1em] leading-[1.35] text-white/90">
                {phone.you.text}
              </p>
              <span className="mt-[0.2em] flex items-center justify-end gap-[0.35em] text-[0.85em] text-white/45">
                {phone.you.time}
                <span className="text-brand-300">✓✓</span>
              </span>
            </div>

            {/* ------------------------ Reply ------------------------- */}
            <div className="relative mt-[1em] px-[1.3em]">
              <div className="rounded-[1.1em] rounded-tl-[0.3em] bg-white/6 p-[0.85em] ring-[0.08em] ring-white/10">
                <span className="flex items-center gap-[0.5em]">
                  <LurnyMark className="size-[1.5em]" />
                  <span className="text-[0.95em] font-semibold text-white">
                    {phone.reply.name}
                  </span>
                </span>
                <p className="mt-[0.6em] text-[0.95em] leading-[1.35] text-white/80">
                  {phone.reply.intro}
                </p>
                <ol className="mt-[0.7em] space-y-[0.55em]">
                  {phone.reply.steps.map((step, i) => (
                    <li key={step} className="flex gap-[0.55em]">
                      <span className="grid size-[1.5em] shrink-0 place-items-center rounded-full bg-brand-500/25 text-[0.8em] font-bold text-brand-100">
                        {i + 1}
                      </span>
                      <span className="text-[0.9em] leading-[1.3] text-white/70">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
              <span className="mt-[0.5em] flex gap-[0.8em] text-[1em] text-white/40">
                <span>👍</span>
                <span>👎</span>
              </span>
            </div>

            {/* --------------------- Tap to speak --------------------- */}
            <div className="relative mt-[1em] flex flex-col items-center px-[1.3em] pb-[1.5em]">
              <span className="flex h-[2.4em] items-center gap-[1.5px]">
                {SPEAK_WAVE.map((h, i) => {
                  const mid = Math.abs(i - SPEAK_WAVE.length / 2) < 3;
                  return (
                    <span
                      key={i}
                      className={cn(
                        "w-[1.5px] rounded-full",
                        mid ? "bg-transparent" : "bg-brand-400/60",
                      )}
                      style={{ height: `${h}%` }}
                    />
                  );
                })}
              </span>
              <span className="-mt-[2em] grid size-[3em] place-items-center rounded-full bg-brand-500 shadow-[0_0_1.4em_0.3em_rgb(127_82_220/0.6)]">
                <MicIcon className="size-[1.3em] text-white" />
              </span>
              <span className="mt-[0.7em] text-[0.9em] text-white/55">
                {phone.speakLabel}
              </span>
            </div>
          </div>
        </div>

        {/* Side buttons on the frame rails. */}
        <span aria-hidden="true">
          <span className="absolute top-[7.5em] -left-[0.14em] h-[2.1em] w-[0.16em] rounded-l-sm bg-[#54545e]" />
          <span className="absolute top-[10.6em] -left-[0.14em] h-[3.4em] w-[0.16em] rounded-l-sm bg-[#54545e]" />
          <span className="absolute top-[15em] -left-[0.14em] h-[3.4em] w-[0.16em] rounded-l-sm bg-[#54545e]" />
          <span className="absolute top-[11.4em] -right-[0.14em] h-[5.4em] w-[0.16em] rounded-r-sm bg-[#54545e]" />
        </span>
      </div>
    </Uncopyable>
  );
}
