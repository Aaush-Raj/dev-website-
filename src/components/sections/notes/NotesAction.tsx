"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { notes } from "@/content/notes";
import { cn } from "@/lib/utils";

/**
 * NOTES ACTION
 * ---------------------------------------------------------------------------
 * Section 4 of the LurnyNotes page: the statement and three capability notes on
 * the left, the workflow diagram on the right — the meeting note, the actions
 * it produces and the follow-up it drafts.
 *
 * THE DIAGRAM
 * One supplied image rather than markup, for the same reason as section 3's:
 * it is a composed product mockup whose internal type is far below reading size
 * at the rendered scale. See scripts/build-notes-action-assets.cjs.
 *
 * It sits fully inside the container here — unlike section 3's, which bleeds
 * off the right edge. The design frames this one whole, and its own artwork
 * already carries the "completed" pill above the note, so cropping it would
 * cut that off.
 *
 * THE FEATURES
 * Two lines each — a title and a description — where section 3's are single
 * labels, so this section renders its own list rather than sharing that markup.
 * The rules fall BETWEEN the notes, never above the first or below the last.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { action } = notes;

export function NotesAction() {
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
        "relative isolate overflow-hidden py-section-lg",
        // The warm off-white ground, sampled from the design.
        "bg-[#faf4f1]",
      )}
    >
      <Container width="wide">
        <div
          className={cn(
            "grid items-center gap-14",
            // Measured from the design: the statement runs to roughly 40% of
            // the frame, the diagram takes the rest.
            "lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1fr)] lg:gap-10",
            "xl:gap-16",
          )}
        >
          {/* =========================== Statement ===================== */}
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "font-mono text-[0.75rem] font-medium uppercase",
                "tracking-[0.16em] text-[#1056f3] sm:text-sm",
              )}
            >
              {action.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.08)}
              className={cn(
                "mt-7 font-display font-bold tracking-[-0.035em]",
                "leading-[1.1] text-neutral-950",
                // Measured from the design at ~58px on a 1440 frame.
                "text-[2.125rem] sm:text-[2.75rem] xl:text-[3.375rem]",
              )}
            >
              {action.headline.map((line, index) => (
                <span key={line} className="block">
                  {line}
                  {/* The amber full stop closing the last line, as the hero
                      and section 2 also set it. Decorative punctuation on a
                      heading, so it is hidden from screen readers rather than
                      announced as a stray character. */}
                  {index === action.headline.length - 1 && (
                    <span aria-hidden="true" className="text-[#fdb237]">
                      .
                    </span>
                  )}
                </span>
              ))}
            </motion.h2>

            <motion.p
              {...rise(0.16)}
              className={cn(
                "mt-7 max-w-124 leading-relaxed text-pretty",
                "text-[1.0625rem] text-neutral-600 sm:text-lg",
              )}
            >
              {action.description}
            </motion.p>

            {/* -------------------------- Features -------------------- */}
            <motion.ul {...rise(0.24)} className="mt-12">
              {action.features.map((feature, index) => (
                <li
                  key={feature.title}
                  className={cn(
                    "flex items-start gap-5 py-6",
                    index > 0 && "border-t border-neutral-300/70",
                  )}
                >
                  {/* The rounded square is part of the icon asset, so no box
                      is drawn here. */}
                  <Image
                    src={feature.icon.src}
                    alt=""
                    width={feature.icon.width}
                    height={feature.icon.height}
                    // Decorative: the title beside it carries the meaning.
                    aria-hidden="true"
                    className="size-12 shrink-0"
                  />

                  <span className="min-w-0">
                    <span className="block text-[1.0625rem] font-semibold text-pretty text-neutral-950 sm:text-lg">
                      {feature.title}
                    </span>
                    <span className="mt-1.5 block max-w-104 text-[0.9375rem] leading-relaxed text-pretty text-neutral-600 sm:text-base">
                      {feature.description}
                    </span>
                  </span>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* =========================== Diagram ======================= */}
          <motion.div
            initial={reduce ? "shown" : "hidden"}
            whileInView="shown"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: { opacity: 0, y: 26 },
              shown: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, delay: 0.18, ease: easeOut },
              },
            }}
          >
            <Image
              src={action.diagram.src}
              alt={action.diagram.alt}
              width={action.diagram.width}
              height={action.diagram.height}
              sizes="(min-width: 1024px) 56vw, 100vw"
              className="h-auto w-full"
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
