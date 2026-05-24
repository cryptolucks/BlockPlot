import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BlockPlot — Decentralized Land Registry on Stacks",
  description:
    "Secure, transparent, and tamper-proof property ownership powered by Clarity smart contracts on the Stacks blockchain.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
// open graph meta added via metadata export above
