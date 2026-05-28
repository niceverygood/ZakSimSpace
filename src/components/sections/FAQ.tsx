"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** Top 6 only — full list lives on /faq. */
const faqs = [
  {
    q: "비상주 사무실이 무엇인가요?",
    a: "비상주 사무실은 실제 근무 공간 없이 사업자등록과 우편물 수령을 위해 주소만 임대하는 서비스입니다. 초기 임대 비용 없이 합법적인 사업자 주소지를 확보할 수 있어 1인 사업자와 스타트업에게 적합합니다.",
  },
  {
    q: "사업자등록이 실제로 가능한가요?",
    a: "네, 가능합니다. 작심스페이스는 임대차계약서와 주소사용권을 함께 제공하므로 관할 세무서에서 정상적으로 사업자등록 신청이 가능합니다. 최근 12개월 평균 승인률은 98.4% 입니다.",
  },
  {
    q: "우편물은 어떻게 받아볼 수 있나요?",
    a: "지점에 우편물이 도착하면 봉투 사진과 함께 카카오 알림톡으로 안내해 드립니다. 마이페이지에서도 도착 내역을 실시간으로 확인할 수 있으며, 내용물 스캔이나 택배 발송 같은 부가 서비스도 신청 가능합니다.",
  },
  {
    q: "인허가가 필요한 업종도 등록할 수 있나요?",
    a: "통신판매업, 식품 관련업, 화물운송, 건설업 등 인허가 업종은 지점별로 지원 가능 여부가 다릅니다. 지점 선택 화면의 인허가 필터를 켜시면 신청 가능한 지점만 필터링되어 표시됩니다.",
  },
  {
    q: "계약 기간과 해지 정책이 어떻게 되나요?",
    a: "연간 계약과 월간 계약 중에서 선택할 수 있습니다. 월간은 사업자등록 심사 증빙을 위해 최초 3개월 선납이며, 이후에는 매월 자동 결제됩니다. 해지는 마이페이지에서 언제든 신청할 수 있고, 남은 기간에 대한 일할 환불이 진행됩니다.",
  },
  {
    q: "다른 지점으로 이전할 수 있나요?",
    a: "이용 중에도 다른 지점으로 자유롭게 이전 신청이 가능합니다. 이전 후에는 사업자등록증 정정 신고를 진행해 주셔야 하며, 작심스페이스에서 필요한 서류를 함께 안내해 드립니다.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-ink-100 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-6 py-6 text-left group"
        aria-expanded={open}
      >
        <span className="text-[15.5px] lg:text-[16.5px] font-semibold text-ink-900 leading-snug group-hover:text-navy-700 transition-colors">
          {q}
        </span>
        <span
          className={cn(
            "flex-shrink-0 w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300",
            open
              ? "bg-navy-600 border-navy-600 rotate-45"
              : "bg-white border-ink-200 group-hover:border-ink-400",
          )}
        >
          <Plus
            className={cn(
              "w-4 h-4 transition-colors",
              open ? "text-white" : "text-ink-600",
            )}
            strokeWidth={2}
          />
        </span>
      </button>
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <p className="pb-7 pr-14 text-[14.5px] leading-[1.8] text-ink-500">
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

export function FAQ() {
  return (
    <section className="bg-cream-50 py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12 lg:mb-14">
          <p className="text-[13px] font-semibold text-navy-600 tracking-wider uppercase mb-3">
            FAQ
          </p>
          <h2 className="text-[28px] lg:text-[40px] font-extrabold text-ink-900 leading-[1.2] tracking-tight">
            자주하는 질문
          </h2>
        </div>

        {/* Accordion */}
        <div className="rounded-3xl border border-ink-100 px-6 lg:px-8 bg-white">
          {faqs.map((item) => (
            <FaqItem key={item.q} {...item} />
          ))}
        </div>

        {/* Footer CTA — visible button per PDF spec */}
        <div className="mt-10 text-center">
          <p className="text-[13.5px] text-ink-500 mb-4">
            궁금한 점이 더 있으신가요?
          </p>
          <Link
            href="/faq"
            className="inline-flex items-center gap-1.5 rounded-full bg-ink-900 hover:bg-ink-800 text-white font-semibold px-6 h-12 text-[14px] transition-colors"
          >
            전체 질문 보기
            <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}
