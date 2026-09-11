"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { knowledgeManagement } from "@/content/knowledge-management";
import { cn } from "@/lib/utils";

/**
 * KNOWLEDGE MANAGEMENT HERO
 * ---------------------------------------------------------------------------
 * Section 1: the statement on the left, the room scene on the right with the
 * LurnyChat and LurnyMagic cards laid over it.
 *
 * WHY THE CARDS ARE MARKUP
 * The pack ships them alpha-cut, so they COULD be layered without seaming.
 * They are rebuilt anyway: each is ~350px wide with its copy baked in as
 * pixels, soft at the size the hero draws them and invisible to a screen
 * reader. Only the scene and the LurnyMagic card's centre illustration — the
 * one genuinely pictorial part — ship as rasters. See
 * scripts/build-knowledge-management-hero.cjs.
 *
 * WHERE THE CARDS SIT
 * The supplied plate already carries the handwritten note AND its arrow,
 * curving down to a point at roughly 90% across and 21% down. The LurnyChat
 * card is placed so that point lands on its upper edge — the arrow is the
 * design telling us where the card goes, so the slot is derived from it rather
 * than guessed.
 *
 * THE ENTRANCE
 * The copy cascades line by line out of a slight blur, then the two cards
 * arrive in turn — chat first, since the note's arrow points at it, then
 * magic. All of it is gated on `useReducedMotion`.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { hero } = knowledgeManagement;

/**
 * Where each card sits over the scene, as percentages of it, and when it
 * arrives. Measured from the design; the chat card's slot is anchored to the
 * point the plate's own arrow indicates.
 */
const CARD_SLOTS = {
  chat: { slot: "left-[71%] top-[15%] w-[29%]", delay: 0.75 },
  magic: { slot: "left-[73%] top-[63%] w-[27%]", delay: 1.0 },
} as const;

export function KnowledgeHero() {
  const reduce = useReducedMotion();

  /**
   * The statement's lines, each a little after the last. Blur is part of it —
   * a few pixels resolving as the line arrives is what makes the entrance read
   * as smooth rather than merely delayed.
   */
  const rise = (delay: number) => ({
    initial: reduce ? "shown" : "hidden",
    whileInView: "shown",
    viewport: { once: true, amount: "some" } as const,
    variants: {
      hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
      shown: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.85, delay, ease: easeOut },
      },
    },
  });

  /** Shared arrival for the two cards. */
  const arrive = (delay: number) => ({
    initial: reduce
      ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
      : { opacity: 0, y: 26, scale: 0.94, filter: "blur(8px)" },
    whileInView: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
    viewport: { once: true, amount: "some" } as const,
    transition: { duration: 0.9, delay, ease: easeOut },
  });

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-[#fdfbfa]",
        // Below lg the copy leads and the scene follows it; from lg up the
        // copy overlays the scene instead.
        "flex flex-col lg:block",
      )}
    >
      {/* ============================== Scene ======================== */}
      <Image
        src={hero.scene.src}
        alt={hero.scene.alt}
        width={hero.scene.width}
        height={hero.scene.height}
        // Above the fold and the visual subject, so it must not lazy-load —
        // this is the LCP candidate on the page.
        priority
        sizes="100vw"
        className="order-2 h-auto w-full lg:order-none"
      />

      {/* ---------------------------- The cards -------------------- */}
      {/* Positioned over the scene from lg up, inside the SAME Container as
          the copy so the two scale together — against the viewport they would
          converge on the headline as the screen grew. Below lg they leave the
          scene and stack under the copy. */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        <Container width="hero" className="@container relative h-full">
          <div className="relative h-full" style={{ fontSize: "max(9px, 0.9cqw)" }}>
            <motion.div
              {...arrive(CARD_SLOTS.chat.delay)}
              className={cn("absolute", CARD_SLOTS.chat.slot)}
            >
              <ChatCard />
            </motion.div>

            <motion.div
              {...arrive(CARD_SLOTS.magic.delay)}
              className={cn("absolute", CARD_SLOTS.magic.slot)}
            >
              <MagicCard />
            </motion.div>
          </div>
        </Container>
      </div>

      {/* =============================== Copy ======================== */}
      <div className="order-1 lg:absolute lg:inset-0 lg:order-none">
        <Container width="hero" className="flex h-full flex-col justify-center">
          <div
            className={cn(
              // Held clear of the scene's subject, so the copy never runs onto
              // the man or the cards.
              "max-w-[34rem] pt-28 pb-14 sm:pt-32 sm:pb-16",
              "lg:max-w-[46%] lg:py-0",
            )}
          >
            <motion.p
              {...rise(0.05)}
              className={cn(
                "text-[0.6875rem] font-bold uppercase",
                "tracking-[0.16em] text-[#692bed] sm:text-xs",
              )}
            >
              {hero.eyebrow}
            </motion.p>

            <motion.h1
              {...rise(0.16)}
              className={cn(
                "mt-6 font-display font-bold tracking-[-0.035em]",
                "leading-[1.04] text-[#000001]",
                "text-[2rem] sm:text-[2.5rem] lg:text-[2.75rem] xl:text-[3.5rem]",
              )}
            >
              {hero.headline.map((line) => (
                <span key={line} className="inline lg:block">
                  {line}{" "}
                </span>
              ))}
            </motion.h1>

            <motion.p
              {...rise(0.3)}
              className={cn(
                "mt-7 max-w-[32rem] leading-relaxed text-pretty",
                "text-[0.9375rem] text-[#201f37]/85 sm:text-[1rem]",
                "xl:text-[1.0625rem]",
              )}
            >
              {hero.description}
            </motion.p>

            {/* -------------------------- Actions ------------------- */}
            <motion.div
              {...rise(0.42)}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <Link
                href={hero.actions.primary.href}
                className={cn(
                  "group/cta inline-flex h-13 items-center justify-center gap-3 rounded-xl px-7",
                  "bg-[#4925d2] text-[0.9375rem] font-semibold text-white",
                  // `translate`, not `transform`: Tailwind v4 compiles the
                  // translate utilities to the standalone property.
                  "duration-normal transition-[background-color,box-shadow,translate] ease-out",
                  "will-change-[translate]",
                  "hover:-translate-y-0.5 hover:bg-[#3d1eb5]",
                  "hover:shadow-[0_16px_36px_-12px_rgb(73_37_210/0.5)]",
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
                  "ring-1 ring-[#4319c1]/40 bg-white/70",
                  "text-[0.9375rem] font-semibold text-[#4319c1]",
                  "duration-normal transition-[background-color,box-shadow,translate] ease-out",
                  "will-change-[translate]",
                  "hover:-translate-y-0.5 hover:bg-white hover:ring-[#4319c1]/70",
                  "active:translate-y-0",
                )}
              >
                {hero.actions.secondary.label}
              </Link>
            </motion.div>

            <motion.p
              {...rise(0.54)}
              className="mt-7 text-[0.8125rem] text-[#5f6082] sm:text-sm"
            >
              {hero.poweredBy}
            </motion.p>
          </div>
        </Container>
      </div>

      {/* --------------------- The cards, stacked ------------------ */}
      {/* The small-screen home for the same two cards. They cannot overlay the
          scene at this width without covering the subject. */}
      <Container width="hero" className="order-3 pb-14 lg:hidden">
        <div className="grid gap-4 text-[13px] sm:grid-cols-2 sm:items-start">
          <ChatCard />
          <MagicCard />
        </div>
      </Container>
    </section>
  );
}

/* ========================================================================== */
/*  The two cards                                                             */
/* ========================================================================== */

/** Shared card chrome. Sized in `em` so it scales with its context. */
function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[1.2em] bg-white/95 p-[1.2em] backdrop-blur-sm",
        "shadow-[0_22px_50px_-20px_rgb(25_15_60/0.3)]",
        "ring-1 ring-[#ece9f6]",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** LurnyChat — the question and the answer it cites. */
function ChatCard() {
  const { chat } = hero;

  return (
    <Card>
      {/* ----------------------------- Header ------------------- */}
      <div className="flex items-center gap-[0.8em]">
        <span className="flex size-[2.6em] shrink-0 items-center justify-center rounded-full bg-[#efe9fd]">
          <ChatIcon className="size-[1.4em] text-[#5325c8]" />
        </span>

        <span className="min-w-0">
          <span className="block text-[1.15em] font-bold tracking-[-0.01em] text-[#0d0a1c]">
            {chat.engine}
          </span>
          <span className="mt-[0.05em] block text-[0.95em] text-[#4b4a68]">
            {chat.tagline}
          </span>
        </span>
      </div>

      {/* ---------------------------- Question ------------------ */}
      <div className="mt-[1.1em] ml-[2.2em] flex items-start gap-[0.7em] rounded-[0.8em] bg-[#eaf0fb] p-[0.8em]">
        <span className="flex size-[2em] shrink-0 items-center justify-center rounded-full bg-[#c9d9f3]">
          <PersonIcon className="size-[1.1em] text-[#3e5f9b]" />
        </span>
        <p className="text-[0.95em] leading-snug text-[#1e2438]">
          {chat.question}
        </p>
      </div>

      {/* ----------------------------- Answer ------------------- */}
      <div className="mt-[0.8em] flex items-start gap-[0.7em]">
        <span className="flex size-[2em] shrink-0 items-center justify-center rounded-[0.55em] bg-[#efe9fd]">
          <SparkIcon className="size-[1.1em] text-[#6d3ce8]" />
        </span>

        <div className="min-w-0 flex-1 rounded-[0.8em] bg-[#f1f0f8] p-[0.9em]">
          <p className="text-[0.95em] text-[#1e2438]">{chat.answer.lead}</p>

          <ul className="mt-[0.7em] space-y-[0.5em]">
            {chat.answer.items.map((item) => (
              <li key={item} className="flex items-start gap-[0.6em]">
                <TickIcon className="mt-[0.1em] size-[1.2em] shrink-0" />
                <span className="text-[0.95em] leading-snug text-[#1e2438]">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-[0.8em] text-[0.9em] leading-snug text-[#55536f]">
            {chat.answer.note}
          </p>
        </div>
      </div>

      {/* ----------------------------- Source ------------------- */}
      <p className="mt-[0.8em] ml-[2.7em] flex items-center gap-[0.6em] rounded-[0.6em] bg-[#f1f0f8] px-[0.8em] py-[0.6em]">
        <DocumentIcon className="size-[1.1em] shrink-0 text-[#6d8ac9]" />
        <span className="text-[0.9em] text-[#3f3e59]">{chat.source}</span>
      </p>
    </Card>
  );
}

/** LurnyMagic — the microlesson built from those documents. */
function MagicCard() {
  const { magic } = hero;

  return (
    <Card>
      <div className="flex items-center justify-between gap-[0.8em]">
        <span className="flex min-w-0 items-center gap-[0.7em]">
          <span className="flex size-[2.2em] shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#fbddc8] to-[#e6dcfb]">
            <SparkIcon className="size-[1.2em] text-[#5c36d9]" />
          </span>
          <span className="truncate text-[1.1em] font-bold tracking-[-0.01em] text-[#0d0a1c]">
            {magic.engine}
          </span>
        </span>

        <span
          className={cn(
            "shrink-0 rounded-full bg-[#ece5fb] px-[0.9em] py-[0.35em]",
            "text-[0.85em] font-medium text-[#5f45c0]",
          )}
        >
          {magic.badge}
        </span>
      </div>

      {/* The one pictorial part of this card — see the build script. */}
      <Image
        src={magic.illustration.src}
        alt={magic.illustration.alt}
        width={magic.illustration.width}
        height={magic.illustration.height}
        sizes="(min-width: 1024px) 24vw, 45vw"
        className="mt-[0.9em] h-auto w-full rounded-[0.7em]"
      />

      <p className="mt-[0.9em] text-[1.05em] font-bold tracking-[-0.01em] text-[#0d0a1c]">
        {magic.caption}
      </p>
    </Card>
  );
}

/* ========================================================================== */
/*  Icons                                                                     */
/* ========================================================================== */

/** LurnyChat's mark. */
function ChatIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 3.4c4.9 0 8.8 3.1 8.8 6.9s-3.9 6.9-8.8 6.9c-.8 0-1.6-.1-2.4-.3l-4.6 2.3 1.3-3.8C4.3 14.2 3.2 12.4 3.2 10.3 3.2 6.5 7.1 3.4 12 3.4Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** The employee asking. */
function PersonIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="8" r="3.6" fill="currentColor" />
      <path d="M4.6 20c0-3.8 3.3-6 7.4-6s7.4 2.2 7.4 6" fill="currentColor" />
    </svg>
  );
}

/** The assistant, and LurnyMagic's mark. */
function SparkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 2.2 14.2 9 21 11.2 14.2 13.4 12 20.2 9.8 13.4 3 11.2 9.8 9 12 2.2Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** The ticks on the answer's checklist. */
function TickIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <rect width="20" height="20" rx="5" fill="#67b871" />
      <path
        d="m5.6 10.3 2.8 2.8 6-6.2"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** The source citation's mark. */
function DocumentIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <path
        d="M5 2.4h6l4 4v11.2H5V2.4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M10.8 2.6v4.2H15M7.6 11h5M7.6 13.8h3.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** The arrow on the primary action. */
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
