"use client";
import { useState } from "react";
export default function RegisterPage() {
  const [success, setSuccess] = useState(false);
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white p-8">
      <h1>Register Land</h1>
      {success && <div>Title Registered On-Chain!</div>}
    </div>
  );
}
