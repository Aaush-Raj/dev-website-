"use client";

import { motion, useReducedMotion } from "motion/react";

import { Uncopyable } from "@/components/ui/Uncopyable";
import { platform } from "@/content/platform";
import { cn } from "@/lib/utils";

import {
  AlertDiscIcon,
  ArrowRightIcon,
  CheckDiscIcon,
  LeafIcon,
  PlayIcon,
  cardIcons,
  chipIcons,
} from "./PlatformIcons";

/**
 * PLATFORM HERO — THE PRODUCT CLUSTER
 * ---------------------------------------------------------------------------
 * Four product cards orbiting an employee profile, joined by threads.
 *
 * WHY IT IS NOT THE SUPPLIED CROPS
 * The design ships each card as its own PNG with the interface text baked in —
 * five rasters, ~750KB together. Rebuilt in markup, as every other product
 * mockup on this site is, they stay sharp at any density, cost a few KB, and
 * can arrive and respond to a pointer as individual cards rather than one flat
 * picture. The backdrop behind them is still the supplied render: it is a
 * textless wash, so there is nothing in it to rebuild.
 *
 * IT IS DECORATIVE. This is a picture of the product, not a live view — the
 * section's argument is carried by the copy beside it. So the whole cluster is
 * wrapped in `Uncopyable`, which hides it from assistive technology (rather
 * than announcing forty fragments of mock UI) and stops its text being
 * selected or dragged out as if it were real copy. Every control in it is
 * inert markup, not a button.
 *
 * THE GEOMETRY IS MEASURED, NOT ESTIMATED. Every position below comes from the
 * comp: the cluster spans 690x577 of it, the four cards are ~279x262 with a
 * 133px gutter between the columns, and the profile sits 902-1065 across. Those
 * are expressed as percentages of one aspect-locked box, so a card and the
 * thread that reaches it cannot drift apart at any width.
 *
 * THE THREADS ARE PAIRS OF DOTTED CURVES. Each of the four cards is joined to
 * the profile by TWO short curves, and every curve carries a filled dot at both
 * ends — one on the card's inner edge, one just short of the profile. They stop
 * short rather than touching it, which is what makes them read as connections
 * being drawn rather than as lines welded between panels. Eight curves, four
 * pairs.
 *
 * IT ARRIVES IN ORDER: the profile first, then each card on its own beat,
 * clockwise from the top left, with its two threads drawing as it lands. The
 * cluster describes one person's journey through the platform, so showing it
 * as a sequence says more than fading in a finished diagram. Under
 * prefers-reduced-motion every delay collapses to zero.
 *
 * BELOW LG the cluster is dropped. At phone width four cards and a profile
 * would each be a few centimetres across and illegible, and the copy is what
 * the section is for.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { cluster } = platform.hero;

/**
 * Where each card sits, measured from the comp as percentages of the cluster
 * box. The gutter between the columns is the comp's own 133px.
 */
const placement = {
  readiness: "left-0 top-0 w-[40.4%]",
  learning: "left-[59.7%] top-0 w-[40.1%]",
  ask: "left-0 top-[60.7%] w-[40.4%]",
  feedback: "left-[59.7%] top-[60.7%] w-[40.3%]",
} as const;

/** The beat each card arrives on, clockwise from the top left. */
const beat = {
  readiness: 0.5,
  learning: 0.68,
  feedback: 0.86,
  ask: 1.04,
} as const;

/**
 * The eight threads, in the cluster's own 690x577 viewBox.
 *
 * Each entry is one curve: where it starts (on a card's inner edge), where it
 * ends (just short of the profile), and which card's beat it draws on. Both
 * endpoints get a dot, as the comp draws them.
 */
const threads = [
  // Each pair leaves its card's inner edge and stops just short of the
  // profile. `from` and `to` are the dots; `d` is the curve between them —
  // both endpoints are stated rather than parsed back out of the path, so a
  // dot can never end up somewhere its curve does not.
  {
    card: "readiness",
    from: [279, 168],
    to: [305, 226],
    d: "M279 168 C 300 196, 305 212, 305 226",
  },
  {
    card: "readiness",
    from: [262, 212],
    to: [296, 268],
    d: "M262 212 C 286 226, 296 252, 296 268",
  },
  {
    card: "learning",
    from: [411, 168],
    to: [385, 226],
    d: "M411 168 C 390 196, 385 212, 385 226",
  },
  {
    card: "learning",
    from: [428, 212],
    to: [394, 268],
    d: "M428 212 C 404 226, 394 252, 394 268",
  },
  {
    card: "ask",
    from: [279, 410],
    to: [305, 354],
    d: "M279 410 C 300 384, 305 368, 305 354",
  },
  {
    card: "ask",
    from: [262, 366],
    to: [296, 310],
    d: "M262 366 C 286 352, 296 326, 296 310",
  },
  {
    card: "feedback",
    from: [411, 410],
    to: [385, 354],
    d: "M411 410 C 390 384, 385 368, 385 354",
  },
  {
    card: "feedback",
    from: [428, 366],
    to: [394, 310],
    d: "M428 366 C 404 352, 394 326, 394 310",
  },
] as const;

export function PlatformCluster() {
  const reduce = useReducedMotion();

  /** A card rises into place and settles. */
  const card = (delay: number) => ({
    initial: reduce ? "shown" : "hidden",
    animate: "shown",
    variants: {
      hidden: { opacity: 0, y: 22, scale: 0.96 },
      shown: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.65,
          delay: reduce ? 0 : delay,
          ease: easeOut,
        },
      },
    },
  });

  return (
    <Uncopyable
      className={cn(
        "relative hidden lg:block",
        // The comp's own proportions, so every percentage above means the
        // same thing at any width.
        "aspect-[690/577] w-full",
      )}
    >
      {/* ---------------------------- Threads --------------------------- */}
      {/*
        Drawn in the cluster's own viewBox, so they stay pinned to the cards
        they join. Each curve draws itself as its card lands — a thread that
        fades in reads as decoration, one that draws reads as a connection
        being made — and its two dots fade in behind it.
      */}
      {/*
        The box is aspect-locked to the same 690/577, so the default
        `preserveAspectRatio` maps the viewBox onto it exactly. It must NOT be
        set to "none": that would stretch the endpoint dots into ovals on any
        viewport whose rounding differs by a fraction of a pixel.
      */}
      <svg
        viewBox="0 0 690 577"
        fill="none"
        className="absolute inset-0 size-full"
      >
        {threads.map((thread) => {
          const delay = reduce ? 0 : beat[thread.card] + 0.12;

          return (
            <g key={thread.d}>
              <motion.path
                d={thread.d}
                stroke="#a875e8"
                strokeWidth="1.5"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay, ease: easeOut }}
              />
              {[thread.from, thread.to].map(([cx, cy]) => (
                <motion.circle
                  key={`${cx}-${cy}`}
                  cx={cx}
                  cy={cy}
                  r="5"
                  fill="#9a5fe0"
                  initial={reduce ? { opacity: 1 } : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.3,
                    delay: reduce ? 0 : delay + 0.28,
                    ease: easeOut,
                  }}
                />
              ))}
            </g>
          );
        })}
      </svg>

      {/* ---------------------------- Profile --------------------------- */}
      {/* The person the four cards describe. First in, since they are all
          about her. */}
      <motion.div
        {...card(0.3)}
        className="absolute top-[33.3%] left-[36.5%] z-10 w-[23.6%]"
      >
        <div
          className={cn(
            "rounded-2xl bg-white px-3 py-5 text-center",
            "ring-1 ring-neutral-200/70",
            "shadow-[0_18px_44px_-24px_rgb(60_30_120/0.35)]",
          )}
        >
          <span
            className={cn(
              "mx-auto grid size-12 place-items-center rounded-full",
              "bg-brand-600 font-display text-[0.9375rem] font-bold text-white",
            )}
          >
            {cluster.profile.initials}
          </span>
          <p className="mt-3 font-display text-[0.8125rem] font-bold text-neutral-900">
            {cluster.profile.name}
          </p>
          <p className="mt-0.5 text-[0.6875rem] text-neutral-500">
            {cluster.profile.role}
          </p>
          <p
            className={cn(
              "mt-3 inline-flex items-center gap-1 rounded-full",
              "bg-[#e8f7ee] px-2.5 py-1 text-[0.6875rem] font-medium",
              "text-[#1f7a4d]",
            )}
          >
            <LeafIcon className="size-3" />
            {cluster.profile.chip}
          </p>
        </div>
      </motion.div>

      {/* ----------------------------- Cards ---------------------------- */}
      {cluster.cards.map((entry) => (
        <motion.div
          key={entry.id}
          {...card(beat[entry.id])}
          className={cn("absolute", placement[entry.id])}
        >
          <ProductCard card={entry} />
        </motion.div>
      ))}
    </Uncopyable>
  );
}

/* ====================================================================== */
/*  One card                                                              */
/* ====================================================================== */

type Card = (typeof cluster.cards)[number];

/**
 * A card's shell, with its body chosen by `kind`. The hover lift lives here
 * rather than on the positioned wrapper so it composes with the arrival
 * animation instead of fighting it for the same transform.
 */
function ProductCard({ card }: { card: Card }) {
  const Mark = cardIcons[card.icon];

  return (
    <div
      className={cn(
        "group/card rounded-[1.125rem] bg-white p-3.5",
        "ring-1 ring-neutral-200/70",
        "shadow-[0_16px_38px_-24px_rgb(60_30_120/0.32)]",
        // The professional-feeling hover: a small lift and a deeper shadow,
        // on a curve rather than linearly. Transform-and-shadow only, so it
        // costs no layout.
        "transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
        "hover:-translate-y-1.5",
        "hover:shadow-[0_26px_56px_-26px_rgb(60_30_120/0.45)]",
        "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
      )}
    >
      <div className="flex items-start gap-2.5">
        <span
          className={cn(
            "grid size-9 shrink-0 place-items-center rounded-full",
            "bg-brand-50 text-brand-600",
            // The mark leans in slightly with the card.
            "transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
            "group-hover/card:scale-105",
            "motion-reduce:transition-none motion-reduce:group-hover/card:scale-100",
          )}
        >
          <Mark className="size-4" />
        </span>

        <div className="min-w-0">
          <p className="text-[0.5625rem] font-bold tracking-[0.1em] text-brand-600 uppercase">
            {card.eyebrow}
          </p>
          <p className="mt-0.5 font-display text-[0.875rem] leading-tight font-bold text-neutral-900">
            {card.title}
          </p>
        </div>
      </div>

      <div className="mt-3">
        {card.kind === "radar" && <RadarBody card={card} />}
        {card.kind === "media" && <MediaBody card={card} />}
        {card.kind === "chat" && <ChatBody card={card} />}
        {card.kind === "feedback" && <FeedbackBody card={card} />}
      </div>
    </div>
  );
}

/* --------------------------- Card bodies ----------------------------- */

/**
 * The readiness radar.
 *
 * IT DRAWS ITSELF. The two rings scale up from the centre and the vertex dots
 * appear behind them, so the chart is plotted rather than pasted — target
 * first, then current over it, which is the order the comparison reads in.
 *
 * Both rings are plotted from one helper, so the current and target shapes
 * cannot fall out of step with each other. The graticule is drawn at three
 * depths, as the comp has it, and every vertex carries a dot.
 */
function RadarBody({ card }: { card: Extract<Card, { kind: "radar" }> }) {
  const reduce = useReducedMotion();

  /** Five vertices, starting at twelve o'clock. */
  const vertices = (values: readonly number[]) =>
    values.map((value, index) => {
      const angle = (Math.PI * 2 * index) / values.length - Math.PI / 2;
      const radius = 45 * value;
      return [
        50 + radius * Math.cos(angle),
        50 + radius * Math.sin(angle),
      ] as const;
    });

  const toPoints = (values: readonly number[]) =>
    vertices(values)
      .map(([x, y]) => `${x},${y}`)
      .join(" ");

  /** A ring grows from the centre once its card has landed. */
  const grow = (delay: number) => ({
    initial: reduce ? { scale: 1, opacity: 1 } : { scale: 0.2, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: {
      duration: 0.7,
      delay: reduce ? 0 : delay,
      ease: easeOut,
    },
    style: { transformOrigin: "50px 50px" },
  });

  const Footer = chipIcons[card.footer.icon];

  return (
    <>
      <div className="flex items-center gap-2">
        {/*
          The chart is the card's whole point, so it takes as much of the
          width as the legend can spare: the plot is 6.5rem against a ~267px
          card, where the comp gives it a comparable share. `shrink-0` keeps
          the legend from squeezing it when the card narrows.
        */}
        <svg viewBox="0 0 100 100" className="h-26 w-26 shrink-0" fill="none">
          {/* The graticule the two rings are read against. */}
          {[1, 0.66, 0.33].map((ring) => (
            <polygon
              key={ring}
              points={toPoints(Array.from({ length: 5 }, () => ring))}
              stroke="#e5e2ef"
              strokeWidth="1"
            />
          ))}
          {/* The spokes out to each vertex. */}
          {vertices([1, 1, 1, 1, 1]).map(([x, y]) => (
            <line
              key={`${x}-${y}`}
              x1="50"
              y1="50"
              x2={x}
              y2={y}
              stroke="#eeecf5"
              strokeWidth="1"
            />
          ))}

          {/* Target, then current over it — the order the comparison reads. */}
          <motion.polygon
            {...grow(beat.readiness + 0.25)}
            points={toPoints(card.radar.target)}
            fill="rgb(251 191 86 / 0.2)"
            stroke="#f0a833"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <motion.polygon
            {...grow(beat.readiness + 0.4)}
            points={toPoints(card.radar.current)}
            fill="rgb(127 82 220 / 0.26)"
            stroke="#5b32b7"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />

          {/* A dot at every vertex, as the comp marks them. */}
          {(
            [
              [card.radar.target, "#f0a833", beat.readiness + 0.45],
              [card.radar.current, "#5b32b7", beat.readiness + 0.6],
            ] as const
          ).map(([values, fill, delay]) =>
            vertices(values).map(([x, y]) => (
              <motion.circle
                key={`${fill}-${x}-${y}`}
                cx={x}
                cy={y}
                r="2.6"
                fill={fill}
                initial={reduce ? { opacity: 1 } : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.3,
                  delay: reduce ? 0 : delay,
                  ease: easeOut,
                }}
              />
            )),
          )}
        </svg>

        <ul className="flex flex-col gap-1.5">
          {card.radar.legend.map((item) => (
            <li
              key={item.label}
              className="flex items-center gap-1.5 text-[0.6875rem] text-neutral-600"
            >
              <span
                className={cn(
                  "size-2 rounded-full ring-2",
                  item.tone === "violet"
                    ? "bg-brand-500/40 ring-brand-600"
                    : "bg-[#f7c977]/50 ring-[#f0a833]",
                )}
              />
              {item.label}
            </li>
          ))}
        </ul>
      </div>

      <p
        className={cn(
          "mt-3 flex items-center gap-1.5 rounded-lg bg-neutral-50",
          "px-2.5 py-2 text-[0.6875rem] text-neutral-700",
        )}
      >
        <Footer className="size-3.5 shrink-0 text-neutral-500" />
        {card.footer.label}
      </p>
    </>
  );
}

/** The learning card: a media tile, its caption and a recommendation chip. */
function MediaBody({ card }: { card: Extract<Card, { kind: "media" }> }) {
  const Chip = chipIcons[card.chip.icon];

  return (
    <>
      <div
        className={cn(
          "relative grid h-[4.5rem] place-items-center overflow-hidden rounded-lg",
          "bg-[linear-gradient(115deg,#a78bfa_0%,#7c4ddb_45%,#5b32b7_100%)]",
        )}
      >
        {/* The two soft arcs the design sweeps across the tile. */}
        <span
          className="absolute -top-6 -left-4 size-24 rounded-full bg-white/12"
          aria-hidden="true"
        />
        <span
          className="absolute -right-8 -bottom-10 size-28 rounded-full bg-white/10"
          aria-hidden="true"
        />
        <span
          className={cn(
            "relative grid size-8 place-items-center rounded-full bg-white",
            "text-brand-600 shadow-[0_6px_18px_-6px_rgb(40_15_90/0.5)]",
            // Nudges forward as the card lifts.
            "transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
            "group-hover/card:scale-110",
            "motion-reduce:transition-none motion-reduce:group-hover/card:scale-100",
          )}
        >
          <PlayIcon className="ml-0.5 size-3" />
        </span>
      </div>

      <p className="mt-2.5 text-[0.75rem] font-medium text-neutral-900">
        {card.media.caption}
      </p>

      <p
        className={cn(
          "mt-2 inline-flex items-center gap-1.5 rounded-full",
          "bg-[#fff6e6] px-2.5 py-1 text-[0.6875rem] font-medium text-[#a05e0b]",
        )}
      >
        <Chip className="size-3 text-[#f0a833]" />
        {card.chip.label}
      </p>
    </>
  );
}

/** The Ask card: two conversation turns and the source they came from. */
function ChatBody({ card }: { card: Extract<Card, { kind: "chat" }> }) {
  const Footer = chipIcons[card.footer.icon];

  return (
    <>
      <ul className="flex flex-col gap-1.5">
        {card.turns.map((turn) => {
          const Icon = chipIcons[turn.icon];

          return (
            <li
              key={turn.text}
              className={cn(
                "flex items-center gap-2 rounded-lg px-2.5 py-2",
                "text-[0.6875rem] text-neutral-800",
                turn.tone === "ask"
                  ? "bg-brand-50"
                  : "bg-white ring-1 ring-neutral-200/80",
              )}
            >
              <Icon className="size-3.5 shrink-0 text-brand-600" />
              {turn.text}
            </li>
          );
        })}
      </ul>

      <p
        className={cn(
          "mt-2 inline-flex items-center gap-1.5 rounded-lg bg-neutral-50",
          "px-2.5 py-1.5 text-[0.6875rem] text-neutral-700",
        )}
      >
        <Footer className="size-3.5 shrink-0 text-neutral-500" />
        {card.footer.label}
      </p>
    </>
  );
}

/** The feedback card: two graded rows and a next-step link. */
function FeedbackBody({ card }: { card: Extract<Card, { kind: "feedback" }> }) {
  return (
    <>
      <ul className="flex flex-col gap-2">
        {card.rows.map((row) => (
          <li
            key={row.text}
            className="flex items-center gap-2 text-[0.6875rem] text-neutral-800"
          >
            {row.tone === "pass" ? (
              <CheckDiscIcon className="size-5 shrink-0 text-[#1f9d6b]" />
            ) : (
              <AlertDiscIcon className="size-5 shrink-0 text-[#f0a833]" />
            )}
            {row.text}
          </li>
        ))}
      </ul>

      {/* Inert: this is a picture of a link, not one. */}
      <p
        className={cn(
          "mt-3 inline-flex items-center gap-1",
          "text-[0.6875rem] font-semibold text-brand-600",
        )}
      >
        {card.action}
        <ArrowRightIcon
          className={cn(
            "size-3 transition-transform duration-300",
            "ease-[cubic-bezier(0.16,1,0.3,1)]",
            "group-hover/card:translate-x-0.5",
            "motion-reduce:transition-none motion-reduce:group-hover/card:translate-x-0",
          )}
        />
      </p>
    </>
  );
}
