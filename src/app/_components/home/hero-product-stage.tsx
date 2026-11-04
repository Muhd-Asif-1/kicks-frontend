import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { priceFormat } from "@/lib/price";
import { type HeroProduct, heroProducts } from "./hero-products";

export function HeroProductStage({
  current,
  incoming,
  active,
}: {
  active: HeroProduct;
  current: HeroProduct;
  incoming: HeroProduct | null;
}) {
  return (
    <div
      className="hero-stage pointer-events-none absolute top-[17%] right-[18%] z-2 w-[min(72%,1400px,calc((clamp(760px,100svh,1150px)*0.83_-_32px)/0.62))] min-[768px]:max-[1200px]:top-[21%] min-[768px]:max-[1200px]:right-auto min-[768px]:max-[1200px]:left-[18%] min-[768px]:max-[1200px]:w-[min(81%,640px)] max-[768px]:relative max-[768px]:inset-auto max-[768px]:order-3 max-[768px]:mt-9 max-[768px]:mb-[clamp(54px,12vw,100px)] max-[768px]:w-full max-[768px]:max-w-[600px] max-[768px]:self-center"
      role="img"
      aria-label={`${active.name} in ${active.colorway}`}
    >
      <div className="hero-shoe-scroll relative" aria-hidden="true">
        <div className="hero-shoe-pointer relative">
          <div className="hero-shoe-entrance relative">
            <div className="hero-shoe-angle relative aspect-[5/3] -rotate-[20deg] max-[768px]:-rotate-[18deg]">
              <div className="hero-shoe-current relative h-full">
                <Image
                  src={current.image}
                  alt=""
                  width={current.width}
                  height={current.height}
                  className="block size-full object-contain"
                  unoptimized
                  preload={current.id === "chicago"}
                />
              </div>
              {incoming && (
                <div className="hero-shoe-incoming absolute inset-0 opacity-0" aria-hidden="true">
                  <Image
                    src={incoming.image}
                    alt=""
                    width={incoming.width}
                    height={incoming.height}
                    className="block size-full object-contain"
                    unoptimized
                    loading="eager"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="hero-shoe-shadow absolute bottom-[-9%] left-[24%] -z-1 h-[6%] w-1/2 -rotate-[20deg] rounded-[50%] bg-[#14110f2b] blur-[24px] max-[768px]:bottom-0" />
      </div>
    </div>
  );
}

export function HeroProductInfo({ product }: { product: HeroProduct }) {
  return (
    <div className="hero-info-current">
      <Link
        className="hero-product-link group/product flex items-center justify-between gap-[10px]"
        href={`/products/${product.slug}`}
        prefetch={false}
        aria-label={`View ${product.name}, ${product.colorway}`}
      >
        <div>
          <div className="hero-product-details-mask overflow-hidden">
            <div className="hero-product-details">
              <h2 className="text-[clamp(20px,1.65vw,30px)] leading-[1.12] font-[650] tracking-[-0.055em] max-[768px]:text-[26px]">
                {product.name}
              </h2>
              <p className="hero-colorway mt-2 text-[clamp(14px,1.1vw,19px)] text-[#b0ada9] max-[768px]:text-[15px]">
                {product.colorway}
              </p>
            </div>
          </div>
          <p className="hero-price mt-[15px] text-[clamp(23px,1.9vw,33px)] font-bold tracking-[-0.035em] max-[768px]:mt-[10px] max-[768px]:text-[27px]">
            {priceFormat.format(product.price)}
          </p>
        </div>
        <ArrowRight
          className="shrink-0 transition-transform duration-250 ease-[ease] group-hover/product:translate-x-1"
          aria-hidden="true"
          size={30}
          strokeWidth={1.4}
        />
      </Link>
    </div>
  );
}

export function SneakerSelector({
  active,
  onSelect,
  onWarm,
}: {
  active: number;
  onSelect: (index: number) => void;
  onWarm: (index: number) => void;
}) {
  return (
    <fieldset
      className="hero-selectors absolute right-[3.2%] bottom-[5%] z-3 flex gap-4 min-[768px]:max-[1200px]:right-[5%] max-[768px]:relative max-[768px]:inset-auto max-[768px]:order-5 max-[768px]:my-[25px] max-[768px]:gap-3"
      aria-label="Featured sneaker colorway"
    >
      {heroProducts.map((product, index) => (
        <span
          key={product.id}
          className="hero-selector-entrance block h-[clamp(75px,6.3vw,115px)] w-[clamp(75px,6.6vw,125px)] max-[768px]:h-[82px] max-[768px]:w-0 max-[768px]:max-w-[115px] max-[768px]:flex-1"
        >
          <button
            type="button"
            aria-label={`Select ${product.colorway}`}
            aria-pressed={active === index}
            className="hero-selector grid size-full cursor-pointer place-items-center rounded-[16px] border-[1.5px] border-[#333] bg-[#ffffff07] [transition:border-color_300ms_ease,background_300ms_ease,translate_250ms_ease] hover:-translate-y-1 hover:border-[#aaa] aria-pressed:border-[var(--hero-accent)] aria-pressed:bg-[#ffffff0b] aria-pressed:hover:border-[#aaa] max-[768px]:rounded-[12px]"
            onClick={() => onSelect(index)}
            onPointerEnter={() => onWarm(index)}
            onFocus={() => onWarm(index)}
            onKeyDown={(event) => {
              const next =
                event.key === "ArrowRight"
                  ? (index + 1) % heroProducts.length
                  : event.key === "ArrowLeft"
                    ? (index + heroProducts.length - 1) % heroProducts.length
                    : event.key === "Home"
                      ? 0
                      : event.key === "End"
                        ? heroProducts.length - 1
                        : null;
              if (next === null) return;
              event.preventDefault();
              onSelect(next);
              event.currentTarget.closest("fieldset")?.querySelectorAll("button")[next]?.focus();
            }}
          >
            <Image
              className="h-auto w-full [transform:rotate(-13deg)_scale(1.05)]"
              src={product.thumbnail}
              alt=""
              width={240}
              height={144}
              unoptimized
            />
          </button>
        </span>
      ))}
    </fieldset>
  );
}
