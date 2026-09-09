"use client";

import type { ComponentType, SVGProps } from "react";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { Uncopyable } from "@/components/ui/Uncopyable";
import { capabilityBuilding } from "@/content/capability-building";
import { cn } from "@/lib/utils";

import {
  BarsGlyph,
  BookGlyph,
  ChatGlyph,
  ChevronGlyph,
  DocumentGlyph,
  GearGlyph,
  TargetGlyph,
} from "./CapabilityIcons";

/**
 * DEFINE ROLE EXPECTATIONS
 * ---------------------------------------------------------------------------
 * Section 4: a slate band. Copy and three feature rows on the left; on the
 * right two overlapping product cards — a role's competency list, and the
 * detail panel for the competency selected in it.
 *
 * NOTHING HERE SHIPS AS AN IMAGE. The design pack supplies both cards (240KB
 * and 335KB), three icons, and a 933KB background plate; all of it is either
 * interface or flat geometry. Drawn, the section downloads nothing, stays crisp
 * at any density, keeps its text selectable and translatable, and lets the
 * annotation animate — which a plate with the note baked in could not.
 *
 * THE TWO CARDS ARE ONE INTERACTION. The competency marked `selected` in the
 * upper card is the one the lower card expands, and the overlap is what says
 * so. Exactly one row carries that flag; a second would make the pairing
 * meaningless.
 */

const { role } = capabilityBuilding;

/** Motion's string easings are not typed, so the cubic curve is spelled out. */
const easeOut = [0.16, 1, 0.3, 1] as const;

const GLYPHS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  target: TargetGlyph,
  document: DocumentGlyph,
  bars: BarsGlyph,
  chat: ChatGlyph,
  book: BookGlyph,
  gear: GearGlyph,
};

export function CapabilityRole() {
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

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden",
        // Sampled from the supplied plate: a blue-grey slate.
        "bg-[#455770] text-white",
        "py-16 sm:py-20 lg:py-24 xl:pb-[17rem]",
      )}
    >
      {/* ====================== Background geometry ===================== */}
      {/*
        The plate's three arcs, as ring borders. Each is a circle far larger
        than the corner it occupies, cropped by the section — which is how the
        plate draws them, and costs nothing at any viewport size.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <span
          className={cn(
            "absolute rounded-full border-[5rem] border-[#556480]/70",
            "-top-[42%] -right-[10%] size-[40rem]",
          )}
        />
        <span
          className={cn(
            "absolute rounded-full border-[7rem] border-[#556480]/55",
            "-right-[8%] -bottom-[46%] size-[46rem]",
          )}
        />
        <span
          className={cn(
            "absolute rounded-full border-[4rem] border-[#556480]/45",
            "-bottom-[30%] -left-[14%] size-[26rem]",
          )}
        />
      </div>

      <Container width="hero">
        <div
          className={cn(
            "grid items-center gap-12",
            // Measured from the design: the copy runs to ~36% of the frame and
            // the card stack occupies the right half.
            "xl:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] xl:gap-10",
          )}
        >
          {/* ============================ Copy ========================== */}
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "font-mono text-[0.75rem] font-medium tracking-[0.16em] uppercase",
                "text-[#c9b6ff]",
              )}
            >
              {role.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.06)}
              className={cn(
                "mt-5 font-display font-bold tracking-[-0.035em]",
                "leading-[1.04] text-balance",
                // Measured from the design at ~62px on a 1440 frame.
                "text-[2.125rem] sm:text-[2.75rem] xl:text-[3.5rem]",
              )}
            >
              {role.headline}
            </motion.h2>

            <motion.p
              {...rise(0.12)}
              className={cn(
                "mt-6 max-w-[30rem] leading-relaxed text-pretty",
                "text-[1rem] text-[#c3ccdb] sm:text-[1.0625rem]",
              )}
            >
              {role.description}
            </motion.p>

            {/* ------------------------ Features --------------------- */}
            <ul className="mt-10 space-y-6">
              {role.features.map((feature, index) => {
                const Glyph = GLYPHS[feature.icon];
                return (
                  <motion.li
                    key={feature.title}
                    {...rise(0.2 + index * 0.08)}
                    className="flex items-start gap-4"
                  >
                    <span
                      className={cn(
                        "grid size-12 shrink-0 place-items-center rounded-full",
                        // A lifted disc on the slate, as the design draws it.
                        "bg-white/10 text-white ring-1 ring-white/15",
                      )}
                    >
                      <Glyph className="size-5.5" />
                    </span>
                    <div className="min-w-0 pt-1">
                      <p className="text-[1.0625rem] leading-tight font-bold">
                        {feature.title}
                      </p>
                      <p className="mt-1 text-[0.9375rem] leading-snug text-[#b6c0d2]">
                        {feature.note}
                      </p>
                    </div>
                  </motion.li>
                );
              })}
            </ul>

            <motion.p
              {...rise(0.46)}
              className="mt-9 text-[0.8125rem] text-[#a3aec3]"
            >
              {role.footnote.prefix}{" "}
              <span className="font-semibold text-white">
                {role.footnote.engine}
              </span>
            </motion.p>
          </div>

          {/* =========================== Cards ========================== */}
          {/*
            The two cards overlap from `xl`, where there is room for the lower
            one to sit across the upper. Below that they stack in flow — an
            overlap at that width would bury the profile card's own rows.
          */}
          <Uncopyable className="relative">
            <div className="xl:relative">
              {/* ---------------------- Profile ------------------- */}
              <motion.div
                initial={reduce ? "shown" : "hidden"}
                whileInView="shown"
                viewport={{ once: true, amount: 0.2 }}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  shown: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.7, ease: easeOut },
                  },
                }}
                className="xl:w-[84%]"
              >
                <ProfileCard reduce={Boolean(reduce)} />
              </motion.div>

              {/* ----------------------- Detail ------------------- */}
              <motion.div
                initial={reduce ? "shown" : "hidden"}
                whileInView="shown"
                viewport={{ once: true, amount: 0.2 }}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  shown: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.7, delay: 0.22, ease: easeOut },
                  },
                }}
                className={cn(
                  "mt-6",
                  /*
                    Anchored from the BOTTOM, not the top. With `top-[54%]` the
                    card's own offset grew in step with any padding added to
                    make room for it, so its proficiency scale stayed clipped by
                    the section edge — measured at 39px over, unchanged after
                    increasing the reserve. Pinning the base to the column's
                    bottom makes the overhang a fixed distance instead.

                    It runs past the profile card's right edge, as the design
                    has it: the detail card spans 48.3-93.7% of the frame
                    against the profile card's 44.4-82.3%.
                  */
                  "xl:absolute xl:top-[16.5rem] xl:-right-[6%] xl:mt-0 xl:w-full",
                )}
              >
                <DetailCard reduce={Boolean(reduce)} />
              </motion.div>
            </div>

            {/* --------------------- Annotation ------------------- */}
            <Annotation reduce={Boolean(reduce)} note={role.annotation} />
          </Uncopyable>
        </div>
      </Container>
    </section>
  );
}

/* ========================================================================== */
/* PROFILE CARD                                                               */
/* ========================================================================== */

function ProfileCard({ reduce }: { reduce: boolean }) {
  const { profile } = role;

  return (
    <div
      className={cn(
        "rounded-2xl bg-white p-6 text-[#0b0a14]",
        "shadow-[0_2rem_3.5rem_-1.5rem_rgb(8_12_24/0.55)]",
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[1.375rem] leading-tight font-bold text-[#111536]">
            {profile.title}
          </p>
          <p className="mt-1 text-[0.9375rem] text-[#5b6288]">
            {profile.subtitle}
          </p>
        </div>
        <span
          className={cn(
            "shrink-0 rounded-lg bg-[#f2ecff] px-3 py-1.5",
            "text-[0.75rem] font-semibold text-[#7b3fe4]",
          )}
        >
          {profile.badge}
        </span>
      </div>

      <p className="mt-5 text-[0.8125rem] text-[#5b6288]">
        {profile.listLabel}
      </p>

      <ul className="mt-2.5">
        {profile.competencies.map((item, index) => {
          const Glyph = GLYPHS[item.icon];
          const selected = "selected" in item && item.selected;
          return (
            <motion.li
              key={item.label}
              initial={reduce ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.45,
                delay: 0.25 + index * 0.09,
                ease: easeOut,
              }}
              className={cn(
                "group/row flex items-center gap-3 px-3.5 py-3",
                // The selected row is the one the detail card expands, so it
                // carries a tinted ground and a violet rule of its own.
                selected
                  ? "rounded-xl bg-[#f4efff] ring-1 ring-[#7b3fe4]/25"
                  : "border-b border-[#0b0a14]/8 last:border-b-0",
                "duration-normal transition-colors ease-out",
                !selected && "hover:bg-[#f7f6fb]",
              )}
            >
              <Glyph
                className={cn(
                  "size-5 shrink-0",
                  selected ? "text-[#7b3fe4]" : "text-[#5b6288]",
                )}
              />
              <span
                className={cn(
                  "min-w-0 flex-1 text-[0.9375rem]",
                  selected ? "font-semibold text-[#111536]" : "text-[#2b3157]",
                )}
              >
                {item.label}
              </span>

              <span
                className={cn(
                  "shrink-0 rounded-md px-2.5 py-1 text-[0.75rem] font-bold",
                  selected
                    ? "bg-[#7b3fe4] text-white"
                    : "bg-[#f1f1f6] text-[#5b6288]",
                )}
              >
                {item.level}
              </span>

              <ChevronGlyph
                className={cn(
                  "size-4 shrink-0 text-[#9aa2c0]",
                  "duration-normal transition-[translate] ease-out",
                  "group-hover/row:translate-x-0.5",
                )}
              />
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}

/* ========================================================================== */
/* DETAIL CARD                                                                */
/* ========================================================================== */

function DetailCard({ reduce }: { reduce: boolean }) {
  const { detail } = role;

  return (
    <div
      className={cn(
        "rounded-2xl bg-white p-6 text-[#0b0a14]",
        "shadow-[0_2.25rem_4rem_-1.5rem_rgb(8_12_24/0.6)]",
      )}
    >
      <p className="text-[1.25rem] leading-tight font-bold text-[#111536]">
        {detail.title}
      </p>
      <p className="mt-1 text-[0.9375rem] text-[#5b6288]">{detail.subtitle}</p>

      {/* --------------------------- Facets --------------------------- */}
      <ul className="mt-5 divide-y divide-[#0b0a14]/8 border-t border-[#0b0a14]/8">
        {detail.facets.map((facet, index) => (
          <motion.li
            key={facet.initial}
            initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.45,
              delay: 0.35 + index * 0.09,
              ease: easeOut,
            }}
            className="flex items-start gap-4 py-4"
          >
            {/*
              The initial IS the mark — K, S, B — so it is a letter on a tinted
              tile rather than an icon. `aria-hidden` because the word it stands
              for is the very next thing read.
            */}
            <span
              aria-hidden="true"
              className={cn(
                "grid size-10 shrink-0 place-items-center rounded-xl",
                "bg-[#f2ecff] text-[1rem] font-bold text-[#5b2bc4]",
              )}
            >
              {facet.initial}
            </span>
            <div className="min-w-0 pt-0.5">
              <p className="text-[0.9375rem] leading-tight font-bold text-[#111536]">
                {facet.title}
              </p>
              <p className="mt-1 text-[0.875rem] leading-snug text-[#5b6288]">
                {facet.note}
              </p>
            </div>
          </motion.li>
        ))}
      </ul>

      {/* ------------------------- Proficiency ------------------------ */}
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <p className="text-[0.9375rem] font-bold text-[#111536]">
          {detail.proficiency.label}
        </p>
        <p className="text-[0.8125rem] text-[#5b6288]">
          {detail.proficiency.targetLabel}{" "}
          <span className="font-bold text-[#7b3fe4]">
            {detail.proficiency.target}
          </span>
        </p>
      </div>

      {/*
        The scale. `aria-current` marks the role's target rather than colour
        alone — the violet fill is the only visual cue, and it must not be the
        only cue full stop.
      */}
      <ul className="mt-3 grid grid-cols-4 overflow-hidden rounded-xl ring-1 ring-[#0b0a14]/8">
        {detail.proficiency.levels.map((level, index) => {
          const isTarget = level === detail.proficiency.target;
          return (
            <motion.li
              key={level}
              aria-current={isTarget ? "true" : undefined}
              initial={reduce ? { opacity: 1 } : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.65 + index * 0.07 }}
              className={cn(
                "py-3 text-center text-[0.875rem]",
                index > 0 && "border-l border-[#0b0a14]/8",
                isTarget
                  ? "bg-[#cfbafe] font-bold text-[#2c1264]"
                  : "bg-[#f7f7fa] text-[#5b6288]",
              )}
            >
              {level}
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}

/* ========================================================================== */
/* ANNOTATION                                                                 */
/* ========================================================================== */

/**
 * The handwritten note and its curved arrow, pointing down at the cards.
 *
 * Baked into the supplied plate; drawn here so it can animate — the note fades
 * up and the arrow draws itself toward the cards. Hidden below `xl`, where the
 * cards stack and there is no margin beside them for it to sit in.
 *
 * The arrow's viewBox keeps its aspect ratio: stretching it would flatten the
 * curve and skew the head, the failure this build has hit on every connector
 * drawn in a distorted box.
 */
function Annotation({ reduce, note }: { reduce: boolean; note: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute hidden xl:block",
        // Sits above and right of the card stack, as the plate places it.
        "-top-[3.5rem] -right-[9%] w-[11rem]",
      )}
    >
      <motion.p
        initial={reduce ? { opacity: 1 } : { opacity: 0, y: -6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.5, ease: easeOut }}
        className={cn(
          "font-hand text-[1.375rem] leading-tight",
          "-rotate-6 text-[#c9b6ff]",
        )}
      >
        {note}
      </motion.p>

      <svg
        viewBox="0 0 70 78"
        preserveAspectRatio="xMidYMid meet"
        className="mt-1 ml-6 w-[3.75rem]"
      >
        <motion.path
          d="M46 4c8 22 4 42-14 56"
          fill="none"
          stroke="#c9b6ff"
          strokeWidth={2.4}
          strokeLinecap="round"
          initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, delay: 0.75, ease: easeOut }}
        />
        <motion.path
          d="m24 46 8 15 16-4"
          fill="none"
          stroke="#c9b6ff"
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduce ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 1.45 }}
        />
      </svg>
    </div>
  );
}
