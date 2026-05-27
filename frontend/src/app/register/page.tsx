"use client";
import { useState } from "react";
export default function RegisterPage() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white p-8">
      <h1>Register Land</h1>
      <button disabled={isSubmitting}>Register on Stacks</button>
    </div>
  );
}
