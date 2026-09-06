"use client";

import { Fragment, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { Uncopyable } from "@/components/ui/Uncopyable";
import { frontline } from "@/content/frontline";
import { cn } from "@/lib/utils";

import { visibilityIcons } from "./FrontlineIcons";

/**
 * FRONTLINE — MANAGERS AND LEADERS
 * ---------------------------------------------------------------------------
 * Section 7: the argument on the left, a leadership dashboard on the right.
 *
 * WHY THE DASHBOARD IS MARKUP AND NOT THE SUPPLIED COMPOSITE
 * The asset folder ships this board seven ways — the whole thing, then the KPI
 * strip, heatmap, capability bars, trend chart, coaching panel and
 * missed-opportunity panel as separate crops. Every one bakes its numbers and
 * labels into pixels: unselectable, unsearchable, blurry when scaled,
 * impossible to translate, unable to animate. So it is rebuilt here, and every
 * figure on it comes from content/frontline.ts — change a number there and the
 * heatmap cell, the bar or the trend line follows. Only the dark ground and
 * the three illustrated portraits ship as rasters; the build script explains
 * why even those portraits could not be taken from their own export files.
 *
 * THE CHARTS ARE COMPUTED
 * `Trend` projects its two series onto a 100x100 viewBox, `Heatmap` maps each
 * 0-5 step onto the six-stop scale drawn in its own legend, and the sparklines
 * share one `Spark` that draws either a line or bars. None of it is hand-placed
 * geometry, so the board stays honest if the numbers change.
 *
 * ONE COORDINATE SPACE, THEN A HONEST STACK
 * From lg up the board is a single panel whose internal grid matches the
 * design, with the coaching card overlapping the two charts beneath it exactly
 * as drawn. Type scales with a container query so the proportion holds at any
 * width. Below lg that overlap cannot survive — the card would bury the charts
 * — so the tiles unstack into one column in reading order.
 *
 * THE WHOLE BOARD IS ARIA-HIDDEN AND UNCOPYABLE. It is imitation UI: the copy
 * on the left carries the section's meaning, and a screen reader should not
 * have to wade through a fake dashboard of invented figures to reach it.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

/**
 * The board is taller than a phone viewport, so a plain `amount: "some"` can
 * be satisfied for a tile near its foot while that tile is still far below the
 * fold — and with `once: true` it then never plays. The margin pulls the
 * trigger line up so each piece animates as it actually arrives on screen.
 */
const inView = {
  once: true,
  amount: "some",
  margin: "0px 0px -10% 0px",
} as const;

const { visibility } = frontline;
const { board } = visibility;

/** Sampled from the design. Needed where a value reaches SVG or an inline
 *  style, which a Tailwind class cannot. */
const TEAL = "#2ed3a7";
const AMBER = "#f2c14e";
const CORAL = "#e8695c";
const BLUE = "#5b9bf5";
const VIOLET = "#8b6ef0";

/** Accent per tone, for the parts that stay in class-land. */
const TONES = {
  teal: { text: "text-[#2ed3a7]", bg: "bg-[#2ed3a7]/14" },
  amber: { text: "text-[#f2c14e]", bg: "bg-[#f2c14e]/14" },
  coral: { text: "text-[#e8695c]", bg: "bg-[#e8695c]/14" },
  blue: { text: "text-[#5b9bf5]", bg: "bg-[#5b9bf5]/14" },
  green: { text: "text-[#2ed3a7]", bg: "bg-[#2ed3a7]/14" },
  violet: { text: "text-[#8b6ef0]", bg: "bg-[#8b6ef0]/14" },
} as const;

/** The same tones as raw values, for SVG fills and strokes. */
const HEX = {
  teal: TEAL,
  amber: AMBER,
  coral: CORAL,
  blue: BLUE,
  green: TEAL,
  violet: VIOLET,
} as const;

/**
 * The heatmap's six steps, "needs support" to "ready". Sampled from the scale
 * the design draws in the legend, so cell and legend cannot drift apart —
 * both read this one array.
 */
const HEAT = [
  "#c9534f",
  "#e8836a",
  "#eab24f",
  "#c3d382",
  "#5ecb96",
  "#22b98a",
] as const;

export function FrontlineVisibility() {
  const reduce = useReducedMotion() ?? false;

  const rise = (delay: number) => ({
    initial: reduce ? "shown" : "hidden",
    whileInView: "shown",
    viewport: inView,
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
    <section className="relative isolate overflow-hidden bg-[#0b0f1a] py-section-lg">
      {/* The dark ground. Sits under everything. */}
      <Image
        src={visibility.backdrop.src}
        alt={visibility.backdrop.alt}
        width={visibility.backdrop.width}
        height={visibility.backdrop.height}
        aria-hidden="true"
        sizes="100vw"
        className="pointer-events-none absolute inset-0 -z-10 size-full object-cover"
      />

      <Container width="wide">
        <div
          className={cn(
            "grid items-center gap-12",
            "lg:grid-cols-[minmax(0,0.62fr)_minmax(0,1fr)] lg:gap-10",
            "xl:gap-14",
          )}
        >
          {/* =========================== Statement ==================== */}
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "font-mono text-[0.6875rem] font-medium uppercase",
                "tracking-[0.2em] text-[#a4b0c8] sm:text-xs",
              )}
            >
              {visibility.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.08)}
              className={cn(
                "mt-5 font-display font-bold tracking-[-0.03em]",
                "leading-[1.12] text-white",
                "text-[1.875rem] sm:text-[2.25rem] xl:text-[2.625rem]",
              )}
            >
              {visibility.headline.map((line) => (
                <span key={line} className="inline lg:block">
                  {line}{" "}
                </span>
              ))}
            </motion.h2>

            <motion.p
              {...rise(0.16)}
              className={cn(
                "mt-5 max-w-[32rem] leading-relaxed text-pretty",
                "text-[1rem] text-white/68 sm:text-[1.0625rem]",
              )}
            >
              {visibility.description}
            </motion.p>

            {/* ---------------------- Capabilities ------------------ */}
            <ul className="mt-8 grid max-w-[32rem] gap-5">
              {visibility.points.map((point, index) => {
                const Icon = visibilityIcons[point.icon];

                return (
                  <motion.li
                    key={point.label}
                    {...rise(0.22 + index * 0.06)}
                    className="flex items-center gap-4"
                  >
                    <Icon
                      aria-hidden="true"
                      className={cn("size-6 shrink-0", TONES[point.tone].text)}
                    />
                    <span className="text-[0.9375rem] leading-snug text-white/88 sm:text-[1rem]">
                      {point.label}
                    </span>
                  </motion.li>
                );
              })}
            </ul>

            {/* ------------------------- Quote ---------------------- */}
            <motion.blockquote
              {...rise(0.48)}
              className={cn(
                "mt-9 flex max-w-[32rem] gap-3 border-t border-white/12 pt-8",
                "text-[1rem] leading-relaxed text-pretty text-white/82 italic",
                "sm:text-[1.0625rem]",
              )}
            >
              <span
                aria-hidden="true"
                className="font-display text-[1.6rem] leading-none text-[#8b6ef0]"
              >
                &ldquo;
              </span>
              {visibility.quote}
            </motion.blockquote>

            <motion.div {...rise(0.54)}>
              <Link
                href={visibility.cta.href}
                className={cn(
                  "group mt-7 inline-flex items-center gap-2.5",
                  "text-[1rem] text-white/88 underline underline-offset-[6px]",
                  "decoration-white/30 transition-colors hover:decoration-white",
                )}
              >
                {visibility.cta.label}
                <span
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1"
                >
                  &rarr;
                </span>
              </Link>
            </motion.div>
          </div>

          {/* =========================== The board ==================== */}
          {/* Imitation UI: aria-hidden and uncopyable. See the note up top. */}
          <Uncopyable aria-hidden className="@container">
            <motion.div
              {...rise(0.2)}
              className={cn(
                "rounded-[1em] border border-white/10 bg-[#111726]/85",
                "p-[1.1em] backdrop-blur-sm",
                "text-[length:var(--ui)]",
                "shadow-[0_30px_80px_-40px_rgb(0_0_0/0.9)]",
              )}
              style={{ ["--ui" as string]: "clamp(0.6rem, 1.15cqw, 0.8rem)" }}
            >
              {/* ---------------------- Board header --------------- */}
              <div className="flex flex-wrap items-start justify-between gap-[0.9em]">
                <span>
                  <span className="block font-display text-[1.55em] font-bold tracking-[-0.02em] text-white">
                    {board.title}
                  </span>
                  <span className="mt-[0.2em] block text-[0.95em] text-white/50">
                    {board.subtitle}
                  </span>
                </span>

                <span className="flex items-center gap-[0.7em]">
                  {/* View toggle */}
                  <span className="flex rounded-[0.5em] border border-white/12 p-[0.2em]">
                    {board.views.map((view) => (
                      <span
                        key={view.label}
                        className={cn(
                          "rounded-[0.38em] px-[0.9em] py-[0.5em] text-[0.92em]",
                          view.active
                            ? "bg-[#7c4ff0] font-medium text-white"
                            : "text-white/60",
                        )}
                      >
                        {view.label}
                      </span>
                    ))}
                  </span>

                  {/* Date range */}
                  <span
                    className={cn(
                      "hidden items-center gap-[0.55em] rounded-[0.5em]",
                      "border border-white/12 px-[0.9em] py-[0.62em]",
                      "text-[0.92em] text-white/70 @2xl:flex",
                    )}
                  >
                    <Glyph name="calendar" className="size-[1.2em]" />
                    {board.range}
                    <Glyph
                      name="chevronDown"
                      className="size-[1.1em] text-white/45"
                    />
                  </span>
                </span>
              </div>

              {/* ------------------------ KPI strip ---------------- */}
              <div className="mt-[1em] grid grid-cols-2 gap-[0.7em] @2xl:grid-cols-4">
                {board.kpis.map((kpi, index) => (
                  <Tile key={kpi.label} className="p-[0.9em]">
                    <span className="flex items-center gap-[0.6em]">
                      <span
                        className={cn(
                          "grid size-[2em] shrink-0 place-items-center rounded-[0.45em]",
                          TONES[kpi.tone].bg,
                          TONES[kpi.tone].text,
                        )}
                      >
                        <Glyph name={kpi.icon} className="size-[1.15em]" />
                      </span>
                      <span className="min-w-0 truncate text-[0.92em] text-white/70">
                        {kpi.label}
                      </span>
                    </span>

                    <span className="mt-[0.55em] flex items-end justify-between gap-[0.6em]">
                      <span>
                        <span className="block font-display text-[1.85em] leading-none font-bold text-white">
                          {kpi.value}
                        </span>
                        {kpi.delta ? (
                          <span className="mt-[0.4em] flex items-center gap-[0.3em] text-[0.85em] text-[#2ed3a7]">
                            <span aria-hidden="true">&#9650;</span>
                            {kpi.delta}
                          </span>
                        ) : null}
                      </span>

                      <Spark
                        values={kpi.spark}
                        shape={kpi.shape}
                        color={HEX[kpi.tone]}
                        delay={0.5 + index * 0.06}
                        reduce={reduce}
                      />
                    </span>
                  </Tile>
                ))}
              </div>

              {/* ================== Heatmap + capabilities ========== */}
              <div className="mt-[0.7em] grid gap-[0.7em] @3xl:grid-cols-2">
                {/* -------------------- Heatmap ------------------ */}
                <Tile className="p-[1em]">
                  <TileHead title={board.heatmap.title} />

                  <div
                    className="mt-[0.9em] grid gap-x-[0.3em] gap-y-[0.3em]"
                    style={{
                      gridTemplateColumns: `auto repeat(${board.heatmap.columns.length}, minmax(0, 1fr))`,
                    }}
                  >
                    <span />
                    {board.heatmap.columns.map((column) => (
                      <span
                        key={column}
                        className="pb-[0.25em] text-center text-[0.85em] text-white/55"
                      >
                        {column}
                      </span>
                    ))}

                    {board.heatmap.rows.map((row, rowIndex) => (
                      <Fragment key={row.label}>
                        <span className="pr-[0.7em] text-[0.9em] text-white/70">
                          {row.label}
                        </span>
                        {row.cells.map((cell, cellIndex) => (
                          <motion.span
                            key={cellIndex}
                            className="h-[1.9em] rounded-[0.22em]"
                            style={{ background: HEAT[cell] }}
                            initial={
                              reduce ? { opacity: 1 } : { opacity: 0, scale: 0.9 }
                            }
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={inView}
                            transition={{
                              duration: 0.4,
                              delay:
                                0.55 + rowIndex * 0.05 + cellIndex * 0.025,
                              ease: easeOut,
                            }}
                          />
                        ))}
                      </Fragment>
                    ))}
                  </div>

                  {/* The scale. Reads the same array the cells do. */}
                  <span className="mt-[0.85em] flex items-center justify-center gap-[0.6em]">
                    <span className="text-[0.82em] text-white/50">
                      {board.heatmap.legend.low}
                    </span>
                    <span className="flex">
                      {HEAT.map((color) => (
                        <span
                          key={color}
                          className="h-[0.7em] w-[1.7em]"
                          style={{ background: color }}
                        />
                      ))}
                    </span>
                    <span className="text-[0.82em] text-white/50">
                      {board.heatmap.legend.high}
                    </span>
                  </span>
                </Tile>

                {/* ------------------ Capabilities --------------- */}
                <Tile className="p-[1em]">
                  <TileHead title={board.capabilities.title} />

                  <div className="mt-[1em] grid gap-[0.75em]">
                    {board.capabilities.rows.map((row, index) => (
                      <span
                        key={row.label}
                        className="grid grid-cols-[8.5em_1fr_auto] items-center gap-[0.7em]"
                      >
                        <span className="truncate text-[0.9em] text-white/72">
                          {row.label}
                        </span>
                        <Meter
                          fill={row.fill}
                          color={HEX[row.tone]}
                          delay={0.6 + index * 0.08}
                          reduce={reduce}
                        />
                        <span className="text-right text-[0.88em] text-white/60">
                          {Math.round(row.fill * 100)}%
                        </span>
                      </span>
                    ))}
                  </div>
                </Tile>
              </div>

              {/* ================ Trend + the two panels ============ */}
              <div className="mt-[0.7em] grid gap-[0.7em] @3xl:grid-cols-2">
                {/* --------------------- Trend ------------------- */}
                <Tile className="flex flex-col p-[1em]">
                  <TileHead title={board.trend.title} />
                  <Trend reduce={reduce} />
                </Tile>

                {/* The coaching card and the missed-opportunity panel.
                    In the design the coaching card overlaps the trend's right
                    edge; here they share the second column, which keeps the
                    same reading order without a fragile absolute overlap that
                    would break the moment the copy changed length. */}
                <div className="grid gap-[0.7em] @xl:grid-cols-2 @3xl:grid-cols-1 @5xl:grid-cols-2">
                  {/* ------------------ Coaching ---------------- */}
                  <Tile className="p-[1em]">
                    <TileHead title={board.coaching.title} />

                    <div className="mt-[0.5em]">
                      {board.coaching.people.map((person, index) => (
                        <span
                          key={person.name}
                          className={cn(
                            "flex items-center gap-[0.7em] py-[0.6em]",
                            index > 0 && "border-t border-white/8",
                          )}
                        >
                          <Image
                            src={person.avatar}
                            alt=""
                            width={156}
                            height={156}
                            className="size-[2.4em] shrink-0 rounded-full object-cover"
                          />
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-[0.95em] font-medium text-white">
                              {person.name}
                            </span>
                            <span className="mt-[0.1em] block truncate text-[0.85em] text-white/55">
                              {person.focus}
                            </span>
                          </span>
                          <Glyph
                            name="chevron"
                            className="size-[1.1em] shrink-0 text-white/35"
                          />
                        </span>
                      ))}
                    </div>

                    <span
                      className={cn(
                        "mt-[0.6em] block rounded-[0.45em] py-[0.7em]",
                        "border border-[#7c4ff0]/45 bg-[#7c4ff0]/22",
                        "text-center text-[0.92em] text-white/92",
                      )}
                    >
                      {board.coaching.action}
                    </span>
                  </Tile>

                  {/* ------------- Missed opportunity ----------- */}
                  <Tile className="p-[1em]">
                    <span className="flex items-start justify-between gap-[0.6em]">
                      <span className="text-[1em] font-semibold text-white">
                        {board.missed.title}
                      </span>
                      <span
                        aria-hidden="true"
                        className="text-[1em] leading-none text-white/40"
                      >
                        &hellip;
                      </span>
                    </span>

                    {/* Falling bars — the good direction, hence the green
                        delta beneath them. */}
                    <span className="mt-[1em] flex h-[5em] items-end gap-[0.4em]">
                      {board.missed.bars.map((bar, index) => (
                        <motion.span
                          key={index}
                          className="flex-1 rounded-t-[0.15em] bg-[#e8695c]"
                          style={{
                            height: `${bar * 100}%`,
                            transformOrigin: "bottom",
                          }}
                          initial={
                            reduce
                              ? { opacity: 1, scaleY: 1 }
                              : { opacity: 0, scaleY: 0.2 }
                          }
                          whileInView={{ opacity: 1, scaleY: 1 }}
                          viewport={inView}
                          transition={{
                            duration: 0.5,
                            delay: 0.7 + index * 0.04,
                            ease: easeOut,
                          }}
                        />
                      ))}
                    </span>

                    <span className="mt-[0.8em] flex items-center gap-[0.4em] text-[1em] font-medium text-[#2ed3a7]">
                      <span aria-hidden="true">&#9660;</span>
                      {board.missed.delta}
                    </span>

                    <span className="mt-[0.6em] block text-[0.88em] leading-relaxed text-white/55">
                      {board.missed.note}
                    </span>
                  </Tile>
                </div>
              </div>

              {/* ---------------------- Board footer --------------- */}
              <div className="mt-[0.9em] flex items-center justify-end gap-[0.6em]">
                <span className="text-[0.82em] text-white/40">
                  {board.footer.note}
                </span>
                <span className="text-[0.88em] font-medium text-white/75">
                  {board.footer.brand}
                </span>
              </div>
            </motion.div>
          </Uncopyable>
        </div>
      </Container>
    </section>
  );
}

/* ========================================================================== */
/* BOARD PARTS                                                                */
/* ========================================================================== */

/** One panel on the board. */
function Tile({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-[0.6em] border border-white/8 bg-white/[0.035]",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** A tile's title plus its "open this" chevron. */
function TileHead({ title }: { title: string }) {
  return (
    <span className="flex items-center justify-between gap-[0.6em]">
      <span className="text-[1em] font-semibold text-white">{title}</span>
      <Glyph name="chevron" className="size-[1.15em] shrink-0 text-white/35" />
    </span>
  );
}

/** Pulls one glyph out of the set by name. */
function Glyph({
  name,
  className,
}: {
  name: keyof typeof visibilityIcons;
  className?: string;
}) {
  const Icon = visibilityIcons[name];
  return <Icon aria-hidden="true" className={className} />;
}

/** A KPI sparkline — a line for trends, bars for counts. */
function Spark({
  values,
  shape,
  color,
  delay,
  reduce,
}: {
  values: readonly number[];
  shape: string;
  color: string;
  delay: number;
  reduce: boolean;
}) {
  if (shape === "bars") {
    return (
      <span className="flex h-[2.2em] w-[5em] shrink-0 items-end gap-[0.18em]">
        {values.map((value, index) => (
          <motion.span
            key={index}
            className="flex-1 rounded-t-[0.1em]"
            style={{
              height: `${value * 100}%`,
              background: color,
              transformOrigin: "bottom",
            }}
            initial={reduce ? { scaleY: 1 } : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={inView}
            transition={{
              duration: 0.45,
              delay: delay + index * 0.03,
              ease: easeOut,
            }}
          />
        ))}
      </span>
    );
  }

  // A line: project the 0-1 series onto a 100x36 box, y inverted.
  const step = 100 / (values.length - 1);
  const d = values
    .map((value, index) => `${index * step},${36 - value * 32}`)
    .join(" L ");

  return (
    <svg
      viewBox="0 0 100 36"
      fill="none"
      preserveAspectRatio="none"
      className="h-[2.2em] w-[5em] shrink-0 overflow-visible"
    >
      <motion.path
        d={`M ${d}`}
        stroke={color}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={inView}
        transition={{ duration: 0.8, delay, ease: easeOut }}
      />
    </svg>
  );
}

/** A horizontal capability bar. Fills on scroll. */
function Meter({
  fill,
  color,
  delay,
  reduce,
}: {
  fill: number;
  color: string;
  delay: number;
  reduce: boolean;
}) {
  return (
    <span className="h-[0.75em] w-full overflow-hidden rounded-full bg-white/8">
      <motion.span
        className="block h-full rounded-full"
        style={{ background: color }}
        initial={reduce ? { width: `${fill * 100}%` } : { width: 0 }}
        whileInView={{ width: `${fill * 100}%` }}
        viewport={inView}
        transition={{ duration: 0.8, delay, ease: easeOut }}
      />
    </span>
  );
}

/**
 * The 12-week trend. Both series are projected onto one 100x100 viewBox with
 * `preserveAspectRatio="none"`, so the plot stretches to the tile while the
 * strokes and dots stay round via non-scaling-stroke.
 */
function Trend({ reduce }: { reduce: boolean }) {
  const { series, axis, ticks } = board.trend;
  const max = Math.max(...axis);

  /** Project value `i` of a series onto the plot box. */
  const point = (values: readonly number[], index: number) => {
    const x = (index / (values.length - 1)) * 100;
    const y = 100 - (values[index] / max) * 100;
    return [x, y] as const;
  };

  const pathOf = (values: readonly number[]) =>
    `M ${values.map((_, i) => point(values, i).join(",")).join(" L ")}`;

  return (
    // `flex-1` so the plot takes whatever height the tile has spare, rather
    // than sitting at a fixed height with dead space under it when the row is
    // stretched by the taller column beside it.
    <div className="mt-[0.9em] flex min-h-0 flex-1 flex-col">
      <div className="flex min-h-0 flex-1 gap-[0.6em]">
        {/* Y axis */}
        <span className="flex min-h-[8.5em] flex-col justify-between text-right text-[0.8em] text-white/45">
          {[...axis].reverse().map((value) => (
            <span key={value}>{value}</span>
          ))}
        </span>

        {/* Plot */}
        <div className="relative min-h-[8.5em] flex-1 border-l border-white/10">
          {/* Gridlines, one per axis stop. */}
          {axis.map((value) => (
            <span
              key={value}
              className="absolute inset-x-0 border-t border-white/7"
              style={{ top: `${100 - (value / max) * 100}%` }}
            />
          ))}

          <svg
            viewBox="0 0 100 100"
            fill="none"
            preserveAspectRatio="none"
            className="absolute inset-0 size-full overflow-visible"
          >
            {series.map((line, lineIndex) => (
              <motion.path
                key={line.key}
                d={pathOf(line.values)}
                stroke={line.key === "readiness" ? TEAL : AMBER}
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={inView}
                transition={{
                  duration: 1,
                  delay: 0.65 + lineIndex * 0.12,
                  ease: easeOut,
                }}
              />
            ))}
          </svg>

          {/* Dots, in percentage space so they stay round while the plot
              stretches — an SVG circle would go oval under the same skew. */}
          {series.map((line) =>
            line.values.map((_, index) => {
              const [x, y] = point(line.values, index);
              return (
                <span
                  key={`${line.key}-${index}`}
                  className="absolute size-[0.45em] -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    background: line.key === "readiness" ? TEAL : AMBER,
                  }}
                />
              );
            }),
          )}
        </div>
      </div>

      {/* X axis */}
      <span className="mt-[0.45em] flex justify-between pl-[2.4em] text-[0.8em] text-white/45">
        {ticks.map((tick) => (
          <span key={tick}>{tick}</span>
        ))}
      </span>

      {/* Legend */}
      <span className="mt-[0.7em] flex items-center gap-[1.4em]">
        {series.map((line) => (
          <span
            key={line.key}
            className="flex items-center gap-[0.45em] text-[0.85em] text-white/62"
          >
            <span
              className="size-[0.65em] rounded-full"
              style={{ background: line.key === "readiness" ? TEAL : AMBER }}
            />
            {line.label}
          </span>
        ))}
      </span>
    </div>
  );
}
