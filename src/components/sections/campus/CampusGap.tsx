"use client";

import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { campus } from "@/content/campus";
import { cn } from "@/lib/utils";

import { problemIcons } from "./CampusIcons";
import { CampusJourney } from "./CampusJourney";

/**
 * CAMPUS — THE READINESS GAP
 * ---------------------------------------------------------------------------
 * Section 2: the problem on the left, the connected journey on the right.
 *
 * The two halves are deliberately unequal — the design gives the diagram more
 * room than the prose, because the diagram is the argument and the prose only
 * sets it up.
 *
 * The cream ground is a flat colour, not the supplied background PNG: that
 * asset is a solid #fefaf9 field with no texture in it, so shipping a 1672px
 * image to paint one colour would be a wasted request.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { gap } = campus;

export function CampusGap() {
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
    <section className="relative isolate overflow-hidden bg-[#fefaf9] py-20 lg:py-28">
      {/* ===================== The drifting thread ==================== */}
      {/*
        The faint dotted curve the design runs behind the problem cards, with
        two coral dots on it. Purely atmospheric — it echoes the connector in
        the hero — so it is hidden from assistive tech and from small screens,
        where it would cross the text.
      */}
      <svg
        aria-hidden="true"
        viewBox="0 0 300 500"
        preserveAspectRatio="none"
        className="pointer-events-none absolute top-1/3 -left-4 -z-10 hidden h-2/3 w-80 lg:block"
      >
        <motion.path
          d="M120 0C40 60 250 130 170 220S20 350 90 430s60 60 60 70"
          fill="none"
          stroke="rgb(13 77 77 / 0.14)"
          strokeWidth="1.5"
          strokeDasharray="2 10"
          strokeLinecap="round"
          initial={reduce ? "shown" : "hidden"}
          whileInView="shown"
          viewport={{ once: true, amount: "some" }}
          variants={{
            hidden: { pathLength: 0, opacity: 0 },
            shown: {
              pathLength: 1,
              opacity: 1,
              transition: { duration: 2, delay: 0.4, ease: easeOut },
            },
          }}
        />
        <motion.circle
          cx="232"
          cy="150"
          r="4"
          fill="#f4603c"
          initial={reduce ? "shown" : "hidden"}
          whileInView="shown"
          viewport={{ once: true, amount: "some" }}
          variants={{
            hidden: { scale: 0 },
            shown: {
              scale: 1,
              transition: { duration: 0.45, delay: 1.4, ease: easeOut },
            },
          }}
          style={{ transformOrigin: "232px 150px" }}
        />
        <motion.circle
          cx="238"
          cy="300"
          r="4"
          fill="#f4603c"
          initial={reduce ? "shown" : "hidden"}
          whileInView="shown"
          viewport={{ once: true, amount: "some" }}
          variants={{
            hidden: { scale: 0 },
            shown: {
              scale: 1,
              transition: { duration: 0.45, delay: 1.6, ease: easeOut },
            },
          }}
          style={{ transformOrigin: "238px 300px" }}
        />
      </svg>

      <Container width="wide">
        <div
          className={cn(
            "grid grid-cols-1 items-start gap-14",
            // Measured from the design: the prose runs to roughly 40% of the
            // frame, the diagram takes the rest.
            "lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1fr)] lg:gap-14",
            "xl:gap-20",
          )}
        >
          {/* ========================= The problem ===================== */}
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "text-[0.75rem] font-bold tracking-[0.16em] uppercase",
                "text-[#f65433] sm:text-[0.8125rem]",
              )}
            >
              {gap.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.08)}
              className={cn(
                "mt-6 font-display font-bold tracking-[-0.03em]",
                "leading-[1.12] text-[#0b1a22]",
                // Measured from the design at ~44px on a 1440 frame.
                "text-[1.875rem] sm:text-[2.25rem] xl:text-[2.75rem]",
              )}
            >
              {gap.headline.map((line, index) => (
                <span key={line} className="inline lg:block">
                  {line}
                  {/* The coral full stop closes the last line. Decorative, so
                      it is hidden rather than announced as a stray glyph. */}
                  {index === gap.headline.length - 1 && (
                    <span aria-hidden="true" className="text-[#f65433]">
                      .
                    </span>
                  )}{" "}
                </span>
              ))}
            </motion.h2>

            <motion.p
              {...rise(0.16)}
              className={cn(
                "mt-6 max-w-[32rem] leading-relaxed text-pretty",
                "text-[1rem] text-[#3f5158] sm:text-[1.0625rem]",
              )}
            >
              {gap.description}
            </motion.p>

            {/* ------------------------ The symptoms ------------------ */}
            {/*
              Divided by hairlines rather than boxed: the rules are top borders
              on every item but the first, so a line falls only BETWEEN them.
            */}
            <ul className="mt-10 lg:mt-12">
              {gap.problems.map((problem, index) => {
                const Icon = problemIcons[problem.icon];

                return (
                  <motion.li
                    key={problem.title}
                    {...rise(0.24 + index * 0.1)}
                    className={cn(
                      "group/sym flex gap-5 py-6",
                      index > 0 && "border-t border-[#e2dcd6]",
                    )}
                  >
                    <span
                      className={cn(
                        "grid size-14 shrink-0 place-items-center rounded-xl",
                        "border border-[#9dbdbd] bg-[#fffdfc]",
                        "duration-normal transition-[border-color,box-shadow,translate] ease-out",
                        "will-change-[translate] group-hover/sym:-translate-y-0.5",
                        "group-hover/sym:border-[#0d4d4d]",
                        "group-hover/sym:shadow-[0_12px_24px_-14px_rgb(13_77_77/0.55)]",
                      )}
                    >
                      <Icon className="size-8" />
                    </span>

                    <span className="min-w-0">
                      <span className="block text-[1rem] font-bold text-pretty text-[#0b1a22]">
                        {problem.title}
                      </span>
                      <span className="mt-1.5 block text-[0.9375rem] leading-relaxed text-pretty text-[#4a5a60]">
                        {problem.description}
                      </span>
                    </span>
                  </motion.li>
                );
              })}
            </ul>
          </div>

          {/* ======================== The journey ====================== */}
          <CampusJourney />
        </div>
      </Container>
    </section>
  );
}
