"use client";

import { useState } from "react";
import { useWallet } from "@/context/WalletContext";

const links = [
  { label: "Features", href: "/#features" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Tech Stack", href: "/#tech-stack" },
  { label: "FAQ", href: "/#faq" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { isConnected, isConnecting, address, connect, disconnect } =
    useWallet();

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
        <div className="hidden md:flex items-center gap-4">
          <a
            href="/register"
            className="text-sm text-gray-400 hover:text-white transition-colors mr-2 font-medium"
          >
            Launch App
          </a>

          {isConnected ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 px-3 py-1.5 rounded-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-mono text-green-400">
                  {address.slice(0, 6)}...{address.slice(-4)}
                </span>
              </div>
              <button
                onClick={disconnect}
                className="text-xs text-gray-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/5"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button
              onClick={connect}
              disabled={isConnecting}
              className="inline-flex items-center gap-2 bg-brand-orange text-black text-sm font-semibold px-4 py-2 rounded-lg hover:bg-orange-400 transition-colors shadow-[0_0_15px_rgba(247,147,26,0.2)] disabled:opacity-50"
            >
              {isConnecting ? (
                <>
                  <svg
                    className="animate-spin h-3.5 w-3.5 text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Connecting...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                  </svg>
                  Connect Wallet
                </>
              )}
            </button>
          )}
        </div>

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
            onClick={() => setOpen(false)}
            className="text-center py-2 text-gray-400 hover:text-white transition-colors border-t border-white/5 pt-4"
          >
            Launch App
          </a>

          {isConnected ? (
            <div className="flex flex-col gap-2">
              <div className="bg-green-500/10 border border-green-500/20 px-3 py-2 rounded-lg flex items-center justify-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-mono text-green-400">
                  {address.slice(0, 8)}...{address.slice(-6)}
                </span>
              </div>
              <button
                onClick={() => {
                  disconnect();
                  setOpen(false);
                }}
                className="bg-white/5 hover:bg-white/10 text-white font-semibold px-4 py-2 rounded-lg text-center border border-white/5"
              >
                Disconnect Wallet
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                connect();
                setOpen(false);
              }}
              disabled={isConnecting}
              className="bg-brand-orange text-black font-semibold px-4 py-2 rounded-lg text-center disabled:opacity-50"
            >
              {isConnecting ? "Connecting..." : "Connect Wallet"}
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
