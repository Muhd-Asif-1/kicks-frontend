export type HeroProduct = {
  id: string;
  name: string;
  colorway: string;
  price: number;
  image: string;
  thumbnail: string;
  width: number;
  height: number;
  accent: string;
  slug: string;
};

// Portfolio showcase prices, not current retail/resale offers. See public/media-sources.md.
export const heroProducts: readonly HeroProduct[] = [
  { id: "chicago", colorway: "Chicago", accent: "#dc2028" },
  { id: "black-white", colorway: "Black / White", accent: "#a7adb5" },
  { id: "university-blue", colorway: "University Blue", accent: "#69a7d1" },
].map((product) => ({
  ...product,
  name: "Air Jordan 1 Retro High OG",
  price: 14999,
  image: `/images/hero/${product.id}.webp`,
  thumbnail: `/images/hero/${product.id}-thumb.webp`,
  width: product.id === "university-blue" ? 2000 : 1200,
  height: product.id === "university-blue" ? 1200 : 720,
  slug: `air-jordan-1-${product.id}`,
}));
