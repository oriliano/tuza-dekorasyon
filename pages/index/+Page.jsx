import React from "react";
import { useData } from "vike-react/useData";
import { site as staticSite } from "../../lib/site.js";
import { localBusinessJsonLd } from "../../lib/seo.js";
import { Icon } from "../../components/Icon.jsx";
import { Reveal } from "../../components/Reveal.jsx";
import { SectionHeading } from "../../components/SectionHeading.jsx";
import { ServiceCard, ProjectCard, PostCard } from "../../components/Cards.jsx";
import { CtaBand } from "../../components/CtaBand.jsx";
import { JsonLd } from "../../components/JsonLd.jsx";

const steps = [
  { n: "01", title: "Ücretsiz Keşif", text: "Yerinde inceleme yapıp ihtiyacınızı ve mekânı birlikte değerlendiriyoruz." },
  { n: "02", title: "Şeffaf Teklif", text: "Malzeme ve işçilik dahil, sürprizsiz ve net bir fiyat teklifi sunuyoruz." },
  { n: "03", title: "Titiz Uygulama", text: "Uzman ekibimiz temiz ve planlı bir şekilde işi hayata geçiriyor." },
  { n: "04", title: "Zamanında Teslim", text: "Söz verdiğimiz sürede, kusursuz ve garantili teslim ediyoruz." },
];

export default function Page() {
  const { site = staticSite, home = {}, services = [], projects = [], posts = [], about = {} } = useData();
  const tel = site.phonesIntl?.[0] || site.phones?.[0];
  const featured = projects.filter((p) => p.featured).slice(0, 3);
  const showcaseProjects = (featured.length ? featured : projects).slice(0, 3);
  const heroProject = showcaseProjects.find((p) => p.image);
  const stats = [
    { value: home.statsProjects, label: home.statsProjectsLabel },
    { value: home.statsYears, label: home.statsYearsLabel },
    { value: home.statsClients, label: home.statsClientsLabel },
  ].filter((s) => s.value);

  return (
    <>
      <JsonLd data={localBusinessJsonLd(site, services)} />

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cream via-cream to-cream-deep" />
        <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-clay/10 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-40 h-80 w-80 rounded-full bg-clay-soft/10 blur-3xl" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(154,52,18,0.05) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />

        <div className="container-tuza relative grid items-center gap-12 pb-16 pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:pb-24 lg:pt-20">
          {/* Sol metin */}
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-clay/20 bg-white/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-clay backdrop-blur-sm">
                <Icon name="location" className="h-3.5 w-3.5" />
                {home.heroBadge || site.locationLabel}
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.08] text-espresso sm:text-5xl lg:text-[3.4rem]">
                {home.heroTitle || site.slogan}
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-espresso-soft">
                {home.heroSubtitle}
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="/iletisim" className="btn btn-primary">
                  {home.heroPrimaryCta || "Ücretsiz Keşif İste"}
                  <Icon name="arrow" className="h-4 w-4" />
                </a>
                <a href="/hizmetler" className="btn btn-ghost">
                  {home.heroSecondaryCta || "Hizmetlerimiz"}
                </a>
              </div>
            </Reveal>
            <Reveal delay={320}>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-espresso-muted">
                <a href={`tel:${tel}`} className="flex items-center gap-2 font-semibold text-espresso hover:text-clay">
                  <Icon name="phone" className="h-4 w-4 text-clay" />
                  {site.phones?.[0]}
                </a>
                <span className="hidden h-4 w-px bg-espresso/15 sm:block" />
                <span className="flex items-center gap-2">
                  <Icon name="clock" className="h-4 w-4 text-clay" />
                  {site.hours}
                </span>
              </div>
            </Reveal>
          </div>

          {/* Sağ görsel kompozisyon */}
          <Reveal delay={200} className="relative">
            <div className="relative mx-auto max-w-xl pb-8 pl-3 sm:pl-8">
              <div className="overflow-hidden rounded-[2rem] bg-white p-2 shadow-soft ring-1 ring-espresso/5">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.6rem] bg-sand">
                  <img
                    src={heroProject?.image || "/projects/ic-mekan-tv-unitesi.jpg"}
                    alt={heroProject?.title || "Tuza Dekorasyon iç mekân uygulaması"}
                    width="2048"
                    height="1152"
                    fetchPriority="high"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-espresso/80 via-espresso/30 to-transparent px-6 pb-6 pt-16">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-clay-soft">
                      Uygulamalarımızdan
                    </p>
                    <p className="mt-1 font-serif text-xl font-semibold text-white">
                      {heroProject?.title || "İç mekân dekorasyon uygulaması"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-soft ring-1 ring-espresso/5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-clay text-white">
                  <Icon name="shield" className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-espresso">Garantili İşçilik</p>
                  <p className="text-xs text-espresso-muted">Titiz & şeffaf hizmet</p>
                </div>
              </div>
              {stats[0] && (
                <div className="absolute -right-2 -top-4 rounded-2xl bg-espresso px-5 py-4 text-center shadow-soft sm:-right-4">
                  <p className="font-serif text-2xl font-semibold text-clay-soft">{stats[0].value}</p>
                  <p className="text-[0.7rem] uppercase tracking-wide text-cream/70">{stats[0].label}</p>
                </div>
              )}
            </div>
          </Reveal>
        </div>

        {/* İstatistik şeridi */}
        {stats.length > 0 && (
          <div className="container-tuza relative pb-4">
            <div className="grid gap-4 rounded-2xl border border-espresso/5 bg-white/70 p-6 backdrop-blur-sm sm:grid-cols-3 sm:p-8">
              {stats.map((s, i) => (
                <div key={i} className={`text-center sm:text-left ${i > 0 ? "sm:border-l sm:border-espresso/10 sm:pl-8" : ""}`}>
                  <p className="font-serif text-3xl font-semibold text-clay sm:text-4xl">{s.value}</p>
                  <p className="mt-1 text-sm text-espresso-soft">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ================= HİZMETLER ================= */}
      <section className="py-20 sm:py-24">
        <div className="container-tuza">
          <SectionHeading
            eyebrow="Hizmetlerimiz"
            title="Yaşam alanlarınız için uçtan uca çözümler"
            text="Boyadan mantolamaya, alçıpandan parkeye kadar tüm tadilat ve dekorasyon işlerinizi tek elden, uzman ekibimizle karşılıyoruz."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 4) * 70}>
                <ServiceCard service={s} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= NEDEN BİZ ================= */}
      {about.values?.length > 0 && (
        <section className="bg-cream-deep py-20 sm:py-24">
          <div className="container-tuza grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <SectionHeading
              eyebrow="Neden Tuza Dekorasyon"
              title={about.title || "Titiz işçilik, şeffaf süreç"}
              text={about.lead}
            />
            <div className="grid gap-5 sm:grid-cols-2">
              {about.values.map((v, i) => (
                <Reveal key={i} delay={(i % 2) * 90}>
                  <div className="card h-full p-6">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-clay/10 text-clay">
                      <Icon name="check" className="h-6 w-6" />
                    </span>
                    <h3 className="mt-4 text-lg font-semibold text-espresso">{v.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-espresso-soft">{v.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= REFERANSLAR ================= */}
      {showcaseProjects.length > 0 && (
        <section className="py-20 sm:py-24">
          <div className="container-tuza">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading
                eyebrow="Referanslarımız"
                title="Tamamladığımız işlerden seçkiler"
                text="Gaziantep genelinde hayata geçirdiğimiz projelerden bazıları."
              />
              <a href="/referanslar" className="btn btn-ghost hidden shrink-0 sm:inline-flex">
                Tümünü Gör
                <Icon name="arrow" className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {showcaseProjects.map((p, i) => (
                <Reveal key={p.slug} delay={(i % 3) * 80}>
                  <ProjectCard project={p} index={i} />
                </Reveal>
              ))}
            </div>
            <div className="mt-8 text-center sm:hidden">
              <a href="/referanslar" className="btn btn-ghost">
                Tümünü Gör
                <Icon name="arrow" className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
      )}

      {/* ================= SÜREÇ ================= */}
      <section className="bg-cream-deep py-20 sm:py-24">
        <div className="container-tuza">
          <SectionHeading
            align="center"
            eyebrow="Nasıl Çalışıyoruz"
            title="Keşiften teslime dört adımda"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((st, i) => (
              <Reveal key={st.n} delay={i * 80}>
                <div className="relative h-full rounded-2xl bg-white p-6 shadow-card ring-1 ring-espresso/5">
                  <span className="font-serif text-4xl font-semibold text-sand-dark">{st.n}</span>
                  <h3 className="mt-3 text-lg font-semibold text-espresso">{st.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-espresso-soft">{st.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BLOG ================= */}
      {posts.length > 0 && (
        <section className="py-20 sm:py-24">
          <div className="container-tuza">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading eyebrow="Blog" title="Dekorasyon rehberi ve ipuçları" />
              <a href="/blog" className="btn btn-ghost hidden shrink-0 sm:inline-flex">
                Tüm Yazılar
                <Icon name="arrow" className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.slice(0, 3).map((p, i) => (
                <Reveal key={p.slug} delay={(i % 3) * 80}>
                  <PostCard post={p} index={i} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= CTA ================= */}
      <section className="pb-24">
        <CtaBand
          title={home.ctaTitle || "Projeniz için ücretsiz keşif alın"}
          text={home.ctaText}
        />
      </section>
    </>
  );
}
