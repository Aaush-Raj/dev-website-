"use client";

import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { sense } from "@/content/sense";
import { cn } from "@/lib/utils";

import {
  ArrowRightIcon,
  capabilityIcons,
  MoreIcon,
  problemIcons,
  QuoteMarkIcon,
  SavedDocIcon,
  UserIcon,
} from "./SenseIcons";

/**
 * LURNYSENSE — THE INSIGHT GAP
 * ---------------------------------------------------------------------------
 * Section 2: the problem on the left as three symptoms, and on the right the
 * same journey working — a dashboard, a question about it, and the report the
 * answer became.
 *
 * THE CONNECTORS
 * The design threads a green path between the three cards. It is drawn as one
 * absolutely positioned SVG behind them in a stretched viewBox, so it scales
 * with the card grid rather than needing coordinates that could drift. It is
 * lg-only: once the cards stack there is no diagonal gap left to thread.
 *
 * The cards are MOCKUPS — pictures of the product, not live views — so they are
 * hidden from assistive tech and every control in them is inert. The section's
 * argument is carried by the headings and the footnote, which are not hidden.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { gap } = sense;
const { problem, solution } = gap;

export function SenseGap() {
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
    <section className="relative bg-[#fefdfb] py-20 lg:py-24">
      <Container width="wide">
        <div
          className={cn(
            "grid grid-cols-1 gap-16",
            // The design gives the solution side more room: it carries three
            // cards where the problem side carries a list.
            "lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1fr)] lg:gap-14",
            "xl:gap-20",
          )}
        >
          {/* ========================= The problem ===================== */}
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "text-[0.75rem] font-semibold tracking-[0.16em] uppercase",
                "text-[#b58730] sm:text-[0.8125rem]",
              )}
            >
              {problem.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.08)}
              className={cn(
                "mt-5 font-display font-bold tracking-[-0.03em]",
                "leading-[1.1] text-[#0e1420]",
                // Measured from the design at ~46px on a 1440 frame.
                "text-[1.75rem] sm:text-[2.25rem] xl:text-[2.875rem]",
              )}
            >
              {problem.headline.map((line, index) => (
                <span key={line} className="inline lg:block">
                  {line}
                  {/* The design closes the sentence. Decorative punctuation, so
                      it is hidden rather than announced. */}
                  {index === problem.headline.length - 1 && (
                    <span aria-hidden="true">.</span>
                  )}{" "}
                </span>
              ))}
            </motion.h2>

            <motion.p
              {...rise(0.16)}
              className={cn(
                "mt-5 max-w-[32rem] leading-relaxed text-pretty",
                "text-[1rem] text-[#283444] sm:text-[1.0625rem]",
              )}
            >
              {problem.description}
            </motion.p>

            {/* ---------------------- The symptoms ------------------- */}
            {/* Divided by hairlines: a top border on every item but the first,
                so a rule falls only BETWEEN them. */}
            <ul className="mt-10">
              {problem.items.map((item, index) => {
                const Icon = problemIcons[item.icon];

                return (
                  <motion.li
                    key={item.title}
                    {...rise(0.24 + index * 0.1)}
                    className={cn(
                      "group/sym flex gap-5 py-6",
                      index > 0 && "border-t border-[#e6e2d9]",
                    )}
                  >
                    <span
                      className={cn(
                        "grid size-16 shrink-0 place-items-center rounded-xl",
                        "border border-[#cfe0d6] bg-white text-[#20614c]",
                        "duration-normal transition-[border-color,box-shadow,translate] ease-out",
                        "will-change-[translate] group-hover/sym:-translate-y-0.5",
                        "group-hover/sym:border-[#20614c]",
                        "group-hover/sym:shadow-[0_12px_24px_-14px_rgb(32_97_76/0.4)]",
                      )}
                    >
                      <Icon className="size-9" />
                    </span>

                    <span className="min-w-0 pt-0.5">
                      <span className="block text-[1.0625rem] font-bold text-pretty text-[#0e1420]">
                        {item.title}
                      </span>
                      <span className="mt-1.5 block text-[0.9375rem] leading-relaxed text-pretty text-[#4a5568]">
                        {item.description}
                      </span>
                    </span>
                  </motion.li>
                );
              })}
            </ul>
          </div>

          {/* ======================== The solution ===================== */}
          <div>
            <motion.p
              {...rise(0.1)}
              className={cn(
                "text-[0.75rem] font-semibold tracking-[0.16em] uppercase",
                "text-[#2f7d63] sm:text-[0.8125rem]",
              )}
            >
              {solution.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.18)}
              className={cn(
                "mt-5 font-display font-bold tracking-[-0.025em]",
                "leading-[1.16] text-balance text-[#0e1420]",
                "text-[1.5rem] sm:text-[1.875rem] xl:text-[2.25rem]",
              )}
            >
              {solution.headline}
            </motion.h2>

            {/* ------------------- The three cards ---------------- */}
            {/*
              A mockup of the journey. Hidden from assistive tech: the headings
              above and the footnote below carry the meaning, and announcing
              three cards of fake UI would bury it.
            */}
            <div aria-hidden="true" className="relative mt-8">
              {/* The connector path, behind the cards. lg-only: the diagonal
                  gaps it threads only exist once the cards are offset. */}
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="pointer-events-none absolute inset-0 -z-0 hidden size-full lg:block"
              >
                {[
                  /*
                    MEASURED from the rendered cards, not guessed: the dashboard
                    occupies 0-58% x / 0-34% y, the question card 42-100 / 26-69,
                    and the saved card 0-64 / 76-100. Each path leaves one card's
                    edge and meets the next, so they track the layout.
                  */
                  // Dashboard's right edge -> question card's left edge.
                  "M58 22 H62 Q66 22 66 26",
                  // Question card's lower-left -> saved card's top edge.
                  "M46 69 H36 Q30 69 30 74 V76",
                  // Saved card's right edge -> the follow-up bubble above it.
                  "M64 88 H72 Q78 88 78 82 V72",
                ].map((d, index) => (
                  <motion.path
                    key={d}
                    d={d}
                    fill="none"
                    stroke="#30725b"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    initial={reduce ? "shown" : "hidden"}
                    whileInView="shown"
                    viewport={{ once: true, amount: "some" }}
                    variants={{
                      hidden: { opacity: 0 },
                      shown: {
                        opacity: 1,
                        transition: {
                          duration: 0.5,
                          delay: 0.5 + index * 0.12,
                          ease: easeOut,
                        },
                      },
                    }}
                  />
                ))}
              </svg>

              {/* .................... Dashboard ................... */}
              <motion.div
                {...rise(0.3)}
                className={cn(
                  "relative z-10 w-full rounded-2xl border border-[#e6e2d9] bg-white p-4",
                  "shadow-[0_20px_44px_-28px_rgb(14_20_32/0.28)]",
                  "lg:w-[58%]",
                )}
              >
                <p className="flex items-center justify-between gap-4">
                  <span className="text-[0.875rem] font-semibold text-[#0e1420]">
                    {solution.dashboard.title}
                  </span>
                  <MoreIcon className="size-4 shrink-0 text-[#9aa3b0]" />
                </p>

                {/* The bar chart, drawn from the values in content/sense.ts. */}
                <span className="mt-4 flex h-24 items-end gap-1.5">
                  {solution.dashboard.bars.map((value, index) => (
                    <motion.span
                      key={index}
                      className="block flex-1 rounded-t-[2px] bg-[#67967f]"
                      style={{ height: `${value * 100}%` }}
                      initial={reduce ? "shown" : "hidden"}
                      whileInView="shown"
                      viewport={{ once: true, amount: "some" }}
                      variants={{
                        hidden: { opacity: 0 },
                        shown: {
                          opacity: 1,
                          transition: {
                            duration: 0.4,
                            delay: 0.45 + index * 0.04,
                          },
                        },
                      }}
                    />
                  ))}
                </span>

                {/* The muted legend strip the design shows beneath. */}
                <span className="mt-3 flex gap-2 border-t border-[#eeeae1] pt-3">
                  <span className="block h-2 w-16 rounded-full bg-[#e9e5dc]" />
                  <span className="block h-2 w-10 rounded-full bg-[#e9e5dc]" />
                  <span className="block h-2 w-12 rounded-full bg-[#e9e5dc]" />
                </span>
              </motion.div>

              {/* ..................... Question ................... */}
              <motion.div
                {...rise(0.42)}
                className={cn(
                  "relative z-20 mt-5 w-full rounded-2xl border border-[#e6e2d9] bg-white p-4",
                  "shadow-[0_24px_50px_-28px_rgb(14_20_32/0.32)]",
                  // Offset right on lg, overlapping the dashboard's corner as
                  // the design arranges them.
                  "lg:mt-[-4.5rem] lg:ml-[42%] lg:w-[58%]",
                )}
              >
                <div className="flex gap-3">
                  <QuoteMarkIcon className="mt-0.5 h-4 w-6 shrink-0 text-[#ac8e4e]" />
                  <p className="text-[0.9375rem] leading-snug font-medium text-pretty text-[#0e1420]">
                    {solution.question.text}
                  </p>
                </div>

                {/* The answer's chart. */}
                <div className="mt-4 rounded-xl bg-[#f7f6f2] p-3.5">
                  <p className="text-[0.8125rem] font-semibold text-[#0e1420]">
                    {solution.question.chartTitle}
                  </p>

                  <ul className="mt-3 space-y-2.5">
                    {solution.question.rows.map((row, index) => (
                      <li key={row.label} className="flex items-center gap-3">
                        <span className="w-16 shrink-0 text-[0.75rem] text-[#4a5568]">
                          {row.label}
                        </span>
                        <span className="h-2.5 min-w-0 flex-1 overflow-hidden rounded-full bg-[#e4e0d6]">
                          <motion.span
                            className="block h-full rounded-full bg-[#739d88]"
                            // Animated on width, not scaleX: a scaled bar starts
                            // at zero width, so `whileInView` could never see it.
                            initial={reduce ? "shown" : "hidden"}
                            whileInView="shown"
                            viewport={{ once: true, amount: "some" }}
                            variants={{
                              hidden: { width: "0%" },
                              shown: {
                                width: `${row.value * 100}%`,
                                transition: {
                                  duration: 0.65,
                                  delay: 0.6 + index * 0.1,
                                  ease: easeOut,
                                },
                              },
                            }}
                          />
                        </span>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-3 text-[0.6875rem] text-[#9aa3b0]">
                    {solution.question.disclaimer}
                  </p>
                </div>

                {/* The follow-up bubble, overlapping the card's lower edge. */}
                <div
                  className={cn(
                    "mt-4 flex items-center gap-2.5 rounded-full",
                    "border border-[#e0c98f] bg-white px-3.5 py-2.5",
                    "shadow-[0_10px_24px_-16px_rgb(14_20_32/0.4)]",
                    "lg:absolute lg:-right-4 lg:-bottom-6 lg:mt-0 lg:max-w-[80%]",
                  )}
                >
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-[#f2ede1] text-[#ad8a35]">
                    <UserIcon className="size-4" />
                  </span>
                  <span className="text-[0.8125rem] text-[#0e1420]">
                    {solution.question.followUp}
                  </span>
                </div>
              </motion.div>

              {/* ................... Saved report ................. */}
              <motion.div
                {...rise(0.54)}
                className={cn(
                  "relative z-10 mt-5 w-full rounded-2xl border border-[#e6e2d9] bg-white p-4",
                  "shadow-[0_20px_44px_-28px_rgb(14_20_32/0.28)]",
                  "lg:mt-6 lg:w-[64%]",
                )}
              >
                <p className="flex items-center justify-between gap-4">
                  <span className="text-[0.875rem] font-semibold text-[#0e1420]">
                    {solution.saved.title}
                  </span>
                  <MoreIcon className="size-4 shrink-0 text-[#9aa3b0]" />
                </p>

                <div className="mt-3 flex gap-3">
                  <SavedDocIcon className="size-8 shrink-0 text-[#20614c]" />

                  <span className="min-w-0">
                    <span className="block text-[0.9375rem] font-semibold text-pretty text-[#0e1420]">
                      {solution.saved.reportTitle}
                    </span>
                    <span className="mt-1 block text-[0.75rem] text-[#4a5568]">
                      {solution.saved.meta}
                    </span>

                    {/* Inert: a picture of a link. */}
                    <span className="mt-2.5 flex items-center gap-1.5 text-[0.8125rem] font-semibold text-[#20614c]">
                      {solution.saved.action}
                      <ArrowRightIcon className="size-3.5" />
                    </span>
                  </span>
                </div>
              </motion.div>
            </div>

            {/* ------------------ The capabilities ---------------- */}
            {/* Real content, not part of the mockup: divided by hairlines that
                fall only BETWEEN the three. */}
            <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-0">
              {solution.capabilities.map((capability, index) => {
                const Icon = capabilityIcons[capability.icon];

                return (
                  <motion.li
                    key={capability.label}
                    {...rise(0.7 + index * 0.08)}
                    className={cn(
                      "flex items-center gap-3",
                      index > 0 && "sm:border-l sm:border-[#e6e2d9] sm:pl-5",
                      index < solution.capabilities.length - 1 && "sm:pr-5",
                    )}
                  >
                    <Icon className="size-6 shrink-0 text-[#24664e]" />
                    <span className="text-[0.9375rem] text-pretty text-[#283444]">
                      {capability.label}
                    </span>
                  </motion.li>
                );
              })}
            </ul>

            <motion.p
              {...rise(0.92)}
              className="mt-8 text-[1rem] leading-relaxed text-pretty text-[#2d384e]"
            >
              {solution.footnote}
            </motion.p>
          </div>
        </div>
      </Container>
    </section>
  );
}
