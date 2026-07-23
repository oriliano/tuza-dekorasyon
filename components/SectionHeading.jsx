import React from "react";
import { Reveal } from "./Reveal.jsx";

export function SectionHeading({ eyebrow, title, text, align = "left", light = false }) {
  const center = align === "center";
  return (
    <Reveal className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <span className={`eyebrow ${light ? "text-clay-soft" : ""}`}>
          <span className="h-px w-6 bg-current" />
          {eyebrow}
        </span>
      )}
      <h2
        className={`mt-4 text-balance text-3xl font-semibold leading-[1.15] sm:text-[2.6rem] ${
          light ? "text-cream" : "text-espresso"
        }`}
      >
        {title}
      </h2>
      {text && (
        <p className={`mt-4 text-lg leading-relaxed ${light ? "text-cream/70" : "text-espresso-soft"}`}>
          {text}
        </p>
      )}
    </Reveal>
  );
}
