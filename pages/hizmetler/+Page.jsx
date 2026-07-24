import React from "react";
import { useData } from "vike-react/useData";
import { site as staticSite } from "../../lib/site.js";
import { PageHero } from "../../components/PageHero.jsx";
import { ServiceCard } from "../../components/Cards.jsx";
import { Stagger, StaggerItem } from "../../components/motion.jsx";
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
        <Stagger className="container-tuza grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <StaggerItem key={s.slug} className="h-full">
              <ServiceCard service={s} index={i} />
            </StaggerItem>
          ))}
        </Stagger>
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
