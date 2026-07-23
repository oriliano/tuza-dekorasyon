import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { lint } from "@google/design.md/linter";

/**
 * Renkler DESIGN.md'den CANLI okunur — tek doğru kaynak orasıdır.
 * Rengi değiştirmek için tailwind.config.js'i değil, DESIGN.md'yi düzenle.
 * DESIGN.md okunamazsa build bozulmasın diye güvenli fallback tutulur.
 */
const __dirname = dirname(fileURLToPath(import.meta.url));

const fallbackColors = {
  cream: "#FAF6F0",
  "cream-deep": "#F2EADE",
  sand: "#E7DACB",
  "sand-dark": "#D8C6B0",
  clay: "#C2410C",
  "clay-soft": "#DB6B3A",
  "clay-deep": "#9A3412",
  olive: "#6B6A4B",
  espresso: "#2A2320",
  "espresso-soft": "#4A3F38",
  "espresso-muted": "#7A6B60",
};

function loadDesignColors() {
  try {
    const md = readFileSync(join(__dirname, "DESIGN.md"), "utf8");
    const report = lint(md);
    const colors = report?.tailwindConfig?.data?.theme?.extend?.colors;
    if (colors && Object.keys(colors).length > 0) return colors;
  } catch (err) {
    console.warn("[tailwind] DESIGN.md okunamadı, fallback renkler kullanılıyor:", err.message);
  }
  return fallbackColors;
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./layouts/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      // Sıcak toprak paleti — kaynak: DESIGN.md
      colors: loadDesignColors(),
      fontFamily: {
        serif: ['"Fraunces"', "Georgia", "serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1200px",
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(42, 35, 32, 0.18)",
        card: "0 2px 12px -4px rgba(42, 35, 32, 0.12)",
      },
    },
  },
  plugins: [],
};
