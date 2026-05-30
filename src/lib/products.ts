import type { Product, PriceTier, Size } from "./types";

const ALL_SIZES: Size[] = ["S", "M", "L", "XL", "XXL"];

const TIERED: PriceTier[] = [
  { qty: 1, total: 39 },
  { qty: 2, total: 70 },
  { qty: 3, total: 90 },
];

/** Helper to build /uploads/<file>. If the .jpg version doesn't exist yet
 *  (admin hasn't uploaded), the .svg placeholder of the same basename will
 *  be served by the <ProductImage> component fallback. */
const img = (file: string) => `/uploads/${file}`;

export const PRODUCTS: Product[] = [
  // ───────────── T-SHIRTS ─────────────
  {
    id: "tshirt-national",
    slug: "national-t-shirt",
    name: "National T-Shirt",
    category: "t-shirts",
    tagline: "Coton premium · Coupe régulière",
    description:
      "Un t-shirt iconique en coton premium, conçu pour un confort absolu et une élégance discrète au quotidien. Coupe ajustée, finitions soignées.",
    priceTiers: TIERED,
    sizes: ALL_SIZES,
    colors: [
      { name: "Red", hex: "#7E1F2A", image: "national1.jpg" },
      { name: "White", hex: "#EDEAE2", image: "national2.jpg" },
      { name: "Yellow", hex: "#C9A227", image: "national3.jpg" },
      { name: "Blue", hex: "#0E1E45" }, // image to upload later
      { name: "Pink", hex: "#D9A6A6" }, // image to upload later
    ],
    primaryImage: img("national1.jpg"),
    gallery: ["national1.jpg", "national2.jpg", "national3.jpg"],
    isNew: true,
    isBestSeller: true,
    isFeatured: true,
    createdAt: "2025-05-20",
  },
  {
    id: "tshirt-moncler",
    slug: "moncler-t-shirt",
    name: "Moncler T-Shirt",
    category: "t-shirts",
    tagline: "Inspiration sportswear · Maille épaisse",
    description:
      "Un t-shirt à l’allure sportswear raffinée. Matière dense, tombé impeccable, finitions premium pour une silhouette structurée.",
    priceTiers: TIERED,
    sizes: ALL_SIZES,
    colors: [
      { name: "Blue", hex: "#0E1E45" },
      { name: "Black", hex: "#111111" },
      { name: "White", hex: "#EDEAE2" },
      { name: "Burgundy", hex: "#5C1A24" },
    ],
    primaryImage: img("monclertshirts.jpg"),
    isFeatured: true,
    isBestSeller: true,
    createdAt: "2025-05-18",
  },
  {
    id: "tshirt-calvinklein",
    slug: "calvin-klein-t-shirt",
    name: "Calvin Klein T-Shirt",
    category: "t-shirts",
    tagline: "Minimalisme contemporain",
    description:
      "L’essentiel minimaliste par excellence. Lignes épurées, coton doux, broderie discrète pour un style intemporel.",
    priceTiers: TIERED,
    sizes: ALL_SIZES,
    colors: [
      { name: "White", hex: "#EDEAE2" },
      { name: "Grey", hex: "#8A8A8A" },
      { name: "Black", hex: "#111111" },
    ],
    primaryImage: img("calvinklein.jpg"),
    isNew: true,
    createdAt: "2025-05-22",
  },
  {
    id: "tshirt-loropiana",
    slug: "loro-piana-t-shirt",
    name: "Loro Piana T-Shirt",
    category: "t-shirts",
    tagline: "Tactile et raffiné",
    description:
      "Un toucher exceptionnel, une coupe oversize maîtrisée. Pour ceux qui recherchent le luxe dans la simplicité.",
    priceTiers: TIERED,
    sizes: ALL_SIZES,
    colors: [
      { name: "Black", hex: "#111111" },
      { name: "White", hex: "#EDEAE2" },
      { name: "Grey", hex: "#8A8A8A" },
    ],
    primaryImage: img("lordpiana.jpg"),
    isFeatured: true,
    createdAt: "2025-05-15",
  },
  {
    id: "tshirt-lacoste",
    slug: "lacoste-t-shirt",
    name: "Lacoste T-Shirt",
    category: "t-shirts",
    tagline: "Élégance sportive · Maille piquée",
    description:
      "Un classique réinterprété. Maille piquée respirante, finitions soignées et identité sportive premium.",
    priceTiers: TIERED,
    sizes: ALL_SIZES,
    colors: [
      { name: "Black", hex: "#111111" },
      { name: "White", hex: "#EDEAE2" },
      { name: "Blue", hex: "#0E1E45" },
      { name: "Burgundy", hex: "#5C1A24" },
    ],
    primaryImage: img("lacoste.jpg"),
    isBestSeller: true,
    createdAt: "2025-05-10",
  },
  {
    id: "tshirt-indigo",
    slug: "indigo-t-shirt",
    name: "Indigo T-Shirt",
    category: "t-shirts",
    tagline: "La signature de la maison",
    description:
      "Notre t-shirt signature. Coton supima, broderie discrète Indigo Jeans, coupe parfaitement étudiée pour la silhouette masculine.",
    price: 43,
    sizes: ALL_SIZES,
    colors: [
      { name: "White", hex: "#EDEAE2", image: "indigotshirtwhite.jpg" },
      { name: "Black", hex: "#111111", image: "indigotshirtblack.jpg" },
      { name: "Green", hex: "#1F3A2B", image: "indigotshirtgreen.jpg" },
      { name: "Pink", hex: "#D9A6A6", image: "indigotshirtpink.jpg" },
      { name: "Burgundy", hex: "#5C1A24", image: "indigotshirtburgendy.jpg" },
    ],
    primaryImage: img("indigotshirtwhite.jpg"),
    gallery: [
      "indigotshirtwhite.jpg",
      "indigotshirtblack.jpg",
      "indigotshirtgreen.jpg",
      "indigotshirtpink.jpg",
      "indigotshirtburgendy.jpg",
    ],
    isNew: true,
    isFeatured: true,
    isBestSeller: true,
    createdAt: "2025-05-25",
  },

  // ───────────── SETS ─────────────
  {
    id: "set-black",
    slug: "black-set",
    name: "Black Set",
    category: "sets",
    tagline: "Ensemble coordonné · Total look",
    description:
      "Ensemble coordonné en noir profond. Coupe moderne, matière premium, parfait pour un total look maîtrisé.",
    price: 70,
    sizes: ALL_SIZES,
    colors: [{ name: "Black", hex: "#111111", image: "blackset.jpg" }],
    primaryImage: img("blackset.jpg"),
    isFeatured: true,
    createdAt: "2025-05-12",
  },
  {
    id: "set-brown",
    slug: "brown-set",
    name: "Brown Set",
    category: "sets",
    tagline: "Tons terreux · Élégance chaude",
    description:
      "Un ensemble dans des tons chauds et terreux. Idéal pour une allure sophistiquée et naturelle.",
    price: 70,
    sizes: ALL_SIZES,
    colors: [{ name: "Brown", hex: "#5A3A24", image: "brownset.jpg" }],
    primaryImage: img("brownset.jpg"),
    isNew: true,
    createdAt: "2025-05-19",
  },
  {
    id: "set-green",
    slug: "green-set",
    name: "Green Set",
    category: "sets",
    tagline: "Vert profond · Caractère",
    description:
      "Un ensemble vert sapin, raffiné et affirmé. Pour une silhouette élégante et différente.",
    price: 70,
    sizes: ALL_SIZES,
    colors: [{ name: "Green", hex: "#2D4A37", image: "greenset.jpg" }],
    primaryImage: img("greenset.jpg"),
    isBestSeller: true,
    createdAt: "2025-05-08",
  },
  {
    id: "set-blue",
    slug: "blue-set",
    name: "Blue Set",
    category: "sets",
    tagline: "Indigo signature",
    description:
      "L’ensemble bleu Indigo. Notre teinte signature dans une coupe contemporaine et sophistiquée.",
    price: 70,
    sizes: ALL_SIZES,
    colors: [{ name: "Blue", hex: "#0E1E45", image: "blueset.jpg" }],
    primaryImage: img("blueset.jpg"),
    isFeatured: true,
    isBestSeller: true,
    createdAt: "2025-05-21",
  },

  // ───────────── SHORTS ─────────────
  {
    id: "shorts-lightblue",
    slug: "light-blue-shorts",
    name: "Light Blue Shorts",
    category: "shorts",
    tagline: "Coupe droite · Confort estival",
    description:
      "Short bleu clair en matière légère et respirante. Coupe droite parfaite pour les beaux jours.",
    price: 60,
    sizes: ALL_SIZES,
    colors: [{ name: "Light Blue", hex: "#7E9BC4", image: "shorts1.jpg" }],
    primaryImage: img("shorts1.jpg"),
    isNew: true,
    createdAt: "2025-05-23",
  },
  {
    id: "shorts-black",
    slug: "black-shorts",
    name: "Black Shorts",
    category: "shorts",
    tagline: "Essentiel · Polyvalent",
    description:
      "Le short noir essentiel. Polyvalent, structuré, finition impeccable.",
    price: 60,
    sizes: ALL_SIZES,
    colors: [{ name: "Black", hex: "#141414", image: "shorts2.jpg" }],
    primaryImage: img("shorts2.jpg"),
    isBestSeller: true,
    createdAt: "2025-05-14",
  },
  {
    id: "shorts-darkblue",
    slug: "dark-blue-shorts",
    name: "Dark Blue Shorts",
    category: "shorts",
    tagline: "Bleu marine · Sobriété élégante",
    description:
      "Short bleu marine profond. Une pièce sobre et élégante, taillée pour durer.",
    price: 60,
    sizes: ALL_SIZES,
    colors: [{ name: "Dark Blue", hex: "#0A1736", image: "shorts3.jpg" }],
    primaryImage: img("shorts3.jpg"),
    isFeatured: true,
    createdAt: "2025-05-17",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

/** Returns the unit price for a given product at a given total quantity. */
export function unitPriceFor(product: Product, qty: number): number {
  if (product.price !== undefined) return product.price;
  if (!product.priceTiers || product.priceTiers.length === 0) return 0;
  // sort ascending by qty
  const sorted = [...product.priceTiers].sort((a, b) => a.qty - b.qty);
  // find the highest tier whose qty <= requested qty
  let chosen = sorted[0];
  for (const tier of sorted) {
    if (qty >= tier.qty) chosen = tier;
  }
  return chosen.total / chosen.qty;
}

/** Returns the total price for a given product at a given quantity, using tiers. */
export function totalPriceFor(product: Product, qty: number): number {
  if (product.price !== undefined) return product.price * qty;
  if (!product.priceTiers) return 0;
  const sorted = [...product.priceTiers].sort((a, b) => a.qty - b.qty);
  // Find the best matching tier (highest qty <= requested), then compute remainder at unit tier
  let best = sorted[0];
  for (const tier of sorted) {
    if (qty >= tier.qty) best = tier;
  }
  if (qty <= best.qty) return best.total;
  const extra = qty - best.qty;
  return best.total + extra * (sorted[0].total / sorted[0].qty);
}

export function formatTND(n: number): string {
  return `${n.toFixed(0)} TND`;
}
