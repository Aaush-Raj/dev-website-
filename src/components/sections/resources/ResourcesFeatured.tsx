"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { resources } from "@/content/resources";
import { cn } from "@/lib/utils";

/**
 * RESOURCES FEATURED
 * ---------------------------------------------------------------------------
 * Section 2 of the Resources page: the featured guide on a cream panel, its
 * title set the way the cover sets it, with the cover itself angled on the
 * right over faint line-art.
 *
 * THE COVER
 * The same asset section 1 uses, but presented differently: the design shows it
 * rotated a couple of degrees with its spine toward the viewer. The supplied
 * render is face-on, so the tilt and the spine are added here — a small
 * `rotate` plus a dark edge behind the cover's right side. Reproducing them in
 * CSS keeps one asset serving both sections; a second angled render would be
 * another download for the same artwork.
 *
 * THE LINE-ART
 * Concentric rings, a dot grid and isometric step blocks, all in a faint tan
 * over the cream. Drawn as one inline SVG rather than shipped: it is flat
 * line-work that costs nothing to draw, stays sharp at every density, and can
 * be masked to fade behind the cover.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { featured } = resources;

/** The dot beside each highlight, in the design's three tones. */
const highlightTone = {
  red: "bg-[#d92e1e]",
  violet: "bg-[#60329b]",
  teal: "bg-[#4f9b99]",
} as const;

export function ResourcesFeatured() {
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
    <section className="bg-white py-section-lg">
      <Container width="wide">
        {/*
          The panel. Everything in this section sits inside it, and it carries
          its own rounding and overflow clip so the line-art and the cover can
          run to its edges without escaping.
        */}
        <div
          className={cn(
            "relative isolate overflow-hidden rounded-[2rem]",
            // The cream ground, sampled from the design.
            "bg-[#f9f0e4]",
            "px-6 py-12 sm:px-10 sm:py-14 lg:px-14 lg:py-16",
          )}
        >
          {/* ======================= The line-art ====================== */}
          <FeaturedLineArt />

          <div
            className={cn(
              "relative grid items-center gap-12",
              // The copy takes slightly more than the cover, as in the design.
              "lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-10",
              "xl:gap-16",
            )}
          >
            {/* ========================= Statement ==================== */}
            <div>
              <motion.div {...rise(0)}>
                <p
                  className={cn(
                    "text-[0.6875rem] font-bold uppercase",
                    "tracking-[0.16em] text-[#d92e1e] sm:text-xs",
                  )}
                >
                  {featured.eyebrow}
                </p>
                {/* The short rule under the eyebrow, as the design draws it. */}
                <span
                  aria-hidden="true"
                  className="mt-3 block h-0.5 w-8 bg-[#e87667]"
                />
              </motion.div>

              {/*
                The title, set the way the cover sets it — a heavy condensed
                display face in two tones. It is one heading; the colour break
                is presentation, so both halves sit in the same <h2>.
              */}
              <motion.h2
                {...rise(0.08)}
                className={cn(
                  "mt-7 font-display font-bold uppercase",
                  "tracking-[-0.02em] text-[#081727]",
                  "text-[2.25rem] leading-[1.02] sm:text-[3rem] xl:text-[3.75rem]",
                )}
              >
                <span className="block">{featured.title.lead}</span>
                <span className="block text-[#d92e1e]">
                  {featured.title.accent}
                </span>
              </motion.h2>

              <motion.p
                {...rise(0.16)}
                className={cn(
                  "mt-6 max-w-104 font-semibold text-pretty",
                  "text-[1.125rem] leading-snug text-[#1d2b3f] sm:text-[1.375rem]",
                )}
              >
                {featured.subtitle}
              </motion.p>

              <motion.p
                {...rise(0.22)}
                className={cn(
                  "mt-6 max-w-104 leading-relaxed text-pretty",
                  "text-[0.9375rem] text-[#4a5666] sm:text-base",
                )}
              >
                {featured.description}
              </motion.p>

              {/* ------------------------ Highlights ----------------- */}
              <motion.ul
                {...rise(0.28)}
                className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3"
              >
                {featured.highlights.map((highlight) => (
                  <li
                    key={highlight.label}
                    className="flex items-center gap-2.5"
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "size-1.5 shrink-0 rounded-full",
                        highlightTone[highlight.tone],
                      )}
                    />
                    <span className="text-[0.875rem] font-medium text-[#2b3648]">
                      {highlight.label}
                    </span>
                  </li>
                ))}
              </motion.ul>

              {/* -------------------------- Actions ------------------ */}
              <motion.div
                {...rise(0.34)}
                className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4"
              >
                <Link
                  href={featured.actions.primary.href}
                  className={cn(
                    "group/cta inline-flex h-13 items-center justify-center gap-3 rounded-lg px-7",
                    "bg-[#d92e1e] text-[0.9375rem] font-semibold text-white",
                    // `translate`, not `transform`: Tailwind v4 compiles the
                    // translate utilities to the standalone property.
                    "duration-normal transition-[background-color,box-shadow,translate] ease-out",
                    "will-change-[translate]",
                    "hover:-translate-y-0.5 hover:bg-[#ec3a29]",
                    "hover:shadow-[0_14px_30px_-12px_rgb(217_46_30/0.6)]",
                    "active:translate-y-0",
                  )}
                >
                  {featured.actions.primary.label}
                  <ArrowIcon
                    className={cn(
                      "size-4",
                      "duration-normal transition-[translate] ease-out",
                      "group-hover/cta:translate-x-1",
                    )}
                  />
                </Link>

                {/* Secondary action — an underlined text link, as in the
                    design, not a second button competing with the primary. */}
                <Link
                  href={featured.actions.secondary.href}
                  className={cn(
                    "group/link inline-flex flex-col items-start",
                    "text-[0.9375rem] font-semibold text-[#1d2b3f]",
                  )}
                >
                  <span className="inline-flex items-center gap-2.5">
                    {featured.actions.secondary.label}
                    <ArrowIcon
                      className={cn(
                        "size-4",
                        "duration-normal transition-[translate] ease-out",
                        "group-hover/link:translate-x-1",
                      )}
                    />
                  </span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "mt-1.5 block h-px w-full origin-left bg-[#1d2b3f]/45",
                      "duration-normal transition-transform ease-out",
                      "group-hover/link:scale-x-0",
                    )}
                  />
                </Link>
              </motion.div>
            </div>

            {/* =========================== Cover ====================== */}
            <motion.div
              initial={reduce ? "shown" : "hidden"}
              whileInView="shown"
              viewport={{ once: true, amount: "some" }}
              variants={{
                hidden: { opacity: 0, y: 30 },
                shown: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, delay: 0.15, ease: easeOut },
                },
              }}
              className="group/cover relative mx-auto w-full max-w-72 sm:max-w-80 lg:max-w-88 xl:max-w-96"
            >
              {/*
                The tilt. A small counter-clockwise rotation matching the
                design, opening slightly further on hover so the cover reads as
                a physical object rather than a flat image.
              */}
              <div
                className={cn(
                  "relative -rotate-2",
                  "transition-[rotate,translate] duration-500 ease-out",
                  "will-change-[rotate,translate]",
                  "group-hover/cover:-translate-y-1.5 group-hover/cover:-rotate-1",
                  "motion-reduce:transition-none",
                )}
              >
                {/* The spine, behind the cover's right edge — the dark board
                    the design shows. It is a sibling rather than part of the
                    image because the supplied render is face-on. */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-y-[1.5%] right-[-1.4%] w-[3.5%] rounded-r-sm",
                    "bg-linear-to-r from-[#111d33] to-[#25334d]",
                  )}
                />

                <Image
                  src={featured.cover.src}
                  alt={featured.cover.alt}
                  width={featured.cover.width}
                  height={featured.cover.height}
                  sizes="(min-width: 1024px) 34vw, 80vw"
                  className={cn(
                    "relative h-auto w-full rounded-sm",
                    "drop-shadow-[0_28px_44px_rgb(80_55_30/0.28)]",
                  )}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/**
 * The panel's decorative line-art: concentric rings — some solid, one dotted —
 * a small dot grid, and isometric step blocks at the lower right.
 *
 * Anchored to the panel's right edge and drawn in its own coordinate space, so
 * the composition holds together as the panel reflows. It is masked to fade
 * toward the left, which keeps it off the copy: at narrow widths the panel is
 * mostly text, and unmasked rings would run straight through it.
 */
function FeaturedLineArt() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 420 520"
      fill="none"
      className={cn(
        "pointer-events-none absolute top-0 right-0 -z-10 h-full",
        // Hidden on the smallest screens: the panel is nearly all copy there,
        // and the art would sit under the text rather than beside it.
        "hidden sm:block",
      )}
      style={{
        maskImage: "linear-gradient(90deg, transparent, black 42%)",
        WebkitMaskImage: "linear-gradient(90deg, transparent, black 42%)",
      }}
    >
      {/* The rings, centred off the panel's right edge. The dotted one sits
          between two solids, as the design draws it. */}
      <g stroke="#e0cbae" strokeWidth="1.1">
        <circle cx="238" cy="248" r="96" />
        <circle cx="238" cy="248" r="128" />
        <circle cx="238" cy="248" r="176" />
        <circle cx="238" cy="248" r="212" />
        <circle
          cx="300"
          cy="215"
          r="152"
          strokeDasharray="2 7"
          strokeLinecap="round"
        />
        <circle
          cx="300"
          cy="215"
          r="238"
          strokeDasharray="2 8"
          strokeLinecap="round"
        />
      </g>

      {/* The dot grid at the rings' centre. */}
      <g fill="#d8c2a2">
        {Array.from({ length: 5 }, (_, row) =>
          Array.from({ length: 4 }, (_, col) => (
            <circle
              key={`${row}-${col}`}
              cx={196 + col * 22}
              cy={221 + row * 22}
              r="1.6"
            />
          )),
        )}
      </g>

      {/* The isometric steps at the lower right — three blocks climbing to the
          right, echoing the cover's own stepped illustration. */}
      <g stroke="#ddc7a8" strokeWidth="1.1" strokeLinejoin="round">
        {[
          { x: 214, y: 452 },
          { x: 286, y: 424 },
          { x: 358, y: 396 },
        ].map((step) => (
          <g key={step.x}>
            {/* top face */}
            <path d={`M ${step.x} ${step.y} l 36 -18 l 36 18 l -36 18 z`} />
            {/* left face */}
            <path d={`M ${step.x} ${step.y} v 26 l 36 18 v -26 z`} />
            {/* right face */}
            <path d={`M ${step.x + 72} ${step.y} v 26 l -36 18 v -26 z`} />
          </g>
        ))}
      </g>
    </svg>
  );
}

/** The arrow on both actions. */
function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M3 8h9m0 0-3.4-3.4M12 8l-3.4 3.4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
