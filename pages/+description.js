// Sayfa meta description: önce +data'nın döndürdüğü description, yoksa sunucu SEO'su.
export default (pageContext) =>
  pageContext.data?.description ||
  pageContext.seo?.description ||
  "Gaziantep boya, mantolama ve dekorasyon hizmetleri.";
