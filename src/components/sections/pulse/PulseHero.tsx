"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { BubbleIcon } from "@/components/sections/model/ModelIcons";
import { Container } from "@/components/ui/Container";
import { pulse } from "@/content/pulse";
import { cn } from "@/lib/utils";

import { PulseDashboard } from "./PulseDashboard";

/**
 * PULSE HERO
 * ---------------------------------------------------------------------------
 * Section 1 of the LurnyPulse page: the statement on the left, the drawn
 * product dashboard on the right, on a near-black ground.
 *
 * THE BACKGROUND
 * The design ships this as a 1.2MB PNG. It is two effects — a violet radial
 * glow off the right edge, and a set of faint concentric rings centred on it —
 * and both are cheaper and sharper as CSS. Nothing is downloaded, and the glow
 * scales with the viewport instead of being pinned to a 1672px bitmap.
 *
 * The rings are one `repeating-radial-gradient` rather than a stack of
 * bordered circles, masked so they fade out before reaching the copy. The glow
 * is a plain radial gradient over the top.
 *
 * There is no image on this page at all — see PulseDashboard for why the
 * product shot is drawn too.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { hero } = pulse;

/** Feature-note icons, keyed by the name in the content file. */
const featureIcons = {
  framework: FrameworkIcon,
  bubble: BubbleIcon,
  growth: GrowthIcon,
} as const;

/** A cog-like glyph for "Role frameworks". */
function FrameworkIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="3"
        y="3"
        width="14"
        height="14"
        rx="4.5"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="10" cy="10" r="2.6" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M10 1.8v1.6M10 16.6v1.6M18.2 10h-1.6M3.4 10H1.8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** A rising arrow for "GrowthPath". */
function GrowthIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M3.5 16.5 8 9l3 3.4 5.2-8.6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.6 3.9h4.8v4.6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PulseHero() {
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
        "relative isolate overflow-hidden bg-[#050308] text-white",
        // Extra top padding: this is the first section under the floating nav
        // pill, so it needs clearance the mid-page sections do not.
        "pt-28 pb-section-lg sm:pt-32 lg:pt-36",
      )}
    >
      {/* ===================== Background effects ===================== */}
      {/*
        Concentric rings, centred on the glow off the right edge. Masked to
        fade toward the left so they never compete with the headline.
      */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 -z-10",
          "hidden opacity-60 lg:block",
        )}
        style={{
          background:
            "repeating-radial-gradient(circle at 88% 48%, transparent 0 62px, rgb(167 139 250 / 0.10) 62px 63px)",
          maskImage:
            "radial-gradient(circle at 88% 48%, black 0%, black 42%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(circle at 88% 48%, black 0%, black 42%, transparent 78%)",
        }}
      />

      {/* The violet core glow. Two stacked gradients: a wide, deep wash and a
          tighter, brighter centre, which is what gives the design's falloff
          its shape — a single gradient reads flat. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: [
            "radial-gradient(58rem 48rem at 92% 46%, rgb(88 40 180 / 0.55), transparent 62%)",
            "radial-gradient(22rem 20rem at 96% 47%, rgb(139 92 246 / 0.52), transparent 66%)",
          ].join(","),
        }}
      />

      {/* A soft floor of light under the whole section, so the near-black is
          not perfectly flat at the bottom edge. */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-64",
          "bg-linear-to-t from-brand-950/40 to-transparent",
        )}
      />

      <Container width="hero" className="relative">
        <div
          className={cn(
            "grid items-center gap-16",
            // The dashboard needs the wider column: it carries a radar plus
            // two cards floating over its right edge.
            "lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1fr)] lg:gap-6",
            "xl:gap-10",
          )}
        >
          {/* =========================== Statement ===================== */}
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "text-[0.6875rem] font-bold uppercase",
                "tracking-[0.14em] text-brand-300 sm:text-xs",
              )}
            >
              {hero.eyebrow.product}
              {/* Decorative separator — a screen reader would otherwise
                  announce "bullet" between the two halves. */}
              <span aria-hidden="true" className="mx-2 text-brand-500">
                ·
              </span>
              {hero.eyebrow.label}
            </motion.p>

            <motion.h1
              {...rise(0.08)}
              className={cn(
                "mt-6 font-display font-bold tracking-[-0.035em]",
                "leading-[1.08] text-white",
                // Measured from the design at ~52px on a 1440 frame.
                "text-[2.25rem] sm:text-[2.75rem] xl:text-[3.25rem]",
              )}
            >
              {hero.headline.map((line) => (
                <span key={line} className="inline lg:block">
                  {line}{" "}
                </span>
              ))}
            </motion.h1>

            <motion.p
              {...rise(0.16)}
              className={cn(
                "mt-7 max-w-108 leading-relaxed text-pretty",
                "text-[1.0625rem] text-neutral-300 sm:text-lg",
              )}
            >
              {hero.description}
            </motion.p>

            {/* --------------------------- Actions -------------------- */}
            <motion.div
              {...rise(0.24)}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <Link
                href={hero.actions.primary.href}
                className={cn(
                  "group inline-flex h-14 items-center justify-center gap-3 rounded-lg px-7",
                  "bg-accent-300 text-[0.9375rem] font-semibold text-neutral-900",
                  // `translate`, not `transform`: Tailwind v4 compiles the
                  // translate utilities to the standalone property.
                  "duration-normal transition-[background-color,box-shadow,translate] ease-out",
                  "will-change-[translate]",
                  "hover:-translate-y-0.5 hover:bg-accent-200",
                  "hover:shadow-[0_16px_36px_-12px_rgb(252_203_70/0.45)]",
                  "active:translate-y-0",
                )}
              >
                {hero.actions.primary.label}
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                  className={cn(
                    "size-4",
                    "duration-normal transition-[translate] ease-out",
                    "group-hover:translate-x-1",
                  )}
                >
                  <path
                    d="M2.5 8h11m0 0-4-4m4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>

              <Link
                href={hero.actions.secondary.href}
                className={cn(
                  "inline-flex h-14 items-center justify-center rounded-lg px-7",
                  "border border-brand-400/60 text-[0.9375rem] font-semibold text-white",
                  "duration-normal transition-[background-color,border-color,translate] ease-out",
                  "will-change-[translate]",
                  "hover:-translate-y-0.5 hover:border-brand-300 hover:bg-brand-500/12",
                  "active:translate-y-0",
                )}
              >
                {hero.actions.secondary.label}
              </Link>
            </motion.div>

            {/* -------------------------- Features -------------------- */}
            <motion.ul
              {...rise(0.32)}
              className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-3"
            >
              {hero.features.map((feature, index) => {
                const Icon = featureIcons[feature.icon];

                return (
                  <li key={feature.label} className="flex items-center gap-4">
                    <span className="flex items-center gap-2.5">
                      <Icon className="size-4 shrink-0 text-brand-300" />
                      <span className="text-[0.875rem] text-neutral-300">
                        {feature.label}
                      </span>
                    </span>

                    {/*
                      The separator TRAILS its item rather than leading the
                      next one. Both read identically on one line, but when the
                      list wraps a leading separator would start the new row
                      with a stray bullet.
                    */}
                    {index < hero.features.length - 1 && (
                      <span aria-hidden="true" className="text-neutral-700">
                        ·
                      </span>
                    )}
                  </li>
                );
              })}
            </motion.ul>
          </div>

          {/* ========================= Dashboard ======================= */}
          {/*
            The floating cards overhang the radar card's right edge, so the
            column needs a matching right margin or they would sit outside the
            container. Reserving the space here keeps them fully visible and
            inside the gutter, which is where the design puts them — unlike
            the LurnyPitch hero, this illustration is not meant to be cropped
            by the viewport.

            Below lg the cards stop floating and stack, so no margin is
            needed. See PulseDashboard.
          */}
          <PulseDashboard className="lg:mr-32 xl:mr-36" />
        </div>
      </Container>
    </section>
  );
}
