"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useId, useState } from "react";

import { ArrowRightIcon } from "@/components/sections/hero/DashboardIcons";
import { cn } from "@/lib/utils";

/**
 * LEAD FORM
 * ---------------------------------------------------------------------------
 * The shared demo-request form, used by the homepage and by each product page.
 * Every instance has the same five fields, the same validation and the same
 * success state; only the copy, the two select vocabularies and the button
 * tone differ, so those are props and everything else lives here.
 *
 * Callers pass a `LeadFormContent` object — see the type below. Keeping the
 * copy in each page's own content file means a product page can speak in its
 * own terms ("What would you like to explore?") without forking the markup.
 *
 * SUBMIT IS NOT WIRED UP.
 * `handleSubmit` validates and then shows the success state without sending
 * anything anywhere — see the TODO on it. Nothing is transmitted and no
 * endpoint is contacted. The destination (CRM, mailer, server action) is not
 * yet chosen, and a form that silently drops real leads would be worse than
 * one that visibly does nothing. Wiring it here fixes every page at once.
 *
 * VALIDATION
 * Native `required` is deliberately NOT used. Browser bubble validation cannot
 * be styled, appears in the wrong place against these layouts, and disappears
 * on the next interaction. Instead the form is `noValidate` and validates in a
 * single pass on submit, then re-validates a field as it is corrected — errors
 * appear only after a submit attempt, never while someone is still typing.
 *
 * ACCESSIBILITY
 * Every control has a real <label> tied by id. Invalid fields carry
 * aria-invalid and point at their message with aria-describedby, and the
 * message sits in a role="alert" region so it is announced. The required
 * asterisk is decorative and aria-hidden — `required` on the input conveys the
 * same thing to assistive technology.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

/* ========================================================================== */
/* Content contract                                                           */
/* ========================================================================== */

interface TextFieldContent {
  name: string;
  label: string;
  placeholder: string;
  autoComplete?: string;
}

interface SelectFieldContent {
  name: string;
  label: string;
  /** First entry is the resting value. */
  options: readonly string[];
  /**
   * Marks the field required AND validates it — the two go together on
   * purpose. The resting option ("Select your industry") is a real value the
   * form would otherwise accept, so an asterisk without the check would
   * promise a validation that never happens.
   *
   * When set, leaving the select on its resting option is an error.
   */
  required?: boolean;
  /** Shown when a required select is left on its resting option. */
  error?: string;
}

export interface LeadFormContent {
  name: TextFieldContent;
  email: TextFieldContent;
  /**
   * OPTIONAL second text field, sitting between the email and the selects.
   *
   * Added for the Industries page, whose design asks for an organisation
   * field. Optional so the four pages that already ship this form are
   * unaffected — omit it and the layout is exactly as before.
   */
  organisation?: TextFieldContent;
  /** The two selects, left then right. */
  selectA: SelectFieldContent;
  selectB: SelectFieldContent;
  /**
   * OPTIONAL third select, following the other two.
   *
   * Same reasoning as `organisation`: the Industries design needs six fields
   * in a 2x3 grid where the rest of the site needs four.
   */
  selectC?: SelectFieldContent;
  /** Free-text field spanning both columns. */
  detail: TextFieldContent;
  consent: { name: string; label: string };
  submit: string;
  success: { title: string; description: string };
  errors: {
    name: string;
    email: string;
    emailFormat: string;
    /** Required only when `organisation` is supplied. */
    organisation?: string;
  };
  /**
   * The line under the button. `links` are spliced into `text` wherever it
   * contains {0}, {1} … so a caller can have one link or several without the
   * component knowing the sentence.
   */
  footnote: {
    text: string;
    // readonly: the content files are `as const`, so their arrays are frozen.
    links: readonly { readonly label: string; readonly href: string }[];
  };
}

/**
 * Button tone. The homepage uses violet; product pages use one of the two
 * ambers — see the note on `gold` below for why there are two.
 */
export type LeadFormTone = "brand" | "accent" | "gold";

const toneStyles = {
  brand: cn(
    "bg-brand-600 text-white hover:bg-brand-700",
    "hover:shadow-[0_14px_30px_-12px_rgb(91_50_183/0.65)]",
    "focus-visible:ring-brand-500/50",
  ),
  accent: cn(
    "bg-accent-500 text-neutral-900 hover:bg-accent-600",
    "hover:shadow-[0_14px_30px_-12px_rgb(252_154_22/0.6)]",
    "focus-visible:ring-accent-500/50",
  ),
  /**
   * The softer golden amber the LurnyMagic design uses — sampled from it at
   * roughly #e3ab54, which sits on `accent-400` rather than the vivid
   * `accent-500` orange above.
   *
   * A separate tone rather than a change to `accent`: LurnyPitch already
   * ships that button, and its design does call for the stronger orange.
   */
  gold: cn(
    "bg-accent-400 text-neutral-900 hover:bg-accent-500",
    "hover:shadow-[0_14px_30px_-12px_rgb(254_180_66/0.6)]",
    "focus-visible:ring-accent-400/50",
  ),
} as const;

/* ========================================================================== */
/* Field parts                                                                */
/* ========================================================================== */

/** Shared styling for the text inputs and the selects. */
const fieldStyles = cn(
  "w-full rounded-md border bg-white px-3.5 text-[0.9375rem] text-neutral-900",
  "placeholder:text-neutral-400",
  "duration-fast transition-[border-color,box-shadow] ease-out",
  "focus:outline-none focus-visible:border-brand-500",
  "focus-visible:ring-2 focus-visible:ring-brand-500/25",
);

function FieldLabel({
  htmlFor,
  children,
  required = false,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "block text-[0.6875rem] font-bold uppercase",
        "tracking-[0.08em] text-neutral-800",
      )}
    >
      {children}
      {required && (
        // Decorative: `required` on the control is what assistive technology
        // reads. Repeating it here would announce "asterisk" needlessly.
        <span aria-hidden="true" className="ml-1 text-brand-600">
          *
        </span>
      )}
    </label>
  );
}

function FieldError({ id, children }: { id: string; children?: string }) {
  if (!children) return null;
  return (
    <p
      id={id}
      role="alert"
      className="mt-1.5 text-[0.8125rem] text-status-danger"
    >
      {children}
    </p>
  );
}

/**
 * A native <select> with the platform arrow suppressed and our own drawn over
 * it, so the selects match the text inputs rather than rendering as whatever
 * the OS provides.
 *
 * Deliberately native rather than a custom listbox: a real <select> gets
 * keyboard behaviour, type-ahead and the platform's mobile picker for free —
 * all of which a div-based replacement has to reimplement, usually worse.
 */
function SelectField({
  id,
  name,
  value,
  options,
  onChange,
}: {
  id: string;
  name: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="relative mt-2">
      <select
        id={id}
        name={name}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={cn(
          fieldStyles,
          "h-11 cursor-pointer appearance-none border-neutral-300 pr-10",
        )}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      {/* Chevron. pointer-events-none so clicks fall through to the select. */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-y-0 right-3 flex items-center",
          "text-neutral-500",
        )}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-4"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </span>
    </div>
  );
}

/**
 * Splices links into the footnote sentence at {0}, {1} … so the caller owns
 * the wording and this component owns none of it.
 */
function Footnote({ content }: { content: LeadFormContent["footnote"] }) {
  const parts = content.text.split(/(\{\d+\})/g);

  return (
    <p className="mt-4 text-[0.8125rem] leading-relaxed text-pretty text-neutral-600">
      {parts.map((part, index) => {
        const match = part.match(/^\{(\d+)\}$/);
        if (!match) return <span key={index}>{part}</span>;

        const link = content.links[Number(match[1])];
        if (!link) return null;

        return (
          <Link
            key={index}
            href={link.href}
            className={cn(
              "duration-fast font-semibold text-brand-700 underline-offset-2",
              "transition-colors hover:text-brand-600 hover:underline",
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </p>
  );
}

/* ========================================================================== */
/* Form                                                                       */
/* ========================================================================== */

interface Errors {
  fullName?: string;
  workEmail?: string;
  organisation?: string;
  selectA?: string;
  selectB?: string;
  selectC?: string;
}

export function LeadForm({
  content,
  tone = "brand",
  className,
}: {
  content: LeadFormContent;
  tone?: LeadFormTone;
  className?: string;
}) {
  const reduce = useReducedMotion();

  /**
   * useId keeps label/input associations unique when more than one form is
   * rendered on a page — hardcoded ids would silently collide and point every
   * label at the first instance.
   */
  const uid = useId();
  const fieldId = (name: string) => `${uid}-${name}`;
  const errorId = (name: string) => `${uid}-${name}-error`;

  const [values, setValues] = useState({
    fullName: "",
    workEmail: "",
    organisation: "",
    detail: "",
    selectA: content.selectA.options[0] as string,
    selectB: content.selectB.options[0] as string,
    selectC: (content.selectC?.options[0] ?? "") as string,
    consent: false,
  });

  const [errors, setErrors] = useState<Errors>({});
  /** Only true once submit has been attempted; gates live re-validation. */
  const [submitted, setSubmitted] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  /**
   * Deliberately permissive: something, an @, something, a dot, something.
   * Stricter patterns reject valid addresses far more often than they catch
   * typos, and the real check is whether the address receives mail.
   */
  const validate = (next: typeof values): Errors => {
    const found: Errors = {};
    if (!next.fullName.trim()) found.fullName = content.errors.name;
    if (!next.workEmail.trim()) found.workEmail = content.errors.email;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(next.workEmail.trim()))
      found.workEmail = content.errors.emailFormat;
    // Only enforced when the caller asks for the field at all.
    if (content.organisation && !next.organisation.trim())
      found.organisation = content.errors.organisation ?? "";

    // A required select is invalid while it still sits on its resting
    // option, which is the first entry in its own list.
    for (const key of ["selectA", "selectB", "selectC"] as const) {
      const field = content[key];
      if (field?.required && next[key] === field.options[0])
        found[key] = field.error ?? "";
    }

    return found;
  };

  const update = (name: keyof typeof values, value: string | boolean) => {
    const next = { ...values, [name]: value };
    setValues(next);
    // Re-validate only after a failed submit, so errors never appear while
    // someone is still filling the field in for the first time.
    if (submitted) setErrors(validate(next));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);

    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      // Move focus to the first invalid control, so keyboard and screen-reader
      // users are taken to the problem rather than left at the submit button.
      const firstInvalid = Object.keys(found)[0];
      document.getElementById(fieldId(firstInvalid))?.focus();
      return;
    }

    /*
     * TODO(forms): send `values` somewhere.
     *
     * NOTHING IS SENT TODAY — the success state below is shown on validation
     * alone. Before launch this must POST to a real destination and only show
     * success on a 2xx, with an error path for failures. Until then no form on
     * the site collects leads.
     */
    setSucceeded(true);
  };

  /* ---------------------------------------------------------------- done -- */

  if (succeeded) {
    return (
      <motion.div
        className={cn(
          "flex min-h-96 flex-col items-center justify-center",
          "rounded-xl bg-neutral-50 p-8 text-center",
          className,
        )}
        initial={{ opacity: reduce ? 1 : 0, scale: reduce ? 1 : 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: reduce ? 0 : 0.45, ease: easeOut }}
        // The form is replaced, so announce what took its place.
        role="status"
      >
        <span
          aria-hidden="true"
          className={cn(
            "flex size-12 items-center justify-center rounded-full",
            "bg-brand-50 text-brand-600",
          )}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-6"
          >
            <path d="m5 12.5 4.5 4.5L19 7.5" />
          </svg>
        </span>

        <p className="mt-5 text-lg font-semibold text-neutral-900">
          {content.success.title}
        </p>
        <p className="mt-2 max-w-96 text-[0.9375rem] leading-relaxed text-pretty text-neutral-600">
          {content.success.description}
        </p>
      </motion.div>
    );
  }

  /* ---------------------------------------------------------------- form -- */

  return (
    <form
      // Validation is handled above rather than by the browser; see the note
      // at the top of this file.
      noValidate
      onSubmit={handleSubmit}
      className={cn("rounded-xl bg-neutral-50 p-5 sm:p-6", className)}
    >
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-5">
        {/* -------------------------- Full name --------------------- */}
        <div>
          <FieldLabel htmlFor={fieldId("fullName")} required>
            {content.name.label}
          </FieldLabel>
          <input
            id={fieldId("fullName")}
            name={content.name.name}
            type="text"
            required
            autoComplete={content.name.autoComplete}
            placeholder={content.name.placeholder}
            value={values.fullName}
            onChange={(event) => update("fullName", event.target.value)}
            aria-invalid={errors.fullName ? true : undefined}
            aria-describedby={errors.fullName ? errorId("fullName") : undefined}
            className={cn(
              fieldStyles,
              "mt-2 h-11",
              errors.fullName ? "border-status-danger" : "border-neutral-300",
            )}
          />
          <FieldError id={errorId("fullName")}>{errors.fullName}</FieldError>
        </div>

        {/* ------------------------- Work email --------------------- */}
        <div>
          <FieldLabel htmlFor={fieldId("workEmail")} required>
            {content.email.label}
          </FieldLabel>
          <input
            id={fieldId("workEmail")}
            name={content.email.name}
            type="email"
            required
            autoComplete={content.email.autoComplete}
            placeholder={content.email.placeholder}
            value={values.workEmail}
            onChange={(event) => update("workEmail", event.target.value)}
            aria-invalid={errors.workEmail ? true : undefined}
            aria-describedby={
              errors.workEmail ? errorId("workEmail") : undefined
            }
            className={cn(
              fieldStyles,
              "mt-2 h-11",
              errors.workEmail ? "border-status-danger" : "border-neutral-300",
            )}
          />
          <FieldError id={errorId("workEmail")}>{errors.workEmail}</FieldError>
        </div>

        {/* ------------------------ Organisation -------------------- */}
        {/* Rendered only when the caller asks for it; see the note on the
            field in LeadFormContent. */}
        {content.organisation && (
          <div>
            <FieldLabel htmlFor={fieldId("organisation")} required>
              {content.organisation.label}
            </FieldLabel>
            <input
              id={fieldId("organisation")}
              name={content.organisation.name}
              type="text"
              required
              autoComplete={content.organisation.autoComplete}
              placeholder={content.organisation.placeholder}
              value={values.organisation}
              onChange={(event) => update("organisation", event.target.value)}
              aria-invalid={errors.organisation ? true : undefined}
              aria-describedby={
                errors.organisation ? errorId("organisation") : undefined
              }
              className={cn(
                fieldStyles,
                "mt-2 h-11",
                errors.organisation
                  ? "border-status-danger"
                  : "border-neutral-300",
              )}
            />
            <FieldError id={errorId("organisation")}>
              {errors.organisation}
            </FieldError>
          </div>
        )}

        {/* --------------------------- Select A --------------------- */}
        <div>
          <FieldLabel
            htmlFor={fieldId("selectA")}
            required={content.selectA?.required}
          >
            {content.selectA.label}
          </FieldLabel>
          <SelectField
            id={fieldId("selectA")}
            name={content.selectA.name}
            value={values.selectA}
            options={content.selectA.options}
            onChange={(value) => update("selectA", value)}
          />
          <FieldError id={errorId("selectA")}>{errors.selectA}</FieldError>
        </div>

        {/* --------------------------- Select B --------------------- */}
        <div>
          <FieldLabel
            htmlFor={fieldId("selectB")}
            required={content.selectB?.required}
          >
            {content.selectB.label}
          </FieldLabel>
          <SelectField
            id={fieldId("selectB")}
            name={content.selectB.name}
            value={values.selectB}
            options={content.selectB.options}
            onChange={(value) => update("selectB", value)}
          />
          <FieldError id={errorId("selectB")}>{errors.selectB}</FieldError>
        </div>

        {/* --------------------------- Select C --------------------- */}
        {content.selectC && (
          <div>
            <FieldLabel
              htmlFor={fieldId("selectC")}
              required={content.selectC?.required}
            >
              {content.selectC.label}
            </FieldLabel>
            <SelectField
              id={fieldId("selectC")}
              name={content.selectC.name}
              value={values.selectC}
              options={content.selectC.options}
              onChange={(value) => update("selectC", value)}
            />
            <FieldError id={errorId("selectC")}>{errors.selectC}</FieldError>
          </div>
        )}

        {/* ---------------------------- Detail ---------------------- */}
        <div className="sm:col-span-2">
          <FieldLabel htmlFor={fieldId("detail")}>
            {content.detail.label}
          </FieldLabel>
          <input
            id={fieldId("detail")}
            name={content.detail.name}
            type="text"
            autoComplete={content.detail.autoComplete}
            placeholder={content.detail.placeholder}
            value={values.detail}
            onChange={(event) => update("detail", event.target.value)}
            className={cn(fieldStyles, "mt-2 h-11 border-neutral-300")}
          />
        </div>
      </div>

      {/* ---------------------------- Consent ----------------------- */}
      <div className="mt-5 flex gap-3">
        <input
          id={fieldId("consent")}
          name={content.consent.name}
          type="checkbox"
          checked={values.consent}
          onChange={(event) => update("consent", event.target.checked)}
          className={cn(
            "mt-0.5 size-4 shrink-0 cursor-pointer rounded-xs",
            "border border-neutral-400 accent-brand-600",
            "focus-visible:ring-2 focus-visible:ring-brand-500/35",
            "focus-visible:outline-none",
          )}
        />
        <label
          htmlFor={fieldId("consent")}
          className="cursor-pointer text-[0.8125rem] leading-relaxed text-pretty text-neutral-600"
        >
          {content.consent.label}
        </label>
      </div>

      {/* ----------------------------- Submit ----------------------- */}
      <button
        type="submit"
        className={cn(
          "group mt-5 flex h-12 w-full cursor-pointer items-center justify-center gap-2",
          "rounded-md text-[0.9375rem] font-semibold",
          // `translate`, not `transform`: Tailwind v4 compiles the translate
          // utilities to the standalone property.
          "duration-normal transition-[background-color,box-shadow,translate] ease-out",
          "will-change-[translate]",
          "hover:-translate-y-px active:translate-y-0",
          "focus-visible:ring-2 focus-visible:ring-offset-2",
          "focus-visible:ring-offset-neutral-50 focus-visible:outline-none",
          toneStyles[tone],
        )}
      >
        {content.submit}
        <ArrowRightIcon
          className={cn(
            "duration-normal size-4 transition-transform ease-out",
            "group-hover:translate-x-1",
          )}
        />
      </button>

      <Footnote content={content.footnote} />
    </form>
  );
}
