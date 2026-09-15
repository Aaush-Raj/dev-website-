"use client";

import type { ComponentType, SVGProps } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { Uncopyable } from "@/components/ui/Uncopyable";
import { lurnyAi } from "@/content/lurny-ai";
import { cn } from "@/lib/utils";

import {
  CheckCircleIcon,
  ClipboardIcon,
  RosetteIcon,
  TickIcon,
} from "./LurnyAiIcons";

/**
 * LURNY.AI — EXPERT-ISSUED CREDENTIALS
 * ---------------------------------------------------------------------------
 * Section 4: the credential card on the left with a light requirements panel
 * overlapping it, and copy with three benefits on the right.
 *
 * THE CREDENTIAL CARD SHIPS, unlike the interface panels elsewhere on this
 * page. It is a RENDERED OBJECT — an embossed gold seal with a raised rim, a
 * bevelled frame, a corner arc with real depth — and markup cannot reproduce
 * that metallic shading. 26KB.
 *
 * Its text is baked in, so the card's wording is repeated as `sr-only` text:
 * without that the whole credential is invisible to a screen reader.
 *
 * THE REQUIREMENTS PANEL IS DRAWN. It is three rows and a heading — pure
 * interface — so the 130KB PNG the pack supplies for it is not used.
 *
 * THIS SECTION DESCRIBES A PLANNED CAPABILITY. The design says so twice, and
 * both statements are kept: a section reading as shipped when it is not would
 * be the wrong kind of accurate.
 */

const { credentials } = lurnyAi;

/** Motion's string easings are not typed, so the cubic curve is spelled out. */
const easeOut = [0.16, 1, 0.3, 1] as const;

const GLYPHS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  clipboard: ClipboardIcon,
  check: CheckCircleIcon,
  rosette: RosetteIcon,
};

export function LurnyAiCredentials() {
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduce ? "shown" : "hidden",
    whileInView: "shown",
    /*
      A generous bottom margin. On a phone the copy sits below the tall
      credential card — at a smaller margin the whole right column stayed at
      opacity 0, the failure this page has hit in every section.
    */
    viewport: {
      once: true,
      amount: "some",
      margin: "0px 0px 90% 0px",
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
        // Sampled from the supplied plate: a warm ivory.
        "bg-[#fdf7ed] text-[#1c1a19]",
        "py-16 sm:py-20 lg:py-24",
      )}
    >
      {/* ========================= Background ========================= */}
      {/*
        The plate's champagne arcs and two decorative spheres. Drawn — the
        plate ships them as an 858KB image, and they are circles on flat cream.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        {/* The large arc behind the card, at a fixed aspect so it stays round. */}
        <svg
          viewBox="0 0 400 400"
          preserveAspectRatio="xMinYMid meet"
          className="absolute top-0 left-[-6%] h-full w-[56%]"
        >
          <circle
            cx="190"
            cy="196"
            r="176"
            fill="none"
            stroke="#e8c9a4"
            strokeOpacity={0.4}
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
          />
          <circle cx="188" cy="196" r="168" fill="#f7e6d2" fillOpacity={0.35} />
        </svg>

        {/* The two spheres the plate scatters around it. */}
        <span className="absolute top-[9%] left-[38%] size-9 rounded-full bg-[linear-gradient(140deg,#f8e3c9,#eccba4)]" />
        <span className="absolute bottom-[16%] left-[10%] size-7 rounded-full bg-[linear-gradient(140deg,#f8e3c9,#eccba4)]" />
      </div>

      <Container width="hero">
        <div
          className={cn(
            "grid items-center gap-12",
            // Measured from the design: the card takes the left ~58% and the
            // copy the right.
            "xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] xl:gap-14",
            // Grid items default to `min-width: auto`; without this a panel's
            // widest row can force its column past the container.
            "[&>*]:min-w-0",
          )}
        >
          {/* ========================== Card ========================== */}
          <Uncopyable>
            <motion.div
              initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15, margin: "0px 0px 90% 0px" }}
              transition={{ duration: 0.75, ease: easeOut }}
              className="relative"
            >
              <div
                className={cn(
                  "group/card overflow-hidden rounded-2xl",
                  "shadow-[0_2rem_4rem_-1.5rem_rgb(60,40,20,0.4)]",
                  "duration-normal transition-[translate,box-shadow] ease-out",
                  "will-change-[translate] hover:-translate-y-1",
                  "hover:shadow-[0_2.75rem_5rem_-1.5rem_rgb(60,40,20,0.5)]",
                )}
              >
                <Image
                  src={credentials.card.src}
                  alt={credentials.card.alt}
                  width={847}
                  height={565}
                  sizes="(min-width: 1280px) 46vw, 92vw"
                  className="h-auto w-full"
                />
              </div>

              {/*
                What the card says, for assistive technology. The credential's
                own text is baked into the image, so without this the whole
                thing is invisible to a screen reader.
              */}
              <p className="sr-only">{credentials.transcript}</p>

              {/*
                The requirements panel overlaps the card's lower right, as the
                design has it. Only from `sm`: stacked below that it sits in
                flow, where an overlap would bury the signature.
              */}
              <motion.div
                initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px 90% 0px" }}
                transition={{ duration: 0.6, delay: 0.4, ease: easeOut }}
                className={cn(
                  "mt-4 sm:mt-0",
                  /*
                    Measured off the design: the panel is 42.9% of the card's
                    width and overhangs its right edge by 4.6%, sitting across
                    the card's lower right.
                  */
                  "sm:absolute sm:right-[-4.6%] sm:bottom-[-8%] sm:w-[42.9%]",
                )}
              >
                <RequirementsCard reduce={Boolean(reduce)} />
              </motion.div>
            </motion.div>
          </Uncopyable>

          {/* =========================== Copy ========================== */}
          <div className="sm:pt-16 xl:pt-0">
            {/*
              The status pill. Kept because this capability is not shipped —
              see the note beneath the copy, which says the same thing again.
            */}
            <motion.p
              {...rise(0)}
              className={cn(
                "inline-block rounded-full px-5 py-2",
                "text-[0.9375rem] font-medium text-[#3b3a45]",
                "ring-1 ring-[#1c1a19]/18",
              )}
            >
              {credentials.status}
            </motion.p>

            <motion.p
              {...rise(0.06)}
              className={cn(
                "mt-7 font-mono text-[0.75rem] font-bold tracking-[0.16em] uppercase",
                "text-[#f8524f]",
              )}
            >
              {credentials.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.12)}
              className={cn(
                "mt-5 font-display font-bold tracking-[-0.035em]",
                "leading-[1.04] text-balance text-[#17161f]",
                // Measured from the design at ~58px on a 1440 frame.
                "text-[2.125rem] sm:text-[2.625rem] xl:text-[3.375rem]",
              )}
            >
              {/*
                Three content lines, the middle one accented — each owns its
                own row as the design has them.
              */}
              {credentials.headline.map((line) => (
                <span
                  key={line.text}
                  className={cn(
                    "block",
                    "accent" in line && line.accent && "text-[#f8524f]",
                  )}
                >
                  {line.text}
                </span>
              ))}
            </motion.h2>

            <motion.p
              {...rise(0.18)}
              className={cn(
                "mt-6 max-w-[28rem] leading-relaxed text-pretty",
                "text-[1.0625rem] text-[#4b4a56] sm:text-[1.125rem]",
              )}
            >
              {credentials.description}
            </motion.p>

            {/* ------------------------ Benefits --------------------- */}
            <ul className="mt-10 space-y-7">
              {credentials.benefits.map((benefit, index) => {
                const Glyph = GLYPHS[benefit.icon];
                /*
                  The award mark carries the credential's GOLD rather than the
                  section's coral — it belongs to the seal on the card, not to
                  the accent, and the design draws it that way.
                */
                const gold = benefit.icon === "rosette";
                return (
                  <motion.li
                    key={benefit.label}
                    {...rise(0.24 + index * 0.07)}
                    className="group/benefit flex items-center gap-5"
                  >
                    <Glyph
                      className={cn(
                        "size-8 shrink-0",
                        gold ? "text-[#c9a227]" : "text-[#f8524f]",
                        "duration-normal transition-[scale] ease-out",
                        "will-change-[scale] group-hover/benefit:scale-110",
                      )}
                    />
                    <span className="text-[1.125rem] text-[#17161f]">
                      {benefit.label}
                    </span>
                  </motion.li>
                );
              })}
            </ul>

            {/* The design rules above the note, not around it. */}
            <motion.p
              {...rise(0.48)}
              className={cn(
                "mt-10 max-w-[22rem] border-t border-[#c9a227]/40 pt-5",
                "text-[0.9375rem] text-[#6b6a76]",
              )}
            >
              {credentials.note}
            </motion.p>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ========================================================================== */
/* REQUIREMENTS PANEL                                                         */
/* ========================================================================== */

/**
 * The light panel overlapping the credential.
 *
 * Drawn rather than shipped: it is a heading and three ticked rows, so the
 * 130KB PNG the pack supplies buys nothing that markup does not.
 */
function RequirementsCard({ reduce }: { reduce: boolean }) {
  const { requirements } = credentials;

  return (
    <div
      className={cn(
        "rounded-2xl bg-[#fdf9f1] p-6",
        "ring-1 ring-[#c9a227]/25",
        "shadow-[0_1.75rem_3.5rem_-1.25rem_rgb(60,40,20,0.35)]",
      )}
    >
      <p className="font-display text-[1.25rem] leading-tight font-bold tracking-[-0.015em] text-[#17161f]">
        {requirements.title}
      </p>

      {/* The short gold rule the design sets beneath the heading. */}
      <span
        aria-hidden="true"
        className="mt-3 block h-px w-10 bg-[#c9a227]/70"
      />

      <ul className="mt-4 divide-y divide-[#1c1a19]/8">
        {requirements.items.map((item, index) => (
          <motion.li
            key={item}
            initial={reduce ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "0px 0px 90% 0px" }}
            transition={{
              duration: 0.45,
              // In order, a beat behind the panel — the three read as a
              // checklist being completed rather than a static list.
              delay: 0.6 + index * 0.12,
              ease: easeOut,
            }}
            className="flex items-center gap-4 py-3.5"
          >
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-[#f8524f]">
              <TickIcon className="size-4 text-white" />
            </span>
            <span className="text-[1rem] text-[#3b3a45]">{item}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
