import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type HeroProduct, heroPrice, heroProducts } from "./hero-products";

export function HeroProductStage({
  current,
  incoming,
}: {
  current: HeroProduct;
  incoming: HeroProduct | null;
}) {
  return (
    <div className="hero-stage">
      <div className="hero-shoe-scroll">
        <div className="hero-shoe-pointer">
          <div className="hero-shoe-entrance">
            <div className="hero-shoe-angle">
              <div className="hero-shoe-current">
                <Image
                  src={current.image}
                  alt={`${current.name} in ${current.colorway}`}
                  width={current.width}
                  height={current.height}
                  unoptimized
                  preload={current.id === "chicago"}
                />
              </div>
              {incoming && (
                <div className="hero-shoe-incoming" aria-hidden="true">
                  <Image
                    src={incoming.image}
                    alt=""
                    width={incoming.width}
                    height={incoming.height}
                    unoptimized
                    loading="eager"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="hero-shoe-shadow" />
      </div>
    </div>
  );
}

export function HeroProductInfo({
  product,
  slot,
}: {
  product: HeroProduct;
  slot: "current" | "incoming";
}) {
  return (
    <div
      className={`hero-info-${slot}`}
      aria-hidden={slot === "incoming" || undefined}
      inert={slot === "incoming" || undefined}
    >
      <Link
        className="hero-product-link"
        href={`/products/${product.slug}`}
        prefetch={false}
        aria-label={`View ${product.name}, ${product.colorway}`}
      >
        <div>
          <h2>{product.name}</h2>
          <p className="hero-colorway">{product.colorway}</p>
          <p className="hero-price">{heroPrice.format(product.price)}</p>
        </div>
        <ArrowRight aria-hidden="true" size={30} strokeWidth={1.4} />
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
    <fieldset className="hero-selectors" aria-label="Featured sneaker colorway">
      {heroProducts.map((product, index) => (
        <button
          key={product.id}
          type="button"
          aria-label={`Select ${product.colorway}`}
          aria-pressed={active === index}
          className="hero-selector"
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
            event.currentTarget.parentElement?.querySelectorAll("button")[next]?.focus();
          }}
        >
          <Image src={product.thumbnail} alt="" width={240} height={144} unoptimized />
        </button>
      ))}
    </fieldset>
  );
}
