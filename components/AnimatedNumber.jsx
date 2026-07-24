import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useMotionSafe } from "./motion.jsx";

/**
 * Sayaç animasyonu — 21st.dev "Animated Number" (@ibelick) temel alınarak
 * bu projeye uyarlandı: TypeScript/shadcn bağımlılıkları çıkarıldı, panelden
 * gelen "500+", "15+", "%98" gibi metin değerlerini ayrıştırma eklendi.
 *
 * SSR'da nihai değer basılır (SEO + JS'siz görünüm doğru kalır); hidrasyondan
 * sonra sıfıra atlayıp görünür olunca hedefe sayar.
 */

// "%98" -> ["%", "98", ""] · "500+" -> ["", "500", "+"] · "15 Yıl" -> ["", "15", " Yıl"]
const PARTS = /^(\D*?)([\d.,]+)(.*)$/s;

function parse(value) {
  const raw = String(value ?? "").trim();
  const m = raw.match(PARTS);
  if (!m) return null;
  const numeric = Number(m[2].replace(/\./g, "").replace(",", "."));
  if (!Number.isFinite(numeric)) return null;
  return { prefix: m[1], target: numeric, suffix: m[3] };
}

export function AnimatedNumber({ value, className = "", duration = 1.6 }) {
  const parsed = parse(value);
  if (!parsed) return <span className={className}>{value}</span>;
  return <Counter {...parsed} className={className} duration={duration} />;
}

function Counter({ prefix, target, suffix, className, duration }) {
  const safe = useMotionSafe();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [armed, setArmed] = useState(false);

  // bounce:0 + süre => yumuşak, geri sekmeyen bir sayım.
  const spring = useSpring(target, { bounce: 0, duration: duration * 1000 });
  const display = useTransform(spring, (v) => Math.round(v).toLocaleString("tr-TR"));

  // Hidrasyondan sonra sıfırdan başlaması için değeri animasyonsuz geri al.
  useEffect(() => {
    if (!safe) return;
    spring.jump(0);
    setArmed(true);
  }, [safe, spring]);

  useEffect(() => {
    if (armed && inView) spring.set(target);
  }, [armed, inView, spring, target]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      <motion.span className="tabular-nums">{display}</motion.span>
      {suffix}
    </span>
  );
}
