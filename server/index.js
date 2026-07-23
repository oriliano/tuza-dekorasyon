// Express + Vike (SSR) sunucusu. Geliştirmede Vite middleware, üretimde dist.
import express from "express";
import http from "http";
import compression from "compression";
import { renderPage } from "vike/server";
import { getSiteSettings, getAllSlugs } from "../db/data.js";
import { site } from "../lib/site.js";
import { siteUrl } from "../lib/seo.js";
import { mountAdminApi } from "./admin-api.js";
import "dotenv/config";

const isProduction = process.env.NODE_ENV === "production";
const port = process.env.PORT || 3000;
const root = process.cwd();

async function startServer() {
  const app = express();
  app.use(compression());
  app.use(express.json({ limit: "2mb" }));
  mountAdminApi(app);

  const server = http.createServer(app);

  if (isProduction) {
    const sirv = (await import("sirv")).default;
    app.use(sirv(`${root}/dist/client`, { extensions: [] }));
  } else {
    const vite = await import("vite");
    const viteDevServer = await vite.createServer({
      root,
      server: { middlewareMode: true, hmr: { server } },
    });
    app.use(viteDevServer.middlewares);
  }

  app.get("/robots.txt", (req, res) => {
    res.type("text/plain").send(`User-agent: *\nAllow: /\nSitemap: ${siteUrl()}/sitemap.xml\n`);
  });

  app.get("/sitemap.xml", async (req, res) => {
    const base = siteUrl();
    const staticPaths = ["/", "/hizmetler", "/referanslar", "/blog", "/hakkimizda", "/iletisim"];
    let slugs = { services: [], projects: [], posts: [] };
    try { slugs = await getAllSlugs(); } catch {}
    const paths = [
      ...staticPaths,
      ...slugs.services.map((s) => `/hizmetler/${s}`),
      ...slugs.projects.map((s) => `/referanslar/${s}`),
      ...slugs.posts.map((s) => `/blog/${s}`),
    ];
    const xml =
      `<?xml version="1.0" encoding="UTF-8"?>\n` +
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
      paths.map((u) => `  <url><loc>${base}${u === "/" ? "" : u}</loc></url>`).join("\n") +
      `\n</urlset>\n`;
    res.type("application/xml").send(xml);
  });

  app.get(/.*/, async (req, res, next) => {
    const s = await getSiteSettings();
    const pageContextInit = {
      urlOriginal: req.originalUrl,
      headersOriginal: req.headers,
      seo: {
        title: s.seoTitle || site.seoTitle,
        description: s.seoDescription || site.seoDescription,
        logo: s.logo || site.logo || "",
        favicon: s.favicon || site.favicon || "",
      },
    };
    const pageContext = await renderPage(pageContextInit);
    const { httpResponse } = pageContext;
    if (!httpResponse) return next();
    const { statusCode, headers, body } = httpResponse;
    headers.forEach(([name, value]) => res.setHeader(name, value));
    res.status(statusCode).send(body);
  });

  server.listen(port);
  console.log(`Tuza Dekorasyon çalışıyor → http://localhost:${port}`);
}

startServer();
