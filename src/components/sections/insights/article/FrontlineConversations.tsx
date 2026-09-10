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

import { frontlineConversations } from "@/content/insights/frontline-conversations";
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
import { ConversationsToEvidence, FlowArrow, flowIcons } from "./FrontlineArt";
import {
  EYEBROW,
  FRAME,
  HEADING,
  PROSE,
  accent,
  ink,
  plumTint,
} from "./tokens";

/**
 * INSIGHT ARTICLE — "What 9,328 frontline conversations revealed"
 * ---------------------------------------------------------------------------
 * The third article, rebuilt from its own HTML export.
 *
 * IT IS A FIELD NOTE ABOUT A CLIENT IMPLEMENTATION, and the export is
 * scrupulous about the limits of what it reports. Three separate devices carry
 * that restraint, and all three are reproduced rather than treated as
 * boilerplate: an "Evidence boundary" callout in the first section, a whole
 * section on what the evidence does NOT prove, and a caption qualifying its
 * own workflow diagram as illustrative. Removing any of them would make the
 * article claim more than its source supports.
 *
 * WHAT DIFFERS FROM THE OTHER TWO:
 *
 *   - ITS ACCENT IS PLUM (#755078) with a mauve partner (#9A6F91). The player
 *     is tinted to match, through the tone the audio component now takes.
 *
 *   - ITS PLAYER WORKS. Unlike the second article's disabled card, this one
 *     runs the same simulated clock as the first, with a transcript and a
 *     sticky mini-player. The mini-player appears only WHILE PLAYING here,
 *     where the first article's shows whenever the reader is far enough down
 *     — that is the export's own difference, not a simplification.
 *
 *   - IT NAMES ITSELF A FIELD NOTE, in the rail's title and the share label.
 *
 *   - ITS s2 PULL-QUOTE IS ON A DARK PANEL rather than behind a rule.
 *
 * As with the others, the export's own nav is dropped (the site Header and
 * Footer wrap this route) and its per-event scroll handler is coalesced to one
 * read per animation frame.
 */

const f = frontlineConversations;

const SPY_LINE = 0.35;

/** How far down the mini-player may appear, once playing. */
const MINI_AFTER = 900;

/** The player, tinted to this article's plum. */
const audioTone: AudioTone = {
  eyebrow: accent.mauve,
  wave: [accent.mauve, "#C79FC0"],
  progress: [accent.plum, "#C79FC0"],
};

/** The flow diagram's colours, keyed by the tone name in the content file. */
const flowTones = {
  plum: accent.plum,
  mauve: accent.mauve,
  terracotta: accent.terracotta,
  olive: accent.olive,
} as const;

export function FrontlineConversations() {
  const audio = useSimulatedAudio(f.audio.duration);

  const [readPercent, setReadPercent] = useState(0);
  const [active, setActive] = useState<string>(f.rail.items[0].id);
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

      let current: string = f.rail.items[0].id;

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

  const copyLabel = copied ? f.rail.tools.copy.done : f.rail.tools.copy.idle;

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
            background: `linear-gradient(90deg, ${accent.plum}, ${accent.mauve})`,
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
                {f.breadcrumb[0]}
              </Link>
              <span aria-hidden="true" style={{ color: ink.line }}>
                /
              </span>
              <Link href="/resources/insights" className="hover:text-[#191522]">
                {f.breadcrumb[1]}
              </Link>
            </nav>

            <div className="mt-[26px] mb-[18px] flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-px w-[26px]"
                style={{ background: accent.plum }}
              />
              <span
                className="text-[0.71875rem] font-bold tracking-[0.16em] uppercase"
                style={{ color: accent.plum }}
              >
                {f.category}
              </span>
            </div>

            <h1
              className={cn(
                "mb-4 font-reading font-normal text-balance",
                "text-[clamp(2.25rem,4.9vw,3.875rem)] leading-[1.05]",
                "tracking-[-0.025em]",
              )}
              style={{ color: ink.black }}
            >
              {f.title}
            </h1>

            {/* The badge marking this as a field report rather than an essay. */}
            <p
              className={cn(
                "mb-[22px] inline-block rounded-full px-3 py-1.5",
                "text-[0.6875rem] font-semibold tracking-[0.1em] uppercase",
              )}
              style={{
                background: plumTint.panel,
                border: `1px solid ${plumTint.lineStrong}`,
                color: accent.plum,
              }}
            >
              {f.badge}
            </p>

            <p
              className={cn(
                "mb-[30px] max-w-[38ch] font-reading text-pretty",
                "text-[clamp(1.15625rem,1.9vw,1.375rem)] leading-[1.52]",
              )}
              style={{ color: ink.muted }}
            >
              {f.standfirst}
            </p>

            <div
              className="flex items-center gap-3.5 border-b pb-7 text-[0.71875rem] font-semibold tracking-[0.12em] uppercase"
              style={{ borderColor: ink.line, color: ink.subtle }}
            >
              <span>{f.facts[0]}</span>
              <span
                aria-hidden="true"
                className="size-1 rounded-full"
                style={{ background: ink.line }}
              />
              <span>{f.facts[1]}</span>
            </div>

            <div className="mt-[26px] flex flex-wrap items-center gap-3">
              <a
                href={f.actions.read.href}
                className={cn(
                  "inline-flex items-center gap-2.5 rounded-full px-5 py-3",
                  "text-[0.8125rem] font-semibold text-white",
                  "transition-opacity hover:opacity-90",
                  "focus-visible:outline-2 focus-visible:outline-offset-2",
                  "focus-visible:outline-[#755078]",
                )}
                style={{ background: accent.plum }}
              >
                {f.actions.read.label}
                <ArrowDownIcon className="size-4" />
              </a>
              <a
                href={f.actions.listen.href}
                className={cn(
                  "inline-flex items-center gap-2.5 rounded-full px-5 py-3",
                  "text-[0.8125rem] font-semibold transition-colors",
                  "hover:border-[#755078] hover:text-[#755078]",
                  "focus-visible:outline-2 focus-visible:outline-offset-2",
                  "focus-visible:outline-[#755078]",
                )}
                style={{ border: `1px solid ${ink.line}`, color: ink.muted }}
              >
                <HeadphonesIcon className="size-[15px]" />
                {f.actions.listen.label}
              </a>
            </div>
          </div>

          <div className="relative p-[clamp(0.5rem,2vw,1.5rem)]">
            <ConversationsToEvidence label={f.heroLabel} />

            {/* The legend, as real text beneath the drawing. */}
            <ul className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2">
              {f.heroLegend.map((entry) => (
                <li
                  key={entry}
                  className="flex items-center gap-2 text-[0.71875rem] font-semibold"
                  style={{ color: ink.subtle }}
                >
                  <span
                    aria-hidden="true"
                    className="size-2 rounded-full"
                    style={{ background: accent.terracotta }}
                  />
                  {entry}
                </li>
              ))}
            </ul>

            {/* The two headline figures. */}
            <div
              className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 border-t pt-6"
              style={{ borderColor: ink.line }}
            >
              {f.heroMetrics.map((metric, index) => (
                <Fragment key={metric.label}>
                  {index > 0 && (
                    <span
                      aria-hidden="true"
                      className="hidden h-10 w-px sm:block"
                      style={{ background: ink.line }}
                    />
                  )}
                  <div className="text-center">
                    <p
                      className="font-reading text-[clamp(1.875rem,3.6vw,2.5rem)] leading-none"
                      style={{ color: ink.black }}
                    >
                      {metric.value}
                    </p>
                    <p
                      className="mt-2 text-[0.71875rem] font-semibold tracking-[0.1em] uppercase"
                      style={{ color: ink.subtle }}
                    >
                      {metric.label}
                    </p>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* ====================== AUDIO EDITION ===================== */}
        <section
          id="listen"
          className={cn(FRAME, "mt-[clamp(3rem,7vw,5.25rem)] print:hidden")}
        >
          <ArticleAudio content={f.audio} audio={audio} tone={audioTone} />
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
              {f.rail.title}
            </p>

            <ul
              className="flex flex-col gap-0.5 border-l"
              style={{ borderColor: ink.line }}
            >
              {f.rail.items.map((item) => {
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
                          ? "border-l-[#755078] font-semibold text-[#191522]"
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
                {f.rail.tools.share}
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
                {f.rail.tools.print}
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
                  {f.rail.mobileLabel}
                </button>
                <button type="button" onClick={share} className={pillClass}>
                  {f.rail.tools.share}
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
                  {f.rail.items.map((item) => (
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
              <Heading>{f.outOfSight.heading}</Heading>

              {f.outOfSight.body.map((line) => (
                <p key={line} className={cn(PROSE, "mb-[26px]")}>
                  {line}
                </p>
              ))}

              <p className={cn(PROSE, "mb-[26px]")}>
                {f.outOfSight.scale.before}
                <Strong>{f.outOfSight.scale.strong}</Strong>
                {f.outOfSight.scale.after}
              </p>

              <ul className="mb-[26px] flex flex-col gap-2">
                {f.outOfSight.findings.map((entry) => (
                  <Bullet key={entry}>{entry}</Bullet>
                ))}
              </ul>

              {f.outOfSight.after.map((line) => (
                <p key={line} className={cn(PROSE, "mb-[26px]")}>
                  {line}
                </p>
              ))}

              {/* The evidence boundary. It is the article's own qualification
                  of its source, so it sits in the flow rather than as an
                  aside a reader could skip. */}
              <figure
                className="my-10 rounded-[16px] p-[clamp(1.25rem,3vw,1.75rem)]"
                style={{
                  background: plumTint.panel,
                  border: `1px solid ${plumTint.line}`,
                }}
              >
                <figcaption className={EYEBROW} style={{ color: accent.plum }}>
                  {f.outOfSight.boundary.title}
                </figcaption>
                <p
                  className="mt-3.5 text-[0.9375rem] leading-[1.7] text-pretty"
                  style={{ color: ink.muted }}
                >
                  {f.outOfSight.boundary.text}
                </p>
              </figure>
            </section>

            {/* ---------------------- s2 ---------------------- */}
            <section id="s2" data-sec>
              <Heading className="mt-[68px]">
                {f.differentQuestion.heading}
              </Heading>

              {f.differentQuestion.body.map((line) => (
                <p key={line} className={cn(PROSE, "mb-[26px]")}>
                  {line}
                </p>
              ))}

              {/* This article sets its pull-quote on a dark panel, where the
                  other two rule theirs off in the margin. */}
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
                  {f.differentQuestion.pullQuote}
                </p>
              </figure>
            </section>

            {/* ---------------------- s3 ---------------------- */}
            <section id="s3" data-sec>
              <Heading className="mt-[68px]">{f.findings.heading}</Heading>

              {f.findings.items.map((item) => (
                <div key={item.heading} className="mb-10">
                  <h3
                    className="mb-5 font-reading text-[clamp(1.25rem,2.2vw,1.5rem)] leading-[1.3] text-pretty"
                    style={{ color: ink.black }}
                  >
                    {item.heading}
                  </h3>

                  {item.body.map((line) => (
                    <p key={line} className={cn(PROSE, "mb-[26px]")}>
                      {line}
                    </p>
                  ))}

                  {"close" in item && item.close ? (
                    <p className={cn(PROSE, "mb-[26px]")}>
                      {/* `strong` lists which parts are bolded. It is widened
                          to number[] because the content's `as const` narrows
                          it to the exact literals each item happens to use. */}
                      {item.close.parts.map((part, index) =>
                        (item.close.strong as readonly number[]).includes(
                          index,
                        ) ? (
                          <Strong key={index}>{part}</Strong>
                        ) : (
                          <Fragment key={index}>{part}</Fragment>
                        ),
                      )}
                    </p>
                  ) : null}

                  {"after" in item && item.after
                    ? item.after.map((line) => (
                        <p key={line} className={cn(PROSE, "mb-[26px]")}>
                          {line}
                        </p>
                      ))
                    : null}

                  {"list" in item && item.list ? (
                    <ul className="flex flex-col gap-2">
                      {item.list.map((entry) => (
                        <Bullet key={entry}>{entry}</Bullet>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}
            </section>

            {/* ---------------------- s4 ---------------------- */}
            <section id="s4" data-sec>
              <Heading className="mt-[68px]">{f.pattern.heading}</Heading>

              {f.pattern.body.map((line) => (
                <p key={line} className={cn(PROSE, "mb-[26px]")}>
                  {line}
                </p>
              ))}

              <ul className="mb-[26px] flex flex-col gap-2">
                {f.pattern.list.map((entry) => (
                  <Bullet key={entry}>{entry}</Bullet>
                ))}
              </ul>

              <p className={cn(PROSE, "mb-[26px]")}>
                {f.pattern.close.before}
                <Strong>{f.pattern.close.strong}</Strong>
                {f.pattern.close.after}
              </p>
            </section>

            {/* ---------------------- s5 ---------------------- */}
            <section id="s5" data-sec>
              <Heading className="mt-[68px]">{f.score.heading}</Heading>

              {f.score.body.map((line) => (
                <p key={line} className={cn(PROSE, "mb-[26px]")}>
                  {line}
                </p>
              ))}

              <ol className="mb-[26px] flex flex-col gap-4">
                {f.score.levels.map((level) => (
                  <li
                    key={level.number}
                    className="rounded-[16px] p-[clamp(1.125rem,2.5vw,1.5rem)]"
                    style={{
                      background: plumTint.panel,
                      border: `1px solid ${plumTint.line}`,
                    }}
                  >
                    <div className="flex items-baseline gap-3">
                      <span
                        className="font-reading text-[1.25rem] leading-none"
                        style={{ color: accent.plum }}
                      >
                        {level.number}
                      </span>
                      <h3
                        className="font-reading text-[1.25rem] leading-[1.3]"
                        style={{ color: ink.black }}
                      >
                        {level.title}
                      </h3>
                    </div>
                    <p
                      className="mt-3 text-[0.9375rem] leading-[1.7] text-pretty"
                      style={{ color: ink.muted }}
                    >
                      {level.text}
                    </p>
                  </li>
                ))}
              </ol>

              <p className={cn(PROSE, "mb-[26px]")}>{f.score.close}</p>

              {/* The three-layer figure. */}
              <figure
                className="my-10 rounded-[18px] p-[clamp(1.25rem,3vw,1.75rem)]"
                style={{
                  background: "#FCFAF6",
                  border: `1px solid ${ink.lineStrong}`,
                }}
              >
                <figcaption className={EYEBROW} style={{ color: accent.brass }}>
                  {f.score.layers.title}
                </figcaption>

                <ol className="mt-5 flex flex-col">
                  {f.score.layers.items.map((layer, index) => (
                    <Fragment key={layer.number}>
                      {index > 0 && (
                        <span
                          aria-hidden="true"
                          className="my-3 ml-[0.9375rem] h-5 w-px"
                          style={{ background: plumTint.lineStrong }}
                        />
                      )}
                      <li className="flex items-start gap-3.5">
                        <span
                          aria-hidden="true"
                          className={cn(
                            "grid size-[1.875rem] shrink-0 place-items-center",
                            "rounded-full text-[0.75rem] font-bold text-white",
                          )}
                          style={{ background: accent.plum }}
                        >
                          {layer.number}
                        </span>
                        <div className="min-w-0">
                          <p
                            className="font-reading text-[1.0625rem]"
                            style={{ color: ink.black }}
                          >
                            {layer.title}
                          </p>
                          <p
                            className="mt-1 text-[0.875rem] leading-[1.6] text-pretty"
                            style={{ color: ink.muted }}
                          >
                            {layer.text}
                            {"italic" in layer && layer.italic ? (
                              <em>{layer.italic}</em>
                            ) : null}
                          </p>
                        </div>
                      </li>
                    </Fragment>
                  ))}
                </ol>

                <p
                  className="mt-5 text-[0.78125rem] leading-[1.55] text-pretty"
                  style={{ color: ink.subtle }}
                >
                  {f.score.layers.caption}
                </p>
              </figure>
            </section>

            {/* ---------------------- s6 ---------------------- */}
            <section id="s6" data-sec>
              <Heading className="mt-[68px]">{f.action.heading}</Heading>

              {f.action.body.map((line) => (
                <p key={line} className={cn(PROSE, "mb-[26px]")}>
                  {line}
                </p>
              ))}

              <ol
                className="mb-[26px] border-t"
                style={{ borderColor: ink.line }}
              >
                {f.action.steps.map((step) => (
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
                      style={{ background: accent.plum }}
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
                      <p
                        className="mt-1.5 text-[0.9375rem] leading-[1.65] text-pretty"
                        style={{ color: ink.muted }}
                      >
                        {step.text}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              <p className={cn(PROSE, "mb-[26px]")}>{f.action.close}</p>

              {/* The workflow. It scrolls sideways rather than wrapping,
                  because the order of the steps is the point. */}
              <figure
                className="my-10 rounded-[18px] p-[clamp(1.25rem,3vw,1.75rem)]"
                style={{
                  background: "#FCFAF6",
                  border: `1px solid ${ink.lineStrong}`,
                }}
              >
                <figcaption className={EYEBROW} style={{ color: accent.brass }}>
                  {f.action.flow.title}
                </figcaption>

                <div className="mt-5 overflow-x-auto pb-2">
                  <ol className="flex min-w-max items-center gap-2">
                    {f.action.flow.steps.map((step, index) => {
                      const Icon = flowIcons[step.icon];
                      const connector = f.action.flow.connectors[index];

                      return (
                        <Fragment key={step.label}>
                          <li className="flex w-[6.5rem] shrink-0 flex-col items-center gap-2 text-center">
                            <span
                              aria-hidden="true"
                              className="grid size-9 place-items-center rounded-full"
                              style={{
                                background: "#FFFFFF",
                                border: `1px solid ${plumTint.lineStrong}`,
                                color: flowTones[step.tone],
                              }}
                            >
                              <Icon
                                className="size-4"
                                stroke={flowTones[step.tone]}
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
                            <FlowArrow
                              tone={flowTones[connector.tone]}
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

                {/* The export qualifies its own diagram; that stays. */}
                <p
                  className="mt-5 text-[0.78125rem] leading-[1.55] text-pretty"
                  style={{ color: ink.subtle }}
                >
                  {f.action.flow.caption}
                </p>
              </figure>
            </section>

            {/* ---------------------- s7 ---------------------- */}
            <section id="s7" data-sec>
              <Heading className="mt-[68px]">{f.limits.heading}</Heading>

              <div
                className="rounded-[18px] p-[clamp(1.25rem,3vw,2rem)]"
                style={{
                  background: plumTint.panel,
                  border: `1px solid ${plumTint.line}`,
                }}
              >
                {f.limits.panel.map((line, index) => (
                  <p
                    key={line}
                    className={cn(
                      "text-[0.9375rem] leading-[1.7] text-pretty",
                      index > 0 && "mt-3.5",
                    )}
                    style={{ color: ink.muted }}
                  >
                    {line}
                  </p>
                ))}
              </div>

              <p className={cn(PROSE, "mt-[26px] mb-[26px]")}>
                {f.limits.close}
              </p>
            </section>

            {/* ---------------------- s8 ---------------------- */}
            <section id="s8" data-sec>
              <Heading className="mt-[68px]">{f.startingPoint.heading}</Heading>

              <p className={cn(PROSE, "mb-[26px]")}>{f.startingPoint.intro}</p>
              <Question>{f.startingPoint.oldQuestion}</Question>
              <p className={cn(PROSE, "mb-[26px]")}>{f.startingPoint.bridge}</p>
              <Question>{f.startingPoint.newQuestion}</Question>

              {f.startingPoint.body.map((line) => (
                <p key={line} className={cn(PROSE, "mb-[26px]")}>
                  {line}
                </p>
              ))}

              <div
                className="mt-10 border-t pt-8"
                style={{ borderColor: ink.line }}
              >
                <p className={EYEBROW} style={{ color: ink.subtle }}>
                  {f.startingPoint.shift.wasLabel}
                </p>
                <p
                  className="mt-2.5 font-reading text-[clamp(1.25rem,2.4vw,1.5rem)] leading-[1.35] text-pretty"
                  style={{ color: ink.subtle }}
                >
                  {f.startingPoint.shift.was}
                </p>

                <p
                  className={cn(EYEBROW, "mt-8")}
                  style={{ color: accent.plum }}
                >
                  {f.startingPoint.shift.isLabel}
                </p>
                <p
                  className="mt-2.5 font-reading text-[clamp(1.5rem,3vw,1.9375rem)] leading-[1.3] tracking-[-0.015em] text-pretty"
                  style={{ color: ink.black }}
                >
                  {f.startingPoint.shift.is}
                </p>

                <p className={cn(PROSE, "mt-6")}>
                  {f.startingPoint.shift.close}
                </p>
              </div>
            </section>

            {/* ---------------- Evidence and reading notes ----------- */}
            <section
              aria-label={f.sources.heading}
              className="mt-[68px] border-t pt-8"
              style={{ borderColor: ink.black }}
            >
              <h2
                className="font-reading text-[1.5rem] leading-[1.2]"
                style={{ color: ink.black }}
              >
                {f.sources.heading}
              </h2>

              <ol className="mt-6 flex flex-col gap-7">
                {f.sources.items.map((item) => (
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
                        {item.title}
                      </p>

                      {/* The first note has no link: it is the anonymised
                          record itself, which by definition cannot be cited. */}
                      {item.links.length > 0 && (
                        <p className="mt-2">
                          {item.links.map((link) => (
                            <a
                              key={link.href}
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium underline decoration-from-font underline-offset-2 transition-colors hover:text-[#191522]"
                              style={{ color: accent.plum }}
                            >
                              {link.label}
                            </a>
                          ))}
                        </p>
                      )}

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
                  {f.footer.shareLabel}
                </span>
                <button
                  type="button"
                  onClick={share}
                  aria-label={f.rail.tools.share}
                  className="grid size-8 cursor-pointer place-items-center rounded-full transition-colors hover:text-[#755078] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#755078]"
                  style={{ border: `1px solid ${ink.line}`, color: ink.muted }}
                >
                  <ShareIcon className="size-[15px]" />
                </button>
                <button
                  type="button"
                  onClick={copy}
                  className="cursor-pointer rounded-full px-3 py-1.5 text-[0.75rem] font-semibold transition-colors hover:text-[#755078] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#755078]"
                  style={{ border: `1px solid ${ink.line}`, color: ink.muted }}
                >
                  {copyLabel}
                </button>
              </div>

              <p className="text-[0.78125rem]" style={{ color: ink.subtle }}>
                {f.footer.byline}
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
              {f.related.heading}
            </h2>
            <Link
              href={f.related.link.href}
              className="text-[0.8125rem] font-semibold transition-colors hover:text-[#755078]"
              style={{ color: ink.muted }}
            >
              {f.related.link.label}
            </Link>
          </div>

          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {f.related.items.map((item) => (
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
                      "transition-colors group-hover:text-[#755078]",
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
                  {f.subscribe.heading}
                </h2>
                <p
                  className="mt-3 max-w-[46ch] text-[0.9375rem] leading-[1.6] text-pretty"
                  style={{ color: ink.muted }}
                >
                  {f.subscribe.description}
                </p>
              </div>

              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  setSubNotice(true);
                }}
                className="flex min-w-0 flex-[1_1_20rem] flex-wrap gap-3"
              >
                <label htmlFor="fl-sub-email" className="sr-only">
                  {f.subscribe.label}
                </label>
                <input
                  id="fl-sub-email"
                  type="email"
                  required
                  placeholder={f.subscribe.placeholder}
                  className={cn(
                    "min-w-0 flex-auto rounded-full bg-white px-5 py-3",
                    "text-[0.9375rem] text-[#2A2434] placeholder:text-[#8C8299]",
                    "focus-visible:outline-2 focus-visible:outline-offset-2",
                    "focus-visible:outline-[#755078]",
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
                    "focus-visible:outline-[#755078]",
                  )}
                  style={{ background: accent.plum }}
                >
                  {f.subscribe.submit}
                </button>
              </form>
            </div>

            {subNotice && (
              <p
                role="status"
                className="mt-4 text-[0.8125rem]"
                style={{ color: ink.subtle }}
              >
                {f.subscribe.notice}
              </p>
            )}
          </div>
        </section>
      </main>

      {/* The mini-player. Unlike the first article's, it appears only while
          the audio is actually playing — the export gates it on that. */}
      {audio.playing && pastHero && !miniDismissed && (
        <ArticleMiniPlayer
          title={f.mini.title}
          dismissLabel={f.mini.dismiss}
          durationLabel={f.audio.durationLabel}
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
  "transition-colors hover:border-[#755078] hover:text-[#755078]",
  "focus-visible:outline-2 focus-visible:outline-offset-2",
  "focus-visible:outline-[#755078]",
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
        "transition-colors hover:text-[#755078]",
        "focus-visible:outline-2 focus-visible:outline-offset-2",
        "focus-visible:outline-[#755078]",
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

/** Bolded emphasis inside prose, at the weight the export sets. */
function Strong({ children }: { children: React.ReactNode }) {
  return (
    <strong className="font-semibold" style={{ color: ink.black }}>
      {children}
    </strong>
  );
}

/** A question the design lifts clear of the paragraphs around it. */
function Question({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="mb-[26px] font-reading text-[1.4375rem] leading-[1.42] text-pretty"
      style={{ color: ink.black }}
    >
      {children}
    </p>
  );
}

/** A list item with the design's small square in place of a bullet. */
function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span
        aria-hidden="true"
        className="mt-2 size-1.5 shrink-0 rounded-[1px]"
        style={{ background: accent.plum }}
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
