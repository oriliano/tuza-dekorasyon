import React, { useEffect, useState } from "react";

const tabs = [
  ["overview", "Genel Bakış"],
  ["settings", "Site Ayarları"],
  ["messages", "Teklif Mesajları"],
  ["media", "Görseller"],
];

async function api(path, options = {}) {
  const response = await fetch(path, {
    credentials: "same-origin",
    ...options,
    headers: options.body instanceof FormData ? options.headers : { "Content-Type": "application/json", ...options.headers },
  });
  const data = response.status === 204 ? {} : await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || "İşlem tamamlanamadı.");
  return data;
}

export default function Page() {
  const [authenticated, setAuthenticated] = useState(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [tab, setTab] = useState("overview");
  const [health, setHealth] = useState(null);
  const [settings, setSettings] = useState(null);
  const [messages, setMessages] = useState([]);
  const [assets, setAssets] = useState([]);
  const [storage, setStorage] = useState(null);
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);

  async function loadDashboard() {
    const [settingsData, messagesData, assetsData] = await Promise.all([
      api("/api/admin/settings"),
      api("/api/admin/messages"),
      api("/api/admin/assets"),
    ]);
    setSettings(settingsData);
    setMessages(messagesData.items || []);
    setAssets(assetsData.items || []);
    setStorage(assetsData.storage || null);
  }

  useEffect(() => {
    Promise.all([
      api("/api/admin/health"),
      api("/api/admin/session").then(() => true).catch(() => false),
    ]).then(([healthData, session]) => {
      setHealth(healthData);
      setAuthenticated(session);
      if (session) loadDashboard();
    });
  }, []);

  async function login(event) {
    event.preventDefault();
    setBusy(true);
    setLoginError("");
    try {
      await api("/api/admin/login", { method: "POST", body: JSON.stringify({ password }) });
      setAuthenticated(true);
      setPassword("");
      await loadDashboard();
    } catch (error) {
      setLoginError(error.message);
    } finally {
      setBusy(false);
    }
  }

  async function logout() {
    await api("/api/admin/logout", { method: "POST" });
    setAuthenticated(false);
    setSettings(null);
  }

  async function saveSettings(event) {
    event.preventDefault();
    setBusy(true);
    setNotice("");
    try {
      await api("/api/admin/settings", { method: "PUT", body: JSON.stringify(settings) });
      setNotice("Site ayarları kaydedildi.");
    } catch (error) {
      setNotice(error.message);
    } finally {
      setBusy(false);
    }
  }

  async function upload(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setNotice("");
    const formData = new FormData();
    formData.append("file", file);
    try {
      const result = await api("/api/admin/upload", { method: "POST", body: formData });
      setNotice(`Görsel yüklendi: ${result.url}`);
      await loadDashboard();
    } catch (error) {
      setNotice(error.message);
    } finally {
      event.target.value = "";
      setBusy(false);
    }
  }

  if (authenticated === null) {
    return <PanelShell><Empty title="Panel hazırlanıyor" text="Oturum kontrol ediliyor…" /></PanelShell>;
  }

  if (!authenticated) {
    return (
      <PanelShell>
        <div className="mx-auto w-full max-w-md rounded-3xl bg-white p-7 shadow-soft ring-1 ring-espresso/5 sm:p-9">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-clay">Güvenli giriş</p>
          <h1 className="mt-3 text-3xl font-semibold">Yönetim paneli</h1>
          <p className="mt-2 text-sm leading-relaxed text-espresso-soft">Site içeriğini ve teklifleri yönetmek için parolanızı girin.</p>
          <form onSubmit={login} className="mt-7 space-y-4">
            <Input label="Panel parolası" id="panel-password" type="password" required autoFocus autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} />
            {loginError && <p className="rounded-xl bg-clay/10 p-3 text-sm text-clay-deep">{loginError}</p>}
            <button disabled={busy} className="btn btn-primary w-full disabled:opacity-60">{busy ? "Kontrol ediliyor…" : "Panele giriş yap"}</button>
          </form>
          <a href="/" className="mt-5 block text-center text-sm font-medium text-espresso-muted hover:text-clay">Siteye dön</a>
        </div>
      </PanelShell>
    );
  }

  return (
    <PanelShell>
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-clay">Tuza Dekorasyon</p><h1 className="mt-2 text-3xl font-semibold">Yönetim merkezi</h1></div>
          <div className="flex gap-2"><a href="/" target="_blank" rel="noreferrer" className="btn btn-ghost py-2.5">Siteyi aç</a><button onClick={logout} className="btn btn-ghost py-2.5">Çıkış</button></div>
        </div>

        {!health?.db && (
          <div className="mt-6 rounded-2xl border border-clay/25 bg-clay/10 p-5">
            <p className="font-semibold text-clay-deep">Veritabanı bağlı değil</p>
            <p className="mt-1 text-sm leading-relaxed text-espresso-soft">Site kod içindeki içerikle çalışıyor. Ayarlar ve teklif mesajları kalıcı kaydedilemez. Railway projesine PostgreSQL eklenip <code className="rounded bg-white/70 px-1.5 py-0.5">DATABASE_URL</code> tanımlandığında panel otomatik aktif olur.</p>
          </div>
        )}

        <div className="mt-7 flex gap-2 overflow-x-auto pb-2">
          {tabs.map(([id, label]) => <button key={id} onClick={() => setTab(id)} className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold transition ${tab === id ? "bg-espresso text-cream" : "bg-white text-espresso-soft shadow-card hover:text-clay"}`}>{label}</button>)}
        </div>
        {notice && <p className="mt-4 rounded-xl bg-white p-4 text-sm font-medium shadow-card">{notice}</p>}
        <div className="mt-5">
          {tab === "overview" && <Overview health={health} messages={messages} assets={assets} storage={storage} />}
          {tab === "settings" && settings && <Settings settings={settings} setSettings={setSettings} onSubmit={saveSettings} disabled={!health?.db || busy} />}
          {tab === "messages" && <Messages items={messages} db={health?.db} />}
          {tab === "media" && <Media assets={assets} storage={storage} onUpload={upload} busy={busy} />}
        </div>
      </div>
    </PanelShell>
  );
}

function PanelShell({ children }) {
  return <section className="min-h-[calc(100vh-72px)] bg-cream-deep px-5 py-12 sm:px-8 sm:py-16">{children}</section>;
}

function Empty({ title, text }) {
  return <div className="mx-auto max-w-md rounded-2xl bg-white p-8 text-center shadow-card"><h1 className="text-2xl">{title}</h1><p className="mt-2 text-sm text-espresso-soft">{text}</p></div>;
}

function Overview({ health, messages, assets, storage }) {
  const cards = [
    ["Sistem", health?.ok ? "Çevrimiçi" : "Kontrol gerekli"],
    ["Veritabanı", health?.db ? "Bağlı" : "Bağlı değil"],
    ["Teklif mesajı", String(messages.length)],
    ["Yüklenen görsel", String(assets.length || storage?.count || 0)],
  ];
  return <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{cards.map(([label, value]) => <div key={label} className="rounded-2xl bg-white p-5 shadow-card"><p className="text-xs uppercase tracking-wide text-espresso-muted">{label}</p><p className="mt-2 text-xl font-semibold">{value}</p></div>)}</div>;
}

function Settings({ settings, setSettings, onSubmit, disabled }) {
  const update = (group, key) => (event) => setSettings((current) => ({ ...current, [group]: { ...current[group], [key]: event.target.value } }));
  return (
    <form onSubmit={onSubmit} className="rounded-3xl bg-white p-6 shadow-card sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Input label="Firma adı" value={settings.site?.name || ""} onChange={update("site", "name")} />
        <Input label="Yetkili" value={settings.site?.owner || ""} onChange={update("site", "owner")} />
        <Input label="Telefon" value={settings.site?.phones?.[0] || ""} disabled />
        <Input label="E-posta" value={settings.site?.email || ""} onChange={update("site", "email")} />
        <Input label="Çalışma saatleri" value={settings.site?.hours || ""} onChange={update("site", "hours")} />
        <Input label="Hizmet bölgesi" value={settings.site?.locationLabel || ""} onChange={update("site", "locationLabel")} />
      </div>
      <div className="mt-5"><Input label="Ana sayfa başlığı" value={settings.home?.heroTitle || ""} onChange={update("home", "heroTitle")} /></div>
      <div className="mt-5"><label className="mb-1.5 block text-sm font-medium">Ana sayfa açıklaması</label><textarea rows={4} className="field-control resize-none" value={settings.home?.heroSubtitle || ""} onChange={update("home", "heroSubtitle")} /></div>
      <button disabled={disabled} className="btn btn-primary mt-6 disabled:cursor-not-allowed disabled:opacity-40">Ayarları kaydet</button>
      {disabled && <p className="mt-3 text-xs text-espresso-muted">Kaydetmek için production veritabanı bağlantısı gereklidir.</p>}
    </form>
  );
}

function Input({ label, ...props }) {
  return <div><label htmlFor={props.id} className="mb-1.5 block text-sm font-medium">{label}</label><input className="field-control disabled:opacity-60" {...props} /></div>;
}

function Messages({ items, db }) {
  if (!db) return <Empty title="Mesaj kaydı kapalı" text="Veritabanı bağlandıktan sonra teklif formundan gelen mesajlar burada görünecek." />;
  if (!items.length) return <Empty title="Henüz mesaj yok" text="Yeni teklif talepleri burada listelenecek." />;
  return <div className="space-y-3">{items.map((item) => <article key={item.id} className="rounded-2xl bg-white p-5 shadow-card"><div className="flex flex-wrap justify-between gap-2"><h2 className="text-lg font-semibold">{item.name}</h2><span className="text-xs text-espresso-muted">{item.createdAt ? new Date(item.createdAt).toLocaleString("tr-TR") : ""}</span></div><p className="mt-1 text-sm text-clay">{item.phone || item.email}</p><p className="mt-3 text-sm leading-relaxed text-espresso-soft">{item.message}</p></article>)}</div>;
}

function Media({ assets, storage, onUpload, busy }) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-card sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div><h2 className="text-xl font-semibold">Görsel kütüphanesi</h2><p className="mt-1 text-sm text-espresso-muted">{storage ? `${storage.count} dosya · ${(storage.used / 1048576).toFixed(1)} MB kullanılıyor` : "Yüklenen dosyalar"}</p></div>
        <label className="btn btn-primary cursor-pointer">{busy ? "Yükleniyor…" : "Görsel yükle"}<input type="file" accept="image/*" className="sr-only" onChange={onUpload} disabled={busy} /></label>
      </div>
      {assets.length ? <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{assets.map((asset) => <figure key={asset.id || asset.url} className="overflow-hidden rounded-xl bg-cream-deep"><img src={asset.url} alt={asset.originalName || "Yüklenen görsel"} className="aspect-square w-full object-cover" loading="lazy" /><figcaption className="truncate p-3 text-xs text-espresso-muted">{asset.originalName || asset.filename}</figcaption></figure>)}</div> : <p className="mt-6 rounded-xl bg-cream-deep p-5 text-sm text-espresso-muted">Henüz panelden yüklenmiş görsel bulunmuyor.</p>}
    </div>
  );
}
