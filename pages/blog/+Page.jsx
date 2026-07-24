import React from "react";
import { useData } from "vike-react/useData";
import { PageHero } from "../../components/PageHero.jsx";
import { PostCard } from "../../components/Cards.jsx";
import { Stagger, StaggerItem } from "../../components/motion.jsx";
import { CtaBand } from "../../components/CtaBand.jsx";

export default function Page() {
  const { posts = [] } = useData();
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Dekorasyon rehberi ve ipuçları"
        text="Doğru malzeme seçiminden renk kombinasyonlarına kadar, mekânınızı yenilerken işinize yarayacak bilgiler."
        breadcrumbs={[{ name: "Ana Sayfa", path: "/" }, { name: "Blog" }]}
      />

      <section className="py-16 sm:py-20">
        <div className="container-tuza">
          {posts.length > 0 ? (
            <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((p, i) => (
                <StaggerItem key={p.slug} className="h-full">
                  <PostCard post={p} index={i} />
                </StaggerItem>
              ))}
            </Stagger>
          ) : (
            <p className="py-12 text-center text-espresso-muted">Henüz yazı eklenmedi.</p>
          )}
        </div>
      </section>

      <section className="pb-24">
        <CtaBand title="Sorularınız mı var?" text="Uzman ekibimiz size yardımcı olmaktan memnuniyet duyar." />
      </section>
    </>
  );
}
