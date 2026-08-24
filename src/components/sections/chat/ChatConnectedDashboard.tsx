"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { Uncopyable } from "@/components/ui/Uncopyable";
import { chat } from "@/content/chat";
import { cn } from "@/lib/utils";

/**
 * CHAT CONNECTED DASHBOARD
 * ---------------------------------------------------------------------------
 * The drawn simulation-results illustration in the LurnyChat "one conversational
 * layer" section: the results header, a performance dial with six metric rings,
 * the playback + feedback panels, and three product cards below.
 *
 * DRAWN, NOT SHIPPED — sharp at every density, copy lives in content/chat.ts,
 * and it animates in. Wrapped in <Uncopyable> (aria-hidden, unselectable,
 * undraggable) so it behaves like the product screenshot it imitates. Only the
 * two card thumbnails are real images — placeholders standing in for the
 * product's own artwork.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { dashboard } = chat.connected;
const { meta, score, metrics, playback, feedback, cards } = dashboard;

/** One meta-bar entry. `as const` narrows each object to its own literal shape,
 *  so the shared optional fields are declared here for the render. */
interface MetaEntry {
  label: string;
  value: string;
  sub?: string;
  pill?: boolean;
}

/** Ring colours keyed by the metric tone. */
const toneColor = {
  poor: "#f87171",
  fair: "#fbbf24",
  excellent: "#22d3ee",
} as const;

const toneText = {
  poor: "text-[#f87171]",
  fair: "text-[#fbbf24]",
  excellent: "text-[#22d3ee]",
} as const;

/** A small SVG progress ring (0-100) with a centered value. */
function Ring({
  value,
  color,
  size = 34,
  stroke = 4,
}: {
  value: number;
  color: string;
  size?: number;
  stroke?: number;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = (Math.min(100, Math.max(0, value)) / 100) * c;

  return (
    <span
      className="relative inline-grid shrink-0 place-items-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgb(255 255 255 / 0.1)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${c}`}
        />
      </svg>
      <span className="absolute text-[8px] font-bold text-neutral-100 tabular-nums">
        {value}
      </span>
    </span>
  );
}

/** A tiny info glyph, used at the right of each metric card. */
function InfoDot() {
  return (
    <span className="grid size-4 shrink-0 place-items-center rounded-full border border-white/15 text-[8px] text-neutral-500">
      i
    </span>
  );
}

export function ChatConnectedDashboard({ className }: { className?: string }) {
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
      {/* ===================== The results window ===================== */}
      <motion.div
        {...rise(0.1)}
        {...hover}
        className={cn(
          "relative overflow-hidden rounded-2xl p-4 sm:p-5",
          "border border-ink-border/50 bg-[#0c0c12]",
          "shadow-[0_40px_100px_-40px_rgb(0_0_0/0.9)]",
          "transition-[border-color,box-shadow] duration-500 ease-out",
          "hover:border-brand-400/40 hover:shadow-[0_50px_130px_-40px_rgb(88_40_180/0.5)]",
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-[10px] text-neutral-400">
            <span>←</span> {dashboard.back}
          </span>
          <span className="text-brand-300">✦</span>
        </div>

        <h3
          className={cn(
            "mt-2 font-display text-lg font-bold sm:text-xl",
            "bg-gradient-to-r from-brand-300 via-brand-200 to-accent-300 bg-clip-text text-transparent",
          )}
        >
          {dashboard.title}
        </h3>

        {/* Meta bar */}
        <div className="mt-3 rounded-xl border border-white/6 bg-white/[0.02] p-3">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {(meta as readonly MetaEntry[]).map((m) => (
              <div key={m.label}>
                <span className="block text-[8.5px] tracking-wide text-neutral-500 uppercase">
                  {m.label}
                </span>
                {m.pill ? (
                  <span className="bg-success-500/15 text-success-500 mt-1 inline-block rounded px-1.5 py-0.5 text-[9px] font-medium">
                    {m.value}
                  </span>
                ) : (
                  <span className="mt-0.5 block text-[10px] font-semibold text-neutral-100">
                    {m.value}
                  </span>
                )}
                {m.sub && (
                  <span className="block text-[8.5px] text-brand-300">
                    {m.sub}
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-white/5 pt-2.5">
            <span className="text-[9px] text-neutral-400">
              Messages:{" "}
              <span className="font-semibold text-neutral-100">
                {dashboard.messages}
              </span>
            </span>
            <span className="flex gap-1.5">
              <span className="bg-success-500/20 text-success-500 rounded px-2 py-1 text-[8.5px] font-medium">
                {dashboard.actions[0]}
              </span>
              <span className="rounded bg-brand-500 px-2 py-1 text-[8.5px] font-medium text-white">
                {dashboard.actions[1]}
              </span>
            </span>
          </div>
        </div>

        {/* Score + metrics */}
        <div className="mt-3 grid gap-3 lg:grid-cols-[9rem_1fr]">
          {/* Big performance dial */}
          <div className="grid place-items-center rounded-xl border border-white/6 bg-white/[0.02] p-3">
            <span className="text-[8px] tracking-[0.12em] text-neutral-500 uppercase">
              Overall Performance
            </span>
            <div className="relative my-2 grid place-items-center">
              <Ring
                value={Number(score.value)}
                color="#f87171"
                size={92}
                stroke={8}
              />
              <span className="absolute grid place-items-center text-center">
                <span className="text-[10px] text-[#f87171]">⚠</span>
                <span className="text-2xl font-bold text-neutral-100 tabular-nums">
                  {score.value}
                </span>
                <span className="text-[8px] font-bold text-[#f87171]">
                  {score.label}
                </span>
              </span>
            </div>
            <span className="rounded bg-accent-300/12 px-2 py-0.5 text-[9px] font-medium text-accent-200">
              ✦ {score.xp}
            </span>
          </div>

          {/* Six metric cards */}
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {metrics.map((m) => (
              <div
                key={m.name}
                className="flex items-center gap-2.5 rounded-lg border border-white/6 bg-white/[0.02] px-2.5 py-2"
              >
                <Ring value={m.value} color={toneColor[m.tone]} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[10px] font-medium text-neutral-100">
                    {m.name}
                  </span>
                  <span
                    className={cn(
                      "flex items-center gap-1 text-[8px] font-semibold",
                      toneText[m.tone],
                    )}
                  >
                    <span className="size-1 rounded-full bg-current" />{" "}
                    {m.rating}
                  </span>
                </span>
                <InfoDot />
              </div>
            ))}
          </div>
        </div>

        {/* Playback + Feedback */}
        <div className="mt-3 grid gap-3 lg:grid-cols-2">
          {/* Conversation playback */}
          <div className="rounded-xl border border-white/6 bg-white/[0.02] p-3">
            <span className="flex items-center gap-1.5 text-[11px] font-semibold text-neutral-100">
              <span className="text-brand-300">💬</span> {playback.title}
            </span>

            <div className="mt-3 flex items-start justify-end gap-1.5">
              <span className="rounded-lg rounded-tr-sm bg-brand-500/80 px-2.5 py-1.5 text-[9px] text-white">
                {playback.userMessage}
              </span>
              <span className="size-5 shrink-0 rounded-full bg-brand-500" />
            </div>

            <div className="mt-2 flex items-start gap-2">
              <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-white/8 text-[10px] text-neutral-300">
                ▶
              </span>
              <span className="rounded-lg border border-white/8 bg-white/[0.03] p-2">
                <span className="block text-[8.5px] font-semibold text-neutral-300">
                  {playback.reply.name}
                </span>
                <span className="mt-0.5 block text-[9px] leading-relaxed text-neutral-400">
                  {playback.reply.text}
                </span>
                <span className="mt-1 block text-right text-[7.5px] text-neutral-600">
                  {playback.reply.time}
                </span>
              </span>
            </div>
          </div>

          {/* Detailed feedback */}
          <div className="rounded-xl border border-white/6 bg-white/[0.02] p-3">
            <span className="flex items-center gap-1.5 text-[11px] font-semibold text-neutral-100">
              <span className="text-success-500">✓</span> {feedback.title}
            </span>

            <div className="border-success-500/20 bg-success-500/[0.06] mt-3 rounded-lg border p-2.5">
              <span className="text-success-500 flex items-center gap-1.5 text-[9.5px] font-semibold">
                ✓ {feedback.strengths.title}
              </span>
              <ul className="mt-1.5 space-y-1">
                {feedback.strengths.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-1.5 text-[8.5px] text-neutral-300"
                  >
                    <span className="text-success-500">•</span> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-2 rounded-lg border border-[#f87171]/20 bg-[#f87171]/[0.06] p-2.5">
              <span className="flex items-center gap-1.5 text-[9.5px] font-semibold text-[#f87171]">
                ⚠ {feedback.improve.title}
              </span>
              <ul className="mt-1.5 space-y-1">
                {feedback.improve.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-1.5 text-[8.5px] text-neutral-300"
                  >
                    <span className="text-[#f87171]">•</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ========================= Feature cards ====================== */}
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {/* LurnyTalk — waveform + language pills */}
        <motion.div {...rise(0.3)} {...hover} className={featureCard}>
          <span className="flex items-center gap-2">
            <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-brand-400 to-brand-600">
              {/* audio-bars glyph, matching the design's icon */}
              <svg viewBox="0 0 20 20" className="size-3.5" aria-hidden="true">
                {[
                  [4, 8],
                  [7.5, 4],
                  [11, 6.5],
                  [14.5, 9],
                ].map(([x, h]) => (
                  <rect
                    key={x}
                    x={x - 0.7}
                    y={10 - h / 2}
                    width="1.4"
                    height={h}
                    rx="0.7"
                    fill="white"
                  />
                ))}
              </svg>
            </span>
            <span>
              <span className="block text-[11px] font-semibold text-neutral-100">
                {cards.talk.title}
              </span>
            </span>
          </span>
          <span className="mt-1 block text-[8.5px] leading-tight text-neutral-500">
            {cards.talk.subtitle}
          </span>
          {/* Drawn voice-memo waveform: dense, varied bars, with the left
              (played) portion bright and the right (unplayed) portion dimmer —
              the two-tone look of a real voice memo mid-playback. */}
          <span className="mt-2.5 flex h-7 items-center gap-[1.5px]">
            {WAVE.map((h, i) => {
              const played = i / WAVE.length < WAVE_PROGRESS;
              return (
                <span
                  key={i}
                  className={cn(
                    "w-[2px] rounded-full",
                    played ? "bg-brand-200" : "bg-brand-500/45",
                  )}
                  style={{ height: `${h}%` }}
                />
              );
            })}
          </span>
          <span className="mt-2 flex flex-wrap gap-1.5">
            {cards.talk.languages.map((lang, i) => (
              <span
                key={lang}
                className={cn(
                  "rounded px-2 py-0.5 text-[8px]",
                  i === 0
                    ? "bg-brand-500/80 text-white"
                    : "bg-white/6 text-neutral-300",
                )}
              >
                {lang}
              </span>
            ))}
          </span>
        </motion.div>

        {/* Sahiyog — image */}
        <motion.div
          {...rise(0.4)}
          {...hover}
          className={cn(featureCard, "overflow-hidden !p-0")}
        >
          <FeatureImageCard card={cards.sahiyog} icon="👥" />
        </motion.div>

        {/* LurnyMinds — image */}
        <motion.div
          {...rise(0.5)}
          {...hover}
          className={cn(featureCard, "overflow-hidden !p-0")}
        >
          <FeatureImageCard card={cards.minds} icon="🧠" />
        </motion.div>
      </div>
    </Uncopyable>
  );
}

/** Shared shell for the three feature cards. */
const featureCard = cn(
  "rounded-xl border border-ink-border/50 bg-[#101018] p-3",
  "shadow-[0_24px_60px_-30px_rgb(0_0_0/0.9)]",
  "transition-[border-color,box-shadow] duration-400 ease-out",
  "hover:border-brand-400/50 hover:shadow-[0_36px_80px_-28px_rgb(88_40_180/0.6)]",
);

/** Dense voice-memo waveform bar heights (percent) — a fixed, organic-looking
 *  pattern (52 bars) so it reads like a real recording rather than a chart. */
const WAVE = [
  22, 38, 30, 52, 44, 68, 40, 58, 82, 48, 34, 60, 94, 56, 40, 72, 50, 30, 46,
  66, 88, 54, 36, 62, 78, 44, 28, 50, 70, 96, 58, 38, 52, 64, 42, 30, 56, 74,
  46, 34, 60, 84, 50, 38, 66, 42, 28, 54, 72, 44, 32, 48,
] as const;

/** Fraction of the waveform shown as "played" (bright). */
const WAVE_PROGRESS = 0.42;

/** An image-backed feature card (Sahiyog, LurnyMinds). */
function FeatureImageCard({
  card,
  icon,
}: {
  card: { title: string; subtitle: string; badge: string; image: string };
  icon: string;
}) {
  return (
    <div className="relative flex h-full">
      <div className="flex-1 p-3">
        <span className="flex items-center gap-2">
          <span className="grid size-7 place-items-center rounded-lg bg-brand-500/20 text-[13px]">
            {icon}
          </span>
          <span className="text-[11px] font-semibold text-neutral-100">
            {card.title}
          </span>
        </span>
        <span className="mt-1 block text-[8.5px] leading-tight text-neutral-500">
          {card.subtitle}
        </span>
      </div>
      <div className="relative w-[42%] shrink-0">
        <Image
          src={card.image}
          alt=""
          fill
          sizes="140px"
          className="object-cover"
        />
        {/* The design sets this badge on a translucent green chip, top-left. */}
        <span className="absolute top-1.5 left-1.5 rounded-md border border-[#34d399]/40 bg-[#0f5132]/70 px-1.5 py-0.5 text-[6.5px] font-bold tracking-wide text-[#6ee7b7] backdrop-blur-sm">
          {card.badge}
        </span>
      </div>
    </div>
  );
}
