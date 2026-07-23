import React from "react";
import { Icon } from "./Icon.jsx";

// Gerçek görsel yoksa: sıcak degrade + ince desen + hizmet ikonu.
// image verilirse <img> gösterir.
const gradients = [
  "from-[#E7DACB] to-[#D8C6B0]",
  "from-[#F2EADE] to-[#E7DACB]",
  "from-[#E9D3C0] to-[#D8B79A]",
  "from-[#EADFD2] to-[#DCC7AE]",
];

export function Placeholder({ image, icon = "sparkle", label, seed = 0, className = "", ratio = "aspect-[4/3]" }) {
  if (image) {
    return (
      <div className={`relative overflow-hidden ${ratio} ${className}`}>
        <img
          src={image}
          alt={label || ""}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 will-change-transform group-hover:scale-105"
        />
      </div>
    );
  }
  const g = gradients[seed % gradients.length];
  return (
    <div
      className={`relative flex ${ratio} items-center justify-center overflow-hidden bg-gradient-to-br ${g} ${className}`}
      aria-hidden="true"
    >
      {/* ince ızgara deseni */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(154,52,18,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(154,52,18,0.06) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-clay/10 blur-2xl" />
      <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-white/70 text-clay shadow-card backdrop-blur-sm transition-transform duration-500 group-hover:scale-110">
        <Icon name={icon} className="h-8 w-8" strokeWidth={1.4} />
      </div>
    </div>
  );
}
