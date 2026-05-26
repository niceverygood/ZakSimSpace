"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { ContractModal } from "./ContractModal";
import { FloatingCTA } from "./FloatingCTA";

type ContractContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const ContractContext = createContext<ContractContextValue | null>(null);

export function ContractProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);

  const open = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);

  return (
    <ContractContext.Provider value={{ isOpen, open, close }}>
      {children}
      <FloatingCTA />
      <ContractModal open={isOpen} onClose={close} />
    </ContractContext.Provider>
  );
}

export function useContractModal() {
  const ctx = useContext(ContractContext);
  if (!ctx) {
    throw new Error("useContractModal must be used within <ContractProvider>");
  }
  return ctx;
}
