"use client";

import { ArrowRight, Mouse, Pause, Play } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useEffectEvent, useRef, useState } from "react";
import { priceFormat } from "@/lib/price";
import { HeroProductInfo, HeroProductStage, SneakerSelector } from "./hero-product-stage";
import { heroProducts } from "./hero-products";
import { useHeroAnimations } from "./use-hero-animations";
import "./hero.css";

// Failed decodes are evicted so selecting again retries. No network work during SSR.
const decodedImages = new Map<number, Promise<void>>();
function warmImage(index: number) {
  let pending = decodedImages.get(index);
  if (!pending) {
    const image = new window.Image();
    image.src = heroProducts[index].image;
    pending = image.decode().catch((error: unknown) => {
      decodedImages.delete(index);
      throw error;
    });
    decodedImages.set(index, pending);
  }
  return pending;
}

export default function HeroSection() {
  const root = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState(0);
  const [active, setActive] = useState(0);
  const [desired, setDesired] = useState(0);
  const [incoming, setIncoming] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const product = heroProducts[current];
  const activeProduct = heroProducts[active];
  const nextProduct = incoming === null ? null : heroProducts[incoming];
  const complete = useCallback((index: number) => {
    setCurrent(index);
    setActive(index);
    setIncoming(null);
  }, []);
  useHeroAnimations(root, current, incoming, setActive, complete);

  // Read the latest selection without restarting the two-second clock on every transition.
  const advance = useEffectEvent(() => {
    if (
      paused ||
      reduceMotion ||
      error ||
      document.hidden ||
      incoming !== null ||
      desired !== current ||
      root.current?.querySelector(
        ".hero-selector:hover, .hero-product-link:hover, .hero-selector:focus, .hero-product-link:focus",
      )
    )
      return;
    setDesired((current + 1) % heroProducts.length);
  });

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReduceMotion(motion.matches);
    updateMotion();
    motion.addEventListener("change", updateMotion);
    let visible = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting && entry.intersectionRatio >= 0.3;
      },
      { threshold: 0.3 },
    );
    observer.observe(element);
    const timer = window.setInterval(() => {
      if (visible && !motion.matches) advance();
    }, 2000);
    return () => {
      window.clearInterval(timer);
      observer.disconnect();
      motion.removeEventListener("change", updateMotion);
    };
  }, []);

  useEffect(() => {
    if (desired === current || incoming !== null) return;
    let cancelled = false;
    void warmImage(desired)
      .then(() => {
        if (!cancelled) setIncoming(desired);
      })
      .catch(() => {
        if (!cancelled) {
          setError("This colorway could not load. Please try again.");
          setPaused(true);
          setDesired(current);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [desired, current, incoming]);

  useEffect(() => {
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }
    ).connection;
    if (connection?.saveData || connection?.effectiveType?.includes("2g")) return;
    const timeout = window.setTimeout(() => {
      if (!document.hidden) for (const index of [1, 2]) void warmImage(index).catch(() => {});
    }, 2400);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <section
      ref={root}
      className="kicks-hero"
      aria-labelledby="hero-heading"
      data-colorway={activeProduct.id}
    >
      <div className="hero-surfaces" aria-hidden="true">
        <div className="hero-dark-panel" />
        <div className="hero-word-clip hero-word-light">
          <div className="hero-word-scroll">
            <div className="hero-word-pointer">
              <span className="hero-word hero-word-solid">KICKS</span>
            </div>
          </div>
        </div>
        <div className="hero-word-clip hero-word-dark">
          <div className="hero-word-scroll">
            <div className="hero-word-pointer">
              <span className="hero-word hero-word-outline">KICKS</span>
            </div>
          </div>
        </div>
        <div className="hero-accent-scroll">
          <div className="hero-accent-pointer">
            <div className="hero-accent" />
          </div>
        </div>
      </div>
      <div className="hero-copy">
        <p className="hero-eyebrow">
          NEW DROP <span />
        </p>
        <h1 id="hero-heading">
          <span className="hero-line">
            <span>NEVER</span>
          </span>
          <span className="hero-line">
            <span>
              BLEND IN<span className="hero-period">.</span>
            </span>
          </span>
        </h1>
        <div className="hero-description-scroll">
          <p className="hero-description">
            Iconic sneakers. Timeless style.
            <br />
            Built for those who move different.
          </p>
        </div>
        <div className="hero-actions">
          <Link className="hero-primary" href="/#featured-drops">
            Explore the Drop <ArrowRight size={22} aria-hidden="true" />
          </Link>
          <button
            className="hero-campaign"
            type="button"
            disabled
            aria-describedby="campaign-unavailable"
          >
            <span>
              <Play size={16} fill="currentColor" aria-hidden="true" />
            </span>
            Watch Campaign
          </button>
          <span id="campaign-unavailable" className="sr-only">
            Campaign video is not available yet.
          </span>
        </div>
      </div>
      <HeroProductStage current={product} incoming={nextProduct} active={activeProduct} />
      <div className="hero-featured">
        <p className="hero-featured-label">FEATURED</p>
        <div className="hero-info-mask">
          <HeroProductInfo product={activeProduct} />
        </div>
        <div className="hero-progress">
          {heroProducts.map((item, index) => (
            <span key={item.id} aria-hidden="true" data-active={active === index} />
          ))}
          <button
            type="button"
            className="hero-autoplay"
            disabled={reduceMotion}
            aria-label={
              reduceMotion
                ? "Automatic shoe rotation disabled for reduced motion"
                : paused
                  ? "Play automatic shoe rotation"
                  : "Pause automatic shoe rotation"
            }
            onClick={() => setPaused((value) => !value)}
          >
            {paused || reduceMotion ? (
              <Play size={13} aria-hidden="true" />
            ) : (
              <Pause size={13} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
      <SneakerSelector
        active={active}
        onSelect={(index) => {
          setPaused(true);
          setError("");
          setDesired(index);
        }}
        onWarm={(index) => {
          void warmImage(index).catch(() => {});
        }}
      />
      <Link href="/#featured-drops" className="hero-scroll">
        <Mouse size={25} strokeWidth={1.2} aria-hidden="true" />
        <span>
          SCROLL
          <br />
          TO EXPLORE
        </span>
      </Link>
      <output
        className={error ? "hero-error" : "sr-only"}
        aria-live={paused || reduceMotion || error ? "polite" : "off"}
        aria-atomic="true"
      >
        {error || `${activeProduct.name}, ${activeProduct.colorway}, ${priceFormat.format(activeProduct.price)}`}
      </output>
    </section>
  );
}
