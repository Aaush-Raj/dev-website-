"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
import { headerActions, mainNav } from "@/content/navigation";
import { cn } from "@/lib/utils";

/**
 * MOBILE MENU
 * ---------------------------------------------------------------------------
 * Full-screen navigation panel for viewports below lg.
 *
 * Accessibility behaviour handled here:
 *  - aria-expanded / aria-controls wire the trigger to the panel
 *  - Escape closes
 *  - body scroll is locked while open, so the page behind does not move
 *  - route changes close the menu (in-page anchors included)
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
          "inline-flex size-10 items-center justify-center rounded-md",
          "duration-fast text-text-primary transition-colors",
          "hover:bg-interactive-neutral",
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

      {/* Panel — sits below the header, fills the remaining viewport. */}
      <div
        id="mobile-menu"
        hidden={!isMenuOpen}
        className={cn(
          "fixed inset-x-0 top-header bottom-0 z-[190]",
          "border-t border-border-subtle bg-surface-base",
          "overflow-y-auto px-gutter py-8",
        )}
      >
        <ul className="flex flex-col gap-1">
          {mainNav.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "block rounded-lg px-4 py-3 text-lg font-medium text-text-primary",
                  "duration-fast transition-colors hover:bg-interactive-neutral",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col gap-3">
          <Button
            href={headerActions.secondary.href}
            variant="outline"
            size="lg"
            fullWidth
          >
            {headerActions.secondary.label}
          </Button>
          <Button
            href={headerActions.primary.href}
            variant="primary"
            size="lg"
            fullWidth
          >
            {headerActions.primary.label}
          </Button>
        </div>
      </div>
    </div>
  );
}
