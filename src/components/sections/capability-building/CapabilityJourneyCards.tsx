"use client";

import type { ComponentType, SVGProps } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { capabilityBuilding } from "@/content/capability-building";
import { cn } from "@/lib/utils";

import {
  BarsGlyph,
  ChevronGlyph,
  DocumentGlyph,
  DotsGlyph,
  GearGlyph,
  PeopleGlyph,
  TargetGlyph,
} from "./CapabilityIcons";

/**
 * JOURNEY CARDS
 * ---------------------------------------------------------------------------
 * The five product cards in section 3, one per step.
 *
 * DRAWN FROM CONTENT, not the five flat PNGs the design pack supplies. Those
 * are ~90KB each and only ~310px wide, so they would blur on any high-density
 * screen; as markup the text stays selectable and translatable, and every
 * value comes from data that can change without a re-export.
 *
 * Each `kind` is a genuinely different shape of evidence — a rating, a radar
 * chart, a checklist, a media tile, a before/after comparison — which is the
 * section's argument, so they are not flattened into one generic list.
 *
 * The bars and the radar shape ANIMATE FROM EMPTY on first view, so the
 * measurements read as being taken rather than as static decoration. All of it
 * is suppressed under `prefers-reduced-motion`.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const GLYPHS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  people: PeopleGlyph,
  bars: BarsGlyph,
  gear: GearGlyph,
  target: TargetGlyph,
  document: DocumentGlyph,
};

type Step = (typeof capabilityBuilding.journey.steps)[number];
type Card = Step["card"];

/** The shared card shell. Hover is handled by the caller's `group`. */
export function JourneyCard({ card }: { card: Card }) {
  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-2xl bg-white p-5",
        "ring-1 ring-[#0b0a14]/7",
        "shadow-[0_1rem_2rem_-1.25rem_rgb(20_18_60/0.22)]",
        "duration-normal transition-[box-shadow,--tw-ring-color] ease-out",
        "group-hover:ring-[#8500ff]/30",
        "group-hover:shadow-[0_1.75rem_3rem_-1.25rem_rgb(133_0_255/0.28)]",
      )}
    >
      {/* =========================== Header ========================== */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[0.9375rem] leading-tight font-bold text-[#111536]">
            {card.title}
          </p>
          {"subtitle" in card && card.subtitle ? (
            <p className="mt-1 text-[0.8125rem] text-[#5b6288]">
              {card.subtitle}
            </p>
          ) : null}
        </div>
        <DotsGlyph className="mt-1 size-4 shrink-0 text-[#b9bcd4]" />
      </div>

      {/* ============================ Body =========================== */}
      {card.kind === "ratings" ? <RatingsBody card={card} /> : null}
      {card.kind === "radar" ? <RadarBody card={card} /> : null}
      {card.kind === "path" ? <PathBody card={card} /> : null}
      {card.kind === "media" ? <MediaBody card={card} /> : null}
      {card.kind === "progress" ? <ProgressBody card={card} /> : null}
    </div>
  );
}

/* ========================================================================== */
/* 01 — ROLE PROFILE                                                          */
/* ========================================================================== */

function RatingsBody({ card }: { card: Extract<Card, { kind: "ratings" }> }) {
  const reduce = useReducedMotion();

  return (
    <ul className="mt-4 divide-y divide-[#0b0a14]/7 border-t border-[#0b0a14]/7">
      {card.rows.map((row, rowIndex) => {
        const Glyph = GLYPHS[row.icon];
        return (
          <li key={row.label} className="flex items-center gap-3 py-3.5">
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#f2ecff] text-[#7b3fe4]">
              <Glyph className="size-4.5" />
            </span>

            <div className="min-w-0 flex-1">
              {/*
                NOT truncated. "Stakeholder Management" is the longest label
                here and clipping it to "Stakeholder Manageme…" loses the word
                that identifies the capability — it wraps instead.
              */}
              <p className="text-[0.8125rem] leading-snug font-medium text-[#2b3157]">
                {row.label}
              </p>

              <div className="mt-1.5 flex items-center gap-2">
                {/* Five dots, `filled` of them solid. */}
                <span className="flex items-center gap-1">
                  {Array.from({ length: 5 }, (_, dot) => (
                    <motion.span
                      key={dot}
                      initial={reduce ? { scale: 1 } : { scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.32,
                        delay: 0.1 + rowIndex * 0.08 + dot * 0.045,
                        ease: easeOut,
                      }}
                      className={cn(
                        "size-2 rounded-full",
                        dot < row.filled ? "bg-[#7b3fe4]" : "bg-[#e2e0ee]",
                      )}
                    />
                  ))}
                </span>
                <span className="ml-auto text-[0.75rem] text-[#5b6288]">
                  {row.level}
                </span>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/* ========================================================================== */
/* 02 — CAPABILITY ASSESSMENT                                                 */
/* ========================================================================== */

/**
 * The radar chart.
 *
 * Drawn in a SQUARE viewBox with the default `preserveAspectRatio`, so the
 * pentagon stays regular. A stretched box would skew the axes and make the
 * shape read as a measurement that it is not.
 */
function RadarBody({ card }: { card: Extract<Card, { kind: "radar" }> }) {
  const reduce = useReducedMotion();

  const CENTRE = 50;
  const RADIUS = 33;
  const count = card.axes.length;

  /** Vertex for a given axis at a given share of the radius, clockwise from top. */
  const point = (index: number, share: number) => {
    const angle = (index / count) * Math.PI * 2 - Math.PI / 2;
    const r = (share / 100) * RADIUS;
    return [
      CENTRE + Math.cos(angle) * r,
      CENTRE + Math.sin(angle) * r,
    ] as const;
  };

  const polygon = (share: (axis: (typeof card.axes)[number]) => number) =>
    card.axes
      .map((axis, index) => point(index, share(axis)).join(","))
      .join(" ");

  return (
    <div className="mt-3">
      <div className="relative">
        <svg viewBox="0 0 100 100" className="w-full">
          {/* The outer pentagon — the role expectation. */}
          <polygon
            points={polygon((axis) => axis.expectation)}
            fill="rgb(124 63 228 / 0.05)"
            stroke="rgb(11 10 20 / 0.16)"
            strokeWidth={0.5}
            strokeLinejoin="round"
          />

          {/* Spokes out to each vertex. */}
          {card.axes.map((axis, index) => {
            const [x, y] = point(index, 100);
            return (
              <line
                key={axis.label}
                x1={CENTRE}
                y1={CENTRE}
                x2={x}
                y2={y}
                stroke="rgb(11 10 20 / 0.1)"
                strokeWidth={0.4}
              />
            );
          })}

          {/*
            The measured shape. It grows out of the centre on first view, which
            is why `scale` is animated rather than the points themselves —
            interpolating a polygon's points would need every vertex tweened
            and buys nothing visually.
          */}
          <motion.polygon
            points={polygon((axis) => axis.current)}
            fill="rgb(124 63 228 / 0.28)"
            stroke="#7b3fe4"
            strokeWidth={1.1}
            strokeLinejoin="round"
            style={{ transformOrigin: "50% 50%" }}
            initial={
              reduce ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }
            }
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2, ease: easeOut }}
          />

          {/* A dot at each measured vertex. */}
          {card.axes.map((axis, index) => {
            const [x, y] = point(index, axis.current);
            return (
              <motion.circle
                key={axis.label}
                cx={x}
                cy={y}
                r={1.7}
                fill="#7b3fe4"
                initial={reduce ? { opacity: 1 } : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.7 + index * 0.05 }}
              />
            );
          })}
        </svg>

        {/*
          Axis labels sit OUTSIDE the svg, as HTML. Inside it they would scale
          with the viewBox and go illegible on a narrow card; as positioned
          text they keep the page's own type size.
        */}
        {card.axes.map((axis, index) => {
          const [x, y] = point(index, 132);
          return (
            <span
              key={axis.label}
              className={cn(
                "absolute w-[5.5rem] text-center text-[0.625rem] leading-tight",
                "text-[#5b6288]",
              )}
              style={{
                left: `${x}%`,
                top: `${y}%`,
                translate: "-50% -50%",
              }}
            >
              {axis.label}
            </span>
          );
        })}
      </div>

      <ul className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5">
        {card.legend.map((entry) => (
          <li
            key={entry.label}
            className="flex items-center gap-1.5 text-[0.6875rem] text-[#5b6288]"
          >
            <span
              className={cn(
                "size-2.5 rounded-full",
                entry.tone === "solid" ? "bg-[#7b3fe4]" : "bg-[#ddd5f7]",
              )}
            />
            {entry.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ========================================================================== */
/* 03 — GROWTHPATH                                                            */
/* ========================================================================== */

function PathBody({ card }: { card: Extract<Card, { kind: "path" }> }) {
  const reduce = useReducedMotion();

  return (
    <ol className="mt-4 space-y-3">
      {card.items.map((item, index) => {
        const Glyph = GLYPHS[item.icon];
        const active = "active" in item && item.active;
        return (
          <li key={item.title} className="relative flex items-center gap-3">
            {/*
              The rail joining one step to the next hangs off each item except
              the last, so the path stays continuous without a separately
              positioned line to keep in sync.
            */}
            {index < card.items.length - 1 ? (
              <span
                aria-hidden="true"
                className="absolute top-6 left-[0.3125rem] h-[calc(100%-0.25rem)] w-px bg-[#ddd5f7]"
              />
            ) : null}

            <motion.span
              aria-hidden="true"
              initial={reduce ? { scale: 1 } : { scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.34,
                delay: 0.15 + index * 0.1,
                ease: easeOut,
              }}
              className={cn(
                "z-1 size-2.5 shrink-0 rounded-full",
                active
                  ? "bg-[#7b3fe4]"
                  : "bg-white ring-2 ring-[#ddd5f7] ring-inset",
              )}
            />

            <span
              className={cn(
                "flex min-w-0 flex-1 items-center gap-2.5 rounded-xl px-3 py-2.5",
                active ? "bg-[#f2ecff]" : "bg-[#f6f6fa]",
              )}
            >
              <Glyph
                className={cn(
                  "size-4 shrink-0",
                  active ? "text-[#7b3fe4]" : "text-[#8990b5]",
                )}
              />
              <span className="min-w-0">
                {/*
                  Wrapping, not truncating: "1. Strengthen foundations" clipped
                  to "1. Strengthen founda…" at this width, which loses the
                  step's actual instruction.
                */}
                <span className="block text-[0.75rem] leading-snug font-semibold text-[#111536]">
                  {item.title}
                </span>
                <span className="block text-[0.6875rem] leading-snug text-[#5b6288]">
                  {item.note}
                </span>
              </span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}

/* ========================================================================== */
/* 04 — LEARNING EXPERIENCE                                                   */
/* ========================================================================== */

function MediaBody({ card }: { card: Extract<Card, { kind: "media" }> }) {
  const TaskGlyph = GLYPHS[card.task.icon];

  return (
    <div className="mt-4">
      <div className="overflow-hidden rounded-xl">
        <Image
          src={card.media.src}
          alt={card.media.alt}
          width={711}
          height={339}
          sizes="(min-width: 1280px) 16vw, 80vw"
          className={cn(
            "h-auto w-full object-cover",
            // A slow push-in on hover, matching the story cards elsewhere.
            "duration-slow transition-[scale] ease-out",
            "will-change-[scale] group-hover:scale-[1.04]",
          )}
        />
      </div>

      <p className="mt-3 text-[0.8125rem] font-bold text-[#111536]">
        {card.media.title}
      </p>
      <p className="mt-0.5 text-[0.75rem] text-[#5b6288]">{card.media.meta}</p>

      <div
        className={cn(
          "mt-3 flex items-center gap-2.5 rounded-xl bg-[#f6f6fa] p-3",
          "duration-normal transition-colors ease-out",
          "group-hover:bg-[#f2ecff]",
        )}
      >
        <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-white text-[#7b3fe4] ring-1 ring-[#0b0a14]/6">
          <TaskGlyph className="size-4" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[0.75rem] font-semibold text-[#111536]">
            {card.task.title}
          </span>
          <span className="block text-[0.6875rem] leading-snug text-[#5b6288]">
            {card.task.note}
          </span>
        </span>
        <ChevronGlyph
          className={cn(
            "size-4 shrink-0 text-[#8990b5]",
            "duration-normal transition-[translate] ease-out",
            "group-hover:translate-x-0.5",
          )}
        />
      </div>
    </div>
  );
}

/* ========================================================================== */
/* 05 — CAPABILITY PROGRESS                                                   */
/* ========================================================================== */

function ProgressBody({ card }: { card: Extract<Card, { kind: "progress" }> }) {
  const reduce = useReducedMotion();

  /** Both bars fill from empty, `after` a beat behind so the gain reads. */
  const fill = (width: number, delay: number) => ({
    initial: reduce ? { width: `${width}%` } : { width: 0 },
    whileInView: { width: `${width}%` },
    viewport: { once: true } as const,
    transition: { duration: 0.85, delay, ease: easeOut },
  });

  return (
    <div className="mt-4">
      <div className="grid grid-cols-2 gap-3">
        {card.columns.map((column) => (
          <p key={column} className="text-[0.75rem] text-[#5b6288]">
            {column}
          </p>
        ))}
      </div>

      <ul className="mt-3 space-y-4">
        {card.rows.map((row, index) => (
          <li key={row.label}>
            <p className="text-[0.75rem] leading-snug font-medium text-[#2b3157]">
              {row.label}
            </p>
            <div className="mt-2 grid grid-cols-2 gap-3">
              <span className="h-2 overflow-hidden rounded-full bg-[#e9eaf3]">
                <motion.span
                  {...fill(row.before, 0.15 + index * 0.1)}
                  className="block h-full rounded-full bg-[#c7b3f7]"
                />
              </span>
              <span className="h-2 overflow-hidden rounded-full bg-[#e9eaf3]">
                <motion.span
                  {...fill(row.after, 0.3 + index * 0.1)}
                  className="block h-full rounded-full bg-[#7b3fe4]"
                />
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
