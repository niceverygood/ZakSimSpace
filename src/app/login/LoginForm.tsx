"use client";

import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      alert(
        "[데모] 실제 인증 연동 예정입니다. 입력하신 이메일: " + (email || "(없음)"),
      );
    }, 600);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <label className="block">
        <span className="block text-[12px] font-bold text-ink-700 mb-1.5">
          이메일
        </span>
        <div className="relative">
          <Mail
            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400"
            strokeWidth={2}
          />
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full h-12 rounded-2xl border border-ink-200 bg-white pl-11 pr-4 text-[14px] font-medium text-ink-900 placeholder:text-ink-300 focus:outline-none focus:border-sage-500 transition-colors"
          />
        </div>
      </label>

      <label className="block">
        <span className="block text-[12px] font-bold text-ink-700 mb-1.5">
          비밀번호
        </span>
        <div className="relative">
          <Lock
            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400"
            strokeWidth={2}
          />
          <input
            type={show ? "text" : "password"}
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호 입력"
            className="w-full h-12 rounded-2xl border border-ink-200 bg-white pl-11 pr-12 text-[14px] font-medium text-ink-900 placeholder:text-ink-300 focus:outline-none focus:border-sage-500 transition-colors"
          />
          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            aria-label={show ? "비밀번호 가리기" : "비밀번호 표시"}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full hover:bg-cream-100 flex items-center justify-center text-ink-500"
          >
            {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </label>

      <div className="flex items-center justify-between pt-1">
        <label className="inline-flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="peer sr-only"
          />
          <span
            className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
              remember
                ? "bg-sage-600 border-sage-600"
                : "bg-white border-ink-300"
            }`}
          >
            {remember && (
              <svg width="10" height="10" viewBox="0 0 12 12" aria-hidden>
                <path
                  d="M2 6.5L4.5 9L10 3"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </span>
          <span className="text-[12.5px] font-semibold text-ink-700">
            로그인 상태 유지
          </span>
        </label>
        <a
          href="/forgot"
          className="text-[12.5px] text-ink-500 hover:text-ink-800"
        >
          비밀번호 찾기
        </a>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-3 w-full h-12 rounded-2xl bg-sage-600 hover:bg-sage-700 disabled:bg-sage-300 text-white font-bold text-[14px] transition-colors"
      >
        {submitting ? "확인 중..." : "이메일로 로그인"}
      </button>
    </form>
  );
}
