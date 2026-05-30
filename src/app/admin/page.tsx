"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { PRODUCTS, formatTND } from "@/lib/products";
import type { Product, ColorVariant, Category, Size } from "@/lib/types";
import ProductImage from "@/components/ProductImage";

const ALL_SIZES: Size[] = ["S", "M", "L", "XL", "XXL"];
const CATEGORIES: Category[] = ["t-shirts", "shorts", "sets"];
const LS_KEY = "indigo_admin_products_v1";

function loadProducts(): Product[] {
  if (typeof window === "undefined") return PRODUCTS;
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Product[];
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {}
  return PRODUCTS;
}

function saveProducts(list: Product[]) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(list));
  } catch {}
}

export default function AdminPage() {
  const [list, setList] = useState<Product[]>(PRODUCTS);
  const [hydrated, setHydrated] = useState(false);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<Product | null>(null);
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");

  useEffect(() => {
    setList(loadProducts());
    setHydrated(true);
    if (sessionStorage.getItem("indigo_admin_auth") === "1") setAuthed(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveProducts(list);
  }, [list, hydrated]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return list;
    return list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }, [search, list]);

  function login() {
    // Lightweight gate (front-only). Replace with real auth before going live.
    if (pw === "indigo2025") {
      sessionStorage.setItem("indigo_admin_auth", "1");
      setAuthed(true);
    } else {
      alert("Mot de passe incorrect");
    }
  }

  function startNew() {
    setEditing({
      id: `new-${Date.now()}`,
      slug: "",
      name: "",
      category: "t-shirts",
      description: "",
      price: undefined,
      priceTiers: [
        { qty: 1, total: 39 },
        { qty: 2, total: 70 },
        { qty: 3, total: 90 },
      ],
      sizes: [...ALL_SIZES],
      colors: [{ name: "Black", hex: "#111111", image: "" }],
      primaryImage: "/uploads/",
      gallery: [],
      isNew: true,
      isBestSeller: false,
      isFeatured: false,
      createdAt: new Date().toISOString().slice(0, 10),
    });
  }

  function resetData() {
    if (confirm("Restaurer les produits par défaut ? Vos modifications seront perdues.")) {
      setList(PRODUCTS);
    }
  }

  function deleteProduct(id: string) {
    if (confirm("Supprimer ce produit ?")) {
      setList((l) => l.filter((p) => p.id !== id));
    }
  }

  function saveProduct(p: Product) {
    setList((l) => {
      const idx = l.findIndex((x) => x.id === p.id);
      if (idx >= 0) {
        const copy = [...l];
        copy[idx] = p;
        return copy;
      }
      return [p, ...l];
    });
    setEditing(null);
  }

  if (!authed) {
    return (
      <section className="max-w-md mx-auto px-4 py-24">
        <h1 className="font-serif text-3xl text-indigo">Espace Admin</h1>
        <p className="text-sm text-stone mt-2">Accès réservé.</p>
        <div className="mt-8 space-y-3">
          <input
            type="password"
            placeholder="Mot de passe"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && login()}
            className="w-full bg-ivory border border-neutral-300 px-4 py-3 focus:outline-none focus:border-indigo"
          />
          <button
            onClick={login}
            className="w-full bg-indigo text-ivory py-3 text-[11px] tracking-[0.3em] uppercase hover:bg-indigo-deep"
          >
            Se connecter
          </button>
          <p className="text-xs text-stone text-center">
            Mot de passe par défaut : <code>indigo2025</code>
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 pb-8 border-b border-neutral-200">
        <div>
          <p className="text-[10px] tracking-[0.4em] uppercase text-stone mb-2">
            Tableau de bord
          </p>
          <h1 className="font-serif text-4xl text-indigo">Gestion des Produits</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/" className="border border-neutral-300 px-4 py-2 text-[11px] tracking-[0.2em] uppercase text-indigo hover:border-indigo">
            Voir le site
          </Link>
          <button onClick={resetData} className="border border-neutral-300 px-4 py-2 text-[11px] tracking-[0.2em] uppercase text-stone hover:border-indigo hover:text-indigo">
            Réinitialiser
          </button>
          <button onClick={startNew} className="bg-indigo text-ivory px-5 py-2 text-[11px] tracking-[0.25em] uppercase hover:bg-indigo-deep">
            + Nouveau produit
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-8">
        <Stat label="Produits" value={list.length} />
        <Stat label="T-Shirts" value={list.filter((p) => p.category === "t-shirts").length} />
        <Stat label="Shorts" value={list.filter((p) => p.category === "shorts").length} />
        <Stat label="Ensembles" value={list.filter((p) => p.category === "sets").length} />
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          placeholder="Rechercher un produit…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-96 bg-ivory border border-neutral-300 px-4 py-3 focus:outline-none focus:border-indigo"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-neutral-200">
        <table className="w-full text-sm">
          <thead className="bg-sand text-[10px] tracking-[0.25em] uppercase text-stone">
            <tr>
              <th className="text-left p-3">Produit</th>
              <th className="text-left p-3">Catégorie</th>
              <th className="text-left p-3">Prix</th>
              <th className="text-left p-3">Couleurs</th>
              <th className="text-left p-3">Tags</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-t border-neutral-200">
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-14 bg-sand overflow-hidden">
                      <ProductImage src={p.primaryImage} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-serif text-base text-indigo">{p.name}</p>
                      <p className="text-xs text-stone">/{p.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="p-3 capitalize text-indigo">{p.category}</td>
                <td className="p-3 text-indigo">
                  {p.price !== undefined
                    ? formatTND(p.price)
                    : `${p.priceTiers?.[0].total} / ${p.priceTiers?.[1]?.total ?? "-"} / ${p.priceTiers?.[2]?.total ?? "-"} TND`}
                </td>
                <td className="p-3">
                  <div className="flex items-center gap-1">
                    {p.colors.map((c) => (
                      <span
                        key={c.name}
                        className="w-4 h-4 rounded-full border border-neutral-300"
                        style={{ background: c.hex }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </td>
                <td className="p-3 text-xs text-stone">
                  {[
                    p.isNew && "Nouveau",
                    p.isBestSeller && "Best",
                    p.isFeatured && "Featured",
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                </td>
                <td className="p-3 text-right whitespace-nowrap">
                  <button onClick={() => setEditing(p)} className="text-xs text-indigo underline mr-3">
                    Éditer
                  </button>
                  <button onClick={() => deleteProduct(p.id)} className="text-xs text-red-600 underline">
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="text-center py-12 text-stone">Aucun produit.</p>
        )}
      </div>

      <p className="text-xs text-stone mt-6">
        💡 Les modifications sont sauvegardées dans votre navigateur. Pour
        appliquer définitivement, éditez <code>src/lib/products.ts</code>.
      </p>

      {editing && (
        <ProductEditor
          product={editing}
          onClose={() => setEditing(null)}
          onSave={saveProduct}
        />
      )}
    </section>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-sand p-5">
      <p className="text-[10px] tracking-[0.3em] uppercase text-stone">{label}</p>
      <p className="font-serif text-3xl text-indigo mt-2">{value}</p>
    </div>
  );
}

/* ───────────────────────── Editor Modal ───────────────────────── */

function ProductEditor({
  product,
  onClose,
  onSave,
}: {
  product: Product;
  onClose: () => void;
  onSave: (p: Product) => void;
}) {
  const [p, setP] = useState<Product>(structuredClone(product));
  const [tab, setTab] = useState<"info" | "colors" | "images">("info");

  function set<K extends keyof Product>(key: K, value: Product[K]) {
    setP((prev) => ({ ...prev, [key]: value }));
  }

  function updateColor(i: number, patch: Partial<ColorVariant>) {
    setP((prev) => {
      const colors = [...prev.colors];
      colors[i] = { ...colors[i], ...patch };
      return { ...prev, colors };
    });
  }

  function addColor() {
    setP((prev) => ({
      ...prev,
      colors: [...prev.colors, { name: "Nouvelle couleur", hex: "#000000", image: "" }],
    }));
  }

  function removeColor(i: number) {
    setP((prev) => ({ ...prev, colors: prev.colors.filter((_, idx) => idx !== i) }));
  }

  function toggleSize(s: Size) {
    setP((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(s)
        ? prev.sizes.filter((x) => x !== s)
        : [...prev.sizes, s],
    }));
  }

  function addGallery(file: string) {
    if (!file) return;
    setP((prev) => ({ ...prev, gallery: [...(prev.gallery ?? []), file] }));
  }

  function removeGallery(i: number) {
    setP((prev) => ({ ...prev, gallery: (prev.gallery ?? []).filter((_, idx) => idx !== i) }));
  }

  function save() {
    if (!p.name.trim()) return alert("Le nom est obligatoire.");
    if (!p.slug.trim()) {
      p.slug = p.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
    }
    onSave(p);
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-ivory w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <header className="sticky top-0 bg-ivory border-b border-neutral-200 px-6 py-4 flex items-center justify-between">
          <h2 className="font-serif text-2xl text-indigo">
            {product.id.startsWith("new-") ? "Nouveau produit" : "Éditer le produit"}
          </h2>
          <button onClick={onClose} className="text-indigo p-1">
            <jpg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </jpg>
          </button>
        </header>

        {/* Tabs */}
        <div className="flex border-b border-neutral-200">
          {(["info", "colors", "images"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-3 text-[11px] tracking-[0.25em] uppercase ${
                tab === t ? "bg-indigo text-ivory" : "text-indigo hover:bg-sand"
              }`}
            >
              {t === "info" ? "Informations" : t === "colors" ? "Couleurs" : "Images"}
            </button>
          ))}
        </div>

        <div className="p-6 space-y-5">
          {tab === "info" && (
            <>
              <Field label="Nom">
                <input value={p.name} onChange={(e) => set("name", e.target.value)} className="adm-input" />
              </Field>
              <Field label="Slug (URL)">
                <input value={p.slug} onChange={(e) => set("slug", e.target.value)} placeholder="auto-généré" className="adm-input" />
              </Field>
              <Field label="Catégorie">
                <select value={p.category} onChange={(e) => set("category", e.target.value as Category)} className="adm-input">
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </Field>
              <Field label="Tagline">
                <input value={p.tagline ?? ""} onChange={(e) => set("tagline", e.target.value)} className="adm-input" />
              </Field>
              <Field label="Description">
                <textarea rows={4} value={p.description} onChange={(e) => set("description", e.target.value)} className="adm-input resize-none" />
              </Field>

              <Field label="Tarification">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      checked={p.price !== undefined}
                      onChange={() => setP({ ...p, price: p.price ?? 60, priceTiers: undefined })}
                    />
                    Prix fixe
                  </label>
                  {p.price !== undefined && (
                    <input
                      type="number"
                      value={p.price}
                      onChange={(e) => set("price", Number(e.target.value))}
                      className="adm-input"
                      placeholder="Prix en TND"
                    />
                  )}
                  <label className="flex items-center gap-2 text-sm mt-2">
                    <input
                      type="radio"
                      checked={p.priceTiers !== undefined}
                      onChange={() =>
                        setP({
                          ...p,
                          price: undefined,
                          priceTiers: p.priceTiers ?? [
                            { qty: 1, total: 39 },
                            { qty: 2, total: 70 },
                            { qty: 3, total: 90 },
                          ],
                        })
                      }
                    />
                    Prix par paliers de quantité
                  </label>
                  {p.priceTiers && (
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {p.priceTiers.map((t, i) => (
                        <div key={i} className="border border-neutral-300 p-2">
                          <p className="text-[10px] tracking-[0.2em] uppercase text-stone">Qté {t.qty}</p>
                          <input
                            type="number"
                            value={t.total}
                            onChange={(e) => {
                              const v = Number(e.target.value);
                              setP((prev) => ({
                                ...prev,
                                priceTiers: prev.priceTiers!.map((x, idx) =>
                                  idx === i ? { ...x, total: v } : x
                                ),
                              }));
                            }}
                            className="adm-input mt-1"
                          />
                          <p className="text-[10px] text-stone mt-1">TND</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Field>

              <Field label="Tailles disponibles">
                <div className="flex flex-wrap gap-2">
                  {ALL_SIZES.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleSize(s)}
                      className={`px-3 py-1.5 text-xs border ${
                        p.sizes.includes(s)
                          ? "bg-indigo text-ivory border-indigo"
                          : "border-neutral-300 text-indigo"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </Field>

              <Field label="Étiquettes">
                <div className="flex flex-wrap gap-4 text-sm">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={!!p.isNew}
                      onChange={(e) => set("isNew", e.target.checked)}
                    />
                    Nouveau
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={!!p.isBestSeller}
                      onChange={(e) => set("isBestSeller", e.target.checked)}
                    />
                    Best-seller
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={!!p.isFeatured}
                      onChange={(e) => set("isFeatured", e.target.checked)}
                    />
                    Mis en avant
                  </label>
                </div>
              </Field>
            </>
          )}

          {tab === "colors" && (
            <>
              <p className="text-xs text-stone">
                Ajoutez, modifiez ou supprimez les variantes de couleur. Chaque
                couleur peut avoir sa propre image associée (nom du fichier
                dans <code>/public/uploads</code>).
              </p>
              <div className="space-y-3">
                {p.colors.map((c, i) => (
                  <div key={i} className="border border-neutral-200 p-3 grid grid-cols-12 gap-3 items-center">
                    <input
                      value={c.name}
                      onChange={(e) => updateColor(i, { name: e.target.value })}
                      placeholder="Nom"
                      className="adm-input col-span-4"
                    />
                    <div className="col-span-3 flex items-center gap-2">
                      <input
                        type="color"
                        value={c.hex}
                        onChange={(e) => updateColor(i, { hex: e.target.value })}
                        className="w-10 h-10 border border-neutral-300"
                      />
                      <input
                        value={c.hex}
                        onChange={(e) => updateColor(i, { hex: e.target.value })}
                        className="adm-input flex-1"
                      />
                    </div>
                    <input
                      value={c.image ?? ""}
                      onChange={(e) => updateColor(i, { image: e.target.value })}
                      placeholder="image.jpg"
                      className="adm-input col-span-4"
                    />
                    <button
                      onClick={() => removeColor(i)}
                      className="col-span-1 text-red-600 text-xs underline"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
              <button onClick={addColor} className="border border-indigo text-indigo px-4 py-2 text-[11px] tracking-[0.25em] uppercase">
                + Ajouter une couleur
              </button>
            </>
          )}

          {tab === "images" && (
            <>
              <Field label="Image principale (chemin)">
                <input
                  value={p.primaryImage}
                  onChange={(e) => set("primaryImage", e.target.value)}
                  placeholder="/uploads/file.jpg"
                  className="adm-input"
                />
                <div className="mt-3 w-32 h-40 bg-sand overflow-hidden">
                  <ProductImage src={p.primaryImage} alt="" className="w-full h-full object-cover" />
                </div>
              </Field>

              <Field label="Galerie additionnelle (noms de fichiers dans /uploads)">
                <div className="space-y-2">
                  {(p.gallery ?? []).map((g, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-14 h-16 bg-sand overflow-hidden flex-shrink-0">
                        <ProductImage src={`/uploads/${g}`} alt="" className="w-full h-full object-cover" />
                      </div>
                      <input
                        value={g}
                        onChange={(e) => {
                          const v = e.target.value;
                          setP((prev) => ({
                            ...prev,
                            gallery: prev.gallery!.map((x, idx) => (idx === i ? v : x)),
                          }));
                        }}
                        className="adm-input flex-1"
                      />
                      <button onClick={() => removeGallery(i)} className="text-red-600 text-xs">
                        Retirer
                      </button>
                    </div>
                  ))}
                </div>
                <AddImageRow onAdd={addGallery} />
              </Field>

              <p className="text-xs text-stone bg-sand p-3">
                💡 Pour ajouter de nouvelles images : placez vos fichiers JPG
                dans <code>/public/uploads/</code> du projet, puis indiquez ici
                leur nom (ex : <code>national4.jpg</code>).
              </p>
            </>
          )}
        </div>

        <footer className="sticky bottom-0 bg-ivory border-t border-neutral-200 px-6 py-4 flex justify-end gap-3">
          <button onClick={onClose} className="border border-neutral-300 px-5 py-2 text-[11px] tracking-[0.25em] uppercase text-indigo">
            Annuler
          </button>
          <button onClick={save} className="bg-indigo text-ivory px-6 py-2 text-[11px] tracking-[0.25em] uppercase hover:bg-indigo-deep">
            Enregistrer
          </button>
        </footer>
      </div>

      <style jsx global>{`
        .adm-input {
          background: var(--color-ivory);
          border: 1px solid #d4d4d4;
          padding: 0.5rem 0.75rem;
          width: 100%;
          font-size: 0.875rem;
          color: #0E1E45;
        }
        .adm-input:focus { outline: none; border-color: #0E1E45; }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[10px] tracking-[0.3em] uppercase text-stone mb-2">{label}</p>
      {children}
    </div>
  );
}

function AddImageRow({ onAdd }: { onAdd: (file: string) => void }) {
  const [v, setV] = useState("");
  return (
    <div className="flex gap-2 mt-2">
      <input
        value={v}
        onChange={(e) => setV(e.target.value)}
        placeholder="nouveau-fichier.jpg"
        className="adm-input flex-1"
      />
      <button
        onClick={() => {
          if (v.trim()) {
            onAdd(v.trim());
            setV("");
          }
        }}
        className="border border-indigo text-indigo px-4 py-2 text-[11px] tracking-[0.2em] uppercase whitespace-nowrap"
      >
        Ajouter
      </button>
    </div>
  );
}
