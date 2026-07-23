// İçeriği ve varsayılan ayarları DB'ye yazar (npm run db:seed). Upsert ile
// idempotent: tekrar çalıştırınca mevcut kayıtları günceller, silmez.
import "dotenv/config";
import { hasDb, sql } from "./index.js";
import { services, projects, posts } from "./content-data.js";
import { site } from "../lib/site.js";
import { homeDefaults, aboutDefaults, designDefaults } from "../lib/panel-schema.js";

if (!hasDb) {
  console.error("HATA: DATABASE_URL tanımlı değil.");
  process.exit(1);
}

const jsonb = (v) => JSON.stringify(v ?? {});

async function run() {
  console.log("İçerik seed ediliyor...");

  for (const s of services) {
    await sql`INSERT INTO services (slug, title, summary, description, icon, image, features, sort_order, active)
      VALUES (${s.slug}, ${s.title}, ${s.summary || null}, ${s.description || null}, ${s.icon || null}, ${s.image || null}, ${s.features || []}, ${s.sortOrder || 0}, true)
      ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary,
        description = EXCLUDED.description, icon = EXCLUDED.icon, features = EXCLUDED.features, sort_order = EXCLUDED.sort_order`;
  }
  for (const p of projects) {
    await sql`INSERT INTO projects (slug, title, service, location, description, image, gallery, featured, sort_order, active)
      VALUES (${p.slug}, ${p.title}, ${p.service || null}, ${p.location || null}, ${p.description || null}, ${p.image || null}, ${p.gallery || []}, ${p.featured || false}, ${p.sortOrder || 0}, true)
      ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, service = EXCLUDED.service, location = EXCLUDED.location,
        description = EXCLUDED.description, featured = EXCLUDED.featured, sort_order = EXCLUDED.sort_order`;
  }
  for (const p of posts) {
    await sql`INSERT INTO posts (slug, title, excerpt, content, cover, tags, published)
      VALUES (${p.slug}, ${p.title}, ${p.excerpt || null}, ${p.content || null}, ${p.cover || null}, ${p.tags || []}, ${p.published !== false})
      ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, excerpt = EXCLUDED.excerpt,
        content = EXCLUDED.content, tags = EXCLUDED.tags, published = EXCLUDED.published`;
  }
  for (const [key, value] of [["site", site], ["home", homeDefaults], ["design", designDefaults], ["about", aboutDefaults]]) {
    await sql`INSERT INTO settings (key, value, updated_at) VALUES (${key}, ${jsonb(value)}::jsonb, now())
      ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now()`;
  }

  console.log(`${services.length} hizmet, ${projects.length} referans, ${posts.length} yazı işlendi.`);
  await sql.end();
}

run().catch((err) => {
  console.error("Seed hatası:", err);
  process.exit(1);
});
