"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { ArrowRightIcon } from "@/components/sections/hero/DashboardIcons";
import { Container } from "@/components/ui/Container";
import { industriesPage } from "@/content/industries-page";
import { cn } from "@/lib/utils";

/**
 * INDUSTRIES HERO
 * ---------------------------------------------------------------------------
 * Section 1 of the Industries page: copy on the left, a six-card mosaic on the
 * right, over the design's orbital-ring background.
 *
 * THE BACKGROUND
 * The rings ship as an image rather than being redrawn in SVG. They are a
 * hand-drawn tangle of ellipses and scattered dots — reproducing that in
 * markup would be hundreds of hand-tuned paths for a decorative layer, and at
 * 17KB the export is cheaper than the DOM would be. It is `priority` because
 * it is this page's LCP background.
 *
 * A slow rotation is applied on top of it, so the orbits actually orbit. The
 * image is deliberately oversized and centred on the mosaic so the rotation
 * never sweeps an empty corner into view.
 *
 * THE MOSAIC
 * Three columns, two rows. Each card carries its own `offset`, which lifts it
 * off the row's baseline — that stagger is what makes the grid read as
 * floating rather than as a table. It applies only from lg, where the columns
 * genuinely sit side by side.
 *
 * On top of the static offset each card drifts slowly and independently (see
 * `industry-float` in globals.css). Both the drift and the rotation are
 * dropped under `prefers-reduced-motion` — ambient, endless movement is
 * exactly what that setting asks us not to ship.
 *
 * The photos are decorative: the label beside each already names the
 * industry, so the images are `alt=""` rather than described twice.
 */

const { hero } = industriesPage;

/** Motion's string easings are not typed, so the cubic curve is spelled out. */
const easeOut = [0.16, 1, 0.3, 1] as const;

/**
 * Per-card drift settings.
 *
 * A fixed table rather than Math.random(): random values differ between the
 * server render and the client, which React reports as a hydration mismatch.
 * Varied on purpose — uniform speed is what makes a floating grid look
 * mechanical.
 */
/**
 * The orbital rings behind the mosaic.
 *
 * Two tilted axes, two ellipses each, which is what gives the design's
 * interlocking look. Amber and blue alternate, as the artwork does.
 */
const orbits = [
  { rx: 34, ry: 19, tilt: -14, stroke: "#e0a13c", opacity: 0.5 },
  { rx: 30, ry: 16, tilt: -14, stroke: "#4f7bd0", opacity: 0.34 },
  { rx: 34, ry: 19, tilt: 16, stroke: "#e0a13c", opacity: 0.34 },
  { rx: 27, ry: 14, tilt: 42, stroke: "#4f7bd0", opacity: 0.26 },
] as const;

/**
 * Dots flecked along the orbits.
 *
 * A fixed table rather than Math.random(): random values differ between the
 * server render and the client, which React reports as a hydration mismatch.
 */
const orbitDots = [
  { x: 16, y: 44, r: 0.7, fill: "#f0b850", opacity: 0.9 },
  { x: 28, y: 27, r: 0.5, fill: "#6f9be8", opacity: 0.8 },
  { x: 44, y: 20, r: 0.6, fill: "#f0b850", opacity: 0.7 },
  { x: 63, y: 22, r: 0.5, fill: "#6f9be8", opacity: 0.75 },
  { x: 80, y: 32, r: 0.7, fill: "#f0b850", opacity: 0.85 },
  { x: 86, y: 50, r: 0.5, fill: "#6f9be8", opacity: 0.7 },
  { x: 78, y: 68, r: 0.65, fill: "#f0b850", opacity: 0.8 },
  { x: 58, y: 78, r: 0.5, fill: "#6f9be8", opacity: 0.75 },
  { x: 38, y: 76, r: 0.6, fill: "#f0b850", opacity: 0.7 },
  { x: 20, y: 62, r: 0.5, fill: "#6f9be8", opacity: 0.8 },
  { x: 50, y: 36, r: 0.45, fill: "#f0b850", opacity: 0.55 },
  { x: 68, y: 58, r: 0.45, fill: "#6f9be8", opacity: 0.55 },
] as const;

const drift = [
  { duration: 9.5, delay: 0, distance: "-0.55rem" },
  { duration: 11, delay: 1.2, distance: "0.5rem" },
  { duration: 8.5, delay: 0.4, distance: "-0.45rem" },
  { duration: 10.5, delay: 2, distance: "0.6rem" },
  { duration: 9, delay: 0.8, distance: "-0.5rem" },
  { duration: 12, delay: 1.6, distance: "0.45rem" },
] as const;

export function IndustriesHero() {
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
        "relative isolate overflow-hidden bg-[#0b0a1a] text-white",
        // Clearance for the floating nav pill, which overlays the page.
        "pt-28 pb-20 sm:pt-32 lg:pt-32 lg:pb-24",
      )}
    >
      {/* ===================== Background layers ====================== */}
      {/*
        The orbital rings.

        DRAWN, not the supplied PNG. The export is dark navy strokes on a
        near-black ground, and over this section's own near-black it read as
        a smudge at any opacity that did not also wash out the photos. As
        ellipses they are a handful of elements, crisp at any width, and
        their brightness is a value rather than a fixed pixel.

        Anchored behind the mosaic and rotating slowly, so the orbits orbit.
        The rotation is dropped under `prefers-reduced-motion` — ambient,
        endless movement is what that setting asks us not to ship.
      */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -z-10 select-none",
          /*
            Behind the mosaic on lg+. Below that the columns stack, so the
            rings move up behind the copy and shrink — still present, but not
            fighting the headline for attention.
          */
          "top-[22%] left-1/2 h-[46%] w-[130%] -translate-x-1/2 -translate-y-1/2",
          "opacity-55",
          "lg:top-1/2 lg:left-[62%] lg:h-[125%] lg:w-[70%] lg:opacity-100",
        )}
      >
        <div
          className={cn(
            "size-full origin-center",
            !reduce && "animate-[spin_220s_linear_infinite]",
          )}
        >
          <svg
            viewBox="0 0 100 100"
            className="size-full overflow-visible"
            aria-hidden="true"
            focusable="false"
          >
            {/*
              Four ellipses on two tilted axes, echoing the design's pair of
              interlocking orbits. Stroke widths stay even under scaling
              thanks to `vectorEffect`.
            */}
            {orbits.map((orbit, index) => (
              <ellipse
                key={index}
                cx="50"
                cy="50"
                rx={orbit.rx}
                ry={orbit.ry}
                fill="none"
                stroke={orbit.stroke}
                strokeOpacity={orbit.opacity}
                strokeWidth="0.9"
                vectorEffect="non-scaling-stroke"
                transform={`rotate(${orbit.tilt} 50 50)`}
              />
            ))}

            {/* The scattered dots the design flecks along the orbits. */}
            {orbitDots.map((dot, index) => (
              <circle
                key={index}
                cx={dot.x}
                cy={dot.y}
                r={dot.r}
                fill={dot.fill}
                fillOpacity={dot.opacity}
              />
            ))}
          </svg>
        </div>
      </div>

      {/* Deepens the left side so the headline always has ground beneath it,
          whatever the rings are doing behind. */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 -z-10",
          /*
            Clears well before the mosaic. An earlier version still carried
            ~15% ink across the right half, which washed the orbital rings out
            almost completely — they are the section's signature and need to
            read through.
          */
          "bg-[linear-gradient(100deg,#0b0a1a_10%,rgb(11_10_26/0.9)_30%,rgb(11_10_26/0.35)_46%,transparent_58%)]",
        )}
      />

      {/* A cool bloom behind the mosaic, so the cards sit in light rather
          than on flat black. */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -z-10",
          "top-[-18%] right-[-12%] h-[42rem] w-[46rem]",
          "rounded-full bg-[#1b3a6b]/25 blur-3xl",
        )}
      />

      <Container width="hero" className="relative">
        <div
          className={cn(
            "grid items-center gap-14",
            "lg:grid-cols-[minmax(0,0.84fr)_minmax(0,1fr)] lg:gap-12",
            "xl:gap-16",
          )}
        >
          {/* ============================ Copy ======================== */}
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "text-[0.6875rem] font-bold tracking-[0.16em] uppercase",
                "text-accent-300 sm:text-xs",
              )}
            >
              {hero.eyebrow}
            </motion.p>

            <motion.h1
              {...rise(0.08)}
              className={cn(
                "mt-6 font-display font-bold tracking-[-0.03em]",
                "leading-[1.06] text-balance",
                // Measured from the design at ~58px on a 1440 frame.
                "text-[2.25rem] sm:text-[2.875rem] xl:text-[3.5rem]",
              )}
            >
              {hero.headline.map((line, index) => (
                <span key={line} className="inline lg:block">
                  {line}
                  {/* The design sets the closing stop in amber. It is kept
                      out of the string so it can be coloured without
                      splitting the word before it. */}
                  {index === hero.headline.length - 1 && (
                    <span className="text-accent-400">.</span>
                  )}{" "}
                </span>
              ))}
            </motion.h1>

            <motion.p
              {...rise(0.16)}
              className={cn(
                "mt-6 max-w-[30rem] leading-relaxed text-pretty",
                "text-[0.9375rem] text-neutral-300 sm:text-base",
              )}
            >
              {hero.description}
            </motion.p>

            {/* --------------------------- CTAs ---------------------- */}
            <motion.div {...rise(0.24)} className="mt-9 flex flex-wrap gap-4">
              <a
                href={hero.actions.primary.href}
                className={cn(
                  "group inline-flex h-12 items-center gap-2.5 rounded-lg px-6",
                  "bg-accent-400 text-[0.9375rem] font-bold text-neutral-900",
                  // `translate`, not `transform`: Tailwind v4 compiles the
                  // translate utilities to the standalone property.
                  "duration-normal transition-[background-color,box-shadow,translate] ease-out",
                  "will-change-[translate]",
                  "hover:-translate-y-0.5 hover:bg-accent-300",
                  "hover:shadow-[0_16px_34px_-14px_rgb(254_180_66/0.65)]",
                  "focus-visible:ring-2 focus-visible:ring-accent-300",
                  "focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0a1a]",
                  "focus-visible:outline-none",
                )}
              >
                {hero.actions.primary.label}
                <ArrowRightIcon
                  className={cn(
                    "duration-normal size-4 transition-transform ease-out",
                    "group-hover:translate-x-1",
                  )}
                />
              </a>

              <a
                href={hero.actions.secondary.href}
                className={cn(
                  "group inline-flex h-12 items-center gap-2.5 rounded-lg px-6",
                  "text-[0.9375rem] font-semibold text-white",
                  "ring-1 ring-brand-400/60",
                  "duration-normal transition-[background-color,box-shadow,translate] ease-out",
                  "will-change-[translate]",
                  "hover:-translate-y-0.5 hover:bg-brand-500/15",
                  "hover:shadow-[0_16px_34px_-16px_rgb(127_82_220/0.7)]",
                  "focus-visible:ring-2 focus-visible:ring-brand-300",
                  "focus-visible:outline-none",
                )}
              >
                {hero.actions.secondary.label}
                <ArrowRightIcon
                  className={cn(
                    "duration-normal size-4 transition-transform ease-out",
                    "group-hover:translate-x-1",
                  )}
                />
              </a>
            </motion.div>
          </div>

          {/* =========================== Mosaic ======================= */}
          <ul
            className={cn(
              "grid grid-cols-2 gap-3.5 sm:gap-4",
              "lg:grid-cols-3 lg:items-start",
            )}
          >
            {hero.cards.map((card, index) => {
              const motionSettings = drift[index];

              return (
                <motion.li
                  key={card.label}
                  initial={reduce ? "shown" : "hidden"}
                  whileInView="shown"
                  viewport={{ once: true, amount: "some" }}
                  variants={{
                    // Each card arrives from below, in sequence, so the
                    // mosaic assembles rather than appearing all at once.
                    hidden: { opacity: 0, y: 26, scale: 0.96 },
                    shown: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: {
                        duration: 0.65,
                        delay: 0.25 + index * 0.09,
                        ease: easeOut,
                      },
                    },
                  }}
                  // The static stagger. Only from lg, where the three columns
                  // sit side by side — below that the cards pair up and an
                  // offset would just misalign the rows.
                  className="lg:[margin-top:var(--offset)]"
                  style={{
                    ["--offset" as string]: `${card.offset}rem`,
                  }}
                >
                  {/*
                    The drift lives on an inner element, not on the <li>:
                    the <li> is what motion animates on entry, and a CSS
                    animation on the same element would fight it for the
                    `translate` property.
                  */}
                  <div
                    className={cn(
                      "group relative aspect-4/5 overflow-hidden rounded-xl",
                      "ring-1 ring-white/10",
                      "duration-normal transition-[box-shadow,--tw-ring-color] ease-out",
                      "hover:ring-white/25",
                      "hover:shadow-[0_22px_46px_-24px_rgb(0_0_0/0.9)]",
                      /*
                        The drift is lg-only, like the static stagger.

                        Below lg the cards pair up two-across, and six
                        independently bobbing cards there read as a grid
                        that failed to align rather than as one that floats.
                      */
                      !reduce && "lg:animate-industry-float",
                      "motion-reduce:animate-none",
                    )}
                    style={{
                      ["--industry-float-duration" as string]: `${motionSettings.duration}s`,
                      ["--industry-float" as string]: motionSettings.distance,
                      animationDelay: `-${motionSettings.delay}s`,
                    }}
                  >
                    <Image
                      src={card.image.src}
                      alt={card.image.alt}
                      width={640}
                      height={800}
                      sizes="(min-width: 1024px) 15rem, 45vw"
                      className={cn(
                        "size-full object-cover",
                        // `scale`, not `transform`: Tailwind v4 compiles the
                        // scale utilities to the standalone property.
                        "duration-slow transition-[scale] ease-out",
                        "group-hover:scale-105",
                      )}
                    />

                    {/* Grounds the label, which otherwise sits on whatever
                        the photo happens to be doing at the bottom edge. */}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "pointer-events-none absolute inset-x-0 bottom-0 h-2/5",
                        "bg-[linear-gradient(to_top,rgb(6_6_16/0.92),transparent)]",
                      )}
                    />

                    <p
                      className={cn(
                        "absolute inset-x-0 bottom-0 flex items-center gap-2",
                        "px-3 pb-3 sm:px-3.5 sm:pb-3.5",
                      )}
                    >
                      {/* The coloured rule, one per industry — sampled from
                          the design so a card is identifiable before its
                          label is read. */}
                      <span
                        aria-hidden="true"
                        className="h-4 w-[3px] shrink-0 rounded-full"
                        style={{ backgroundColor: card.tone }}
                      />
                      <span
                        className={cn(
                          "text-[0.625rem] font-semibold tracking-[0.1em]",
                          "uppercase sm:text-[0.6875rem]",
                        )}
                      >
                        {card.label}
                      </span>
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
