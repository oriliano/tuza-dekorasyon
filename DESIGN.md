---
version: alpha
name: Tuza Dekorasyon
description: Sıcak toprak paleti — premium, doğal ve zanaatkâr bir dekorasyon markası
colors:
  espresso: "#2A2320"
  espresso-soft: "#4A3F38"
  espresso-muted: "#7A6B60"
  clay: "#C2410C"
  clay-soft: "#DB6B3A"
  clay-deep: "#9A3412"
  olive: "#6B6A4B"
  cream: "#FAF6F0"
  cream-deep: "#F2EADE"
  sand: "#E7DACB"
  sand-dark: "#D8C6B0"
typography:
  h1:
    fontFamily: Fraunces
    fontSize: 3rem
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  h2:
    fontFamily: Fraunces
    fontSize: 2rem
    fontWeight: 600
    lineHeight: 1.2
  h3:
    fontFamily: Fraunces
    fontSize: 1.5rem
    fontWeight: 600
  body-md:
    fontFamily: Inter
    fontSize: 1rem
    lineHeight: 1.6
  body-sm:
    fontFamily: Inter
    fontSize: 0.875rem
    lineHeight: 1.55
  label-caps:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: 600
    letterSpacing: "0.08em"
rounded:
  sm: 8px
  md: 12px
  lg: 20px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 48px
components:
  button-primary:
    backgroundColor: "{colors.clay}"
    textColor: "{colors.cream}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.sm}"
    padding: 12px
  button-primary-hover:
    backgroundColor: "{colors.clay-deep}"
    textColor: "{colors.cream}"
  chip-accent:
    backgroundColor: "{colors.clay-soft}"
    textColor: "{colors.espresso}"
    rounded: "{rounded.sm}"
  button-secondary:
    backgroundColor: "{colors.sand}"
    textColor: "{colors.espresso}"
    rounded: "{rounded.sm}"
    padding: 12px
  card:
    backgroundColor: "{colors.sand}"
    textColor: "{colors.espresso}"
    rounded: "{rounded.md}"
    padding: 24px
  card-hover:
    backgroundColor: "{colors.sand-dark}"
    textColor: "{colors.espresso}"
  section:
    backgroundColor: "{colors.cream-deep}"
    textColor: "{colors.espresso-soft}"
  caption:
    textColor: "{colors.espresso-muted}"
    typography: "{typography.body-sm}"
  accent-tag:
    backgroundColor: "{colors.olive}"
    textColor: "{colors.cream}"
    rounded: "{rounded.sm}"
---

## Overview

Sıcak toprak minimalizmi ile zanaatkâr sıcaklığı buluşuyor. Arayüz, mat bir
premium dokunuşu çağrıştırır — doğal keten, pişmiş toprak ve espresso tonlarıyla
kurulmuş, sakin ama karakterli bir dekorasyon markası. Terracotta (**clay**) rengi
tek etkileşim sürücüsüdür; geri kalan her şey nötr ve dingindir.

Bu dosya markanın **tek doğru kaynağıdır** — renkler `tailwind.config.js`
tarafından buradan canlı okunur. Rengi değiştirmek için burayı düzenle.

## Colors

Palet, yüksek kontrastlı sıcak nötrler ve tek bir aksan renginin çevresinde kurulur.
Token adları Tailwind sınıf adlarıyla birebir eşleşir (`clay` → `bg-clay`).

- **Espresso (#2A2320):** Başlıklar ve ana metin için derin, sıcak siyah. `text-espresso`
- **Espresso-soft (#4A3F38):** İkincil metin ve bölüm içerikleri.
- **Espresso-muted (#7A6B60):** Kenarlıklar, alt yazılar ve metadata.
- **Clay (#C2410C):** Terracotta — tüm çağrı-eylem ve etkileşimin **tek** kaynağı.
- **Clay-soft (#DB6B3A):** Hover ve ışıltı için açık terracotta.
- **Clay-deep (#9A3412):** Basılı/aktif durum ve derin vurgular.
- **Olive (#6B6A4B):** İkincil doğal ton — etiketler ve nadir vurgular.
- **Cream (#FAF6F0):** Ana zemin — saf beyazdan daha sıcak, kremsi keten.
- **Cream-deep (#F2EADE):** Bölüm zeminleri.
- **Sand (#E7DACB):** Kart yüzeyleri — kum tonu.
- **Sand-dark (#D8C6B0):** Kart hover / ayraçlar.

## Typography

İki aile: başlıklar için **Fraunces** (serif, `font-serif`), gövde için **Inter**
(sans, `font-sans`).

- **h1–h3:** Fraunces, 600 ağırlık, sıkı satır aralığı. Başlıkları büyük ve güvenli tut.
- **body-md / body-sm:** Inter, rahat satır yüksekliği (1.6) ile okunabilirlik.
- **label-caps:** Inter, harf aralığı açık, buton ve küçük etiketler için.

## Layout

İçerik genişliği en fazla **1200px** (`max-w-content`). 8px tabanlı boşluk skalası
kullanılır (xs 4 · sm 8 · md 16 · lg 24 · xl 48). Cömert beyaz alanı koru.

## Elevation & Depth

Gölgeler yumuşak ve sıcak tonludur (espresso bazlı, düşük opaklık):

- **card:** `0 2px 12px -4px rgba(42, 35, 32, 0.12)` (`shadow-card`)
- **soft:** `0 10px 40px -12px rgba(42, 35, 32, 0.18)` (`shadow-soft`)

## Shapes

Yumuşak köşeler: sm 8px (buton/etiket), md 12px (kart), lg 20px (büyük paneller).

## Components

- **button-primary:** Clay zemin, cream metin. Hover'da clay-deep.
- **button-secondary:** Kum yüzey (sand), espresso metin — ikincil eylemler.
- **card:** Kum yüzey, md köşe, 24px iç boşluk; hover'da sand-dark.
- **accent-tag:** Olive zemin, kategori/etiket vurgusu için.

## Do's and Don'ts

- **Do:** Clay'i yalnızca birincil eylem ve tek vurgu için kullan.
- **Do:** Zemini cream'de tut; kartları sand tonuyla ayır.
- **Don't:** Saf beyaz (#FFFFFF) veya saf siyah (#000000) kullanma — palet hep sıcak.
- **Don't:** Aynı ekranda birden fazla aksan rengi yarıştırma.
