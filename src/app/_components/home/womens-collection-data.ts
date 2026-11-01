import type { Collection } from "./collection-data";

// Mock prices and destinations. Product photography: New Balance's Scene7 catalogue,
// using each product's SKU and the original `_nb_02_i` side-profile asset.
export const womensCollection: Collection = {
  id: "womens",
  title: "WOMEN'S COLLECTION",
  description: "Own your style. Discover the pieces that move with you.",
  // Temporary campaign photograph: https://images.unsplash.com/photo-1515886657613-9f3515b0c78f
  image: "/images/womens-collection/campaign.jpg",
  imageAlt: "Women's streetwear campaign in a yellow tracksuit on an outdoor basketball court",
  cta: "SHOP WOMEN",
  href: "/collections/women",
  editTitle: "THE WOMEN'S EDIT",
  editDescription: "Fresh silhouettes. Effortless style. Made to stand out.",
  products: [
    {
      id: "womens-nb-327-moonbeam",
      brand: "NEW BALANCE",
      name: "327 · Moonbeam",
      image: "/images/womens-collection/ws327kg.webp",
      price: 10999,
      href: "/products/womens-nb-327-moonbeam",
    },
    {
      id: "womens-nb-574-nimbus",
      brand: "NEW BALANCE",
      name: "574 · Nimbus Cloud",
      image: "/images/womens-collection/wl574evw.webp",
      price: 8999,
      href: "/products/womens-nb-574-nimbus",
    },
    {
      id: "womens-nb-550-mauve",
      brand: "NEW BALANCE",
      name: "550 · Mauve",
      image: "/images/womens-collection/bbw550pb.webp",
      price: 12999,
      href: "/products/womens-nb-550-mauve",
    },
    {
      id: "womens-nb-530-silver",
      brand: "NEW BALANCE",
      name: "530 · White / Silver",
      image: "/images/womens-collection/mr530sg.webp",
      price: 9999,
      href: "/products/womens-nb-530-silver",
    },
  ],
};
