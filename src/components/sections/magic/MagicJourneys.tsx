"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { Uncopyable } from "@/components/ui/Uncopyable";
import { magic } from "@/content/magic";
import { cn } from "@/lib/utils";

import {
  ArrowLeftIcon,
  BrainIcon,
  ChevronDownIcon,
  journeyBadgeIcons,
  journeyFactIcons,
  journeyTabIcons,
  MedalIcon,
  MoreDotsIcon,
  RefreshIcon,
} from "./MagicJourneyIcons";
import { MagicStarfield } from "./MagicStarfield";

/**
 * MAGIC JOURNEYS
 * ---------------------------------------------------------------------------
 * Section 5 of the LurnyMagic page: four levels of structure, drawn as
 * product cards that STEP UPWARD left to right and are strung together by a
 * rising amber line.
 *
 * THE STAIRCASE
 * `lift` in the content is the only place a card's height is decided. It is a
 * fraction of `LIFT_RANGE`, and it drives BOTH the card's upward offset and
 * the y of its node on the connector — so the line can never come unstuck
 * from the cards it joins. Changing a card's height is a one-number edit.
 *
 * The staircase only exists on xl, where four cards genuinely sit side by
 * side. Below that they stack, a diagonal line would point at nothing, and
 * both the lift and the connector layer are dropped.
 *
 * THE CONNECTOR
 * One SVG behind the row, on a 0..100 percentage viewBox with
 * `preserveAspectRatio="none"` so its nodes track the cards at any width;
 * `vectorEffect` keeps the stroke even despite that distortion. It draws
 * itself on scroll (`pathLength` 0 to 1), the node dots pop in behind the
 * advancing tip, and a short bright dash then runs the length of it on a
 * loop — the "signal travelling up the path".
 *
 * THE PANELS
 * Every card's inner panel is DRAWN from content, not shipped as a
 * screenshot — the choice the rest of this page makes, and for the same
 * reasons: a flat export cannot re-flow, and its text would be an image.
 *
 * They are sized in `cqw` against a container query on the panel rather than
 * in rem. A card is much narrower at four-across than stacked on a phone, so
 * viewport-relative type would be wrong at both ends; sized against the card
 * the whole drawing scales like a screenshot would.
 *
 * All four panels are <Uncopyable> and aria-hidden: they imitate product UI
 * and their text is not real page copy. The card TITLES and descriptions are,
 * and sit outside the wrapper.
 */

const { journeys } = magic;

/** Motion's string easings are not typed, so the cubic curve is spelled out. */
const easeOut = [0.16, 1, 0.3, 1] as const;

/**
 * How far the tallest card rises above the shortest, in rem.
 *
 * A card's own offset is `lift * LIFT_RANGE`. Deep enough that the climb
 * reads at a glance, shallow enough that the top card still clears the
 * headline above it.
 */
const LIFT_RANGE = 9;

/** Shared chrome for a card and for the panels inside it. */
const cardChrome = "rounded-2xl bg-[#0d0a1b]/85 ring-1 ring-white/8";
const panelChrome = "rounded-xl bg-[#0a0814] ring-1 ring-white/6";

/** The status pill on a course row — the design's muted red. */
const statusPill = cn(
  "rounded-md px-[1.6cqw] py-[0.5cqw] text-[1.9cqw] font-semibold",
  "bg-[#4a1520] text-[#f08a8a] ring-1 ring-[#7d2532]",
);

/** The module-count pill beside it. */
const modulePill = cn(
  "rounded-md px-[1.6cqw] py-[0.5cqw] text-[1.9cqw] font-semibold",
  "bg-brand-500/20 text-brand-200 ring-1 ring-brand-400/30",
);

/* ========================================================================== */
/*  SHARED PIECES                                                             */
/* ========================================================================== */

type Item = (typeof journeys.items)[number];
type Tab = {
  readonly label: string;
  readonly count: string;
  readonly icon: string;
};

/**
 * The tab strip at the top of a panel.
 *
 * The first tab is always the active one, which the design marks with a short
 * violet underline directly beneath it.
 */
function PanelTabs({ tabs, more }: { tabs: readonly Tab[]; more?: boolean }) {
  return (
    <div className="flex items-center gap-[3cqw] border-b border-white/6 pb-[1.6cqw]">
      {tabs.map((tab, index) => {
        const Icon = journeyTabIcons[tab.icon as keyof typeof journeyTabIcons];

        return (
          <span
            key={tab.label}
            className={cn(
              "relative flex items-center gap-[1.2cqw] pb-[1.2cqw]",
              index === 0 ? "text-white" : "text-neutral-500",
            )}
          >
            <Icon className="size-[2.8cqw]" />
            <span className="text-[2.1cqw] font-semibold tracking-[0.06em] uppercase">
              {tab.label}
            </span>
            <span
              className={cn(
                "rounded-full bg-white/8 px-[1.2cqw] py-[0.2cqw]",
                "text-[1.7cqw] text-neutral-400",
              )}
            >
              {tab.count}
            </span>

            {/* The active underline, drawn under the first tab only. */}
            {index === 0 && (
              <span className="absolute -bottom-[1.7cqw] left-0 h-[0.4cqw] w-full rounded-full bg-brand-400" />
            )}
          </span>
        );
      })}

      {more && (
        <span className="ml-auto flex items-center gap-[0.8cqw] pb-[1.2cqw] text-[2.1cqw] text-neutral-400">
          More
          <ChevronDownIcon className="size-[2.4cqw]" />
        </span>
      )}
    </div>
  );
}

/** The shared placeholder thumbnail. */
function Thumb({ className }: { className?: string }) {
  return (
    <Image
      src={journeys.thumbnail.src}
      alt={journeys.thumbnail.alt}
      width={journeys.thumbnail.width}
      height={journeys.thumbnail.height}
      sizes="(min-width: 1280px) 6rem, 20vw"
      className={cn("object-cover", className)}
    />
  );
}

/* ========================================================================== */
/*  PANELS                                                                    */
/* ========================================================================== */

/**
 * The microcourse list and the playlist queue.
 *
 * One component for both: they are the same row shape, differing only in
 * whether a row carries status pills (`list`) or a module count and an
 * overflow control (`queue`).
 */
function RowsPanel({
  item,
}: {
  item: Extract<Item, { kind: "list" | "queue" }>;
}) {
  const isQueue = item.kind === "queue";

  return (
    <div
      className={cn(panelChrome, "@container flex h-full flex-col p-[3cqw]")}
    >
      <PanelTabs tabs={item.tabs} more={isQueue} />

      <ul className="mt-[2.4cqw] flex flex-1 flex-col justify-start gap-[1.6cqw]">
        {item.rows.map((row) => (
          <li
            key={row.title}
            className={cn(
              "flex items-center gap-[2.4cqw] rounded-lg p-[1.6cqw]",
              "bg-white/3 ring-1 ring-white/5",
              "duration-normal transition-colors ease-out",
              "group-hover:bg-white/6",
            )}
          >
            <Thumb className="size-[13cqw] shrink-0 rounded-md" />

            <div className="min-w-0 flex-1">
              <p className="text-[2.4cqw] leading-snug font-semibold text-white">
                {row.title}
              </p>

              {"status" in row ? (
                <div className="mt-[1.2cqw] flex flex-wrap items-center gap-[1.2cqw]">
                  <span className={cn(modulePill, "uppercase")}>
                    {row.modules}
                  </span>
                  <span className={cn(statusPill, "uppercase")}>
                    {row.status}
                  </span>
                </div>
              ) : (
                <p className="mt-[0.6cqw] text-[2.1cqw] text-neutral-400">
                  {row.modules}
                </p>
              )}
            </div>

            {isQueue && (
              <MoreDotsIcon className="size-[3cqw] shrink-0 text-neutral-500" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** The 2x2 course library. */
function GridPanel({ item }: { item: Extract<Item, { kind: "grid" }> }) {
  return (
    <div
      className={cn(panelChrome, "@container flex h-full flex-col p-[3cqw]")}
    >
      <PanelTabs tabs={item.tabs} more />

      <ul className="mt-[2.4cqw] grid flex-1 grid-cols-2 content-start gap-[2cqw]">
        {item.tiles.map((tile) => (
          <li
            key={tile.title}
            className={cn(
              "overflow-hidden rounded-lg bg-white/3 ring-1 ring-white/5",
              "duration-normal transition-colors ease-out",
              "group-hover:bg-white/6",
            )}
          >
            <div className="relative">
              <Thumb className="aspect-[4/3] w-full" />

              {/* The pills sit ON the thumbnail's lower edge, as the design
                  overlaps them. */}
              <div className="absolute inset-x-[1.2cqw] bottom-[1.2cqw] flex flex-wrap gap-[1cqw]">
                <span className={cn(modulePill, "uppercase")}>
                  {tile.modules}
                </span>
                <span className={cn(statusPill, "uppercase")}>
                  {tile.status}
                </span>
              </div>
            </div>

            <p className="p-[1.6cqw] text-[2.3cqw] leading-snug font-semibold text-white">
              {tile.title}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * The skill-map radar.
 *
 * Eight axes on a 100x100 box. Both rings and the value polygon are computed
 * from the same `point()`, so the fill can never disagree with the grid it
 * sits on.
 *
 * The polygon SCALES OPEN from the centre on scroll: the shape is drawn at
 * full size and the group is transformed, which is a compositor-only change
 * — animating the `points` string would re-rasterise the path every frame.
 */
function SkillRadar({
  skillMap,
  reduce,
}: {
  skillMap: Extract<Item, { kind: "journey" }>["journey"]["skillMap"];
  reduce: boolean | null;
}) {
  const { axes, max } = skillMap;
  const CENTRE = 50;
  const RADIUS = 34;

  /** Polar to cartesian, with angle 0 at the top and running clockwise. */
  const point = (index: number, fraction: number) => {
    const angle = (index / axes.length) * Math.PI * 2 - Math.PI / 2;
    const r = RADIUS * fraction;

    return [
      +(CENTRE + Math.cos(angle) * r).toFixed(2),
      +(CENTRE + Math.sin(angle) * r).toFixed(2),
    ] as const;
  };

  const ring = (fraction: number) =>
    axes.map((_, index) => point(index, fraction).join(",")).join(" ");

  const values = axes
    .map((axis, index) => point(index, axis.value / max).join(","))
    .join(" ");

  return (
    <svg viewBox="0 0 100 100" className="size-full" aria-hidden="true">
      {/* The grid: three rings and one spoke per axis. */}
      {[1, 0.66, 0.33].map((fraction) => (
        <polygon
          key={fraction}
          points={ring(fraction)}
          fill={fraction === 1 ? "rgb(255 255 255 / 0.03)" : "none"}
          stroke="rgb(255 255 255 / 0.1)"
          strokeWidth="0.4"
        />
      ))}

      {axes.map((axis, index) => {
        const [x, y] = point(index, 1);

        return (
          <line
            key={`${axis.label}-${index}`}
            x1={CENTRE}
            y1={CENTRE}
            x2={x}
            y2={y}
            stroke="rgb(255 255 255 / 0.08)"
            strokeWidth="0.4"
          />
        );
      })}

      {/* The value shape. Scaled about the centre so it blooms outward. */}
      <motion.g
        initial={reduce ? "shown" : "hidden"}
        whileInView="shown"
        viewport={{ once: true, amount: "some" }}
        style={{ transformOrigin: "50px 50px" }}
        variants={{
          hidden: { scale: 0, opacity: 0 },
          shown: {
            scale: 1,
            opacity: 1,
            transition: { duration: 0.9, delay: 0.75, ease: easeOut },
          },
        }}
      >
        <polygon
          points={values}
          fill="var(--brand-500)"
          fillOpacity="0.75"
          stroke="var(--brand-300)"
          strokeWidth="0.7"
          strokeLinejoin="round"
        />

        {axes.map((axis, index) => {
          const [x, y] = point(index, axis.value / max);

          return (
            <circle
              key={`${axis.label}-${index}-dot`}
              cx={x}
              cy={y}
              r="1.2"
              fill="#0d0a1b"
              stroke="var(--brand-200)"
              strokeWidth="0.7"
            />
          );
        })}
      </motion.g>

      {/* The score disc at the centre, over the shape. */}
      <circle
        cx={CENTRE}
        cy={CENTRE}
        r="9"
        fill="#0b0816"
        stroke="rgb(255 255 255 / 0.12)"
        strokeWidth="0.5"
      />
      <text
        x={CENTRE}
        y={CENTRE + 1.2}
        textAnchor="middle"
        fill="#ffffff"
        fontSize="7"
        fontWeight="700"
      >
        {skillMap.score.value}
      </text>
      <text
        x={CENTRE}
        y={CENTRE + 6}
        textAnchor="middle"
        fill="rgb(255 255 255 / 0.45)"
        fontSize="3.4"
      >
        {skillMap.score.unit}
      </text>
    </svg>
  );
}

/** The role header and the skill map beneath it. */
function JourneyPanel({
  item,
  reduce,
}: {
  item: Extract<Item, { kind: "journey" }>;
  reduce: boolean | null;
}) {
  const { journey } = item;
  const { skillMap } = journey;

  /**
   * The axis labels, placed around the radar in the same clockwise order the
   * chart draws them. Percentages of the wrapper, not of the SVG — they are
   * HTML so the type stays selectable-crisp rather than being SVG <text>.
   */
  const labelPositions = [
    { left: "50%", top: "-1%", translate: "-50% 0" },
    { left: "96%", top: "20%", translate: "-50% 0" },
    { left: "104%", top: "48%", translate: "-50% -50%" },
    { left: "96%", top: "76%", translate: "-50% 0" },
    { left: "50%", top: "95%", translate: "-50% 0" },
    { left: "4%", top: "76%", translate: "-50% 0" },
    { left: "-4%", top: "48%", translate: "-50% -50%" },
    { left: "4%", top: "20%", translate: "-50% 0" },
  ];

  return (
    <div className="@container flex h-full flex-col">
      {/* -------------------------- Role header --------------------- */}
      <p className="flex items-center gap-[1.4cqw] text-[2.2cqw] text-neutral-300">
        <ArrowLeftIcon className="size-[2.6cqw]" />
        {journey.back}
      </p>

      <p className="mt-[2.4cqw] text-[3.4cqw] font-bold">
        <span className="text-accent-400">{journey.role.lead} </span>
        {/* The role half takes the design's violet-pink wash. */}
        <span className="bg-[linear-gradient(90deg,#f6a8c8_0%,#a98bf0_100%)] bg-clip-text text-transparent">
          {journey.role.tail}
        </span>
      </p>

      <div className="mt-[2cqw] grid grid-cols-[1.35fr_1fr] gap-[3cqw]">
        <p className="text-[1.9cqw] leading-relaxed text-neutral-400">
          {journey.objective}
        </p>

        <div>
          <div className="flex items-baseline justify-between gap-[1.6cqw]">
            <span className="text-[2.1cqw] text-neutral-300">
              {journey.progress.label}
            </span>
            <span className="text-[2cqw] text-neutral-400">
              {journey.progress.value}
            </span>
          </div>

          {/* The bar fills from empty on scroll, so an at-zero journey still
              reads as a track waiting to be filled rather than a dead rule. */}
          <span className="mt-[1.2cqw] block h-[1.4cqw] overflow-hidden rounded-full bg-white/10">
            <motion.span
              className="block h-full rounded-full bg-brand-400"
              initial={reduce ? "shown" : "hidden"}
              whileInView="shown"
              viewport={{ once: true, amount: "some" }}
              variants={{
                hidden: { scaleX: 0 },
                shown: {
                  scaleX: 1,
                  transition: { duration: 0.8, delay: 0.7, ease: easeOut },
                },
              }}
              style={{
                width: `${journey.progress.fraction * 100}%`,
                transformOrigin: "left",
              }}
            />
          </span>

          <p className="mt-[2.4cqw] flex items-center gap-[1.4cqw] text-[2.1cqw] text-neutral-300">
            <MedalIcon className="size-[2.8cqw] text-accent-400" />
            {journey.xp}
          </p>
        </div>
      </div>

      {/* ---------------------------- Facts ------------------------- */}
      <ul className="mt-[2.4cqw] space-y-[1.4cqw]">
        {journey.facts.map((fact) => {
          const Icon =
            journeyFactIcons[fact.icon as keyof typeof journeyFactIcons];

          return (
            <li
              key={fact.label}
              className="flex items-center gap-[1.6cqw] text-[2cqw] text-neutral-300"
            >
              <Icon
                className={cn(
                  "size-[2.6cqw] shrink-0",
                  fact.icon === "goal" || fact.icon === "time"
                    ? "text-accent-400"
                    : "text-brand-300",
                )}
              />
              {fact.label}
            </li>
          );
        })}
      </ul>

      {/* -------------------------- Skill map ----------------------- */}
      <div className={cn(panelChrome, "mt-[2.8cqw] p-[2.4cqw]")}>
        <div className="flex items-center gap-[1.4cqw]">
          <BrainIcon className="size-[2.8cqw] text-brand-300" />
          <span className="text-[2.3cqw] font-semibold">{skillMap.title}</span>
          <span className="text-[1.8cqw] text-neutral-500">
            {skillMap.updated}
          </span>

          <span
            className={cn(
              "ml-auto flex items-center gap-[1cqw] rounded-md",
              "bg-brand-500 px-[1.6cqw] py-[0.7cqw] text-[1.8cqw] font-medium",
            )}
          >
            <RefreshIcon className="size-[2.2cqw]" />
            {skillMap.action}
          </span>
        </div>

        {/* The chart, with its labels laid over the top. */}
        <div className="relative mx-auto mt-[2.4cqw] aspect-square w-[62%]">
          <SkillRadar skillMap={skillMap} reduce={reduce} />

          {skillMap.axes.map((axis, index) => {
            const position = labelPositions[index];

            return (
              <span
                key={`${axis.label}-${index}`}
                className="absolute w-[30cqw] text-center leading-tight"
                style={{
                  left: position.left,
                  top: position.top,
                  translate: position.translate,
                }}
              >
                <span className="block text-[1.6cqw] text-neutral-400">
                  {axis.label}
                </span>
                <span className="block text-[1.7cqw] font-semibold text-brand-200">
                  {axis.value}/{skillMap.max}
                </span>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ========================================================================== */
/*  SECTION                                                                   */
/* ========================================================================== */

export function MagicJourneys() {
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

  /**
   * Where each card's connector node sits, in percent of the diagram box.
   *
   * MEASURED, not derived. The obvious approach — computing y from the same
   * `lift` that offsets the card — is wrong here: the cards hang from a
   * shared bottom edge (`items-end`) and they are NOT the same height, so a
   * card's top is `bottom − lift − ownHeight`. Deriving y from lift alone
   * puts the line through the cards rather than along their top edges, and
   * any reflow (a wrapping title, a different font) moves the real edge
   * again.
   *
   * So each card reports its own top edge and centre, and the path is built
   * from those. It re-measures on resize, which is also what keeps the line
   * attached while the grid reflows between breakpoints.
   */
  const boxRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [nodes, setNodes] = useState<{ x: number; y: number }[]>([]);

  const measure = useCallback(() => {
    const box = boxRef.current;
    if (!box) return;

    const bounds = box.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;

    const next = cardRefs.current.flatMap((card) => {
      if (!card) return [];

      const rect = card.getBoundingClientRect();

      return [
        {
          x: +(
            ((rect.left + rect.width / 2 - bounds.left) / bounds.width) *
            100
          ).toFixed(2),
          y: +(((rect.top - bounds.top) / bounds.height) * 100).toFixed(2),
        },
      ];
    });

    setNodes((current) =>
      // Only commit a real change: setState on every observer tick would
      // re-render this section continuously while the page is resized.
      current.length === next.length &&
      current.every((node, i) => node.x === next[i].x && node.y === next[i].y)
        ? current
        : next,
    );
  }, []);

  useEffect(() => {
    measure();

    const observer = new ResizeObserver(measure);
    if (boxRef.current) observer.observe(boxRef.current);
    for (const card of cardRefs.current) if (card) observer.observe(card);

    return () => observer.disconnect();
  }, [measure]);

  const linePath = nodes
    .map((node, index) => `${index === 0 ? "M" : "L"} ${node.x} ${node.y}`)
    .join(" ");

  return (
    <section className="relative isolate overflow-hidden bg-[#0a0715] py-section-lg text-white">
      {/* ===================== Background layers ====================== */}
      {/* A violet bloom up the right, where the path climbs — so the top of
          the staircase sits in light rather than on flat black. */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -z-10",
          "top-[-10%] right-[-10%] h-[38rem] w-[46rem]",
          "rounded-full bg-brand-700/20 blur-3xl",
        )}
      />
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -z-10",
          "bottom-[-20%] left-[-5%] h-[30rem] w-[36rem]",
          "rounded-full bg-brand-900/40 blur-3xl",
        )}
      />

      {/* The same drifting particle field as the hero, reused rather than
          rebuilt — see MagicStarfield for why it is CSS and not canvas. */}
      <MagicStarfield className="-z-10" />

      <Container width="hero" className="relative">
        {/* ============================ Heading ======================= */}
        <div className="max-w-[46rem]">
          <motion.p
            {...rise(0)}
            className={cn(
              "text-[0.6875rem] font-bold tracking-[0.14em] uppercase",
              "text-accent-400 sm:text-xs",
            )}
          >
            {journeys.eyebrow}
          </motion.p>

          <motion.h2
            {...rise(0.08)}
            className={cn(
              "mt-5 font-semibold tracking-[-0.02em]",
              "leading-[1.08] text-balance",
              // Measured from the design at ~58px on a 1440 frame.
              "text-[2.125rem] text-brand-100 sm:text-[2.75rem] lg:text-[3.375rem]",
            )}
          >
            {journeys.headline.lead}{" "}
            <em className="font-serif italic">{journeys.headline.emphasis}</em>{" "}
            {journeys.headline.tail}
          </motion.h2>

          <motion.p
            {...rise(0.16)}
            className={cn(
              "mt-6 max-w-[34rem] leading-relaxed text-pretty",
              "text-[0.9375rem] text-neutral-300 sm:text-base",
            )}
          >
            {journeys.description}
          </motion.p>
        </div>

        {/* ============================= Cards ======================== */}
        <div ref={boxRef} className="relative mt-12 xl:mt-16">
          {/* ------------------------ Connector ------------------- */}
          {/*
            One layer behind the row. xl only: below that the cards stack and
            a rising diagonal would join nothing. See the note at the top of
            this file for the geometry.
          */}
          {/* Rendered only once the cards have been measured — before that
              there is no honest geometry to draw. */}
          {nodes.length === journeys.items.length && (
            <svg
              // Keyed on the geometry: the connector mounts only once the
              // cards have been measured, which can be AFTER the section has
              // scrolled into view. Without a key change the children keep
              // their already-settled `whileInView` state and the path stays
              // at pathLength 0 — drawn, but invisible.
              key={linePath}
              aria-hidden="true"
              focusable="false"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 -z-0 hidden size-full xl:block"
            >
              {/* The line itself, drawing on from the left. */}
              <motion.path
                d={linePath}
                fill="none"
                stroke="var(--accent-400)"
                strokeOpacity={0.75}
                strokeWidth={1.4}
                strokeLinecap="round"
                strokeLinejoin="round"
                // The viewBox is distorted by preserveAspectRatio="none", so
                // without this the stroke would stretch unevenly too.
                vectorEffect="non-scaling-stroke"
                initial={reduce ? "shown" : "hidden"}
                whileInView="shown"
                viewport={{ once: true, amount: "some" }}
                variants={{
                  hidden: { pathLength: 0, opacity: 0 },
                  shown: {
                    pathLength: 1,
                    opacity: 1,
                    transition: { duration: 1.5, delay: 0.2, ease: easeOut },
                  },
                }}
              />

              {/*
              A short bright dash that runs the length of the path on a loop —
              the signal travelling up toward the finished journey.

              Driven by `strokeDashoffset` on a dash pattern long enough that
              only one segment is ever lit. Dropped entirely for reduced
              motion: it is ambient, endless movement, which is exactly what
              that setting asks us not to ship.
            */}
              {!reduce && (
                <motion.path
                  d={linePath}
                  fill="none"
                  stroke="var(--accent-200)"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  pathLength={1}
                  strokeDasharray="0.08 0.92"
                  initial={{ strokeDashoffset: 1, opacity: 0 }}
                  whileInView={{ strokeDashoffset: 0, opacity: [0, 1, 1, 0] }}
                  viewport={{ once: true, amount: "some" }}
                  transition={{
                    duration: 2.6,
                    delay: 1.6,
                    ease: "linear",
                    repeat: Infinity,
                    repeatDelay: 1.4,
                    opacity: {
                      duration: 2.6,
                      delay: 1.6,
                      times: [0, 0.12, 0.85, 1],
                      repeat: Infinity,
                      repeatDelay: 1.4,
                    },
                  }}
                />
              )}

              {/* A node dot per card, popping in behind the advancing tip. */}
              {nodes.map((node, index) => (
                <motion.circle
                  key={index}
                  cx={node.x}
                  cy={node.y}
                  r={1.1}
                  fill="var(--accent-400)"
                  // Same distortion problem as the stroke: an ellipse would be
                  // squashed by the viewBox, so the radius is held in px.
                  vectorEffect="non-scaling-stroke"
                  initial={reduce ? "shown" : "hidden"}
                  whileInView="shown"
                  viewport={{ once: true, amount: "some" }}
                  variants={{
                    hidden: { scale: 0, opacity: 0 },
                    shown: {
                      scale: 1,
                      opacity: 1,
                      transition: {
                        duration: 0.4,
                        delay: 0.35 + index * 0.36,
                        ease: easeOut,
                      },
                    },
                  }}
                  style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                />
              ))}
            </svg>
          )}

          {/* -------------------------- Row ----------------------- */}
          {/* `items-end` so the cards hang from a shared baseline and the
              lift raises them off it. */}
          <ul className="relative grid gap-6 sm:grid-cols-2 xl:grid-cols-4 xl:items-end xl:gap-4">
            {journeys.items.map((item, index) => {
              const Badge =
                journeyBadgeIcons[item.icon as keyof typeof journeyBadgeIcons];

              return (
                <motion.li
                  key={item.title}
                  ref={(node) => {
                    cardRefs.current[index] = node;
                  }}
                  initial={reduce ? "shown" : "hidden"}
                  whileInView="shown"
                  viewport={{ once: true, amount: "some" }}
                  variants={{
                    // Each card arrives from below, in sequence, so the row
                    // builds as a climb rather than appearing all at once.
                    hidden: { opacity: 0, y: 34 },
                    shown: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.7,
                        delay: 0.25 + index * 0.14,
                        ease: easeOut,
                      },
                    },
                  }}
                  className={cn(
                    cardChrome,
                    "group flex flex-col p-4 backdrop-blur-sm",
                    "duration-normal transition-[box-shadow,translate,--tw-ring-color] ease-out",
                    "will-change-[translate]",
                    "hover:-translate-y-1.5 hover:ring-brand-400/35",
                    "hover:shadow-[0_28px_60px_-30px_rgb(127_82_220/0.65)]",
                    "xl:[margin-bottom:var(--lift)]",
                  )}
                  /*
                    The staircase.

                    The lift is published as a custom property and consumed by
                    the `xl:[margin-bottom:var(--lift)]` utility above, rather
                    than written as an inline margin — an inline style has no
                    breakpoint, and below xl the cards stack, where a raised
                    card would just leave a hole in the column.
                  */
                  style={{
                    ["--lift" as string]: `${item.lift * LIFT_RANGE}rem`,
                  }}
                >
                  {/* --------------------- Panel ------------------- */}
                  <Uncopyable className="flex min-h-0 flex-1 flex-col">
                    {(item.kind === "list" || item.kind === "queue") && (
                      <RowsPanel item={item} />
                    )}
                    {item.kind === "grid" && <GridPanel item={item} />}
                    {item.kind === "journey" && (
                      <JourneyPanel item={item} reduce={reduce} />
                    )}
                  </Uncopyable>

                  {/* ---------------------- Label ------------------ */}
                  <div className="mt-5">
                    <span
                      className={cn(
                        "grid size-10 place-items-center rounded-xl",
                        "bg-brand-600 text-white",
                        "duration-normal transition-[scale,background-color] ease-out",
                        "group-hover:scale-110 group-hover:bg-brand-500",
                      )}
                    >
                      <Badge className="size-5" />
                    </span>

                    <h3 className="mt-3.5 text-[1.25rem] font-bold sm:text-[1.375rem]">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-[0.875rem] text-neutral-400">
                      {item.description}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </div>

        {/* =========================== Footnote ======================= */}
        <motion.p
          {...rise(0.2)}
          className={cn(
            "mt-12 flex items-center justify-center gap-3",
            "text-center text-[0.9375rem] text-neutral-300 sm:text-base",
          )}
        >
          <span aria-hidden="true" className="text-lg text-accent-400">
            ✦
          </span>
          {journeys.footnote}
        </motion.p>
      </Container>
    </section>
  );
}
