"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Logo } from "@/components/layout/Logo";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { MegaMenu } from "@/components/layout/MegaMenu";
import { ChevronDownIcon } from "@/components/sections/hero/DashboardIcons";
import { Container } from "@/components/ui/Container";
import { headerActions, mainNav, type MegaMenuKey } from "@/content/navigation";
import { useScrollDirection } from "@/lib/use-scroll-direction";
import { cn } from "@/lib/utils";

/** Ties the Platform trigger to its panel via aria-controls. */
/** One panel id per menu, so `aria-controls` points at the right one. */
const MEGA_MENU_ID = (menu: MegaMenuKey) => `${menu}-menu`;

/**
 * HEADER
 * ---------------------------------------------------------------------------
 * Floating navigation pill, per the hero design: a white rounded bar inset
 * from the page edges rather than a full-bleed bar pinned to the top.
 *
 * SCROLL BEHAVIOUR
 * The pill hides as you scroll down into content and returns as soon as you
 * scroll up — the directional-hide pattern used across most SaaS marketing
 * sites. It gives long pages back the vertical space the pill occupies without
 * making the visitor scroll to the top to reach navigation. The thresholds and
 * anti-flicker rules live in useScrollDirection.
 *
 * It also tightens its top offset and deepens its shadow once scrolled, so it
 * reads as lifting off the page as content passes beneath.
 *
 * FOUR THINGS OVERRIDE HIDING, all for the same reason — content must never
 * disappear out from under someone who is using it:
 *
 *  1. An open mobile menu. The menu is a child of this element, so hiding the
 *     header would take the open panel with it.
 *  2. An open Platform mega-menu, for the same reason.
 *  3. Keyboard focus inside the header. Sliding a focused control off-screen
 *     breaks WCAG 2.4.7 (Focus Visible); a keyboard user tabbing through the
 *     nav would lose their place.
 *  4. Hover. If the pointer is resting on the pill, the visitor is aiming at
 *     it — scroll from an errant wheel nudge should not snatch it away.
 *
 * PLATFORM MEGA-MENU
 * A nav item marked `mega` opens MegaMenu on hover and on focus. State lives
 * here rather than in the panel because it spans the trigger and the panel
 * both; see the note on the close delay below.
 */

export function Header() {
  const pathname = usePathname();
  const { isVisible, isScrolled } = useScrollDirection();

  /**
   * Set by MobileMenu via its callback. Lives here rather than in the menu
   * because it is the header's transform that must be suppressed.
   */
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /** Keyboard focus is somewhere inside the header. */
  const [hasFocusWithin, setHasFocusWithin] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  /**
   * The Platform mega-menu.
   *
   * Opening is deliberately instant but CLOSING is delayed by a beat. The
   * panel sits below the nav item with a gap between them, so the pointer
   * necessarily leaves the trigger while travelling to the panel; closing
   * immediately on mouseleave would snatch it away mid-journey. The timer is
   * cancelled the moment the pointer lands on either the trigger or the panel.
   */
  const [openMenu, setOpenMenu] = useState<MegaMenuKey | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  /** The trigger of whichever menu is open, so Escape can return focus to it. */
  const triggerRefs = useRef<Partial<Record<MegaMenuKey, HTMLAnchorElement>>>(
    {},
  );

  /**
   * Route changes close the panel, without a setState-in-effect cascade.
   *
   * The pathname the panel was opened against is remembered; when the route
   * changes that snapshot no longer matches and the panel is treated as closed
   * on the very same render. Same approach as MobileMenu.
   */
  const [openedAt, setOpenedAt] = useState(pathname);
  const activeMenu = openedAt === pathname ? openMenu : null;

  const setActiveMenu = useCallback(
    (menu: MegaMenuKey | null) => {
      setOpenedAt(pathname);
      setOpenMenu(menu);
    },
    [pathname],
  );

  const cancelClose = useCallback(() => {
    if (closeTimer.current !== null) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const openMega = useCallback(
    (menu: MegaMenuKey) => {
      cancelClose();
      setActiveMenu(menu);
    },
    [cancelClose, setActiveMenu],
  );

  const closeMega = useCallback(
    ({ immediate = false } = {}) => {
      cancelClose();
      if (immediate) {
        setActiveMenu(null);
        return;
      }
      closeTimer.current = setTimeout(() => setActiveMenu(null), 140);
    },
    [cancelClose, setActiveMenu],
  );

  // Clear any pending timer if the header unmounts mid-countdown.
  useEffect(() => cancelClose, [cancelClose]);

  /**
   * Escape closes the panel and returns focus to its trigger, so a keyboard
   * user is not dropped back at the top of the document.
   */
  useEffect(() => {
    if (!activeMenu) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      closeMega({ immediate: true });
      triggerRefs.current[activeMenu]?.focus();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [activeMenu, closeMega]);

  const isPinned =
    isMenuOpen || hasFocusWithin || isHovered || activeMenu !== null;
  const isHidden = !isVisible && !isPinned;

  /**
   * Handles the menu reporting its state.
   *
   * Closing the menu leaves its trigger button focused, which on a touch
   * device — no keyboard, and :focus sticking after a tap — would pin the
   * header open indefinitely. So closing also clears focus-within.
   *
   * Done here in the event handler rather than in an effect watching
   * isMenuOpen: both values change from the same cause, so setting them
   * together avoids a second render pass.
   */
  const handleMenuOpenChange = useCallback((open: boolean) => {
    setIsMenuOpen(open);
    if (!open) setHasFocusWithin(false);
  }, []);

  return (
    <header
      onFocus={() => setHasFocusWithin(true)}
      onBlur={(event) => {
        // relatedTarget is where focus is going. If it is still inside the
        // header, this is movement between nav items, not an exit.
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setHasFocusWithin(false);
          // Tabbing out of the header past the last panel link closes it,
          // rather than leaving it open behind the page.
          closeMega({ immediate: true });
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "sticky z-[200] w-full",
        /*
          The header floats OVER the page rather than sitting above it, so it
          must not reserve flow space — otherwise every page opens with a band
          of background between the top of the viewport and its first section.

          It stays `sticky` (not `fixed`) because sticky keeps it in the
          scroll container, which is what lets `top` animate between the
          scrolled and unscrolled insets below. The negative bottom margin
          cancels the space that costs: the pill is h-16 / lg:h-[4.25rem], so
          -4rem / lg:-4.25rem pulls the following content back to y=0.

          Each hero then owns its own top padding to clear the pill — see the
          `pt-*` on Hero, PulseHero and PitchHero.
        */
        "-mb-16 lg:-mb-[4.25rem]",
        // `translate` and `top` are separate properties here, so both can
        // animate without one clobbering the other.
        "duration-normal transition-[top,translate] ease-out",
        "will-change-[translate]",
        isScrolled ? "top-2" : "top-5",
        // -140% rather than -100%: the pill is inset from the top by `top-5`,
        // and its shadow extends past its box. 100% would leave a sliver of
        // both on screen.
        isHidden && "translate-y-[-140%]",
        // Reduced motion: the header still hides, but snaps rather than
        // sliding. Removing the behaviour entirely would be a different
        // layout for those users; removing the animation is the ask.
        "motion-reduce:transition-none",
      )}
    >
      {/* `relative` anchors the mega-menu panel, which is positioned against
          this element rather than the sticky header. */}
      <Container width="nav" className="relative">
        <nav
          aria-label="Main navigation"
          className={cn(
            "flex items-center justify-between gap-6 rounded-full bg-white",
            "h-16 pr-3 pl-7 lg:h-[4.25rem]",
            "duration-normal transition-shadow ease-out",
            isScrolled ? "shadow-lg" : "shadow-sm",
          )}
        >
          {/* In the initial viewport on every page, so it loads eagerly. */}
          <Logo priority />

          {/* Desktop links — hidden below lg, where MobileMenu takes over. */}
          <ul className="hidden items-center gap-7 lg:flex xl:gap-9">
            {mainNav.map((link, index) => {
              // On the homepage no nav href matches, but the design shows the
              // first item active — it represents the page you are on.
              const isActive =
                pathname === "/" ? index === 0 : pathname.startsWith(link.href);

              const megaKey = link.mega;
              const isMegaOpen =
                megaKey !== undefined && activeMenu === megaKey;

              return (
                <li
                  key={link.href}
                  {...(megaKey && {
                    onMouseEnter: () => openMega(megaKey),
                    onMouseLeave: () => closeMega(),
                  })}
                >
                  <Link
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    {...(megaKey && {
                      ref: (node: HTMLAnchorElement | null) => {
                        if (node) triggerRefs.current[megaKey] = node;
                        else delete triggerRefs.current[megaKey];
                      },
                      "aria-expanded": isMegaOpen,
                      "aria-controls": MEGA_MENU_ID(megaKey),
                      // Opening on focus means keyboard users reach the panel
                      // by tabbing onward, rather than needing a pointer.
                      onFocus: () => openMega(megaKey),
                    })}
                    className={cn(
                      "duration-fast relative flex items-center gap-1.5 py-1.5 text-[0.9375rem] whitespace-nowrap transition-colors",
                      isActive
                        ? "font-semibold text-neutral-900"
                        : "font-medium text-neutral-500 hover:text-neutral-900",
                    )}
                  >
                    {link.label}

                    {/* Chevron, rotating to point up while the panel is open —
                        the affordance the design shows. */}
                    {megaKey && (
                      <ChevronDownIcon
                        aria-hidden="true"
                        className={cn(
                          "duration-normal size-3.5 transition-transform ease-out",
                          isMegaOpen && "rotate-180",
                        )}
                      />
                    )}

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

          {/* Reports its open state up so the header can pin itself open —
              the panel is a child of this element, so a hidden header would
              take the open menu with it. */}
          <MobileMenu onOpenChange={handleMenuOpenChange} />
        </nav>

        {/*
          The mega-menu panel, below the pill.

          Rendered inside the Container so it inherits the same width and
          gutter as the nav, and only above lg — below that MobileMenu carries
          the navigation and this panel's three columns would not fit.

          AnimatePresence lets it animate out rather than vanishing, and the
          panel is unmounted entirely when closed, so its links are never
          focusable while invisible.
        */}
        <div className="pointer-events-none absolute inset-x-0 top-full hidden px-gutter lg:block">
          <AnimatePresence mode="wait">
            {activeMenu && (
              // Keyed so moving between triggers swaps the panel rather than
              // morphing one into the other, which would animate the columns
              // sideways as the count changes.
              //
              // The hover handlers sit HERE, not on the wrapper above. That
              // wrapper spans the full width and is only pointer-events-none;
              // crossing it on the way anywhere still fires its mouseenter,
              // which cancelled the close timer and left the panel stuck open
              // after the pointer had left. This element is the one that
              // actually takes pointer events, so it is the one whose bounds
              // should govern.
              <div
                key={activeMenu}
                className="pointer-events-auto pt-3"
                onMouseEnter={() => openMega(activeMenu)}
                onMouseLeave={() => closeMega()}
              >
                <MegaMenu id={MEGA_MENU_ID(activeMenu)} menu={activeMenu} />
              </div>
            )}
          </AnimatePresence>
        </div>
      </Container>
    </header>
  );
}
