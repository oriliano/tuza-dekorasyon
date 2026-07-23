import { getServicesPageData } from "../../db/data.js";

export async function data() {
  const d = await getServicesPageData();
  return {
    ...d,
    title: `Hizmetlerimiz | ${d.site.name}`,
    description:
      "Gaziantep boya badana, dış cephe mantolama, alçı sıva, alçıpan, asma tavan, duvar kağıdı, parke döşeme ve anahtar teslim dekorasyon hizmetleri.",
  };
}
