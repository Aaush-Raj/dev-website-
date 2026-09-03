"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { Container } from "@/components/ui/Container";
import { caseStudy } from "@/content/case-study";
import { cn } from "@/lib/utils";

/**
 * CASE STUDY ARTICLE
 * ---------------------------------------------------------------------------
 * The body of the BFSI case study: a sticky table of contents beside a
 * long-form article.
 *
 * THE PROSE IS DATA, not markup. Each block in content/case-study.ts declares
 * its `kind` and this component renders it with the SITE'S OWN type scale and
 * tokens — `font-serif` for headings, `font-sans` for body, brand violet for
 * links, the accent ramp for the numbered questions. The supplied design file
 * carried its own fonts and hex values inline; adopting those would have left
 * this page looking like a different site.
 *
 * THE TABLE OF CONTENTS tracks the reader: whichever heading last passed the
 * reading line is highlighted, so the list is a position indicator rather than
 * a static index. It sticks on lg+ and collapses into a <details> disclosure
 * below that, where a sticky rail would eat most of a phone screen.
 *
 * That scroll listener is the only client behaviour here; everything else is
 * static.
 */

const { article, tocTitle } = caseStudy;

/** The headings, derived from the article so the two cannot drift apart. */
const headings = article.filter(
  (block): block is Extract<(typeof article)[number], { kind: "heading" }> =>
    block.kind === "heading",
);

/** Shared styling for a link in either table of contents. */
const tocLink = cn(
  "block text-[0.875rem] leading-snug",
  "duration-normal transition-colors ease-out",
);

export function CaseStudyArticle() {
  /** Which heading is currently in view; drives the TOC's active state. */
  const [activeId, setActiveId] = useState<string>(headings[0]?.id ?? "");

  useEffect(() => {
    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    /*
      Which heading is "current" is decided from ALL of their positions, not
      from intersection events alone.

      A narrow `rootMargin` band was the first approach and it did not work:
      with headings spaced further apart than the band is tall, one can scroll
      straight past without ever intersecting it, and the active item then
      sticks on whatever was last seen. Reading every heading's offset on each
      tick has no such gap — the current one is simply the last heading above
      the reading line.
    */
    const update = () => {
      // The reading line: just below the sticky header.
      const line = 140;

      let current = elements[0];
      for (const element of elements) {
        if (element.getBoundingClientRect().top <= line) current = element;
      }

      setActiveId((previous) =>
        previous === current.id ? previous : current.id,
      );
    };

    update();

    /*
      Coalesced to one read per frame: scroll fires far more often than the
      page can paint, and `getBoundingClientRect` forces layout each time.
    */
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  /** The list of links, shared by the sticky rail and the mobile disclosure. */
  const tocItems = headings.map((heading) => {
    const isActive = heading.id === activeId;

    return (
      <a
        key={heading.id}
        href={`#${heading.id}`}
        aria-current={isActive ? "location" : undefined}
        className={cn(
          tocLink,
          isActive
            ? "font-semibold text-brand-700"
            : "text-neutral-600 hover:text-neutral-900",
        )}
      >
        {heading.text}
      </a>
    );
  });

  return (
    <section className="bg-[#f7f4ee] py-section-sm text-neutral-900 sm:py-section">
      <Container width="content">
        <div
          className={cn(
            "grid gap-10",
            "lg:grid-cols-[minmax(0,13rem)_minmax(0,1fr)] lg:gap-14",
            "lg:items-start xl:gap-16",
            // Centred, so the narrower article does not leave the container's
            // right half empty.
            "mx-auto max-w-[62rem]",
          )}
        >
          {/* ====================== Contents (lg+) ==================== */}
          <nav
            aria-label={tocTitle}
            className={cn(
              "hidden lg:block",
              "lg:sticky lg:top-[calc(var(--header-height)+2rem)]",
            )}
          >
            <p
              className={cn(
                "text-[0.6875rem] font-bold tracking-[0.12em] uppercase",
                "text-neutral-500",
              )}
            >
              {tocTitle}
            </p>

            {/* The rule the design runs down the left of the list. */}
            <div className="mt-4 flex flex-col gap-3 border-l border-neutral-300/80 pl-4">
              {tocItems}
            </div>
          </nav>

          {/* ==================== Contents (mobile) =================== */}
          <details
            className={cn(
              "rounded-xl border border-neutral-300/80 px-4 py-3.5 lg:hidden",
            )}
          >
            <summary
              className={cn(
                "cursor-pointer text-[0.875rem] font-semibold",
                "marker:text-neutral-400",
              )}
            >
              {tocTitle}
            </summary>
            <div className="mt-4 flex flex-col gap-3">{tocItems}</div>
          </details>

          {/* ========================== Article ======================= */}
          <article
            className={cn(
              /*
                Capped in `ch`, not rem: the comfortable measure for long-form
                is a character count, so tying the cap to the font's own width
                keeps it right whatever the type scale does. An earlier
                `44rem` let lines run to ~95 characters.
              */
              "max-w-[68ch]",
              "text-[1.0625rem] leading-[1.75] text-neutral-800",
            )}
          >
            {article.map((block, index) => {
              switch (block.kind) {
                case "heading":
                  return (
                    <h2
                      key={block.id}
                      id={block.id}
                      className={cn(
                        "font-serif font-semibold tracking-[-0.01em]",
                        "text-[1.5rem] text-balance text-neutral-900 sm:text-[1.75rem]",
                        // Anchors clear the floating nav; globals.css gives
                        // every [id] this margin, but headings mid-article
                        // benefit from the extra breathing room above.
                        index === 0 ? "mt-0" : "mt-14",
                        "mb-5",
                      )}
                    >
                      {block.text}
                    </h2>
                  );

                case "text":
                  return (
                    <p key={index} className="mb-5 text-pretty">
                      {block.text}
                      {"emphasis" in block && (
                        <>
                          <strong className="font-semibold text-neutral-900">
                            {block.emphasis}
                          </strong>
                          {block.tail}
                        </>
                      )}
                    </p>
                  );

                case "figure":
                  return (
                    <figure key={index} className="my-10">
                      <Image
                        src={block.src}
                        alt={block.alt}
                        width={1200}
                        height={675}
                        sizes="(min-width: 1024px) 44rem, 92vw"
                        className="aspect-video w-full rounded-xl object-cover"
                      />
                      <figcaption className="mt-3 text-[0.8125rem] text-neutral-500">
                        {block.caption}
                      </figcaption>
                    </figure>
                  );

                case "flow":
                  return (
                    <div
                      key={index}
                      className={cn(
                        "my-10 rounded-xl bg-[#efeae0] p-5",
                        "ring-1 ring-neutral-300/50",
                      )}
                    >
                      <p
                        className={cn(
                          "text-[0.625rem] font-bold tracking-[0.1em] uppercase",
                          "text-accent-800",
                        )}
                      >
                        {block.label}
                      </p>

                      {/* The steps, joined by arrows. A list rather than one
                          string so the arrows can be hidden from screen
                          readers, which would otherwise read them aloud. */}
                      <ol className="mt-3 flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
                        {block.steps.map((step, stepIndex) => (
                          <li
                            key={step}
                            className="flex items-center gap-2.5 text-[0.875rem] text-neutral-700"
                          >
                            {stepIndex > 0 && (
                              <span
                                aria-hidden="true"
                                className="text-neutral-400"
                              >
                                →
                              </span>
                            )}
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  );

                case "numbered":
                  return (
                    <div
                      key={block.number}
                      className={cn(
                        "flex gap-5 border-t border-neutral-300/80 py-7",
                        // The last of the three closes the group with a rule
                        // beneath it, as the design does.
                        block.number === "03" &&
                          "border-b border-neutral-300/80",
                      )}
                    >
                      <span
                        className={cn(
                          "shrink-0 font-serif text-[1.25rem] text-accent-700",
                        )}
                      >
                        {block.number}
                      </span>

                      <div className="min-w-0">
                        <h3 className="font-serif text-[1.1875rem] font-semibold text-neutral-900">
                          {block.title}
                        </h3>
                        {block.body.map((paragraph) => (
                          <p
                            key={paragraph}
                            className="mt-3 text-[1rem] text-pretty"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  );

                case "example":
                  return (
                    <div
                      key={index}
                      className={cn(
                        "my-10 rounded-2xl bg-[#f0e9e0] p-6 sm:p-8",
                        "ring-1 ring-[#e1d6c4]",
                      )}
                    >
                      <h3
                        className={cn(
                          "font-serif text-[1.1875rem] font-medium italic",
                          "text-neutral-900",
                        )}
                      >
                        {block.title}
                      </h3>

                      <p className="mt-5 text-[0.9375rem] text-pretty text-neutral-700">
                        {block.intro}
                      </p>

                      <dl className="mt-6 space-y-4">
                        {block.rows.map((row) => (
                          <div
                            key={row.label}
                            className="grid gap-1.5 sm:grid-cols-[10rem_1fr] sm:gap-6"
                          >
                            <dt
                              className={cn(
                                "text-[0.6875rem] font-semibold tracking-[0.06em]",
                                "text-accent-800 uppercase",
                              )}
                            >
                              {row.label}
                            </dt>
                            <dd className="text-[0.9375rem] text-neutral-800">
                              {row.text}
                            </dd>
                          </div>
                        ))}
                      </dl>

                      <p
                        className={cn(
                          "mt-7 border-t border-[#e1d6c4] pt-5",
                          "text-[0.8125rem] leading-relaxed text-neutral-500",
                        )}
                      >
                        {block.footnote}
                      </p>
                    </div>
                  );

                case "quote":
                  return (
                    <p
                      key={index}
                      className={cn(
                        "mt-12 border-l-[3px] border-accent-500 pl-6",
                        "font-serif text-[1.375rem] leading-[1.4] font-medium",
                        "text-pretty text-neutral-900 sm:text-[1.625rem]",
                      )}
                    >
                      {block.text}
                    </p>
                  );

                default:
                  return null;
              }
            })}
          </article>
        </div>
      </Container>
    </section>
  );
}
