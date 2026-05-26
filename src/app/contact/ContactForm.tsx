"use client";

import { useState } from "react";
import { ChevronDown, CheckCircle2 } from "lucide-react";

const topics = [
  { value: "partner", label: "제휴 / 입점 문의" },
  { value: "media", label: "언론·취재 문의" },
  { value: "support", label: "이용 중 문의 (계약 / 결제 / 우편물)" },
  { value: "etc", label: "기타" },
];

export function ContactForm() {
  const [topic, setTopic] = useState(topics[0].value);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [agree, setAgree] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="rounded-2xl bg-navy-50 border border-navy-200 p-7 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-navy-600 mb-4">
          <CheckCircle2 className="w-5 h-5 text-white" strokeWidth={2.2} />
        </div>
        <p className="text-[16px] font-extrabold text-ink-900">
          문의를 접수했어요
        </p>
        <p className="mt-2 text-[13px] text-ink-500 leading-[1.7]">
          영업일 기준 1일 이내 <span className="font-bold text-ink-800">{email}</span>
          로 답신드리겠습니다.
        </p>
        <button
          type="button"
          onClick={() => {
            setDone(false);
            setName("");
            setEmail("");
            setCompany("");
            setMessage("");
            setAgree(false);
          }}
          className="mt-5 text-[12.5px] text-ink-500 underline underline-offset-2 hover:text-ink-800"
        >
          새 문의 작성
        </button>
      </div>
    );
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agree) {
      alert("개인정보 수집·이용에 동의해 주세요.");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setDone(true);
    }, 600);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <label className="block">
        <span className="block text-[12px] font-bold text-ink-700 mb-1.5">
          문의 유형
        </span>
        <div className="relative">
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full h-12 appearance-none rounded-2xl border border-ink-200 bg-white px-4 pr-10 text-[14px] font-semibold text-ink-800 focus:outline-none focus:border-navy-500"
          >
            {topics.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400"
            strokeWidth={2}
          />
        </div>
      </label>

      <div className="grid sm:grid-cols-2 gap-3">
        <Field label="이름">
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-12 rounded-2xl border border-ink-200 bg-white px-4 text-[14px] font-medium text-ink-900 focus:outline-none focus:border-navy-500"
          />
        </Field>
        <Field label="회사 / 소속 (선택)">
          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full h-12 rounded-2xl border border-ink-200 bg-white px-4 text-[14px] font-medium text-ink-900 focus:outline-none focus:border-navy-500"
          />
        </Field>
      </div>

      <Field label="회신 이메일">
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full h-12 rounded-2xl border border-ink-200 bg-white px-4 text-[14px] font-medium text-ink-900 placeholder:text-ink-300 focus:outline-none focus:border-navy-500"
        />
      </Field>

      <Field label="문의 내용">
        <textarea
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="어떤 도움이 필요하신지 알려주세요."
          className="w-full rounded-2xl border border-ink-200 bg-white px-4 py-3 text-[14px] font-medium text-ink-900 placeholder:text-ink-300 focus:outline-none focus:border-navy-500 resize-none"
        />
      </Field>

      <label className="flex items-start gap-2 cursor-pointer pt-1">
        <input
          type="checkbox"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          className="peer sr-only"
        />
        <span
          className={`mt-0.5 w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-colors ${
            agree ? "bg-navy-600 border-navy-600" : "bg-white border-ink-300"
          }`}
        >
          {agree && (
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
        <span className="text-[12.5px] text-ink-700 leading-[1.6]">
          개인정보 수집·이용에 동의합니다. 수집된 정보는 문의 응대 목적으로만
          사용되며 3개월 후 파기됩니다.
        </span>
      </label>

      <button
        type="submit"
        disabled={submitting}
        className="mt-3 w-full h-12 rounded-2xl bg-navy-600 hover:bg-navy-700 disabled:bg-navy-300 text-white font-bold text-[14px] transition-colors"
      >
        {submitting ? "전송 중..." : "문의 보내기"}
      </button>
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-[12px] font-bold text-ink-700 mb-1.5">
        {label}
      </span>
      {children}
    </label>
  );
}
