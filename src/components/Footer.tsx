import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#021943] text-ivory mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Changed grid to 3 columns instead of 4 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <Logo variant="light" />
            <p className="mt-6 text-sm leading-relaxed text-ivory/70 max-w-xs">
              L’élégance masculine réinventée à travers des pièces raffinées,
              des matières premium et un style sophistiqué.
            </p>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-4">Boutique</h4>
            <ul className="space-y-2 text-sm text-ivory/70">
              <li><Link href="/shop" className="hover:text-ivory">Tous les produits</Link></li>
              <li><Link href="/shop?category=t-shirts" className="hover:text-ivory">T-Shirts</Link></li>
              <li><Link href="/shop?category=shorts" className="hover:text-ivory">Shorts</Link></li>
              <li><Link href="/shop?category=sets" className="hover:text-ivory">Ensembles</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-ivory/70">
              <li>Tunis, Tunisie</li>
              <li><a href="mailto:contact@indigojeans.tn" className="hover:text-ivory">contact@indigojeans.tn</a></li>
              <li><a href="tel:+21600000000" className="hover:text-ivory">+216 00 000 000</a></li>
              <li className="pt-2 flex gap-4">
                <a href="https://instagram.com" aria-label="Instagram" className="hover:text-ivory">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                  </svg>
                </a>
                <a href="https://facebook.com" aria-label="Facebook" className="hover:text-ivory">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M14 9h3V5h-3a4 4 0 0 0-4 4v2H7v4h3v6h4v-6h3l1-4h-4V9z" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-ivory/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ivory/60 tracking-wider">
          <p>© {new Date().getFullYear()} Indigo Jeans — indigojeans.tn</p>
          <p>Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}