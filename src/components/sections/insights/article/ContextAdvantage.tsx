"use client";

import Link from "next/link";
import {
  Fragment,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import { contextAdvantage } from "@/content/insights/context-advantage";
import { cn } from "@/lib/utils";

import {
  ArticleAudio,
  ArticleMiniPlayer,
  type AudioTone,
  useSimulatedAudio,
} from "./ArticleAudio";
import {
  ArrowDownIcon,
  HeadphonesIcon,
  LinkIcon,
  PrintIcon,
  ShareIcon,
} from "./ArticleIcons";
import { ContextArrow, SignalsToSurface, contextFlowIcons } from "./ContextArt";
import { EYEBROW, FRAME, HEADING, PROSE, accent, ink } from "./tokens";

/**
 * INSIGHT ARTICLE — "Context is the enterprise AI advantage"
 * ---------------------------------------------------------------------------
 * The fifth article, rebuilt from its own HTML export.
 *
 * ITS ACCENT IS SAGE (#68775A). Worth stating plainly because it looks close
 * to the second article's olive (#68796B) and is not the same colour — it is
 * cooler and greener, and it comes with two lighter steps used in the hero's
 * stacked plates and along the workflow. Each article's palette was sampled
 * from its own export rather than inherited from the one before it.
 *
 * IT CITES FOUR SOURCES, more than any other in the series: two NIST
 * frameworks, the original RAG paper and "Lost in the Middle". The two
 * research papers are hedged INLINE as well as in the list — RAG's results
 * were on the benchmarks tested, and the long-context finding concerns the
 * models studied rather than being a universal limit. Those hedges sit in the
 * sentences they qualify, so a reader cannot take the claim without them.
 *
 * IT CLOSES ON FOUR QUESTIONS rather than the single replacement question the
 * other articles end with, so its closing block is a list rather than a pair.
 *
 * As with the others, the export's own nav is dropped (the site Header and
 * Footer wrap this route) and its per-event scroll handler is coalesced to one
 * read per animation frame.
 */

const x = contextAdvantage;

const SPY_LINE = 0.35;

/** How far down the mini-player may appear, once playing. */
const MINI_AFTER = 900;

/** The player, tinted to this article's sage. */
const audioTone: AudioTone = {
  eyebrow: accent.sageLight,
  wave: [accent.sage, accent.sageLight],
  progress: [accent.sage, accent.sageLight],
};

/** The palette the figures index into, keyed by the tone name in content. */
const tones = {
  violet: accent.violet,
  terracotta: accent.terracotta,
  sage: accent.sage,
  sageMid: accent.sageMid,
} as const;

export function ContextAdvantage() {
  const audio = useSimulatedAudio(x.audio.duration);

  const [readPercent, setReadPercent] = useState(0);
  const [active, setActive] = useState<string>(x.rail.items[0].id);
  const [pastHero, setPastHero] = useState(false);
  const [miniDismissed, setMiniDismissed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contentsOpen, setContentsOpen] = useState(false);
  const [subNotice, setSubNotice] = useState(false);
  const contentsId = useId();

  const copyTimer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(copyTimer.current), []);

  /* ------------------------- Progress and spy ------------------------- */
  useEffect(() => {
    let frame = 0;

    const read = () => {
      frame = 0;

      const max = document.documentElement.scrollHeight - window.innerHeight;
      const y = window.scrollY;

      setReadPercent(max > 0 ? Math.min(100, Math.max(0, (y / max) * 100)) : 0);
      setPastHero(y > MINI_AFTER);

      let current: string = x.rail.items[0].id;

      for (const node of document.querySelectorAll<HTMLElement>("[data-sec]")) {
        if (node.getBoundingClientRect().top <= window.innerHeight * SPY_LINE) {
          current = node.id;
        }
      }

      setActive(current);
    };

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

  /* ------------------------------ Tools ------------------------------- */
  const copy = useCallback(() => {
    const done = () => {
      setCopied(true);
      window.clearTimeout(copyTimer.current);
      copyTimer.current = window.setTimeout(() => setCopied(false), 1800);
    };

    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href).then(done, done);
    } else {
      done();
    }
  }, []);

  const share = useCallback(() => {
    if (navigator.share) {
      navigator
        .share({ title: document.title, url: window.location.href })
        .catch(() => {});
    } else {
      copy();
    }
  }, [copy]);

  const copyLabel = copied ? x.rail.tools.copy.done : x.rail.tools.copy.idle;

  return (
    <div className="relative" style={{ background: ink.paper }}>
      <div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-90 h-[3px] bg-[rgba(25,21,34,0.07)] print:hidden"
      >
        <div
          className="h-full"
          style={{
            width: `${readPercent}%`,
            background: `linear-gradient(90deg, ${accent.sage}, ${accent.violet})`,
          }}
        />
      </div>

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
            "grid items-center gap-[clamp(1.75rem,5vw,4.5rem)]",
            "pt-[7.5rem] lg:pt-[9.25rem]",
            "[grid-template-columns:repeat(auto-fit,minmax(20.625rem,1fr))]",
          )}
        >
          <div className="raw-rise-in">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 text-[0.6875rem] font-semibold tracking-[0.14em] uppercase"
              style={{ color: ink.subtle }}
            >
              <Link href="/resources" className="hover:text-[#191522]">
                {x.breadcrumb[0]}
              </Link>
              <span aria-hidden="true" style={{ color: ink.line }}>
                /
              </span>
              <Link href="/resources/insights" className="hover:text-[#191522]">
                {x.breadcrumb[1]}
              </Link>
            </nav>

            <div className="mt-[26px] mb-[18px] flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-px w-[26px]"
                style={{ background: accent.sage }}
              />
              <span
                className="text-[0.71875rem] font-bold tracking-[0.16em] uppercase"
                style={{ color: accent.sage }}
              >
                {x.category}
              </span>
            </div>

            <h1
              className={cn(
                "mb-[26px] font-reading font-normal text-balance",
                "text-[clamp(2.25rem,4.9vw,3.875rem)] leading-[1.05]",
                "tracking-[-0.025em]",
              )}
              style={{ color: ink.black }}
            >
              {x.title}
            </h1>

            <p
              className={cn(
                "mb-[30px] max-w-[38ch] font-reading text-pretty",
                "text-[clamp(1.15625rem,1.9vw,1.375rem)] leading-[1.52]",
              )}
              style={{ color: ink.muted }}
            >
              {x.standfirst}
            </p>

            <div
              className="flex items-center gap-3.5 border-b pb-7 text-[0.71875rem] font-semibold tracking-[0.12em] uppercase"
              style={{ borderColor: ink.line, color: ink.subtle }}
            >
              <span>{x.facts[0]}</span>
              <span
                aria-hidden="true"
                className="size-1 rounded-full"
                style={{ background: ink.line }}
              />
              <span>{x.facts[1]}</span>
            </div>

            <div className="mt-[26px] flex flex-wrap items-center gap-3">
              <a
                href={x.actions.read.href}
                className={cn(
                  "inline-flex items-center gap-2.5 rounded-full px-5 py-3",
                  "text-[0.8125rem] font-semibold text-white",
                  "transition-opacity hover:opacity-90",
                  "focus-visible:outline-2 focus-visible:outline-offset-2",
                  "focus-visible:outline-[#68775A]",
                )}
                style={{ background: accent.sage }}
              >
                {x.actions.read.label}
                <ArrowDownIcon className="size-4" />
              </a>
              <a
                href={x.actions.listen.href}
                className={cn(
                  "inline-flex items-center gap-2.5 rounded-full px-5 py-3",
                  "text-[0.8125rem] font-semibold transition-colors",
                  "hover:border-[#68775A] hover:text-[#68775A]",
                  "focus-visible:outline-2 focus-visible:outline-offset-2",
                  "focus-visible:outline-[#68775A]",
                )}
                style={{ border: `1px solid ${ink.line}`, color: ink.muted }}
              >
                <HeadphonesIcon className="size-[15px]" />
                {x.actions.listen.label}
              </a>
            </div>
          </div>

          <div className="relative p-[clamp(0.5rem,2vw,1.5rem)]">
            <SignalsToSurface labels={x.heroLabels} />
          </div>
        </section>

        {/* ====================== AUDIO EDITION ===================== */}
        <section
          id="listen"
          className={cn(FRAME, "mt-[clamp(3rem,7vw,5.25rem)] print:hidden")}
        >
          <ArticleAudio content={x.audio} audio={audio} tone={audioTone} />
        </section>

        {/* ====================== ARTICLE BODY ====================== */}
        <div
          className={cn(
            FRAME,
            "mt-[clamp(3.5rem,8vw,6rem)] flex items-start",
            "gap-[clamp(1.5rem,4vw,3.5rem)]",
          )}
        >
          {/* ------------------------ The rail ----------------------- */}
          <aside
            aria-label="Contents"
            className="sticky top-[7.375rem] hidden shrink-0 basis-[190px] pt-1.5 lg:block"
          >
            <p
              className="mb-4 text-[0.65625rem] font-bold tracking-[0.16em] uppercase"
              style={{ color: accent.brass }}
            >
              {x.rail.title}
            </p>

            <ul
              className="flex flex-col gap-0.5 border-l"
              style={{ borderColor: ink.line }}
            >
              {x.rail.items.map((item) => {
                const current = item.id === active;

                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      aria-current={current ? "location" : undefined}
                      className={cn(
                        "-ml-px block border-l-2 py-[7px] pl-3.5",
                        "text-[0.78125rem] leading-[1.35]",
                        "transition-[color,border-color] duration-150",
                        "hover:text-[#191522]",
                        current
                          ? "border-l-[#68775A] font-semibold text-[#191522]"
                          : "border-l-transparent font-medium text-[#8C8299]",
                      )}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="my-6 h-px" style={{ background: ink.line }} />

            <div className="flex flex-col gap-1">
              <RailTool
                onClick={share}
                icon={<ShareIcon className="size-[15px] shrink-0" />}
              >
                {x.rail.tools.share}
              </RailTool>
              <RailTool
                onClick={copy}
                icon={<LinkIcon className="size-[15px] shrink-0" />}
              >
                {copyLabel}
              </RailTool>
              <RailTool
                onClick={() => window.print()}
                icon={<PrintIcon className="size-[15px] shrink-0" />}
              >
                {x.rail.tools.print}
              </RailTool>
            </div>
          </aside>

          {/* ----------------------- The prose ----------------------- */}
          <article className="mx-auto max-w-[47.5rem] min-w-0 flex-auto">
            <div
              className="mb-[30px] border-b pb-[22px] lg:hidden"
              style={{ borderColor: ink.line }}
            >
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setContentsOpen((value) => !value)}
                  aria-expanded={contentsOpen}
                  aria-controls={contentsId}
                  className={pillClass}
                >
                  {x.rail.mobileLabel}
                </button>
                <button type="button" onClick={share} className={pillClass}>
                  {x.rail.tools.share}
                </button>
                <button type="button" onClick={copy} className={pillClass}>
                  {copyLabel}
                </button>
              </div>

              {contentsOpen && (
                <nav
                  id={contentsId}
                  aria-label="Contents"
                  className="mt-4 flex flex-col gap-1 rounded-[14px] p-4"
                  style={{
                    background: "#FCFAF6",
                    border: `1px solid ${ink.lineStrong}`,
                  }}
                >
                  {x.rail.items.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={() => setContentsOpen(false)}
                      className="py-1.5 text-[0.8125rem] font-medium"
                      style={{ color: ink.muted }}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              )}
            </div>

            {/* ---------------------- s1 ---------------------- */}
            <section id="s1" data-sec>
              <Heading>{x.result.heading}</Heading>
              {x.result.body.map((line) => (
                <p key={line} className={cn(PROSE, "mb-[26px]")}>
                  {line}
                </p>
              ))}
            </section>

            {/* ---------------------- s2 ---------------------- */}
            <section id="s2" data-sec>
              <Heading className="mt-[68px]">{x.layers.heading}</Heading>

              {x.layers.intro.map((line) => (
                <p key={line} className={cn(PROSE, "mb-[26px]")}>
                  {line}
                </p>
              ))}

              {/* The five layers as widening bars — the export shows them
                  accumulating rather than ranking. */}
              <figure
                className="my-10 rounded-[18px] p-[clamp(1.25rem,3vw,1.75rem)]"
                style={{
                  background: "#FCFAF6",
                  border: `1px solid ${ink.lineStrong}`,
                }}
              >
                <figcaption className={EYEBROW} style={{ color: accent.brass }}>
                  {x.layers.figure.title}
                </figcaption>

                <ol className="mt-5 flex flex-col gap-3">
                  {x.layers.figure.items.map((item) => (
                    <li key={item.title} className="flex items-center gap-3.5">
                      <span
                        aria-hidden="true"
                        className="size-3 shrink-0 rounded-full"
                        style={{
                          background: "#FCFAF6",
                          border: `1.6px solid ${tones[item.tone]}`,
                        }}
                      />
                      <span
                        className={cn(
                          "flex min-w-0 flex-wrap items-baseline gap-x-3",
                          "rounded-full px-3.5 py-2",
                        )}
                        style={{
                          width: `${item.width}%`,
                          minWidth: "min(100%, 16rem)",
                          border: `1px solid ${ink.lineStrong}`,
                        }}
                      >
                        <span
                          className="font-reading text-[1rem]"
                          style={{ color: ink.black }}
                        >
                          {item.title}
                        </span>
                        <span
                          className="text-[0.78125rem] leading-[1.4]"
                          style={{ color: ink.subtle }}
                        >
                          {item.text}
                        </span>
                      </span>
                    </li>
                  ))}
                </ol>

                <p
                  className="mt-5 text-[0.78125rem] leading-[1.55] text-pretty"
                  style={{ color: ink.subtle }}
                >
                  {x.layers.figure.caption}
                </p>
              </figure>

              {x.layers.detail.map((item) => (
                <div key={item.heading}>
                  <h3
                    className="mt-8 mb-3 font-reading text-[1.25rem] leading-[1.3]"
                    style={{ color: ink.black }}
                  >
                    {item.heading}
                  </h3>
                  <p className={cn(PROSE, "mb-[26px]")}>{item.text}</p>
                </div>
              ))}

              <figure
                className="my-10 rounded-[18px] p-[clamp(1.5rem,3.5vw,2.25rem)]"
                style={{ background: ink.black }}
              >
                <p
                  className={cn(
                    "font-reading font-normal text-pretty",
                    "text-[clamp(1.375rem,2.6vw,1.75rem)] leading-[1.34]",
                    "tracking-[-0.015em] text-[#F8F2E8]",
                  )}
                >
                  {x.layers.pullQuote}
                </p>
              </figure>
            </section>

            {/* ---------------------- s3 ---------------------- */}
            <section id="s3" data-sec>
              <Heading className="mt-[68px]">{x.retrieval.heading}</Heading>
              <Cited content={x.retrieval.cited} />
              {x.retrieval.body.map((line) => (
                <p key={line} className={cn(PROSE, "mb-[26px]")}>
                  {line}
                </p>
              ))}
            </section>

            {/* ---------------------- s4 ---------------------- */}
            <section id="s4" data-sec>
              <Heading className="mt-[68px]">{x.more.heading}</Heading>
              {x.more.body.map((line) => (
                <p key={line} className={cn(PROSE, "mb-[26px]")}>
                  {line}
                </p>
              ))}
              <Cited content={x.more.cited} />
              {x.more.close.map((line) => (
                <p key={line} className={cn(PROSE, "mb-[26px]")}>
                  {line}
                </p>
              ))}
            </section>

            {/* ---------------------- s5 ---------------------- */}
            <section id="s5" data-sec>
              <Heading className="mt-[68px]">{x.example.heading}</Heading>

              <div
                className="rounded-[18px] p-[clamp(1.25rem,3vw,2rem)]"
                style={{
                  background: "#F0F1E8",
                  border: "1px solid #E1E3D2",
                }}
              >
                <p className={EYEBROW} style={{ color: accent.brass }}>
                  {x.example.eyebrow}
                </p>

                {x.example.body.map((line) => (
                  <p
                    key={line}
                    className="mt-4 font-reading text-[1.0625rem] leading-[1.66] text-pretty"
                    style={{ color: ink.body }}
                  >
                    {line}
                  </p>
                ))}
              </div>
            </section>

            {/* ---------------------- s6 ---------------------- */}
            <section id="s6" data-sec>
              <Heading className="mt-[68px]">{x.operational.heading}</Heading>
              <p className={cn(PROSE, "mb-[26px]")}>{x.operational.intro}</p>

              <ol
                className="mb-[26px] border-t"
                style={{ borderColor: ink.line }}
              >
                {x.operational.steps.map((step) => (
                  <li
                    key={step.number}
                    className="flex gap-4 border-b py-5"
                    style={{ borderColor: ink.line }}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "grid size-7 shrink-0 place-items-center rounded-full",
                        "text-[0.78125rem] font-bold text-white",
                      )}
                      style={{ background: accent.sage }}
                    >
                      {step.number}
                    </span>
                    <div className="min-w-0">
                      <h3
                        className="font-reading text-[1.1875rem] leading-[1.35] text-pretty"
                        style={{ color: ink.black }}
                      >
                        {step.title}
                      </h3>

                      {/* Step 6 carries its citation mid-paragraph and has no
                          plain `text`; every other step is the other way
                          round. Narrowing on `cited` first tells TypeScript
                          which half of the union it is looking at. */}
                      {"cited" in step ? (
                        <Cited content={step.cited} small />
                      ) : (
                        <p
                          className="mt-1.5 text-[0.9375rem] leading-[1.65] text-pretty"
                          style={{ color: ink.muted }}
                        >
                          {step.text}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ol>

              <p className={cn(PROSE, "mb-[26px]")}>{x.operational.close}</p>

              {/* The governed-context flow. It scrolls sideways rather than
                  wrapping, because the order of the steps is the point. */}
              <figure
                className="my-10 rounded-[18px] p-[clamp(1.25rem,3vw,1.75rem)]"
                style={{
                  background: "#FCFAF6",
                  border: `1px solid ${ink.lineStrong}`,
                }}
              >
                <figcaption className={EYEBROW} style={{ color: accent.brass }}>
                  {x.operational.flow.title}
                </figcaption>

                <div className="mt-5 overflow-x-auto pb-2">
                  <ol className="flex min-w-max items-center gap-2">
                    {x.operational.flow.steps.map((step, index) => {
                      const Icon = contextFlowIcons[step.icon];
                      const connector = x.operational.flow.connectors[index];

                      return (
                        <Fragment key={step.label}>
                          <li className="flex w-[6.5rem] shrink-0 flex-col items-center gap-2 text-center">
                            <span
                              aria-hidden="true"
                              className="grid size-9 place-items-center rounded-full"
                              style={{
                                background: "#FFFFFF",
                                border: `1px solid ${ink.lineStrong}`,
                              }}
                            >
                              <Icon
                                className="size-[1.125rem]"
                                stroke={tones[step.tone]}
                              />
                            </span>
                            <span
                              className="text-[0.6875rem] leading-[1.35] font-medium"
                              style={{ color: ink.muted }}
                            >
                              {step.label}
                            </span>
                          </li>

                          {connector && (
                            <ContextArrow
                              tone={tones[connector.tone]}
                              dashed={
                                "dashed" in connector
                                  ? connector.dashed
                                  : undefined
                              }
                            />
                          )}
                        </Fragment>
                      );
                    })}
                  </ol>
                </div>

                <p
                  className="mt-5 text-[0.78125rem] leading-[1.55] text-pretty"
                  style={{ color: ink.subtle }}
                >
                  {x.operational.flow.caption}
                </p>
              </figure>
            </section>

            {/* ---------------------- s7 ---------------------- */}
            <section id="s7" data-sec>
              <Heading className="mt-[68px]">{x.boundaries.heading}</Heading>

              <div
                className="border-l-2 pl-[clamp(1.125rem,4vw,2.125rem)]"
                style={{ borderColor: accent.terracotta }}
              >
                <p className={cn(PROSE, "mb-[26px]")}>{x.boundaries.intro}</p>
                <Cited content={x.boundaries.cited} />
                <p className={PROSE}>{x.boundaries.close}</p>
              </div>
            </section>

            {/* ---------------------- s8 ---------------------- */}
            <section id="s8" data-sec>
              <Heading className="mt-[68px]">{x.advantage.heading}</Heading>

              {x.advantage.body.map((line) => (
                <p key={line} className={cn(PROSE, "mb-[26px]")}>
                  {line}
                </p>
              ))}

              {/* This article closes on FOUR questions, so the replacement is
                  a list rather than the single line the others end on. */}
              <div
                className="mt-10 border-t pt-8"
                style={{ borderColor: ink.line }}
              >
                <p className={EYEBROW} style={{ color: ink.subtle }}>
                  {x.advantage.shift.wasLabel}
                </p>
                <p
                  className="mt-2.5 font-reading text-[clamp(1.25rem,2.4vw,1.5rem)] leading-[1.35] text-pretty"
                  style={{ color: ink.subtle }}
                >
                  {x.advantage.shift.was}
                </p>

                <p
                  className={cn(EYEBROW, "mt-8")}
                  style={{ color: accent.sage }}
                >
                  {x.advantage.shift.isLabel}
                </p>
                <ul className="mt-4 flex flex-col gap-3">
                  {x.advantage.shift.questions.map((question) => (
                    <li key={question} className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-3 size-1.5 shrink-0 rounded-[1px]"
                        style={{ background: accent.sage }}
                      />
                      <span
                        className="font-reading text-[clamp(1.25rem,2.4vw,1.5rem)] leading-[1.35] text-pretty"
                        style={{ color: ink.black }}
                      >
                        {question}
                      </span>
                    </li>
                  ))}
                </ul>

                <p className={cn(PROSE, "mt-8")}>{x.advantage.shift.close}</p>
              </div>
            </section>

            {/* ------------------ Sources and reading ---------------- */}
            <section
              aria-label={x.sources.heading}
              className="mt-[68px] border-t pt-8"
              style={{ borderColor: ink.black }}
            >
              <h2
                className="font-reading text-[1.5rem] leading-[1.2]"
                style={{ color: ink.black }}
              >
                {x.sources.heading}
              </h2>

              <ol className="mt-6 flex flex-col gap-7">
                {x.sources.items.map((item) => (
                  <li key={item.number} className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className="shrink-0 text-[0.75rem] font-bold tracking-[0.1em]"
                      style={{ color: accent.brass }}
                    >
                      {item.number}
                    </span>
                    <div className="min-w-0">
                      <p
                        className="text-[0.9375rem] leading-[1.6] text-pretty"
                        style={{ color: ink.body }}
                      >
                        {item.citation.before}
                        {item.citation.italic ? (
                          <em>{item.citation.italic}</em>
                        ) : null}
                        {item.citation.after}
                      </p>
                      <p className="mt-2">
                        <ExternalLink href={item.link.href}>
                          {item.link.label}
                        </ExternalLink>
                      </p>
                      {/* Each note carries both the USE and the
                          QUALIFICATION; neither half is trimmed. */}
                      <p
                        className="mt-2 text-[0.8125rem] leading-[1.6] text-pretty"
                        style={{ color: ink.subtle }}
                      >
                        {item.note}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* --------------------- Share and byline --------------- */}
            <div
              className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t pt-6 print:hidden"
              style={{ borderColor: ink.line }}
            >
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className="text-[0.71875rem] font-semibold tracking-[0.12em] uppercase"
                  style={{ color: ink.subtle }}
                >
                  {x.footer.shareLabel}
                </span>
                <button
                  type="button"
                  onClick={share}
                  aria-label={x.rail.tools.share}
                  className="grid size-8 cursor-pointer place-items-center rounded-full transition-colors hover:text-[#68775A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#68775A]"
                  style={{ border: `1px solid ${ink.line}`, color: ink.muted }}
                >
                  <ShareIcon className="size-[15px]" />
                </button>
                <button
                  type="button"
                  onClick={copy}
                  className="cursor-pointer rounded-full px-3 py-1.5 text-[0.75rem] font-semibold transition-colors hover:text-[#68775A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#68775A]"
                  style={{ border: `1px solid ${ink.line}`, color: ink.muted }}
                >
                  {copyLabel}
                </button>
              </div>

              <p className="text-[0.78125rem]" style={{ color: ink.subtle }}>
                {x.footer.byline}
              </p>
            </div>
          </article>
        </div>

        {/* ==================== RELATED INSIGHTS ==================== */}
        <section className={cn(FRAME, "mt-[clamp(3.5rem,7vw,5.5rem)]")}>
          <div
            className="flex flex-wrap items-baseline justify-between gap-4 border-b pb-5"
            style={{ borderColor: ink.line }}
          >
            <h2
              className="font-reading text-[clamp(1.625rem,3vw,2.25rem)] leading-[1.15]"
              style={{ color: ink.black }}
            >
              {x.related.heading}
            </h2>
            <Link
              href={x.related.link.href}
              className="text-[0.8125rem] font-semibold transition-colors hover:text-[#68775A]"
              style={{ color: ink.muted }}
            >
              {x.related.link.label}
            </Link>
          </div>

          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {x.related.items.map((item) => (
              <li key={item.title}>
                <Link
                  href={item.href}
                  className={cn(
                    "group flex h-full flex-col rounded-[18px] p-6",
                    "transition-shadow hover:shadow-[0_16px_40px_rgba(25,21,34,0.1)]",
                  )}
                  style={{
                    background: "#FCFAF6",
                    border: `1px solid ${ink.lineStrong}`,
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
                      "transition-colors group-hover:text-[#68775A]",
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
            className="rounded-[22px] p-[clamp(1.75rem,4vw,3rem)]"
            style={{
              background: "#FCFAF6",
              border: `1px solid ${ink.lineStrong}`,
            }}
          >
            <div className="flex flex-wrap items-center justify-between gap-8">
              <div className="min-w-0 flex-[1_1_22rem]">
                <h2
                  className="font-reading text-[clamp(1.5rem,2.8vw,2rem)] leading-[1.2] text-pretty"
                  style={{ color: ink.black }}
                >
                  {x.subscribe.heading}
                </h2>
                <p
                  className="mt-3 max-w-[46ch] text-[0.9375rem] leading-[1.6] text-pretty"
                  style={{ color: ink.muted }}
                >
                  {x.subscribe.description}
                </p>
              </div>

              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  setSubNotice(true);
                }}
                className="flex min-w-0 flex-[1_1_20rem] flex-wrap gap-3"
              >
                <label htmlFor="cx-sub-email" className="sr-only">
                  {x.subscribe.label}
                </label>
                <input
                  id="cx-sub-email"
                  type="email"
                  required
                  placeholder={x.subscribe.placeholder}
                  className={cn(
                    "min-w-0 flex-auto rounded-full bg-white px-5 py-3",
                    "text-[0.9375rem] text-[#2A2434] placeholder:text-[#8C8299]",
                    "focus-visible:outline-2 focus-visible:outline-offset-2",
                    "focus-visible:outline-[#68775A]",
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
                    "focus-visible:outline-[#68775A]",
                  )}
                  style={{ background: accent.sage }}
                >
                  {x.subscribe.submit}
                </button>
              </form>
            </div>

            {subNotice && (
              <p
                role="status"
                className="mt-4 text-[0.8125rem]"
                style={{ color: ink.subtle }}
              >
                {x.subscribe.notice}
              </p>
            )}
          </div>
        </section>
      </main>

      {audio.playing && pastHero && !miniDismissed && (
        <ArticleMiniPlayer
          title={x.mini.title}
          dismissLabel={x.mini.dismiss}
          durationLabel={x.audio.durationLabel}
          audio={audio}
          tone={audioTone}
          onDismiss={() => setMiniDismissed(true)}
        />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Small shared pieces                                               */
/* ------------------------------------------------------------------ */

const pillClass = cn(
  "inline-flex cursor-pointer items-center gap-2 rounded-full",
  "border border-[#DDD2C2] bg-white px-[15px] py-[9px]",
  "text-[0.78125rem] font-semibold text-[#3E3850]",
  "transition-colors hover:border-[#68775A] hover:text-[#68775A]",
  "focus-visible:outline-2 focus-visible:outline-offset-2",
  "focus-visible:outline-[#68775A]",
);

function RailTool({
  onClick,
  icon,
  children,
}: {
  onClick: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full cursor-pointer items-center gap-2.5 py-[7px]",
        "text-left text-[0.78125rem] font-medium text-[#4B4458]",
        "transition-colors hover:text-[#68775A]",
        "focus-visible:outline-2 focus-visible:outline-offset-2",
        "focus-visible:outline-[#68775A]",
      )}
    >
      {icon}
      {children}
    </button>
  );
}

function Heading({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <h2 className={cn(HEADING, "mb-6", className)}>{children}</h2>;
}

/** An outbound citation. `rel="noopener"` on every one, as the export has it. */
function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium underline decoration-from-font underline-offset-2 transition-colors hover:text-[#191522]"
      style={{ color: accent.sage }}
    >
      {children}
    </a>
  );
}

/**
 * A paragraph whose `{0}` placeholder is replaced by its citation link, so the
 * link — and the qualification around it — always travels with the sentence
 * that earns it.
 */
function Cited({
  content,
  small = false,
}: {
  content: {
    text: string;
    links: readonly { label: string; href: string }[];
  };
  small?: boolean;
}) {
  const parts = content.text.split(/(\{\d\})/);

  return (
    <p
      className={
        small
          ? "mt-1.5 text-[0.9375rem] leading-[1.65] text-pretty"
          : cn(PROSE, "mb-[26px]")
      }
      style={small ? { color: ink.muted } : undefined}
    >
      {parts.map((part, index) => {
        const match = /^\{(\d)\}$/.exec(part);

        if (!match) return <Fragment key={index}>{part}</Fragment>;

        const link = content.links[Number(match[1])];

        return (
          <ExternalLink key={index} href={link.href}>
            {link.label}
          </ExternalLink>
        );
      })}
    </p>
  );
}
