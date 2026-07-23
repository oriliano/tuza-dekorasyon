import React from "react";
import { useData } from "vike-react/useData";
import { site as staticSite } from "../../../lib/site.js";
import { serviceJsonLd, breadcrumbJsonLd } from "../../../lib/seo.js";
import { Icon } from "../../../components/Icon.jsx";
import { Placeholder } from "../../../components/Placeholder.jsx";
import { ProjectCard } from "../../../components/Cards.jsx";
import { Reveal } from "../../../components/Reveal.jsx";
import { Breadcrumbs } from "../../../components/Breadcrumbs.jsx";
import { JsonLd } from "../../../components/JsonLd.jsx";
import { CtaBand } from "../../../components/CtaBand.jsx";

export default function Page() {
  const { site = staticSite, service, services = [], related = [] } = useData();
  const tel = site.phonesIntl?.[0] || site.phones?.[0];
  const others = services.filter((s) => s.slug !== service.slug);
  const crumbs = [
    { name: "Ana Sayfa", path: "/" },
    { name: "Hizmetler", path: "/hizmetler" },
    { name: service.title },
  ];

  return (
    <>
      <JsonLd data={[serviceJsonLd(site, service), breadcrumbJsonLd(crumbs)]} />

      {/* Üst band */}
      <section className="relative overflow-hidden bg-cream-deep">
        <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-clay/10 blur-3xl" />
        <div className="container-tuza relative py-12 sm:py-16">
          <Breadcrumbs items={crumbs} />
          <div className="mt-6 flex items-start gap-4">
            <span className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-clay text-white shadow-soft sm:flex">
              <Icon name={service.icon} className="h-7 w-7" />
            </span>
            <div>
              <h1 className="text-balance text-3xl font-semibold leading-tight text-espresso sm:text-4xl">
                {service.title}
              </h1>
              <p className="mt-3 max-w-2xl text-lg text-espresso-soft">{service.summary}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gövde + kenar çubuğu */}
      <section className="py-16 sm:py-20">
        <div className="container-tuza grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          {/* Ana içerik */}
          <div>
            <Reveal>
              <Placeholder
                image={service.image}
                icon={service.icon}
                label={service.title}
                ratio="aspect-[16/9]"
                className="rounded-2xl shadow-card ring-1 ring-espresso/5"
              />
            </Reveal>
            <Reveal delay={80}>
              <div className="prose-tuza mt-8">
                <p className="text-[1.0625rem] leading-[1.85]">{service.description}</p>
              </div>
            </Reveal>

            {service.features?.length > 0 && (
              <Reveal delay={120}>
                <div className="mt-8">
                  <h2 className="text-xl font-semibold text-espresso">Kapsamımız</h2>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {service.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3 rounded-xl bg-cream-deep px-4 py-3">
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-clay/10 text-clay">
                          <Icon name="check" className="h-4 w-4" strokeWidth={2} />
                        </span>
                        <span className="text-sm font-medium text-espresso-soft">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )}
          </div>

          {/* Kenar çubuğu */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-espresso">Ücretsiz keşif isteyin</h3>
              <p className="mt-2 text-sm text-espresso-soft">
                {service.title} için hemen bize ulaşın, yerinde keşif yapıp teklif sunalım.
              </p>
              <a href={`tel:${tel}`} className="btn btn-primary mt-5 w-full">
                <Icon name="phone" className="h-4 w-4" />
                {site.phones?.[0]}
              </a>
              <a href="/iletisim" className="btn btn-ghost mt-3 w-full">
                İletişim Formu
              </a>
            </div>

            {others.length > 0 && (
              <div className="card mt-6 p-6">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-espresso-muted">
                  Diğer Hizmetler
                </h3>
                <ul className="mt-4 space-y-1">
                  {others.map((s) => (
                    <li key={s.slug}>
                      <a
                        href={`/hizmetler/${s.slug}`}
                        className="flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-espresso-soft transition-colors hover:bg-cream-deep hover:text-clay"
                      >
                        <span className="flex items-center gap-2.5">
                          <Icon name={s.icon} className="h-4 w-4 text-clay" />
                          {s.title}
                        </span>
                        <Icon name="arrow" className="h-3.5 w-3.5 opacity-50" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </section>

      {/* İlgili referanslar */}
      {related.length > 0 && (
        <section className="bg-cream-deep py-16 sm:py-20">
          <div className="container-tuza">
            <h2 className="text-2xl font-semibold text-espresso sm:text-3xl">İlgili Referanslar</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.slice(0, 3).map((p, i) => (
                <Reveal key={p.slug} delay={(i % 3) * 80}>
                  <ProjectCard project={p} index={i} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-24">
        <CtaBand title="Mekânınızı birlikte yenileyelim" text="Ücretsiz keşif ve şeffaf fiyat teklifi için bize ulaşın." />
      </section>
    </>
  );
}
