"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatTND } from "@/lib/products";
import ProductImage from "./ProductImage";

export default function CartDrawer() {
  const { isOpen, close, lines, subtotal, setQty, remove } = useCart();

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={close}
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!isOpen}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-full sm:max-w-md bg-ivory transition-transform duration-300 ease-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isOpen}
        role="dialog"
      >
        <header className="px-6 py-5 border-b border-neutral-200 flex items-center justify-between">
          <h2 className="font-serif text-xl text-indigo tracking-wide">
            Mon Panier <span className="text-stone text-sm">({lines.length})</span>
          </h2>
          <button
            onClick={close}
            aria-label="Fermer"
            className="p-1 text-indigo hover:opacity-60"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {lines.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-20">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-stone mb-4">
                <path d="M6 6h15l-1.5 9h-12z" />
                <circle cx="9" cy="20" r="1.5" />
                <circle cx="18" cy="20" r="1.5" />
                <path d="M6 6L5 3H2" />
              </svg>
              <p className="font-serif text-lg text-indigo">Votre panier est vide</p>
              <p className="text-sm text-stone mt-2">Découvrez nos pièces signature.</p>
              <Link
                href="/shop"
                onClick={close}
                className="mt-6 inline-block bg-indigo text-ivory px-6 py-3 text-[11px] tracking-[0.25em] uppercase hover:bg-indigo-deep"
              >
                Découvrir la boutique
              </Link>
            </div>
          ) : (
            <ul className="space-y-6">
              {lines.map((l) => (
                <li key={`${l.productId}-${l.color}-${l.size}`} className="flex gap-4">
                  <div className="w-20 h-24 bg-sand flex-shrink-0 overflow-hidden">
                    <ProductImage src={l.image} alt={l.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-base text-indigo">{l.name}</h3>
                    <p className="text-xs text-stone mt-1">
                      {l.color} · Taille {l.size}
                    </p>
                    <p className="text-sm text-indigo mt-1">
                      {formatTND(l.unitPrice * l.qty)}
                    </p>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="inline-flex items-center border border-neutral-300">
                        <button
                          onClick={() =>
                            setQty(l.productId, l.color, l.size, l.qty - 1)
                          }
                          className="w-7 h-7 text-indigo hover:bg-sand"
                          aria-label="Diminuer"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm">{l.qty}</span>
                        <button
                          onClick={() =>
                            setQty(l.productId, l.color, l.size, l.qty + 1)
                          }
                          className="w-7 h-7 text-indigo hover:bg-sand"
                          aria-label="Augmenter"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => remove(l.productId, l.color, l.size)}
                        className="text-xs text-stone underline underline-offset-2 hover:text-indigo"
                      >
                        Retirer
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <footer className="border-t border-neutral-200 px-6 py-5 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-stone">Sous-total</span>
              <span className="text-indigo font-medium">{formatTND(subtotal)}</span>
            </div>
            <p className="text-xs text-stone">
              Livraison calculée à l’étape suivante.
            </p>
            <Link
              href="/cart"
              onClick={close}
              className="block w-full bg-indigo text-ivory text-center py-4 text-[11px] tracking-[0.25em] uppercase hover:bg-indigo-deep"
            >
              Voir le panier
            </Link>
            <button
              onClick={close}
              className="block w-full text-center py-2 text-[11px] tracking-[0.25em] uppercase text-indigo hover:underline"
            >
              Continuer mes achats
            </button>
          </footer>
        )}
      </aside>
    </>
  );
}
