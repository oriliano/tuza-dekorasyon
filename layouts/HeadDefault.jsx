import React from "react";
import { usePageContext } from "vike-react/usePageContext";
import { site } from "../lib/site.js";
import { canonical } from "../lib/seo.js";

export function HeadDefault() {
  const pageContext = usePageContext();
  const data = pageContext.data || {};
  const title = data.title || pageContext.seo?.title || site.seoTitle;
  const description = data.description || pageContext.seo?.description || site.seoDescription;
  const path = pageContext.urlPathname || "/";
  const canonicalUrl = canonical(path);
  const imagePath = data.project?.image || data.post?.cover || site.logo || "/logo.svg";
  const imageUrl = imagePath.startsWith("http") ? imagePath : canonical(imagePath);

  return (
    <>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#FAF6F0" />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:locale" content="tr_TR" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <link rel="icon" href={site.favicon || "/favicon.svg"} type="image/svg+xml" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..600;1,9..144,400..500&family=Inter:wght@400;500;600;700&display=swap"
      />
    </>
  );
}
