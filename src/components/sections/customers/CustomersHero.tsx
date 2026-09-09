"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { customers } from "@/content/customers";
import { cn } from "@/lib/utils";

/**
 * CUSTOMER STORIES HERO
 * ---------------------------------------------------------------------------
 * Section 1: the dark opening of the customer stories index. Copy on the left,
 * the paper quotation sculpture on the right, and a rule of sector links along
 * the foot.
 *
 * THE BACKGROUND IS DRAWN, NOT SHIPPED. The supplied plate is a 1.6MB PNG of
 * near-flat charcoal carrying two things: a paper grain and a fan of lilac and
 * gold filaments in the bottom-right corner. The grain is redrawn as a
 * repeating gradient; the filaments are cut out of the plate and thresholded to
 * alpha. Between them the page carries 23KB instead of 1.6MB, and neither
 * brings a second black along that would have to be matched.
 *
 * The sculpture ships too, because it is a photographed physical object. Its
 * charcoal field is baked in rather than transparent, so the section ground is
 * matched to it exactly — rgb(10,10,10), sampled off the asset's own corners —
 * and the edges are faded so the field's bounding box does not read.
 */

const { hero } = customers;

/** Motion's string easings are not typed, so the cubic curve is spelled out. */
const easeOut = [0.16, 1, 0.3, 1] as const;

export function CustomersHero() {
  const reduce = useReducedMotion();

  /*
    `margin` matters here, not just `amount`. The sector rail sits at the foot
    of a tall hero — on a phone it lands a few pixels below the fold, and with a
    plain "some" threshold it never satisfied the observer on first paint, so it
    stayed at opacity 0 with an empty band where it should be. Extending the
    root box past the bottom edge lets anything just off-screen resolve. The
    margin is POSITIVE: a negative bottom margin shrinks the observer's box,
    which is the opposite of what an element below the fold needs.
  */
  const rise = (delay: number) => ({
    initial: reduce ? "shown" : "hidden",
    whileInView: "shown",
    viewport: {
      once: true,
      amount: "some",
      margin: "0px 0px 15% 0px",
    } as const,
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
        "relative isolate overflow-hidden",
        // Sampled off the sculpture asset's own corners, which are rgb(10,10,10).
        // The two grounds must match EXACTLY: the sculpture's charcoal field is
        // baked in, not transparent, so any difference draws its bounding box.
        "bg-[#0a0a0a] text-white",
        // Clearance for the floating nav pill, which overlays the page.
        "pt-28 pb-10 sm:pt-32 lg:pt-36 lg:pb-12",
      )}
    >
      {/* ===================== Background: paper grain ==================== */}
      {/*
        The supplied plate's texture, drawn. Two repeating gradients at a
        fraction of a percent opacity read as tooth on a near-black ground
        without banding the way a lightened solid would.

        IT STOPS BEFORE THE SCULPTURE. Measuring the render showed the ground
        averaging 12.0 in luminance against the sculpture's baked-in field at
        11.0 — a one-point step, invisible in isolation but enough to draw the
        field's bounding box as a rectangle. The grain was the whole difference:
        it landed on the ground and not on the field. So it is masked to fade
        out across the copy column, and the sculpture sits on flat black exactly
        as its own field does.
      */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 -z-10",
          // The mask is a left/right split, which only means anything while the
          // layout is side by side. Stacked, the sculpture sits above the copy
          // and the grain is masked top-to-bottom instead.
          "[mask-image:linear-gradient(to_bottom,transparent_0%,transparent_38%,black_52%)]",
          "lg:[mask-image:linear-gradient(to_right,black_0%,black_34%,transparent_46%)]",
          "bg-[repeating-linear-gradient(27deg,rgb(255_255_255/0.014)_0px,rgb(255_255_255/0.014)_1px,transparent_1px,transparent_3px),repeating-linear-gradient(-53deg,rgb(255_255_255/0.01)_0px,rgb(255_255_255/0.01)_1px,transparent_1px,transparent_4px)]",
        )}
      />

      {/*
        A soft lift behind the copy, so the headline sits on a slightly warmer
        ground than the corner it shares the frame with.

        It stops at 46% of the frame ON PURPOSE. The sculpture's field is a flat
        rgb(10,10,10) rectangle; lighting the ground anywhere it touches makes
        that rectangle's edge visible. Everything right of the copy stays at the
        section's own black.
      */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -z-10",
          "-top-1/4 -left-1/4 h-[110%] w-[46%]",
          "bg-[radial-gradient(ellipse_at_center,rgb(120_86_190/0.10),transparent_70%)]",
        )}
      />

      {/* ==================== Background: corner filaments ================ */}
      {/*
        Extracted from the supplied plate rather than redrawn. Three passes at
        approximating these curves in SVG all failed in instructive ways — a
        stretched square viewBox flattened them into straight radiating lines,
        true circles proved wrong (fitting a circle to two different filaments
        gives two different centres), and hand-fitted beziers never matched the
        real sweep. The art already existed as pixels, so it is used as pixels.

        It is thresholded to alpha on the way out: the plate's ground is dropped
        and only saturated pixels survive, which is what lets the corner sit on
        the section's own black instead of carrying a second one. That, plus
        cropping to the corner it actually occupies, is why this is 23KB rather
        than the plate's 1.6MB.
      */}
      <motion.div
        aria-hidden="true"
        initial={reduce ? { opacity: 1 } : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, delay: 0.4, ease: easeOut }}
        className={cn(
          // Damped: the extraction normalises every surviving pixel to full
          // saturation, which reads hotter than the plate it came from.
          "pointer-events-none absolute -z-10 opacity-55",
          // Below lg the layout stacks and there is no empty corner for the fan
          // to occupy — it landed across the CTA and the sector rail. It is a
          // decorative flourish, so it simply does not appear there.
          "hidden lg:block",
          // The plate places the fan in the bottom-right corner, spanning from
          // ~59% across and ~52% down to both edges.
          "right-0 bottom-0 h-[48%] w-[41%]",
        )}
      >
        <Image
          src="/assets/images/customers/hero-filaments.webp"
          alt=""
          width={694}
          height={452}
          className="h-full w-full object-cover object-right-bottom"
        />
      </motion.div>

      <Container width="hero">
        <div
          className={cn(
            "grid items-center gap-10",
            // The design gives the copy ~36% of the frame and the sculpture the
            // rest, overlapping the gutter on the right.
            "lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-6",
          )}
        >
          {/* ============================ Copy ========================== */}
          <div className="lg:py-10">
            <motion.p
              {...rise(0)}
              className={cn(
                "text-[0.75rem] font-medium tracking-[0.18em] uppercase",
                "text-brand-300",
              )}
            >
              {hero.eyebrow}
            </motion.p>

            <motion.h1
              {...rise(0.08)}
              className={cn(
                "mt-6 font-serif font-normal tracking-[-0.015em]",
                "leading-[1.06] text-balance",
                // Measured from the design at ~86px on a 1440 frame.
                "text-[2.75rem] sm:text-[3.75rem] xl:text-[4.5rem]",
              )}
            >
              {hero.headline}
            </motion.h1>

            <motion.p
              {...rise(0.16)}
              className={cn(
                "mt-8 max-w-[30rem] leading-relaxed text-pretty",
                "text-[1rem] text-neutral-400 sm:text-[1.0625rem]",
              )}
            >
              {hero.description}
            </motion.p>

            {/* --------------------------- CTA ------------------------- */}
            <motion.div {...rise(0.24)} className="mt-10">
              <Link
                href={hero.cta.href}
                className={cn(
                  "group inline-flex items-center gap-4",
                  "bg-brand-600 px-8 py-4.5",
                  "text-[0.9375rem] font-medium text-white",
                  "duration-normal transition-[background-color,translate,box-shadow] ease-out",
                  "will-change-[translate]",
                  "hover:-translate-y-0.5 hover:bg-brand-500",
                  "hover:shadow-[0_1rem_2rem_-0.75rem_rgb(107_70_193/0.65)]",
                  "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand-300",
                )}
              >
                {hero.cta.label}
                {/*
                  A down arrow, not a right one: the link scrolls further down
                  this page rather than navigating away.
                */}
                <svg
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                  className={cn(
                    "h-4 w-4 shrink-0",
                    "duration-normal transition-[translate] ease-out",
                    "group-hover:translate-y-0.5",
                  )}
                >
                  <path
                    d="M8 2v12M3.5 9.5 8 14l4.5-4.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </motion.div>
          </div>

          {/* ========================= Sculpture ======================== */}
          <motion.div
            initial={reduce ? "shown" : "hidden"}
            whileInView="shown"
            viewport={{ once: true, amount: "some" }}
            variants={{
              hidden: { opacity: 0, scale: 0.94 },
              shown: {
                opacity: 1,
                scale: 1,
                transition: { duration: 1, delay: 0.15, ease: easeOut },
              },
            }}
            className={cn(
              "relative order-first lg:order-none",
              // The design runs the sculpture past the right gutter. Negative
              // margin lets it bleed there without widening the grid track.
              "lg:-mr-[6%]",
            )}
          >
            <Image
              src={hero.image.src}
              alt={hero.image.alt}
              width={1066}
              height={764}
              // The page's LCP image, so it must not lazy-load.
              priority
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="h-auto w-full object-contain"
            />

            {/*
              The crop keeps a hair of the sculpture's own charcoal field. These
              two gradients fade its edges into the section ground so no seam
              reads, top and bottom being where the field is widest.

              The stops are generous because the field is a hard-edged rectangle:
              a short fade moves the seam rather than hiding it. The left edge
              gets the longest ramp of the four — it is the one that lands in
              open frame beside the copy, where a seam would be plainly visible,
              while the others run out past the container.
            */}
            <div
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute inset-0",
                // Fixed lengths, not percentages. Percentage stops scale with
                // the image, so a ramp wide enough at 1440 collapses to a few
                // pixels on a phone and the field's rectangle reappears.
                "bg-[linear-gradient(to_bottom,#0a0a0a_0,transparent_5rem,transparent_calc(100%-5rem),#0a0a0a_100%),linear-gradient(to_right,#0a0a0a_0,transparent_5rem,transparent_calc(100%-4rem),#0a0a0a_100%)]",
              )}
            />
          </motion.div>
        </div>

        {/* ========================== Sector rail ======================== */}
        <motion.nav
          {...rise(0.36)}
          aria-label="Stories by sector"
          className={cn(
            "mt-10 border-t pt-7 lg:mt-12",
            // The design's rule is a warm hairline, not a neutral one.
            "border-[#c9a24a]/22",
          )}
        >
          <ul
            className={cn(
              "grid gap-x-6 gap-y-4",
              "sm:grid-cols-2 lg:flex lg:justify-between",
            )}
          >
            {hero.sectors.map((sector) => (
              <li key={sector.label}>
                <Link
                  href={sector.href}
                  className={cn(
                    "text-[0.9375rem] text-neutral-300",
                    "duration-normal transition-colors ease-out",
                    "hover:text-white",
                    "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-300",
                  )}
                >
                  {sector.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.nav>
      </Container>
    </section>
  );
}
