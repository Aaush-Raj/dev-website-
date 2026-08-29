"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { insights } from "@/content/insights";
import { cn } from "@/lib/utils";

/**
 * INSIGHTS SUBSCRIBE
 * ---------------------------------------------------------------------------
 * Section 4 of the Insights page: a subscribe form on the left, an
 * illustration on the right.
 *
 * THE FORM IS REAL — the only interactive control on this page. Nothing here
 * is Uncopyable or aria-hidden, unlike the drawn product panels elsewhere on
 * the site.
 *
 * It is deliberately NOT the shared LeadForm: that component is a five-field
 * demo request with selects and a consent box, and this is a single email
 * input. Reusing it would mean passing eight fields of content to hide seven
 * of them.
 *
 * VALIDATION follows the same rules LeadForm uses, for consistency: the form
 * is `noValidate` and validates in one pass on submit, then re-validates as
 * the field is corrected — so an error appears only after someone has tried
 * to submit, never while they are still typing. Browser bubble validation is
 * avoided because it cannot be styled and appears in the wrong place.
 *
 * SUBMIT IS NOT WIRED UP. `handleSubmit` validates and shows the success
 * state without sending anything anywhere — see the TODO below. The
 * destination is not yet chosen, and a form that silently dropped real
 * addresses would be worse than one that visibly does nothing.
 */

const { subscribe } = insights;

/** Motion's string easings are not typed, so the cubic curve is spelled out. */
const easeOut = [0.16, 1, 0.3, 1] as const;

export function InsightsSubscribe() {
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
    if (!value.trim()) return subscribe.form.errors.empty;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()))
      return subscribe.form.errors.format;
    return null;
  };

  const handleChange = (value: string) => {
    setEmail(value);
    // Re-validate only after a failed submit, so an error never appears
    // while someone is still typing the address for the first time.
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
     * alone. Before launch this must POST to a real destination and only
     * show success on a 2xx, with an error path for failures.
     */
    setSucceeded(true);
  };

  const rise = (delay: number) => ({
    initial: reduce ? "shown" : "hidden",
    whileInView: "shown",
    viewport: { once: true, amount: "some" } as const,
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
    <section className="relative overflow-hidden bg-[#faf7f3] py-section-lg text-neutral-900">
      <Container width="hero">
        <div
          className={cn(
            "grid items-center gap-12",
            "lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-10",
          )}
        >
          {/* ============================ Copy ======================== */}
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "text-[0.6875rem] font-bold tracking-[0.2em] uppercase",
                "text-[#4f0d6e] sm:text-xs",
              )}
            >
              {subscribe.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.08)}
              className={cn(
                "mt-5 font-display font-medium tracking-[-0.03em]",
                "leading-[1.14] text-balance",
                // Measured from the design at ~44px on a 1440 frame.
                "text-[1.875rem] sm:text-[2.25rem] xl:text-[2.75rem]",
              )}
            >
              {subscribe.headline.map((line) => (
                <span key={line} className="inline lg:block">
                  {line}{" "}
                </span>
              ))}
            </motion.h2>

            <motion.p
              {...rise(0.16)}
              className={cn(
                "mt-6 max-w-[30rem] leading-relaxed text-pretty",
                "text-[0.9375rem] text-neutral-600 sm:text-base",
              )}
            >
              {subscribe.description}
            </motion.p>

            {/* ---------------------- Subscribe ------------------- */}
            <motion.div {...rise(0.24)} className="mt-9 max-w-[32rem]">
              {succeeded ? (
                <div
                  // The form is replaced, so announce what took its place.
                  role="status"
                  className={cn(
                    "rounded-lg bg-white p-6",
                    "ring-1 ring-[#4f0d6e]/15",
                  )}
                >
                  <p className="text-[1.0625rem] font-semibold text-[#420d49]">
                    {subscribe.form.success.title}
                  </p>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-neutral-600">
                    {subscribe.form.success.description}
                  </p>
                </div>
              ) : (
                <form
                  // Validation is handled above rather than by the browser;
                  // see the note at the top of this file.
                  noValidate
                  onSubmit={handleSubmit}
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:gap-0">
                    {/* Visually hidden, not absent: the design shows only a
                        placeholder, and a placeholder is not a label. */}
                    <label htmlFor={inputId} className="sr-only">
                      {subscribe.form.label}
                    </label>

                    <input
                      id={inputId}
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder={subscribe.form.placeholder}
                      value={email}
                      onChange={(event) => handleChange(event.target.value)}
                      aria-invalid={error ? true : undefined}
                      aria-describedby={error ? errorId : undefined}
                      className={cn(
                        "h-13 w-full min-w-0 flex-1 bg-white px-4",
                        "text-[0.9375rem] text-neutral-900",
                        "placeholder:text-neutral-400",
                        "border ring-0",
                        "rounded-lg sm:rounded-r-none",
                        "duration-fast transition-[border-color] ease-out",
                        "focus:outline-none focus-visible:border-[#4f0d6e]",
                        error ? "border-status-danger" : "border-neutral-300",
                      )}
                    />

                    <button
                      type="submit"
                      className={cn(
                        "h-13 shrink-0 cursor-pointer px-7",
                        "text-[0.9375rem] font-semibold text-white",
                        "bg-[#420d49]",
                        "rounded-lg sm:rounded-l-none",
                        "duration-normal transition-[background-color] ease-out",
                        "hover:bg-[#5c1466]",
                        "focus-visible:ring-2 focus-visible:ring-[#4f0d6e]/50",
                        "focus-visible:ring-offset-2 focus-visible:outline-none",
                      )}
                    >
                      {subscribe.form.submit}
                    </button>
                  </div>

                  {error && (
                    <p
                      id={errorId}
                      role="alert"
                      className="mt-2.5 text-[0.8125rem] text-status-danger"
                    >
                      {error}
                    </p>
                  )}
                </form>
              )}

              {/* ------------------------ Note --------------------- */}
              <p className="mt-4 text-[0.8125rem] text-neutral-600">
                <span className="font-semibold text-[#420d49]">
                  {subscribe.note.lead}
                </span>{" "}
                {subscribe.note.tail}
              </p>
            </motion.div>

            {/* ------------------------ Links -------------------- */}
            <motion.ul {...rise(0.3)} className="mt-9 space-y-4">
              {subscribe.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    // External links open away from the site, so they carry
                    // the usual rel and an announced destination.
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className={cn(
                      "group inline-flex items-center gap-2.5",
                      "text-[0.9375rem] font-medium text-[#420d49]",
                      "border-b border-[#420d49]/30 pb-1.5",
                      "duration-normal transition-colors ease-out",
                      "hover:border-[#420d49] hover:text-[#5c1466]",
                      "focus-visible:rounded-sm focus-visible:ring-2",
                      "focus-visible:ring-[#4f0d6e]/40 focus-visible:outline-none",
                    )}
                  >
                    {link.label}
                    {link.external && (
                      <span className="sr-only">(opens in a new tab)</span>
                    )}

                    <span
                      aria-hidden="true"
                      className={cn(
                        "duration-normal transition-transform ease-out",
                        // The external link's arrow leaves the page, so it
                        // travels up and out; the internal one runs along.
                        link.external
                          ? "group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          : "group-hover:translate-x-1",
                      )}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="size-4"
                      >
                        {link.external ? (
                          <path d="M7 17 17 7M8.5 7H17v8.5" />
                        ) : (
                          <path d="M4.5 12h15M13.5 6l6 6-6 6" />
                        )}
                      </svg>
                    </span>
                  </Link>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* ======================== Illustration ==================== */}
          <motion.div
            initial={reduce ? "shown" : "hidden"}
            whileInView="shown"
            viewport={{ once: true, amount: "some" }}
            variants={{
              hidden: { opacity: 0, scale: 0.97 },
              shown: {
                opacity: 1,
                scale: 1,
                transition: { duration: 0.8, delay: 0.2, ease: easeOut },
              },
            }}
          >
            <Image
              src={subscribe.illustration.src}
              alt={subscribe.illustration.alt}
              width={subscribe.illustration.width}
              height={subscribe.illustration.height}
              sizes="(min-width: 1024px) 52vw, 92vw"
              className="h-auto w-full"
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
