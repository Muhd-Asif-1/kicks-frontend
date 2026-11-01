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
    <output ref={overlay} className="kicks-preloader" aria-label="Loading Kicks">
      <Image src="/logo-black.png" alt="" width={180} height={90} preload />
      <span className="preloader-line" aria-hidden="true" />
    </output>
  );
}
