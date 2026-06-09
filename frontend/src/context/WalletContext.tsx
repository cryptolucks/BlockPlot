"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

// ─── Types ───────────────────────────────────────────────────────────

interface WalletState {
  isConnected: boolean;
  isConnecting: boolean;
  address: string;
  connect: () => void;
  disconnect: () => void;
}

const DEFAULT_STATE: WalletState = {
  isConnected: false,
  isConnecting: false,
  address: "",
  connect: () => {},
  disconnect: () => {},
};

const WalletContext = createContext<WalletState>(DEFAULT_STATE);

// ─── Provider ────────────────────────────────────────────────────────

export function WalletProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [address, setAddress] = useState("");

  // Hydrate state from @stacks/connect local storage on mount
  useEffect(() => {
    async function checkConnection() {
      try {
        const mod = await import("@stacks/connect");
        if (mod.isConnected()) {
          const userData = mod.getLocalStorage();
          const stxAddr = (userData as any)?.addresses?.stx?.[0]?.address ?? "";
          if (stxAddr) {
            setIsConnected(true);
            setAddress(stxAddr);
          }
        }
      } catch {
        // @stacks/connect may fail during SSR or if no wallet was ever connected
      }
    }
    checkConnection();
  }, []);

  // Connect wallet via @stacks/connect v8
  const connectWallet = useCallback(async () => {
    setIsConnecting(true);
    try {
      const { connect: stacksConnect } = await import("@stacks/connect");
      const response = await stacksConnect();

      // Extract the mainnet STX address from the response
      const stxAddr = (response as any)?.addresses?.stx?.[0]?.address ?? "";
      if (stxAddr) {
        setAddress(stxAddr);
        setIsConnected(true);
      }
    } catch (err) {
      console.error("Wallet connection failed:", err);
    } finally {
      setIsConnecting(false);
    }
  }, []);

  // Disconnect wallet
  const disconnectWallet = useCallback(async () => {
    try {
      const { disconnect: stacksDisconnect } = await import(
        "@stacks/connect"
      );
      stacksDisconnect();
    } catch {
      // ignore — best-effort cleanup
    }
    setIsConnected(false);
    setAddress("");
  }, []);

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        isConnecting,
        address,
        connect: connectWallet,
        disconnect: disconnectWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

// ─── Hook ────────────────────────────────────────────────────────────

export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) {
    throw new Error("useWallet must be used within a <WalletProvider>");
  }
  return ctx;
}
