"use client";

import { motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

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

/** Measured positions of the diagram's cards, in the wrapper's coordinates. */
interface DiagramGeometry {
  width: number;
  height: number;
  hub: { cx: number; top: number; bottom: number; w: number };
  engines: Record<
    "tl" | "tr" | "bl" | "br",
    { left: number; right: number; cy: number }
  >;
}

/**
 * Measures the diagram's cards so the connectors can be drawn between their
 * real edges.
 *
 * The alternative — hard-coded percentages — breaks whenever a card's height
 * changes, which it does with viewport width, font scaling and content edits.
 * Two earlier passes on this section drifted out of alignment for exactly
 * that reason, so the positions are read from the DOM instead.
 *
 * Re-measures on resize via ResizeObserver. Returns null until the first
 * measurement lands, and the arrow layer renders nothing in that state.
 */
function useDiagramGeometry(enabled: boolean) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [geometry, setGeometry] = useState<DiagramGeometry | null>(null);

  const measure = useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap || !enabled) {
      setGeometry(null);
      return;
    }

    const grid = wrap.querySelector("[data-diagram-grid]");
    if (!grid) return;

    const cells = [...grid.children];
    if (cells.length < 5) return;

    const wrapBox = wrap.getBoundingClientRect();
    const box = (element: Element) => {
      const rect = element.getBoundingClientRect();
      return {
        left: rect.left - wrapBox.left,
        right: rect.right - wrapBox.left,
        top: rect.top - wrapBox.top,
        bottom: rect.bottom - wrapBox.top,
        cx: rect.left - wrapBox.left + rect.width / 2,
        cy: rect.top - wrapBox.top + rect.height / 2,
        w: rect.width,
      };
    };

    // DOM order: hub, top-left, top-right, bottom-left, bottom-right.
    const [hub, tl, tr, bl, br] = cells.map(box);

    setGeometry({
      width: wrapBox.width,
      height: wrapBox.height,
      hub: { cx: hub.cx, top: hub.top, bottom: hub.bottom, w: hub.w },
      engines: {
        tl: { left: tl.left, right: tl.right, cy: tl.cy },
        tr: { left: tr.left, right: tr.right, cy: tr.cy },
        bl: { left: bl.left, right: bl.right, cy: bl.cy },
        br: { left: br.left, right: br.right, cy: br.cy },
      },
    });
  }, [enabled]);

  useEffect(() => {
    measure();
    const wrap = wrapRef.current;
    if (!wrap) return;

    const observer = new ResizeObserver(measure);
    observer.observe(wrap);
    // Card heights change independently of the wrapper, so watch them too.
    wrap.querySelectorAll("[data-diagram-grid] > *").forEach((cell) => {
      observer.observe(cell);
    });

    return () => observer.disconnect();
  }, [measure]);

  return { wrapRef, geometry };
}

export function Model() {
  const reduce = useReducedMotion();

  /**
   * The elbow connectors only exist on the xl cross layout, so geometry is
   * measured only there. `isWide` gates it; below xl the cards stack and the
   * arrows would have nothing sensible to join.
   */
  const [isWide, setIsWide] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1280px)");
    const sync = () => setIsWide(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  const { wrapRef, geometry } = useDiagramGeometry(isWide);

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
        <div className="grid gap-12 xl:grid-cols-[minmax(0,0.56fr)_minmax(0,1.44fr)] xl:gap-8">
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
                // Design: ~51px on a ~49px line box — leading below 1.
                "leading-[0.96] text-neutral-900",
                // Measured from the design at ~51px on a 1440 frame.
                "text-[1.875rem] sm:text-[2.375rem] xl:text-[2.875rem]",
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
          <div aria-hidden="true" className="relative" ref={wrapRef}>
            {/* Elbow connectors, behind the cards. Drawn from measured card
                edges, so they stay attached as card heights change. */}
            <ArrowLayer
              className="pointer-events-none absolute inset-0 hidden xl:block"
              geometry={geometry}
            />

            <div
              data-diagram-grid
              className={cn(
                "relative grid gap-4",
                "sm:grid-cols-2",
                // xl: engines left/right, hub centred across both rows.
                // Design measures the hub at 320px against 213px engines — 1.5x.
                // Rendered slightly under that, which lands the hub on the
                // design's 0.845 width:height rather than overshooting it.
                "xl:grid-cols-[minmax(0,1fr)_minmax(0,1.38fr)_minmax(0,1fr)]",
                // The hub is centred; the engine rows are pinned to the top and
                // bottom of the track. That leaves clear vertical space between
                // the hub's edges and each engine's centre line, which is the
                // room the elbow connectors turn through.
                "xl:items-stretch xl:gap-x-11 xl:gap-y-32",
              )}
            >
              {/* Hub. Rendered first so it leads on small screens; placed
                  into the middle column on xl. */}
              <motion.div
                {...rise(0.1)}
                className="order-first xl:order-none xl:col-start-2 xl:row-span-2 xl:row-start-1 xl:self-center"
              >
                <RoleCard />
              </motion.div>

              <motion.div
                {...rise(0.18)}
                className="xl:col-start-1 xl:row-start-1 xl:self-start"
              >
                <EngineCard engine={topLeft} />
              </motion.div>

              <motion.div
                {...rise(0.26)}
                className="xl:col-start-3 xl:row-start-1 xl:self-start"
              >
                <EngineCard engine={topRight} />
              </motion.div>

              <motion.div
                {...rise(0.34)}
                className="xl:col-start-1 xl:row-start-2 xl:self-end"
              >
                <EngineCard engine={bottomLeft} />
              </motion.div>

              <motion.div
                {...rise(0.42)}
                className="xl:col-start-3 xl:row-start-2 xl:self-end"
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
 * Elbow connectors between the hub and its four engines, matching the design.
 *
 * Each path leaves one card, runs straight, turns through a rounded corner,
 * and ends in an arrowhead — rather than a plain horizontal rule. The
 * direction encodes the loop the copy describes:
 *
 *   TOP     hub -> up -> turn outward -> arrowhead at the engine
 *           (the role standard feeds assessment and learning)
 *   BOTTOM  engine -> inward -> turn up -> arrowhead at the hub
 *           (evidence and signals feed back into the standard)
 *
 * Drawn in one SVG that overlays the whole diagram. Unlike the earlier
 * per-gutter spans this needs a shared coordinate space, because a single
 * path spans from the hub's edge across a gutter to an engine card. The
 * viewBox is therefore sized to the diagram box at run time and the geometry
 * is expressed in percentages of it, so it tracks any card height.
 */
function ArrowLayer({
  className,
  geometry,
}: {
  className?: string;
  geometry: DiagramGeometry | null;
}) {
  const reduce = useReducedMotion();

  if (!geometry) return null;

  const { width: W, height: H, hub, engines } = geometry;
  const R = 14; // corner radius

  /**
   * Build one elbow path.
   *
   * `fromX/fromY` is the start (on the hub or engine edge), `toX/toY` the
   * arrow tip. The corner sits at (fromX, toY) for top arrows — vertical
   * first — and at (toX, fromY) for bottom arrows, which run horizontally
   * first and then turn up.
   */
  const topPath = (fromX: number, fromY: number, toX: number, toY: number) => {
    const dir = toX > fromX ? 1 : -1;
    return [
      `M ${fromX} ${fromY}`,
      `L ${fromX} ${toY + R}`,
      `Q ${fromX} ${toY} ${fromX + dir * R} ${toY}`,
      `L ${toX} ${toY}`,
    ].join(" ");
  };

  const bottomPath = (
    fromX: number,
    fromY: number,
    toX: number,
    toY: number,
  ) => {
    const dir = toX > fromX ? 1 : -1;
    return [
      `M ${fromX} ${fromY}`,
      `L ${toX - dir * R} ${fromY}`,
      `Q ${toX} ${fromY} ${toX} ${fromY - R}`,
      `L ${toX} ${toY}`,
    ].join(" ");
  };

  const arrows = [
    // Top-left: up from the hub, turn left, point at LurnyPulse.
    {
      d: topPath(
        hub.cx - hub.w * 0.22,
        hub.top,
        engines.tl.right + 6,
        engines.tl.cy,
      ),
      head: { x: engines.tl.right + 6, y: engines.tl.cy, dir: "left" },
    },
    // Top-right: up from the hub, turn right, point at LurnyMagic.
    {
      d: topPath(
        hub.cx + hub.w * 0.22,
        hub.top,
        engines.tr.left - 6,
        engines.tr.cy,
      ),
      head: { x: engines.tr.left - 6, y: engines.tr.cy, dir: "right" },
    },
    // Bottom-left: in from LurnyPitch, turn up, point at the hub.
    {
      d: bottomPath(
        engines.bl.right + 6,
        engines.bl.cy,
        hub.cx - hub.w * 0.22,
        hub.bottom,
      ),
      head: { x: hub.cx - hub.w * 0.22, y: hub.bottom, dir: "up" },
    },
    // Bottom-right: in from LurnySense, turn up, point at the hub.
    {
      d: bottomPath(
        engines.br.left - 6,
        engines.br.cy,
        hub.cx + hub.w * 0.22,
        hub.bottom,
      ),
      head: { x: hub.cx + hub.w * 0.22, y: hub.bottom, dir: "up" },
    },
  ];

  /** Arrowhead as an open V, matching the design's line-drawn heads. */
  const headPath = (x: number, y: number, dir: string) => {
    const a = 7;
    if (dir === "left")
      return `M ${x + a} ${y - a} L ${x} ${y} L ${x + a} ${y + a}`;
    if (dir === "right")
      return `M ${x - a} ${y - a} L ${x} ${y} L ${x - a} ${y + a}`;
    return `M ${x - a} ${y + a} L ${x} ${y} L ${x + a} ${y + a}`;
  };

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={className}
      aria-hidden="true"
      fill="none"
    >
      {arrows.map((arrow, index) => (
        <motion.g
          key={arrow.d}
          initial={{ opacity: reduce ? 1 : 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            duration: reduce ? 0 : 0.5,
            delay: reduce ? 0 : 0.5 + index * 0.1,
            ease: easeOut,
          }}
        >
          <motion.path
            d={arrow.d}
            stroke="var(--brand-500)"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: reduce ? 1 : 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: reduce ? 0 : 0.8,
              delay: reduce ? 0 : 0.5 + index * 0.1,
              ease: easeOut,
            }}
          />
          <path
            d={headPath(arrow.head.x, arrow.head.y, arrow.head.dir)}
            stroke="var(--brand-500)"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.g>
      ))}
    </svg>
  );
}
