import React from "react";
import { useData } from "vike-react/useData";
import { site as staticSite } from "../../../lib/site.js";
import { articleJsonLd, breadcrumbJsonLd } from "../../../lib/seo.js";
import { Icon } from "../../../components/Icon.jsx";
import { Placeholder } from "../../../components/Placeholder.jsx";
import { PostCard } from "../../../components/Cards.jsx";
import { Reveal } from "../../../components/Reveal.jsx";
import { Breadcrumbs } from "../../../components/Breadcrumbs.jsx";
import { JsonLd } from "../../../components/JsonLd.jsx";
import { CtaBand } from "../../../components/CtaBand.jsx";

export default function Page() {
  const { site = staticSite, post, posts = [] } = useData();
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const crumbs = [
    { name: "Ana Sayfa", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title },
  ];

  return (
    <>
      <JsonLd data={[articleJsonLd(site, post), breadcrumbJsonLd(crumbs)]} />

      <section className="relative overflow-hidden bg-cream-deep">
        <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-clay/10 blur-3xl" />
        <div className="container-tuza relative max-w-3xl py-12 sm:py-16">
          <Breadcrumbs items={crumbs} />
          {post.tags?.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <span key={t} className="rounded-full bg-clay/10 px-3 py-1 text-xs font-semibold text-clay">
                  #{t}
                </span>
              ))}
            </div>
          )}
          <h1 className="mt-4 text-balance text-3xl font-semibold leading-tight text-espresso sm:text-[2.6rem]">
            {post.title}
          </h1>
          {post.excerpt && <p className="mt-4 text-lg text-espresso-soft">{post.excerpt}</p>}
        </div>
      </section>

      <article className="py-16 sm:py-20">
        <div className="container-tuza max-w-3xl">
          <Reveal>
            <Placeholder
              image={post.cover}
              icon="sparkle"
              label={post.title}
              ratio="aspect-[16/9]"
              className="rounded-2xl shadow-card ring-1 ring-espresso/5"
            />
          </Reveal>
          <Reveal delay={80}>
            <div
              className="prose-tuza mt-10"
              dangerouslySetInnerHTML={{ __html: post.content || "" }}
            />
          </Reveal>

          <div className="mt-10">
            <a href="/blog" className="link-underline text-sm">
              <Icon name="arrow" className="h-4 w-4 rotate-180" />
              Tüm Yazılar
            </a>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="bg-cream-deep py-16 sm:py-20">
          <div className="container-tuza">
            <h2 className="text-2xl font-semibold text-espresso sm:text-3xl">Diğer Yazılar</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <Reveal key={p.slug} delay={(i % 3) * 80}>
                  <PostCard post={p} index={i} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-24">
        <CtaBand title="Projeniz için hazır mısınız?" text="Ücretsiz keşif ve fiyat teklifi için bize ulaşın." />
      </section>
    </>
  );
}
