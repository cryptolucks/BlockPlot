export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-1 font-bold text-base">
          <span className="text-brand-orange">Block</span>
          <span className="text-white">Plot</span>
        </div>

        <p>Built on Stacks · Secured by Bitcoin</p>

        <div className="flex items-center gap-6">
          <a
            href="https://github.com/cryptolucks/BlockPlot"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://docs.stacks.co"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Stacks Docs
          </a>
          <a
            href="https://wallet.hiro.so"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Hiro Wallet
          </a>
        </div>
      </div>
    </footer>
  );
}
