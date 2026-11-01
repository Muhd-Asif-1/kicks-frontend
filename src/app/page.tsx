import { mensCollection } from "./_components/home/collection-data";
import CollectionSection from "./_components/home/collection-section";
import FeaturedDrops from "./_components/home/featured-drops";
import HeroSection from "./_components/home/hero-section";
import { womensCollection } from "./_components/home/womens-collection-data";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      <HeroSection collectionHref="/collections" />
      <FeaturedDrops />
      <CollectionSection collection={mensCollection} />
      <CollectionSection
        collection={womensCollection}
        className="[&_[data-collection-campaign]_img]:object-top [&_article_img]:mix-blend-multiply motion-safe:[&_[data-collection-campaign]_img]:transition-transform motion-safe:[&_[data-collection-campaign]_img]:duration-700 motion-safe:[&_[data-collection-campaign]:hover_img]:scale-[1.025]"
      />
      <div>social</div>
    </main>
  );
}
