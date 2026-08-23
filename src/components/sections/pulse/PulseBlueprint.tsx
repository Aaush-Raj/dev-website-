"use client";

import { motion, useReducedMotion } from "motion/react";

import { pulse } from "@/content/pulse";
import { cn } from "@/lib/utils";

import { blueprintIcons } from "./PulseBlueprintIcons";

/**
 * PULSE BLUEPRINT
 * ---------------------------------------------------------------------------
 * The hub-and-spoke diagram in section 4: four facet cards around the role at
 * the centre, joined by connectors.
 *
 * WHY THE CARDS ARE HTML AND ONLY THE CONNECTORS ARE SVG
 * The cards hold real copy that has to stay on the page's type scale and wrap
 * like text — inside an SVG it would scale with the viewBox and drift. So the
 * cards are a CSS grid and the connectors are one SVG stretched behind them,
 * drawn in a percentage viewBox so its lines land on the grid's corners at any
 * width. `preserveAspectRatio="none"` lets that box distort with the grid,
 * which is exactly what we want for straight connectors.
 *
 * NOT ARIA-HIDDEN
 * Unlike the hero dashboard and the section 3 modal, this is not imitating a
 * screenshot — it is a genuine diagram, and its four facets are the substance
 * of the section. So it stays readable, and only the connectors are hidden as
 * decoration. It is also not wrapped in <Uncopyable>: this is real content,
 * not a fake product shot.
 *
 * ANIMATION
 * The connectors draw themselves outward from the hub, then the cards arrive
 * behind them. One observer drives the whole SVG via variants — many
 * independent `whileInView` observers on sibling SVG nodes race each other and
 * some lose.
 *
 * Below lg the spokes make no sense: the cards stack, so a radiating
 * connector would point at nothing. Both the connector layer and the hub are
 * dropped there, leaving a titled list — which is what the diagram degrades
 * to honestly.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { diagram } = pulse.blueprints;

/**
 * Where each connector starts and ends, in percentages of the diagram box.
 *
 * The hub sits at the centre (50, 50); each line runs from just outside its
 * edge to the inner corner of one card. Index order matches
 * `diagram.facets` — top-left, top-right, bottom-left, bottom-right.
 */
const connectors = [
  { x1: 43, y1: 43, x2: 30, y2: 33 },
  { x1: 57, y1: 43, x2: 70, y2: 33 },
  { x1: 43, y1: 57, x2: 30, y2: 67 },
  { x1: 57, y1: 57, x2: 70, y2: 67 },
] as const;

export function PulseBlueprint({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <div className={cn("relative", className)}>
      <motion.p
        initial={reduce ? "shown" : "hidden"}
        whileInView="shown"
        viewport={{ once: true, amount: "some" }}
        variants={{
          hidden: { opacity: 0, y: 12 },
          shown: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: easeOut },
          },
        }}
        className={cn(
          "text-center font-display text-lg font-bold",
          "tracking-[-0.01em] text-neutral-900 sm:text-xl",
        )}
      >
        {diagram.title}
      </motion.p>

      {/* ========================= Diagram body ======================= */}
      <div className="relative mt-8">
        {/* ------------------------ Connectors ------------------------ */}
        {/*
          One SVG behind the grid, in a 0..100 percentage box so its endpoints
          track the cards at any width. `preserveAspectRatio="none"` lets the
          box distort with the grid rather than staying square.
        */}
        <motion.svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 hidden size-full lg:block"
          initial={reduce ? "shown" : "hidden"}
          whileInView="shown"
          viewport={{ once: true, amount: "some" }}
        >
          {connectors.map((line, index) => (
            <motion.line
              key={index}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="currentColor"
              className="text-neutral-400"
              strokeWidth={0.35}
              // Drawn outward from the hub: the line is dashed to its own
              // length, then the offset is animated to zero.
              pathLength={1}
              strokeDasharray={1}
              variants={{
                hidden: { strokeDashoffset: 1 },
                shown: {
                  strokeDashoffset: 0,
                  transition: {
                    duration: 0.6,
                    delay: 0.35 + index * 0.1,
                    ease: easeOut,
                  },
                },
              }}
            />
          ))}
        </motion.svg>

        {/* --------------------------- Hub ---------------------------- */}
        {/*
          Absolutely centred on lg, where it is the middle of the spokes, and
          dropped entirely below that. In the stacked layouts there are no
          spokes for it to be the hub OF, and the diagram title one line above
          already names the role — a second "Credit Manager" heading there is
          just the same words twice.
        */}
        <motion.div
          initial={reduce ? "shown" : "hidden"}
          whileInView="shown"
          viewport={{ once: true, amount: "some" }}
          variants={{
            hidden: { opacity: 0, scale: 0.7 },
            shown: {
              opacity: 1,
              scale: 1,
              transition: { duration: 0.6, delay: 0.15, ease: easeOut },
            },
          }}
          className={cn(
            "absolute top-1/2 left-1/2 z-10 hidden",
            "size-36 -translate-x-1/2 -translate-y-1/2",
            "place-content-center rounded-full text-center",
            "border border-neutral-400 bg-white lg:grid",
          )}
        >
          {diagram.role.map((line) => (
            <span
              key={line}
              className="block font-semibold text-neutral-900 sm:text-[1.0625rem]"
            >
              {line}
            </span>
          ))}
        </motion.div>

        {/* ------------------------- Facets --------------------------- */}
        <ul
          className={cn(
            "grid gap-5",
            // Two columns on lg with a gap wide enough for the hub to sit in.
            "sm:grid-cols-2 lg:gap-x-52 lg:gap-y-24",
          )}
        >
          {diagram.facets.map((facet, index) => {
            const Icon = blueprintIcons[facet.icon];

            return (
              <motion.li
                key={facet.title}
                initial={reduce ? "shown" : "hidden"}
                whileInView="shown"
                viewport={{ once: true, amount: "some" }}
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  shown: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.55,
                      delay: 0.2 + index * 0.1,
                      ease: easeOut,
                    },
                  },
                }}
                className={cn(
                  "group rounded-xl border border-neutral-400/80 bg-white",
                  "px-5 py-5",
                  // `translate`, not `transform`: Tailwind v4 compiles the
                  // translate utilities to the standalone property.
                  "duration-normal transition-[border-color,box-shadow,translate] ease-out",
                  "will-change-[translate]",
                  "hover:-translate-y-1 hover:border-neutral-900",
                  "hover:shadow-[0_16px_36px_-20px_rgb(17_19_35/0.4)]",
                )}
              >
                <Icon
                  className={cn(
                    "size-6 text-neutral-800",
                    "duration-normal transition-colors ease-out",
                    "group-hover:text-brand-600",
                  )}
                />

                <p className="mt-4 font-semibold text-neutral-900">
                  {facet.title}
                </p>

                <ul className="mt-2.5 space-y-1.5">
                  {facet.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2 text-[0.875rem] text-neutral-600"
                    >
                      {/* The design's en-dash bullet. Decorative — a screen
                          reader would otherwise announce it before each
                          item. */}
                      <span aria-hidden="true" className="text-neutral-400">
                        –
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.li>
            );
          })}
        </ul>
      </div>

      {/* ========================== Footnote ========================== */}
      <motion.div
        initial={reduce ? "shown" : "hidden"}
        whileInView="shown"
        viewport={{ once: true, amount: "some" }}
        variants={{
          hidden: { opacity: 0 },
          shown: {
            opacity: 1,
            transition: { duration: 0.6, delay: 0.6, ease: easeOut },
          },
        }}
        className="mt-10 border-t border-neutral-400/70 pt-5"
      >
        <p className="text-center text-[0.9375rem] text-neutral-600">
          {diagram.footnote}
        </p>
      </motion.div>
    </div>
  );
}
