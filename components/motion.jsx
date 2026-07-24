import React from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Sitenin tek hareket ritmi.
 *
 * Tüm animasyonlar buradaki süre/easing token'larını paylaşır — böylece
 * kartın hover'ı, menünün açılışı ve bölüm girişleri aynı "his"te olur.
 * Her primitif `prefers-reduced-motion` açıkken hareketi tamamen bırakır;
 * içerik anında görünür kalır.
 */

// Giriş için ease-out, çıkış için ease-in (UX kuralı: giren yumuşar, çıkan hızlanır).
export const EASE_OUT = [0.22, 1, 0.36, 1];
export const EASE_IN = [0.64, 0, 0.78, 0];

export const DURATION = {
  tap: 0.12,
  fast: 0.18,
  base: 0.28,
  slow: 0.45,
  reveal: 0.7,
};

// Dokunma/hover geri bildirimi için fiziksel his — lineer eğrilerden doğal.
export const SPRING = { type: "spring", stiffness: 300, damping: 28, mass: 0.8 };
export const SPRING_SOFT = { type: "spring", stiffness: 180, damping: 24, mass: 1 };

// Bölüm görünürlüğü: bir kez oynat, elemanın %18'i göründüğünde tetikle.
export const VIEWPORT = { once: true, amount: 0.18 };

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.reveal, ease: EASE_OUT },
  },
};

/** Hareketin kapalı olup olmadığını döndürür (SSR'da false). */
export function useMotionSafe() {
  return !useReducedMotion();
}

/**
 * Scroll ile görünür olunca beliren sarmalayıcı.
 * API bilerek eski CSS tabanlı Reveal ile aynı: `delay` milisaniye cinsinden.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  as = "div",
  y = 24,
  ...rest
}) {
  const safe = useMotionSafe();
  const Tag = motion[as] || motion.div;

  const anim = safe
    ? {
        initial: { opacity: 0, y },
        whileInView: { opacity: 1, y: 0 },
        viewport: VIEWPORT,
        transition: { duration: DURATION.reveal, ease: EASE_OUT, delay: delay / 1000 },
      }
    : {};

  return (
    <Tag data-reveal className={className} {...anim} {...rest}>
      {children}
    </Tag>
  );
}

/**
 * Izgara/liste girişleri için kademeli (stagger) sarmalayıcı.
 * Çocuklar `StaggerItem` olmalı. 60ms aralık — Material'ın 30-50ms önerisinin
 * biraz üstü, kart boyutundaki öğelerde daha okunaklı.
 */
export function Stagger({
  children,
  className = "",
  as = "div",
  stagger = 0.06,
  delay = 0,
  ...rest
}) {
  const safe = useMotionSafe();
  const Tag = motion[as] || motion.div;

  const anim = safe
    ? {
        initial: "hidden",
        whileInView: "visible",
        viewport: VIEWPORT,
        variants: {
          hidden: {},
          visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
        },
      }
    : {};

  return (
    <Tag className={className} {...anim} {...rest}>
      {children}
    </Tag>
  );
}

/** `Stagger` içindeki tek öğe. */
export function StaggerItem({ children, className = "", as = "div", y = 20, ...rest }) {
  const safe = useMotionSafe();
  const Tag = motion[as] || motion.div;

  const anim = safe
    ? {
        variants: {
          hidden: { opacity: 0, y },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: DURATION.reveal, ease: EASE_OUT },
          },
        },
      }
    : {};

  return (
    <Tag data-reveal className={className} {...anim} {...rest}>
      {children}
    </Tag>
  );
}
