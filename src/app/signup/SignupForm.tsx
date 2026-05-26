"use client";

import { useState } from "react";
import { Mail, Lock, User, Eye, EyeOff, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const consents = [
  { id: "terms", label: "(필수) 이용약관 동의", required: true, href: "/terms" },
  {
    id: "privacy",
    label: "(필수) 개인정보 처리방침 동의",
    required: true,
    href: "/privacy",
  },
  {
    id: "marketing",
    label: "(선택) 마케팅 알림 수신 동의",
    required: false,
    href: undefined,
  },
];

export function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);

  const allRequired = consents
    .filter((c) => c.required)
    .every((c) => checked[c.id]);
  const allChecked = consents.every((c) => checked[c.id]);

  const toggleAll = () => {
    if (allChecked) setChecked({});
    else
      setChecked(
        Object.fromEntries(consents.map((c) => [c.id, true])) as Record<
          string,
          boolean
        >,
      );
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allRequired) {
      alert("필수 약관에 동의해 주세요.");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      alert("[데모] 가입 요청을 받았습니다. 실제 가입은 연동 예정입니다.");
    }, 600);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <FormField label="이름">
        <InputWrap icon={User}>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="대표자 이름"
            autoComplete="name"
            className="flex-1 bg-transparent text-[14px] font-medium text-ink-900 placeholder:text-ink-300 focus:outline-none"
          />
        </InputWrap>
      </FormField>

      <FormField label="이메일">
        <InputWrap icon={Mail}>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            className="flex-1 bg-transparent text-[14px] font-medium text-ink-900 placeholder:text-ink-300 focus:outline-none"
          />
        </InputWrap>
      </FormField>

      <FormField label="비밀번호 (8자 이상)">
        <InputWrap icon={Lock}>
          <input
            required
            minLength={8}
            type={show ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="영문 + 숫자 + 특수문자"
            autoComplete="new-password"
            className="flex-1 bg-transparent text-[14px] font-medium text-ink-900 placeholder:text-ink-300 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            aria-label={show ? "비밀번호 가리기" : "비밀번호 표시"}
            className="text-ink-500 hover:text-ink-800"
          >
            {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </InputWrap>
      </FormField>

      {/* Consents */}
      <div className="mt-4 rounded-2xl border border-cream-200 bg-cream-50 p-4">
        <label className="flex items-center gap-2.5 cursor-pointer mb-3 pb-3 border-b border-cream-200">
          <CheckBox checked={allChecked} onChange={toggleAll} />
          <span className="text-[13px] font-bold text-ink-900">
            전체 약관에 동의합니다
          </span>
        </label>
        <ul className="space-y-2.5">
          {consents.map((c) => (
            <li
              key={c.id}
              className="flex items-center justify-between gap-3"
            >
              <label className="flex items-center gap-2.5 cursor-pointer flex-1">
                <CheckBox
                  checked={!!checked[c.id]}
                  onChange={() =>
                    setChecked((s) => ({ ...s, [c.id]: !s[c.id] }))
                  }
                />
                <span className="text-[12.5px] text-ink-700">{c.label}</span>
              </label>
              {c.href && (
                <a
                  href={c.href}
                  className="text-[11.5px] text-ink-500 underline underline-offset-2 hover:text-ink-800"
                >
                  보기
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>

      <button
        type="submit"
        disabled={submitting || !allRequired}
        className="mt-4 w-full h-12 rounded-2xl bg-navy-600 hover:bg-navy-700 disabled:bg-navy-300 text-white font-bold text-[14px] transition-colors"
      >
        {submitting ? "가입 중..." : "회원가입"}
      </button>
    </form>
  );
}

function FormField({
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

function InputWrap({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 h-12 rounded-2xl border border-ink-200 bg-white px-4 focus-within:border-navy-500 transition-colors">
      <Icon className="w-4 h-4 text-ink-400" strokeWidth={2} />
      {children}
    </div>
  );
}

function CheckBox({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <span className="relative inline-flex items-center justify-center">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="peer sr-only"
      />
      <span
        className={cn(
          "w-5 h-5 rounded-md border flex items-center justify-center transition-colors",
          checked ? "bg-navy-600 border-navy-600" : "bg-white border-ink-300",
        )}
      >
        {checked && (
          <Check className="w-3 h-3 text-white" strokeWidth={3} />
        )}
      </span>
    </span>
  );
}
