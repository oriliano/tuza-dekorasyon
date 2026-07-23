import React from "react";
import { site } from "../lib/site.js";
import { Icon } from "./Icon.jsx";
import { Reveal } from "./Reveal.jsx";

export function CtaBand({ title, text }) {
  const tel = site.phonesIntl?.[0] || site.phones?.[0];
  return (
    <section className="container-tuza">
      <Reveal className="relative overflow-hidden rounded-[2rem] bg-espresso px-6 py-14 text-center shadow-soft sm:px-12 sm:py-16">
        {/* dekoratif ışıklar */}
        <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-clay/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-10 h-64 w-64 rounded-full bg-clay-soft/20 blur-3xl" />
        <div className="relative mx-auto max-w-2xl">
          <span className="eyebrow text-clay-soft">
            <span className="h-px w-6 bg-current" />
            Ücretsiz Keşif
          </span>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight text-cream sm:text-4xl">
            {title}
          </h2>
          {text && <p className="mt-4 text-lg leading-relaxed text-cream/70">{text}</p>}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href={`tel:${tel}`} className="btn btn-primary w-full sm:w-auto">
              <Icon name="phone" className="h-4 w-4" />
              {site.phones?.[0]}
            </a>
            <a href="/iletisim" className="btn btn-white w-full sm:w-auto">
              İletişim Formu
              <Icon name="arrow" className="h-4 w-4" />
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
