"use client";

import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { LeadForm } from "@/components/ui/LeadForm";
import { kxp } from "@/content/kxp";
import { cn } from "@/lib/utils";

/**
 * KXP DEMO
 * ---------------------------------------------------------------------------
 * Section 6: the pitch on the left, the booking form on a card to the right.
 *
 * THE FORM IS THE SHARED LeadForm, not a copy of one — same validation, focus
 * management, error handling and success state as every other page's. This
 * design asks for five fields plus the free-text box, so it supplies the
 * optional `organisation` the form already grew for the Industries page and
 * omits `selectC`. Its submit is still not wired to any destination; that TODO
 * is one fix for the whole site rather than one per page.
 *
 * The pack's README is explicit that the form must be real HTML/CSS "so that
 * the form remains interactive and accessible", which is what using the shared
 * component gives — labels tied by id, aria-invalid, announced errors.
 *
 * THE TWO CORNER WAVES ARE DRAWN, NOT SHIPPED
 * The pack supplies them as PNG crops, but with "off-white backing" baked in
 * rather than transparency — dropping those onto the section would show two
 * rectangular seams where their backing met the ground. They are simple
 * organic shapes, so they are drawn as SVG instead: no seam, no raster, sharp
 * at any size, and they scale with the section rather than being pinned to one
 * width. Their lavender is sampled from the design.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { demo } = kxp;

/** The glyphs beside the two points. */
const pointIcons = {
  clock: ClockIcon,
  chart: ChartIcon,
} as const;

export function KxpDemo() {
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
      // The page's own "Book a demo" CTAs can point here.
      id="demo"
      className="relative isolate overflow-hidden bg-[#fefcf9] py-section-lg text-neutral-900"
    >
      {/* ---------------------------- Waves ------------------------- */}
      {/* Top-right and bottom-left, as the design frames them. Drawn rather
          than shipped — see the note at the top of this file.

          Each is a full-bleed overlay whose path is a corner wedge, rather
          than a small box stretched with `preserveAspectRatio="none"`: that
          scales the curve to the box and floods the section instead of
          hugging the corner. */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 size-full"
      >
        <path
          d="M 100 0 L 100 26 C 92 24, 86 17, 82 9 C 80 5, 78 2, 76 0 Z"
          fill="#f3e6fa"
        />
        <path
          d="M 0 100 L 0 72 C 9 74, 16 82, 21 90 C 24 95, 26 98, 28 100 Z"
          fill="#f3e6fa"
        />
      </svg>

      <Container width="hero" className="relative">
        <div
          className={cn(
            "grid items-center gap-12",
            // Measured from the design: the pitch takes a little over a third,
            // the form the rest.
            "lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-14",
            "xl:gap-20",
          )}
        >
          {/* =========================== Statement ==================== */}
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "text-[0.6875rem] font-bold uppercase",
                "tracking-[0.1em] text-[#9500fe] sm:text-xs",
              )}
            >
              {demo.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.08)}
              className={cn(
                "mt-6 font-display font-bold tracking-[-0.035em]",
                "leading-[1.08] text-[#080116]",
                "text-[1.875rem] sm:text-[2.25rem] xl:text-[2.75rem]",
              )}
            >
              {demo.headline.map((line) => (
                <span key={line} className="inline lg:block">
                  {line}{" "}
                </span>
              ))}
            </motion.h2>

            <motion.p
              {...rise(0.16)}
              className={cn(
                "mt-6 max-w-[30rem] leading-relaxed text-pretty",
                "text-[1rem] text-[#0b0222]/80 sm:text-[1.0625rem]",
              )}
            >
              {demo.description}
            </motion.p>

            {/* Rule, then the two icon points. */}
            <motion.ul
              {...rise(0.24)}
              className="mt-9 max-w-[30rem] border-t border-neutral-300/70 pt-8"
            >
              {demo.points.map((point, index) => {
                const Icon = pointIcons[point.icon];

                return (
                  <li
                    key={point.text}
                    className={cn(
                      "flex items-start gap-4",
                      index > 0 && "mt-5",
                    )}
                  >
                    <Icon className="mt-0.5 size-5 shrink-0 text-[#9500fe]" />
                    <span className="text-[0.9375rem] leading-relaxed text-pretty text-neutral-700">
                      {point.text}
                    </span>
                  </li>
                );
              })}
            </motion.ul>
          </div>

          {/* ============================= Form ======================== */}
          {/* A white card with a violet hairline, as the design draws it. */}
          <motion.div
            {...rise(0.2)}
            className={cn(
              "rounded-2xl bg-white p-2 sm:p-2.5",
              "ring-1 ring-[#9500fe]/18",
              "shadow-[0_24px_60px_-30px_rgb(60_20_110/0.22)]",
            )}
          >
            {/* `gold` is the amber this design's CTA uses — the same tone the
                LurnyMagic and LurnyBiz booking forms take. */}
            <LeadForm content={demo.form} tone="gold" />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

/** "30 minutes · tailored to your workforce". */
function ClockIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M10 5.4V10l3 1.8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** "Explore the learner journey…". */
function ChartIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M3.5 16.5V11M10 16.5V4M16.5 16.5V8"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
