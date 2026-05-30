"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatTND } from "@/lib/products";
import ProductImage from "@/components/ProductImage";

export default function CartPage() {
  const { lines, subtotal, setQty, remove, clear } = useCart();

  const shipping = subtotal >= 150 || subtotal === 0 ? 0 : 8;
  const total = subtotal + shipping;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <p className="text-[10px] tracking-[0.4em] uppercase text-stone mb-2">
        Commande
      </p>
      <h1 className="font-serif text-4xl text-indigo">Mon Panier</h1>

      {lines.length === 0 ? (
        <div className="mt-16 py-20 text-center border border-neutral-200">
          <p className="font-serif text-2xl text-indigo">Votre panier est vide</p>
          <p className="text-sm text-stone mt-2">
            Parcourez la collection pour ajouter des pièces.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-block bg-indigo text-ivory px-8 py-3 text-[11px] tracking-[0.25em] uppercase"
          >
            Voir la boutique
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <table className="w-full">
              <thead className="hidden md:table-header-group">
                <tr className="text-left text-[10px] tracking-[0.25em] uppercase text-stone border-b border-neutral-200">
                  <th className="py-3">Article</th>
                  <th className="py-3">Prix</th>
                  <th className="py-3">Quantité</th>
                  <th className="py-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {lines.map((l) => (
                  <tr
                    key={`${l.productId}-${l.color}-${l.size}`}
                    className="border-b border-neutral-200 align-top"
                  >
                    <td className="py-5">
                      <div className="flex gap-4">
                        <div className="w-20 h-24 bg-sand overflow-hidden flex-shrink-0">
                          <ProductImage src={l.image} alt={l.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-serif text-lg text-indigo">{l.name}</p>
                          <p className="text-xs text-stone mt-1">
                            {l.color} · Taille {l.size}
                          </p>
                          <button
                            onClick={() => remove(l.productId, l.color, l.size)}
                            className="text-xs text-stone underline underline-offset-2 mt-2 hover:text-indigo"
                          >
                            Retirer
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="py-5 text-sm text-indigo md:align-middle">
                      {formatTND(l.unitPrice)}
                    </td>
                    <td className="py-5 md:align-middle">
                      <div className="inline-flex items-center border border-neutral-300">
                        <button
                          onClick={() => setQty(l.productId, l.color, l.size, l.qty - 1)}
                          className="w-8 h-8 text-indigo hover:bg-sand"
                        >
                          −
                        </button>
                        <span className="w-10 text-center text-sm">{l.qty}</span>
                        <button
                          onClick={() => setQty(l.productId, l.color, l.size, l.qty + 1)}
                          className="w-8 h-8 text-indigo hover:bg-sand"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="py-5 text-right text-indigo font-medium md:align-middle">
                      {formatTND(l.unitPrice * l.qty)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-6 flex justify-between text-sm">
              <button onClick={clear} className="text-stone underline underline-offset-2 hover:text-indigo">
                Vider le panier
              </button>
              <Link href="/shop" className="text-indigo link-underline">
                ← Continuer mes achats
              </Link>
            </div>
          </div>

          {/* Summary */}
          <aside className="bg-sand p-6 lg:p-8 h-fit">
            <h2 className="font-serif text-2xl text-indigo">Résumé</h2>
            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-stone">Sous-total</dt>
                <dd className="text-indigo">{formatTND(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-stone">Livraison</dt>
                <dd className="text-indigo">
                  {shipping === 0 ? "Offerte" : formatTND(shipping)}
                </dd>
              </div>
            </dl>
            <div className="mt-5 pt-5 border-t border-neutral-300 flex justify-between items-baseline">
              <span className="text-[10px] tracking-[0.3em] uppercase text-stone">Total</span>
              <span className="font-serif text-2xl text-indigo">{formatTND(total)}</span>
            </div>

            <button className="mt-6 w-full bg-indigo text-ivory py-4 text-[11px] tracking-[0.3em] uppercase hover:bg-indigo-deep">
              Passer la commande
            </button>
            <p className="text-[11px] text-stone mt-3 text-center">
              Paiement à la livraison disponible en Tunisie
            </p>
          </aside>
        </div>
      )}
    </section>
  );
}
