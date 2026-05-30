"use client";

import { useMemo, useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { PRODUCTS } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import type { Category, Size } from "@/lib/types";

const ALL_SIZES: Size[] = ["S", "M", "L", "XL", "XXL"];

const CATEGORIES: { key: Category | "all"; label: string }[] = [
  { key: "all", label: "Tout" },
  { key: "t-shirts", label: "T-Shirts" },
  { key: "shorts", label: "Shorts" },
  { key: "sets", label: "Ensembles" },
];

function ShopInner() {
  const router = useRouter();
  const params = useSearchParams();

  const initialCategory = (params.get("category") as Category | null) ?? "all";
  const initialSort = params.get("sort") ?? "newest";

  const [category, setCategory] = useState<Category | "all">(initialCategory);
  const [search, setSearch] = useState("");
  const [size, setSize] = useState<Size | "all">("all");
  const [color, setColor] = useState<string>("all");
  const [sort, setSort] = useState<string>(initialSort);
  const [showFilters, setShowFilters] = useState(false);

  // Keep URL in sync when category or sort changes (nice for sharing)
  useEffect(() => {
    const sp = new URLSearchParams();
    if (category !== "all") sp.set("category", category);
    if (sort !== "newest") sp.set("sort", sort);
    const qs = sp.toString();
    router.replace(qs ? `/shop?${qs}` : "/shop", { scroll: false });
  }, [category, sort, router]);

  // Compute all color names available for filter UI
  const allColors = useMemo(() => {
    const set = new Set<string>();
    PRODUCTS.forEach((p) => p.colors.forEach((c) => set.add(c.name)));
    return Array.from(set).sort();
  }, []);

  const filtered = useMemo(() => {
    let list = [...PRODUCTS];
    if (category !== "all") list = list.filter((p) => p.category === category);
    if (size !== "all") list = list.filter((p) => p.sizes.includes(size));
    if (color !== "all")
      list = list.filter((p) => p.colors.some((c) => c.name === color));
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline?.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    switch (sort) {
      case "price-asc":
        list.sort((a, b) => startPrice(a) - startPrice(b));
        break;
      case "price-desc":
        list.sort((a, b) => startPrice(b) - startPrice(a));
        break;
      case "newest":
      default:
        list.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
    }
    return list;
  }, [category, size, color, search, sort]);

  return (
    <>
      {/* Page header */}
      <section className="bg-indigo text-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <p className="text-[10px] tracking-[0.4em] uppercase text-ivory/70 mb-3">
            Boutique
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl">
            La Collection Indigo
          </h1>
          <p className="mt-3 text-ivory/70 max-w-xl">
            Découvrez l’ensemble de nos pièces — t-shirts, shorts et ensembles —
            pensées pour l’homme moderne.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-neutral-200">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c.key}
                onClick={() => setCategory(c.key)}
                className={`px-4 py-2 text-[11px] tracking-[0.2em] uppercase border transition-colors ${
                  category === c.key
                    ? "bg-indigo text-ivory border-indigo"
                    : "bg-ivory text-indigo border-neutral-300 hover:border-indigo"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher…"
                className="bg-ivory border border-neutral-300 px-9 py-2 text-sm w-52 focus:outline-none focus:border-indigo"
              />
              <svg
                className="absolute left-2.5 top-2.5 text-stone"
                width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="7" />
                <line x1="20" y1="20" x2="16.65" y2="16.65" />
              </svg>
            </div>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-ivory border border-neutral-300 px-3 py-2 text-sm text-indigo focus:outline-none focus:border-indigo"
            >
              <option value="newest">Nouveautés</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
            </select>

            <button
              onClick={() => setShowFilters((v) => !v)}
              className="border border-neutral-300 px-3 py-2 text-sm text-indigo hover:border-indigo"
            >
              Filtres
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 border-b border-neutral-200">
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-stone mb-3">
                Taille
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSize("all")}
                  className={`px-3 py-1.5 text-xs border ${
                    size === "all"
                      ? "bg-indigo text-ivory border-indigo"
                      : "border-neutral-300 text-indigo"
                  }`}
                >
                  Toutes
                </button>
                {ALL_SIZES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`px-3 py-1.5 text-xs border ${
                      size === s
                        ? "bg-indigo text-ivory border-indigo"
                        : "border-neutral-300 text-indigo"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-stone mb-3">
                Couleur
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setColor("all")}
                  className={`px-3 py-1.5 text-xs border ${
                    color === "all"
                      ? "bg-indigo text-ivory border-indigo"
                      : "border-neutral-300 text-indigo"
                  }`}
                >
                  Toutes
                </button>
                {allColors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`px-3 py-1.5 text-xs border ${
                      color === c
                        ? "bg-indigo text-ivory border-indigo"
                        : "border-neutral-300 text-indigo"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <p className="text-xs text-stone mt-6 mb-4">
          {filtered.length} produit{filtered.length > 1 ? "s" : ""}
        </p>

        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-serif text-2xl text-indigo">Aucun résultat</p>
            <p className="text-sm text-stone mt-2">
              Essayez d’ajuster vos filtres.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function startPrice(p: (typeof PRODUCTS)[number]): number {
  if (p.price !== undefined) return p.price;
  if (!p.priceTiers) return 0;
  return Math.min(...p.priceTiers.map((t) => t.total / t.qty));
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center text-stone">Chargement…</div>}>
      <ShopInner />
    </Suspense>
  );
}
