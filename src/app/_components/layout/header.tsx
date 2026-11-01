"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { CartIcon } from "@/components/ui/cart";
import { HeartIcon } from "@/components/ui/heart";
import { MenuIcon } from "@/components/ui/menu";
import { UserIcon } from "@/components/ui/user";
import { cn } from "@/lib/utils";

const Header = () => {
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
      className={cn(
        "fixed inset-x-0 top-0 z-50 flex items-center justify-between p-1 px-8 transition-[background-color,color,box-shadow] duration-300 motion-reduce:transition-none",
        isScrolled
          ? "bg-[#F5F3EE] text-black shadow-[0_1px_0_rgba(23,23,21,0.08)]"
          : "bg-transparent text-white shadow-none",
      )}
    >
      <div>
        <MenuIcon className="h-6 w-6" size={24} />
      </div>
      <div className="relative h-18 w-36">
        <Image
          src="/logo-black.png"
          alt="Kicks Logo"
          fill
          sizes="144px"
          className={cn(
            "transition-[filter] duration-300 motion-reduce:transition-none",
            !isScrolled && "invert",
          )}
        />
      </div>
      <div className="flex items-center gap-4">
        <UserIcon className="h-6 w-6" size={24} />
        <HeartIcon className="h-6 w-6" size={24} />
        <CartIcon className="h-6 w-6" size={24} />
      </div>
    </header>
  );
};

export default Header;
