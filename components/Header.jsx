import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { usePageContext } from "vike-react/usePageContext";
import { site } from "../lib/site.js";
import { Icon } from "./Icon.jsx";
import { DURATION, EASE_OUT, SPRING, useMotionSafe } from "./motion.jsx";

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
  const safe = useMotionSafe();
  const tel = site.phonesIntl?.[0] || site.phones?.[0];

  // Sayfa okuma ilerlemesi — ince, dikkat dağıtmayan bir clay şerit.
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

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

  // Kaçış yolu: menü açıkken Escape kapatır.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
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
        <a
          href="/"
          className="group rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-clay/40 focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
          aria-label={site.name}
        >
          <motion.img
            src={site.logo || "/logo.svg"}
            alt="Tuza Dekorasyon"
            width="180"
            height="48"
            className="h-12 w-auto"
            whileHover={safe ? { scale: 1.03 } : undefined}
            transition={SPRING}
          />
        </a>

        {/* Masaüstü nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((n) => {
            const active = isActive(urlPathname, n.href);
            return (
              <a
                key={n.href}
                href={n.href}
                aria-current={active ? "page" : undefined}
                className={`nav-link ${active ? "nav-link-active" : "nav-link-idle"}`}
              >
                {n.label}
                {active && (
                  // layoutId: gösterge sayfalar arasında kayarak taşınır.
                  <motion.span
                    layoutId={safe ? "nav-active" : undefined}
                    className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-clay"
                    transition={SPRING}
                  />
                )}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${tel}`}
            className="hidden items-center gap-2 text-sm font-semibold text-espresso hover:text-clay sm:flex"
          >
            <Icon name="phone" className="h-4 w-4 text-clay" />
            {site.phones?.[0]}
          </a>
          <motion.a
            href="/iletisim"
            className="btn btn-primary hidden py-2.5 md:inline-flex"
            whileHover={safe ? { y: -2 } : undefined}
            whileTap={safe ? { scale: 0.97 } : undefined}
            transition={SPRING}
          >
            Ücretsiz Keşif
          </motion.a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-espresso focus:outline-none focus-visible:ring-2 focus-visible:ring-clay/40 focus-visible:ring-offset-2 focus-visible:ring-offset-cream lg:hidden"
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={open}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "close" : "menu"}
                initial={safe ? { rotate: -90, opacity: 0 } : false}
                animate={{ rotate: 0, opacity: 1 }}
                exit={safe ? { rotate: 90, opacity: 0 } : undefined}
                transition={{ duration: DURATION.fast, ease: EASE_OUT }}
              >
                <Icon name={open ? "close" : "menu"} className="h-6 w-6" />
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Okuma ilerlemesi */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-clay"
        style={{ scaleX: safe ? progress : 0 }}
        aria-hidden="true"
      />

      {/* Mobil menü */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="mobile-menu"
            className="overflow-hidden border-t border-espresso/5 bg-cream/95 backdrop-blur-md lg:hidden"
            initial={safe ? { height: 0, opacity: 0 } : false}
            animate={{ height: "auto", opacity: 1 }}
            exit={safe ? { height: 0, opacity: 0 } : undefined}
            // Çıkış girişten kısa: kapanış daha tepkisel hissettirir.
            transition={{ duration: DURATION.base, ease: EASE_OUT }}
          >
            <nav className="container-tuza flex flex-col gap-1 py-4">
              {nav.map((n, i) => (
                <motion.a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  initial={safe ? { opacity: 0, x: -12 } : false}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: DURATION.base,
                    ease: EASE_OUT,
                    delay: safe ? 0.04 + i * 0.035 : 0,
                  }}
                  className={`rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                    isActive(urlPathname, n.href)
                      ? "bg-clay/10 text-clay"
                      : "text-espresso-soft hover:bg-sand/40"
                  }`}
                >
                  {n.label}
                </motion.a>
              ))}
              <a href="/iletisim" onClick={() => setOpen(false)} className="btn btn-primary mt-2">
                Ücretsiz Keşif İste
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
