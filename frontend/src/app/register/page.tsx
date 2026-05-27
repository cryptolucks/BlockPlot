"use client";
import { useState } from "react";
export default function RegisterPage() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [location, setLocation] = useState("");
  const [area, setArea] = useState("");
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white p-8">
      <h1>Register Land</h1>
      <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" />
      <input type="number" value={area} onChange={(e) => setArea(e.target.value)} placeholder="Area size in m²" />
    </div>
  );
}
