import React from "react";
import { useData } from "vike-react/useData";
import { site as staticSite } from "../../../lib/site.js";
import { breadcrumbJsonLd } from "../../../lib/seo.js";
import { Icon } from "../../../components/Icon.jsx";
import { Placeholder } from "../../../components/Placeholder.jsx";
import { Reveal } from "../../../components/Reveal.jsx";
import { Breadcrumbs } from "../../../components/Breadcrumbs.jsx";
import { JsonLd } from "../../../components/JsonLd.jsx";
import { CtaBand } from "../../../components/CtaBand.jsx";

export default function Page() {
  const { site = staticSite, project, services = [] } = useData();
  const tel = site.phonesIntl?.[0] || site.phones?.[0];
  const service = services.find((s) => s.slug === project.service);
  const gallery = Array.isArray(project.gallery) ? project.gallery : [];
  const crumbs = [
    { name: "Ana Sayfa", path: "/" },
    { name: "Referanslar", path: "/referanslar" },
    { name: project.title },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />

      <section className="relative overflow-hidden bg-cream-deep">
        <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-clay/10 blur-3xl" />
        <div className="container-tuza relative py-12 sm:py-16">
          <Breadcrumbs items={crumbs} />
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {project.location && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-medium text-espresso shadow-card">
                <Icon name="location" className="h-3.5 w-3.5 text-clay" />
                {project.location}
              </span>
            )}
            {service && (
              <a
                href={`/hizmetler/${service.slug}`}
                className="inline-flex items-center gap-1.5 rounded-full bg-clay/10 px-3 py-1 text-xs font-medium text-clay hover:bg-clay hover:text-white"
              >
                <Icon name={service.icon} className="h-3.5 w-3.5" />
                {service.title}
              </a>
            )}
          </div>
          <h1 className="mt-4 text-balance text-3xl font-semibold leading-tight text-espresso sm:text-4xl">
            {project.title}
          </h1>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-tuza max-w-4xl">
          <Reveal>
            <Placeholder
              image={project.image}
              icon={service?.icon || "turnkey"}
              label={project.title}
              ratio="aspect-[16/9]"
              className="rounded-2xl shadow-card ring-1 ring-espresso/5"
            />
          </Reveal>

          <Reveal delay={80}>
            <p className="mt-8 text-lg leading-[1.85] text-espresso-soft">{project.description}</p>
          </Reveal>

          {gallery.length > 0 && (
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {gallery.map((g, i) => (
                <Reveal key={i} delay={(i % 2) * 80}>
                  <Placeholder image={g} label={`${project.title} ${i + 1}`} ratio="aspect-[4/3]" className="rounded-2xl" />
                </Reveal>
              ))}
            </div>
          )}

          <div className="mt-10 flex flex-col gap-3 rounded-2xl bg-cream-deep p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-serif text-lg font-semibold text-espresso">Benzer bir proje mi düşünüyorsunuz?</p>
              <p className="text-sm text-espresso-soft">Ücretsiz keşif için hemen ulaşın.</p>
            </div>
            <a href={`tel:${tel}`} className="btn btn-primary shrink-0">
              <Icon name="phone" className="h-4 w-4" />
              {site.phones?.[0]}
            </a>
          </div>

          <div className="mt-8">
            <a href="/referanslar" className="link-underline text-sm">
              <Icon name="arrow" className="h-4 w-4 rotate-180" />
              Tüm Referanslar
            </a>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <CtaBand title="Hayalinizdeki mekânı birlikte tasarlayalım" />
      </section>
    </>
  );
}
