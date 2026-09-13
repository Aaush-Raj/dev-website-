"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { Uncopyable } from "@/components/ui/Uncopyable";

import { FlixArrow } from "./FlixArrow";
import { flix } from "@/content/flix";
import { cn } from "@/lib/utils";

/**
 * LURNYFLIX — GUIDED CREATION
 * ---------------------------------------------------------------------------
 * Section 7: the statement and three steps on the left; the "Create a video"
 * form in the middle; three choice cards on the right, joined to the form by
 * connector arrows.
 *
 * ONLY THE SIX STYLE THUMBNAILS ARE RASTERS
 * Of the four supplied cards exactly one carries photographs — the Visual
 * style card, whose six tiles are rendered portraits. Everything else is
 * rebuilt: the form with its stepper, fields, aspect choices, upload zone and
 * button; the palette card's swatch rows; the audio card's selects and toggle;
 * and the three connectors.
 *
 * That is the opposite call from section 6's editor, and deliberately so: the
 * editor was eleven photographs in a dense grid, where a rebuild risked drift
 * for text too small to read. This is a FORM. Rebuilding it costs nothing and
 * buys real, selectable text at a size people actually read.
 *
 * See scripts/build-flix-guided.cjs.
 *
 * THE ONE CONCESSION: the "3D animation" tile's tick badge is burnt into that
 * thumbnail with no clean plate under it. The selection RING is drawn here;
 * the badge is not, because drawing one would print a second badge over the
 * first.
 *
 * THE CONNECTORS FOLLOW THE COLUMNS
 * The three arrows live on one overlay spanning the whole stage, so a single
 * coordinate space carries each from the form's right edge to its card. Below
 * xl they are dropped — the columns stack there, and a curve between stacked
 * cards has nothing to span.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { guided } = flix;

/** The mark beside each step. */
const stepIcons = {
  upload: UploadIcon,
  palette: PaletteIcon,
  sound: SoundIcon,
} as const;

/** The mark on each aspect-ratio choice. */
const aspectIcons = {
  landscape: LandscapeIcon,
  portrait: PortraitIcon,
} as const;

/**
 * THE THREE CONNECTORS.
 *
 * Drawn by FlixArrow in its "pointer" variant — a thin line ending in a small
 * filled triangle, the diagramming convention for a technical connector. NOT
 * the chevron section 4 uses: that open V only reads at a heavy weight, and
 * on a 3px line it collapsed into a scratchy "›" that floated off the end of
 * the shaft. See the note at the top of FlixArrow.
 *
 * WHERE THEY GO — measured off the rendered stage AFTER its entrance
 * animations settle. The first version guessed and pointed two of the three
 * at the wrong card; the second measured before the cards had lifted into
 * place and landed everything 5% low:
 *
 *   form           x 38.1..68.6, y  0..79.4
 *   Visual style   x 73.2..100,  y  0..51.6
 *   Colour palette x 73.2..100,  y 55.5..68.5
 *   Audio          x 73.2..100,  y 72.3..94.8
 *
 * Each starts just INSIDE the form (x=68, behind it) so the tail is hidden
 * and the line emerges cleanly from the form's edge, level with the field it
 * belongs to; each lands a hair short of the cards' left edge (x=73.2). Starting
 * that close to the edge matters for the elbow: its vertical run sits at the
 * midpoint of the horizontal span, and starting deep inside the form dragged
 * that run back under the card.
 *
 * They are "s" shaped — leave flat, drop, arrive flat — because the gutter is
 * only ~4% wide while the drops are up to 30% tall. An arc across that would
 * be a diagonal slash; an elbow is what the design draws.
 */
const CONNECTORS = [
  /* Video topic -> Visual style, rising into the card's upper part as the
     design draws it. */
  { id: "style", from: { x: 68, y: 20 }, to: { x: 72.9, y: 13 }, shape: "s", weight: 0.62, head: 3.2, delay: 1.15 },
  /* Aspect ratio -> Colour palette, at its mid-height. */
  { id: "palette", from: { x: 68, y: 40.5 }, to: { x: 72.9, y: 62 }, shape: "s", weight: 0.62, head: 3.2, delay: 1.3 },
  /* Upload -> Audio & subtitles, at its mid-height. */
  { id: "audio", from: { x: 68, y: 57 }, to: { x: 72.9, y: 83.5 }, shape: "s", weight: 0.62, head: 3.2, delay: 1.45 },
] as const;

export function FlixGuided() {
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduce ? "shown" : "hidden",
    whileInView: "shown",
    viewport: { once: true, amount: "some" } as const,
    variants: {
      hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
      shown: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.85, delay, ease: easeOut },
      },
    },
  });

  /** The lift the form and the three cards share. */
  const lift = (delay: number) => ({
    initial: reduce
      ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
      : { opacity: 0, y: 26, scale: 0.96, filter: "blur(8px)" },
    whileInView: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
    viewport: { once: true, amount: "some" } as const,
    transition: { duration: 0.85, delay, ease: easeOut },
  });

  return (
    <section className="relative isolate overflow-hidden bg-[#1a0f3d] py-section-lg text-white">
      {/* The gradient. Covers the section, so everything sits on it. */}
      <Image
        src={guided.backdrop.src}
        alt={guided.backdrop.alt}
        width={guided.backdrop.width}
        height={guided.backdrop.height}
        aria-hidden="true"
        sizes="100vw"
        className="pointer-events-none absolute inset-0 -z-10 size-full object-cover"
      />

      <Container width="hero">
        <div className="relative">
          {/* ------------------------ Connectors ------------------- */}
          {/* Below the two columns (which carry z-10), so the tails that start
              inside the form are hidden by it. */}
          <FlixArrow
            arrows={CONNECTORS}
            variant="pointer"
            colour="#8b5cf6"
            reduce={Boolean(reduce)}
            className="hidden xl:block"
          />

          <div
            className={cn(
              "grid items-start gap-10",
              "lg:grid-cols-2",
              "xl:grid-cols-[minmax(0,0.9fr)_minmax(0,0.82fr)_minmax(0,0.72fr)]",
              // A wider gutter between the form and the cards than between
              // the copy and the form: the connectors' elbows live in it, and
              // at gap-8 (32px) there was no room for the line to flatten
              // before its head — the head sat beside the curve, not on it.
              "xl:gap-x-14 xl:gap-y-8",
            )}
          >
            {/* ====================== Left column ================== */}
            <div className="lg:col-span-2 xl:col-span-1">
              <motion.p
                {...rise(0.05)}
                className={cn(
                  "text-[0.6875rem] font-semibold uppercase sm:text-xs",
                  "tracking-[0.22em] text-[#b98cff]",
                )}
              >
                {guided.eyebrow}
              </motion.p>

              <motion.h2
                {...rise(0.16)}
                className={cn(
                  "mt-6 font-display font-bold tracking-[-0.035em]",
                  "leading-[1.06] text-white",
                  "text-[1.875rem] sm:text-[2.25rem] xl:text-[2.625rem]",
                )}
              >
                {guided.headline.map((line) => (
                  <span key={line} className="inline xl:block">
                    {line}{" "}
                  </span>
                ))}
              </motion.h2>

              <motion.p
                {...rise(0.28)}
                className={cn(
                  "mt-6 max-w-[32rem] leading-relaxed text-pretty",
                  "text-[0.9375rem] text-[#c6bade] sm:text-[1rem]",
                )}
              >
                {guided.description}
              </motion.p>

              {/* ---------------------- The steps ----------------- */}
              <ul className="mt-9 space-y-6">
                {guided.steps.map((step, index) => {
                  const Icon = stepIcons[step.icon];

                  return (
                    <motion.li
                      key={step.title}
                      {...rise(0.4 + index * 0.12)}
                      className="flex gap-4"
                    >
                      <span
                        className={cn(
                          "flex size-12 shrink-0 items-center justify-center",
                          "rounded-2xl ring-1 ring-[#7b16e8]/60",
                        )}
                      >
                        <Icon className="size-6 text-[#b98cff]" />
                      </span>

                      <span className="min-w-0">
                        <span className="block text-[1.0625rem] font-bold tracking-[-0.01em] text-white">
                          {step.title}
                        </span>
                        <span className="mt-1 block text-[0.9375rem] text-[#b3a7cc]">
                          {step.body}
                        </span>
                      </span>
                    </motion.li>
                  );
                })}
              </ul>
            </div>

            {/* ======================== The form =================== */}
            {/* `relative z-10`: above the connectors, so the tails that start
                inside this card are hidden by it. */}
            <Uncopyable className="@container relative z-10">
              <motion.div {...lift(0.4)}>
                <CreateForm />
              </motion.div>
            </Uncopyable>

            {/* ==================== The three cards ================ */}
            <Uncopyable className="@container relative z-10">
              <div className="space-y-5">
                <motion.div {...lift(0.6)}>
                  <StyleCard />
                </motion.div>

                <motion.div {...lift(0.75)}>
                  <PaletteCard />
                </motion.div>

                <motion.div {...lift(0.9)}>
                  <AudioCard />
                </motion.div>
              </div>
            </Uncopyable>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ========================================================================== */
/*  The form                                                                  */
/* ========================================================================== */

/**
 * "Create a video" — the guided form the section is about.
 *
 * Rebuilt rather than shipped: it is a form, so every label and value here is
 * real text. Sized in `em` against the column's own width.
 */
function CreateForm() {
  const { form } = guided;

  return (
    <div
      className={cn(
        "rounded-[1.2em] p-[1.3em]",
        "bg-[#211444]/85 backdrop-blur-sm",
        "ring-1 ring-white/12",
        "shadow-[0_30px_66px_-24px_rgb(0_0_0/0.6)]",
        "text-[max(9px,3.1cqw)] sm:text-[max(10px,2.2cqw)] xl:text-[max(9px,1.5cqw)]",
      )}
    >
      {/* ----------------------------- Header ---------------------- */}
      <div className="flex items-center gap-[0.8em]">
        <span
          className={cn(
            "flex size-[2.4em] shrink-0 items-center justify-center",
            "rounded-[0.6em] bg-[#7b16e8] text-[1.1em] font-bold text-white",
          )}
        >
          L
        </span>
        <span className="text-[1.5em] font-bold tracking-[-0.02em] text-white">
          {form.title}
        </span>
      </div>

      <p className="mt-[0.5em] text-[1em] text-[#b3a7cc]">{form.subtitle}</p>

      {/* ---------------------------- Stepper ---------------------- */}
      {/* The active tab is `form.step` rather than a flag on the tab, so the
          two cannot disagree. */}
      <ul className="mt-[1.1em] flex items-center gap-[1.4em] border-b border-white/12 pb-[0.7em]">
        {form.steps.map((label, index) => {
          const active = index === form.step;

          return (
            <li
              key={label}
              className={cn(
                "relative flex items-center gap-[0.5em] pb-[0.55em]",
                active && "after:absolute after:inset-x-0 after:-bottom-[0.75em]",
                active && "after:h-[0.14em] after:rounded-full after:bg-[#8b5cf6]",
              )}
            >
              <span
                className={cn(
                  "flex size-[1.6em] items-center justify-center rounded-full",
                  "text-[0.8em] font-bold",
                  active
                    ? "bg-[#7b16e8] text-white"
                    : "text-[#9a8cbd] ring-1 ring-[#6b5f8c] ring-inset",
                )}
              >
                {index + 1}
              </span>
              <span
                className={cn(
                  "text-[0.98em]",
                  active ? "font-semibold text-white" : "text-[#9a8cbd]",
                )}
              >
                {label}
              </span>
            </li>
          );
        })}
      </ul>

      {/* ----------------------- The topic field ------------------- */}
      <Field label={form.topic.label}>
        <div
          className={cn(
            "flex items-center gap-[0.6em] rounded-[0.6em] p-[0.35em] pl-[0.9em]",
            "bg-[#160d33] ring-1 ring-white/12 ring-inset",
          )}
        >
          <span className="min-w-0 flex-1 truncate text-[0.98em] text-white">
            {form.topic.value}
          </span>

          <span
            className={cn(
              "flex shrink-0 items-center gap-[0.45em] rounded-[0.5em]",
              "bg-gradient-to-r from-[#7b16e8] to-[#9b3ae6]",
              "px-[0.8em] py-[0.5em] text-[0.88em] font-medium text-white",
            )}
          >
            <SparkIcon className="size-[1em]" />
            {form.topic.assist}
          </span>
        </div>
      </Field>

      {/* --------------------- The language field ------------------ */}
      <Field label={form.language.label}>
        <div
          className={cn(
            "flex items-center gap-[0.6em] rounded-[0.6em] px-[0.9em] py-[0.75em]",
            "bg-[#160d33] ring-1 ring-white/12 ring-inset",
          )}
        >
          <span className="min-w-0 flex-1 text-[0.98em] text-white">
            {form.language.value}
          </span>
          <ChevronIcon className="size-[1em] shrink-0 text-[#9a8cbd]" />
        </div>
      </Field>

      {/* ---------------------- The aspect ratio ------------------- */}
      <Field label={form.aspect.label}>
        <div className="grid grid-cols-2 gap-[0.7em]">
          {form.aspect.options.map((option, index) => {
            const Icon = aspectIcons[option.icon];
            const chosen = index === form.aspect.ratio;

            return (
              <span
                key={option.label}
                className={cn(
                  "flex items-center gap-[0.6em] rounded-[0.6em]",
                  "px-[0.85em] py-[0.7em]",
                  chosen
                    ? "bg-[#2c1a5c] ring-1 ring-[#8b5cf6] ring-inset"
                    : "bg-[#160d33] ring-1 ring-white/12 ring-inset",
                )}
              >
                <Icon className="size-[1.2em] shrink-0 text-[#c4b5fd]" />
                <span className="min-w-0 flex-1 truncate text-[0.92em] text-white">
                  {option.label}
                </span>

                {/* The radio. Filled on the chosen one. */}
                <span
                  className={cn(
                    "flex size-[1.15em] shrink-0 items-center justify-center rounded-full",
                    chosen
                      ? "bg-[#8b5cf6]"
                      : "ring-[0.12em] ring-[#6b5f8c] ring-inset",
                  )}
                >
                  {chosen && <CheckIcon className="size-[0.75em] text-white" />}
                </span>
              </span>
            );
          })}
        </div>
      </Field>

      {/* ------------------------ The upload zone ------------------ */}
      <div
        className={cn(
          "mt-[1.1em] rounded-[0.7em] p-[1em] text-center",
          "border border-dashed border-[#6b4bb8]",
        )}
      >
        <UploadCloudIcon className="mx-auto size-[2em] text-[#b98cff]" />
        <p className="mt-[0.55em] text-[1em] font-semibold text-white">
          {form.upload.title}
        </p>
        <p className="mt-[0.2em] text-[0.88em] text-[#9a8cbd]">
          {form.upload.hint}
        </p>

        {/* The attached file. */}
        <div
          className={cn(
            "mt-[0.85em] flex items-center gap-[0.65em] rounded-[0.55em]",
            "bg-[#160d33] px-[0.75em] py-[0.6em] text-left",
            "ring-1 ring-white/12 ring-inset",
          )}
        >
          <PptIcon className="size-[1.5em] shrink-0" />
          <span className="min-w-0 flex-1 truncate text-[0.92em] text-white">
            {form.upload.file}
          </span>
          <TickIcon className="size-[1.3em] shrink-0 text-[#34d399]" />
          <CloseIcon className="size-[1em] shrink-0 text-[#9a8cbd]" />
        </div>
      </div>

      {/* -------------------------- The action --------------------- */}
      <p
        className={cn(
          "mt-[1.1em] flex items-center justify-center gap-[0.6em]",
          "rounded-[0.7em] py-[0.9em]",
          "bg-gradient-to-r from-[#7b16e8] to-[#9b3ae6]",
          "text-[1.1em] font-semibold text-white",
        )}
      >
        {form.action}
        <ArrowIcon className="size-[1em]" />
      </p>
    </div>
  );
}

/** One labelled field in the form. */
function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-[1.1em]">
      <p className="mb-[0.5em] text-[0.95em] text-[#c6bade]">{label}</p>
      {children}
    </div>
  );
}

/* ========================================================================== */
/*  The three choice cards                                                    */
/* ========================================================================== */

/**
 * THE VISUAL STYLE CARD — the one card carrying photographs.
 *
 * The selection RING is drawn here; the tick badge on the selected tile is
 * burnt into that thumbnail, so no second badge is drawn over it.
 */
function StyleCard() {
  const { style } = guided;

  return (
    <div
      className={cn(
        "rounded-[1.1em] p-[1.1em]",
        "bg-[#211444]/85 backdrop-blur-sm",
        "ring-1 ring-white/12",
        "text-[max(9px,3.4cqw)] sm:text-[max(10px,2.4cqw)] xl:text-[max(9px,1.8cqw)]",
      )}
    >
      <CardHead title={style.title} more={style.more} tone="dark" />

      <ul className="mt-[0.9em] grid grid-cols-3 gap-[0.65em]">
        {style.tiles.map((tile) => {
          const selected = tile.id === style.selected;

          return (
            <li key={tile.id}>
              <span
                className={cn(
                  "block overflow-hidden rounded-[0.55em]",
                  selected && "ring-[0.16em] ring-[#8b5cf6]",
                )}
              >
                <Image
                  src={`/images/platform/flix/guided-style-${tile.id}.webp`}
                  alt=""
                  width={110}
                  height={104}
                  sizes="10vw"
                  className="h-auto w-full"
                />
              </span>

              <span
                className={cn(
                  "mt-[0.4em] block text-[0.85em]",
                  selected ? "font-semibold text-white" : "text-[#c6bade]",
                )}
              >
                {tile.label}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** THE COLOUR PALETTE CARD — three swatch rows, one marked. */
function PaletteCard() {
  const { palette } = guided;

  return (
    <div
      className={cn(
        "rounded-[1.1em] bg-[#ede7fb] p-[1.1em]",
        "text-[max(9px,3.4cqw)] sm:text-[max(10px,2.4cqw)] xl:text-[max(9px,1.8cqw)]",
      )}
    >
      <CardHead title={palette.title} more={palette.more} tone="light" />

      <ul className="mt-[0.9em] grid grid-cols-3 gap-[0.65em]">
        {palette.options.map((swatches, index) => {
          const chosen = index === palette.chosen;

          return (
            <li
              key={swatches.join()}
              className={cn(
                "relative flex overflow-hidden rounded-[0.5em]",
                chosen && "ring-[0.16em] ring-[#7b16e8]",
              )}
            >
              {swatches.map((colour) => (
                <span
                  key={colour}
                  className="h-[2.6em] flex-1"
                  style={{ backgroundColor: colour }}
                />
              ))}

              {chosen && (
                <span
                  className={cn(
                    "absolute top-[0.3em] right-[0.3em]",
                    "flex size-[1.2em] items-center justify-center",
                    "rounded-full bg-[#7b16e8]",
                  )}
                >
                  <CheckIcon className="size-[0.75em] text-white" />
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** THE AUDIO & SUBTITLES CARD — two selects and a toggle. */
function AudioCard() {
  const { audio } = guided;

  return (
    <div
      className={cn(
        "rounded-[1.1em] bg-[#ede7fb] p-[1.1em]",
        "text-[max(9px,3.4cqw)] sm:text-[max(10px,2.4cqw)] xl:text-[max(9px,1.8cqw)]",
      )}
    >
      <p className="text-[1.25em] font-bold tracking-[-0.015em] text-[#1d0f3d]">
        {audio.title}
      </p>

      <ul className="mt-[0.9em] space-y-[0.6em]">
        {audio.rows.map((row) => (
          <li key={row.label} className="flex items-center gap-[0.8em]">
            <span className="w-[4em] shrink-0 text-[0.95em] text-[#3f3a52]">
              {row.label}
            </span>

            <span
              className={cn(
                "flex min-w-0 flex-1 items-center gap-[0.5em] rounded-[0.5em]",
                "bg-white px-[0.8em] py-[0.6em]",
                "ring-1 ring-[#ddd4f2] ring-inset",
              )}
            >
              <span className="min-w-0 flex-1 truncate text-[0.92em] text-[#1d1530]">
                {row.value}
              </span>
              <ChevronIcon className="size-[0.9em] shrink-0 text-[#8b84a8]" />
            </span>
          </li>
        ))}

        {/* The toggle. */}
        <li className="flex items-center gap-[0.8em]">
          <span className="w-[4em] shrink-0 text-[0.95em] text-[#3f3a52]">
            {audio.toggle.label}
          </span>

          <span
            className={cn(
              "flex h-[1.7em] w-[3.2em] items-center rounded-full p-[0.2em]",
              audio.toggle.on
                ? "justify-end bg-[#7b16e8]"
                : "justify-start bg-[#cfc6e6]",
            )}
          >
            <span className="size-[1.3em] rounded-full bg-white" />
          </span>
        </li>
      </ul>
    </div>
  );
}

/** The shared head on the style and palette cards. */
function CardHead({
  title,
  more,
  tone,
}: {
  title: string;
  more: string;
  tone: "dark" | "light";
}) {
  return (
    <div className="flex items-center justify-between gap-[1em]">
      <span
        className={cn(
          "text-[1.25em] font-bold tracking-[-0.015em]",
          tone === "dark" ? "text-white" : "text-[#1d0f3d]",
        )}
      >
        {title}
      </span>

      <span
        className={cn(
          "flex shrink-0 items-center gap-[0.35em] text-[0.88em]",
          tone === "dark" ? "text-[#b3a7cc]" : "text-[#5b5478]",
        )}
      >
        {more}
        <ChevronRightIcon className="size-[0.85em]" />
      </span>
    </div>
  );
}

/* ========================================================================== */
/*  Icons                                                                     */
/* ========================================================================== */

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** Start with your content — an upload tray. */
function UploadIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d="M12 16V4M8.4 7.6 12 4l3.6 3.6" {...stroke} />
      <path d="M4 14v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4" {...stroke} />
    </svg>
  );
}

/** Choose your look — a palette. */
function PaletteIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        d="M12 3a9 9 0 1 0 0 18c1.2 0 1.8-.8 1.8-1.7 0-.9-.7-1.4-.7-2.2 0-.8.6-1.4 1.5-1.4h1.6A5.8 5.8 0 0 0 21 10C21 6.1 17 3 12 3Z"
        {...stroke}
      />
      <circle cx="8" cy="11" r="1.2" fill="currentColor" />
      <circle cx="12" cy="8" r="1.2" fill="currentColor" />
      <circle cx="16" cy="11" r="1.2" fill="currentColor" />
    </svg>
  );
}

/** Set your sound and format — a speaker. */
function SoundIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d="M4 9.5h3.5L12 5.8v12.4L7.5 14.5H4V9.5Z" {...stroke} />
      <path d="M15.6 9.4a4 4 0 0 1 0 5.2M18.3 6.8a7.7 7.7 0 0 1 0 10.4" {...stroke} />
    </svg>
  );
}

/** The 16:9 choice. */
function LandscapeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <rect x="2.5" y="6" width="19" height="12" rx="2" {...stroke} />
    </svg>
  );
}

/** The 9:16 choice. */
function PortraitIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <rect x="7" y="2.5" width="10" height="19" rx="2" {...stroke} />
    </svg>
  );
}

/** The AI assist spark. */
function SparkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M13 3.5c.7 4.3 2.2 5.8 6.5 6.5-4.3.7-5.8 2.2-6.5 6.5-.7-4.3-2.2-5.8-6.5-6.5 4.3-.7 5.8-2.2 6.5-6.5Z"
        fill="currentColor"
      />
      <path
        d="M6.5 15c.3 1.9 1 2.6 2.9 2.9-1.9.3-2.6 1-2.9 2.9-.3-1.9-1-2.6-2.9-2.9 1.9-.3 2.6-1 2.9-2.9Z"
        fill="currentColor"
        opacity=".6"
      />
    </svg>
  );
}

/** The upload zone's cloud. */
function UploadCloudIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" aria-hidden="true" className={className}>
      <path
        d="M8 20.5a5 5 0 0 1-.5-10 6.6 6.6 0 0 1 12.7 1.6A4.4 4.4 0 0 1 20.5 20.5"
        {...stroke}
      />
      <path d="M14 22.5V12M10.6 15.2 14 11.8l3.4 3.4" {...stroke} />
    </svg>
  );
}

/** The attached file's PowerPoint mark. */
function PptIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect width="24" height="24" rx="4" fill="#c43e1c" />
      <path d="M12 2a10 10 0 0 1 10 10H12V2Z" fill="#ed6c47" opacity=".9" />
      <rect x="5" y="8" width="10" height="10" rx="1.6" fill="#fff" />
      <path
        d="M7.6 15.6V10.4h2.2a1.8 1.8 0 0 1 0 3.6H7.6"
        stroke="#c43e1c"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

/** The attached file's success tick. */
function TickIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <circle cx="10" cy="10" r="9" fill="currentColor" />
      <path
        d="m6.2 10.3 2.6 2.6L14 7.6"
        stroke="#0b2a20"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** The attached file's dismiss. */
function CloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path
        d="m4 4 8 8M12 4l-8 8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** The tick inside a chosen radio or swatch. */
function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path
        d="m3.5 8.4 3 3L12.5 5"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** The chevron on each select. */
function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path
        d="m4 6 4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** The chevron on each card's "See all". */
function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path
        d="m6 3.5 4.5 4.5L6 12.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** The arrow on the submit button. */
function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path
        d="M3 8h9m0 0-3.4-3.4M12 8l-3.4 3.4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
