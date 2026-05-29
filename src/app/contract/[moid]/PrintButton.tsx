"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 rounded-full bg-navy-600 hover:bg-navy-700 text-white font-bold px-6 h-11 text-[13.5px] transition-colors"
    >
      <Printer className="w-4 h-4" strokeWidth={2} />
      PDF 저장 · 인쇄
    </button>
  );
}
