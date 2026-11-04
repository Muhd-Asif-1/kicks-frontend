"use client";

import { ArrowRight, Mouse, Pause, Play } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useEffectEvent, useRef, useState } from "react";
import { priceFormat } from "@/lib/price";
import { HeroProductInfo, HeroProductStage, SneakerSelector } from "./hero-product-stage";
import { heroProducts } from "./hero-products";
import { useHeroAnimations } from "./use-hero-animations";

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
      className="kicks-hero relative isolate h-[100svh] min-h-[760px] max-h-[1150px] overflow-x-clip bg-[var(--hero-bg)] text-[#101010] min-[768px]:max-[1200px]:min-h-[960px] min-[768px]:max-[1200px]:max-h-[1000px] max-[768px]:flex max-[768px]:h-auto max-[768px]:min-h-0 max-[768px]:max-h-none max-[768px]:flex-col max-[768px]:px-[22px] max-[768px]:pt-[110px] max-[768px]:pb-[34px] [&_:is(a,button):focus-visible]:[outline:2px_solid_currentColor] [&_:is(a,button):focus-visible]:outline-offset-[5px]"
      aria-labelledby="hero-heading"
      data-colorway={activeProduct.id}
    >
      <div
        className="hero-surfaces pointer-events-none absolute inset-0 -z-1 overflow-hidden"
        aria-hidden="true"
      >
        <div className="hero-dark-panel absolute inset-0 bg-[var(--hero-dark)]" />
        <div className="hero-word-clip hero-word-light absolute inset-0">
          <div className="hero-word-scroll absolute inset-0">
            <div className="hero-word-pointer absolute inset-0">
              <div className="hero-word-entrance absolute inset-0">
                <span className="hero-word absolute top-[6%] right-0 left-[18%] origin-left [transform:scaleX(1.45)] [font-family:var(--font-hero),sans-serif] text-[clamp(240px,26.5vw,480px)] leading-none font-extrabold tracking-[-0.035em] whitespace-nowrap italic min-[768px]:max-[1200px]:top-[8%] min-[768px]:max-[1200px]:left-[30%] min-[768px]:max-[1200px]:text-[26vw] max-[768px]:top-[36%] max-[768px]:left-0 max-[768px]:text-[42vw] max-[768px]:[transform:none] hero-word-solid text-[#171717] opacity-[0.58] max-[768px]:opacity-[0.15]">
                  KICKS
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-word-clip hero-word-dark absolute inset-0">
          <div className="hero-word-scroll absolute inset-0">
            <div className="hero-word-pointer absolute inset-0">
              <div className="hero-word-entrance absolute inset-0">
                <span className="hero-word absolute top-[6%] right-0 left-[18%] origin-left [transform:scaleX(1.45)] [font-family:var(--font-hero),sans-serif] text-[clamp(240px,26.5vw,480px)] leading-none font-extrabold tracking-[-0.035em] whitespace-nowrap italic min-[768px]:max-[1200px]:top-[8%] min-[768px]:max-[1200px]:left-[30%] min-[768px]:max-[1200px]:text-[26vw] max-[768px]:top-[36%] max-[768px]:left-0 max-[768px]:text-[42vw] max-[768px]:[transform:none] hero-word-outline text-transparent max-[768px]:hidden">
                  KICKS
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-accent-scroll absolute inset-0">
          <div className="hero-accent-pointer absolute inset-0">
            <div className="hero-accent absolute top-[26%] left-[40%] h-[70%] w-[45%] -rotate-[27deg] bg-[radial-gradient(ellipse,var(--hero-accent),transparent_64%)] opacity-[0.35] max-[768px]:top-[37%] max-[768px]:left-0 max-[768px]:h-[35%] max-[768px]:w-full" />
          </div>
        </div>
      </div>
      <div className="hero-copy absolute top-[26%] left-[3.15%] z-3 w-[35%] min-[768px]:max-[1200px]:top-[21%] min-[768px]:max-[1200px]:left-[5%] min-[768px]:max-[1200px]:w-[45%] max-[768px]:relative max-[768px]:inset-auto max-[768px]:contents max-[768px]:w-full">
        <p className="hero-eyebrow mb-8 flex items-center gap-[18px] pl-1 text-[13px] font-semibold tracking-[0.38em] min-[768px]:max-[1200px]:mb-[25px] max-[768px]:order-0 max-[768px]:mb-[21px] max-[768px]:gap-[14px] max-[768px]:text-[10px]">
          NEW DROP <span className="h-[3px] w-[26px] rounded-[2px] bg-[#dc2028]" />
        </p>
        <h1
          id="hero-heading"
          className="mb-7 [font-family:var(--font-hero),sans-serif] text-[clamp(90px,10vw,170px)] leading-[0.84] font-extrabold tracking-[-0.025em] italic min-[768px]:max-[1200px]:text-[11vw] max-[768px]:relative max-[768px]:z-3 max-[768px]:order-1 max-[768px]:mb-[22px] max-[768px]:text-[clamp(70px,18vw,130px)] max-[768px]:leading-[0.85]"
        >
          <span className="hero-line -mb-[0.12em] block overflow-hidden pt-[0.04em] pr-[0.12em] pb-[0.12em] whitespace-nowrap [&>span]:block">
            <span>NEVER</span>
          </span>
          <span className="hero-line -mb-[0.12em] block overflow-hidden pt-[0.04em] pr-[0.12em] pb-[0.12em] whitespace-nowrap [&>span]:block">
            <span>
              BLEND IN<span className="hero-period text-[#d9232b]">.</span>
            </span>
          </span>
        </h1>
        <div className="hero-description-scroll max-[768px]:relative max-[768px]:z-3 max-[768px]:order-2">
          <p className="hero-description text-[clamp(16px,1.3vw,23px)] leading-[1.4] text-[#62605e] max-[768px]:relative max-[768px]:z-3 max-[768px]:text-[14px]">
            Iconic sneakers. Timeless style.
            <br />
            Built for those who move different.
          </p>
        </div>
        <div className="hero-actions mt-[35px] flex items-center gap-5 whitespace-nowrap min-[768px]:max-[1200px]:max-w-[300px] min-[768px]:max-[1200px]:flex-wrap min-[768px]:max-[1200px]:gap-[15px] max-[768px]:relative max-[768px]:z-3 max-[768px]:order-6 max-[768px]:mt-0 max-[768px]:flex-wrap max-[768px]:justify-between max-[768px]:gap-5 max-[768px]:text-white">
          <Link
            className="hero-primary group/primary inline-flex min-h-[54px] items-center justify-center gap-5 rounded-[6px] bg-[#111] px-[23px] py-[14px] text-[14px] font-semibold text-white transition-[background] duration-200 ease-[ease] hover:bg-[#323232] max-[768px]:w-full max-[768px]:bg-[#f0ebe7] max-[768px]:text-[#111] max-[768px]:hover:bg-white"
            href="/#featured-drops"
          >
            Explore the Drop{" "}
            <ArrowRight
              className="shrink-0 transition-transform duration-250 ease-[ease] group-hover/primary:translate-x-1"
              size={22}
              aria-hidden="true"
            />
          </Link>
          <button
            className="hero-campaign inline-flex cursor-not-allowed items-center gap-[10px] text-[12px] font-semibold max-[768px]:text-[11px] max-[768px]:text-[#c3bfbb]"
            type="button"
            disabled
            aria-describedby="campaign-unavailable"
          >
            <span className="grid size-[45px] place-items-center rounded-full border border-[#222] max-[768px]:size-9 max-[768px]:border-[#999]">
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
      <div className="hero-featured absolute top-[51%] right-[3.2%] z-3 w-[15%] text-white min-[768px]:max-[1200px]:top-[64%] min-[768px]:max-[1200px]:right-[5%] min-[768px]:max-[1200px]:bottom-auto min-[768px]:max-[1200px]:w-[26%] max-[768px]:relative max-[768px]:inset-auto max-[768px]:order-4 max-[768px]:mt-[10px] max-[768px]:w-full max-[768px]:pt-3">
        <p className="hero-featured-label mb-[18px] text-[10px] tracking-[0.4em] max-[768px]:mb-3 max-[768px]:text-[9px]">
          FEATURED
        </p>
        <div className="hero-info-mask relative overflow-hidden pb-1">
          <HeroProductInfo product={activeProduct} />
        </div>
        <div className="hero-progress mt-[34px] flex items-center gap-[13px] max-[768px]:mt-[19px] max-[768px]:gap-[9px]">
          {heroProducts.map((item, index) => (
            <span
              key={item.id}
              className="h-1 w-7 rounded-[4px] bg-[#494949] transition-[background] duration-300 ease-[ease] data-[active=true]:bg-white max-[768px]:h-[3px] max-[768px]:w-[22px]"
              aria-hidden="true"
              data-active={active === index}
            />
          ))}
          <button
            type="button"
            className="hero-autoplay -my-5 grid size-11 cursor-pointer place-items-center text-[#b0ada9] hover:text-white disabled:cursor-default disabled:opacity-50"
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
      <Link
        href="/#featured-drops"
        className="hero-scroll absolute bottom-[8%] left-[4%] z-3 flex items-center gap-6 text-[#494745] min-[768px]:max-[1200px]:left-[5%] max-[768px]:relative max-[768px]:inset-auto max-[768px]:order-7 max-[768px]:mt-7 max-[768px]:gap-3 max-[768px]:text-[#b0ada9]"
      >
        <Mouse size={25} strokeWidth={1.2} aria-hidden="true" />
        <span className="text-[10px] leading-[1.8] font-semibold tracking-[0.34em] max-[768px]:text-[8px]">
          SCROLL
          <br />
          TO EXPLORE
        </span>
      </Link>
      <output
        className={
          error
            ? "hero-error absolute right-[3%] bottom-[1%] z-4 text-[12px] text-white max-[768px]:relative max-[768px]:inset-auto max-[768px]:order-8 max-[768px]:mt-3"
            : "sr-only"
        }
        aria-live={paused || reduceMotion || error ? "polite" : "off"}
        aria-atomic="true"
      >
        {error ||
          `${activeProduct.name}, ${activeProduct.colorway}, ${priceFormat.format(activeProduct.price)}`}
      </output>
    </section>
  );
}
