"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CartIcon } from "@/components/ui/cart";
import { MenuIcon } from "@/components/ui/menu";
import { SearchIcon } from "@/components/ui/search";
import { UserIcon } from "@/components/ui/user";
import { XIcon } from "@/components/ui/x";
import { cn } from "@/lib/utils";

const Header = () => {
  const menuButton = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let wasScrolled = false;

    const updateScrollState = () => {
      const nextIsScrolled = window.scrollY > 50;

      if (nextIsScrolled !== wasScrolled) {
        wasScrolled = nextIsScrolled;
        setIsScrolled(nextIsScrolled);
      }
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });

    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  return (
    <header
      data-solid={isScrolled || menuOpen}
      className={cn(
        "kicks-header fixed inset-x-0 top-0 z-50 isolate flex min-h-20 items-center justify-between p-1 px-[22px] transition-[background-color,color,box-shadow] duration-300 min-[768px]:px-[4.7%] motion-reduce:transition-none before:absolute before:inset-x-0 before:top-0 before:bottom-[-20px] before:-z-1 before:bg-[#f5f3ee] before:opacity-0 before:transition-opacity before:duration-300 before:ease-[ease] before:content-[''] data-[solid=true]:before:opacity-100 motion-reduce:before:transition-none",
        isScrolled || menuOpen ? "text-black" : "bg-transparent text-white shadow-none",
      )}
    >
      <Link
        href="/"
        aria-label="Kicks home"
        className="header-brand relative order-0 flex h-16 w-28 shrink-0 items-center sm:h-18 sm:w-36"
      >
        <span
          className="kicks-header-logo header-wordmark inline-block origin-left scale-x-[1.3] [font-family:var(--font-hero),sans-serif] text-[44px] leading-none font-extrabold tracking-[-0.04em] italic"
          aria-hidden="true"
        >
          KICKS
          <sup className="ml-1 align-top [font-family:var(--font-sans),sans-serif] text-[9px] not-italic">
            ®
          </sup>
        </span>
      </Link>
      <nav
        aria-label="Main"
        className="header-desktop-nav absolute left-1/2 flex -translate-x-1/2 items-center gap-[clamp(22px,4vw,64px)] text-[15px] font-medium min-[768px]:max-[1024px]:gap-[22px] min-[768px]:max-[1024px]:text-[13px] max-[768px]:hidden"
      >
        {[
          ["Shop", "/collections"],
          ["Collections", "/collections"],
          ["New Drops", "/#featured-drops"],
          ["About", "/about"],
        ].map(([label, href]) => (
          <Link
            key={label}
            href={href}
            prefetch={false}
            className="relative py-3 after:absolute after:inset-x-0 after:bottom-[7px] after:h-px after:scale-x-0 after:bg-current after:transition-transform after:duration-200 after:ease-[ease] after:content-[''] hover:after:scale-x-100 motion-reduce:after:transition-none"
          >
            {label}
          </Link>
        ))}
      </nav>
      <nav
        aria-label="Account and shopping"
        className="header-shopping order-2 ml-auto flex items-center sm:gap-2 max-[768px]:ml-1"
      >
        <Link
          href="/search"
          aria-label="Search"
          className="hidden size-11 items-center justify-center min-[1024px]:flex"
        >
          <SearchIcon aria-hidden="true" size={22} />
        </Link>
        <Link
          href="/account"
          aria-label="Account"
          className="hidden size-11 items-center justify-center min-[1024px]:flex"
        >
          <UserIcon aria-hidden="true" size={22} />
        </Link>
        <Link
          href="/cart"
          aria-label="Shopping cart"
          className="flex size-11 items-center justify-center"
        >
          <CartIcon aria-hidden="true" size={22} />
        </Link>
      </nav>
      <button
        type="button"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        aria-controls="header-navigation"
        onClick={() => setMenuOpen(!menuOpen)}
        ref={menuButton}
        className="header-menu order-3 ml-2 flex size-11 items-center justify-center focus-visible:outline-2 min-[768px]:hidden max-[768px]:order-1 max-[768px]:ml-auto"
      >
        {menuOpen ? (
          <XIcon aria-hidden="true" size={22} />
        ) : (
          <MenuIcon aria-hidden="true" size={22} />
        )}
      </button>
      {menuOpen && (
        <nav
          id="header-navigation"
          aria-label="Main navigation"
          className="absolute inset-x-4 top-full mt-2 flex flex-col gap-1 rounded-2xl bg-[#F5F3EE] p-5 text-sm text-black shadow-lg sm:inset-x-8 min-[768px]:hidden"
        >
          {[
            ["Shop", "/collections"],
            ["Collections", "/collections"],
            ["New Drops", "/#featured-drops"],
            ["About", "/about"],
            ["Men", "/collections/men"],
            ["Women", "/collections/women"],
            ["Search", "/search"],
            ["Account", "/account"],
            ["Wishlist", "/wishlist"],
          ].map(([label, href]) => (
            <Link
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="p-3 hover:bg-black/5 focus-visible:outline-2"
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
