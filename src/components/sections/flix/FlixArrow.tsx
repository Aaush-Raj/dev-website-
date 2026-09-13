"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

/**
 * FLIX ARROWS
 * ---------------------------------------------------------------------------
 * The connector arrows used across the LurnyFlix page.
 *
 * WHY THIS EXISTS
 * Each section previously drew its own arrow as a stroked path plus a
 * hand-written triangle, on an SVG with `preserveAspectRatio="none"`. Two
 * things were wrong with that:
 *
 *   1. `preserveAspectRatio="none"` stretches x and y independently. A stroke
 *      written in that box renders at different widths along its horizontal
 *      and vertical runs, and any triangle written in the same units comes out
 *      skewed — which is why the heads read as fat, lopsided wedges rather
 *      than as arrowheads.
 *
 *   2. The design does not draw a stroke-plus-triangle at all. It draws two
 *      different things, and neither is what was there.
 *
 * WHAT THE DESIGN ACTUALLY DRAWS
 * Measured off the supplied artwork at source resolution:
 *
 *   "solid"  (section 3, the PPT->Video and Vimeo arrows) — ONE FILLED PATH.
 *            The shaft TAPERS, narrow at the tail and widening as it travels,
 *            then flares into a swept-back barb whose trailing edges angle
 *            back toward the tail. There is no stroke anywhere on it.
 *
 *   "chevron" (section 4's script->video arrow) — a round-capped stroke of
 *            constant width, ending in a V of two more round-capped strokes
 *            at the same weight. A hand-drawn look: the head is the same pen
 *            as the shaft, not a filled shape. It only works at a heavy
 *            weight, where the wings are long enough to read as a V.
 *
 *   "pointer" (section 7's connectors) — a THIN stroke ending in a small
 *            FILLED triangle, the line tucked into the triangle's base. This
 *            is the diagramming convention for a technical connector, and it
 *            is what a thin line needs: a chevron at 3px collapses into a
 *            scratchy "›" glyph that floats off the end of the line.
 *
 * HOW THIS DRAWS THEM CORRECTLY
 * The SVG uses `preserveAspectRatio="xMidYMid meet"` on a SQUARE viewBox, so
 * nothing is ever stretched — a round cap stays round and a barb keeps its
 * angle at every container size.
 *
 * That squareness is what the old code was avoiding, because a square box does
 * not fill a wide container. The fix is to measure the container and map the
 * caller's percentage endpoints into the square box at render time, so the
 * arrow still spans exactly the points it was given while its geometry stays
 * undistorted. `useArrowBox` below does that measurement.
 *
 * The head is built from the curve's own end tangent rather than typed in, so
 * it always points ALONG the path — the single most common defect in the
 * previous version was a head aimed somewhere other than the direction of
 * travel.
 *
 * LAYERING: THE ARROWS SIT BEHIND THE CARDS
 * Every caller starts an arrow a little INSIDE its source card and stacks the
 * SVG below the cards. So the tail is hidden and the line appears to emerge
 * from the card's edge, wherever that edge actually falls — the start point
 * no longer has to be pixel-perfect, and nothing is ever seen crossing a chip
 * or a field on its way out. Tips are aimed a hair short of the destination
 * card's edge so the head is never swallowed by it.
 */

/* -------------------------------------------------------------------------- */
/*  Geometry                                                                  */
/* -------------------------------------------------------------------------- */

export interface Point {
  /** Percentage of the container's width. */
  x: number;
  /** Percentage of the container's height. */
  y: number;
}

export interface ArrowSpec {
  /** Where the arrow leaves. */
  from: Point;
  /** Where its head lands. */
  to: Point;
  /**
   * How the curve bows, as a fraction of the straight-line distance.
   *
   * Positive bows to the LEFT of the direction of travel, negative to the
   * right. A curve rather than two control points because every arrow on this
   * page is a single smooth arc, and one number is far easier to tune against
   * a design than four coordinates.
   */
  bow?: number;
  /** Shaft width at the head, in box units. `solid` tapers to half this. */
  weight?: number;
  /** How far back the head reaches along the shaft, in box units. */
  head?: number;
  /**
   * "arc" (default) is one bowed curve — the swooping arrows in sections 3
   * and 4. "s" leaves `from` HORIZONTALLY and arrives at `to` horizontally,
   * which is the elbow the section 7 connectors need: a short gutter to cross
   * and a long way to drop, where an arc would read as a diagonal slash.
   */
  shape?: "arc" | "s";
}

/** A point along the cubic, and the unit tangent there. */
function cubicAt(
  t: number,
  p0: Point,
  c1: Point,
  c2: Point,
  p1: Point,
): { point: Point; tangent: Point } {
  const u = 1 - t;
  const point = {
    x:
      u * u * u * p0.x +
      3 * u * u * t * c1.x +
      3 * u * t * t * c2.x +
      t * t * t * p1.x,
    y:
      u * u * u * p0.y +
      3 * u * u * t * c1.y +
      3 * u * t * t * c2.y +
      t * t * t * p1.y,
  };

  const dx =
    3 * u * u * (c1.x - p0.x) +
    6 * u * t * (c2.x - c1.x) +
    3 * t * t * (p1.x - c2.x);
  const dy =
    3 * u * u * (c1.y - p0.y) +
    6 * u * t * (c2.y - c1.y) +
    3 * t * t * (p1.y - c2.y);
  const len = Math.hypot(dx, dy) || 1;

  return { point, tangent: { x: dx / len, y: dy / len } };
}

/** The two control points of the cubic between `from` and `to`. */
function controls(from: Point, to: Point, bow: number, shape: "arc" | "s") {
  const dx = to.x - from.x;
  const dy = to.y - from.y;

  if (shape === "s") {
    /* Horizontal handles at both ends, each reaching the MIDPOINT of the
       run: the curve leaves flat, does its whole drop centred in the gutter,
       and lands flat. */
    const h = dx * 0.5;
    return {
      c1: { x: from.x + h, y: from.y },
      c2: { x: to.x - h, y: to.y },
    };
  }

  /* The normal to the direction of travel, which is the direction the bow
     pushes the curve in. */
  const nx = -dy;
  const ny = dx;

  return {
    c1: { x: from.x + dx * 0.35 + nx * bow, y: from.y + dy * 0.35 + ny * bow },
    c2: { x: from.x + dx * 0.72 + nx * bow, y: from.y + dy * 0.72 + ny * bow },
  };
}

/**
 * THE SOLID ARROW — section 3's style.
 *
 * Built as one closed outline: down the curve's left side at a widening
 * offset, out to the barb's left wing, in to the tip, back out to the right
 * wing, and home up the right side. Filled, never stroked.
 */
function solidPath(spec: Required<ArrowSpec>) {
  const { from, to, bow, weight, head, shape } = spec;
  const { c1, c2 } = controls(from, to, bow, shape);

  /* Where the shaft stops and the head begins, as a fraction of the curve. */
  const span = Math.hypot(to.x - from.x, to.y - from.y) || 1;
  const tHead = Math.max(0, 1 - head / span);

  const SAMPLES = 26;
  const left: string[] = [];
  const right: Point[] = [];

  for (let i = 0; i <= SAMPLES; i += 1) {
    const t = (i / SAMPLES) * tHead;
    const { point, tangent } = cubicAt(t, from, c1, c2, to);
    /* The taper: half weight at the tail, full weight where the head starts. */
    const w = (weight * (0.42 + 0.58 * (t / (tHead || 1)))) / 2;
    const nx = -tangent.y * w;
    const ny = tangent.x * w;

    left.push(
      `${i === 0 ? "M" : "L"} ${(point.x + nx).toFixed(2)} ${(point.y + ny).toFixed(2)}`,
    );
    right.push({ x: point.x - nx, y: point.y - ny });
  }

  /* The barb. Its wings sit off the shaft's own normal at the head's start,
     swept back so the head reads as an arrow rather than a spearpoint. */
  const at = cubicAt(tHead, from, c1, c2, to);
  const nx = -at.tangent.y;
  const ny = at.tangent.x;
  /* Measured off the design: the barb is about 3.2x the shaft's width at the
     head, so each wing reaches 1.6 shaft-widths out from the centreline. */
  const wing = weight * 1.6;
  const sweep = head * 0.24;

  const leftWing = {
    x: at.point.x + nx * wing - at.tangent.x * sweep,
    y: at.point.y + ny * wing - at.tangent.y * sweep,
  };
  const rightWing = {
    x: at.point.x - nx * wing - at.tangent.x * sweep,
    y: at.point.y - ny * wing - at.tangent.y * sweep,
  };

  return [
    left.join(" "),
    `L ${leftWing.x.toFixed(2)} ${leftWing.y.toFixed(2)}`,
    `L ${to.x.toFixed(2)} ${to.y.toFixed(2)}`,
    `L ${rightWing.x.toFixed(2)} ${rightWing.y.toFixed(2)}`,
    ...right
      .reverse()
      .map((p) => `L ${p.x.toFixed(2)} ${p.y.toFixed(2)}`),
    "Z",
  ].join(" ");
}

/**
 * The shaft of a chevron arrow: the full cubic, tail to tip.
 *
 * It runs ALL the way to `to`. An earlier version stopped it short so its
 * round cap would not sit inside the V — but that left a visible gap between
 * shaft and head, which is worse than the problem it solved. The V stays open
 * because its wings are long enough (see `chevronHead`), not because the
 * shaft holds back; the three round caps simply meet at the tip, which is
 * exactly what one pen stroke looks like.
 */
function chevronShaft(spec: Required<ArrowSpec>) {
  const { from, to, bow, shape } = spec;
  const { c1, c2 } = controls(from, to, bow, shape);

  return `M ${from.x.toFixed(2)} ${from.y.toFixed(2)} C ${c1.x.toFixed(2)} ${c1.y.toFixed(2)}, ${c2.x.toFixed(2)} ${c2.y.toFixed(2)}, ${to.x.toFixed(2)} ${to.y.toFixed(2)}`;
}

/**
 * The chevron head: a V of two strokes, opened around the curve's END TANGENT.
 *
 * Taking the angle from the tangent is the whole point — a head typed in by
 * hand drifts out of alignment the moment the curve is tuned.
 */
function chevronHead(spec: Required<ArrowSpec>) {
  const { from, to, bow, head, weight, shape } = spec;
  const { c1, c2 } = controls(from, to, bow, shape);

  /* The shaft ends at t=1 now, so the tangent there IS the shaft's own final
     direction — the head can only ever point where the line is going. */
  const { tangent } = cubicAt(1, from, c1, c2, to);
  const angle = Math.atan2(tangent.y, tangent.x);
  const spread = (34 * Math.PI) / 180;

  /*
   * THE WING LENGTH IS TIED TO THE STROKE WEIGHT, not set independently.
   *
   * Each wing is a round-capped stroke `weight` wide, so a wing shorter than
   * roughly 2.5x that weight is mostly cap: the two caps overlap at the vertex
   * and the V fills in as a solid wedge. Taking the larger of the caller's
   * `head` and that floor keeps the V open at every weight this page uses.
   */
  const len = Math.max(head * 0.62, weight * 2.6);

  const wingA = {
    x: to.x - Math.cos(angle - spread) * len,
    y: to.y - Math.sin(angle - spread) * len,
  };
  const wingB = {
    x: to.x - Math.cos(angle + spread) * len,
    y: to.y - Math.sin(angle + spread) * len,
  };

  return `M ${wingA.x.toFixed(2)} ${wingA.y.toFixed(2)} L ${to.x.toFixed(2)} ${to.y.toFixed(2)} L ${wingB.x.toFixed(2)} ${wingB.y.toFixed(2)}`;
}

/**
 * For the "s" shape: how far before the tip the curve must be finished
 * turning, so the head sits on a straight run.
 *
 * A cubic elbow is still turning right up to its endpoint — the vertical
 * deviation `u` back from the tip is 3u²·drop, which on a 23-unit drop across
 * a 7-unit gutter is nearly six units at the head's base. The head was being
 * drawn horizontally from the tip while the line arrived from above it, and
 * the two visibly failed to meet. So the S is built to a point `lead` short
 * of the tip and a straight segment closes the gap.
 */
function pointerLead(spec: Required<ArrowSpec>) {
  return spec.shape === "s" ? spec.weight * 5 * 1.25 : 0;
}

/** The S-curve's own endpoint — `lead` short of the tip, on the same row. */
function sEnd(spec: Required<ArrowSpec>) {
  const { from, to } = spec;
  const lead = pointerLead(spec);
  return { x: to.x - Math.sign(to.x - from.x || 1) * lead, y: to.y };
}

/**
 * THE POINTER HEAD — a filled triangle aimed along the curve's end tangent.
 *
 * Sized from the stroke weight so it stays in proportion to the line it
 * caps: about five weights long and four and a half wide. Sizing it from
 * `head` alone let a caller make it either a sliver or a spearhead.
 */
function pointerHead(spec: Required<ArrowSpec>) {
  const { from, to, bow, weight, shape } = spec;
  /* On an "s" the head sits on the straight lead, so its direction is
     exactly that segment's; on an arc it is the curve's end tangent. */
  const tangent =
    shape === "s"
      ? { x: Math.sign(to.x - from.x || 1), y: 0 }
      : cubicAt(1, from, controls(from, to, bow, shape).c1, controls(from, to, bow, shape).c2, to).tangent;

  const len = weight * 5;
  const half = weight * 2.3;
  const base = { x: to.x - tangent.x * len, y: to.y - tangent.y * len };
  const nx = -tangent.y;
  const ny = tangent.x;

  return [
    `M ${to.x.toFixed(2)} ${to.y.toFixed(2)}`,
    `L ${(base.x + nx * half).toFixed(2)} ${(base.y + ny * half).toFixed(2)}`,
    `L ${(base.x - nx * half).toFixed(2)} ${(base.y - ny * half).toFixed(2)}`,
    "Z",
  ].join(" ");
}

/**
 * The pointer's shaft stops INSIDE the head's base, so the line disappears
 * into the triangle rather than its round cap poking out of the sides.
 */
function pointerShaft(spec: Required<ArrowSpec>) {
  const { from, to, bow, weight, shape } = spec;

  /* Two-thirds of the head's length back from the tip: well inside the
     triangle, past the point where its width exceeds the stroke's. */
  const inset = weight * 5 * 0.66;

  if (shape === "s") {
    /* The S runs to its own end, then a straight lead carries the line into
       the head. */
    const p = sEnd(spec);
    const { c1, c2 } = controls(from, p, bow, shape);
    const dir = Math.sign(to.x - from.x || 1);
    const end = { x: to.x - dir * inset, y: to.y };

    return (
      `M ${from.x.toFixed(2)} ${from.y.toFixed(2)} ` +
      `C ${c1.x.toFixed(2)} ${c1.y.toFixed(2)}, ${c2.x.toFixed(2)} ${c2.y.toFixed(2)}, ${p.x.toFixed(2)} ${p.y.toFixed(2)} ` +
      `L ${end.x.toFixed(2)} ${end.y.toFixed(2)}`
    );
  }

  const { c1, c2 } = controls(from, to, bow, shape);
  const span = Math.hypot(to.x - from.x, to.y - from.y) || 1;
  const tEnd = Math.max(0, 1 - inset / span);
  const end = cubicAt(tEnd, from, c1, c2, to).point;

  return `M ${from.x.toFixed(2)} ${from.y.toFixed(2)} C ${c1.x.toFixed(2)} ${c1.y.toFixed(2)}, ${c2.x.toFixed(2)} ${c2.y.toFixed(2)}, ${end.x.toFixed(2)} ${end.y.toFixed(2)}`;
}

/* -------------------------------------------------------------------------- */
/*  The square-box mapping                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Measures the host element and returns the viewBox that lets a SQUARE-ratio
 * SVG cover it without distortion.
 *
 * The arrow's geometry is computed in a 0..100 square. To have it span a
 * container that is, say, twice as wide as it is tall, the viewBox is widened
 * to 0 0 200 100 and the caller's percentage points are scaled into it. Every
 * angle, cap and barb then renders true, because x and y still share a scale.
 */
function useArrowBox(ref: React.RefObject<SVGSVGElement | null>) {
  const [ratio, setRatio] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      const { width, height } = el.getBoundingClientRect();
      if (width > 0 && height > 0) setRatio(width / height);
    };

    measure();

    /* The stage resizes with the viewport and with its own content, so a
       resize observer rather than a window listener. */
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  return ratio;
}

/* -------------------------------------------------------------------------- */
/*  The component                                                             */
/* -------------------------------------------------------------------------- */

export interface FlixArrowProps {
  /** The arrows to draw, in the host's own percentage space. */
  arrows: readonly (ArrowSpec & { id: string; delay?: number })[];
  /** Which of the three the design draws here. */
  variant: "solid" | "chevron" | "pointer";
  colour: string;
  reduce: boolean;
  className?: string;
}

export function FlixArrow({
  arrows,
  variant,
  colour,
  reduce,
  className,
}: FlixArrowProps) {
  const ref = useRef<SVGSVGElement>(null);
  const ratio = useArrowBox(ref);

  /* The box is 100 tall and as wide as the container's aspect, so a square
     unit in the box is a square unit on screen. */
  const boxW = 100 * ratio;

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${boxW.toFixed(2)} 100`}
      // NOT "none": this is what keeps caps round and barbs true.
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 size-full", className)}
    >
      {arrows.map((arrow) => {
        /* The caller's percentages, mapped into the box. */
        const spec: Required<ArrowSpec> = {
          from: { x: (arrow.from.x / 100) * boxW, y: arrow.from.y },
          to: { x: (arrow.to.x / 100) * boxW, y: arrow.to.y },
          bow: arrow.bow ?? 0.12,
          weight: arrow.weight ?? 2.6,
          head: arrow.head ?? 7,
          shape: arrow.shape ?? "arc",
        };

        const delay = arrow.delay ?? 0;

        if (variant === "solid") {
          /* One filled path.
  
             A fill has no length to animate along, so this grows from the tail
             instead: the whole shape scales up about its own start point,
             which reads as the arrow extending toward its target. */
          return (
            <motion.path
              key={arrow.id}
              d={solidPath(spec)}
              fill={colour}
              initial={
                reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.72 }
              }
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: "some" }}
              transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
              style={{
                transformOrigin: `${spec.from.x}px ${spec.from.y}px`,
              }}
            />
          );
        }

        if (variant === "pointer") {
          return (
            <g key={arrow.id}>
              <motion.path
                d={pointerShaft(spec)}
                stroke={colour}
                strokeWidth={spec.weight}
                strokeLinecap="round"
                initial={
                  reduce
                    ? { pathLength: 1, opacity: 1 }
                    : { pathLength: 0, opacity: 0 }
                }
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, amount: "some" }}
                transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
              />
              {/* Filled, with a hairline of the same colour and round joins
                  so the three corners are softened rather than needle-sharp.
                  It pops in once the line has reached it. */}
              <motion.path
                d={pointerHead(spec)}
                fill={colour}
                stroke={colour}
                strokeWidth={spec.weight * 0.5}
                strokeLinejoin="round"
                initial={
                  reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.4 }
                }
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: "some" }}
                transition={{
                  duration: 0.3,
                  delay: delay + 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{ transformOrigin: `${spec.to.x}px ${spec.to.y}px` }}
              />
            </g>
          );
        }

        return (
          <g key={arrow.id}>
            <motion.path
              d={chevronShaft(spec)}
              stroke={colour}
              strokeWidth={spec.weight}
              strokeLinecap="round"
              initial={
                reduce
                  ? { pathLength: 1, opacity: 1 }
                  : { pathLength: 0, opacity: 0 }
              }
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, amount: "some" }}
              transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.path
              d={chevronHead(spec)}
              stroke={colour}
              strokeWidth={spec.weight}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={
                reduce
                  ? { pathLength: 1, opacity: 1 }
                  : { pathLength: 0, opacity: 0 }
              }
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, amount: "some" }}
              transition={{
                duration: 0.28,
                delay: delay + 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          </g>
        );
      })}
    </svg>
  );
}
