"use client";

import { motion, useReducedMotion } from "motion/react";

import { EngineCard, RoleCard } from "@/components/sections/model/ModelCards";
import { HierarchyIcon } from "@/components/sections/model/ModelIcons";
import { Container } from "@/components/ui/Container";
import { model } from "@/content/model";
import { cn } from "@/lib/utils";

/**
 * MODEL
 * ---------------------------------------------------------------------------
 * The capability model as a hub-and-spoke diagram: the role card at the
 * centre, four engine cards around it, arrows showing that every engine both
 * reads from and writes back to the same standard.
 *
 * LAYOUT
 * On xl the diagram is a 3-column grid — engines left and right, hub in the
 * middle spanning both rows — which reproduces the design without absolute
 * positioning, so every card sizes to its own content.
 *
 * Below xl the hub moves to the top and the engines fall into a 1- or
 * 2-column grid beneath it. The arrows are hidden there: they only make sense
 * against the cross layout, and a diagram of arrows pointing nowhere is worse
 * than none.
 *
 * The whole diagram is decorative — the heading and body copy carry the
 * meaning — so it is aria-hidden.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

export function Model() {
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: {
      duration: reduce ? 0 : 0.6,
      delay: reduce ? 0 : delay,
      ease: easeOut,
    },
  });

  const [topLeft, topRight, bottomLeft, bottomRight] = model.engines;

  return (
    <section id="model" className="bg-surface-subtle py-section-lg">
      <Container width="hero">
        <div className="grid gap-12 xl:grid-cols-[minmax(0,0.62fr)_minmax(0,1.38fr)] xl:gap-10">
          {/* ============================ Statement =================== */}
          <div className="xl:pt-4">
            <motion.p
              {...rise(0)}
              className={cn(
                "font-mono text-[0.625rem] font-semibold uppercase",
                "tracking-[0.16em] text-brand-700 sm:text-[0.6875rem]",
              )}
            >
              {model.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.08)}
              className={cn(
                "mt-6 font-display font-extrabold tracking-[-0.03em]",
                "leading-[1.02] text-neutral-900",
                // Measured from the design at ~51px on a 1440 frame.
                "text-[2.125rem] sm:text-[2.625rem] xl:text-[3.1875rem]",
              )}
            >
              {/* Lines break where the design breaks them on xl+, and wrap
                  naturally below that. */}
              {model.headline.map((line) => (
                <span key={line} className="inline xl:block">
                  {line}{" "}
                </span>
              ))}
              <span className="relative inline-block">
                {/* Amber rule under the closing phrase, as in the hero. */}
                <motion.span
                  aria-hidden="true"
                  className={cn(
                    // NOTE: no negative z-index here. `-z-10` would push the
                    // rule behind the section's opaque background rather than
                    // behind the glyphs, because this span's ancestors do not
                    // establish a stacking context. Painting it first in DOM
                    // order and leaving the text after it achieves the same
                    // layering without leaving the parent's paint layer.
                    "absolute bottom-[0.08em] left-0 h-[0.2em] w-full",
                    "origin-left rounded-[1px] bg-accent-300",
                  )}
                  initial={{ scaleX: reduce ? 1 : 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: reduce ? 0 : 0.8,
                    delay: reduce ? 0 : 0.45,
                    ease: easeOut,
                  }}
                />
                {model.underlined}
              </span>
            </motion.h2>

            <motion.p
              {...rise(0.18)}
              className="mt-7 max-w-[26rem] leading-relaxed text-pretty text-neutral-600"
            >
              {model.description}
            </motion.p>
          </div>

          {/* ============================= Diagram ==================== */}
          <div aria-hidden="true" className="relative">
            {/* Arrows, behind the cards. Only meaningful on the xl cross. */}
            <ArrowLayer className="pointer-events-none absolute inset-0 hidden xl:block" />

            <div
              className={cn(
                "relative grid gap-4",
                "sm:grid-cols-2",
                // xl: engines left/right, hub centred across both rows.
                // Design measures the hub at 320px against 213px engines — 1.5x.
                "xl:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)_minmax(0,1fr)]",
                "xl:items-center xl:gap-x-14",
              )}
            >
              {/* Hub. Rendered first so it leads on small screens; placed
                  into the middle column on xl. */}
              <motion.div
                {...rise(0.1)}
                className="order-first xl:order-none xl:col-start-2 xl:row-span-2 xl:row-start-1"
              >
                <RoleCard />
              </motion.div>

              <motion.div
                {...rise(0.18)}
                className="xl:col-start-1 xl:row-start-1"
              >
                <EngineCard engine={topLeft} />
              </motion.div>

              <motion.div
                {...rise(0.26)}
                className="xl:col-start-3 xl:row-start-1"
              >
                <EngineCard engine={topRight} />
              </motion.div>

              <motion.div
                {...rise(0.34)}
                className="xl:col-start-1 xl:row-start-2"
              >
                <EngineCard engine={bottomLeft} />
              </motion.div>

              <motion.div
                {...rise(0.42)}
                className="xl:col-start-3 xl:row-start-2"
              >
                <EngineCard engine={bottomRight} />
              </motion.div>
            </div>

            {/* ------------------------- Footer bar ------------------- */}
            <motion.div
              {...rise(0.5)}
              className={cn(
                "mt-4 flex items-center gap-4 rounded-2xl border border-neutral-200/70",
                "bg-white px-5 py-4",
                "shadow-[0_10px_30px_-14px_rgb(17_19_35/0.12)]",
                "xl:mx-auto xl:mt-6 xl:max-w-[32rem]",
              )}
            >
              <span className="shrink-0 text-brand-500">
                <HierarchyIcon className="size-8" />
              </span>
              <div className="min-w-0">
                <p className="text-[0.9375rem] font-semibold text-neutral-900">
                  {model.footer.title}
                </p>
                <p className="mt-0.5 text-[0.8125rem] text-pretty text-neutral-600">
                  {model.footer.description}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ========================================================================== */
/* Connecting arrows                                                          */
/* ========================================================================== */

/**
 * The four arrows joining the hub to its engines.
 *
 * Positioned in percentage space rather than one stretched SVG: the diagram's
 * aspect ratio changes with the cards' own heights, so a fixed viewBox drifts
 * out of alignment. Each arrow occupies the gutter between the hub column and
 * one engine column.
 */
function ArrowLayer({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  /*
   * Positions measured from the rendered grid: the gutters sit at ~25-30%
   * and ~70-75% of the diagram's width, and each arrow is centred on its
   * engine card's vertical midpoint.
   *
   * Heads point OUTWARD from the hub on the right and INWARD on the left,
   * which is the design's reading: the role standard feeds the engines, and
   * the engines feed evidence back.
   */
  const arrows = [
    { left: "24%", top: "20%", width: "9%", dir: "left" },
    { left: "67%", top: "20%", width: "9%", dir: "right" },
    { left: "24%", top: "65%", width: "9%", dir: "left" },
    { left: "67%", top: "65%", width: "9%", dir: "right" },
  ] as const;

  return (
    <div className={className}>
      {arrows.map((arrow, index) => (
        <motion.span
          key={`${arrow.left}-${arrow.top}`}
          className="absolute block h-4"
          style={{ left: arrow.left, top: arrow.top, width: arrow.width }}
          initial={{ opacity: reduce ? 1 : 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            duration: reduce ? 0 : 0.5,
            delay: reduce ? 0 : 0.55 + index * 0.1,
            ease: easeOut,
          }}
        >
          <svg
            viewBox="0 0 100 16"
            preserveAspectRatio="none"
            className="size-full overflow-visible"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M 4 8 H 96"
              stroke="var(--brand-500)"
              strokeWidth="1.6"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
            {/* Head. Drawn as a filled triangle so the non-uniform stretch
                of preserveAspectRatio="none" cannot distort a stroke. */}
            <polygon
              points={
                arrow.dir === "left"
                  ? "4,8 12,3.5 12,12.5"
                  : "96,8 88,3.5 88,12.5"
              }
              fill="var(--brand-500)"
            />
          </svg>
        </motion.span>
      ))}
    </div>
  );
}
