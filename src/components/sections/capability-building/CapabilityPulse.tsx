"use client";

import type { ComponentType, SVGProps } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { Uncopyable } from "@/components/ui/Uncopyable";
import { capabilityBuilding } from "@/content/capability-building";
import { cn } from "@/lib/utils";

import {
  BarsGlyph,
  DocumentGlyph,
  GrowthGlyph,
  TargetGlyph,
} from "./CapabilityIcons";

/**
 * CHECK YOUR PULSE
 * ---------------------------------------------------------------------------
 * Section 5: copy and three feature rows on the left, a photograph filling the
 * band, and two product cards floating over its right side — a scenario
 * question and the capability profile it feeds.
 *
 * ONLY THE PHOTOGRAPH SHIPS. The pack also supplies both cards (~127KB each)
 * and three icons; all of that is interface or line art, so it is drawn — the
 * text stays selectable and translatable, the strokes stay crisp at any
 * density, and the values come from data rather than a re-export.
 *
 * THE PLATE KEEPS ITS ANNOTATION. The handwritten note and its arrow are
 * struck onto the photograph and land in the gap between the two cards, so
 * they are positioned relative to the image rather than the layout. Redrawing
 * them would mean re-deriving that curve against a photograph that crops
 * differently at every width. The words are repeated as `sr-only` text, since
 * baked-in type is invisible to assistive technology.
 *
 * THE TWO CARDS ARE ONE FLOW: the scenario is answered, and the profile below
 * is what it feeds. That is why the chosen option and the flagged focus row
 * name the same competency — they must move together.
 */

const { pulse } = capabilityBuilding;

/** Motion's string easings are not typed, so the cubic curve is spelled out. */
const easeOut = [0.16, 1, 0.3, 1] as const;

const GLYPHS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  document: DocumentGlyph,
  bars: BarsGlyph,
  growth: GrowthGlyph,
};

/**
 * The shared card shell.
 *
 * THE CARDS ARE TURNED IN 3D, not rotated in the plane. Each is given a Y-axis
 * rotation under perspective, so its far vertical edge renders shorter than its
 * near one and the silhouette becomes a slight trapezoid — the card reads as
 * angled away from the viewer rather than as a flat rectangle tipped on the
 * page. A plain `rotate` keeps all four edges the same length and only ever
 * looks like a crooked card, which is not the effect.
 *
 THE ANGLES ARE MEASURED FROM THE SUPPLIED CARD ART, not guessed. Sampling it
 * gives a left edge of 300px against a right edge of 316px, and — the part that
 * matters — its top and bottom edges DIVERGE rather than running parallel: the
 * top slopes up 1.1 degrees while the bottom slopes down 1.4. In-plane rotation
 * measures ~0.2 degrees, i.e. none. That divergence is the signature of a card
 * turned on TWO axes and viewed under perspective, which is why an in-plane
 * `rotate` could never produce it however far it was pushed.
 *
 * Two earlier passes are worth not repeating. A flat `rotate` keeps all four
 * edges the same length and only ever looks like a crooked rectangle. A 7-degree
 * Y-turn was geometrically right but invisible — at that angle the far edge
 * shortens by under two pixels on a 300px edge.
 *
 * The LEFT edge recedes, matching the art, and both cards turn the same way:
 * they are two panels resting on one surface, and mirroring them made each look
 * like it belonged to a different scene.
 *
 * `perspective` lives on the wrapper, not here — it must be set on the PARENT
 * of a transformed element to take effect, and setting it on the element itself
 * silently does nothing. It is tight (760px) so the convergence actually reads.
 *
 * On hover the card TURNS FLAT and lifts, which reads as picking it up and
 * squaring it to the viewer. `transform`, `translate` and the ring are all
 * named in the transition — `rotate3d` goes through the `transform` property,
 * while `translate` is standalone in Tailwind v4, so neither covers the other.
 *
 * The whole effect is dropped below `xl`. Stacked in a narrow column the cards
 * sit nearly edge to edge, where a receding edge reads as a rendering fault
 * rather than as depth.
 */
const cardShell = cn(
  "group/card rounded-2xl bg-white p-5",
  "ring-1 ring-[#0b0a14]/7",
  "shadow-[0_1.75rem_3rem_-1.25rem_rgb(20_18_60/0.28)]",
  "duration-slow transition-[box-shadow,translate,transform,--tw-ring-color] ease-out",
  "will-change-[translate,transform]",
  "hover:-translate-y-2 hover:ring-[#8500ff]/30",
  "hover:shadow-[0_2.5rem_4rem_-1.25rem_rgb(133_0_255/0.34)]",
  // Square to the viewer on hover, whichever way the card was turned.
  // Resets BOTH axes. `rotateY(0deg)` alone left the X-tilt in place, so the
  // card only half-squared to the viewer on hover.
  "xl:hover:[transform:rotateY(0deg)_rotateX(0deg)]",
);

export function CapabilityPulse() {
  const reduce = useReducedMotion();

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

  /** Each card settles in from its own side rather than arriving together. */
  const settle = (delay: number) => ({
    initial: reduce ? "shown" : "hidden",
    whileInView: "shown",
    viewport: { once: true, amount: 0.2 } as const,
    variants: {
      hidden: { opacity: 0, x: 26, y: 12 },
      shown: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: { duration: 0.72, delay, ease: easeOut },
      },
    },
  });

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden",
        // Matched to the plate's own left edge, which is near-white.
        "bg-[#fefeff] text-[#0b0a14]",
      )}
    >
      {/* ========================= The photograph ======================= */}
      {/*
        Fills the band and is anchored right, where the subject sits. The copy
        column has its own wash beneath it so the headline holds contrast
        against the plate's brightest area.
      */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Image
          src={pulse.scene.src}
          alt={pulse.scene.alt}
          fill
          sizes="100vw"
          className="object-cover object-right"
        />
        <div
          className={cn(
            "absolute inset-0",
            "bg-[linear-gradient(to_right,#fefeff_0%,rgb(254_254_255/0.94)_28%,rgb(254_254_255/0.55)_42%,transparent_56%)]",
          )}
        />
      </div>

      <Container width="hero">
        <div
          className={cn(
            "grid items-center gap-10",
            // Measured from the design: the copy runs to ~43% of the frame and
            // the cards sit over the right third.
            "xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] xl:gap-8",
          )}
        >
          {/* ============================ Copy ========================== */}
          <div className="py-16 sm:py-20 lg:py-24">
            <motion.p
              {...rise(0)}
              className={cn(
                "font-mono text-[0.75rem] font-medium tracking-[0.16em] uppercase",
                "text-[#8500ff]",
              )}
            >
              {pulse.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.06)}
              className={cn(
                "mt-5 font-display font-bold tracking-[-0.035em]",
                "leading-[1.06] text-balance",
                // Measured from the design at ~54px on a 1440 frame.
                "text-[2rem] sm:text-[2.5rem] xl:text-[3.25rem]",
              )}
            >
              {/*
                Two content lines, each owning its own row as the design has
                them, rather than depending on where the text happens to wrap.
              */}
              {pulse.headline.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </motion.h2>

            <motion.p
              {...rise(0.12)}
              className={cn(
                "mt-6 max-w-[32rem] leading-relaxed text-pretty",
                "text-[1rem] text-[#42486a] sm:text-[1.0625rem]",
              )}
            >
              {pulse.description}
            </motion.p>

            {/* ------------------------ Features --------------------- */}
            <ul className="mt-10 space-y-7">
              {pulse.features.map((feature, index) => {
                const Glyph = GLYPHS[feature.icon];
                return (
                  <motion.li
                    key={feature.title}
                    {...rise(0.2 + index * 0.08)}
                    className="group/feature flex items-start gap-4"
                  >
                    <span
                      className={cn(
                        "grid size-12 shrink-0 place-items-center rounded-xl",
                        "bg-[#f2ecff] text-[#7b3fe4]",
                        "duration-normal transition-colors ease-out",
                        "group-hover/feature:bg-[#7b3fe4] group-hover/feature:text-white",
                      )}
                    >
                      <Glyph className="size-5.5" />
                    </span>
                    <div className="min-w-0 pt-1">
                      <p className="text-[1.0625rem] leading-tight font-bold text-[#111536]">
                        {feature.title}
                      </p>
                      <p className="mt-1 text-[0.9375rem] leading-snug text-[#5b6288]">
                        {feature.note}
                      </p>
                    </div>
                  </motion.li>
                );
              })}
            </ul>

            {/* The design rules above the attribution, not around it. */}
            <motion.p
              {...rise(0.46)}
              className={cn(
                "mt-10 border-t border-[#0b0a14]/10 pt-5",
                "max-w-[12rem] text-[0.8125rem] text-[#5b6288]",
              )}
            >
              {pulse.footnote.prefix}{" "}
              <span className="font-semibold text-[#111536]">
                {pulse.footnote.engine}
              </span>
            </motion.p>
          </div>

          {/* =========================== Cards ========================== */}
          {/*
            The annotation is baked into the photograph, so its words are
            repeated here for assistive technology — otherwise the aside is
            simply missing for anyone not looking at the image.
          */}
          <p className="sr-only">{pulse.annotation}</p>

          <Uncopyable
            className={cn(
              "flex flex-col gap-5 pb-16 sm:pb-20 xl:pb-24",
              /*
                The perspective the cards' 3D turn is measured against. It has
                to sit on the PARENT — set on a transformed element itself it is
                silently ignored. Long, so the turn stays gentle.
              */
              "xl:[perspective:760px]",
              /*
                Measured from the design: each card is ~22% of the frame, which
                is 317px at 1440 — roughly half the grid column. Left to fill
                the column they rendered at ~640px, covering the subject's face
                and the tablet she is holding, which the design keeps clear.

                The extra top padding drops them below the plate's baked-in
                annotation, which sits above them in open space.
              */
              "xl:ml-auto xl:w-[20rem] xl:pt-[9rem]",
            )}
          >
            <motion.div {...settle(0.1)}>
              <ScenarioCard reduce={Boolean(reduce)} />
            </motion.div>

            <motion.div {...settle(0.28)}>
              <ProfileCard reduce={Boolean(reduce)} />
            </motion.div>
          </Uncopyable>
        </div>
      </Container>
    </section>
  );
}

/* ========================================================================== */
/* SCENARIO CARD                                                              */
/* ========================================================================== */

function ScenarioCard({ reduce }: { reduce: boolean }) {
  const { scenario } = pulse;

  return (
    <div
      className={cn(
        cardShell,
        // Left edge recedes and the card leans back a touch, as the art has it.
        "xl:[transform:rotateY(19deg)_rotateX(6deg)]",
      )}
    >
      <p className="text-[1.0625rem] leading-tight font-bold text-[#111536]">
        {scenario.title}
      </p>

      <span
        className={cn(
          "mt-3 inline-block rounded-lg bg-[#f2ecff] px-3 py-1.5",
          "text-[0.75rem] font-semibold text-[#7b3fe4]",
        )}
      >
        {scenario.badge}
      </span>

      <p className="mt-4 text-[1rem] leading-tight font-bold text-[#111536]">
        {scenario.competency}
      </p>
      <p className="mt-2 text-[0.875rem] leading-snug text-[#5b6288]">
        {scenario.question}
      </p>

      {/*
        The options are presentational — a snapshot of a decision already made,
        not a control. They are a list rather than real radios, so nothing here
        is focusable or announces itself as an unlabelled form.
      */}
      <ul className="mt-4 space-y-2.5">
        {scenario.options.map((option, index) => {
          const chosen = "chosen" in option && option.chosen;
          return (
            <motion.li
              key={option.label}
              initial={reduce ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: 0.35 + index * 0.1,
                ease: easeOut,
              }}
              className="flex items-center gap-3"
            >
              <span
                aria-hidden="true"
                className={cn(
                  "grid size-5 shrink-0 place-items-center rounded-full",
                  chosen
                    ? "ring-2 ring-[#7b3fe4]"
                    : "ring-2 ring-[#d5d7e5] ring-inset",
                )}
              >
                {chosen ? (
                  <motion.span
                    initial={reduce ? { scale: 1 } : { scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.32, delay: 0.62, ease: easeOut }}
                    className="size-2.5 rounded-full bg-[#7b3fe4]"
                  />
                ) : null}
              </span>
              <span
                className={cn(
                  "text-[0.875rem]",
                  chosen ? "font-medium text-[#111536]" : "text-[#5b6288]",
                )}
              >
                {option.label}
              </span>
            </motion.li>
          );
        })}
      </ul>

      <div className="mt-5 flex justify-end">
        {/*
          Styled as the design's button but rendered as a span: it is part of an
          illustrative product surface, so it must not be reachable by keyboard
          or announced as an action that goes nowhere.
        */}
        <span
          aria-hidden="true"
          className={cn(
            "inline-flex items-center rounded-lg bg-[#7b3fe4] px-5 py-2.5",
            "text-[0.875rem] font-semibold text-white",
            "duration-normal transition-colors ease-out",
            "group-hover/card:bg-[#6a2fd4]",
          )}
        >
          {scenario.action}
        </span>
      </div>
    </div>
  );
}

/* ========================================================================== */
/* PROFILE CARD                                                               */
/* ========================================================================== */

function ProfileCard({ reduce }: { reduce: boolean }) {
  const { profile } = pulse;

  return (
    <div
      className={cn(
        cardShell,
        // The same turn as the card above: one surface, not two.
        "xl:[transform:rotateY(17deg)_rotateX(5deg)]",
      )}
    >
      <p className="text-[1.0625rem] leading-tight font-bold text-[#111536]">
        {profile.title}
      </p>
      <p className="mt-1 text-[0.875rem] text-[#5b6288]">{profile.subtitle}</p>

      {/*
        A real <table>. The three columns are a header and two values per row,
        so a table is what this is — a grid of divs would lose the association
        between "L2" and the competency it belongs to.
      */}
      <table className="mt-4 w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-[#0b0a14]/10">
            {profile.columns.map((column, index) => (
              <th
                key={column}
                scope="col"
                className={cn(
                  "pb-2.5 text-[0.75rem] font-medium text-[#5b6288]",
                  index > 0 && "text-center",
                )}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {profile.rows.map((row, index) => (
            <motion.tr
              key={row.label}
              initial={reduce ? { opacity: 1 } : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.45 + index * 0.09 }}
              className="border-b border-[#0b0a14]/8 last:border-b-0"
            >
              <th
                scope="row"
                className="py-2.5 text-[0.8125rem] font-medium text-[#2b3157]"
              >
                {row.label}
              </th>
              <td className="py-2.5 text-center text-[0.8125rem] text-[#5b6288]">
                {row.current}
              </td>
              <td className="py-2.5 text-center text-[0.8125rem] font-semibold text-[#111536]">
                {row.target}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>

      {/* --------------------------- Focus --------------------------- */}
      <motion.p
        initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: 0.78, ease: easeOut }}
        className={cn(
          "mt-4 flex items-center gap-2.5 rounded-xl bg-[#f2ecff] px-4 py-3",
          "text-[0.875rem] text-[#4a2596]",
        )}
      >
        <TargetGlyph className="size-4 shrink-0 text-[#7b3fe4]" />
        <span>
          {profile.focus.prefix}{" "}
          <span className="font-semibold">{profile.focus.label}</span>
        </span>
      </motion.p>
    </div>
  );
}
