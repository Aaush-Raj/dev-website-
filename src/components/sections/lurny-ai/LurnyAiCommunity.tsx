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
  BubbleIcon,
  CalendarPlayIcon,
  CameraIcon,
  MoreIcon,
  PeopleIcon,
  StarIcon,
} from "./LurnyAiIcons";

/**
 * LURNY.AI — BUILD YOUR LEARNING COMMUNITY
 * ---------------------------------------------------------------------------
 * Section 5: copy and three benefits on the left, the community window on the
 * right with a paid-experiences panel overlapping its lower corner.
 *
 * THE WINDOW IS DRAWN, ITS PHOTOGRAPHS SHIP. The pack supplies the whole card
 * as an 888KB PNG, but the chrome around the pictures — tabs, the caption bar,
 * the discussion row — is interface. Only the six images are cut out of it:
 * the video still, four participants and the asker's avatar, 44KB in total.
 *
 * THE STAGE'S LABEL AND PLAY HEAD ARE DRAWN over the still rather than left
 * baked into it, so the label stays selectable and translatable and the play
 * head can respond on hover. The still is cropped above the design's own
 * caption bar for exactly that reason.
 */

const { community } = lurnyAi;

/** Motion's string easings are not typed, so the cubic curve is spelled out. */
const easeOut = [0.16, 1, 0.3, 1] as const;

const GLYPHS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  people: PeopleIcon,
  calendarPlay: CalendarPlayIcon,
  star: StarIcon,
  camera: CameraIcon,
};

export function LurnyAiCommunity() {
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduce ? "shown" : "hidden",
    whileInView: "shown",
    /*
      A generous bottom margin. On a phone the window sits far below the copy —
      at a smaller margin it stayed at opacity 0, the failure every section on
      this page has hit.
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
      className={cn(
        "relative isolate overflow-hidden",
        // Sampled from the design: a near-black with a warm cast.
        "bg-[#161519] text-white",
        "py-16 sm:py-20 lg:py-24",
      )}
    >
      {/* ========================= Background ========================= */}
      {/*
        The design's gold arcs, sweeping out of the right corners. Drawn at a
        fixed aspect so they stay circular — a stretched box would flatten them
        into ovals and they would stop reading as struck geometry.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <svg
          viewBox="0 0 400 400"
          preserveAspectRatio="xMaxYMid slice"
          className="absolute inset-y-0 right-0 h-full w-[46%]"
        >
          <g fill="none" stroke="#c9a227" strokeOpacity={0.5}>
            <circle
              cx="392"
              cy="40"
              r="210"
              strokeWidth={2}
              vectorEffect="non-scaling-stroke"
            />
            <circle
              cx="398"
              cy="366"
              r="176"
              strokeWidth={2}
              vectorEffect="non-scaling-stroke"
            />
            <circle
              cx="404"
              cy="372"
              r="234"
              strokeWidth={1}
              strokeOpacity={0.3}
              vectorEffect="non-scaling-stroke"
            />
          </g>
        </svg>

        {/* A warm bloom in the corner, where the arcs converge. */}
        <span className="absolute -top-[16%] -right-[10%] size-[34rem] rounded-full bg-[#7a5a1e]/18 blur-3xl" />
      </div>

      <Container width="hero">
        <div
          className={cn(
            "grid items-center gap-12",
            // Measured from the design: the copy runs to ~38% of the frame and
            // the window takes the rest.
            "xl:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] xl:gap-12",
            // Grid items default to `min-width: auto`; without this the
            // window's widest row can force its column past the container.
            "[&>*]:min-w-0",
          )}
        >
          {/* =========================== Copy ========================== */}
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "font-mono text-[0.75rem] font-bold tracking-[0.16em] uppercase",
                "text-[#f8524f]",
              )}
            >
              {community.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.06)}
              className={cn(
                "mt-6 font-display font-bold tracking-[-0.035em]",
                "leading-[1.02] text-balance",
                // Measured from the design at ~64px on a 1440 frame.
                "text-[2.25rem] sm:text-[2.875rem] xl:text-[3.75rem]",
              )}
            >
              {/*
                Three content lines, the last accented — each owns its own row
                as the design has them.
              */}
              {community.headline.map((line) => (
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
              {...rise(0.12)}
              className={cn(
                "mt-7 max-w-[28rem] leading-relaxed text-pretty",
                "text-[1.0625rem] text-[#b4b4bd] sm:text-[1.125rem]",
              )}
            >
              {community.description}
            </motion.p>

            {/* ------------------------ Benefits --------------------- */}
            <ul className="mt-10 space-y-7">
              {community.benefits.map((benefit, index) => {
                const Glyph = GLYPHS[benefit.icon];
                return (
                  <motion.li
                    key={benefit.label}
                    {...rise(0.18 + index * 0.07)}
                    className="group/benefit flex items-center gap-5"
                  >
                    <Glyph
                      className={cn(
                        "size-8 shrink-0 text-[#f8524f]",
                        "duration-normal transition-[scale] ease-out",
                        "will-change-[scale] group-hover/benefit:scale-110",
                      )}
                    />
                    <span className="text-[1.125rem] text-[#e4e4ea]">
                      {benefit.label}
                    </span>
                  </motion.li>
                );
              })}
            </ul>

            <motion.div {...rise(0.42)} className="mt-10">
              <Link
                href={community.action.href}
                className={cn(
                  "group inline-flex items-center gap-3 rounded-full px-8 py-4",
                  "bg-[#f8524f] text-[1.0625rem] font-bold text-white",
                  "duration-normal transition-[background-color,translate,box-shadow] ease-out",
                  "will-change-[translate]",
                  "hover:-translate-y-0.5 hover:bg-[#fb6a5c]",
                  "hover:shadow-[0_1rem_2rem_-0.75rem_rgb(248_82_79/0.8)]",
                  "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#f8524f]",
                )}
              >
                {community.action.label}
                <ArrowIcon
                  className={cn(
                    "size-4.5 shrink-0",
                    "duration-normal transition-[translate] ease-out",
                    "group-hover:translate-x-1",
                  )}
                />
              </Link>
            </motion.div>
          </div>

          {/* ========================== Window ========================= */}
          <Uncopyable>
            <motion.div
              initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{
                once: true,
                amount: 0.12,
                margin: "0px 0px 200% 0px",
              }}
              transition={{ duration: 0.75, ease: easeOut }}
              className="relative"
            >
              <CommunityWindow reduce={Boolean(reduce)} />

              {/*
                The paid-experiences panel overlaps the window's lower right, as
                the design has it. Only from `sm`: stacked below that it sits in
                flow, where an overlap would bury the discussion row.
              */}
              <motion.div
                initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px 200% 0px" }}
                transition={{ duration: 0.6, delay: 0.5, ease: easeOut }}
                className={cn(
                  "mt-4 sm:mt-0",
                  /*
                    Measured off the design against the window's own box: the
                    panel is 31% of the window's width, overhangs its right
                    edge by 6% of that width, and stops just shy of the bottom
                    rather than hanging past it.
                  */
                  "sm:absolute sm:right-[-6%] sm:bottom-[1%] sm:w-[31%]",
                )}
              >
                <PaidCard reduce={Boolean(reduce)} />
              </motion.div>
            </motion.div>
          </Uncopyable>
        </div>
      </Container>
    </section>
  );
}

/* ========================================================================== */
/* WINDOW                                                                     */
/* ========================================================================== */

function CommunityWindow({ reduce }: { reduce: boolean }) {
  const { window: win } = community;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl bg-[#1d1c21]",
        "ring-1 ring-white/8",
        "shadow-[0_2rem_4rem_-1.5rem_rgb(0,0,0,0.7)]",
      )}
    >
      {/* -------------------------- Header ------------------------- */}
      {/*
        One row from `sm`, as the design has it. On a phone the wordmark, the
        rule and the community name cannot share a line without the name
        truncating mid-word, so the row wraps and the rule is dropped.
      */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-5 pt-5">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,#f9c06a,#f8524f)] text-[0.9375rem] font-bold text-white">
          L
        </span>
        <span className="font-display text-[1.25rem] font-bold tracking-[-0.01em] text-[#f2725e]">
          {win.brand}
        </span>

        <span
          aria-hidden="true"
          className="hidden h-6 w-px bg-white/12 sm:block"
        />

        <span className="min-w-0 flex-1 basis-full sm:basis-auto">
          <span className="block truncate text-[1.0625rem] font-bold text-white">
            {win.title}
          </span>
          <span className="block truncate text-[0.875rem] text-[#8a8a96]">
            {win.subtitle}
          </span>
        </span>

        <MoreIcon className="size-5 shrink-0 text-[#8a8a96]" />
      </div>

      {/* --------------------------- Tabs -------------------------- */}
      {/*
        A list, not buttons: this is an illustrative product surface, so
        nothing here should be focusable or announced as a control that goes
        nowhere.
      */}
      <ul className="mt-4 flex gap-7 border-b border-white/10 px-5">
        {win.tabs.map((tab) => {
          const active = "active" in tab && tab.active;
          return (
            <li
              key={tab.label}
              className={cn(
                "-mb-px border-b-2 pb-3 text-[0.9375rem]",
                active
                  ? "border-[#f8524f] font-medium text-[#f8524f]"
                  : "border-transparent text-[#a0a0ab]",
              )}
            >
              {tab.label}
            </li>
          );
        })}
      </ul>

      {/* --------------------------- Stage ------------------------- */}
      <div className="p-4">
        <div className="group/stage relative overflow-hidden rounded-xl">
          <Image
            src={win.stage.image.src}
            alt={win.stage.image.alt}
            width={817}
            height={332}
            sizes="(min-width: 1280px) 46vw, 92vw"
            className={cn(
              "h-auto w-full object-cover",
              "duration-slow transition-[scale] ease-out",
              "will-change-[scale] group-hover/stage:scale-[1.03]",
            )}
          />

          {/*
            The caption bar, drawn over the still. It carries a gradient so the
            label reads whatever the frame behind it happens to be.
          */}
          <div
            className={cn(
              "absolute inset-x-0 bottom-0 flex items-center gap-4 p-4",
              "bg-[linear-gradient(to_top,rgb(0_0_0/0.75),transparent)]",
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                "grid size-11 shrink-0 place-items-center rounded-full bg-[#f8524f]",
                "duration-normal transition-[scale] ease-out",
                "will-change-[scale] group-hover/stage:scale-110",
              )}
            >
              {/* A filled head: an outlined triangle closes up at this size. */}
              <svg viewBox="0 0 24 24" className="size-5 translate-x-px">
                <path d="M9 7.4 16.6 12 9 16.6V7.4Z" fill="white" />
              </svg>
            </span>

            <span className="min-w-0">
              <span
                className={cn(
                  "block font-mono text-[0.625rem] font-bold tracking-[0.14em] uppercase",
                  "text-[#d7d7de]",
                )}
              >
                {win.stage.kind}
              </span>
              <span className="mt-1 block truncate text-[1.0625rem] font-medium text-white">
                {win.stage.title}
              </span>
            </span>
          </div>
        </div>

        {/* ---------------------- Participants ------------------- */}
        <ul className="mt-3 grid grid-cols-4 gap-3">
          {win.participants.map((person, index) => (
            <motion.li
              key={person.src}
              initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px 200% 0px" }}
              transition={{
                duration: 0.45,
                // Left to right, so the four read as people joining.
                delay: 0.55 + index * 0.08,
                ease: easeOut,
              }}
              className={cn(
                "overflow-hidden rounded-lg",
                "duration-normal transition-[translate] ease-out",
                "will-change-[translate] hover:-translate-y-0.5",
              )}
            >
              <Image
                src={person.src}
                alt={person.alt}
                width={160}
                height={118}
                sizes="(min-width: 1280px) 10vw, 22vw"
                className="h-auto w-full object-cover"
              />
            </motion.li>
          ))}
        </ul>

        {/* ----------------------- Discussion -------------------- */}
        <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-white/10 pt-4">
          <Image
            src={win.discussion.avatar.src}
            alt={win.discussion.avatar.alt}
            width={60}
            height={55}
            sizes="40px"
            className="size-10 shrink-0 rounded-full object-cover"
          />
          <span className="min-w-0 flex-1 text-[0.9375rem] text-[#d7d7de]">
            {win.discussion.question}
          </span>
          <span
            aria-hidden="true"
            className="flex shrink-0 items-center gap-2.5 text-[0.9375rem] text-[#f8524f]"
          >
            <BubbleIcon className="size-4.5" />
            {win.discussion.action}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ========================================================================== */
/* PAID PANEL                                                                 */
/* ========================================================================== */

function PaidCard({ reduce }: { reduce: boolean }) {
  const { paid } = community;

  return (
    <div
      className={cn(
        "rounded-2xl bg-[#16161a] p-5",
        "ring-1 ring-[#c9a227]/35",
        "shadow-[0_1.75rem_3.5rem_-1.25rem_rgb(0,0,0,0.75)]",
      )}
    >
      <p
        className={cn(
          "font-mono text-[0.625rem] font-bold tracking-[0.14em] uppercase",
          "text-[#c9a227]",
        )}
      >
        {paid.title}
      </p>

      <ul className="mt-4 space-y-4">
        {paid.items.map((item, index) => {
          const Glyph = GLYPHS[item.icon];
          return (
            <motion.li
              key={item.label}
              initial={reduce ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "0px 0px 200% 0px" }}
              transition={{
                duration: 0.42,
                delay: 0.7 + index * 0.1,
                ease: easeOut,
              }}
              className="flex items-center gap-4"
            >
              <Glyph className="size-6 shrink-0 text-[#f8524f]" />
              <span className="text-[1rem] text-[#e4e4ea]">{item.label}</span>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
