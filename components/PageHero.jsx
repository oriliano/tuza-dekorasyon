import React from "react";
import { Reveal } from "./Reveal.jsx";
import { Breadcrumbs } from "./Breadcrumbs.jsx";

// Alt sayfa üst bandı: başlık + açıklama + breadcrumb.
export function PageHero({ eyebrow, title, text, breadcrumbs }) {
  return (
    <section className="relative overflow-hidden bg-cream-deep">
      <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-clay/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-0 h-56 w-56 rounded-full bg-clay-soft/10 blur-3xl" />
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: "radial-gradient(rgba(154,52,18,0.05) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />
      <div className="container-tuza relative py-14 sm:py-20">
        {breadcrumbs && (
          <div className="mb-6">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        )}
        <Reveal className="max-w-3xl">
          {eyebrow && (
            <span className="eyebrow">
              <span className="h-px w-6 bg-current" />
              {eyebrow}
            </span>
          )}
          <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.1] text-espresso sm:text-5xl">
            {title}
          </h1>
          {text && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-espresso-soft">{text}</p>}
        </Reveal>
      </div>
    </section>
  );
}
