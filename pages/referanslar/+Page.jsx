import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useData } from "vike-react/useData";
import { site as staticSite } from "../../lib/site.js";
import { PageHero } from "../../components/PageHero.jsx";
import { ProjectCard } from "../../components/Cards.jsx";
import { CtaBand } from "../../components/CtaBand.jsx";
import { DURATION, EASE_OUT, SPRING, useMotionSafe } from "../../components/motion.jsx";

export default function Page() {
  const { projects = [], services = [] } = useData();
  const [active, setActive] = useState("all");
  const safe = useMotionSafe();

  const usedServices = services.filter((s) => projects.some((p) => p.service === s.slug));
  const filtered = active === "all" ? projects : projects.filter((p) => p.service === active);

  return (
    <>
      <PageHero
        eyebrow="Referanslarımız"
        title="Hayata geçirdiğimiz projeler"
        text="Gaziantep genelinde tamamladığımız işlerden bir seçki. Her projede aynı titizlik ve kalite."
        breadcrumbs={[{ name: "Ana Sayfa", path: "/" }, { name: "Referanslar" }]}
      />

      <section className="py-16 sm:py-20">
        <div className="container-tuza">
          {/* Filtre */}
          {usedServices.length > 1 && (
            <div className="mb-10 flex flex-wrap gap-2.5">
              <FilterChip label="Tümü" active={active === "all"} onClick={() => setActive("all")} safe={safe} />
              {usedServices.map((s) => (
                <FilterChip
                  key={s.slug}
                  label={s.title}
                  active={active === s.slug}
                  onClick={() => setActive(s.slug)}
                  safe={safe}
                />
              ))}
            </div>
          )}

          {/* Filtre değişince kartlar yeniden dizilir: çıkanlar solar,
              kalanlar yeni yerine kayar (popLayout). */}
          <motion.div layout={safe} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {filtered.map((p, i) => (
                <motion.div
                  key={p.slug}
                  layout={safe}
                  className="h-full"
                  initial={safe ? { opacity: 0, scale: 0.94 } : false}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    transition: { duration: DURATION.slow, ease: EASE_OUT, delay: safe ? (i % 3) * 0.05 : 0 },
                  }}
                  exit={safe ? { opacity: 0, scale: 0.94, transition: { duration: DURATION.fast } } : undefined}
                  transition={SPRING}
                >
                  <ProjectCard project={p} index={i} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <motion.p
              className="py-12 text-center text-espresso-muted"
              initial={safe ? { opacity: 0 } : false}
              animate={{ opacity: 1 }}
            >
              Bu kategoride henüz proje eklenmedi.
            </motion.p>
          )}
        </div>
      </section>

      <section className="pb-24">
        <CtaBand title="Sıradaki proje sizin olsun" text="Ücretsiz keşif ile mekânınızı değerlendirelim." />
      </section>
    </>
  );
}

function FilterChip({ label, active, onClick, safe }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      whileTap={safe ? { scale: 0.96, transition: SPRING } : undefined}
      className={`relative rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
        active
          ? "border-clay text-white"
          : "border-espresso/12 bg-white text-espresso-soft hover:border-clay/40 hover:text-clay"
      }`}
    >
      {active && (
        // Dolgu seçilen çipe kayar — hangi filtrenin açık olduğu izlenebilir kalır.
        <motion.span
          layoutId={safe ? "filter-pill" : undefined}
          className="absolute inset-0 -z-10 rounded-full bg-clay shadow-[0_8px_20px_-8px_rgba(194,65,12,0.6)]"
          transition={SPRING}
        />
      )}
      {label}
    </motion.button>
  );
}
