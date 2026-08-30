"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { resources } from "@/content/resources";
import { cn } from "@/lib/utils";

/**
 * RESOURCES CLOSING
 * ---------------------------------------------------------------------------
 * Section 9 of the Resources page: the closing call to action — the statement
 * on the left, the ecosystem sculpture on the right with its four parts
 * labelled.
 *
 * THE LABELS
 * Positioned as percentages of the ARTWORK rather than of the column, which is
 * why the asset is trimmed of its transparent padding first (see
 * scripts/build-ecosystem-sculpture.cjs). Against the untrimmed square those
 * percentages would be measured off empty space and every label would drift.
 *
 * They are `aria-hidden`: the sculpture's own alt text already names what the
 * arrangement shows, and reading four floating words out of context would only
 * add noise. Below lg they are dropped entirely — at that size the sculpture is
 * small enough that four overlaid captions collide into illegibility.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { closing } = resources;

export function ResourcesClosing() {
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
        "relative isolate overflow-hidden py-section-lg",
        // The cream ground, sampled from the design.
        "bg-[#f3ede5]",
      )}
    >
      <ClosingBackdrop />

      <Container width="wide" className="relative">
        <div
          className={cn(
            "grid items-center gap-12",
            // The sculpture takes slightly more than the statement, as the
            // design measures it.
            "lg:grid-cols-[minmax(0,1fr)_minmax(0,0.96fr)] lg:gap-10",
            "xl:gap-16",
          )}
        >
          {/* =========================== Statement ===================== */}
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "text-[0.6875rem] font-bold uppercase",
                "tracking-[0.16em] text-[#3e0cb5] sm:text-xs",
              )}
            >
              {closing.eyebrow}
            </motion.p>

            {/*
              Set in the SERIF (Playfair Display), not the sans `font-display`
              the rest of this page uses. The design switches face here to mark
              the close, and the family is already loaded for the dark-section
              headings elsewhere in the site.
            */}
            <motion.h2
              {...rise(0.08)}
              className={cn(
                "mt-7 font-serif font-bold tracking-[-0.02em]",
                "leading-[1.04] text-neutral-950",
                // Measured from the design at ~76px on a 1440 frame.
                "text-[2.5rem] sm:text-[3.25rem] xl:text-[4.25rem]",
              )}
            >
              {closing.headline.map((line) => (
                <span key={line} className="inline lg:block">
                  {line}{" "}
                </span>
              ))}
            </motion.h2>

            <motion.p
              {...rise(0.16)}
              className={cn(
                "mt-8 max-w-116 leading-relaxed text-pretty",
                "text-[1rem] text-neutral-700 sm:text-lg",
              )}
            >
              {closing.description.map((line) => (
                // The authored breaks hold once there is room for them; below
                // lg the lines wrap naturally.
                <span key={line} className="inline lg:block">
                  {line}{" "}
                </span>
              ))}
            </motion.p>

            <motion.div {...rise(0.24)} className="mt-10">
              <Link
                href={closing.action.href}
                className={cn(
                  "group/cta inline-flex h-15 items-center justify-center gap-4 rounded-lg px-9",
                  "bg-[#5120c3] text-[1.0625rem] font-semibold text-white",
                  // `translate`, not `transform`: Tailwind v4 compiles the
                  // translate utilities to the standalone property.
                  "duration-normal transition-[background-color,box-shadow,translate] ease-out",
                  "will-change-[translate]",
                  "hover:-translate-y-0.5 hover:bg-[#6329e0]",
                  "hover:shadow-[0_18px_38px_-14px_rgb(81_32_195/0.6)]",
                  "active:translate-y-0",
                )}
              >
                {closing.action.label}
                <ArrowIcon
                  className={cn(
                    "size-5",
                    "duration-normal transition-[translate] ease-out",
                    "group-hover/cta:translate-x-1",
                  )}
                />
              </Link>
            </motion.div>
          </div>

          {/* ========================== Sculpture ====================== */}
          <motion.div
            initial={reduce ? "shown" : "hidden"}
            whileInView="shown"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: { opacity: 0, y: 28, scale: 0.97 },
              shown: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 0.85, delay: 0.2, ease: easeOut },
              },
            }}
            // `relative` anchors the labels; the box is sized by the image so
            // the label percentages land on the artwork itself.
            className="relative mx-auto w-full max-w-132 lg:max-w-none"
          >
            <Image
              src={closing.sculpture.src}
              alt={closing.sculpture.alt}
              width={closing.sculpture.width}
              height={closing.sculpture.height}
              sizes="(min-width: 1024px) 46vw, 90vw"
              className="h-auto w-full"
            />

            {/* The four part labels. */}
            {closing.parts.map((part, index) => (
              <motion.span
                key={part.label}
                aria-hidden="true"
                initial={reduce ? { opacity: 1 } : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: 0.55 + index * 0.09,
                  ease: easeOut,
                }}
                style={{ left: `${part.x}%`, top: `${part.y}%` }}
                className={cn(
                  "absolute -translate-x-1/2 -translate-y-1/2",
                  // lg-only: see the note at the top of this file.
                  "hidden lg:flex lg:flex-col lg:items-center lg:gap-1.5",
                )}
              >
                <span
                  className={cn(
                    "text-[0.6875rem] font-bold whitespace-nowrap uppercase",
                    "tracking-[0.14em] text-neutral-900",
                  )}
                >
                  {part.label}
                </span>
                {/* Each piece's own colour, sampled from the design. */}
                <span
                  className="size-1.5 rounded-full"
                  style={{ backgroundColor: part.dot }}
                />
              </motion.span>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

/**
 * The faint concentric rings the design places in the upper-right and
 * lower-left corners.
 *
 * Drawn rather than shipped — flat geometry that reflows with the section
 * instead of letterboxing the way a fixed raster would.
 */
function ClosingBackdrop() {
  return (
    <>
      <svg
        aria-hidden="true"
        viewBox="0 0 200 200"
        fill="none"
        className={cn(
          "pointer-events-none absolute -top-16 -right-12 -z-10",
          "hidden h-72 w-72 lg:block",
        )}
      >
        <g stroke="rgb(120 100 82 / 0.28)" strokeWidth="0.8">
          <circle cx="130" cy="70" r="52" />
          <circle cx="130" cy="70" r="78" />
          <circle
            cx="130"
            cy="70"
            r="100"
            strokeDasharray="1.6 5"
            strokeLinecap="round"
          />
        </g>
      </svg>

      <svg
        aria-hidden="true"
        viewBox="0 0 200 200"
        fill="none"
        className={cn(
          "pointer-events-none absolute -bottom-20 -left-14 -z-10",
          "hidden h-64 w-64 sm:block",
        )}
      >
        <g stroke="rgb(120 100 82 / 0.26)" strokeWidth="0.8">
          <circle cx="70" cy="130" r="46" />
          <circle cx="70" cy="130" r="72" />
          <circle
            cx="70"
            cy="130"
            r="94"
            strokeDasharray="1.6 5"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </>
  );
}

/** The arrow on the closing action. */
function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M3.5 10h12m0 0-4.4-4.4M15.5 10l-4.4 4.4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
