"use client";
import { useState } from "react";
export default function RegisterPage() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  const handleConnectWallet = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setWalletConnected(true);
      setWalletAddress("SP2JDXP3F6A7H2E9X39Z1A78B45CD67EF89AB");
      setIsConnecting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white relative overflow-hidden font-sans">
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#F7931A]/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 blur-[180px] rounded-full pointer-events-none" />
      <h1 className="text-3xl font-extrabold m-8">Register Land Parcel</h1>
      <div className="m-8">
        <button onClick={handleConnectWallet} className="bg-[#F7931A] text-black px-4 py-2 font-bold rounded-lg">
          {walletConnected ? `Connected: ${walletAddress}` : "Connect Hiro Wallet"}
        </button>
      </div>
    </div>
  );
}
