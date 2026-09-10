"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import {
  PauseIcon,
  PlayIcon,
  SpeakerIcon,
  TranscriptIcon,
} from "./ArticleIcons";
import { accent, ink } from "./tokens";

/**
 * INSIGHT ARTICLE — AUDIO EDITION
 * ---------------------------------------------------------------------------
 * The dark card under the hero: a play control, a waveform, a scrubber, speed
 * and volume, and a transcript that opens beneath.
 *
 * IT IS A SIMULATION, and deliberately so. The supplied export ships no audio
 * file — its clock is a counter advancing 0.25s every 250ms at the chosen
 * speed, and this rebuild does the same. That keeps the section faithful to
 * the design AND leaves it ready for a real recording: everything a caller
 * would need to swap in an <audio> element is already modelled here — a
 * position in seconds, a duration, a play state, a rate and a volume.
 *
 * WHAT THAT MEANS FOR ACCESSIBILITY. Because there is no sound, the controls
 * are real controls over a real (if synthetic) position rather than props:
 * the scrubber is a slider a keyboard can move, the play button announces
 * which action it will take, and the volume is a range input. A screen-reader
 * user gets a coherent player, not a picture of one. The waveform is the one
 * purely decorative part, so it is hidden.
 *
 * The parent owns `playing` and `position`, because the sticky mini-player at
 * the foot of the page shows the same state — two independent clocks would
 * drift apart within seconds.
 */

/** The bar count in the export's waveform. */
const BAR_COUNT = 56;

/** The speeds the button cycles through, in the export's order. */
const SPEEDS = [1, 1.25, 1.5, 2] as const;

/**
 * The player's colours. Each article tints it to its own accent — the first
 * runs terracotta into lilac, the third plum into a pale mauve — so the three
 * colours that vary are passed in rather than fixed. Everything else about
 * the card is identical between them, which is why this is one component with
 * a tone rather than a component per article.
 *
 * `eyebrow` is the label above the title, `wave` the two colours a played bar
 * alternates between, and `progress` the scrubber's gradient.
 */
export interface AudioTone {
  eyebrow: string;
  wave: readonly [string, string];
  progress: readonly [string, string];
}

/** The first article's tone, and the default when none is given. */
export const defaultAudioTone: AudioTone = {
  eyebrow: accent.amber,
  wave: [accent.terracotta, "#C89AF0"],
  progress: [accent.terracotta, accent.lilac],
};

export function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const rest = Math.floor(seconds % 60);

  return `${String(minutes).padStart(2, "0")}:${String(rest).padStart(2, "0")}`;
}

/**
 * The player's clock, driven by a timer rather than by audio. Lifted into a
 * hook so the article can own the state and pass it to both this card and the
 * mini-player.
 */
export function useSimulatedAudio(duration: number) {
  const [playing, setPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [speed, setSpeed] = useState<number>(SPEEDS[0]);

  // The tick reads `speed` but must not restart when it changes — rebuilding
  // the interval would drop up to 250ms of position each time the button is
  // pressed. Mirroring it into a ref lets the running tick see the new rate
  // without the effect below depending on it.
  const speedRef = useRef(speed);
  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  useEffect(() => {
    if (!playing) return;

    const timer = window.setInterval(() => {
      setPosition((current) => {
        const next = current + 0.25 * speedRef.current;

        if (next >= duration) {
          setPlaying(false);
          return duration;
        }

        return next;
      });
    }, 250);

    return () => window.clearInterval(timer);
  }, [playing, duration]);

  return {
    playing,
    position,
    speed,
    /** 0–100, for the scrubber and the progress fills. */
    percent: duration > 0 ? (position / duration) * 100 : 0,
    toggle: () => setPlaying((value) => !value),
    seek: (seconds: number) =>
      setPosition(Math.min(duration, Math.max(0, seconds))),
    cycleSpeed: () =>
      setSpeed((current) => {
        const index = SPEEDS.indexOf(current as (typeof SPEEDS)[number]);
        return SPEEDS[(index + 1) % SPEEDS.length];
      }),
    /** Restart from the top — used by the "Listen to the insight" button. */
    playFromTop: () => {
      setPosition(0);
      setPlaying(true);
    },
  };
}

export type SimulatedAudio = ReturnType<typeof useSimulatedAudio>;

interface ArticleAudioProps {
  content: {
    eyebrow: string;
    title: string;
    description: string;
    duration: number;
    durationLabel: string;
    transcriptLabel: string;
    footnote: string;
    transcript: readonly { time: string; text: string }[];
  };
  audio: SimulatedAudio;
  /** Defaults to the first article's terracotta-and-lilac. */
  tone?: AudioTone;
}

export function ArticleAudio({
  content,
  audio,
  tone = defaultAudioTone,
}: ArticleAudioProps) {
  const [transcriptOpen, setTranscriptOpen] = useState(false);
  const [volume, setVolume] = useState(70);
  const [muted, setMuted] = useState(false);
  const transcriptId = useId();

  /**
   * The waveform. Heights come from the export's own formula so the silhouette
   * is identical; only the colour depends on playback, so the shape itself is
   * computed once.
   */
  const bars = useMemo(
    () =>
      Array.from({ length: BAR_COUNT }, (_, index) => {
        const wave =
          0.42 +
          0.58 * Math.abs(Math.sin(index * 0.7) * Math.cos(index * 0.21));

        return {
          height: Math.round(10 + wave * 34),
          delay: ((index % 7) * 0.11).toFixed(2),
          /** Every third played bar takes the first tone, the rest the second. */
          played: index % 3 === 0 ? tone.wave[0] : tone.wave[1],
        };
      }),
    [tone],
  );

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[22px]",
        "p-[clamp(1.375rem,3vw,2.125rem)]",
        "shadow-[0_24px_60px_rgba(25,21,34,0.22)]",
      )}
      style={{ background: ink.black }}
    >
      {/* The two faint rings in the corner. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-[70px] -right-[60px] size-[300px] rounded-full border border-[rgba(248,242,232,0.09)]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-5 right-2.5 size-[200px] rounded-full border border-[rgba(228,108,90,0.16)]"
      />

      <div className="relative flex flex-wrap items-center gap-[clamp(1.125rem,3vw,2.25rem)]">
        {/* ------------------------- The billing ------------------------ */}
        <div className="min-w-0 flex-[1_1_16.25rem]">
          <p
            className="text-[0.6875rem] font-bold tracking-[0.16em] uppercase"
            style={{ color: tone.eyebrow }}
          >
            {content.eyebrow}
          </p>
          <p className="mt-3 mb-2 font-reading text-[clamp(1.3125rem,2.4vw,1.6875rem)] leading-[1.24] tracking-[-0.015em] text-[#F8F2E8]">
            {content.title}
          </p>
          <p className="text-[0.84375rem] leading-[1.5] text-[rgba(248,242,232,0.62)]">
            {content.description}
          </p>
        </div>

        {/* ------------------------- The controls ----------------------- */}
        <div className="flex min-w-0 flex-[1_1_23.75rem] items-center gap-[18px]">
          <button
            type="button"
            onClick={audio.toggle}
            aria-label={audio.playing ? "Pause audio" : "Play audio"}
            className={cn(
              "grid size-[68px] shrink-0 place-items-center rounded-full",
              "border border-[rgba(248,242,232,0.22)] bg-[#F8F2E8] text-[#191522]",
              "cursor-pointer transition duration-200 ease-[cubic-bezier(0.2,0,0,1)]",
              "hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(228,108,90,0.36)]",
              "focus-visible:outline-3 focus-visible:outline-offset-[3px]",
              "focus-visible:outline-[rgba(255,195,94,0.6)]",
            )}
          >
            {audio.playing ? (
              <PauseIcon className="size-[22px]" />
            ) : (
              /* Nudged right so the triangle looks centred in the circle. */
              <PlayIcon className="ml-[3px] size-[22px]" />
            )}
          </button>

          <div className="min-w-0 flex-auto">
            {/* The waveform. Decorative — the scrubber below carries the
                same information in a form that can be read and operated. */}
            <div
              aria-hidden="true"
              className="mb-3 flex h-[46px] items-end gap-0.5"
            >
              {bars.map((bar, index) => {
                const done = (index / BAR_COUNT) * 100 <= audio.percent;

                return (
                  <span
                    key={index}
                    className="raw-wave min-w-0 flex-1 origin-bottom rounded-[2px]"
                    style={{
                      height: `${bar.height}px`,
                      background: done ? bar.played : "rgba(248,242,232,0.22)",
                      animation: `raw-wave 1.15s ease-in-out infinite`,
                      animationDelay: `${bar.delay}s`,
                      animationPlayState: audio.playing ? "running" : "paused",
                    }}
                  />
                );
              })}
            </div>

            {/*
              The scrubber. The export draws a div and seeks on click, which a
              keyboard cannot reach; this is a real range input styled to the
              same 4px line, so it is draggable, arrow-key steppable and
              announced with its position.
            */}
            <input
              type="range"
              min={0}
              max={content.duration}
              step={1}
              value={Math.round(audio.position)}
              onChange={(event) => audio.seek(Number(event.target.value))}
              aria-label="Playback progress"
              aria-valuetext={`${formatTime(audio.position)} of ${content.durationLabel}`}
              className={cn(
                "block h-1 w-full cursor-pointer appearance-none rounded-full",
                "bg-[rgba(248,242,232,0.16)]",
                "[&::-webkit-slider-thumb]:size-3",
                "[&::-webkit-slider-thumb]:appearance-none",
                "[&::-webkit-slider-thumb]:rounded-full",
                "[&::-webkit-slider-thumb]:bg-[#F8F2E8]",
                "[&::-moz-range-thumb]:size-3 [&::-moz-range-thumb]:border-0",
                "[&::-moz-range-thumb]:rounded-full",
                "[&::-moz-range-thumb]:bg-[#F8F2E8]",
                "focus-visible:outline-2 focus-visible:outline-offset-4",
                "focus-visible:outline-[#FFC35E]",
              )}
              style={{
                // The played portion, painted behind the thumb.
                backgroundImage: `linear-gradient(90deg, ${tone.progress[0]}, ${tone.progress[1]})`,
                backgroundSize: `${audio.percent}% 100%`,
                backgroundRepeat: "no-repeat",
              }}
            />

            <div className="mt-3 flex items-center justify-between gap-3 font-mono text-[0.71875rem] text-[rgba(248,242,232,0.66)]">
              <span>{formatTime(audio.position)}</span>

              <div className="flex items-center gap-3.5">
                <button
                  type="button"
                  onClick={audio.cycleSpeed}
                  aria-label={`Playback speed, currently ${audio.speed} times`}
                  className={cn(
                    "cursor-pointer rounded-full px-2.5 py-1",
                    "border border-[rgba(248,242,232,0.16)]",
                    "bg-[rgba(248,242,232,0.1)] font-mono text-[0.71875rem]",
                    "text-[#F8F2E8] hover:bg-[rgba(248,242,232,0.2)]",
                    "focus-visible:outline-2 focus-visible:outline-offset-2",
                    "focus-visible:outline-[#FFC35E]",
                  )}
                >
                  {audio.speed}×
                </button>

                <div className="flex items-center gap-[7px]">
                  <button
                    type="button"
                    onClick={() => setMuted((value) => !value)}
                    aria-label={muted ? "Unmute" : "Mute"}
                    aria-pressed={muted}
                    className={cn(
                      "grid cursor-pointer place-items-center",
                      "text-[rgba(248,242,232,0.8)] hover:text-[#FFC35E]",
                      "focus-visible:outline-2 focus-visible:outline-offset-2",
                      "focus-visible:outline-[#FFC35E]",
                    )}
                  >
                    <SpeakerIcon className="size-4" />
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={muted ? 0 : volume}
                    onChange={(event) => {
                      setVolume(Number(event.target.value));
                      setMuted(false);
                    }}
                    aria-label="Volume"
                    className="w-[74px] cursor-pointer accent-[#FFC35E]"
                  />
                </div>

                <span>{content.durationLabel}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------ Transcript row ------------------------ */}
      <div className="relative mt-[22px] flex flex-wrap items-center justify-between gap-4 border-t border-[rgba(248,242,232,0.12)] pt-[18px]">
        <button
          type="button"
          onClick={() => setTranscriptOpen((value) => !value)}
          aria-expanded={transcriptOpen}
          aria-controls={transcriptId}
          className={cn(
            "inline-flex cursor-pointer items-center gap-2",
            "text-[0.78125rem] font-semibold tracking-[0.06em] uppercase",
            "text-[#F8F2E8] hover:text-[#FFC35E]",
            "focus-visible:outline-2 focus-visible:outline-offset-[3px]",
            "focus-visible:outline-[#FFC35E]",
          )}
        >
          <TranscriptIcon className="size-[15px]" />
          {content.transcriptLabel}
        </button>
        <span className="text-[0.71875rem] tracking-[0.12em] text-[rgba(248,242,232,0.45)] uppercase">
          {content.footnote}
        </span>
      </div>

      {transcriptOpen && (
        <div
          id={transcriptId}
          className={cn(
            "relative mt-[18px] rounded-[14px] p-5",
            "border border-[rgba(248,242,232,0.12)] bg-[rgba(248,242,232,0.05)]",
            "font-mono text-[0.78125rem] leading-[1.85]",
            "text-[rgba(248,242,232,0.72)]",
          )}
        >
          {content.transcript.map((line, index) => (
            <p
              key={line.time}
              className={index < content.transcript.length - 1 ? "mb-2.5" : ""}
            >
              {line.time}
              {" — "}
              {line.text}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * THE MINI PLAYER.
 *
 * Appears once the reader is past the hero and stays until dismissed. It
 * shares the article's clock, so its position and play state always match the
 * card's.
 */
export function ArticleMiniPlayer({
  title,
  dismissLabel,
  durationLabel,
  audio,
  onDismiss,
  tone = defaultAudioTone,
}: {
  title: string;
  dismissLabel: string;
  durationLabel: string;
  audio: SimulatedAudio;
  onDismiss: () => void;
  /** Matches the card's, so the two never disagree about the article. */
  tone?: AudioTone;
}) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-70 flex justify-center px-4">
      <div
        className={cn(
          "pointer-events-auto flex w-full max-w-[26rem] items-center gap-3",
          "rounded-full py-2 pr-3 pl-2",
          "shadow-[0_16px_40px_rgba(25,21,34,0.32)]",
        )}
        style={{ background: ink.black }}
      >
        <button
          type="button"
          onClick={audio.toggle}
          aria-label={audio.playing ? "Pause audio" : "Play audio"}
          className={cn(
            "grid size-9 shrink-0 cursor-pointer place-items-center rounded-full",
            "bg-[#F8F2E8] text-[#191522]",
            "focus-visible:outline-2 focus-visible:outline-offset-2",
            "focus-visible:outline-[#FFC35E]",
          )}
        >
          {audio.playing ? (
            <PauseIcon className="size-[15px]" />
          ) : (
            <PlayIcon className="ml-px size-[15px]" />
          )}
        </button>

        <div className="min-w-0 flex-auto">
          <p className="truncate text-[0.78125rem] font-medium text-[#F8F2E8]">
            {title}
          </p>
          <div
            aria-hidden="true"
            className="mt-1.5 h-[3px] rounded-full bg-[rgba(248,242,232,0.16)]"
          >
            <div
              className="h-full rounded-full"
              style={{
                width: `${audio.percent}%`,
                background: `linear-gradient(90deg, ${tone.progress[0]}, ${tone.progress[1]})`,
              }}
            />
          </div>
        </div>

        <span className="shrink-0 font-mono text-[0.6875rem] text-[rgba(248,242,232,0.66)]">
          {formatTime(audio.position)} / {durationLabel}
        </span>

        <button
          type="button"
          onClick={onDismiss}
          aria-label={dismissLabel}
          className={cn(
            "grid size-6 shrink-0 cursor-pointer place-items-center rounded-full",
            "text-[rgba(248,242,232,0.7)] hover:text-[#F8F2E8]",
            "focus-visible:outline-2 focus-visible:outline-offset-2",
            "focus-visible:outline-[#FFC35E]",
          )}
        >
          <CloseGlyph />
        </button>
      </div>
    </div>
  );
}

/** Inlined so the mini-player needs only one import from the icon module. */
function CloseGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
