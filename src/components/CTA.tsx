export default function CTA() {
  return (
    <section id="get-started" className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <div className="bg-gradient-to-br from-brand-orange/10 to-transparent border border-brand-orange/20 rounded-3xl p-12">
          <h2 className="text-4xl font-extrabold text-white mb-4">
            Ready to register your land on-chain?
          </h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            Connect your Hiro Wallet and register your first land parcel on the
            Stacks blockchain in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wallet.hiro.so"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-orange text-black font-bold px-8 py-3.5 rounded-xl hover:bg-orange-400 transition-colors"
            >
              Get Hiro Wallet
            </a>
            <a
              href="https://github.com/cryptolucks/BlockPlot"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/10 text-white font-medium px-8 py-3.5 rounded-xl hover:bg-white/5 transition-colors"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
