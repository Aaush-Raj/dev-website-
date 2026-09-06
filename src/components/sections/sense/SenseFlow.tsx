"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { sense } from "@/content/sense";
import { cn } from "@/lib/utils";

import { CheckIcon, LeafIcon, SaveIcon, SendIcon } from "./SenseIcons";

/**
 * LURNYSENSE — ONE QUESTION OPENS UP THE NEXT
 * ---------------------------------------------------------------------------
 * Section 3: the claim over a photograph on the left, and on the right the
 * exchange it describes — three questions, each answered with its own chart,
 * closing on the report the thread was saved as.
 *
 * THE TRANSCRIPT
 * Questions sit right against the avatar; answers sit left behind the leaf
 * marker. Each answer carries a different chart shape (line, bars, paired
 * bars), all rebuilt in markup for the same reason as the other sections' —
 * they scale with their box and stay crisp, where a crop would not.
 *
 * The panel is a MOCKUP: it pictures a conversation rather than being one, so
 * it is hidden from assistive tech and the composer is inert. The section's
 * argument is carried by the heading, description and caption, which are not
 * hidden.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { flow } = sense;

/** The plot box every chart draws into, in viewBox units. */
const PLOT = { w: 100, h: 34 } as const;

/**
 * The line chart's path, as one polyline through the points. Built here rather
 * than inline so the markup below stays readable.
 */
function trendPath(points: readonly number[]) {
  const step = PLOT.w / (points.length - 1);
  return points
    .map(
      (value, i) => `${i === 0 ? "M" : "L"}${i * step} ${PLOT.h * (1 - value)}`,
    )
    .join(" ");
}

export function SenseFlow() {
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
    <section className="relative bg-[#f4f7f1] py-20 lg:py-24">
      <Container width="wide">
        <div
          className={cn(
            "grid grid-cols-1 items-start gap-12",
            // The transcript needs the greater share: it carries three
            // exchanges where the left carries a claim and a photograph.
            "lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1fr)] lg:gap-12",
            "xl:gap-16",
          )}
        >
          {/* ======================== The claim ======================== */}
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "text-[0.75rem] font-semibold tracking-[0.16em] uppercase",
                "text-[#8a8f85] sm:text-[0.8125rem]",
              )}
            >
              {flow.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.06)}
              className={cn(
                "mt-4 text-[2.25rem] leading-[1.05] font-semibold tracking-[-0.02em]",
                "text-[#1e2a20] sm:text-[2.75rem] lg:text-[3.25rem]",
              )}
            >
              {flow.headline}
            </motion.h2>

            <motion.p
              {...rise(0.12)}
              className={cn(
                "mt-4 max-w-[34rem] text-[1rem] leading-[1.6]",
                "text-[#55605a] sm:text-[1.0625rem]",
              )}
            >
              {flow.description}
            </motion.p>

            <motion.div
              {...rise(0.18)}
              className="mt-8 overflow-hidden rounded-[0.5rem]"
            >
              <Image
                src={flow.image.src}
                alt={flow.image.alt}
                width={flow.image.width}
                height={flow.image.height}
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="h-auto w-full"
              />
            </motion.div>

            <motion.p
              {...rise(0.24)}
              className={cn(
                "mt-6 text-[1.25rem] leading-[1.3] font-medium",
                "text-[#1e2a20] sm:text-[1.4375rem]",
              )}
            >
              {flow.caption}
            </motion.p>

            {/* The short amber rule closing the column. */}
            <motion.div
              {...rise(0.28)}
              className="mt-4 h-[3px] w-10 rounded-full bg-[#b58730]"
            />
          </div>

          {/* ====================== The transcript ===================== */}
          <motion.div
            {...rise(0.16)}
            aria-hidden="true"
            className={cn(
              "rounded-[0.75rem] border border-[#e4e9df] bg-white",
              "shadow-[0_1px_2px_rgba(30,42,32,0.04),0_12px_32px_-16px_rgba(30,42,32,0.16)]",
            )}
          >
            {/* --------------------- The title bar -------------------- */}
            <div
              className={cn(
                "flex items-center gap-3 border-b border-[#eef1ea]",
                "px-5 py-4 sm:px-6",
              )}
            >
              <span className="text-[0.9375rem] font-semibold text-[#1e2a20]">
                {flow.brand}
              </span>
              <span className="h-4 w-px bg-[#dfe4d9]" />
              <span className="text-[0.8125rem] text-[#8a8f85]">
                {flow.subtitle}
              </span>
            </div>

            <div className="space-y-5 px-5 py-5 sm:px-6 sm:py-6">
              {flow.turns.map((turn, index) => (
                <div key={turn.question} className="space-y-4">
                  {/* ------------------ The question ------------------ */}
                  <div className="flex items-start justify-end gap-2.5">
                    {/* The gold quote marks lead the first question only,
                        as in the design. */}
                    {index === 0 ? (
                      <span
                        className={cn(
                          "mt-1 shrink-0 font-serif text-[1.5rem] leading-none",
                          "text-[#c9a227]",
                        )}
                      >
                        &ldquo;
                      </span>
                    ) : null}

                    <p
                      className={cn(
                        "rounded-[0.5rem] bg-[#eef1ea] px-3.5 py-2.5",
                        "text-[0.8125rem] leading-[1.45] text-[#333d36]",
                      )}
                    >
                      {turn.question}
                    </p>

                    <Image
                      src={flow.avatar.src}
                      alt=""
                      width={flow.avatar.width}
                      height={flow.avatar.height}
                      className="mt-0.5 size-8 shrink-0 rounded-full object-cover"
                    />
                  </div>

                  {/* ------------------- The answer ------------------- */}
                  <div className="flex items-start gap-3">
                    <span
                      className={cn(
                        "mt-0.5 grid size-8 shrink-0 place-items-center rounded-full",
                        "bg-[#eef1ea] text-[#4b7a4a]",
                      )}
                    >
                      <LeafIcon className="size-4" />
                    </span>

                    <div
                      className={cn(
                        "min-w-0 flex-1 rounded-[0.5rem] border border-[#e9ede4]",
                        "bg-[#fcfdfb] px-4 py-3.5",
                      )}
                    >
                      <p className="text-[0.8125rem] leading-[1.45] text-[#333d36]">
                        {turn.answer}
                      </p>

                      <div className="mt-3">
                        {turn.chart.kind === "line" ? (
                          <LineChart chart={turn.chart} />
                        ) : turn.chart.kind === "bars" ? (
                          <RowBars chart={turn.chart} />
                        ) : (
                          <GroupedBars chart={turn.chart} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* --------------------- The save row -------------------- */}
              <div
                className={cn(
                  "flex flex-col gap-3 pt-1",
                  "sm:flex-row sm:items-stretch sm:gap-4",
                )}
              >
                <span
                  className={cn(
                    "flex items-center justify-center gap-2 rounded-[0.4rem]",
                    "border border-[#cfd8c8] bg-white px-4 py-3",
                    "text-[0.8125rem] font-medium text-[#333d36]",
                    "sm:w-[11rem] sm:shrink-0",
                  )}
                >
                  <SaveIcon className="size-4 text-[#4b7a4a]" />
                  {flow.save.action}
                </span>

                {/* The connector between the button and the saved report.
                    It only has a gap to cross once the row is side-by-side. */}
                <span className="hidden items-center sm:flex">
                  <span className="h-px w-10 bg-[#c5d0bd]" />
                  <span
                    className={cn(
                      "size-0 border-y-[4px] border-l-[6px]",
                      "border-y-transparent border-l-[#c5d0bd]",
                    )}
                  />
                </span>

                <span
                  className={cn(
                    "flex min-w-0 flex-1 items-center gap-3 rounded-[0.4rem]",
                    "border border-[#e4e9df] bg-white px-4 py-3",
                  )}
                >
                  <CheckIcon className="size-5 shrink-0 text-[#4b7a4a]" />
                  <span className="min-w-0">
                    <span className="block truncate text-[0.8125rem] font-medium text-[#1e2a20]">
                      {flow.save.report.title}
                    </span>
                    <span className="block text-[0.75rem] text-[#8a8f85]">
                      {flow.save.report.meta}
                    </span>
                  </span>
                </span>
              </div>

              {/* -------------------- The composer -------------------- */}
              <div
                className={cn(
                  "flex items-center gap-3 rounded-[0.5rem]",
                  "border border-[#e4e9df] bg-white py-2.5 pr-2.5 pl-4",
                )}
              >
                <span className="flex-1 text-[0.8125rem] text-[#a3a99e]">
                  {flow.composer.placeholder}
                </span>
                <span
                  className={cn(
                    "grid size-8 shrink-0 place-items-center rounded-full",
                    "bg-[#4b7a4a] text-white",
                  )}
                >
                  <SendIcon className="size-4" />
                </span>
              </div>

              <p className="text-right text-[0.6875rem] text-[#a3a99e]">
                {flow.disclaimer}
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

/* ========================================================================== */
/* THE CHARTS                                                                 */
/* ========================================================================== */

/** Turn 1: the completion trend, as a line with a dot at each reading. */
function LineChart({
  chart,
}: {
  chart: Extract<(typeof flow.turns)[number]["chart"], { kind: "line" }>;
}) {
  const step = PLOT.w / (chart.points.length - 1);

  return (
    <div className="rounded-[0.35rem] border border-[#eef1ea] bg-white px-3 py-3">
      <p className="text-[0.6875rem] font-medium text-[#55605a]">
        {chart.title}
      </p>

      <svg
        viewBox={`0 0 ${PLOT.w} ${PLOT.h}`}
        preserveAspectRatio="none"
        className="mt-2 h-16 w-full"
      >
        <path
          d={trendPath(chart.points)}
          fill="none"
          stroke="#4b7a4a"
          strokeWidth="0.9"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* The dots ride in their own layer so `preserveAspectRatio="none"`
          cannot stretch them into ovals. */}
      <div className="relative -mt-16 h-16">
        {chart.points.map((value, i) => (
          <span
            key={i}
            className="absolute size-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4b7a4a]"
            style={{
              left: `${((i * step) / PLOT.w) * 100}%`,
              top: `${(1 - value) * 100}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

/** Turn 2: completion by department, as a labelled row per department. */
function RowBars({
  chart,
}: {
  chart: Extract<(typeof flow.turns)[number]["chart"], { kind: "bars" }>;
}) {
  return (
    <div className="space-y-2.5">
      {chart.rows.map((row) => (
        <div key={row.label} className="flex items-center gap-3">
          <span className="w-[4.5rem] shrink-0 text-[0.6875rem] text-[#55605a]">
            {row.label}
          </span>
          <span className="h-2.5 flex-1 rounded-full bg-[#eef1ea]">
            <span
              className="block h-full rounded-full bg-[#6f9c5f]"
              style={{ width: `${row.value * 100}%` }}
            />
          </span>
        </div>
      ))}
    </div>
  );
}

/** Turn 3: this month against last, as a pair of bars per department. */
function GroupedBars({
  chart,
}: {
  chart: Extract<(typeof flow.turns)[number]["chart"], { kind: "grouped" }>;
}) {
  return (
    <div className="flex items-end gap-4">
      <div className="flex flex-1 items-end justify-around gap-3">
        {chart.groups.map((group) => (
          <div
            key={group.label}
            className="flex min-w-0 flex-1 flex-col items-center"
          >
            <div className="flex h-20 w-full items-end justify-center gap-1.5">
              <span
                className="w-3.5 rounded-t-[2px] bg-[#4b7a4a]"
                style={{ height: `${group.current * 100}%` }}
              />
              <span
                className="w-3.5 rounded-t-[2px] bg-[#c9b878]"
                style={{ height: `${group.previous * 100}%` }}
              />
            </div>
            <span className="mt-2 truncate text-[0.6875rem] text-[#55605a]">
              {group.label}
            </span>
          </div>
        ))}
      </div>

      <ul className="shrink-0 space-y-1.5">
        {chart.legend.map((entry) => (
          <li key={entry.label} className="flex items-center gap-2">
            <span
              className={cn(
                "size-2 rounded-full",
                entry.tone === "current" ? "bg-[#4b7a4a]" : "bg-[#c9b878]",
              )}
            />
            <span className="text-[0.6875rem] whitespace-nowrap text-[#55605a]">
              {entry.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
