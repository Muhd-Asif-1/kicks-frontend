export type FeaturedDrop = {
  id: string;
  name: string;
  category: string;
  image: string;
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
    image: "/images/featured-drops/drop-1.webp",
    price: 14999,
    originalPrice: 16999,
    href: "/products/jordan-red-black",
  },
  {
    id: "nike-baseball",
    name: "Nike Baseball Cleats",
    category: "BUILT FOR THE GAME",
    image: "/images/featured-drops/drop-2.webp",
    price: 7999,
    href: "/products/nike-baseball",
  },
  {
    id: "puma-future-rider",
    name: "Puma Future Rider",
    category: "A NEW EVERYDAY ICON",
    image: "/images/featured-drops/drop-3.webp",
    price: 8999,
    originalPrice: 10999,
    href: "/products/puma-future-rider",
  },
  {
    id: "off-white-red",
    name: "Off White & Red · Sport",
    category: "MADE TO STAND APART",
    image: "/images/featured-drops/drop-4.webp",
    price: 11999,
    href: "/products/off-white-red",
  },
  {
    id: "off-white-runner",
    name: "Off White Red · Runner",
    category: "MOVEMENT, REDEFINED",
    image: "/images/featured-drops/drop-5.webp",
    price: 10999,
    originalPrice: 12999,
    href: "/products/off-white-runner",
  },
];
