"use client";

import Link from "next/link";
import { Fragment, useId, useState } from "react";

import { company } from "@/content/company";
import { cn } from "@/lib/utils";

/**
 * COMPANY CONTACT FORM
 * ---------------------------------------------------------------------------
 * The white card on the right of section 3.
 *
 * NOT the shared LeadForm. That one is a demo-booking form — two selects, a
 * consent checkbox, a footnote, no phone field. This asks for a phone number,
 * offers one "I'm interested in" select and closes on a privacy line, so it is
 * built for this section rather than bent out of a component whose shape it
 * does not share.
 *
 * VALIDATION IS OURS rather than the browser's — the form is `noValidate` — so
 * errors render as visible text tied to their field by `aria-describedby` and
 * mark the input `aria-invalid`, instead of a native bubble a screen reader
 * may not announce and that vanishes on the next keystroke. Input is never
 * cleared on error, and focus moves to the first field that needs fixing.
 *
 * IT DOES NOT SUBMIT ANYWHERE YET. That is the same site-wide TODO every other
 * form carries; the notice says so plainly rather than claiming a message was
 * sent. Wiring it is one change, in `onSubmit`.
 */

const { form } = company.contact;

export function ContactForm() {
  const ids = {
    name: useId(),
    email: useId(),
    organisation: useId(),
    phone: useId(),
    interest: useId(),
    message: useId(),
  };

  const [values, setValues] = useState({
    name: "",
    email: "",
    organisation: "",
    phone: "",
    interest: form.interest.options[0] as string,
    message: "",
  });

  type ErrorKey = "name" | "email" | "message";
  const [errors, setErrors] = useState<Partial<Record<ErrorKey, string>>>({});
  const [sent, setSent] = useState(false);

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

    const next: Partial<Record<ErrorKey, string>> = {};
    if (!values.name.trim()) next.name = form.errors.name;
    if (!values.email.trim()) next.email = form.errors.email;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      next.email = form.errors.emailFormat;
    }
    if (!values.message.trim()) next.message = form.errors.message;

    setErrors(next);

    if (Object.keys(next).length > 0) {
      setSent(false);
      // Land the keyboard on the problem rather than making someone hunt.
      const first = (["name", "email", "message"] as const).find(
        (key) => next[key],
      );
      if (first) document.getElementById(ids[first])?.focus();
      return;
    }

    /* DEVELOPER INTEGRATION POINT — see the note at the top of this file. */
    setSent(true);
  }

  const fieldClass = cn(
    "w-full rounded-lg border border-neutral-200 bg-[#f8f8fc]",
    "px-3.5 py-2.5 text-[0.9375rem] text-neutral-900",
    "placeholder:text-neutral-400",
    "transition-[border-color,box-shadow] duration-150",
    "focus-visible:border-[#59248b] focus-visible:outline-2",
    "focus-visible:outline-offset-2 focus-visible:outline-[#59248b]/40",
  );

  return (
    <div
      className={cn(
        "rounded-[1.75rem] bg-white",
        "p-6 sm:p-8 xl:p-10",
        "shadow-[0_30px_70px_-40px_rgb(60_20_110/0.35)]",
      )}
    >
      <h3 className="font-display text-[1.5rem] font-bold tracking-[-0.02em] text-neutral-900 sm:text-[1.75rem]">
        {form.heading}
      </h3>

      <form noValidate onSubmit={onSubmit} className="mt-7">
        {sent && (
          <p
            role="status"
            aria-live="polite"
            className={cn(
              "mb-6 rounded-lg px-4 py-3 text-[0.875rem] font-medium",
              "bg-[#f6f0fd] text-[#59248b] ring-1 ring-[#e3d5f7]",
            )}
          >
            {form.notice}
          </p>
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            id={ids.name}
            label={form.name.label}
            required
            error={errors.name}
          >
            <input
              id={ids.name}
              name={form.name.name}
              type="text"
              autoComplete={form.name.autoComplete}
              required
              aria-required="true"
              aria-invalid={errors.name ? "true" : undefined}
              aria-describedby={errors.name ? `${ids.name}-error` : undefined}
              value={values.name}
              onChange={(event) => set("name")(event.target.value)}
              className={cn(fieldClass, errors.name && "border-[#c0392b]")}
            />
          </Field>

          <Field
            id={ids.email}
            label={form.email.label}
            required
            error={errors.email}
          >
            <input
              id={ids.email}
              name={form.email.name}
              type="email"
              autoComplete={form.email.autoComplete}
              required
              aria-required="true"
              aria-invalid={errors.email ? "true" : undefined}
              aria-describedby={errors.email ? `${ids.email}-error` : undefined}
              value={values.email}
              onChange={(event) => set("email")(event.target.value)}
              className={cn(fieldClass, errors.email && "border-[#c0392b]")}
            />
          </Field>

          <Field id={ids.organisation} label={form.organisation.label}>
            <input
              id={ids.organisation}
              name={form.organisation.name}
              type="text"
              autoComplete={form.organisation.autoComplete}
              value={values.organisation}
              onChange={(event) => set("organisation")(event.target.value)}
              className={fieldClass}
            />
          </Field>

          <Field
            id={ids.phone}
            label={form.phone.label}
            optional={form.phone.optional}
          >
            <input
              id={ids.phone}
              name={form.phone.name}
              type="tel"
              autoComplete={form.phone.autoComplete}
              value={values.phone}
              onChange={(event) => set("phone")(event.target.value)}
              className={fieldClass}
            />
          </Field>
        </div>

        <div className="mt-5">
          <Field id={ids.interest} label={form.interest.label}>
            <div className="relative">
              <select
                id={ids.interest}
                name={form.interest.name}
                value={values.interest}
                onChange={(event) => set("interest")(event.target.value)}
                className={cn(
                  fieldClass,
                  "cursor-pointer appearance-none pr-10",
                  // The resting choice is a placeholder, not an answer, so
                  // it is greyed until something real is picked.
                  values.interest === form.interest.options[0] &&
                    "text-neutral-400",
                )}
              >
                {form.interest.options.map((option) => (
                  <option
                    key={option}
                    value={option}
                    className="text-neutral-900"
                  >
                    {option}
                  </option>
                ))}
              </select>
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-neutral-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>
          </Field>
        </div>

        <div className="mt-5">
          <Field
            id={ids.message}
            label={form.message.label}
            required
            error={errors.message}
          >
            <textarea
              id={ids.message}
              name={form.message.name}
              rows={5}
              required
              aria-required="true"
              aria-invalid={errors.message ? "true" : undefined}
              aria-describedby={
                errors.message ? `${ids.message}-error` : undefined
              }
              placeholder={form.message.placeholder}
              value={values.message}
              onChange={(event) => set("message")(event.target.value)}
              className={cn(
                fieldClass,
                "resize-y",
                errors.message && "border-[#c0392b]",
              )}
            />
          </Field>
        </div>

        <p className="mt-5 text-[0.8125rem] text-neutral-500">
          {form.privacy.text.split("{0}").map((part, index) => (
            <Fragment key={index}>
              {part}
              {index === 0 && (
                <Link
                  href={form.privacy.link.href}
                  className="font-medium text-[#59248b] underline underline-offset-2 hover:text-[#42196a]"
                >
                  {form.privacy.link.label}
                </Link>
              )}
            </Fragment>
          ))}
        </p>

        <button
          type="submit"
          className={cn(
            "group mt-6 flex w-full cursor-pointer items-center justify-center",
            "gap-2.5 rounded-lg bg-[#59248b] px-6 py-3.5",
            "text-[0.9375rem] font-semibold text-white",
            "transition-colors hover:bg-[#42196a]",
            "focus-visible:outline-2 focus-visible:outline-offset-2",
            "focus-visible:outline-[#59248b]",
          )}
        >
          {form.submit}
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </form>
    </div>
  );
}

/**
 * A label, its control, and the error text beneath. Collected here so every
 * field wires its label and error the same way rather than repeating it six
 * times.
 */
function Field({
  id,
  label,
  required,
  optional,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  optional?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="text-[0.8125rem] font-medium text-neutral-700"
      >
        {label}
        {required && (
          <span aria-hidden="true" className="ml-0.5 text-[#7805cf]">
            *
          </span>
        )}
        {optional && (
          <span className="ml-1 font-normal text-neutral-500">{optional}</span>
        )}
      </label>
      <div className="mt-2">{children}</div>
      {error && (
        <p
          id={`${id}-error`}
          className="mt-1.5 text-[0.8125rem] font-medium text-[#c0392b]"
        >
          {error}
        </p>
      )}
    </div>
  );
}
