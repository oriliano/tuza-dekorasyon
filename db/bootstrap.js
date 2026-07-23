// DB'siz (DATABASE_URL yok) çalışma için varsayılan veri + DB varken ilk kez
// boş tabloları content-data.js ile tohumlama yardımcıları.
import { hasDb, sql } from "./index.js";
import {
  services as defaultServices,
  projects as defaultProjects,
  posts as defaultPosts,
} from "./content-data.js";

export const defaultAdminData = {
  services: defaultServices,
  projects: defaultProjects,
  posts: defaultPosts,
};

const seeders = {
  services: async () => {
    for (const s of defaultServices) {
      await sql`
        INSERT INTO services (slug, title, summary, description, icon, image, features, sort_order, active)
        VALUES (${s.slug}, ${s.title}, ${s.summary || null}, ${s.description || null}, ${s.icon || null}, ${s.image || null}, ${s.features || []}, ${s.sortOrder || 0}, true)
        ON CONFLICT (slug) DO NOTHING`;
    }
  },
  projects: async () => {
    for (const p of defaultProjects) {
      await sql`
        INSERT INTO projects (slug, title, service, location, description, image, gallery, featured, sort_order, active)
        VALUES (${p.slug}, ${p.title}, ${p.service || null}, ${p.location || null}, ${p.description || null}, ${p.image || null}, ${p.gallery || []}, ${p.featured || false}, ${p.sortOrder || 0}, true)
        ON CONFLICT (slug) DO NOTHING`;
    }
  },
  posts: async () => {
    for (const p of defaultPosts) {
      await sql`
        INSERT INTO posts (slug, title, excerpt, content, cover, tags, published)
        VALUES (${p.slug}, ${p.title}, ${p.excerpt || null}, ${p.content || null}, ${p.cover || null}, ${p.tags || []}, ${p.published !== false})
        ON CONFLICT (slug) DO NOTHING`;
    }
  },
};

const counters = {
  services: () => sql`SELECT count(*)::int AS n FROM services`,
  projects: () => sql`SELECT count(*)::int AS n FROM projects`,
  posts: () => sql`SELECT count(*)::int AS n FROM posts`,
};

// Tablo boşsa varsayılan veriyle tohumla (idempotent).
export async function ensureCollectionSeeded(collection) {
  if (!hasDb || !seeders[collection]) return;
  try {
    const [{ n }] = await counters[collection]();
    if (n === 0) await seeders[collection]();
  } catch {
    // tablo henüz yoksa sessiz geç (migrate edilmemiş).
  }
}

// Ayar anahtarı yoksa fallback'i yazıp döndür; varsa saklanan değeri döndür.
export async function ensureSettingSeeded(key, fallback) {
  if (!hasDb) return fallback;
  try {
    const rows = await sql`SELECT value FROM settings WHERE key = ${key}`;
    if (rows.length) return rows[0].value;
    await sql`
      INSERT INTO settings (key, value, updated_at)
      VALUES (${key}, ${JSON.stringify(fallback ?? {})}::jsonb, now())
      ON CONFLICT (key) DO NOTHING`;
    return fallback;
  } catch {
    return fallback;
  }
}
