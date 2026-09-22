"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { LeadForm } from "@/components/ui/LeadForm";
import { sop } from "@/content/sop";
import { cn } from "@/lib/utils";

import { formPointIcons, type FormPointIconKey } from "./SopIcons";

/**
 * SOP DEMO
 * ---------------------------------------------------------------------------
 * Section 6 of the LurnySOP page: the pitch on the left, the booking form on a
 * white card to the right.
 *
 * THE FORM IS THE SHARED LeadForm, not a copy of one — same validation, focus
 * management, honeypot and success state as every other page's. This design
 * asks for seven fields, which map onto the optional `organisation`,
 * `selectC` and `detail` the component already grew for other pages; nothing
 * here needed a change to it beyond its button tone.
 *
 * Its submit posts to /api/lead like the rest of the site. While the site
 * builds as a static export that endpoint is inert, so the form reports the
 * failure rather than claiming a false success — the same site-wide TODO every
 * other form carries.
 *
 * COLOURS ARE MEASURED from section6.png: the orange eyebrow (#f85b05), the
 * near-black headline (#0f092e), and the amber button (#f7a40a) which is the
 * new `sop` tone — see the note in LeadForm for why it is not `gold`.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { demo } = sop;

export function SopDemo() {
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
      id="book-a-demo"
      className={cn(
        "relative isolate overflow-hidden bg-[#fefbfa]",
        "py-16 sm:py-20 lg:py-24",
      )}
    >
      <Image
        src="/assets/images/sop/form-backdrop.webp"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="-z-10 object-cover"
      />

      <Container width="hero" className="relative">
        <div
          className={cn(
            "grid grid-cols-1 items-center gap-12",
            // Measured from the comp: the pitch runs to roughly 38% of the
            // frame, the form card takes the rest.
            "lg:grid-cols-[minmax(0,0.66fr)_minmax(0,1fr)] lg:gap-12",
            "xl:gap-16",
          )}
        >
          {/* ============================ Pitch ======================== */}
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "text-[0.75rem] font-semibold tracking-[0.14em] uppercase",
                "text-[#f85b05] sm:text-[0.8125rem]",
              )}
            >
              {demo.eyebrow}
            </motion.p>

            {/*
              Three lines at the comp's own breaks, each carrying a trailing
              space so the accessible name reads as a sentence rather than
              running the words together.
            */}
            <motion.h2
              {...rise(0.08)}
              className={cn(
                "mt-5 font-display font-bold tracking-[-0.035em]",
                "leading-[1.06] text-[#0f092e]",
                "text-[2rem] sm:text-[2.5rem] xl:text-[3rem]",
              )}
            >
              {demo.headline.map((line, index) => (
                <span key={line} className="block">
                  {line}
                  {index < demo.headline.length - 1 && " "}
                </span>
              ))}
            </motion.h2>

            <motion.p
              {...rise(0.16)}
              className={cn(
                "mt-6 max-w-[27rem] leading-relaxed text-pretty",
                "text-[1rem] text-[#32275a] sm:text-[1.0625rem]",
              )}
            >
              {demo.description}
            </motion.p>

            {/* The two points, under the rule the comp draws. */}
            <motion.ul
              {...rise(0.24)}
              className="mt-8 space-y-5 border-t border-[#ded6f0] pt-7"
            >
              {demo.points.map((point) => {
                const Glyph = formPointIcons[point.icon as FormPointIconKey];
                return (
                  <li key={point.text} className="flex items-start gap-4">
                    <span className="mt-0.5 shrink-0 text-[#6d4cf0]">
                      <Glyph className="size-7" />
                    </span>
                    <p className="max-w-[24rem] text-[0.9375rem] leading-relaxed text-pretty text-[#2e2259] sm:text-[1rem]">
                      {point.text}
                    </p>
                  </li>
                );
              })}
            </motion.ul>
          </div>

          {/* ============================ Form ========================= */}
          <motion.div
            {...rise(0.2)}
            /*
              A HAIRLINE FRAME, NOT A SECOND CARD. LeadForm renders its own
              panel, so generous padding here reads as two nested cards — which
              is what an earlier pass produced, and the comp shows one. This
              matches the thin frame SenseDemo puts around the same component.
            */
            className={cn(
              "rounded-[1.5rem] bg-white p-2 sm:p-2.5",
              "shadow-[0_30px_70px_-42px_rgb(40_20_90/0.4)]",
              "ring-1 ring-[#e7e1f8]",
            )}
          >
            <LeadForm content={demo.form} tone="sop" />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
