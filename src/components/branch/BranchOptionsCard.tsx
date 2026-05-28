"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { formatKRW } from "@/lib/contract-data";

const MONTHS_OPTIONS = [3, 6, 12, 24] as const;

/**
 * 계약 옵션 sidebar shown on /locations/[id]. Lets the visitor pick
 * 사업자 유형, 개월수, 계약 시작일, 업종 before jumping to /checkout.
 * Per client PDF spec the older 인허가/우편물 toggles are removed; the
 * pure price comes from /api/branches (passed in via `pricesByMonths`).
 */
type BizType = "개인" | "법인";

type Props = {
  branchId: string;
  /** Price keyed by months (3/6/12/24). Caller resolves business type. */
  pricesByMonths: Record<number, number>;
};

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export function BranchOptionsCard({ branchId, pricesByMonths }: Props) {
  const router = useRouter();
  const [bizType, setBizType] = useState<BizType>("개인");
  const [months, setMonths] = useState<number>(12);
  const [startDate, setStartDate] = useState<string>(todayISO());
  const [industry, setIndustry] = useState<string>("");

  const total = pricesByMonths[months] ?? 0;

  const goCheckout = () => {
    const params = new URLSearchParams({
      cycle: months >= 12 ? "yearly" : "monthly",
      months: String(months),
      bizType,
      startDate,
      ...(industry && { industry }),
    });
    router.push(`/checkout/${branchId}?${params.toString()}`);
  };

  return (
    <div className="rounded-3xl bg-white border border-cream-200 shadow-[0_18px_50px_-25px_rgba(12,18,25,0.25)] p-6 lg:p-7">
      <p className="text-[14px] font-extrabold text-ink-900 mb-5">계약 옵션</p>

      {/* 사업자 유형 */}
      <Field label="사업자 유형">
        <div className="grid grid-cols-2 gap-2">
          {(["개인", "법인"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setBizType(t)}
              className={`h-11 rounded-xl border text-[13.5px] font-bold transition-colors ${
                bizType === t
                  ? "bg-ink-900 text-white border-ink-900"
                  : "bg-white text-ink-700 border-ink-200 hover:border-ink-400"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </Field>

      {/* 개월수 */}
      <Field label="결제 주기">
        <div className="grid grid-cols-4 gap-1.5">
          {MONTHS_OPTIONS.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMonths(m)}
              className={`h-11 rounded-xl border text-[12.5px] font-bold transition-colors ${
                months === m
                  ? "bg-navy-600 text-white border-navy-600"
                  : "bg-white text-ink-700 border-ink-200 hover:border-ink-400"
              }`}
            >
              {m}개월
            </button>
          ))}
        </div>
      </Field>

      {/* 계약 시작일 */}
      <Field label="계약 시작일">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full h-11 rounded-xl border border-ink-200 px-3 text-[13.5px] font-medium text-ink-900 bg-white focus:outline-none focus:border-navy-500 transition-colors"
        />
      </Field>

      {/* 업종 (선택) */}
      <Field label="업종 (선택)">
        <input
          type="text"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          placeholder="예: 통신판매업"
          className="w-full h-11 rounded-xl border border-ink-200 px-3 text-[13.5px] font-medium text-ink-900 bg-white placeholder:text-ink-300 focus:outline-none focus:border-navy-500 transition-colors"
        />
      </Field>

      {/* Total */}
      <div className="mt-6 pt-5 border-t border-cream-200">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[12.5px] text-ink-500">
            오피스 × {months}개월
          </span>
          <span className="text-[14px] font-bold text-ink-700 tnum">
            {formatKRW(total)}
          </span>
        </div>
        <div className="flex items-baseline justify-between mt-3">
          <span className="text-[14px] font-bold text-ink-900">결제 금액</span>
          <p className="text-[22px] font-extrabold text-ink-900 tnum">
            {formatKRW(total)}
            <span className="ml-1.5 text-[11px] font-semibold text-ink-400">
              (VAT 포함)
            </span>
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={goCheckout}
        disabled={total <= 0}
        className="mt-5 w-full h-12 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-ink-300 text-white font-extrabold text-[15px] inline-flex items-center justify-center gap-2 transition-colors"
      >
        계약하기
        <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
      </button>
    </div>
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
    <label className="block mb-4">
      <span className="block text-[12px] font-bold text-ink-700 mb-2">
        {label}
      </span>
      {children}
    </label>
  );
}
