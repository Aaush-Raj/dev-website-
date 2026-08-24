"use client";

import { motion, useReducedMotion } from "motion/react";

import { Uncopyable } from "@/components/ui/Uncopyable";
import { saathi } from "@/content/saathi";
import { cn } from "@/lib/utils";

import {
  cardIcons,
  ChevronIcon,
  LurnyMark,
  MicIcon,
  StatusIcons,
} from "./SaathiIcons";

/**
 * SAATHI PHONE
 * ---------------------------------------------------------------------------
 * The handset in the LurnySaathi hero: a titanium frame with a Dynamic Island,
 * holding the Saathi home screen.
 *
 * DRAWN, NOT SHIPPED
 * The design supplies this inside a large flattened PNG. It is rebuilt in
 * markup so it stays sharp at every density, animates in, and reads its copy
 * from content/saathi.ts.
 *
 * It is wrapped in <Uncopyable>, so it behaves like the screenshot it imitates
 * — the text cannot be selected, dragged out or right-click-saved, and it is
 * aria-hidden. See components/ui/Uncopyable.tsx: this is presentation, not
 * protection.
 *
 * SIZING
 * Everything inside is expressed in `em`, and the root sets a font-size that
 * scales with the viewport. That way the whole screen — type, padding, radii,
 * icon sizes — scales as one unit, instead of drifting apart at breakpoints
 * the design was never measured at.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { phone } = saathi.hero;

export function SaathiPhone({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <Uncopyable className={cn("relative", className)}>
      {/* ======================= The titanium frame ====================== */}
      <div
        className={cn(
          "relative rounded-[2.4em] p-[0.34em]",
          // The frame: a vertical metal gradient, brightest at the edges,
          // which is what reads as a machined rail rather than a flat border.
          "bg-linear-160 from-[#6f6f79] via-[#20202a] to-[#5d5d68]",
          "shadow-[0_50px_110px_-30px_rgb(0_0_0/0.85)]",
          // The design puts the handset at ~224px on a 1440 frame. The width
          // is set here rather than left to the parent so the `em` scale below
          // and the frame's own size can never drift apart.
          "mx-auto w-62 lg:w-56 xl:w-62",
          // Scales the entire mockup as one unit — see the note above.
          "text-[0.58rem] lg:text-[0.53rem] xl:text-[0.58rem]",
        )}
      >
        {/* Inner bezel, between the metal rail and the glass. */}
        <div
          className={cn(
            "relative overflow-hidden rounded-[2.1em] bg-black",
            "p-[0.22em]",
          )}
        >
          {/* ========================= The screen ======================== */}
          <div
            className={cn(
              "relative overflow-hidden rounded-[1.95em]",
              // The screen's own ground: a deep indigo that lifts toward the
              // top-left, matching the design's lit-from-the-corner look.
              "bg-[#150e3d]",
              // Shorter than a real 393/852 handset on purpose: the design
              // crops the phone at the section's lower edge, so the visible
              // screen is the top two-thirds. Sizing it to the content that
              // actually shows avoids a band of empty screen under the cards.
              "aspect-393/720",
            )}
          >
            {/* Screen lighting — a violet bloom top-left, falling to near-black
                at the bottom edge. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background: [
                  "radial-gradient(120% 70% at 12% 0%, rgb(88 52 190 / 0.55), transparent 62%)",
                  "linear-gradient(180deg, transparent 40%, rgb(9 6 32 / 0.85) 100%)",
                ].join(","),
              }}
            />

            {/* --------------------- Status bar ----------------------- */}
            <div
              className={cn(
                "relative flex items-center justify-between",
                "px-[1.7em] pt-[0.9em]",
              )}
            >
              <span className="text-[1.05em] font-semibold text-white">
                {phone.statusTime}
              </span>
              <StatusIcons className="h-[0.85em] w-[3.1em] text-white" />
            </div>

            {/* The Dynamic Island, overlapping the status row. */}
            <span
              aria-hidden="true"
              className={cn(
                "absolute top-[0.62em] left-1/2 -translate-x-1/2",
                "flex h-[1.9em] w-[6.4em] items-center justify-end rounded-full",
                "bg-black pr-[0.55em]",
              )}
            >
              {/* The camera lens. */}
              <span className="size-[0.62em] rounded-full bg-[#15151d]" />
            </span>

            {/* ------------------------ Header ------------------------ */}
            <div className="relative flex items-center justify-between px-[1.7em] pt-[2.1em]">
              <LurnyMark className="size-[2.3em]" />

              {/* The account avatar. A drawn stand-in, not a photo — shipping
                  a face here would mean another asset for a 22px circle. */}
              <span
                className={cn(
                  "grid size-[2.3em] place-items-center overflow-hidden rounded-full",
                  "bg-linear-to-b from-[#f0d7c4] to-[#c99878]",
                  "ring-[0.12em] ring-white/85",
                )}
              >
                <span className="mt-[0.7em] size-[1.5em] rounded-t-full bg-[#3b2a3f]" />
              </span>
            </div>

            {/* ----------------------- Greeting ----------------------- */}
            <p
              className={cn(
                "relative mt-[1.5em] px-[1.7em]",
                "text-[1.85em] leading-[1.22] font-bold tracking-[-0.02em] text-white",
              )}
            >
              {phone.greeting.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>

            {/* ----------------------- Composer ----------------------- */}
            <div
              className={cn(
                "relative mx-[1.7em] mt-[1.4em] flex items-center justify-between",
                "rounded-[1.15em] border border-white/12 bg-white/8",
                "px-[1.15em] py-[0.95em] backdrop-blur-sm",
              )}
            >
              <span className="text-[1.05em] text-white/62">
                {phone.composer}
              </span>
              <MicIcon className="size-[1.15em] text-white/80" />
            </div>

            {/* ---------------------- Card list ----------------------- */}
            <p className="relative mt-[1.6em] px-[1.7em] text-[0.95em] text-white/55">
              {phone.listLabel}
            </p>

            <div className="relative mt-[0.75em] space-y-[0.8em] px-[1.7em]">
              {phone.cards.map((card) => {
                const Icon = cardIcons[card.icon];
                // The design fills the middle card and outlines the others —
                // it is the one in progress, so it carries the emphasis.
                const active = "progress" in card;

                return (
                  <div
                    key={card.title}
                    className={cn(
                      "flex items-start gap-[0.85em] rounded-[1.1em] p-[0.95em]",
                      "border",
                      active
                        ? "border-brand-400/45 bg-[#3a2497]/72"
                        : "border-white/10 bg-white/5",
                    )}
                  >
                    <span
                      className={cn(
                        "grid size-[2.5em] shrink-0 place-items-center rounded-[0.65em]",
                        active
                          ? "bg-white/14 text-[#d9c6ff]"
                          : "bg-white/8 text-[#8fd3e8]",
                      )}
                    >
                      <Icon className="size-[1.45em]" />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block text-[1.05em] leading-[1.3] font-semibold text-white">
                        {card.title}
                      </span>
                      {card.lines.map((line) => (
                        <span
                          key={line}
                          className="block text-[0.95em] leading-[1.35] text-white/62"
                        >
                          {line}
                        </span>
                      ))}

                      {/* The progress readout, on the active card only. */}
                      {"progress" in card && card.progress ? (
                        <>
                          <span className="mt-[0.55em] block text-[0.9em] text-white/75">
                            {card.progress.label}
                          </span>
                          <span className="mt-[0.4em] block h-[0.22em] w-full overflow-hidden rounded-full bg-white/18">
                            <span
                              className="block h-full rounded-full bg-[#f2544f]"
                              style={{ width: `${card.progress.percent}%` }}
                            />
                          </span>
                        </>
                      ) : null}
                    </span>

                    <ChevronIcon
                      className={cn(
                        "mt-[0.55em] size-[1.15em] shrink-0",
                        active ? "text-white/85" : "text-white/45",
                      )}
                    />
                  </div>
                );
              })}
            </div>

            {/* A soft fade at the bottom of the screen — the list continues
                past the frame, as in the design. */}
            <span
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute inset-x-0 bottom-0 h-[5em]",
                "bg-linear-to-t from-[#0b0726] to-transparent",
              )}
            />
          </div>
        </div>

        {/* The side buttons, drawn on the frame's left and right rails. */}
        <span aria-hidden="true">
          <span className="absolute top-[7.5em] -left-[0.14em] h-[2.1em] w-[0.16em] rounded-l-sm bg-[#54545e]" />
          <span className="absolute top-[10.6em] -left-[0.14em] h-[3.4em] w-[0.16em] rounded-l-sm bg-[#54545e]" />
          <span className="absolute top-[15em] -left-[0.14em] h-[3.4em] w-[0.16em] rounded-l-sm bg-[#54545e]" />
          <span className="absolute top-[11.4em] -right-[0.14em] h-[5.4em] w-[0.16em] rounded-r-sm bg-[#54545e]" />
        </span>
      </div>

      {/* ==================== Where the threads land ==================== */}
      {/*
        The capability threads run into the phone's left edge. Deliberately NOT
        a dot or bead: a circle here reads as a separate object floating beside
        the handset, when what the threads should look like is light arriving AT
        the frame. So this is a soft vertical bloom hugging the border — it
        gives the arrival point luminance without drawing a shape of its own.

        It sits ON the phone rather than in the thread SVG so it stays pinned to
        the frame at any size.

        Below lg the threads are not drawn (see SaathiCapabilities), so this
        would be a light with nothing feeding it — hence lg-only.
      */}
      <motion.span
        aria-hidden="true"
        initial={reduce ? { opacity: 1 } : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: "some" }}
        transition={{ duration: 0.7, delay: 0.75, ease: easeOut }}
        className={cn(
          "pointer-events-none absolute top-1/2 left-0 hidden -translate-y-1/2",
          // Tall and narrow, sitting on the border itself.
          "h-[11em] w-[0.7em] -translate-x-1/2 lg:block",
          "rounded-full blur-[0.4em]",
        )}
        style={{
          // Brightest at the centre, where most threads converge, fading out
          // along the frame rather than ending in a hard cap.
          background:
            "linear-gradient(180deg, transparent, rgb(216 180 254 / 0.75) 32%, rgb(255 255 255 / 0.95) 50%, rgb(216 180 254 / 0.75) 68%, transparent)",
        }}
      />
    </Uncopyable>
  );
}
