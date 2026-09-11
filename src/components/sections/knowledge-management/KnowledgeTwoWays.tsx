"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { knowledgeManagement } from "@/content/knowledge-management";
import { cn } from "@/lib/utils";

/**
 * KNOWLEDGE MANAGEMENT — ONE KNOWLEDGE BASE, TWO WAYS TO HELP
 * ---------------------------------------------------------------------------
 * Section 4: the statement on the left, the document stack in the middle, and
 * the two engine cards on the right that its arrows connect to.
 *
 * THE STACK SHIPS WHOLE — THE ONE CROP ON THIS PAGE THAT DOES
 * Every other card here is rebuilt in markup, because each is a panel of text.
 * The stack is not: it is a 3D-perspective drawing of three tilted documents
 * with soft shadows, a handwritten note, and the two connector arrows running
 * to the cards. None of that is text, and CSS would only approximate it.
 *
 * WHERE THE CARDS SIT
 * The stack's own arrows terminate in a teal dot at 96.4%/4.2% of its box and
 * a coral dot at 97.4%/83.2%. Those are the design telling us where each card
 * attaches, so the two slots are derived from them: the stack is placed first,
 * and the cards are aligned so their left edges meet those dots.
 *
 * THE ENTRANCE
 * The copy cascades, the stack arrives, then the two cards land in turn —
 * chat then magic, the order the arrows run. All gated on `useReducedMotion`.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { twoWays } = knowledgeManagement;

/** The glyph beside each engine in the copy column. */
const engineIcons = {
  chat: ChatIcon,
  book: BookIcon,
} as const;

export function KnowledgeTwoWays() {
  const reduce = useReducedMotion();

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

  /** Shared arrival for the stack and the two cards. */
  const arrive = (delay: number) => ({
    initial: reduce
      ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
      : { opacity: 0, y: 24, scale: 0.96, filter: "blur(8px)" },
    whileInView: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
    viewport: { once: true, amount: "some" } as const,
    transition: { duration: 0.9, delay, ease: easeOut },
  });

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden",
        // The pale ground the plate sits on.
        "bg-[#eff5fd]",
        "flex flex-col lg:block",
      )}
    >
      {/* ============================== Ground ======================= */}
      <Image
        src={twoWays.scene.src}
        alt={twoWays.scene.alt}
        width={twoWays.scene.width}
        height={twoWays.scene.height}
        sizes="100vw"
        className="order-2 h-auto w-full lg:order-none"
      />

      {/* ====================== Stack and the cards ================== */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        <div
          className="relative h-full"
          // Scales the cards with the section, so they hold their designed
          // proportion at every width.
          style={{ fontSize: "max(10px, 0.92vw)" }}
        >
          {/* The stack, with the arrows that run to both cards. */}
          <motion.div
            {...arrive(0.6)}
            className="absolute top-[22%] left-[41.5%] w-[22%]"
          >
            {/* Its label sits above it, as the design has it. */}
            <p className="mb-[0.6em] text-center text-[1.05em] font-bold text-[#1b2233]">
              {twoWays.stackLabel.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>

            <Image
              src={twoWays.stack.src}
              alt={twoWays.stack.alt}
              width={twoWays.stack.width}
              height={twoWays.stack.height}
              sizes="(min-width: 1024px) 20vw, 50vw"
              className="h-auto w-full"
            />
          </motion.div>

          {/* Aligned so their left edges meet the stack's arrow dots — see the
              note at the top of this file. */}
          <motion.div
            {...arrive(0.85)}
            className="absolute top-[7%] left-[63.6%] w-[34%]"
          >
            <ChatCard />
          </motion.div>

          <motion.div
            {...arrive(1.05)}
            className="absolute top-[46.1%] left-[63.6%] w-[34%]"
          >
            <MagicCard />
          </motion.div>
        </div>
      </div>

      {/* =============================== Copy ======================== */}
      <div className="order-1 lg:absolute lg:inset-0 lg:order-none">
        <Container width="hero" className="flex h-full flex-col justify-center">
          <div
            className={cn(
              "max-w-[34rem] pt-16 pb-12 sm:pt-20",
              "lg:max-w-[40%] lg:py-0",
            )}
          >
            <motion.p
              {...rise(0.05)}
              className={cn(
                "text-[0.6875rem] font-bold uppercase",
                "tracking-[0.14em] text-[#3d06ef] sm:text-xs",
              )}
            >
              {twoWays.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.16)}
              className={cn(
                "mt-6 font-display font-bold tracking-[-0.035em]",
                "leading-[1.04] text-[#101828]",
                "text-[2rem] sm:text-[2.5rem] lg:text-[2.75rem] xl:text-[3.25rem]",
              )}
            >
              {twoWays.headline.map((line) => (
                <span key={line} className="inline lg:block">
                  {line}{" "}
                </span>
              ))}
            </motion.h2>

            <motion.p
              {...rise(0.3)}
              className={cn(
                "mt-7 max-w-[30rem] leading-relaxed text-pretty",
                "text-[0.9375rem] text-[#3f4a60] sm:text-[1rem]",
                "xl:text-[1.0625rem]",
              )}
            >
              {twoWays.description}
            </motion.p>

            {/* -------------------------- Engines -------------------- */}
            <ul className="mt-10 space-y-6">
              {twoWays.engines.map((engine, index) => {
                const Icon = engineIcons[engine.icon];

                return (
                  <motion.li
                    key={engine.name}
                    {...rise(0.42 + index * 0.1)}
                    className="flex items-center gap-5"
                  >
                    <Icon
                      className={cn(
                        "size-9 shrink-0",
                        engine.icon === "chat"
                          ? "text-[#2f8f8a]"
                          : "text-[#eb7341]",
                      )}
                    />

                    <span className="text-[1.0625rem] text-[#3f4a60] sm:text-[1.125rem]">
                      <span className="font-bold text-[#101828]">
                        {engine.name}
                      </span>{" "}
                      &mdash; {engine.role}
                    </span>
                  </motion.li>
                );
              })}
            </ul>
          </div>
        </Container>
      </div>

      {/* ------------------ Stack and cards, stacked --------------- */}
      {/* The small-screen home for the same three. The stack keeps its arrows
          — they are part of the drawing — but no longer connect to anything,
          so it is shown at a size where it reads as an illustration. */}
      <Container width="hero" className="order-3 pb-14 text-[12px] lg:hidden">
        <div className="flex flex-col items-center">
          <p className="text-center text-[1.4em] font-bold text-[#1b2233]">
            {twoWays.stackLabel.join(" ")}
          </p>

          <Image
            src={twoWays.stack.src}
            alt={twoWays.stack.alt}
            width={twoWays.stack.width}
            height={twoWays.stack.height}
            sizes="55vw"
            className="mt-3 h-auto w-[58%] max-w-56"
          />
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:items-start">
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

/** Shared card chrome, with its engine header and badge. */
function Card({
  engine,
  badge,
  icon,
  tone,
  children,
}: {
  engine: string;
  badge: string;
  icon: "chat" | "book";
  tone: "teal" | "coral";
  children: React.ReactNode;
}) {
  const Icon = engineIcons[icon];

  const styles =
    tone === "teal"
      ? {
          chip: "bg-[#dff0ee]",
          mark: "text-[#2f8f8a]",
          badge: "bg-[#dff0ee] text-[#1f6b66]",
        }
      : {
          chip: "bg-[#fde8dc]",
          mark: "text-[#eb7341]",
          badge: "bg-[#fde8dc] text-[#b4491c]",
        };

  return (
    <div className="rounded-[1.5em] bg-white p-[1.4em] shadow-[0_28px_64px_-26px_rgb(20_35_70/0.28)]">
      <div className="flex items-center justify-between gap-[1em]">
        <span className="flex min-w-0 items-center gap-[0.9em]">
          <span
            className={cn(
              "flex size-[2.8em] shrink-0 items-center justify-center rounded-[0.8em]",
              styles.chip,
            )}
          >
            <Icon className={cn("size-[1.5em]", styles.mark)} />
          </span>
          <span className="truncate text-[1.5em] font-bold tracking-[-0.015em] text-[#101828]">
            {engine}
          </span>
        </span>

        <span
          className={cn(
            "shrink-0 rounded-full px-[1.1em] py-[0.5em]",
            "text-[0.95em] font-bold",
            styles.badge,
          )}
        >
          {badge}
        </span>
      </div>

      {children}
    </div>
  );
}

/** LurnyChat — the question and the answer it cites. */
function ChatCard() {
  const { chat } = twoWays;

  return (
    <Card engine={chat.engine} badge={chat.badge} icon="chat" tone="teal">
      <p
        className={cn(
          "mt-[1.2em] rounded-[0.8em] bg-[#e8ecfa] px-[1.2em] py-[0.9em]",
          "text-[1.05em] text-[#1b2233]",
        )}
      >
        {chat.question}
      </p>

      <p
        className={cn(
          "mt-[0.8em] rounded-[0.8em] bg-white px-[1.2em] py-[0.9em]",
          "text-[1.05em] leading-snug text-[#1b2233]",
          "ring-1 ring-[#e7ecf3]",
        )}
      >
        {chat.answer}
      </p>

      <p
        className={cn(
          "mt-[0.8em] flex items-center gap-[0.7em] rounded-[0.7em]",
          "bg-[#f2f5f9] px-[1em] py-[0.75em]",
        )}
      >
        <DocumentIcon className="size-[1.3em] shrink-0 text-[#6f7d91]" />
        <span className="text-[0.98em] font-medium text-[#3f4a60]">
          {chat.source}
        </span>
      </p>
    </Card>
  );
}

/** LurnyMagic — the same policy turned into a lesson and a check. */
function MagicCard() {
  const { magic } = twoWays;

  return (
    <Card engine={magic.engine} badge={magic.badge} icon="book" tone="coral">
      {/* ---------------------------- The lesson ---------------- */}
      <div className="mt-[1.2em] rounded-[0.9em] p-[1.2em] ring-1 ring-[#e7ecf3]">
        <p className="text-[1.25em] font-bold tracking-[-0.01em] text-[#101828]">
          {magic.title}
        </p>

        {/* An ordered list: the ordinal comes from the item's position rather
            than the copy, so the two cannot drift apart. */}
        <ol className="mt-[0.9em] space-y-[0.7em]">
          {magic.steps.map((step, index) => (
            <li key={step} className="flex items-center gap-[0.9em]">
              <span
                className={cn(
                  "flex size-[1.9em] shrink-0 items-center justify-center rounded-full",
                  "bg-[#fde8dc] text-[0.9em] font-bold text-[#b4491c]",
                )}
              >
                {index + 1}
              </span>
              <span className="text-[1.02em] text-[#26324a]">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* --------------------------- Quick check ---------------- */}
      <div className="mt-[1em] rounded-[0.9em] p-[1.1em] ring-1 ring-[#d8c8fb]">
        <p className="flex items-center gap-[0.7em]">
          <CapIcon className="size-[1.4em] shrink-0 text-[#5613b7]" />
          <span className="text-[1.02em] text-[#1b2233]">
            <span className="font-bold text-[#5613b7]">{magic.quiz.label}</span>{" "}
            {magic.quiz.question}
          </span>
        </p>

        {/* The options. The first is the selected one, as the design shows —
            a picture of the product, so they are text rather than radios that
            would promise an interaction the section cannot honour. */}
        <ul className="mt-[0.9em] grid grid-cols-2 gap-[0.8em]">
          {magic.quiz.options.map((option, index) => (
            <li
              key={option}
              className={cn(
                "flex items-center gap-[0.7em] rounded-[0.7em] px-[1em] py-[0.7em]",
                index === 0
                  ? "ring-1 ring-[#7c3aed]"
                  : "ring-1 ring-[#e7ecf3]",
              )}
            >
              <span
                className={cn(
                  "flex size-[1.2em] shrink-0 items-center justify-center rounded-full",
                  index === 0 ? "bg-[#7c3aed]" : "ring-1 ring-[#c3cbd8]",
                )}
              >
                {index === 0 && (
                  <span className="block size-[0.45em] rounded-full bg-white" />
                )}
              </span>
              <span className="truncate text-[0.98em] text-[#26324a]">
                {option}
              </span>
            </li>
          ))}
        </ul>
      </div>
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
        d="M12 3.6c4.7 0 8.5 3 8.5 6.7s-3.8 6.7-8.5 6.7c-.9 0-1.7-.1-2.5-.3l-4.6 2.4 1.3-3.9C4 14 3.5 12.4 3.5 10.3 3.5 6.6 7.3 3.6 12 3.6Z"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinejoin="round"
      />
      <path
        d="M8.4 10.3h.01M12 10.3h.01M15.6 10.3h.01"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** LurnyMagic's mark. */
function BookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M2.8 4.6h5.6c1.7 0 3.1 1.4 3.1 3.1v11.7c0-1.4-1.4-2.5-3.1-2.5H2.8V4.6ZM21.2 4.6h-5.6c-1.7 0-3.1 1.4-3.1 3.1v11.7c0-1.4 1.4-2.5 3.1-2.5h5.6V4.6Z"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** The source citation's mark. */
function DocumentIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M6 3h7l5 5v13H6V3Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M12.8 3.3v5.2h5.2M9 12.6h6M9 16.2h4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** The quick check's mark. */
function CapIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 4 22 9l-10 5L2 9l10-5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M6 11.4V16c0 1.6 2.7 3 6 3s6-1.4 6-3v-4.6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
