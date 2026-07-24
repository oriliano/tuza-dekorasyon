import React from "react";
import { useData } from "vike-react/useData";
import { site as staticSite } from "../../lib/site.js";
import { Icon } from "../../components/Icon.jsx";
import { Reveal, Stagger, StaggerItem } from "../../components/motion.jsx";
import { PageHero } from "../../components/PageHero.jsx";
import { CtaBand } from "../../components/CtaBand.jsx";

export default function Page() {
  const { site = staticSite, about = {} } = useData();
  const values = about.values || [];

  return (
    <>
      <PageHero
        eyebrow="Hakkımızda"
        title={about.title || "Gaziantep'te güvenilir dekorasyon çözümleri"}
        text={about.lead}
        breadcrumbs={[{ name: "Ana Sayfa", path: "/" }, { name: "Hakkımızda" }]}
      />

      {/* Metin + öne çıkan kart */}
      <section className="py-16 sm:py-20">
        <div className="container-tuza grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <Reveal>
            <div className="prose-tuza">
              <p className="text-lg leading-[1.85] text-espresso-soft">{about.body}</p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="card overflow-hidden">
              <div className="bg-espresso p-6">
                <p className="font-serif text-xl font-semibold text-cream">{site.name}</p>
                <p className="mt-1 text-sm text-cream/60">{site.slogan}</p>
              </div>
              <ul className="divide-y divide-espresso/5 p-2">
                {[
                  { icon: "location", label: "Konum", value: site.locationLabel },
                  { icon: "phone", label: "Telefon", value: site.phones?.[0] },
                  { icon: "clock", label: "Çalışma Saatleri", value: site.hours },
                  { icon: "mail", label: "E-posta", value: site.email },
                ].map((row) => (
                  <li key={row.label} className="flex items-start gap-3 px-4 py-3.5">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-clay/10 text-clay">
                      <Icon name={row.icon} className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-espresso-muted">{row.label}</p>
                      <p className="text-sm font-medium text-espresso">{row.value}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Değerler */}
      {values.length > 0 && (
        <section className="bg-cream-deep py-16 sm:py-20">
          <div className="container-tuza">
            <Reveal>
              <h2 className="text-center font-serif text-3xl font-semibold text-espresso sm:text-4xl">
                Değerlerimiz
              </h2>
            </Reveal>
            <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((v, i) => (
                <StaggerItem key={i} className="h-full">
                  <div className="card h-full p-6 text-center">
                    <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-clay/10 text-clay">
                      <Icon name="sparkle" className="h-6 w-6" />
                    </span>
                    <h3 className="mt-4 text-lg font-semibold text-espresso">{v.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-espresso-soft">{v.text}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      <section className="py-24">
        <CtaBand title="Sizin için ne yapabiliriz?" text="Ücretsiz keşif için bugün bize ulaşın." />
      </section>
    </>
  );
}
