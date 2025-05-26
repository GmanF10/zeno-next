"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/login", label: "Login" },
  { href: "/register", label: "Sign Up" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 w-full h-[100px] flex items-center px-4 sm:px-8 bg-black/50 backdrop-blur z-50">
      <div className="flex flex-col sm:flex-row justify-between items-center w-full max-w-5xl mx-auto gap-2 sm:gap-0">
        <h1 className="text-4xl font-orbitron font-bold text-[#39ff14] tracking-wider drop-shadow-neon">
          ZENØ
        </h1>
        <nav aria-label="Main navigation">
          <ul className="flex flex-col sm:flex-row gap-3 sm:gap-6 mt-2 sm:mt-0">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`border-2 border-[#65ec4d] rounded-lg px-6 py-2 font-bold
                    ${pathname === href ? "bg-[#65ec4d] text-black" : "text-[#39ff14]"}
                    hover:bg-[#65ec4d] hover:text-black transition`}
                  aria-current={pathname === href ? "page" : undefined}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
