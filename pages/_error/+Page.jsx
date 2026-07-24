import React from "react";
import { usePageContext } from "vike-react/usePageContext";
import { Icon } from "../../components/Icon.jsx";
import { Stagger, StaggerItem } from "../../components/motion.jsx";

export default function Page() {
  const pageContext = usePageContext();
  const is404 = pageContext.is404 ?? pageContext.abortStatusCode === 404;
  const reason =
    typeof pageContext.abortReason === "string" ? pageContext.abortReason : null;

  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-cream-deep">
      <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-clay/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 right-0 h-72 w-72 rounded-full bg-clay-soft/10 blur-3xl" />
      <Stagger className="container-tuza relative text-center" stagger={0.08}>
        <StaggerItem as="p" className="font-serif text-7xl font-semibold text-clay sm:text-8xl">
          {is404 ? "404" : "Hata"}
        </StaggerItem>
        <StaggerItem as="h1" className="mt-4 text-2xl font-semibold text-espresso sm:text-3xl">
          {is404 ? "Sayfa bulunamadı" : "Bir şeyler ters gitti"}
        </StaggerItem>
        <StaggerItem as="p" className="mx-auto mt-3 max-w-md text-espresso-soft">
          {reason ||
            (is404
              ? "Aradığınız sayfa taşınmış ya da hiç var olmamış olabilir."
              : "Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.")}
        </StaggerItem>
        <StaggerItem className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href="/" className="btn btn-primary">
            <Icon name="arrow" className="h-4 w-4 rotate-180" />
            Ana Sayfaya Dön
          </a>
          <a href="/hizmetler" className="btn btn-ghost">
            Hizmetlerimiz
          </a>
        </StaggerItem>
      </Stagger>
    </section>
  );
}
