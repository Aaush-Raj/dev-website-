"use client";

import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { solutionsPage } from "@/content/solutions-page";
import { cn } from "@/lib/utils";

/**
 * SOLUTIONS — ONE PLATFORM, DIFFERENT REALITIES
 * ---------------------------------------------------------------------------
 * Section 5: a sine wave running from a customer conversation on the left to a
 * shared kitchen kiosk on the right, with three labelled nodes along it.
 *
 * THE CURVE
 * It is one sine period drawn in a 1000x120 viewBox, stretched to the track's
 * width with `preserveAspectRatio="none"`. Every node's y is computed from the
 * SAME sine as the path — see `curveY` — so a dot can never float off the line,
 * and moving a node in content/solutions-page.ts moves its dot and its label
 * together.
 *
 * Below lg the curve is dropped: a wave needs width to read as a wave, and at
 * phone widths the three nodes become an ordinary list instead.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { realities } = solutionsPage;

/* The curve's geometry, in viewBox units. */
const VB_W = 1000;
const VB_H = 120;
/** Where the label baseline sits, in px from the curve box's top. */
const LABEL_BASELINE = 150;
const MID = 60;
const AMP = 34;

/** The curve's y at `pct` percent across — the sine the path itself follows. */
function curveY(pct: number) {
  return MID - AMP * Math.sin((pct / 100) * 2 * Math.PI);
}

/*
  The path, as four cubic segments approximating one sine period. Control points
  sit a third of each segment in, which is the standard cubic fit for a sine and
  is visually exact at this amplitude.
*/
const CURVE_PATH = (() => {
  const quarters = [0, 25, 50, 75, 100];
  let d = `M0 ${MID}`;

  for (let i = 0; i < quarters.length - 1; i += 1) {
    const x0 = (quarters[i] / 100) * VB_W;
    const x1 = (quarters[i + 1] / 100) * VB_W;
    const third = (x1 - x0) / 3;
    const y0 = curveY(quarters[i]);
    const y1 = curveY(quarters[i + 1]);
    // Flat control tangents at each extreme give the sine its round crest.
    d += ` C${x0 + third} ${y0}, ${x1 - third} ${y1}, ${x1} ${y1}`;
  }

  return d;
})();

export function SolutionsRealities() {
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

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden text-white",
        // The design runs a dark violet ground that lifts toward the right.
        "bg-[linear-gradient(115deg,#07051e_0%,#0d0930_45%,#161144_100%)]",
        "py-20 lg:py-24",
      )}
    >
      <Container width="wide" className="relative">
        {/* ========================= The heading ====================== */}
        <motion.p
          {...rise(0)}
          className={cn(
            "text-[0.75rem] font-bold tracking-[0.18em] uppercase",
            "text-[#ffba39] sm:text-[0.8125rem]",
          )}
        >
          {realities.eyebrow}
        </motion.p>

        <motion.h2
          {...rise(0.08)}
          className={cn(
            "mt-5 max-w-[72rem] font-display font-bold tracking-[-0.03em]",
            "leading-[1.14] text-balance text-white",
            // Measured from the design at ~50px on a 1440 frame.
            "text-[1.75rem] sm:text-[2.25rem] xl:text-[3.125rem]",
          )}
        >
          {realities.headline.join(" ")}
          {/* The design closes the sentence; the source copy omits the stop.
              Decorative punctuation, so it is hidden from screen readers. */}
          <span aria-hidden="true">.</span>
        </motion.h2>

        <motion.p
          {...rise(0.16)}
          className={cn(
            "mt-6 max-w-[56rem] leading-relaxed text-pretty",
            "text-[1rem] text-[#c8bfe1] sm:text-[1.0625rem]",
          )}
        >
          {realities.description}
        </motion.p>

        {/* ========================== The curve ======================= */}
        {/*
          The wave track. It is decorative — the same journey is spelled out by
          the labelled list below, which is what a screen reader gets.
        */}
        <div className="relative mt-14 hidden lg:block" aria-hidden="true">
          <div className="flex items-center gap-5">
            {/* The waveform at the left end. */}
            <span className="shrink-0 text-[#a96af6]">
              <WaveformIcon className="h-12 w-24" />
            </span>

            {/* The curve itself, filling the space between the two icons. */}
            <div className="relative min-w-0 flex-1">
              <svg
                viewBox={`0 0 ${VB_W} ${VB_H}`}
                preserveAspectRatio="none"
                className="h-28 w-full"
              >
                <defs>
                  <linearGradient
                    id="sol-wave-line"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                  >
                    <stop offset="0" stopColor="#6a34c8" />
                    <stop offset="0.5" stopColor="#a96af6" />
                    <stop offset="1" stopColor="#8b4fe0" />
                  </linearGradient>
                </defs>

                <motion.path
                  d={CURVE_PATH}
                  fill="none"
                  stroke="url(#sol-wave-line)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  // Non-scaling so the stroke stays 2.5px however the viewBox
                  // is stretched horizontally.
                  vectorEffect="non-scaling-stroke"
                  initial={reduce ? "shown" : "hidden"}
                  whileInView="shown"
                  viewport={{ once: true, amount: "some" }}
                  variants={{
                    hidden: { pathLength: 0 },
                    shown: {
                      pathLength: 1,
                      transition: { duration: 1.6, delay: 0.3, ease: easeOut },
                    },
                  }}
                />
              </svg>

              {/* The nodes, positioned by the same sine the path follows. */}
              {realities.nodes.map((node, index) => (
                <motion.span
                  key={node.label}
                  data-node-dot=""
                  className="absolute"
                  style={{
                    left: `${node.at}%`,
                    // `curveY` is in viewBox units; as a percentage of VB_H it
                    // tracks the rendered height at any width.
                    top: `${(curveY(node.at) / VB_H) * 100}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  initial={reduce ? "shown" : "hidden"}
                  whileInView="shown"
                  viewport={{ once: true, amount: "some" }}
                  variants={{
                    hidden: { opacity: 0, scale: 0.4 },
                    shown: {
                      opacity: 1,
                      scale: 1,
                      transition: {
                        duration: 0.45,
                        delay: 1 + index * 0.14,
                        ease: easeOut,
                      },
                    },
                  }}
                >
                  {/* The ring, and the amber dot inside it. */}
                  <span className="grid size-8 place-items-center rounded-full border border-[#7049be] bg-[#150e3b]">
                    <span
                      className={cn(
                        "block size-3 rounded-full bg-[#ffb236]",
                        "shadow-[0_0_10px_2px_rgb(255_178_54/0.55)]",
                      )}
                    />
                  </span>
                </motion.span>
              ))}

              {/*
                The labels are SIBLINGS of the nodes in this same container, not
                children of them: `left` then resolves against one shared box
                for both, so a label sits under its dot, and a fixed `top` puts
                all three on ONE baseline instead of following the wave.
              */}
              {realities.nodes.map((node, index) => (
                <motion.span
                  key={`${node.label}-label`}
                  data-node-label=""
                  /*
                    A zero-width flex box centred on the node's x. Centring this
                    way rather than with translateX matters: motion drives
                    `transform` for its own entrance animation, so a transform
                    set here would simply be overwritten and the label would sit
                    off to one side.
                  */
                  className={cn(
                    "absolute flex w-0 justify-center",
                    "text-[0.8125rem] font-bold tracking-[0.1em] text-white uppercase",
                  )}
                  style={{
                    // +16px = half the size-8 node ring, whose own centre
                    // is at `left`; without it every label sits a half-ring off.
                    left: `calc(${node.at}% + 16px)`,
                    top: `${LABEL_BASELINE}px`,
                  }}
                  {...rise(1.2 + index * 0.1)}
                >
                  <span className="whitespace-nowrap">{node.label}</span>
                </motion.span>
              ))}
            </div>

            {/* The kiosk at the right end. */}
            <span className="shrink-0 text-[#a769f6]">
              <KioskIcon className="size-16" />
            </span>
          </div>

          {/* The two end labels, aligned under their icons. */}
          <div className="mt-2 flex items-start justify-between">
            <span className="text-[0.75rem] font-bold tracking-[0.12em] text-[#9287b6] uppercase">
              {realities.start.label}
            </span>
            <span className="text-[0.75rem] font-bold tracking-[0.12em] text-[#9287b6] uppercase">
              {realities.end.label}
            </span>
          </div>
        </div>

        {/* ==================== The stacked layout =================== */}
        {/*
          Below lg, and the accessible version of the curve at every width: the
          same journey as an ordinary ordered list.
        */}
        <ol className="mt-10 space-y-5 lg:hidden">
          {[
            realities.start.label,
            ...realities.nodes.map((node) => node.label),
            realities.end.label,
          ].map((label, index, all) => (
            <motion.li
              key={label}
              {...rise(0.2 + index * 0.07)}
              className={cn(
                "relative flex gap-4 pb-5",
                index < all.length - 1 && "border-l border-[#3a2a72]",
                "ml-2 pl-6",
              )}
            >
              <span
                className={cn(
                  "absolute top-0.5 -left-[0.4375rem] block size-3.5 rounded-full",
                  // The two ends are violet; the three nodes between are amber,
                  // matching the curve.
                  index === 0 || index === all.length - 1
                    ? "bg-[#a96af6]"
                    : "bg-[#ffb236]",
                )}
              />
              <span className="text-[0.875rem] font-bold tracking-[0.08em] text-white uppercase">
                {label}
              </span>
            </motion.li>
          ))}
        </ol>

        {/* ========================= The footnote ===================== */}
        <motion.div
          {...rise(1.5)}
          className="mt-14 border-t border-[#20144b] pt-6 lg:mt-20"
        >
          <p className="text-[0.8125rem] font-bold tracking-[0.14em] text-[#83799b] uppercase">
            {realities.footnote}
          </p>
        </motion.div>
      </Container>
    </section>
  );
}

/* ========================================================================== */
/* The two end icons                                                          */
/* ========================================================================== */

/** A bar waveform: the customer conversation. */
function WaveformIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 96 48" aria-hidden="true" {...props}>
      {/* Heights chosen to read as speech: a rise into the middle, then fall. */}
      {[10, 18, 28, 38, 30, 22, 34, 26, 16, 8].map((h, index) => (
        <rect
          key={index}
          x={index * 9 + 3}
          y={24 - h / 2}
          width="4"
          height={h}
          rx="2"
          fill="currentColor"
        />
      ))}
    </svg>
  );
}

/** A monitor showing a waveform: the shared kitchen kiosk. */
function KioskIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <rect
        x="5"
        y="8"
        width="38"
        height="26"
        rx="3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      {/* The small waveform on the screen. */}
      {[8, 13, 6, 15, 9].map((h, index) => (
        <rect
          key={index}
          x={13 + index * 5}
          y={21 - h / 2}
          width="2.5"
          height={h}
          rx="1.25"
          fill="currentColor"
        />
      ))}
      <path
        d="M24 34v6M17 40h14"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
