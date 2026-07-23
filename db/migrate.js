// db/migrations/*.sql dosyalarını sırayla çalıştırır, ardından boşsa tohumlar.
import "dotenv/config";
import fs from "fs";
import path from "path";
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
  const dir = path.join(process.cwd(), "db/migrations");
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".sql")).sort();
    for (const file of files) {
      console.log(`Migration: ${file}`);
      await sql.unsafe(fs.readFileSync(path.join(dir, file), "utf8"));
    }
  }

  const [{ n }] = await sql`SELECT count(*)::int AS n FROM services`;
  if (n === 0) {
    console.log("İçerik tohumlanıyor...");
    for (const s of services) {
      await sql`INSERT INTO services (slug, title, summary, description, icon, image, features, sort_order, active)
        VALUES (${s.slug}, ${s.title}, ${s.summary || null}, ${s.description || null}, ${s.icon || null}, ${s.image || null}, ${s.features || []}, ${s.sortOrder || 0}, true) ON CONFLICT (slug) DO NOTHING`;
    }
    for (const p of projects) {
      await sql`INSERT INTO projects (slug, title, service, location, description, image, gallery, featured, sort_order, active)
        VALUES (${p.slug}, ${p.title}, ${p.service || null}, ${p.location || null}, ${p.description || null}, ${p.image || null}, ${p.gallery || []}, ${p.featured || false}, ${p.sortOrder || 0}, true) ON CONFLICT (slug) DO NOTHING`;
    }
    for (const p of posts) {
      await sql`INSERT INTO posts (slug, title, excerpt, content, cover, tags, published)
        VALUES (${p.slug}, ${p.title}, ${p.excerpt || null}, ${p.content || null}, ${p.cover || null}, ${p.tags || []}, ${p.published !== false}) ON CONFLICT (slug) DO NOTHING`;
    }
    for (const [key, value] of [["site", site], ["home", homeDefaults], ["design", designDefaults], ["about", aboutDefaults]]) {
      await sql`INSERT INTO settings (key, value, updated_at) VALUES (${key}, ${jsonb(value)}::jsonb, now()) ON CONFLICT (key) DO NOTHING`;
    }
  }

  console.log("Migration tamamlandı.");
  await sql.end();
}

run().catch((err) => {
  console.error("Migration hatası:", err);
  process.exit(1);
});
