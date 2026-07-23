import React, { useEffect, useState } from "react";
import { usePageContext } from "vike-react/usePageContext";
import { site } from "../lib/site.js";
import { Icon } from "./Icon.jsx";

const nav = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/hizmetler", label: "Hizmetler" },
  { href: "/referanslar", label: "Referanslar" },
  { href: "/blog", label: "Blog" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/iletisim", label: "İletişim" },
];

function isActive(path, href) {
  if (href === "/") return path === "/";
  return path === href || path.startsWith(href + "/");
}

export function Header() {
  const { urlPathname } = usePageContext();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const tel = site.phonesIntl?.[0] || site.phones?.[0];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "bg-cream/90 shadow-card backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="container-tuza flex h-[72px] items-center justify-between">
        <a href="/" className="group flex items-center gap-2.5" aria-label={site.name}>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-clay text-white shadow-[0_6px_18px_-6px_rgba(194,65,12,0.7)] transition-transform group-hover:rotate-3">
            <span className="font-serif text-lg font-semibold leading-none">T</span>
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-serif text-[1.35rem] font-semibold text-espresso">Tuza</span>
            <span className="text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-espresso-muted">
              Dekorasyon
            </span>
          </span>
        </a>

        {/* Masaüstü nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                isActive(urlPathname, n.href)
                  ? "text-clay"
                  : "text-espresso-soft hover:text-clay"
              }`}
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${tel}`}
            className="hidden items-center gap-2 text-sm font-semibold text-espresso hover:text-clay sm:flex"
          >
            <Icon name="phone" className="h-4 w-4 text-clay" />
            {site.phones?.[0]}
          </a>
          <a href="/iletisim" className="btn btn-primary hidden py-2.5 md:inline-flex">
            Ücretsiz Keşif
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-espresso lg:hidden"
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={open}
          >
            <Icon name={open ? "close" : "menu"} className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobil menü */}
      <div
        className={`overflow-hidden border-t border-espresso/5 bg-cream/95 backdrop-blur-md transition-[max-height,opacity] duration-300 lg:hidden ${
          open ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="container-tuza flex flex-col gap-1 py-4">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className={`rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                isActive(urlPathname, n.href)
                  ? "bg-clay/10 text-clay"
                  : "text-espresso-soft hover:bg-sand/40"
              }`}
            >
              {n.label}
            </a>
          ))}
          <a href="/iletisim" onClick={() => setOpen(false)} className="btn btn-primary mt-2">
            Ücretsiz Keşif İste
          </a>
        </nav>
      </div>
    </header>
  );
}
