import { getPostsPageData } from "../../db/data.js";

export async function data() {
  const d = await getPostsPageData();
  return {
    ...d,
    title: `Blog | ${d.site.name}`,
    description:
      "Boya, mantolama, dekorasyon ve tadilat üzerine pratik ipuçları ve rehberler — Tuza Dekorasyon blogu.",
  };
}
