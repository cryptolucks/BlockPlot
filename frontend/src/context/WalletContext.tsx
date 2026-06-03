"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { showConnect } from "@stacks/connect";
import { APP_NAME, APP_ICON } from "@/lib/constants";

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

// ─── Storage keys ────────────────────────────────────────────────────

const STORAGE_KEYS = {
  CONNECTED: "blockplot_wallet_connected",
  ADDRESS: "blockplot_wallet_address",
  APP_PRIVATE_KEY: "blockplot_app_private_key",
} as const;

// ─── Provider ────────────────────────────────────────────────────────

export function WalletProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [address, setAddress] = useState("");

  // Hydrate state from localStorage on mount
  useEffect(() => {
    try {
      const connected = localStorage.getItem(STORAGE_KEYS.CONNECTED) === "true";
      const storedAddress = localStorage.getItem(STORAGE_KEYS.ADDRESS) || "";
      if (connected && storedAddress) {
        setIsConnected(true);
        setAddress(storedAddress);
      }
    } catch {
      // localStorage may not be available (SSR)
    }
  }, []);

  // Persist state changes to localStorage
  const persistState = useCallback((connected: boolean, addr: string) => {
    try {
      if (connected && addr) {
        localStorage.setItem(STORAGE_KEYS.CONNECTED, "true");
        localStorage.setItem(STORAGE_KEYS.ADDRESS, addr);
      } else {
        localStorage.removeItem(STORAGE_KEYS.CONNECTED);
        localStorage.removeItem(STORAGE_KEYS.ADDRESS);
        localStorage.removeItem(STORAGE_KEYS.APP_PRIVATE_KEY);
      }
    } catch {
      // localStorage may not be available
    }
  }, []);

  // Connect wallet via @stacks/connect
  const connect = useCallback(() => {
    setIsConnecting(true);

    showConnect({
      appDetails: {
        name: APP_NAME,
        icon: APP_ICON,
      },
      onFinish: (payload) => {
        const userAddress =
          payload?.authResponsePayload?.profile?.stxAddress?.mainnet || "";

        if (userAddress) {
          setAddress(userAddress);
          setIsConnected(true);
          persistState(true, userAddress);
        }
        setIsConnecting(false);
      },
      onCancel: () => {
        setIsConnecting(false);
      },
    });
  }, [persistState]);

  // Disconnect wallet — clear all state
  const disconnect = useCallback(() => {
    setIsConnected(false);
    setAddress("");
    persistState(false, "");
  }, [persistState]);

  return (
    <WalletContext.Provider
      value={{ isConnected, isConnecting, address, connect, disconnect }}
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
