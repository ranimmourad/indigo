"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "./Logo";
import { useCart } from "@/context/CartContext";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/shop", label: "Boutique" },
  { href: "/shop?category=t-shirts", label: "T-Shirts" },
  { href: "/shop?category=shorts", label: "Shorts" },
  { href: "/shop?category=sets", label: "Ensembles" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { itemCount, open } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-ivory border-b border-neutral-200">
      {/* Announcement bar */}
      <div className="bg-indigo text-ivory text-[11px] sm:text-xs tracking-[0.25em] uppercase text-center py-2">
        Livraison gratuite en Tunisie dès 150 TND
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Menu"
          className="md:hidden text-indigo p-2 -ml-2"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="3" y1="7" x2="21" y2="7" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="17" x2="21" y2="17" />
          </svg>
        </button>

        {/* Center on mobile, left on desktop */}
        <div className="flex-1 flex md:flex-none justify-center md:justify-start md:absolute md:left-1/2 md:-translate-x-1/2">
          <Logo />
        </div>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8 text-[13px] uppercase tracking-[0.18em] text-indigo">
          <li>
            <Link
              href="/"
              className={`link-underline ${pathname === "/" ? "font-semibold" : ""}`}
            >
              Accueil
            </Link>
          </li>
          <li>
            <Link
              href="/shop"
              className={`link-underline ${pathname?.startsWith("/shop") ? "font-semibold" : ""}`}
            >
              Boutique
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className={`link-underline ${pathname === "/contact" ? "font-semibold" : ""}`}
            >
              Contact
            </Link>
          </li>
        </ul>

        {/* Right cluster */}
        <div className="flex items-center gap-3 sm:gap-5 text-indigo">
          <Link
            href="/shop"
            aria-label="Rechercher"
            className="hidden sm:inline-flex p-2 hover:opacity-70 transition"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="7" />
              <line x1="20" y1="20" x2="16.65" y2="16.65" />
            </svg>
          </Link>
          
          {/* Admin icon removed here */}
          
          <button
            onClick={open}
            aria-label="Panier"
            className="relative p-2 hover:opacity-70 transition"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 6h15l-1.5 9h-12z" />
              <circle cx="9" cy="20" r="1.5" />
              <circle cx="18" cy="20" r="1.5" />
              <path d="M6 6L5 3H2" />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-indigo text-ivory text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-neutral-200 bg-ivory">
          <ul className="px-6 py-4 flex flex-col gap-3 text-[14px] uppercase tracking-[0.18em] text-indigo">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-2 border-b border-neutral-200/60"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            {/* Admin text link removed here */}
          </ul>
        </div>
      )}
    </header>
  );
}