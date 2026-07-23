import React from "react";

// JSON-LD structured data enjekte eder. Sayfa gövdesinde de geçerlidir.
export function JsonLd({ data }) {
  if (!data) return null;
  const arr = Array.isArray(data) ? data : [data];
  return (
    <>
      {arr.map((d, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }}
        />
      ))}
    </>
  );
}
