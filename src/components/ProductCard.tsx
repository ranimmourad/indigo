import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatTND } from "@/lib/products";
import ProductImage from "./ProductImage";

export default function ProductCard({ product }: { product: Product }) {
  const startingPrice =
    product.price !== undefined
      ? product.price
      : product.priceTiers
      ? Math.min(...product.priceTiers.map((t) => t.total / t.qty))
      : 0;

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block"
    >
      <div className="relative overflow-hidden bg-sand aspect-[4/5]">
        <ProductImage
          src={product.primaryImage}
          alt={product.name}
          className="zoom-img w-full h-full object-cover"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="bg-indigo text-ivory text-[10px] tracking-[0.2em] uppercase px-2.5 py-1">
              Nouveau
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-ivory text-indigo text-[10px] tracking-[0.2em] uppercase px-2.5 py-1 border border-indigo/20">
              Best-Seller
            </span>
          )}
        </div>
      </div>

      <div className="mt-4">
        <h3 className="font-serif text-lg text-indigo group-hover:underline underline-offset-4 decoration-1">
          {product.name}
        </h3>
        {product.tagline && (
          <p className="text-xs text-stone mt-1 line-clamp-1">{product.tagline}</p>
        )}

        <div className="flex items-center justify-between mt-2">
          <p className="text-sm text-indigo">
            {product.price !== undefined ? (
              <>{formatTND(startingPrice)}</>
            ) : (
              <>
                <span className="text-stone text-xs mr-1">à partir de</span>
                {formatTND(startingPrice)}
              </>
            )}
          </p>

          {product.colors.length > 1 && (
            <div className="flex items-center gap-1">
              {product.colors.slice(0, 4).map((c) => (
                <span
                  key={c.name}
                  className="w-3 h-3 rounded-full border border-neutral-300"
                  style={{ background: c.hex }}
                  title={c.name}
                />
              ))}
              {product.colors.length > 4 && (
                <span className="text-[10px] text-stone ml-1">
                  +{product.colors.length - 4}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
