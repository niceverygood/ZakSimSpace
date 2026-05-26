"use client";

import type { ReactNode } from "react";
import { useContractModal } from "./ContractProvider";

/**
 * Wraps any clickable content and opens the rocket-contract modal on click.
 * Use this from server components by passing the styled child element.
 */
export function ContractTrigger({
  children,
  className,
  ariaLabel,
}: {
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  const { open } = useContractModal();
  return (
    <button
      type="button"
      onClick={open}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
