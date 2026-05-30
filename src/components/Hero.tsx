import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-indigo text-ivory overflow-hidden">
      {/* Subtle textile texture using layered linear-gradients (no images) */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #fff 0 1px, transparent 1px 6px), repeating-linear-gradient(-45deg, #fff 0 1px, transparent 1px 6px)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40 grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7">
          <p className="text-[11px] sm:text-xs tracking-[0.4em] uppercase text-ivory/70 mb-6">
            Collection Été — 2025
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl leading-[1.05] tracking-tight">
            L’élégance masculine,
            <br />
            <span className="italic text-ivory/90">réinventée.</span>
          </h1>
          <p className="mt-8 text-base sm:text-lg text-ivory/75 max-w-xl leading-relaxed">
            Des pièces raffinées, des matières premium et un style sophistiqué —
            façonnés en Tunisie pour l’homme moderne.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center bg-ivory text-indigo px-8 py-4 text-[11px] tracking-[0.3em] uppercase hover:bg-sand transition-colors"
            >
              Découvrir la boutique
            </Link>
            <Link
              href="/shop?category=t-shirts"
              className="inline-flex items-center justify-center border border-ivory/40 text-ivory px-8 py-4 text-[11px] tracking-[0.3em] uppercase hover:bg-ivory/10 transition-colors"
            >
              Voir les T-Shirts
            </Link>
          </div>

          <div className="mt-12 flex items-center gap-8 text-[11px] tracking-[0.2em] uppercase text-ivory/60">
            <span>Made in Tunisia</span>
            <span className="hidden sm:inline-block">·</span>
            <span className="hidden sm:inline">Matières premium</span>
            <span className="hidden sm:inline-block">·</span>
            <span className="hidden sm:inline">Coupe étudiée</span>
          </div>
        </div>

        {/* Right composition — typographic, no fake images */}
        <div className="lg:col-span-5 relative hidden lg:block">
          <div className="aspect-[4/5] bg-indigo-deep border border-ivory/15 flex flex-col items-center justify-center p-10 relative">
            <span className="font-serif text-[120px] leading-none text-ivory/15 absolute top-4 left-6">
              IJ
            </span>
            <div className="text-center relative z-10">
              <p className="font-serif text-2xl">INDIGO</p>
              <div className="flex items-center justify-center gap-3 mt-1 text-ivory/70 text-xs tracking-[0.4em]">
                <span className="h-px w-8 bg-ivory/40" />
                JEANS
                <span className="h-px w-8 bg-ivory/40" />
              </div>
              <p className="mt-10 text-sm text-ivory/70 max-w-[220px] mx-auto leading-relaxed">
                « Le style n’est pas une mode, c’est une attitude. »
              </p>
            </div>
            <span className="absolute bottom-4 right-6 text-[10px] tracking-[0.3em] text-ivory/40 uppercase">
              EST · TUNISIA
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
