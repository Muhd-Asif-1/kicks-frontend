"use client";

import Link from "next/link";
import { useState } from "react";
import { HeartIcon } from "@/components/ui/heart";
import { priceFormat } from "@/lib/price";
import { cn } from "@/lib/utils";
import type { CollectionProduct } from "./collection-data";
import ProductImage from "./product-images";

export default function ProductCard({ product }: { product: CollectionProduct }) {
  const [saved, setSaved] = useState(false);

  return (
    <article className="relative min-w-0">
      <Link
        href={product.href}
        prefetch={false}
        className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#171715]"
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-[#ECE9E2]">
          <ProductImage
            product={product}
            sizes="(max-width: 1023px) 50vw, 25vw"
            className="object-contain motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:group-hover:scale-105 motion-safe:group-focus-visible:scale-105"
          />
        </div>
        <div className="pt-4 sm:pt-5">
          <p className="text-[9px] font-medium tracking-[0.14em] text-[#171715]/50 sm:text-[10px]">
            {product.brand}
          </p>
          <h3 className="mt-2 text-xs leading-relaxed font-medium sm:text-sm">{product.name}</h3>
          <p className="mt-2 text-xs sm:mt-3 sm:text-sm">{priceFormat.format(product.price)}</p>
        </div>
      </Link>
      <button
        type="button"
        aria-label={`${saved ? "Remove" : "Save"} ${product.name} ${saved ? "from" : "to"} wishlist`}
        aria-pressed={saved}
        onClick={() => setSaved((previous) => !previous)}
        className="absolute top-1 right-1 flex size-11 items-center justify-center rounded-full transition-colors hover:text-[#171715]/55 focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none sm:top-2 sm:right-2"
      >
        <HeartIcon
          aria-hidden="true"
          size={18}
          className={cn("size-[18px]", saved && "[&_svg]:fill-current")}
        />
      </button>
    </article>
  );
}
