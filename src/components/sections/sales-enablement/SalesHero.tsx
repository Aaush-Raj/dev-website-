"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { salesEnablement } from "@/content/sales-enablement";
import { cn } from "@/lib/utils";

/**
 * SALES ENABLEMENT HERO
 * ---------------------------------------------------------------------------
 * Section 1: the statement on the left, the conversation photo on the right
 * with the four engine cards floating around its corners.
 *
 * WHY THE CARDS ARE MARKUP
 * The pack ships them as PNG crops WITH transparent corners, so unlike the
 * LurnyKxP panels they could have been layered without seaming. They are still
 * rebuilt here, for a different reason: each is 252x196 or smaller with its
 * copy baked in as pixels, which at hero size is visibly soft and cannot be
 * selected, translated or read aloud. The pack's README asks for headline and
 * CTA copy in HTML; a card whose entire content is text falls under the same
 * argument.
 *
 * Only the photograph, the backdrop and the video still inside the Magic card
 * ship as rasters — see scripts/build-sales-enablement-hero.cjs.
 *
 * THE FOUR CARDS ARE FOUR SHAPES, NOT ONE
 * Magic is a video still beside skeleton lines; Chat is a two-turn exchange;
 * Pitch is a waveform over a chip; Biz is an action row over a link. Forcing
 * one component to express all four would take more props than it saved, so
 * each is its own small component and `CARD_SLOTS` only places them.
 *
 * THE COMPOSITION SCALES AS ONE OBJECT
 * The cards are positioned in percentages of the photo box and sized in `em`
 * off a `cqw` root, so they hold their designed proportions at every width
 * instead of swamping the photo as it narrows. Below lg they are hidden and
 * the four engines are named in a list instead — at phone width they would
 * overlap the faces and each other.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { hero } = salesEnablement;

/**
 * Where each card sits relative to the photo box, as percentages of it.
 * Measured from the design.
 */
const CARD_SLOTS = {
  magic: "left-[-4%] top-[-4%] w-[29%]",
  chat: "right-[-6%] top-[-5%] w-[31%]",
  pitch: "left-[1%] bottom-[-4%] w-[30%]",
  biz: "right-[-6%] bottom-[-5%] w-[30%]",
} as const;

/** Accent per engine, sampled from the design. */
const ENGINE_TONES = {
  Magic: { chip: "bg-[#7c3aed]", text: "text-[#6d28d9]" },
  Chat: { chip: "bg-[#2f8fe8]", text: "text-[#1d6fc0]" },
  Pitch: { chip: "bg-[#14b8a6]", text: "text-[#0d9488]" },
  Biz: { chip: "bg-[#f0a500]", text: "text-[#b57400]" },
} as const;

export function SalesHero() {
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

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-[#f9f9fd]",
        // Extra top padding: this is the first section under the floating nav
        // pill, so it needs clearance the mid-page sections do not.
        "pt-28 pb-section-lg sm:pt-32 lg:pt-36",
      )}
    >
      {/* The faint arcs behind the composition. */}
      <Image
        src={hero.backdrop.src}
        alt={hero.backdrop.alt}
        width={hero.backdrop.width}
        height={hero.backdrop.height}
        aria-hidden="true"
        sizes="100vw"
        className="pointer-events-none absolute inset-0 -z-10 size-full object-cover"
      />

      <Container width="hero" className="relative">
        <div
          className={cn(
            "grid items-center gap-14",
            // Measured from the design: the statement runs to roughly 40% of
            // the frame, the composition takes the rest.
            "lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:gap-12",
            "xl:gap-16",
          )}
        >
          {/* =========================== Statement ==================== */}
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "text-[0.6875rem] font-bold uppercase",
                "tracking-[0.14em] text-[#8a02ff] sm:text-xs",
              )}
            >
              {hero.eyebrow}
            </motion.p>

            <motion.h1
              {...rise(0.08)}
              className={cn(
                "mt-6 font-display font-bold tracking-[-0.035em]",
                "leading-[1.06] text-[#13101e]",
                "text-[2.25rem] sm:text-[2.875rem] xl:text-[3.5rem]",
              )}
            >
              {hero.headline.lead.map((line) => (
                <span key={line} className="inline lg:block">
                  {line}{" "}
                </span>
              ))}

              {/* The design switches to violet for the closing two lines. */}
              {hero.headline.accent.map((line) => (
                <span key={line} className="inline text-[#8a02ff] lg:block">
                  {line}{" "}
                </span>
              ))}
            </motion.h1>

            <motion.p
              {...rise(0.16)}
              className={cn(
                "mt-7 max-w-[30rem] leading-relaxed text-pretty",
                "text-[1rem] text-[#655f81] sm:text-[1.0625rem]",
              )}
            >
              {hero.description}
            </motion.p>

            {/* --------------------------- Actions -------------------- */}
            <motion.div
              {...rise(0.24)}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <Link
                href={hero.actions.primary.href}
                className={cn(
                  "group/cta inline-flex h-13 items-center justify-center gap-3 rounded-xl px-7",
                  "bg-[#8a02ff] text-[0.9375rem] font-semibold text-white",
                  // `translate`, not `transform`: Tailwind v4 compiles the
                  // translate utilities to the standalone property.
                  "duration-normal transition-[background-color,box-shadow,translate] ease-out",
                  "will-change-[translate]",
                  "hover:-translate-y-0.5 hover:bg-[#7a00e6]",
                  "hover:shadow-[0_16px_36px_-12px_rgb(138_2_255/0.5)]",
                  "active:translate-y-0",
                )}
              >
                {hero.actions.primary.label}
                <ArrowIcon
                  className={cn(
                    "size-4",
                    "duration-normal transition-[translate] ease-out",
                    "group-hover/cta:translate-x-1",
                  )}
                />
              </Link>

              <Link
                href={hero.actions.secondary.href}
                className={cn(
                  "inline-flex h-13 items-center justify-center rounded-xl px-7",
                  "ring-1 ring-[#8a02ff]/35",
                  "text-[0.9375rem] font-semibold text-[#17102a]",
                  "duration-normal transition-[background-color,box-shadow,translate] ease-out",
                  "will-change-[translate]",
                  "hover:-translate-y-0.5 hover:bg-[#8a02ff]/6",
                  "hover:ring-[#8a02ff]/60",
                  "active:translate-y-0",
                )}
              >
                {hero.actions.secondary.label}
              </Link>
            </motion.div>

            <motion.p
              {...rise(0.32)}
              className="mt-7 text-[0.8125rem] text-[#726d8c] sm:text-sm"
            >
              {hero.poweredBy}
            </motion.p>
          </div>

          {/* ========================= Composition ==================== */}
          <motion.div
            initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: "some" }}
            transition={{ duration: 0.85, delay: 0.2, ease: easeOut }}
            className="@container relative"
          >
            {/* The photo. The cards hang off its corners, so it is the
                positioning context for all four. */}
            {/* The supplied plate is 2:1; the design crops it to roughly 1.24
                so the two faces fill the frame. Cropping here rather than in
                the build script keeps the full plate available if a later
                section wants a wider view of the same photograph. */}
            <div className="relative aspect-[1.36] lg:aspect-[1.24]">
              <Image
                src={hero.photo.src}
                alt={hero.photo.alt}
                width={hero.photo.width}
                height={hero.photo.height}
                // Above the fold and the visual subject, so it must not
                // lazy-load — this is the LCP candidate on the page.
                priority
                sizes="(min-width: 1024px) 56vw, 100vw"
                className="size-full rounded-2xl object-cover object-[58%_center]"
              />

              {/* ------------------------ Cards ------------------- */}
              {/* Hidden below lg, where they would overlap the faces and each
                  other. Nothing is lost: the "Powered by Magic, Pitch, Biz and
                  Chat" line under the buttons names the same four engines. */}
              <div
                className="pointer-events-none absolute inset-0 hidden lg:block"
                // Scales the cards with the composition, so they hold their
                // designed proportion at every width.
                style={{ fontSize: "max(9px, 1.95cqw)" }}
              >
                <CardShell slot={CARD_SLOTS.magic} engine={hero.cards.magic.engine}>
                  <MagicCard />
                </CardShell>

                <CardShell slot={CARD_SLOTS.chat} engine={hero.cards.chat.engine}>
                  <ChatCard />
                </CardShell>

                <CardShell slot={CARD_SLOTS.pitch} engine={hero.cards.pitch.engine}>
                  <PitchCard />
                </CardShell>

                <CardShell slot={CARD_SLOTS.biz} engine={hero.cards.biz.engine}>
                  <BizCard />
                </CardShell>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

/* ========================================================================== */
/*  Card chrome                                                               */
/* ========================================================================== */

/**
 * The white card, its engine header and its placement. Only the body differs
 * between the four, so only the body is passed in — see the note at the top.
 */
function CardShell({
  slot,
  engine,
  children,
}: {
  slot: string;
  engine: keyof typeof ENGINE_TONES;
  children: React.ReactNode;
}) {
  const tone = ENGINE_TONES[engine];

  return (
    <div
      className={cn(
        "absolute rounded-[1.1em] bg-white p-[1em]",
        "shadow-[0_18px_40px_-16px_rgb(30_15_60/0.28)]",
        "ring-1 ring-[#e8e4f2]",
        slot,
      )}
    >
      <p className="flex items-center gap-[0.6em]">
        <span
          className={cn(
            "flex size-[2em] shrink-0 items-center justify-center rounded-[0.6em]",
            tone.chip,
          )}
        >
          <EngineIcon engine={engine} className="size-[1.1em] text-white" />
        </span>
        <span className={cn("text-[1.05em] font-bold", tone.text)}>
          {engine}
        </span>
      </p>

      {children}
    </div>
  );
}

/** The card title, shared by all four bodies. */
function CardTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-[0.8em] text-[1.05em] font-bold tracking-[-0.01em] text-[#141024]">
      {children}
    </p>
  );
}

/* ========================================================================== */
/*  The four card bodies                                                      */
/* ========================================================================== */

/** Magic — a video still beside skeleton lines. */
function MagicCard() {
  const { magic } = hero.cards;

  return (
    <>
      <CardTitle>{magic.title}</CardTitle>

      <div className="mt-[0.7em] flex items-start gap-[0.7em]">
        <span className="relative block w-[5.5em] shrink-0">
          <Image
            src={magic.still.src}
            alt={magic.still.alt}
            width={magic.still.width}
            height={magic.still.height}
            sizes="160px"
            className="h-[3.9em] w-full rounded-[0.5em] object-cover"
          />

          {/* The play mark over the still. */}
          <span
            className={cn(
              "absolute inset-0 flex items-center justify-center",
            )}
          >
            <span className="flex size-[1.6em] items-center justify-center rounded-full bg-[#7c3aed]">
              <PlayIcon className="size-[0.8em] text-white" />
            </span>
          </span>
        </span>

        {/* Skeleton lines, as the design draws them — a stand-in for the
            briefing's body rather than real copy. */}
        <span aria-hidden="true" className="mt-[0.2em] flex-1 space-y-[0.4em]">
          <span className="block h-[0.45em] w-full rounded-full bg-[#e9e6f2]" />
          <span className="block h-[0.45em] w-[88%] rounded-full bg-[#e9e6f2]" />
          <span className="block h-[0.45em] w-[94%] rounded-full bg-[#e9e6f2]" />
        </span>
      </div>

      <p className="mt-[0.6em] text-right text-[0.82em] text-[#6f6a88]">
        {magic.meta}
      </p>
    </>
  );
}

/** Chat — a two-turn exchange, seller then assistant. */
function ChatCard() {
  const { chat } = hero.cards;

  return (
    <>
      <CardTitle>{chat.title}</CardTitle>

      <p
        className={cn(
          "mt-[0.8em] ml-auto w-fit rounded-[0.8em] bg-[#eef1fb] px-[0.8em] py-[0.5em]",
          "text-[0.85em] text-[#2c2a3d]",
        )}
      >
        {chat.question}
      </p>

      <div className="mt-[0.6em] flex items-start gap-[0.5em]">
        <span className="flex size-[1.8em] shrink-0 items-center justify-center rounded-full bg-[#ded7fb]">
          <PersonIcon className="size-[1em] text-[#5b34d4]" />
        </span>
        <p
          className={cn(
            "rounded-[0.8em] bg-[#ece6fd] px-[0.8em] py-[0.5em]",
            "text-[0.85em] text-[#2c2a3d]",
          )}
        >
          {chat.answer}
        </p>
      </div>

      {/* The typing indicator closing the exchange. */}
      <span
        aria-hidden="true"
        className="mt-[0.6em] ml-[2.3em] flex w-fit items-center gap-[0.25em] rounded-full bg-[#f0eef8] px-[0.7em] py-[0.45em]"
      >
        {[0, 1, 2].map((dot) => (
          <span key={dot} className="block size-[0.3em] rounded-full bg-[#8b86a4]" />
        ))}
      </span>
    </>
  );
}

/** Pitch — a waveform over an insight chip. */
function PitchCard() {
  const { pitch } = hero.cards;

  return (
    <>
      <CardTitle>{pitch.title}</CardTitle>

      {/* The waveform is drawn rather than shipped: the supplied crop is a
          208x37 raster that would blur, and a row of bars is trivial to
          generate. The heights are fixed, not random, so the card renders
          identically on the server and the client. */}
      <span
        aria-hidden="true"
        className="mt-[0.8em] flex h-[2.2em] items-center gap-[0.16em]"
      >
        {WAVEFORM.map((height, index) => (
          <span
            key={index}
            className="w-[0.18em] shrink-0 rounded-full bg-[#14b8a6]"
            style={{ height: `${height}%` }}
          />
        ))}
      </span>

      <p
        className={cn(
          "mt-[0.7em] flex items-center gap-[0.5em] rounded-[0.6em]",
          "bg-[#eef7f6] px-[0.7em] py-[0.5em]",
        )}
      >
        <ChatBubbleIcon className="size-[1em] shrink-0 text-[#0d9488]" />
        <span className="text-[0.82em] text-[#245c56]">{pitch.insight}</span>
      </p>
    </>
  );
}

/** Biz — a recommended action over a link. */
function BizCard() {
  const { biz } = hero.cards;

  return (
    <>
      <CardTitle>{biz.title}</CardTitle>

      <p
        className={cn(
          "mt-[0.8em] flex items-start gap-[0.6em] rounded-[0.6em]",
          "bg-[#f6f5fa] px-[0.7em] py-[0.6em]",
        )}
      >
        <DocumentIcon className="mt-[0.1em] size-[1.1em] shrink-0 text-[#6f6a88]" />
        <span className="text-[0.82em] leading-snug text-[#2c2a3d]">
          {biz.action}
        </span>
      </p>

      <p className="mt-[0.7em] flex items-center gap-[0.4em] text-[0.82em] font-semibold text-[#7c3aed]">
        {biz.link}
        <ArrowIcon className="size-[0.9em]" />
      </p>
    </>
  );
}

/**
 * The Pitch waveform's bar heights, as percentages.
 *
 * Fixed rather than generated: a random pattern would differ between the
 * server render and the client hydration.
 */
const WAVEFORM = [
  30, 52, 38, 68, 45, 82, 55, 40, 72, 48, 90, 60, 35, 78, 50, 66, 42, 85, 58,
  33, 70, 46, 62, 38, 88, 54, 44, 74, 36, 60, 48, 80, 40, 56, 34, 68, 45, 30,
] as const;

/* ========================================================================== */
/*  Icons                                                                     */
/* ========================================================================== */

/** The mark in each card's engine chip. */
function EngineIcon({
  engine,
  className,
}: {
  engine: keyof typeof ENGINE_TONES;
  className?: string;
}) {
  if (engine === "Magic") {
    return (
      <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
        <path
          d="M8 1.5 9.5 6 14 7.5 9.5 9 8 13.5 6.5 9 2 7.5 6.5 6 8 1.5Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (engine === "Chat") {
    return (
      <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
        <path
          d="M8 2.4c3.3 0 6 2.1 6 4.7s-2.7 4.7-6 4.7c-.7 0-1.4-.1-2-.3l-3 1.4.9-2.5C2.7 9.6 2 8.4 2 7.1c0-2.6 2.7-4.7 6-4.7Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (engine === "Pitch") {
    return (
      <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
        <path
          d="M3 7v2M6 4.5v7M9 2.5v11M13 6v4"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <rect
        x="2.6"
        y="2.2"
        width="10.8"
        height="11.6"
        rx="1.6"
        fill="currentColor"
      />
      <path
        d="M5.4 6h5.2M5.4 8.4h5.2M5.4 10.8h3"
        stroke="#fff"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** The play mark over the Magic still. */
function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path d="M5.5 3.4 12 8l-6.5 4.6V3.4Z" fill="currentColor" />
    </svg>
  );
}

/** The assistant's avatar in the Chat card. */
function PersonIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <circle cx="8" cy="5.4" r="2.6" fill="currentColor" />
      <path
        d="M2.8 13.8c0-2.7 2.3-4.3 5.2-4.3s5.2 1.6 5.2 4.3"
        fill="currentColor"
      />
    </svg>
  );
}

/** The mark on the Pitch insight chip. */
function ChatBubbleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path
        d="M8 2.6c3.1 0 5.6 1.9 5.6 4.3S11.1 11.2 8 11.2c-.6 0-1.2-.1-1.8-.2l-2.8 1.3.8-2.3C3 9.2 2.4 8.2 2.4 6.9 2.4 4.5 4.9 2.6 8 2.6Z"
        stroke="currentColor"
        strokeWidth="1.3"
      />
    </svg>
  );
}

/** The mark on the Biz action row. */
function DocumentIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 2.2h5L12.4 5.6v8.2H4V2.2Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path
        d="M8.8 2.4v3.4h3.4M6 9h4M6 11.2h2.6"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** The arrow on the primary action and the Biz link. */
function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path
        d="M3 8h9m0 0-3.4-3.4M12 8l-3.4 3.4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
