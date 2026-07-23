// Sunucu tarafı okuma yardımcıları. DB yoksa content-data.js + panel-schema.js
// varsayılanları döner. Vike +data.js dosyaları bunları çağırır.
import { hasDb, sql } from "./index.js";
import { site } from "../lib/site.js";
import { homeDefaults, aboutDefaults, designDefaults } from "../lib/panel-schema.js";
import { defaultAdminData, ensureCollectionSeeded, ensureSettingSeeded } from "./bootstrap.js";

export async function getSiteSettings() {
  if (!hasDb) return site;
  try {
    const rows = await sql`SELECT value FROM settings WHERE key = 'site'`;
    return rows.length ? { ...site, ...rows[0].value } : site;
  } catch {
    return site;
  }
}

const readers = {
  services: () =>
    sql`SELECT id, slug, title, summary, description, icon, image, features, sort_order AS "sortOrder", active FROM services ORDER BY sort_order, title`,
  projects: () =>
    sql`SELECT id, slug, title, service, location, description, image, gallery, featured, sort_order AS "sortOrder", active FROM projects ORDER BY sort_order, title`,
  posts: () =>
    sql`SELECT id, slug, title, excerpt, content, cover, tags, published, published_at AS "publishedAt" FROM posts ORDER BY published_at DESC, id DESC`,
};

// activeOnly: yayında/aktif olmayan kayıtları eler (active=false veya published=false).
async function readCollection(name, activeOnly) {
  if (!hasDb) return defaultAdminData[name] || [];
  try {
    await ensureCollectionSeeded(name);
    const defaults = defaultAdminData[name] || [];
    const rows = (await readers[name]()).map((row) => {
      const fallback = defaults.find((item) => item.slug === row.slug);
      if (!fallback) return row;
      return {
        ...row,
        image: row.image || fallback.image,
        cover: row.cover || fallback.cover,
        gallery: row.gallery?.length ? row.gallery : fallback.gallery,
      };
    });
    return activeOnly
      ? rows.filter((r) => r.active !== false && r.published !== false)
      : rows;
  } catch {
    return defaultAdminData[name] || [];
  }
}

export async function getHomeData() {
  const [siteS, home, design, about, services, projects, posts] = await Promise.all([
    getSiteSettings(),
    ensureSettingSeeded("home", homeDefaults),
    ensureSettingSeeded("design", designDefaults),
    ensureSettingSeeded("about", aboutDefaults),
    readCollection("services", true),
    readCollection("projects", true),
    readCollection("posts", true),
  ]);
  return { site: siteS, home, design, about, services, projects, posts };
}

export async function getServicesPageData() {
  const [siteS, home, services] = await Promise.all([
    getSiteSettings(),
    ensureSettingSeeded("home", homeDefaults),
    readCollection("services", true),
  ]);
  return { site: siteS, home, services };
}

export async function getServiceData(slug) {
  const [siteS, services, projects] = await Promise.all([
    getSiteSettings(),
    readCollection("services", true),
    readCollection("projects", true),
  ]);
  const service = services.find((s) => s.slug === slug) || null;
  const related = projects.filter((p) => p.service === slug);
  return { site: siteS, service, services, related };
}

export async function getProjectsPageData() {
  const [siteS, projects, services] = await Promise.all([
    getSiteSettings(),
    readCollection("projects", true),
    readCollection("services", true),
  ]);
  return { site: siteS, projects, services };
}

export async function getProjectData(slug) {
  const [siteS, projects, services] = await Promise.all([
    getSiteSettings(),
    readCollection("projects", true),
    readCollection("services", true),
  ]);
  const project = projects.find((p) => p.slug === slug) || null;
  return { site: siteS, project, services };
}

export async function getPostsPageData() {
  const [siteS, posts] = await Promise.all([
    getSiteSettings(),
    readCollection("posts", true),
  ]);
  return { site: siteS, posts };
}

export async function getPostData(slug) {
  const [siteS, posts] = await Promise.all([
    getSiteSettings(),
    readCollection("posts", true),
  ]);
  const post = posts.find((p) => p.slug === slug) || null;
  return { site: siteS, post, posts };
}

export async function getAboutData() {
  const [siteS, about] = await Promise.all([
    getSiteSettings(),
    ensureSettingSeeded("about", aboutDefaults),
  ]);
  return { site: siteS, about };
}

export async function getContactData() {
  const [siteS, services] = await Promise.all([
    getSiteSettings(),
    readCollection("services", true),
  ]);
  return { site: siteS, services };
}

// sitemap.xml için tüm yayın slug'ları.
export async function getAllSlugs() {
  const [services, projects, posts] = await Promise.all([
    readCollection("services", true),
    readCollection("projects", true),
    readCollection("posts", true),
  ]);
  return {
    services: services.map((s) => s.slug),
    projects: projects.map((p) => p.slug),
    posts: posts.map((p) => p.slug),
  };
}
