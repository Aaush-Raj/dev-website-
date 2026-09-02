"use client";

import { motion, useReducedMotion } from "motion/react";

import { campus } from "@/content/campus";
import { cn } from "@/lib/utils";

/**
 * THE ARTEFACT PREVIEW
 * ---------------------------------------------------------------------------
 * The "Expense Variance Dashboard" panel inside the project card: paired bars,
 * a donut and a small variance table.
 *
 * In the design this is a 280px screenshot whose numbers are illegible grey
 * smudges — placeholder texture standing in for a real dashboard. Drawn here
 * instead, from the figures in content/campus.ts, so it renders as an actual
 * chart at any size. It stays DECORATIVE all the same: it is a thumbnail of a
 * student's work, not data the reader is meant to interpret, so the whole panel
 * is hidden from assistive tech rather than announcing forty numbers.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { artefact } = campus.doing.project;

/* The donut, drawn as a dasharray arc — same technique as the readiness dials. */
const R = 26;
const C = 2 * Math.PI * R;

export function CampusArtefact() {
  const reduce = useReducedMotion();
  const slice = C * artefact.donut;

  return (
    <div
      aria-hidden="true"
      className={cn(
        "rounded-xl border border-[#e8e5e0] bg-white p-3.5",
        "shadow-[0_10px_30px_-18px_rgb(11_47_51/0.4)]",
      )}
    >
      <p className="text-[0.5625rem] font-bold tracking-[0.12em] text-[#7c8a8e] uppercase">
        {artefact.eyebrow}
      </p>

      <p className="mt-2 text-[0.8125rem] font-bold text-[#0b2f33]">
        {artefact.title}
      </p>

      {/* ===================== Bars and donut ======================== */}
      <div className="mt-3 grid grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] items-center gap-3">
        {/* The paired bar chart. */}
        <div className="flex h-19 items-end gap-1.5 border-b border-l border-[#e4e1dc] pb-1 pl-1.5">
          {artefact.bars.map((bar, index) => (
            <div key={index} className="flex h-full flex-1 items-end gap-[2px]">
              {/* Actual, then budget — the design pairs them per period. */}
              {([bar.actual, bar.budget] as const).map((value, which) => (
                <motion.span
                  key={which}
                  className={cn(
                    "block w-full rounded-t-[1px]",
                    which === 0 ? "bg-[#0d5451]" : "bg-[#8fc0b8]",
                  )}
                  style={{
                    height: `${value * 100}%`,
                    transformOrigin: "bottom",
                  }}
                  initial={reduce ? "shown" : "hidden"}
                  whileInView="shown"
                  viewport={{ once: true, amount: "some" }}
                  variants={{
                    hidden: { scaleY: 0 },
                    shown: {
                      scaleY: 1,
                      transition: {
                        duration: 0.55,
                        delay: 0.5 + index * 0.05 + which * 0.02,
                        ease: easeOut,
                      },
                    },
                  }}
                />
              ))}
            </div>
          ))}
        </div>

        {/* The donut. One coral slice against a teal ring — the overspend. */}
        <div className="grid place-items-center">
          <svg viewBox="0 0 64 64" className="size-16">
            <circle
              cx="32"
              cy="32"
              r={R}
              fill="none"
              stroke="#0d5451"
              strokeWidth="10"
            />
            <motion.circle
              cx="32"
              cy="32"
              r={R}
              fill="none"
              stroke="#ef4b2f"
              strokeWidth="10"
              transform="rotate(-90 32 32)"
              strokeDasharray={`${slice} ${C}`}
              initial={reduce ? "shown" : "hidden"}
              whileInView="shown"
              viewport={{ once: true, amount: "some" }}
              variants={{
                hidden: { strokeDashoffset: slice },
                shown: {
                  strokeDashoffset: 0,
                  transition: { duration: 0.9, delay: 0.8, ease: easeOut },
                },
              }}
            />
          </svg>
        </div>
      </div>

      {/* ======================== The table ========================== */}
      <table className="mt-3 w-full border-collapse text-[0.5625rem]">
        <thead>
          <tr className="text-[#96a2a5]">
            <th className="py-1 text-left font-medium">Function</th>
            <th className="py-1 text-right font-medium">Budget</th>
            <th className="py-1 text-right font-medium">Actual</th>
            <th className="py-1 text-right font-medium">Var</th>
          </tr>
        </thead>
        <tbody>
          {artefact.rows.map((row) => {
            const over = row.variance.startsWith("+");

            return (
              <tr key={row.label} className="border-t border-[#f0eeea]">
                <td className="py-1 text-left text-[#4d6266]">{row.label}</td>
                <td className="py-1 text-right text-[#4d6266]">{row.budget}</td>
                <td className="py-1 text-right text-[#4d6266]">{row.actual}</td>
                {/* Overspend reads coral, underspend teal — the same pairing
                    the bars and donut use. */}
                <td
                  className={cn(
                    "py-1 text-right font-semibold",
                    over ? "text-[#ef4b2f]" : "text-[#0d5451]",
                  )}
                >
                  {row.variance}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
