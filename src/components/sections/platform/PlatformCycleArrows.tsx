"use client";

import { motion } from "motion/react";

/**
 * PLATFORM CYCLE — THE ARROWS
 * ---------------------------------------------------------------------------
 * The six curved connectors between the stage cards.
 *
 * HOW THE HEADS STAY ACCURATE, which is the whole difficulty here. An arrow
 * head has to sit exactly on the curve's last point and aim exactly along the
 * curve's direction there — eyeballing a rotation gets one of the six subtly
 * wrong, and a head that is a degree off reads as a mistake even when nobody
 * can say why.
 *
 * So nothing is hard-coded. Each connector is declared as a cubic Bézier —
 * start, two control points, end — and both the head's POSITION and its ANGLE
 * are derived from that same curve:
 *
 *   • the position is the curve's end point, by definition;
 *   • the angle is `atan2` of the curve's derivative at t=1, which for a cubic
 *     is simply the direction from the last control point to the end point.
 *
 * Move a control point and the head follows on its own. There is no second
 * place to keep in sync, which is what makes all six correct rather than five.
 *
 * THE STROKE STOPS SHORT of the head so the curve does not poke out of the
 * triangle's back edge. `trim` is how far back, in user units, and it is
 * applied by shortening the curve's end along that same tangent.
 *
 * COORDINATES ARE MEASURED, NOT FITTED. Every tail and head below was read
 * off the comp directly — the connectors were isolated by colour, the cards
 * masked out, and each blob's head identified as its THICK end (the triangle
 * is denser than the stroke). The cycle graphic spans 810x701 of the design,
 * and every number is in that space.
 *
 * That measurement matters: an earlier pass placed these by eye and put the
 * 06->01 connector at the BOTTOM of the ring instead of the top left, with two
 * others off besides. Eyeballing six curves around a ring gets some of them
 * wrong; reading them off the source does not.
 */

/** The violet the design draws every connector in. */
const STROKE = "#9333ea";

/** Half the head's width, and its length, in user units. */
const HEAD_W = 9;
const HEAD_L = 15;

interface Connector {
  /** Which stage's arrival this arrow follows. */
  after: string;
  /** Start, the two control points, and the end. */
  p0: readonly [number, number];
  p1: readonly [number, number];
  p2: readonly [number, number];
  p3: readonly [number, number];
}

/**
 * The six connectors, clockwise from 06→01 at the top left.
 *
 * Each curve leaves one card's edge and arrives at the next card's edge, in
 * the ring's own 810x701 space. The bounding boxes these were fitted to were
 * measured off the comp — see the note at the top of PlatformCycle.
 */
const connectors: readonly Connector[] = [
  /*
   * 06 → 01. Rises from the Measure card's top-right corner into the Define
   * card's left edge. Tail (175,106), head (243,54).
   */
  {
    after: "measure",
    p0: [175, 106],
    p1: [196, 78],
    p2: [218, 60],
    p3: [243, 54],
  },
  /*
   * 01 → 02. Leaves the Define card's right edge and turns down into the
   * Identify card. Tail (520,58), head (591,99).
   */
  {
    after: "define",
    p0: [520, 58],
    p1: [552, 62],
    p2: [578, 76],
    p3: [591, 99],
  },
  /*
   * 02 → 03. Straight down the right side, bowing outward.
   *
   * Nudged ~13 units further out than the comp's line: its first point sat
   * 7 units under the Identify card's bottom edge, inside that card's
   * downward shadow, which washed the start of the stroke out.
   */
  {
    after: "identify",
    p0: [745, 322],
    p1: [757, 334],
    p2: [756, 351],
    p3: [742, 364],
  },
  /*
   * 03 → 04. Down and left out of the Create card into Deliver.
   *
   * PUSHED 26 UNITS OUTWARD from the comp's own line. The two bottom
   * connectors run along the underside of the cards, and each card casts a
   * `0 16px 38px` shadow DOWNWARD — so at the comp's spacing the stroke sat
   * inside that wash and read as half-hidden. The bow is unchanged; the whole
   * curve simply sits further from the ring.
   */
  {
    after: "create",
    p0: [649, 576],
    p1: [617, 606],
    p2: [580, 626],
    p3: [543, 633],
  },
  /*
   * 04 → 05. Left and up out of the Deliver card into Practise. Pushed
   * outward for the same reason as 03 → 04 above.
   */
  {
    after: "deliver",
    p0: [251, 635],
    p1: [215, 625],
    p2: [181, 603],
    p3: [154, 578],
  },
  /*
   * 05 → 06. Up the left side, bowing outward.
   *
   * Its head stops 26 units below the Measure card rather than 18: the card's
   * downward shadow reaches about that far, and a head inside it looked
   * half-erased.
   */
  {
    after: "practise",
    p0: [56, 372],
    p1: [42, 356],
    p2: [43, 337],
    p3: [58, 322],
  },
];

/**
 * The curve's direction at its end, as a unit vector.
 *
 * The derivative of a cubic at t=1 is 3*(p3-p2), so the direction is simply
 * p3 - p2 normalised — no sampling, no approximation.
 */
function endTangent({ p2, p3 }: Connector): [number, number] {
  const dx = p3[0] - p2[0];
  const dy = p3[1] - p2[1];
  const length = Math.hypot(dx, dy) || 1;
  return [dx / length, dy / length];
}

/**
 * One connector: the curve, shortened so it meets the head's back edge, and
 * the head itself as a filled triangle on the curve's tangent.
 */
function Arrow({
  connector,
  delay,
  reduce,
  started,
}: {
  connector: Connector;
  delay: number;
  reduce: boolean;
  /** The ring's single trigger — see PlatformCycle. */
  started: boolean;
}) {
  const [tx, ty] = endTangent(connector);
  const [ex, ey] = connector.p3;

  // Pull the stroke back by the head's length so the two meet cleanly rather
  // than the line showing through the triangle.
  const trim = HEAD_L * 0.82;
  const sx = ex - tx * trim;
  const sy = ey - ty * trim;

  const { p0, p1, p2 } = connector;
  const d = `M${p0[0]} ${p0[1]} C ${p1[0]} ${p1[1]}, ${p2[0]} ${p2[1]}, ${sx.toFixed(2)} ${sy.toFixed(2)}`;

  // The triangle: its tip at the curve's end, its back edge square to the
  // tangent. The normal is the tangent turned a quarter turn.
  const nx = -ty;
  const ny = tx;
  const bx = ex - tx * HEAD_L;
  const by = ey - ty * HEAD_L;
  const head = [
    `${ex.toFixed(2)},${ey.toFixed(2)}`,
    `${(bx + nx * HEAD_W).toFixed(2)},${(by + ny * HEAD_W).toFixed(2)}`,
    `${(bx - nx * HEAD_W).toFixed(2)},${(by - ny * HEAD_W).toFixed(2)}`,
  ].join(" ");

  return (
    <g>
      <motion.path
        d={d}
        stroke={STROKE}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
        animate={reduce || started ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      />
      {/*
        The head appears as the stroke reaches it — scaled from its own tip,
        so it grows into place along the direction of travel rather than
        popping in at full size somewhere ahead of the line.
      */}
      <motion.polygon
        points={head}
        fill={STROKE}
        style={{ transformOrigin: `${ex}px ${ey}px` }}
        initial={reduce ? { scale: 1, opacity: 1 } : { scale: 0.4, opacity: 0 }}
        animate={
          reduce || started
            ? { scale: 1, opacity: 1 }
            : { scale: 0.4, opacity: 0 }
        }
        transition={{
          duration: 0.28,
          delay: reduce ? 0 : delay + 0.42,
          ease: [0.16, 1, 0.3, 1],
        }}
      />
    </g>
  );
}

/**
 * All six connectors. `beats` maps a stage id to the moment its OUTGOING arrow
 * should draw — the caller owns the timeline, so the cards and the arrows
 * between them stay on one clock.
 */
export function PlatformCycleArrows({
  beats,
  reduce,
  started,
}: {
  beats: Record<string, number>;
  reduce: boolean;
  /**
   * The ring's single trigger. Without this the arrows animated on MOUNT and
   * had finished drawing long before the reader scrolled to the section.
   */
  started: boolean;
}) {
  return (
    <svg
      viewBox="0 0 810 701"
      fill="none"
      className="pointer-events-none absolute inset-0 size-full"
      aria-hidden="true"
    >
      {connectors.map((connector) => (
        <Arrow
          key={connector.after}
          connector={connector}
          delay={reduce ? 0 : (beats[connector.after] ?? 0)}
          reduce={reduce}
          started={started}
        />
      ))}
    </svg>
  );
}

/** Exported for the centre glyph, which reuses the same violet. */
export { STROKE as cycleStroke };
