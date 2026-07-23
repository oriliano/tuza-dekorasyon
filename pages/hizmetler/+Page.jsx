import React from "react";
import { useData } from "vike-react/useData";
import { site as staticSite } from "../../lib/site.js";
import { PageHero } from "../../components/PageHero.jsx";
import { ServiceCard } from "../../components/Cards.jsx";
import { Reveal } from "../../components/Reveal.jsx";
import { CtaBand } from "../../components/CtaBand.jsx";

export default function Page() {
  const { site = staticSite, services = [] } = useData();
  return (
    <>
      <PageHero
        eyebrow="Hizmetlerimiz"
        title="Tek elden tüm dekorasyon ve tadilat çözümleri"
        text="Uzman ekibimizle mekânlarınıza estetik, konfor ve dayanıklılık kazandıran hizmetlerimizi keşfedin."
        breadcrumbs={[
          { name: "Ana Sayfa", path: "/" },
          { name: "Hizmetler" },
        ]}
      />

      <section className="py-16 sm:py-20">
        <div className="container-tuza grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 70}>
              <ServiceCard service={s} index={i} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="pb-24">
        <CtaBand
          title="Hangi hizmete ihtiyacınız olduğundan emin değil misiniz?"
          text="Ücretsiz keşif ile mekânınızı değerlendirip size en uygun çözümü önerelim."
        />
      </section>
    </>
  );
}
