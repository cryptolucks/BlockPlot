"use client";
import { useState } from "react";
export default function RegisterPage() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [location, setLocation] = useState("");
  const [area, setArea] = useState("");
  const [docHash, setDocHash] = useState("");
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white p-8">
      <h1>Register Land</h1>
      <div>Drag & drop deeds to upload to decentralized storage</div>
    </div>
  );
}
