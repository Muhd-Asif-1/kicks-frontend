"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { HeartIcon } from "@/components/ui/heart";
import { cn } from "@/lib/utils";
import { type FeaturedDrop, featuredDrops } from "./featured-drops-data";
import ProductImage from "./product-images";

const priceFormat = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onChange: () => void) {
  const preference = window.matchMedia(reducedMotionQuery);
  preference.addEventListener("change", onChange);
  return () => preference.removeEventListener("change", onChange);
}

function getReducedMotion() {
  return window.matchMedia(reducedMotionQuery).matches;
}

// The server snapshot also runs during hydration, keeping the controls' markup identical.
function getServerReducedMotion() {
  return false;
}

function wrapIndex(index: number, count: number) {
  return ((index % count) + count) % count;
}

export default function FeaturedDrops({
  products = featuredDrops,
}: {
  products?: readonly FeaturedDrop[];
}) {
  const cycleStart = products.length > 1 ? products.length : 0;
  const [activeSlide, setActiveSlide] = useState(cycleStart + Math.min(2, products.length - 1));
  const activeIndex = products.length ? wrapIndex(activeSlide, products.length) : 0;
  const [isPaused, setIsPaused] = useState(false);
  const [wishlist, setWishlist] = useState<Set<string>>(() => new Set());
  const trackRef = useRef<HTMLElement>(null);
  const indexRef = useRef(activeSlide);
  const navigateRef = useRef<(index: number) => void>(() => {});
  const reduceMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotion,
    getServerReducedMotion,
  );
  const headingId = useId();
  const trackId = useId();

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !products.length) return;

    const slides = Array.from(track.querySelectorAll<HTMLButtonElement>("[data-drop]"));
    const section = track.parentElement?.closest("section");
    let visible = false;
    let hovering = false;
    let interacting = false;
    let automaticScroll = false;
    let lastInteraction = 0;
    let scrollFrame = 0;
    let settleTimer: ReturnType<typeof setTimeout>;
    let drag: { id: number; x: number; left: number; moved: boolean } | null = null;
    let suppressClick = false;

    const nearestIndex = () => {
      const centre = track.scrollLeft + track.clientWidth / 2;
      return slides.reduce(
        (nearest, slide, index) =>
          Math.abs(slide.offsetLeft + slide.clientWidth / 2 - centre) <
          Math.abs(slides[nearest].offsetLeft + slides[nearest].clientWidth / 2 - centre)
            ? index
            : nearest,
        0,
      );
    };

    const goTo = (index: number, instant = false) => {
      const target = Math.max(0, Math.min(index, slides.length - 1));
      const slide = slides[target];
      track.scrollTo({
        left: slide.offsetLeft - (track.clientWidth - slide.clientWidth) / 2,
        behavior: instant || reduceMotion ? "instant" : "smooth",
      });
      if (instant) {
        automaticScroll = true;
        clearTimeout(settleTimer);
        settleTimer = setTimeout(() => {
          automaticScroll = false;
        }, 180);
        indexRef.current = target;
        setActiveSlide(target);
      }
    };

    const interrupt = () => {
      lastInteraction = Date.now();
      if (automaticScroll) {
        automaticScroll = false;
        track.scrollTo({ left: track.scrollLeft, behavior: "instant" });
      }
    };

    navigateRef.current = (index) => {
      interrupt();
      goTo(index);
    };

    const onScroll = () => {
      if (!automaticScroll) lastInteraction = Date.now();
      cancelAnimationFrame(scrollFrame);
      scrollFrame = requestAnimationFrame(() => {
        const next = nearestIndex();
        if (next !== indexRef.current) {
          indexRef.current = next;
          setActiveSlide(next);
        }
      });
      clearTimeout(settleTimer);
      settleTimer = setTimeout(() => {
        automaticScroll = false;
        if (interacting || drag?.moved) return;
        const nearest = nearestIndex();
        const canonical = cycleStart + wrapIndex(nearest, products.length);
        if (nearest !== canonical) {
          // Identical neighbouring cycles make this reset invisible, in either direction.
          const hadFocus = document.activeElement === slides[nearest];
          goTo(canonical, true);
          if (hadFocus) slides[canonical].focus({ preventScroll: true });
        }
      }, 180);
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return;
      interrupt();
      interacting = true;
      suppressClick = false;
      if (event.pointerType === "mouse") {
        drag = { id: event.pointerId, x: event.clientX, left: track.scrollLeft, moved: false };
      }
    };
    const onPointerMove = (event: PointerEvent) => {
      if (!drag || drag.id !== event.pointerId) return;
      const distance = event.clientX - drag.x;
      if (Math.abs(distance) > 5 && !drag.moved) {
        drag.moved = true;
        track.setPointerCapture(event.pointerId);
        track.style.scrollSnapType = "none";
      }
      if (drag.moved) {
        event.preventDefault();
        track.scrollLeft = drag.left - distance;
      }
    };
    const onPointerEnd = () => {
      interacting = false;
      lastInteraction = Date.now();
      if (drag?.moved) {
        suppressClick = true;
        track.style.scrollSnapType = "";
        if (track.hasPointerCapture(drag.id)) track.releasePointerCapture(drag.id);
        goTo(nearestIndex());
      }
      drag = null;
    };
    const onClick = (event: MouseEvent) => {
      if (suppressClick) {
        event.preventDefault();
        event.stopPropagation();
        suppressClick = false;
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      const target =
        event.key === "ArrowRight"
          ? indexRef.current + 1
          : event.key === "ArrowLeft"
            ? indexRef.current - 1
            : event.key === "Home"
              ? cycleStart
              : event.key === "End"
                ? cycleStart + products.length - 1
                : null;
      if (target === null) return;
      event.preventDefault();
      navigateRef.current(target);
      slides[cycleStart + wrapIndex(target, products.length)].focus({ preventScroll: true });
    };
    const onPointerEnter = (event: PointerEvent) => {
      if (event.pointerType === "mouse") hovering = true;
    };
    const onPointerLeave = () => {
      hovering = false;
      lastInteraction = Date.now();
      if (drag && !drag.moved) onPointerEnd();
    };

    goTo(cycleStart + wrapIndex(indexRef.current, products.length), true);
    const resizeObserver = new ResizeObserver(() => goTo(indexRef.current, true));
    resizeObserver.observe(track);
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting && entry.intersectionRatio >= 0.3;
      },
      { threshold: 0.3 },
    );
    observer.observe(track);
    const timer = setInterval(() => {
      if (
        isPaused ||
        reduceMotion ||
        !visible ||
        document.hidden ||
        hovering ||
        interacting ||
        automaticScroll ||
        section?.querySelector(":focus-visible") ||
        products.length < 2 ||
        Date.now() - lastInteraction < 5000
      )
        return;
      automaticScroll = true;
      goTo(indexRef.current + 1);
    }, 4500);

    track.addEventListener("scroll", onScroll, { passive: true });
    track.addEventListener("wheel", interrupt, { passive: true });
    track.addEventListener("pointerdown", onPointerDown);
    track.addEventListener("pointermove", onPointerMove);
    track.addEventListener("pointerup", onPointerEnd);
    track.addEventListener("pointercancel", onPointerEnd);
    track.addEventListener("pointerenter", onPointerEnter);
    track.addEventListener("pointerleave", onPointerLeave);
    track.addEventListener("click", onClick, true);
    track.addEventListener("keydown", onKeyDown);
    section?.addEventListener("pointerdown", interrupt, { passive: true });
    section?.addEventListener("focusin", interrupt);
    return () => {
      clearInterval(timer);
      clearTimeout(settleTimer);
      cancelAnimationFrame(scrollFrame);
      resizeObserver.disconnect();
      observer.disconnect();
      track.style.scrollSnapType = "";
      track.removeEventListener("scroll", onScroll);
      track.removeEventListener("wheel", interrupt);
      track.removeEventListener("pointerdown", onPointerDown);
      track.removeEventListener("pointermove", onPointerMove);
      track.removeEventListener("pointerup", onPointerEnd);
      track.removeEventListener("pointercancel", onPointerEnd);
      track.removeEventListener("pointerenter", onPointerEnter);
      track.removeEventListener("pointerleave", onPointerLeave);
      track.removeEventListener("click", onClick, true);
      track.removeEventListener("keydown", onKeyDown);
      section?.removeEventListener("pointerdown", interrupt);
      section?.removeEventListener("focusin", interrupt);
      navigateRef.current = () => {};
    };
  }, [products, cycleStart, isPaused, reduceMotion]);

  const product = products[Math.max(0, Math.min(activeIndex, products.length - 1))];
  if (!product) return null;

  return (
    <section
      id="featured-drops"
      aria-labelledby={headingId}
      className="relative isolate overflow-hidden bg-[#F5F3EE] pb-14 pt-16 text-[#171715] sm:pb-20 sm:pt-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(23,23,21,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(23,23,21,0.035)_1px,transparent_1px)] bg-size-[64px_64px] mask-[linear-gradient(transparent,black_35%,transparent_80%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[48%] overflow-hidden [perspective:480px]"
      >
        <div className="absolute -inset-x-1/2 top-0 h-[220%] origin-top bg-[linear-gradient(rgba(23,23,21,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(23,23,21,0.09)_1px,transparent_1px)] bg-size-[64px_56px] [transform:rotateX(58deg)] mask-[linear-gradient(transparent,black_18%)]" />
      </div>

      <div className="relative px-6 text-center">
        <p className="mb-4 text-[10px] font-medium tracking-[0.28em]">THE KICKS EDIT / 001</p>
        <h2
          id={headingId}
          className="text-4xl font-semibold tracking-[-0.06em] sm:text-6xl lg:text-7xl"
        >
          Next in rotation.
        </h2>
        <p className="mt-4 text-sm text-black/55">
          A few standouts. An entirely different point of view.
        </p>
      </div>

      <div className="relative mt-5 [--drop-width:56vw] sm:mt-8 sm:[--drop-width:42vw] lg:[--drop-width:30vw]">
        <div
          aria-hidden="true"
          className="absolute bottom-6 left-1/2 h-10 w-[calc(var(--drop-width)*1.3)] max-w-[620px] -translate-x-1/2 rounded-[50%] bg-black/10 blur-xl"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-10 left-1/2 h-14 w-[calc(var(--drop-width)*1.45)] max-w-[680px] -translate-x-1/2 rounded-[50%] bg-[linear-gradient(#fffdf8,#ddd9d0)] shadow-[0_12px_24px_-12px_rgba(0,0,0,0.22)] sm:bottom-8 sm:h-20"
        />
        <section
          ref={trackRef}
          id={trackId}
          aria-roledescription="carousel"
          aria-label="Featured sneakers. Swipe, drag, or use arrow keys to explore."
          className="relative flex cursor-grab snap-x snap-mandatory overflow-x-auto overflow-y-hidden px-[calc((100%-var(--drop-width))/2)] [scrollbar-width:none] active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
        >
          {Array.from({ length: products.length > 1 ? 3 : 1 }, (_, cycle) =>
            products.map((drop, productIndex) => {
              const index = cycle * products.length + productIndex;
              const duplicate = cycle * products.length !== cycleStart;
              const active = productIndex === activeIndex;
              return (
                <button
                  key={`${cycle}-${drop.id}`}
                  data-drop
                  data-product-index={productIndex}
                  type="button"
                  aria-hidden={duplicate || undefined}
                  tabIndex={!duplicate && active ? 0 : -1}
                  aria-label={`Feature ${drop.name}, ${productIndex + 1} of ${products.length}`}
                  aria-current={!duplicate && active ? "true" : undefined}
                  onClick={() => navigateRef.current(index)}
                  className="relative flex h-[290px] w-[var(--drop-width)] flex-none snap-center select-none items-center justify-center focus-visible:outline-2 focus-visible:-outline-offset-8 focus-visible:outline-black/40 sm:h-[380px] lg:h-[420px]"
                >
                  <motion.div
                    initial={false}
                    animate={{
                      scale: active ? 1 : 0.61,
                      opacity: active ? 1 : 0.48,
                      y: active ? -8 : 10,
                    }}
                    transition={{ duration: reduceMotion ? 0 : 0.65, ease: [0.22, 0.61, 0.36, 1] }}
                    className="relative h-full w-full"
                  >
                    <ProductImage
                      product={drop}
                      alt={drop.name}
                      sizes="(max-width: 639px) 70vw, (max-width: 1023px) 53vw, 38vw"
                      className="pointer-events-none scale-125 object-contain p-3 drop-shadow-[0_12px_10px_rgba(0,0,0,0.1)] sm:p-0"
                    />
                  </motion.div>
                </button>
              );
            }),
          )}
        </section>
      </div>

      <div className="relative mx-auto mt-4 max-w-[440px] px-6 sm:mt-6 sm:px-0">
        <div className="overflow-hidden rounded-2xl bg-[#fffdf9]/95 shadow-[0_12px_48px_-20px_rgba(23,23,21,0.18)]">
          <div className="flex min-h-[126px] items-start justify-between gap-4 p-5 sm:p-6">
            <div aria-live={isPaused || reduceMotion ? "polite" : "off"} aria-atomic="true">
              <p className="text-[9px] tracking-[0.18em] text-black/45">{product.category}</p>
              <h3 className="mt-2 text-sm font-medium sm:text-base">{product.name}</h3>
              <div className="mt-3 flex items-center gap-3 text-sm">
                <span>{priceFormat.format(product.price)}</span>
                {product.originalPrice && (
                  <del className="text-xs text-black/40">
                    <span className="sr-only">Original price </span>
                    {priceFormat.format(product.originalPrice)}
                  </del>
                )}
              </div>
            </div>
            <button
              type="button"
              aria-label={`${wishlist.has(product.id) ? "Remove" : "Save"} ${product.name} ${wishlist.has(product.id) ? "from" : "to"} wishlist`}
              aria-pressed={wishlist.has(product.id)}
              onClick={() =>
                setWishlist((previous) => {
                  const next = new Set(previous);
                  if (next.has(product.id)) next.delete(product.id);
                  else next.add(product.id);
                  return next;
                })
              }
              className="-mr-2 -mt-2 flex size-11 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-black/5 focus-visible:outline-2 motion-reduce:transition-none"
            >
              <HeartIcon
                size={18}
                aria-hidden="true"
                className={cn("size-[18px]", wishlist.has(product.id) && "[&_svg]:fill-current")}
              />
            </button>
          </div>
          <Link
            href={product.href}
            prefetch={false}
            className="flex min-h-14 items-center justify-center gap-3 bg-[#171715] px-5 text-xs font-medium tracking-[0.12em] text-[#F5F3EE] transition-colors hover:bg-[#35352f] focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-white motion-reduce:transition-none"
          >
            EXPLORE <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={1.5} />
          </Link>
        </div>
        <div className="mt-6 flex items-center justify-between text-black/50">
          <button
            type="button"
            aria-label="Previous featured product"
            aria-controls={trackId}
            disabled={products.length < 2}
            onClick={() => navigateRef.current(indexRef.current - 1)}
            className="flex size-11 items-center justify-center rounded-full hover:bg-black/5 focus-visible:outline-2 disabled:opacity-25"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
          </button>
          <span className="text-[10px] tracking-[0.2em]">
            {String(activeIndex + 1).padStart(2, "0")} <span className="mx-2 text-black/20">/</span>{" "}
            {String(products.length).padStart(2, "0")}
          </span>
          <div className="flex">
            <button
              type="button"
              aria-label={
                isPaused ? "Play automatic product rotation" : "Pause automatic product rotation"
              }
              aria-pressed={isPaused}
              disabled={!!reduceMotion}
              onClick={() => setIsPaused((paused) => !paused)}
              className="flex size-11 items-center justify-center rounded-full hover:bg-black/5 focus-visible:outline-2 disabled:opacity-25"
            >
              {isPaused || reduceMotion ? (
                <Play aria-hidden="true" className="size-3.5" />
              ) : (
                <Pause aria-hidden="true" className="size-3.5" />
              )}
            </button>
            <button
              type="button"
              aria-label="Next featured product"
              aria-controls={trackId}
              disabled={products.length < 2}
              onClick={() => navigateRef.current(indexRef.current + 1)}
              className="flex size-11 items-center justify-center rounded-full hover:bg-black/5 focus-visible:outline-2 disabled:opacity-25"
            >
              <ArrowRight aria-hidden="true" className="size-4" />
            </button>
          </div>
        </div>
        <p className="mt-1 text-center text-[9px] tracking-[0.16em] text-black/35">
          DRAG TO DISCOVER
        </p>
      </div>
    </section>
  );
}
