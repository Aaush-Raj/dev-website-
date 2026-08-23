"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

import { outcomes } from "@/content/outcomes";
import { cn } from "@/lib/utils";

/**
 * OUTCOMES CHART
 * ---------------------------------------------------------------------------
 * The grouped bar chart: branch readiness with Lurny against the baseline,
 * over four quarters.
 *
 * LAYOUT
 * Built from CSS grid and flexbox rather than SVG. The design's labels — axis
 * ticks, quarter names, the legend — are ordinary text at ordinary sizes, and
 * an SVG large enough for the bars would either scale that text with the
 * viewport (`preserveAspectRatio` stretching the glyphs) or need a second
 * coordinate system to place it. Plain DOM keeps every label on the same type
 * scale as the rest of the page and lets the plot area flex to any width.
 *
 * Bar heights are percentages of `axisMax`, and the gridlines are positioned
 * from the same `ticks` array, so the two cannot drift apart: change the data
 * and the geometry follows.
 *
 * ACCESSIBILITY
 * The chart is decorative — the caption below it and the stats beside it carry
 * the meaning — but a chart of unlabelled bars is worth stating in text for
 * anyone who cannot see it. So rather than aria-hidden, it exposes a table
 * built from the same data, visually hidden. The bars themselves are hidden
 * from the accessibility tree to avoid reading the same numbers twice.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { chart } = outcomes;

/** Fill and hover-glow per series, keyed by the tone in the content file. */
const seriesStyles = {
  brand: {
    swatch: "bg-brand-600",
    bar: "bg-brand-600",
    glow: "shadow-[0_0_0_1px_rgb(91_50_183/0.28),0_10px_24px_-8px_rgb(91_50_183/0.45)]",
  },
  accent: {
    swatch: "bg-accent-400",
    bar: "bg-accent-400",
    glow: "shadow-[0_0_0_1px_rgb(254_180_66/0.4),0_10px_24px_-8px_rgb(252_154_22/0.5)]",
  },
} as const;

export function OutcomesChart({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  /**
   * Which quarter is hovered, or null. Dimming the other groups makes a
   * single quarter readable without pulling in a tooltip library.
   *
   * Deliberately pointer-only. The obvious accessible counterpart — making
   * each group focusable — would add four tab stops that lead nowhere, since
   * the visually-hidden table below already exposes every value to keyboard
   * and screen-reader users. Emphasis is a nicety here, not information.
   */
  const [activeGroup, setActiveGroup] = useState<number | null>(null);

  return (
    <figure className={cn("flex flex-col", className)}>
      {/* ============================== Legend ========================= */}
      <motion.figcaption
        className="flex flex-wrap items-center gap-x-6 gap-y-2"
        initial={reduce ? "shown" : "hidden"}
        whileInView="shown"
        viewport={{ once: true, amount: "some" }}
        variants={{
          hidden: { opacity: 0, y: 10 },
          shown: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: easeOut },
          },
        }}
      >
        {chart.series.map((series) => (
          <span key={series.key} className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className={cn(
                "size-2.5 shrink-0 rounded-[2px]",
                seriesStyles[series.tone].swatch,
              )}
            />
            <span
              className={cn(
                "font-mono text-[0.6875rem] font-medium uppercase",
                "tracking-[0.08em] text-neutral-700",
              )}
            >
              {series.label}
            </span>
          </span>
        ))}
      </motion.figcaption>

      {/* ============================== Plot =========================== */}
      {/*
        Two columns: a fixed gutter for the y-axis labels, then the plot.
        The gutter is wide enough for "80" at the label size and no wider —
        the design keeps the axis tight against the bars.

        ONE observer for the whole plot.

        The gridlines and bars were originally each their own `whileInView`.
        With `once: true` that meant a dozen independent IntersectionObservers
        resolving against a tall section, and on narrow viewports some of them
        never fired — leaving bars stuck at their `scaleY(0)` initial state
        and the chart apparently empty. Hoisting the trigger here means one
        intersection decides for every child, and `variants` propagate the
        resulting state down. Children below declare only their own shapes.
      */}
      <motion.div
        aria-hidden="true"
        // mt-8, not mt-5: the top gridline carries the "80" tick label, which
        // would otherwise sit tight under the legend.
        className="mt-8 grid grid-cols-[1.75rem_minmax(0,1fr)] gap-x-2"
        onMouseLeave={() => setActiveGroup(null)}
        initial={reduce ? "shown" : "hidden"}
        whileInView="shown"
        viewport={{ once: true, amount: "some" }}
      >
        {/* ---------------------------- Y axis ------------------------- */}
        {/*
          Each tick is positioned from its own value, using the same
          percentage the matching gridline uses — so a label cannot end up on
          the wrong rule, and an uneven `ticks` array would still line up.

          -translate-y-1/2 centres the glyphs on the line rather than letting
          them hang below it.
        */}
        <div className="relative h-62 sm:h-70">
          {chart.ticks.map((tick) => (
            <span
              key={tick}
              className={cn(
                "absolute right-0 -translate-y-1/2",
                "font-mono text-[0.625rem] text-neutral-500 tabular-nums",
              )}
              style={{ bottom: `${(tick / chart.axisMax) * 100}%` }}
            >
              {tick}
            </span>
          ))}
        </div>

        {/* ---------------------------- Bars --------------------------- */}
        <div className="relative h-62 sm:h-70">
          {/*
            Gridlines, drawn behind the bars. The 0 line is darker: it is the
            chart's baseline, not just another rule.
          */}
          {chart.ticks.map((tick) => (
            <motion.span
              key={tick}
              className={cn(
                "absolute inset-x-0 h-px origin-left",
                tick === 0 ? "bg-neutral-300" : "bg-neutral-200",
              )}
              style={{ bottom: `${(tick / chart.axisMax) * 100}%` }}
              variants={{
                hidden: { scaleX: 0, opacity: 0 },
                shown: {
                  scaleX: 1,
                  opacity: 1,
                  transition: {
                    duration: 0.7,
                    // Rules sweep in from the baseline upward.
                    delay: 0.1 + (tick / chart.axisMax) * 0.22,
                    ease: easeOut,
                  },
                },
              }}
            />
          ))}

          {/*
            The bar groups sit on the baseline. `items-end` anchors every bar
            to the bottom so heights read as values.
          */}
          <div className="absolute inset-0 flex items-end justify-between">
            {chart.groups.map((group, groupIndex) => {
              const isDimmed =
                activeGroup !== null && activeGroup !== groupIndex;

              return (
                <div
                  key={group.label}
                  onMouseEnter={() => setActiveGroup(groupIndex)}
                  className={cn(
                    // Each group takes an equal share of the plot. The pair
                    // inside a quarter nearly touches, as in the design —
                    // the visual gap that separates quarters comes from the
                    // bars' max-width, not from this gap.
                    "flex h-full flex-1 items-end justify-center gap-0.5",
                    "transition-opacity duration-300 ease-out",
                    isDimmed ? "opacity-35" : "opacity-100",
                  )}
                >
                  {chart.series.map((series, seriesIndex) => {
                    const value = group[series.key];
                    const height = (value / chart.axisMax) * 100;
                    const style = seriesStyles[series.tone];

                    return (
                      <motion.span
                        key={series.key}
                        className={cn(
                          // Bars are capped in width so they stay the
                          // design's stout proportion on a wide viewport,
                          // and shrink rather than overflow on a narrow one.
                          "block w-full max-w-9 rounded-t-[2px]",
                          style.bar,
                          "transition-shadow duration-300 ease-out",
                          activeGroup === groupIndex && style.glow,
                        )}
                        style={{
                          height: `${height}%`,
                          // Grow from the baseline, not the middle.
                          transformOrigin: "bottom",
                        }}
                        variants={{
                          hidden: { scaleY: 0 },
                          shown: {
                            scaleY: 1,
                            transition: {
                              duration: 0.85,
                              /*
                               * Quarters rise left to right, and within each
                               * quarter the Lurny bar leads its baseline
                               * pair — so the chart reads in the same order
                               * as the story it tells.
                               */
                              delay:
                                0.24 + groupIndex * 0.11 + seriesIndex * 0.06,
                              ease: easeOut,
                            },
                          },
                        }}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        {/* --------------------------- X axis -------------------------- */}
        {/* Empty cell under the y-axis gutter, keeping the labels aligned
            with their groups. */}
        <div />
        <div className="mt-3 flex justify-between">
          {chart.groups.map((group, groupIndex) => (
            <span
              key={group.label}
              className={cn(
                "flex-1 text-center font-mono text-[0.6875rem]",
                "transition-colors duration-300 ease-out",
                activeGroup === groupIndex
                  ? "text-neutral-900"
                  : "text-neutral-500",
              )}
            >
              {group.label}
            </span>
          ))}
        </div>
      </motion.div>

      {/* ============================= Caption ========================= */}
      {/* The design closes the chart with a rule and a one-line note. */}
      <motion.p
        className={cn(
          "mt-5 border-t border-neutral-200 pt-4",
          "text-[0.8125rem] leading-relaxed text-pretty text-neutral-600",
        )}
        initial={reduce ? "shown" : "hidden"}
        whileInView="shown"
        viewport={{ once: true, amount: "some" }}
        variants={{
          hidden: { opacity: 0, y: 10 },
          shown: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, delay: 0.5, ease: easeOut },
          },
        }}
      >
        {chart.caption}
      </motion.p>

      {/*
        The same data as text, for screen readers. The bars above are
        aria-hidden, so this is the only reading of the figures — which is why
        it is a real table with headers rather than a sentence.
      */}
      <table className="sr-only">
        <caption>{chart.caption}</caption>
        <thead>
          <tr>
            <th scope="col">Quarter</th>
            {chart.series.map((series) => (
              <th key={series.key} scope="col">
                {series.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {chart.groups.map((group) => (
            <tr key={group.label}>
              <th scope="row">{group.label}</th>
              {chart.series.map((series) => (
                <td key={series.key}>{group[series.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
