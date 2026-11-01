import Image from "next/image";
import Link from "next/link";

// Original monochrome marks: Simple Icons; Converse via Wikimedia Commons.
const brands = [
  { name: "Nike", slug: "nike" },
  { name: "Adidas", slug: "adidas" },
  { name: "New Balance", slug: "newbalance" },
  { name: "Puma", slug: "puma" },
  { name: "Converse", slug: "converse" },
  { name: "Reebok", slug: "reebok" },
] as const;

export default function FeaturedBrands() {
  return (
    <section
      aria-labelledby="featured-brands-heading"
      className="bg-[#F5F3EE] px-6 py-16 text-[#171715] sm:px-10 sm:py-20 lg:px-16 lg:py-24 xl:px-20"
    >
      <div className="text-center">
        <p className="text-[10px] font-medium tracking-[0.24em] text-[#171715]/50">
          CURATED FOR YOU
        </p>
        <h2
          id="featured-brands-heading"
          className="mt-4 text-[clamp(1.5rem,3vw,2.25rem)] leading-tight font-semibold tracking-[-0.045em]"
        >
          THE BRANDS WE LOVE
        </h2>
        <p className="mt-3 text-xs leading-relaxed text-[#171715]/55 sm:text-sm">
          Discover the names shaping sneaker culture.
        </p>
      </div>

      <ul className="mx-auto mt-10 grid max-w-6xl grid-cols-2 gap-x-8 gap-y-6 sm:mt-12 sm:grid-cols-3 lg:mt-14 lg:grid-cols-6">
        {brands.map((brand) => (
          <li key={brand.slug}>
            <Link
              href={`/brands/${brand.slug}`}
              prefetch={false}
              aria-label={`Shop ${brand.name}`}
              className="flex min-h-28 items-center justify-center transition-opacity duration-300 hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 motion-safe:transition-[opacity,scale] motion-safe:hover:scale-[1.025] motion-reduce:transition-none"
            >
              <Image
                src={`/brands/${brand.slug}.svg`}
                alt={brand.name}
                width={144}
                height={80}
                className="h-20 w-32 max-w-full object-contain"
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
