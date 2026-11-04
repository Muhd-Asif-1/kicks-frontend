"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function Preloader() {
  const overlay = useRef<HTMLOutputElement>(null);
  useEffect(() => {
    const element = overlay.current;
    if (!element) return;
    let cancelled = false;
    const reveal = async () => {
      // Wait only for the visible hero and fonts, never for below-the-fold media.
      const hero = document.querySelector<HTMLImageElement>("main section img");
      await Promise.allSettled([document.fonts.ready, hero?.decode()]);
      if (cancelled) return;
      element.dataset.ready = "true";
      element.setAttribute("aria-hidden", "true");
    };
    void reveal();
    return () => {
      cancelled = true;
    };
  }, []);
  return (
    <output
      ref={overlay}
      className="kicks-preloader pointer-events-none fixed inset-0 z-100 flex animate-[preloader-fallback_0s_8s_forwards] flex-col items-center justify-center gap-6 bg-[#f5f3ee] [transition:opacity_400ms_ease,visibility_400ms] data-[ready=true]:invisible data-[ready=true]:opacity-0 motion-reduce:transition-none"
      aria-label="Loading Kicks"
    >
      <Image src="/logo-black.png" alt="" width={180} height={90} preload />
      <span
        className="preloader-line h-px w-[100px] overflow-hidden bg-[#17171520] after:block after:h-full after:w-[45%] after:animate-[loading-line_1.2s_ease-in-out_infinite] after:bg-[#171715] after:content-[''] motion-reduce:after:w-full motion-reduce:after:animate-none"
        aria-hidden="true"
      />
    </output>
  );
}
