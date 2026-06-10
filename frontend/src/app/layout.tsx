import type { Metadata } from "next";
import "./globals.css";
import { WalletProvider } from "@/context/WalletContext";

export const metadata: Metadata = {
  title: "BlockPlot — Decentralized Land Registry on Stacks",
  description:
    "Secure, transparent, and tamper-proof property ownership powered by Clarity smart contracts on the Stacks blockchain.",
  openGraph: {
    title: "BlockPlot — Decentralized Land Registry on Stacks",
    description:
      "Tamper-proof property ownership on the Stacks blockchain, anchored to Bitcoin.",
    url: "https://blockplot.vercel.app",
    siteName: "BlockPlot",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BlockPlot — Decentralized Land Registry on Stacks",
    description:
      "Tamper-proof property ownership on the Stacks blockchain, anchored to Bitcoin.",
  },
  other: {
    "talentapp:project_verification":
      "88bcddd03a6b534cf8a671e436ca4c2b31540d6b7171386e87cfac15bffd33e70d610a742645432c01650d0c72e0e599cfdc4b7c7d0bb072f684e9f403491f3e",
  },
};

import FarcasterSDKLoader from "@/components/FarcasterSDKLoader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="talentapp:project_verification"
          content="88bcddd03a6b534cf8a671e436ca4c2b31540d6b7171386e87cfac15bffd33e70d610a742645432c01650d0c72e0e599cfdc4b7c7d0bb072f684e9f403491f3e"
        />
      </head>
      <body className="font-sans antialiased">
        <WalletProvider>
          <FarcasterSDKLoader />
          {children}
        </WalletProvider>
      </body>
    </html>
  );
}
