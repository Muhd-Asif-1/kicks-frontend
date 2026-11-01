import FeaturedDrops from "./_components/home/featured-drops";
import HeroSection from "./_components/home/hero-section";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      <HeroSection collectionHref="/collections" />
      <FeaturedDrops />
      <div>social</div>
    </main>
  );
}
