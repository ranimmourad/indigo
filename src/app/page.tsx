import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import SectionHeader from "@/components/SectionHeader";
import CategoryStrip from "@/components/CategoryStrip";
import AboutBlock from "@/components/AboutBlock";
import { PRODUCTS } from "@/lib/products";

export default function HomePage() {
  const newArrivals = [...PRODUCTS]
    .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
    .slice(0, 4);

  const featured = PRODUCTS.filter((p) => p.isFeatured).slice(0, 4);
  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4);

  return (
    <>
      <Hero />

      {/* Categories */}
      <CategoryStrip />

      {/* About */}
      <div className="mt-24">
        <AboutBlock />
      </div>
    </>
  );
}
