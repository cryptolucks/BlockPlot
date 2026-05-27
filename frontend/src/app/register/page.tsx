"use client";
import { useState } from "react";
export default function RegisterPage() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [location, setLocation] = useState("");
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white p-8">
      <h1>Register Land</h1>
      <input 
        type="text" 
        value={location} 
        onChange={(e) => setLocation(e.target.value)} 
        placeholder="Enter land location address"
        className="bg-brand-gray border border-white/5 rounded-xl p-3 w-full"
      />
    </div>
  );
}
