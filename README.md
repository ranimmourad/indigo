# Indigo Jeans — E-commerce Tunisie

> L’élégance masculine réinventée à travers des pièces raffinées, des matières
> premium et un style sophistiqué.

A premium, minimalist e-commerce experience for **Indigo Jeans Tunisia** —
built with **Next.js 15 (App Router) + TypeScript + TailwindCSS** and
designed for instant deployment on **Vercel**.

---

## ✨ Features

- 🎨 **Premium minimalist UI** inspired by the Indigo Jeans logo (navy /
  ivory / sand neutral palette, Cormorant Garamond × Inter typography)
- 📱 **Fully responsive** — mobile-first navigation with off-canvas menu
- 🛒 **Slide cart** with quantity controls, persistent in `localStorage`
- 🔍 **Shop page** with category filters, size/color filters, search
  & sort (newest / price asc / price desc)
- 🧾 **Product details** with multi-image gallery, color swatches, size
  selector, quantity selector and tiered pricing (1 = 39 TND, 2 = 70 TND,
  3 = 90 TND)
- 💼 **Admin dashboard** (password-gated) to add / edit / delete products,
  manage colors and gallery images, search and toggle “new / best-seller /
  featured” tags
- 🇹🇳 All prices displayed in **TND**, French copy throughout
- ⚡ Static pre-rendering of all product pages — instant page loads
- 🖼️ Smart image system with **automatic SVG placeholder fallback** until
  you upload the real photos

---

## 🚀 Quick Start

```bash
npm install --legacy-peer-deps
npm run dev          # http://localhost:3000
npm run build        # production build
npm start            # serve production build on :3000
```

The dev sandbox is currently served via PM2:

```bash
pm2 list
pm2 logs indigo-jeans --nostream
pm2 restart indigo-jeans
```

---

## 📂 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout + CartProvider + Navbar/Footer
│   ├── globals.css         # Tailwind + font imports + helpers
│   ├── page.tsx            # Home (Hero, New Arrivals, Categories, ...)
│   ├── shop/page.tsx       # Shop grid w/ filters + sort + search
│   ├── product/[slug]/     # Dynamic product pages (SSG)
│   ├── cart/page.tsx       # Full cart view + checkout summary
│   ├── contact/page.tsx    # Contact form + business info
│   └── admin/page.tsx      # Admin dashboard (CRUD products)
├── components/
│   ├── Navbar.tsx          # Sticky nav + announcement bar + cart badge
│   ├── Footer.tsx          # Multi-column dark footer
│   ├── Hero.tsx            # Indigo hero with typographic composition
│   ├── ProductCard.tsx     # Grid product card with swatches
│   ├── ProductDetail.tsx   # Gallery + variant selectors + add-to-cart
│   ├── ProductImage.tsx    # <img> with .jpg → .svg fallback
│   ├── CategoryStrip.tsx   # Home category showcase
│   ├── AboutBlock.tsx      # About section
│   ├── SectionHeader.tsx   # Reusable section header
│   ├── CartDrawer.tsx      # Slide-in cart panel
│   └── Logo.tsx            # Text logo matching the brand identity
├── context/
│   └── CartContext.tsx     # useCart() hook + reducer + persistence
├── lib/
│   ├── types.ts            # Product / CartLine / Size / Category types
│   └── products.ts         # Product catalog + pricing helpers
public/
└── uploads/                # ← Drop real product JPGs here (see below)
```

---

## 🖼️ Product Images — How to Replace Placeholders

The catalog references the exact filenames you specified.
**Drop your JPGs into `/public/uploads/`** using these names:

### T-Shirts
| Product | Color | File |
|---|---|---|
| National | Red    | `national1.jpg` |
| National | White  | `national2.jpg` |
| National | Yellow | `national3.jpg` |
| National | Blue   | *(to upload later — add the file)* |
| National | Pink   | *(to upload later — add the file)* |
| Moncler        | all | `monclertshirts.jpg` |
| Calvin Klein   | all | `calvinklein.jpg`    |
| Loro Piana     | all | `lordpiana.jpg`      |
| Lacoste        | all | `lacoste.jpg`        |
| Indigo | White    | `indigotshirtwhite.jpg`    |
| Indigo | Black    | `indigotshirtblack.jpg`    |
| Indigo | Green    | `indigotshirtgreen.jpg`    |
| Indigo | Pink     | `indigotshirtpink.jpg`     |
| Indigo | Burgundy | `indigotshirtburgendy.jpg` |

### Sets (70 TND)
`blackset.jpg`, `brownset.jpg`, `greenset.jpg`, `blueset.jpg`

### Shorts (60 TND)
`shorts1.jpg` (Light Blue), `shorts2.jpg` (Black), `shorts3.jpg` (Dark Blue)

> Until the JPGs are uploaded, the site shows neutral **SVG placeholders** of
> the same name (`<basename>.svg`). The `<ProductImage>` component falls back
> automatically — so the UI is never broken.

---

## 💰 Pricing Model

Two pricing strategies are supported per-product (see `src/lib/types.ts`):

1. **Fixed price** (`product.price`) — used by Indigo T-Shirt (43 TND),
   all Sets (70 TND), all Shorts (60 TND).
2. **Tiered price** (`product.priceTiers`) — used by all other t-shirts:
   1 = 39 TND, 2 = 70 TND, 3 = 90 TND. The unit price scales with quantity,
   and the “à partir de” label appears on cards.

Helpers:
- `unitPriceFor(product, qty)` — returns the unit price at a given qty
- `totalPriceFor(product, qty)` — returns the total cart price
- `formatTND(n)` — formats `39 TND`

---

## 🔐 Admin Dashboard

Visit **`/admin`** and log in with the default password **`indigo2025`**
(change it inside `src/app/admin/page.tsx`).

Capabilities:
- ✅ Add / edit / delete products
- ✅ Manage color variants (name, hex, image filename) — add or remove
- ✅ Manage gallery images (filenames in `/public/uploads`)
- ✅ Toggle “Nouveau” / “Best-seller” / “Mis en avant”
- ✅ Switch between fixed-price and tiered-price models
- ✅ Search products
- ✅ Persists to `localStorage` so you can preview changes instantly

> ⚠️ Edits made through the dashboard live in your browser only. To make
> them permanent across all visitors, edit `src/lib/products.ts` directly
> (or wire up a CMS / API route later — the data shape is identical).

---

## 🛣️ Routes Summary

| Path | Description |
|---|---|
| `/`                       | Homepage (Hero, New Arrivals, Categories, Featured, Best Sellers, About) |
| `/shop`                   | Shop grid with filters & sort |
| `/shop?category=t-shirts` | Pre-filtered shop |
| `/shop?category=shorts`   | Pre-filtered shop |
| `/shop?category=sets`     | Pre-filtered shop |
| `/product/[slug]`         | Product detail page (SSG, one per product) |
| `/cart`                   | Full cart view + order summary |
| `/contact`                | Contact form |
| `/admin`                  | Admin dashboard (password-gated) |

---

## 🚢 Deploy to Vercel

The project is **Vercel-ready** — `vercel.json` is included.

1. Push the repo to GitHub.
2. Import the project on [vercel.com](https://vercel.com/new).
3. Framework preset will auto-detect **Next.js**.
4. Install command: `npm install --legacy-peer-deps` (already configured).
5. Deploy — the production URL will be available in seconds.

To use the custom domain `indigojeans.tn`:
- Add the domain inside Vercel → Project → Settings → Domains
- Point your DNS A/AAAA records (or CNAME) to Vercel as instructed

---

## 🎨 Design Tokens

| Token         | Hex       | Usage                                  |
|---------------|-----------|----------------------------------------|
| `indigo`      | `#0E1E45` | Primary brand color, headers, CTAs     |
| `indigo-deep` | `#0A1736` | Hover state for CTAs                   |
| `ivory`       | `#F7F5F0` | Background, navy-text contrast surface |
| `sand`        | `#E8E4DA` | Card backgrounds, image placeholders   |
| `stone`       | `#8A8579` | Secondary text                         |

Typography: **Cormorant Garamond** (serif headings) × **Inter** (sans body).
No glassmorphism. No floating elements. No heavy shadows. No AI-look.

---

## 📋 Tech Stack

- **Next.js 16** (App Router, Turbopack build) — actually installs as
  latest of the 15.x family; configured via `next@latest`
- **React 19**
- **TypeScript 5**
- **TailwindCSS 3** with custom theme tokens
- **PM2** for sandbox process management
- **localStorage** for cart + admin persistence (swap to a DB / API later)

---

## ✅ Status

| | |
|---|---|
| Build       | ✅ Passing (20 pages prerendered) |
| Deployment  | ✅ Vercel-ready, also runs on PM2 locally |
| Last update | 2026-05-30 |

---

© Indigo Jeans · indigojeans.tn
