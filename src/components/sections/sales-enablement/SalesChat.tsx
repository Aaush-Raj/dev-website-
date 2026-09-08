"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { Uncopyable } from "@/components/ui/Uncopyable";
import { salesEnablement } from "@/content/sales-enablement";
import { cn } from "@/lib/utils";

import { chatIcons } from "./SalesChatIcons";

/**
 * SALES ENABLEMENT — APPLY WITH LURNYCHAT
 * ---------------------------------------------------------------------------
 * Section 4: the argument on the left, a LurnyChat exchange on the right, both
 * over the slate room the pack supplies as one photograph.
 *
 * WHY THE PANEL IS MARKUP AND NOT THE SUPPLIED GRAPHICS
 * The pack's README settles it: "The complete chat panel and component
 * graphics include embedded interface text. Main section copy and CTA text are
 * excluded. Icons are not transparent." So every graphics/*.png — the whole
 * panel, the customer message, the assistant response, both chips, the input —
 * carries its copy baked in as pixels, and every icon is an opaque crop that
 * would land as a slate rectangle on a translucent panel. Shipping any of them
 * would make the conversation unselectable, untranslatable, invisible to a
 * screen reader and soft at any size it is not drawn at natively.
 *
 * So the panel is rebuilt here and the glyphs are drawn in SalesChatIcons.
 * Only the backdrop and the seller's photograph ship — see
 * scripts/build-sales-enablement-chat.cjs, which also records why the pack's
 * separate plant/books image is not layered on top of a background that
 * already contains it.
 *
 * THE PANEL IS TRANSLUCENT ON PURPOSE
 * A slate fill at ~72% with a backdrop blur, so the room reads through it. The
 * design draws it as glass sitting in the scene, not as a screenshot pasted
 * over it — which is also why the section ground is sampled from the backdrop
 * rather than set to a flat neutral.
 *
 * ONE SCALING OBJECT
 * The panel's type is sized in `em` off a container query, so the whole
 * exchange holds its designed proportion as the column narrows instead of the
 * chat bubbles swamping it. Below lg the two columns stack and the panel keeps
 * the full width.
 *
 * THE PANEL IS ARIA-HIDDEN AND UNCOPYABLE. It is a scripted demonstration: the
 * copy on the left carries the section's meaning, and a screen reader should
 * not have to read out an invented conversation to reach it.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { chat } = salesEnablement;
const { panel } = chat;

export function SalesChat() {
  const reduce = useReducedMotion() ?? false;

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
    <section className="relative isolate overflow-hidden bg-[#2c4152] py-section-lg">
      {/* The slate room. Sits under everything. */}
      <Image
        src={chat.backdrop.src}
        alt={chat.backdrop.alt}
        width={chat.backdrop.width}
        height={chat.backdrop.height}
        aria-hidden="true"
        sizes="100vw"
        className="pointer-events-none absolute inset-0 -z-10 size-full object-cover"
      />

      <Container width="wide">
        <div
          className={cn(
            "grid items-start gap-12",
            "lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1fr)] lg:gap-12",
            "xl:gap-16",
          )}
        >
          {/* =========================== Statement ==================== */}
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "font-mono text-[0.6875rem] font-medium uppercase",
                "tracking-[0.22em] text-[#8fd6d0] sm:text-xs",
              )}
            >
              {chat.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.08)}
              className={cn(
                "mt-6 font-display font-bold tracking-[-0.03em]",
                "leading-[1.1] text-white",
                "text-[2rem] sm:text-[2.5rem] xl:text-[3rem]",
              )}
            >
              {chat.headline.map((line) => (
                <span key={line} className="inline lg:block">
                  {line}{" "}
                </span>
              ))}
            </motion.h2>

            <motion.p
              {...rise(0.16)}
              className={cn(
                "mt-6 max-w-[33rem] leading-relaxed text-pretty",
                "text-[1rem] text-white/72 sm:text-[1.0625rem]",
              )}
            >
              {chat.description}
            </motion.p>

            {/* ---------------------- Capabilities ------------------ */}
            <ul className="mt-9 grid max-w-[33rem] gap-5">
              {chat.points.map((point, index) => {
                const Icon = chatIcons[point.icon];

                return (
                  <motion.li
                    key={point.label}
                    {...rise(0.24 + index * 0.07)}
                    className="flex items-center gap-5"
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "grid size-11 shrink-0 place-items-center rounded-full",
                        "border border-[#5cc9c2]/45 text-[#8fd6d0]",
                      )}
                    >
                      <Icon className="size-5" />
                    </span>
                    <span className="text-[1rem] leading-snug text-white/90">
                      {point.label}
                    </span>
                  </motion.li>
                );
              })}
            </ul>

            {/* -------------------------- CTA ----------------------- */}
            <motion.div {...rise(0.48)}>
              <Link
                href={chat.cta.href}
                className={cn(
                  "group mt-10 inline-flex items-center gap-3 rounded-full",
                  "bg-[#5cc9c2] px-8 py-4 text-[1.0625rem] font-medium",
                  "text-[#16323c] transition-colors hover:bg-[#74d6d0]",
                )}
              >
                {chat.cta.label}
                <ArrowGlyph />
              </Link>
            </motion.div>

            {/* ------------------- Note and word stack -------------- */}
            <motion.div
              {...rise(0.56)}
              className="mt-14 flex flex-wrap items-start gap-x-16 gap-y-8"
            >
              <p
                className={cn(
                  "font-hand text-[1.5rem] leading-[1.35] whitespace-pre-line",
                  "text-white/55",
                )}
              >
                {chat.note}
              </p>

              <ul className="grid gap-2">
                {chat.words.map((word) => (
                  <li
                    key={word}
                    className={cn(
                      "font-mono text-[0.6875rem] uppercase",
                      "tracking-[0.28em] text-white/40",
                    )}
                  >
                    {word}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* The short rule the design draws under the note. */}
            <motion.span
              {...rise(0.62)}
              aria-hidden="true"
              className="mt-8 block h-px w-16 bg-white/25"
            />
          </div>

          {/* ============================ Panel ======================= */}
          {/* A scripted demonstration: aria-hidden and uncopyable. */}
          <Uncopyable aria-hidden className="@container">
            <motion.div
              {...rise(0.2)}
              className={cn(
                "rounded-[1.1em] border border-white/14",
                // Translucent on purpose: the room reads through it, so the
                // panel sits in the scene rather than on top of it.
                "bg-[#33495c]/72 p-[1.5em] backdrop-blur-md",
                "text-[length:var(--ui)]",
                "shadow-[0_40px_90px_-40px_rgb(0_0_0/0.75)]",
              )}
              style={{ ["--ui" as string]: "clamp(0.72rem, 1.85cqw, 1.05rem)" }}
            >
              {/* --------------------- Panel header ---------------- */}
              <div className="flex items-center gap-[0.8em]">
                <Glyph name="bubble" className="size-[1.9em] text-white" />
                <span className="font-display text-[1.6em] font-bold tracking-[-0.02em] text-white">
                  {panel.brand}
                </span>
                <span
                  aria-hidden="true"
                  className="h-[1.4em] w-px bg-white/25"
                />
                <span className="text-[1em] text-white/62">
                  {panel.context}
                </span>
              </div>

              {/* Grounding chip */}
              <span
                className={cn(
                  "mt-[1.1em] inline-flex items-center gap-[0.6em]",
                  "rounded-full border border-white/20 px-[1em] py-[0.55em]",
                  "text-[0.95em] text-white/80",
                )}
              >
                <Glyph name="book" className="size-[1.25em]" />
                {panel.grounding}
              </span>

              {/* ------------------ The seller's turn -------------- */}
              <motion.div
                initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: "some" }}
                transition={{ duration: 0.5, delay: 0.45, ease: easeOut }}
                className="mt-[1.2em] flex items-start gap-[0.9em]"
              >
                <Image
                  src={panel.question.avatar.src}
                  alt=""
                  width={panel.question.avatar.width}
                  height={panel.question.avatar.height}
                  className="size-[3em] shrink-0 rounded-full object-cover"
                />

                <span className="min-w-0 flex-1">
                  <span
                    className={cn(
                      "block rounded-[0.7em] bg-[#9dc4d8]/28 px-[1.1em] py-[0.9em]",
                      "text-[1.05em] leading-relaxed text-white",
                    )}
                  >
                    {panel.question.body}
                  </span>
                  <span className="mt-[0.45em] block text-right text-[0.85em] text-white/45">
                    {panel.question.time}
                  </span>
                </span>
              </motion.div>

              {/* ------------------ LurnyChat's turn --------------- */}
              <motion.div
                initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: "some" }}
                transition={{ duration: 0.5, delay: 0.6, ease: easeOut }}
                className="mt-[1em] flex items-start gap-[0.9em]"
              >
                <span
                  className={cn(
                    "grid size-[3em] shrink-0 place-items-center rounded-full",
                    "border border-[#5cc9c2]/50 bg-[#5cc9c2]/16 text-[#8fd6d0]",
                  )}
                >
                  <Glyph name="sparkle" className="size-[1.5em]" />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block text-[0.95em] text-white/65">
                    {panel.answer.author}
                  </span>

                  {/* The reply card. Light, unlike everything around it —
                      the design gives the answer its own paper. */}
                  <span
                    className={cn(
                      "mt-[0.5em] block rounded-[0.7em] bg-[#f4f2ec]",
                      "px-[1.2em] py-[1.1em]",
                    )}
                  >
                    <span className="grid gap-[1em]">
                      {panel.answer.steps.map((step, index) => (
                        <span key={step.title} className="flex gap-[0.85em]">
                          <span
                            className={cn(
                              "grid size-[1.9em] shrink-0 place-items-center",
                              "rounded-full bg-[#1f6f6a] text-[0.85em]",
                              "font-semibold text-white",
                            )}
                          >
                            {index + 1}
                          </span>
                          <span className="min-w-0">
                            <span className="block font-semibold text-[1.05em] text-[#16323c]">
                              {step.title}
                            </span>
                            <span className="mt-[0.25em] block text-[1em] leading-relaxed text-[#16323c]/72">
                              {step.body}
                            </span>
                          </span>
                        </span>
                      ))}
                    </span>

                    {/* Source line */}
                    <span className="mt-[1.1em] flex items-center gap-[0.7em] border-t border-[#16323c]/12 pt-[0.9em]">
                      <Glyph
                        name="book"
                        className="size-[1.3em] shrink-0 text-[#16323c]/55"
                      />
                      <span
                        className={cn(
                          "rounded-[0.4em] bg-[#16323c]/8 px-[0.7em] py-[0.35em]",
                          "text-[0.9em] text-[#16323c]/72",
                        )}
                      >
                        {panel.answer.source}
                      </span>
                      <span className="ml-auto shrink-0 text-[0.85em] text-[#16323c]/45">
                        {panel.answer.time}
                      </span>
                    </span>
                  </span>
                </span>
              </motion.div>

              {/* ---------------------- Follow-up chips ------------ */}
              <motion.div
                initial={reduce ? { opacity: 1 } : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: "some" }}
                transition={{ duration: 0.5, delay: 0.78, ease: easeOut }}
                className="mt-[1.1em] flex flex-wrap gap-[0.8em]"
              >
                {panel.chips.map((chip) => (
                  <span
                    key={chip.label}
                    className={cn(
                      "inline-flex items-center gap-[0.6em] rounded-full",
                      "border border-white/22 px-[1.1em] py-[0.65em]",
                      "text-[0.98em] text-white/88",
                    )}
                  >
                    <Glyph name={chip.icon} className="size-[1.25em]" />
                    {chip.label}
                  </span>
                ))}
              </motion.div>

              {/* ------------------------ Composer ----------------- */}
              <motion.div
                initial={reduce ? { opacity: 1 } : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: "some" }}
                transition={{ duration: 0.5, delay: 0.88, ease: easeOut }}
                className={cn(
                  "mt-[1.2em] flex items-center gap-[0.9em] rounded-full",
                  "border border-white/18 bg-white/6 py-[0.6em] pr-[0.6em] pl-[1.4em]",
                )}
              >
                <span className="min-w-0 flex-1 truncate text-[1.05em] text-white/45">
                  {panel.input}
                </span>
                <span
                  className={cn(
                    "grid size-[2.6em] shrink-0 place-items-center rounded-full",
                    "bg-[#5cc9c2] text-[#16323c]",
                  )}
                >
                  <Glyph name="send" className="size-[1.3em]" />
                </span>
              </motion.div>
            </motion.div>
          </Uncopyable>
        </div>
      </Container>
    </section>
  );
}

/* ========================================================================== */
/* PARTS                                                                      */
/* ========================================================================== */

/** Pulls one glyph out of the set by name. */
function Glyph({
  name,
  className,
}: {
  name: keyof typeof chatIcons;
  className?: string;
}) {
  const Icon = chatIcons[name];
  return <Icon aria-hidden="true" className={className} />;
}

/** The CTA's arrow, which slides on hover. */
function ArrowGlyph() {
  const Icon = chatIcons.arrow;
  return (
    <Icon
      aria-hidden="true"
      className="size-5 transition-transform group-hover:translate-x-1"
    />
  );
}
