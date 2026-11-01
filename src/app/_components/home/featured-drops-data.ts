import type { ProductImages } from "./product-images";

export type FeaturedDrop = ProductImages & {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  href: string;
};

// Mock catalogue. Local transparent photography sourced from DummyJSON's mens-shoes dataset.
export const featuredDrops: readonly FeaturedDrop[] = [
  {
    id: "jordan-red-black",
    name: "Air Jordan 1 · Red & Black",
    category: "THE COURT CLASSIC",
    primaryImage: "/images/featured-drops/drop-1.webp",
    secondaryImage: "/images/featured-drops/drop-1-alternate.webp",
    price: 14999,
    originalPrice: 16999,
    href: "/products/jordan-red-black",
  },
  {
    id: "nike-baseball",
    name: "Nike Baseball Cleats",
    category: "BUILT FOR THE GAME",
    primaryImage: "/images/featured-drops/drop-2.webp",
    secondaryImage: "/images/featured-drops/drop-2-alternate.webp",
    price: 7999,
    href: "/products/nike-baseball",
  },
  {
    id: "puma-future-rider",
    name: "Puma Future Rider",
    category: "A NEW EVERYDAY ICON",
    primaryImage: "/images/featured-drops/drop-3.webp",
    secondaryImage: "/images/featured-drops/drop-3-alternate.webp",
    price: 8999,
    originalPrice: 10999,
    href: "/products/puma-future-rider",
  },
  {
    id: "off-white-red",
    name: "Off White & Red · Sport",
    category: "MADE TO STAND APART",
    primaryImage: "/images/featured-drops/drop-4.webp",
    secondaryImage: "/images/featured-drops/drop-4-alternate.webp",
    price: 11999,
    href: "/products/off-white-red",
  },
  {
    id: "off-white-runner",
    name: "Off White Red · Runner",
    category: "MOVEMENT, REDEFINED",
    primaryImage: "/images/featured-drops/drop-5.webp",
    secondaryImage: "/images/featured-drops/drop-5-alternate.webp",
    price: 10999,
    originalPrice: 12999,
    href: "/products/off-white-runner",
  },
];
