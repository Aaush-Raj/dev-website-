"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { knowledgeManagement } from "@/content/knowledge-management";
import { cn } from "@/lib/utils";

/**
 * KNOWLEDGE MANAGEMENT — ANSWERS, WHEN WORK NEEDS THEM
 * ---------------------------------------------------------------------------
 * Section 3: the statement and three points on the left, a LurnyChat
 * conversation on the right with the source document it cites beside it.
 *
 * ONLY THE GROUND IS A RASTER
 * The plate carries the abstract shapes and the handwritten "An answer you can
 * follow." note with its arrow. The pack ships both panels separately (519x727
 * and 355x517) with their copy baked in as pixels — deliberately unused, since
 * that copy would be soft at section size and invisible to a screen reader.
 *
 * WHERE THE SOURCE PANEL SITS
 * The plate's own arrow points UP at a point 92% across and 75% down. That is
 * the design telling us where the source panel's FOOT belongs, so the panel's
 * slot is derived from it rather than guessed — measured against the design,
 * its bottom edge lands at 74.9%, which is the same point.
 *
 * THE CONNECTOR
 * A line runs from the answer's source chip to the highlighted excerpt in the
 * document, which is the section's argument: the answer is traceable. It draws
 * along its length, after both panels have arrived.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { chatSection } = knowledgeManagement;

/** The glyph beside each point. */
const pointIcons = {
  bubble: BubbleIcon,
  bubbles: BubblesIcon,
  document: DocumentIcon,
} as const;

export function KnowledgeChat() {
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

  /** Shared arrival for the two panels. */
  const arrive = (delay: number) => ({
    initial: reduce
      ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
      : { opacity: 0, y: 26, scale: 0.96, filter: "blur(8px)" },
    whileInView: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
    viewport: { once: true, amount: "some" } as const,
    transition: { duration: 0.9, delay, ease: easeOut },
  });

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden text-white",
        // The slate the plate sits on, so the section continues it wherever
        // the image does not reach.
        "bg-[#41526a]",
        "flex flex-col lg:block",
      )}
    >
      {/* ============================== Ground ======================= */}
      <Image
        src={chatSection.scene.src}
        alt={chatSection.scene.alt}
        width={chatSection.scene.width}
        height={chatSection.scene.height}
        sizes="100vw"
        className="order-2 h-auto w-full lg:order-none"
      />

      {/* ============================= Panels ======================== */}
      {/* Over the ground from lg up. Below that they leave it and stack under
          the copy — at phone width two overlapping panels are unreadable. */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        <div
          className="relative h-full"
          // Scales the panels with the section, so they hold their designed
          // proportion at every width.
          style={{ fontSize: "max(11px, 1.02vw)" }}
        >
          <motion.div
            {...arrive(0.7)}
            className="absolute top-[10.1%] left-[45.2%] w-[30%]"
          >
            <ChatPanel />
          </motion.div>

          {/* Anchored so its FOOT lands on the point the plate's arrow
              indicates — see the note at the top of this file. */}
          <motion.div
            {...arrive(0.95)}
            className="absolute top-[20.9%] left-[76.8%] w-[20%]"
          >
            <SourcePanel />
          </motion.div>

          {/* The connector, drawn OVER both panels: it runs from the chat
              panel's source chip to the source panel's highlighted excerpt, so
              behind either one it would be invisible. Endpoints are measured
              from the rendered panels rather than guessed. */}
          <svg
            // The section is ~1.78:1, so a viewBox of that ratio is scaled
            // uniformly rather than stretched, which keeps the curve true.
            //
            // The path FADES in rather than drawing along its length: a
            // `pathLength` animation on a hairline rendered it as fragments.
            viewBox="0 0 178 100"
            fill="none"
            aria-hidden="true"
            className="absolute inset-0 z-10 size-full"
          >
            <motion.path
              d="M 113.2 45.2 C 122.8 45.2, 128.2 38.9, 139 38.9"
              stroke="#4ca297"
              strokeWidth="2"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              initial={reduce ? { opacity: 1 } : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: "some" }}
              transition={{ duration: 0.7, delay: 1.2, ease: easeOut }}
            />
          </svg>
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
                "tracking-[0.22em] text-[#8cf6fa] sm:text-xs",
              )}
            >
              {chatSection.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.16)}
              className={cn(
                "mt-6 font-display font-bold tracking-[-0.035em]",
                "leading-[1.04] text-white",
                "text-[2rem] sm:text-[2.5rem] lg:text-[2.75rem] xl:text-[3.25rem]",
              )}
            >
              {chatSection.headline.map((line) => (
                <span key={line} className="inline lg:block">
                  {line}{" "}
                </span>
              ))}
            </motion.h2>

            <motion.p
              {...rise(0.3)}
              className={cn(
                "mt-7 max-w-[30rem] leading-relaxed text-pretty",
                "text-[0.9375rem] text-white/80 sm:text-[1rem]",
                "xl:text-[1.0625rem]",
              )}
            >
              {chatSection.description}
            </motion.p>

            {/* --------------------------- Points -------------------- */}
            <ul className="mt-10 space-y-7">
              {chatSection.points.map((point, index) => {
                const Icon = pointIcons[point.icon];

                return (
                  <motion.li
                    key={point.title}
                    {...rise(0.42 + index * 0.1)}
                    className="flex items-start gap-5"
                  >
                    <Icon className="mt-0.5 size-9 shrink-0 text-[#8af3eb]" />

                    <span>
                      <span className="block text-[1.0625rem] font-bold text-white sm:text-[1.125rem]">
                        {point.title}
                      </span>
                      <span className="mt-1 block text-[0.9375rem] leading-relaxed text-white/75 sm:text-[1rem]">
                        {point.body}
                      </span>
                    </span>
                  </motion.li>
                );
              })}
            </ul>
          </div>
        </Container>
      </div>

      {/* ---------------------- Panels, stacked -------------------- */}
      <Container width="hero" className="order-3 pb-14 text-[12px] lg:hidden">
        <div className="grid gap-4 sm:grid-cols-2 sm:items-start">
          <ChatPanel />
          <SourcePanel />
        </div>
      </Container>
    </section>
  );
}

/* ========================================================================== */
/*  The conversation                                                          */
/* ========================================================================== */

function ChatPanel() {
  const { panel } = chatSection;

  return (
    <div className="rounded-[1.4em] bg-white p-[1.3em] shadow-[0_30px_70px_-24px_rgb(10_20_35/0.55)]">
      {/* ----------------------------- Header ------------------- */}
      <div className="flex items-start justify-between gap-[1em]">
        <span className="flex min-w-0 items-center gap-[0.8em]">
          <BubbleIcon className="size-[2.4em] shrink-0 text-[#4ca297]" />
          <span className="min-w-0">
            <span className="block text-[1.25em] font-bold tracking-[-0.01em] text-[#1b2836]">
              {panel.engine}
            </span>
            <span className="mt-[0.05em] block text-[1em] text-[#5d7183]">
              {panel.tagline}
            </span>
          </span>
        </span>

        <span aria-hidden="true" className="mt-[0.5em] flex shrink-0 gap-[0.25em]">
          {[0, 1, 2].map((dot) => (
            <span key={dot} className="block size-[0.3em] rounded-full bg-[#9aa8b5]" />
          ))}
        </span>
      </div>

      <p className="mt-[1em] text-[0.92em] text-[#7a8b99]">{panel.disclaimer}</p>

      {/* ---------------------------- Messages ------------------ */}
      <ol className="mt-[1em] space-y-[0.9em]">
        {panel.messages.map((message) => (
          <li
            key={message.text}
            className={cn(
              "flex flex-col",
              message.from === "user" ? "items-end" : "items-start",
            )}
          >
            <p
              className={cn(
                "max-w-[86%] rounded-[0.9em] px-[1em] py-[0.75em]",
                "text-[1em] leading-snug",
                message.from === "user"
                  ? "bg-[#d8eeee] text-[#1b2836]"
                  : "bg-[#eff2f5] text-[#1b2836]",
              )}
            >
              {message.text}
            </p>

            {/* The source chip, on assistant turns only. The first one is the
                connector's origin — see the note at the top. */}
            {"source" in message && message.source && (
              <p
                className={cn(
                  "mt-[0.6em] flex items-center gap-[0.6em] rounded-[0.7em]",
                  "bg-[#e6f2f1] px-[0.9em] py-[0.6em]",
                )}
              >
                <DocumentIcon className="size-[1.2em] shrink-0 text-[#5d7183]" />
                <span className="text-[0.92em] text-[#33475a]">
                  {message.source}
                </span>
              </p>
            )}

            <span
              className={cn(
                "mt-[0.45em] text-[0.85em] text-[#8b9aa7]",
                message.from === "user" ? "self-end" : "self-end",
              )}
            >
              {message.time}
            </span>
          </li>
        ))}
      </ol>

      {/* ----------------------------- Input -------------------- */}
      {/* Rendered as a static row rather than a real input: this is a picture
          of the product, and a focusable field that does nothing would be a
          promise the section cannot keep. */}
      <p
        className={cn(
          "mt-[1.1em] flex items-center justify-between gap-[1em]",
          "rounded-[0.9em] border border-[#dde4ea] px-[1.1em] py-[0.9em]",
        )}
      >
        <span className="text-[1em] text-[#8b9aa7]">{panel.placeholder}</span>
        <SendIcon className="size-[1.4em] shrink-0 text-[#45998b]" />
      </p>
    </div>
  );
}

/* ========================================================================== */
/*  The source document                                                       */
/* ========================================================================== */

function SourcePanel() {
  const { source } = chatSection;

  return (
    <div className="rounded-[1.4em] bg-white p-[1.3em] shadow-[0_30px_70px_-24px_rgb(10_20_35/0.55)]">
      <div className="flex items-start gap-[0.8em]">
        <DocumentIcon className="size-[2.4em] shrink-0 text-[#4ca297]" />
        <span className="min-w-0">
          <span className="block text-[1.25em] font-bold tracking-[-0.01em] text-[#1b2836]">
            {source.title}
          </span>
          <span className="mt-[0.05em] block text-[1em] text-[#5d7183]">
            {source.subtitle}
          </span>
        </span>
      </div>

      <p className="mt-[1.2em] text-[0.92em] text-[#7a8b99]">{source.label}</p>

      {/* The highlighted passage the answer drew on. */}
      <p className="mt-[0.6em] rounded-[0.6em] bg-[#d8eeee] px-[0.9em] py-[0.8em] text-[1em] leading-snug text-[#1b2836]">
        <span className="font-semibold">{source.excerpt.lead}</span>{" "}
        {source.excerpt.rest}
      </p>

      {/* The rest of the document, as skeleton lines — see the content file. */}
      <span aria-hidden="true" className="mt-[1.1em] block space-y-[0.55em]">
        {source.skeleton.map((width, index) => (
          <span
            key={index}
            className="block h-[0.75em] rounded-full bg-[#e6e9ee]"
            style={{ width: `${width}%` }}
          />
        ))}
      </span>
    </div>
  );
}

/* ========================================================================== */
/*  Icons                                                                     */
/* ========================================================================== */

/** Ask naturally, and LurnyChat's mark. */
function BubbleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 3.6c4.7 0 8.5 3 8.5 6.7s-3.8 6.7-8.5 6.7c-.9 0-1.7-.1-2.5-.3l-4.6 2.4 1.3-3.9C4 14 3.5 12.4 3.5 10.3 3.5 6.6 7.3 3.6 12 3.6Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Get specific — two bubbles. */
function BubblesIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M9.6 3.2c3.9 0 7 2.4 7 5.4s-3.1 5.4-7 5.4c-.7 0-1.4-.1-2.1-.2l-3.8 1.9 1.1-3.1c-1.4-1-2.2-2.4-2.2-4C2.6 5.6 5.7 3.2 9.6 3.2Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M16.9 10.4c2.6.5 4.5 2.2 4.5 4.3 0 1.2-.6 2.2-1.6 3l.8 2.3-2.9-1.4c-.5.1-1 .2-1.6.2-2.4 0-4.5-1.2-5.3-2.9"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Check the source, and the document mark. */
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

/** The send mark on the input row. */
function SendIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M21 3 3 10.4l7.4 3.2L13.6 21 21 3Z"
        fill="currentColor"
      />
    </svg>
  );
}
