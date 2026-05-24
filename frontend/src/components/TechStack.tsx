const stack = [
  { name: "Clarity", role: "Smart Contracts", color: "text-purple-400" },
  { name: "Stacks", role: "Layer 2 Blockchain", color: "text-blue-400" },
  { name: "Bitcoin", role: "Settlement Layer", color: "text-brand-orange" },
  { name: "Next.js", role: "Frontend Framework", color: "text-white" },
  { name: "Hiro Wallet", role: "Wallet Integration", color: "text-green-400" },
  { name: "IPFS", role: "Document Storage", color: "text-teal-400" },
  { name: "Tailwind CSS", role: "Styling", color: "text-sky-400" },
  { name: "Clarinet", role: "Dev Tooling", color: "text-yellow-400" },
];

export default function TechStack() {
  return (
    <section id="tech-stack" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-white mb-4">
            Tech Stack
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Built with battle-tested tools on the most secure blockchain
            infrastructure available.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stack.map((t) => (
            <div
              key={t.name}
              className="bg-brand-gray border border-white/5 rounded-xl p-5 text-center hover:border-white/10 transition-colors"
            >
              <p className={`font-bold text-lg ${t.color}`}>{t.name}</p>
              <p className="text-gray-500 text-xs mt-1">{t.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
