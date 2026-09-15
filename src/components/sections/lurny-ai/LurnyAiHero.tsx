"use client";

import type { ComponentType, SVGProps } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { Uncopyable } from "@/components/ui/Uncopyable";
import { lurnyAi } from "@/content/lurny-ai";
import { cn } from "@/lib/utils";

import {
  ArrowIcon,
  BarsIcon,
  BoltIcon,
  CalendarIcon,
  ChatIcon,
  CrownIcon,
  DocumentIcon,
  PenIcon,
  PeopleIcon,
  PlayIcon,
  VideoIcon,
} from "./LurnyAiIcons";

/**
 * LURNY.AI HERO
 * ---------------------------------------------------------------------------
 * Section 1: the statement on the left over the plate's own dark panel, four
 * glass cards floating across the photograph on the right, and a three-item
 * rail along the foot.
 *
 * ONLY THE PHOTOGRAPH AND THE AVATARS SHIP. The design pack also supplies the
 * four cards as transparent PNGs totalling ~4.5MB; they are pure interface —
 * labels, rows, a button — so they are drawn, which keeps their text
 * selectable and translatable and their strokes crisp at any density. The four
 * community avatars are cut out of that card art and do ship, because they are
 * photographs of people.
 *
 * THE DARK PANEL BEHIND THE COPY IS PART OF THE PLATE, not drawn over it. The
 * photograph carries an angled dark field on its left, which is what the copy
 * sits on — so the section ground is matched to it and the image is anchored
 * right rather than being cropped to the subject.
 *
 * BELOW `xl` THE CARDS COME OFF THE PHOTO and stack beneath it. Four floating
 * panels over a scene that size would overlap and none would be readable.
 */

const { hero } = lurnyAi;

/** Motion's string easings are not typed, so the cubic curve is spelled out. */
const easeOut = [0.16, 1, 0.3, 1] as const;

const GLYPHS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  document: DocumentIcon,
  video: VideoIcon,
  pen: PenIcon,
  chat: ChatIcon,
  people: PeopleIcon,
  calendar: CalendarIcon,
  crown: CrownIcon,
  bolt: BoltIcon,
  bars: BarsIcon,
};

/**
 * The shared glass shell for the four cards.
 *
 * A translucent dark fill with a blur, so the photograph shows faintly through
 * each card as it does in the design rather than being blocked out.
 */
const glass = cn(
  "rounded-2xl bg-[#17171c]/82 backdrop-blur-md",
  "ring-1 ring-white/10",
  "shadow-[0_1.5rem_3rem_-1.25rem_rgb(0_0_0/0.65)]",
  "duration-normal transition-[translate,--tw-ring-color,box-shadow] ease-out",
  "will-change-[translate]",
  "hover:-translate-y-1 hover:ring-[#f2725e]/40",
  "hover:shadow-[0_2rem_3.5rem_-1.25rem_rgb(242_114_94/0.45)]",
);

/**
 * The four cards, paired with the positions measured off the design and the
 * order they settle in — left column first, then right, so the eye is walked
 * across the scene rather than shown four panels at once.
 */
const CARDS = [
  {
    id: "create",
    position: hero.cards.create.position,
    Card: CreateCard,
    delay: 0.2,
  },
  {
    id: "expert",
    position: hero.cards.expert.position,
    Card: ExpertCard,
    delay: 0.3,
  },
  {
    id: "community",
    position: hero.cards.community.position,
    Card: CommunityCard,
    delay: 0.4,
  },
  {
    id: "earn",
    position: hero.cards.earn.position,
    Card: EarnCard,
    delay: 0.5,
  },
] as const;

export function LurnyAiHero() {
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduce ? "shown" : "hidden",
    whileInView: "shown",
    viewport: {
      once: true,
      amount: "some",
      margin: "0px 0px 20% 0px",
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

  /**
   * Each card settles in on mount rather than on scroll.
   *
   * The hero is on screen at load, and the lower two cards sit far enough down
   * the diagram that a scroll trigger leaves them at opacity 0 on a short
   * viewport — the failure this build has hit repeatedly.
   */
  const settle = (delay: number) => ({
    initial: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: easeOut },
  });

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden",
        // Sampled from the plate's own dark panel, so the two grounds match.
        "bg-[#1e1e22] text-white",
      )}
    >
      {/* ========================= The photograph ======================= */}
      {/*
        Anchored right, where the subject and the room sit. Its left third is
        the plate's own dark panel, which is what the copy sits on.
      */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Image
          src={hero.scene.src}
          alt={hero.scene.alt}
          fill
          // The page's LCP image, so it must not lazy-load.
          priority
          sizes="100vw"
          /*
            Anchored LEFT below `xl`, right above it.

            The plate is 2:1 and its dark copy panel is on the left. Anchored
            right at phone width the crop landed on the far side of the room —
            a blown-up picture frame — and the copy sat on bright wall with the
            body text barely legible. Left keeps the copy over the panel the
            plate provides for it.
          */
          className="object-cover object-left xl:object-right"
        />

        {/*
          NO OVERLAY ABOVE `xl`. The plate already carries its own angled dark
          panel on the left — that is what the copy sits on — and washing the
          whole image on top of it greyed the room out and lost the warm lamp
          light the design keeps.

          Below `xl` the copy runs the full width over the photograph, so there
          a wash IS needed; it applies only at those widths.
        */}
        <div
          className={cn(
            "absolute inset-0",
            "bg-[rgb(30_30_34/0.86)] xl:hidden",
          )}
        />
      </div>

      <Container width="hero">
        <div
          className={cn(
            "grid items-center gap-12",
            // Measured from the design: the copy runs to ~42% of the frame and
            // the scene carries the rest.
            /*
              One column from `xl`: the cards no longer live in a second one —
              they are pinned across the whole section — so the copy simply
              takes the left 42% and the photograph carries the rest.
            */
            "xl:block",
            // Grid items default to `min-width: auto`; without this a card's
            // widest row can force its column past the container.
            "[&>*]:min-w-0",
          )}
        >
          {/* ============================ Copy ========================== */}
          <div className="pt-28 pb-10 sm:pt-32 xl:max-w-[42%] xl:pt-28 xl:pb-24">
            <motion.p
              {...rise(0)}
              className={cn(
                "font-mono text-[0.75rem] font-medium tracking-[0.18em] uppercase",
                "text-[#f2725e]",
              )}
            >
              {hero.eyebrow}
            </motion.p>

            <motion.h1
              {...rise(0.06)}
              className={cn(
                "mt-6 font-display font-bold tracking-[-0.035em]",
                "leading-[1.06] text-balance",
                // Measured from the design at ~60px on a 1440 frame.
                "text-[2.25rem] sm:text-[2.75rem] xl:text-[3.5rem]",
              )}
            >
              {/*
                Three content lines, each owning its own row as the design has
                them — the third is the accented one.
              */}
              {hero.headline.map((line) => (
                <span
                  key={line.text}
                  className={cn(
                    "block",
                    "accent" in line && line.accent && "text-[#f2725e]",
                  )}
                >
                  {line.text}
                </span>
              ))}
            </motion.h1>

            <motion.p
              {...rise(0.12)}
              className={cn(
                "mt-7 max-w-[32rem] leading-relaxed text-pretty",
                "text-[1rem] text-[#b4b4bd] sm:text-[1.0625rem]",
              )}
            >
              {hero.description}
            </motion.p>

            {/* -------------------------- Actions -------------------- */}
            <motion.div
              {...rise(0.18)}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <Link
                href={hero.actions.primary.href}
                className={cn(
                  "group inline-flex items-center gap-3 rounded-xl",
                  "bg-[#f6786a] px-7 py-4",
                  "text-[1rem] font-bold text-[#22120f]",
                  "duration-normal transition-[background-color,translate,box-shadow] ease-out",
                  "will-change-[translate]",
                  "hover:-translate-y-0.5 hover:bg-[#f88b7c]",
                  "hover:shadow-[0_1rem_2rem_-0.75rem_rgb(246_120_106/0.7)]",
                  "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#f6786a]",
                )}
              >
                {hero.actions.primary.label}
                <ArrowIcon
                  className={cn(
                    "size-4 shrink-0",
                    "duration-normal transition-[translate] ease-out",
                    "group-hover:translate-x-1",
                  )}
                />
              </Link>

              <Link
                href={hero.actions.secondary.href}
                className={cn(
                  "group inline-flex items-center gap-3 rounded-xl px-7 py-4",
                  "text-[1rem] font-semibold text-white",
                  "ring-1 ring-white/25",
                  "duration-normal transition-[background-color,translate,--tw-ring-color] ease-out",
                  "will-change-[translate]",
                  "hover:-translate-y-0.5 hover:bg-white/8 hover:ring-white/45",
                  "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white/60",
                )}
              >
                <PlayIcon className="size-6 shrink-0" />
                {hero.actions.secondary.label}
              </Link>
            </motion.div>
          </div>

          {/* ===================== Cards (stacked) ===================== */}
          {/*
            The narrow-screen fallback. From `xl` the cards are pinned across
            the whole section instead — see the band below the Container, since
            their measured positions are shares of the FRAME rather than of
            this column.

            NOT scroll-animated: on a narrow screen these sit well below the
            fold, and under `whileInView` they would render at opacity 0 with an
            empty band where they belong.
          */}
          <Uncopyable className="grid gap-4 pb-12 sm:grid-cols-2 xl:hidden">
            <CreateCard />
            <ExpertCard />
            <CommunityCard />
            <EarnCard />
          </Uncopyable>
        </div>
      </Container>

      {/* ====================== Cards (pinned) ====================== */}
      {/*
        Pinned across the WHOLE section from `xl`, at the positions measured
        off the design: the two left-hand cards start at 43.8% of the frame,
        over the photograph's centre, and the right-hand pair at ~78%. An
        earlier pass laid these out as two flex lanes inside the right-hand
        grid column, which could not reach those coordinates and put every card
        too far right and too large.

        `bottom-[3.5rem]` clears the foot rail beneath.
      */}
      <Uncopyable
        className={cn(
          "pointer-events-none absolute inset-x-0 hidden xl:block",
          /*
            The band spans the section, so the measured percentages land where
            the design puts them. The section's own top padding is what keeps
            the topmost cards clear of the floating nav pill — offsetting the
            band instead pushed every card 7 points down the frame.
          */
          /*
            The band starts below the floating nav pill and ends above the foot
            rail, so the measured percentages are taken against the space the
            cards actually occupy. Spanning the raw section instead put the two
            top cards under the pill — measured at 63px against its 88px edge.
          */
          "top-[5.5rem] bottom-[3.5rem]",
        )}
      >
        <div className="relative h-full">
          {CARDS.map(({ id, position, Card, delay }) => (
            <motion.div
              key={id}
              {...settle(delay)}
              className={cn("pointer-events-auto absolute", position)}
            >
              <Card />
            </motion.div>
          ))}
        </div>
      </Uncopyable>

      {/* ========================== Foot rail ========================== */}
      <div className="relative border-t border-white/10 bg-[#1c1d22]">
        <Container width="hero">
          <ul
            className={cn(
              "grid gap-y-5 py-6",
              "sm:grid-cols-3",
              "sm:justify-items-center",
            )}
          >
            {hero.proof.map((item, index) => {
              const Glyph = GLYPHS[item.icon];
              return (
                <motion.li
                  key={item.label}
                  {...rise(0.05 * index)}
                  className="group/item flex items-center gap-4"
                >
                  <Glyph
                    className={cn(
                      "size-6 shrink-0 text-[#f2725e]",
                      "duration-normal transition-[scale] ease-out",
                      "will-change-[scale] group-hover/item:scale-110",
                    )}
                  />
                  <span className="text-[1rem] text-[#d5d5dd]">
                    {item.label}
                  </span>
                </motion.li>
              );
            })}
          </ul>
        </Container>
      </div>
    </section>
  );
}

/* ========================================================================== */
/* CARDS                                                                      */
/* ========================================================================== */

/** Top left: the sources an expert can create from. */
function CreateCard() {
  const { create } = hero.cards;

  return (
    <div className={cn(glass, "group/card p-5")}>
      {/*
        `text-nowrap`: at the card's measured 222px the title broke after
        "what", which pushed the card 6 points taller than the design's and
        into the community card's lane.
      */}
      <p className="text-[0.9375rem] font-semibold text-nowrap text-white">
        {create.title}
      </p>

      <ul className="mt-4 space-y-2.5">
        {create.rows.map((row) => {
          const Glyph = GLYPHS[row.icon];
          return (
            <li
              key={row.label}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3.5 py-3",
                "bg-white/6 ring-1 ring-white/10",
                "duration-normal transition-colors ease-out",
                "group-hover/card:bg-white/10",
              )}
            >
              <Glyph className="size-5 shrink-0 text-[#c9c9d2]" />
              <span className="text-[0.9375rem] text-[#e4e4ea]">
                {row.label}
              </span>
            </li>
          );
        })}
      </ul>

      {/*
        Styled as the design's button but rendered as a span: this is an
        illustrative product surface, so it must not be reachable by keyboard
        or announced as an action that goes nowhere.
      */}
      <span
        aria-hidden="true"
        className={cn(
          "mt-4 flex items-center justify-between gap-2 rounded-xl px-3 py-3",
          /*
            The label is nowrap — it broke to two lines at this card width,
            where the design keeps it on one — so the type is sized to fit the
            label AND its arrow inside the card. At 0.875rem the arrow was
            pushed past the card's right edge and clipped.
          */
          "bg-[#f6786a] text-[0.8125rem] font-bold text-nowrap text-[#22120f]",
          "duration-normal transition-colors ease-out",
          "group-hover/card:bg-[#f88b7c]",
        )}
      >
        {create.action}
        <ArrowIcon className="size-3.5 shrink-0" />
      </span>
    </div>
  );
}

/** Top right: the expert's own space. */
function ExpertCard() {
  const { expert } = hero.cards;

  return (
    <div className={cn(glass, "p-5")}>
      <div className="flex items-start justify-between gap-4">
        <p className="text-[0.9375rem] text-[#b4b4bd]">{expert.eyebrow}</p>
        <span
          className={cn(
            "shrink-0 rounded-full px-3 py-1",
            "text-[0.75rem] font-medium text-[#d5d5dd]",
            "ring-1 ring-white/25",
          )}
        >
          {expert.chip}
        </span>
      </div>

      <p className="mt-3 font-display text-[1.75rem] leading-tight font-bold tracking-[-0.02em] text-white">
        {expert.name}
      </p>
      <p className="mt-1 text-[0.9375rem] text-[#b4b4bd]">{expert.field}</p>
    </div>
  );
}

/** Lower middle: the learners around the expert. */
function CommunityCard() {
  const { community } = hero.cards;

  return (
    <div className={cn(glass, "group/card p-5")}>
      <p className="text-[1rem] font-semibold text-white">{community.title}</p>

      {/*
        The avatars overlap slightly, as the design has them — a row of faces
        rather than four separate tiles.
      */}
      <ul className="mt-4 flex items-center">
        {community.avatars.map((avatar, index) => (
          <li
            key={avatar.src}
            className={cn(
              "relative rounded-full ring-2 ring-[#17171c]",
              index > 0 && "-ml-2.5",
              "duration-normal transition-[translate] ease-out",
              "will-change-[translate] group-hover/card:-translate-y-0.5",
            )}
            style={{ transitionDelay: `${index * 40}ms` }}
          >
            <Image
              src={avatar.src}
              alt={avatar.alt}
              width={128}
              height={128}
              sizes="48px"
              className="size-12 rounded-full object-cover"
            />
          </li>
        ))}
      </ul>

      <ul className="mt-4 divide-y divide-white/10 border-t border-white/10">
        {community.rows.map((row) => {
          const Glyph = GLYPHS[row.icon];
          return (
            <li key={row.label} className="flex items-center gap-3 py-3">
              <Glyph className="size-5 shrink-0 text-[#c9c9d2]" />
              <span className="text-[0.9375rem] text-[#e4e4ea]">
                {row.label}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** Lower right: the three revenue routes. */
function EarnCard() {
  const { earn } = hero.cards;

  return (
    <div className={cn(glass, "group/card p-5")}>
      <p className="text-[1rem] font-semibold text-white">{earn.title}</p>

      <ul className="mt-4 grid grid-cols-3 gap-3">
        {earn.items.map((item) => {
          const Glyph = GLYPHS[item.icon];
          return (
            <li
              key={item.label}
              className="flex flex-col items-center gap-2.5 text-center"
            >
              <Glyph
                className={cn(
                  "size-7 shrink-0 text-[#f2725e]",
                  "duration-normal transition-[scale] ease-out",
                  "will-change-[scale] group-hover/card:scale-110",
                )}
              />
              <span className="text-[0.8125rem] leading-snug text-[#d5d5dd]">
                {item.label}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
