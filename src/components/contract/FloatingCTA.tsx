"use client";

import { useEffect, useState } from "react";
import { Rocket, MessageCircle, X, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { useContractModal } from "./ContractProvider";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function FloatingCTA() {
  const { open: openContract } = useContractModal();
  const [scrolledPast, setScrolledPast] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // Only show after the user scrolls past the hero, to avoid overlapping the CTA there.
  useEffect(() => {
    const onScroll = () => setScrolledPast(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!scrolledPast) return null;

  return (
    <div className="fixed bottom-5 right-5 z-30 flex flex-col items-end gap-3">
      {expanded && (
        <div className="rounded-2xl bg-white border border-cream-200 shadow-[0_24px_60px_-20px_rgba(12,18,25,0.35)] p-3 w-[240px] animate-[slideUp_0.2s_ease]">
          <button
            type="button"
            onClick={() => {
              setExpanded(false);
              openContract();
            }}
            className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-cream-50 transition-colors"
          >
            <span className="w-9 h-9 rounded-full bg-navy-50 border border-navy-200 flex items-center justify-center">
              <Rocket className="w-4 h-4 text-navy-700" strokeWidth={2} />
            </span>
            <span className="text-[13px] font-bold text-ink-900">빠른 계약</span>
          </button>
          <Link
            href="/locations"
            onClick={() => setExpanded(false)}
            className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-cream-50 transition-colors"
          >
            <span className="w-9 h-9 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-amber-500" strokeWidth={2} />
            </span>
            <span className="text-[13px] font-bold text-ink-900">
              전국 지점 보기
            </span>
          </Link>
          <a
            href={`tel:${siteConfig.customerCenter.replace(/-/g, "")}`}
            onClick={() => setExpanded(false)}
            className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-cream-50 transition-colors"
          >
            <span className="w-9 h-9 rounded-full bg-ink-100 flex items-center justify-center">
              <Phone className="w-4 h-4 text-ink-700" strokeWidth={2} />
            </span>
            <span className="text-[13px] font-bold text-ink-900 tnum">
              {siteConfig.customerCenter}
            </span>
          </a>
        </div>
      )}

      <button
        type="button"
        aria-label={expanded ? "메뉴 닫기" : "도움 받기"}
        onClick={() => setExpanded((v) => !v)}
        className={cn(
          "w-14 h-14 rounded-full shadow-[0_18px_40px_-12px_rgba(35,61,104,0.55)]",
          "flex items-center justify-center transition-all duration-200",
          expanded
            ? "bg-ink-900 text-white hover:bg-ink-800 rotate-90"
            : "bg-navy-600 text-white hover:bg-navy-700 hover:-translate-y-0.5",
        )}
      >
        {expanded ? (
          <X className="w-5 h-5" strokeWidth={2.5} />
        ) : (
          <MessageCircle className="w-5 h-5" strokeWidth={2} fill="currentColor" />
        )}
      </button>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(8px) }
          to   { opacity: 1; transform: translateY(0)   }
        }
      `}</style>
    </div>
  );
}
