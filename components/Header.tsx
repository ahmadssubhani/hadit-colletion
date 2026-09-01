"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/search", label: "Hadiths" },
  { href: "/collections", label: "Collections" },
  { href: "/narrators", label: "Narrators" },
  { href: "/hadiths/knowledge", label: "Knowledge" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header className="topbar">
        <Link className="brand" href="/">
          <span className="mark">ر</span> Relegious
        </Link>
        <nav className="nav" aria-label="Primary">
          {LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={isActive(link.href) ? "active" : undefined}>
              {link.label}
            </Link>
          ))}
        </nav>
        <SearchBar compact />
        <button className="ghost menu" aria-label="Menu" type="button" onClick={() => setOpen((value) => !value)}>
          ☰
        </button>
      </header>
      <nav className={`mobile-nav${open ? " open" : ""}`} aria-label="Mobile">
        {LINKS.map((link) => (
          <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </Link>
        ))}
      </nav>
    </>
  );
}