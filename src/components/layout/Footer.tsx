import Link from "next/link";

import { Logo } from "@/components/layout/Logo";
import { socialIcons } from "@/components/layout/SocialIcons";
import { ArrowRightIcon } from "@/components/sections/hero/DashboardIcons";
import { Container } from "@/components/ui/Container";
import {
  footerBrand,
  footerCta,
  footerLegal,
  footerNav,
} from "@/content/navigation";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * FOOTER
 * ---------------------------------------------------------------------------
 * Deep-violet footer: a call-to-action band, four columns of links beside the
 * brand block, and a legal bar.
 *
 * Server Component — no interactivity, so it ships no JavaScript. Footer links
 * also matter for SEO: they distribute internal link equity to every important
 * page from every page on the site.
 *
 * The footer paints its own palette directly rather than flipping the semantic
 * surface tokens, for the same reason the dark sections do: this colour is a
 * property of the footer's design, not a theme change.
 */

/** Location pin, for the address line. */
function PinIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

/** Envelope, for the email line. */
function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </svg>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-footer-bg text-white">
      {/* ------------------------------------------------------------------
          Decorative watermark: an oversized logo mark bleeding off the right
          edge, barely lighter than the ground. Hidden below lg, where it
          would crowd the content.
          ------------------------------------------------------------------ */}
      <div className="relative overflow-hidden">
        <Watermark className="pointer-events-none absolute top-52 -right-40 hidden w-[26rem] text-white/[0.03] 2xl:block" />

        <Container width="hero" className="relative">
          {/* ============================ CTA band ==================== */}
          <div className="border-b border-white/10 py-7">
            <div
              className={cn(
                "flex flex-col gap-5 border-l-2 border-white pl-5",
                "sm:flex-row sm:items-center sm:justify-between sm:gap-8",
              )}
            >
              <p className="text-lg font-medium text-pretty text-white sm:text-xl">
                {footerCta.text}
              </p>

              <Link
                href={footerCta.action.href}
                className={cn(
                  "group inline-flex shrink-0 items-center gap-2.5 self-start rounded-lg",
                  "bg-footer-button px-5 py-3 text-sm font-semibold text-white",
                  "duration-normal transition-[background-color,transform] ease-out",
                  "hover:bg-brand-500 active:translate-y-px sm:self-auto",
                )}
              >
                {footerCta.action.label}
                <ArrowRightIcon
                  className={cn(
                    "duration-normal size-4 transition-transform ease-out",
                    "group-hover:translate-x-1",
                  )}
                />
              </Link>
            </div>
          </div>

          {/* =========================== Main grid ==================== */}
          <div
            className={cn(
              "grid gap-10 py-12",
              "sm:grid-cols-2",
              "lg:grid-cols-[minmax(0,1.15fr)_repeat(3,minmax(0,1fr))] lg:gap-0 lg:py-14",
            )}
          >
            {/* ------------------------ Brand block ------------------ */}
            <div className="lg:pr-10">
              {/* The footer's logo inverts: amber bars stay, wordmark goes
                  white against the violet ground. */}
              <Logo className="[--logo-wordmark:#ffffff]" />

              <span
                aria-hidden="true"
                className="mt-5 block h-0.5 w-9 rounded-full bg-footer-accent"
              />

              <p className="mt-5 max-w-[16rem] text-sm leading-relaxed text-pretty text-white/75">
                {footerBrand.tagline}
              </p>

              <span
                aria-hidden="true"
                className="my-6 block h-px w-full max-w-[15rem] bg-white/12"
              />

              <ul className="flex flex-col gap-3.5 text-sm text-white/75">
                <li className="flex items-center gap-3">
                  <PinIcon className="size-4 shrink-0 text-white/55" />
                  {footerBrand.location}
                </li>
                <li className="flex items-center gap-3">
                  <MailIcon className="size-4 shrink-0 text-white/55" />
                  <Link
                    href={`mailto:${siteConfig.email}`}
                    className="duration-fast transition-colors hover:text-white"
                  >
                    {siteConfig.email}
                  </Link>
                </li>
              </ul>
            </div>

            {/* ------------------------ Link columns ----------------- */}
            {footerNav.map((group, index) => (
              <nav
                key={group.title}
                aria-label={group.title}
                className={cn(
                  "lg:px-10",
                  // Hairline between columns, matching the design. The first
                  // column carries the divider that separates it from the
                  // brand block.
                  "lg:border-l lg:border-white/10",
                  index === footerNav.length - 1 && "lg:pr-0",
                )}
              >
                <h2 className="text-[0.9375rem] font-semibold text-white">
                  {group.title}
                </h2>

                <span
                  aria-hidden="true"
                  className="mt-3 block h-0.5 w-7 rounded-full bg-footer-accent"
                />

                <ul className="mt-5 flex flex-col gap-3">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        {...(link.external && {
                          target: "_blank",
                          rel: "noopener noreferrer",
                        })}
                        className={cn(
                          "text-sm text-white/75",
                          "duration-fast transition-colors hover:text-white",
                        )}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Social row sits under the last column in the design. */}
                {index === footerNav.length - 1 && (
                  <ul className="mt-7 flex flex-wrap items-center gap-2.5">
                    {siteConfig.socials.map((social) => {
                      const Icon = socialIcons[social.icon];
                      return (
                        <li key={social.href}>
                          <Link
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.label}
                            className={cn(
                              "grid size-9 place-items-center rounded-md",
                              "border border-white/25 text-white/85",
                              "duration-fast transition-colors",
                              "hover:border-white/60 hover:bg-white/10 hover:text-white",
                            )}
                          >
                            <Icon className="size-[18px]" />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </nav>
            ))}
          </div>
        </Container>
      </div>

      {/* ============================ Legal bar ====================== */}
      <div className="border-t border-white/10">
        <Container width="hero">
          <div
            className={cn(
              "flex flex-col-reverse gap-4 py-6",
              "sm:flex-row sm:items-center sm:justify-between",
            )}
          >
            <p className="text-[0.8125rem] text-white/65">
              &copy; {year} {footerLegal.company}
            </p>

            <ul className="flex flex-wrap items-center gap-x-3 gap-y-2">
              {footerLegal.links.map((link, index) => (
                <li key={link.href} className="flex items-center gap-3">
                  {index > 0 && (
                    <span aria-hidden="true" className="text-white/30">
                      &bull;
                    </span>
                  )}
                  <Link
                    href={link.href}
                    className={cn(
                      "text-[0.8125rem] text-white/65",
                      "duration-fast transition-colors hover:text-white",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </div>
    </footer>
  );
}

/* ========================================================================== */
/* Decorative watermark                                                       */
/* ========================================================================== */

/** An oversized, very low-contrast rendering of the logo mark. */
function Watermark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 186 24"
      className={className}
      aria-hidden="true"
      fill="currentColor"
    >
      <rect x="0" y="0" width="28" height="5" rx="0.5" />
      <rect x="0" y="9.5" width="28" height="5" rx="0.5" />
      <rect x="0" y="19" width="28" height="5" rx="0.5" />
      <rect x="40" y="0" width="4" height="24" />
      <rect x="40" y="20" width="22" height="4" />
    </svg>
  );
}
