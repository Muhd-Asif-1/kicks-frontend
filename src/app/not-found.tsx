import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found | Kicks",
  description: "This page couldn’t be found. Find your next favourite at Kicks.",
};

export default function NotFound() {
  return (
    <main
      data-page="not-found"
      className="flex min-h-dvh flex-1 flex-col items-center justify-center bg-[#F5F3EE] px-6 pt-32 pb-16 text-center text-[#171715] sm:pt-36 sm:pb-20"
    >
      <p className="text-[10px] font-medium tracking-[0.24em] sm:text-[11px]">PAGE NOT FOUND</p>
      <p
        aria-hidden="true"
        className="mt-6 pr-[0.07em] text-[clamp(8rem,28vw,21rem)] leading-[0.85] font-medium tracking-[-0.07em] sm:mt-8"
      >
        404
      </p>
      <h1 className="mt-9 text-[clamp(1.75rem,4vw,2.5rem)] leading-tight font-medium tracking-[-0.045em] sm:mt-12">
        <span className="sr-only">404 — Page not found. </span>A step off track.
      </h1>
      <p className="mt-4 max-w-80 text-sm leading-relaxed text-[#5F5C55] sm:max-w-sm sm:text-base">
        We couldn’t find this page. Your next favourite is still out there.
      </p>
      <Link
        href="/"
        className="group mt-8 inline-flex min-h-14 items-center justify-center gap-10 bg-[#171715] px-7 py-4 text-[11px] font-medium tracking-[0.14em] text-[#F5F3EE] transition-colors duration-200 hover:bg-[#3B3933] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#171715] motion-reduce:transition-none"
      >
        BACK TO HOME
        <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={1.5} />
      </Link>
      <div className="mt-10 w-full max-w-64 border-t border-[#DAD6CE] pt-4 sm:mt-12">
        <Link
          href="/#featured-drops"
          className="inline-flex min-h-11 items-center text-xs text-[#5F5C55] underline-offset-4 hover:text-[#171715] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#171715]"
        >
          Explore the latest drops
        </Link>
      </div>
    </main>
  );
}
