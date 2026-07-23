import React from "react";

// Hafif, stroke tabanlı SVG ikon seti. currentColor kullanır.
const paths = {
  // Hizmet ikonları
  paint: (
    <>
      <path d="M4 5h12v5H4z" />
      <path d="M16 7h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-6" />
      <path d="M11 12v3.5a1.5 1.5 0 0 1-1.5 1.5A1.5 1.5 0 0 1 8 15.5V13" />
      <path d="M9 17v4" />
    </>
  ),
  insulation: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="1" />
      <path d="M4 9h16M4 14h16M9 4v16M14 4v16" />
    </>
  ),
  plaster: (
    <>
      <path d="M3 16l10-10 3 3-10 10H3z" />
      <path d="M13 6l2-2a1.5 1.5 0 0 1 2 0l1 1a1.5 1.5 0 0 1 0 2l-2 2" />
      <path d="M14 20h7" />
    </>
  ),
  drywall: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="1" />
      <path d="M4 9h16M12 9v12M4 15h8" />
    </>
  ),
  ceiling: (
    <>
      <path d="M3 4h18" />
      <path d="M5 4v3h14V4" />
      <path d="M8 7v2M12 7v3M16 7v2" />
      <circle cx="12" cy="15" r="1" />
      <path d="M12 16v4" />
    </>
  ),
  wallpaper: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="1" />
      <path d="M8 7h.01M14 7h.01M11 11h.01M17 11h.01M8 15h.01M14 15h.01" />
    </>
  ),
  parquet: (
    <>
      <rect x="3" y="4" width="8" height="6" rx="0.5" />
      <rect x="13" y="4" width="8" height="6" rx="0.5" />
      <rect x="3" y="14" width="8" height="6" rx="0.5" />
      <rect x="13" y="14" width="8" height="6" rx="0.5" />
    </>
  ),
  turnkey: (
    <>
      <circle cx="8" cy="8" r="4" />
      <path d="M11 11l7 7M16 16l2-2 2 2-2 2zM8 8h.01" />
    </>
  ),
  // UI ikonları
  phone: <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v3a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z" />,
  whatsapp: (
    <>
      <path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3z" />
      <path d="M8.5 8.5c0 4 3 7 6.5 7 .6 0 1.2-.6 1.2-1.2 0-.3-.2-.6-.5-.8l-1.5-.7-1 1c-1.2-.5-2.3-1.6-2.8-2.8l1-1-.7-1.5c-.2-.3-.5-.5-.8-.5-.6 0-1.1.6-1.1 1.2z" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  location: (
    <>
      <path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  check: <path d="M20 6 9 17l-5-5" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowUpRight: <path d="M7 17 17 7M8 7h9v9" />,
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="3.5" />
      <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  star: <path d="m12 3 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.6l1-5.8L3.5 9.7l5.9-.9z" />,
  shield: (
    <>
      <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  sparkle: <path d="M12 3v6m0 6v6m9-9h-6m-6 0H3m13.5-6.5-4 4m-3 3-4 4m0-11 4 4m3 3 4 4" />,
};

export function Icon({ name, className = "h-6 w-6", strokeWidth = 1.6, ...rest }) {
  const body = paths[name];
  if (!body) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...rest}
    >
      {body}
    </svg>
  );
}
