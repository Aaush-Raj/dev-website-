"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { pulse } from "@/content/pulse";
import { cn } from "@/lib/utils";

import { PulseWorksModal } from "./PulseWorksModal";
import { worksIcons } from "./PulseWorksIcons";

/**
 * PULSE WORKS
 * ---------------------------------------------------------------------------
 * Section 3 of the LurnyPulse page: a photographic band with the drawn product
 * modal over it, then the four steps of the journey along the foot.
 *
 * THE BACKGROUND
 * The photograph is right-anchored and fades to the section's own lavender on
 * its left, which is how the copy stays legible over it. That fade is baked
 * into the supplied file, so this only needs to position it and let the
 * section's background show through — no CSS tint, no overlay.
 *
 * The crop is pinned near the right rather than centred: the subject sits in
 * the frame's right third, and the modal covers the middle. Pinning at 85%
 * rather than a flat `object-right` leaves him clear of the modal, which is
 * where the design puts him — the desk and monitor run off the frame edge.
 *
 * THE STEPS
 * An <ol> — the order is meaningful, and the numerals are content, so they
 * come from the data rather than a CSS counter. The dotted connectors between
 * them are decorative and drawn between items, never after the last.
 *
 * Each step lifts slightly on hover, with its ring and glyph brightening
 * together. `translate`, not `transform`: Tailwind v4 compiles the translate
 * utilities to the standalone property, so the transition must name it.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { works } = pulse;

export function PulseWorks() {
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
    <section className="relative overflow-hidden bg-[#f4f0f9] py-section-lg">
      {/* ====================== Background photo ====================== */}
      {/*
        Sits behind everything, anchored right. Hidden below lg: at phone
        width the subject is cropped to an unrecognisable sliver and the copy
        would sit over the busy part of the frame rather than its fade.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden lg:block"
      >
        <Image
          src={works.image.src}
          alt={works.image.alt}
          fill
          sizes="100vw"
          className="object-cover object-[85%_center] select-none"
          // Decorative and below the fold — it must not compete with the
          // hero for bandwidth.
          loading="lazy"
        />
      </div>

      <Container width="hero" className="relative">
        <div
          className={cn(
            "grid items-center gap-12",
            "lg:grid-cols-[minmax(0,0.62fr)_minmax(0,1fr)] lg:gap-10",
          )}
        >
          {/* =========================== Statement ===================== */}
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "text-[0.6875rem] font-bold uppercase",
                "tracking-[0.14em] text-brand-600 sm:text-xs",
              )}
            >
              {works.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.08)}
              className={cn(
                "mt-6 font-display font-bold tracking-[-0.03em]",
                "leading-[1.12] text-neutral-900",
                // Measured from the design at ~44px on a 1440 frame.
                "text-[1.875rem] sm:text-[2.25rem] xl:text-[2.75rem]",
              )}
            >
              {works.headline.map((line) => (
                <span key={line} className="inline lg:block">
                  {line}{" "}
                </span>
              ))}
            </motion.h2>

            <motion.p
              {...rise(0.16)}
              className={cn(
                "mt-6 max-w-96 leading-relaxed text-pretty",
                "text-[0.9375rem] text-neutral-600 sm:text-base",
              )}
            >
              {works.description}
            </motion.p>

            <motion.div {...rise(0.24)} className="mt-8">
              <Link
                href={works.action.href}
                className={cn(
                  "group inline-flex items-center gap-3 rounded-lg",
                  "border border-brand-500/70 px-6 py-3.5",
                  "text-[0.9375rem] font-semibold text-brand-700",
                  "duration-normal transition-[background-color,border-color,translate] ease-out",
                  "will-change-[translate]",
                  "hover:-translate-y-0.5 hover:border-brand-600 hover:bg-brand-500/8",
                  "active:translate-y-0",
                )}
              >
                {works.action.label}
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
            </motion.div>
          </div>

          {/* ============================ Modal ======================== */}
          <motion.div
            initial={reduce ? "shown" : "hidden"}
            whileInView="shown"
            viewport={{ once: true, amount: "some" }}
            variants={{
              hidden: { opacity: 0, y: 28, scale: 0.98 },
              shown: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 0.85, delay: 0.15, ease: easeOut },
              },
            }}
          >
            <PulseWorksModal />
          </motion.div>
        </div>

        {/* ============================= Steps ======================== */}
        <ol
          className={cn(
            "mt-14 grid gap-x-6 gap-y-10",
            "sm:grid-cols-2 lg:mt-20 lg:grid-cols-4",
          )}
        >
          {works.steps.map((step, index) => {
            const Icon = worksIcons[step.icon];

            return (
              <motion.li
                key={step.title}
                initial={reduce ? "shown" : "hidden"}
                whileInView="shown"
                viewport={{ once: true, amount: "some" }}
                variants={{
                  hidden: { opacity: 0, y: 22 },
                  shown: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.55,
                      delay: 0.1 + index * 0.11,
                      ease: easeOut,
                    },
                  },
                }}
                className="group relative flex gap-4"
              >
                {/* ---------------------- Ring ---------------------- */}
                <span
                  className={cn(
                    "relative grid size-14 shrink-0 place-items-center rounded-full",
                    "border border-brand-300/70 bg-white/50 text-brand-600",
                    "duration-normal transition-[background-color,border-color,box-shadow,translate] ease-out",
                    "will-change-[translate]",
                    "group-hover:-translate-y-0.5 group-hover:border-brand-500",
                    "group-hover:bg-white group-hover:text-brand-700",
                    "group-hover:shadow-[0_10px_24px_-12px_rgb(91_50_183/0.5)]",
                  )}
                >
                  <Icon className="size-6" />
                </span>

                <div className="min-w-0">
                  {/* The numeral. From the data rather than a CSS counter, so
                      it is real text for a screen reader and for copy-paste. */}
                  <p
                    className={cn(
                      "font-mono text-[0.8125rem] font-medium",
                      "tracking-[0.06em] text-brand-600 tabular-nums",
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </p>

                  <h3
                    className={cn(
                      "mt-2 font-display text-[1.0625rem] font-semibold",
                      "tracking-[-0.01em] text-neutral-900",
                    )}
                  >
                    {step.title}
                  </h3>

                  <p className="mt-2 text-[0.8125rem] leading-relaxed text-pretty text-neutral-600">
                    {step.description}
                  </p>
                </div>

                {/* ------------------- Connector -------------------- */}
                {/*
                  A dotted rule to the next step, as in the design. Only on lg,
                  where the four sit in one row — in the stacked layouts a
                  horizontal connector would point at nothing. Never drawn
                  after the last step.
                */}
                {index < works.steps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute top-7 -right-3 hidden h-px w-6 lg:block",
                      "bg-[repeating-linear-gradient(to_right,var(--color-brand-400)_0_3px,transparent_3px_7px)]",
                    )}
                  />
                )}
              </motion.li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
