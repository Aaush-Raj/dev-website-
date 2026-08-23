"use client";

import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { LeadForm } from "@/components/ui/LeadForm";
import { demo } from "@/content/demo";
import { cn } from "@/lib/utils";

/**
 * DEMO
 * ---------------------------------------------------------------------------
 * The closing conversion section: the pitch on the left, the booking form on
 * a raised near-white card to the right, both on the near-black ground.
 *
 * LAYOUT
 * A two-column grid on lg, with the statement column slightly narrower than
 * the form — the design measures roughly 0.85:1. Below lg the form drops
 * under the statement.
 *
 * The form itself is the shared LeadForm, which every demo-request form on the
 * site uses; only the copy and the button tone differ per page. Note that its
 * submit is not wired to any destination yet — see the note at the top of
 * components/ui/LeadForm.tsx.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

export function Demo() {
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
    <section id="demo" className="bg-[#131317] py-section-lg text-white">
      <Container width="hero">
        <div
          className={cn(
            "grid items-start gap-10",
            "lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-16",
          )}
        >
          {/* =========================== Statement ===================== */}
          <div className="lg:pt-1">
            <motion.p
              {...rise(0)}
              className={cn(
                "font-mono text-[0.625rem] font-semibold uppercase",
                "tracking-[0.16em] text-accent-400 sm:text-[0.6875rem]",
              )}
            >
              {demo.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.08)}
              className={cn(
                "mt-6 font-display font-bold tracking-[-0.03em]",
                // Design sets the lines tight — a stacked, poster-like block.
                "leading-[1.04] text-white",
                // Measured from the design at ~53px on a 1440 frame.
                "text-[2.125rem] sm:text-[2.75rem] xl:text-[3.3125rem]",
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
                // Narrow measure, matching the design's four-line wrap rather
                // than letting the paragraph run the full column.
                "mt-6 max-w-96 leading-relaxed text-pretty",
                "text-[0.9375rem] text-neutral-300 sm:text-base",
              )}
            >
              {demo.description}
            </motion.p>

            {/* Rule, then the two mono notes. */}
            <motion.div
              {...rise(0.24)}
              className="mt-9 max-w-136 border-t border-white/15 pt-5"
            >
              {demo.notes.map((note, index) => (
                <p
                  key={note}
                  className={cn(
                    "font-mono text-[0.75rem] leading-relaxed text-pretty",
                    "text-neutral-400",
                    index > 0 && "mt-3",
                  )}
                >
                  {note}
                </p>
              ))}
            </motion.div>
          </div>

          {/* ============================= Form ======================== */}
          {/*
            The card is white on the dark ground, so it needs no shadow to
            separate — the contrast does that. A shadow here would only muddy
            the edge against the near-black.
          */}
          <motion.div
            {...rise(0.2)}
            className="rounded-xl bg-white p-2 sm:p-2.5"
          >
            <LeadForm content={demo.form} tone="brand" />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
