const features = [
  {
    icon: "🔒",
    title: "Immutable Records",
    desc: "Land parcels registered on-chain can never be altered or deleted — every record is permanent.",
  },
  {
    icon: "🔍",
    title: "Public Verification",
    desc: "Anyone can verify ownership instantly via verify-ownership without trusting a central authority.",
  },
  {
    icon: "₿",
    title: "Bitcoin Security",
    desc: "Stacks settles on Bitcoin, giving your land records the security of the world's most secure blockchain.",
  },
  {
    icon: "🪪",
    title: "Wallet Identity",
    desc: "Ownership is tied to your Hiro Wallet address — no usernames, no passwords, no middlemen.",
  },
  {
    icon: "📄",
    title: "IPFS Documents",
    desc: "Supporting land documents are stored on IPFS and linked to on-chain records for full auditability.",
  },
  {
    icon: "⚡",
    title: "Instant Validation",
    desc: "Property validation that used to take weeks now happens in seconds with a single contract call.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-white mb-4">
            Why BlockPlot?
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Traditional land registries are slow, opaque, and prone to fraud.
            BlockPlot fixes this with decentralized, verifiable records.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-brand-gray border border-white/5 rounded-2xl p-6 hover:border-brand-orange/30 transition-colors"
            >
              <span className="text-3xl">{f.icon}</span>
              <h3 className="text-white font-semibold text-lg mt-4 mb-2">
                {f.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
