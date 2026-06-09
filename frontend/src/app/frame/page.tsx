import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BlockPlot Land Registry Frame",
  description: "Verify land ownership directly on Farcaster.",
  other: {
    "fc:frame": "vNext",
    "fc:frame:image": "https://blockplot.vercel.app/og-image.png",
    "fc:frame:input:text": "Enter Land ID (e.g. 1)",
    "fc:frame:button:1": "Verify Land 🔍",
    "fc:frame:button:2": "Go to Web App 🌐",
    "fc:frame:button:2:action": "link",
    "fc:frame:button:2:target": "https://blockplot.vercel.app",
    "fc:frame:post_url": "https://blockplot.vercel.app/api/frame",
  },
};

export default function FramePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
      <div className="max-w-md w-full bg-brand-gray border border-white/5 rounded-2xl p-8 text-center">
        <h1 className="text-2xl font-extrabold text-brand-orange mb-4">BlockPlot Farcaster Frame</h1>
        <p className="text-gray-400 text-sm mb-6">
          This page serves metadata for the BlockPlot Farcaster Frame. Share this URL on Farcaster to let users verify land records directly in their feeds.
        </p>
        <a
          href="/"
          className="inline-block bg-brand-orange hover:bg-brand-orange/80 text-black font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          Go to main site
        </a>
      </div>
    </div>
  );
}
