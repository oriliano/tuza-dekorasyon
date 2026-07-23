/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./layouts/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Sıcak toprak paleti — Tuza Dekorasyon
        cream: {
          DEFAULT: "#FAF6F0", // ana zemin
          deep: "#F2EADE", // bölüm zemini
        },
        sand: {
          DEFAULT: "#E7DACB", // kart yüzeyi
          dark: "#D8C6B0",
        },
        clay: {
          DEFAULT: "#C2410C", // terracotta vurgu
          soft: "#DB6B3A",
          deep: "#9A3412",
        },
        olive: "#6B6A4B", // ikincil doğal ton
        espresso: {
          DEFAULT: "#2A2320", // ana metin
          soft: "#4A3F38",
          muted: "#7A6B60",
        },
      },
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
