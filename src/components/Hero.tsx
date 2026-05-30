import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative bg-[#021943] text-ivory overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7">
          <p className="text-[11px] sm:text-xs tracking-[0.4em] uppercase text-ivory/70 mb-6">
            Collection Été — 2025
          </p>
          
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
            L’élégance masculine,
            <br />
            <span className="italic text-ivory/90">réinventée.</span>
          </h1>
          
          <p className="mt-6 text-base sm:text-lg text-ivory/75 max-w-xl leading-relaxed">
            Des pièces raffinées, des matières premium et un style sophistiqué —
            façonnés en Tunisie pour l’homme moderne.
          </p>
          
          <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center bg-ivory text-indigo px-8 py-4 text-[11px] tracking-[0.3em] uppercase hover:bg-sand transition-colors"
            >
              Découvrir la boutique
            </Link>
            
            <Link
              href="/contact"
              className="inline-flex items-center justify-center border border-ivory/40 text-ivory px-8 py-4 text-[11px] tracking-[0.3em] uppercase hover:bg-ivory/10 transition-colors"
            >
              Nous contacter
            </Link>
          </div>

          <div className="mt-10 flex items-center gap-8 text-[11px] tracking-[0.2em] uppercase text-ivory/60">
            <span>Made in Tunisia</span>
            <span className="hidden sm:inline-block">·</span>
            <span className="hidden sm:inline">Matières premium</span>
            <span className="hidden sm:inline-block">·</span>
            <span className="hidden sm:inline">Coupe étudiée</span>
          </div>
        </div>

        <div className="lg:col-span-5 relative hidden lg:flex items-center justify-center">
          <Image
            src="/uploads/indigo-logo.jpg"
            alt="Indigo Jeans Logo"
            width={400}
            height={400}
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}