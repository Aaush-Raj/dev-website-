"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { Uncopyable } from "@/components/ui/Uncopyable";
import { biz } from "@/content/biz";
import { cn } from "@/lib/utils";

import { bizIntegrationIcons } from "./BizIcons";

/**
 * BIZ INTEGRATION
 * ---------------------------------------------------------------------------
 * Section 3 of the LurnyBiz page: copy and three points on the left, a flow
 * diagram on the right — four source systems into the LurnyBiz context layer,
 * and out to three outputs.
 *
 * THE DIAGRAM IS DRAWN, not the flat PNG supplied with the design. That
 * export bakes every label into pixels — a picture of text, which cannot
 * re-flow, is invisible to search, and turns soft the moment it is scaled.
 * Sections 1 makes the same choice for its panels.
 *
 * THE CONNECTORS
 * Drawn in CSS rather than SVG — see the note on `routes` for the two SVG
 * approaches that failed first. Each route is a set of positioned rules whose
 * ends are percentages of the diagram box, so they track their cards at any
 * width with no coordinate space to distort.
 *
 * Only on xl, where the three columns actually sit side by side. Below that
 * they stack and a horizontal connector would point at nothing, so the layer
 * is dropped and the diagram degrades to three labelled groups — which is
 * what it honestly is at that width.
 */

const { integration } = biz;

/** Motion's string easings are not typed, so the cubic curve is spelled out. */
const easeOut = [0.16, 1, 0.3, 1] as const;

/**
 * The three signal colours, sampled from the design's own artwork.
 *
 * A `tone` keys both a card's icon and the connector that leaves it, so a
 * route through the diagram is traceable by colour.
 */
const tones = {
  amber: { text: "text-[#ffb625]", stroke: "#ffb625" },
  violet: { text: "text-[#9e70db]", stroke: "#9e70db" },
  green: { text: "text-[#7bbd52]", stroke: "#619e41" },
} as const;

/** Shared chrome for every card in the diagram. */
const cardChrome = cn(
  "rounded-xl bg-[#080d16] ring-1 ring-white/10",
  // `translate`, not `transform`: Tailwind v4 compiles the translate
  // utilities to the standalone property.
  "duration-normal transition-[box-shadow,translate,--tw-ring-color] ease-out",
  "will-change-[translate]",
  "hover:-translate-y-0.5 hover:ring-white/25",
  "hover:shadow-[0_14px_30px_-16px_rgb(0_0_0/0.9)]",
);

/**
 * Connector geometry.
 *
 * DRAWN IN CSS, not SVG. Two earlier attempts used an SVG layer: first a
 * square viewBox stretched with `preserveAspectRatio="none"`, whose distorted
 * coordinate space rendered the marker arrowheads as huge skewed triangles;
 * then a true-aspect viewBox, whose fixed proportions no longer matched the
 * box the diagram actually occupies, so the vertical runs collapsed to stubs.
 *
 * An elbow is two rules and an arrowhead — a horizontal leg out of the source,
 * a vertical leg, and a horizontal leg into the target. Positioned as
 * percentages of the diagram box, each leg tracks its cards at any width with
 * no coordinate space to distort. That is what the LurnyMagic page's connector
 * ended up doing too, for the same reason.
 *
 * `from` and `to` are the vertical centres of the two cards being joined, as
 * percentages of the box; `x1`/`x2` are the horizontal edges the route runs
 * between, and `mid` is where it turns.
 */
interface Route {
  from: number;
  to: number;
  x1: number;
  x2: number;
  mid: number;
  tone: keyof typeof tones;
}

/** The four sources feed the hub; the hub feeds the three outputs. */
const routes: Route[] = [
  { from: 13, to: 42, x1: 30, x2: 38, mid: 34, tone: "amber" },
  { from: 37, to: 46, x1: 30, x2: 38, mid: 34, tone: "violet" },
  { from: 61, to: 52, x1: 30, x2: 38, mid: 34, tone: "amber" },
  { from: 85, to: 57, x1: 30, x2: 38, mid: 34, tone: "green" },

  { from: 42, to: 19, x1: 68, x2: 76, mid: 72, tone: "amber" },
  { from: 50, to: 48, x1: 68, x2: 76, mid: 72, tone: "violet" },
  { from: 58, to: 77, x1: 68, x2: 76, mid: 72, tone: "green" },
];

/**
 * One elbow, drawn as three positioned rules plus an arrowhead.
 *
 * Each leg is a 1px-thick absolutely-positioned span, so the stroke weight is
 * even everywhere regardless of the box's proportions.
 */
function Connector({ route, delay }: { route: Route; delay: number }) {
  const reduce = useReducedMotion();
  const tone = tones[route.tone];
  const top = Math.min(route.from, route.to);
  const height = Math.abs(route.to - route.from);

  return (
    <motion.span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      /*
        A fade, not a draw-on. A dash-based sweep is what fragmented the
        hero's sparkline, and these legs are short enough that drawing them
        would read as a flicker rather than a trace.
      */
      initial={reduce ? { opacity: 1 } : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: "some" }}
      transition={{ duration: 0.45, delay: reduce ? 0 : delay, ease: easeOut }}
    >
      {/* Leg out of the source. */}
      <span
        className="absolute h-px"
        style={{
          left: `${route.x1}%`,
          width: `${route.mid - route.x1}%`,
          top: `${route.from}%`,
          backgroundColor: tone.stroke,
        }}
      />

      {/* The vertical run. */}
      <span
        className="absolute w-px"
        style={{
          left: `${route.mid}%`,
          top: `${top}%`,
          height: `${height}%`,
          backgroundColor: tone.stroke,
        }}
      />

      {/* Leg into the target. */}
      <span
        className="absolute h-px"
        style={{
          left: `${route.mid}%`,
          width: `${route.x2 - route.mid}%`,
          top: `${route.to}%`,
          backgroundColor: tone.stroke,
        }}
      />

      {/* The arrowhead, a small rotated chevron at the target end. */}
      <span
        className="absolute size-1.5 -translate-x-1/2 -translate-y-1/2 rotate-45"
        style={{
          left: `${route.x2}%`,
          top: `${route.to}%`,
          borderTop: `1px solid ${tone.stroke}`,
          borderRight: `1px solid ${tone.stroke}`,
        }}
      />
    </motion.span>
  );
}

export function BizIntegration() {
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

  /** Shared entrance for a diagram card. */
  const card = (delay: number, from: number) => ({
    initial: reduce ? "shown" : "hidden",
    whileInView: "shown",
    viewport: { once: true, amount: "some" } as const,
    variants: {
      hidden: { opacity: 0, x: from },
      shown: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, delay, ease: easeOut },
      },
    },
  });

  return (
    <section className="relative isolate overflow-hidden bg-[#00030c] py-section-lg text-white">
      {/* ===================== Background layers ====================== */}
      <Image
        src="/assets/images/biz/integration-bg.webp"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="pointer-events-none -z-10 object-cover object-center select-none"
      />

      <Container width="hero" className="relative">
        <div
          className={cn(
            "grid items-center gap-14",
            "lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-10",
            "xl:gap-14",
          )}
        >
          {/* ============================ Copy ======================== */}
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "text-[0.6875rem] font-bold tracking-[0.16em] uppercase",
                "text-[#e1b462] sm:text-xs",
              )}
            >
              {integration.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.08)}
              className={cn(
                "mt-6 font-display font-bold tracking-[-0.03em]",
                "leading-[1.1] text-balance",
                // Measured from the design at ~52px on a 1440 frame.
                "text-[1.875rem] sm:text-[2.375rem] xl:text-[3rem]",
              )}
            >
              {integration.headline.map((line) => (
                <span key={line} className="inline lg:block">
                  {line}{" "}
                </span>
              ))}
            </motion.h2>

            <motion.p
              {...rise(0.16)}
              className={cn(
                "mt-6 max-w-[30rem] leading-relaxed text-pretty",
                "text-[0.9375rem] text-neutral-400 sm:text-base",
              )}
            >
              {integration.description}
            </motion.p>

            {/* -------------------------- Points --------------------- */}
            <ul className="mt-10 space-y-6">
              {integration.points.map((point, index) => {
                const Icon = bizIntegrationIcons[point.icon];
                const tone = tones[point.tone];

                return (
                  <motion.li
                    key={point.label}
                    {...rise(0.24 + index * 0.08)}
                    className="group flex items-center gap-5"
                  >
                    <span
                      className={cn(
                        "grid size-11 shrink-0 place-items-center rounded-full",
                        "ring-1 ring-current/35",
                        tone.text,
                        // `scale`, not `transform` — see the note above.
                        "duration-normal transition-[scale] ease-out",
                        "group-hover:scale-110",
                      )}
                    >
                      <Icon className="size-5" />
                    </span>

                    {/* The vertical rule the design sets between the icon
                        and its label. */}
                    <span
                      aria-hidden="true"
                      className="h-8 w-px shrink-0 bg-white/15"
                    />

                    <span className="text-[0.9375rem] text-neutral-200 sm:text-base">
                      {point.label}
                    </span>
                  </motion.li>
                );
              })}
            </ul>
          </div>

          {/* ========================== Diagram ======================= */}
          {/*
            The DIAGRAM is Uncopyable and aria-hidden — it imitates product
            UI. The footnote beneath it is real page copy, so it sits OUTSIDE
            that wrapper and stays readable to assistive technology.
          */}
          <div>
            <Uncopyable>
              <div
                className={cn(
                  "relative grid items-center gap-6",
                  // Three columns on xl: sources, hub, outputs. The gaps are
                  // wide on purpose — they are the only space the connectors
                  // have to route through.
                  "xl:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)_minmax(0,0.78fr)]",
                  "xl:gap-x-8",
                )}
              >
                {/* --------------------- Connectors ------------------ */}
                {/* --------------------- Connectors ------------------ */}
                {/* xl only: below that the columns stack and a horizontal
                    route would point at nothing. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -z-0 hidden xl:block"
                >
                  {routes.map((route, index) => (
                    <Connector
                      key={`${route.x1}-${route.from}-${route.to}`}
                      route={route}
                      delay={0.4 + index * 0.07}
                    />
                  ))}
                </span>

                {/* ---------------------- Sources -------------------- */}
                <ul className="relative space-y-3">
                  {integration.sources.map((source, index) => {
                    const Icon = bizIntegrationIcons[source.icon];

                    return (
                      <motion.li
                        key={source.title}
                        {...card(0.1 + index * 0.07, -18)}
                        className={cn(
                          cardChrome,
                          "group flex items-center gap-3.5 p-3.5",
                        )}
                      >
                        <Icon
                          className={cn(
                            "size-6 shrink-0",
                            tones[source.tone].text,
                            "duration-normal transition-[scale] ease-out",
                            "group-hover:scale-110",
                          )}
                        />
                        <span className="min-w-0">
                          <span className="block text-[0.875rem] font-semibold">
                            {source.title}
                          </span>
                          <span className="mt-0.5 block text-[0.75rem] text-neutral-500">
                            {source.meta}
                          </span>
                        </span>
                      </motion.li>
                    );
                  })}
                </ul>

                {/* ------------------------ Hub ---------------------- */}
                <motion.div
                  initial={reduce ? "shown" : "hidden"}
                  whileInView="shown"
                  viewport={{ once: true, amount: "some" }}
                  variants={{
                    hidden: { opacity: 0, scale: 0.96 },
                    shown: {
                      opacity: 1,
                      scale: 1,
                      transition: { duration: 0.7, delay: 0.3, ease: easeOut },
                    },
                  }}
                  className={cn(
                    "group relative rounded-2xl bg-[#080d16]/95 p-5",
                    "ring-1 ring-white/12",
                    "shadow-[0_20px_50px_-24px_rgb(0_0_0/0.9)]",
                    "duration-normal transition-[box-shadow,--tw-ring-color] ease-out",
                    "hover:ring-[#ffb625]/30",
                    "hover:shadow-[0_24px_54px_-24px_rgb(255_182_37/0.22)]",
                  )}
                >
                  <p className="text-center text-[1.25rem] font-bold sm:text-[1.375rem]">
                    {integration.hub.title}
                  </p>
                  <p
                    className={cn(
                      "mt-1.5 text-center text-[0.625rem] font-bold",
                      "tracking-[0.14em] text-[#e1b462] uppercase",
                    )}
                  >
                    {integration.hub.subtitle}
                  </p>

                  <ul className="mt-5 space-y-2.5">
                    {integration.hub.rows.map((row) => {
                      const Icon = bizIntegrationIcons[row.icon];

                      return (
                        <li
                          key={row.label}
                          className={cn(
                            "flex items-center gap-3 rounded-lg p-3",
                            "bg-white/3 ring-1 ring-white/8",
                            "duration-normal transition-colors ease-out",
                            "group-hover:bg-white/6",
                          )}
                        >
                          <Icon
                            className={cn(
                              "size-5 shrink-0",
                              tones[row.tone].text,
                            )}
                          />
                          <span className="text-[0.8125rem] text-neutral-200">
                            {row.label}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </motion.div>

                {/* ---------------------- Outputs -------------------- */}
                <ul className="relative space-y-5">
                  {integration.outputs.map((output, index) => {
                    const Icon = bizIntegrationIcons[output.icon];

                    return (
                      <motion.li
                        key={output.label}
                        {...card(0.5 + index * 0.09, 18)}
                        className={cn(
                          cardChrome,
                          "group flex items-center gap-3.5 p-4",
                        )}
                      >
                        <Icon
                          className={cn(
                            "size-6 shrink-0",
                            tones[output.tone].text,
                            "duration-normal transition-[scale] ease-out",
                            "group-hover:scale-110",
                          )}
                        />
                        <span className="text-[0.875rem] font-medium">
                          {output.label}
                        </span>
                      </motion.li>
                    );
                  })}
                </ul>
              </div>
            </Uncopyable>

            <motion.p
              {...rise(0.6)}
              className={cn(
                "mt-10 border-t border-white/10 pt-7",
                "text-center text-[0.875rem] text-neutral-400 sm:text-[0.9375rem]",
              )}
            >
              {integration.footnote}
            </motion.p>
          </div>
        </div>
      </Container>
    </section>
  );
}
