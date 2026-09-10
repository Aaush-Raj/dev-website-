"use client";

import { Fragment, useCallback, useRef, useState } from "react";

import { Container } from "@/components/ui/Container";
import { pricing } from "@/content/pricing";
import { cn } from "@/lib/utils";

import { EngineCard } from "./EngineCard";
import { EnquiryForm } from "./EnquiryForm";
import {
  ArrowDownIcon,
  ChevronDownIcon,
  PulseGlyph,
  SparkGlyph,
} from "./PricingIcons";
import { SelectionBar } from "./SelectionBar";
import { useEngineSelection } from "./useEngineSelection";

/**
 * PRICING PAGE
 * ---------------------------------------------------------------------------
 * Rebuilt from the supplied `lurny-pricing` handoff package. Header and footer
 * come from the site layout, so the package's own nav and footer are dropped —
 * its nav links were all in-page anchors, which the section list below keeps.
 *
 * WHY THIS IS ONE COMPONENT rather than a stack of sections: the plan cards,
 * the twelve engine cards, the Fabric CTA, the enquiry form and the fixed
 * selection bar all read and write ONE selection. Splitting them would mean
 * lifting that state into a provider for no gain, since nothing outside this
 * page needs it.
 *
 * WHAT THE PACKAGE ASKS US NOT TO CLAIM is honoured throughout and noted where
 * it bites: no plan lists included engines, no usage allowance appears
 * anywhere, six engines carry no availability badge, and the enquiry form does
 * not pretend to submit. See the header of `src/content/pricing.ts`.
 */

const { hero, plans, catalogue, fabric, proposal, faq, enquiry } = pricing;

/** The diagram's engine glyphs alternate between these two. */
const diagramGlyphs = [PulseGlyph, SparkGlyph] as const;

/** Tint classes for the diagram's engine nodes, keyed by the content's tint. */
const diagramTints = {
  purple: "bg-[#F4EFFA] text-[#6B41A3] ring-[#E8DDF5]",
  amber: "bg-[#FFF8EC] text-[#9A6516] ring-[#FFE0A3]",
  rose: "bg-[#FDECEC] text-[#B3383C] ring-[#F7D3D4]",
  info: "bg-[#EAF2FB] text-[#2F6699] ring-[#CFE0F2]",
} as const;

export function PricingPage() {
  const selection = useEngineSelection();

  /** Which engine panels are open. Opening one never closes another. */
  const [open, setOpen] = useState<ReadonlySet<string>>(() => new Set());

  const [plan, setPlan] = useState<string>(enquiry.fields.plan.options[0]);
  const [learners, setLearners] = useState("");

  const nameRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const toggleOpen = useCallback((id: string) => {
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const expandAll = useCallback(() => {
    setOpen(
      new Set([...catalogue.engines.map((engine) => engine.id), "fabric"]),
    );
  }, []);

  const collapseAll = useCallback(() => setOpen(new Set()), []);

  /** Scroll to the form; `focusName` is used by the selection bar's CTA. */
  const goToForm = useCallback((focusName = false) => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    if (focusName) {
      // After the scroll starts, so focus does not fight it.
      window.setTimeout(() => nameRef.current?.focus(), 400);
    }
  }, []);

  /**
   * A plan CTA prefills the plan AND its learner band, then scrolls down.
   * The band stays freely editable afterwards — plan size does not lock or
   * imply which engines are included.
   */
  const choosePlan = useCallback(
    (name: string, band: string) => {
      setPlan(name);
      setLearners(band);
      goToForm();
    },
    [goToForm],
  );

  return (
    <div className="bg-white">
      <main id="top">
        {/* ========================== HERO ========================== */}
        <section className="bg-gradient-to-b from-[#F4EFFA] to-white pt-32 pb-16 lg:pt-40 lg:pb-20">
          <Container width="content">
            <p className="text-[0.6875rem] font-bold tracking-[0.14em] text-[#7F52BB] uppercase sm:text-xs">
              {hero.eyebrow}
            </p>
            <h1
              className={cn(
                "mt-5 max-w-[20ch] font-display font-bold",
                "text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.08]",
                "tracking-[-0.03em] text-balance text-neutral-900",
              )}
            >
              {hero.headline.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
            <p className="mt-6 max-w-[52ch] text-[1.0625rem] leading-relaxed text-pretty text-neutral-600">
              {hero.body}
            </p>
            <a
              href={hero.anchor.href}
              className={cn(
                "mt-8 inline-flex items-center gap-2 text-[0.9375rem]",
                "font-semibold text-[#7F52BB] transition-colors",
                "hover:text-[#563285]",
              )}
            >
              {hero.anchor.label}
              <ArrowDownIcon className="size-4" />
            </a>
          </Container>
        </section>

        {/* ========================= PLANS ========================== */}
        <section id="plans" aria-label="Plans" className="py-16 lg:py-20">
          <Container width="content">
            <div className="grid gap-6 lg:grid-cols-3">
              {plans.items.map((item) => (
                <article
                  key={item.name}
                  className={cn(
                    "flex flex-col rounded-2xl bg-white p-7",
                    "ring-1 ring-neutral-200",
                    "shadow-[0_16px_40px_-28px_rgb(43_25_66/0.35)]",
                  )}
                >
                  <h2 className="font-display text-[1.375rem] font-bold text-neutral-900">
                    {item.name}
                  </h2>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-neutral-600">
                    {item.support}
                  </p>

                  <dl className="mt-6 flex flex-col gap-3 border-t border-neutral-200 pt-6">
                    {item.facts.map((fact) => (
                      <div key={fact.term}>
                        <dt className="text-[0.6875rem] font-bold tracking-[0.1em] text-neutral-500 uppercase">
                          {fact.term}
                        </dt>
                        <dd className="mt-1 text-[0.9375rem] font-medium text-neutral-900">
                          {fact.value}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  {/* No figure is published anywhere in the source, so none
                      is invented here. */}
                  <p className="mt-6 flex-auto text-[0.9375rem] font-semibold text-neutral-900">
                    {item.price}
                  </p>

                  <button
                    type="button"
                    onClick={() => choosePlan(item.name, item.learnerBand)}
                    className={cn(
                      "mt-6 w-full cursor-pointer rounded-full bg-[#7F52BB]",
                      "px-5 py-3 text-[0.875rem] font-semibold text-white",
                      "transition-colors hover:bg-[#6B41A3]",
                      "focus-visible:outline-2 focus-visible:outline-offset-2",
                      "focus-visible:outline-[#7F52BB]",
                    )}
                  >
                    {item.action}
                  </button>
                </article>
              ))}
            </div>

            <p className="mt-8 text-center text-[0.875rem] text-neutral-600">
              {plans.note}
            </p>
            <p className="mt-2 text-center text-[0.875rem] text-neutral-600">
              {plans.creator.text.split("{0}").map((part, index) => (
                <Fragment key={index}>
                  {part}
                  {index === 0 && (
                    <button
                      type="button"
                      onClick={() => goToForm()}
                      className="cursor-pointer font-semibold text-[#7F52BB] underline underline-offset-2 hover:text-[#563285]"
                    >
                      {plans.creator.link.label}
                    </button>
                  )}
                </Fragment>
              ))}
            </p>
          </Container>
        </section>

        {/* ======================= CATALOGUE ======================== */}
        <section id="engines" className="bg-[#F8F8FC] py-16 lg:py-20">
          <Container width="content">
            <p className="text-[0.6875rem] font-bold tracking-[0.14em] text-[#7F52BB] uppercase sm:text-xs">
              {catalogue.eyebrow}
            </p>
            <h2
              className={cn(
                "mt-4 max-w-[24ch] font-display font-bold",
                "text-[clamp(1.75rem,3.6vw,2.5rem)] leading-[1.14]",
                "tracking-[-0.025em] text-balance text-neutral-900",
              )}
            >
              {catalogue.headline}
            </h2>
            <p className="mt-4 max-w-[56ch] text-[1rem] leading-relaxed text-pretty text-neutral-600">
              {catalogue.body}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <nav aria-label="Engine groups" className="flex flex-wrap gap-2">
                {catalogue.groupNav.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "rounded-full px-4 py-2 text-[0.8125rem] font-semibold",
                      "transition-colors",
                      "fabric" in link && link.fabric
                        ? "bg-[#2B1942] text-white hover:bg-[#402563]"
                        : "bg-white text-neutral-700 ring-1 ring-neutral-200 hover:text-[#7F52BB]",
                    )}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              <p className="flex items-center gap-2 text-[0.8125rem] font-semibold">
                <button
                  type="button"
                  onClick={expandAll}
                  className="cursor-pointer text-[#7F52BB] hover:text-[#563285]"
                >
                  {catalogue.expandAll}
                </button>
                <span aria-hidden="true" className="text-neutral-300">
                  ·
                </span>
                <button
                  type="button"
                  onClick={collapseAll}
                  className="cursor-pointer text-[#7F52BB] hover:text-[#563285]"
                >
                  {catalogue.collapseAll}
                </button>
              </p>
            </div>

            {catalogue.groups.map((group) => (
              <div key={group.id} id={group.id} className="mt-12 scroll-mt-28">
                <h3 className="font-display text-[0.75rem] font-bold tracking-[0.14em] text-neutral-500 uppercase">
                  {group.label}
                </h3>
                <div className="mt-4 flex flex-col gap-4">
                  {catalogue.engines
                    .filter((engine) => engine.group === group.id)
                    .map((engine) => (
                      <EngineCard
                        key={engine.id}
                        engine={engine}
                        selection={selection}
                        open={open.has(engine.id)}
                        onToggleOpen={() => toggleOpen(engine.id)}
                      />
                    ))}
                </div>
              </div>
            ))}
          </Container>
        </section>

        {/* ======================== FABRIC ========================== */}
        <section
          id="fabric"
          className="scroll-mt-28 bg-[#2B1942] py-16 text-white lg:py-20"
        >
          <Container width="content">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
              <div>
                <p className="text-[0.6875rem] font-bold tracking-[0.14em] text-[#FFC35E] uppercase sm:text-xs">
                  {fabric.eyebrow}
                </p>
                <h2
                  className={cn(
                    "mt-4 font-display font-bold",
                    "text-[clamp(1.75rem,3.4vw,2.375rem)] leading-[1.16]",
                    "tracking-[-0.025em] text-balance",
                  )}
                >
                  {fabric.headline}
                </h2>
                <p className="mt-4 max-w-[52ch] text-[1rem] leading-relaxed text-pretty text-white/70">
                  {fabric.body}
                </p>

                <ol className="mt-8 flex flex-col gap-5">
                  {fabric.steps.map((step, index) => (
                    <li key={step.title} className="flex gap-4">
                      <span
                        aria-hidden="true"
                        className={cn(
                          "grid size-7 shrink-0 place-items-center rounded-full",
                          "bg-white/10 text-[0.75rem] font-bold text-[#FFC35E]",
                        )}
                      >
                        {index + 1}
                      </span>
                      <div className="min-w-0">
                        <h3 className="font-display text-[1rem] font-semibold">
                          {step.title}
                        </h3>
                        <p className="mt-1 text-[0.9375rem] leading-relaxed text-white/65">
                          {step.text}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>

                <ul
                  aria-label="Fabric capability areas"
                  className="mt-8 flex flex-wrap gap-2"
                >
                  {fabric.pills.map((pill) => (
                    <li
                      key={pill}
                      className="rounded-full bg-white/10 px-3.5 py-1.5 text-[0.8125rem] font-medium text-white/85"
                    >
                      {pill}
                    </li>
                  ))}
                </ul>

                {/* Fabric's own card, on the dark ground. */}
                <div className="mt-9 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
                  <div className="flex items-start gap-4">
                    <span
                      aria-hidden="true"
                      className={cn(
                        "grid size-11 shrink-0 place-items-center rounded-xl",
                        "bg-[#FFC35E] font-display text-[0.8125rem] font-bold",
                        "tracking-[0.04em] text-[#2B1942]",
                      )}
                    >
                      {fabric.engine.mark}
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-display text-[1.0625rem] font-semibold">
                        {fabric.engine.name}
                      </h3>
                      <p className="mt-1 text-[0.8125rem] font-medium text-[#FFC35E]">
                        {fabric.engine.descriptor}
                      </p>
                      <p className="mt-2 text-[0.9375rem] leading-relaxed text-pretty text-white/70">
                        {fabric.engine.summary}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => selection.toggle("fabric")}
                      aria-pressed={selection.has("fabric")}
                      className={cn(
                        "cursor-pointer rounded-full px-4 py-2",
                        "text-[0.8125rem] font-semibold transition-colors",
                        "focus-visible:outline-2 focus-visible:outline-offset-2",
                        "focus-visible:outline-[#FFC35E]",
                        selection.has("fabric")
                          ? "bg-[#FFC35E] text-[#2B1942]"
                          : "bg-white/10 text-white hover:bg-white/20",
                      )}
                    >
                      {selection.has("fabric")
                        ? catalogue.addedLabel
                        : fabric.engine.addLabel}
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleOpen("fabric")}
                      aria-expanded={open.has("fabric")}
                      aria-controls="fabric-panel"
                      className={cn(
                        "inline-flex cursor-pointer items-center gap-1.5",
                        "rounded-full border border-white/25 px-4 py-2",
                        "text-[0.8125rem] font-semibold text-white/90",
                        "transition-colors hover:border-white/50",
                        "focus-visible:outline-2 focus-visible:outline-offset-2",
                        "focus-visible:outline-[#FFC35E]",
                      )}
                    >
                      {fabric.engine.toggleLabel}
                      <ChevronDownIcon
                        className={cn(
                          "size-4 transition-transform duration-200",
                          open.has("fabric") && "rotate-180",
                        )}
                      />
                    </button>
                  </div>

                  <div
                    id="fabric-panel"
                    hidden={!open.has("fabric")}
                    className="mt-5 border-t border-white/10 pt-5"
                  >
                    <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                      {fabric.engine.features.map((feature) => (
                        <li key={feature.name}>
                          <p className="text-[0.875rem] font-semibold">
                            {feature.name}
                          </p>
                          <p className="mt-0.5 text-[0.8125rem] leading-relaxed text-white/65">
                            {feature.description}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Adds only Fabric, never every connected engine. */}
                <button
                  type="button"
                  onClick={() => {
                    selection.add("fabric");
                    goToForm();
                  }}
                  className={cn(
                    "mt-7 cursor-pointer rounded-full bg-[#FFC35E] px-6 py-3",
                    "text-[0.9375rem] font-semibold text-[#2B1942]",
                    "transition-colors hover:bg-[#F0A833]",
                    "focus-visible:outline-2 focus-visible:outline-offset-2",
                    "focus-visible:outline-[#FFC35E]",
                  )}
                >
                  {fabric.action}
                </button>
              </div>

              {/* The diagram. Decorative: every engine and system it names is
                  already written out in the catalogue and the copy beside it. */}
              <div aria-hidden="true" className="lg:pt-10">
                <p className="text-[0.6875rem] font-bold tracking-[0.12em] text-white/45 uppercase">
                  {fabric.diagram.caption}
                </p>

                <div className="mt-4 rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
                  <p className="text-[0.625rem] font-bold tracking-[0.12em] text-white/40 uppercase">
                    {fabric.diagram.engineTier}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {fabric.diagram.engines.map((node, index) => {
                      const Glyph = diagramGlyphs[index % 2];

                      return (
                        <span
                          key={node.name}
                          className={cn(
                            "inline-flex items-center gap-1.5 rounded-lg",
                            "px-2.5 py-1.5 text-[0.75rem] font-semibold ring-1",
                            diagramTints[node.tint],
                          )}
                        >
                          <Glyph className="size-3.5" />
                          {node.name}
                        </span>
                      );
                    })}
                  </div>

                  <div className="my-5 flex items-center gap-2">
                    <span className="h-px flex-auto bg-white/15" />
                    <span className="rounded-full bg-[#FFC35E]/20 px-3 py-1 text-[0.6875rem] font-bold tracking-[0.1em] text-[#FFC35E] uppercase">
                      {fabric.engine.name}
                    </span>
                    <span className="h-px flex-auto bg-white/15" />
                  </div>

                  <p className="text-[0.625rem] font-bold tracking-[0.12em] text-white/40 uppercase">
                    {fabric.diagram.systemTier}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {fabric.diagram.systems.map((system) => (
                      <span
                        key={system}
                        className={cn(
                          "rounded-lg border border-dashed border-white/25",
                          "px-2.5 py-1.5 text-[0.75rem] font-medium text-white/70",
                        )}
                      >
                        {system}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* ======================= PROPOSAL ========================= */}
        <section id="proposal" className="scroll-mt-28 py-16 lg:py-20">
          <Container width="content">
            <h2
              className={cn(
                "max-w-[24ch] font-display font-bold",
                "text-[clamp(1.75rem,3.6vw,2.5rem)] leading-[1.14]",
                "tracking-[-0.025em] text-balance text-neutral-900",
              )}
            >
              {proposal.headline}
            </h2>

            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {proposal.items.map((item) => (
                <li
                  key={item.title}
                  className="border-t-2 border-[#7F52BB] pt-5"
                >
                  <h3 className="font-display text-[1rem] font-semibold text-neutral-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-pretty text-neutral-600">
                    {item.text}
                  </p>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        {/* ========================== FAQ =========================== */}
        <section id="faq" className="scroll-mt-28 bg-[#F8F8FC] py-16 lg:py-20">
          <Container width="content">
            <h2
              className={cn(
                "font-display font-bold",
                "text-[clamp(1.75rem,3.6vw,2.5rem)] leading-[1.14]",
                "tracking-[-0.025em] text-neutral-900",
              )}
            >
              {faq.headline}
            </h2>

            {/* Native details/summary — keyboard-operable and announced
                without a line of script, as the package has it. */}
            <div className="mt-8 max-w-[64rem]">
              {faq.items.map((item) => (
                <details
                  key={item.question}
                  className="group border-b border-neutral-200"
                >
                  <summary
                    className={cn(
                      "flex cursor-pointer items-center justify-between gap-4",
                      "py-5 text-[1rem] font-semibold text-neutral-900",
                      "marker:content-none",
                      "focus-visible:outline-2 focus-visible:outline-offset-2",
                      "focus-visible:outline-[#7F52BB]",
                    )}
                  >
                    {item.question}
                    <ChevronDownIcon
                      className={cn(
                        "size-4 shrink-0 text-neutral-500",
                        "transition-transform duration-200",
                        "group-open:rotate-180",
                      )}
                    />
                  </summary>
                  <p className="pb-5 text-[0.9375rem] leading-relaxed text-pretty text-neutral-600">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </Container>
        </section>

        {/* ======================== ENQUIRY ========================= */}
        <section
          id="enquiry"
          ref={formRef}
          className="scroll-mt-24 py-16 lg:py-20"
          // Clears the fixed selection bar so the submit button is never
          // hidden behind it on a short viewport.
          style={{ paddingBottom: selection.count > 0 ? "8rem" : undefined }}
        >
          <Container width="narrow">
            <p className="text-[0.6875rem] font-bold tracking-[0.14em] text-[#7F52BB] uppercase sm:text-xs">
              {enquiry.eyebrow}
            </p>
            <h2
              className={cn(
                "mt-4 font-display font-bold",
                "text-[clamp(1.75rem,3.6vw,2.5rem)] leading-[1.14]",
                "tracking-[-0.025em] text-neutral-900",
              )}
            >
              {enquiry.headline}
            </h2>
            <p className="mt-4 text-[1rem] leading-relaxed text-pretty text-neutral-600">
              {enquiry.body}
            </p>

            <EnquiryForm
              selection={selection}
              plan={plan}
              onPlanChange={setPlan}
              learners={learners}
              onLearnersChange={setLearners}
              nameRef={nameRef}
            />
          </Container>
        </section>
      </main>

      <SelectionBar selection={selection} onContinue={() => goToForm(true)} />
    </div>
  );
}
