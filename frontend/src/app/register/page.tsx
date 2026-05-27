"use client";
import { useState } from "react";
export default function RegisterPage() {
  const [blockHeight, setBlockHeight] = useState(84322);
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white p-8">
      <h1>Register Land</h1>
      <div>Stacks Block Height: #{blockHeight}</div>
    </div>
  );
}
