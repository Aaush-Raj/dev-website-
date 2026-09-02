"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { campus } from "@/content/campus";
import { cn } from "@/lib/utils";

import { railIcons } from "./CampusIcons";
import { CampusPanels } from "./CampusPanels";

/**
 * CAMPUS HERO
 * ---------------------------------------------------------------------------
 * Section 1 of the LurnyCampus page: the statement on the left, three floating
 * product panels on the right, over a photograph of a student at a laptop —
 * with the four student questions on a raised rail along the foot.
 *
 * THE BACKDROP
 * The photograph is a full-bleed layer behind everything, scrimmed so the copy
 * stays legible over it. The scrim is heaviest on the left, where the statement
 * sits, and lifts across the panels so the library still reads behind them.
 *
 * THE RAIL
 * The design floats the four questions on a lighter teal slab that overlaps the
 * photograph's lower edge. It is inside this section rather than its own,
 * because it is cropped by the hero's bounds and belongs to the same frame.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { hero } = campus;

export function CampusHero() {
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
        "relative isolate overflow-hidden text-white",
        // The deep teal ground, sampled from the design. It also shows through
        // wherever the backdrop is scrimmed out.
        "bg-[#062a30]",
        // Extra top padding: this is the first section under the floating nav
        // pill, so it needs clearance the mid-page sections do not.
        "pt-28 pb-0 sm:pt-32 lg:pt-36",
      )}
    >
      {/* ========================= The backdrop ====================== */}
      <Image
        src={hero.backdrop.src}
        alt={hero.backdrop.alt}
        width={hero.backdrop.width}
        height={hero.backdrop.height}
        aria-hidden="true"
        // Above the fold, so it must not lazy-load.
        priority
        sizes="100vw"
        className={cn(
          "pointer-events-none absolute inset-0 -z-20 size-full",
          // Anchored right: the student sits on that side of the frame and the
          // copy needs the left clear.
          "object-cover object-[68%_center]",
        )}
      />

      {/* The scrim — heaviest over the copy, lifting across the panels. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: [
            "linear-gradient(90deg, rgb(6 42 48 / 0.97) 0%, rgb(6 42 48 / 0.92) 32%, rgb(6 42 48 / 0.62) 58%, rgb(6 42 48 / 0.35) 100%)",
            "linear-gradient(180deg, rgb(6 42 48 / 0.8) 0%, transparent 22%, transparent 64%, rgb(6 42 48 / 0.55) 100%)",
          ].join(","),
        }}
      />

      {/* ===================== The connector thread ================== */}
      {/*
        The dotted S-curve threading between the statement and the student, with
        two accent dots on it. Decorative: it suggests the journey the copy
        describes. Hidden below lg, where the two columns stack and the curve
        would cut across the text.
      */}
      <svg
        aria-hidden="true"
        viewBox="0 0 200 400"
        preserveAspectRatio="none"
        className={cn(
          "pointer-events-none absolute -z-10 hidden lg:block",
          "top-24 left-[42%] h-[62%] w-40",
        )}
      >
        <motion.path
          d="M60 10C130 70 20 150 90 220s-10 130 40 170"
          fill="none"
          stroke="rgb(255 255 255 / 0.28)"
          strokeWidth="1.5"
          strokeDasharray="2 9"
          strokeLinecap="round"
          initial={reduce ? "shown" : "hidden"}
          whileInView="shown"
          viewport={{ once: true, amount: "some" }}
          variants={{
            hidden: { pathLength: 0, opacity: 0 },
            shown: {
              pathLength: 1,
              opacity: 1,
              transition: { duration: 1.8, delay: 0.6, ease: easeOut },
            },
          }}
        />

        {/* The two accent dots the design sets on the curve. */}
        <motion.circle
          cx="118"
          cy="42"
          r="4"
          fill="#e8563a"
          initial={reduce ? "shown" : "hidden"}
          whileInView="shown"
          viewport={{ once: true, amount: "some" }}
          variants={{
            hidden: { scale: 0, opacity: 0 },
            shown: {
              scale: 1,
              opacity: 1,
              transition: { duration: 0.5, delay: 1.3, ease: easeOut },
            },
          }}
          style={{ transformOrigin: "118px 42px" }}
        />
        <motion.circle
          cx="34"
          cy="196"
          r="4"
          fill="#e8563a"
          initial={reduce ? "shown" : "hidden"}
          whileInView="shown"
          viewport={{ once: true, amount: "some" }}
          variants={{
            hidden: { scale: 0, opacity: 0 },
            shown: {
              scale: 1,
              opacity: 1,
              transition: { duration: 0.5, delay: 1.5, ease: easeOut },
            },
          }}
          style={{ transformOrigin: "34px 196px" }}
        />
        <motion.circle
          cx="74"
          cy="120"
          r="3"
          fill="#3fa2a2"
          initial={reduce ? "shown" : "hidden"}
          whileInView="shown"
          viewport={{ once: true, amount: "some" }}
          variants={{
            hidden: { scale: 0, opacity: 0 },
            shown: {
              scale: 1,
              opacity: 1,
              transition: { duration: 0.5, delay: 1.4, ease: easeOut },
            },
          }}
          style={{ transformOrigin: "74px 120px" }}
        />
      </svg>

      <Container width="wide" className="relative pb-16 lg:pb-24">
        <div
          className={cn(
            "grid grid-cols-1 items-center gap-14",
            // Measured from the design: the statement runs to roughly 46% of
            // the frame, the panels take the rest.
            "lg:grid-cols-[minmax(0,1fr)_minmax(0,0.82fr)] lg:gap-10",
            "xl:gap-16",
          )}
        >
          {/* =========================== Statement ===================== */}
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "text-[0.75rem] font-bold uppercase",
                "tracking-[0.22em] text-[#f4603c] sm:text-[0.8125rem]",
              )}
            >
              {hero.eyebrow}
            </motion.p>

            <motion.h1
              {...rise(0.08)}
              className={cn(
                "mt-7 font-display font-bold tracking-[-0.035em]",
                "leading-[1.06] text-white",
                // Measured from the design at ~60px on a 1440 frame.
                "text-[2.25rem] sm:text-[3rem] xl:text-[3.75rem]",
              )}
            >
              {hero.headline.map((line, index) => (
                <span key={line} className="inline lg:block">
                  {line}
                  {/* The coral full stop closes the last line. Decorative
                      punctuation on a heading, so it is hidden from screen
                      readers rather than announced as a stray character. */}
                  {index === hero.headline.length - 1 && (
                    <span aria-hidden="true" className="text-[#f4603c]">
                      .
                    </span>
                  )}{" "}
                </span>
              ))}
            </motion.h1>

            <motion.p
              {...rise(0.16)}
              className={cn(
                "mt-7 max-w-[29rem] leading-relaxed text-pretty",
                "text-[1.0625rem] text-[#c6d5d6] sm:text-lg",
              )}
            >
              {hero.description}
            </motion.p>

            {/* --------------------------- Actions -------------------- */}
            <motion.div
              {...rise(0.24)}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Link
                href={hero.actions.primary.href}
                className={cn(
                  "inline-flex h-14 items-center justify-center rounded-lg px-8",
                  "bg-[#ef5b34] text-[1rem] font-semibold text-white",
                  // `translate`, not `transform`: Tailwind v4 compiles the
                  // translate utilities to the standalone property.
                  "duration-normal transition-[background-color,box-shadow,translate] ease-out",
                  "will-change-[translate]",
                  "hover:-translate-y-0.5 hover:bg-[#ff6c44]",
                  "hover:shadow-[0_16px_36px_-12px_rgb(239_91_52/0.6)]",
                  "active:translate-y-0",
                )}
              >
                {hero.actions.primary.label}
              </Link>

              <Link
                href={hero.actions.secondary.href}
                className={cn(
                  "inline-flex h-14 items-center justify-center rounded-lg px-8",
                  "border border-white/35 text-[1rem] font-semibold text-white",
                  "duration-normal transition-[background-color,border-color,translate] ease-out",
                  "will-change-[translate]",
                  "hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/10",
                  "active:translate-y-0",
                )}
              >
                {hero.actions.secondary.label}
              </Link>
            </motion.div>
          </div>

          {/* ============================ Panels ======================= */}
          <CampusPanels />
        </div>
      </Container>

      {/* ========================== The rail ========================= */}
      {/*
        The four questions on their own raised slab. It is full-width inside the
        container and rounded at the top only, so it reads as rising out of the
        section's foot exactly as the design shows.
      */}
      <Container width="wide" className="relative">
        <motion.ul
          {...rise(0.6)}
          className={cn(
            "grid rounded-t-2xl bg-[#0a3d45]",
            "px-6 py-9 sm:px-10 lg:py-10",
            "grid-cols-1 gap-9 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0",
          )}
          style={
            {
              "--rail-ring": "#2f7f80",
              "--rail-mark": "#f5f1e8",
              "--rail-dot": "#f4603c",
            } as React.CSSProperties
          }
        >
          {hero.questions.map((question, index) => {
            const Icon = railIcons[question.icon];

            return (
              <li
                key={question.label}
                className={cn(
                  "group/q flex flex-col items-center gap-4 text-center",
                  // The rules fall only BETWEEN items — a left border on every
                  // item but the first, never a stray outer edge.
                  index > 0 && "lg:border-l lg:border-white/12",
                  "lg:px-6",
                )}
              >
                <Icon
                  className={cn(
                    "size-12 shrink-0",
                    "duration-normal transition-[scale] ease-out",
                    "will-change-[scale] group-hover/q:scale-110",
                  )}
                />

                <span
                  className={cn(
                    "text-[0.8125rem] font-semibold tracking-[0.1em] uppercase",
                    "text-pretty text-[#dfeaea] sm:text-[0.875rem]",
                  )}
                >
                  {question.label}
                </span>
              </li>
            );
          })}
        </motion.ul>
      </Container>
    </section>
  );
}
