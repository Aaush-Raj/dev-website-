import Link from "next/link";

import { Logo } from "@/components/layout/Logo";
import { Container } from "@/components/ui/Container";
import { Text } from "@/components/ui/Text";
import { footerNav } from "@/content/navigation";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * FOOTER
 * ---------------------------------------------------------------------------
 * Site footer: brand block, link columns, legal line.
 *
 * Server Component — no interactivity, so it ships no JavaScript.
 * Footer links also matter for SEO: they distribute internal link equity to
 * every important page from every page on the site.
 */

const socialLinks = [
  { label: "Twitter", href: siteConfig.links.twitter },
  { label: "LinkedIn", href: siteConfig.links.linkedin },
  { label: "YouTube", href: siteConfig.links.youtube },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border-subtle bg-surface-subtle">
      <Container>
        <div className="py-section-sm">
          <div className="grid gap-10 md:grid-cols-[1.5fr_2fr]">
            {/* Brand block */}
            <div className="flex flex-col gap-4">
              <Logo />
              <Text size="sm" measure="narrow">
                {siteConfig.description}
              </Text>
              <Link
                href={`mailto:${siteConfig.email}`}
                className={cn(
                  "w-fit text-sm font-medium text-text-brand",
                  "duration-fast transition-opacity hover:opacity-75",
                )}
              >
                {siteConfig.email}
              </Link>
            </div>

            {/* Link columns */}
            <nav
              aria-label="Footer navigation"
              className="grid grid-cols-2 gap-8 sm:grid-cols-3"
            >
              {footerNav.map((group) => (
                <div key={group.title} className="flex flex-col gap-3">
                  <h2 className="text-sm font-semibold text-text-primary">
                    {group.title}
                  </h2>
                  <ul className="flex flex-col gap-2.5">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          {...(link.external && {
                            target: "_blank",
                            rel: "noopener noreferrer",
                          })}
                          className={cn(
                            "text-sm text-text-secondary",
                            "duration-fast transition-colors hover:text-text-primary",
                          )}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>

          {/* Legal bar */}
          <div
            className={cn(
              "mt-10 flex flex-col-reverse gap-4 border-t border-border-subtle pt-6",
              "sm:flex-row sm:items-center sm:justify-between",
            )}
          >
            <Text size="sm" tone="tertiary">
              &copy; {year} {siteConfig.name}. All rights reserved.
            </Text>

            <ul className="flex flex-wrap items-center gap-5">
              {socialLinks.map((social) => (
                <li key={social.href}>
                  <Link
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "text-sm text-text-secondary",
                      "duration-fast transition-colors hover:text-text-primary",
                    )}
                  >
                    {social.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
}
