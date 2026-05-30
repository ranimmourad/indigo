"use client";

import { useState } from "react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    // No backend yet — show confirmation.
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
  }

  return (
    <>
      <section className="bg-indigo text-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="text-[10px] tracking-[0.4em] uppercase text-ivory/70 mb-3">
            Contact
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl">Parlons-en.</h1>
          <p className="mt-3 text-ivory/70 max-w-xl">
            Une question, une commande, une suggestion — notre équipe se tient
            à votre disposition.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-1 space-y-8">
          <div>
            <h3 className="font-serif text-xl text-indigo">Adresse</h3>
            <p className="text-sm text-neutral-700 mt-2">
              Tunis, Tunisie
              <br />
              indigojeans.tn
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-indigo">Email</h3>
            <a href="mailto:contact@indigojeans.tn" className="text-sm text-neutral-700 mt-2 block hover:text-indigo">
              contact@indigojeans.tn
            </a>
          </div>
          <div>
            <h3 className="font-serif text-xl text-indigo">Téléphone</h3>
            <a href="tel:+21600000000" className="text-sm text-neutral-700 mt-2 block hover:text-indigo">
              +216 00 000 000
            </a>
          </div>
          <div>
            <h3 className="font-serif text-xl text-indigo">Horaires</h3>
            <p className="text-sm text-neutral-700 mt-2">
              Lun – Sam : 9h – 19h
              <br />
              Dim : Fermé
            </p>
          </div>
        </div>

        <form
          onSubmit={submit}
          className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5"
        >
          <div className="sm:col-span-1">
            <label className="text-[10px] tracking-[0.3em] uppercase text-stone">Nom</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mt-2 w-full bg-ivory border border-neutral-300 px-4 py-3 focus:outline-none focus:border-indigo"
            />
          </div>
          <div className="sm:col-span-1">
            <label className="text-[10px] tracking-[0.3em] uppercase text-stone">Email</label>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="mt-2 w-full bg-ivory border border-neutral-300 px-4 py-3 focus:outline-none focus:border-indigo"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-[10px] tracking-[0.3em] uppercase text-stone">Sujet</label>
            <input
              required
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="mt-2 w-full bg-ivory border border-neutral-300 px-4 py-3 focus:outline-none focus:border-indigo"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-[10px] tracking-[0.3em] uppercase text-stone">Message</label>
            <textarea
              required
              rows={6}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="mt-2 w-full bg-ivory border border-neutral-300 px-4 py-3 focus:outline-none focus:border-indigo resize-none"
            />
          </div>
          <div className="sm:col-span-2 flex items-center justify-between gap-4">
            {sent && (
              <p className="text-sm text-indigo">Merci, votre message a été envoyé.</p>
            )}
            <button
              type="submit"
              className="ml-auto bg-indigo text-ivory px-10 py-4 text-[11px] tracking-[0.3em] uppercase hover:bg-indigo-deep"
            >
              Envoyer
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
