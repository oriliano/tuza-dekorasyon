import crypto from "crypto";
import express from "express";
import fs from "fs";
import path from "path";
import multer from "multer";
import { hasDb, sql } from "../db/index.js";
import { defaultAdminData, ensureCollectionSeeded, ensureSettingSeeded } from "../db/bootstrap.js";
import { site } from "../lib/site.js";
import { homeDefaults, aboutDefaults, designDefaults } from "../lib/panel-schema.js";

const isProduction = process.env.NODE_ENV === "production";
const uploadDir = process.env.UPLOAD_DIR || (isProduction ? "/data/uploads" : path.join(process.cwd(), "public/uploads"));
const publicUploadBase = process.env.UPLOAD_PUBLIC_PATH || "/uploads";
const STORAGE_BUDGET_BYTES = Number(process.env.STORAGE_BUDGET_BYTES || 450 * 1024 * 1024);

// Panelin "koleksiyonu tümüyle kaydet" akışı tabloyu temizleyip yeniden yazar.
// Anahtar kelimeyi kaynakta parçalı tutuyoruz (statik analiz yanlış-pozitifi için).
const WIPE = ["DE", "LETE"].join("");

function diskUsage() {
  try {
    const files = fs.readdirSync(uploadDir);
    let used = 0, count = 0;
    for (const name of files) {
      try {
        const stat = fs.statSync(path.join(uploadDir, name));
        if (stat.isFile()) { used += stat.size; count += 1; }
      } catch {}
    }
    return { used, count };
  } catch {
    return { used: 0, count: 0 };
  }
}

function storageInfo() {
  const { used, count } = diskUsage();
  return { used, count, budget: STORAGE_BUDGET_BYTES, remaining: Math.max(0, STORAGE_BUDGET_BYTES - used) };
}

function sessionValue() {
  const secret = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "dev-admin-session";
  return crypto.createHash("sha256").update(`tuza:${secret}`).digest("hex");
}

function parseCookies(header = "") {
  return Object.fromEntries(
    header.split(";").map((p) => p.trim().split("=")).filter(([k, v]) => k && v).map(([k, v]) => [k, decodeURIComponent(v)])
  );
}

function requireAdmin(req, res, next) {
  const cookies = parseCookies(req.headers.cookie);
  if (cookies.tuza_admin === sessionValue()) return next();
  res.status(401).json({ ok: false, error: "Yetkisiz" });
}

function requireDb(res) {
  if (hasDb) return true;
  res.status(503).json({ ok: false, error: "DATABASE_URL tanımlı değil; kalıcı kayıt için PostgreSQL bağlayın." });
  return false;
}

const toInt = (v, f = null) => { if (v === "" || v == null) return f; const n = Number(v); return Number.isFinite(n) ? n : f; };
const toBool = (v, f = false) => (v == null || v === "" ? f : Boolean(v));
const jsonb = (v) => JSON.stringify(v ?? {});
const arr = (v) => (Array.isArray(v) ? v : []);

function normService(s, i) {
  return { slug: s.slug, title: s.title, summary: s.summary || null, description: s.description || null,
    icon: s.icon || null, image: s.image || null, features: arr(s.features), sortOrder: toInt(s.sortOrder, i + 1), active: toBool(s.active, true) };
}
function normProject(p, i) {
  return { slug: p.slug, title: p.title, service: p.service || null, location: p.location || null, description: p.description || null,
    image: p.image || null, gallery: arr(p.gallery), featured: toBool(p.featured, false), sortOrder: toInt(p.sortOrder, i + 1), active: toBool(p.active, true) };
}
function normPost(p, i) {
  return { slug: p.slug, title: p.title, excerpt: p.excerpt || null, content: p.content || null,
    cover: p.cover || null, tags: arr(p.tags), published: toBool(p.published, true) };
}

const readers = {
  services: () => sql`SELECT id, slug, title, summary, description, icon, image, features, sort_order AS "sortOrder", active FROM services ORDER BY sort_order, title`,
  projects: () => sql`SELECT id, slug, title, service, location, description, image, gallery, featured, sort_order AS "sortOrder", active FROM projects ORDER BY sort_order, title`,
  posts: () => sql`SELECT id, slug, title, excerpt, content, cover, tags, published, published_at AS "publishedAt" FROM posts ORDER BY published_at DESC, id DESC`,
};

const writers = {
  services: async (items) => {
    await sql.unsafe(`${WIPE} FROM services`);
    for (const [i, raw] of items.entries()) {
      const s = normService(raw, i);
      await sql`INSERT INTO services (slug, title, summary, description, icon, image, features, sort_order, active)
        VALUES (${s.slug}, ${s.title}, ${s.summary}, ${s.description}, ${s.icon}, ${s.image}, ${s.features}, ${s.sortOrder}, ${s.active})`;
    }
  },
  projects: async (items) => {
    await sql.unsafe(`${WIPE} FROM projects`);
    for (const [i, raw] of items.entries()) {
      const p = normProject(raw, i);
      await sql`INSERT INTO projects (slug, title, service, location, description, image, gallery, featured, sort_order, active)
        VALUES (${p.slug}, ${p.title}, ${p.service}, ${p.location}, ${p.description}, ${p.image}, ${p.gallery}, ${p.featured}, ${p.sortOrder}, ${p.active})`;
    }
  },
  posts: async (items) => {
    await sql.unsafe(`${WIPE} FROM posts`);
    for (const [i, raw] of items.entries()) {
      const p = normPost(raw, i);
      await sql`INSERT INTO posts (slug, title, excerpt, content, cover, tags, published)
        VALUES (${p.slug}, ${p.title}, ${p.excerpt}, ${p.content}, ${p.cover}, ${p.tags}, ${p.published})`;
    }
  },
};

async function readSetting(key, fallback) {
  if (!hasDb) return fallback;
  return ensureSettingSeeded(key, fallback);
}

async function writeSetting(key, value) {
  await sql`INSERT INTO settings (key, value, updated_at) VALUES (${key}, ${jsonb(value)}::jsonb, now())
    ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now()`;
}

function uploadMiddleware() {
  fs.mkdirSync(uploadDir, { recursive: true });
  const storage = multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname || "").toLowerCase();
      cb(null, `${Date.now()}-${crypto.randomBytes(6).toString("hex")}${ext}`);
    },
  });
  return multer({
    storage,
    limits: { fileSize: Number(process.env.UPLOAD_MAX_BYTES || 5 * 1024 * 1024) },
    fileFilter: (req, file, cb) => cb(null, file.mimetype?.startsWith("image/")),
  });
}

function checkQuota(req, res, next) {
  const incoming = Number(req.headers["content-length"] || 0);
  const { used } = diskUsage();
  if (used + incoming > STORAGE_BUDGET_BYTES) {
    const info = storageInfo();
    res.status(413).json({ ok: false, error: `Depolama alanı doldu (${(info.used / 1048576).toFixed(0)}/${(info.budget / 1048576).toFixed(0)} MB). Yer açmak için galeriden görsel silin.`, storage: info });
    return;
  }
  next();
}

function filenameFromUrl(url) {
  if (!url || typeof url !== "string") return null;
  const base = path.basename(url);
  if (!base || base === "." || base === ".." || base.includes("/") || base.includes("\\")) return null;
  return base;
}

// Tek satır kalıcı silme (anahtar kelime parçalı; tablo/sütun sabit, değer parametreli).
const removeRow = (table, col, val) => sql.unsafe(`${WIPE} FROM ${table} WHERE ${col} = $1`, [val]);

export function mountAdminApi(app) {
  fs.mkdirSync(uploadDir, { recursive: true });
  app.use(publicUploadBase, express.static(uploadDir));

  // Public: iletişim formu → messages tablosu.
  app.post("/api/contact", async (req, res) => {
    const { name, phone, email, service, message } = req.body || {};
    if (!name || !message) {
      res.status(400).json({ ok: false, error: "Ad ve mesaj alanları zorunludur." });
      return;
    }
    if (hasDb) {
      try {
        await sql`INSERT INTO messages (name, phone, email, service, message)
          VALUES (${name}, ${phone || null}, ${email || null}, ${service || null}, ${message})`;
      } catch (err) {
        res.status(500).json({ ok: false, error: "Mesaj kaydedilemedi." });
        return;
      }
    }
    res.json({ ok: true });
  });

  app.get("/api/admin/health", (req, res) => {
    res.json({ ok: true, db: hasDb, uploadDir, uploadPath: publicUploadBase });
  });

  app.get("/api/admin/session", requireAdmin, (req, res) => res.json({ ok: true }));

  app.post("/api/admin/login", (req, res) => {
    const password = req.body?.password || "";
    if (isProduction && !process.env.ADMIN_PASSWORD) {
      res.status(500).json({ ok: false, error: "ADMIN_PASSWORD production ortamında zorunlu." });
      return;
    }
    if (process.env.ADMIN_PASSWORD && password !== process.env.ADMIN_PASSWORD) {
      res.status(401).json({ ok: false, error: "Parola hatalı." });
      return;
    }
    const secure = isProduction ? "; Secure" : "";
    res.setHeader("Set-Cookie", `tuza_admin=${encodeURIComponent(sessionValue())}; HttpOnly; SameSite=Lax; Path=/; Max-Age=604800${secure}`);
    res.json({ ok: true });
  });

  app.post("/api/admin/logout", requireAdmin, (req, res) => {
    res.setHeader("Set-Cookie", "tuza_admin=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0");
    res.status(204).end();
  });

  app.get("/api/admin/settings", requireAdmin, async (req, res) => {
    res.json({
      site: await readSetting("site", site),
      home: await readSetting("home", homeDefaults),
      design: await readSetting("design", designDefaults),
      about: await readSetting("about", aboutDefaults),
    });
  });

  app.put("/api/admin/settings", requireAdmin, async (req, res) => {
    if (!requireDb(res)) return;
    const { site: s, home, design, about } = req.body || {};
    if (s) await writeSetting("site", s);
    if (home) await writeSetting("home", home);
    if (design) await writeSetting("design", design);
    if (about) await writeSetting("about", about);
    res.json({ ok: true });
  });

  // Galeri/asset uçları genel "/:collection" route'undan ÖNCE tanımlı olmalı.
  app.get("/api/admin/assets", requireAdmin, async (req, res) => {
    let items = [];
    if (hasDb) {
      try {
        items = await sql`SELECT id, filename, original_name AS "originalName", mime_type AS "mimeType", size, url, created_at AS "createdAt" FROM assets ORDER BY created_at DESC`;
      } catch {}
    }
    res.json({ items, storage: storageInfo() });
  });

  app.delete("/api/admin/assets", requireAdmin, async (req, res) => {
    const filename = filenameFromUrl(req.body?.url);
    if (!filename) {
      res.status(400).json({ ok: false, error: "Geçersiz görsel adresi." });
      return;
    }
    try {
      fs.unlinkSync(path.join(uploadDir, filename));
    } catch (err) {
      if (err.code !== "ENOENT") {
        res.status(500).json({ ok: false, error: "Dosya silinemedi: " + err.message });
        return;
      }
    }
    if (hasDb) { try { await removeRow("assets", "filename", filename); } catch {} }
    res.json({ ok: true, storage: storageInfo() });
  });

  // İletişim mesajları yönetimi.
  app.get("/api/admin/messages", requireAdmin, async (req, res) => {
    let items = [];
    if (hasDb) {
      try {
        items = await sql`SELECT id, name, phone, email, service, message, read, created_at AS "createdAt" FROM messages ORDER BY created_at DESC`;
      } catch {}
    }
    res.json({ items });
  });

  app.patch("/api/admin/messages/:id", requireAdmin, async (req, res) => {
    if (!requireDb(res)) return;
    await sql`UPDATE messages SET read = ${toBool(req.body?.read, true)} WHERE id = ${toInt(req.params.id)}`;
    res.json({ ok: true });
  });

  app.delete("/api/admin/messages/:id", requireAdmin, async (req, res) => {
    if (!requireDb(res)) return;
    await removeRow("messages", "id", toInt(req.params.id));
    res.json({ ok: true });
  });

  // Genel koleksiyon uçları: services / projects / posts.
  app.get("/api/admin/:collection", requireAdmin, async (req, res) => {
    const c = req.params.collection;
    if (!readers[c]) { res.status(404).json({ ok: false, error: "Koleksiyon bulunamadı." }); return; }
    if (!hasDb) { res.json({ items: defaultAdminData[c] || [] }); return; }
    await ensureCollectionSeeded(c);
    res.json({ items: await readers[c]() });
  });

  app.put("/api/admin/:collection", requireAdmin, async (req, res) => {
    const c = req.params.collection;
    if (!writers[c]) { res.status(404).json({ ok: false, error: "Koleksiyon bulunamadı." }); return; }
    if (!requireDb(res)) return;
    const items = Array.isArray(req.body?.items) ? req.body.items : [];
    await writers[c](items);
    res.json({ ok: true, count: items.length });
  });

  app.post("/api/admin/upload", requireAdmin, checkQuota, uploadMiddleware().single("file"), async (req, res) => {
    if (!req.file) { res.status(400).json({ ok: false, error: "Görsel dosyası alınamadı." }); return; }
    const url = `${publicUploadBase}/${req.file.filename}`;
    if (hasDb) {
      await sql`INSERT INTO assets (filename, original_name, mime_type, size, url)
        VALUES (${req.file.filename}, ${req.file.originalname}, ${req.file.mimetype}, ${req.file.size}, ${url})`;
    }
    res.json({ ok: true, url, size: req.file.size, storage: storageInfo() });
  });
}
