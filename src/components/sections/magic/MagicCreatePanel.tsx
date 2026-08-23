"use client";

import { Uncopyable } from "@/components/ui/Uncopyable";
import { magic } from "@/content/magic";
import { cn } from "@/lib/utils";

/**
 * MAGIC CREATE PANEL
 * ---------------------------------------------------------------------------
 * The violet card at the centre of the LurnyMagic hero: paste a URL, get a
 * microlesson.
 *
 * INERT ON PURPOSE
 * The input and the CREATE button are DRAWINGS of controls — a span and a
 * div, not an <input> and a <button>. Making them real would put them in the
 * tab order and promise a conversion this page cannot perform: there is no
 * endpoint behind them. A focusable text box that silently discards what you
 * type is worse than a picture of one.
 *
 * The whole panel is wrapped in <Uncopyable> and aria-hidden for the same
 * reason as the output cards beside it — it illustrates the product rather
 * than being it. The real call to action is the "Book a demo" button in the
 * hero copy.
 *
 * TODO(product): if this ever becomes a live entry point, the input and button
 * must become real controls with a label, a submit handler and an error path —
 * not these spans with handlers bolted on.
 */

const { panel } = magic.hero;

export function MagicCreatePanel({ className }: { className?: string }) {
  return (
    <Uncopyable
      className={cn(
        "rounded-2xl p-6 sm:p-8",
        // The design's violet card: a soft gradient rather than a flat fill,
        // lighter at the top left where the section's glow falls.
        "bg-[linear-gradient(150deg,#4a2d74_0%,#3a2359_55%,#2e1b48_100%)]",
        "ring-1 ring-brand-300/25",
        "shadow-[0_40px_90px_-30px_rgb(10_4_30/0.85)]",
        className,
      )}
    >
      <p
        className={cn(
          "font-display text-xl font-bold tracking-[-0.01em] uppercase",
          "leading-tight text-white sm:text-2xl",
        )}
      >
        {panel.title.lead}{" "}
        {/* The source type is set in amber, as the design does. */}
        <span className="text-accent-300">{panel.title.source}</span>
      </p>

      <p className="mt-4 max-w-88 text-[0.875rem] leading-relaxed text-neutral-300">
        {panel.description}
      </p>

      {/* ------------------------- Fake controls -------------------- */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        {/* A drawing of a text input. See the note above. */}
        <span
          className={cn(
            "flex flex-1 items-center gap-2.5 rounded-lg bg-white px-4 py-3.5",
            // `truncate` rather than wrapping: a real input would clip its
            // placeholder on one line, and a two-line placeholder reads as a
            // layout fault.
            "truncate text-[0.9375rem] whitespace-nowrap text-neutral-400",
          )}
        >
          <svg
            viewBox="0 0 16 16"
            className="size-4 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          >
            <path d="M6.6 9.4a2.6 2.6 0 0 0 3.9.3l2-2a2.6 2.6 0 0 0-3.7-3.7l-1.1 1.1" />
            <path d="M9.4 6.6a2.6 2.6 0 0 0-3.9-.3l-2 2a2.6 2.6 0 0 0 3.7 3.7l1.1-1.1" />
          </svg>
          {panel.placeholder}
        </span>

        {/* A drawing of a button. */}
        <span
          className={cn(
            "inline-flex items-center justify-center gap-2 rounded-lg",
            "bg-accent-300 px-6 py-3.5",
            "text-[0.9375rem] font-bold tracking-[0.02em] text-neutral-900 uppercase",
          )}
        >
          {panel.action}
          <svg
            viewBox="0 0 16 16"
            className="size-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2.5 8h11m0 0-4-4m4 4-4 4" />
          </svg>
        </span>
      </div>
    </Uncopyable>
  );
}
