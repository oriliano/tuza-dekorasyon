import { getHomeData } from "../../db/data.js";

export async function data() {
  const d = await getHomeData();
  return {
    ...d,
    title: d.site.seoTitle,
    description: d.site.seoDescription,
  };
}
