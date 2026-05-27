"use client";

import { useState } from "react";

const links = [
  { label: "Features", href: "/#features" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Tech Stack", href: "/#tech-stack" },
  { label: "FAQ", href: "/#faq" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-brand-dark/80 backdrop-blur border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="text-brand-orange">Block</span>
          <span className="text-white">Plot</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8 text-sm text-gray-400">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="hover:text-white transition-colors">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="/register"
          className="hidden md:inline-flex items-center gap-2 bg-brand-orange text-black text-sm font-semibold px-4 py-2 rounded-lg hover:bg-orange-400 transition-colors shadow-[0_0_15px_rgba(247,147,26,0.2)]"
        >
          Launch App
        </a>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-gray-400 hover:text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-brand-gray border-t border-white/5 px-6 py-4 flex flex-col gap-4 text-sm text-gray-300">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="hover:text-white transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="/register"
            className="mt-2 bg-brand-orange text-black font-semibold px-4 py-2 rounded-lg text-center"
            onClick={() => setOpen(false)}
          >
            Launch App
          </a>
        </div>
      )}
    </nav>
  );
}
