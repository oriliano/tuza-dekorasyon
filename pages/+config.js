import vikeReact from "vike-react/config";
import { LayoutDefault } from "../layouts/LayoutDefault.jsx";
import { HeadDefault } from "../layouts/HeadDefault.jsx";

// Global Vike + vike-react yapılandırması.
export default {
  extends: vikeReact,
  Layout: LayoutDefault,
  Head: HeadDefault,
  // Başlık/açıklama ayrı +title.js / +description.js dosyalarında (Vike kuralı).
  passToClient: ["seo"],
  lang: "tr",
  ssr: true,
};
