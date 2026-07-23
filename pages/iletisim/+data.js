import { getContactData } from "../../db/data.js";

export async function data() {
  const d = await getContactData();
  return {
    ...d,
    title: `İletişim | ${d.site.name}`,
    description:
      "Gaziantep Şehitkamil boya, mantolama ve dekorasyon hizmetleri için Tuza Dekorasyon ile iletişime geçin. Ücretsiz keşif için arayın.",
  };
}
