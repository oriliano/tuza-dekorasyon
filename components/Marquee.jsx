import React, { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { useMotionSafe } from "./motion.jsx";

/**
 * Sonsuz kayan şerit — 21st.dev "Marquee Effect" (@bundui) temel alınarak
 * uyarlandı: TypeScript ve @motionone/utils bağımlılığı kaldırıldı (wrap
 * inline yazıldı), markanın sakin diline uygun sıcak toprak tonlarına çekildi.
 *
 * Scroll hızı şeridin hızını etkiler — hareket sayfayla ilişkili olduğu için
 * dekoratif değil, bağlamsal kalır. prefers-reduced-motion açıkken şerit durur.
 */

// (v - min) aralığını [min, max) içine sarar.
function wrap(min, max, v) {
  const range = max - min;
  return (((v - min) % range) + range) % range + min;
}

export function Marquee({ items = [], baseVelocity = 2, className = "" }) {
  const safe = useMotionSafe();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  // Scroll hızı şeridi en fazla ~3 katına çıkarır; yön değiştirmez.
  const velocityFactor = useTransform(smoothVelocity, [-1500, 0, 1500], [2, 0, 2], {
    clamp: true,
  });

  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (!safe) return;
    const boost = 1 + velocityFactor.get();
    baseX.set(baseX.get() - baseVelocity * boost * (delta / 1000));
  });

  if (!items.length) return null;

  const Row = ({ ariaHidden }) => (
    <span className="flex shrink-0 items-center" aria-hidden={ariaHidden || undefined}>
      {items.map((item, i) => (
        <span key={i} className="flex items-center">
          <span className="px-6 sm:px-9">{item}</span>
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-clay/50" />
        </span>
      ))}
    </span>
  );

  return (
    <div
      className={`relative flex overflow-hidden ${className}`}
      style={{
        // Kenarlarda yumuşak geçiş — şerit kesilmiş gibi durmaz.
        maskImage:
          "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
      }}
    >
      <motion.div
        className="flex flex-nowrap whitespace-nowrap font-serif text-lg text-espresso-soft sm:text-xl"
        style={safe ? { x } : undefined}
      >
        <Row />
        <Row ariaHidden />
        <Row ariaHidden />
        <Row ariaHidden />
      </motion.div>
    </div>
  );
}
