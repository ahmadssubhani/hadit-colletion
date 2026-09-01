"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const AUTH_PREFIXES = ["/signin", "/signup", "/auth"];

export function Chrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuth = AUTH_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));

  if (isAuth) {
    return <div className="app">{children}</div>;
  }

  return (
    <div className="app">
      <Header />
      <div className="main">{children}</div>
      <Footer />
    </div>
  );
}
