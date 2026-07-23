// SEO yardımcıları: JSON-LD structured data ve canonical/OG üretimi.

export function siteUrl() {
  const envUrl =
    typeof process !== "undefined" && process.env && process.env.SITE_URL;
  return (envUrl || "https://tuzadekorasyon.com").replace(/\/$/, "");
}

export function canonical(path = "/") {
  return siteUrl() + (path === "/" ? "" : path);
}

// Ana LocalBusiness şeması (yapı/inşaat işletmesi).
export function localBusinessJsonLd(site, services = []) {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: site.name,
    description: site.seoDescription,
    url: siteUrl(),
    telephone: site.phonesIntl?.[0] || site.phones?.[0],
    email: site.email,
    image: siteUrl() + (site.logo || "/logo.svg"),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address?.full,
      addressLocality: site.address?.district,
      addressRegion: site.address?.city,
      addressCountry: "TR",
    },
    areaServed: site.address?.city,
    openingHours: "Mo-Sa 08:30-19:00",
    makesOffer: services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.title },
    })),
  };
}

export function breadcrumbJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: canonical(it.path),
    })),
  };
}

export function articleJsonLd(site, post) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
    datePublished: post.publishedAt || undefined,
    mainEntityOfPage: canonical("/blog/" + post.slug),
  };
}

export function serviceJsonLd(site, service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.summary || service.description,
    provider: {
      "@type": "HomeAndConstructionBusiness",
      name: site.name,
      telephone: site.phonesIntl?.[0],
    },
    areaServed: site.address?.city,
    url: canonical("/hizmetler/" + service.slug),
  };
}
