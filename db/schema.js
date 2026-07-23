// Drizzle ORM şeması — PostgreSQL tabloları (dekorasyon/yapı domaini).
import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  jsonb,
  timestamp,
} from "drizzle-orm/pg-core";

// Hizmetler (boya badana, mantolama, alçıpan...). Panelden yönetilir.
export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  summary: text("summary"), // kısa açıklama (kart)
  description: text("description"), // uzun açıklama (detay sayfası)
  icon: text("icon"), // motif anahtarı (bkz. components/ServiceIcon)
  image: text("image"), // opsiyonel kapak görseli; yoksa placeholder
  features: text("features").array(), // madde madde kapsam
  sortOrder: integer("sort_order").notNull().default(0),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Referanslar / tamamlanan işler galerisi. Panelden yönetilir.
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  service: text("service"), // ilgili hizmet slug'ı (filtre için)
  location: text("location"), // "Şehitkamil, Gaziantep"
  description: text("description"),
  image: text("image"), // kapak görseli
  gallery: text("gallery").array(), // ek görsel adresleri
  featured: boolean("featured").notNull().default(false),
  sortOrder: integer("sort_order").notNull().default(0),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Blog / yazılar (SEO). Panelden yönetilir.
export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt"),
  content: text("content"), // basit HTML/markdown metin
  cover: text("cover"),
  tags: text("tags").array(),
  published: boolean("published").notNull().default(true),
  publishedAt: timestamp("published_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

// İletişim formu kayıtları. Siteden gelir, panelde okunur.
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone"),
  email: text("email"),
  service: text("service"), // ilgilenilen hizmet
  message: text("message"),
  read: boolean("read").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Serbest anahtar/değer ayarları: site bilgisi, tasarım, ana sayfa, hakkımızda.
export const settings = pgTable("settings", {
  key: text("key").primaryKey(),
  value: jsonb("value").notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Yüklenen görseller (galeri yöneticisi + depolama bütçesi).
export const assets = pgTable("assets", {
  id: serial("id").primaryKey(),
  filename: text("filename").notNull(),
  originalName: text("original_name"),
  mimeType: text("mime_type"),
  size: integer("size"),
  url: text("url").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
