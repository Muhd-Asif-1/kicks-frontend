import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Collection } from "./collection-data";
import ProductCard from "./product-card";

export default function CollectionSection({
  collection,
  className,
}: {
  collection: Collection;
  className?: string;
}) {
  return (
    <section
      aria-labelledby={`${collection.id}-collection-title`}
      className={cn("bg-[#F5F3EE] text-[#171715]", className)}
    >
      <div
        data-collection-campaign
        className="relative isolate flex min-h-[440px] items-end overflow-hidden bg-[#33332c] text-[#F5F3EE] sm:min-h-[500px] lg:min-h-[560px]"
      >
        <Image
          src={collection.image}
          alt={collection.imageAlt}
          fill
          sizes="100vw"
          className="-z-20 object-cover object-[54%_58%] sm:object-[center_45%]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(12,12,10,0.62),rgba(12,12,10,0.14)_65%,transparent),linear-gradient(0deg,rgba(12,12,10,0.4),transparent_80%)]"
        />
        <div className="w-full px-6 py-12 sm:px-10 sm:py-14 lg:px-16 lg:py-16 xl:px-20">
          <h2
            id={`${collection.id}-collection-title`}
            className="max-w-2xl text-[clamp(2.5rem,6.5vw,6.25rem)] leading-[0.95] font-semibold tracking-[-0.055em]"
          >
            {collection.title}
          </h2>
          <p className="mt-5 max-w-[19rem] text-sm leading-relaxed text-[#F5F3EE]/90 sm:mt-6 sm:max-w-sm sm:text-base">
            {collection.description}
          </p>
          <Link
            href={collection.href}
            prefetch={false}
            className="mt-7 inline-flex min-h-14 items-center justify-center gap-10 bg-[#F5F3EE] px-7 py-4 text-[11px] font-semibold tracking-[0.16em] text-[#171715] transition-colors hover:bg-[#ded7ca] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F5F3EE] motion-reduce:transition-none sm:mt-8"
          >
            {collection.cta}{" "}
            <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={1.5} />
          </Link>
        </div>
      </div>

      <section
        aria-labelledby={`${collection.id}-edit-title`}
        className="px-6 py-14 sm:px-10 sm:py-16 lg:px-16 lg:py-20 xl:px-20"
      >
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6 sm:mb-10">
          <div>
            <h2
              id={`${collection.id}-edit-title`}
              className="text-[clamp(1.5rem,3vw,2.5rem)] leading-tight font-semibold tracking-[-0.045em]"
            >
              {collection.editTitle}
            </h2>
            <p className="mt-3 text-xs leading-relaxed text-[#171715]/55 sm:text-sm">
              {collection.editDescription}
            </p>
          </div>
          <Link
            href={collection.href}
            prefetch={false}
            aria-label={`View all ${collection.title.toLowerCase()}`}
            className="inline-flex min-h-11 items-center gap-3 text-[10px] font-medium tracking-[0.12em] uppercase underline-offset-4 transition-colors hover:text-[#171715]/55 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 motion-reduce:transition-none sm:text-[11px]"
          >
            View all <ArrowUpRight aria-hidden="true" className="size-3.5" strokeWidth={1.5} />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4">
          {collection.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </section>
  );
}
