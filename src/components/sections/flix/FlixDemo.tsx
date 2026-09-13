"use client";

import { motion, useReducedMotion } from "motion/react";

import { ClockIcon } from "@/components/sections/model/ModelIcons";
import { Container } from "@/components/ui/Container";
import { LeadForm } from "@/components/ui/LeadForm";
import { flix } from "@/content/flix";
import { cn } from "@/lib/utils";

/**
 * LURNYFLIX DEMO
 * ---------------------------------------------------------------------------
 * Section 8: the closing conversion section — the pitch on the left, the
 * booking form on a raised card to the right.
 *
 * THE FORM IS THE SHARED LeadForm, not a copy of one. Same validation, same
 * error handling, same success state as the homepage and every product page;
 * only the copy and the amber button tone differ, and both are already props.
 * That also means the eventual submit wiring is one fix for every page — see
 * the TODO at the top of components/ui/LeadForm.tsx. NOTHING IS SENT TODAY.
 *
 * The design asks for seven fields where most pages ship five. They map onto
 * the contract's optional slots exactly — `organisation` plus `selectC` — so
 * this page needed no change to the shared component.
 *
 * UNLIKE EVERY OTHER SECTION ON THIS PAGE, the controls here are REAL
 * controls rather than drawings of them. Sections 1 and 3 to 7 wrap their
 * product illustrations in <Uncopyable> precisely because those are pictures
 * of an interface; this is the one place someone is meant to type, so there is
 * no Uncopyable and nothing is aria-hidden.
 *
 * The soft corner blobs are the design's, drawn in CSS rather than shipped —
 * large, heavily blurred shapes cost nothing as gradients and stay crisp at
 * any viewport. No raster is used in this section at all.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { demo } = flix;

/** The mark beside each point. */
const pointIcons = {
  clock: ClockIcon,
  video: VideoIcon,
} as const;

export function FlixDemo() {
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
      // The hero's "Explore video tools" CTA points here — it is the page's
      // one place to act, and until this section existed that anchor was dead.
      id="tools"
      className="relative isolate overflow-hidden bg-[#faf7f2] py-section-lg"
    >
      {/* The design's two soft blobs. Decorative, so they are drawn rather
          than shipped and hidden from the reading order. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div
          className={cn(
            "absolute -top-[18%] right-[-8%] size-[38rem] rounded-full",
            "bg-[#fde8c8] opacity-70 blur-[90px]",
          )}
        />
        <div
          className={cn(
            "absolute -bottom-[22%] left-[-10%] size-[34rem] rounded-full",
            "bg-[#e2dafa] opacity-70 blur-[90px]",
          )}
        />
      </div>

      <Container width="hero">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1fr)] lg:gap-14 xl:gap-20">
          {/* ========================= Left column ==================== */}
          <div>
            <motion.p
              {...rise(0.05)}
              className={cn(
                "text-[0.6875rem] font-bold uppercase sm:text-xs",
                "tracking-[0.16em] text-[#e07b1a]",
              )}
            >
              {demo.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.12)}
              className={cn(
                "mt-5 font-display font-bold tracking-[-0.035em]",
                "leading-[1.06] text-[#171326]",
                "text-[2rem] sm:text-[2.375rem] xl:text-[2.875rem]",
              )}
            >
              {demo.headline.map((line) => (
                <span key={line} className="inline lg:block">
                  {line}{" "}
                </span>
              ))}
            </motion.h2>

            <motion.p
              {...rise(0.2)}
              className={cn(
                "mt-6 max-w-[30rem] leading-relaxed text-pretty",
                "text-[0.9375rem] text-[#3f3a52] sm:text-[1rem]",
              )}
            >
              {demo.description}
            </motion.p>

            {/* ------------------------ The points ------------------ */}
            {/* The design rules them off from the copy above. */}
            <ul className="mt-9 space-y-5 border-t border-[#1b1230]/12 pt-8">
              {demo.points.map((point, index) => {
                const Icon = pointIcons[point.icon];

                return (
                  <motion.li
                    key={point.text}
                    {...rise(0.3 + index * 0.1)}
                    className="flex items-start gap-4"
                  >
                    <span
                      className={cn(
                        "flex size-9 shrink-0 items-center justify-center",
                        "rounded-lg ring-1 ring-[#6d28d9]/35",
                      )}
                    >
                      <Icon className="size-[1.15rem] text-[#6d28d9]" />
                    </span>

                    <span className="max-w-[24rem] text-[0.9375rem] leading-relaxed text-[#2f2941]">
                      {point.text}
                    </span>
                  </motion.li>
                );
              })}
            </ul>
          </div>

          {/* =========================== The form ===================== */}
          {/* Real controls — see the note at the top of the file. */}
          <motion.div
            initial={
              reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: "some" }}
            transition={{ duration: 0.7, delay: 0.2, ease: easeOut }}
            /*
             * A THIN frame only — LeadForm brings its own padded white panel,
             * so a caller that adds real padding here renders a card inside a
             * card. The design draws one bordered card, which is this frame
             * plus the form's own panel.
             */
            className={cn(
              "rounded-[1.4rem] bg-white p-1.5 sm:p-2",
              "shadow-[0_30px_70px_-32px_rgb(40_20_90/0.3)]",
              "ring-1 ring-[#6d28d9]/20",
            )}
          >
            <LeadForm content={demo.form} tone="accent" />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

/* ========================================================================== */
/*  Icons                                                                     */
/* ========================================================================== */

/**
 * The second point's mark — a play tile.
 *
 * Drawn here rather than taken from the shared set: ModelIcons has no video
 * glyph, and the pack supplies this one at 80x80, which is line art at the
 * size this section renders it.
 */
function VideoIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect
        x="2.6"
        y="4.4"
        width="18.8"
        height="15.2"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path d="M10 8.8 16.2 12 10 15.2V8.8Z" fill="currentColor" />
    </svg>
  );
}
