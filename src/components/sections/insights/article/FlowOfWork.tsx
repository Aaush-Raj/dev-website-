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

import { flowOfWork } from "@/content/insights/flow-of-work";
import { cn } from "@/lib/utils";

import {
  ArticleAudio,
  ArticleMiniPlayer,
  useSimulatedAudio,
} from "./ArticleAudio";
import {
  ArrowDownIcon,
  HeadphonesIcon,
  LinkIcon,
  PrintIcon,
  ShareIcon,
} from "./ArticleIcons";
import {
  LoopBack,
  NeedToOutcome,
  StripArrow,
  stripIcons,
} from "./FlowOfWorkArt";
import { EYEBROW, FRAME, HEADING, PROSE, accent, ink } from "./tokens";

/**
 * INSIGHT ARTICLE — "Learning in the flow of work needs more than
 * recommendations"
 * ---------------------------------------------------------------------------
 * The sixth and last article, rebuilt from its own HTML export.
 *
 * TWO COLOURS, TWO DIRECTIONS. Its accent is terracotta (#E46C5A), the same as
 * the living-baselines article, but it pairs that with AUBERGINE (#6A4869) for
 * the return half of every loop — the dotted path carrying evidence back to
 * the next decision. Terracotta goes forward through the work; aubergine comes
 * back. That split is the article's whole argument drawn in two hues, so the
 * two are never used interchangeably.
 *
 * ITS COMPARISON FIGURE GREYS ITSELF HALFWAY. The seven steps of a full
 * learning loop are listed, but only the first three take the accent: a
 * recommendation stops at the click, and the remaining four are shown muted
 * because they are what a recommendation never reaches.
 *
 * IT CITES THREE SOURCES and hedges every one INLINE as well as in the list —
 * the transfer meta-analysis "reported variability", the feedback review "is
 * not an enterprise formula", and How People Learn II "does not prescribe an
 * enterprise workflow". The article is deliberately modest about what
 * education research proves about work, and those hedges sit in the sentences
 * they qualify rather than being footnoted away.
 *
 * As with the others, the export's own nav is dropped (the site Header and
 * Footer wrap this route) and its per-event scroll handler is coalesced to one
 * read per animation frame.
 */

const w = flowOfWork;

const SPY_LINE = 0.35;

/** How far down the mini-player may appear, once playing. */
const MINI_AFTER = 900;

/** The palette the figures index into, keyed by the tone name in content. */
const tones = {
  accent: accent.terracotta,
  muted: ink.line,
  olive: accent.olive,
  aubergine: accent.aubergine,
} as const;

export function FlowOfWork() {
  const audio = useSimulatedAudio(w.audio.duration);

  const [readPercent, setReadPercent] = useState(0);
  const [active, setActive] = useState<string>(w.rail.items[0].id);
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

      let current: string = w.rail.items[0].id;

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

  const copyLabel = copied ? w.rail.tools.copy.done : w.rail.tools.copy.idle;

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
            background: `linear-gradient(90deg, ${accent.terracotta}, ${accent.violet})`,
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
                {w.breadcrumb[0]}
              </Link>
              <span aria-hidden="true" style={{ color: ink.line }}>
                /
              </span>
              <Link href="/resources/insights" className="hover:text-[#191522]">
                {w.breadcrumb[1]}
              </Link>
            </nav>

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
                {w.category}
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
              {w.title}
            </h1>

            <p
              className={cn(
                "mb-[30px] max-w-[38ch] font-reading text-pretty",
                "text-[clamp(1.15625rem,1.9vw,1.375rem)] leading-[1.52]",
              )}
              style={{ color: ink.muted }}
            >
              {w.standfirst}
            </p>

            <div
              className="flex items-center gap-3.5 border-b pb-7 text-[0.71875rem] font-semibold tracking-[0.12em] uppercase"
              style={{ borderColor: ink.line, color: ink.subtle }}
            >
              <span>{w.facts[0]}</span>
              <span
                aria-hidden="true"
                className="size-1 rounded-full"
                style={{ background: ink.line }}
              />
              <span>{w.facts[1]}</span>
            </div>

            <div className="mt-[26px] flex flex-wrap items-center gap-3">
              <a
                href={w.actions.read.href}
                className={cn(
                  "inline-flex items-center gap-2.5 rounded-full px-5 py-3",
                  "text-[0.8125rem] font-semibold text-white",
                  "transition-opacity hover:opacity-90",
                  "focus-visible:outline-2 focus-visible:outline-offset-2",
                  "focus-visible:outline-[#E46C5A]",
                )}
                style={{ background: accent.terracotta }}
              >
                {w.actions.read.label}
                <ArrowDownIcon className="size-4" />
              </a>
              <a
                href={w.actions.listen.href}
                className={cn(
                  "inline-flex items-center gap-2.5 rounded-full px-5 py-3",
                  "text-[0.8125rem] font-semibold transition-colors",
                  "hover:border-[#E46C5A] hover:text-[#E46C5A]",
                  "focus-visible:outline-2 focus-visible:outline-offset-2",
                  "focus-visible:outline-[#E46C5A]",
                )}
                style={{ border: `1px solid ${ink.line}`, color: ink.muted }}
              >
                <HeadphonesIcon className="size-[15px]" />
                {w.actions.listen.label}
              </a>
            </div>
          </div>

          <div className="relative p-[clamp(0.5rem,2vw,1.5rem)]">
            <NeedToOutcome labels={w.heroLabels} />
          </div>
        </section>

        {/* ====================== AUDIO EDITION ===================== */}
        {/* Keeps the default terracotta-and-lilac tone, as its export does. */}
        <section
          id="listen"
          className={cn(FRAME, "mt-[clamp(3rem,7vw,5.25rem)] print:hidden")}
        >
          <ArticleAudio content={w.audio} audio={audio} />
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
              {w.rail.title}
            </p>

            <ul
              className="flex flex-col gap-0.5 border-l"
              style={{ borderColor: ink.line }}
            >
              {w.rail.items.map((item) => {
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
                          ? "border-l-[#E46C5A] font-semibold text-[#191522]"
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
                {w.rail.tools.share}
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
                {w.rail.tools.print}
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
                  {w.rail.mobileLabel}
                </button>
                <button type="button" onClick={share} className={pillClass}>
                  {w.rail.tools.share}
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
                  {w.rail.items.map((item) => (
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
              <Heading>{w.feed.heading}</Heading>

              {w.feed.body.map((line) => (
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
                    "font-reading font-normal text-pretty",
                    "text-[clamp(1.5rem,3.2vw,2rem)] leading-[1.3]",
                    "tracking-[-0.02em]",
                  )}
                  style={{ color: ink.black }}
                >
                  {w.feed.pullQuote}
                </p>
              </figure>
            </section>

            {/* ---------------------- s2 ---------------------- */}
            <section id="s2" data-sec>
              <Heading className="mt-[68px]">{w.discovery.heading}</Heading>

              <p className={cn(PROSE, "mb-[26px]")}>{w.discovery.intro}</p>

              <p className={cn(PROSE, "mb-[26px]")}>
                {w.discovery.distribution.before}
                <em>{w.discovery.distribution.italic}</em>
                {w.discovery.distribution.after}
              </p>

              {w.discovery.body.map((line) => (
                <p key={line} className={cn(PROSE, "mb-[26px]")}>
                  {line}
                </p>
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
                  {w.discovery.pullQuote}
                </p>
              </figure>

              {/* The comparison. Only the first three steps take the accent —
                  a recommendation stops at the click, and the remaining four
                  are muted because they are what it never reaches. */}
              <figure
                className="my-10 rounded-[18px] p-[clamp(1.25rem,3vw,1.75rem)]"
                style={{
                  background: "#FCFAF6",
                  border: `1px solid ${ink.lineStrong}`,
                }}
              >
                <figcaption className={EYEBROW} style={{ color: accent.brass }}>
                  {w.discovery.compare.title}
                </figcaption>

                <ol className="mt-5 flex flex-col gap-3">
                  {w.discovery.compare.steps.map((step) => (
                    <li key={step.label} className="flex items-center gap-3.5">
                      <span
                        aria-hidden="true"
                        className={cn(
                          "shrink-0 rounded-full",
                          /* The end-point is drawn larger and ringed, so the
                             break in the path is visible at a glance. */
                          "ends" in step && step.ends
                            ? "size-3 ring-3 ring-[#E46C5A]/25"
                            : "size-2.5",
                        )}
                        style={{ background: tones[step.tone] }}
                      />
                      <span
                        className="text-[0.9375rem] leading-[1.5]"
                        style={{
                          color:
                            step.tone === "accent" ? ink.black : ink.subtle,
                        }}
                      >
                        {step.label}
                      </span>
                    </li>
                  ))}
                </ol>

                {/* The dotted return, peeling away from the end-point. */}
                <div className="mt-4 overflow-hidden">
                  <LoopBack />
                </div>

                <p
                  className="mt-2 text-[0.78125rem] leading-[1.55] text-pretty"
                  style={{ color: ink.subtle }}
                >
                  {w.discovery.compare.caption}
                </p>
              </figure>
            </section>

            {/* ---------------------- s3 ---------------------- */}
            <section id="s3" data-sec>
              <Heading className="mt-[68px]">{w.system.heading}</Heading>

              {w.system.intro.map((line) => (
                <p key={line} className={cn(PROSE, "mb-[26px]")}>
                  {line}
                </p>
              ))}

              {/* The loop itself, ruled off in olive as the export sets it. */}
              <figure
                className="my-10 border-l-2 pl-[clamp(1.125rem,4vw,2.125rem)]"
                style={{ borderColor: accent.olive }}
              >
                <p
                  className={cn(
                    "font-reading font-normal text-pretty",
                    "text-[clamp(1.25rem,2.6vw,1.625rem)] leading-[1.4]",
                  )}
                  style={{ color: ink.black }}
                >
                  {w.system.loop}
                </p>
              </figure>

              <p className={cn(PROSE, "mb-[26px]")}>{w.system.after}</p>

              <Cited content={w.system.cited} />
            </section>

            {/* ---------------------- s4 ---------------------- */}
            <section id="s4" data-sec>
              <Heading className="mt-[68px]">{w.requires.heading}</Heading>
              <p className={cn(PROSE, "mb-[26px]")}>{w.requires.intro}</p>

              <ol
                className="mb-[26px] border-t"
                style={{ borderColor: ink.line }}
              >
                {w.requires.elements.map((element) => (
                  <li
                    key={element.number}
                    className="flex gap-4 border-b py-5"
                    style={{ borderColor: ink.line }}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "grid size-7 shrink-0 place-items-center rounded-full",
                        "text-[0.78125rem] font-bold text-white",
                      )}
                      style={{ background: accent.terracotta }}
                    >
                      {element.number}
                    </span>
                    <div className="min-w-0">
                      <h3
                        className="font-reading text-[1.1875rem] leading-[1.35] text-pretty"
                        style={{ color: ink.black }}
                      >
                        {element.title}
                      </h3>

                      {element.body.map((line) => (
                        <p
                          key={line}
                          className="mt-1.5 text-[0.9375rem] leading-[1.65] text-pretty"
                          style={{ color: ink.muted }}
                        >
                          {line}
                        </p>
                      ))}

                      {/* Element 5 closes with its feedback citation. */}
                      {"cited" in element && element.cited ? (
                        <Cited content={element.cited} small />
                      ) : null}
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* ---------------------- s5 ---------------------- */}
            <section id="s5" data-sec>
              <Heading className="mt-[68px]">{w.example.heading}</Heading>

              <div
                className="rounded-[18px] p-[clamp(1.25rem,3vw,2rem)]"
                style={{
                  background: "#F1EFE4",
                  border: "1px solid #E2DCC9",
                }}
              >
                <p className={EYEBROW} style={{ color: accent.brass }}>
                  {w.example.eyebrow}
                </p>

                {w.example.intro.map((line) => (
                  <p
                    key={line}
                    className="mt-4 font-reading text-[1.0625rem] leading-[1.66] text-pretty"
                    style={{ color: ink.body }}
                  >
                    {line}
                  </p>
                ))}

                <ol className="my-5 flex flex-col gap-2.5">
                  {w.example.steps.map((step, index) => (
                    <li key={step} className="flex items-baseline gap-3">
                      <span
                        aria-hidden="true"
                        className="shrink-0 text-[0.8125rem] font-bold"
                        style={{ color: accent.terracotta }}
                      >
                        {index + 1}
                      </span>
                      <span
                        className="text-[0.9375rem] leading-[1.6] text-pretty"
                        style={{ color: ink.body }}
                      >
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>

                <p
                  className="text-[0.9375rem] leading-[1.7] text-pretty"
                  style={{ color: ink.muted }}
                >
                  {w.example.close}
                </p>

                {/* The five-step strip. It scrolls sideways rather than
                    wrapping, because the order is the point. */}
                <figure
                  className="mt-6 rounded-[16px] p-[clamp(1rem,2.5vw,1.5rem)]"
                  style={{
                    background: "#FCFAF6",
                    border: `1px solid ${ink.lineStrong}`,
                  }}
                >
                  <div className="overflow-x-auto pb-2">
                    <ol className="flex min-w-max items-start gap-2">
                      {w.example.strip.steps.map((step, index) => {
                        const Icon = stripIcons[step.icon];
                        const connector = w.example.strip.connectors[index];

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
                                  className="size-[1.0625rem]"
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
                              <StripArrow
                                className="mt-4 h-3 w-[1.625rem] shrink-0"
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
                    className="mt-4 text-[0.78125rem] leading-[1.55] text-pretty"
                    style={{ color: ink.subtle }}
                  >
                    {w.example.strip.caption}
                  </p>
                </figure>
              </div>
            </section>

            {/* ---------------------- s6 ---------------------- */}
            <section id="s6" data-sec>
              <Heading className="mt-[68px]">{w.currentState.heading}</Heading>

              {w.currentState.body.map((line) => (
                <p key={line} className={cn(PROSE, "mb-[26px]")}>
                  {line}
                </p>
              ))}

              <ul className="mb-[26px] flex flex-col gap-2">
                {w.currentState.questions.map((question) => (
                  <Bullet key={question}>{question}</Bullet>
                ))}
              </ul>

              {/* This citation carries an italicised title mid-sentence as
                  well as the link, so it is spelled out rather than spliced. */}
              <p className={cn(PROSE, "mb-[26px]")}>
                {w.currentState.cited.before}
                <em>{w.currentState.cited.italic}</em>
                {w.currentState.cited.after}
                <ExternalLink href={w.currentState.cited.link.href}>
                  {w.currentState.cited.link.label}
                </ExternalLink>
                {w.currentState.cited.end}
              </p>
            </section>

            {/* ---------------------- s7 ---------------------- */}
            <section id="s7" data-sec>
              <Heading className="mt-[68px]">{w.people.heading}</Heading>
              {w.people.body.map((line) => (
                <p key={line} className={cn(PROSE, "mb-[26px]")}>
                  {line}
                </p>
              ))}
            </section>

            {/* ---------------------- s8 ---------------------- */}
            <section id="s8" data-sec>
              <Heading className="mt-[68px]">{w.interruption.heading}</Heading>

              <div
                className="border-l-2 pl-[clamp(1.125rem,4vw,2.125rem)]"
                style={{ borderColor: accent.terracotta }}
              >
                {w.interruption.panel.map((line, index) => (
                  <p key={line} className={cn(PROSE, index > 0 && "mt-[26px]")}>
                    {line}
                  </p>
                ))}
              </div>
            </section>

            {/* ---------------------- s9 ---------------------- */}
            <section id="s9" data-sec>
              <Heading className="mt-[68px]">{w.measure.heading}</Heading>

              {w.measure.intro.map((line) => (
                <p key={line} className={cn(PROSE, "mb-[26px]")}>
                  {line}
                </p>
              ))}

              <ul className="mb-[26px] flex flex-col gap-2">
                {w.measure.questions.map((question) => (
                  <Bullet key={question}>{question}</Bullet>
                ))}
              </ul>

              <p className={cn(PROSE, "mb-[26px]")}>{w.measure.close}</p>
            </section>

            {/* --------------------- s10 ---------------------- */}
            <section id="s10" data-sec>
              <Heading className="mt-[68px]">{w.beginning.heading}</Heading>

              {w.beginning.body.map((line) => (
                <p key={line} className={cn(PROSE, "mb-[26px]")}>
                  {line}
                </p>
              ))}

              <div
                className="mt-10 border-t pt-8"
                style={{ borderColor: ink.line }}
              >
                <p className={EYEBROW} style={{ color: ink.subtle }}>
                  {w.beginning.shift.wasLabel}
                </p>
                <p
                  className="mt-2.5 font-reading text-[clamp(1.25rem,2.4vw,1.5rem)] leading-[1.35] text-pretty"
                  style={{ color: ink.subtle }}
                >
                  {w.beginning.shift.was}
                </p>

                <p
                  className={cn(EYEBROW, "mt-8")}
                  style={{ color: accent.terracotta }}
                >
                  {w.beginning.shift.isLabel}
                </p>
                <p
                  className="mt-2.5 font-reading text-[clamp(1.5rem,3vw,1.9375rem)] leading-[1.3] tracking-[-0.015em] text-pretty"
                  style={{ color: ink.black }}
                >
                  {w.beginning.shift.is}
                </p>

                <p className={cn(PROSE, "mt-6")}>{w.beginning.shift.close}</p>
              </div>
            </section>

            {/* ------------------ Sources and reading ---------------- */}
            <section
              aria-label={w.sources.heading}
              className="mt-[68px] border-t pt-8"
              style={{ borderColor: ink.black }}
            >
              <h2
                className="font-reading text-[1.5rem] leading-[1.2]"
                style={{ color: ink.black }}
              >
                {w.sources.heading}
              </h2>

              <ol className="mt-6 flex flex-col gap-7">
                {w.sources.items.map((item) => (
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
                        <em>{item.citation.italic}</em>
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
                  {w.footer.shareLabel}
                </span>
                <button
                  type="button"
                  onClick={share}
                  aria-label={w.rail.tools.share}
                  className="grid size-8 cursor-pointer place-items-center rounded-full transition-colors hover:text-[#E46C5A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E46C5A]"
                  style={{ border: `1px solid ${ink.line}`, color: ink.muted }}
                >
                  <ShareIcon className="size-[15px]" />
                </button>
                <button
                  type="button"
                  onClick={copy}
                  className="cursor-pointer rounded-full px-3 py-1.5 text-[0.75rem] font-semibold transition-colors hover:text-[#E46C5A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E46C5A]"
                  style={{ border: `1px solid ${ink.line}`, color: ink.muted }}
                >
                  {copyLabel}
                </button>
              </div>

              <p className="text-[0.78125rem]" style={{ color: ink.subtle }}>
                {w.footer.byline}
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
              {w.related.heading}
            </h2>
            <Link
              href={w.related.link.href}
              className="text-[0.8125rem] font-semibold transition-colors hover:text-[#E46C5A]"
              style={{ color: ink.muted }}
            >
              {w.related.link.label}
            </Link>
          </div>

          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {w.related.items.map((item) => (
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
                      "transition-colors group-hover:text-[#E46C5A]",
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
                  {w.subscribe.heading}
                </h2>
                <p
                  className="mt-3 max-w-[46ch] text-[0.9375rem] leading-[1.6] text-pretty"
                  style={{ color: ink.muted }}
                >
                  {w.subscribe.description}
                </p>
              </div>

              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  setSubNotice(true);
                }}
                className="flex min-w-0 flex-[1_1_20rem] flex-wrap gap-3"
              >
                <label htmlFor="fw-sub-email" className="sr-only">
                  {w.subscribe.label}
                </label>
                <input
                  id="fw-sub-email"
                  type="email"
                  required
                  placeholder={w.subscribe.placeholder}
                  className={cn(
                    "min-w-0 flex-auto rounded-full bg-white px-5 py-3",
                    "text-[0.9375rem] text-[#2A2434] placeholder:text-[#8C8299]",
                    "focus-visible:outline-2 focus-visible:outline-offset-2",
                    "focus-visible:outline-[#E46C5A]",
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
                    "focus-visible:outline-[#E46C5A]",
                  )}
                  style={{ background: accent.terracotta }}
                >
                  {w.subscribe.submit}
                </button>
              </form>
            </div>

            {subNotice && (
              <p
                role="status"
                className="mt-4 text-[0.8125rem]"
                style={{ color: ink.subtle }}
              >
                {w.subscribe.notice}
              </p>
            )}
          </div>
        </section>
      </main>

      {audio.playing && pastHero && !miniDismissed && (
        <ArticleMiniPlayer
          title={w.mini.title}
          dismissLabel={w.mini.dismiss}
          durationLabel={w.audio.durationLabel}
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

const pillClass = cn(
  "inline-flex cursor-pointer items-center gap-2 rounded-full",
  "border border-[#DDD2C2] bg-white px-[15px] py-[9px]",
  "text-[0.78125rem] font-semibold text-[#3E3850]",
  "transition-colors hover:border-[#E46C5A] hover:text-[#E46C5A]",
  "focus-visible:outline-2 focus-visible:outline-offset-2",
  "focus-visible:outline-[#E46C5A]",
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
        "transition-colors hover:text-[#E46C5A]",
        "focus-visible:outline-2 focus-visible:outline-offset-2",
        "focus-visible:outline-[#E46C5A]",
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
      style={{ color: accent.terracotta }}
    >
      {children}
    </a>
  );
}

/**
 * A paragraph whose `{0}` placeholder is replaced by its citation link, so the
 * link — and the hedge around it — always travels with the sentence that
 * earns it.
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
