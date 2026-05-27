"use client";
import { useState } from "react";
export default function RegisterPage() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [location, setLocation] = useState("");
  const [area, setArea] = useState("");
  const [docHash, setDocHash] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white p-8">
      <h1>Register Land</h1>
      {isUploading && <div className="w-full bg-white/10 rounded-full h-2" />}
    </div>
  );
}
