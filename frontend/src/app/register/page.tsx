"use client";

import { useState, useEffect } from "react";

// Mock recent registrations
const INITIAL_PARCELS = [
  { id: 103, location: "742 Evergreen Terrace, Springfield", area: 450, hash: "QmP5Z1J6Yq7pXwGdB38oM2hT5z9uVq5R4yW1o7X8zK9pL2", owner: "SP2JDXP3F6A7H2E9X39Z1A78B45CD67EF89AB", height: 84321 },
  { id: 102, location: "221B Baker Street, London", area: 180, hash: "QmR8k4G5pY2zW8oD37mS5tK6uP7qV9zF3wX1o2y8rK4pT5", owner: "SP1A78CD56EF34AB89EF0123CD45EF67AB89CD", height: 84319 },
  { id: 101, location: "1600 Pennsylvania Avenue, Washington DC", area: 1500, hash: "QmT6w5Y8pT2zW7oF37mS4tK5uP6qV8zD3wX2o1y7rK3pT4", owner: "SP3EF0123CD45EF67AB89CD0123EF45AB67CD89", height: 84315 },
];

export default function RegisterPage() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  
  // Form states
  const [location, setLocation] = useState("");
  const [area, setArea] = useState("");
  const [docHash, setDocHash] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  // Submit states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [registeredId, setRegisteredId] = useState<number | null>(null);
  const [txHash, setTxHash] = useState("");
  
  // Simulated Ledger
  const [parcels, setParcels] = useState(INITIAL_PARCELS);
  
  // Real-time network sync simulation
  const [blockHeight, setBlockHeight] = useState(84322);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setBlockHeight(prev => prev + 1);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  // Connect Wallet Simulation
  const handleConnectWallet = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setWalletConnected(true);
      setWalletAddress("SP2JDXP3F6A7H2E9X39Z1A78B45CD67EF89AB");
      setIsConnecting(false);
    }, 1200);
  };

  const handleDisconnectWallet = () => {
    setWalletConnected(false);
    setWalletAddress("");
  };

  // Upload Simulation
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          const randomHash = "Qm" + Array.from({ length: 44 }, () => 
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
            [Math.floor(Math.random() * 62)]
          ).join("");
          setDocHash(randomHash);
          return 100;
        }
        return prev + 10;
      });
    }, 100);
  };

  // Submit Simulation
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!location || !area || !docHash || !walletConnected) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newId = parcels.length > 0 ? parcels[0].id + 1 : 101;
      const newParcel = {
        id: newId,
        location,
        area: Number(area),
        hash: docHash,
        owner: walletAddress,
        height: blockHeight + 1,
      };

      setParcels([newParcel, ...parcels]);
      setRegisteredId(newId);
      setTxHash("0x" + Array.from({ length: 64 }, () => 
        "0123456789abcdef"[Math.floor(Math.random() * 16)]
      ).join(""));
      setSuccess(true);
      setIsSubmitting(false);
      
      // Clear form
      setLocation("");
      setArea("");
      setDocHash("");
    }, 2000);
  };

  // Grid Coordinate Simulation
  const gridWidth = area ? Math.min(Math.max(Number(area) / 10, 20), 100) : 0;
  const gridHeight = area ? Math.min(Math.max(Number(area) / 15, 20), 100) : 0;

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white relative overflow-hidden font-sans">
      {/* Background ambient glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#F7931A]/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 blur-[180px] rounded-full pointer-events-none" />

      {/* Top Navbar */}
      <header className="border-b border-white/5 bg-[#0D0D0D]/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 font-bold text-lg hover:opacity-80 transition-opacity">
            <span className="text-[#F7931A]">Block</span>
            <span>Plot</span>
          </a>
          <a
            href="/"
            className="text-sm text-gray-400 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </a>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-6 py-12 relative z-10">
        <div className="mb-10">
          <span className="text-xs font-semibold tracking-wider text-[#F7931A] uppercase bg-[#F7931A]/10 px-3 py-1 rounded-full border border-[#F7931A]/20">
            Smart Contract Registry
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold mt-3 tracking-tight">
            Register Land Parcel
          </h1>
          <p className="text-gray-400 text-sm md:text-base mt-2 max-w-2xl">
            Secure, transparent, and tamper-proof property title registration on the Stacks blockchain.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form & Connect (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Wallet Card */}
            <div className="bg-[#1A1A1A]/40 backdrop-blur border border-white/5 rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#F7931A]/5 blur-2xl rounded-full pointer-events-none" />
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-300">Hiro Wallet Connection</h3>
                  <p className="text-xs text-gray-400 mt-1">
                    Connect your Stacks wallet to authenticate and sign the land registration.
                  </p>
                </div>
                {walletConnected ? (
                  <div className="flex items-center gap-2">
                    <div className="bg-green-500/10 border border-green-500/20 px-3 py-1.5 rounded-lg flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-xs font-mono text-green-400">
                        {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                      </span>
                    </div>
                    <button
                      onClick={handleDisconnectWallet}
                      className="text-xs text-gray-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/5"
                    >
                      Disconnect
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleConnectWallet}
                    disabled={isConnecting}
                    className="bg-[#F7931A] hover:bg-orange-400 text-black text-xs font-bold px-4 py-2.5 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(247,147,26,0.3)] hover:shadow-[0_0_20px_rgba(247,147,26,0.5)]"
                  >
                    {isConnecting ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-black" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Connecting...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                        </svg>
                        Connect Hiro Wallet
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Registration Form Card */}
            <div className={`bg-[#1A1A1A]/40 backdrop-blur border border-white/5 rounded-2xl p-6 lg:p-8 shadow-xl relative transition-all duration-300 ${!walletConnected ? 'opacity-50 pointer-events-none select-none filter blur-[1px]' : ''}`}>
              <h2 className="text-lg font-bold mb-6 text-gray-200">Parcel Registration Details</h2>
              <form onSubmit={handleRegister} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    Land Location / Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      required
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. 742 Evergreen Terrace, Springfield"
                      className="bg-[#0D0D0D]/60 border border-white/5 focus:border-[#F7931A]/40 rounded-xl w-full pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                      Land Area
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        required
                        min="1"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        placeholder="e.g. 500"
                        className="bg-[#0D0D0D]/60 border border-white/5 focus:border-[#F7931A]/40 rounded-xl w-full px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none transition-colors"
                      />
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-xs font-bold text-gray-500">
                        m²
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                      Title Document CID (IPFS)
                    </label>
                    <input
                      type="text"
                      required
                      readOnly
                      value={docHash}
                      placeholder="Upload land deed below..."
                      className="bg-[#0D0D0D]/30 border border-white/5 rounded-xl w-full px-4 py-3 text-sm text-gray-400 focus:outline-none cursor-not-allowed font-mono"
                    />
                  </div>
                </div>

                {/* Upload Zone */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    Deed / Title Upload (IPFS Simulator)
                  </label>
                  <div className="border border-dashed border-white/10 hover:border-[#F7931A]/30 rounded-xl p-6 text-center cursor-pointer transition-colors relative bg-[#0D0D0D]/20 group">
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      disabled={isUploading}
                    />
                    {isUploading ? (
                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-xs font-semibold text-gray-400">
                          <span>Hashing Deed and Uploading to IPFS...</span>
                          <span className="text-[#F7931A]">{uploadProgress}%</span>
                        </div>
                        <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-[#F7931A] h-full rounded-full transition-all duration-150"
                            style={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                      </div>
                    ) : docHash ? (
                      <div className="flex flex-col items-center justify-center gap-2 text-green-400">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-xs font-bold">Deed Cryptographically Sealed on IPFS</span>
                        <span className="text-[10px] text-gray-500 font-mono break-all max-w-md">
                          CID: {docHash}
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-2">
                        <svg className="w-8 h-8 text-gray-500 group-hover:text-[#F7931A] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <span className="text-xs font-semibold text-gray-300 group-hover:text-white transition-colors">
                          Drag & drop or click to upload land title document
                        </span>
                        <span className="text-[10px] text-gray-500">
                          PDF, PNG, JPG up to 10MB (Generates automatic secure IPFS Hash)
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Estimate Cost */}
                <div className="bg-[#0D0D0D]/40 border border-white/5 rounded-xl p-4 text-xs space-y-2">
                  <div className="flex justify-between text-gray-400">
                    <span>Simulated Gas Limit</span>
                    <span className="font-mono">15,430 uSTX</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Clarity Contract Fee</span>
                    <span className="font-mono">0.0076 STX</span>
                  </div>
                  <hr className="border-white/5" />
                  <div className="flex justify-between font-bold text-gray-200">
                    <span>Estimated Cost</span>
                    <span className="text-[#F7931A] font-mono">0.0076 STX</span>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting || !location || !area || !docHash}
                  className="w-full bg-gradient-to-r from-[#F7931A] to-orange-500 hover:from-orange-400 hover:to-orange-600 text-black text-sm font-bold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_20px_rgba(247,147,26,0.2)]"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-black" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Broadcasting Registry Tx to Stacks...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      Submit Registration on Stacks
                    </>
                  )}
                </button>
              </form>
            </div>
            
            {/* Info Message if wallet not connected */}
            {!walletConnected && (
              <div className="bg-brand-orange/5 border border-brand-orange/15 rounded-xl p-4 flex gap-3 text-xs text-[#F7931A]">
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <span className="font-bold">Authenticity Gated:</span> You must connect your Hiro Stacks Wallet before you can register a land parcel. This ensures property registers are cryptographically bound to Stacks principals.
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Visualizer & Ledger (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Visualizer Card */}
            <div className="bg-[#1A1A1A]/40 backdrop-blur border border-white/5 rounded-2xl p-6 shadow-xl">
              <h2 className="text-base font-bold mb-4 text-gray-200">Parcel Grid Visualizer</h2>
              <div className="bg-[#0D0D0D]/60 aspect-square rounded-xl border border-white/5 relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(#FFF 1px, transparent 1px)", backgroundSize: "16px 16px" }} />
                
                {area ? (
                  <div
                    className="bg-[#F7931A]/15 border-2 border-[#F7931A] rounded-lg relative flex items-center justify-center text-center p-3 animate-pulse shadow-[0_0_20px_rgba(247,147,26,0.15)]"
                    style={{
                      width: `${gridWidth}%`,
                      height: `${gridHeight}%`,
                      transition: "width 0.3s ease, height 0.3s ease"
                    }}
                  >
                    <div className="space-y-1 select-none">
                      <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider">GlowBlock</span>
                      <span className="block text-sm font-extrabold text-white">{area} m²</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-6 text-gray-500">
                    <svg className="w-10 h-10 mx-auto opacity-30 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 01.553-.894L9 2m0 18l6 3m-6-3V2m6 21l5.447-2.724A1 1 0 0021 19.382V8.618a1 1 0 00-.553-.894L15 4m0 19V4m0 0L9 2" />
                    </svg>
                    <p className="text-xs">Provide a Land Area to plot the visual block on the virtual coordinate grid.</p>
                  </div>
                )}
                
                {location && (
                  <div className="absolute bottom-3 left-3 bg-[#0D0D0D]/90 border border-white/5 px-2.5 py-1 rounded-md text-[10px] font-mono text-[#F7931A] select-none max-w-[90%] truncate">
                    📍 {location}
                  </div>
                )}
              </div>
            </div>

            {/* Sync Status Banner */}
            <div className="bg-[#1A1A1A]/40 border border-white/5 rounded-2xl px-5 py-4 shadow-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F7931A] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F7931A]"></span>
                </span>
                <div>
                  <span className="text-xs font-semibold text-gray-300">Syncing Stacks Mainnet</span>
                  <span className="block text-[9px] text-gray-500 font-mono">Consensus Protocol: Nakamoto Run</span>
                </div>
              </div>
              <span className="text-xs font-mono text-gray-400 bg-[#0D0D0D] px-2.5 py-1 rounded-lg border border-white/5">
                Block #{blockHeight}
              </span>
            </div>

            {/* Recent Registrations Ledger */}
            <div className="bg-[#1A1A1A]/40 backdrop-blur border border-white/5 rounded-2xl p-6 shadow-xl">
              <h2 className="text-sm font-bold mb-4 text-gray-200">On-Chain Land Ledger</h2>
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                {parcels.map((parcel) => (
                  <div key={parcel.id} className="bg-[#0D0D0D]/40 border border-white/5 rounded-xl p-3.5 hover:border-white/10 transition-colors space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-extrabold text-[#F7931A]">Parcel #{parcel.id}</span>
                      <span className="text-[10px] text-gray-500 font-mono">Block {parcel.height}</span>
                    </div>
                    <p className="text-xs text-gray-300 truncate font-semibold">📍 {parcel.location}</p>
                    <div className="flex justify-between items-center text-[10px] text-gray-500">
                      <span>Area: <strong className="text-gray-300">{parcel.area} m²</strong></span>
                      <span className="font-mono">Owner: {parcel.owner.slice(0, 6)}...{parcel.owner.slice(-4)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Success Modal */}
      {success && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl relative overflow-hidden animate-scale-up">
            <div className="absolute top-[-20%] left-[-20%] w-48 h-48 bg-green-500/10 blur-3xl rounded-full" />
            
            <div className="text-center space-y-4 relative z-10">
              <div className="w-16 h-16 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto text-green-400 animate-bounce">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              
              <h3 className="text-xl font-extrabold text-white">Title Registered On-Chain!</h3>
              <p className="text-xs text-gray-400">
                Land parcel has been successfully written to the <strong>BlockPlot Decentralized Land Registry</strong>.
              </p>
              
              <div className="bg-[#0D0D0D]/80 rounded-xl p-4 text-left text-xs space-y-2 font-mono border border-white/5">
                <div className="flex justify-between text-gray-500">
                  <span>Parcel ID:</span>
                  <span className="text-[#F7931A] font-bold">#{registeredId}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Gas Consumed:</span>
                  <span>14,102 uSTX</span>
                </div>
                <div className="space-y-1">
                  <span className="block text-gray-500">Transaction Hash:</span>
                  <span className="block text-[10px] text-gray-400 break-all select-all hover:text-white transition-colors">{txHash}</span>
                </div>
              </div>
              
              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <a
                  href={`https://explorer.hiro.so/txid/${txHash}?chain=mainnet`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 bg-white/5 hover:bg-white/10 text-white text-xs font-bold py-2.5 rounded-lg border border-white/5 transition-colors flex items-center justify-center gap-1.5"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Explorer Link
                </a>
                <button
                  onClick={() => setSuccess(false)}
                  className="flex-1 bg-[#F7931A] hover:bg-orange-400 text-black text-xs font-bold py-2.5 rounded-lg transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
