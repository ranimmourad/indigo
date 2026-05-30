"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Product, Size } from "@/lib/types";
import { formatTND, totalPriceFor, unitPriceFor } from "@/lib/products";
import ProductImage from "./ProductImage";
import { useCart } from "@/context/CartContext";

export default function ProductDetail({ product }: { product: Product }) {
  const [colorIdx, setColorIdx] = useState(0);
  const [size, setSize] = useState<Size>(product.sizes[1] ?? product.sizes[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const { add } = useCart();

  const selectedColor = product.colors[colorIdx];

  // Build gallery: prefer product.gallery; otherwise use color images; otherwise primary.
  const gallery = useMemo(() => {
    const list: string[] = [];
    if (selectedColor?.image) list.push(`/uploads/${selectedColor.image}`);
    if (product.gallery && product.gallery.length > 0) {
      for (const f of product.gallery) {
        const path = `/uploads/${f}`;
        if (!list.includes(path)) list.push(path);
      }
    }
    if (!list.includes(product.primaryImage)) list.push(product.primaryImage);
    return list;
  }, [product, selectedColor]);

  const [activeImg, setActiveImg] = useState(0);
  // When color changes, jump to its image if it has one
  function selectColor(i: number) {
    setColorIdx(i);
    const c = product.colors[i];
    if (c.image) {
      const idx = gallery.findIndex((g) => g === `/uploads/${c.image}`);
      if (idx >= 0) setActiveImg(idx);
    }
  }

  const total = totalPriceFor(product, qty);
  const unit = unitPriceFor(product, qty);

  function handleAdd() {
    add({
      productId: product.id,
      name: product.name,
      image: selectedColor?.image
        ? `/uploads/${selectedColor.image}`
        : product.primaryImage,
      color: selectedColor.name,
      size,
      qty,
      unitPrice: unit,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      {/* Breadcrumb */}
      <nav className="text-xs text-stone mb-8 tracking-wider">
        <Link href="/" className="hover:text-indigo">Accueil</Link>
        <span className="mx-2">/</span>
        <Link href="/shop" className="hover:text-indigo">Boutique</Link>
        <span className="mx-2">/</span>
        <span className="text-indigo">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Gallery */}
        <div>
          <div className="bg-sand aspect-[4/5] overflow-hidden">
            <ProductImage
              src={gallery[activeImg]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          {gallery.length > 1 && (
            <div className="grid grid-cols-5 gap-2 mt-2">
              {gallery.map((g, i) => (
                <button
                  key={g}
                  onClick={() => setActiveImg(i)}
                  className={`aspect-square overflow-hidden bg-sand border ${
                    i === activeImg ? "border-indigo" : "border-transparent"
                  }`}
                >
                  <ProductImage
                    src={g}
                    alt={`${product.name} ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          {product.isNew && (
            <span className="inline-block bg-indigo text-ivory text-[10px] tracking-[0.25em] uppercase px-2.5 py-1 mb-4">
              Nouveau
            </span>
          )}

          <h1 className="font-serif text-3xl sm:text-4xl text-indigo">
            {product.name}
          </h1>
          {product.tagline && (
            <p className="text-sm text-stone mt-2">{product.tagline}</p>
          )}

          <div className="mt-6">
            {product.price !== undefined ? (
              <p className="font-serif text-3xl text-indigo">
                {formatTND(product.price)}
              </p>
            ) : (
              <div>
                <p className="font-serif text-3xl text-indigo">
                  {formatTND(total)}
                  <span className="text-sm text-stone ml-3">
                    soit {formatTND(unit)} / unité
                  </span>
                </p>
                {product.priceTiers && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {product.priceTiers.map((t) => (
                      <span
                        key={t.qty}
                        className={`text-[11px] tracking-[0.15em] uppercase px-2.5 py-1 border ${
                          qty >= t.qty
                            ? "bg-indigo text-ivory border-indigo"
                            : "text-indigo border-neutral-300"
                        }`}
                      >
                        {t.qty} = {t.total} TND
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <p className="mt-6 text-neutral-700 leading-relaxed">
            {product.description}
          </p>

          {/* Color */}
          <div className="mt-8">
            <p className="text-[10px] tracking-[0.3em] uppercase text-stone mb-3">
              Couleur — <span className="text-indigo">{selectedColor.name}</span>
            </p>
            <div className="flex flex-wrap gap-2.5">
              {product.colors.map((c, i) => (
                <button
                  key={c.name}
                  onClick={() => selectColor(i)}
                  aria-label={c.name}
                  title={c.name}
                  className={`w-9 h-9 rounded-full border-2 transition ${
                    i === colorIdx ? "border-indigo" : "border-neutral-300"
                  }`}
                  style={{ background: c.hex }}
                />
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] tracking-[0.3em] uppercase text-stone">
                Taille
              </p>
              <button className="text-[10px] tracking-[0.2em] uppercase text-indigo underline underline-offset-2">
                Guide des tailles
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`min-w-[48px] px-4 py-2.5 text-sm border transition ${
                    size === s
                      ? "bg-indigo text-ivory border-indigo"
                      : "bg-ivory text-indigo border-neutral-300 hover:border-indigo"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mt-8">
            <p className="text-[10px] tracking-[0.3em] uppercase text-stone mb-3">
              Quantité
            </p>
            <div className="inline-flex items-center border border-neutral-300">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-10 h-10 text-indigo hover:bg-sand"
                aria-label="Diminuer"
              >
                −
              </button>
              <span className="w-12 text-center">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="w-10 h-10 text-indigo hover:bg-sand"
                aria-label="Augmenter"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to cart */}
          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAdd}
              className="flex-1 bg-indigo text-ivory py-4 text-[11px] tracking-[0.3em] uppercase hover:bg-indigo-deep transition"
            >
              {added ? "Ajouté au panier ✓" : "Ajouter au panier"}
            </button>
            <Link
              href="/cart"
              className="flex-1 text-center border border-indigo text-indigo py-4 text-[11px] tracking-[0.3em] uppercase hover:bg-indigo hover:text-ivory transition"
            >
              Voir le panier
            </Link>
          </div>

          {/* Reassurance */}
          <ul className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-[11px] tracking-[0.2em] uppercase text-stone">
            <li className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 7h13l5 5v5h-3a2 2 0 1 1-4 0H10a2 2 0 1 1-4 0H3z" />
              </svg>
              Livraison Tunisie
            </li>
            <li className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 8V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2" />
                <path d="M16 12h6v4h-6a2 2 0 0 1 0-4z" />
              </svg>
              Paiement à la livraison
            </li>
            <li className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              Qualité garantie
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
