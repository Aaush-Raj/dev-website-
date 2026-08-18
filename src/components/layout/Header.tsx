"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Logo } from "@/components/layout/Logo";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { headerActions, mainNav } from "@/content/navigation";
import { cn } from "@/lib/utils";

/**
 * HEADER
 * ---------------------------------------------------------------------------
 * Sticky site header. Transparent over the hero, then gains a background and
 * border once the user scrolls — a common pattern that keeps the hero clean
 * while guaranteeing nav legibility over arbitrary content further down.
 *
 * Client component because of the scroll listener and the mobile menu state.
 * It is a leaf of the tree, so the rest of the page stays server-rendered.
 */

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);

    // Run once on mount so a restored scroll position renders correctly.
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-[200] w-full",
        "duration-normal transition-[background-color,border-color,backdrop-filter] ease-out",
        isScrolled
          ? "border-b border-border-subtle bg-surface-base/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <Container>
        <nav
          className="flex h-header items-center justify-between gap-6"
          aria-label="Main navigation"
        >
          <Logo />

          {/* Desktop links — hidden below lg, where MobileMenu takes over. */}
          <ul className="hidden items-center gap-1 lg:flex">
            {mainNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium text-text-secondary",
                    "duration-fast transition-colors",
                    "hover:bg-interactive-neutral hover:text-text-primary",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop actions */}
          <div className="hidden items-center gap-2 lg:flex">
            <Button
              href={headerActions.secondary.href}
              variant="ghost"
              size="sm"
            >
              {headerActions.secondary.label}
            </Button>
            <Button
              href={headerActions.primary.href}
              variant="primary"
              size="sm"
            >
              {headerActions.primary.label}
            </Button>
          </div>

          <MobileMenu />
        </nav>
      </Container>
    </header>
  );
}
