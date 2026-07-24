import React from "react";
import { motion } from "framer-motion";
import { site } from "../lib/site.js";
import { Icon } from "./Icon.jsx";
import { EASE_OUT, SPRING, useMotionSafe } from "./motion.jsx";

export function FloatingContact() {
  const safe = useMotionSafe();
  const wa = (site.whatsapp || "").replace(/[^\d]/g, "");
  const msg = encodeURIComponent("Merhaba, dekorasyon hizmetleriniz hakkında bilgi almak istiyorum.");

  return (
    <motion.a
      href={`https://wa.me/${wa}?text=${msg}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp ile yazın"
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-0 rounded-full bg-[#25D366] px-3.5 py-3.5 text-white shadow-[0_12px_30px_-8px_rgba(37,211,102,0.6)] transition-[gap,padding] duration-300 hover:gap-2 hover:pr-5"
      // Sayfa yerleşince gelir; ilk saniyede okumayı bölmez.
      initial={safe ? { opacity: 0, scale: 0.8, y: 12 } : false}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { delay: 0.6, duration: 0.4, ease: EASE_OUT },
      }}
      whileHover={safe ? { scale: 1.05, transition: SPRING } : undefined}
      whileTap={safe ? { scale: 0.95, transition: SPRING } : undefined}
    >
      <Icon name="whatsapp" className="h-6 w-6 shrink-0" strokeWidth={1.5} />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 group-hover:max-w-[140px]">
        WhatsApp
      </span>
    </motion.a>
  );
}
