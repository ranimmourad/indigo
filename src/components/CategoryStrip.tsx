import Link from "next/link";
import ProductImage from "./ProductImage";

const CATS = [
  {
    key: "t-shirts",
    label: "T-Shirts",
    sub: "Coton premium",
    image: "/uploads/indigotshirtwhite.jpg",
  },
  {
    key: "shorts",
    label: "Shorts",
    sub: "Coupe estivale",
    image: "/uploads/shorts1.jpg",
  },
  {
    key: "sets",
    label: "Ensembles",
    sub: "Total look",
    image: "/uploads/blueset.jpg",
  },
];

export default function CategoryStrip() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {CATS.map((c) => (
          <Link
            key={c.key}
            href={`/shop?category=${c.key}`}
            className="group relative block overflow-hidden bg-sand aspect-[4/5]"
          >
            <ProductImage
              src={c.image}
              alt={c.label}
              className="zoom-img absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-indigo/70 via-indigo/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-ivory">
              <p className="text-[10px] tracking-[0.35em] uppercase text-ivory/70 mb-1">
                {c.sub}
              </p>
              <h3 className="font-serif text-2xl">{c.label}</h3>
              <span className="mt-3 inline-block text-[11px] tracking-[0.3em] uppercase border-b border-ivory pb-0.5">
                Découvrir
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
