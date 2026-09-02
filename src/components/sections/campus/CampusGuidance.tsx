"use client";

import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { campus } from "@/content/campus";
import { cn } from "@/lib/utils";

import { guidanceIcons } from "./CampusIcons";
import { CampusSupport } from "./CampusSupport";

/**
 * CAMPUS — GUIDANCE AT EVERY STEP
 * ---------------------------------------------------------------------------
 * Section 5: the claim on the left, the support workspace on the right, joined
 * by dashed connectors that run from each of the three points into the panel's
 * left edge.
 *
 * THE CONNECTORS
 * They are drawn in one absolutely positioned SVG spanning the gap between the
 * two columns, in a stretched viewBox so they scale with it. They exist only
 * on lg+: below that the columns stack and there is no gap left to span, so
 * the whole layer is dropped rather than redrawn.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { guidance } = campus;

/*
  Connector geometry.

  The layer spans the full grid rather than a guessed slice of it, so a path can
  start at a point's icon on the far left and finish at the panel's edge. The
  viewBox is 1000x1000 with `preserveAspectRatio="none"`, which makes x and y
  independent percentages of the grid: x=40 is 4% across, x=430 is 43% across —
  where the panel begins — and y is the same fraction of the grid's height.

  These x/y pairs are derived from the MEASURED layout (icons ending at ~4% of
  the width, the panel starting at ~43%), so the runs land on both ends instead
  of floating in the gap.
*/
const PANEL_X = 430;
/*
  The copy column's right edge. Connectors begin HERE, not at the icons: the
  design routes them through the clear gap beside the text, and a path that
  started at an icon would have to cross the point's own title to get there.
*/
const COPY_X = 330;

/*
  Each connector leaves the copy column at its point's height, steps across the
  gap and joins the panel edge — right-angled runs with rounded corners, as the
  design draws them. The y values are the measured heights of the heading and
  the three points, as percentages of the grid.
*/
const CONNECTORS = [
  // From beside the heading, down to the panel's upper edge.
  { d: `M${COPY_X} 120 H360 Q390 120 390 150 V190 H${PANEL_X}`, delay: 0.5 },
  // From point 1.
  { d: `M${COPY_X} 634 H355 Q385 634 385 604 V500 H${PANEL_X}`, delay: 0.65 },
  // From point 2.
  { d: `M${COPY_X} 734 H370 Q400 734 400 704 V660 H${PANEL_X}`, delay: 0.8 },
  // From point 3.
  { d: `M${COPY_X} 834 H360 Q390 834 390 864 V890 H${PANEL_X}`, delay: 0.95 },
] as const;

export function CampusGuidance() {
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
        // The deep teal ground, sampled from the design.
        "bg-[#003438]",
        "py-20 lg:py-28",
      )}
    >
      <Container width="wide" className="relative">
        <div
          className={cn(
            "relative grid grid-cols-1 items-center gap-14",
            // Measured from the design: the copy runs to roughly 40% of the
            // frame, the workspace takes the rest.
            "lg:grid-cols-[minmax(0,0.68fr)_minmax(0,1fr)] lg:gap-12",
            "xl:gap-16",
          )}
        >
          {/* ===================== The connectors ====================== */}
          {/*
            Behind both columns, spanning the gap. Decorative, and lg-only:
            with the columns stacked there is no gap for them to cross.
          */}
          <svg
            aria-hidden="true"
            viewBox="0 0 1000 1000"
            preserveAspectRatio="none"
            className={cn(
              "pointer-events-none absolute inset-0 -z-0 hidden size-full lg:block",
            )}
          >
            {CONNECTORS.map((connector) => (
              <motion.path
                key={connector.d}
                d={connector.d}
                fill="none"
                stroke="rgb(120 190 185 / 0.45)"
                strokeWidth="1"
                strokeDasharray="3 4"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                initial={reduce ? "shown" : "hidden"}
                whileInView="shown"
                viewport={{ once: true, amount: "some" }}
                variants={{
                  hidden: { pathLength: 0, opacity: 0 },
                  shown: {
                    pathLength: 1,
                    opacity: 1,
                    transition: {
                      duration: 1.1,
                      delay: connector.delay,
                      ease: easeOut,
                    },
                  },
                }}
              />
            ))}
          </svg>

          {/* ========================== The claim ====================== */}
          <div className="relative z-10">
            <motion.p
              {...rise(0)}
              className={cn(
                "text-[0.75rem] font-bold tracking-[0.16em] uppercase",
                "text-[#fd6d4e] sm:text-[0.8125rem]",
              )}
            >
              {guidance.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.08)}
              className={cn(
                "mt-6 font-display font-bold tracking-[-0.03em]",
                "leading-[1.1] text-white",
                // Measured from the design at ~46px on a 1440 frame.
                "text-[1.875rem] sm:text-[2.25rem] xl:text-[2.875rem]",
              )}
            >
              {guidance.headline.map((line, index) => (
                <span key={line} className="inline lg:block">
                  {line}
                  {/* The coral full stop closes the last line. Decorative, so
                      hidden rather than announced as a stray glyph. */}
                  {index === guidance.headline.length - 1 && (
                    <span aria-hidden="true" className="text-[#fd6d4e]">
                      .
                    </span>
                  )}{" "}
                </span>
              ))}
            </motion.h2>

            <motion.p
              {...rise(0.16)}
              className={cn(
                "mt-6 max-w-[30rem] leading-relaxed text-pretty",
                "text-[1rem] text-[#bed2d2] sm:text-[1.0625rem]",
              )}
            >
              {guidance.description}
            </motion.p>

            {/* ------------------------ The points -------------------- */}
            <ul className="mt-10 space-y-8 lg:mt-12">
              {guidance.points.map((point, index) => {
                const Icon = guidanceIcons[point.icon];

                return (
                  <motion.li
                    key={point.title}
                    {...rise(0.24 + index * 0.1)}
                    className="group/pt flex items-start gap-5"
                  >
                    <span
                      className={cn(
                        "shrink-0 text-[#fe6e3c]",
                        "duration-normal transition-[scale] ease-out",
                        "will-change-[scale] group-hover/pt:scale-108",
                      )}
                    >
                      <Icon className="size-13" />
                    </span>

                    <span className="min-w-0 pt-0.5">
                      <span className="block text-[1.0625rem] font-bold text-pretty text-white">
                        {point.title}
                      </span>
                      <span className="mt-1.5 block text-[0.9375rem] leading-relaxed text-pretty text-[#a8bfc0]">
                        {point.description}
                      </span>
                    </span>
                  </motion.li>
                );
              })}
            </ul>
          </div>

          {/* ======================= The workspace ===================== */}
          <div className="relative z-10">
            <CampusSupport />
          </div>
        </div>
      </Container>
    </section>
  );
}
