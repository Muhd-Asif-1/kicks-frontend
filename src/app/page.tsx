import { mensCollection } from "./_components/home/collection-data";
import CollectionSection from "./_components/home/collection-section";
import FeaturedBrands from "./_components/home/featured-brands";
import FeaturedDrops from "./_components/home/featured-drops";
import HeroSection from "./_components/home/hero-section";
import KicksCommunity from "./_components/home/kicks-community";
import { womensCollection } from "./_components/home/womens-collection-data";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      <HeroSection />
      <FeaturedDrops />
      <CollectionSection collection={mensCollection} />
      <CollectionSection
        collection={womensCollection}
        className="[&_[data-collection-campaign]_img]:object-top [&_article_img]:mix-blend-multiply motion-safe:[&_[data-collection-campaign]_img]:transition-transform motion-safe:[&_[data-collection-campaign]_img]:duration-700 motion-safe:[&_[data-collection-campaign]:hover_img]:scale-[1.025]"
      />
      <FeaturedBrands />
      <KicksCommunity />
    </main>
  );
}
