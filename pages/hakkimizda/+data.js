import { getAboutData } from "../../db/data.js";

export async function data() {
  const d = await getAboutData();
  return {
    ...d,
    title: `Hakkımızda | ${d.site.name}`,
    description:
      d.about?.lead ||
      "Gaziantep'te güvenilir boya, mantolama ve dekorasyon çözümleri sunan Tuza Dekorasyon hakkında.",
  };
}
