import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";

export const metadata: Metadata = {
  title: "Indigo Jeans — L'élégance masculine réinventée",
  description:
    "Indigo Jeans Tunisie — Pièces raffinées, matières premium et style sophistiqué pour l'homme moderne. T-shirts, shorts et ensembles.",
  metadataBase: new URL("https://indigojeans.tn"),
  openGraph: {
    title: "Indigo Jeans Tunisie",
    description:
      "L'élégance masculine réinventée à travers des pièces raffinées et un style sophistiqué.",
    url: "https://indigojeans.tn",
    siteName: "Indigo Jeans",
    locale: "fr_TN",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-ivory text-neutral-900 antialiased">
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
