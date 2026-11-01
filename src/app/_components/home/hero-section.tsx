"use client";

import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Image, { type ImageProps } from "next/image";
import Link from "next/link";

type HeroSectionProps = {
  collectionHref: string;
  imageSrc?: ImageProps["src"];
};

export default function HeroSection({
  collectionHref,
  // Temporary photograph; replace this file or pass the final campaign image.
  // Source: https://images.unsplash.com/photo-1549298916-b41d501d3772
  imageSrc = "/images/home-campaign.jpg",
}: HeroSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative isolate flex min-h-dvh w-full flex-none items-end overflow-hidden bg-[#171715] text-[#f4f0e8]">
      <motion.div
        className="absolute inset-0 -z-20"
        initial={false}
        animate={{ scale: shouldReduceMotion ? 1 : [1.045, 1] }}
        transition={{ duration: shouldReduceMotion ? 0 : 1.8, ease: [0.2, 0.65, 0.3, 1] }}
      >
        <Image
          src={imageSrc}
          alt=""
          fill
          sizes="100vw"
          preload
          className="object-cover object-[62%_center] sm:object-[center_60%]"
        />
      </motion.div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(12,12,10,0.76)_0%,rgba(12,12,10,0.42)_48%,rgba(12,12,10,0.06)_100%),linear-gradient(0deg,rgba(12,12,10,0.55)_0%,transparent_70%)] max-sm:bg-[linear-gradient(0deg,rgba(12,12,10,0.88)_0%,rgba(12,12,10,0.48)_65%,rgba(12,12,10,0.12)_100%)]"
      />

      <div className="w-full px-6 py-12 sm:px-10 sm:py-14 lg:px-16 lg:py-16 xl:px-20">
        <div className="max-w-2xl">
          <p className="mb-6 text-[10px] font-medium tracking-[0.24em] sm:mb-7 sm:text-xs sm:tracking-[0.28em]">
            THE NEW STANDARD OF EVERYDAY
          </p>
          <h1 className="text-[clamp(2.5rem,10.5vw,4rem)] leading-[0.94] font-semibold tracking-[-0.055em] sm:text-[4.5rem] lg:text-[5.5rem]">
            <span className="block">STEP INTO</span>
            <span className="block">SOMETHING</span>
            <span className="block">DIFFERENT.</span>
          </h1>
          <p className="mt-6 max-w-[21rem] text-sm leading-relaxed text-[#f4f0e8]/85 sm:mt-7 sm:max-w-sm sm:text-base">
            Discover sneakers that move with your style. Curated for those who never settle.
          </p>
          <Link
            href={collectionHref}
            prefetch={false}
            className="group mt-8 inline-flex min-h-14 items-center justify-center gap-8 bg-[#f4f0e8] px-6 py-4 text-[11px] font-semibold tracking-[0.16em] text-[#171715] transition-colors duration-300 hover:bg-[#ded7ca] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f4f0e8] motion-reduce:transition-none sm:mt-9 sm:gap-10 sm:px-7"
          >
            EXPLORE COLLECTION
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none"
              strokeWidth={1.5}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
