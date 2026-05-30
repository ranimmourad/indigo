export type Category = "t-shirts" | "shorts" | "sets";

export type Size = "S" | "M" | "L" | "XL" | "XXL";

export interface ColorVariant {
  /** Color label shown in UI (e.g. "Red", "Burgundy") */
  name: string;
  /** Hex value for the swatch */
  hex: string;
  /** Image filename inside /public/uploads (no path). If empty, the gallery
   *  will fall back to the product's main image. */
  image?: string;
}

export interface PriceTier {
  qty: number;
  total: number; // total price in TND for that quantity
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: Category;
  /** Short marketing line */
  tagline?: string;
  description: string;
  /** Either a single fixed price (Indigo T-Shirt, Sets, Shorts) ... */
  price?: number;
  /** ... or a tiered price (1=39, 2=70, 3=90 TND) */
  priceTiers?: PriceTier[];
  sizes: Size[];
  colors: ColorVariant[];
  /** Fallback / primary image (if no color is selected or color has no image) */
  primaryImage: string;
  /** Additional gallery images (filenames inside /public/uploads) */
  gallery?: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  createdAt: string; // ISO date for "newest" sort
}

export interface CartLine {
  productId: string;
  name: string;
  image: string;
  color: string;
  size: Size;
  qty: number;
  /** Price snapshot at the moment the line was added, in TND */
  unitPrice: number;
}
