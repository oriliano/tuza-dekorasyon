import { getPostData } from "../../../db/data.js";
import { render } from "vike/abort";

export async function data(pageContext) {
  const d = await getPostData(pageContext.routeParams.slug);
  if (!d.post) throw render(404, "Aradığınız yazı bulunamadı.");
  return {
    ...d,
    title: `${d.post.title} | ${d.site.name}`,
    description: d.post.excerpt?.slice(0, 155),
  };
}
