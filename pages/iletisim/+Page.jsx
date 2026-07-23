import React, { useState } from "react";
import { useData } from "vike-react/useData";
import { site as staticSite } from "../../lib/site.js";
import { Icon } from "../../components/Icon.jsx";
import { Reveal } from "../../components/Reveal.jsx";
import { PageHero } from "../../components/PageHero.jsx";

export default function Page() {
  const { site = staticSite, services = [] } = useData();
  const tel = site.phonesIntl?.[0] || site.phones?.[0];
  const wa = (site.whatsapp || "").replace(/[^\d]/g, "");
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    site.address?.mapQuery || site.name
  )}`;

  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | ok | error
  const [error, setError] = useState("");

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus("ok");
        setForm({ name: "", phone: "", email: "", service: "", message: "" });
      } else {
        setStatus("error");
        setError(data.error || "Mesaj gönderilemedi. Lütfen tekrar deneyin.");
      }
    } catch {
      setStatus("error");
      setError("Bağlantı hatası. Lütfen telefonla ulaşın.");
    }
  }

  const contactItems = [
    { icon: "phone", label: "Telefon", value: site.phones?.[0], href: `tel:${tel}` },
    { icon: "whatsapp", label: "WhatsApp", value: "Mesaj gönderin", href: `https://wa.me/${wa}` },
    { icon: "mail", label: "E-posta", value: site.email, href: `mailto:${site.email}` },
    { icon: "location", label: "Adres", value: site.address?.full, href: mapUrl },
    { icon: "clock", label: "Çalışma Saatleri", value: site.hours },
  ];

  return (
    <>
      <PageHero
        eyebrow="İletişim"
        title="Ücretsiz keşif için bize ulaşın"
        text="Projenizi konuşalım. Formu doldurun ya da doğrudan arayın; en kısa sürede size dönüş yapalım."
        breadcrumbs={[{ name: "Ana Sayfa", path: "/" }, { name: "İletişim" }]}
      />

      <section className="py-16 sm:py-20">
        <div className="container-tuza grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          {/* İletişim bilgileri */}
          <Reveal>
            <div className="space-y-3">
              {contactItems.map((c) => {
                const Inner = (
                  <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-card ring-1 ring-espresso/5 transition-all hover:ring-clay/15">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-clay/10 text-clay">
                      <Icon name={c.icon} className="h-6 w-6" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-wide text-espresso-muted">{c.label}</p>
                      <p className="truncate font-medium text-espresso">{c.value}</p>
                    </div>
                  </div>
                );
                return c.href ? (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="block"
                  >
                    {Inner}
                  </a>
                ) : (
                  <div key={c.label}>{Inner}</div>
                );
              })}
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={100}>
            <div className="card p-6 sm:p-8">
              {status === "ok" ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-clay/10 text-clay">
                    <Icon name="check" className="h-8 w-8" strokeWidth={2} />
                  </span>
                  <h3 className="mt-5 font-serif text-2xl font-semibold text-espresso">Mesajınız alındı</h3>
                  <p className="mt-2 max-w-sm text-espresso-soft">
                    En kısa sürede size dönüş yapacağız. Acil durumlar için telefonla ulaşabilirsiniz.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="btn btn-ghost mt-6"
                  >
                    Yeni Mesaj Gönder
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-4">
                  <h2 className="text-xl font-semibold text-espresso">Teklif Formu</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Ad Soyad *" value={form.name} onChange={update("name")} required placeholder="Adınız" />
                    <Field label="Telefon" value={form.phone} onChange={update("phone")} type="tel" placeholder="05xx xxx xx xx" />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="E-posta" value={form.email} onChange={update("email")} type="email" placeholder="ornek@mail.com" />
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-espresso-soft">Hizmet</label>
                      <select
                        value={form.service}
                        onChange={update("service")}
                        className="field-control"
                      >
                        <option value="">Seçiniz</option>
                        {services.map((s) => (
                          <option key={s.slug} value={s.title}>{s.title}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-espresso-soft">Mesajınız *</label>
                    <textarea
                      value={form.message}
                      onChange={update("message")}
                      required
                      rows={5}
                      placeholder="Projeniz hakkında kısaca bilgi verin..."
                      className="field-control resize-none"
                    />
                  </div>

                  {status === "error" && (
                    <p className="rounded-xl bg-clay/10 px-4 py-3 text-sm font-medium text-clay-deep">{error}</p>
                  )}

                  <button type="submit" disabled={status === "sending"} className="btn btn-primary w-full disabled:opacity-60">
                    {status === "sending" ? "Gönderiliyor..." : "Mesajı Gönder"}
                    {status !== "sending" && <Icon name="arrow" className="h-4 w-4" />}
                  </button>
                  <p className="text-center text-xs text-espresso-muted">
                    Bilgileriniz yalnızca size dönüş yapmak için kullanılır.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Field({ label, type = "text", ...rest }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-espresso-soft">{label}</label>
      <input
        type={type}
        {...rest}
        className="field-control"
      />
    </div>
  );
}
