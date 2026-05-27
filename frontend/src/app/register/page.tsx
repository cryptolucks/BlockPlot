"use client";
import { useState } from "react";
export default function RegisterPage() {
  const [area, setArea] = useState("");
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white p-8">
      <h1>Register Land</h1>
      <div>Grid visualizer: area = {area}</div>
    </div>
  );
}
