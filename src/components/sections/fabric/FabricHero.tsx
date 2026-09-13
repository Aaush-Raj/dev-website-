"use client";

import type { ComponentType, SVGProps } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { Uncopyable } from "@/components/ui/Uncopyable";
import { fabric } from "@/content/fabric";
import { cn } from "@/lib/utils";

import { FabricFilaments } from "./FabricFilaments";
import {
  ArrowIcon,
  BarsIcon,
  BoltIcon,
  BookIcon,
  CapIcon,
  ContactsIcon,
  PeopleIcon,
  StackIcon,
  WindowsIcon,
} from "./FabricIcons";

/**
 * LURNYFABRIC HERO
 * ---------------------------------------------------------------------------
 * Section 1: the statement on the left; on the right a diagram with the core
 * pill at its centre, three capability nodes above and five system nodes
 * below, all joined by curved connectors and set against the filament burst.
 *
 * NOTHING IN THIS SECTION SHIPS AS AN IMAGE. The design pack supplies the
 * gradient ground (1.1MB), the wave plate (1.4MB) and a nine-box extraction
 * (1.7MB) whose own README says the cutout failed. All three are either flat
 * geometry or interface, and the whole point of this hero is that it moves —
 * a plate cannot.
 *
 * THE CONNECTORS ARE THE DIAGRAM'S ARGUMENT. Each one runs between the core
 * and a node, and they curve rather than run straight because the design needs
 * eight of them to leave one small pill without overlapping. They are drawn in
 * a viewBox with a FIXED aspect ratio: stretching it flattens every curve into
 * a straight line, the failure this build has hit repeatedly.
 *
 * THE TWO ROWS ARE NOT ALIGNED TO EACH OTHER, deliberately — five nodes below
 * at a ~10.7% pitch and three above at ~15.4%, both measured from the design.
 * Distributing them evenly would line up columns that the design keeps apart.
 */

const { hero } = fabric;

/** Motion's string easings are not typed, so the cubic curve is spelled out. */
const easeOut = [0.16, 1, 0.3, 1] as const;

const GLYPHS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  book: BookIcon,
  bolt: BoltIcon,
  bars: BarsIcon,
  cap: CapIcon,
  people: PeopleIcon,
  windows: WindowsIcon,
  contacts: ContactsIcon,
  stack: StackIcon,
};

/**
 * The diagram's coordinate space, in percent of its own box.
 *
 * Everything — nodes, core, connectors — is placed against these, so the whole
 * diagram scales as one piece rather than drifting apart at other widths.
 */
const GEO = {
  /** Vertical centres of the two node rows and the core. */
  capabilityY: 11,
  coreY: 50,
  systemY: 88,
  /** The core pill's half-width, used to start the connectors at its edge. */
  coreHalfWidth: 21,
  coreHalfHeight: 11,
} as const;

export function FabricHero() {
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

  const capabilities = hero.nodes.filter((n) => n.row === "capability");
  const systems = hero.nodes.filter((n) => n.row === "system");

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden",
        // Sampled from the design's ground: a deep blue-black.
        "bg-[#0f1526] text-white",
        // Clearance for the floating nav pill, which overlays the page.
        "pt-28 pb-16 sm:pt-32 lg:pt-36 lg:pb-20",
      )}
    >
      {/* ========================= Background ground ===================== */}
      {/*
        The design's ground is not flat: it carries a violet bloom at the top
        right and a second, dimmer one at the bottom left. Both are drawn — a
        pair of radial gradients against the 1.1MB plate the pack ships them on.
      */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 -z-20",
          "bg-[radial-gradient(ellipse_90%_70%_at_88%_4%,rgb(88_70_220/0.34),transparent_58%),radial-gradient(ellipse_70%_60%_at_4%_96%,rgb(96_64_210/0.26),transparent_60%)]",
        )}
      />

      <Container width="hero">
        <div
          className={cn(
            "grid items-center gap-12",
            // Measured from the design: the copy runs to ~42% of the frame and
            // the diagram takes the rest.
            "xl:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] xl:gap-10",
          )}
        >
          {/* ============================ Copy ========================== */}
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "font-mono text-[0.75rem] font-medium tracking-[0.18em] uppercase",
                "text-[#9d7bff]",
              )}
            >
              {hero.eyebrow}
            </motion.p>

            <motion.h1
              {...rise(0.06)}
              className={cn(
                "mt-6 font-display font-bold tracking-[-0.035em]",
                "leading-[1.06] text-balance",
                // Measured from the design at ~62px on a 1440 frame.
                "text-[2.25rem] sm:text-[2.875rem] xl:text-[3.5rem]",
              )}
            >
              {/*
                Three content lines, each owning its own row as the design has
                them, rather than depending on where the measure runs out.
              */}
              {hero.headline.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </motion.h1>

            <motion.p
              {...rise(0.12)}
              className={cn(
                "mt-7 max-w-[30rem] leading-relaxed text-pretty",
                "text-[1rem] text-[#a9b0cc] sm:text-[1.0625rem]",
              )}
            >
              {hero.description}
            </motion.p>

            {/* -------------------------- Actions -------------------- */}
            <motion.div
              {...rise(0.18)}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <Link
                href={hero.actions.primary.href}
                className={cn(
                  "group inline-flex items-center gap-3 rounded-xl",
                  "bg-[#5a3ff4] px-7 py-4",
                  "text-[0.9375rem] font-semibold text-white",
                  "duration-normal transition-[background-color,translate,box-shadow] ease-out",
                  "will-change-[translate]",
                  "hover:-translate-y-0.5 hover:bg-[#4c32e0]",
                  "hover:shadow-[0_1rem_2rem_-0.75rem_rgb(90_63_244/0.8)]",
                  "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#9d7bff]",
                )}
              >
                {hero.actions.primary.label}
                <ArrowIcon
                  className={cn(
                    "size-4 shrink-0",
                    "duration-normal transition-[translate] ease-out",
                    "group-hover:translate-x-1",
                  )}
                />
              </Link>

              <Link
                href={hero.actions.secondary.href}
                className={cn(
                  "inline-flex items-center rounded-xl px-7 py-4",
                  "text-[0.9375rem] font-semibold text-[#c6b6ff]",
                  "ring-1 ring-[#7c5cff]/60",
                  "duration-normal transition-[background-color,translate,--tw-ring-color] ease-out",
                  "will-change-[translate]",
                  "hover:-translate-y-0.5 hover:bg-[#7c5cff]/12 hover:ring-[#9d7bff]",
                  "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#9d7bff]",
                )}
              >
                {hero.actions.secondary.label}
              </Link>
            </motion.div>

            {/* The three-part line, joined by the design's middot. */}
            <motion.p
              {...rise(0.24)}
              className="mt-8 text-[0.875rem] text-[#8d94b4]"
            >
              {hero.footnote.map((part, index) => (
                <span key={part}>
                  {index > 0 ? (
                    <span aria-hidden="true" className="px-2 text-[#5d6488]">
                      ·
                    </span>
                  ) : null}
                  {part}
                </span>
              ))}
            </motion.p>
          </div>

          {/* ========================== Diagram ========================= */}
          <Uncopyable>
            <motion.div
              /*
                The diagram animates on MOUNT, not on scroll.

                It is the tallest thing on the page, and `whileInView` with any
                threshold leaves its lower half — the five system nodes — at
                opacity 0 on a viewport shorter than the diagram itself. It also
                sits in the hero, which is on screen at load, so gating it on
                scroll bought nothing.
              */
              initial={reduce ? "shown" : "hidden"}
              animate="shown"
              variants={{
                hidden: { opacity: 0, scale: 0.97 },
                shown: {
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.8, ease: easeOut },
                },
              }}
              className="relative"
            >
              {/*
                The diagram box. Its aspect is fixed so the node percentages —
                which are measured from the design — stay true as it scales.
              */}
              {/*
                `@container` so the node and core type can scale with the
                DIAGRAM rather than the viewport — at a fixed rem size the
                labels overflowed their nodes as the box narrowed.
              */}
              <div className="@container relative aspect-[1060/700] w-full">
                {/* ------------------- Filaments ------------------- */}
                {/*
                  Behind everything, bursting from each side of the core. They
                  sit outside the diagram box horizontally, since the design
                  runs them off both edges of the frame.
                */}
                {/*
                  The waist of each fan must land ON the core's edge, which the
                  box places at 29% and 71%. `WAIST_X` sits 18% into the fan's
                  own width, so the fan's inner edge is offset by that much —
                  positioning them by eye left an 11-point gap and the bundles
                  floated free of the pill entirely.
                */}
                {/*
                  Each fan's waist must land ON the core's edge, which the box
                  places at 29% and 71%. The waist sits 18% into the fan's own
                  width, so a 120%-wide fan starting at 49.4% puts its waist at
                  71% and runs its far end well off the frame, as the design
                  does. Positioning these by eye left an 11-point gap and the
                  bundles floated free of the pill entirely.
                */}
                <FabricFilaments
                  side="left"
                  className="top-1/2 right-[49.4%] h-[64%] w-[120%] -translate-y-1/2"
                />
                <FabricFilaments
                  side="right"
                  className="top-1/2 left-[49.4%] h-[64%] w-[120%] -translate-y-1/2"
                />

                {/* ------------------ Connectors ------------------ */}
                <Connectors reduce={Boolean(reduce)} />

                {/* -------------------- Nodes -------------------- */}
                {capabilities.map((node, index) => (
                  <NodeCard
                    key={node.id}
                    node={node}
                    reduce={Boolean(reduce)}
                    delay={0.75 + index * 0.09}
                    y={GEO.capabilityY}
                  />
                ))}

                {systems.map((node, index) => (
                  <NodeCard
                    key={node.id}
                    node={node}
                    reduce={Boolean(reduce)}
                    delay={0.9 + index * 0.07}
                    y={GEO.systemY}
                  />
                ))}

                {/* --------------------- Core -------------------- */}
                <CoreCard reduce={Boolean(reduce)} />
              </div>

              <motion.p
                {...rise(0.4)}
                className={cn(
                  "mt-6 text-center",
                  "font-mono text-[0.8125rem] tracking-[0.08em] text-[#8d94b4]",
                )}
              >
                {hero.caption}
              </motion.p>
            </motion.div>
          </Uncopyable>
        </div>
      </Container>
    </section>
  );
}

/* ========================================================================== */
/* CORE                                                                       */
/* ========================================================================== */

function CoreCard({ reduce }: { reduce: boolean }) {
  const { core } = hero;

  return (
    <motion.div
      initial={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      // Mount, not scroll — see the note on NodeCard.
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.55, ease: easeOut }}
      className={cn(
        "group absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
        // Wider on small screens: at a flat 42% the wordmark and the three
        // verbs both overflowed the pill at 390px.
        "w-[62%] rounded-3xl px-4 py-4 text-center sm:w-[52%] sm:px-6 sm:py-5 xl:w-[42%]",
        // A lifted glass panel: the filaments show faintly through it, as they
        // do in the design, rather than being blocked out.
        "bg-[#2a3159]/55 backdrop-blur-md",
        "ring-1 ring-white/22",
        "shadow-[0_0_4rem_-0.5rem_rgb(124_92_255/0.55)]",
        "duration-normal transition-[box-shadow,--tw-ring-color] ease-out",
        "hover:ring-white/40",
        "hover:shadow-[0_0_5rem_-0.5rem_rgb(124_92_255/0.8)]",
      )}
    >
      <p className="font-display text-[clamp(1.25rem,2.6cqw,2rem)] font-bold tracking-[-0.02em] text-white">
        {core.name}
      </p>
      <p className="mt-1.5 text-[clamp(0.6875rem,1.05cqw,0.8125rem)] tracking-[0.06em] text-[#b9c0dd]">
        {core.verbs.map((verb, index) => (
          <span key={verb}>
            {index > 0 ? (
              <span aria-hidden="true" className="px-1.5 text-[#7d85a8]">
                ·
              </span>
            ) : null}
            {verb}
          </span>
        ))}
      </p>
    </motion.div>
  );
}

/* ========================================================================== */
/* NODE                                                                       */
/* ========================================================================== */

type Node = (typeof hero.nodes)[number];

function NodeCard({
  node,
  reduce,
  delay,
  y,
}: {
  node: Node;
  reduce: boolean;
  delay: number;
  y: number;
}) {
  const Glyph = GLYPHS[node.icon];

  return (
    <motion.div
      initial={
        reduce
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: node.row === "capability" ? -14 : 14 }
      }
      /*
        `animate`, NOT `whileInView`. The five system nodes sit at 88% of the
        diagram, which on a 1024-tall viewport lands below the fold — under
        `whileInView` they never hydrated at all and stayed at the server's
        `opacity:0`, leaving the lower half of the diagram missing.
      */
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: easeOut }}
      style={{ left: `${node.x}%`, top: `${y}%` }}
      className={cn(
        "group absolute -translate-x-1/2 -translate-y-1/2",
        "flex w-[15%] min-w-[4.5rem] flex-col items-center gap-2",
        "rounded-2xl px-2 py-3.5",
        "bg-[#1b2240]/72 ring-1 ring-white/12 backdrop-blur-sm",
        "duration-normal transition-[translate,--tw-ring-color,box-shadow,background-color] ease-out",
        "will-change-[translate]",
        "hover:-translate-y-[calc(50%+0.25rem)] hover:bg-[#232b52]/85",
        "hover:ring-[#9d7bff]/60",
        "hover:shadow-[0_0_2rem_-0.4rem_rgb(124_92_255/0.7)]",
      )}
    >
      <Glyph
        className={cn(
          "size-[clamp(1rem,1.9cqw,1.4rem)] shrink-0 text-[#a78bff]",
          "duration-normal transition-[scale,color] ease-out",
          "will-change-[scale] group-hover:scale-110 group-hover:text-[#c6b6ff]",
        )}
      />
      <span className="text-center text-[clamp(0.625rem,1cqw,0.8125rem)] leading-tight text-[#d5daee]">
        {node.label}
      </span>
    </motion.div>
  );
}

/* ========================================================================== */
/* CONNECTORS                                                                 */
/* ========================================================================== */

/**
 * The eight curves joining the core to its nodes.
 *
 * Each leaves the core's top or bottom edge and rises or falls to its node,
 * with a single S-bend so the eight runs fan apart instead of overlapping near
 * the pill. The curve's horizontal control offset is proportional to how far
 * the node sits from the centre, which is what keeps the outermost runs from
 * cutting across the inner ones.
 *
 * A LIGHT PULSE TRAVELS EACH RUN once it is drawn — a short bright dash cycling
 * along the path, which is what makes the diagram read as a live system rather
 * than a static chart. It is suppressed under reduced motion, where the curves
 * simply appear.
 */
function Connectors({ reduce }: { reduce: boolean }) {
  const paths = hero.nodes.map((node) => {
    const above = node.row === "capability";
    const nodeY = above ? GEO.capabilityY : GEO.systemY;
    const startY = above
      ? GEO.coreY - GEO.coreHalfHeight
      : GEO.coreY + GEO.coreHalfHeight;

    // Where the run leaves the core: spread across its width by how far the
    // node sits from centre, so the eight do not all start at one point.
    const startX = 50 + (node.x - 50) * 0.22;

    // The S-bend. A bigger horizontal reach for nodes further out.
    const reach = Math.abs(node.x - 50) * 0.35;
    const dir = node.x >= 50 ? 1 : -1;
    const midY = (startY + nodeY) / 2;

    /*
      Rounded, like the filament strands: unrounded floats serialise at full
      precision on the server and get truncated on the client, which React
      reports as a hydration mismatch.
    */
    const r = (value: number) => Math.round(value * 100) / 100;

    const d = [
      `M ${r(startX)} ${r(startY)}`,
      `C ${r(startX + dir * reach * 0.3)} ${r(midY)}`,
      `${r(node.x - dir * reach * 0.55)} ${r(midY)}`,
      `${node.x} ${nodeY + (above ? 9 : -9)}`,
    ].join(" ");

    return { id: node.id, d, above };
  });

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full"
    >
      {paths.map((path, index) => (
        <g key={path.id}>
          <motion.path
            d={path.d}
            fill="none"
            stroke="#a493e8"
            strokeWidth={1.15}
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            /*
              The base curves animate by OPACITY, not `pathLength`.

              Animating pathLength here left every connector rendering as a
              dotted line: motion implements it with `stroke-dasharray`, and
              once the tween settles the element keeps a `1px, 1px` pattern
              rather than reverting to a solid stroke. The pulse below still
              uses a dash — deliberately — so the two cannot share a technique.
            */
            initial={reduce ? { opacity: 0.92 } : { opacity: 0 }}
            animate={{ opacity: 0.92 }}
            transition={{
              duration: 0.6,
              delay: 0.6 + index * 0.05,
              ease: easeOut,
            }}
          />

          {/*
            The travelling pulse. `pathLength` is normalised to 1 so the dash
            pattern is expressed as a fraction of the run regardless of its
            actual length — otherwise the short connectors would pulse far
            faster than the long ones.
          */}
          {reduce ? null : (
            <motion.path
              d={path.d}
              fill="none"
              stroke="#d9ccff"
              strokeWidth={1.6}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              pathLength={1}
              strokeDasharray="0.12 0.88"
              initial={{ strokeDashoffset: 1, opacity: 0 }}
              animate={{ strokeDashoffset: [1, 0], opacity: [0, 1, 1, 0] }}
              transition={{
                duration: 2.4,
                delay: 1.4 + index * 0.22,
                repeat: Infinity,
                repeatDelay: 1.6,
                ease: "linear",
                opacity: {
                  duration: 2.4,
                  delay: 1.4 + index * 0.22,
                  repeat: Infinity,
                  repeatDelay: 1.6,
                  times: [0, 0.12, 0.85, 1],
                },
              }}
            />
          )}
        </g>
      ))}
    </svg>
  );
}
