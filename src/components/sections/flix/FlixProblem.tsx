"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { flix } from "@/content/flix";
import { cn } from "@/lib/utils";

/**
 * LURNYFLIX — THE PROBLEM
 * ---------------------------------------------------------------------------
 * Section 2: the statement on the left with the source-to-video curve beneath
 * it, and four numbered problems in a ruled list on the right.
 *
 * ONLY THE GRADIENT IS A RASTER
 * The supplied plate is a clean cream field with soft corner blooms — no copy,
 * no rules, no curve on it. The pack also ships the workflow curve as a
 * 2172x724 PNG; that file is deliberately unused. It is pure line art, so
 * drawing it keeps the labels selectable and translatable, keeps the strokes
 * crisp at any density, and lets the curve draw itself on scroll.
 * See scripts/build-flix-hero.cjs.
 *
 * THE CURVE'S NODES ARE COMPUTED, NOT PLACED
 * One cubic path is declared once, and every node — its dot, its icon and its
 * label — is positioned by sampling that path with `getPointAtLength`. So the
 * dots cannot drift off the line: change the curve and they follow it. Placing
 * five dots by hand against a hand-written path is exactly the kind of pair
 * that silently disagrees after an edit.
 *
 * THE ENTRANCE
 * The copy cascades, the curve draws itself left to right, its nodes pop in
 * along it as it passes, and the four problems rise in turn. All of it is
 * gated on `useReducedMotion`.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { problem } = flix;

/**
 * One run of the closing promise.
 *
 * The content file declares the runs `as const`, so their union is a union of
 * five DIFFERENT shapes and `accent` is not readable off the union as a whole
 * — only two of them carry it. Widening to a common shape here is honest about
 * that: `accent` is genuinely optional, not a discriminant.
 */
type PromiseRun = { text: string; accent?: boolean };

const PROMISE: readonly PromiseRun[] = problem.promise;

/**
 * How much larger the node glyphs are than their 32x32 box.
 *
 * The design draws them noticeably bigger than the dot they sit above; at 1
 * they read as undersized beside it.
 */
const ICON_SCALE = 1.35;

/** The mark above each node on the curve. */
const flowIcons = {
  pdf: FlowDocIcon,
  ppt: FlowBoardIcon,
  link: FlowLinkIcon,
  youtube: FlowVideoIcon,
  spark: FlowSparkIcon,
} as const;

/* -------------------------------------------------------------------------- */
/*  The source-to-video curve                                                 */
/* -------------------------------------------------------------------------- */

/** The curve's own box. Every number below is in these units. */
const FLOW_BOX = { w: 620, h: 250 };

/**
 * The curve itself: a lead-in, four alternating bends through the five nodes,
 * then a dip out to the player.
 *
 * Declared ONCE and sampled below — see the note at the top of the file.
 */
const FLOW_PATH =
  "M 6 128 L 46 128 C 82 128, 82 86, 118 86 C 154 86, 154 128, 190 128 " +
  "C 226 128, 226 86, 262 86 C 298 86, 298 128, 334 128 " +
  "C 372 128, 378 176, 416 180";

/**
 * Where each node sits, as a fraction along the curve.
 *
 * The five are spaced to land on the path's alternating crests and troughs —
 * which is what makes the line read as threading them rather than passing
 * behind them.
 */
const NODE_AT = [0.1, 0.29, 0.48, 0.67, 0.86] as const;

/**
 * The nodes' positions, sampled off the path itself.
 *
 * `getPointAtLength` needs a laid-out SVG path, which the server has no DOM
 * for — so this measures once on mount, in a detached SVG, and the first paint
 * uses the fallback below.
 *
 * The fallback is NOT a guess at the curve: it is the path's own control
 * points, which by construction are the crests and troughs the nodes sit on.
 * So even before measurement the dots are on the line rather than beside it.
 */
const FALLBACK_NODES = [
  { x: 46, y: 128 },
  { x: 118, y: 86 },
  { x: 190, y: 128 },
  { x: 262, y: 86 },
  { x: 334, y: 128 },
] as const;

function useCurveNodes() {
  const [nodes, setNodes] = useState<readonly { x: number; y: number }[]>(
    FALLBACK_NODES,
  );

  useEffect(() => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const path = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path",
    );
    path.setAttribute("d", FLOW_PATH);
    svg.appendChild(path);
    /* Detached elements report a zero length in some engines, so it is
       attached — off-screen and hidden from everything. */
    svg.setAttribute("aria-hidden", "true");
    svg.style.cssText =
      "position:absolute;width:0;height:0;overflow:hidden;pointer-events:none";
    document.body.appendChild(svg);

    try {
      const total = path.getTotalLength();
      if (total > 0) {
        setNodes(
          NODE_AT.map((t) => {
            const p = path.getPointAtLength(total * t);
            return { x: p.x, y: p.y };
          }),
        );
      }
    } finally {
      svg.remove();
    }
  }, []);

  return nodes;
}

export function FlixProblem() {
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduce ? "shown" : "hidden",
    whileInView: "shown",
    viewport: { once: true, amount: "some" } as const,
    variants: {
      hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
      shown: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.85, delay, ease: easeOut },
      },
    },
  });

  return (
    <section className="relative isolate overflow-hidden bg-[#faf7f2] py-section-lg">
      {/* The gradient. Covers the section, so everything sits on it. */}
      <Image
        src={problem.backdrop.src}
        alt={problem.backdrop.alt}
        width={problem.backdrop.width}
        height={problem.backdrop.height}
        aria-hidden="true"
        sizes="100vw"
        className="pointer-events-none absolute inset-0 -z-10 size-full object-cover"
      />

      <Container width="hero">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          {/* ========================= Left column ==================== */}
          <div>
            <motion.p
              {...rise(0.05)}
              className={cn(
                "font-mono text-[0.75rem] font-medium uppercase",
                "tracking-[0.16em] text-[#6d28d9]",
              )}
            >
              {problem.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.16)}
              className={cn(
                "mt-6 font-display font-bold tracking-[-0.035em]",
                "leading-[1.1] text-[#171326]",
                "text-[1.75rem] sm:text-[2.125rem] xl:text-[2.5rem]",
              )}
            >
              {problem.headline.map((line) => (
                <span key={line} className="inline lg:block">
                  {line}{" "}
                </span>
              ))}
            </motion.h2>

            <motion.p
              {...rise(0.28)}
              className={cn(
                "mt-7 max-w-[34rem] leading-relaxed text-pretty",
                "text-[0.9375rem] text-[#3f3a52] sm:text-[1rem]",
              )}
            >
              {problem.description}
            </motion.p>

            {/* The closing promise. The violet runs are marked in the content
                file rather than hard-coded here. */}
            <motion.p
              {...rise(0.38)}
              className={cn(
                "mt-6 max-w-[34rem] leading-relaxed text-pretty",
                "text-[0.9375rem] text-[#3f3a52] sm:text-[1rem]",
              )}
            >
              {PROMISE.map((run, index) => (
                <span
                  key={index}
                  className={
                    run.accent ? "font-semibold text-[#6d28d9]" : undefined
                  }
                >
                  {run.text}
                </span>
              ))}
            </motion.p>

            {/* ------------------------ The curve ------------------- */}
            <motion.div {...rise(0.5)} className="mt-12">
              <SourceFlow reduce={Boolean(reduce)} />
            </motion.div>
          </div>

          {/* ======================== Right column ==================== */}
          {/* The four problems, ruled between as the design sets them. The
              ordinal is the item's position rather than stored copy. */}
          <ol className="lg:pt-1.5">
            {problem.problems.map((item, index) => (
              <motion.li
                key={item.title}
                {...rise(0.3 + index * 0.12)}
                className={cn(
                  "border-t border-[#1b1230]/12 py-7",
                  // The design rules above every item including the first, and
                  // closes the list with a final rule.
                  index === problem.problems.length - 1 &&
                    "border-b border-[#1b1230]/12",
                )}
              >
                <p className="font-mono text-[0.8125rem] font-semibold text-[#6d28d9]">
                  {String(index + 1).padStart(2, "0")}
                </p>

                <p
                  className={cn(
                    "mt-3 font-display font-bold tracking-[-0.02em]",
                    "text-[1.125rem] leading-snug text-[#171326] sm:text-[1.25rem]",
                  )}
                >
                  {item.title}
                </p>

                <p className="mt-2.5 max-w-[34rem] text-[0.9375rem] leading-relaxed text-[#4a4560]">
                  {item.body}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

/* ========================================================================== */
/*  The source-to-video curve                                                 */
/* ========================================================================== */

/**
 * PDF → PPT → URL → YouTube → AI, threaded on one curve out to a player.
 *
 * The nodes are sampled off the path itself once it is laid out; see the note
 * at the top of the file for why they are not placed by hand.
 */
function SourceFlow({ reduce }: { reduce: boolean }) {
  const nodes = useCurveNodes();

  return (
    <svg
      viewBox={`0 0 ${FLOW_BOX.w} ${FLOW_BOX.h}`}
      fill="none"
      className="h-auto w-full max-w-[34rem]"
      role="img"
      aria-label={`Sources LurnyFlix can start from: ${problem.flow.steps
        .map((s) => s.label)
        .join(", ")} — each becomes a video.`}
    >
      {/* ---------------------------- The line -------------------- */}
      <motion.path
        d={FLOW_PATH}
        stroke="#a5a0e0"
        strokeWidth="2"
        strokeLinecap="round"
        initial={
          reduce ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }
        }
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: "some" }}
        transition={{ duration: 1.4, delay: 0.2, ease: easeOut }}
      />

      {/* The arrow into the player, after the line has reached it. */}
      <motion.path
        d="M 420 181 L 452 184"
        stroke="#a5a0e0"
        strokeWidth="2"
        strokeLinecap="round"
        initial={
          reduce ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }
        }
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: "some" }}
        transition={{ duration: 0.3, delay: 1.5, ease: easeOut }}
      />
      <motion.path
        d="M 444 178 L 454 184 L 444 190"
        stroke="#a5a0e0"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduce ? { opacity: 1 } : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: "some" }}
        transition={{ duration: 0.3, delay: 1.75, ease: easeOut }}
      />

      {/* --------------------------- The nodes -------------------- */}
      {problem.flow.steps.map((step, index) => {
        const Icon = flowIcons[step.icon];
        const node = nodes[index];
        /* The label sits below the node, the icon above it — the design
           alternates nothing here, both are constant offsets. */
        return (
          <motion.g
            key={step.label}
            initial={
              reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }
            }
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: "some" }}
            transition={{
              duration: 0.45,
              // Each node arrives as the line reaches it.
              delay: 0.35 + index * 0.22,
              ease: easeOut,
            }}
            style={{ transformOrigin: `${node.x}px ${node.y}px` }}
          >
            {/*
              Centred on the node and set a dot-diameter above it, as the
              design places them.

              The order matters: `translate(node) scale(k) translate(-16,-16)`
              scales the centring offset as well, so the box lands at
              `node - 16k` and drifts further left the larger the glyph. The
              centring translate therefore has to be expressed in the SCALED
              box's own units — half of 32 — which is what `-16 -16` means
              only once it is INSIDE the scale. Writing the offset pre-scaled
              (`node.x - 16 * ICON_SCALE`) keeps it honest.
            */}
            <g
              transform={
                `translate(${node.x - 16 * ICON_SCALE} ${node.y - 42 - 16 * ICON_SCALE})` +
                ` scale(${ICON_SCALE})`
              }
            >
              <Icon x={0} y={0} />
            </g>

            {/* The dot on the line: a filled core in a white ring, so the
                curve reads as passing behind it rather than through it. */}
            <circle cx={node.x} cy={node.y} r="13" fill="#faf7f2" />
            <circle
              cx={node.x}
              cy={node.y}
              r="12"
              fill="none"
              stroke="#a5a0e0"
              strokeWidth="2"
            />
            <circle cx={node.x} cy={node.y} r="6.5" fill="#8a83d8" />

            <text
              x={node.x}
              y={node.y + 36}
              textAnchor="middle"
              fill="#6f68b4"
              fontSize="15"
              fontWeight="500"
            >
              {step.label}
            </text>
          </motion.g>
        );
      })}

      {/* -------------------------- The player -------------------- */}
      {/* What every source becomes. */}
      <motion.g
        initial={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: "some" }}
        transition={{ duration: 0.5, delay: 1.85, ease: easeOut }}
        style={{ transformOrigin: "500px 184px" }}
      >
        <rect
          x="464"
          y="156"
          width="72"
          height="56"
          rx="10"
          fill="none"
          stroke="#a5a0e0"
          strokeWidth="2"
        />
        <path
          d="M 492 171 L 512 184 L 492 197 Z"
          fill="none"
          stroke="#a5a0e0"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </motion.g>
    </svg>
  );
}

/* ========================================================================== */
/*  The curve's icons                                                         */
/* ========================================================================== */

/**
 * Drawn on a 32x32 box positioned by `x`/`y`, so each can be dropped at a
 * sampled node without wrapping it in another coordinate space.
 *
 * All five share the curve's lilac and its 2px stroke — they are one family of
 * marks rather than five brand logos, which is what the design draws here (the
 * hero's format tiles carry the real brand marks instead).
 */

type FlowIconProps = { x: number; y: number };

const flowStroke = {
  fill: "none",
  stroke: "#a5a0e0",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/*
 * Every glyph below is drawn to fill the SAME 32x32 box, centred on x=16.
 *
 * That matters because the caller centres the box on its node (`x - 16`): a
 * glyph whose art sits off-centre inside its own box renders visibly adrift
 * from the dot beneath it, and the five drift by different amounts, which
 * reads as sloppiness rather than as a family.
 */

/** PDF — a document with a folded corner. */
function FlowDocIcon({ x, y }: FlowIconProps) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M8 3h11l6 6v20a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" {...flowStroke} />
      <path d="M19 3v6h6" {...flowStroke} />
      <path d="M11 17h10M11 22h10M11 27h6" {...flowStroke} />
    </g>
  );
}

/** PPT — a presentation board on its stand. */
function FlowBoardIcon({ x, y }: FlowIconProps) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="4" y="4" width="24" height="18" rx="3" {...flowStroke} />
      <circle cx="16" cy="12" r="4" {...flowStroke} />
      <path d="M22 8.5h.01" {...flowStroke} />
      <path d="M11 22v5M21 22v5M16 22v6" {...flowStroke} />
    </g>
  );
}

/** URL — two links of a chain. */
function FlowLinkIcon({ x, y }: FlowIconProps) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M13.5 18.5a5.5 5.5 0 0 1 0-7.8l3.7-3.7a5.5 5.5 0 0 1 7.8 7.8l-1.9 1.9" {...flowStroke} />
      <path d="M18.5 13.5a5.5 5.5 0 0 1 0 7.8l-3.7 3.7a5.5 5.5 0 0 1-7.8-7.8l1.9-1.9" {...flowStroke} />
    </g>
  );
}

/** YouTube — a play tile. */
function FlowVideoIcon({ x, y }: FlowIconProps) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="3" y="7" width="26" height="18" rx="4" {...flowStroke} />
      <path d="M13.5 12 20.5 16 13.5 20 Z" {...flowStroke} />
    </g>
  );
}

/** AI — the four-point spark. */
function FlowSparkIcon({ x, y }: FlowIconProps) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path
        d="M16 2.5c1.2 7.6 3.7 10.1 11.3 11.3C19.7 15 17.2 17.5 16 25.1 14.8 17.5 12.3 15 4.7 13.8 12.3 12.6 14.8 10.1 16 2.5Z"
        {...flowStroke}
      />
    </g>
  );
}
