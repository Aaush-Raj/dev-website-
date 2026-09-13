"use client";

import type { ComponentType, SVGProps } from "react";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { Uncopyable } from "@/components/ui/Uncopyable";
import { fabric } from "@/content/fabric";
import { cn } from "@/lib/utils";

import {
  BarsSolidIcon,
  BuildingIcon,
  CapSolidIcon,
  ChatBubbleIcon,
  ChevronIcon,
  CubeIcon,
  DatabaseIcon,
  IdentityIcon,
  LayersIcon,
  LinkIcon,
  NodesIcon,
  PulseIcon,
  ShieldIcon,
  SquaresIcon,
  WandIcon,
} from "./FabricLayerIcons";

/**
 * THE PLATFORM, EXPLAINED
 * ---------------------------------------------------------------------------
 * Section 2: three light cards on the slate ground — the foundation, the
 * engines that run on it, and the suites those engines compose into.
 *
 * NOTHING HERE SHIPS AS AN IMAGE. The pack supplies the ground as a 1.5MB
 * plate and the cards as a 1.2MB transparent PNG. The ground is flat slate
 * with faint line geometry and two pieces of type; the cards are pure
 * interface. Drawn, the section downloads nothing, keeps its text selectable
 * and translatable, and lets the handwritten annotation animate — which a
 * baked plate could not.
 *
 * EACH CARD'S INTERIOR IS A DIFFERENT SHAPE, deliberately: a feature grid, an
 * engine tree with connectors, and a list of suites. That is the section's
 * argument — the three layers are not three of the same thing — so they are
 * three components rather than one card with swappable contents.
 */

const { layers } = fabric;

/** Motion's string easings are not typed, so the cubic curve is spelled out. */
const easeOut = [0.16, 1, 0.3, 1] as const;

const GLYPHS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  identity: IdentityIcon,
  link: LinkIcon,
  database: DatabaseIcon,
  shield: ShieldIcon,
  nodes: NodesIcon,
  cube: CubeIcon,
  pulse: PulseIcon,
  wand: WandIcon,
  layers: LayersIcon,
  chat: ChatBubbleIcon,
  bars: BarsSolidIcon,
  building: BuildingIcon,
  cap: CapSolidIcon,
  squares: SquaresIcon,
};

/**
 * Tile fills and glyph colours, sampled from the design.
 *
 * Keyed per ENGINE rather than per position — the same engine carries the same
 * colour wherever it appears across this site.
 */
const TONES = {
  violet: { tile: "bg-[#e8e4fb]", glyph: "text-[#6d4fd0]" },
  mint: { tile: "bg-[#d8f0e8]", glyph: "text-[#2f8f77]" },
  peach: { tile: "bg-[#fbdfd6]", glyph: "text-[#d4674a]" },
  blue: { tile: "bg-[#dce8fa]", glyph: "text-[#3f72c4]" },
  cream: { tile: "bg-[#fbefd6]", glyph: "text-[#b8862f]" },
} as const;

export function FabricLayers() {
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduce ? "shown" : "hidden",
    whileInView: "shown",
    viewport: {
      once: true,
      amount: "some",
      margin: "0px 0px 15% 0px",
    } as const,
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
        "relative isolate overflow-hidden",
        // Sampled from the supplied plate: a blue-grey slate.
        "bg-[#47617f] text-white",
        "py-16 sm:py-20 lg:py-24",
      )}
    >
      {/* ====================== Background geometry ===================== */}
      {/*
        The plate's faint construction lines — a circle, an ellipse and two
        long diagonals in the top-right corner. Drawn at a fixed aspect so the
        circle stays a circle; a stretched box would flatten it to an oval and
        the pair would stop reading as geometry.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 -z-10 h-[62%] w-[42%]"
      >
        <svg
          viewBox="0 0 400 400"
          preserveAspectRatio="xMaxYMin meet"
          className="h-full w-full"
        >
          <g fill="none" stroke="white" strokeOpacity={0.14} strokeWidth={1}>
            <circle
              cx="250"
              cy="150"
              r="140"
              vectorEffect="non-scaling-stroke"
            />
            <ellipse
              cx="330"
              cy="120"
              rx="96"
              ry="150"
              vectorEffect="non-scaling-stroke"
            />
            <path d="M120 -40 L360 300" vectorEffect="non-scaling-stroke" />
            <path d="M180 0 L180 200" vectorEffect="non-scaling-stroke" />
            <path d="M300 -20 L300 240" vectorEffect="non-scaling-stroke" />
          </g>
        </svg>
      </div>

      <Container width="hero">
        {/* ============================ Copy ============================ */}
        <div className="relative">
          <motion.p
            {...rise(0)}
            className={cn(
              "font-mono text-[0.75rem] font-medium tracking-[0.18em] uppercase",
              "text-[#b9b3e8]",
            )}
          >
            {layers.eyebrow}
          </motion.p>

          <motion.h2
            {...rise(0.06)}
            className={cn(
              /*
              Wide enough for each content line to hold one row. The design sets
              two lines; at a 52rem measure the first wrapped after "The" and
              the headline ran to four rows.
            */
              "mt-5 max-w-[62rem] font-display font-bold tracking-[-0.03em]",
              "leading-[1.08] text-balance",
              // Measured from the design at ~52px on a 1440 frame.
              "text-[1.875rem] sm:text-[2.25rem] xl:text-[2.75rem] 2xl:text-[3.125rem]",
            )}
          >
            {/*
              Two content lines, each owning its own row as the design has them,
              rather than depending on where the measure runs out.
            */}
            {layers.headline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </motion.h2>

          <motion.p
            {...rise(0.12)}
            className={cn(
              "mt-6 max-w-[44rem] leading-relaxed text-pretty",
              "text-[1rem] text-[#c7d0dd] sm:text-[1.0625rem]",
            )}
          >
            {layers.description}
          </motion.p>

          {/* --------------------- Corner aside -------------------- */}
          {/*
            Only from `xl`. It sits in the ground's top-right corner, which the
            headline occupies outright at narrower widths.
          */}
          <motion.p
            {...rise(0.2)}
            className={cn(
              "absolute top-1 right-0 hidden text-right xl:block",
              "font-mono text-[0.6875rem] leading-[1.9] tracking-[0.2em] uppercase",
              "text-[#cdd5e2]",
            )}
          >
            {layers.aside.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
            {/* The short rule the design sets beneath it. */}
            <span
              aria-hidden="true"
              className="mt-3 ml-auto block h-px w-8 bg-[#a78bfa]"
            />
          </motion.p>
        </div>

        {/* =========================== Cards ============================ */}
        <Uncopyable
          className={cn(
            "mt-12 grid gap-6",
            // Measured from the design: three equal columns spanning the frame.
            "lg:grid-cols-3 lg:gap-7",
          )}
        >
          {layers.cards.map((card, index) => (
            <motion.div
              key={card.id}
              /*
                `whileInView` with a generous margin, NOT a threshold. The three
                cards stack on a narrow screen, so the third sits well below the
                fold — at `amount: 0.15` it stayed at opacity 0 and the card was
                simply missing. The margin extends the observer past the fold so
                it resolves without waiting to be scrolled to.
              */
              initial={reduce ? "shown" : "hidden"}
              whileInView="shown"
              viewport={{
                once: true,
                amount: "some",
                margin: "0px 0px 60% 0px",
              }}
              variants={{
                hidden: { opacity: 0, y: 26 },
                shown: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.65,
                    // Left to right, so the eye is walked through the three
                    // layers in the order the argument runs.
                    delay: 0.1 * index,
                    ease: easeOut,
                  },
                },
              }}
              className={cn(
                "group relative flex flex-col rounded-3xl p-6 lg:p-7",
                "bg-[#f7f7fd] text-[#0b0a14]",
                "shadow-[0_1.5rem_3rem_-1.25rem_rgb(8_14_34/0.45)]",
                "duration-normal transition-[translate,box-shadow] ease-out",
                "will-change-[translate] hover:-translate-y-1.5",
                "hover:shadow-[0_2.25rem_4rem_-1.25rem_rgb(8_14_34/0.55)]",
              )}
            >
              {/* ---------------------- Header ---------------------- */}
              <p className="flex items-center gap-3">
                <span className="text-[1.0625rem] font-bold text-[#6d4fd0]">
                  {card.number}
                </span>
                <span
                  className={cn(
                    "font-mono text-[0.6875rem] font-medium tracking-[0.16em] uppercase",
                    "text-[#5b6288]",
                  )}
                >
                  {card.label}
                </span>
              </p>

              <p className="mt-4 font-display text-[1.5rem] leading-tight font-bold tracking-[-0.02em] text-[#111536] xl:text-[1.75rem]">
                {card.title}
              </p>
              <p className="mt-2 text-[0.9375rem] leading-snug text-[#4b5375]">
                {card.note}
              </p>

              {/* ----------------------- Body ----------------------- */}
              <div className="mt-6 flex-1">
                {card.kind === "grid" ? <FoundationGrid card={card} /> : null}
                {card.kind === "tree" ? (
                  <EngineTree card={card} reduce={Boolean(reduce)} />
                ) : null}
                {card.kind === "list" ? <SuiteList card={card} /> : null}
              </div>
            </motion.div>
          ))}
        </Uncopyable>

        {/* ========================= Closing ========================== */}
        <motion.div
          {...rise(0.1)}
          className="mt-14 border-t border-white/20 pt-9"
        >
          <div className="flex flex-wrap items-end justify-between gap-6">
            <p
              className={cn(
                "max-w-[36rem] font-display font-bold tracking-[-0.02em]",
                "text-[1.25rem] text-white sm:text-[1.5rem]",
              )}
            >
              {layers.closing}
            </p>

            {/* The handwritten annotation and its arrow, drawn so both move. */}
            <Annotation reduce={Boolean(reduce)} />
          </div>

          {/* -------------------- Foot rail -------------------- */}
          <div
            className={cn(
              "mt-12 flex flex-wrap items-center justify-between gap-4",
              "font-mono text-[0.6875rem] tracking-[0.2em] uppercase",
              "text-[#9fb0c6]",
            )}
          >
            <p>{layers.footLeft}</p>
            <p className="flex items-center gap-3">
              {layers.footRight.map((word, index) => (
                <span key={word} className="flex items-center gap-3">
                  {index > 0 ? (
                    <span aria-hidden="true" className="text-[#78899f]">
                      /
                    </span>
                  ) : null}
                  {word}
                </span>
              ))}
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

/* ========================================================================== */
/* 01 — FOUNDATION GRID                                                       */
/* ========================================================================== */

type Card = (typeof layers.cards)[number];

function FoundationGrid({ card }: { card: Extract<Card, { kind: "grid" }> }) {
  return (
    <div className="rounded-2xl bg-[#efecfb] p-4">
      {/*
        One column until the card is wide enough for two. At `lg` the three
        cards are each about a third of the frame, which left the 2-column grid
        49px per label — "Orchestration" and "Shared Services" both clipped.
      */}
      <ul className="grid grid-cols-1 gap-x-3 gap-y-4 min-[26rem]:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {card.items.map((item) => {
          const Glyph = GLYPHS[item.icon];
          return (
            <li key={item.label} className="flex items-center gap-3">
              <span
                className={cn(
                  "grid size-10 shrink-0 place-items-center rounded-xl bg-white",
                  "text-[#6d4fd0] shadow-[0_0.25rem_0.75rem_-0.35rem_rgb(20_18_60/0.25)]",
                  "duration-normal transition-[scale] ease-out",
                  "will-change-[scale] group-hover:scale-105",
                )}
              >
                <Glyph className="size-5" />
              </span>
              <span className="min-w-0 text-[0.875rem] leading-snug text-[#2b3157]">
                {item.label}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ========================================================================== */
/* 02 — ENGINE TREE                                                           */
/* ========================================================================== */

/**
 * Three engines above, two below, joined by a bus that drops from the top row
 * and splits to the lower pair.
 *
 * THE CONNECTORS ARE CSS, NOT SVG. They are axis-aligned rules and two small
 * corner arcs, and every attempt on this build at drawing that shape in a
 * stretched viewBox came out wrong — the corners flatten and the runs skew.
 * Positioned elements have no coordinate space to distort.
 */
function EngineTree({
  card,
  reduce,
}: {
  card: Extract<Card, { kind: "tree" }>;
  reduce: boolean;
}) {
  return (
    <div className="rounded-2xl bg-[#f2f2f8] p-4">
      <ul className="grid grid-cols-3 gap-3">
        {card.top.map((engine) => (
          <EngineTile key={engine.label} engine={engine} />
        ))}
      </ul>

      {/* ------------------------ Connectors ----------------------- */}
      <div aria-hidden="true" className="relative h-9">
        {/* The three drops from the top row, one under each tile. */}
        {["16.67%", "50%", "83.33%"].map((left, index) => (
          <motion.span
            key={left}
            initial={reduce ? { scaleY: 1 } : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.4,
              delay: 0.3 + index * 0.08,
              ease: easeOut,
            }}
            style={{ left }}
            className={cn(
              "absolute top-0 h-[45%] w-px origin-top -translate-x-1/2",
              "bg-[#c9cade]",
            )}
          />
        ))}

        {/* The bus joining the three drops. */}
        <motion.span
          initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.52, ease: easeOut }}
          className={cn(
            "absolute top-[45%] left-[16.67%] h-px w-[66.66%] origin-center",
            "bg-[#c9cade]",
          )}
        />

        {/* The node where the bus meets the centre drop. */}
        <motion.span
          initial={reduce ? { scale: 1 } : { scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.72, ease: easeOut }}
          className={cn(
            "absolute top-[45%] left-1/2 size-2 -translate-x-1/2 -translate-y-1/2",
            "rounded-full bg-[#8a6fdc]",
          )}
        />

        {/* The two drops to the lower pair, at their tile centres. */}
        {["25%", "75%"].map((left, index) => (
          <motion.span
            key={left}
            initial={reduce ? { scaleY: 1 } : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.4,
              delay: 0.8 + index * 0.08,
              ease: easeOut,
            }}
            style={{ left }}
            className={cn(
              "absolute top-[45%] h-[55%] w-px origin-top -translate-x-1/2",
              "bg-[#c9cade]",
            )}
          />
        ))}
      </div>

      {/*
        The lower pair sits in a 2-column grid inset by a quarter of the row, so
        each tile centres under the 25% and 75% drops above it.
      */}
      <ul className="grid grid-cols-2 gap-3 px-[12.5%]">
        {card.bottom.map((engine) => (
          <EngineTile key={engine.label} engine={engine} />
        ))}
      </ul>
    </div>
  );
}

function EngineTile({
  engine,
}: {
  engine: { icon: string; label: string; tone: keyof typeof TONES };
}) {
  const Glyph = GLYPHS[engine.icon];
  const tone = TONES[engine.tone];

  return (
    <li
      className={cn(
        "flex flex-col items-center gap-2 rounded-2xl px-2 py-4",
        tone.tile,
        "duration-normal transition-[translate,box-shadow] ease-out",
        "will-change-[translate] hover:-translate-y-1",
        "hover:shadow-[0_0.75rem_1.5rem_-0.6rem_rgb(20_18_60/0.3)]",
      )}
    >
      <Glyph className={cn("size-6 shrink-0", tone.glyph)} />
      <span className="text-[0.8125rem] leading-none font-medium text-[#2b3157]">
        {engine.label}
      </span>
    </li>
  );
}

/* ========================================================================== */
/* 03 — SUITE LIST                                                            */
/* ========================================================================== */

function SuiteList({ card }: { card: Extract<Card, { kind: "list" }> }) {
  return (
    <ul className="space-y-3">
      {card.items.map((item) => {
        const Glyph = GLYPHS[item.icon];
        const tone = TONES[item.tone];
        return (
          <li
            key={item.label}
            className={cn(
              "group/row flex items-center gap-3.5 rounded-2xl bg-white p-3.5",
              "ring-1 ring-[#0b0a14]/6",
              "duration-normal transition-[translate,--tw-ring-color,box-shadow] ease-out",
              "will-change-[translate] hover:-translate-y-0.5 hover:ring-[#6d4fd0]/25",
              "hover:shadow-[0_0.75rem_1.5rem_-0.7rem_rgb(20_18_60/0.28)]",
            )}
          >
            <span
              className={cn(
                "grid size-11 shrink-0 place-items-center rounded-xl",
                tone.tile,
                tone.glyph,
              )}
            >
              <Glyph className="size-5.5" />
            </span>

            <span className="min-w-0 flex-1">
              <span className="block text-[0.9375rem] leading-tight font-medium text-[#111536]">
                {item.label}
              </span>
              {"sub" in item && item.sub ? (
                <span
                  className={cn(
                    "mt-1 block font-mono text-[0.625rem] tracking-[0.14em] uppercase",
                    "text-[#7d85a8]",
                  )}
                >
                  {item.sub}
                </span>
              ) : null}
            </span>

            <ChevronIcon
              className={cn(
                "size-4 shrink-0 text-[#9aa2c0]",
                "duration-normal transition-[translate] ease-out",
                "group-hover/row:translate-x-0.5",
              )}
            />
          </li>
        );
      })}
    </ul>
  );
}

/* ========================================================================== */
/* ANNOTATION                                                                 */
/* ========================================================================== */

/**
 * The handwritten note and the arrow curving back toward the closing line.
 *
 * Baked into the supplied plate; drawn here so it can animate — the arrow draws
 * itself and the words fade up after it. The arrow's viewBox keeps its aspect
 * ratio, since stretching it flattens the curve and skews the head.
 */
function Annotation({ reduce }: { reduce: boolean }) {
  return (
    <p
      aria-label={layers.annotation.join(" ")}
      className="flex items-center gap-3"
    >
      <svg
        viewBox="0 0 64 40"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        className="h-9 w-14 shrink-0"
      >
        {/* Curves from the note back toward the line it comments on. */}
        <motion.path
          d="M60 10C40 4 18 10 8 26"
          fill="none"
          stroke="#a78bfa"
          strokeWidth={2.2}
          strokeLinecap="round"
          initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25, ease: easeOut }}
        />
        <motion.path
          d="m6 16 2 11 11-3"
          fill="none"
          stroke="#a78bfa"
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduce ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.9 }}
        />
      </svg>

      <motion.span
        aria-hidden="true"
        initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.75, ease: easeOut }}
        className="font-hand text-[1.5rem] leading-tight text-[#c4b0ff]"
      >
        {layers.annotation.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </motion.span>
    </p>
  );
}
