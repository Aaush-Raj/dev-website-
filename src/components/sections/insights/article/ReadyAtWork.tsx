"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { readyAtWork } from "@/content/insights/ready-at-work";
import { cn } from "@/lib/utils";

import {
  ArticleAudio,
  ArticleMiniPlayer,
  useSimulatedAudio,
} from "./ArticleAudio";
import { ArrowDownIcon, PlayIcon, PrintIcon, ShareIcon } from "./ArticleIcons";
import { ArticleRail, ArticleToolbar, type ArticleTools } from "./ArticleRail";
import {
  ConversationDiagram,
  FourRings,
  HeroDiagram,
  StageDiagram,
  questionIcons,
} from "./ReadyAtWorkArt";
import { EYEBROW, FRAME, HEADING, PROSE, accent, ink } from "./tokens";

/**
 * INSIGHT ARTICLE — "What does 'ready' actually mean at work?"
 * ---------------------------------------------------------------------------
 * The whole article, rebuilt from the supplied HTML export.
 *
 * WHAT WAS KEPT AND WHAT WAS CHANGED. The export is a single self-contained
 * page with its own inline-styled nav and its own template engine. The layout,
 * the palette, the type, the diagrams and every word are reproduced exactly.
 * Two things are not:
 *
 *   - Its floating nav pill is dropped. This route sits inside the site, so
 *     the real Header and Footer wrap it — a second, non-functional nav would
 *     be a dead copy of the real one three lines below it.
 *
 *   - Its progress bar, rail spy and mini-player were driven by a scroll
 *     handler running on every frame and calling setState. They are rebuilt on
 *     an IntersectionObserver plus a throttled scroll read, which does the same
 *     work without laying out the document on each event.
 *
 * THE FULL-BLEED BREAKS. Twice — at the definition and at the closing question
 * — the design steps out of the article column to run the full 1180px frame.
 * That is why the prose is three `<article>` runs rather than one: the breaks
 * are structural, and faking them with negative margins inside one column
 * would fight the sticky rail beside it.
 *
 * ON THE DECORATIVE LISTS. Several lists in the design set a small square
 * instead of a bullet. Those squares are `aria-hidden` spans, and the lists
 * stay real `<ul>`s, so the count and the items are still announced.
 */

const a = readyAtWork;

/** Where the rail's spy switches over: 35% down the viewport, as the export. */
const SPY_LINE = 0.35;

/** How far down the mini-player appears. */
const MINI_AFTER = 900;

export function ReadyAtWork() {
  const audio = useSimulatedAudio(a.audio.duration);

  const [readPercent, setReadPercent] = useState(0);
  /* Widened from the literal the `as const` content infers — the spy assigns
     any of the ten section ids to it. */
  const [active, setActive] = useState<string>(a.rail.items[0].id);
  const [showMini, setShowMini] = useState(false);
  const [miniDismissed, setMiniDismissed] = useState(false);

  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  // Cleared on unmount so a copy right before navigation cannot set state on
  // a gone component.
  const copyTimer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(copyTimer.current), []);

  /* ---------------------- Progress, spy, mini-player ------------------- */
  useEffect(() => {
    let frame = 0;

    const read = () => {
      frame = 0;

      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const y = window.scrollY;

      setReadPercent(max > 0 ? Math.min(100, Math.max(0, (y / max) * 100)) : 0);
      setShowMini(y > MINI_AFTER);

      // The last section whose top has crossed the spy line wins. `s4b` is
      // the continuation of s4 after the full-bleed definition, so it maps
      // back onto s4 rather than becoming an eleventh entry.
      let current: string = a.rail.items[0].id;

      for (const node of document.querySelectorAll<HTMLElement>("[data-sec]")) {
        if (node.getBoundingClientRect().top <= window.innerHeight * SPY_LINE) {
          current = node.id === "s4b" ? "s4" : node.id;
        }
      }

      setActive(current);
    };

    // Coalesce to one read per frame — the export ran this on every event.
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  /* ------------------------------ Tools -------------------------------- */
  const copy = useCallback(() => {
    const done = () => {
      setCopied(true);
      window.clearTimeout(copyTimer.current);
      copyTimer.current = window.setTimeout(() => setCopied(false), 1800);
    };

    // `clipboard` is undefined on insecure origins, so the label still
    // flips rather than the button appearing to do nothing.
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href).then(done, done);
    } else {
      done();
    }
  }, []);

  const tools: ArticleTools = {
    share: () => {
      if (navigator.share) {
        // A dismissed share sheet rejects; that is a choice, not an error.
        navigator
          .share({ title: document.title, url: window.location.href })
          .catch(() => {});
      } else {
        copy();
      }
    },
    copy,
    toggleSave: () => setSaved((value) => !value),
    print: () => window.print(),
    copied,
    saved,
  };

  return (
    <div className="relative" style={{ background: ink.paper }}>
      {/* The read-progress bar. Decorative twice over: it duplicates the
          scrollbar, and the rail already says where the reader is. */}
      <div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-90 h-[3px] bg-[rgba(25,21,34,0.07)] print:hidden"
      >
        <div
          className="h-full"
          style={{
            width: `${readPercent}%`,
            background: `linear-gradient(90deg, ${accent.terracotta}, ${accent.violet})`,
          }}
        />
      </div>

      {/* The paper grain over the whole page. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-50 mix-blend-multiply"
        style={{
          backgroundImage:
            "repeating-radial-gradient(circle at 17% 23%, rgba(25,21,34,0.035) 0 1px, transparent 1px 3px), repeating-radial-gradient(circle at 71% 66%, rgba(25,21,34,0.03) 0 1px, transparent 1px 4px)",
        }}
      />

      <main id="top" className="relative font-article">
        {/* ========================== HERO ========================== */}
        <section
          className={cn(
            FRAME,
            "grid items-center gap-[clamp(1.75rem,5vw,4.5rem)] pt-[7.5rem] lg:pt-[9.25rem]",
            "[grid-template-columns:repeat(auto-fit,minmax(20.625rem,1fr))]",
          )}
        >
          <div className="raw-rise-in">
            <div
              className="flex items-center gap-2 text-[0.6875rem] font-semibold tracking-[0.14em] uppercase"
              style={{ color: ink.subtle }}
            >
              <span>{a.breadcrumb[0]}</span>
              <span style={{ color: ink.line }}>/</span>
              <span>{a.breadcrumb[1]}</span>
            </div>

            <div className="mt-[26px] mb-[18px] flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-px w-[26px]"
                style={{ background: accent.terracotta }}
              />
              <span
                className="text-[0.71875rem] font-bold tracking-[0.16em] uppercase"
                style={{ color: accent.terracotta }}
              >
                {a.category}
              </span>
            </div>

            <h1
              className={cn(
                "mb-[26px] font-reading font-normal text-balance",
                "text-[clamp(2.375rem,5.4vw,4.25rem)] leading-[1.04]",
                "tracking-[-0.025em]",
              )}
              style={{ color: ink.black }}
            >
              {a.title}
            </h1>

            <p
              className={cn(
                "mb-[30px] max-w-[33ch] font-reading text-pretty",
                "text-[clamp(1.1875rem,2vw,1.4375rem)] leading-[1.5]",
              )}
              style={{ color: ink.muted }}
            >
              {a.standfirst}
            </p>

            <div
              className="flex items-center gap-3.5 border-b pb-7 text-[0.71875rem] font-semibold tracking-[0.12em] uppercase"
              style={{ borderColor: ink.line, color: ink.subtle }}
            >
              <span>{a.facts[0]}</span>
              <span
                aria-hidden="true"
                className="size-1 rounded-full"
                style={{ background: ink.line }}
              />
              <span>{a.facts[1]}</span>
            </div>

            <a
              href="#article"
              className={cn(
                "mt-[26px] inline-flex items-center gap-2.5",
                "text-[0.8125rem] font-semibold tracking-[0.04em]",
                "text-[#191522] transition-colors hover:text-[#5B2A9D]",
              )}
            >
              {a.beginReading}
              <ArrowDownIcon className="size-4" />
            </a>
          </div>

          <div className="relative p-[clamp(0.5rem,2vw,1.5rem)]">
            <HeroDiagram />
          </div>
        </section>

        {/* ====================== AUDIO EDITION ===================== */}
        <section
          className={cn(FRAME, "mt-[clamp(3rem,7vw,5.25rem)] print:hidden")}
        >
          <ArticleAudio content={a.audio} audio={audio} />
        </section>

        {/* ================== ARTICLE — first run =================== */}
        <div
          id="article"
          className={cn(
            FRAME,
            "mt-[clamp(3.5rem,8vw,6rem)] flex items-start",
            "gap-[clamp(1.5rem,4vw,3.5rem)]",
          )}
        >
          <ArticleRail content={a.rail} active={active} tools={tools} />

          <article className="mx-auto max-w-[47.5rem] min-w-0 flex-auto">
            <ArticleToolbar content={a.rail.tools} tools={tools} />

            {/* ---------------------- s1 ---------------------- */}
            <section id="s1" data-sec>
              <p className={cn(PROSE, "mb-[26px]")}>
                {/* The drop cap. It is the paragraph's own first letter set
                    large and floated, so the sentence is one run of text to
                    a reader and to a screen reader alike. */}
                <span
                  aria-hidden="true"
                  className="float-left mt-2 mr-3.5 font-reading text-[5.5rem] leading-[0.78] font-normal"
                  style={{ color: accent.violet }}
                >
                  {a.intro.lead.charAt(0)}
                </span>
                {a.intro.lead.slice(1)}
              </p>

              {a.intro.body.map((line) => (
                <p key={line} className={cn(PROSE, "mb-[26px]")}>
                  {line}
                </p>
              ))}

              <figure
                className="my-10 border-l-2 pl-[clamp(1.125rem,4vw,2.125rem)]"
                style={{ borderColor: accent.terracotta }}
              >
                <p
                  className={cn(
                    "font-reading font-normal",
                    "text-[clamp(1.625rem,3.4vw,2.125rem)] leading-[1.28]",
                    "tracking-[-0.02em]",
                  )}
                  style={{ color: ink.black }}
                >
                  {a.intro.pullQuote}
                </p>
              </figure>

              {a.intro.after.map((line) => (
                <p key={line} className={cn(PROSE, "mb-[26px]")}>
                  {line}
                </p>
              ))}
            </section>

            {/* ---------------------- s2 ---------------------- */}
            <section id="s2" data-sec>
              <Heading className="mt-[68px]">{a.readyForWhat.heading}</Heading>
              <p className={cn(PROSE, "mb-[26px]")}>{a.readyForWhat.intro}</p>

              <div className="mb-[26px] flex flex-wrap items-start gap-[clamp(1.125rem,3vw,2rem)]">
                <div className="min-w-0 flex-[1_1_18.75rem]">
                  <p className={PROSE}>{a.readyForWhat.aside}</p>
                </div>
                <figure className="min-w-0 flex-[1_1_15rem]">
                  <FourRings />
                  <Caption>{a.readyForWhat.figureCaption}</Caption>
                </figure>
              </div>

              {a.readyForWhat.body.map((line) => (
                <p key={line} className={cn(PROSE, "mb-[26px]")}>
                  {line}
                </p>
              ))}

              {/* The design sets the question apart from the prose around it. */}
              <p
                className={cn(
                  "mb-[26px] font-reading text-[1.4375rem] leading-[1.45]",
                  "text-pretty",
                )}
                style={{ color: ink.black }}
              >
                {a.readyForWhat.question}
              </p>

              <p className={cn(PROSE, "mb-[26px]")}>{a.readyForWhat.close}</p>
            </section>

            {/* ---------------------- s3 ---------------------- */}
            <section id="s3" data-sec>
              <Heading className="mt-[68px]">{a.signals.heading}</Heading>
              <p className={cn(PROSE, "mb-[26px]")}>{a.signals.intro}</p>

              <ul className="mb-[26px]">
                {a.signals.items.map((item, index) => (
                  <li
                    key={item.index}
                    className={cn(
                      "flex flex-wrap gap-x-8 gap-y-2 py-6",
                      index > 0 && "border-t",
                    )}
                    style={index > 0 ? { borderColor: ink.line } : undefined}
                  >
                    <div className="min-w-0 flex-[1_1_11rem]">
                      <p
                        className="text-[0.65625rem] font-bold tracking-[0.14em] uppercase"
                        style={{ color: accent.brass }}
                      >
                        {item.index}
                      </p>
                      <h3
                        className="mt-1.5 font-reading text-[1.25rem] leading-[1.3]"
                        style={{ color: ink.black }}
                      >
                        {item.title}
                      </h3>
                    </div>
                    <p
                      className={cn(
                        "min-w-0 flex-[2_1_20rem] text-[0.9375rem]",
                        "leading-[1.7] text-pretty",
                      )}
                      style={{ color: ink.muted }}
                    >
                      {item.text}
                    </p>
                  </li>
                ))}
              </ul>

              <p className={cn(PROSE, "mb-[26px]")}>{a.signals.close}</p>
            </section>

            {/* ---------------------- s4 ---------------------- */}
            <section id="s4" data-sec>
              <Heading className="mt-[68px]">{a.definition.heading}</Heading>
              <p className={cn(PROSE, "mb-[26px]")}>{a.definition.intro}</p>
            </section>
          </article>
        </div>

        {/* ============ FULL BLEED — the definition ============= */}
        <section className={cn(FRAME, "mt-2")}>
          <div
            className="relative overflow-hidden rounded-[22px] p-[clamp(1.75rem,4vw,3rem)]"
            style={{ background: ink.panel, border: `1px solid ${ink.line}` }}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 -right-16 size-72 rounded-full"
              style={{ border: `1px solid ${ink.line}` }}
            />
            <p
              className={cn(EYEBROW, "relative")}
              style={{ color: accent.brass }}
            >
              {a.definition.eyebrow}
            </p>
            <p
              className={cn(
                "relative mt-5 max-w-[52ch] font-reading text-pretty",
                "text-[clamp(1.375rem,2.8vw,1.875rem)] leading-[1.42]",
              )}
              style={{ color: ink.black }}
            >
              {a.definition.statement.before}
              <em style={{ color: accent.violet }}>
                {a.definition.statement.emphasisA}
              </em>
              {a.definition.statement.middle}
              <em style={{ color: accent.violet }}>
                {a.definition.statement.emphasisB}
              </em>
              {a.definition.statement.after}
            </p>
          </div>
        </section>

        {/* ================ ARTICLE — second run ================= */}
        <div
          className={cn(
            FRAME,
            "mt-2 flex items-start gap-[clamp(1.5rem,4vw,3.5rem)]",
          )}
        >
          {/* A spacer, not a second rail: the sticky rail above keeps its
              column, and duplicating it here would repeat the landmark. */}
          <div
            aria-hidden="true"
            className="hidden shrink-0 basis-[190px] lg:block"
          />

          <article className="mx-auto max-w-[47.5rem] min-w-0 flex-auto">
            {/* --------------------- s4b --------------------- */}
            <section id="s4b" data-sec>
              <p className={cn(PROSE, "mt-10 mb-[26px]")}>
                {a.definition.lead}
              </p>

              <dl className="mb-[26px]">
                {a.definition.terms.map((term, index) => (
                  <div
                    key={term.term}
                    className={cn("py-4", index > 0 && "border-t")}
                    style={index > 0 ? { borderColor: ink.line } : undefined}
                  >
                    <dt
                      className="font-reading text-[1.1875rem]"
                      style={{ color: accent.violet }}
                    >
                      {term.term}
                    </dt>
                    <dd
                      className="mt-1 text-[0.9375rem] leading-[1.7] text-pretty"
                      style={{ color: ink.muted }}
                    >
                      {term.text}
                    </dd>
                  </div>
                ))}
              </dl>

              <p className={cn(PROSE, "mb-[26px]")}>{a.definition.close}</p>
            </section>

            {/* ---------------------- s5 ---------------------- */}
            <section id="s5" data-sec>
              <Heading className="mt-[68px]">{a.questions.heading}</Heading>
              <p className={cn(PROSE, "mb-[26px]")}>{a.questions.intro}</p>

              <ol className="mb-[26px] flex flex-col gap-5">
                {a.questions.items.map((item) => {
                  const Icon = questionIcons[item.icon];

                  return (
                    <li
                      key={item.number}
                      className="relative flex gap-5 rounded-[18px] p-[clamp(1.25rem,3vw,1.75rem)]"
                      style={{
                        background: ink.panel,
                        border: `1px solid ${ink.line}`,
                      }}
                    >
                      <div className="shrink-0">
                        <span
                          className="font-reading text-[1.5rem] leading-none"
                          style={{ color: accent.terracotta }}
                        >
                          {item.number}
                        </span>
                      </div>

                      <div className="min-w-0 flex-auto">
                        <h3
                          className="font-reading text-[1.375rem] leading-[1.28] text-pretty"
                          style={{ color: ink.black }}
                        >
                          {item.title}
                        </h3>

                        {item.body.map((line) => (
                          <p
                            key={line}
                            className="mt-3 text-[0.9375rem] leading-[1.7] text-pretty"
                            style={{ color: ink.muted }}
                          >
                            {line}
                          </p>
                        ))}

                        {"list" in item && item.list ? (
                          <ul className="mt-4 flex flex-col gap-2">
                            {item.list.map((entry) => (
                              <Bullet key={entry}>{entry}</Bullet>
                            ))}
                          </ul>
                        ) : null}

                        {"after" in item && item.after
                          ? item.after.map((line) => (
                              <p
                                key={line}
                                className="mt-3 text-[0.9375rem] leading-[1.7] text-pretty"
                                style={{ color: ink.muted }}
                              >
                                {line}
                              </p>
                            ))
                          : null}
                      </div>

                      {/* The drawing sits out of flow so it cannot push the
                          copy narrow; below sm there is no room for it. */}
                      <Icon className="hidden size-20 shrink-0 self-start sm:block" />
                    </li>
                  );
                })}
              </ol>
            </section>

            {/* ---------------------- s6 ---------------------- */}
            <section id="s6" data-sec>
              <Heading className="mt-[68px]">{a.profile.heading}</Heading>

              {a.profile.intro.map((line) => (
                <p key={line} className={cn(PROSE, "mb-[26px]")}>
                  {line}
                </p>
              ))}

              <ul className="mb-[26px] flex flex-col gap-2">
                {a.profile.list.map((entry) => (
                  <Bullet key={entry}>{entry}</Bullet>
                ))}
              </ul>

              <figure
                className="my-10 overflow-x-auto rounded-[18px] p-[clamp(1rem,3vw,1.75rem)]"
                style={{
                  background: ink.panel,
                  border: `1px solid ${ink.line}`,
                }}
              >
                <div className="min-w-[34rem]">
                  <StageDiagram
                    labels={a.profile.stages.labels}
                    start={a.profile.stages.start}
                    end={a.profile.stages.end}
                  />
                </div>
                <Caption>{a.profile.figureCaption}</Caption>
              </figure>

              {a.profile.body.map((line) => (
                <p key={line} className={cn(PROSE, "mb-[26px]")}>
                  {line}
                </p>
              ))}
            </section>

            {/* ---------------------- s7 ---------------------- */}
            <section id="s7" data-sec>
              <Heading className="mt-[68px]">{a.example.heading}</Heading>

              <div
                className="rounded-[18px] p-[clamp(1.25rem,3vw,2rem)]"
                style={{
                  background: ink.panel,
                  border: `1px solid ${ink.line}`,
                }}
              >
                <p className={EYEBROW} style={{ color: accent.brass }}>
                  {a.example.eyebrow}
                </p>

                {a.example.intro.map((line) => (
                  <p
                    key={line}
                    className="mt-4 font-reading text-[1.125rem] leading-[1.65] text-pretty"
                    style={{ color: ink.body }}
                  >
                    {line}
                  </p>
                ))}

                <div className="my-6 overflow-x-auto">
                  <div className="min-w-[30rem]">
                    <ConversationDiagram />
                  </div>
                </div>

                <ul className="flex flex-col gap-2">
                  {a.example.list.map((entry) => (
                    <Bullet key={entry}>{entry}</Bullet>
                  ))}
                </ul>

                {a.example.close.map((line) => (
                  <p
                    key={line}
                    className="mt-4 text-[0.9375rem] leading-[1.7] text-pretty"
                    style={{ color: ink.muted }}
                  >
                    {line}
                  </p>
                ))}
              </div>
            </section>

            {/* ---------------------- s8 ---------------------- */}
            <section id="s8" data-sec>
              <Heading className="mt-[68px]">{a.changes.heading}</Heading>

              <dl className="mb-[26px]">
                {a.changes.rows.map((row, index) => (
                  <div
                    key={row.who}
                    className={cn(
                      "flex flex-wrap gap-x-8 gap-y-1.5 py-5",
                      index > 0 && "border-t",
                    )}
                    style={index > 0 ? { borderColor: ink.line } : undefined}
                  >
                    <dt
                      className="min-w-0 flex-[1_1_9rem] text-[0.8125rem] font-bold tracking-[0.1em] uppercase"
                      style={{ color: accent.violet }}
                    >
                      {row.who}
                    </dt>
                    <dd
                      className="min-w-0 flex-[2_1_20rem] text-[0.9375rem] leading-[1.7] text-pretty"
                      style={{ color: ink.muted }}
                    >
                      {row.text}
                    </dd>
                  </div>
                ))}
              </dl>

              <p className={cn(PROSE, "mb-[26px]")}>{a.changes.close}</p>
            </section>

            {/* ---------------------- s9 ---------------------- */}
            <section id="s9" data-sec>
              <Heading className="mt-[68px]">{a.ongoing.heading}</Heading>
              {a.ongoing.body.map((line) => (
                <p key={line} className={cn(PROSE, "mb-[26px]")}>
                  {line}
                </p>
              ))}
            </section>

            {/* --------------------- s10 ---------------------- */}
            <section id="s10" data-sec>
              <Heading className="mt-[68px]">{a.closing.heading}</Heading>
              {a.closing.intro.map((line) => (
                <p key={line} className={cn(PROSE, "mb-[26px]")}>
                  {line}
                </p>
              ))}
            </section>
          </article>
        </div>

        {/* =========== FULL BLEED — the closing question ========= */}
        <section className={cn(FRAME, "mt-2")}>
          <div
            className="relative overflow-hidden rounded-[22px] p-[clamp(1.75rem,4vw,3rem)]"
            style={{ background: ink.black }}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-20 -right-14 size-72 rounded-full border border-[rgba(248,242,232,0.08)]"
            />
            <p
              className={cn(EYEBROW, "relative")}
              style={{ color: accent.amber }}
            >
              {a.closing.eyebrow}
            </p>
            <p
              className={cn(
                "relative mt-5 max-w-[46ch] font-reading text-pretty",
                "text-[clamp(1.5rem,3.2vw,2.125rem)] leading-[1.32]",
                "tracking-[-0.015em] text-[#F8F2E8]",
              )}
            >
              {a.closing.question}
            </p>
            <div
              aria-hidden="true"
              className="relative mt-7 h-px w-16"
              style={{ background: accent.terracotta }}
            />
            {a.closing.after.map((line) => (
              <p
                key={line}
                className="relative mt-4 max-w-[58ch] text-[0.9375rem] leading-[1.7] text-pretty text-[rgba(248,242,232,0.72)]"
              >
                {line}
              </p>
            ))}
          </div>
        </section>

        {/* ================== TAGS AND BYLINE =================== */}
        <div
          className={cn(
            FRAME,
            "mt-14 flex items-start gap-[clamp(1.5rem,4vw,3.5rem)]",
          )}
        >
          <div
            aria-hidden="true"
            className="hidden shrink-0 basis-[190px] lg:block"
          />

          <div className="mx-auto max-w-[47.5rem] min-w-0 flex-auto">
            <ul className="flex flex-wrap gap-2">
              {a.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full px-3 py-1.5 text-[0.75rem] font-medium"
                  style={{
                    border: `1px solid ${ink.line}`,
                    color: ink.muted,
                  }}
                >
                  {tag}
                </li>
              ))}
            </ul>

            <div
              className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-b py-5 print:hidden"
              style={{ borderColor: ink.line }}
            >
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className="text-[0.71875rem] font-semibold tracking-[0.12em] uppercase"
                  style={{ color: ink.subtle }}
                >
                  {a.footer.shareLabel}
                </span>
                <button
                  type="button"
                  onClick={tools.share}
                  aria-label={a.rail.tools.share}
                  className="grid size-8 cursor-pointer place-items-center rounded-full transition-colors hover:text-[#5B2A9D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B2A9D]"
                  style={{ border: `1px solid ${ink.line}`, color: ink.muted }}
                >
                  <ShareIcon className="size-[15px]" />
                </button>
                <button
                  type="button"
                  onClick={copy}
                  className="cursor-pointer rounded-full px-3 py-1.5 text-[0.75rem] font-semibold transition-colors hover:text-[#5B2A9D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B2A9D]"
                  style={{ border: `1px solid ${ink.line}`, color: ink.muted }}
                >
                  {copied ? a.rail.tools.copy.done : a.rail.tools.copy.idle}
                </button>
                <button
                  type="button"
                  onClick={tools.print}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.75rem] font-semibold transition-colors hover:text-[#5B2A9D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B2A9D]"
                  style={{ border: `1px solid ${ink.line}`, color: ink.muted }}
                >
                  <PrintIcon className="size-3.5" />
                  {a.rail.tools.print}
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  audio.playFromTop();
                  setMiniDismissed(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={cn(
                  "inline-flex cursor-pointer items-center gap-2 rounded-full",
                  "px-4 py-2.5 text-[0.78125rem] font-semibold text-white",
                  "transition-opacity hover:opacity-90",
                  "focus-visible:outline-2 focus-visible:outline-offset-2",
                  "focus-visible:outline-[#5B2A9D]",
                )}
                style={{ background: accent.violet }}
              >
                <PlayIcon className="size-[13px]" />
                {a.footer.listen}
              </button>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <span
                aria-hidden="true"
                className="grid size-10 shrink-0 place-items-center rounded-full font-reading text-[1.125rem] text-white"
                style={{ background: accent.violet }}
              >
                L
              </span>
              <div>
                <p
                  className="text-[0.875rem] font-semibold"
                  style={{ color: ink.black }}
                >
                  {a.footer.byline.title}
                </p>
                <p className="text-[0.78125rem]" style={{ color: ink.subtle }}>
                  {a.footer.byline.meta}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* =================== CONTINUE EXPLORING ================ */}
        <section className={cn(FRAME, "mt-[clamp(3.5rem,7vw,5.5rem)]")}>
          <div
            className="flex flex-wrap items-baseline justify-between gap-4 border-b pb-5"
            style={{ borderColor: ink.line }}
          >
            <h2
              className="font-reading text-[clamp(1.625rem,3vw,2.25rem)] leading-[1.15]"
              style={{ color: ink.black }}
            >
              {a.related.heading}
            </h2>
            <Link
              href={a.related.link.href}
              className="text-[0.8125rem] font-semibold transition-colors hover:text-[#5B2A9D]"
              style={{ color: ink.muted }}
            >
              {a.related.link.label}
            </Link>
          </div>

          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {a.related.items.map((item) => (
              <li key={item.title}>
                <Link
                  href={item.href}
                  className={cn(
                    "group flex h-full flex-col rounded-[18px] p-6",
                    "transition-shadow hover:shadow-[0_16px_40px_rgba(25,21,34,0.1)]",
                  )}
                  style={{
                    background: ink.panel,
                    border: `1px solid ${ink.line}`,
                  }}
                >
                  <span
                    className="text-[0.65625rem] font-bold tracking-[0.14em] uppercase"
                    style={{ color: accent.brass }}
                  >
                    {item.category}
                  </span>
                  <span
                    className={cn(
                      "mt-3 flex-auto font-reading text-[1.1875rem]",
                      "leading-[1.32] text-pretty",
                      "transition-colors group-hover:text-[#5B2A9D]",
                    )}
                    style={{ color: ink.black }}
                  >
                    {item.title}
                  </span>
                  <span
                    className="mt-5 text-[0.71875rem] font-semibold tracking-[0.1em] uppercase"
                    style={{ color: ink.subtle }}
                  >
                    {item.readTime}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* ====================== SUBSCRIBE ====================== */}
        <section
          className={cn(
            FRAME,
            "mt-[clamp(3.5rem,7vw,5.5rem)] pb-[clamp(4rem,8vw,6.5rem)]",
            "print:hidden",
          )}
        >
          <div
            className="flex flex-wrap items-center justify-between gap-8 rounded-[22px] p-[clamp(1.75rem,4vw,3rem)]"
            style={{ background: ink.panel, border: `1px solid ${ink.line}` }}
          >
            <div className="min-w-0 flex-[1_1_22rem]">
              <h2
                className="font-reading text-[clamp(1.5rem,2.8vw,2rem)] leading-[1.2] text-pretty"
                style={{ color: ink.black }}
              >
                {a.subscribe.heading}
              </h2>
              <p
                className="mt-3 max-w-[46ch] text-[0.9375rem] leading-[1.6] text-pretty"
                style={{ color: ink.muted }}
              >
                {a.subscribe.description}
              </p>
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                setSubscribed(true);
              }}
              className="flex min-w-0 flex-[1_1_20rem] flex-wrap gap-3"
            >
              <input
                type="email"
                required
                placeholder={a.subscribe.placeholder}
                aria-label={a.subscribe.label}
                className={cn(
                  "min-w-0 flex-auto rounded-full bg-white px-5 py-3",
                  "text-[0.9375rem] text-[#2A2434]",
                  "placeholder:text-[#8C8299]",
                  "focus-visible:outline-2 focus-visible:outline-offset-2",
                  "focus-visible:outline-[#5B2A9D]",
                )}
                style={{ border: `1px solid ${ink.line}` }}
              />
              <button
                type="submit"
                className={cn(
                  "cursor-pointer rounded-full px-6 py-3",
                  "text-[0.875rem] font-semibold text-white",
                  "transition-opacity hover:opacity-90",
                  "focus-visible:outline-2 focus-visible:outline-offset-2",
                  "focus-visible:outline-[#5B2A9D]",
                )}
                style={{ background: accent.violet }}
              >
                {subscribed ? a.subscribe.submit.done : a.subscribe.submit.idle}
              </button>
            </form>
          </div>
        </section>
      </main>

      {showMini && !miniDismissed && (
        <ArticleMiniPlayer
          title={a.mini.title}
          dismissLabel={a.mini.dismiss}
          durationLabel={a.audio.durationLabel}
          audio={audio}
          onDismiss={() => setMiniDismissed(true)}
        />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Small shared pieces                                               */
/* ------------------------------------------------------------------ */

function Heading({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <h2 className={cn(HEADING, "mb-6", className)}>{children}</h2>;
}

function Caption({ children }: { children: React.ReactNode }) {
  return (
    <figcaption
      className="mt-4 text-[0.78125rem] leading-[1.55] text-pretty"
      style={{ color: ink.subtle }}
    >
      {children}
    </figcaption>
  );
}

/** A list item with the design's small square in place of a bullet. */
function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span
        aria-hidden="true"
        className="mt-2 size-1.5 shrink-0 rounded-[1px]"
        style={{ background: accent.terracotta }}
      />
      <span
        className="text-[0.9375rem] leading-[1.65] text-pretty"
        style={{ color: ink.muted }}
      >
        {children}
      </span>
    </li>
  );
}
