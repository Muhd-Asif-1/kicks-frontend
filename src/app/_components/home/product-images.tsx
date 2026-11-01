"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

export type ProductImages = {
  primaryImage: string;
  secondaryImage: string;
  galleryImages?: readonly string[];
};

// Both optimized images share one fixed frame. Never fade to an unloaded image.
export default function ProductImage({
  product,
  alt = "",
  sizes,
  className,
}: {
  product: ProductImages;
  alt?: string;
  sizes: string;
  className?: string;
}) {
  const [ready, setReady] = useState(false);
  return (
    <span className={cn("product-images absolute inset-0", ready && "product-images-ready")}>
      <Image
        src={product.primaryImage}
        alt={alt}
        fill
        sizes={sizes}
        draggable={false}
        className={cn("product-primary object-contain", className)}
      />
      <Image
        src={product.secondaryImage}
        alt=""
        aria-hidden="true"
        fill
        sizes={sizes}
        draggable={false}
        onLoad={() => setReady(true)}
        onError={() => setReady(false)}
        className={cn("product-secondary object-contain opacity-0", className)}
      />
    </span>
  );
}
