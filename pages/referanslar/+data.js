import { getProjectsPageData } from "../../db/data.js";

export async function data() {
  const d = await getProjectsPageData();
  return {
    ...d,
    title: `Referanslarımız | ${d.site.name}`,
    description:
      "Gaziantep'te tamamladığımız boya, mantolama, asma tavan, alçıpan ve anahtar teslim dekorasyon projelerimizden örnekler.",
  };
}
