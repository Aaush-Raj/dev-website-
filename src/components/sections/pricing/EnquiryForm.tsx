"use client";

import { Fragment, useId, useState } from "react";
import Link from "next/link";

import { pricing } from "@/content/pricing";
import { cn } from "@/lib/utils";

import type { EngineSelection } from "./useEngineSelection";

/**
 * PRICING — ENQUIRY FORM
 * ---------------------------------------------------------------------------
 * NOT the site's shared LeadForm. This one carries twelve engine checkboxes
 * bound to the page's selection state — ticking one here relabels its card
 * button and updates the selection bar, and vice versa — which that component
 * has no concept of. Everything else (validation, focus, error wiring) follows
 * the same rules it does.
 *
 * IT DOES NOT SUBMIT ANYWHERE. The handoff package ran in explicit demo mode,
 * logging a payload and stating plainly that nothing was sent, and this
 * rebuild keeps that honesty rather than showing a success message it has not
 * earned. Wiring it up is one change, in `onSubmit` below.
 *
 * VALIDATION is ours rather than the browser's — the form is `noValidate` — so
 * that errors render as visible text tied to their field by `aria-describedby`
 * and mark the input `aria-invalid`, instead of a native bubble that a screen
 * reader may not announce and that vanishes on the next keystroke. Input is
 * never cleared on error.
 */

const { enquiry } = pricing;

interface EnquiryFormProps {
  selection: EngineSelection;
  /** Set by a plan card's CTA before scrolling here. */
  plan: string;
  onPlanChange: (plan: string) => void;
  learners: string;
  onLearnersChange: (learners: string) => void;
  /** The Name field, focused when the selection bar's CTA scrolls here. */
  nameRef: React.RefObject<HTMLInputElement | null>;
}

type Errors = Partial<Record<"name" | "email" | "organisation", string>>;

export function EnquiryForm({
  selection,
  plan,
  onPlanChange,
  learners,
  onLearnersChange,
  nameRef,
}: EnquiryFormProps) {
  const ids = {
    name: useId(),
    email: useId(),
    organisation: useId(),
    plan: useId(),
    learners: useId(),
    message: useId(),
    status: useId(),
  };

  const [values, setValues] = useState({
    name: "",
    email: "",
    organisation: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const set = (key: keyof typeof values) => (value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
    // Clear a field's error as soon as it is being corrected, rather than
    // making the reader submit again to find out.
    setErrors((current) =>
      key in current ? { ...current, [key]: undefined } : current,
    );
  };

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const next: Errors = {};
    if (!values.name.trim()) next.name = enquiry.errors.name;
    if (!values.email.trim()) next.email = enquiry.errors.email;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      next.email = enquiry.errors.emailFormat;
    }
    if (!values.organisation.trim()) {
      next.organisation = enquiry.errors.organisation;
    }

    setErrors(next);

    if (Object.keys(next).length > 0) {
      setSubmitted(false);
      // Move focus to the first field in error so a keyboard user lands on
      // the problem rather than hunting for it.
      const first = (["name", "email", "organisation"] as const).find(
        (key) => next[key],
      );
      if (first) document.getElementById(ids[first])?.focus();
      return;
    }

    /*
     * DEVELOPER INTEGRATION POINT.
     *
     * The payload below matches the shape the handoff package documents.
     * Replace the notice with a real request — POST it, and only show a
     * success message once the response confirms one. Until then this says
     * plainly that nothing was sent.
     */
    setSubmitted(true);
  }

  const field = cn(
    "w-full rounded-xl border border-neutral-300 bg-white px-4 py-3",
    "text-[0.9375rem] text-neutral-900 placeholder:text-neutral-400",
    "focus-visible:outline-2 focus-visible:outline-offset-2",
    "focus-visible:outline-[#7F52BB]",
  );
  const labelClass = "text-[0.875rem] font-semibold text-neutral-800";

  return (
    <form noValidate onSubmit={onSubmit} className="mt-8">
      {submitted && (
        <p
          id={ids.status}
          role="status"
          aria-live="polite"
          className={cn(
            "mb-6 rounded-xl px-4 py-3 text-[0.875rem] font-medium",
            "bg-[#FFF8EC] text-[#9A6516] ring-1 ring-[#FFE0A3]",
          )}
        >
          {enquiry.demoNotice}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={ids.name} className={labelClass}>
            {enquiry.fields.name.label}
            <span aria-hidden="true" className="text-[#E5484D]">
              *
            </span>
          </label>
          <input
            ref={nameRef}
            id={ids.name}
            name={enquiry.fields.name.name}
            type="text"
            autoComplete={enquiry.fields.name.autoComplete}
            required
            aria-required="true"
            aria-invalid={errors.name ? "true" : undefined}
            aria-describedby={errors.name ? `${ids.name}-error` : undefined}
            value={values.name}
            onChange={(event) => set("name")(event.target.value)}
            className={cn(field, "mt-2", errors.name && "border-[#E5484D]")}
          />
          <FieldError id={`${ids.name}-error`}>{errors.name}</FieldError>
        </div>

        <div>
          <label htmlFor={ids.email} className={labelClass}>
            {enquiry.fields.email.label}
            <span aria-hidden="true" className="text-[#E5484D]">
              *
            </span>
          </label>
          <input
            id={ids.email}
            name={enquiry.fields.email.name}
            type="email"
            autoComplete={enquiry.fields.email.autoComplete}
            required
            aria-required="true"
            aria-invalid={errors.email ? "true" : undefined}
            aria-describedby={errors.email ? `${ids.email}-error` : undefined}
            value={values.email}
            onChange={(event) => set("email")(event.target.value)}
            className={cn(field, "mt-2", errors.email && "border-[#E5484D]")}
          />
          <FieldError id={`${ids.email}-error`}>{errors.email}</FieldError>
        </div>

        <div>
          <label htmlFor={ids.organisation} className={labelClass}>
            {enquiry.fields.organisation.label}
            <span aria-hidden="true" className="text-[#E5484D]">
              *
            </span>
          </label>
          <input
            id={ids.organisation}
            name={enquiry.fields.organisation.name}
            type="text"
            autoComplete={enquiry.fields.organisation.autoComplete}
            required
            aria-required="true"
            aria-invalid={errors.organisation ? "true" : undefined}
            aria-describedby={
              errors.organisation ? `${ids.organisation}-error` : undefined
            }
            value={values.organisation}
            onChange={(event) => set("organisation")(event.target.value)}
            className={cn(
              field,
              "mt-2",
              errors.organisation && "border-[#E5484D]",
            )}
          />
          <FieldError id={`${ids.organisation}-error`}>
            {errors.organisation}
          </FieldError>
        </div>

        <div>
          <label htmlFor={ids.plan} className={labelClass}>
            {enquiry.fields.plan.label}
          </label>
          <select
            id={ids.plan}
            name={enquiry.fields.plan.name}
            value={plan}
            onChange={(event) => onPlanChange(event.target.value)}
            className={cn(field, "mt-2")}
          >
            {enquiry.fields.plan.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={ids.learners} className={labelClass}>
            {enquiry.fields.learners.label}{" "}
            <span className="font-normal text-neutral-500">
              {enquiry.fields.learners.optional}
            </span>
          </label>
          {/* A plan CTA prefills this, but it stays freely editable — plan
              size implies nothing about entitlement. */}
          <select
            id={ids.learners}
            name={enquiry.fields.learners.name}
            value={learners}
            onChange={(event) => onLearnersChange(event.target.value)}
            className={cn(field, "mt-2")}
          >
            {enquiry.fields.learners.options.map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ----------------------- Engine checkboxes ----------------------- */}
      <fieldset className="mt-7">
        <legend className={labelClass}>
          {enquiry.fields.engines.legend}{" "}
          <span className="font-normal text-neutral-500">
            {enquiry.fields.engines.optional}
          </span>
        </legend>

        <div className="mt-3 grid gap-x-6 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {selection.all.map((engine) => (
            <label
              key={engine.id}
              className="flex cursor-pointer items-center gap-2.5 text-[0.875rem] text-neutral-700"
            >
              <input
                type="checkbox"
                name="engines"
                value={engine.id}
                checked={selection.has(engine.id)}
                onChange={() => selection.toggle(engine.id)}
                className={cn(
                  "size-4 cursor-pointer rounded accent-[#7F52BB]",
                  "focus-visible:outline-2 focus-visible:outline-offset-2",
                  "focus-visible:outline-[#7F52BB]",
                )}
              />
              {engine.name}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-6">
        <label htmlFor={ids.message} className={labelClass}>
          {enquiry.fields.message.label}{" "}
          <span className="font-normal text-neutral-500">
            {enquiry.fields.message.optional}
          </span>
        </label>
        <textarea
          id={ids.message}
          name={enquiry.fields.message.name}
          rows={4}
          value={values.message}
          onChange={(event) => set("message")(event.target.value)}
          className={cn(field, "mt-2 resize-y")}
        />
      </div>

      <p className="mt-5 text-[0.8125rem] text-neutral-500">
        {enquiry.helper.text.split("{0}").map((part, index) => (
          <Fragment key={index}>
            {part}
            {index === 0 && (
              <Link
                href={enquiry.helper.link.href}
                className="font-medium text-[#7F52BB] underline underline-offset-2 hover:text-[#563285]"
              >
                {enquiry.helper.link.label}
              </Link>
            )}
          </Fragment>
        ))}
      </p>

      <button
        type="submit"
        className={cn(
          "mt-6 cursor-pointer rounded-full bg-[#7F52BB] px-7 py-3.5",
          "text-[0.9375rem] font-semibold text-white",
          "transition-colors hover:bg-[#6B41A3]",
          "focus-visible:outline-2 focus-visible:outline-offset-2",
          "focus-visible:outline-[#7F52BB]",
        )}
      >
        {enquiry.submit}
      </button>
    </form>
  );
}

/** A field's error text. Rendered only when there is one to show. */
function FieldError({ id, children }: { id: string; children?: string }) {
  if (!children) return null;

  return (
    <p id={id} className="mt-1.5 text-[0.8125rem] font-medium text-[#E5484D]">
      {children}
    </p>
  );
}
