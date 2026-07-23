import { getProjectData } from "../../../db/data.js";
import { render } from "vike/abort";

export async function data(pageContext) {
  const d = await getProjectData(pageContext.routeParams.slug);
  if (!d.project) throw render(404, "Aradığınız proje bulunamadı.");
  return {
    ...d,
    title: `${d.project.title} | ${d.site.name}`,
    description: d.project.description?.slice(0, 155),
  };
}
