"use client";

import { useState } from "react";
import { Mail, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function NewsletterSignup({
  variant = "default",
}: {
  variant?: "default" | "footer";
}) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  const isFooter = variant === "footer";

  if (submitted) {
    return (
      <div
        className={cn(
          "rounded-2xl border flex items-center gap-3 px-4 py-3",
          isFooter
            ? "border-ink-700/60 bg-ink-800 text-ink-200"
            : "border-navy-200 bg-navy-50 text-navy-700",
        )}
      >
        <span className="inline-flex w-7 h-7 rounded-full bg-navy-600 items-center justify-center flex-shrink-0">
          <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
        </span>
        <p className="text-[12.5px] font-semibold">
          구독해 주셔서 감사합니다. 첫 소식을 곧 보내드릴게요.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit}>
      <p
        className={cn(
          "text-[13px] font-bold mb-2.5",
          isFooter ? "text-white" : "text-ink-900",
        )}
      >
        뉴스레터 구독
      </p>
      <p
        className={cn(
          "text-[12px] mb-3 leading-[1.6]",
          isFooter ? "text-ink-400" : "text-ink-500",
        )}
      >
        월 1회 신규 지점 오픈, 사업자등록 가이드, 정부지원사업 정보를 보내드려요.
      </p>
      <div
        className={cn(
          "flex gap-1.5 rounded-2xl p-1 border",
          isFooter
            ? "bg-ink-800 border-ink-700/60"
            : "bg-white border-ink-200",
        )}
      >
        <div className="flex-1 flex items-center gap-2 px-3">
          <Mail
            className={cn(
              "w-3.5 h-3.5 flex-shrink-0",
              isFooter ? "text-ink-400" : "text-ink-400",
            )}
            strokeWidth={2}
          />
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일 주소"
            aria-label="구독할 이메일"
            className={cn(
              "flex-1 bg-transparent text-[12.5px] font-medium focus:outline-none",
              isFooter
                ? "text-white placeholder:text-ink-500"
                : "text-ink-900 placeholder:text-ink-300",
            )}
          />
        </div>
        <button
          type="submit"
          className="rounded-xl bg-navy-600 hover:bg-navy-700 text-white text-[12.5px] font-bold px-4 h-9 transition-colors"
        >
          구독
        </button>
      </div>
      <p
        className={cn(
          "text-[10.5px] mt-2.5",
          isFooter ? "text-ink-500" : "text-ink-400",
        )}
      >
        언제든 1초 안에 해지할 수 있어요.
      </p>
    </form>
  );
}
