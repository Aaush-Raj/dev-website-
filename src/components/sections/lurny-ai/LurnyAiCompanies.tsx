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
  BriefcaseIcon,
  CardIcon,
  FormatsIcon,
  GamepadIcon,
  MicIcon,
  QuizIcon,
  StackIcon,
  TapIcon,
  TargetIcon,
  VideoIcon,
  WalletIcon,
} from "./LurnyAiIcons";

/**
 * LURNY.AI — CREATE FOR COMPANIES
 * ---------------------------------------------------------------------------
 * Section 3: copy with three benefits on the left, two stacked cards on the
 * right joined by a curved arrow, and a rail of eight formats along the foot.
 *
 * ONLY THE FOUR ARTWORKS SHIP. The design pack supplies both cards as
 * transparent PNGs and the foot rail as a 141KB strip; those are interface, so
 * they are drawn. The notebook photograph and the three tile artworks are cut
 * out of the card art and do ship — 14KB for the set — because they are
 * photography and illustration rather than interface.
 *
 * THE ARROW IS THE ARGUMENT. It runs from the brief down into the collection —
 * a company states a need, and learning comes back — so it draws itself rather
 * than appearing, and the two cards arrive in that order. Its viewBox keeps a
 * fixed aspect: stretching it flattens the curve and skews the head.
 *
 * THE VIDEO TILE KEEPS ITS OWN PLAY HEAD. It is baked into the artwork and
 * correctly placed there; drawing a second one over it gave the tile two
 * buttons, and painting the original out blurred a disc across the subject's
 * face. The tile still scales on hover, so the affordance is not static.
 */

const { companies } = lurnyAi;

/** Motion's string easings are not typed, so the cubic curve is spelled out. */
const easeOut = [0.16, 1, 0.3, 1] as const;

const BENEFIT_GLYPHS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  briefcase: BriefcaseIcon,
  formats: FormatsIcon,
  wallet: WalletIcon,
};

const FORMAT_GLYPHS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  video: VideoIcon,
  mic: MicIcon,
  card: CardIcon,
  stack: StackIcon,
  quiz: QuizIcon,
  tap: TapIcon,
  target: TargetIcon,
  gamepad: GamepadIcon,
};

export function LurnyAiCompanies() {
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduce ? "shown" : "hidden",
    whileInView: "shown",
    /*
      A generous bottom margin. On a phone the cards and the foot rail sit far
      below the fold — at a smaller margin they stayed at opacity 0 and the
      section rendered as copy and nothing else.
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
        // Sampled from the supplied plate: a near-black with a blue cast.
        "bg-[#1b1d22] text-white",
      )}
    >
      {/* ========================= Background ========================= */}
      {/*
        The plate's geometry: two large faint rings behind the cards and a
        dotted grid in the top-right corner. Both drawn — the plate ships them
        as a 1.2MB image, and they are a pair of circles and a dot pattern.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        {/* The rings keep a fixed aspect so they stay circular. */}
        <svg
          viewBox="0 0 400 400"
          preserveAspectRatio="xMidYMid meet"
          className="absolute top-[4%] right-[-6%] h-[92%] w-[58%]"
        >
          <g fill="none" stroke="white" strokeOpacity={0.07} strokeWidth={1}>
            <circle
              cx="215"
              cy="185"
              r="175"
              vectorEffect="non-scaling-stroke"
            />
            <circle
              cx="160"
              cy="215"
              r="140"
              vectorEffect="non-scaling-stroke"
            />
          </g>
        </svg>

        {/*
          The dotted grid. A repeating radial gradient rather than an SVG of
          individual dots — same result, one declaration.
        */}
        <span
          className={cn(
            "absolute top-[2%] right-[2%] h-[16%] w-[16%]",
            "bg-[radial-gradient(circle,rgb(255_255_255/0.22)_1px,transparent_1px)]",
            "bg-[size:14px_14px]",
          )}
        />
      </div>

      <Container width="hero">
        <div
          className={cn(
            "grid items-center gap-12",
            "pt-16 pb-12 sm:pt-20 lg:pt-24",
            // Measured from the design: the copy runs to ~42% of the frame and
            // the cards take the rest.
            "xl:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] xl:gap-12",
            // Grid items default to `min-width: auto`; without this a card's
            // widest row can force its column past the container.
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
              {companies.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.06)}
              className={cn(
                "mt-5 font-display font-bold tracking-[-0.035em]",
                "leading-[1.04] text-balance",
                // Measured from the design at ~56px on a 1440 frame.
                "text-[2.125rem] sm:text-[2.625rem] xl:text-[3.25rem]",
              )}
            >
              {/*
                Three content lines, the last two accented — they read as one
                coral block in the design, which is why both carry the flag
                rather than the pair being a single entry.
              */}
              {companies.headline.map((line) => (
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
                "mt-6 max-w-[26rem] leading-relaxed text-pretty",
                "text-[1.0625rem] text-[#b4b4bd] sm:text-[1.125rem]",
              )}
            >
              {companies.description}
            </motion.p>

            {/* ------------------------ Benefits --------------------- */}
            <ul className="mt-10 space-y-6">
              {companies.benefits.map((benefit, index) => {
                const Glyph = BENEFIT_GLYPHS[benefit.icon];
                return (
                  <motion.li
                    key={benefit.label}
                    {...rise(0.18 + index * 0.07)}
                    className="group/benefit flex items-center gap-5"
                  >
                    <Glyph
                      className={cn(
                        "size-7 shrink-0 text-[#f8524f]",
                        "duration-normal transition-[scale] ease-out",
                        "will-change-[scale] group-hover/benefit:scale-110",
                      )}
                    />
                    <span className="text-[1.0625rem] font-bold text-white">
                      {benefit.label}
                    </span>
                  </motion.li>
                );
              })}
            </ul>

            <motion.div {...rise(0.42)} className="mt-10">
              <Link
                href={companies.action.href}
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
                {companies.action.label}
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

          {/* =========================== Cards ========================= */}
          <Uncopyable className="relative">
            <motion.div
              initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15, margin: "0px 0px 90% 0px" }}
              transition={{ duration: 0.7, ease: easeOut }}
            >
              <BriefCard />
            </motion.div>

            {/*
              The arrow sits between the two cards, in the gap their margin
              creates. It is the section's one gesture, so it draws itself.
            */}
            <ConnectorArrow reduce={Boolean(reduce)} />

            <motion.div
              initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15, margin: "0px 0px 90% 0px" }}
              transition={{ duration: 0.7, delay: 0.55, ease: easeOut }}
              className="mt-4"
            >
              <CollectionCard reduce={Boolean(reduce)} />
            </motion.div>
          </Uncopyable>
        </div>
      </Container>

      {/* ========================= Format rail ======================== */}
      <div className="relative border-t border-white/10">
        <Container width="hero">
          <ul
            className={cn(
              "grid gap-y-8 py-7",
              "grid-cols-2 sm:grid-cols-4 xl:grid-cols-8",
              // The design rules between the items, not around them.
              "xl:divide-x xl:divide-white/10",
            )}
          >
            {companies.formats.map((format, index) => {
              const Glyph = FORMAT_GLYPHS[format.icon];
              return (
                <motion.li
                  key={format.label}
                  /*
                    Its own viewport margin, not the shared `rise`. On a phone
                    the rail sits below the copy AND both stacked cards — far
                    enough down that the shared 90% margin still left all eight
                    items at opacity 0.
                  */
                  initial={
                    reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }
                  }
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{
                    once: true,
                    amount: "some",
                    margin: "0px 0px 200% 0px",
                  }}
                  transition={{
                    duration: 0.5,
                    delay: 0.04 * index,
                    ease: easeOut,
                  }}
                  className={cn(
                    "group/format flex flex-col items-center gap-3 text-center",
                    "xl:px-2",
                  )}
                >
                  <Glyph
                    className={cn(
                      "size-7 shrink-0 text-[#f8524f]",
                      "duration-normal transition-[scale,color] ease-out",
                      "will-change-[scale] group-hover/format:scale-115",
                      "group-hover/format:text-[#fb7a6a]",
                    )}
                  />
                  <span className="text-[0.9375rem] text-[#c8c8d2]">
                    {format.label}
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
/* BRIEF CARD                                                                 */
/* ========================================================================== */

function BriefCard() {
  const { brief } = companies;

  return (
    <div
      className={cn(
        "group/brief overflow-hidden rounded-2xl bg-[#1e2127]",
        "ring-1 ring-white/8",
        "shadow-[0_1.5rem_3rem_-1.25rem_rgb(0,0,0,0.6)]",
        "duration-normal transition-[translate,--tw-ring-color] ease-out",
        "will-change-[translate] hover:-translate-y-1 hover:ring-[#f8524f]/30",
      )}
    >
      <div className="grid sm:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        {/* ------------------------ Copy ----------------------- */}
        <div className="p-5">
          <p className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-2.5">
              <span className="grid size-8 place-items-center rounded-full bg-[linear-gradient(135deg,#f9c06a,#f8524f)] text-[0.875rem] font-bold text-white">
                L
              </span>
              <span className="font-display text-[1.25rem] font-bold tracking-[-0.01em] text-[#f2725e]">
                {brief.brand}
              </span>
            </span>
            <span
              className={cn(
                "shrink-0 rounded-full px-3 py-1.5",
                "text-[0.75rem] text-[#c8c8d2] ring-1 ring-white/18",
              )}
            >
              {brief.chip}
            </span>
          </p>

          <p
            className={cn(
              "mt-5 font-mono text-[0.6875rem] font-bold tracking-[0.12em] uppercase",
              "text-[#f2a08e]",
            )}
          >
            {brief.eyebrow}
          </p>
          <p className="mt-2 font-display text-[1.25rem] leading-tight font-bold tracking-[-0.015em] text-white">
            {brief.title}
          </p>
          <p className="mt-2.5 text-[0.875rem] text-[#b4b4bd]">
            {brief.audience}
          </p>
          <p className="mt-2 text-[0.875rem] text-[#b4b4bd]">{brief.goal}</p>
        </div>

        {/* ----------------------- Photo ----------------------- */}
        <div className="relative min-h-[9rem] overflow-hidden">
          <Image
            src={brief.image.src}
            alt={brief.image.alt}
            fill
            sizes="(min-width: 1280px) 18vw, 40vw"
            className={cn(
              "object-cover",
              "duration-slow transition-[scale] ease-out",
              "will-change-[scale] group-hover/brief:scale-[1.04]",
            )}
          />
        </div>
      </div>
    </div>
  );
}

/* ========================================================================== */
/* COLLECTION CARD                                                            */
/* ========================================================================== */

function CollectionCard({ reduce }: { reduce: boolean }) {
  const { collection } = companies;

  return (
    <div
      className={cn(
        "rounded-2xl bg-[#1e2127] p-5",
        "ring-1 ring-white/8",
        "shadow-[0_1.5rem_3rem_-1.25rem_rgb(0,0,0,0.6)]",
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-display text-[1.375rem] leading-tight font-bold tracking-[-0.02em] text-white">
          {collection.title}
        </p>
        <p
          className={cn(
            "font-mono text-[0.625rem] tracking-[0.14em] uppercase",
            "text-[#8a8a96]",
          )}
        >
          {collection.note}
        </p>
      </div>

      <ul className="mt-4 grid gap-3.5 sm:grid-cols-3">
        {collection.tiles.map((tile, index) => (
          <motion.li
            key={tile.title}
            initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px 90% 0px" }}
            transition={{
              duration: 0.5,
              // Left to right, a beat behind the card itself.
              delay: 0.75 + index * 0.1,
              ease: easeOut,
            }}
            className={cn(
              "group/tile overflow-hidden rounded-xl bg-[#24272e]",
              "duration-normal transition-[translate,box-shadow] ease-out",
              "will-change-[translate] hover:-translate-y-1",
              "hover:shadow-[0_0.75rem_1.75rem_-0.75rem_rgb(0,0,0,0.6)]",
            )}
          >
            <span className="relative block aspect-[1.41/1] overflow-hidden">
              <Image
                src={tile.image.src}
                alt={tile.image.alt}
                fill
                sizes="(min-width: 1280px) 11vw, 30vw"
                className={cn(
                  "object-cover",
                  "duration-slow transition-[scale] ease-out",
                  "will-change-[scale] group-hover/tile:scale-[1.05]",
                )}
              />
            </span>

            <span className="block p-3.5">
              <span
                className={cn(
                  "block font-mono text-[0.625rem] tracking-[0.14em] uppercase",
                  "text-[#8a8a96]",
                )}
              >
                {tile.kind}
              </span>
              <span className="mt-1.5 block text-[0.9375rem] leading-snug font-semibold text-white">
                {tile.title}
              </span>
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

/* ========================================================================== */
/* CONNECTOR                                                                  */
/* ========================================================================== */

/**
 * The curved arrow running from the brief card down into the collection.
 *
 * It draws itself on view: the curve is the section's argument — a company
 * states a need, and learning comes back — so watching it travel says
 * something a static line does not.
 *
 * Hidden below `sm`, where the cards stack tight and the arrow would have no
 * gap to occupy.
 */
function ConnectorArrow({ reduce }: { reduce: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute hidden sm:block",
        /*
          Measured off the design: the arrow's centre sits at 52% of the card
          column — dead centre, in the gap between the two cards — and it is a
          short narrow hook rather than a wide sweep. Placed at the right third
          by eye it landed on the collection card's own note text.
        */
        "top-[41%] left-1/2 z-1 w-9 -translate-x-1/2",
      )}
    >
      <svg
        viewBox="0 0 40 56"
        preserveAspectRatio="xMidYMid meet"
        className="w-full overflow-visible"
      >
        <motion.path
          d="M14 2c9 9 10 22 4 38"
          fill="none"
          stroke="#f8524f"
          strokeWidth={2.6}
          strokeLinecap="round"
          initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "0px 0px 90% 0px" }}
          transition={{ duration: 0.7, delay: 0.3, ease: easeOut }}
        />
        <motion.path
          d="m10 32 8 10 8-8"
          fill="none"
          stroke="#f8524f"
          strokeWidth={2.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduce ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "0px 0px 90% 0px" }}
          transition={{ duration: 0.28, delay: 0.95 }}
        />
      </svg>
    </span>
  );
}
