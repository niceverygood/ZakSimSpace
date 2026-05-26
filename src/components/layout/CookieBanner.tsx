"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";

const STORAGE_KEY = "zaksim:cookie-consent:v1";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (!stored) setVisible(true);
    } catch {
      /* localStorage unavailable — silently skip */
    }
  }, []);

  const persist = (value: "all" | "essential") => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ value, at: new Date().toISOString() }),
      );
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="쿠키 사용 동의"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-5 sm:bottom-5 sm:max-w-md z-40 animate-[slideUp_0.25s_ease]"
    >
      <div className="rounded-2xl bg-white border border-cream-200 shadow-[0_24px_60px_-20px_rgba(12,18,25,0.35)] p-5">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center">
            <Cookie className="w-4.5 h-4.5 text-amber-500" strokeWidth={2} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[14px] font-bold text-ink-900">
              쿠키 사용에 동의해 주세요
            </p>
            <p className="mt-1.5 text-[12.5px] leading-[1.7] text-ink-500">
              작심스페이스는 서비스 제공과 이용 분석을 위해 쿠키를 사용합니다.{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-2 hover:text-ink-800"
              >
                자세히 보기
              </Link>
            </p>
          </div>
          <button
            type="button"
            aria-label="닫기"
            onClick={() => persist("essential")}
            className="flex-shrink-0 w-7 h-7 rounded-full hover:bg-cream-100 flex items-center justify-center text-ink-400"
          >
            <X className="w-3.5 h-3.5" strokeWidth={2} />
          </button>
        </div>
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => persist("essential")}
            className="flex-1 h-10 rounded-full border border-ink-200 hover:border-ink-400 text-ink-700 text-[12.5px] font-semibold transition-colors"
          >
            필수만 허용
          </button>
          <button
            type="button"
            onClick={() => persist("all")}
            className="flex-1 h-10 rounded-full bg-navy-600 hover:bg-navy-700 text-white text-[12.5px] font-bold transition-colors"
          >
            전체 동의
          </button>
        </div>
      </div>
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(12px) }
          to   { opacity: 1; transform: translateY(0)    }
        }
      `}</style>
    </div>
  );
}
