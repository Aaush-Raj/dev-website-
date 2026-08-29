"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { insights } from "@/content/insights";
import { cn } from "@/lib/utils";

/**
 * INSIGHTS FIELD
 * ---------------------------------------------------------------------------
 * Section 3 of the Insights page: copy and an evidence block on the left, a
 * network diagram on the right.
 *
 * THE DIAGRAM IS THE SUPPLIED ARTWORK with the text laid over it, not baked
 * in. The export is named "no_text" precisely because it ships the picture
 * alone — so the branch numbers, the hub's metric and the three findings are
 * real text here. They stay selectable, translatable and crisp at any size,
 * and a screen reader reads them rather than skipping a wordless image.
 *
 * That also means the artwork itself is `alt=""`: every fact it carries is
 * written out in the labels over it and the copy beside it, so describing the
 * picture again would only repeat what is already read.
 *
 * THE OVERLAY GEOMETRY
 * Labels are positioned as percentages of the artwork's own box, using `top`
 * values MEASURED from the export rather than estimated. The whole diagram
 * sits in one relatively-positioned frame whose aspect matches the artwork's,
 * so the labels track their nodes at any width instead of drifting apart the
 * way independently-sized elements would.
 *
 * Below lg the labels are dropped and the diagram is shown alone. At that
 * width the artwork is too small for nine branch numbers to be legible, and
 * the findings read better as a plain list beneath it.
 */

const { field } = insights;

/** Motion's string easings are not typed, so the cubic curve is spelled out. */
const easeOut = [0.16, 1, 0.3, 1] as const;

export function InsightsField() {
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
    <section className="relative isolate overflow-hidden bg-[#101214] py-section-lg text-white">
      {/* A faint violet bloom behind the hub, so the centre of the diagram
          sits in light rather than on flat black. */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -z-10",
          "top-1/2 right-[18%] h-[34rem] w-[34rem] -translate-y-1/2",
          "rounded-full bg-[#6c3f8a]/12 blur-3xl",
        )}
      />

      <Container width="hero" className="relative">
        <div
          className={cn(
            "grid items-center gap-12",
            "lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-8",
            "xl:gap-14",
          )}
        >
          {/* ============================ Copy ======================== */}
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "text-[0.6875rem] font-bold tracking-[0.2em] uppercase",
                "text-[#a97fd0] sm:text-xs",
              )}
            >
              {field.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.08)}
              className={cn(
                "mt-5 font-display font-medium tracking-[-0.025em]",
                "leading-[1.14] text-balance",
                // Measured from the design at ~40px on a 1440 frame.
                "text-[1.75rem] sm:text-[2.125rem] xl:text-[2.5rem]",
              )}
            >
              {field.headline.map((line) => (
                <span key={line} className="inline lg:block">
                  {line}{" "}
                </span>
              ))}
            </motion.h2>

            {/* The short violet rule the design sets under the headline. */}
            <motion.span
              {...rise(0.14)}
              aria-hidden="true"
              className="mt-7 block h-px w-14 bg-[#8f66b5]"
            />

            <motion.p
              {...rise(0.18)}
              className={cn(
                "mt-6 max-w-[26rem] leading-relaxed text-pretty",
                "text-[0.9375rem] text-neutral-400",
              )}
            >
              {field.description}
            </motion.p>

            {/* ------------------------ Evidence --------------------- */}
            <motion.div
              {...rise(0.24)}
              className="mt-10 flex items-center gap-6"
            >
              <Image
                src={field.evidence.icon.src}
                alt={field.evidence.icon.alt}
                aria-hidden="true"
                width={128}
                height={128}
                className="size-14 shrink-0"
              />

              <div className="min-w-0">
                <p
                  className={cn(
                    "text-[0.625rem] font-bold tracking-[0.14em] uppercase",
                    "text-[#8ea36a]",
                  )}
                >
                  {field.evidence.label}
                </p>

                <dl className="mt-3 flex items-start gap-6">
                  {field.evidence.metrics.map((metric, index) => (
                    <div
                      key={metric.unit}
                      className={cn(
                        // A hairline between the two figures, as the design
                        // divides them.
                        index > 0 && "border-l border-white/12 pl-6",
                      )}
                    >
                      <dt className="sr-only">{metric.unit}</dt>
                      <dd>
                        <span className="block text-[1.75rem] leading-none font-semibold sm:text-[2rem]">
                          {metric.value}
                        </span>
                        <span className="mt-1.5 block text-[0.8125rem] text-neutral-500">
                          {metric.unit}
                        </span>
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </motion.div>

            {/* -------------------------- Action --------------------- */}
            <motion.div {...rise(0.3)} className="mt-9">
              <Link
                href={field.action.href}
                className={cn(
                  "group inline-flex items-center gap-2.5",
                  "text-[0.9375rem] font-medium text-[#e4643f]",
                  "border-b border-[#e4643f]/40 pb-1.5",
                  "duration-normal transition-colors ease-out",
                  "hover:border-[#e4643f] hover:text-[#f07a58]",
                  "focus-visible:rounded-sm focus-visible:ring-2",
                  "focus-visible:ring-[#e4643f]/50 focus-visible:outline-none",
                )}
              >
                {field.action.label}
                <span
                  aria-hidden="true"
                  className={cn(
                    "duration-normal transition-transform ease-out",
                    "group-hover:translate-x-1",
                  )}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-4"
                  >
                    <path d="M4.5 12h15M13.5 6l6 6-6 6" />
                  </svg>
                </span>
              </Link>
            </motion.div>
          </div>

          {/* =========================== Diagram ====================== */}
          <motion.div
            initial={reduce ? "shown" : "hidden"}
            whileInView="shown"
            viewport={{ once: true, amount: "some" }}
            variants={{
              hidden: { opacity: 0, scale: 0.97 },
              shown: {
                opacity: 1,
                scale: 1,
                transition: { duration: 0.8, delay: 0.2, ease: easeOut },
              },
            }}
            /*
              The frame the labels are positioned against. Its aspect matches
              the artwork's (1030x836), so a percentage lands on the same node
              at every width — the labels and the drawing scale as one unit.

              Padded left and right on lg so the branch numbers and the
              findings have somewhere to sit outside the drawing itself.
            */
            className="relative lg:pr-[36%] lg:pl-[7%]"
          >
            <div className="relative aspect-[1030/836] w-full">
              <Image
                src={field.diagram.src}
                alt={field.diagram.alt}
                aria-hidden="true"
                fill
                sizes="(min-width: 1024px) 46vw, 92vw"
                className="object-contain"
              />

              {/* ------------------- Branch numbers ---------------- */}
              {/* lg only: below that the artwork is too small for nine
                  numbers to be legible beside it. */}
              <div aria-hidden="true" className="hidden lg:block">
                {field.branchLabels.map((branch) => (
                  <span
                    key={branch.label}
                    className={cn(
                      "absolute right-full pr-3 text-[0.75rem]",
                      "font-medium text-neutral-500 tabular-nums",
                    )}
                    style={{
                      top: `${branch.top}%`,
                      translate: "0 -50%",
                    }}
                  >
                    {branch.label}
                  </span>
                ))}
              </div>

              {/* ---------------------- Hub metric ----------------- */}
              {/*
                Written into the middle of the drawn circle. Real text, not
                part of the export — see the note at the top of this file.
              */}
              <div
                className={cn(
                  "absolute left-1/2 -translate-x-1/2 text-center",
                  "top-[52%] -translate-y-1/2",
                )}
              >
                <p
                  className={cn(
                    "leading-none font-semibold",
                    "text-[1.5rem] sm:text-[1.875rem] xl:text-[2.25rem]",
                  )}
                >
                  {field.hub.value}
                </p>
                {/*
                  Capped to the drawn circle's width and wrapped onto two
                  lines. Unconstrained it ran wider than the hub and spilled
                  over the curves either side of it.
                */}
                <p
                  className={cn(
                    "mx-auto mt-2 max-w-[7ch] text-[0.5rem] font-semibold",
                    "leading-[1.5] tracking-[0.16em] text-[#b79ad0] uppercase",
                    "sm:text-[0.5625rem]",
                  )}
                >
                  {field.hub.label}
                </p>
              </div>

              {/* ----------------------- Findings ------------------ */}
              {/* lg only: below that they read better as a plain list under
                  the diagram — see the fallback beneath. */}
              <ol aria-hidden="true" className="hidden lg:block">
                {field.findings.map((finding) => (
                  <li
                    key={finding.number}
                    className="absolute left-full flex w-[52%] items-start gap-2.5 pl-4"
                    style={{
                      top: `${finding.top}%`,
                      translate: "0 -50%",
                    }}
                  >
                    <span
                      className={cn(
                        "mt-px grid size-4 shrink-0 place-items-center rounded-full",
                        "bg-[#e4643f] text-[0.5rem] font-bold text-white",
                      )}
                    >
                      {finding.number}
                    </span>
                    <span className="text-[0.8125rem] leading-snug text-neutral-300">
                      {finding.text}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            {/* The findings as a plain list below lg, where the overlay is
                dropped. This is the copy's only appearance at that width, so
                it is NOT aria-hidden. */}
            <ol className="mt-8 space-y-4 lg:hidden">
              {field.findings.map((finding) => (
                <li key={finding.number} className="flex items-start gap-3">
                  <span
                    className={cn(
                      "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full",
                      "bg-[#e4643f] text-[0.625rem] font-bold text-white",
                    )}
                  >
                    {finding.number}
                  </span>
                  <span className="text-[0.875rem] leading-relaxed text-neutral-300">
                    {finding.text}
                  </span>
                </li>
              ))}
            </ol>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
