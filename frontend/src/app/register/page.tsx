"use client";
import { useState } from "react";
export default function RegisterPage() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [docHash, setDocHash] = useState("");
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white p-8">
      <h1>Register Land</h1>
      <div>IPFS Hash: {docHash}</div>
    </div>
  );
}
