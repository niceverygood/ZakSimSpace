"use client";

import { Heart } from "lucide-react";
import { useFavorites } from "./useFavorites";
import { cn } from "@/lib/utils";

export function FavoriteButton({
  branchId,
  branchName,
  size = "md",
}: {
  branchId: string;
  branchName: string;
  size?: "sm" | "md";
}) {
  const { isFavorite, toggle, hydrated } = useFavorites();
  const active = hydrated && isFavorite(branchId);
  const dim = size === "sm" ? "w-8 h-8" : "w-10 h-10";
  const icon = size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4";

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(branchId);
      }}
      aria-pressed={active}
      aria-label={active ? `${branchName} 즐겨찾기 해제` : `${branchName} 즐겨찾기 추가`}
      className={cn(
        "rounded-full border flex items-center justify-center transition-colors",
        dim,
        active
          ? "bg-rose-50 border-rose-200 text-rose-500 hover:bg-rose-100"
          : "bg-white border-ink-200 text-ink-400 hover:border-ink-400 hover:text-ink-700",
      )}
    >
      <Heart
        className={icon}
        strokeWidth={2}
        fill={active ? "currentColor" : "none"}
      />
    </button>
  );
}
