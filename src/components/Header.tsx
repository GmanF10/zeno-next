"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Main nav (left/center)
const mainLinks = [
  { href: "/", label: "HOME" },
  { href: "/about", label: "ABOUT" },
  { href: "/dashboard", label: "DASHBOARD" },
];

// Auth nav (far right)
const authLinks = [
  { href: "/login", label: "LOGIN" },
  { href: "/register", label: "SIGN UP" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 w-full h-[80px] flex items-center bg-black/85 z-50 px-6">
      <div className="flex items-center w-full max-w-7xl mx-auto">
        {/* Logo */}
        <Link
          href="/"
          className="neon-header neon-glow text-3xl tracking-[.2em] font-extrabold uppercase select-none mr-8"
        >
          ZENØ
        </Link>

        {/* Main Nav */}
        <nav aria-label="Main navigation" className="flex gap-4">
          {mainLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`
                neon-glow font-bold tracking-wide uppercase px-4 py-2 text-lg
                ${pathname === href ? "text-[#39ff14]" : "text-[#ededed]"}
                hover:text-[#39ff14] transition
              `}
              aria-current={pathname === href ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Spacer pushes auth links right */}
        <div className="flex-1" />

        {/* Auth Nav */}
        <nav aria-label="Auth navigation" className="flex gap-4">
          {authLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`
                neon-btn neon-glow uppercase font-bold tracking-wide px-8 py-2 text-lg
                ${pathname === href ? "bg-[#39ff14] text-black" : ""}
              `}
              aria-current={pathname === href ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
