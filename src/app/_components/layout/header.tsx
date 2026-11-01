"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CartIcon } from "@/components/ui/cart";
import { HeartIcon } from "@/components/ui/heart";
import { MenuIcon } from "@/components/ui/menu";
import { SearchIcon } from "@/components/ui/search";
import { UserIcon } from "@/components/ui/user";
import { XIcon } from "@/components/ui/x";
import { cn } from "@/lib/utils";

const Header = () => {
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

  return (
    <header
      data-solid={isScrolled || menuOpen}
      className={cn(
        "kicks-header fixed inset-x-0 top-0 z-50 min-h-20 flex items-center justify-between p-1 px-4 sm:px-8 transition-[background-color,color,box-shadow] duration-300 motion-reduce:transition-none",
        isScrolled || menuOpen ? "text-black" : "bg-transparent text-white shadow-none",
      )}
    >
      <button
        type="button"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        aria-controls="header-navigation"
        onClick={() => setMenuOpen(!menuOpen)}
        className="flex size-11 items-center justify-center focus-visible:outline-2"
      >
        {menuOpen ? (
          <XIcon aria-hidden="true" size={22} />
        ) : (
          <MenuIcon aria-hidden="true" size={22} />
        )}
      </button>
      <Link
        href="/"
        aria-label="Kicks home"
        className="absolute left-1/2 h-16 w-28 -translate-x-1/2 sm:h-18 sm:w-36"
      >
        <Image
          src="/logo-black.png"
          alt="Kicks Logo"
          fill
          sizes="144px"
          className={cn(
            "transition-[filter] duration-300 motion-reduce:transition-none",
            !isScrolled && !menuOpen && "invert",
          )}
        />
      </Link>
      <nav aria-label="Account and shopping" className="flex items-center sm:gap-2">
        <Link
          href="/search"
          aria-label="Search"
          className="hidden size-11 items-center justify-center sm:flex"
        >
          <SearchIcon aria-hidden="true" size={22} />
        </Link>
        <Link
          href="/account"
          aria-label="Account"
          className="hidden size-11 items-center justify-center sm:flex"
        >
          <UserIcon aria-hidden="true" size={22} />
        </Link>
        <Link
          href="/wishlist"
          aria-label="Wishlist"
          className="hidden size-11 items-center justify-center sm:flex"
        >
          <HeartIcon aria-hidden="true" size={22} />
        </Link>
        <Link
          href="/cart"
          aria-label="Shopping cart"
          className="flex size-11 items-center justify-center"
        >
          <CartIcon aria-hidden="true" size={22} />
        </Link>
      </nav>
      {menuOpen && (
        <nav
          id="header-navigation"
          aria-label="Main navigation"
          onKeyDown={(event) => {
            if (event.key === "Escape") setMenuOpen(false);
          }}
          className="absolute inset-x-4 top-full mt-2 flex flex-col gap-1 rounded-2xl bg-[#F5F3EE] p-5 text-sm text-black shadow-lg sm:inset-x-8"
        >
          {[
            ["Featured drops", "/#featured-drops"],
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
