import React, { useState } from "react";
import { useData } from "vike-react/useData";
import { site as staticSite } from "../../lib/site.js";
import { PageHero } from "../../components/PageHero.jsx";
import { ProjectCard } from "../../components/Cards.jsx";
import { Reveal } from "../../components/Reveal.jsx";
import { CtaBand } from "../../components/CtaBand.jsx";

export default function Page() {
  const { projects = [], services = [] } = useData();
  const [active, setActive] = useState("all");

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
              <FilterChip label="Tümü" active={active === "all"} onClick={() => setActive("all")} />
              {usedServices.map((s) => (
                <FilterChip
                  key={s.slug}
                  label={s.title}
                  active={active === s.slug}
                  onClick={() => setActive(s.slug)}
                />
              ))}
            </div>
          )}

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 70}>
                <ProjectCard project={p} index={i} />
              </Reveal>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="py-12 text-center text-espresso-muted">Bu kategoride henüz proje eklenmedi.</p>
          )}
        </div>
      </section>

      <section className="pb-24">
        <CtaBand title="Sıradaki proje sizin olsun" text="Ücretsiz keşif ile mekânınızı değerlendirelim." />
      </section>
    </>
  );
}

function FilterChip({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
        active
          ? "border-clay bg-clay text-white shadow-[0_8px_20px_-8px_rgba(194,65,12,0.6)]"
          : "border-espresso/12 bg-white text-espresso-soft hover:border-clay/40 hover:text-clay"
      }`}
    >
      {label}
    </button>
  );
}
