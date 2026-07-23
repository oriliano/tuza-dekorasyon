import React from "react";
import { site } from "../lib/site.js";
import { services } from "../db/content-data.js";
import { Icon } from "./Icon.jsx";

const pageLinks = [
  { href: "/hizmetler", label: "Hizmetler" },
  { href: "/referanslar", label: "Referanslar" },
  { href: "/blog", label: "Blog" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/iletisim", label: "İletişim" },
];

export function Footer() {
  const tel = site.phonesIntl?.[0] || site.phones?.[0];
  const year = new Date().getFullYear();
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    site.address?.mapQuery || site.name
  )}`;

  return (
    <footer className="mt-24 bg-espresso text-cream/80">
      <div className="container-tuza grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        {/* Marka */}
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-clay text-white">
              <span className="font-serif text-lg font-semibold leading-none">T</span>
            </span>
            <span className="font-serif text-xl font-semibold text-cream">Tuza Dekorasyon</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/60">{site.slogan}</p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 text-xs font-medium text-cream/70">
            <Icon name="location" className="h-4 w-4 text-clay-soft" />
            {site.locationLabel}
          </div>
        </div>

        {/* Sayfalar */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-cream">Kurumsal</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {pageLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-cream/60 transition-colors hover:text-clay-soft">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Hizmetler */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-cream">Hizmetler</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {services.slice(0, 6).map((s) => (
              <li key={s.slug}>
                <a
                  href={`/hizmetler/${s.slug}`}
                  className="text-cream/60 transition-colors hover:text-clay-soft"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* İletişim */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-cream">İletişim</h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href={`tel:${tel}`} className="flex items-center gap-2.5 text-cream/70 hover:text-clay-soft">
                <Icon name="phone" className="h-4 w-4 text-clay-soft" />
                {site.phones?.[0]}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="flex items-center gap-2.5 text-cream/70 hover:text-clay-soft">
                <Icon name="mail" className="h-4 w-4 text-clay-soft" />
                {site.email}
              </a>
            </li>
            <li className="flex items-center gap-2.5 text-cream/70">
              <Icon name="clock" className="h-4 w-4 text-clay-soft" />
              {site.hours}
            </li>
            <li>
              <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-cream/70 hover:text-clay-soft">
                <Icon name="location" className="h-4 w-4 text-clay-soft" />
                Haritada Gör
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-tuza flex flex-col items-center justify-between gap-3 py-6 text-xs text-cream/50 sm:flex-row">
          <p>© {year} {site.name}. Tüm hakları saklıdır.</p>
          <p>Gaziantep · Boya, Mantolama & Dekorasyon</p>
        </div>
      </div>
    </footer>
  );
}
