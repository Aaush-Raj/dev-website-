"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Logo } from "@/components/layout/Logo";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Container } from "@/components/ui/Container";
import { headerActions, mainNav } from "@/content/navigation";
import { cn } from "@/lib/utils";

/**
 * HEADER
 * ---------------------------------------------------------------------------
 * Floating navigation pill, per the hero design: a white rounded bar inset
 * from the page edges rather than a full-bleed bar pinned to the top.
 *
 * Behaviour on scroll: the pill tightens its top offset and deepens its
 * shadow, so it reads as lifting off the page as content passes beneath.
 * Subtle — the design's resting state is the one that matters.
 */

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

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
        "sticky z-[200] w-full",
        "duration-normal transition-[top] ease-out",
        isScrolled ? "top-2" : "top-5",
      )}
    >
      <Container width="nav">
        <nav
          aria-label="Main navigation"
          className={cn(
            "flex items-center justify-between gap-6 rounded-full bg-white",
            "h-16 pr-3 pl-7 lg:h-[4.25rem]",
            "duration-normal transition-shadow ease-out",
            isScrolled ? "shadow-lg" : "shadow-sm",
          )}
        >
          <Logo />

          {/* Desktop links — hidden below lg, where MobileMenu takes over. */}
          <ul className="hidden items-center gap-7 lg:flex xl:gap-9">
            {mainNav.map((link, index) => {
              // On the homepage no nav href matches, but the design shows the
              // first item active — it represents the page you are on.
              const isActive =
                pathname === "/" ? index === 0 : pathname.startsWith(link.href);

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "duration-fast relative block py-1.5 text-[0.9375rem] whitespace-nowrap transition-colors",
                      isActive
                        ? "font-semibold text-neutral-900"
                        : "font-medium text-neutral-500 hover:text-neutral-900",
                    )}
                  >
                    {link.label}

                    {/* Active underline — 2px violet rule, per the design. */}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute -bottom-0.5 left-0 h-0.5 w-full rounded-full bg-brand-700",
                        "duration-normal origin-left transition-transform ease-out",
                        isActive ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop actions */}
          <div className="hidden items-center gap-2 lg:flex">
            <Link
              href={headerActions.secondary.href}
              className={cn(
                "rounded-full px-4 py-2 text-[0.9375rem] font-semibold whitespace-nowrap text-neutral-900",
                "duration-fast transition-colors hover:bg-neutral-100",
              )}
            >
              {headerActions.secondary.label}
            </Link>

            <Link
              href={headerActions.primary.href}
              className={cn(
                "rounded-full bg-brand-600 px-6 py-3 text-[0.9375rem] font-semibold whitespace-nowrap text-white",
                "duration-normal transition-[background-color,box-shadow,transform] ease-out",
                "hover:bg-brand-700 hover:shadow-brand active:translate-y-px",
              )}
            >
              {headerActions.primary.label}
            </Link>
          </div>

          <MobileMenu />
        </nav>
      </Container>
    </header>
  );
}
