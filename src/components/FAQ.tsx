"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What blockchain does BlockPlot use?",
    a: "BlockPlot is built on Stacks, a Bitcoin Layer 2 blockchain. All land records are settled on Bitcoin, giving them the highest level of security available.",
  },
  {
    q: "What wallet do I need?",
    a: "You need the Hiro Wallet (formerly Stacks Wallet) to interact with BlockPlot. It's available as a browser extension and mobile app.",
  },
  {
    q: "Can I verify ownership without a wallet?",
    a: "Yes. verify-ownership is a read-only function — anyone can query it without connecting a wallet or paying any fees.",
  },
  {
    q: "What language are the smart contracts written in?",
    a: "BlockPlot uses Clarity, the native smart contract language for Stacks. Clarity is decidable and interpreted directly on-chain, making contracts fully auditable.",
  },
  {
    q: "Is the contract open source?",
    a: "Yes. The full contract source is available in the contracts/ directory of the BlockPlot GitHub repository.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 px-6 bg-brand-gray/40">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-white mb-4">FAQ</h2>
          <p className="text-gray-400">Common questions about BlockPlot.</p>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((f, i) => (
            <div
              key={i}
              className="bg-brand-gray border border-white/5 rounded-xl overflow-hidden"
            >
              <button
                className="w-full text-left px-6 py-4 flex items-center justify-between text-white font-medium hover:bg-white/5 transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span>{f.q}</span>
                <span className="text-brand-orange ml-4 flex-shrink-0">
                  {open === i ? "−" : "+"}
                </span>
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
