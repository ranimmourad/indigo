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

      {/* New Arrivals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <SectionHeader
          eyebrow="Nouveautés"
          title="Nouvelle Arrivée"
          href="/shop?sort=newest"
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6">
          {newArrivals.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <CategoryStrip />

      {/* Featured */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <SectionHeader
          eyebrow="Sélection"
          title="Pièces mises en avant"
          href="/shop"
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <SectionHeader
          eyebrow="Les plus aimés"
          title="Best-Sellers"
          href="/shop"
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6">
          {bestSellers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* About */}
      <div className="mt-24">
        <AboutBlock />
      </div>
    </>
  );
}
