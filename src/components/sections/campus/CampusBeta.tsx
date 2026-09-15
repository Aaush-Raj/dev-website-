"use client";

import type { SVGProps } from "react";
import { useId, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { campus } from "@/content/campus";
import { cn } from "@/lib/utils";

/**
 * CAMPUS BETA
 * ---------------------------------------------------------------------------
 * The closing band of the LurnyCampus page: a statement on the left, a single
 * email capture on the right, on a soft mint ground.
 *
 * THE FORM IS REAL — the only interactive control on this page. Nothing here is
 * Uncopyable or aria-hidden, unlike the drawn product panels in the sections
 * above it.
 *
 * It follows InsightsSubscribe rather than the shared LeadForm, for the same
 * reason that one does: LeadForm is a five-field demo request with selects and
 * a consent box, and this is one input. Reusing it would mean passing eight
 * fields of content to hide seven.
 *
 * VALIDATION runs in one pass on submit, then re-validates as the field is
 * corrected — so an error appears only after someone has tried to submit,
 * never while they are still typing. The form is `noValidate` because the
 * browser's own bubbles cannot be styled and appear in the wrong place.
 *
 * SUBMIT IS NOT WIRED UP. `handleSubmit` validates and shows the success state
 * without sending anything anywhere — see the TODO below. A form that silently
 * dropped real addresses would be worse than one that visibly does nothing.
 *
 * THE BACKGROUND IS DRAWN. The design supplies it as a 768KB plate carrying
 * soft mint blobs and two thin arcs on a near-flat ground — all of it shapes
 * and gradients, so it costs a few elements instead and scales to any width.
 */

const { beta } = campus;

/** Motion's string easings are not typed, so the cubic curve is spelled out. */
const easeOut = [0.16, 1, 0.3, 1] as const;

export function CampusBeta() {
  const reduce = useReducedMotion();

  /** useId keeps the label/input pair unique if this ever renders twice. */
  const uid = useId();
  const inputId = `${uid}-email`;
  const errorId = `${uid}-email-error`;

  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  /** Only true once submit has been attempted; gates live re-validation. */
  const [submitted, setSubmitted] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  /**
   * Deliberately permissive: something, an @, something, a dot, something.
   * Stricter patterns reject valid addresses far more often than they catch
   * typos, and the real check is whether the address receives mail.
   */
  const validate = (value: string): string | null => {
    if (!value.trim()) return beta.form.errors.empty;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()))
      return beta.form.errors.format;
    return null;
  };

  const handleChange = (value: string) => {
    setEmail(value);
    // Re-validate only after a failed submit, so an error never appears while
    // someone is still typing the address for the first time.
    if (submitted) setError(validate(value));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);

    const found = validate(email);
    setError(found);
    if (found) {
      document.getElementById(inputId)?.focus();
      return;
    }

    /*
     * TODO(forms): send `email` somewhere.
     *
     * NOTHING IS SENT TODAY — the success state below is shown on validation
     * alone. Before launch this must POST to a real destination and only show
     * success on a 2xx, with an error path for failures.
     */
    setSucceeded(true);
  };

  const rise = (delay: number) => ({
    initial: reduce ? "shown" : "hidden",
    whileInView: "shown",
    viewport: {
      once: true,
      amount: "some",
      margin: "0px 0px 20% 0px",
    } as const,
    variants: {
      hidden: { opacity: 0, y: 18 },
      shown: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay, ease: easeOut },
      },
    },
  });

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden",
        // Sampled from the supplied plate: a soft mint near-white.
        "bg-[#f4fbf7] text-[#0b1a22]",
        "py-16 sm:py-20 lg:py-24",
      )}
    >
      {/* ========================= Background ========================= */}
      {/*
        The plate's four soft blobs. Each is an oversized blurred ellipse
        cropped by the section — which is how the plate draws them, and costs
        nothing at any viewport size.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <span className="absolute -top-[42%] -left-[6%] size-[26rem] rounded-full bg-[#cdefdb]/75 blur-3xl" />
        <span className="absolute -bottom-[38%] -left-[10%] size-[32rem] rounded-full bg-[#c9eed8]/85 blur-3xl" />
        <span className="absolute -right-[8%] -bottom-[46%] size-[30rem] rounded-full bg-[#cdefdb]/75 blur-3xl" />

        {/*
          The two thin arcs in the right corner. Drawn at a fixed aspect so
          they stay circular — a stretched box would flatten them into ovals
          and they would stop reading as struck geometry.
        */}
        <svg
          viewBox="0 0 200 200"
          preserveAspectRatio="xMaxYMid meet"
          className="absolute top-0 right-0 h-full w-[26%]"
        >
          <g fill="none" stroke="#7fc9a4" strokeOpacity={0.4} strokeWidth={1}>
            <circle cx="176" cy="62" r="78" vectorEffect="non-scaling-stroke" />
            <circle cx="186" cy="58" r="58" vectorEffect="non-scaling-stroke" />
          </g>
        </svg>
      </div>

      <Container width="hero">
        <div
          className={cn(
            "grid items-center gap-10",
            // Measured from the design: the statement takes the left ~44% and
            // the form the right, with a wide gutter between them.
            "lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-16",
            // Grid items default to `min-width: auto`; without this the form
            // row's button can force the column past the container.
            "[&>*]:min-w-0",
          )}
        >
          {/* ========================= Statement ======================= */}
          <div>
            <motion.p
              {...rise(0)}
              className="flex flex-wrap items-center gap-3.5"
            >
              <RayedCalendarIcon className="size-8 shrink-0 text-[#2f9c6a]" />
              <span
                className={cn(
                  "rounded-full border border-[#7fc9a4] px-5 py-2",
                  "text-[0.8125rem] font-bold tracking-[0.1em] uppercase",
                  "text-[#1f7a52]",
                )}
              >
                {beta.badge}
              </span>
            </motion.p>

            <motion.h2
              {...rise(0.06)}
              className={cn(
                "mt-7 font-display font-bold tracking-[-0.035em]",
                "leading-[1.04] text-balance text-[#0b2f22]",
                // Measured from the design at ~56px on a 1440 frame.
                "text-[2.25rem] sm:text-[2.75rem] xl:text-[3.25rem]",
              )}
            >
              {beta.headline}
            </motion.h2>

            <motion.p
              {...rise(0.12)}
              className={cn(
                "mt-4 max-w-[26rem] leading-relaxed text-pretty",
                "text-[1rem] text-[#4a5a60] sm:text-[1.0625rem]",
              )}
            >
              {beta.description}
            </motion.p>
          </div>

          {/* =========================== Form ========================== */}
          <motion.div {...rise(0.18)}>
            {succeeded ? (
              /*
                `role="status"` so the change is announced. It replaces the
                form rather than sitting beside it: the address is captured and
                offering the field again would invite a duplicate.
              */
              <div
                role="status"
                className={cn(
                  "rounded-2xl bg-white/80 p-6 ring-1 ring-[#7fc9a4]/50",
                  "shadow-[0_1rem_2rem_-1.25rem_rgb(11_47_34/0.3)]",
                )}
              >
                <p className="flex items-center gap-2.5 text-[1.0625rem] font-bold text-[#0b2f22]">
                  <TickIcon className="size-5 shrink-0 text-[#2f9c6a]" />
                  {beta.form.success.title}
                </p>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-[#4a5a60]">
                  {beta.form.success.body}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <label
                  htmlFor={inputId}
                  className="block text-[1.0625rem] font-bold text-[#0b2f22]"
                >
                  {beta.form.label}
                </label>

                <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                  {/* ------------------- Field ------------------- */}
                  <div className="relative flex-1">
                    <MailIcon
                      className={cn(
                        "pointer-events-none absolute top-1/2 left-4 -translate-y-1/2",
                        "size-5 text-[#7c8a8e]",
                      )}
                    />
                    <input
                      id={inputId}
                      type="email"
                      name="email"
                      autoComplete="email"
                      inputMode="email"
                      placeholder={beta.form.placeholder}
                      value={email}
                      onChange={(event) => handleChange(event.target.value)}
                      aria-invalid={error ? true : undefined}
                      aria-describedby={error ? errorId : undefined}
                      className={cn(
                        "w-full rounded-xl border bg-white py-4 pr-4 pl-12",
                        "text-[1rem] text-[#0b1a22] placeholder:text-[#9aa8ad]",
                        "duration-normal transition-[border-color,box-shadow] ease-out",
                        error
                          ? "border-status-danger"
                          : "border-[#dde7e2] hover:border-[#9fd4b8]",
                        "focus:border-[#2f9c6a] focus:outline-none",
                        "focus:shadow-[0_0_0_3px_rgb(47_156_106/0.18)]",
                      )}
                    />
                  </div>

                  {/* ------------------- Submit ------------------ */}
                  <button
                    type="submit"
                    className={cn(
                      "group inline-flex shrink-0 items-center justify-center gap-3",
                      "rounded-xl px-7 py-4",
                      // The design's deep-green gradient, left to right.
                      "bg-[linear-gradient(to_right,#2f9c6a,#137a53)]",
                      "text-[1rem] font-bold text-white",
                      "duration-normal transition-[translate,box-shadow] ease-out",
                      "will-change-[translate]",
                      "hover:-translate-y-0.5",
                      "hover:shadow-[0_1rem_2rem_-0.75rem_rgb(19_122_83/0.7)]",
                      "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#137a53]",
                    )}
                  >
                    {beta.form.submit}
                    <ArrowIcon
                      className={cn(
                        "size-4 shrink-0",
                        "duration-normal transition-[translate] ease-out",
                        "group-hover:translate-x-1",
                      )}
                    />
                  </button>
                </div>

                {error ? (
                  <p
                    id={errorId}
                    role="alert"
                    className="mt-2.5 text-[0.8125rem] text-status-danger"
                  >
                    {error}
                  </p>
                ) : (
                  <p className="mt-3 text-[0.9375rem] text-[#4a5a60]">
                    {beta.form.note}
                  </p>
                )}
              </form>
            )}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

/* ========================================================================== */
/* ICONS                                                                      */
/* ========================================================================== */

type IconProps = SVGProps<SVGSVGElement>;

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/**
 * The badge's calendar.
 *
 * Drawn here rather than reusing `CalendarIcon` from CampusIcons: that one is
 * a plain calendar, and this design adds dots on the page and rays around the
 * frame — the rays are what make it read as an announcement rather than a date
 * field.
 */
function RayedCalendarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 28 28" aria-hidden="true" {...props}>
      <rect x="7" y="7" width="14" height="13" rx="2.2" {...stroke} />
      <path d="M7 11h14M11 5.6v2.8M17 5.6v2.8" {...stroke} />
      {/* The page dots. Filled, so they read at badge size. */}
      <g fill="currentColor">
        <circle cx="11" cy="14.4" r="0.9" />
        <circle cx="14" cy="14.4" r="0.9" />
        <circle cx="17" cy="14.4" r="0.9" />
        <circle cx="11" cy="17.4" r="0.9" />
        <circle cx="14" cy="17.4" r="0.9" />
      </g>
      {/*
        The rays. Long and well clear of the frame: at a shorter length they
        merged into the calendar's own edge and the badge read as a plain date
        field rather than an announcement.
      */}
      <path
        d="M1.6 10h3.2M1.6 15h3.2M2.6 4.6l2.3 2M23.2 10h3.2M23.2 15h3.2M25.4 4.6l-2.3 2"
        {...stroke}
        strokeWidth={1.6}
      />
    </svg>
  );
}

/** The envelope inside the email field. */
function MailIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect x="2.8" y="5" width="18.4" height="14" rx="2.4" {...stroke} />
      <path d="m3.6 7 8.4 6 8.4-6" {...stroke} />
    </svg>
  );
}

/** The arrow on the submit button. */
function ArrowIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" {...props}>
      <path
        d="M2 8h12M9.5 3.5 14 8l-4.5 4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** The tick on the success panel. */
function TickIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="9.2" {...stroke} />
      <path d="m8 12.4 2.8 2.8L16.4 9.6" {...stroke} />
    </svg>
  );
}
