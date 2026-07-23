import React from "react";
import "./style.css";
import { Header } from "../components/Header.jsx";
import { Footer } from "../components/Footer.jsx";
import { FloatingContact } from "../components/FloatingContact.jsx";

export function LayoutDefault({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <Header />
      <main className="flex-1 pt-[72px]">{children}</main>
      <Footer />
      <FloatingContact />
    </div>
  );
}
