"use client";

import { motion, useReducedMotion } from "motion/react";

import { campus } from "@/content/campus";
import { cn } from "@/lib/utils";

import { journeyIcons, outcomeIcons, StarIcon } from "./CampusIcons";

/**
 * LURNYCAMPUS CONNECTED JOURNEY
 * ---------------------------------------------------------------------------
 * The diagram on the right of section 2: five stages on a rail, curving down
 * into a terminal READY node, with three outcome chips hanging off APPLY.
 *
 * WHY IT IS NOT ONE IMAGE
 * The supplied render is a single 900x601 PNG. Shipping it would flatten a
 * dozen labels into pixels — soft on retina, unselectable, invisible to screen
 * readers, and frozen at one aspect ratio. Rebuilt here, the stage names are
 * real text and the whole thing reflows: the rail runs horizontally on lg+ and
 * becomes a vertical spine on narrow screens, where five nodes in a row cannot
 * fit.
 *
 * HOW THE CONNECTORS WORK
 * The rail, the curve into READY and the dashed drops are one absolutely
 * positioned SVG behind the nodes, drawn in a 900x420 viewBox with
 * `preserveAspectRatio="none"` so it stretches with the grid above it. The
 * node centres in that viewBox are computed from STAGE_X below, so the line
 * work and the DOM columns cannot drift apart when the copy changes.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { journey } = campus.gap;

/*
  Geometry, in viewBox units.

  These are not guesses: they are the node centres MEASURED off the rendered
  layout, so the line work lands on the discs instead of near them. The viewBox
  is stretched to the wrapper with `preserveAspectRatio="none"`, so x and y
  scale independently — every number below is therefore in the same space as
  the grid it sits behind, and stays aligned at any width.

  The five stages occupy the left ~90% of the box; READY sits in the reserved
  column on the right that the grid's `pr-` leaves empty for it.
*/
const VB_W = 900;
const VB_H = 420;
/** The rail runs through the centre of the stage discs. */
const RAIL_Y = 47;
/** Measured stage-disc centres. */
const STAGE_X = [86, 268, 450, 632, 814];
const APPLY_X = STAGE_X[2];
/** The disc's own radius in viewBox units, so lines stop at its edge. */
const DISC_RX = 30;
const DISC_RY = 34;
/** Measured chip centres, and the top edge of the chip row. */
const CHIP_X = [123, 392, 661];
const CHIP_TOP = 354;
/** Where the fan-out rail sits between the drop and the chips. */
const FAN_Y = 300;
/** The terminal node, in the column reserved to the right of the chips. */
const READY = { x: 828, y: 250 };

export function CampusJourney() {
  const reduce = useReducedMotion();

  /*
    A line that draws itself once in view.

    Variants rather than a bare `initial`, for the same reason the radar uses
    them: with reduced motion no transition runs, so the path must START at
    full length. `initial: false` would strand it at pathLength 0 — rendered as
    a 1px dash pattern, i.e. an invisible rail.
  */
  const draw = (delay: number, duration = 1) => ({
    initial: reduce ? "shown" : "hidden",
    whileInView: "shown",
    viewport: { once: true, amount: "some" } as const,
    variants: {
      hidden: { pathLength: 0 },
      shown: {
        pathLength: 1,
        transition: { duration, delay, ease: easeOut },
      },
    },
  });

  const pop = (delay: number) => ({
    initial: reduce ? "shown" : "hidden",
    whileInView: "shown",
    viewport: { once: true, amount: "some" } as const,
    variants: {
      hidden: { opacity: 0, y: 14, scale: 0.94 },
      shown: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.5, delay, ease: easeOut },
      },
    },
  });

  return (
    <div className="relative">
      <motion.p
        {...pop(0)}
        className={cn(
          "text-[0.75rem] font-bold tracking-[0.14em] uppercase",
          "text-[#004b4c] sm:text-[0.8125rem]",
        )}
      >
        {journey.eyebrow}
      </motion.p>

      {/* ===================== The line work =========================== */}
      {/*
        Behind the nodes, and hidden below lg: the stacked layout draws its own
        vertical spine with borders instead, since these curves assume a row.
      */}
      <div className="relative mt-10 hidden lg:block">
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          preserveAspectRatio="none"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 size-full"
        >
          {/* The rail, running through the disc centres from the left edge
              to VALIDATE. It stops at the last disc; the curve picks it up. */}
          <motion.path
            {...draw(0.15, 1.1)}
            d={`M4 ${RAIL_Y} H${STAGE_X[4]}`}
            fill="none"
            stroke="#0d4d4d"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* The curve out of VALIDATE and down into READY. It leaves from the
              disc's right edge, so it never crosses the label beneath. */}
          <motion.path
            {...draw(1.15, 0.8)}
            d={`M${STAGE_X[4] + DISC_RX} ${RAIL_Y} H${READY.x - 6} Q${READY.x + 34} ${RAIL_Y} ${READY.x + 34} ${RAIL_Y + 72} V${READY.y - DISC_RY - 4}`}
            fill="none"
            stroke="#0d4d4d"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* The hooked arrow pointing into READY from the left. */}
          <motion.path
            {...draw(1.75, 0.45)}
            d={`M${READY.x - 118} ${READY.y + 30} q30 -26 66 -32`}
            fill="none"
            stroke="#0d2f2f"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <motion.path
            initial={reduce ? "shown" : "hidden"}
            whileInView="shown"
            viewport={{ once: true, amount: "some" }}
            variants={{
              hidden: { opacity: 0 },
              shown: { opacity: 1, transition: { duration: 0.3, delay: 2.15 } },
            }}
            d={`M${READY.x - 52} ${READY.y - 8} l14 5 -11 9z`}
            fill="#0d2f2f"
          />

          {/* The dashed drop out of APPLY. It starts below the disc, clearing
              the stage label and caption, and ends on the fan rail. */}
          <motion.path
            {...draw(1.4, 0.9)}
            d={`M${APPLY_X} ${RAIL_Y + DISC_RY + 130} V${FAN_Y}`}
            fill="none"
            stroke="#2f8f8f"
            strokeWidth="2"
            strokeDasharray="4 5"
            strokeLinecap="round"
          />
          {/* The fan rail, spanning the outer two chips. */}
          <motion.path
            {...draw(1.65, 0.7)}
            d={`M${CHIP_X[0]} ${FAN_Y} H${CHIP_X[2]}`}
            fill="none"
            stroke="#2f8f8f"
            strokeWidth="2"
            strokeDasharray="4 5"
            strokeLinecap="round"
          />
          {/* One drop per chip, stopping just above the chip's top edge. */}
          {CHIP_X.map((x, index) => (
            <motion.path
              key={x}
              {...draw(1.9 + index * 0.08, 0.4)}
              d={`M${x} ${FAN_Y} V${CHIP_TOP - 16}`}
              fill="none"
              stroke="#2f8f8f"
              strokeWidth="2"
              strokeDasharray="4 5"
              strokeLinecap="round"
            />
          ))}
          {CHIP_X.map((x, index) => (
            <motion.path
              key={`head-${x}`}
              initial={reduce ? "shown" : "hidden"}
              whileInView="shown"
              viewport={{ once: true, amount: "some" }}
              variants={{
                hidden: { opacity: 0 },
                shown: {
                  opacity: 1,
                  transition: { duration: 0.25, delay: 2.3 + index * 0.08 },
                },
              }}
              d={`M${x - 6} ${CHIP_TOP - 20} l6 11 6 -11z`}
              fill="#2f8f8f"
            />
          ))}
        </svg>

        {/* ======================= The stages ======================== */}
        <div className="relative grid grid-cols-5 gap-2">
          {journey.stages.map((stage, index) => {
            const Icon = journeyIcons[stage.icon];
            const accent = "accent" in stage && stage.accent;

            return (
              <motion.div
                key={stage.label}
                {...pop(0.3 + index * 0.12)}
                className="group/stage flex flex-col items-center text-center"
              >
                {/* The node: a ringed disc on the section's cream ground, so
                    the rail appears to pass behind rather than through it. */}
                <span
                  className={cn(
                    "grid size-18 place-items-center rounded-full border-[3px]",
                    "bg-[#fefaf9]",
                    "duration-normal transition-[scale,box-shadow] ease-out",
                    "will-change-[scale] group-hover/stage:scale-108",
                    accent
                      ? "border-[#f65433] text-[#f65433] group-hover/stage:shadow-[0_10px_26px_-10px_rgb(246_84_51/0.7)]"
                      : "border-[#0d4d4d] text-[#0d4d4d] group-hover/stage:shadow-[0_10px_26px_-10px_rgb(13_77_77/0.6)]",
                  )}
                >
                  <Icon className="size-8" />
                </span>

                <span
                  className={cn(
                    "mt-5 text-[0.8125rem] font-bold tracking-[0.06em] uppercase",
                    accent ? "text-[#f65433]" : "text-[#0b2027]",
                  )}
                >
                  {stage.label}
                </span>

                <span className="mt-1.5 block text-[0.8125rem] leading-snug text-[#4a5a60]">
                  {stage.caption.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* The chevrons that sit between the stage labels. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-26 grid grid-cols-5"
        >
          {journey.stages.slice(0, 4).map((stage, index) => (
            <motion.span
              key={stage.label}
              {...pop(0.75 + index * 0.1)}
              className="col-span-1 flex translate-x-1/2 justify-center text-[#8aa0a3]"
            >
              <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
                <path
                  d="m9 5 7 7-7 7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.span>
          ))}
        </div>

        {/* ======================== The chips ========================= */}
        <div className="relative mt-22 grid grid-cols-3 gap-4 pr-32 xl:pr-34">
          {journey.outcomes.map((outcome, index) => {
            const Icon = outcomeIcons[outcome.icon];

            return (
              <motion.div
                key={outcome.label}
                {...pop(2.35 + index * 0.1)}
                className={cn(
                  "flex items-center justify-center gap-3 rounded-xl px-4 py-3.5",
                  "border border-[#bcd2d2] bg-[#fefaf9] text-[#0b2027]",
                  "duration-normal transition-[border-color,box-shadow,translate] ease-out",
                  "will-change-[translate] hover:-translate-y-0.5",
                  "hover:border-[#0d4d4d]",
                  "hover:shadow-[0_12px_28px_-14px_rgb(13_77_77/0.55)]",
                )}
              >
                <Icon className="size-5 shrink-0 text-[#0d4d4d]" />
                <span className="text-[0.875rem] font-medium">
                  {outcome.label}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* ======================== READY ============================= */}
        {/*
          Positioned against the same viewBox the line work uses, so the curve
          lands on it exactly at any width.
        */}
        <motion.div
          {...pop(2)}
          className="absolute flex flex-col items-center text-center"
          style={{
            left: `${(READY.x / VB_W) * 100}%`,
            top: `${(READY.y / VB_H) * 100}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <span
            className={cn(
              "grid size-18 place-items-center rounded-full border-[3px]",
              "border-[#f65433] bg-[#fefaf9] text-[#f65433]",
              "duration-normal transition-[scale] ease-out",
              "will-change-[scale] hover:scale-108",
            )}
          >
            <StarIcon className="size-8" />
          </span>

          <span className="mt-4 text-[0.8125rem] font-bold tracking-[0.06em] text-[#f65433] uppercase">
            {journey.ready.label}
          </span>

          <span className="mt-1.5 block text-[0.8125rem] leading-snug text-[#4a5a60]">
            {journey.ready.caption.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </span>
        </motion.div>
      </div>

      {/* ============== The stacked layout, below lg ================== */}
      {/*
        The same journey as a vertical spine. The rail becomes a left border on
        each row, so the sequence still reads without any of the curve work
        above, which assumes a horizontal row.
      */}
      <ol className="mt-8 space-y-0 lg:hidden">
        {[
          ...journey.stages,
          { ...journey.ready, icon: "star" as const, accent: true },
        ].map((stage, index, all) => {
          const isReady = index === all.length - 1;
          const Icon = isReady
            ? StarIcon
            : journeyIcons[stage.icon as keyof typeof journeyIcons];
          const accent = "accent" in stage && stage.accent;

          return (
            <motion.li
              key={stage.label}
              {...pop(index * 0.08)}
              className={cn(
                "relative flex gap-4 pb-7",
                // The spine: a left border on every row but the last, so the
                // line stops at the final node rather than trailing past it.
                index < all.length - 1 && "border-l-2 border-[#cfe0e0]",
                "ml-5 pl-7",
              )}
            >
              <span
                className={cn(
                  "absolute -left-[1.4rem] grid size-11 shrink-0 place-items-center",
                  "rounded-full border-2 bg-[#fefaf9]",
                  accent
                    ? "border-[#f65433] text-[#f65433]"
                    : "border-[#0d4d4d] text-[#0d4d4d]",
                )}
              >
                <Icon className="size-5" />
              </span>

              <span className="min-w-0 pt-1.5">
                <span
                  className={cn(
                    "block text-[0.8125rem] font-bold tracking-[0.06em] uppercase",
                    accent ? "text-[#f65433]" : "text-[#0b2027]",
                  )}
                >
                  {stage.label}
                </span>
                <span className="mt-1 block text-[0.875rem] text-[#4a5a60]">
                  {stage.caption.join(" ")}
                </span>
              </span>
            </motion.li>
          );
        })}
      </ol>

      {/* The three chips, stacked. */}
      <div className="mt-2 grid gap-3 sm:grid-cols-3 lg:hidden">
        {journey.outcomes.map((outcome, index) => {
          const Icon = outcomeIcons[outcome.icon];

          return (
            <motion.div
              key={outcome.label}
              {...pop(0.5 + index * 0.08)}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3.5",
                "border border-[#bcd2d2] bg-[#fefaf9] text-[#0b2027]",
              )}
            >
              <Icon className="size-5 shrink-0 text-[#0d4d4d]" />
              <span className="text-[0.875rem] font-medium">
                {outcome.label}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* ======================== Footnote ========================== */}
      <motion.p
        {...pop(2.7)}
        className={cn(
          "mt-10 text-[0.9375rem] text-pretty text-[#3f5158]",
          "lg:mt-10 lg:text-center",
        )}
      >
        {journey.footnote}
      </motion.p>
    </div>
  );
}
