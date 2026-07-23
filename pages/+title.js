// Sayfa <title>: önce +data'nın döndürdüğü title, yoksa sunucu SEO'su.
export default (pageContext) =>
  pageContext.data?.title || pageContext.seo?.title || "Tuza Dekorasyon";
