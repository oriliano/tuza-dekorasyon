import { getServiceData } from "../../../db/data.js";
import { render } from "vike/abort";

export async function data(pageContext) {
  const d = await getServiceData(pageContext.routeParams.slug);
  if (!d.service) throw render(404, "Aradığınız hizmet bulunamadı.");
  return {
    ...d,
    title: `${d.service.title} | ${d.site.name}`,
    description: d.service.summary || d.service.description?.slice(0, 155),
  };
}
