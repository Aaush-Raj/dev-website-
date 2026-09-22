"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { sop } from "@/content/sop";
import { cn } from "@/lib/utils";

import { stepIcons, type StepIconKey } from "./SopIcons";
import { SopWorkflowStack } from "./SopWorkflowStack";

/**
 * SOP CONTEXT
 * ---------------------------------------------------------------------------
 * Section 3 of the LurnySOP page: the workflow card stack on the left, the
 * statement and three steps on the right.
 *
 * THE COLUMNS ARE MIRRORED FROM SECTION 2, which is the design's alternation —
 * there the copy leads on the left, here on the right. Below lg both stack,
 * and `order` puts the COPY FIRST: on a phone the argument should arrive
 * before its illustration, which the comp's own reading order agrees with.
 *
 * COLOURS ARE MEASURED from section3.png: the mint headline line is #b3fae6,
 * the eyebrow #c1aae9, body copy #b6cde3, and each step's glyph takes the
 * accent the comp gives it (violet, mint, amber, in order).
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { context } = sop;

/** Each step's glyph colour, sampled from the comp. */
const stepAccents: Record<StepIconKey, string> = {
  company: "#b37dfc",
  applies: "#77eec9",
  plan: "#f7903a",
};

export function SopContext() {
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

  const shownNow = { opacity: 1, y: 0, transition: { duration: 0 } };

  const list = reduce
    ? { hidden: {}, shown: {} }
    : {
        hidden: {},
        shown: { transition: { delayChildren: 0.3, staggerChildren: 0.12 } },
      };

  const step = reduce
    ? { hidden: shownNow, shown: shownNow }
    : {
        hidden: { opacity: 0, y: 16 },
        shown: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: easeOut },
        },
      };

  return (
    <section
      className={cn(
        // The backdrop's own darkest slate, so the light copy has something to
        // sit on for the moment before the image paints.
        "relative isolate overflow-hidden bg-[#12293c] text-white",
        "py-16 sm:py-20 lg:py-24",
      )}
    >
      <Image
        src="/assets/images/sop/context-backdrop.webp"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="-z-10 object-cover"
      />

      <Container width="hero" className="relative">
        <div
          className={cn(
            "grid grid-cols-1 items-center gap-12",
            // Measured from the comp: the card stack takes the left half, the
            // copy a little under half on the right.
            "lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:gap-12",
            "xl:gap-16",
          )}
        >
          {/* ====================== The workflow stack ================= */}
          {/*
            Second in source order so the copy comes first when the two stack
            below lg; `lg:order-first` restores the comp's arrangement once
            they sit side by side.
          */}
          <div className="order-2 lg:order-first">
            {/* The caption IS exposed — it describes the illustration rather
                than being part of it, so it stays outside Uncopyable. */}
            <p className="mb-3 text-[0.8125rem] text-[#a7c0d7]">
              {context.illustrationLabel}
            </p>
            <SopWorkflowStack />
          </div>

          {/* =========================== Statement ===================== */}
          <div className="order-1 lg:order-last">
            <motion.p
              {...rise(0)}
              className={cn(
                "text-[0.75rem] font-semibold tracking-[0.2em] uppercase",
                "text-[#c1aae9] sm:text-[0.8125rem]",
              )}
            >
              {context.eyebrow}
            </motion.p>

            {/*
              Three lines, the last in mint. Each line carries a trailing space
              so the accessible name reads as sentences rather than running the
              words together across the breaks.
            */}
            <motion.h2
              {...rise(0.08)}
              className={cn(
                "mt-5 font-display font-bold tracking-[-0.035em]",
                "leading-[1.06]",
                "text-[2rem] sm:text-[2.5rem] xl:text-[3.25rem]",
              )}
            >
              {context.headline.map((line, index) => (
                <span
                  key={line.text}
                  className={cn(
                    "block",
                    line.accent ? "text-[#b3fae6]" : "text-white",
                  )}
                >
                  {line.text}
                  {index < context.headline.length - 1 && " "}
                </span>
              ))}
            </motion.h2>

            <motion.p
              {...rise(0.16)}
              className={cn(
                "mt-6 max-w-[34rem] leading-relaxed text-pretty",
                "text-[1rem] text-[#b6cde3] sm:text-[1.0625rem]",
              )}
            >
              {context.description}
            </motion.p>

            {/* ------------------------- The steps -------------------- */}
            <motion.ul
              initial={reduce ? "shown" : "hidden"}
              whileInView="shown"
              viewport={{ once: true, amount: 0.2 }}
              variants={list}
              className="mt-9 space-y-6"
            >
              {context.steps.map((item) => {
                const Glyph = stepIcons[item.id as StepIconKey];
                return (
                  <motion.li
                    key={item.id}
                    variants={step}
                    className="group/step flex items-start gap-4 sm:gap-5"
                  >
                    <span
                      style={{ color: stepAccents[item.id as StepIconKey] }}
                      className={cn(
                        "mt-0.5 shrink-0",
                        "transition-transform duration-300 ease-out",
                        "group-hover/step:scale-110",
                        "motion-reduce:transition-none motion-reduce:group-hover/step:scale-100",
                      )}
                    >
                      <Glyph className="size-9 sm:size-10" />
                    </span>

                    <div className="min-w-0">
                      <h3
                        className={cn(
                          "font-display font-bold tracking-[-0.015em] text-white",
                          "text-[1.0625rem] sm:text-[1.1875rem]",
                        )}
                      >
                        {item.title}
                      </h3>
                      <p
                        className={cn(
                          "mt-1 max-w-[30rem] leading-relaxed text-pretty",
                          "text-[0.9375rem] text-[#a6bdd4]",
                        )}
                      >
                        {item.body}
                      </p>
                    </div>
                  </motion.li>
                );
              })}
            </motion.ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
