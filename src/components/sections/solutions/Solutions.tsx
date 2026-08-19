"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { ArrowRightIcon } from "@/components/sections/hero/DashboardIcons";
import { Container } from "@/components/ui/Container";
import { solutions } from "@/content/solutions";
import { cn } from "@/lib/utils";

/**
 * SOLUTIONS
 * ---------------------------------------------------------------------------
 * A 2x3 grid of solution cards: coloured top rule, photo, title, description
 * and the product tags that power each solution.
 *
 * Cards animate in with a diagonal stagger and lift on hover, with the photo
 * scaling slightly inside its frame — a common affordance that reads as
 * "this is a link" without needing a visible button.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

/** Top-rule colour. Only "Sales Enablement" is amber in the design. */
const accentRule = {
  brand: "bg-brand-700",
  amber: "bg-accent-500",
} as const;

export function Solutions() {
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: {
      duration: reduce ? 0 : 0.6,
      delay: reduce ? 0 : delay,
      ease: easeOut,
    },
  });

  return (
    <section id="solutions" className="bg-surface-subtle py-section-lg">
      <Container width="hero">
        {/* ============================== Header ======================== */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "font-mono text-[0.625rem] font-semibold uppercase",
                "tracking-[0.16em] text-brand-700 sm:text-[0.6875rem]",
              )}
            >
              {solutions.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.08)}
              className={cn(
                "mt-5 font-display font-bold tracking-[-0.025em]",
                "leading-[1.08] text-neutral-900",
                // Measured from the design at ~39px on a 1440 frame.
                "text-[1.75rem] sm:text-[2.125rem] xl:text-[2.4375rem]",
              )}
            >
              {/* `inline lg:block` puts the break where the design has it
                  without forcing two fixed lines onto a narrow screen. */}
              {solutions.headline.map((line, index) => (
                <span key={line} className="inline lg:block">
                  {line}
                  {index === 0 ? " " : null}
                </span>
              ))}
            </motion.h2>
          </div>

          <motion.div {...rise(0.16)} className="lg:pb-2">
            <Link
              href={solutions.link.href}
              className={cn(
                "group inline-flex items-center gap-2 rounded-md",
                "text-[0.9375rem] font-semibold text-brand-700",
                "duration-fast transition-colors hover:text-brand-800",
              )}
            >
              {solutions.link.label}
              <ArrowRightIcon
                className={cn(
                  "duration-normal size-4 transition-transform ease-out",
                  "group-hover:translate-x-1",
                )}
              />
            </Link>
          </motion.div>
        </div>

        {/* =============================== Grid ======================== */}
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
          {solutions.items.map((item, index) => {
            // Diagonal stagger: cards further from the top-left start later.
            const column = index % 3;
            const row = Math.floor(index / 3);

            return (
              <motion.li
                key={item.title}
                initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: reduce ? 0 : 0.55,
                  delay: reduce ? 0 : 0.06 * (column + row),
                  ease: easeOut,
                }}
              >
                <article
                  className={cn(
                    "group flex h-full flex-col overflow-hidden rounded-xl",
                    "border border-neutral-200/70 bg-white",
                    "duration-normal transition-[border-color,box-shadow,transform] ease-out",
                    "hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-lg",
                  )}
                >
                  {/* Coloured top rule */}
                  <span
                    aria-hidden="true"
                    className={cn("h-[3px] w-full", accentRule[item.accent])}
                  />

                  {/* Photo. The design crops to roughly 2.23:1 — wider than
                      16:9 — which keeps the image a band across the card top
                      rather than letting it dominate. object-cover means a
                      replacement photo of any aspect ratio still sits right. */}
                  <div className="relative aspect-[20/9] overflow-hidden bg-neutral-200">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className={cn(
                        "object-cover",
                        "duration-slow transition-transform ease-out",
                        "group-hover:scale-[1.03]",
                      )}
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <h3 className="text-lg font-semibold tracking-[-0.01em] text-neutral-900 sm:text-xl">
                      {item.title}
                    </h3>

                    <p className="mt-2.5 text-sm leading-relaxed text-pretty text-neutral-600">
                      {item.description}
                    </p>

                    {/* Product tags. mt-auto pins them to the card's foot so
                        they align across a row of uneven descriptions. */}
                    <ul className="mt-auto flex flex-wrap gap-2 pt-5">
                      {item.tags.map((tag) => (
                        <li key={tag}>
                          <span
                            className={cn(
                              "inline-flex items-center rounded-md border border-brand-200",
                              "px-2.5 py-1.5 font-mono text-[0.625rem] font-medium uppercase",
                              "tracking-[0.08em] text-brand-700",
                            )}
                          >
                            {tag}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </motion.li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
