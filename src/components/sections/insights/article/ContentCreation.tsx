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

import { contentCreation } from "@/content/insights/content-creation";
import { cn } from "@/lib/utils";

import {
  ArrowDownIcon,
  ArrowRightIcon,
  HeadphonesIcon,
  LinkIcon,
  PlayIcon,
  PrintIcon,
  ShareIcon,
  SpeakerIcon,
} from "./ArticleIcons";
import {
  ServiceConversation,
  SourcesToFormats,
  formatIcons,
} from "./ContentCreationArt";
import { EYEBROW, FRAME, HEADING, PROSE, accent, ink } from "./tokens";

/**
 * INSIGHT ARTICLE — "Why content creation is no longer the bottleneck"
 * ---------------------------------------------------------------------------
 * The second article, rebuilt from its own HTML export.
 *
 * IT IS NOT THE FIRST ARTICLE WITH DIFFERENT WORDS. Four things genuinely
 * differ, and each is why this is a separate component rather than a prop on
 * the first:
 *
 *   - ITS ACCENT IS OLIVE. The category rule, the progress bar, the rail's
 *     active marker and the pull-quote all take #68796B where the first
 *     article takes violet.
 *
 *   - ITS PLAYER IS DISABLED. The export ships it with `disabled`, times
 *     reading "--:--" and the label "Audio version coming soon". It is built
 *     that way rather than given the first article's simulated clock: the
 *     design says plainly there is nothing to play, and a fake timer would
 *     contradict it. There is no mini-player here for the same reason.
 *
 *   - IT CITES SOURCES. Three studies are linked inline and listed in full at
 *     the foot with their scope stated. Inline citations are spliced into the
 *     sentence that earns them, so a link cannot drift from its claim.
 *
 *   - IT HAS NO FULL-BLEED BREAK, so the prose is one column throughout and
 *     the rail stays beside it for the whole article.
 *
 * As with the first, the export's own nav is dropped — the site Header and
 * Footer wrap this route — and its per-event scroll handler is coalesced to
 * one read per animation frame.
 */

const c = contentCreation;

/** Where the rail's spy switches over: 35% down the viewport, as the export. */
const SPY_LINE = 0.35;

export function ContentCreation() {
  const [readPercent, setReadPercent] = useState(0);
  const [active, setActive] = useState<string>(c.rail.items[0].id);
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

      let current: string = c.rail.items[0].id;

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

  const copyLabel = copied ? c.rail.tools.copy.done : c.rail.tools.copy.idle;

  return (
    <div className="relative" style={{ background: ink.paper }}>
      {/* The read-progress bar — olive into violet on this article. */}
      <div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-90 h-[3px] bg-[rgba(25,21,34,0.07)] print:hidden"
      >
        <div
          className="h-full"
          style={{
            width: `${readPercent}%`,
            background: `linear-gradient(90deg, ${accent.olive}, ${accent.violet})`,
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
                {c.breadcrumb[0]}
              </Link>
              <span aria-hidden="true" style={{ color: ink.line }}>
                /
              </span>
              <Link href="/resources/insights" className="hover:text-[#191522]">
                {c.breadcrumb[1]}
              </Link>
            </nav>

            <div className="mt-[26px] mb-[18px] flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-px w-[26px]"
                style={{ background: accent.olive }}
              />
              <span
                className="text-[0.71875rem] font-bold tracking-[0.16em] uppercase"
                style={{ color: accent.olive }}
              >
                {c.category}
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
              {c.title}
            </h1>

            <p
              className={cn(
                "mb-[30px] max-w-[38ch] font-reading text-pretty",
                "text-[clamp(1.15625rem,1.9vw,1.375rem)] leading-[1.52]",
              )}
              style={{ color: ink.muted }}
            >
              {c.standfirst}
            </p>

            <div
              className="flex items-center gap-3.5 border-b pb-7 text-[0.71875rem] font-semibold tracking-[0.12em] uppercase"
              style={{ borderColor: ink.line, color: ink.subtle }}
            >
              <span>{c.facts[0]}</span>
              <span
                aria-hidden="true"
                className="size-1 rounded-full"
                style={{ background: ink.line }}
              />
              <span>{c.facts[1]}</span>
            </div>

            <div className="mt-[26px] flex flex-wrap items-center gap-3">
              <a
                href={c.actions.read.href}
                className={cn(
                  "inline-flex items-center gap-2.5 rounded-full px-5 py-3",
                  "text-[0.8125rem] font-semibold text-white",
                  "transition-opacity hover:opacity-90",
                  "focus-visible:outline-2 focus-visible:outline-offset-2",
                  "focus-visible:outline-[#68796B]",
                )}
                style={{ background: accent.olive }}
              >
                {c.actions.read.label}
                <ArrowDownIcon className="size-4" />
              </a>
              <a
                href={c.actions.listen.href}
                className={cn(
                  "inline-flex items-center gap-2.5 rounded-full px-5 py-3",
                  "text-[0.8125rem] font-semibold transition-colors",
                  "hover:border-[#68796B] hover:text-[#68796B]",
                  "focus-visible:outline-2 focus-visible:outline-offset-2",
                  "focus-visible:outline-[#68796B]",
                )}
                style={{ border: `1px solid ${ink.line}`, color: ink.muted }}
              >
                <HeadphonesIcon className="size-[15px]" />
                {c.actions.listen.label}
              </a>
            </div>
          </div>

          <div className="relative p-[clamp(0.5rem,2vw,1.5rem)]">
            <SourcesToFormats labels={c.heroLabels} />
          </div>
        </section>

        {/* ================= AUDIO — not yet available =============== */}
        {/*
          Rebuilt in its disabled state, as the export ships it. The button
          carries `disabled` and the times read "--:--", so nothing here
          claims to be playable; the status line says so in words too.
        */}
        <section
          id="listen"
          className={cn(FRAME, "mt-[clamp(3rem,7vw,5.25rem)] print:hidden")}
        >
          <div
            className="rounded-[20px] p-[clamp(1.375rem,3vw,2.125rem)]"
            style={{ background: ink.black }}
          >
            <div className="flex flex-wrap items-center gap-[clamp(1.125rem,3vw,2.25rem)]">
              <div className="min-w-0 flex-[1_1_16.25rem]">
                <p
                  className="text-[0.6875rem] font-bold tracking-[0.16em] uppercase"
                  style={{ color: accent.amber }}
                >
                  {c.audio.eyebrow}
                </p>
                <p className="mt-3 mb-2 font-reading text-[clamp(1.3125rem,2.4vw,1.6875rem)] leading-[1.24] tracking-[-0.015em] text-[#F8F2E8]">
                  {c.audio.title}
                </p>
                <p className="text-[0.84375rem] leading-[1.5] text-[rgba(248,242,232,0.62)]">
                  {c.audio.description}
                </p>
              </div>

              <div className="flex min-w-0 flex-[1_1_23.75rem] items-center gap-[18px]">
                <button
                  type="button"
                  disabled
                  aria-label={c.audio.playLabel}
                  className={cn(
                    "grid size-[60px] shrink-0 place-items-center rounded-full",
                    "border border-[rgba(248,242,232,0.22)]",
                    "bg-[rgba(248,242,232,0.14)] text-[rgba(248,242,232,0.5)]",
                    "cursor-not-allowed",
                  )}
                >
                  <PlayIcon className="ml-[3px] size-5" />
                </button>

                <div className="min-w-0 flex-auto">
                  <p className="flex items-center gap-2 text-[0.78125rem] text-[rgba(248,242,232,0.62)]">
                    <span
                      aria-hidden="true"
                      className="size-1.5 rounded-full"
                      style={{ background: accent.amber }}
                    />
                    {c.audio.status}
                  </p>

                  {/* An inert bar, not a control: there is nothing to seek. */}
                  <div
                    role="progressbar"
                    aria-label={c.audio.progressLabel}
                    aria-valuenow={0}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    className="mt-3 h-1 rounded-full bg-[rgba(248,242,232,0.16)]"
                  />

                  <div className="mt-3 flex items-center justify-between gap-3 font-mono text-[0.71875rem] text-[rgba(248,242,232,0.45)]">
                    <span>{c.audio.placeholderTime}</span>
                    <div className="flex items-center gap-3.5">
                      <span>{c.audio.speed}</span>
                      <SpeakerIcon aria-hidden="true" className="size-4" />
                      <span>{c.audio.placeholderTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
              {c.rail.title}
            </p>

            <ul
              className="flex flex-col gap-0.5 border-l"
              style={{ borderColor: ink.line }}
            >
              {c.rail.items.map((item) => {
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
                          ? "border-l-[#68796B] font-semibold text-[#191522]"
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
                {c.rail.tools.share}
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
                {c.rail.tools.print}
              </RailTool>
            </div>
          </aside>

          {/* ----------------------- The prose ----------------------- */}
          <article className="mx-auto max-w-[47.5rem] min-w-0 flex-auto">
            {/* The rail's stand-in below lg: the contents collapse into a
                disclosure, with the two tools that make sense on a phone. */}
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
                  {c.rail.mobileLabel}
                </button>
                <button type="button" onClick={share} className={pillClass}>
                  {c.rail.tools.share}
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
                  {c.rail.items.map((item) => (
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
              <Heading>{c.queue.heading}</Heading>
              {c.queue.body.map((line) => (
                <p key={line} className={cn(PROSE, "mb-[26px]")}>
                  {line}
                </p>
              ))}
              <p className={cn(PROSE, "mb-[26px]")}>
                {c.queue.qualification.before}
                <strong className="font-semibold" style={{ color: ink.black }}>
                  {c.queue.qualification.strong}
                </strong>
                {c.queue.qualification.after}
              </p>
              <p className={cn(PROSE, "mb-[26px]")}>{c.queue.close}</p>
            </section>

            {/* ---------------------- s2 ---------------------- */}
            <section id="s2" data-sec>
              <Heading className="mt-[68px]">{c.draft.heading}</Heading>
              <Cited content={c.draft.cited} />
              {c.draft.body.map((line) => (
                <p key={line} className={cn(PROSE, "mb-[26px]")}>
                  {line}
                </p>
              ))}
            </section>

            {/* ---------------------- s3 ---------------------- */}
            <section id="s3" data-sec>
              <Heading className="mt-[68px]">{c.formats.heading}</Heading>

              <figure
                className="mb-[26px] rounded-[18px] p-[clamp(1.25rem,3vw,1.75rem)]"
                style={{
                  background: "#FCFAF6",
                  border: `1px solid ${ink.lineStrong}`,
                }}
              >
                <figcaption className={EYEBROW} style={{ color: accent.brass }}>
                  {c.formats.figureTitle}
                </figcaption>

                <ul className="mt-5 grid gap-5 sm:grid-cols-2">
                  {c.formats.items.map((item) => {
                    const Icon = formatIcons[item.icon];

                    return (
                      <li
                        key={item.title}
                        className="flex items-center gap-3.5"
                      >
                        <Icon className="size-14 shrink-0" />
                        <div className="min-w-0">
                          <p
                            className="font-reading text-[1.0625rem]"
                            style={{ color: ink.black }}
                          >
                            {item.title}
                          </p>
                          <p
                            className="mt-0.5 text-[0.8125rem] leading-[1.5]"
                            style={{ color: ink.subtle }}
                          >
                            {item.purpose}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </figure>

              {c.formats.body.map((line) => (
                <p key={line} className={cn(PROSE, "mb-[26px]")}>
                  {line}
                </p>
              ))}

              <figure
                className="my-10 border-l-2 pl-[clamp(1.125rem,4vw,2.125rem)]"
                style={{ borderColor: accent.olive }}
              >
                <p
                  className={cn(
                    "font-reading font-normal",
                    "text-[clamp(1.5rem,3.2vw,2rem)] leading-[1.3]",
                    "tracking-[-0.02em] text-pretty",
                  )}
                  style={{ color: ink.black }}
                >
                  {c.formats.pullQuote}
                </p>
              </figure>
            </section>

            {/* ---------------------- s4 ---------------------- */}
            <section id="s4" data-sec>
              <Heading className="mt-[68px]">{c.moved.heading}</Heading>
              <p className={cn(PROSE, "mb-[26px]")}>{c.moved.intro}</p>

              <ol className="mb-[26px]">
                {c.moved.items.map((item, index) => (
                  <li
                    key={item.number}
                    className={cn("py-7", index > 0 && "border-t")}
                    style={index > 0 ? { borderColor: ink.line } : undefined}
                  >
                    <div className="flex items-baseline gap-3.5">
                      <span
                        className="font-reading text-[1.375rem] leading-none"
                        style={{ color: accent.olive }}
                      >
                        {item.number}
                      </span>
                      <h3
                        className="font-reading text-[1.375rem] leading-[1.28] text-pretty"
                        style={{ color: ink.black }}
                      >
                        {item.title}
                      </h3>
                    </div>

                    <div className="mt-4">
                      {item.body.map((line) => (
                        <p
                          key={line}
                          className="mb-3.5 text-[0.9375rem] leading-[1.7] text-pretty"
                          style={{ color: ink.muted }}
                        >
                          {line}
                        </p>
                      ))}

                      {"cited" in item && item.cited ? (
                        <Cited content={item.cited} small />
                      ) : null}

                      {"after" in item && item.after
                        ? item.after.map((line) => (
                            <p
                              key={line}
                              className="mb-3.5 text-[0.9375rem] leading-[1.7] text-pretty"
                              style={{ color: ink.muted }}
                            >
                              {line}
                            </p>
                          ))
                        : null}
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* ---------------------- s5 ---------------------- */}
            <section id="s5" data-sec>
              <Heading className="mt-[68px]">{c.example.heading}</Heading>

              <div
                className="rounded-[18px] p-[clamp(1.25rem,3vw,2rem)]"
                style={{
                  background: "#F1EFE4",
                  border: "1px solid #E2DCC9",
                }}
              >
                <p className={EYEBROW} style={{ color: accent.brass }}>
                  {c.example.eyebrow}
                </p>

                <div className="my-6 overflow-x-auto">
                  <div className="min-w-[30rem]">
                    <ServiceConversation />
                  </div>
                </div>

                {/* The three moments the diagram marks, as real text under
                    it so they wrap and stay selectable. */}
                <ul className="mb-6 grid gap-2 text-center sm:grid-cols-3">
                  {c.example.moments.map((moment) => (
                    <li
                      key={moment}
                      className="text-[0.75rem] font-semibold tracking-[0.06em] uppercase"
                      style={{ color: ink.subtle }}
                    >
                      {moment}
                    </li>
                  ))}
                </ul>

                {c.example.intro.map((line) => (
                  <p
                    key={line}
                    className="mb-3.5 font-reading text-[1.0625rem] leading-[1.66] text-pretty"
                    style={{ color: ink.body }}
                  >
                    {line}
                  </p>
                ))}

                <ul className="my-5 flex flex-col gap-2">
                  {c.example.list.map((entry) => (
                    <Bullet key={entry}>{entry}</Bullet>
                  ))}
                </ul>

                {c.example.close.map((line) => (
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
              <Heading className="mt-[68px]">{c.expertise.heading}</Heading>
              {c.expertise.body.map((line) => (
                <p key={line} className={cn(PROSE, "mb-[26px]")}>
                  {line}
                </p>
              ))}
            </section>

            {/* ---------------------- s7 ---------------------- */}
            <section id="s7" data-sec>
              <Heading className="mt-[68px]">{c.brief.heading}</Heading>
              <p className={cn(PROSE, "mb-[26px]")}>{c.brief.intro}</p>

              <ol
                className="mb-[26px] border-t"
                style={{ borderColor: ink.line }}
              >
                {c.brief.items.map((item) => (
                  <li
                    key={item.number}
                    className="flex gap-4 border-b py-5"
                    style={{ borderColor: ink.line }}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "grid size-7 shrink-0 place-items-center rounded-full",
                        "text-[0.78125rem] font-bold text-white",
                      )}
                      style={{ background: accent.olive }}
                    >
                      {item.number}
                    </span>
                    <div className="min-w-0">
                      <p
                        className="font-reading text-[1.1875rem] leading-[1.35] text-pretty"
                        style={{ color: ink.black }}
                      >
                        {item.question}
                      </p>
                      <p
                        className="mt-1.5 text-[0.9375rem] leading-[1.6] text-pretty"
                        style={{ color: ink.muted }}
                      >
                        {item.note}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              {c.brief.close.map((line) => (
                <p key={line} className={cn(PROSE, "mb-[26px]")}>
                  {line}
                </p>
              ))}
            </section>

            {/* ---------------------- s8 ---------------------- */}
            <section id="s8" data-sec>
              <Heading className="mt-[68px]">{c.measure.heading}</Heading>
              {c.measure.body.map((line) => (
                <p key={line} className={cn(PROSE, "mb-[26px]")}>
                  {line}
                </p>
              ))}
            </section>

            {/* ---------------------- s9 ---------------------- */}
            <section id="s9" data-sec>
              <Heading className="mt-[68px]">{c.next.heading}</Heading>
              {c.next.body.map((line) => (
                <p key={line} className={cn(PROSE, "mb-[26px]")}>
                  {line}
                </p>
              ))}

              {/* The two questions, the old one against the better one. */}
              <div
                className="mt-10 border-t pt-8"
                style={{ borderColor: ink.line }}
              >
                <p className={EYEBROW} style={{ color: ink.subtle }}>
                  {c.next.shift.wasLabel}
                </p>
                <p
                  className="mt-2.5 font-reading text-[clamp(1.25rem,2.4vw,1.5rem)] leading-[1.35] text-pretty"
                  style={{ color: ink.subtle }}
                >
                  {c.next.shift.was}
                </p>

                <p
                  className={cn(EYEBROW, "mt-8")}
                  style={{ color: accent.olive }}
                >
                  {c.next.shift.isLabel}
                </p>
                <p
                  className="mt-2.5 font-reading text-[clamp(1.5rem,3vw,1.9375rem)] leading-[1.3] tracking-[-0.015em] text-pretty"
                  style={{ color: ink.black }}
                >
                  {c.next.shift.is}
                </p>

                <p className={cn(PROSE, "mt-6")}>{c.next.shift.close}</p>
              </div>
            </section>

            {/* ------------------ Sources and reading ---------------- */}
            <section
              aria-label={c.sources.heading}
              className="mt-[68px] border-t pt-8"
              style={{ borderColor: ink.black }}
            >
              <h2
                className="font-reading text-[1.5rem] leading-[1.2]"
                style={{ color: ink.black }}
              >
                {c.sources.heading}
              </h2>

              <ol className="mt-6 flex flex-col gap-7">
                {c.sources.items.map((item) => (
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

                      <p className="mt-2 flex flex-wrap items-center gap-2">
                        {item.links.map((link, index) => (
                          <Fragment key={link.href}>
                            {index > 0 && (
                              <span
                                aria-hidden="true"
                                style={{ color: ink.line }}
                              >
                                ·
                              </span>
                            )}
                            <ExternalLink href={link.href}>
                              {link.label}
                            </ExternalLink>
                          </Fragment>
                        ))}
                      </p>

                      <p
                        className="mt-2 text-[0.8125rem] leading-[1.6] text-pretty"
                        style={{ color: ink.subtle }}
                      >
                        {item.scope}
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
                  {c.footer.shareLabel}
                </span>
                <button
                  type="button"
                  onClick={share}
                  aria-label={c.rail.tools.share}
                  className="grid size-8 cursor-pointer place-items-center rounded-full transition-colors hover:text-[#68796B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#68796B]"
                  style={{ border: `1px solid ${ink.line}`, color: ink.muted }}
                >
                  <ShareIcon className="size-[15px]" />
                </button>
                <button
                  type="button"
                  onClick={copy}
                  className="cursor-pointer rounded-full px-3 py-1.5 text-[0.75rem] font-semibold transition-colors hover:text-[#68796B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#68796B]"
                  style={{ border: `1px solid ${ink.line}`, color: ink.muted }}
                >
                  {copyLabel}
                </button>
              </div>

              <p className="text-[0.78125rem]" style={{ color: ink.subtle }}>
                {c.footer.byline}
              </p>
            </div>
          </article>
        </div>

        {/* ================= PREVIOUS IN THIS SERIES ================ */}
        <section className={cn(FRAME, "mt-[clamp(3.5rem,7vw,5.5rem)]")}>
          <div
            className="flex flex-wrap items-baseline justify-between gap-4 border-b pb-5"
            style={{ borderColor: ink.line }}
          >
            <h2
              className="font-reading text-[clamp(1.625rem,3vw,2.25rem)] leading-[1.15]"
              style={{ color: ink.black }}
            >
              {c.previous.heading}
            </h2>
            <Link
              href={c.previous.link.href}
              className="text-[0.8125rem] font-semibold transition-colors hover:text-[#68796B]"
              style={{ color: ink.muted }}
            >
              {c.previous.link.label}
            </Link>
          </div>

          <Link
            href={c.previous.article.href}
            className={cn(
              "group mt-8 flex flex-wrap items-center justify-between gap-6",
              "rounded-[18px] p-[clamp(1.25rem,3vw,2rem)]",
              "transition-shadow hover:shadow-[0_16px_40px_rgba(25,21,34,0.1)]",
            )}
            style={{
              background: "#FCFAF6",
              border: `1px solid ${ink.lineStrong}`,
            }}
          >
            <div className="min-w-0 flex-[1_1_22rem]">
              <span
                className="text-[0.65625rem] font-bold tracking-[0.14em] uppercase"
                style={{ color: accent.terracotta }}
              >
                {c.previous.article.category}
              </span>
              <p
                className="mt-3 font-reading text-[clamp(1.375rem,2.6vw,1.75rem)] leading-[1.24] text-pretty transition-colors group-hover:text-[#68796B]"
                style={{ color: ink.black }}
              >
                {c.previous.article.title}
              </p>
              <p
                className="mt-3 max-w-[54ch] text-[0.9375rem] leading-[1.6] text-pretty"
                style={{ color: ink.muted }}
              >
                {c.previous.article.description}
              </p>
            </div>

            <span
              className="inline-flex shrink-0 items-center gap-2 text-[0.8125rem] font-semibold"
              style={{ color: accent.olive }}
            >
              {c.previous.article.action}
              <ArrowRightIcon className="size-[17px] transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
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
                  {c.subscribe.heading}
                </h2>
                <p
                  className="mt-3 max-w-[46ch] text-[0.9375rem] leading-[1.6] text-pretty"
                  style={{ color: ink.muted }}
                >
                  {c.subscribe.description}
                </p>
              </div>

              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  setSubNotice(true);
                }}
                className="flex min-w-0 flex-[1_1_20rem] flex-wrap gap-3"
              >
                <label htmlFor="cc-sub-email" className="sr-only">
                  {c.subscribe.label}
                </label>
                <input
                  id="cc-sub-email"
                  type="email"
                  required
                  placeholder={c.subscribe.placeholder}
                  className={cn(
                    "min-w-0 flex-auto rounded-full bg-white px-5 py-3",
                    "text-[0.9375rem] text-[#2A2434] placeholder:text-[#8C8299]",
                    "focus-visible:outline-2 focus-visible:outline-offset-2",
                    "focus-visible:outline-[#68796B]",
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
                    "focus-visible:outline-[#68796B]",
                  )}
                  style={{ background: accent.olive }}
                >
                  {c.subscribe.submit}
                </button>
              </form>
            </div>

            {/* The export is explicit that nothing was sent, so the notice
                is kept rather than replaced with a success message. */}
            {subNotice && (
              <p
                role="status"
                className="mt-4 text-[0.8125rem]"
                style={{ color: ink.subtle }}
              >
                {c.subscribe.notice}
              </p>
            )}
          </div>
        </section>
      </main>
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
  "transition-colors hover:border-[#68796B] hover:text-[#68796B]",
  "focus-visible:outline-2 focus-visible:outline-offset-2",
  "focus-visible:outline-[#68796B]",
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
        "transition-colors hover:text-[#68796B]",
        "focus-visible:outline-2 focus-visible:outline-offset-2",
        "focus-visible:outline-[#68796B]",
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
        style={{ background: accent.olive }}
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

/**
 * An outbound citation. `rel="noopener"` is on every one, as the export has
 * it — a new tab must not get a handle back on this window.
 */
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
      style={{ color: accent.olive }}
    >
      {children}
    </a>
  );
}

/**
 * A paragraph whose `{0}` placeholder is replaced by its citation link, so
 * the link always travels with the sentence that earns it.
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
          ? "mb-3.5 text-[0.9375rem] leading-[1.7] text-pretty"
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
