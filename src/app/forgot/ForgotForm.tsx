"use client";

import { useState } from "react";
import { Mail, CheckCircle2 } from "lucide-react";

export function ForgotForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSent(true);
    }, 600);
  };

  if (sent) {
    return (
      <div className="text-center py-2">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-navy-100 mb-4">
          <CheckCircle2 className="w-7 h-7 text-navy-700" strokeWidth={2} />
        </div>
        <p className="text-[15px] font-bold text-ink-900">
          재설정 링크를 보냈어요
        </p>
        <p className="mt-2 text-[13px] text-ink-500 leading-[1.7]">
          <span className="font-bold text-ink-800">{email}</span> 으로 전송된
          이메일에서 링크를 눌러 비밀번호를 변경해 주세요.
        </p>
        <button
          type="button"
          onClick={() => {
            setSent(false);
            setEmail("");
          }}
          className="mt-6 text-[12.5px] text-ink-500 underline underline-offset-2 hover:text-ink-800"
        >
          다른 이메일로 다시 보내기
        </button>
      </div>
    );
  }

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
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="가입한 이메일"
            autoComplete="email"
            className="w-full h-12 rounded-2xl border border-ink-200 bg-white pl-11 pr-4 text-[14px] font-medium text-ink-900 placeholder:text-ink-300 focus:outline-none focus:border-navy-500 transition-colors"
          />
        </div>
      </label>
      <button
        type="submit"
        disabled={submitting}
        className="mt-3 w-full h-12 rounded-2xl bg-navy-600 hover:bg-navy-700 disabled:bg-navy-300 text-white font-bold text-[14px] transition-colors"
      >
        {submitting ? "전송 중..." : "재설정 링크 받기"}
      </button>
    </form>
  );
}
