"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Forward to analytics in production
    if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
      console.error("Page error:", error);
    }
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-50 px-6">
      <div className="max-w-md w-full rounded-3xl bg-white border border-cream-200 p-8 text-center shadow-[0_24px_60px_-30px_rgba(12,18,25,0.35)]">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-amber-50 border border-amber-200 mb-5">
          <AlertTriangle className="w-6 h-6 text-amber-500" strokeWidth={2} />
        </div>
        <h2 className="text-[20px] font-extrabold text-ink-900">
          문제가 생겼어요
        </h2>
        <p className="mt-3 text-[13.5px] text-ink-500 leading-[1.75]">
          페이지를 불러오는 중에 오류가 발생했어요. 잠시 후 다시 시도해 주세요.
          문제가 계속되면 고객센터로 알려주시면 빠르게 확인하겠습니다.
        </p>
        {error.digest && (
          <p className="mt-3 text-[11.5px] text-ink-400 tnum">
            오류 코드: {error.digest}
          </p>
        )}
        <div className="mt-7 flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1.5 rounded-full bg-sage-600 hover:bg-sage-700 text-white font-bold px-5 h-11 text-[13px] transition-colors"
          >
            <RefreshCcw className="w-3.5 h-3.5" strokeWidth={2.5} />
            다시 시도
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 hover:border-ink-400 text-ink-800 font-semibold px-5 h-11 text-[13px]"
          >
            <Home className="w-3.5 h-3.5" strokeWidth={2.5} />
            홈으로
          </Link>
        </div>
      </div>
    </div>
  );
}
