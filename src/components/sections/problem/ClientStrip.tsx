"use client";

import { motion, useReducedMotion } from "motion/react";

import { clientMarks } from "@/components/sections/problem/ClientMarks";
import { Container } from "@/components/ui/Container";
import { socialProof } from "@/content/problem";
import { cn } from "@/lib/utils";

/**
 * CLIENT STRIP
 * ---------------------------------------------------------------------------
 * The social-proof band: a small caps label above a row of client logos
 * separated by hairline dividers.
 *
 * On lg+ the eight marks sit on one row, as in the design. Below that they
 * wrap to a grid rather than shrinking — eight logos squeezed onto a phone
 * row would be illegible, and a horizontal scroller hides most of the proof.
 *
 * Marks fade in on scroll with a short stagger, left to right.
 */

export function ClientStrip() {
  const reduce = useReducedMotion();

  return (
    <div className="py-section-sm">
      <Container width="hero">
        <motion.p
          className={cn(
            "text-center font-mono text-[0.625rem] font-medium uppercase",
            "tracking-[0.2em] text-neutral-500 sm:text-[0.6875rem]",
          )}
          initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: reduce ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {socialProof.label}
        </motion.p>

        {/*
          A <ul> rather than a plain row: this is a list of organisations, and
          the marks are decorative, so each item supplies its own accessible
          name via the visually-hidden span.
        */}
        <ul
          className={cn(
            "mt-8 grid grid-cols-2 gap-y-8 sm:grid-cols-4",
            "lg:mt-9 lg:flex lg:items-center lg:justify-between lg:gap-0",
          )}
        >
          {socialProof.logos.map((logo, index) => {
            const Mark = clientMarks[logo.mark];

            return (
              <motion.li
                key={logo.name}
                className={cn(
                  "flex items-center justify-center",
                  // Hairline divider between marks, matching the design.
                  // Suppressed on the first item of each row.
                  "lg:flex-1 lg:border-l lg:border-neutral-200 lg:first:border-l-0",
                )}
                initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: reduce ? 0 : 0.5,
                  delay: reduce ? 0 : 0.08 + index * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <span
                  className={cn(
                    "duration-normal text-neutral-500 transition-colors",
                    "hover:text-neutral-700",
                  )}
                >
                  <Mark className="h-10 w-auto sm:h-11" />
                </span>
                {/* The marks are decorative; this is what is announced. */}
                <span className="sr-only">{logo.name}</span>
              </motion.li>
            );
          })}
        </ul>
      </Container>
    </div>
  );
}
