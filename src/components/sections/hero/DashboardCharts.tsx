"use client";

import { motion, useReducedMotion } from "motion/react";

import { dashboard } from "@/content/dashboard";
import { cn } from "@/lib/utils";

/**
 * DASHBOARD CHARTS
 * ---------------------------------------------------------------------------
 * The individual visualisations inside the hero product mockup, drawn as SVG.
 *
 * Each animates on mount to make the mockup feel alive rather than a static
 * screenshot — the donut sweeps, the radar scales up, the line draws itself.
 * All of them check useReducedMotion() and render their final state directly
 * when the OS asks for reduced motion.
 *
 * These are decorative marketing visuals, so they carry aria-hidden and the
 * surrounding markup provides any meaningful text.
 */

/* ========================================================================== */
/* DONUT — overall readiness                                                  */
/* ========================================================================== */

export function ReadinessDonut({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const { value } = dashboard.readiness;

  // 40 radius on a 100-box: circumference 2*pi*r.
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const filled = (value / 100) * circumference;

  return (
    <svg
      viewBox="0 0 100 100"
      className={cn("size-full", className)}
      aria-hidden="true"
    >
      {/* Track */}
      <circle
        cx="50"
        cy="50"
        r={radius}
        fill="none"
        stroke="var(--brand-100)"
        strokeWidth="11"
      />
      {/* Progress — rotated so it starts at 12 o'clock. */}
      <motion.circle
        cx="50"
        cy="50"
        r={radius}
        fill="none"
        stroke="var(--brand-500)"
        strokeWidth="11"
        strokeLinecap="round"
        transform="rotate(-90 50 50)"
        strokeDasharray={circumference}
        initial={{
          strokeDashoffset: reduce ? circumference - filled : circumference,
        }}
        whileInView={{ strokeDashoffset: circumference - filled }}
        viewport={{ once: true }}
        transition={{
          duration: reduce ? 0 : 1.6,
          delay: reduce ? 0 : 0.5,
          ease: [0.16, 1, 0.3, 1],
        }}
      />
    </svg>
  );
}

/* ========================================================================== */
/* RADAR — readiness by capability                                            */
/* ========================================================================== */

export function CapabilityRadar({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  // Five-point radar. Values are the plotted vertex distances from centre.
  const values = [0.82, 0.74, 0.62, 0.66, 0.7];
  const cx = 50;
  const cy = 50;
  const maxR = 34;

  const pointAt = (index: number, scale: number) => {
    // -90deg puts the first vertex at the top.
    const angle = (Math.PI * 2 * index) / values.length - Math.PI / 2;
    return [
      cx + Math.cos(angle) * maxR * scale,
      cy + Math.sin(angle) * maxR * scale,
    ] as const;
  };

  const gridRings = [0.35, 0.7, 1];
  const dataPoints = values.map((v, i) => pointAt(i, v));
  const dataPath = dataPoints.map((p) => p.join(",")).join(" ");

  return (
    <svg
      viewBox="0 0 100 100"
      className={cn("size-full", className)}
      aria-hidden="true"
    >
      {/* Concentric grid rings */}
      {gridRings.map((ring) => (
        <polygon
          key={ring}
          points={values.map((_, i) => pointAt(i, ring).join(",")).join(" ")}
          fill="none"
          stroke="var(--neutral-200)"
          strokeWidth="0.6"
        />
      ))}

      {/* Spokes */}
      {values.map((_, i) => {
        const [x, y] = pointAt(i, 1);
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={x}
            y2={y}
            stroke="var(--neutral-200)"
            strokeWidth="0.6"
          />
        );
      })}

      {/* Plotted area */}
      <motion.polygon
        points={dataPath}
        fill="var(--brand-500)"
        fillOpacity="0.18"
        stroke="var(--brand-600)"
        strokeWidth="1.4"
        strokeLinejoin="round"
        initial={{ scale: reduce ? 1 : 0.2, opacity: reduce ? 1 : 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        style={{ transformOrigin: "50% 50%" }}
        transition={{
          duration: reduce ? 0 : 0.9,
          delay: reduce ? 0 : 0.7,
          ease: [0.16, 1, 0.3, 1],
        }}
      />

      {/* Vertex dots */}
      {dataPoints.map(([x, y], i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={y}
          r="1.9"
          fill="var(--brand-600)"
          initial={{ opacity: reduce ? 1 : 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: reduce ? 0 : 1.2 + i * 0.06 }}
        />
      ))}
    </svg>
  );
}

/* ========================================================================== */
/* HEATMAP — role competency                                                  */
/* ========================================================================== */

/** Cell strength 0-3 maps to the legend: Gap → Strong. */
const heatmapFills = [
  "var(--accent-400)", // 0 — Gap (amber)
  "var(--brand-100)", // 1 — Developing
  "var(--brand-300)", // 2 — Moderate
  "var(--brand-500)", // 3 — Strong
];

export function CompetencyHeatmap({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const { rows } = dashboard.heatmap;

  return (
    <div
      className={cn("flex flex-col gap-[3px]", className)}
      aria-hidden="true"
    >
      {rows.map((row, rowIndex) => (
        <div key={row.label} className="grid grid-cols-6 gap-[3px]">
          {row.cells.map((cell, cellIndex) => (
            <motion.div
              key={cellIndex}
              className="h-[13px] rounded-[2px]"
              style={{ backgroundColor: heatmapFills[cell] }}
              initial={{ opacity: reduce ? 1 : 0, scale: reduce ? 1 : 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: reduce ? 0 : 0.35,
                // Diagonal wipe: cells further from the top-left start later.
                delay: reduce ? 0 : 0.8 + (rowIndex + cellIndex) * 0.035,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

/* ========================================================================== */
/* LINE — branch readiness trend (dark card)                                  */
/* ========================================================================== */

export function BranchTrendLine({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const { points } = dashboard.branchCard.chart;

  const w = 100;
  const h = 42;
  const coords = points.map((p, i) => {
    const x = (i / (points.length - 1)) * (w - 10) + 5;
    const y = h - p * h;
    return [x, y] as const;
  });
  const path = coords
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x},${y}`)
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className={cn("size-full overflow-visible", className)}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <motion.path
        d={path}
        fill="none"
        stroke="var(--accent-400)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: reduce ? 1 : 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: reduce ? 0 : 1.2,
          delay: reduce ? 0 : 0.9,
          ease: [0.16, 1, 0.3, 1],
        }}
      />
      {coords.map(([x, y], i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={y}
          r="3"
          fill="var(--accent-400)"
          vectorEffect="non-scaling-stroke"
          initial={{ opacity: reduce ? 1 : 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: reduce ? 0 : 1.1 + i * 0.25 }}
        />
      ))}
    </svg>
  );
}
