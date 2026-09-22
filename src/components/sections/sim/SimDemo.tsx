"use client";

import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { LeadForm } from "@/components/ui/LeadForm";
import { sim } from "@/content/sim";
import { cn } from "@/lib/utils";

import { ClockIcon, ScenariosIcon } from "./SimIcons";

/**
 * LURNYSIM — BOOK A DEMO
 * ---------------------------------------------------------------------------
 * Section 5: the pitch on the left, the booking form on a card to the right.
 *
 * THE FORM IS THE SHARED LeadForm, not a copy of one — same validation, focus
 * management and success state as every other page's booking form. This
 * design asks for SEVEN fields, and every one of them is an option the form
 * already carries (`organisation`, `selectC`, `detail`), so it needed no new
 * prop and no fork.
 *
 * Its submit is still not wired to any destination; that TODO is one fix for
 * the whole site rather than one per page.
 *
 * THE VIOLET FIELDS ARE THIS PAGE'S OWN. The shared form draws neutral
 * borders and grey placeholders, and this design draws both in violet. Rather
 * than add a skin prop that only one caller would ever pass, the wrapper
 * restyles them with scoped variants — if the form's internals change, the
 * fields fall back to the shared look rather than breaking.
 *
 * NOTHING SHIPS. The supplied plate is a near-flat ivory with soft lavender
 * and peach washes at the corners, so it costs three gradients instead; the
 * two point marks render at 22px.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { demo } = sim;

/** Point icons, keyed by the name in the content file. */
const pointIcons = {
  clock: ClockIcon,
  scenarios: ScenariosIcon,
} as const;

export function SimDemo() {
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduce ? "shown" : "hidden",
    whileInView: "shown",
    /*
      A generous bottom margin. This section closes the page, so it is always
      the furthest below the fold — the failure every long section on this
      build has hit.
    */
    viewport: {
      once: true,
      amount: "some",
      margin: "0px 0px 200% 0px",
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
      // The hero's "Book a Demo" CTA can point here.
      id="demo"
      className={cn(
        "relative isolate overflow-hidden",
        // Sampled from the design: a warm ivory.
        "bg-[#faf9f9] text-[#0d0128]",
        "py-16 sm:py-20 lg:py-24",
      )}
    >
      {/* ========================= Background ========================= */}
      {/*
        The design's soft washes: peach top-right, lavender bottom-left, and a
        faint second lavender low on the right. Gradients rather than a plate
        — the ground is flat ivory almost everywhere.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <span className="absolute -top-[22%] -right-[8%] size-[26rem] rounded-full bg-[#fbe4cd] opacity-75 blur-3xl" />
        <span className="absolute -bottom-[30%] -left-[10%] size-[30rem] rounded-full bg-[#ded4fb] opacity-70 blur-3xl" />
        <span className="absolute -right-[16%] -bottom-[36%] size-[24rem] rounded-full bg-[#e9e0fc] opacity-55 blur-3xl" />
      </div>

      <Container width="hero" className="relative">
        <div
          className={cn(
            "grid items-center gap-12",
            // The form needs the greater share: seven fields and a textarea
            // against a claim and two points.
            "lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-12 xl:gap-16",
            // Grid items default to `min-width: auto`; without this the
            // form's widest row can force its column past the container.
            "[&>*]:min-w-0",
          )}
        >
          {/* ========================= Statement ======================= */}
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "font-display text-[0.9375rem] font-bold tracking-[0.14em] uppercase",
                "text-[#f94c03]",
              )}
            >
              {demo.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.08)}
              className={cn(
                "mt-6 font-display font-bold tracking-[-0.035em]",
                "leading-[1.06] text-[#0d0128]",
                // Measured from the design at ~58px on a 1440 frame.
                "text-[2.125rem] sm:text-[2.625rem] xl:text-[3.25rem]",
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
                "text-[1.0625rem] text-[#2b0c6f] sm:text-[1.125rem]",
              )}
            >
              {demo.description}
            </motion.p>

            {/* Rule, then the two icon points. */}
            <motion.ul
              {...rise(0.24)}
              className="mt-9 max-w-[30rem] border-t border-[#0d0128]/12 pt-8"
            >
              {demo.points.map((point, index) => {
                const Icon = pointIcons[point.icon];
                return (
                  <li
                    key={point.text}
                    className={cn(
                      "group/point flex items-start gap-4",
                      index > 0 && "mt-6",
                    )}
                  >
                    <Icon
                      className={cn(
                        "mt-0.5 size-[1.625rem] shrink-0 text-[#6d28ff]",
                        "duration-normal transition-[scale] ease-out",
                        "will-change-[scale] group-hover/point:scale-110",
                      )}
                    />
                    <span
                      className={cn(
                        "text-[1.0625rem] leading-relaxed",
                        "text-pretty text-[#28086b]",
                      )}
                    >
                      {point.text}
                    </span>
                  </li>
                );
              })}
            </motion.ul>
          </div>

          {/* ============================= Form ======================== */}
          {/*
            A white card with a violet hairline, per the design. The scoped
            variants below restyle the shared form's fields to this page's
            violet — see the note in the file header.
          */}
          <motion.div
            {...rise(0.2)}
            className={cn(
              "rounded-[1.25rem] bg-white p-5 sm:p-7",
              "ring-1 ring-[#c8bcff]",
              "shadow-[0_1.5rem_3.5rem_-1.75rem_rgb(45,20,110,0.28)]",
              // Fields: violet border and placeholder, as the design draws.
              "[&_input]:border-[#c8bcff] [&_select]:border-[#c8bcff] [&_textarea]:border-[#c8bcff]",
              "[&_input::placeholder]:text-[#7439ff] [&_textarea::placeholder]:text-[#7439ff]",
              // The selects show their resting option in the same violet.
              "[&_select]:text-[#7439ff]",
              // The footnote link is orange here, not the shared brand violet.
              "[&_a]:text-[#f9611f] [&_a:hover]:text-[#e0500f]",
            )}
          >
            {/*
              `accent` (#fc9a16) is the closest tone to the design's #f7a41a.
              The className flattens the form's own grey panel: this design
              draws ONE white card, and the shared form's default nests a
              second surface inside it.
            */}
            <LeadForm
              content={demo.form}
              tone="accent"
              className="bg-transparent p-0"
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
