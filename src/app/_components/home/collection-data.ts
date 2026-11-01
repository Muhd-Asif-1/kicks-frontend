import { featuredDrops } from "./featured-drops-data";

export type CollectionProduct = {
  id: string;
  brand: string;
  name: string;
  image: string;
  price: number;
  href: string;
};

export type Collection = {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  cta: string;
  href: string;
  editTitle: string;
  editDescription: string;
  products: readonly CollectionProduct[];
};

// Mock collection; reuse the existing catalogue's prices, destinations and local photography.
export const mensCollection: Collection = {
  id: "mens",
  title: "MEN'S COLLECTION",
  description: "Made for every move. Find your next everyday essential.",
  // Temporary campaign image: https://images.unsplash.com/photo-1488161628813-04466f872be2
  image: "/images/mens-campaign.jpg",
  imageAlt: "Streetwear styling with white sneakers against warm concrete architecture",
  cta: "SHOP MEN",
  href: "/collections/men",
  editTitle: "THE MEN'S EDIT",
  editDescription: "Everyday essentials. Iconic silhouettes.",
  products: [
    { ...featuredDrops[0], brand: "JORDAN" },
    { ...featuredDrops[2], brand: "PUMA" },
    { ...featuredDrops[3], brand: "KICKS STUDIO", name: "Everyday Court · Ivory / Red" },
    { ...featuredDrops[4], brand: "KICKS STUDIO", name: "Everyday Runner · Ivory / Red" },
  ],
};
