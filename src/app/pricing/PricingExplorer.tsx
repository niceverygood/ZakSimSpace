"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { ContractTrigger } from "@/components/contract/ContractTrigger";
import { formatKRW } from "@/lib/contract-data";
import { cn } from "@/lib/utils";

type BizType = "individual" | "corporate" | "bulk";
type Cycle = "monthly" | "half" | "yearly";

const bizTabs: { value: BizType; label: string }[] = [
  { value: "individual", label: "개인사업자" },
  { value: "corporate", label: "법인사업자" },
  { value: "bulk", label: "다수계약" },
];

const cycleTabs: { value: Cycle; label: string; monthsLabel: string }[] = [
  { value: "monthly", label: "월간", monthsLabel: "1개월" },
  { value: "half", label: "6개월", monthsLabel: "6개월" },
  { value: "yearly", label: "연간", monthsLabel: "12개월" },
];

/**
 * Base monthly rate. Yearly: 16% discount. Half: 8% discount.
 * Bulk: -10% on top (다수 계약 시 추가 할인).
 */
function priceFor(biz: BizType, cycle: Cycle) {
  const baseMonthly = 25000;
  const bulkFactor = biz === "bulk" ? 0.9 : 1.0;
  const monthly = Math.round(baseMonthly * bulkFactor);
  if (cycle === "monthly") {
    return { monthly, total: monthly, months: 1, discount: 0 };
  }
  if (cycle === "half") {
    const total = Math.round(monthly * 6 * 0.92);
    return {
      monthly: Math.round(total / 6),
      total,
      months: 6,
      discount: 8,
    };
  }
  // yearly
  const total = Math.round(monthly * 12 * 0.8);
  return {
    monthly: Math.round(total / 12),
    total,
    months: 12,
    discount: 20,
  };
}

const features = [
  "비상주 사무실 주소지 제공",
  "간편 온라인 계약 체결",
  "우편물 도착 알림 전송",
  "계약서 다운로드",
  "결제·계약내역 대시보드 제공",
  "온라인으로 우편물 도착 확인",
  "일반 우편물 대리 개봉 (선택)",
  "인허가 업종 주소지 지원 (선택)",
];

const notes = [
  "지점별로 제공되는 특화 서비스에 따라 최적화된 맞춤 요금이 적용될 수 있습니다.",
  "중요한 우편물을 놓치지 않도록 도착 즉시 알림을 드리며, 봉투 겉면 사진까지 마이페이지에서 바로 확인하실 수 있어 편리합니다.",
  "'일반 우편물 대리 개봉' 부가 서비스를 이용하시면, 일반 우편물 내지 스캔본까지 마이페이지에서 확인하실 수 있습니다.",
  "'인허가 업종 주소지 지원' 부가서비스를 이용하시면, 인허가 업종 주소지 신청에 필요한 실사 대응 공간과 제출 서류를 간편하게 준비하실 수 있습니다.",
];

const safety = [
  "월 결제의 경우, 원활한 사업자등록 승인을 위해 첫 3개월은 안정적인 계약 증빙용으로 선납 진행되며, 4개월차 부터는 월 이용료로 자동 결제 됩니다.",
  "작심스페이스는 사업자등록을 위한 임대차(전대차) 계약 및 주소지 사용권을 제공합니다. 사업자등록 신청은 고객님의 소중한 권리로서 직접 진행하시게 되며, 최종 승인은 관할 기관의 심사 기준에 따릅니다.",
  "작심스페이스는 승인 확률을 높이실 수 있도록 최적의 임대차 계약서와 주소지 사용권을 지원합니다.",
  "'인허가' 신청 및 관할 관청과의 절차 진행은 고객님의 소중한 권리로서 직접 수행하시게 되며, 최종 승인은 관할 관청의 전문적인 심사 기준에 따라 결정됩니다.",
];

export function PricingExplorer() {
  const [biz, setBiz] = useState<BizType>("individual");
  const [cycle, setCycle] = useState<Cycle>("yearly");
  const p = priceFor(biz, cycle);

  return (
    <section className="bg-cream-50 py-14 lg:py-20">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        {/* 3-tab business type selector */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-full border border-ink-200 bg-white p-1.5">
            {bizTabs.map((t) => {
              const active = biz === t.value;
              return (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => setBiz(t.value)}
                  className={cn(
                    "h-10 px-5 sm:px-6 rounded-full text-[13px] font-bold transition-colors",
                    active
                      ? "bg-amber-400 text-ink-900"
                      : "text-ink-500 hover:text-ink-900",
                  )}
                  aria-pressed={active}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Plan card */}
        <article className="rounded-[28px] bg-white border border-cream-200 shadow-[0_24px_60px_-30px_rgba(12,18,25,0.25)] overflow-hidden">
          <div className="p-6 lg:p-10 grid lg:grid-cols-[1fr_1.4fr] gap-8 lg:gap-12">
            {/* Left: title + price + cycle toggle */}
            <div>
              <p className="text-[18px] font-extrabold text-ink-900 mb-1">
                오피스
              </p>
              <p className="text-[12.5px] text-ink-500 mb-6">
                사업자등록에 필요한 비상주 주소지만 제공
              </p>

              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-[32px] lg:text-[40px] font-extrabold text-amber-500 tnum leading-none">
                  월 {formatKRW(p.monthly)}~
                </span>
              </div>
              <p className="text-[13px] text-ink-500 mt-2 tnum">
                ({cycleTabs.find((c) => c.value === cycle)?.label}{" "}
                {formatKRW(p.total)})
              </p>

              {/* Cycle toggle */}
              <div className="mt-6 inline-flex w-full max-w-[280px] rounded-full bg-cream-100 p-1">
                {cycleTabs.map((c) => {
                  const active = cycle === c.value;
                  return (
                    <button
                      key={c.value}
                      type="button"
                      onClick={() => setCycle(c.value)}
                      className={cn(
                        "flex-1 h-10 rounded-full text-[12.5px] font-bold transition-colors",
                        active
                          ? "bg-amber-400 text-ink-900 shadow-sm"
                          : "text-ink-500 hover:text-ink-800",
                      )}
                      aria-pressed={active}
                    >
                      {c.label}
                    </button>
                  );
                })}
              </div>

              {p.discount > 0 && (
                <p className="mt-3 inline-flex items-center gap-1 text-[11.5px] font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
                  {p.discount}% 할인 적용
                </p>
              )}
              {biz === "bulk" && (
                <p className="mt-3 text-[11.5px] text-ink-500">
                  다수계약 추가 할인 10% 자동 적용
                </p>
              )}
            </div>

            {/* Right: features list */}
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
              {features.map((f) => (
                <div
                  key={f}
                  className="flex items-start gap-2 text-[13.5px] text-ink-700"
                >
                  <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-navy-100 flex items-center justify-center">
                    <Check
                      className="w-2.5 h-2.5 text-navy-700"
                      strokeWidth={3}
                    />
                  </span>
                  {f}
                </div>
              ))}
            </div>
          </div>

          {/* Plan CTA — full-width yellow bar */}
          <ContractTrigger className="w-full bg-amber-400 hover:bg-amber-500 text-ink-900 font-extrabold text-[15.5px] py-5 inline-flex items-center justify-center gap-2 transition-colors">
            플랜 계약
            <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
          </ContractTrigger>
        </article>

        {/* Notes */}
        <section className="mt-10 lg:mt-14 grid lg:grid-cols-2 gap-6">
          <div>
            <h2 className="text-[15px] font-extrabold text-ink-900 mb-4">
              [참고사항]
            </h2>
            <ul className="space-y-3">
              {notes.map((n, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-[13px] leading-[1.75] text-ink-600"
                >
                  <Check
                    className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5"
                    strokeWidth={2.5}
                  />
                  <span>{n}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[15px] font-extrabold text-ink-900 mb-4">
              [안전한 이용을 위한 안내]
            </h2>
            <ul className="space-y-3">
              {safety.map((s, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-[13px] leading-[1.75] text-ink-600"
                >
                  <Check
                    className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5"
                    strokeWidth={2.5}
                  />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Quick links */}
        <div className="mt-12 lg:mt-16 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/locations"
            className="inline-flex items-center gap-1.5 rounded-full bg-white border border-ink-200 hover:border-ink-400 text-ink-800 font-semibold h-12 px-6 text-[14px] transition-colors"
          >
            전국 지점 둘러보기
          </Link>
          <Link
            href="/contract"
            className="inline-flex items-center gap-1.5 rounded-full bg-navy-900 hover:bg-navy-800 text-white font-bold h-12 px-6 text-[14px] transition-colors"
          >
            계약 진행 보기
            <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}
