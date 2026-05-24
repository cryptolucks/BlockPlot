const steps = [
  {
    n: "01",
    title: "Connect Hiro Wallet",
    desc: "Authenticate with your Stacks wallet — your address becomes your identity on BlockPlot.",
  },
  {
    n: "02",
    title: "Register a Parcel",
    desc: "Call register-land with a location string and area. Your wallet address is stored as owner at the current block height.",
  },
  {
    n: "03",
    title: "Receive a Land ID",
    desc: "The contract returns a unique land-id. This is your permanent on-chain reference for the parcel.",
  },
  {
    n: "04",
    title: "Verify Ownership",
    desc: "Anyone can call verify-ownership(land-id, address) to confirm who owns a parcel — no trust required.",
  },
  {
    n: "05",
    title: "Transfer & History",
    desc: "Ownership transfers are recorded as Stacks transactions, creating an immutable audit trail.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 bg-brand-gray/40">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-white mb-4">
            How It Works
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            From wallet connection to on-chain registration in minutes.
          </p>
        </div>

        <div className="relative flex flex-col gap-0">
          {/* Vertical line */}
          <div className="absolute left-7 top-0 bottom-0 w-px bg-white/5 hidden sm:block" />

          {steps.map((s, i) => (
            <div key={s.n} className="flex gap-6 pb-10 last:pb-0">
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-brand-dark border border-brand-orange/40 flex items-center justify-center text-brand-orange font-bold text-sm z-10">
                {s.n}
              </div>
              <div className="pt-3">
                <h3 className="text-white font-semibold text-lg mb-1">
                  {s.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
