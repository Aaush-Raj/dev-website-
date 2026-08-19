"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { headerActions, mainNav } from "@/content/navigation";
import { cn } from "@/lib/utils";

/**
 * MOBILE MENU
 * ---------------------------------------------------------------------------
 * Navigation panel for viewports below lg. Renders as a sheet dropping from
 * under the floating nav pill, matching its rounded, inset geometry.
 *
 * Accessibility behaviour handled here:
 *  - aria-expanded / aria-controls wire the trigger to the panel
 *  - Escape closes
 *  - body scroll is locked while open, so the page behind does not move
 *  - route changes close the menu
 */

export function MobileMenu() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Close on navigation, without a setState-in-effect cascade.
  //
  // We remember the pathname the menu was opened against. When the route
  // changes, that snapshot no longer matches and the menu is treated as
  // closed on the very same render — no effect, no second render pass.
  const [openedAt, setOpenedAt] = useState(pathname);
  const isMenuOpen = isOpen && openedAt === pathname;

  const setMenuOpen = useCallback(
    (open: boolean) => {
      setOpenedAt(pathname);
      setIsOpen(open);
    },
    [pathname],
  );

  // Escape to close + scroll lock while open.
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen, setMenuOpen]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setMenuOpen(!isMenuOpen)}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-menu"
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className={cn(
          "inline-flex size-11 items-center justify-center rounded-full",
          "duration-fast text-neutral-900 transition-colors hover:bg-neutral-100",
        )}
      >
        {/* Hamburger / close, drawn as two rotating bars. */}
        <span className="relative block h-4 w-5" aria-hidden="true">
          <span
            className={cn(
              "absolute left-0 block h-0.5 w-5 rounded-full bg-current",
              "duration-normal transition-transform ease-out",
              isMenuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0.5",
            )}
          />
          <span
            className={cn(
              "absolute left-0 block h-0.5 w-5 rounded-full bg-current",
              "duration-normal transition-transform ease-out",
              isMenuOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0.5",
            )}
          />
        </span>
      </button>

      {/* Backdrop */}
      <div
        hidden={!isMenuOpen}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
        className="fixed inset-0 top-0 z-[-1] bg-neutral-950/20 backdrop-blur-sm"
      />

      {/* Panel — drops from beneath the pill, matching its inset and radius. */}
      <div
        id="mobile-menu"
        hidden={!isMenuOpen}
        className={cn(
          "absolute inset-x-gutter top-[calc(100%+0.5rem)]",
          "max-h-[calc(100dvh-8rem)] overflow-y-auto",
          "rounded-3xl bg-white p-4 shadow-xl",
        )}
      >
        <ul className="flex flex-col">
          {mainNav.map((link) => {
            const isActive = pathname.startsWith(link.href);

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "duration-fast block rounded-xl px-4 py-3 text-base transition-colors",
                    isActive
                      ? "bg-brand-50 font-semibold text-brand-700"
                      : "font-medium text-neutral-700 hover:bg-neutral-100",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-3 flex flex-col gap-2 border-t border-neutral-200 pt-4">
          <Link
            href={headerActions.secondary.href}
            onClick={() => setMenuOpen(false)}
            className={cn(
              "rounded-full border border-neutral-300 px-6 py-3 text-center",
              "text-[0.9375rem] font-semibold text-neutral-900",
              "duration-fast transition-colors hover:bg-neutral-100",
            )}
          >
            {headerActions.secondary.label}
          </Link>

          <Link
            href={headerActions.primary.href}
            onClick={() => setMenuOpen(false)}
            className={cn(
              "rounded-full bg-brand-600 px-6 py-3 text-center",
              "text-[0.9375rem] font-semibold text-white",
              "duration-normal transition-colors hover:bg-brand-700",
            )}
          >
            {headerActions.primary.label}
          </Link>
        </div>
      </div>
    </div>
  );
}
