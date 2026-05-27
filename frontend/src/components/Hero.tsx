export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-16 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-orange/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <span className="inline-flex items-center gap-2 text-xs font-medium bg-brand-orange/10 text-brand-orange border border-brand-orange/20 px-3 py-1 rounded-full mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
          Built on Stacks · Secured by Bitcoin
        </span>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight mb-6">
          Land Registry,{" "}
          <span className="text-brand-orange">On-Chain.</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
          BlockPlot replaces paper-based land records with tamper-proof,
          publicly verifiable ownership on the Stacks blockchain — anchored to
          Bitcoin.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/register"
            className="w-full sm:w-auto bg-brand-orange text-black font-bold px-8 py-3.5 rounded-xl hover:bg-orange-400 transition-colors text-base shadow-[0_0_15px_rgba(247,147,26,0.2)]"
          >
            Register Land
          </a>
          <a
            href="#how-it-works"
            className="w-full sm:w-auto border border-white/10 text-white font-medium px-8 py-3.5 rounded-xl hover:bg-white/5 transition-colors text-base"
          >
            How It Works
          </a>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-3 gap-6 max-w-lg mx-auto">
          {[
            { value: "100%", label: "On-Chain" },
            { value: "0", label: "Forgeries" },
            { value: "BTC", label: "Secured" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-extrabold text-brand-orange">{s.value}</p>
              <p className="text-sm text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
