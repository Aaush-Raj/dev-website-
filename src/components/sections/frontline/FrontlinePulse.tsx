"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { Uncopyable } from "@/components/ui/Uncopyable";
import { frontline } from "@/content/frontline";
import { cn } from "@/lib/utils";

import { pulseIcons } from "./FrontlineIcons";

/**
 * FRONTLINE — PULSE, CAPABILITY INTELLIGENCE
 * ---------------------------------------------------------------------------
 * Section 4: the argument on the left, the Pulse console on the right.
 *
 * WHY THE CONSOLE IS MARKUP AND NOT THE SUPPLIED COMPOSITE
 * The asset folder ships this scene six different ways — the whole console,
 * the radar alone, the priority card, the evidence card, the challenge dialog
 * — and every one is a flat crop of the same bitmap with its labels painted
 * in. Shipping any of them would bake product copy into a raster:
 * unselectable, unsearchable, blurry when scaled, impossible to translate, and
 * unable to animate. So the console is rebuilt here. Only the two genuinely
 * pictorial assets ship (the blush backdrop and Ananya's photograph) — see the
 * build script for the full accounting.
 *
 * THE RADAR IS COMPUTED, NOT DRAWN
 * Its two polygons come from the numbers in content/frontline.ts, projected
 * onto five axes by `spoke()` below. Change a score there and the shape
 * follows. That is the whole reason this is worth rebuilding: a raster would
 * have frozen one set of scores into pixels.
 *
 * ONE COORDINATE SPACE
 * The console and the three cards that overlap it have to stay locked
 * together, so from lg up they all sit in a single proportional box — the
 * console fills it, and the cards are placed on it with percentage insets.
 * Their type scales with a container query, so the arrangement holds its
 * designed proportion at every width instead of the cards swamping the console.
 *
 * BELOW LG the overlap cannot survive the narrower column: the cards would
 * cover the console entirely. So they unstack into a plain column — console,
 * then the cards in reading order.
 *
 * THE WHOLE RIGHT SIDE IS ARIA-HIDDEN AND UNCOPYABLE. It is imitation UI: the
 * copy on the left carries the section's meaning, and a screen reader should
 * not have to wade through a fake dashboard to reach it.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { pulse } = frontline;
const { console: ui } = pulse;

/** Sampled from the design. Used where a value has to reach SVG or an
 *  inline style, which Tailwind classes cannot. */
const CORAL = "#d9614f";
const GREEN = "#4a7f70";

/* -------------------------------------------------------------------------- */
/* RADAR GEOMETRY                                                             */
/* -------------------------------------------------------------------------- */

const AXES = ui.radar.axes.length;

/**
 * Project a score onto axis `i` of a regular polygon, in a 100x100 box.
 * Axis 0 points straight up and the rest run clockwise, matching the design.
 */
function spoke(index: number, value: number) {
  const angle = (Math.PI * 2 * index) / AXES - Math.PI / 2;
  return [50 + Math.cos(angle) * 38 * value, 50 + Math.sin(angle) * 38 * value];
}

/** A closed SVG polygon string for one series. */
function polygon(values: readonly number[]) {
  return values.map((v, i) => spoke(i, v).join(",")).join(" ");
}

/** Where each axis label sits — pushed past the outer ring so it clears it. */
const AXIS_LABELS = ui.radar.axes.map((label, index) => {
  const [x, y] = spoke(index, 1.28);
  return { label, x, y };
});

export function FrontlinePulse() {
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
    <section className="relative isolate overflow-hidden bg-[#fbf7f4] py-section-lg">
      {/* The blush wash. Sits under everything. */}
      <Image
        src={pulse.backdrop.src}
        alt={pulse.backdrop.alt}
        width={pulse.backdrop.width}
        height={pulse.backdrop.height}
        aria-hidden="true"
        sizes="100vw"
        priority={false}
        className="pointer-events-none absolute inset-0 -z-10 size-full object-cover"
      />

      <Container width="wide">
        <div
          className={cn(
            "grid items-center gap-14",
            "lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1fr)] lg:gap-12",
            "xl:gap-16",
          )}
        >
          {/* =========================== Statement ==================== */}
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "font-mono text-[0.6875rem] font-medium uppercase",
                "tracking-[0.2em] text-[#d9614f] sm:text-xs",
              )}
            >
              {pulse.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.08)}
              className={cn(
                "mt-5 font-display font-bold tracking-[-0.03em]",
                "leading-[1.1] text-[#14161f]",
                "text-[2rem] sm:text-[2.5rem] xl:text-[3rem]",
              )}
            >
              {pulse.headline.map((line) => (
                <span key={line} className="inline lg:block">
                  {line}{" "}
                </span>
              ))}
            </motion.h2>

            <motion.p
              {...rise(0.16)}
              className={cn(
                "mt-6 max-w-[34rem] leading-relaxed text-pretty",
                "text-[1rem] text-[#14161f]/72 sm:text-[1.0625rem]",
              )}
            >
              {pulse.description}
            </motion.p>

            {/* ---------------------- Capabilities ------------------ */}
            <ul className="mt-9 grid max-w-[34rem] gap-5">
              {pulse.points.map((point, index) => {
                const Icon = pulseIcons[point.icon];

                return (
                  <motion.li
                    key={point.label}
                    {...rise(0.24 + index * 0.07)}
                    className="flex items-center gap-5"
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "grid size-12 shrink-0 place-items-center rounded-full",
                        "bg-[#f8dcd6] text-[#c1503f]",
                      )}
                    >
                      <Icon className="size-6" />
                    </span>
                    <span className="text-[1rem] leading-snug text-[#14161f]/88">
                      {point.label}
                    </span>
                  </motion.li>
                );
              })}
            </ul>

            {/* ------------------------ Closer ---------------------- */}
            <motion.div
              {...rise(0.46)}
              className="mt-10 max-w-[34rem] border-t border-[#14161f]/12 pt-7"
            >
              <p className="font-semibold text-[1rem] text-[#14161f]">
                {pulse.kicker}
              </p>

              <Link
                href={pulse.cta.href}
                className={cn(
                  "group mt-4 inline-flex items-center gap-2.5",
                  "font-medium text-[1rem] text-[#7b3fd4] underline",
                  "underline-offset-[6px] decoration-[#7b3fd4]/40",
                  "transition-colors hover:decoration-[#7b3fd4]",
                )}
              >
                {pulse.cta.label}
                <span
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1"
                >
                  &rarr;
                </span>
              </Link>
            </motion.div>
          </div>

          {/* ============================ Console ===================== */}
          {/* Imitation UI: aria-hidden and uncopyable. See the note up top. */}
          <Uncopyable aria-hidden className="relative">
            <motion.div
              {...rise(0.2)}
              className={cn(
                // One proportional box from lg up, so the console and the
                // three floating cards stay locked to each other. Below that
                // everything unstacks into a plain column.
                "@container",
                "grid gap-5",
                "lg:block lg:aspect-[10/10.4]",
              )}
              style={{ ["--ui" as string]: "clamp(0.62rem, 1.42cqw, 0.9rem)" }}
            >
              {/* ---------------------- The console ---------------- */}
              <div
                className={cn(
                  "overflow-hidden rounded-[1.1em] bg-white",
                  "shadow-[0_24px_60px_-28px_rgb(20_22_31/0.3)]",
                  "text-[length:var(--ui)]",
                  "lg:absolute lg:top-0 lg:left-0 lg:h-[82%] lg:w-[80%]",
                )}
              >
                {/* Title bar */}
                <div className="flex items-center justify-between border-b border-[#14161f]/8 px-[1.4em] py-[1.05em]">
                  <span className="flex items-center gap-[0.55em]">
                    <BrandMark />
                    <span className="font-display text-[1.3em] font-bold tracking-[-0.02em] text-[#14161f]">
                      {ui.brand}
                    </span>
                  </span>
                  <span className="text-[0.92em] text-[#14161f]/55">
                    {ui.context}
                  </span>
                </div>

                <div className="flex">
                  {/* ------------------- Left rail ---------------- */}
                  <nav className="hidden w-[26%] shrink-0 border-r border-[#14161f]/8 p-[0.85em] sm:block">
                    {ui.nav.map((item) => {
                      const Icon = pulseIcons[item.icon];

                      return (
                        <span
                          key={item.label}
                          className={cn(
                            "flex items-center gap-[0.7em] rounded-[0.6em]",
                            "px-[0.75em] py-[0.62em] text-[0.98em]",
                            item.active
                              ? "bg-[#fbe4de] font-medium text-[#c1503f]"
                              : "text-[#14161f]/62",
                          )}
                        >
                          <Icon className="size-[1.35em] shrink-0" />
                          {item.label}
                        </span>
                      );
                    })}
                  </nav>

                  {/* ------------------- Main pane ---------------- */}
                  <div className="min-w-0 flex-1 p-[1.4em]">
                    <div className="flex items-start justify-between gap-[1em]">
                      <span>
                        <span className="block font-display text-[1.5em] font-bold tracking-[-0.02em] text-[#14161f]">
                          {ui.title}
                        </span>
                        <span className="mt-[0.15em] block text-[0.95em] text-[#14161f]/55">
                          {ui.subtitle}
                        </span>
                      </span>
                      <span className="shrink-0 text-[0.85em] text-[#14161f]/45">
                        {ui.updated}
                      </span>
                    </div>

                    {/* ---------------- Person card -------------- */}
                    <div className="mt-[1.1em] rounded-[0.8em] border border-[#14161f]/8 p-[1.1em]">
                      <div className="flex items-center gap-[1em]">
                        <Image
                          src={ui.person.avatar.src}
                          alt=""
                          width={ui.person.avatar.width}
                          height={ui.person.avatar.height}
                          className="size-[3.6em] shrink-0 rounded-full object-cover"
                        />

                        <span className="min-w-0 flex-1">
                          <span className="block truncate font-display text-[1.25em] font-bold tracking-[-0.01em] text-[#14161f]">
                            {ui.person.name}
                          </span>
                          <span className="mt-[0.1em] block truncate text-[0.95em] text-[#14161f]/58">
                            {ui.person.role}
                          </span>
                        </span>

                        <span className="hidden shrink-0 text-right @md:block">
                          <span
                            className={cn(
                              "inline-flex items-center gap-[0.45em] rounded-full",
                              "bg-[#fdeecb] px-[0.8em] py-[0.4em]",
                              "text-[0.9em] font-semibold text-[#96631a]",
                            )}
                          >
                            <BarsGlyph />
                            {ui.person.status}
                          </span>
                          <span className="mt-[0.45em] block text-[0.82em] text-[#14161f]/50">
                            {ui.person.statusNote}
                          </span>
                        </span>
                      </div>

                      {/* -------------- Capability radar ---------- */}
                      <p className="mt-[1.3em] font-semibold text-[1.1em] text-[#14161f]">
                        {ui.radar.title}
                      </p>

                      <Radar reduce={reduce ?? false} />

                      {/* Legend. Sits under the radar and shares its
                          off-centre placement, for the same reason. */}
                      <div className="mt-[0.6em] flex w-[68%] items-center justify-center gap-[1.6em]">
                        {ui.radar.series.map((series) => (
                          <span
                            key={series.key}
                            className="flex items-center gap-[0.5em] text-[0.9em] text-[#14161f]/70"
                          >
                            <span
                              className="size-[0.7em] rounded-full"
                              style={{
                                background:
                                  series.key === "current" ? CORAL : GREEN,
                              }}
                            />
                            {series.label}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ================= Floating cards ================== */}
              {/* From lg these sit over the console's right edge, exactly as
                  the design overlaps them. Below lg they follow it in order. */}

              {/* ------------------ Priority capability ----------- */}
              <FloatingCard
                delay={0.55}
                reduce={reduce ?? false}
                className="lg:absolute lg:top-[22%] lg:right-0 lg:w-[46%]"
              >
                <CardHead
                  icon="target"
                  label={ui.priority.title}
                  tint="bg-[#fbe4de] text-[#c1503f]"
                />

                <div className="mt-[0.9em] border-l-2 border-[#14161f]/10 pl-[0.9em]">
                  <span className="flex items-center justify-between gap-[0.6em]">
                    <span className="font-display text-[1.35em] font-bold tracking-[-0.01em] text-[#14161f]">
                      {ui.priority.capability}
                    </span>
                    <Chevron />
                  </span>

                  <div className="mt-[0.85em] grid gap-[0.6em]">
                    {ui.priority.rows.map((row) => (
                      <span
                        key={row.label}
                        className="grid grid-cols-[1fr_auto_1.5fr] items-center gap-[0.7em]"
                      >
                        <span className="text-[0.95em] text-[#14161f]/62">
                          {row.label}
                        </span>
                        <span
                          className={cn(
                            "text-[0.95em] text-[#14161f]",
                            row.tone === "green" && "font-semibold",
                          )}
                        >
                          {row.value}
                        </span>
                        <Meter
                          fill={row.fill}
                          color={row.tone === "green" ? GREEN : CORAL}
                          reduce={reduce ?? false}
                        />
                      </span>
                    ))}
                  </div>
                </div>
              </FloatingCard>

              {/* ------------------------ Evidence ---------------- */}
              <FloatingCard
                delay={0.66}
                reduce={reduce ?? false}
                className="lg:absolute lg:top-[50%] lg:right-0 lg:w-[46%]"
              >
                <CardHead
                  icon="doc"
                  label={ui.evidence.title}
                  tint="bg-[#d9ece5] text-[#33705f]"
                />

                <div className="mt-[0.7em]">
                  {ui.evidence.rows.map((row, index) => {
                    const Icon = pulseIcons[row.icon];

                    return (
                      <span
                        key={row.label}
                        className={cn(
                          "flex items-center gap-[0.7em] py-[0.7em]",
                          index > 0 && "border-t border-[#14161f]/8",
                        )}
                      >
                        <span className="grid size-[2em] shrink-0 place-items-center rounded-[0.45em] bg-[#e8f3ef] text-[#33705f]">
                          <Icon className="size-[1.15em]" />
                        </span>

                        <span className="min-w-0 flex-1 truncate text-[0.95em] text-[#14161f]/78">
                          {row.label}
                        </span>

                        <Dots filled={row.filled} total={ui.evidence.total} />
                        <Chevron />
                      </span>
                    );
                  })}
                </div>
              </FloatingCard>

              {/* ---------------------- The challenge ------------- */}
              <FloatingCard
                delay={0.78}
                reduce={reduce ?? false}
                className="lg:absolute lg:bottom-0 lg:left-[-2%] lg:w-[56%]"
              >
                <span className="flex items-center justify-between gap-[0.7em]">
                  <CardHead
                    icon="bolt"
                    label={ui.challenge.title}
                    tint="bg-[#fbe4de] text-[#c1503f]"
                  />
                  <span className="shrink-0 text-[0.85em] text-[#14161f]/45">
                    {ui.challenge.step}
                  </span>
                </span>

                <p className="mt-[0.9em] rounded-[0.55em] bg-[#f2f4f7] p-[0.85em] text-[0.95em] leading-relaxed text-[#14161f]/80">
                  {ui.challenge.prompt}
                </p>

                <div className="mt-[0.85em] grid gap-[0.6em]">
                  {ui.challenge.options.map((option) => (
                    <span
                      key={option}
                      className="flex items-center gap-[0.7em] text-[0.95em] text-[#14161f]/72"
                    >
                      <span className="size-[1.05em] shrink-0 rounded-full border border-[#14161f]/25" />
                      {option}
                    </span>
                  ))}
                </div>

                <span className="mt-[1em] flex justify-end">
                  <span
                    className={cn(
                      "inline-flex items-center gap-[0.5em] rounded-[0.5em]",
                      "bg-[#d9614f] px-[1.1em] py-[0.6em]",
                      "text-[0.95em] font-medium text-white",
                    )}
                  >
                    {ui.challenge.action}
                    <span aria-hidden="true">&rarr;</span>
                  </span>
                </span>
              </FloatingCard>

              {/* ---------------------- Handwritten notes --------- */}
              {/* Set as text rather than shipped in the foliage crop, which
                  bakes them into a raster along with a slice of the evidence
                  card. Hidden below lg, where there is no room beside the
                  console for a margin note. */}
              <p
                className={cn(
                  "hidden text-[0.95em] leading-[1.6] whitespace-pre-line",
                  "font-serif text-[#14161f]/55 italic lg:block",
                  "lg:absolute lg:bottom-[13%] lg:left-[64%] lg:text-[length:var(--ui)]",
                )}
              >
                {pulse.notes[0]}
              </p>
            </motion.div>
          </Uncopyable>
        </div>
      </Container>
    </section>
  );
}

/* ========================================================================== */
/* CONSOLE PARTS                                                              */
/* ========================================================================== */

/** The Lurny mark in the console's title bar — a small paper plane. */
function BrandMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-[1.35em]">
      <path d="M3 11.5 21 4l-7 17-2.6-6.6L3 11.5Z" fill={CORAL} />
    </svg>
  );
}

/** The three ascending bars inside the "Developing" pill. */
function BarsGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-[1em]">
      <path
        d="M5 20v-5M12 20V9M19 20V4"
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
      />
    </svg>
  );
}

function Chevron() {
  const Icon = pulseIcons.chevron;
  return <Icon className="size-[1.1em] shrink-0 text-[#14161f]/35" />;
}

/**
 * The capability radar: a five-ring web with the two series over it, drawn
 * from the numbers in content. Labels sit outside the outer ring.
 */
function Radar({ reduce }: { reduce: boolean }) {
  const [current, baseline] = ui.radar.series;

  return (
    <div className="relative mt-[0.7em] w-[68%]">
      <svg viewBox="0 0 100 100" className="w-full overflow-visible">
        {/* The web: five rings plus a spoke to each vertex. */}
        {[0.25, 0.5, 0.75, 1].map((ring) => (
          <polygon
            key={ring}
            points={polygon(Array.from({ length: AXES }, () => ring))}
            fill="none"
            stroke="rgb(20 22 31 / 0.09)"
            strokeWidth="0.5"
          />
        ))}

        {Array.from({ length: AXES }, (_, i) => {
          const [x, y] = spoke(i, 1);
          return (
            <line
              key={i}
              x1="50"
              y1="50"
              x2={x}
              y2={y}
              stroke="rgb(20 22 31 / 0.09)"
              strokeWidth="0.5"
            />
          );
        })}

        {/* Role baseline, behind — the target shape. */}
        <motion.polygon
          points={polygon(baseline.values)}
          fill={`${GREEN}1f`}
          stroke={GREEN}
          strokeWidth="1"
          strokeLinejoin="round"
          initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: "some" }}
          transition={{ duration: 0.7, delay: 0.5, ease: easeOut }}
          style={{ transformOrigin: "50% 50%" }}
        />

        {/* Current, in front — visibly inside the baseline, which is the
            whole point the section is making. */}
        <motion.polygon
          points={polygon(current.values)}
          fill={`${CORAL}2e`}
          stroke={CORAL}
          strokeWidth="1"
          strokeLinejoin="round"
          initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: "some" }}
          transition={{ duration: 0.7, delay: 0.62, ease: easeOut }}
          style={{ transformOrigin: "50% 50%" }}
        />

        {/* Vertex dots, drawn last so they sit on top of both shapes. */}
        {ui.radar.series.map((series) =>
          series.values.map((value, i) => {
            const [x, y] = spoke(i, value);
            return (
              <circle
                key={`${series.key}-${i}`}
                cx={x}
                cy={y}
                r="1.6"
                fill={series.key === "current" ? CORAL : GREEN}
              />
            );
          }),
        )}
      </svg>

      {/* Axis labels, positioned in the same 0-100 space as the web. */}
      {AXIS_LABELS.map(({ label, x, y }) => (
        <span
          key={label}
          className="absolute text-[0.82em] whitespace-nowrap text-[#14161f]/62"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          {label}
        </span>
      ))}
    </div>
  );
}

/** A card that floats over the console from lg up. */
function FloatingCard({
  className,
  delay,
  reduce,
  children,
}: {
  className?: string;
  delay: number;
  reduce: boolean;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: "some" }}
      transition={{ duration: 0.6, delay, ease: easeOut }}
      className={cn(
        "rounded-[0.9em] bg-white p-[1.1em]",
        "text-[length:var(--ui)]",
        "shadow-[0_20px_50px_-22px_rgb(20_22_31/0.35)]",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}

/** A floating card's tinted icon disc plus its title. */
function CardHead({
  icon,
  label,
  tint,
}: {
  icon: keyof typeof pulseIcons;
  label: string;
  tint: string;
}) {
  const Icon = pulseIcons[icon];

  return (
    <span className="flex items-center gap-[0.7em]">
      <span
        className={cn(
          "grid size-[2.2em] shrink-0 place-items-center rounded-full",
          tint,
        )}
      >
        <Icon className="size-[1.25em]" />
      </span>
      <span className="font-semibold text-[1.05em] text-[#14161f]">
        {label}
      </span>
    </span>
  );
}

/** A horizontal score bar. Fills on scroll. */
function Meter({
  fill,
  color,
  reduce,
}: {
  fill: number;
  color: string;
  reduce: boolean;
}) {
  return (
    <span className="h-[0.55em] w-full overflow-hidden rounded-full bg-[#14161f]/8">
      <motion.span
        className="block h-full rounded-full"
        style={{ background: color }}
        initial={reduce ? { width: `${fill * 100}%` } : { width: 0 }}
        whileInView={{ width: `${fill * 100}%` }}
        viewport={{ once: true, amount: "some" }}
        transition={{ duration: 0.8, delay: 0.7, ease: easeOut }}
      />
    </span>
  );
}

/** The five-dot score on each evidence row. */
function Dots({ filled, total }: { filled: number; total: number }) {
  return (
    <span className="flex shrink-0 items-center gap-[0.28em]">
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={cn(
            "size-[0.62em] rounded-full",
            i < filled ? "" : "bg-[#14161f]/12",
          )}
          style={i < filled ? { background: GREEN } : undefined}
        />
      ))}
    </span>
  );
}
