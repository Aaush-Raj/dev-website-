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

import { livingBaselines } from "@/content/insights/living-baselines";
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
  RefreshLoop,
  TableToProfile,
  anatomyIcons,
} from "./LivingBaselinesArt";
import { EYEBROW, FRAME, HEADING, PROSE, accent, ink } from "./tokens";

/**
 * INSIGHT ARTICLE — "From competency documents to living baselines"
 * ---------------------------------------------------------------------------
 * The fourth article, rebuilt from its own HTML export.
 *
 * IT SHARES THE FIRST ARTICLE'S CATEGORY but not its colour: "Capability &
 * readiness" here is set in TERRACOTTA (#E46C5A), which carries the category
 * rule, the rail's active marker, the callout borders and every step number.
 * Violet appears only inside the diagrams. Its player, by contrast, keeps the
 * default terracotta-and-lilac tone, so no override is passed.
 *
 * IT CITES THREE SOURCES (WEF, NIST NICE, ILO) and states, for each, both what
 * it is BORROWED FOR and where it STOPS APPLYING. The 39% figure in the first
 * section carries its own qualification inline — the export is explicit that
 * it is a forecast rather than a measured expiry rate — and that sentence
 * travels with the statistic rather than being footnoted away.
 *
 * As with the others, the export's own nav is dropped (the site Header and
 * Footer wrap this route) and its per-event scroll handler is coalesced to one
 * read per animation frame.
 */

const b = livingBaselines;

const SPY_LINE = 0.35;

/** How far down the mini-player may appear, once playing. */
const MINI_AFTER = 900;

export function LivingBaselines() {
  const audio = useSimulatedAudio(b.audio.duration);

  const [readPercent, setReadPercent] = useState(0);
  const [active, setActive] = useState<string>(b.rail.items[0].id);
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

      let current: string = b.rail.items[0].id;

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

  const copyLabel = copied ? b.rail.tools.copy.done : b.rail.tools.copy.idle;

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
                {b.breadcrumb[0]}
              </Link>
              <span aria-hidden="true" style={{ color: ink.line }}>
                /
              </span>
              <Link href="/resources/insights" className="hover:text-[#191522]">
                {b.breadcrumb[1]}
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
                {b.category}
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
              {b.title}
            </h1>

            <p
              className={cn(
                "mb-[30px] max-w-[38ch] font-reading text-pretty",
                "text-[clamp(1.15625rem,1.9vw,1.375rem)] leading-[1.52]",
              )}
              style={{ color: ink.muted }}
            >
              {b.standfirst}
            </p>

            <div
              className="flex items-center gap-3.5 border-b pb-7 text-[0.71875rem] font-semibold tracking-[0.12em] uppercase"
              style={{ borderColor: ink.line, color: ink.subtle }}
            >
              <span>{b.facts[0]}</span>
              <span
                aria-hidden="true"
                className="size-1 rounded-full"
                style={{ background: ink.line }}
              />
              <span>{b.facts[1]}</span>
            </div>

            <div className="mt-[26px] flex flex-wrap items-center gap-3">
              <a
                href={b.actions.read.href}
                className={cn(
                  "inline-flex items-center gap-2.5 rounded-full px-5 py-3",
                  "text-[0.8125rem] font-semibold text-white",
                  "transition-opacity hover:opacity-90",
                  "focus-visible:outline-2 focus-visible:outline-offset-2",
                  "focus-visible:outline-[#E46C5A]",
                )}
                style={{ background: accent.terracotta }}
              >
                {b.actions.read.label}
                <ArrowDownIcon className="size-4" />
              </a>
              <a
                href={b.actions.listen.href}
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
                {b.actions.listen.label}
              </a>
            </div>
          </div>

          <div className="relative p-[clamp(0.5rem,2vw,1.5rem)]">
            <TableToProfile />
          </div>
        </section>

        {/* ====================== AUDIO EDITION ===================== */}
        {/* No tone override: this article keeps the default terracotta and
            lilac, which is what its own export uses. */}
        <section
          id="listen"
          className={cn(FRAME, "mt-[clamp(3rem,7vw,5.25rem)] print:hidden")}
        >
          <ArticleAudio content={b.audio} audio={audio} />
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
              {b.rail.title}
            </p>

            <ul
              className="flex flex-col gap-0.5 border-l"
              style={{ borderColor: ink.line }}
            >
              {b.rail.items.map((item) => {
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
                {b.rail.tools.share}
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
                {b.rail.tools.print}
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
                  {b.rail.mobileLabel}
                </button>
                <button type="button" onClick={share} className={pillClass}>
                  {b.rail.tools.share}
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
                  {b.rail.items.map((item) => (
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
              <Heading>{b.moving.heading}</Heading>

              {b.moving.body.map((line) => (
                <p key={line} className={cn(PROSE, "mb-[26px]")}>
                  {line}
                </p>
              ))}

              {/* The WEF figure, with its qualification attached. */}
              <figure
                className="my-10 rounded-[16px] p-[clamp(1.25rem,3vw,1.75rem)]"
                style={{
                  background: "#FCFAF6",
                  border: `1px solid ${ink.lineStrong}`,
                }}
              >
                <p
                  className="text-[1.0625rem] leading-[1.65] text-pretty"
                  style={{ color: ink.body }}
                >
                  {b.moving.stat.before}
                  <Strong>{b.moving.stat.strong}</Strong>
                  {b.moving.stat.after}
                </p>
                <p className="mt-4">
                  <ExternalLink href={b.moving.stat.link.href}>
                    {b.moving.stat.link.label}
                  </ExternalLink>
                </p>
              </figure>

              <p className={cn(PROSE, "mb-[26px]")}>{b.moving.close}</p>
            </section>

            {/* ---------------------- s2 ---------------------- */}
            <section id="s2" data-sec>
              <Heading className="mt-[68px]">{b.baseline.heading}</Heading>

              {b.baseline.intro.map((line) => (
                <p key={line} className={cn(PROSE, "mb-[26px]")}>
                  {line}
                </p>
              ))}

              <ol className="mb-[26px] flex flex-col gap-3">
                {b.baseline.questions.map((question, index) => (
                  <li key={question} className="flex items-baseline gap-3">
                    <span
                      aria-hidden="true"
                      className="shrink-0 font-reading text-[1.0625rem]"
                      style={{ color: accent.terracotta }}
                    >
                      {index + 1}
                    </span>
                    <span
                      className="font-reading text-[1.0625rem] leading-[1.6] text-pretty"
                      style={{ color: ink.body }}
                    >
                      {question}
                    </span>
                  </li>
                ))}
              </ol>

              <p className={cn(PROSE, "mb-[26px]")}>
                <Spliced
                  parts={b.baseline.definition.parts}
                  strong={b.baseline.definition.strong}
                />
              </p>

              <p className={cn(PROSE, "mb-[26px]")}>{b.baseline.close}</p>
            </section>

            {/* ---------------------- s3 ---------------------- */}
            <section id="s3" data-sec>
              <Heading className="mt-[68px]">{b.work.heading}</Heading>

              <p className={cn(PROSE, "mb-[26px]")}>
                <Spliced
                  parts={b.work.labels.parts}
                  italic={b.work.labels.italic}
                />
              </p>

              {b.work.body.map((line) => (
                <p key={line} className={cn(PROSE, "mb-[26px]")}>
                  {line}
                </p>
              ))}

              <p className={cn(PROSE, "mb-[26px]")}>
                {b.work.lead.before}
                <Strong>{b.work.lead.strong}</Strong>
                {b.work.lead.after}
              </p>

              {/* The concrete replacement for the abstract label. */}
              <figure
                className="my-10 border-l-2 pl-[clamp(1.125rem,4vw,2.125rem)]"
                style={{ borderColor: accent.terracotta }}
              >
                <p
                  className={cn(
                    "font-reading font-normal text-pretty",
                    "text-[clamp(1.25rem,2.6vw,1.625rem)] leading-[1.36]",
                  )}
                  style={{ color: ink.black }}
                >
                  {b.work.example}
                </p>
              </figure>

              <p className={cn(PROSE, "mb-[26px]")}>{b.work.after}</p>

              <Cited content={b.work.cited} />
            </section>

            {/* ---------------------- s4 ---------------------- */}
            <section id="s4" data-sec>
              <Heading className="mt-[68px]">{b.living.heading}</Heading>
              <p className={cn(PROSE, "mb-[26px]")}>{b.living.intro}</p>

              <ol className="mb-[26px] grid gap-4 sm:grid-cols-2">
                {b.living.elements.map((element) => (
                  <li
                    key={element.number}
                    className="rounded-[16px] p-[clamp(1.125rem,2.5vw,1.5rem)]"
                    style={{
                      background: "#FCFAF6",
                      border: `1px solid ${ink.lineStrong}`,
                    }}
                  >
                    <div className="flex items-baseline gap-3">
                      <span
                        className="font-reading text-[1.25rem] leading-none"
                        style={{ color: accent.terracotta }}
                      >
                        {element.number}
                      </span>
                      <h3
                        className="font-reading text-[1.1875rem] leading-[1.3]"
                        style={{ color: ink.black }}
                      >
                        {element.title}
                      </h3>
                    </div>
                    <p
                      className="mt-3 text-[0.9375rem] leading-[1.65] text-pretty"
                      style={{ color: ink.muted }}
                    >
                      {element.text}
                    </p>
                  </li>
                ))}
              </ol>

              <p className={cn(PROSE, "mb-[26px]")}>{b.living.close}</p>

              {/* The pull-quote, on a dark panel. */}
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
                  {b.living.pullQuote}
                </p>
              </figure>

              {/* The four-part anatomy. */}
              <figure
                className="my-10 rounded-[18px] p-[clamp(1.25rem,3vw,1.75rem)]"
                style={{
                  background: "#FCFAF6",
                  border: `1px solid ${ink.lineStrong}`,
                }}
              >
                <figcaption className={EYEBROW} style={{ color: accent.brass }}>
                  {b.living.anatomy.title}
                </figcaption>

                <ol className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {b.living.anatomy.items.map((item) => {
                    const Icon = anatomyIcons[item.icon];

                    return (
                      <li key={item.title} className="text-center">
                        <Icon className="mx-auto size-12" />
                        <p
                          className="mt-3 font-reading text-[1.0625rem]"
                          style={{ color: ink.black }}
                        >
                          {item.title}
                        </p>
                        <p
                          className="mt-1.5 text-[0.8125rem] leading-[1.5] text-pretty"
                          style={{ color: ink.subtle }}
                        >
                          {item.text}
                        </p>
                      </li>
                    );
                  })}
                </ol>

                <p
                  className="mt-6 text-[0.78125rem] leading-[1.55] text-pretty"
                  style={{ color: ink.subtle }}
                >
                  {b.living.anatomy.caption}
                </p>
              </figure>
            </section>

            {/* ---------------------- s5 ---------------------- */}
            <section id="s5" data-sec>
              <Heading className="mt-[68px]">{b.example.heading}</Heading>

              <div
                className="rounded-[18px] p-[clamp(1.25rem,3vw,2rem)]"
                style={{
                  background: "#F1EFE4",
                  border: "1px solid #E2DCC9",
                }}
              >
                <p className={EYEBROW} style={{ color: accent.brass }}>
                  {b.example.eyebrow}
                </p>

                {b.example.intro.map((line) => (
                  <p
                    key={line}
                    className="mt-4 font-reading text-[1.0625rem] leading-[1.66] text-pretty"
                    style={{ color: ink.body }}
                  >
                    {line}
                  </p>
                ))}

                <ul className="my-5 flex flex-col gap-2">
                  {b.example.list.map((entry) => (
                    <Bullet key={entry}>{entry}</Bullet>
                  ))}
                </ul>

                {b.example.close.map((line) => (
                  <p
                    key={line}
                    className="mb-3.5 text-[0.9375rem] leading-[1.7] text-pretty"
                    style={{ color: ink.muted }}
                  >
                    {line}
                  </p>
                ))}
              </div>
            </section>

            {/* ---------------------- s6 ---------------------- */}
            <section id="s6" data-sec>
              <Heading className="mt-[68px]">{b.rhythm.heading}</Heading>
              <p className={cn(PROSE, "mb-[26px]")}>{b.rhythm.intro}</p>

              <ol
                className="mb-[26px] border-t"
                style={{ borderColor: ink.line }}
              >
                {b.rhythm.steps.map((step) => (
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
                      style={{ background: accent.terracotta }}
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
                      {"link" in step && step.link ? (
                        <p className="mt-2">
                          <ExternalLink href={step.link.href}>
                            {step.link.label}
                          </ExternalLink>
                        </p>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ol>

              <p className={cn(PROSE, "mb-[26px]")}>{b.rhythm.close}</p>

              {/* The refresh loop. It scrolls sideways rather than wrapping,
                  because the order of the stages is the point. */}
              <figure
                className="my-10 rounded-[18px] p-[clamp(1.25rem,3vw,1.75rem)]"
                style={{
                  background: "#FCFAF6",
                  border: `1px solid ${ink.lineStrong}`,
                }}
              >
                <figcaption className={EYEBROW} style={{ color: accent.brass }}>
                  {b.rhythm.loop.title}
                </figcaption>

                <div className="mt-5 overflow-x-auto">
                  <div className="min-w-[34rem]">
                    <RefreshLoop
                      stages={b.rhythm.loop.stages}
                      pause={b.rhythm.loop.pause}
                    />
                  </div>
                </div>

                <p
                  className="mt-4 text-[0.78125rem] leading-[1.55] text-pretty"
                  style={{ color: ink.subtle }}
                >
                  {b.rhythm.loop.caption}
                </p>
              </figure>
            </section>

            {/* ---------------------- s7 ---------------------- */}
            <section id="s7" data-sec>
              <Heading className="mt-[68px]">{b.limits.heading}</Heading>

              <div
                className="border-l-2 pl-[clamp(1.125rem,4vw,2.125rem)]"
                style={{ borderColor: accent.terracotta }}
              >
                {b.limits.panel.map((line, index) => (
                  <p key={line} className={cn(PROSE, index > 0 && "mt-[26px]")}>
                    {line}
                  </p>
                ))}

                <p className={cn(PROSE, "mt-[26px]")}>
                  {b.limits.uncertainty.before}
                  <Strong>{b.limits.uncertainty.strong}</Strong>
                  {b.limits.uncertainty.after}
                </p>

                <p className={cn(PROSE, "mt-[26px]")}>{b.limits.close}</p>
              </div>
            </section>

            {/* ---------------------- s8 ---------------------- */}
            <section id="s8" data-sec>
              <Heading className="mt-[68px]">{b.close.heading}</Heading>

              {b.close.body.map((line) => (
                <p key={line} className={cn(PROSE, "mb-[26px]")}>
                  {line}
                </p>
              ))}

              <div
                className="mt-10 border-t pt-8"
                style={{ borderColor: ink.line }}
              >
                <p className={EYEBROW} style={{ color: ink.subtle }}>
                  {b.close.shift.wasLabel}
                </p>
                <p
                  className="mt-2.5 font-reading text-[clamp(1.25rem,2.4vw,1.5rem)] leading-[1.35] text-pretty"
                  style={{ color: ink.subtle }}
                >
                  {b.close.shift.was}
                </p>

                <p
                  className={cn(EYEBROW, "mt-8")}
                  style={{ color: accent.terracotta }}
                >
                  {b.close.shift.isLabel}
                </p>
                <p
                  className="mt-2.5 font-reading text-[clamp(1.5rem,3vw,1.9375rem)] leading-[1.3] tracking-[-0.015em] text-pretty"
                  style={{ color: ink.black }}
                >
                  {b.close.shift.is}
                </p>

                <p className={cn(PROSE, "mt-6")}>{b.close.shift.close}</p>
              </div>
            </section>

            {/* ------------------ Sources and reading ---------------- */}
            <section
              aria-label={b.sources.heading}
              className="mt-[68px] border-t pt-8"
              style={{ borderColor: ink.black }}
            >
              <h2
                className="font-reading text-[1.5rem] leading-[1.2]"
                style={{ color: ink.black }}
              >
                {b.sources.heading}
              </h2>

              <ol className="mt-6 flex flex-col gap-7">
                {b.sources.items.map((item) => (
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
                  {b.footer.shareLabel}
                </span>
                <button
                  type="button"
                  onClick={share}
                  aria-label={b.rail.tools.share}
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
                {b.footer.byline}
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
              {b.related.heading}
            </h2>
            <Link
              href={b.related.link.href}
              className="text-[0.8125rem] font-semibold transition-colors hover:text-[#E46C5A]"
              style={{ color: ink.muted }}
            >
              {b.related.link.label}
            </Link>
          </div>

          <ul className="mt-8 grid gap-6 sm:grid-cols-2">
            {b.related.items.map((item) => (
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
                  {b.subscribe.heading}
                </h2>
                <p
                  className="mt-3 max-w-[46ch] text-[0.9375rem] leading-[1.6] text-pretty"
                  style={{ color: ink.muted }}
                >
                  {b.subscribe.description}
                </p>
              </div>

              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  setSubNotice(true);
                }}
                className="flex min-w-0 flex-[1_1_20rem] flex-wrap gap-3"
              >
                <label htmlFor="lb-sub-email" className="sr-only">
                  {b.subscribe.label}
                </label>
                <input
                  id="lb-sub-email"
                  type="email"
                  required
                  placeholder={b.subscribe.placeholder}
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
                  {b.subscribe.submit}
                </button>
              </form>
            </div>

            {subNotice && (
              <p
                role="status"
                className="mt-4 text-[0.8125rem]"
                style={{ color: ink.subtle }}
              >
                {b.subscribe.notice}
              </p>
            )}
          </div>
        </section>
      </main>

      {audio.playing && pastHero && !miniDismissed && (
        <ArticleMiniPlayer
          title={b.mini.title}
          dismissLabel={b.mini.dismiss}
          durationLabel={b.audio.durationLabel}
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

function Strong({ children }: { children: React.ReactNode }) {
  return (
    <strong className="font-semibold" style={{ color: ink.black }}>
      {children}
    </strong>
  );
}

/**
 * A sentence whose parts are emphasised by index — bolded, italicised, or
 * left plain. Keeps emphasis attached to the sentence that carries it
 * without putting markup in the content file.
 *
 * The index arrays are widened to `readonly number[]` because the content's
 * `as const` narrows each to the exact literals it happens to use.
 */
function Spliced({
  parts,
  strong,
  italic,
}: {
  parts: readonly string[];
  strong?: readonly number[];
  italic?: readonly number[];
}) {
  return (
    <>
      {parts.map((part, index) => {
        if (strong?.includes(index)) {
          return <Strong key={index}>{part}</Strong>;
        }

        if (italic?.includes(index)) {
          return <em key={index}>{part}</em>;
        }

        return <Fragment key={index}>{part}</Fragment>;
      })}
    </>
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
 * link always travels with the sentence that earns it.
 */
function Cited({
  content,
}: {
  content: {
    text: string;
    links: readonly { label: string; href: string }[];
  };
}) {
  const parts = content.text.split(/(\{\d\})/);

  return (
    <p className={cn(PROSE, "mb-[26px]")}>
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
