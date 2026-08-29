"use client";

import { motion, useReducedMotion } from "motion/react";

import { BubbleIcon, ClockIcon } from "@/components/sections/model/ModelIcons";
import { Container } from "@/components/ui/Container";
import { LeadForm } from "@/components/ui/LeadForm";
import { industriesPage } from "@/content/industries-page";
import { cn } from "@/lib/utils";

import { PinIcon } from "./BfsiIcons";

/**
 * INDUSTRIES SPECIALIST
 * ---------------------------------------------------------------------------
 * Section 6 of the Industries page: the pitch on the left, the booking form on
 * a raised card to the right.
 *
 * THE FORM IS THE SHARED LeadForm, not a copy of one — same validation, focus
 * management and success state as every other page's. This design asks for
 * SIX fields where the rest of the site uses four, so the form grew two
 * OPTIONAL fields (`organisation` and `selectC`) rather than being forked.
 * Every other caller omits them and is unchanged; see the notes on those
 * fields in components/ui/LeadForm.tsx.
 *
 * Its submit is still not wired to any destination — that TODO is one fix for
 * the whole site rather than one per page.
 *
 * The two lavender blobs are the design's, drawn in CSS rather than shipped as
 * images: they are large, heavily blurred shapes that cost nothing as
 * gradients and stay crisp at any viewport.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { specialist } = industriesPage;

/** Point icons, keyed by the name in the content file. */
const pointIcons = {
  clock: ClockIcon,
  bubble: BubbleIcon,
  pin: PinIcon,
} as const;

export function IndustriesSpecialist() {
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
      // The page's booking anchor, so the hero's "Book a demo" can point here.
      id="specialist"
      className="relative overflow-hidden bg-[#faf6f4] py-section-lg"
    >
      {/* Lavender blobs, top-right and bottom-left, as in the design. */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -top-40 -right-32",
          "h-[30rem] w-[38rem] rounded-full bg-brand-200/50 blur-3xl",
        )}
      />
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -bottom-44 -left-36",
          "h-[26rem] w-[34rem] rounded-full bg-brand-200/45 blur-3xl",
        )}
      />

      <Container width="hero" className="relative">
        <div
          className={cn(
            "grid items-center gap-12",
            "lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1fr)] lg:gap-14",
            "xl:gap-16",
          )}
        >
          {/* =========================== Statement ===================== */}
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "text-[0.6875rem] font-bold tracking-[0.14em] uppercase",
                "text-brand-600 sm:text-xs",
              )}
            >
              {specialist.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.08)}
              className={cn(
                "mt-6 font-display font-bold tracking-[-0.03em]",
                "leading-[1.1] text-neutral-900",
                // Measured from the design at ~50px on a 1440 frame.
                "text-[1.875rem] sm:text-[2.375rem] xl:text-[3rem]",
              )}
            >
              {specialist.headline.map((line) => (
                <span key={line} className="inline lg:block">
                  {line}{" "}
                </span>
              ))}
            </motion.h2>

            <motion.p
              {...rise(0.16)}
              className={cn(
                "mt-6 max-w-120 leading-relaxed text-pretty",
                "text-[0.9375rem] text-neutral-600 sm:text-base",
              )}
            >
              {specialist.description}
            </motion.p>

            {/* Rule, then the three icon points. */}
            <motion.ul
              {...rise(0.24)}
              className="mt-9 max-w-120 border-t border-neutral-300/80 pt-8"
            >
              {specialist.points.map((point, index) => {
                const Icon = pointIcons[point.icon];

                return (
                  <li
                    key={point.text}
                    className={cn(
                      "flex items-start gap-3.5",
                      index > 0 && "mt-5",
                    )}
                  >
                    <Icon
                      className="mt-0.5 size-5 shrink-0 text-brand-600"
                      aria-hidden="true"
                    />
                    <span className="text-[0.9375rem] leading-relaxed text-pretty text-neutral-700">
                      {point.text}
                    </span>
                  </li>
                );
              })}
            </motion.ul>
          </div>

          {/* ============================= Form ======================== */}
          {/* A white frame with a violet hairline, per the design — the
              form's own panel sits inside it. */}
          <motion.div
            {...rise(0.2)}
            className={cn(
              "rounded-2xl bg-white p-2 sm:p-2.5",
              "ring-1 ring-brand-200/70",
              "shadow-[0_20px_50px_-24px_rgb(45_25_90/0.24)]",
            )}
          >
            {/* `gold` is the softer amber the design's CTA uses — the same
                tone the LurnyMagic booking form takes. */}
            <LeadForm content={specialist.form} tone="gold" />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
