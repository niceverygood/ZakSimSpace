"use client";

import { useState } from "react";
import { currentUser } from "@/lib/mypage-data";
import { cn } from "@/lib/utils";

type Channel = "email" | "sms" | "kakao";
const channelLabels: Record<Channel, string> = {
  email: "이메일",
  sms: "문자(SMS)",
  kakao: "카카오 알림톡",
};

type Topic = "mail" | "billing" | "contract" | "marketing";
const topicMeta: Record<Topic, { label: string; desc: string }> = {
  mail: { label: "우편물 도착 알림", desc: "지점에 우편물이 도착하면 즉시 안내" },
  billing: { label: "결제·정산 알림", desc: "정기 결제 성공·실패, 세금계산서 발급" },
  contract: { label: "계약 만료·갱신 안내", desc: "만료 30일/7일/당일 알림" },
  marketing: { label: "마케팅 정보", desc: "이벤트·신규 지점 오픈 안내 (선택)" },
};

export function SettingsForm() {
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [company, setCompany] = useState(currentUser.company);

  const [channels, setChannels] = useState<Record<Topic, Record<Channel, boolean>>>(
    {
      mail: { email: true, sms: false, kakao: true },
      billing: { email: true, sms: false, kakao: true },
      contract: { email: true, sms: true, kakao: true },
      marketing: { email: false, sms: false, kakao: false },
    },
  );
  const [saved, setSaved] = useState(false);

  const onSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <form onSubmit={onSave} className="space-y-6">
      {/* Profile */}
      <Section title="기본 정보">
        <div className="grid sm:grid-cols-2 gap-3">
          <Field label="이름">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
            />
          </Field>
          <Field label="회사 / 상호">
            <input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="form-input"
            />
          </Field>
        </div>
        <Field label="이메일">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
          />
        </Field>
      </Section>

      {/* Notification matrix */}
      <Section title="알림 설정">
        <div className="overflow-x-auto -mx-2">
          <table className="w-full text-[13px] mx-2">
            <thead>
              <tr className="text-[11.5px] text-ink-400 font-semibold">
                <th className="text-left py-3 pr-3">항목</th>
                {(Object.keys(channelLabels) as Channel[]).map((c) => (
                  <th key={c} className="text-center py-3 px-3 w-20">
                    {channelLabels[c]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-200">
              {(Object.keys(topicMeta) as Topic[]).map((t) => (
                <tr key={t}>
                  <td className="py-4 pr-3">
                    <p className="text-[13.5px] font-bold text-ink-900">
                      {topicMeta[t].label}
                    </p>
                    <p className="text-[11.5px] text-ink-500 mt-0.5">
                      {topicMeta[t].desc}
                    </p>
                  </td>
                  {(Object.keys(channelLabels) as Channel[]).map((c) => (
                    <td key={c} className="py-4 px-3 text-center">
                      <Toggle
                        on={channels[t][c]}
                        onChange={(v) =>
                          setChannels((s) => ({
                            ...s,
                            [t]: { ...s[t], [c]: v },
                          }))
                        }
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Password */}
      <Section title="비밀번호 변경">
        <div className="grid sm:grid-cols-2 gap-3">
          <Field label="현재 비밀번호">
            <input type="password" autoComplete="current-password" className="form-input" />
          </Field>
          <Field label="새 비밀번호">
            <input type="password" autoComplete="new-password" className="form-input" />
          </Field>
        </div>
        <button
          type="button"
          className="mt-3 inline-flex items-center rounded-full bg-cream-100 hover:bg-cream-200 text-ink-700 font-semibold h-10 px-5 text-[12.5px]"
        >
          비밀번호 변경
        </button>
      </Section>

      {/* Danger */}
      <Section title="회원 탈퇴" tone="danger">
        <p className="text-[13px] text-ink-500 leading-[1.7] mb-3">
          탈퇴 시 진행 중인 계약은 해지되며, 잔여 기간에 대한 일할 환불이
          진행됩니다. 우편물·세금계산서 등 자료는 관련 법령에 따라 일정 기간
          보관 후 파기됩니다.
        </p>
        <button
          type="button"
          className="inline-flex items-center rounded-full border border-rose-200 text-rose-600 hover:bg-rose-50 font-semibold h-10 px-5 text-[12.5px] transition-colors"
        >
          회원 탈퇴 신청
        </button>
      </Section>

      {/* Save */}
      <div className="sticky bottom-3 flex items-center justify-between gap-3 rounded-2xl bg-white border border-cream-200 px-5 py-3 shadow-[0_18px_40px_-20px_rgba(12,18,25,0.25)]">
        <p
          className={cn(
            "text-[12.5px] font-semibold transition-opacity",
            saved ? "text-sage-700 opacity-100" : "text-ink-400 opacity-100",
          )}
        >
          {saved ? "저장됐어요" : "변경 사항이 있으면 저장해 주세요."}
        </p>
        <button
          type="submit"
          className="inline-flex items-center rounded-full bg-sage-600 hover:bg-sage-700 text-white font-bold h-10 px-5 text-[13px] transition-colors"
        >
          저장
        </button>
      </div>

      <style>{`
        .form-input {
          width: 100%;
          height: 44px;
          border-radius: 14px;
          border: 1px solid var(--color-ink-200);
          background: #ffffff;
          padding: 0 14px;
          font-size: 14px;
          font-weight: 500;
          color: var(--color-ink-900);
        }
        .form-input:focus {
          outline: none;
          border-color: var(--color-sage-500);
        }
      `}</style>
    </form>
  );
}

function Section({
  title,
  tone,
  children,
}: {
  title: string;
  tone?: "danger";
  children: React.ReactNode;
}) {
  return (
    <section
      className={cn(
        "rounded-3xl border p-5 lg:p-6",
        tone === "danger"
          ? "bg-white border-rose-100"
          : "bg-white border-cream-200",
      )}
    >
      <h2
        className={cn(
          "text-[15.5px] font-extrabold mb-4",
          tone === "danger" ? "text-rose-600" : "text-ink-900",
        )}
      >
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
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

function Toggle({
  on,
  onChange,
}: {
  on: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className={cn(
        "relative inline-flex w-10 h-6 rounded-full transition-colors",
        on ? "bg-sage-600" : "bg-ink-200",
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform",
          on && "translate-x-4",
        )}
      />
    </button>
  );
}
