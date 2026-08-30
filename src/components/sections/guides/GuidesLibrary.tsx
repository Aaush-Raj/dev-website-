"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useId, useMemo, useRef, useState } from "react";

import { Container } from "@/components/ui/Container";
import { guides } from "@/content/guides";
import { cn } from "@/lib/utils";

/**
 * GUIDES LIBRARY
 * ---------------------------------------------------------------------------
 * Section 3 of the Guides & Playbooks page: the whole catalogue, with a search
 * box and format filters on the left and the resource rows on the right.
 *
 * FILTERING IS CLIENT-SIDE
 * There are five resources and no backend. Shipping them all and narrowing in
 * the browser is simpler and faster than a request per keystroke, and it keeps
 * the section working with JavaScript disabled up to the point of interaction:
 * the full list is in the HTML.
 *
 * COUNTS ARE DERIVED
 * The sidebar's per-format counts are computed from the items rather than
 * written into the content file, so they cannot drift as resources are added
 * or removed. The design shows "05 / 01 / 01 / 01 / 01" — that is what the
 * data currently produces, not a number typed twice.
 *
 * SORTING
 * "Show newest first" reverses the list. The content file has no dates on
 * these resources, so newest is taken to be last-added — which is the order
 * they are authored in. If real publication dates arrive, sort on those
 * instead and this comment goes away.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { library } = guides;

type Format = (typeof library.items)[number]["format"];
type FilterValue = Format | "all";

export function GuidesLibrary() {
  const reduce = useReducedMotion();
  const baseId = useId();

  const [query, setQuery] = useState("");
  const [format, setFormat] = useState<FilterValue>("all");
  const [newestFirst, setNewestFirst] = useState(false);
  const radioRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  /** Per-format counts, derived — see the note at the top of this file. */
  const counts = useMemo(() => {
    const map = new Map<Format, number>();
    for (const item of library.items) {
      map.set(item.format, (map.get(item.format) ?? 0) + 1);
    }
    return map;
  }, []);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();

    const matched = library.items.filter((item) => {
      if (format !== "all" && item.format !== format) return false;
      if (!needle) return true;
      // Search the title, description and tag together: people look for
      // "checklist" as readily as they look for a title word.
      return `${item.title} ${item.description} ${item.tag}`
        .toLowerCase()
        .includes(needle);
    });

    return newestFirst ? [...matched].reverse() : matched;
  }, [query, format, newestFirst]);

  /** The filter rows: "all" first, then one per format present in the data. */
  const filters: { value: FilterValue; label: string; count: number }[] = [
    { value: "all", label: library.allLabel, count: library.items.length },
    ...(Object.keys(library.formatLabels) as Format[]).map((key) => ({
      value: key,
      label: library.formatLabels[key],
      count: counts.get(key) ?? 0,
    })),
  ];

  /**
   * Roving focus across the filter group.
   *
   * `role="radio"` promises the arrow-key behaviour native radios have, but
   * ARIA roles carry no behaviour of their own — without this the group
   * announces itself as radios and then does not respond to the keys a screen
   * reader user is told to press. Selection follows focus, which is right
   * here: moving through the filters is the same act as choosing one.
   */
  const onFilterKeyDown = (event: React.KeyboardEvent) => {
    const index = filters.findIndex((f) => f.value === format);
    let next: number | null = null;

    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      next = (index + 1) % filters.length;
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      next = (index - 1 + filters.length) % filters.length;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = filters.length - 1;
    }

    if (next === null) return;
    event.preventDefault();
    const value = filters[next].value;
    setFormat(value);
    radioRefs.current[value]?.focus();
  };

  return (
    <section
      id="library"
      className={cn(
        "relative isolate overflow-hidden py-section-lg",
        // The near-black ground, sampled from the design.
        "bg-[#0a0a09] text-white",
      )}
    >
      <LibraryLineArt />

      <Container width="wide" className="relative">
        {/* =========================== Header ========================= */}
        <motion.div
          initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: "some" }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="flex flex-wrap items-start justify-between gap-x-8 gap-y-4"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 sm:gap-5">
              <p
                className={cn(
                  "text-[0.6875rem] font-bold uppercase",
                  "tracking-[0.18em] text-[#b04ffa] sm:text-xs",
                )}
              >
                {library.eyebrow}
              </p>
              <EyebrowRule className="h-2 w-20 text-[#6d3fae] sm:w-24" />
            </div>

            <h2
              className={cn(
                "mt-6 font-serif font-normal tracking-[-0.015em]",
                "leading-[1.12] text-[#fcfcf9]",
                "text-[2rem] sm:text-[2.75rem] xl:text-[3.25rem]",
              )}
            >
              {library.headline.map((line) => (
                <span key={line} className="inline lg:block">
                  {line}{" "}
                </span>
              ))}
            </h2>

            <p
              className={cn(
                "mt-5 max-w-lg leading-relaxed text-pretty",
                "text-[1rem] text-[#a9a79c] sm:text-[1.0625rem]",
              )}
            >
              {library.description}
            </p>
          </div>

          {/*
            The count. Rendered from the data rather than the design's literal
            "5 RESOURCES", so it stays true as the library grows.
          */}
          <p
            className={cn(
              "text-[0.6875rem] font-bold tracking-[0.14em] uppercase",
              "text-[#dfab78] sm:text-xs",
            )}
          >
            {library.items.length} Resources
            <span aria-hidden="true" className="mx-2.5 text-[#6b5942]">
              &middot;
            </span>
            {library.freeLabel}
          </p>
        </motion.div>

        {/* ============================ Body ========================== */}
        <div
          className={cn(
            "mt-12 grid gap-10",
            "lg:grid-cols-[minmax(0,0.32fr)_minmax(0,1fr)] lg:gap-12",
          )}
        >
          {/* -------------------------- Sidebar --------------------- */}
          <div>
            {/* Search. A plain text input rather than type="search": the
                browser's built-in clear button is styled inconsistently across
                engines and would sit oddly on this ground. */}
            <label htmlFor={`${baseId}-search`} className="sr-only">
              {library.searchPlaceholder}
            </label>
            <div className="relative">
              <SearchIcon className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-[#8c8578]" />
              <input
                id={`${baseId}-search`}
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={library.searchPlaceholder}
                className={cn(
                  "h-13 w-full rounded-lg pr-4 pl-11",
                  "bg-transparent ring-1 ring-[#544534]",
                  "text-[0.9375rem] text-white placeholder:text-[#8c8578]",
                  "transition-[box-shadow] duration-200 ease-out",
                  "hover:ring-[#6d5a44]",
                  "focus:ring-2 focus:ring-[#8641da] focus:outline-none",
                )}
              />
            </div>

            {/* ----------------------- Filters ---------------------- */}
            <p
              className={cn(
                "mt-9 text-[0.6875rem] font-bold tracking-[0.14em] uppercase",
                "text-[#907655]",
              )}
            >
              {library.filterLabel}
            </p>

            {/*
              A radio group, not a list of buttons: the filters are mutually
              exclusive, which is exactly what radios describe. Arrow keys move
              between them for free, and screen readers announce "3 of 6".
            */}
            <div
              role="radiogroup"
              aria-label={library.filterLabel}
              onKeyDown={onFilterKeyDown}
              className="mt-4"
            >
              {filters.map((filter, index) => {
                const selected = filter.value === format;

                return (
                  <button
                    key={filter.value}
                    ref={(el) => {
                      radioRefs.current[filter.value] = el;
                    }}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    // Roving tabindex: only the selected filter is a tab stop,
                    // so Tab moves past the group rather than through all six.
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setFormat(filter.value)}
                    className={cn(
                      "flex w-full items-center gap-3 px-4 py-3.5 text-left",
                      "transition-colors duration-200 ease-out",
                      "focus-visible:outline-2 focus-visible:outline-offset-[-2px]",
                      "focus-visible:outline-[#8641da]",
                      selected ? "rounded-lg bg-[#351d5f]" : "hover:bg-white/4",
                      // A hairline between the format rows, but not above the
                      // first one and not around the selected pill.
                      index > 1 && !selected && "border-t border-[#241f19]",
                    )}
                  >
                    {/* The dot the design draws on the selected row. */}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "size-2 shrink-0 rounded-full",
                        selected ? "bg-[#eeddbf]" : "bg-transparent",
                      )}
                    />
                    <span
                      className={cn(
                        "flex-1 text-[0.8125rem] font-semibold tracking-[0.06em] uppercase",
                        selected ? "text-[#eeddbf]" : "text-[#a9a297]",
                      )}
                    >
                      {filter.label}
                    </span>
                    <span
                      className={cn(
                        "text-[0.8125rem] tabular-nums",
                        selected ? "text-[#eeddbf]" : "text-[#7c7468]",
                      )}
                    >
                      {String(filter.count).padStart(2, "0")}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* ------------------------- Sort ----------------------- */}
            <label
              className={cn(
                "group/sort mt-8 flex w-fit cursor-pointer items-center gap-3",
                "text-[0.875rem] text-[#a9a297]",
              )}
            >
              <input
                type="checkbox"
                checked={newestFirst}
                onChange={(event) => setNewestFirst(event.target.checked)}
                className="peer sr-only"
              />
              <span
                aria-hidden="true"
                className={cn(
                  "grid size-5 shrink-0 place-items-center rounded-sm",
                  "ring-1 ring-[#544534]",
                  "transition-colors duration-200 ease-out",
                  "group-hover/sort:ring-[#6d5a44]",
                  "peer-checked:bg-[#8641da] peer-checked:ring-[#8641da]",
                  "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2",
                  "peer-focus-visible:outline-[#8641da]",
                )}
              >
                <CheckIcon
                  className={cn(
                    "size-3 text-white transition-opacity duration-150 ease-out",
                    newestFirst ? "opacity-100" : "opacity-0",
                  )}
                />
              </span>
              {library.sortLabel}
            </label>
          </div>

          {/* --------------------------- Rows ----------------------- */}
          <div>
            {/* The result count is announced politely, so filtering is not a
                silent change for anyone not watching the list. */}
            <p aria-live="polite" className="sr-only">
              {visible.length} of {library.items.length} resources shown
            </p>

            {visible.length === 0 ? (
              <p className="py-16 text-center text-[0.9375rem] text-[#8c8578]">
                {library.emptyLabel}
              </p>
            ) : (
              <ul>
                {visible.map((item, index) => (
                  <motion.li
                    key={item.id}
                    layout={!reduce}
                    initial={reduce ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: easeOut }}
                    className={cn(index > 0 && "border-t border-[#1c1a17]")}
                  >
                    <Link
                      href={item.href}
                      /* The row is one link, so its accessible name has to
                         carry what distinguishes it — five "Download" links
                         would otherwise be indistinguishable. */
                      aria-label={`Download ${item.title} (${item.tag})`}
                      className={cn(
                        "group/row flex items-center gap-6 rounded-xl px-4 py-5",
                        "transition-colors duration-200 ease-out",
                        "hover:bg-[#100e11]",
                        "focus-visible:outline-2 focus-visible:outline-offset-[-2px]",
                        "focus-visible:outline-[#8641da]",
                      )}
                    >
                      {/* Thumbnail. Fixed width so the rows' text columns line
                          up whatever each image's aspect happens to be. */}
                      <span className="hidden w-51 shrink-0 sm:block">
                        <Image
                          src={item.image.src}
                          alt={item.image.alt}
                          width={item.image.width}
                          height={item.image.height}
                          sizes="204px"
                          className={cn(
                            "h-auto w-full rounded-lg",
                            "transition-[scale] duration-300 ease-out",
                            "group-hover/row:scale-[1.03]",
                            "motion-reduce:transition-none",
                          )}
                        />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-3">
                          <span className="text-[0.8125rem] text-[#c8c7c0] tabular-nums">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span
                            className="text-[0.6875rem] font-bold tracking-[0.12em] uppercase"
                            style={{ color: library.tones[item.format] }}
                          >
                            {item.tag}
                          </span>
                        </span>

                        <span
                          className={cn(
                            "mt-1.5 block font-serif text-[1.25rem] leading-snug",
                            "text-[#fefef9] sm:text-[1.4375rem]",
                          )}
                        >
                          {item.title}
                        </span>

                        <span className="mt-1.5 block text-[0.875rem] text-[#a9a297]">
                          {item.description}
                        </span>

                        <span className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                          {item.meta.map((meta, metaIndex) => (
                            <span
                              key={meta}
                              className="flex items-center gap-3"
                            >
                              <span className="text-[0.75rem] tracking-[0.06em] text-[#8c8578] uppercase">
                                {meta}
                              </span>
                              {metaIndex < item.meta.length - 1 && (
                                <span
                                  aria-hidden="true"
                                  className="text-[#4a443b]"
                                >
                                  &middot;
                                </span>
                              )}
                            </span>
                          ))}
                        </span>
                      </span>

                      {/* The download affordance. The word appears on hover,
                          as the design shows on its highlighted row; the arrow
                          is always there so the action is never hidden. */}
                      <span className="flex shrink-0 items-center gap-3">
                        <span
                          aria-hidden="true"
                          className={cn(
                            "hidden text-[0.875rem] font-medium text-[#b98cf0] lg:block",
                            "opacity-0 transition-opacity duration-200 ease-out",
                            "group-hover/row:opacity-100",
                          )}
                        >
                          Download
                        </span>
                        <DownloadIcon
                          className={cn(
                            "size-6 text-[#8641da]",
                            "transition-[translate] duration-200 ease-out",
                            "group-hover/row:translate-y-0.5",
                          )}
                        />
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            )}

            {/* ------------------------- Note ----------------------- */}
            <p className="mt-8 flex items-center gap-2.5 text-[0.875rem] text-[#8c8578]">
              <InfoIcon className="size-4 shrink-0 text-[#6b6459]" />
              {library.note}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

/** The faint rings and dot grid the design draws at the corners. */
function LibraryLineArt() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 900"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
    >
      <g stroke="#2a2418" strokeWidth="1">
        <circle cx="1395" cy="40" r="120" />
        <circle cx="1395" cy="40" r="180" />
        <circle cx="1395" cy="40" r="250" />
        <circle cx="30" cy="870" r="140" />
        <circle cx="30" cy="870" r="210" />
      </g>
      <g fill="#2f2818">
        {Array.from({ length: 6 }, (_, row) =>
          Array.from({ length: 7 }, (_, col) => (
            <circle
              key={`${row}-${col}`}
              cx={1108 + col * 13}
              cy={150 + row * 13}
              r="1.4"
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

/** The mark in the search field. */
function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle
        cx="7.2"
        cy="7.2"
        r="4.6"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="m10.6 10.6 3 3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** The tick in the sort checkbox. */
function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="m2.5 6.2 2.4 2.4L9.5 4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** The download arrow on each row. */
function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 4v13m0 0-5-5m5 5 5-5M5 20h14"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** The mark beside the closing note. */
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
