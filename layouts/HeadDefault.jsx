import React from "react";
import { site } from "../lib/site.js";

// vike-react <head> içine eklenir (her sayfada).
export function HeadDefault() {
  return (
    <>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#FAF6F0" />
      <link rel="icon" href={site.favicon || "/favicon.svg"} type="image/svg+xml" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..600;1,9..144,400..500&family=Inter:wght@400;500;600;700&display=swap"
      />
    </>
  );
}
