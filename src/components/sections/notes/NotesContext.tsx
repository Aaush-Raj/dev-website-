"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { notes } from "@/content/notes";
import { cn } from "@/lib/utils";

/**
 * NOTES CONTEXT
 * ---------------------------------------------------------------------------
 * Section 3 of the LurnyNotes page: the statement and three capability notes on
 * the left, the flow diagram on the right — incoming email, context check,
 * drafted reply in Teams.
 *
 * THE DIAGRAM
 * One supplied image rather than markup. It is a dense product mockup, and the
 * design ships it composed; see scripts/build-notes-context-assets.cjs.
 *
 * On lg it bleeds past the container's right edge, as the design shows — the
 * Teams window is deliberately cropped by the viewport, which is what gives the
 * section its sense of scale. Below lg it sits fully inside the gutter, because
 * a cropped mockup on a phone reads as a mistake.
 *
 * THE BACKGROUND
 * A deep navy ground with a cyan glow behind the diagram and faint wave lines
 * along the foot. The design ships a 1717x916 raster carrying the same motifs;
 * they are drawn in CSS/SVG here instead so they reflow with the viewport
 * rather than letterboxing, and cost nothing to download.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { context } = notes;

export function NotesContext() {
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
        // The deep navy ground, sampled from the design.
        "bg-[#070d19] text-white",
      )}
    >
      <ContextBackdrop />

      <Container width="wide" className="relative">
        <div
          className={cn(
            "grid items-center gap-14",
            // Measured from the design: the statement runs to roughly a third
            // of the frame, the diagram takes the rest.
            "lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1fr)] lg:gap-10",
            "xl:gap-14",
          )}
        >
          {/* =========================== Statement ===================== */}
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "text-[0.75rem] font-bold uppercase",
                "tracking-[0.18em] text-[#5ac9eb] sm:text-sm",
              )}
            >
              {context.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.08)}
              className={cn(
                "mt-7 font-display font-bold tracking-[-0.035em]",
                "leading-[1.1] text-white",
                // Measured from the design at ~58px on a 1440 frame.
                "text-[2.25rem] sm:text-[2.75rem] xl:text-[3.5rem]",
              )}
            >
              {context.headline.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </motion.h2>

            <motion.p
              {...rise(0.16)}
              className={cn(
                "mt-7 max-w-116 leading-relaxed text-pretty",
                "text-[1.0625rem] text-neutral-400 sm:text-lg",
              )}
            >
              {context.description}
            </motion.p>

            {/* -------------------------- Features -------------------- */}
            {/*
              The rules are top borders on items 2 and 3 rather than a border
              on every item, which is what the design shows — a rule BETWEEN
              the notes, never above the first or below the last.
            */}
            <motion.ul {...rise(0.24)} className="mt-12">
              {context.features.map((feature, index) => (
                <li
                  key={feature.label}
                  className={cn(
                    "flex items-center gap-5 py-5",
                    index > 0 && "border-t border-white/10",
                  )}
                >
                  <Image
                    src={feature.icon.src}
                    alt=""
                    width={feature.icon.width}
                    height={feature.icon.height}
                    // Decorative: the label beside it carries the meaning.
                    aria-hidden="true"
                    className="size-8 shrink-0"
                  />
                  <span className="text-[1.0625rem] text-pretty text-neutral-200 sm:text-lg">
                    {feature.label}
                  </span>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* =========================== Diagram ======================= */}
          <motion.div
            initial={reduce ? "shown" : "hidden"}
            whileInView="shown"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: { opacity: 0, y: 26 },
              shown: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, delay: 0.18, ease: easeOut },
              },
            }}
            // The negative right margin lets the Teams window run past the
            // container and off the viewport edge on lg+, matching the design.
            // Below lg it is reset so the diagram sits inside the gutter.
            className="lg:-mr-[max(2rem,calc((100vw-var(--width-wide))/2+2rem))]"
          >
            <Image
              src={context.diagram.src}
              alt={context.diagram.alt}
              width={context.diagram.width}
              height={context.diagram.height}
              sizes="(min-width: 1024px) 62vw, 100vw"
              className="h-auto w-full"
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

/**
 * The section's background: a cyan glow behind the diagram and faint wave
 * lines along the foot.
 *
 * Drawn rather than shipped — the supplied raster carries the same motifs at a
 * fixed 1717x916, which would letterbox or crop at any other aspect. These
 * reflow with the section and cost nothing to fetch.
 */
function ContextBackdrop() {
  return (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: [
            "radial-gradient(52rem 40rem at 78% 40%, rgb(56 152 214 / 0.18), transparent 66%)",
            "radial-gradient(30rem 26rem at 22% 30%, rgb(56 152 214 / 0.07), transparent 70%)",
          ].join(","),
        }}
      />

      {/* The wave lines along the lower edge. Drawn as a stack of stroked
          curves, each the same shape at a different offset and opacity, which
          is what gives the band its depth. `preserveAspectRatio="none"` lets
          it stretch to any width without the curves changing character. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 260"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 w-full sm:h-52"
      >
        {Array.from({ length: 7 }, (_, i) => {
          const spread = i * 16;
          return (
            <path
              key={i}
              d={`M -40 ${210 + spread * 0.3}
                  C 320 ${140 + spread * 0.6}, 640 ${250 - spread * 0.2}, 940 ${170 - spread * 0.4}
                  S 1300 ${70 + spread * 0.3}, 1480 ${100 + spread * 0.2}`}
              fill="none"
              stroke="rgb(90 201 235 / 0.16)"
              strokeWidth={i % 3 === 0 ? 1.2 : 0.7}
            />
          );
        })}
      </svg>
    </>
  );
}
