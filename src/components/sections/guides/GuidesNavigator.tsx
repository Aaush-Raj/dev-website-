"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useId, useRef, useState } from "react";

import { Container } from "@/components/ui/Container";
import { guides } from "@/content/guides";
import { cn } from "@/lib/utils";

/**
 * GUIDES NAVIGATOR
 * ---------------------------------------------------------------------------
 * Section 2 of the Guides & Playbooks page: four tasks on the left, and the
 * resource recommended for the selected one on the right.
 *
 * TABS, NOT BUTTONS
 * The list is a real tablist. Each task controls the same panel, which is what
 * the ARIA tab pattern describes, and it buys the keyboard behaviour people
 * expect for free: arrow keys move between tasks, Home/End jump to the ends,
 * and only the selected task is a tab stop, so Tab moves past the group rather
 * than through all four.
 *
 * Selection is `activeId` rather than an index: the tasks carry stable ids, and
 * an index silently points at the wrong task the moment the content file is
 * reordered.
 *
 * THE ARTWORK FRAME
 * The four renders are not the same shape: three are wide clipboards, while
 * task 01's is a narrow strip cropped out of the hero cluster (see
 * content/guides.ts). Letting each size itself would make the column jump on
 * every switch, so they share one fixed-ratio frame and are fitted inside it
 * with `object-contain`. Only the artwork crossfades; the frame never moves.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { navigator: nav } = guides;

/** Any task's id. Without this, useState narrows to the FIRST task's literal
 *  type and every other id is rejected on selection. */
type TaskId = (typeof nav.tasks)[number]["id"];

export function GuidesNavigator() {
  const reduce = useReducedMotion();
  const baseId = useId();

  const [activeId, setActiveId] = useState<TaskId>(nav.tasks[0].id);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const active = nav.tasks.find((t) => t.id === activeId) ?? nav.tasks[0];
  const { resource } = active;

  /* Hoisted rather than read off `resource` inline: the property is a union
     across the four tasks, and TypeScript widens it at each use site. */
  const artwork: {
    src: string;
    alt: string;
    width: number;
    height: number;
  } = resource.image;

  /**
   * Roving focus across the tablist. Selection follows focus, which is the
   * right call here: switching a task only swaps an adjacent panel, so there
   * is no cost to arrowing through them.
   */
  const onKeyDown = (event: React.KeyboardEvent) => {
    const index = nav.tasks.findIndex((t) => t.id === activeId);
    let next: number | null = null;

    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      next = (index + 1) % nav.tasks.length;
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      next = (index - 1 + nav.tasks.length) % nav.tasks.length;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = nav.tasks.length - 1;
    }

    if (next === null) return;
    event.preventDefault();
    const id = nav.tasks[next].id;
    setActiveId(id);
    tabRefs.current[id]?.focus();
  };

  return (
    <section
      id="navigator"
      className={cn(
        "relative isolate overflow-hidden py-section-lg",
        // The warm paper ground, sampled from the design.
        "bg-[#f7eddb] text-[#1c1c19]",
      )}
    >
      {/* The faint line art the design draws at the corners. */}
      <NavigatorLineArt />

      <Container width="wide" className="relative">
        {/* =========================== Header ========================= */}
        <motion.div
          initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: "some" }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="max-w-2xl"
        >
          <div className="flex items-center gap-4 sm:gap-5">
            <p
              className={cn(
                "text-[0.6875rem] font-bold uppercase",
                "tracking-[0.18em] text-[#4d1aad] sm:text-xs",
              )}
            >
              {nav.eyebrow}
            </p>
            <EyebrowRule className="h-2 w-20 text-[#7a4fc0] sm:w-24" />
          </div>

          <h2
            className={cn(
              "mt-6 font-serif font-normal tracking-[-0.015em]",
              "leading-[1.12] text-[#14140f]",
              "text-[2rem] sm:text-[2.75rem] xl:text-[3.25rem]",
            )}
          >
            {nav.headline.map((line) => (
              <span key={line} className="inline lg:block">
                {line}{" "}
              </span>
            ))}
          </h2>

          <p
            className={cn(
              "mt-5 leading-relaxed text-pretty",
              "text-[1rem] text-[#4a4438] sm:text-[1.0625rem]",
            )}
          >
            {nav.description}
          </p>
        </motion.div>

        {/* ============================ Body ========================== */}
        <div
          className={cn(
            "mt-10 grid gap-10 sm:mt-12",
            // Measured from the design: the task list takes ~38%, the artwork
            // and the resource panel share the rest.
            "lg:grid-cols-[minmax(0,0.62fr)_minmax(0,0.52fr)_minmax(0,0.5fr)]",
            "lg:items-start lg:gap-8 xl:gap-10",
          )}
        >
          {/* ------------------------- Task list -------------------- */}
          <div
            role="tablist"
            aria-label="Choose the challenge you're solving"
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
            className={cn(
              "overflow-hidden rounded-lg",
              "ring-1 ring-[#e0d3ba]",
            )}
          >
            {nav.tasks.map((task, index) => {
              const selected = task.id === activeId;

              return (
                <button
                  key={task.id}
                  ref={(el) => {
                    tabRefs.current[task.id] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`${baseId}-tab-${task.id}`}
                  aria-selected={selected}
                  aria-controls={`${baseId}-panel`}
                  // Roving tabindex: only the selected tab is a tab stop.
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveId(task.id)}
                  className={cn(
                    "group/task relative flex w-full items-center gap-5 px-6 py-6 text-left",
                    "transition-colors duration-200 ease-out",
                    "focus-visible:z-10 focus-visible:outline-2",
                    "focus-visible:outline-offset-[-2px] focus-visible:outline-[#4d1aad]",
                    selected
                      ? "bg-[#1c1c19]"
                      : "bg-transparent hover:bg-[#f1e4cc]",
                    // A hairline between rows, but not above the first.
                    index > 0 && !selected && "border-t border-[#e5d9c2]",
                  )}
                >
                  <span
                    className={cn(
                      "font-serif text-[1.375rem] leading-none",
                      // The number keeps its own tone whether or not the row
                      // is selected — it is what identifies the task.
                    )}
                    style={{ color: task.tone }}
                  >
                    {task.number}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span
                      className={cn(
                        "block font-serif text-[1.0625rem] leading-snug sm:text-[1.1875rem]",
                        selected ? "text-[#faf3e6]" : "text-[#17170f]",
                      )}
                    >
                      {task.title}
                    </span>
                    <span
                      className={cn(
                        "mt-1.5 block text-[0.875rem] leading-relaxed",
                        selected ? "text-[#c3b48f]" : "text-[#6b5f4a]",
                      )}
                    >
                      {task.description}
                    </span>
                  </span>

                  <ArrowIcon
                    className={cn(
                      "size-5 shrink-0",
                      "transition-[translate] duration-200 ease-out",
                      "group-hover/task:translate-x-1",
                    )}
                    style={{ color: task.tone }}
                  />
                </button>
              );
            })}
          </div>

          {/* -------------------------- Artwork --------------------- */}
          {/*
            Its own column rather than part of the panel: the renders are tall
            portraits and the panel's copy is short, so nesting them would
            either crop the artwork or leave the panel mostly empty.
          */}
          <div className="relative mx-auto w-full max-w-88 lg:mx-0 lg:max-w-none">
            {/*
              The shared frame. Its ratio is fixed so the column holds its
              height across switches — see the note at the top of this file.
              Each render is absolutely positioned inside it so the outgoing
              and incoming artwork overlap during the crossfade rather than
              reflowing past each other.
            */}
            <div className="relative aspect-3/4">
              <AnimatePresence initial={false}>
                <motion.div
                  key={active.id}
                  initial={
                    reduce ? { opacity: 1 } : { opacity: 0, scale: 0.97, y: 10 }
                  }
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.45, ease: easeOut }}
                  className="absolute inset-0"
                >
                  <Image
                    src={artwork.src}
                    alt={artwork.alt}
                    width={artwork.width}
                    height={artwork.height}
                    sizes="(min-width: 1024px) 30vw, 88vw"
                    className={cn(
                      "h-full w-full object-contain object-center",
                      "drop-shadow-[0_28px_48px_rgb(60_44_20/0.22)]",
                    )}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ---------------------- Resource panel ------------------ */}
          <div
            role="tabpanel"
            id={`${baseId}-panel`}
            aria-labelledby={`${baseId}-tab-${active.id}`}
            tabIndex={0}
            className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4d1aad]"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.id}
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -10 }}
                /* Slightly quicker than the artwork's, so the copy has settled
                   by the time the cover finishes easing in. */
                transition={{ duration: 0.38, ease: easeOut }}
              >
                <p
                  className={cn(
                    "text-[0.6875rem] font-bold tracking-[0.12em] uppercase",
                    "text-[#b35037]",
                  )}
                >
                  Selected resource{" "}
                  <span aria-hidden="true" className="text-[#c9a98f]">
                    /
                  </span>{" "}
                  {resource.kind}
                </p>

                <h3
                  className={cn(
                    "mt-4 font-serif font-normal tracking-[-0.01em]",
                    "text-[1.625rem] leading-[1.15] text-[#14140f] sm:text-[1.875rem]",
                  )}
                >
                  {resource.title}
                </h3>

                {/* The short rule the design draws under the title. */}
                <span
                  aria-hidden="true"
                  className="mt-4 block h-0.5 w-10 bg-[#c2643f]"
                />

                <p className="mt-5 text-[0.9375rem] leading-relaxed text-pretty text-[#4a4438] sm:text-base">
                  {resource.description}
                </p>

                {/* --------------------- Meta chips ----------------- */}
                <ul className="mt-6 flex flex-wrap items-center gap-2.5">
                  {resource.meta.map((item) => (
                    <li
                      key={item}
                      className={cn(
                        "rounded-md px-3 py-2",
                        "bg-[#f1e4cc] ring-1 ring-[#e2d2b4]",
                        "text-[0.6875rem] font-semibold tracking-[0.08em] uppercase",
                        "text-[#5c503c]",
                      )}
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                {/* ----------------------- Actions ------------------ */}
                <Link
                  href="#library"
                  className={cn(
                    "group/cta mt-7 inline-flex h-14 w-full items-center justify-center gap-3 rounded-sm px-7",
                    "bg-[#1a1a17] text-[0.9375rem] font-medium text-[#faf3e6]",
                    "font-serif",
                    // `translate`, not `transform`: Tailwind v4 compiles the
                    // translate utilities to the standalone property.
                    "duration-normal transition-[background-color,box-shadow,translate] ease-out",
                    "will-change-[translate]",
                    "hover:-translate-y-0.5 hover:bg-[#2a2a24]",
                    "hover:shadow-[0_16px_30px_-14px_rgb(26_26_23/0.6)]",
                    "active:translate-y-0",
                  )}
                >
                  <DownloadIcon
                    className={cn(
                      "size-4",
                      "duration-normal transition-[translate] ease-out",
                      "group-hover/cta:translate-y-0.5",
                    )}
                  />
                  {resource.primary}
                </Link>

                <Link
                  href="#library"
                  className={cn(
                    "group/link mt-5 inline-flex flex-col items-start",
                    "text-[0.9375rem] font-semibold text-[#4d1aad]",
                  )}
                >
                  <span className="inline-flex items-center gap-2.5">
                    {resource.secondary}
                    <ArrowIcon
                      className={cn(
                        "size-4",
                        "duration-normal transition-[translate] ease-out",
                        "group-hover/link:translate-x-1",
                      )}
                    />
                  </span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "mt-1.5 block h-px w-full origin-left bg-[#4d1aad]/45",
                      "duration-normal transition-transform ease-out",
                      "group-hover/link:scale-x-0",
                    )}
                  />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* =========================== Helper ========================= */}
        <p className="mt-10 flex items-center justify-center gap-2.5 text-[0.875rem] text-[#6b5f4a]">
          <InfoIcon className="size-4 shrink-0 text-[#a2937a]" />
          {nav.helper}
        </p>
      </Container>
    </section>
  );
}

/** The faint concentric line art at the section's corners. */
function NavigatorLineArt() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 900"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
    >
      <g stroke="#e3d3b5" strokeWidth="1">
        <circle cx="1380" cy="70" r="150" />
        <circle cx="1380" cy="70" r="220" />
        <circle cx="40" cy="860" r="130" />
        <circle cx="40" cy="860" r="196" />
      </g>
      <g fill="#dfcdab">
        {Array.from({ length: 4 }, (_, row) =>
          Array.from({ length: 6 }, (_, col) => (
            <circle
              key={`${row}-${col}`}
              cx={1188 + col * 17}
              cy={26 + row * 17}
              r="1.5"
            />
          )),
        )}
      </g>
    </svg>
  );
}

/** The rule and arrow trailing the eyebrow. */
function EyebrowRule({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 8"
      fill="none"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M0 4h74m0 0-5-3.2M74 4l-5 3.2"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/** The arrow on each task row and the preview link. */
function ArrowIcon({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path
        d="M3 8h9m0 0-3.4-3.4M12 8l-3.4 3.4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** The down arrow on the primary action. */
function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M8 2.6v9m0 0L4.4 8M8 11.6 11.6 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** The mark beside the helper line. */
function InfoIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="6.4" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M8 7.2v4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="8" cy="4.9" r="0.85" fill="currentColor" />
    </svg>
  );
}
