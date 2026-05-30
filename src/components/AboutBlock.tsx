export default function AboutBlock() {
  return (
    <section id="about" className="bg-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-[10px] tracking-[0.4em] uppercase text-stone mb-4">
            La Maison
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl text-indigo leading-tight">
            Une vision tunisienne <br />
            de l’élégance masculine.
          </h2>
          <p className="mt-8 text-base text-neutral-700 leading-relaxed max-w-xl">
            Indigo Jeans est née d’une conviction simple : l’homme moderne
            mérite des vêtements pensés avec soin, taillés dans des matières
            nobles et conçus pour durer. Chaque pièce de notre collection
            incarne un équilibre entre tradition, raffinement et modernité.
          </p>
          <p className="mt-4 text-base text-neutral-700 leading-relaxed max-w-xl">
            De la sélection des tissus à la finition des coutures, nous
            cultivons une attention au détail qui fait toute la différence.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
            <div>
              <p className="font-serif text-3xl text-indigo">100%</p>
              <p className="text-[10px] tracking-[0.25em] uppercase text-stone mt-1">
                Coton premium
              </p>
            </div>
            <div>
              <p className="font-serif text-3xl text-indigo">TN</p>
              <p className="text-[10px] tracking-[0.25em] uppercase text-stone mt-1">
                Made in Tunisia
              </p>
            </div>
            <div>
              <p className="font-serif text-3xl text-indigo">+5K</p>
              <p className="text-[10px] tracking-[0.25em] uppercase text-stone mt-1">
                Clients satisfaits
              </p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-[4/5] bg-indigo p-10 flex flex-col justify-between text-ivory">
            <p className="font-serif text-2xl leading-snug">
              « Le style n’est pas une question de prix,<br />
              mais d’attention au détail. »
            </p>
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-ivory/60">
                Maison Indigo · Tunis
              </p>
              <p className="font-serif text-3xl mt-2">INDIGO JEANS</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
