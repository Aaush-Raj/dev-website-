"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { headerActions, mainNav, platformMenu } from "@/content/navigation";
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
 *
 * THE PLATFORM DISCLOSURE
 * A nav item marked `hasMega` opens the desktop mega-menu on hover, which a
 * touch device never fires. Rendered as a plain link here, its nine engine
 * pages were unreachable on mobile entirely — the only route to them was the
 * footer.
 *
 * So such an item renders as a SPLIT ROW: the label still navigates to the
 * section, and a separate toggle beside it expands the engines inline. Two
 * controls rather than one because the parent is a real page in its own
 * right; collapsing it into a toggle would remove a destination.
 */

interface MobileMenuProps {
  /**
   * Notifies the parent when the panel opens or closes. The header uses this
   * to pin itself visible: this panel is rendered inside the header, so a
   * header that slid away on scroll would take an open menu with it.
   */
  onOpenChange?: (open: boolean) => void;
}

export function MobileMenu({ onOpenChange }: MobileMenuProps = {}) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Close on navigation, without a setState-in-effect cascade.
  //
  // We remember the pathname the menu was opened against. When the route
  // changes, that snapshot no longer matches and the menu is treated as
  // closed on the very same render — no effect, no second render pass.
  const [openedAt, setOpenedAt] = useState(pathname);
  const isMenuOpen = isOpen && openedAt === pathname;

  /**
   * Which mega-menu section is expanded, by href. Only one at a time, so the
   * panel never grows past a phone's height with several open at once.
   *
   * DERIVED against the sheet's open state rather than reset in an effect:
   * setState inside an effect triggers a second render pass, which is the
   * same cascade the openedAt snapshot above exists to avoid. Closing the
   * sheet therefore collapses the disclosure on the very same render.
   */
  const [expandedHref, setExpandedHref] = useState<string | null>(null);
  const expanded = isMenuOpen ? expandedHref : null;

  const setMenuOpen = useCallback(
    (open: boolean) => {
      setOpenedAt(pathname);
      setIsOpen(open);
    },
    [pathname],
  );

  /*
   * Report the open state upward.
   *
   * Watches the DERIVED `isMenuOpen` rather than calling onOpenChange from
   * setMenuOpen: the menu also closes when the route changes, which happens
   * through the openedAt snapshot above without setMenuOpen ever running. An
   * effect on the derived value catches both paths.
   */
  useEffect(() => {
    onOpenChange?.(isMenuOpen);
  }, [isMenuOpen, onOpenChange]);

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

            const isExpanded = expanded === link.href;
            const rowStyles = cn(
              "duration-fast rounded-xl px-4 py-3 text-base transition-colors",
              isActive
                ? "bg-brand-50 font-semibold text-brand-700"
                : "font-medium text-neutral-700 hover:bg-neutral-100",
            );

            /*
              A plain item is a link. An item with a mega-menu is a split row:
              the label navigates, the toggle beside it expands the engines.
              See the note at the top of this file for why both.
            */
            if (!link.hasMega) {
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(rowStyles, "block")}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            }

            const panelId = `mobile-menu-${link.href.replace(/\W+/g, "-")}`;

            return (
              <li key={link.href}>
                <div className="flex items-center gap-1">
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(rowStyles, "min-w-0 flex-1")}
                  >
                    {link.label}
                  </Link>

                  <button
                    type="button"
                    onClick={() =>
                      setExpandedHref(isExpanded ? null : link.href)
                    }
                    aria-expanded={isExpanded}
                    aria-controls={panelId}
                    // The label names what it opens: several rows could carry
                    // a toggle, and "Expand" alone would not tell them apart.
                    aria-label={`${isExpanded ? "Collapse" : "Expand"} ${link.label} menu`}
                    className={cn(
                      "inline-flex size-11 shrink-0 items-center justify-center",
                      "duration-fast rounded-xl text-neutral-500 transition-colors",
                      "hover:bg-neutral-100 hover:text-neutral-900",
                      "focus-visible:ring-2 focus-visible:ring-brand-500/40",
                      "focus-visible:outline-none",
                    )}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className={cn(
                        "size-4",
                        "duration-normal transition-transform ease-out",
                        isExpanded && "rotate-180",
                      )}
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                </div>

                {/* The engines, grouped as the desktop menu groups them. */}
                <div id={panelId} hidden={!isExpanded} className="pb-2">
                  {platformMenu.columns.map((column) => (
                    <div key={column.title} className="mt-3">
                      <p
                        className={cn(
                          "px-4 text-[0.625rem] font-bold tracking-[0.1em]",
                          "text-brand-600 uppercase",
                        )}
                      >
                        {column.title}
                      </p>

                      <ul className="mt-1.5 flex flex-col">
                        {column.items.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              onClick={() => setMenuOpen(false)}
                              className={cn(
                                "duration-fast flex items-center gap-3 rounded-xl",
                                "px-4 py-2.5 transition-colors",
                                "hover:bg-neutral-100",
                              )}
                            >
                              {/* The lavender disc is part of the icon
                                  asset, so no circle is drawn here. */}
                              <Image
                                src={`/assets/icons/engines/${item.icon}.png`}
                                alt=""
                                aria-hidden="true"
                                width={128}
                                height={128}
                                className="size-9 shrink-0"
                              />

                              <span className="min-w-0">
                                <span className="block text-[0.9375rem] font-semibold text-neutral-900">
                                  {item.name}
                                </span>
                                <span className="mt-0.5 block text-[0.8125rem] leading-snug text-pretty text-neutral-500">
                                  {item.description}
                                </span>
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  <Link
                    href={platformMenu.footer.action.href}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "mt-3 block rounded-xl bg-brand-50/70 px-4 py-3",
                      "text-[0.9375rem] font-semibold text-brand-700",
                      "duration-fast transition-colors hover:bg-brand-50",
                    )}
                  >
                    {platformMenu.footer.action.label}
                  </Link>
                </div>
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
