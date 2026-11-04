"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RefObject } from "react";
import { heroProducts } from "./hero-products";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function useHeroAnimations(
  root: RefObject<HTMLElement | null>,
  current: number,
  incoming: number | null,
  handoff: (index: number) => void,
  complete: (index: number) => void,
) {
  useGSAP(
    () => {
      const element = root.current;
      if (!element) return;
      const select = gsap.utils.selector(element);
      const media = gsap.matchMedia();
      let alive = true;

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const entrance = gsap.timeline({
          defaults: { ease: "power3.out" },
          onComplete: () => {
            // Release initial inline values so responsive CSS still owns the resting layout.
            gsap.set(
              select(
                ".hero-dark-panel,.hero-word-entrance,.hero-eyebrow,.hero-line > span,.hero-description,.hero-shoe-entrance,.hero-featured,.hero-selector-entrance,.hero-actions,.hero-scroll",
              ),
              { clearProps: "transform,opacity" },
            );
          },
        });
        entrance
          .from(select(".hero-dark-panel"), { opacity: 0.6, duration: 0.9 }, 0)
          .from(select(".hero-word-entrance"), { y: 35, opacity: 0, duration: 1.1 }, 0)
          .from(select(".hero-eyebrow"), { opacity: 0, y: 12, duration: 0.7 }, 0.1)
          .from(select(".hero-line > span"), { yPercent: 110, duration: 0.85, stagger: 0.1 }, 0.15)
          .from(select(".hero-description"), { y: 15, opacity: 0, duration: 0.7 }, 0.45)
          .from(
            select(".hero-shoe-entrance"),
            { scale: 0.88, rotation: 9, opacity: 0, duration: 1.25 },
            0.2,
          )
          .from(select(".hero-featured"), { y: 18, opacity: 0, duration: 0.7 }, 0.7)
          .from(
            select(".hero-selector-entrance"),
            { y: 15, opacity: 0, duration: 0.6, stagger: 0.09 },
            0.8,
          )
          .from(select(".hero-actions"), { y: 12, opacity: 0, duration: 0.6 }, 0.8)
          .from(select(".hero-scroll"), { opacity: 0, duration: 0.5 }, 1.05);

        // Starting a product switch or scrolling should never wait for the entrance.
        const finishEntrance = () => {
          entrance.progress(1);
        };
        const onScroll = () => {
          if (window.scrollY > 30) finishEntrance();
        };
        element.addEventListener("pointerdown", finishEntrance, { passive: true });
        element.addEventListener("keydown", finishEntrance);
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();

        const scroll = gsap.timeline({
          scrollTrigger: {
            trigger: element,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
          defaults: { ease: "none" },
        });
        scroll
          .to(
            select(".hero-shoe-scroll"),
            { y: () => -Math.min(element.clientHeight * 0.16, 140), scale: 0.91 },
            0,
          )
          .to(select(".hero-word-scroll"), { y: -65 }, 0)
          .to(select(".hero-accent-scroll"), { y: -35 }, 0)
          .to(select(".hero-description-scroll"), { opacity: 0.25, y: -15 }, 0);

        const float = gsap.to(select(".hero-scroll svg"), {
          y: 5,
          duration: 1.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          paused: true,
        });
        let visible = false;
        const updateActivity = () => {
          if (document.hidden || !visible) float.pause();
          else float.resume();
          if (document.hidden) finishEntrance();
        };
        const observer = new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting;
          updateActivity();
        });
        observer.observe(element);
        document.addEventListener("visibilitychange", updateActivity);
        return () => {
          observer.disconnect();
          document.removeEventListener("visibilitychange", updateActivity);
          element.removeEventListener("pointerdown", finishEntrance);
          element.removeEventListener("keydown", finishEntrance);
          window.removeEventListener("scroll", onScroll);
        };
      });

      media.add(
        "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
        () => {
          const layers = [
            [".hero-shoe-pointer", 14],
            [".hero-word-pointer", 6],
            [".hero-accent-pointer", 4],
          ] as const;
          const moves = layers.map(([selector, range]) => ({
            range,
            x: gsap.quickTo(select(selector), "x", { duration: 0.65, ease: "power3.out" }),
            y: gsap.quickTo(select(selector), "y", { duration: 0.65, ease: "power3.out" }),
          }));
          let bounds = element.getBoundingClientRect();
          const measure = () => {
            bounds = element.getBoundingClientRect();
          };
          const move = (event: PointerEvent) => {
            if (event.pointerType !== "mouse") return;
            const x = Math.max(
              -1,
              Math.min(1, ((event.clientX - bounds.left) / bounds.width - 0.5) * 2),
            );
            const y = Math.max(
              -1,
              Math.min(1, ((event.clientY - bounds.top) / bounds.height - 0.5) * 2),
            );
            for (const layer of moves) {
              layer.x(x * layer.range);
              layer.y(y * layer.range);
            }
          };
          const reset = () => {
            for (const layer of moves) {
              layer.x(0);
              layer.y(0);
            }
          };
          element.addEventListener("pointerenter", measure);
          element.addEventListener("pointermove", move);
          element.addEventListener("pointerleave", reset);
          window.addEventListener("resize", measure);
          window.addEventListener("scroll", measure, { passive: true });
          return () => {
            element.removeEventListener("pointerenter", measure);
            element.removeEventListener("pointermove", move);
            element.removeEventListener("pointerleave", reset);
            window.removeEventListener("resize", measure);
            window.removeEventListener("scroll", measure);
          };
        },
      );

      const refresh = () => {
        if (alive) ScrollTrigger.refresh();
      };
      void Promise.allSettled([
        document.fonts.ready,
        element.querySelector<HTMLImageElement>(".hero-stage img")?.decode(),
      ]).then(refresh);
      return () => {
        alive = false;
        media.revert();
      };
    },
    { scope: root },
  );

  useGSAP(
    () => {
      if (incoming === null || !root.current) return;
      const select = gsap.utils.selector(root.current);
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (reduce.matches) {
        complete(incoming);
        return;
      }
      const direction = incoming > current ? 1 : -1;
      const timeline = gsap.timeline({
        defaults: { duration: 0.65, ease: "power2.inOut" },
        onComplete: () => complete(incoming),
      });
      timeline
        .to(
          select(".hero-shoe-current"),
          { x: -12 * direction, y: -4, rotation: -2 * direction, scale: 0.98, opacity: 0 },
          0,
        )
        .fromTo(
          select(".hero-shoe-incoming"),
          { x: 12 * direction, y: 4, rotation: 2 * direction, scale: 0.98, opacity: 0 },
          { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 },
          0,
        )
        // Both shoes have equal visual weight at this point; hand off every product field together.
        .to(select(".hero-product-details"), { y: -8, opacity: 0.65, duration: 0.12 }, 0.205)
        .call(() => handoff(incoming), [], 0.325)
        .fromTo(
          select(".hero-product-details"),
          { y: 8, opacity: 0.65 },
          { y: 0, opacity: 1, duration: 0.18, immediateRender: false },
          0.325,
        )
        .to(root.current, { "--hero-accent": heroProducts[incoming].accent }, 0);
      const onReduce = () => {
        if (reduce.matches) timeline.progress(1);
      };
      reduce.addEventListener("change", onReduce);
      return () => {
        reduce.removeEventListener("change", onReduce);
      };
    },
    { scope: root, dependencies: [incoming, current, handoff, complete], revertOnUpdate: true },
  );
}
