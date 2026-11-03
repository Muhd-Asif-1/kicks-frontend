"use client";

import { ArrowRight, Mouse, Play } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
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
  const [desired, setDesired] = useState(0);
  const [incoming, setIncoming] = useState<number | null>(null);
  const [error, setError] = useState("");
  const product = heroProducts[current];
  const nextProduct = incoming === null ? null : heroProducts[incoming];
  const complete = useCallback((index: number) => {
    setCurrent(index);
    setIncoming(null);
  }, []);
  useHeroAnimations(root, current, incoming, complete);

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
      data-colorway={product.id}
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
      <HeroProductStage current={product} incoming={nextProduct} />
      <div className="hero-featured">
        <p className="hero-featured-label">FEATURED</p>
        <div className="hero-info-mask">
          <HeroProductInfo product={product} slot="current" />
          {nextProduct && <HeroProductInfo product={nextProduct} slot="incoming" />}
        </div>
        <div className="hero-progress" aria-hidden="true">
          {heroProducts.map((item, index) => (
            <span key={item.id} data-active={(incoming ?? current) === index} />
          ))}
        </div>
      </div>
      <SneakerSelector
        active={incoming ?? current}
        onSelect={(index) => {
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
      <output className={error ? "hero-error" : "sr-only"} aria-live="polite" aria-atomic="true">
        {error || `${product.name}, ${product.colorway}, $${product.price}`}
      </output>
    </section>
  );
}
