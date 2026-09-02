"use client";

import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { campus } from "@/content/campus";
import { cn } from "@/lib/utils";

import { passportIcons } from "./CampusIcons";
import { CampusPassportCard } from "./CampusPassportCard";

/**
 * CAMPUS — THE CAPABILITY PASSPORT
 * ---------------------------------------------------------------------------
 * Section 6: the claim on the left, the student's passport on the right.
 *
 * The pale mint ground is a flat colour. The design's corner ornaments — a
 * faint hex lattice top-right, a dotted field and an arc bottom-left — are
 * drawn here in SVG rather than shipped, since no asset folder was supplied
 * for this section and they are simple repeating geometry.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { passport } = campus;

export function CampusPassport() {
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
    <section className="relative isolate overflow-hidden bg-[#f7f9f7] py-20 lg:py-28">
      {/* ====================== Corner ornaments ===================== */}
      {/* A hex lattice in the top-right. Decorative. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 120 120"
        className="pointer-events-none absolute -top-6 right-0 -z-10 hidden size-72 lg:block"
      >
        <defs>
          <pattern
            id="campus-hex"
            width="30"
            height="26"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M15 1 28 8.5v15L15 31 2 23.5v-15z"
              fill="none"
              stroke="#cbd8d2"
              strokeWidth="0.7"
            />
          </pattern>
        </defs>
        <rect width="120" height="120" fill="url(#campus-hex)" opacity="0.75" />
      </svg>

      {/* A dotted field and a wide arc in the bottom-left. Decorative. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 200 200"
        className="pointer-events-none absolute bottom-0 -left-16 -z-10 hidden size-96 lg:block"
      >
        <defs>
          <pattern
            id="campus-dots"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1.2" fill="#d3ded8" />
          </pattern>
        </defs>
        <rect x="96" y="52" width="80" height="70" fill="url(#campus-dots)" />
        {[86, 100, 114].map((r) => (
          <circle
            key={r}
            cx="10"
            cy="180"
            r={r}
            fill="none"
            stroke="#dde6e1"
            strokeWidth="1"
          />
        ))}
      </svg>

      <Container width="wide" className="relative">
        <div
          className={cn(
            "grid grid-cols-1 items-center gap-14",
            // Measured from the design: the copy runs to roughly 34% of the
            // frame, the passport takes the rest.
            "lg:grid-cols-[minmax(0,0.56fr)_minmax(0,1fr)] lg:gap-10",
            "xl:gap-14",
          )}
        >
          {/* ========================== The claim ====================== */}
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "text-[0.75rem] font-bold tracking-[0.16em] uppercase",
                "text-[#fb4f40] sm:text-[0.8125rem]",
              )}
            >
              {passport.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.08)}
              className={cn(
                "mt-6 font-display font-bold tracking-[-0.03em]",
                "leading-[1.1] text-[#0b1a22]",
                // Measured from the design at ~46px on a 1440 frame.
                "text-[1.875rem] sm:text-[2.25rem] xl:text-[2.875rem]",
              )}
            >
              {passport.headline.map((line, index) => (
                <span key={line} className="inline lg:block">
                  {line}
                  {/* The coral full stop closes the last line. Decorative, so
                      hidden rather than announced as a stray glyph. */}
                  {index === passport.headline.length - 1 && (
                    <span aria-hidden="true" className="text-[#fb4f40]">
                      .
                    </span>
                  )}{" "}
                </span>
              ))}
            </motion.h2>

            <motion.p
              {...rise(0.16)}
              className={cn(
                "mt-6 max-w-[30rem] leading-relaxed text-pretty",
                "text-[1rem] text-[#3f5158] sm:text-[1.0625rem]",
              )}
            >
              {passport.description}
            </motion.p>

            {/* ------------------------ The points -------------------- */}
            <ul className="mt-10 space-y-8 lg:mt-12">
              {passport.points.map((point, index) => {
                const Icon = passportIcons[point.icon];

                return (
                  <motion.li
                    key={point.title}
                    {...rise(0.24 + index * 0.1)}
                    className="group/pt flex items-start gap-5"
                  >
                    <span
                      className={cn(
                        "grid size-14 shrink-0 place-items-center rounded-xl",
                        "bg-[#e4efe9] text-[#0d5451]",
                        "duration-normal transition-[background-color,translate] ease-out",
                        "will-change-[translate] group-hover/pt:-translate-y-0.5",
                        "group-hover/pt:bg-[#d6e8df]",
                      )}
                    >
                      <Icon className="size-8" />
                    </span>

                    <span className="min-w-0">
                      <span className="block text-[1.0625rem] font-bold text-pretty text-[#0b1a22]">
                        {point.title}
                      </span>
                      <span className="mt-1.5 block text-[0.9375rem] leading-relaxed text-pretty text-[#4a5a60]">
                        {point.description}
                      </span>
                    </span>
                  </motion.li>
                );
              })}
            </ul>
          </div>

          {/* ======================== The passport ===================== */}
          <CampusPassportCard />
        </div>
      </Container>
    </section>
  );
}
